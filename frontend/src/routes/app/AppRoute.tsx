// Third party
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
// Components
import { Image } from "@/components/ui/image";
import { Navigation } from "@/components/ui/navigation";
import { Spinner } from "@/components/ui/spinner/Spinner";
// Styles
import styles from "./AppRoute.module.css";
// Assets
import {
  icon_nav_bookmark,
  icon_nav_home,
  icon_nav_movies,
  icon_nav_tv_series,
  logo,
  user,
} from "@/assets/images/icons";

export function AppRoute() {
  return (
    <div className={styles.container}>
      <header>
        <Navigation className="container">
          <Link to="/" aria-label="Go to home">
            <Image src={logo} />
          </Link>
          <Link to="/" aria-label="Go to home">
            <Image src={icon_nav_home} />
          </Link>
          <Link to="/movies" aria-label="Go to movies">
            <Image src={icon_nav_movies} />
          </Link>
          <Link to="/tv" aria-label="Go to tv series">
            <Image src={icon_nav_tv_series} />
          </Link>
          <Link to="/bookmark" aria-label="Go to bookmarks">
            <Image src={icon_nav_bookmark} />
          </Link>
          <Link to="/" aria-label="Go to to">
            <Image src={user} />
          </Link>
        </Navigation>
      </header>
      <main className="macro-grid">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
