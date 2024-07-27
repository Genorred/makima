import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import appRouter from './routes'
import * as fs from "node:fs";
import axios from "axios";
import db from "./lib/db";
import {DataTypes} from "sequelize";
import cron from 'node-cron';

import importedModels from './model'
const models = {...importedModels}

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('combined'));
app.use('/farm', appRouter)
app.use(cookieParser());

// axios.interceptors.request.use(request => {
//     console.log('Starting Request', request);
//     return request;
// });

cron.schedule('0 12 * * *', async () => {
    try {
        const response = await axios.get('http://localhost:5000/farm/genshin-drop');
        console.log('Запрос успешно выполнен:', response.data);
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }

}, {
    scheduled: true,
    timezone: "Europe/Kiev"  // Укажите ваш часовой пояс здесь
});
const start = async () => {
    try {
        await db.authenticate()
        await db.sync().then(result => {
            console.log("Server started on port " + port);
            app.listen(port);
        })
            .catch(err => console.log(err));
    } catch (e) {
        console.log(e)
        console.log(e)
    }
}

void start()
