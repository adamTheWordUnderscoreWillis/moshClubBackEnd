const request = require("supertest");
const db = require("../db/index.js");
const app = require("../app.js");
const data = require("../db/data/test-data/index.js");
const seed = require("../db/seed/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Spotify WebAPI Testing", ()=>{
    describe("GetAccessToken - Get an Access token for using the web API", ()=>{
        test ("200 - Returns Okay Status code",()=>{
            return request(app).get("/api/auth").expect(200);
        });
        test ("200 - get access token from Spotify Web API",()=>{
            const desiredToken = {
                access_token: expect.any(String),
                token_type: "Bearer",
                expires_in: 3600
            }

            return request(app).get("/api/auth")
            .expect(200)
            .then(({body})=>{
                expect(body).toEqual(desiredToken)
            })
        });
    })
})