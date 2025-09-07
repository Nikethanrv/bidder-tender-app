const BidderProfile = require("../models/bidder");
const TenderProfile = require("../models/tender");
const model = require("../utils/geminiClient");

const getBidder = async (req, res) => {
  try {
    const { bidderId, tenderId } = req.query;

    // 1. Fetch bidder dynamically
    const bidder = await BidderProfile.findOne({ auth_user_id: bidderId });
    if (!bidder) {
      return res.status(404).json({
        status: "error",
        message: "Bidder profile not found or is incomplete. Please complete your profile."
      });
    }

    // 2. Fetch tender dynamically
    const tender = await TenderProfile.findOne({ tenderId: tenderId });
    if (!tender) {
      return res.status(404).json({
        status: "error",
        message: "Tender not available."
      });
    }

    // 3. Return consistent response
    res.json({ bidder, tender });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const generateProposal = async (req, res) => {
  try {
    const { bidderId, tenderId } = req.query;

    const bidder = await BidderProfile.findOne({ auth_user_id: "user_12345" });
    if (!bidder) {
      return res.status(404).json({
        status: "error",
        message: "Bidder profile not found or is incomplete. Please complete your profile."
      });
    }

    // 2. Fetch tender dynamically
    const tender = await TenderProfile.findOne({ tenderId });
    if (!tender) {
      return res.status(404).json({
        status: "error",
        message: "Tender not available."
      });
    }

    const prompt = `
You are an AI assistant for generating professional bid proposals.
Here is the bidder profile:
${JSON.stringify(bidder, null, 2)}

Here is the tender details:
${JSON.stringify(tender, null, 2)}

Generate a formal bid proposal document that:
1. Highlights the bidder’s strengths and experience.
2. Shows compliance with eligibility requirements.
3. Covers technical approach, timelines, and methodology.
4. Is written in a clear, professional tone.
No extra text or acknowledgment is required upon completion of generating the proposal.
    `;

    const result = await model.generateContent(prompt);
    const proposalText = result.response.text();

    res.json({
      status: "success",
      proposal: proposalText,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getBidder, generateProposal };
