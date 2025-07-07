'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Critical Error
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                WildTrace encountered a critical error and needs to be restarted.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-left">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Error Details:</h3>
                <code className="text-xs text-red-600 break-words">
                  {error.message}
                </code>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Restart Application</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Please refresh the page or restart your browser if the problem persists.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}