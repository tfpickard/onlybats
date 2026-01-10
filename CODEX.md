# Code Generation Guide

## Purpose
This document defines standardized instructions for AI-powered code generation agents to safely and effectively generate, modify, and maintain production-grade code in this repository.

**Core Principle**: Generated code must be indistinguishable from code written by experienced senior engineers. No shortcuts, no placeholders, no "TODO" comments.

## Repository Analysis Protocol

### Before Making Any Changes

**CRITICAL**: Always analyze the repository structure and existing patterns before generating or modifying code.

#### Step 1: Understand the Project Structure
```bash
# Examine the directory structure
ls -la

# Identify key configuration files
ls -la *.config.* *.json *.yaml *.yml 2>/dev/null

# Check package manager
ls -la package-lock.json pnpm-lock.yaml yarn.lock 2>/dev/null
```

#### Step 2: Analyze Existing Architecture
```text
Questions to answer:
- What framework is being used? (Next.js App Router)
- Where do components live?
- How is state managed?
- What's the data fetching pattern?
- How are styles organized?
- What testing framework is used?
- How are types organized?
```

#### Step 3: Study Code Patterns
```bash
# Find common patterns
rg "export default" --type ts --type tsx
rg "import.*from" --type ts --type tsx

# Check component patterns
rg --files -g "*.tsx" | head -10 | xargs sed -n '1,120p'
```

#### Step 4: Identify Dependencies
```bash
# Read package.json to understand the tech stack
cat package.json

# Check TypeScript configuration
cat tsconfig.json
```

### Respect Existing Patterns

**ALWAYS** match the existing codebase patterns:

#### Import Style
```typescript
// If the codebase uses:
import { Component } from '@/components/ui/component'

// Don't use:
import { Component } from '../../components/ui/component'
```

#### Component Structure
```typescript
// If existing components follow this pattern:
export function ComponentName({ prop1, prop2 }: Props) {
  // hooks
  // handlers
  // render
}

// Match it exactly, don't introduce:
const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => { ... }
```

#### Naming Conventions
```text
- PascalCase for components: UserProfile, DataTable
- camelCase for functions: fetchUserData, handleSubmit
- UPPER_SNAKE_CASE for constants: MAX_RETRIES, API_BASE_URL
- kebab-case for files: user-profile.tsx, data-table.test.ts
```

## Guardrails & Protocols

### Critical File Protection

**NEVER** modify these files without explicit approval:
- `package.json` (dependencies)
- Database migration files (once applied)
- `.env.production` (production secrets)
- `vercel.json` (production config)
- Any file with `CRITICAL` or `DO NOT MODIFY` comments

### Database Schema Changes

```text
Protocol for schema changes:
1. Create a new migration file (never edit existing ones)
2. Test migration on development database
3. Document breaking changes
4. Plan data migration if needed
5. Get approval before applying to production
```

### Safe File Edit Protocol

```text
1. Read the file first
2. Parse and understand the structure
3. Make targeted changes
4. Validate the changes
5. Write the file
6. Run tests
```

### Commit Practices

```text
Commit message format:
<type>(<scope>): <short summary>

<detailed description of changes>
<reasoning for the approach taken>

Types: feat, fix, refactor, perf, test, docs, style, chore
```

### Error Handling Strategy

```typescript
// ✅ GOOD: Complete error handling
async function fetchUser(id: string): Promise<Result<User, FetchError>> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return err({ type: 'NOT_FOUND', message: 'User not found' });
      }
      if (response.status === 401) {
        return err({ type: 'UNAUTHORIZED', message: 'Authentication required' });
      }
      return err({
        type: 'SERVER_ERROR',
        message: `HTTP ${response.status}`,
        status: response.status,
      });
    }

    const data = await response.json();
    const parsed = UserSchema.safeParse(data);

    if (!parsed.success) {
      return err({
        type: 'VALIDATION_ERROR',
        message: 'Invalid user data',
        errors: parsed.error.errors,
      });
    }

    return ok(parsed.data);
  } catch (error) {
    if (error instanceof TypeError) {
      return err({ type: 'NETWORK_ERROR', message: 'Network request failed' });
    }
    return err({
      type: 'UNKNOWN_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
```

### Fallback Strategies

```text
When code generation fails or produces unexpected results:
1. Try a simpler approach
2. Break into smaller pieces
3. Use established patterns
4. Document and escalate
```

## Style Rules

### TypeScript Configuration

```json
// tsconfig.json - Always use strict mode
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Linting Guidelines

```text
ALWAYS:
- Use const by default, let when mutation is needed, never var
- Prefer functional patterns and early returns
- Avoid any type (use unknown + type guards)
- Use optional chaining (?.) and nullish coalescing (??)
- Use template literals for string interpolation
- Prefer async/await over .then()

NEVER:
- console.log in production code (use proper logging)
- Unused variables or imports
- Non-null assertions (!) unless absolutely certain
- Mutation of function parameters
- Global variables
```

## Code Generation Templates

### API Route Template (Next.js App Router)

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = paramsSchema.parse(params);

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Example System Prompt

```markdown
You are an expert full-stack engineer generating production-grade code.

## Core Requirements
- Production-first: No MVPs, prototypes, or placeholders
- Type-safe: Full TypeScript with strict mode
- Tested: Unit, integration, and E2E tests
- Secure: Input validation, output sanitization, proper error handling
- Accessible: WCAG 2.1 AA compliance
- Performant: Optimized bundles, lazy loading, caching

## Before You Start
1. Analyze the existing codebase structure
2. Study existing patterns and conventions
3. Identify the tech stack and dependencies
4. Understand the project's architecture

## Code Standards
- Use npm for installs and scripts
- Follow existing naming conventions
- Match existing import styles
- Respect established patterns
- Write comprehensive tests
- Include proper error handling
- Add TypeScript types for everything

## Safety Protocols
- Never modify critical files without approval
- Create new migrations, don't edit existing ones
- Test all changes before committing
- Run type checker and build

## Output Format
For each task, provide:
1. Analysis of existing code
2. Implementation plan
3. Complete code with tests
4. Commit message
5. Verification steps

Begin generating production-grade code.
```

---

**Remember**: Quality is non-negotiable. Build as if real users depend on it—because they do.
