const axios = require("axios")
const fs = require("fs/promises")
const db = require("../../db/index")
const { sliceSpotifyIds } = require("../../db/utils/spotifyIdUtils")

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
        return formatAlbumData(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
exports.fetchAllAlbumsById = ()=>{
    const queryStatement = `
    SELECT * FROM albums`

    const getIdsFromDatabase =  db.query(queryStatement)
    .then(({rows})=>{
        const arrayOfIds = rows.map((album)=>{
            return album.spotify_id
        })

        return sliceSpotifyIds(arrayOfIds)
    })

    const getToken =  fs.readFile("./db/data/test-data/access_token.txt", "utf-8")

    return Promise.all([getIdsFromDatabase,getToken])
    .then(([spotifyIds,accessToken])=>{
        const spotifyUrl = axios.create({
            baseURL: "https://api.spotify.com",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
        soptifyIdPromises = spotifyIds.map((IdString)=> spotifyUrl.get(`/v1/albums?ids=${IdString}`))
        return Promise.all(soptifyIdPromises)
    })
    .then((ResolvedAlbumPromises) =>{
        const combinedAlbums = ResolvedAlbumPromises.map((albumBatch)=> albumBatch.data.albums).flat()
        return combinedAlbums.map((album)=>formatAlbumData(album))
        
    })
    .catch((err)=>{
        console.log({msg: err.message})
    })
}

function formatAlbumData(data) {
    const album = {}
    const arrayOfGeneralKeys = ["total_tracks", "external_urls", "href", "id", "images", "name", "release_date", "artists"]
    const arrayOfTrackKeys = ["id", "name", "preview_url", "track_number"]
    arrayOfGeneralKeys.map((item) => {
        album[item] = data[item]
    })

    album.tracks = {}
    album.tracks.total = data.tracks.total
    album.tracks.items = []
    for (let i = 0; i < album.tracks.total; i++) {
        album.tracks.items.push({})
        arrayOfTrackKeys.map((key) => {
            album.tracks.items[i][key] = data.tracks.items[i][key]
        })
    }
    return album
}
