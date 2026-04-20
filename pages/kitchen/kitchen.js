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
    window.location.href = "../form/form.html";
  };
});

const API_BASE = "http://localhost:3000/api";
const layout = document.getElementById("orders-layout");

async function loadOrders() {
  try {
    const res = await fetch(`${API_BASE}/orders`);
    const orders = await res.json();
    renderOrders(orders);
  } catch (e) {
    layout.innerHTML =
      '<p style="text-align:center; grid-column:1/-1; padding:40px; color:red;">Erreur de connexion au serveur</p>';
    console.error(e);
  }
}

function renderOrders(orders) {
  layout.innerHTML = "";

  if (orders.length === 0) {
    layout.innerHTML =
      '<p style="text-align:center; grid-column:1/-1; padding:40px;">Aucune commande en cours</p>';
    return;
  }

  // Compteur pour le top ventes
  const salesCount = {};

  orders.forEach((order) => {
    const card = document.createElement("div");
    card.className = "card";

    const orderNum = document.createElement("div");
    orderNum.className = "order-num";
    orderNum.innerHTML = `Commande <span>#${order.IdOrder}</span> — ${Number(order.Price).toFixed(2)} €`;

    const ul = document.createElement("ul");
    ul.className = "plats";

    if (order.articles) {
      order.articles.forEach((a) => {
        const li = document.createElement("li");
        li.innerHTML = `${a.Name} <span class="qty">×${a.Quantity}</span>`;
        ul.appendChild(li);
        salesCount[a.Name] = (salesCount[a.Name] || 0) + a.Quantity;
      });
    }

    if (order.menus) {
      order.menus.forEach((m) => {
        const li = document.createElement("li");
        li.innerHTML = `${m.Name} <span class="qty">×1</span>`;
        ul.appendChild(li);
        salesCount[m.Name] = (salesCount[m.Name] || 0) + 1;
      });
    }

    card.append(orderNum, ul);
    layout.appendChild(card);
  });

  // Top des ventes
  const sorted = Object.entries(salesCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxVal = sorted.length > 0 ? sorted[0][1] : 1;
  const totalSold = Object.values(salesCount).reduce((a, b) => a + b, 0);

  const ventesCol = document.createElement("div");
  ventesCol.className = "ventes-col";
  ventesCol.innerHTML = `
    <div class="historique-card">
      <div class="histo-title">Top des meilleures ventes</div>
      <ul class="histo-list">
        ${sorted
          .map(
            ([name, count], i) => `
          <li class="histo-row rank-${i + 1}">
            <div class="histo-row-top">
              <div class="histo-name"><span class="rank-badge">${i + 1}</span> ${name}</div>
              <span class="histo-total">${count}</span>
            </div>
            <div class="histo-bar-wrap"><div class="histo-bar" style="width:${(count / maxVal) * 100}%"></div></div>
          </li>`,
          )
          .join("")}
      </ul>
      <div class="histo-footer">
        <span>Total vendus</span>
        <span class="histo-grand-total">${totalSold}</span>
      </div>
    </div>
  `;
  layout.appendChild(ventesCol);
}

// Charger et rafraîchir toutes les 10 secondes
loadOrders();
setInterval(loadOrders, 10000);
