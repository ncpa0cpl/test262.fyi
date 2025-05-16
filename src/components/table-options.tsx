import { type ReadonlySignal, sig } from "@ncpa0cpl/vanilla-jsx/signals";
import { css } from "embedcss";
import { store } from "../stores";
import { TableOption } from "./table-option";

const tableOptionsStyle = css`
.table-options {
    position: absolute;
    top: var(--nav-height);
    background: #393939;
    right: .4em;
    padding: .7em;
}
`;

export function TableOptions(props: { visible: ReadonlySignal<boolean> }) {
  const {
    settings: {
      relativeGraphs,
      verticalGraphs,
      hideNegligible,
      useAbs,
      orderByResult,
    },
  } = store;

  return (
    <div
      id="table-options"
      class={tableOptionsStyle}
      style={{ display: sig.when(props.visible, "block", "none") }}
    >
      <TableOption
        option={verticalGraphs}
        label="Vertical graphs"
        description="Display graph bars one below another instead of single line"
      />
      <TableOption
        option={relativeGraphs}
        label="Relative graphs"
        description="Display results in graphs relative to the best score"
      />
      <TableOption
        option={hideNegligible}
        label="Hide negligible results"
      />
      <TableOption
        option={useAbs}
        label="Use absolute numbers (X/Y)"
        description="eg 1/2 instead of 50%"
      />
      <TableOption
        option={orderByResult}
        label="Order by result"
        description="Order engines in the graphs by the engine test score"
      />
    </div>
  );
}
