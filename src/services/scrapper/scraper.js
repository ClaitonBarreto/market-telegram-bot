export const searchInPage = async (page, options) => {
    console.log("AQUI")
    return new Promise( async (resolve, reject) => {
        await page.focus(options.inputSearchWay)
        await page.keyboard.type(options.searchText)
        await page.keyboard.press("Enter")

        await page.on('load', async () => {
            getResultFromPage(page, options)
            .then((data) => {
                resolve(data)
            })
        })
    })
    
}

const getResultFromPage = async (page, options) => {
        
    console.log(options)
    const result = await page.evaluate((options) => {
        const products = []
        document.querySelectorAll(options.productWay)
        .forEach((product) => {

            var productArray = []

            let name = null
            let price = 0

            
            if(product.querySelectorAll(options.productNameWay)[0] !== undefined)
                name = product.querySelectorAll(options.productNameWay)[0].innerText
            
            if(product.querySelectorAll(options.productPriceWay)[0] !== undefined)
                price = product.querySelectorAll(options.productPriceWay)[0].innerText

            price = `R$${price}`.replace('\n','')
        

            productArray = [
                name,
                price
            ]

            if(price !== 'R$0')
                products.push(productArray)
        })
        
        return products
    }, options)

    return result
}   


