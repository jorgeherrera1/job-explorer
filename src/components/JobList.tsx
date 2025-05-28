import React from 'react';
import type { Job } from '../types';
import ChevronIcon from './icons/ChevronIcon';

interface JobListProps {
  jobs: Job[];
  selectedJobId?: string;
}

const JobList: React.FC<JobListProps> = ({ jobs, selectedJobId }) => {
  return (
    <>
      {jobs.map((job) => {
        const { id, jobTitle, level } = job;
        const isSelected = selectedJobId === id;
        return (
        <a
          key={id}
          href={`/jobs/${id}`}
          className={`w-full px-4 py-3 transition-colors duration-150 cursor-pointer block ${
            isSelected 
              ? 'bg-indigo-900 rounded-full text-white border-b-transparent' 
              : 'border-b border-gray-100 hover:bg-gray-50'
          }`}
          data-astro-transition={`job-item-${id}`}
        >
          <div className="flex items-center justify-between">
            <div className={`text-sm font-medium truncate flex-1 min-w-0 pr-3 ${
              isSelected ? 'text-white' : 'text-gray-900'
            }`}>
              {jobTitle}
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                isSelected 
                  ? 'bg-white text-indigo-900' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {level.code}-{level.name}
              </div>
              <ChevronIcon direction="right" className={`h-5 w-5 flex-shrink-0 ${
                isSelected ? 'text-white' : 'text-gray-400'
              }`} />
            </div>
          </div>
        </a>
        );
      })}
    </>
  );
};

export default JobList;