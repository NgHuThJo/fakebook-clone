async function fetchWrapper(endpoint: string, options?: Record<string, any>) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      credentials: "include",
      mode: "cors",
      ...options,
    });

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.log((error as Error).message);
  }
}

export type ApiClient = {
  get: (endpoint: string, overrides?: Record<string, any>) => Promise<any>;
  delete: (endpoint: string, overrides?: Record<string, any>) => Promise<any>;
  post: (
    endpoint: string,
    data: Record<string, any>,
    overrides?: Record<string, any>
  ) => Promise<any>;
  put: (
    endpoint: string,
    data: Record<string, any>,
    overrides?: Record<string, any>
  ) => Promise<any>;
};

export const apiClient: ApiClient = {
  get: (endpoint: string, overrides?: Record<string, any>) =>
    fetchWrapper(endpoint, overrides),
  delete: (endpoint: string, overrides?: Record<string, any>) =>
    fetchWrapper(endpoint, {
      method: "DELETE",
      ...overrides,
    }),
  post: (
    endpoint: string,
    data: Record<string, any>,
    overrides?: Record<string, any>
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
    data: Record<string, any>,
    overrides?: Record<string, any>
  ) =>
    fetchWrapper(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...overrides,
    }),
};
