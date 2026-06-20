
import { useState, useEffect } from 'react';
import { useCreateProduct } from '../hooks/useListings';
import { apiFetch } from '../api';

// Fields grouped by category for better UX
const GROUPS = [
  {
    label: 'Identity',
    icon: '🏷️',
    keys: ['brand', 'pattern_number', 'style_name', 'style_description'],
  },
  {
    label: 'Classification',
    icon: '📂',
    keys: ['style_type', 'fabric_type', 'occasion', 'main_trend', 'season', 'dress_type', 'shirt_type'],
  },
  {
    label: 'Color & Print',
    icon: '🎨',
    keys: ['style_primary_color', 'primary_color_shade', 'style_secondary_color', 'prints'],
  },
  {
    label: 'Construction',
    icon: '✂️',
    keys: ['fitting_type', 'neck_style', 'collar_type', 'sleeve_type', 'sleeve_length', 'hemline', 'closure', 'lining', 'transparency', 'wash_care'],
  },
  {
    label: 'Measurements (XS)',
    icon: '📐',
    keys: ['bust_chest', 'front_length', 'hips', 'waist', 'across_shoulder', 'sleeve_length_xs'],
  },
  {
    label: 'Pricing & Status',
    icon: '💰',
    keys: ['mrp', 'style_status', 'premium_style', 'checked', 'organic_sustainable'],
  },
];

const Input = ({ label, fkey, type = 'text', value, onChange }) => (
  <div>
    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(fkey, e.target.value)}
      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition bg-white"
    />
  </div>
);

const fmtKey = (k) => k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function CreateListingPage({ onSuccess }) {
  const { createProduct, loading, error } = useCreateProduct();
  const [styleNumber, setStyleNumber]   = useState('');
  const [fieldDefs, setFieldDefs]       = useState([]);
  const [values, setValues]             = useState({});
  const [formError, setFormError]       = useState('');
  const [success, setSuccess]           = useState(false);
  const [openGroups, setOpenGroups]     = useState({ Identity: true });

  useEffect(() => {
    apiFetch('/fields').then((r) => setFieldDefs(r.data || [])).catch(() => {});
  }, []);

  const set = (key, val) => setValues((v) => ({ ...v, [key]: val }));
  const toggleGroup = (label) => setOpenGroups((g) => ({ ...g, [label]: !g[label] }));

  // Map field defs by key for quick lookup
  const defMap = Object.fromEntries(fieldDefs.map((f) => [f.key, f]));

  // Categorise field defs into known groups + an "Other" bucket
  const knownKeys = GROUPS.flatMap((g) => g.keys);
  const otherDefs = fieldDefs.filter((f) => !knownKeys.includes(f.key));

  const allGroups = [
    ...GROUPS.map((g) => ({
      ...g,
      defs: g.keys.map((k) => defMap[k]).filter(Boolean),
    })),
    ...(otherDefs.length ? [{ label: 'Other Fields', icon: '🔖', defs: otherDefs }] : []),
  ].filter((g) => g.defs.length > 0);

  const submit = async (e) => {
    e.preventDefault(); setFormError(''); setSuccess(false);
    if (!styleNumber.trim()) { setFormError('Style Number is required.'); return; }
    try {
      const fields = {};
      Object.entries(values).forEach(([k, v]) => { if (v !== '' && v != null) fields[k] = v; });
      await createProduct({ styleNumber: styleNumber.trim(), fields });
      setSuccess(true);
      setStyleNumber(''); setValues({});
      setTimeout(() => { if (onSuccess) onSuccess(); }, 1200);
    } catch (err) {
      setFormError(err.message || 'Failed to create style');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Add New Style</h2>
          <p className="text-sm text-gray-400 mt-0.5">Fill in the details below. Style Number is required.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => onSuccess && onSuccess()}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition flex items-center gap-2">
            {loading && (
              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            )}
            {loading ? 'Saving...' : 'Save Style'}
          </button>
        </div>
      </div>

      {/* Feedback */}
      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Style created! Redirecting…
        </div>
      )}
      {(formError || error) && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          {formError || error}
        </div>
      )}

      {/* Style Number — always visible, prominent */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-6">
        <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">
          Style Number <span className="text-red-500 text-sm">*</span>
        </label>
        <input
          type="text"
          value={styleNumber}
          onChange={(e) => setStyleNumber(e.target.value)}
          placeholder="e.g. ST-24045"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base font-semibold text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
        />
        <p className="mt-2 text-xs text-gray-400">This is the unique ID for this style. Used to match records on re-import.</p>
      </div>

      {/* Field groups */}
      {fieldDefs.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <div className="text-2xl mb-2">💡</div>
          <p className="text-sm font-semibold text-amber-800 mb-1">No fields registered yet</p>
          <p className="text-sm text-amber-600">Upload a CSV to auto-register fields, or add them manually in the Admin panel.</p>
        </div>
      ) : (
        allGroups.map(({ label, icon, defs }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleGroup(label)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <span className="font-semibold text-gray-800 text-sm">{label}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{defs.length} fields</span>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${openGroups[label] ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openGroups[label] && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {defs.map((f) => (
                    <Input
                      key={f._id}
                      label={f.name}
                      fkey={f.key}
                      type={f.type === 'number' ? 'number' : 'text'}
                      value={values[f.key]}
                      onChange={set}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}

      {/* Bottom save */}
      {fieldDefs.length > 0 && (
        <div className="flex gap-3 pb-4">
          <button type="submit" disabled={loading}
            className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition">
            {loading ? 'Saving...' : 'Save Style'}
          </button>
          <button type="button" onClick={() => onSuccess && onSuccess()}
            className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
