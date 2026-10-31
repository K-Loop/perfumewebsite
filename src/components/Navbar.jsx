import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if outside hero (> 100px)
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false); // scrolling down
        } else if (lastScrollY - currentScrollY > 8) {
          setIsVisible(true); // scrolling up
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
    { name: 'Our Story', href: '#story' },
    { name: 'Collection', href: '#collection' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          isScrolled
            ? 'py-3 px-4 sm:px-8'
            : 'py-6 px-6 sm:px-12 md:px-16 bg-transparent'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 flex items-center justify-between ${
            isScrolled
              ? 'max-w-4xl px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80'
              : 'max-w-7xl'
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="tracking-[0.28em] font-semibold text-lg sm:text-xl text-white hover:text-[#d4af37] transition-colors font-serif"
          >
            FIORST
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-[#d6d6d6] hover:text-[#f4eedb] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Shopping Bag & Mobile Toggle */}
          <div className="flex items-center space-x-5">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#e5e5e5] hover:text-[#d4af37] transition-colors cursor-pointer group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center">
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
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center p-8 md:hidden transition-all duration-300">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-xl tracking-[0.3em] font-serif text-[#d4af37] mb-12">
            FIORST
          </div>
          <div className="flex flex-col items-center space-y-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base uppercase tracking-[0.25em] text-[#d6d6d6] hover:text-[#d4af37] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="mt-6 flex items-center space-x-3 px-8 py-3 rounded-full border border-[#d4af37]/40 text-[#f4eedb] tracking-[0.2em] text-xs uppercase"
            >
              <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

