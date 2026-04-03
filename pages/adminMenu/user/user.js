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