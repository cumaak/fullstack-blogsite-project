import express from "express";
import * as categoryController from '../controllers/categoryController.js'

const router = express.Router()

router.route("/:name").get(categoryController.getACategory)

export default router