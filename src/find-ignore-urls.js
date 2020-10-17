const fs = require('fs');
const { url } = require('inspector');
const regex = /^https?:\/\/[^-\s]*/gm;

const findIgnoreUrls = (ignoreFilename) => {
    let data = fs.readFileSync(ignoreFilename).toString();
    urlToIgnore = data.match(regex);
    const ingoreUrlRegex = new RegExp('(' + urlToIgnore.join("|") +').*') // joins urls from ignore file to make a regex expression, .* is to match anything after the base url

    return ingoreUrlRegex
}

module.exports = findIgnoreUrls;