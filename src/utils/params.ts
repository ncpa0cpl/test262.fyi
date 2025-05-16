import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { DEFAULT_SELECTED_ENG } from "../consts";

const SEPARATOR = "|";

export class Params {
  static getEngines(ctx: RouteComponentContext<"eng", false>) {
    return ctx.params.$prop("eng").derive((eng) => {
      if (eng != null) {
        const selected = eng.split(SEPARATOR).filter(Boolean);
        return selected;
      }
      return DEFAULT_SELECTED_ENG;
    });
  }

  static getFeatures(ctx: RouteComponentContext<"feats", false>) {
    return ctx.params.$prop("feats").derive((feats) => {
      const selected = feats?.split(SEPARATOR).filter(Boolean) ?? [];
      return selected;
    });
  }

  static getHistoryFilters(ctx: RouteComponentContext<"from" | "to", false>) {
    return ctx.params.derive(({ from, to }) => {
      return { from, to };
    }, {
      compare(a, b) {
        return a.from === b.from && a.to === b.to;
      },
    });
  }

  static toParam(values: string[]) {
    return values.join(SEPARATOR);
  }
}
