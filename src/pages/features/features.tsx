import { Range } from "@ncpa0cpl/vanilla-jsx";
import { sig } from "@ncpa0cpl/vanilla-jsx/signals";
import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { Stats } from "../../components/stats";
import { TableOptions } from "../../components/table-options";
import { DEFAULT_SELECTED_ENG } from "../../consts";
import { router } from "../../router";
import { store } from "../../stores";
import { engSlice } from "../../utils/eng-slice";
import { get } from "../../utils/get";
import { Params } from "../../utils/params";
import { FeaturesSelector } from "./components/features-selector";

export function FeaturesPage(
  props: { ctx: RouteComponentContext<"eng" | "feats", false> },
) {
  const { ctx } = props;
  const { features } = store;

  const selectedEngines = Params.getEngines(ctx);
  const selectedFeatures = Params.getFeatures(ctx);

  const setFeaturesParams = (currentlySelected: string[]) => {
    currentlySelected.sort((a, b) =>
      a.localeCompare(b, undefined, { caseFirst: "false" })
    );

    router.nav.features.$replace({
      feats: Params.toParam(currentlySelected),
    }, { keepParams: true });
  };

  ctx.on.blur(() => {
    router.replaceParams({ feats: "" }, { keepParams: true });
  });

  return (
    <div id="features-page">
      <TableOptions />
      <FeaturesSelector
        selected={selectedFeatures}
        onChange={setFeaturesParams}
      />
      <table>
        <thead></thead>
        <Range data={selectedFeatures} into={<tbody />}>
          {featureName => {
            const statsData = sig.derive(
              features,
              selectedEngines,
              (all, selectedEngines) => {
                const f = all[featureName];

                return {
                  total: f?.total ?? 0,
                  engines: engSlice(f?.engines ?? {}, selectedEngines),
                };
              },
            );

            return (
              <tr>
                <th>{featureName}</th>
                <td>
                  <Stats
                    total={statsData.$prop("total")}
                    engines={statsData.$prop("engines")}
                  />
                </td>
              </tr>
            );
          }}
        </Range>
      </table>
    </div>
  );
}
