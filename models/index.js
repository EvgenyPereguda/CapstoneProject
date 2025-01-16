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

module.exports = {
  Dish,
  Place,
  Order,
  Order_Dish
  // also export any extra models here
};
