export function oget<T>(
  object: Record<string, T>,
  key: string,
  defaultValue: T,
): T {
  return key in object ? object[key] as any : defaultValue;
}
