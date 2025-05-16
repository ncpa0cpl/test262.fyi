import fs from "fs/promises";
import path from "path";

/**
 * @import {Plugin} from "esbuild"
 */

/**
 * @param {{ dir?: string; baseUrlPath?: string }} options
 * @returns {Plugin} */
export function SvgLoader(options = {}) {
  return {
    name: "svg-loader",
    setup(build) {
      let baseUrl = ``;
      let outDir = build.initialOptions.outdir
        ?? path.dirname(build.initialOptions.outfile);

      if (options.baseUrlPath) {
        baseUrl = options.baseUrlPath;
      }
      if (options.dir) {
        outDir = path.join(outDir, options.dir);
        baseUrl = baseUrl + "/" + options.dir;
      }

      fs.mkdir(outDir, { recursive: true });

      build.onLoad({ filter: /.+svg$/ }, (args) => {
        const filename = path.basename(args.path);
        fs.copyFile(args.path, path.join(outDir, filename));
        return {
          loader: "js",
          resolveDir: path.dirname(args.path),
          contents:
            /* js */ `import { jsx } from "@ncpa0cpl/vanilla-jsx/jsx-runtime"
export default (props) => jsx("img", {src: "${
              baseUrl + "/" + filename
            }", ...props });`,
        };
      });
    },
  };
}
