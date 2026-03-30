export default class Product {
	static TYPES = ["cold", "hot", "soft"];
	constructor(name, price) {
		this.name = name;
		this.price = price;
		this.quantity = 0;
		this.type = null; //hot, cold, soft
		this.isActive = true;
	}
	//quantity
	addQuantity(quantity) {
		this.quantity += quantity;
	}
	removeQuantity(quantity) {
		this.quantity -= quantity;
	}
	//type
	setType(type) {
		if (Product.TYPES.includes(type)) {
			this.type = type;
		}
	}

}
