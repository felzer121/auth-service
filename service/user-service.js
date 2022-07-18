import ApiError from '../exceptions/api-error.js'
import { UserModel } from '../models/user-model.js'
import { generateTokens, saveToken } from '../service/token-service.js'
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
        throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
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