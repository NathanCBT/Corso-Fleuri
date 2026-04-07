<<<<<<< HEAD
import Menu from "../../../classes/Menu.js";
import Product from "../../../classes/Product.js";

let menuNameInput = document.getElementById("menu-name");
let menuPriceInput = document.getElementById("menu-price");
let editMenuSelect = document.getElementById("edit-menu-select");
let btnAddProductMenu = document.getElementById("btn-add-product-menu");
let btnUpdateMenu = document.getElementById("btn-update-menu");
let menuProductsContainer = document.getElementById("menu-products");
document.addEventListener("DOMContentLoaded", () => {
  const modalLogout = document.getElementById("modal-logout");
  const confirmBtn = document.getElementById("confirm-logout");
  const cancelBtn = document.getElementById("cancel-logout");
  const btnOpenLogout = document.getElementById("btn-deconnexion");

  btnOpenLogout.onclick = () => {
    modalLogout.style.display = "flex";
  };

  cancelBtn.onclick = () => {
    modalLogout.style.display = "none";
  };

  confirmBtn.onclick = () => {
    window.location.href = "../form/form.html";
  };
});
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
    editMenuSelect.textContent = '<option value="">Choisir menu</option>';
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
    menuProductsContainer.textContent = "";
}

function loadMenu(menu){
    menuNameInput.value = menu.name;
    menuPriceInput.value = menu.price;
    menuProductsContainer.textContent = "";
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
=======
const menuNameInput = document.getElementById("menu-name");
const menuPriceInput = document.getElementById("menu-price");
const menuProductsContainer = document.getElementById("menu-products");
const editMenuSelect = document.getElementById("edit-menu-select");

let allProducts = [];

async function init() {
  const resP = await fetch("http://localhost:3000/api/products");
  allProducts = await resP.json();
  refreshMenus();
}

async function refreshMenus() {
  const resM = await fetch("http://localhost:3000/api/menus");
  const menus = await resM.json();

  editMenuSelect.innerHTML = '<option value="">Supprimer un menu</option>';
  menus.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = `${m.name} (${m.price}€)`;
    editMenuSelect.appendChild(opt);
  });
}

function addProductSelect() {
  const container = document.createElement("div");
  container.className = "product-select-row";
  container.style.display = "flex";
  container.style.marginBottom = "5px";

  const select = document.createElement("select");
  select.className = "menu-art-select";
  allProducts.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.Id;
    opt.textContent = p.Name;
    select.appendChild(opt);
  });

  const btnDel = document.createElement("button");
  btnDel.textContent = "X";
  btnDel.className = "btn danger";
  btnDel.onclick = () => container.remove();

  container.appendChild(select);
  container.appendChild(btnDel);
  menuProductsContainer.appendChild(container);
}

document
  .getElementById("btn-add-product-menu")
  .addEventListener("click", addProductSelect);

document
  .getElementById("btn-create-menu")
  .addEventListener("click", async () => {
    const name = menuNameInput.value;
    const price = menuPriceInput.value;
    const selects = document.querySelectorAll(".menu-art-select");
    const articles = Array.from(selects).map((s) => s.value);

    if (!name || !price || articles.length === 0)
      return alert("Remplissez tout !");

    await fetch("http://localhost:3000/api/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, articles }),
    });

    menuNameInput.value = "";
    menuPriceInput.value = "";
    menuProductsContainer.innerHTML = "";
    refreshMenus();
  });

document
  .getElementById("btn-update-menu")
  .addEventListener("click", async () => {
    const id = editMenuSelect.value;
    if (!id) return;
    if (confirm("Supprimer ce menu ?")) {
      await fetch(`http://localhost:3000/api/menus/${id}`, {
        method: "DELETE",
      });
      refreshMenus();
    }
  });

init();
>>>>>>> 12d0676d10284011d8817db7f3059aeedbbdc1da
