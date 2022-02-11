const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Configuramos secretos para que en github no se muestren 

const secrets = require('dotenv').config();

const PSDB = process.env.PSDB;
const USDB = process.env.USDB;
const PORT = process.env.PORT;

// usamos Router para tener mas comodidad
var indexRouter = require("./routes/index");
var contactsRouter = require("./routes/contacts");

const path = require("path");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.use("/contacts", contactsRouter);

// escuchamos por el puerto PORT
app.listen(PORT, () => console.log(`Server running in port ${PORT} \n secrets: ${PSDB} ${USDB}`));
