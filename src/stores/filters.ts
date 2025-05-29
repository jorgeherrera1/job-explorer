import { atom } from 'nanostores'

export interface FilterState {
  search: string
  guilds: string[]
  mainSkills: string[]
  levels: string[]
}

export const filtersStore = atom<FilterState>({
  search: '',
  guilds: [],
  mainSkills: [],
  levels: []
})

// Helper functions for updating filters
export function updateSearch(search: string) {
  filtersStore.set({ ...filtersStore.get(), search })
}

export function toggleGuild(guild: string) {
  const current = filtersStore.get()
  const guilds = current.guilds.includes(guild)
    ? current.guilds.filter(g => g !== guild)
    : [...current.guilds, guild]
  filtersStore.set({ ...current, guilds })
}

export function toggleMainSkill(mainSkill: string) {
  const current = filtersStore.get()
  const mainSkills = current.mainSkills.includes(mainSkill)
    ? current.mainSkills.filter(s => s !== mainSkill)
    : [...current.mainSkills, mainSkill]
  filtersStore.set({ ...current, mainSkills })
}

export function toggleLevel(level: string) {
  const current = filtersStore.get()
  const levels = current.levels.includes(level)
    ? current.levels.filter(l => l !== level)
    : [...current.levels, level]
  filtersStore.set({ ...current, levels })
}

export function clearAllFilters() {
  filtersStore.set({
    search: '',
    guilds: [],
    mainSkills: [],
    levels: []
  })
}

export function clearFilter(filterType: keyof FilterState) {
  const current = filtersStore.get()
  if (filterType === 'search') {
    filtersStore.set({ ...current, search: '' })
  } else {
    filtersStore.set({ ...current, [filterType]: [] })
  }
} 