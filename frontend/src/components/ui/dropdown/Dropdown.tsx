// Third party
import { useState } from "react";
// Custom hooks
import { useDisclosure } from "@/hooks/useDisclosure";
// Utility
import { resolveClassName } from "@/utils/className";
// Styles
import styles from "./Dropdown.module.css";
// Assets
import { chevron_up_sharp } from "@/assets/images/icons";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = React.ComponentPropsWithoutRef<"input"> & {
  options: Option[];
  onSelect?: (option: Option) => void;
};

export function Dropdown({
  className = "default",
  options,
  placeholder,
  onSelect,
}: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<Option>();
  const { isOpen, close, toggle } = useDisclosure();

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    close();

    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className={resolveClassName(className, styles)}>
      <button onClick={toggle} data-dropdown-toggle>
        {selectedOption ? selectedOption.label : placeholder}
        <img src={chevron_up_sharp} alt="" />
      </button>
      {isOpen && (
        <div data-dropdown-list>
          {options.map((option, index) => (
            <button key={index} onClick={() => handleSelect(option)}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
