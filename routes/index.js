const express = require('express');

// Require the notes router file
const notesRouter = require('./notes');

// Set express as a variable to use
const app = express();

app.use('/notes', notesRouter);

module.exports = app;