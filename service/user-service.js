import ApiError from '../exceptions/api-error.js'
import { UserModel } from '../models/user-model.js'
import { generateTokens, saveToken, removeToken } from '../service/token-service.js'
import UserDto from '../dtos/user-dto.js'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

export const registrationService = async (email, password) => {
    const candidate = await UserModel.findOne({
        where: {
            email: email
        }
    })
    if (candidate) {
        throw ApiError.BadRequest(`Почтовый адрес ${email} уже зарегистрирован`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();

    const user = await UserModel.create({email, password: hashPassword, activationLink})
    
    // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    
    const userDto = new UserDto(user);
    const tokens = await generateTokens({...userDto});
    await saveToken(userDto.id, tokens.refreshToken);
    
    
    return {...tokens, user: userDto}
}


export const loginService = async (email, password) => {
    const user = await UserModel.findOne({
        where: {
            email: email
        }
    })
    
    if(!user)
        return {status: 400, message: 'Пароль неверный'}
    
    const isPassEquals = await bcrypt.compare(password, user.password)
    
    if(!isPassEquals)
        return {status: 400, message: 'Пароль неверный'}

    const userDto = new UserDto(user);
    const tokens = generateTokens({...userDto})
    await saveToken(userDto.id, (await tokens).refreshToken)

    return {...tokens, user: userDto}
}

export const logoutService = async (refreshToken) => {
    const token = await removeToken(refreshToken);
    return token;
}