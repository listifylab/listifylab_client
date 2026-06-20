import { useState, useRef } from 'react';
import { apiFetch } from '../api';

// ── Marketplace definitions ──────────────────────────────────────────────────
// singleFile: true  → all categories go into one file (no category selection needed)
// singleFile: false → user must pick a category first
const MARKETPLACES = [
  {
    id: 'shopify',
    name: 'Shopify',
    tagline: 'All-in-one commerce platform',
    accentColor: '#96BF48',
    bgGrad: 'from-[#f0fce8] to-[#e4f7d0]',
    border: '#96BF48',
    singleFile: true,
    status: 'ready',
    description: 'Single CSV · All categories',
  },
  {
    id: 'myntra',
    name: 'Myntra',
    tagline: 'India\'s leading fashion platform',
    accentColor: '#FF3F6C',
    bgGrad: 'from-[#fff0f4] to-[#ffe0e8]',
    border: '#FF3F6C',
    singleFile: false,
    status: 'soon',
    categories: [
      'Women Dresses','Women Tops','Women Kurtas','Women Skirts','Women Palazzos',
      'Women Sarees','Women Lehenga','Women Jackets & Coats','Men Shirts',
      'Men T-Shirts','Men Trousers','Men Kurtas','Men Jackets','Kids Clothing',
      'Sports & Active','Ethnic Wear','Winter Wear','Accessories',
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tagline: 'World\'s largest marketplace',
    accentColor: '#FF9900',
    bgGrad: 'from-[#fff8ee] to-[#ffefd4]',
    border: '#FF9900',
    singleFile: false,
    status: 'soon',
    categories: [
      'Women Clothing','Men Clothing','Girls Clothing','Boys Clothing','Sarees',
      'Kurtas & Kurtis','Lehenga Choli','Salwar Suits','Ethnic Sets',
      'Western Dresses','Tops & Tees','Jeans & Trousers','Jackets & Coats',
      'Activewear','Accessories',
    ],
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    tagline: 'India\'s e-commerce giant',
    accentColor: '#2874F0',
    bgGrad: 'from-[#eef4ff] to-[#dceaff]',
    border: '#2874F0',
    singleFile: false,
    status: 'soon',
    categories: [
      'Women Ethnic','Women Western','Men Ethnic','Men Western','Kids Wear',
      'Sarees','Kurtas','Lehengas','Dresses','Tops','T-Shirts','Shirts',
      'Trousers','Jackets','Sportswear',
    ],
  },
  {
    id: 'nykaa',
    name: 'Nykaa Fashion',
    tagline: 'Premium fashion & beauty',
    accentColor: '#FC2779',
    bgGrad: 'from-[#fff0f6] to-[#ffe0ee]',
    border: '#FC2779',
    singleFile: false,
    status: 'soon',
    categories: [
      'Dresses','Tops & Tunics','Kurtas','Skirts','Palazzos','Sarees',
      'Lehenga','Jackets','Coats','Jumpsuits','Co-ord Sets','Loungewear',
      'Activewear','Ethnic Sets',
    ],
  },
  {
    id: 'ajio',
    name: 'Ajio',
    tagline: 'Reliance fashion destination',
    accentColor: '#8B2FC9',
    bgGrad: 'from-[#f7f0ff] to-[#ecdeff]',
    border: '#8B2FC9',
    singleFile: false,
    status: 'soon',
    categories: [
      'Women Dresses','Women Tops','Women Kurtas','Women Ethnic','Women Western',
      'Men Shirts','Men T-Shirts','Men Ethnic','Men Casual','Kids Clothing',
      'Fusion Wear','Activewear','Winter Wear','Accessories',
    ],
  },
  {
    id: 'tatacliq',
    name: 'Tata CLiQ',
    tagline: 'Premium & luxury fashion',
    accentColor: '#DC143C',
    bgGrad: 'from-[#fff0f2] to-[#ffdde2]',
    border: '#DC143C',
    singleFile: true,
    status: 'soon',
    description: 'Single CSV · All categories',
  },
  {
    id: 'snapdeal',
    name: 'Snapdeal',
    tagline: 'Value fashion for everyone',
    accentColor: '#E40046',
    bgGrad: 'from-[#fff0f3] to-[#ffd6df]',
    border: '#E40046',
    singleFile: false,
    status: 'soon',
    categories: [
      'Women Ethnic','Women Western','Men Clothing','Kids Wear','Sarees',
      'Kurtas','Lehengas','Dresses','Tops','Shirts','T-Shirts','Trousers','Jackets',
    ],
  },
  {
    id: 'shoppersstop',
    name: "Shoppers Stop",
    tagline: 'Omnichannel retail leader',
    accentColor: '#1A1A2E',
    bgGrad: 'from-[#f2f2f7] to-[#e4e4ef]',
    border: '#1A1A2E',
    singleFile: true,
    status: 'soon',
    description: 'Single CSV · All categories',
  },
];

// ── Shopify CSV ───────────────────────────────────────────────────────────────
const SHOPIFY_HEADERS = [
  'Handle','Title','Body (HTML)','Vendor','Product Category','Type','Tags','Published',
  'Option1 Name','Option1 Value','Variant SKU','Variant Grams','Variant Inventory Tracker',
  'Variant Inventory Qty','Variant Inventory Policy','Variant Fulfillment Service',
  'Variant Price','Variant Compare At Price','Variant Requires Shipping','Variant Taxable',
  'Status',
];

function toHandle(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function buildShopifyRow(product, category = '') {
  const f = product.fields || {};
  const get = (...keys) => { for (const k of keys) { if (f[k]) return f[k]; } return ''; };
  const title   = get('style_name','product_name','name') || product.styleNumber;
  const vendor  = get('brand','vendor','brand_name');
  const price   = get('mrp','price','selling_price','retail_price') || '0';
  const cmpAt   = get('mrp','market_price') || '';
  const tags    = [get('fabric','fabric_type'), get('occasion'), get('fit'), get('color','colour'), get('pattern'), get('sleeve','sleeve_type')].filter(Boolean).join(', ');
  const body    = get('description','product_description','details') || '';
  const size    = get('size','sizes') || 'Free Size';
  const cat     = category || get('category','type','product_type') || '';
  return [
    toHandle(product.styleNumber), title, body, vendor, cat, cat, tags,
    'TRUE', 'Size', size, product.styleNumber, '0', 'shopify',
    get('stock','inventory','quantity') || '10', 'deny', 'manual',
    price, cmpAt, 'TRUE', 'TRUE', 'active',
  ];
}

function generateShopifyCSV(products, category = '') {
  const rows = [SHOPIFY_HEADERS, ...products.map((p) => buildShopifyRow(p, category))];
  return rows.map((row) =>
    row.map((cell) => {
      const s = String(cell ?? '');
      return (s.includes(',') || s.includes('"') || s.includes('\n'))
        ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(',')
  ).join('\n');
}

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── Marketplace Modal (centered) ──────────────────────────────────────────────
function MarketplaceModal({ marketplace: mp, products, onClose }) {
  const [selected, setSelected] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (mp.singleFile ? false : !selected) return;
    setGenerating(true);
    setTimeout(() => {
      const csv = generateShopifyCSV(products, selected);
      const cat = selected ? `_${selected.replace(/\s+/g,'_').toLowerCase()}` : '_all';
      downloadCSV(csv, `${mp.id}${cat}_${Date.now()}.csv`);
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

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CatalogingPage() {
  const [step, setStep]         = useState(1);
  const [rawInput, setRawInput] = useState('');
  const [fetching, setFetching] = useState(false);
  const [found, setFound]       = useState([]);
  const [notFound, setNotFound] = useState([]);
  const [fetchErr, setFetchErr] = useState('');
  const [activeMp, setActiveMp] = useState(null);
  const fileRef = useRef();

  const parseStyleNumbers = (text) => {
    const lines = text.split(/[\n,;\t]+/).map((s) => s.trim()).filter(Boolean);
    const isHeader = (s) => /style.?num|style.?no|style.?id|sku/i.test(s);
    return lines.filter((l) => !isHeader(l));
  };

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
    if (!styleNumbers.length) { setFetchErr('No style numbers found in input.'); return; }
    setFetching(true); setFetchErr(''); setFound([]); setNotFound([]);
    try {
      const res = await apiFetch('/products/bulk-fetch', {
        method: 'POST',
        body: JSON.stringify({ styleNumbers }),
      });
      setFound(res.data.found || []);
      setNotFound(res.data.notFound || []);
      if ((res.data.found || []).length > 0) setStep(2);
      else setFetchErr('No matching products found in your catalogue.');
    } catch (e) {
      setFetchErr(e.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Cataloging</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Upload style numbers, fetch product data, and generate marketplace listing files
          </p>
        </div>
        {step === 2 && (
          <button
            onClick={() => { setStep(1); setFound([]); setNotFound([]); setRawInput(''); }}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            New Upload
          </button>
        )}
      </div>

      {/* ── Step 1: Upload & Fetch ────────────────────────────────────────── */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left — Input panel */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Style Numbers</h3>
              <p className="text-xs text-gray-400 mt-1">
                Upload a CSV file or paste style numbers directly (supports comma, newline, or tab-separated)
              </p>
            </div>

            {/* Upload zone */}
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-slate-400 hover:bg-gray-50 transition group">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gray-100 group-hover:bg-slate-100 flex items-center justify-center transition">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Drop a CSV file here or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">Style number column is detected automatically</p>
              <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleFileUpload} />
            </div>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 border-t border-gray-100" />
              <span className="text-xs text-gray-400 font-medium">or paste manually</span>
              <div className="flex-1 border-t border-gray-100" />
            </div>

            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder={"ST001\nST002\nST003\n\nOr comma-separated:\nST001, ST002, ST003"}
              className="w-full h-36 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            />

            {fetchErr && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                {fetchErr}
              </div>
            )}

            <button onClick={handleFetch} disabled={!rawInput.trim() || fetching}
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-40 flex items-center justify-center gap-2">
              {fetching ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Fetching products...
                </>
              ) : (
                <>
                  Fetch Products
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Right — Results panel */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fetched Records</h3>
              {found.length > 0 && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  {found.length} found
                </span>
              )}
            </div>

            {found.length === 0 && notFound.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-400">No products fetched yet</p>
                <p className="text-xs text-gray-300 mt-1">Enter style numbers and click Fetch Products</p>
              </div>
            ) : (
              <div className="overflow-y-auto flex-1">
                {found.map((p) => (
                  <div key={p._id} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition">
                    <div className="w-8 h-8 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 font-mono">{p.styleNumber}</p>
                      <p className="text-xs text-gray-400 truncate">
                        {[p.fields?.brand, p.fields?.category, p.fields?.mrp ? `₹${p.fields.mrp}` : null].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}>{p.status || 'active'}</span>
                  </div>
                ))}
                {notFound.map((s) => (
                  <div key={s} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50">
                    <div className="w-8 h-8 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 font-mono">{s}</p>
                      <p className="text-xs text-red-400">Not found in catalogue</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Step 2: Marketplace Selection ────────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Summary bar */}
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3.5">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-sm font-bold text-emerald-800">
                {found.length} product{found.length !== 1 ? 's' : ''} fetched successfully
              </span>
              {notFound.length > 0 && (
                <span className="text-xs text-amber-600 ml-3">
                  {notFound.length} not found: {notFound.slice(0, 3).join(', ')}{notFound.length > 3 ? ` +${notFound.length - 3} more` : ''}
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-600 font-medium hidden sm:block">Select a marketplace below →</p>
          </div>

          {/* Marketplace grid */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Choose Marketplace</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {MARKETPLACES.map((mp) => (
                <button
                  key={mp.id}
                  onClick={() => setActiveMp(mp)}
                  className={`relative group rounded-2xl p-5 text-left border-2 transition hover:shadow-lg hover:-translate-y-0.5 bg-gradient-to-br ${mp.bgGrad}`}
                  style={{ borderColor: `${mp.accentColor}30` }}
                >
                  {/* Status badge */}
                  <span className={`absolute top-2.5 right-2.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    mp.status === 'ready'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-50 text-amber-600 border border-amber-200'
                  }`}>
                    {mp.status === 'ready' ? '✓ READY' : 'SOON'}
                  </span>

                  {/* Logo */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 shadow-sm transition group-hover:scale-105"
                    style={{ background: `${mp.accentColor}18`, border: `1.5px solid ${mp.accentColor}35` }}
                  >
                    <span className="text-xl font-black" style={{ color: mp.accentColor }}>
                      {mp.name[0]}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-gray-900 leading-tight">{mp.name}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{mp.tagline}</p>

                  {/* File type indicator */}
                  <div className="mt-3 flex items-center gap-1">
                    <svg className="w-3 h-3" style={{ color: mp.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d={mp.singleFile
                          ? "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          : "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        }/>
                    </svg>
                    <span className="text-[10px] font-semibold" style={{ color: mp.accentColor }}>
                      {mp.singleFile ? 'Single file' : `${mp.categories?.length} categories`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Products mini table */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected Products</h3>
              <span className="text-xs text-gray-400">{found.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Style No.</th>
                    <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Brand</th>
                    <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">MRP</th>
                    <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {found.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-3 font-mono text-xs font-bold text-gray-800">{p.styleNumber}</td>
                      <td className="px-5 py-3 text-gray-600 text-xs">{p.fields?.brand || p.fields?.vendor || '—'}</td>
                      <td className="px-5 py-3 text-gray-500 text-xs">{p.fields?.category || p.fields?.type || '—'}</td>
                      <td className="px-5 py-3 font-semibold text-xs text-gray-800">{p.fields?.mrp ? `₹${p.fields.mrp}` : '—'}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}>{p.status || 'active'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Centered marketplace modal */}
      {activeMp && (
        <MarketplaceModal
          marketplace={activeMp}
          products={found}
          onClose={() => setActiveMp(null)}
        />
      )}
    </div>
  );
}
