// Could also be called htmlRoutes.js

const pageRouter = require('express').Router();
const path = require('path');

// "/notes" responds with the notes.html file
pageRouter.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// All other routes respond with the index.html file
pageRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;