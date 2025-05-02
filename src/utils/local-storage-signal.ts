import { sig, type Signal } from "@ncpa0cpl/vanilla-jsx/signals";

export function localStorageSig<T>(name: string, initialValue: T): Signal<T> {
  const storedValue = localStorage.getItem(name);
  const s = sig(storedValue ? JSON.parse(storedValue) as T : initialValue);

  s.add(value => {
    localStorage.setItem(name, JSON.stringify(value));
  });

  return s;
}
