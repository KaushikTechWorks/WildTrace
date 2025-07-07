'use client'

import { useEffect } from 'react'
import { GraduationCap, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function StartProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Start Project error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="mb-4">
          <GraduationCap className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Project Creation Error
        </h2>
        
        <p className="text-gray-600 mb-6">
          We encountered an issue loading the school project creation wizard. 
          Please try again or return to the home page.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Project Creation
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
            Need help with school projects?{' '}
            <Link href="/" className="text-emerald-600 hover:underline">
              Check our guides
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
