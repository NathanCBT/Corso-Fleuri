const menuNameInput = document.getElementById("menu-name");
const menuPriceInput = document.getElementById("menu-price");
const menuProductsContainer = document.getElementById("menu-products");
const editMenuSelect = document.getElementById("edit-menu-select");

let allProducts = [];
let allMenus = [];

const API_URL = "http://localhost:3000/api/menus";

async function init() {
  try {
    const resP = await fetch("http://localhost:3000/api/products");
    allProducts = await resP.json();
    await refreshMenus();
  } catch (e) {
    console.error("Erreur d'initialisation :", e);
  }
}

async function refreshMenus() {
  const resM = await fetch(API_URL);
  allMenus = await resM.json();

  editMenuSelect.innerHTML =
    '<option value="">Choisir un menu pour modifier/supprimer</option>';
  allMenus.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = `${m.name} (${m.price}€)`;
    editMenuSelect.appendChild(opt);
  });

  renderMenuVisibilityTable();
}

function renderMenuVisibilityTable() {
  const tbody = document.getElementById("menu-visibility-table-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  allMenus.forEach((m) => {
    const tr = document.createElement("tr");
    tr.style.opacity = m.isVisible ? "1" : "0.45";

    // Bouton oeil
    const tdEye = document.createElement("td");
    tdEye.style.width = "36px";
    const eyeBtn = document.createElement("button");
    eyeBtn.className = "btn-eye";
    eyeBtn.title = m.isVisible
      ? "Masquer du menu caisse"
      : "Afficher dans le menu caisse";
    const eyeIcon = document.createElement("i");
    eyeIcon.className = m.isVisible
      ? "fa-solid fa-eye"
      : "fa-solid fa-eye-slash";
    eyeBtn.appendChild(eyeIcon);
    eyeBtn.addEventListener("click", async () => {
      const res = await fetch(
        `http://localhost:3000/api/menus/${m.id}/toggle-visibility`,
        {
          method: "PATCH",
        },
      );
      const data = await res.json();
      if (data.success) {
        m.isVisible = data.isVisible;
        eyeIcon.className = data.isVisible
          ? "fa-solid fa-eye"
          : "fa-solid fa-eye-slash";
        eyeBtn.title = data.isVisible
          ? "Masquer du menu caisse"
          : "Afficher dans le menu caisse";
        tr.style.opacity = data.isVisible ? "1" : "0.45";
        tdStatut.textContent = data.isVisible ? "Visible" : "Masqué";
        tdStatut.style.color = data.isVisible ? "green" : "#aaa";
      }
    });
    tdEye.appendChild(eyeBtn);

    const tdName = document.createElement("td");
    tdName.textContent = m.name;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = `${m.price}€`;

    const tdStatut = document.createElement("td");
    tdStatut.textContent = m.isVisible ? "Visible" : "Masqué";
    tdStatut.style.color = m.isVisible ? "green" : "#aaa";

    tr.appendChild(tdEye);
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdStatut);
    tbody.appendChild(tr);
  });
}

function addProductSelect(selectedId = null, qty = 1) {
  const container = document.createElement("div");
  container.className = "product-select-row";
  container.style =
    "display: flex; gap: 10px; margin-bottom: 8px; align-items: center;";

  const select = document.createElement("select");
  select.className = "menu-art-select";
  select.style.flex = "1";

  allProducts.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.Id;
    opt.textContent = `[${p.CategoryName || "Sans Catégorie"}] ${p.Name}`;
    if (selectedId && p.Id == selectedId) opt.selected = true;
    select.appendChild(opt);
  });

  const inputQty = document.createElement("input");
  inputQty.type = "number";
  inputQty.className = "menu-art-qty";
  inputQty.value = qty;
  inputQty.min = 1;
  inputQty.style.width = "70px";

  const btnDel = document.createElement("button");
  btnDel.innerHTML = '<i class="fa-solid fa-trash"></i>';
  btnDel.className = "btn danger";
  btnDel.onclick = () => container.remove();

  container.append(select, inputQty, btnDel);
  menuProductsContainer.appendChild(container);
}

function getSelectedArticles() {
  const rows = document.querySelectorAll(".product-select-row");
  const articlesMap = {};

  rows.forEach((row) => {
    const id = row.querySelector(".menu-art-select").value;
    const q = parseInt(row.querySelector(".menu-art-qty").value);
    if (articlesMap[id]) {
      articlesMap[id] += q;
    } else {
      articlesMap[id] = q;
    }
  });

  return Object.keys(articlesMap).map((id) => ({
    id: parseInt(id),
    quantity: articlesMap[id],
  }));
}

// bouton créer
document
  .getElementById("btn-create-menu")
  .addEventListener("click", async () => {
    const name = menuNameInput.value;
    const price = menuPriceInput.value;
    const articles = getSelectedArticles();

    if (!name || !price || articles.length === 0) {
      return alert("Informations manquantes (nom, prix ou articles) !");
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, articles }),
    });

    if (res.ok) {
      alert("Menu créé avec succès !");
      location.reload();
    }
  });

// bouton  pour modifier le menu
document
  .getElementById("btn-update-menu")
  .addEventListener("click", async () => {
    const id = editMenuSelect.value;
    const name = menuNameInput.value;
    const price = menuPriceInput.value;
    const articles = getSelectedArticles();

    if (!id) return alert("Veuillez d'abord sélectionner un menu à modifier.");
    if (!name || !price || articles.length === 0)
      return alert("Données incomplètes.");

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, articles }),
    });

    if (res.ok) {
      alert("Menu mis à jour avec succès !");
      location.reload();
    }
  });

// bouton pour supprimer
document
  .getElementById("btn-delete-menu")
  .addEventListener("click", async () => {
    const id = editMenuSelect.value;
    if (!id) return alert("Veuillez sélectionner un menu.");

    if (confirm("Voulez-vous vraiment supprimer ce menu ?")) {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Menu supprimé !");
        location.reload();
      }
    }
  });

editMenuSelect.addEventListener("change", () => {
  const id = editMenuSelect.value;
  const menu = allMenus.find((m) => m.id == id);

  if (menu) {
    menuNameInput.value = menu.name;
    menuPriceInput.value = menu.price;
    menuProductsContainer.innerHTML = "";
    if (menu.articles && menu.articles.length > 0) {
      menu.articles.forEach((art) => addProductSelect(art.id, art.quantity));
    }
  } else {
    // reset si aucune sélection
    menuNameInput.value = "";
    menuPriceInput.value = "";
    menuProductsContainer.innerHTML = "";
  }
});

document.getElementById("btn-add-product-menu").onclick = () =>
  addProductSelect();

init();

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
