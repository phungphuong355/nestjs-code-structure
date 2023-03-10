/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/app.ts"],
  outdir: "out",
  bundle: true,
  minify: true,
  sourcesContent: false,
  platform: "node",
  target: "esnext",
  // format: "esm",
  //   outExtension: {
  //     ".js": ".mjs",
  //   },
  //   banner: {
  //     js: "import path from 'path';import { fileURLToPath } from 'url';const __filename = fileURLToPath(import.meta.url);const __dirname = path.dirname(__filename);import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  //   },
});
