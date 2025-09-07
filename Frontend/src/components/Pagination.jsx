const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center mt-6 gap-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 border rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
