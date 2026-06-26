import { C } from '../../constants/home';

export default function HomeLogo({ light = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
        style={{ background: light ? C.card : C.dark }}
      >
        <span className="text-xs font-black" style={{ color: light ? C.dark : C.card }}>
          L
        </span>
      </div>
      <span className="font-heading text-sm font-bold" style={{ color: light ? C.card : C.dark }}>
        ListifyLab
      </span>
    </div>
  );
}
