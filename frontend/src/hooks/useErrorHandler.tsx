import { useState } from "react";

export function useErrorHandler() {
  const [error, setError] = useState<Error>();

  if (error) {
    throw error;
  }

  return { error, setError };
}
