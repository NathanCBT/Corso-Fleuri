import Menu from "../../../classes/Menu.js";
import Product from "../../../classes/Product.js";

let menuNameInput = document.getElementById("menu-name");
let menuPriceInput = document.getElementById("menu-price");
let editMenuSelect = document.getElementById("edit-menu-select");
let btnAddProductMenu = document.getElementById("btn-add-product-menu");
let btnUpdateMenu = document.getElementById("btn-update-menu");
let menuProductsContainer = document.getElementById("menu-products");

// Initialise la liste statique si elle n'existe pas encore
if (!Product.productList) {
    Product.productList = [];
}

if (Product.productList.length === 0) {
    let p1 = new Product(); p1.name = "Coca"; p1.price = 2; p1.setType("soft");
    let p2 = new Product(); p2.name = "Café"; p2.price = 1.5; p2.setType("hot");
    let p3 = new Product(); p3.name = "Sandwich"; p3.price = 5; p3.setType("cold");
}

let menus = [];

function refreshMenuDropdown(){
    editMenuSelect.innerHTML = '<option value="">Choisir menu</option>';
    menus.forEach((menu,index)=>{
        let option = document.createElement("option");
        option.value = index;
        option.textContent = menu.name;
        editMenuSelect.appendChild(option);
    });
}

function clearMenuInputs(){
    menuNameInput.value = "";
    menuPriceInput.value = "";
    menuProductsContainer.innerHTML = "";
}

function loadMenu(menu){
    menuNameInput.value = menu.name;
    menuPriceInput.value = menu.price;
    menuProductsContainer.innerHTML = "";
    menu.productsList.forEach(product=>{
        addProductSelect(product);
    });
}

function addProductSelect(selectedProduct=null){
    let select = document.createElement("select");
    Product.productList.forEach((product,index)=>{
        let option = document.createElement("option");
        option.value = index;
        option.textContent = product.name;
        select.appendChild(option);
    });
    if(selectedProduct){
        let index = Product.productList.indexOf(selectedProduct);
        select.value = index;
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent="X";
    deleteBtn.classList.add("btn","danger");
    deleteBtn.style.padding="4px 8px";
    deleteBtn.style.fontSize="12px";

    let container = document.createElement("div");
    container.style.display="flex";
    container.style.gap="5px";
    container.style.marginBottom="5px";

    deleteBtn.addEventListener("click",()=>{
        container.remove();
    });

    container.appendChild(select);
    container.appendChild(deleteBtn);
    menuProductsContainer.appendChild(container);
}

btnAddProductMenu.addEventListener("click",()=>{
    addProductSelect();
});

btnUpdateMenu.addEventListener("click",()=>{
    let selectedIndex = editMenuSelect.value;
    if(selectedIndex==="") return;

    let menu = menus[selectedIndex];
    menu.name = menuNameInput.value;
    menu.price = menuPriceInput.value;
    menu.productsList = [];

    menuProductsContainer.querySelectorAll("select").forEach(select=>{
        let product = Product.productList[select.value];
        if(product){
            menu.addProduct(product);
        }
    });

    refreshMenuDropdown();
});

editMenuSelect.addEventListener("change",()=>{
    let index = editMenuSelect.value;
    if(index==="") return;
    let menu = menus[index];
    loadMenu(menu);
});

document.getElementById("btn-create-menu").addEventListener("click",()=>{
    if(menuNameInput.value==="") return;
    let newMenu = new Menu(menuNameInput.value);
    newMenu.price = menuPriceInput.value;
    menuProductsContainer.querySelectorAll("select").forEach(select=>{
        let product = Product.productList[select.value];
        if(product){
            newMenu.addProduct(product);
        }
    });
    menus.push(newMenu);
    refreshMenuDropdown();
    clearMenuInputs();
});

refreshMenuDropdown();