export const isInteger = (event) => {
  event = event || window.event

  const charCode = event.which ? event.which : event.keyCode
  if (charCode >= 48 && charCode <= 57) {
    return true
  }
  event.preventDefault()
}

export const wait = (ms) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms)
  })
}

export const withCommasAndFixed = (number, fixed = 1) => {
  if (!number) return 0
  const parts = parseFloat(number).toFixed(fixed).toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
