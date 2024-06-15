import { Login } from "../components/login/login";
import styles from "./auth-route.module.css";

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
