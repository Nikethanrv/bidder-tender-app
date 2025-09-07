import { Routes, Route } from "react-router-dom";
import RecommendedTendersPage from "./pages/RecommendedTendersPage";
import GenerateBidProposalPage from "./pages/GenerateBidProposalPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-xl font-bold">Tender Recommendation System</h1>
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<RecommendedTendersPage />} />
          <Route path="/generate-proposal/:tenderId" element={<GenerateBidProposalPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
