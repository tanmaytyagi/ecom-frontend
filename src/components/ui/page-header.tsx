import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  showBackButton = false, 
  backHref = "/products",
  backText = "Back to All Products"
}: PageHeaderProps) {
  return (
    <>
      {/* Back Button */}
      {showBackButton && (
        <div className="mb-8">
          <Link 
            href={backHref}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backText}
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
    </>
  );
}
