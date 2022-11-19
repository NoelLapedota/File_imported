const CronJob  = require('cron').CronJob;
const express = require("express");
const app = express();
const cronologyRouting = require("./Routing/cronologyRouting.js");
const orderOfInsertion = require("./contoller/preExportFile.js");
const queryCreation = require("./model/queriesStamp.js");
const pushToCronology = require("./model/insert.js");
const db = require("./connectMySQL");
const globalErrorHendler = require("./contoller/errorController");
const { importFile, removeDir, empty } = require("./contoller/import_file.js");
const {
  checkController,
  workingAnalyzer,
} = require("./contoller/checkModule.js");

//--------------------------------------------------------------------------------------------------------

const job = new CronJob('05 * * * * *', function () {
  db().then((connection) => {
    console.log("connection to db completed!!");
    return connection;
  });
  importFile(empty)
    .then((data) => removeDir("./samples/files"))
    .then((data) => workingAnalyzer(checkController))
    .then((data) => {
      orderOfInsertion(data, queryCreation);
      return data;
    })
    .then((data, array) => {
      pushToCronology(data, array);
    })
    .then((data) => {
      console.log("All files have been successfully imported and analyzed !!!");
    })

    .catch((err) => {
      console.log("error!", err);
      throw err;
    });
});

job.start();

//--------------------------------------------------------------------------------------------------------------------


const router = express.Router();

const port = process.env.PORT || 3000;

app.use("/cronology", cronologyRouting);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  (err.status = "fail"), (err.status.code = 404);

  next(err);
});

app.use(globalErrorHendler);

app.listen(port, (err) => {
  if (err) console.log("ERROR", err);
  console.log(`App running on port ${port}`);
});
