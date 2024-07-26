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
import importedModels from './model'
const models = {...importedModels}

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('combined'));
app.use('/farm', appRouter)
app.use(cookieParser());

const COOKIE_FILE = './cookies.json';
app.get('/send-request', async (req, res) => {
    try {
        // Чтение куки из файла, если он существует
        let cookies = {};
        if (fs.existsSync(COOKIE_FILE)) {
            const cookieData = fs.readFileSync(COOKIE_FILE, 'utf-8');
            cookies = JSON.parse(cookieData);
        }
        console.log(cookies)
        // Отправка POST-запроса с куки
        const response = await axios.post('https://genshindrop.com/checkin/checkin', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'ru',
                'X-Csrf-Token': 'FrijjrlwTsP6MsR9lPTPm4xPVVzsydcXrlRG3bJ8',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
                'Cookie': Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ')
            }
        });

        // Сохранение новых куки в файл
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
            setCookieHeader.forEach(cookieString => {
                const [cookie] = cookieString.split(';');
                const [name, value] = cookie.split('=');
                // @ts-ignore
                cookies[name] = value;
            });

            fs.writeFileSync(COOKIE_FILE, JSON.stringify(cookies, null, 2));
        }

        res.status(200).send('Request sent and cookies saved.');
    } catch (error) {
        console.error('Error sending request:', error);
        res.status(500).send('Error sending request.');
    }
});
const start = async () => {
    try {
        await db.authenticate()
        await db.sync().then(result => {
            console.log("Database connected");
            app.listen(port);
        })
            .catch(err => console.log(err));
    } catch (e) {
        console.log(e)
        console.log(e)
    }
}

// ROLLCAKE XDD uiouijk



void start()
