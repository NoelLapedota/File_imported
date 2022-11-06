require("dotenv").config();
const mysql = require("mysql2");


// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "fileImportDb"
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }

//   console.log("connected on mysql with ID " + connection.threadId);

// });



module.exports = connection;
