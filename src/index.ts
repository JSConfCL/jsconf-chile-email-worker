import { json, error, ThrowableRouter } from 'itty-router-extras' // https://github.com/kwhitley/itty-router-extras#throwablerouter
import { handleSubscribe } from './routes/subscribe'
import { handleCors } from './middlewares'
import { Env } from './sharedTypes'
import { handleVolunteerApplication } from './routes/volunteer'

const router = ThrowableRouter()

router.options('*', handleCors())
router.post('/subscribe', handleSubscribe)
router.post('/volunteer', handleVolunteerApplication)
// router.all('*', () => json({ success: false }, { status: 500 }))

export default {
  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {
    try {
      return await router.handle(request, env, ctx)
    } catch (err) {
      console.error('ERROR', request.url, (err as Error).message, err)
      return await error(500, 'Internal Worker Error')
    }
  },
}
