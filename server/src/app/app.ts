import * as express from 'express'
import * as pinoHttp from 'pino-http'
import * as helmet from 'helmet'
import { logger } from './services/logger.service'
import index from './routes'
import { Response, Request } from 'express'

const app = express()

// Middlewares
app.use(pinoHttp({ logger }))
app.use(helmet())

// Routes
app.use(index)

// Error handler
app.use((e: Error, req: Request, res: Response) => {
  logger.error(e)
  res.status(500).send('Something broke!')
})

export default app
