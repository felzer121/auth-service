import db from "./index.js";
import { DataTypes } from 'sequelize'

export const UserModel = db.sequelize.define("User", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: { type: DataTypes.STRING, unique: true},
    password: { type: DataTypes.STRING },
    isActivated: {type: DataTypes.BOOLEAN },
    activationLink: {type: DataTypes.STRING },
})


