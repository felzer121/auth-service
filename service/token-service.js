import jwt from 'jsonwebtoken'
import { TokenModel } from '../models/token-model.js'

export const generateTokens = async (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30m'})
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

export const validateRefreshToken = async (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return userData;
    } catch (e) {
        return null;
    }
}

export const validateAccessToken = async (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return userData;
    } catch (e) {
        return null;
    }
}

export const findToken = async(refreshToken) => {
    const tokenData = await TokenModel.findOne({
        where: {refreshToken: refreshToken}
    })
    return tokenData;
}