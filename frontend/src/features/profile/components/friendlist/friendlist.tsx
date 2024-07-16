import { apiClient, ApiClient } from "@/lib/apiClient";
import { acceptFriendRequest, getFriends } from "../../api/friend";
import { useLoaderData } from "react-router-dom";
import styles from "./friendlist.module.css";

type Friend = {
  status: "pending" | "accepted";
  friends: {
    _id: string;
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

    alert(response.message);
  };

  return (
    <main>
      {friendlist.map((item: Friend, ulIndex: number) => (
        <ul className={styles.friend} key={ulIndex}>
          <p>{item.status}</p>
          {item.friends.map((friend, liIndex) => (
            <li key={liIndex}>
              <img src={friend.avatarUrl} alt="" />
              <p>{friend.username}</p>
              {item.status === "pending" && (
                <button onClick={() => handleAccept(friend._id)}>
                  Accept Friend Request
                </button>
              )}
            </li>
          ))}
        </ul>
      ))}
    </main>
  );
}
