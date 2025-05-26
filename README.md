# Job Explorer

A modern web application for exploring and filtering job opportunities, built with Astro, React, and TailwindCSS.

## 🎯 Features

- **Job Search & Filtering**: Search and filter jobs by guild, main skill, and level
- **Static Data Generation**: Job data is fetched from API at build time for optimal performance
- **Responsive Design**: Built with TailwindCSS for a modern, mobile-friendly interface
- **Interactive Components**: React-powered components for enhanced user experience
- **Fast Performance**: Leverages Astro's static site generation with selective hydration

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # React and Astro components
│   │   ├── Header.astro
│   │   ├── SearchFilterBar.astro
│   │   ├── JobList.tsx
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro   # Main application page
│   ├── styles/           # Styling files
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── content.config.ts # Content collection configuration
├── astro.config.mjs      # Astro configuration
├── package.json
└── tsconfig.json
```

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** - Static site generator with component islands
- **[React](https://react.dev)** - UI components for interactive elements
- **[TailwindCSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `npm install`   | Installs dependencies                        |
| `npm run dev`   | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/`     |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321` to see the application running.

## 📊 Data Source

The application fetches job data at build time from:
```
https://job-arch-app-service-2.azurewebsites.net/api/ViewValidJobs
```

Jobs are automatically grouped and processed during the build to provide filtering capabilities by:
- Guild
- Main Skill
- Level

**Note**: Data is static and reflects the state at build time. To get updated job data, the site needs to be rebuilt.

## 🏗️ Development

The project uses Astro's content collections to manage job data. The main data processing happens in `src/content.config.ts`, where job data is fetched from the API and transformed for use in the application.

Key components:
- `SearchFilterBar` - Provides filtering controls
- `JobList` - Displays the filtered job results
- `MainJobExplorerContainer` - Main container component

## 📝 License

This project is proprietary and confidential. Motivus, all rights reserved.
