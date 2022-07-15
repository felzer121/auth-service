import Koa from 'koa'
import compress from 'koa-compress'
import cors from '@koa/cors'
import { apiRoutes } from './router/router.js'
import dotenv from 'dotenv'
dotenv.config()

// const { Pool } = postgresql;
const PORT = process.env.PORT || 5000;

const app = new Koa()

const start = async () => {
    try {
        app
            .use(compress())
            .use(cors())
            .use(apiRoutes.routes())
        // app
        //     .pool = new Pool({
        //         user: 'postgres',
        //         host: 'localhost',
        //         database: 'airbnb',
        //         password: '1234',
        //         port: 5432,
        //     })


        app.listen(PORT, () => {
            console.log(`start server in 5000 port` )
        })
    } catch (e) {
        console.log(e);
    }
}

start()
