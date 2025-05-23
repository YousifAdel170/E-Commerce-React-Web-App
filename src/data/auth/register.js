// Import Used Constants
import {
  CONFIRMATION_PASSWORD_TYPE,
  EMAIL_TYPE,
  NAME_TYPE,
  PASSWORD_TYPE,
  PHONE_TYPE,
} from "../../constants/inputTypes";

export const registerData = (
  name,
  email,
  phone,
  password,
  confirmationPassword,
  errors
) => [
  // Name Input
  {
    value: name,
    onChangeInputType: NAME_TYPE,
    placeholder: {
      ar: "اسم المستخدم ...",
      "en-US": "Username ...",
    },
    type: "text",
    className: "mt-3",
    required: true,
    error: errors?.name || "",
  },

  // Email Input
  {
    value: email,
    onChangeInputType: EMAIL_TYPE,
    placeholder: {
      ar: "البريد الالكتروني  ...",
      "en-US": "Email ...",
    },
    type: "email",
    className: "mt-3",
    required: true,
    error: errors?.email || "",
  },

  // Phone Input
  {
    value: phone,
    onChangeInputType: PHONE_TYPE,
    placeholder: {
      ar: "... رقم الهاتف",
      "en-US": "Phone Number ...",
    },
    type: "tel",
    className: "mt-3",
    error: errors?.phone || "",
  },

  // Password Input
  {
    value: password,
    onChangeInputType: PASSWORD_TYPE,
    placeholder: {
      ar: "كلمة المرور ...",
      "en-US": "Password ...",
    },
    type: "password",
    className: "my-3",
    required: true,
    error: errors?.password || "",
  },

  // Confirmation Password Input
  {
    value: confirmationPassword,
    onChangeInputType: CONFIRMATION_PASSWORD_TYPE,
    placeholder: {
      ar: " تأكيد كلمة المرور ...",
      "en-US": "Confirmation Password ...",
    },
    type: "password",
    className: "",
    required: false,
    error: errors?.confirmationPassword || "",
  },
];
