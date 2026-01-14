import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import articleRoutes from "./routes/article.routes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: "10mb" }))

app.use("/api/articles", articleRoutes)

export default app
