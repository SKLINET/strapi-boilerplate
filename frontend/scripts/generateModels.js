/* eslint-disable */
const dotenv = require('dotenv');
const fs = require('fs');
const appDir = require('path');
const axios = require('axios');
dotenv.config();

async function generateModels() {
    console.log('Downloading models from Strapi');
    const contentTypes = await axios.get('http://localhost:1337/api/content-type-builder/content-types');
    const components = await axios.get('http://localhost:1337/api/content-type-builder/components');
    if (contentTypes && components) {
        console.log('Data fetched, processing');
        const modelsArr = contentTypes.data.data.concat(components.data.data);
        const data = modelsArr.reduce((previousValue, currentValue) => {
            if (currentValue.apiId === undefined) {
                return previousValue;
            } else {
                previousValue[currentValue.apiId] = currentValue.uid;
                return previousValue;
            }
        }, {});

        const path = `./src/models.json`;
        console.log(`Writing models' information to ${path}`);
        await fs.promises.writeFile(path, JSON.stringify(data));
        console.log('Done');
    }
}

generateModels();

module.exports = {
    generateModels,
};
