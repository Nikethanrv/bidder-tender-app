const mongoose = require('mongoose')

const tenderSchema = new mongoose.Schema({
    tenderId: String,
    sourceUrl: String,
    scrapedTimestamp: Date,
    country: String,
    state: String,
    region: String,
    tenderDetails: {
        referenceNumber: String,
        title: String,
        issuingAuthority: String,
        procurementSummary: String,
        category: [String],
        tenderValue: Number,
        currency: String,
        dates: {
        publishedDate: Date,
        clarificationEndDate: Date,
        closingDate: Date,
        openingDate: Date
        }
    },
    eligibilityRequirements: [
        {
        type: { type: String },
        description: String
        }
    ],
    proposalFormat: [
        {
        section: String,
        questionId: String,
        questionText: String,
        responseType: String,
        isRequired: Boolean
        }
    ],
    unstructuredData: mongoose.Schema.Types.Mixed, 
    vectorEmbedding: [Number]
})

module.exports = mongoose.model("TenderProfile", tenderSchema, "tenderProfile")