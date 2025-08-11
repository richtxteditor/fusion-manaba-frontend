import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  // The useRouteError() hook returns a value of type 'unknown'.
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;

  // isRouteErrorResponse is a helper function from react-router-dom
  // that checks if the error is a specific type of error object.
  if (isRouteErrorResponse(error)) {
    // For router errors (e.g., 404 Not Found), it has status and statusText
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    // For standard JavaScript errors, it has a message property
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    // If the error is just a string
    errorMessage = error;
  } else {
    // A final fallback for other unknown error types
    errorMessage = 'An unknown error occurred';
  }

  return (
    <div id="error-page" className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="my-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}