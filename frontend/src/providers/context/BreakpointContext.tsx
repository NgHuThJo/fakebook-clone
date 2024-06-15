// Thiry party
import { createContext, useContext, useMemo } from "react";

type Breakpoint = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";

const breakpoints: Record<Breakpoint, string> = {
  xxs: "320px",
  xs: "480px",
  s: "768px",
  m: "1024px",
  l: "1200px",
  xl: "1440px",
  xxl: "1920px",
};

const BreakpointContext =
  createContext<Record<Breakpoint, string>>(breakpoints);

export const useBreakpointContext = () => {
  return useContext(BreakpointContext);
};

export function BreakpointContextProvider({
  children,
}: React.PropsWithChildren) {
  const contextValue = useMemo(() => breakpoints, []);

  return (
    <BreakpointContext.Provider value={contextValue}>
      {children}
    </BreakpointContext.Provider>
  );
}
