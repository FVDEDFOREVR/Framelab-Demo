import { execFileSync } from "node:child_process"
import { rmSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const demoRoot = path.resolve(__dirname, "..")
const compilerRoot = path.resolve(demoRoot, "../framelab-compiler")
const inputPath = path.join(demoRoot, "src/framelab/demo.fl")
const outDir = path.join(demoRoot, "src/generated")
const cliPath = path.join(compilerRoot, "dist/cli.js")

execFileSync("npm", ["run", "build"], {
  cwd: compilerRoot,
  stdio: "inherit",
})

rmSync(outDir, { recursive: true, force: true })

execFileSync(process.execPath, [cliPath, "build", inputPath, "--out-dir", outDir], {
  cwd: demoRoot,
  stdio: "inherit",
})
