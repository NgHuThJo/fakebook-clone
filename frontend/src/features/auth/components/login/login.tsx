// Third party
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
// Api
import { loginUser } from "../../api/login";
// Utility
import { convertFormDataToObject } from "@/utils/object";
// Types
import { ApiClient } from "@/lib/apiClient";
// Styles
import styles from "./login.module.css";

type LoginError = {
  email: string;
  general: string;
  password: string;
};

export const loginAction =
  (apiClient: ApiClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const formObject = convertFormDataToObject(formData);

    const response = await loginUser(apiClient, formObject);

    // request errors
    if (response.email || response.general || response.password) {
      return response;
    }

    return redirect("/profile");
  };

export function Login() {
  const errors = useActionData() as LoginError;

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.logo}>fakebook</h1>
        <p>Connect with friends and the world around you on Fakebook.</p>
      </div>
      <div>
        <div className={styles["form-container"]}>
          <Form method="post">
            <input
              type="email"
              name="email"
              placeholder="Email"
              formNoValidate
            />
            {errors?.email && <p>{errors.email}</p>}
            <input type="password" name="password" placeholder="Password" />
            {errors?.password && <p>{errors.password}</p>}
            <button type="submit">Log In</button>
            {errors?.general && <p>{errors.general}</p>}
          </Form>
          <Link to="/">Forgot Password?</Link>
          <div className={styles.divider}></div>
          <Link to="/">Create new account</Link>
        </div>
        <p>
          <Link to="/">Create a Page</Link> for a celebrity, brand or business.
        </p>
        <p>
          <Link to="/profile">Or continue as guest.</Link>
        </p>
      </div>
    </div>
  );
}
