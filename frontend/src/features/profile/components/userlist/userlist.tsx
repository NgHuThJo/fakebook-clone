import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import styles from "./userlist.module.css";

type UserData = {
  avatarUrl: string;
  email: string;
  username: string;
};

type UserlistProps = React.PropsWithoutRef<{ userData: UserData[] }>;

export function Userlist({ userData }: UserlistProps) {
  return (
    <ul aria-label="userlist">
      {userData.map((user, index) => (
        <li className={styles.listitem} key={index}>
          <Image className="icon" src={user.avatarUrl}></Image>
          <Link to="/">{user.username}</Link>
        </li>
      ))}
    </ul>
  );
}
