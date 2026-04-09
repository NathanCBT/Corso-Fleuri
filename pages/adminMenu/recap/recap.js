const API_BASE = "http://localhost:3000/api";
const ventesBody = document.getElementById("recap-ventes-body");

async function loadVentes() {
  try {
    const res = await fetch(`${API_BASE}/orders`);
    const orders = await res.json();

    ventesBody.innerHTML = "";

    if (orders.length === 0) {
      ventesBody.innerHTML =
        '<tr><td colspan="6" style="text-align:center">Aucune vente enregistrée.</td></tr>';
      return;
    }

    orders.forEach((order) => {
      const lignes = [
        ...(order.articles || []).map((a) => ({
          libelle: a.Name,
          quantite: a.Quantity,
          prix: Number(a.Price).toFixed(2),
        })),
        ...(order.menus || []).map((m) => ({
          libelle: m.Name,
          quantite: 1,
          prix: Number(m.Price).toFixed(2),
        })),
      ];

      lignes.forEach((ligne, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${i === 0 ? order.IdOrder : ""}</td>
          <td>${i === 0 ? order.PaymentMethod || "-" : ""}</td>
          <td>${i === 0 ? order.SellerName || "-" : ""}</td>
          <td>${ligne.libelle}</td>
          <td>${ligne.quantite}</td>
          <td>${ligne.prix} €</td>
        `;
        ventesBody.appendChild(tr);
      });
    });
  } catch (e) {
    ventesBody.innerHTML =
      '<tr><td colspan="5" style="text-align:center; color:red;">Erreur serveur</td></tr>';
    console.error(e);
  }
}

loadVentes();

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
