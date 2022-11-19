require("dotenv").config();
const mysql =require('mysql2/promise')

async function db() {
  return await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fileImportDb2",
  });
}



module.exports = db;
