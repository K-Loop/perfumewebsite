import React, { useState } from 'react';
import { Sparkles, Shield, RefreshCw } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import ProductCard from './ProductCard';

export default function Collection({ onAddToCart, onViewDetails }) {
  const [filter, setFilter] = useState('all');

  const filteredFragrances = filter === 'all'
    ? FRAGRANCES
    : FRAGRANCES.filter(f => f.subheading.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="collection" className="relative py-20 sm:py-28 px-4 sm:px-12 lg:px-20 bg-[#050607]">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4af37] font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              THE HAUTE PARFUMERIE
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white uppercase tracking-[0.08em]">
              THE COMPLETE COLLECTION
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light tracking-wide max-w-lg">
              Six timeless signature extraits, handcrafted in limited small-batch editions.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Scents' },
              { id: 'fresh', label: 'Fresh' },
              { id: 'floral', label: 'Floral' },
              { id: 'woody', label: 'Woody' },
              { id: 'citrus', label: 'Aquatic' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${filter === tab.id
                    ? 'bg-[#d4af37] text-black font-semibold'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/5'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Product Cards Grid (3 columns on desktop / 2 on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredFragrances.map((fragrance) => (
            <ProductCard
              key={fragrance.id}
              fragrance={fragrance}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {/* Complimentary Luxury Services Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-white">Complimentary Samples</p>
              <p className="text-[10px] sm:text-[11px] text-neutral-400">Two bespoke discovery vials included with every order.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-white">White Glove Delivery</p>
              <p className="text-[10px] sm:text-[11px] text-neutral-400">Insured express delivery across India in temperature-controlled boxes.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-white">Bespoke Returns</p>
              <p className="text-[10px] sm:text-[11px] text-neutral-400">Test the discovery vial first. Return the sealed full bottle effortlessly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
