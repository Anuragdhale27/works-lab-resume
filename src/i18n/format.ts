export type FormatVars = Record<string, string | number>;

/** Replaces `{name}` placeholders. Unknown placeholders are left as written. */
export function format(template: string, vars?: FormatVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : whole,
  );
}
