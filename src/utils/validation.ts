/**
 * Strict Input Validation Helpers for SkillBridge (Play Store Production Ready)
 */

// Only alphabets and spaces (no numbers, no special symbols)
export function isValidName(name: string): boolean {
  if (!name || name.trim().length < 2) return false;
  return /^[A-Za-z\s]+$/.test(name.trim());
}

// Sanitizes name input in real-time by stripping non-alphabet characters
export function sanitizeName(input: string): string {
  return input.replace(/[^A-Za-z\s]/g, "");
}

// Validates age: must be numeric and between 13 and 100
export function isValidAge(age: string | number): boolean {
  const num = typeof age === "string" ? parseInt(age.trim(), 10) : age;
  return !isNaN(num) && num >= 13 && num <= 100;
}

// Sanitizes age in real-time (digits only, max 3 chars)
export function sanitizeAge(input: string): string {
  return input.replace(/[^0-9]/g, "").slice(0, 3);
}

// Validates city: only alphabets and spaces
export function isValidCity(city: string): boolean {
  if (!city || city.trim().length < 2) return false;
  return /^[A-Za-z\s]+$/.test(city.trim());
}

// Sanitizes city in real-time
export function sanitizeCity(input: string): string {
  return input.replace(/[^A-Za-z\s]/g, "");
}

// Validates email address
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Validates experience years (0 to 60)
export function isValidExperience(exp: string | number): boolean {
  const num = typeof exp === "string" ? parseInt(exp.trim(), 10) : exp;
  return !isNaN(num) && num >= 0 && num <= 60;
}

export function sanitizeNumber(input: string): string {
  return input.replace(/[^0-9]/g, "").slice(0, 2);
}
