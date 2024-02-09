console.log('this is shopping cart');
// export { str };
const cartItem = [];
const shippingCost = 30;
// export { cartItem, shippingCost}

export const addToCart = function (product, quantity) {
  cartItem.push({ product, quantity });
  console.log(`${quantity} ${product} are added to cart.`);
};

const totalPrice = 400;
const totalQuantity = 20;

export { totalPrice, totalQuantity as qt };

export default function (product, quantity) {
  cartItem.push({ product, quantity });
  console.log(`${quantity} ${product} are added to cart.`);
}
