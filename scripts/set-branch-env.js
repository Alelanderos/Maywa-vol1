const fs = require("fs");
const { execSync } = require("child_process");

// Get current branch name
const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

// Write to a `.env.branch` file (or just `.env`)
fs.writeFileSync(".env.branch", `VITE_GIT_BRANCH=${branch}\n`);
