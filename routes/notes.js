const router =  require('express').Router()
const fs = require('fs');

const uuid = require('../db/uuid');

// create a get route for the /api/notes it has to read the contents of the db.json file
router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    res.json(parsedData)
  })
});


// POST route to add a new note to db.json
router.post('/notes', (req, res) => {
  // Read the contents of db.json
  console.log(req.body);

  const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    }
    // Add req.body to the array of parsed data
  data.push(newNote);
  };

  // Write the parsed data array back into db.json
  fs.writeFileSync('./db/db.json', JSON.stringify(data));

  res.json(data); // Respond with the updated data
});

module.exports = router
