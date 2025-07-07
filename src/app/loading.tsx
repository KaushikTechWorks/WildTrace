import { Leaf } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative mx-auto w-20 h-20">
            {/* Spinning outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-600 animate-spin"></div>
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="conservation-gradient p-3 rounded-full">
                <Leaf className="h-8 w-8 text-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            Loading WildTrace
          </h2>
          <p className="text-gray-600 max-w-sm mx-auto">
            Preparing conservation data and interactive maps...
          </p>
        </div>
        
        {/* Progress indicators */}
        <div className="mt-8 space-y-2">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}