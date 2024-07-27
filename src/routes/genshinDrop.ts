import {Router} from "express";
import axios from "axios";
import * as https from "node:https";
import * as http from "node:http";
import fs from "node:fs";
import db from "../lib/db";
import GenshinDropUser, {GenshinDropUserInt} from "../model/genshinDropUser";

const appRouter = Router()

appRouter.get('/', async (req, res) => {
    try {
        const users = await GenshinDropUser.findAll()
        const promises: Promise<any>[] = []
        users.forEach((user, i) => {
            promises.push((async () => {
                const {cookies, csrf} = user

                const response = await axios.post('https://genshindrop.com/checkin/checkin', {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Accept-Encoding': 'gzip, deflate, br, zstd',
                        'Accept-Language': 'ru',
                        'X-Csrf-Token': csrf,
                        'X-Requested-With': 'XMLHttpRequest',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
                        'Cookie': Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ')
                    }
                });
                const {data} = response

                const setCookieHeader = response.headers['set-cookie'];
                if (setCookieHeader) {
                    setCookieHeader.forEach(cookieString => {
                        const [cookie] = cookieString.split(';');
                        const [name, value] = cookie.split('=');
                        cookies[name] = value;
                    });
                    await GenshinDropUser.update({cookies, data}, {where: {id: user.id}})
                }
            })()
                .catch(e => {
                    console.log(e)
                }))
        })
        Promise.all(promises).then(result => {
            res.status(200).send(result);
        })
    } catch (e) {
        res.status(401).send({error: e})
    }
})

appRouter.get('/accounts', async (req, res) => {
    try {
        const users = await GenshinDropUser.findAll()
        console.log("СЕКС ЭТО ЭНЕРГИЯ ")
        res.status(200).json(users);
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
appRouter.delete('/', async (req, res) => {
    try {
        const {body}: { body: GenshinDropUserInt } = req
        const user = await GenshinDropUser.destroy({where: {id: body.id}})
        res.status(200).send(user);
    } catch (e) {
        res.status(401).send({error: e})
    }
})
export default appRouter