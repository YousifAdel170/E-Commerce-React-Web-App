// ================================
// Arithmetic Operators
// ================================
const ARITHMETIC_OPERATOR_PLUS = "+";
const ARITHMETIC_OPERATOR_MINUS = "-";
const ARITHMETIC_OPERATOR_MULTIPLY = "*";
const ARITHMETIC_OPERATOR_DIVIDE = "/";
const ARITHMETIC_OPERATOR_MODULUS = "%";
const ARITHMETIC_OPERATOR_INCREMENT = "++";
const ARITHMETIC_OPERATOR_DECREMENT = "--";

// ================================
// Assignment Operators
// ================================
const ASSIGNMENT_EQUAL = "=";
const ASSIGNMENT_PLUS_EQUAL = "+=";
const ASSIGNMENT_MINUS_EQUAL = "-=";
const ASSIGNMENT_MULTIPLY_EQUAL = "*=";
const ASSIGNMENT_DIVIDE_EQUAL = "/=";
const ASSIGNMENT_MODULUS_EQUAL = "%=";

// ================================
// Comparison Operators
// ================================
const COMPARISON_EQUAL = "==";
const COMPARISON_NOT_EQUAL = "!=";
const COMPARISON_STRICT_EQUAL = "===";
const COMPARISON_STRICT_NOT_EQUAL = "!==";
const COMPARISON_GREATER_THAN = ">";
const COMPARISON_LESS_THAN = "<";
const COMPARISON_GREATER_EQUAL = ">=";
const COMPARISON_LESS_EQUAL = "<=";

// ================================
// Logical Operators
// ================================
const LOGICAL_AND = "&&";
const LOGICAL_OR = "||";
const LOGICAL_NOT = "!";

// ================================
// Ternary
// ================================
const TERNARY_QUESTION = "?";
const TERNARY_COLON = ":";

// ================================
// Bitwise Operators (optional)
// ================================
const BITWISE_AND = "&";
const BITWISE_OR = "|";
const BITWISE_XOR = "^";
const BITWISE_NOT = "~";
const BITWISE_LEFT_SHIFT = "<<";
const BITWISE_RIGHT_SHIFT = ">>";
const BITWISE_UNSIGNED_RIGHT_SHIFT = ">>>";

// ================================
// Misc Operators
// ================================
const TYPEOF = "typeof";
const INSTANCEOF = "instanceof";
const DELETE = "delete";
const IN = "in";

// ================================
// Exported Grouped Object
// ================================
export const OPERATORS = {
  ARITHMETIC: {
    PLUS: ARITHMETIC_OPERATOR_PLUS,
    MINUS: ARITHMETIC_OPERATOR_MINUS,
    MULTIPLY: ARITHMETIC_OPERATOR_MULTIPLY,
    DIVIDE: ARITHMETIC_OPERATOR_DIVIDE,
    MODULUS: ARITHMETIC_OPERATOR_MODULUS,
    INCREMENT: ARITHMETIC_OPERATOR_INCREMENT,
    DECREMENT: ARITHMETIC_OPERATOR_DECREMENT,
  },
  ASSIGNMENT: {
    EQUAL: ASSIGNMENT_EQUAL,
    PLUS_EQUAL: ASSIGNMENT_PLUS_EQUAL,
    MINUS_EQUAL: ASSIGNMENT_MINUS_EQUAL,
    MULTIPLY_EQUAL: ASSIGNMENT_MULTIPLY_EQUAL,
    DIVIDE_EQUAL: ASSIGNMENT_DIVIDE_EQUAL,
    MODULUS_EQUAL: ASSIGNMENT_MODULUS_EQUAL,
  },
  COMPARISON: {
    EQUAL: COMPARISON_EQUAL,
    NOT_EQUAL: COMPARISON_NOT_EQUAL,
    STRICT_EQUAL: COMPARISON_STRICT_EQUAL,
    STRICT_NOT_EQUAL: COMPARISON_STRICT_NOT_EQUAL,
    GREATER_THAN: COMPARISON_GREATER_THAN,
    LESS_THAN: COMPARISON_LESS_THAN,
    GREATER_EQUAL: COMPARISON_GREATER_EQUAL,
    LESS_EQUAL: COMPARISON_LESS_EQUAL,
  },
  LOGICAL: {
    AND: LOGICAL_AND,
    OR: LOGICAL_OR,
    NOT: LOGICAL_NOT,
  },
  TERNARY: {
    QUESTION: TERNARY_QUESTION,
    COLON: TERNARY_COLON,
  },
  BITWISE: {
    AND: BITWISE_AND,
    OR: BITWISE_OR,
    XOR: BITWISE_XOR,
    NOT: BITWISE_NOT,
    LEFT_SHIFT: BITWISE_LEFT_SHIFT,
    RIGHT_SHIFT: BITWISE_RIGHT_SHIFT,
    UNSIGNED_RIGHT_SHIFT: BITWISE_UNSIGNED_RIGHT_SHIFT,
  },
  MISC: {
    TYPEOF,
    INSTANCEOF,
    DELETE,
    IN,
  },
};
