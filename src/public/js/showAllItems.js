function UpdateButton(){
    const confirm = window.confirm("¿Guardar?");
    if (confirm) {
        const url = `/inventory/write`;
        const categoryName = document.getElementById("categoryName").innerHTML;

        const result = ajaX.put(url, {categoryName});
        if(result){
            window.location.href = "/inventory";
        }
    }
};

window.onload = () => {
    const categoryName = document.getElementById("categoryName").innerHTML;
    const elements_a = document.querySelectorAll("li>a");
    elements_a.forEach((element) => element.setAttribute("href", `./data/${categoryName}/${element.getAttribute("name")}`));

    const updateButton = document.getElementById("updateButton");
    updateButton.addEventListener('click', UpdateButton);
};
