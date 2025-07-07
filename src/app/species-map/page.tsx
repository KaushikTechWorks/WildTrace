'use client';

import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Search, Filter, MapPin, Leaf, GraduationCap, Building, X, ChevronDown } from 'lucide-react';

// Initialize Mapbox
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

// Mock data for global locations
const mockData = {
  species: [
    {
      id: 1,
      name: "Snow Leopard",
      scientificName: "Panthera uncia",
      status: "Vulnerable",
      location: [86.9250, 27.9881], // Nepal
      population: "2,500-10,000",
      threats: ["Habitat loss", "Poaching", "Climate change"],
      imageUrl: "https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=400&h=300&fit=crop",
      description: "The snow leopard is a large cat native to the mountain ranges of Central and South Asia."
    },
    {
      id: 2,
      name: "African Elephant",
      scientificName: "Loxodonta africana",
      status: "Endangered",
      location: [21.0285, -18.6657], // Botswana
      population: "415,000",
      threats: ["Poaching", "Habitat fragmentation", "Human-wildlife conflict"],
      imageUrl: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop",
      description: "African elephants are the largest land animals on Earth, crucial for ecosystem health."
    },
    {
      id: 3,
      name: "Giant Panda",
      scientificName: "Ailuropoda melanoleuca",
      status: "Vulnerable",
      location: [104.1954, 35.8617], // China
      population: "1,864",
      threats: ["Habitat loss", "Low reproductive rate"],
      imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop",
      description: "Giant pandas are a conservation success story, with populations slowly recovering."
    },
    {
      id: 4,
      name: "Jaguarundi",
      scientificName: "Herpailurus yagouaroundi",
      status: "Least Concern",
      location: [-60.0261, -3.4653], // Brazil Amazon
      population: "Unknown",
      threats: ["Habitat loss", "Hunting"],
      imageUrl: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
      description: "A small wild cat native to the Americas, often mistaken for other species."
    },
    {
      id: 5,
      name: "Koala",
      scientificName: "Phascolarctos cinereus",
      status: "Vulnerable",
      location: [151.2093, -33.8688], // Australia
      population: "300,000",
      threats: ["Habitat loss", "Disease", "Climate change"],
      imageUrl: "https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=400&h=300&fit=crop",
      description: "Koalas are iconic Australian marsupials facing severe threats from habitat destruction."
    },
    {
      id: 6,
      name: "Polar Bear",
      scientificName: "Ursus maritimus",
      status: "Vulnerable",
      location: [-97.1384, 69.5037], // Arctic Canada
      population: "26,000",
      threats: ["Climate change", "Sea ice loss", "Pollution"],
      imageUrl: "https://images.unsplash.com/photo-1521302080334-4bebac2763a4?w=400&h=300&fit=crop",
      description: "Polar bears depend on sea ice for hunting and are threatened by climate change."
    }
  ],
  sanctuaries: [
    {
      id: 1,
      name: "Maasai Mara National Reserve",
      location: [35.1656, -1.4061], // Kenya
      area: "1,510 km²",
      established: "1961",
      species: ["Lions", "Elephants", "Cheetahs", "Zebras"],
      imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
      description: "One of Africa's most famous wildlife reserves, known for the Great Migration."
    },
    {
      id: 2,
      name: "Yellowstone National Park",
      location: [-110.5885, 44.4280], // USA
      area: "8,991 km²",
      established: "1872",
      species: ["Grizzly Bears", "Wolves", "Bison", "Elk"],
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      description: "America's first national park, home to diverse wildlife and geothermal features."
    },
    {
      id: 3,
      name: "Kaziranga National Park",
      location: [93.3714, 26.5775], // India
      area: "858 km²",
      established: "1905",
      species: ["One-horned Rhinoceros", "Tigers", "Elephants", "Wild Water Buffalo"],
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0ebebcc6a2b?w=400&h=300&fit=crop",
      description: "UNESCO World Heritage site famous for its population of one-horned rhinoceros."
    },
    {
      id: 4,
      name: "Galápagos National Park",
      location: [-90.3312, -0.7893], // Ecuador
      area: "7,665 km²",
      established: "1959",
      species: ["Giant Tortoises", "Marine Iguanas", "Darwin's Finches", "Blue-footed Boobies"],
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      description: "The islands that inspired Darwin's theory of evolution, with unique endemic species."
    }
  ],
  schoolProjects: [
    {
      id: 1,
      name: "Green Schools Initiative",
      school: "Riverside Elementary",
      location: [-74.0059, 40.7128], // New York, USA
      participants: 250,
      focus: "Urban Wildlife Conservation",
      imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop",
      description: "Students are creating urban wildlife corridors and monitoring local bird populations."
    },
    {
      id: 2,
      name: "Ocean Guardians",
      school: "Coastal High School",
      location: [151.2093, -33.8688], // Sydney, Australia
      participants: 180,
      focus: "Marine Life Protection",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
      description: "Students monitor local beaches and coral reefs, contributing to marine conservation efforts."
    },
    {
      id: 3,
      name: "Rainforest Rangers",
      school: "Amazon International School",
      location: [-60.0261, -3.4653], // Amazon, Brazil
      participants: 120,
      focus: "Rainforest Conservation",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      description: "Students work directly with local communities to protect rainforest habitats."
    },
    {
      id: 4,
      name: "Savanna Stewards",
      school: "Nairobi Academy",
      location: [36.8219, -1.2921], // Nairobi, Kenya
      participants: 200,
      focus: "Wildlife Protection",
      imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
      description: "Students participate in wildlife monitoring and anti-poaching awareness campaigns."
    },
    {
      id: 5,
      name: "Arctic Explorers",
      school: "Northern Lights School",
      location: [-105.3568, 63.7467], // Northwest Territories, Canada
      participants: 85,
      focus: "Arctic Wildlife Research",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      description: "Students study the impact of climate change on arctic wildlife and ecosystems."
    }
  ]
};

interface FilterState {
  species: boolean;
  sanctuaries: boolean;
  schoolProjects: boolean;
}

interface SelectedMarker {
  type: 'species' | 'sanctuary' | 'schoolProject';
  data: any;
}

export default function SpeciesMapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    species: true,
    sanctuaries: true,
    schoolProjects: true
  });

  // Initialize map
  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.error('Mapbox access token is required');
      return;
    }

    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [20, 20], // Global center
      zoom: 2 // Global zoom level
    });

    map.on('load', () => {
      setMapLoaded(true);
      addMarkers(map);
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Update markers when filters change
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      addMarkers(mapRef.current);
    }
  }, [filters, mapLoaded]);

  const addMarkers = (map: mapboxgl.Map) => {
    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add species markers
    if (filters.species) {
      mockData.species.forEach(species => {
        const el = document.createElement('div');
        el.className = 'marker species-marker';
        el.innerHTML = `
          <div class="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3C6.686 3 4 5.686 4 9c0 5.25 6 11 6 11s6-5.75 6-11c0-3.314-2.686-6-6-6z"/>
              <circle cx="10" cy="9" r="2"/>
            </svg>
          </div>
        `;
        
        el.addEventListener('click', () => {
          setSelectedMarker({ type: 'species', data: species });
        });

        new mapboxgl.Marker(el)
          .setLngLat(species.location as [number, number])
          .addTo(map);
      });
    }

    // Add sanctuary markers
    if (filters.sanctuaries) {
      mockData.sanctuaries.forEach(sanctuary => {
        const el = document.createElement('div');
        el.className = 'marker sanctuary-marker';
        el.innerHTML = `
          <div class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3C6.686 3 4 5.686 4 9c0 5.25 6 11 6 11s6-5.75 6-11c0-3.314-2.686-6-6-6z"/>
              <circle cx="10" cy="9" r="2"/>
            </svg>
          </div>
        `;
        
        el.addEventListener('click', () => {
          setSelectedMarker({ type: 'sanctuary', data: sanctuary });
        });

        new mapboxgl.Marker(el)
          .setLngLat(sanctuary.location as [number, number])
          .addTo(map);
      });
    }

    // Add school project markers
    if (filters.schoolProjects) {
      mockData.schoolProjects.forEach(project => {
        const el = document.createElement('div');
        el.className = 'marker school-marker';
        el.innerHTML = `
          <div class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3C6.686 3 4 5.686 4 9c0 5.25 6 11 6 11s6-5.75 6-11c0-3.314-2.686-6-6-6z"/>
              <circle cx="10" cy="9" r="2"/>
            </svg>
          </div>
        `;
        
        el.addEventListener('click', () => {
          setSelectedMarker({ type: 'schoolProject', data: project });
        });

        new mapboxgl.Marker(el)
          .setLngLat(project.location as [number, number])
          .addTo(map);
      });
    }
  };

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  const getImageSrc = (imageUrl: string, fallbackIcon: React.ReactNode) => {
    if (imageErrors.has(imageUrl)) {
      return null; // Will show fallback
    }
    return imageUrl;
  };

  const handleFilterChange = (filterType: keyof FilterState) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'critically endangered':
        return 'text-red-700 bg-red-100';
      case 'endangered':
        return 'text-red-600 bg-red-50';
      case 'vulnerable':
        return 'text-orange-600 bg-orange-50';
      case 'near threatened':
        return 'text-yellow-600 bg-yellow-50';
      case 'least concern':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (!MAPBOX_TOKEN) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <div className="text-red-500 mb-4">
            <MapPin className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Map Configuration Required</h2>
          <p className="text-gray-600 mb-6">
            Please configure your Mapbox access token to view the species map.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <p className="text-sm text-gray-600 mb-2">Add to your .env.local file:</p>
            <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
              NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 shadow-xl border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-6 shadow-lg border border-white/30">
                <MapPin className="h-12 w-12 text-white drop-shadow-sm" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                  Global Species Map
                </h1>
                <p className="text-xl text-emerald-100 font-medium leading-relaxed">
                  Explore endangered species, sanctuaries, and conservation projects worldwide
                </p>
              </div>
            </div>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">12+</div>
                <div className="text-emerald-100 text-sm">Species Tracked</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">8+</div>
                <div className="text-emerald-100 text-sm">Wildlife Sanctuaries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-emerald-100 text-sm">School Projects</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Search and Filter Bar */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Input */}
              <div className="flex-1 relative group">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/80 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Search species, locations, or conservation projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 focus:bg-white/25 transition-all text-lg"
                />
              </div>
              
              {/* Filter Button */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-8 py-4 rounded-xl text-white border border-white/40 transition-all hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                >
                  <Filter className="h-5 w-5" />
                  <span className="font-medium text-lg">Filters</span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Enhanced Filter Dropdown */}
                {showFilters && (
                  <div className="absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[280px] z-50 backdrop-blur-sm">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Show on Map</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-4 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.species}
                          onChange={() => handleFilterChange('species')}
                          className="w-5 h-5 text-red-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                          <span className="text-gray-700 font-medium group-hover:text-gray-900">Endangered Species</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center space-x-4 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.sanctuaries}
                          onChange={() => handleFilterChange('sanctuaries')}
                          className="w-5 h-5 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                          <span className="text-gray-700 font-medium group-hover:text-gray-900">Wildlife Sanctuaries</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center space-x-4 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.schoolProjects}
                          onChange={() => handleFilterChange('schoolProjects')}
                          className="w-5 h-5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                          <span className="text-gray-700 font-medium group-hover:text-gray-900">School Projects</span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-screen">
        <div ref={mapContainerRef} className="w-full h-full" />
        
        {/* Loading Overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading global species map...</p>
            </div>
          </div>
        )}

        {/* Detail Panel */}
        {selectedMarker && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-xl max-w-sm w-full z-50 overflow-hidden">
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedMarker(null)}
                className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1 z-10 shadow-sm"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
              
              {/* Image */}
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                {getImageSrc(selectedMarker.data.imageUrl, null) ? (
                  <img
                    src={selectedMarker.data.imageUrl}
                    alt={selectedMarker.data.name}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(selectedMarker.data.imageUrl)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    {selectedMarker.type === 'species' && <Leaf className="h-16 w-16 text-gray-400" />}
                    {selectedMarker.type === 'sanctuary' && <Building className="h-16 w-16 text-gray-400" />}
                    {selectedMarker.type === 'schoolProject' && <GraduationCap className="h-16 w-16 text-gray-400" />}
                  </div>
                )}
                
                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  {selectedMarker.type === 'species' && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Species
                    </span>
                  )}
                  {selectedMarker.type === 'sanctuary' && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Sanctuary
                    </span>
                  )}
                  {selectedMarker.type === 'schoolProject' && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      School Project
                    </span>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {selectedMarker.data.name}
                </h3>
                
                {selectedMarker.type === 'species' && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 italic">
                      {selectedMarker.data.scientificName}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMarker.data.status)}`}>
                        {selectedMarker.data.status}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Population:</span> {selectedMarker.data.population}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Main Threats:</span>
                      <div className="mt-1">
                        {selectedMarker.data.threats.map((threat: string, index: number) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mr-1 mb-1">
                            {threat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedMarker.type === 'sanctuary' && (
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Area:</span> {selectedMarker.data.area}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Established:</span> {selectedMarker.data.established}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Key Species:</span>
                      <div className="mt-1">
                        {selectedMarker.data.species.map((species: string, index: number) => (
                          <span key={index} className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs mr-1 mb-1">
                            {species}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedMarker.type === 'schoolProject' && (
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">School:</span> {selectedMarker.data.school}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Participants:</span> {selectedMarker.data.participants} students
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Focus:</span>
                      <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        {selectedMarker.data.focus}
                      </span>
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-gray-600 mt-3">
                  {selectedMarker.data.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
