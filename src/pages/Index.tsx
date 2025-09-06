import { useState } from 'react';
import { IntroSequence } from '@/components/IntroSequence';
import { WhoIsWatching } from '@/components/WhoIsWatching';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {showIntro ? (
        <IntroSequence onComplete={handleIntroComplete} />
      ) : (
        <WhoIsWatching />
      )}
    </div>
  );
};

export default Index;
