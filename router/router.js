import Router from 'koa-router'
import { registration } from '../controllers/user-controller.js'
import busboy from 'koa-busboy';

export const apiRoutes = new Router()
    .get('/api', async (ctx, next) => {
        ctx.body = '123'
    })

    .post('/api/registration', busboy(), registration);
