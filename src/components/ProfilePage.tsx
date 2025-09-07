import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Info, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import bitsLogo from '@/assets/bits-logo-new.png';
import profileRed from '@/assets/profile-red-new.png';
import profileBlue from '@/assets/profile-blue-new.png';
import profileYellow from '@/assets/profile-yellow-new.png';
import profileGreen from '@/assets/profile-green-new.png';
import { SportsContent } from '@/components/sports/SportsContent';
import { StudentLifeContent } from '@/components/student-life/StudentLifeContent';
import { AcademiaContent } from '@/components/academia/AcademiaContent';
import { NatureContent } from '@/components/nature/NatureContent';

const profileImages = {
  sports: profileRed,
  'student-life': profileBlue,
  academia: profileYellow,
  nature: profileGreen
};

const profileTitles = {
  sports: 'BSF 80 Days to go',
  'student-life': 'Student life at campus. ft. JASHN',
  academia: 'Academia in BPDC',
  nature: 'Nature & Sustainability'
};

const profileSubtitles = {
  sports: 'Experience the thrill of sports at BITS Pilani Dubai Campus',
  'student-life': 'Discover vibrant student life and campus culture',
  academia: 'Excellence in education and research',
  nature: 'Sustainable campus in harmony with nature'
};

export const ProfilePage = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();

  if (!profileId || !profileImages[profileId as keyof typeof profileImages]) {
    navigate('/');
    return null;
  }

  const renderContent = () => {
    switch (profileId) {
      case 'sports':
        return <SportsContent />;
      case 'student-life':
        return <StudentLifeContent />;
      case 'academia':
        return <AcademiaContent />;
      case 'nature':
        return <NatureContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center justify-between p-4">
          {/* Left side - BITS Logo */}
          <div className="flex items-center">
            <img 
              src={bitsLogo} 
              alt="BITS Pilani Dubai Campus" 
              className="h-12 w-auto object-contain"
            />
          </div>
          
          {/* Right side - Profile and Switch User */}
          <div className="flex items-center gap-4">
            <img
              src={profileImages[profileId as keyof typeof profileImages]}
              alt="Profile"
              className="w-10 h-10 rounded-md"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 text-sm"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Switch User
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - 85% of screen height */}
      <section className="relative h-[85vh] overflow-hidden">
        {/* Background Image or Carousel */}
        <div className="absolute inset-0">
          {profileId === 'academia' ? (
            // Automatic image carousel for academia
            <div className="relative w-full h-full">
              <img
                src="https://picsum.photos/1920/1080?random=academia"
                alt="Academia"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <img
              src={`https://picsum.photos/1920/1080?random=${profileId}`}
              alt={profileId}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative h-full flex items-end p-8 pt-24">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {profileTitles[profileId as keyof typeof profileTitles]}
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
              {profileSubtitles[profileId as keyof typeof profileSubtitles]}
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold px-8">
                <Play className="h-5 w-5 mr-2" />
                View Trailer
              </Button>
              <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-gray-800 border-2 px-6">
                <Info className="h-5 w-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-8 py-8 bg-black">
        {renderContent()}
      </section>
    </div>
  );
};