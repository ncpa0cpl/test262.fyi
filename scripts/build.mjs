import { build } from "@ncpa0cpl/nodepack";
import fs from "fs/promises";
import path from "path";

const p = (...args) => path.resolve(import.meta.dirname, "..", ...args);

const BASEPATH = process.env.BASEPATH ?? "";

async function copyFiles() {
  await fs.cp(p("src/style.css"), p("dist/esm/style.css"));
  await fs.cp(p("src/favicon-16x16.png"), p("dist/esm/favicon-16x16.png"));
  await fs.cp(p("src/favicon-32x32.png"), p("dist/esm/favicon-32x32.png"));

  let indexContents = await fs.readFile(p("src/index.html"), "utf8");
  indexContents = indexContents.replaceAll("%BASEPATH%", BASEPATH);
  await fs.writeFile(p("dist/esm/index.html"), indexContents);
}

async function main() {
  await fs.mkdir(p("dist/esm"), { recursive: true });
  copyFiles();
  await build({
    srcDir: p("src"),
    outDir: p("dist"),
    formats: ["esm"],
    target: "esnext",
    bundle: true,
    entrypoint: p("src/index.tsx"),
    esbuildOptions: {
      jsxImportSource: "@ncpa0cpl/vanilla-jsx",
      loader: {
        ".css": "copy",
      },
      minify: process.argv.includes("--dev") ? false : true,
      sourcemap: process.argv.includes("--dev") ? "inline" : false,
      define: { BASEPATH: JSON.stringify(BASEPATH) },
    },
    watch: process.argv.includes("--watch"),
    onBuildComplete: () => void copyFiles(),
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
