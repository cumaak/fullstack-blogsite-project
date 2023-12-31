import express from 'express'
import * as pageController from '../controllers/pageController.js'
import * as authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/").get(authMiddleware.authenticateToken, pageController.getIndexPage)
router.route("/register").get(pageController.getRegisterPage)
router.route("/login").get(pageController.getLoginPage)
router.route("/logout").get(pageController.getLogout)
router.route("/new-blog").get(authMiddleware.authenticateToken, pageController.getNewBlogPage)

export default router;