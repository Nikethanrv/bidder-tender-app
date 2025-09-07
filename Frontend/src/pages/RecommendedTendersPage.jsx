import { useEffect, useState } from "react";
import axios from "axios";
import TenderCard from "../components/TenderCard";
import TenderFilters from "../components/TenderFilters";
import Pagination from "../components/Pagination"; 

const RecommendedTendersPage = () => {
  const [tenders, setTenders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({ country: "", state: "", min_value: "" });

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/recommendations/tenders", {
          params: {
            bidderId: "user_12345", // later replace with logged-in bidder
            page,
            limit,
            ...filters,
          },
        });
        setTenders(response.data.data);
      } catch (error) {
        console.error("Error fetching tenders:", error);
      }
    };

    fetchTenders();
  }, [page, limit, filters]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recommended Tenders</h1>

      <TenderFilters onFilterChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tenders.map((tender) => (
          <TenderCard key={tender.tenderId} tender={tender} />
        ))}
      </div>
      
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default RecommendedTendersPage;
