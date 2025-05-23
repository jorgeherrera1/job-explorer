import React, { useState, useRef, useEffect } from 'react';

// Custom SVG Icon
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

interface DropdownProps {
  label: string;
  options: string[];
  onSelectionChange?: (selected: string[]) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  label, 
  options, 
  onSelectionChange,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionToggle = (option: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const isSelected = selectedOptions.includes(option);
    let newSelection: string[];
    
    if (isSelected) {
      newSelection = selectedOptions.filter(item => item !== option);
    } else {
      newSelection = [...selectedOptions, option];
    }
    
    setSelectedOptions(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleClearAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedOptions([]);
    onSelectionChange?.([]);
  };

  const displayValue = selectedOptions.length > 0 
    ? `${selectedOptions.length} ${selectedOptions.length === 1 ? 'Element' : 'Elements'}`
    : placeholder || `Select ${label}`;
  
  const hasValue = selectedOptions.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-transparent hover:bg-gray-50 focus:outline-none transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider leading-tight">
            {label}
          </span>
          <span className={`text-sm truncate leading-tight ${
            hasValue ? 'text-gray-900 font-medium' : 'text-gray-500'
          }`}>
            {displayValue}
          </span>
        </div>
        <ChevronDownIcon 
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ml-2 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-max">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  You can select one or more {label.toLowerCase()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  ({selectedOptions.length}) Selected
                </span>
                {selectedOptions.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Pills Grid */}
            <div className="grid grid-cols-2 gap-2 max-w-md">
              {options.map((option) => {
                const isSelected = selectedOptions.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={(event) => handleOptionToggle(option, event)}
                    className={`px-4 py-2 text-sm rounded-full border transition-all duration-150 text-left ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown; 