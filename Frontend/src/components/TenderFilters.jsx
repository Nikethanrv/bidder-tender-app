import { useState } from "react";

const TenderFilters = ({ onFilterChange }) => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [minValue, setMinValue] = useState("");

  const applyFilters = () => {
    onFilterChange({ country, state, min_value: minValue });
  };

  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Min Value"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={applyFilters} className="bg-blue-600 text-white px-4 py-2 rounded">
        Apply
      </button>
    </div>
  );
};

export default TenderFilters;
