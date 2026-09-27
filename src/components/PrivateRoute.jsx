import {
  Navigate,
  useLocation,
} from "react-router";

import { authClient } from "../lib/auth-client";
import LoadingSpinner from "./LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (!session?.user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;