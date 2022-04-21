import winston from 'winston'

import format from './format.js'
import loki from './loki.js'

const { createLogger, transports } = winston

const levels = {
  crit: 0,
  error: 1,
  warn: 2,
  notice: 3,
  info: 4,
  debug: 5,
  silly: 6,
  trace: 7,
}

const colors = {
  crit: 'red',
  error: 'red',
  warn: 'yellow',
  notice: 'yellow',
  info: 'green',
  debug: 'blue',
  silly: 'magenta',
  trace: 'gray',
}

winston.addColors(colors)

const level = process.env.LOG_LEVEL || 'info'
const loggerOptions = {
  exitOnError: false,
  levels,
  level,
  format,
  transports: [new transports.Console(loki())],
}

export default createLogger(loggerOptions)
