import { Range } from "@ncpa0cpl/vanilla-jsx";
import {
  type MaybeReadonlySignal,
  type ReadonlySignal,
  sig,
} from "@ncpa0cpl/vanilla-jsx/signals";
import { statsStyle } from "../../../components/stats/stats-styles";
import { ENGINE_NAMES } from "../../../consts";
import { store } from "../../../stores";
import { graphBarWidth } from "../../../utils/graph-bar-width";
import { oget } from "../../../utils/oget";
import { simplifyVersion } from "../../../utils/verions";

type StatProps = {
  total: number;
  selectedEngines: ReadonlySignal<string[]>;
  engines: {
    engine: string;
    passes: number;
    version: string;
  }[];
};

export function HistoryStats(props: StatProps) {
  let { engines, total, selectedEngines } = props;

  const {
    settings: {
      verticalGraphs,
      useAbs,
      orderByResult,
      hideNegligible,
    },
  } = store;

  const baseCalcs = sig.derive(selectedEngines, (sel) => {
    const filteredEngines = engines.filter(({ engine }) =>
      sel.includes(engine)
    );

    const totalPasses = filteredEngines.reduce(
      (sum, { passes }) => sum + passes,
      0,
    );
    const negligiblePercent = filteredEngines.length / 2;
    const highestPasses = filteredEngines.reduce(
      (highest, { passes }) => passes > highest ? passes : highest,
      0,
    );
    return {
      total,
      totalPasses,
      negligiblePercent,
      highestPasses,
      enginesCount: filteredEngines.length,
      highestPercent: (highestPasses / total)
        * 100,
    };
  });

  return (
    <Range
      data={selectedEngines}
      into={
        <div
          class={{ [statsStyle.cname]: true, vertical: verticalGraphs }}
        />
      }
    >
      {(eng) => {
        if (!eng) return <span></span>;
        const engine = engines.find(({ engine }) => engine === eng);
        if (!engine) return <span></span>;

        const name = oget(ENGINE_NAMES, eng, eng);

        const engineCalcs = baseCalcs.derive((calcs) => {
          const passes = engine?.passes ?? 0;
          return ({
            ...calcs,
            passes,
            percent: (passes / calcs.total) * 100,
          });
        });

        const value = sig.derive(
          useAbs,
          engineCalcs,
          (abs, { total, percent, passes }) =>
            abs
              ? `${passes}/${total}`
              : `${percent.toFixed(0)}%`,
        );

        return (
          <div
            dir={sig.when(verticalGraphs, "ltr", "rtl")}
            class={`stat-${eng}`}
            title={value.derive(t => `${name} (ver. ${engine.version}) ${t}`)}
            style={{
              display: sig.derive(
                engineCalcs,
                hideNegligible,
                ({ percent, negligiblePercent }, hideNegligible) =>
                  hideNegligible && percent < negligiblePercent
                    ? "none"
                    : "block",
              ),
              width: engineCalcs.derive(graphBarWidth),
              order: sig.when(
                orderByResult,
                engineCalcs.derive(d => String(d.total - d.passes)),
                undefined,
              ),
            }}
          >
            <b>{name}</b>
            <span class="historical-stat-version">
              ({simplifyVersion(engine.version)})
            </span>
            <span>
              <span class="graph-value">
                {value}
              </span>
            </span>
          </div>
        );
      }}
    </Range>
  );
}
