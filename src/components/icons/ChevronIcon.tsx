import React from 'react';

interface ChevronIconProps {
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ChevronIcon: React.FC<ChevronIconProps> = ({ className, direction = 'down' }) => {
  const paths = {
    up: 'm4.5 15.75 7.5-7.5 7.5 7.5',
    down: 'm19.5 8.25-7.5 7.5-7.5-7.5',
    left: 'm15.75 19.5-7.5-7.5 7.5-7.5',
    right: 'm8.25 4.5 7.5 7.5-7.5 7.5'
  };

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[direction]} />
    </svg>
  );
};

export default ChevronIcon; 