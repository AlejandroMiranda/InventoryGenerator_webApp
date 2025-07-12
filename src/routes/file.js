const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get("/", (req, res) =>{
    res.render("tools/index");
});

router.put("/showdata", (req, res) =>{
    const { path, name } = req.body;

    globalThis.config.EXCEL_PATH = "./xlsx_file";
    globalThis.config.EXCEL_NAME = "PRODUCTOS.xlsx";
    const parse = JSON.stringify(globalThis.config);
    try{
        fs.writeFileSync('./src/config.json', parse);        
    } catch(error){
        console.error(error);
    }

  res.send(true);
});

module.exports = router;