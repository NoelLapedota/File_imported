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
// password: "",
// database: "fileImportDb2",
  // host: process.env.HOST,
  // user: process.env.USER,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE,
// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }

//   console.log("connected on mysql with ID " + connection.threadId);
// });

module.exports = db;
