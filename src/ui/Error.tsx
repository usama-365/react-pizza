import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {isRouteErrorResponse(error) ? (
        <p>{error.data || error.error?.message || error.statusText}</p>
      ) : (
        <p>{error.message}</p>
      )}
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}
