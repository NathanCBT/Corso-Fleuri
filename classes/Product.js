class Product {
	constructor(name, price) {
		this.name = name;
		this.price = price;
		this.quantity = 0;
		this.category = null; //hot, cold, soft
		this.types = ["cold", "hot", "soft"];
	}
	//quantity
	addQuantity(quantity) {
		this.quantity += quantity;
	}
	removeQuantity(quantity) {
		this.quantity -= quantity;
	}
	//category
	setCategory(type) {
		if (this.types.includes(type)) {
			this.category = type;
		}
	}

}