import { useState } from 'react';

/**
 * ChannelItem
 *
 * Props:
 *   channel            { id, name, accentColor, categories: string[] }
 *   products           fetched product array (controls disabled state)
 *   onSelectCategory(channel, categoryName)
 */
export default function ChannelItem({ channel, products, onSelectCategory }) {
  const [open, setOpen] = useState(false);
  const ac = channel.accentColor;

  return (
    <div className="rounded-xl overflow-hidden">
      {/* Channel header toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition text-left group"
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-black"
          style={{ background: `${ac}15`, color: ac }}
        >
          {channel.name[0]}
        </div>
        <span className="flex-1 text-base font-semibold text-gray-700 group-hover:text-gray-900 truncate">
          {channel.name}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-gray-300 transition-transform shrink-0 ${open ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {open && (
        <div className="pb-1">
          {channel.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(channel, cat)}
              disabled={products.length === 0}
              className="w-full text-left text-sm px-10 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 opacity-50" style={{ background: ac }} />
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
