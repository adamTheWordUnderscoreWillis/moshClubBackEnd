const { fetchAlbumByID, fetchAllAlbumsById } = require("../models/albumModels");

exports.getAlbumByID = (req,res)=>{
    const {spotify_id} = req.params;
    fetchAlbumByID(spotify_id)
    .then((responseBody)=>{
        res.status(200).send(responseBody);
    })
}

exports.getAllAlbumsById = (req,res)=>{
    
    fetchAllAlbumsById().then((albums)=>{
        res.status(200).send(albums);
    })
}