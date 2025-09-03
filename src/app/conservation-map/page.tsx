"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import mockData from '@/lib/mockData';
import { Search, Filter, MapPin, Leaf, GraduationCap, Building, X, ChevronDown, ChevronLeft } from 'lucide-react';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), { ssr: false });

// Initialize Mapbox
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
} else {
  console.error('NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not available');
}

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
  // Map rendering is delegated to MapboxMap component
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    species: true,
    sanctuaries: true,
    schoolProjects: true
  });

  // Close the selected detail panel with Escape for accessibility
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedMarker) setSelectedMarker(null);
        if (showMobileControls) setShowMobileControls(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedMarker, showMobileControls]);

  // Map is now handled by the MapboxMap component (dynamically loaded)

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

  // Search handler: find first matching item (by name/scientificName/school) and open detail
  const handleSearch = (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const all: Array<{ type: 'species'|'sanctuary'|'schoolProject'; item: any }> = [];
    mockData.species.forEach((s: any) => all.push({ type: 'species', item: s }));
    mockData.sanctuaries.forEach((s: any) => all.push({ type: 'sanctuary', item: s }));
    mockData.schoolProjects.forEach((p: any) => all.push({ type: 'schoolProject', item: p }));

    const found = all.find(({ item }) => {
      const name = (item.name || item.school || '').toString().toLowerCase();
      const sci = (item.scientificName || '').toString().toLowerCase();
      return name.includes(q) || sci.includes(q);
    });

    if (found) {
      setSelectedMarker({ type: found.type, data: found.item });
      setMapError(null);
      // focus the map container if available
      const el = document.querySelector('[data-map-container]') as HTMLElement | null;
      if (el) el.focus();
    } else {
      setMapError(`No results for "${searchQuery}"`);
      window.setTimeout(() => setMapError(null), 3000);
    }
  };

  // Stable handler for map selection to avoid remounting the MapboxMap component
  const handleMapSelect = useCallback((type: 'species'|'sanctuary'|'schoolProject', item: any) => {
    setSelectedMarker({ type: type as any, data: item });
  }, []);

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
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              {/* Mobile-only back button — visible on small screens, hidden on md+ */}
              <div className="md:hidden">
                <Link href="/" aria-label="Back to Dashboard" className="inline-flex items-center space-x-2 mr-2 bg-white/95 hover:bg-white px-2 py-1 rounded-lg shadow-sm">
                  <ChevronLeft className="h-5 w-5 text-green-700" />
                  <span className="text-sm font-medium text-green-700">Back</span>
                </Link>
              </div>
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
            
            {/* Removed header quick-filter pills to avoid duplicate controls; floating controls handle filters */}
          </div>
          
          {/* Enhanced Search and Filter Bar */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl mx-4 sm:mx-0">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center">
              {/* Search Input */}
              <form onSubmit={handleSearch} className="flex-1 w-full relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/80 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Search wildlife, locations, or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-2.5 sm:py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 focus:bg-white/25 transition-all text-sm sm:text-base"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-md px-3 py-1 text-sm flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </form>
              
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
                  /* Use fixed positioning on small screens so the dropdown isn't clipped by the map container; keep absolute on lg+ */
                  <div className="fixed lg:absolute top-28 sm:top-32 left-4 right-4 lg:right-0 lg:left-auto mt-0 lg:mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 min-w-[280px] sm:min-w-[320px] z-60 backdrop-blur-sm mx-0 lg:mx-0">
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
        <div className="w-full h-full">
          <MapboxMap
            data={mockData}
            filters={filters}
            onSelect={handleMapSelect}
            mapboxToken={MAPBOX_TOKEN}
            onLoad={() => { setMapLoaded(true); setMapError(null); }}
            onError={(msg) => { setMapError(msg); setMapLoaded(false); }}
          />
        </div>
  {/* Floating Controls (top-right) - visible on large screens only; hidden on small/mobile */}
  {/* Desktop controls (large screens) */}
  <div className="absolute top-4 left-4 z-40 hidden lg:block">
    <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-lg shadow-lg p-2 flex flex-col gap-2 w-40">
      <div className="text-xs font-semibold text-gray-700 px-1">Map Controls</div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleFilterChange('species')}
          className={`text-xs flex items-center justify-between px-3 py-2 rounded-md ${filters.species ? 'bg-red-50 text-red-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          aria-pressed={filters.species}
        >
          <span>Wildlife</span>
          <span className="w-3 h-3 bg-red-500 rounded-full" />
        </button>
        <button
          onClick={() => handleFilterChange('sanctuaries')}
          className={`text-xs flex items-center justify-between px-3 py-2 rounded-md ${filters.sanctuaries ? 'bg-green-50 text-green-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          aria-pressed={filters.sanctuaries}
        >
          <span>Sanctuaries</span>
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </button>
        <button
          onClick={() => handleFilterChange('schoolProjects')}
          className={`text-xs flex items-center justify-between px-3 py-2 rounded-md ${filters.schoolProjects ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          aria-pressed={filters.schoolProjects}
        >
          <span>Education</span>
          <span className="w-3 h-3 bg-blue-500 rounded-full" />
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Controls Toggle (small screens) */}
  <div className="absolute bottom-6 left-4 z-50 lg:hidden">
    <button
      onClick={() => setShowMobileControls(true)}
      className="bg-white/95 border border-gray-100 rounded-full p-3 shadow-lg flex items-center gap-2"
      aria-label="Open map controls"
    >
      <Filter className="h-4 w-4 text-green-700" />
      <span className="text-sm text-gray-800">Filters</span>
    </button>
  </div>

  {/* Mobile Slide-over Controls */}
  {showMobileControls && (
    <div className="fixed inset-0 z-60 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileControls(false)} aria-hidden="true" />
      <div className="absolute left-0 bottom-0 w-full bg-white rounded-t-2xl shadow-2xl p-4 max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold">Map Controls</div>
          <button onClick={() => setShowMobileControls(false)} className="p-2 rounded-md bg-gray-100">
            <X className="h-4 w-4 text-gray-700" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => { handleFilterChange('species'); }}
            className={`text-sm flex items-center justify-between px-3 py-2 rounded-md ${filters.species ? 'bg-red-50 text-red-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            aria-pressed={filters.species}
          >
            <span>Wildlife</span>
            <span className="w-3 h-3 bg-red-500 rounded-full" />
          </button>
          <button
            onClick={() => { handleFilterChange('sanctuaries'); }}
            className={`text-sm flex items-center justify-between px-3 py-2 rounded-md ${filters.sanctuaries ? 'bg-green-50 text-green-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            aria-pressed={filters.sanctuaries}
          >
            <span>Sanctuaries</span>
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </button>
          <button
            onClick={() => { handleFilterChange('schoolProjects'); }}
            className={`text-sm flex items-center justify-between px-3 py-2 rounded-md ${filters.schoolProjects ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            aria-pressed={filters.schoolProjects}
          >
            <span>Education</span>
            <span className="w-3 h-3 bg-blue-500 rounded-full" />
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => setFilters({ species: true, sanctuaries: true, schoolProjects: true })} className="flex-1 bg-gray-100 px-3 py-2 rounded-md">Show All</button>
          <button onClick={() => setFilters({ species: false, sanctuaries: false, schoolProjects: false })} className="flex-1 bg-gray-100 px-3 py-2 rounded-md">Hide All</button>
        </div>
      </div>
    </div>
  )}

  {/* Left legend removed per request */}
        
        {/* Error Overlay */}
        {mapError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Loading Error</h3>
              <p className="text-gray-600 text-sm mb-4">{mapError}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Reload Page
              </button>
            </div>
          </div>
        )}
        
        {/* Loading Overlay */}
        {!mapLoaded && !mapError && (
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
                  <div className="w-full h-full relative">
                    <Image
                      src={selectedMarker.data.imageUrl}
                      alt={selectedMarker.data.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
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
