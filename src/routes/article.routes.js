import express from "express"
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} from "../controllers/article.controller.js"

const router = express.Router()

// Create a new article
router.post("/", createArticle)

// Get all articles
router.get("/", getAllArticles)

// Get a single article by ID
router.get("/:id", getArticleById)

// Update an article by ID
router.put("/:id", updateArticle)

// Delete an article by ID
router.delete("/:id", deleteArticle)

export default router
