// Import Hooks from React
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Custom Actions
import { getAllCartItems } from "../../redux/actions/cartAction";
import { logoutUser } from "../../redux/actions/authAction";

// Hook Responsible for managing user login state and logout functionality
export const NavBarLoginHook = () => {
  const dispatch = useDispatch();

  // 1. State to store the user data
  const user = useSelector((state) => state.authReducer.user);
  const [cartFetched, setCartFetched] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // 2. useEffect to check if the user is logged in or not
  useEffect(() => {
    const getCartItems = async () => {
      await dispatch(getAllCartItems());
      setCartFetched(true);
    };

    if (user && !cartFetched) {
      getCartItems();
    }
  }, [cartFetched, dispatch, user]);

  // 3. Function to log out the user by removing the user data and token from local storage and setting the user state to null, then redirect the user to the home page
  const logOut = async () => {
    setLoggingOut(true);
    await dispatch(logoutUser());
    setCartFetched(false);
    setLoggingOut(false);
  };

  // 4. Return the user data and logOut function to be used in the component
  return [user, logOut, loggingOut];
};
