
const { getAlbumByID, getAllAlbumsById, getAlbumbyNameAndArtist } = require('./components/controllers/albumControllers');
const { getAuthorisationToken } = require('./components/controllers/authorisationControllers');
const { createReview, removeReviewById, getReviewsByAlbum } = require('./components/controllers/reviewControllers')
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send({msg:'Go fuck yourself'});
  });

app.get("/api/auth",getAuthorisationToken);
app.post("/api/albums/:spotify_id", getAlbumByID);
app.post("/api/albums", getAllAlbumsById);
app.post("/api/search", getAlbumbyNameAndArtist);

app.get("/api/reviews/:spotify_id", getReviewsByAlbum)
app.post("/api/reviews", createReview);

app.delete("/api/review/:review_id", removeReviewById)

module.exports = app;