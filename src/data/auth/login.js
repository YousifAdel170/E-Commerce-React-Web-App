// Import Used Constants
import { EMAIL_TYPE, PASSWORD_TYPE } from "../../constants/inputTypes";

export const loginData = (email, password) => [
  // Email Input
  {
    value: email,
    onChangeInputType: EMAIL_TYPE,
    placeholder: {
      ar: "البريد الالكتروني  ...",
      "en-US": "Email ...",
    },
    type: "email",
    className: "my-3",
    required: true,
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
    className: "",
    required: true,
  },
];
