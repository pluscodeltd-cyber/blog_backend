import express from "express"
import { createArticle } from "../controllers/article.controller.js"

const router = express.Router()

router.post("/", createArticle)

export default router
