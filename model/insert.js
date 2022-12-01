//The data entered are first imported into temporary, afterwards they are inserted in an array and inserted in a folder of the historic_dati
const pushToCronology = async (connection, folder) => {
  try {
    await setTimeout(async function () {
      for (const el of folder) {
        const arrayWithImportedFfiles = [];

        const [rows] = await connection.query(queries.selectTemporany, [el]);
        rows.forEach((element) => {
          if (!arrayWithImportedFfiles.includes(element.dati)) {
            arrayWithImportedFfiles.push(element.dati);
          }
          arrayWithImportedFfiles.push(element.dati);
        });
        const unique = Array.from(new Set(arrayWithImportedFfiles));

        const quantytOfFile = unique.length;

        await connection.query(queries.dataImported);

        const parse = JSON.stringify(unique);
        if (quantytOfFile >= 1) {
          await connection.query(queries.addDataImported, [
            parse,
            quantytOfFile,
          ]);
          console.log(queries.addDataImported, [parse, quantytOfFile]);
        }
      }
      console.log("All files have been successfully imported and analyzed !!!");
      await connection.query(queries.deleteTemporany);
      fs.remove("./samples/working");
    }, 5000);
  } catch (err) {
    console.err;
  }
};
module.exports = pushToCronology;

//----------------------------------------------------------------------------------------------
const connection = require("../connectMySQL.js");
const queries = require("./queries.js");
const fs = require("fs-extra");

const insert = async (connection, query, tableName, folder) => {
  try {
    await connection.query(queries.temporayTable);
    await connection.query(queries.temporayTable);

    const [rows, fields] = await connection.query(`${query}`);
    if (rows.affectedRows > 0) {
      await setTimeout(async function () {
        await connection.query(queries.addTemporany, [tableName, folder]);
      }, 2000);
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.insert = insert;

//----------------------------------------------------------------------------------------------

const notImportedFile = async (connection, nome_tabella, colonna) => {
  try {
    await connection.query(queries.createTable);
    await connection.query(queries.add, [nome_tabella, colonna]);
  } catch (err) {
    console.err;
  }
};

module.exports.notImportedFile = notImportedFile;
