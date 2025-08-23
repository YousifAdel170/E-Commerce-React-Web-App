import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import namespaces English
import enAuth from "./en-US/auth/auth.json";

import enUtilities from "./en-US/utilities.json";

import enHomeContent from "./en-US/utilities/homeContent.json";
import enShopProducts from "./en-US/products/shopProducts.json";

import enNotificationMessages from "./en-US/utilities/notifcation_messages.json";

import enAdmin from "./en-US/admin.json";

import enProduct from "./en-US/product.json";

import enRate from "./en-US/rate.json";

// Import namespaces Arabic
import arAuth from "./ar/auth/auth.json";

import arUtilities from "./ar/utilities.json";

import arHomeContent from "./ar/utilities/homeContent.json";
import arShopProducts from "./ar/products/shopProducts.json";

import arNotificationMessages from "./ar/utilities/notifcation_messages.json";

import arAdmin from "./ar/admin.json";

import arProduct from "./ar/product.json";

import arRate from "./ar/rate.json";

import { DEFAULT_DIRECTION, DEFAULT_LANGUAGE } from "../constants/settings";

i18n
  .use(LanguageDetector) // auto detect language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    resources: {
      en: {
        utilities: enUtilities,
        auth: enAuth,
        home: enHomeContent,
        shopProducts: enShopProducts,
        notification_messages: enNotificationMessages,
        admin: enAdmin,
        product: enProduct,
        rate: enRate,
      },
      ar: {
        utilities: arUtilities,
        auth: arAuth,
        home: arHomeContent,
        shopProducts: arShopProducts,
        notification_messages: arNotificationMessages,
        admin: arAdmin,
        product: arProduct,
        rate: arRate,
      },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    // ns: ["auth", "dashboard"], // list all namespaces here
    ns: [
      "utilities",
      "auth",
      "home",
      "shopProducts",
      "notification_messages",
      "admin",
      "product",
      "rate",
    ], // include all namespaces
    defaultNS: "auth", // default namespace used if not passed to useTranslation
    interpolation: {
      escapeValue: false, // react already safe from xss
    },
    detection: {
      caches: [],
    },
  });

document.documentElement.dir = DEFAULT_DIRECTION;

export default i18n;
