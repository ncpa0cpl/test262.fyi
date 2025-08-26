import { sig } from "@ncpa0cpl/vanilla-jsx/signals";
import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { css } from "embedcss";
import { Stats } from "../../components/stats/stats";
import { DEFAULT_SELECTED_ENG, ENGINE_NAMES } from "../../consts";
import { router } from "../../router";
import { store } from "../../stores";
import { engSlice } from "../../utils/eng-slice";
import { get } from "../../utils/get";
import { graphBarWidth } from "../../utils/graph-bar-width";
import { oget } from "../../utils/oget";
import { Params } from "../../utils/params";

const detailsStyle = css`
    .details-page {
        grid-column: content;
        padding: 2vh 2vw;
        height: fit-content;
        width: 100%;

        & h1 {
            font-size: 2vw;
            font-weight: 700;
        }

        & > .stats {
            width: 100%;
        }

        & details {
            margin-top: 16px;

            & summary {
                margin-bottom: 12px;
            }
        }

        & table + details {
            margin-top: 36px;
        }
    }
`;

type DetailsFile = {
  total: number;
  engines: Record<string, number>;
  files: Record<string, {
    total: number;
    engines: Record<string, number>;
  }>;
};

export function DetailsPage(
  props: { ctx: RouteComponentContext<"file" | "eng", false> },
) {
  const { ctx } = props;
  const params = ctx.params;
  const data = sig<{ filename: string; content: DetailsFile }>();

  const { settings: { useAbs } } = store;

  const selectedEngines = Params.getEngines(ctx);

  params.add(({ file }) => {
    if (!file) {
      router.nav.summaries.$open();
      return;
    }
    get(`https://data.test262.fyi/${file}.json`).then((resp) => {
      if (resp.error) {
        router.nav.error.$open();
      } else {
        data.dispatch({ filename: file, content: resp.data });
      }
    });
  });

  const applicableEngines = sig.derive(
    data,
    selectedEngines,
    (data, selectedEngines) => {
      if (!data) return [];

      return engSlice(data.content.engines, selectedEngines);
    },
  );

  const statsElem = data.derive((d) =>
    d && (
      <Stats
        total={d.content.total}
        engines={applicableEngines}
        viewTransitionName={d.filename}
      />
    )
  );

  return (
    <div class={detailsStyle}>
      <table>
        {params.derive(p => (
          <thead>
            <tr>
              <th
                class={p.file}
                colspan={2}
                style={{
                  viewTransitionName: "vtrans_file_" + p.file,
                }}
              >
                {p.file}
              </th>
            </tr>
            <tr>
              <th class={p.file} colspan={2}>
                {statsElem}
              </th>
            </tr>
          </thead>
        ))}
        {data.derive((d) =>
          d && (
            <tbody>
              <tr>
                <th>
                  <span class="interactive" onclick={() => router.goBack()}>
                    ..
                  </span>
                </th>
                <td></td>
              </tr>
              {Object.entries(d.content.files).map(([path, feature]) => {
                const name = path.substring(d.filename.length + 1);
                return (
                  <tr>
                    <th>{name}</th>
                    <td>
                      <Stats
                        total={feature.total}
                        engines={selectedEngines.derive(selectedEngines =>
                          engSlice(feature.engines, selectedEngines)
                        )}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )
        )}
      </table>
    </div>
  );
}
