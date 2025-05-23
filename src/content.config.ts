import { defineCollection, z } from 'astro:content';

const jobsCollection = defineCollection({
    schema: z.object({
      jobTitle: z.string(),
      mainSkill: z.string(),
      level: z.string(),
      guild: z.string(),
      country: z.string(),
      jobCode: z.string(),
      validJobRootId: z.number(),
    },),
    loader: async () => {
        // Fetch data from API
        const response = await fetch('https://job-arch-app-service-2.azurewebsites.net/api/ViewValidJobs');
        const data = await response.json();
        
        // Transform and optimize data
        return data.map((job: any, index: number) => ({
            id: `job-${index}`,
            jobTitle: job.jobTitle,
            mainSkill: job.mainSkill,
            level: job.level,
            guild: job.guild,
            country: job.country,
            jobCode: job.jobCode,
            validJobRootId: job.validJobRootId
        }));
      }
  });

export const collections = { jobs: jobsCollection };