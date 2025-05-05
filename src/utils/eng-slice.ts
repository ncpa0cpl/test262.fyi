import { ENG_ORDER } from "../consts";

export function engSlice<T>(
  engines: Record<string, T>,
  filter?: string[],
): [engineName: string, T][] {
  let result = Object.entries(engines);

  if (filter) {
    result = result.filter(elem => filter.includes(elem[0]));
  }

  result.sort((a, b) => {
    const aidx = ENG_ORDER.findIndex((e) => e === a[0]);
    const bidx = ENG_ORDER.findIndex((e) => e === b[0]);
    return aidx - bidx;
  });

  return result;
}
