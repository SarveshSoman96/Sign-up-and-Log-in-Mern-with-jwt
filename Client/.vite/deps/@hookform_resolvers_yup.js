import {
  appendErrors,
  get,
  set
} from "./chunk-IWUE5V3T.js";
import "./chunk-ST3U5LCA.js";
import "./chunk-DFKQJ226.js";

// node_modules/@hookform/resolvers/dist/resolvers.mjs
var e = function(i, e2, t2) {
  if (i && "reportValidity" in i) {
    var f2 = get(t2, e2);
    i.setCustomValidity(f2 && f2.message || ""), i.reportValidity();
  }
};
var t = function(r, i) {
  var t2 = function(t3) {
    var f3 = i.fields[t3];
    f3 && f3.ref && "reportValidity" in f3.ref ? e(f3.ref, t3, r) : f3.refs && f3.refs.forEach(function(i2) {
      return e(i2, t3, r);
    });
  };
  for (var f2 in i.fields)
    t2(f2);
};
var f = function(e2, f2) {
  f2.shouldUseNativeValidation && t(e2, f2);
  var o2 = {};
  for (var a in e2) {
    var n = get(f2.fields, a);
    set(o2, a, Object.assign(e2[a] || {}, { ref: n && n.ref }));
  }
  return o2;
};

// node_modules/@hookform/resolvers/yup/dist/yup.mjs
var o = function(o2, n, a) {
  return void 0 === n && (n = {}), void 0 === a && (a = {}), function(s, i, c) {
    try {
      return Promise.resolve(function(t2, r) {
        try {
          var u = (n.context && true && console.warn("You should not used the yup options context. Please, use the 'useForm' context object instead"), Promise.resolve(o2["sync" === a.mode ? "validateSync" : "validate"](s, Object.assign({ abortEarly: false }, n, { context: i }))).then(function(t3) {
            return c.shouldUseNativeValidation && t({}, c), { values: a.raw ? s : t3, errors: {} };
          }));
        } catch (e2) {
          return r(e2);
        }
        return u && u.then ? u.then(void 0, r) : u;
      }(0, function(e2) {
        if (!e2.inner)
          throw e2;
        return { values: {}, errors: f((o3 = e2, n2 = !c.shouldUseNativeValidation && "all" === c.criteriaMode, (o3.inner || []).reduce(function(e3, t2) {
          if (e3[t2.path] || (e3[t2.path] = { message: t2.message, type: t2.type }), n2) {
            var o4 = e3[t2.path].types, a2 = o4 && o4[t2.type];
            e3[t2.path] = appendErrors(t2.path, n2, e3, t2.type, a2 ? [].concat(a2, t2.message) : t2.message);
          }
          return e3;
        }, {})), c) };
        var o3, n2;
      }));
    } catch (e2) {
      return Promise.reject(e2);
    }
  };
};
export {
  o as yupResolver
};
//# sourceMappingURL=@hookform_resolvers_yup.js.map
