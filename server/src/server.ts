require('dotenv').config()
import * as cluster from 'cluster'
import * as os from 'os'

import app from './app/app'
import { log, errLog } from './app/services/logger.service'
import { configService } from './app/services/config.service'
import { DBService } from './app/services/db.service'

const { port, nodeEnv, isProd } = configService.get('bootstrap')

if (cluster.isMaster && isProd) {
  os.cpus().forEach(() => cluster.fork())

  cluster
    .on('fork', (worker: cluster.Worker): void => {
      log('Cluster forking new worker %d', worker.id)
    })
    .on('listening', (worker: cluster.Worker): void => {
      log('Cluster listening new worker %d', worker.id)
    })
    .on('exit', (worker: cluster.Worker, code: number, signal: string): void => {
      log('Worker %d died :(', worker.id)
      log('%o', { code, signal, worker })
    })
    .fork()
} else {
  process.on('unhandledRejection', (reason: any, promise: Promise<any>): void => {
    errLog('Unhandled rejection %o', { reason, promise })
  })

  process.on('uncaughtException', (error: any): void => {
    errLog('Uncaught Exception %o', error)
    // do a graceful shutdown (TODO: shutdown db)
    process.exit(1)
  })

  process.on('message', (msg: any): void => {
    log(`Worker ${process.pid} received message from master message: ${msg}`)
  })

  app.listen(port, (): void => {
    new DBService()
    log('Started server')
    log(`Running at http://localhost:${port} in ${nodeEnv} mode`)
  })
}
