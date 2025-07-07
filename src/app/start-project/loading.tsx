import { GraduationCap, Loader2 } from 'lucide-react'

export default function StartProjectLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">Start School Project</h1>
          </div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Preparing Project Wizard
          </h2>
          <p className="text-gray-600 mb-4">
            Setting up your conservation project creation tools...
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>📋 Loading project templates</p>
            <p>🐾 Gathering species information</p>
            <p>🎯 Preparing action ideas</p>
            <p>📚 Setting up educational resources</p>
          </div>
        </div>
      </div>
    </div>
  )
}
