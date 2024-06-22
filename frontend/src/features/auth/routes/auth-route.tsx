// Third party
import { ActionFunctionArgs, json } from "react-router-dom";
// Components
import { Login } from "../components/login/login";
// Api
import { loginAction } from "../components/login/login";
// Types
import { ApiClient } from "@/lib/apiClient";
// Styles
import styles from "./auth-route.module.css";
import { signupAction } from "../components/signup/signup";

type AuthKey = "login" | "signup";

export type AuthErrors = {
  [K in AuthKey]: Record<string, string>;
};

export const authAction =
  (apiClient: ApiClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const intent = formData.get("intent");

    switch (intent) {
      case "login": {
        return loginAction(formData, apiClient);
      }
      case "signup": {
        return signupAction(formData, apiClient);
      }
    }

    throw json(
      {
        message: "Invalid intent.",
      },
      { status: 400 }
    );
  };

export function AuthRoute() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Login></Login>
      </main>
      <footer className={styles.footer}>
        <ul>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          tempora odit soluta mollitia id earum pariatur. Consequuntur, iure
          natus soluta odit laborum sunt at fuga inventore sapiente itaque quasi
          temporibus doloremque numquam. Praesentium, repellat! Aliquid
          delectus, distinctio voluptate deleniti necessitatibus vel officiis
          possimus! Cupiditate deserunt nihil blanditiis quaerat, laboriosam
          assumenda!
        </ul>
      </footer>
    </div>
  );
}
