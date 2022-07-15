import ApiError from '../exceptions/api-error.js'
import {UserModel} from '../models/user-model.js'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'

class UserService {
    async registration(email, password) {
        console.log(user)
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        
        // const userDto = new UserDto(user); // id, email, isActivated
        // const tokens = tokenService.generateTokens({...userDto});
        // await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
}

export default UserService