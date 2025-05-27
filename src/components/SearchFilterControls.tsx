import React, { useState } from 'react';
import Dropdown from './Dropdown';
import XMarkIcon from './icons/XMarkIcon';

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
    <div className="grid grid-cols-4 divide-x divide-gray-300">
      {/* Search */}
      <div className="relative pr-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent placeholder-gray-500 focus:outline-none text-lg h-12"
          placeholder="Search jobs..."
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="px-6">
        <Dropdown label="Guilds" options={guilds} placeholder="All Guilds" />
      </div>
      
      <div className="px-6">
        <Dropdown label="Main Skills" options={mainSkills} placeholder="All Skills" />
      </div>
      
      <div className="pl-6">
        <Dropdown label="Level" options={levels} placeholder="All Levels" />
      </div>
    </div>
  );
};

export default SearchFilterControls;