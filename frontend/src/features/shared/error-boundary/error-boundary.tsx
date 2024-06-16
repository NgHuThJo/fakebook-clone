import { Component, ErrorInfo, MouseEvent, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback:
    | ReactNode
    | ((
        error: Error,
        handleReset: (event: MouseEvent<HTMLButtonElement>) => void
      ) => ReactNode);
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  handleReset() {
    this.setState({ error: null });
  }

  render() {
    if (this.state.error) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return this.props.fallback;
    }

    return this.props.children;
  }
}
