import { useState, useEffect } from 'react';
import { apiFetch } from '../../api';
import { SIZE_RANGE_OPTIONS, MARKETPLACE_OPTIONS, MAPPING_FIELDS } from '../../constants/admin';
import ChannelMappingCard from './ChannelMappingCard';
import { SuccessAlert, ErrorAlert } from '../../components/ui/FeedbackAlert';

export default function ListingSettingsTab() {
  const [sizeRange, setSizeRange]     = useState('xxs-5xl');
  const [customSizes, setCustomSizes] = useState('');
  const [saving, setSaving]           = useState(false);
  const [saveMsg, setSaveMsg]         = useState('');
  const [saveErr, setSaveErr]         = useState('');
  const [loading, setLoading]         = useState(true);
  const [mapMsg, setMapMsg]           = useState('');
  const [mapErr, setMapErr]           = useState('');

  useEffect(() => {
    apiFetch('/catalogue/settings')
      .then((res) => {
        setSizeRange(res.data.sizeRange || 'xxs-5xl');
        setCustomSizes((res.data.customSizes || []).join(', '));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true); setSaveMsg(''); setSaveErr('');
    try {
      const body = { sizeRange };
      if (sizeRange === 'custom') {
        const sizes = customSizes.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean);
        if (!sizes.length) { setSaveErr('Enter at least one size.'); setSaving(false); return; }
        body.customSizes = sizes;
      }
      await apiFetch('/catalogue/settings', { method: 'PUT', body: JSON.stringify(body) });
      setSaveMsg('Size settings saved.');
    } catch (e) { setSaveErr(e.message); }
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Size Range */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Size Range for SKU Generation</h3>
        <p className="text-xs text-gray-400 mb-4">
          Controls which sizes are generated per product in listing files. Each product x each size = one SKU row.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {SIZE_RANGE_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => setSizeRange(opt.value)}
              className="text-left p-3.5 rounded-xl border-2 transition"
              style={sizeRange === opt.value
                ? { borderColor: '#0f172a', background: '#f8fafc' }
                : { borderColor: '#e5e7eb' }}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${sizeRange === opt.value ? 'border-slate-800' : 'border-gray-300'}`}>
                  {sizeRange === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />}
                </div>
                <span className="text-sm font-bold text-gray-800">{opt.label}</span>
              </div>
              <p className="text-[11px] text-gray-400 pl-5">{opt.sizes}</p>
            </button>
          ))}
        </div>

        {sizeRange === 'custom' && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Custom Sizes (comma-separated)
            </label>
            <input type="text" value={customSizes} onChange={(e) => setCustomSizes(e.target.value)}
              placeholder="e.g. XS, S, M, L, XL, XXL"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </div>
        )}

        <SuccessAlert message={saveMsg} className="mb-3" />
        <ErrorAlert message={saveErr} className="mb-3" />

        <button onClick={handleSaveSettings} disabled={saving}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-40 flex items-center gap-2">
          {saving ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Saving...
            </>
          ) : 'Save Size Settings'}
        </button>
      </div>

      {/* Per-Channel Custom Value Mappings */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Custom Value Mappings</h3>
        <p className="text-xs text-gray-400 mb-4">
          Upload a CSV for each channel field. Use 2 columns{' '}
          <code className="bg-gray-100 px-1 rounded text-[11px]">source_value,mapped_value</code> for a specific field,
          or 3 columns{' '}
          <code className="bg-gray-100 px-1 rounded text-[11px]">field_name,source_value,mapped_value</code> to map
          multiple/custom fields at once. Download the template below to get started.
        </p>

        <SuccessAlert message={mapMsg} className="mb-4" />
        <ErrorAlert message={mapErr} className="mb-4" />

        <div className="space-y-2">
          {MARKETPLACE_OPTIONS.map((mkt) => (
            <ChannelMappingCard
              key={mkt.id}
              marketplace={mkt}
              mappingFields={MAPPING_FIELDS}
              onMsg={setMapMsg}
              onErr={setMapErr}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
