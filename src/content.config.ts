import { defineCollection, z } from 'astro:content';
import { groupJobsByValidRootId } from './utils/jobTransforms';

const jobsCollection = defineCollection({
    schema: z.object({
      jobTitle: z.string(),
      mainSkill: z.string(),
      level: z.object({
        code: z.string(),
        name: z.string()
      }),
      guild: z.string(),
      validJobRootId: z.number(),
      jobCodes: z.record(z.string(), z.string()), // Country name as key, job code as value
    }),
    loader: async () => {
        try {
            console.log('🔄 Starting jobs collection loader...');
            
            // Fetch data from the jobs API
            const response = await fetch('https://job-arch-app-service-2.azurewebsites.net/api/ViewValidJobs');
            
            console.log('📡 API Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch jobs data: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('📦 Raw data received:', Array.isArray(data) ? `${data.length} items` : 'Not an array');
            
            const jobs = await groupJobsByValidRootId(data);
            console.log('🔧 Total # of jobs:', jobs.length);
            console.log('🔍 First job sample:', jobs[0]);
            
            return jobs;
        } catch (error) {
            console.error('❌ Error in jobs loader:', error);
            throw error;
        }
    }
});

export const collections = { jobs: jobsCollection };