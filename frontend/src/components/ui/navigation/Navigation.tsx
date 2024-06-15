// Utility
import { resolveClassName } from "@/utils/className";
// Types
import { ClassName, Overwrite } from "@/types";
// Styles
import styles from "./Navigation.module.css";

type NavProps = Overwrite<React.ComponentPropsWithoutRef<"nav">, ClassName>;

export function Navigation({ children, className, ...restProps }: NavProps) {
  return (
    <nav className={resolveClassName(className, styles)} {...restProps}>
      {children}
    </nav>
  );
}
