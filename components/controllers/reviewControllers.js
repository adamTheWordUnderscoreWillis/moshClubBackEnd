const { addNewReview, checkReviewIdExists, deleteReviewById } = require("../models/reviewModels")

exports.createReview = (req, res)=>{
    const {body} = req
    addNewReview(body)
    .then((body)=>{
        res.status(201).send({review: body})
    })
    
}

exports.removeReviewById = (req,res)=>{
        res.status(204).send()
}
exports.getReviewsByAlbum = (req, res)=>{
        res.status(200).send({msg: "Okay"})
}