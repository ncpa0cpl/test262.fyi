import { Range } from "@ncpa0cpl/vanilla-jsx";
import { sig } from "@ncpa0cpl/vanilla-jsx/signals";
import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { css } from "embedcss";
import { Stats } from "../../components/stats/stats";
import { DEFAULT_SELECTED_ENG } from "../../consts";
import { router } from "../../router";
import { store } from "../../stores";
import { engSlice } from "../../utils/eng-slice";
import { get } from "../../utils/get";
import { Params } from "../../utils/params";
import { FeaturesSelector } from "./components/features-selector";

const featuresStyle = css`
    .features-page {
        padding: 2vh 2vw;

        & .feature-filter {
            & .feature-filter-input {
                border-radius: 2px;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
                border-right: 0px;
                outline: none;
                margin-bottom: 0.5em;
            }
            & button.clear-query {
                border-radius: 2px;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
                border-left: 0;
                padding: 1px 0.2em;
                border: 1px solid grey;
            }
            & button.reset {
                margin-left: 1em;
                border-radius: 2px;
                padding: 1px 0.2em;
                border: 1px solid grey;
            }
        }

        & #feature-selector {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            margin-bottom: 1em;

            & .feat {
                display: none;

                &.visible {
                    display: block;
                }
            }

            & .feature-checkbox {
                margin-right: 0.3em;
            }
        }
    }
`;

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
    <div class={featuresStyle}>
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
