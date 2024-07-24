import { Router } from "express";
import ggDropRouter from './ggDrop'
import genshinDropRouter from './genshinDrop'

const appRouter = Router()

appRouter.use('/ggdrop', ggDropRouter)
appRouter.use('/genshin-drop', genshinDropRouter)

export default appRouter