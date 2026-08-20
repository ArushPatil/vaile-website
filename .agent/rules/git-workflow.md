# Git Automation Workflow

## Triggers
Activate this workflow when the user requests actions like:
- "commit and push"
- "commit changes"
- "save to github"
- "ship it"
- "push to repo"

## Instructions

1. **Inspect Changes**:
   - Check modified and untracked files using `git status`.
   - Never commit sensitive files (e.g., `.env`, credentials, secrets, local keys).

2. **Stage Changes**:
   - Add the appropriate files (`git add <files>` or `git add .` if clean).

3. **Formulate Commit Message**:
   - Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`).
   - Keep the message concise and descriptive of the actual changes made.
   - If the user specified a custom commit message, use that.

4. **Commit & Push**:
   - Commit the changes: `git commit -m "<commit message>"`.
   - Push to the current active branch: `git push origin <branch-name>` (or standard `git push`).
   - If an upstream branch is not set, set it with `git push -u origin <branch-name>`.

5. **Report to User**:
   - Output the commit hash, commit message, and destination branch to confirm success.
