import { ApiClient } from "@/lib/apiClient";

export const signupUser = (
  apiClient: ApiClient,
  formData: Record<string, FormDataEntryValue | FormDataEntryValue[]>
) => apiClient.post("/signup", formData);
