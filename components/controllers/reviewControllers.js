const { addNewReview } = require("../models/reviewModels")

exports.createReview = (req, res)=>{
    const {body} = req
    addNewReview(body)
    .then((body)=>{
        res.status(201).send({review: body})
    })
    
}