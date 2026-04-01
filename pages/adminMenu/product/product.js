import Product from "../../../classes/Product.js";

//create Product
let productName = document.getElementById("product-name");
let productPrice = document.getElementById("product-price");
let productQuantity = document.getElementById("product-quantity");
let productImage = document.getElementById("product-image");
let productType = document.getElementById("product-type");
let btnAddProduct = document.getElementById("btn-add-product");
//product gestion
let deleteProductSelect = document.getElementById("delete-product-select");


btnAddProduct.addEventListener("click", () => {
	createProduct();
})
function createProduct() {
	if(productName.value != "" && productPrice.value != "" && productQuantity.value != "" && productImage.value != "" && productType.value != "") {
		let product = new Product();
		//name
		product.name = productName.value;
		productName.value = "";
		//price
		product.price = productPrice.value;
		productPrice.value = "";
		//quantity
		product.quantity = productQuantity.value;
		productQuantity.value = "";
		//img
		product.img = productImage.value;
		productImage.value = "";
		//type
		product.setType(productType.value);
		productType.value = "";
		//productGestion
		console.log("productList", Product.productList);	
	}
}
