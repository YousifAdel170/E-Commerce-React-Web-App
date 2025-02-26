import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CONFIRMATION_PASSWORD_TYPE,
  EGYPT_NUMBERS_ONLY,
  EMAIL_ALREADY_USED,
  EMAIL_TYPE,
  ERROR,
  NAME_TYPE,
  PASSWORD_TYPE,
  PASSWORD_VALIDATION,
  PHONE_TYPE,
  SUCCESS,
} from "../../config";

import notify from "../../hooks/Utility/useNotifyHook";
import { createNewUser } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const RegisterHook = () => {
  // Use Dispatch to tell that u will use actions from redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [loading, setLoading] = useState(true);

  //   Function To handle the change of the input
  const onChangeInput = (e, type) => {
    switch (type) {
      case NAME_TYPE:
        setName(e.target.value);
        break;
      case EMAIL_TYPE:
        setEmail(e.target.value);
        break;
      case PHONE_TYPE:
        setPhone(e.target.value);
        break;
      case PASSWORD_TYPE:
        setPassword(e.target.value);
        break;
      case CONFIRMATION_PASSWORD_TYPE:
        setConfirmationPassword(e.target.value);
        break;
      default:
    }
  };

  //   Function To Validate Inputs Before Submit
  const validateInputs = () => {
    // Validate Username
    if (name === "") {
      notify("من فضلك ادخل اسم المستخدم", ERROR);
      return;
    }

    // Validate Email Address
    if (email === "") {
      notify("من فضلك ادخل  البريد الالكتروني", ERROR);
      return;
    } else {
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        notify("من فضلك ادخل  البريد الالكتروني صحيح", "error");
        return;
      }
    }

    // Validate Phone Number
    if (phone.length <= 10) {
      notify("من فضلك ادخل رقم هاتف صحيح", ERROR);
      return;
    }

    // Validate Password
    if (password === "") {
      notify("من فضلك ادخل  كلمة مرور", ERROR);
      return;
    } else {
      if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        notify("من فضلك ادخل  كلمة مرور قوية", ERROR);
        return;
      }
    }

    // Validate Password Confirmation
    if (confirmationPassword !== password) {
      notify("من فضلك تأكد من  كلمة المرور", ERROR);
      return;
    }
  };

  const result = useSelector((state) => state.authReducer.createUser);

  //   Function To Submit the Data [Register New User]
  const handleSubmit = async () => {
    // Validate Inputs Before Submit
    validateInputs();

    // Start The Registartion [Loading ON] &  Dispatch the action To Create New User
    setLoading(true);
    await dispatch(
      createNewUser({
        name,
        email,
        password,
        passwordConfirm: confirmationPassword,
        phone,
      })
    );
    setLoading(false);
    // End The Registartion [Loading OFF]
  };

  // Render every time the loading state changes
  useEffect(() => {
    // Check if the Registeration End
    if (!loading) {
      if (result) {
        console.log(result);

        // Set The Token In the Local Storage [To Get The User Data]
        if (result.data && result.data.token) {
          // Set The Token when the user has been registered
          localStorage.setItem("token", result.data.token);

          // Notification For Success
          notify("تم تسجيل الحساب بنجاح", SUCCESS);

          // Navigate to Login Page
          setTimeout(() => navigate("/login"), 2000);
        }

        if (result.data && result.data.errors) {
          if (result.data.errors[0].msg === EMAIL_ALREADY_USED)
            notify("هذا الايميل مسجل من قبل", ERROR);
          else if (result.data.errors[0].msg === EGYPT_NUMBERS_ONLY)
            notify("يجب ان يكون الرقم مصري مكون من 11 رقم", ERROR);
          else if (result.data.errors[0].msg === PASSWORD_VALIDATION)
            notify("يجب ان لاقل كلمه السر عن 6 احرف او ارقام", ERROR);
        }
      }
    }
  }, [loading, navigate, result]);

  return [
    name,
    email,
    phone,
    password,
    confirmationPassword,
    onChangeInput,
    handleSubmit,
  ];
};

export default RegisterHook;
