import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { USER_ROLES } from "../../constants/general";

/**
 * Custom hook to determine user role for route protection.
 *
 * Checks the current logged-in user's role from Redux store,
 * and sets flags for user/admin roles accordingly.
 * Also manages a loading state while role check is in progress.
 *
 * @returns {Array} - [isUser (bool), isAdmin (bool), isLoading (bool)]
 *   isUser: true if user role is 'USER'
 *   isAdmin: true if user role is 'ADMIN'
 *   isLoading: true while checking user role, false after check completes
 */
const ProtectedRouteHook = () => {
  // Local states to indicate user role and loading status
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get user object from Redux store
  const user = useSelector((state) => state.authReducer.user);

  /**
   * Effect to update role states whenever user changes.
   * Sets flags based on user.role and marks loading as complete.
   */
  useEffect(() => {
    if (user) {
      if (user.role === USER_ROLES.USER) {
        setIsUser(true);
        setIsAdmin(false);
      } else if (user.role === USER_ROLES.ADMIN) {
        setIsAdmin(true);
        setIsUser(false);
      }
    } else {
      // No user logged in, reset flags
      setIsAdmin(false);
      setIsUser(false);
    }

    // Role check done, stop loading
    setIsLoading(false);
  }, [user]);

  // Return role flags and loading status for component consumption
  return [isUser, isAdmin, isLoading];
};

export default ProtectedRouteHook;
