// This file contains the constants for the admin order item page.
import { EMPTY, PAYMENT_METHODS } from "../../constants/general";
import { adminOrderItemData } from "../../data/admin/adminOrderItem";

// This function returns an array of objects containing user information fields
export const getUserInfoFields = (order) => [
  {
    label: "all-orders.customer.username",
    value: order?.user?.name || EMPTY.TEXT,
  },
  {
    label: "all-orders.customer.email",
    value: order?.user?.email || EMPTY.TEXT,
  },
];

// This function returns an array of objects containing order status fields
export const getOrderStatusFields = (order) => [
  {
    label: "all-orders.deliveryStatus.label",
    value: order?.isDelivered
      ? "all-orders.deliveryStatus.delivered"
      : "all-orders.deliveryStatus.pending",
    color: order?.isDelivered
      ? adminOrderItemData.badgeColors.delivered
      : adminOrderItemData.badgeColors.notDelivered,
  },
  {
    label: "all-orders.paymentStatus.label",
    value: order?.isPaid
      ? "all-orders.paymentStatus.paid"
      : "all-orders.paymentStatus.unpaid",
    color: order?.isPaid
      ? adminOrderItemData.badgeColors.paid
      : adminOrderItemData.badgeColors.notPaid,
  },
  {
    label: "all-orders.paymentMethod.label",
    value:
      order?.paymentMethodType === PAYMENT_METHODS.CASH
        ? "all-orders.paymentMethod.cash"
        : "all-orders.paymentMethod.creditCard",
    color: adminOrderItemData.badgeColors.paymentMethod,
  },
];
