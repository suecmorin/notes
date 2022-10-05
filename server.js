const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require ("uuid");

const PORT = process.env.PORT || 3001;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//get route for reading notes database
app.get ('/api/notes', (req, res) => {
fs.readFile(path.join(__dirname,'./db/db.json' ), "utf8", (error, notes) => {
  if (error) {
    console.log("error reading note from db")
  }
  res.json(JSON.parse(notes))
})
});

//get route for writing to notes database
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json',"utf8",  (error, notesarray) => {
    if (error) {
      console.log("error reading note from db")
    }
    let notes = JSON.parse(notesarray);
 
  const uniqueId = uuidv4();

  const newNotes = { id: uniqueId,
    title: req.body.title,
    text: req.body.text };
 
  notes.push(newNotes);
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
   if (err) {
    console.log("Error writing note to db");
   }
   return res.json(notes);
   //console.log("New note added to db");
  })
}) ;
});

// GET Route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET Route for homepage must come last
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});
