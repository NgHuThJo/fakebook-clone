import { ApiClient } from "@/lib/apiClient";
import { getFriends } from "../../api/friend";

export const friendlistLoader = (apiClient: ApiClient) => async () => {
  const friendlist = await getFriends(apiClient);

  return friendlist;
};

export function Friendlist() {
  return <></>;
}
