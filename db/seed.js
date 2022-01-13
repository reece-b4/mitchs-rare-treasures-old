const db = require("./");
const format = require("pg-format");

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
        cost_at_auction FLOAT NOT NULL,
        shop_id INT, FOREIGN KEY (shop_id) REFERENCES shops (shop_id)
      )`);
    })
    .then(() => {
      const shopQuery = format(
        `INSERT INTO shops (shop_name, slogan) VALUES %L RETURNING *;`,
        shopData.map((shop) => [shop.shop_name, shop.slogan])
      );
      return db.query(shopQuery);
    })
    .then(() => {
      const treasureQuery = format(`INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop_id) VALUES %L RETURNING *;`, treasureData.map((treasure) => [treasure.treasure_name, treasure.colour, treasure.age, treasure.cost_at_auction, treasure.shop_id]));
      return db.query(treasureQuery);
    })
};

module.exports = seed;
