/**
 * ===================================================
 * API Status & Error Handler (i18n Friendly)
 * ===================================================
 * - Handles status codes and known errors
 * - Returns i18n keys instead of hardcoded messages
 * - Easily extendable and centralized
 */

// ============================
// API Status Types
// ============================
export const STATUS_TYPES = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  SERVER_ERROR: "SERVER_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
};

// ============================
// API Status Codes & States
// ============================
export const API_STATUS = {
  SUCCESS: {
    codes: new Set([200, 201]),
    messages: new Set(["Success", "success"]),
  },
  FAILURE: {
    codes: new Set([400, 422]),
    messages: new Set(["Fail", "fail"]),
  },
  UNAUTHORIZED: {
    codes: new Set([401]),
    messages: new Set(["Unauthorized", "unauthorized"]),
  },
  FORBIDDEN: {
    codes: new Set([403]),
    messages: new Set([]),
  },
  NOT_FOUND: {
    codes: new Set([404]),
    messages: new Set([]),
  },
  SERVER_ERROR: {
    codes: new Set([500]),
    messages: new Set(["Internal Server Error"]),
  },

  NETWORK_ERROR: {
    codes: new Set([]),
    messages: new Set(["Network Error", "ECONNABORTED", "ERR_NETWORK"]),
  },

  // These are NOT status codes but specific known backend messages/errors
  KNOWN_MESSAGES: {
    EMAIL_ALREADY_USED: "E-mail already in use",
    EGYPT_NUMBERS_ONLY: "رقم الهاتف يجب أن يكون مصريًا ويتكوّن من 11 رقمًا.",
    PASSWORD_VALIDATION:
      "كلمة المرور يجب أن تحتوي على 6 أحرف أو أرقام على الأقل.",
  },
};

// ============================
// Utility Functions
// ============================

/**
 * Checks if the status belongs to a known category like SUCCESS, FAILURE, etc.
 * @param {any} status - HTTP status code or backend string status (e.g. "Success")
 * @param {keyof typeof API_STATUS} type - The key of API_STATUS like "SUCCESS"
 * @returns {boolean}
 */
export const isApiStatus = (status, type) => {
  const group = API_STATUS?.[type];
  if (!group) return false;

  // Check if status is in codes or messages sets
  return group.codes.has(status) || group.messages.has(status);
};

/**
 * Detects if the error is a known network-related failure.
 * @param {object} error
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  const msgs = API_STATUS.NETWORK_ERROR.messages;
  return msgs.has(error?.message) || msgs.has(error?.code);
};

/**
 * Returns an i18n translation key based on the error type/status
 * @param {object} error - Axios or fetch error object
 * @returns {string} i18n key like "backendErrors.server"
 */
export const getFriendlyErrorMessageKey = (error, action) => {
  if (isNetworkError(error)) return "backendErrors.network";

  const status =
    error?.response?.status ||
    error?.status ||
    error?.code ||
    error?.response?.data?.status;

  if (status == null) return "backendErrors.generic";

  if (isApiStatus(status, STATUS_TYPES.UNAUTHORIZED))
    return "backendErrors.unauthorized";
  if (isApiStatus(status, STATUS_TYPES.SERVER_ERROR))
    return "backendErrors.server";
  if (isApiStatus(status, STATUS_TYPES.NOT_FOUND))
    return "backendErrors.notFound";
  if (isApiStatus(status, STATUS_TYPES.FORBIDDEN))
    return "backendErrors.forbidden";
  if (isApiStatus(status, STATUS_TYPES.FAILURE)) {
    if (action === "login") return "backendErrors.loginWrong";
    else return "backendErrors.failure";
  }
  if (isApiStatus(status, STATUS_TYPES.SUCCESS)) return "backendErrors.success";

  return "backendErrors.generic";
};
