# Contributing to Job Explorer

This document outlines the development workflow, branching strategy, and deployment process for the Job Explorer web application.

## Table of Contents

- [Overview](#overview)
- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Environment Architecture](#environment-architecture)
- [Workflow Guide](#workflow-guide)
- [Deployment Process](#deployment-process)
- [Best Practices](#best-practices)

## Overview

Job Explorer uses **GitHub Flow enhanced with an integration branch**. This approach maintains the simplicity of GitHub Flow while adding a `develop` branch for integration testing before production releases.

### Key Principles

- **Feature and Bugfixes Development**: Develop features and bugfixes in dedicated branches
- **Integration Testing**: Use `develop` branch for testing feature combinations
- **Stable Production**: `main` branch only receives tested, integrated code

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Initial Setup

```bash
# Clone the repository
git clone https://AgileThought@dev.azure.com/AgileThought/Job-Architecture/_git/job-explorer
cd job-explorer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (testing)
npm run build
```

## Branching Strategy

We use three types of branches with specific purposes:

### Branch Types

| Branch Type | Purpose | Lifetime | Deploy Target |
|------------|---------|----------|---------------|
| `main` | Production-ready code | Permanent | Production |
| `develop` | Integration/staging | Permanent | Develop Environment |
| `feature/*` | New features | Temporary | None (until merged) |
| `hotfix/*` | Critical production fixes | Temporary | None (until merged) |

### Branch Naming Conventions

```
feature/job-list-filters
feature/oauth-integration
feature/responsive-design
feature/performance-optimization
hotfix/search-bug-fix
hotfix/auth-redirect-issue
```

**Guidelines:**
- Use lowercase with hyphens
- Be descriptive but concise
- Include work item number if applicable: `feature/123-job-filters`

## Environment Architecture

| Environment | Branch | URL Pattern | Purpose |
|------------|--------|-------------|---------|
| **Production** | `main` | `https://job-explorer.motivus.com` | Live application for end users |
| **Develop** | `develop` | `https://wonderful-glacier-0d6feda0f-develop.eastus2.6.azurestaticapps.net/` | Integration testing environment |

## Workflow Guide

### Standard Feature Development

```bash
# 1. Start from latest develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Develop locally
# Make changes, test locally with `npm run dev`
git add .
git commit -m "Add feature description"

# 4. Push feature branch (for backup, no deployment)
git push origin feature/your-feature-name

# 5. Integration testing - merge to develop
git checkout develop
git pull origin develop  # Get latest changes
git merge feature/your-feature-name
git push origin develop
# 🚀 This triggers deployment to develop environment

# 6. Test on develop environment
# Visit https://wonderful-glacier-0d6feda0f-develop.eastus2.6.azurestaticapps.net/
# Verify feature works with other integrated features

# 7. Production release - merge to main
git checkout main
git pull origin main
git merge develop
git push origin main
# 🚀 This triggers deployment to production

# 8. Cleanup
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

### Hotfix Workflow

For critical production issues that can't wait for the normal development cycle:

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue-description

# 2. Fix the issue
# Make minimal changes to address the critical issue
git add .
git commit -m "Fix critical issue: description"

# 3. Deploy hotfix to production
git checkout main
git merge hotfix/critical-issue-description
git push origin main
# 🚀 This triggers immediate deployment to production

# 4. Sync develop branch
git checkout develop
git merge hotfix/critical-issue-description
git push origin develop

# 5. Cleanup
git branch -d hotfix/critical-issue-description
```

## Deployment Process

### Automatic Deployments

Deployments are triggered automatically by the Azure DevOps pipeline:

- **`main` branch push** → Production deployment
- **`develop` branch push** → Develop environment deployment

### Manual Deployment

If you need to manually trigger a deployment:

1. Go to Azure DevOps Pipelines
2. Select the Job Explorer pipeline
3. Click "Run pipeline"
4. Choose the branch to deploy
5. Run the pipeline

## Best Practices

### Code Quality

- **Test Locally**: Always test features locally before pushing
- **Small Commits**: Make frequent, small commits with clear messages
- **Code Review**: Even when working solo, review your own code before merging
- **Documentation**: Update relevant documentation when adding features

### Git Practices

- **Keep Branches Updated**: Regularly pull latest changes from `develop`
- **Clean History**: Use meaningful commit messages
- **Branch Cleanup**: Delete feature branches after merging
- **No Direct Commits**: Never commit directly to `main`

### Testing Strategy

1. **Local Testing**: Test all functionality locally
2. **Integration Testing**: Test on develop environment after merging
3. **Production Validation**: Quick smoke test after production deployment

---

*This document should be updated as the project evolves and the team grows.*