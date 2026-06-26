// Reusable button with variant styles
const VARIANTS = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800',
  outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
  indigo:  'bg-indigo-600 text-white hover:bg-indigo-700',
  purple:  'bg-purple-600 text-white hover:bg-purple-700',
};

export default function Btn({ onClick, disabled, variant = 'primary', children, className = '', type = 'button' }) {
  const base = 'px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`}
    >
      {children}
    </button>
  );
}
