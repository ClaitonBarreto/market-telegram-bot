import puppeteer from 'puppeteer'
import xl from 'excel4node'

const url = 'https://www.amazon.com.br/s?k=iphone&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss_2'

let scrapper = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        product: 'chrome'
    })

    const page = await browser.newPage()
    await page.goto(url)
    
    const result = await page.evaluate(() => {
        const products = []
        document.querySelectorAll('div > span > div > div.a-spacing-medium')
        .forEach((product) => {
            
            var productArray = []

            let name = product.children[2].innerText
            let price = 'Valor não informado'//product.children[4].innerText
            
            if(product.children[4] !== undefined) {
                let rawPrice = product.children[4].innerText

                let formatedPrice = rawPrice.substr(rawPrice.indexOf('R$'), rawPrice.indexOf('\n'))

                if(rawPrice.indexOf("R$") == -1) {
                    formatedPrice = "Valor não informado"
                }
                
                price = formatedPrice
            }

            productArray = [
                name,
                price
            ]

            products.push(productArray)
        })
        
        return products
    })


    browser.close()
    return result
}

scrapper().then((result) => {
    
    var headers = ["Nome do Produto", "Valor do Produto"]

    var wb = new xl.Workbook()

    var ws = wb.addWorksheet('Resultado de busca')

    var tabStyle = wb.createStyle({
        font: {
            color: '#000000',
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    var headerStyle = wb.createStyle({
        font: {
            color: '#000000',
            bold: true
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    ws.cell(1,1).string(headers[0]).style(headerStyle)
    ws.cell(1,2).string(headers[1]).style(headerStyle)

    result.map((line, key) => {
        ws.cell(key+2, 1).string(line[0]).style(tabStyle)
        ws.cell(key+2, 2).string(line[1]).style(tabStyle)
    })

    wb.write('Teste.xls')

})