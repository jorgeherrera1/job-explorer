import React from 'react';
import { useStore } from '@nanostores/react';
import { filtersStore, clearFilter, clearAllFilters, toggleGuild, toggleMainSkill, toggleLevel } from '../stores/filters';
import type { FilterTag } from '../types';
import XMarkIcon from './icons/XMarkIcon';

interface FilterTagsProps {
  resultsCount?: number; // Keep this for now, will be real count in Phase 2
}

const FilterTags: React.FC<FilterTagsProps> = ({
  resultsCount = 0 // Default to 0, will be real count in Phase 2
}) => {
  const filters = useStore(filtersStore);
  
  // Convert current filter state to FilterTag array
  const filterTags: FilterTag[] = [];
  
  if (filters.search) {
    filterTags.push({ type: 'search', value: filters.search, label: `Search: ${filters.search}` });
  }
  
  // Add guild tags
  filters.guilds.forEach(guild => {
    filterTags.push({ type: 'guild', value: guild });
  });
  
  // Add main skill tags
  filters.mainSkills.forEach(skill => {
    filterTags.push({ type: 'mainSkill', value: skill });
  });
  
  // Add level tags
  filters.levels.forEach(level => {
    filterTags.push({ type: 'level', value: level });
  });

  const handleRemoveFilter = (filter: FilterTag) => {
    if (filter.type === 'search') {
      clearFilter('search');
    } else if (filter.type === 'guild') {
      toggleGuild(filter.value); // This will remove it since it's already selected
    } else if (filter.type === 'mainSkill') {
      toggleMainSkill(filter.value); // This will remove it since it's already selected
    } else if (filter.type === 'level') {
      toggleLevel(filter.value); // This will remove it since it's already selected
    }
  };

  const handleClearAll = () => {
    clearAllFilters();
  };

  return (
    <div 
      className="w-full px-6 flex items-center"
      data-testid="filter-tags-container"
    >
      {/* Results counter - Moved to the left */}
      <div className="flex-shrink-0 mr-6">
        <span 
          className="text-white font-medium text-lg"
          data-testid="results-counter"
        >
          {resultsCount} Jobs
        </span>
      </div>

      {/* Filter tags and Clear All button container */}
      <div className="flex items-center gap-3 flex-1 min-w-0 flex-wrap min-h-9">
        {/* Render tags directly. If filterTags is empty, nothing renders here. */}
        {filterTags.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.value}-${index}`}
            className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-gray-800 shadow-sm flex-shrink-0"
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
        
        {/* Clear All button - shows only if there are multiple tags */}
        {filterTags.length > 1 && (
          <button
            onClick={handleClearAll}
            className="text-white/80 hover:text-white text-sm font-medium underline transition-colors flex-shrink-0"
            data-testid="clear-all-btn"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterTags; 