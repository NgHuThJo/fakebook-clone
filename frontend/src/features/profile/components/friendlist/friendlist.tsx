import { apiClient, ApiClient } from "@/lib/apiClient";
import { acceptFriendRequest, getFriends } from "../../api/friend";
import { useLoaderData } from "react-router-dom";
import styles from "./friendlist.module.css";

type Friend = {
  status: "pending" | "accepted";
  friends: {
    username: string;
    email: string;
    avatarUrl: string;
  }[];
};

export const friendlistLoader = (apiClient: ApiClient) => async () => {
  const friendlist = await getFriends(apiClient);

  return { friendlist };
};

export function Friendlist() {
  const { friendlist } = useLoaderData();

  console.log("loader data friend", friendlist);

  const handleAccept = async (senderId: string) => {
    const response = await acceptFriendRequest(apiClient, { senderId });

    console.log(response);
  };

  return (
    <main>
      {friendlist.map((item: Friend) => (
        <ul className={styles.friend}>
          <p>{item.status}</p>
          {item.friends.map((friend, index) => (
            <li>
              <img src={friend.avatarUrl} alt="" />
              <p>{friend.username}</p>
              {item.status === "pending" && (
                <button>Accept Friend Request</button>
              )}
            </li>
          ))}
        </ul>
      ))}
    </main>
  );
}
