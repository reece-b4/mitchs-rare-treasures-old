const { createShopsRef, formatTreasureRef } = require("../utils/utils");

describe("createShopsRef", () => {
  test("return an empty object when passed an empty array", () => {
    const shopRows = [];
    const Expected = {};
    expect(createShopsRef(shopRows)).toEqual(Expected);
  });

  test("return shops object when passed an array of shops", () => {
    const shopRows = [
      { shop_id: 1, shop_name: "shop-b", slogan: "slogan-b" },
      { shop_id: 2, shop_name: "shop-d", slogan: "slogan-d" },
      { shop_id: 3, shop_name: "shop-e", slogan: "slogan-e" },
      { shop_id: 4, shop_name: "shop-f", slogan: "slogan-f" },
      { shop_id: 5, shop_name: "shop-g", slogan: "slogan-g" },
      { shop_id: 6, shop_name: "shop-h", slogan: "slogan-h" },
      { shop_id: 7, shop_name: "shop-i", slogan: "slogan-i" },
      { shop_id: 8, shop_name: "shop-a", slogan: "slogan-a" },
      { shop_id: 9, shop_name: "shop-j", slogan: "slogan-j" },
      { shop_id: 10, shop_name: "shop-k", slogan: "slogan-k" },
      { shop_id: 11, shop_name: "shop-c", slogan: "slogan-c" },
    ];
    const Expected = {
      "shop-b": 1,
      "shop-d": 2,
      "shop-e": 3,
      "shop-f": 4,
      "shop-g": 5,
      "shop-h": 6,
      "shop-i": 7,
      "shop-a": 8,
      "shop-j": 9,
      "shop-k": 10,
      "shop-c": 11,
    };
    expect(createShopsRef(shopRows)).toEqual(Expected);
  });

  test("does not change original data", () => {
    const shopRows = [{ "shop-b": 1, "shop-d": 2 }];
    const unmutatedRows = [{ "shop-b": 1, "shop-d": 2 }];
    expect(shopRows).toEqual(unmutatedRows);
  });
});

describe("format TreasureData", () => {
  test("return an empty object when passed an empty array", () => {
    const treasureData = [];
    const shopRef = {};
    const Expected = [];
    expect(formatTreasureRef(treasureData, shopRef)).toEqual(Expected);
  });

  test("return treasure object with shop id attached", () => {
    const treasureData = [
      {
        treasure_name: "treasure-a",
        colour: "turquoise",
        age: 200,
        cost_at_auction: "20.00",
        shop: "shop-b",
      },
    ];

    const shopRef = { "shop-b": 1 };

    const Expected = [["treasure-a", "turquoise", 200, "20.00", 1]];

    expect(formatTreasureRef(treasureData, shopRef)).toEqual(Expected);
  });

  test("does not change original data", () => {
    const treasureData = [
      {
        treasure_name: "treasure-a",
        colour: "turquoise",
        age: 200,
        cost_at_auction: "20.00",
        shop: "shop-b",
      },
    ];

    const shopRef = { "shop-b": 1 };

    const unmutatedData = [
      {
        treasure_name: "treasure-a",
        colour: "turquoise",
        age: 200,
        cost_at_auction: "20.00",
        shop: "shop-b",
      },
    ];
    formatTreasureRef(treasureData, shopRef);
    expect(treasureData).toEqual(unmutatedData);
  });
});
