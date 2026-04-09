import { cart, addToCart, calculateTotal, updateQuantity } from "./cart.js";
import { initPayment, handleFinalPayment } from "./paymentController.js";

const API_BASE = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", () => {
  const btnGrandeFaim = document.getElementById("btn-grande-faim");
  const btnPetiteFaim = document.getElementById("btn-petite-faim");
  const btnProducts = document.getElementById("btn-products");
  const mainGrid = document.getElementById("main-grid");
  const cartContainer = document.getElementById("cart-container");
  const totalDisplay = document.querySelector(".total-amount");
  const modalLogout = document.getElementById("modal-logout");
  const confirmBtn = document.getElementById("confirm-logout");
  const cancelBtn = document.getElementById("cancel-logout");
  const btnOpenLogout = document.getElementById("btn-deconnexion");

  let allMenus = [];
  let allProducts = [];

  // Charger menus et produits depuis l'API
  async function loadData() {
    try {
      const [menusRes, productsRes] = await Promise.all([
        fetch(`${API_BASE}/menus`),
        fetch(`${API_BASE}/products`),
      ]);
      allMenus = await menusRes.json();
      allProducts = await productsRes.json();
    } catch (e) {
      console.error("Erreur chargement données:", e);
    }
  }

  function createIcon(className) {
    const i = document.createElement("i");
    i.className = className;
    return i;
  }

  // Afficher les produits unitaires depuis la BDD
  function renderSoloProducts() {
    mainGrid.innerHTML = "";
    const container = document.createElement("div");
    container.className = "step-items-container";

    allProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card solo-card";
      const img = document.createElement("div");
      img.className = "image-placeholder-large";
      const info = document.createElement("div");
      info.className = "product-info";
      const name = document.createElement("span");
      name.textContent = product.Name;
      const price = document.createElement("span");
      price.textContent = `${Number(product.Price).toFixed(2)} €`;

      info.append(name, price);
      card.append(img, info);
      card.onclick = () =>
        addToCart(
          { id: product.Id, name: product.Name, price: Number(product.Price), type: "article", category: product.CategoryName || "" },
          updateCartUI,
        );
      container.appendChild(card);
    });
    mainGrid.appendChild(container);
  }

  // Afficher le dashboard menu (Grande Faim / Petite Faim)
  // Les articles du menu viennent de la BDD, regroupés par catégorie
  function renderMenuDashboard(type, price) {
    const isPetiteFaim = type === "Petite Faim";

    // Regrouper les produits par catégorie
    const categories = {};
    allProducts.forEach((p) => {
      const cat = p.CategoryName || "Autre";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(p);
    });

    const catNames = Object.keys(categories).filter(
      (c) => c.toLowerCase() !== "boissons" && c.toLowerCase() !== "boisson",
    );

    const currentSelection = { type, price };
    catNames.forEach((c) => (currentSelection[c] = null));

    // Pour Petite Faim, on retire la première catégorie (entrées)
    const displayCats = isPetiteFaim && catNames.length > 2 ? catNames.slice(1) : catNames;
    displayCats.forEach((c) => {
      if (isPetiteFaim && !displayCats.includes(c)) {
        currentSelection[c] = "aucun";
      }
    });

    mainGrid.innerHTML = "";
    const dashboard = document.createElement("div");
    dashboard.className = "dashboard-container";
    const row = document.createElement("div");
    row.className = "dashboard-row";

    displayCats.forEach((catName, i) => {
      const col = document.createElement("div");
      col.className = "dashboard-column";
      const h3 = document.createElement("h3");
      h3.className = "column-title";
      h3.textContent = `${i + 1}. ${catName}`;
      col.appendChild(h3);

      categories[catName].forEach((product) => {
        const card = document.createElement("div");
        card.className = "option-item-card";
        card.textContent = product.Name;
        card.onclick = () => {
          col.querySelectorAll(".option-item-card").forEach((c) => c.classList.remove("selected"));
          card.classList.add("selected");
          currentSelection[catName] = { id: product.Id, name: product.Name, category: product.CategoryName || "" };
          const btn = document.getElementById("btn-validate-menu");
          const allSelected = displayCats.every((c) => currentSelection[c]);
          btn.disabled = !allSelected;
        };
        col.appendChild(card);
      });

      row.appendChild(col);
    });

    const footer = document.createElement("div");
    footer.className = "validation-area";
    const btnAdd = document.createElement("button");
    btnAdd.id = "btn-validate-menu";
    btnAdd.className = "btn-commander";
    btnAdd.textContent = `Valider ${type} (${price.toFixed(2)} €)`;
    btnAdd.disabled = true;
    btnAdd.onclick = () => {
      const parts = displayCats.map((c) => currentSelection[c]).filter(Boolean);
      const finalMenu = {
        id: Date.now(),
        name: `${type} (${parts.map((p) => p.name).join(", ")})`,
        price: price,
        quantity: 1,
        type: "menu",
        articles: parts,
      };
      addToCart(finalMenu, updateCartUI);
      renderMenuDashboard(type, price);
    };

    footer.appendChild(btnAdd);
    dashboard.append(row, footer);
    mainGrid.appendChild(dashboard);
  }

  function updateCartUI() {
    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "cart-card";
      const name = document.createElement("p");
      name.className = "item-name";
      name.textContent = item.name;
      const price = document.createElement("p");
      price.className = "item-price";
      price.textContent = `${(item.price * item.quantity).toFixed(2)} €`;
      const controls = document.createElement("div");
      controls.className = "qty-controls";

      const btnMinus = document.createElement("button");
      btnMinus.className = "qty-btn-icon";
      btnMinus.appendChild(createIcon("fa-solid fa-minus"));
      btnMinus.onclick = () => {
        updateQuantity(index, "moins");
        updateCartUI();
      };

      const qty = document.createElement("span");
      qty.className = "qty-value";
      qty.textContent = item.quantity;

      const btnPlus = document.createElement("button");
      btnPlus.className = "qty-btn-icon";
      btnPlus.appendChild(createIcon("fa-solid fa-plus"));
      btnPlus.onclick = () => {
        updateQuantity(index, "plus");
        updateCartUI();
      };

      controls.append(btnMinus, qty, btnPlus);
      card.append(name, price, controls);
      cartContainer.appendChild(card);
    });
    totalDisplay.textContent = `${calculateTotal().toFixed(2)} €`;
  }

  initPayment(updateCartUI);
  handleFinalPayment();

  btnGrandeFaim.onclick = () => renderMenuDashboard("Grande Faim", 13.0);
  btnPetiteFaim.onclick = () => renderMenuDashboard("Petite Faim", 10.0);
  btnProducts.onclick = () => renderSoloProducts();
  btnOpenLogout.onclick = () => (modalLogout.style.display = "flex");
  cancelBtn.onclick = () => (modalLogout.style.display = "none");
  confirmBtn.onclick = () => (window.location.href = "../form/form.html");

  // Charger les données puis afficher
  loadData().then(() => {
    renderMenuDashboard("Grande Faim", 13.0);
    updateCartUI();
  });
});