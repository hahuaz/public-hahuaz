# Pnpm workspace features:

1. Local Package Linking with Workspace Protocol: 
    - Automatically links internal packages within the workspace. For example, if you change base tsconfig in the `@repo/typescript-config` package, the changes will be reflected in all packages that depend on it without any additional steps.
    - Example: 
      Packagename of `packages/ui` is `@repo/ui` in the workspace. Following can be added into an app's `package.json` to use it.
      ```json
      {
        "dependencies": {
          "@repo/ui": "workspace:*"
        }
      }
      ```

2. Dependency Hoisting: 
    - Centralizes shared dependencies in a single location.
    - Dependencies are stored in `node_modules/.pnpm`, reducing duplication across workspace packages.
    - Saves disk space and ensures version consistency across all packages.

3. Optimized Installation: 
    - Speeds up the installation process by using shared dependencies, avoiding redundant installs.

# Turborepo features:

1. Build System and Task Running:
    - Orchestrates and optimizes build processes across packages by caching outputs of tasks. For example, if a package is already built, it will not be built again. So make sure to utilize turbo commands instead of running utilities like `tsc`.
    - Runs tasks in parallel when possible

2. Pipeline Configuration:
    - Defines task dependencies and their execution order in turbo.json. For example, when you run `test` task via `turbo test`, it will first run the `build` task and then run the `test` task.
    - Example:
      ```json
      {
        "pipeline": {
          "build": {
            "dependsOn": ["^build"],  // The `^` prefix means build package dependencies first
            "outputs": ["dist/**"]    // Cache the build output
          },
          "test": {
            "dependsOn": ["build"],   // the build task (not dependencies) must run first
            "outputs": []             // Don't cache test results
          }
        }
      }
      ```

3. Workspace Management:
    - Integrates with pnpm workspaces for package management
    - Provides workspace-aware commands and utilities. For example, to build only the `@repo/ui` package, the following command can be used:
      ```sh
      pnpm turbo run build --filter=@repo/ui
      ```

4. Development Experience:
    - Provides `turbo dev` for running development servers
    - Enables running multiple dev servers in parallel
    - Supports hot reloading across packages

# Backend Features
1. Development Mode with tsup
In development mode, tsup is used to directly execute TypeScript code with ES modules.

2. Production Build and Bundling with tsup
For production, tsup bundles and compiles the server code into optimized JavaScript files. 

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-docker
```

## What's inside?

This Turborepo includes the following:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `api`: an [Express](https://expressjs.com/) server
- `@repo/ui`: a React component library
- `@repo/logger`: Isomorphic logger (a small wrapper around console.log)
- `@repo/eslint-config`: ESLint presets
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Docker

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Install dependencies
yarn install

# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

This example includes optional remote caching. In the Dockerfiles of the apps, uncomment the build arguments for `TURBO_TEAM` and `TURBO_TOKEN`. Then, pass these build arguments to your Docker build.

You can test this behavior using a command like:

`docker build -f apps/web/Dockerfile . --build-arg TURBO_TEAM="your-team-name" --build-arg TURBO_TOKEN="your-token" --no-cache`

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
