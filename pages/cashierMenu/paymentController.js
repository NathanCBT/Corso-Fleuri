import { cart, calculateTotal, updateQuantity } from "./cart.js";

const API_BASE = "http://localhost:3000/api";

export function initPayment(updateCartUI) {
  const btnOrder = document.querySelector(".btn-commander");
  const paymentView = document.getElementById("payment-view");
  const btnBack = document.getElementById("btn-back-to-menu");
  const calcDisplay = document.querySelector(".calc-display");
  const btnLogoutPay = document.getElementById("btn-deconnexion-pay");
  const modalLogout = document.getElementById("modal-logout");
  const btnOrderMain = document.querySelector(".bottom-bar .btn-commander");

  let currentInput = "";
  let previousInput = "";
  let operation = null;

  function renderPaymentSidebar() {
    const sidebarPayment = document.getElementById("sidebar-payment");
    if (!sidebarPayment) return;

    sidebarPayment.replaceChildren();

    const title = document.createElement("h2");
    title.className = "sidebar-title";
    title.textContent = "Récapitulatif";
    sidebarPayment.appendChild(title);

    const container = document.createElement("div");
    container.className = "cart-items";
    sidebarPayment.appendChild(container);

    if (cart.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.style.textAlign = "center";
      emptyMsg.style.padding = "20px";
      emptyMsg.textContent = "Panier vide";
      container.appendChild(emptyMsg);
      return;
    }

    cart.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "cart-card";

      const nameP = document.createElement("p");
      nameP.className = "item-name";
      nameP.textContent = item.name;

      const priceP = document.createElement("p");
      priceP.className = "item-price";
      priceP.textContent = `${(item.price * item.quantity).toFixed(2)} €`;

      const qtyDiv = document.createElement("div");
      qtyDiv.className = "qty-controls";

      const btnMinus = document.createElement("button");
      btnMinus.className = "qty-btn-icon btn-minus";
      btnMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';
      btnMinus.onclick = () => {
        updateQuantity(index, "moins");
        refreshAll();
      };

      const qtyVal = document.createElement("span");
      qtyVal.className = "qty-value";
      qtyVal.textContent = item.quantity;

      const btnPlus = document.createElement("button");
      btnPlus.className = "qty-btn-icon btn-plus";
      btnPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';
      btnPlus.onclick = () => {
        updateQuantity(index, "plus");
        refreshAll();
      };

      qtyDiv.append(btnMinus, qtyVal, btnPlus);
      card.append(nameP, priceP, qtyDiv);
      container.appendChild(card);
    });
  }

  function refreshAll() {
    updateCartUI();
    renderPaymentSidebar();
    const total = calculateTotal();
    document.querySelector(".total-amount-pay").textContent =
      `${total.toFixed(2)} €`;
    if (total === 0) paymentView.style.display = "none";
  }

  if (btnOrderMain) {
    btnOrderMain.onclick = () => {
      if (calculateTotal() === 0) return alert("Panier vide !");
      paymentView.style.display = "block";
      renderPaymentSidebar();
      document.querySelector(".total-amount-pay").textContent =
        `${calculateTotal().toFixed(2)} €`;
    };
  }

  if (btnLogoutPay)
    btnLogoutPay.onclick = () => (modalLogout.style.display = "flex");
  btnBack.onclick = () => (paymentView.style.display = "none");

  document.querySelectorAll(".calc-btn").forEach((btn) => {
    btn.onclick = () => {
      const val = btn.textContent;
      const isNum = btn.classList.contains("num");
      const isDecimal = btn.classList.contains("decimal");
      const isClear = btn.classList.contains("clear");
      const isBackspace =
        btn.classList.contains("backspace") ||
        btn.querySelector(".fa-backspace");
      const isEqual = btn.classList.contains("equals");

      if (isNum) {
        currentInput += val;
      } else if (isDecimal) {
        if (!currentInput.includes("."))
          currentInput += currentInput === "" ? "0." : ".";
      } else if (isClear) {
        currentInput = "";
        previousInput = "";
        operation = null;
      } else if (isBackspace) {
        currentInput = currentInput.slice(0, -1);
      } else if (isEqual) {
        if (!operation || !previousInput || !currentInput) return;
        let n1 = parseFloat(previousInput);
        let n2 = parseFloat(currentInput);
        if (operation === "/") currentInput = (n1 / n2).toString();
        if (operation === "x") currentInput = (n1 * n2).toString();
        if (operation === "-") currentInput = (n1 - n2).toString();
        if (operation === "+") currentInput = (n1 + n2).toString();
        if (operation === "%") currentInput = (n1 % n2).toString();
        operation = null;
      } else {
        if (currentInput === "") return;
        operation = val;
        previousInput = currentInput;
        currentInput = "";
      }
      calcDisplay.textContent = currentInput || "0.00";
    };
  });
}

export function handleFinalPayment() {
  const modal = document.getElementById("modal-pay-type");
  const btnFinal = document.getElementById("btn-final-pay");

  if (btnFinal) {
    btnFinal.onclick = () => (modal.style.display = "flex");
  }

  document.getElementById("pay-card").onclick = () => confirmSale("Carte");
  document.getElementById("pay-cash").onclick = () => confirmSale("Espèces");

  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
}

function confirmSale(method) {
  const articles = cart
    .filter((item) => item.type === "article")
    .map((item) => ({ id: item.id, quantity: item.quantity }));
  const menus = cart
    .filter((item) => item.type === "menu")
    .map((item) => ({ id: item.id }));
  const total = calculateTotal();

  const seller = localStorage.getItem("userName") || "Inconnu";

  fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      seller,
      price: total,
      articles,
      menus,
      paymentMethod: method,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert(`Paiement ${method} accepté ! Commande #${data.orderId}`);
        location.reload();
      } else {
        alert("Erreur lors de la commande");
      }
    })
    .catch((e) => {
      console.error(e);
      alert("Erreur de connexion au serveur");
    });
}