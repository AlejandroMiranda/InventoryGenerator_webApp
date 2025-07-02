async function saveButtonEvent(){
    const categoryName = document.getElementById("categoryName").innerHTML;
    const itemId = document.getElementById("itemId").innerHTML;
    const qtyReal = document.getElementById("qty").value;

    const url = `/inventory/update`;
    const data = {
        categoryName,
        itemId,
        qtyReal
    }

    const response = await ajaX.put(url,data);
    if(response){
        window.location.href = `/inventory/${categoryName}`;
    }
};

window.onload = () => {
    const categoryName = document.getElementById("categoryName").innerHTML;
    const backButton = document.getElementById("backButton");
    backButton.setAttribute("href", `/inventory/${categoryName}`);

    const saveButton = document.getElementById("save");
    saveButton.addEventListener('click', saveButtonEvent);
};
