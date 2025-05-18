// Import The Used Assets
import phone from "../Assets/Imgs/phone.png";
import facebook from "../Assets/Imgs/facebook.png";
import twitter from "../Assets/Imgs/twitter.png";
import instagram from "../Assets/Imgs/instagram.png";

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
