/**
 * Lightweight backend input validation utilities
 */

export function validateRequired(data, requiredFields = []) {
  const missing = [];
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      missing.push(field);
    }
  }
  return {
    valid: missing.length === 0,
    missing,
  };
}

export function parsePositiveInt(val, fallback = null) {
  const num = Number(val);
  if (isNaN(num) || num <= 0) return fallback;
  return Math.floor(num);
}

export function sanitizeText(str) {
  if (typeof str !== "string") return "";
  return str.trim();
}
