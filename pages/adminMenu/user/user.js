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
