import Product from "./Product.js";
class Menu {
	constructor() {
		this.name;
		this.productsList = [];
		this.allowedTypes = [...Product.TYPES];
		//menu can be desactivate
		this.isActive = true;
	}
	addProduct(product) {
		if(this.allowedTypes.includes(product.type)) {
			this.deletType(product.type);
			this.productsList.push(product);
		}
	}
	removeProduct(product) {
		const index = this.productsList.indexOf(product);
		//if product is found
		if(index != -1) {
			this.productsList.splice(index, 1);
			this.addType(product.type);
		}
	}	
	deletType(type) {
		const index = this.allowedTypes.indexOf(type);
		//if type is found in array
		if(index != -1) {
			this.allowedTypes.splice(index, 1);
		}
	}
	addType(type) {
		this.allowedTypes.push(type);
	}
}

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

let m = new Menu();
m.addProduct(p);
m.addProduct(pr);
m.addProduct(bla);
m.removeProduct(pr);
console.log(m.productsList);
console.log(m.allowedTypes);

let lu = new Menu();
