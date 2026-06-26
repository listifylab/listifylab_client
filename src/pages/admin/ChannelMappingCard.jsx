import { useState } from 'react';
import { apiFetch } from '../../api';

export default function ChannelMappingCard({ marketplace, mappingFields, onMsg, onErr }) {
  const [open, setOpen]               = useState(false);
  const [selField, setSelField]       = useState(mappingFields[0]?.id || 'color');
  const [mappingFile, setMappingFile] = useState(null);
  const [uploading, setUploading]     = useState(false);
  const [existingMaps, setExistingMaps] = useState({});
  const [loadingMaps, setLoadingMaps]   = useState(false);
  const [fileKey, setFileKey]         = useState(0);

  const loadMaps = () => {
    setLoadingMaps(true);
    apiFetch(`/catalogue/mappings/${marketplace.id}`)
      .then((res) => setExistingMaps(res.data?.mappings || {}))
      .catch(() => setExistingMaps({}))
      .finally(() => setLoadingMaps(false));
  };

  const handleToggle = () => {
    if (!open) loadMaps();
    setOpen((o) => !o);
  };

  const handleDownloadTemplate = () => {
    const csv = 'field_name,source_value,mapped_value\ncolor,Navy Blue,Blue\nfabric,French Crepe,Poly Silk\noccasion,Casual Festival,Festive Wear\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${marketplace.id}_mapping_template.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (!mappingFile) { onErr('Select a CSV file first.'); return; }
    setUploading(true); onMsg(''); onErr('');
    try {
      const text = await mappingFile.text();
      const lines = text.split(/\r?\n/).filter(Boolean);
      const firstCols = lines[0]?.split(',').map((c) => c.trim().toLowerCase());
      const isHeader = /^(field|source|from|key|original)/i.test(firstCols?.[0]);
      const startIdx = isHeader ? 1 : 0;
      const isThreeCol = firstCols?.length >= 3 && /^field/i.test(firstCols[0]);

      if (isThreeCol) {
        const byField = {};
        for (let i = startIdx; i < lines.length; i++) {
          const cols = lines[i].split(',');
          const fieldName = cols[0]?.trim().replace(/^"|"$/g, '');
          const src = cols[1]?.trim().replace(/^"|"$/g, '');
          const target = cols.slice(2).join(',').trim().replace(/^"|"$/g, '');
          if (fieldName && src && target) {
            if (!byField[fieldName]) byField[fieldName] = [];
            byField[fieldName].push({ source: src, target });
          }
        }
        if (!Object.keys(byField).length) throw new Error('No valid rows. Expected: field_name,source_value,mapped_value');
        let total = 0;
        for (const [fieldName, mappings] of Object.entries(byField)) {
          await apiFetch(`/catalogue/mappings/${marketplace.id}/${fieldName}`, {
            method: 'POST', body: JSON.stringify({ mappings }),
          });
          total += mappings.length;
        }
        onMsg(`✓ Saved ${total} mappings across ${Object.keys(byField).length} field(s) for ${marketplace.name}`);
      } else {
        const mappings = [];
        for (let i = startIdx; i < lines.length; i++) {
          const [src, ...rest] = lines[i].split(',');
          const target = rest.join(',').trim().replace(/^"|"$/g, '');
          if (src?.trim() && target) mappings.push({ source: src.trim().replace(/^"|"$/g, ''), target });
        }
        if (!mappings.length) throw new Error('No valid rows. Expected: source_value,mapped_value');
        await apiFetch(`/catalogue/mappings/${marketplace.id}/${selField}`, {
          method: 'POST', body: JSON.stringify({ mappings }),
        });
        onMsg(`✓ Saved ${mappings.length} ${selField} mappings for ${marketplace.name}`);
      }
      setMappingFile(null); setFileKey((k) => k + 1);
      loadMaps();
    } catch (e) { onErr(e.message); }
    finally { setUploading(false); }
  };

  const handleDelete = async (field) => {
    if (!confirm(`Clear all custom ${field} mappings for ${marketplace.name}?`)) return;
    try {
      await apiFetch(`/catalogue/mappings/${marketplace.id}/${field}`, { method: 'DELETE' });
      loadMaps();
      onMsg(`Cleared ${field} mappings for ${marketplace.name}`);
    } catch (e) { onErr(e.message); }
  };

  const activeMappingCount = Object.values(existingMaps).reduce((acc, m) => acc + Object.keys(m).length, 0);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button onClick={handleToggle}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-black"
          style={{ background: `${marketplace.accent}18`, color: marketplace.accent }}>
          {marketplace.name[0]}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{marketplace.name}</p>
          {activeMappingCount > 0 && (
            <p className="text-[11px] text-emerald-600">
              {activeMappingCount} custom mapping{activeMappingCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Field</label>
              <select value={selField} onChange={(e) => setSelField(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800">
                {mappingFields.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mapping CSV</label>
              {mappingFile ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs text-gray-700 flex-1 truncate">{mappingFile.name}</span>
                  <button onClick={() => { setMappingFile(null); setFileKey((k) => k + 1); }}
                    className="text-[11px] text-red-400 hover:text-red-600 font-medium shrink-0">Remove</button>
                </div>
              ) : (
                <label className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition">
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-xs text-gray-400">Choose CSV</span>
                  <input key={fileKey} type="file" accept=".csv" className="hidden"
                    onChange={(e) => { if (e.target.files[0]) setMappingFile(e.target.files[0]); }} />
                </label>
              )}
            </div>

            <div className="flex gap-2 shrink-0">
              <button onClick={handleDownloadTemplate}
                className="px-3 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 transition flex items-center gap-1.5"
                title="Download 3-column template (field_name, source_value, mapped_value)">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Template
              </button>
              <button onClick={handleUpload} disabled={uploading || !mappingFile}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition disabled:opacity-40 flex items-center gap-1.5">
                {uploading ? (
                  <>
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving...
                  </>
                ) : 'Upload & Save'}
              </button>
            </div>
          </div>

          {loadingMaps && <p className="text-xs text-gray-400">Loading...</p>}
          {!loadingMaps && Object.keys(existingMaps).length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Mappings</p>
              {Object.entries(existingMaps).map(([field, mapping]) => {
                const count = Object.keys(mapping).length;
                return (
                  <div key={field} className="flex items-center gap-3 px-3 py-2 rounded-xl border border-gray-100 bg-gray-50">
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-gray-700 capitalize">{field}</span>
                      <span className="ml-2 text-[10px] text-gray-400">{count} value{count !== 1 ? 's' : ''}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Active</span>
                    <button onClick={() => handleDelete(field)}
                      className="text-[11px] text-red-400 hover:text-red-600 font-medium">Clear</button>
                  </div>
                );
              })}
            </div>
          )}
          {!loadingMaps && Object.keys(existingMaps).length === 0 && (
            <p className="text-xs text-gray-400">No custom mappings yet for {marketplace.name}.</p>
          )}
        </div>
      )}
    </div>
  );
}
