import type { Skill } from '../types/index.js';

/**
 * API skill structure from both technicalSkills and foundationalSkills endpoints
 */
interface ApiSkill {
  title: string;
  proficiencyText: string;
  description: string;
  observableBehaviors: Array<{ text: string }>;
}

/**
 * Transform API skills data to internal Skill format
 * Works for both technical and foundational skills since structure is identical
 */
export function transformSkills(apiSkills: ApiSkill[]): Skill[] {
  if (!apiSkills || !Array.isArray(apiSkills)) {
    return [];
  }

  return apiSkills.map(skill => {
    // Extract observable behaviors text values
    const observableBehaviors: string[] = [];
    
    if (skill.observableBehaviors && Array.isArray(skill.observableBehaviors)) {
      skill.observableBehaviors.forEach((behavior: any) => {
        if (behavior.text && behavior.text.trim()) {
          observableBehaviors.push(behavior.text.trim());
        }
      });
    }
    
    return {
      skillName: skill.title,
      skillLevel: skill.proficiencyText,
      skillDescription: skill.description,
      observableBehaviors
    };
  });
} 