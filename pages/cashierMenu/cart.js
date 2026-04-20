export let cart = [];

export function addToCart(product, callbackUpdate) {
  const existingItem = cart.find(
    (item) => item.id === product.id && item.type === product.type,
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  callbackUpdate();
}

export function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function updateQuantity(index, action) {
  if (action === "plus") {
    cart[index].quantity++;
  } else {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
  }
}