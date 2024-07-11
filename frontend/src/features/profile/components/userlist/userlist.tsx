import { Image } from "@/components/ui/image";
import { apiClient } from "@/lib/apiClient";
import { sendFriendRequest } from "../../api/friend";
import styles from "./userlist.module.css";

type UserData = {
  avatarUrl: string;
  email: string;
  username: string;
  _id: string;
};

type UserlistProps = React.PropsWithoutRef<{ userData: UserData[] }>;

export function Userlist({ userData }: UserlistProps) {
  const handleClick = async (receiverId: string) => {
    try {
      const response = await sendFriendRequest(apiClient, {
        receiverId,
      });

      console.log(response);

      alert(response.message);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  return (
    <ul aria-label="userlist">
      {userData.map((user, index) => (
        <li className={styles.listitem} key={index}>
          <Image className="icon" src={user.avatarUrl}></Image>
          <button onClick={() => handleClick(user._id)}>{user.username}</button>
        </li>
      ))}
    </ul>
  );
}
