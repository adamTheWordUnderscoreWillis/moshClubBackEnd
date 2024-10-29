
const { getAlbumByID, getAllAlbumsById, getAlbumbyNameAndArtist } = require('./components/controllers/albumControllers');
const { getAuthorisationToken } = require('./components/controllers/authorisationControllers');
const { createReview, removeReviewById, getReviewsByAlbum } = require('./components/controllers/reviewControllers')
const express = require('express');
const app = express();
const cors = require('cors');
const { handle404Errors, handleServerErrors, handleAxiosErrors, handleCustomErrors, handlePsqlErrors } = require('./components/controllers/errorhandling');

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send({msg:'Go fuck yourself'});
  });

app.get("/api/auth",getAuthorisationToken);
app.get("/api/albums/:spotify_id", getAlbumByID);
app.get("/api/albums", getAllAlbumsById);
app.get("/api/search", getAlbumbyNameAndArtist);

app.get("/api/reviews/:spotify_id", getReviewsByAlbum)
app.post("/api/reviews", createReview);

app.delete("/api/review/:review_id", removeReviewById)

app.use(handleCustomErrors)
app.use(handleAxiosErrors);
app.use(handlePsqlErrors)
app.use(handleServerErrors);

app.all("*", handle404Errors);
module.exports = app;