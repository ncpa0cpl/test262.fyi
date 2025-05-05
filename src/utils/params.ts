import type { RouteComponentContext } from "@ncpa0cpl/vrouter";
import { DEFAULT_SELECTED_ENG } from "../consts";

const SEPARATOR = "|";

export class Params {
  static getEngines(ctx: RouteComponentContext<"eng", false>) {
    return ctx.params.derive((p) => {
      const selected = p.eng?.split(SEPARATOR) ?? DEFAULT_SELECTED_ENG;
      return selected;
    });
  }

  static getFeatures(ctx: RouteComponentContext<"feats", false>) {
    return ctx.params.derive((p) => {
      const selected = p.feats?.split(SEPARATOR) ?? [];
      return selected;
    });
  }

  static toParam(values: string[]) {
    return values.join(SEPARATOR);
  }
}
