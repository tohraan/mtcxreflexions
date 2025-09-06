import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import bitsLogo from '@/assets/bits-logo.png';

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
        setTimeout(onComplete, 500);
      }
    });

    // Netflix-style reveal transition
    tl.to(linesRef.current, {
      duration: 1.2,
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      ease: "power2.out"
    })
    // Logo scale and reveal with Netflix-style bounce
    .to(logoRef.current, {
      duration: 1.2,
      scale: 1.1,
      opacity: 1,
      y: -10,
      ease: "back.out(1.4)"
    }, "-=0.8")
    .to(logoRef.current, {
      duration: 0.6,
      scale: 1,
      y: 0,
      ease: "power2.out"
    })
    // Subtitle reveal with expand effect
    .to(subtitleRef.current, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      scaleX: 1,
      ease: "power2.out"
    }, "-=0.4")
    // Hold for a moment
    .to({}, { duration: 1.8 })
    // Netflix-style zoom out and fade
    .to(containerRef.current, {
      duration: 1,
      scale: 0.9,
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
      {/* Netflix-inspired reveal background */}
      <div
        ref={linesRef}
        className="absolute inset-0 opacity-0"
        style={{
          clipPath: "inset(0 100% 0 0)",
          background: `
            linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.15) 40%, rgba(59, 130, 246, 0.4) 50%, rgba(59, 130, 246, 0.15) 60%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(245, 158, 11, 0.15) 40%, rgba(245, 158, 11, 0.3) 50%, rgba(245, 158, 11, 0.15) 60%, transparent 70%),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(239, 68, 68, 0.2) 50%, rgba(168, 85, 247, 0.1) 100%)
          `,
          backgroundSize: '150% 150%, 150% 150%, 100% 100%'
        }}
      />

      {/* Main content */}
      <div className="text-center z-10">
        {/* BITS Logo */}
        <div
          ref={logoRef}
          className="mb-8 opacity-0 scale-75 translate-y-8"
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
          className="opacity-0 translate-y-4 scale-x-0"
        >
          <h2 className="text-xl font-light text-muted-foreground tracking-wider">
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