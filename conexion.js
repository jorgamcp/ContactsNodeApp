//conexion mysql
const mysql = require("mysql2");
const secrets = require('dotenv').config();

const HDB = process.env.HDB;
const USDB = process.env.USDB;
const PSDB = process.env.PSDB;
const NDB = process.env.NDB;

const conexion = mysql.createConnection({
    host: HDB,
    user: USDB,
    password: PSDB,
    database: NDB,
  });
  
  conexion.connect(function (err) {
    if (err) throw err;
    console.log("conectado a mysql");
  });
   
module.exports = conexion;