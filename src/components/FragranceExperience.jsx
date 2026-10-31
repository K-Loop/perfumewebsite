import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import PerfumeScene from './PerfumeScene';
import { FRAGRANCES } from '../data/fragrances';

gsap.registerPlugin(ScrollTrigger);

export default function FragranceExperience({ onSelectFragrance, onExploreCollection }) {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const fragrancePanelsRef = useRef([]);

  // Active state driving 3D bottle and atmospheric lighting
  const [activeFragranceIndex, setActiveFragranceIndex] = useState(0);
  const [bottleTransform, setBottleTransform] = useState({
    position: [0, 0.22, 0],
    rotation: [0, 0, 0],
    scale: 0.75
  });
  const [liquidColor, setLiquidColor] = useState(FRAGRANCES[0].liquidColor);
  const [liquidEmissive, setLiquidEmissive] = useState("#022B18");
  const [particleColor, setParticleColor] = useState(FRAGRANCES[0].accentColor);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Responsive initial hero settings
    const initialPos = [0, isMobile ? 0.35 : 0.22, 0];
    const initialScale = isMobile ? 0.54 : isTablet ? 0.64 : 0.75;

    setBottleTransform({
      position: initialPos,
      rotation: [0, 0, 0],
      scale: initialScale
    });

    const ctx = gsap.context(() => {
      // Significantly increased scroll distance (+950vh) and gentle scrub (2.2)
      // to make the scroll progression much slower, controlled, and cinematic
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=950vh",
          pin: true,
          scrub: 2.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const velocity = self.getVelocity() / 1500; // normalized scroll velocity
            
            setScrollProgress(p);
            setScrollVelocity(velocity);

            // Slower, wider stage distribution:
            // p = 0 to 0.16 : Centered Hero
            // p = 0.16 to 0.38 : Fragrance 01 (Forest)
            // p = 0.38 to 0.60 : Fragrance 02 (Bloom)
            // p = 0.60 to 0.82 : Fragrance 03 (Oud)
            // p = 0.82 to 1.00 : Fragrance 04 (Ocean)

            let scentIdx = 0;
            if (p < 0.38) {
              scentIdx = 0; // Forest
            } else if (p < 0.60) {
              scentIdx = 1; // Bloom
            } else if (p < 0.82) {
              scentIdx = 2; // Oud
            } else {
              scentIdx = 3; // Ocean
            }
            setActiveFragranceIndex(scentIdx);

            const activeScent = FRAGRANCES[scentIdx];
            setLiquidColor(activeScent.liquidColor);
            setLiquidEmissive(activeScent.liquidEmissive || "#03331c");
            setParticleColor(activeScent.accentColor);

            // Slow, cinematic bottle movement from center to left
            if (p <= 0.14) {
              setBottleTransform({
                position: initialPos,
                rotation: [0, 0, 0],
                scale: initialScale
              });
            } else {
              // Smooth movement spread over a wide scroll range (0.14 to 0.34)
              const shiftProgress = Math.min(1, (p - 0.14) / 0.20);
              
              const targetX = isMobile ? 0 : isTablet ? -1.35 : -1.95;
              const targetY = isMobile ? 1.25 : 0.08;
              const targetScale = isMobile ? 0.50 : isTablet ? 0.60 : 0.70;
              const targetRotY = isMobile ? 0 : 0.32;

              setBottleTransform({
                position: [
                  gsap.utils.interpolate(initialPos[0], targetX, shiftProgress),
                  gsap.utils.interpolate(initialPos[1], targetY, shiftProgress),
                  0
                ],
                rotation: [
                  0,
                  gsap.utils.interpolate(0, targetRotY, shiftProgress),
                  0
                ],
                scale: gsap.utils.interpolate(
                  initialScale,
                  targetScale,
                  shiftProgress
                )
              });
            }
          }
        }
      });

      // 1. HERO TEXT FADE OUT (Smooth fade between p: 0.08 and 0.16)
      tl.to(heroTextRef.current, {
        opacity: 0,
        y: -35,
        scale: 0.97,
        duration: 0.12,
        ease: "power1.inOut"
      }, 0.06);

      // 2. FRAGRANCE 01 (Forest) Entrance
      if (fragrancePanelsRef.current[0]) {
        tl.fromTo(fragrancePanelsRef.current[0], 
          { opacity: 0, x: 70 },
          { opacity: 1, x: 0, duration: 0.16, ease: "power2.out" },
          0.16
        ).to(fragrancePanelsRef.current[0], {
          opacity: 0,
          x: -50,
          duration: 0.12,
          ease: "power2.in"
        }, 0.34);
      }

      // 3. FRAGRANCE 02 (Bloom) Entrance
      if (fragrancePanelsRef.current[1]) {
        tl.fromTo(fragrancePanelsRef.current[1],
          { opacity: 0, x: 70 },
          { opacity: 1, x: 0, duration: 0.16, ease: "power2.out" },
          0.38
        ).to(fragrancePanelsRef.current[1], {
          opacity: 0,
          x: -50,
          duration: 0.12,
          ease: "power2.in"
        }, 0.56);
      }

      // 4. FRAGRANCE 03 (Oud) Entrance
      if (fragrancePanelsRef.current[2]) {
        tl.fromTo(fragrancePanelsRef.current[2],
          { opacity: 0, x: 70 },
          { opacity: 1, x: 0, duration: 0.16, ease: "power2.out" },
          0.60
        ).to(fragrancePanelsRef.current[2], {
          opacity: 0,
          x: -50,
          duration: 0.12,
          ease: "power2.in"
        }, 0.78);
      }

      // 5. FRAGRANCE 04 (Ocean) Entrance
      if (fragrancePanelsRef.current[3]) {
        tl.fromTo(fragrancePanelsRef.current[3],
          { opacity: 0, x: 70 },
          { opacity: 1, x: 0, duration: 0.16, ease: "power2.out" },
          0.82
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-black select-none"
    >
      {/* ATMOSPHERIC BACKGROUNDS LAYER */}
      <div className="absolute inset-0 z-0">
        {FRAGRANCES.map((fragrance, idx) => (
          <div
            key={fragrance.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              activeFragranceIndex === idx ? 'opacity-85 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `url(${fragrance.bgImage})`,
              transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 2.8s ease-out'
            }}
          >
            {/* Cinematic dark vignette and atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/85" />
          </div>
        ))}
      </div>

      {/* PERSISTENT 3D PERFUME BOTTLE CANVAS */}
      <div className="absolute inset-0 z-10">
        <PerfumeScene
          liquidColor={liquidColor}
          liquidEmissive={liquidEmissive}
          bottlePosition={bottleTransform.position}
          bottleRotation={bottleTransform.rotation}
          bottleScale={bottleTransform.scale}
          particleColor={particleColor}
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
        />
      </div>

      {/* SECTION 01 — HERO TYPOGRAPHY & CALL TO ACTION */}
      <div 
        ref={heroTextRef}
        className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end items-center text-center px-6 pb-8 sm:pb-12 max-w-4xl mx-auto"
      >
        <div className="space-y-4 max-w-xl pointer-events-auto">
          {/* Main Headline */}
          <div className="space-y-1">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#d4af37] font-medium">
              NATURE IN A BOTTLE
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white uppercase tracking-[0.12em] leading-tight drop-shadow-2xl">
              SCENT IS AN <span className="italic font-light text-[#f4eedb]">EXPERIENCE.</span>
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-xs sm:text-sm tracking-[0.18em] uppercase text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
            Scents that move with you. Inspired by nature, crafted for moments.
          </p>

          {/* CTA */}
          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={onExploreCollection}
              className="px-7 py-3 rounded-full bg-[#f4eedb] text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#d4af37] transition-all duration-300 shadow-xl shadow-black/80 flex items-center gap-2 group cursor-pointer"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mouse Scroll Indicator */}
          <div className="pt-3 flex flex-col items-center gap-1.5 text-white/50">
            <div className="w-4 h-7 rounded-full border border-white/40 flex items-start justify-center p-1">
              <div className="w-1 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            </div>
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/60">SCROLL</span>
          </div>
        </div>
      </div>

      {/* SECTION 02 — SIGNATURE SCENTS NARRATIVE PANELS */}
      <div 
        id="scents" 
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-end px-6 sm:px-12 md:px-16 lg:px-24"
      >
        <div className="w-full md:w-1/2 lg:w-5/12 max-w-lg relative min-h-[440px] flex items-center">
          {FRAGRANCES.map((fragrance, idx) => (
            <div
              key={fragrance.id}
              ref={(el) => (fragrancePanelsRef.current[idx] = el)}
              className="absolute inset-0 flex flex-col justify-center space-y-5 pointer-events-auto opacity-0"
            >
              {/* Scent Counter & Category Pill */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono tracking-widest text-[#d4af37]">
                  {fragrance.index} / 04
                </span>
                <span className="w-8 h-[1px] bg-white/20" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/80 font-medium">
                  {fragrance.subheading}
                </span>
              </div>

              {/* Tagline / Subtitle */}
              <p 
                className="text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold"
                style={{ color: fragrance.accentColor }}
              >
                {fragrance.tagline}
              </p>

              {/* Major Editorial Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-white font-serif uppercase leading-tight drop-shadow-lg">
                {fragrance.headline}
              </h2>

              {/* Editorial Description */}
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed tracking-wider">
                {fragrance.description}
              </p>

              {/* Three Fragrance Notes */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/10">
                {fragrance.notes.map((note, nIdx) => (
                  <div key={nIdx} className="space-y-1">
                    <p className="text-[9px] uppercase tracking-wider text-neutral-400">
                      {note.name}
                    </p>
                    <p className="text-xs font-medium text-white tracking-wide">
                      {note.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Accords and CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onSelectFragrance(fragrance)}
                  className="px-6 py-2.5 rounded-full text-black text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg cursor-pointer flex items-center gap-2 group"
                  style={{ backgroundColor: fragrance.accentColor }}
                >
                  <span>DISCOVER {fragrance.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-2">
                  {fragrance.accords.map((accord, aIdx) => (
                    <span 
                      key={aIdx} 
                      className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {accord}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXPERIENCE PROGRESS INDICATOR */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center space-y-4">
        {FRAGRANCES.map((f, i) => (
          <div
            key={f.id}
            className={`w-1.5 transition-all duration-500 rounded-full ${
              activeFragranceIndex === i
                ? 'h-8 bg-[#d4af37]'
                : 'h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
