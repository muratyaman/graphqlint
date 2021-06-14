import { readFileSync } from 'fs';
import { basename, resolve } from 'path';
import glob from 'glob';

export function loadFiles(pattern: string, cwd: string): Record<string, string> {
  const files: Record<string, string> = {};

  const items = glob.sync(pattern, { cwd });
  for (const it of items) {
    const name = basename(it);
    files[name] = readFileSync(resolve(cwd, it)).toString();
  }

  return files;
}
