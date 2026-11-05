import React from 'react';
import { Eye, ShoppingBag } from 'lucide-react';

export default function ProductCard({ fragrance, onAddToCart, onViewDetails }) {
  return (
    <div className="group relative rounded-2xl bg-[#0c0d0f] border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-black">
      {/* Top Image Showcase */}
      <div className="relative aspect-[3/4] w-full bg-gradient-to-b from-white/[0.03] to-transparent p-3 sm:p-6 flex items-center justify-center overflow-hidden">
        {/* Subtle hover accent halo */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl rounded-full pointer-events-none"
          style={{ backgroundColor: fragrance.accentColor }}
        />

        <img
          src={fragrance.bottleImage}
          alt={fragrance.name}
          className="w-full h-full object-contain max-h-44 sm:max-h-64 transition-transform duration-700 ease-out group-hover:scale-108 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
          loading="lazy"
        />

        {/* Volume Pill */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[8px] sm:text-[9px] uppercase tracking-wider text-[#f6d87c]">
          50 ML
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3 sm:p-6 pt-1 sm:pt-2 flex flex-col flex-grow justify-between space-y-2.5 sm:space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-medium truncate">
              {fragrance.subheading.split('&')[0]}
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-medium text-white/90">
              {fragrance.price}
            </span>
          </div>

          <h3 className="text-xs sm:text-lg font-serif text-white tracking-wider group-hover:text-[#d4af37] transition-colors leading-snug min-h-[2rem] sm:min-h-[2.5rem] flex items-center">
            {fragrance.name}
          </h3>

          <p className="text-[10px] sm:text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed hidden sm:block">
            {fragrance.shortDesc}
          </p>
        </div>

        {/* Notes preview tags */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {fragrance.notes.slice(0, 2).map((n, i) => (
            <span
              key={i}
              className="text-[8px] sm:text-[9px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-neutral-300 truncate"
            >
              {n.value.split(' ')[0]}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => onViewDetails(fragrance)}
            className="w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-full border border-white/20 text-neutral-300 hover:text-white hover:border-white text-[9px] sm:text-[11px] uppercase tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Details</span>
          </button>

          <button
            onClick={() => onAddToCart(fragrance)}
            className="w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-full bg-white text-black hover:bg-[#d4af37] text-[9px] sm:text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
