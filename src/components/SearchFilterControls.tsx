import React, { useState } from 'react';
import Dropdown from './Dropdown';

// Custom SVG Icons
const XMarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

interface SearchFilterControlsProps {
  guilds?: string[];
  mainSkills?: string[];
  levels?: string[];
  onSearchChange?: (searchTerm: string) => void;
  onGuildChange?: (guilds: string[]) => void;
  onMainSkillChange?: (mainSkills: string[]) => void;
  onLevelChange?: (levels: string[]) => void;
  initialSearch?: string;
}

const SearchFilterControls: React.FC<SearchFilterControlsProps> = ({
  guilds = [],
  mainSkills = [],
  levels = [],
  onSearchChange,
  onGuildChange,
  onMainSkillChange,
  onLevelChange,
  initialSearch = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearchChange?.('');
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
      {/* Search Input */}
      <div className="lg:col-span-1">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-transparent placeholder-gray-500 focus:outline-none text-lg leading-5 appearance-none box-border min-h-[48px]"
            placeholder="Search jobs..."
            aria-label="Search jobs"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 focus:outline-none transition-colors duration-200"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Vertical Separator after Search */}
      <div className="hidden lg:block absolute left-1/4 top-0 bottom-0 w-px bg-gray-300"></div>

      {/* Guild Dropdown */}
      <div className="lg:col-span-1">
        <Dropdown
          label="Guilds"
          options={guilds}
          onSelectionChange={onGuildChange}
          placeholder="All Guilds"
        />
      </div>

      {/* Vertical Separator after Guilds */}
      <div className="hidden lg:block absolute left-2/4 top-0 bottom-0 w-px bg-gray-300"></div>

      {/* Main Skills Dropdown */}
      <div className="lg:col-span-1">
        <Dropdown
          label="Main Skills"
          options={mainSkills}
          onSelectionChange={onMainSkillChange}
          placeholder="All Skills"
        />
      </div>

      {/* Vertical Separator after Main Skills */}
      <div className="hidden lg:block absolute left-3/4 top-0 bottom-0 w-px bg-gray-300"></div>

      {/* Level Dropdown */}
      <div className="lg:col-span-1">
        <Dropdown
          label="Level"
          options={levels}
          onSelectionChange={onLevelChange}
          placeholder="All Levels"
        />
      </div>
    </div>
  );
};

export default SearchFilterControls; 