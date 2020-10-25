import { not } from ".";

export function isObject(x: unknown): x is Object {
  return is(Object.prototype.toString.call(x), "[object Object]");
}

export function isFunction(x: unknown): x is Function {
  return (
    is(Object.prototype.toString.call(x), "[object AsyncFunction]") ||
    is(Object.prototype.toString.call(x), "[object Function]")
  );
}

export function isString(x: unknown): x is string {
  return is(typeof x, "string");
}

export function isBoolean(x: unknown): x is boolean {
  return is(typeof x, "boolean");
}

export function isNull(x: unknown): x is null {
  return is(x, null);
}

export function isUndefined(x: unknown): x is undefined {
  return is(typeof x, "undefined");
}

export function isNil(x: unknown): x is null | undefined {
  return isUndefined(x) || isNull(x);
}

export function isNotNil<T>(x: T | Nil): x is T {
  return not(isNil(x));
}

export const is = Object.is;
