import { ObjectKey } from "@/types";

async function fetchWrapper(endpoint: string, options?: RequestInit) {
  try {
    console.log(`${import.meta.env.VITE_API_URL}${endpoint}`);

    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      credentials: "include",
      mode: "cors",
      ...options,
    });

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

export type ApiClient = {
  get: (endpoint: string, overrides?: RequestInit) => Promise<any>;
  delete: (endpoint: string, overrides?: RequestInit) => Promise<any>;
  post: (
    endpoint: string,
    data: Record<ObjectKey, any>,
    overrides?: RequestInit
  ) => Promise<any>;
  put: (
    endpoint: string,
    data: Record<ObjectKey, any>,
    overrides?: RequestInit
  ) => Promise<any>;
};

export const apiClient: ApiClient = {
  get: (endpoint: string, overrides?: RequestInit) =>
    fetchWrapper(endpoint, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      ...overrides,
    }),

  delete: (endpoint: string, overrides?: RequestInit) =>
    fetchWrapper(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      ...overrides,
    }),

  post: (
    endpoint: string,
    data: Record<ObjectKey, any>,
    overrides?: RequestInit
  ) =>
    fetchWrapper(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...overrides,
    }),

  put: (
    endpoint: string,
    data: Record<ObjectKey, any>,
    overrides?: RequestInit
  ) =>
    fetchWrapper(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...overrides,
    }),
};
