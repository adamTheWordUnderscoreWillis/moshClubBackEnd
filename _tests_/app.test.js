const request = require("supertest");
const db = require("../db/index.js");
const app = require("../app.js");
const data = require("../db/data/test-data/index.js");
const seed = require("../db/seed/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Spotify WebAPI Testing", ()=>{
    describe("Get Authorization Token - Get an Access token for using the web API", ()=>{
        test("200 - Returns Okay Status code",()=>{
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
    describe("Get Album by ID - Get an album by a specific ID code", ()=>{
        test("200 - Returns Okay Status Code", ()=>{
            return request(app).get("/api/albums/5zuQQIzkoyry8lZrmW4744")
            .expect(200);
        })
        test("200 - Returns Album data", ()=>{
            const desiredAlbumData = {
                total_tracks: 9,
                external_urls: {
                    spotify: "https://open.spotify.com/album/5zuQQIzkoyry8lZrmW4744",
                    },
                href: "https://api.spotify.com/v1/albums/5zuQQIzkoyry8lZrmW4744",
                id: "5zuQQIzkoyry8lZrmW4744",
                images: [
                    {
                        url: "https://i.scdn.co/image/ab67616d0000b273816feec57d019203c743a584",
                        height: 640,
                        width: 640
                    },
                    {
                        url: "https://i.scdn.co/image/ab67616d00001e02816feec57d019203c743a584",
                        height: 300,
                        width: 300
                    },
                    {
                        url: "https://i.scdn.co/image/ab67616d00004851816feec57d019203c743a584",
                        height: 64,
                        width: 64
                    }
                ],
                name: "WOOF.",
                release_date: "2024-09-06",
                artists: [
                    {
                        external_urls: {
                        spotify: "https://open.spotify.com/artist/4DLjEphXbW7qIhX4iwmNEe"
                        },
                    href: "https://api.spotify.com/v1/artists/4DLjEphXbW7qIhX4iwmNEe",
                    id: "4DLjEphXbW7qIhX4iwmNEe",
                    name: "Fat Dog",
                    type: "artist",
                    uri: "spotify:artist:4DLjEphXbW7qIhX4iwmNEe",
                    }
                ],
                tracks: {
                    total: 9,
                    items:[
                        {   
                            id: "739wZZ4Qqtm0pnzVHzeKxo",
                            name: "Vigilante",
                            preview_url: "https://p.scdn.co/mp3-preview/4ec31254395acde5f868cc417fcde1279221116f?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 1
                        },
                        {
                            id: "5zHzofWXEpq1KiYIqTv7s2",
                            name: "Closer to God",
                            preview_url: "https://p.scdn.co/mp3-preview/9769cf24195561da02806ddcf2ca0b83b0ea2cce?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 2,
                        },
                        {
                            id: "1ZCDInnCGU2rRTfEhrJaSS",
                            name: "Wither",
                            preview_url: "https://p.scdn.co/mp3-preview/2e267462c22b5bcb52bc486603225ca57ec7ef78?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 3,
                        },
                        {
                            id: "2M7iasCe4t2UgOHVrVK6TM",
                            name: "Clowns",
                            preview_url: "https://p.scdn.co/mp3-preview/d642c6f0e6e11befbbae651138ef5d27d7589cfc?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 4,
                        },
                        {
                            id: "1iwbnSrCMXUGXY6a6mjTTL",
                            name: "King of the Slugs",
                            preview_url: "https://p.scdn.co/mp3-preview/4d312ed404a953701560a153d9b95fdb5845c5b6?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 5,
                        },
                        {
                            id: "1SC86EEp5h0feV89TI5ECv",
                            name: "All the Same",
                            preview_url: "https://p.scdn.co/mp3-preview/f257b9811a9f508f7e46ed86fe2bc482e6472820?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 6,
                        },
                        {
                            id: "4flgLEXHoaXSQ2R8YZkSIe",
                            name: "I am the King",
                            preview_url: "https://p.scdn.co/mp3-preview/b34e61a680918daac7de7578b15fe207e21261c7?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 7,
                        },
                        {
                            id: "0fe7AHSTWRryNOYCTci2LE",
                            name: "Running",
                            preview_url: "https://p.scdn.co/mp3-preview/293abf9a0a5cb11d25fc38dd28e5e101e402cce6?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 8,
                        },
                        {
                            id: "103XkIUGvwnefUIqDv5XNM",
                            name: "And So It Came To Pass",
                            preview_url: "https://p.scdn.co/mp3-preview/39bbd094b0ea68c7960b3f68858a38d2d8030e1b?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 9,
                        }
                    ]
                }
            }
            return request(app).get("/api/albums/5zuQQIzkoyry8lZrmW4744")
            .expect(200)
            .then(({body})=>{
                expect(body).toEqual(desiredAlbumData)
            })
        })
    })
    describe("Get All Albums by ID",()=>{
        test("200 - Returns Okay Status Code", ()=>{
            return request(app).get("/api/albums")
            .expect(200);
        })
        test("200 - Returns Data for mulitple albums", ()=>{
            const desiredAlbumData = {
                album_id: expect.any(Number),
                user_id: expect.any(Number),
                review_count: expect.any(Number),
                scoring: expect.anything(),
                total_tracks: expect.any(Number),
                external_urls: {
                    spotify: expect.any(String),
                    },
                href: expect.any(String),
                id: expect.any(String),
                images: expect.anything(),
                name: expect.any(String),
                release_date: expect.any(String),
                artists: expect.anything(),
                tracks: {
                    total: expect.any(Number),
                    items: expect.anything()
                }
            }
            return request(app).get("/api/albums").then(({body})=>{
                
                expect(body[0].name).toEqual("The Jaws Of Life")
                expect(body[1].name).toEqual("Black Widow")
                expect(body[2].name).toEqual("RETAS")
                expect(body[3].name).toEqual("Dark Adrenaline")

                for(let i = 0; i<body.length; i++){
                    expect(body).toEqual([
                        desiredAlbumData,
                        desiredAlbumData,
                        desiredAlbumData,
                        desiredAlbumData
                    ])
                }
            })
        })
    })
    describe("Search for album by album and artist", ()=>{
        test("200 - Sends Okay response code", ()=>{
            return request(app).get("/api/search?artist=fat+dog&album=woof")
            .expect(200)
        })
        test("200 - Returns albums in search to user", ()=>{
            const desiredAlbumData = {
                id: "5zuQQIzkoyry8lZrmW4744",
                image: "https://i.scdn.co/image/ab67616d0000b273816feec57d019203c743a584",
                name: "WOOF.",
                artist: "Fat Dog"
                }
            return request(app).get("/api/search?artist=fat+dog&album=woof")
            .expect(200)
            .then(({body})=>{
                expect(body[0]).toEqual(desiredAlbumData)
            })
        })
    })
    describe("Post Review", ()=>{
        const reviewBody = {
            user_id: 4,
            spotify_id: "5Am1LFOFRwS94TaVzrFQwZ",
            slap: 5, 
            zest: 5, 
            stick: 5,
            favourite_song: "Flawless Execution",
            ten_words: "The album was poorly recieved, but a devestating wakeup call."

        }
        const responseBody = {
            review_id: 4,
            user_id: 4,
            spotify_id: "5Am1LFOFRwS94TaVzrFQwZ",
            slap: 5, 
            zest: 5, 
            stick: 5,
            favourite_song: "Flawless Execution",
            ten_words: "The album was poorly recieved, but a devestating wakeup call.",
            created_at: expect.anything()

        }
        test("201 - Recieves Create Code", ()=>{
            return request(app)
            .post("/api/reviews")
            .send(reviewBody)
            .expect(201)
        })
        test("201 - Successfully posts review in the database", ()=>{
           
            return request(app)
            .post("/api/reviews")
            .send(reviewBody)
            .expect(201).then(({body})=>{
                expect(body.review).toEqual(responseBody)
            })
        })
        test("Patching a review updates the album", ()=>{
            return request(app)
            .post("/api/reviews")
            .send(reviewBody)
            .expect(201).then(()=>{
                return request(app).get("/api/albums")
                .then(({body})=>{
                    const targetAlbum = body.filter((album)=> album.id === reviewBody.spotify_id)[0]
                    expect(targetAlbum.scoring).toEqual({slap: 10, zest: 10, stick: 10, score: 30 })
                    expect(targetAlbum.review_count).toEqual(4)
                })
            })
        })
    })
    describe.only("getReviewsByAlbum", ()=>{
        test("Sends 200 status", ()=>{
            return request(app)
            .get("/api/reviews/5Am1LFOFRwS94TaVzrFQwZ").expect(200)
        })
    })
    describe("Delete review", ()=>{
        test("Sends 204 Status Code", ()=>{
            return request(app)
            .delete("/api/review/3")
            .expect(204)
            .then(({body})=>{
                expect(body).not.toContain(expect.anything())
            })

        })
    })
})