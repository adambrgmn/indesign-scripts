/* eslint-disable no-extend-native, no-prototype-builtins, no-void, no-bitwise, no-restricted-syntax */

if (!Array.prototype.filter) {
  Array.prototype.filter = function filter(fun, thisArg = void 0) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    const t = Object(this);
    const len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    const res = [];
    for (let i = 0; i < len; i += 1) {
      if (i in t) {
        const val = t[i];

        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}
