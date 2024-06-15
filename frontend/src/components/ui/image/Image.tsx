// Utility
import { resolveClassName } from "@/utils/className";
// Styles
import styles from "./Image.module.css";

export function Image({
  src,
  alt = "",
  className,
  ...restProps
}: React.ComponentPropsWithoutRef<"img">) {
  return (
    <img
      className={resolveClassName(className, styles)}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...restProps}
    />
  );
}
