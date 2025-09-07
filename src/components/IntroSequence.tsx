import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import bitsLogo from '@/assets/bits-logo-new.png';

interface IntroSequenceProps {
  onComplete: () => void;
}

const CAROUSEL_IMAGES = [
  'https://picsum.photos/1920/1080?random=1',
  'https://picsum.photos/1920/1080?random=2',
  'https://picsum.photos/1920/1080?random=3',
  'https://picsum.photos/1920/1080?random=4',
  'https://picsum.photos/1920/1080?random=5'
];

export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const slab1Ref = useRef<HTMLDivElement>(null);
  const slab2Ref = useRef<HTMLDivElement>(null);
  const slab3Ref = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Image carousel
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    
    const tl = gsap.timeline({
      onComplete: () => setTimeout(onComplete, 100)
    });

    // Three horizontal slabs sliding from left to right with staggered lengths
    tl.to(slab1Ref.current, {
      duration: 0.5,
      scaleX: 1,
      transformOrigin: "left center",
      ease: "power2.inOut"
    })
    .to(slab2Ref.current, {
      duration: 0.45,
      scaleX: 1,
      transformOrigin: "left center",
      ease: "power2.inOut"
    }, "-=0.3")
    .to(slab3Ref.current, {
      duration: 0.4,
      scaleX: 1,
      transformOrigin: "left center",
      ease: "power2.inOut"
    }, "-=0.25")
    .to(containerRef.current, {
      duration: 0.3,
      opacity: 0,
      ease: "power2.in"
    }, "-=0.1");
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black cursor-pointer"
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {CAROUSEL_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Campus ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Black translucent overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Large circle arc behind logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] border-4 border-white/20 rounded-full transform -translate-y-20" />
      </div>

      {/* BITS Logo */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="text-center">
          <div className="w-60 h-60 mx-auto mb-8 drop-shadow-2xl">
            <img 
              src={bitsLogo} 
              alt="BITS Pilani Dubai Campus" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-white text-2xl font-light tracking-wide">
            BITS Pilani, Dubai Campus
          </h1>
          <p className="text-white/80 text-lg mt-2">
            from the lens of students
          </p>
        </div>
      </div>

      {/* Transition Slabs */}
      <div
        ref={slab1Ref}
        className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-red-600 via-red-500 to-red-400 transform scale-x-0 origin-left z-20"
        style={{ width: '90%' }}
      />
      <div
        ref={slab2Ref}
        className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-r from-red-500 via-red-400 to-red-300 transform scale-x-0 origin-left z-20"
        style={{ width: '85%' }}
      />
      <div
        ref={slab3Ref}
        className="absolute top-2/3 left-0 w-full h-1/3 bg-gradient-to-r from-red-400 via-red-300 to-red-200 transform scale-x-0 origin-left z-20"
        style={{ width: '80%' }}
      />

      {/* Interaction hint */}
      {!hasInteracted && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-pulse z-10">
          <p className="text-white/80 text-lg">Click, touch, or hover to enter</p>
        </div>
      )}
    </div>
  );
};