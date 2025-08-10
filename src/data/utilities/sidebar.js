import { ROUTES } from "../../constants/routes";

export const sidebarData = {
  user: [
    {
      nameKey: "user.all-orders",
      path: ROUTES.USER.ORDERS,
    },
    {
      nameKey: "user.favorite-products",
      path: ROUTES.USER.FAVORITES,
    },
    {
      nameKey: "user.addresses",
      path: ROUTES.USER.ADDRESSES.ALL,
    },
    {
      nameKey: "user.profile",
      path: ROUTES.USER.PROFILE,
    },
  ],

  admin: [
    {
      nameKey: "admin.all-orders",
      path: ROUTES.ADMIN.ORDERS.ALL,
    },

    {
      nameKey: "admin.all-products",
      path: ROUTES.ADMIN.PRODUCTS.ALL,
    },

    {
      nameKey: "admin.all-coupons",
      path: ROUTES.ADMIN.COUPONS.ALL,
    },

    {
      nameKey: "admin.all-brands",
      path: ROUTES.ADMIN.BRANDS.ALL,
    },

    {
      nameKey: "admin.all-categories",
      path: ROUTES.ADMIN.CATEGORIES.ALL,
    },

    {
      nameKey: "admin.add-brand",
      path: ROUTES.ADMIN.BRANDS.ADD,
    },

    {
      nameKey: "admin.add-category",
      path: ROUTES.ADMIN.CATEGORIES.ADD,
    },

    {
      nameKey: "admin.add-subcategory",
      path: ROUTES.ADMIN.CATEGORIES.SUBCATEGORIES.ADD,
    },

    {
      nameKey: "admin.add-product",
      path: ROUTES.ADMIN.PRODUCTS.ADD,
    },

    {
      nameKey: "admin.add-product",
      path: ROUTES.ADMIN.COUPONS.ADD,
    },
  ],
};
