import { NameCaseType } from './types';

export const NAME_CASES: Record<NameCaseType, string> = {
  'camelCase': '^[a-z][A-Za-z0-9]+$',
  'lower_case': '^[a-z][a-z0-9_]+$',
  'PascalCase': '^[A-Z][A-Za-z0-9]+$',
  'UPPER_CASE': '^[A-Z][A-Z0-9_]$',
};

export function checkName(name: string, casing: NameCaseType): boolean {
  const pattern = casing in NAME_CASES ? new RegExp(NAME_CASES[casing]) : new RegExp(casing);
  return pattern.test(name);
}
