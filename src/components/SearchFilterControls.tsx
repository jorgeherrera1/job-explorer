import React, { useState } from 'react';
import Dropdown from './Dropdown';

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

interface SearchFilterControlsProps {
  guilds?: string[];
  mainSkills?: string[];
  levels?: string[];
}

const SearchFilterControls: React.FC<SearchFilterControlsProps> = ({
  guilds = [],
  mainSkills = [],
  levels = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const clearSearch = () => setSearchTerm('');

  return (
    <div class="grid grid-cols-4 divide-x divide-gray-300">
      {/* Search */}
      <div class="relative pr-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          class="w-full bg-transparent placeholder-gray-500 focus:outline-none text-lg h-12"
          placeholder="Search jobs..."
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            class="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div class="px-6">
        <Dropdown label="Guilds" options={guilds} placeholder="All Guilds" />
      </div>
      
      <div class="px-6">
        <Dropdown label="Main Skills" options={mainSkills} placeholder="All Skills" />
      </div>
      
      <div class="pl-6">
        <Dropdown label="Level" options={levels} placeholder="All Levels" />
      </div>
    </div>
  );
};

export default SearchFilterControls;