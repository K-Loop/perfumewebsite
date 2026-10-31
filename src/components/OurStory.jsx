import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory({ onOpenModal }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle parallax effect on botanical image
      gsap.fromTo(
        imageRef.current,
        { y: 40 },
        {
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      // Text stagger entry
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
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#050607] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Brand Story Typography */}
        <div ref={textRef} className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-medium flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              THE MAISON'S PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-[0.08em] leading-tight">
              A JOURNEY<br />
              <span className="italic font-light text-[#f4eedb]">THROUGH SCENTS.</span>
            </h2>
          </div>

          <div className="space-y-4 max-w-xl text-neutral-300 font-light text-sm sm:text-base leading-relaxed tracking-wide">
            <p className="text-lg text-white font-serif italic">
              "More than a fragrance. A signature."
            </p>
            <p>
              Born from a relentless pursuit of olfactive purity, FIORST marries the ancient traditions of French perfumery with modern botanical minimalism. Each bottle is an architectural vessel carrying rare, ethically gathered botanical essences.
            </p>
            <p className="text-neutral-400">
              Inspired by nature. Designed for you. Each fragrance tells an intimate story — of morning mist through towering redwoods, delicate petals opening at dawn, molten amber deserts, and the eternal whisper of midnight tides.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#d4af37]/40 text-[#f4eedb] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-lg shadow-black/50"
            >
              <span>DISCOVER OUR STORY</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Editorial Botanical Photography with Parallax */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/90">
            <div 
              ref={imageRef} 
              className="scale-110 transition-transform duration-300"
            >
              <img
                src="/images/story/botanical-dark.jpg"
                alt="FIORST Botanical Story Art"
                className="w-full h-auto object-cover max-h-[580px] brightness-95 contrast-105"
              />
            </div>

            {/* Subtle inner gradient shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Inset Label Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] block">ARCHIVE NO. 07</span>
                <span className="text-xs uppercase tracking-wider text-white font-medium">Bespoke Distillation</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">100% PURE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

