<<<<<<< HEAD
import Product from "../../../classes/Product.js";
import Menu from "../../../classes/Menu.js";

let users = [];

const nameInput      = document.getElementById("user-name");
const passwordInput  = document.getElementById("user-password");
const addBtn         = document.getElementById("add-user-btn");

const deleteSelect   = document.getElementById("delete-user-select");
const deleteBtn      = document.getElementById("delete-user-btn");

const tableBody      = document.getElementById("user-table-body");


function renderTable() {
	tableBody.textContent = "";

	if (users.length === 0) {
		tableBody.textContent = `<tr id="empty-row"><td colspan="3" class="empty-msg">Aucun utilisateur enregistré.</td></tr>`;
		return;
	}

	users.forEach((user, index) => {
		const tr = document.createElement("tr");
		tr.textContent = `
			<td>${index + 1}</td>
			<td>${escapeHtml(user.name)}</td>
			<td>${"•".repeat(user.password.length)}</td>
		`;
		tableBody.appendChild(tr);
	});
}

function renderDropdown() {
	deleteSelect.textContent = `<option value="">Choisir utilisateur</option>`;

	users.forEach((user, index) => {
		const option = document.createElement("option");
		option.value = index;
		option.textContent = user.name;
		deleteSelect.appendChild(option);
	});
}

function refresh() {
	renderTable();
	renderDropdown();
}


addBtn.addEventListener("click", () => {
	const name     = nameInput.value.trim();
	const password = passwordInput.value.trim();

	if (!name || !password) {
		alert("Veuillez remplir le nom et le mot de passe.");
		return;
	}

	if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) {
		alert("Un utilisateur avec ce nom existe déjà.");
		return;
	}

	users.push({ name, password });

	nameInput.value    = "";
	passwordInput.value = "";

	refresh();
});


deleteBtn.addEventListener("click", () => {
	const selectedIndex = deleteSelect.value;

	if (selectedIndex === "") {
		alert("Veuillez choisir un utilisateur à supprimer.");
		return;
	}

	users.splice(Number(selectedIndex), 1);
	refresh();
});


function escapeHtml(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

refresh();

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
=======
const tableBody = document.getElementById("user-table-body");
const deleteSelect = document.getElementById("delete-user-select");
const nameInput = document.getElementById("user-name");
const passwordInput = document.getElementById("user-password");
const addBtn = document.getElementById("add-user-btn");
const deleteBtn = document.getElementById("delete-user-btn");

async function refresh() {
  try {
    const response = await fetch("http://localhost:3000/api/users");
    if (!response.ok) throw new Error("Erreur lors de la récupération");

    const users = await response.json();

    tableBody.innerHTML = "";
    if (users.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center">Aucun utilisateur.</td></tr>`;
    } else {
      users.forEach((user) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${user.id}</td>
                    <td>${escapeHtml(user.name)}</td>
                    <td>••••••••</td>
                `;
        tableBody.appendChild(tr);
      });
    }

    deleteSelect.innerHTML = `<option value="">Choisir utilisateur</option>`;
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      deleteSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur refresh:", error);
  }
}

addBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const password = passwordInput.value.trim();
  const roleSelect = document.getElementById("user-role");
  const rule = roleSelect ? parseInt(roleSelect.value) : 0;

  if (!name || !password) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        password: password,
        rule: rule,
      }),
    });

    if (response.ok) {
      nameInput.value = "";
      passwordInput.value = "";
      await refresh();
    } else {
      alert("Erreur lors de l'ajout");
    }
  } catch (error) {
    console.error("Erreur fetch ajout:", error);
  }
});

deleteBtn.addEventListener("click", async () => {
  const userId = deleteSelect.value;
  if (!userId) {
    alert("Sélectionnez un utilisateur à supprimer");
    return;
  }

  if (!confirm("Supprimer cet utilisateur ?")) return;

  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await refresh();
    } else {
      alert("Erreur lors de la suppression");
    }
  } catch (error) {
    console.error("Erreur fetch suppression:", error);
  }
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

refresh();
>>>>>>> 12d0676d10284011d8817db7f3059aeedbbdc1da
