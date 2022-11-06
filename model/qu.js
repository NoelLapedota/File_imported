const connection = require("../connectMySQL");
const storico = require("./storico.json");
// connection.query("SELECT count(*) AS TOTALNUMBEROFTABLES FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'fileimportdb'", function (err, result, fields) {

//"select count(*) AS TotalRows from fileimportdb "
const dataForJson = async (tableName, code) => {
  // const obj ={"tab":"prodotti_listini","idInsideTable":4850}
  // const json = JSON.stringify(obj);
  // // console.log(json)
  // await fs.writeFile("storico", json);
  connection.query(`CREATE   TABLE if not exists imported(
  id int(11) NOT NULL AUTO_INCREMENT,
  tableName varchar(255) NOT NULL,
  code varchar(300) NOT NULL,
  PRIMARY KEY (id) 
  )`);
  const query = connection.query(
    `INSERT IGNORE INTO imported(tableName, code ) VALUES ('${tableName}','${code}')`
  );
};



module.exports = dataForJson
