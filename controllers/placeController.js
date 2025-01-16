"use strict";
const Models = require("../models");


const getPlaces = (res) => {
    Models.Place.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
}



const getPlaceQuery = (req, res) => {
 
  if (req.query.hasOwnProperty("orders")) {

      Models.Order.findAll({
            include: [{
              model: Models.Place,
              required: true
             }],
             where: { placeId: req.params.id } })
      .then((data) => res.send({ result: 200, data: data }))
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });

  }else {
    Models.Place.findAll({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
  }
};



const createTable = (data, res) => {

    Models.Place.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
}

const updateTable = (req, res) => {
  Models.Place.update(req.body, {
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
};

const deleteTable = (req, res) => {  
    Models.Place.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
}

module.exports = {
    getPlaces,
    getPlaceQuery,
    createTable,
    updateTable,
    deleteTable
};