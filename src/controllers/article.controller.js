import Article from "../models/Article.js"
import cloudinary from "../config/cloudinary.js"

// CREATE
export const createArticle = async (req, res) => {
  try {
    const { title, category, status, author, content } = req.body
    let imageUrl = ""

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path)
      imageUrl = result.secure_url
    }

    const article = await Article.create({ title, category, status, author, content, imageUrl })
    res.status(201).json(article)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to create article" })
  }
}

// GET ALL
export const getAllArticles = async (req, res) => {
  try {
    const { category } = req.query // get category from query params
    let filter = {}

    if (category) {
      filter.category = category // filter by category if provided
    }

    const articles = await Article.find(filter).sort({ createdAt: -1 })
    res.json(articles)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch articles" })
  }
}


// GET ONE
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ message: "Article not found" })
    res.json(article)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch article" })
  }
}

// UPDATE
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!article) return res.status(404).json({ message: "Article not found" })
    res.json(article)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to update article" })
  }
}

// DELETE
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) return res.status(404).json({ message: "Article not found" })
    res.json({ message: "Article deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to delete article" })
  }
}

// GET TOTAL VIEWS
export const getTotalViews = async (req, res) => {
  try {
    const articles = await Article.find();
    const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);

    res.json({ totalViews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch total views" });
  }
};


// GET published articles count
export const getPublishedArticlesCount = async (req, res) => {
  try {
    const count = await Article.countDocuments({ status: "Published" })
    res.json({ publishedCount: count })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch published articles count" })
  }
}

// GET engagement rate (example: total views / total articles)
export const getEngagementRate = async (req, res) => {
  try {
    const totalViewsResult = await Article.aggregate([{ $group: { _id: null, totalViews: { $sum: "$views" } } }])
    const totalArticles = await Article.countDocuments({ status: "Published" })
    const totalViews = totalViewsResult[0]?.totalViews || 0
    const engagementRate = totalArticles ? (totalViews / totalArticles / 1000).toFixed(1) : 0
    res.json({ engagementRate: parseFloat(engagementRate) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch engagement rate" })
  }
}

