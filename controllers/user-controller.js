import joi from 'joi'
import { registrationService } from '../service/user-service.js'

export const registration = async (ctx, next) => {
    try {
        const { email, password } = ctx.request.body;
        const schema = joi.object({
            email: joi.string()
                .min(3)
                .max(15)
                .required(),
            password: joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
        })
        const result = schema.validate({email: email, password: password});
        
        if (result.error) 
            ctx.body = result.error.message
        
        registrationService(email, password)

        ctx.body = 'success'
    } catch (e) {
        ctx.body = e
    }
}
