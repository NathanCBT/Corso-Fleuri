<<<<<<< HEAD
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
    window.location.href = "../../form/form.html";
  };
});

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
  productTableBody.textContent = "";

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
  stockProductSelect.textContent =
    '<option value="">Choisir un produit</option>';
  Product.productList.forEach((product, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = product.name;
    stockProductSelect.appendChild(option);
  });
}
=======
const productTableBody = document.getElementById("product-table-body");
const stockProductSelect = document.getElementById("stock-product-select");
let editProductId = null;

async function refresh() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();

  productTableBody.innerHTML = "";
  products.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${p.Name}</td>
            <td>${p.CategoryName}</td>
            <td>${p.Price}€</td>
            <td style="${p.Stock <= p.QuantityMin ? "color:red; font-weight:bold" : ""}">${p.Stock}</td>
            <td>
                <button class="btn primary" onclick="prepareEdit(${p.Id}, '${p.Name}', ${p.Price}, ${p.Stock}, ${p.QuantityMin}, ${p.IdCategory})">Modifier</button>
                <button class="btn danger" onclick="deleteProd(${p.Id})">Supprimer</button>
            </td>
        `;
    productTableBody.appendChild(tr);
  });

  stockProductSelect.innerHTML = '<option value="">Choisir un produit</option>';
  products.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.Id;
    opt.textContent = p.Name;
    stockProductSelect.appendChild(opt);
  });
}

document
  .getElementById("btn-add-product")
  .addEventListener("click", async () => {
    const data = {
      name: document.getElementById("product-name").value,
      price: parseFloat(document.getElementById("product-buy-price").value),
      stock: parseInt(document.getElementById("product-quantity").value),
      quantityMin: parseInt(
        document.getElementById("product-quantity-limit").value,
      ),
      idCategory:
        document.getElementById("product-type").value === "hot" ? 2 : 1,
      hot: document.getElementById("product-type").value === "hot" ? 1 : 0,
    };

    const method = editProductId ? "PUT" : "POST";
    const url = editProductId
      ? `http://localhost:3000/api/products/${editProductId}`
      : "http://localhost:3000/api/products";

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    editProductId = null;
    refresh();
  });

document.getElementById("btn-add-stock").addEventListener("click", async () => {
  const id = stockProductSelect.value;
  const quantity = parseInt(
    document.getElementById("stock-quantity-add").value,
  );

  await fetch("http://localhost:3000/api/products/add-stock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, quantity }),
  });
  refresh();
});

window.deleteProd = async (id) => {
  if (confirm("Supprimer ce produit ?")) {
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    refresh();
  }
};

window.prepareEdit = (id, name, price, stock, qMin, cat) => {
  document.getElementById("product-name").value = name;
  document.getElementById("product-buy-price").value = price;
  document.getElementById("product-quantity").value = stock;
  document.getElementById("product-quantity-limit").value = qMin;
  editProductId = id;
  window.scrollTo(0, 0);
};

refresh();
>>>>>>> 12d0676d10284011d8817db7f3059aeedbbdc1da
