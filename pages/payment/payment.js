const API_BASE = "http://localhost:3000/api";
const orderList = document.getElementById("order-list");

async function loadOrders() {
  try {
    const res = await fetch(`${API_BASE}/orders`);
    const orders = await res.json();

    if (orders.length === 0) {
      orderList.innerHTML = "<p style='text-align:center;'>Aucun paiement enregistré.</p>";
      return;
    }

    orderList.innerHTML = "";
    orders.forEach((order) => {
      const card = document.createElement("div");
      card.className = "order-card";

      let itemsHtml = "";
      if (order.articles && order.articles.length > 0) {
        itemsHtml += "<ul>" + order.articles.map((a) => `<li>${a.Name} ×${a.Quantity}</li>`).join("") + "</ul>";
      }
      if (order.menus && order.menus.length > 0) {
        itemsHtml += "<ul>" + order.menus.map((m) => `<li>${m.Name}</li>`).join("") + "</ul>";
      }

      card.innerHTML = `
        <h3>Commande #${order.IdOrder}</h3>
        <p><strong>Total :</strong> ${Number(order.Price).toFixed(2)} €</p>
        ${itemsHtml}
      `;
      orderList.appendChild(card);
    });
  } catch (e) {
    orderList.innerHTML = "<p style='text-align:center; color:red;'>Erreur de connexion au serveur</p>";
    console.error(e);
  }
}

loadOrders();