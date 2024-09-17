const { fetchAlbumByID } = require("../models/albumModels");

exports.getAlbumByID = (req,res)=>{
    const {spotify_id} = req.params;
    fetchAlbumByID(spotify_id)
    .then(({responseBody})=>{
        res.status(200).send(responseBody);
    })
}