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

router.get("/:detail", (req, res) => {
  connection().then((connection) => {
    const data = JSON.parse(req.query.dati_importati);
    for (let index = 0; index < data.length; index++) {
      connection
        .query(
          `SELECT * FROM ${data[index]} WHERE idCronology = ${req.params.detail}`
        )
        .then(([rows]) => {
          res.send(JSON.stringify(rows));
          console.log("Response: ", rows);
        })
        .catch((error) => {
          throw error;
        });
    }
  });
});

module.exports = router;
