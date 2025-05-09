import type { ReadonlySignal } from "@ncpa0cpl/vanilla-jsx/signals";
import { Details } from "../../../../components/details";
import { Stats } from "../../../../components/stats/stats";
import { type FeatureData, store } from "../../../../stores";
import { engSlice } from "../../../../utils/eng-slice";
import type { Unpartial } from "../../../../utils/ts.utils";
import { proposalsStyle } from "./proposals-styles";

export function Proposals(
  props: { selectedEngines: ReadonlySignal<string[]> },
) {
  const { selectedEngines } = props;
  const { features } = store;

  return (
    <Details
      open
      persistenceID="proposal_details"
      contentID="proposals"
      contentClass={proposalsStyle}
      summary={<h2>Proposals</h2>}
    >
      {features.derive((data) =>
        Object
          .entries(data)
          .map(([, f]) => f)
          .filter((f): f is Unpartial<FeatureData> => f.proposal !== null)
          .sort((a, b) => b.proposal.stars - a.proposal.stars)
          .map((feat) => {
            const applicableEngines = selectedEngines.derive(selected =>
              engSlice(feat.engines, selected)
            );

            return (
              <div>
                <div>
                  <a href={feat.proposal.link}>
                    {feat.proposal.name.replaceAll("'", "")}
                    <span class={`stage-${feat.proposal.stage}`}>
                      Stage {feat.proposal.stage}
                    </span>
                  </a>
                  <div>{feat.proposal.description}</div>
                </div>
                <Stats engines={applicableEngines} total={feat.total} />
              </div>
            );
          })
      )}
    </Details>
  );
}
