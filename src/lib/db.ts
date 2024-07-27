import {Sequelize} from "sequelize";

const db = new Sequelize(
    process.env.POSTGRES_DB as string,
    process.env.POSTGRES_USER as string,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        port: Number(process.env.POSTGRES_PORT),
    }
);

export default db