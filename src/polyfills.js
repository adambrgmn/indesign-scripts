/* eslint-disable
no-extend-native,
no-prototype-builtins,
no-void, no-bitwise,
no-restricted-syntax */

if (!Array.isArray) {
  Array.isArray = arg =>
    Object.prototype.toString.call(arg) === '[object Array]';
}

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

if (!Array.prototype.includes) {
  Array.prototype.includes = function includes(searchElement, fromIndex) {
    // 1. Let O be ? ToObject(this value).
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    const o = Object(this);

    // 2. Let len be ? ToLength(? Get(O, "length")).
    const len = o.length >>> 0;

    // 3. If len is 0, return false.
    if (len === 0) {
      return false;
    }

    // 4. Let n be ? ToInteger(fromIndex).
    //    (If fromIndex is undefined, this step produces the value 0.)
    const n = fromIndex | 0;

    // 5. If n ≥ 0, then
    //  a. Let k be n.
    // 6. Else n < 0,
    //  a. Let k be len + n.
    //  b. If k < 0, let k be 0.
    let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    function sameValueZero(x, y) {
      return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
    }

    // 7. Repeat, while k < len
    while (k < len) {
      // a. Let elementK be the result of ? Get(O, ! ToString(k)).
      // b. If SameValueZero(searchElement, elementK) is true, return true.
      // c. Increase k by 1.
      if (sameValueZero(o[k], searchElement)) {
        return true;
      }
      k += 1;
    }

    // 8. Return false
    return false;
  };
}

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function findIndex(predicate, thisArg = void 0) {
    // 1. Let O be ? ToObject(this value).
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    const o = Object(this);

    // 2. Let len be ? ToLength(? Get(O, "length")).
    const len = o.length >>> 0;

    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }

    // 5. Let k be 0.
    let k = 0;

    // 6. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ! ToString(k).
      // b. Let kValue be ? Get(O, Pk).
      // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
      // d. If testResult is true, return k.
      const kValue = o[k];

      if (predicate.call(thisArg, kValue, k, o)) {
        return k;
      }
      // e. Increase k by 1.
      k += 1;
    }

    // 7. Return -1.
    return -1;
  };
}

if (!Array.prototype.map) {
  Array.prototype.map = function map(callback, thisArg = void 0) {
    let k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this|
    //    value as the argument.
    const O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    const len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(`${callback} is not a function`);
    }

    // 6. Let A be a new array created as if by the expression new Array(len)
    //    where Array is the standard built-in constructor with that name and
    //    len is the value of len.
    const A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {
      let kValue;
      let mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {
        // i. Let kValue be the result of calling the Get internal
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal
        //     method of callback with T as the this value and argument
        //     list containing kValue, k, and O.
        mappedValue = callback.call(thisArg, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k += 1;
    }

    // 9. return A
    return A;
  };
}

if (!Object.keys) {
  Object.keys = (function keys() {
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
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

    return (obj) => {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
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
  }());
}
