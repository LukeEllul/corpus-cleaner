const cheerio = require('cheerio');
const {iterateThroughFiles} = require('../fileOps');
const fs = require('fs');

// const exampleTextPath = './texts/A/A1/A1B.xml';

// const text = fs.readFileSync(exampleTextPath).toString();

// const $ = cheerio.load(text, {
//     xmlMode: true
// });

// const cleanText = $('s').map(
//     (i, el) => $(el).children().map(
//         (i, el) => $(el).text()
//     ).get().join('')
// ).get();

//console.log(cleanText.join(' '));

//fs.writeFileSync('./cleanText.txt', cleanText.join(' '));

const clean = textsLocations => iterateThroughFiles(textsLocations)(
    (text, textLocation) => {
        const $ = cheerio.load(text.toString(), {
            xmlMode: true
        });
        const cleanText = $('s').map(
            (i, el) => $(el).children().map(
                (i, el) => $(el).text()
            ).get().join('')
        ).get();
        fs.writeFileSync(
            './cleanTexts' + textLocation.slice(textLocation.lastIndexOf('/'), textLocation.lastIndexOf('.')) + '.txt',
            cleanText.join(' ')
        );
    } 
);

module.exports = {
    clean
};