import { useState, useRef, useEffect } from 'react';
import { apiFetch } from '../../api';
import { parseCsvHeaders, parseExcelFile, getSheetHeaders, getSheetPreviewRows } from '../../catalogue/shared/csvUtils';
import { runListingGenerator, MYNTRA_SIZE_RANGES } from '../../catalogue/index';

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const SpinIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

export default function CategoryModal({ channel, category, products, sizeSettings, userDetails, onClose }) {
  const [templateFile, setTemplateFile]     = useState(null);
  const [templateHeaders, setTemplateHeaders] = useState(null);
  const [workbook, setWorkbook]             = useState(null);
  const [sheetNames, setSheetNames]         = useState([]);
  const [selectedSheet, setSelectedSheet]   = useState(null);
  const [previewRows, setPreviewRows]       = useState([]);
  const [selectedRow, setSelectedRow]       = useState(null);
  const [generating, setGenerating]         = useState(false);
  const [genError, setGenError]             = useState('');
  const [genSuccess, setGenSuccess]         = useState('');
  const [customMaps, setCustomMaps]         = useState({});
  const [loadingMaps, setLoadingMaps]       = useState(true);
  const templateRef = useRef();

  const getSizeMapping = () => {
    if (sizeSettings?.sizeRange === 'custom' && sizeSettings.customSizes?.length)
      return Object.fromEntries(sizeSettings.customSizes.map((s) => [s, s]));
    return MYNTRA_SIZE_RANGES[sizeSettings?.sizeRange] || MYNTRA_SIZE_RANGES['xxs-5xl'];
  };

  useEffect(() => {
    apiFetch(`/catalogue/mappings/${channel.id}`)
      .then((res) => setCustomMaps(res.data?.mappings || {}))
      .catch(() => setCustomMaps({}))
      .finally(() => setLoadingMaps(false));
  }, [channel.id]);

  const resetTemplate = () => {
    setTemplateFile(null); setTemplateHeaders(null);
    setWorkbook(null); setSheetNames([]); setSelectedSheet(null);
    setPreviewRows([]); setSelectedRow(null);
  };

  const handleTemplateUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    resetTemplate(); setGenError('');
    try {
      if (/\.(xlsx|xls|xlsm)$/i.test(file.name)) {
        const { sheetNames: sheets, workbook: wb } = await parseExcelFile(file);
        setTemplateFile(file); setWorkbook(wb); setSheetNames(sheets);
      } else {
        const headers = await parseCsvHeaders(file);
        setTemplateFile(file); setTemplateHeaders(headers);
      }
    } catch { setGenError('Could not parse template. Please check the file.'); }
    e.target.value = '';
  };

  const handleSheetSelect = (sheet) => {
    setSelectedSheet(sheet); setSelectedRow(null); setTemplateHeaders(null);
    if (workbook) setPreviewRows(getSheetPreviewRows(workbook, sheet, 8));
  };

  const handleRowSelect = (rowIdx) => {
    setSelectedRow(rowIdx);
    if (workbook && selectedSheet) {
      setTemplateHeaders(getSheetHeaders(workbook, selectedSheet, rowIdx));
      setGenError('');
    }
  };

  const handleGenerate = async () => {
    setGenerating(true); setGenError(''); setGenSuccess('');
    try {
      const sizeMapping = getSizeMapping();
      const count = runListingGenerator(
        channel.id, category, products, sizeMapping, templateHeaders || null, customMaps, userDetails
      );
      setGenSuccess(`Downloaded! ${count} rows · ${Object.keys(sizeMapping).length} sizes per product`);
    } catch (e) {
      setGenError(e.message || 'Failed to generate listing file.');
    } finally { setGenerating(false); }
  };

  const sizeMapping = getSizeMapping();
  const sizeLabels = Object.keys(sizeMapping);
  const ac = channel.accentColor;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full sm:max-w-lg flex flex-col overflow-hidden sm:rounded-2xl rounded-t-3xl shadow-2xl"
        style={{ maxHeight: '92vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-sm"
            style={{ background: `${ac}18`, color: ac }}>
            {channel.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: ac }}>{channel.name}</p>
            <h3 className="text-sm font-bold text-gray-900 truncate">{category}</h3>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition shrink-0">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Products</p>
              <p className="text-xl font-black text-emerald-700 mt-0.5">{products.length}</p>
              <p className="text-[10px] text-emerald-500">ready for export</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sizes</p>
              <p className="text-xl font-black text-gray-800 mt-0.5">{sizeLabels.length}</p>
              <p className="text-[10px] text-gray-400 truncate">{sizeLabels.slice(0, 5).join(' · ')}</p>
            </div>
          </div>

          {/* Custom mappings indicator */}
          {!loadingMaps && (
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs border ${
              Object.keys(customMaps).length > 0
                ? 'bg-blue-50 border-blue-100 text-blue-700'
                : 'bg-gray-50 border-gray-100 text-gray-400'
            }`}>
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {Object.keys(customMaps).length > 0
                ? <span><strong>Custom mappings active:</strong> {Object.keys(customMaps).join(', ')}</span>
                : <span>No custom mappings — add via Admin → Listing Settings</span>
              }
            </div>
          )}

          {/* Template upload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-800">Marketplace Template</p>
              <span className="text-[10px] text-gray-400 font-medium">optional · CSV or Excel</span>
            </div>

            {!templateFile ? (
              <button onClick={() => templateRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 px-4 py-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition group">
                <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500 group-hover:text-gray-700">Upload marketplace template</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Supports .csv, .xlsx, .xls files</p>
                </div>
              </button>
            ) : (
              <div className="space-y-3">
                {/* File pill */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                  style={{ borderColor: `${ac}30`, background: `${ac}08` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${ac}18` }}>
                    <svg className="w-4 h-4" style={{ color: ac }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{templateFile.name}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {sheetNames.length > 0
                        ? templateHeaders?.length ? `✓ ${templateHeaders.length} columns ready` : `${sheetNames.length} sheets — select sheet & row`
                        : templateHeaders?.length ? `✓ ${templateHeaders.length} columns detected` : 'Parsing...'}
                    </p>
                  </div>
                  <button onClick={resetTemplate} className="text-[10px] font-semibold text-red-400 hover:text-red-600 shrink-0 transition">Remove</button>
                </div>

                {/* Sheet picker */}
                {sheetNames.length > 0 && (
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-3 space-y-3">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">① Select Sheet</p>
                      <div className="flex flex-wrap gap-1.5">
                        {sheetNames.map((sheet) => (
                          <button key={sheet} onClick={() => handleSheetSelect(sheet)}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition"
                            style={selectedSheet === sheet
                              ? { background: ac, color: '#fff', borderColor: ac }
                              : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }}>
                            {sheet}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedSheet && previewRows.length > 0 && (
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">② Select Header Row</p>
                        <div className="space-y-1">
                          {previewRows.map((row, rowIdx) => {
                            const cells = row.filter(Boolean);
                            if (!cells.length) return null;
                            const active = selectedRow === rowIdx;
                            return (
                              <button key={rowIdx} onClick={() => handleRowSelect(rowIdx)}
                                className="w-full text-left px-3 py-2.5 rounded-xl border text-[11px] transition"
                                style={active
                                  ? { background: `${ac}10`, borderColor: ac, color: '#111' }
                                  : { background: '#fff', borderColor: '#e5e7eb', color: '#6b7280' }}>
                                <span className="font-bold mr-2" style={{ color: active ? ac : '#9ca3af' }}>Row {rowIdx + 1}</span>
                                <span className="truncate">{cells.slice(0, 5).join('  ·  ')}</span>
                                {cells.length > 5 && <span className="text-gray-400"> +{cells.length - 5} more</span>}
                              </button>
                            );
                          })}
                        </div>
                        {selectedRow !== null && templateHeaders?.length > 0 && (
                          <p className="text-[10px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {templateHeaders.length} columns from Row {selectedRow + 1}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <input ref={templateRef} type="file" accept=".csv,.xlsx,.xls,.xlsm" className="hidden" onChange={handleTemplateUpload} />
          </div>

          {/* Feedback */}
          {genError && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs text-red-600">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{genError}</span>
            </div>
          )}
          {genSuccess && (
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">{genSuccess}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60">
          <button
            onClick={handleGenerate}
            disabled={generating || products.length === 0}
            className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: ac, color: '#fff' }}>
            {generating ? <><SpinIcon /> Generating...</> : <><DownloadIcon /> Download Listing File</>}
          </button>
        </div>
      </div>
    </div>
  );
}
