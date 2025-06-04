import React, { useState, useRef, useEffect, useId } from 'react';
import ChevronIcon from './icons/ChevronIcon';

interface DropdownProps {
  label: string;
  options: string[];
  placeholder?: string;
  selectedValues: string[];
  onToggle: (value: string) => void;
  sortAlphabetically?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, placeholder, selectedValues, onToggle, sortAlphabetically = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const uniqueId = useId();
  const popoverId = `dropdown-${uniqueId}`;
  
  // Sort options alphabetically if requested
  const sortedOptions = sortAlphabetically 
    ? [...options].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    : options;

  // Feature detection for Popover API
  const supportsPopover = typeof window !== 'undefined' && 'popover' in HTMLElement.prototype;

  useEffect(() => {
    if (supportsPopover && popoverRef.current && buttonRef.current) {
      const popoverElement = popoverRef.current;
      const buttonElement = buttonRef.current; // Store button ref for use in beforetoggle

      const handleBeforeToggle = (event: Event) => {
        const customEvent = event as any; // Cast to any to access newState
        if (customEvent.newState === 'open') {
          const buttonRect = buttonElement.getBoundingClientRect();
          popoverElement.style.position = 'fixed';
          popoverElement.style.top = `${buttonRect.bottom + 8}px`; // 8px for mt-2 spacing
          popoverElement.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
          popoverElement.style.transform = 'translateX(-50%)';
          popoverElement.style.minWidth = `${Math.max(320, buttonRect.width)}px`; // w-80 is 320px
        }
        // Sync React state (optional, but good for chevron)
        setIsOpen(customEvent.newState === 'open'); 
      };

      // Use beforetoggle to set position before it's shown
      popoverElement.addEventListener('beforetoggle', handleBeforeToggle);
      
      // Fallback for syncing React state if beforetoggle doesn't cover all cases
      // or if we need to react *after* it has toggled for other reasons.
      // For chevron icon, `isOpen` state is enough, driven by beforetoggle.

      return () => {
        popoverElement.removeEventListener('beforetoggle', handleBeforeToggle);
      };
    }
  }, [supportsPopover]); // Add buttonRef.current to dependencies if it changes, but it shouldn't

  // Fallback click-outside logic for non-popover browsers
  useEffect(() => {
    if (!supportsPopover) {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [supportsPopover]);

  const handleButtonClick = () => {
    if (!supportsPopover) {
      // Fallback manual toggle for browsers without popover support
      setIsOpen(!isOpen);
      // Manually apply positioning for fallback
      if (!isOpen && popoverRef.current && buttonRef.current) { // if about to open
        const popoverElement = popoverRef.current;
        const buttonElement = buttonRef.current;
        const buttonRect = buttonElement.getBoundingClientRect();
        popoverElement.style.position = 'absolute'; // Keep it relative to parent for fallback
        popoverElement.style.top = `${buttonElement.offsetHeight + 8}px`; // Relative to button
        popoverElement.style.left = `${buttonElement.offsetWidth / 2}px`;
        popoverElement.style.transform = 'translateX(-50%)';
        popoverElement.style.minWidth = `${Math.max(320, buttonRect.width)}px`;
      }
    }
    // For popover-supported browsers, let the popovertarget attribute handle it
  };

  const handleOptionClick = (option: string) => {
    onToggle(option);
  };

  const clearAllSelections = () => {
    selectedValues.forEach(value => onToggle(value));
  };

  const displayValue = selectedValues.length > 0 
    ? `${selectedValues.length} Selected`
    : placeholder || `Select ${label}`;

  const dropdownContent = (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[500px] flex flex-col">
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
          {sortedOptions.map(option => (
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
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        {...(supportsPopover ? { popovertarget: popoverId } : {})}
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

      {supportsPopover ? (
        <div
          ref={popoverRef}
          popover="auto"
          id={popoverId}
          className="z-50"
        >
          {dropdownContent}
        </div>
      ) : (
        isOpen && (
          <div 
            ref={popoverRef}
            className="absolute z-50"
          >
            {dropdownContent}
          </div>
        )
      )}
    </div>
  );
};

export default Dropdown;