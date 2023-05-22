import { Navigate } from "react-router-dom";

function ProtectedRouteElement({ component: Component, ...props }) {
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" />;
}

export default ProtectedRouteElement;
