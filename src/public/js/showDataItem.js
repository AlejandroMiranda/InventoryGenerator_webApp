async function saveAfter(){
    const categoryName = document.getElementById("categoryName").innerHTML;
    const itemId = document.getElementById("itemId").innerHTML;
    const itemAfter = document.getElementById("iAfter").getAttribute("name");
    const qtyReal = document.getElementById("qty").value;

    if(saveValue(qtyReal, itemId, categoryName)){
        window.location.href = `/inventory/data/${categoryName}/${itemAfter}`;
    }
};

async function saveBefore(){
    const categoryName = document.getElementById("categoryName").innerHTML;
    const itemId = document.getElementById("itemId").innerHTML;
    const itemBefore = document.getElementById("iBefore").getAttribute("name");
    const qtyReal = document.getElementById("qty").value;

    if(saveValue(qtyReal, itemId, categoryName)){
        window.location.href = `/inventory/data/${categoryName}/${itemBefore}`;
    }
};

async function saveButtonEvent(){
    const categoryName = document.getElementById("categoryName").innerHTML;
    const itemId = document.getElementById("itemId").innerHTML;
    const qtyReal = document.getElementById("qty").value;

    if(saveValue(qtyReal, itemId, categoryName)){
        window.location.href = `/inventory/${categoryName}`;
    }
};

async function saveValue(value, itemId, categoryName){
    if(value > 0){
        const url = `/inventory/update`;
        const data = {
            categoryName,
            itemId,
            qtyReal: value
        }

        const response = await ajaX.put(url,data);
        return response;
    } else{
        alert("El valor no puede ser menor a 0");
        return false;
    }
}

window.onload = () => {
    const elements = document.querySelectorAll(".itemOptions > div > a");
    elements.forEach( element => element.addEventListener('click', (event) => event.preventDefault()));
    const categoryName = document.getElementById("categoryName").innerHTML;
    const backButton = document.getElementById("backButton");
    backButton.setAttribute("href", `/inventory/${categoryName}`);

    const saveButton = document.getElementById("save");
    saveButton.addEventListener('click', saveButtonEvent);

    const itemBefore = document.getElementById("iBefore");
    if(itemBefore != undefined){
        itemBefore.addEventListener('click', saveBefore);
    }

    const itemAfter = document.getElementById("iAfter");
    if(itemAfter != undefined){
        itemAfter.addEventListener('click', saveAfter);
    }
};
