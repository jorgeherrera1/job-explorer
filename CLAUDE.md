# Project: Job Explorer

## Project Description and Purpose
Job Explorer is an internal business application used in an IT Consulting Firm where users can look at all the jobs in the firm that are part of the service offerings.

There are primarily two use cases in which the job explorer becomes very handy:
- Delivery Leaders working in the team composition of a new project need to know the job codes of the profiles needed for delivering the project in order to project revenue and margin (each job code has an associated standard cost used for this purpose).
- Consultants in the company want to know their career path. All jobs descriptions, responsibilities, skills required, etc. are part of the details displayed by the job explorer.

### Guilds
Guilds are communities of practice that groups related Main Skills together. Examples of Guilds are:
- Backend Engineering: .NET Developer, Java Developer, etc.
- Digital Experience: React Developer, UX Designer, Android Developer, etc.
- Agility: Scrum Master, Project Manager, etc.

### Main Skills
Main Skills corresponds to the discipline or area of expertise that a Job is related to. Examples of this are: - Java Developer
- UX Designer
- Scrum Master
- Data Engineer
- React Developer

### Job Levels
There are 14 levels in the career path. The following list contains the levels ordered by less seniority to more seniority. Each level has a code and a name (e.g., Level code for 'Senior' is '1')

1. F: Intern
2. E: Trainee
3. D: Associate
4. C: Associate II
5. B: Intermediate
6. A: Intermediate II
7. 1: Senior
8. 2: Senior II
9. 3: Principal
10. 4: Principal II
11. 5: Distinguished
12. 6: Distinguished II
13. 7: Fellow
14. 8: Fellow II

### Job Codes
A 6-character code is behind the human readable form of each Job:

- 1st character used to identify the Guild
- Next 3 characters used to identify the Main Skill
- 5th character used to identify the Job Level
- 6th character used to identify the Country

For example, BJVD1M is a Job Code part of the Backend Engineering Guild to identify Senior Java Developers in Mexico.

## Important Architectural Patterns
The underlying data behind the job explorer rarely changes, if ever. For this reason, the Job Explorer is a static site generated by Astro at build time. We want to follow Astro Islands architecture and only use JavaScript for interactivity when strictly necessary (e.g., we don't want o wrap the whole application in a JobExplorer React application).

The application uses the Content Collection API of Astro to fetch job data at build time from:
```
https://job-arch-app-service-2.azurewebsites.net/api/ViewValidJobs
```

The application should have two routes only:
- Root (/): List all Job Titles
- /jobs/{Job Code without Country Code}: Show the details of a selected Job Title.

Both routes use exactly the same base layout.

## Application Layout and Functionality
The following text-based table attempts to exemplify the high-level layout of the application:
|-------------------------------------|
| Branding Header - Logo & Site Title |
|-------------------------------------|
| Search Input and Dropdown Filters   |
|-------------------------------------|
| Filter Tags and Results Counter     |
|-------------------------------------|
| Job Title | Job Details             |
| Job Title |                         |
| Job Title |                         |
| Job Title |                         |
|-------------------------------------|

When users opens the application, all jobs titles are shown on the left. Users can use the Search Input and Dropdown Filters (by Guild, Main Skill, Level) to narrow down the jobs. The filters that are applied to narrow than the list of jobs are shown as Tags, which user can 'close' to remove them as filters. When the user selects a Job Title from the list, the user is redirected to a new route (e.g., /Jobs/BJDV1). The path does not include the Country Code because basically the Job Details is exactly the same. ]

## Bash commands
- npm run dev: Start local dev server at `localhost:4321`
- npm run build: Build the project

## Codeing guideliens
- Always prefer Astro best practices over React best practices
- Prefer tailwind utility classes over plain CSS
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')
- Use modern JavaScript/TypeScript language constructs
- Prefer Browser APIs over bringing external libraries
- Consider using newest Browser APIs when you see fit (e.g., View Transitions API, Popover API, etc.)

## Testing instructions
- Use Puppeteer MCP server to validate changes that directly or indirectly affect the UI