import React, { useState, useRef, useEffect } from 'react';
import ChevronIcon from './icons/ChevronIcon';

interface DropdownProps {
  label: string;
  options: string[];
  placeholder?: string;
  selectedValues: string[];
  onToggle: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, placeholder, selectedValues, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOptionClick = (option: string) => {
    onToggle(option);
  };

  const clearAllSelections = () => {
    selectedValues.forEach(value => onToggle(value));
  };

  const displayValue = selectedValues.length > 0 
    ? `${selectedValues.length} Selected`
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
          <span className={`text-sm truncate ${selectedValues.length > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            {displayValue}
          </span>
        </div>
        <ChevronIcon direction="down" className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-80 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[500px] flex flex-col">
          <div className="p-4 border-b border-gray-100 flex-shrink-0">
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-3">
                You can select one or more {label.toLowerCase()}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  ({selectedValues.length}) Selected
                </span>
                {selectedValues.length > 0 && (
                  <button
                    onClick={clearAllSelections}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 p-4">
            <div className="grid grid-cols-1 gap-3">
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 text-sm rounded-full border text-center transition-all duration-200 font-medium ${
                    selectedValues.includes(option)
                      ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
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