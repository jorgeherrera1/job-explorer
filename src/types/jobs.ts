// src/types/job.ts

export interface ViewValidJob {
    guild: string;
    mainSkill: string;
    level: string;
    country: string;
    jobTitle: string;
    jobCode: string;
    validJobRootId: number;
  }
  
  export interface ObservableBehavior {
    text: string;
  }
  
  export interface TechnicalSkill {
    title: string;
    description: string;
    proficiencyCode: string;
    proficiencyText: string;
    observableBehaviors: ObservableBehavior[];
  }
  
  export interface FoundationalSkill {
    title: string;
    description: string;
    proficiencyCode: string;
    proficiencyText: string;
    observableBehaviors: ObservableBehavior[];
  }
  
  export interface Responsibility {
    text: string;
  }
  
  export interface Experience {
    text: string;
  }
  
  export interface ValidJobRoot {
    id: number;
    jobTitle: string;
    mission: string;
    guildCode: string;
    guildName: string;
    levelCode: string;
    levelText: string;
    jobCode: string;
    technicalSkills: TechnicalSkill[];
    foundationalSkills: FoundationalSkill[];
    responsibilities: Responsibility[];
    experiences: Experience[];
  }
  
  // Optimized version for client-side filtering (removes unnecessary fields)
  export interface JobListItem {
    guild: string;
    mainSkill: string;
    level: string;
    country: string;
    jobTitle: string;
    jobCode: string;
    validJobRootId: number;
  }
  
  // Filter options
  export interface FilterOptions {
    guilds: string[];
    mainSkills: string[];
    levels: string[];
    countries: string[];
  }
  
  // Country mapping
  export interface CountryInfo {
    code: string;
    name: string;
    flag: string; // Path to flag image
  }
  
  export const COUNTRY_MAP: Record<string, CountryInfo> = {
    A: { code: 'A', name: 'Argentina', flag: '/flags/ar.svg' },
    B: { code: 'B', name: 'Brazil', flag: '/flags/br.svg' },
    C: { code: 'C', name: 'Costa Rica', flag: '/flags/cr.svg' },
    M: { code: 'M', name: 'Mexico', flag: '/flags/mx.svg' },
    U: { code: 'U', name: 'USA', flag: '/flags/us.svg' }
  };
  
  export const LEVEL_MAP: Record<string, string> = {
    F: 'Intern',
    E: 'Trainee', 
    D: 'Associate',
    C: 'Associate II',
    B: 'Intermediate',
    A: 'Intermediate II',
    '1': 'Senior',
    '2': 'Senior II',
    '3': 'Principal',
    '4': 'Principal II',
    '5': 'Distinguished',
    '6': 'Distinguished II',
    '7': 'Fellow',
    '8': 'Fellow II'
  };