import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong.";

  if (error.status === 500) {
    message = JSON.parse(error.data);
  }

  if (error.status === 404) {
    title = "Page not found";
    message = "The page you are looking for does not exist.";
  }

  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
}
