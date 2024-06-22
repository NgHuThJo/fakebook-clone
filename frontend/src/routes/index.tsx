// Third party
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Routes
import { App } from "@/App";
import { ErrorRoute } from "./error/ErrorRoute";
// Loaders and actions
import { profileLoader } from "@/features/profile/routes/profile-route";
import { loginAction } from "@/features/auth/components/login/login";
// Utility
import { apiClient } from "@/lib/apiClient";

export const routesConfig = [
  {
    element: <App />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const { AuthRoute } = await import(
            "@/features/auth/routes/auth-route"
          );

          return { Component: AuthRoute };
        },
        action: loginAction(apiClient),
      },
      {
        path: "/profile",
        lazy: async () => {
          const { ProfileRoute } = await import(
            "@/features/profile/routes/profile-route"
          );

          return { Component: ProfileRoute };
        },
        loader: profileLoader(apiClient),
      },
    ],
  },
];

export function Router() {
  // Paths are case-insensitive, isSensitive prop of Route component has default value of false
  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}
