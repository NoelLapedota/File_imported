const addressings = require("./addressings.json");
const notImportedFile = require("./insert.js");

const insert = require("./insert");
const queries = require("./queries");

const queryCreation = async (connection, tableName, fileParse, folder) => {
  try {
    //if the keys of the file to be imported are in the json file, they are rewritten so that they can then be correctly stacked,
    // otherwise they are deleted from the obj !!
    //this value in the table is a var5 and is not critical
    //if you decide to correct the table these rows should be deleted!
    const results = fileParse.map(async (obj) => {
      // if (obj["id_prodotto"] && tableName === "prodotti_listini") {
      //   obj["id_prodotto"] = "list";
      //   console.log(obj)
      // }

      for (key in obj) {
        const addressingsIndex = addressings[tableName][key];
        if (addressingsIndex) {
          //Unimported files go here!!
          if (Object.keys(obj).includes(key)) {
            const el = Object.keys(obj);
            const arr = el.filter((item) => item !== key);
            const json = JSON.stringify(arr);
            notImportedFile.notImportedFile(connection, tableName, json);
          }
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
      return await insert.insert(connection, result, tableName, folder);
    });
    return await Promise.all(results);
  } catch (err) {
    console.err;
  }
};

module.exports = queryCreation;
