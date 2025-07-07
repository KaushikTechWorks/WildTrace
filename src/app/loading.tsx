import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading WildTrace
        </h2>
        <p className="text-gray-600">
          Preparing conservation data for you...
        </p>
      </div>
    </div>
  )
}
