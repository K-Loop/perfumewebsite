import React from 'react';
import { X, Sparkles, ShoppingBag, Droplets, Clock, Wind, ArrowRight } from 'lucide-react';

export default function FragranceModal({ fragrance, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !fragrance) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0c0d0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 text-white grid grid-cols-1 md:grid-cols-12 animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Fragrance Visual & Atmosphere */}
        <div 
          className="md:col-span-5 relative p-8 flex flex-col justify-between items-center bg-cover bg-center overflow-hidden min-h-[340px]"
          style={{ backgroundImage: `url(${fragrance.bgImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

          {/* Scent Title Pill */}
          <div className="relative z-10 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: fragrance.accentColor }}>
              {fragrance.index} • {fragrance.subheading}
            </span>
            <h3 className="text-2xl font-serif text-white uppercase tracking-wider">
              {fragrance.name}
            </h3>
          </div>

          {/* Bottle Image with Glow */}
          <div className="relative z-10 w-full max-w-[200px] aspect-[3/4] flex items-center justify-center my-4">
            <div 
              className="absolute inset-0 blur-2xl opacity-40 rounded-full"
              style={{ backgroundColor: fragrance.accentColor }}
            />
            <img
              src={fragrance.bottleImage}
              alt={fragrance.name}
              className="object-contain max-h-56 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div className="relative z-10 text-center">
            <span className="text-xs font-mono text-neutral-300">100 ML Extrait de Parfum</span>
          </div>
        </div>

        {/* Right Column: Detailed Olfactive Profile */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">
                {fragrance.tagline}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider">
                {fragrance.headline}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {fragrance.description}
            </p>

            {/* Olfactive Pyramid */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 block">
                Olfactive Pyramid Breakdown
              </span>
              <div className="space-y-2 border-l border-[#d4af37]/40 pl-4">
                {fragrance.notes.map((note, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 uppercase tracking-wider text-[11px]">{note.name}</span>
                    <span className="text-white font-medium">{note.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance specs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#d4af37]" /> Longevity
                </span>
                <p className="text-xs font-medium text-white">14+ Hours on Skin</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Wind className="w-3 h-3 text-[#d4af37]" /> Sillage & Trail
                </span>
                <p className="text-xs font-medium text-white">Intimate to Moderate</p>
              </div>
            </div>
          </div>

          {/* CTA Row */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 block">Price</span>
              <span className="text-xl font-mono font-semibold text-white">{fragrance.price}</span>
            </div>

            <button
              onClick={() => {
                onAddToCart(fragrance);
                onClose();
              }}
              className="py-3 px-8 rounded-full bg-white text-black hover:bg-[#d4af37] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xl shadow-black/60"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add To Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

