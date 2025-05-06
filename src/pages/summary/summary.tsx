import { sig } from "@ncpa0cpl/vanilla-jsx/signals";
import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { Details } from "../../components/details";
import { Link } from "../../components/link";
import { Stats } from "../../components/stats";
import { TableOption } from "../../components/table-option";
import { TableOptions } from "../../components/table-options";
import { DEFAULT_SELECTED_ENG, ENGINE_NAMES, ES_EDITIONS } from "../../consts";
import { router } from "../../router";
import { type FeatureData, store } from "../../stores";
import { engSlice } from "../../utils/eng-slice";
import { prefetch } from "../../utils/get";
import { graphBarWidth } from "../../utils/graph-bar-width";
import { localStorageSig } from "../../utils/local-storage-signal";
import { oget } from "../../utils/oget";
import { Params } from "../../utils/params";
import type { Unpartial } from "../../utils/ts.utils";

export function SummaryPage(
  props: { ctx: RouteComponentContext<"eng", false> },
) {
  const { ctx } = props;

  const {
    base,
    features,
    editions,
  } = store;

  const additionsOnly = localStorageSig("esAdditionsOnly", true);

  const selectedEngines = Params.getEngines(ctx);

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
    <div id="summaries-page">
      <TableOptions />
      <table>
        <thead></thead>
        <tbody>
          {sig.derive(base, (data) => {
            if (!data) return <></>;

            return Object.entries(data.files).map(([file, fileData]) => {
              const applicableEngines = selectedEngines.derive(selected =>
                engSlice(fileData.engines, selected)
              );

              return (
                <tr>
                  <th class="link-cell">
                    <Link
                      class="file-link"
                      to={router.nav.details}
                      params={{ file }}
                      prefetch={`https://test262.fyi/data/${file}.json`}
                      style={{
                        viewTransitionName: "vtrans_file_" + file,
                      }}
                    >
                      {file}
                    </Link>
                  </th>
                  <td style={{ borderLeft: "none" }}>
                    <Stats
                      engines={applicableEngines}
                      total={fileData.total}
                      viewTransitionName={file}
                    />
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
      <Details
        open
        persistenceID="proposal_details"
        contentID="proposals"
        summary={<h2>Proposals</h2>}
      >
        {features.derive((data) =>
          Object
            .entries(data)
            .map(([, f]) => f)
            .filter((f): f is Unpartial<FeatureData> => f.proposal !== null)
            .sort((a, b) => b.proposal.stars - a.proposal.stars)
            .map((feat) => {
              const applicableEngines = selectedEngines.derive(selected =>
                engSlice(feat.engines, selected)
              );

              return (
                <div>
                  <div>
                    <a href={feat.proposal.link}>
                      {feat.proposal.name.replaceAll("'", "")}
                      <span class={`stage-${feat.proposal.stage}`}>
                        Stage {feat.proposal.stage}
                      </span>
                    </a>
                    <div>{feat.proposal.description}</div>
                  </div>
                  <Stats engines={applicableEngines} total={feat.total} />
                </div>
              );
            })
        )}
      </Details>
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
        <div id="editions">
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
    </div>
  );
}
