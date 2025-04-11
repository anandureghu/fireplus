function Log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`[LOG] ${propertyKey} called with:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`[LOG] ${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

export class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }

  @Log
  subtract(a: number, b: number): number {
    return a - b;
  }
}
