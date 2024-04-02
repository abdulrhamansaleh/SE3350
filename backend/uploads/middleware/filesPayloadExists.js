const filesPayloadExists = (req,res,next)=>{
   
    if(!req.body.files) console.log("No Files Recieved")

    next()
}

module.exports = filesPayloadExists