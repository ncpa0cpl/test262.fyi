import type {
  MaybeReadonlySignal,
  MaybeSignal,
  ReadonlySignal,
  Signal,
} from "@ncpa0cpl/vanilla-jsx/signals";
import { localStorageSig } from "../utils/local-storage-signal";

class DetailsAnimController {
  el;
  summary;
  content: HTMLElement;
  animation: Animation | null;
  isClosing;
  isExpanding;

  constructor(
    el: HTMLDetailsElement,
    protected animationDiration: number = 400,
  ) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector("summary")!;
    // Store the <div class="content"> element
    this.content = el.querySelector(".content")!;

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener("click", (e) => this.onClick(e));
  }

  onClick(e: MouseEvent) {
    const tagetTag = (e.target as Element).tagName;
    if (tagetTag === "INPUT" || tagetTag === "BUTTON") {
      return;
    }

    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = "hidden";
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
      // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;

    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight],
    }, {
      duration: this.animationDiration,
      easing: "ease-out",
    });

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight
    }px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight],
    }, {
      duration: 400,
      easing: "ease-out",
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open: boolean) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = "";
  }
}

export function Details(
  props: {
    persistenceID?: string;
    animationDuration?: number;
    open: boolean;
    summary: MaybeReadonlySignal<JSX.Element>;
    children: MaybeReadonlySignal<JSX.Element | JSX.Element[]>;
    contentID?: MaybeReadonlySignal<string>;
    contentClass?: MaybeReadonlySignal<string>;
  },
) {
  let open: boolean | Signal<boolean> = props.open;
  let onChangeCb: undefined | ((ev: Event) => void);
  if (props.persistenceID) {
    open = localStorageSig(props.persistenceID, props.open);
    const openSig = open;
    onChangeCb = ev => {
      openSig.dispatch(elem.open);
    };
  }

  const elem = (
    <details
      open={open}
      style={{ boxSizing: "border-box" }}
      ontoggle={onChangeCb}
    >
      <summary>
        {props.summary}
      </summary>
      <div id={props.contentID} class={["content", props.contentClass]}>
        {props.children}
      </div>
    </details>
  ) as HTMLDetailsElement;

  new DetailsAnimController(elem, props.animationDuration);

  return elem;
}
