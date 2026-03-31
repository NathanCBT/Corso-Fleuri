document
  .querySelector(".btn-check")
  .addEventListener("click", async function () {
    const input = document.querySelector("input[name='password']");
    const password = input.value;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userName", data.username);

        if (data.role === "admin") {
          window.location.href = "../adminMenu/adminMenu.html";
        } else {
          window.location.href = "../cashierMenu/cashierMenu.html";
        }
      } else {
        showError(input);
      }
    } catch (error) {
      console.error("Erreur de connexion au serveur", error);
      showError(input);
    }
  });

function showError(input) {
  input.style.borderColor = "red";
  input.value = "";
  input.placeholder = "Code incorrect";
}

document
  .querySelector("input[name='password']")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.querySelector(".btn-check").click();
  });
