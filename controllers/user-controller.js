import joi from 'joi'
import { registrationService, loginService, logoutService } from '../service/user-service.js'


export const registrationController = async (ctx, next) => {
    try {
        const { email, password } = ctx.request.body

        const schema = joi.object({
            email: joi.string()
                .min(3)
                .required(),
            password: joi.string()
                .min(3)
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
        })
        const result = schema.validate({email: email, password: password});
        
        if (result.error) 
            ctx.body = result.error.message
        
        const userData = await registrationService(email, password)
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false, overwrite: false })
        ctx.body = userData
    } catch (e) {
        ctx.body = e
    }
}

export const loginController = async (ctx, next) => {
    try {
        const { email, password } = ctx.request.body
        
        const userData = await loginService(email, password)
        if(userData.status) 
            next(userData.message);
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false, overwrite: false })
        ctx.body = userData
    } catch (e) {
        next(e);
    }
}

export const logoutController = async (ctx, next) => {
    try {
        const { refreshToken } = ctx.cookies
        const token = await logoutService(refreshToken)
        ctx.cookies.set('refreshToken', '', { maxAge: 0 })
        ctx.body = token
    } catch (e) {
        ctx.body = e
    }
}