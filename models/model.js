const db = require("../db/index");

exports.fetchAllTreasures = (query) => {
  const { criteria, order } = query;
  if (!['age', 'cost_at_auction', 'treasure_name'].includes(criteria)) {
    return Promise.reject({ status: 400, msg: "not valid" });
  } else {
    return db.query(`
    SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name 
    FROM treasures 
    JOIN shops 
    ON treasures.shop_id = shops.shop_id
    ORDER BY ${criteria} ${order}`).then((results) => {
      return results.rows;
    });
  }
};
