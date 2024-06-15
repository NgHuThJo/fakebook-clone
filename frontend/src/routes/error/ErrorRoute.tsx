// Third party
import { Link } from "react-router-dom";
// Styles
import styles from "./ErrorRoute.module.css";

export function ErrorRoute({
  ...restProps
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={styles.default} {...restProps}>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/" replace aria-label="Go to home">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}
