// This file contains the constants for the admin order item page.
import { adminOrderItemData } from "../../constants/adminOrderItem";

// This function returns an array of objects containing user information fields
export const getUserInfoFields = (order) => [
  { label: adminOrderItemData.user.name, value: order?.user?.name || "" },
  { label: adminOrderItemData.user.email, value: order?.user?.email || "" },
];

// This function returns an array of objects containing order status fields
export const getOrderStatusFields = (order) => [
  {
    label: adminOrderItemData.delivery.title,
    value: order?.isDelivered
      ? adminOrderItemData.delivery.delivered
      : adminOrderItemData.delivery.notDelivered,
    color: order?.isDelivered
      ? adminOrderItemData.badgeColors.delivered
      : adminOrderItemData.badgeColors.notDelivered,
  },
  {
    label: adminOrderItemData.payment.title,
    value: order?.isPaid
      ? adminOrderItemData.payment.paid
      : adminOrderItemData.payment.notPaid,
    color: order?.isPaid
      ? adminOrderItemData.badgeColors.paid
      : adminOrderItemData.badgeColors.notPaid,
  },
  {
    label: adminOrderItemData.paymentMethod.title,
    value:
      order?.paymentMethodType === "cash"
        ? adminOrderItemData.paymentMethod.cash
        : adminOrderItemData.paymentMethod.card,
    color: adminOrderItemData.badgeColors.paymentMethod,
  },
];
