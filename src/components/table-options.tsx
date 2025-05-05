import { store } from "../stores";
import { TableOption } from "./table-option";

export function TableOptions() {
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
    <div id="table-options">
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
