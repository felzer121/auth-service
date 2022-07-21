import jwt from 'jsonwebtoken'
import { TokenModel } from '../models/token-model.js'

export const generateTokens = async (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30s'})
    return {
        accessToken,
        refreshToken
    }
}

export const saveToken = async (userId, refreshToken) => {
    const tokenData = await TokenModel.findOne({
        where: {
            user: userId
        }
    })
    if(tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }
    const token = await TokenModel.create({user: userId, refreshToken})
    return token;
}

export const removeToken = async (refreshToken) => {
    const tokenData = await TokenModel.destroy({
        where: {refreshToken: refreshToken}
    })
    return tokenData;
}