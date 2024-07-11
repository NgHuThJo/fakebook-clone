import { ApiClient } from "@/lib/apiClient";
import { getFriends } from "../../api/friend";
import { useLoaderData } from "react-router-dom";

export const friendlistLoader = (apiClient: ApiClient) => async () => {
  const friendlist = await getFriends(apiClient);

  return friendlist;
};

export function Friendlist() {
  const loaderData = useLoaderData();

  console.log(loaderData);

  return <main></main>;
}
