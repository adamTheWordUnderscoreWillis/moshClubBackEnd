const axios = require("axios")
const fs = require("fs/promises")
const db = require("../../db/index")
const { sliceSpotifyIds, formatsHtmlQuery } = require("../../db/utils/spotifyIdUtils")

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
        return rows
    })

    const getToken =  fs.readFile("./db/data/test-data/access_token.txt", "utf-8")

    return Promise.all([getIdsFromDatabase,getToken])
    .then(([rows,accessToken])=>{

        
        const spotifyUrl = axios.create({
            baseURL: "https://api.spotify.com",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })

        const arrayOfIds = rows.map((album)=>{
            return album.spotify_id
        })
        const spotifyIds = sliceSpotifyIds(arrayOfIds)
        
        soptifyIdPromises = spotifyIds.map((IdString)=> spotifyUrl.get(`/v1/albums?ids=${IdString}`))
        return Promise.all([rows, ...soptifyIdPromises])
    })
    .then((ResolvedAlbumPromises) =>{
        const combinedAlbums = ResolvedAlbumPromises.slice(1).map((albumBatch)=> albumBatch.data.albums).flat()
        const spotifyAlbums = combinedAlbums.map((album)=>formatAlbumData(album))

        ResolvedAlbumPromises[0].map((databaseAlbum)=>{
            const albumIndex = spotifyAlbums.findIndex((spotifyAlbum)=> spotifyAlbum.id == databaseAlbum.spotify_id)
            const arrayOfDatabaseKeys = ["album_id", "user_id", "review_count"]
            const arrayOfScoringKeys = ["slap", "zest", "stick", "score"]

            spotifyAlbums[albumIndex].scoring = {}
            arrayOfDatabaseKeys.map((key)=> spotifyAlbums[albumIndex][key] = databaseAlbum[key])
            arrayOfScoringKeys.map((key)=> spotifyAlbums[albumIndex].scoring[key] = databaseAlbum[key])
        })
        return spotifyAlbums
        
    })
    .catch((err)=>{
        console.log({msg: err.message})
    })
}

exports.fetchAlbumBySearch = (artist, album)=>{
    return fs.readFile("./db/data/test-data/access_token.txt", "utf-8")
    .then((accessToken)=>{

        const spotifyUrl = axios.create({
            baseURL: "https://api.spotify.com",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
        
        const formattedArtist = formatsHtmlQuery(artist)
        const formattedAlbum = formatsHtmlQuery(album)
        
        return spotifyUrl.get(`/v1/search?q=${formattedAlbum}&artist=${formattedArtist}&type=album`)
    })
    .then(({data})=>{
        const items = data.albums.items

        return items.map((item)=>{
            return {
                id: item.id,
                name: item.name,
                artist: item.artists[0].name,
                image: item.images[0].url
            }
        })
        
        
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
