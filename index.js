const CronJob = require("cron").CronJob;
const express = require("express");
const app = express();
const cronologyRouting = require("./routing/cronologyRouting.js");
const orderOfInsertion = require("./controller/preExportFile.js");
const queryCreation = require("./model/queriesStamp.js");
const pushToCronology = require("./model/insert.js");
const db = require("./connectMySQL");
const globalErrorHendler = require("./controller/errorController");
const { importFile, removeDir, empty } = require("./controller/importFile.js");
const {
  checkController,
  workingAnalyzer,
} = require("./controller/checkModule.js");

//--------------------------------------------------------------------------------------------------------

// const job = new CronJob("05 * * * * *", function () {
db()
  .then((connection) => {
    console.log("connection to db completed!!");
    return connection;
  })
  .then((connection) => {
    importFile(empty);
    return connection;
  })

  .then((connection) => {
    workingAnalyzer(checkController);
    return connection;
  })
  .then(async (connection) => {
    const resultPromise = await orderOfInsertion(connection, queryCreation);
    console.log("result promise", resultPromise);
    return {
      connection,
      resultPromise,
    };
  })
  .then(async ({ connection, resultPromise }) => {
    console.log("push to cronology", resultPromise);
    await pushToCronology(connection, resultPromise);
    return connection;
  })
  // .then(() => {
  //   removeDir("./samples/files");
  // })
  .catch((err) => {
    console.log("error!", err);
    throw err;
  });
// });

// job.start();
//--------------------------------------------------------------------------------------------------------------------

const router = express.Router();

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Home page");
});
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
