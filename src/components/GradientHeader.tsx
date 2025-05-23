import React from 'react';

interface GradientHeaderProps {
  // Future props for interactivity:
  // resultsCount?: number;
  // selectedFilters?: string[];
  // onFilterRemove?: (filter: string) => void;
}

const GradientHeader: React.FC<GradientHeaderProps> = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-teal-500 h-16 relative flex items-center">
      {/* Empty for now - will add tags and results counter later */}
      {/* Future content will include: */}
      {/* - Filter tags with remove buttons */}
      {/* - Results counter */}
      {/* - Clear all filters button */}
    </div>
  );
};

export default GradientHeader; 