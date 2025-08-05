// Import Used Constants
import { INPUT_NAMES, INPUT_TYPES } from "../constants/inputs";

export const inputsData = (
  name,
  email,
  password,
  confirmationPassword,
  errors,
  t
) => [
  // Name Input
  {
    name: INPUT_NAMES.NAME,
    value: name,
    type: INPUT_TYPES.NAME,
    onChangeInputName: INPUT_NAMES.NAME,
    label: t("register.name"),
    placeholder: t("register.namePlaceholder"),
    required: true,
    error: errors?.name || "",
  },

  // Email Input
  {
    name: INPUT_NAMES.EMAIL,
    value: email,
    type: INPUT_TYPES.EMAIL,
    onChangeInputName: INPUT_NAMES.EMAIL,
    label: t("register.email"),
    placeholder: t("register.emailPlaceholder"),
    required: true,
    error: errors?.email || "",
  },

  // Password Input
  {
    name: INPUT_NAMES.PASSWORD,
    value: password,
    onChangeInputName: INPUT_NAMES.PASSWORD,
    label: t("register.password"),
    placeholder: t("register.passwordPlaceholder"),
    type: INPUT_TYPES.PASSWORD,
    required: true,
    error: errors?.password || "",
  },

  // Confirmation Password Input
  {
    name: INPUT_NAMES.CONFIRM_PASSWORD,
    value: confirmationPassword,
    onChangeInputName: INPUT_NAMES.CONFIRM_PASSWORD,
    label: t("register.confirmPassword"),
    placeholder: t("register.confirmPasswordPlaceholder"),
    type: INPUT_TYPES.CONFIRM_PASSWORD,
    required: true,
    error: errors?.confirmationPassword || "",
  },
];
