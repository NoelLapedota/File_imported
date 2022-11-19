const fs = require("fs-extra");

//imports files in working if they are non-empty folders

const importFile = async (empty) => {
  try {
    const content = await fs.readdirSync("./samples/files", "utf-8");
    for (let i = 0; i < content.length; i++) {
      let stats = await fs.lstatSync(`./samples/files/${content[i]}`, "utf-8");
      // //all files are filtered
      if (stats.isFile()) {
        const remove = await fs.removeSync(`./samples/files/${content[i]}`);
        console.log(`./samples/files/${content[i]} removed!!'`);
      }
      //empty folders are filtered
      const emptyFn = await empty(`./samples/files/${content[i]}`);
    }
    const copyFileSync = await fs.copySync(
      `./samples/files`,
      "./samples/working",
      { overwrite: false }
    );
    console.log(`Imported files in  ./samples/working!!`);
  } catch (error) {
    console.error;
  }
};

//----------------------------------------------------------------------------------------------------------------
const removeDir = async (file) => {
  try {
    const rm = await fs.readdirSync(file, "utf-8");
    for (let e = 0; e < rm.length; e++) {
      const removeAll = await fs.removeSync(`./samples/files/${rm[e]}`);
    }
    console.log(`./samples/files/${rm[e]} removed!!'`);
  } catch (error) {
    console.error;
  }
};

//-----------------------------------------------------------------------------------------------------------------
const empty = (folder) => {
  try {
    const arrayToCheckIfFolderIsEmpty = [];
    const folderContents = fs.readdirSync(folder, "utf-8");
    for (let e = 0; e < folderContents.length; e++) {
      arrayToCheckIfFolderIsEmpty.push(`${folder}/${folderContents[e]}`);
    }

    if (arrayToCheckIfFolderIsEmpty.length === 0) {
      fs.removeSync(folder);
      console.log(`./samples/files/${content[i]} removed!!'`);
    }
    return `./samples/files/${content[i]}`;
  } catch (error) {
    console.error;
  }
};

module.exports = {
  importFile,
  empty,
  removeDir,
};
