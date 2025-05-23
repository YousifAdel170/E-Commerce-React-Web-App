// Import hooks from react and react-redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Custom Hooks
import notify from "../Utility/useNotifyHook";

// Import Custom Actions
import { loginUser, setUser } from "../../redux/actions/authAction";
import { getAllCartItems } from "../../redux/actions/cartAction";

// Import Constants and Configurations
import { EMAIL_TYPE, PASSWORD_TYPE } from "../../constants/inputTypes";
import {
  BACKEND_ERROR_MESSAGES,
  EMAIL_INVALID_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
} from "../../constants/messagesConstants";
import { ERROR, SUCCESS, WARNING } from "../../constants/notificationTypes";

// Hook Responsible for handling user login
const LoginHook = () => {
  // useDispatch to handle actions from redux, useNavigate for navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States to store form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPress, setIsPress] = useState(false);

  //   Function To handle the change of the input
  const onChangeInput = (e, type) => {
    switch (type) {
      case EMAIL_TYPE:
        setEmail(e.target.value);
        break;
      case PASSWORD_TYPE:
        setPassword(e.target.value);
        break;
      default:
    }
  };

  //   Function To Validate Inputs Before Submit
  const validateInputs = () => {
    // Validate Email Address
    if (email === "") {
      notify(EMAIL_REQUIRED_MESSAGE, WARNING);
      return false;
    } else {
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        notify(EMAIL_INVALID_MESSAGE, WARNING);
        return false;
      }
    }
    // Validate Password
    if (password === "") {
      notify(PASSWORD_REQUIRED_MESSAGE, WARNING);
      return false;
    }

    return true; // All validations passed
  };

  //   Function To Submit the Data [Login]
  const handleSubmit = async () => {
    const fetchCartData = async () => await dispatch(getAllCartItems());

    // Validate Inputs Before Submit
    if (!validateInputs()) {
      return; // Stop the form submission if validation fails
    }

    // Start The Login [Loading ON] &  Dispatch the action To Login User
    setIsPress(true);
    await dispatch(
      loginUser({
        email,
        password,
      })
    );
    setIsPress(false);
    // End The Login [Loading OFF]

    fetchCartData();
  };

  // Selectors to get the login result, loading state, and errors from the redux store
  const result = useSelector((state) => state.authReducer.loginUser);
  const loading = useSelector((state) => state.authReducer.loading);
  const errors = useSelector((state) => state.authReducer.errors);

  useEffect(() => {
    const setUserData = async () => await dispatch(setUser(result?.data?.data));

    // Check if the Registeration End
    if (!loading) {
      // Check if there are any errors
      if (errors) {
        notify(errors?.message, ERROR); // Notify if there are errors
        return;
      }

      // Check if the user has been registered successfully
      if (result) {
        // Set The Token In the Local Storage [To Get The User Data]
        if (result.data && result.data.token) {
          // Set The Token when the user has been registered
          localStorage.setItem("token", result.data.token);

          // Set The User Data into the Local Storage when the user has been Logged in
          localStorage.setItem("user", JSON.stringify(result.data.data));

          // Set the user data in redux store
          setUserData();

          // Notification For Success
          notify(LOGIN_SUCCESS_MESSAGE, SUCCESS);

          // Navigate to Login Page
          setTimeout(() => navigate("/"), 1000);
        } else {
          // Remove the User From the Local Storage [require login again]
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          notify(BACKEND_ERROR_MESSAGES.LOGIN_WRONG, ERROR);
        }
      }
    }
  }, [loading, result, navigate, dispatch, errors]);

  return [email, password, loading, isPress, onChangeInput, handleSubmit];
};

export default LoginHook;
