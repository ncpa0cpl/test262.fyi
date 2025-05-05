import { Range } from "@ncpa0cpl/vanilla-jsx";
import {
  type MaybeReadonlySignal,
  type ReadonlySignal,
  sig,
} from "@ncpa0cpl/vanilla-jsx/signals";
import { ENGINE_NAMES } from "../consts";
import { store } from "../stores";
import { graphBarWidth } from "../utils/graph-bar-width";
import { oget } from "../utils/oget";

type StatProps = {
  total: MaybeReadonlySignal<number>;
  engines: MaybeReadonlySignal<[engineName: string, number][]>;
  viewTransitionName?: string;
};

export function Stats(props: StatProps) {
  let { engines, total } = props;
  total = sig.as(total);
  engines = sig.as(engines);

  const {
    base,
    features,
    settings: {
      verticalGraphs,
      hideNegligible,
      useAbs,
      orderByResult,
    },
  } = store;

  const baseCalcs = sig.derive(engines, total, (engines, total) => {
    const totalPasses = engines.reduce(
      (sum, [, passes]) => sum + passes,
      0,
    );
    const negligiblePercent = engines.length / 2;
    const highestPasses = engines.reduce(
      (highest, [, passes]) => passes > highest ? passes : highest,
      0,
    );
    return {
      total,
      totalPasses,
      negligiblePercent,
      highestPasses,
      enginesCount: engines.length,
      highestPercent: (highestPasses / total)
        * 100,
    };
  });

  return (
    <Range
      data={engines.derive(e => e.map(([name]) => name))}
      into={
        <div
          class={{ stats: true, vertical: verticalGraphs }}
          style={props.viewTransitionName
            && {
              viewTransitionName: "vtrans_stats_" + props.viewTransitionName,
            }}
        />
      }
    >
      {(eng) => {
        const engineCalcs = sig.derive(baseCalcs, engines, (calcs, engines) => {
          const entry = engines.find(([name]) => name === eng);
          const passes = entry?.[1] ?? 0;
          return ({
            ...calcs,
            passes,
            percent: (passes / calcs.total) * 100,
          });
        });

        const name = oget(ENGINE_NAMES, eng, eng);
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
            title={value.derive(t => `${name} ${t}`)}
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
