const Categories = require("./Categories");
const Items = require("./Items");
const xlsx = require("../lib/xlsx_populate");

const ReadFile = {};

ReadFile.Read = async () => {
    const listCategories = [];
    const excelWorkbook = await xlsx.OpenFile("./xlsx_files/PRODUCTOS.xlsx");
    const excelValues = xlsx.ReadFile(excelWorkbook);

    excelValues.forEach((data, index) => {
        if(index != 0){
            const id = data[0];
            const name = data[1].toUpperCase();
            const qty = data[6];
            const item = new Items(id, name, qty);
            
            if(!isNaN(qty)){
                const categoryName = data[5].toUpperCase();

                const category = listCategories.find((element) => element.name === categoryName);
                if(category === undefined){
                    const newCategory = new Categories(categoryName);
                    newCategory.AddItem(item);
                    listCategories.push(newCategory);
                } else{
                    category.AddItem(item);
                }
            }
        }
    });

    return listCategories;
}

ReadFile.Write = async (data) => {
    try{
        const { categoryName, items } = data;
        const currentlyDate = new Date();
        const date = currentlyDate.toLocaleDateString().replaceAll('/','_');
        
        const excelWorkbook = await xlsx.CreateFile(`./xlsx_files/${categoryName}_${date}.xlsx`, items);

        return excelWorkbook;
    } catch(error){
        return false;
    }
};

module.exports = ReadFile;