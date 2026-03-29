import { cart, addToCart, calculateTotal, updateQuantity } from "./cart.js";
import { initPayment, handleFinalPayment } from "./paymentController.js";

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

  const menuOptions = {
    starters: [{ name: "Taboulé" }, { name: "Carotte râpée" }],
    mains: [
      { name: "Kebab" },
      { name: "Chipolatas" },
      { name: "Merguez" },
      { name: "Andouillette" },
      { name: "Pépite de blé" },
    ],
    desserts: [{ name: "Flan" }, { name: "Glace" }, { name: "Tarte" }],
  };

  const singleProducts = [
    { id: 101, name: "Frites", price: 3.5 },
    { id: 102, name: "Sangria", price: 3 },
    { id: 103, name: "Pichet de Sangria", price: 12 },
    { id: 104, name: "Bouteille de vin", price: 12 },
    { id: 105, name: "Coca Cola", price: 2 },
    { id: 106, name: "Orangina", price: 2 },
    { id: 107, name: "Perrier", price: 2 },
    { id: 108, name: "Oasis Tropical", price: 2 },
    { id: 109, name: "Oasis Thé Pêche", price: 2 },
    { id: 110, name: "Café", price: 1 },
  ];

  let currentSelection = {
    type: "",
    starter: null,
    main: null,
    dessert: null,
    price: 0,
  };

  function createIcon(className) {
    const i = document.createElement("i");
    i.className = className;
    return i;
  }

  function renderSoloProducts(list) {
    mainGrid.innerHTML = "";
    const container = document.createElement("div");
    container.className = "step-items-container";

    list.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card solo-card";
      const img = document.createElement("div");
      img.className = "image-placeholder-large";
      const info = document.createElement("div");
      info.className = "product-info";
      const name = document.createElement("span");
      name.textContent = product.name;
      const price = document.createElement("span");
      price.textContent = `${product.price.toFixed(2)} €`;

      info.append(name, price);
      card.append(img, info);
      card.onclick = () => addToCart(product, updateCartUI);
      container.appendChild(card);
    });
    mainGrid.appendChild(container);
  }

  function renderMenuDashboard(type, price) {
    currentSelection = {
      type,
      starter: null,
      main: null,
      dessert: null,
      price,
    };
    mainGrid.innerHTML = "";
    const dashboard = document.createElement("div");
    dashboard.className = "dashboard-container";
    const row = document.createElement("div");
    row.className = "dashboard-row";

    row.appendChild(
      createColumn("1. Entrées", menuOptions.starters, "starter"),
    );
    row.appendChild(createColumn("2. Plats", menuOptions.mains, "main"));
    row.appendChild(
      createColumn("3. Desserts", menuOptions.desserts, "dessert"),
    );

    const footer = document.createElement("div");
    footer.className = "validation-area";
    const btnAdd = document.createElement("button");
    btnAdd.id = "btn-validate-menu";
    btnAdd.className = "btn-commander";
    btnAdd.textContent = `Valider ${type} (${price.toFixed(2)} €)`;
    btnAdd.disabled = true;
    btnAdd.onclick = () => {
      const finalMenu = {
        id: Date.now(),
        name: `${type} (${currentSelection.starter}, ${currentSelection.main}, ${currentSelection.dessert})`,
        price: price,
        quantity: 1,
      };
      addToCart(finalMenu, updateCartUI);
      renderMenuDashboard(type, price);
    };

    footer.appendChild(btnAdd);
    dashboard.append(row, footer);
    mainGrid.appendChild(dashboard);
  }

  function createColumn(title, items, key) {
    const col = document.createElement("div");
    col.className = "dashboard-column";
    const h3 = document.createElement("h3");
    h3.className = "column-title";
    h3.textContent = title;
    col.appendChild(h3);

    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "option-item-card";
      card.textContent = item.name;
      card.onclick = () => {
        col
          .querySelectorAll(".option-item-card")
          .forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        currentSelection[key] = item.name;
        const btn = document.getElementById("btn-validate-menu");
        if (
          currentSelection.starter &&
          currentSelection.main &&
          currentSelection.dessert
        ) {
          btn.disabled = false;
        }
      };
      col.appendChild(card);
    });
    return col;
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
  btnProducts.onclick = () => renderSoloProducts(singleProducts);
  btnOpenLogout.onclick = () => (modalLogout.style.display = "flex");
  cancelBtn.onclick = () => (modalLogout.style.display = "none");
  confirmBtn.onclick = () => (window.location.href = "../form/form.html");

  renderMenuDashboard("Grande Faim", 13.0);
  updateCartUI();
});
