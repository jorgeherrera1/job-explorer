import type { Job } from '../types';

/**
 * Raw job data structure from the API
 */
interface ApiJobResponse {
  jobTitle: string;
  mainSkill: string;
  level: string;
  guild: string;
  country: string;
  jobCode: string;
  validJobRootId: number;
}

/**
 * Transform and group raw API job data by validJobRootId
 * Creates a structure where each unique job position has country variants
 * stored in a jobCodes object
 * 
 * @param data - Raw job data from API
 * @returns Job[] - Transformed and grouped job data
 */
export async function groupJobsByValidRootId(data: ApiJobResponse[]): Promise<Job[]> {
  // Group jobs by validJobRootId
  const jobsByRootId = data.reduce((jobsByRootId: Record<number, Job>, job: ApiJobResponse) => {
    const validJobRootId = job.validJobRootId;
    
    if (!jobsByRootId[validJobRootId]) {
      // Extract base job code without country suffix
      // The last character represents the country code
      const jobCodeWithoutCountry = job.jobCode.slice(0, -1);
      
      jobsByRootId[validJobRootId] = {
        id: jobCodeWithoutCountry,
        jobTitle: job.jobTitle,
        mainSkill: job.mainSkill,
        level: job.level,
        guild: job.guild,
        validJobRootId: job.validJobRootId,
        jobCodes: {}
      };
    }
    
    // Add country variant to jobCodes object
    jobsByRootId[validJobRootId].jobCodes[job.country] = job.jobCode;
    
    return jobsByRootId;
  }, {});
  
  // Convert grouped object to array
  return Object.values(jobsByRootId);
} 