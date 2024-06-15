// Utility
import { resolveClassName } from "@/utils/className";
// Types
import { ClassName, Overwrite } from "@/types";
// Styles
import styles from "./Spinner.module.css";

type SpinnerProps = Overwrite<React.ComponentPropsWithoutRef<"div">, ClassName>;

export function Spinner({ className = "default", ...restProps }: SpinnerProps) {
  return (
    <div className={resolveClassName(className, styles)} {...restProps}></div>
  );
}
