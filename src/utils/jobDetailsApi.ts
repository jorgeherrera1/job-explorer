import type { JobDetails, Responsibility, TechnicalSkill } from '../types/index.js';
import { getLanguageApiValue, DEFAULT_LANGUAGE } from './languages.js';

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

    // Parse technical skills from API response
    const technicalSkills: TechnicalSkill[] = [];
    
    if (data.technicalSkills && Array.isArray(data.technicalSkills)) {
      data.technicalSkills.forEach((skill: any) => {
        if (skill.title && skill.description && skill.proficiencyText) {
          // Extract observable behaviors
          const observableBehaviors: string[] = [];
          
          if (skill.observableBehaviors && Array.isArray(skill.observableBehaviors)) {
            skill.observableBehaviors.forEach((behavior: any) => {
              if (behavior.text && behavior.text.trim()) {
                observableBehaviors.push(behavior.text.trim());
              }
            });
          }
          
          technicalSkills.push({
            skillName: skill.title,
            skillLevel: skill.proficiencyText,
            skillDescription: skill.description,
            observableBehaviors
          });
        }
      });
    }
    
    return {
      mission: data.mission,
      responsibilities,
      technicalSkills
    };
    
  } catch (error) {
    console.error('Error fetching job details:', error);
    return null;
  }
} 