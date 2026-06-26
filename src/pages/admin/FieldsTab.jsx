import Btn from '../../components/ui/Btn';
import { ErrorAlert } from '../../components/ui/FeedbackAlert';

export default function FieldsTab({ fields, fieldsLoading, addField, deleteField, newField, setNewField, busy, run, setErr }) {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Add Field</h3>
        <p className="text-xs text-gray-400 mb-5">
          Fields are also auto-registered when you import a CSV with new column headers.
        </p>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Display Name</label>
            <input type="text" value={newField.name} placeholder="e.g. Fabric Type"
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              className="w-36 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Key (slug)</label>
            <input type="text" value={newField.key} placeholder="fabric_type"
              onChange={(e) => setNewField({ ...newField, key: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
              className="w-36 border border-gray-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Type</label>
            <select value={newField.type} onChange={(e) => setNewField({ ...newField, type: e.target.value })}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800">
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="date">Date</option>
            </select>
          </div>
          <Btn disabled={busy === 'addField'}
            onClick={() => {
              if (!newField.name.trim() || !newField.key.trim()) { setErr('Name and Key are required'); return; }
              run('addField', () => addField(newField).then(() => setNewField({ name: '', key: '', type: 'string' })), 'Field added.');
            }}>
            {busy === 'addField' ? 'Adding...' : 'Add Field'}
          </Btn>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Registered Fields {!fieldsLoading && `(${fields.length})`}
          </h3>
        </div>
        {fieldsLoading ? (
          <div className="flex items-center justify-center p-10">
            <div className="animate-spin w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full" />
          </div>
        ) : fields.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">
            No fields yet — upload a CSV or add one above.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-3">Display Name</th>
                <th className="px-6 py-3">Key</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fields.map((f) => (
                <tr key={f._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 font-medium text-gray-800">{f.name}</td>
                  <td className="px-6 py-3 font-mono text-xs text-gray-500">{f.key}</td>
                  <td className="px-6 py-3">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">{f.type}</span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => { if (confirm(`Delete "${f.name}"?`)) deleteField(f._id).catch((e) => setErr(e.message)); }}
                      className="text-xs text-red-400 hover:text-red-600 font-medium transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
