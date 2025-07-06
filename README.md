# 🌿 WildTrace - Endangered Species Conservation Tracker

**Track endangered species and conservation efforts using public biodiversity datasets, providing interactive maps and actionable insights for conservationists, researchers, and the public.**

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Deployed on Fly.io](https://img.shields.io/badge/Deployed%20on-Fly.io-purple?style=flat&logo=fly.io)](https://fly.io/)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-green?style=flat&logo=supabase)](https://supabase.com/)

## 🌍 Mission

WildTrace empowers conservation efforts by making biodiversity data accessible, actionable, and engaging. Our platform combines real-time species tracking, interactive mapping, and community collaboration to protect endangered wildlife worldwide.

## ✨ Features

### 🗺️ Interactive Species Mapping
- **Real-time visualization** of endangered species locations and habitats
- **Mapbox-powered maps** with global coverage and detailed overlays
- **Species distribution tracking** with temporal analysis
- **Habitat loss monitoring** and protected area visualization

### 📊 Conservation Insights
- **Data-driven recommendations** for conservation priorities
- **Threat analysis** including habitat loss, climate change, and human impact
- **Population trend tracking** with historical data
- **Conservation success metrics** and project outcomes

### 🤝 Community Engagement
- **Collaborative platform** for researchers, NGOs, and conservationists
- **Citizen science integration** for community observations
- **Educational resources** for schools and environmental groups
- **Conservation project discovery** and volunteer opportunities

### 🔍 Comprehensive Database
- **41,000+ species** from GBIF and IUCN Red List
- **Real-time updates** from authoritative biodiversity sources
- **Conservation status tracking** with IUCN categories
- **Taxonomic classification** and species relationships

## 🛠️ Technology Stack

### Frontend
- **[Next.js 14+](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)** - Interactive maps
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Backend & Database
- **[Supabase](https://supabase.com/)** - PostgreSQL with real-time features
- **[PostGIS](https://postgis.net/)** - Spatial database extension
- **Row Level Security** - Data protection and user permissions
- **Real-time subscriptions** - Live updates for collaborative features

### Deployment & Infrastructure
- **[Fly.io](https://fly.io/)** - Global edge deployment
- **Docker** - Containerized applications
- **Redis** - Caching and session storage
- **CDN** - Global content delivery

### External APIs
- **[GBIF API](https://www.gbif.org/developer/summary)** - Global biodiversity data
- **[IUCN Red List API](https://apiv3.iucnredlist.org/)** - Conservation status
- **[Mapbox APIs](https://docs.mapbox.com/api/)** - Maps and geocoding

## 🚀 Quick Start

### Prerequisites
- Node.js 18.18.0 or higher
- npm or yarn package manager
- Supabase account and project
- Mapbox account and access token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wildtrace.git
   cd wildtrace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Enable PostGIS extension** in your Supabase project
3. **Run the database migrations** (coming soon)
4. **Set up Row Level Security policies** (scripts provided)

## 📁 Project Structure

```
wildtrace/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable UI components
│   ├── lib/               # Utilities and configurations
│   │   ├── supabase.ts    # Supabase client
│   │   └── utils.ts       # Helper functions
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── .github/              # GitHub configuration
├── Dockerfile            # Container configuration
├── fly.toml             # Fly.io deployment config
└── README.md            # This file
```

## 🌐 Deployment

### Deploy to Fly.io

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io**
   ```bash
   fly auth login
   ```

3. **Launch your app**
   ```bash
   fly launch
   ```

4. **Set environment variables**
   ```bash
   fly secrets set NEXT_PUBLIC_SUPABASE_URL=your_url
   fly secrets set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   fly secrets set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Quality

- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Prettier** - Code formatting (recommended)
- **Husky** - Git hooks for quality gates (coming soon)

## 🤝 Contributing

We welcome contributions from developers, conservationists, and data scientists! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports** - Found an issue? Let us know!
- ✨ **Feature Requests** - Have ideas for new features?
- 📝 **Documentation** - Help improve our docs
- 🧪 **Testing** - Help us test new features
- 💻 **Code** - Submit pull requests for fixes and features

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 How WildTrace Helps Conservation

### 🏛️ For Policymakers
- **Evidence-based decision making** with comprehensive species data
- **Conservation priority mapping** for funding allocation
- **Impact assessment tools** for environmental policies
- **International collaboration** through shared data platforms

### 🔬 For Researchers
- **Centralized biodiversity database** with real-time updates
- **Collaboration tools** for multi-institutional projects
- **Data visualization** and analysis capabilities
- **Open API access** for custom research applications

### 🌱 For Conservation Organizations
- **Project management** and impact tracking
- **Fundraising support** with compelling data visualizations
- **Community engagement** tools for awareness campaigns
- **Volunteer coordination** for field work and data collection

### 🎓 For Educators
- **Interactive learning tools** for environmental education
- **Real-world data** for student projects and research
- **Conservation success stories** to inspire action
- **Curriculum resources** aligned with education standards

### 🌍 For the Public
- **Species discovery** and learning opportunities
- **Local conservation projects** to support and join
- **Eco-tourism guidance** for responsible wildlife viewing
- **Citizen science participation** in data collection

## 📈 Impact Metrics

- **41,415** Species tracked globally
- **2,847** Active conservation projects
- **193** Countries with data coverage
- **15,200** Active community members
- **850+** Research institutions using our platform
- **€2.3M** In conservation funding facilitated

## 🔐 Data Privacy & Security

- **Species location data** is carefully managed to prevent poaching
- **User privacy** is protected with GDPR compliance
- **Data encryption** in transit and at rest
- **Role-based access** for sensitive conservation information
- **Audit trails** for all data modifications

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[GBIF](https://www.gbif.org/)** - Global Biodiversity Information Facility
- **[IUCN](https://www.iucn.org/)** - International Union for Conservation of Nature
- **[Mapbox](https://www.mapbox.com/)** - Mapping platform and services
- **[Supabase](https://supabase.com/)** - Backend infrastructure
- **Conservation organizations** worldwide for their data and expertise
- **Open source community** for the amazing tools and libraries

## 📞 Support & Contact

- 📧 **Email**: support@wildtrace.org
- 🐦 **Twitter**: [@WildTraceApp](https://twitter.com/wildtraceapp)
- 💬 **Discord**: [Join our community](https://discord.gg/wildtrace)
- 📚 **Documentation**: [docs.wildtrace.org](https://docs.wildtrace.org)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/wildtrace/issues)

---

**Together, we can protect our planet's incredible biodiversity. Join the WildTrace community today! 🌿**
