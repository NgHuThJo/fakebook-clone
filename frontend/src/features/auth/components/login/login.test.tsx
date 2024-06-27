import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "@/test/server";
import { http, HttpResponse } from "msw";
import { routesConfig } from "@/routes";
import { generateUser } from "@/test/data-generator";

const newUser = generateUser();

describe("login", () => {
  it("should login new user, set JWT token in cookie and navigate the user to the app", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routesConfig);

    render(<RouterProvider router={router} />);

    const emailInput = await screen.findByPlaceholderText("Email");
    user.type(emailInput, newUser.email);
    const passwordInput = screen.getByPlaceholderText("Password");
    user.type(passwordInput, newUser.password);

    await waitFor(async () => {
      const loginButton = screen.getByRole("button", { name: /log in/i });
      await user.click(loginButton);
    });

    expect(await screen.findByRole("navigation")).toBeInTheDocument();
  });

  it("should show error message after typing invalid input", async () => {
    server.use(
      http.post("/api/login", () => {
        return HttpResponse.json({
          email: "Wrong email.",
          password: "Wrong password.",
        });
      })
    );

    const user = userEvent.setup();
    const router = createMemoryRouter(routesConfig);

    render(<RouterProvider router={router} />);

    const emailInput = await screen.findByPlaceholderText("Email");
    user.type(emailInput, "wrong@emailaddress.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    user.type(passwordInput, "wrongpassword");

    await waitFor(
      async () => {
        const loginButton = screen.getByRole("button", { name: /log in/i });
        await user.click(loginButton);
      },
      { timeout: 100 }
    );

    expect(screen.getByText(/wrong email./i)).toBeInTheDocument();
    expect(screen.getByText(/wrong password./i)).toBeInTheDocument();
  });
});
