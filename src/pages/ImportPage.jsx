import { useState, useRef } from 'react';
import { apiFetch } from '../api';

const SAMPLE =
  'Style Number,Brand,Pattern Number,Style Type,Style Primary Color,Fabric Type,Style Name,MRP,Style Status';

const Stat = ({ label, value, color }) => (
  <div className={`rounded-xl p-4 flex flex-col gap-0.5 ${color}`}>
    <span className="text-2xl font-bold">{value}</span>
    <span className="text-xs font-semibold opacity-70 uppercase tracking-wider">{label}</span>
  </div>
);

export default function ImportPage({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [delimiter, setDelimiter] = useState(',');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const pick = (f) => {
    setFile(f);
    setResult(null);
    setError('');
  };
  const onFile = (e) => {
    if (e.target.files?.[0]) pick(e.target.files[0]);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) pick(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const csv = await file.text();
      const res = await apiFetch('/import', {
        method: 'POST',
        body: JSON.stringify({ csv, delimiter }),
      });
      setResult(res.data);
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Import failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Bulk CSV Import</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Upload styles in bulk. Re-importing the same Style Number updates the record.
        </p>
      </div>

      {/* Format card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Required Format
          </span>
        </div>
        <div className="space-y-2 text-sm text-slate-600">
          <p>
            • First row must be <strong>headers</strong>
          </p>
          <p>
            • Column named <strong>"Style Number"</strong> is required (used as unique ID)
          </p>
          <p>• New column headers are auto-registered as field definitions</p>
        </div>
        <div className="mt-4 bg-white border border-slate-200 rounded-xl px-4 py-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Example header row
          </p>
          <code className="text-xs text-slate-700 break-all leading-relaxed">{SAMPLE}</code>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Total Rows" value={result.total} color="bg-slate-100 text-slate-800" />
          <Stat label="New Styles" value={result.inserted} color="bg-emerald-50 text-emerald-800" />
          <Stat label="Updated" value={result.updated} color="bg-blue-50 text-blue-800" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          <svg
            className="w-4 h-4 mt-0.5 shrink-0"
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
          {error}
        </div>
      )}

      {/* Upload form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-5"
      >
        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
            dragging
              ? 'border-slate-800 bg-slate-50'
              : 'border-gray-200 hover:border-slate-400 hover:bg-gray-50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.txt"
            onChange={onFile}
            className="hidden"
          />
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <svg
                className="w-8 h-8 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          ) : (
            <>
              <svg
                className="mx-auto mb-3 w-10 h-10 text-gray-300"
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
              <p className="text-sm font-medium text-gray-500">
                Drop your CSV here or{' '}
                <span className="text-slate-800 font-semibold">click to browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">.csv or .txt files only</p>
            </>
          )}
        </div>

        {/* Delimiter */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-600 w-24 shrink-0">Delimiter</label>
          <div className="flex gap-2">
            {[',', ';', '\t'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDelimiter(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition ${
                  delimiter === d
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'border-gray-200 text-gray-600 hover:border-slate-400'
                }`}
              >
                {d === '\t' ? 'TAB' : `"${d}"`}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-2">
          <a
            href="./Catalouge_Sample.csv"
            className="w-full py-3 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1c60f1] disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-2"
          >
            Download Template
          </a>

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-40 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Importing...
              </>
            ) : (
              'Upload & Import'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
