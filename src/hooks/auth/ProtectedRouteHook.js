import { useEffect } from "react";
import { useState } from "react";

const ProtectedRouteHook = () => {
  const [userData] = useState(JSON.parse(localStorage.getItem("user")));
  const [isUser, setIsUser] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    if (userData != null) {
      if (userData.role === "user") {
        setIsUser(true);
        setIsAdmin(false);
      } else {
        setIsUser(false);
        setIsAdmin(true);
      }
    } else {
      setIsAdmin(false);
      setIsUser(false);
    }
  }, [userData]);

  return [isUser, isAdmin];
};

export default ProtectedRouteHook;
