const router = require("express").Router();
const fs = require("fs");

const uuid = require("../db/uuid");

// create a get route for the /api/notes it has to read the contents of the db.json file
router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  });
});

// POST route to add a new note to db.json
router.post("/notes", (req, res) => {
  // Read the contents of db.json
  console.log(req.body);

  const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    // Add req.body to the array of parsed data
    data.push(newNote);
  }

  // Write the parsed data array back into db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(data));

  res.json(data); // Respond with the updated data
});

// Delete route to delete a note by id
router.delete("/notes/:id", (req, res) => {
  // Finds the note by its id
  const noteId = req.params.id;
  const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  // Create a new array with all of the notes except the one we want to delete
  const newData = data.filter((note) => note.id !== noteId);

  // Check if any note was removed by comparing the lengths of the original and new arrays
  if (newData.length !== data.length) {
    // Write the new data array back to the db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(newData));
    // Respond with the updated data array
    res.json(newData);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

module.exports = router;
