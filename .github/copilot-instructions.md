<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# WildTrace - Copilot Instructions

WildTrace is an endangered species conservation tracking application built with Next.js 14+, TypeScript, Tailwind CSS, and designed for deployment on Fly.io with Supabase as the backend.

## Project Context

**Purpose**: Track endangered species and conservation efforts using public biodiversity datasets, providing interactive maps and actionable insights for conservationists, researchers, and the public.

**Key Features**:
- Interactive species mapping with Mapbox GL JS
- Conservation project tracking and management
- Real-time biodiversity data from GBIF, IUCN Red List
- Community engagement and collaboration tools
- Data-driven conservation insights and recommendations

## Architecture & Technology Stack

**Frontend**: 
- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- Mapbox GL JS for interactive maps

**Backend & Database**:
- Supabase (PostgreSQL with PostGIS for spatial data)
- Row Level Security for data protection
- Real-time subscriptions for live updates

**Deployment**:
- Fly.io for global edge deployment
- Docker containerization
- Automatic scaling and health checks

**External APIs**:
- GBIF (Global Biodiversity Information Facility)
- IUCN Red List API
- Mapbox Maps and Geocoding

## Coding Guidelines

1. **TypeScript First**: Always use TypeScript with proper type definitions
2. **Component Structure**: Use functional components with hooks
3. **Styling**: Prefer Tailwind CSS utility classes over custom CSS
4. **Data Fetching**: Use Supabase client for database operations
5. **Error Handling**: Implement proper error boundaries and user feedback
6. **Performance**: Optimize for Core Web Vitals and mobile performance
7. **Accessibility**: Follow WCAG guidelines for inclusive design

## File Organization

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## Conservation Domain Knowledge

When working with conservation and biodiversity data:
- Use IUCN Red List categories for conservation status
- Follow scientific naming conventions (genus species)
- Implement proper geographic coordinate handling
- Consider temporal aspects of species observations
- Respect data sensitivity for endangered species locations

## Code Style Preferences

- Use async/await over Promise.then()
- Prefer const assertions and readonly types
- Use descriptive variable names related to conservation terminology
- Implement proper loading states and error handling
- Follow React hooks rules and dependency arrays
- Use semantic HTML and ARIA labels for accessibility

## Testing & Quality

- Write unit tests for utility functions
- Test API integrations with mock data
- Validate TypeScript types and schemas
- Test responsive design across devices
- Verify map interactions and performance

## Security Considerations

- Never expose sensitive species location data publicly
- Implement proper authentication for conservation data
- Use environment variables for API keys
- Follow Supabase Row Level Security best practices
- Validate and sanitize user inputs

## Performance Optimization

- Implement proper image optimization for species photos
- Use dynamic imports for heavy map components
- Optimize database queries with proper indexing
- Implement caching strategies for API responses
- Monitor bundle size and Core Web Vitals
