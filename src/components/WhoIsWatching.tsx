import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileGreen from '@/assets/profile-green-new.png';
import profileRed from '@/assets/profile-red-new.png';
import profileYellow from '@/assets/profile-yellow-new.png';
import profileBlue from '@/assets/profile-blue-new.png';

interface Profile {
  id: string;
  name: string;
  image: string;
  color: string;
}

const profiles: Profile[] = [
  {
    id: 'sports',
    name: 'Sports',
    image: profileRed,
    color: 'border-red-500 hover:border-red-400'
  },
  {
    id: 'student-life',
    name: 'Student Life', 
    image: profileBlue,
    color: 'border-blue-500 hover:border-blue-400'
  },
  {
    id: 'academia',
    name: 'Academia',
    image: profileYellow,
    color: 'border-yellow-500 hover:border-yellow-400'
  },
  {
    id: 'nature',
    name: 'Nature',
    image: profileGreen,
    color: 'border-green-500 hover:border-green-400'
  }
];

export const WhoIsWatching = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
    // Add a small delay for visual feedback
    setTimeout(() => {
      navigate(`/profile/${profileId}`);
    }, 150);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-4xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-4">
            Who's watching?
          </h1>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => handleProfileSelect(profile.id)}
            >
              {/* Profile Image */}
              <div className={`
                relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden 
                border-4 border-transparent transition-all duration-300 
                ${profile.color}
                ${selectedProfile === profile.id ? 'scale-95' : 'group-hover:scale-105'}
                netflix-shadow group-hover:netflix-shadow
              `}>
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Profile Name */}
              <div className={`
                mt-4 text-lg md:text-xl font-medium text-muted-foreground 
                group-hover:text-foreground transition-colors duration-300
                ${selectedProfile === profile.id ? 'text-foreground' : ''}
              `}>
                {profile.name}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground text-lg">
            Select a profile to explore BPDC
          </p>
        </div>
      </div>
    </div>
  );
};