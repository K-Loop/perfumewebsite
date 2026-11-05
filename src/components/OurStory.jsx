import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass } from 'lucide-react';
import { BRAND } from '../data/fragrances';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory({ onOpenModal }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { y: 35 },
        {
          y: -35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      gsap.from(textRef.current?.children || [], {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="story" 
      className="relative py-24 sm:py-36 px-4 sm:px-12 lg:px-20 bg-[#05020a] overflow-hidden border-t border-purple-950/40"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Brand Story Typography */}
        <div ref={textRef} className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#f6d87c] font-medium flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              THE MAISON'S HERITAGE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-[0.08em] leading-tight">
              A JOURNEY<br />
              <span className="italic font-light text-[#f8f4e6]">THROUGH SCENTS.</span>
            </h2>
          </div>

          <div className="space-y-4 max-w-xl text-neutral-300 font-light text-xs sm:text-base leading-relaxed tracking-wide">
            <p className="text-base sm:text-lg text-white font-serif italic">
              "{BRAND.tagline}"
            </p>
            <p>
              Born from an uncompromising pursuit of olfactive distinction, <strong>{BRAND.name}</strong> creates architectural fragrances designed to leave an unforgettable presence in any room. Each flacon houses an exquisite Extrait de Parfum formulated at 30% concentration.
            </p>
            <p className="text-neutral-400">
              From the coastal freedom of <em>Ocean Breeze</em> and the timeless petals of <em>Blush Petals</em> to the intoxicating warmth of <em>Dark Vanilla Bloom</em> and the nocturnal decadence of <em>Midnight Velvet</em>, each creation tells a multi-layered story of places, moments, and emotions.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-[#f6d87c]/40 text-[#f8f4e6] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#f6d87c] hover:text-black hover:border-[#f6d87c] transition-all duration-300 cursor-pointer shadow-lg shadow-black/50"
            >
              <span>DISCOVER THE MAISON</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Editorial Botanical Photography with Parallax */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-black/90">
            <div 
              ref={imageRef} 
              className="scale-110 transition-transform duration-300"
            >
              <img
                src="/images/story/botanical-dark.jpg"
                alt="LUXARA Botanical Heritage"
                className="w-full h-auto object-cover max-h-[580px] brightness-95 contrast-105"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Inset Label Badge */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#f6d87c] block">LX LUXARA ARCHIVE</span>
                <span className="text-xs uppercase tracking-wider text-white font-medium">Bespoke Extrait Distillation</span>
              </div>
              <span className="text-[11px] font-mono text-purple-300 font-bold">30% VOL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
