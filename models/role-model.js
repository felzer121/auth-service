import db from "./index.js";
import { DataTypes } from 'sequelize'
import { UserModel } from "./user-model.js";

export const RoleModel = db.sequelize.define("Role", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, unique: true}
})
