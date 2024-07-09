import { ApiClient } from "@/lib/apiClient";

export const getFriends = (apiClient: ApiClient) =>
  apiClient.get("/profile/friends");
