import React from 'react';
import type { FilterTag, ActiveFilters } from '../types';
import XMarkIcon from './icons/XMarkIcon';

interface FilterTagsProps {
  activeFilters: ActiveFilters;
  resultsCount: number;
  onRemoveFilter?: (filter: FilterTag) => void;
  onClearAll?: () => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({
  activeFilters,
  resultsCount,
  onRemoveFilter,
  onClearAll
}) => {
  // Convert activeFilters to FilterTag array
  const filterTags: FilterTag[] = [
    ...activeFilters.guilds.map(guild => ({ type: 'guild' as const, value: guild })),
    ...activeFilters.mainSkills.map(skill => ({ type: 'mainSkill' as const, value: skill })),
    ...activeFilters.levels.map(level => ({ type: 'level' as const, value: level })),
    ...(activeFilters.search ? [{ type: 'search' as const, value: activeFilters.search, label: `Search: ${activeFilters.search}` }] : [])
  ];

  const handleRemoveFilter = (filter: FilterTag) => {
    if (onRemoveFilter) {
      onRemoveFilter(filter);
    }
  };

  const hasActiveFilters = filterTags.length > 0;

  return (
    <div 
      className="w-full px-6 flex items-center justify-between h-full"
      data-testid="filter-tags-container"
    >
      {/* Left side: Filter tags */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {hasActiveFilters ? (
          <>
            {filterTags.map((filter, index) => (
              <div
                key={`${filter.type}-${filter.value}-${index}`}
                className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-gray-800 shadow-sm"
                data-testid="filter-tag"
              >
                <span className="truncate">
                  {filter.label || filter.value}
                </span>
                <button
                  onClick={() => handleRemoveFilter(filter)}
                  className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={`Remove ${filter.label || filter.value} filter`}
                  data-testid="remove-filter-btn"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            {/* Clear All button */}
            {filterTags.length > 1 && onClearAll && (
              <button
                onClick={onClearAll}
                className="text-white/80 hover:text-white text-sm font-medium underline transition-colors"
                data-testid="clear-all-btn"
              >
                Clear All
              </button>
            )}
          </>
        ) : (
          <span className="text-white/60 text-sm">
            No active filters
          </span>
        )}
      </div>

      {/* Right side: Results counter */}
      <div className="flex-shrink-0 ml-6">
        <span 
          className="text-white font-medium text-lg"
          data-testid="results-counter"
        >
          {resultsCount} Results
        </span>
      </div>
    </div>
  );
};

export default FilterTags; 