// Import The Used Assets
import phone from "../../assets/imgs/phone.png";
import facebook from "../../assets/imgs/facebook.png";
import twitter from "../../assets/imgs/twitter.png";
import instagram from "../../assets/imgs/instagram.png";

// Export the footer data with multilingual support
export const footerData = {
  terms: [
    {
      name: {
        ar: "الشروط و الاحكام",
        "en-US": "Terms and Conditions",
      },
      className: "",
    },

    {
      name: {
        ar: "سياسة الخصوصية",
        "en-US": "Privacy Policy",
      },
      className: "mx-2",
    },

    {
      name: {
        ar: "اتصل بنا",
        "en-US": "Contact Us",
      },
      className: "mx-2",
    },
  ],

  phone: {
    number: "0123456789",
    image: phone,
    alt: "Phone Icon",
  },

  icons: [
    {
      image: facebook,
      alt: "Facebook Icon",
    },

    {
      image: twitter,
      alt: "Twitter Icon",
    },

    {
      image: instagram,
      alt: "Instagram Icon",
    },
  ],
};
