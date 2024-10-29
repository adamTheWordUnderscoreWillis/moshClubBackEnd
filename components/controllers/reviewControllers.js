const { fetchAlbumByID, checkAlbumIDExists } = require("../models/albumModels")
const { addNewReview, checkReviewIdExists, deleteReviewById, fetchAllReviewsByAlbumID } = require("../models/reviewModels")
const { getAlbumByID } = require("./albumControllers")

exports.createReview = (req, res, next)=>{
    const {body} = req
    addNewReview(body)
    .then((body)=>{
        res.status(201).send({review: body})
    })
    .catch((err)=> next(err))
    
}

exports.removeReviewById = (req,res, next)=>{
    const {review_id}= req.params

    checkReviewIdExists(review_id).then(()=>{
        return deleteReviewById(review_id)
    })
    .then(()=>{
        res.status(204).send()
    })
    .catch((err)=>{next(err)})
}
exports.getReviewsByAlbum = (req, res)=>{
    const {spotify_id} = req.params
    fetchAllReviewsByAlbumID(spotify_id).then((body)=>{
        res.status(200).send(body)
    })
}