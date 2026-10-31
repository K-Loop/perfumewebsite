import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CRAFTSMANSHIP_FEATURES } from '../data/fragrances';

gsap.registerPlugin(ScrollTrigger);

export default function Ingredients() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const iconMap = {
    Leaf: Leaf,
    Clock: Clock,
    ShieldCheck: ShieldCheck,
    Heart: Heart
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        opacity: 0,
        x: 35,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#070708] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Macro creamy petal photography */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 aspect-[4/5] max-h-[560px]">
            <img
              src="/images/story/flower-macro.jpg"
              alt="Raw Botanical Ingredient Extracts"
              className="w-full h-full object-cover brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase block">
                EXTRACT CONCENTRATION
              </span>
              <p className="text-white text-sm font-serif tracking-wider">
                28% Pure Olfactive Absolutes
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: 4 Craftsmanship Feature Points */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-medium block">
              SAVOIR-FAIRE & HERITAGE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white uppercase tracking-[0.08em] leading-tight">
              THE ART OF<br />
              <span className="italic font-light text-[#f4eedb]">PERFUMERY.</span>
            </h2>
          </div>

          <div className="space-y-8">
            {CRAFTSMANSHIP_FEATURES.map((feature, idx) => {
              const IconComponent = iconMap[feature.icon] || Leaf;
              return (
                <div
                  key={feature.id}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#d4af37]/60 group-hover:bg-[#d4af37]/10 transition-colors">
                    <IconComponent className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-serif uppercase tracking-[0.2em] font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

