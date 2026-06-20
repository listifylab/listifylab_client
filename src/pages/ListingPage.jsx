import { useState } from 'react';
import { useListings } from '../hooks/useListings';
import ProductCard from '../components/ListingCard';
import SearchFilter from '../components/SearchFilter';

const ListingPage = ({ refreshKey }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { products, pagination, loading, error, refetch } = useListings(refreshKey, search, page);

  const handleSearch = (val) => { setSearch(val); setPage(1); };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
        <span>{error}</span>
        <button onClick={refetch} className="text-xs underline ml-4 text-red-500 hover:text-red-700">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Style Catalogue</h2>
          {pagination && (
            <p className="text-sm text-gray-400 mt-0.5">{pagination.total} style{pagination.total !== 1 ? 's' : ''}</p>
          )}
        </div>
        <SearchFilter onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg className="mx-auto mb-3 w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
          </svg>
          <p className="text-sm font-medium">No styles found</p>
          <p className="text-xs mt-1">Upload a CSV to get started</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-500">
            {pagination.page} / {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingPage;
