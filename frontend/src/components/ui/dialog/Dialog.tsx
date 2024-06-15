// Third party
import { forwardRef } from "react";
// Utility
import { resolveClassName } from "@/utils/className";
// Types
import { ClassName, Overwrite } from "@/types";
// Styles
import styles from "./Dialog.module.css";

type DialogProps = Overwrite<React.ComponentPropsWithRef<"dialog">, ClassName>;

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (props, ref) => (
    <dialog className={resolveClassName(props.className, styles)} ref={ref}>
      {props.children}
    </dialog>
  )
);
Dialog.displayName = "Dialog";
