// This file contains the constants for the admin order item page.
export const adminOrderItemData = {
  link: "/admin/all-orders/",
  title: "طلب رقم #",
  user: {
    name: "الاسم",
    email: "البريد الإلكتروني",
  },
  linkTitle: "عرض تفاصيل الطلب",
  delivery: {
    title: "التوصيل",
    delivered: "تم التوصيل",
    notDelivered: "لم يتم التوصيل",
  },
  payment: {
    title: "الدفع",
    paid: "تم الدفع",
    notPaid: "لم يتم الدفع",
  },
  paymentMethod: {
    title: "طريقة الدفع",
    cash: "كاش",
    card: "بطاقة ائتمانية",
  },

  totalPrice: "المبلغ الإجمالي",
  currency: "جنيه مصري",

  badgeColors: {
    delivered: "success", // green
    notDelivered: "danger", // red
    paid: "success", // green
    notPaid: "warning", // yellow
    paymentMethod: "info", // blue
  },
};
