import dotenv from 'dotenv'
import * as BotController from './src/controllers/BotController.js'
dotenv.config()

BotController.init()