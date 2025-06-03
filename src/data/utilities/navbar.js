// This file contains navigation data for the application.
export const navbarData = {
  home: {
    path: "/",
    ariaLabel: "Home Page",
  },

  search: {
    type: "search",
    placeholder: "ابحث...",
    ariaLabel: "Search products or content",
  },

  role: {
    admin: {
      title: "لوحة التحكم",
      path: "/admin/all-products",
    },
    user: {
      title: "الصفحة الشخصية",
      path: "/user/profile",
    },
  },
};
