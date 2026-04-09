const API_BASE = "http://localhost:3000/api";
const ventesBody = document.getElementById("recap-ventes-body");
let allOrders = [];

function escapeHtml(str) {
  if (str === null || str === undefined) return "-";
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

async function loadVentes() {
  return new Promise(async (resolve) => {
  try {
    const res = await fetch(`${API_BASE}/orders`);
    const orders = await res.json();

    ventesBody.innerHTML = "";

    if (orders.length === 0) {
      ventesBody.innerHTML = '<tr><td colspan="6" style="text-align:center">Aucune vente enregistrée.</td></tr>';
      resolve();
      return;
    }

    allOrders = orders;

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
          <td>${i === 0 ? escapeHtml(order.IdOrder) : ""}</td>
          <td>${i === 0 ? escapeHtml(order.PaymentMethod) : ""}</td>
          <td>${i === 0 ? escapeHtml(order.SellerName) : ""}</td>
          <td>${escapeHtml(ligne.libelle)}</td>
          <td>${escapeHtml(ligne.quantite)}</td>
          <td>${escapeHtml(ligne.prix)} €</td>
        `;
        ventesBody.appendChild(tr);
      });
    });
  } catch (e) {
    ventesBody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:red;">Erreur serveur</td></tr>';
    console.error(e);
  }
  resolve();
  });
}

function exportCSV() {
  const rows = [
    ['N° de Vente', 'Mode de paiement', 'Utilisateur', 'Libellé', 'Quantité', 'Prix de vente'],
  ];

  allOrders.forEach((order) => {
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
      rows.push([
        i === 0 ? order.IdOrder : '',
        i === 0 ? (order.PaymentMethod || '') : '',
        i === 0 ? (order.SellerName || '') : '',
        ligne.libelle || '',
        ligne.quantite,
        ligne.prix + ' €',
      ]);
    });
  });

  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
    .join('\r\n');

  const bom = '\uFEFF'; // BOM UTF-8 pour Excel
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `ventes_${date}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

loadVentes().then(() => {
  const btnCSV = document.getElementById('btn-export-csv');
  if (btnCSV) btnCSV.onclick = exportCSV;
});

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
      window.location.href = "../form/form.html";
    };
  }
});
