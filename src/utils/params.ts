import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { DEFAULT_SELECTED_ENG } from "../consts";

const SEPARATOR = "|";

export class Params {
  static getEngines(ctx: RouteComponentContext<"eng", false>) {
    const paramsCache = new Map<string, string[]>();
    return ctx.params.derive((p) => {
      if (p.eng != null) {
        const cached = paramsCache.get(p.eng);
        if (cached) return cached;

        const selected = p.eng.split(SEPARATOR).filter(Boolean);
        paramsCache.set(p.eng, selected);
        return selected;
      }

      return DEFAULT_SELECTED_ENG;
    });
  }

  static getFeatures(ctx: RouteComponentContext<"feats", false>) {
    return ctx.params.derive((p) => {
      const selected = p.feats?.split(SEPARATOR).filter(Boolean) ?? [];
      return selected;
    });
  }

  static toParam(values: string[]) {
    return values.join(SEPARATOR);
  }
}
