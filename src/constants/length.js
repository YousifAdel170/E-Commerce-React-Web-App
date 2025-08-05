// Phone number expected length (Egyptian format usually 10 digits after 0)
export const LENGTH_PHONE = 10;

// Password constraints
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

// Name field constraints
export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 30;

// OTP or verification code length
export const RESET_CODE_LENGTH = 6;

// Address field constraints
export const ADDRESS_MIN_LENGTH = 10;
export const ADDRESS_MAX_LENGTH = 100;

/**
 * Validation and input constraints used across the app.
 * Keeps forms consistent and ensures predictable UX behavior.
 */

export const CONSTRAINTS = {
  // ========== PHONE ==========
  PHONE_EGYPT_LENGTH: 10, // National number length (without +20)

  // ========== PASSWORD ==========
  PASSWORD_MIN_LENGTH: 8, // Recommended strong minimum
  // PASSWORD_MAX_LENGTH: 20,

  // ========== NAME ==========
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 30,

  // ========== EMAIL ==========
  EMAIL_MAX_LENGTH: 50, // Often a good max limit for email fields

  // ========== OTP / RESET (Common for OTP, verification codes) ==========
  RESET_CODE_LENGTH: 6,

  // ========== ADDRESS ==========
  ADDRESS_MIN_LENGTH: 10,
  ADDRESS_MAX_LENGTH: 100,

  // ========== USERNAME (if separate from name) ==========
  USERNAME_MIN_LENGTH: 4,
  USERNAME_MAX_LENGTH: 25,

  // ========== OTHER ==========
  MESSAGE_MAX_LENGTH: 500, // For textarea messages or feedback
};
