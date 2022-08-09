import ApiError from '../exceptions/api-error.js';
import { validateAccessToken } from '../service/token-service.js'

export default function (ctx, next) {
    try {
        const authorizationHeader = ctx.headers.authorization;
        if (!authorizationHeader) {
            throw ApiError.UnauthorizedError()
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = validateAccessToken(accessToken);
        if (!userData) {
            throw ApiError.UnauthorizedError()
        }
        ctx.user = userData;
        return next()
    } catch (e) {
        throw ApiError.UnauthorizedError();
    }
};