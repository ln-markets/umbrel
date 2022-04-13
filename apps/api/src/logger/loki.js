import winston from 'winston'

const { format } = winston
const { combine, timestamp, printf, colorize } = format

export default () => {
  const loki = printf((info) => {
    const { timestamp, level, message, reqid, uid, ip } = info

    let base = `ts="${timestamp}"`
    base += ` level="${level}"`.padEnd(24)
    if (reqid) base += ` reqid="${reqid}"`
    if (uid) base += ` uid="${uid}"`
    if (ip) base += ` ip="${ip}"`

    if (info.error) {
      base += ` ${info.error}`
      return base
    } else if (Array.isArray(info.message)) {
      return (base += ` ${JSON.stringify(info.message)}`)
    } else if (typeof info.message === 'object') {
      for (const key in info.message) {
        if (info.message[key]) {
          if (key === 'message') {
            base += `msg="${info.message[key]}" `
          } else {
            base += ` ${key}="${info.message[key]}"`
          }
        }
      }

      return base.trimEnd()
    } else {
      return base + ` msg="${message}"`
    }
  })

  return {
    format: combine(colorize(), timestamp(), loki),
  }
}
