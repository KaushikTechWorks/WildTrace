'use client'

import { useEffect } from 'react'
import { MapPin, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function SpeciesMapError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Conservation Map error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="mb-4">
          <MapPin className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Map Loading Error
        </h2>
        
        <p className="text-gray-600 mb-4">
          We encountered an issue loading the conservation map. This could be due to:
        </p>
        
        <ul className="text-left text-sm text-gray-600 mb-6 space-y-1">
          <li>• Missing Mapbox access token</li>
          <li>• Network connectivity issues</li>
          <li>• Temporary service unavailability</li>
        </ul>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Map Loading
          </button>
          
          <Link
            href="/"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>
            Need help setting up Mapbox?{' '}
            <Link href="/" className="text-emerald-600 hover:underline">
              Check setup instructions
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
