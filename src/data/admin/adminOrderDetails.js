export const adminOrderDetailsData = {
  user: {
    name: "order-details.customer.username",
    email: "order-details.customer.email",
    phone: "order-details.customer.phone",
  },

  orderStatus: {
    payment: {
      title: "order-details.status.payment.label",
      label: "order-details.status.payment.paid",
      ariaLabel: "order-details.status.payment.changeStatus",
      status: [
        {
          title: "order-details.status.payment.paid",
          value: "true",
        },
        {
          title: "order-details.status.payment.unpaid",
          value: "false",
        },
      ],
    },

    delivery: {
      title: "order-details.status.delivery.label",
      label: "order-details.status.delivery.delivered",
      ariaLabel: "order-details.status.delivery.changeStatus",
      status: [
        {
          title: "order-details.status.delivery.delivered",
          value: "true",
        },
        {
          title: "order-details.status.delivery.pending",
          value: "false",
        },
      ],
    },

    save: "order-details.actions.saveChanges",
  },
};
