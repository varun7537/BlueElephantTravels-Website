/**
 * Tiny class-name composer. Pass any number of strings, undefined, false, or
 * arrays; falsy values are dropped and the rest are joined with spaces.
 *
 *   cn("btn", isPrimary && "btn-primary", className)
 */
export function cn(...inputs: Array<string | undefined | null | false>): string {
  return inputs.filter(Boolean).join(" ");
}
