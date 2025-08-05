// ================================
// Email Regex Patterns
// ================================
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// ================================
// Phone Number Regex Patterns
// ================================
const EGYPT_PHONE_REGEX = /^(01)[0-2,5]{1}[0-9]{8}$/;
const SAUDI_PHONE_REGEX = /^(00966|\+966|966|0)?5[0-9]{8}$/;

// ================================
// Username Regex Patterns
// ================================
const USERNAME_REGEX = /^[A-Za-z\u0600-\u06FF ]{3,}$/;

// ================================
// Reset Code Regex
// ================================
const RESET_CODE_REGEX = /^\d{6}$/;

// ================================
// Slug Regex
// ================================
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ================================
// URL Regex
// ================================
const URL_REGEX = /^(https?:\/\/)?([\w-])+\.[a-zA-Z]{2,}(\/\S*)?$/;

// ================================
// Password Requirement Regex Patterns
// ================================

// Checks for at least one uppercase letter
const PASSWORD_HAS_UPPERCASE = /[A-Z]/;

// Checks for at least one lowercase letter
const PASSWORD_HAS_LOWERCASE = /[a-z]/;

// Checks for at least one number
const PASSWORD_HAS_NUMBER = /\d/;

// Checks for at least one special character
const PASSWORD_HAS_SPECIAL_CHAR = /[!@#$%^&*(),.?":{}|<>]/;

// Checks for minimum length (use in logic, not regex alone)
const PASSWORD_MIN_LENGTH = 8;

// Full password regex if needed for validation on backend format
const PASSWORD_REGEX = new RegExp(
  `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{${PASSWORD_MIN_LENGTH},}$`
);

// ================================
// Regex
// ================================
export const REGEX_PATTERNS = {
  USERNAME: USERNAME_REGEX,

  EMAIL: EMAIL_REGEX,

  PHONE: {
    EGYPT: EGYPT_PHONE_REGEX,
    SAUDI_ARABIA: SAUDI_PHONE_REGEX,
  },

  PASSWORD: {
    FULL: PASSWORD_REGEX,
    RULES: {
      UPPERCASE: PASSWORD_HAS_UPPERCASE,
      LOWERCASE: PASSWORD_HAS_LOWERCASE,
      NUMBER: PASSWORD_HAS_NUMBER,
      SPECIAL_CHAR: PASSWORD_HAS_SPECIAL_CHAR,
      MIN_LENGTH: PASSWORD_MIN_LENGTH,
    },
  },

  RESET_CODE: RESET_CODE_REGEX,

  SLUG: SLUG_REGEX,

  URL: URL_REGEX,
};
