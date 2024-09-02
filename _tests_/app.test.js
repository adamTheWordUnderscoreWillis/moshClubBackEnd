const request = require("supertest");
const db = require("../db/index.js");
const app = require("../app.js");
const data = require("../db/data/test-data/index.js");
const seed = require("../db/seed/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Postgres Testing", ()=>{
    describe("GetAlbums - get all the albums ranked by score", ()=>{
        test ("200 - Returns Okay Status code",()=>{
            return request(app).get("/api/albums").expect(200);
        })
    })
})