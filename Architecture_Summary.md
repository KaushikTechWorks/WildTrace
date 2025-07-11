# WildTrace - Architecture Summary

## 🌍 **Application Overview**
WildTrace is an endangered species conservation tracking application built with Next.js 14+, TypeScript, Tailwind CSS, and deployed on Fly.io with Supabase as the backend.

**Purpose**: Track endangered species and conservation efforts using public biodiversity datasets, providing interactive maps and actionable insights for conservationists, researchers, and the public.

---

## 🏗️ **System Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────┐
│                        WildTrace Frontend                       │
│                      (Next.js 14 + TypeScript)                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Species Map   │  │   Dashboard     │  │   Data Views    │  │
│  │   Page          │  │   Analytics     │  │   & Reports     │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   UI Components │  │   Custom Hooks  │  │   State Mgmt    │  │
│  │   (Reusable)    │  │   (Data Logic)  │  │   (React State) │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     External Services                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Mapbox GL JS  │  │   Supabase      │  │   GBIF API      │  │
│  │   (Interactive  │  │   (Database +   │  │   (Biodiversity │  │
│  │    Maps)        │  │    Auth)        │  │    Data)        │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │   IUCN Red List │  │   Unsplash API  │                      │
│  │   (Conservation │  │   (Species      │                      │
│  │    Status)      │  │    Images)      │                      │
│  └─────────────────┘  └─────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Deployment Layer                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │    Fly.io       │  │     Docker      │  │      CDN        │  │
│  │   (Global Edge  │  │  (Containerized │  │   (Static       │  │
│  │   Deployment)   │  │   Application)  │  │   Assets)       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏛️ **Frontend Architecture**

### **Technology Stack**
```
Frontend Framework:     Next.js 14+ (App Router)
Language:              TypeScript
Styling:               Tailwind CSS
Icons:                 Lucide React
Maps:                  Mapbox GL JS
State Management:      React useState/useEffect
Data Fetching:         Supabase Client
Build Tool:            Next.js (Turbopack)
```

### **Component Hierarchy**
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── conservation-map/        # Interactive map feature
│   │   ├── page.tsx            # Main map interface
│   │   ├── loading.tsx         # Loading state
│   │   └── error.tsx           # Error boundary
│   └── globals.css             # Global styles
├── components/                   # Reusable UI components
│   ├── ui/                     # Base UI components
│   ├── map/                    # Map-specific components
│   └── forms/                  # Form components
├── lib/                         # Utilities and configurations
│   ├── supabase.ts            # Database client
│   ├── mapbox.ts              # Map configuration
│   └── utils.ts               # Helper functions
├── types/                       # TypeScript definitions
│   ├── species.ts             # Species data types
│   ├── sanctuary.ts           # Sanctuary data types
│   └── project.ts             # School project types
└── hooks/                       # Custom React hooks
    ├── useMapData.ts          # Map data management
    └── useFilters.ts          # Filter state logic
```

---

## 🗺️ **Conservation Map Page Architecture**

### **Component Structure**
```
SpeciesMapPage
├── Header Section
│   ├── Title & Subtitle
│   ├── Quick Filter Pills (Wildlife, Sanctuaries, Education)
│   └── Search & Filter Bar
│       ├── Search Input
│       └── Filter Dropdown
│           ├── Map Layers Control
│           ├── Location Counts
│           └── Quick Actions (Show All/Hide All)
├── Map Container
│   ├── Mapbox GL JS Instance
│   ├── Interactive Markers
│   │   ├── Species Markers (Red)
│   │   ├── Sanctuary Markers (Green)
│   │   └── School Project Markers (Blue)
│   ├── Navigation Controls
│   └── Loading Overlay
└── Detail Panel (Right Side)
    ├── Image Section
    ├── Type Badge
    ├── Content Sections
    │   ├── Species Details
    │   ├── Sanctuary Information
    │   └── Project Information
    └── Action Buttons
```

### **State Management Pattern**
```typescript
interface FilterState {
  species: boolean;
  sanctuaries: boolean;
  schoolProjects: boolean;
}

interface SelectedMarker {
  type: 'species' | 'sanctuary' | 'schoolProject';
  data: any;
}

// State Variables:
const [mapLoaded, setMapLoaded] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [showFilters, setShowFilters] = useState(false);
const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(null);
const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
const [filters, setFilters] = useState<FilterState>({...});
```

---

## 🎨 **Design System**

### **Color Palette**
```css
/* Primary Brand Colors */
--forest-canopy:     from-green-600 via-green-700 to-emerald-800
--nature-harmony:    from-emerald-600 via-green-700 to-teal-800
--earth-conservation: from-teal-600 via-emerald-700 to-green-800

/* Marker Colors */
--wildlife-red:      #ef4444  /* Red markers for endangered species */
--sanctuary-green:   #10b981  /* Green markers for sanctuaries */
--education-blue:    #3b82f6  /* Blue markers for school projects */

/* Status Colors */
--critically-endangered: #dc2626
--endangered:           #ea580c
--vulnerable:           #d97706
--near-threatened:      #ca8a04
--least-concern:        #16a34a
```

### **Typography Scale**
```css
/* Headers */
h1: text-4xl md:text-5xl font-bold
h2: text-2xl font-bold
h3: text-lg font-bold
h4: text-sm font-semibold

/* Body Text */
body: text-base font-normal
subtitle: text-lg md:text-xl font-light
caption: text-xs text-gray-500
```

---

## 🔧 **Data Architecture**

### **Mock Data Structure**
```typescript
interface Species {
  id: number;
  name: string;
  scientificName: string;
  status: ConservationStatus;
  location: [longitude: number, latitude: number];
  population: string;
  threats: string[];
  imageUrl: string;
  description: string;
}

interface Sanctuary {
  id: number;
  name: string;
  location: [longitude: number, latitude: number];
  area: string;
  established: string;
  species: string[];
  imageUrl: string;
  description: string;
}

interface SchoolProject {
  id: number;
  name: string;
  school: string;
  location: [longitude: number, latitude: number];
  participants: number;
  focus: string;
  imageUrl: string;
  description: string;
}
```

### **Database Schema (Future Supabase Implementation)**
```sql
-- Species Table
CREATE TABLE species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  scientific_name VARCHAR,
  conservation_status VARCHAR,
  location POINT, -- PostGIS for spatial data
  population_estimate VARCHAR,
  threats TEXT[],
  image_url VARCHAR,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sanctuaries Table
CREATE TABLE sanctuaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  location POINT,
  area_km2 DECIMAL,
  established_year INTEGER,
  protected_species TEXT[],
  image_url VARCHAR,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- School Projects Table
CREATE TABLE school_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name VARCHAR NOT NULL,
  school_name VARCHAR NOT NULL,
  location POINT,
  participant_count INTEGER,
  focus_area VARCHAR,
  image_url VARCHAR,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🌐 **API Integration Pattern**

### **External Services Integration**
```typescript
// Mapbox Configuration
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN;

// Map Instance Creation
const map = new mapboxgl.Map({
  container: mapContainerRef.current,
  style: 'mapbox://styles/mapbox/outdoors-v12',
  center: [20, 20], // Global center
  zoom: 2 // Global zoom level
});

// Dynamic Marker Creation
const addMarkers = (map: mapboxgl.Map) => {
  if (filters.species) {
    mockData.species.forEach(species => {
      const marker = createMarker('red', species);
      new mapboxgl.Marker(marker)
        .setLngLat(species.location)
        .addTo(map);
    });
  }
};
```

### **Future API Endpoints**
```
GET  /api/species                    # List all species
GET  /api/species/:id               # Get species details
GET  /api/sanctuaries               # List all sanctuaries
GET  /api/sanctuaries/:id           # Get sanctuary details
GET  /api/school-projects           # List all school projects
POST /api/species                   # Add new species (admin)
PUT  /api/species/:id               # Update species (admin)
GET  /api/search?q=:query           # Search across all data
```

---

## 🔒 **Security & Performance**

### **Security Measures**
- **Environment Variables**: API keys stored securely
- **Row Level Security**: Supabase RLS for data protection
- **Input Validation**: TypeScript type checking
- **Image Error Handling**: Graceful fallbacks for broken images
- **XSS Prevention**: React's built-in protections

### **Performance Optimizations**
- **Dynamic Imports**: Lazy load heavy map components
- **Image Optimization**: Unsplash URL parameters for size control
- **Bundle Optimization**: Next.js automatic code splitting
- **Marker Management**: Efficient DOM manipulation
- **State Optimization**: Minimal re-renders with proper dependencies

---

## 📱 **Responsive Design**

### **Breakpoint Strategy**
```css
/* Mobile First Approach */
default:     Mobile (320px+)
sm:          640px+
md:          768px+
lg:          1024px+
xl:          1280px+
2xl:         1536px+
```

### **Layout Adaptations**
- **Header**: Responsive title sizing and layout stacking
- **Filter Pills**: Wrap on smaller screens
- **Search Bar**: Full width on mobile, side-by-side on desktop
- **Detail Panel**: Full width overlay on mobile, sidebar on desktop
- **Map**: Full viewport with responsive controls

---

## 🚀 **Deployment Architecture**

### **Fly.io Deployment Strategy**
```bash
# Development
npm run dev          # Start development server

# Production Build (Local Testing)
npm run build        # Create optimized production build
npm run start        # Start production server

# Production Deployment with Build Args (Required for Next.js)
fly deploy --build-arg NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="pk.eyJ1Ijoia2FzeTk5NjYiLCJhIjoiY21jc2MzY2dwMTJwdTJrcG15b2UwM2xkMCJ9.jCy11Lv06CoKRP5vo_lkgw" --build-arg NEXT_PUBLIC_SUPABASE_URL="https://umxkciskfoaacwhzdamd.supabase.co" --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGtjaXNrZm9hYWN3aHpkYW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NTY0MDMsImV4cCI6MjA2NzQzMjQwM30.iht9pyj3hPXx_AVEsDk9Fbz9Yzxdo9NyRxn8Ov_u3Xs"

# Alternative: Quick Deployment (if secrets are set)
fly deploy           # Simple deployment (only if build args are in fly.toml)

# Check deployment status
fly status           # View app status
fly logs             # View application logs
fly open             # Open deployed app in browser
```

### **Deployment Troubleshooting**
```bash
# Debug deployment issues
fly logs --app wildtrace                    # View real-time logs
fly ssh console --app wildtrace             # SSH into running container
fly status --app wildtrace                  # Check machine status

# Environment verification
fly secrets list --app wildtrace            # Check set secrets
fly config env --app wildtrace              # View environment config

# Restart application
fly machine restart --app wildtrace         # Restart all machines
fly scale count 2 --app wildtrace          # Scale to 2 instances
```

### **Why Fly.io?**
- **Cost-Effective**: Free tier for sample projects (up to 3 shared-cpu-1x machines)
- **Global Edge**: Automatic deployment to 30+ regions worldwide
- **Zero-Config Scaling**: Scales to zero when not in use
- **Simple Deployment**: Single command deployment with `fly deploy`
- **Built-in HTTPS**: Automatic SSL certificates
- **Docker Native**: Seamless container deployment

### **Environment Configuration**
```env
# Required Environment Variables (Build-time for Next.js)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1Ijoia2FzeTk5NjYiLCJhIjoiY21jc2MzY2dwMTJwdTJrcG15b2UwM2xkMCJ9.jCy11Lv06CoKRP5vo_lkgw
NEXT_PUBLIC_SUPABASE_URL=https://umxkciskfoaacwhzdamd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGtjaXNrZm9hYWN3aHpkYW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NTY0MDMsImV4cCI6MjA2NzQzMjQwM30.iht9pyj3hPXx_AVEsDk9Fbz9Yzxdo9NyRxn8Ov_u3Xs

# Optional: For server-side operations (admin functions)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### **Production Environment Variables (Fly.io)**
```bash
# Set production environment variables for Fly.io deployment
fly secrets set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="pk.eyJ1Ijoia2FzeTk5NjYiLCJhIjoiY21jc2MzY2dwMTJwdTJrcG15b2UwM2xkMCJ9.jCy11Lv06CoKRP5vo_lkgw"
fly secrets set NEXT_PUBLIC_SUPABASE_URL="https://umxkciskfoaacwhzdamd.supabase.co"
fly secrets set NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGtjaXNrZm9hYWN3aHpkYW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NTY0MDMsImV4cCI6MjA2NzQzMjQwM30.iht9pyj3hPXx_AVEsDk9Fbz9Yzxdo9NyRxn8Ov_u3Xs"

# View current secrets
fly secrets list
```

### **Important Deployment Notes**
- **Build-time Variables**: Next.js `NEXT_PUBLIC_*` variables are embedded during build
- **Build Args Required**: Must pass env vars as build arguments for Docker builds
- **Token Security**: Mapbox and Supabase anon keys are safe for client-side use
- **Future Deployments**: Use documented commands below for consistent deployments

### **Supabase Configuration Notes**
- **anon/public key**: Safe for browser use, used for client-side operations
- **service_role key**: Server-side only, full admin access to database
- **URL format**: `https://umxkciskfoaacwhzdamd.supabase.co` (project: umxkciskfoaacwhzdamd)
- **Row Level Security**: Recommended to enable for production data protection

---

## 🔮 **Future Enhancements**

### **Planned Features**
1. **Real-time Data**: Live species tracking updates
2. **User Authentication**: Conservationist profiles and contributions
3. **Data Visualization**: Charts and analytics dashboard
4. **Mobile App**: React Native companion app
5. **AI Integration**: Species identification from photos
6. **Community Features**: User-generated content and reports

### **Technical Improvements**
1. **Progressive Web App**: Offline functionality
2. **Advanced Caching**: Redis for API response caching
3. **Real-time Updates**: WebSocket connections for live data
4. **Advanced Search**: Full-text search with filters
5. **Data Export**: CSV/PDF report generation
6. **Monitoring**: Application performance monitoring

---

## 📊 **Key Metrics & Monitoring**

### **Performance Metrics**
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **Bundle Size**: Track JavaScript payload size
- **Map Load Time**: Mapbox initialization performance
- **API Response Time**: External service latency

### **User Experience Metrics**
- **Filter Usage**: Track most popular filters
- **Marker Interactions**: Click-through rates
- **Search Queries**: Popular search terms
- **Detail Panel Views**: Engagement with detailed information

---

## 🛠️ **Development Guidelines**

### **Code Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Automated code formatting
- **Git Hooks**: Pre-commit linting and testing

### **Component Patterns**
- **Functional Components**: Use hooks over class components
- **Custom Hooks**: Extract reusable logic
- **Prop Interfaces**: Define clear component APIs
- **Error Boundaries**: Graceful error handling

### **File Naming**
- **Pages**: kebab-case (conservation-map)
- **Components**: PascalCase (SpeciesMarker)
- **Hooks**: camelCase with 'use' prefix (useMapData)
- **Types**: PascalCase with descriptive names

---

*Last Updated: December 2024*
*Version: 1.0.0*
