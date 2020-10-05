import puppeteer from 'puppeteer'
import {searchInPage} from '../services/scrapper/scraper.js'


const ScraperController = {

    index: async (req,res) => {

        const { search } = req.params
        const { AMAZON_URL } = process.env
        const browser = await puppeteer.launch({
            headless: true,
            product: 'chrome'
        })
    
        const page = await browser.newPage()
        await page.goto(AMAZON_URL)
        
        searchInPage(page, search)
        .then(data => {
            browser.close()
            res.json(data)
        })
    }
}

export default ScraperController