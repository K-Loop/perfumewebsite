import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { BRAND } from '../data/fragrances';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false);
        } else if (lastScrollY - currentScrollY > 8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Scents', href: '#scents' },
    { name: 'Discovery Kit', href: '#discovery' },
    { name: 'Collection', href: '#collection' },
    { name: 'Story', href: '#story' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          isScrolled
            ? 'py-2.5 px-3 sm:px-8'
            : 'py-5 px-4 sm:px-12 md:px-16 bg-transparent'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 flex items-center justify-between ${
            isScrolled
              ? 'max-w-4xl px-5 sm:px-6 py-2 rounded-full bg-black/75 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80'
              : 'max-w-7xl'
          }`}
        >
          {/* Logo with LX Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-serif text-[#f6d87c] font-bold text-sm tracking-widest border border-[#f6d87c]/40 px-1.5 py-0.5 rounded">
              LX
            </span>
            <span className="tracking-[0.28em] font-semibold text-base sm:text-lg text-white group-hover:text-[#f6d87c] transition-colors font-serif">
              LUXARA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] text-[#d6d6d6] hover:text-[#f6d87c] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#f6d87c] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Shopping Bag & Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#e5e5e5] hover:text-[#f6d87c] transition-colors cursor-pointer group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#f6d87c] text-black text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#e5e5e5] hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center p-8 md:hidden transition-all duration-300">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center mb-10">
            <span className="font-serif text-[#f6d87c] font-bold text-2xl tracking-widest border border-[#f6d87c]/40 px-3 py-1 rounded mb-2">
              LX
            </span>
            <span className="text-xl tracking-[0.3em] font-serif text-white">
              LUXARA
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#f6d87c] uppercase pt-1">
              A FRAGRANCE THAT LEAVES ITS MARK
            </span>
          </div>
          <div className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.25em] text-[#d6d6d6] hover:text-[#f6d87c] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="mt-6 flex items-center space-x-3 px-8 py-3 rounded-full border border-[#f6d87c]/40 text-[#f8f4e6] tracking-[0.2em] text-xs uppercase"
            >
              <ShoppingBag className="w-4 h-4 text-[#f6d87c]" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
