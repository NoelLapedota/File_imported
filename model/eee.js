// const connection = require("../connectMySQL");
const fs = require("fs");

const storico = require("./model/storico.json");


const genereteJson = () => {

    const obj = { tableName: 'prodotti_listini', code: '7177' }

    const json = JSON.stringify(obj);

    fs.writeFileSync ("./model/storico.json", json);


};
  
  module.exports =  genereteJson;   