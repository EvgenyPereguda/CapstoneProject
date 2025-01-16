const express = require("express");
const app = express();
require("dotenv").config();

let dbConnect = require("./dbConnect");



app.use(express.json());

app.use('/', express.static('public'))

let dishRoutes      = require('./routes/dishRoutes');
let placeRoutes     = require('./routes/placeRoutes');
let orderRoutes    = require('./routes/orderRoutes');

app.use('/api/dishes'   , dishRoutes);
app.use('/api/tables'   , placeRoutes);
app.use('/api/orders'  , orderRoutes);


module.exports = app;