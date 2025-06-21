/* eslint-disable react/prop-types */

// Import hooks from react
import { useState } from "react";

// Import Icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Import custom Constatnts
import { TEXT_TYPE, PASSWORD_TYPE } from "../../constants/inputTypes";
import { EMPTY } from "../../constants/general";

// Import custom CSS
import "./InputField.css";

// Component responsible for rendering an input field with various features like password visibility toggle, error handling, and theming.
const InputField = ({
  value,
  onChangeInput,
  onChangeInputType,
  type = TEXT_TYPE,
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
  const inputType = type === PASSWORD_TYPE && showPassword ? TEXT_TYPE : type;
  const toggleAriaLabel = showPassword ? "Hide password" : "Show password";

  return (
    <div className="input-wrapper mx-auto position-relative">
      <input
        value={value}
        onChange={(e) => onChangeInput(e, onChangeInputType)}
        placeholder={placeholder}
        type={inputType}
        className={`user-input ${className} ${
          isDark ? "input-dark" : "input-light"
        }`}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        name={name}
        autoComplete={type === PASSWORD_TYPE ? "current-password" : "off"}
        autoFocus={type === PASSWORD_TYPE ? false : true}
        aria-label={placeholder || "Input field"}
        data-testid={`input-${name}`}
        data-type={type}
        data-show-password={showPassword ? "true" : "false"}
        data-on-change-input-type={onChangeInputType}
        data-on-change-input={onChangeInput}
        data-value={value}
        data-required={required ? "true" : "false"}
        data-disabled={disabled ? "true" : "false"}
        data-name={name}
        data-class={className}
        data-is-dark={isDark ? "true" : "false"}
        data-placeholder={placeholder}
      />

      {/* Conditionally render the toggle button for password visibility */}
      {type === PASSWORD_TYPE && (
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
