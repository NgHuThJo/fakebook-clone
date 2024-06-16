// Third party
import { Outlet } from "react-router-dom";
// Context
import { BreakpointContextProvider } from "./providers/context/BreakpointContext";
// Components
import { ErrorBoundary } from "./features/shared/error-boundary/error-boundary";

const ErrorBoundaryFallback = (
  error: Error,
  handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void
) => {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        gap: "3rem",
        minHeight: "100svh",
        fontSize: "2.5rem",
        textAlign: "center",
      }}
    >
      <p>Something went wrong.</p>
      <p style={{ color: "red" }}>{error.toString()}</p>
      <button
        style={{
          justifySelf: "center",
          padding: "1.5rem",
          fontSize: "1.25rem",
          backgroundColor: "black",
        }}
        onClick={handleReset}
      >
        Reset ErrorBoundary
      </button>
    </div>
  );
};

export function App() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryFallback}>
      <BreakpointContextProvider>
        <Outlet />
      </BreakpointContextProvider>
    </ErrorBoundary>
  );
}
