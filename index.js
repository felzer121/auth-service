import Koa from 'koa'
import compress from 'koa-compress'
import cors from '@koa/cors'
import { apiRoutes } from './router/router.js'
import db from './models/index.js'
import dotenv from 'dotenv'
import koaBody from 'koa-body'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'
dotenv.config()

// const { Pool } = postgresql;
const PORT = process.env.PORT || 5000;

    const app = new Koa()

const start = async () => {
    try {
        
        await db.sequelize.authenticate()
        await db.sequelize.sync()
        app
            .use(compress())
            .use(cors({
                credentials: true,
                origin: ['http://localhost:3000'],
            }))
            .use(koaBody({ multipart: true }))
            .use(apiRoutes.routes())

        app.listen(PORT, () => {
            console.log(`start server in ${PORT} port`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()
