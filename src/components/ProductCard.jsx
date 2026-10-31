import React from 'react';
import { Eye, ShoppingBag } from 'lucide-react';

export default function ProductCard({ fragrance, onAddToCart, onViewDetails }) {
  return (
    <div className="group relative rounded-2xl bg-[#0c0d0f] border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-black">
      {/* Top Image Showcase */}
      <div className="relative aspect-[3/4] w-full bg-gradient-to-b from-white/[0.03] to-transparent p-6 flex items-center justify-center overflow-hidden">
        {/* Subtle hover accent halo */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl rounded-full"
          style={{ backgroundColor: fragrance.accentColor }}
        />

        <img
          src={fragrance.bottleImage}
          alt={fragrance.name}
          className="w-full h-full object-contain max-h-64 transition-transform duration-700 ease-out group-hover:scale-108 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
          loading="lazy"
        />

        {/* Volume Pill */}
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-wider text-neutral-300">
          100 ML
        </div>
      </div>

      {/* Card Details */}
      <div className="p-6 pt-2 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-medium">
              {fragrance.subheading}
            </span>
            <span className="text-xs font-mono font-medium text-white/90">
              {fragrance.price}
            </span>
          </div>

          <h3 className="text-xl font-serif text-white tracking-wider group-hover:text-[#d4af37] transition-colors">
            {fragrance.name}
          </h3>

          <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed">
            {fragrance.shortDesc}
          </p>
        </div>

        {/* Notes preview tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {fragrance.notes.map((n, i) => (
            <span 
              key={i} 
              className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-neutral-300"
            >
              {n.value.split(' ')[0]}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => onViewDetails(fragrance)}
            className="w-full py-2.5 px-3 rounded-full border border-white/20 text-neutral-300 hover:text-white hover:border-white text-[11px] uppercase tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            onClick={() => onAddToCart(fragrance)}
            className="w-full py-2.5 px-3 rounded-full bg-white text-black hover:bg-[#d4af37] text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add To Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}

