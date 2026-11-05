import React, { useState } from 'react';
import { Sparkles, ArrowRight, Droplets, Wind, ShieldCheck, ChevronRight } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';

export default function FragranceSection({ onAddToCart, onSelectFragrance }) {
  const [activeTab, setActiveTab] = useState(0);
  const current = FRAGRANCES[activeTab];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-12 lg:px-20 bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Subtle background ambient glow matching active tab */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none transition-all duration-1000 opacity-25"
        style={{ backgroundColor: current.accentColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-20">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4af37] font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            THE ART OF SCENT
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white tracking-[0.1em] uppercase">
            OUR SIGNATURE SCENTS
          </h2>
          <p className="text-xs sm:text-sm tracking-wider text-neutral-400 font-light">
            A collection of emotions, crafted into fragrances.
          </p>

          {/* Mobile Interactive Scent Tabs Bar */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 pt-4 overflow-x-auto pb-1 no-scrollbar">
            {FRAGRANCES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === idx
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {s.index} {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Fragrances Balanced Grid (3 columns on desktop / 2 columns on mobile with uniform Y gap) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 gap-y-4 sm:gap-y-8 mb-8 sm:mb-16">
          {FRAGRANCES.map((scent, idx) => {
            const isSelected = activeTab === idx;
            return (
              <div
                key={scent.id}
                onClick={() => setActiveTab(idx)}
                className={`group cursor-pointer p-3 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-500 flex flex-col items-center text-center relative border ${
                  isSelected
                    ? 'bg-white/[0.05] border-[#d4af37]/60 shadow-2xl shadow-black/90 ring-1 ring-[#d4af37]/30'
                    : 'bg-white/[0.015] border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                {/* Active halo */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 rounded-xl sm:rounded-2xl blur-xl opacity-25 transition-all duration-500 pointer-events-none"
                    style={{ backgroundColor: scent.accentColor }}
                  />
                )}

                {/* Scent Index Badge */}
                <div className="self-start text-[9px] font-mono tracking-widest text-[#d4af37]/80 mb-1">
                  {scent.index}
                </div>

                {/* Bottle Thumbnail Image */}
                <div className="relative w-full aspect-[3/4] max-h-36 sm:max-h-56 mb-2.5 sm:mb-5 flex items-center justify-center overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent">
                  <img
                    src={scent.bottleImage}
                    alt={scent.name}
                    className={`object-contain max-h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                      isSelected ? 'scale-105 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]' : 'opacity-85'
                    }`}
                  />
                  {/* Subtle pedestal glow */}
                  <div 
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-28 h-2.5 sm:h-4 rounded-full blur-md opacity-40"
                    style={{ backgroundColor: scent.accentColor }}
                  />
                </div>

                {/* Fragrance Title & Notes (No truncation, natural wrapping) */}
                <div className="space-y-0.5 sm:space-y-1 relative z-10 w-full">
                  <h3 className="text-xs sm:text-sm lg:text-base font-serif tracking-[0.14em] font-semibold text-white group-hover:text-[#d4af37] transition-colors leading-snug min-h-[2rem] sm:min-h-[2.6rem] flex items-center justify-center px-0.5">
                    {scent.name}
                  </h3>
                  <p className="text-[8px] sm:text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-light truncate">
                    {scent.subheading.split('&')[0].trim()}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-mono text-white/90 pt-0.5 sm:pt-1">
                    {scent.price}
                  </p>
                </div>

                {/* Active indicator bar */}
                <div 
                  className={`mt-2 sm:mt-4 h-[2px] transition-all duration-500 rounded-full ${
                    isSelected ? 'w-8 sm:w-14' : 'w-0'
                  }`}
                  style={{ backgroundColor: scent.accentColor }}
                />
              </div>
            );
          })}
        </div>

        {/* Detailed Selected Fragrance Ribbon (Responsive Mobile Card) */}
        <div className="p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center shadow-2xl">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium" style={{ color: current.accentColor }}>
              {current.tagline}
            </span>
            <h4 className="text-xl sm:text-3xl font-serif text-white tracking-wider">
              {current.headline}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-2 sm:gap-4 border-y lg:border-y-0 lg:border-x border-white/10 py-3 sm:py-4 lg:py-0 lg:px-6">
            {current.notes.map((note, i) => (
              <div key={i} className="space-y-0.5 sm:space-y-1">
                <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-neutral-400 block">{note.name}</span>
                <span className="text-[11px] sm:text-sm font-medium text-white block truncate">{note.value}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 justify-center">
            <button
              onClick={() => onAddToCart(current)}
              className="w-full py-3 px-6 rounded-full bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#d4af37] transition-colors cursor-pointer shadow-lg active:scale-98"
            >
              Add To Bag — {current.price}
            </button>
            <button
              onClick={() => onSelectFragrance(current)}
              className="w-full py-2.5 sm:py-3 px-6 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.2em] hover:border-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Fragrance Notes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
