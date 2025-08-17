// utils/authHandler.js
import { ref, reactive } from 'vue'

/**
 * Secure Authentication Handler
 * Implements security best practices for client-side auth
 */

// Auth state management
const authState = reactive({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
})

// Rate limiting state
const rateLimitState = reactive({
  attempts: 0,
  lastAttempt: 0,
  isBlocked: false,
  blockUntil: 0
})

// Constants for security
const RATE_LIMIT = {
  MAX_ATTEMPTS: 5,
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  BLOCK_DURATION_MS: 30 * 60 * 1000 // 30 minutes
}

const TIMEOUTS = {
  REQUEST_TIMEOUT: 10000, // 10 seconds
  MIN_REQUEST_TIME: 1000 // Minimum 1 second to prevent timing attacks
}

/**
 * Rate limiting implementation
 */
class RateLimiter {
  static checkRateLimit() {
    const now = Date.now()
    
    // Check if currently blocked
    if (rateLimitState.isBlocked && now < rateLimitState.blockUntil) {
      const remainingTime = Math.ceil((rateLimitState.blockUntil - now) / 1000 / 60)
      throw new Error(`TOO_MANY_ATTEMPTS:${remainingTime}`)
    }
    
    // Reset if window has passed
    if (now - rateLimitState.lastAttempt > RATE_LIMIT.WINDOW_MS) {
      rateLimitState.attempts = 0
      rateLimitState.isBlocked = false
    }
    
    // Check if exceeded attempts
    if (rateLimitState.attempts >= RATE_LIMIT.MAX_ATTEMPTS) {
      rateLimitState.isBlocked = true
      rateLimitState.blockUntil = now + RATE_LIMIT.BLOCK_DURATION_MS
      const blockMinutes = Math.ceil(RATE_LIMIT.BLOCK_DURATION_MS / 1000 / 60)
      throw new Error(`TOO_MANY_ATTEMPTS:${blockMinutes}`)
    }
  }
  
  static recordAttempt() {
    rateLimitState.attempts++
    rateLimitState.lastAttempt = Date.now()
  }
  
  static resetAttempts() {
    rateLimitState.attempts = 0
    rateLimitState.isBlocked = false
    rateLimitState.blockUntil = 0
  }
}

/**
 * Input validation and sanitization
 */
class InputValidator {
  static validateCredentials(username, password) {
    const errors = {}
    
    // Username validation
    if (!username || typeof username !== 'string') {
      errors.username = 'Username is required'
    } else {
      const trimmed = username.trim()
      if (trimmed.length === 0) {
        errors.username = 'Username cannot be empty'
      } else if (trimmed.length < 3) {
        errors.username = 'Username must be at least 3 characters'
      } else if (trimmed.length > 18) {
        errors.username = 'Username cannot exceed 18 characters'
      } else if (!/^[a-zA-Z0-9._-]+$/.test(trimmed)) {
        errors.username = 'Username contains invalid characters'
      }
    }
    
    // Password validation
    if (!password || typeof password !== 'string') {
      errors.password = 'Password is required'
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    } else if (password.length > 128) {
      errors.password = 'Password cannot exceed 128 characters'
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      sanitized: {
        username: username?.trim?.() || '',
        password: password || ''
      }
    }
  }
}

/**
 * Secure HTTP client for auth requests
 */
class SecureAuthClient {
  static async makeAuthRequest(endpoint, credentials) {
    const startTime = Date.now()
    
    try {
      // Create abort controller for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
      }, TIMEOUTS.REQUEST_TIMEOUT)
      
      // Make the request
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // CSRF protection
          // Add CSRF token if available
          ...(window.csrfToken && { 'X-CSRF-Token': window.csrfToken })
        },
        body: JSON.stringify(credentials),
        credentials: 'same-origin', // Send cookies only to same origin
        signal: controller.signal,
        // Security headers
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'error' // Don't follow redirects
      })
      
      clearTimeout(timeoutId)
      
      // Ensure minimum request time to prevent timing attacks
      const elapsed = Date.now() - startTime
      if (elapsed < TIMEOUTS.MIN_REQUEST_TIME) {
        await new Promise(resolve => 
          setTimeout(resolve, TIMEOUTS.MIN_REQUEST_TIME - elapsed)
        )
      }
      
      // Handle response
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('INVALID_CREDENTIALS')
        } else if (response.status === 429) {
          throw new Error('RATE_LIMITED')
        } else if (response.status >= 500) {
          throw new Error('SERVER_ERROR')
        } else {
          throw new Error('AUTH_FAILED')
        }
      }
      
      const data = await response.json()
      return data
      
    } catch (error) {
      // Ensure minimum time even on error
      const elapsed = Date.now() - startTime
      if (elapsed < TIMEOUTS.MIN_REQUEST_TIME) {
        await new Promise(resolve => 
          setTimeout(resolve, TIMEOUTS.MIN_REQUEST_TIME - elapsed)
        )
      }
      
      if (error.name === 'AbortError') {
        throw new Error('REQUEST_TIMEOUT')
      }
      
      throw error
    }
  }
}

/**
 * Secure session management
 */
class SessionManager {
  static setAuthData(userData) {
    authState.user = userData
    authState.isAuthenticated = true
    
    // Set session timeout if provided
    if (userData.expiresIn) {
      setTimeout(() => {
        this.logout()
      }, userData.expiresIn * 1000)
    }
  }
  
  static clearAuthData() {
    authState.user = null
    authState.isAuthenticated = false
    authState.error = null
  }
  
  static async logout() {
    try {
      // Call logout endpoint to invalidate server session
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    } catch (error) {
      console.warn('Logout request failed:', error)
    }
    
    // Clear local state regardless of server response
    this.clearAuthData()
    
    // Redirect to login
    window.location.href = '/login'
  }
}

/**
 * Main authentication handler
 */
export class SecureAuthHandler {
  static async login(username, password) {
    try {
      // Clear previous errors
      authState.error = null
      authState.isLoading = true
      
      // Check rate limiting
      RateLimiter.checkRateLimit()
      
      // Validate and sanitize input
      const validation = InputValidator.validateCredentials(username, password)
      if (!validation.isValid) {
        throw new Error(`VALIDATION_ERROR:${JSON.stringify(validation.errors)}`)
      }
      
      // Record attempt for rate limiting
      RateLimiter.recordAttempt()
      
      // Make secure request
      const response = await SecureAuthClient.makeAuthRequest('/api/auth/login', {
        username: validation.sanitized.username,
        password: validation.sanitized.password
      })
      
      // Success - reset rate limiting
      RateLimiter.resetAttempts()
      
      // Set auth data
      SessionManager.setAuthData(response.user)
      
      return {
        success: true,
        user: response.user,
        message: response.message || 'Login successful'
      }
      
    } catch (error) {
      // Set error state
      authState.error = this.formatError(error)
      
      return {
        success: false,
        error: authState.error,
        message: this.getErrorMessage(error)
      }
      
    } finally {
      authState.isLoading = false
    }
  }
  
  static formatError(error) {
    if (error.message.startsWith('TOO_MANY_ATTEMPTS:')) {
      const minutes = error.message.split(':')[1]
      return `TOO_MANY_ATTEMPTS:${minutes}`
    }
    
    if (error.message.startsWith('VALIDATION_ERROR:')) {
      return error.message
    }
    
    // Generic errors for security
    return 'AUTH_FAILED'
  }
  
  static getErrorMessage(error) {
    if (error.message.startsWith('TOO_MANY_ATTEMPTS:')) {
      const minutes = error.message.split(':')[1]
      return `Too many failed attempts. Please try again in ${minutes} minutes.`
    }
    
    if (error.message.startsWith('VALIDATION_ERROR:')) {
      return 'Please check your input and try again.'
    }
    
    if (error.message === 'REQUEST_TIMEOUT') {
      return 'Request timed out. Please check your connection and try again.'
    }
    
    if (error.message === 'SERVER_ERROR') {
      return 'Server error. Please try again later.'
    }
    
    // Generic message to prevent information disclosure
    return 'Invalid credentials. Please try again.'
  }
  
  static logout() {
    return SessionManager.logout()
  }
  
  static getAuthState() {
    return authState
  }
  
  static getRateLimitState() {
    return rateLimitState
  }
}

// Auto-logout on tab visibility change (security feature)
document.addEventListener('visibilitychange', () => {
  if (document.hidden && authState.isAuthenticated) {
    // Optional: Set a timer to auto-logout after being hidden for too long
    setTimeout(() => {
      if (document.hidden && authState.isAuthenticated) {
        SessionManager.logout()
      }
    }, 30 * 60 * 1000) // 30 minutes
  }
})

// Export default composable
export function useSecureAuth() {
  return {
    authState: authState,
    rateLimitState: rateLimitState,
    login: SecureAuthHandler.login,
    logout: SecureAuthHandler.logout,
    isAuthenticated: ref(authState.isAuthenticated),
    user: ref(authState.user),
    isLoading: ref(authState.isLoading),
    error: ref(authState.error)
  }
}