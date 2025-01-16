"use strict";
const Models = require("../models");


const getDishes = (req, res) => {
    Models.Dish.findAll({})
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
}

const getDishQuery = (req, res) => {
  Models.Dish.findAll({where: { id: req.params.id}})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
}

const getDish = async (dishID) => {

  let ldish = null;

  await Models.Dish.findAll({where: { id: dishID}})
  .then((data) => {
    ldish = data;
  })

  return ldish;
}


const createDish = (req, res) => {
  Models.Dish.create(req.body)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
}


const updateDish = (req, res) => {
  Models.Dish.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
}


const deleteDish = (req, res) => {
  
    Models.Dish.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
}



module.exports = {
    getDishes,
    getDishQuery,
    getDish,
    createDish,
    updateDish,
    deleteDish
};