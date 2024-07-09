import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import styles from "./sidebar.module.css";
import {
  flag_icon,
  friends_icon,
  messenger_icon,
  storefront_icon,
  videos_icon,
} from "@/assets/images/icons";

const sidebarArray = [
  {
    img: flag_icon,
    to: "/",
    label: "Pages",
  },
  {
    img: friends_icon,
    to: "/friends",
    label: "Friends",
  },
  {
    img: messenger_icon,
    to: "/",
    label: "Messenger",
  },
  {
    img: storefront_icon,
    to: "/",
    label: "Marketplace",
  },
  {
    img: videos_icon,
    to: "/",
    label: "Videos",
  },
];

export function Sidebar() {
  return (
    <ul className={styles.facebook} aria-label="sidebar">
      {sidebarArray.map((item, index) => (
        <li key={index}>
          <Image className="icon" src={item.img}></Image>
          <Link to={item.to}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}
