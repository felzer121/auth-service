import db from "./index.js";
import { DataTypes } from 'sequelize'
import { UserModel } from "./user-model.js";

export const TokenModel = db.sequelize.define("Token", {
    user: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING }
});

TokenModel.hasOne(UserModel)