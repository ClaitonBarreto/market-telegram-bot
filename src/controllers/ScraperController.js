import puppeteer from 'puppeteer'
import {searchInPage} from '../services/scrapper/scraper.js'


export const scrapPage = async (options) => {

    var url = ''
    const { search, market, pages } = options
    const { AMAZON_URL, ML_URL, AMERICANAS_URL, MAGAZINE_LUIZA_URL, BROWSER } = process.env

    var options
    switch(market) {
        case 'amazon':
            url = AMAZON_URL
            options = {
                inputSearchWay: '#twotabsearchtextbox',
                searchText: search,
                productWay: 'div > span > div > div.a-spacing-medium',
                productLink: '.a-text-normal.a-link-normal',
                productNameWay: 'a.a-text-normal',
                productPriceWay: '.a-price-whole',
                productImageWay: '.s-image',
                currentPaginationWay: '.a-selected',
                pages
            }
            break
        case 'mercado_livre':
            url = ML_URL
            options = {
                inputSearchWay: 'input.nav-search-input',
                searchText: search,
                productWay: '.andes-card',
                productLink: '.ui-search-item__group__element.ui-search-link, .ui-search-result__content.ui-search-link',
                productNameWay: '.ui-search-item__title, .ui-search-item__group__element.ui-search-link',
                productPriceWay: '.price-tag-fraction',
                productImageWay: '.ui-search-result-image__element',
                currentPaginationWay: '.andes-pagination__button--current',
                pages
            }
            break
        case 'americanas':
            url = AMERICANAS_URL
            options = {
                inputSearchWay: 'input.src-input',
                searchText: search,
                productWay: '.product-grid-item',
                productLink: '.Link-bwhjk3-2',
                productNameWay: '.TitleUI-bwhjk3-15',
                productPriceWay: '.PriceUI-bwhjk3-11',
                productImageWay: 'picture > img.ImageUI-sc-9rtsvr-0',
                currentPaginationWay: 'li.active',
                pages
            }
            break
        case 'magalu':
            url = MAGAZINE_LUIZA_URL
            options = {
                inputSearchWay: 'input.field-input-search',
                searchText: search,
                productWay: 'li.nm-product-item:not(.hide-priceapi)',
                productLink: 'a.nm-product-item-container',
                productNameWay: 'h2.nm-product-name',
                productPriceWay: 'div.nm-price-container',
                productImageWay: 'img.nm-product-img',
                currentPaginationWay: '.neemu-pagination-current, .page-current',
                pages
            }
            break
        default:
            return {
                error: true,
                code: 1001,
                message: 'Market place não reconhecido'
            }
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    })
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(0)
    await page.goto(url)

    var data = await searchInPage(page, options)
    
    browser.close()

    return data
}
