const { fetchAuthorisationToken } = require("../models/autorisationModels");

exports.getAuthorisationToken = (req,res, next)=>{
    fetchAuthorisationToken()
    .then((accessToken)=>{
        res.status(200).send(accessToken);
    })
    
}