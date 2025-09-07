import { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
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

const naturePlaces = [
  {
    id: "tree-plantation",
    title: "Tree Plantation",
    thumbnail: "https://picsum.photos/400/600?random=trees",
    description: "Campus-wide tree plantation initiatives creating a green and sustainable environment for learning.",
    images: [
      "https://picsum.photos/800/600?random=trees1",
      "https://picsum.photos/800/600?random=trees2",
      "https://picsum.photos/800/600?random=trees3"
    ],
    details: ["Native species", "Sustainability program", "Student involvement", "Environmental education"]
  },
  {
    id: "academic-city",
    title: "Academic City",
    thumbnail: "https://picsum.photos/400/600?random=academiccity",
    description: "The beautiful Academic City surroundings with modern architecture blending with natural landscapes.",
    images: [
      "https://picsum.photos/800/600?random=academiccity1",
      "https://picsum.photos/800/600?random=academiccity2",
      "https://picsum.photos/800/600?random=academiccity3"
    ],
    details: ["Modern architecture", "Urban planning", "Green spaces", "Educational district"]
  }
];

const gardenImages = [
  "https://picsum.photos/1200/300?random=garden1",
  "https://picsum.photos/1200/300?random=garden2",
  "https://picsum.photos/1200/300?random=garden3"
];

const sunsetImages = [
  "https://picsum.photos/1200/300?random=sunset1",
  "https://picsum.photos/1200/300?random=sunset2",
  "https://picsum.photos/1200/300?random=sunset3"
];

export const NatureContent = () => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gardenImageIndex, setGardenImageIndex] = useState(0);
  const [sunsetImageIndex, setSunsetImageIndex] = useState(0);

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
        {/* Campus Beauty Section */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Campus Beauty</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {naturePlaces.map((place) => (
              <div
                key={place.id}
                className="group flex-none cursor-pointer"
                onClick={() => {
                  setSelectedItem(place);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105">
                  <img
                    src={place.thumbnail}
                    alt={place.title}
                    className="w-48 h-72 object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-bold text-base mb-2">{place.title}</h4>
                      <p className="text-white/90 text-xs line-clamp-3">{place.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Gardens */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Campus Gardens</h3>
          <div className="relative h-64 rounded-lg overflow-hidden cursor-pointer">
            <img
              src={gardenImages[gardenImageIndex]}
              alt="Campus Gardens"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setGardenImageIndex((prev) => (prev - 1 + gardenImages.length) % gardenImages.length)}
              >
                <ChevronRight className="h-6 w-6 rotate-180" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setGardenImageIndex((prev) => (prev + 1) % gardenImages.length)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4">
              <h4 className="text-white text-xl font-bold mb-2">Beautiful Garden Spaces</h4>
              <p className="text-white/90 text-sm max-w-md">Landscaped gardens providing peaceful study areas and natural beauty throughout the campus.</p>
            </div>
          </div>
        </div>

        {/* Desert Landscape View */}
        <div className="relative h-80 rounded-lg overflow-hidden bg-gradient-to-br from-orange-600 to-red-700">
          <div className="absolute inset-0">
            <img
              src="https://picsum.photos/1200/400?random=desert"
              alt="Desert Landscape"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-2xl px-8">
              <h4 className="text-white text-3xl font-bold mb-4">Desert Landscape</h4>
              <p className="text-white/90 text-lg leading-relaxed">
                Experience the unique beauty of Dubai's desert landscape surrounding our campus. 
                The stunning desert backdrop creates a distinctive learning environment where modern education meets natural wonder.
              </p>
            </div>
          </div>
        </div>

        {/* Sunset Views */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Sunset Views</h3>
          <div className="relative h-64 rounded-lg overflow-hidden cursor-pointer">
            <img
              src={sunsetImages[sunsetImageIndex]}
              alt="Sunset Views"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setSunsetImageIndex((prev) => (prev - 1 + sunsetImages.length) % sunsetImages.length)}
              >
                <ChevronRight className="h-6 w-6 rotate-180" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setSunsetImageIndex((prev) => (prev + 1) % sunsetImages.length)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4">
              <h4 className="text-white text-xl font-bold mb-2">Breathtaking Sunsets</h4>
              <p className="text-white/90 text-sm max-w-md">End your day with spectacular sunset views from campus that paint the sky in vibrant colors.</p>
            </div>
          </div>
        </div>

        {/* Wildlife and Biodiversity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-green-600 to-green-800">
            <div className="absolute inset-0">
              <img
                src="https://picsum.photos/600/400?random=birds"
                alt="Campus Wildlife"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <h4 className="text-white text-xl font-bold mb-2">Campus Wildlife</h4>
                <p className="text-white/90 text-sm">Discover the diverse wildlife that calls our campus home, from native birds to desert flora.</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-700">
            <div className="absolute inset-0">
              <img
                src="https://picsum.photos/600/400?random=water"
                alt="Water Features"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <h4 className="text-white text-xl font-bold mb-2">Water Features</h4>
                <p className="text-white/90 text-sm">Tranquil water features and fountains that add serenity to the campus atmosphere.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Initiatives */}
        <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-600 to-green-800">
          <div className="absolute inset-0">
            <img
              src="https://picsum.photos/1200/300?random=sustainability"
              alt="Sustainability"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-2xl px-8">
              <h4 className="text-white text-2xl font-bold mb-3">Sustainability Initiatives</h4>
              <p className="text-white/90 text-base">
                Our commitment to environmental stewardship through green building practices, 
                renewable energy, and campus-wide sustainability programs.
              </p>
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
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
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