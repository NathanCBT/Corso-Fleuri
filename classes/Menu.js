import Product from "./Product.js";
class Menu {
	constructor(name) {
		this.name = name;
		this.productsList = [];
		this.existingTypes = [...Product.TYPES];
		this.allowedTypes = [...this.existingTypes];
		this.usedTypes = [];
		//menu can be desactivate
		this.isActive = true;
	}
	addProduct(product) {
		if(this.allowedTypes.includes(product.type)) {
			this.productsList.push(product);
			this.addUsedType(product.type);
		}
	}
	removeProduct(product) {
		const index = this.productsList.indexOf(product);
		//if product is found
		if(index != -1) {
			this.productsList.splice(index, 1);
			this.deletType(product.type);
		}
	}	
	deletType(type) {
		const index = this.usedTypes.indexOf(type);
		//if type is found in array
		if(index != -1) {
			this.usedTypes.splice(index, 1);
		}
	}
	addUsedType(type) {
		const index = this.usedTypes.indexOf(type);
		if(index == -1) {
			this.usedTypes.push(type);
		}
	}
	removeAllowedType(type) {
		const index = this.allowedTypes.indexOf(type);
		if(index != -1) {
			this.allowedTypes.splice(index, 1);
		}
	}
	addAllowodType(type) {
		const index = this.allowedTypes.indexOf(type);
		if(index == -1 && this.existingTypes.includes(type)) {
			this.allowedTypes.push(type);
		}
	}
}
/*
TESTS MENU PRODUCTS
let p = new Product("pasta", 10);
p.addQuantity(10);
p.setType("cold");

let pr = new Product("chipo", 12.3);
pr.addQuantity(10);
pr.removeQuantity(2);
pr.setType("hot");

let bla = new Product("tea", 2);
bla.addQuantity(4);
bla.setType("soft");

let m = new Menu("m");

m.addProduct(p);
m.addProduct(pr);
m.addProduct(bla);
m.addProduct(bla);
m.addProduct(bla);
m.removeProduct(pr);
console.log(m);

let lu = new Menu("lu");
lu.removeAllowedType("hot");
lu.removeAllowedType("soft");
lu.addAllowodType("toto");
lu.addAllowodType("hot");
lu.addProduct(pr);
lu.addProduct(bla);
console.log(lu);
*/