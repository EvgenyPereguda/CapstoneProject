"use strict";
const Models = require("../models");
// finds all users in DB, then sends array as response
// const getUsers = (res) => {
//   Models.User.findAll({})
//     .then((data) => {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

// const getUserQuery = (req, res) => {

//   if(Object.keys(req.query).length == 0)
//   {
//     Models.User.findAll({ where: { Id: req.params.id } })
//       .then((data) => res.send({ result: 200, data: data }))
//       .catch((err) => {
//         console.log(err);
//         res.send({ result: 500, error: err.message });
//       });
//   }
//   else
//   if (req.query.hasOwnProperty("posts")) {
//     // finds all posts for a given user and includes matching user details
//     Models.Post.findAll({ where: { userId: req.params.id } })
//       .then((data) => res.send({ result: 200, data: data }))
//       .catch((err) => {
//         console.log(err);
//         res.send({ result: 500, error: err.message });
//       });

//   } else if (req.query.hasOwnProperty("likes")) {
//     // finds all posts for a given user and includes matching user details
//     Models.Like.findAll({ where: { userId: req.params.id } })
//       .then((data) => res.send({ result: 200, data: data }))
//       .catch((err) => {
//         console.log(err);
//         res.send({ result: 500, error: err.message });
//       });
//   } else {
//     res.send({ result: 400, error: `Unknown query: ${req.query}` });
//   }
// };

// uses JSON from request body to create new user in DB
// const createUser = (data, res) => {
//   Models.Customer.create(data)
//     .then((data) => {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// }; // uses JSON from request body to update user ID from params
// const updateUser = (req, res) => {
//   Models.User.update(req.body, {
//     where: { id: req.params.id },
//     returning: true,
//   })
//     .then((data) => {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };
// // deletes user matching ID from params
// const deleteUser = (req, res) => {
//   Models.User.destroy({ where: { id: req.params.id } })
//     .then((data) => {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

module.exports = {
    createUser,
//   getUsers,
//   getUserQuery,
//   updateUser,
//   deleteUser,
};