import { cart, addToCart, calculateTotal, updateQuantity } from "./cart.js";
import { initPayment, handleFinalPayment } from "./paymentController.js";

const API_BASE = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", () => {
  const topNav = document.querySelector(".top-nav");
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

  async function loadData() {
    try {
      const [menusRes, productsRes] = await Promise.all([
        fetch(`${API_BASE}/menus`),
        fetch(`${API_BASE}/products`),
      ]);
      allMenus = (await menusRes.json()).filter(m => !!m.isVisible);
      allProducts = (await productsRes.json()).filter(p => !!p.IsVisible);

      generateMenuButtons();

      if (allMenus.length > 0) {
        renderMenuDashboard(allMenus[0]);
        const firstBtn = topNav.querySelector(".btn-cyan");
        if (firstBtn) firstBtn.classList.add("active");
      }
    } catch (e) {
      console.error("Erreur chargement données:", e);
    }
  }

  function generateMenuButtons() {
    topNav.innerHTML = "";

    allMenus.forEach((menu) => {
      const btn = document.createElement("button");
      btn.className = "btn btn-cyan";
      btn.textContent = menu.name;
      btn.onclick = () => {
        document
          .querySelectorAll(".top-nav .btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderMenuDashboard(menu);
      };
      topNav.appendChild(btn);
    });

    topNav.appendChild(btnProducts);
    topNav.appendChild(btnOpenLogout);
  }

  function renderMenuDashboard(menuObject) {
    mainGrid.innerHTML = "";

    const allowedIds = menuObject.articles.map((a) => a.id);
    const menuProducts = allProducts.filter((p) => allowedIds.includes(p.Id));

    const categories = {};
    menuProducts.forEach((p) => {
      const cat = p.CategoryName || "Autre";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(p);
    });

    const catNames = Object.keys(categories);
    const CAT_SORT = ['entr', 'dessert', 'boisson', 'plat'];
    catNames.sort((a, b) => {
      const ra = CAT_SORT.findIndex(k => a.toLowerCase().includes(k));
      const rb = CAT_SORT.findIndex(k => b.toLowerCase().includes(k));
      return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb);
    });
    const currentSelection = {};
    catNames.forEach((c) => (currentSelection[c] = null));

    const dashboard = document.createElement("div");
    dashboard.className = "dashboard-container";

    const title = document.createElement("h2");
    title.style.textAlign = "center";
    title.textContent = `Composition : ${menuObject.name}`;
    dashboard.appendChild(title);

    const row = document.createElement("div");
    row.className = "dashboard-row";

    catNames.forEach((catName) => {
      const col = document.createElement("div");
      col.className = "dashboard-column";

      const h3 = document.createElement("h3");
      h3.className = "column-title";
      h3.textContent = catName;
      col.appendChild(h3);

      categories[catName].forEach((product) => {
        const card = document.createElement("div");
        card.className = "option-item-card";

        // gérer le stock
        const hasStock = product.Stock > 0;
        if (!hasStock) {
          card.classList.add("out-of-stock");
          card.textContent = `${product.Name} (Épuisé)`;
        } else {
          card.textContent = product.Name;
          card.onclick = () => {
            col
              .querySelectorAll(".option-item-card")
              .forEach((c) => c.classList.remove("selected"));
            card.classList.add("selected");
            currentSelection[catName] = { id: product.Id, name: product.Name, category: product.CategoryName || "" };

            const btnVal = document.getElementById("btn-validate-menu");
            btnVal.disabled = !catNames.every((c) => currentSelection[c]);
          };
        }
        col.appendChild(card);
      });
      row.appendChild(col);
    });

    const footer = document.createElement("div");
    footer.className = "validation-area";
    const btnAdd = document.createElement("button");
    btnAdd.id = "btn-validate-menu";
    btnAdd.className = "btn-commander";
    btnAdd.textContent = `Valider ${menuObject.name} (${Number(menuObject.price).toFixed(2)} €)`;
    btnAdd.disabled = true;

    btnAdd.onclick = () => {
      const parts = catNames.map((c) => currentSelection[c]);
      const finalMenu = {
        id: menuObject.id,
        name: `${menuObject.name} (${parts.map((p) => p.name).join(", ")})`,
        price: Number(menuObject.price),
        quantity: 1,
        type: "menu",
        articles: parts,
      };
      addToCart(finalMenu, updateCartUI);
      renderMenuDashboard(menuObject); // reset l'interface de choix
    };

    footer.appendChild(btnAdd);
    dashboard.append(row, footer);
    mainGrid.appendChild(dashboard);
  }

  function renderSoloProducts() {
    mainGrid.innerHTML = "";
    const container = document.createElement("div");
    container.className = "step-items-container";

    allProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card solo-card";

      const isOutOfStock = product.Stock <= 0;
      if (isOutOfStock) card.classList.add("out-of-stock");

      card.innerHTML = `
        <div class="image-placeholder-large">
            <i class="fa-solid ${isOutOfStock ? "fa-box-open" : "fa-utensils"}"></i>
        </div>
        <div class="product-info">
          <span>${product.Name} ${isOutOfStock ? "(Épuisé)" : ""}</span>
          <span>${Number(product.Price).toFixed(2)} €</span>
        </div>
      `;

      if (!isOutOfStock) {
        card.onclick = () =>
          addToCart(
            {
              id: product.Id,
              name: product.Name,
              price: Number(product.Price),
              type: "article",
              category: product.CategoryName || "",
            },
            updateCartUI,
          );
      }

      container.appendChild(card);
    });
    mainGrid.appendChild(container);
  }

  function updateCartUI() {
    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "cart-card";
      card.innerHTML = `
        <div class="item-details">
            <p class="item-name">${item.name}</p>
            <p class="item-price">${(item.price * item.quantity).toFixed(2)} €</p>
        </div>
        <div class="qty-controls">
            <button class="btn-minus"><i class="fa-solid fa-minus"></i></button>
            <span class="qty-value">${item.quantity}</span>
            <button class="btn-plus"><i class="fa-solid fa-plus"></i></button>
        </div>
      `;
      card.querySelector(".btn-minus").onclick = () => {
        updateQuantity(index, "moins");
        updateCartUI();
      };
      card.querySelector(".btn-plus").onclick = () => {
        updateQuantity(index, "plus");
        updateCartUI();
      };
      cartContainer.appendChild(card);
    });
    totalDisplay.textContent = `${calculateTotal().toFixed(2)} €`;
  }

  initPayment(updateCartUI);
  handleFinalPayment();

  btnProducts.onclick = () => {
    document
      .querySelectorAll(".top-nav .btn")
      .forEach((b) => b.classList.remove("active"));
    btnProducts.classList.add("active");
    renderSoloProducts();
  };

  btnOpenLogout.onclick = () => (modalLogout.style.display = "flex");
  cancelBtn.onclick = () => (modalLogout.style.display = "none");
  confirmBtn.onclick = () => (window.location.href = "../form/form.html");

  loadData().then(() => {
    updateCartUI();
  });
});
