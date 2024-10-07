const { addNewReview, checkReviewIdExists, deleteReviewById, fetchAllReviewsByAlbumID } = require("../models/reviewModels")

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
    const {spotify_id} = req.params
    fetchAllReviewsByAlbumID(spotify_id).then((body)=>{
        console.log(body)
        res.status(200).send(body)
    })
}