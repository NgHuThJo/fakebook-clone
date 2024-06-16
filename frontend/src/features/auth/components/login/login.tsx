// Third party
import { ActionFunctionArgs, Form, Link } from "react-router-dom";
// Types
import { ApiClient } from "@/lib/apiClient";
// Styles
import styles from "./login.module.css";

export const loginAction =
  (apiClient: ApiClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    throw Error("Error inside login action");

    return new Response();
  };

export function Login() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.logo}>fakebook</h1>
        <p>Connect with friends and the world around you on Fakebook.</p>
      </div>
      <div>
        <div className={styles["form-container"]}>
          <Form method="post">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Log In</button>
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
