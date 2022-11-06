const connection = require("../connectMySQL");

const notImportedFile = (nome_tabella, colonna) => {
  try {
    const table = connection.query(`CREATE TABLE  if not exists file_non_importati(
        id int(255) NOT NULL AUTO_INCREMENT,
        nome_tabella varchar(255) NOT NULL,
        non_neccessari json DEFAULT NULL,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,

        PRIMARY KEY (id)
     )`);
    const query = connection.query(
      `INSERT IGNORE INTO file_non_importati(nome_tabella, non_neccessari ) VALUES ('${nome_tabella}','${colonna}')`
    );
    // // );
    console.log(`File ${nome_tabella} imported into file_non_importati!!!`);
  } catch (err) {
    console.err;
  }
};










const insert = (r) =>{
  console.log('ciao')
}

module.exports = notImportedFile
