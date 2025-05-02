import type { NavigationOptions } from "@ncpa0cpl/vrouter";
import { router } from "../router";

type To<Params> = {
  $open(params?: Params, opt?: NavigationOptions): any;
  $url(params?: Params, opt?: NavigationOptions): string;
};

type LinkProps<Params> = Omit<JSX.IntrinsicElements["a"], "href"> & {
  to: To<Params>;
  params?: Params;
  /** Keeps any already set search params when navigating */
  keepParams?: boolean;
};

export function Link<Params>(
  { to, params, keepParams = true, ...props }: LinkProps<Params>,
) {
  return (
    <a
      {...props}
      href={to.$url(params, { keepParams })}
      onclick={e => {
        e.preventDefault();
        to.$open(params, { keepParams });
      }}
    />
  );
}

type T = keyof {};
