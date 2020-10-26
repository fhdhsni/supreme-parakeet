import { isString, isFunction, isObject, is } from ".";

type Classes = Partial<{
  $all: string;
  [key: string]: string | Classes | ((props: Props) => string);
}>;

type Props = Partial<{
  className: string;
  [key: string]: unknown;
}>;

/**
 * @param classes - a recursive object that contains the class names, the inclusion of classes are determined by `props` object
 * @param props - an object that acts as a predicate for choosing the classes from `classes`
 * @param className - the resulting className
 */
export function p2c(classes: Classes, props: Props): string {
  const className = new Set<string>();

  if (isString(props.className)) {
    className.add(props.className);
  }

  return doP2c(classes, props, className);
}

function doP2c(classes: Classes, props: Props, className: Set<string>) {
  for (const [variation, value] of Object.entries(classes)) {
    if (isString(value) && is(variation, "$all")) {
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
      if (isString(value.$all)) {
        className.add(value.$all);
      }

      if (isString(value[propValueStr])) {
        className.add(value[propValueStr] as string);
        //
      } else if (isObject(value[propValueStr])) {
        const scopedClasses = value[propValueStr] as Classes;
        doP2c(scopedClasses, props, className);
      }
    }
  }

  return [...className].join(" ").trim();
}
