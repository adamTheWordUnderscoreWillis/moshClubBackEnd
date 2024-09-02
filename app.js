const { getAllAlbums } = require('./components/controllers/albumControllers');

express = require('express');
const app = express();

app.get("/api/albums", getAllAlbums);

module.exports = app;