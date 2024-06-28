export function handleError(
  error: Error,
  context: string,
  notification: string
) {
  console.error(`Error in ${context}:`, error.message);
  alert(notification);
}
