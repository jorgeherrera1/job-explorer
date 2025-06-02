import React from 'react';
import { useStore } from '@nanostores/react';
import { filtersStore, updateSearch, toggleGuild, toggleMainSkill, toggleLevel } from '../stores/filters';
import Dropdown from './Dropdown';
import XMarkIcon from './icons/XMarkIcon';

interface SearchFilterControlsProps {
  mainSkills: Array<{mainSkill: string, guild: string}>;
  levels?: string[];
}

const SearchFilterControls: React.FC<SearchFilterControlsProps> = ({
  mainSkills,
  levels = []
}) => {
  const filters = useStore(filtersStore);
  
  const clearSearch = () => updateSearch('');

  // Derive guilds from the skills data
  const guilds = [...new Set(mainSkills.map(item => item.guild))];

  // Derive available main skills based on selected guilds
  const availableMainSkills = filters.guilds.length === 0
    ? [...new Set(mainSkills.map(item => item.mainSkill))]
    : [...new Set(mainSkills
        .filter(item => filters.guilds.includes(item.guild))
        .map(item => item.mainSkill))];

  return (
    <div className="grid grid-cols-4 divide-x divide-gray-300">
      {/* Search */}
      <div className="relative pr-6">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateSearch(e.target.value)}
          className="w-full bg-transparent placeholder-gray-500 focus:outline-none text-lg h-12"
          placeholder="Search jobs..."
        />
        {filters.search && (
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
        <Dropdown 
          label="Guilds" 
          options={guilds} 
          placeholder="All Guilds"
          selectedValues={filters.guilds}
          onToggle={toggleGuild}
        />
      </div>
      
      <div className="px-6">
        <Dropdown 
          label="Main Skills" 
          options={availableMainSkills}
          placeholder="All Skills"
          selectedValues={filters.mainSkills}
          onToggle={toggleMainSkill}
        />
      </div>
      
      <div className="pl-6">
        <Dropdown 
          label="Level" 
          options={levels} 
          placeholder="All Levels"
          selectedValues={filters.levels}
          onToggle={toggleLevel}
        />
      </div>
    </div>
  );
};

export default SearchFilterControls;