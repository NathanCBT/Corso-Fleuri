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
