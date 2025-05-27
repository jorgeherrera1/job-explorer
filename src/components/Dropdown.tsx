import React, { useState, useRef, useEffect } from 'react';
import ChevronIcon from './icons/ChevronIcon';

interface DropdownProps {
  label: string;
  options: string[];
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
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

  const toggleOption = (option: string) => {
    setSelected(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const displayValue = selected.length > 0 
    ? `${selected.length} Selected`
    : placeholder || `Select ${label}`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-12 text-left hover:bg-gray-50 focus:outline-none"
      >
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            {label}
          </span>
          <span className={`text-sm truncate ${selected.length > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            {displayValue}
          </span>
        </div>
        <ChevronIcon direction="down" className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-72 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Select one or more {label.toLowerCase()}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">({selected.length}) Selected</span>
                {selected.length > 0 && (
                  <button
                    onClick={() => setSelected([])}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={`px-4 py-2 text-sm rounded-full border text-left transition-colors ${
                    selected.includes(option)
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;