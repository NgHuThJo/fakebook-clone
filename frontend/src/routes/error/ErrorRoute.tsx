// Third party
import { Link, useRouteError } from "react-router-dom";
// Styles
import styles from "./ErrorRoute.module.css";

export function ErrorRoute({
  ...restProps
}: React.ComponentPropsWithoutRef<"div">) {
  const error = useRouteError();

  console.error(error);

  return (
    <div className={styles.default} {...restProps}>
      <h1>Something went wrong.</h1>
      <p>{(error as Error).message}</p>
      <Link to="/" replace aria-label="Go to home">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}
