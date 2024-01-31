import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Header from '../components/Header';


const ErrorPage = () => {
  const error = useRouteError()
  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource or page.';
    }
  }

  return (
    <>
      <Header />
      <div className="mt-10">
        <h1 className="text-4xl text-violet-500">{title}</h1>
        <p className="text-violet-500">{message}</p>
      </div>
    </>
  );
}

export default ErrorPage;
