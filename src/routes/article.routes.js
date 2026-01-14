import express from "express";
import multer from "multer";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getTotalViews,
  getPublishedArticlesCount,
  getEngagementRate
} from "../controllers/article.controller.js";

const router = express.Router();

// ---- Multer setup ----
const storage = multer.diskStorage({}); // temporarily stores file in default tmp folder
const upload = multer({ storage });

// Use 'upload.single("image")' for the createArticle route
router.post("/", upload.single("image"), createArticle);

// Other routes
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

router.get("/total-views", getTotalViews);
router.get("/published-count", getPublishedArticlesCount);
router.get("/engagement-rate", getEngagementRate);

export default router;
