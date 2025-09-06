import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import bitsLogo from '@/assets/bits-logo-new.png';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const [showSkip, setShowSkip] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start animation immediately when component mounts
    setHasStarted(true);
    setShowSkip(true);
    setTimeout(() => {
      startAnimation();
    }, 500);

    const handleScroll = () => {
      if (!hasStarted && window.scrollY > 10) {
        setHasStarted(true);
        setShowSkip(true);
        startAnimation();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasStarted]);

  const startAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 200);
      }
    });

    // Netflix-style reveal: Red swoosh from left to right
    tl.to(linesRef.current, {
      duration: 0.6,
      scaleX: 1,
      transformOrigin: "left center",
      ease: "power2.out"
    })
    // Logo appears during swoosh
    .to(logoRef.current, {
      duration: 0.4,
      opacity: 1,
      scale: 1,
      ease: "power2.out"
    }, "-=0.3")
    // Subtitle appears
    .to(subtitleRef.current, {
      duration: 0.3,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.1")
    // Hold the logo briefly
    .to({}, { duration: 1.2 })
    // Quick fade out like Netflix
    .to(containerRef.current, {
      duration: 0.4,
      opacity: 0,
      ease: "power2.in"
    });
  };

  const skipIntro = () => {
    gsap.to(containerRef.current, {
      duration: 0.3,
      opacity: 0,
      onComplete
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
    >
      {/* Netflix red swoosh reveal */}
      <div
        ref={linesRef}
        className="absolute inset-0 bg-red-600 transform scale-x-0 origin-left"
      />

      {/* Main content */}
      <div className="text-center z-10">
        {/* BITS Logo */}
        <div
          ref={logoRef}
          className="mb-8 opacity-0"
        >
          <div className="w-40 h-40 mx-auto flex items-center justify-center">
            <img 
              src={bitsLogo} 
              alt="BITS Pilani Dubai Campus" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="opacity-0"
        >
          <h2 className="text-xl font-light text-white tracking-wider">
            BPDC, from the lens of student
          </h2>
        </div>
      </div>

      {/* Skip button */}
      {showSkip && (
        <Button
          onClick={skipIntro}
          variant="outline"
          className="absolute top-8 right-8 z-20 border-muted hover:border-primary hover:text-primary transition-colors"
        >
          Skip Intro
        </Button>
      )}

      {/* Scroll indicator - only show if animation hasn't started */}
      {!hasStarted && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
          <div className="text-sm text-muted-foreground mb-2">Animation will begin shortly...</div>
          <div className="w-6 h-10 border-2 border-muted rounded-full mx-auto">
            <div className="w-1 h-3 bg-muted rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};