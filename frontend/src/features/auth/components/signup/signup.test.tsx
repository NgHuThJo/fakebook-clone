import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { routesConfig } from "@/routes";

describe("signup", () => {
  it("should click signup button, open signup dialog, fill out signup form, submit it, show success message and close dialog", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routesConfig);

    render(<RouterProvider router={router} />);

    const accountButton = await screen.findByRole("button", {
      name: /create new account/i,
    });

    user.click(accountButton);

    expect(await screen.findByLabelText("dialog")).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /sign up/i });

    user.click(submitButton);

    expect(await screen.findByText(/success/i)).toBeInTheDocument();

    const exitButton = screen.getByLabelText("exit-button");

    user.click(exitButton);

    await waitFor(() => {
      expect(screen.queryByLabelText("dialog")).toBeNull();
    });
  });
});
