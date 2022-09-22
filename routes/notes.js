const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET route for retrieving all notes
    // Read json from db.json file and return parsed data
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            res.status(500);
                return
        } else {
        res.json(JSON.parse(data));}
    })
});

// GET route for a specific note
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            res.status(500);
                return
        } 
        const parsedData = JSON.parse(data);
        const result = parsedData.filter((note) => note.note_id === noteId);
        return result.length > 0
        ? res.json(result)
        : res.json('There is no note with that ID.');
    })
});

// DELETE route for a specific note
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            res.status(500);
                return
        }
        const parsedData = JSON.parse(data);
        const result = parsedData.filter((note) => note.id !== noteId);
        fs.writeFile('./db/db.json', JSON.stringify(result, null, '  '), (err) => {
            if (err) {
                res.status(500);
                return
            }
            res.json(`Note ${noteId} has been deleted.`);
        })
    })

});

// POST route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    // if there is indeed a title and text
    if (req.body) {
        const newNote = {
            title, 
            text,
            id: uuidv4(),
        };
        //readAndAppend(newNote, './db/db.json'); TODO!
        fs.readFile('./db/db.json', (err, data) => {
            if (err) {
                res.status(500);
                return
            }
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            console.log(parsedData);
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, '  '), (err) => {
                if (err) {
                    console.error('There was an error adding your note!')
                }
                res.json(`Note added successfully!`);
            })
        })
    } 
})

// Export notes router
module.exports = notes;