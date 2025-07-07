'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { Search, Filter, MapPin, Leaf, GraduationCap, Building, X, ChevronDown } from 'lucide-react';

// Initialize Mapbox
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

// Mock data for global conservation map
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
      imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop", // Snow leopard in mountains
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
      imageUrl: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop", // African elephant in savanna
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
      imageUrl: "https://images.unsplash.com/photo-1527118732049-c88155f2107c?w=400&h=300&fit=crop", // Giant panda eating bamboo
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
      imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop", // Small wild cat
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
      imageUrl: "https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=400&h=300&fit=crop", // Koala in eucalyptus tree
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
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop", // Polar bear on ice
      description: "Polar bears depend on sea ice for hunting and are threatened by climate change."
    },
    {
      id: 7,
      name: "Sumatran Tiger",
      scientificName: "Panthera tigris sumatrae",
      status: "Critically Endangered",
      location: [101.6869, -0.7893], // Sumatra, Indonesia
      population: "400-500",
      threats: ["Deforestation", "Poaching", "Human encroachment"],
      imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=300&fit=crop", // Tiger in jungle
      description: "The smallest of all tiger subspecies, found only on the Indonesian island of Sumatra."
    },
    {
      id: 8,
      name: "Mountain Gorilla",
      scientificName: "Gorilla beringei beringei",
      status: "Critically Endangered",
      location: [29.5794, -1.6778], // Rwanda
      population: "1,000",
      threats: ["Habitat loss", "Disease", "Civil unrest"],
      imageUrl: "https://images.unsplash.com/photo-1580852300654-03c803a14e24?w=400&h=300&fit=crop", // Mountain gorilla
      description: "Mountain gorillas live in the cloud forests of Rwanda, Uganda, and Democratic Republic of Congo."
    },
    {
      id: 9,
      name: "Amur Leopard",
      scientificName: "Panthera pardus orientalis",
      status: "Critically Endangered",
      location: [131.9041, 45.0339], // Primorsky Krai, Russia
      population: "120-140",
      threats: ["Poaching", "Habitat fragmentation", "Prey depletion"],
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Leopard in forest
      description: "The world's rarest big cat, adapted to life in the temperate forests of Far East Russia."
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
      imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop", // African savanna with animals
      description: "One of Africa's most famous wildlife reserves, known for the Great Migration."
    },
    {
      id: 2,
      name: "Yellowstone National Park",
      location: [-110.5885, 44.4280], // USA
      area: "8,991 km²",
      established: "1872",
      species: ["Grizzly Bears", "Wolves", "Bison", "Elk"],
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop", // Yellowstone landscape
      description: "America's first national park, home to diverse wildlife and geothermal features."
    },
    {
      id: 3,
      name: "Kaziranga National Park",
      location: [93.3714, 26.5775], // India
      area: "858 km²",
      established: "1905",
      species: ["One-horned Rhinoceros", "Tigers", "Elephants", "Wild Water Buffalo"],
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0ebebcc6a2b?w=400&h=300&fit=crop", // Rhino in grassland
      description: "UNESCO World Heritage site famous for its population of one-horned rhinoceros."
    },
    {
      id: 4,
      name: "Galápagos National Park",
      location: [-90.3312, -0.7893], // Ecuador
      area: "7,665 km²",
      established: "1959",
      species: ["Giant Tortoises", "Marine Iguanas", "Darwin's Finches", "Blue-footed Boobies"],
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", // Galápagos tortoise
      description: "The islands that inspired Darwin's theory of evolution, with unique endemic species."
    },
    {
      id: 5,
      name: "Kruger National Park",
      location: [31.5982, -24.0058], // South Africa
      area: "19,485 km²",
      established: "1898",
      species: ["Lions", "Leopards", "Rhinos", "Elephants", "Buffalos"],
      imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop", // African savanna landscape
      description: "One of Africa's largest game reserves and a flagship conservation area."
    },
    {
      id: 6,
      name: "Great Bear Rainforest",
      location: [-128.1089, 52.1579], // British Columbia, Canada
      area: "6,400 km²",
      established: "2006",
      species: ["Spirit Bears", "Grizzly Bears", "Wolves", "Salmon"],
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop", // Temperate rainforest canopy
      description: "The largest temperate rainforest preserve, home to the rare white spirit bear."
    },
    {
      id: 7,
      name: "Ranthambore National Park",
      location: [76.5048, 26.0173], // Rajasthan, India
      area: "1,334 km²",
      established: "1980",
      species: ["Bengal Tigers", "Leopards", "Sloth Bears", "Crocodiles"],
      imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=300&fit=crop", // Bengal tiger in natural habitat
      description: "Famous for its Bengal tiger population and ancient fort ruins."
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
      imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop", // Children studying nature
      description: "Students are creating urban wildlife corridors and monitoring local bird populations."
    },
    {
      id: 2,
      name: "Ocean Guardians",
      school: "Coastal High School",
      location: [151.2093, -33.8688], // Sydney, Australia
      participants: 180,
      focus: "Marine Life Protection",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop", // Students at beach cleanup
      description: "Students monitor local beaches and coral reefs, contributing to marine conservation efforts."
    },
    {
      id: 3,
      name: "Rainforest Rangers",
      school: "Amazon International School",
      location: [-60.0261, -3.4653], // Amazon, Brazil
      participants: 120,
      focus: "Rainforest Conservation",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop", // Rainforest canopy
      description: "Students work directly with local communities to protect rainforest habitats."
    },
    {
      id: 4,
      name: "Savanna Stewards",
      school: "Nairobi Academy",
      location: [36.8219, -1.2921], // Nairobi, Kenya
      participants: 200,
      focus: "Wildlife Protection",
      imageUrl: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=400&h=300&fit=crop", // Students with wildlife research
      description: "Students participate in wildlife monitoring and anti-poaching awareness campaigns."
    },
    {
      id: 5,
      name: "Arctic Explorers",
      school: "Northern Lights School",
      location: [-105.3568, 63.7467], // Northwest Territories, Canada
      participants: 85,
      focus: "Arctic Wildlife Research",
      imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop", // Arctic polar bear landscape
      description: "Students study the impact of climate change on arctic wildlife and ecosystems."
    },
    {
      id: 6,
      name: "Coral Reef Guardians",
      school: "Great Barrier Academy",
      location: [145.7781, -16.2859], // Cairns, Australia
      participants: 300,
      focus: "Marine Ecosystem Protection",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", // Coral reef underwater
      description: "Students monitor coral health and participate in reef restoration projects."
    },
    {
      id: 7,
      name: "Panda Conservation Club",
      school: "Chengdu International School",
      location: [104.0647, 30.5728], // Chengdu, China
      participants: 150,
      focus: "Giant Panda Research",
      imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop", // Giant panda in bamboo
      description: "Students work with local panda reserves to support breeding and habitat programs."
    },
    {
      id: 8,
      name: "Desert Wildlife Watchers",
      school: "Sahara Academy",
      location: [1.6596, 28.0339], // Algeria
      participants: 90,
      focus: "Desert Conservation",
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop", // Desert landscape with dunes
      description: "Students study adaptation strategies of desert wildlife and water conservation."
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

  const addMarkers = useCallback((map: mapboxgl.Map) => {
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
  }, [filters, setSelectedMarker]);

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
  }, [filters, mapLoaded, addMarkers]);

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
    const isProduction = process.env.NODE_ENV === 'production';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <div className="text-red-500 mb-4">
            <MapPin className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Map Configuration Required</h2>
          <p className="text-gray-600 mb-6">
            {isProduction 
              ? "The map service is temporarily unavailable. Please try again later."
              : "Please configure your Mapbox access token to view the conservation map."
            }
          </p>
          {!isProduction && (
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <p className="text-sm text-gray-600 mb-2">Add to your .env.local file:</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
              </code>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="conservation-gradient p-2 rounded-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WildTrace</h1>
                <p className="text-sm text-gray-600">Conservation in Action</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-green-600 transition-colors">Dashboard</a>
              <a href="/conservation-map" className="text-green-600 font-medium">Conservation Map</a>
              <a href="/start-project" className="text-gray-700 hover:text-green-600 transition-colors">School Projects</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Community</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-teal-600 via-emerald-700 to-green-800 shadow-xl border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="text-center">
                <p className="text-xl sm:text-2xl text-emerald-100 font-light leading-relaxed max-w-2xl px-4 sm:px-0">
                  Discover and support wildlife protection efforts
                </p>
              </div>
            </div>
            
            {/* Quick Filter Pills */}
            <div className="flex justify-center mt-4 sm:mt-6">
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4 sm:px-0">
                <button
                  onClick={() => handleFilterChange('species')}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                    filters.species 
                      ? 'bg-red-500 border-red-400 text-white shadow-lg' 
                      : 'bg-white/20 border-white/40 text-white hover:bg-white/30'
                  }`}
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium">Wildlife</span>
                </button>
                <button
                  onClick={() => handleFilterChange('sanctuaries')}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                    filters.sanctuaries 
                      ? 'bg-green-500 border-green-400 text-white shadow-lg' 
                      : 'bg-white/20 border-white/40 text-white hover:bg-white/30'
                  }`}
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Sanctuaries</span>
                </button>
                <button
                  onClick={() => handleFilterChange('schoolProjects')}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                    filters.schoolProjects 
                      ? 'bg-blue-500 border-blue-400 text-white shadow-lg' 
                      : 'bg-white/20 border-white/40 text-white hover:bg-white/30'
                  }`}
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Education</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Enhanced Search and Filter Bar */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl mx-4 sm:mx-0">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center">
              {/* Search Input */}
              <div className="flex-1 w-full relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/80 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Search wildlife, locations, or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 focus:bg-white/25 transition-all text-sm sm:text-base"
                />
              </div>
              
              {/* Filter Button */}
              <div className="relative w-full lg:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center space-x-2 bg-white text-green-700 hover:bg-green-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border-2 border-white/60 hover:border-green-200 transition-all hover:scale-105 hover:shadow-lg backdrop-blur-sm font-medium w-full lg:w-auto text-sm sm:text-base"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {/* Active filter count indicator */}
                  <div className="flex items-center space-x-1">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                      {Object.values(filters).filter(Boolean).length}/{Object.keys(filters).length}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                {/* Enhanced Filter Dropdown */}
                {showFilters && (
                  <div className="absolute top-full left-0 right-0 lg:right-0 lg:left-auto mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 min-w-[280px] sm:min-w-[320px] z-50 backdrop-blur-sm mx-4 lg:mx-0">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg">Map Layers</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Toggle visibility
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                      Control which markers are visible on the map
                    </p>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-4 cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                        <input
                          type="checkbox"
                          checked={filters.species}
                          onChange={() => handleFilterChange('species')}
                          className="w-5 h-5 text-red-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                        />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                          <div>
                            <span className="text-gray-900 font-medium group-hover:text-gray-900">Endangered Wildlife</span>
                            <div className="text-xs text-gray-500">Species conservation status</div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 bg-red-50 px-2 py-1 rounded-full">
                          {mockData.species.length} locations
                        </span>
                      </label>
                      
                      <label className="flex items-center space-x-4 cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                        <input
                          type="checkbox"
                          checked={filters.sanctuaries}
                          onChange={() => handleFilterChange('sanctuaries')}
                          className="w-5 h-5 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                        />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                          <div>
                            <span className="text-gray-900 font-medium group-hover:text-gray-900">Wildlife Sanctuaries</span>
                            <div className="text-xs text-gray-500">Protected areas & reserves</div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 bg-green-50 px-2 py-1 rounded-full">
                          {mockData.sanctuaries.length} locations
                        </span>
                      </label>
                      
                      <label className="flex items-center space-x-4 cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                        <input
                          type="checkbox"
                          checked={filters.schoolProjects}
                          onChange={() => handleFilterChange('schoolProjects')}
                          className="w-5 h-5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                          <div>
                            <span className="text-gray-900 font-medium group-hover:text-gray-900">Education Projects</span>
                            <div className="text-xs text-gray-500">Wildlife protection initiatives</div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 bg-blue-50 px-2 py-1 rounded-full">
                          {mockData.schoolProjects.length} locations
                        </span>
                      </label>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setFilters({ species: true, sanctuaries: true, schoolProjects: true })}
                        className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                      >
                        Show All
                      </button>
                      <button
                        onClick={() => setFilters({ species: false, sanctuaries: false, schoolProjects: false })}
                        className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                      >
                        Hide All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)] lg:h-screen">
        <div ref={mapContainerRef} className="w-full h-full" />
        
        {/* Loading Overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading wildlife protection map...</p>
            </div>
          </div>
        )}

        {/* Enhanced Detail Panel */}
        {selectedMarker && (
          <div className="fixed inset-x-0 bottom-0 lg:absolute lg:top-4 lg:right-4 lg:inset-x-auto lg:bottom-auto bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl max-w-full lg:max-w-md w-full z-50 overflow-hidden border border-gray-200 max-h-[80vh] lg:max-h-none">
            <div className="relative">
              {/* Mobile drag handle */}
              <div className="lg:hidden flex justify-center pt-2 pb-1">
                <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedMarker(null)}
                className="absolute top-2 lg:top-3 right-3 bg-white/95 hover:bg-white rounded-full p-2 z-10 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <X className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
              </button>
              
              {/* Enhanced Image Section */}
              <div className="h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {getImageSrc(selectedMarker.data.imageUrl, null) ? (
                  <img
                    src={selectedMarker.data.imageUrl}
                    alt={selectedMarker.data.name}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(selectedMarker.data.imageUrl)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    {selectedMarker.type === 'species' && <Leaf className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400" />}
                    {selectedMarker.type === 'sanctuary' && <Building className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400" />}
                    {selectedMarker.type === 'schoolProject' && <GraduationCap className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400" />}
                  </div>
                )}
                
                {/* Enhanced Type Badge */}
                <div className="absolute top-3 left-3">
                  {selectedMarker.type === 'species' && (
                    <span className="bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      🦁 Wildlife
                    </span>
                  )}
                  {selectedMarker.type === 'sanctuary' && (
                    <span className="bg-green-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      🏞️ Sanctuary
                    </span>
                  )}
                  {selectedMarker.type === 'schoolProject' && (
                    <span className="bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      🎓 Education
                    </span>
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Enhanced Content Section */}
              <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight">
                    {selectedMarker.data.name}
                  </h3>
                  {selectedMarker.type === 'species' && (
                    <p className="text-gray-600 italic font-medium text-sm sm:text-base">
                      {selectedMarker.data.scientificName}
                    </p>
                  )}
                </div>
                
                {selectedMarker.type === 'species' && (
                  <div className="space-y-4">
                    {/* Conservation Status */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Conservation Status</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedMarker.data.status)}`}>
                          {selectedMarker.data.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Population:</span>
                          <span className="font-semibold text-gray-900">{selectedMarker.data.population}</span>
                        </div>
                      </div>
                    </div>

                    {/* Threats Section */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">⚠️</span>
                        Primary Threats
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMarker.data.threats.map((threat: string, index: number) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium border border-red-200">
                            {threat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <span className="mr-2">ℹ️</span>
                        Did You Know?
                      </h4>
                      <p className="text-sm text-blue-800">
                        {selectedMarker.data.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Learn More
                      </button>
                      <button className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Support
                      </button>
                    </div>
                  </div>
                )}
                
                {selectedMarker.type === 'sanctuary' && (
                  <div className="space-y-4">
                    {/* Sanctuary Details */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 block">Area Coverage</span>
                          <span className="font-semibold text-gray-900">{selectedMarker.data.area}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block">Established</span>
                          <span className="font-semibold text-gray-900">{selectedMarker.data.established}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Species */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🦎</span>
                        Protected Species
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMarker.data.species.map((species: string, index: number) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                            {species}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-green-50 rounded-xl p-4">
                      <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                        <span className="mr-2">🌿</span>
                        About This Sanctuary
                      </h4>
                      <p className="text-sm text-green-800">
                        {selectedMarker.data.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Visit Info
                      </button>
                      <button className="flex-1 border border-green-500 text-green-500 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Donate
                      </button>
                    </div>
                  </div>
                )}
                
                {selectedMarker.type === 'schoolProject' && (
                  <div className="space-y-4">
                    {/* Project Details */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">School:</span>
                          <span className="font-semibold text-gray-900">{selectedMarker.data.school}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Students Involved:</span>
                          <span className="font-semibold text-gray-900">{selectedMarker.data.participants}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Focus Area:</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {selectedMarker.data.focus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Project Impact */}
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <span className="mr-2">📚</span>
                        Project Impact
                      </h4>
                      <p className="text-sm text-blue-800">
                        {selectedMarker.data.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🏆</span>
                        Key Achievements
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-700">
                          <span className="mr-2">•</span>
                          Active community engagement programs
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="mr-2">•</span>
                          Collaborative research initiatives
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="mr-2">•</span>
                          Environmental awareness campaigns
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Join Project
                      </button>
                      <button className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
