const db = require("./");
const format = require("pg-format");
const { createShopsRef, formatTreasureRef } = require("../utils/utils");

const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS shops;`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE shops (
        shop_id SERIAL PRIMARY KEY,
        shop_name VARCHAR(255) NOT NULL,
        slogan TEXT
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE treasures (
        treasure_name VARCHAR NOT NULL,
        colour VARCHAR NOT NULL,
        age INT NOT NULL,
        cost_at_auction DECIMAL NOT NULL,
        shop_id INT REFERENCES shops (shop_id)
      );`);
    })
    .then(() => {
      const shopQuery = format(
        `INSERT INTO shops (shop_name, slogan) VALUES %L RETURNING *;`,
        shopData.map((shop) => [shop.shop_name, shop.slogan])
      );
      return db.query(shopQuery);
    })
    .then((result) => {
      const shopReference = createShopsRef(result.rows);
      const formatTreasureData = formatTreasureRef(treasureData, shopReference);

      return formatTreasureData;
    })
    .then((formatTreasureData) => {
      const treasureQuery = format(
        `INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop_id) VALUES %L RETURNING *;`,
        formatTreasureData
      );
      return db.query(treasureQuery);
    })
    .then((result) => {});
};
// 
module.exports = seed;
