import React from 'react';
import { useStore } from '@nanostores/react';
import { filteredJobsStore } from '../stores/filters';
import type { Job } from '../types';
import ChevronIcon from './icons/ChevronIcon';

interface JobListProps {
  jobs: Job[]; // Keep this prop - we need the full jobs array to filter
  selectedJobId?: string;
}

const JobList: React.FC<JobListProps> = ({ jobs, selectedJobId }) => {
  // Subscribe to the filtering function
  const getFilteredJobs = useStore(filteredJobsStore);
  
  // Apply filtering to the jobs array
  const filteredJobs = getFilteredJobs(jobs);
  
  return (
    <>
      {filteredJobs.map((job) => {
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
      
      {/* Show message when no jobs match filters */}
      {filteredJobs.length === 0 && (
        <div className="px-4 py-8 text-center text-gray-500">
          <p className="text-sm">No jobs match the current filters.</p>
          <p className="text-xs mt-1">Try clearing some filters to see more results.</p>
        </div>
      )}
    </>
  );
};

export default JobList;