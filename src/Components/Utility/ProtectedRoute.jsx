/* eslint-disable react/prop-types */

// Import Navigate, Outlet from React-Router-Dom
import { Navigate, Outlet } from "react-router-dom";

// Component Responsible for protecting the routes
const ProtectedRoute = ({ auth, children }) => {
  // Check if the user is authenticated or not, if not, redirect to the login page
  if (!auth) return <Navigate to="/login" replace />;

  // If there are children components, render them, otherwise render the Outlet component
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
