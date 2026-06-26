import { useState, useRef, useEffect } from 'react';
import { apiFetch } from '../api';
import { CHANNELS } from '../utils/marketplaces';
import ChannelItem from './cataloging/ChannelItem';
import CategoryModal from './cataloging/CategoryModal';

const SpinIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

export default function CatalogingPage({ user }) {
  const [rawInput, setRawInput]       = useState('');
  const [fetching, setFetching]       = useState(false);
  const [fetched, setFetched]         = useState(false);
  const [found, setFound]             = useState([]);
  const [notFound, setNotFound]       = useState([]);
  const [fetchErr, setFetchErr]       = useState('');
  const [activeModal, setActiveModal] = useState(null); // { channel, category }
  const [sizeSettings, setSizeSettings] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    apiFetch('/catalogue/settings')
      .then((res) => setSizeSettings(res.data))
      .catch(() => setSizeSettings({ sizeRange: 'xxs-5xl', customSizes: [] }));
  }, []);

  const parseStyleNumbers = (text) =>
    text
      .split(/[\n,;\t]+/)
      .map((s) => s.trim())
      .filter((l) => l && !/style.?num|style.?no|style.?id|sku/i.test(l));

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setRawInput(ev.target.result);
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleFetch = async () => {
    const styleNumbers = parseStyleNumbers(rawInput);
    if (!styleNumbers.length) {
      setFetchErr('No style numbers found.');
      return;
    }
    setFetching(true);
    setFetchErr('');
    try {
      const res = await apiFetch('/products/bulk-fetch', {
        method: 'POST',
        body: JSON.stringify({ styleNumbers }),
      });
      setFound(res.data.found || []);
      setNotFound(res.data.notFound || []);
      setFetched(true);
      if (!res.data.found?.length) setFetchErr('No matching products found.');
    } catch (e) {
      setFetchErr(e.message);
    } finally {
      setFetching(false);
    }
  };

  const handleReset = () => {
    setRawInput('');
    setFound([]);
    setNotFound([]);
    setFetchErr('');
    setFetched(false);
  };

  // ── Phase 1: Input ──────────────────────────────────────────────────────────
  if (!fetched) {
    return (
      <div
        className="min-h-[75vh] flex items-center justify-center px-4 py-12"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}
      >
        <div className="w-full max-w-lg">
          {/* Hero */}
          <div className="text-center mb-10">
            <div
              className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-5 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1e293b, #334155)' }}
            >
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Cataloging</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Enter style numbers to fetch products and generate marketplace listing files.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
            <div className="px-6 pt-6 pb-5 space-y-4">
              {/* Upload zone */}
              <div
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-slate-200 flex items-center justify-center shrink-0 transition">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-800">
                    Upload style numbers file
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    CSV or TXT, one style number per line
                  </p>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                  or type / paste
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Textarea */}
              <textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder={'ST001\nST002\nST003'}
                rows={6}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent placeholder-gray-300 bg-gray-50 focus:bg-white transition"
              />

              {fetchErr && (
                <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {fetchErr}
                </div>
              )}
            </div>

            {/* Card footer */}
            <div className="px-6 pb-6">
              <button
                onClick={handleFetch}
                disabled={!rawInput.trim() || fetching}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {fetching ? (
                  <>
                    <SpinIcon /> Fetching products...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Fetch Products
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-400 mt-4">
            Supports Myntra · Nykaa · Ajio · Tata CLiQ · Amazon · Flipkart · Shopify
          </p>
        </div>
      </div>
    );
  }

  // ── Phase 2: Results ────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Cataloging</h2>
            <p className="text-[11px] text-gray-400">
              <span className="text-emerald-600 font-semibold">{found.length} found</span>
              {notFound.length > 0 && (
                <span className="text-red-400"> · {notFound.length} not found</span>
              )}
              <span className="text-gray-400"> — select a channel and category to generate</span>
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          New Search
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-64 shrink-0 border-r border-gray-100 bg-white flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Channels
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {CHANNELS.map((ch) => (
              <ChannelItem
                key={ch.id}
                channel={ch}
                products={found}
                onSelectCategory={(channel, cat) =>
                  setActiveModal({ channel, category: cat })
                }
              />
            ))}
          </div>
          {found.length === 0 && (
            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-[10px] text-gray-400">Fetch products first to enable export</p>
            </div>
          )}
        </aside>

        {/* RIGHT: Records table */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <h3 className="text-sm font-bold text-gray-900">Fetched Records</h3>
            <div className="flex items-center gap-2">
              {found.length > 0 && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  {found.length} ready
                </span>
              )}
              {notFound.length > 0 && (
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                  {notFound.length} not found
                </span>
              )}
            </div>
          </div>

          {found.length === 0 && notFound.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p className="text-sm font-bold text-gray-400">No products found</p>
              <p className="text-xs text-gray-300 mt-1">
                Check that style numbers exist in your catalogue
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-black text-gray-400 uppercase tracking-widest">
                      Style No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">
                      MRP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-black text-gray-400 uppercase tracking-widest">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {found.map((p) => (
                    <tr
                      key={p._id}
                      className="border-b border-gray-50 hover:bg-gray-50/80 transition"
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 bg-emerald-100 rounded-md flex items-center justify-center shrink-0">
                            <svg
                              className="w-3 h-3 text-emerald-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="font-mono text-sm font-bold text-gray-800">
                            {p.styleNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-500 hidden md:table-cell">
                        {p.fields?.brand || p.fields?.vendor || '—'}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-500 hidden lg:table-cell">
                        {p.fields?.category || p.fields?.style_type || p.fields?.type || '—'}
                      </td>
                      <td className="px-6 py-3.5 text-sm font-semibold text-gray-700 hidden md:table-cell">
                        {p.fields?.mrp ? `₹${p.fields.mrp}` : '—'}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="inline-block text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                          {p.status || 'active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {notFound.map((s) => (
                    <tr key={s} className="border-b border-gray-50 bg-red-50/30">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 bg-red-100 rounded-md flex items-center justify-center shrink-0">
                            <svg
                              className="w-3 h-3 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                          <span className="font-mono text-sm font-bold text-gray-500">{s}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-red-400 hidden md:table-cell">
                        Not in catalogue
                      </td>
                      <td className="hidden lg:table-cell" />
                      <td className="hidden md:table-cell" />
                      <td className="px-6 py-3.5">
                        <span className="inline-block text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-500">
                          Not Found
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {activeModal && (
        <CategoryModal
          channel={activeModal.channel}
          category={activeModal.category}
          products={found}
          sizeSettings={sizeSettings}
          userDetails={{
            manufacturerDetails: user?.manufacturerDetails,
            packerDetails: user?.packerDetails,
            tenantName: user?.tenantName,
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
