import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Play, Info, ExternalLink, Plus, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  type: 'video' | 'event' | 'facility' | 'reel';
  description: string;
  instagramUrl?: string;
}

interface ContentRow {
  title: string;
  items: ContentItem[];
}

// Mock content data for different profiles
const mockContent: Record<string, ContentRow[]> = {
  'sports': [
    {
      title: "Campus Sports Highlights",
      items: [
        {
          id: "1",
          title: "Cricket Championship Finals",
          thumbnail: "https://picsum.photos/300/450?random=1",
          type: "reel",
          description: "An intense inter-hostel cricket championship that had everyone on the edge of their seats. Watch as our team pulls off incredible catches, stunning boundaries, and nail-biting moments that define the spirit of BITS sports culture.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId1/"
        },
        {
          id: "2", 
          title: "Basketball Tournament Glory",
          thumbnail: "https://picsum.photos/300/450?random=2",
          type: "reel",
          description: "The most anticipated basketball tournament of the year featuring incredible plays, team spirit, and unforgettable moments. Experience the energy and passion that makes BITS sports legendary.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId2/"
        },
        {
          id: "3",
          title: "Football Training Sessions",
          thumbnail: "https://picsum.photos/300/450?random=3", 
          type: "reel",
          description: "Behind the scenes of our football team's rigorous training routine. See the dedication, teamwork, and skill development that goes into making champions.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId3/"
        },
        {
          id: "4",
          title: "Swimming Competition",
          thumbnail: "https://picsum.photos/300/450?random=4",
          type: "reel", 
          description: "Dive into the excitement of our annual swimming competition featuring record-breaking performances and incredible athletic prowess.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId4/"
        },
        {
          id: "5",
          title: "Badminton Championships",
          thumbnail: "https://picsum.photos/300/450?random=5",
          type: "reel",
          description: "Fast-paced badminton action showcasing precision, agility, and competitive spirit in our indoor sports complex.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId5/"
        }
      ]
    },
    {
      title: "Fitness & Training",
      items: [
        {
          id: "6",
          title: "Gym Sessions",
          thumbnail: "https://picsum.photos/300/450?random=6",
          type: "reel",
          description: "State-of-the-art fitness facilities and training routines that keep our athletes in peak condition.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId6/"
        },
        {
          id: "7",
          title: "Yoga & Wellness",
          thumbnail: "https://picsum.photos/300/450?random=7",
          type: "reel",
          description: "Morning yoga sessions and wellness activities that promote mental and physical well-being.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId7/"
        }
      ]
    }
  ],
  'student-life': [
    {
      title: "Campus Moments",
      items: [
        {
          id: "8",
          title: "Dorm Life Adventures",
          thumbnail: "https://picsum.photos/300/450?random=8",
          type: "reel",
          description: "The authentic hostel experience - late night conversations, shared meals, lifelong friendships, and memories that define the BITS journey.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId8/"
        },
        {
          id: "9",
          title: "Campus Food Culture",
          thumbnail: "https://picsum.photos/300/450?random=9",
          type: "reel",
          description: "From mess food adventures to late-night snack runs, explore the diverse culinary experiences that fuel student life at BITS.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId9/"
        },
        {
          id: "10",
          title: "Study Group Sessions",
          thumbnail: "https://picsum.photos/300/450?random=10",
          type: "reel",
          description: "Collaborative learning, midnight study sessions, and the academic hustle that shapes brilliant minds at BITS.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId10/"
        }
      ]
    },
    {
      title: "Events & Celebrations",
      items: [
        {
          id: "11",
          title: "Cultural Festival",
          thumbnail: "https://picsum.photos/300/450?random=11",
          type: "reel",
          description: "Annual cultural celebrations bringing together talent, creativity, and diversity from across the campus.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId11/"
        },
        {
          id: "12",
          title: "Fresher's Welcome",
          thumbnail: "https://picsum.photos/300/450?random=12",
          type: "reel",
          description: "The warm welcome that begins every BITS journey - orientation, new friendships, and exciting beginnings.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId12/"
        }
      ]
    }
  ],
  'academia': [
    {
      title: "Academic Excellence",
      items: [
        {
          id: "13",
          title: "Research Projects",
          thumbnail: "https://picsum.photos/300/450?random=13",
          type: "reel",
          description: "Cutting-edge research initiatives and innovation projects that showcase BITS' commitment to academic excellence and technological advancement.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId13/"
        },
        {
          id: "14",
          title: "Laboratory Experiments",
          thumbnail: "https://picsum.photos/300/450?random=14",
          type: "reel",
          description: "State-of-the-art laboratories where theory meets practice, fostering hands-on learning and scientific discovery.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId14/"
        },
        {
          id: "15",
          title: "Lecture Hall Insights",
          thumbnail: "https://picsum.photos/300/450?random=15",
          type: "reel",
          description: "Dynamic classroom discussions and engaging lectures that shape the intellectual growth of future engineers and leaders.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId15/"
        }
      ]
    }
  ],
  'nature': [
    {
      title: "Campus Beauty",
      items: [
        {
          id: "16",
          title: "Desert Landscape",
          thumbnail: "https://picsum.photos/300/450?random=16",
          type: "reel",
          description: "The stunning desert backdrop that surrounds BITS Pilani Dubai, creating a unique learning environment amidst natural beauty.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId16/"
        },
        {
          id: "17",
          title: "Campus Gardens",
          thumbnail: "https://picsum.photos/300/450?random=17",
          type: "reel",
          description: "Beautifully maintained green spaces and gardens that provide a peaceful retreat for students and faculty.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId17/"
        },
        {
          id: "18",
          title: "Sunset Views",
          thumbnail: "https://picsum.photos/300/450?random=18",
          type: "reel",
          description: "Breathtaking sunset views from campus that remind us of the beauty surrounding our academic journey.",
          instagramUrl: "https://www.instagram.com/reel/CrandomId18/"
        }
      ]
    }
  ]
};

const profileColors = {
  sports: 'text-profiles-sports',
  'student-life': 'text-profiles-student',
  academia: 'text-profiles-academia',
  nature: 'text-profiles-nature'
};

export const ProfilePage = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  if (!profileId || !mockContent[profileId]) {
    navigate('/');
    return null;
  }

  const content = mockContent[profileId];
  const colorClass = profileColors[profileId as keyof typeof profileColors];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold capitalize text-white">
              {profileId.replace('-', ' ')}
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'https://picsum.photos/1920/1080?random=hero' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative h-full flex items-end p-8 pt-24">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {profileId.replace('-', ' ')} at BPDC
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
              Discover the vibrant {profileId.replace('-', ' ')} culture and opportunities 
              available at BITS Pilani Dubai Campus through authentic student perspectives.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold px-8">
                <Play className="h-5 w-5 mr-2" />
                Play
              </Button>
              <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-gray-800 border-2 px-6">
                <Info className="h-5 w-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <section className="px-8 py-8 space-y-12 bg-black">
        {content.map((row, rowIndex) => (
          <div key={rowIndex}>
            <h3 className="text-2xl font-semibold mb-6 text-white">
              {row.title}
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {row.items.map((item) => (
                <div
                  key={item.id}
                  className="group flex-none cursor-pointer relative"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:z-10">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-48 h-72 object-cover transition-transform duration-300"
                    />
                    
                    {/* Netflix-style overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-white font-bold text-base mb-2">{item.title}</h4>
                        <p className="text-white/90 text-xs line-clamp-3 mb-3">{item.description.substring(0, 120)}...</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                            <Play className="w-4 h-4 text-black" />
                          </div>
                          <div className="w-8 h-8 bg-gray-800 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors cursor-pointer">
                            <Plus className="w-4 h-4 text-white" />
                          </div>
                          <div className="w-8 h-8 bg-gray-800 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors cursor-pointer">
                            <ThumbsUp className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Netflix-style detailed modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-black border-0">
          {selectedItem && (
            <div className="relative">
              {/* Hero section with background image */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={selectedItem.thumbnail}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Content over hero image */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h1 className="text-4xl font-bold text-white mb-4">{selectedItem.title}</h1>
                  <div className="flex items-center space-x-4 mb-6">
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-gray-200 font-semibold px-8"
                      onClick={() => window.open(selectedItem.instagramUrl, '_blank')}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-gray-400 text-white hover:bg-gray-800 border-2 px-6"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      My List
                    </Button>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Details section */}
              <div className="p-8 bg-black text-white">
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">About this content</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedItem.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="text-gray-400 w-20">Type:</span>
                        <span className="text-white capitalize">{selectedItem.type}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-20">Duration:</span>
                        <span className="text-white">Short Form Content</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-20">Platform:</span>
                        <span className="text-white">Instagram Reels</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">GENRES</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-800 rounded text-sm">Campus Life</span>
                        <span className="px-2 py-1 bg-gray-800 rounded text-sm">Student Experience</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">FEATURES</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Authentic student perspective</li>
                        <li>• Behind-the-scenes content</li>
                        <li>• Campus community highlights</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};