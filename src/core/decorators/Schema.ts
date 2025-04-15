import FirePlus from "../Fireplus";

/**
 * Decorator that marks a class as a Firestore model.
 * This decorator:
 * 1. Extends the class with FirePlus functionality
 * 2. Automatically generates a constructor if one doesn't exist
 * 3. Initializes the FirePlus instance globally
 *
 * @example
 * ```typescript
 * @Schema()
 * class User {
 *   name: string;
 *   email: string;
 *   age: number;
 *   isActive: boolean;
 *   createdAt: Date;
 *
 *   // Constructor is automatically generated if not provided
 *   // It will initialize all properties with default values
 * }
 * ```
 *
 * @returns A class decorator function
 */
export function Schema() {
  return function <T extends new (...args: any[]) => any>(target: T) {
    // Initialize FirePlus globally if not already initialized
    // We need to provide an empty config object to satisfy the type requirements
    const emptyConfig = {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
    };

    // Initialize FirePlus with empty config if not already initialized
    FirePlus.init(emptyConfig);

    // Get the prototype of the target class
    const prototype = target.prototype;

    // Check if the class already has a constructor
    const hasConstructor = target.toString().includes("constructor(");

    // If no constructor exists, add one
    if (!hasConstructor) {
      // Get all property names from the class
      const propertyNames = Object.getOwnPropertyNames(prototype).filter(
        (name) => name !== "constructor" && !name.startsWith("__")
      );

      // Create a constructor function
      const constructorFn = function (this: any, data: any = {}) {
        // Call the parent constructor (FirePlus)
        FirePlus.prototype.constructor.call(this);

        // Initialize all properties with default values
        propertyNames.forEach((prop) => {
          if (prop in data) {
            this[prop] = data[prop];
          } else {
            // Set sensible default values
            if (prop === "createdAt" || prop === "updatedAt") {
              this[prop] = new Date();
            } else if (prop === "id") {
              this[prop] = undefined;
            } else {
              // For other properties, use null as default
              this[prop] = null;
            }
          }
        });
      };

      // Replace the constructor
      target.prototype.constructor = constructorFn;
    } else {
      // If constructor exists, ensure it calls FirePlus constructor
      const originalConstructor = target.prototype.constructor;
      target.prototype.constructor = function (this: any, ...args: any[]) {
        // Call the parent constructor (FirePlus)
        FirePlus.prototype.constructor.call(this);
        // Then call the original constructor
        return originalConstructor.apply(this, args);
      };
    }

    // Extend the class with FirePlus
    // This is the key part - we're setting the prototype chain correctly
    // so that the class inherits from FirePlus
    const firePlusPrototype = FirePlus.prototype;
    Object.setPrototypeOf(target.prototype, firePlusPrototype);
  };
}
