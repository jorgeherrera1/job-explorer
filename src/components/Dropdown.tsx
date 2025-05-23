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
  currentValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  label, 
  options, 
  currentValue, 
  onChange, 
  placeholder 
}) => {
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

  const displayValue = currentValue || placeholder || `Select ${label}`;
  const hasValue = Boolean(currentValue);

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
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-auto">
          <div className="py-2">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`w-full px-4 py-3 text-left text-sm hover:bg-indigo-50 focus:outline-none focus:bg-indigo-50 transition-colors duration-150 ${
                  currentValue === option 
                    ? 'bg-indigo-50 text-indigo-700 font-medium' 
                    : 'text-gray-900'
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown; 