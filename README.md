<p align="center">
  <img src="https://user-images.githubusercontent.com/26466516/141659551-d7ba5630-7200-46fe-863b-87818dae970a.png" alt="Next.js TypeScript Starter">
</p>

<br />

<div align="center"><strong>Non-opinionated TypeScript starter for Next.js</strong></div>
<div align="center">Highly scalable foundation with the best DX. All the tools you need to build your Next project.</div>

<br />

## Features

- ⚡️ Next.js 16 (App Router)
- ⚛️ React 19
- ⛑ TypeScript
- 📏 Oxlint — To find and fix problems in your code
- 💖 Oxfmt — High-performance formatter for consistent style
- 🐶 Husky — For running scripts before committing
- 🚓 Commitlint — To make sure your commit messages follow the convention
- 🖌 Renovate — To keep your dependencies up to date
- 🚫 lint-staged — Run Oxlint and Oxfmt against staged Git files
- 👷 PR Workflow — Run Type Check & Linters on Pull Requests
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs
- 🗂 Path Mapping — Import components or images using the `@` prefix
- 🔐 CSP — Content Security Policy for enhanced security (default minimal policy)
- 🧳 T3 Env — Type-safe environment variables
- 🪧 Redirects — Easily add redirects to your application

## Quick Start

The best way to start with this template is using [Create Next App](https://nextjs.org/docs/api-reference/create-next-app).

````
# pnpm
pnpm create next-app -e https://github.com/jpedroschmitz/typescript-nextjs-starter

### Development

To start the project locally, run:

```bash
pnpm dev
````

Open `http://localhost:3000` with your browser to see the result.

### Requirements

- Node.js >= 24
- pnpm 10

### Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.

### Scripts

- `pnpm dev` — Starts the application in development mode at `http://localhost:3000`.
- `pnpm build` — Creates an optimized production build of your application.
- `pnpm build:analyze` — Analyze the production build to see the bundle size.
- `pnpm start` — Starts the application in production mode.
- `pnpm type-check` — Validate code using TypeScript compiler.
- `pnpm lint` — Runs Oxlint for all files in the `src` directory.
- `pnpm lint:fix` — Runs Oxlint fix for all files in the `src` directory.
- `pnpm format` — Runs Oxfmt for all files in the `src` directory.
- `pnpm format:check` — Check Oxfmt list of files that need to be formatted.
- `pnpm format:ci` — Oxfmt check for CI.

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';
// To import images or other files from the public folder
import avatar from '@/public/avatar.png';
```

### Switch to Yarn/npm

This starter uses pnpm by default, but this choice is yours. If you'd like to switch to Yarn/npm, delete the `pnpm-lock.yaml` file, install the dependencies with Yarn/npm, change the CI workflow, and Husky Git hooks to use Yarn/npm commands.

> **Note:** If you use Yarn, make sure to follow these steps from the [Husky documentation](https://typicode.github.io/husky/troubleshoot.html#yarn-on-windows) so that Git hooks do not fail with Yarn on Windows.

### Environment Variables

We use [T3 Env](https://env.t3.gg/) to manage environment variables. Create a `.env.local` file in the root of the project and add your environment variables there.

When adding additional environment variables, the schema in `./src/lib/env/client.ts` or `./src/lib/env/server.ts` should be updated accordingly.

### Redirects

To add redirects, update the `redirects` array in `./redirects.ts`. It's typed, so you'll get autocompletion for the properties.

### CSP (Content Security Policy)

The Content Security Policy (CSP) is a security layer that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. The CSP is implemented in the `next.config.ts` file.

It contains a default and minimal policy that you can customize to fit your application needs. It's a foundation to build upon.

### Husky

Husky is a tool that helps us run scrips before Git events. We have 3 hooks:

- `pre-commit` — (Disabled by default) Runs lint-staged to lint and format the files.
- `commit-msg` — Runs commitlint to check if the commit message follows the conventional commit message format.
- `post-merge` — Runs pnpm install to update the dependencies if there was a change in the `pnpm-lock.yaml` file.

> Important note: Husky is disabled by default in the pre-commit hook. This is intention because most developers don't want to run lint-staged on every commit. If you want to enable it, run `echo 'HUSKY_ENABLED=true' > .husky/_/pre-commit.options`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
