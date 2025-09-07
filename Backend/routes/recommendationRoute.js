const express = require('express')
const { getRecommendedTenders } = require("../controllers/recommendationController")

const router = express.Router()

router.get("/tenders", getRecommendedTenders)

module.exports = router