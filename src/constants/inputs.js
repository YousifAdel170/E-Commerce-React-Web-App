// Names of Inputs
const INPUT_NAME = "name";
const INPUT_EMAIL = "email";
const INPUT_PHONE = "phone";
const INPUT_PASSWORD = "password";
const INPUT_CONFIRM_PASSWORD = "confirmationPassword";
const INPUT_USERNAME = "username";
const INPUT_SEARCH = "searched value";
const INPUT_CURRENT_PASSWORD = "currentPassword";
const INPUT_NEW_PASSWORD = "newPassword";
const INPUT_CONFIRM_NEW_PASSWORD = "confirmNewPassword";
const INPUT_ADDRESS_ALIAS = "address_alias";
const INPUT_ADDRESS_DETAILS = "address_details";
const INPUT_ADDRESS_PHONE = "address_phone";

export const INPUT_NAMES = {
  NAME: INPUT_NAME,
  EMAIL: INPUT_EMAIL,
  PHONE: INPUT_PHONE,
  PASSWORD: INPUT_PASSWORD,
  CONFIRM_PASSWORD: INPUT_CONFIRM_PASSWORD,
  USERNAME: INPUT_USERNAME,
  SEARCH: INPUT_SEARCH,
  CURRENT_PASSWORD: INPUT_CURRENT_PASSWORD,
  NEW_PASSWORD: INPUT_NEW_PASSWORD,
  CONFIRM_NEW_PASSWORD: INPUT_CONFIRM_NEW_PASSWORD,
  ADDRESSES: {
    ALIAS: INPUT_ADDRESS_ALIAS,
    DETAILS: INPUT_ADDRESS_DETAILS,
    PHONE: INPUT_ADDRESS_PHONE,
  },
};

// Types of Inputs
const NAME_TYPE = "name";
const EMAIL_TYPE = "email";
const PASSWORD_TYPE = "password";
const CONFIRMATION_PASSWORD_TYPE = "password";
const PHONE_TYPE = "tel";
const TEXT_TYPE = "text";
const NUMBER_TYPE = "number";
const DATE_TYPE = "date";
const TIME_TYPE = "time";
const FILE_TYPE = "file";
const SELECT_TYPE = "select";
const CHECKBOX_TYPE = "checkbox";
const RADIO_TYPE = "radio";
const TEXTAREA_TYPE = "textarea";
const HIDDEN_TYPE = "hidden";
const BUTTON_TYPE = "button";
const SUBMIT_TYPE = "submit";
const RESET_TYPE = "reset";
const SEARCH_TYPE = "search";
const COLOR_TYPE = "color";
const RANGE_TYPE = "range";
const URL_TYPE = "url";

// Grouped object for easy access
export const INPUT_TYPES = {
  NAME: NAME_TYPE,
  EMAIL: EMAIL_TYPE,
  PASSWORD: PASSWORD_TYPE,
  CONFIRM_PASSWORD: CONFIRMATION_PASSWORD_TYPE,
  PHONE: PHONE_TYPE,
  TEXT: TEXT_TYPE,
  NUMBER: NUMBER_TYPE,
  DATE: DATE_TYPE,
  TIME: TIME_TYPE,
  FILE: FILE_TYPE,
  SELECT: SELECT_TYPE,
  CHECKBOX: CHECKBOX_TYPE,
  RADIO: RADIO_TYPE,
  TEXTAREA: TEXTAREA_TYPE,
  HIDDEN: HIDDEN_TYPE,
  BUTTON: BUTTON_TYPE,
  SUBMIT: SUBMIT_TYPE,
  RESET: RESET_TYPE,
  SEARCH: SEARCH_TYPE,
  COLOR: COLOR_TYPE,
  RANGE: RANGE_TYPE,
  URL: URL_TYPE,
};

// Email regex pattern
export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
