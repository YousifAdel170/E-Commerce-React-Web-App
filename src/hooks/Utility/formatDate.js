// Define the language/locale to use for formatting
// const userLang = "en-US"; // Change this to "ar-EG", "fr-FR", etc.
const userLang = "ar-EG"; // Change this to "ar-EG", "fr-FR", etc.

// Format date to a readable format using the constant language
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString(userLang, options);
};

export const formatDateTime = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString(userLang, options);
};

export default formatDate;
