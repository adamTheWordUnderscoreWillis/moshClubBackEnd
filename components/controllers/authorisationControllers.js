const { fetchAuthorisationToken } = require("../models/spotifyModels");

exports.getAuthorisationToken = (req,res, next)=>{
    fetchAuthorisationToken()
    .then((accessToken)=>{
        res.status(200).send(accessToken);
    })
    .catch((err)=>console.log(err))
}