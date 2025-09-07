const express = require('express')
const { getBidder, generateProposal } = require("../controllers/proposalController")

const router = express.Router()

router.get("/getBidder", getBidder)
router.post("/generate", generateProposal);

module.exports = router