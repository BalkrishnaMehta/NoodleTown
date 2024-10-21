let orders = [];

export function placeOrder(orderDetails) {
  orders.push(orderDetails);
  console.log("Order placed:", orderDetails);
  console.log("All orders:", orders);
}
