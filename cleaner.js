const cheerio = require('cheerio');
const fs = require('fs');

const exampleTextPath = './texts/2554/download/Texts/A/A1/A1B.xml';

const text = fs.readFileSync(exampleTextPath).toString();

const $ = cheerio.load(text, {
    xmlMode: true
});

const cleanText = $('s').map(
    (i, el) => $(el).children().map(
        (i, el) => $(el).text()
    ).get().join('')
).get();

//console.log(cleanText.join(' '));

fs.writeFileSync('./cleanText.txt', cleanText.join(' '));