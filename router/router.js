import Router from 'koa-router'
import { registrationController, loginController, logoutController } from '../controllers/user-controller.js'

export const apiRoutes = new Router()
    .get('/api', async (ctx, next) => {
        ctx.body = '123'
    })

    .post('/api/registration', registrationController)

    .post('/api/login', loginController)

    .post('/api/logout', logoutController)
