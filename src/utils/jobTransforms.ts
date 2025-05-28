import type { Job, JobLevel } from '../types';

/**
 * Level code to name mapping
 */
const LEVEL_MAPPINGS: Record<string, string> = {
  'F': 'Intern',
  'E': 'Trainee',
  'D': 'Associate',
  'C': 'Associate II',
  'B': 'Intermediate',
  'A': 'Intermediate II',
  '1': 'Senior',
  '2': 'Senior II',
  '3': 'Principal',
  '4': 'Principal II',
  '5': 'Distinguished',
  '6': 'Distinguished II',
  '7': 'Fellow',
  '8': 'Fellow II'
};

/**
 * Convert level code to JobLevel object
 */
function createJobLevel(levelCode: string): JobLevel {
  return {
    code: levelCode,
    name: LEVEL_MAPPINGS[levelCode] || levelCode
  };
}

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
        level: createJobLevel(job.level),
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