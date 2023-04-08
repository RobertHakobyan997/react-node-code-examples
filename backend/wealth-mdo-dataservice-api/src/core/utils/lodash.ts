import {
  assign,
  isArray,
  isObject,
  memoize,
  merge as _merge,
  mergeWith,
} from 'lodash';

export function merge<T, S>(target: T, source: S): T & S {
  return mergeWith(target, source, (targetValue, srcValue) => {
    if (isArray(targetValue)) {
      // assign only array of entities, return src if array of primitives
      if (srcValue.every(s => isObject(s))) {
        return assign(targetValue, srcValue);
      }
      return srcValue;
    }
    if (isObject(srcValue)) {
      return _merge(targetValue, srcValue);
    }
    return srcValue;
  });
}

/**
 * @description Memoized function for better performance it takes x4 less time
 */
export const mergeMemo = memoize(merge);
