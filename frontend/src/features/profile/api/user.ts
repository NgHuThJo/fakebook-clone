import { ApiClient } from "@/lib/apiClient";

export const getUsers = (apiClient: ApiClient) =>
  apiClient.get("/profile/users");
