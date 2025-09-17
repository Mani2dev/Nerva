<script setup>
import { reactive, ref } from 'vue'
import { requestLogin } from '@/utils/requestAuth.js'
import Input from '@/components/blocks/Input.vue'
import Button from '@/components/blocks/Button.vue'
import bot from '@/assets/meta.js'

const data = reactive({
  username: '',
  password: '',
  errorValue: ''
})
const loading = ref(false)

async function sendData() {
  data.errorValue = ''
  
  // Validate inputs
  if (!data.username?.trim()) {
    data.errorValue = 'Please enter username.'
    return
  }
  if (!data.password) {
    data.errorValue = 'Please enter password.'
    return
  }

  loading.value = true
  try {
    console.log('Attempting login for:', data.username) // Debug log
    const res = await requestLogin(data.username, data.password)
    console.log('Login response:', res) // Debug log
    
    // FastAPI returns different structure
    if (!res.ok && res.status) {
      // Handle HTTP status codes
      if (res.status === 401) {
        data.errorValue = 'Invalid username or password.'
      } else if (res.status === 429) {
        data.errorValue = 'Too many login attempts. Please wait a minute.'
      } else if (res.status === 403) {
        data.errorValue = 'Account is not active.'
      } else if (res.status >= 500) {
        data.errorValue = 'Server error. Please try again later.'
      } else {
        data.errorValue = res.detail || res.message || 'Login failed.'
      }
      return
    }

    // Check for successful response (FastAPI structure)
    if (res.ok && res.data?.ok) {
      // cookie is already set by the server; no storing tokens client-side
      window.location.href = '/'
    } else {
      data.errorValue = res.data?.detail || res.detail || 'Login failed.'
    }

  } catch (err) {
    console.error('Login error:', err) // Debug log

    // Handle different error types
    if (err.response) {
      // Server responded with error status
      const status = err.response.status
      const detail = err.response.data?.detail || err.response.data?.message

      if (status === 401) {
        data.errorValue = 'Invalid username or password.'
      } else if (status === 429) {
        data.errorValue = 'Too many login attempts. Please wait a minute.'
      } else if (status === 403) {
        data.errorValue = 'Account is not active.'
      } else if (status >= 500) {
        data.errorValue = 'Server error. Please try again later.'
      } else {
        data.errorValue = detail || 'Login failed.'
      }
    } else if (err.request) {
      // Request was made but no response received
      data.errorValue = 'Cannot connect to server. Check your connection.'
    } else {
      // Something else happened
      data.errorValue = 'Network error. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// Clean username input (remove spaces, convert to lowercase)
function handleUsernameInput(e) {
  const value = e?.target?.value ?? ''
  data.username = value.trim().toLowerCase()
}

// Clear error when user starts typing
function clearError() {
  if (data.errorValue) {
    data.errorValue = ''
  }
}
</script>

<template>
  <section class="auth--container">
    <div class="auth--contnet">
      <div class="auth--action--content">
        <form class="auth--form" @submit.prevent="sendData">
          <div class="auth--title">
            <h1>Welcome Back! <span>Emanuel</span></h1>
            <p><span></span> has missed you since last time you were here</p>
          </div>

          <div class="auth--input--box">
            <label for="username">Username</label>
            <!-- 👇 your Input.vue requires v-model:value -->
            <Input 
              id="username" 
              name="username" 
              v-model="data.username" 
              :value="data.username"
              @input="handleUsernameInput"
              @focus="clearError"
              autocomplete="username"
              style="padding: 20px 10px; background: var(--input-bg); border-radius: 15px; border: solid 2px var(--border-color);"
              placeholder="john_doe" 
            />
          </div>

          <div class="auth--input--box">
            <label for="password">Password</label>
            <!-- 👇 same here -->
            <Input 
              id="password" 
              name="password" 
              v-model="data.password" 
              :value="data.password"
              @input="e => (data.password = e?.target?.value ?? '')"
              @focus="clearError"
              type="password" 
              autocomplete="current-password"
              style="padding: 20px 10px; background: var(--input-bg); border-radius: 15px; border: solid 2px var(--border-color);"
              placeholder="********" 
            />
          </div>

          <!-- fix the v-if whitespace so it evaluates the ref, not a stray string -->
          <p v-if="data.errorValue" class="auth--error">{{ data.errorValue }}</p>

          <div class="auth--button--box">
            <Button :disabled="loading" type="submit"
              style="width: 100%; transition: .3s ease; padding: 20px 10px; border-radius: 15px; border: solid 2px var(--border-color); color: var(--text-color); font-weight: 600; font-size: var(--font-nm); cursor: pointer; background: var(--bg-sec); opacity: var(--btn-opacity, 1);"
              :style="{ '--btn-opacity': loading ? 0.7 : 1 }">
              {{ loading ? 'LOGGING IN…' : 'LOG IN' }}
            </Button>
          </div>
        </form>
      </div>

      <div class="auth--visual--contnet">
        <div class="auth--graphics"></div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.auth--container {
  width: 100vw;
  height: 100vh;
}

.auth--contnet {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
}

.auth--action--content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
  border-right: solid 1px var(--border-color);
}

.auth--form {
  padding: 20px;
  width: 85%;
  height: 85%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.auth--title {
  margin-bottom: 50px;
}

.auth--title h1 {
  font-weight: 500;
  font-size: var(--font-xl);
}

.auth--title h1 span {
  font-weight: 600;
  text-shadow: 0 0 20px green;
  color: green;
}

.auth--title p span {
  color: palevioletred;
  text-shadow: 0 0 10px violet;
}

.auth--title p {
  margin-top: 15px;
  font-weight: 200;
  font-size: var(--font-md);
}

.auth--input--box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 15px 0;
}

.auth--input--box input {
  margin-top: 15px;
}

.auth--input--box label {
  font-weight: 300;
}

.auth--button--box {
  width: 90%;
  margin-top: 25px;
}

.auth--visual--contnet {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ================= Border Beam (conic ring, real animated var) ================= */

/* Register the animatable custom property for the angle */
@property --beam-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.auth--graphics {
  /* knobs */
  --beam-thickness: 3px;
  /* ring thickness */
  --beam-speed: 8s;
  /* rotation speed */
  --beam-angle: 0deg;
  /* animated by keyframes */
  --beam-core: rgba(255, 124, 148, 0.95);
  --beam-mid: rgba(255, 120, 40, 0.55);
  --beam-fade: #df173c00;
  --beam-glow: 18px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 95%;
  border-radius: 50px;
  background: var(--bg-sec);
  overflow: hidden;

  /* subtle static border under the beam */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

/* crisp ring */
.auth--graphics::before,
.auth--graphics::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: var(--beam-thickness);

  background:
    conic-gradient(from var(--beam-angle),
      var(--beam-fade) 0deg,
      var(--beam-fade) 10deg,
      var(--beam-core) 22deg,
      var(--beam-mid) 36deg,
      var(--beam-fade) 48deg,
      var(--beam-fade) 360deg);

  /* cut a hole to keep only the ring */
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  animation: spin-angle var(--beam-speed) linear infinite;
  will-change: background;
}

/* soft glow below the crisp ring */
.auth--graphics::after {
  filter: blur(var(--beam-glow));
  opacity: 0.7;
}

/* Animate the registered custom property; works in scoped styles */
@keyframes spin-angle {
  to {
    --beam-angle: 360deg;
  }
}

/* Optional: respect reduced motion */
@media (prefers-reduced-motion: reduce) {

  .auth--graphics::before,
  .auth--graphics::after {
    animation: none;
  }
}
</style>