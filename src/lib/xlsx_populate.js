const XlsxPopulate = require("xlsx-populate");
const Item = require("../controllers/Items");
const xlsx = {}

xlsx.OpenFile = async(path) =>{
    try{
        const workboot = await XlsxPopulate.fromFileAsync(path);
        return workboot;        
    } catch (error) {
        console.error(error);
        return false;
    }

};

xlsx.ReadFile = (workboot) => {
    try{
        const value = workboot.sheet(0).usedRange().value();
        return value
    } catch(error) {
        console.error('Ocurrio un error inesperado')
        return error
    }
};

xlsx.CreateFile = async(path, data) =>{
    try{
        const workboot = await XlsxPopulate.fromBlankAsync();
        const sheetInventory = workboot.sheet(0);
        sheetInventory.name("Inventario");
        sheetInventory.cell("A1").value([
            ["Codigo de barras", "Descripción del articulo", "Cantidad en sistema", "Cantidad real", "Diferencia"]
        ]);

        const listData = [];
        data.forEach((item, index) => {
            var row = [];
            var it = index + 2;

            row.push(item.id);
            row.push(item.name);
            row.push(item.qtySys);
            row.push(item.qtyReal);
            listData.push(row);
            sheetInventory.cell(`E${it}`).formula(`D${it}-C${it}`);
        });
        sheetInventory.cell("A2").value(listData);

        const currentlyDate = new Date();
        const sheetInformation = workboot.addSheet("Información");
        const legends = [
            ["Suma de productos en sistema"], 
            ["Suma de productos en fisico"], 
            ["Porcentaje en base a cantidad"], 
            ["Cantidad de tipos de producto"], 
            ["Cantidad de tipos de producto con diferencia"], 
            ["Porcentaje en base a diferencia"], 
            [], 
            ["Fecha de creación"]            
        ];
        sheetInformation.cell("A1").value(legends);
        
        sheetInformation.cell("B1").formula("=SUM(Inventario!C:C)");
        sheetInformation.cell("B2").formula("=SUM(Inventario!D:D)");
        sheetInformation.cell("B3").formula("=B2/B1");
        sheetInformation.cell("B4").formula("=COUNT(Inventario!E:E)");
        sheetInformation.cell("B5").formula(`=COUNTIF(Inventario!E2:E22,"<> 0")`);
        sheetInformation.cell("B6").formula("=B5/B4");
        sheetInformation.cell("B8").value(`${currentlyDate.toLocaleDateString()} ${currentlyDate.getHours()}:${currentlyDate.getMinutes()}`);

        workboot.toFileAsync(path);
        return true;
    }catch(error){
        console.error(error);
        return false;
    }
};

module.exports = xlsx;