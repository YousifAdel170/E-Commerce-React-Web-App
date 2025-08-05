import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import namespaces English
import enAuth from "./en-US/auth/auth.json";

import enNavbar from "./en-US/utilities/navbar.json";
import enFooter from "./en-US/utilities/footer.json";

import enHomeContent from "./en-US/utilities/homeContent.json";
import enShopProducts from "./en-US/products/shopProducts.json";

import enNotificationMessages from "./en-US/utilities/notifcation_messages.json";

// Import namespaces Arabic
import arAuth from "./ar/auth/auth.json";

import arNavbar from "./ar/utilities/navbar.json";
import arFooter from "./ar/utilities/footer.json";

import arHomeContent from "./ar/utilities/homeContent.json";
import arShopProducts from "./ar/products/shopProducts.json";

import arNotificationMessages from "./ar/utilities/notifcation_messages.json";

import { DEFAULT_DIRECTION, DEFAULT_LANGUAGE } from "../constants/settings";

i18n
  .use(LanguageDetector) // auto detect language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    resources: {
      en: {
        auth: enAuth,
        navbar: enNavbar,
        home: enHomeContent,
        footer: enFooter,
        shopProducts: enShopProducts,
        notification_messages: enNotificationMessages,
      },
      ar: {
        auth: arAuth,
        navbar: arNavbar,
        home: arHomeContent,
        footer: arFooter,
        shopProducts: arShopProducts,
        notification_messages: arNotificationMessages,
      },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    // ns: ["auth", "dashboard"], // list all namespaces here
    ns: [
      "auth",
      "navbar",
      "home",
      "footer",
      "shopProducts",
      "notification_messages",
    ], // include all namespaces
    defaultNS: "auth", // default namespace when calling t()
    interpolation: {
      escapeValue: false, // react already safe from xss
    },
    detection: {
      caches: [],
    },
  });

document.documentElement.dir = DEFAULT_DIRECTION;

export default i18n;
