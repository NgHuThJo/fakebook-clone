import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { routesConfig } from "@/routes";

describe("signup", () => {
  it("should fill out signup form, submit it and close the form", () => {
    const router = createMemoryRouter(routesConfig);

    render(<RouterProvider router={router} />);

    expect(true).toBeFalsy();
  });
});
