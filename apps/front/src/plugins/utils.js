export const isInteger = (event) => {
  event = event || window.event

  const charCode = event.which ? event.which : event.keyCode
  if (charCode >= 48 && charCode <= 57) {
    return true
  }
  event.preventDefault()
}
