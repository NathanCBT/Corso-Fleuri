import Product from "./Product.js";
export default class Menu {
  constructor(name) {
    this.name = name;
    this.productsList = [];
    this.existingTypes = [...Product.TYPES];
    this.allowedTypes = [...this.existingTypes];
    this.usedTypes = [];
    this.isActive = true;
    this.price = 0;
  }
  addProduct(product) {
    if (this.allowedTypes.includes(product.type)) {
      this.productsList.push(product);
      this.addUsedType(product.type);
    }
  }
  removeAllowedType(type) {
    const index = this.allowedTypes.indexOf(type);
    if (index != -1) {
      this.allowedTypes.splice(index, 1);
    }
  }
  addUsedType(type) {
    if (!this.usedTypes.includes(type)) {
      this.usedTypes.push(type);
    }
  }
}
