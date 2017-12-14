/* eslint-disable no-extend-native, no-prototype-builtins, no-void, no-bitwise, no-restricted-syntax */

if (!Object.keys) {
  Object.keys = (function keys() {
    const { hasOwnProperty } = Object.prototype;
    const hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
    const dontEnums = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor',
    ];
    const dontEnumsLength = dontEnums.length;

    return obj => {
      if (
        typeof obj !== 'function' &&
        (typeof obj !== 'object' || obj === null)
      ) {
        throw new TypeError('Object.keys called on non-object');
      }

      const result = [];
      let prop;
      let i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i += 1) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  })();
}
