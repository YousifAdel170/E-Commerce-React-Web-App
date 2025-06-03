// Import Custom Constants
import { HUNDRED, ZERO } from "../../constants/general";

/**
 * Calculate discount amount between original price and discounted price.
 * Returns zero if inputs are invalid or no discount exists.
 * @param {number} price - Original price
 * @param {number} priceAfterDiscount - Discounted price
 * @returns {number} Discount amount
 */
export function calculateDiscountAmount(price, priceAfterDiscount) {
  if (
    typeof price !== "number" ||
    typeof priceAfterDiscount !== "number" ||
    price <= 0 ||
    priceAfterDiscount < 0 ||
    priceAfterDiscount >= price
  ) {
    return ZERO;
  }
  return price - priceAfterDiscount;
}

/**
 * Calculate discount percentage based on discount amount and original price.
 * Returns zero if inputs are invalid or no discount exists.
 * @param {number} discountAmount - The discount amount
 * @param {number} price - Original price
 * @returns {number} Discount percentage (rounded)
 */
export function calculateDiscountPercent(discountAmount, price) {
  if (
    typeof discountAmount !== "number" ||
    typeof price !== "number" ||
    discountAmount <= 0 ||
    price <= 0 ||
    discountAmount > price
  ) {
    return ZERO;
  }
  return Math.round((discountAmount / price) * HUNDRED);
}

/**
 * Combined utility to calculate both discount amount and percent from an item.
 * @param {object} item - Item object with price and priceAfterDiscount
 * @returns {{ discountAmount: number, discountPercent: number }}
 */
export function calculateDiscounts(item) {
  const discountAmount = calculateDiscountAmount(
    item?.price,
    item?.priceAfterDiscount
  );
  const discountPercent = calculateDiscountPercent(discountAmount, item?.price);
  return {
    discountAmount,
    discountPercent,
  };
}
