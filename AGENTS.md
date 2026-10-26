# AGENTS.md

## Stack

Next.js 16.4.3 (App Router, Turbopack) + React 19.3 + Tailwind CSS v4 + shadcn (style `base-nova`). App code lives in `src/app`; shared code in `src/lib`, `src/hooks`, `src/components`. Path alias: `@/*` → `./src/*`.

## Commands

- Dev server: `npm run dev`
- Lint: `npm run lint` (flat-config ESLint, `eslint-config-next` core-web-vitals + TS)
- Typecheck: `npx tsc --noEmit` (no `typecheck` script exists)
- Verify in order: `npm run lint` → `npx tsc --noEmit` → `npm run build`
- No test framework is installed. Don't invent `npm test`.

## Next.js 16 gotchas (see `next.config.ts`)

- `cacheComponents: true` — data fetching/caching semantics differ from older Next (requires Suspense boundaries; `use cache` / cache-lifecycle directives). Read the relevant guide in `node_modules/next/dist/docs/01-app/` before writing data fetching.
- `reactCompiler: true` — React Compiler is enabled; don't hand-add `useMemo`/`useCallback`/`memo` for performance.
- Tailwind v4 is loaded via the `@tailwindcss/turbopack` rule for `*.css` — there is no PostCSS config and no `tailwind.config.*`. Theming is CSS-first in `src/app/globals.css` (`@theme inline`, `@custom-variant dark`, CSS custom properties).
- `LayoutProps<"/">` in `src/app/layout.tsx` is a generated Next type (from `.next/types`). On a fresh clone, run `next dev` or `next build` once before `tsc --noEmit` will pass.

## shadcn / UI components

- `src/components/ui/*` are shadcn-generated. Prefer adding/updating via the `npx shadcn` CLI with `components.json` over hand-editing generated files.
- The `base-nova` style uses **Base UI** primitives (`@base-ui/react`), not Radix. Don't assume Radix APIs/props in components or when writing new ones.
- `cn` comes from the `cn` npm package, re-exported by `src/lib/utils.ts`; components use `import { cn } from "cn"`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
