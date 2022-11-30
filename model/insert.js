//Questa funzionae non fa ancora il suo lavoro perchè nell index parte prima delle altre, probabilmente qualche problema di promises
const pushToCronology = async (connection, folder) => {
  try {
    console.log(folder);
    await setTimeout(async function () {
      for (const el of folder) {
        const [rows] = await connection.query(queries.selectTemporany, [el]);
        const imported = rows[0]["dati"];
        const arrayWithImportedFfiles = [];

        if (!arrayWithImportedFfiles.includes(imported))
          arrayWithImportedFfiles.push(imported);
        const quantytOfFile = arrayWithImportedFfiles.length;

        await connection.query(queries.dataImported);

        const parse = JSON.stringify(arrayWithImportedFfiles);

        await connection.query(queries.addDataImported, [parse, quantytOfFile]);
        fs.remove(`./samples/working/${el}`);
      }
      console.log("All files have been successfully imported and analyzed !!!");
    }, 1000);
  } catch (err) {
    console.err;
  }
};

module.exports = pushToCronology;

//----------------------------------------------------------------------------------------------
const connection = require("../connectMySQL.js");
const queries = require("./queries.js");
const fs = require("fs-extra");

//----------------------------------------------------------------------------------------------

const insert = async (connection, query, tableName, folder) => {
  try {
    const [rows, fields] = await connection.query(`${query}`);
    if (rows.affectedRows > 0) {
      await connection.query(queries.temporayTable);
      const [rows, fields] = await connection.query(queries.addTemporany, [
        tableName,
        folder,
      ]);
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.insert = insert;
const array = [];
const folderArray = [];

const notImportedFile = (nome_tabella, colonna) => {
  try {
    connection.query(queries.createTable);

    const con = connection.query(queries.add, [nome_tabella, colonna]);
    console.log(`File ${nome_tabella} imported into file_non_importati!!!`);
  } catch (err) {
    console.err;
  }
};

module.exports.notImportedFile = notImportedFile;
