
const { getAlbumByID } = require('./components/controllers/albumControllers');
const { getAuthorisationToken } = require('./components/controllers/authorisationControllers');

express = require('express');
const app = express();

app.get("/api/auth",getAuthorisationToken);
app.get("/api/albums/:spotify_id", getAlbumByID)

module.exports = app;