import { Router } from "express";

const appRouter = Router()

appRouter.get('/', (req, res) => {
    res.send('120 примогемов')
})

export default appRouter