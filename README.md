# test262.fyi

Independent daily [test262](https://github.com/tc39/test262) (standard test suite) runner for _many_ JS engines (test262.report spiritual successor). WIP.

## Engines

- [x] V8 <small>[site](https://v8.dev)</small> <small>[source](https://chromium.googlesource.com/v8/v8.git)</small>
- [x] SpiderMonkey <small>[site](https://spidermonkey.dev)</small> <small>[source](https://hg.mozilla.org/mozilla-central/file/tip/js)</small>
- [x] JavaScriptCore <small>[source](https://github.com/WebKit/WebKit/tree/main/Source/JavaScriptCore)</small>
- [x] ChakraCore <small>[source](https://github.com/chakra-core/ChakraCore)</small>
- [x] Hermes <small>[site](https://hermesengine.dev)</small> <small>[source](https://github.com/facebook/hermes)</small>
- [x] LibJS <small>[source](https://github.com/LadybirdBrowser/ladybird/tree/master/Libraries/LibJS)</small>
- [x] engine262 <small>[site](https://engine262.js.org)</small> <small>[source](https://github.com/engine262/engine262)</small>
- [x] GraalJS <small>[source](https://github.com/oracle/graaljs)</small>
- [x] QuickJS <small>[site](https://bellard.org/quickjs/)</small> <small>[source](https://github.com/bellard/quickjs)</small>
- [x] XS <small>[site](https://www.moddable.com/)</small> <small>[source](https://github.com/Moddable-OpenSource/moddable)</small>
- [x] Rhino <small>[site](https://mozilla.github.io/rhino/)</small> <small>[source](https://github.com/mozilla/rhino)</small>
- [x] Boa <small>[site](https://boajs.dev/)</small> <small>[source](https://github.com/boa-dev/boa)</small>
- [x] Kiesel <small>[site](https://kiesel.dev)</small> <small>[source](https://codeberg.org/kiesel-js/kiesel)</small>
- [x] Porffor <small>[site](https://porffor.dev)</small> <small>[source](https://github.com/CanadaHonk/porffor)</small>
- [x] Nova <small>[site](https://trynova.dev)</small> <small>[source](https://github.com/trynova/nova)</small>
- [x] NJS <small>[site](https://nginx.org/en/docs/njs/)</small> <small>[source](https://github.com/nginx/njs)</small>
- [x] Bali <small>[source](https://github.com/ferus-web/bali)</small>
- Request more in GitHub issues!

### Transpilers

- [x] Babel (old Node and Babel + core-js)
- [x] SWC (old Node and SWC + core-js)
- [x] Sucrase (old Node and Sucrase + core-js)

### Engine variants

- [x] V8 with experimental opts (--harmony etc)
- [x] SM with experimental opts
- [ ] Stable versions of engines

## Features to do

- Preview test262 PRs (changes only)
- Data/graph over time
- Diff individual engines(/runs)
- Lookup JS runtime version -> JS engine version (Node, Deno, Bun, etc)
- Measure times for each test, have "result view" and "time view"

## Local build

> **Note**:
> You need a GitHub API token (PAT) in your env as `GITHUB_TOKEN`

1. Clone repo
2. Run `scripts/downloadOldResults.mjs` and `scripts/extractResults.sh` (downloads results from latest build)
3. `node site/generate.mjs` (might take a minute or two)
4. Start a HTTP server in `site` and open it in your browser
