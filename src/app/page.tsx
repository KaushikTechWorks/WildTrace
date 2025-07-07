import { MapPin, Leaf, Users, BarChart3, Shield, Globe, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
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
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Dashboard</a>
              <a href="/species-map" className="text-gray-700 hover:text-green-600 transition-colors">Species Map</a>
              <a href="/start-project" className="text-gray-700 hover:text-green-600 transition-colors">School Projects</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Community</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Track Endangered Species
              <span className="block text-green-600">Protect Our Wildlife</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Interactive maps and data-driven insights for conservationists, researchers, and the public. 
              Together, we can make a difference in protecting endangered species and their habitats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/species-map" className="conservation-gradient text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center">
                Explore Species Map
              </a>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How WildTrace Helps Conservation</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines public biodiversity datasets with interactive mapping to provide actionable insights for wildlife protection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="h-8 w-8 text-green-600" />}
              title="Interactive Species Maps"
              description="Visualize endangered species locations, habitats, and migration patterns with real-time data from global biodiversity databases."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-blue-600" />}
              title="Conservation Insights"
              description="Data-driven recommendations for protecting critical habitats, combating threats, and prioritizing conservation efforts."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-purple-600" />}
              title="Community Engagement"
              description="Connect conservationists, researchers, and local communities to collaborate on wildlife protection initiatives."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-orange-600" />}
              title="Threat Analysis"
              description="Monitor habitat loss, climate change impacts, poaching activities, and other threats to endangered species."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8 text-teal-600" />}
              title="Global Coverage"
              description="Access comprehensive data from GBIF, IUCN Red List, and other authoritative biodiversity sources worldwide."
            />
            <FeatureCard
              icon={<Leaf className="h-8 w-8 text-green-600" />}
              title="Conservation Actions"
              description="Find and support local conservation programs, eco-tourism opportunities, and sustainable practices."
            />
          </div>
        </div>
      </section>

      {/* Educational Impact Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Inspiring the Next Generation of Conservationists
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empower students and educators with engaging conservation projects that make a real difference for endangered species.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="conservation-gradient p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">School Projects</h3>
              <p className="text-gray-600 mb-4">
                Guide students through meaningful conservation projects that fundraise for local wildlife sanctuaries.
              </p>
              <div className="text-2xl font-bold text-blue-600 mb-1">150+</div>
              <div className="text-sm text-gray-500">Active School Projects</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="conservation-gradient p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wildlife Sanctuaries</h3>
              <p className="text-gray-600 mb-4">
                Connect with local sanctuaries for educational visits, volunteer opportunities, and fundraising support.
              </p>
              <div className="text-2xl font-bold text-green-600 mb-1">85</div>
              <div className="text-sm text-gray-500">Partner Sanctuaries</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="conservation-gradient p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Impact</h3>
              <p className="text-gray-600 mb-4">
                Inspire community action through student-led conservation campaigns and educational outreach.
              </p>
              <div className="text-2xl font-bold text-purple-600 mb-1">$2.1M</div>
              <div className="text-sm text-gray-500">Raised for Conservation</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="md:flex items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="md:flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start a Conservation Project?</h3>
                <p className="text-gray-600 mb-6">
                  Our step-by-step guide helps teachers and students create meaningful conservation projects that educate, 
                  engage, and raise funds for endangered species protection. Get educational resources, connect with 
                  wildlife sanctuaries, and inspire your community to take action.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/start-project" className="conservation-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center">
                    Start School Project
                  </a>
                  <a href="/species-map" className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center">
                    Explore Species Map
                  </a>
                </div>
              </div>
              <div className="md:w-80 bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3">Featured Success Story</h4>
                <div className="text-sm text-green-800">
                  <p className="mb-2">
                    <strong>Greenwood Elementary</strong> raised <strong>$3,750</strong> for tiger conservation through 
                    their &ldquo;Save the Tigers&rdquo; project, involving 85 students in art exhibitions and community outreach.
                  </p>
                  <p className="text-green-600 font-medium">
                    &ldquo;Our students are now passionate advocates for wildlife conservation!&rdquo; - Ms. Sarah Johnson, Teacher
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 conservation-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">41,415</div>
              <div className="text-lg opacity-90">Species Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2,847</div>
              <div className="text-lg opacity-90">Conservation Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">193</div>
              <div className="text-lg opacity-90">Countries Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15,200</div>
              <div className="text-lg opacity-90">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">WildTrace</span>
              </div>
              <p className="text-gray-400">
                Protecting endangered species through data-driven conservation and community action.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Species Database</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interactive Maps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Conservation Insights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Conservation Groups</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Network</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Educational Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Volunteer Opportunities</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 WildTrace. All rights reserved. Built for conservation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
