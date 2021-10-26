const JSONRPC = '2.0'

export const isInteger = (event) => {
  event = event || window.event

  const charCode = event.which ? event.which : event.keyCode
  if (charCode >= 48 && charCode <= 57) {
    return true
  }
  event.preventDefault()
}

export const wait = (ms) => {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms)
  })
}

export const isJSONRPCMessage = (payload) => {
  if (!payload) {
    return false
  } else {
    return (
      payload.jsonrpc === JSONRPC &&
      payload.method !== undefined &&
      payload.params !== undefined
    )
  }
}
