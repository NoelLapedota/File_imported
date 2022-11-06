// const connection = require("../connectMySQL");
const fs = require("fs");

const storico = require("./storico.json");


const genereteJson = () => {

    const obj = { tableName: 'prodotti_listini', code: '7177' }

    const json = JSON.stringify(obj);

    fs.writeFileSync ("./storico.json", json);


};
  
  module.exports =  genereteJson;   