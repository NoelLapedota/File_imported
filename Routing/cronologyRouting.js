const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../connectMySQL");

const router = express.Router();

router.get("/", (req, res) => {
  connection().then((connection) => {
    connection
      .query(queries.selectCronology)
      .then(([rows]) => {
        res.send(JSON.stringify(rows));
        console.log("Response: ", rows);
      })
      .catch((error) => {
        throw error;
      });
  });
});

module.exports = router;
