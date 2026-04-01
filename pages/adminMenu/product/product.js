import Menu from "../../../classes/Menu.js";
import Product from "../../../classes/Product.js";

let productName = document.getElementById("product-name");
let productBuyPrice = document.getElementById("product-buy-price");
let productQuantity = document.getElementById("product-quantity");
let productImage = document.getElementById("product-image");
let productType = document.getElementById("product-type");
let btnAddProduct = document.getElementById("btn-add-product");

let productTableBody = document.getElementById("product-table-body");
let stockProductSelect = document.getElementById("stock-product-select");
let stockQuantityAdd = document.getElementById("stock-quantity-add");
let btnAddStock = document.getElementById("btn-add-stock");
let editIndex = null;

btnAddProduct.addEventListener("click", () => {
  createOrUpdateProduct();
  refreshTable();
});
btnAddStock.addEventListener("click", () => {
  const index = stockProductSelect.value;
  const qty = parseInt(stockQuantityAdd.value);

  if (index !== "" && !isNaN(qty)) {
    Product.productList[index].quantity += qty;
    stockQuantityAdd.value = "";
    refreshTable();
  }
});

function createOrUpdateProduct() {
  if (
    productName.value != "" &&
    productBuyPrice.value != "" &&
    productQuantity.value != "" &&
    productType.value != ""
  ) {
    if (editIndex === null) {
      let product = new Product();
      product.name = productName.value;
      product.price = productBuyPrice.value;
      product.quantity = parseInt(productQuantity.value);
      product.img = productImage.value;
      product.setType(productType.value);
    } else {
      let product = Product.productList[editIndex];
      product.name = productName.value;
      product.price = productBuyPrice.value;
      product.quantity = parseInt(productQuantity.value);
      product.img = productImage.value;
      product.setType(productType.value);

      editIndex = null;
    }

    resetForm();
  }
}

function resetForm() {
  productName.value = "";
  productBuyPrice.value = "";
  productQuantity.value = "";
  productImage.value = "";
  productType.selectedIndex = 0;
}

function refreshTable() {
  productTableBody.innerHTML = "";

  Product.productList.forEach((product, index) => {
    const newTr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.textContent = product.name;

    let tdType = document.createElement("td");
    tdType.textContent = product.type;

    let tdPrice = document.createElement("td");
    tdPrice.textContent = product.price;

    let tdQuantity = document.createElement("td");
    tdQuantity.textContent = product.quantity;

    let tdActions = document.createElement("td");
    tdActions.classList.add("actions");

    let btnActivate = document.createElement("button");
    btnActivate.textContent = product.isActive ? "Désactiver" : "Activer";
    btnActivate.classList.add("btn", "secondary");

    btnActivate.addEventListener("click", () => {
      product.isActive = !product.isActive;
      refreshTable();
    });

    let btnModify = document.createElement("button");
    btnModify.textContent = "Modifier";
    btnModify.classList.add("btn", "primary");

    btnModify.addEventListener("click", () => {
      productName.value = product.name;
      productBuyPrice.value = product.price;
      productQuantity.value = product.quantity;
      productType.value = product.type;

      editIndex = index;
    });

    let btnDelete = document.createElement("button");
    btnDelete.textContent = "Supprimer";
    btnDelete.classList.add("btn", "danger");

    btnDelete.addEventListener("click", () => {
      Product.productList.splice(index, 1);
      refreshTable();
      refreshStockSelect();
    });

    tdActions.appendChild(btnActivate);
    tdActions.appendChild(btnModify);
    tdActions.appendChild(btnDelete);

    newTr.appendChild(tdName);
    newTr.appendChild(tdType);
    newTr.appendChild(tdPrice);
    newTr.appendChild(tdQuantity);
    newTr.appendChild(tdActions);

    productTableBody.appendChild(newTr);
  });
  refreshStockSelect();
}
function refreshStockSelect() {
  stockProductSelect.innerHTML = '<option value="">Choisir un produit</option>';
  Product.productList.forEach((product, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = product.name;
    stockProductSelect.appendChild(option);
  });
}
