import { useState } from 'react';
import { ChevronRight, Play, Plus, ThumbsUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface SportItem {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  images: string[];
  facilities: string[];
}

interface ContentSection {
  title: string;
  items: SportItem[];
}

const sportsContent: ContentSection[] = [
  {
    title: "Outdoor Campus Facilities",
    items: [
      {
        id: "basketball",
        title: "Basketball",
        thumbnail: "https://picsum.photos/400/600?random=basketball",
        description: "State-of-the-art outdoor basketball courts with professional-grade surfaces and lighting for evening games.",
        images: [
          "https://picsum.photos/800/600?random=basketball1",
          "https://picsum.photos/800/600?random=basketball2",
          "https://picsum.photos/800/600?random=basketball3"
        ],
        facilities: ["Professional courts", "Evening lighting", "Seating area"]
      },
      {
        id: "football",
        title: "Football",
        thumbnail: "https://picsum.photos/400/600?random=football",
        description: "Full-size football field with natural grass and modern facilities for training and matches.",
        images: [
          "https://picsum.photos/800/600?random=football1",
          "https://picsum.photos/800/600?random=football2",
          "https://picsum.photos/800/600?random=football3"
        ],
        facilities: ["Full-size field", "Natural grass", "Goal posts", "Dugouts"]
      },
      {
        id: "cricket",
        title: "Cricket",
        thumbnail: "https://picsum.photos/400/600?random=cricket",
        description: "Cricket ground with proper pitch and boundary markers for inter-hostel tournaments.",
        images: [
          "https://picsum.photos/800/600?random=cricket1",
          "https://picsum.photos/800/600?random=cricket2",
          "https://picsum.photos/800/600?random=cricket3"
        ],
        facilities: ["Turf pitch", "Boundary markers", "Pavilion", "Practice nets"]
      },
      {
        id: "volleyball",
        title: "Volleyball",
        thumbnail: "https://picsum.photos/400/600?random=volleyball",
        description: "Beach volleyball and regular volleyball courts for recreational and competitive play.",
        images: [
          "https://picsum.photos/800/600?random=volleyball1",
          "https://picsum.photos/800/600?random=volleyball2"
        ],
        facilities: ["Sand court", "Regular court", "Professional nets"]
      },
      {
        id: "track",
        title: "Track & Field",
        thumbnail: "https://picsum.photos/400/600?random=track",
        description: "Running track with field events area for athletics and fitness training.",
        images: [
          "https://picsum.photos/800/600?random=track1",
          "https://picsum.photos/800/600?random=track2"
        ],
        facilities: ["400m track", "Field events", "Starting blocks"]
      }
    ]
  },
  {
    title: "Indoor Campus Facilities",
    items: [
      {
        id: "badminton",
        title: "Badminton",
        thumbnail: "https://picsum.photos/400/600?random=badminton",
        description: "Multiple badminton courts with professional lighting and wooden flooring.",
        images: [
          "https://picsum.photos/800/600?random=badminton1",
          "https://picsum.photos/800/600?random=badminton2"
        ],
        facilities: ["4 courts", "Wooden flooring", "Professional nets"]
      },
      {
        id: "foosball",
        title: "Foosball",
        thumbnail: "https://picsum.photos/400/600?random=foosball",
        description: "Recreation room with multiple foosball tables for casual gaming.",
        images: [
          "https://picsum.photos/800/600?random=foosball1",
          "https://picsum.photos/800/600?random=foosball2"
        ],
        facilities: ["Professional tables", "Comfortable seating", "Air conditioning"]
      },
      {
        id: "table-tennis",
        title: "Table Tennis",
        thumbnail: "https://picsum.photos/400/600?random=tabletennis",
        description: "Dedicated table tennis room with tournament-quality tables.",
        images: [
          "https://picsum.photos/800/600?random=tabletennis1",
          "https://picsum.photos/800/600?random=tabletennis2"
        ],
        facilities: ["Competition tables", "Professional lighting", "Storage"]
      },
      {
        id: "boxing",
        title: "Boxing",
        thumbnail: "https://picsum.photos/400/600?random=boxing",
        description: "Boxing gym with heavy bags, speed bags, and training equipment.",
        images: [
          "https://picsum.photos/800/600?random=boxing1",
          "https://picsum.photos/800/600?random=boxing2"
        ],
        facilities: ["Heavy bags", "Speed bags", "Boxing ring", "Training mats"]
      },
      {
        id: "chess",
        title: "Chess",
        thumbnail: "https://picsum.photos/400/600?random=chess",
        description: "Quiet chess room for strategic thinking and tournaments.",
        images: [
          "https://picsum.photos/800/600?random=chess1"
        ],
        facilities: ["Tournament sets", "Digital clocks", "Comfortable seating"]
      },
      {
        id: "carrom",
        title: "Carrom",
        thumbnail: "https://picsum.photos/400/600?random=carrom",
        description: "Traditional carrom boards in a dedicated recreational space.",
        images: [
          "https://picsum.photos/800/600?random=carrom1"
        ],
        facilities: ["Professional boards", "Quality strikers", "Powder"]
      },
      {
        id: "gymnasium",
        title: "Gymnasium",
        thumbnail: "https://picsum.photos/400/600?random=gym",
        description: "Fully equipped gymnasium with modern fitness equipment and weights.",
        images: [
          "https://picsum.photos/800/600?random=gym1",
          "https://picsum.photos/800/600?random=gym2",
          "https://picsum.photos/800/600?random=gym3"
        ],
        facilities: ["Cardio equipment", "Weight training", "Free weights", "Mirrors"]
      }
    ]
  }
];

const clubImages = [
  "https://picsum.photos/1200/300?random=club1",
  "https://picsum.photos/1200/300?random=club2",
  "https://picsum.photos/1200/300?random=club3",
  "https://picsum.photos/1200/300?random=club4"
];

const bsfHighlights = [
  {
    id: "bsf1",
    title: "BSF Opening Ceremony",
    thumbnail: "https://picsum.photos/300/534?random=bsf1",
    description: "The grand opening ceremony of BITS Sports Festival with cultural performances and team presentations."
  },
  {
    id: "bsf2", 
    title: "Football Finals",
    thumbnail: "https://picsum.photos/300/534?random=bsf2",
    description: "Intense football championship final between top teams with spectacular goals and saves."
  },
  {
    id: "bsf3",
    title: "Basketball Highlights",
    thumbnail: "https://picsum.photos/300/534?random=bsf3", 
    description: "Best moments from basketball tournament featuring incredible dunks and three-pointers."
  },
  {
    id: "bsf4",
    title: "Athletics Day",
    thumbnail: "https://picsum.photos/300/534?random=bsf4",
    description: "Track and field events showcasing speed, strength, and determination of student athletes."
  }
];

export const SportsContent = () => {
  const [selectedItem, setSelectedItem] = useState<SportItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [clubImageIndex, setClubImageIndex] = useState(0);

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
    }
  };

  const nextClubImage = () => {
    setClubImageIndex((prev) => (prev + 1) % clubImages.length);
  };

  const prevClubImage = () => {
    setClubImageIndex((prev) => (prev - 1 + clubImages.length) % clubImages.length);
  };

  return (
    <>
      {/* Content Rows */}
      <div className="space-y-12">
        {sportsContent.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-2xl font-semibold text-white">
                {section.title}
              </h3>
              <div className="group flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
                <span className="text-sm">Explore All</span>
                <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="group flex-none cursor-pointer"
                  onClick={() => {
                    setSelectedItem(item);
                    setCurrentImageIndex(0);
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-48 h-72 object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white font-bold text-base mb-2">{item.title}</h4>
                        <p className="text-white/90 text-xs line-clamp-3 mb-3">{item.description.substring(0, 100)}...</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <Play className="w-4 h-4 text-black" />
                          </div>
                          <div className="w-8 h-8 bg-gray-800 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors">
                            <Plus className="w-4 h-4 text-white" />
                          </div>
                          <div className="w-8 h-8 bg-gray-800 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors">
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

        {/* Sports Club Section */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Sports Club</h3>
          <div className="relative">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src={clubImages[clubImageIndex]}
                alt="Sports Club"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={prevClubImage}
                >
                  <ChevronRight className="h-6 w-6 rotate-180" />
                </Button>
                <Button
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={nextClubImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4">
                <h4 className="text-white text-xl font-bold mb-2">Sports Club Activities</h4>
                <p className="text-white/90 text-sm max-w-md">Regular training sessions, tournaments, and team-building activities organized by the sports club.</p>
              </div>
            </div>
          </div>
        </div>

        {/* BSF Last Year Highlights */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">BSF Last Year Highlights</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {bsfHighlights.map((highlight) => (
              <div key={highlight.id} className="group flex-none cursor-pointer">
                <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105">
                  <img
                    src={highlight.thumbnail}
                    alt={highlight.title}
                    className="w-48 h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-bold text-base mb-2">{highlight.title}</h4>
                      <p className="text-white/90 text-xs line-clamp-3">{highlight.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-black ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0 bg-black border-0">
          {selectedItem && (
            <div className="flex h-[80vh]">
              {/* Image Carousel */}
              <div className="flex-1 relative">
                <img
                  src={selectedItem.images[currentImageIndex]}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={prevImage}
                    disabled={selectedItem.images.length <= 1}
                  >
                    <ChevronRight className="h-6 w-6 rotate-180" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={nextImage}
                    disabled={selectedItem.images.length <= 1}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              {/* Details Panel */}
              <div className="w-96 bg-black text-white p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">{selectedItem.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Facilities</h3>
                    <ul className="space-y-1">
                      {selectedItem.facilities.map((facility, index) => (
                        <li key={index} className="text-gray-300 text-sm">• {facility}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex gap-2 mb-2">
                      {selectedItem.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-gray-600'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      {currentImageIndex + 1} of {selectedItem.images.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};