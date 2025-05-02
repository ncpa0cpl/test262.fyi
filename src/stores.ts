import { sig } from "@ncpa0cpl/vanilla-jsx/signals";
import { localStorageSig } from "./utils/local-storage-signal";

type Engines = Record<string, string>;
export type FeatureData = {
  total: number;
  engines: Record<string, number>;
  proposal: null | {
    name: string;
    stage: number;
    link: string;
    description: string;
    stars: number;
    lastUpdated: string;
  };
};
type TestResults = Record<
  string,
  FeatureData
>;
type BaseData = {
  total: number;
  engines: Record<string, number>;
  files: Record<string, {
    total: number;
    engines: Record<string, number>;
  }>;
};
type Editions = Record<
  string,
  { total: number; engines: Record<string, number> }
>;

export const store = {
  engines: sig<Engines>({}),
  features: sig<TestResults>({}),
  base: sig<BaseData>(),
  editions: sig<Editions>({}),

  settings: {
    verticalGraphs: localStorageSig("verticalGraphs", false),
    relativeGraphs: localStorageSig("relativeGraphs", false),
    hideNegligible: localStorageSig("hideNegligibleResults", true),
    useAbs: localStorageSig("useAbsoluteNumbers", false),
  },
};
