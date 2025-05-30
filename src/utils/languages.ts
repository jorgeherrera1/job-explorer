export interface LanguageConfig {
  code: string;
  apiValue: string;
  displayName: string;
}

export const LANGUAGES: LanguageConfig[] = [
  { code: 'en', apiValue: 'English', displayName: 'English' },
  { code: 'es', apiValue: 'Spanish', displayName: 'Español' },
  { code: 'pt', apiValue: 'Portuguese', displayName: 'Português' }
];

export const DEFAULT_LANGUAGE = 'en';

export function getLanguageByCode(code: string): LanguageConfig | undefined {
  return LANGUAGES.find(lang => lang.code === code);
}

export function getLanguageApiValue(code: string): string {
  const language = getLanguageByCode(code);
  return language?.apiValue || 'English';
}

export function isValidLanguage(code: string): boolean {
  return LANGUAGES.some(lang => lang.code === code);
} 