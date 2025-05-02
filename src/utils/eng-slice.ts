import { ENG_ORDER } from "../consts";

export function engSlice<T>(
  engines: Record<string, T>,
): [engineName: string, T][] {
  return Object.entries(engines).toSorted((a, b) => {
    const aidx = ENG_ORDER.findIndex((e) => e === a[0]);
    const bidx = ENG_ORDER.findIndex((e) => e === b[0]);
    return aidx - bidx;
  });
}
