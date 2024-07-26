import {Sequelize} from "sequelize";

const db = new Sequelize(
    process.env.PG_DB as string,
    process.env.PG_USER as string,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: 'postgres',
        port: 5432,
    }
);

export default db