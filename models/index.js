import Sequelize from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const db_username = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const db_name = process.env.DB_NAME
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT

export const sequelize = new Sequelize(db_name, db_username, db_password, {
    db_host,
    db_port,
    dialect: 'postgres',
    logging: false
})

const db = {
  sequelize
};


export default db;