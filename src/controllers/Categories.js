// const Items = require("./Items");

class Categories {
    name = "";
    items = [];

    constructor(name){
        this.name = name.toUpperCase();;
    }

    AddItem(item){
        this.items.push(item);
    }

    GetItemByIndex(index){
        return this.items[index];
    }

    GetItemByName(name){
        const position = this.items.indexOf(name);
        return this.items[position];
    }

    GetItemById(id){
        return this.items.find(element => element.id == id);
    }

    GetItemBeforeId(id){
        let index = this.items.findIndex(element => element.id == id);
        index = index -1;
        return this.items[index];
    }

    GetItemAfterId(id){
        let index = this.items.findIndex(element => element.id == id);
        index++;
        return this.items[index];
    }

    GetItemsList(){
        this.items.sort((a, b) => {
            if(a.name < b.name)
                return -1;
            if(a.name > b.name)
                return 1
            return 0;
        });
        return this.items;
    }
}

module.exports = Categories;