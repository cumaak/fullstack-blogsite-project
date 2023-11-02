import express from "express";
import * as blogController from '../controllers/blogController.js'
import * as authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/new-blog").post(blogController.createBlog)

router.route("/:id").get(authMiddleware.authenticateToken, blogController.getABlog)
router.route("/:id").delete(blogController.deleteBlog)
router.route("/:id/edit-blog").get(blogController.getEditBlog)
router.route("/:id/edit-blog").put(blogController.editBlog)
router.route("/:id/hideBlog").put(blogController.hideBlog)
router.route("/:id/unhideBlog").put(blogController.unhideBlog)
router.route("/:id/favBlog").put(blogController.favBlog)
router.route("/:id/unfavBlog").put(blogController.unfavBlog)
router.route("/:id/add-comment").put(blogController.addComment)

export default router