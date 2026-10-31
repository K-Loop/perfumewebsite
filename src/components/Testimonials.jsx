import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/fragrances';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#070708] border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-10 relative">
        {/* Large Luxury Quotation Mark */}
        <div className="text-6xl sm:text-7xl font-serif text-[#d4af37]/60 leading-none select-none">
          “
        </div>

        {/* Testimonial Quote */}
        <div className="min-h-[140px] flex items-center justify-center">
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif text-white/95 font-light leading-relaxed max-w-3xl italic tracking-wide">
            {current.quote}
          </blockquote>
        </div>

        {/* Customer Info & Avatar matching row 11 in reference */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={current.avatar}
              alt={current.author}
              className="w-12 h-12 rounded-full object-cover border border-[#d4af37]/50 p-0.5"
            />
            <div className="text-left">
              <h4 className="text-sm font-semibold text-white tracking-wide">
                {current.author}
              </h4>
              <p className="text-[11px] text-[#d4af37] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {current.role} • {current.fragrance}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows and Dots as in Section 11 */}
        <div className="flex items-center justify-center gap-6 pt-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === i ? 'w-6 h-1.5 bg-[#d4af37]' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

