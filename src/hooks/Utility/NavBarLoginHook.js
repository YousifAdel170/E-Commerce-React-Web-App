import { useEffect, useState } from "react";

export const NavBarLoginHook = () => {
  // Get The User After Logged in
  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user") !== null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  // Function Responsible to Log out [Remove User from Local Storage]
  const logOut = () => localStorage.removeItem("user");

  return [user, logOut];
};
