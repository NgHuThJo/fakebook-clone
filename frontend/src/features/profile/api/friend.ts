import { apiClient, ApiClient } from "@/lib/apiClient";

export const getFriends = (apiClient: ApiClient) =>
  apiClient.get("/profile/friends");

export const sendFriendRequest = (
  apiClient: ApiClient,
  data: {
    receiverId: string;
  }
) => apiClient.post("/profile/friends", data);

export const acceptFriendRequest = (
  apiClient: ApiClient,
  data: {
    senderId: string;
  }
) => apiClient.post("/profile/friends/accept", data);
