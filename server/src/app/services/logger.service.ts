import * as pino from 'pino'
import { configService } from './config.service'

// TODO: modify Logger service
export const logger: pino.Logger = pino(configService.get('logger'))

export const log = logger.info.bind(logger)
export const warn = logger.warn.bind(logger)
export const errLog = logger.error.bind(logger)
