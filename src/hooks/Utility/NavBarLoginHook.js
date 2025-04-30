// Import Hooks from React
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Import Custom Actions
import { getAllCartItems } from "../../redux/actions/cartAction";

// Hook Responsible for managing user login state and logout functionality
export const NavBarLoginHook = () => {
  const dispatch = useDispatch();

  // 1. State to store the user data
  const [user, setUser] = useState("");
  const [cartFetched, setCartFetched] = useState(false);

  // 2. useEffect to check if the user is logged in or not
  useEffect(() => {
    const getCartItems = async () => await dispatch(getAllCartItems());

    const storedUser = localStorage.getItem("user");

    // Check if the user is logged in by checking the local storage, if the user is not null then set the user state to the user data from local storage
    if (storedUser !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
      if (!cartFetched) {
        getCartItems();
        setCartFetched(true);
      }
    }
  }, [cartFetched, dispatch]);

  // 3. Function to log out the user by removing the user data and token from local storage and setting the user state to null, then redirect the user to the home page
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
  };

  // 4. Return the user data and logOut function to be used in the component
  return [user, logOut];
};
