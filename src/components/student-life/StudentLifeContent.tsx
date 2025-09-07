import { useState } from 'react';
import { ChevronRight, Play, Plus, ThumbsUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  images: string[];
  details: string[];
}

const campusActivities = [
  {
    id: "karaoke",
    title: "Karaoke Night ft. Treble",
    thumbnail: "https://picsum.photos/400/600?random=karaoke",
    description: "Musical nights where students showcase their vocal talents with live performances and singing competitions.",
    images: [
      "https://picsum.photos/800/600?random=karaoke1",
      "https://picsum.photos/800/600?random=karaoke2"
    ],
    details: ["Weekly events", "Live music", "Student performances", "Prizes"]
  },
  {
    id: "movie",
    title: "Movie Night ft. Paribasha",
    thumbnail: "https://picsum.photos/400/600?random=movie",
    description: "Outdoor movie screenings under the stars with popcorn and a cozy atmosphere for the campus community.",
    images: [
      "https://picsum.photos/800/600?random=movie1",
      "https://picsum.photos/800/600?random=movie2"
    ],
    details: ["Outdoor screenings", "Latest movies", "Free snacks", "Community bonding"]
  },
  {
    id: "games",
    title: "Games Night ft. Student Council",
    thumbnail: "https://picsum.photos/400/600?random=games",
    description: "Board games, video games, and interactive activities organized by the student council for recreational fun.",
    images: [
      "https://picsum.photos/800/600?random=games1",
      "https://picsum.photos/800/600?random=games2"
    ],
    details: ["Board games", "Video games", "Team activities", "Prizes and fun"]
  }
];

const clubs = [
  {
    id: "shades",
    title: "Shades (Art)",
    thumbnail: "https://picsum.photos/400/600?random=art",
    description: "Creative arts club fostering artistic expression through painting, sketching, and digital art.",
    images: ["https://picsum.photos/800/600?random=art1", "https://picsum.photos/800/600?random=art2"],
    details: ["Art workshops", "Exhibitions", "Digital art", "Creative projects"]
  },
  {
    id: "supernova",
    title: "Supernova (Astronomy)",
    thumbnail: "https://picsum.photos/400/600?random=astronomy",
    description: "Astronomy club for stargazing, space exploration discussions, and celestial observations.",
    images: ["https://picsum.photos/800/600?random=astronomy1"],
    details: ["Stargazing sessions", "Telescope observations", "Space talks", "Planetarium visits"]
  },
  {
    id: "groove",
    title: "Groove (Dance)",
    thumbnail: "https://picsum.photos/400/600?random=dance",
    description: "Dance club featuring various dance forms from hip-hop to classical with regular performances.",
    images: ["https://picsum.photos/800/600?random=dance1", "https://picsum.photos/800/600?random=dance2"],
    details: ["Dance workshops", "Performances", "Competitions", "Cultural shows"]
  },
  {
    id: "flummoxed",
    title: "Flummoxed (Quiz)",
    thumbnail: "https://picsum.photos/400/600?random=quiz",
    description: "Quiz club testing knowledge across various domains with weekly quizzes and competitions.",
    images: ["https://picsum.photos/800/600?random=quiz1"],
    details: ["Weekly quizzes", "Inter-college competitions", "Knowledge sessions", "Brain teasers"]
  },
  {
    id: "expressions",
    title: "Expressions (Public Speaking)",
    thumbnail: "https://picsum.photos/400/600?random=speaking",
    description: "Public speaking club helping students develop communication and presentation skills.",
    images: ["https://picsum.photos/800/600?random=speaking1"],
    details: ["Speech training", "Debate competitions", "Presentation skills", "Confidence building"]
  },
  {
    id: "wallstreet",
    title: "Wall Street (Finance)",
    thumbnail: "https://picsum.photos/400/600?random=finance",
    description: "Finance club focusing on investment strategies, market analysis, and financial literacy.",
    images: ["https://picsum.photos/800/600?random=finance1"],
    details: ["Investment workshops", "Market analysis", "Financial planning", "Trading simulations"]
  },
  {
    id: "mad",
    title: "MAD (Social & Environment)",
    thumbnail: "https://picsum.photos/400/600?random=environment",
    description: "Social and environmental awareness club promoting sustainability and community service.",
    images: ["https://picsum.photos/800/600?random=environment1"],
    details: ["Environmental campaigns", "Community service", "Awareness drives", "Sustainability projects"]
  },
  {
    id: "guild",
    title: "The Guild (Gaming)",
    thumbnail: "https://picsum.photos/400/600?random=gaming",
    description: "Gaming club for esports, board games, and gaming tournaments across various platforms.",
    images: ["https://picsum.photos/800/600?random=gaming1"],
    details: ["Esports tournaments", "Gaming sessions", "Board games", "Inter-college competitions"]
  }
];

const associations = [
  {
    id: "acm",
    title: "ACM",
    thumbnail: "https://picsum.photos/400/600?random=acm",
    description: "Association for Computing Machinery - advancing computing as a science and profession.",
    images: ["https://picsum.photos/800/600?random=acm1"],
    details: ["Programming contests", "Tech talks", "Workshops", "Research projects"]
  },
  {
    id: "ieee",
    title: "IEEE",
    thumbnail: "https://picsum.photos/400/600?random=ieee",
    description: "Institute of Electrical and Electronics Engineers - advancing technology for humanity.",
    images: ["https://picsum.photos/800/600?random=ieee1"],
    details: ["Technical seminars", "Innovation projects", "Industry connections", "Research papers"]
  },
  {
    id: "aoee",
    title: "AOEE",
    thumbnail: "https://picsum.photos/400/600?random=aoee",
    description: "Association of Electrical and Electronics Engineers - fostering technical excellence.",
    images: ["https://picsum.photos/800/600?random=aoee1"],
    details: ["Technical projects", "Skill development", "Industry exposure", "Innovation labs"]
  },
  {
    id: "aiche",
    title: "AIChE",
    thumbnail: "https://picsum.photos/400/600?random=aiche",
    description: "American Institute of Chemical Engineers - advancing chemical engineering profession.",
    images: ["https://picsum.photos/800/600?random=aiche1"],
    details: ["Process design", "Safety workshops", "Industry visits", "Research collaborations"]
  },
  {
    id: "asme",
    title: "ASME",
    thumbnail: "https://picsum.photos/400/600?random=asme",
    description: "American Society of Mechanical Engineers - promoting mechanical engineering arts and sciences.",
    images: ["https://picsum.photos/800/600?random=asme1"],
    details: ["Design competitions", "Manufacturing workshops", "Industry mentorship", "Technical skills"]
  },
  {
    id: "ashrae",
    title: "ASHRAE",
    thumbnail: "https://picsum.photos/400/600?random=ashrae",
    description: "American Society of Heating, Refrigerating and Air-Conditioning Engineers.",
    images: ["https://picsum.photos/800/600?random=ashrae1"],
    details: ["HVAC systems", "Energy efficiency", "Sustainable design", "Building systems"]
  },
  {
    id: "gdsc",
    title: "GDSC",
    thumbnail: "https://picsum.photos/400/600?random=gdsc",
    description: "Google Developer Student Clubs - connecting students with Google developer technologies.",
    images: ["https://picsum.photos/800/600?random=gdsc1"],
    details: ["Google technologies", "App development", "Web development", "Machine learning"]
  },
  {
    id: "mtc",
    title: "MTC",
    thumbnail: "https://picsum.photos/400/600?random=mtc",
    description: "Mathematics and Technology Club - exploring mathematical concepts and their applications.",
    images: ["https://picsum.photos/800/600?random=mtc1"],
    details: ["Mathematical modeling", "Data analysis", "Algorithm design", "Problem solving"]
  },
  {
    id: "lug",
    title: "LUG",
    thumbnail: "https://picsum.photos/400/600?random=lug",
    description: "Linux Users Group - promoting open source software and Linux systems.",
    images: ["https://picsum.photos/800/600?random=lug1"],
    details: ["Open source projects", "Linux workshops", "System administration", "Free software advocacy"]
  }
];

const libraryImages = [
  "https://picsum.photos/1200/300?random=library1",
  "https://picsum.photos/1200/300?random=library2",
  "https://picsum.photos/1200/300?random=library3"
];

const canteenImages = [
  "https://picsum.photos/400/533?random=canteen1",
  "https://picsum.photos/400/533?random=canteen2",
  "https://picsum.photos/400/533?random=canteen3"
];

const minimartImages = [
  "https://picsum.photos/400/533?random=minimart1",
  "https://picsum.photos/400/533?random=minimart2"
];

const hostels = [
  {
    id: "oncampus",
    title: "On Campus",
    thumbnail: "https://picsum.photos/400/600?random=oncampus",
    description: "On-campus accommodation providing convenient access to all facilities with modern amenities.",
    images: ["https://picsum.photos/800/600?random=oncampus1", "https://picsum.photos/800/600?random=oncampus2"],
    details: ["24/7 security", "WiFi", "Laundry", "Common rooms", "Study areas"]
  },
  {
    id: "imt",
    title: "IMT",
    thumbnail: "https://picsum.photos/400/600?random=imt",
    description: "IMT hostel offering comfortable living spaces with excellent facilities for students.",
    images: ["https://picsum.photos/800/600?random=imt1", "https://picsum.photos/800/600?random=imt2"],
    details: ["Modern rooms", "Dining facility", "Recreation area", "Security", "Maintenance"]
  },
  {
    id: "studyworld",
    title: "Study World",
    thumbnail: "https://picsum.photos/400/600?random=studyworld",
    description: "Study World accommodation focused on providing a conducive environment for academic success.",
    images: ["https://picsum.photos/800/600?random=studyworld1"],
    details: ["Study-friendly environment", "Quiet zones", "Library access", "Academic support"]
  }
];

const hostelRecImages = [
  "https://picsum.photos/1200/300?random=hostelrec1",
  "https://picsum.photos/1200/300?random=hostelrec2",
  "https://picsum.photos/1200/300?random=hostelrec3"
];

export const StudentLifeContent = () => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [libraryImageIndex, setLibraryImageIndex] = useState(0);
  const [canteenImageIndex, setCanteenImageIndex] = useState(0);
  const [minimartImageIndex, setMinimartImageIndex] = useState(0);
  const [hostelRecImageIndex, setHostelRecImageIndex] = useState(0);

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

  return (
    <>
      <div className="space-y-12">
        {/* Campus Activities */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-white">Campus Activities</h3>
            <div className="group flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <span className="text-sm">Explore All</span>
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {campusActivities.map((item) => (
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

        {/* Clubs at BPDC */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Clubs at BPDC</h3>
          
          {/* Split clubs into rows of 4 */}
          {[0, 1, 2].map((rowIndex) => (
            <div key={rowIndex} className="mb-6">
              <div className="grid grid-cols-4 gap-4">
                {clubs.slice(rowIndex * 4, (rowIndex + 1) * 4).map((club) => (
                  <div
                    key={club.id}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedItem(club);
                      setCurrentImageIndex(0);
                    }}
                  >
                    <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105">
                      <img
                        src={club.thumbnail}
                        alt={club.title}
                        className="w-full h-64 object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h4 className="text-white font-bold text-sm mb-1">{club.title}</h4>
                          <p className="text-white/90 text-xs line-clamp-2">{club.description.substring(0, 80)}...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Associations at BPDC */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Associations at BPDC</h3>
          
          {/* Split associations into rows of 3 */}
          {[0, 1, 2].map((rowIndex) => (
            <div key={rowIndex} className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                {associations.slice(rowIndex * 3, (rowIndex + 1) * 3).map((association) => (
                  <div
                    key={association.id}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedItem(association);
                      setCurrentImageIndex(0);
                    }}
                  >
                    <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105">
                      <img
                        src={association.thumbnail}
                        alt={association.title}
                        className="w-full h-64 object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h4 className="text-white font-bold text-sm mb-1">{association.title}</h4>
                          <p className="text-white/90 text-xs line-clamp-2">{association.description.substring(0, 80)}...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Library */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Library</h3>
          <div className="relative h-64 rounded-lg overflow-hidden cursor-pointer">
            <img
              src={libraryImages[libraryImageIndex]}
              alt="Library"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setLibraryImageIndex((prev) => (prev - 1 + libraryImages.length) % libraryImages.length)}
              >
                <ChevronRight className="h-6 w-6 rotate-180" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setLibraryImageIndex((prev) => (prev + 1) % libraryImages.length)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4">
              <h4 className="text-white text-xl font-bold mb-2">BPDC Library</h4>
              <p className="text-white/90 text-sm max-w-md">Modern library with extensive collection of books, digital resources, and quiet study spaces.</p>
            </div>
          </div>
        </div>

        {/* Canteen and Mini Mart */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Canteen */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Canteen</h3>
              <div className="relative h-80 rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={canteenImages[canteenImageIndex]}
                  alt="Canteen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setCanteenImageIndex((prev) => (prev - 1 + canteenImages.length) % canteenImages.length)}
                  >
                    <ChevronRight className="h-6 w-6 rotate-180" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setCanteenImageIndex((prev) => (prev + 1) % canteenImages.length)}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white text-lg font-bold mb-2">Campus Canteen</h4>
                  <p className="text-white/90 text-sm">Diverse food options from local to international cuisine.</p>
                </div>
              </div>
            </div>

            {/* Mini Mart */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Mini Mart</h3>
              <div className="relative h-80 rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={minimartImages[minimartImageIndex]}
                  alt="Mini Mart"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setMinimartImageIndex((prev) => (prev - 1 + minimartImages.length) % minimartImages.length)}
                  >
                    <ChevronRight className="h-6 w-6 rotate-180" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setMinimartImageIndex((prev) => (prev + 1) % minimartImages.length)}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white text-lg font-bold mb-2">Campus Mini Mart</h4>
                  <p className="text-white/90 text-sm">Essential items and snacks available on campus.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hostels */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Hostels</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {hostels.map((hostel) => (
              <div
                key={hostel.id}
                className="group flex-none cursor-pointer"
                onClick={() => {
                  setSelectedItem(hostel);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105">
                  <img
                    src={hostel.thumbnail}
                    alt={hostel.title}
                    className="w-48 h-72 object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-bold text-base mb-2">{hostel.title}</h4>
                      <p className="text-white/90 text-xs line-clamp-3 mb-3">{hostel.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hostel Recreational Area */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Hostel Recreational Area</h3>
          <div className="relative h-64 rounded-lg overflow-hidden cursor-pointer">
            <img
              src={hostelRecImages[hostelRecImageIndex]}
              alt="Hostel Recreation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setHostelRecImageIndex((prev) => (prev - 1 + hostelRecImages.length) % hostelRecImages.length)}
              >
                <ChevronRight className="h-6 w-6 rotate-180" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setHostelRecImageIndex((prev) => (prev + 1) % hostelRecImages.length)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4">
              <h4 className="text-white text-xl font-bold mb-2">Recreation Areas</h4>
              <p className="text-white/90 text-sm max-w-md">Common areas with entertainment facilities, gaming zones, and social spaces for hostel residents.</p>
            </div>
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
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <ul className="space-y-1">
                      {selectedItem.details.map((detail, index) => (
                        <li key={index} className="text-gray-300 text-sm">• {detail}</li>
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