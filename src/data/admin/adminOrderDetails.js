export const adminOrderDetailsData = {
  iconNotFound: "🔍",
  notFound: "لا يوجد تفاصيل للطلب",
  title: "تفاصيل العميل الخاصة بالطلب",

  user: {
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
  },

  orderStatus: {
    title: "تحديث حالة الطلب",

    payment: {
      title: "حالة الدفع",
      label: "paid",
      ariaLabel: "تغيير حالة الدفع",
      status: [
        {
          title: "تم",
          value: "true",
        },
        {
          title: "لم يتم",
          value: "false",
        },
      ],
    },

    delivery: {
      title: "حالة التوصيل",
      label: "deliver",
      ariaLabel: "تغيير حالة التوصيل",
      status: [
        {
          title: "تم",
          value: "true",
        },
        {
          title: "لم يتم",
          value: "false",
        },
      ],
    },

    save: "حفظ التغييرات",
  },
};
