import { GraduationCap, Loader2 } from 'lucide-react';

export default function StartProjectLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">School Projects</h1>
          </div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Loading School Projects
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Preparing educational conservation initiatives and project data...
          </p>
          
          {/* Loading steps */}
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading project database...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}