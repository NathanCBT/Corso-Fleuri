import { cart, addToCart, calculateTotal, updateQuantity } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnProducts = document.getElementById("btn-products");
  const btnMenu = document.getElementById("btn-menu");
  const mainGrid = document.getElementById("main-grid");
  const cartContainer = document.getElementById("cart-container");
  const totalDisplay = document.querySelector(".total-amount");
  const modalLogout = document.getElementById("modal-logout");
  const confirmBtn = document.getElementById("confirm-logout");
  const cancelBtn = document.getElementById("cancel-logout");
  const btnOpenLogout = document.getElementById("btn-deconnexion");

  const menus = [
    { id: 1, name: "Grande Faim Kebab", price: 13.0 },
    { id: 2, name: "Grande Faim Chipolatas", price: 13.0 },
    { id: 3, name: "Grande Faim Merguez", price: 13.0 },
    { id: 4, name: "Grande Faim Andouillette", price: 13.0 },
    { id: 5, name: "Grande Faim Pépite de blé", price: 13.0 },
  ];

  const singleProducts = [
    { id: 101, name: "Frites", price: 3.5 },
    { id: 102, name: "Sangria", price: 3 },
    { id: 103, name: "Pichet de Sangria", price: 12 },
    { id: 104, name: "Bouteille de vin (rouge ou rosé)", price: 12 },
    { id: 105, name: "Coca Cola", price: 2 },
    { id: 106, name: "Orangina", price: 2 },
    { id: 107, name: "Perrier", price: 2 },
    { id: 108, name: "Oasis Tropical", price: 2 },
    { id: 109, name: "Oasis Thé Pêche", price: 2 },
    { id: 110, name: "Café", price: 1 },
  ];

  const menuOptions = {
    starters: [
      { id: 201, name: "Taboulé", price: 0 },
      { id: 202, name: "Carotte rapée", price: 0 },
    ],
    desserts: [
      { id: 301, name: "Flan", price: 0 },
      { id: 302, name: "Glace", price: 0 },
      { id: 303, name: "Tarte", price: 0 },
    ],
  };

  let currentMenu = null;
  let currentStep = 0;
  let temporaryChoice = null;

  function createIcon(className) {
    const i = document.createElement("i");
    i.className = className;
    return i;
  }

  function renderGrid(list) {
    mainGrid.innerHTML = "";

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "step-items-container";

    list.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

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

      card.onclick = () => {
        if (list === menus) startMenuConfiguration(product);
        else addToCart(product, updateCartUI);
      };

      itemsContainer.appendChild(card);
    });

    mainGrid.appendChild(itemsContainer);
  }

  function startMenuConfiguration(selectedMenu) {
    currentMenu = { ...selectedMenu, choices: [] };
    currentStep = 0;
    renderMenuStep();
  }

  function renderMenuStep() {
    mainGrid.innerHTML = "";

    const stepHeader = document.createElement("div");
    stepHeader.className = "step-header";
    const title = document.createElement("span");
    title.textContent = getStepTitle();
    stepHeader.appendChild(title);
    mainGrid.appendChild(stepHeader);

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "step-items-container";

    let itemsToDisplay = [];
    if (currentStep === 0) itemsToDisplay = [currentMenu];
    else if (currentStep === 1) itemsToDisplay = menuOptions.starters;
    else if (currentStep === 2) itemsToDisplay = menuOptions.desserts;

    itemsToDisplay.forEach((item) => {
      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("div");
      img.className = "image-placeholder-large";

      const info = document.createElement("div");
      info.className = "product-info";

      const name = document.createElement("span");
      name.textContent = item.name;

      const price = document.createElement("span");
      price.textContent = item.price > 0 ? `+ ${item.price.toFixed(2)} €` : "";

      info.append(name, price);
      card.append(img, info);

      card.onclick = () => {
        document
          .querySelectorAll(".product-card")
          .forEach((c) => c.classList.remove("selected"));

        card.classList.add("selected");
        temporaryChoice = item;
        document.getElementById("btn-next-step").disabled = false;
      };
      itemsContainer.appendChild(card);
    });
    mainGrid.appendChild(itemsContainer);

    const stepFooter = document.createElement("div");
    stepFooter.className = "step-footer";

    const btnBack = document.createElement("button");
    btnBack.className = "btn-nav btn-back";
    btnBack.append(
      createIcon("fa-solid fa-chevron-left"),
      document.createTextNode(" Retour"),
    );
    btnBack.onclick = () => {
      if (currentStep === 0) renderGrid(menus);
      else {
        currentStep--;
        if (currentMenu.choices.length > 0) currentMenu.choices.pop();
        renderMenuStep();
      }
    };

    const btnNext = document.createElement("button");
    btnNext.className = "btn-nav btn-next";
    btnNext.id = "btn-next-step";
    btnNext.disabled = true;
    btnNext.append(
      document.createTextNode("Suivant "),
      createIcon("fa-solid fa-chevron-right"),
    );
    btnNext.onclick = () => validateStepChoice(temporaryChoice);

    stepFooter.append(btnBack, btnNext);
    mainGrid.appendChild(stepFooter);
  }

  function getStepTitle() {
    if (currentStep === 0) return currentMenu.name;
    if (currentStep === 1) return "Choisissez votre accompagnement";
    return "Choisissez votre dessert";
  }

  function validateStepChoice(item) {
    if (currentStep > 0) {
      currentMenu.choices.push(item.name);
      currentMenu.price += item.price;
    }
    currentStep++;
    temporaryChoice = null;

    if (currentStep > 2) finalizeMenu();
    else renderMenuStep();
  }

  function finalizeMenu() {
    const finalMenu = {
      ...currentMenu,
      name: `${currentMenu.name} (${currentMenu.choices.join(", ")})`,
    };
    addToCart(finalMenu, updateCartUI);
    renderGrid(menus);
  }

  function updateCartUI() {
    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "cart-card";

      const name = document.createElement("p");
      name.className = "item-name";
      name.textContent = item.name;

      const img = document.createElement("div");
      img.className = "image-placeholder";

      const price = document.createElement("p");
      price.className = "item-price";
      price.textContent = `${(item.price * item.quantity).toFixed(2)} €`;

      const controls = document.createElement("div");
      controls.className = "qty-controls";

      const btnRemove = document.createElement("button");
      btnRemove.className = "qty-btn-icon btn-remove";
      btnRemove.dataset.index = index;
      btnRemove.appendChild(createIcon("fa-solid fa-trash-can"));

      const qty = document.createElement("span");
      qty.className = "qty-value";
      qty.textContent = item.quantity;

      const btnAdd = document.createElement("button");
      btnAdd.className = "qty-btn-icon btn-add";
      btnAdd.dataset.index = index;
      btnAdd.appendChild(createIcon("fa-solid fa-plus"));

      controls.append(btnRemove, qty, btnAdd);
      card.append(name, img, price, controls);
      cartContainer.appendChild(card);
    });

    totalDisplay.textContent = `${calculateTotal().toFixed(2)} €`;
    attachCartEvents();
  }

  function attachCartEvents() {
    document.querySelectorAll(".btn-add").forEach((btn) => {
      btn.onclick = () => {
        updateQuantity(btn.dataset.index, "plus");
        updateCartUI();
      };
    });
    document.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.onclick = () => {
        updateQuantity(btn.dataset.index, "moins");
        updateCartUI();
      };
    });
  }

  btnProducts.onclick = () => {
    renderGrid(singleProducts);
    btnProducts.classList.add("active");
    btnMenu.classList.remove("active");
  };

  btnMenu.onclick = () => {
    renderGrid(menus);
    btnMenu.classList.add("active");
    btnProducts.classList.remove("active");
  };

  btnOpenLogout.onclick = () => (modalLogout.style.display = "flex");
  cancelBtn.onclick = () => (modalLogout.style.display = "none");
  confirmBtn.onclick = () => (window.location.href = "../form/form.html");

  renderGrid(menus);
  updateCartUI();
});
