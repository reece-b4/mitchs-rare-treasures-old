const { fetchAllTreasures } = require("../models/model.js");

exports.getTreasures = (req, res, next) => {
  const queries = {};
  queries.criteria = req.query.sort_by || 'age';
  queries.order = req.query.order || 'ASC';
  fetchAllTreasures(queries)
    .then((Treasures) => {
      res.status(200).send({ Treasures });
    })
    .catch((err) => {
      next(err);
    });
};

