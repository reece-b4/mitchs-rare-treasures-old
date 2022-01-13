const db = require("../db/index");

exports.fetchAllTreasures = () => {
  return db.query("SELECT * FROM treasures").then((results) => {
    return results.rows;
  });
};
