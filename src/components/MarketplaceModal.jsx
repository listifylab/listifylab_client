import { useState } from "react";
import { generateShopifyListing } from "../cataloging/shopify/GenerateShopifyListingMap";

export function MarketplaceModal({ marketplace: mp, products, onClose }) {
  const [selected, setSelected] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (mp.singleFile ? false : !selected) return;
    setGenerating(true);
    setTimeout(() => {
      // const csv = generateShopifyCSV(products, selected);
      // const cat = selected ? `_${selected.replace(/\s+/g,'_').toLowerCase()}` : '_all';
      // downloadCSV(csv, `${mp.id}${cat}_${Date.now()}.csv`);
      console.log("data",products)
      generateShopifyListing(products)
      setGenerating(false);
    }, 300);
  };

  const canGenerate = mp.singleFile || !!selected;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-5 flex items-center gap-4"
          style={{ background: `linear-gradient(135deg, ${mp.accentColor}15, ${mp.accentColor}08)`, borderBottom: `1px solid ${mp.accentColor}25` }}
        >
          {/* Logo circle */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
            style={{ background: `${mp.accentColor}18`, border: `1.5px solid ${mp.accentColor}40` }}>
            <span className="text-xl font-black" style={{ color: mp.accentColor }}>{mp.name[0]}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-gray-900">{mp.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{mp.tagline}</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Product count badge */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-gray-600">
            {products.length} product{products.length !== 1 ? 's' : ''} ready for export
          </span>
          {mp.status !== 'ready' && (
            <span className="ml-auto text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              Mapping Coming Soon
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {mp.singleFile ? (
            /* Single-file platforms — no category needed */
            <div className="px-6 py-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${mp.accentColor}12`, border: `2px solid ${mp.accentColor}30` }}>
                <svg className="w-7 h-7" style={{ color: mp.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Single File Format</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                {mp.name} uses a unified listing file. All categories and product variants are exported together into one CSV.
              </p>
            </div>
          ) : (
            /* Multi-category platforms */
            <div className="px-6 py-4">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Select Category</p>
              <div className="grid grid-cols-2 gap-1.5">
                {mp.categories.map((cat) => (
                  <button key={cat} onClick={() => setSelected(cat)}
                    className="text-left px-3 py-2.5 rounded-xl text-xs font-medium transition border"
                    style={selected === cat
                      ? { background: `${mp.accentColor}15`, borderColor: mp.accentColor, color: mp.accentColor }
                      : { background: 'transparent', borderColor: '#e5e7eb', color: '#374151' }
                    }>
                    {selected === cat && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 mb-0.5 align-middle"
                        style={{ background: mp.accentColor }} />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer action */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || generating}
            className="w-full py-3 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2"
            style={canGenerate
              ? { background: mp.accentColor, color: '#fff' }
              : { background: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed' }
            }>
            {generating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Generating file...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                {mp.singleFile
                  ? `Download ${mp.name} CSV`
                  : selected ? `Download — ${selected}` : 'Select a category to continue'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}