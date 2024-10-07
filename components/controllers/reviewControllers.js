const { addNewReview, checkReviewIdExists, deleteReviewById, fetchAllReviewsByAlbumID } = require("../models/reviewModels")

exports.createReview = (req, res)=>{
    const {body} = req
    addNewReview(body)
    .then((body)=>{
        res.status(201).send({review: body})
    })
    
}

exports.removeReviewById = (req,res)=>{
    const {review_id}= req.params

    checkReviewIdExists(review_id).then(()=>{
        return deleteReviewById(review_id)
    })
    .then(()=>{
        res.status(204).send()
    })
}
exports.getReviewsByAlbum = (req, res)=>{
    const {spotify_id} = req.params
    fetchAllReviewsByAlbumID(spotify_id).then((body)=>{
        res.status(200).send(body)
    })
}