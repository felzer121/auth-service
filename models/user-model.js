import db from "./index.js";
import {DataTypes} from 'sequelize'

export const UserModel = db.sequelize.define("User", {
    email: { type: DataTypes.STRING},
    password: { type: DataTypes.STRING},
    isActivated: {type: DataTypes.BOOLEAN},
    activationLink: {type: DataTypes.STRING},
});


