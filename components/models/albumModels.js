const axios = require("axios")
const fs = require("fs/promises")

exports.fetchAlbumByID = (spotify_id)=>{
    return fs.readFile("./db/data/test-data/access_token.txt", "utf-8")
    .then((accessToken)=>{
        const spotifyUrl = axios.create({
            baseURL: "https://api.spotify.com",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
        return spotifyUrl.get(`/v1/albums/${spotify_id}`)
    })
    .then(({data})=>{
        const responseBody = {}
        const arrayOfGeneralKeys = ["total_tracks", "external_urls", "href", "id", "images", "name", "release_date", "artists"]
        const arrayOfTrackKeys = ["id", "name", "preview_url", "track_number"]
        arrayOfGeneralKeys.map((item)=>{
            responseBody[item] = data[item]
        })

        responseBody.tracks = {}
        responseBody.tracks.total = data.tracks.total;
        responseBody.tracks.items = [];
        for(let i = 0; i< responseBody.tracks.total; i++){
            responseBody.tracks.items.push({})
            arrayOfTrackKeys.map((key)=>{
                responseBody.tracks.items[i][key] = data.tracks.items[i][key]
            })
        }
        return {responseBody}
    })
    .catch((err)=>{
        console.log(err)
    })
}