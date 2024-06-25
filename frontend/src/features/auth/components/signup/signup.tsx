import { FormEvent } from "react";
import { Form, json, useActionData, useSubmit } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ApiClient } from "@/lib/apiClient";
import { AuthErrors } from "../../routes/auth-route";
import { convertFormDataToObject } from "@/utils/object";
import { signupUser } from "../../api/signup";
import styles from "./signup.module.css";
import { exit_icon } from "@/assets/images/icons";

type SignupProps = {
  close: () => void;
};

export const signupAction = async (
  formData: FormData,
  apiClient: ApiClient
) => {
  const formObject = convertFormDataToObject(formData);

  const response = await signupUser(apiClient, formObject);

  return json({ signup: response });
};

export function Signup({ close }: SignupProps) {
  const action = useActionData() as AuthErrors;
  const submit = useSubmit();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    submit(event.currentTarget.form);
  };

  return (
    <div className={styles.dialog}>
      <div className={styles.grid}>
        <h2>Sign up</h2>
        <p>It's quick and easy.</p>
        <div className={styles.divider}></div>
        <Form className={styles.form} method="post" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" />
          {action?.signup?.username && <p>{action.signup.username}</p>}
          <input type="email" name="email" placeholder="Email" />
          {action?.signup?.email && <p>{action.signup.email}</p>}
          <input type="password" name="password" placeholder="Password" />
          {action?.signup?.password && <p>{action.signup.password}</p>}
          <button type="submit" name="intent" value="signup">
            Sign up
          </button>
          {action?.signup?.general && <p>{action?.signup.general}</p>}
          {action?.signup?.message && <p>{action?.signup.message}</p>}
        </Form>
        <button onClick={close}>
          <Image className="icon" src={exit_icon}></Image>
        </button>
      </div>
    </div>
  );
}
