import type { NavigationOptions } from "@ncpa0cpl/vrouter";
import type { Resolvable } from "../../../vrouter/dist/types/util/resolvable";
import { router } from "../router";
import { prefetch } from "../utils/get";

type To<Params> = {
  $open(params?: Params, opt?: NavigationOptions): Resolvable<any>;
  $url(params?: Params, opt?: NavigationOptions): string;
};

type LinkProps<Params> = Omit<JSX.IntrinsicElements["a"], "href"> & {
  to: To<Params>;
  params?: Params;
  /** Keeps any already set search params when navigating */
  keepParams?: boolean;
  prefetch?: string;
};

export function Link<Params>(
  { to, params, keepParams = true, prefetch: prefetchUrl, ...props }: LinkProps<
    Params
  >,
) {
  return (
    <a
      {...props}
      href={to.$url(params, { keepParams })}
      onclick={e => {
        e.preventDefault();
        to.$open(params, { keepParams });
      }}
      onmouseover={prefetchUrl
        ? (() => {
          prefetch(prefetchUrl);
        })
        : undefined}
    />
  );
}

type T = keyof {};
