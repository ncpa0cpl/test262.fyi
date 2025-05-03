import { sig } from "@ncpa0cpl/vanilla-jsx/signals";
import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { Details } from "../components/details";
import { Navbar } from "../components/navbar";
import {
  CATEGORIES,
  DEFAULT_SELECTED_ENG,
  ENGINE_INFO,
  ENGINE_NAMES,
} from "../consts";
import { router } from "../router";
import { store } from "../stores";
import { engSlice } from "../utils/eng-slice";
import { get } from "../utils/get";
import { oget } from "../utils/oget";

function simplifyVersion(version: string): string {
  if (version.length === 40) version = version.slice(0, 8);
  if (version.length === 46) version = version.slice(0, 14);
  return version;
}

export function Layout(props: { ctx: RouteComponentContext<"eng", false> }) {
  const { ctx } = props;
  const { engines, features, base, editions } = store;

  const selectedEngines = ctx.params.derive((p) => {
    const selected = p.eng?.split("|") ?? DEFAULT_SELECTED_ENG;
    return selected;
  });

  const enginesByCategory = engines.derive(engines => {
    const grouped = Object.groupBy(
      engSlice(engines).map(([e, ver]) => ({
        name: e,
        category: oget(CATEGORIES, e, "engines"),
        version: ver,
      } as const)),
      elem => elem.category,
    );
    return Array.from(Object.entries(grouped)).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  });

  get("https://test262.fyi/data/engines.json").then((resp) => {
    if (resp.error) {
      router.nav.error.$open();
    } else {
      engines.dispatch(resp.data);
    }
  });

  get("https://test262.fyi/data/features.json").then((resp) => {
    if (resp.error) {
      router.nav.error.$open();
    } else {
      features.dispatch(resp.data);
    }
  });

  get("https://test262.fyi/data/index.json").then((resp) => {
    if (resp.error) {
      router.nav.error.$open();
    } else {
      base.dispatch(resp.data);
    }
  });

  get("https://test262.fyi/data/editions.json").then((resp) => {
    if (resp.error) {
      router.nav.error.$open();
    } else {
      editions.dispatch(resp.data);
    }
  });

  const setEngineParam = (selected: boolean, ...engines: string[]) => {
    let currentlySelected = selectedEngines.get();
    if (selected) {
      currentlySelected.push(...engines);
    } else {
      currentlySelected = currentlySelected.filter(e => !engines.includes(e));
    }

    router.navigate(router.current().path, {
      eng: currentlySelected.join("|"),
    }, { keepParams: true });
  };

  return (
    <div class="page-root">
      <div id="sidebar">
        <div id="sidebar-contents">
          <h1>
            <a href={BASEPATH ?? "/"}>test262.fyi</a>
          </h1>
          <h2>
            daily runner of{" "}
            <a href="https://github.com/tc39/test262">test262</a> for{" "}
            <i>many</i> engines
          </h2>

          <hr />

          <div id="engines">
            {enginesByCategory.derive(
              (groups) =>
                groups.map(([groupName, engines]) => (
                  <Details
                    open
                    persistenceID={`eng_cat_${groupName}`}
                    animationDuration={200}
                    summary={
                      <>
                        <input
                          type="checkbox"
                          checked={selectedEngines.derive(selected => {
                            return engines.some(en =>
                              selected.includes(en.name)
                            );
                          })}
                          onchange={e => {
                            const target = e.target as HTMLInputElement;
                            setEngineParam(
                              target.checked,
                              ...engines.map(e => e.name),
                            );
                          }}
                        />
                        <h3>{groupName}</h3>
                      </>
                    }
                  >
                    {engines.map(({ name: engine, version }) => (
                      <div>
                        <input
                          type="checkbox"
                          id={`engine-inpt-${engine}`}
                          checked={selectedEngines.derive(selected => {
                            return selected.includes(engine);
                          })}
                          onchange={(ev) => {
                            const target = ev.target as HTMLInputElement;
                            setEngineParam(target.checked, engine);
                          }}
                        />
                        <label
                          title={oget(ENGINE_INFO, engine, "")}
                          htmlFor={`engine-inpt-${engine}`}
                        >
                          {oget(ENGINE_NAMES, engine, engine)}
                        </label>
                        <span>{simplifyVersion(version)}</span>
                      </div>
                    ))}
                  </Details>
                )),
            )}
          </div>

          <hr id="before-overall" />

          <hr id="before-times" />

          <footer>
            generated <span id="generated_ago"></span>
            <span id="generated_in"></span>
            <br />
            test262 revision <a href="" id="test262_rev"></a>
            <br />
            <br />
            <a href="https://github.com/CanadaHonk/test262.fyi">source</a>. work
            in progress, not 100% accurate.
          </footer>
        </div>
      </div>
      <div id="page-contents">
        <Navbar />
        {ctx.out()}
      </div>
    </div>
  );
}
