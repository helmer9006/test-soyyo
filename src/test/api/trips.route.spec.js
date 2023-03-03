const request = require("supertest");
const app = require("../../../app");

describe("Test API-SOYYO entity", () => {
  //TEST ENDPOINT  getAllEntities
  describe("GET /api/entities/getAllEntities", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/api/entities/getAllEntities/").send();
    });

    // validate route is ok
    it("route ok", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    // validate array
    it("returned array", async () => {
      expect(response.body.response).toBeInstanceOf(Array);
    });
  });

  //TEST ENDPOINT FILTER
  describe("GET /api/entities/filter", () => {
    let response;
    const objectPost = {
      startId: 1,
      endId: 5,
    };
    beforeEach(async () => {
      response = await request(app)
        .post("/api/entities/filter/")
        .send(objectPost);
    });

    // validate route is ok
    it("route ok and format json", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    // validate array
    it("returned array, query ok and properties requerid", async () => {
      expect(response.body.content).toBeInstanceOf(Array);
      expect(response.body.content[0].entityId).toBeDefined();
      expect(response.body.content[0].expirationDate).toBeDefined();
      expect(response.body.content[0].expirationDate).toBeDefined();
      expect(response.body.content[0].expirationDate).toBeDefined();
    });
  });
});
