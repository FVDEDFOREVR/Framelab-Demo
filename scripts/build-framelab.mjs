import { execFileSync } from "node:child_process"
import { existsSync, rmSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const demoRoot = path.resolve(__dirname, "..")
const compilerRoot = path.resolve(demoRoot, "../framelab-compiler")
const inputPath = path.join(demoRoot, "src/framelab/demo.fl")
const outDir = path.join(demoRoot, "src/generated")
const cliPath = path.join(compilerRoot, "dist/cli.js")
const generatedArtifacts = [
  "tokens.css",
  "Button.tsx",
  "Button.module.css",
  "ProductCard.tsx",
  "ProductCard.module.css",
  "Input.tsx",
  "Input.module.css",
  "NavItem.tsx",
  "NavItem.module.css",
  "Toast.tsx",
  "Toast.module.css",
]

function hasGeneratedArtifacts() {
  return generatedArtifacts.every((file) => existsSync(path.join(outDir, file)))
}

function runNpmBuild(cwd) {
  if (process.env.npm_execpath) {
    execFileSync(process.execPath, [process.env.npm_execpath, "run", "build"], {
      cwd,
      stdio: "inherit",
    })
    return
  }

  execFileSync("npm", ["run", "build"], {
    cwd,
    stdio: "inherit",
  })
}

if (!existsSync(compilerRoot) || !existsSync(path.join(compilerRoot, "package.json"))) {
  if (!hasGeneratedArtifacts()) {
    throw new Error(
      "Missing ../framelab-compiler and no committed src/generated artifacts were found. " +
      "Run npm run framelab:build locally with the compiler repo available before deploying."
    )
  }

  console.warn(
    "[framelab:build] ../framelab-compiler not found. " +
    "Using committed src/generated artifacts without regeneration."
  )
  process.exit(0)
}

runNpmBuild(compilerRoot)

if (!existsSync(cliPath)) {
  throw new Error(`Expected compiler CLI at ${cliPath} after build.`)
}

rmSync(outDir, { recursive: true, force: true })

execFileSync(process.execPath, [cliPath, "build", inputPath, "--out-dir", outDir], {
  cwd: demoRoot,
  stdio: "inherit",
})
