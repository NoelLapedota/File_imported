const fs = require("fs");

//check the structure respects the one expected
const checkController = async (json, file) => {
  try {
    const jsonName = await fs.readFileSync(`./samples/schema/${json}`, "utf8");
    JSON.parse(jsonName).forEach((elementSchema) => {
      const readFileJsonFromWorking = fs.readFileSync(file, "utf8");
      JSON.parse(readFileJsonFromWorking).forEach(
        (propietyOfReadFileJsonFromWorking) => {
          const keyWorking = Object.keys(propietyOfReadFileJsonFromWorking);
          const keySchema = Object.keys(elementSchema);

          for (let r = 0; r < keySchema.length; r++) {
            for (let t = 0; t < keyWorking.length; t++) {
              if (!keySchema[r] === keyWorking[t])
                console.log(
                  `the file ${json} does not respect the pattern, file deleted`
                );
              const remove = fs.removeSync(file);
            }
          }
        }
      );
    });
  } catch (error) {
    console.error;
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------

const workingAnalyzer = async (checkController) => {
  try {
    const folder = await fs.readdirSync("./samples/working", "utf8");
    for (let i = 0; i < folder.length; i++) {
      let json = await fs.readdirSync(`./samples/working/${folder[i]}`, "utf8");
      for (let e = 0; e < json.length; e++) {
        //they are needed because there are name differences between the schema and the files
        if (json[e] === "storage.json") {
          json[e] = "storages.json";
        }
        const file = `./samples/working/${folder[i]}/${json[e]}`;
        checkController(json[e], file);
      }
    }
    console.log("checkController completed!!!");
  } catch (error) {
    console.error;
  }
};

module.exports = {
  checkController,
  workingAnalyzer,
};
