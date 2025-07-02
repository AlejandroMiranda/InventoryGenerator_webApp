const express = require("express");
const router = express.Router();
const readFile = require("../controllers/RedFile");

router.get("/", async (req, res) => {
    if(globalThis.listCategory.length == 0)
        globalThis.listCategory = await readFile.Read();
    
    const listNames = [];

    globalThis.listCategory.forEach(item => {
        listNames.push({"name" : item.name});
    });

    listNames.sort((a, b) =>{
        if(a.name < b.name)
            return -1;
        if(a.name > b.name)
            return 1;

        return 0;
    });

    res.render("inventory/show", {listNames});
});

router.get("/:categoryName", (req, res) =>{
    const { categoryName } = req.params;
    const category = globalThis.listCategory.find( element => element.name === categoryName);

    const data = {
        categoryName,
        items: category.GetItemsList()
    }

    res.render("inventory/showAllItems", data);
});

router.get("/data/:categoryName/:itemId", (req, res) =>{
    const { categoryName, itemId } = req.params;
    const category = globalThis.listCategory.find( element => element.name == categoryName);
    const data = {};
    data.categoryName = categoryName;
    const item = category.GetItemById(itemId);
    data.item = item;

    res.render("inventory/showDataItem", data);
});

router.put("/update",(req, res) =>{
    try{
        const {categoryName, itemId, qtyReal} = req.body;
        const category = globalThis.listCategory.find( element => element.name == categoryName);
        const item = category.GetItemById(itemId);
        item.SetQtyReal(parseInt(qtyReal));

        res.send(true);
    } catch(error){
        res.send(false);
    }
});

router.put("/write", (req, res) =>{
    const { categoryName } = req.body;
    const data = {};
    data.categoryName = categoryName;
    data.items = globalThis.listCategory.find( element => element.name == categoryName).GetItemsList();

    readFile.Write(data);

    globalThis.listCategory = [];
    res.send(true);
});

module.exports = router;