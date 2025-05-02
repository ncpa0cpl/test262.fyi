import type { Signal } from "@ncpa0cpl/vanilla-jsx/signals";

export function TableOption(props: {
  option: Signal<boolean>;
  label: string;
  description?: string;
}) {
  const { label, option, description } = props;
  const randID = "opt_" + Math.random().toFixed(8).substr(2);
  return (
    <div>
      <input
        title={description}
        class="table-option-checkbox"
        type="checkbox"
        id={randID}
        checked={option}
        onchange={ev =>
          option.dispatch(
            (ev.target as HTMLInputElement).checked,
          )}
      />
      <label htmlFor={randID} title={description}>{label}</label>
    </div>
  );
}
