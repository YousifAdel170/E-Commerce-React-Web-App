// ================================
// ERRORS From The Backend [Can't be modified]
// ================================
export const BACKEND_ERROR_MESSAGES = {
  EMAIL_ALREADY_USED: "هذا البريد الإلكتروني مستخدم من قبل.",
  EGYPT_NUMBERS_ONLY: "رقم الهاتف يجب أن يكون مصريًا ويتكوّن من 11 رقمًا.",
  PASSWORD_VALIDATION:
    "كلمة المرور يجب أن تحتوي على 6 أحرف أو أرقام على الأقل.",
  LOGIN_WRONG: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
  ERROR_400: "حدث خطأ في الاتصال بالخادم. الرجاء المحاولة لاحقًا.",
};

// ================================
// Validation Warnings [Notify messages]
// ================================
export const USERNAME_REQUIRED_MESSAGE = "يرجى إدخال اسم المستخدم.";
export const EMAIL_REQUIRED_MESSAGE = "يرجى إدخال البريد الإلكتروني.";
export const EMAIL_INVALID_MESSAGE = "يرجى إدخال بريد إلكتروني صالح.";
export const PHONE_INVALID_MESSAGE = "يرجى إدخال رقم هاتف صحيح.";
export const PASSWORD_REQUIRED_MESSAGE = "يرجى إدخال كلمة المرور.";
export const PASSWORD_WEAK_MESSAGE =
  "يرجى اختيار كلمة مرور قوية تحتوي على رموز وأرقام.";
export const PASSWORD_CONFIRMATION_MISMATCH_MESSAGE =
  "كلمة المرور وتأكيدها غير متطابقين.";

// ================================
// Success Messages
// ================================
export const REGISTRATION_SUCCESS_MESSAGE = "تم إنشاء الحساب بنجاح!";
export const LOGIN_SUCCESS_MESSAGE = "تم تسجيل الدخول بنجاح!";

// ================================
// General Error Messages
// ================================
export const MULTIPLE_ERRORS_MESSAGE =
  "يرجى مراجعة البيانات المدخلة. هناك أكثر من خطأ.";
export const REGISTRATION_FAILURE_MESSAGE =
  "لم نتمكن من إكمال التسجيل. حاول مرة أخرى.";
export const LOGIN_FAILURE_MESSAGE =
  "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.";

// ================================
// General Messages [Shared]
// ================================
export const GENERAL_MESSAGES = {
  ADD_SUCCESSFULLY: "تمت الإضافة بنجاح!",
  DELETE_SUCCESSFULLY: "تم الحذف بنجاح!",
  UPDATE_SUCCESSFULLY: "تم التحديث بنجاح!",

  ADD_FAILED: "تعذرت عملية الإضافة. حاول مجددًا.",
  DELETE_FAILED: "تعذرت عملية الحذف. حاول مجددًا.",
  UPDATE_FAILED: "تعذرت عملية التحديث. حاول مجددًا.",
};

// ================================
// Subcategory Messages [Notify]
// ================================
export const SUBCATEGORY_MESSAGES = {
  NAME_REQUIRED: "يرجى إدخال اسم التصنيف الفرعي.",
  MAIN_CATEGORY_REQUIRED: "يرجى اختيار تصنيف رئيسي.",
  DUPLICATE_NAME: "هذا الاسم مستخدم بالفعل. اختر اسمًا آخر.",
};

// ================================
// Cart Messages [Notify]
// ================================
export const CART_MESSAGES = {
  ADMIN_CANNOT_ADD: "عذرًا، لا يمكن للمسؤولين إضافة منتجات إلى العربة.",
  PRODUCT_OUT_OF_STOCK: "هذا المنتج غير متوفر حاليًا.",
  COLOR_REQUIRED: "يرجى اختيار لون المنتج قبل إضافته إلى العربة.",
  LOGIN_REQUIRED: "يرجى تسجيل الدخول لإضافة المنتجات إلى العربة.",
};

// ================================
// Wishlist Notification Messages [Notify]
// ================================
export const WISHLIST_MESSAGES = {
  ADD_SUCCESS: "تمت إضافة المنتج إلى المفضلة.",
  REMOVE_SUCCESS: "تمت إزالة المنتج من المفضلة.",
  LOGIN_REQUIRED: "يرجى تسجيل الدخول للمتابعة.",
  ADMIN_RESTRICTED: "لا يمكن للمسؤول تعديل المفضلة.",
  UNKNOWN_ERROR: "حدث خطأ غير متوقع. حاول لاحقًا.",
};

// ================================
// Review Notification Messages [Notify]
// ================================
export const REVIEW_MESSAGES = {
  ENTER_RATING: "يرجى اختيار تقييم من 1 إلى 5 نجوم.",
  ENTER_COMMENT: "يرجى كتابة تعليق لتحسين التجربة.",
  ADMIN_RESTRICTED: "لا يمكن للمسؤولين تقييم المنتجات.",
  ALREADY_RATED: "لقد قمت بتقييم هذا المنتج من قبل. شكرًا لك!",
  ADD_SUCCESS: "شكرًا لك! تم إرسال تقييمك بنجاح.",
  UNKNOWN_ERROR: "حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.",
};
