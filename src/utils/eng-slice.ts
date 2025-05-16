import { ENG_ORDER } from "../consts";

export function engSlice<T>(
  engines: Record<string, T>,
  filter?: string[],
): [engineName: string, T][] {
  let result = Object.entries(engines);

  if (filter) {
    result = result.filter(elem => filter.includes(elem[0]));
  }

  result.sort((a, b) => compareEngines(a[0], b[0]));

  return result;
}

export function compareEngines(a: string, b: string) {
  const aidx = ENG_ORDER.findIndex((e) => e === a);
  const bidx = ENG_ORDER.findIndex((e) => e === b);
  return aidx - bidx;
}
