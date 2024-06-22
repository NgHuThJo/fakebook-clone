import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { routesConfig } from "@/routes";

describe("userlist", () => {
  it("should render list of users", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/profile"],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("listitem")).toBeInTheDocument();
  });
});
