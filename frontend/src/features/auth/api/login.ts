import { ApiClient } from "@/lib/apiClient";

export const loginUser = (
  apiClient: ApiClient,
  formData: Record<string, FormDataEntryValue | FormDataEntryValue[]>
) => apiClient.post("/login", formData);
