exports.getAlbumByID = (req,res)=>{
    const {spotify_id} = req.params;
    res.status(200).send({msg: "It works"});
}