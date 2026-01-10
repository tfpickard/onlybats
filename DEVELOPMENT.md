# Development Standards

## Purpose
This document defines development standards for OnlyBats.org to ensure consistent, production-ready code.

## Core Principles
- Production-grade implementations only (no placeholders)
- Strict TypeScript with explicit types
- Accessible, responsive, and performant UI
- Secure defaults, validated inputs, and sanitized outputs
- Tests for core logic and critical paths

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma (SQLite dev, Postgres prod)
- **Auth**: NextAuth.js

## Code Style

### TypeScript
- `strict` mode enabled
- Avoid `any`
- Prefer `type` or `interface` with explicit contracts
- Use Zod for input validation where needed

### React & Next.js
- Server Components by default
- Client Components only when necessary
- Keep components small and composable
- Use `app/` directory routing

### Tailwind CSS
- Prefer utilities over bespoke CSS
- Use existing color palette
- Ensure responsive and accessible layouts

## Testing Guidelines

- **Unit tests** for logic-heavy utilities
- **Integration tests** for API routes and data flows
- **E2E tests** for critical user journeys
- Aim for meaningful coverage on business logic

## Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML and proper heading structure
- Keyboard navigability for all interactive elements
- Visible focus states and sufficient contrast

## Performance

- Optimize images and media
- Use dynamic import for heavy client code
- Avoid unnecessary re-renders
- Track bundle size regressions

## Security

- Validate all user input
- Avoid direct string interpolation into SQL
- Use environment variables for secrets
- Ensure authentication and authorization checks

## Content & Tone

OnlyBats.org should read like a sincere conservation nonprofit with unintentional humor.
- No self-awareness
- Serious tone, even for absurd content
- No hateful or harassing language
