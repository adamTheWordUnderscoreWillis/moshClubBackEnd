const { fetchAlbumByID, fetchAllAlbumsById, fetchAlbumBySearch } = require("../models/albumModels");

exports.getAlbumByID = (req,res)=>{
    const {spotify_id} = req.params;
    const {accessToken} = req.body;
    
    fetchAlbumByID(spotify_id, accessToken)
    .then((responseBody)=>{
        res.status(200).send(responseBody);
    })
}
exports.getAllAlbumsById = (req,res)=>{
    const {accessToken} = req.body;
    fetchAllAlbumsById(accessToken).then((albums)=>{
        res.status(200).send(albums);
    })
}
exports.getAlbumbyNameAndArtist = (req,res)=>{
    const {artist, album} = req.query
    const {accessToken} = req.body;
    fetchAlbumBySearch(artist, album, accessToken)
    .then((searchData)=>{
        res.status(200).send(searchData)
    })
}