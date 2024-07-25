import { Router } from "express";
import axios from "axios";
import * as https from "node:https";
import * as http from "node:http";
import fs from "node:fs";
// import db from "../lib/db";

const appRouter = Router()
axios.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

const COOKIE_FILE = './src/cookies.json';

appRouter.get('/', async(req, res) => {
    // const users = await db.genshinDropUser.findMany()
    // const cookies = users.map(user => {
    //     return {
    //         "XSRF-TOKEN": "eyJpdiI6ImlpR3VhTFo4MnRQTnRqazJGY0pZa1E9PSIsInZhbHVlIjoiNkdCaG8xMVJlcmZxeFZvNUVoSTF3TmZ1YkJ6d2dqVFFubXc0THN1ek5mN1RGQis4bFVwbjRoSlZ0UFh4My85VUVPTGJ3d2wvSkVkVjBmNmtjZVM0Q0t2dnl5Unk3eElXQW02WmtVbUozYVlxRE9WNWsvMlN3Q0hTeGhyOElXQXMiLCJtYWMiOiJmN2EzMGM2ZDE4NzdlNjI3MTU5NjA2NGNkZjk2M2RmMGRiYmYwY2QwZTJkZjU3YzkxODc4MWJlMGEzMTYyZjg5IiwidGFnIjoiIn0%3D",
    //         "__ddg1_": "ePcBjBmCEoamgLXnGSTV",
    //         "gd_ses": "eyJpdiI6IjZwRUdOV29MSFpjWXl4Tmx6MSs5cHc9PSIsInZhbHVlIjoieW9mTk9zdDhhUFAzY0xOMTJUMG5zM0R0ZU1BbTFLejB1SzdFbTJ3cU1Na2F2Wkw3cUNKdHFmbGQzelFXbXpXRThZMnphVXJzUXgzUlpISWozRnIwbytOTEJIS1liS3RFTFhXRUQycTU5Z2MzdFFyYWkwR3RINzBSb3JFRXpWNTUiLCJtYWMiOiI3MjU0Y2E2OTk4MTQxNjM3NmFhYTFjY2I0MGFjMDU3ODMyYzRmZDdiNDRlZTE1NTc0YWMzODVkMjA4MjAwNjZhIiwidGFnIjoiIn0%3D",
    //         "inviter": "eyJpdiI6InpLTVRZZnJIVVYrREkvRG9NanhOdkE9PSIsInZhbHVlIjoiZ2xsb0s0M05wOTJRdURkTnhsak4yL05mWWwwekZuWHM3cUp2SFg3TkU1RUgvYTlUZUVvM2pKVTVvWU55ZWN2MkFEc3A3bHJMYmg1cXpYSjRLQUIvcFE9PSIsIm1hYyI6IjllMTgwOWUyY2Y3ZWRhMjBjZDU5YTJjZGMzMTI4NWJiZTFkMjdjODM4ZDZjYzNjZThiYzk4YjkyNzM4NTUxM2YiLCJ0YWciOiIifQ%3D%3D",
    //         "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d": "eyJpdiI6IkFHRHcxNDhyZHBuMUV5KzhCd08xcXc9PSIsInZhbHVlIjoiREVtYnkxYS9GN0RJM3o2TEd5UGJhblV0cVpFZ2hxSUtoOXNQUWgwdStYdE15SzhCWWhkWlZ3Q082SkJ4Y2NaVFFOYlkxdFhrZ3NzaUJtNTltMDBuNzBKVXg0aDZyYS9NUVQvMmJoMnlUeUQvc1lSWll2aTZRVmt0TU5TakpIU3hXQ0J4dEVtMnRvSnhNWlVnaHlqekpBPT0iLCJtYWMiOiI2NGU1YmY1NzkzMWY0OWUwMTg1NTE3ZjhmYWRjZTBjNDEzNTU2YWU5MTY3ZGE4YzM4ZWZmYTU5ODUxNmI5YWY4IiwidGFnIjoiIn0%3D",
    //         "l5wXAXz2IEEaGFpaqUT5i4IKNzZYT574FneuwHCj": 'user.unknownName'
    //     }
    // })
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
export default appRouter