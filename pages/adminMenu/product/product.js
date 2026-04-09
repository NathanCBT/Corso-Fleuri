const productTableBody = document.getElementById("product-table-body");
const stockProductSelect = document.getElementById("stock-product-select");
let editProductId = null;

async function refresh() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();

  productTableBody.innerHTML = "";
  products.forEach((p) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = p.Name;

    const tdCat = document.createElement("td");
    tdCat.textContent = p.CategoryName;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = `${p.Price}€`;

    const tdStock = document.createElement("td");
    tdStock.textContent = p.Stock;
    if (p.Stock <= p.QuantityMin) {
      tdStock.style.color = "red";
      tdStock.style.fontWeight = "bold";
    }

    const editBtn = document.createElement("button");
    editBtn.className = "btn primary";
    editBtn.textContent = "Modifier";
    editBtn.addEventListener("click", () =>
      prepareEdit(p.Id, p.Name, p.Price, p.Stock, p.QuantityMin, p.IdCategory)
    );

    const delBtn = document.createElement("button");
    delBtn.className = "btn danger";
    delBtn.textContent = "Supprimer";
    delBtn.addEventListener("click", () => deleteProd(p.Id));

    const tdActions = document.createElement("td");
    tdActions.appendChild(editBtn);
    tdActions.appendChild(delBtn);

    tr.appendChild(tdName);
    tr.appendChild(tdCat);
    tr.appendChild(tdPrice);
    tr.appendChild(tdStock);
    tr.appendChild(tdActions);
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

document.addEventListener("DOMContentLoaded", () => {
  const modalLogout = document.getElementById("modal-logout");
  const confirmBtn = document.getElementById("confirm-logout");
  const cancelBtn = document.getElementById("cancel-logout");
  const btnOpenLogout = document.getElementById("btn-deconnexion");

  if (btnOpenLogout) {
    btnOpenLogout.onclick = () => {
      modalLogout.style.display = "flex";
    };
  }
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      modalLogout.style.display = "none";
    };
  }
  if (confirmBtn) {
    confirmBtn.onclick = () => {
      window.location.href = "../../form/form.html";
    };
  }
});
