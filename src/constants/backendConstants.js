// Backend URLs for the application
export const BACKEND_URLS = {
  // Authentication and User Management URLs
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/signup",
    RESET_PASSWORD: "/api/v1/auth/resetPassword",
    VERIFY_PASSWORD: "/api/v1/auth/verifyResetCode",
    FORGOT_PASSWORD: "/api/v1/auth/forgotPasswords",
    LOGOUT: "/auth/logout",
    GET_ME: "/api/v1/users/getMe",
    UPDATE_USER_PROFILE: "/api/v1/users/updateMe",
    UPDATE_USER_PASSWORD: "/api/v1/users/changeMyPassword",
  },
};

// Backend Variables for the application
export const BACKEND_VARIABLES = {
  BRAND: {
    ADD: {
      NAME: "name",
      IMAGE: "image",
    },
  },
  CATEGORY: {
    ADD: {
      NAME: "name",
      IMAGE: "image",
    },
  },

  PRDOUCT: {
    TITLE: "title",
    DESCRIPTION: "description",
    QUANTITY: "quantity",
    PRICE_BEFORE_DISCOUNT: "price",
    PRICE_AFTER_DISCOUNT: "priceAfterDiscount",
    IMAGE_COVER: "imageCover",
    CATEGORY: "category",
    BRAND: "brand",
    AVAILABLE_COLORS: "availableColors",
    SUBCATEGORY: "subcategory",
    IMAGES: "images",
  },
};
