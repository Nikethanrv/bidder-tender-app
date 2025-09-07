const BidderProfile = require("../models/bidder")
const TenderProfile = require("../models/tender")

function cosineSimilarity(vecA, vecB) {
    const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))

    return dot / (magA * magB)
}

const getRecommendedTenders = async (req, res) => {
    try {
        const { bidderId, country, state, min_value, currency, page, limit } = req.query

        // Getting the bidder details
        const bidder = await BidderProfile.findOne({auth_user_id: bidderId})
        console.log(bidder)
        if (!bidder)
            return res.status(404).json({
                message: "Bidder profile not found or is incomplete. Please complete your profile to receive recommendations."
            })
        else {
        // Dynamic filter
        let query = {};
        if (country) query.country = country;
        if (state) query.state = state;
        if (currency) query["tenderDetails.currency"] = currency;
        if (min_value) query["tenderDetails.tenderValue"] = { $gte: Number(min_value) };
        
        // Getting all tenders
        const tenders = await TenderProfile.find(query);

        // Computing similarity scores
        const scoredTenders = tenders.map(tender => {
            const score = cosineSimilarity(bidder.profile_embedding, tender.vectorEmbedding)
            return { match_score: score, ...tender._doc }
        })

        // Sorting by similarity
        scoredTenders.sort((a, b) => b.match_score - a.match_score)

        // Pagination
        const pageNum = parseInt(page) || 1
        const limitNum = parseInt(limit) || 10
        const totalResults = scoredTenders.length;
        const totalPages = Math.ceil(totalResults / limitNum);

        const startIndex = (pageNum - 1) * limitNum
        const paginatedTenders = scoredTenders.slice(startIndex, startIndex + limitNum)

        // Send back response
        res.json({
            status: "success",
            results: paginatedTenders.length,
            pagination: {
                currentPage: pageNum, 
                totalPages,
                totalResults,
                limit: limitNum,
            },
            bidder: bidder,
            data: paginatedTenders
        })
    }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    getRecommendedTenders
}