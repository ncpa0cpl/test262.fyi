import { type ReadonlySignal, sig } from "@ncpa0cpl/vanilla-jsx/signals";
import { Details } from "../../../../components/details";
import { Stats } from "../../../../components/stats/stats";
import { ES_EDITIONS } from "../../../../consts";
import { store } from "../../../../stores";
import { engSlice } from "../../../../utils/eng-slice";
import { localStorageSig } from "../../../../utils/local-storage-signal";
import { oget } from "../../../../utils/oget";
import { editionsStyle } from "./editions-styles";

export function Editions(props: { selectedEngines: ReadonlySignal<string[]> }) {
  const { selectedEngines } = props;
  const { editions } = store;

  const additionsOnly = localStorageSig("esAdditionsOnly", true);

  const editionsSum = editions.derive(
    (editions) => {
      const editionsAcc: Record<
        string,
        { total: number; engines: Record<string, number> }
      > = {};
      const acc = { total: 0, engines: {} as Record<string, number> };
      for (
        const [edition, { engines, total }] of Object
          .entries(editions)
      ) {
        acc.total += total;
        for (const [engine, passes] of Object.entries(engines)) {
          acc.engines[engine] = (acc.engines[engine] ?? 0)
            + passes;
        }
        editionsAcc[edition] = {
          total: acc.total,
          engines: { ...acc.engines },
        };
      }
      return editionsAcc;
    },
  );

  return (
    <Details
      open
      persistenceID="editions_details"
      summary={<h2>Editions</h2>}
    >
      <div>
        <input
          type="checkbox"
          id="additions-only"
          checked={additionsOnly}
          onchange={ev =>
            additionsOnly.dispatch(
              (ev.target as HTMLInputElement).checked,
            )}
        />
        <label htmlFor="additions-only">Additions only</label>
      </div>
      <div class={editionsStyle}>
        {editions.derive((data) => {
          return Object
            .entries(data)
            .sort((a, b) =>
              String(a[0]).localeCompare(String(b[0]), undefined, {
                numeric: true,
              })
            )
            .map(([edition, { engines, total }]) => {
              return (
                <div>
                  <div>
                    <span>
                      {oget(
                        ES_EDITIONS,
                        String(edition),
                        `Edition ${edition}`,
                      )}
                      <span>
                        {Number(edition) > 6 ? `${edition}th edition` : ""}
                      </span>
                    </span>
                  </div>
                  <Stats
                    engines={sig.derive(
                      selectedEngines,
                      additionsOnly,
                      editionsSum,
                      (selected, additionsOnly, editionsSum) =>
                        additionsOnly
                          ? engSlice(engines, selected)
                          : engSlice(editionsSum[edition]!.engines, selected),
                    )}
                    total={sig.derive(
                      additionsOnly,
                      editionsSum,
                      (additionsOnly, editionsSum) =>
                        additionsOnly ? total : editionsSum[edition]!.total,
                    )}
                  />
                </div>
              );
            });
        })}
      </div>
    </Details>
  );
}
