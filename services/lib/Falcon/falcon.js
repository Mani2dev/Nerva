class Falcon {
  constructor(limit, windowMS) {
    this.limit = limit             // Max requests allowed per time window
    this.windowMS = windowMS       // Window size in milliseconds
    this.requests = new Map()      // Tracks each identifier's usage
    // Map looks like: { "userId" => { count: <#requests>, startTime: <ms timestamp> } }
  }

  /**
   * Decide whether this identifier’s request should be allowed or blocked
   * @param {string} identifier - Unique key for the client (e.g., IP, user ID)
   * @returns {boolean} true if allowed, false if blocked
   */
  allow(identifier) {
    const now = Date.now() // Current time in ms

    // Case 1: First request from this identifier
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, { count: 1, startTime: now })
      return true // First request is always allowed
    }

    // Case 2: We’ve seen this identifier before → fetch their data
    const clientData = this.requests.get(identifier)

    // Check if we’re still inside the same window
    if (now - clientData.startTime < this.windowMS) {
      // If under the request limit, allow and increment count
      if (clientData.count < this.limit) {
        clientData.count++
        return true // allowed
      } else {
        return false // blocked — limit hit within window
      }
    }
    // Case 3: Window expired → reset counter + window start
    else {
      this.requests.set(identifier, { count: 1, startTime: now })
      return true // allowed again after reset
    }
  }
}
