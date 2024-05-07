const express = require('express');
const path = require('path');
const apiRoutes =  require('./routes/notes')

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes);

// build a get route that goes to /notes and returns the notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});


// build a get route that goes to * and return the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});


app.listen(PORT, () => {
  console.info(`Server started on http://localhost:${PORT}`);
});