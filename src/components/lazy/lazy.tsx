import { sig } from "@ncpa0cpl/vanilla-jsx/signals";

export function Lazy(props: { children: () => JSX.Element }) {
  const isVisible = sig(false);
  const lastKnownHeight = sig(0);

  const observer = new IntersectionObserver(([entry]) => {
    if (entry!.intersectionRatio > 0) {
      isVisible.dispatch(true);
      setTimeout(() => {
        lastKnownHeight.dispatch(entry?.target.clientHeight ?? 0);
      });
    } else {
      isVisible.dispatch(false);
    }
  });

  const lazyContainer = (
    <div
      class="lazy-container"
      style={{
        minHeight: sig.derive(
          lastKnownHeight,
          isVisible,
          (lastKnownHeight, isVisible) =>
            isVisible ? "10px" : `${lastKnownHeight}px`,
        ),
        minWidth: "10px",
      }}
    >
      {isVisible.derive(isVisible => {
        if (isVisible) {
          return props.children();
        }
        return <></>;
      })}
    </div>
  );

  setTimeout(() => {
    observer.observe(lazyContainer);
  });

  return lazyContainer;
}
