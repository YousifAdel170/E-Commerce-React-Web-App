/* eslint-disable react/prop-types */

// Import hooks from react
import { useState } from "react";

// Import Icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Import custom Constatnts
import { EMPTY } from "../../constants/general";

// Import custom CSS
import "./InputField.css";
import { INPUT_TYPES } from "../../constants/inputs";

// Component responsible for rendering an input field with various features like password visibility toggle, error handling, and theming.
const InputField = ({
  value,
  onChangeInput,
  onChangeInputName,
  type = INPUT_TYPES.TEXT,
  placeholder,
  className = EMPTY.TEXT,
  error,
  required = false,
  disabled = false,
  isDark = false,
  name = EMPTY.TEXT,
}) => {
  // State to manage the visibility of the password
  const [showPassword, setShowPassword] = useState(false);

  // Determine the input type based on whether the password is shown or not
  const inputType =
    type === INPUT_TYPES.PASSWORD && showPassword ? INPUT_TYPES.TEXT : type;
  const toggleAriaLabel = showPassword ? "Hide password" : "Show password";

  return (
    <div className="input-wrapper mx-auto position-relative">
      <input
        value={value}
        onChange={(e) => onChangeInput(e, onChangeInputName)}
        placeholder={placeholder}
        type={inputType}
        className={`user-input ${className} ${
          isDark ? "input-dark" : "input-light"
        }`}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        name={name}
        autoComplete={
          type === INPUT_TYPES.PASSWORD ? "current-password" : "off"
        }
        aria-label={placeholder || "Input field"}
        data-testid={`input-${name}`}
      />

      {/* Conditionally render the toggle button for password visibility */}
      {type === INPUT_TYPES.PASSWORD && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={toggleAriaLabel}
          className="toggle-password-icon"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      )}

      {error && (
        <div className="text-danger mt-1" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
