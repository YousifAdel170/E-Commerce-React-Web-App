// currency.js

/**
 * Currency definitions with multilingual support (EN, AR).
 * Each currency contains:
 * - EN: English name/code
 * - AR: Arabic name/code
 * - SYMBOL: Currency symbol
 */

const CURRENCIES = {
  EGYPTIAN_POUND: {
    EN: "EGP",
    AR: "ج.م",
    SYMBOL: "£",
  },
  US_DOLLAR: {
    EN: "USD",
    AR: "دولار",
    SYMBOL: "$",
  },
  EURO: {
    EN: "EUR",
    AR: "يورو",
    SYMBOL: "€",
  },
  BRITISH_POUND: {
    EN: "GBP",
    AR: "جنيه إسترليني",
    SYMBOL: "£",
  },
  SAUDI_RIYAL: {
    EN: "SAR",
    AR: "ريال سعودي",
    SYMBOL: "﷼",
  },
  UAE_DIRHAM: {
    EN: "AED",
    AR: "درهم إماراتي",
    SYMBOL: "د.إ",
  },
  KUWAITI_DINAR: {
    EN: "KWD",
    AR: "دينار كويتي",
    SYMBOL: "د.ك",
  },
  QATARI_RIYAL: {
    EN: "QAR",
    AR: "ريال قطري",
    SYMBOL: "ر.ق",
  },
  CANADIAN_DOLLAR: {
    EN: "CAD",
    AR: "دولار كندي",
    SYMBOL: "$",
  },
  AUSTRALIAN_DOLLAR: {
    EN: "AUD",
    AR: "دولار أسترالي",
    SYMBOL: "$",
  },
  JAPANESE_YEN: {
    EN: "JPY",
    AR: "ين ياباني",
    SYMBOL: "¥",
  },
  CHINESE_YUAN: {
    EN: "CNY",
    AR: "يوان صيني",
    SYMBOL: "¥",
  },
  TURKISH_LIRA: {
    EN: "TRY",
    AR: "ليرة تركية",
    SYMBOL: "₺",
  },
  INDIAN_RUPEE: {
    EN: "INR",
    AR: "روبية هندية",
    SYMBOL: "₹",
  },
  SWISS_FRANC: {
    EN: "CHF",
    AR: "فرنك سويسري",
    SYMBOL: "CHF",
  },
};

export { CURRENCIES };
