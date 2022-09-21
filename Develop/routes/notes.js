const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
// const {readFromFile etc.}
const fs = require('fs');
const util = require('util');

// convert callback-based functions to promise-based funcions, using util package
const readFromFile = util.promisify(fs.readFile);

/**
 * Write data to JSON file
 * @param {string} destination the file I want to write to
 * @param {object} content content I want to write to the file
 * @returns {void} 
 */
const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);
/**
 * Read data from a given file and append content
 * @param {object} content content I want to append
 * @param {string} file path to file I want to save to
 * @returns {void}
 */
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

// GET route for retrieving all notes
notes.get('/', (req, res) => {
    fs.readFromFile()
})