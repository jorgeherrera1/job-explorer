import type { JobDetails, Responsibility, Experience } from '../types/index.js';
import { getLanguageApiValue, DEFAULT_LANGUAGE } from './languages.js';
import { transformSkills } from './skillTransforms.js';

const API_BASE_URL = 'https://job-arch-app-service-2.azurewebsites.net/api';

export async function fetchJobDetails(
  validJobRootId: number, 
  languageCode?: string
): Promise<JobDetails | null> {
  try {
    const language = getLanguageApiValue(languageCode || DEFAULT_LANGUAGE);
    const url = `${API_BASE_URL}/ValidJobRoot?validJobRootId=${validJobRootId}&language=${language}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    
    if (!data.mission) {
      console.error('Mission field not found in API response');
      return null;
    }
    
    // Parse responsibilities from API response
    const responsibilities: Responsibility[] = [];
    
    if (data.responsibilities && Array.isArray(data.responsibilities)) {
      data.responsibilities.forEach((responsibilityGroup: any) => {
        if (responsibilityGroup.title && responsibilityGroup.list && Array.isArray(responsibilityGroup.list)) {
          const responsibilityArea = responsibilityGroup.title;
          
          // Combine multiple list items with "; " separator if needed
          const descriptions = responsibilityGroup.list
            .map((item: any) => item.content)
            .filter((content: string) => content && content.trim())
            .join('; ');
          
          if (descriptions) {
            responsibilities.push({
              responsibilityArea,
              responsibilityDescription: descriptions
            });
          }
        }
      });
    }

    // Parse technical skills using shared transform function
    const technicalSkills = data.technicalSkills ? transformSkills(data.technicalSkills) : [];

    // Parse foundational skills using shared transform function  
    const foundationalSkills = data.foundationalSkills ? transformSkills(data.foundationalSkills) : [];

    // Parse experiences from API response
    const experiences: Experience[] = [];
    
    if (data.experiences && Array.isArray(data.experiences)) {
      data.experiences.forEach((experienceGroup: any) => {
        if (experienceGroup.title && experienceGroup.list && Array.isArray(experienceGroup.list)) {
          const content = experienceGroup.list
            .map((item: any) => item.content)
            .filter((content: string) => content && content.trim());
          
          if (content.length > 0) {
            experiences.push({
              title: experienceGroup.title,
              content
            });
          }
        }
      });
    }
    
    return {
      mission: data.mission,
      responsibilities,
      technicalSkills,
      foundationalSkills,
      experiences
    };
    
  } catch (error) {
    console.error('Error fetching job details:', error);
    return null;
  }
} 