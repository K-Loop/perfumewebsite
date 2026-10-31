import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax movement
      gsap.fromTo(
        bgRef.current,
        { y: -60, scale: 1.15 },
        {
          y: 60,
          scale: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      // Foreground text smooth drift
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0.8 },
        {
          y: -30,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[70vh] min-h-[460px] overflow-hidden flex items-center justify-center border-y border-white/10"
    >
      {/* Parallax Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center brightness-75 contrast-110"
        style={{
          backgroundImage: "url(/images/story/mountain-mist.jpg)",
          transform: "scale(1.1)"
        }}
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black/90" />

      {/* Centered Editorial Content matching Section 09 */}
      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6"
      >
        <span className="text-xs uppercase tracking-[0.4em] text-[#d4af37] font-medium block">
          TIMELESS RESONANCE
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white uppercase tracking-[0.12em] leading-tight drop-shadow-2xl">
          SCENTS BEYOND TIME
        </h2>

        {/* Horizontal hairline accent as shown in collage */}
        <div className="w-24 h-[1px] bg-[#d4af37]/60 mx-auto" />

        <p className="text-sm sm:text-base tracking-[0.2em] uppercase text-neutral-300 font-light max-w-lg mx-auto">
          More than a fragrance. A feeling that lasts.
        </p>
      </div>
    </section>
  );
}

