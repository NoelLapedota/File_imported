require("dotenv").config();
const mysql = require('mysql2/promise')

async function db() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fileImportDb2",
        
  });
}


// host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,

module.exports = db;
