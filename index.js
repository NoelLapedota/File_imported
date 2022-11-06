// // const userRoutes = require('./routes')
// // const cron = require('node-cron');
const express = require("express");
const app = express();
// // app.use(bodyParser.json());
// // const connection = require("./connectMySQL");
// const orderOfInsertion = require("./contoller/preExportFile.js");
// const insert = require("./model/queriesStamp");
// const queryCreation = require("./model/queriesStamp");
const genereteJson = require('./model/eee')


// const table = require("./model/queries");
// // const createmodule = require('./contoller/createModule.js')
// const { importFile, removeDir, empty } = require("./contoller/import_file.js");

// const {
//   checkController,
//   workingAnalyzer
// } = require("./contoller/checkModule.js");
// importFile(empty)
// .then(data =>removeDir('./samples/files'))
// .then(data =>workingAnalyzer(checkController))
// .then(data =>orderOfInsertion())

// orderOfInsertion(queryCreation)
// .then(data => genereteJson(data))

// genereteJson()
// .then(data =>queryCreation(insert))

//    cron.schedule('05 * * * *', function() {
// importFile(empty)
// // .then(data =>removeDir('./samples/files'))
// .then(data =>workingAnalyzer(checkController));

//     console.log('All files have been successfully imported and analyzed !!!');

// });

genereteJson()

