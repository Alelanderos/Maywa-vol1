const fs = require("fs");
const { execSync } = require("child_process");

const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
fs.writeFileSync(".env.local", `NEXT_PUBLIC_GIT_BRANCH=${branch}\n`);
