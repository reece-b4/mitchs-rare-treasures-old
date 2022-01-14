const db = require("../db/index");
const app = require("../app");
const request = require("supertest");
const seed = require("../db/seed");
const testData = require("../db/data/test-data");
beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/treasures", () => {
  describe("GET", () => {
    test("status: 200: return all treasures", () => {
      return request(app)
        .get("/api/treasures")
        .expect(200)
        .then((result) => {
          expect(result.body.Treasures).toHaveLength(26);

          result.body.Treasures.forEach((treasure) => {
            expect(treasure).toEqual(
              expect.objectContaining({
                treasure_name: expect.any(String),
                colour: expect.any(String),
                age: expect.any(Number),
                cost_at_auction: expect.any(String),
                shop_id: expect.any(Number),
              })
            );
          });
        });
    });
  });
});
