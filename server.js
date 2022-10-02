const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes/index.js');
const { v4: uuidv4 } = require ("uuid");

const PORT = process.env.PORT || 3001;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//get route for reading notes database
app.get ('/api/notes', (req, res) => {
fs.readFile(path_join(_dirname,'./db/db.json' ), "utf8", (error, notes) => {
  if (error) {
    console.log("error reading note from db")
  }
  res.json(JSON.parse(notes))
})
});

//get route for writing to notes database
app.post('./api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFile('./db/db.json'));
  const uniqueId = uuidv4();
  const newNotes = req.body;
  newNoteId = uniqueId;
  notes.push(newNotes);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) => {
   if (err) {
    console.log("Error writing note to db");
   }
   res.json(notes);
   console.log("New note added to db");
  })
});

// GET Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET Route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Wildcard route to direct users to home page
//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'public/index.html'))
//});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});
