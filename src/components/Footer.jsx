import React, { useState } from 'react';
import { Send, ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#040405] text-neutral-300 border-t border-white/10 overflow-hidden">
      {/* Subtle Botanical Shadow Silhouette in Background */}
      <div 
        className="absolute right-0 bottom-0 w-96 h-96 opacity-10 pointer-events-none bg-contain bg-no-repeat bg-right-bottom"
        style={{ backgroundImage: 'url(/images/story/botanical-dark.jpg)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Identity Column (matching 12. FOOTER) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl font-serif tracking-[0.25em] text-white uppercase font-bold">
              FIORST
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
              Scents for a Better Tomorrow
            </p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              An independent French-Indian haute parfumerie house creating contemplative olfactive architectures from pure botanical absolutes.
            </p>

            {/* Social Icons matching row 12 */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#d4af37] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#d4af37] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#d4af37] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#scents" className="hover:text-[#d4af37] transition-colors">FIORST Forest</a></li>
              <li><a href="#scents" className="hover:text-[#d4af37] transition-colors">FIORST Bloom</a></li>
              <li><a href="#scents" className="hover:text-[#d4af37] transition-colors">FIORST Oud</a></li>
              <li><a href="#scents" className="hover:text-[#d4af37] transition-colors">FIORST Ocean</a></li>
              <li><a href="#collection" className="hover:text-[#d4af37] transition-colors">Discovery Set</a></li>
            </ul>
          </div>

          {/* Maison Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#story" className="hover:text-[#d4af37] transition-colors">Our Story</a></li>
              <li><a href="#story" className="hover:text-[#d4af37] transition-colors">Craftsmanship</a></li>
              <li><a href="#story" className="hover:text-[#d4af37] transition-colors">Sustainability</a></li>
              <li><a href="#collection" className="hover:text-[#d4af37] transition-colors">Store Locator</a></li>
              <li><a href="#contact" className="hover:text-[#d4af37] transition-colors">Contact Concierge</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Olfactive Gazette
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Subscribe to receive private invitations to limited-edition extraits and private cellar releases.
            </p>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] pr-12 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-2 rounded-full bg-white text-black hover:bg-[#d4af37] transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-green-700" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#d4af37]">
                  Thank you for subscribing to the FIORST Gazette.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} FIORST Parfums Paris. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#shipping" className="hover:text-white transition-colors">Shipping & Returns</a>
            <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
