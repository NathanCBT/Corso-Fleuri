const API_BASE = "http://localhost:3000/api";
const tableBody = document.querySelector("#recap-section tbody");

async function loadRecap() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    const products = await res.json();

    tableBody.innerHTML = "";

    if (products.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center">Aucun produit.</td></tr>';
      return;
    }

    products.forEach((p) => {
      const tr = document.createElement("tr");
      const stockStyle = p.Stock <= p.QuantityMin ? 'style="color:red; font-weight:bold"' : "";
      tr.innerHTML = `
        <td>${p.Name}</td>
        <td>${p.CategoryName}</td>
        <td>${p.Price} €</td>
        <td ${stockStyle}>${p.Stock}</td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (e) {
    tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:red;">Erreur serveur</td></tr>';
    console.error(e);
  }
}

loadRecap();
