import React from 'react';
import type { Job } from '../types';
import ChevronIcon from './icons/ChevronIcon';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <>
      {jobs.map((job) => {
        const { id, jobTitle, level } = job;
        return (
        <div
          key={id}
          className="w-full px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-900 truncate flex-1 min-w-0 pr-3">
              {jobTitle}
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0">
                {level}
              </div>
              <ChevronIcon direction="right" className="h-5 w-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>
        );
      })}
    </>
  );
};

export default JobList;