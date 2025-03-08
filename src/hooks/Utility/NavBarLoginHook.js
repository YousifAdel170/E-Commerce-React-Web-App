import { useEffect, useState } from "react";

export const NavBarLoginHook = () => {
  // Get The User After Logged in
  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user") !== null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  // Function Responsible to Log out [Remove User, token from Local Storage] After Logged in
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
  };

  return [user, logOut];
};
