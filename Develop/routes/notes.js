const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
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
    // Read json from db.json file and return parsed data
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET route for a specific note
// notes.get('/:note_id', (req, res) => {

// });

// POST route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    // if there is indeed a title and text
    if (req.body) {
        const newNote = {
            title, 
            text,
            tip_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully!`)
    } else {
        res.error('Error adding note.');
    }
})

// Export notes router
module.exports = notes;