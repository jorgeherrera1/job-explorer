import { atom } from 'nanostores'
import { computed } from 'nanostores'
import type { Job } from '../types'

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

// Add this computed store at the end of the file
export const filteredJobsStore = computed(filtersStore, (filters) => {
  return (jobs: Job[]) => {
    return jobs.filter(job => {
      // Search filter - case-insensitive match on job title
      if (filters.search && !job.jobTitle.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      // Guild filter - job guild must be in selected guilds (OR within guilds)
      if (filters.guilds.length > 0 && !filters.guilds.includes(job.guild)) {
        return false
      }

      // Main skill filter - job mainSkill must be in selected mainSkills (OR within skills)
      if (filters.mainSkills.length > 0 && !filters.mainSkills.includes(job.mainSkill)) {
        return false
      }

      // Level filter - job level string must be in selected levels (OR within levels)
      const jobLevelString = `${job.level.code}-${job.level.name}`
      if (filters.levels.length > 0 && !filters.levels.includes(jobLevelString)) {
        return false
      }

      // If we get here, job matches all active filters
      return true
    })
  }
})

// Computed store for filtered jobs count (for results display)
export const filteredJobsCountStore = computed(filtersStore, (filters) => {
  return (jobs: Job[]) => {
    const filterFunction = filteredJobsStore.get()
    return filterFunction(jobs).length
  }
})

// Helper function to check if selected job is still visible
export const isSelectedJobVisible = (selectedJobId: string | undefined, filteredJobs: Job[]) => {
  if (!selectedJobId) return true
  return filteredJobs.some(job => job.id === selectedJobId)
} 