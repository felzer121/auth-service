import Router from 'koa-router'
import { registrationController, loginController, logoutController, refreshController } from '../controllers/user-controller.js'
import authMiddleware from '../middleware/auth-middle.js'

export const apiRoutes = new Router()
    .get('/api/test', authMiddleware, async (ctx, next) => {
        ctx.body = '123'
    })

    .post('/api/registration', registrationController)

    .post('/api/login', loginController)

    .post('/api/logout', logoutController)

    .get('/api/refresh', refreshController)

