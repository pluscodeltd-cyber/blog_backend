import Article from "../models/Article.js"
import cloudinary from "../config/cloudinary.js"

export const createArticle = async (req, res) => {
  try {
    const { title, category, status, author, content, image } = req.body

    if (!title || !category || !author || !content) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    let imageUrl = null

    // If image is provided (base64), upload to Cloudinary
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "blog_articles",
      })
      imageUrl = uploadedImage.secure_url
    }

    const article = await Article.create({
      title,
      category,
      status,
      author,
      content,
      imageUrl,
    })

    res.status(201).json(article)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
