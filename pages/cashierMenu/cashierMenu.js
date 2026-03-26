document.addEventListener("DOMContentLoaded", () => {
  const btnDisconnection = document.getElementById("btn-deconnexion");
  const btnProducts = document.getElementById("btn-products");
  const btnMenu = document.getElementById("btn-menu");
  const mainGrid = document.getElementById("main-grid");

  const btnOpenLogout = document.getElementById("btn-deconnexion");
  const modalLogout = document.getElementById("modal-logout");
  const confirmBtn = document.getElementById("confirm-logout");
  const cancelBtn = document.getElementById("cancel-logout");

  btnOpenLogout.addEventListener("click", () => {
    modalLogout.style.display = "flex";
  });

  cancelBtn.addEventListener("click", () => {
    modalLogout.style.display = "none";
  });

  confirmBtn.addEventListener("click", () => {
    window.location.href = "../form/form.html";
  });

  window.addEventListener("click", (event) => {
    if (event.target == modalLogout) {
      modalLogout.style.display = "none";
    }
  });

  const menus = [
    { nom: "Menu Best Of", prix: "12,85 €" },
    { nom: "Menu Signature", prix: "15,50 €" },
    { nom: "Menu McFirst", prix: "10,50 €" },
    { nom: "Menu Royal Cheese", prix: "13,20 €" },
  ];

  const produitsUnitaires = [
    { nom: "Big Mac Solo", prix: "5,50 €" },
    { nom: "Frites Moyennes", prix: "3,20 €" },
    { nom: "Coca-Cola", prix: "2,50 €" },
    { nom: "McFlurry", prix: "4,10 €" },
    { nom: "Nuggets x6", prix: "4,80 €" },
    { nom: "Cheese Burger", prix: "2,90 €" },
  ];

  // changing the grid content
  function renderProducts(liste) {
    mainGrid.innerHTML = "";

    liste.forEach((prod) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="image-placeholder-large"></div>
        <div class="product-info">
          <span>${prod.nom}</span>
          <span>${prod.prix}</span>
        </div>
      `;

      mainGrid.appendChild(card);
    });
  }

  btnProducts.addEventListener("click", () => {
    renderProducts(produitsUnitaires);

    btnProducts.classList.add("active");
    btnMenu.classList.remove("active");
  });
  renderProducts(menus);

  btnMenu.addEventListener("click", () => {
    renderProducts(menus);
  });
});
