"use strict";
const Customer = require("./customer"); //require the model
const Dish = require("./dish")
const Place = require("./place")
const Order = require("./order")


async function init() {
  await Customer.sync(); // sync the model
  await Dish.sync();
  await Place.sync();
  await Order.sync();
  // also sync any extra models here
 
}

init();


Order.belongsTo(Customer);
Order.belongsTo(Place);


module.exports = {
  Customer, // export the model
  Dish,
  Place,
  Order
  // also export any extra models here
};

