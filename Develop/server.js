const express = require('express');
const path = require('path');
// const { nameOfMiddleware } = require('./middleware/nameOfMiddleware');
// TODO: fix index.js/notes.js to get appropriate api data
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

//import custom middleware
//app.use(nameOfMiddleware);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api); // TODO: see above, fix api

// Make the files in the public folder accessible?
app.use(express.static('public'));

// GET Route for notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for homepage
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () => 
   console.log(`App listening at http://localhost:${PORT}`) 
);