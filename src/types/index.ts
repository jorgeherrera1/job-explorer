/**
 * Shared application types
 * Domain-driven types that can be used across components
 */

/**
 * Core Job interface representing a job position across multiple countries
 * This is the canonical job type used throughout the application
 */
export interface Job {
  id: string;
  jobTitle: string;
  mainSkill: string;
  level: string;
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