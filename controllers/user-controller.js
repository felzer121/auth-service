import joi from 'joi'
import ApiError from '../exceptions/api-error.js'
import { registrationService, loginService, logoutService, refreshService } from '../service/user-service.js'
import { RoleModel } from '../models/role-model.js'

export const isRoleCreate = async () => {
    const roles = [
        'user',
        'admin'
    ]
    await Promise.all(roles.map(async role => {
        const isRole = await RoleModel.findOne({
            where: {
                role: role
            }
        })
        if(!isRole) {
            await RoleModel.create({
                role: role
            })
        }
    }))
}

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
        
        if (result.error) {
            ctx.status = err.status || 500;
            ctx.body = err.message
        }
        
        const userData = await registrationService(email, password)
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        ctx.body = userData
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message
    }
}

export const loginController = async (ctx, next) => {
    try {   
        const { email, password } = ctx.request.body
        
        const userData = await loginService(email, password)
        if(userData.status)
           throw ApiError.UnauthorizedError(userData.message);
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, overwrite: true })
        ctx.body = userData
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message
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

export const refreshController = async (ctx, next) => {
    try {
        const refreshToken = ctx.cookies.get('refreshToken')
        const userData = await refreshService(refreshToken)
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, overwrite: true })
        ctx.body = userData
    } catch(err) {
        ctx.status = err.status || 500;
        ctx.body = err.message
    }
}