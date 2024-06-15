import { hasWhiteSpaces } from "./string";

type ModuleStyles = {
  module: string[];
  global?: string[];
};

type GlobalStyles = {
  module?: string[];
  global: string[];
};

export type Styles = ModuleStyles | GlobalStyles;

export function resolveClassName(
  classes: Styles | string | undefined,
  styles: Record<string, string>
) {
  if (!classes) {
    return;
  }

  if (typeof classes === "string") {
    return styles[classes] || classes;
  }

  const resolveModuleStyles = (moduleClasses: string[]) =>
    Array.from(new Set(moduleClasses))
      .filter((className) => {
        if (hasWhiteSpaces(className)) {
          throw new Error(
            `CSS module class "${className}" contains whitespace character`
          );
        }

        if (!styles[className]) {
          throw new ReferenceError(
            `CSS module class "${className}" is not defined`
          );
        }

        return true;
      })
      .map((className) => styles[className]);

  const resolveGlobalStyles = (globalClasses: string[]) =>
    Array.from(new Set(globalClasses)).filter((className) => {
      if (hasWhiteSpaces(className)) {
        throw new Error(
          `Global class "${className}" contains whitespace character`
        );
      }
      return true;
    });

  try {
    const moduleStyles = classes.module
      ? resolveModuleStyles(classes.module)
      : [];
    const globalStyles = classes.global
      ? resolveGlobalStyles(classes.global)
      : [];

    return [...moduleStyles, ...globalStyles].join(" ");
  } catch (error) {
    console.error((error as Error).message);
  }
}
