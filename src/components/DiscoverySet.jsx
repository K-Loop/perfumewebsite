import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, ArrowRight, Mail } from 'lucide-react';
import { DISCOVERY_SET, BRAND } from '../data/fragrances';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function DiscoverySet({ onAddToCart }) {
  const [selectedOffer, setSelectedOffer] = useState(DISCOVERY_SET.offers[1]); // Any 3 samples default
  const [added, setAdded] = useState(false);

  const handleOrder = () => {
    onAddToCart({
      id: `discovery-${selectedOffer.id}`,
      name: `Discovery Set (${selectedOffer.name})`,
      subheading: selectedOffer.size,
      price: selectedOffer.price,
      priceNum: selectedOffer.priceNum,
      bottleImage: DISCOVERY_SET.image
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <section id="discovery" className="relative py-24 sm:py-32 px-4 sm:px-12 lg:px-20 bg-[#07030e] border-t border-purple-900/30 overflow-hidden">
      {/* Ambient royal purple backlight */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Official Discovery Set Poster (Fully aligned without clipping or overlapping cards) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-500/25 bg-[#0b0514] shadow-2xl shadow-black/90 group">
            <img
              src={DISCOVERY_SET.image}
              alt="LX LUXARA Official Discovery Set"
              className="w-full h-auto object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Elegant luxury badge top-left */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#f6d87c]/40 flex items-center gap-2 shadow-lg">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f6d87c]" />
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-[#f6d87c]">
                DISCOVERY ARCHIVE
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Sample Offer Selector */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-[#f6d87c] font-bold text-xs tracking-widest border border-[#f6d87c]/40 px-2 py-0.5 rounded">
                LX
              </span>
              <span className="text-xs uppercase tracking-[0.35em] text-[#f6d87c] font-medium">
                LUXARA PARFUM
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white uppercase tracking-[0.08em] leading-tight">
              DISCOVER YOUR<br />
              <span className="italic font-light text-[#f8f4e6]">SIGNATURE SCENT.</span>
            </h2>
            <p className="text-sm font-mono tracking-widest text-purple-300 uppercase">
              {DISCOVERY_SET.headline}
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-lg">
              {DISCOVERY_SET.tagline} Experience the luxury of LUXARA before committing to a full 50ml flacon. Each vial contains 8ml of concentrated Extrait de Parfum.
            </p>
          </div>

          {/* Pricing Offers (Any 2, Any 3, Complete Box) */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
              PICK YOUR FAVOURITE
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DISCOVERY_SET.offers.map((offer) => {
                const isSelected = selectedOffer.id === offer.id;
                return (
                  <div
                    key={offer.id}
                    onClick={() => setSelectedOffer(offer)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative ${
                      isSelected
                        ? 'bg-purple-950/50 border-[#f6d87c] shadow-xl shadow-purple-950/60 ring-1 ring-[#f6d87c]/40'
                        : 'bg-white/[0.02] border-white/10 hover:border-purple-400/40'
                    }`}
                  >
                    {offer.badge && (
                      <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-[#f6d87c] text-black text-[8px] font-bold tracking-wider">
                        {offer.badge}
                      </span>
                    )}

                    <div className="space-y-1">
                      <h4 className="text-xs font-serif uppercase tracking-wider text-white font-semibold">
                        {offer.name}
                      </h4>
                      <p className="text-[10px] text-neutral-400">
                        {offer.size}
                      </p>
                    </div>

                    <div className="pt-4 flex items-baseline justify-between border-t border-white/5 mt-3">
                      <span className="text-lg font-mono font-bold text-[#f6d87c]">
                        {offer.price}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#f6d87c]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-4 pt-2">
            <button
              onClick={handleOrder}
              className="w-full py-4 px-8 rounded-full bg-[#f6d87c] text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 shadow-xl shadow-purple-950/60 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{added ? "ADDED TO BAG!" : `ORDER ${selectedOffer.name} — ${selectedOffer.price}`}</span>
              {!added && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
            </button>

            {/* Direct DM / Email option as requested in campaign image */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3 pt-2">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#f6d87c] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-purple-400" />
                <span>DM TO ORDER on Instagram {BRAND.instagram}</span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 hover:text-[#f6d87c] transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>{BRAND.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
