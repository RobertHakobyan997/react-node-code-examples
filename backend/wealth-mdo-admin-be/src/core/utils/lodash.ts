import { assign, isArray, isObject, memoize, merge as _merge, mergeWith } from 'lodash';

export function merge<T, S>(target: T, source: S): T & S {
  return mergeWith(target, source, (targetValue, srcValue) => isArray(targetValue)
    ? assign(targetValue, srcValue)
    : isObject(srcValue)
      ? _merge(targetValue, srcValue)
      : srcValue
  );
}

/**
 * @description Memoized function for better performance it takes x4 less time
 */
export const mergeMemo = memoize(merge);
