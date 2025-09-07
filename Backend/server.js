require("dotenv").config();
console.log("Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅ present" : "❌ missing");

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const recommendationRoute = require("./routes/recommendationRoute.js")
const proposalRoute = require("./routes/proposalRoute.js")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/tender-recommendationDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

app.use("/api/v1/recommendations", recommendationRoute)
app.use("/api/v1/proposals", proposalRoute)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
