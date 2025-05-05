import {
  type ReadonlySignal,
  sig,
  type Signal,
} from "@ncpa0cpl/vanilla-jsx/signals";
import { store } from "../../../stores";

export function FeaturesSelector(props: {
  selected: ReadonlySignal<string[]>;
  onChange: (selectedParams: string[]) => void;
}) {
  const { features } = store;
  const { selected } = props;

  const featsQuery = sig<string>("");

  return (
    <div>
      <div class="feature-filter">
        <input
          class="feature-filter-input"
          placeholder="Filter features"
          boundSignal={featsQuery}
        />
        <button class="clear-query" onclick={() => featsQuery.dispatch("")}>
          Clear
        </button>
        <button class="reset" onclick={() => props.onChange([])}>
          Reset features
        </button>
      </div>
      <div id="feature-selector">
        {features.derive(f => {
          const features = Object.entries(f).sort((a, b) =>
            a[0].localeCompare(b[0], undefined, { caseFirst: "false" })
          );

          return features.map(([featureName]) => {
            const id = `feat_${featureName}`;
            const checked = selected.$includes(featureName);
            return (
              <div
                class={{
                  feat: true,
                  visible: sig.or(
                    checked,
                    featsQuery.derive(q =>
                      q.length > 0
                        ? featureName.toLowerCase().includes(q.toLowerCase())
                        : true
                    ),
                  ),
                }}
              >
                <input
                  class="feature-checkbox"
                  type="checkbox"
                  id={id}
                  checked={checked}
                  onchange={ev => {
                    const isChecked = (ev.target as HTMLInputElement).checked;
                    let sel = selected.get();
                    if (isChecked) {
                      sel = [...sel, featureName];
                    } else {
                      sel = sel.filter(s => s !== featureName);
                    }
                    props.onChange(sel);
                  }}
                />
                <label htmlFor={id}>{featureName}</label>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
