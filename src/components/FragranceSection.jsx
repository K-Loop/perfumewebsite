import React, { useState } from 'react';
import { Sparkles, ArrowRight, Droplets, Wind, Shield } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';

export default function FragranceSection({ onAddToCart, onSelectFragrance }) {
  const [activeTab, setActiveTab] = useState(0);
  const current = FRAGRANCES[activeTab];

  return (
    <section className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Subtle background ambient glow matching active tab */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 opacity-20"
        style={{ backgroundColor: current.accentColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            THE ART OF SCENT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-[0.1em] uppercase">
            OUR SIGNATURE SCENTS
          </h2>
          <p className="text-sm tracking-wider text-neutral-400 font-light">
            A collection of emotions, crafted into fragrances.
          </p>
        </div>

        {/* 4 Bottles Showcase Row (As in reference image Section 06) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-16">
          {FRAGRANCES.map((scent, idx) => {
            const isSelected = activeTab === idx;
            return (
              <div
                key={scent.id}
                onClick={() => setActiveTab(idx)}
                className={`group cursor-pointer p-6 rounded-2xl transition-all duration-500 flex flex-col items-center text-center relative border ${
                  isSelected
                    ? 'bg-white/[0.04] border-[#d4af37]/50 shadow-2xl shadow-black/80'
                    : 'bg-white/[0.015] border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                {/* Active halo */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 rounded-2xl blur-xl opacity-20 transition-all duration-500"
                    style={{ backgroundColor: scent.accentColor }}
                  />
                )}

                {/* Bottle Thumbnail Image */}
                <div className="relative w-full aspect-[3/4] max-h-56 mb-6 flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src={scent.bottleImage}
                    alt={scent.name}
                    className={`object-contain max-h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                      isSelected ? 'scale-105 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]' : 'opacity-85'
                    }`}
                  />
                  {/* Subtle pedestal glow */}
                  <div 
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full blur-md opacity-40"
                    style={{ backgroundColor: scent.accentColor }}
                  />
                </div>

                {/* Fragrance Title & Notes */}
                <div className="space-y-1 relative z-10">
                  <h3 className="text-sm sm:text-base font-serif tracking-[0.2em] font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                    {scent.name}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-light">
                    {scent.subheading.split('&')[0].trim()}
                  </p>
                </div>

                {/* Active indicator bar */}
                <div 
                  className={`mt-4 h-[2px] transition-all duration-500 rounded-full ${
                    isSelected ? 'w-12' : 'w-0'
                  }`}
                  style={{ backgroundColor: scent.accentColor }}
                />
              </div>
            );
          })}
        </div>

        {/* Detailed Selected Fragrance Ribbon */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: current.accentColor }}>
              {current.tagline}
            </span>
            <h4 className="text-2xl sm:text-3xl font-serif text-white tracking-wider">
              {current.headline}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-4 border-y lg:border-y-0 lg:border-x border-white/10 py-4 lg:py-0 lg:px-6">
            {current.notes.map((note, i) => (
              <div key={i} className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">{note.name}</span>
                <span className="text-xs sm:text-sm font-medium text-white block">{note.value}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={() => onAddToCart(current)}
              className="w-full py-3 px-6 rounded-full bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#d4af37] transition-colors cursor-pointer shadow-lg"
            >
              Add To Bag — {current.price}
            </button>
            <button
              onClick={() => onSelectFragrance(current)}
              className="w-full py-3 px-6 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.2em] hover:border-white transition-colors cursor-pointer"
            >
              Fragrance Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

