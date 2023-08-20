const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now(); // Assign a unique ID using the current timestamp
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  notes.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notes), 'utf8');
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
