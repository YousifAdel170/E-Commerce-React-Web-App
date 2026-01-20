// ================================
// User Roles
// ================================
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};

// ================================
// Empty Constants Placeholder
// ================================
export const EMPTY = {
  TEXT: "",
  ARRAY: [],
  OBJECT: {},
  ZERO: "0",
};

// ================================
// HTTP Status Codes
// ================================
export const STATUS = {
  SUCCESS_OK: 200,
  SUCCESS_CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
};

export const STATUS_MESSAGES = {
  FAILED: "fail",
  DUPLICATE: "Duplicate",
  SUCCESS: "success",
  BACKEND_EMAIL_ALREADY_USED: "E-mail already in use",
  REVIEW_ALREADY_USED_BY_YOU: "You already added review on this product",
  REVIEW_ADMIN_FORBIDDEN: "You are not allowed to perform this action",
  REQUEST_403: "Request failed with status code 403",
};

// ================================
// Numbers
// ================================
export const ZERO = 0;
export const NEGATIVE_ONE = -1;
export const ONE = 1;
export const HUNDRED = 100;

export const NUMBERS = {
  NEGATIVE_ONE: NEGATIVE_ONE,
  ZERO: ZERO,
  ONE: ONE,
  HUNDRED: HUNDRED,
};

// ================================
// Payment Methods
// ================================
export const PAYMENT_METHODS = {
  CASH: "cash",
  CREDIT_CARD: "creditCard",
  PAYPAL: "paypal",
};

// ================================
// Slider Direction
// ================================
export const SLIDER_DIRECTIONS = {
  RIGHT: "right",
  LEFT: "left",
};

// ================================
// Sort Types
// ================================
export const SORT_TYPES = {
  LOW_TO_HIGH: {
    METHOD: "السعر من الاقل للاعلي",
    VALUE: "+price",
  },
  HIGH_TO_LOW: {
    METHOD: "السعر من الاعلي للاقل",
    VALUE: "-price",
  },
  MOST_SOLD: {
    METHOD: "الاكثر مبيعا",
    VALUE: "-sold",
  },
  TOP_RATED: {
    METHOD: "الاعلي تقييما",
    VALUE: "-quantity", // adjust if you use rating instead of quantity
  },
  NONE: {
    METHOD: "",
    VALUE: "",
  },
};
