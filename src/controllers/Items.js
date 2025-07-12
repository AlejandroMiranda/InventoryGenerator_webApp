class Item{
    name = "";
    id = "";
    qtySys = 0;
    qtyReal = 0;
    cost = 0;
    price = 0;
    gain = 0.0;

    constructor(id, name, qtySys, cost, price){
        this.id = id;
        this.name = name.toUpperCase();
        this.qtySys = qtySys;
        this.cost = parseFloat(cost.replace("$",""));
        this.price = parseFloat(price.replace("$",""));
        this.gain = this.price/this.cost;
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