import { useState } from 'react';
import { apiFetch } from '../../api';
import { SuccessAlert, ErrorAlert } from '../../components/ui/FeedbackAlert';

export default function CompanyDetailsTab({ user }) {
  const [form, setForm] = useState({
    manufacturerDetails: user?.manufacturerDetails || '',
    packerDetails:       user?.packerDetails       || '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState('');
  const [err, setErr]       = useState('');

  const handleSave = async () => {
    if (!form.manufacturerDetails.trim() || !form.packerDetails.trim()) {
      setErr('Both manufacturer and packer details are required.');
      return;
    }
    setSaving(true); setMsg(''); setErr('');
    try {
      await apiFetch('/auth/company-details', {
        method: 'PATCH',
        body: JSON.stringify(form),
      });
      setMsg('Company details updated. These will appear in all new listing files.');
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
            Manufacturer &amp; Packer Details
          </h3>
          <p className="text-xs text-gray-400">
            These details are printed in every marketplace listing file (Myntra, Nykaa, Ajio, Tata CLiQ, Shopify).
            Update them here whenever your details change.
          </p>
        </div>

        <SuccessAlert message={msg} />
        <ErrorAlert message={err} />

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Manufacturer Name &amp; Address with Pincode
            </label>
            <textarea rows={3} value={form.manufacturerDetails}
              onChange={(e) => setForm((f) => ({ ...f, manufacturerDetails: e.target.value }))}
              placeholder="e.g. Qurvii, B-149, Sector 6, Noida, UP 201301, India"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Packer Name &amp; Address with Pincode
            </label>
            <textarea rows={3} value={form.packerDetails}
              onChange={(e) => setForm((f) => ({ ...f, packerDetails: e.target.value }))}
              placeholder="Same as manufacturer, or a different packer address"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            />
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-40 flex items-center gap-2">
          {saving ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Saving...
            </>
          ) : 'Save Company Details'}
        </button>
      </div>
    </div>
  );
}
