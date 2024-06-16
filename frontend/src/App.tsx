// Third party
import { Outlet } from "react-router-dom";
// Context
import { BreakpointContextProvider } from "./providers/context/BreakpointContext";

export function App() {
  return (
    <BreakpointContextProvider>
      <Outlet />
    </BreakpointContextProvider>
  );
}
