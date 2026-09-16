# Agent Efficiency & Context Optimization Rules

Follow these rules to minimize context window usage, lower credit consumption, and maintain targeted, efficient interactions:

## Context & File Reading Guidelines
- Read only files relevant to the current task.
- Do not scan the entire repository unless explicitly requested.
- Do not inspect node_modules, build output, caches, logs, or generated files.
- Use targeted searches instead of scanning unrelated directories.
- Read only relevant sections of large files using line range parameters.
- Avoid repeatedly reading files already understood in previous steps.
- Before opening a file, determine whether it is actually needed for the task.
- If a file is not relevant, do not read it.
- If additional context is genuinely required, access only the minimum necessary files.
- Never expose or unnecessarily inspect secrets from environment files.

## Scope & Execution Constraints
- Modify only files necessary for the requested task.
- Do not refactor unrelated code.
- Do not change dependencies unless explicitly required.
- Do not modify configuration files unless required.
- Do not perform unrelated cleanup.
- Stay strictly focused on the user's specific request.
