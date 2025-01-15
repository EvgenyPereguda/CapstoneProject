"use strict";
const Dish = require("./dish")
const Place = require("./place")
const Order = require("./order")
const Order_Dish = require("./order_dishes")


async function init() {
  await Dish.sync();
  await Place.sync();
  await Order.sync();
  await Order_Dish.sync();
  // also sync any extra models here
 
}

init();

Order.belongsTo(Place);
Order_Dish.belongsTo(Dish);


// Dish.belongsToMany(Order, {through: Order_Dish});
// Order.belongsToMany(Dish, {through: Order_Dish});

// Dish.belongsToMany(Order, {
//   through: "order_dish",
//   as: "orders",
//   foreignKey: "dishId"
// });

// Order.belongsToMany(Dish, {
//   through: "order_dish",
//   as: "dishes",
//   foreignKey: "orderId"
// });


module.exports = {
  Dish,
  Place,
  Order,
  Order_Dish
  // also export any extra models here
};
