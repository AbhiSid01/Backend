const postModel = require('../models/post.model')
const Imagekit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")


const imageKit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})



async function createPostController(req,res){
        const file = await imageKit.files.upload({
            file: await toFile(Buffer.from(req.file.buffer),'file'),
            fileName:"Test"
        })

        res.send(file)
}


module.exports = {createPostController}