import { lazy } from "react";

export function lazyImport(importPath: string, namedExport: string) {
  return {
    [namedExport]: lazy(() =>
      import(importPath).then((module) => ({
        default: module[namedExport],
      }))
    ),
  };
}
