import { sig } from "@ncpa0cpl/vanilla-jsx/signals";
import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { css } from "embedcss";
import { Details } from "../../components/details";
import { Link } from "../../components/link";
import { Stats } from "../../components/stats/stats";
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
import { Editions } from "./components/editions/editions";
import { Proposals } from "./components/proposals/proposals";

const summaryStyle = css`
    .summaries-page {
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

        & .link-cell {
            position: relative;

            & .file-link {
                display: flex;
                align-items: center;
                text-decoration: underline;
                position: absolute;
                top: 0;
                bottom: 0;
                transition: color 0.15s;

                &:not(:hover) {
                    color: #71a8ff;
                }
            }
        }
    }
`;

export function SummaryPage(
  props: { ctx: RouteComponentContext<"eng", false> },
) {
  const { ctx } = props;

  const {
    base,
    features,
    editions,
  } = store;

  const selectedEngines = Params.getEngines(ctx);

  return (
    <div class={summaryStyle}>
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
      <Proposals selectedEngines={selectedEngines} />
      <Editions selectedEngines={selectedEngines} />
    </div>
  );
}
