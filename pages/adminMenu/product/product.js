import Menu from "../../../classes/Menu.js";

let productName = document.getElementById("product-name");
let productBuyPrice = document.getElementById("product-buy-price");
let productQuantity = document.getElementById("product-quantity");
let productImage = document.getElementById("product-image");
let productType = document.getElementById("product-type");
let btnAddProduct = document.getElementById("btn-add-product");

let productTableBody = document.getElementById("product-table-body");

let editIndex = null;

btnAddProduct.addEventListener("click", () => {
	createOrUpdateProduct();
	refreshTable();
});

function createOrUpdateProduct() {
	if(productName.value != "" && productBuyPrice.value != "" && productQuantity.value != "" && productType.value != "") {

		if(editIndex === null) {
			let product = new Product();
			product.name = productName.value;
			product.price = productBuyPrice.value;
			product.quantity = productQuantity.value;
			product.img = productImage.value;
			product.setType(productType.value);
		} else {
			let product = Product.productList[editIndex];
			product.name = productName.value;
			product.price = productBuyPrice.value;
			product.quantity = productQuantity.value;
			product.img = productImage.value;
			product.setType(productType.value);

			editIndex = null;
		}

		resetForm();
	}
}

function resetForm() {
	productName.value = "";
	productBuyPrice.value = "";
	productQuantity.value = "";
	productImage.value = "";
	productType.selectedIndex = 0;
}

function refreshTable() {
	productTableBody.innerHTML = "";

	Product.productList.forEach((product, index) => {
		const newTr = document.createElement("tr");

		let tdName = document.createElement("td");
		tdName.textContent = product.name;

		let tdType = document.createElement("td");
		tdType.textContent = product.type;

		let tdPrice = document.createElement("td");
		tdPrice.textContent = product.price;

		let tdQuantity = document.createElement("td");
		tdQuantity.textContent = product.quantity;

		let tdActions = document.createElement("td");
		tdActions.classList.add("actions");

		let btnActivate = document.createElement("button");
		btnActivate.textContent = product.isActive ? "Désactiver" : "Activer";
		btnActivate.classList.add("btn", "secondary");

		btnActivate.addEventListener("click", () => {
			product.isActive = !product.isActive;
			refreshTable();
		});

		let btnModify = document.createElement("button");
		btnModify.textContent = "Modifier";
		btnModify.classList.add("btn", "primary");

		btnModify.addEventListener("click", () => {
			productName.value = product.name;
			productBuyPrice.value = product.price;
			productQuantity.value = product.quantity;
			productType.value = product.type;

			editIndex = index;
		});

		let btnDelete = document.createElement("button");
		btnDelete.textContent = "Supprimer";
		btnDelete.classList.add("btn", "danger");

		btnDelete.addEventListener("click", () => {
			Product.productList.splice(index, 1);
			refreshTable();
		});

		tdActions.appendChild(btnActivate);
		tdActions.appendChild(btnModify);
		tdActions.appendChild(btnDelete);

		newTr.appendChild(tdName);
		newTr.appendChild(tdType);
		newTr.appendChild(tdPrice);
		newTr.appendChild(tdQuantity);
		newTr.appendChild(tdActions);

		productTableBody.appendChild(newTr);
	});
}