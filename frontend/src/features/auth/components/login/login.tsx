// Third party
import {
  Form,
  Link,
  json,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
// Custom hooks
import { useDisclosure } from "@/hooks/useDisclosure";
// Api
import { loginUser } from "../../api/login";
// Utility
import { convertFormDataToObject } from "@/utils/object";
import { handleError } from "@/utils/error";
// Types
import { ApiClient, apiClient } from "@/lib/apiClient";
import { AuthErrors } from "../../routes/auth-route";
// Styles
import styles from "./login.module.css";
import { Signup } from "../signup/signup";

export const loginAction = async (formData: FormData, apiClient: ApiClient) => {
  const formObject = convertFormDataToObject(formData);

  const response = await loginUser(apiClient, formObject);

  // request errors
  if (response.email || response.general || response.password) {
    return json({ login: response });
  }

  return redirect("/profile");
};

export function Login() {
  const { isOpen, close, toggle } = useDisclosure();
  const action = useActionData() as AuthErrors;
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      const response = await apiClient.post("/login", {
        role: "GUEST",
      });

      console.log(response.message);

      if (!response?.message) {
        throw new Error("Guest login failed");
      }

      navigate("/profile");
    } catch (error) {
      handleError(
        error as Error,
        "Login",
        "Guest login failed. Please try again."
      );
    }
  };

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
            {action?.login?.email && <p>{action?.login.email}</p>}
            <input type="password" name="password" placeholder="Password" />
            {action?.login?.password && <p>{action?.login.password}</p>}
            <button type="submit" name="intent" value="login">
              Log In
            </button>
            {action?.login?.general && <p>{action?.login.general}</p>}
          </Form>
          <Link to="/">Forgot Password?</Link>
          <div className={styles.divider}></div>
          <button onClick={toggle}>Create new account</button>
        </div>
        <p>
          <Link to="/">Create a Page</Link> for a celebrity, brand or business.
        </p>
        <p>
          <button className={styles["guest-button"]} onClick={handleGuestLogin}>
            Or continue as guest.
          </button>
        </p>
      </div>
      {isOpen && <Signup close={close} />}
    </div>
  );
}
