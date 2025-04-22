// Define the language/locale to use for formatting
// const userLang = "en-US"; // Change this to "ar-EG", "fr-FR", etc.
const userLang = "ar-EG"; // Change this to "ar-EG", "fr-FR", etc.

// Format date to a readable format using the constant language
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString(userLang, options);
};

export default formatDate;
