const connections = new Map()

export default class SSEClient {
  constructor(clientId, options = {}) {
    const { baseUrl = process.env.VUE_APP_SSE_CHANNEL || '', url, maxRetries = 3, withCredentials = true, msgHandler } = options
    this.clientId = clientId
    this.url = url || `${baseUrl}${clientId}`
    this.options = {
      maxRetries,
      withCredentials,
      ...options
    }
    this.eventSource = null
    this.listeners = new Map()
    this.retryCount = 0
  }

  connect() {
    try {
      if (connections.has(this.url)) {
        console.warn(`[sse-connect-exists][${this.clientId}]:`, this.url)
        this.eventSource = connections.get(this.url).eventSource
        return
      }

      this.eventSource = new EventSource(this.url, {
        withCredentials: this.options.withCredentials
      })

      connections.set(this.url, this)

      this.on('error', (e) => {
        console.error(`[sse-error][${this.clientId}]:`, e)
        this.reconnect()
      })

      this.on('open', (e) => {
        console.log(`[sse-open][${this.clientId}]:`, e)
        this.retryCount = 0
      })

      this.on('message', (e) => {
        console.log(`[sse-message][${this.clientId}]:`, e)
        try {
          let res = e.data
          if (res && typeof res == 'string') {
            res = JSON.parse(res)
          }
          if (typeof this.options.msgHandler == 'function') {
            this.options.msgHandler(res)
          }
        } catch (err) {
          console.error(`[sse-parse-error][${this.clientId}]:`, err)
        }
      })
    } catch (error) {
      console.error(`[sse-init-error][${this.clientId}]:`, error)
      this.reconnect()
    }
  }

  close() {
    if (this.eventSource) {
      console.log(`[sse-close][${this.clientId}]:`, this.url)
      this.listeners.forEach(listener => {
        this.off(listener)
      })
      this.eventSource.close()
      this.eventSource = null
      connections.delete(this.url)
    }
  }

  reconnect() {
    this.close()
    if (this.retryCount < this.options.maxRetries) {
      console.log(`[sse-reconnect][${this.clientId}]:`, this.retryCount)
      this.retryCount++
      this.connect()
    }
  }

  on(event, listener) {
    if (this.listeners.has(event)) {
      this.off(event)
    }
    this.eventSource.addEventListener(event, listener)
    this.listeners.set(event, listener)
  }

  off(event) {
    if (this.listeners.has(event)) {
      this.eventSource.removeEventListener(event, this.listeners.get(event))
      this.listeners.delete(event)
    }
  }
}