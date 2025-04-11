import FirePlus from "../Fireplus";

// @Schema decorator
export function Schema() {
  return function <T extends new (...args: any[]) => {}>(target: T) {
    Object.getOwnPropertyNames(FirePlus.prototype).forEach((key) => {
      if (
        key !== "constructor" &&
        key !== "init" &&
        key !== "instance" &&
        key !== "db" &&
        key !== "app"
      ) {
        target.prototype[key] = FirePlus.prototype[key as keyof FirePlus];
      }
    });

    // Copy instance properties
    const baseInstance = FirePlus.init();
    Object.entries(baseInstance).forEach(([key, value]) => {
      Object.defineProperty(target.prototype, key, {
        value,
        writable: false,
        configurable: false,
      });
    });
  };
}
