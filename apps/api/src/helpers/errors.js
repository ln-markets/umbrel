module.exports = class HttpError extends Error {
  constructor(status, code, message, details) {
    if (!status) throw new Error('An HTTP Error need a status')
    if (!code) throw new Error('An HTTP Error need a code')

    super(code)

    this.name = 'HttpError'
    this.status = status

    if (code) this.code = code
    if (message) this.message = message
    if (details) this.details = details
  }
}
