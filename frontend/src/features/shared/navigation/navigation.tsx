import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { SearchBar } from "@/components/ui/searchbar";
import styles from "./navigation.module.css";
import {
  add_icon,
  exit_icon,
  facebook_logo_icon,
  group_icon,
  home_icon,
  notification_icon,
  storefront_icon,
  subscription_icon,
} from "@/assets/images/icons";

type NavigationProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Navigation({ onChange }: NavigationProps) {
  return (
    <nav className={styles.facebook}>
      <div data-start>
        <Link to="/" replace>
          <Image className="icon" src={facebook_logo_icon} alt="" />
        </Link>
        <SearchBar placeholder="Search" onChange={onChange}></SearchBar>
      </div>
      <div data-center>
        <Link to="/profile" replace>
          <Image className="icon" src={home_icon}></Image>
        </Link>
        <Link to="/profile" replace>
          <Image className="icon" src={subscription_icon}></Image>
        </Link>
        <Link to="/profile" replace>
          <Image className="icon" src={storefront_icon}></Image>
        </Link>
        <Link to="/profile" replace>
          <Image className="icon" src={group_icon}></Image>
        </Link>
      </div>
      <div data-end>
        <Link to="/profile" replace>
          <Image className="icon" src={add_icon}></Image>
        </Link>
        <Link to="/profile" replace>
          <Image className="icon" src={notification_icon}></Image>
        </Link>
        <Link to="/" replace>
          <Image className="icon" src={exit_icon}></Image>
        </Link>
      </div>
    </nav>
  );
}
