import Link from 'next/link';
import { MapPin, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="h-10 w-10 text-gray-400" />
          </div>
          <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Species Not Found
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            The conservation page you&apos;re looking for seems to have migrated to a different habitat.
          </p>
        </div>

        <div className="space-y-3">
          <Link 
            href="/"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>
          
          <Link 
            href="/conservation-map"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Explore Conservation Map</span>
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Every species matters in conservation - let&apos;s find what you&apos;re looking for.
        </p>
      </div>
    </div>
  );
}