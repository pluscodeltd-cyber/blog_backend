import express from "express"
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getTotalViews,
  getPublishedArticlesCount,
  getEngagementRate
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

router.get("/total-views", getTotalViews);

router.get("/published-count", getPublishedArticlesCount);

router.get("/engagement-rate", getEngagementRate)

export default router
