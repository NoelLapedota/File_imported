const createTable = `CREATE TABLE  if not exists file_non_importati(
  id int(255) NOT NULL AUTO_INCREMENT,
  nome_tabella varchar(255) NOT NULL,
  non_neccessari json DEFAULT NULL,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,

  PRIMARY KEY (id)
)`;
const add =
  "INSERT IGNORE INTO file_non_importati(nome_tabella, non_neccessari) VALUES (?, ?)";
const temporayTable =
  "CREATE  TABLE if not exists temporany (id int(255) primary key NOT NULL AUTO_INCREMENT, dati varchar(255) NOT NULL, folder int(255))";
const addTemporany =
  "INSERT IGNORE INTO  temporany (dati, folder) VALUES (?, ?)";
const addDataImported = `INSERT IGNORE INTO dataImported(dati_importati, file_number ) VALUES (?, ?)`;

const dataImported = `CREATE TABLE  if not exists dataImported(
  id int(255) NOT NULL AUTO_INCREMENT,
  dati_importati varchar(255) NOT NULL,
  file_number json DEFAULT NULL,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  

  PRIMARY KEY (id)
)`;

const selectCronology = "SELECT * FROM  dataImported";

const selectTemporany = "SELECT dati FROM temporany WHERE folder =  ? ";

const deleteTemporany = "DELETE FROM temporany";

const alterCronology =
  "ALTER TABLE categorie ADD COLUMN IF NOT EXISTS  idCronology int(255)";
"ALTER TABLE categorie ADD FOREIGN KEY (idCronology) REFERENCES dataImported(idCronology) ON UPDATE CASCADE ON DELETE CASCADE";

const update_idcronology = `UPDATE ? SET idCronology = ? WHERE idCronology  IS NULL`;

const select_id =
  "SELECT idCronology FROM dataImported ORDER BY idCronology DESC LIMIT 1 ";

const dati_importati =
  "SELECT dati_importati FROM dataImported ORDER BY dati_importati DESC LIMIT 1 ";

select_detail = "SELECT dati_importati FROM dataImported";

module.exports = {
  createTable,
  add,
  addDataImported,
  dataImported,
  selectCronology,
  addTemporany,
  selectTemporany,
  temporayTable,
  deleteTemporany,
  alterCronology,
  select_id,
  update_idcronology,
  dati_importati,
};
