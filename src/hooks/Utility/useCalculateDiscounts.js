export const calculateDiscounts = (item) => {
  // Calculate discount amount and percentage for display badge
  const discountAmount =
    item?.price && item?.priceAfterDiscount
      ? item.price - item.priceAfterDiscount
      : 0;
  const discountPercent =
    discountAmount && item.price
      ? Math.round((discountAmount / item.price) * 100)
      : 0;

  return [discountAmount, discountPercent];
};
