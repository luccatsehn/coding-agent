<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="apps/docs/logo/dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="apps/docs/logo/light.svg">
    <img src="apps/docs/logo/dark.svg" alt="Open SWE Logo" width="35%">
  </picture>
</div>

<div align="center">
  <h1>Open SWE - An Open-Source Asynchronous Coding Agent</h1>
</div>

Open SWE is an open-source cloud-based asynchronous coding agent built with [LangGraph](https://langchain-ai.github.io/langgraphjs/). It autonomously understands codebases, plans solutions, and executes code changes across entire repositories—from initial planning to opening pull requests.

> [!TIP]
> Try out Open SWE yourself using our [public demo](https://swe.langchain.com)!
>
> **Note: you're required to set your own LLM API keys to use the demo.**

> [!NOTE]
> 📚 See the **Open SWE documentation [here](https://docs.langchain.com/labs/swe/)**
>
> 💬 Read the **announcement blog post [here](https://blog.langchain.com/introducing-open-swe-an-open-source-asynchronous-coding-agent/)**
>
> 📺 Watch the **announcement video [here](https://youtu.be/TaYVvXbOs8c)**

# Features

![UI Screenshot](./static/ui-screenshot.png)

- 📝 **Planning**: Open SWE has a dedicated planning step which allows it to deeply understand complex codebases and nuanced tasks. You're also given the ability to accept, edit, or reject the proposed plan before it's executed.
- 🤝 **Human in the loop**: With Open SWE, you can send it messages while it's running (both during the planning and execution steps). This allows for giving real time feedback and instructions without having to interrupt the process.
- 🏃 **Parallel Execution**: You can run as many Open SWE tasks as you want in parallel! Since it runs in a sandbox environment in the cloud, you're not limited by the number of tasks you can run at once.
- 🧑‍💻 **End to end task management**: Open SWE will automatically create GitHub issues for tasks, and create pull requests which will close the issue when implementation is complete.


## Usage

Open SWE can be used in multiple ways:

- 🖥️ **From the UI**. You can create, manage and execute Open SWE tasks from the [web application](https://swe.langchain.com). See the ['From the UI' page](https://docs.langchain.com/labs/swe/usage/ui) in the docs for more information.
- 📝 **From GitHub**. You can start Open SWE tasks directly from GitHub issues simply by adding a label `open-swe`, or `open-swe-auto` (adding `-auto` will cause Open SWE to automatically accept the plan, requiring no intervention from you). For enhanced performance on complex tasks, use `open-swe-max` or `open-swe-max-auto` labels which utilize Claude Opus 4.1 for both planning and programming. See the ['From GitHub' page](https://docs.langchain.com/labs/swe/usage/github) in the docs for more information.

## Prerequisites

Before getting started with Open SWE development, ensure you have the following installed:

- **Node.js 20+** - Required for running the applications
- **Yarn 3.5.1** - Package manager (configured in `.yarnrc.yml`)
- **Git** - Version control system

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/langchain-ai/open-swe.git
   cd open-swe
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```
   This command installs all workspace dependencies automatically using Turbo orchestration.

3. **Set up environment variables**:
   Each application has its own `.env.example` file. Copy and configure them as needed:
   ```bash
   # For the agent application
   cp apps/open-swe/.env.example apps/open-swe/.env
   
   # For the web interface
   cp apps/web/.env.example apps/web/.env
   
   # For the CLI (if using)
   cp apps/cli/.env.example apps/cli/.env
   ```

## Development Workflow

Open SWE uses Turbo for build orchestration. All commands should be run from the repository root:

- **Start development servers**: `yarn dev`
- **Build all packages**: `yarn build`
- **Run linting**: `yarn lint`
- **Fix linting issues**: `yarn lint:fix`
- **Format code**: `yarn format`
- **Run tests**: `yarn test`
- **Run integration tests**: `yarn test:int` (apps/open-swe only)
- **Clean build artifacts**: `yarn clean`

### Development Server

To start the development environment:

```bash
yarn dev
```

This will start:
- The LangGraph agent server (apps/open-swe)
- The Next.js web interface (apps/web)
- Any other configured development servers

## Architecture Overview

Open SWE is a Yarn workspace monorepo with Turbo build orchestration containing four main packages:

### **apps/open-swe** - LangGraph Agent Application
- Core LangChain/LangGraph agent implementation with TypeScript
- Contains three graphs: programmer, planner, and manager (configured in `langgraph.json`)
- Uses strict ESLint rules including no-console errors
- Handles autonomous code understanding, planning, and execution

### **apps/web** - Next.js Web Interface
- React 19 frontend with Shadcn UI components (wrapped Radix UI) and Tailwind CSS
- Modern web stack with TypeScript, ESLint, and Prettier with Tailwind plugin
- Serves as the user interface for the LangGraph agent
- Provides chat interface and task management

### **apps/cli** - Command-Line Interface ⚠️ *Under Development*
- Terminal-based chat interface built with React and Ink
- Works directly on local codebases without GitHub authentication
- Provides real-time streaming of agent logs and responses
- Interactive chat experience for local development

### **packages/shared** - Common Utilities Package
- Central workspace dependency providing shared types, constants, and utilities
- Exports modules via `@open-swe/shared` namespace (e.g., `@open-swe/shared/open-swe/types`)
- Must be built before other packages can import from it
- Contains crypto utilities, GraphState types, and open-swe specific modules

### Root Configuration
- `turbo.json`: Build orchestration with task dependencies and parallel execution
- `.yarnrc.yml`: Yarn 3.5.1 configuration with node-modules linker
- `tsconfig.json`: Base TypeScript configuration extended by all packages
- `langgraph.json`: LangGraph configuration defining the three agent graphs

## Testing

Open SWE uses Jest with TypeScript support for testing:

### Test Types
- **Unit tests**: `*.test.ts` files in `__tests__` directories
- **Integration tests**: `*.int.test.ts` files (apps/open-swe only)

### Running Tests
- **All unit tests**: `yarn test`
- **Integration tests**: `yarn test:int`
- **Specific test file**: `yarn test:single <file>`

### Test Configuration
- 20-second timeout for longer-running tests
- Environment variables loaded via dotenv integration
- ESM module support with `.js` extension mapping
- Pass-with-no-tests setting for CI/CD compatibility

## Contributing

We welcome contributions to Open SWE! Please follow these guidelines:

### Development Standards
- **Package Manager**: Use Yarn exclusively - never use npm or other package managers
- **Commands**: Run all general commands from the repository root using Turbo orchestration
- **TypeScript**: Follow strict TypeScript practices - the codebase uses strict mode across all packages
- **Code Quality**: Use ESLint and Prettier - run `yarn lint:fix` and `yarn format` before committing
- **Logging**: Console logging is prohibited in the open-swe app (ESLint error) - use the `createLogger` function instead
- **Dependencies**: Before creating new utilities, search in `packages/shared/src` to see if one already exists
- **Imports**: When importing from the shared package, use the `@open-swe/shared` namespace with specific module paths

### Workflow
1. **Build shared package first**: The shared package must be built before other packages can consume it (`yarn build` handles this automatically)
2. **Follow existing patterns**: Maintain consistency with the established architecture
3. **Minimal comments**: Include as few inline comments as possible
4. **Test your changes**: Ensure all tests pass before submitting

### Pull Request Process
1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes following the development standards
4. Run `yarn lint:fix` and `yarn format`
5. Ensure all tests pass with `yarn test`
6. Submit a pull request with a clear description of your changes

## Documentation

To get started using Open SWE locally, see the [documentation here](https://docs.langchain.com/labs/swe/).


