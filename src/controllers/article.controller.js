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
    const articles = await Article.find().sort({ createdAt: -1 })
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
