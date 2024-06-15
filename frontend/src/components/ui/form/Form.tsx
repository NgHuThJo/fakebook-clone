// Third party
import { Fragment, useState } from "react";
// Utility
import { resolveClassName } from "@/utils/className";
// Types
import { ComponentBaseProps, GenericObject } from "@/types";
// Styles
import styles from "./Form.module.css";

type FormProps = ComponentBaseProps & {
  fields: GenericObject[];
  onSubmit(
    event: React.FormEvent<HTMLFormElement>,
    formData: GenericObject,
    setError?: React.Dispatch<React.SetStateAction<Boolean>>
  ): void;
};

export function Form({
  children,
  className,
  fields,
  onSubmit,
  ...restProps
}: FormProps) {
  const [error, setError] = useState<Boolean>(false);
  const [formData, setFormData] = useState<GenericObject>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      className={resolveClassName(className, styles)}
      onSubmit={(event) => onSubmit(event, formData, setError)}
      {...restProps}
    >
      {fields.map((field, index) => {
        const { errorMessage, label, ...restProperties } = field;

        return (
          <Fragment key={index}>
            {label && <label htmlFor={field.id}>{label}</label>}
            <input onChange={handleInputChange} {...restProperties} />
            {error && <p className={styles.error}>{errorMessage}</p>}
          </Fragment>
        );
      })}
      {children}
    </form>
  );
}
