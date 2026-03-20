const express = require("express")
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })


//POST- /api/posts  [protected] means user with valid token can only access this

postRouter.post('/',upload.single("image"),postController.createPostController)

//Get /api/posts/  [protected]
postRouter.get('/',postController.getPostController)


/**
 * GET /api/posts/details/:postid
 * return an detail about specific post with the id,
 *  also check whether the post belongs to the user that is requestiong
 */
postRouter.get('/details/:postId',postController.getPostDetailsController)
 


module.exports = postRouter
