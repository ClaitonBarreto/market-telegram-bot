import express from 'express'
import dotenv from 'dotenv'
import ScraperController from './src/controllers/ScraperController.js'
const app = express()
dotenv.config()

app.get('/:search', ScraperController.index)

app.listen(3000)