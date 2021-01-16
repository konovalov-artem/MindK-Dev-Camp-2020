import { Config } from 'knex'
import { errLog, warn } from '../app/services/logger.service'
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env

export default {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  knex: {
    debug: true,
    client: 'pg',
    log: {
      warn: warn,
      error: errLog,
      deprecate: warn,
      debug: ({ sql, bindings, __knexQueryUid }: any) => {
        warn(`${__knexQueryUid}: ${sql}`)
        warn(`${__knexQueryUid}: ${bindings}`)
      },
    },
    connection: {
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,

    }
  },
} as { knex: Config } & { [key: string]: any }
