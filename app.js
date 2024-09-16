
const { getAuthorisationToken } = require('./components/controllers/authorisationControllers');

express = require('express');
const app = express();

app.get("/api/auth",getAuthorisationToken);

module.exports = app;