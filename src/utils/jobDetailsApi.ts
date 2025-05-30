import type { JobDetails } from '../types/index.js';
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
    
    return {
      mission: data.mission
    };
    
  } catch (error) {
    console.error('Error fetching job details:', error);
    return null;
  }
} 