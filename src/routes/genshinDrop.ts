import {Router} from "express";
import axios from "axios";
import * as https from "node:https";
import * as http from "node:http";
import fs from "node:fs";
import db from "../lib/db";
import GenshinDropUser, {GenshinDropUserInt} from "../model/genshinDropUser";
import {Model} from "sequelize";
// import db from "../lib/db";

const appRouter = Router()
axios.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

const COOKIE_FILE = './src/cookies.json';

appRouter.get('/', async (req, res) => {
    const users = await GenshinDropUser.findAll()
    const cookies = users.map((user) => {
        return {
            "XSRF-TOKEN": user.xsrf,
            "__ddg1_": user.ddg,
            "gd_ses": user.ses,
            "inviter": user.inviter,
            [user.webValue]: user.webValue,
            [user.unknownName]: user.unknownValue
        }
    })
    console.log(cookies)
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

    } catch (e) {
        res.status(401).send({error: e})
    }
})
appRouter.post('/', async (req, res) => {
    try {
        const {body}: { body: GenshinDropUserInt } = req
        const user = await GenshinDropUser.create({...body})
        res.status(200).send(user);
    } catch (e) {
        res.status(401).send({error: e})
    }
})
export default appRouter