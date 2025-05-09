import { build } from "@ncpa0cpl/nodepack";
import { EmbedCssPlugin } from "embedcss/plugins/esbuild";
import fs from "fs/promises";
import path from "path";

const p = (...args) => path.resolve(import.meta.dirname, "..", ...args);

const BASEPATH = process.env.BASEPATH ?? "";

const SPA_ROUTES = [
  "summaries",
  "features",
  "details",
  "error",
];

async function copyFiles() {
  await fs.cp(p("src/favicon-16x16.png"), p("dist/esm/favicon-16x16.png"));
  await fs.cp(p("src/favicon-32x32.png"), p("dist/esm/favicon-32x32.png"));

  let indexContents = await fs.readFile(p("src/index.html"), "utf8");
  indexContents = indexContents.replaceAll("%BASEPATH%", BASEPATH);
  await fs.writeFile(p("dist/esm/index.html"), indexContents);

  for (const routeName of SPA_ROUTES) {
    await fs.cp(p("dist/esm/index.html"), p(`dist/esm/${routeName}.html`));
  }
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
      plugins: [EmbedCssPlugin()],
    },
    watch: process.argv.includes("--watch"),
    onBuildComplete: () => void copyFiles(),
  });

  process.exit();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
