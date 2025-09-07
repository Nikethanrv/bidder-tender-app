import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
        { bidderId: "user_12345", tenderId },
        { headers: { "Content-Type": "application/json" } }
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Proposal Generator for Tender: {tenderId}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {/* Bidder Info */}
      {bidder && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">Bidder Profile</h2>
          <p><strong>Name:</strong> {bidder.profile_data.full_name}</p>
          <p><strong>Company:</strong> {bidder.profile_data.company_name}</p>
          <p><strong>Industry:</strong> {bidder.profile_data.primary_industry}</p>
          <p><strong>Experience:</strong> {bidder.profile_data.experience_years} years</p>
        </div>
      )}

      {/* Tender Info */}
      {tender && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
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
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Proposal"}
      </button>

      {/* Proposal Output */}
      {proposal && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold mb-3">Generated Proposal</h2>
          <pre className="whitespace-pre-wrap text-gray-800">{proposal}</pre>
        </div>
      )}
    </div>
  );
};

export default GenerateBidProposalPage;
