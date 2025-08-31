import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  error: string;
  title?: string;
  actions?: React.ReactNode;
}

export function ErrorState({ 
  error, 
  title = "Something went wrong",
  actions 
}: ErrorStateProps) {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-red-500 mb-6">
            <AlertCircle className="mx-auto h-24 w-24" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-8">
            {error}
          </p>
          {actions || (
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
