// Import necessary React hooks
import { useCallback, useState } from "react";

// Import Constant for the button delay + numbers
import { BUTTON_DELAY } from "../../constants/delays";
import { NEGATIVE_ONE, ZERO } from "../../constants/general";
import { calculateDiscountPercent } from "../Utility/useDiscountHook";

// Custom hook to manage product description logic and Add to Cart functionality
const ProductDescriptionHook = (
  itemProduct,
  indexColorClicked,
  handleAddToCart
) => {
  // Local state to manage loading state of the Add to Cart button
  const [isAdding, setIsAdding] = useState(false);

  // Disable Add to Cart button if no color is selected or product is out of stock
  const isAddDisabled =
    indexColorClicked === NEGATIVE_ONE || itemProduct?.quantity === ZERO;

  // Calculate the discount percentage if there's a discounted price
  const discountAmount = itemProduct?.price - itemProduct?.priceAfterDiscount;
  const discountPercent = calculateDiscountPercent(
    discountAmount,
    itemProduct?.price
  );

  // Handle Add to Cart click - memoized for better performance
  const onAddToCart = useCallback(() => {
    // Prevent action if disabled
    if (isAddDisabled) return;

    // Start loading state
    setIsAdding(true);

    // Trigger the passed-in Add to Cart function
    handleAddToCart();

    // Simulate delay (ideally, await a promise instead of timeout)
    setTimeout(() => setIsAdding(false), BUTTON_DELAY);
  }, [isAddDisabled, handleAddToCart]);

  // Return relevant data for component usage
  return [discountPercent, isAddDisabled, isAdding, onAddToCart];
};

// Export the custom hook for use in components
export default ProductDescriptionHook;
