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

const researchProjects = [
  {
    id: "ai-research",
    title: "AI & Machine Learning",
    thumbnail: "https://picsum.photos/400/600?random=ai",
    description: "Cutting-edge research in artificial intelligence and machine learning applications.",
    images: ["https://picsum.photos/800/600?random=ai1", "https://picsum.photos/800/600?random=ai2"],
    details: ["Deep learning models", "Computer vision", "Natural language processing", "Research publications"]
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    thumbnail: "https://picsum.photos/400/600?random=energy",
    description: "Research on sustainable energy solutions and green technology innovations.",
    images: ["https://picsum.photos/800/600?random=energy1"],
    details: ["Solar energy systems", "Wind power optimization", "Energy storage", "Sustainability studies"]
  }
];

const labs = [
  {
    id: "molecular-biology",
    title: "Advanced Molecular Biology",
    thumbnail: "https://picsum.photos/400/600?random=biology",
    description: "State-of-the-art molecular biology laboratory for genetic research and biotechnology.",
    images: ["https://picsum.photos/800/600?random=biology1"],
    details: ["DNA sequencing", "PCR analysis", "Cell culture", "Protein synthesis"]
  },
  {
    id: "chemistry",
    title: "Chemistry",
    thumbnail: "https://picsum.photos/400/600?random=chemistry",
    description: "Comprehensive chemistry laboratory for organic, inorganic, and analytical chemistry.",
    images: ["https://picsum.photos/800/600?random=chemistry1"],
    details: ["Spectroscopy", "Chromatography", "Synthesis", "Analysis"]
  },
  {
    id: "microbiology",
    title: "Microbiology",
    thumbnail: "https://picsum.photos/400/600?random=microbiology",
    description: "Microbiology lab for studying microorganisms and their applications.",
    images: ["https://picsum.photos/800/600?random=microbiology1"],
    details: ["Bacterial cultures", "Microscopy", "Sterilization", "Fermentation"]
  },
  {
    id: "chemical-engineering",
    title: "Chemical Engineering",
    thumbnail: "https://picsum.photos/400/600?random=chemeng",
    description: "Process engineering laboratory for chemical reactor design and optimization.",
    images: ["https://picsum.photos/800/600?random=chemeng1"],
    details: ["Process simulation", "Reactor design", "Separation processes", "Heat transfer"]
  },
  {
    id: "communication",
    title: "Communication",
    thumbnail: "https://picsum.photos/400/600?random=communication",
    description: "Communication systems laboratory for signal processing and networking.",
    images: ["https://picsum.photos/800/600?random=communication1"],
    details: ["Signal processing", "Network protocols", "Wireless systems", "Digital communication"]
  },
  {
    id: "cad",
    title: "CAD",
    thumbnail: "https://picsum.photos/400/600?random=cad",
    description: "Computer-aided design laboratory for 3D modeling and engineering design.",
    images: ["https://picsum.photos/800/600?random=cad1"],
    details: ["3D modeling", "Engineering drawings", "Design optimization", "Simulation"]
  },
  {
    id: "programming",
    title: "Computer Programming",
    thumbnail: "https://picsum.photos/400/600?random=programming",
    description: "Programming laboratory with modern computers for software development.",
    images: ["https://picsum.photos/800/600?random=programming1"],
    details: ["Multiple programming languages", "Software development", "Debugging tools", "Version control"]
  },
  {
    id: "concrete",
    title: "Concrete",
    thumbnail: "https://picsum.photos/400/600?random=concrete",
    description: "Materials testing laboratory for concrete and construction materials.",
    images: ["https://picsum.photos/800/600?random=concrete1"],
    details: ["Strength testing", "Mix design", "Durability analysis", "Quality control"]
  },
  {
    id: "creative",
    title: "Creative",
    thumbnail: "https://picsum.photos/400/600?random=creative",
    description: "Creative design laboratory for multimedia and digital arts projects.",
    images: ["https://picsum.photos/800/600?random=creative1"],
    details: ["Digital design", "Multimedia production", "3D graphics", "Animation"]
  },
  {
    id: "digital-design",
    title: "Digital Design",
    thumbnail: "https://picsum.photos/400/600?random=digital",
    description: "Digital design laboratory for VLSI and digital circuit design.",
    images: ["https://picsum.photos/800/600?random=digital1"],
    details: ["VLSI design", "Digital circuits", "FPGA programming", "Logic simulation"]
  },
  {
    id: "electrical-machines",
    title: "Electrical Machines",
    thumbnail: "https://picsum.photos/400/600?random=electrical",
    description: "Laboratory for studying electrical machines and power systems.",
    images: ["https://picsum.photos/800/600?random=electrical1"],
    details: ["Motor testing", "Generator analysis", "Power measurements", "Control systems"]
  },
  {
    id: "environmental",
    title: "Environmental",
    thumbnail: "https://picsum.photos/400/600?random=environmental",
    description: "Environmental engineering laboratory for water and air quality analysis.",
    images: ["https://picsum.photos/800/600?random=environmental1"],
    details: ["Water testing", "Air quality monitoring", "Pollution control", "Environmental impact"]
  },
  {
    id: "fluid-mechanics",
    title: "Fluid Mechanics",
    thumbnail: "https://picsum.photos/400/600?random=fluid",
    description: "Fluid mechanics laboratory for flow analysis and hydraulic studies.",
    images: ["https://picsum.photos/800/600?random=fluid1"],
    details: ["Flow visualization", "Pressure measurements", "Pump testing", "Hydraulic systems"]
  },
  {
    id: "genetic-engineering",
    title: "Genetic Engineering",
    thumbnail: "https://picsum.photos/400/600?random=genetic",
    description: "Advanced genetic engineering laboratory for biotechnology research.",
    images: ["https://picsum.photos/800/600?random=genetic1"],
    details: ["Gene cloning", "Genetic modification", "Biosafety protocols", "Molecular techniques"]
  },
  {
    id: "heat-transfer",
    title: "Heat Transfer",
    thumbnail: "https://picsum.photos/400/600?random=heat",
    description: "Heat transfer laboratory for thermal analysis and energy systems.",
    images: ["https://picsum.photos/800/600?random=heat1"],
    details: ["Heat exchangers", "Thermal analysis", "Conduction studies", "Convection experiments"]
  },
  {
    id: "mechatronics",
    title: "Mechatronics",
    thumbnail: "https://picsum.photos/400/600?random=mechatronics",
    description: "Mechatronics laboratory combining mechanical, electrical, and software engineering.",
    images: ["https://picsum.photos/800/600?random=mechatronics1"],
    details: ["Robotics", "Automation systems", "Sensors", "Control systems"]
  },
  {
    id: "petroleum",
    title: "Petroleum",
    thumbnail: "https://picsum.photos/400/600?random=petroleum",
    description: "Petroleum engineering laboratory for oil and gas exploration studies.",
    images: ["https://picsum.photos/800/600?random=petroleum1"],
    details: ["Reservoir simulation", "Drilling fluids", "Production optimization", "Well testing"]
  },
  {
    id: "physics",
    title: "Physics",
    thumbnail: "https://picsum.photos/400/600?random=physics",
    description: "Physics laboratory for fundamental and applied physics experiments.",
    images: ["https://picsum.photos/800/600?random=physics1"],
    details: ["Quantum mechanics", "Optics", "Thermodynamics", "Wave physics"]
  },
  {
    id: "power-electronics",
    title: "Power Electronics",
    thumbnail: "https://picsum.photos/400/600?random=power",
    description: "Power electronics laboratory for power conversion and control systems.",
    images: ["https://picsum.photos/800/600?random=power1"],
    details: ["Power converters", "Motor drives", "Power quality", "Renewable energy systems"]
  },
  {
    id: "process-control",
    title: "Process Control",
    thumbnail: "https://picsum.photos/400/600?random=process",
    description: "Process control laboratory for industrial automation and control systems.",
    images: ["https://picsum.photos/800/600?random=process1"],
    details: ["PLC programming", "SCADA systems", "Process optimization", "Control algorithms"]
  },
  {
    id: "robotics",
    title: "Robotics",
    thumbnail: "https://picsum.photos/400/600?random=robotics",
    description: "Robotics laboratory for autonomous systems and artificial intelligence.",
    images: ["https://picsum.photos/800/600?random=robotics1"],
    details: ["Autonomous robots", "Machine vision", "Path planning", "Human-robot interaction"]
  },
  {
    id: "signal-simulation",
    title: "Signal Simulation",
    thumbnail: "https://picsum.photos/400/600?random=signal",
    description: "Signal processing and simulation laboratory for communication systems.",
    images: ["https://picsum.photos/800/600?random=signal1"],
    details: ["Signal analysis", "Digital filters", "Communication protocols", "System simulation"]
  },
  {
    id: "surveying",
    title: "Surveying",
    thumbnail: "https://picsum.photos/400/600?random=surveying",
    description: "Surveying laboratory with modern instruments for land measurement.",
    images: ["https://picsum.photos/800/600?random=surveying1"],
    details: ["GPS systems", "Total stations", "Photogrammetry", "GIS mapping"]
  },
  {
    id: "workshop",
    title: "Workshop",
    thumbnail: "https://picsum.photos/400/600?random=workshop",
    description: "Engineering workshop for hands-on manufacturing and fabrication.",
    images: ["https://picsum.photos/800/600?random=workshop1"],
    details: ["Machine tools", "Welding equipment", "3D printing", "Material processing"]
  },
  {
    id: "thermo-fluids",
    title: "Thermo Fluids",
    thumbnail: "https://picsum.photos/400/600?random=thermo",
    description: "Thermodynamics and fluid mechanics laboratory for energy systems.",
    images: ["https://picsum.photos/800/600?random=thermo1"],
    details: ["Steam engines", "Gas turbines", "Refrigeration", "HVAC systems"]
  },
  {
    id: "advanced-computing",
    title: "Advanced Computing",
    thumbnail: "https://picsum.photos/400/600?random=computing",
    description: "High-performance computing laboratory for computational research.",
    images: ["https://picsum.photos/800/600?random=computing1"],
    details: ["Parallel processing", "Cloud computing", "Big data analytics", "Machine learning"]
  },
  {
    id: "aerospace-materials",
    title: "Aerospace Materials & 3D Printing",
    thumbnail: "https://picsum.photos/400/600?random=aerospace",
    description: "Advanced materials laboratory with 3D printing capabilities for aerospace applications.",
    images: ["https://picsum.photos/800/600?random=aerospace1"],
    details: ["Composite materials", "Additive manufacturing", "Material testing", "Prototype development"]
  }
];

const workshopImages = [
  "https://picsum.photos/1200/300?random=mechworkshop1",
  "https://picsum.photos/1200/300?random=mechworkshop2",
  "https://picsum.photos/1200/300?random=mechworkshop3"
];

export const AcademiaContent = () => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [workshopImageIndex, setWorkshopImageIndex] = useState(0);

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
        {/* Research Projects */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Research Projects</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {researchProjects.map((project) => (
              <div
                key={project.id}
                className="group flex-none cursor-pointer"
                onClick={() => {
                  setSelectedItem(project);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-48 h-72 object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-bold text-base mb-2">{project.title}</h4>
                      <p className="text-white/90 text-xs line-clamp-3">{project.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Labs in BPDC */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Labs in BPDC</h3>
          
          {/* Split labs into rows of 3 */}
          {Array.from({ length: Math.ceil(labs.length / 3) }, (_, rowIndex) => (
            <div key={rowIndex} className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                {labs.slice(rowIndex * 3, (rowIndex + 1) * 3).map((lab) => (
                  <div
                    key={lab.id}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedItem(lab);
                      setCurrentImageIndex(0);
                    }}
                  >
                    <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105">
                      <img
                        src={lab.thumbnail}
                        alt={lab.title}
                        className="w-full h-64 object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h4 className="text-white font-bold text-sm mb-1">{lab.title}</h4>
                          <p className="text-white/90 text-xs line-clamp-2">{lab.description.substring(0, 80)}...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mechanical Workshop */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Mechanical Workshop</h3>
          <div className="relative h-64 rounded-lg overflow-hidden cursor-pointer">
            <img
              src={workshopImages[workshopImageIndex]}
              alt="Mechanical Workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setWorkshopImageIndex((prev) => (prev - 1 + workshopImages.length) % workshopImages.length)}
              >
                <ChevronRight className="h-6 w-6 rotate-180" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setWorkshopImageIndex((prev) => (prev + 1) % workshopImages.length)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4">
              <h4 className="text-white text-xl font-bold mb-2">Mechanical Workshop</h4>
              <p className="text-white/90 text-sm max-w-md">Fully equipped workshop with machine tools, welding equipment, and modern manufacturing facilities for hands-on learning.</p>
            </div>
          </div>
        </div>

        {/* Additional Sections - Placeholder cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-yellow-600 to-yellow-800">
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-white text-xl font-bold mb-2">Mahsat</h4>
                <p className="text-white/90 text-sm">Space research and satellite technology program</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-white text-xl font-bold mb-2">Incubation Centre</h4>
                <p className="text-white/90 text-sm">Startup incubation and entrepreneurship support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-green-600 to-green-800">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-white text-xl font-bold mb-2">Centre for Higher Education</h4>
              <p className="text-white/90 text-sm">Advanced degree programs and research opportunities</p>
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