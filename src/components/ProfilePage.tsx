import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Play, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  type: 'video' | 'event' | 'facility' | 'reel';
  description?: string;
  instagramUrl?: string;
}

interface ContentRow {
  title: string;
  items: ContentItem[];
}

const mockContent: Record<string, ContentRow[]> = {
  sports: [
    {
      title: "Featured Sports",
      items: [
        { id: "1", title: "BSF Football Championship", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "2", title: "Basketball Tournament 2024", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "3", title: "Swimming Pool", thumbnail: "/api/placeholder/300/168", type: "facility" },
        { id: "4", title: "Fitness Center", thumbnail: "/api/placeholder/300/168", type: "facility" },
      ]
    },
    {
      title: "Sports Facilities",
      items: [
        { id: "5", title: "Cricket Ground", thumbnail: "/api/placeholder/300/168", type: "facility" },
        { id: "6", title: "Tennis Courts", thumbnail: "/api/placeholder/300/168", type: "facility" },
        { id: "7", title: "Badminton Hall", thumbnail: "/api/placeholder/300/168", type: "facility" },
        { id: "8", title: "Volleyball Court", thumbnail: "/api/placeholder/300/168", type: "facility" },
      ]
    },
    {
      title: "Sports Reels",
      items: [
        { 
          id: "9", 
          title: "Victory Celebration", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/sample1/"
        },
        { 
          id: "10", 
          title: "Training Highlights", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/sample2/"
        },
        { 
          id: "11", 
          title: "Team Spirit", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/sample3/"
        },
        { 
          id: "12", 
          title: "Match Day", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/sample4/"
        },
      ]
    }
  ],
  "student-life": [
    {
      title: "Campus Life Highlights",
      items: [
        { id: "1", title: "ATMOS Festival", thumbnail: "/api/placeholder/300/168", type: "event" },
        { id: "2", title: "Cafeteria Life", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "3", title: "Student Societies", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "4", title: "Cultural Night", thumbnail: "/api/placeholder/300/168", type: "event" },
      ]
    },
    {
      title: "Clubs & Societies",
      items: [
        { id: "5", title: "Robotics Club", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "6", title: "Drama Society", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "7", title: "Music Club", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "8", title: "Photography Club", thumbnail: "/api/placeholder/300/168", type: "video" },
      ]
    },
    {
      title: "Student Life Reels",
      items: [
        { 
          id: "9", 
          title: "Campus Events", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/studentlife1/"
        },
        { 
          id: "10", 
          title: "Club Activities", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/studentlife2/"
        },
      ]
    }
  ],
  academia: [
    {
      title: "Academic Excellence",
      items: [
        { id: "1", title: "Research Labs", thumbnail: "/api/placeholder/300/168", type: "facility" },
        { id: "2", title: "Library Tours", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "3", title: "Innovation Projects", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "4", title: "Faculty Lectures", thumbnail: "/api/placeholder/300/168", type: "video" },
      ]
    },
    {
      title: "Departments",
      items: [
        { id: "5", title: "Computer Science", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "6", title: "Mechanical Engineering", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "7", title: "Electronics", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "8", title: "Chemical Engineering", thumbnail: "/api/placeholder/300/168", type: "video" },
      ]
    },
    {
      title: "Academic Reels",
      items: [
        { 
          id: "9", 
          title: "Lab Experiments", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/academia1/"
        },
        { 
          id: "10", 
          title: "Research Highlights", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/academia2/"
        },
      ]
    }
  ],
  nature: [
    {
      title: "Campus Green Spaces",
      items: [
        { id: "1", title: "Central Courtyard", thumbnail: "/api/placeholder/300/168", type: "facility" },
        { id: "2", title: "Garden Areas", thumbnail: "/api/placeholder/300/168", type: "facility" },
        { id: "3", title: "Sustainability Projects", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "4", title: "Eco-friendly Initiatives", thumbnail: "/api/placeholder/300/168", type: "video" },
      ]
    },
    {
      title: "Environmental Activities",
      items: [
        { id: "5", title: "Tree Plantation", thumbnail: "/api/placeholder/300/168", type: "event" },
        { id: "6", title: "Green Week", thumbnail: "/api/placeholder/300/168", type: "event" },
        { id: "7", title: "Nature Photography", thumbnail: "/api/placeholder/300/168", type: "video" },
        { id: "8", title: "Campus Birds", thumbnail: "/api/placeholder/300/168", type: "video" },
      ]
    },
    {
      title: "Nature Reels",
      items: [
        { 
          id: "9", 
          title: "Campus Wildlife", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/nature1/"
        },
        { 
          id: "10", 
          title: "Green Initiatives", 
          thumbnail: "/api/placeholder/300/168", 
          type: "reel",
          instagramUrl: "https://www.instagram.com/reel/nature2/"
        },
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className={`text-2xl font-semibold capitalize ${colorClass}`}>
              {profileId.replace('-', ' ')}
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-black/80 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/api/placeholder/1920/1080)' }}
        />
        <div className="relative h-full flex items-end p-8 pt-24">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Explore {profileId.replace('-', ' ')} at BPDC
            </h2>
            <p className="text-lg text-gray-200 mb-6 max-w-xl">
              Discover the vibrant {profileId.replace('-', ' ')} culture and opportunities 
              available at BITS Pilani Dubai Campus.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                <Play className="h-5 w-5 mr-2" />
                Play
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Info className="h-5 w-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <section className="px-8 py-8 space-y-12">
        {content.map((row, rowIndex) => (
          <div key={rowIndex}>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              {row.title}
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {row.items.map((item) => (
                <Card 
                  key={item.id} 
                  className="flex-shrink-0 w-72 bg-card hover:bg-accent transition-colors cursor-pointer netflix-hover"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      {item.type === 'reel' ? (
                        <ExternalLink className="h-12 w-12 text-white" />
                      ) : (
                        <Play className="h-12 w-12 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-foreground mb-2">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${colorClass} bg-accent`}>
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Modal for content details */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem?.type === 'reel' && selectedItem.instagramUrl ? (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  This content is available on Instagram. Click below to view the reel.
                </p>
                <Button 
                  onClick={() => window.open(selectedItem.instagramUrl, '_blank')}
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Instagram Reel
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                  <img 
                    src={selectedItem?.thumbnail} 
                    alt={selectedItem?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white" />
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {selectedItem?.description || "Explore this content from BPDC."}
                </p>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Play Content
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};