// Utility
import { resolveClassName } from "@/utils/className";
// Types
import { ClassName, Overwrite } from "@/types";
// Styles
import styles from "./Button.module.css";

type ButtonProps = Overwrite<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  ClassName
>;

export function Button({
  children,
  className = "default",
  type = "button",
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={resolveClassName(className, styles)}
      type={type}
      {...restProps}
    >
      {children}
    </button>
  );
}
