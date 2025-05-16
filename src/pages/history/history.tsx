import { Range } from "@ncpa0cpl/vanilla-jsx";
import { type ReadonlySignal, sig } from "@ncpa0cpl/vanilla-jsx/signals";
import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { css } from "embedcss";
import { Md5 } from "ts-md5";
import { Lazy } from "../../components/lazy/lazy";
import { TableOptions } from "../../components/table-options";
import { router } from "../../router";
import { compareEngines } from "../../utils/eng-slice";
import { get } from "../../utils/get";
import { Params } from "../../utils/params";
import { HistoryStats } from "./components/history-stats";
import { historyStyle } from "./style";

type HistoryFile = Record<
  string,
  Record<string, number> & {
    time: number;
    total: number;
    versions: Record<string, string>;
  }
>;

export function HistoryPage(
  props: { ctx: RouteComponentContext<"eng" | "from" | "to", false> },
) {
  const { ctx } = props;
  const selectedEngines = Params.getEngines(ctx);
  const testHistory = sig<HistoryFile>({});

  ctx.on.blur(() => {
    router.replaceParams({ from: "", to: "" }, { keepParams: true });
  });

  get("https://test262.fyi/data/history.json").then((resp) => {
    if (resp.error) {
      router.nav.error.$open();
    } else {
      testHistory.dispatch(resp.data);
    }
  });

  const filters = Params.getHistoryFilters(ctx);

  const timestamps = sig.derive(
    testHistory,
    filters,
    selectedEngines,
    (h, filters, selected) => {
      const entries = Object.entries(h)
        .filter(([date]) => {
          let pass = true;
          if (filters.from) {
            pass &&= date >= filters.from;
          }
          if (filters.to) {
            pass &&= date <= filters.to;
          }
          return pass;
        })
        .map(([date, data]) => {
          const engines = Object.entries(data).filter(
            (entry): entry is [string, number] => {
              const key = entry[0];
              return selected.includes(key) && typeof entry[1] === "number";
            },
          ).map(([engine, passes]) => {
            const version = data.versions[engine]!;
            return {
              engine,
              passes,
              version,
            };
          });

          engines.sort((a, b) => compareEngines(a.engine, b.engine));

          const parsedInfo = {
            date: "",
            time: 0,
            total: data.total,
            engines,
            hash: "",
          };

          parsedInfo.hash = Md5.hashStr(JSON.stringify(parsedInfo));
          parsedInfo.date = date;
          parsedInfo.time = data.time;

          return parsedInfo;
        });

      entries.sort((a, b) => b.date.localeCompare(a.date));

      for (let i = entries.length - 1; i > 0; i--) {
        const entry = entries[i]!;
        const nextEntry = entries[i - 1]!;
        if (nextEntry.hash === entry.hash || entry.engines.length === 0) {
          entries.splice(i, 1);
        }
      }

      return entries;
    },
  );

  const handleFromDateInputChange = (
    e: Event & {
      target: HTMLInputElement;
    },
  ) => {
    router.replaceParams({
      from: e.target.value,
    }, { keepParams: true });
  };

  const handleToDateInputChange = (
    e: Event & {
      target: HTMLInputElement;
    },
  ) => {
    router.replaceParams({
      to: e.target.value,
    }, { keepParams: true });
  };

  return (
    <div class={historyStyle}>
      <div class="date-range-filter">
        <span>From:</span>
        <input
          type="date"
          defaultValue={props.ctx.params.get().from}
          onchange={handleFromDateInputChange}
        />
        <span>To:</span>
        <input
          type="date"
          defaultValue={props.ctx.params.get().to}
          onchange={handleToDateInputChange}
        />
      </div>
      <div class="timeline">
        {timestamps.$map(entry => (
          <div class="timeline-entry">
            <div class="data-block">
              <span class="entry-date">
                {entry.date}
                <span class="timeline-point"></span>
              </span>
              <span class="timeline-line">
              </span>
            </div>
            <div class="pit-results">
              <Lazy>
                {() => (
                  <HistoryStats
                    selectedEngines={selectedEngines}
                    engines={entry.engines}
                    total={entry.total}
                  />
                )}
              </Lazy>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
