export default class Product {
  static TYPES = ["cold", "hot", "soft"];
  static productList = [];
  constructor() {
    this.name;
    this.price;
    this.quantity = 0;
    this.type = null; //hot, cold, soft
    this.img;
    this.isActive = true;
    Product.productList.push(this);
  }
  //type
  setType(type) {
    if (Product.TYPES.includes(type)) {
      this.type = type;
    }
  }
}
