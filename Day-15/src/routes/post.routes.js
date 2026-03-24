const express = require("express")
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


//POST- /api/posts  [protecked] means user with valid token can only access this

postRouter.post('/',upload.single("image"),postController.createPostController)


module.exports = postRouter
