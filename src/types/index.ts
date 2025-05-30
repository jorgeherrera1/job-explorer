/**
 * Shared application types
 * Domain-driven types that can be used across components
 */

/**
 * Job Level interface representing a level with its code and name
 * This provides a structured way to handle level codes and their display names
 */
export interface JobLevel {
  code: string;
  name: string;
}

/**
 * Core Job interface representing a job position across multiple countries
 * This is the canonical job type used throughout the application
 */
export interface Job {
  id: string;
  jobTitle: string;
  mainSkill: string;
  level: JobLevel;
  guild: string;
  validJobRootId: number;
  jobCodes: Record<string, string>; // Country name -> Job code mapping
}

/**
 * Filter criteria for job searches and filtering
 */
export interface JobFilters {
  guild?: string;
  mainSkill?: string;
  level?: string;
  search?: string;
}

/**
 * Individual filter tag for display in FilterTags component
 */
export interface FilterTag {
  type: 'guild' | 'mainSkill' | 'level' | 'search';
  value: string;
  label?: string; // Optional custom label for display
}

/**
 * Active filters structure for FilterTags component
 */
export interface ActiveFilters {
  guilds: string[];
  mainSkills: string[];
  levels: string[];
  search?: string;
}

/**
 * Responsibility interface representing a single job responsibility
 */
export interface Responsibility {
  responsibilityArea: string;
  responsibilityDescription: string;
}

/**
 * Job details interface representing detailed job information from the API
 * Contains mission information and responsibilities for a specific language
 */
export interface JobDetails {
  mission: string;
  responsibilities: Responsibility[];
}

/**
 * Language configuration interface for multi-language support
 */
export interface LanguageConfig {
  code: string;
  apiValue: string;
  displayName: string;
} 