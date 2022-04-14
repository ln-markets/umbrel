export const SATOSHI = 100000000

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

export const getSign = ({ side, sign }) => {
  if (!side && !sign) throw new Error('getSign missing sign or side')

  if (side === -1 || side === 1) return side
  if (side === 'b') return 1
  else if (side === 's') return -1
  else if (sign) return sign
  else throw new Error('toto')
}

export const calcFuturesPL = ({ side, sign, quantity, price }, lastPrice) => {
  sign = getSign({ sign, side })

  if (!lastPrice) throw new Error('calcPL missing lastPrice')

  return Math.round(sign * quantity * SATOSHI * (1 / price - 1 / lastPrice))
}
