import parseIDNumber from "./parse.js";

// Removes all non-digit characters from the input string, leaving only the digits. This is useful for sanitizing the input before further processing.
export const sanitizeSAID = (id: string): string => {
  return id.replace(/\D/g, "");
};

// Formats a South African ID number in the standard format: "YYMMDD SSSS CAZ"
export const formatSAID = (id: string): string => {
  const sanitized = sanitizeSAID(id);
  if (sanitized.length !== 13) {
    return sanitized;
  }
  return `${sanitized.slice(0, 6)} ${sanitized.slice(6, 10)} ${sanitized.slice(10)}`;
};

// Lightweight validation function that checks if the ID number is valid by using the parseIDNumber function and returning the isValid property.
export const isValidSAID = (id: string): boolean => {
  return parseIDNumber(sanitizeSAID(id)).isValid;
};