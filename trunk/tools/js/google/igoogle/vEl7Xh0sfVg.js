function igRF_a(a) {
	throw a;
}
var igRF_b = true, igRF_c = null, igRF_d = false, igRF_e = window.google || {};
igRF_e.global = this;
function igRF_f(a) {
	for (var b = a.split("."), c = igRF_e.global, d; d = b.shift();)
		c = c[d] ? c[d] : (c[d] = {})
};
var igRF_g = igRF_d;
function igRF_h(a) {
	try {
		igRF_a(a)
	} catch (b) {
		igRF_i(b)
	}
}
function igRF_i(a, b) {
	var c = "Javascript exception: " + (b ? b : "") + " " + a;
	if (igRF_j("msie") && !window.opera)
		c += " " + a.name + ": " + a.message + " (" + a.number + ")";
	var d = "";
	if (typeof a == "string")
		d = a + "\n";
	else
		for (var e in a)
			try {
				d += e + ": " + a[e] + "\n"
			} catch (f) {
			}
	d += igRF_k(igRF_i.caller);
	igRF_l(c + "\n" + d, 1)
}
var igRF_m = /function (\w+)/;
function igRF_n(a) {
	var b = igRF_m.exec(String(a));
	if (b)
		return b[1];
	return ""
}
function igRF_k(a) {
	try {
		if (!(igRF_j("msie") && !window.opera)
				&& !(igRF_j("safari") || igRF_j("konqueror"))
				&& igRF_j("mozilla"))
			return Error().stack;
		if (!a)
			return "";
		for (var b = "- " + igRF_n(a) + "(", c = 0; c < a.arguments.length; c++) {
			if (c > 0)
				b += ", ";
			var d = String(a.arguments[c]);
			if (d.length > 40)
				d = d.substr(0, 40) + "...";
			b += d
		}
		b += ")\n";
		b += igRF_k(a.caller);
		return b
	} catch (e) {
		return "[Cannot get stack trace]: " + e + "\n"
	}
}
var igRF_o, igRF_p = igRF_c, igRF_q = igRF_d;
function igRF_r() {
	if ((igRF_p == igRF_c || igRF_p.closed) && !igRF_q)
		try {
			igRF_q = igRF_b;
			igRF_p = window
					.open(
							"",
							"debug",
							"width=700,height=500,toolbar=no,resizable=yes,scrollbars=yes,left=16,top=16,screenx=16,screeny=16");
			igRF_p.blur();
			igRF_p.document.open();
			igRF_q = igRF_d;
			var a = "<font color=#ff0000><b>To turn off this debugging window,hit 'D' inside the main caribou window, then close this window.</b></font><br>";
			igRF_s(a)
		} catch (b) {
		}
}
function igRF_l(a, b) {
	if (igRF_g) {
		try {
			var c = (new Date).getTime() - igRF_o, d = "[" + c + "] "
					+ igRF_t(a).replace(/\n/g, "<br>") + "<br>";
			if (b == 1) {
				d = "<font color=#ff0000><b>Error: " + d + "</b></font>";
				igRF_p.focus()
			}
		} catch (e) {
		}
		igRF_s(d)
	} else
		typeof igRF_u != "undefined" && igRF_u(igRF_t(a))
}
function igRF_s(a) {
	if (igRF_g)
		try {
			igRF_r();
			igRF_p.document.write(a);
			igRF_p.scrollTo(0, 1000000)
		} catch (b) {
		}
};
function igRF_j(a) {
	if (a in igRF_v)
		return igRF_v[a];
	return igRF_v[a] = navigator.userAgent.toLowerCase().indexOf(a) != -1
}
var igRF_v = {}, igRF_w = /&/g, igRF_x = /</g, igRF_y = />/g;
function igRF_t(a) {
	if (!a)
		return "";
	return a.replace(igRF_w, "&amp;").replace(igRF_x, "&lt;").replace(igRF_y,
			"&gt;").replace(igRF_z, "&quot;")
}
var igRF_z = /\"/g;
function igRF_A(a) {
	return document.getElementById(a)
}
function igRF_B(a) {
	return document.all[a]
}
var igRF_C = document.getElementById ? igRF_A : igRF_B;
function igRF_u(a) {
	try {
		if (window.parent != window && window.parent.log) {
			window.parent.log(window.name + "::" + a);
			return
		}
	} catch (b) {
	}
	var c = igRF_C("log");
	if (c) {
		var d = "<p class=logentry><span class=logdate>" + new Date
				+ "</span><span class=logmsg>" + a + "</span></p>";
		c.innerHTML = d + c.innerHTML
	} else
		window.status = a
};
function igRF_D() {
}
igRF_D.raise = function(a) {
	if (typeof Error != "undefined")
		igRF_a(new Error(a || "Assertion Failed"));
	else
		igRF_a(a)
};
igRF_D.fail = function(a) {
	a = a || "Assertion failed";
	typeof igRF_h == "undefined" || igRF_h(a + "\n");
	igRF_D.raise(a)
};
igRF_D.isTrue = function(a, b) {
	if (!a) {
		if (b === undefined)
			b = "Assertion failed";
		igRF_D.fail(b)
	}
};
igRF_D.equals = function(a, b, c) {
	if (a != b) {
		if (c === undefined)
			c = "AS_Assert.equals failed: <" + a + "> != <" + b + ">";
		igRF_D.fail(c)
	}
};
igRF_D.typeOf = function(a, b, c) {
	if (!(typeof a == b)) {
		if (a || a == "")
			try {
				if (b == igRF_D.TYPE_MAP[typeof a] || a instanceof b)
					return
			} catch (d) {
			}
		if (c === undefined) {
			if (typeof b == "function") {
				var e = b.toString().match(/^\s*function\s+([^\s\{]+)/);
				if (e)
					b = e[1]
			}
			c = "AS_Assert.typeOf failed: <" + a + "> not typeof " + b
		}
		igRF_D.fail(c)
	}
};
igRF_D.TYPE_MAP = {
	string : String,
	number : Number,
	"boolean" : Boolean
};
igRF_D.numArgs = function(a, b) {
	var c = igRF_D.numArgs.caller;
	if (c && c.arguments.length != a) {
		if (b === undefined)
			b = c.name + " expected " + a + " arguments  but received "
					+ c.arguments.length;
		igRF_D.fail(b)
	}
};
var igRF_E;
function igRF_F() {
	var a = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP",
			"Microsoft.XMLHTTP"];
	if (typeof XMLHttpRequest == "undefined"
			&& typeof ActiveXObject != "undefined") {
		for (var b = 0; b < a.length; b++) {
			var c = a[b];
			try {
				new ActiveXObject(c);
				igRF_E = c;
				break
			} catch (d) {
			}
		}
		if (!igRF_E)
			igRF_a(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed."))
	}
}
igRF_F();
function igRF_G(a, b, c) {
	a.open("GET", b, igRF_b);
	a.onreadystatechange = c;
	igRF_H(a, igRF_c)
}
function igRF_H(a, b) {
	try {
		a.send(b)
	} catch (c) {
		igRF_u("XMLHttpSend failed " + c.toString() + "<br>" + c.stack);
		igRF_a(c)
	}
};
if ("undefined" == typeof igRF_u)
	igRF_u = function() {
	};
var igRF_ = igRF_ || {};
igRF_.global = this;
igRF_.DEBUG = igRF_b;
igRF_.LOCALE = "en_US";
igRF_.ec = igRF_c;
igRF_.provide = function(a) {
	igRF_.We(a)
};
igRF_.We = function(a, b, c) {
	var d = a.split("."), e = c || igRF_.global;
	!(d[0] in e) && e.execScript && e.execScript("var " + d[0]);
	for (var f; d.length && (f = d.shift());)
		if (!d.length && igRF_.isDef(b))
			e[f] = b;
		else
			e = e[f] ? e[f] : (e[f] = {})
};
igRF_.getObjectByName = function(a, b) {
	for (var c = a.split("."), d = b || igRF_.global, e; e = c.shift();)
		if (d[e])
			d = d[e];
		else
			return igRF_c;
	return d
};
igRF_.globalize = function(a, b) {
	var c = b || igRF_.global;
	for (var d in a)
		c[d] = a[d]
};
igRF_.addDependency = function() {
};
igRF_.require = function() {
};
igRF_.useStrictRequires = igRF_d;
igRF_.basePath = "";
igRF_.nullFunction = function() {
};
igRF_.identityFunction = function() {
	return arguments[0]
};
igRF_.abstractMethod = function() {
	igRF_a(Error("unimplemented abstract method"))
};
igRF_.addSingletonGetter = function(a) {
	a.getInstance = function() {
		return a.uh || (a.uh = new a)
	}
};
igRF_.typeOf = function(a) {
	var b = typeof a;
	if (b == "object")
		if (a) {
			if (a instanceof Array || !(a instanceof Object)
					&& Object.prototype.toString.call(a) == "[object Array]"
					|| typeof a.length == "number"
					&& typeof a.splice != "undefined"
					&& typeof a.propertyIsEnumerable != "undefined"
					&& !a.propertyIsEnumerable("splice"))
				return "array";
			if (!(a instanceof Object)
					&& (Object.prototype.toString.call(a) == "[object Function]" || typeof a.call != "undefined"
							&& typeof a.propertyIsEnumerable != "undefined"
							&& !a.propertyIsEnumerable("call")))
				return "function"
		} else
			return "null";
	else if (b == "function" && typeof a.call == "undefined")
		return "object";
	return b
};
igRF_.Ch = function(a, b) {
	if (b in a)
		for (var c in a)
			if (c == b && Object.prototype.hasOwnProperty.call(a, b))
				return igRF_b;
	return igRF_d
};
igRF_.Uh = function(a, b) {
	return a instanceof Object ? Object.prototype.propertyIsEnumerable.call(a,
			b) : igRF_.Ch(a, b)
};
igRF_.isDef = function(a) {
	return a !== undefined
};
igRF_.isNull = function(a) {
	return a === igRF_c
};
igRF_.isDefAndNotNull = function(a) {
	return a != igRF_c
};
igRF_.isArray = function(a) {
	return igRF_.typeOf(a) == "array"
};
igRF_.isArrayLike = function(a) {
	var b = igRF_.typeOf(a);
	return b == "array" || b == "object" && typeof a.length == "number"
};
igRF_.isDateLike = function(a) {
	return igRF_.isObject(a) && typeof a.getFullYear == "function"
};
igRF_.isString = function(a) {
	return typeof a == "string"
};
igRF_.isBoolean = function(a) {
	return typeof a == "boolean"
};
igRF_.isNumber = function(a) {
	return typeof a == "number"
};
igRF_.isFunction = function(a) {
	return igRF_.typeOf(a) == "function"
};
igRF_.isObject = function(a) {
	var b = igRF_.typeOf(a);
	return b == "object" || b == "array" || b == "function"
};
igRF_.getHashCode = function(a) {
	if (a.hasOwnProperty && a.hasOwnProperty(igRF_.Fa))
		return a[igRF_.Fa];
	a[igRF_.Fa] || (a[igRF_.Fa] = ++igRF_.sh);
	return a[igRF_.Fa]
};
igRF_.removeHashCode = function(a) {
	"removeAttribute" in a && a.removeAttribute(igRF_.Fa);
	try {
		delete a[igRF_.Fa]
	} catch (b) {
	}
};
igRF_.Fa = "closure_hashCode_"
		+ Math.floor(Math.random() * 2147483648).toString(36);
igRF_.sh = 0;
igRF_.cloneObject = function(a) {
	var b = igRF_.typeOf(a);
	if (b == "object" || b == "array") {
		if (a.clone)
			return a.clone.call(a);
		var c = b == "array" ? [] : {};
		for (var d in a)
			c[d] = igRF_.cloneObject(a[d]);
		return c
	}
	return a
};
igRF_.bind = function(a, b) {
	var c = b || igRF_.global;
	if (arguments.length > 2) {
		var d = Array.prototype.slice.call(arguments, 2);
		return function() {
			var e = Array.prototype.slice.call(arguments);
			Array.prototype.unshift.apply(e, d);
			return a.apply(c, e)
		}
	} else
		return function() {
			return a.apply(c, arguments)
		}
};
igRF_.partial = function(a) {
	var b = Array.prototype.slice.call(arguments, 1);
	return function() {
		var c = Array.prototype.slice.call(arguments);
		c.unshift.apply(c, b);
		return a.apply(this, c)
	}
};
igRF_.mixin = function(a, b) {
	for (var c in b)
		a[c] = b[c]
};
igRF_.now = Date.now || function() {
	return (new Date).getTime()
};
igRF_.globalEval = function(a) {
	if (igRF_.global.execScript)
		igRF_.global.execScript(a, "JavaScript");
	else if (igRF_.global.eval) {
		if (igRF_.ec == igRF_c) {
			igRF_.global.eval("var _et_ = 1;");
			if (typeof igRF_.global._et_ != "undefined") {
				delete igRF_.global._et_;
				igRF_.ec = igRF_b
			} else
				igRF_.ec = igRF_d
		}
		if (igRF_.ec)
			igRF_.global.eval(a);
		else {
			var b = igRF_.global.document, c = b.createElement("script");
			c.type = "text/javascript";
			c.defer = igRF_d;
			c.appendChild(b.createTextNode(a));
			b.body.appendChild(c);
			b.body.removeChild(c)
		}
	} else
		igRF_a(Error("goog.globalEval not available"))
};
igRF_.typedef = igRF_b;
igRF_.getCssName = function(a, b) {
	var c = a + (b ? "-" + b : "");
	return igRF_.Tc && c in igRF_.Tc ? igRF_.Tc[c] : c
};
igRF_.setCssNameMapping = function(a) {
	igRF_.Tc = a
};
igRF_.getMsg = function(a, b) {
	var c = b || {};
	for (var d in c)
		a = a.replace(new RegExp("\\{\\$" + d + "\\}", "gi"), c[d]);
	return a
};
igRF_.exportSymbol = function(a, b, c) {
	igRF_.We(a, b, c)
};
igRF_.exportProperty = function(a, b, c) {
	a[b] = c
};
igRF_.inherits = function(a, b) {
	function c() {
	}
	c.prototype = b.prototype;
	a.Aa = b.prototype;
	a.prototype = new c;
	a.prototype.constructor = a
};
igRF_.MODIFY_FUNCTION_PROTOTYPES = igRF_b;
if (igRF_.MODIFY_FUNCTION_PROTOTYPES) {
	Function.prototype.bind = function(a) {
		if (arguments.length > 1) {
			var b = Array.prototype.slice.call(arguments, 1);
			b.unshift(this, a);
			return igRF_.bind.apply(igRF_c, b)
		} else
			return igRF_.bind(this, a)
	};
	Function.prototype.partial = function() {
		var a = Array.prototype.slice.call(arguments);
		a.unshift(this, igRF_c);
		return igRF_.bind.apply(igRF_c, a)
	};
	Function.prototype.inherits = function(a) {
		igRF_.inherits(this, a)
	};
	Function.prototype.mixin = function(a) {
		igRF_.mixin(this.prototype, a)
	}
};
igRF_.array = {};
igRF_.array.ArrayLike = igRF_.typedef;
igRF_.array.peek = function(a) {
	return a[a.length - 1]
};
igRF_.array.indexOf = function(a, b, c) {
	if (a.indexOf)
		return a.indexOf(b, c);
	if (Array.indexOf)
		return Array.indexOf(a, b, c);
	for (var d = c == igRF_c ? 0 : c < 0 ? Math.max(0, a.length + c) : c, e = d; e < a.length; e++)
		if (e in a && a[e] === b)
			return e;
	return -1
};
igRF_.array.lastIndexOf = function(a, b, c) {
	var d = c == igRF_c ? a.length - 1 : c;
	if (a.lastIndexOf)
		return a.lastIndexOf(b, d);
	if (Array.lastIndexOf)
		return Array.lastIndexOf(a, b, d);
	if (d < 0)
		d = Math.max(0, a.length + d);
	for (var e = d; e >= 0; e--)
		if (e in a && a[e] === b)
			return e;
	return -1
};
igRF_.array.forEach = function(a, b, c) {
	if (a.forEach)
		a.forEach(b, c);
	else if (Array.forEach)
		Array.forEach(a, b, c);
	else
		for (var d = a.length, e = igRF_.isString(a) ? a.split("") : a, f = 0; f < d; f++)
			f in e && b.call(c, e[f], f, a)
};
igRF_.array.forEachRight = function(a, b, c) {
	for (var d = a.length, e = igRF_.isString(a) ? a.split("") : a, f = d - 1; f >= 0; --f)
		f in e && b.call(c, e[f], f, a)
};
igRF_.array.filter = function(a, b, c) {
	if (a.filter)
		return a.filter(b, c);
	if (Array.filter)
		return Array.filter(a, b, c);
	for (var d = a.length, e = [], f = 0, g = igRF_.isString(a)
			? a.split("")
			: a, h = 0; h < d; h++)
		if (h in g) {
			var i = g[h];
			if (b.call(c, i, h, a))
				e[f++] = i
		}
	return e
};
igRF_.array.map = function(a, b, c) {
	if (a.map)
		return a.map(b, c);
	if (Array.map)
		return Array.map(a, b, c);
	for (var d = a.length, e = [], f = 0, g = igRF_.isString(a)
			? a.split("")
			: a, h = 0; h < d; h++)
		if (h in g)
			e[f++] = b.call(c, g[h], h, a);
	return e
};
igRF_.array.reduce = function(a, b, c, d) {
	if (a.reduce)
		return d ? a.reduce(igRF_.bind(b, d), c) : a.reduce(b, c);
	var e = c;
	igRF_.array.forEach(a, function(f, g) {
				e = b.call(d, e, f, g, a)
			});
	return e
};
igRF_.array.reduceRight = function(a, b, c, d) {
	if (a.reduceRight)
		return d ? a.reduceRight(igRF_.bind(b, d), c) : a.reduceRight(b, c);
	var e = c;
	igRF_.array.forEachRight(a, function(f, g) {
				e = b.call(d, e, f, g, a)
			});
	return e
};
igRF_.array.some = function(a, b, c) {
	if (a.some)
		return a.some(b, c);
	if (Array.some)
		return Array.some(a, b, c);
	for (var d = a.length, e = igRF_.isString(a) ? a.split("") : a, f = 0; f < d; f++)
		if (f in e && b.call(c, e[f], f, a))
			return igRF_b;
	return igRF_d
};
igRF_.array.every = function(a, b, c) {
	if (a.every)
		return a.every(b, c);
	if (Array.every)
		return Array.every(a, b, c);
	for (var d = a.length, e = igRF_.isString(a) ? a.split("") : a, f = 0; f < d; f++)
		if (f in e && !b.call(c, e[f], f, a))
			return igRF_d;
	return igRF_b
};
igRF_.array.find = function(a, b, c) {
	var d = igRF_.array.findIndex(a, b, c);
	return d < 0 ? igRF_c : igRF_.isString(a) ? a.charAt(d) : a[d]
};
igRF_.array.findIndex = function(a, b, c) {
	for (var d = a.length, e = igRF_.isString(a) ? a.split("") : a, f = 0; f < d; f++)
		if (f in e && b.call(c, e[f], f, a))
			return f;
	return -1
};
igRF_.array.findRight = function(a, b, c) {
	var d = igRF_.array.findIndexRight(a, b, c);
	return d < 0 ? igRF_c : igRF_.isString(a) ? a.charAt(d) : a[d]
};
igRF_.array.findIndexRight = function(a, b, c) {
	for (var d = a.length, e = igRF_.isString(a) ? a.split("") : a, f = d - 1; f >= 0; f--)
		if (f in e && b.call(c, e[f], f, a))
			return f;
	return -1
};
igRF_.array.contains = function(a, b) {
	if (a.contains)
		return a.contains(b);
	return igRF_.array.indexOf(a, b) > -1
};
igRF_.array.l = function(a) {
	return a.length == 0
};
igRF_.array.clear = function(a) {
	if (!igRF_.isArray(a))
		for (var b = a.length - 1; b >= 0; b--)
			delete a[b];
	a.length = 0
};
igRF_.array.insert = function(a, b) {
	igRF_.array.contains(a, b) || a.push(b)
};
igRF_.array.insertAt = function(a, b, c) {
	igRF_.array.splice(a, c, 0, b)
};
igRF_.array.insertArrayAt = function(a, b, c) {
	igRF_.partial(igRF_.array.splice, a, c, 0).apply(igRF_c, b)
};
igRF_.array.insertBefore = function(a, b, c) {
	var d;
	arguments.length == 2 || (d = igRF_.array.indexOf(a, c)) == -1
			? a.push(b)
			: igRF_.array.insertAt(a, b, d)
};
igRF_.array.remove = function(a, b) {
	var c = igRF_.array.indexOf(a, b), d;
	if (d = c != -1)
		igRF_.array.removeAt(a, c);
	return d
};
igRF_.array.removeAt = function(a, b) {
	return Array.prototype.splice.call(a, b, 1).length == 1
};
igRF_.array.removeIf = function(a, b, c) {
	var d = igRF_.array.findIndex(a, b, c);
	if (d >= 0) {
		igRF_.array.removeAt(a, d);
		return igRF_b
	}
	return igRF_d
};
igRF_.array.clone = function(a) {
	if (igRF_.isArray(a))
		return a.concat();
	else {
		for (var b = [], c = 0, d = a.length; c < d; c++)
			b[c] = a[c];
		return b
	}
};
igRF_.array.toArray = function(a) {
	if (igRF_.isArray(a))
		return a.concat();
	return igRF_.array.clone(a)
};
igRF_.array.extend = function(a) {
	for (var b = 1; b < arguments.length; b++) {
		var c = arguments[b];
		if (igRF_.isArrayLike(c)) {
			c = igRF_.array.toArray(c);
			a.push.apply(a, c)
		} else
			a.push(c)
	}
};
igRF_.array.splice = function(a) {
	return Array.prototype.splice.apply(a, igRF_.array.slice(arguments, 1))
};
igRF_.array.slice = function(a, b, c) {
	return arguments.length <= 2
			? Array.prototype.slice.call(a, b)
			: Array.prototype.slice.call(a, b, c)
};
igRF_.array.removeDuplicates = function(a, b) {
	for (var c = b || a, d = {}, e = 0, f = 0; f < a.length;) {
		var g = a[f++], h = igRF_.isObject(g) ? igRF_.getHashCode(g) : g;
		if (!Object.prototype.hasOwnProperty.call(d, h)) {
			d[h] = igRF_b;
			c[e++] = g
		}
	}
	c.length = e
};
igRF_.array.binarySearch = function(a, b, c) {
	for (var d = 0, e = a.length - 1, f = c || igRF_.array.defaultCompare; d <= e;) {
		var g = d + e >> 1, h = f(b, a[g]);
		if (h > 0)
			d = g + 1;
		else if (h < 0)
			e = g - 1;
		else
			return g
	}
	return -(d + 1)
};
igRF_.array.sort = function(a, b) {
	Array.prototype.sort.call(a, b || igRF_.array.defaultCompare)
};
igRF_.array.stableSort = function(a, b) {
	for (var c = 0; c < a.length; c++)
		a[c] = {
			index : c,
			value : a[c]
		};
	var d = b || igRF_.array.defaultCompare;
	function e(f, g) {
		return d(f.value, g.value) || f.index - g.index
	}
	igRF_.array.sort(a, e);
	for (c = 0; c < a.length; c++)
		a[c] = a[c].value
};
igRF_.array.sortObjectsByKey = function(a, b, c) {
	var d = c || igRF_.array.defaultCompare;
	igRF_.array.sort(a, function(e, f) {
				return d(e[b], f[b])
			})
};
igRF_.array.equals = function(a, b, c) {
	if (!igRF_.isArrayLike(a) || !igRF_.isArrayLike(b) || a.length != b.length)
		return igRF_d;
	for (var d = a.length, e = c || igRF_.array.defaultCompareEquality, f = 0; f < d; f++)
		if (!e(a[f], b[f]))
			return igRF_d;
	return igRF_b
};
igRF_.array.compare = function(a, b, c) {
	return igRF_.array.equals(a, b, c)
};
igRF_.array.defaultCompare = function(a, b) {
	return a > b ? 1 : a < b ? -1 : 0
};
igRF_.array.defaultCompareEquality = function(a, b) {
	return a === b
};
igRF_.array.binaryInsert = function(a, b, c) {
	var d = igRF_.array.binarySearch(a, b, c);
	if (d < 0) {
		igRF_.array.insertAt(a, b, -(d + 1));
		return igRF_b
	}
	return igRF_d
};
igRF_.array.binaryRemove = function(a, b, c) {
	var d = igRF_.array.binarySearch(a, b, c);
	return d >= 0 ? igRF_.array.removeAt(a, d) : igRF_d
};
igRF_.array.bucket = function(a, b) {
	for (var c = {}, d = 0; d < a.length; d++) {
		var e = a[d], f = b(e, d, a);
		if (igRF_.isDef(f)) {
			var g = c[f] || (c[f] = []);
			g.push(e)
		}
	}
	return c
};
igRF_.array.repeat = function(a, b) {
	for (var c = [], d = 0; d < b; d++)
		c[d] = a;
	return c
};
igRF_.array.flatten = function() {
	for (var a = [], b = 0; b < arguments.length; b++) {
		var c = arguments[b];
		igRF_.isArray(c) ? a.push
				.apply(a, igRF_.array.flatten.apply(igRF_c, c)) : a.push(c)
	}
	return a
};
igRF_.array.rotate = function(a, b) {
	if (a.length) {
		b %= a.length;
		if (b > 0)
			Array.prototype.unshift.apply(a, a.splice(-b, b));
		else
			b < 0 && Array.prototype.push.apply(a, a.splice(0, -b))
	}
	return a
};
igRF_.iter = {};
igRF_.iter.Iterable = igRF_.typedef;
igRF_.iter.StopIteration = "StopIteration" in igRF_.global
		? igRF_.global.StopIteration
		: Error("StopIteration");
igRF_.iter.Iterator = function() {
};
igRF_.iter.Iterator.prototype.next = function() {
	igRF_a(igRF_.iter.StopIteration)
};
igRF_.iter.Iterator.prototype.__iterator__ = function() {
	return this
};
igRF_.iter.toIterator = function(a) {
	if (a instanceof igRF_.iter.Iterator)
		return a;
	if (typeof a.__iterator__ == "function")
		return a.__iterator__(igRF_d);
	if (igRF_.isArrayLike(a)) {
		var b = 0, c = new igRF_.iter.Iterator;
		c.next = function() {
			for (; 1;) {
				if (b >= a.length)
					igRF_a(igRF_.iter.StopIteration);
				if (b in a)
					return a[b++];
				else
					b++
			}
		};
		return c
	}
	igRF_a(Error("Not implemented"))
};
igRF_.iter.forEach = function(a, b, c) {
	if (igRF_.isArrayLike(a))
		try {
			igRF_.array.forEach(a, b, c)
		} catch (d) {
			if (d !== igRF_.iter.StopIteration)
				igRF_a(d)
		}
	else {
		a = igRF_.iter.toIterator(a);
		try {
			for (; 1;)
				b.call(c, a.next(), undefined, a)
		} catch (e) {
			if (e !== igRF_.iter.StopIteration)
				igRF_a(e)
		}
	}
};
igRF_.iter.filter = function(a, b, c) {
	a = igRF_.iter.toIterator(a);
	var d = new igRF_.iter.Iterator;
	d.next = function() {
		for (; 1;) {
			var e = a.next();
			if (b.call(c, e, undefined, a))
				return e
		}
	};
	return d
};
igRF_.iter.range = function(a, b, c) {
	var d = 0, e = a, f = c || 1;
	if (arguments.length > 1) {
		d = a;
		e = b
	}
	if (f == 0)
		igRF_a(Error("Range step argument must not be zero"));
	var g = new igRF_.iter.Iterator;
	g.next = function() {
		if (f > 0 && d >= e || f < 0 && d <= e)
			igRF_a(igRF_.iter.StopIteration);
		var h = d;
		d += f;
		return h
	};
	return g
};
igRF_.iter.join = function(a, b) {
	return igRF_.iter.toArray(a).join(b)
};
igRF_.iter.map = function(a, b, c) {
	a = igRF_.iter.toIterator(a);
	var d = new igRF_.iter.Iterator;
	d.next = function() {
		for (; 1;) {
			var e = a.next();
			return b.call(c, e, undefined, a)
		}
	};
	return d
};
igRF_.iter.reduce = function(a, b, c, d) {
	var e = c;
	igRF_.iter.forEach(a, function(f) {
				e = b.call(d, e, f)
			});
	return e
};
igRF_.iter.some = function(a, b, c) {
	a = igRF_.iter.toIterator(a);
	try {
		for (; 1;)
			if (b.call(c, a.next(), undefined, a))
				return igRF_b
	} catch (d) {
		if (d !== igRF_.iter.StopIteration)
			igRF_a(d)
	}
	return igRF_d
};
igRF_.iter.every = function(a, b, c) {
	a = igRF_.iter.toIterator(a);
	try {
		for (; 1;)
			if (!b.call(c, a.next(), undefined, a))
				return igRF_d
	} catch (d) {
		if (d !== igRF_.iter.StopIteration)
			igRF_a(d)
	}
	return igRF_b
};
igRF_.iter.chain = function() {
	var a = arguments, b = a.length, c = 0, d = new igRF_.iter.Iterator;
	d.next = function() {
		try {
			if (c >= b)
				igRF_a(igRF_.iter.StopIteration);
			var e = igRF_.iter.toIterator(a[c]);
			return e.next()
		} catch (f) {
			if (f !== igRF_.iter.StopIteration || c >= b)
				igRF_a(f);
			else {
				c++;
				return this.next()
			}
		}
	};
	return d
};
igRF_.iter.dropWhile = function(a, b, c) {
	a = igRF_.iter.toIterator(a);
	var d = new igRF_.iter.Iterator, e = igRF_b;
	d.next = function() {
		for (; 1;) {
			var f = a.next();
			if (!(e && b.call(c, f, undefined, a))) {
				e = igRF_d;
				return f
			}
		}
	};
	return d
};
igRF_.iter.takeWhile = function(a, b, c) {
	a = igRF_.iter.toIterator(a);
	var d = new igRF_.iter.Iterator, e = igRF_b;
	d.next = function() {
		for (; 1;)
			if (e) {
				var f = a.next();
				if (b.call(c, f, undefined, a))
					return f;
				else
					e = igRF_d
			} else
				igRF_a(igRF_.iter.StopIteration)
	};
	return d
};
igRF_.iter.toArray = function(a) {
	if (igRF_.isArrayLike(a))
		return igRF_.array.toArray(a);
	a = igRF_.iter.toIterator(a);
	var b = [];
	igRF_.iter.forEach(a, function(c) {
				b.push(c)
			});
	return b
};
igRF_.iter.equals = function(a, b) {
	a = igRF_.iter.toIterator(a);
	b = igRF_.iter.toIterator(b);
	var c, d;
	try {
		for (; 1;) {
			c = d = igRF_d;
			var e = a.next();
			c = igRF_b;
			var f = b.next();
			d = igRF_b;
			if (e != f)
				return igRF_d
		}
	} catch (g) {
		if (g !== igRF_.iter.StopIteration)
			igRF_a(g);
		else {
			if (c && !d)
				return igRF_d;
			if (!d)
				try {
					b.next();
					return igRF_d
				} catch (h) {
					if (h !== igRF_.iter.StopIteration)
						igRF_a(h);
					return igRF_b
				}
		}
	}
	return igRF_d
};
igRF_.iter.nextOrValue = function(a, b) {
	try {
		return igRF_.iter.toIterator(a).next()
	} catch (c) {
		if (c != igRF_.iter.StopIteration)
			igRF_a(c);
		return b
	}
};
igRF_.string = {};
igRF_.string.Unicode = {
	NBSP : "\u00a0"
};
igRF_.string.startsWith = function(a, b) {
	return a.indexOf(b) == 0
};
igRF_.string.endsWith = function(a, b) {
	var c = a.length - b.length;
	return c >= 0 && a.lastIndexOf(b, c) == c
};
igRF_.string.caseInsensitiveStartsWith = function(a, b) {
	return igRF_.string.caseInsensitiveCompare(b, a.substr(0, b.length)) == 0
};
igRF_.string.caseInsensitiveEndsWith = function(a, b) {
	return igRF_.string.caseInsensitiveCompare(b, a.substr(a.length - b.length,
					b.length)) == 0
};
igRF_.string.subs = function(a) {
	for (var b = 1; b < arguments.length; b++) {
		var c = String(arguments[b]).replace(/\$/g, "$$$$");
		a = a.replace(/\%s/, c)
	}
	return a
};
igRF_.string.collapseWhitespace = function(a) {
	return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
igRF_.string.l = function(a) {
	return /^[\s\xa0]*$/.test(a)
};
igRF_.string.isEmptySafe = function(a) {
	return igRF_.string.l(igRF_.string.makeSafe(a))
};
igRF_.string.isBreakingWhitespace = function(a) {
	return !/[^\t\n\r ]/.test(a)
};
igRF_.string.isAlpha = function(a) {
	return !/[^a-zA-Z]/.test(a)
};
igRF_.string.isNumeric = function(a) {
	return !/[^0-9]/.test(a)
};
igRF_.string.isAlphaNumeric = function(a) {
	return !/[^a-zA-Z0-9]/.test(a)
};
igRF_.string.isSpace = function(a) {
	return a == " "
};
igRF_.string.isUnicodeChar = function(a) {
	return a.length == 1 && a >= " " && a <= "~" || a >= "\u0080"
			&& a <= "\ufffd"
};
igRF_.string.stripNewlines = function(a) {
	return a.replace(/(\r\n|\r|\n)+/g, " ")
};
igRF_.string.canonicalizeNewlines = function(a) {
	return a.replace(/(\r\n|\r|\n)/g, "\n")
};
igRF_.string.normalizeWhitespace = function(a) {
	return a.replace(/\xa0|\s/g, " ")
};
igRF_.string.normalizeSpaces = function(a) {
	return a.replace(/\xa0|[ \t]+/g, " ")
};
igRF_.string.trim = function(a) {
	return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
igRF_.string.trimLeft = function(a) {
	return a.replace(/^[\s\xa0]+/, "")
};
igRF_.string.trimRight = function(a) {
	return a.replace(/[\s\xa0]+$/, "")
};
igRF_.string.caseInsensitiveCompare = function(a, b) {
	var c = String(a).toLowerCase(), d = String(b).toLowerCase();
	return c < d ? -1 : c == d ? 0 : 1
};
igRF_.string.eg = /(\.\d+)|(\d+)|(\D+)/g;
igRF_.string.numerateCompare = function(a, b) {
	if (a == b)
		return 0;
	if (!a)
		return -1;
	if (!b)
		return 1;
	for (var c = a.toLowerCase().match(igRF_.string.eg), d = b.toLowerCase()
			.match(igRF_.string.eg), e = Math.min(c.length, d.length), f = 0; f < e; f++) {
		var g = c[f], h = d[f];
		if (g != h) {
			var i = parseInt(g, 10);
			if (!isNaN(i)) {
				var j = parseInt(h, 10);
				if (!isNaN(j) && i - j)
					return i - j
			}
			return g < h ? -1 : 1
		}
	}
	if (c.length != d.length)
		return c.length - d.length;
	return a < b ? -1 : 1
};
igRF_.string.ph = /^[a-zA-Z0-9\-_.!~*'()]*$/;
igRF_.string.urlEncode = function(a) {
	a = String(a);
	if (!igRF_.string.ph.test(a))
		return encodeURIComponent(a);
	return a
};
igRF_.string.urlDecode = function(a) {
	return decodeURIComponent(a.replace(/\+/g, " "))
};
igRF_.string.newLineToBr = function(a, b) {
	return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
igRF_.string.htmlEscape = function(a, b) {
	if (b)
		return a.replace(igRF_.string.De, "&amp;").replace(igRF_.string.Tf,
				"&lt;").replace(igRF_.string.vf, "&gt;").replace(
				igRF_.string.lg, "&quot;");
	else {
		if (!igRF_.string.ah.test(a))
			return a;
		if (a.indexOf("&") != -1)
			a = a.replace(igRF_.string.De, "&amp;");
		if (a.indexOf("<") != -1)
			a = a.replace(igRF_.string.Tf, "&lt;");
		if (a.indexOf(">") != -1)
			a = a.replace(igRF_.string.vf, "&gt;");
		if (a.indexOf('"') != -1)
			a = a.replace(igRF_.string.lg, "&quot;");
		return a
	}
};
igRF_.string.De = /&/g;
igRF_.string.Tf = /</g;
igRF_.string.vf = />/g;
igRF_.string.lg = /\"/g;
igRF_.string.ah = /[&<>\"]/;
igRF_.string.unescapeEntities = function(a) {
	if (igRF_.string.contains(a, "&"))
		return "document" in igRF_.global && !igRF_.string.contains(a, "<")
				? igRF_.string.Lh(a)
				: igRF_.string.Mh(a);
	return a
};
igRF_.string.Lh = function(a) {
	var b = igRF_.global.document.createElement("a");
	b.innerHTML = a;
	b[igRF_.string.ue] && b[igRF_.string.ue]();
	a = b.firstChild.nodeValue;
	b.innerHTML = "";
	return a
};
igRF_.string.Mh = function(a) {
	return a.replace(/&([^;]+);/g, function(b, c) {
				switch (c) {
					case "amp" :
						return "&";
					case "lt" :
						return "<";
					case "gt" :
						return ">";
					case "quot" :
						return '"';
					default :
						if (c.charAt(0) == "#") {
							var d = Number("0" + c.substr(1));
							if (!isNaN(d))
								return String.fromCharCode(d)
						}
						return b
				}
			})
};
igRF_.string.ue = "normalize";
igRF_.string.whitespaceEscape = function(a, b) {
	return igRF_.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
igRF_.string.stripQuotes = function(a, b) {
	for (var c = b.length, d = 0; d < c; d++) {
		var e = c == 1 ? b : b.charAt(d);
		if (a.charAt(0) == e && a.charAt(a.length - 1) == e)
			return a.substring(1, a.length - 1)
	}
	return a
};
igRF_.string.truncate = function(a, b, c) {
	if (c)
		a = igRF_.string.unescapeEntities(a);
	if (a.length > b)
		a = a.substring(0, b - 3) + "...";
	if (c)
		a = igRF_.string.htmlEscape(a);
	return a
};
igRF_.string.truncateMiddle = function(a, b, c) {
	if (c)
		a = igRF_.string.unescapeEntities(a);
	if (a.length > b) {
		var d = Math.floor(b / 2), e = a.length - d;
		d += b % 2;
		a = a.substring(0, d) + "..." + a.substring(e)
	}
	if (c)
		a = igRF_.string.htmlEscape(a);
	return a
};
igRF_.string.Pd = {
	"\u0008" : "\\b",
	"\u000c" : "\\f",
	"\n" : "\\n",
	"\r" : "\\r",
	"\t" : "\\t",
	"\u000b" : "\\x0B",
	'"' : '\\"',
	"'" : "\\'",
	"\\" : "\\\\"
};
igRF_.string.quote = function(a) {
	a = String(a);
	if (a.quote)
		return a.quote();
	else {
		for (var b = ['"'], c = 0; c < a.length; c++)
			b[c + 1] = igRF_.string.escapeChar(a.charAt(c));
		b.push('"');
		return b.join("")
	}
};
igRF_.string.escapeChar = function(a) {
	if (a in igRF_.string.Pd)
		return igRF_.string.Pd[a];
	var b = a, c = a.charCodeAt(0);
	if (c > 31 && c < 127)
		b = a;
	else {
		if (c < 256) {
			b = "\\x";
			if (c < 16 || c > 256)
				b += "0"
		} else {
			b = "\\u";
			if (c < 4096)
				b += "0"
		}
		b += c.toString(16).toUpperCase()
	}
	return igRF_.string.Pd[a] = b
};
igRF_.string.toMap = function(a) {
	for (var b = {}, c = 0; c < a.length; c++)
		b[a.charAt(c)] = igRF_b;
	return b
};
igRF_.string.contains = function(a, b) {
	return a.indexOf(b) != -1
};
igRF_.string.removeAt = function(a, b, c) {
	var d = a;
	if (b >= 0 && b < a.length && c > 0)
		d = a.substr(0, b) + a.substr(b + c, a.length - b - c);
	return d
};
igRF_.string.remove = function(a, b) {
	var c = new RegExp(igRF_.string.regExpEscape(b), "");
	return a.replace(c, "")
};
igRF_.string.jb = function(a, b) {
	var c = new RegExp(igRF_.string.regExpEscape(b), "g");
	return a.replace(c, "")
};
igRF_.string.regExpEscape = function(a) {
	return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(
			/\x08/g, "\\x08")
};
igRF_.string.repeat = function(a, b) {
	return (new Array(b + 1)).join(a)
};
igRF_.string.padNumber = function(a, b, c) {
	var d = igRF_.isDef(c) ? a.toFixed(c) : String(a), e = d.indexOf(".");
	if (e == -1)
		e = d.length;
	return igRF_.string.repeat("0", Math.max(0, b - e)) + d
};
igRF_.string.makeSafe = function(a) {
	return a == igRF_c ? "" : String(a)
};
igRF_.string.buildString = function() {
	return Array.prototype.join.call(arguments, "")
};
igRF_.string.getRandomString = function() {
	return Math.floor(Math.random() * 2147483648).toString(36)
			+ (Math.floor(Math.random() * 2147483648) ^ (new Date).getTime())
					.toString(36)
};
igRF_.string.compareVersions = function(a, b) {
	for (var c = 0, d = igRF_.string.trim(String(a)).split("."), e = igRF_.string
			.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; c == 0
			&& g < f; g++) {
		var h = d[g] || "", i = e[g] || "", j = new RegExp("(\\d*)(\\D*)", "g"), k = new RegExp(
				"(\\d*)(\\D*)", "g");
		do {
			var l = j.exec(h) || ["", "", ""], m = k.exec(i) || ["", "", ""];
			if (l[0].length == 0 && m[0].length == 0)
				break;
			var n = l[1].length == 0 ? 0 : parseInt(l[1], 10), o = m[1].length == 0
					? 0
					: parseInt(m[1], 10);
			c = igRF_.string.Rc(n, o)
					|| igRF_.string.Rc(l[2].length == 0, m[2].length == 0)
					|| igRF_.string.Rc(l[2], m[2])
		} while (c == 0)
	}
	return c
};
igRF_.string.Rc = function(a, b) {
	if (a < b)
		return -1;
	else if (a > b)
		return 1;
	return 0
};
igRF_.string.Yg = 4294967296;
igRF_.string.hashCode = function(a) {
	for (var b = 0, c = 0; c < a.length; ++c) {
		b = 31 * b + a.charCodeAt(c);
		b %= igRF_.string.Yg
	}
	return b
};
igRF_.string.Oh = igRF_.now();
igRF_.string.createUniqueString = function() {
	return "goog_" + igRF_.string.Oh++
};
igRF_.string.toNumber = function(a) {
	var b = Number(a);
	if (b == 0 && igRF_.string.l(a))
		return NaN;
	return b
};
igRF_.debug = {};
igRF_.debug.errorHandlerWeakDep = {
	protectEntryPoint : function(a) {
		return a
	}
};
igRF_.object = {};
igRF_.object.forEach = function(a, b, c) {
	for (var d in a)
		b.call(c, a[d], d, a)
};
igRF_.object.filter = function(a, b, c) {
	var d = {};
	for (var e in a)
		if (b.call(c, a[e], e, a))
			d[e] = a[e];
	return d
};
igRF_.object.map = function(a, b, c) {
	var d = {};
	for (var e in a)
		d[e] = b.call(c, a[e], e, a);
	return d
};
igRF_.object.some = function(a, b, c) {
	for (var d in a)
		if (b.call(c, a[d], d, a))
			return igRF_b;
	return igRF_d
};
igRF_.object.every = function(a, b, c) {
	for (var d in a)
		if (!b.call(c, a[d], d, a))
			return igRF_d;
	return igRF_b
};
igRF_.object.$ = function(a) {
	var b = 0;
	for (var c in a)
		b++;
	return b
};
igRF_.object.getAnyKey = function(a) {
	for (var b in a)
		return b
};
igRF_.object.getAnyValue = function(a) {
	for (var b in a)
		return a[b]
};
igRF_.object.contains = function(a, b) {
	return igRF_.object.ta(a, b)
};
igRF_.object.i = function(a) {
	var b = [], c = 0;
	for (var d in a)
		b[c++] = a[d];
	return b
};
igRF_.object.h = function(a) {
	var b = [], c = 0;
	for (var d in a)
		b[c++] = d;
	return b
};
igRF_.object.p = function(a, b) {
	return b in a
};
igRF_.object.ta = function(a, b) {
	for (var c in a)
		if (a[c] == b)
			return igRF_b;
	return igRF_d
};
igRF_.object.findKey = function(a, b, c) {
	for (var d in a)
		if (b.call(c, a[d], d, a))
			return d;
	return undefined
};
igRF_.object.findValue = function(a, b, c) {
	var d = igRF_.object.findKey(a, b, c);
	return d && a[d]
};
igRF_.object.l = function(a) {
	for (var b in a)
		return igRF_d;
	return igRF_b
};
igRF_.object.clear = function(a) {
	for (var b = igRF_.object.h(a), c = b.length - 1; c >= 0; c--)
		igRF_.object.remove(a, b[c])
};
igRF_.object.remove = function(a, b) {
	var c;
	if (c = b in a)
		delete a[b];
	return c
};
igRF_.object.add = function(a, b, c) {
	if (b in a)
		igRF_a(Error('The object already contains the key "' + b + '"'));
	igRF_.object.set(a, b, c)
};
igRF_.object.get = function(a, b, c) {
	if (b in a)
		return a[b];
	return c
};
igRF_.object.set = function(a, b, c) {
	a[b] = c
};
igRF_.object.setIfUndefined = function(a, b, c) {
	return b in a ? a[b] : (a[b] = c)
};
igRF_.object.clone = function(a) {
	var b = {};
	for (var c in a)
		b[c] = a[c];
	return b
};
igRF_.object.transpose = function(a) {
	var b = {};
	for (var c in a)
		b[a[c]] = c;
	return b
};
igRF_.object.ve = ["constructor", "hasOwnProperty", "isPrototypeOf",
		"propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
igRF_.object.extend = function(a) {
	for (var b, c, d = 1; d < arguments.length; d++) {
		c = arguments[d];
		for (b in c)
			a[b] = c[b];
		for (var e = 0; e < igRF_.object.ve.length; e++) {
			b = igRF_.object.ve[e];
			if (Object.prototype.hasOwnProperty.call(c, b))
				a[b] = c[b]
		}
	}
};
igRF_.object.create = function() {
	var a = arguments.length;
	if (a == 1 && igRF_.isArray(arguments[0]))
		return igRF_.object.create.apply(igRF_c, arguments[0]);
	if (a % 2)
		igRF_a(Error("Uneven number of arguments"));
	for (var b = {}, c = 0; c < a; c += 2)
		b[arguments[c]] = arguments[c + 1];
	return b
};
igRF_.object.createSet = function() {
	var a = arguments.length;
	if (a == 1 && igRF_.isArray(arguments[0]))
		return igRF_.object.createSet.apply(igRF_c, arguments[0]);
	for (var b = {}, c = 0; c < a; c++)
		b[arguments[c]] = igRF_b;
	return b
};
igRF_.userAgent = {};
igRF_.userAgent.ASSUME_IE = igRF_d;
igRF_.userAgent.ASSUME_GECKO = igRF_d;
igRF_.userAgent.ASSUME_CAMINO = igRF_d;
igRF_.userAgent.ASSUME_WEBKIT = igRF_d;
igRF_.userAgent.ASSUME_MOBILE_WEBKIT = igRF_d;
igRF_.userAgent.ASSUME_OPERA = igRF_d;
igRF_.userAgent.Ea = igRF_.userAgent.ASSUME_IE || igRF_.userAgent.ASSUME_GECKO
		|| igRF_.userAgent.ASSUME_CAMINO
		|| igRF_.userAgent.ASSUME_MOBILE_WEBKIT
		|| igRF_.userAgent.ASSUME_WEBKIT || igRF_.userAgent.ASSUME_OPERA;
igRF_.userAgent.getUserAgentString = function() {
	return igRF_.global.navigator ? igRF_.global.navigator.userAgent : igRF_c
};
igRF_.userAgent.getNavigator = function() {
	return igRF_.global.navigator
};
igRF_.userAgent.Ab = function() {
	igRF_.userAgent.tb = igRF_d;
	igRF_.userAgent.Re = igRF_d;
	igRF_.userAgent.cc = igRF_d;
	igRF_.userAgent.Te = igRF_d;
	igRF_.userAgent.Vc = igRF_d;
	igRF_.userAgent.sb = igRF_d;
	var a;
	if (!igRF_.userAgent.Ea && (a = igRF_.userAgent.getUserAgentString())) {
		var b = igRF_.userAgent.getNavigator();
		igRF_.userAgent.tb = a.indexOf("Opera") == 0;
		igRF_.userAgent.Re = !igRF_.userAgent.tb && a.indexOf("MSIE") != -1;
		igRF_.userAgent.cc = !igRF_.userAgent.tb && a.indexOf("WebKit") != -1;
		igRF_.userAgent.Te = igRF_.userAgent.cc && a.indexOf("Mobile") != -1;
		igRF_.userAgent.Vc = !igRF_.userAgent.tb && !igRF_.userAgent.cc
				&& b.product == "Gecko";
		igRF_.userAgent.sb = igRF_.userAgent.Vc && b.vendor == "Camino"
	}
};
igRF_.userAgent.Ea || igRF_.userAgent.Ab();
igRF_.userAgent.OPERA = igRF_.userAgent.Ea
		? igRF_.userAgent.ASSUME_OPERA
		: igRF_.userAgent.tb;
igRF_.userAgent.IE = igRF_.userAgent.Ea
		? igRF_.userAgent.ASSUME_IE
		: igRF_.userAgent.Re;
igRF_.userAgent.GECKO = igRF_.userAgent.Ea ? igRF_.userAgent.ASSUME_GECKO
		|| igRF_.userAgent.ASSUME_CAMINO : igRF_.userAgent.Vc;
igRF_.userAgent.CAMINO = igRF_.userAgent.Ea
		? igRF_.userAgent.ASSUME_CAMINO
		: igRF_.userAgent.sb;
igRF_.userAgent.WEBKIT = igRF_.userAgent.Ea ? igRF_.userAgent.ASSUME_WEBKIT
		|| igRF_.userAgent.ASSUME_MOBILE_WEBKIT : igRF_.userAgent.cc;
igRF_.userAgent.MOBILE = igRF_.userAgent.ASSUME_MOBILE_WEBKIT
		|| igRF_.userAgent.Te;
igRF_.userAgent.SAFARI = igRF_.userAgent.WEBKIT;
igRF_.userAgent.kh = function() {
	var a = igRF_.userAgent.getNavigator();
	return a && a.platform || ""
};
igRF_.userAgent.PLATFORM = igRF_.userAgent.kh();
igRF_.userAgent.ASSUME_MAC = igRF_d;
igRF_.userAgent.ASSUME_WINDOWS = igRF_d;
igRF_.userAgent.ASSUME_LINUX = igRF_d;
igRF_.userAgent.ASSUME_X11 = igRF_d;
igRF_.userAgent.pb = igRF_.userAgent.ASSUME_MAC
		|| igRF_.userAgent.ASSUME_WINDOWS || igRF_.userAgent.ASSUME_LINUX
		|| igRF_.userAgent.ASSUME_X11;
igRF_.userAgent.th = function() {
	igRF_.userAgent.hh = igRF_.string.contains(igRF_.userAgent.PLATFORM, "Mac");
	igRF_.userAgent.ih = igRF_.string.contains(igRF_.userAgent.PLATFORM, "Win");
	igRF_.userAgent.gh = igRF_.string.contains(igRF_.userAgent.PLATFORM,
			"Linux");
	igRF_.userAgent.jh = !!igRF_.userAgent.getNavigator()
			&& igRF_.string.contains(igRF_.userAgent.getNavigator().appVersion
							|| "", "X11")
};
igRF_.userAgent.pb || igRF_.userAgent.th();
igRF_.userAgent.MAC = igRF_.userAgent.pb
		? igRF_.userAgent.ASSUME_MAC
		: igRF_.userAgent.hh;
igRF_.userAgent.WINDOWS = igRF_.userAgent.pb
		? igRF_.userAgent.ASSUME_WINDOWS
		: igRF_.userAgent.ih;
igRF_.userAgent.LINUX = igRF_.userAgent.pb
		? igRF_.userAgent.ASSUME_LINUX
		: igRF_.userAgent.gh;
igRF_.userAgent.X11 = igRF_.userAgent.pb
		? igRF_.userAgent.ASSUME_X11
		: igRF_.userAgent.jh;
igRF_.userAgent.lh = function() {
	var a = "", b;
	if (igRF_.userAgent.OPERA && igRF_.global.opera) {
		var c = igRF_.global.opera.version;
		a = typeof c == "function" ? c() : c
	} else {
		if (igRF_.userAgent.GECKO)
			b = /rv\:([^\);]+)(\)|;)/;
		else if (igRF_.userAgent.IE)
			b = /MSIE\s+([^\);]+)(\)|;)/;
		else if (igRF_.userAgent.WEBKIT)
			b = /WebKit\/(\S+)/;
		if (b) {
			var d = b.exec(igRF_.userAgent.getUserAgentString());
			a = d ? d[1] : ""
		}
	}
	return a
};
igRF_.userAgent.VERSION = igRF_.userAgent.lh();
igRF_.userAgent.compare = function(a, b) {
	return igRF_.string.compareVersions(a, b)
};
igRF_.userAgent.Lf = {};
igRF_.userAgent.isVersion = function(a) {
	return igRF_.userAgent.Lf[a]
			|| (igRF_.userAgent.Lf[a] = igRF_.string.compareVersions(
					igRF_.userAgent.VERSION, a) >= 0)
};
igRF_.Disposable = function() {
};
igRF_.Disposable.prototype.Zc = igRF_d;
igRF_.Disposable.prototype.dispose = function() {
	if (!this.Zc) {
		this.Zc = igRF_b;
		this.c()
	}
};
igRF_.Disposable.prototype.c = function() {
};
igRF_.dispose = function(a) {
	a && typeof a.dispose == "function" && a.dispose()
};
igRF_.events = {};
igRF_.events.Event = function(a, b) {
	igRF_.Disposable.call(this);
	this.type = a;
	this.currentTarget = this.target = b
};
igRF_.inherits(igRF_.events.Event, igRF_.Disposable);
igRF_.events.Event.prototype.c = function() {
	delete this.type;
	delete this.target;
	delete this.currentTarget
};
igRF_.events.Event.prototype.ya = igRF_d;
igRF_.events.Event.prototype.Ta = igRF_b;
igRF_.events.Event.prototype.stopPropagation = function() {
	this.ya = igRF_b
};
igRF_.events.Event.prototype.preventDefault = function() {
	this.Ta = igRF_d
};
igRF_.events.BrowserEvent = function(a, b) {
	a && this.init(a, b)
};
igRF_.inherits(igRF_.events.BrowserEvent, igRF_.events.Event);
igRF_.events.BrowserEvent.MouseButton = {
	LEFT : 0,
	MIDDLE : 1,
	RIGHT : 2
};
igRF_.events.BrowserEvent.Rh = [1, 4, 2];
igRF_.events.BrowserEvent.prototype.type = igRF_c;
igRF_.events.BrowserEvent.prototype.target = igRF_c;
igRF_.events.BrowserEvent.prototype.relatedTarget = igRF_c;
igRF_.events.BrowserEvent.prototype.offsetX = 0;
igRF_.events.BrowserEvent.prototype.offsetY = 0;
igRF_.events.BrowserEvent.prototype.clientX = 0;
igRF_.events.BrowserEvent.prototype.clientY = 0;
igRF_.events.BrowserEvent.prototype.screenX = 0;
igRF_.events.BrowserEvent.prototype.screenY = 0;
igRF_.events.BrowserEvent.prototype.button = 0;
igRF_.events.BrowserEvent.prototype.keyCode = 0;
igRF_.events.BrowserEvent.prototype.charCode = 0;
igRF_.events.BrowserEvent.prototype.ctrlKey = igRF_d;
igRF_.events.BrowserEvent.prototype.altKey = igRF_d;
igRF_.events.BrowserEvent.prototype.shiftKey = igRF_d;
igRF_.events.BrowserEvent.prototype.metaKey = igRF_d;
igRF_.events.BrowserEvent.prototype.ha = igRF_c;
igRF_.events.BrowserEvent.prototype.init = function(a, b) {
	this.type = a.type;
	this.target = a.target || a.srcElement;
	this.currentTarget = b;
	this.relatedTarget = a.relatedTarget
			? a.relatedTarget
			: this.type == "mouseover"
					? a.fromElement
					: this.type == "mouseout" ? a.toElement : igRF_c;
	this.offsetX = typeof a.layerX == "number" ? a.layerX : a.offsetX;
	this.offsetY = typeof a.layerY == "number" ? a.layerY : a.offsetY;
	this.clientX = typeof a.clientX == "number" ? a.clientX : a.pageX;
	this.clientY = typeof a.clientY == "number" ? a.clientY : a.pageY;
	this.screenX = a.screenX || 0;
	this.screenY = a.screenY || 0;
	this.button = a.button;
	this.keyCode = a.keyCode || 0;
	this.charCode = a.charCode || (this.type == "keypress" ? a.keyCode : 0);
	this.ctrlKey = a.ctrlKey;
	this.altKey = a.altKey;
	this.shiftKey = a.shiftKey;
	this.metaKey = a.metaKey;
	this.ha = a;
	delete this.Ta;
	delete this.ya
};
igRF_.events.BrowserEvent.prototype.stopPropagation = function() {
	this.ya = igRF_b;
	if (this.ha.stopPropagation)
		this.ha.stopPropagation();
	else
		this.ha.cancelBubble = igRF_b
};
igRF_.events.BrowserEvent.prototype.preventDefault = function() {
	this.Ta = igRF_d;
	if (this.ha.preventDefault)
		this.ha.preventDefault();
	else {
		this.ha.returnValue = igRF_d;
		try {
			this.ha.keyCode = -1
		} catch (a) {
		}
	}
};
igRF_.events.BrowserEvent.prototype.af = function() {
	return this.ha
};
igRF_.events.BrowserEvent.prototype.c = function() {
	igRF_.events.BrowserEvent.Aa.c.call(this);
	this.ha = igRF_c
};
igRF_.events.EventWrapper = function() {
};
igRF_.events.EventWrapper.prototype.listen = function() {
};
igRF_.events.EventWrapper.prototype.unlisten = function() {
};
igRF_.structs = {};
igRF_.structs.SimplePool = function(a, b) {
	igRF_.Disposable.call(this);
	this.Xf = b;
	this.Ma = [];
	this.Ne(a)
};
igRF_.inherits(igRF_.structs.SimplePool, igRF_.Disposable);
igRF_.structs.SimplePool.prototype.ac = igRF_c;
igRF_.structs.SimplePool.prototype.Yc = igRF_c;
igRF_.structs.SimplePool.prototype.kb = function(a) {
	this.ac = a
};
igRF_.structs.SimplePool.prototype.ia = function() {
	if (this.Ma.length)
		return this.Ma.pop();
	return this.Sc()
};
igRF_.structs.SimplePool.prototype.ka = function(a) {
	this.Ma.length < this.Xf ? this.Ma.push(a) : this.Xc(a)
};
igRF_.structs.SimplePool.prototype.Ne = function(a) {
	if (a > this.Xf)
		igRF_a(Error("[goog.structs.SimplePool] Initial cannot be greater than max"));
	for (var b = 0; b < a; b++)
		this.Ma.push(this.Sc())
};
igRF_.structs.SimplePool.prototype.Sc = function() {
	return this.ac ? this.ac() : {}
};
igRF_.structs.SimplePool.prototype.Xc = function(a) {
	if (this.Yc)
		this.Yc(a);
	else if (igRF_.isFunction(a.dispose))
		a.dispose();
	else
		for (var b in a)
			delete a[b]
};
igRF_.structs.SimplePool.prototype.c = function() {
	igRF_.structs.SimplePool.Aa.c.call(this);
	for (var a = this.Ma; a.length;)
		this.Xc(a.pop());
	delete this.Ma
};
igRF_.userAgent.jscript = {};
igRF_.userAgent.jscript.ASSUME_NO_JSCRIPT = igRF_d;
igRF_.userAgent.jscript.Ab = function() {
	var a = "ScriptEngine" in igRF_.global;
	igRF_.userAgent.jscript.se = a && igRF_.global.ScriptEngine() == "JScript";
	igRF_.userAgent.jscript.Xg = igRF_.userAgent.jscript.se ? igRF_.global
			.ScriptEngineMajorVersion()
			+ "."
			+ igRF_.global.ScriptEngineMinorVersion()
			+ "."
			+ igRF_.global.ScriptEngineBuildVersion() : "0"
};
igRF_.userAgent.jscript.ASSUME_NO_JSCRIPT || igRF_.userAgent.jscript.Ab();
igRF_.userAgent.jscript.HAS_JSCRIPT = igRF_.userAgent.jscript.ASSUME_NO_JSCRIPT
		? igRF_d
		: igRF_.userAgent.jscript.se;
igRF_.userAgent.jscript.VERSION = igRF_.userAgent.jscript.ASSUME_NO_JSCRIPT
		? "0"
		: igRF_.userAgent.jscript.Xg;
igRF_.userAgent.jscript.isVersion = function(a) {
	return igRF_.string.compareVersions(igRF_.userAgent.jscript.VERSION, a) >= 0
};
igRF_.events.Listener = function() {
};
igRF_.events.Listener.dh = 0;
igRF_.events.Listener.prototype.key = 0;
igRF_.events.Listener.prototype.removed = igRF_d;
igRF_.events.Listener.prototype.rb = igRF_d;
igRF_.events.Listener.prototype.init = function(a, b, c, d, e, f) {
	if (igRF_.isFunction(a))
		this.If = igRF_b;
	else if (a && a.handleEvent && igRF_.isFunction(a.handleEvent))
		this.If = igRF_d;
	else
		igRF_a(Error("Invalid listener argument"));
	this.listener = a;
	this.proxy = b;
	this.src = c;
	this.type = d;
	this.capture = !!e;
	this.handler = f;
	this.rb = igRF_d;
	this.key = ++igRF_.events.Listener.dh;
	this.removed = igRF_d
};
igRF_.events.Listener.prototype.handleEvent = function(a) {
	if (this.If)
		return this.listener.call(this.handler || this.src, a);
	return this.listener.handleEvent.call(this.listener, a)
};
igRF_.events.pools = {};
(function() {
	var a = igRF_.userAgent.jscript.HAS_JSCRIPT
			&& !igRF_.userAgent.jscript.isVersion("5.7");
	function b() {
		return {
			b : 0,
			la : 0
		}
	}
	function c() {
		return []
	}
	var d;
	igRF_.events.pools.setProxyCallbackFunction = function(m) {
		d = m
	};
	function e() {
		var m = function(n) {
			return d.call(m.src, m.key, n)
		};
		return m
	}
	function f() {
		return new igRF_.events.Listener
	}
	function g() {
		return new igRF_.events.BrowserEvent
	}
	if (a) {
		igRF_.events.pools.ia = function() {
			return h.ia()
		};
		igRF_.events.pools.ka = function(m) {
			h.ka(m)
		};
		igRF_.events.pools.getArray = function() {
			return i.ia()
		};
		igRF_.events.pools.releaseArray = function(m) {
			i.ka(m)
		};
		igRF_.events.pools.getProxy = function() {
			return j.ia()
		};
		igRF_.events.pools.releaseProxy = function() {
			j.ka(e())
		};
		igRF_.events.pools.getListener = function() {
			return k.ia()
		};
		igRF_.events.pools.releaseListener = function(m) {
			k.ka(m)
		};
		igRF_.events.pools.getEvent = function() {
			return l.ia()
		};
		igRF_.events.pools.releaseEvent = function(m) {
			l.ka(m)
		};
		var h = new igRF_.structs.SimplePool(0, 600);
		h.kb(b);
		var i = new igRF_.structs.SimplePool(0, 600);
		i.kb(c);
		var j = new igRF_.structs.SimplePool(0, 600);
		j.kb(e);
		var k = new igRF_.structs.SimplePool(0, 600);
		k.kb(f);
		var l = new igRF_.structs.SimplePool(0, 600);
		l.kb(g)
	} else {
		igRF_.events.pools.ia = b;
		igRF_.events.pools.ka = igRF_.nullFunction;
		igRF_.events.pools.getArray = c;
		igRF_.events.pools.releaseArray = igRF_.nullFunction;
		igRF_.events.pools.getProxy = e;
		igRF_.events.pools.releaseProxy = igRF_.nullFunction;
		igRF_.events.pools.getListener = f;
		igRF_.events.pools.releaseListener = igRF_.nullFunction;
		igRF_.events.pools.getEvent = g;
		igRF_.events.pools.releaseEvent = igRF_.nullFunction
	}
})();
igRF_.events.v = {};
igRF_.events.s = {};
igRF_.events.ra = {};
igRF_.events.Ah = "on";
igRF_.events.be = {};
igRF_.events.Th = "_";
igRF_.events.listen = function(a, b, c, d, e) {
	if (b)
		if (igRF_.isArray(b)) {
			for (var f = 0; f < b.length; f++)
				igRF_.events.listen(a, b[f], c, d, e);
			return igRF_c
		} else {
			var g = !!d, h = igRF_.events.s;
			b in h || (h[b] = igRF_.events.pools.ia());
			h = h[b];
			if (!(g in h)) {
				h[g] = igRF_.events.pools.ia();
				h.b++
			}
			h = h[g];
			var i = igRF_.getHashCode(a), j, k;
			h.la++;
			if (h[i]) {
				j = h[i];
				for (f = 0; f < j.length; f++) {
					k = j[f];
					if (k.listener == c && k.handler == e) {
						if (k.removed)
							break;
						return j[f].key
					}
				}
			} else {
				j = h[i] = igRF_.events.pools.getArray();
				h.b++
			}
			var l = igRF_.events.pools.getProxy();
			l.src = a;
			k = igRF_.events.pools.getListener();
			k.init(c, l, a, b, g, e);
			var m = k.key;
			l.key = m;
			j.push(k);
			igRF_.events.v[m] = k;
			igRF_.events.ra[i]
					|| (igRF_.events.ra[i] = igRF_.events.pools.getArray());
			igRF_.events.ra[i].push(k);
			if (a.addEventListener) {
				if (a == igRF_.global || !a.Uc)
					a.addEventListener(b, l, g)
			} else
				a.attachEvent(igRF_.events.nf(b), l);
			return m
		}
	else
		igRF_a(Error("Invalid event type"))
};
igRF_.events.Fb = function(a, b, c, d, e) {
	if (igRF_.isArray(b)) {
		for (var f = 0; f < b.length; f++)
			igRF_.events.Fb(a, b[f], c, d, e);
		return igRF_c
	}
	var g = igRF_.events.listen(a, b, c, d, e), h = igRF_.events.v[g];
	h.rb = igRF_b;
	return g
};
igRF_.events.Rf = function(a, b, c, d, e) {
	b.listen(a, c, d, e)
};
igRF_.events.unlisten = function(a, b, c, d, e) {
	if (igRF_.isArray(b)) {
		for (var f = 0; f < b.length; f++)
			igRF_.events.unlisten(a, b[f], c, d, e);
		return igRF_c
	}
	var g = !!d, h = igRF_.events.nd(a, b, g);
	if (!h)
		return igRF_d;
	for (f = 0; f < h.length; f++)
		if (h[f].listener == c && h[f].capture == g && h[f].handler == e)
			return igRF_.events.unlistenByKey(h[f].key);
	return igRF_d
};
igRF_.events.unlistenByKey = function(a) {
	if (!igRF_.events.v[a])
		return igRF_d;
	var b = igRF_.events.v[a];
	if (b.removed)
		return igRF_d;
	var c = b.src, d = b.type, e = b.proxy, f = b.capture;
	if (c.removeEventListener) {
		if (c == igRF_.global || !c.Uc)
			c.removeEventListener(d, e, f)
	} else
		c.detachEvent && c.detachEvent(igRF_.events.nf(d), e);
	var g = igRF_.getHashCode(c), h = igRF_.events.s[d][f][g];
	if (igRF_.events.ra[g]) {
		var i = igRF_.events.ra[g];
		igRF_.array.remove(i, b);
		i.length == 0 && delete igRF_.events.ra[g]
	}
	b.removed = igRF_b;
	h.cg = igRF_b;
	igRF_.events.Je(d, f, g, h);
	delete igRF_.events.v[a];
	return igRF_b
};
igRF_.events.Qg = function(a, b, c, d, e) {
	b.unlisten(a, c, d, e)
};
igRF_.events.Je = function(a, b, c, d) {
	if (!d.Ac)
		if (d.cg) {
			for (var e = 0, f = 0; e < d.length; e++)
				if (d[e].removed) {
					var g = d[e].proxy;
					g.src = igRF_c;
					igRF_.events.pools.releaseProxy(g);
					igRF_.events.pools.releaseListener(d[e])
				} else {
					if (e != f)
						d[f] = d[e];
					f++
				}
			d.length = f;
			d.cg = igRF_d;
			if (f == 0) {
				igRF_.events.pools.releaseArray(d);
				delete igRF_.events.s[a][b][c];
				igRF_.events.s[a][b].b--;
				if (igRF_.events.s[a][b].b == 0) {
					igRF_.events.pools.ka(igRF_.events.s[a][b]);
					delete igRF_.events.s[a][b];
					igRF_.events.s[a].b--
				}
				if (igRF_.events.s[a].b == 0) {
					igRF_.events.pools.ka(igRF_.events.s[a]);
					delete igRF_.events.s[a]
				}
			}
		}
};
igRF_.events.jb = function(a, b, c) {
	var d = 0, e = a == igRF_c, f = b == igRF_c, g = c == igRF_c;
	c = !!c;
	if (e)
		igRF_.object.forEach(igRF_.events.ra, function(l) {
					for (var m = l.length - 1; m >= 0; m--) {
						var n = l[m];
						if ((f || b == n.type) && (g || c == n.capture)) {
							igRF_.events.unlistenByKey(n.key);
							d++
						}
					}
				});
	else {
		var h = igRF_.getHashCode(a);
		if (igRF_.events.ra[h])
			for (var i = igRF_.events.ra[h], j = i.length - 1; j >= 0; j--) {
				var k = i[j];
				if ((f || b == k.type) && (g || c == k.capture)) {
					igRF_.events.unlistenByKey(k.key);
					d++
				}
			}
	}
	return d
};
igRF_.events.getListeners = function(a, b, c) {
	return igRF_.events.nd(a, b, c) || []
};
igRF_.events.nd = function(a, b, c) {
	var d = igRF_.events.s;
	if (b in d) {
		d = d[b];
		if (c in d) {
			d = d[c];
			var e = igRF_.getHashCode(a);
			if (d[e])
				return d[e]
		}
	}
	return igRF_c
};
igRF_.events.getListener = function(a, b, c, d, e) {
	var f = !!d, g = igRF_.events.nd(a, b, f);
	if (g)
		for (var h = 0; h < g.length; h++)
			if (g[h].listener == c && g[h].capture == f && g[h].handler == e)
				return g[h];
	return igRF_c
};
igRF_.events.hasListener = function(a, b, c) {
	var d = igRF_.getHashCode(a), e = igRF_.events.ra[d];
	if (e) {
		var f = igRF_.isDef(b), g = igRF_.isDef(c);
		if (f && g) {
			var h = igRF_.events.s[b];
			return !!h && !!h[c] && d in h[c]
		} else
			return f || g ? igRF_.array.some(e, function(i) {
						return f && i.type == b || g && i.capture == c
					}) : igRF_b
	}
	return igRF_d
};
igRF_.events.expose = function(a) {
	var b = [];
	for (var c in a)
		a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b
				.push(c + " = " + a[c]);
	return b.join("\n")
};
igRF_.events.EventType = {
	CLICK : "click",
	DBLCLICK : "dblclick",
	MOUSEDOWN : "mousedown",
	MOUSEUP : "mouseup",
	MOUSEOVER : "mouseover",
	MOUSEOUT : "mouseout",
	MOUSEMOVE : "mousemove",
	SELECTSTART : "selectstart",
	KEYPRESS : "keypress",
	KEYDOWN : "keydown",
	KEYUP : "keyup",
	BLUR : "blur",
	FOCUS : "focus",
	DEACTIVATE : "deactivate",
	FOCUSIN : igRF_.userAgent.IE ? "focusin" : "DOMFocusIn",
	FOCUSOUT : igRF_.userAgent.IE ? "focusout" : "DOMFocusOut",
	CHANGE : "change",
	SELECT : "select",
	SUBMIT : "submit",
	LOAD : "load",
	UNLOAD : "unload",
	ERROR : "error",
	HELP : "help",
	RESIZE : "resize",
	SCROLL : "scroll",
	READYSTATECHANGE : "readystatechange",
	CONTEXTMENU : "contextmenu",
	HASHCHANGE : "hashchange"
};
igRF_.events.nf = function(a) {
	if (a in igRF_.events.be)
		return igRF_.events.be[a];
	return igRF_.events.be[a] = igRF_.events.Ah + a
};
igRF_.events.fireListeners = function(a, b, c, d) {
	var e = igRF_.events.s;
	if (b in e) {
		e = e[b];
		if (c in e)
			return igRF_.events.Za(e[c], a, b, c, d)
	}
	return igRF_b
};
igRF_.events.Za = function(a, b, c, d, e) {
	var f = 1, g = igRF_.getHashCode(b);
	if (a[g]) {
		a.la--;
		var h = a[g];
		if (h.Ac)
			h.Ac++;
		else
			h.Ac = 1;
		try {
			for (var i = h.length, j = 0; j < i; j++) {
				var k = h[j];
				if (k && !k.removed)
					f &= igRF_.events.fireListener(k, e) !== igRF_d
			}
		} finally {
			h.Ac--;
			igRF_.events.Je(c, d, g, h)
		}
	}
	return Boolean(f)
};
igRF_.events.fireListener = function(a, b) {
	var c = a.handleEvent(b);
	a.rb && igRF_.events.unlistenByKey(a.key);
	return c
};
igRF_.events.getTotalListenerCount = function() {
	return igRF_.object.$(igRF_.events.v)
};
igRF_.events.dispatchEvent = function(a, b) {
	if (igRF_.isString(b))
		b = new igRF_.events.Event(b, a);
	else if (b instanceof igRF_.events.Event)
		b.target = b.target || a;
	else {
		var c = b;
		b = new igRF_.events.Event(b.type, a);
		igRF_.object.extend(b, c)
	}
	var d = 1, e, f = b.type, g = igRF_.events.s;
	if (!(f in g))
		return igRF_b;
	g = g[f];
	var h = igRF_b in g, i;
	if (h) {
		e = [];
		for (var j = a; j; j = j.rd())
			e.push(j);
		i = g[igRF_b];
		i.la = i.b;
		for (var k = e.length - 1; !b.ya && k >= 0 && i.la; k--) {
			b.currentTarget = e[k];
			d &= igRF_.events.Za(i, e[k], b.type, igRF_b, b) && b.Ta != igRF_d
		}
	}
	var l = igRF_d in g;
	if (l) {
		i = g[igRF_d];
		i.la = i.b;
		if (h)
			for (k = 0; !b.ya && k < e.length && i.la; k++) {
				b.currentTarget = e[k];
				d &= igRF_.events.Za(i, e[k], b.type, igRF_d, b)
						&& b.Ta != igRF_d
			}
		else
			for (var m = a; !b.ya && m && i.la; m = m.rd()) {
				b.currentTarget = m;
				d &= igRF_.events.Za(i, m, b.type, igRF_d, b) && b.Ta != igRF_d
			}
	}
	return Boolean(d)
};
igRF_.events.protectBrowserEventEntryPoint = function(a, b) {
	igRF_.events.rc = a.protectEntryPoint(igRF_.events.rc, b);
	igRF_.events.pools.setProxyCallbackFunction(igRF_.events.rc)
};
igRF_.events.rc = function(a, b) {
	if (!igRF_.events.v[a])
		return igRF_b;
	var c = igRF_.events.v[a], d = c.type, e = igRF_.events.s;
	if (!(d in e))
		return igRF_b;
	e = e[d];
	var f, g;
	if (igRF_.userAgent.IE) {
		var h = b || igRF_.getObjectByName("window.event"), i = igRF_b in e, j = igRF_d in e;
		if (i) {
			if (igRF_.events.wh(h))
				return igRF_b;
			igRF_.events.yh(h)
		}
		var k = igRF_.events.pools.getEvent();
		k.init(h, this);
		f = igRF_b;
		try {
			if (i) {
				for (var l = igRF_.events.pools.getArray(), m = k.currentTarget; m; m = m.parentNode)
					l.push(m);
				g = e[igRF_b];
				g.la = g.b;
				for (var n = l.length - 1; !k.ya && n >= 0 && g.la; n--) {
					k.currentTarget = l[n];
					f &= igRF_.events.Za(g, l[n], d, igRF_b, k)
				}
				if (j) {
					g = e[igRF_d];
					g.la = g.b;
					for (n = 0; !k.ya && n < l.length && g.la; n++) {
						k.currentTarget = l[n];
						f &= igRF_.events.Za(g, l[n], d, igRF_d, k)
					}
				}
			} else
				f = igRF_.events.fireListener(c, k)
		} finally {
			if (l) {
				l.length = 0;
				igRF_.events.pools.releaseArray(l)
			}
			k.dispose();
			igRF_.events.pools.releaseEvent(k)
		}
		return f
	}
	var o = new igRF_.events.BrowserEvent(b, this);
	try {
		f = igRF_.events.fireListener(c, o)
	} finally {
		o.dispose()
	}
	return f
};
igRF_.events.pools.setProxyCallbackFunction(igRF_.events.rc);
igRF_.events.yh = function(a) {
	var b = igRF_d;
	if (a.keyCode == 0)
		try {
			a.keyCode = -1;
			return
		} catch (c) {
			b = igRF_b
		}
	if (b || a.returnValue == undefined)
		a.returnValue = igRF_b
};
igRF_.events.wh = function(a) {
	return a.keyCode < 0 || a.returnValue != undefined
};
igRF_.events.Nh = 0;
igRF_.events.getUniqueId = function(a) {
	return a + "_" + igRF_.events.Nh++
};
igRF_.events.EventTarget = function() {
	igRF_.Disposable.call(this)
};
igRF_.inherits(igRF_.events.EventTarget, igRF_.Disposable);
igRF_.events.EventTarget.prototype.Uc = igRF_b;
igRF_.events.EventTarget.prototype.de = igRF_c;
igRF_.events.EventTarget.prototype.rd = function() {
	return this.de
};
igRF_.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
	igRF_.events.listen(this, a, b, c, d)
};
igRF_.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
	igRF_.events.unlisten(this, a, b, c, d)
};
igRF_.events.EventTarget.prototype.dispatchEvent = function(a) {
	return igRF_.events.dispatchEvent(this, a)
};
igRF_.events.EventTarget.prototype.c = function() {
	igRF_.events.EventTarget.Aa.c.call(this);
	igRF_.events.jb(this);
	this.de = igRF_c
};
igRF_.ui = {};
igRF_.ui.AutoComplete = function(a, b, c) {
	igRF_.events.EventTarget.call(this);
	this.Qa = a;
	this.ge = c;
	this.za = b;
	igRF_.events.listen(b, [igRF_.ui.AutoComplete.EventType.HILITE,
					igRF_.ui.AutoComplete.EventType.SELECT,
					igRF_.ui.AutoComplete.EventType.CANCEL_DISMISS,
					igRF_.ui.AutoComplete.EventType.DISMISS], this);
	this.sa = igRF_c;
	this.m = [];
	this.ca = -1;
	this.na = 0;
	this.Ia = this.u = igRF_c
};
igRF_.inherits(igRF_.ui.AutoComplete, igRF_.events.EventTarget);
igRF_.ui.AutoComplete.prototype.Gb = 10;
igRF_.ui.AutoComplete.prototype.Oc = igRF_b;
igRF_.ui.AutoComplete.prototype.Ce = igRF_d;
igRF_.ui.AutoComplete.prototype.Ng = igRF_d;
igRF_.ui.AutoComplete.EventType = {
	HILITE : "hilite",
	SELECT : "select",
	DISMISS : "dismiss",
	CANCEL_DISMISS : "canceldismiss",
	UPDATE : "update"
};
igRF_.ui.AutoComplete.prototype.handleEvent = function(a) {
	if (a.target == this.za)
		switch (a.type) {
			case igRF_.ui.AutoComplete.EventType.HILITE :
				this.pa(a.row);
				break;
			case igRF_.ui.AutoComplete.EventType.SELECT :
				this.Lb();
				break;
			case igRF_.ui.AutoComplete.EventType.CANCEL_DISMISS :
				this.Zb();
				break;
			case igRF_.ui.AutoComplete.EventType.DISMISS :
				this.Wc();
				break
		}
};
igRF_.ui.AutoComplete.prototype.he = function(a) {
	this.Gb = a
};
igRF_.ui.AutoComplete.prototype.wg = function(a) {
	this.Oc = a
};
igRF_.ui.AutoComplete.prototype.Fg = function(a, b) {
	if (!(this.sa == a)) {
		this.sa = a;
		this.Qa.Dc(this.sa, this.Gb, igRF_.bind(this.Wf, this), b);
		this.Zb()
	}
};
igRF_.ui.AutoComplete.prototype.sf = function() {
	return this.u
};
igRF_.ui.AutoComplete.prototype.Eg = function(a) {
	this.u = a
};
igRF_.ui.AutoComplete.prototype.isOpen = function() {
	return this.za.Mf()
};
igRF_.ui.AutoComplete.prototype.Jd = function() {
	if (this.ca >= this.na && this.ca < this.na + this.m.length - 1) {
		this.pa(this.ca + 1);
		return igRF_b
	} else if (this.ca == -1) {
		this.pa(this.na);
		return igRF_b
	}
	return igRF_d
};
igRF_.ui.AutoComplete.prototype.Kd = function() {
	if (this.ca > this.na) {
		this.pa(this.ca - 1);
		return igRF_b
	} else
		this.Ce && this.ca == this.na && this.pa(-1);
	return igRF_d
};
igRF_.ui.AutoComplete.prototype.pa = function(a) {
	this.ca = a;
	this.za.pa(a);
	return this.lc(a) != -1
};
igRF_.ui.AutoComplete.prototype.Lb = function() {
	var a = this.lc(this.ca);
	if (a != -1) {
		var b = this.m[a], c = this.ge.tg(b);
		this.dismiss();
		if (!c) {
			this.dispatchEvent({
						type : igRF_.ui.AutoComplete.EventType.UPDATE,
						row : b
					});
			this.Ng && this.ge.update(igRF_b)
		}
		return igRF_b
	} else {
		this.dismiss();
		this.dispatchEvent({
					type : igRF_.ui.AutoComplete.EventType.UPDATE,
					row : igRF_c
				});
		return igRF_d
	}
};
igRF_.ui.AutoComplete.prototype.dismiss = function() {
	this.ca = -1;
	this.sa = igRF_c;
	this.na += this.m.length;
	this.m = [];
	window.clearTimeout(this.Ia);
	this.Ia = igRF_c;
	this.za.dismiss()
};
igRF_.ui.AutoComplete.prototype.Wc = function() {
	if (!this.Ia)
		this.Ia = window.setTimeout(igRF_.bind(this.dismiss, this), 100)
};
igRF_.ui.AutoComplete.prototype.Zb = function() {
	window.setTimeout(igRF_.bind(function() {
						if (this.Ia) {
							window.clearTimeout(this.Ia);
							this.Ia = igRF_c
						}
					}, this), 10)
};
igRF_.ui.AutoComplete.prototype.c = function() {
	igRF_.ui.AutoComplete.Aa.c.call(this);
	this.za.dispose();
	this.ge.dispose();
	this.Qa = igRF_c
};
igRF_.ui.AutoComplete.prototype.Wf = function(a, b, c) {
	if (!(this.sa != a)) {
		var d = c ? this.lc(this.ca) : igRF_c;
		this.na += this.m.length;
		this.m = b;
		for (var e = [], f = 0; f < b.length; ++f)
			e.push({
						id : this.ld(f),
						data : b[f]
					});
		this.za.rg(e, this.sa, this.u);
		if (this.Oc && e.length != 0) {
			var g = d != igRF_c ? this.ld(d) : this.na;
			this.pa(g)
		} else
			this.ca = -1
	}
};
igRF_.ui.AutoComplete.prototype.lc = function(a) {
	var b = a - this.na;
	if (b < 0 || b >= this.m.length)
		return -1;
	return b
};
igRF_.ui.AutoComplete.prototype.ld = function(a) {
	return this.na + a
};
igRF_.ui.AutoComplete.ArrayMatcher = function(a, b) {
	this.m = a;
	this.Ph = !b
};
igRF_.ui.AutoComplete.ArrayMatcher.prototype.Dc = function(a, b, c) {
	var d = this.pf(a, b);
	if (d.length == 0 && this.Ph)
		d = this.rf(a, b);
	c(a, d)
};
igRF_.ui.AutoComplete.ArrayMatcher.prototype.pf = function(a, b) {
	var c = [];
	if (a != "") {
		var d = igRF_.string.regExpEscape(a), e = new RegExp("(^|\\W+)" + d,
				"i");
		igRF_.iter.some(this.m, function(f) {
					String(f).match(e) && c.push(f);
					return c.length >= b
				})
	}
	return c
};
igRF_.ui.AutoComplete.ArrayMatcher.prototype.rf = function(a, b) {
	var c = [];
	igRF_.iter.forEach(this.m, function(f, g) {
				var h = a.toLowerCase(), i = String(f).toLowerCase(), j = 0;
				if (i.indexOf(h) != -1)
					j = parseInt((i.indexOf(h) / 4).toString(), 10);
				else
					for (var k = h.split(""), l = -1, m = 10, n = 0, o; o = k[n]; n++) {
						var p = i.indexOf(o);
						if (p > l) {
							var q = p - l - 1;
							if (q > m - 5)
								q = m - 5;
							j += q;
							l = p
						} else {
							j += m;
							m += 5
						}
					}
				j < h.length * 6 && c.push({
							str : f,
							score : j,
							index : g
						})
			});
	c.sort(function(f, g) {
				var h = f.score - g.score;
				if (h != 0)
					return h;
				return f.index - g.index
			});
	for (var d = [], e = 0; e < b && e < c.length; e++)
		d.push(c[e].str);
	return d
};
igRF_.math = {};
igRF_.math.Coordinate = function(a, b) {
	this.x = igRF_.isDef(a) ? a : 0;
	this.y = igRF_.isDef(b) ? b : 0
};
igRF_.math.Coordinate.prototype.clone = function() {
	return new igRF_.math.Coordinate(this.x, this.y)
};
if (igRF_.DEBUG)
	igRF_.math.Coordinate.prototype.toString = function() {
		return "(" + this.x + ", " + this.y + ")"
	};
igRF_.math.Coordinate.equals = function(a, b) {
	if (a == b)
		return igRF_b;
	if (!a || !b)
		return igRF_d;
	return a.x == b.x && a.y == b.y
};
igRF_.math.Coordinate.distance = function(a, b) {
	var c = a.x - b.x, d = a.y - b.y;
	return Math.sqrt(c * c + d * d)
};
igRF_.math.Coordinate.squaredDistance = function(a, b) {
	var c = a.x - b.x, d = a.y - b.y;
	return c * c + d * d
};
igRF_.math.Coordinate.difference = function(a, b) {
	return new igRF_.math.Coordinate(a.x - b.x, a.y - b.y)
};
igRF_.math.Coordinate.sum = function(a, b) {
	return new igRF_.math.Coordinate(a.x + b.x, a.y + b.y)
};
igRF_.math.Size = function(a, b) {
	this.width = a;
	this.height = b
};
igRF_.math.Size.equals = function(a, b) {
	if (a == b)
		return igRF_b;
	if (!a || !b)
		return igRF_d;
	return a.width == b.width && a.height == b.height
};
igRF_.math.Size.prototype.clone = function() {
	return new igRF_.math.Size(this.width, this.height)
};
if (igRF_.DEBUG)
	igRF_.math.Size.prototype.toString = function() {
		return "(" + this.width + " x " + this.height + ")"
	};
igRF_.math.Size.prototype.area = function() {
	return this.width * this.height
};
igRF_.math.Size.prototype.l = function() {
	return !this.area()
};
igRF_.math.Size.prototype.ceil = function() {
	this.width = Math.ceil(this.width);
	this.height = Math.ceil(this.height);
	return this
};
igRF_.math.Size.prototype.floor = function() {
	this.width = Math.floor(this.width);
	this.height = Math.floor(this.height);
	return this
};
igRF_.math.Size.prototype.round = function() {
	this.width = Math.round(this.width);
	this.height = Math.round(this.height);
	return this
};
igRF_.math.Size.prototype.scale = function(a) {
	this.width *= a;
	this.height *= a;
	return this
};
igRF_.dom = {};
igRF_.dom.classes = {};
igRF_.dom.classes.set = function(a, b) {
	a.className = b
};
igRF_.dom.classes.get = function(a) {
	var b = a.className;
	return b && typeof b.split == "function" ? b.split(" ") : []
};
igRF_.dom.classes.add = function(a) {
	var b = igRF_.dom.classes.get(a), c = igRF_.array.slice(arguments, 1), d = igRF_.dom.classes
			.Ae(b, c);
	a.className = b.join(" ");
	return d
};
igRF_.dom.classes.remove = function(a) {
	var b = igRF_.dom.classes.get(a), c = igRF_.array.slice(arguments, 1), d = igRF_.dom.classes
			.og(b, c);
	a.className = b.join(" ");
	return d
};
igRF_.dom.classes.Ae = function(a, b) {
	for (var c = 0, d = 0; d < b.length; d++)
		if (!igRF_.array.contains(a, b[d])) {
			a.push(b[d]);
			c++
		}
	return c == b.length
};
igRF_.dom.classes.og = function(a, b) {
	for (var c = 0, d = 0; d < a.length; d++)
		if (igRF_.array.contains(b, a[d])) {
			igRF_.array.splice(a, d--, 1);
			c++
		}
	return c == b.length
};
igRF_.dom.classes.swap = function(a, b, c) {
	for (var d = igRF_.dom.classes.get(a), e = igRF_d, f = 0; f < d.length; f++)
		if (d[f] == b) {
			igRF_.array.splice(d, f--, 1);
			e = igRF_b
		}
	if (e) {
		d.push(c);
		a.className = d.join(" ")
	}
	return e
};
igRF_.dom.classes.addRemove = function(a, b, c) {
	var d = igRF_.dom.classes.get(a);
	if (igRF_.isString(b))
		igRF_.array.remove(d, b);
	else
		igRF_.isArray(b) && igRF_.dom.classes.og(d, b);
	if (igRF_.isString(c) && !igRF_.array.contains(d, c))
		d.push(c);
	else
		igRF_.isArray(c) && igRF_.dom.classes.Ae(d, c);
	a.className = d.join(" ")
};
igRF_.dom.classes.has = function(a, b) {
	return igRF_.array.contains(igRF_.dom.classes.get(a), b)
};
igRF_.dom.classes.enable = function(a, b, c) {
	c ? igRF_.dom.classes.add(a, b) : igRF_.dom.classes.remove(a, b)
};
igRF_.dom.classes.toggle = function(a, b) {
	var c = !igRF_.dom.classes.has(a, b);
	igRF_.dom.classes.enable(a, b, c);
	return c
};
igRF_.dom.TagName = {
	A : "A",
	ABBR : "ABBR",
	ACRONYM : "ACRONYM",
	ADDRESS : "ADDRESS",
	APPLET : "APPLET",
	AREA : "AREA",
	B : "B",
	BASE : "BASE",
	BASEFONT : "BASEFONT",
	BDO : "BDO",
	BIG : "BIG",
	BLOCKQUOTE : "BLOCKQUOTE",
	BODY : "BODY",
	BR : "BR",
	BUTTON : "BUTTON",
	CAPTION : "CAPTION",
	CENTER : "CENTER",
	CITE : "CITE",
	CODE : "CODE",
	COL : "COL",
	COLGROUP : "COLGROUP",
	DD : "DD",
	DEL : "DEL",
	DFN : "DFN",
	DIR : "DIR",
	DIV : "DIV",
	DL : "DL",
	DT : "DT",
	EM : "EM",
	FIELDSET : "FIELDSET",
	FONT : "FONT",
	FORM : "FORM",
	FRAME : "FRAME",
	FRAMESET : "FRAMESET",
	H1 : "H1",
	H2 : "H2",
	H3 : "H3",
	H4 : "H4",
	H5 : "H5",
	H6 : "H6",
	HEAD : "HEAD",
	HR : "HR",
	HTML : "HTML",
	I : "I",
	IFRAME : "IFRAME",
	IMG : "IMG",
	INPUT : "INPUT",
	INS : "INS",
	ISINDEX : "ISINDEX",
	KBD : "KBD",
	LABEL : "LABEL",
	LEGEND : "LEGEND",
	LI : "LI",
	LINK : "LINK",
	MAP : "MAP",
	MENU : "MENU",
	META : "META",
	NOFRAMES : "NOFRAMES",
	NOSCRIPT : "NOSCRIPT",
	OBJECT : "OBJECT",
	OL : "OL",
	OPTGROUP : "OPTGROUP",
	OPTION : "OPTION",
	P : "P",
	PARAM : "PARAM",
	PRE : "PRE",
	Q : "Q",
	S : "S",
	SAMP : "SAMP",
	SCRIPT : "SCRIPT",
	SELECT : "SELECT",
	SMALL : "SMALL",
	SPAN : "SPAN",
	STRIKE : "STRIKE",
	STRONG : "STRONG",
	STYLE : "STYLE",
	SUB : "SUB",
	SUP : "SUP",
	TABLE : "TABLE",
	TBODY : "TBODY",
	TD : "TD",
	TEXTAREA : "TEXTAREA",
	TFOOT : "TFOOT",
	TH : "TH",
	THEAD : "THEAD",
	TITLE : "TITLE",
	TR : "TR",
	TT : "TT",
	U : "U",
	UL : "UL",
	VAR : "VAR"
};
igRF_.dom.ASSUME_QUIRKS_MODE = igRF_d;
igRF_.dom.ASSUME_STANDARDS_MODE = igRF_d;
igRF_.dom.Vg = igRF_.dom.ASSUME_QUIRKS_MODE || igRF_.dom.ASSUME_STANDARDS_MODE;
igRF_.dom.NodeType = {
	ELEMENT : 1,
	ATTRIBUTE : 2,
	TEXT : 3,
	CDATA_SECTION : 4,
	ENTITY_REFERENCE : 5,
	ENTITY : 6,
	PROCESSING_INSTRUCTION : 7,
	COMMENT : 8,
	DOCUMENT : 9,
	DOCUMENT_TYPE : 10,
	DOCUMENT_FRAGMENT : 11,
	NOTATION : 12
};
igRF_.dom.aa = function(a) {
	return a ? new igRF_.dom.DomHelper(igRF_.dom.o(a)) : igRF_.dom.eh
			|| (igRF_.dom.eh = new igRF_.dom.DomHelper)
};
igRF_.dom.oa = function() {
	return document
};
igRF_.dom.wb = function(a) {
	return igRF_.isString(a) ? document.getElementById(a) : a
};
igRF_.dom.oe = igRF_.dom.wb;
igRF_.dom.Na = function(a, b, c) {
	return igRF_.dom.hf(document, a, b, c)
};
igRF_.dom.hf = function(a, b, c, d) {
	var e = d || a, f = b && b != "*" ? b.toLowerCase() : "";
	if (e.querySelectorAll
			&& (f || c)
			&& (!igRF_.userAgent.WEBKIT || igRF_.dom.gb(a) || igRF_.userAgent
					.isVersion("528"))) {
		var g = f + (c ? "." + c : "");
		return e.querySelectorAll(g)
	}
	if (c && e.getElementsByClassName) {
		var h = e.getElementsByClassName(c);
		if (f) {
			for (var i = {}, j = 0, k = 0, l; l = h[k]; k++)
				if (f == l.nodeName.toLowerCase())
					i[j++] = l;
			i.length = j;
			return i
		} else
			return h
	}
	h = e.getElementsByTagName(f || "*");
	if (c) {
		i = {};
		for (k = j = 0; l = h[k]; k++) {
			var m = l.className;
			if (typeof m.split == "function"
					&& igRF_.array.contains(m.split(" "), c))
				i[j++] = l
		}
		i.length = j;
		return i
	} else
		return h
};
igRF_.dom.pe = igRF_.dom.Na;
igRF_.dom.Gc = function(a, b) {
	igRF_.object.forEach(b, function(c, d) {
				if (d == "style")
					a.style.cssText = c;
				else if (d == "class")
					a.className = c;
				else if (d == "for")
					a.htmlFor = c;
				else if (d in igRF_.dom.te)
					a.setAttribute(igRF_.dom.te[d], c);
				else
					a[d] = c
			})
};
igRF_.dom.te = {
	cellpadding : "cellPadding",
	cellspacing : "cellSpacing",
	colspan : "colSpan",
	rowspan : "rowSpan",
	valign : "vAlign",
	height : "height",
	width : "width",
	usemap : "useMap",
	frameborder : "frameBorder",
	type : "type"
};
igRF_.dom.qc = function(a) {
	return igRF_.dom.uf(a || window)
};
igRF_.dom.uf = function(a) {
	var b = a.document;
	if (igRF_.userAgent.WEBKIT && !igRF_.userAgent.isVersion("500")
			&& !igRF_.userAgent.MOBILE) {
		if (typeof a.innerHeight == "undefined")
			a = window;
		var c = a.innerHeight, d = a.document.documentElement.scrollHeight;
		if (a == a.top)
			if (d < c)
				c -= 15;
		return new igRF_.math.Size(a.innerWidth, c)
	}
	var e = igRF_.dom.gb(b)
			&& (!igRF_.userAgent.OPERA || igRF_.userAgent.OPERA
					&& igRF_.userAgent.isVersion("9.50"))
			? b.documentElement
			: b.body;
	return new igRF_.math.Size(e.clientWidth, e.clientHeight)
};
igRF_.dom.df = function() {
	return igRF_.dom.ef(window)
};
igRF_.dom.ef = function(a) {
	var b = a.document, c = 0;
	if (b) {
		var d = igRF_.dom.uf(a).height, e = b.body, f = b.documentElement;
		if (igRF_.dom.gb(b) && f.scrollHeight)
			c = f.scrollHeight != d ? f.scrollHeight : f.offsetHeight;
		else {
			var g = f.scrollHeight, h = f.offsetHeight;
			if (f.clientHeight != h) {
				g = e.scrollHeight;
				h = e.offsetHeight
			}
			c = g > d ? g > h ? g : h : g < h ? g : h
		}
	}
	return c
};
igRF_.dom.getPageScroll = function(a) {
	var b = a || igRF_.global || window;
	return igRF_.dom.aa(b.document).ab()
};
igRF_.dom.ab = function() {
	return igRF_.dom.ff(document)
};
igRF_.dom.ff = function(a) {
	var b = igRF_.dom.gd(a);
	return new igRF_.math.Coordinate(b.scrollLeft, b.scrollTop)
};
igRF_.dom.fd = function() {
	return igRF_.dom.gd(document)
};
igRF_.dom.gd = function(a) {
	return !igRF_.userAgent.WEBKIT && igRF_.dom.gb(a)
			? a.documentElement
			: a.body
};
igRF_.dom.eb = function(a) {
	return a ? igRF_.dom.zd(a) : window
};
igRF_.dom.zd = function(a) {
	if (a.parentWindow)
		return a.parentWindow;
	if (igRF_.userAgent.WEBKIT && !igRF_.userAgent.isVersion("500")
			&& !igRF_.userAgent.MOBILE) {
		var b = a.createElement("script");
		b.innerHTML = "document.parentWindow=window";
		var c = a.documentElement;
		c.appendChild(b);
		c.removeChild(b);
		return a.parentWindow
	}
	return a.defaultView
};
igRF_.dom.ma = function() {
	return igRF_.dom.Me(document, arguments)
};
igRF_.dom.Me = function(a, b) {
	var c = b[0], d = b[1];
	if (igRF_.userAgent.IE && d && (d.name || d.type)) {
		var e = ["<", c];
		d.name && e.push(' name="', igRF_.string.htmlEscape(d.name), '"');
		if (d.type) {
			e.push(' type="', igRF_.string.htmlEscape(d.type), '"');
			d = igRF_.cloneObject(d);
			delete d.type
		}
		e.push(">");
		c = e.join("")
	}
	var f = a.createElement(c);
	if (d)
		if (igRF_.isString(d))
			f.className = d;
		else
			igRF_.dom.Gc(f, d);
	if (b.length > 2) {
		function g(j) {
			if (j)
				f.appendChild(igRF_.isString(j) ? a.createTextNode(j) : j)
		}
		for (var h = 2; h < b.length; h++) {
			var i = b[h];
			igRF_.isArrayLike(i) && !igRF_.dom.wc(i)
					? igRF_.array.forEach(igRF_.dom.isNodeList(i) ? igRF_.array
									.clone(i) : i, g)
					: g(i)
		}
	}
	return f
};
igRF_.dom.qe = igRF_.dom.ma;
igRF_.dom.createElement = function(a) {
	return document.createElement(a)
};
igRF_.dom.createTextNode = function(a) {
	return document.createTextNode(a)
};
igRF_.dom.Ff = function(a) {
	return igRF_.dom.Gf(document, a)
};
igRF_.dom.Gf = function(a, b) {
	var c = a.createElement("div");
	c.innerHTML = b;
	if (c.childNodes.length == 1)
		return c.firstChild;
	else {
		for (var d = a.createDocumentFragment(); c.firstChild;)
			d.appendChild(c.firstChild);
		return d
	}
};
igRF_.dom.bf = function() {
	return igRF_.dom.va() ? "CSS1Compat" : "BackCompat"
};
igRF_.dom.va = function() {
	return igRF_.dom.gb(document)
};
igRF_.dom.gb = function(a) {
	if (igRF_.dom.Vg)
		return igRF_.dom.ASSUME_STANDARDS_MODE;
	return a.compatMode == "CSS1Compat"
};
igRF_.dom.canHaveChildren = function(a) {
	if (a.nodeType != igRF_.dom.NodeType.ELEMENT)
		return igRF_d;
	if ("canHaveChildren" in a)
		return a.canHaveChildren;
	switch (a.tagName) {
		case igRF_.dom.TagName.APPLET :
		case igRF_.dom.TagName.AREA :
		case igRF_.dom.TagName.BR :
		case igRF_.dom.TagName.COL :
		case igRF_.dom.TagName.FRAME :
		case igRF_.dom.TagName.HR :
		case igRF_.dom.TagName.IMG :
		case igRF_.dom.TagName.INPUT :
		case igRF_.dom.TagName.IFRAME :
		case igRF_.dom.TagName.ISINDEX :
		case igRF_.dom.TagName.LINK :
		case igRF_.dom.TagName.NOFRAMES :
		case igRF_.dom.TagName.NOSCRIPT :
		case igRF_.dom.TagName.META :
		case igRF_.dom.TagName.OBJECT :
		case igRF_.dom.TagName.PARAM :
		case igRF_.dom.TagName.SCRIPT :
		case igRF_.dom.TagName.STYLE :
			return igRF_d
	}
	return igRF_b
};
igRF_.dom.appendChild = function(a, b) {
	a.appendChild(b)
};
igRF_.dom.Ib = function(a) {
	for (var b; b = a.firstChild;)
		a.removeChild(b)
};
igRF_.dom.Od = function(a, b) {
	b.parentNode && b.parentNode.insertBefore(a, b)
};
igRF_.dom.Nd = function(a, b) {
	b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
igRF_.dom.removeNode = function(a) {
	return a && a.parentNode ? a.parentNode.removeChild(a) : igRF_c
};
igRF_.dom.replaceNode = function(a, b) {
	var c = b.parentNode;
	c && c.replaceChild(a, b)
};
igRF_.dom.dd = function(a) {
	var b, c = a.parentNode;
	if (c && c.nodeType != igRF_.dom.NodeType.DOCUMENT_FRAGMENT)
		if (a.removeNode)
			return a.removeNode(igRF_d);
		else {
			for (; b = a.firstChild;)
				c.insertBefore(b, a);
			return igRF_.dom.removeNode(a)
		}
};
igRF_.dom.jd = function(a) {
	return igRF_.dom.mc(a.firstChild, igRF_b)
};
igRF_.dom.md = function(a) {
	return igRF_.dom.mc(a.lastChild, igRF_d)
};
igRF_.dom.od = function(a) {
	return igRF_.dom.mc(a.nextSibling, igRF_b)
};
igRF_.dom.td = function(a) {
	return igRF_.dom.mc(a.previousSibling, igRF_d)
};
igRF_.dom.mc = function(a, b) {
	for (; a && a.nodeType != igRF_.dom.NodeType.ELEMENT;)
		a = b ? a.nextSibling : a.previousSibling;
	return a
};
igRF_.dom.wc = function(a) {
	return igRF_.isObject(a) && a.nodeType > 0
};
igRF_.dom.Ug = igRF_.userAgent.WEBKIT && igRF_.userAgent.isVersion("522");
igRF_.dom.contains = function(a, b) {
	if (typeof a.contains != "undefined" && !igRF_.dom.Ug
			&& b.nodeType == igRF_.dom.NodeType.ELEMENT)
		return a == b || a.contains(b);
	if (typeof a.compareDocumentPosition != "undefined")
		return a == b || Boolean(a.compareDocumentPosition(b) & 16);
	for (; b && a != b;)
		b = b.parentNode;
	return b == a
};
igRF_.dom.compareNodeOrder = function(a, b) {
	if (a == b)
		return 0;
	if (a.compareDocumentPosition)
		return a.compareDocumentPosition(b) & 2 ? 1 : -1;
	if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
		var c = a.nodeType == igRF_.dom.NodeType.ELEMENT, d = b.nodeType == igRF_.dom.NodeType.ELEMENT;
		if (c && d)
			return a.sourceIndex - b.sourceIndex;
		else {
			var e = a.parentNode, f = b.parentNode;
			if (e == f)
				return igRF_.dom.Le(a, b);
			if (!c && igRF_.dom.contains(e, b))
				return -1 * igRF_.dom.Ke(a, b);
			if (!d && igRF_.dom.contains(f, a))
				return igRF_.dom.Ke(b, a);
			return (c ? a.sourceIndex : e.sourceIndex)
					- (d ? b.sourceIndex : f.sourceIndex)
		}
	}
	var g = igRF_.dom.o(a), h, i;
	h = g.createRange();
	h.selectNode(a);
	h.collapse(igRF_b);
	i = g.createRange();
	i.selectNode(b);
	i.collapse(igRF_b);
	return h.compareBoundaryPoints(igRF_.global.Range.START_TO_END, i)
};
igRF_.dom.Ke = function(a, b) {
	var c = a.parentNode;
	if (c == b)
		return -1;
	for (var d = b; d.parentNode != c;)
		d = d.parentNode;
	return igRF_.dom.Le(d, a)
};
igRF_.dom.Le = function(a, b) {
	for (var c = b; c = c.previousSibling;)
		if (c == a)
			return -1;
	return 1
};
igRF_.dom.findCommonAncestor = function() {
	var a, b = arguments.length;
	if (b) {
		if (b == 1)
			return arguments[0]
	} else
		return igRF_c;
	var c = [], d = Infinity;
	for (a = 0; a < b; a++) {
		for (var e = [], f = arguments[a]; f;) {
			e.unshift(f);
			f = f.parentNode
		}
		c.push(e);
		d = Math.min(d, e.length)
	}
	var g = igRF_c;
	for (a = 0; a < d; a++) {
		for (var h = c[0][a], i = 1; i < b; i++)
			if (h != c[i][a])
				return g;
		g = h
	}
	return g
};
igRF_.dom.o = function(a) {
	return a.nodeType == igRF_.dom.NodeType.DOCUMENT ? a : a.ownerDocument
			|| a.document
};
igRF_.dom.ic = function(a) {
	var b;
	return b = igRF_.userAgent.WEBKIT
			? a.document || a.contentWindow.document
			: a.contentDocument || a.contentWindow.document
};
igRF_.dom.kd = function(a) {
	return a.contentWindow || igRF_.dom.zd(igRF_.dom.ic(a))
};
igRF_.dom.je = function(a, b) {
	if ("textContent" in a)
		a.textContent = b;
	else if (a.firstChild && a.firstChild.nodeType == igRF_.dom.NodeType.TEXT) {
		for (; a.lastChild != a.firstChild;)
			a.removeChild(a.lastChild);
		a.firstChild.data = b
	} else {
		igRF_.dom.Ib(a);
		var c = igRF_.dom.o(a);
		a.appendChild(c.createTextNode(b))
	}
};
igRF_.dom.getOuterHtml = function(a) {
	if ("outerHTML" in a)
		return a.outerHTML;
	else {
		var b = igRF_.dom.o(a), c = b.createElement("div");
		c.appendChild(a.cloneNode(igRF_b));
		return c.innerHTML
	}
};
igRF_.dom.ad = function(a, b) {
	var c = [], d = igRF_.dom.cd(a, b, c, igRF_b);
	return d ? c[0] : undefined
};
igRF_.dom.bd = function(a, b) {
	var c = [];
	igRF_.dom.cd(a, b, c, igRF_d);
	return c
};
igRF_.dom.cd = function(a, b, c, d) {
	if (a != igRF_c)
		for (var e = 0, f; f = a.childNodes[e]; e++) {
			if (b(f)) {
				c.push(f);
				if (d)
					return igRF_b
			}
			if (igRF_.dom.cd(f, b, c, d))
				return igRF_b
		}
	return igRF_d
};
igRF_.dom.we = {
	SCRIPT : 1,
	STYLE : 1,
	HEAD : 1,
	IFRAME : 1,
	OBJECT : 1
};
igRF_.dom.Vb = {
	IMG : " ",
	BR : "\n"
};
igRF_.dom.isFocusableTabIndex = function(a) {
	var b = a.getAttributeNode("tabindex");
	if (b && b.specified) {
		var c = a.tabIndex;
		return igRF_.isNumber(c) && c >= 0
	}
	return igRF_d
};
igRF_.dom.setFocusableTabIndex = function(a, b) {
	if (b)
		a.tabIndex = 0;
	else
		a.removeAttribute("tabIndex")
};
igRF_.dom.zb = function(a) {
	var b;
	if (igRF_.userAgent.IE && "innerText" in a)
		b = igRF_.string.canonicalizeNewlines(a.innerText);
	else {
		var c = [];
		igRF_.dom.xd(a, c, igRF_b);
		b = c.join("")
	}
	b = b.replace(/\xAD/g, "");
	b = b.replace(/ +/g, " ");
	if (b != " ")
		b = b.replace(/^\s*/, "");
	return b
};
igRF_.dom.getRawTextContent = function(a) {
	var b = [];
	igRF_.dom.xd(a, b, igRF_d);
	return b.join("")
};
igRF_.dom.xd = function(a, b, c) {
	if (!(a.nodeName in igRF_.dom.we))
		if (a.nodeType == igRF_.dom.NodeType.TEXT)
			c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b
					.push(a.nodeValue);
		else if (a.nodeName in igRF_.dom.Vb)
			b.push(igRF_.dom.Vb[a.nodeName]);
		else
			for (var d = a.firstChild; d;) {
				igRF_.dom.xd(d, b, c);
				d = d.nextSibling
			}
};
igRF_.dom.pd = function(a) {
	return igRF_.dom.zb(a).length
};
igRF_.dom.qd = function(a, b) {
	for (var c = b || igRF_.dom.o(a).body, d = []; a && a != c;) {
		for (var e = a; e = e.previousSibling;)
			d.unshift(igRF_.dom.zb(e));
		a = a.parentNode
	}
	return igRF_.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
igRF_.dom.getNodeAtOffset = function(a, b, c) {
	for (var d = [a], e = 0, f; d.length > 0 && e < b;) {
		f = d.pop();
		if (!(f.nodeName in igRF_.dom.we))
			if (f.nodeType == igRF_.dom.NodeType.TEXT) {
				var g = f.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g,
						" ");
				e += g.length
			} else if (f.nodeName in igRF_.dom.Vb)
				e += igRF_.dom.Vb[f.nodeName].length;
			else
				for (var h = f.childNodes.length - 1; h >= 0; h--)
					d.push(f.childNodes[h])
	}
	if (igRF_.isObject(c)) {
		c.remainder = f ? f.nodeValue.length + b - e - 1 : 0;
		c.node = f
	}
	return f
};
igRF_.dom.isNodeList = function(a) {
	if (a && typeof a.length == "number")
		if (igRF_.isObject(a))
			return typeof a.item == "function" || typeof a.item == "string";
		else if (igRF_.isFunction(a))
			return typeof a.item == "function";
	return igRF_d
};
igRF_.dom.ed = function(a, b, c) {
	return igRF_.dom.gc(a, function(d) {
				return (!b || d.nodeName == b)
						&& (!c || igRF_.dom.classes.has(d, c))
			}, igRF_b)
};
igRF_.dom.gc = function(a, b, c, d) {
	if (!c)
		a = a.parentNode;
	for (var e = d == igRF_c, f = 0; a && (e || f <= d);) {
		if (b(a))
			return a;
		a = a.parentNode;
		f++
	}
	return igRF_c
};
igRF_.dom.DomHelper = function(a) {
	this.ea = a || igRF_.global.document || document
};
igRF_.dom.DomHelper.prototype.aa = igRF_.dom.aa;
igRF_.dom.DomHelper.prototype.oa = function() {
	return this.ea
};
igRF_.dom.DomHelper.prototype.wb = function(a) {
	return igRF_.isString(a) ? this.ea.getElementById(a) : a
};
igRF_.dom.DomHelper.prototype.oe = igRF_.dom.DomHelper.prototype.wb;
igRF_.dom.DomHelper.prototype.Na = function(a, b, c) {
	return igRF_.dom.hf(this.ea, a, b, c)
};
igRF_.dom.DomHelper.prototype.pe = igRF_.dom.DomHelper.prototype.Na;
igRF_.dom.DomHelper.prototype.Gc = igRF_.dom.Gc;
igRF_.dom.DomHelper.prototype.qc = function(a) {
	return igRF_.dom.qc(a || this.eb())
};
igRF_.dom.DomHelper.prototype.df = function() {
	return igRF_.dom.ef(this.eb())
};
igRF_.dom.DomHelper.prototype.ma = function() {
	return igRF_.dom.Me(this.ea, arguments)
};
igRF_.dom.DomHelper.prototype.qe = igRF_.dom.DomHelper.prototype.ma;
igRF_.dom.DomHelper.prototype.createElement = function(a) {
	return this.ea.createElement(a)
};
igRF_.dom.DomHelper.prototype.createTextNode = function(a) {
	return this.ea.createTextNode(a)
};
igRF_.dom.DomHelper.prototype.Ff = function(a) {
	return igRF_.dom.Gf(this.ea, a)
};
igRF_.dom.DomHelper.prototype.bf = function() {
	return this.va() ? "CSS1Compat" : "BackCompat"
};
igRF_.dom.DomHelper.prototype.va = function() {
	return igRF_.dom.gb(this.ea)
};
igRF_.dom.DomHelper.prototype.eb = function() {
	return igRF_.dom.zd(this.ea)
};
igRF_.dom.DomHelper.prototype.fd = function() {
	return igRF_.dom.gd(this.ea)
};
igRF_.dom.DomHelper.prototype.ab = function() {
	return igRF_.dom.ff(this.ea)
};
igRF_.dom.DomHelper.prototype.appendChild = igRF_.dom.appendChild;
igRF_.dom.DomHelper.prototype.Ib = igRF_.dom.Ib;
igRF_.dom.DomHelper.prototype.Od = igRF_.dom.Od;
igRF_.dom.DomHelper.prototype.Nd = igRF_.dom.Nd;
igRF_.dom.DomHelper.prototype.removeNode = igRF_.dom.removeNode;
igRF_.dom.DomHelper.prototype.replaceNode = igRF_.dom.replaceNode;
igRF_.dom.DomHelper.prototype.dd = igRF_.dom.dd;
igRF_.dom.DomHelper.prototype.jd = igRF_.dom.jd;
igRF_.dom.DomHelper.prototype.md = igRF_.dom.md;
igRF_.dom.DomHelper.prototype.od = igRF_.dom.od;
igRF_.dom.DomHelper.prototype.td = igRF_.dom.td;
igRF_.dom.DomHelper.prototype.wc = igRF_.dom.wc;
igRF_.dom.DomHelper.prototype.contains = igRF_.dom.contains;
igRF_.dom.DomHelper.prototype.o = igRF_.dom.o;
igRF_.dom.DomHelper.prototype.ic = igRF_.dom.ic;
igRF_.dom.DomHelper.prototype.kd = igRF_.dom.kd;
igRF_.dom.DomHelper.prototype.je = igRF_.dom.je;
igRF_.dom.DomHelper.prototype.ad = igRF_.dom.ad;
igRF_.dom.DomHelper.prototype.bd = igRF_.dom.bd;
igRF_.dom.DomHelper.prototype.zb = igRF_.dom.zb;
igRF_.dom.DomHelper.prototype.pd = igRF_.dom.pd;
igRF_.dom.DomHelper.prototype.qd = igRF_.dom.qd;
igRF_.dom.DomHelper.prototype.ed = igRF_.dom.ed;
igRF_.dom.DomHelper.prototype.gc = igRF_.dom.gc;
igRF_.dom.a11y = {};
igRF_.dom.a11y.State = {
	ACTIVEDESCENDANT : "activedescendant",
	AUTOCOMPLETE : "autocomplete",
	CHECKED : "checked",
	DISABLED : "disabled",
	EXPANDED : "expanded",
	HASPOPUP : "haspopup",
	LABELLEDBY : "labelledby",
	LEVEL : "level",
	PRESSED : "pressed",
	SELECTED : "selected",
	VALUEMAX : "valuemax",
	VALUEMIN : "valuemin",
	VALUENOW : "valuenow"
};
igRF_.dom.a11y.Role = {
	BUTTON : "button",
	CHECKBOX : "checkbox",
	COMBOBOX : "combobox",
	DIALOG : "dialog",
	LINK : "link",
	LISTBOX : "listbox",
	MAIN : "main",
	MENU : "menu",
	MENUBAR : "menubar",
	MENU_ITEM : "menuitem",
	MENU_ITEM_CHECKBOX : "menuitemcheckbox",
	MENU_ITEM_RADIO : "menuitemradio",
	NAVIGATION : "navigation",
	OPTION : "option",
	GROUP : "group",
	SLIDER : "slider",
	TAB : "tab",
	TAB_LIST : "tablist",
	TAB_PANEL : "tabpanel",
	TOOLBAR : "toolbar"
};
igRF_.dom.a11y.setRole = function(a, b) {
	if (igRF_.userAgent.GECKO || igRF_.dom.a11y.Vd) {
		a.setAttribute("role", b);
		a.roleName = b
	}
};
igRF_.dom.a11y.getRole = function(a) {
	return a.roleName || ""
};
igRF_.dom.a11y.setState = function(a, b, c) {
	if (igRF_.userAgent.GECKO || igRF_.dom.a11y.Vd)
		a.setAttribute("aria-" + b, c)
};
igRF_.dom.a11y.getState = function(a, b) {
	return a.getAttribute("aria-" + b) || ""
};
igRF_.dom.a11y.getNoBrowserCheck = function() {
	return !!igRF_.dom.a11y.Vd
};
igRF_.dom.a11y.setNoBrowserCheck = function(a) {
	igRF_.dom.a11y.Vd = a
};
igRF_.dom.a11y.getActiveDescendant = function(a) {
	var b = igRF_.dom.a11y.getState(a, igRF_.dom.a11y.State.ACTIVEDESCENDANT);
	return igRF_.dom.o(a).getElementById(b)
};
igRF_.dom.a11y.setActiveDescendant = function(a, b) {
	igRF_.dom.a11y.setState(a, igRF_.dom.a11y.State.ACTIVEDESCENDANT, b
					? b.id
					: "")
};
igRF_.dom.selection = {};
igRF_.dom.selection.setStart = function(a, b) {
	if (igRF_.dom.selection.lb(a))
		a.selectionStart = b;
	else if (igRF_.userAgent.IE) {
		var c = igRF_.dom.selection.yb(a), d = c[0], e = c[1];
		if (d.inRange(e)) {
			b = igRF_.dom.selection.$b(a, b);
			d.collapse(igRF_b);
			d.move("character", b);
			d.select()
		}
	}
};
igRF_.dom.selection.getStart = function(a) {
	return igRF_.dom.selection.hd(a, igRF_b)[0]
};
igRF_.dom.selection.qh = function(a, b, c) {
	for (var d = b.duplicate(), e = a.text, f = e, g = d.text, h = g, i = igRF_d; !i;)
		if (a.compareEndPoints("StartToEnd", a) == 0)
			i = igRF_b;
		else {
			a.moveEnd("character", -1);
			if (a.text == e)
				f += "\r\n";
			else
				i = igRF_b
		}
	if (c)
		return [f.length, -1];
	for (var j = igRF_d; !j;)
		if (d.compareEndPoints("StartToEnd", d) == 0)
			j = igRF_b;
		else {
			d.moveEnd("character", -1);
			if (d.text == g)
				h += "\r\n";
			else
				j = igRF_b
		}
	return [f.length, f.length + h.length]
};
igRF_.dom.selection.getEndPoints = function(a) {
	return igRF_.dom.selection.hd(a, igRF_d)
};
igRF_.dom.selection.hd = function(a, b) {
	var c = 0, d = 0;
	if (igRF_.dom.selection.lb(a)) {
		c = a.selectionStart;
		d = b ? -1 : a.selectionEnd
	} else if (igRF_.userAgent.IE) {
		var e = igRF_.dom.selection.yb(a), f = e[0], g = e[1];
		if (f.inRange(g)) {
			f.setEndPoint("EndToStart", g);
			if (a.type == "textarea")
				return igRF_.dom.selection.qh(f, g, b);
			c = f.text.length;
			d = b ? -1 : f.text.length + g.text.length
		}
	}
	return [c, d]
};
igRF_.dom.selection.setEnd = function(a, b) {
	if (igRF_.dom.selection.lb(a))
		a.selectionEnd = b;
	else if (igRF_.userAgent.IE) {
		var c = igRF_.dom.selection.yb(a), d = c[0], e = c[1];
		if (d.inRange(e)) {
			b = igRF_.dom.selection.$b(a, b);
			var f = igRF_.dom.selection.$b(a, igRF_.dom.selection.getStart(a));
			e.collapse(igRF_b);
			e.moveEnd("character", b - f);
			e.select()
		}
	}
};
igRF_.dom.selection.getEnd = function(a) {
	return igRF_.dom.selection.hd(a, igRF_d)[1]
};
igRF_.dom.selection.setCursorPosition = function(a, b) {
	if (igRF_.dom.selection.lb(a)) {
		a.selectionStart = b;
		a.selectionEnd = b
	} else if (igRF_.userAgent.IE) {
		b = igRF_.dom.selection.$b(a, b);
		var c = a.createTextRange();
		c.collapse(igRF_b);
		c.move("character", b);
		c.select()
	}
};
igRF_.dom.selection.setText = function(a, b) {
	if (igRF_.dom.selection.lb(a)) {
		var c = a.value, d = a.selectionStart, e = c.substr(0, d), f = c
				.substr(a.selectionEnd);
		a.value = e + b + f;
		a.selectionStart = d;
		a.selectionEnd = d + b.length
	} else if (igRF_.userAgent.IE) {
		var g = igRF_.dom.selection.yb(a), h = g[0], i = g[1];
		if (h.inRange(i)) {
			var j = i.duplicate();
			i.text = b;
			i.setEndPoint("StartToStart", j);
			i.select()
		}
	} else
		igRF_a(Error("Cannot set the selection end"))
};
igRF_.dom.selection.getText = function(a) {
	if (igRF_.dom.selection.lb(a)) {
		var b = a.value;
		return b.substring(a.selectionStart, a.selectionEnd)
	}
	if (igRF_.userAgent.IE) {
		var c = igRF_.dom.selection.yb(a), d = c[0], e = c[1];
		if (d.inRange(e)) {
			if (a.type == "textarea")
				return igRF_.dom.selection.rh(e)
		} else
			return "";
		return e.text
	}
	igRF_a(Error("Cannot get the selection text"))
};
igRF_.dom.selection.rh = function(a) {
	for (var b = a.duplicate(), c = b.text, d = c, e = igRF_d; !e;)
		if (b.compareEndPoints("StartToEnd", b) == 0)
			e = igRF_b;
		else {
			b.moveEnd("character", -1);
			if (b.text == c)
				d += "\r\n";
			else
				e = igRF_b
		}
	return d
};
igRF_.dom.selection.yb = function(a) {
	var b = a.ownerDocument || a.document, c = b.selection.createRange(), d;
	if (a.type == "textarea") {
		d = b.body.createTextRange();
		d.moveToElementText(a)
	} else
		d = a.createTextRange();
	return [d, c]
};
igRF_.dom.selection.$b = function(a, b) {
	if (a.type == "textarea") {
		var c = a.value.substring(0, b);
		b = igRF_.string.canonicalizeNewlines(c).length
	}
	return b
};
igRF_.dom.selection.lb = function(a) {
	try {
		return typeof a.selectionStart == "number"
	} catch (b) {
		return igRF_d
	}
};
igRF_.events.EventHandler = function(a) {
	this.Gd = a
};
igRF_.inherits(igRF_.events.EventHandler, igRF_.Disposable);
igRF_.events.EventHandler.KEY_POOL_INITIAL_COUNT = 0;
igRF_.events.EventHandler.KEY_POOL_MAX_COUNT = 100;
igRF_.events.EventHandler.Of = new igRF_.structs.SimplePool(
		igRF_.events.EventHandler.KEY_POOL_INITIAL_COUNT,
		igRF_.events.EventHandler.KEY_POOL_MAX_COUNT);
igRF_.events.EventHandler.a = igRF_c;
igRF_.events.EventHandler.wa = igRF_c;
igRF_.events.EventHandler.prototype.listen = function(a, b, c, d, e) {
	if (igRF_.isArray(b))
		for (var f = 0; f < b.length; f++)
			this.listen(a, b[f], c, d, e);
	else {
		var g = igRF_.events.listen(a, b, c || this, d || igRF_d, e || this.Gd
						|| this);
		this.fe(g)
	}
	return this
};
igRF_.events.EventHandler.prototype.Fb = function(a, b, c, d, e) {
	if (igRF_.isArray(b))
		for (var f = 0; f < b.length; f++)
			this.Fb(a, b[f], c, d, e);
	else {
		var g = igRF_.events.Fb(a, b, c || this, d || igRF_d, e || this.Gd
						|| this);
		this.fe(g)
	}
	return this
};
igRF_.events.EventHandler.prototype.Rf = function(a, b, c, d, e) {
	b.listen(a, c, d, e, this)
};
igRF_.events.EventHandler.prototype.fe = function(a) {
	if (this.a)
		this.a[a] = igRF_b;
	else if (this.wa) {
		this.a = igRF_.events.EventHandler.Of.ia();
		this.a[this.wa] = igRF_b;
		this.wa = igRF_c;
		this.a[a] = igRF_b
	} else
		this.wa = a
};
igRF_.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
	if (this.wa || this.a)
		if (igRF_.isArray(b))
			for (var f = 0; f < b.length; f++)
				this.unlisten(a, b[f], c, d, e);
		else {
			var g = igRF_.events.getListener(a, b, c || this, d || igRF_d, e
							|| this.Gd || this);
			if (g) {
				var h = g.key;
				igRF_.events.unlistenByKey(h);
				if (this.a)
					igRF_.object.remove(this.a, h);
				else if (this.wa == h)
					this.wa = igRF_c
			}
		}
	return this
};
igRF_.events.EventHandler.prototype.Qg = function(a, b, c, d, e) {
	b.unlisten(a, c, d, e, this)
};
igRF_.events.EventHandler.prototype.jb = function() {
	if (this.a) {
		for (var a in this.a) {
			igRF_.events.unlistenByKey(a);
			delete this.a[a]
		}
		igRF_.events.EventHandler.Of.ka(this.a);
		this.a = igRF_c
	} else
		this.wa && igRF_.events.unlistenByKey(this.wa)
};
igRF_.events.EventHandler.prototype.c = function() {
	igRF_.events.EventHandler.Aa.c.call(this);
	this.jb()
};
igRF_.events.EventHandler.prototype.handleEvent = function() {
	igRF_a(Error("EventHandler.handleEvent not implemented"))
};
igRF_.events.KeyCodes = {
	MAC_ENTER : 3,
	BACKSPACE : 8,
	TAB : 9,
	NUM_CENTER : 12,
	ENTER : 13,
	SHIFT : 16,
	CTRL : 17,
	ALT : 18,
	PAUSE : 19,
	CAPS_LOCK : 20,
	ESC : 27,
	SPACE : 32,
	PAGE_UP : 33,
	PAGE_DOWN : 34,
	END : 35,
	HOME : 36,
	LEFT : 37,
	UP : 38,
	RIGHT : 39,
	DOWN : 40,
	PRINT_SCREEN : 44,
	INSERT : 45,
	DELETE : 46,
	ZERO : 48,
	ONE : 49,
	TWO : 50,
	THREE : 51,
	FOUR : 52,
	FIVE : 53,
	SIX : 54,
	SEVEN : 55,
	EIGHT : 56,
	NINE : 57,
	QUESTION_MARK : 63,
	A : 65,
	B : 66,
	C : 67,
	D : 68,
	E : 69,
	F : 70,
	G : 71,
	H : 72,
	I : 73,
	J : 74,
	K : 75,
	L : 76,
	M : 77,
	N : 78,
	O : 79,
	P : 80,
	Q : 81,
	R : 82,
	S : 83,
	T : 84,
	U : 85,
	V : 86,
	W : 87,
	X : 88,
	Y : 89,
	Z : 90,
	META : 91,
	CONTEXT_MENU : 93,
	NUM_ZERO : 96,
	NUM_ONE : 97,
	NUM_TWO : 98,
	NUM_THREE : 99,
	NUM_FOUR : 100,
	NUM_FIVE : 101,
	NUM_SIX : 102,
	NUM_SEVEN : 103,
	NUM_EIGHT : 104,
	NUM_NINE : 105,
	NUM_MULTIPLY : 106,
	NUM_PLUS : 107,
	NUM_MINUS : 109,
	NUM_PERIOD : 110,
	NUM_DIVISION : 111,
	F1 : 112,
	F2 : 113,
	F3 : 114,
	F4 : 115,
	F5 : 116,
	F6 : 117,
	F7 : 118,
	F8 : 119,
	F9 : 120,
	F10 : 121,
	F11 : 122,
	F12 : 123,
	NUMLOCK : 144,
	SEMICOLON : 186,
	DASH : 189,
	EQUALS : 187,
	COMMA : 188,
	PERIOD : 190,
	SLASH : 191,
	APOSTROPHE : 192,
	SINGLE_QUOTE : 222,
	OPEN_SQUARE_BRACKET : 219,
	BACKSLASH : 220,
	CLOSE_SQUARE_BRACKET : 221,
	WIN_KEY : 224,
	MAC_FF_META : 224,
	WIN_IME : 229
};
igRF_.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
	if (a.altKey && !a.ctrlKey || a.metaKey
			|| a.keyCode >= igRF_.events.KeyCodes.F1
			&& a.keyCode <= igRF_.events.KeyCodes.F12)
		return igRF_d;
	switch (a.keyCode) {
		case igRF_.events.KeyCodes.ALT :
		case igRF_.events.KeyCodes.SHIFT :
		case igRF_.events.KeyCodes.CTRL :
		case igRF_.events.KeyCodes.PAUSE :
		case igRF_.events.KeyCodes.CAPS_LOCK :
		case igRF_.events.KeyCodes.ESC :
		case igRF_.events.KeyCodes.PAGE_UP :
		case igRF_.events.KeyCodes.PAGE_DOWN :
		case igRF_.events.KeyCodes.HOME :
		case igRF_.events.KeyCodes.END :
		case igRF_.events.KeyCodes.LEFT :
		case igRF_.events.KeyCodes.RIGHT :
		case igRF_.events.KeyCodes.UP :
		case igRF_.events.KeyCodes.DOWN :
		case igRF_.events.KeyCodes.INSERT :
		case igRF_.events.KeyCodes.NUMLOCK :
		case igRF_.events.KeyCodes.CONTEXT_MENU :
		case igRF_.events.KeyCodes.PRINT_SCREEN :
			return igRF_d;
		default :
			return igRF_b
	}
};
igRF_.events.KeyCodes.firesKeyPressEvent = function(a, b, c, d) {
	if (!igRF_.userAgent.IE
			&& !(igRF_.userAgent.WEBKIT && igRF_.userAgent.isVersion("525")))
		return igRF_b;
	if (igRF_.userAgent.IE
			&& !c
			&& (b == igRF_.events.KeyCodes.CTRL || b == igRF_.events.KeyCodes.ALT))
		return igRF_d;
	if (igRF_.userAgent.IE && d && b == a)
		return igRF_d;
	if (a >= igRF_.events.KeyCodes.ZERO && a <= igRF_.events.KeyCodes.NINE)
		return igRF_b;
	if (a >= igRF_.events.KeyCodes.NUM_ZERO
			&& a <= igRF_.events.KeyCodes.NUM_MULTIPLY)
		return igRF_b;
	if (a >= igRF_.events.KeyCodes.A && a <= igRF_.events.KeyCodes.Z)
		return igRF_b;
	if (a == igRF_.events.KeyCodes.ESC && igRF_.userAgent.WEBKIT)
		return igRF_d;
	switch (a) {
		case igRF_.events.KeyCodes.ENTER :
		case igRF_.events.KeyCodes.ESC :
		case igRF_.events.KeyCodes.SPACE :
		case igRF_.events.KeyCodes.QUESTION_MARK :
		case igRF_.events.KeyCodes.NUM_PLUS :
		case igRF_.events.KeyCodes.NUM_MINUS :
		case igRF_.events.KeyCodes.NUM_PERIOD :
		case igRF_.events.KeyCodes.NUM_DIVISION :
		case igRF_.events.KeyCodes.SEMICOLON :
		case igRF_.events.KeyCodes.DASH :
		case igRF_.events.KeyCodes.EQUALS :
		case igRF_.events.KeyCodes.COMMA :
		case igRF_.events.KeyCodes.PERIOD :
		case igRF_.events.KeyCodes.SLASH :
		case igRF_.events.KeyCodes.APOSTROPHE :
		case igRF_.events.KeyCodes.SINGLE_QUOTE :
		case igRF_.events.KeyCodes.OPEN_SQUARE_BRACKET :
		case igRF_.events.KeyCodes.BACKSLASH :
		case igRF_.events.KeyCodes.CLOSE_SQUARE_BRACKET :
			return igRF_b;
		default :
			return igRF_d
	}
};
igRF_.events.KeyCodes.isCharacterKey = function(a) {
	if (a >= igRF_.events.KeyCodes.ZERO && a <= igRF_.events.KeyCodes.NINE)
		return igRF_b;
	if (a >= igRF_.events.KeyCodes.NUM_ZERO
			&& a <= igRF_.events.KeyCodes.NUM_MULTIPLY)
		return igRF_b;
	if (a >= igRF_.events.KeyCodes.A && a <= igRF_.events.KeyCodes.Z)
		return igRF_b;
	switch (a) {
		case igRF_.events.KeyCodes.SPACE :
		case igRF_.events.KeyCodes.QUESTION_MARK :
		case igRF_.events.KeyCodes.NUM_PLUS :
		case igRF_.events.KeyCodes.NUM_MINUS :
		case igRF_.events.KeyCodes.NUM_PERIOD :
		case igRF_.events.KeyCodes.NUM_DIVISION :
		case igRF_.events.KeyCodes.SEMICOLON :
		case igRF_.events.KeyCodes.DASH :
		case igRF_.events.KeyCodes.EQUALS :
		case igRF_.events.KeyCodes.COMMA :
		case igRF_.events.KeyCodes.PERIOD :
		case igRF_.events.KeyCodes.SLASH :
		case igRF_.events.KeyCodes.APOSTROPHE :
		case igRF_.events.KeyCodes.SINGLE_QUOTE :
		case igRF_.events.KeyCodes.OPEN_SQUARE_BRACKET :
		case igRF_.events.KeyCodes.BACKSLASH :
		case igRF_.events.KeyCodes.CLOSE_SQUARE_BRACKET :
			return igRF_b;
		default :
			return igRF_d
	}
};
igRF_.events.KeyHandler = function(a) {
	igRF_.events.EventTarget.call(this);
	a && this.attach(a)
};
igRF_.inherits(igRF_.events.KeyHandler, igRF_.events.EventTarget);
igRF_.events.KeyHandler.prototype.d = igRF_c;
igRF_.events.KeyHandler.prototype.Db = igRF_c;
igRF_.events.KeyHandler.prototype.xc = igRF_c;
igRF_.events.KeyHandler.prototype.Eb = igRF_c;
igRF_.events.KeyHandler.prototype.hb = -1;
igRF_.events.KeyHandler.prototype.Pa = -1;
igRF_.events.KeyHandler.EventType = {
	KEY : "key"
};
igRF_.events.KeyHandler.sg = {
	"3" : igRF_.events.KeyCodes.ENTER,
	"12" : igRF_.events.KeyCodes.NUMLOCK,
	"63232" : igRF_.events.KeyCodes.UP,
	"63233" : igRF_.events.KeyCodes.DOWN,
	"63234" : igRF_.events.KeyCodes.LEFT,
	"63235" : igRF_.events.KeyCodes.RIGHT,
	"63236" : igRF_.events.KeyCodes.F1,
	"63237" : igRF_.events.KeyCodes.F2,
	"63238" : igRF_.events.KeyCodes.F3,
	"63239" : igRF_.events.KeyCodes.F4,
	"63240" : igRF_.events.KeyCodes.F5,
	"63241" : igRF_.events.KeyCodes.F6,
	"63242" : igRF_.events.KeyCodes.F7,
	"63243" : igRF_.events.KeyCodes.F8,
	"63244" : igRF_.events.KeyCodes.F9,
	"63245" : igRF_.events.KeyCodes.F10,
	"63246" : igRF_.events.KeyCodes.F11,
	"63247" : igRF_.events.KeyCodes.F12,
	"63248" : igRF_.events.KeyCodes.PRINT_SCREEN,
	"63272" : igRF_.events.KeyCodes.DELETE,
	"63273" : igRF_.events.KeyCodes.HOME,
	"63275" : igRF_.events.KeyCodes.END,
	"63276" : igRF_.events.KeyCodes.PAGE_UP,
	"63277" : igRF_.events.KeyCodes.PAGE_DOWN,
	"63289" : igRF_.events.KeyCodes.NUMLOCK,
	"63302" : igRF_.events.KeyCodes.INSERT
};
igRF_.events.KeyHandler.Nf = {
	Up : igRF_.events.KeyCodes.UP,
	Down : igRF_.events.KeyCodes.DOWN,
	Left : igRF_.events.KeyCodes.LEFT,
	Right : igRF_.events.KeyCodes.RIGHT,
	Enter : igRF_.events.KeyCodes.ENTER,
	F1 : igRF_.events.KeyCodes.F1,
	F2 : igRF_.events.KeyCodes.F2,
	F3 : igRF_.events.KeyCodes.F3,
	F4 : igRF_.events.KeyCodes.F4,
	F5 : igRF_.events.KeyCodes.F5,
	F6 : igRF_.events.KeyCodes.F6,
	F7 : igRF_.events.KeyCodes.F7,
	F8 : igRF_.events.KeyCodes.F8,
	F9 : igRF_.events.KeyCodes.F9,
	F10 : igRF_.events.KeyCodes.F10,
	F11 : igRF_.events.KeyCodes.F11,
	F12 : igRF_.events.KeyCodes.F12,
	"U+007F" : igRF_.events.KeyCodes.DELETE,
	Home : igRF_.events.KeyCodes.HOME,
	End : igRF_.events.KeyCodes.END,
	PageUp : igRF_.events.KeyCodes.PAGE_UP,
	PageDown : igRF_.events.KeyCodes.PAGE_DOWN,
	Insert : igRF_.events.KeyCodes.INSERT
};
igRF_.events.KeyHandler.ag = {
	61 : 187,
	59 : 186
};
igRF_.events.KeyHandler.$g = igRF_.userAgent.IE || igRF_.userAgent.WEBKIT
		&& igRF_.userAgent.isVersion("525");
igRF_.events.KeyHandler.prototype.wf = function(a) {
	if (igRF_.events.KeyHandler.$g
			&& !igRF_.events.KeyCodes.firesKeyPressEvent(a.keyCode, this.hb,
					a.shiftKey, a.ctrlKey))
		this.handleEvent(a);
	else
		this.Pa = igRF_.userAgent.GECKO
				&& a.keyCode in igRF_.events.KeyHandler.ag
				? igRF_.events.KeyHandler.ag[a.keyCode]
				: a.keyCode
};
igRF_.events.KeyHandler.prototype.yf = function() {
	this.Pa = this.hb = -1
};
igRF_.events.KeyHandler.prototype.handleEvent = function(a) {
	var b = a.af(), c, d;
	if (igRF_.userAgent.IE && a.type == igRF_.events.EventType.KEYPRESS) {
		c = this.Pa;
		d = c != igRF_.events.KeyCodes.ENTER && c != igRF_.events.KeyCodes.ESC
				? b.keyCode
				: 0
	} else if (igRF_.userAgent.WEBKIT
			&& a.type == igRF_.events.EventType.KEYPRESS) {
		c = this.Pa;
		d = b.charCode >= 0 && b.charCode < 63232
				&& igRF_.events.KeyCodes.isCharacterKey(c) ? b.charCode : 0
	} else if (igRF_.userAgent.OPERA) {
		c = this.Pa;
		d = igRF_.events.KeyCodes.isCharacterKey(c) ? b.keyCode : 0
	} else {
		c = b.keyCode || this.Pa;
		d = b.charCode || 0;
		if (igRF_.userAgent.MAC && d == igRF_.events.KeyCodes.QUESTION_MARK
				&& !c)
			c = igRF_.events.KeyCodes.SLASH
	}
	var e = c, f = b.keyIdentifier;
	if (c)
		if (c >= 63232 && c in igRF_.events.KeyHandler.sg)
			e = igRF_.events.KeyHandler.sg[c];
		else {
			if (c == 25 && a.shiftKey)
				e = 9
		}
	else if (f && f in igRF_.events.KeyHandler.Nf)
		e = igRF_.events.KeyHandler.Nf[f];
	var g = e == this.hb;
	this.hb = e;
	var h = new igRF_.events.KeyEvent(e, d, g, b);
	try {
		this.dispatchEvent(h)
	} finally {
		h.dispose()
	}
};
igRF_.events.KeyHandler.prototype.attach = function(a) {
	this.Eb && this.detach();
	this.d = a;
	this.Db = igRF_.events
			.listen(this.d, igRF_.events.EventType.KEYPRESS, this);
	this.xc = igRF_.events.listen(this.d, igRF_.events.EventType.KEYDOWN,
			this.wf, igRF_d, this);
	this.Eb = igRF_.events.listen(this.d, igRF_.events.EventType.KEYUP,
			this.yf, igRF_d, this)
};
igRF_.events.KeyHandler.prototype.detach = function() {
	if (this.Db) {
		igRF_.events.unlistenByKey(this.Db);
		igRF_.events.unlistenByKey(this.xc);
		igRF_.events.unlistenByKey(this.Eb);
		this.Eb = this.xc = this.Db = igRF_c
	}
	this.d = igRF_c;
	this.hb = -1
};
igRF_.events.KeyHandler.prototype.c = function() {
	igRF_.events.KeyHandler.Aa.c.call(this);
	this.detach()
};
igRF_.events.KeyEvent = function(a, b, c, d) {
	igRF_.events.BrowserEvent.call(this, d);
	this.type = igRF_.events.KeyHandler.EventType.KEY;
	this.keyCode = a;
	this.charCode = b;
	this.repeat = c
};
igRF_.inherits(igRF_.events.KeyEvent, igRF_.events.BrowserEvent);
igRF_.Timer = function(a, b) {
	igRF_.events.EventTarget.call(this);
	this.Cb = a || 1;
	this.Tb = b || igRF_.Timer.defaultTimerObject;
	this.Pc = igRF_.bind(this.Kg, this);
	this.Sd = igRF_.now()
};
igRF_.inherits(igRF_.Timer, igRF_.events.EventTarget);
igRF_.Timer.Zg = 2147483647;
igRF_.Timer.prototype.enabled = igRF_d;
igRF_.Timer.defaultTimerObject = igRF_.global.window;
igRF_.Timer.intervalScale = 0.8;
igRF_.Timer.prototype.k = igRF_c;
igRF_.Timer.prototype.setInterval = function(a) {
	this.Cb = a;
	if (this.k && this.enabled) {
		this.stop();
		this.start()
	} else
		this.k && this.stop()
};
igRF_.Timer.prototype.Kg = function() {
	if (this.enabled) {
		var a = igRF_.now() - this.Sd;
		if (a > 0 && a < this.Cb * igRF_.Timer.intervalScale)
			this.k = this.Tb.setTimeout(this.Pc, this.Cb - a);
		else {
			this.Ve();
			if (this.enabled) {
				this.k = this.Tb.setTimeout(this.Pc, this.Cb);
				this.Sd = igRF_.now()
			}
		}
	}
};
igRF_.Timer.prototype.Ve = function() {
	this.dispatchEvent(igRF_.Timer.TICK)
};
igRF_.Timer.prototype.start = function() {
	this.enabled = igRF_b;
	if (!this.k) {
		this.k = this.Tb.setTimeout(this.Pc, this.Cb);
		this.Sd = igRF_.now()
	}
};
igRF_.Timer.prototype.stop = function() {
	this.enabled = igRF_d;
	if (this.k) {
		this.Tb.clearTimeout(this.k);
		this.k = igRF_c
	}
};
igRF_.Timer.prototype.c = function() {
	igRF_.Timer.Aa.c.call(this);
	this.stop();
	delete this.Tb
};
igRF_.Timer.TICK = "tick";
igRF_.Timer.rb = function(a, b, c) {
	if (igRF_.isFunction(a)) {
		if (c)
			a = igRF_.bind(a, c)
	} else if (a && typeof a.handleEvent == "function")
		a = igRF_.bind(a.handleEvent, a);
	else
		igRF_a(Error("Invalid listener argument"));
	return b > igRF_.Timer.Zg ? -1 : igRF_.Timer.defaultTimerObject.setTimeout(
			a, b || 0)
};
igRF_.Timer.clear = function(a) {
	igRF_.Timer.defaultTimerObject.clearTimeout(a)
};
igRF_.ui.AutoComplete.InputHandler = function(a, b, c, d) {
	igRF_.Disposable.call(this);
	var e = d || 150;
	this.Cg(igRF_.isDefAndNotNull(a)
			? a
			: igRF_.ui.AutoComplete.InputHandler.STANDARD_LIST_SEPARATORS);
	this.Sf = b || "";
	this.Bh = this.ib = c != igRF_c ? c : igRF_b;
	this.k = e > 0 ? new igRF_.Timer(e) : igRF_c;
	this.q = new igRF_.events.EventHandler(this);
	this.Wb = new igRF_.events.EventHandler(this);
	this.yc = new igRF_.events.KeyHandler;
	this.Pf = -1
};
igRF_.inherits(igRF_.ui.AutoComplete.InputHandler, igRF_.Disposable);
igRF_.ui.AutoComplete.InputHandler.STANDARD_LIST_SEPARATORS = ",;";
igRF_.ui.AutoComplete.InputHandler.QUOTE_LITERALS = '"';
igRF_.ui.AutoComplete.InputHandler.prototype.Sg = igRF_b;
igRF_.ui.AutoComplete.InputHandler.prototype.Ye = igRF_b;
igRF_.ui.AutoComplete.InputHandler.prototype.Kc = igRF_d;
igRF_.ui.AutoComplete.InputHandler.prototype.vg = igRF_b;
igRF_.ui.AutoComplete.InputHandler.prototype.ug = igRF_b;
igRF_.ui.AutoComplete.InputHandler.prototype.g = igRF_c;
igRF_.ui.AutoComplete.InputHandler.prototype.zc = "";
igRF_.ui.AutoComplete.InputHandler.prototype.Ba = igRF_d;
igRF_.ui.AutoComplete.InputHandler.prototype.Fc = igRF_d;
igRF_.ui.AutoComplete.InputHandler.prototype.Rg = igRF_b;
igRF_.ui.AutoComplete.InputHandler.prototype.Mc = function(a) {
	this.j = a
};
igRF_.ui.AutoComplete.InputHandler.prototype.Fe = function(a) {
	igRF_.dom.a11y.setState(a, "haspopup", igRF_b);
	this.q.listen(a, igRF_.events.EventType.FOCUS, this.Xd);
	this.q.listen(a, igRF_.events.EventType.BLUR, this.fg);
	this.g || this.Wb.listen(a, igRF_.events.EventType.KEYDOWN, this.gg)
};
igRF_.ui.AutoComplete.InputHandler.prototype.Nc = function() {
	for (var a = 0; a < arguments.length; a++)
		this.Fe(arguments[a])
};
igRF_.ui.AutoComplete.InputHandler.prototype.tg = function(a, b) {
	var c = this.j.sf();
	if (igRF_.isDef(b) ? b : this.ib) {
		var d = igRF_.dom.selection.getStart(c), e = this.yd(c.value, d), f = this
				.Ic(c.value), g = a.toString();
		this.Ih.test(g) || (g = igRF_.string.trimRight(g) + this.fh);
		if (this.Sg) {
			if (e != 0 && !igRF_.string.l(f[e - 1]))
				g = " " + g;
			if (e < f.length && !igRF_.string.l(f[e + 1]))
				g = g + " "
		}
		if (g != f[e]) {
			f[e] = g;
			c.value = f.join("");
			for (var h = 0, i = 0; i <= e; i++)
				h += f[i].length;
			c.focus();
			igRF_.dom.selection.setStart(c, h);
			igRF_.dom.selection.setEnd(c, h)
		}
	} else
		c.value = a.toString();
	this.Fc = igRF_b;
	return igRF_d
};
igRF_.ui.AutoComplete.InputHandler.prototype.c = function() {
	igRF_.ui.AutoComplete.InputHandler.Aa.c.call(this);
	this.q.dispose();
	delete this.q;
	this.Wb.dispose();
	this.Wb = igRF_c
};
igRF_.ui.AutoComplete.InputHandler.prototype.Cg = function(a) {
	this.Mb = a;
	this.fh = this.Mb.substring(0, 1);
	var b = this.ib ? "[\\s" + this.Mb + "]+" : "[\\s]+";
	this.Pg = new RegExp("^" + b + "|" + b + "$", "g");
	this.Ih = new RegExp("\\s*[" + this.Mb + "]$")
};
igRF_.ui.AutoComplete.InputHandler.prototype.Hg = function(a) {
	this.Kc = a
};
igRF_.ui.AutoComplete.InputHandler.prototype.xf = function(a) {
	switch (a.keyCode) {
		case igRF_.events.KeyCodes.DOWN :
			if (this.j.isOpen()) {
				this.Zf();
				a.preventDefault();
				return igRF_b
			} else if (!this.ib) {
				this.update(igRF_b);
				a.preventDefault();
				return igRF_b
			}
			break;
		case igRF_.events.KeyCodes.UP :
			if (this.j.isOpen()) {
				this.$f();
				a.preventDefault();
				return igRF_b
			}
			break;
		case igRF_.events.KeyCodes.TAB :
			this.update();
			if (this.j.Lb() && this.Bh) {
				a.preventDefault();
				return igRF_b
			}
			break;
		case igRF_.events.KeyCodes.ENTER :
			this.update();
			if (this.j.Lb()) {
				a.preventDefault();
				return igRF_b
			}
			break;
		case igRF_.events.KeyCodes.ESC :
			if (this.j.isOpen()) {
				this.j.dismiss();
				return igRF_b
			}
			break;
		case igRF_.events.KeyCodes.WIN_IME :
			if (!this.Ba) {
				this.Jg();
				return igRF_b
			}
			break;
		default :
			if (this.k && !this.Rg) {
				this.k.stop();
				this.k.start()
			}
	}
	return this.Fd(a)
};
igRF_.ui.AutoComplete.InputHandler.prototype.Fd = function(a) {
	var b = this.ib && a.charCode
			&& this.Mb.indexOf(String.fromCharCode(a.charCode)) != -1;
	this.vg && b && this.update();
	if (this.ug && b)
		if (this.j.Lb()) {
			a.preventDefault();
			return igRF_b
		}
	return igRF_d
};
igRF_.ui.AutoComplete.InputHandler.prototype.bg = function() {
	return igRF_d
};
igRF_.ui.AutoComplete.InputHandler.prototype.Cd = function() {
	return igRF_d
};
igRF_.ui.AutoComplete.InputHandler.prototype.ze = function() {
	this.yc.attach(this.g);
	this.q.listen(this.yc, igRF_.events.KeyHandler.EventType.KEY, this.ae);
	this.bg() && this.q.listen(this.g, igRF_.events.EventType.KEYUP, this.Cd);
	igRF_.userAgent.IE
			&& this.q.listen(this.g, igRF_.events.EventType.KEYPRESS, this.Yd)
};
igRF_.ui.AutoComplete.InputHandler.prototype.ng = function() {
	this.q.unlisten(this.yc, igRF_.events.KeyHandler.EventType.KEY, this.ae);
	this.yc.detach();
	this.q.unlisten(this.g, igRF_.events.EventType.KEYUP, this.Cd);
	igRF_.userAgent.IE
			&& this.q
					.unlisten(this.g, igRF_.events.EventType.KEYPRESS, this.Yd);
	this.Ba && this.Jc()
};
igRF_.ui.AutoComplete.InputHandler.prototype.Xd = function(a) {
	this.Wb.jb();
	this.j && this.j.Zb();
	if (a.target != this.g) {
		this.g = a.target || igRF_c;
		if (this.k) {
			this.k.start();
			this.q.listen(this.k, igRF_.Timer.TICK, this.ce)
		}
		this.zc = this.g.value;
		this.ze()
	}
};
igRF_.ui.AutoComplete.InputHandler.prototype.fg = function() {
	if (this.g) {
		this.ng();
		this.g = igRF_c;
		if (this.k) {
			this.k.stop();
			this.q.unlisten(this.k, igRF_.Timer.TICK, this.ce)
		}
		this.j && this.j.Wc()
	}
};
igRF_.ui.AutoComplete.InputHandler.prototype.ce = function() {
	this.update()
};
igRF_.ui.AutoComplete.InputHandler.prototype.gg = function(a) {
	this.Xd(a)
};
igRF_.ui.AutoComplete.InputHandler.prototype.ae = function(a) {
	this.Pf = a.keyCode;
	this.j && this.xf(a)
};
igRF_.ui.AutoComplete.InputHandler.prototype.Zd = function() {
	this.Ba && this.Pf != igRF_.events.KeyCodes.WIN_IME && this.Jc()
};
igRF_.ui.AutoComplete.InputHandler.prototype.$d = function(a) {
	if (this.Ba
			&& (a.keyCode == igRF_.events.KeyCodes.ENTER || a.keyCode == igRF_.events.KeyCodes.M
					&& a.ctrlKey))
		this.Jc()
};
igRF_.ui.AutoComplete.InputHandler.prototype.Jg = function() {
	if (!this.Ba) {
		this.q.listen(this.g, igRF_.events.EventType.KEYUP, this.$d);
		this.q.listen(this.g, igRF_.events.EventType.KEYPRESS, this.Zd);
		this.Ba = igRF_b
	}
};
igRF_.ui.AutoComplete.InputHandler.prototype.Jc = function() {
	if (this.Ba) {
		this.Ba = igRF_d;
		this.q.unlisten(this.g, igRF_.events.EventType.KEYPRESS, this.Zd);
		this.q.unlisten(this.g, igRF_.events.EventType.KEYUP, this.$d)
	}
};
igRF_.ui.AutoComplete.InputHandler.prototype.Yd = function(a) {
	this.Fd(a)
};
igRF_.ui.AutoComplete.InputHandler.prototype.update = function(a) {
	if (a || this.g && this.g.value != this.zc) {
		if (a || !this.Fc) {
			var b = this.hg();
			if (this.j) {
				this.j.Eg(this.g);
				this.j.Fg(b, this.g.value)
			}
		}
		this.zc = this.g.value
	}
	this.Fc = igRF_d
};
igRF_.ui.AutoComplete.InputHandler.prototype.$f = function() {
	return this.Kc ? this.j.Jd() : this.j.Kd()
};
igRF_.ui.AutoComplete.InputHandler.prototype.Zf = function() {
	return this.Kc ? this.j.Kd() : this.j.Jd()
};
igRF_.ui.AutoComplete.InputHandler.prototype.hg = function() {
	var a = igRF_.dom.selection.getStart(this.g), b = this.g.value;
	return this.Og(this.Ic(b)[this.yd(b, a)])
};
igRF_.ui.AutoComplete.InputHandler.prototype.Og = function(a) {
	return this.Pg ? String(a).replace(this.Pg, "") : a
};
igRF_.ui.AutoComplete.InputHandler.prototype.yd = function(a, b) {
	var c = this.Ic(a);
	if (b == a.length)
		return c.length - 1;
	for (var d = 0, e = 0, f = 0; e < c.length && f < b; e++) {
		f += c[e].length;
		d = e
	}
	return d
};
igRF_.ui.AutoComplete.InputHandler.prototype.Ic = function(a) {
	if (!this.ib)
		return [a];
	for (var b = String(a).split(""), c = [], d = [], e = 0, f = igRF_d; e < b.length; e++)
		if (this.Sf && this.Sf.indexOf(b[e]) != -1) {
			if (this.Ye && !f) {
				c.push(d.join(""));
				d.length = 0
			}
			d.push(b[e]);
			f = !f
		} else if (!f && this.Mb.indexOf(b[e]) != -1) {
			d.push(b[e]);
			c.push(d.join(""));
			d.length = 0
		} else
			d.push(b[e]);
	c.push(d.join(""));
	return c
};
igRF_.math.Box = function(a, b, c, d) {
	this.top = a;
	this.right = b;
	this.bottom = c;
	this.left = d
};
igRF_.math.Box.boundingBox = function() {
	for (var a = new igRF_.math.Box(arguments[0].y, arguments[0].x,
			arguments[0].y, arguments[0].x), b = 1; b < arguments.length; b++) {
		var c = arguments[b];
		a.top = Math.min(a.top, c.y);
		a.right = Math.max(a.right, c.x);
		a.bottom = Math.max(a.bottom, c.y);
		a.left = Math.min(a.left, c.x)
	}
	return a
};
igRF_.math.Box.prototype.clone = function() {
	return new igRF_.math.Box(this.top, this.right, this.bottom, this.left)
};
if (igRF_.DEBUG)
	igRF_.math.Box.prototype.toString = function() {
		return "(" + this.top + "t, " + this.right + "r, " + this.bottom
				+ "b, " + this.left + "l)"
	};
igRF_.math.Box.prototype.contains = function(a) {
	return igRF_.math.Box.contains(this, a)
};
igRF_.math.Box.prototype.expand = function(a, b, c, d) {
	if (igRF_.isObject(a)) {
		this.top -= a.top;
		this.right += a.right;
		this.bottom += a.bottom;
		this.left -= a.left
	} else {
		this.top -= a;
		this.right += b;
		this.bottom += c;
		this.left -= d
	}
	return this
};
igRF_.math.Box.equals = function(a, b) {
	if (a == b)
		return igRF_b;
	if (!a || !b)
		return igRF_d;
	return a.top == b.top && a.right == b.right && a.bottom == b.bottom
			&& a.left == b.left
};
igRF_.math.Box.contains = function(a, b) {
	if (!a || !b)
		return igRF_d;
	if (b instanceof igRF_.math.Box)
		return b.left >= a.left && b.right <= a.right && b.top >= a.top
				&& b.bottom <= a.bottom;
	return b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom
};
igRF_.math.Box.distance = function(a, b) {
	if (b.x >= a.left && b.x <= a.right) {
		if (b.y >= a.top && b.y <= a.bottom)
			return 0;
		return b.y < a.top ? a.top - b.y : b.y - a.bottom
	}
	if (b.y >= a.top && b.y <= a.bottom)
		return b.x < a.left ? a.left - b.x : b.x - a.right;
	return igRF_.math.Coordinate.distance(b, new igRF_.math.Coordinate(
					b.x < a.left ? a.left : a.right, b.y < a.top
							? a.top
							: a.bottom))
};
igRF_.math.Rect = function(a, b, c, d) {
	this.left = a;
	this.top = b;
	this.width = c;
	this.height = d
};
igRF_.math.Rect.prototype.clone = function() {
	return new igRF_.math.Rect(this.left, this.top, this.width, this.height)
};
igRF_.math.Rect.createFromBox = function(a) {
	return new igRF_.math.Rect(a.left, a.top, a.right - a.left, a.bottom
					- a.top)
};
if (igRF_.DEBUG)
	igRF_.math.Rect.prototype.toString = function() {
		return "(" + this.left + ", " + this.top + " - " + this.width + "w x "
				+ this.height + "h)"
	};
igRF_.math.Rect.equals = function(a, b) {
	if (a == b)
		return igRF_b;
	if (!a || !b)
		return igRF_d;
	return a.left == b.left && a.width == b.width && a.top == b.top
			&& a.height == b.height
};
igRF_.math.Rect.prototype.intersection = function(a) {
	var b = Math.max(this.left, a.left), c = Math.min(this.left + this.width,
			a.left + a.width);
	if (b <= c) {
		var d = Math.max(this.top, a.top), e = Math.min(this.top + this.height,
				a.top + a.height);
		if (d <= e) {
			this.left = b;
			this.top = d;
			this.width = c - b;
			this.height = e - d;
			return igRF_b
		}
	}
	return igRF_d
};
igRF_.math.Rect.intersection = function(a, b) {
	var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left
					+ b.width);
	if (c <= d) {
		var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top
						+ b.height);
		if (e <= f)
			return new igRF_.math.Rect(c, e, d - c, f - e)
	}
	return igRF_c
};
igRF_.math.Rect.intersects = function(a, b) {
	var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left
					+ b.width);
	if (c <= d) {
		var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top
						+ b.height);
		if (e <= f)
			return igRF_b
	}
	return igRF_d
};
igRF_.math.Rect.prototype.intersects = function(a) {
	return igRF_.math.Rect.intersects(this, a)
};
igRF_.math.Rect.difference = function(a, b) {
	var c = igRF_.math.Rect.intersection(a, b);
	if (!c || !c.height || !c.width)
		return [a.clone()];
	var d = [], e = a.top, f = a.height, g = a.left + a.width, h = a.top
			+ a.height, i = b.left + b.width, j = b.top + b.height;
	if (b.top > a.top) {
		d.push(new igRF_.math.Rect(a.left, a.top, a.width, b.top - a.top));
		e = b.top;
		f -= b.top - a.top
	}
	if (j < h) {
		d.push(new igRF_.math.Rect(a.left, j, a.width, h - j));
		f = j - e
	}
	b.left > a.left
			&& d.push(new igRF_.math.Rect(a.left, e, b.left - a.left, f));
	i < g && d.push(new igRF_.math.Rect(i, e, g - i, f));
	return d
};
igRF_.math.Rect.prototype.difference = function(a) {
	return igRF_.math.Rect.difference(this, a)
};
igRF_.math.Rect.prototype.Qc = function(a) {
	var b = Math.max(this.left + this.width, a.left + a.width), c = Math.max(
			this.top + this.height, a.top + a.height);
	this.left = Math.min(this.left, a.left);
	this.top = Math.min(this.top, a.top);
	this.width = b - this.left;
	this.height = c - this.top
};
igRF_.math.Rect.Qc = function(a, b) {
	if (!a || !b)
		return igRF_c;
	var c = a.clone();
	c.Qc(b);
	return c
};
igRF_.math.Rect.prototype.contains = function(a) {
	return a instanceof igRF_.math.Rect ? this.left <= a.left
			&& this.left + this.width >= a.left + a.width && this.top <= a.top
			&& this.top + this.height >= a.top + a.height : a.x >= this.left
			&& a.x <= this.left + this.width && a.y >= this.top
			&& a.y <= this.top + this.height
};
igRF_.math.Rect.prototype.db = function() {
	return new igRF_.math.Size(this.width, this.height)
};
igRF_.userAgent.product = {};
igRF_.userAgent.product.ASSUME_FIREFOX = igRF_d;
igRF_.userAgent.product.ASSUME_CAMINO = igRF_d;
igRF_.userAgent.product.ASSUME_IPHONE = igRF_d;
igRF_.userAgent.product.ASSUME_ANDROID = igRF_d;
igRF_.userAgent.product.ASSUME_CHROME = igRF_d;
igRF_.userAgent.product.ASSUME_SAFARI = igRF_d;
igRF_.userAgent.product.Ga = igRF_.userAgent.ASSUME_IE
		|| igRF_.userAgent.ASSUME_OPERA
		|| igRF_.userAgent.product.ASSUME_FIREFOX
		|| igRF_.userAgent.product.ASSUME_CAMINO
		|| igRF_.userAgent.product.ASSUME_IPHONE
		|| igRF_.userAgent.product.ASSUME_ANDROID
		|| igRF_.userAgent.product.ASSUME_CHROME
		|| igRF_.userAgent.product.ASSUME_SAFARI;
igRF_.userAgent.product.Ab = function() {
	igRF_.userAgent.product.Qe = igRF_d;
	igRF_.userAgent.product.sb = igRF_d;
	igRF_.userAgent.product.Se = igRF_d;
	igRF_.userAgent.product.Oe = igRF_d;
	igRF_.userAgent.product.Pe = igRF_d;
	igRF_.userAgent.product.Ue = igRF_d;
	var a = igRF_.userAgent.getUserAgentString();
	if (a)
		if (a.indexOf("Firefox") != -1)
			igRF_.userAgent.product.Qe = igRF_b;
		else if (a.indexOf("Camino") != -1)
			igRF_.userAgent.product.sb = igRF_b;
		else if (a.indexOf("iPhone") != -1 || a.indexOf("iPod") != -1)
			igRF_.userAgent.product.Se = igRF_b;
		else if (a.indexOf("Android") != -1)
			igRF_.userAgent.product.Oe = igRF_b;
		else if (a.indexOf("Chrome") != -1)
			igRF_.userAgent.product.Pe = igRF_b;
		else if (a.indexOf("Safari") != -1)
			igRF_.userAgent.product.Ue = igRF_b
};
igRF_.userAgent.product.Ga || igRF_.userAgent.product.Ab();
igRF_.userAgent.product.OPERA = igRF_.userAgent.OPERA;
igRF_.userAgent.product.IE = igRF_.userAgent.IE;
igRF_.userAgent.product.FIREFOX = igRF_.userAgent.product.Ga
		? igRF_.userAgent.product.ASSUME_FIREFOX
		: igRF_.userAgent.product.Qe;
igRF_.userAgent.product.CAMINO = igRF_.userAgent.product.Ga
		? igRF_.userAgent.product.ASSUME_CAMINO
		: igRF_.userAgent.product.sb;
igRF_.userAgent.product.IPHONE = igRF_.userAgent.product.Ga
		? igRF_.userAgent.product.ASSUME_IPHONE
		: igRF_.userAgent.product.Se;
igRF_.userAgent.product.ANDROID = igRF_.userAgent.product.Ga
		? igRF_.userAgent.product.ASSUME_ANDROID
		: igRF_.userAgent.product.Oe;
igRF_.userAgent.product.CHROME = igRF_.userAgent.product.Ga
		? igRF_.userAgent.product.ASSUME_CHROME
		: igRF_.userAgent.product.Pe;
igRF_.userAgent.product.SAFARI = igRF_.userAgent.product.Ga
		? igRF_.userAgent.product.ASSUME_SAFARI
		: igRF_.userAgent.product.Ue;
igRF_.style = {};
igRF_.style.setStyle = function(a, b, c) {
	igRF_.isString(b) ? igRF_.style.Dg(a, c, b) : igRF_.object.forEach(b, igRF_
					.partial(igRF_.style.Dg, a))
};
igRF_.style.Dg = function(a, b, c) {
	a.style[igRF_.style.toCamelCase(c)] = b
};
igRF_.style.getStyle = function(a, b) {
	return a.style[igRF_.style.toCamelCase(b)]
};
igRF_.style.getComputedStyle = function(a, b) {
	var c = igRF_.dom.o(a);
	if (c.defaultView && c.defaultView.getComputedStyle) {
		var d = c.defaultView.getComputedStyle(a, "");
		if (d)
			return d[b]
	}
	return igRF_c
};
igRF_.style.getCascadedStyle = function(a, b) {
	return a.currentStyle ? a.currentStyle[b] : igRF_c
};
igRF_.style.r = function(a, b) {
	return igRF_.style.getComputedStyle(a, b)
			|| igRF_.style.getCascadedStyle(a, b) || a.style[b]
};
igRF_.style.getComputedPosition = function(a) {
	return igRF_.style.r(a, "position")
};
igRF_.style.getBackgroundColor = function(a) {
	return igRF_.style.r(a, "backgroundColor")
};
igRF_.style.getComputedOverflowX = function(a) {
	return igRF_.style.r(a, "overflowX")
};
igRF_.style.getComputedOverflowY = function(a) {
	return igRF_.style.r(a, "overflowY")
};
igRF_.style.getComputedZIndex = function(a) {
	return igRF_.style.r(a, "zIndex")
};
igRF_.style.getComputedTextAlign = function(a) {
	return igRF_.style.r(a, "textAlign")
};
igRF_.style.getComputedCursor = function(a) {
	return igRF_.style.r(a, "cursor")
};
igRF_.style.setPosition = function(a, b, c) {
	var d, e, f = igRF_.userAgent.GECKO
			&& (igRF_.userAgent.MAC || igRF_.userAgent.X11)
			&& igRF_.userAgent.isVersion("1.9");
	if (b instanceof igRF_.math.Coordinate) {
		d = b.x;
		e = b.y
	} else {
		d = b;
		e = c
	}
	a.style.left = typeof d == "number" ? (f ? Math.round(d) : d) + "px" : d;
	a.style.top = typeof e == "number" ? (f ? Math.round(e) : e) + "px" : e
};
igRF_.style.getPosition = function(a) {
	return new igRF_.math.Coordinate(a.offsetLeft, a.offsetTop)
};
igRF_.style.getClientViewportElement = function(a) {
	var b;
	b = a
			? a.nodeType == igRF_.dom.NodeType.DOCUMENT ? a : igRF_.dom.o(a)
			: igRF_.dom.oa();
	if (igRF_.userAgent.IE && !igRF_.dom.aa(b).va())
		return b.body;
	return b.documentElement
};
igRF_.style.Ze = function(a) {
	var b = a.getBoundingClientRect();
	if (igRF_.userAgent.IE) {
		var c = a.ownerDocument;
		b.left -= c.documentElement.clientLeft + c.body.clientLeft;
		b.top -= c.documentElement.clientTop + c.body.clientTop
	}
	return b
};
igRF_.style.getOffsetParent = function(a) {
	if (igRF_.userAgent.IE)
		return a.offsetParent;
	for (var b = igRF_.dom.o(a), c = igRF_.style.r(a, "position"), d = c == "fixed"
			|| c == "absolute", e = a.parentNode; e && e != b; e = e.parentNode) {
		c = igRF_.style.r(e, "position");
		d = d && c == "static" && e != b.documentElement && e != b.body;
		if (!d
				&& (e.scrollWidth > e.clientWidth
						|| e.scrollHeight > e.clientHeight || c == "fixed" || c == "absolute"))
			return e
	}
	return igRF_c
};
igRF_.style.getVisibleRectForElement = function(a) {
	for (var b = new igRF_.math.Box(0, Infinity, Infinity, 0), c = igRF_.dom
			.aa(a), d = c.fd(), e, f = a; f = igRF_.style.getOffsetParent(f);)
		if ((!igRF_.userAgent.IE || f.clientWidth != 0)
				&& (f.scrollWidth != f.clientWidth || f.scrollHeight != f.clientHeight)
				&& igRF_.style.r(f, "overflow") != "visible") {
			var g = igRF_.style.getPageOffset(f), h = igRF_.style
					.getClientLeftTop(f);
			g.x += h.x;
			g.y += h.y;
			b.top = Math.max(b.top, g.y);
			b.right = Math.min(b.right, g.x + f.clientWidth);
			b.bottom = Math.min(b.bottom, g.y + f.clientHeight);
			b.left = Math.max(b.left, g.x);
			e = e || f != d
		}
	var i = d.scrollLeft, j = d.scrollTop;
	if (igRF_.userAgent.WEBKIT) {
		b.left += i;
		b.top += j
	} else {
		b.left = Math.max(b.left, i);
		b.top = Math.max(b.top, j)
	}
	if (!e || igRF_.userAgent.WEBKIT) {
		b.right += i;
		b.bottom += j
	}
	var k = c.qc();
	b.right = Math.min(b.right, i + k.width);
	b.bottom = Math.min(b.bottom, j + k.height);
	return b.top >= 0 && b.left >= 0 && b.bottom > b.top && b.right > b.left
			? b
			: igRF_c
};
igRF_.style.scrollIntoContainerView = function(a, b, c) {
	var d = igRF_.style.getPageOffset(a), e = igRF_.style.getPageOffset(b), f = igRF_.style
			.getBorderBox(b), g = d.x - e.x - f.left, h = d.y - e.y - f.top, i = b.clientWidth
			- a.offsetWidth, j = b.clientHeight - a.offsetHeight;
	if (c) {
		b.scrollLeft += g - i / 2;
		b.scrollTop += h - j / 2
	} else {
		b.scrollLeft += Math.min(g, Math.max(g - i, 0));
		b.scrollTop += Math.min(h, Math.max(h - j, 0))
	}
};
igRF_.style.getClientLeftTop = function(a) {
	if (igRF_.userAgent.GECKO && !igRF_.userAgent.isVersion("1.9")) {
		var b = parseFloat(igRF_.style.getComputedStyle(a, "borderLeftWidth"));
		if (igRF_.style.isRightToLeft(a)) {
			var c = a.offsetWidth
					- a.clientWidth
					- b
					- parseFloat(igRF_.style.getComputedStyle(a,
							"borderRightWidth"));
			b += c
		}
		return new igRF_.math.Coordinate(b, parseFloat(igRF_.style
						.getComputedStyle(a, "borderTopWidth")))
	}
	return new igRF_.math.Coordinate(a.clientLeft, a.clientTop)
};
igRF_.style.getPageOffset = function(a) {
	var b, c = igRF_.dom.o(a), d = igRF_.style.r(a, "position"), e = igRF_.userAgent.GECKO
			&& c.getBoxObjectFor
			&& !a.getBoundingClientRect
			&& d == "absolute"
			&& (b = c.getBoxObjectFor(a)) && (b.screenX < 0 || b.screenY < 0), f = new igRF_.math.Coordinate(
			0, 0), g = igRF_.style.getClientViewportElement(c);
	if (a == g)
		return f;
	if (a.getBoundingClientRect) {
		b = igRF_.style.Ze(a);
		var h = igRF_.dom.aa(c).ab();
		f.x = b.left + h.x;
		f.y = b.top + h.y
	} else if (c.getBoxObjectFor && !e) {
		b = c.getBoxObjectFor(a);
		var i = c.getBoxObjectFor(g);
		f.x = b.screenX - i.screenX;
		f.y = b.screenY - i.screenY
	} else {
		var j = a;
		do {
			f.x += j.offsetLeft;
			f.y += j.offsetTop;
			if (j != a) {
				f.x += j.clientLeft || 0;
				f.y += j.clientTop || 0
			}
			if (igRF_.userAgent.WEBKIT
					&& igRF_.style.getComputedPosition(j) == "fixed") {
				f.x += c.body.scrollLeft;
				f.y += c.body.scrollTop;
				break
			}
			j = j.offsetParent
		} while (j && j != a);
		if (igRF_.userAgent.OPERA || igRF_.userAgent.WEBKIT && d == "absolute")
			f.y -= c.body.offsetTop;
		for (j = a; (j = igRF_.style.getOffsetParent(j)) && j != c.body
				&& j != g;) {
			f.x -= j.scrollLeft;
			if (!igRF_.userAgent.OPERA || j.tagName != "TR")
				f.y -= j.scrollTop
		}
	}
	return f
};
igRF_.style.getPageOffsetLeft = function(a) {
	return igRF_.style.getPageOffset(a).x
};
igRF_.style.getPageOffsetTop = function(a) {
	return igRF_.style.getPageOffset(a).y
};
igRF_.style.getFramedPageOffset = function(a, b) {
	var c = new igRF_.math.Coordinate(0, 0), d = igRF_.dom.eb(igRF_.dom.o(a)), e = a;
	do {
		var f = d == b ? igRF_.style.getPageOffset(e) : igRF_.style
				.getClientPosition(e);
		c.x += f.x;
		c.y += f.y
	} while (d && d != b && (e = d.frameElement) && (d = d.parent));
	return c
};
igRF_.style.translateRectForAnotherFrame = function(a, b, c) {
	if (b.oa() != c.oa()) {
		var d = b.oa().body, e = igRF_.style.getFramedPageOffset(d, c.eb());
		e = igRF_.math.Coordinate.difference(e, igRF_.style.getPageOffset(d));
		if (igRF_.userAgent.IE && !b.va())
			e = igRF_.math.Coordinate.difference(e, b.ab());
		a.left += e.x;
		a.top += e.y
	}
};
igRF_.style.getRelativePosition = function(a, b) {
	var c = igRF_.style.getClientPosition(a), d = igRF_.style
			.getClientPosition(b);
	return new igRF_.math.Coordinate(c.x - d.x, c.y - d.y)
};
igRF_.style.getClientPosition = function(a) {
	var b = new igRF_.math.Coordinate;
	if (a.nodeType == igRF_.dom.NodeType.ELEMENT)
		if (a.getBoundingClientRect) {
			var c = igRF_.style.Ze(a);
			b.x = c.left;
			b.y = c.top
		} else {
			var d = igRF_.dom.aa(a).ab(), e = igRF_.style.getPageOffset(a);
			b.x = e.x - d.x;
			b.y = e.y - d.y
		}
	else {
		b.x = a.clientX;
		b.y = a.clientY
	}
	return b
};
igRF_.style.setPageOffset = function(a, b, c) {
	var d = igRF_.style.getPageOffset(a);
	if (b instanceof igRF_.math.Coordinate) {
		c = b.y;
		b = b.x
	}
	var e = b - d.x, f = c - d.y;
	igRF_.style.setPosition(a, a.offsetLeft + e, a.offsetTop + f)
};
igRF_.style.setSize = function(a, b, c) {
	var d;
	if (b instanceof igRF_.math.Size) {
		d = b.height;
		b = b.width
	} else {
		if (c == undefined)
			igRF_a(Error("missing height argument"));
		d = c
	}
	a.style.width = typeof b == "number" ? Math.round(b) + "px" : b;
	a.style.height = typeof d == "number" ? Math.round(d) + "px" : d
};
igRF_.style.db = function(a) {
	var b = igRF_.userAgent.OPERA && !igRF_.userAgent.isVersion("10");
	if (igRF_.style.r(a, "display") != "none")
		return b ? new igRF_.math.Size(a.offsetWidth || a.clientWidth,
				a.offsetHeight || a.clientHeight) : new igRF_.math.Size(
				a.offsetWidth, a.offsetHeight);
	var c = a.style, d = c.display, e = c.visibility, f = c.position;
	c.visibility = "hidden";
	c.position = "absolute";
	c.display = "inline";
	var g, h;
	if (b) {
		g = a.offsetWidth || a.clientWidth;
		h = a.offsetHeight || a.clientHeight
	} else {
		g = a.offsetWidth;
		h = a.offsetHeight
	}
	c.display = d;
	c.position = f;
	c.visibility = e;
	return new igRF_.math.Size(g, h)
};
igRF_.style.getBounds = function(a) {
	var b = igRF_.style.getPageOffset(a), c = igRF_.style.db(a);
	return new igRF_.math.Rect(b.x, b.y, c.width, c.height)
};
igRF_.style.Lg = {};
igRF_.style.toCamelCase = function(a) {
	return igRF_.style.Lg[a]
			|| (igRF_.style.Lg[a] = String(a).replace(/\-([a-z])/g,
					function(b, c) {
						return c.toUpperCase()
					}))
};
igRF_.style.toSelectorCase = function(a) {
	return a.replace(/([A-Z])/g, "-$1").toLowerCase()
};
igRF_.style.getOpacity = function(a) {
	var b = a.style, c = "";
	if ("opacity" in b)
		c = b.opacity;
	else if ("MozOpacity" in b)
		c = b.MozOpacity;
	else if ("filter" in b) {
		var d = b.filter.match(/alpha\(opacity=([\d.]+)\)/);
		if (d)
			c = String(d[1] / 100)
	}
	return c == "" ? c : Number(c)
};
igRF_.style.setOpacity = function(a, b) {
	var c = a.style;
	if ("opacity" in c)
		c.opacity = b;
	else if ("MozOpacity" in c)
		c.MozOpacity = b;
	else if ("filter" in c)
		c.filter = b === "" ? "" : "alpha(opacity=" + b * 100 + ")"
};
igRF_.style.setTransparentBackgroundImage = function(a, b) {
	var c = a.style;
	if (igRF_.userAgent.IE && !igRF_.userAgent.isVersion("8"))
		c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'
				+ b + '", sizingMethod="crop")';
	else {
		c.backgroundImage = "url(" + b + ")";
		c.backgroundPosition = "top left";
		c.backgroundRepeat = "no-repeat"
	}
};
igRF_.style.clearTransparentBackgroundImage = function(a) {
	var b = a.style;
	if ("filter" in b)
		b.filter = "";
	else
		b.backgroundImage = "none"
};
igRF_.style.showElement = function(a, b) {
	a.style.display = b ? "" : "none"
};
igRF_.style.isElementShown = function(a) {
	return a.style.display != "none"
};
igRF_.style.installStyles = function(a, b) {
	var c = igRF_.dom.aa(b), d = igRF_c;
	if (igRF_.userAgent.IE) {
		d = c.oa().createStyleSheet();
		igRF_.style.setStyles(d, a)
	} else {
		var e = c.Na("head")[0];
		if (!e) {
			var f = c.Na("body")[0];
			e = c.ma("head");
			f.parentNode.insertBefore(e, f)
		}
		d = c.ma("style");
		igRF_.style.setStyles(d, a);
		c.appendChild(e, d)
	}
	return d
};
igRF_.style.uninstallStyles = function(a) {
	var b = a.ownerNode || a.owningElement || a;
	igRF_.dom.removeNode(b)
};
igRF_.style.setStyles = function(a, b) {
	if (igRF_.userAgent.IE)
		a.cssText = b;
	else {
		var c = igRF_.userAgent.WEBKIT ? "innerText" : "innerHTML";
		a[c] = b
	}
};
igRF_.style.setPreWrap = function(a) {
	var b = a.style;
	if (igRF_.userAgent.IE && !igRF_.userAgent.isVersion("8")) {
		b.whiteSpace = "pre";
		b.wordWrap = "break-word"
	} else
		b.whiteSpace = igRF_.userAgent.GECKO
				? "-moz-pre-wrap"
				: igRF_.userAgent.OPERA ? "-o-pre-wrap" : "pre-wrap"
};
igRF_.style.setInlineBlock = function(a) {
	var b = a.style;
	b.position = "relative";
	if (igRF_.userAgent.IE && !igRF_.userAgent.isVersion("8")) {
		b.zoom = "1";
		b.display = "inline"
	} else
		b.display = igRF_.userAgent.GECKO ? igRF_.userAgent.isVersion("1.9a")
				? "inline-block"
				: "-moz-inline-box" : "inline-block"
};
igRF_.style.isRightToLeft = function(a) {
	return "rtl" == igRF_.style.r(a, "direction")
};
igRF_.style.me = igRF_.userAgent.GECKO
		? "MozUserSelect"
		: igRF_.userAgent.WEBKIT ? "WebkitUserSelect" : igRF_c;
igRF_.style.isUnselectable = function(a) {
	if (igRF_.style.me)
		return a.style[igRF_.style.me].toLowerCase() == "none";
	else if (igRF_.userAgent.IE || igRF_.userAgent.OPERA)
		return a.getAttribute("unselectable") == "on";
	return igRF_d
};
igRF_.style.setUnselectable = function(a, b, c) {
	var d = !c ? a.getElementsByTagName("*") : igRF_c, e = igRF_.style.me;
	if (e) {
		var f = b ? "none" : "";
		a.style[e] = f;
		if (d)
			for (var g = 0, h; h = d[g]; g++)
				h.style[e] = f
	} else if (igRF_.userAgent.IE || igRF_.userAgent.OPERA) {
		f = b ? "on" : "";
		a.setAttribute("unselectable", f);
		if (d)
			for (g = 0; h = d[g]; g++)
				h.setAttribute("unselectable", f)
	}
};
igRF_.style.getBorderBoxSize = function(a) {
	return new igRF_.math.Size(a.offsetWidth, a.offsetHeight)
};
igRF_.style.setBorderBoxSize = function(a, b) {
	var c = igRF_.dom.o(a), d = igRF_.dom.aa(c).va();
	if (igRF_.userAgent.IE && (!d || !igRF_.userAgent.isVersion("8"))) {
		var e = a.style;
		if (d) {
			var f = igRF_.style.getPaddingBox(a), g = igRF_.style
					.getBorderBox(a);
			e.pixelWidth = b.width - g.left - f.left - f.right - g.right;
			e.pixelHeight = b.height - g.top - f.top - f.bottom - g.bottom
		} else {
			e.pixelWidth = b.width;
			e.pixelHeight = b.height
		}
	} else
		igRF_.style.xg(a, b, "border-box")
};
igRF_.style.getContentBoxSize = function(a) {
	var b = igRF_.dom.o(a), c = igRF_.userAgent.IE && a.currentStyle;
	if (c && igRF_.dom.aa(b).va() && c.width != "auto" && c.height != "auto"
			&& !c.boxSizing) {
		var d = igRF_.style.bb(a, c.width, "width", "pixelWidth"), e = igRF_.style
				.bb(a, c.height, "height", "pixelHeight");
		return new igRF_.math.Size(d, e)
	} else {
		var f = igRF_.style.getBorderBoxSize(a), g = igRF_.style
				.getPaddingBox(a), h = igRF_.style.getBorderBox(a);
		return new igRF_.math.Size(f.width - h.left - g.left - g.right
						- h.right, f.height - h.top - g.top - g.bottom
						- h.bottom)
	}
};
igRF_.style.setContentBoxSize = function(a, b) {
	var c = igRF_.dom.o(a), d = igRF_.dom.aa(c).va();
	if (igRF_.userAgent.IE && (!d || !igRF_.userAgent.isVersion("8"))) {
		var e = a.style;
		if (d) {
			e.pixelWidth = b.width;
			e.pixelHeight = b.height
		} else {
			var f = igRF_.style.getPaddingBox(a), g = igRF_.style
					.getBorderBox(a);
			e.pixelWidth = b.width + g.left + f.left + f.right + g.right;
			e.pixelHeight = b.height + g.top + f.top + f.bottom + g.bottom
		}
	} else
		igRF_.style.xg(a, b, "content-box")
};
igRF_.style.xg = function(a, b, c) {
	var d = a.style;
	if (igRF_.userAgent.GECKO)
		d.MozBoxSizing = c;
	else if (igRF_.userAgent.WEBKIT)
		d.WebkitBoxSizing = c;
	else if (igRF_.userAgent.OPERA && !igRF_.userAgent.isVersion("9.50"))
		c ? d.setProperty("box-sizing", c) : d.removeProperty("box-sizing");
	else
		d.boxSizing = c;
	d.width = b.width + "px";
	d.height = b.height + "px"
};
igRF_.style.bb = function(a, b, c, d) {
	if (/^\d+px?$/.test(b))
		return parseInt(b, 10);
	else {
		var e = a.style[c], f = a.runtimeStyle[c];
		a.runtimeStyle[c] = a.currentStyle[c];
		a.style[c] = b;
		var g = a.style[d];
		a.style[c] = e;
		a.runtimeStyle[c] = f;
		return g
	}
};
igRF_.style.kc = function(a, b) {
	return igRF_.style.bb(a, igRF_.style.getCascadedStyle(a, b), "left",
			"pixelLeft")
};
igRF_.style.$e = function(a, b) {
	if (igRF_.userAgent.IE) {
		var c = igRF_.style.kc(a, b + "Left"), d = igRF_.style.kc(a, b
						+ "Right"), e = igRF_.style.kc(a, b + "Top"), f = igRF_.style
				.kc(a, b + "Bottom");
		return new igRF_.math.Box(e, d, f, c)
	} else {
		c = igRF_.style.getComputedStyle(a, b + "Left");
		d = igRF_.style.getComputedStyle(a, b + "Right");
		e = igRF_.style.getComputedStyle(a, b + "Top");
		f = igRF_.style.getComputedStyle(a, b + "Bottom");
		return new igRF_.math.Box(parseFloat(e), parseFloat(d), parseFloat(f),
				parseFloat(c))
	}
};
igRF_.style.getPaddingBox = function(a) {
	return igRF_.style.$e(a, "padding")
};
igRF_.style.getMarginBox = function(a) {
	return igRF_.style.$e(a, "margin")
};
igRF_.style.Hf = {
	thin : 2,
	medium : 4,
	thick : 6
};
igRF_.style.jc = function(a, b) {
	if (igRF_.style.getCascadedStyle(a, b + "Style") == "none")
		return 0;
	var c = igRF_.style.getCascadedStyle(a, b + "Width");
	if (c in igRF_.style.Hf)
		return igRF_.style.Hf[c];
	return igRF_.style.bb(a, c, "left", "pixelLeft")
};
igRF_.style.getBorderBox = function(a) {
	if (igRF_.userAgent.IE) {
		var b = igRF_.style.jc(a, "borderLeft"), c = igRF_.style.jc(a,
				"borderRight"), d = igRF_.style.jc(a, "borderTop"), e = igRF_.style
				.jc(a, "borderBottom");
		return new igRF_.math.Box(d, c, e, b)
	} else {
		b = igRF_.style.getComputedStyle(a, "borderLeftWidth");
		c = igRF_.style.getComputedStyle(a, "borderRightWidth");
		d = igRF_.style.getComputedStyle(a, "borderTopWidth");
		e = igRF_.style.getComputedStyle(a, "borderBottomWidth");
		return new igRF_.math.Box(parseFloat(d), parseFloat(c), parseFloat(e),
				parseFloat(b))
	}
};
igRF_.style.getFontFamily = function(a) {
	var b = igRF_.dom.o(a), c = "";
	if (b.createTextRange) {
		var d = b.body.createTextRange();
		d.moveToElementText(a);
		c = d.queryCommandValue("FontName")
	}
	if (!c) {
		c = igRF_.style.r(a, "fontFamily");
		if (igRF_.userAgent.OPERA && igRF_.userAgent.LINUX)
			c = c.replace(/ \[[^\]]*\]/, "")
	}
	var e = c.split(",");
	if (e.length > 1)
		c = e[0];
	return igRF_.string.stripQuotes(c, "\"'")
};
igRF_.style.xh = /[^\d]+$/;
igRF_.style.getLengthUnits = function(a) {
	var b = a.match(igRF_.style.xh);
	return b && b[0] || igRF_c
};
igRF_.style.Tg = {
	cm : 1,
	"in" : 1,
	mm : 1,
	pc : 1,
	pt : 1
};
igRF_.style.Wg = {
	em : 1,
	ex : 1
};
igRF_.style.getFontSize = function(a) {
	var b = igRF_.style.r(a, "fontSize"), c = igRF_.style.getLengthUnits(b);
	if (b && "px" == c)
		return parseInt(b, 10);
	if (igRF_.userAgent.IE)
		if (c in igRF_.style.Tg)
			return igRF_.style.bb(a, b, "left", "pixelLeft");
		else if (a.parentNode
				&& a.parentNode.nodeType == igRF_.dom.NodeType.ELEMENT
				&& c in igRF_.style.Wg) {
			var d = a.parentNode, e = igRF_.style.r(d, "fontSize");
			return igRF_.style.bb(d, b == e ? "1em" : b, "left", "pixelLeft")
		}
	var f = igRF_.dom.ma("span", {
		style : "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
	});
	igRF_.dom.appendChild(a, f);
	b = f.offsetHeight;
	igRF_.dom.removeNode(f);
	return b
};
igRF_.style.parseStyleAttribute = function(a) {
	var b = {};
	igRF_.array.forEach(a.split(/\s*;\s*/), function(c) {
				var d = c.split(/\s*:\s*/);
				if (d.length == 2)
					b[igRF_.style.toCamelCase(d[0].toLowerCase())] = d[1]
			});
	return b
};
igRF_.style.toStyleAttribute = function(a) {
	var b = [];
	igRF_.object.forEach(a, function(c, d) {
				b.push(igRF_.style.toSelectorCase(d), ":", c, ";")
			});
	return b.join("")
};
igRF_.style.setFloat = function(a, b) {
	a.style[igRF_.userAgent.IE ? "styleFloat" : "cssFloat"] = b
};
igRF_.style.getFloat = function(a) {
	return a.style[igRF_.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
igRF_.ui.AutoComplete.Renderer = function(a, b, c, d) {
	this.ee = a || igRF_.dom.oa().body;
	this.ba = igRF_.dom.aa(this.ee);
	this.Gh = !a;
	this.d = igRF_c;
	this.sa = "";
	this.m = [];
	this.Ig = this.uc = -1;
	this.nb = igRF_d;
	this.className = "ac-renderer";
	this.rowClassName = "ac-row";
	this.Qf = "active";
	this.activeClassName = "ac-active";
	this.highlightedClassName = "ac-highlighted";
	this.Xa = b || igRF_c;
	this.Qh = d != igRF_c ? d : igRF_b;
	this.Hh = c != igRF_c ? c : igRF_d;
	this.Rd = igRF_c;
	this.Ub = igRF_d
};
igRF_.inherits(igRF_.ui.AutoComplete.Renderer, igRF_.events.EventTarget);
igRF_.ui.AutoComplete.Renderer.dg = 0;
igRF_.ui.AutoComplete.Renderer.DELAY_BEFORE_MOUSEOVER = 300;
igRF_.ui.AutoComplete.Renderer.prototype.Gg = function(a) {
	this.Ub = a
};
igRF_.ui.AutoComplete.Renderer.prototype.rg = function(a, b, c) {
	this.sa = b;
	this.m = a;
	this.uc = 0;
	this.Ig = igRF_.now();
	this.u = c;
	this.Kb = [];
	this.redraw()
};
igRF_.ui.AutoComplete.Renderer.prototype.dismiss = function() {
	this.u && igRF_.dom.a11y.setActiveDescendant(this.u, igRF_c);
	if (this.nb) {
		this.nb = igRF_d;
		igRF_.style.showElement(this.d, igRF_d)
	}
};
igRF_.ui.AutoComplete.Renderer.prototype.show = function() {
	if (!this.nb) {
		this.nb = igRF_b;
		igRF_.style.showElement(this.d, igRF_b)
	}
};
igRF_.ui.AutoComplete.Renderer.prototype.Mf = function() {
	return this.nb
};
igRF_.ui.AutoComplete.Renderer.prototype.Ld = function(a) {
	this.Ef();
	this.uc = a;
	if (a >= 0 && a < this.d.childNodes.length) {
		var b = this.Kb[a];
		igRF_.dom.classes.add(b, this.activeClassName, this.Qf);
		this.u && igRF_.dom.a11y.setActiveDescendant(this.u, b);
		igRF_.style.scrollIntoContainerView(b, this.d)
	}
};
igRF_.ui.AutoComplete.Renderer.prototype.Ef = function() {
	this.uc >= 0
			&& igRF_.dom.classes.remove(this.Kb[this.uc], this.activeClassName,
					this.Qf)
};
igRF_.ui.AutoComplete.Renderer.prototype.pa = function(a) {
	if (a == -1)
		this.Ld(-1);
	else
		for (var b = 0; b < this.m.length; b++)
			if (this.m[b].id == a) {
				this.Ld(b);
				return
			}
};
igRF_.ui.AutoComplete.Renderer.prototype.Ag = function(a) {
	igRF_.dom.classes.add(a, this.className)
};
igRF_.ui.AutoComplete.Renderer.prototype.Yf = function() {
	if (!this.d) {
		var a = this.ba.ma("div", {
					style : "display:none"
				});
		this.d = a;
		this.Ag(a);
		igRF_.dom.a11y.setRole(a, igRF_.dom.a11y.Role.LISTBOX);
		a.id = "goog-acr-" + igRF_.ui.AutoComplete.Renderer.dg++;
		if (this.u) {
			igRF_.dom.a11y.setRole(this.u, igRF_.dom.a11y.Role.COMBOBOX);
			igRF_.dom.a11y.setState(this.u, igRF_.dom.a11y.State.AUTOCOMPLETE,
					"list");
			igRF_.dom.a11y.setState(this.u, igRF_.dom.a11y.State.HASPOPUP,
					igRF_b)
		}
		this.ba.appendChild(this.ee, a);
		igRF_.events.listen(a, igRF_.events.EventType.CLICK, this.Ad, igRF_d,
				this);
		igRF_.events.listen(a, igRF_.events.EventType.MOUSEDOWN, this.Dd,
				igRF_d, this);
		igRF_.events.listen(this.ba.oa(), igRF_.events.EventType.CLICK,
				this.Bd, igRF_d, this);
		igRF_.events.listen(a, igRF_.events.EventType.MOUSEOVER, this.Ed,
				igRF_d, this)
	}
};
igRF_.ui.AutoComplete.Renderer.prototype.redraw = function() {
	this.Yf();
	if (this.Ub)
		this.d.style.visibility = "hidden";
	this.Kb.length = 0;
	this.ba.Ib(this.d);
	if (this.Xa && this.Xa.render)
		this.Xa.render(this, this.d, this.m, this.sa);
	else {
		var a = igRF_c;
		igRF_.iter.forEach(this.m, function(b) {
					b = this.qg(b, this.sa);
					this.Ub ? this.d.insertBefore(b, a) : this.ba.appendChild(
							this.d, b);
					a = b
				}, this)
	}
	if (this.m.length == 0)
		this.dismiss();
	else {
		this.show();
		this.jg(this.d);
		this.reposition();
		igRF_.style.setUnselectable(this.d, igRF_b)
	}
};
igRF_.ui.AutoComplete.Renderer.prototype.reposition = function() {
	if (this.u && this.Gh) {
		var a = igRF_.style.getPageOffset(this.u), b = igRF_.style.db(this.u), c = igRF_.style
				.db(igRF_.style.getClientViewportElement(this.u)), d = igRF_.style
				.db(this.d);
		a.y = this.Ub ? a.y - d.height : a.y + b.height;
		if ((this.Hh || a.x + d.width > c.width) && this.Rd != "LEFT") {
			a.x = a.x + b.width - d.width;
			this.Rd = "RIGHT"
		} else
			this.Rd = "LEFT";
		igRF_.style.setPageOffset(this.d, a);
		if (this.Ub)
			this.d.style.visibility = "visible"
	}
};
igRF_.ui.AutoComplete.Renderer.prototype.c = function() {
	igRF_.ui.AutoComplete.Renderer.Aa.c.call(this);
	if (this.d) {
		igRF_.events.unlisten(this.d, igRF_.events.EventType.CLICK, this.Ad,
				igRF_d, this);
		igRF_.events.unlisten(this.d, igRF_.events.EventType.MOUSEDOWN,
				this.Dd, igRF_d, this);
		igRF_.events.unlisten(this.ba.oa(), igRF_.events.EventType.CLICK,
				this.Bd, igRF_d, this);
		igRF_.events.unlisten(this.d, igRF_.events.EventType.MOUSEOVER,
				this.Ed, igRF_d, this);
		this.ba.removeNode(this.d);
		this.d = igRF_c;
		this.nb = igRF_d
	}
	delete this.ee
};
igRF_.ui.AutoComplete.Renderer.prototype.jg = function(a) {
	if (igRF_.userAgent.GECKO && igRF_.userAgent.MAC) {
		a.style.width = "";
		a.style.overflow = "visible";
		a.style.width = a.offsetWidth;
		a.style.overflow = "auto"
	}
};
igRF_.ui.AutoComplete.Renderer.prototype.pg = function(a, b, c) {
	c.innerHTML = igRF_.string.htmlEscape(a.data.toString())
};
igRF_.ui.AutoComplete.Renderer.prototype.tc = function(a, b) {
	if (a.nodeType == igRF_.dom.NodeType.TEXT) {
		var c, d = igRF_c;
		if (igRF_.isArray(b)) {
			c = b.length > 0 ? b[0] : "";
			if (b.length > 1)
				d = igRF_.array.slice(b, 1)
		} else
			c = b;
		if (!(c.length == 0)) {
			var e = a.nodeValue;
			c = igRF_.string.regExpEscape(c);
			for (var f = new RegExp("(.*?)(^|\\W+)(" + c + ")", "gi"), g = [], h = 0, i = f
					.exec(e); i;) {
				g.push(i[1]);
				g.push(i[2]);
				g.push(i[3]);
				h = f.lastIndex;
				i = f.exec(e)
			}
			g.push(e.substring(h));
			if (g.length > 1) {
				a.nodeValue = g[0] + g[1];
				var j = this.ba.createElement("b");
				j.className = this.highlightedClassName;
				this.ba.appendChild(j, this.ba.createTextNode(g[2]));
				j = a.parentNode.insertBefore(j, a.nextSibling);
				for (var k = g.length - 1; k >= 3; k--)
					a.parentNode.insertBefore(this.ba.createTextNode(g[k]),
							j.nextSibling)
			} else
				d && this.tc(a, d)
		}
	} else
		for (var l = a.firstChild; l;) {
			var m = l.nextSibling;
			this.tc(l, b);
			l = m
		}
};
igRF_.ui.AutoComplete.Renderer.prototype.qg = function(a, b) {
	var c = this.ba.ma("div", {
				className : this.rowClassName,
				id : "goog-acri-" + igRF_.ui.AutoComplete.Renderer.dg++
			});
	igRF_.dom.a11y.setRole(c, igRF_.dom.a11y.Role.OPTION);
	this.Xa && this.Xa.Jb ? this.Xa.Jb(a, b, c) : this.pg(a, b, c);
	b && this.Qh && this.tc(c, b);
	igRF_.dom.classes.add(c, this.rowClassName);
	this.Kb.push(c);
	return c
};
igRF_.ui.AutoComplete.Renderer.prototype.wd = function(a) {
	for (; a && a != this.d && !igRF_.dom.classes.has(a, this.rowClassName);)
		a = a.parentNode;
	return a ? igRF_.array.indexOf(this.Kb, a) : -1
};
igRF_.ui.AutoComplete.Renderer.prototype.Ad = function(a) {
	var b = this.wd(a.target);
	b >= 0 && this.dispatchEvent({
				type : igRF_.ui.AutoComplete.EventType.SELECT,
				row : this.m[b].id
			});
	a.stopPropagation()
};
igRF_.ui.AutoComplete.Renderer.prototype.Dd = function(a) {
	this.dispatchEvent(igRF_.ui.AutoComplete.EventType.CANCEL_DISMISS);
	a.stopPropagation();
	a.preventDefault()
};
igRF_.ui.AutoComplete.Renderer.prototype.Bd = function() {
	this.dispatchEvent(igRF_.ui.AutoComplete.EventType.DISMISS)
};
igRF_.ui.AutoComplete.Renderer.prototype.Ed = function(a) {
	var b = this.wd(a.target);
	if (b >= 0)
		igRF_.now() - this.Ig < igRF_.ui.AutoComplete.Renderer.DELAY_BEFORE_MOUSEOVER
				|| this.dispatchEvent({
							type : igRF_.ui.AutoComplete.EventType.HILITE,
							row : this.m[b].id
						})
};
igRF_.ui.AutoComplete.Renderer.CustomRenderer = function() {
};
igRF_.ui.AutoComplete.Renderer.CustomRenderer.prototype.render = function() {
};
igRF_.ui.AutoComplete.Renderer.CustomRenderer.prototype.Jb = function() {
};
igRF_.ui.AutoComplete.Basic = function(a, b, c, d) {
	var e = new igRF_.ui.AutoComplete.ArrayMatcher(a, !d), f = new igRF_.ui.AutoComplete.Renderer, g = new igRF_.ui.AutoComplete.InputHandler(
			igRF_c, igRF_c, !!c);
	igRF_.ui.AutoComplete.call(this, e, f, g);
	g.Mc(this);
	g.Nc(b)
};
igRF_.inherits(igRF_.ui.AutoComplete.Basic, igRF_.ui.AutoComplete);
igRF_.structs.$ = function(a) {
	if (typeof a.$ == "function")
		return a.$();
	if (igRF_.isArrayLike(a) || igRF_.isString(a))
		return a.length;
	return igRF_.object.$(a)
};
igRF_.structs.i = function(a) {
	if (typeof a.i == "function")
		return a.i();
	if (igRF_.isString(a))
		return a.split("");
	if (igRF_.isArrayLike(a)) {
		for (var b = [], c = a.length, d = 0; d < c; d++)
			b.push(a[d]);
		return b
	}
	return igRF_.object.i(a)
};
igRF_.structs.h = function(a) {
	if (typeof a.h == "function")
		return a.h();
	if (typeof a.i == "function")
		return undefined;
	if (igRF_.isArrayLike(a) || igRF_.isString(a)) {
		for (var b = [], c = a.length, d = 0; d < c; d++)
			b.push(d);
		return b
	}
	return igRF_.object.h(a)
};
igRF_.structs.contains = function(a, b) {
	if (typeof a.contains == "function")
		return a.contains(b);
	if (typeof a.ta == "function")
		return a.ta(b);
	if (igRF_.isArrayLike(a) || igRF_.isString(a))
		return igRF_.array.contains(a, b);
	return igRF_.object.ta(a, b)
};
igRF_.structs.l = function(a) {
	if (typeof a.l == "function")
		return a.l();
	if (igRF_.isArrayLike(a) || igRF_.isString(a))
		return igRF_.array.l(a);
	return igRF_.object.l(a)
};
igRF_.structs.clear = function(a) {
	if (typeof a.clear == "function")
		a.clear();
	else
		igRF_.isArrayLike(a) ? igRF_.array.clear(a) : igRF_.object.clear(a)
};
igRF_.structs.forEach = function(a, b, c) {
	if (typeof a.forEach == "function")
		a.forEach(b, c);
	else if (igRF_.isArrayLike(a) || igRF_.isString(a))
		igRF_.array.forEach(a, b, c);
	else
		for (var d = igRF_.structs.h(a), e = igRF_.structs.i(a), f = e.length, g = 0; g < f; g++)
			b.call(c, e[g], d && d[g], a)
};
igRF_.structs.filter = function(a, b, c) {
	if (typeof a.filter == "function")
		return a.filter(b, c);
	if (igRF_.isArrayLike(a) || igRF_.isString(a))
		return igRF_.array.filter(a, b, c);
	var d, e = igRF_.structs.h(a), f = igRF_.structs.i(a), g = f.length;
	if (e) {
		d = {};
		for (var h = 0; h < g; h++)
			if (b.call(c, f[h], e[h], a))
				d[e[h]] = f[h]
	} else {
		d = [];
		for (h = 0; h < g; h++)
			b.call(c, f[h], undefined, a) && d.push(f[h])
	}
	return d
};
igRF_.structs.map = function(a, b, c) {
	if (typeof a.map == "function")
		return a.map(b, c);
	if (igRF_.isArrayLike(a) || igRF_.isString(a))
		return igRF_.array.map(a, b, c);
	var d, e = igRF_.structs.h(a), f = igRF_.structs.i(a), g = f.length;
	if (e) {
		d = {};
		for (var h = 0; h < g; h++)
			d[e[h]] = b.call(c, f[h], e[h], a)
	} else {
		d = [];
		for (h = 0; h < g; h++)
			d[h] = b.call(c, f[h], undefined, a)
	}
	return d
};
igRF_.structs.some = function(a, b, c) {
	if (typeof a.some == "function")
		return a.some(b, c);
	if (igRF_.isArrayLike(a) || igRF_.isString(a))
		return igRF_.array.some(a, b, c);
	for (var d = igRF_.structs.h(a), e = igRF_.structs.i(a), f = e.length, g = 0; g < f; g++)
		if (b.call(c, e[g], d && d[g], a))
			return igRF_b;
	return igRF_d
};
igRF_.structs.every = function(a, b, c) {
	if (typeof a.every == "function")
		return a.every(b, c);
	if (igRF_.isArrayLike(a) || igRF_.isString(a))
		return igRF_.array.every(a, b, c);
	for (var d = igRF_.structs.h(a), e = igRF_.structs.i(a), f = e.length, g = 0; g < f; g++)
		if (!b.call(c, e[g], d && d[g], a))
			return igRF_d;
	return igRF_b
};
igRF_.structs.Map = function(a) {
	this.w = {};
	this.a = [];
	var b = arguments.length;
	if (b > 1) {
		if (b % 2)
			igRF_a(Error("Uneven number of arguments"));
		for (var c = 0; c < b; c += 2)
			this.set(arguments[c], arguments[c + 1])
	} else
		a && this.ye(a)
};
igRF_.structs.Map.prototype.b = 0;
igRF_.structs.Map.prototype.mb = 0;
igRF_.structs.Map.prototype.$ = function() {
	return this.b
};
igRF_.structs.Map.prototype.i = function() {
	this.Wa();
	for (var a = [], b = 0; b < this.a.length; b++) {
		var c = this.a[b];
		a.push(this.w[c])
	}
	return a
};
igRF_.structs.Map.prototype.h = function() {
	this.Wa();
	return this.a.concat()
};
igRF_.structs.Map.prototype.p = function(a) {
	return igRF_.structs.Map.Oa(this.w, a)
};
igRF_.structs.Map.prototype.ta = function(a) {
	for (var b = 0; b < this.a.length; b++) {
		var c = this.a[b];
		if (igRF_.structs.Map.Oa(this.w, c) && this.w[c] == a)
			return igRF_b
	}
	return igRF_d
};
igRF_.structs.Map.prototype.equals = function(a, b) {
	if (this === a)
		return igRF_b;
	if (this.b != a.$())
		return igRF_d;
	var c = b || igRF_.structs.Map.defaultEquals;
	this.Wa();
	for (var d, e = 0; d = this.a[e]; e++)
		if (!c(this.get(d), a.get(d)))
			return igRF_d;
	return igRF_b
};
igRF_.structs.Map.defaultEquals = function(a, b) {
	return a === b
};
igRF_.structs.Map.prototype.l = function() {
	return this.b == 0
};
igRF_.structs.Map.prototype.clear = function() {
	this.w = {};
	this.mb = this.b = this.a.length = 0
};
igRF_.structs.Map.prototype.remove = function(a) {
	if (igRF_.structs.Map.Oa(this.w, a)) {
		delete this.w[a];
		this.b--;
		this.mb++;
		this.a.length > 2 * this.b && this.Wa();
		return igRF_b
	}
	return igRF_d
};
igRF_.structs.Map.prototype.Wa = function() {
	if (this.b != this.a.length) {
		for (var a = 0, b = 0; a < this.a.length;) {
			var c = this.a[a];
			if (igRF_.structs.Map.Oa(this.w, c))
				this.a[b++] = c;
			a++
		}
		this.a.length = b
	}
	if (this.b != this.a.length) {
		var d = {};
		for (b = a = 0; a < this.a.length;) {
			c = this.a[a];
			if (!igRF_.structs.Map.Oa(d, c)) {
				this.a[b++] = c;
				d[c] = 1
			}
			a++
		}
		this.a.length = b
	}
};
igRF_.structs.Map.prototype.get = function(a, b) {
	if (igRF_.structs.Map.Oa(this.w, a))
		return this.w[a];
	return b
};
igRF_.structs.Map.prototype.set = function(a, b) {
	if (!igRF_.structs.Map.Oa(this.w, a)) {
		this.b++;
		this.a.push(a);
		this.mb++
	}
	this.w[a] = b
};
igRF_.structs.Map.prototype.ye = function(a) {
	var b, c;
	if (a instanceof igRF_.structs.Map) {
		b = a.h();
		c = a.i()
	} else {
		b = igRF_.object.h(a);
		c = igRF_.object.i(a)
	}
	for (var d = 0; d < b.length; d++)
		this.set(b[d], c[d])
};
igRF_.structs.Map.prototype.clone = function() {
	return new igRF_.structs.Map(this)
};
igRF_.structs.Map.prototype.transpose = function() {
	for (var a = new igRF_.structs.Map, b = 0; b < this.a.length; b++) {
		var c = this.a[b], d = this.w[c];
		a.set(d, c)
	}
	return a
};
igRF_.structs.Map.prototype.__iterator__ = function(a) {
	this.Wa();
	var b = 0, c = this.a, d = this.w, e = this.mb, f = this, g = new igRF_.iter.Iterator;
	g.next = function() {
		for (; 1;) {
			if (e != f.mb)
				igRF_a(Error("The map has changed since the iterator was created"));
			if (b >= c.length)
				igRF_a(igRF_.iter.StopIteration);
			var h = c[b++];
			return a ? h : d[h]
		}
	};
	return g
};
igRF_.structs.Map.Oa = function(a, b) {
	return Object.prototype.hasOwnProperty.call(a, b)
};
igRF_.structs.Map.$ = function(a) {
	return igRF_.structs.$(a)
};
igRF_.structs.Map.i = function(a) {
	return igRF_.structs.i(a)
};
igRF_.structs.Map.h = function(a) {
	if (typeof a.h == "function")
		return a.h();
	var b = [];
	if (igRF_.isArrayLike(a))
		for (var c = 0; c < a.length; c++)
			b.push(c);
	else
		return igRF_.object.h(a);
	return b
};
igRF_.structs.Map.p = function(a, b) {
	if (typeof a.p == "function")
		return a.p(b);
	if (igRF_.isArrayLike(a))
		return Number(b) < a.length;
	return igRF_.object.p(a, b)
};
igRF_.structs.Map.ta = function(a, b) {
	return igRF_.structs.contains(a, b)
};
igRF_.structs.Map.l = function(a) {
	return igRF_.structs.l(a)
};
igRF_.structs.Map.clear = function(a) {
	igRF_.structs.clear(a)
};
igRF_.structs.Map.remove = function(a, b) {
	if (typeof a.remove == "function")
		return a.remove(b);
	if (igRF_.isArrayLike(a))
		return igRF_.array.removeAt(a, Number(b));
	return igRF_.object.remove(a, b)
};
igRF_.structs.Map.add = function(a, b, c) {
	if (typeof a.add == "function")
		a.add(b, c);
	else if (igRF_.structs.Map.p(a, b))
		igRF_a(Error('The collection already contains the key "' + b + '"'));
	else
		igRF_.structs.Map.set(a, b, c)
};
igRF_.structs.Map.get = function(a, b, c) {
	if (typeof a.get == "function")
		return a.get(b, c);
	if (igRF_.structs.Map.p(a, b))
		return a[b];
	return c
};
igRF_.structs.Map.set = function(a, b, c) {
	if (typeof a.set == "function")
		a.set(b, c);
	else
		a[b] = c
};
igRF_.asserts = {};
igRF_.asserts.assert = function(a, b) {
	if (igRF_.DEBUG && !a)
		igRF_a(Error("Assertion failed" + (b ? ": " + b : "")))
};
igRF_.asserts.fail = function(a) {
	if (igRF_.DEBUG)
		igRF_a(Error("Failure" + (a ? ": " + a : "")))
};
igRF_.asserts.assertNumber = function(a, b) {
	igRF_.asserts.assert(igRF_.isNumber(a), b)
};
igRF_.asserts.assertString = function(a, b) {
	igRF_.asserts.assert(igRF_.isString(a), b)
};
igRF_.asserts.assertFunction = function(a, b) {
	igRF_.asserts.assert(igRF_.isFunction(a), b)
};
igRF_.asserts.assertObject = function(a, b) {
	igRF_.asserts.assert(igRF_.isObject(a), b)
};
igRF_.asserts.assertInstanceof = function(a, b, c) {
	igRF_.asserts.assert(a instanceof b, c)
};
igRF_.uri = {};
igRF_.uri.utils = {};
igRF_.uri.utils.ob = {
	AMPERSAND : 38,
	EQUAL : 61,
	HASH : 35,
	QUESTION : 63
};
igRF_.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
	var h = [];
	a && h.push(a, ":");
	if (c) {
		h.push("//");
		b && h.push(b, "@");
		h.push(c);
		d && h.push(":", d)
	}
	e && h.push(e);
	f && h.push("?", f);
	g && h.push("#", g);
	return h.join("")
};
igRF_.uri.utils.Jh = /^(?:([^:\/?#]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
igRF_.uri.utils.ComponentIndex = {
	SCHEME : 1,
	USER_INFO : 2,
	DOMAIN : 3,
	PORT : 4,
	PATH : 5,
	QUERY_DATA : 6,
	FRAGMENT : 7
};
igRF_.uri.utils.split = function(a) {
	return a.match(igRF_.uri.utils.Jh)
};
igRF_.uri.utils.bc = function(a) {
	return a && decodeURIComponent(a)
};
igRF_.uri.utils.$a = function(a, b) {
	return igRF_.uri.utils.split(b)[a] || igRF_c
};
igRF_.uri.utils.nc = function(a) {
	return igRF_.uri.utils.$a(igRF_.uri.utils.ComponentIndex.SCHEME, a)
};
igRF_.uri.utils.getUserInfoEncoded = function(a) {
	return igRF_.uri.utils.$a(igRF_.uri.utils.ComponentIndex.USER_INFO, a)
};
igRF_.uri.utils.oc = function(a) {
	return igRF_.uri.utils.bc(igRF_.uri.utils.getUserInfoEncoded(a))
};
igRF_.uri.utils.getDomainEncoded = function(a) {
	return igRF_.uri.utils.$a(igRF_.uri.utils.ComponentIndex.DOMAIN, a)
};
igRF_.uri.utils.vb = function(a) {
	return igRF_.uri.utils.bc(igRF_.uri.utils.getDomainEncoded(a))
};
igRF_.uri.utils.xb = function(a) {
	return Number(igRF_.uri.utils.$a(igRF_.uri.utils.ComponentIndex.PORT, a))
			|| igRF_c
};
igRF_.uri.utils.getPathEncoded = function(a) {
	return igRF_.uri.utils.$a(igRF_.uri.utils.ComponentIndex.PATH, a)
};
igRF_.uri.utils.cb = function(a) {
	return igRF_.uri.utils.bc(igRF_.uri.utils.getPathEncoded(a))
};
igRF_.uri.utils.ud = function(a) {
	return igRF_.uri.utils.$a(igRF_.uri.utils.ComponentIndex.QUERY_DATA, a)
};
igRF_.uri.utils.getFragmentEncoded = function(a) {
	var b = a.indexOf("#");
	return b < 0 ? igRF_c : a.substr(b + 1)
};
igRF_.uri.utils.hc = function(a) {
	return igRF_.uri.utils.bc(igRF_.uri.utils.getFragmentEncoded(a))
};
igRF_.uri.utils.getHost = function(a) {
	var b = igRF_.uri.utils.split(a);
	return igRF_.uri.utils.buildFromEncodedParts(
			b[igRF_.uri.utils.ComponentIndex.SCHEME],
			b[igRF_.uri.utils.ComponentIndex.USER_INFO],
			b[igRF_.uri.utils.ComponentIndex.DOMAIN],
			b[igRF_.uri.utils.ComponentIndex.PORT])
};
igRF_.uri.utils.getPathAndAfter = function(a) {
	var b = igRF_.uri.utils.split(a);
	return igRF_.uri.utils.buildFromEncodedParts(igRF_c, igRF_c, igRF_c,
			igRF_c, b[igRF_.uri.utils.ComponentIndex.PATH],
			b[igRF_.uri.utils.ComponentIndex.QUERY_DATA],
			b[igRF_.uri.utils.ComponentIndex.FRAGMENT])
};
igRF_.uri.utils.removeFragment = function(a) {
	var b = a.indexOf("#");
	return b < 0 ? a : a.substr(0, b)
};
igRF_.uri.utils.haveSameDomain = function(a, b) {
	var c = igRF_.uri.utils.split(a), d = igRF_.uri.utils.split(b);
	return c[igRF_.uri.utils.ComponentIndex.DOMAIN] == d[igRF_.uri.utils.ComponentIndex.DOMAIN]
			&& c[igRF_.uri.utils.ComponentIndex.SCHEME] == d[igRF_.uri.utils.ComponentIndex.SCHEME]
			&& c[igRF_.uri.utils.ComponentIndex.PORT] == d[igRF_.uri.utils.ComponentIndex.PORT]
};
igRF_.uri.utils.bh = function(a) {
	if (igRF_.DEBUG && (a.indexOf("#") >= 0 || a.indexOf("?") >= 0))
		igRF_a(Error("goog.uri.utils: Fragment or query identifiers are not supported: ["
				+ a + "]"))
};
igRF_.uri.utils.Lc = function(a) {
	if (a[1]) {
		var b = a[0], c = b.indexOf("#");
		if (c >= 0) {
			a.push(b.substr(c));
			a[0] = b = b.substr(0, c)
		}
		var d = b.indexOf("?");
		if (d < 0)
			a[1] = "?";
		else if (d == b.length - 1)
			a[1] = undefined
	}
	return a.join("")
};
igRF_.uri.utils.Ee = function(a, b, c) {
	if (igRF_.isArray(b)) {
		b = b;
		for (var d = 0; d < b.length; d++)
			c.push("&", a, "=", igRF_.string.urlEncode(b[d]))
	} else
		b != igRF_c && c.push("&", a, "=", igRF_.string.urlEncode(b))
};
igRF_.uri.utils.He = function(a, b, c) {
	igRF_.asserts.assert(Math.max(b.length - (c || 0), 0) % 2 == 0,
			"goog.uri.utils: Key/value lists must be even in length.");
	for (var d = c || 0; d < b.length; d += 2)
		igRF_.uri.utils.Ee(b[d], b[d + 1], a);
	return a
};
igRF_.uri.utils.buildQueryData = function(a, b) {
	var c = igRF_.uri.utils.He([], a, b);
	c[0] = "";
	return c.join("")
};
igRF_.uri.utils.Ge = function(a, b) {
	for (var c in b)
		igRF_.uri.utils.Ee(c, b[c], a);
	return a
};
igRF_.uri.utils.buildQueryDataFromMap = function(a) {
	var b = igRF_.uri.utils.Ge([], a);
	b[0] = "";
	return b.join("")
};
igRF_.uri.utils.appendParams = function(a) {
	return igRF_.uri.utils.Lc(igRF_.uri.utils.He([a], arguments, 1))
};
igRF_.uri.utils.appendParamsFromMap = function(a, b) {
	return igRF_.uri.utils.Lc(igRF_.uri.utils.Ge([a], b))
};
igRF_.uri.utils.appendParam = function(a, b, c) {
	return igRF_.uri.utils.Lc([a, "&", b, "=", igRF_.string.urlEncode(c)])
};
igRF_.uri.utils.fc = function(a, b, c, d) {
	for (var e = b, f = c.length; (e = a.indexOf(c, e)) >= 0 && e < d;) {
		var g = a.charCodeAt(e - 1);
		if (g == igRF_.uri.utils.ob.AMPERSAND
				|| g == igRF_.uri.utils.ob.QUESTION) {
			var h = a.charCodeAt(e + f);
			if (!h || h == igRF_.uri.utils.ob.EQUAL
					|| h == igRF_.uri.utils.ob.AMPERSAND
					|| h == igRF_.uri.utils.ob.HASH)
				return e
		}
		e += f + 1
	}
	return -1
};
igRF_.uri.utils.sc = /#|$/;
igRF_.uri.utils.hasParam = function(a, b) {
	return igRF_.uri.utils.fc(a, 0, b, a.search(igRF_.uri.utils.sc)) >= 0
};
igRF_.uri.utils.getParamValue = function(a, b) {
	var c = a.search(igRF_.uri.utils.sc), d = igRF_.uri.utils.fc(a, 0, b, c);
	if (d < 0)
		return igRF_c;
	else {
		var e = a.indexOf("&", d);
		if (e < 0 || e > c)
			e = c;
		d += b.length + 1;
		return igRF_.string.urlDecode(a.substr(d, e - d))
	}
};
igRF_.uri.utils.getParamValues = function(a, b) {
	for (var c = a.search(igRF_.uri.utils.sc), d = 0, e, f = []; (e = igRF_.uri.utils
			.fc(a, d, b, c)) >= 0;) {
		d = a.indexOf("&", e);
		if (d < 0 || d > c)
			d = c;
		e += b.length + 1;
		f.push(igRF_.string.urlDecode(a.substr(e, d - e)))
	}
	return f
};
igRF_.uri.utils.Kh = /[?&]($|#)/;
igRF_.uri.utils.removeParam = function(a, b) {
	for (var c = a.search(igRF_.uri.utils.sc), d = 0, e, f = []; (e = igRF_.uri.utils
			.fc(a, d, b, c)) >= 0;) {
		f.push(a.substring(d, e));
		d = Math.min(a.indexOf("&", e) + 1 || c, c)
	}
	f.push(a.substr(d));
	return f.join("").replace(igRF_.uri.utils.Kh, "$1")
};
igRF_.uri.utils.setParam = function(a, b, c) {
	return igRF_.uri.utils.appendParam(igRF_.uri.utils.removeParam(a, b), b, c)
};
igRF_.uri.utils.appendPath = function(a, b) {
	igRF_.uri.utils.bh(a);
	if (igRF_.string.endsWith(a, "/"))
		a = a.substr(0, a.length - 1);
	if (igRF_.string.startsWith(b, "/"))
		b = b.substr(1);
	return igRF_.string.buildString(a, "/", b)
};
igRF_.uri.utils.StandardQueryParam = {
	RANDOM : "zx"
};
igRF_.uri.utils.Uf = function(a) {
	return igRF_.uri.utils.setParam(a,
			igRF_.uri.utils.StandardQueryParam.RANDOM, igRF_.string
					.getRandomString())
};
igRF_.Uri = function(a, b) {
	var c;
	if (a instanceof igRF_.Uri) {
		this.Da(b == igRF_c ? a.jf() : b);
		this.Rb(a.nc());
		this.Sb(a.oc());
		this.Nb(a.vb());
		this.Qb(a.xb());
		this.Pb(a.cb());
		this.Hc(a.ud().clone());
		this.Ob(a.hc())
	} else if (a && (c = igRF_.uri.utils.split(String(a)))) {
		this.Da(!!b);
		this.Rb(c[igRF_.uri.utils.ComponentIndex.SCHEME] || "", igRF_b);
		this.Sb(c[igRF_.uri.utils.ComponentIndex.USER_INFO] || "", igRF_b);
		this.Nb(c[igRF_.uri.utils.ComponentIndex.DOMAIN] || "", igRF_b);
		this.Qb(c[igRF_.uri.utils.ComponentIndex.PORT]);
		this.Pb(c[igRF_.uri.utils.ComponentIndex.PATH] || "", igRF_b);
		this.ie(c[igRF_.uri.utils.ComponentIndex.QUERY_DATA] || "", igRF_b);
		this.Ob(c[igRF_.uri.utils.ComponentIndex.FRAGMENT] || "", igRF_b)
	} else {
		this.Da(!!b);
		this.z = new igRF_.Uri.QueryData(igRF_c, this, this.ja)
	}
};
igRF_.Uri.RANDOM_PARAM = igRF_.uri.utils.StandardQueryParam.RANDOM;
igRF_.Uri.prototype.qa = "";
igRF_.Uri.prototype.Ua = "";
igRF_.Uri.prototype.Ka = "";
igRF_.Uri.prototype.Sa = igRF_c;
igRF_.Uri.prototype.Ra = "";
igRF_.Uri.prototype.La = "";
igRF_.Uri.prototype.Kf = igRF_d;
igRF_.Uri.prototype.ja = igRF_d;
igRF_.Uri.prototype.toString = function() {
	if (this.da)
		return this.da;
	var a = [];
	this.qa && a.push(igRF_.Uri.ub(this.qa, igRF_.Uri.mg), ":");
	if (this.Ka) {
		a.push("//");
		this.Ua && a.push(igRF_.Uri.ub(this.Ua, igRF_.Uri.mg), "@");
		a.push(igRF_.Uri.oh(this.Ka));
		this.Sa != igRF_c && a.push(":", String(this.xb()))
	}
	this.Ra && a.push(igRF_.Uri.ub(this.Ra, igRF_.Uri.Eh));
	var b = String(this.z);
	b && a.push("?", b);
	this.La && a.push("#", igRF_.Uri.ub(this.La, igRF_.Uri.Dh));
	return this.da = a.join("")
};
igRF_.Uri.prototype.resolve = function(a) {
	var b = this.clone(), c = a.Cf();
	if (c)
		b.Rb(a.nc());
	else
		c = a.Df();
	if (c)
		b.Sb(a.oc());
	else
		c = a.Hd();
	if (c)
		b.Nb(a.vb());
	else
		c = a.Af();
	var d = a.cb();
	if (c)
		b.Qb(a.xb());
	else if (c = a.Id()) {
		if (d.charAt(0) != "/")
			if (this.Hd() && !this.Id())
				d = "/" + d;
			else {
				var e = b.cb().lastIndexOf("/");
				if (e != -1)
					d = b.cb().substr(0, e + 1) + d
			}
		d = igRF_.Uri.removeDotSegments(d)
	}
	if (c)
		b.Pb(d);
	else
		c = a.Bf();
	if (c)
		b.ie(a.cf());
	else
		c = a.zf();
	c && b.Ob(a.hc());
	return b
};
igRF_.Uri.prototype.clone = function() {
	return igRF_.Uri.create(this.qa, this.Ua, this.Ka, this.Sa, this.Ra, this.z
					.clone(), this.La, this.ja)
};
igRF_.Uri.prototype.nc = function() {
	return this.qa
};
igRF_.Uri.prototype.Rb = function(a, b) {
	this.fa();
	delete this.da;
	if (this.qa = b ? igRF_.Uri.Ya(a) : a)
		this.qa = this.qa.replace(/:$/, "");
	return this
};
igRF_.Uri.prototype.Cf = function() {
	return !!this.qa
};
igRF_.Uri.prototype.oc = function() {
	return this.Ua
};
igRF_.Uri.prototype.Sb = function(a, b) {
	this.fa();
	delete this.da;
	this.Ua = b ? igRF_.Uri.Ya(a) : a;
	return this
};
igRF_.Uri.prototype.Df = function() {
	return !!this.Ua
};
igRF_.Uri.prototype.vb = function() {
	return this.Ka
};
igRF_.Uri.prototype.Nb = function(a, b) {
	this.fa();
	delete this.da;
	this.Ka = b ? igRF_.Uri.Ya(a) : a;
	return this
};
igRF_.Uri.prototype.Hd = function() {
	return !!this.Ka
};
igRF_.Uri.prototype.xb = function() {
	return this.Sa
};
igRF_.Uri.prototype.Qb = function(a) {
	this.fa();
	delete this.da;
	if (a) {
		a = Number(a);
		if (isNaN(a) || a < 0)
			igRF_a(Error("Bad port number " + a));
		this.Sa = a
	} else
		this.Sa = igRF_c;
	return this
};
igRF_.Uri.prototype.Af = function() {
	return this.Sa != igRF_c
};
igRF_.Uri.prototype.cb = function() {
	return this.Ra
};
igRF_.Uri.prototype.Pb = function(a, b) {
	this.fa();
	delete this.da;
	this.Ra = b ? igRF_.Uri.Ya(a) : a;
	return this
};
igRF_.Uri.prototype.Id = function() {
	return !!this.Ra
};
igRF_.Uri.prototype.Bf = function() {
	return this.z.toString() !== ""
};
igRF_.Uri.prototype.Hc = function(a, b) {
	this.fa();
	delete this.da;
	if (a instanceof igRF_.Uri.QueryData) {
		this.z = a;
		this.z.ne = this;
		this.z.Da(this.ja)
	} else {
		b || (a = igRF_.Uri.ub(a, igRF_.Uri.Fh));
		this.z = new igRF_.Uri.QueryData(a, this, this.ja)
	}
	return this
};
igRF_.Uri.prototype.ie = function(a, b) {
	return this.Hc(a, b)
};
igRF_.Uri.prototype.cf = function() {
	return this.z.Mg()
};
igRF_.Uri.prototype.ud = function() {
	return this.z
};
igRF_.Uri.prototype.Bg = function(a, b) {
	this.fa();
	delete this.da;
	this.z.set(a, b);
	return this
};
igRF_.Uri.prototype.of = function(a) {
	return this.z.get(a)
};
igRF_.Uri.prototype.hc = function() {
	return this.La
};
igRF_.Uri.prototype.Ob = function(a, b) {
	this.fa();
	delete this.da;
	this.La = b ? igRF_.Uri.Ya(a) : a;
	return this
};
igRF_.Uri.prototype.zf = function() {
	return !!this.La
};
igRF_.Uri.prototype.Uf = function() {
	this.fa();
	this.Bg(igRF_.Uri.RANDOM_PARAM, igRF_.string.getRandomString());
	return this
};
igRF_.Uri.prototype.removeParameter = function(a) {
	this.fa();
	this.z.remove(a);
	return this
};
igRF_.Uri.prototype.fa = function() {
	if (this.Kf)
		igRF_a(Error("Tried to modify a read-only Uri"))
};
igRF_.Uri.prototype.Da = function(a) {
	this.ja = a;
	this.z && this.z.Da(a)
};
igRF_.Uri.prototype.jf = function() {
	return this.ja
};
igRF_.Uri.parse = function(a, b) {
	return a instanceof igRF_.Uri ? a.clone() : new igRF_.Uri(a, b)
};
igRF_.Uri.create = function(a, b, c, d, e, f, g, h) {
	var i = new igRF_.Uri(igRF_c, h);
	a && i.Rb(a);
	b && i.Sb(b);
	c && i.Nb(c);
	d && i.Qb(d);
	e && i.Pb(e);
	f && i.Hc(f);
	g && i.Ob(g);
	return i
};
igRF_.Uri.resolve = function(a, b) {
	a instanceof igRF_.Uri || (a = igRF_.Uri.parse(a));
	b instanceof igRF_.Uri || (b = igRF_.Uri.parse(b));
	return a.resolve(b)
};
igRF_.Uri.removeDotSegments = function(a) {
	if (a == ".." || a == ".")
		return "";
	else if (!igRF_.string.contains(a, "./") && !igRF_.string.contains(a, "/."))
		return a;
	else {
		for (var b = igRF_.string.startsWith(a, "/"), c = a.split("/"), d = [], e = 0; e < c.length;) {
			var f = c[e++];
			if (f == ".")
				b && e == c.length && d.push("");
			else if (f == "..") {
				if (d.length > 1 || d.length == 1 && d[0] != "")
					d.pop();
				b && e == c.length && d.push("")
			} else {
				d.push(f);
				b = igRF_b
			}
		}
		return d.join("/")
	}
};
igRF_.Uri.Ya = function(a) {
	return a ? decodeURIComponent(a) : ""
};
igRF_.Uri.oh = function(a) {
	if (igRF_.isString(a))
		return encodeURIComponent(a);
	return igRF_c
};
igRF_.Uri.nh = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
igRF_.Uri.ub = function(a, b) {
	var c = igRF_c;
	if (igRF_.isString(a)) {
		c = a;
		igRF_.Uri.nh.test(c) || (c = encodeURI(a));
		if (c.search(b) >= 0)
			c = c.replace(b, igRF_.Uri.mh)
	}
	return c
};
igRF_.Uri.mh = function(a) {
	var b = a.charCodeAt(0);
	return "%" + (b >> 4 & 15).toString(16) + (b & 15).toString(16)
};
igRF_.Uri.mg = /[#\/\?@]/g;
igRF_.Uri.Eh = /[\#\?]/g;
igRF_.Uri.Fh = /[\#\?@]/g;
igRF_.Uri.Dh = /#/g;
igRF_.Uri.haveSameDomain = function(a, b) {
	var c = igRF_.uri.utils.split(a), d = igRF_.uri.utils.split(b);
	return c[igRF_.uri.utils.ComponentIndex.DOMAIN] == d[igRF_.uri.utils.ComponentIndex.DOMAIN]
			&& c[igRF_.uri.utils.ComponentIndex.PORT] == d[igRF_.uri.utils.ComponentIndex.PORT]
};
igRF_.Uri.QueryData = function(a, b, c) {
	this.ua = a || igRF_c;
	this.ne = b || igRF_c;
	this.ja = !!c
};
igRF_.Uri.QueryData.prototype.ga = function() {
	if (!this.f) {
		this.f = new igRF_.structs.Map;
		if (this.ua)
			for (var a = this.ua.split("&"), b = 0; b < a.length; b++) {
				var c = a[b].indexOf("="), d = igRF_c, e = igRF_c;
				if (c >= 0) {
					d = a[b].substring(0, c);
					e = a[b].substring(c + 1)
				} else
					d = a[b];
				d = igRF_.string.urlDecode(d);
				d = this.Ca(d);
				this.add(d, e ? igRF_.string.urlDecode(e) : "")
			}
	}
};
igRF_.Uri.QueryData.createFromMap = function(a, b, c) {
	var d = igRF_.structs.h(a);
	if (typeof d == "undefined")
		igRF_a(Error("Keys are undefined"));
	return igRF_.Uri.QueryData
			.createFromKeysValues(d, igRF_.structs.i(a), b, c)
};
igRF_.Uri.QueryData.createFromKeysValues = function(a, b, c, d) {
	if (a.length != b.length)
		igRF_a(Error("Mismatched lengths for keys/values"));
	for (var e = new igRF_.Uri.QueryData(igRF_c, c, d), f = 0; f < a.length; f++)
		e.add(a[f], b[f]);
	return e
};
igRF_.Uri.QueryData.prototype.f = igRF_c;
igRF_.Uri.QueryData.prototype.b = igRF_c;
igRF_.Uri.QueryData.Ha = igRF_c;
igRF_.Uri.QueryData.prototype.$ = function() {
	this.ga();
	return this.b
};
igRF_.Uri.QueryData.prototype.add = function(a, b) {
	this.ga();
	this.fb();
	a = this.Ca(a);
	if (this.p(a)) {
		var c = this.f.get(a);
		igRF_.isArray(c) ? c.push(b) : this.f.set(a, [c, b])
	} else
		this.f.set(a, b);
	this.b++;
	return this
};
igRF_.Uri.QueryData.prototype.remove = function(a) {
	this.ga();
	a = this.Ca(a);
	if (this.f.p(a)) {
		this.fb();
		var b = this.f.get(a);
		if (igRF_.isArray(b))
			this.b -= b.length;
		else
			this.b--;
		return this.f.remove(a)
	}
	return igRF_d
};
igRF_.Uri.QueryData.prototype.clear = function() {
	this.fb();
	this.f && this.f.clear();
	this.b = 0
};
igRF_.Uri.QueryData.prototype.l = function() {
	this.ga();
	return this.b == 0
};
igRF_.Uri.QueryData.prototype.p = function(a) {
	this.ga();
	a = this.Ca(a);
	return this.f.p(a)
};
igRF_.Uri.QueryData.prototype.ta = function(a) {
	var b = this.i();
	return igRF_.array.contains(b, a)
};
igRF_.Uri.QueryData.prototype.h = function() {
	this.ga();
	for (var a = this.f.i(), b = this.f.h(), c = [], d = 0; d < b.length; d++) {
		var e = a[d];
		if (igRF_.isArray(e))
			for (var f = 0; f < e.length; f++)
				c.push(b[d]);
		else
			c.push(b[d])
	}
	return c
};
igRF_.Uri.QueryData.prototype.i = function(a) {
	this.ga();
	var b;
	if (a) {
		var c = this.Ca(a);
		if (this.p(c)) {
			var d = this.f.get(c);
			if (igRF_.isArray(d))
				return d;
			else {
				b = [];
				b.push(d)
			}
		} else
			b = []
	} else {
		var e = this.f.i();
		b = [];
		for (var f = 0; f < e.length; f++) {
			var g = e[f];
			igRF_.isArray(g) ? igRF_.array.extend(b, g) : b.push(g)
		}
	}
	return b
};
igRF_.Uri.QueryData.prototype.set = function(a, b) {
	this.ga();
	this.fb();
	a = this.Ca(a);
	if (this.p(a)) {
		var c = this.f.get(a);
		if (igRF_.isArray(c))
			this.b -= c.length;
		else
			this.b--
	}
	this.f.set(a, b);
	this.b++;
	return this
};
igRF_.Uri.QueryData.prototype.get = function(a, b) {
	this.ga();
	a = this.Ca(a);
	if (this.p(a)) {
		var c = this.f.get(a);
		return igRF_.isArray(c) ? c[0] : c
	} else
		return b
};
igRF_.Uri.QueryData.prototype.toString = function() {
	if (this.ua)
		return this.ua;
	if (!this.f)
		return "";
	for (var a = [], b = 0, c = this.f.h(), d = 0; d < c.length; d++) {
		var e = c[d], f = igRF_.string.urlEncode(e), g = this.f.get(e);
		if (igRF_.isArray(g))
			for (var h = 0; h < g.length; h++) {
				b > 0 && a.push("&");
				a.push(f, "=", igRF_.string.urlEncode(g[h]));
				b++
			}
		else {
			b > 0 && a.push("&");
			a.push(f, "=", igRF_.string.urlEncode(g));
			b++
		}
	}
	return this.ua = a.join("")
};
igRF_.Uri.QueryData.prototype.Mg = function() {
	if (!this.Ha)
		this.Ha = igRF_.Uri.Ya(this.toString());
	return this.Ha
};
igRF_.Uri.QueryData.prototype.fb = function() {
	delete this.Ha;
	delete this.ua;
	this.ne && delete this.ne.da
};
igRF_.Uri.QueryData.prototype.clone = function() {
	var a = new igRF_.Uri.QueryData;
	if (this.Ha)
		a.Ha = this.Ha;
	if (this.ua)
		a.ua = this.ua;
	if (this.f)
		a.f = this.f.clone();
	return a
};
igRF_.Uri.QueryData.prototype.Ca = function(a) {
	var b = String(a);
	if (this.ja)
		b = b.toLowerCase();
	return b
};
igRF_.Uri.QueryData.prototype.Da = function(a) {
	var b = a && !this.ja;
	if (b) {
		this.ga();
		this.fb();
		igRF_.structs.forEach(this.f, function(c, d) {
					var e = d.toLowerCase();
					if (d != e) {
						this.remove(d);
						this.add(e, c)
					}
				}, this)
	}
	this.ja = a
};
igRF_.Uri.QueryData.prototype.extend = function() {
	for (var a = 0; a < arguments.length; a++) {
		var b = arguments[a];
		igRF_.structs.forEach(b, function(c, d) {
					this.add(d, c)
				}, this)
	}
};
igRF_.finance = {};
igRF_.finance.autocomplete = {};
igRF_.finance.autocomplete.Matcher = {};
(function() {
	var a = igRF_.finance.autocomplete;
	a.Matcher = function(b, c) {
		this.zh = b;
		this.vh = c;
		this.Vf = function() {
		};
		this.Xe = "";
		if (c)
			this.Xe = "www.google." + this.tf(window.location.href);
		this.xa = [];
		this.qb = {};
		this.Ec()
	};
	a.Matcher.prototype.tf = function(b) {
		var c = new igRF_.Uri(b), d = c.of("parent"), e = igRF_.Uri.parse(d)
				.vb().match(/google\.(.+)/i);
		return e && e.length > 1 && e[1] ? e[1] : "com"
	};
	a.Matcher.prototype._clearCache = function() {
		this.qb = {}
	};
	a.Matcher.prototype._DIVIDER = "\u000c";
	a.Matcher.prototype.Ec = function() {
		this.Be = igRF_d;
		this.Bc = this.Yb = ""
	};
	a.Matcher.prototype.Dc = function(b, c, d) {
		this.Vf = d;
		this.Gb = c;
		this.mf(b, c)
	};
	a.Matcher.prototype.sd = function(b) {
		this.cachedPatternToken = this.cachedPatternToken || "";
		this.cachedPattern = this.cachedPattern || igRF_c;
		if (b == "")
			return igRF_c;
		if (b == this.cachedPatternToken)
			return this.cachedPattern;
		else {
			var c = b.replace(/([\^*+\-\$\\\{\}\(\)\[\]\#?\.])/g, "\\$1"), d = new RegExp(
					"(.*?[\\s])??([.]?" + c + ")(.*)", "i");
			this.cachedPatternToken = b;
			return this.cachedPattern = {
				re : d,
				preTokenIndex : 1,
				tokenIndex : 2,
				postTokenIndex : 3
			}
		}
	};
	a.Matcher.prototype.Wd = function(b) {
		for (var c = this.sd(b), d = [], e = 0; e < this.xa.length; e++) {
			var f = this.xa[e];
			if (f.sugg)
				for (var g = 1; g < f.sugg.length; ++g)
					if (f.sugg[g].match(c.re)) {
						d.push(f);
						break
					}
			if (d.length >= this.Gb)
				break
		}
		this.Vf(b, d)
	};
	a.Matcher.prototype.mf = function(b) {
		if (b == "") {
			this.Ec();
			this.xa = []
		} else if (!(b == this.Bc))
			if (this.Be && b.substring(0, this.Yb.length) == this.Yb)
				this.xa = this.qb[this.Yb];
			else if (this.qb[b])
				this.xa = this.qb[b];
			else {
				this.Ec();
				this.kg(b);
				this.Bc = b;
				return
			}
		this.Bc = b;
		this.Wd(b)
	};
	a.Matcher.prototype.kg = function(b) {
		if (b.length == 0)
			this.xa = [];
		else {
			var c = this.lf(b), d = this;
			if (this.vh) {
				var e = function(g) {
					d.Qd(b, g)
				};
				_IG_FetchContent("http://" + this.Xe + c, e)
			} else {
				var f = igRF_E ? new ActiveXObject(igRF_E) : new XMLHttpRequest;
				igRF_G(f, c, function() {
							d.xe(b, f)
						})
			}
		}
	};
	a.Matcher.prototype.lf = function(b) {
		var c = "/finance/match?matchtype=" + this.zh + "&q=" + escape(b)
				+ "&basetkr=" + escape(this.baseTicker);
		return c
	};
	a.Matcher.prototype.xe = function(b, c) {
		c.readyState == 4 && c.status == 200 && this.Qd(b, c.responseText)
	};
	a.Matcher.prototype.Qd = function(b, c) {
		try {
			if (b == this.Bc) {
				var d = eval("(" + c + ")");
				this.xa = [];
				for (var e = 0; e < d.matches.length; e++) {
					var f = d.matches[e], g = f.e && f.t
							? f.e + ":" + f.t
							: f.t;
					f.matchValue = g && g.length > 0 ? g : f.n;
					f.toString = function() {
						return this.matchValue
					};
					this.xa.push(f)
				}
				this.qb[b] = this.xa;
				this.Be = d.all;
				this.Yb = b;
				this.Wd(b)
			}
		} catch (h) {
		}
	}
})();
igRF_.finance.autocomplete.InputHandler = {};
(function() {
	var a = igRF_.finance.autocomplete;
	a.InputHandler = function(b, c, d) {
		igRF_.ui.AutoComplete.InputHandler.call(this, b, c, d)
	};
	igRF_.inherits(igRF_.finance.autocomplete.InputHandler,
			igRF_.ui.AutoComplete.InputHandler)
})();
igRF_.finance.autocomplete.Renderer = {};
(function() {
	var a = igRF_.finance.autocomplete;
	a.Renderer = function(b) {
		igRF_.ui.AutoComplete.Renderer.CustomRenderer.call(this);
		this.render = igRF_c;
		this.Qa = b
	};
	igRF_.inherits(igRF_.finance.autocomplete.Renderer,
			igRF_.ui.AutoComplete.Renderer.CustomRenderer);
	a.Renderer.prototype.Jb = function(b, c, d) {
		var e = this.Qa.sd(c);
		if (!e || !e.re)
			d.innerHTML = "";
		else {
			for (var f = b.data, g = ["tick", "cname", "local", "pinyin",
					"isin", "altname"], h = f.sugg[0].split(","), i = "", j = igRF_d, k = 1; k < f.sugg.length; ++k) {
				var l = g[h[k - 1] - 1];
				if (l == "cname" && k != f.sugg.length - 1)
					l += "_w";
				var m = "<span class=" + l + ">", n = f.sugg[k], o = n
						.match(e.re);
				if (o) {
					n = (o[1] || "") + "<b>" + o[2] + "</b>" + o[3];
					j = igRF_b
				}
				i += m + " " + n + "</span>"
			}
			d.innerHTML = j ? i : ""
		}
	}
})();
igRF_.finance.autocomplete.AutoComplete = {};
igRF_f("google.finance.autocomplete");
(function() {
	var a = igRF_e.global, b = igRF_.finance.autocomplete, c = {};
	b.MATCH_PUBLIC = "matchpublic";
	b.MATCH_ALL = "matchall";
	b.MATCH_PORTFOLIO = "matchportfolio";
	b.AutoComplete = function(f, g, h) {
		this.Qa = new b.Matcher(f, h);
		var i = new b.Renderer(this.Qa);
		this.za = new igRF_.ui.AutoComplete.Renderer(igRF_c, i, igRF_d, igRF_d);
		this.vc = new b.InputHandler(igRF_c, igRF_c, igRF_d);
		igRF_.ui.AutoComplete.call(this, this.Qa, this.za, this.vc);
		this.vc.Mc(this);
		this.vc.Nc(g);
		this.he.call(this, 10);
		this.wg.call(this, igRF_d)
	};
	b.AutoComplete.inherits(igRF_.ui.AutoComplete);
	b.AutoComplete.prototype.qf = function() {
		return this.za
	};
	b.AutoComplete.prototype.kf = function() {
		return this.vc
	};
	function d(f, g) {
		if (!igRF_.global.Bb)
			igRF_.global.Bb = [];
		var h = new b.AutoComplete(f, g, igRF_b);
		c[g.id] = h;
		igRF_.global.Bb.push(h)
	}
	function e(f, g) {
		if (!igRF_.global.Bb)
			igRF_.global.Bb = [];
		var h = new b.AutoComplete(f, g, igRF_b);
		h.qf().Gg(igRF_b);
		h.kf().Hg(igRF_b);
		h.he.call(h, 4);
		c[g.id] = h;
		igRF_.global.Bb.push(h)
	}
	igRF_.exportProperty(a.google.finance, "InitAutoComplete", d);
	igRF_.exportProperty(a.google.finance, "InitAutoCompleteTopAlign", e);
	igRF_.exportProperty(a.google.finance.autocomplete, "MATCH_PUBLIC",
			b.MATCH_PUBLIC);
	igRF_.exportProperty(a.google.finance.autocomplete, "MATCH_ALL",
			b.MATCH_ALL);
	igRF_.exportProperty(a.google.finance.autocomplete, "MATCH_PORTFOLIO",
			b.MATCH_PORTFOLIO)
})();
igRF_.finance.quote = {};
(function() {
	var a = igRF_e.global.google.finance;
	a.OPEN = "op";
	a.HIGH = "hi";
	a.LOW = "lo";
	a.SYMBOL = "s";
	a.TICKER = "t";
	a.EXCHANGE = "e";
	a.LAST = "l";
	a.VOLUME = "vo";
	a.AVG_VOLUME = "avvo";
	a.HIGH_52W = "hi52";
	a.LOW_52W = "lo52";
	a.CHANGE = "c";
	a.CHANGE_PCT = "cp";
	a.LAST_TRADE_TIME = "ltt";
	a.LAST_TRADE_DATETIME = "lt";
	a.LAST_TRADE_DATE = "ltd";
	a.EXT_LAST = "el";
	a.EXT_VOLUME = "evo";
	a.EXT_CHANGE = "ec";
	a.EXT_CHANGE_PCT = "ecp";
	a.EXT_LAST_TRADE_TIME = "elt";
	a.MARKET_CAP = "mc";
	a.PE = "pe";
	a.FORWARD_PE = "fwpe";
	a.BETA = "beta";
	a.EPS = "eps"
})();
igRF_.finance.quote.DOMQuoteListener = {};
(function() {
	var a = igRF_.finance.quote, b = igRF_e.global.google.finance;
	a.QUOTE_KEYS = [b.OPEN, b.HIGH, b.LOW, b.SYMBOL, b.EXCHANGE, b.LAST,
			b.VOLUME, b.CHANGE, b.CHANGE_PCT, b.TICKER, b.LAST_TRADE_TIME,
			b.LAST_TRADE_DATETIME, b.LAST_TRADE_DATE, b.EXT_LAST, b.EXT_VOLUME,
			b.EXT_CHANGE, b.EXT_CHANGE_PCT, b.EXT_LAST_TRADE_TIME,
			b.AVG_VOLUME, b.HIGH_52W, b.LOW_52W, b.MARKET_CAP, b.PE,
			b.FORWARD_PE, b.BETA, b.EPS];
	a.DOMQuoteListener = function() {
		this.Hb = igRF_c;
		this.Md = [];
		this.Va = {
			chg : "financelib_up",
			chr : "financelib_down"
		}
	};
	a.DOMQuoteListener.prototype.yg = function(c, d) {
		this.Va.chg = c;
		this.Va.chr = d
	};
	a.DOMQuoteListener.prototype.zg = function(c) {
		this.Md = c
	};
	a.DOMQuoteListener.prototype.Ie = function(c, d, e) {
		var f = this.Hb[c];
		if (!f) {
			f = {};
			this.Hb[c] = f
		}
		var g = f[d];
		if (!g) {
			g = [];
			f[d] = g
		}
		g.push(e)
	};
	a.DOMQuoteListener.prototype.gf = function(c, d) {
		var e = this.Hb[c];
		return e ? e[d] : igRF_c
	};
	a.DOMQuoteListener.prototype.ig = function() {
		if (!this.Hb) {
			this.Hb = {};
			if (document.getElementsByTagName)
				for (var c = document.getElementsByTagName("span"), d = 0; d < c.length; ++d) {
					var e = c[d];
					if (e.id && e.id.length > 2)
						for (var f = 0; f < this.Md.length; ++f) {
							var g = this.Md[f];
							if (e.id.substring(0, g.length) == g) {
								var h = e.id.substring(g.length + 1);
								h && this.Ie(g, h, e)
							}
						}
				}
		}
	};
	a.DOMQuoteListener.prototype.listen = function(c, d) {
		this.ig();
		for (var e = 0; e < a.QUOTE_KEYS.length; ++e) {
			var f = a.QUOTE_KEYS[e], g = c[f];
			if (g) {
				var h = this.gf(d, f);
				if (h) {
					var i = igRF_c, j = f == b.CHANGE || f == b.CHANGE_PCT, k = f == b.EXT_CHANGE
							|| f == b.EXT_CHANGE_PCT;
					if (j || k) {
						if (j && c.ccol)
							i = this.Va[c.ccol];
						else if (k && c.eccol)
							i = this.Va[c.eccol];
						if (!i && g.length && g.length > 0)
							i = "-" == g.charAt(0) ? this.Va.chr : this.Va.chg
					}
					if (f == b.CHANGE_PCT || f == b.EXT_CHANGE_PCT)
						g = "(" + g + "%)";
					for (var l = 0; l < h.length; ++l) {
						var m = h[l];
						if (m) {
							if (i)
								m.className = i;
							m.innerHTML = g
						}
					}
				}
			}
		}
	}
})();
igRF_.finance.quote.QuotePoller = {};
(function() {
	var a = igRF_.finance.quote, b = igRF_e.global.google.finance;
	a.QuotePoller = function(d) {
		this.le = [];
		this.v = [];
		this.Sh = igRF_b;
		this.dc = this.Ja = igRF_c;
		this.Td = d;
		this.Ud = a.QuotePoller.getModuleSettings(d);
		this.ke = ""
	};
	a.QuotePoller.getModuleSettings = function(d) {
		if (!igRF_.isDefAndNotNull(d))
			for (var e in b.modules)
				if (igRF_.isDefAndNotNull(b.modules[e].token)) {
					d = e;
					break
				}
		var f = {
			token : "",
			synd : "",
			msh : ""
		};
		if (igRF_.isDefAndNotNull(d) && igRF_.isDefAndNotNull(b.modules[d]))
			f = b.modules[d];
		return f
	};
	a.QuotePoller.prototype.Xb = function(d) {
		igRF_.array.contains(this.v, d) || this.v.push(d)
	};
	a.QuotePoller.prototype.Cc = function(d) {
		igRF_.array.remove(this.v, d)
	};
	a.QuotePoller.prototype.$c = function(d) {
		if (this.dc != igRF_c) {
			this.Cc(this.dc);
			this.Ja = igRF_c
		}
		if (this.Ja == igRF_c) {
			this.Ja = new igRF_.finance.quote.DOMQuoteListener;
			this.dc = igRF_.bind(this.Ja.listen, this.Ja);
			var e = igRF_.structs.i(d);
			this.Ja.zg(e);
			igRF_.isDefAndNotNull(this.Td)
					&& this.Ja.yg("financelib_up financelib_up" + this.Td,
							"financelib_down financelib_down" + this.Td)
		}
		this.ke = d;
		this.Xb(this.dc)
	};
	a.QuotePoller.prototype.Jf = function(d) {
		var e = !this.le || this.le.join(",") != d.join(",");
		return e
	};
	a.QuotePoller.prototype.vd = function(d, e, f) {
		e || (e = "en");
		f || (f = "us");
		igRF_.isArray(d) || (d = [d.toString()]);
		if (igRF_.object.$(d) > 0) {
			var g = this.Jf(d), h = d.join(",");
			this.le = d;
			var i = [b.getApiHost(), "/finance/api?q=", h,
					g ? "&infotype=infoquoteall" : "",
					b.isNewRequest(h) ? "" : "&auto=1", "&client=ig",
					"&token=", this.Ud.token, "&synd=", this.Ud.synd, "&msh=",
					this.Ud.locked_domain, "&hl=", e, "&gl=", f];
			_IG_FetchContent(i.join(""), _IG_Callback(c, this, g), {
						refreshInterval : 5
					})
		}
	};
	function c(d, e) {
		d = "(" + d.substring(d.indexOf("[")) + ")";
		try {
			var f = eval(d);
			if (igRF_.isObject(f))
				for (var g = 0; g < f.length; ++g) {
					var h = f[g], i = h[b.TICKER];
					if (i) {
						var j = h[b.EXCHANGE];
						h[b.SYMBOL] = j ? j + ":" + i : i;
						var k = e.ke[h[b.SYMBOL]];
						k || (k = e.ke[i]);
						for (var l = 0; l < e.v.length; ++l)
							e.v[l](h, k)
					}
				}
		} catch (m) {
		}
	}
})();
igRF_f("google.finance");
(function() {
	var a = igRF_e.global.google.finance, b = {}, c = {
		query : "",
		time : 0
	};
	function d(f) {
		var g = igRF_d, h = igRF_.now();
		if (f != c.query && h - c.time > 1000) {
			c.query = f;
			c.time = h;
			g = igRF_b
		}
		return g
	}
	function e() {
		return a.host ? a.host : "http://www.google.com"
	}
	igRF_.exportSymbol("google.finance.Quote", igRF_.finance.quote.QuotePoller);
	igRF_.exportSymbol("google.finance.Quote.prototype.enableDomUpdates",
			igRF_.finance.quote.QuotePoller.prototype.$c);
	igRF_.exportSymbol("google.finance.Quote.prototype.getQuotes",
			igRF_.finance.quote.QuotePoller.prototype.vd);
	igRF_.exportSymbol("google.finance.Quote.prototype.addListener",
			igRF_.finance.quote.QuotePoller.prototype.Xb);
	igRF_.exportSymbol("google.finance.Quote.prototype.removeListener",
			igRF_.finance.quote.QuotePoller.prototype.Cc);
	igRF_.exportSymbol("google.finance.isNewRequest", d);
	igRF_.exportSymbol("google.finance.getApiHost", e);
	igRF_.exportProperty(a, "modules", b)
})();
function igFI_a(a) {
	throw a;
}
var igFI_b = true, igFI_c = null, igFI_d = false, igFI_e = window.google || {};
igFI_e.global = this;
function igFI_f(a) {
	for (var b = a.split("."), c = igFI_e.global, d; d = b.shift();)
		c = c[d] ? c[d] : (c[d] = {})
};
var igFI_ = igFI_ || {};
igFI_.global = this;
igFI_.DEBUG = igFI_b;
igFI_.LOCALE = "en_US";
igFI_.hc = igFI_c;
igFI_.provide = function(a) {
	igFI_.Pf(a)
};
igFI_.Pf = function(a, b, c) {
	var d = a.split("."), e = c || igFI_.global;
	!(d[0] in e) && e.execScript && e.execScript("var " + d[0]);
	for (var f; d.length && (f = d.shift());)
		if (!d.length && igFI_.isDef(b))
			e[f] = b;
		else
			e = e[f] ? e[f] : (e[f] = {})
};
igFI_.getObjectByName = function(a, b) {
	for (var c = a.split("."), d = b || igFI_.global, e; e = c.shift();)
		if (d[e])
			d = d[e];
		else
			return igFI_c;
	return d
};
igFI_.globalize = function(a, b) {
	var c = b || igFI_.global;
	for (var d in a)
		c[d] = a[d]
};
igFI_.addDependency = function() {
};
igFI_.require = function() {
};
igFI_.useStrictRequires = igFI_d;
igFI_.basePath = "";
igFI_.nullFunction = function() {
};
igFI_.identityFunction = function() {
	return arguments[0]
};
igFI_.abstractMethod = function() {
	igFI_a(Error("unimplemented abstract method"))
};
igFI_.addSingletonGetter = function(a) {
	a.getInstance = function() {
		return a.ji || (a.ji = new a)
	}
};
igFI_.typeOf = function(a) {
	var b = typeof a;
	if (b == "object")
		if (a) {
			if (a instanceof Array || !(a instanceof Object)
					&& Object.prototype.toString.call(a) == "[object Array]"
					|| typeof a.length == "number"
					&& typeof a.splice != "undefined"
					&& typeof a.propertyIsEnumerable != "undefined"
					&& !a.propertyIsEnumerable("splice"))
				return "array";
			if (!(a instanceof Object)
					&& (Object.prototype.toString.call(a) == "[object Function]" || typeof a.call != "undefined"
							&& typeof a.propertyIsEnumerable != "undefined"
							&& !a.propertyIsEnumerable("call")))
				return "function"
		} else
			return "null";
	else if (b == "function" && typeof a.call == "undefined")
		return "object";
	return b
};
igFI_.yi = function(a, b) {
	if (b in a)
		for (var c in a)
			if (c == b && Object.prototype.hasOwnProperty.call(a, b))
				return igFI_b;
	return igFI_d
};
igFI_.Pi = function(a, b) {
	return a instanceof Object ? Object.prototype.propertyIsEnumerable.call(a,
			b) : igFI_.yi(a, b)
};
igFI_.isDef = function(a) {
	return a !== undefined
};
igFI_.isNull = function(a) {
	return a === igFI_c
};
igFI_.isDefAndNotNull = function(a) {
	return a != igFI_c
};
igFI_.isArray = function(a) {
	return igFI_.typeOf(a) == "array"
};
igFI_.isArrayLike = function(a) {
	var b = igFI_.typeOf(a);
	return b == "array" || b == "object" && typeof a.length == "number"
};
igFI_.isDateLike = function(a) {
	return igFI_.isObject(a) && typeof a.getFullYear == "function"
};
igFI_.isString = function(a) {
	return typeof a == "string"
};
igFI_.isBoolean = function(a) {
	return typeof a == "boolean"
};
igFI_.isNumber = function(a) {
	return typeof a == "number"
};
igFI_.isFunction = function(a) {
	return igFI_.typeOf(a) == "function"
};
igFI_.isObject = function(a) {
	var b = igFI_.typeOf(a);
	return b == "object" || b == "array" || b == "function"
};
igFI_.getHashCode = function(a) {
	if (a.hasOwnProperty && a.hasOwnProperty(igFI_.Ea))
		return a[igFI_.Ea];
	a[igFI_.Ea] || (a[igFI_.Ea] = ++igFI_.gi);
	return a[igFI_.Ea]
};
igFI_.removeHashCode = function(a) {
	"removeAttribute" in a && a.removeAttribute(igFI_.Ea);
	try {
		delete a[igFI_.Ea]
	} catch (b) {
	}
};
igFI_.Ea = "closure_hashCode_"
		+ Math.floor(Math.random() * 2147483648).toString(36);
igFI_.gi = 0;
igFI_.cloneObject = function(a) {
	var b = igFI_.typeOf(a);
	if (b == "object" || b == "array") {
		if (a.clone)
			return a.clone.call(a);
		var c = b == "array" ? [] : {};
		for (var d in a)
			c[d] = igFI_.cloneObject(a[d]);
		return c
	}
	return a
};
igFI_.bind = function(a, b) {
	var c = b || igFI_.global;
	if (arguments.length > 2) {
		var d = Array.prototype.slice.call(arguments, 2);
		return function() {
			var e = Array.prototype.slice.call(arguments);
			Array.prototype.unshift.apply(e, d);
			return a.apply(c, e)
		}
	} else
		return function() {
			return a.apply(c, arguments)
		}
};
igFI_.partial = function(a) {
	var b = Array.prototype.slice.call(arguments, 1);
	return function() {
		var c = Array.prototype.slice.call(arguments);
		c.unshift.apply(c, b);
		return a.apply(this, c)
	}
};
igFI_.mixin = function(a, b) {
	for (var c in b)
		a[c] = b[c]
};
igFI_.now = Date.now || function() {
	return (new Date).getTime()
};
igFI_.globalEval = function(a) {
	if (igFI_.global.execScript)
		igFI_.global.execScript(a, "JavaScript");
	else if (igFI_.global.eval) {
		if (igFI_.hc == igFI_c) {
			igFI_.global.eval("var _et_ = 1;");
			if (typeof igFI_.global._et_ != "undefined") {
				delete igFI_.global._et_;
				igFI_.hc = igFI_b
			} else
				igFI_.hc = igFI_d
		}
		if (igFI_.hc)
			igFI_.global.eval(a);
		else {
			var b = igFI_.global.document, c = b.createElement("script");
			c.type = "text/javascript";
			c.defer = igFI_d;
			c.appendChild(b.createTextNode(a));
			b.body.appendChild(c);
			b.body.removeChild(c)
		}
	} else
		igFI_a(Error("goog.globalEval not available"))
};
igFI_.typedef = igFI_b;
igFI_.getCssName = function(a, b) {
	var c = a + (b ? "-" + b : "");
	return igFI_.fd && c in igFI_.fd ? igFI_.fd[c] : c
};
igFI_.setCssNameMapping = function(a) {
	igFI_.fd = a
};
igFI_.getMsg = function(a, b) {
	var c = b || {};
	for (var d in c)
		a = a.replace(new RegExp("\\{\\$" + d + "\\}", "gi"), c[d]);
	return a
};
igFI_.exportSymbol = function(a, b, c) {
	igFI_.Pf(a, b, c)
};
igFI_.exportProperty = function(a, b, c) {
	a[b] = c
};
igFI_.inherits = function(a, b) {
	function c() {
	}
	c.prototype = b.prototype;
	a.q = b.prototype;
	a.prototype = new c;
	a.prototype.constructor = a
};
igFI_.MODIFY_FUNCTION_PROTOTYPES = igFI_b;
if (igFI_.MODIFY_FUNCTION_PROTOTYPES) {
	Function.prototype.bind = function(a) {
		if (arguments.length > 1) {
			var b = Array.prototype.slice.call(arguments, 1);
			b.unshift(this, a);
			return igFI_.bind.apply(igFI_c, b)
		} else
			return igFI_.bind(this, a)
	};
	Function.prototype.partial = function() {
		var a = Array.prototype.slice.call(arguments);
		a.unshift(this, igFI_c);
		return igFI_.bind.apply(igFI_c, a)
	};
	Function.prototype.inherits = function(a) {
		igFI_.inherits(this, a)
	};
	Function.prototype.mixin = function(a) {
		igFI_.mixin(this.prototype, a)
	}
};
igFI_.Disposable = function() {
};
igFI_.Disposable.prototype.ld = igFI_d;
igFI_.Disposable.prototype.dispose = function() {
	if (!this.ld) {
		this.ld = igFI_b;
		this.b()
	}
};
igFI_.Disposable.prototype.b = function() {
};
igFI_.dispose = function(a) {
	a && typeof a.dispose == "function" && a.dispose()
};
igFI_.array = {};
igFI_.array.ArrayLike = igFI_.typedef;
igFI_.array.peek = function(a) {
	return a[a.length - 1]
};
igFI_.array.indexOf = function(a, b, c) {
	if (a.indexOf)
		return a.indexOf(b, c);
	if (Array.indexOf)
		return Array.indexOf(a, b, c);
	for (var d = c == igFI_c ? 0 : c < 0 ? Math.max(0, a.length + c) : c, e = d; e < a.length; e++)
		if (e in a && a[e] === b)
			return e;
	return -1
};
igFI_.array.lastIndexOf = function(a, b, c) {
	var d = c == igFI_c ? a.length - 1 : c;
	if (a.lastIndexOf)
		return a.lastIndexOf(b, d);
	if (Array.lastIndexOf)
		return Array.lastIndexOf(a, b, d);
	if (d < 0)
		d = Math.max(0, a.length + d);
	for (var e = d; e >= 0; e--)
		if (e in a && a[e] === b)
			return e;
	return -1
};
igFI_.array.forEach = function(a, b, c) {
	if (a.forEach)
		a.forEach(b, c);
	else if (Array.forEach)
		Array.forEach(a, b, c);
	else
		for (var d = a.length, e = igFI_.isString(a) ? a.split("") : a, f = 0; f < d; f++)
			f in e && b.call(c, e[f], f, a)
};
igFI_.array.forEachRight = function(a, b, c) {
	for (var d = a.length, e = igFI_.isString(a) ? a.split("") : a, f = d - 1; f >= 0; --f)
		f in e && b.call(c, e[f], f, a)
};
igFI_.array.filter = function(a, b, c) {
	if (a.filter)
		return a.filter(b, c);
	if (Array.filter)
		return Array.filter(a, b, c);
	for (var d = a.length, e = [], f = 0, g = igFI_.isString(a)
			? a.split("")
			: a, h = 0; h < d; h++)
		if (h in g) {
			var i = g[h];
			if (b.call(c, i, h, a))
				e[f++] = i
		}
	return e
};
igFI_.array.map = function(a, b, c) {
	if (a.map)
		return a.map(b, c);
	if (Array.map)
		return Array.map(a, b, c);
	for (var d = a.length, e = [], f = 0, g = igFI_.isString(a)
			? a.split("")
			: a, h = 0; h < d; h++)
		if (h in g)
			e[f++] = b.call(c, g[h], h, a);
	return e
};
igFI_.array.reduce = function(a, b, c, d) {
	if (a.reduce)
		return d ? a.reduce(igFI_.bind(b, d), c) : a.reduce(b, c);
	var e = c;
	igFI_.array.forEach(a, function(f, g) {
				e = b.call(d, e, f, g, a)
			});
	return e
};
igFI_.array.reduceRight = function(a, b, c, d) {
	if (a.reduceRight)
		return d ? a.reduceRight(igFI_.bind(b, d), c) : a.reduceRight(b, c);
	var e = c;
	igFI_.array.forEachRight(a, function(f, g) {
				e = b.call(d, e, f, g, a)
			});
	return e
};
igFI_.array.some = function(a, b, c) {
	if (a.some)
		return a.some(b, c);
	if (Array.some)
		return Array.some(a, b, c);
	for (var d = a.length, e = igFI_.isString(a) ? a.split("") : a, f = 0; f < d; f++)
		if (f in e && b.call(c, e[f], f, a))
			return igFI_b;
	return igFI_d
};
igFI_.array.every = function(a, b, c) {
	if (a.every)
		return a.every(b, c);
	if (Array.every)
		return Array.every(a, b, c);
	for (var d = a.length, e = igFI_.isString(a) ? a.split("") : a, f = 0; f < d; f++)
		if (f in e && !b.call(c, e[f], f, a))
			return igFI_d;
	return igFI_b
};
igFI_.array.find = function(a, b, c) {
	var d = igFI_.array.findIndex(a, b, c);
	return d < 0 ? igFI_c : igFI_.isString(a) ? a.charAt(d) : a[d]
};
igFI_.array.findIndex = function(a, b, c) {
	for (var d = a.length, e = igFI_.isString(a) ? a.split("") : a, f = 0; f < d; f++)
		if (f in e && b.call(c, e[f], f, a))
			return f;
	return -1
};
igFI_.array.findRight = function(a, b, c) {
	var d = igFI_.array.findIndexRight(a, b, c);
	return d < 0 ? igFI_c : igFI_.isString(a) ? a.charAt(d) : a[d]
};
igFI_.array.findIndexRight = function(a, b, c) {
	for (var d = a.length, e = igFI_.isString(a) ? a.split("") : a, f = d - 1; f >= 0; f--)
		if (f in e && b.call(c, e[f], f, a))
			return f;
	return -1
};
igFI_.array.contains = function(a, b) {
	if (a.contains)
		return a.contains(b);
	return igFI_.array.indexOf(a, b) > -1
};
igFI_.array.u = function(a) {
	return a.length == 0
};
igFI_.array.clear = function(a) {
	if (!igFI_.isArray(a))
		for (var b = a.length - 1; b >= 0; b--)
			delete a[b];
	a.length = 0
};
igFI_.array.insert = function(a, b) {
	igFI_.array.contains(a, b) || a.push(b)
};
igFI_.array.insertAt = function(a, b, c) {
	igFI_.array.splice(a, c, 0, b)
};
igFI_.array.insertArrayAt = function(a, b, c) {
	igFI_.partial(igFI_.array.splice, a, c, 0).apply(igFI_c, b)
};
igFI_.array.insertBefore = function(a, b, c) {
	var d;
	arguments.length == 2 || (d = igFI_.array.indexOf(a, c)) == -1
			? a.push(b)
			: igFI_.array.insertAt(a, b, d)
};
igFI_.array.remove = function(a, b) {
	var c = igFI_.array.indexOf(a, b), d;
	if (d = c != -1)
		igFI_.array.removeAt(a, c);
	return d
};
igFI_.array.removeAt = function(a, b) {
	return Array.prototype.splice.call(a, b, 1).length == 1
};
igFI_.array.removeIf = function(a, b, c) {
	var d = igFI_.array.findIndex(a, b, c);
	if (d >= 0) {
		igFI_.array.removeAt(a, d);
		return igFI_b
	}
	return igFI_d
};
igFI_.array.clone = function(a) {
	if (igFI_.isArray(a))
		return a.concat();
	else {
		for (var b = [], c = 0, d = a.length; c < d; c++)
			b[c] = a[c];
		return b
	}
};
igFI_.array.toArray = function(a) {
	if (igFI_.isArray(a))
		return a.concat();
	return igFI_.array.clone(a)
};
igFI_.array.extend = function(a) {
	for (var b = 1; b < arguments.length; b++) {
		var c = arguments[b];
		if (igFI_.isArrayLike(c)) {
			c = igFI_.array.toArray(c);
			a.push.apply(a, c)
		} else
			a.push(c)
	}
};
igFI_.array.splice = function(a) {
	return Array.prototype.splice.apply(a, igFI_.array.slice(arguments, 1))
};
igFI_.array.slice = function(a, b, c) {
	return arguments.length <= 2
			? Array.prototype.slice.call(a, b)
			: Array.prototype.slice.call(a, b, c)
};
igFI_.array.removeDuplicates = function(a, b) {
	for (var c = b || a, d = {}, e = 0, f = 0; f < a.length;) {
		var g = a[f++], h = igFI_.isObject(g) ? igFI_.getHashCode(g) : g;
		if (!Object.prototype.hasOwnProperty.call(d, h)) {
			d[h] = igFI_b;
			c[e++] = g
		}
	}
	c.length = e
};
igFI_.array.binarySearch = function(a, b, c) {
	for (var d = 0, e = a.length - 1, f = c || igFI_.array.defaultCompare; d <= e;) {
		var g = d + e >> 1, h = f(b, a[g]);
		if (h > 0)
			d = g + 1;
		else if (h < 0)
			e = g - 1;
		else
			return g
	}
	return -(d + 1)
};
igFI_.array.sort = function(a, b) {
	Array.prototype.sort.call(a, b || igFI_.array.defaultCompare)
};
igFI_.array.stableSort = function(a, b) {
	for (var c = 0; c < a.length; c++)
		a[c] = {
			index : c,
			value : a[c]
		};
	var d = b || igFI_.array.defaultCompare;
	function e(f, g) {
		return d(f.value, g.value) || f.index - g.index
	}
	igFI_.array.sort(a, e);
	for (c = 0; c < a.length; c++)
		a[c] = a[c].value
};
igFI_.array.sortObjectsByKey = function(a, b, c) {
	var d = c || igFI_.array.defaultCompare;
	igFI_.array.sort(a, function(e, f) {
				return d(e[b], f[b])
			})
};
igFI_.array.equals = function(a, b, c) {
	if (!igFI_.isArrayLike(a) || !igFI_.isArrayLike(b) || a.length != b.length)
		return igFI_d;
	for (var d = a.length, e = c || igFI_.array.defaultCompareEquality, f = 0; f < d; f++)
		if (!e(a[f], b[f]))
			return igFI_d;
	return igFI_b
};
igFI_.array.compare = function(a, b, c) {
	return igFI_.array.equals(a, b, c)
};
igFI_.array.defaultCompare = function(a, b) {
	return a > b ? 1 : a < b ? -1 : 0
};
igFI_.array.defaultCompareEquality = function(a, b) {
	return a === b
};
igFI_.array.binaryInsert = function(a, b, c) {
	var d = igFI_.array.binarySearch(a, b, c);
	if (d < 0) {
		igFI_.array.insertAt(a, b, -(d + 1));
		return igFI_b
	}
	return igFI_d
};
igFI_.array.binaryRemove = function(a, b, c) {
	var d = igFI_.array.binarySearch(a, b, c);
	return d >= 0 ? igFI_.array.removeAt(a, d) : igFI_d
};
igFI_.array.bucket = function(a, b) {
	for (var c = {}, d = 0; d < a.length; d++) {
		var e = a[d], f = b(e, d, a);
		if (igFI_.isDef(f)) {
			var g = c[f] || (c[f] = []);
			g.push(e)
		}
	}
	return c
};
igFI_.array.repeat = function(a, b) {
	for (var c = [], d = 0; d < b; d++)
		c[d] = a;
	return c
};
igFI_.array.flatten = function() {
	for (var a = [], b = 0; b < arguments.length; b++) {
		var c = arguments[b];
		igFI_.isArray(c) ? a.push
				.apply(a, igFI_.array.flatten.apply(igFI_c, c)) : a.push(c)
	}
	return a
};
igFI_.array.rotate = function(a, b) {
	if (a.length) {
		b %= a.length;
		if (b > 0)
			Array.prototype.unshift.apply(a, a.splice(-b, b));
		else
			b < 0 && Array.prototype.push.apply(a, a.splice(0, -b))
	}
	return a
};
igFI_.debug = {};
igFI_.debug.errorHandlerWeakDep = {
	protectEntryPoint : function(a) {
		return a
	}
};
igFI_.object = {};
igFI_.object.forEach = function(a, b, c) {
	for (var d in a)
		b.call(c, a[d], d, a)
};
igFI_.object.filter = function(a, b, c) {
	var d = {};
	for (var e in a)
		if (b.call(c, a[e], e, a))
			d[e] = a[e];
	return d
};
igFI_.object.map = function(a, b, c) {
	var d = {};
	for (var e in a)
		d[e] = b.call(c, a[e], e, a);
	return d
};
igFI_.object.some = function(a, b, c) {
	for (var d in a)
		if (b.call(c, a[d], d, a))
			return igFI_b;
	return igFI_d
};
igFI_.object.every = function(a, b, c) {
	for (var d in a)
		if (!b.call(c, a[d], d, a))
			return igFI_d;
	return igFI_b
};
igFI_.object.T = function(a) {
	var b = 0;
	for (var c in a)
		b++;
	return b
};
igFI_.object.getAnyKey = function(a) {
	for (var b in a)
		return b
};
igFI_.object.getAnyValue = function(a) {
	for (var b in a)
		return a[b]
};
igFI_.object.contains = function(a, b) {
	return igFI_.object.ja(a, b)
};
igFI_.object.k = function(a) {
	var b = [], c = 0;
	for (var d in a)
		b[c++] = a[d];
	return b
};
igFI_.object.j = function(a) {
	var b = [], c = 0;
	for (var d in a)
		b[c++] = d;
	return b
};
igFI_.object.C = function(a, b) {
	return b in a
};
igFI_.object.ja = function(a, b) {
	for (var c in a)
		if (a[c] == b)
			return igFI_b;
	return igFI_d
};
igFI_.object.findKey = function(a, b, c) {
	for (var d in a)
		if (b.call(c, a[d], d, a))
			return d;
	return undefined
};
igFI_.object.findValue = function(a, b, c) {
	var d = igFI_.object.findKey(a, b, c);
	return d && a[d]
};
igFI_.object.u = function(a) {
	for (var b in a)
		return igFI_d;
	return igFI_b
};
igFI_.object.clear = function(a) {
	for (var b = igFI_.object.j(a), c = b.length - 1; c >= 0; c--)
		igFI_.object.remove(a, b[c])
};
igFI_.object.remove = function(a, b) {
	var c;
	if (c = b in a)
		delete a[b];
	return c
};
igFI_.object.add = function(a, b, c) {
	if (b in a)
		igFI_a(Error('The object already contains the key "' + b + '"'));
	igFI_.object.set(a, b, c)
};
igFI_.object.get = function(a, b, c) {
	if (b in a)
		return a[b];
	return c
};
igFI_.object.set = function(a, b, c) {
	a[b] = c
};
igFI_.object.setIfUndefined = function(a, b, c) {
	return b in a ? a[b] : (a[b] = c)
};
igFI_.object.clone = function(a) {
	var b = {};
	for (var c in a)
		b[c] = a[c];
	return b
};
igFI_.object.transpose = function(a) {
	var b = {};
	for (var c in a)
		b[a[c]] = c;
	return b
};
igFI_.object.bf = ["constructor", "hasOwnProperty", "isPrototypeOf",
		"propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
igFI_.object.extend = function(a) {
	for (var b, c, d = 1; d < arguments.length; d++) {
		c = arguments[d];
		for (b in c)
			a[b] = c[b];
		for (var e = 0; e < igFI_.object.bf.length; e++) {
			b = igFI_.object.bf[e];
			if (Object.prototype.hasOwnProperty.call(c, b))
				a[b] = c[b]
		}
	}
};
igFI_.object.create = function() {
	var a = arguments.length;
	if (a == 1 && igFI_.isArray(arguments[0]))
		return igFI_.object.create.apply(igFI_c, arguments[0]);
	if (a % 2)
		igFI_a(Error("Uneven number of arguments"));
	for (var b = {}, c = 0; c < a; c += 2)
		b[arguments[c]] = arguments[c + 1];
	return b
};
igFI_.object.createSet = function() {
	var a = arguments.length;
	if (a == 1 && igFI_.isArray(arguments[0]))
		return igFI_.object.createSet.apply(igFI_c, arguments[0]);
	for (var b = {}, c = 0; c < a; c++)
		b[arguments[c]] = igFI_b;
	return b
};
igFI_.string = {};
igFI_.string.Unicode = {
	NBSP : "\u00a0"
};
igFI_.string.startsWith = function(a, b) {
	return a.indexOf(b) == 0
};
igFI_.string.endsWith = function(a, b) {
	var c = a.length - b.length;
	return c >= 0 && a.lastIndexOf(b, c) == c
};
igFI_.string.caseInsensitiveStartsWith = function(a, b) {
	return igFI_.string.caseInsensitiveCompare(b, a.substr(0, b.length)) == 0
};
igFI_.string.caseInsensitiveEndsWith = function(a, b) {
	return igFI_.string.caseInsensitiveCompare(b, a.substr(a.length - b.length,
					b.length)) == 0
};
igFI_.string.subs = function(a) {
	for (var b = 1; b < arguments.length; b++) {
		var c = String(arguments[b]).replace(/\$/g, "$$$$");
		a = a.replace(/\%s/, c)
	}
	return a
};
igFI_.string.collapseWhitespace = function(a) {
	return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
igFI_.string.u = function(a) {
	return /^[\s\xa0]*$/.test(a)
};
igFI_.string.isEmptySafe = function(a) {
	return igFI_.string.u(igFI_.string.makeSafe(a))
};
igFI_.string.isBreakingWhitespace = function(a) {
	return !/[^\t\n\r ]/.test(a)
};
igFI_.string.isAlpha = function(a) {
	return !/[^a-zA-Z]/.test(a)
};
igFI_.string.isNumeric = function(a) {
	return !/[^0-9]/.test(a)
};
igFI_.string.isAlphaNumeric = function(a) {
	return !/[^a-zA-Z0-9]/.test(a)
};
igFI_.string.isSpace = function(a) {
	return a == " "
};
igFI_.string.isUnicodeChar = function(a) {
	return a.length == 1 && a >= " " && a <= "~" || a >= "\u0080"
			&& a <= "\ufffd"
};
igFI_.string.stripNewlines = function(a) {
	return a.replace(/(\r\n|\r|\n)+/g, " ")
};
igFI_.string.canonicalizeNewlines = function(a) {
	return a.replace(/(\r\n|\r|\n)/g, "\n")
};
igFI_.string.normalizeWhitespace = function(a) {
	return a.replace(/\xa0|\s/g, " ")
};
igFI_.string.normalizeSpaces = function(a) {
	return a.replace(/\xa0|[ \t]+/g, " ")
};
igFI_.string.trim = function(a) {
	return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
igFI_.string.trimLeft = function(a) {
	return a.replace(/^[\s\xa0]+/, "")
};
igFI_.string.trimRight = function(a) {
	return a.replace(/[\s\xa0]+$/, "")
};
igFI_.string.caseInsensitiveCompare = function(a, b) {
	var c = String(a).toLowerCase(), d = String(b).toLowerCase();
	return c < d ? -1 : c == d ? 0 : 1
};
igFI_.string.Wg = /(\.\d+)|(\d+)|(\D+)/g;
igFI_.string.numerateCompare = function(a, b) {
	if (a == b)
		return 0;
	if (!a)
		return -1;
	if (!b)
		return 1;
	for (var c = a.toLowerCase().match(igFI_.string.Wg), d = b.toLowerCase()
			.match(igFI_.string.Wg), e = Math.min(c.length, d.length), f = 0; f < e; f++) {
		var g = c[f], h = d[f];
		if (g != h) {
			var i = parseInt(g, 10);
			if (!isNaN(i)) {
				var j = parseInt(h, 10);
				if (!isNaN(j) && i - j)
					return i - j
			}
			return g < h ? -1 : 1
		}
	}
	if (c.length != d.length)
		return c.length - d.length;
	return a < b ? -1 : 1
};
igFI_.string.ei = /^[a-zA-Z0-9\-_.!~*'()]*$/;
igFI_.string.urlEncode = function(a) {
	a = String(a);
	if (!igFI_.string.ei.test(a))
		return encodeURIComponent(a);
	return a
};
igFI_.string.urlDecode = function(a) {
	return decodeURIComponent(a.replace(/\+/g, " "))
};
igFI_.string.newLineToBr = function(a, b) {
	return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
igFI_.string.htmlEscape = function(a, b) {
	if (b)
		return a.replace(igFI_.string.lf, "&amp;").replace(igFI_.string.Lg,
				"&lt;").replace(igFI_.string.ng, "&gt;").replace(
				igFI_.string.hh, "&quot;");
	else {
		if (!igFI_.string.Qh.test(a))
			return a;
		if (a.indexOf("&") != -1)
			a = a.replace(igFI_.string.lf, "&amp;");
		if (a.indexOf("<") != -1)
			a = a.replace(igFI_.string.Lg, "&lt;");
		if (a.indexOf(">") != -1)
			a = a.replace(igFI_.string.ng, "&gt;");
		if (a.indexOf('"') != -1)
			a = a.replace(igFI_.string.hh, "&quot;");
		return a
	}
};
igFI_.string.lf = /&/g;
igFI_.string.Lg = /</g;
igFI_.string.ng = />/g;
igFI_.string.hh = /\"/g;
igFI_.string.Qh = /[&<>\"]/;
igFI_.string.unescapeEntities = function(a) {
	if (igFI_.string.contains(a, "&"))
		return "document" in igFI_.global && !igFI_.string.contains(a, "<")
				? igFI_.string.Gi(a)
				: igFI_.string.Hi(a);
	return a
};
igFI_.string.Gi = function(a) {
	var b = igFI_.global.document.createElement("a");
	b.innerHTML = a;
	b[igFI_.string.af] && b[igFI_.string.af]();
	a = b.firstChild.nodeValue;
	b.innerHTML = "";
	return a
};
igFI_.string.Hi = function(a) {
	return a.replace(/&([^;]+);/g, function(b, c) {
				switch (c) {
					case "amp" :
						return "&";
					case "lt" :
						return "<";
					case "gt" :
						return ">";
					case "quot" :
						return '"';
					default :
						if (c.charAt(0) == "#") {
							var d = Number("0" + c.substr(1));
							if (!isNaN(d))
								return String.fromCharCode(d)
						}
						return b
				}
			})
};
igFI_.string.af = "normalize";
igFI_.string.whitespaceEscape = function(a, b) {
	return igFI_.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
igFI_.string.stripQuotes = function(a, b) {
	for (var c = b.length, d = 0; d < c; d++) {
		var e = c == 1 ? b : b.charAt(d);
		if (a.charAt(0) == e && a.charAt(a.length - 1) == e)
			return a.substring(1, a.length - 1)
	}
	return a
};
igFI_.string.truncate = function(a, b, c) {
	if (c)
		a = igFI_.string.unescapeEntities(a);
	if (a.length > b)
		a = a.substring(0, b - 3) + "...";
	if (c)
		a = igFI_.string.htmlEscape(a);
	return a
};
igFI_.string.truncateMiddle = function(a, b, c) {
	if (c)
		a = igFI_.string.unescapeEntities(a);
	if (a.length > b) {
		var d = Math.floor(b / 2), e = a.length - d;
		d += b % 2;
		a = a.substring(0, d) + "..." + a.substring(e)
	}
	if (c)
		a = igFI_.string.htmlEscape(a);
	return a
};
igFI_.string.ce = {
	"\u0008" : "\\b",
	"\u000c" : "\\f",
	"\n" : "\\n",
	"\r" : "\\r",
	"\t" : "\\t",
	"\u000b" : "\\x0B",
	'"' : '\\"',
	"'" : "\\'",
	"\\" : "\\\\"
};
igFI_.string.quote = function(a) {
	a = String(a);
	if (a.quote)
		return a.quote();
	else {
		for (var b = ['"'], c = 0; c < a.length; c++)
			b[c + 1] = igFI_.string.escapeChar(a.charAt(c));
		b.push('"');
		return b.join("")
	}
};
igFI_.string.escapeChar = function(a) {
	if (a in igFI_.string.ce)
		return igFI_.string.ce[a];
	var b = a, c = a.charCodeAt(0);
	if (c > 31 && c < 127)
		b = a;
	else {
		if (c < 256) {
			b = "\\x";
			if (c < 16 || c > 256)
				b += "0"
		} else {
			b = "\\u";
			if (c < 4096)
				b += "0"
		}
		b += c.toString(16).toUpperCase()
	}
	return igFI_.string.ce[a] = b
};
igFI_.string.toMap = function(a) {
	for (var b = {}, c = 0; c < a.length; c++)
		b[a.charAt(c)] = igFI_b;
	return b
};
igFI_.string.contains = function(a, b) {
	return a.indexOf(b) != -1
};
igFI_.string.removeAt = function(a, b, c) {
	var d = a;
	if (b >= 0 && b < a.length && c > 0)
		d = a.substr(0, b) + a.substr(b + c, a.length - b - c);
	return d
};
igFI_.string.remove = function(a, b) {
	var c = new RegExp(igFI_.string.regExpEscape(b), "");
	return a.replace(c, "")
};
igFI_.string.Ta = function(a, b) {
	var c = new RegExp(igFI_.string.regExpEscape(b), "g");
	return a.replace(c, "")
};
igFI_.string.regExpEscape = function(a) {
	return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(
			/\x08/g, "\\x08")
};
igFI_.string.repeat = function(a, b) {
	return (new Array(b + 1)).join(a)
};
igFI_.string.padNumber = function(a, b, c) {
	var d = igFI_.isDef(c) ? a.toFixed(c) : String(a), e = d.indexOf(".");
	if (e == -1)
		e = d.length;
	return igFI_.string.repeat("0", Math.max(0, b - e)) + d
};
igFI_.string.makeSafe = function(a) {
	return a == igFI_c ? "" : String(a)
};
igFI_.string.buildString = function() {
	return Array.prototype.join.call(arguments, "")
};
igFI_.string.getRandomString = function() {
	return Math.floor(Math.random() * 2147483648).toString(36)
			+ (Math.floor(Math.random() * 2147483648) ^ (new Date).getTime())
					.toString(36)
};
igFI_.string.compareVersions = function(a, b) {
	for (var c = 0, d = igFI_.string.trim(String(a)).split("."), e = igFI_.string
			.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; c == 0
			&& g < f; g++) {
		var h = d[g] || "", i = e[g] || "", j = new RegExp("(\\d*)(\\D*)", "g"), k = new RegExp(
				"(\\d*)(\\D*)", "g");
		do {
			var n = j.exec(h) || ["", "", ""], q = k.exec(i) || ["", "", ""];
			if (n[0].length == 0 && q[0].length == 0)
				break;
			var p = n[1].length == 0 ? 0 : parseInt(n[1], 10), u = q[1].length == 0
					? 0
					: parseInt(q[1], 10);
			c = igFI_.string.cd(p, u)
					|| igFI_.string.cd(n[2].length == 0, q[2].length == 0)
					|| igFI_.string.cd(n[2], q[2])
		} while (c == 0)
	}
	return c
};
igFI_.string.cd = function(a, b) {
	if (a < b)
		return -1;
	else if (a > b)
		return 1;
	return 0
};
igFI_.string.Nh = 4294967296;
igFI_.string.hashCode = function(a) {
	for (var b = 0, c = 0; c < a.length; ++c) {
		b = 31 * b + a.charCodeAt(c);
		b %= igFI_.string.Nh
	}
	return b
};
igFI_.string.Ji = igFI_.now();
igFI_.string.createUniqueString = function() {
	return "goog_" + igFI_.string.Ji++
};
igFI_.string.toNumber = function(a) {
	var b = Number(a);
	if (b == 0 && igFI_.string.u(a))
		return NaN;
	return b
};
igFI_.userAgent = {};
igFI_.userAgent.ASSUME_IE = igFI_d;
igFI_.userAgent.ASSUME_GECKO = igFI_d;
igFI_.userAgent.ASSUME_CAMINO = igFI_d;
igFI_.userAgent.ASSUME_WEBKIT = igFI_d;
igFI_.userAgent.ASSUME_MOBILE_WEBKIT = igFI_d;
igFI_.userAgent.ASSUME_OPERA = igFI_d;
igFI_.userAgent.Da = igFI_.userAgent.ASSUME_IE || igFI_.userAgent.ASSUME_GECKO
		|| igFI_.userAgent.ASSUME_CAMINO
		|| igFI_.userAgent.ASSUME_MOBILE_WEBKIT
		|| igFI_.userAgent.ASSUME_WEBKIT || igFI_.userAgent.ASSUME_OPERA;
igFI_.userAgent.getUserAgentString = function() {
	return igFI_.global.navigator ? igFI_.global.navigator.userAgent : igFI_c
};
igFI_.userAgent.getNavigator = function() {
	return igFI_.global.navigator
};
igFI_.userAgent.Eb = function() {
	igFI_.userAgent.vb = igFI_d;
	igFI_.userAgent.If = igFI_d;
	igFI_.userAgent.fc = igFI_d;
	igFI_.userAgent.Kf = igFI_d;
	igFI_.userAgent.hd = igFI_d;
	igFI_.userAgent.ub = igFI_d;
	var a;
	if (!igFI_.userAgent.Da && (a = igFI_.userAgent.getUserAgentString())) {
		var b = igFI_.userAgent.getNavigator();
		igFI_.userAgent.vb = a.indexOf("Opera") == 0;
		igFI_.userAgent.If = !igFI_.userAgent.vb && a.indexOf("MSIE") != -1;
		igFI_.userAgent.fc = !igFI_.userAgent.vb && a.indexOf("WebKit") != -1;
		igFI_.userAgent.Kf = igFI_.userAgent.fc && a.indexOf("Mobile") != -1;
		igFI_.userAgent.hd = !igFI_.userAgent.vb && !igFI_.userAgent.fc
				&& b.product == "Gecko";
		igFI_.userAgent.ub = igFI_.userAgent.hd && b.vendor == "Camino"
	}
};
igFI_.userAgent.Da || igFI_.userAgent.Eb();
igFI_.userAgent.OPERA = igFI_.userAgent.Da
		? igFI_.userAgent.ASSUME_OPERA
		: igFI_.userAgent.vb;
igFI_.userAgent.IE = igFI_.userAgent.Da
		? igFI_.userAgent.ASSUME_IE
		: igFI_.userAgent.If;
igFI_.userAgent.GECKO = igFI_.userAgent.Da ? igFI_.userAgent.ASSUME_GECKO
		|| igFI_.userAgent.ASSUME_CAMINO : igFI_.userAgent.hd;
igFI_.userAgent.CAMINO = igFI_.userAgent.Da
		? igFI_.userAgent.ASSUME_CAMINO
		: igFI_.userAgent.ub;
igFI_.userAgent.WEBKIT = igFI_.userAgent.Da ? igFI_.userAgent.ASSUME_WEBKIT
		|| igFI_.userAgent.ASSUME_MOBILE_WEBKIT : igFI_.userAgent.fc;
igFI_.userAgent.MOBILE = igFI_.userAgent.ASSUME_MOBILE_WEBKIT
		|| igFI_.userAgent.Kf;
igFI_.userAgent.SAFARI = igFI_.userAgent.WEBKIT;
igFI_.userAgent.Zh = function() {
	var a = igFI_.userAgent.getNavigator();
	return a && a.platform || ""
};
igFI_.userAgent.PLATFORM = igFI_.userAgent.Zh();
igFI_.userAgent.ASSUME_MAC = igFI_d;
igFI_.userAgent.ASSUME_WINDOWS = igFI_d;
igFI_.userAgent.ASSUME_LINUX = igFI_d;
igFI_.userAgent.ASSUME_X11 = igFI_d;
igFI_.userAgent.rb = igFI_.userAgent.ASSUME_MAC
		|| igFI_.userAgent.ASSUME_WINDOWS || igFI_.userAgent.ASSUME_LINUX
		|| igFI_.userAgent.ASSUME_X11;
igFI_.userAgent.ii = function() {
	igFI_.userAgent.Wh = igFI_.string.contains(igFI_.userAgent.PLATFORM, "Mac");
	igFI_.userAgent.Xh = igFI_.string.contains(igFI_.userAgent.PLATFORM, "Win");
	igFI_.userAgent.Vh = igFI_.string.contains(igFI_.userAgent.PLATFORM,
			"Linux");
	igFI_.userAgent.Yh = !!igFI_.userAgent.getNavigator()
			&& igFI_.string.contains(igFI_.userAgent.getNavigator().appVersion
							|| "", "X11")
};
igFI_.userAgent.rb || igFI_.userAgent.ii();
igFI_.userAgent.MAC = igFI_.userAgent.rb
		? igFI_.userAgent.ASSUME_MAC
		: igFI_.userAgent.Wh;
igFI_.userAgent.WINDOWS = igFI_.userAgent.rb
		? igFI_.userAgent.ASSUME_WINDOWS
		: igFI_.userAgent.Xh;
igFI_.userAgent.LINUX = igFI_.userAgent.rb
		? igFI_.userAgent.ASSUME_LINUX
		: igFI_.userAgent.Vh;
igFI_.userAgent.X11 = igFI_.userAgent.rb
		? igFI_.userAgent.ASSUME_X11
		: igFI_.userAgent.Yh;
igFI_.userAgent.$h = function() {
	var a = "", b;
	if (igFI_.userAgent.OPERA && igFI_.global.opera) {
		var c = igFI_.global.opera.version;
		a = typeof c == "function" ? c() : c
	} else {
		if (igFI_.userAgent.GECKO)
			b = /rv\:([^\);]+)(\)|;)/;
		else if (igFI_.userAgent.IE)
			b = /MSIE\s+([^\);]+)(\)|;)/;
		else if (igFI_.userAgent.WEBKIT)
			b = /WebKit\/(\S+)/;
		if (b) {
			var d = b.exec(igFI_.userAgent.getUserAgentString());
			a = d ? d[1] : ""
		}
	}
	return a
};
igFI_.userAgent.VERSION = igFI_.userAgent.$h();
igFI_.userAgent.compare = function(a, b) {
	return igFI_.string.compareVersions(a, b)
};
igFI_.userAgent.Hg = {};
igFI_.userAgent.isVersion = function(a) {
	return igFI_.userAgent.Hg[a]
			|| (igFI_.userAgent.Hg[a] = igFI_.string.compareVersions(
					igFI_.userAgent.VERSION, a) >= 0)
};
igFI_.events = {};
igFI_.events.Event = function(a, b) {
	igFI_.Disposable.call(this);
	this.type = a;
	this.currentTarget = this.target = b
};
igFI_.inherits(igFI_.events.Event, igFI_.Disposable);
igFI_.events.Event.prototype.b = function() {
	delete this.type;
	delete this.target;
	delete this.currentTarget
};
igFI_.events.Event.prototype.ta = igFI_d;
igFI_.events.Event.prototype.Ua = igFI_b;
igFI_.events.Event.prototype.stopPropagation = function() {
	this.ta = igFI_b
};
igFI_.events.Event.prototype.preventDefault = function() {
	this.Ua = igFI_d
};
igFI_.events.BrowserEvent = function(a, b) {
	a && this.init(a, b)
};
igFI_.inherits(igFI_.events.BrowserEvent, igFI_.events.Event);
igFI_.events.BrowserEvent.MouseButton = {
	LEFT : 0,
	MIDDLE : 1,
	RIGHT : 2
};
igFI_.events.BrowserEvent.Oh = [1, 4, 2];
igFI_.events.BrowserEvent.prototype.type = igFI_c;
igFI_.events.BrowserEvent.prototype.target = igFI_c;
igFI_.events.BrowserEvent.prototype.relatedTarget = igFI_c;
igFI_.events.BrowserEvent.prototype.offsetX = 0;
igFI_.events.BrowserEvent.prototype.offsetY = 0;
igFI_.events.BrowserEvent.prototype.clientX = 0;
igFI_.events.BrowserEvent.prototype.clientY = 0;
igFI_.events.BrowserEvent.prototype.screenX = 0;
igFI_.events.BrowserEvent.prototype.screenY = 0;
igFI_.events.BrowserEvent.prototype.button = 0;
igFI_.events.BrowserEvent.prototype.keyCode = 0;
igFI_.events.BrowserEvent.prototype.charCode = 0;
igFI_.events.BrowserEvent.prototype.ctrlKey = igFI_d;
igFI_.events.BrowserEvent.prototype.altKey = igFI_d;
igFI_.events.BrowserEvent.prototype.shiftKey = igFI_d;
igFI_.events.BrowserEvent.prototype.metaKey = igFI_d;
igFI_.events.BrowserEvent.prototype.R = igFI_c;
igFI_.events.BrowserEvent.prototype.init = function(a, b) {
	this.type = a.type;
	this.target = a.target || a.srcElement;
	this.currentTarget = b;
	this.relatedTarget = a.relatedTarget
			? a.relatedTarget
			: this.type == "mouseover"
					? a.fromElement
					: this.type == "mouseout" ? a.toElement : igFI_c;
	this.offsetX = typeof a.layerX == "number" ? a.layerX : a.offsetX;
	this.offsetY = typeof a.layerY == "number" ? a.layerY : a.offsetY;
	this.clientX = typeof a.clientX == "number" ? a.clientX : a.pageX;
	this.clientY = typeof a.clientY == "number" ? a.clientY : a.pageY;
	this.screenX = a.screenX || 0;
	this.screenY = a.screenY || 0;
	this.button = a.button;
	this.keyCode = a.keyCode || 0;
	this.charCode = a.charCode || (this.type == "keypress" ? a.keyCode : 0);
	this.ctrlKey = a.ctrlKey;
	this.altKey = a.altKey;
	this.shiftKey = a.shiftKey;
	this.metaKey = a.metaKey;
	this.R = a;
	delete this.Ua;
	delete this.ta
};
igFI_.events.BrowserEvent.prototype.Bg = function(a) {
	return igFI_.userAgent.IE
			? this.type == "click"
					? a == igFI_.events.BrowserEvent.MouseButton.LEFT
					: !!(this.R.button & igFI_.events.BrowserEvent.Oh[a])
			: this.R.button == a
};
igFI_.events.BrowserEvent.prototype.stopPropagation = function() {
	this.ta = igFI_b;
	if (this.R.stopPropagation)
		this.R.stopPropagation();
	else
		this.R.cancelBubble = igFI_b
};
igFI_.events.BrowserEvent.prototype.preventDefault = function() {
	this.Ua = igFI_d;
	if (this.R.preventDefault)
		this.R.preventDefault();
	else {
		this.R.returnValue = igFI_d;
		try {
			this.R.keyCode = -1
		} catch (a) {
		}
	}
};
igFI_.events.BrowserEvent.prototype.b = function() {
	igFI_.events.BrowserEvent.q.b.call(this);
	this.R = igFI_c
};
igFI_.events.EventWrapper = function() {
};
igFI_.events.EventWrapper.prototype.listen = function() {
};
igFI_.events.EventWrapper.prototype.unlisten = function() {
};
igFI_.structs = {};
igFI_.structs.SimplePool = function(a, b) {
	igFI_.Disposable.call(this);
	this.Ng = b;
	this.La = [];
	this.Bf(a)
};
igFI_.inherits(igFI_.structs.SimplePool, igFI_.Disposable);
igFI_.structs.SimplePool.prototype.cc = igFI_c;
igFI_.structs.SimplePool.prototype.kd = igFI_c;
igFI_.structs.SimplePool.prototype.ob = function(a) {
	this.cc = a
};
igFI_.structs.SimplePool.prototype.Y = function() {
	if (this.La.length)
		return this.La.pop();
	return this.ed()
};
igFI_.structs.SimplePool.prototype.$ = function(a) {
	this.La.length < this.Ng ? this.La.push(a) : this.jd(a)
};
igFI_.structs.SimplePool.prototype.Bf = function(a) {
	if (a > this.Ng)
		igFI_a(Error("[goog.structs.SimplePool] Initial cannot be greater than max"));
	for (var b = 0; b < a; b++)
		this.La.push(this.ed())
};
igFI_.structs.SimplePool.prototype.ed = function() {
	return this.cc ? this.cc() : {}
};
igFI_.structs.SimplePool.prototype.jd = function(a) {
	if (this.kd)
		this.kd(a);
	else if (igFI_.isFunction(a.dispose))
		a.dispose();
	else
		for (var b in a)
			delete a[b]
};
igFI_.structs.SimplePool.prototype.b = function() {
	igFI_.structs.SimplePool.q.b.call(this);
	for (var a = this.La; a.length;)
		this.jd(a.pop());
	delete this.La
};
igFI_.userAgent.jscript = {};
igFI_.userAgent.jscript.ASSUME_NO_JSCRIPT = igFI_d;
igFI_.userAgent.jscript.Eb = function() {
	var a = "ScriptEngine" in igFI_.global;
	igFI_.userAgent.jscript.Ye = a && igFI_.global.ScriptEngine() == "JScript";
	igFI_.userAgent.jscript.Lh = igFI_.userAgent.jscript.Ye ? igFI_.global
			.ScriptEngineMajorVersion()
			+ "."
			+ igFI_.global.ScriptEngineMinorVersion()
			+ "."
			+ igFI_.global.ScriptEngineBuildVersion() : "0"
};
igFI_.userAgent.jscript.ASSUME_NO_JSCRIPT || igFI_.userAgent.jscript.Eb();
igFI_.userAgent.jscript.HAS_JSCRIPT = igFI_.userAgent.jscript.ASSUME_NO_JSCRIPT
		? igFI_d
		: igFI_.userAgent.jscript.Ye;
igFI_.userAgent.jscript.VERSION = igFI_.userAgent.jscript.ASSUME_NO_JSCRIPT
		? "0"
		: igFI_.userAgent.jscript.Lh;
igFI_.userAgent.jscript.isVersion = function(a) {
	return igFI_.string.compareVersions(igFI_.userAgent.jscript.VERSION, a) >= 0
};
igFI_.events.Listener = function() {
};
igFI_.events.Listener.Th = 0;
igFI_.events.Listener.prototype.key = 0;
igFI_.events.Listener.prototype.removed = igFI_d;
igFI_.events.Listener.prototype.sb = igFI_d;
igFI_.events.Listener.prototype.init = function(a, b, c, d, e, f) {
	if (igFI_.isFunction(a))
		this.Cg = igFI_b;
	else if (a && a.handleEvent && igFI_.isFunction(a.handleEvent))
		this.Cg = igFI_d;
	else
		igFI_a(Error("Invalid listener argument"));
	this.listener = a;
	this.proxy = b;
	this.src = c;
	this.type = d;
	this.capture = !!e;
	this.handler = f;
	this.sb = igFI_d;
	this.key = ++igFI_.events.Listener.Th;
	this.removed = igFI_d
};
igFI_.events.Listener.prototype.handleEvent = function(a) {
	if (this.Cg)
		return this.listener.call(this.handler || this.src, a);
	return this.listener.handleEvent.call(this.listener, a)
};
igFI_.events.pools = {};
(function() {
	var a = igFI_.userAgent.jscript.HAS_JSCRIPT
			&& !igFI_.userAgent.jscript.isVersion("5.7");
	function b() {
		return {
			g : 0,
			aa : 0
		}
	}
	function c() {
		return []
	}
	var d;
	igFI_.events.pools.setProxyCallbackFunction = function(q) {
		d = q
	};
	function e() {
		var q = function(p) {
			return d.call(q.src, q.key, p)
		};
		return q
	}
	function f() {
		return new igFI_.events.Listener
	}
	function g() {
		return new igFI_.events.BrowserEvent
	}
	if (a) {
		igFI_.events.pools.Y = function() {
			return h.Y()
		};
		igFI_.events.pools.$ = function(q) {
			h.$(q)
		};
		igFI_.events.pools.getArray = function() {
			return i.Y()
		};
		igFI_.events.pools.releaseArray = function(q) {
			i.$(q)
		};
		igFI_.events.pools.getProxy = function() {
			return j.Y()
		};
		igFI_.events.pools.releaseProxy = function() {
			j.$(e())
		};
		igFI_.events.pools.getListener = function() {
			return k.Y()
		};
		igFI_.events.pools.releaseListener = function(q) {
			k.$(q)
		};
		igFI_.events.pools.getEvent = function() {
			return n.Y()
		};
		igFI_.events.pools.releaseEvent = function(q) {
			n.$(q)
		};
		var h = new igFI_.structs.SimplePool(0, 600);
		h.ob(b);
		var i = new igFI_.structs.SimplePool(0, 600);
		i.ob(c);
		var j = new igFI_.structs.SimplePool(0, 600);
		j.ob(e);
		var k = new igFI_.structs.SimplePool(0, 600);
		k.ob(f);
		var n = new igFI_.structs.SimplePool(0, 600);
		n.ob(g)
	} else {
		igFI_.events.pools.Y = b;
		igFI_.events.pools.$ = igFI_.nullFunction;
		igFI_.events.pools.getArray = c;
		igFI_.events.pools.releaseArray = igFI_.nullFunction;
		igFI_.events.pools.getProxy = e;
		igFI_.events.pools.releaseProxy = igFI_.nullFunction;
		igFI_.events.pools.getListener = f;
		igFI_.events.pools.releaseListener = igFI_.nullFunction;
		igFI_.events.pools.getEvent = g;
		igFI_.events.pools.releaseEvent = igFI_.nullFunction
	}
})();
igFI_.events.za = {};
igFI_.events.D = {};
igFI_.events.ga = {};
igFI_.events.wi = "on";
igFI_.events.le = {};
igFI_.events.Oi = "_";
igFI_.events.listen = function(a, b, c, d, e) {
	if (b)
		if (igFI_.isArray(b)) {
			for (var f = 0; f < b.length; f++)
				igFI_.events.listen(a, b[f], c, d, e);
			return igFI_c
		} else {
			var g = !!d, h = igFI_.events.D;
			b in h || (h[b] = igFI_.events.pools.Y());
			h = h[b];
			if (!(g in h)) {
				h[g] = igFI_.events.pools.Y();
				h.g++
			}
			h = h[g];
			var i = igFI_.getHashCode(a), j, k;
			h.aa++;
			if (h[i]) {
				j = h[i];
				for (f = 0; f < j.length; f++) {
					k = j[f];
					if (k.listener == c && k.handler == e) {
						if (k.removed)
							break;
						return j[f].key
					}
				}
			} else {
				j = h[i] = igFI_.events.pools.getArray();
				h.g++
			}
			var n = igFI_.events.pools.getProxy();
			n.src = a;
			k = igFI_.events.pools.getListener();
			k.init(c, n, a, b, g, e);
			var q = k.key;
			n.key = q;
			j.push(k);
			igFI_.events.za[q] = k;
			igFI_.events.ga[i]
					|| (igFI_.events.ga[i] = igFI_.events.pools.getArray());
			igFI_.events.ga[i].push(k);
			if (a.addEventListener) {
				if (a == igFI_.global || !a.gd)
					a.addEventListener(b, n, g)
			} else
				a.attachEvent(igFI_.events.gg(b), n);
			return q
		}
	else
		igFI_a(Error("Invalid event type"))
};
igFI_.events.Jb = function(a, b, c, d, e) {
	if (igFI_.isArray(b)) {
		for (var f = 0; f < b.length; f++)
			igFI_.events.Jb(a, b[f], c, d, e);
		return igFI_c
	}
	var g = igFI_.events.listen(a, b, c, d, e), h = igFI_.events.za[g];
	h.sb = igFI_b;
	return g
};
igFI_.events.Kg = function(a, b, c, d, e) {
	b.listen(a, c, d, e)
};
igFI_.events.unlisten = function(a, b, c, d, e) {
	if (igFI_.isArray(b)) {
		for (var f = 0; f < b.length; f++)
			igFI_.events.unlisten(a, b[f], c, d, e);
		return igFI_c
	}
	var g = !!d, h = igFI_.events.Hd(a, b, g);
	if (!h)
		return igFI_d;
	for (f = 0; f < h.length; f++)
		if (h[f].listener == c && h[f].capture == g && h[f].handler == e)
			return igFI_.events.unlistenByKey(h[f].key);
	return igFI_d
};
igFI_.events.unlistenByKey = function(a) {
	if (!igFI_.events.za[a])
		return igFI_d;
	var b = igFI_.events.za[a];
	if (b.removed)
		return igFI_d;
	var c = b.src, d = b.type, e = b.proxy, f = b.capture;
	if (c.removeEventListener) {
		if (c == igFI_.global || !c.gd)
			c.removeEventListener(d, e, f)
	} else
		c.detachEvent && c.detachEvent(igFI_.events.gg(d), e);
	var g = igFI_.getHashCode(c), h = igFI_.events.D[d][f][g];
	if (igFI_.events.ga[g]) {
		var i = igFI_.events.ga[g];
		igFI_.array.remove(i, b);
		i.length == 0 && delete igFI_.events.ga[g]
	}
	b.removed = igFI_b;
	h.Ug = igFI_b;
	igFI_.events.rf(d, f, g, h);
	delete igFI_.events.za[a];
	return igFI_b
};
igFI_.events.Ch = function(a, b, c, d, e) {
	b.unlisten(a, c, d, e)
};
igFI_.events.rf = function(a, b, c, d) {
	if (!d.Ic)
		if (d.Ug) {
			for (var e = 0, f = 0; e < d.length; e++)
				if (d[e].removed) {
					var g = d[e].proxy;
					g.src = igFI_c;
					igFI_.events.pools.releaseProxy(g);
					igFI_.events.pools.releaseListener(d[e])
				} else {
					if (e != f)
						d[f] = d[e];
					f++
				}
			d.length = f;
			d.Ug = igFI_d;
			if (f == 0) {
				igFI_.events.pools.releaseArray(d);
				delete igFI_.events.D[a][b][c];
				igFI_.events.D[a][b].g--;
				if (igFI_.events.D[a][b].g == 0) {
					igFI_.events.pools.$(igFI_.events.D[a][b]);
					delete igFI_.events.D[a][b];
					igFI_.events.D[a].g--
				}
				if (igFI_.events.D[a].g == 0) {
					igFI_.events.pools.$(igFI_.events.D[a]);
					delete igFI_.events.D[a]
				}
			}
		}
};
igFI_.events.Ta = function(a, b, c) {
	var d = 0, e = a == igFI_c, f = b == igFI_c, g = c == igFI_c;
	c = !!c;
	if (e)
		igFI_.object.forEach(igFI_.events.ga, function(n) {
					for (var q = n.length - 1; q >= 0; q--) {
						var p = n[q];
						if ((f || b == p.type) && (g || c == p.capture)) {
							igFI_.events.unlistenByKey(p.key);
							d++
						}
					}
				});
	else {
		var h = igFI_.getHashCode(a);
		if (igFI_.events.ga[h])
			for (var i = igFI_.events.ga[h], j = i.length - 1; j >= 0; j--) {
				var k = i[j];
				if ((f || b == k.type) && (g || c == k.capture)) {
					igFI_.events.unlistenByKey(k.key);
					d++
				}
			}
	}
	return d
};
igFI_.events.getListeners = function(a, b, c) {
	return igFI_.events.Hd(a, b, c) || []
};
igFI_.events.Hd = function(a, b, c) {
	var d = igFI_.events.D;
	if (b in d) {
		d = d[b];
		if (c in d) {
			d = d[c];
			var e = igFI_.getHashCode(a);
			if (d[e])
				return d[e]
		}
	}
	return igFI_c
};
igFI_.events.getListener = function(a, b, c, d, e) {
	var f = !!d, g = igFI_.events.Hd(a, b, f);
	if (g)
		for (var h = 0; h < g.length; h++)
			if (g[h].listener == c && g[h].capture == f && g[h].handler == e)
				return g[h];
	return igFI_c
};
igFI_.events.hasListener = function(a, b, c) {
	var d = igFI_.getHashCode(a), e = igFI_.events.ga[d];
	if (e) {
		var f = igFI_.isDef(b), g = igFI_.isDef(c);
		if (f && g) {
			var h = igFI_.events.D[b];
			return !!h && !!h[c] && d in h[c]
		} else
			return f || g ? igFI_.array.some(e, function(i) {
						return f && i.type == b || g && i.capture == c
					}) : igFI_b
	}
	return igFI_d
};
igFI_.events.expose = function(a) {
	var b = [];
	for (var c in a)
		a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b
				.push(c + " = " + a[c]);
	return b.join("\n")
};
igFI_.events.EventType = {
	CLICK : "click",
	DBLCLICK : "dblclick",
	MOUSEDOWN : "mousedown",
	MOUSEUP : "mouseup",
	MOUSEOVER : "mouseover",
	MOUSEOUT : "mouseout",
	MOUSEMOVE : "mousemove",
	SELECTSTART : "selectstart",
	KEYPRESS : "keypress",
	KEYDOWN : "keydown",
	KEYUP : "keyup",
	BLUR : "blur",
	FOCUS : "focus",
	DEACTIVATE : "deactivate",
	FOCUSIN : igFI_.userAgent.IE ? "focusin" : "DOMFocusIn",
	FOCUSOUT : igFI_.userAgent.IE ? "focusout" : "DOMFocusOut",
	CHANGE : "change",
	SELECT : "select",
	SUBMIT : "submit",
	LOAD : "load",
	UNLOAD : "unload",
	ERROR : "error",
	HELP : "help",
	RESIZE : "resize",
	SCROLL : "scroll",
	READYSTATECHANGE : "readystatechange",
	CONTEXTMENU : "contextmenu",
	HASHCHANGE : "hashchange"
};
igFI_.events.gg = function(a) {
	if (a in igFI_.events.le)
		return igFI_.events.le[a];
	return igFI_.events.le[a] = igFI_.events.wi + a
};
igFI_.events.fireListeners = function(a, b, c, d) {
	var e = igFI_.events.D;
	if (b in e) {
		e = e[b];
		if (c in e)
			return igFI_.events.cb(e[c], a, b, c, d)
	}
	return igFI_b
};
igFI_.events.cb = function(a, b, c, d, e) {
	var f = 1, g = igFI_.getHashCode(b);
	if (a[g]) {
		a.aa--;
		var h = a[g];
		if (h.Ic)
			h.Ic++;
		else
			h.Ic = 1;
		try {
			for (var i = h.length, j = 0; j < i; j++) {
				var k = h[j];
				if (k && !k.removed)
					f &= igFI_.events.fireListener(k, e) !== igFI_d
			}
		} finally {
			h.Ic--;
			igFI_.events.rf(c, d, g, h)
		}
	}
	return Boolean(f)
};
igFI_.events.fireListener = function(a, b) {
	var c = a.handleEvent(b);
	a.sb && igFI_.events.unlistenByKey(a.key);
	return c
};
igFI_.events.getTotalListenerCount = function() {
	return igFI_.object.T(igFI_.events.za)
};
igFI_.events.dispatchEvent = function(a, b) {
	if (igFI_.isString(b))
		b = new igFI_.events.Event(b, a);
	else if (b instanceof igFI_.events.Event)
		b.target = b.target || a;
	else {
		var c = b;
		b = new igFI_.events.Event(b.type, a);
		igFI_.object.extend(b, c)
	}
	var d = 1, e, f = b.type, g = igFI_.events.D;
	if (!(f in g))
		return igFI_b;
	g = g[f];
	var h = igFI_b in g, i;
	if (h) {
		e = [];
		for (var j = a; j; j = j.Nd())
			e.push(j);
		i = g[igFI_b];
		i.aa = i.g;
		for (var k = e.length - 1; !b.ta && k >= 0 && i.aa; k--) {
			b.currentTarget = e[k];
			d &= igFI_.events.cb(i, e[k], b.type, igFI_b, b) && b.Ua != igFI_d
		}
	}
	var n = igFI_d in g;
	if (n) {
		i = g[igFI_d];
		i.aa = i.g;
		if (h)
			for (k = 0; !b.ta && k < e.length && i.aa; k++) {
				b.currentTarget = e[k];
				d &= igFI_.events.cb(i, e[k], b.type, igFI_d, b)
						&& b.Ua != igFI_d
			}
		else
			for (var q = a; !b.ta && q && i.aa; q = q.Nd()) {
				b.currentTarget = q;
				d &= igFI_.events.cb(i, q, b.type, igFI_d, b) && b.Ua != igFI_d
			}
	}
	return Boolean(d)
};
igFI_.events.protectBrowserEventEntryPoint = function(a, b) {
	igFI_.events.zc = a.protectEntryPoint(igFI_.events.zc, b);
	igFI_.events.pools.setProxyCallbackFunction(igFI_.events.zc)
};
igFI_.events.zc = function(a, b) {
	if (!igFI_.events.za[a])
		return igFI_b;
	var c = igFI_.events.za[a], d = c.type, e = igFI_.events.D;
	if (!(d in e))
		return igFI_b;
	e = e[d];
	var f, g;
	if (igFI_.userAgent.IE) {
		var h = b || igFI_.getObjectByName("window.event"), i = igFI_b in e, j = igFI_d in e;
		if (i) {
			if (igFI_.events.ki(h))
				return igFI_b;
			igFI_.events.oi(h)
		}
		var k = igFI_.events.pools.getEvent();
		k.init(h, this);
		f = igFI_b;
		try {
			if (i) {
				for (var n = igFI_.events.pools.getArray(), q = k.currentTarget; q; q = q.parentNode)
					n.push(q);
				g = e[igFI_b];
				g.aa = g.g;
				for (var p = n.length - 1; !k.ta && p >= 0 && g.aa; p--) {
					k.currentTarget = n[p];
					f &= igFI_.events.cb(g, n[p], d, igFI_b, k)
				}
				if (j) {
					g = e[igFI_d];
					g.aa = g.g;
					for (p = 0; !k.ta && p < n.length && g.aa; p++) {
						k.currentTarget = n[p];
						f &= igFI_.events.cb(g, n[p], d, igFI_d, k)
					}
				}
			} else
				f = igFI_.events.fireListener(c, k)
		} finally {
			if (n) {
				n.length = 0;
				igFI_.events.pools.releaseArray(n)
			}
			k.dispose();
			igFI_.events.pools.releaseEvent(k)
		}
		return f
	}
	var u = new igFI_.events.BrowserEvent(b, this);
	try {
		f = igFI_.events.fireListener(c, u)
	} finally {
		u.dispose()
	}
	return f
};
igFI_.events.pools.setProxyCallbackFunction(igFI_.events.zc);
igFI_.events.oi = function(a) {
	var b = igFI_d;
	if (a.keyCode == 0)
		try {
			a.keyCode = -1;
			return
		} catch (c) {
			b = igFI_b
		}
	if (b || a.returnValue == undefined)
		a.returnValue = igFI_b
};
igFI_.events.ki = function(a) {
	return a.keyCode < 0 || a.returnValue != undefined
};
igFI_.events.Ii = 0;
igFI_.events.getUniqueId = function(a) {
	return a + "_" + igFI_.events.Ii++
};
igFI_.events.EventTarget = function() {
	igFI_.Disposable.call(this)
};
igFI_.inherits(igFI_.events.EventTarget, igFI_.Disposable);
igFI_.events.EventTarget.prototype.gd = igFI_b;
igFI_.events.EventTarget.prototype.Lc = igFI_c;
igFI_.events.EventTarget.prototype.Nd = function() {
	return this.Lc
};
igFI_.events.EventTarget.prototype.Qb = function(a) {
	this.Lc = a
};
igFI_.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
	igFI_.events.listen(this, a, b, c, d)
};
igFI_.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
	igFI_.events.unlisten(this, a, b, c, d)
};
igFI_.events.EventTarget.prototype.dispatchEvent = function(a) {
	return igFI_.events.dispatchEvent(this, a)
};
igFI_.events.EventTarget.prototype.b = function() {
	igFI_.events.EventTarget.q.b.call(this);
	igFI_.events.Ta(this);
	this.Lc = igFI_c
};
igFI_.math = {};
igFI_.math.Coordinate = function(a, b) {
	this.x = igFI_.isDef(a) ? a : 0;
	this.y = igFI_.isDef(b) ? b : 0
};
igFI_.math.Coordinate.prototype.clone = function() {
	return new igFI_.math.Coordinate(this.x, this.y)
};
if (igFI_.DEBUG)
	igFI_.math.Coordinate.prototype.toString = function() {
		return "(" + this.x + ", " + this.y + ")"
	};
igFI_.math.Coordinate.equals = function(a, b) {
	if (a == b)
		return igFI_b;
	if (!a || !b)
		return igFI_d;
	return a.x == b.x && a.y == b.y
};
igFI_.math.Coordinate.distance = function(a, b) {
	var c = a.x - b.x, d = a.y - b.y;
	return Math.sqrt(c * c + d * d)
};
igFI_.math.Coordinate.squaredDistance = function(a, b) {
	var c = a.x - b.x, d = a.y - b.y;
	return c * c + d * d
};
igFI_.math.Coordinate.difference = function(a, b) {
	return new igFI_.math.Coordinate(a.x - b.x, a.y - b.y)
};
igFI_.math.Coordinate.sum = function(a, b) {
	return new igFI_.math.Coordinate(a.x + b.x, a.y + b.y)
};
igFI_.math.Box = function(a, b, c, d) {
	this.top = a;
	this.right = b;
	this.bottom = c;
	this.left = d
};
igFI_.math.Box.boundingBox = function() {
	for (var a = new igFI_.math.Box(arguments[0].y, arguments[0].x,
			arguments[0].y, arguments[0].x), b = 1; b < arguments.length; b++) {
		var c = arguments[b];
		a.top = Math.min(a.top, c.y);
		a.right = Math.max(a.right, c.x);
		a.bottom = Math.max(a.bottom, c.y);
		a.left = Math.min(a.left, c.x)
	}
	return a
};
igFI_.math.Box.prototype.clone = function() {
	return new igFI_.math.Box(this.top, this.right, this.bottom, this.left)
};
if (igFI_.DEBUG)
	igFI_.math.Box.prototype.toString = function() {
		return "(" + this.top + "t, " + this.right + "r, " + this.bottom
				+ "b, " + this.left + "l)"
	};
igFI_.math.Box.prototype.contains = function(a) {
	return igFI_.math.Box.contains(this, a)
};
igFI_.math.Box.prototype.expand = function(a, b, c, d) {
	if (igFI_.isObject(a)) {
		this.top -= a.top;
		this.right += a.right;
		this.bottom += a.bottom;
		this.left -= a.left
	} else {
		this.top -= a;
		this.right += b;
		this.bottom += c;
		this.left -= d
	}
	return this
};
igFI_.math.Box.equals = function(a, b) {
	if (a == b)
		return igFI_b;
	if (!a || !b)
		return igFI_d;
	return a.top == b.top && a.right == b.right && a.bottom == b.bottom
			&& a.left == b.left
};
igFI_.math.Box.contains = function(a, b) {
	if (!a || !b)
		return igFI_d;
	if (b instanceof igFI_.math.Box)
		return b.left >= a.left && b.right <= a.right && b.top >= a.top
				&& b.bottom <= a.bottom;
	return b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom
};
igFI_.math.Box.distance = function(a, b) {
	if (b.x >= a.left && b.x <= a.right) {
		if (b.y >= a.top && b.y <= a.bottom)
			return 0;
		return b.y < a.top ? a.top - b.y : b.y - a.bottom
	}
	if (b.y >= a.top && b.y <= a.bottom)
		return b.x < a.left ? a.left - b.x : b.x - a.right;
	return igFI_.math.Coordinate.distance(b, new igFI_.math.Coordinate(
					b.x < a.left ? a.left : a.right, b.y < a.top
							? a.top
							: a.bottom))
};
igFI_.math.Range = function(a, b) {
	a = Number(a);
	b = Number(b);
	this.start = a < b ? a : b;
	this.end = a < b ? b : a
};
igFI_.math.Range.prototype.clone = function() {
	return new igFI_.math.Range(this.start, this.end)
};
if (igFI_.DEBUG)
	igFI_.math.Range.prototype.toString = function() {
		return "[" + this.start + ", " + this.end + "]"
	};
igFI_.math.Range.equals = function(a, b) {
	if (a == b)
		return igFI_b;
	if (!a || !b)
		return igFI_d;
	return a.start == b.start && a.end == b.end
};
igFI_.math.Range.intersection = function(a, b) {
	var c = Math.max(a.start, b.start), d = Math.min(a.end, b.end);
	return c <= d ? new igFI_.math.Range(c, d) : igFI_c
};
igFI_.math.Range.hasIntersection = function(a, b) {
	return Math.max(a.start, b.start) <= Math.min(a.end, b.end)
};
igFI_.math.Range.boundingRange = function(a, b) {
	return new igFI_.math.Range(Math.min(a.start, b.start), Math.max(a.end,
					b.end))
};
igFI_.math.Range.contains = function(a, b) {
	return a.start <= b.start && a.end >= b.end
};
igFI_.math.Range.containsPoint = function(a, b) {
	return a.start <= b && a.end >= b
};
igFI_.math.Size = function(a, b) {
	this.width = a;
	this.height = b
};
igFI_.math.Size.equals = function(a, b) {
	if (a == b)
		return igFI_b;
	if (!a || !b)
		return igFI_d;
	return a.width == b.width && a.height == b.height
};
igFI_.math.Size.prototype.clone = function() {
	return new igFI_.math.Size(this.width, this.height)
};
if (igFI_.DEBUG)
	igFI_.math.Size.prototype.toString = function() {
		return "(" + this.width + " x " + this.height + ")"
	};
igFI_.math.Size.prototype.area = function() {
	return this.width * this.height
};
igFI_.math.Size.prototype.u = function() {
	return !this.area()
};
igFI_.math.Size.prototype.ceil = function() {
	this.width = Math.ceil(this.width);
	this.height = Math.ceil(this.height);
	return this
};
igFI_.math.Size.prototype.floor = function() {
	this.width = Math.floor(this.width);
	this.height = Math.floor(this.height);
	return this
};
igFI_.math.Size.prototype.round = function() {
	this.width = Math.round(this.width);
	this.height = Math.round(this.height);
	return this
};
igFI_.math.Size.prototype.scale = function(a) {
	this.width *= a;
	this.height *= a;
	return this
};
igFI_.math.Rect = function(a, b, c, d) {
	this.left = a;
	this.top = b;
	this.width = c;
	this.height = d
};
igFI_.math.Rect.prototype.clone = function() {
	return new igFI_.math.Rect(this.left, this.top, this.width, this.height)
};
igFI_.math.Rect.createFromBox = function(a) {
	return new igFI_.math.Rect(a.left, a.top, a.right - a.left, a.bottom
					- a.top)
};
if (igFI_.DEBUG)
	igFI_.math.Rect.prototype.toString = function() {
		return "(" + this.left + ", " + this.top + " - " + this.width + "w x "
				+ this.height + "h)"
	};
igFI_.math.Rect.equals = function(a, b) {
	if (a == b)
		return igFI_b;
	if (!a || !b)
		return igFI_d;
	return a.left == b.left && a.width == b.width && a.top == b.top
			&& a.height == b.height
};
igFI_.math.Rect.prototype.intersection = function(a) {
	var b = Math.max(this.left, a.left), c = Math.min(this.left + this.width,
			a.left + a.width);
	if (b <= c) {
		var d = Math.max(this.top, a.top), e = Math.min(this.top + this.height,
				a.top + a.height);
		if (d <= e) {
			this.left = b;
			this.top = d;
			this.width = c - b;
			this.height = e - d;
			return igFI_b
		}
	}
	return igFI_d
};
igFI_.math.Rect.intersection = function(a, b) {
	var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left
					+ b.width);
	if (c <= d) {
		var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top
						+ b.height);
		if (e <= f)
			return new igFI_.math.Rect(c, e, d - c, f - e)
	}
	return igFI_c
};
igFI_.math.Rect.intersects = function(a, b) {
	var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left
					+ b.width);
	if (c <= d) {
		var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top
						+ b.height);
		if (e <= f)
			return igFI_b
	}
	return igFI_d
};
igFI_.math.Rect.prototype.intersects = function(a) {
	return igFI_.math.Rect.intersects(this, a)
};
igFI_.math.Rect.difference = function(a, b) {
	var c = igFI_.math.Rect.intersection(a, b);
	if (!c || !c.height || !c.width)
		return [a.clone()];
	var d = [], e = a.top, f = a.height, g = a.left + a.width, h = a.top
			+ a.height, i = b.left + b.width, j = b.top + b.height;
	if (b.top > a.top) {
		d.push(new igFI_.math.Rect(a.left, a.top, a.width, b.top - a.top));
		e = b.top;
		f -= b.top - a.top
	}
	if (j < h) {
		d.push(new igFI_.math.Rect(a.left, j, a.width, h - j));
		f = j - e
	}
	b.left > a.left
			&& d.push(new igFI_.math.Rect(a.left, e, b.left - a.left, f));
	i < g && d.push(new igFI_.math.Rect(i, e, g - i, f));
	return d
};
igFI_.math.Rect.prototype.difference = function(a) {
	return igFI_.math.Rect.difference(this, a)
};
igFI_.math.Rect.prototype.Zc = function(a) {
	var b = Math.max(this.left + this.width, a.left + a.width), c = Math.max(
			this.top + this.height, a.top + a.height);
	this.left = Math.min(this.left, a.left);
	this.top = Math.min(this.top, a.top);
	this.width = b - this.left;
	this.height = c - this.top
};
igFI_.math.Rect.Zc = function(a, b) {
	if (!a || !b)
		return igFI_c;
	var c = a.clone();
	c.Zc(b);
	return c
};
igFI_.math.Rect.prototype.contains = function(a) {
	return a instanceof igFI_.math.Rect ? this.left <= a.left
			&& this.left + this.width >= a.left + a.width && this.top <= a.top
			&& this.top + this.height >= a.top + a.height : a.x >= this.left
			&& a.x <= this.left + this.width && a.y >= this.top
			&& a.y <= this.top + this.height
};
igFI_.math.Rect.prototype.pa = function() {
	return new igFI_.math.Size(this.width, this.height)
};
igFI_.math.randomInt = function(a) {
	return Math.floor(Math.random() * a)
};
igFI_.math.uniformRandom = function(a, b) {
	return a + Math.random() * (b - a)
};
igFI_.math.clamp = function(a, b, c) {
	return Math.min(Math.max(a, b), c)
};
igFI_.math.modulo = function(a, b) {
	var c = a % b;
	return c * b < 0 ? c + b : c
};
igFI_.math.lerp = function(a, b, c) {
	return a + c * (b - a)
};
igFI_.math.nearlyEquals = function(a, b, c) {
	return Math.abs(a - b) <= (c || 1.0E-6)
};
igFI_.math.standardAngle = function(a) {
	return igFI_.math.modulo(a, 360)
};
igFI_.math.toRadians = function(a) {
	return a * Math.PI / 180
};
igFI_.math.toDegrees = function(a) {
	return a * 180 / Math.PI
};
igFI_.math.angleDx = function(a, b) {
	return b * Math.cos(igFI_.math.toRadians(a))
};
igFI_.math.angleDy = function(a, b) {
	return b * Math.sin(igFI_.math.toRadians(a))
};
igFI_.math.angle = function(a, b, c, d) {
	return igFI_.math.standardAngle(igFI_.math.toDegrees(Math.atan2(d - b, c
					- a)))
};
igFI_.math.angleDifference = function(a, b) {
	var c = igFI_.math.standardAngle(b) - igFI_.math.standardAngle(a);
	if (c > 180)
		c = c - 360;
	else if (c <= -180)
		c = 360 + c;
	return c
};
igFI_.math.sign = function(a) {
	return a == 0 ? 0 : a < 0 ? -1 : 1
};
igFI_.math.longestCommonSubsequence = function(a, b, c, d) {
	for (var e = c || function(q, p) {
		return q == p
	}, f = d || function(q) {
		return a[q]
	}, g = a.length, h = b.length, i = [], j = 0; j < g + 1; j++) {
		i[j] = [];
		i[j][0] = 0
	}
	for (var k = 0; k < h + 1; k++)
		i[0][k] = 0;
	for (j = 1; j <= g; j++)
		for (k = 1; k <= g; k++)
			i[j][k] = e(a[j - 1], b[k - 1]) ? i[j - 1][k - 1] + 1 : Math.max(
					i[j - 1][k], i[j][k - 1]);
	var n = [];
	j = g;
	for (k = h; j > 0 && k > 0;)
		if (e(a[j - 1], b[k - 1])) {
			n.unshift(f(j - 1, k - 1));
			j--;
			k--
		} else if (i[j - 1][k] > i[j][k - 1])
			j--;
		else
			k--;
	return n
};
igFI_.math.sum = function() {
	return igFI_.array.reduce(arguments, function(a, b) {
				return a + b
			}, 0)
};
igFI_.math.average = function() {
	return igFI_.math.sum.apply(igFI_c, arguments) / arguments.length
};
igFI_.math.standardDeviation = function() {
	var a = arguments.length;
	if (a < 2)
		return 0;
	var b = igFI_.math.average.apply(igFI_c, arguments), c = igFI_.math.sum
			.apply(igFI_c, igFI_.array.map(arguments, function(d) {
								return Math.pow(d - b, 2)
							}))
			/ (a - 1);
	return Math.sqrt(c)
};
igFI_.math.isInt = function(a) {
	return isFinite(a) && a % 1 == 0
};
igFI_.math.isFiniteNumber = function(a) {
	return isFinite(a) && !isNaN(a)
};
igFI_.color = {};
igFI_.color.names = {
	aliceblue : "#f0f8ff",
	antiquewhite : "#faebd7",
	aqua : "#00ffff",
	aquamarine : "#7fffd4",
	azure : "#f0ffff",
	beige : "#f5f5dc",
	bisque : "#ffe4c4",
	black : "#000000",
	blanchedalmond : "#ffebcd",
	blue : "#0000ff",
	blueviolet : "#8a2be2",
	brown : "#a52a2a",
	burlywood : "#deb887",
	cadetblue : "#5f9ea0",
	chartreuse : "#7fff00",
	chocolate : "#d2691e",
	coral : "#ff7f50",
	cornflowerblue : "#6495ed",
	cornsilk : "#fff8dc",
	crimson : "#dc143c",
	cyan : "#00ffff",
	darkblue : "#00008b",
	darkcyan : "#008b8b",
	darkgoldenrod : "#b8860b",
	darkgray : "#a9a9a9",
	darkgreen : "#006400",
	darkgrey : "#a9a9a9",
	darkkhaki : "#bdb76b",
	darkmagenta : "#8b008b",
	darkolivegreen : "#556b2f",
	darkorange : "#ff8c00",
	darkorchid : "#9932cc",
	darkred : "#8b0000",
	darksalmon : "#e9967a",
	darkseagreen : "#8fbc8f",
	darkslateblue : "#483d8b",
	darkslategray : "#2f4f4f",
	darkslategrey : "#2f4f4f",
	darkturquoise : "#00ced1",
	darkviolet : "#9400d3",
	deeppink : "#ff1493",
	deepskyblue : "#00bfff",
	dimgray : "#696969",
	dimgrey : "#696969",
	dodgerblue : "#1e90ff",
	firebrick : "#b22222",
	floralwhite : "#fffaf0",
	forestgreen : "#228b22",
	fuchsia : "#ff00ff",
	gainsboro : "#dcdcdc",
	ghostwhite : "#f8f8ff",
	gold : "#ffd700",
	goldenrod : "#daa520",
	gray : "#808080",
	green : "#008000",
	greenyellow : "#adff2f",
	grey : "#808080",
	honeydew : "#f0fff0",
	hotpink : "#ff69b4",
	indianred : "#cd5c5c",
	indigo : "#4b0082",
	ivory : "#fffff0",
	khaki : "#f0e68c",
	lavender : "#e6e6fa",
	lavenderblush : "#fff0f5",
	lawngreen : "#7cfc00",
	lemonchiffon : "#fffacd",
	lightblue : "#add8e6",
	lightcoral : "#f08080",
	lightcyan : "#e0ffff",
	lightgoldenrodyellow : "#fafad2",
	lightgray : "#d3d3d3",
	lightgreen : "#90ee90",
	lightgrey : "#d3d3d3",
	lightpink : "#ffb6c1",
	lightsalmon : "#ffa07a",
	lightseagreen : "#20b2aa",
	lightskyblue : "#87cefa",
	lightslategray : "#778899",
	lightslategrey : "#778899",
	lightsteelblue : "#b0c4de",
	lightyellow : "#ffffe0",
	lime : "#00ff00",
	limegreen : "#32cd32",
	linen : "#faf0e6",
	magenta : "#ff00ff",
	maroon : "#800000",
	mediumaquamarine : "#66cdaa",
	mediumblue : "#0000cd",
	mediumorchid : "#ba55d3",
	mediumpurple : "#9370d8",
	mediumseagreen : "#3cb371",
	mediumslateblue : "#7b68ee",
	mediumspringgreen : "#00fa9a",
	mediumturquoise : "#48d1cc",
	mediumvioletred : "#c71585",
	midnightblue : "#191970",
	mintcream : "#f5fffa",
	mistyrose : "#ffe4e1",
	moccasin : "#ffe4b5",
	navajowhite : "#ffdead",
	navy : "#000080",
	oldlace : "#fdf5e6",
	olive : "#808000",
	olivedrab : "#6b8e23",
	orange : "#ffa500",
	orangered : "#ff4500",
	orchid : "#da70d6",
	palegoldenrod : "#eee8aa",
	palegreen : "#98fb98",
	paleturquoise : "#afeeee",
	palevioletred : "#d87093",
	papayawhip : "#ffefd5",
	peachpuff : "#ffdab9",
	peru : "#cd853f",
	pink : "#ffc0cb",
	plum : "#dda0dd",
	powderblue : "#b0e0e6",
	purple : "#800080",
	red : "#ff0000",
	rosybrown : "#bc8f8f",
	royalblue : "#4169e1",
	saddlebrown : "#8b4513",
	salmon : "#fa8072",
	sandybrown : "#f4a460",
	seagreen : "#2e8b57",
	seashell : "#fff5ee",
	sienna : "#a0522d",
	silver : "#c0c0c0",
	skyblue : "#87ceeb",
	slateblue : "#6a5acd",
	slategray : "#708090",
	slategrey : "#708090",
	snow : "#fffafa",
	springgreen : "#00ff7f",
	steelblue : "#4682b4",
	tan : "#d2b48c",
	teal : "#008080",
	thistle : "#d8bfd8",
	tomato : "#ff6347",
	turquoise : "#40e0d0",
	violet : "#ee82ee",
	wheat : "#f5deb3",
	white : "#ffffff",
	whitesmoke : "#f5f5f5",
	yellow : "#ffff00",
	yellowgreen : "#9acd32"
};
igFI_.color.parse = function(a) {
	var b = {};
	a = String(a);
	var c = igFI_.color.xi(a);
	if (igFI_.color.Fg(c)) {
		b.hex = igFI_.color.normalizeHex(c);
		b.type = "hex";
		return b
	} else {
		var d = igFI_.color.Gg(a);
		if (d.length) {
			b.hex = igFI_.color.rgbArrayToHex(d);
			b.type = "rgb";
			return b
		} else if (igFI_.color.names) {
			var e = igFI_.color.names[a.toLowerCase()];
			if (e) {
				b.hex = e;
				b.type = "named";
				return b
			}
		}
	}
	igFI_a(Error(a + " is not a valid color string"))
};
igFI_.color.parseRgb = function(a) {
	var b = igFI_.color.Gg(a);
	if (!b.length)
		igFI_a(Error(a + " is not a valid RGB color"));
	return b
};
igFI_.color.hexToRgbStyle = function(a) {
	return igFI_.color.Di(igFI_.color.hexToRgb(a))
};
igFI_.color.hi = /#(.)(.)(.)/;
igFI_.color.normalizeHex = function(a) {
	if (!igFI_.color.Fg(a))
		igFI_a(Error("'" + a + "' is not a valid hex color"));
	if (a.length == 4)
		a = a.replace(igFI_.color.hi, "#$1$1$2$2$3$3");
	return a.toLowerCase()
};
igFI_.color.hexToRgb = function(a) {
	a = igFI_.color.normalizeHex(a);
	var b = parseInt(a.substr(1, 2), 16), c = parseInt(a.substr(3, 2), 16), d = parseInt(
			a.substr(5, 2), 16);
	return [b, c, d]
};
igFI_.color.rgbToHex = function(a, b, c) {
	a = Number(a);
	b = Number(b);
	c = Number(c);
	if (isNaN(a) || a < 0 || a > 255 || isNaN(b) || b < 0 || b > 255
			|| isNaN(c) || c < 0 || c > 255)
		igFI_a(Error('"(' + a + "," + b + "," + c
				+ '") is not a valid RGB color'));
	var d = igFI_.color.oe(a.toString(16)), e = igFI_.color.oe(b.toString(16)), f = igFI_.color
			.oe(c.toString(16));
	return "#" + d + e + f
};
igFI_.color.rgbArrayToHex = function(a) {
	return igFI_.color.rgbToHex(a[0], a[1], a[2])
};
igFI_.color.rgbToHsl = function(a, b, c) {
	var d = a / 255, e = b / 255, f = c / 255, g = Math.max(d, e, f), h = Math
			.min(d, e, f), i = 0, j = 0, k = 0.5 * (g + h);
	if (g != h) {
		if (g == d)
			i = 60 * (e - f) / (g - h);
		else if (g == e)
			i = 60 * (f - d) / (g - h) + 120;
		else if (g == f)
			i = 60 * (d - e) / (g - h) + 240;
		j = 0 < k && k <= 0.5 ? (g - h) / (2 * k) : (g - h) / (2 - 2 * k)
	}
	return [Math.round(i + 360) % 360, j, k]
};
igFI_.color.rgbArrayToHsl = function(a) {
	return igFI_.color.rgbToHsl(a[0], a[1], a[2])
};
igFI_.color.Xd = function(a, b, c) {
	if (c < 0)
		c += 1;
	else if (c > 1)
		c -= 1;
	if (6 * c < 1)
		return a + (b - a) * 6 * c;
	else if (2 * c < 1)
		return b;
	else if (3 * c < 2)
		return a + (b - a) * (2 / 3 - c) * 6;
	return a
};
igFI_.color.hslToRgb = function(a, b, c) {
	var d = 0, e = 0, f = 0, g = a / 360;
	if (b == 0)
		d = e = f = c * 255;
	else {
		var h = 0, i = 0;
		i = c < 0.5 ? c * (1 + b) : c + b - b * c;
		h = 2 * c - i;
		d = 255 * igFI_.color.Xd(h, i, g + 1 / 3);
		e = 255 * igFI_.color.Xd(h, i, g);
		f = 255 * igFI_.color.Xd(h, i, g - 1 / 3)
	}
	return [Math.round(d), Math.round(e), Math.round(f)]
};
igFI_.color.hslArrayToRgb = function(a) {
	return igFI_.color.hslToRgb(a[0], a[1], a[2])
};
igFI_.color.Ki = /^#(?:[0-9a-f]{3}){1,2}$/i;
igFI_.color.Fg = function(a) {
	return igFI_.color.Ki.test(a)
};
igFI_.color.vi = /^#[0-9a-f]{6}$/;
igFI_.color.Ni = function(a) {
	return igFI_.color.vi.test(a)
};
igFI_.color.Ci = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
igFI_.color.Gg = function(a) {
	var b = a.match(igFI_.color.Ci);
	if (b) {
		var c = Number(b[1]), d = Number(b[2]), e = Number(b[3]);
		if (c >= 0 && c <= 255 && d >= 0 && d <= 255 && e >= 0 && e <= 255)
			return [c, d, e]
	}
	return []
};
igFI_.color.oe = function(a) {
	return a.length == 1 ? "0" + a : a
};
igFI_.color.xi = function(a) {
	return a.charAt(0) == "#" ? a : "#" + a
};
igFI_.color.Di = function(a) {
	return "rgb(" + a.join(",") + ")"
};
igFI_.color.hsvToRgb = function(a, b, c) {
	var d = 0, e = 0, f = 0;
	if (b == 0)
		f = e = d = c;
	else {
		var g = Math.floor(a / 60), h = a / 60 - g, i = c * (1 - b), j = c
				* (1 - b * h), k = c * (1 - b * (1 - h));
		switch (g) {
			case 1 :
				d = j;
				e = c;
				f = i;
				break;
			case 2 :
				d = i;
				e = c;
				f = k;
				break;
			case 3 :
				d = i;
				e = j;
				f = c;
				break;
			case 4 :
				d = k;
				e = i;
				f = c;
				break;
			case 5 :
				d = c;
				e = i;
				f = j;
				break;
			case 6 :
			case 0 :
				d = c;
				e = k;
				f = i;
				break
		}
	}
	return [Math.floor(d), Math.floor(e), Math.floor(f)]
};
igFI_.color.rgbToHsv = function(a, b, c) {
	var d = Math.max(Math.max(a, b), c), e = Math.min(Math.min(a, b), c), f, g, h = d;
	if (e == d)
		g = f = 0;
	else {
		var i = d - e;
		g = i / d;
		f = a == d ? (b - c) / i : b == d ? 2 + (c - a) / i : 4 + (a - b) / i;
		f *= 60;
		if (f < 0)
			f += 360;
		if (f > 360)
			f -= 360
	}
	return [f, g, h]
};
igFI_.color.rgbArrayToHsv = function(a) {
	return igFI_.color.rgbToHsv(a[0], a[1], a[2])
};
igFI_.color.hsvArrayToRgb = function(a) {
	return igFI_.color.hsvToRgb(a[0], a[1], a[2])
};
igFI_.color.hexToHsl = function(a) {
	var b = igFI_.color.hexToRgb(a);
	return igFI_.color.rgbToHsl(b[0], b[1], b[2])
};
igFI_.color.hslToHex = function(a, b, c) {
	return igFI_.color.rgbArrayToHex(igFI_.color.hslToRgb(a, b, c))
};
igFI_.color.hslArrayToHex = function(a) {
	return igFI_.color.rgbArrayToHex(igFI_.color.hslToRgb(a[0], a[1], a[2]))
};
igFI_.color.hexToHsv = function(a) {
	return igFI_.color.rgbArrayToHsv(igFI_.color.hexToRgb(a))
};
igFI_.color.hsvToHex = function(a, b, c) {
	return igFI_.color.rgbArrayToHex(igFI_.color.hsvToRgb(a, b, c))
};
igFI_.color.hsvArrayToHex = function(a) {
	return igFI_.color.hsvToHex(a[0], a[1], a[2])
};
igFI_.color.hslDistance = function(a, b) {
	var c, d;
	c = a[2] <= 0.5 ? a[1] * a[2] : a[1] * (1 - a[2]);
	d = b[2] <= 0.5 ? b[1] * b[2] : b[1] * (1 - b[2]);
	var e = a[0] / 360, f = b[0] / 360, g = (e - f) * 2 * Math.PI;
	return (a[2] - b[2]) * (a[2] - b[2]) + c * c + d * d - 2 * c * d
			* Math.cos(g)
};
igFI_.color.blend = function(a, b, c) {
	c = igFI_.math.clamp(c, 0, 1);
	return [Math.round(c * a[0] + (1 - c) * b[0]),
			Math.round(c * a[1] + (1 - c) * b[1]),
			Math.round(c * a[2] + (1 - c) * b[2])]
};
igFI_.color.darken = function(a, b) {
	var c = [0, 0, 0];
	return igFI_.color.blend(c, a, b)
};
igFI_.color.lighten = function(a, b) {
	var c = [255, 255, 255];
	return igFI_.color.blend(c, a, b)
};
igFI_.color.highContrast = function(a, b) {
	for (var c = [], d = 0; d < b.length; d++)
		c.push({
					color : b[d],
					diff : igFI_.color.Li(b[d], a) + igFI_.color.Sh(b[d], a)
				});
	c.sort(function(e, f) {
				return f.diff - e.diff
			});
	return c[0].color
};
igFI_.color.Gh = function(a) {
	return Math.round((a[0] * 299 + a[1] * 587 + a[2] * 114) / 1000)
};
igFI_.color.Li = function(a, b) {
	return Math.abs(igFI_.color.Gh(a) - igFI_.color.Gh(b))
};
igFI_.color.Sh = function(a, b) {
	return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
			+ Math.abs(a[2] - b[2])
};
igFI_.dom = {};
igFI_.dom.classes = {};
igFI_.dom.classes.set = function(a, b) {
	a.className = b
};
igFI_.dom.classes.get = function(a) {
	var b = a.className;
	return b && typeof b.split == "function" ? b.split(" ") : []
};
igFI_.dom.classes.add = function(a) {
	var b = igFI_.dom.classes.get(a), c = igFI_.array.slice(arguments, 1), d = igFI_.dom.classes
			.jf(b, c);
	a.className = b.join(" ");
	return d
};
igFI_.dom.classes.remove = function(a) {
	var b = igFI_.dom.classes.get(a), c = igFI_.array.slice(arguments, 1), d = igFI_.dom.classes
			.nh(b, c);
	a.className = b.join(" ");
	return d
};
igFI_.dom.classes.jf = function(a, b) {
	for (var c = 0, d = 0; d < b.length; d++)
		if (!igFI_.array.contains(a, b[d])) {
			a.push(b[d]);
			c++
		}
	return c == b.length
};
igFI_.dom.classes.nh = function(a, b) {
	for (var c = 0, d = 0; d < a.length; d++)
		if (igFI_.array.contains(b, a[d])) {
			igFI_.array.splice(a, d--, 1);
			c++
		}
	return c == b.length
};
igFI_.dom.classes.swap = function(a, b, c) {
	for (var d = igFI_.dom.classes.get(a), e = igFI_d, f = 0; f < d.length; f++)
		if (d[f] == b) {
			igFI_.array.splice(d, f--, 1);
			e = igFI_b
		}
	if (e) {
		d.push(c);
		a.className = d.join(" ")
	}
	return e
};
igFI_.dom.classes.addRemove = function(a, b, c) {
	var d = igFI_.dom.classes.get(a);
	if (igFI_.isString(b))
		igFI_.array.remove(d, b);
	else
		igFI_.isArray(b) && igFI_.dom.classes.nh(d, b);
	if (igFI_.isString(c) && !igFI_.array.contains(d, c))
		d.push(c);
	else
		igFI_.isArray(c) && igFI_.dom.classes.jf(d, c);
	a.className = d.join(" ")
};
igFI_.dom.classes.has = function(a, b) {
	return igFI_.array.contains(igFI_.dom.classes.get(a), b)
};
igFI_.dom.classes.enable = function(a, b, c) {
	c ? igFI_.dom.classes.add(a, b) : igFI_.dom.classes.remove(a, b)
};
igFI_.dom.classes.toggle = function(a, b) {
	var c = !igFI_.dom.classes.has(a, b);
	igFI_.dom.classes.enable(a, b, c);
	return c
};
igFI_.dom.TagName = {
	A : "A",
	ABBR : "ABBR",
	ACRONYM : "ACRONYM",
	ADDRESS : "ADDRESS",
	APPLET : "APPLET",
	AREA : "AREA",
	B : "B",
	BASE : "BASE",
	BASEFONT : "BASEFONT",
	BDO : "BDO",
	BIG : "BIG",
	BLOCKQUOTE : "BLOCKQUOTE",
	BODY : "BODY",
	BR : "BR",
	BUTTON : "BUTTON",
	CAPTION : "CAPTION",
	CENTER : "CENTER",
	CITE : "CITE",
	CODE : "CODE",
	COL : "COL",
	COLGROUP : "COLGROUP",
	DD : "DD",
	DEL : "DEL",
	DFN : "DFN",
	DIR : "DIR",
	DIV : "DIV",
	DL : "DL",
	DT : "DT",
	EM : "EM",
	FIELDSET : "FIELDSET",
	FONT : "FONT",
	FORM : "FORM",
	FRAME : "FRAME",
	FRAMESET : "FRAMESET",
	H1 : "H1",
	H2 : "H2",
	H3 : "H3",
	H4 : "H4",
	H5 : "H5",
	H6 : "H6",
	HEAD : "HEAD",
	HR : "HR",
	HTML : "HTML",
	I : "I",
	IFRAME : "IFRAME",
	IMG : "IMG",
	INPUT : "INPUT",
	INS : "INS",
	ISINDEX : "ISINDEX",
	KBD : "KBD",
	LABEL : "LABEL",
	LEGEND : "LEGEND",
	LI : "LI",
	LINK : "LINK",
	MAP : "MAP",
	MENU : "MENU",
	META : "META",
	NOFRAMES : "NOFRAMES",
	NOSCRIPT : "NOSCRIPT",
	OBJECT : "OBJECT",
	OL : "OL",
	OPTGROUP : "OPTGROUP",
	OPTION : "OPTION",
	P : "P",
	PARAM : "PARAM",
	PRE : "PRE",
	Q : "Q",
	S : "S",
	SAMP : "SAMP",
	SCRIPT : "SCRIPT",
	SELECT : "SELECT",
	SMALL : "SMALL",
	SPAN : "SPAN",
	STRIKE : "STRIKE",
	STRONG : "STRONG",
	STYLE : "STYLE",
	SUB : "SUB",
	SUP : "SUP",
	TABLE : "TABLE",
	TBODY : "TBODY",
	TD : "TD",
	TEXTAREA : "TEXTAREA",
	TFOOT : "TFOOT",
	TH : "TH",
	THEAD : "THEAD",
	TITLE : "TITLE",
	TR : "TR",
	TT : "TT",
	U : "U",
	UL : "UL",
	VAR : "VAR"
};
igFI_.dom.ASSUME_QUIRKS_MODE = igFI_d;
igFI_.dom.ASSUME_STANDARDS_MODE = igFI_d;
igFI_.dom.Jh = igFI_.dom.ASSUME_QUIRKS_MODE || igFI_.dom.ASSUME_STANDARDS_MODE;
igFI_.dom.NodeType = {
	ELEMENT : 1,
	ATTRIBUTE : 2,
	TEXT : 3,
	CDATA_SECTION : 4,
	ENTITY_REFERENCE : 5,
	ENTITY : 6,
	PROCESSING_INSTRUCTION : 7,
	COMMENT : 8,
	DOCUMENT : 9,
	DOCUMENT_TYPE : 10,
	DOCUMENT_FRAGMENT : 11,
	NOTATION : 12
};
igFI_.dom.r = function(a) {
	return a ? new igFI_.dom.DomHelper(igFI_.dom.s(a)) : igFI_.dom.Uh
			|| (igFI_.dom.Uh = new igFI_.dom.DomHelper)
};
igFI_.dom.ma = function() {
	return document
};
igFI_.dom.oa = function(a) {
	return igFI_.isString(a) ? document.getElementById(a) : a
};
igFI_.dom.Ve = igFI_.dom.oa;
igFI_.dom.Ma = function(a, b, c) {
	return igFI_.dom.cg(document, a, b, c)
};
igFI_.dom.cg = function(a, b, c, d) {
	var e = d || a, f = b && b != "*" ? b.toLowerCase() : "";
	if (e.querySelectorAll
			&& (f || c)
			&& (!igFI_.userAgent.WEBKIT || igFI_.dom.jb(a) || igFI_.userAgent
					.isVersion("528"))) {
		var g = f + (c ? "." + c : "");
		return e.querySelectorAll(g)
	}
	if (c && e.getElementsByClassName) {
		var h = e.getElementsByClassName(c);
		if (f) {
			for (var i = {}, j = 0, k = 0, n; n = h[k]; k++)
				if (f == n.nodeName.toLowerCase())
					i[j++] = n;
			i.length = j;
			return i
		} else
			return h
	}
	h = e.getElementsByTagName(f || "*");
	if (c) {
		i = {};
		for (k = j = 0; n = h[k]; k++) {
			var q = n.className;
			if (typeof q.split == "function"
					&& igFI_.array.contains(q.split(" "), c))
				i[j++] = n
		}
		i.length = j;
		return i
	} else
		return h
};
igFI_.dom.We = igFI_.dom.Ma;
igFI_.dom.Qc = function(a, b) {
	igFI_.object.forEach(b, function(c, d) {
				if (d == "style")
					a.style.cssText = c;
				else if (d == "class")
					a.className = c;
				else if (d == "for")
					a.htmlFor = c;
				else if (d in igFI_.dom.Ze)
					a.setAttribute(igFI_.dom.Ze[d], c);
				else
					a[d] = c
			})
};
igFI_.dom.Ze = {
	cellpadding : "cellPadding",
	cellspacing : "cellSpacing",
	colspan : "colSpan",
	rowspan : "rowSpan",
	valign : "vAlign",
	height : "height",
	width : "width",
	usemap : "useMap",
	frameborder : "frameBorder",
	type : "type"
};
igFI_.dom.xc = function(a) {
	return igFI_.dom.kg(a || window)
};
igFI_.dom.kg = function(a) {
	var b = a.document;
	if (igFI_.userAgent.WEBKIT && !igFI_.userAgent.isVersion("500")
			&& !igFI_.userAgent.MOBILE) {
		if (typeof a.innerHeight == "undefined")
			a = window;
		var c = a.innerHeight, d = a.document.documentElement.scrollHeight;
		if (a == a.top)
			if (d < c)
				c -= 15;
		return new igFI_.math.Size(a.innerWidth, c)
	}
	var e = igFI_.dom.jb(b)
			&& (!igFI_.userAgent.OPERA || igFI_.userAgent.OPERA
					&& igFI_.userAgent.isVersion("9.50"))
			? b.documentElement
			: b.body;
	return new igFI_.math.Size(e.clientWidth, e.clientHeight)
};
igFI_.dom.Xf = function() {
	return igFI_.dom.Yf(window)
};
igFI_.dom.Yf = function(a) {
	var b = a.document, c = 0;
	if (b) {
		var d = igFI_.dom.kg(a).height, e = b.body, f = b.documentElement;
		if (igFI_.dom.jb(b) && f.scrollHeight)
			c = f.scrollHeight != d ? f.scrollHeight : f.offsetHeight;
		else {
			var g = f.scrollHeight, h = f.offsetHeight;
			if (f.clientHeight != h) {
				g = e.scrollHeight;
				h = e.offsetHeight
			}
			c = g > d ? g > h ? g : h : g < h ? g : h
		}
	}
	return c
};
igFI_.dom.getPageScroll = function(a) {
	var b = a || igFI_.global || window;
	return igFI_.dom.r(b.document).na()
};
igFI_.dom.na = function() {
	return igFI_.dom.Zf(document)
};
igFI_.dom.Zf = function(a) {
	var b = igFI_.dom.Dd(a);
	return new igFI_.math.Coordinate(b.scrollLeft, b.scrollTop)
};
igFI_.dom.Cd = function() {
	return igFI_.dom.Dd(document)
};
igFI_.dom.Dd = function(a) {
	return !igFI_.userAgent.WEBKIT && igFI_.dom.jb(a)
			? a.documentElement
			: a.body
};
igFI_.dom.hb = function(a) {
	return a ? igFI_.dom.Td(a) : window
};
igFI_.dom.Td = function(a) {
	if (a.parentWindow)
		return a.parentWindow;
	if (igFI_.userAgent.WEBKIT && !igFI_.userAgent.isVersion("500")
			&& !igFI_.userAgent.MOBILE) {
		var b = a.createElement("script");
		b.innerHTML = "document.parentWindow=window";
		var c = a.documentElement;
		c.appendChild(b);
		c.removeChild(b);
		return a.parentWindow
	}
	return a.defaultView
};
igFI_.dom.o = function() {
	return igFI_.dom.yf(document, arguments)
};
igFI_.dom.yf = function(a, b) {
	var c = b[0], d = b[1];
	if (igFI_.userAgent.IE && d && (d.name || d.type)) {
		var e = ["<", c];
		d.name && e.push(' name="', igFI_.string.htmlEscape(d.name), '"');
		if (d.type) {
			e.push(' type="', igFI_.string.htmlEscape(d.type), '"');
			d = igFI_.cloneObject(d);
			delete d.type
		}
		e.push(">");
		c = e.join("")
	}
	var f = a.createElement(c);
	if (d)
		if (igFI_.isString(d))
			f.className = d;
		else
			igFI_.dom.Qc(f, d);
	if (b.length > 2) {
		function g(j) {
			if (j)
				f.appendChild(igFI_.isString(j) ? a.createTextNode(j) : j)
		}
		for (var h = 2; h < b.length; h++) {
			var i = b[h];
			igFI_.isArrayLike(i) && !igFI_.dom.Dc(i)
					? igFI_.array.forEach(igFI_.dom.isNodeList(i) ? igFI_.array
									.clone(i) : i, g)
					: g(i)
		}
	}
	return f
};
igFI_.dom.Xe = igFI_.dom.o;
igFI_.dom.createElement = function(a) {
	return document.createElement(a)
};
igFI_.dom.createTextNode = function(a) {
	return document.createTextNode(a)
};
igFI_.dom.ug = function(a) {
	return igFI_.dom.vg(document, a)
};
igFI_.dom.vg = function(a, b) {
	var c = a.createElement("div");
	c.innerHTML = b;
	if (c.childNodes.length == 1)
		return c.firstChild;
	else {
		for (var d = a.createDocumentFragment(); c.firstChild;)
			d.appendChild(c.firstChild);
		return d
	}
};
igFI_.dom.Uf = function() {
	return igFI_.dom.qa() ? "CSS1Compat" : "BackCompat"
};
igFI_.dom.qa = function() {
	return igFI_.dom.jb(document)
};
igFI_.dom.jb = function(a) {
	if (igFI_.dom.Jh)
		return igFI_.dom.ASSUME_STANDARDS_MODE;
	return a.compatMode == "CSS1Compat"
};
igFI_.dom.canHaveChildren = function(a) {
	if (a.nodeType != igFI_.dom.NodeType.ELEMENT)
		return igFI_d;
	if ("canHaveChildren" in a)
		return a.canHaveChildren;
	switch (a.tagName) {
		case igFI_.dom.TagName.APPLET :
		case igFI_.dom.TagName.AREA :
		case igFI_.dom.TagName.BR :
		case igFI_.dom.TagName.COL :
		case igFI_.dom.TagName.FRAME :
		case igFI_.dom.TagName.HR :
		case igFI_.dom.TagName.IMG :
		case igFI_.dom.TagName.INPUT :
		case igFI_.dom.TagName.IFRAME :
		case igFI_.dom.TagName.ISINDEX :
		case igFI_.dom.TagName.LINK :
		case igFI_.dom.TagName.NOFRAMES :
		case igFI_.dom.TagName.NOSCRIPT :
		case igFI_.dom.TagName.META :
		case igFI_.dom.TagName.OBJECT :
		case igFI_.dom.TagName.PARAM :
		case igFI_.dom.TagName.SCRIPT :
		case igFI_.dom.TagName.STYLE :
			return igFI_d
	}
	return igFI_b
};
igFI_.dom.appendChild = function(a, b) {
	a.appendChild(b)
};
igFI_.dom.mb = function(a) {
	for (var b; b = a.firstChild;)
		a.removeChild(b)
};
igFI_.dom.be = function(a, b) {
	b.parentNode && b.parentNode.insertBefore(a, b)
};
igFI_.dom.Bc = function(a, b) {
	b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
igFI_.dom.removeNode = function(a) {
	return a && a.parentNode ? a.parentNode.removeChild(a) : igFI_c
};
igFI_.dom.replaceNode = function(a, b) {
	var c = b.parentNode;
	c && c.replaceChild(a, b)
};
igFI_.dom.xd = function(a) {
	var b, c = a.parentNode;
	if (c && c.nodeType != igFI_.dom.NodeType.DOCUMENT_FRAGMENT)
		if (a.removeNode)
			return a.removeNode(igFI_d);
		else {
			for (; b = a.firstChild;)
				c.insertBefore(b, a);
			return igFI_.dom.removeNode(a)
		}
};
igFI_.dom.Ed = function(a) {
	return igFI_.dom.sc(a.firstChild, igFI_b)
};
igFI_.dom.Gd = function(a) {
	return igFI_.dom.sc(a.lastChild, igFI_d)
};
igFI_.dom.Jd = function(a) {
	return igFI_.dom.sc(a.nextSibling, igFI_b)
};
igFI_.dom.Od = function(a) {
	return igFI_.dom.sc(a.previousSibling, igFI_d)
};
igFI_.dom.sc = function(a, b) {
	for (; a && a.nodeType != igFI_.dom.NodeType.ELEMENT;)
		a = b ? a.nextSibling : a.previousSibling;
	return a
};
igFI_.dom.Dc = function(a) {
	return igFI_.isObject(a) && a.nodeType > 0
};
igFI_.dom.Ih = igFI_.userAgent.WEBKIT && igFI_.userAgent.isVersion("522");
igFI_.dom.contains = function(a, b) {
	if (typeof a.contains != "undefined" && !igFI_.dom.Ih
			&& b.nodeType == igFI_.dom.NodeType.ELEMENT)
		return a == b || a.contains(b);
	if (typeof a.compareDocumentPosition != "undefined")
		return a == b || Boolean(a.compareDocumentPosition(b) & 16);
	for (; b && a != b;)
		b = b.parentNode;
	return b == a
};
igFI_.dom.compareNodeOrder = function(a, b) {
	if (a == b)
		return 0;
	if (a.compareDocumentPosition)
		return a.compareDocumentPosition(b) & 2 ? 1 : -1;
	if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
		var c = a.nodeType == igFI_.dom.NodeType.ELEMENT, d = b.nodeType == igFI_.dom.NodeType.ELEMENT;
		if (c && d)
			return a.sourceIndex - b.sourceIndex;
		else {
			var e = a.parentNode, f = b.parentNode;
			if (e == f)
				return igFI_.dom.vf(a, b);
			if (!c && igFI_.dom.contains(e, b))
				return -1 * igFI_.dom.uf(a, b);
			if (!d && igFI_.dom.contains(f, a))
				return igFI_.dom.uf(b, a);
			return (c ? a.sourceIndex : e.sourceIndex)
					- (d ? b.sourceIndex : f.sourceIndex)
		}
	}
	var g = igFI_.dom.s(a), h, i;
	h = g.createRange();
	h.selectNode(a);
	h.collapse(igFI_b);
	i = g.createRange();
	i.selectNode(b);
	i.collapse(igFI_b);
	return h.compareBoundaryPoints(igFI_.global.Range.START_TO_END, i)
};
igFI_.dom.uf = function(a, b) {
	var c = a.parentNode;
	if (c == b)
		return -1;
	for (var d = b; d.parentNode != c;)
		d = d.parentNode;
	return igFI_.dom.vf(d, a)
};
igFI_.dom.vf = function(a, b) {
	for (var c = b; c = c.previousSibling;)
		if (c == a)
			return -1;
	return 1
};
igFI_.dom.findCommonAncestor = function() {
	var a, b = arguments.length;
	if (b) {
		if (b == 1)
			return arguments[0]
	} else
		return igFI_c;
	var c = [], d = Infinity;
	for (a = 0; a < b; a++) {
		for (var e = [], f = arguments[a]; f;) {
			e.unshift(f);
			f = f.parentNode
		}
		c.push(e);
		d = Math.min(d, e.length)
	}
	var g = igFI_c;
	for (a = 0; a < d; a++) {
		for (var h = c[0][a], i = 1; i < b; i++)
			if (h != c[i][a])
				return g;
		g = h
	}
	return g
};
igFI_.dom.s = function(a) {
	return a.nodeType == igFI_.dom.NodeType.DOCUMENT ? a : a.ownerDocument
			|| a.document
};
igFI_.dom.oc = function(a) {
	var b;
	return b = igFI_.userAgent.WEBKIT
			? a.document || a.contentWindow.document
			: a.contentDocument || a.contentWindow.document
};
igFI_.dom.Fd = function(a) {
	return a.contentWindow || igFI_.dom.Td(igFI_.dom.oc(a))
};
igFI_.dom.ye = function(a, b) {
	if ("textContent" in a)
		a.textContent = b;
	else if (a.firstChild && a.firstChild.nodeType == igFI_.dom.NodeType.TEXT) {
		for (; a.lastChild != a.firstChild;)
			a.removeChild(a.lastChild);
		a.firstChild.data = b
	} else {
		igFI_.dom.mb(a);
		var c = igFI_.dom.s(a);
		a.appendChild(c.createTextNode(b))
	}
};
igFI_.dom.getOuterHtml = function(a) {
	if ("outerHTML" in a)
		return a.outerHTML;
	else {
		var b = igFI_.dom.s(a), c = b.createElement("div");
		c.appendChild(a.cloneNode(igFI_b));
		return c.innerHTML
	}
};
igFI_.dom.ud = function(a, b) {
	var c = [], d = igFI_.dom.wd(a, b, c, igFI_b);
	return d ? c[0] : undefined
};
igFI_.dom.vd = function(a, b) {
	var c = [];
	igFI_.dom.wd(a, b, c, igFI_d);
	return c
};
igFI_.dom.wd = function(a, b, c, d) {
	if (a != igFI_c)
		for (var e = 0, f; f = a.childNodes[e]; e++) {
			if (b(f)) {
				c.push(f);
				if (d)
					return igFI_b
			}
			if (igFI_.dom.wd(f, b, c, d))
				return igFI_b
		}
	return igFI_d
};
igFI_.dom.cf = {
	SCRIPT : 1,
	STYLE : 1,
	HEAD : 1,
	IFRAME : 1,
	OBJECT : 1
};
igFI_.dom.$b = {
	IMG : " ",
	BR : "\n"
};
igFI_.dom.isFocusableTabIndex = function(a) {
	var b = a.getAttributeNode("tabindex");
	if (b && b.specified) {
		var c = a.tabIndex;
		return igFI_.isNumber(c) && c >= 0
	}
	return igFI_d
};
igFI_.dom.setFocusableTabIndex = function(a, b) {
	if (b)
		a.tabIndex = 0;
	else
		a.removeAttribute("tabIndex")
};
igFI_.dom.Cb = function(a) {
	var b;
	if (igFI_.userAgent.IE && "innerText" in a)
		b = igFI_.string.canonicalizeNewlines(a.innerText);
	else {
		var c = [];
		igFI_.dom.Qd(a, c, igFI_b);
		b = c.join("")
	}
	b = b.replace(/\xAD/g, "");
	b = b.replace(/ +/g, " ");
	if (b != " ")
		b = b.replace(/^\s*/, "");
	return b
};
igFI_.dom.getRawTextContent = function(a) {
	var b = [];
	igFI_.dom.Qd(a, b, igFI_d);
	return b.join("")
};
igFI_.dom.Qd = function(a, b, c) {
	if (!(a.nodeName in igFI_.dom.cf))
		if (a.nodeType == igFI_.dom.NodeType.TEXT)
			c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b
					.push(a.nodeValue);
		else if (a.nodeName in igFI_.dom.$b)
			b.push(igFI_.dom.$b[a.nodeName]);
		else
			for (var d = a.firstChild; d;) {
				igFI_.dom.Qd(d, b, c);
				d = d.nextSibling
			}
};
igFI_.dom.Kd = function(a) {
	return igFI_.dom.Cb(a).length
};
igFI_.dom.Ld = function(a, b) {
	for (var c = b || igFI_.dom.s(a).body, d = []; a && a != c;) {
		for (var e = a; e = e.previousSibling;)
			d.unshift(igFI_.dom.Cb(e));
		a = a.parentNode
	}
	return igFI_.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
igFI_.dom.getNodeAtOffset = function(a, b, c) {
	for (var d = [a], e = 0, f; d.length > 0 && e < b;) {
		f = d.pop();
		if (!(f.nodeName in igFI_.dom.cf))
			if (f.nodeType == igFI_.dom.NodeType.TEXT) {
				var g = f.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g,
						" ");
				e += g.length
			} else if (f.nodeName in igFI_.dom.$b)
				e += igFI_.dom.$b[f.nodeName].length;
			else
				for (var h = f.childNodes.length - 1; h >= 0; h--)
					d.push(f.childNodes[h])
	}
	if (igFI_.isObject(c)) {
		c.remainder = f ? f.nodeValue.length + b - e - 1 : 0;
		c.node = f
	}
	return f
};
igFI_.dom.isNodeList = function(a) {
	if (a && typeof a.length == "number")
		if (igFI_.isObject(a))
			return typeof a.item == "function" || typeof a.item == "string";
		else if (igFI_.isFunction(a))
			return typeof a.item == "function";
	return igFI_d
};
igFI_.dom.zd = function(a, b, c) {
	return igFI_.dom.lc(a, function(d) {
				return (!b || d.nodeName == b)
						&& (!c || igFI_.dom.classes.has(d, c))
			}, igFI_b)
};
igFI_.dom.lc = function(a, b, c, d) {
	if (!c)
		a = a.parentNode;
	for (var e = d == igFI_c, f = 0; a && (e || f <= d);) {
		if (b(a))
			return a;
		a = a.parentNode;
		f++
	}
	return igFI_c
};
igFI_.dom.DomHelper = function(a) {
	this.p = a || igFI_.global.document || document
};
igFI_.dom.DomHelper.prototype.r = igFI_.dom.r;
igFI_.dom.DomHelper.prototype.ma = function() {
	return this.p
};
igFI_.dom.DomHelper.prototype.oa = function(a) {
	return igFI_.isString(a) ? this.p.getElementById(a) : a
};
igFI_.dom.DomHelper.prototype.Ve = igFI_.dom.DomHelper.prototype.oa;
igFI_.dom.DomHelper.prototype.Ma = function(a, b, c) {
	return igFI_.dom.cg(this.p, a, b, c)
};
igFI_.dom.DomHelper.prototype.We = igFI_.dom.DomHelper.prototype.Ma;
igFI_.dom.DomHelper.prototype.Qc = igFI_.dom.Qc;
igFI_.dom.DomHelper.prototype.xc = function(a) {
	return igFI_.dom.xc(a || this.hb())
};
igFI_.dom.DomHelper.prototype.Xf = function() {
	return igFI_.dom.Yf(this.hb())
};
igFI_.dom.DomHelper.prototype.o = function() {
	return igFI_.dom.yf(this.p, arguments)
};
igFI_.dom.DomHelper.prototype.Xe = igFI_.dom.DomHelper.prototype.o;
igFI_.dom.DomHelper.prototype.createElement = function(a) {
	return this.p.createElement(a)
};
igFI_.dom.DomHelper.prototype.createTextNode = function(a) {
	return this.p.createTextNode(a)
};
igFI_.dom.DomHelper.prototype.ug = function(a) {
	return igFI_.dom.vg(this.p, a)
};
igFI_.dom.DomHelper.prototype.Uf = function() {
	return this.qa() ? "CSS1Compat" : "BackCompat"
};
igFI_.dom.DomHelper.prototype.qa = function() {
	return igFI_.dom.jb(this.p)
};
igFI_.dom.DomHelper.prototype.hb = function() {
	return igFI_.dom.Td(this.p)
};
igFI_.dom.DomHelper.prototype.Cd = function() {
	return igFI_.dom.Dd(this.p)
};
igFI_.dom.DomHelper.prototype.na = function() {
	return igFI_.dom.Zf(this.p)
};
igFI_.dom.DomHelper.prototype.appendChild = igFI_.dom.appendChild;
igFI_.dom.DomHelper.prototype.mb = igFI_.dom.mb;
igFI_.dom.DomHelper.prototype.be = igFI_.dom.be;
igFI_.dom.DomHelper.prototype.Bc = igFI_.dom.Bc;
igFI_.dom.DomHelper.prototype.removeNode = igFI_.dom.removeNode;
igFI_.dom.DomHelper.prototype.replaceNode = igFI_.dom.replaceNode;
igFI_.dom.DomHelper.prototype.xd = igFI_.dom.xd;
igFI_.dom.DomHelper.prototype.Ed = igFI_.dom.Ed;
igFI_.dom.DomHelper.prototype.Gd = igFI_.dom.Gd;
igFI_.dom.DomHelper.prototype.Jd = igFI_.dom.Jd;
igFI_.dom.DomHelper.prototype.Od = igFI_.dom.Od;
igFI_.dom.DomHelper.prototype.Dc = igFI_.dom.Dc;
igFI_.dom.DomHelper.prototype.contains = igFI_.dom.contains;
igFI_.dom.DomHelper.prototype.s = igFI_.dom.s;
igFI_.dom.DomHelper.prototype.oc = igFI_.dom.oc;
igFI_.dom.DomHelper.prototype.Fd = igFI_.dom.Fd;
igFI_.dom.DomHelper.prototype.ye = igFI_.dom.ye;
igFI_.dom.DomHelper.prototype.ud = igFI_.dom.ud;
igFI_.dom.DomHelper.prototype.vd = igFI_.dom.vd;
igFI_.dom.DomHelper.prototype.Cb = igFI_.dom.Cb;
igFI_.dom.DomHelper.prototype.Kd = igFI_.dom.Kd;
igFI_.dom.DomHelper.prototype.Ld = igFI_.dom.Ld;
igFI_.dom.DomHelper.prototype.zd = igFI_.dom.zd;
igFI_.dom.DomHelper.prototype.lc = igFI_.dom.lc;
igFI_.userAgent.product = {};
igFI_.userAgent.product.ASSUME_FIREFOX = igFI_d;
igFI_.userAgent.product.ASSUME_CAMINO = igFI_d;
igFI_.userAgent.product.ASSUME_IPHONE = igFI_d;
igFI_.userAgent.product.ASSUME_ANDROID = igFI_d;
igFI_.userAgent.product.ASSUME_CHROME = igFI_d;
igFI_.userAgent.product.ASSUME_SAFARI = igFI_d;
igFI_.userAgent.product.Fa = igFI_.userAgent.ASSUME_IE
		|| igFI_.userAgent.ASSUME_OPERA
		|| igFI_.userAgent.product.ASSUME_FIREFOX
		|| igFI_.userAgent.product.ASSUME_CAMINO
		|| igFI_.userAgent.product.ASSUME_IPHONE
		|| igFI_.userAgent.product.ASSUME_ANDROID
		|| igFI_.userAgent.product.ASSUME_CHROME
		|| igFI_.userAgent.product.ASSUME_SAFARI;
igFI_.userAgent.product.Eb = function() {
	igFI_.userAgent.product.Hf = igFI_d;
	igFI_.userAgent.product.ub = igFI_d;
	igFI_.userAgent.product.Jf = igFI_d;
	igFI_.userAgent.product.Ff = igFI_d;
	igFI_.userAgent.product.Gf = igFI_d;
	igFI_.userAgent.product.Lf = igFI_d;
	var a = igFI_.userAgent.getUserAgentString();
	if (a)
		if (a.indexOf("Firefox") != -1)
			igFI_.userAgent.product.Hf = igFI_b;
		else if (a.indexOf("Camino") != -1)
			igFI_.userAgent.product.ub = igFI_b;
		else if (a.indexOf("iPhone") != -1 || a.indexOf("iPod") != -1)
			igFI_.userAgent.product.Jf = igFI_b;
		else if (a.indexOf("Android") != -1)
			igFI_.userAgent.product.Ff = igFI_b;
		else if (a.indexOf("Chrome") != -1)
			igFI_.userAgent.product.Gf = igFI_b;
		else if (a.indexOf("Safari") != -1)
			igFI_.userAgent.product.Lf = igFI_b
};
igFI_.userAgent.product.Fa || igFI_.userAgent.product.Eb();
igFI_.userAgent.product.OPERA = igFI_.userAgent.OPERA;
igFI_.userAgent.product.IE = igFI_.userAgent.IE;
igFI_.userAgent.product.FIREFOX = igFI_.userAgent.product.Fa
		? igFI_.userAgent.product.ASSUME_FIREFOX
		: igFI_.userAgent.product.Hf;
igFI_.userAgent.product.CAMINO = igFI_.userAgent.product.Fa
		? igFI_.userAgent.product.ASSUME_CAMINO
		: igFI_.userAgent.product.ub;
igFI_.userAgent.product.IPHONE = igFI_.userAgent.product.Fa
		? igFI_.userAgent.product.ASSUME_IPHONE
		: igFI_.userAgent.product.Jf;
igFI_.userAgent.product.ANDROID = igFI_.userAgent.product.Fa
		? igFI_.userAgent.product.ASSUME_ANDROID
		: igFI_.userAgent.product.Ff;
igFI_.userAgent.product.CHROME = igFI_.userAgent.product.Fa
		? igFI_.userAgent.product.ASSUME_CHROME
		: igFI_.userAgent.product.Gf;
igFI_.userAgent.product.SAFARI = igFI_.userAgent.product.Fa
		? igFI_.userAgent.product.ASSUME_SAFARI
		: igFI_.userAgent.product.Lf;
igFI_.style = {};
igFI_.style.setStyle = function(a, b, c) {
	igFI_.isString(b) ? igFI_.style.th(a, c, b) : igFI_.object.forEach(b, igFI_
					.partial(igFI_.style.th, a))
};
igFI_.style.th = function(a, b, c) {
	a.style[igFI_.style.toCamelCase(c)] = b
};
igFI_.style.getStyle = function(a, b) {
	return a.style[igFI_.style.toCamelCase(b)]
};
igFI_.style.getComputedStyle = function(a, b) {
	var c = igFI_.dom.s(a);
	if (c.defaultView && c.defaultView.getComputedStyle) {
		var d = c.defaultView.getComputedStyle(a, "");
		if (d)
			return d[b]
	}
	return igFI_c
};
igFI_.style.getCascadedStyle = function(a, b) {
	return a.currentStyle ? a.currentStyle[b] : igFI_c
};
igFI_.style.w = function(a, b) {
	return igFI_.style.getComputedStyle(a, b)
			|| igFI_.style.getCascadedStyle(a, b) || a.style[b]
};
igFI_.style.getComputedPosition = function(a) {
	return igFI_.style.w(a, "position")
};
igFI_.style.getBackgroundColor = function(a) {
	return igFI_.style.w(a, "backgroundColor")
};
igFI_.style.getComputedOverflowX = function(a) {
	return igFI_.style.w(a, "overflowX")
};
igFI_.style.getComputedOverflowY = function(a) {
	return igFI_.style.w(a, "overflowY")
};
igFI_.style.getComputedZIndex = function(a) {
	return igFI_.style.w(a, "zIndex")
};
igFI_.style.getComputedTextAlign = function(a) {
	return igFI_.style.w(a, "textAlign")
};
igFI_.style.getComputedCursor = function(a) {
	return igFI_.style.w(a, "cursor")
};
igFI_.style.setPosition = function(a, b, c) {
	var d, e, f = igFI_.userAgent.GECKO
			&& (igFI_.userAgent.MAC || igFI_.userAgent.X11)
			&& igFI_.userAgent.isVersion("1.9");
	if (b instanceof igFI_.math.Coordinate) {
		d = b.x;
		e = b.y
	} else {
		d = b;
		e = c
	}
	a.style.left = typeof d == "number" ? (f ? Math.round(d) : d) + "px" : d;
	a.style.top = typeof e == "number" ? (f ? Math.round(e) : e) + "px" : e
};
igFI_.style.getPosition = function(a) {
	return new igFI_.math.Coordinate(a.offsetLeft, a.offsetTop)
};
igFI_.style.getClientViewportElement = function(a) {
	var b;
	b = a
			? a.nodeType == igFI_.dom.NodeType.DOCUMENT ? a : igFI_.dom.s(a)
			: igFI_.dom.ma();
	if (igFI_.userAgent.IE && !igFI_.dom.r(b).qa())
		return b.body;
	return b.documentElement
};
igFI_.style.Qf = function(a) {
	var b = a.getBoundingClientRect();
	if (igFI_.userAgent.IE) {
		var c = a.ownerDocument;
		b.left -= c.documentElement.clientLeft + c.body.clientLeft;
		b.top -= c.documentElement.clientTop + c.body.clientTop
	}
	return b
};
igFI_.style.getOffsetParent = function(a) {
	if (igFI_.userAgent.IE)
		return a.offsetParent;
	for (var b = igFI_.dom.s(a), c = igFI_.style.w(a, "position"), d = c == "fixed"
			|| c == "absolute", e = a.parentNode; e && e != b; e = e.parentNode) {
		c = igFI_.style.w(e, "position");
		d = d && c == "static" && e != b.documentElement && e != b.body;
		if (!d
				&& (e.scrollWidth > e.clientWidth
						|| e.scrollHeight > e.clientHeight || c == "fixed" || c == "absolute"))
			return e
	}
	return igFI_c
};
igFI_.style.getVisibleRectForElement = function(a) {
	for (var b = new igFI_.math.Box(0, Infinity, Infinity, 0), c = igFI_.dom
			.r(a), d = c.Cd(), e, f = a; f = igFI_.style.getOffsetParent(f);)
		if ((!igFI_.userAgent.IE || f.clientWidth != 0)
				&& (f.scrollWidth != f.clientWidth || f.scrollHeight != f.clientHeight)
				&& igFI_.style.w(f, "overflow") != "visible") {
			var g = igFI_.style.getPageOffset(f), h = igFI_.style
					.getClientLeftTop(f);
			g.x += h.x;
			g.y += h.y;
			b.top = Math.max(b.top, g.y);
			b.right = Math.min(b.right, g.x + f.clientWidth);
			b.bottom = Math.min(b.bottom, g.y + f.clientHeight);
			b.left = Math.max(b.left, g.x);
			e = e || f != d
		}
	var i = d.scrollLeft, j = d.scrollTop;
	if (igFI_.userAgent.WEBKIT) {
		b.left += i;
		b.top += j
	} else {
		b.left = Math.max(b.left, i);
		b.top = Math.max(b.top, j)
	}
	if (!e || igFI_.userAgent.WEBKIT) {
		b.right += i;
		b.bottom += j
	}
	var k = c.xc();
	b.right = Math.min(b.right, i + k.width);
	b.bottom = Math.min(b.bottom, j + k.height);
	return b.top >= 0 && b.left >= 0 && b.bottom > b.top && b.right > b.left
			? b
			: igFI_c
};
igFI_.style.scrollIntoContainerView = function(a, b, c) {
	var d = igFI_.style.getPageOffset(a), e = igFI_.style.getPageOffset(b), f = igFI_.style
			.getBorderBox(b), g = d.x - e.x - f.left, h = d.y - e.y - f.top, i = b.clientWidth
			- a.offsetWidth, j = b.clientHeight - a.offsetHeight;
	if (c) {
		b.scrollLeft += g - i / 2;
		b.scrollTop += h - j / 2
	} else {
		b.scrollLeft += Math.min(g, Math.max(g - i, 0));
		b.scrollTop += Math.min(h, Math.max(h - j, 0))
	}
};
igFI_.style.getClientLeftTop = function(a) {
	if (igFI_.userAgent.GECKO && !igFI_.userAgent.isVersion("1.9")) {
		var b = parseFloat(igFI_.style.getComputedStyle(a, "borderLeftWidth"));
		if (igFI_.style.Ec(a)) {
			var c = a.offsetWidth
					- a.clientWidth
					- b
					- parseFloat(igFI_.style.getComputedStyle(a,
							"borderRightWidth"));
			b += c
		}
		return new igFI_.math.Coordinate(b, parseFloat(igFI_.style
						.getComputedStyle(a, "borderTopWidth")))
	}
	return new igFI_.math.Coordinate(a.clientLeft, a.clientTop)
};
igFI_.style.getPageOffset = function(a) {
	var b, c = igFI_.dom.s(a), d = igFI_.style.w(a, "position"), e = igFI_.userAgent.GECKO
			&& c.getBoxObjectFor
			&& !a.getBoundingClientRect
			&& d == "absolute"
			&& (b = c.getBoxObjectFor(a)) && (b.screenX < 0 || b.screenY < 0), f = new igFI_.math.Coordinate(
			0, 0), g = igFI_.style.getClientViewportElement(c);
	if (a == g)
		return f;
	if (a.getBoundingClientRect) {
		b = igFI_.style.Qf(a);
		var h = igFI_.dom.r(c).na();
		f.x = b.left + h.x;
		f.y = b.top + h.y
	} else if (c.getBoxObjectFor && !e) {
		b = c.getBoxObjectFor(a);
		var i = c.getBoxObjectFor(g);
		f.x = b.screenX - i.screenX;
		f.y = b.screenY - i.screenY
	} else {
		var j = a;
		do {
			f.x += j.offsetLeft;
			f.y += j.offsetTop;
			if (j != a) {
				f.x += j.clientLeft || 0;
				f.y += j.clientTop || 0
			}
			if (igFI_.userAgent.WEBKIT
					&& igFI_.style.getComputedPosition(j) == "fixed") {
				f.x += c.body.scrollLeft;
				f.y += c.body.scrollTop;
				break
			}
			j = j.offsetParent
		} while (j && j != a);
		if (igFI_.userAgent.OPERA || igFI_.userAgent.WEBKIT && d == "absolute")
			f.y -= c.body.offsetTop;
		for (j = a; (j = igFI_.style.getOffsetParent(j)) && j != c.body
				&& j != g;) {
			f.x -= j.scrollLeft;
			if (!igFI_.userAgent.OPERA || j.tagName != "TR")
				f.y -= j.scrollTop
		}
	}
	return f
};
igFI_.style.getPageOffsetLeft = function(a) {
	return igFI_.style.getPageOffset(a).x
};
igFI_.style.getPageOffsetTop = function(a) {
	return igFI_.style.getPageOffset(a).y
};
igFI_.style.getFramedPageOffset = function(a, b) {
	var c = new igFI_.math.Coordinate(0, 0), d = igFI_.dom.hb(igFI_.dom.s(a)), e = a;
	do {
		var f = d == b ? igFI_.style.getPageOffset(e) : igFI_.style
				.getClientPosition(e);
		c.x += f.x;
		c.y += f.y
	} while (d && d != b && (e = d.frameElement) && (d = d.parent));
	return c
};
igFI_.style.translateRectForAnotherFrame = function(a, b, c) {
	if (b.ma() != c.ma()) {
		var d = b.ma().body, e = igFI_.style.getFramedPageOffset(d, c.hb());
		e = igFI_.math.Coordinate.difference(e, igFI_.style.getPageOffset(d));
		if (igFI_.userAgent.IE && !b.qa())
			e = igFI_.math.Coordinate.difference(e, b.na());
		a.left += e.x;
		a.top += e.y
	}
};
igFI_.style.getRelativePosition = function(a, b) {
	var c = igFI_.style.getClientPosition(a), d = igFI_.style
			.getClientPosition(b);
	return new igFI_.math.Coordinate(c.x - d.x, c.y - d.y)
};
igFI_.style.getClientPosition = function(a) {
	var b = new igFI_.math.Coordinate;
	if (a.nodeType == igFI_.dom.NodeType.ELEMENT)
		if (a.getBoundingClientRect) {
			var c = igFI_.style.Qf(a);
			b.x = c.left;
			b.y = c.top
		} else {
			var d = igFI_.dom.r(a).na(), e = igFI_.style.getPageOffset(a);
			b.x = e.x - d.x;
			b.y = e.y - d.y
		}
	else {
		b.x = a.clientX;
		b.y = a.clientY
	}
	return b
};
igFI_.style.setPageOffset = function(a, b, c) {
	var d = igFI_.style.getPageOffset(a);
	if (b instanceof igFI_.math.Coordinate) {
		c = b.y;
		b = b.x
	}
	var e = b - d.x, f = c - d.y;
	igFI_.style.setPosition(a, a.offsetLeft + e, a.offsetTop + f)
};
igFI_.style.xe = function(a, b, c) {
	var d;
	if (b instanceof igFI_.math.Size) {
		d = b.height;
		b = b.width
	} else {
		if (c == undefined)
			igFI_a(Error("missing height argument"));
		d = c
	}
	a.style.width = typeof b == "number" ? Math.round(b) + "px" : b;
	a.style.height = typeof d == "number" ? Math.round(d) + "px" : d
};
igFI_.style.pa = function(a) {
	var b = igFI_.userAgent.OPERA && !igFI_.userAgent.isVersion("10");
	if (igFI_.style.w(a, "display") != "none")
		return b ? new igFI_.math.Size(a.offsetWidth || a.clientWidth,
				a.offsetHeight || a.clientHeight) : new igFI_.math.Size(
				a.offsetWidth, a.offsetHeight);
	var c = a.style, d = c.display, e = c.visibility, f = c.position;
	c.visibility = "hidden";
	c.position = "absolute";
	c.display = "inline";
	var g, h;
	if (b) {
		g = a.offsetWidth || a.clientWidth;
		h = a.offsetHeight || a.clientHeight
	} else {
		g = a.offsetWidth;
		h = a.offsetHeight
	}
	c.display = d;
	c.position = f;
	c.visibility = e;
	return new igFI_.math.Size(g, h)
};
igFI_.style.getBounds = function(a) {
	var b = igFI_.style.getPageOffset(a), c = igFI_.style.pa(a);
	return new igFI_.math.Rect(b.x, b.y, c.width, c.height)
};
igFI_.style.Ah = {};
igFI_.style.toCamelCase = function(a) {
	return igFI_.style.Ah[a]
			|| (igFI_.style.Ah[a] = String(a).replace(/\-([a-z])/g,
					function(b, c) {
						return c.toUpperCase()
					}))
};
igFI_.style.toSelectorCase = function(a) {
	return a.replace(/([A-Z])/g, "-$1").toLowerCase()
};
igFI_.style.getOpacity = function(a) {
	var b = a.style, c = "";
	if ("opacity" in b)
		c = b.opacity;
	else if ("MozOpacity" in b)
		c = b.MozOpacity;
	else if ("filter" in b) {
		var d = b.filter.match(/alpha\(opacity=([\d.]+)\)/);
		if (d)
			c = String(d[1] / 100)
	}
	return c == "" ? c : Number(c)
};
igFI_.style.setOpacity = function(a, b) {
	var c = a.style;
	if ("opacity" in c)
		c.opacity = b;
	else if ("MozOpacity" in c)
		c.MozOpacity = b;
	else if ("filter" in c)
		c.filter = b === "" ? "" : "alpha(opacity=" + b * 100 + ")"
};
igFI_.style.setTransparentBackgroundImage = function(a, b) {
	var c = a.style;
	if (igFI_.userAgent.IE && !igFI_.userAgent.isVersion("8"))
		c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'
				+ b + '", sizingMethod="crop")';
	else {
		c.backgroundImage = "url(" + b + ")";
		c.backgroundPosition = "top left";
		c.backgroundRepeat = "no-repeat"
	}
};
igFI_.style.clearTransparentBackgroundImage = function(a) {
	var b = a.style;
	if ("filter" in b)
		b.filter = "";
	else
		b.backgroundImage = "none"
};
igFI_.style.showElement = function(a, b) {
	a.style.display = b ? "" : "none"
};
igFI_.style.isElementShown = function(a) {
	return a.style.display != "none"
};
igFI_.style.installStyles = function(a, b) {
	var c = igFI_.dom.r(b), d = igFI_c;
	if (igFI_.userAgent.IE) {
		d = c.ma().createStyleSheet();
		igFI_.style.setStyles(d, a)
	} else {
		var e = c.Ma("head")[0];
		if (!e) {
			var f = c.Ma("body")[0];
			e = c.o("head");
			f.parentNode.insertBefore(e, f)
		}
		d = c.o("style");
		igFI_.style.setStyles(d, a);
		c.appendChild(e, d)
	}
	return d
};
igFI_.style.uninstallStyles = function(a) {
	var b = a.ownerNode || a.owningElement || a;
	igFI_.dom.removeNode(b)
};
igFI_.style.setStyles = function(a, b) {
	if (igFI_.userAgent.IE)
		a.cssText = b;
	else {
		var c = igFI_.userAgent.WEBKIT ? "innerText" : "innerHTML";
		a[c] = b
	}
};
igFI_.style.setPreWrap = function(a) {
	var b = a.style;
	if (igFI_.userAgent.IE && !igFI_.userAgent.isVersion("8")) {
		b.whiteSpace = "pre";
		b.wordWrap = "break-word"
	} else
		b.whiteSpace = igFI_.userAgent.GECKO
				? "-moz-pre-wrap"
				: igFI_.userAgent.OPERA ? "-o-pre-wrap" : "pre-wrap"
};
igFI_.style.setInlineBlock = function(a) {
	var b = a.style;
	b.position = "relative";
	if (igFI_.userAgent.IE && !igFI_.userAgent.isVersion("8")) {
		b.zoom = "1";
		b.display = "inline"
	} else
		b.display = igFI_.userAgent.GECKO ? igFI_.userAgent.isVersion("1.9a")
				? "inline-block"
				: "-moz-inline-box" : "inline-block"
};
igFI_.style.Ec = function(a) {
	return "rtl" == igFI_.style.w(a, "direction")
};
igFI_.style.Te = igFI_.userAgent.GECKO
		? "MozUserSelect"
		: igFI_.userAgent.WEBKIT ? "WebkitUserSelect" : igFI_c;
igFI_.style.isUnselectable = function(a) {
	if (igFI_.style.Te)
		return a.style[igFI_.style.Te].toLowerCase() == "none";
	else if (igFI_.userAgent.IE || igFI_.userAgent.OPERA)
		return a.getAttribute("unselectable") == "on";
	return igFI_d
};
igFI_.style.setUnselectable = function(a, b, c) {
	var d = !c ? a.getElementsByTagName("*") : igFI_c, e = igFI_.style.Te;
	if (e) {
		var f = b ? "none" : "";
		a.style[e] = f;
		if (d)
			for (var g = 0, h; h = d[g]; g++)
				h.style[e] = f
	} else if (igFI_.userAgent.IE || igFI_.userAgent.OPERA) {
		f = b ? "on" : "";
		a.setAttribute("unselectable", f);
		if (d)
			for (g = 0; h = d[g]; g++)
				h.setAttribute("unselectable", f)
	}
};
igFI_.style.getBorderBoxSize = function(a) {
	return new igFI_.math.Size(a.offsetWidth, a.offsetHeight)
};
igFI_.style.setBorderBoxSize = function(a, b) {
	var c = igFI_.dom.s(a), d = igFI_.dom.r(c).qa();
	if (igFI_.userAgent.IE && (!d || !igFI_.userAgent.isVersion("8"))) {
		var e = a.style;
		if (d) {
			var f = igFI_.style.getPaddingBox(a), g = igFI_.style
					.getBorderBox(a);
			e.pixelWidth = b.width - g.left - f.left - f.right - g.right;
			e.pixelHeight = b.height - g.top - f.top - f.bottom - g.bottom
		} else {
			e.pixelWidth = b.width;
			e.pixelHeight = b.height
		}
	} else
		igFI_.style.ph(a, b, "border-box")
};
igFI_.style.getContentBoxSize = function(a) {
	var b = igFI_.dom.s(a), c = igFI_.userAgent.IE && a.currentStyle;
	if (c && igFI_.dom.r(b).qa() && c.width != "auto" && c.height != "auto"
			&& !c.boxSizing) {
		var d = igFI_.style.eb(a, c.width, "width", "pixelWidth"), e = igFI_.style
				.eb(a, c.height, "height", "pixelHeight");
		return new igFI_.math.Size(d, e)
	} else {
		var f = igFI_.style.getBorderBoxSize(a), g = igFI_.style
				.getPaddingBox(a), h = igFI_.style.getBorderBox(a);
		return new igFI_.math.Size(f.width - h.left - g.left - g.right
						- h.right, f.height - h.top - g.top - g.bottom
						- h.bottom)
	}
};
igFI_.style.setContentBoxSize = function(a, b) {
	var c = igFI_.dom.s(a), d = igFI_.dom.r(c).qa();
	if (igFI_.userAgent.IE && (!d || !igFI_.userAgent.isVersion("8"))) {
		var e = a.style;
		if (d) {
			e.pixelWidth = b.width;
			e.pixelHeight = b.height
		} else {
			var f = igFI_.style.getPaddingBox(a), g = igFI_.style
					.getBorderBox(a);
			e.pixelWidth = b.width + g.left + f.left + f.right + g.right;
			e.pixelHeight = b.height + g.top + f.top + f.bottom + g.bottom
		}
	} else
		igFI_.style.ph(a, b, "content-box")
};
igFI_.style.ph = function(a, b, c) {
	var d = a.style;
	if (igFI_.userAgent.GECKO)
		d.MozBoxSizing = c;
	else if (igFI_.userAgent.WEBKIT)
		d.WebkitBoxSizing = c;
	else if (igFI_.userAgent.OPERA && !igFI_.userAgent.isVersion("9.50"))
		c ? d.setProperty("box-sizing", c) : d.removeProperty("box-sizing");
	else
		d.boxSizing = c;
	d.width = b.width + "px";
	d.height = b.height + "px"
};
igFI_.style.eb = function(a, b, c, d) {
	if (/^\d+px?$/.test(b))
		return parseInt(b, 10);
	else {
		var e = a.style[c], f = a.runtimeStyle[c];
		a.runtimeStyle[c] = a.currentStyle[c];
		a.style[c] = b;
		var g = a.style[d];
		a.style[c] = e;
		a.runtimeStyle[c] = f;
		return g
	}
};
igFI_.style.rc = function(a, b) {
	return igFI_.style.eb(a, igFI_.style.getCascadedStyle(a, b), "left",
			"pixelLeft")
};
igFI_.style.Rf = function(a, b) {
	if (igFI_.userAgent.IE) {
		var c = igFI_.style.rc(a, b + "Left"), d = igFI_.style.rc(a, b
						+ "Right"), e = igFI_.style.rc(a, b + "Top"), f = igFI_.style
				.rc(a, b + "Bottom");
		return new igFI_.math.Box(e, d, f, c)
	} else {
		c = igFI_.style.getComputedStyle(a, b + "Left");
		d = igFI_.style.getComputedStyle(a, b + "Right");
		e = igFI_.style.getComputedStyle(a, b + "Top");
		f = igFI_.style.getComputedStyle(a, b + "Bottom");
		return new igFI_.math.Box(parseFloat(e), parseFloat(d), parseFloat(f),
				parseFloat(c))
	}
};
igFI_.style.getPaddingBox = function(a) {
	return igFI_.style.Rf(a, "padding")
};
igFI_.style.getMarginBox = function(a) {
	return igFI_.style.Rf(a, "margin")
};
igFI_.style.xg = {
	thin : 2,
	medium : 4,
	thick : 6
};
igFI_.style.qc = function(a, b) {
	if (igFI_.style.getCascadedStyle(a, b + "Style") == "none")
		return 0;
	var c = igFI_.style.getCascadedStyle(a, b + "Width");
	if (c in igFI_.style.xg)
		return igFI_.style.xg[c];
	return igFI_.style.eb(a, c, "left", "pixelLeft")
};
igFI_.style.getBorderBox = function(a) {
	if (igFI_.userAgent.IE) {
		var b = igFI_.style.qc(a, "borderLeft"), c = igFI_.style.qc(a,
				"borderRight"), d = igFI_.style.qc(a, "borderTop"), e = igFI_.style
				.qc(a, "borderBottom");
		return new igFI_.math.Box(d, c, e, b)
	} else {
		b = igFI_.style.getComputedStyle(a, "borderLeftWidth");
		c = igFI_.style.getComputedStyle(a, "borderRightWidth");
		d = igFI_.style.getComputedStyle(a, "borderTopWidth");
		e = igFI_.style.getComputedStyle(a, "borderBottomWidth");
		return new igFI_.math.Box(parseFloat(d), parseFloat(c), parseFloat(e),
				parseFloat(b))
	}
};
igFI_.style.getFontFamily = function(a) {
	var b = igFI_.dom.s(a), c = "";
	if (b.createTextRange) {
		var d = b.body.createTextRange();
		d.moveToElementText(a);
		c = d.queryCommandValue("FontName")
	}
	if (!c) {
		c = igFI_.style.w(a, "fontFamily");
		if (igFI_.userAgent.OPERA && igFI_.userAgent.LINUX)
			c = c.replace(/ \[[^\]]*\]/, "")
	}
	var e = c.split(",");
	if (e.length > 1)
		c = e[0];
	return igFI_.string.stripQuotes(c, "\"'")
};
igFI_.style.mi = /[^\d]+$/;
igFI_.style.getLengthUnits = function(a) {
	var b = a.match(igFI_.style.mi);
	return b && b[0] || igFI_c
};
igFI_.style.Hh = {
	cm : 1,
	"in" : 1,
	mm : 1,
	pc : 1,
	pt : 1
};
igFI_.style.Kh = {
	em : 1,
	ex : 1
};
igFI_.style.getFontSize = function(a) {
	var b = igFI_.style.w(a, "fontSize"), c = igFI_.style.getLengthUnits(b);
	if (b && "px" == c)
		return parseInt(b, 10);
	if (igFI_.userAgent.IE)
		if (c in igFI_.style.Hh)
			return igFI_.style.eb(a, b, "left", "pixelLeft");
		else if (a.parentNode
				&& a.parentNode.nodeType == igFI_.dom.NodeType.ELEMENT
				&& c in igFI_.style.Kh) {
			var d = a.parentNode, e = igFI_.style.w(d, "fontSize");
			return igFI_.style.eb(d, b == e ? "1em" : b, "left", "pixelLeft")
		}
	var f = igFI_.dom.o("span", {
		style : "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
	});
	igFI_.dom.appendChild(a, f);
	b = f.offsetHeight;
	igFI_.dom.removeNode(f);
	return b
};
igFI_.style.parseStyleAttribute = function(a) {
	var b = {};
	igFI_.array.forEach(a.split(/\s*;\s*/), function(c) {
				var d = c.split(/\s*:\s*/);
				if (d.length == 2)
					b[igFI_.style.toCamelCase(d[0].toLowerCase())] = d[1]
			});
	return b
};
igFI_.style.toStyleAttribute = function(a) {
	var b = [];
	igFI_.object.forEach(a, function(c, d) {
				b.push(igFI_.style.toSelectorCase(d), ":", c, ";")
			});
	return b.join("")
};
igFI_.style.setFloat = function(a, b) {
	a.style[igFI_.userAgent.IE ? "styleFloat" : "cssFloat"] = b
};
igFI_.style.getFloat = function(a) {
	return a.style[igFI_.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
igFI_.Timer = function(a, b) {
	igFI_.events.EventTarget.call(this);
	this.Fb = a || 1;
	this.Zb = b || igFI_.Timer.defaultTimerObject;
	this.Yc = igFI_.bind(this.yh, this);
	this.de = igFI_.now()
};
igFI_.inherits(igFI_.Timer, igFI_.events.EventTarget);
igFI_.Timer.Ph = 2147483647;
igFI_.Timer.prototype.enabled = igFI_d;
igFI_.Timer.defaultTimerObject = igFI_.global.window;
igFI_.Timer.intervalScale = 0.8;
igFI_.Timer.prototype.ha = igFI_c;
igFI_.Timer.prototype.setInterval = function(a) {
	this.Fb = a;
	if (this.ha && this.enabled) {
		this.stop();
		this.start()
	} else
		this.ha && this.stop()
};
igFI_.Timer.prototype.yh = function() {
	if (this.enabled) {
		var a = igFI_.now() - this.de;
		if (a > 0 && a < this.Fb * igFI_.Timer.intervalScale)
			this.ha = this.Zb.setTimeout(this.Yc, this.Fb - a);
		else {
			this.Mf();
			if (this.enabled) {
				this.ha = this.Zb.setTimeout(this.Yc, this.Fb);
				this.de = igFI_.now()
			}
		}
	}
};
igFI_.Timer.prototype.Mf = function() {
	this.dispatchEvent(igFI_.Timer.TICK)
};
igFI_.Timer.prototype.start = function() {
	this.enabled = igFI_b;
	if (!this.ha) {
		this.ha = this.Zb.setTimeout(this.Yc, this.Fb);
		this.de = igFI_.now()
	}
};
igFI_.Timer.prototype.stop = function() {
	this.enabled = igFI_d;
	if (this.ha) {
		this.Zb.clearTimeout(this.ha);
		this.ha = igFI_c
	}
};
igFI_.Timer.prototype.b = function() {
	igFI_.Timer.q.b.call(this);
	this.stop();
	delete this.Zb
};
igFI_.Timer.TICK = "tick";
igFI_.Timer.sb = function(a, b, c) {
	if (igFI_.isFunction(a)) {
		if (c)
			a = igFI_.bind(a, c)
	} else if (a && typeof a.handleEvent == "function")
		a = igFI_.bind(a.handleEvent, a);
	else
		igFI_a(Error("Invalid listener argument"));
	return b > igFI_.Timer.Ph ? -1 : igFI_.Timer.defaultTimerObject.setTimeout(
			a, b || 0)
};
igFI_.Timer.clear = function(a) {
	igFI_.Timer.defaultTimerObject.clearTimeout(a)
};
igFI_.fx = {};
igFI_.fx.easing = {};
igFI_.fx.TIMEOUT = 20;
igFI_.fx.easing.easeIn = function(a) {
	return a * a * a
};
igFI_.fx.easing.easeOut = function(a) {
	return 1 - Math.pow(1 - a, 3)
};
igFI_.fx.easing.inAndOut = function(a) {
	return 3 * a * a - 2 * a * a * a
};
igFI_.fx.Animation = function(a, b, c, d) {
	igFI_.events.EventTarget.call(this);
	if (!igFI_.isArray(a) || !igFI_.isArray(b))
		igFI_a(Error("Start and end parameters must be arrays"));
	if (a.length != b.length)
		igFI_a(Error("Start and end points must be the same length"));
	this.startPoint = a;
	this.endPoint = b;
	this.duration = c;
	this.df = d;
	this.coords = []
};
igFI_.inherits(igFI_.fx.Animation, igFI_.events.EventTarget);
igFI_.fx.Animation.EventType = {
	PLAY : "play",
	BEGIN : "begin",
	RESUME : "resume",
	END : "end",
	STOP : "stop",
	FINISH : "finish",
	PAUSE : "pause",
	ANIMATE : "animate",
	DESTROY : "destroy"
};
igFI_.fx.Animation.State = {
	STOPPED : 0,
	PAUSED : -1,
	PLAYING : 1
};
igFI_.fx.Animation.Ga = {};
igFI_.fx.Animation.Na = igFI_c;
igFI_.fx.Animation.Cf = function() {
	igFI_.Timer.defaultTimerObject.clearTimeout(igFI_.fx.Animation.Na);
	var a = igFI_.now();
	for (var b in igFI_.fx.Animation.Ga)
		igFI_.fx.Animation.Ga[b].cycle(a);
	igFI_.fx.Animation.Na = igFI_.object.u(igFI_.fx.Animation.Ga)
			? igFI_c
			: igFI_.Timer.defaultTimerObject.setTimeout(igFI_.fx.Animation.Cf,
					igFI_.fx.TIMEOUT)
};
igFI_.fx.Animation.registerAnimation = function(a) {
	var b = igFI_.getHashCode(a);
	b in igFI_.fx.Animation.Ga || (igFI_.fx.Animation.Ga[b] = a);
	if (!igFI_.fx.Animation.Na)
		igFI_.fx.Animation.Na = igFI_.Timer.defaultTimerObject.setTimeout(
				igFI_.fx.Animation.Cf, igFI_.fx.TIMEOUT)
};
igFI_.fx.Animation.unregisterAnimation = function(a) {
	var b = igFI_.getHashCode(a);
	delete igFI_.fx.Animation.Ga[b];
	if (igFI_.fx.Animation.Na && igFI_.object.u(igFI_.fx.Animation.Ga)) {
		igFI_.Timer.defaultTimerObject.clearTimeout(igFI_.fx.Animation.Na);
		igFI_.fx.Animation.Na = igFI_c
	}
};
igFI_.fx.Animation.prototype.M = igFI_.fx.Animation.State.STOPPED;
igFI_.fx.Animation.prototype.yd = 0;
igFI_.fx.Animation.prototype.progress = 0;
igFI_.fx.Animation.prototype.Ca = igFI_c;
igFI_.fx.Animation.prototype.sd = igFI_c;
igFI_.fx.Animation.prototype.Hc = igFI_c;
igFI_.fx.Animation.prototype.play = function(a) {
	if (a || this.M == igFI_.fx.Animation.State.STOPPED) {
		this.progress = 0;
		this.coords = this.startPoint
	} else if (this.M == igFI_.fx.Animation.State.PLAYING)
		return igFI_d;
	igFI_.fx.Animation.unregisterAnimation(this);
	this.Ca = igFI_.now();
	if (this.M == igFI_.fx.Animation.State.PAUSED)
		this.Ca -= this.duration * this.progress;
	this.sd = this.Ca + this.duration;
	this.Hc = this.Ca;
	this.progress || this.H();
	this.$g();
	this.M == igFI_.fx.Animation.State.PAUSED && this.ah();
	this.M = igFI_.fx.Animation.State.PLAYING;
	igFI_.fx.Animation.registerAnimation(this);
	this.cycle(this.Ca);
	return igFI_b
};
igFI_.fx.Animation.prototype.stop = function(a) {
	igFI_.fx.Animation.unregisterAnimation(this);
	this.M = igFI_.fx.Animation.State.STOPPED;
	if (a)
		this.progress = 1;
	this.Uc(this.progress);
	this.bh();
	this.sa()
};
igFI_.fx.Animation.prototype.pause = function() {
	if (this.M == igFI_.fx.Animation.State.PLAYING) {
		igFI_.fx.Animation.unregisterAnimation(this);
		this.M = igFI_.fx.Animation.State.PAUSED;
		this.Zg()
	}
};
igFI_.fx.Animation.prototype.b = function() {
	this.M != igFI_.fx.Animation.State.STOPPED && this.stop(igFI_d);
	this.Xg();
	igFI_.fx.Animation.q.b.call(this)
};
igFI_.fx.Animation.prototype.cycle = function(a) {
	this.progress = (a - this.Ca) / (this.sd - this.Ca);
	if (this.progress >= 1)
		this.progress = 1;
	this.yd = 1000 / (a - this.Hc);
	this.Hc = a;
	igFI_.isFunction(this.df) ? this.Uc(this.df(this.progress)) : this
			.Uc(this.progress);
	if (this.progress == 1) {
		this.M = igFI_.fx.Animation.State.STOPPED;
		igFI_.fx.Animation.unregisterAnimation(this);
		this.Yg();
		this.sa()
	} else
		this.M == igFI_.fx.Animation.State.PLAYING && this.Lb()
};
igFI_.fx.Animation.prototype.Uc = function(a) {
	this.coords = new Array(this.startPoint.length);
	for (var b = 0; b < this.startPoint.length; b++)
		this.coords[b] = (this.endPoint[b] - this.startPoint[b]) * a
				+ this.startPoint[b]
};
igFI_.fx.Animation.prototype.Lb = function() {
	this.ba(igFI_.fx.Animation.EventType.ANIMATE)
};
igFI_.fx.Animation.prototype.H = function() {
	this.ba(igFI_.fx.Animation.EventType.BEGIN)
};
igFI_.fx.Animation.prototype.Xg = function() {
	this.ba(igFI_.fx.Animation.EventType.DESTROY)
};
igFI_.fx.Animation.prototype.sa = function() {
	this.ba(igFI_.fx.Animation.EventType.END)
};
igFI_.fx.Animation.prototype.Yg = function() {
	this.ba(igFI_.fx.Animation.EventType.FINISH)
};
igFI_.fx.Animation.prototype.Zg = function() {
	this.ba(igFI_.fx.Animation.EventType.PAUSE)
};
igFI_.fx.Animation.prototype.$g = function() {
	this.ba(igFI_.fx.Animation.EventType.PLAY)
};
igFI_.fx.Animation.prototype.ah = function() {
	this.ba(igFI_.fx.Animation.EventType.RESUME)
};
igFI_.fx.Animation.prototype.bh = function() {
	this.ba(igFI_.fx.Animation.EventType.STOP)
};
igFI_.fx.Animation.prototype.ba = function(a) {
	this.dispatchEvent(new igFI_.fx.AnimationEvent(a, this))
};
igFI_.fx.AnimationEvent = function(a, b) {
	igFI_.events.Event.call(this, a);
	this.coords = b.coords;
	this.x = b.coords[0];
	this.y = b.coords[1];
	this.z = b.coords[2];
	this.duration = b.duration;
	this.progress = b.progress;
	this.fps = b.yd;
	this.state = b.M;
	this.anim = b
};
igFI_.inherits(igFI_.fx.AnimationEvent, igFI_.events.Event);
igFI_.fx.dom = {};
igFI_.fx.dom.PredefinedEffect = function(a, b, c, d, e) {
	igFI_.fx.Animation.call(this, b, c, d, e);
	this.element = a
};
igFI_.inherits(igFI_.fx.dom.PredefinedEffect, igFI_.fx.Animation);
igFI_.fx.dom.PredefinedEffect.prototype.n = igFI_.nullFunction;
igFI_.fx.dom.PredefinedEffect.prototype.Lb = function() {
	this.n();
	igFI_.fx.dom.PredefinedEffect.q.Lb.call(this)
};
igFI_.fx.dom.PredefinedEffect.prototype.sa = function() {
	this.n();
	igFI_.fx.dom.PredefinedEffect.q.sa.call(this)
};
igFI_.fx.dom.PredefinedEffect.prototype.H = function() {
	this.n();
	igFI_.fx.dom.PredefinedEffect.q.H.call(this)
};
igFI_.fx.dom.Slide = function(a, b, c) {
	if (b.length != 2 || c.length != 2)
		igFI_a(Error("Start and end points must be 2D"));
	igFI_.fx.dom.PredefinedEffect.apply(this, arguments)
};
igFI_.inherits(igFI_.fx.dom.Slide, igFI_.fx.dom.PredefinedEffect);
igFI_.fx.dom.Slide.prototype.n = function() {
	this.element.style.left = Math.round(this.coords[0]) + "px";
	this.element.style.top = Math.round(this.coords[1]) + "px"
};
igFI_.fx.dom.SlideFrom = function(a, b, c, d) {
	var e = [a.offsetLeft, a.offsetTop];
	igFI_.fx.dom.Slide.call(this, a, e, b, c, d)
};
igFI_.inherits(igFI_.fx.dom.SlideFrom, igFI_.fx.dom.Slide);
igFI_.fx.dom.SlideFrom.prototype.H = function() {
	this.startPoint = [this.element.offsetLeft, this.element.offsetTop];
	igFI_.fx.dom.SlideFrom.q.H.call(this)
};
igFI_.fx.dom.Swipe = function(a, b, c) {
	if (b.length != 2 || c.length != 2)
		igFI_a(Error("Start and end points must be 2D"));
	igFI_.fx.dom.PredefinedEffect.apply(this, arguments);
	this.Pg = Math.max(this.endPoint[0], this.startPoint[0]);
	this.Og = Math.max(this.endPoint[1], this.startPoint[1])
};
igFI_.inherits(igFI_.fx.dom.Swipe, igFI_.fx.dom.PredefinedEffect);
igFI_.fx.dom.Swipe.prototype.n = function() {
	var a = this.coords[0], b = this.coords[1];
	this.sf(Math.round(a), Math.round(b), this.Pg, this.Og);
	this.element.style.width = Math.round(a) + "px";
	this.element.style.marginLeft = Math.round(a) - this.Pg + "px";
	this.element.style.marginTop = Math.round(b) - this.Og + "px"
};
igFI_.fx.dom.Swipe.prototype.sf = function(a, b, c, d) {
	this.element.style.clip = "rect(" + (d - b) + "px " + c + "px " + d + "px "
			+ (c - a) + "px)"
};
igFI_.fx.dom.Scroll = function(a, b, c) {
	if (b.length != 2 || c.length != 2)
		igFI_a(Error("Start and end points must be 2D"));
	igFI_.fx.dom.PredefinedEffect.apply(this, arguments)
};
igFI_.inherits(igFI_.fx.dom.Scroll, igFI_.fx.dom.PredefinedEffect);
igFI_.fx.dom.Scroll.prototype.n = function() {
	this.element.scrollLeft = Math.round(this.coords[0]);
	this.element.scrollTop = Math.round(this.coords[1])
};
igFI_.fx.dom.Resize = function(a, b, c) {
	if (b.length != 2 || c.length != 2)
		igFI_a(Error("Start and end points must be 2D"));
	igFI_.fx.dom.PredefinedEffect.apply(this, arguments)
};
igFI_.inherits(igFI_.fx.dom.Resize, igFI_.fx.dom.PredefinedEffect);
igFI_.fx.dom.Resize.prototype.n = function() {
	this.element.style.width = Math.round(this.coords[0]) + "px";
	this.element.style.height = Math.round(this.coords[1]) + "px"
};
igFI_.fx.dom.ResizeWidth = function(a, b, c, d, e) {
	igFI_.fx.dom.PredefinedEffect.call(this, a, [b], [c], d, e)
};
igFI_.inherits(igFI_.fx.dom.ResizeWidth, igFI_.fx.dom.PredefinedEffect);
igFI_.fx.dom.ResizeWidth.prototype.n = function() {
	this.element.style.width = Math.round(this.coords[0]) + "px"
};
igFI_.fx.dom.ResizeHeight = function(a, b, c, d, e) {
	igFI_.fx.dom.PredefinedEffect.call(this, a, [b], [c], d, e)
};
igFI_.inherits(igFI_.fx.dom.ResizeHeight, igFI_.fx.dom.PredefinedEffect);
igFI_.fx.dom.ResizeHeight.prototype.n = function() {
	this.element.style.height = Math.round(this.coords[0]) + "px"
};
igFI_.fx.dom.Fade = function(a, b, c, d, e) {
	if (igFI_.isNumber(b))
		b = [b];
	if (igFI_.isNumber(c))
		c = [c];
	igFI_.fx.dom.PredefinedEffect.call(this, a, b, c, d, e);
	if (b.length != 1 || c.length != 1)
		igFI_a(Error("Start and end points must be 1D"))
};
igFI_.inherits(igFI_.fx.dom.Fade, igFI_.fx.dom.PredefinedEffect);
igFI_.fx.dom.Fade.prototype.n = function() {
	igFI_.style.setOpacity(this.element, this.coords[0])
};
igFI_.fx.dom.Fade.prototype.show = function() {
	this.element.style.display = ""
};
igFI_.fx.dom.Fade.prototype.hide = function() {
	this.element.style.display = "none"
};
igFI_.fx.dom.FadeOut = function(a, b, c) {
	igFI_.fx.dom.Fade.call(this, a, 1, 0, b, c)
};
igFI_.inherits(igFI_.fx.dom.FadeOut, igFI_.fx.dom.Fade);
igFI_.fx.dom.FadeIn = function(a, b, c) {
	igFI_.fx.dom.Fade.call(this, a, 0, 1, b, c)
};
igFI_.inherits(igFI_.fx.dom.FadeIn, igFI_.fx.dom.Fade);
igFI_.fx.dom.FadeOutAndHide = function(a, b, c) {
	igFI_.fx.dom.Fade.call(this, a, 1, 0, b, c)
};
igFI_.inherits(igFI_.fx.dom.FadeOutAndHide, igFI_.fx.dom.Fade);
igFI_.fx.dom.FadeOutAndHide.prototype.H = function() {
	this.show();
	igFI_.fx.dom.FadeOutAndHide.q.H.call(this)
};
igFI_.fx.dom.FadeOutAndHide.prototype.sa = function() {
	this.hide();
	igFI_.fx.dom.FadeOutAndHide.q.sa.call(this)
};
igFI_.fx.dom.FadeInAndShow = function(a, b, c) {
	igFI_.fx.dom.Fade.call(this, a, 0, 1, b, c)
};
igFI_.inherits(igFI_.fx.dom.FadeInAndShow, igFI_.fx.dom.Fade);
igFI_.fx.dom.FadeInAndShow.prototype.H = function() {
	this.show();
	igFI_.fx.dom.FadeInAndShow.q.H.call(this)
};
igFI_.fx.dom.BgColorTransform = function(a, b, c) {
	if (b.length != 3 || c.length != 3)
		igFI_a(Error("Start and end points must be 3D"));
	igFI_.fx.dom.PredefinedEffect.apply(this, arguments)
};
igFI_.inherits(igFI_.fx.dom.BgColorTransform, igFI_.fx.dom.PredefinedEffect);
igFI_.fx.dom.BgColorTransform.prototype.qh = function() {
	for (var a = [], b = 0; b < this.coords.length; b++)
		a[b] = Math.round(this.coords[b]);
	var c = "rgb(" + a.join(",") + ")";
	this.element.style.backgroundColor = c
};
igFI_.fx.dom.BgColorTransform.prototype.n = function() {
	this.qh()
};
igFI_.fx.dom.bgColorFadeIn = function(a, b, c) {
	var d = a.style.backgroundColor || "", e = igFI_.style
			.getBackgroundColor(a), f;
	f = e != "transparent" && e != "rgba(0, 0, 0, 0)" ? igFI_.color
			.hexToRgb(igFI_.color.parse(e).hex) : [255, 255, 255];
	var g = new igFI_.fx.dom.BgColorTransform(a, b, f, c);
	igFI_.events.listen(g, igFI_.fx.Animation.EventType.END, function() {
				a.style.backgroundColor = d
			});
	g.play()
};
igFI_.fx.dom.ColorTransform = function(a, b, c) {
	if (b.length != 3 || c.length != 3)
		igFI_a(Error("Start and end points must be 3D"));
	igFI_.fx.dom.PredefinedEffect.apply(this, arguments)
};
igFI_.inherits(igFI_.fx.dom.ColorTransform, igFI_.fx.dom.PredefinedEffect);
igFI_.fx.dom.ColorTransform.prototype.n = function() {
	for (var a = [], b = 0; b < this.coords.length; b++)
		a[b] = Math.round(this.coords[b]);
	var c = "rgb(" + a.join(",") + ")";
	this.element.style.color = c
};
igFI_.asserts = {};
igFI_.asserts.assert = function(a, b) {
	if (igFI_.DEBUG && !a)
		igFI_a(Error("Assertion failed" + (b ? ": " + b : "")))
};
igFI_.asserts.fail = function(a) {
	if (igFI_.DEBUG)
		igFI_a(Error("Failure" + (a ? ": " + a : "")))
};
igFI_.asserts.assertNumber = function(a, b) {
	igFI_.asserts.assert(igFI_.isNumber(a), b)
};
igFI_.asserts.assertString = function(a, b) {
	igFI_.asserts.assert(igFI_.isString(a), b)
};
igFI_.asserts.assertFunction = function(a, b) {
	igFI_.asserts.assert(igFI_.isFunction(a), b)
};
igFI_.asserts.assertObject = function(a, b) {
	igFI_.asserts.assert(igFI_.isObject(a), b)
};
igFI_.asserts.assertInstanceof = function(a, b, c) {
	igFI_.asserts.assert(a instanceof b, c)
};
igFI_.iter = {};
igFI_.iter.Iterable = igFI_.typedef;
igFI_.iter.StopIteration = "StopIteration" in igFI_.global
		? igFI_.global.StopIteration
		: Error("StopIteration");
igFI_.iter.Iterator = function() {
};
igFI_.iter.Iterator.prototype.next = function() {
	igFI_a(igFI_.iter.StopIteration)
};
igFI_.iter.Iterator.prototype.__iterator__ = function() {
	return this
};
igFI_.iter.toIterator = function(a) {
	if (a instanceof igFI_.iter.Iterator)
		return a;
	if (typeof a.__iterator__ == "function")
		return a.__iterator__(igFI_d);
	if (igFI_.isArrayLike(a)) {
		var b = 0, c = new igFI_.iter.Iterator;
		c.next = function() {
			for (; 1;) {
				if (b >= a.length)
					igFI_a(igFI_.iter.StopIteration);
				if (b in a)
					return a[b++];
				else
					b++
			}
		};
		return c
	}
	igFI_a(Error("Not implemented"))
};
igFI_.iter.forEach = function(a, b, c) {
	if (igFI_.isArrayLike(a))
		try {
			igFI_.array.forEach(a, b, c)
		} catch (d) {
			if (d !== igFI_.iter.StopIteration)
				igFI_a(d)
		}
	else {
		a = igFI_.iter.toIterator(a);
		try {
			for (; 1;)
				b.call(c, a.next(), undefined, a)
		} catch (e) {
			if (e !== igFI_.iter.StopIteration)
				igFI_a(e)
		}
	}
};
igFI_.iter.filter = function(a, b, c) {
	a = igFI_.iter.toIterator(a);
	var d = new igFI_.iter.Iterator;
	d.next = function() {
		for (; 1;) {
			var e = a.next();
			if (b.call(c, e, undefined, a))
				return e
		}
	};
	return d
};
igFI_.iter.range = function(a, b, c) {
	var d = 0, e = a, f = c || 1;
	if (arguments.length > 1) {
		d = a;
		e = b
	}
	if (f == 0)
		igFI_a(Error("Range step argument must not be zero"));
	var g = new igFI_.iter.Iterator;
	g.next = function() {
		if (f > 0 && d >= e || f < 0 && d <= e)
			igFI_a(igFI_.iter.StopIteration);
		var h = d;
		d += f;
		return h
	};
	return g
};
igFI_.iter.join = function(a, b) {
	return igFI_.iter.toArray(a).join(b)
};
igFI_.iter.map = function(a, b, c) {
	a = igFI_.iter.toIterator(a);
	var d = new igFI_.iter.Iterator;
	d.next = function() {
		for (; 1;) {
			var e = a.next();
			return b.call(c, e, undefined, a)
		}
	};
	return d
};
igFI_.iter.reduce = function(a, b, c, d) {
	var e = c;
	igFI_.iter.forEach(a, function(f) {
				e = b.call(d, e, f)
			});
	return e
};
igFI_.iter.some = function(a, b, c) {
	a = igFI_.iter.toIterator(a);
	try {
		for (; 1;)
			if (b.call(c, a.next(), undefined, a))
				return igFI_b
	} catch (d) {
		if (d !== igFI_.iter.StopIteration)
			igFI_a(d)
	}
	return igFI_d
};
igFI_.iter.every = function(a, b, c) {
	a = igFI_.iter.toIterator(a);
	try {
		for (; 1;)
			if (!b.call(c, a.next(), undefined, a))
				return igFI_d
	} catch (d) {
		if (d !== igFI_.iter.StopIteration)
			igFI_a(d)
	}
	return igFI_b
};
igFI_.iter.chain = function() {
	var a = arguments, b = a.length, c = 0, d = new igFI_.iter.Iterator;
	d.next = function() {
		try {
			if (c >= b)
				igFI_a(igFI_.iter.StopIteration);
			var e = igFI_.iter.toIterator(a[c]);
			return e.next()
		} catch (f) {
			if (f !== igFI_.iter.StopIteration || c >= b)
				igFI_a(f);
			else {
				c++;
				return this.next()
			}
		}
	};
	return d
};
igFI_.iter.dropWhile = function(a, b, c) {
	a = igFI_.iter.toIterator(a);
	var d = new igFI_.iter.Iterator, e = igFI_b;
	d.next = function() {
		for (; 1;) {
			var f = a.next();
			if (!(e && b.call(c, f, undefined, a))) {
				e = igFI_d;
				return f
			}
		}
	};
	return d
};
igFI_.iter.takeWhile = function(a, b, c) {
	a = igFI_.iter.toIterator(a);
	var d = new igFI_.iter.Iterator, e = igFI_b;
	d.next = function() {
		for (; 1;)
			if (e) {
				var f = a.next();
				if (b.call(c, f, undefined, a))
					return f;
				else
					e = igFI_d
			} else
				igFI_a(igFI_.iter.StopIteration)
	};
	return d
};
igFI_.iter.toArray = function(a) {
	if (igFI_.isArrayLike(a))
		return igFI_.array.toArray(a);
	a = igFI_.iter.toIterator(a);
	var b = [];
	igFI_.iter.forEach(a, function(c) {
				b.push(c)
			});
	return b
};
igFI_.iter.equals = function(a, b) {
	a = igFI_.iter.toIterator(a);
	b = igFI_.iter.toIterator(b);
	var c, d;
	try {
		for (; 1;) {
			c = d = igFI_d;
			var e = a.next();
			c = igFI_b;
			var f = b.next();
			d = igFI_b;
			if (e != f)
				return igFI_d
		}
	} catch (g) {
		if (g !== igFI_.iter.StopIteration)
			igFI_a(g);
		else {
			if (c && !d)
				return igFI_d;
			if (!d)
				try {
					b.next();
					return igFI_d
				} catch (h) {
					if (h !== igFI_.iter.StopIteration)
						igFI_a(h);
					return igFI_b
				}
		}
	}
	return igFI_d
};
igFI_.iter.nextOrValue = function(a, b) {
	try {
		return igFI_.iter.toIterator(a).next()
	} catch (c) {
		if (c != igFI_.iter.StopIteration)
			igFI_a(c);
		return b
	}
};
igFI_.structs.T = function(a) {
	if (typeof a.T == "function")
		return a.T();
	if (igFI_.isArrayLike(a) || igFI_.isString(a))
		return a.length;
	return igFI_.object.T(a)
};
igFI_.structs.k = function(a) {
	if (typeof a.k == "function")
		return a.k();
	if (igFI_.isString(a))
		return a.split("");
	if (igFI_.isArrayLike(a)) {
		for (var b = [], c = a.length, d = 0; d < c; d++)
			b.push(a[d]);
		return b
	}
	return igFI_.object.k(a)
};
igFI_.structs.j = function(a) {
	if (typeof a.j == "function")
		return a.j();
	if (typeof a.k == "function")
		return undefined;
	if (igFI_.isArrayLike(a) || igFI_.isString(a)) {
		for (var b = [], c = a.length, d = 0; d < c; d++)
			b.push(d);
		return b
	}
	return igFI_.object.j(a)
};
igFI_.structs.contains = function(a, b) {
	if (typeof a.contains == "function")
		return a.contains(b);
	if (typeof a.ja == "function")
		return a.ja(b);
	if (igFI_.isArrayLike(a) || igFI_.isString(a))
		return igFI_.array.contains(a, b);
	return igFI_.object.ja(a, b)
};
igFI_.structs.u = function(a) {
	if (typeof a.u == "function")
		return a.u();
	if (igFI_.isArrayLike(a) || igFI_.isString(a))
		return igFI_.array.u(a);
	return igFI_.object.u(a)
};
igFI_.structs.clear = function(a) {
	if (typeof a.clear == "function")
		a.clear();
	else
		igFI_.isArrayLike(a) ? igFI_.array.clear(a) : igFI_.object.clear(a)
};
igFI_.structs.forEach = function(a, b, c) {
	if (typeof a.forEach == "function")
		a.forEach(b, c);
	else if (igFI_.isArrayLike(a) || igFI_.isString(a))
		igFI_.array.forEach(a, b, c);
	else
		for (var d = igFI_.structs.j(a), e = igFI_.structs.k(a), f = e.length, g = 0; g < f; g++)
			b.call(c, e[g], d && d[g], a)
};
igFI_.structs.filter = function(a, b, c) {
	if (typeof a.filter == "function")
		return a.filter(b, c);
	if (igFI_.isArrayLike(a) || igFI_.isString(a))
		return igFI_.array.filter(a, b, c);
	var d, e = igFI_.structs.j(a), f = igFI_.structs.k(a), g = f.length;
	if (e) {
		d = {};
		for (var h = 0; h < g; h++)
			if (b.call(c, f[h], e[h], a))
				d[e[h]] = f[h]
	} else {
		d = [];
		for (h = 0; h < g; h++)
			b.call(c, f[h], undefined, a) && d.push(f[h])
	}
	return d
};
igFI_.structs.map = function(a, b, c) {
	if (typeof a.map == "function")
		return a.map(b, c);
	if (igFI_.isArrayLike(a) || igFI_.isString(a))
		return igFI_.array.map(a, b, c);
	var d, e = igFI_.structs.j(a), f = igFI_.structs.k(a), g = f.length;
	if (e) {
		d = {};
		for (var h = 0; h < g; h++)
			d[e[h]] = b.call(c, f[h], e[h], a)
	} else {
		d = [];
		for (h = 0; h < g; h++)
			d[h] = b.call(c, f[h], undefined, a)
	}
	return d
};
igFI_.structs.some = function(a, b, c) {
	if (typeof a.some == "function")
		return a.some(b, c);
	if (igFI_.isArrayLike(a) || igFI_.isString(a))
		return igFI_.array.some(a, b, c);
	for (var d = igFI_.structs.j(a), e = igFI_.structs.k(a), f = e.length, g = 0; g < f; g++)
		if (b.call(c, e[g], d && d[g], a))
			return igFI_b;
	return igFI_d
};
igFI_.structs.every = function(a, b, c) {
	if (typeof a.every == "function")
		return a.every(b, c);
	if (igFI_.isArrayLike(a) || igFI_.isString(a))
		return igFI_.array.every(a, b, c);
	for (var d = igFI_.structs.j(a), e = igFI_.structs.k(a), f = e.length, g = 0; g < f; g++)
		if (!b.call(c, e[g], d && d[g], a))
			return igFI_d;
	return igFI_b
};
igFI_.structs.Map = function(a) {
	this.G = {};
	this.d = [];
	var b = arguments.length;
	if (b > 1) {
		if (b % 2)
			igFI_a(Error("Uneven number of arguments"));
		for (var c = 0; c < b; c += 2)
			this.set(arguments[c], arguments[c + 1])
	} else
		a && this.ff(a)
};
igFI_.structs.Map.prototype.g = 0;
igFI_.structs.Map.prototype.pb = 0;
igFI_.structs.Map.prototype.T = function() {
	return this.g
};
igFI_.structs.Map.prototype.k = function() {
	this.Xa();
	for (var a = [], b = 0; b < this.d.length; b++) {
		var c = this.d[b];
		a.push(this.G[c])
	}
	return a
};
igFI_.structs.Map.prototype.j = function() {
	this.Xa();
	return this.d.concat()
};
igFI_.structs.Map.prototype.C = function(a) {
	return igFI_.structs.Map.Oa(this.G, a)
};
igFI_.structs.Map.prototype.ja = function(a) {
	for (var b = 0; b < this.d.length; b++) {
		var c = this.d[b];
		if (igFI_.structs.Map.Oa(this.G, c) && this.G[c] == a)
			return igFI_b
	}
	return igFI_d
};
igFI_.structs.Map.prototype.equals = function(a, b) {
	if (this === a)
		return igFI_b;
	if (this.g != a.T())
		return igFI_d;
	var c = b || igFI_.structs.Map.defaultEquals;
	this.Xa();
	for (var d, e = 0; d = this.d[e]; e++)
		if (!c(this.get(d), a.get(d)))
			return igFI_d;
	return igFI_b
};
igFI_.structs.Map.defaultEquals = function(a, b) {
	return a === b
};
igFI_.structs.Map.prototype.u = function() {
	return this.g == 0
};
igFI_.structs.Map.prototype.clear = function() {
	this.G = {};
	this.pb = this.g = this.d.length = 0
};
igFI_.structs.Map.prototype.remove = function(a) {
	if (igFI_.structs.Map.Oa(this.G, a)) {
		delete this.G[a];
		this.g--;
		this.pb++;
		this.d.length > 2 * this.g && this.Xa();
		return igFI_b
	}
	return igFI_d
};
igFI_.structs.Map.prototype.Xa = function() {
	if (this.g != this.d.length) {
		for (var a = 0, b = 0; a < this.d.length;) {
			var c = this.d[a];
			if (igFI_.structs.Map.Oa(this.G, c))
				this.d[b++] = c;
			a++
		}
		this.d.length = b
	}
	if (this.g != this.d.length) {
		var d = {};
		for (b = a = 0; a < this.d.length;) {
			c = this.d[a];
			if (!igFI_.structs.Map.Oa(d, c)) {
				this.d[b++] = c;
				d[c] = 1
			}
			a++
		}
		this.d.length = b
	}
};
igFI_.structs.Map.prototype.get = function(a, b) {
	if (igFI_.structs.Map.Oa(this.G, a))
		return this.G[a];
	return b
};
igFI_.structs.Map.prototype.set = function(a, b) {
	if (!igFI_.structs.Map.Oa(this.G, a)) {
		this.g++;
		this.d.push(a);
		this.pb++
	}
	this.G[a] = b
};
igFI_.structs.Map.prototype.ff = function(a) {
	var b, c;
	if (a instanceof igFI_.structs.Map) {
		b = a.j();
		c = a.k()
	} else {
		b = igFI_.object.j(a);
		c = igFI_.object.k(a)
	}
	for (var d = 0; d < b.length; d++)
		this.set(b[d], c[d])
};
igFI_.structs.Map.prototype.clone = function() {
	return new igFI_.structs.Map(this)
};
igFI_.structs.Map.prototype.transpose = function() {
	for (var a = new igFI_.structs.Map, b = 0; b < this.d.length; b++) {
		var c = this.d[b], d = this.G[c];
		a.set(d, c)
	}
	return a
};
igFI_.structs.Map.prototype.__iterator__ = function(a) {
	this.Xa();
	var b = 0, c = this.d, d = this.G, e = this.pb, f = this, g = new igFI_.iter.Iterator;
	g.next = function() {
		for (; 1;) {
			if (e != f.pb)
				igFI_a(Error("The map has changed since the iterator was created"));
			if (b >= c.length)
				igFI_a(igFI_.iter.StopIteration);
			var h = c[b++];
			return a ? h : d[h]
		}
	};
	return g
};
igFI_.structs.Map.Oa = function(a, b) {
	return Object.prototype.hasOwnProperty.call(a, b)
};
igFI_.structs.Map.T = function(a) {
	return igFI_.structs.T(a)
};
igFI_.structs.Map.k = function(a) {
	return igFI_.structs.k(a)
};
igFI_.structs.Map.j = function(a) {
	if (typeof a.j == "function")
		return a.j();
	var b = [];
	if (igFI_.isArrayLike(a))
		for (var c = 0; c < a.length; c++)
			b.push(c);
	else
		return igFI_.object.j(a);
	return b
};
igFI_.structs.Map.C = function(a, b) {
	if (typeof a.C == "function")
		return a.C(b);
	if (igFI_.isArrayLike(a))
		return Number(b) < a.length;
	return igFI_.object.C(a, b)
};
igFI_.structs.Map.ja = function(a, b) {
	return igFI_.structs.contains(a, b)
};
igFI_.structs.Map.u = function(a) {
	return igFI_.structs.u(a)
};
igFI_.structs.Map.clear = function(a) {
	igFI_.structs.clear(a)
};
igFI_.structs.Map.remove = function(a, b) {
	if (typeof a.remove == "function")
		return a.remove(b);
	if (igFI_.isArrayLike(a))
		return igFI_.array.removeAt(a, Number(b));
	return igFI_.object.remove(a, b)
};
igFI_.structs.Map.add = function(a, b, c) {
	if (typeof a.add == "function")
		a.add(b, c);
	else if (igFI_.structs.Map.C(a, b))
		igFI_a(Error('The collection already contains the key "' + b + '"'));
	else
		igFI_.structs.Map.set(a, b, c)
};
igFI_.structs.Map.get = function(a, b, c) {
	if (typeof a.get == "function")
		return a.get(b, c);
	if (igFI_.structs.Map.C(a, b))
		return a[b];
	return c
};
igFI_.structs.Map.set = function(a, b, c) {
	if (typeof a.set == "function")
		a.set(b, c);
	else
		a[b] = c
};
igFI_.uri = {};
igFI_.uri.utils = {};
igFI_.uri.utils.qb = {
	AMPERSAND : 38,
	EQUAL : 61,
	HASH : 35,
	QUESTION : 63
};
igFI_.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
	var h = [];
	a && h.push(a, ":");
	if (c) {
		h.push("//");
		b && h.push(b, "@");
		h.push(c);
		d && h.push(":", d)
	}
	e && h.push(e);
	f && h.push("?", f);
	g && h.push("#", g);
	return h.join("")
};
igFI_.uri.utils.Ei = /^(?:([^:\/?#]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
igFI_.uri.utils.ComponentIndex = {
	SCHEME : 1,
	USER_INFO : 2,
	DOMAIN : 3,
	PORT : 4,
	PATH : 5,
	QUERY_DATA : 6,
	FRAGMENT : 7
};
igFI_.uri.utils.split = function(a) {
	return a.match(igFI_.uri.utils.Ei)
};
igFI_.uri.utils.dc = function(a) {
	return a && decodeURIComponent(a)
};
igFI_.uri.utils.db = function(a, b) {
	return igFI_.uri.utils.split(b)[a] || igFI_c
};
igFI_.uri.utils.vc = function(a) {
	return igFI_.uri.utils.db(igFI_.uri.utils.ComponentIndex.SCHEME, a)
};
igFI_.uri.utils.getUserInfoEncoded = function(a) {
	return igFI_.uri.utils.db(igFI_.uri.utils.ComponentIndex.USER_INFO, a)
};
igFI_.uri.utils.wc = function(a) {
	return igFI_.uri.utils.dc(igFI_.uri.utils.getUserInfoEncoded(a))
};
igFI_.uri.utils.getDomainEncoded = function(a) {
	return igFI_.uri.utils.db(igFI_.uri.utils.ComponentIndex.DOMAIN, a)
};
igFI_.uri.utils.yb = function(a) {
	return igFI_.uri.utils.dc(igFI_.uri.utils.getDomainEncoded(a))
};
igFI_.uri.utils.Ab = function(a) {
	return Number(igFI_.uri.utils.db(igFI_.uri.utils.ComponentIndex.PORT, a))
			|| igFI_c
};
igFI_.uri.utils.getPathEncoded = function(a) {
	return igFI_.uri.utils.db(igFI_.uri.utils.ComponentIndex.PATH, a)
};
igFI_.uri.utils.gb = function(a) {
	return igFI_.uri.utils.dc(igFI_.uri.utils.getPathEncoded(a))
};
igFI_.uri.utils.Pd = function(a) {
	return igFI_.uri.utils.db(igFI_.uri.utils.ComponentIndex.QUERY_DATA, a)
};
igFI_.uri.utils.getFragmentEncoded = function(a) {
	var b = a.indexOf("#");
	return b < 0 ? igFI_c : a.substr(b + 1)
};
igFI_.uri.utils.nc = function(a) {
	return igFI_.uri.utils.dc(igFI_.uri.utils.getFragmentEncoded(a))
};
igFI_.uri.utils.getHost = function(a) {
	var b = igFI_.uri.utils.split(a);
	return igFI_.uri.utils.buildFromEncodedParts(
			b[igFI_.uri.utils.ComponentIndex.SCHEME],
			b[igFI_.uri.utils.ComponentIndex.USER_INFO],
			b[igFI_.uri.utils.ComponentIndex.DOMAIN],
			b[igFI_.uri.utils.ComponentIndex.PORT])
};
igFI_.uri.utils.getPathAndAfter = function(a) {
	var b = igFI_.uri.utils.split(a);
	return igFI_.uri.utils.buildFromEncodedParts(igFI_c, igFI_c, igFI_c,
			igFI_c, b[igFI_.uri.utils.ComponentIndex.PATH],
			b[igFI_.uri.utils.ComponentIndex.QUERY_DATA],
			b[igFI_.uri.utils.ComponentIndex.FRAGMENT])
};
igFI_.uri.utils.removeFragment = function(a) {
	var b = a.indexOf("#");
	return b < 0 ? a : a.substr(0, b)
};
igFI_.uri.utils.haveSameDomain = function(a, b) {
	var c = igFI_.uri.utils.split(a), d = igFI_.uri.utils.split(b);
	return c[igFI_.uri.utils.ComponentIndex.DOMAIN] == d[igFI_.uri.utils.ComponentIndex.DOMAIN]
			&& c[igFI_.uri.utils.ComponentIndex.SCHEME] == d[igFI_.uri.utils.ComponentIndex.SCHEME]
			&& c[igFI_.uri.utils.ComponentIndex.PORT] == d[igFI_.uri.utils.ComponentIndex.PORT]
};
igFI_.uri.utils.Rh = function(a) {
	if (igFI_.DEBUG && (a.indexOf("#") >= 0 || a.indexOf("?") >= 0))
		igFI_a(Error("goog.uri.utils: Fragment or query identifiers are not supported: ["
				+ a + "]"))
};
igFI_.uri.utils.Xc = function(a) {
	if (a[1]) {
		var b = a[0], c = b.indexOf("#");
		if (c >= 0) {
			a.push(b.substr(c));
			a[0] = b = b.substr(0, c)
		}
		var d = b.indexOf("?");
		if (d < 0)
			a[1] = "?";
		else if (d == b.length - 1)
			a[1] = undefined
	}
	return a.join("")
};
igFI_.uri.utils.mf = function(a, b, c) {
	if (igFI_.isArray(b)) {
		b = b;
		for (var d = 0; d < b.length; d++)
			c.push("&", a, "=", igFI_.string.urlEncode(b[d]))
	} else
		b != igFI_c && c.push("&", a, "=", igFI_.string.urlEncode(b))
};
igFI_.uri.utils.qf = function(a, b, c) {
	igFI_.asserts.assert(Math.max(b.length - (c || 0), 0) % 2 == 0,
			"goog.uri.utils: Key/value lists must be even in length.");
	for (var d = c || 0; d < b.length; d += 2)
		igFI_.uri.utils.mf(b[d], b[d + 1], a);
	return a
};
igFI_.uri.utils.buildQueryData = function(a, b) {
	var c = igFI_.uri.utils.qf([], a, b);
	c[0] = "";
	return c.join("")
};
igFI_.uri.utils.pf = function(a, b) {
	for (var c in b)
		igFI_.uri.utils.mf(c, b[c], a);
	return a
};
igFI_.uri.utils.buildQueryDataFromMap = function(a) {
	var b = igFI_.uri.utils.pf([], a);
	b[0] = "";
	return b.join("")
};
igFI_.uri.utils.appendParams = function(a) {
	return igFI_.uri.utils.Xc(igFI_.uri.utils.qf([a], arguments, 1))
};
igFI_.uri.utils.appendParamsFromMap = function(a, b) {
	return igFI_.uri.utils.Xc(igFI_.uri.utils.pf([a], b))
};
igFI_.uri.utils.appendParam = function(a, b, c) {
	return igFI_.uri.utils.Xc([a, "&", b, "=", igFI_.string.urlEncode(c)])
};
igFI_.uri.utils.jc = function(a, b, c, d) {
	for (var e = b, f = c.length; (e = a.indexOf(c, e)) >= 0 && e < d;) {
		var g = a.charCodeAt(e - 1);
		if (g == igFI_.uri.utils.qb.AMPERSAND
				|| g == igFI_.uri.utils.qb.QUESTION) {
			var h = a.charCodeAt(e + f);
			if (!h || h == igFI_.uri.utils.qb.EQUAL
					|| h == igFI_.uri.utils.qb.AMPERSAND
					|| h == igFI_.uri.utils.qb.HASH)
				return e
		}
		e += f + 1
	}
	return -1
};
igFI_.uri.utils.Ac = /#|$/;
igFI_.uri.utils.hasParam = function(a, b) {
	return igFI_.uri.utils.jc(a, 0, b, a.search(igFI_.uri.utils.Ac)) >= 0
};
igFI_.uri.utils.getParamValue = function(a, b) {
	var c = a.search(igFI_.uri.utils.Ac), d = igFI_.uri.utils.jc(a, 0, b, c);
	if (d < 0)
		return igFI_c;
	else {
		var e = a.indexOf("&", d);
		if (e < 0 || e > c)
			e = c;
		d += b.length + 1;
		return igFI_.string.urlDecode(a.substr(d, e - d))
	}
};
igFI_.uri.utils.getParamValues = function(a, b) {
	for (var c = a.search(igFI_.uri.utils.Ac), d = 0, e, f = []; (e = igFI_.uri.utils
			.jc(a, d, b, c)) >= 0;) {
		d = a.indexOf("&", e);
		if (d < 0 || d > c)
			d = c;
		e += b.length + 1;
		f.push(igFI_.string.urlDecode(a.substr(e, d - e)))
	}
	return f
};
igFI_.uri.utils.Fi = /[?&]($|#)/;
igFI_.uri.utils.removeParam = function(a, b) {
	for (var c = a.search(igFI_.uri.utils.Ac), d = 0, e, f = []; (e = igFI_.uri.utils
			.jc(a, d, b, c)) >= 0;) {
		f.push(a.substring(d, e));
		d = Math.min(a.indexOf("&", e) + 1 || c, c)
	}
	f.push(a.substr(d));
	return f.join("").replace(igFI_.uri.utils.Fi, "$1")
};
igFI_.uri.utils.setParam = function(a, b, c) {
	return igFI_.uri.utils.appendParam(igFI_.uri.utils.removeParam(a, b), b, c)
};
igFI_.uri.utils.appendPath = function(a, b) {
	igFI_.uri.utils.Rh(a);
	if (igFI_.string.endsWith(a, "/"))
		a = a.substr(0, a.length - 1);
	if (igFI_.string.startsWith(b, "/"))
		b = b.substr(1);
	return igFI_.string.buildString(a, "/", b)
};
igFI_.uri.utils.StandardQueryParam = {
	RANDOM : "zx"
};
igFI_.uri.utils.Mg = function(a) {
	return igFI_.uri.utils.setParam(a,
			igFI_.uri.utils.StandardQueryParam.RANDOM, igFI_.string
					.getRandomString())
};
igFI_.Uri = function(a, b) {
	var c;
	if (a instanceof igFI_.Uri) {
		this.Ba(b == igFI_c ? a.eg() : b);
		this.Tb(a.vc());
		this.Ub(a.wc());
		this.Nb(a.yb());
		this.Sb(a.Ab());
		this.Rb(a.gb());
		this.Rc(a.Pd().clone());
		this.Ob(a.nc())
	} else if (a && (c = igFI_.uri.utils.split(String(a)))) {
		this.Ba(!!b);
		this.Tb(c[igFI_.uri.utils.ComponentIndex.SCHEME] || "", igFI_b);
		this.Ub(c[igFI_.uri.utils.ComponentIndex.USER_INFO] || "", igFI_b);
		this.Nb(c[igFI_.uri.utils.ComponentIndex.DOMAIN] || "", igFI_b);
		this.Sb(c[igFI_.uri.utils.ComponentIndex.PORT]);
		this.Rb(c[igFI_.uri.utils.ComponentIndex.PATH] || "", igFI_b);
		this.ve(c[igFI_.uri.utils.ComponentIndex.QUERY_DATA] || "", igFI_b);
		this.Ob(c[igFI_.uri.utils.ComponentIndex.FRAGMENT] || "", igFI_b)
	} else {
		this.Ba(!!b);
		this.J = new igFI_.Uri.QueryData(igFI_c, this, this.Z)
	}
};
igFI_.Uri.RANDOM_PARAM = igFI_.uri.utils.StandardQueryParam.RANDOM;
igFI_.Uri.prototype.fa = "";
igFI_.Uri.prototype.Wa = "";
igFI_.Uri.prototype.Ja = "";
igFI_.Uri.prototype.Sa = igFI_c;
igFI_.Uri.prototype.Ra = "";
igFI_.Uri.prototype.Ka = "";
igFI_.Uri.prototype.Eg = igFI_d;
igFI_.Uri.prototype.Z = igFI_d;
igFI_.Uri.prototype.toString = function() {
	if (this.V)
		return this.V;
	var a = [];
	this.fa && a.push(igFI_.Uri.xb(this.fa, igFI_.Uri.ih), ":");
	if (this.Ja) {
		a.push("//");
		this.Wa && a.push(igFI_.Uri.xb(this.Wa, igFI_.Uri.ih), "@");
		a.push(igFI_.Uri.di(this.Ja));
		this.Sa != igFI_c && a.push(":", String(this.Ab()))
	}
	this.Ra && a.push(igFI_.Uri.xb(this.Ra, igFI_.Uri.Ai));
	var b = String(this.J);
	b && a.push("?", b);
	this.Ka && a.push("#", igFI_.Uri.xb(this.Ka, igFI_.Uri.zi));
	return this.V = a.join("")
};
igFI_.Uri.prototype.resolve = function(a) {
	var b = this.clone(), c = a.sg();
	if (c)
		b.Tb(a.vc());
	else
		c = a.tg();
	if (c)
		b.Ub(a.wc());
	else
		c = a.Vd();
	if (c)
		b.Nb(a.yb());
	else
		c = a.qg();
	var d = a.gb();
	if (c)
		b.Sb(a.Ab());
	else if (c = a.Wd()) {
		if (d.charAt(0) != "/")
			if (this.Vd() && !this.Wd())
				d = "/" + d;
			else {
				var e = b.gb().lastIndexOf("/");
				if (e != -1)
					d = b.gb().substr(0, e + 1) + d
			}
		d = igFI_.Uri.removeDotSegments(d)
	}
	if (c)
		b.Rb(d);
	else
		c = a.rg();
	if (c)
		b.ve(a.Wf());
	else
		c = a.pg();
	c && b.Ob(a.nc());
	return b
};
igFI_.Uri.prototype.clone = function() {
	return igFI_.Uri.create(this.fa, this.Wa, this.Ja, this.Sa, this.Ra, this.J
					.clone(), this.Ka, this.Z)
};
igFI_.Uri.prototype.vc = function() {
	return this.fa
};
igFI_.Uri.prototype.Tb = function(a, b) {
	this.W();
	delete this.V;
	if (this.fa = b ? igFI_.Uri.Za(a) : a)
		this.fa = this.fa.replace(/:$/, "");
	return this
};
igFI_.Uri.prototype.sg = function() {
	return !!this.fa
};
igFI_.Uri.prototype.wc = function() {
	return this.Wa
};
igFI_.Uri.prototype.Ub = function(a, b) {
	this.W();
	delete this.V;
	this.Wa = b ? igFI_.Uri.Za(a) : a;
	return this
};
igFI_.Uri.prototype.tg = function() {
	return !!this.Wa
};
igFI_.Uri.prototype.yb = function() {
	return this.Ja
};
igFI_.Uri.prototype.Nb = function(a, b) {
	this.W();
	delete this.V;
	this.Ja = b ? igFI_.Uri.Za(a) : a;
	return this
};
igFI_.Uri.prototype.Vd = function() {
	return !!this.Ja
};
igFI_.Uri.prototype.Ab = function() {
	return this.Sa
};
igFI_.Uri.prototype.Sb = function(a) {
	this.W();
	delete this.V;
	if (a) {
		a = Number(a);
		if (isNaN(a) || a < 0)
			igFI_a(Error("Bad port number " + a));
		this.Sa = a
	} else
		this.Sa = igFI_c;
	return this
};
igFI_.Uri.prototype.qg = function() {
	return this.Sa != igFI_c
};
igFI_.Uri.prototype.gb = function() {
	return this.Ra
};
igFI_.Uri.prototype.Rb = function(a, b) {
	this.W();
	delete this.V;
	this.Ra = b ? igFI_.Uri.Za(a) : a;
	return this
};
igFI_.Uri.prototype.Wd = function() {
	return !!this.Ra
};
igFI_.Uri.prototype.rg = function() {
	return this.J.toString() !== ""
};
igFI_.Uri.prototype.Rc = function(a, b) {
	this.W();
	delete this.V;
	if (a instanceof igFI_.Uri.QueryData) {
		this.J = a;
		this.J.v = this;
		this.J.Ba(this.Z)
	} else {
		b || (a = igFI_.Uri.xb(a, igFI_.Uri.Bi));
		this.J = new igFI_.Uri.QueryData(a, this, this.Z)
	}
	return this
};
igFI_.Uri.prototype.ve = function(a, b) {
	return this.Rc(a, b)
};
igFI_.Uri.prototype.Wf = function() {
	return this.J.Bh()
};
igFI_.Uri.prototype.Pd = function() {
	return this.J
};
igFI_.Uri.prototype.L = function(a, b) {
	this.W();
	delete this.V;
	this.J.set(a, b);
	return this
};
igFI_.Uri.prototype.fb = function(a) {
	return this.J.get(a)
};
igFI_.Uri.prototype.nc = function() {
	return this.Ka
};
igFI_.Uri.prototype.Ob = function(a, b) {
	this.W();
	delete this.V;
	this.Ka = b ? igFI_.Uri.Za(a) : a;
	return this
};
igFI_.Uri.prototype.pg = function() {
	return !!this.Ka
};
igFI_.Uri.prototype.Mg = function() {
	this.W();
	this.L(igFI_.Uri.RANDOM_PARAM, igFI_.string.getRandomString());
	return this
};
igFI_.Uri.prototype.removeParameter = function(a) {
	this.W();
	this.J.remove(a);
	return this
};
igFI_.Uri.prototype.W = function() {
	if (this.Eg)
		igFI_a(Error("Tried to modify a read-only Uri"))
};
igFI_.Uri.prototype.Ba = function(a) {
	this.Z = a;
	this.J && this.J.Ba(a)
};
igFI_.Uri.prototype.eg = function() {
	return this.Z
};
igFI_.Uri.parse = function(a, b) {
	return a instanceof igFI_.Uri ? a.clone() : new igFI_.Uri(a, b)
};
igFI_.Uri.create = function(a, b, c, d, e, f, g, h) {
	var i = new igFI_.Uri(igFI_c, h);
	a && i.Tb(a);
	b && i.Ub(b);
	c && i.Nb(c);
	d && i.Sb(d);
	e && i.Rb(e);
	f && i.Rc(f);
	g && i.Ob(g);
	return i
};
igFI_.Uri.resolve = function(a, b) {
	a instanceof igFI_.Uri || (a = igFI_.Uri.parse(a));
	b instanceof igFI_.Uri || (b = igFI_.Uri.parse(b));
	return a.resolve(b)
};
igFI_.Uri.removeDotSegments = function(a) {
	if (a == ".." || a == ".")
		return "";
	else if (!igFI_.string.contains(a, "./") && !igFI_.string.contains(a, "/."))
		return a;
	else {
		for (var b = igFI_.string.startsWith(a, "/"), c = a.split("/"), d = [], e = 0; e < c.length;) {
			var f = c[e++];
			if (f == ".")
				b && e == c.length && d.push("");
			else if (f == "..") {
				if (d.length > 1 || d.length == 1 && d[0] != "")
					d.pop();
				b && e == c.length && d.push("")
			} else {
				d.push(f);
				b = igFI_b
			}
		}
		return d.join("/")
	}
};
igFI_.Uri.Za = function(a) {
	return a ? decodeURIComponent(a) : ""
};
igFI_.Uri.di = function(a) {
	if (igFI_.isString(a))
		return encodeURIComponent(a);
	return igFI_c
};
igFI_.Uri.ci = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
igFI_.Uri.xb = function(a, b) {
	var c = igFI_c;
	if (igFI_.isString(a)) {
		c = a;
		igFI_.Uri.ci.test(c) || (c = encodeURI(a));
		if (c.search(b) >= 0)
			c = c.replace(b, igFI_.Uri.bi)
	}
	return c
};
igFI_.Uri.bi = function(a) {
	var b = a.charCodeAt(0);
	return "%" + (b >> 4 & 15).toString(16) + (b & 15).toString(16)
};
igFI_.Uri.ih = /[#\/\?@]/g;
igFI_.Uri.Ai = /[\#\?]/g;
igFI_.Uri.Bi = /[\#\?@]/g;
igFI_.Uri.zi = /#/g;
igFI_.Uri.haveSameDomain = function(a, b) {
	var c = igFI_.uri.utils.split(a), d = igFI_.uri.utils.split(b);
	return c[igFI_.uri.utils.ComponentIndex.DOMAIN] == d[igFI_.uri.utils.ComponentIndex.DOMAIN]
			&& c[igFI_.uri.utils.ComponentIndex.PORT] == d[igFI_.uri.utils.ComponentIndex.PORT]
};
igFI_.Uri.QueryData = function(a, b, c) {
	this.ka = a || igFI_c;
	this.v = b || igFI_c;
	this.Z = !!c
};
igFI_.Uri.QueryData.prototype.X = function() {
	if (!this.i) {
		this.i = new igFI_.structs.Map;
		if (this.ka)
			for (var a = this.ka.split("&"), b = 0; b < a.length; b++) {
				var c = a[b].indexOf("="), d = igFI_c, e = igFI_c;
				if (c >= 0) {
					d = a[b].substring(0, c);
					e = a[b].substring(c + 1)
				} else
					d = a[b];
				d = igFI_.string.urlDecode(d);
				d = this.ya(d);
				this.add(d, e ? igFI_.string.urlDecode(e) : "")
			}
	}
};
igFI_.Uri.QueryData.createFromMap = function(a, b, c) {
	var d = igFI_.structs.j(a);
	if (typeof d == "undefined")
		igFI_a(Error("Keys are undefined"));
	return igFI_.Uri.QueryData
			.createFromKeysValues(d, igFI_.structs.k(a), b, c)
};
igFI_.Uri.QueryData.createFromKeysValues = function(a, b, c, d) {
	if (a.length != b.length)
		igFI_a(Error("Mismatched lengths for keys/values"));
	for (var e = new igFI_.Uri.QueryData(igFI_c, c, d), f = 0; f < a.length; f++)
		e.add(a[f], b[f]);
	return e
};
igFI_.Uri.QueryData.prototype.i = igFI_c;
igFI_.Uri.QueryData.prototype.g = igFI_c;
igFI_.Uri.QueryData.Ia = igFI_c;
igFI_.Uri.QueryData.prototype.T = function() {
	this.X();
	return this.g
};
igFI_.Uri.QueryData.prototype.add = function(a, b) {
	this.X();
	this.ib();
	a = this.ya(a);
	if (this.C(a)) {
		var c = this.i.get(a);
		igFI_.isArray(c) ? c.push(b) : this.i.set(a, [c, b])
	} else
		this.i.set(a, b);
	this.g++;
	return this
};
igFI_.Uri.QueryData.prototype.remove = function(a) {
	this.X();
	a = this.ya(a);
	if (this.i.C(a)) {
		this.ib();
		var b = this.i.get(a);
		if (igFI_.isArray(b))
			this.g -= b.length;
		else
			this.g--;
		return this.i.remove(a)
	}
	return igFI_d
};
igFI_.Uri.QueryData.prototype.clear = function() {
	this.ib();
	this.i && this.i.clear();
	this.g = 0
};
igFI_.Uri.QueryData.prototype.u = function() {
	this.X();
	return this.g == 0
};
igFI_.Uri.QueryData.prototype.C = function(a) {
	this.X();
	a = this.ya(a);
	return this.i.C(a)
};
igFI_.Uri.QueryData.prototype.ja = function(a) {
	var b = this.k();
	return igFI_.array.contains(b, a)
};
igFI_.Uri.QueryData.prototype.j = function() {
	this.X();
	for (var a = this.i.k(), b = this.i.j(), c = [], d = 0; d < b.length; d++) {
		var e = a[d];
		if (igFI_.isArray(e))
			for (var f = 0; f < e.length; f++)
				c.push(b[d]);
		else
			c.push(b[d])
	}
	return c
};
igFI_.Uri.QueryData.prototype.k = function(a) {
	this.X();
	var b;
	if (a) {
		var c = this.ya(a);
		if (this.C(c)) {
			var d = this.i.get(c);
			if (igFI_.isArray(d))
				return d;
			else {
				b = [];
				b.push(d)
			}
		} else
			b = []
	} else {
		var e = this.i.k();
		b = [];
		for (var f = 0; f < e.length; f++) {
			var g = e[f];
			igFI_.isArray(g) ? igFI_.array.extend(b, g) : b.push(g)
		}
	}
	return b
};
igFI_.Uri.QueryData.prototype.set = function(a, b) {
	this.X();
	this.ib();
	a = this.ya(a);
	if (this.C(a)) {
		var c = this.i.get(a);
		if (igFI_.isArray(c))
			this.g -= c.length;
		else
			this.g--
	}
	this.i.set(a, b);
	this.g++;
	return this
};
igFI_.Uri.QueryData.prototype.get = function(a, b) {
	this.X();
	a = this.ya(a);
	if (this.C(a)) {
		var c = this.i.get(a);
		return igFI_.isArray(c) ? c[0] : c
	} else
		return b
};
igFI_.Uri.QueryData.prototype.toString = function() {
	if (this.ka)
		return this.ka;
	if (!this.i)
		return "";
	for (var a = [], b = 0, c = this.i.j(), d = 0; d < c.length; d++) {
		var e = c[d], f = igFI_.string.urlEncode(e), g = this.i.get(e);
		if (igFI_.isArray(g))
			for (var h = 0; h < g.length; h++) {
				b > 0 && a.push("&");
				a.push(f, "=", igFI_.string.urlEncode(g[h]));
				b++
			}
		else {
			b > 0 && a.push("&");
			a.push(f, "=", igFI_.string.urlEncode(g));
			b++
		}
	}
	return this.ka = a.join("")
};
igFI_.Uri.QueryData.prototype.Bh = function() {
	if (!this.Ia)
		this.Ia = igFI_.Uri.Za(this.toString());
	return this.Ia
};
igFI_.Uri.QueryData.prototype.ib = function() {
	delete this.Ia;
	delete this.ka;
	this.v && delete this.v.V
};
igFI_.Uri.QueryData.prototype.clone = function() {
	var a = new igFI_.Uri.QueryData;
	if (this.Ia)
		a.Ia = this.Ia;
	if (this.ka)
		a.ka = this.ka;
	if (this.i)
		a.i = this.i.clone();
	return a
};
igFI_.Uri.QueryData.prototype.ya = function(a) {
	var b = String(a);
	if (this.Z)
		b = b.toLowerCase();
	return b
};
igFI_.Uri.QueryData.prototype.Ba = function(a) {
	var b = a && !this.Z;
	if (b) {
		this.X();
		this.ib();
		igFI_.structs.forEach(this.i, function(c, d) {
					var e = d.toLowerCase();
					if (d != e) {
						this.remove(d);
						this.add(e, c)
					}
				}, this)
	}
	this.Z = a
};
igFI_.Uri.QueryData.prototype.extend = function() {
	for (var a = 0; a < arguments.length; a++) {
		var b = arguments[a];
		igFI_.structs.forEach(b, function(c, d) {
					this.add(d, c)
				}, this)
	}
};
igFI_.events.EventHandler = function(a) {
	this.Ud = a
};
igFI_.inherits(igFI_.events.EventHandler, igFI_.Disposable);
igFI_.events.EventHandler.KEY_POOL_INITIAL_COUNT = 0;
igFI_.events.EventHandler.KEY_POOL_MAX_COUNT = 100;
igFI_.events.EventHandler.Ig = new igFI_.structs.SimplePool(
		igFI_.events.EventHandler.KEY_POOL_INITIAL_COUNT,
		igFI_.events.EventHandler.KEY_POOL_MAX_COUNT);
igFI_.events.EventHandler.d = igFI_c;
igFI_.events.EventHandler.ra = igFI_c;
igFI_.events.EventHandler.prototype.listen = function(a, b, c, d, e) {
	if (igFI_.isArray(b))
		for (var f = 0; f < b.length; f++)
			this.listen(a, b[f], c, d, e);
	else {
		var g = igFI_.events.listen(a, b, c || this, d || igFI_d, e || this.Ud
						|| this);
		this.pe(g)
	}
	return this
};
igFI_.events.EventHandler.prototype.Jb = function(a, b, c, d, e) {
	if (igFI_.isArray(b))
		for (var f = 0; f < b.length; f++)
			this.Jb(a, b[f], c, d, e);
	else {
		var g = igFI_.events.Jb(a, b, c || this, d || igFI_d, e || this.Ud
						|| this);
		this.pe(g)
	}
	return this
};
igFI_.events.EventHandler.prototype.Kg = function(a, b, c, d, e) {
	b.listen(a, c, d, e, this)
};
igFI_.events.EventHandler.prototype.pe = function(a) {
	if (this.d)
		this.d[a] = igFI_b;
	else if (this.ra) {
		this.d = igFI_.events.EventHandler.Ig.Y();
		this.d[this.ra] = igFI_b;
		this.ra = igFI_c;
		this.d[a] = igFI_b
	} else
		this.ra = a
};
igFI_.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
	if (this.ra || this.d)
		if (igFI_.isArray(b))
			for (var f = 0; f < b.length; f++)
				this.unlisten(a, b[f], c, d, e);
		else {
			var g = igFI_.events.getListener(a, b, c || this, d || igFI_d, e
							|| this.Ud || this);
			if (g) {
				var h = g.key;
				igFI_.events.unlistenByKey(h);
				if (this.d)
					igFI_.object.remove(this.d, h);
				else if (this.ra == h)
					this.ra = igFI_c
			}
		}
	return this
};
igFI_.events.EventHandler.prototype.Ch = function(a, b, c, d, e) {
	b.unlisten(a, c, d, e, this)
};
igFI_.events.EventHandler.prototype.Ta = function() {
	if (this.d) {
		for (var a in this.d) {
			igFI_.events.unlistenByKey(a);
			delete this.d[a]
		}
		igFI_.events.EventHandler.Ig.$(this.d);
		this.d = igFI_c
	} else
		this.ra && igFI_.events.unlistenByKey(this.ra)
};
igFI_.events.EventHandler.prototype.b = function() {
	igFI_.events.EventHandler.q.b.call(this);
	this.Ta()
};
igFI_.events.EventHandler.prototype.handleEvent = function() {
	igFI_a(Error("EventHandler.handleEvent not implemented"))
};
igFI_.ui = {};
igFI_.ui.IdGenerator = function() {
};
igFI_.addSingletonGetter(igFI_.ui.IdGenerator);
igFI_.ui.IdGenerator.prototype.Vg = 0;
igFI_.ui.IdGenerator.prototype.fg = function() {
	return ":" + (this.Vg++).toString(36)
};
igFI_.ui.IdGenerator.instance = igFI_.ui.IdGenerator.getInstance();
igFI_.ui.Component = function(a) {
	igFI_.events.EventTarget.call(this);
	this.bb = a || igFI_.dom.r();
	this.Mb = igFI_.ui.Component.Ef
};
igFI_.inherits(igFI_.ui.Component, igFI_.events.EventTarget);
igFI_.ui.Component.prototype.wg = igFI_.ui.IdGenerator.getInstance();
igFI_.ui.Component.Ef = igFI_c;
igFI_.ui.Component.EventType = {
	BEFORE_SHOW : "beforeshow",
	SHOW : "show",
	HIDE : "hide",
	DISABLE : "disable",
	ENABLE : "enable",
	HIGHLIGHT : "highlight",
	UNHIGHLIGHT : "unhighlight",
	ACTIVATE : "activate",
	DEACTIVATE : "deactivate",
	SELECT : "select",
	UNSELECT : "unselect",
	CHECK : "check",
	UNCHECK : "uncheck",
	FOCUS : "focus",
	BLUR : "blur",
	OPEN : "open",
	CLOSE : "close",
	ENTER : "enter",
	LEAVE : "leave",
	ACTION : "action",
	CHANGE : "change"
};
igFI_.ui.Component.Error = {
	NOT_SUPPORTED : "Method not supported",
	DECORATE_INVALID : "Invalid element to decorate",
	ALREADY_RENDERED : "Component already rendered",
	PARENT_UNABLE_TO_BE_SET : "Unable to set parent component",
	CHILD_INDEX_OUT_OF_BOUNDS : "Child component index out of bounds",
	NOT_OUR_CHILD : "Child is not in parent component",
	NOT_IN_DOCUMENT : "Operation not supported while component is not in document",
	STATE_INVALID : "Invalid component state"
};
igFI_.ui.Component.State = {
	ALL : 255,
	DISABLED : 1,
	HOVER : 2,
	ACTIVE : 4,
	SELECTED : 8,
	CHECKED : 16,
	FOCUSED : 32,
	OPENED : 64
};
igFI_.ui.Component.getStateTransitionEvent = function(a, b) {
	switch (a) {
		case igFI_.ui.Component.State.DISABLED :
			return b
					? igFI_.ui.Component.EventType.DISABLE
					: igFI_.ui.Component.EventType.ENABLE;
		case igFI_.ui.Component.State.HOVER :
			return b
					? igFI_.ui.Component.EventType.HIGHLIGHT
					: igFI_.ui.Component.EventType.UNHIGHLIGHT;
		case igFI_.ui.Component.State.ACTIVE :
			return b
					? igFI_.ui.Component.EventType.ACTIVATE
					: igFI_.ui.Component.EventType.DEACTIVATE;
		case igFI_.ui.Component.State.SELECTED :
			return b
					? igFI_.ui.Component.EventType.SELECT
					: igFI_.ui.Component.EventType.UNSELECT;
		case igFI_.ui.Component.State.CHECKED :
			return b
					? igFI_.ui.Component.EventType.CHECK
					: igFI_.ui.Component.EventType.UNCHECK;
		case igFI_.ui.Component.State.FOCUSED :
			return b
					? igFI_.ui.Component.EventType.FOCUS
					: igFI_.ui.Component.EventType.BLUR;
		case igFI_.ui.Component.State.OPENED :
			return b
					? igFI_.ui.Component.EventType.OPEN
					: igFI_.ui.Component.EventType.CLOSE;
		default :
	}
	igFI_a(Error(igFI_.ui.Component.Error.STATE_INVALID))
};
igFI_.ui.Component.setDefaultRightToLeft = function(a) {
	igFI_.ui.Component.Ef = a
};
igFI_.ui.Component.prototype.Db = igFI_c;
igFI_.ui.Component.prototype.bb = igFI_c;
igFI_.ui.Component.prototype.Pa = igFI_d;
igFI_.ui.Component.prototype.f = igFI_c;
igFI_.ui.Component.prototype.Mb = igFI_c;
igFI_.ui.Component.prototype.Sg = igFI_c;
igFI_.ui.Component.prototype.K = igFI_c;
igFI_.ui.Component.prototype.ia = igFI_c;
igFI_.ui.Component.prototype.tb = igFI_c;
igFI_.ui.Component.prototype.Fh = igFI_d;
igFI_.ui.Component.prototype.dg = function() {
	return this.Db || (this.Db = this.wg.fg())
};
igFI_.ui.Component.prototype.oa = function() {
	return this.f
};
igFI_.ui.Component.prototype.rh = function(a) {
	this.f = a
};
igFI_.ui.Component.prototype.Pb = function(a) {
	if (this == a)
		igFI_a(Error(igFI_.ui.Component.Error.PARENT_UNABLE_TO_BE_SET));
	if (a && this.K && this.Db && this.K.Ad(this.Db) && this.K != a)
		igFI_a(Error(igFI_.ui.Component.Error.PARENT_UNABLE_TO_BE_SET));
	this.K = a;
	igFI_.ui.Component.q.Qb.call(this, a)
};
igFI_.ui.Component.prototype.Qb = function(a) {
	if (this.K && this.K != a)
		igFI_a(Error(igFI_.ui.Component.Error.NOT_SUPPORTED));
	igFI_.ui.Component.q.Qb.call(this, a)
};
igFI_.ui.Component.prototype.r = function() {
	return this.bb
};
igFI_.ui.Component.prototype.Cc = function() {
	return this.Pa
};
igFI_.ui.Component.prototype.o = function() {
	this.f = this.bb.createElement("div")
};
igFI_.ui.Component.prototype.render = function(a) {
	this.oh(a)
};
igFI_.ui.Component.prototype.oh = function(a, b) {
	if (this.Pa)
		igFI_a(Error(igFI_.ui.Component.Error.ALREADY_RENDERED));
	this.f || this.o();
	a ? a.insertBefore(this.f, b || igFI_c) : this.bb.ma().body
			.appendChild(this.f);
	if (!this.K || this.K.Cc())
		this.td()
};
igFI_.ui.Component.prototype.td = function() {
	this.Pa = igFI_b;
	this.kc(function(a) {
				!a.Cc() && a.oa() && a.td()
			})
};
igFI_.ui.Component.prototype.ic = function() {
	this.kc(function(a) {
				a.Cc() && a.ic()
			});
	this.yc && this.yc.Ta();
	this.Pa = igFI_d
};
igFI_.ui.Component.prototype.b = function() {
	igFI_.ui.Component.q.b.call(this);
	this.Pa && this.ic();
	if (this.yc) {
		this.yc.dispose();
		delete this.yc
	}
	this.kc(function(a) {
				a.dispose()
			});
	!this.Fh && this.f && igFI_.dom.removeNode(this.f);
	this.K = this.Sg = this.f = this.tb = this.ia = igFI_c
};
igFI_.ui.Component.prototype.Ec = function() {
	if (this.Mb == igFI_c)
		this.Mb = igFI_.style.Ec(this.Pa ? this.f : this.bb.ma().body);
	return this.Mb
};
igFI_.ui.Component.prototype.og = function() {
	return !!this.ia && this.ia.length != 0
};
igFI_.ui.Component.prototype.Ad = function(a) {
	return this.tb && a ? igFI_.object.get(this.tb, a) || igFI_c : igFI_c
};
igFI_.ui.Component.prototype.Tf = function(a) {
	return this.ia ? this.ia[a] || igFI_c : igFI_c
};
igFI_.ui.Component.prototype.kc = function(a, b) {
	this.ia && igFI_.array.forEach(this.ia, a, b)
};
igFI_.ui.Component.prototype.removeChild = function(a, b) {
	if (a) {
		var c = igFI_.isString(a) ? a : a.dg();
		a = this.Ad(c);
		if (c && a) {
			igFI_.object.remove(this.tb, c);
			igFI_.array.remove(this.ia, a);
			if (b) {
				a.ic();
				a.f && igFI_.dom.removeNode(a.f)
			}
			a.Pb(igFI_c)
		}
	}
	if (!a)
		igFI_a(Error(igFI_.ui.Component.Error.NOT_OUR_CHILD));
	return a
};
igFI_.ui.Component.prototype.kh = function(a, b) {
	return this.removeChild(this.Tf(a), b)
};
igFI_.ui.Component.prototype.mb = function(a) {
	for (; this.og();)
		this.kh(0, a)
};
igFI_.ui.ServerChart = function(a, b, c, d, e) {
	igFI_.ui.Component.call(this, d);
	this.v = new igFI_.Uri(e || igFI_.ui.ServerChart.CHART_SERVER_URI);
	this.qd = igFI_.ui.ServerChart.EncodingType.AUTOMATIC;
	this.Ha = [];
	this.te = [];
	this.Pc = [];
	this.Ue = [];
	this.li = [];
	this.qe = [];
	this.ti = [];
	this.ri = {};
	this.pi = {};
	this.si = {};
	this.qi = {};
	this.uh(a);
	this.xe(b, c);
	this.Jc = this.Dg() ? 0 : Infinity
};
igFI_.inherits(igFI_.ui.ServerChart, igFI_.ui.Component);
igFI_.ui.ServerChart.CHART_SERVER_URI = "http://chart.apis.google.com/chart";
igFI_.ui.ServerChart.CHART_SERVER_HTTPS_URI = "https://www.google.com/chart";
igFI_.ui.ServerChart.DEFAULT_NORMALIZATION = 0.5;
igFI_.ui.ServerChart.prototype.Dh = 2048;
igFI_.ui.ServerChart.prototype.lg = 0;
igFI_.ui.ServerChart.prototype.mg = 0;
igFI_.ui.ServerChart.prototype.Kb = -Infinity;
igFI_.ui.ServerChart.prototype.zh = igFI_c;
igFI_.ui.ServerChart.prototype.Jg = igFI_c;
igFI_.ui.ServerChart.prototype.je = igFI_c;
igFI_.ui.ServerChart.prototype.o = function() {
	var a = this.pa();
	this.rh(this.r().o("img", {
				src : this.Sd(),
				"class" : "goog-serverchart-image",
				width : a[0],
				height : a[1]
			}))
};
igFI_.ui.ServerChart.prototype.Sd = function() {
	this.wf();
	return this.v
};
igFI_.ui.ServerChart.EncodingType = {
	AUTOMATIC : "",
	EXTENDED : "e",
	SIMPLE : "s",
	TEXT : "t"
};
igFI_.ui.ServerChart.ChartType = {
	BAR : "br",
	CLOCK : "cf",
	CONCENTRIC_PIE : "pc",
	FILLEDLINE : "lr",
	FINANCE : "lfi",
	GOOGLEOMETER : "gom",
	HORIZONTAL_GROUPED_BAR : "bhg",
	HORIZONTAL_STACKED_BAR : "bhs",
	LINE : "lc",
	MAP : "t",
	MAPUSA : "tuss",
	MAPWORLD : "twoc",
	PIE : "p",
	PIE3D : "p3",
	RADAR : "rs",
	SCATTER : "s",
	SPARKLINE : "ls",
	VENN : "v",
	VERTICAL_GROUPED_BAR : "bvg",
	VERTICAL_STACKED_BAR : "bvs",
	XYLINE : "lxy"
};
igFI_.ui.ServerChart.MultiAxisType = {
	X_AXIS : "x",
	LEFT_Y_AXIS : "y",
	RIGHT_Y_AXIS : "r",
	TOP_AXIS : "t"
};
igFI_.ui.ServerChart.MultiAxisAlignment = {
	ALIGN_LEFT : -1,
	ALIGN_CENTER : 0,
	ALIGN_RIGHT : 1
};
igFI_.ui.ServerChart.LegendPosition = {
	TOP : "t",
	BOTTOM : "b",
	LEFT : "l",
	RIGHT : "r"
};
igFI_.ui.ServerChart.AxisDisplayType = {
	LINE_AND_TICKS : "lt",
	LINE : "l",
	TICKS : "t"
};
igFI_.ui.ServerChart.MaximumValue = {
	WIDTH : 1000,
	HEIGHT : 1000,
	MAP_WIDTH : 440,
	MAP_HEIGHT : 220,
	TOTAL_AREA : 300000
};
igFI_.ui.ServerChart.UriParam = {
	TYPE : "cht",
	SIZE : "chs",
	DATA : "chd",
	X_LABELS : "chl",
	LEFT_Y_LABELS : "chly",
	DATA_LABELS : "chld",
	RIGHT_LABELS : "chlr",
	RIGHT_LABEL_POSITIONS : "chlrp",
	MISC_PARAMS : "chp",
	DATA_COLORS : "chco",
	DATA_SCALING : "chds",
	LEGEND_TEXTS : "chdl",
	LEGEND_POSITION : "chdlp",
	LABEL_COLORS : "chlc",
	BAR_HEIGHT : "chbh",
	LINE_STYLES : "chls",
	GRID : "chg",
	X_AXIS_STYLE : "chx",
	MARKERS : "chm",
	BACKGROUND_FILL : "chf",
	DIGITAL_SIGNATURE : "sig",
	TITLE : "chtt",
	TITLE_FORMAT : "chts",
	LEGEND : "chdl",
	MULTI_AXIS_TYPES : "chxt",
	MULTI_AXIS_LABEL_TEXT : "chxl",
	MULTI_AXIS_LABEL_POSITION : "chxp",
	MULTI_AXIS_RANGE : "chxr",
	MULTI_AXIS_STYLE : "chxs",
	GEOGRAPHICAL_REGION : "chtm"
};
igFI_.ui.ServerChart.prototype.uh = function(a) {
	this.v.L(igFI_.ui.ServerChart.UriParam.TYPE, a)
};
igFI_.ui.ServerChart.prototype.Rd = function() {
	return this.v.fb(igFI_.ui.ServerChart.UriParam.TYPE)
};
igFI_.ui.ServerChart.prototype.xe = function(a, b) {
	var c = [a || 300, b || 150].join("x");
	this.v.L(igFI_.ui.ServerChart.UriParam.SIZE, c)
};
igFI_.ui.ServerChart.prototype.pa = function() {
	var a = this.v.fb(igFI_.ui.ServerChart.UriParam.SIZE);
	return a.split("x")
};
igFI_.ui.ServerChart.prototype.vh = function(a) {
	this.Ue = a;
	this.v.L(igFI_.ui.ServerChart.UriParam.X_LABELS, this.Ue.join("|"))
};
igFI_.ui.ServerChart.prototype.Dg = function() {
	var a = this.Rd();
	return a == igFI_.ui.ServerChart.ChartType.PIE
			|| a == igFI_.ui.ServerChart.ChartType.PIE3D
			|| a == igFI_.ui.ServerChart.ChartType.CONCENTRIC_PIE
};
igFI_.ui.ServerChart.prototype.isMap = function() {
	var a = this.Rd();
	return a == igFI_.ui.ServerChart.ChartType.MAP
			|| a == igFI_.ui.ServerChart.ChartType.MAPUSA
			|| a == igFI_.ui.ServerChart.ChartType.MAPWORLD
};
igFI_.ui.ServerChart.prototype.L = function(a, b) {
	this.v.L(a, b)
};
igFI_.ui.ServerChart.prototype.removeParameter = function(a) {
	this.v.removeParameter(a)
};
igFI_.ui.ServerChart.prototype.sh = function(a) {
	this.qe = a;
	this.v.L(igFI_.ui.ServerChart.UriParam.RIGHT_LABELS, this.qe.reverse()
					.join("|"))
};
igFI_.ui.ServerChart.prototype.gf = function(a, b, c) {
	var d = this.of(a);
	if (d < this.Jc)
		this.Jc = d;
	var e = this.nf(a);
	if (e > this.Kb)
		this.Kb = e;
	if (igFI_.isDef(c)) {
		if (this.Pc.length < this.Ha.length)
			igFI_a(Error("Cannot start adding legends text after first element."));
		this.Pc.push(c);
		this.v.L(igFI_.ui.ServerChart.UriParam.LEGEND_TEXTS, this.Pc.join("|"))
	}
	this.Ha.push(a);
	this.te.push(b);
	this.v.L(igFI_.ui.ServerChart.UriParam.DATA_COLORS, this.te.join(","))
};
igFI_.ui.ServerChart.prototype.getData = function(a) {
	if (igFI_.isDef(a))
		return this.Ha[a];
	return this.Ha
};
igFI_.ui.ServerChart.prototype.wf = function() {
	var a;
	if (this.qd != igFI_.ui.ServerChart.EncodingType.AUTOMATIC)
		a = this.ac(this.qd);
	else
		(a = this.ac(igFI_.ui.ServerChart.EncodingType.EXTENDED))
				|| (a = this.ac(igFI_.ui.ServerChart.EncodingType.SIMPLE));
	a
			|| this
					.dispatchEvent(new igFI_.ui.ServerChart.UriTooLongEvent(this.v
							.toString()))
};
igFI_.ui.ServerChart.prototype.ac = function(a) {
	for (var b = [], c = 0, d = this.Ha.length; c < d; ++c)
		b[c] = this.Sf(this.Ha[c], this.Jc, this.Kb, a);
	var e = a == igFI_.ui.ServerChart.EncodingType.TEXT ? "|" : ",";
	b = b.join(e);
	var f;
	f = this.je == igFI_c ? igFI_.string.buildString(a, ":", b) : igFI_.string
			.buildString(a, this.je, ":", b);
	this.v.L(igFI_.ui.ServerChart.UriParam.DATA, f);
	return this.v.toString().length < this.Dh
};
igFI_.ui.ServerChart.CHART_VALUES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
igFI_.ui.ServerChart.CHART_VALUES_EXTENDED = igFI_.ui.ServerChart.CHART_VALUES
		+ "-.";
igFI_.ui.ServerChart.EXTENDED_UPPER_BOUND = Math.pow(
		igFI_.ui.ServerChart.CHART_VALUES_EXTENDED.length, 2)
		- 1;
igFI_.ui.ServerChart.prototype.Vf = function(a, b, c, d) {
	if (b > c)
		igFI_a(Error("minValue is greater than maxValue"));
	var e = d == igFI_.ui.ServerChart.EncodingType.EXTENDED;
	if (!igFI_.isDefAndNotNull(a) || isNaN(a))
		return e ? "__" : "_";
	if (d == igFI_.ui.ServerChart.EncodingType.TEXT)
		return String(a);
	var f = igFI_.ui.ServerChart.DEFAULT_NORMALIZATION;
	if (c > b)
		f = (a - b) / (c - b);
	if (e) {
		var g = igFI_.ui.ServerChart.CHART_VALUES_EXTENDED.length, h = igFI_.ui.ServerChart.EXTENDED_UPPER_BOUND, i = Math
				.floor(f * h / g), j = Math.floor(f * h % g), k = igFI_.ui.ServerChart.CHART_VALUES_EXTENDED;
		return k.charAt(i) + k.charAt(j)
	}
	var n = Math.round(f * (igFI_.ui.ServerChart.CHART_VALUES.length - 1));
	return igFI_.ui.ServerChart.CHART_VALUES.charAt(n)
};
igFI_.ui.ServerChart.prototype.Sf = function(a, b, c, d) {
	for (var e = [], f = 0, g = a.length; f < g; ++f)
		e.push(this.Vf(a[f], b, c, d));
	return e.join(this.qd == igFI_.ui.ServerChart.EncodingType.TEXT ? "," : "")
};
igFI_.ui.ServerChart.prototype.of = function(a) {
	for (var b = Infinity, c = 0, d = a.length; c < d; ++c) {
		var e = a[c];
		if (e != igFI_c && e < b)
			b = e
	}
	return b
};
igFI_.ui.ServerChart.prototype.nf = function(a) {
	for (var b = -Infinity, c = 0, d = a.length; c < d; ++c) {
		var e = a[c];
		if (e != igFI_c && e > b)
			b = e
	}
	return b
};
igFI_.ui.ServerChart.prototype.b = function() {
	igFI_.ui.ServerChart.q.b.call(this);
	delete this.Ue;
	delete this.li;
	delete this.qe;
	delete this.lg;
	delete this.mg;
	delete this.te;
	delete this.Pc;
	delete this.Ha;
	this.v = igFI_c;
	delete this.Jc;
	delete this.Kb;
	this.zh = igFI_c;
	delete this.ti;
	delete this.ri;
	delete this.pi;
	delete this.si;
	delete this.qi;
	this.Jg = igFI_c
};
igFI_.ui.ServerChart.Event = {
	URI_TOO_LONG : "uritoolong"
};
igFI_.ui.ServerChart.UriTooLongEvent = function(a) {
	igFI_.events.Event.call(this, igFI_.ui.ServerChart.Event.URI_TOO_LONG);
	this.uri = a
};
igFI_.inherits(igFI_.ui.ServerChart.UriTooLongEvent, igFI_.events.Event);
igFI_.finance = {};
igFI_.finance.util = {};
igFI_.exportSymbol("google.finance.util", igFI_.finance.util);
igFI_.finance.util.MSG_NOJSON = "Invalid request";
igFI_.finance.util.MSG_NOCONTENT = "No matches found";
igFI_.finance.util.MSG_LINKTIP = "Tip: You can click on a row to synchronize gadgets";
igFI_.finance.util.MSG_TURN_SYNC_OFF_TIP = "Turn gadget syncing off";
igFI_.finance.util.MSG_TURN_SYNC_ON_TIP = "Turn gadget syncing on";
igFI_.finance.util.MSG_SYNC = "Sync";
igFI_.finance.util.MSG_SYNC_ON = "On";
igFI_.finance.util.MSG_SYNC_OFF = "Off";
igFI_.finance.util.renderChart = function(a, b, c, d, e, f, g, h) {
	var i = new igFI_.ui.ServerChart(igFI_.ui.ServerChart.ChartType.LINE, b, c);
	if (i) {
		i.gf(d, "0066dd");
		i.vh([e]);
		i.sh([g, h]);
		i.render(a);
		return i.Sd()
	}
};
igFI_.finance.util.startPubSubVisual = function(a, b) {
	if (b) {
		var c = [118, 164, 251], d = [255, 255, 255], e = 2000, f = new igFI_.fx.dom.BgColorTransform(
				b, c, d, e);
		f.play()
	}
};
igFI_.finance.util.parseJSON = function(a) {
	if (a == igFI_c)
		return igFI_c;
	var b = a.indexOf("// [");
	if (b == -1)
		return a;
	return a.substring(b + 3)
};
igFI_.finance.util.evalJSON = function(a) {
	try {
		return eval(a)
	} catch (b) {
	}
	return igFI_c
};
igFI_.finance.util.isValidSymbol = function(a) {
	return a && a.length > 0 && a.match(/^[A-Za-z0-9\:\.\/]+$/) == a
};
igFI_.finance.util.makeFullTicker = function(a, b) {
	var c = "";
	if (a && a.length)
		c = b && b.length ? a + ":" + b : a;
	else if (b && b.length)
		c = b;
	return c
};
igFI_.finance.util.getCompanyTruncateLength = function() {
	return 20
};
igFI_.finance.util.loadDefaultSymbol = function(a, b) {
	if (!a)
		return igFI_.finance.util.getDefaultSymbol();
	if (!b)
		return igFI_.finance.util.getDefaultSymbol();
	var c = new _IG_Prefs(a), d = c.getString(b);
	if (!d)
		return igFI_.finance.util.getDefaultSymbol();
	return d
};
igFI_.finance.util.saveDefaultSymbol = function(a, b, c) {
	if (c)
		if (c.length) {
			var d = new _IG_Prefs(a);
			d.set(b, c)
		}
};
igFI_.finance.util.getDefaultSymbol = function() {
	return "GOOG"
};
igFI_.finance.util.makeURL = function(a, b, c, d) {
	if (!d || !a)
		return [igFI_e.global.google.finance.getApiHost(), b, "?client=ig&", c]
				.join("");
	else {
		var e = igFI_e.global.google.finance.modules[a];
		e || (e = {
			token : "",
			synd : "",
			locked_domain : ""
		});
		var f = ["&client=ig&token=", e.token, "&synd=", e.synd, "&msh=",
				e.locked_domain].join(""), g = new igFI_.Uri([
				igFI_e.global.google.finance.getApiHost(), b, "?", c, f]
				.join("")), h = g.fb("auto");
		if (!h) {
			var i = g.fb("q");
			igFI_e.global.google.finance.isNewRequest(i) || g.L("auto", "1")
		}
		return g.toString()
	}
};
igFI_.finance.util.doRequest = function(a, b, c, d, e, f, g) {
	f || (f = "en");
	g || (g = "us");
	b = igFI_.finance.util.makeURL(a, b, [c, "&hl=", f, "&gl=", g].join(""), d);
	_IG_FetchContent(b, function(h) {
				h = igFI_e.finance.util.parseJSON(h);
				var i = igFI_e.finance.util.evalJSON(h);
				e(i)
			})
};
igFI_.finance.util.getRefreshInterval = function() {
	return 60
};
igFI_.finance.util.truncateString = function(a, b) {
	if (a.length > b)
		a = a.substring(0, b) + "...";
	return a
};
igFI_.finance.util.parseFloat = function(a) {
	if (a == igFI_c)
		return a;
	if (typeof a == "string") {
		a = a.replace(/,/g, "");
		a = a.replace(/\+/g, "")
	}
	return parseFloat(a)
};
igFI_.finance.util.getChangeClass = function(a) {
	var b = "financelib_unchanged", c = igFI_.finance.util.parseFloat(a);
	if (c > 0)
		b = "financelib_up";
	else if (c < 0)
		b = "financelib_down";
	return b
};
igFI_.finance.util.getHideZippyImgTag = function() {
	return '<img src="http://www.google.com/finance/images/triangle.gif">'
};
igFI_.finance.util.getShowZippyImgTag = function() {
	return '<img src="http://www.google.com/finance/images/open_triangle.gif">'
};
igFI_.finance.util.getWaitingImgTag = function() {
	return '&nbsp;&nbsp;<img src="/ig/modules/finance/spin_16.gif">'
};
igFI_.finance.util.getLinkOnImgTag = function() {
	return '<img src="/ig/modules/finance/sync_rowon.gif">'
};
igFI_.finance.util.getLinkOffImgTag = function() {
	return '<img src="/ig/modules/finance/sync_rowoff.gif">'
};
igFI_.finance.util.getLinkOnImgSrc = function() {
	return "/ig/modules/finance/sync_rowon.gif"
};
igFI_.finance.util.getLinkOffImgSrc = function() {
	return "/ig/modules/finance/sync_rowoff.gif"
};
igFI_.finance.util.getLinkRowOnImgTag = function() {
	return '<img src="/ig/modules/finance/sync_rowon.gif">'
};
igFI_.finance.util.getLinkRowOffImgTag = function() {
	return '<img src="/ig/modules/finance/sync_rowoff.gif">'
};
igFI_.finance.util.getLinkRowOnImgSrc = function() {
	return "/ig/modules/finance/sync_rowon.gif"
};
igFI_.finance.util.getLinkRowOffImgSrc = function() {
	return "/ig/modules/finance/sync_rowoff.gif"
};
igFI_.finance.util.getLinkTip = function() {
	return ['<span class="financelib_disc">', igFI_.finance.util.MSG_LINKTIP,
			igFI_.finance.util.getLinkRowOffImgTag(), "</span>"].join("")
};
igFI_.finance.util.getCompanyURL = function(a, b) {
	var c = "";
	if (a && a.length)
		c = b && b.length ? a + ":" + b : a;
	else if (b && b.length)
		c = b;
	return igFI_.finance.util.makeURL(igFI_c, "/finance", "q=" + c, igFI_d)
};
igFI_.finance.util.getCategoryURL = function(a) {
	return igFI_.finance.util.makeURL(igFI_c, "/finance", "catid=" + a, igFI_d)
};
igFI_.finance.util.getJSONField = function(a, b) {
	return a && a[b] ? a[b] : ""
};
igFI_.finance.util.showLinkingState = function(a, b, c) {
	var d = _gel(c);
	if (d) {
		var e = a.getInt(b);
		if (e) {
			d.title = igFI_.finance.util.MSG_TURN_SYNC_OFF_TIP;
			d.innerHTML = [igFI_.finance.util.MSG_SYNC, "<br><b>",
					igFI_.finance.util.MSG_SYNC_ON,
					'</b> | <a href="javascript:;">',
					igFI_.finance.util.MSG_SYNC_OFF, "</a>"].join("")
		} else {
			d.title = igFI_.finance.util.MSG_TURN_SYNC_ON_TIP;
			d.innerHTML = [igFI_.finance.util.MSG_SYNC,
					'<br><a href="javascript:;">',
					igFI_.finance.util.MSG_SYNC_ON, "</a> | <b>",
					igFI_.finance.util.MSG_SYNC_OFF, "</b>"].join("")
		}
	}
};
igFI_.finance.util.MSG_SYNC_OFF_TEXT = "Off";
igFI_.finance.util.toggleLinkingState = function(a, b, c) {
	var d = a.getInt(b);
	if (d == 0)
		d = 1;
	else if (d == 1)
		d = 0;
	a.set(b, d);
	igFI_e.finance.util.showLinkingState(a, b, c)
};
igFI_.finance.Table = function(a, b, c, d, e) {
	this.lb = a;
	this.gh = d;
	this.Aa = b;
	this.Qe = c;
	this.Xb = e;
	this.wa = []
};
igFI_.finance.Table.MSG_FULLVIEW = "Full View";
igFI_.finance.Table.MSG_EMPTYTABLE = "No data available";
igFI_.finance.Table.prototype.Mc = igFI_c;
igFI_.finance.Table.prototype.Ae = igFI_d;
igFI_.finance.Table.prototype.Ce = igFI_b;
igFI_.finance.Table.prototype.Ee = igFI_b;
igFI_.finance.Table.prototype.Ge = igFI_b;
igFI_.finance.Table.prototype.Ie = igFI_d;
igFI_.finance.Table.prototype.Vb = igFI_d;
igFI_.finance.Table.prototype.Be = function(a) {
	this.Ce = a
};
igFI_.finance.Table.prototype.Je = function(a) {
	this.Vb = a
};
igFI_.finance.Table.prototype.He = function(a) {
	this.Ie = a
};
igFI_.finance.Table.prototype.we = function(a) {
	this.Mc = a
};
igFI_.finance.Table.prototype.ze = function(a) {
	this.Ae = a
};
igFI_.finance.Table.prototype.Fe = function(a) {
	this.Ge = a
};
igFI_.finance.Table.prototype.De = function(a) {
	this.Ee = a
};
igFI_.finance.Table.hilightRow = function(a, b, c) {
	if (a) {
		var d = igFI_c;
		if (a.cells.length) {
			var e = a.cells[a.cells.length - 1];
			if (e && e.id == "GF_syncicon")
				d = e.firstChild
		}
		a.style.cursor = "pointer";
		if (b) {
			a.style.backgroundColor = "#fff4c2";
			if (d)
				d.src = igFI_e.finance.util.getLinkRowOnImgSrc()
		} else {
			a.style.backgroundColor = c;
			if (d)
				d.src = igFI_e.finance.util.getLinkRowOffImgSrc()
		}
	}
};
igFI_.finance.Table.onHideShowClick = function(a, b, c) {
	if (c) {
		var d = new _IG_Prefs(a), e = _gel("GF" + a + "box_" + b), f = _gel("GF"
				+ a + "showhide_" + b), g = d.getString(c).split(",");
		if (e.className == "financelib_hide") {
			e.className = "financelib_show";
			f.innerHTML = igFI_e.finance.util.getShowZippyImgTag();
			for (var h = 0; h < g.length; h++)
				if (g[h] == b) {
					g.splice(h, 1);
					break
				}
		} else {
			e.className = "financelib_hide";
			f.innerHTML = igFI_e.finance.util.getHideZippyImgTag();
			var i = igFI_d;
			for (h = 0; h < g.length; h++)
				if (g[h] == b) {
					i = igFI_b;
					break
				}
			i || g.push(b)
		}
		d.set(c, g.join(","))
	}
};
igFI_.finance.Table.prototype.Wc = function(a, b, c, d) {
	if (c)
		c.length || (c = "left");
	else
		c = "left";
	var e = {
		columnName : a,
		colorCode : igFI_d,
		assocName : b,
		columnAlign : c,
		assocUrl : d,
		valueIfBlank : "&nbsp;",
		renderHtml : igFI_c,
		renderUrl : igFI_c,
		truncateLength : igFI_c,
		columnAttr : ""
	};
	this.wa.push(e);
	return e
};
igFI_.finance.Table.prototype.tc = function() {
	var a = "";
	a = this.gh ? this.gh + "_" + this.Qe : this.Qe;
	return a.replace(/ /g, "")
};
igFI_.finance.Table.prototype.Tc = function(a) {
	var b = [], c = "", d = this.tc();
	if (this.Ee)
		c = ' style="border:1px solid #cccccc; padding: 2px; " ';
	if (this.Ae)
		if (this.Aa) {
			for (var e = new _IG_Prefs(this.lb), f = e.getString(this.Aa)
					.split(","), g = igFI_d, h = 0; h < f.length; h++)
				if (f[h] == d) {
					g = igFI_b;
					break
				}
			g || f.push(d);
			e.set(this.Aa, f.join(","))
		}
	this.Gb(d) ? b.push("<div id=GF", this.lb, "box_", d,
			" class=financelib_hide>") : b.push("<div id=GF", this.lb, "box_",
			d, " class=financelib_show>");
	b.push("<table ", c, " width=100% ><tr><td>");
	if (this.Aa) {
		b.push("&nbsp;", this.Bb(d, igFI_c));
		a && b.push(this.Bb(d, a));
		this.Xb
				&& b.push('&nbsp;(<a href="', this.Xb, '">',
						igFI_.finance.Table.MSG_FULLVIEW, "</a>)")
	} else {
		this.Xb && b.push('<a href="', this.Xb, '">');
		a && b.push(a);
		this.Xb && b.push("</a>")
	}
	b.push("</td></tr><tr class=financelib_hideable >",
			"<td><table cellspacing=0 width=100%>");
	return b.join("")
};
igFI_.finance.Table.prototype.gc = function() {
	return "</table></td></tr></table></div>"
};
igFI_.finance.Table.prototype.Ke = function(a, b) {
	var c = [this.Tc(a), "<tr><td>", b, "</td></tr>", this.gc()];
	return c.join("")
};
igFI_.finance.Table.prototype.ad = function(a) {
	if (!a)
		return igFI_.finance.Table.MSG_EMPTYTABLE + "<br>";
	if (!a.length)
		return igFI_.finance.Table.MSG_EMPTYTABLE + "<br>";
	if (!this.wa.length)
		return igFI_.finance.Table.MSG_EMPTYTABLE + "<br>";
	var b = [this.Tc(this.Qe), this.md(a, igFI_b), this.gc()];
	return b.join("")
};
igFI_.finance.Table.prototype.$c = function(a, b) {
	if (!b)
		return igFI_.finance.Table.MSG_EMPTYTABLE + "<br>";
	if (!b.length)
		return igFI_.finance.Table.MSG_EMPTYTABLE + "<br>";
	if (!this.wa.length)
		return igFI_.finance.Table.MSG_EMPTYTABLE + "<br>";
	var c = [];
	c.push(this.Tc(igFI_c));
	for (var d = 0; d < b.length; d++) {
		var e = b[d], f = a[d];
		if (f) {
			var g = this.wa.length;
			this.Vb && g++;
			d && c.push("<tr width=100%><td colspan=", g, ">&nbsp;</td></tr>");
			c.push("<tr width=100%><td colspan=", g, ">", f, "</td></tr>")
		}
		c.push(this.md(e, d == 0))
	}
	c.push(this.gc());
	return c.join("")
};
igFI_.finance.Table.prototype.md = function(a, b) {
	var c = [];
	if (this.Ge && b) {
		c.push("<tr>");
		for (var d = 0; d < this.wa.length; d++) {
			var e = this.wa[d];
			c.push("<td ", e.columnAattr, ' align="', e.columnAlign,
					'" nowrap>', e.columnName, "</td>")
		}
		this.Vb && c.push("<td width=16></td>");
		c.push("</tr>")
	}
	for (var f = 0; f < a.length; f++) {
		var g = a[f], h = "", i = "#FFFFFF";
		if (this.Ce && f % 2 == 0)
			i = "#f7f7f7";
		if (this.Ie)
			h += [
					" onMouseOver=\"google.finance.Table.hilightRow(this, true, '",
					i,
					"')\" onMouseOut=\"google.finance.Table.hilightRow(this, false, '",
					i, "')\" "].join("");
		if (this.Mc) {
			var j = this.Mc(g);
			if (j)
				h += [' onClick="', j, '"'].join("")
		}
		c.push("<tr bgcolor=", i, h, ">");
		for (d = 0; d < this.wa.length; d++) {
			e = this.wa[d];
			var k = g[e.assocName];
			if (e.colorCode) {
				var n = igFI_.finance.util.parseFloat(k);
				if (n && n > 0)
					c.push("<td ", e.columnAttr,
							' class="financelib_td financelib_up" align="',
							e.columnAlign, '" >');
				else
					n && n < 0 ? c.push("<td ", e.columnAttr,
							' class="financelib_td financelib_down" align="',
							e.columnAlign, '" >') : c.push(
							"<td class=financelib_td ", e.columnAttr,
							' align="', e.columnAlign, '" >')
			} else
				c.push("<td class=financelib_td ", e.columnAttr, ' align="',
						e.columnAlign, '" >');
			if (e.renderHtml)
				c.push(e.renderHtml(g));
			else {
				var q = igFI_c;
				if (e.assocUrl)
					q = g[e.assocUrl];
				else if (e.renderUrl)
					q = e.renderUrl(g);
				var p = "&nbsp;";
				if (e.valueIfBlank)
					p = e.valueIfBlank;
				if (k && k.length) {
					q && c.push('<a href="', q, '">');
					if (e.truncateLength)
						k = igFI_.finance.util.truncateString(k,
								e.truncateLength);
					c.push(k);
					q && c.push("</a>")
				} else
					c.push(p)
			}
			c.push("</td>")
		}
		this.Vb
				&& c.push('<td id="GF_syncicon" align=right>',
						igFI_.finance.util.getLinkRowOffImgTag(), "</td>");
		c.push("</tr>")
	}
	return c.join("")
};
igFI_.finance.Table.prototype.uc = function() {
	if (!this.Aa)
		return "";
	var a = new _IG_Prefs(this.lb);
	return a.getString(this.Aa)
};
igFI_.finance.Table.prototype.Gb = function(a) {
	if (!this.Aa)
		return igFI_d;
	if (!a)
		return igFI_d;
	for (var b = this.uc().split(","), c = 0; c < b.length; c++)
		if (b[c] == a)
			return igFI_b;
	return igFI_d
};
igFI_.finance.Table.prototype.Bb = function(a, b) {
	var c = "";
	if (b)
		c = "label";
	var d = ["<span id=GF", this.lb, "showhide_", c, a,
			' onClick=google.finance.Table.onHideShowClick("', this.lb, '","',
			a, '","', this.Aa, '") class="financelib_showhidespan">'];
	if (b)
		d.push(b);
	else
		this.Gb(a) ? d.push(igFI_.finance.util.getHideZippyImgTag()) : d
				.push(igFI_.finance.util.getShowZippyImgTag());
	d.push("</span>");
	return d.join("")
};
igFI_.exportSymbol("google.finance.Table", igFI_.finance.Table);
igFI_.exportSymbol("google.finance.Table.prototype.addColumn",
		igFI_.finance.Table.prototype.Wc);
igFI_.exportSymbol("google.finance.Table.prototype.showAccordion",
		igFI_.finance.Table.prototype.ze);
igFI_.exportSymbol("google.finance.Table.prototype.showAltRows",
		igFI_.finance.Table.prototype.Be);
igFI_.exportSymbol("google.finance.Table.prototype.showBorder",
		igFI_.finance.Table.prototype.De);
igFI_.exportSymbol("google.finance.Table.prototype.showHeaders",
		igFI_.finance.Table.prototype.Fe);
igFI_.exportSymbol("google.finance.Table.prototype.showHilightRows",
		igFI_.finance.Table.prototype.He);
igFI_.exportSymbol("google.finance.Table.prototype.showLinkIcons",
		igFI_.finance.Table.prototype.Je);
igFI_.exportSymbol("google.finance.Table.prototype.setRenderPubSub",
		igFI_.finance.Table.prototype.we);
igFI_.exportSymbol("google.finance.Table.prototype.buildTable",
		igFI_.finance.Table.prototype.ad);
igFI_.exportSymbol("google.finance.Table.prototype.buildMultipleTables",
		igFI_.finance.Table.prototype.$c);
igFI_.exportSymbol("google.finance.Table.prototype.simpleTable",
		igFI_.finance.Table.prototype.Ke);
igFI_.exportSymbol("google.finance.Table.prototype.getPreferenceId",
		igFI_.finance.Table.prototype.tc);
igFI_.exportSymbol("google.finance.Table.prototype.getPrefs",
		igFI_.finance.Table.prototype.uc);
igFI_.exportSymbol("google.finance.Table.prototype.getShowHideLinkHTML",
		igFI_.finance.Table.prototype.Bb);
igFI_.exportSymbol("google.finance.Table.hilightRow",
		igFI_.finance.Table.hilightRow);
igFI_.exportSymbol("google.finance.Table.prototype.isHidden",
		igFI_.finance.Table.prototype.Gb);
igFI_.exportSymbol("google.finance.Table.onHideShowClick",
		igFI_.finance.Table.onHideShowClick);
igFI_.fx.Dragger = function(a, b, c) {
	this.target = a;
	this.handle = b || a;
	this.limits = c || new igFI_.math.Rect(NaN, NaN, NaN, NaN);
	this.p = a.ownerDocument || a.document;
	igFI_.events.listen(this.handle, igFI_.events.EventType.MOUSEDOWN, this.Va,
			igFI_d, this)
};
igFI_.inherits(igFI_.fx.Dragger, igFI_.events.EventTarget);
igFI_.fx.Dragger.EventType = {
	START : "start",
	BEFOREDRAG : "beforedrag",
	DRAG : "drag",
	END : "end"
};
igFI_.fx.Dragger.DRAGSTART = "dragstart";
igFI_.fx.Dragger.$e = igFI_.userAgent.GECKO
		&& !igFI_.userAgent.isVersion("1.9a");
igFI_.fx.Dragger.prototype.screenX = 0;
igFI_.fx.Dragger.prototype.screenY = 0;
igFI_.fx.Dragger.prototype.Ne = 0;
igFI_.fx.Dragger.prototype.Oe = 0;
igFI_.fx.Dragger.prototype.$a = 0;
igFI_.fx.Dragger.prototype.ab = 0;
igFI_.fx.Dragger.prototype.pd = igFI_b;
igFI_.fx.Dragger.prototype.ca = igFI_d;
igFI_.fx.Dragger.prototype.Yd = 0;
igFI_.fx.Dragger.prototype.Tg = 0;
igFI_.fx.Dragger.prototype.Zd = igFI_d;
igFI_.fx.Dragger.cancelIeDragStart = function(a) {
	a.preventDefault()
};
igFI_.fx.Dragger.prototype.Sc = function(a) {
	this.nb = a
};
igFI_.fx.Dragger.prototype.b = function() {
	igFI_.fx.Dragger.q.b.call(this);
	igFI_.events.unlisten(this.handle, igFI_.events.EventType.MOUSEDOWN,
			this.Va, igFI_d, this);
	this.Se();
	delete this.target;
	delete this.handle
};
igFI_.fx.Dragger.prototype.Va = function(a) {
	if (this.pd
			&& !this.ca
			&& (a.type != igFI_.events.EventType.MOUSEDOWN || a
					.Bg(igFI_.events.BrowserEvent.MouseButton.LEFT))) {
		if (this.Yd == 0) {
			this.$d(a);
			if (this.ca)
				a.preventDefault();
			else
				return
		} else
			a.preventDefault();
		this.wh();
		this.screenX = this.Ne = a.screenX;
		this.screenY = this.Oe = a.screenY;
		this.$a = this.target.offsetLeft;
		this.ab = this.target.offsetTop;
		this.pageScroll = igFI_.dom.r(this.p).na();
		this.Tg = igFI_.now()
	}
};
igFI_.fx.Dragger.prototype.wh = function() {
	igFI_.events.listen(this.p, igFI_.events.EventType.MOUSEMOVE, this.he,
			igFI_d, this);
	igFI_.events.listen(this.p, igFI_.events.EventType.MOUSEUP, this.la,
			igFI_d, this);
	if (igFI_.fx.Dragger.$e)
		try {
			igFI_.events.listen(window.top, igFI_.events.EventType.MOUSEOUT,
					this.me, igFI_d, this)
		} catch (a) {
		}
	igFI_.userAgent.IE
			&& this.Zd
			&& igFI_.events.listen(this.p, igFI_.fx.Dragger.DRAGSTART,
					igFI_.fx.Dragger.cancelIeDragStart, igFI_d, this);
	this.nb
			&& igFI_.events.listen(this.nb, igFI_.events.EventType.SCROLL,
					this.ke, igFI_d, this)
};
igFI_.fx.Dragger.prototype.$d = function(a) {
	var b = this.dispatchEvent(new igFI_.fx.DragEvent(
			igFI_.fx.Dragger.EventType.START, this, a.clientX, a.clientY, a));
	if (b !== igFI_d)
		this.ca = igFI_b
};
igFI_.fx.Dragger.prototype.la = function(a, b) {
	this.Se();
	if (this.ca) {
		this.ca = igFI_d;
		var c = this.ee(this.$a), d = this.fe(this.ab);
		this.dispatchEvent(new igFI_.fx.DragEvent(
				igFI_.fx.Dragger.EventType.END, this, a.clientX, a.clientY, a,
				c, d, b))
	}
};
igFI_.fx.Dragger.prototype.rd = function(a) {
	this.la(a, igFI_b)
};
igFI_.fx.Dragger.prototype.Se = function() {
	igFI_.events.unlisten(this.p, igFI_.events.EventType.MOUSEMOVE, this.he,
			igFI_d, this);
	igFI_.events.unlisten(this.p, igFI_.events.EventType.MOUSEUP, this.la,
			igFI_d, this);
	if (igFI_.fx.Dragger.$e)
		try {
			igFI_.events.unlisten(window.top, igFI_.events.EventType.MOUSEOUT,
					this.me, igFI_d, this)
		} catch (a) {
		}
	igFI_.userAgent.IE
			&& this.Zd
			&& igFI_.events.unlisten(this.p, igFI_.fx.Dragger.DRAGSTART,
					igFI_.fx.Dragger.cancelIeDragStart, igFI_d, this);
	this.nb
			&& igFI_.events.unlisten(this.nb, igFI_.events.EventType.SCROLL,
					this.ke, igFI_d, this)
};
igFI_.fx.Dragger.prototype.me = function(a) {
	this.ca && !a.relatedTarget && a.target.tagName != igFI_.dom.TagName.IFRAME
			&& this.rd(a)
};
igFI_.fx.Dragger.prototype.he = function(a) {
	if (this.pd)
		if (igFI_.userAgent.IE && !a.button && !igFI_.userAgent.isVersion("8"))
			this.rd(a);
		else {
			var b = a.screenX - this.screenX, c = a.screenY - this.screenY;
			this.screenX = a.screenX;
			this.screenY = a.screenY;
			if (!this.ca) {
				var d = this.Ne - this.screenX, e = this.Oe - this.screenY, f = d
						* d + e * e;
				if (f > this.Yd) {
					this.$d(a);
					if (!this.ca) {
						this.la(a);
						return
					}
				}
			}
			var g = this.bd(b, c), h = g.x, i = g.y;
			if (this.ca) {
				var j = this.dispatchEvent(new igFI_.fx.DragEvent(
						igFI_.fx.Dragger.EventType.BEFOREDRAG, this, a.clientX,
						a.clientY, a, h, i));
				if (j !== igFI_d) {
					this.nd(a, h, i, igFI_d);
					a.preventDefault()
				}
			}
		}
};
igFI_.fx.Dragger.prototype.bd = function(a, b) {
	var c = igFI_.dom.r(this.p).na();
	a += c.x - this.pageScroll.x;
	b += c.y - this.pageScroll.y;
	this.pageScroll = c;
	this.$a += a;
	this.ab += b;
	var d = this.ee(this.$a), e = this.fe(this.ab);
	return new igFI_.math.Coordinate(d, e)
};
igFI_.fx.Dragger.prototype.ke = function(a) {
	var b = this.bd(0, 0);
	a.clientX = this.pageScroll.x - this.screenX;
	a.clientY = this.pageScroll.x - this.screenY;
	this.nd(a, b.x, b.y, igFI_b)
};
igFI_.fx.Dragger.prototype.nd = function(a, b, c) {
	this.Df(b, c);
	this.dispatchEvent(new igFI_.fx.DragEvent(igFI_.fx.Dragger.EventType.DRAG,
			this, a.clientX, a.clientY, a, b, c))
};
igFI_.fx.Dragger.prototype.ee = function(a) {
	var b = this.limits, c = !isNaN(b.left) ? b.left : igFI_c, d = !isNaN(b.width)
			? b.width
			: 0, e = c != igFI_c ? c + d : Infinity, f = c != igFI_c
			? c
			: -Infinity;
	return Math.min(e, Math.max(f, a))
};
igFI_.fx.Dragger.prototype.fe = function(a) {
	var b = this.limits, c = !isNaN(b.top) ? b.top : igFI_c, d = !isNaN(b.height)
			? b.height
			: 0, e = c != igFI_c ? c + d : Infinity, f = c != igFI_c
			? c
			: -Infinity;
	return Math.min(e, Math.max(f, a))
};
igFI_.fx.Dragger.prototype.Df = function(a, b) {
	this.target.style.left = a + "px";
	this.target.style.top = b + "px"
};
igFI_.fx.DragEvent = function(a, b, c, d, e, f, g, h) {
	igFI_.events.Event.call(this, a);
	this.type = a;
	this.clientX = c;
	this.clientY = d;
	this.browserEvent = e;
	this.left = igFI_.isDef(f) ? f : b.$a;
	this.top = igFI_.isDef(g) ? g : b.ab;
	this.dragger = b;
	this.dragCanceled = !!h
};
igFI_.inherits(igFI_.fx.DragEvent, igFI_.events.Event);
igFI_.fx.AbstractDragDrop = function() {
	this.Ib = [];
	this.xh = [];
	this.Oc = []
};
igFI_.inherits(igFI_.fx.AbstractDragDrop, igFI_.events.EventTarget);
igFI_.fx.AbstractDragDrop.Mh = 10;
igFI_.fx.AbstractDragDrop.prototype.Fc = igFI_d;
igFI_.fx.AbstractDragDrop.prototype.Gc = igFI_d;
igFI_.fx.AbstractDragDrop.prototype.ae = igFI_d;
igFI_.fx.AbstractDragDrop.EventType = {
	DRAGOVER : "dragover",
	DRAGOUT : "dragout",
	DRAG : "drag",
	DROP : "drop",
	DRAGSTART : "dragstart",
	DRAGEND : "dragend"
};
igFI_.fx.AbstractDragDrop.initDragDistanceThreshold = 5;
igFI_.fx.AbstractDragDrop.prototype.addTarget = function(a) {
	this.xh.push(a);
	this.Fc = a.Gc = igFI_b
};
igFI_.fx.AbstractDragDrop.prototype.Sc = function(a) {
	this.nb = a
};
igFI_.fx.AbstractDragDrop.prototype.init = function() {
	if (!this.ae) {
		for (var a, b = 0; a = this.Ib[b]; b++)
			this.yg(a);
		this.ae = igFI_b
	}
};
igFI_.fx.AbstractDragDrop.prototype.yg = function(a) {
	if (this.Fc) {
		igFI_.events.listen(a.element, igFI_.events.EventType.MOUSEDOWN, a.ge,
				igFI_d, a);
		this.Le && igFI_.dom.classes.add(a.element, this.Le)
	}
	this.Gc && this.Re && igFI_.dom.classes.add(a.element, this.Re)
};
igFI_.fx.AbstractDragDrop.prototype.mh = function() {
	for (var a, b = 0; a = this.Ib[b]; b++) {
		if (this.Fc) {
			igFI_.events.unlisten(a.element, igFI_.events.EventType.MOUSEDOWN,
					a.ge, igFI_d, a);
			this.Le && igFI_.dom.classes.remove(a.element, this.Le)
		}
		this.Gc && this.Re && igFI_.dom.classes.remove(a.element, this.Re)
	}
	this.Ib.length = 0
};
igFI_.fx.AbstractDragDrop.prototype.Va = function(a, b) {
	if (!this.O) {
		this.O = b;
		var c = new igFI_.fx.DragDropEvent(
				igFI_.fx.AbstractDragDrop.EventType.DRAGSTART, this, this.O);
		if (this.dispatchEvent(c) == igFI_d) {
			c.dispose();
			this.O = igFI_c
		} else {
			c.dispose();
			var d = b.Bd();
			this.wb = this.zf(d);
			var e = igFI_.dom.s(d);
			e.body.appendChild(this.wb);
			this.xa = this.Af(d, this.wb, a);
			this.xa.Sc(this.nb);
			igFI_.events.listen(this.xa, igFI_.fx.Dragger.EventType.DRAG,
					this.ie, igFI_d, this);
			igFI_.events.listen(this.xa, igFI_.fx.Dragger.EventType.END,
					this.la, igFI_d, this);
			igFI_.events.listen(e.body, igFI_.events.EventType.SELECTSTART,
					this.Pe);
			this.jh();
			this.va = igFI_c;
			this.zg();
			this.xa.Va(a);
			a.preventDefault()
		}
	}
};
igFI_.fx.AbstractDragDrop.prototype.jh = function() {
	this.Yb = [];
	for (var a, b = 0; a = this.xh[b]; b++)
		for (var c, d = 0; c = a.Ib[d]; d++)
			this.hf(a, c);
	if (!this.ua)
		this.ua = new igFI_.math.Box(0, 0, 0, 0)
};
igFI_.fx.AbstractDragDrop.prototype.Af = function(a, b, c) {
	var d = this.$f(a, b, c);
	b.style.position = "absolute";
	b.style.left = d.x + "px";
	b.style.top = d.y + "px";
	return new igFI_.fx.Dragger(b)
};
igFI_.fx.AbstractDragDrop.prototype.la = function(a) {
	var b = a.dragCanceled ? igFI_c : this.va;
	if (b && b.N) {
		var c = a.clientX, d = a.clientY, e = this.Md(), f = c + e.x, g = d
				+ e.y, h;
		if (this.Wb)
			h = this.Wb(b.ea, b.F, f, g);
		var i = new igFI_.fx.DragDropEvent(
				igFI_.fx.AbstractDragDrop.EventType.DRAG, this, this.O, b.N,
				b.ea, b.f, c, d, f, g);
		this.dispatchEvent(i);
		i.dispose();
		var j = new igFI_.fx.DragDropEvent(
				igFI_.fx.AbstractDragDrop.EventType.DROP, this, this.O, b.N,
				b.ea, b.f, c, d, f, g, h);
		b.N.dispatchEvent(j);
		j.dispose()
	}
	var k = new igFI_.fx.DragDropEvent(
			igFI_.fx.AbstractDragDrop.EventType.DRAGEND, this, this.O);
	this.dispatchEvent(k);
	k.dispose();
	igFI_.events.unlisten(this.xa, igFI_.fx.Dragger.EventType.DRAG, this.ie,
			igFI_d, this);
	igFI_.events.unlisten(this.xa, igFI_.fx.Dragger.EventType.END, this.la,
			igFI_d, this);
	var n = igFI_.dom.s(this.O.Bd());
	igFI_.events.unlisten(n.body, igFI_.events.EventType.SELECTSTART, this.Pe);
	this.kf(this.va ? this.va.ea : igFI_c)
};
igFI_.fx.AbstractDragDrop.prototype.kf = function() {
	this.Nf()
};
igFI_.fx.AbstractDragDrop.prototype.Nf = function() {
	this.Of();
	this.xa.dispose();
	igFI_.dom.removeNode(this.wb);
	delete this.O;
	delete this.wb;
	delete this.xa;
	delete this.Yb;
	delete this.va
};
igFI_.fx.AbstractDragDrop.prototype.ie = function(a) {
	var b = a.clientX, c = a.clientY, d = this.Md();
	b += d.x;
	c += d.y;
	var e = this.va, f;
	if (e) {
		if (this.Wb && e.N)
			f = this.Wb(e.ea, e.F, b, c);
		if (this.Hb(b, c, e.F) && f == this.ef)
			return;
		if (e.N) {
			var g = new igFI_.fx.DragDropEvent(
					igFI_.fx.AbstractDragDrop.EventType.DRAGOUT, this, this.O,
					e.N, e.ea, e.f);
			this.dispatchEvent(g);
			g.dispose();
			var h = new igFI_.fx.DragDropEvent(
					igFI_.fx.AbstractDragDrop.EventType.DRAGOUT, this, this.O,
					e.N, e.ea, e.f, undefined, undefined, undefined, undefined,
					this.ef);
			e.N.dispatchEvent(h);
			h.dispose()
		}
		this.ef = f;
		this.va = igFI_c
	}
	if (this.Hb(b, c, this.ua))
		if ((e = this.va = this.ig(b, c)) && e.N) {
			if (this.Wb)
				f = this.Wb(e.ea, e.F, b, c);
			var i = new igFI_.fx.DragDropEvent(
					igFI_.fx.AbstractDragDrop.EventType.DRAGOVER, this, this.O,
					e.N, e.ea, e.f);
			i.subtarget = f;
			this.dispatchEvent(i);
			i.dispose();
			var j = new igFI_.fx.DragDropEvent(
					igFI_.fx.AbstractDragDrop.EventType.DRAGOVER, this, this.O,
					e.N, e.ea, e.f, a.clientX, a.clientY, undefined, undefined,
					f);
			e.N.dispatchEvent(j);
			j.dispose()
		} else if (!e)
			this.va = this.Qg(b, c)
};
igFI_.fx.AbstractDragDrop.prototype.Pe = function() {
	return igFI_d
};
igFI_.fx.AbstractDragDrop.prototype.zg = function() {
	var a, b, c, d;
	for (b = 0; a = this.Oc[b]; b++) {
		igFI_.events.listen(a.f, igFI_.events.EventType.SCROLL, this.dd,
				igFI_d, this);
		a.bc = [];
		a.re = a.f.scrollLeft;
		a.se = a.f.scrollTop;
		var e = igFI_.style.getPageOffset(a.f), f = igFI_.style.pa(a.f);
		a.F = new igFI_.math.Box(e.y, e.x + f.width, e.y + f.height, e.x)
	}
	for (b = 0; d = this.Yb[b]; b++)
		for (c = 0; a = this.Oc[c]; c++)
			if (igFI_.dom.contains(a.f, d.f)) {
				a.bc.push(d);
				d.Nc = a
			}
};
igFI_.fx.AbstractDragDrop.prototype.Of = function() {
	for (var a = 0, b; b = this.Oc[a]; a++) {
		igFI_.events.unlisten(b.f, "scroll", this.dd, igFI_d, this);
		b.bc = []
	}
};
igFI_.fx.AbstractDragDrop.prototype.dd = function(a) {
	for (var b = 0, c; c = this.Oc[b]; b++)
		if (a.target == c.f) {
			var d = c.se - c.f.scrollTop, e = c.re - c.f.scrollLeft;
			c.se = c.f.scrollTop;
			c.re = c.f.scrollLeft;
			for (var f = 0, g; g = c.bc[f]; f++) {
				g.F.top += d;
				g.F.left += e;
				g.F.bottom += d;
				g.F.right += e
			}
		}
};
igFI_.fx.AbstractDragDrop.prototype.zf = function(a) {
	var b = this.tf(a);
	this.ai && igFI_.dom.classes.add(b, this.ai);
	return b
};
igFI_.fx.AbstractDragDrop.prototype.$f = function(a) {
	var b = igFI_.style.getPageOffset(a);
	b.x += (parseInt(igFI_.style.w(a, "marginLeft"), 10) || 0) * 2;
	b.y += (parseInt(igFI_.style.w(a, "marginTop"), 10) || 0) * 2;
	return b
};
igFI_.fx.AbstractDragDrop.prototype.tf = function(a) {
	var b = a.cloneNode(igFI_b);
	switch (a.tagName.toLowerCase()) {
		case "tr" :
			return igFI_.dom
					.o("table", igFI_c, igFI_.dom.o("tbody", igFI_c, b));
		case "td" :
		case "th" :
			return igFI_.dom.o("table", igFI_c, igFI_.dom.o("tbody", igFI_c,
							igFI_.dom.o("tr", igFI_c, b)));
		default :
			return b
	}
};
igFI_.fx.AbstractDragDrop.prototype.hf = function(a, b) {
	for (var c = b.bg(), d = this.Yb, e = 0; e < c.length; e++) {
		var f = c[e], g = igFI_.style.getPageOffset(f), h = igFI_.style.pa(f), i = new igFI_.math.Box(
				g.y, g.x + h.width, g.y + h.height, g.x);
		d.push(new igFI_.fx.Vc(i, a, b, f));
		if (d.length == 1)
			this.ua = new igFI_.math.Box(i.top, i.right, i.bottom, i.left);
		else {
			var j = this.ua;
			j.left = Math.min(i.left, j.left);
			j.right = Math.max(i.right, j.right);
			j.top = Math.min(i.top, j.top);
			j.bottom = Math.max(i.bottom, j.bottom)
		}
	}
};
igFI_.fx.AbstractDragDrop.prototype.Qg = function(a, b) {
	if (!this.od)
		this.od = new igFI_.fx.Vc(this.ua.clone());
	var c = this.od.F;
	c.top = this.ua.top;
	c.right = this.ua.right;
	c.bottom = this.ua.bottom;
	c.left = this.ua.left;
	for (var d = 0, e; e = this.Yb[d]; d++) {
		var f = e.F, g = -1;
		if (a >= f.right)
			g = f.right > c.left ? f.right : c.left;
		else if (a < f.left)
			g = f.left < c.right ? f.left : c.right;
		var h = -1;
		if (b >= f.bottom)
			h = f.bottom > c.top ? f.bottom : c.top;
		else if (b < f.top)
			h = f.top < c.bottom ? f.top : c.bottom;
		if (g >= 0 && h >= 0)
			if (Math.abs(g - a) > Math.abs(h - b))
				h = -1;
			else
				g = -1;
		if (g >= 0)
			if (g <= a)
				c.left = g;
			else
				c.right = g;
		else if (h >= 0)
			if (h <= b)
				c.top = h;
			else
				c.bottom = h
	}
	return (c.right - c.left) * (c.bottom - c.top) >= igFI_.fx.AbstractDragDrop.Mh
			? this.od
			: igFI_c
};
igFI_.fx.AbstractDragDrop.prototype.ig = function(a, b) {
	for (var c, d = 0; c = this.Yb[d]; d++)
		if (this.Hb(a, b, c.F))
			if (c.Nc) {
				var e = c.Nc.F;
				if (this.Hb(a, b, e))
					return c
			} else
				return c;
	return igFI_c
};
igFI_.fx.AbstractDragDrop.prototype.Hb = function(a, b, c) {
	return a >= c.left && a < c.right && b >= c.top && b < c.bottom
};
igFI_.fx.AbstractDragDrop.prototype.Md = function() {
	return igFI_.dom.r(this.wb).na()
};
igFI_.fx.AbstractDragDrop.prototype.b = function() {
	igFI_.fx.AbstractDragDrop.q.b.call(this);
	this.mh()
};
igFI_.fx.DragDropEvent = function(a, b, c, d, e, f, g, h, i, j, k) {
	igFI_.events.Event.call(this, a);
	this.dragSource = b;
	this.dragSourceItem = c;
	this.dropTarget = d;
	this.dropTargetItem = e;
	this.dropTargetElement = f;
	this.clientX = g;
	this.clientY = h;
	this.viewportX = i;
	this.viewportY = j;
	this.subtarget = k
};
igFI_.inherits(igFI_.fx.DragDropEvent, igFI_.events.Event);
igFI_.fx.DragDropEvent.prototype.b = function() {
	igFI_.fx.DragDropEvent.q.b.call(this);
	delete this.dragSource;
	delete this.dragSourceItem;
	delete this.dropTarget;
	delete this.dropTargetItem;
	delete this.dropTargetElement
};
igFI_.fx.DragDropItem = function(a, b) {
	this.element = igFI_.dom.oa(a);
	this.data = b;
	this.K = igFI_c;
	if (!this.element)
		igFI_a(Error("Invalid argument"))
};
igFI_.inherits(igFI_.fx.DragDropItem, igFI_.events.EventTarget);
igFI_.fx.DragDropItem.prototype.Ya = igFI_c;
igFI_.fx.DragDropItem.prototype.getData = function() {
	return this.data
};
igFI_.fx.DragDropItem.prototype.ag = function(a) {
	return a
};
igFI_.fx.DragDropItem.prototype.Bd = function() {
	return this.Ya
};
igFI_.fx.DragDropItem.prototype.bg = function() {
	return [this.element]
};
igFI_.fx.DragDropItem.prototype.ge = function(a) {
	var b = this.ag(a.target);
	b && this.Rg(a, b)
};
igFI_.fx.DragDropItem.prototype.Pb = function(a) {
	this.K = a
};
igFI_.fx.DragDropItem.prototype.Rg = function(a, b) {
	igFI_.events.listen(b, igFI_.events.EventType.MOUSEMOVE, this.Qa, igFI_d,
			this);
	igFI_.events.listen(b, igFI_.events.EventType.MOUSEOUT, this.Qa, igFI_d,
			this);
	igFI_.events.listen(b, igFI_.events.EventType.MOUSEUP, this.Kc, igFI_d,
			this);
	this.Ya = b;
	this.Me = new igFI_.math.Coordinate(a.clientX, a.clientY);
	a.preventDefault()
};
igFI_.fx.DragDropItem.prototype.Qa = function(a) {
	var b = Math.abs(a.clientX - this.Me.x) + Math.abs(a.clientY - this.Me.y);
	if (b > igFI_.fx.AbstractDragDrop.initDragDistanceThreshold) {
		var c = this.Ya;
		igFI_.events.unlisten(c, igFI_.events.EventType.MOUSEMOVE, this.Qa,
				igFI_d, this);
		igFI_.events.unlisten(c, igFI_.events.EventType.MOUSEOUT, this.Qa,
				igFI_d, this);
		igFI_.events.unlisten(c, igFI_.events.EventType.MOUSEUP, this.Kc,
				igFI_d, this);
		this.K.Va(a, this)
	}
};
igFI_.fx.DragDropItem.prototype.Kc = function() {
	var a = this.Ya;
	igFI_.events.unlisten(a, igFI_.events.EventType.MOUSEMOVE, this.Qa, igFI_d,
			this);
	igFI_.events.unlisten(a, igFI_.events.EventType.MOUSEOUT, this.Qa, igFI_d,
			this);
	igFI_.events.unlisten(a, igFI_.events.EventType.MOUSEUP, this.Kc, igFI_d,
			this);
	delete this.Me;
	this.Ya = igFI_c
};
igFI_.fx.Vc = function(a, b, c, d) {
	this.F = a;
	this.N = b;
	this.ea = c;
	this.f = d
};
igFI_.fx.Vc.prototype.Nc = igFI_c;
igFI_.fx.Mi = function(a) {
	this.bc = [];
	this.f = a;
	this.se = this.re = 0;
	this.F = igFI_c
};
igFI_.fx.DragDrop = function(a, b) {
	igFI_.fx.AbstractDragDrop.call(this);
	var c = new igFI_.fx.DragDropItem(a, b);
	c.Pb(this);
	this.Ib.push(c)
};
igFI_.inherits(igFI_.fx.DragDrop, igFI_.fx.AbstractDragDrop);
igFI_.fx.DragDropGroup = function() {
	igFI_.fx.AbstractDragDrop.call(this)
};
igFI_.inherits(igFI_.fx.DragDropGroup, igFI_.fx.AbstractDragDrop);
igFI_.finance.portfolios = {};
igFI_.finance.portfolios.MarketIndex = {};
(function() {
	var a = igFI_.finance.portfolios, b = new Object({
				".DJI" : "Dow",
				".IXIC" : "Nasdaq",
				".INX" : "S&amp;P&nbsp;500",
				".GSPTSE" : "TSX",
				".FTSE" : "FTSE 100",
				".FTMC" : "FTSE 250",
				".FTAS" : "FTSE All Share",
				".FTT1X" : "techMARK 100",
				"SHA:000001" : "Shanghai Index",
				"SHE:399001" : "Shenzhen Index",
				"INDEXHANGSENG:.HSI" : "HSI",
				"INDEXHANGSENG:.HSCE" : "HSCE"
			});
	a.MarketIndex = function() {
		this.xf = ""
	};
	a.MarketIndex.prototype.ue = function(c) {
		this.xf = c
	};
	a.MarketIndex.prototype.Id = function() {
		var c = igFI_c;
		switch (this.xf) {
			case "USA" :
				c = [".DJI", ".IXIC", ".INX"];
				break;
			case "Canada" :
				c = [".GSPTSE", ".DJI", ".IXIC", ".INX"];
				break;
			case "UK" :
				c = [".FTSE", ".FTMC", ".FTAS", ".FTT1X"];
				break;
			case "China" :
				c = ["SHA:000001", "SHE:399001"];
				break;
			case "HK" :
				c = ["INDEXHANGSENG:.HSI", "INDEXHANGSENG:.HSCE"];
				break;
			default :
		}
		return c
	};
	a.MarketIndex.prototype.zb = function(c) {
		return b[c]
	}
})();
igFI_.finance.portfolios.PortList = {};
(function() {
	var a = igFI_c, b = "", c = igFI_.finance.portfolios, d = 0;
	c.FIRST_PIVOT = "__first_marker__";
	c.PortList = function(i, j) {
		a = i;
		b = j;
		this.h = {};
		this.kb = new igFI_.finance.portfolios.MarketIndex;
		this.kb.ue(i.getString("country"));
		this.fi = igFI_d;
		this.ni = igFI_b;
		this.Eh = "";
		this.ne = igFI_d;
		d = 0
	};
	c.PortList.prototype.jg = function() {
		return this.Eh
	};
	c.PortList.prototype.da = function() {
		return this.h
	};
	c.PortList.prototype.hg = function() {
		return this.ne
	};
	c.PortList.prototype.eh = function(i) {
		var j = eval(i);
		e(this.h, "m", a.getMsg("market_summary"), igFI_c, igFI_c, igFI_c,
				igFI_c, igFI_c, "http://" + b + "/finance?client=ig");
		if (j)
			for (p = 0; p < j.length; p++) {
				var k = j[p].lname;
				k || (k = this.kb.zb(j[p].t));
				k || (k = this.kb.zb(j[p].e + ":" + j[p].t));
				var n = igFI_c;
				if (p < 2)
					n = "m_" + p;
				f(this.h.m.items, j[p].id, k, j[p].lname, j[p].t, j[p].e + ":"
								+ j[p].t, j[p].l, igFI_c, igFI_c, j[p].c,
						j[p].cp, igFI_c, igFI_c, igFI_c, igFI_c, igFI_c,
						j[p].ccol, n)
			}
		else
			for (var q = this.kb.Id(), p = 0; p < q.length; p++)
				f(this.h.m.items, p, this.kb.zb(q[p]), this.kb.zb(q[p]), q[p],
						q[p], "0.00", igFI_c, igFI_c, "0.00", "0.00", igFI_c,
						igFI_c, igFI_c, igFI_c, igFI_c, igFI_c, igFI_c)
	};
	c.PortList.prototype.fh = function(i) {
		if (typeof i != "object")
			this.fi = igFI_b;
		else {
			var j = i.getElementsByTagName("Portfolio");
			if (j.length == 0)
				this.ni = igFI_d;
			else {
				this.Eh = g(i, "HashValue");
				for (var k = 0; k < j.length; k++) {
					var n = g(j[k], "NetCurrentValue"), q = g(j[k],
							"NetInvestment"), p = g(j[k], "NetProfit"), u = g(
							j[k], "GainTodayPercentage"), A = g(j[k],
							"GainToday"), x = g(j[k], "ID");
					e(
							this.h,
							x,
							h(g(j[k], "Name")),
							q,
							n,
							p,
							u,
							A,
							"http://"
									+ b
									+ "/finance/portfolio?client=ig&action=view&pid="
									+ x);
					var v = j[k].getElementsByTagName("Item");
					if (v.length > 0)
						for (var y = 0; y < v.length; y++) {
							var C = igFI_c, D = igFI_c, L = igFI_c, B = igFI_c, E = igFI_c, z = igFI_c, M = igFI_c, I = igFI_c, F = igFI_c, N = igFI_c, Q = igFI_c, R = igFI_c, K = igFI_c, S = igFI_c, P = igFI_c, J = g(
									v[y], "Symbol");
							if (!(J == igFI_c)) {
								var T = J.indexOf(":");
								if (T == -1)
									C = J;
								else {
									D = J.substring(0, T);
									C = J.substring(T + 1)
								}
								var G = v[y].getElementsByTagName("StockInfo")[0];
								L = g(G, "LastPrice");
								B = g(G, "ChangeToday");
								E = g(G, "PercentageChange");
								z = igFI_.finance.util.getChangeClass(B), I = g(
										v[y], "Type");
								if (I == "Company") {
									N = g(G, "ECNLast");
									Q = g(G, "ECNChange");
									R = g(G, "ECNPercentageChange");
									M = g(G, "MarketCap")
								}
								K = g(v[y], "TotalHoldings");
								F = g(v[y], "Profit");
								S = I == "Mutual Fund" ? C : D == "NASDAQ"
										|| D == "NYSE" || D == "AMEX" ? C : D
										+ ":" + C;
								f(this.h[x].items, g(v[y], "ID"), g(v[y],
												"Name"), igFI_c, C, S, L, K, F,
										B, E, I, N, Q, R, M, z, P)
							}
						}
				}
			}
		}
	};
	c.PortList.prototype.dh = function(i) {
		var j;
		if (this.h.a)
			j = this.h.a.items;
		e(this.h, "a", a.getMsg("my_portfolios"), igFI_c, igFI_c, igFI_c,
				igFI_c, igFI_c, igFI_c);
		if (j)
			this.h.a.items = j.concat(this.h.a.items);
		var k = igFI_d;
		try {
			var n = eval(i);
			if (typeof n == "object")
				for (var q, p = 0; p < n.length; p++) {
					q = n[p].type == "Mutual Fund"
							? n[p].t
							: n[p].e == "NASDAQ" || n[p].e == "NYSE"
									|| n[p].e == "AMEX" ? n[p].t : n[p].e + ":"
									+ n[p].t;
					k = igFI_d;
					for (var u = 0; u < this.h.a.items.length; ++u)
						if (q == this.h.a.items[u].ticker) {
							k = igFI_b;
							break
						}
					var A = igFI_c;
					if (p < 2)
						A = "a_" + p;
					k
							|| f(this.h.a.items, n[p].id, n[p].name,
									n[p].lname, n[p].t, q, n[p].l, igFI_c,
									igFI_c, n[p].c, n[p].cp, n[p].type,
									n[p].el, n[p].ec, n[p].ecp, n[p].mc,
									n[p].ccol, A)
				}
			else
				this.ne = igFI_b
		} catch (x) {
			this.ne = igFI_b
		}
	};
	c.PortList.prototype.Ag = function(i, j, k) {
		if (j == c.FIRST_PIVOT)
			this.h[i].items = k.concat(this.h[i].items);
		else
			for (var n = 0; n < this.h[i].items.length; n++)
				if (this.h[i].items[n].ticker == j) {
					var q = this.h[i].items.slice(0, n + 1), p = this.h[i].items
							.slice(n + 1);
					this.h[i].items = q.concat(k).concat(p);
					break
				}
	};
	c.PortList.prototype.insertBefore = function(i, j, k) {
		if (!(j == c.FIRST_PIVOT))
			for (var n = 0; n < this.h[i].items.length; n++)
				if (this.h[i].items[n].ticker == j) {
					var q = this.h[i].items.slice(0, n), p = this.h[i].items
							.slice(n);
					this.h[i].items = q.concat(k).concat(p);
					break
				}
	};
	c.PortList.prototype.lh = function(i, j) {
		for (var k = igFI_c, n = 0; n < this.h[i].items.length; n++)
			if (this.h[i].items[n].ticker == j) {
				k = this.h[i].items[n];
				this.h[i].items.splice(n, 1);
				break
			}
		return k
	};
	c.PortList.prototype.indexOf = function(i, j) {
		for (var k = -1, n = 0; n < this.h[i].items.length; n++)
			if (this.h[i].items[n].ticker == j) {
				k = n;
				break
			}
		return k
	};
	c.PortList.makeItemFromJSON = function(i) {
		var j;
		j = i.type == "Mutual Fund" ? i.t : i.e == "NASDAQ" || i.e == "NYSE"
				|| i.e == "AMEX" ? i.t : i.e + ":" + i.t;
		var k = {
			cid : i.id,
			cname : i.name,
			lname : i.lname,
			symbol : i.t,
			ticker : j,
			last : i.l,
			holdings : igFI_c,
			profit : igFI_c,
			change : i.c,
			percChange : i.cp,
			type : i.type,
			ecnLast : i.el,
			ecnChange : i.ec,
			ecnPercChange : i.ecp,
			marketCap : i.mc,
			changeClass : i.ccol
		};
		return k
	};
	function e(i, j, k, n, q, p, u, A, x) {
		var v = {
			pid : j,
			name : igFI_.finance.util.truncateString(k, 30),
			userPortfolio : j != "m",
			visible : igFI_b,
			hasStats : q && q != "0.00",
			costBasis : n,
			marketValue : q,
			gain : p,
			gainToday : A,
			gainTodayPct : u,
			gainClass : igFI_.finance.util.getChangeClass(A),
			url : x,
			editUrl : x ? x.replace("action=view", "action=edit_portfolio") : x,
			items : []
		};
		i[j] = v;
		++d
	}
	function f(i, j, k, n, q, p, u, A, x, v, y, C, D, L, B, E, z, M) {
		var I = {
			cid : j,
			cname : k,
			lname : n,
			symbol : q,
			ticker : p,
			url : "http://" + b + "/finance?client=ig&q=" + p,
			last : u,
			holdings : A,
			profit : x,
			change : v,
			percChange : y,
			type : C,
			ecnLast : D,
			ecnChange : L,
			ecnPercChange : B,
			marketCap : E ? E : "-",
			changeClass : z,
			dotImgClass : M
		};
		i.push(I)
	}
	function g(i, j) {
		var k = i.getElementsByTagName(j);
		if (k && k[0])
			if (i.getElementsByTagName(j)[0].firstChild != igFI_c)
				return i.getElementsByTagName(j)[0].firstChild.nodeValue;
		return igFI_c
	}
	function h(i) {
		return i.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g,
				"&lt;").replace(/"/g, "&quot;")
	}
})();
igFI_.finance.portfolios.Regions = {};
(function() {
	var a = igFI_.finance.portfolios.Regions;
	a.EN_US = {};
	a.EN_US.MESSAGES = {
		REMOVE_CONFIRM : "Transaction exists! Do you really want to delete it?",
		EMPTY_PORTFOLIO : "This portfolio is empty",
		REQUEST_PORTFOLIO_ERROR : "Information is temporarily unavailable.",
		LOGIN : 'You can use Google Finance to maintain your portfolios. <a href="http://www.google.com/accounts/ServiceLogin?hl=en&service=finance&nui=1&continue=http://www.google.com/ig">Sign in</a>.',
		DISCLAIMER : 'Quotes delayed up to 20 minutes.&nbsp;<a href ="http://www.google.com/help/stock_disclaimer.html" style="color:#7777cc;">Disclaimer</a>',
		MARKET_CAP : "Mkt&nbsp;Cap",
		VALUE : "Value:"
	};
	a.EN_US.COLOR = {
		SHARE_UP : "#008000",
		SHARE_DOWN : "#AA0033",
		SHARE_EQUAL : "#676767"
	}
})();
igFI_f("google.finance.Portfolios");
(function() {
	var a = igFI_e.global.google.finance.Portfolios, b = igFI_c, c = "", d = igFI_c, e = "", f = igFI_d, g = igFI_d, h = igFI_b, i = "", j = igFI_c, k = igFI_c, n = igFI_c, q = "", p = igFI_c, u = igFI_d, A = igFI_d, x = igFI_c, v = igFI_c, y = igFI_c, C = igFI_c, D = igFI_c, L = igFI_c, B = {}, E = igFI_d, z = igFI_b, M = igFI_b, I = igFI_d, F = "", N = "", Q = igFI_d, R = igFI_d;
	a.init = function(l, m, r, o, s) {
		b = l;
		i = r;
		e = o;
		B = s;
		j = new igFI_.finance.portfolios.MarketIndex;
		h = igFI_b;
		p = igFI_.finance.portfolios.Regions[m];
		D = new _IG_Template(o + "template");
		L = new _IG_Template(o + "addTemplate");
		F = a.getTopLevelDomain(window.location.href);
		if (!$() || F == "cn") {
			M = z = igFI_d;
			Q = I = igFI_b
		}
		ca(F);
		N = "www.google." + F;
		j.ue(a.determineMarketCountry(b.getString("country"), F));
		if ($() && z) {
			q = "  ";
			X = da;
			U = ea
		} else {
			q = ",";
			X = fa;
			U = ga
		}
		a.refresh();
		h = igFI_d
	};
	a.refresh = function() {
		g = f = E = igFI_d;
		d = new igFI_.finance.portfolios.PortList(b, N);
		c = b.getString("stocks_app");
		K();
		x = k = igFI_c;
		A = igFI_d;
		C = y = v = igFI_c;
		u = igFI_d;
		ha();
		X(c)
	};
	a.remove = function(l, m) {
		for (var r = d.da()[l], o = 0; o < r.items.length; o++)
			if (r.items[o].ticker == m)
				if (r.items[o].holdings != 0 && r.items[o].holdings != igFI_c) {
					var s = confirm(b.getMsg("remove_confirm"));
					if (s)
						break;
					else
						return
				} else
					break;
		d.lh(l, m);
		U(l);
		var t = _gel(e + "ticker_" + l + "_" + m);
		t.parentNode.removeChild(t);
		if (r.items.length == 0) {
			t = _gel(e + "portfolioStatus_" + l);
			t.innerHTML = b.getMsg("empty_portfolio")
		}
		_IG_AdjustIFrameHeight()
	};
	a.onIFrameLoaded = function() {
		E && a.refresh()
	};
	function K() {
		if (n) {
			var l = _gel(e + n.inputId);
			igFI_.events.unlisten(l, "focus", P);
			igFI_.events.unlisten(l, "blur", P);
			var m = _gel(e + n.id);
			m && m.parentNode.removeChild(m);
			n = igFI_c
		}
	}
	a.resetSelectedAddDiv = K;
	a.getTopLevelDomain = function(l) {
		var m = new igFI_.Uri(l), r = m.fb("parent"), o = igFI_.Uri.parse(r)
				.yb().match(/google\.(.+)/i);
		return o && o.length > 1 && o[1] ? o[1] : "com"
	};
	function S(l, m) {
		if (!(l == "m"))
			if (!z) {
				K();
				n = {
					id : "insert_" + l + "_" + m,
					inputId : "tickerToAdd_" + l + "_" + m,
					pid : l,
					tickerId : m,
					images : B
				};
				var r = igFI_.dom.o("tr", {
							id : e + n.id
						}), o = igFI_.dom.o("td", {
							"class" : e + "add",
							colspan : "6"
						});
				igFI_.dom.appendChild(r, o);
				igFI_.dom.Bc(r, _gel(e + "ticker_" + l + "_" + m));
				o.innerHTML = L.Expand(n);
				var s = _gel(e + n.inputId);
				igFI_.events.listen(s, "focus", P);
				igFI_.events.listen(s, "blur", J);
				s.focus()
			}
	}
	function P(l) {
		var m = l.target;
		if (m.style.color != "black") {
			m.style.color = "black";
			m.defaultValue = m.value;
			m.value = "";
			if (z && m.id == e + "bottomInput")
				_gel(e + "addFormPortfolios").style.color = "black"
		}
	}
	function J(l) {
		var m = l.target;
		if (m.value == "" && m.defaultValue) {
			m.value = m.defaultValue;
			m.style.color = "#999";
			if (z && m.id == e + "bottomInput")
				_gel(e + "addFormPortfolios").style.color = "#999";
			m.blur()
		}
	}
	function T(l) {
		var m = l.target;
		if (l.keyCode == 27) {
			m.value = "";
			J(l)
		}
	}
	a.prependExchanges = function(l) {
		var m = l;
		if (l.match(/^[0-9]{6}$/)) {
			m = "sha:" + l;
			m += ",she:" + l;
			m += ",mutf_cn:" + l;
			if (F != "cn")
				m += ",bom:" + l
		} else if (l.match(/^[0-9]{4,5}$/)) {
			m = "hkg:" + l;
			m += ",tpe:" + l
		}
		return m
	};
	function G() {
		var l = _gel(e + "bottomInput").value;
		if (l && l.length > 0) {
			if (z) {
				var m = _gel(e + "addForm");
				m.add_symbols_1.value = l;
				m.submit()
			} else {
				var r = "";
				l = l.replace(/\s+/gi, ",");
				for (var o = l.split(","), s = 0; s < o.length; ++s)
					if (o[s])
						r += "," + a.prependExchanges(o[s]);
				X(r)
			}
			E = igFI_b
		}
	}
	a.submitInputBoxValue = function() {
		G()
	};
	a.onKeyDownTickerToAdd = function(l, m, r) {
		if (l.keyCode == 13)
			a.addStock(m, r);
		else
			l.keyCode == 27 && K()
	};
	a.addStock = function(l, m) {
		var r = _gel(e + "tickerToAdd_" + l + "_" + m).value, o = "";
		r = r.replace(/\s+/gi, ",");
		for (var s = r.split(","), t = 0; t < s.length; ++t)
			o += "," + a.prependExchanges(s[t]);
		var w = ["http://", N, "/finance/info?oe=utf8&q=", o,
				"&client=ig&infotype=infoquoteall"];
		_IG_FetchContent(w.join(""), ia)
	};
	a.hide = function(l) {
		var m = _gel(e + "box_" + l), r = _gel(e + "pzippy_" + l), o = b
				.getString("contracted"), s = "";
		if (m.className == e + "hide") {
			m.className = e + "show";
			r.src = B.open_triangle;
			s = "," + l + ",";
			var t = o.indexOf(s);
			if (t == o.length - 3)
				o = o.substring(0, t + 1);
			else {
				var w = o.substring(0, t + 1), H = o.substring(t + 3);
				o = w + H
			}
		} else {
			m.className = e + "hide";
			r.src = B.triangle;
			s = "," + l + ",";
			if (o.search(s) == -1)
				o += l + ","
		}
		b.set("contracted", o);
		_IG_AdjustIFrameHeight()
	};
	function U() {
	}
	function ea(l) {
		var m = _gel(e + "editForm");
		m.pid.value = l;
		m.watchlist.value = Y(l);
		m.submit()
	}
	function ga(l) {
		c = Y(l);
		b.set("stocks_app", c)
	}
	function ia(l) {
		l = igFI_.finance.util.parseJSON(l);
		var m = igFI_c;
		try {
			m = eval(l)
		} catch (r) {
			alert(b.getMsg("invalid_tickers"));
			if (n) {
				var o = _gel(e + n.inputId);
				if (o)
					o.value = ""
			}
			return
		}
		var s = [], t = Y(n.pid);
		if (typeof m == "object")
			for (var w = 0; w < m.length; w++) {
				var H = igFI_.finance.portfolios.PortList
						.makeItemFromJSON(m[w]), O = ["^", H.ticker, "$|^",
						H.ticker, q, "|", q, H.ticker, q, "|", q, H.ticker, "$"], Z = new RegExp(
						O.join(""), "i");
				Z.test(t) || s.push(H)
			}
		if (s.length > 0) {
			d.Ag(n.pid, n.tickerId, s);
			U(n.pid);
			var V = {
				pid : n.pid,
				inputId : n.inputId,
				tickerId : n.tickerId
			};
			K();
			W();
			S(V.pid, V.tickerId);
			_gel(e + V.inputId).focus()
		} else
			_gel(e + n.inputId).value = ""
	}
	function ja() {
		for (var l = igFI_.cloneObject(d.da()), m = b.getString("port_order")
				.split(","), r = [], o, s = 0; s < m.length; s++)
			for (o in l)
				if (igFI_.isDef(l[o].pid))
					if (l[o].pid == m[s]) {
						r.push(m[s]);
						delete l[o];
						break
					}
		for (o in l)
			igFI_.isDef(l[o].pid) && r.push(l[o].pid);
		b.set("port_order", r.join(","));
		return r
	}
	function ka() {
		var l = b.getString("stockIdFromOnebox");
		if (!R && l) {
			var m = _gel(e + "bottomInput");
			if (m) {
				m.defaultValue = m.value;
				m.value = l;
				m.style.color = "black";
				R = igFI_b;
				G()
			}
		}
	}
	function W() {
		if (f && g) {
			for (var l = {
				financeDomain : N,
				hash : d.jg(),
				portfolios : [],
				images : B,
				useSFEPortfolios : z,
				showMarketCap : M,
				showLocalName : I,
				openNewWindow : Q
			}, m = d.da(), r = ja(), o = 0; o < r.length; ++o) {
				var s = r[o];
				if (igFI_.isDef(m[s].pid)) {
					m[s].visible = !la(b.getString("contracted"), m[s].pid);
					l.portfolios.push(m[s])
				}
			}
			_gel(e + "Main").innerHTML = D.Expand(l);
			_IG_AdjustIFrameHeight();
			igFI_.events.Ta();
			ma();
			na();
			ka()
		}
	}
	function oa(l) {
		for (var m = d.da()[l], r = e + "greybg", o = 0; o < m.items.length; ++o) {
			var s = ["ticker_", l, "_", m.items[o].ticker].join(""), t = _gel(e
					+ s);
			t && igFI_.dom.classes.enable(t, r, o % 2 == 0)
		}
	}
	function ma() {
		var l = d.da();
		for (var m in l)
			typeof l[m].pid != "undefined" && oa(l[m].pid)
	}
	function pa(l, m, r) {
		if (!u) {
			var o = r.currentTarget;
			if (!o.isHighlighted) {
				o.isHighlighted = igFI_b;
				var s = igFI_.style.getClientPosition(o), t = igFI_.style.pa(o).height;
				k = {
					minY : s.y + (t - 5),
					maxY : s.y + t,
					pid : l,
					tickerId : m,
					insertRow : igFI_d
				};
				igFI_.events.listen(o, "mousemove", aa);
				igFI_.events.listen(o, "click", ba);
				igFI_.dom.classes.add(o, e + "hoverbg");
				if (l != "m") {
					var w = _gel(e + "remove_" + l + "_" + m);
					w.style.visibility = "visible"
				}
			}
		}
	}
	function qa(l, m, r) {
		var o = r.currentTarget;
		if (o.isHighlighted) {
			o.isHighlighted = igFI_d;
			igFI_.events.unlisten(o, "mousemove", aa);
			igFI_.events.unlisten(o, "click", ba);
			igFI_.dom.classes.swap(o, e + "insertRow", e + "pointer");
			igFI_.dom.classes.remove(o, e + "hoverbg");
			if (l != "m") {
				var s = _gel(e + "remove_" + l + "_" + m);
				s.style.visibility = "hidden"
			}
		}
	}
	function ra(l) {
		return k && l.clientY > k.minY && l.clientY < k.maxY
	}
	function aa(l) {
		if (k) {
			var m = l.currentTarget;
			if (ra(l)) {
				k.insertRow = igFI_b;
				igFI_.dom.classes.add(m, e + "insertRow")
			} else {
				k.insertRow = igFI_d;
				igFI_.dom.classes.remove(m, e + "insertRow")
			}
		}
	}
	function ba() {
		k && k.insertRow && S(k.pid, k.tickerId)
	}
	function sa(l, m) {
		var r = ["ticker_", l, "_", m].join(""), o = _gel(e + r);
		if (o) {
			igFI_.events.listen(o, "mouseover", igFI_.bind(pa, igFI_c, l, m));
			igFI_.events.listen(o, "mouseout", igFI_.bind(qa, igFI_c, l, m))
		}
	}
	function ta(l) {
		for (var m = d.da()[l], r = 0; r < m.items.length; ++r)
			sa(l, m.items[r].ticker)
	}
	function na() {
		var l = d.da();
		for (var m in l)
			typeof l[m].pid != "undefined" && ta(l[m].pid);
		var r = _gel(e + "bottomInput");
		igFI_.events.listen(r, "focus", P);
		igFI_.events.listen(r, "blur", J);
		igFI_.events.listen(r, "keydown", T)
	}
	function ha() {
		var l = "/finance/info?oe=utf8&client=ig&infotype=infoquoteall&q=", m = j
				.Id();
		l += m.join(",");
		l += "&zx=" + (new Date).getTime();
		_sendx(l, ua, igFI_d)
	}
	function da() {
		var l = ["/finance/portfolio?", "client=ig&action=view&output=xml"];
		h || l.push("&auto=1");
		_sendx(l.join(""), va, igFI_b)
	}
	function fa(l) {
		if (l) {
			var m = ["/finance/info?oe=utf8&client=ig&q=", l,
					"&infotype=infoquoteall&zx=", (new Date).getTime()];
			_sendx(m.join(""), wa, igFI_d)
		} else {
			g = igFI_b;
			W()
		}
	}
	function X() {
	}
	function va(l) {
		d.fh(l);
		g = igFI_b;
		W()
	}
	function wa(l) {
		l = l.substring(l.indexOf("["));
		d.dh(l);
		d.hg() && alert(b.getMsg("invalid_tickers"));
		U("a");
		g = igFI_b;
		W()
	}
	function ua(l) {
		l = l.substring(l.indexOf("["));
		d.eh(l);
		f = igFI_b;
		W()
	}
	function $() {
		return i != "/accounts" ? igFI_d : igFI_b
	}
	function la(l, m) {
		if (!m)
			return igFI_d;
		var r = "," + m + ",";
		if (l && l.search(r) != -1)
			return igFI_b;
		return igFI_d
	}
	function Y(l) {
		for (var m = d.da()[l], r = [], o = 0; o < m.items.length; o++)
			r.push(m.items[o].ticker);
		return r.join(q)
	}
	function ca(l) {
		var m = {
			cn : ".name { width: 25% } .last { width: 15% } .change { width: 15% } .perc_change { width: 10% } .remove { width: 5% }"
		};
		m[l] && igFI_.style.installStyles(m[l])
	}
	a.determineMarketCountry = function(l, m) {
		if (l == "AutoSelect")
			switch (m) {
				case "ca" :
					return "Canada";
				case "co.uk" :
					return "UK";
				case "cn" :
					return "China";
				case "com.hk" :
					return "HK";
				default :
					return "USA"
			}
		else
			return l
	};
	a.onIFrameLoadedCn = function() {
		E && a.refresh();
		var l = b.getString("stock_tickers"), m = b.getString("stock_names"), r = b
				.getString("last_country"), o = b.getString("country");
		if (l && m && r == o)
			a.showChart(l, m);
		else {
			a.showIndexChart();
			b.set("last_country", o)
		}
		var s = new Object({
					Canada : "",
					China : "_ccn",
					HK : "_hk",
					UK : "_uk",
					USA : ""
				}), t = a.determineMarketCountry(o, F), w = _gel(e
				+ "time_axis");
		if (w)
			w.src = "/ig/modules/finance/time_axis_labels" + s[t] + ".gif";
		var H = _gel(e + "update_box");
		if (H) {
			var O = new Date, Z = [b.getMsg("last_updated_time"), ":",
					O.getMonth() + 1, b.getMsg("month"), O.getDate(),
					b.getMsg("day"), O.getHours(), ":",
					Math.floor(O.getMinutes() / 10), O.getMinutes() % 10], V = [
					"&nbsp;&nbsp", '<a href="" onclick="init();return !1;">',
					b.getMsg("refresh"), "</a>"];
			H.innerHTML = Z.join("") + V.join("")
		}
	};
	a.showIndexChart = function() {
		var l = d.da(), m = [], r = [], o = l.m;
		if (o)
			for (var s = 0, t = o.items.length; s < t && s < 4; s++) {
				m.push(o.items[s].ticker);
				r.push(o.items[s].cname)
			}
		a.showChart(m.join(","), r.join(","))
	};
	a.showChart = function(l, m) {
		var r = _gel(e + "chart_img");
		if (r)
			r.src = "/finance/chart?cht=c&chlc=" + b.getMsg("chart_color")
					+ "&q=" + l;
		b.set("stock_tickers", l);
		b.set("stock_names", m);
		m = m.split(",");
		for (var o = 0, s = m.length; o < 4; o++)
			if (o < s) {
				var t = _gel(e + "label_div_" + o);
				if (t)
					t.style.display = "block";
				var w = _gel(e + "label_name_" + o);
				if (w)
					w.innerHTML = m[o]
			} else if (t = _gel(e + "label_div_" + o))
				t.style.display = "none"
	}
})();
