const { json } = require("express");
const fs = require("fs-extra");
const specificOrder = {
  storage: "depositi",
  storages: "depositi",
  agents: "agenti",
  categories: "categorie",
  clients: "clienti",
  clientsAddresses: "clienti_indirizzi",
  products: "prodotti",
  list: "prodotti_listini",
  stocks: "prodotti_giacenze",
};

//search for json files in order of insertion
const orderOfInsertion = async (connection, queryCreation) => {
  try {
    const folder = fs.readdirSync("./samples/working", "utf8");
    for (let i = 0; i < folder.length; i++) {
      const json = fs.readdirSync(`./samples/working/${folder[i]}`, "utf8");
      const specificOrderArray = Object.keys(specificOrder);
      for (let w = 0; w < specificOrderArray.length; w++) {
        const fullName = specificOrderArray[w] + ".json";
        const found = json.find((element) => element === fullName);
        if (found === fullName) {
          const tableName = specificOrder[specificOrderArray[w]];
          const file = await fs.readFile(
            `./samples/working/${folder[i]}/${fullName}`,
            "utf8"
          );
          const fileParse = JSON.parse(file);

          queryCreation(connection, tableName, fileParse, folder[i]);
        }

        // fs.removeSync(`./samples/working/${folder[i]}/${found}`);
      }
    }
    return await folder;
  } catch (error) {
    console.error;
  }
};

module.exports = orderOfInsertion;
