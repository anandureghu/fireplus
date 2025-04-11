// Type helpers, Firestore converters

/**
 * Pluralizes a string by adding 's' if it doesn't end with 's'
 * @param str - The string to pluralize
 * @returns The pluralized string
 * @example
 * pluralize('user') // returns 'users'
 * pluralize('users') // returns 'users'
 * pluralize('category') // returns 'categories'
 */
function pluralize(str: string): string {
  if (!str) return str;

  // If already ends with 's', return as is
  if (str.toLowerCase().endsWith("s")) {
    return str;
  }

  // Handle special case for words ending in 'y'
  if (str.toLowerCase().endsWith("y")) {
    return str.slice(0, -1) + "ies";
  }

  // Default case: just add 's'
  return str + "s";
}

/**
 * Extracts primitive properties from an object
 * @param obj - The object to extract properties from
 * @returns An object containing only primitive properties
 * @example
 * const user = {
 *   name: 'John',
 *   age: 30,
 *   address: { city: 'New York' },
 *   sayHello: () => 'Hello'
 * };
 * getPrimitiveProps(user) // returns { name: 'John', age: 30 }
 */
function getPrimitiveProps<T extends object>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    // Check if value is a primitive (string, number, boolean, null, undefined)
    // or if it's a Date object (common primitive-like object)
    if (
      value === null ||
      value === undefined ||
      typeof value !== "object" ||
      value instanceof Date
    ) {
      result[key as keyof T] = value;
    }
  }

  return result;
}

export default { pluralize, getPrimitiveProps };
