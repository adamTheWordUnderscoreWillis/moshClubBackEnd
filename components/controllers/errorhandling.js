exports.handleCustomErrors = (err,req,res,next)=>{
    if(err.status && err.msg){
       return res.status(err.status).send({ msg: err.msg })
    }
    else next(err);
}
exports.handle404Errors = (req, res) =>{
    res.status(404).send({msg: "Does not exist"})
}
exports.handleAxiosErrors = (err,req,res,next)=>{
    if(err.code === "ERR_BAD_REQUEST"){
        res.status(404).send({msg: err.message})
    }
    else next(err);
}
exports.handleServerErrors = (err,req,res, next)=>{
    console.log(err)
    return res.status(500).send({msg: "Internal Server Error"})
}