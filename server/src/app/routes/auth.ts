import { Router, Request, Response } from 'express'

const router = Router()

router.post('/sign-in', async (req: Request, res: Response, next) => {
  try {

  } catch (e) {
    next(e)
  }
})

router.post('/sign-up', async (req: Request, res: Response, next) => {
  try {

  } catch (e) {
    next(e)
  }
})

export default router
