import joi from 'joi'
import userService from '../service/user-service.js'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'

import db from "../models/index.js";
import {DataTypes} from 'sequelize'

const User = db.sequelize.define("User", {
    email: { type: DataTypes.STRING},
    password: { type: DataTypes.STRING},
    isActivated: {type: DataTypes.BOOLEAN},
    activationLink: {type: DataTypes.STRING},
});
User.sync()
export const registration = async (ctx, next) => {
    try {
        const { username, password } = ctx.request.body;
        const schema = joi.object({
            username: joi.string()
                .min(3)
                .max(15)
                .required(),
            password: joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
        })
        const result = schema.validate({username: username, password: password});
        
        if (result.error) 
            ctx.body = result.error.message
        
            
        const userData = async (username, password) => {
            // const candidate = await UserModel.findOne({
            //     where: { 
            //         username: username
            //     }
            // })
            // if (candidate) {
            //     throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
            // }
            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = v4(); // v34fa-asfasf-142saf-sa-asf
            console.log(123)

            const user = await User.create({username, password: hashPassword, activationLink})
           
            // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            
            // const userDto = new UserDto(user); // id, email, isActivated
            // const tokens = tokenService.generateTokens({...userDto});
            // await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
            return {...tokens, user: userDto}
        }
        userData(username, password)
    } catch (e) {
        next(e)
    }
}
