export function simplifyVersion(version: string): string {
  if (version.length === 40) version = version.slice(0, 8);
  if (version.length === 46) version = version.slice(0, 14);
  if (version.includes("\n")) version = version.split("\n").at(0)!;
  return version;
}
