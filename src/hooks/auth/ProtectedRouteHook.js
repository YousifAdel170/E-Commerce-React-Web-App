import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectedRouteHook = () => {
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        setIsUser(true);
        setIsAdmin(false);
      } else if (user.role === "admin") {
        setIsAdmin(true);
        setIsUser(false);
      }
    } else {
      setIsAdmin(false);
      setIsUser(false);
    }

    setIsLoading(false);
  }, [user]);

  return [isUser, isAdmin, isLoading];
};

export default ProtectedRouteHook;
