import { useNavigate } from "react-router-dom"

const TenderCard = ({ tender }) => {
  const navigate = useNavigate();

  const handleGenerateProposal = () => {
    // Navigate to the Generate Proposal page with tender ID
    navigate(`/generate-proposal/${tender.tenderId}`);
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold">{tender.tenderDetails?.title}</h2>
      <p className="text-sm text-gray-600">{tender.tenderDetails?.issuingAuthority}</p>
      <p className="text-sm">Budget: {tender.tenderDetails?.tenderValue} {tender.tenderDetails?.currency}</p>
      <p className="text-sm">Closing: {new Date(tender.tenderDetails?.dates?.closingDate).toLocaleDateString()}</p>
      <p className="text-xs text-gray-500">Match Score: {(tender.match_score * 100).toFixed(2)}%</p>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleGenerateProposal}
      >
        GENERATE BID PROPOSAL
      </button>
    </div>
  );
};

export default TenderCard;
