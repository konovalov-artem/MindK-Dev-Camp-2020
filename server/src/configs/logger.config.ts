import { DestinationStream, LoggerOptions } from 'pino'

// TODO: add more options for logger
export default {
  prettyPrint: {
    colorize: true,
  },
} as LoggerOptions | DestinationStream
