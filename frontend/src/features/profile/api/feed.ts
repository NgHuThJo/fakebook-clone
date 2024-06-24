import { ApiClient } from "@/lib/apiClient";

export const getFeeds = (apiClient: ApiClient) =>
  apiClient.get("/profile/feeds");
