//Questa funzionae non fa ancora il suo lavoro perchè nell index parte prima delle altre, probabilmente qualche problema di promises
const pushToCronology = async (connection, array) => {
  try {
    console.log(array);
    // for (const el of array) {
    //   const [rows, fields] = await connection.query(queries.selectTemporany, [
    //     el,
    //   ]);

    //   const imported = rows[0]["dati"];
    //   if (!array.includes(imported)) array.push(imported);
    //   const quantytOfFile = array.length;
    //   await connection.query(queries.dataImported);

    //   const parse = JSON.stringify(value[0]);
    //   await connection.query(queries.addDataImported, [array, quantytOfFile]);
    // }

    // // fs.writeFile("./model/cronology.json", {}, "utf8", function (err) {
    // //   if (err) console.log(err);
    // // });
    // fs.writeFile("../samples/working");
  } catch (err) {
    console.err;
  }
};

module.exports = pushToCronology;

//----------------------------------------------------------------------------------------------
const connection = require("../connectMySQL.js");
const queries = require("./queries.js");

//----------------------------------------------------------------------------------------------

const insert = async (connection, query, tableName, i) => {
  try {
    const [rows, fields] = await connection.query(`${query}`);
    if (rows.affectedRows > 0) {
      await connection.query(queries.temporayTable);
      const [rows, fields] = await connection.query(queries.addTemporany, [
        tableName,
        i,
      ]);
      const folderArray = [0, 1];

      if (!folderArray.includes(i)) folderArray.push(i);

      for (const el of folderArray) {
        const [rows, fields] = await connection.query(queries.selectTemporany, [
          el,
        ]);
      }
      console.log(folderArray);
      return folderArray;
    }
  } catch (err) {
    console.err;
  }
};
module.exports.insert = insert;
const fs = require("fs");
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
