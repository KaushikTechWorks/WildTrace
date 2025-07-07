import { MapPin, Loader2 } from 'lucide-react'

export default function SpeciesMapLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">Conservation Map</h1>
          </div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Loading Conservation Map
          </h2>
          <p className="text-gray-600 mb-4">
            Preparing interactive conservation data...
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>🗺️ Initializing map components</p>
            <p>🐾 Loading species data</p>
            <p>🏛️ Fetching sanctuary information</p>
            <p>🎓 Gathering school projects</p>
          </div>
        </div>
      </div>
    </div>
  )
}
