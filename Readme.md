![Imagem Principal](https://claitonbarreto-images.s3.us-east-2.amazonaws.com/Group+1.png)

# Web Scraper

## Objective
This project was developed as a task of the company BPA. The script consists of a web scraper that searches Amazon for the keyword iPhone, scrolls through all items on the first results page and extracts the product name and value from the results, after which it saves the data in an excel spreadsheet.

## Used libraries
- **Puppeteer** to scraping pages
- **Excel4node** to generate and write xls files

## To run the project

### Steps
- Node JS (12 ^) is required install on server

- Download the .zip or run: 

```
    git clone https://github.com/claitonbarreto/webscraper.git
    
```

- To run the project in local server:
```javascript
//enter in the directory project
cd webscraper

//install the dependencies
npm install // or yarn

//execute the project
node scraper
```

### OBS
>it is possible to throw an error stating that Firefox is not installed, even if >it is. To resolve this issue, run this command: `PUPPETEER_PRODUCT = firefox >npm install` or `PUPPETEER_PRODUCT = firefox yarn install` according to your >dependency manager.
