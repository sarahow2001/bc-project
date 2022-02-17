const db = require("../db/connection");
const testData = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("Endpoints", () => {
  describe("invalid path", () => {
    test("should return 404 path not found error message ", () => {
      return request(app)
        .get("/api/invalid path")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Path not found");
        });
    });
  });

  describe("#3 api/topics", () => {
    test("return an array of topic objects ", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).toBeInstanceOf(Array);
          expect(topics.length).toBe(3);
          expect(topics[0]).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
    });
  });
});
