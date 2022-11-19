const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../connectMySQL");

const router = express.Router();

router.get("/", (req, res) => {
  const con = connection.query(
    queries.selectCronology,
    function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result));
      console.log(result);
    }
  );
});

module.exports = router;
