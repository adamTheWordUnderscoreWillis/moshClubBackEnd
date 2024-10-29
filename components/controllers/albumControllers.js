const { fetchAlbumByID, fetchAllAlbumsById, fetchAlbumBySearch } = require("../models/albumModels");

exports.getAlbumByID = (req,res, next)=>{
    const {spotify_id} = req.params;
    const {access_token} = req.headers;
    
    fetchAlbumByID(spotify_id, access_token)
    .then((responseBody)=>{
        res.status(200).send(responseBody);
    })
    .catch((err)=> next(err))
}
exports.getAllAlbumsById = (req,res)=>{
    const {access_token} = req.headers;
    fetchAllAlbumsById(access_token).then((albums)=>{
        res.status(200).send(albums);
    })
}
exports.getAlbumbyNameAndArtist = (req,res)=>{
    const {artist, album} = req.query
    const {access_token} = req.headers;
    fetchAlbumBySearch(artist, album, access_token)
    .then((searchData)=>{
        res.status(200).send(searchData)
    })
}