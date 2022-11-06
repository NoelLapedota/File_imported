const addressings = require("./addressings.json");
const notImportedFile = require("./queries");
const connection = require("../connectMySQL");
const dataForJson = require("./qu");



const insert = (query, tableName) => {
  connection.query(`${query}`, function (err, result, fields) {
    // console.log(`File ${query} imported into File_importDb!!!`);
    // connection.query("select count(*) AS TotalRows from clienti");
    if (err) throw err;
    if (result.insertId != 0) {
      const imported = {
        tab: tableName,
        idInsideTable: result.insertId,
      };
      
      dataForJson(tableName, result.insertId);
    }
  });
};

//----------------------------------------------------------------------------------------------

const queryCreation = (tableName, fileParse) => {
  try {
    //if the keys of the file to be imported are in the json file, they are rewritten so that they can then be correctly stacked,
    // otherwise they are deleted from the obj !!
    fileParse.forEach((obj) => {
      if (obj["id_prodotto"] && tableName === "prodotti_listini") {
        obj["id_prodotto"] = "list";
      }
      for (key in obj) {
        const addressingsIndex = addressings[tableName][key];
        if (addressingsIndex) {
          //Unimported files go here!!
          // if (Object.keys(obj).includes(key)) {
          //   const el = Object.keys(obj);
          //   const arr = el.filter((item) => item !== key);
          //   const json = JSON.stringify(arr);
          //   notImportedFile(tableName, json);
          // }
          //if the file is to be inserted in another table
          if (key != addressingsIndex[1]) {
            obj[addressingsIndex[1]] = obj[key];

            delete obj[key];
          }
        } else {
          delete obj[key];
        }
      }

      //new obj with right columns!!
      const newKeys = Object.keys(obj);
      const newValues = Object.values(obj);
      //writing the query
      let query = `INSERT IGNORE INTO ${tableName}(${newKeys}) VALUES (`;

      newValues.forEach((el) => {
        const newValueStr = JSON.stringify(el);
        query += newValueStr + ",";
      });
      //deletes the last comma!
      let result = query.slice(0, -1);
      //adds the final parenthesis !!
      result += ")";

      insert(result, tableName);
      // console.log(result);
    });
  } catch (err) {
    console.err;
  }
};

module.exports = queryCreation
