# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**
```bash
npm run dev
# Starts development server on http://localhost:3000
```

**Build commands:**
```bash
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build locally
```

**Linting:**
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint and fix auto-fixable issues
```

**Formatting:**
```bash
npm run format       # Format all files with Prettier
npm run format:check # Check if files need formatting
```

**Note:** ESLint is configured to respect Prettier formatting rules. Use `npm run lint:fix` to automatically fix both linting and formatting issues.

**Development Services:**
```bash
# Start PostgreSQL, Redis, and monitoring tools
docker-compose -f docker-compose.dev.yml up -d

# Stop development services
docker-compose -f docker-compose.dev.yml down

# View service logs
docker-compose -f docker-compose.dev.yml logs -f [service-name]
```

**Development URLs:**
- pgAdmin (PostgreSQL): http://localhost:5050
- BullMQ Dashboard: http://localhost:3001  
- Redis Commander: http://localhost:8081

**Database Management:**
```bash
# Drizzle ORM commands
npm run db:generate     # Generate migrations
npm run db:migrate      # Run migrations  
npm run db:push         # Push schema changes
npm run db:studio       # Open Drizzle Studio
```

**Customer Sync:**
```bash
# Ultra-fast Oracle → PostgreSQL sync
npm run sync:customers:full         # Full sync (~100k records/sec)
npm run sync:customers:incremental  # Incremental sync (last 24h)
npm run sync:customers -- --help    # Show sync options
```

## Architecture

This is a Nuxt 3 application with the following key characteristics:

- **Frontend Framework:** Nuxt 3 with Vue 3 and TypeScript
- **Styling:** TailwindCSS v4 with Vite plugin integration
- **Content Management:** Nuxt Content module for content-driven pages
- **Server Directory:** Contains a `maginus/` subdirectory (currently empty) suggesting potential server-side functionality

**Key Modules:**
- `@nuxt/content` - Content management system
- `@nuxt/eslint` - ESLint integration
- `@nuxt/fonts`, `@nuxt/icon`, `@nuxt/image` - Asset optimization
- `@nuxt/scripts` - Script loading optimization
- `@nuxt/test-utils` - Testing utilities

**Configuration:**
- Main CSS entry point: `~/assets/css/main.css` (imports TailwindCSS)
- TypeScript configuration extends Nuxt's generated config
- ESLint uses Nuxt's default configuration

## Vue Component Structure

Follow this tag order for Vue components:
1. `<script setup lang="ts">`
2. `<template>`
3. `<style>`

The script tag must include the `setup` attribute and use TypeScript.

## TypeScript Guidelines

- Don't use `any` in TypeScript, use `unknown` instead
- When capturing errors in TypeScript, call the error variable `err`