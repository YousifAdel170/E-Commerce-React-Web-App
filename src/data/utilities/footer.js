// Import Icons
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export const footerData = {
  phone: {
    number: "0123456789",
    icon: faPhone,
  },
  icons: [
    { icon: faFacebookF, altKey: "facebookAlt", link: "https://facebook.com" },
    { icon: faTwitter, altKey: "twitterAlt", link: "https://twitter.com" },
    {
      icon: faInstagram,
      altKey: "instagramAlt",
      link: "https://instagram.com",
    },
    { icon: faEnvelope, altKey: "emailAlt", link: "mailto:ya842245@gmail.com" },
  ],
};
