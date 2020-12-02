import { isString, isFunction, isObject, is } from "./is";

type Classes<P> = Partial<{
  $?: string;
  [key: string]: string | undefined | Classes<P> | ((props: P) => string);
}>;

type Props = Partial<{
  className?: string;
  [key: string]: unknown;
}>;

/**
 * @param classes - a recursive object that contains the class names, the inclusion of classes are determined by `props` object
 * @param props - an object that acts as a predicate for choosing the classes from `classes`
 * @return className - the resulting className
 */
export function p2c<P extends Props>(props: P, classes: Classes<P>): string {
  const className = new Set<string>();

  if (isString(props.className)) {
    className.add(props.className);
  }

  return doP2c(props, classes, className);
}

function doP2c<P extends Props>(
  props: P,
  classes: Classes<P>,
  className: Set<string>
) {
  for (const [variation, value] of Object.entries(classes)) {
    if (isString(value) && is(variation, "$")) {
      className.add(value);
      continue;
    }

    const propValue = props[variation] ?? false;
    const propValueStr = String(propValue);

    if (isString(value)) {
      if (Boolean(propValue)) {
        className.add(value);
      }
      //
    } else if (isFunction(value)) {
      className.add(value(props));
      //
    } else if (isObject(value)) {
      if (isString(value.$)) {
        className.add(value.$);
      }

      if (isString(value[propValueStr])) {
        className.add(value[propValueStr] as string);
        //
      } else if (isObject(value[propValueStr])) {
        const scopedClasses = value[propValueStr] as Classes<P>;
        doP2c(props, scopedClasses, className);
      }
    }
  }

  return [...className].join(" ").trim();
}
