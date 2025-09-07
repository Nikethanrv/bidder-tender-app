import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './GenerateBidProposalPage.css';

const GenerateBidProposalPage = () => {
  const { tenderId } = useParams();
  const [bidder, setBidder] = useState(null);
  const [tender, setTender] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch bidder + tender info
  useEffect(() => {
    const fetchBidderAndTender = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/proposals/getBidder",
          {
            params: { bidderId: "user_12345", tenderId },
          }
        );
        setBidder(response.data.bidder);
        setTender(response.data.tender);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
        console.error("Error fetching bidder/tender:", err);
      }
    };

    fetchBidderAndTender();
  }, [tenderId]);

  // Generate proposal with Gemini
  const handleGenerate = async () => {
    try {
      setLoading(true);
      setProposal(null);

      const response = await axios.post(
        "http://localhost:5000/api/v1/proposals/generate",
        { 
          params: { bidderId: "user_12345", tenderId: tenderId } 
        },
        
      );

      setProposal(response.data.proposal);
    } catch (err) {
      setError(err.response?.data?.message || "Error generating proposal");
      console.error("Error generating proposal:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-proposal-container">
      <h1 className="text-2xl font-bold mb-6">
        Proposal Generator for Tender {tenderId}
      </h1>

      {error && (
        <div className="error-box">{error}</div>
      )}

      {/* Bidder Info */}
      {bidder && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Bidder Profile</h2>
          <p><strong>Name:</strong> {bidder.profile_data.full_name}</p>
          <p><strong>Company:</strong> {bidder.profile_data.company_name}</p>
          <p><strong>Industry:</strong> {bidder.profile_data.primary_industry}</p>
          <p><strong>Experience:</strong> {bidder.profile_data.experience_years} years</p>
        </div>
      )}

      {/* Tender Info */}
      {tender && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Tender Details</h2>
          <p><strong>Title:</strong> {tender.tenderDetails.title}</p>
          <p><strong>Authority:</strong> {tender.tenderDetails.issuingAuthority}</p>
          <p><strong>Value:</strong> {tender.tenderDetails.tenderValue} {tender.tenderDetails.currency}</p>
          <p><strong>Closing Date:</strong> {new Date(tender.tenderDetails.dates.closingDate).toLocaleDateString()}</p>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="generate-btn"
      >
        {loading ? "Generating..." : "Generate Proposal"}
      </button>

      {/* Proposal Output */}
      {proposal && (
        <div className="proposal-output">
          <h2 className="text-lg font-semibold mb-3">Generated Proposal</h2>
          <pre className="whitespace-pre-wrap text-gray-800">{proposal}</pre>
        </div>
      )}
    </div>
  );
};

export default GenerateBidProposalPage;
