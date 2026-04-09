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
