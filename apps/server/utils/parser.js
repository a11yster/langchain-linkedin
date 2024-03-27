import fs from 'fs'
import csv from 'csv-parser'

function filterContentFromRonJohnson(csvFilePath, jsonFilePath) {
    const data = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.FROM && row.FROM.trim() === "🇨🇦 Ron Johnson - MA, MBA, B.E 🇮🇳🇺🇸") {
                data.push(row.CONTENT);
            }
        })
        .on('end', () => {
            fs.writeFile(jsonFilePath, JSON.stringify(data, null, 4), (err) => {
                if (err) throw err;
                console.log('Filtered content from Ron Johnson successfully written to JSON file.');
            });
        });
}

// Example usage:
const csvFilePath = './messages.csv';  // Path to your CSV file
const jsonFilePath = 'ron_johnson_content.json';  // Path to where you want to save the filtered JSON file
filterContentFromRonJohnson(csvFilePath, jsonFilePath);
