import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "@/routes";

describe("profile route", () => {
  it("should render profile with its subcomponents", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/profile"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByLabelText("userlist")).toBeInTheDocument();
      expect(screen.getByLabelText("newsfeed")).toBeInTheDocument();
      expect(screen.getByLabelText("sidebar")).toBeInTheDocument();
    });
  });
});
