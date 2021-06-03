const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const uiRoutes = require("./routes/users-info");

const app = express();

app.use(bodyParser.json());

app.use(uiRoutes);

app.listen(4000);