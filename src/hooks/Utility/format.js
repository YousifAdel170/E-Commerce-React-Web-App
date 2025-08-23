import { useSelector } from "react-redux";
import { CURRENCIES } from "../../constants/currency";
import { LANGUAGES } from "../../constants/settings";

/**
 * Utility function to get currency by code
 * @param {string} code - Example: "USD", "EGP"
 * @returns {object|null} - { EN, AR, SYMBOL }
 */
export function getCurrencyByCode(code) {
  return (
    Object.values(CURRENCIES).find((currency) => currency.EN === code) || null
  );
}

/**
 * Hook to format any currency dynamically based on language
 */
export const useCurrencyFormatter = (currencyCode) => {
  const { lang } = useSelector((state) => state.ui);

  const currency = getCurrencyByCode(currencyCode) || {
    EN: currencyCode,
    AR: currencyCode,
    SYMBOL: "",
  };

  const userCurrency = lang === LANGUAGES.ARABIC ? currency.AR : currency.EN;
  const symbol = currency.SYMBOL;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(
      lang === LANGUAGES.ARABIC ? "ar-EG" : "en-US",
      {
        style: "currency",
        currency: currencyCode,
      }
    ).format(amount);
  };

  return { formatCurrency, symbol, name: userCurrency };
};
