const { fetchAllTreasures } = require("../models/model.js");

exports.getTreasures = (req, res, next) => {
  fetchAllTreasures()
    .then((Treasures) => {
      res.status(200).send({ Treasures });
    })
    .catch((err) => {
      next(err);
    });
};
