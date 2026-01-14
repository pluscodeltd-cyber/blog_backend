import mongoose from "mongoose"

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Technology",
        "Business",
        "Sports",
        "Politics",
        "Spice",
        "Special Features",
        "Interview",
        "Columns",
        "Opinion",
        "Entertainment",
        "Health",
        "Sex & Relationship"
      ],
      required: true
    },
    status: {
      type: String,
      enum: ["Draft", "Scheduled", "Published"],
      default: "Draft"
    },
    author: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String
  },
  { timestamps: true }
)

export default mongoose.model("Article", articleSchema)
