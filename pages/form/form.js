const PASSWORDS = {
  1234: "../cashierMenu/cashierMenu.html",
  3214: "../adminMenu/adminPage.html",
};

document.querySelector(".btn-check").addEventListener("click", function () {
  const input = document.querySelector("input[name='password']");
  const redirectUrl = PASSWORDS[input.value];

  if (redirectUrl) {
    window.location.href = redirectUrl;
  } else {
    input.style.borderColor = "red";
    input.value = "";
    input.placeholder = "Code incorrect";
  }
});

document
  .querySelector("input[name='password']")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") document.querySelector(".btn-check").click();
  });
