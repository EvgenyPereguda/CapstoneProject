const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.placeController.getPlaces(res);
});

router.get("/:id", (req, res) => {
  Controllers.placeController.getPlaceQuery(req, res);
}
);

router.post("/create", (req, res) => {
  Controllers.placeController.createTable(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.placeController.updateTable(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.placeController.deleteTable(req, res);
});

module.exports = router;