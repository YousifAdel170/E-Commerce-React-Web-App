// ================================
// ERRORS From The Backend [Can't be modified]
// ================================
export const BACKEND_ERROR_MESSAGES = {
  EMAIL_ALREADY_USED: "هذا الايميل مسجل من قبل",
  EGYPT_NUMBERS_ONLY: "يجب ان يكون الرقم مصري مكون من 11 رقم",
  PASSWORD_VALIDATION: "يجب ان لا تقل كلمه السر عن 6 احرف او ارقام",
  LOGIN_WRONG: "البريد الالكتروني أو كلمة المرور غير صحيحة",
  ERROR_400: "Error Error: Request failed with status code 400",
};

// ================================
// Validation Warnings [Notify messages]
// ================================
export const USERNAME_REQUIRED_MESSAGE = "من فضلك ادخل اسم المستخدم";
export const EMAIL_REQUIRED_MESSAGE = "من فضلك ادخل البريد الالكتروني";
export const EMAIL_INVALID_MESSAGE = "من فضلك ادخل البريد الالكتروني صحيح";
export const PHONE_INVALID_MESSAGE = "من فضلك ادخل رقم هاتف صحيح";
export const PASSWORD_REQUIRED_MESSAGE = "من فضلك ادخل كلمة المرور";
export const PASSWORD_WEAK_MESSAGE = "من فضلك ادخل كلمة مرور قوية";
export const PASSWORD_CONFIRMATION_MISMATCH_MESSAGE =
  "من فضلك تأكد من كلمة المرور";

// ================================
// Success Messages
// ================================
export const REGISTRATION_SUCCESS_MESSAGE = "تم تسجيل الحساب بنجاح";
export const LOGIN_SUCCESS_MESSAGE = "تم تسجيل الدخول بنجاح";

// ================================
// General Error Messages
// ================================
export const MULTIPLE_ERRORS_MESSAGE =
  "من فضلك تأكد من البيانات المدخلة لان يوجد اكثر من خطأ";
export const REGISTRATION_FAILURE_MESSAGE = "حدث خطأ ما أثناء عملية التسجيل";
export const LOGIN_FAILURE_MESSAGE = "حدث خطأ ما أثناء عملية تسجيل الدخول";

// ================================
// General Messages [Shared]
// ================================
export const GENERAL_MESSAGES = {
  // Success messages
  ADD_SUCCESSFULLY: "تمت الإضافة بنجاح!",
  DELETE_SUCCESSFULLY: "تم الحذف بنجاح!",
  UPDATE_SUCCESSFULLY: "تم التعديل بنجاح!",

  // Failure messages
  ADD_FAILED: "حدث خطأ أثناء عملية الإضافة، الرجاء المحاولة مرة أخرى.",
  DELETE_FAILED: "حدث خطأ أثناء عملية الحذف، الرجاء المحاولة مرة أخرى.",
  UPDATE_FAILED: "حدث خطأ أثناء عملية التعديل، الرجاء المحاولة مرة أخرى.",
};

// ================================
// Subcategory Messages [Notify]
// ================================
export const SUBCATEGORY_MESSAGES = {
  NAME_REQUIRED: "من فضلك ادخل اسم التصنيف",
  MAIN_CATEGORY_REQUIRED: "من فضلك اختر تصنيف رئيسي",
  DUPLICATE_NAME: "هذا الاسم مكرر من فضلك اختر اسم اخر",
};

// ================================
// Cart Messages [Notify]
// ================================
export const CART_MESSAGES = {
  ADMIN_CANNOT_ADD: "عذرًا، لا يُسمح للمسؤولين بإضافة منتجات إلى العربة",
  PRODUCT_OUT_OF_STOCK: "هذا المنتج غير متوفر حاليًا، نعتذر عن الإزعاج",
  COLOR_REQUIRED: "يرجى اختيار لون المنتج أولًا قبل إضافته إلى العربة",
  LOGIN_REQUIRED: "يرجى تسجيل الدخول أولًا لإضافة منتجات إلى العربة",
};

// ================================
// Wishlist Notification Messages [Notify]
// ================================
export const WISHLIST_MESSAGES = {
  ADD_SUCCESS: "تم إضافة المنتج إلى المفضلة بنجاح!",
  REMOVE_SUCCESS: "تم حذف المنتج من المفضلة بنجاح.",
  LOGIN_REQUIRED: "الرجاء تسجيل الدخول للمتابعة.",
  ADMIN_RESTRICTED: "عذراً، لا يمكن للمسؤول إضافة أو حذف منتجات من المفضلة.",
  UNKNOWN_ERROR: "حدث خطأ غير متوقع، الرجاء المحاولة لاحقاً.",
};

// ================================
// Review Notification Messages [Notify]
// ================================
export const REVIEW_MESSAGES = {
  ENTER_RATING: "يرجى اختيار تقييم من 1 إلى 5 نجوم.",
  ENTER_COMMENT: "يرجى كتابة تعليق توضيحي لتحسين التجربة.",
  ADMIN_RESTRICTED: "لا يمكنك تقييم المنتجات كمسؤول.",
  ALREADY_RATED: "لقد قمت بالفعل بتقييم هذا المنتج، شكراً لمساهمتك!",
  ADD_SUCCESS: "شكراً لتقييمك! تم إضافة التقييم بنجاح.",
  UNKNOWN_ERROR: "عذراً، حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.",
};
