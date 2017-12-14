/* eslint-disable no-extend-native, no-prototype-builtins, no-void, no-bitwise, no-restricted-syntax */

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function forEach(callback, thisArg = void 0) {
    let T;
    let k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    const O = Object(this);
    const len = O.length >>> 0;

    if (typeof callback !== 'function') {
      throw new TypeError(`${callback} is not a function`);
    }

    if (thisArg) {
      T = thisArg;
    }

    k = 0;

    while (k < len) {
      let kValue;

      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }

      k += 1;
    }
  };
}
