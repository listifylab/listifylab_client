// Label + value row used in subscription details
export default function InfoRow({ label, children }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{children}</span>
    </div>
  );
}
