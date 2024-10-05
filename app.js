
const { getAlbumByID, getAllAlbumsById, getAlbumbyNameAndArtist } = require('./components/controllers/albumControllers');
const { getAuthorisationToken } = require('./components/controllers/authorisationControllers');
const { createReview, removeReviewById } = require('./components/controllers/reviewControllers');

const express = require('express');
const app = express();

app.use(express.json())

app.get("/api/auth",getAuthorisationToken);

app.get("/api/albums/:spotify_id", getAlbumByID);
app.get("/api/albums", getAllAlbumsById);
app.get("/api/search", getAlbumbyNameAndArtist);

app.post("/api/reviews", createReview);

app.delete("/api/review/:review_id", removeReviewById)

module.exports = app;