import db from "./index.js";
import { DataTypes } from 'sequelize'
import { RoleModel } from "./role-model.js"

export const UserModel = db.sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: { type: DataTypes.STRING, unique: true},
    password: { type: DataTypes.STRING },
    about: { type: DataTypes.STRING, defaultValue: null },
    name: { type: DataTypes.STRING, defaultValue: null },
    url: { type: DataTypes.STRING, defaultValue: null },
    location: { type: DataTypes.STRING, defaultValue: null },
    hideProfile: { type: DataTypes.BOOLEAN, defaultValue: false },
    isSendMessge: { type: DataTypes.BOOLEAN, defaultValue: true },
    isActivated: { type: DataTypes.BOOLEAN },
    activationLink: { type: DataTypes.STRING },
})

UserModel.belongsTo(RoleModel)
RoleModel.hasMany(UserModel)