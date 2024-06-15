// Components
import { Image } from "../image";
// Utility
import { resolveClassName } from "@/utils/className";
// Types
import { ClassName, Overwrite } from "@/types";
// Styles
import styles from "./SearchBar.module.css";
// Assets
import { search_sharp } from "@/assets/images/icons";

type SearchBar = Overwrite<
  React.ComponentPropsWithoutRef<"input">,
  ClassName
> & {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchBar({
  className = "default",
  placeholder,
  onChange,
}: SearchBar) {
  return (
    <div className={resolveClassName(className, styles)}>
      <Image className="icon" src={search_sharp} />
      <input
        type="search"
        id="search"
        name="search"
        placeholder={placeholder}
        onChange={onChange}
        data-input
      />
      <span data-underline></span>
    </div>
  );
}
