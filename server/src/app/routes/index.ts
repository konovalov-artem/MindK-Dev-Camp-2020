import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', async (req: Request, res: Response, next) => {
  try {
    if (Math.round(Math.random())) {
      await Promise.reject('Ooooopssss, it is you fault!')
    }
    res.send('Hello World!')
  } catch (e) {
    next(e)
  }
})

export default router
