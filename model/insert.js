//The data entered are first imported into temporary, afterwards they are inserted in an array and inserted in a folder of the historic_dati
const pushToCronology = async (connection, folder) => {
  try {
    await setTimeout(async function () {
      for (const el of folder) {
        const arrayWithImportedFfiles = [];

        const [rows] = await connection.query(
          prepareStatement.selectTemporany,
          [el]
        );
        rows.forEach((element) => {
          if (!arrayWithImportedFfiles.includes(element.dati)) {
            arrayWithImportedFfiles.push(element.dati);
          }
          arrayWithImportedFfiles.push(element.dati);
        });
        const unique = Array.from(new Set(arrayWithImportedFfiles));

        const quantytOfFile = unique.length;

        await connection.query(prepareStatement.dataImported);

        const parse = JSON.stringify(unique);
        if (quantytOfFile >= 1) {
          await connection.query(prepareStatement.addDataImported, [
            parse,
            quantytOfFile,
          ]);

          console.log(prepareStatement.addDataImported, [parse, quantytOfFile]);
          //  With the FK and Idcronology I create a relationship between the Dataimportted and the tables

          // Note: problem of quotes of the strings in the query to be placed
          for (let index = 0; index < unique.length; index++) {
            const selectIdCronology = await connection.query(
              prepareStatement.select_id,
              [unique[index]]
            );
            const alterCronology = await connection.query(
              `ALTER TABLE ${unique[index]} ADD COLUMN IF NOT EXISTS  idCronology int(255)`,
              `ALTER TABLE ${unique[index]} ADD FOREIGN KEY (idCronology) REFERENCES dataImported(idCronology) ON UPDATE CASCADE ON DELETE CASCADE`
            );
            const update_idcronology = await connection.query(
              `UPDATE ${unique[index]} SET idCronology =${selectIdCronology[0][0]["idCronology"]} WHERE idCronology IS NULL`
            );
          }
        }
      }
      console.log("All files have been successfully imported and analyzed !!!");
      // await connection.query(prepareStatement.deleteTemporany);
      fs.remove("./samples/working");
    }, 2000);
  } catch (err) {
    console.err;
  }
};
module.exports = pushToCronology;

//----------------------------------------------------------------------------------------------
const prepareStatement = require("./queries.js");
const fs = require("fs-extra");

const insert = async (connection, query, tableName, folder) => {
  try {
    await connection.query(prepareStatement.temporayTable);

    const [rows, fields] = await connection.query(`${query}`);
    console.log(query);
    if (rows.affectedRows > 0) {
      await setTimeout(async function () {
        await connection.query(prepareStatement.addTemporany, [
          tableName,
          folder,
        ]);
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
