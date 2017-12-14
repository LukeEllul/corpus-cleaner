const cheerio = require('cheerio');
const {iterateThroughFiles} = require('../fileOps');
const fs = require('fs');

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

const cleanText = rawXml => {
    const $ = cheerio.load(rawXml.toString(), {
        xmlMode: true
    });
    const cleanText = $('s').map(
        (i, el) => $(el).children().map(
            (i, el) => $(el).text()
        ).get().join('')
    ).get();
    return cleanText.join(' ');
}

module.exports = {
    clean,
    cleanText
};