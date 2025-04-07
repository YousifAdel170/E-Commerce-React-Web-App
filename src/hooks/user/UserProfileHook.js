import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserPassword,
  updateUserProfile,
} from "../../redux/actions/authAction";
import notify from "../Utility/useNotifyHook";
import { SUCCESS, WARNING } from "../../config";

const UserProfileHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////                                     Update User Profile                                       ///////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Get user data from local storage
  const user = useMemo(() => {
    if (localStorage.getItem("user") !== null)
      return JSON.parse(localStorage.getItem("user"));
    else return [];
  }, []);

  // State variables for user profile details
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [loading, setLoading] = useState(true);

  // State for modal visibility
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); // Handler to close the modal
  const handleShow = () => setShow(true); // Handler to show the modal

  // Handlers for input changes
  const onChangeName = (e) => {
    e.persist();
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    e.persist();
    setEmail(e.target.value);
  };

  const onChangePhone = (e) => {
    e.persist();
    setPhone(e.target.value);
  };

  // Prepare the body for the update request
  const body = useMemo(() => {
    if (user.email === email) return { name, phone };
    else return { name, email, phone };
  }, [user, email, name, phone]);

  // Handle form submission for updating user profile
  const handleSubmit = async () => {
    setLoading(true);
    await dispatch(updateUserProfile(body));
    setLoading(false);
    setShow(false);
  };

  // Selector to get the result of the update user profile action
  const resultUserProfile = useSelector(
    (state) => state.authReducer.updatedUserProfile
  );

  // Notify user of the result of the update action
  useEffect(() => {
    if (!loading) {
      if (resultUserProfile && resultUserProfile.status === 200) {
        notify("تم الحديث بنجاح", SUCCESS);

        localStorage.setItem(
          "user",
          JSON.stringify(resultUserProfile.data.data.user)
        );
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
    }
  }, [loading, resultUserProfile]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////                                     Update Password                                           ///////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // State variables for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(true);

  // Handlers for password input changes
  const onChangeCurrentPassword = (e) => {
    e.persist();
    setCurrentPassword(e.target.value);
  };

  const onChangePassword = (e) => {
    e.persist();
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e) => {
    e.persist();
    setPasswordConfirm(e.target.value);
  };

  // Handle form submission for changing password
  const changePasswordSubmit = async () => {
    if (passwordConfirm !== password) {
      notify("تاكيد كلمة المرور غير متطابق", WARNING);
      return;
    }

    setLoadingPassword(true);
    await dispatch(
      updateUserPassword({
        currentPassword,
        password,
        passwordConfirm,
      })
    );
    setLoadingPassword(false);
  };

  // Selector to get the result of the update password action
  const resultUserPassword = useSelector(
    (state) => state.authReducer.updatedUserPassword
  );

  // Notify user of the result of the password change action
  useEffect(() => {
    if (!loadingPassword) {
      if (resultUserPassword && resultUserPassword.status === 200) {
        notify("تم تغير كلمة المرور بنجاح", SUCCESS);
        setTimeout(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login");
        }, 1000);
      } else notify("فشل عملية التحديث", WARNING);
    }
  }, [loadingPassword, navigate, resultUserPassword]);

  // Return state variables and handlers
  return [
    user,
    show,
    handleClose,
    handleShow,
    handleSubmit,
    name,
    email,
    phone,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    changePasswordSubmit,
    currentPassword,
    password,
    passwordConfirm,
    onChangeCurrentPassword,
    onChangePassword,
    onChangePasswordConfirm,
  ];
};

export default UserProfileHook;
