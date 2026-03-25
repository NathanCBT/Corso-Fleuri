import Product from "./Product.js";
class Menu {
	constructor() {
		this.name;
		this.productsList = [];
		this.allowedTypes = Product.TYPES;
		//menu can be desactivate
		this.isActive = true;
	}
	addProduct(product) {
		if(this.allowedTypes.includes(product.type)) {
			this.productsList.push(product);
		}
	}
	removeProduct(product) {
		const index = this.productsList.indexOf(product);
		this.productsList.splice(index, 1);
	}
	deletType(type) {
		const index = this.allowedTypes.indexOf(type);
		this.allowedTypes.splice(index, 1);
	}
}
/*
let p = new Product("pasta", 10);
p.addQuantity(10);
p.setType("cold");

let pr = new Product("chipo", 12.3);
pr.addQuantity(10);
pr.removeQuantity(2);
pr.setType("hot");

let m = new Menu();
console.log("allowed Types", m.allowedTypes);
console.log("delet type");
m.deletType("cold");
console.log("allowed Types", m.allowedTypes);
m.addProduct(p);
m.addProduct(pr);
console.log(m.productsList);
m.removeProduct(pr);
console.log(m.productsList);
*/

