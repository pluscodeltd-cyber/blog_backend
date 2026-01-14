// app.js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import articleRoutes from "./routes/article.routes.js"

dotenv.config()

const app = express()

app.use(cors())

// Only parse JSON for non-GET requests
app.use((req, res, next) => {
  if (req.method === "GET") return next() // skip JSON parsing for GET
  express.json({ limit: "10mb" })(req, res, next)
})

// Mount routes
app.use("/api/articles", articleRoutes)

export default app
