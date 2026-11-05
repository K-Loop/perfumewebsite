import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import PerfumeScene from './PerfumeScene';
import { BRAND, FRAGRANCES } from '../data/fragrances';

gsap.registerPlugin(ScrollTrigger);

// 6 Keyframe snap stops for the 6 fragrances + 1 Hero frame:
// 0.000: Hero Stage
// 0.167: 01 OCEAN BREEZE
// 0.333: 02 BLUSH PETALS
// 0.500: 03 DARK VANILLA BLOOM
// 0.667: 04 MIDNIGHT VELVET
// 0.833: 05 ROYAL SPICE
// 1.000: 06 MIDNIGHT TERRAIN
const SNAP_STOPS = [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1];

export default function FragranceExperience({ onSelectFragrance, onExploreCollection }) {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const fragrancePanelsRef = useRef([]);

  // Active fragrance tracking
  const [activeFragranceIndex, setActiveFragranceIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const hasSettledRef = useRef(false);

  const [bottleTransform, setBottleTransform] = useState({
    position: [0, 0.22, 0],
    rotation: [0, 0, 0],
    scale: 0.75
  });

  const [liquidColor, setLiquidColor] = useState(FRAGRANCES[0].liquidColor);
  const [liquidEmissive, setLiquidEmissive] = useState(FRAGRANCES[0].liquidEmissive);
  const [particleColor, setParticleColor] = useState(FRAGRANCES[0].accentColor);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  // Smooth frame jumping for dots, buttons, and mobile controls
  const scrollToFragrance = useCallback((idx) => {
    const trigger = ScrollTrigger.getById("fragrance-hero-scroll");
    if (!trigger) return;
    const targetProgress = (idx + 1) / 6;
    const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  const scrollToHero = useCallback(() => {
    const trigger = ScrollTrigger.getById("fragrance-hero-scroll");
    if (!trigger) return;
    window.scrollTo({
      top: trigger.start,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const checkLayout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 768 || w < h;
      const isTablet = w >= 768 && w < 1024 && w > h;
      return { isMobile, isTablet };
    };

    const { isMobile, isTablet } = checkLayout();

    // Initial safe hero settings:
    // On mobile, bottle sits at y = 0.42 (upper half, leaving lower half clear for hero text)
    // On desktop, bottle sits at y = 0.22
    const initialPos = [0, isMobile ? 0.42 : 0.22, 0];
    const initialScale = isMobile ? 0.35 : isTablet ? 0.64 : 0.75;

    setBottleTransform({
      position: initialPos,
      rotation: [0, 0, 0],
      scale: initialScale
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "fragrance-hero-scroll",
          trigger: containerRef.current,
          start: "top top",
          end: "+=650vh",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          snap: {
            snapTo: SNAP_STOPS,
            duration: { min: 0.20, max: 0.38 },
            delay: 0.05,
            ease: "power2.out",
            inertia: false
          },
          onUpdate: (self) => {
            const p = self.progress;
            const velocity = self.getVelocity() / 1500;
            const { isMobile: currentIsMobile, isTablet: currentIsTablet } = checkLayout();

            setScrollProgress(p);
            setScrollVelocity(velocity);

            // 6 Distinct Fragrance Chapters with exact midpoints:
            let scentIdx = 0;
            if (p < 0.25) {
              scentIdx = 0; // 01 Ocean Breeze
            } else if (p < 0.42) {
              scentIdx = 1; // 02 Blush Petals
            } else if (p < 0.58) {
              scentIdx = 2; // 03 Dark Vanilla Bloom
            } else if (p < 0.75) {
              scentIdx = 3; // 04 Midnight Velvet
            } else if (p < 0.92) {
              scentIdx = 4; // 05 Royal Spice
            } else {
              scentIdx = 5; // 06 Midnight Terrain
            }

            // Only update state when boundary is crossed
            if (scentIdx !== activeIndexRef.current) {
              activeIndexRef.current = scentIdx;
              setActiveFragranceIndex(scentIdx);
              const activeScent = FRAGRANCES[scentIdx];
              setLiquidColor(activeScent.liquidColor);
              setLiquidEmissive(activeScent.liquidEmissive);
              setParticleColor(activeScent.accentColor);
            }

            // Safe, responsive bottle trajectory:
            // Desktop: travels to left (x = -1.95, y = 0.08)
            // Mobile: sits at top (x = 0, y = 1.25, scale = 0.30) well clear of lower card!
            if (p <= 0.06) {
              setBottleTransform({
                position: [0, currentIsMobile ? 0.42 : 0.22, 0],
                rotation: [0, 0, 0],
                scale: currentIsMobile ? 0.35 : currentIsTablet ? 0.64 : 0.75
              });
              hasSettledRef.current = false;
            } else {
              const shiftProgress = Math.min(1, (p - 0.06) / 0.10);
              const targetX = currentIsMobile ? 0 : currentIsTablet ? -1.35 : -1.95;
              const targetY = currentIsMobile ? 1.25 : 0.08;
              const targetScale = currentIsMobile ? 0.30 : currentIsTablet ? 0.60 : 0.70;
              const targetRotY = currentIsMobile ? (shiftProgress * 0.18) : 0.32;

              if (shiftProgress < 1.0) {
                setBottleTransform({
                  position: [
                    gsap.utils.interpolate(0, targetX, shiftProgress),
                    gsap.utils.interpolate(currentIsMobile ? 0.42 : 0.22, targetY, shiftProgress),
                    0
                  ],
                  rotation: [
                    0,
                    gsap.utils.interpolate(0, targetRotY, shiftProgress),
                    0
                  ],
                  scale: gsap.utils.interpolate(
                    currentIsMobile ? 0.35 : 0.75,
                    targetScale,
                    shiftProgress
                  )
                });
                hasSettledRef.current = false;
              } else if (!hasSettledRef.current) {
                setBottleTransform({
                  position: [targetX, targetY, 0],
                  rotation: [0, targetRotY, 0],
                  scale: targetScale
                });
                hasSettledRef.current = true;
              }
            }
          }
        }
      });

      // 1. HERO TEXT FADE OUT
      tl.to(heroTextRef.current, {
        opacity: 0,
        y: -25,
        scale: 0.96,
        duration: 0.07,
        ease: "power1.inOut"
      }, 0.02);

      // 2. FRAGRANCE 01 (Ocean Breeze) - peak at 0.1667 (1/6)
      if (fragrancePanelsRef.current[0]) {
        tl.fromTo(fragrancePanelsRef.current[0],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.08
        ).to(fragrancePanelsRef.current[0], {
          opacity: 0,
          y: -15,
          duration: 0.05,
          ease: "power2.in"
        }, 0.22);
      }

      // 3. FRAGRANCE 02 (Blush Petals) - peak at 0.3333 (2/6)
      if (fragrancePanelsRef.current[1]) {
        tl.fromTo(fragrancePanelsRef.current[1],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.24
        ).to(fragrancePanelsRef.current[1], {
          opacity: 0,
          y: -15,
          duration: 0.05,
          ease: "power2.in"
        }, 0.39);
      }

      // 4. FRAGRANCE 03 (Dark Vanilla Bloom) - peak at 0.5000 (3/6)
      if (fragrancePanelsRef.current[2]) {
        tl.fromTo(fragrancePanelsRef.current[2],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.41
        ).to(fragrancePanelsRef.current[2], {
          opacity: 0,
          y: -15,
          duration: 0.05,
          ease: "power2.in"
        }, 0.56);
      }

      // 5. FRAGRANCE 04 (Midnight Velvet) - peak at 0.6667 (4/6)
      if (fragrancePanelsRef.current[3]) {
        tl.fromTo(fragrancePanelsRef.current[3],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.58
        ).to(fragrancePanelsRef.current[3], {
          opacity: 0,
          y: -15,
          duration: 0.05,
          ease: "power2.in"
        }, 0.73);
      }

      // 6. FRAGRANCE 05 (Royal Spice) - peak at 0.8333 (5/6)
      if (fragrancePanelsRef.current[4]) {
        tl.fromTo(fragrancePanelsRef.current[4],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.75
        ).to(fragrancePanelsRef.current[4], {
          opacity: 0,
          y: -15,
          duration: 0.05,
          ease: "power2.in"
        }, 0.90);
      }

      // 7. FRAGRANCE 06 (Midnight Terrain) - peak at 1.0000 (6/6)
      if (fragrancePanelsRef.current[5]) {
        tl.fromTo(fragrancePanelsRef.current[5],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.92
        );
      }
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [scrollToFragrance]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#06040a] select-none"
    >
      {/* ATMOSPHERIC BACKGROUNDS LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {FRAGRANCES.map((fragrance, idx) => (
          <div
            key={fragrance.id}
            className={`absolute inset-0 bg-cover bg-center will-change-opacity transform-gpu ${
              activeFragranceIndex === idx ? 'opacity-85 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `url(${fragrance.bgImage})`,
              transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s ease-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/25 to-black/85" />
          </div>
        ))}
      </div>

      {/* PERSISTENT 3D PERFUME BOTTLE CANVAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <PerfumeScene
          liquidColor={liquidColor}
          liquidEmissive={liquidEmissive}
          fragranceName={FRAGRANCES[activeFragranceIndex]?.name || "OCEAN BREEZE"}
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
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none flex flex-col justify-end items-center text-center px-4 sm:px-6 pb-6 sm:pb-12 max-w-4xl mx-auto"
      >
        <div className="space-y-2.5 sm:space-y-4 max-w-xl pointer-events-auto">
          {/* Main Headline */}
          <div className="space-y-1">
            <p className="text-[9px] sm:text-xs uppercase tracking-[0.4em] text-[#f6d87c] font-medium flex items-center justify-center gap-2">
              <span className="w-4 sm:w-5 h-[1px] bg-[#f6d87c]/60" />
              {BRAND.fullName}
              <span className="w-4 sm:w-5 h-[1px] bg-[#f6d87c]/60" />
            </p>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-serif text-white uppercase tracking-[0.12em] leading-tight drop-shadow-2xl">
              A FRAGRANCE THAT <br />
              <span className="italic font-light text-[#f8f4e6]">LEAVES ITS MARK.</span>
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-neutral-300 font-light max-w-xs sm:max-w-md mx-auto leading-relaxed">
            {BRAND.subTagline} — Handcrafted Extrait de Parfum.
          </p>

          {/* CTA Buttons */}
          <div className="pt-1 flex items-center justify-center gap-2.5 sm:gap-3">
            <button
              onClick={() => scrollToFragrance(0)}
              className="px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#f8f4e6] text-black text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#d4af37] transition-all duration-300 shadow-xl shadow-black/80 flex items-center gap-2 group cursor-pointer active:scale-98"
            >
              <span>EXPERIENCE SCENTS</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={onExploreCollection}
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/20 text-white text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium hover:border-[#f6d87c] hover:text-[#f6d87c] transition-all duration-300 backdrop-blur-sm cursor-pointer active:scale-98"
            >
              COLLECTION
            </button>
          </div>

          {/* Mouse Scroll Indicator */}
          <div
            onClick={() => scrollToFragrance(0)}
            className="pt-1 sm:pt-2 flex flex-col items-center gap-1 text-white/50 cursor-pointer group"
          >
            <div className="w-3.5 h-6 sm:w-4 sm:h-7 rounded-full border border-white/40 group-hover:border-[#f6d87c] flex items-start justify-center p-0.5 sm:p-1 transition-colors">
              <div className="w-1 h-1.5 rounded-full bg-[#f6d87c] animate-pulse" />
            </div>
            <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-white/60 group-hover:text-[#f6d87c] transition-colors">
              SCROLL TO DISCOVER
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 02 — 6 SIGNATURE SCENTS NARRATIVE PANELS */}
      {/* MOBILE-PERFECT POSITIONING: Anchored at bottom with clear height, never overflowing */}
      <div
        id="scents"
        className="absolute inset-x-0 bottom-0 top-auto z-20 pointer-events-none flex justify-center md:inset-0 md:items-center md:justify-end px-3 sm:px-6 md:px-16 lg:px-24 pb-3 sm:pb-6 md:pb-0"
      >
        <div className="w-full md:w-1/2 lg:w-5/12 max-w-md lg:max-w-lg relative h-[42vh] max-h-[360px] sm:max-h-none sm:min-h-[460px] flex items-center">
          {FRAGRANCES.map((fragrance, idx) => (
            <div
              key={fragrance.id}
              ref={(el) => (fragrancePanelsRef.current[idx] = el)}
              className={`absolute inset-0 flex flex-col justify-between p-3.5 sm:p-5 md:p-0 rounded-2xl md:rounded-none bg-black/85 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border border-white/10 md:border-none shadow-2xl md:shadow-none transition-all duration-200 ${
                activeFragranceIndex === idx ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {/* Scent Counter & Category Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#f6d87c]">
                    {fragrance.index} / 06
                  </span>
                  <span className="w-4 sm:w-6 h-[1px] bg-white/20" />
                  <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-white/85 font-medium truncate max-w-[140px] sm:max-w-none">
                    {fragrance.subheading}
                  </span>
                </div>

                <span
                  className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-white/10"
                  style={{ color: fragrance.accentColor }}
                >
                  {fragrance.volume}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-0.5 sm:space-y-1">
                <p
                  className="text-[9px] sm:text-xs uppercase tracking-[0.22em] font-semibold"
                  style={{ color: fragrance.accentColor }}
                >
                  {fragrance.tagline}
                </p>
                <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white uppercase tracking-[0.08em] leading-tight drop-shadow-md">
                  {fragrance.name}
                </h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-neutral-300 font-light leading-relaxed tracking-wide line-clamp-2 md:line-clamp-none">
                  {fragrance.shortDesc}
                </p>
              </div>

              {/* Three Fragrance Notes */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 py-1.5 sm:py-2.5 border-y border-white/10">
                {fragrance.notes.map((note, nIdx) => (
                  <div key={nIdx} className="space-y-0.5">
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-neutral-400">
                      {note.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] sm:text-xs font-medium text-white tracking-wide truncate">
                      {note.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onSelectFragrance(fragrance)}
                className="w-full py-2.5 sm:py-3 px-4 rounded-full text-black text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
                style={{ backgroundColor: fragrance.accentColor }}
              >
                <span>EXPLORE {fragrance.name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Mobile Stepper Controls */}
              <div className="flex sm:hidden items-center justify-between pt-1 border-t border-white/10 text-[9px] font-mono">
                <button
                  onClick={() => {
                    if (idx === 0) scrollToHero();
                    else scrollToFragrance(idx - 1);
                  }}
                  className="px-2 py-0.5 rounded-full border border-white/20 text-white/80 active:bg-white/10 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>{idx === 0 ? "Hero" : "Prev"}</span>
                </button>

                <span className="text-[#f6d87c] tracking-widest font-semibold">
                  {idx + 1} OF 6
                </span>

                <button
                  onClick={() => {
                    if (idx < 5) scrollToFragrance(idx + 1);
                  }}
                  disabled={idx === 5}
                  className={`px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1 cursor-pointer ${
                    idx === 5 ? 'opacity-30 cursor-not-allowed' : 'text-white/80 active:bg-white/10'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXPERIENCE PROGRESS INDICATOR (Interactive 6 Scent Dots) */}
      <div className="absolute right-2 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center space-y-2 sm:space-y-2.5 md:space-y-3">
        {FRAGRANCES.map((f, i) => (
          <button
            key={f.id}
            onClick={() => scrollToFragrance(i)}
            title={`${f.index} ${f.name}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeFragranceIndex === i
                ? 'w-1 sm:w-1.5 md:w-2 h-5 sm:h-7 md:h-9 bg-[#f6d87c] shadow-lg shadow-[#f6d87c]/40'
                : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/25 hover:bg-white/70 hover:scale-125'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
