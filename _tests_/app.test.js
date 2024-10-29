const request = require("supertest");
const db = require("../db/index.js");
const app = require("../app.js");
const data = require("../db/data/test-data/index.js");
const seed = require("../db/seed/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Spotify WebAPI Testing", ()=>{
    describe("General Error Handling", ()=>{
        test ("404: Returns error when route is not found", ()=>{
            return request(app).get("/api/Not-a-valid-route")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Does not exist")
            })
        })
    })
    describe("Get Authorization Token - Get an Access token for using the web API", ()=>{
        test("200:  Returns Okay Status code",()=>{
            return request(app).get("/api/auth").expect(200);
        });
        test ("200: get access token from Spotify Web API",()=>{
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
        test("200: Returns Okay Status Code", ()=>{
            return request(app)
            .get("/api/auth")
            .then(({body})=>{
                const authorisation = {
                    access_token: body.access_token
                }
                return request(app)
                .get("/api/albums/5zuQQIzkoyry8lZrmW4744")
                .set(authorisation)
                .expect(200);
                
            })
        })
        test("200: Returns Album data", ()=>{
            const desiredAlbumData = {
                total_tracks: 9,
                external_urls: {
                    spotify: "https://open.spotify.com/album/5zuQQIzkoyry8lZrmW4744",
                    },
                href: "https://api.spotify.com/v1/albums/5zuQQIzkoyry8lZrmW4744",
                id: "5zuQQIzkoyry8lZrmW4744",
                images: [
                    {
                        url: "https://i.scdn.co/image/ab67616d0000b2734d74c4a3fcfd96e16b6d3a9f",
                        height: 640,
                        width: 640
                    },
                    {
                        url: "https://i.scdn.co/image/ab67616d00001e024d74c4a3fcfd96e16b6d3a9f",
                        height: 300,
                        width: 300
                    },
                    {
                        url: "https://i.scdn.co/image/ab67616d000048514d74c4a3fcfd96e16b6d3a9f",
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
                            preview_url: "https://p.scdn.co/mp3-preview/fab79ed422ae585808f90c0b3019022461ea517d?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 1
                        },
                        {
                            id: "5zHzofWXEpq1KiYIqTv7s2",
                            name: "Closer to God",
                            preview_url: "https://p.scdn.co/mp3-preview/02e4fe2457a5a888dd2e22a88eea96e688a6f709?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 2,
                        },
                        {
                            id: "1ZCDInnCGU2rRTfEhrJaSS",
                            name: "Wither",
                            preview_url: "https://p.scdn.co/mp3-preview/d263807771244d27b4731182b3e716b1ae9cb73f?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 3,
                        },
                        {
                            id: "2M7iasCe4t2UgOHVrVK6TM",
                            name: "Clowns",
                            preview_url: "https://p.scdn.co/mp3-preview/5abe4cff5bf458a53b6ea03fb565a35bc1f418f9?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 4,
                        },
                        {
                            id: "1iwbnSrCMXUGXY6a6mjTTL",
                            name: "King of the Slugs",
                            preview_url: "https://p.scdn.co/mp3-preview/173a0e0ea5374f0124f2d6746af1103a3119733c?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 5,
                        },
                        {
                            id: "1SC86EEp5h0feV89TI5ECv",
                            name: "All the Same",
                            preview_url: "https://p.scdn.co/mp3-preview/fbb98710984bfa220d3ec49f914df3a99b801f97?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 6,
                        },
                        {
                            id: "4flgLEXHoaXSQ2R8YZkSIe",
                            name: "I am the King",
                            preview_url: "https://p.scdn.co/mp3-preview/cab27998ffee66d84c9f965ed8f3540dd3dec202?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 7,
                        },
                        {
                            id: "0fe7AHSTWRryNOYCTci2LE",
                            name: "Running",
                            preview_url: "https://p.scdn.co/mp3-preview/8deff2b8a41ae3d21dab37619e30b1b551acccbb?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 8,
                        },
                        {
                            id: "103XkIUGvwnefUIqDv5XNM",
                            name: "And so it Came to Pass",
                            preview_url: "https://p.scdn.co/mp3-preview/ecd239eb10c53c91e33f6a288c3057625ff39b6d?cid=69d1e93f27984ad4bae3d0318e4459ca",
                            track_number: 9,
                        }
                    ]
                }
            }
            return request(app)
            .get("/api/auth")
            .then(({body})=>{
                const authorisation = {
                    access_token: body.access_token
                }
                return request(app)
                .get("/api/albums/5zuQQIzkoyry8lZrmW4744")
                .set(authorisation)
                .expect(200)
                .then(({body})=>{
                expect(body).toEqual(desiredAlbumData)
            })
            })
            
            
        })
        test.only("404: Album Id does not exist", ()=>{
            return request(app)
            .get("/api/auth")
            .then(({body})=>{
                const authorisation = {
                    access_token: body.access_token
                }
                return request(app)
                .get("/api/albums/DoesNotExist")
                .set(authorisation)
                .expect(404)
                .then(({body})=>{
                expect(body.msg).toEqual('Request failed with status code 400')
            })
            })
        })
    })
    describe("Get All Albums by ID",()=>{
        test("200 - Returns Okay Status Code", ()=>{
            return request(app)
            .get("/api/auth")
            .then(({body})=>{
                const authorisation = {
                    access_token: body.access_token
                }
                return request(app)
                .get("/api/albums")
                .set(authorisation)
                .expect(200);
                
            })
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
            return request(app)
            .get("/api/auth")
            .then(({body})=>{
                const authorisation = {
                    access_token: body.access_token
                }
                return request(app)
                .get("/api/albums")
                .set(authorisation)
                .then(({body})=>{
                
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
    })
    describe("Search for album by album and artist", ()=>{
        test("200 - Sends Okay response code", ()=>{
            return request(app)
            .get("/api/auth")
            .then(({body})=>{
                const authorisation = {
                    access_token: body.access_token
                }
                return request(app)
                .get("/api/search?artist=fat+dog&album=woof")
                .set(authorisation)
                .expect(200)
            })
            
        })
        test("200 - Returns albums in search to user", ()=>{
            const desiredAlbumData = {
                id: "5zuQQIzkoyry8lZrmW4744",
                image: "https://i.scdn.co/image/ab67616d0000b2734d74c4a3fcfd96e16b6d3a9f",
                name: "WOOF.",
                artist: "Fat Dog"
                }
                return request(app)
                .get("/api/auth")
                .then(({body})=>{
                    const authorisation = {
                        access_token: body.access_token
                    }
                    return request(app)
                    .get("/api/search?artist=fat+dog&album=woof")
                    .set(authorisation)
                    .expect(200)
                    .then(({body})=>{
                        expect(body[0]).toEqual(desiredAlbumData)
                    })
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
                return request(app)
                .get("/api/auth")
                .then(({body})=>{
                    const authorisation = {
                    access_token: body.access_token
                    }
                    const expectedAlbumScoringData = {
                        "overall_percent": 50,
                         "score": 30,
                         "slap": 10,
                        "slap_percent": 50,
                         "stick": 10,
                       "stick_percent": 50,
                         "zest": 10,
                        "zest_percent": 50,
                       }
                    return request(app)
                    .get("/api/albums")
                    .set(authorisation)
                    .then(({body})=>{
                        const targetAlbum = body.filter((album)=> album.id === reviewBody.spotify_id)[0]
                        expect(targetAlbum.scoring).toEqual(expectedAlbumScoringData)
                        expect(targetAlbum.review_count).toEqual(4)
                    })
                })    
            })
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
        test("Deletes correct Review", ()=>{
            const reviews = [
                {
                    user_id: 1,
                    review_id: 1,
                    created_at: expect.anything(),
                    spotify_id: "5Am1LFOFRwS94TaVzrFQwZ",
                    slap: 1, 
                    zest: 1, 
                    stick: 1,
                    favourite_song: "Emergency Contact",
                    ten_words: "It's great!"
                },
                {
                    user_id: 2,
                    review_id: 2,
                    created_at: expect.anything(),
                    spotify_id: "5Am1LFOFRwS94TaVzrFQwZ",
                    slap: 1, 
                    zest: 1, 
                    stick: 1,
                    favourite_song: "Emergency Contact",
                    ten_words: "Hated it!"
                },
            ]
            return request(app)
            .delete("/api/review/3")
            .expect(204)
            .then(()=>{
                return request(app)
                .get("/api/reviews/5Am1LFOFRwS94TaVzrFQwZ")
            })
            .then(({body})=>{
                expect(body).toEqual(reviews)
            })
        })
        test("Updates the album data to lower the score and review count", ()=>{
            const expectedAlbumScoringData = {
                "overall_percent": 20,
                 "score": 6,
                 "slap": 2,
                "slap_percent": 20,
                 "stick": 2,
               "stick_percent": 20,
                 "zest": 2,
                "zest_percent": 20,
         }
            return request(app)
            .delete("/api/review/3")
            .expect(204)
            .then(()=>{
                return request(app)
                .get("/api/auth")
            })
            .then(({body})=>{
                const authorisation = {
                    access_token: body.access_token
                }
                
                return request(app)
                .get("/api/albums")
                .set(authorisation)
            })
            .then(({body})=>{
                const targetAlbum = body.filter((album)=> album.id === "5Am1LFOFRwS94TaVzrFQwZ")[0]
                    
                    expect(targetAlbum.scoring).toEqual(expectedAlbumScoringData)
                    expect(targetAlbum.review_count).toEqual(2)
            })
        })
    })
})