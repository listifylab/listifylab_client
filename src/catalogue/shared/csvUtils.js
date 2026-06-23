/**
 * Shared CSV utilities used by all marketplace listing generators.
 */
import * as XLSX from 'xlsx';

/**
 * Download an array of row objects as a CSV file.
 * @param {string} filename
 * @param {string[]} headers - ordered column headers
 * @param {Object[]} rows    - array of objects keyed by header
 */
export function downloadCsv(filename, headers, rows) {
  const escape = (val) => {
    const s = String(val ?? '');
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };

  const lines = [
    headers.map(escape).join(','),
    ...rows.map((row) => headers.map((h) => escape(row[h] ?? '')).join(',')),
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Parse an Excel file and return all sheet names + the workbook object.
 * Returns a Promise that resolves to { sheetNames: string[], workbook: object }.
 */
export function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'array' });
        resolve({ sheetNames: wb.SheetNames, workbook: wb });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Get first N rows from a sheet for preview (so user can pick the header row).
 * @param {object} workbook
 * @param {string} sheetName
 * @param {number} maxRows
 * @returns {string[][]} array of rows, each row is array of cell strings
 */
export function getSheetPreviewRows(workbook, sheetName, maxRows = 8) {
  const ws = workbook.Sheets[sheetName];
  if (!ws) return [];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  return rows
    .slice(0, maxRows)
    .map((r) => r.map((c) => String(c ?? '').trim()));
}

/**
 * Extract a specific row from a sheet as headers.
 * @param {object} workbook
 * @param {string} sheetName
 * @param {number} rowIndex - 0-based row index
 * @returns {string[]}
 */
export function getSheetHeaders(workbook, sheetName, rowIndex) {
  const ws = workbook.Sheets[sheetName];
  if (!ws) return [];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  const row = rows[rowIndex] || [];
  return row.map((h) => String(h ?? '').trim()).filter(Boolean);
}

/**
 * Parse only the header row from a CSV File object.
 * Returns a Promise that resolves to string[].
 */
export function parseCsvHeaders(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result || '';
      const firstLine = text.split(/\r?\n/)[0] || '';
      const headers = [];
      let cur = '';
      let inQuote = false;
      for (let i = 0; i < firstLine.length; i++) {
        const ch = firstLine[i];
        if (ch === '"') { inQuote = !inQuote; }
        else if (ch === ',' && !inQuote) { headers.push(cur.trim()); cur = ''; }
        else { cur += ch; }
      }
      headers.push(cur.trim());
      resolve(headers.filter(Boolean));
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/**
 * Parse a key→value mapping CSV file.
 * Expected format: source_value,mapped_value  (with or without header row)
 * Returns { [source]: mapped } object.
 */
export function parseMappingCsv(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result || '';
      const lines = text.split(/\r?\n/).filter(Boolean);
      const result = {};
      // Skip header row if first cell matches 'source' / 'from' / 'key'
      const startIdx = /^(source|from|key|original)/i.test(lines[0]?.split(',')[0]) ? 1 : 0;
      for (let i = startIdx; i < lines.length; i++) {
        const [src, ...rest] = lines[i].split(',');
        const target = rest.join(',').trim().replace(/^"|"$/g, '');
        if (src && target) result[src.trim().replace(/^"|"$/g, '')] = target;
      }
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
