class Item{
    name = "";
    id = "";
    qtySys = 0;
    qtyReal = 0;

    constructor(id, name, qtySys){
        this.id = id;
        this.name = name.toUpperCase();
        this.qtySys = qtySys;
    }

    SetQtyReal(qty){
        this.qtyReal = qty;
    }

    GetId(){
        return this.id;
    }

    GetName(){
        return this.name;
    }

    GetQty(){
        return this.qtySys;
    }
};

module.exports = Item;