import { Styles } from "@/utils/className";

export type ObjectKey = string | number | symbol;

export type ClassName = {
  className?: string | Styles;
};

export type Overwrite<Base, Overrides> = Omit<Base, keyof Overrides> &
  Overrides;
