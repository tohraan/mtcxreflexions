import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

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

    // Netflix-style line animation
    tl.to(linesRef.current, {
      duration: 1.5,
      scaleX: 1,
      opacity: 1,
      ease: "power2.out"
    })
    // Logo reveal
    .to(logoRef.current, {
      duration: 1,
      scale: 1,
      opacity: 1,
      y: 0,
      ease: "back.out(1.7)"
    }, "-=0.5")
    // Subtitle fade in
    .to(subtitleRef.current, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    }, "-=0.3")
    // Hold for a moment
    .to({}, { duration: 1.5 })
    // Fade out
    .to(containerRef.current, {
      duration: 0.8,
      opacity: 0,
      ease: "power2.out"
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
      {/* Netflix-inspired light streaks background */}
      <div
        ref={linesRef}
        className="absolute inset-0 opacity-0 scale-x-0"
        style={{
          background: `
            linear-gradient(45deg, transparent 40%, rgba(229, 9, 20, 0.1) 45%, rgba(229, 9, 20, 0.3) 50%, rgba(229, 9, 20, 0.1) 55%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(229, 9, 20, 0.1) 45%, rgba(229, 9, 20, 0.2) 50%, rgba(229, 9, 20, 0.1) 55%, transparent 60%),
            linear-gradient(90deg, transparent 30%, rgba(229, 9, 20, 0.05) 50%, transparent 70%)
          `,
          backgroundSize: '200% 200%, 200% 200%, 100% 100%',
          animation: hasStarted ? 'reveal 2s ease-out' : 'none'
        }}
      />

      {/* Main content */}
      <div className="text-center z-10">
        {/* BITS Logo - now visible initially */}
        <div
          ref={logoRef}
          className="mb-8 opacity-100 scale-100 translate-y-0"
        >
          <div className="w-32 h-32 mx-auto bg-primary rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground netflix-shadow">
            BITS
          </div>
        </div>

        {/* Subtitle - now visible initially */}
        <div
          ref={subtitleRef}
          className="opacity-100 translate-y-0"
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