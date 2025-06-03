// Import The Used Assets
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

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
    icon: faPhone,
    alt: "Phone Icon",
  },

  icons: [
    {
      icon: faFacebookF,
      alt: "Facebook Icon",
      link: "https://facebook.com",
    },
    {
      icon: faTwitter,
      alt: "Twitter Icon",
      link: "https://twitter.com",
    },
    {
      icon: faInstagram,
      alt: "Instagram Icon",
      link: "https://instagram.com",
    },
    {
      icon: faEnvelope,
      alt: "Email Icon",
      link: "mailto:ya842245@gmail.com",
    },
  ],
};
