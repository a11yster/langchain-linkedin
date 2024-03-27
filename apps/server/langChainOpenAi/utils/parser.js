import fs from 'fs'

function jsonToTxt(jsonFilePath, txtFilePath) {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        const jsonData = JSON.parse(data);
        const txtData = JSON.stringify(jsonData, null, 4);

        fs.writeFile(txtFilePath, txtData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to TXT file:', err);
                return;
            }
            console.log('JSON data successfully converted to TXT.');
        });
    });
}

const jsonFilePath = './ron_johnson_content.json';  
const txtFilePath = 'data.txt';   
jsonToTxt(jsonFilePath, txtFilePath);

