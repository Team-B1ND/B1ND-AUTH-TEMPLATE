import { readdirSync } from "fs";

export function isFolderEmpty(path: string): boolean {
  return readdirSync(path).length === 0;
}
