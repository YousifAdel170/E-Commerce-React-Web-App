// Import Used Constants
import { EMAIL_TYPE, PASSWORD_TYPE } from "../../constants/inputTypes";

export const loginData = (email, password) => ({
  title: {
    ar: "تسجيل الدخول",
    "en-US": "Login",
  },

  inputs: [
    {
      name: "email",
      type: EMAIL_TYPE,
      value: email,
      required: true,
      label: {
        ar: "البريد الإلكتروني",
        "en-US": "Email",
      },
    },
    {
      name: "password",
      type: PASSWORD_TYPE,
      value: password,
      required: true,
      label: {
        ar: "كلمة المرور",
        "en-US": "Password",
      },
    },
  ],
});
