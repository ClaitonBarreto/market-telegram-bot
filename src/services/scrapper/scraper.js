export const searchInPage = async (page, text) => {
    return new Promise( async (resolve, reject) => {
        await page.focus('#twotabsearchtextbox')
        await page.keyboard.type(text)
        await page.keyboard.press("Enter")

        await page.on('load', async () => {
            getResultFromPage(page)
            .then((data) => {
                resolve(data)
            })
        })
    })
    
}

const getResultFromPage = async (page) => {
        
    const result = await page.evaluate(() => {
        const products = []
        document.querySelectorAll('div > span > div > div.a-spacing-medium')
        .forEach((product) => {

            var productArray = []

            let name = null
            let price = 0

            if(product.children[2] !== undefined) {
                name = product.children[2].innerText
            }
            
            if(product.children[4] !== undefined) {
                let rawPrice = product.children[4].innerText

                let formatedPrice = rawPrice.substr(rawPrice.indexOf('R$'), rawPrice.indexOf('\n'))

                if(rawPrice.indexOf("R$") == -1) {
                    formatedPrice = 0
                }
                
                price = formatedPrice
            }

            productArray = [
                name,
                price
            ]

            if(price !== 0)
                products.push(productArray)
        })
        
        return products
    })

    return result
}   


