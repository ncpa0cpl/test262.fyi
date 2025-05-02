import { sig } from "@ncpa0cpl/vanilla-jsx/signals";
import { store } from "../stores";

export function graphBarWidth(info: {
  percent: number;
  passes: number;
  highestPercent: number;
  totalPasses: number;
  enginesCount: number;
}) {
  const {
    percent,
    passes,
    enginesCount,
    highestPercent,
    totalPasses,
  } = info;

  const {
    settings: {
      relativeGraphs,
      verticalGraphs,
    },
  } = store;

  return sig.derive(
    verticalGraphs,
    relativeGraphs,
    (verticalGraphs, relativeGraphs) => {
      if (relativeGraphs) {
        if (verticalGraphs) {
          return (100 * percent / highestPercent
            + "%");
        } else {
          return 100 * passes / totalPasses
            + "%";
        }
      } else {
        if (verticalGraphs) {
          return `${percent}%`;
        } else {
          return `${percent / enginesCount}%`;
        }
      }
    },
  );
}
