const { getTreasures } = require("./controllers/treasure.controller");
const express = require("express");
const { catchInvalidURL, handlePsqlErrors, handleError500s, handleCustomErrors } = require("./errors/error");
const app = express();
app.use(express.json());

app.get("/api/treasures", getTreasures);

app.all("/*", catchInvalidURL);

// error handling
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleError500s);

module.exports = app;

