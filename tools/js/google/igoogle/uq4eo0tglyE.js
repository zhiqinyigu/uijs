function ig_et_a(a) {
	var b = a || document.location.href, d, c = b.indexOf("?");
	if (c == -1)
		return "";
	var e = b.indexOf("#");
	d = e == -1 ? b.substr(c + 1) : b.substr(c + 1, e - c - 1) + "&"
			+ b.substr(e + 1);
	return d.split("&")
}
function _esc(a) {
	return window.encodeURIComponent ? encodeURIComponent(a) : escape(a)
}
function _unesc(a) {
	return window.decodeURIComponent ? decodeURIComponent(a) : unescape(a)
}
function _argsUrl(a) {
	for (var b = {}, d = ig_et_a(a), c = 0; c < d.length; c++) {
		var e = d[c].indexOf("=");
		if (!(e == -1)) {
			var f = d[c].substring(0, e), g = d[c].substring(e + 1);
			g = g.replace(/\+/g, " ");
			b[f] = _unesc(g)
		}
	}
	return b
};
window._varz_numerrors = 0;
function ig_et_(a) {
	this.b = window.onerror;
	this.a = {};
	for (var b in ig_et_.e)
		this.a[b] = ig_et_.e[b];
	if (a)
		for (b in a)
			if (ig_et_.e[b])
				this.a[b] = a[b];
	this.a.uniqueTimestamp = (new Date).getTime();
	window.onerror = this.d()
}
ig_et_.prototype.c = 0;
ig_et_.e = {
	maxNumErrorsToSend : 3,
	urlToLogTo : "/ig/jserrors"
};
ig_et_.prototype.f = function() {
	window.onerror = this.b;
	this.b = null;
	this.i = false
};
ig_et_.prototype.d = function() {
	var a = this;
	return function(b, d, c) {
		a.g(b, d, c)
	}
};
ig_et_.prototype.g = function(a, b, d) {
	++window._varz_numerrors;
	try {
		var c = {};
		c.msg = a;
		c.url = b;
		c.line = d;
		if (this.b)
			try {
				this.b(a, b, d)
			} catch (e) {
			}
		this.h(c)
	} catch (f) {
		this.f();
		throw f;
	}
};
ig_et_.prototype.h = function(a) {
	this.f();
	var b = _argsUrl(document.location.href).parent || "";
	(new Image).src = [b, this.a.urlToLogTo, "?ts=", this.a.uniqueTimestamp,
			"&sent=", this.c, "&url=", _esc(a.url), "&line=", a.line, "&msg=",
			_esc(a.msg)].join("");
	this.c++;
	if (this.c < this.a.maxNumErrorsToSend) {
		this.b = window.onerror;
		window.onerror = this.d();
		this.i = true
	}
};
var _IG_errorTracker = new ig_et_;
var ig_a = true, ig_ = null, ig_b = false;
function ig_c(a) {
	var b = window;
	if (a != "")
		for (var c = a.split("."); c.length;) {
			var d = c.shift();
			if (typeof b[d] != "object")
				b[d] = {};
			b = b[d]
		}
	return b
}
(function() {
	function a(c, d) {
		for (var e = ig_c(c), f = 0; f < d.length; f += 2)
			e[d[f]] = d[f + 1]
	}
	function b(c, d, e, f, g) {
		if (f)
			for (var h = 0; h < f.length; h += 2)
				e.prototype[f[h]] = f[h + 1];
		if (g)
			for (h = 0; h < g.length; h += 2)
				e[g[h]] = g[h + 1];
		a(c, [d, e])
	}
	a("", ["_exportSymbols", a]);
	a("", ["_exportClass", b])
})();
function ig_aa(a, b, c) {
	if (!a.className)
		return ig_b;
	for (var d = a.className.split(" "), e = [], f = ig_b, g = 0; g < d.length; ++g)
		if (d[g] != b)
			e.push(d[g]);
		else {
			f = ig_a;
			c && e.push(c)
		}
	a.className = e.join(" ");
	return f
};
function ig_d(a) {
	var b = a || document.location.href, c, d = b.indexOf("?");
	if (d == -1)
		return "";
	var e = b.indexOf("#");
	c = e == -1 ? b.substr(d + 1) : b.substr(d + 1, e - d - 1) + "&"
			+ b.substr(e + 1);
	return c.split("&")
}
function _esc(a) {
	return window.encodeURIComponent ? encodeURIComponent(a) : escape(a)
}
function _unesc(a) {
	return window.decodeURIComponent ? decodeURIComponent(a) : unescape(a)
}
function _argsUrl(a) {
	for (var b = {}, c = ig_d(a), d = 0; d < c.length; d++) {
		var e = c[d].indexOf("=");
		if (!(e == -1)) {
			var f = c[d].substring(0, e), g = c[d].substring(e + 1);
			g = g.replace(/\+/g, " ");
			b[f] = _unesc(g)
		}
	}
	return b
}
function ig_ba(a) {
	var b = a.split("#");
	if (/[?&]$/.test(b[0]))
		b[0] = b[0].replace(/[?&]$/, "");
	else {
		var c = /\?/.test(b[0]) ? "&" : "?";
		b[0] += c
	}
	return b.join("#")
};
var ig_ca = {
	domload : 1,
	xsetpdone : 1,
	moduleedit : 1,
	modulesocialedit : 1,
	modulecanceledit : 1,
	moduledelete : 1,
	moduleundelete : 1,
	modulezip : 1,
	moduleunzip : 1,
	modulemaximize : 1,
	moduleunmaximize : 1,
	moduledragstart : 1,
	moduledragend : 1,
	moduletitleclick : 1,
	load : 1,
	unload : 1,
	resize : 1
}, ig_e = {}, ig_da = {
	dragstart : 1,
	dragend : 1,
	titleclick : 1,
	edit : 1,
	socialedit : 1,
	canceledit : 1,
	"delete" : 1,
	undelete : 1,
	zip : 1,
	unzip : 1,
	maximize : 1,
	unmaximize : 1
};
function ig_ea(a) {
	if (a.hasOwnProperty && a.hasOwnProperty("ig_event_hashcode_"))
		return a.ya;
	a.ya || (a.ya = ++ig_f.Lb);
	return a.ya
}
function ig_fa(a) {
	return "builtin_" + a
}
function ig_ga(a, b) {
	if (a.indexOf && a.indexOf("m_") == 0)
		a = a.substring(2);
	return "builtin_m" + a + "_" + b
}
function ig_ha(a, b) {
	return "builtin_" + ig_f.Ib(a) + "_" + b
}
function ig_ia(a) {
	return "custom_" + a
}
function ig_ja() {
	for (var a in ig_f.c) {
		for (var b = 0; b < ig_f.c[a].length; b++)
			delete ig_f.c[a][b];
		if (a in ig_f.R) {
			var c = ig_f.R[a], d = c[0], e = c[1], f = c[2];
			if (d.removeEventListener)
				d.removeEventListener(e, f, ig_b);
			else
				d.detachEvent && d.detachEvent("on" + e, f);
			delete ig_f.R[a]
		}
	}
	ig_e = {}
}
function ig_ka(a, b, c) {
	for (var d = c; d < b.length; d++)
		a[a.length] = b[d];
	return a
}
function ig_la(a, b) {
	if (a in ig_f.c)
		for (var c = 0; c < ig_f.c[a].length; c++)
			if (ig_f.c[a][c] === b) {
				ig_f.c[a][c] = ig_;
				return ig_a
			}
	return ig_b
}
function ig_ma(a) {
	if (a in ig_f.c)
		for (var b = 0; b < ig_f.c[a].length; b++)
			if (ig_f.c[a][b]) {
				for (var c = [], d = 1; d < arguments.length; d++)
					c[c.length] = arguments[d];
				ig_f.c[a][b].apply(this, c)
			}
}
function ig_na(a, b) {
	if (!(a in ig_f.Sb))
		throw Error("Unsupported event type: " + a);
	var c = ig_f.ja(a);
	c in ig_f.c || (ig_f.c[c] = []);
	ig_f.c[c][ig_f.c[c].length] = b;
	return ig_f.c[c].length
}
function ig_oa(a, b, c) {
	if (!(b in ig_f.Tb))
		throw Error("Unsupported module event type: " + b);
	var d = ig_f.ka(a, b);
	d in ig_f.c || (ig_f.c[d] = []);
	ig_f.c[d][ig_f.c[d].length] = c
}
function ig_pa(a, b, c) {
	var d = ig_f.Ya(a, b);
	if (!(d in ig_f.c)) {
		ig_f.c[d] = [];
		var e = function(g) {
			if (!g)
				g = window.event;
			ig_f.ba.apply(a, [d, g])
		};
		if (a.addEventListener)
			a.addEventListener(b, e, ig_b);
		else if (a.attachEvent)
			a.attachEvent("on" + b, e);
		else
			throw Error("Object {" + a + "} does not support DOM events.");
		ig_f.R[d] = [a, b, e]
	}
	var f = ig_f.c[d].length;
	if (a === window && b == "unload" && f > 0) {
		ig_f.c[d][f] = ig_f.c[d][f - 1];
		ig_f.c[d][f - 1] = c
	} else if (ig_e[b])
		setTimeout(c, 10);
	else
		ig_f.c[d][f] = c
}
function ig_qa(a, b) {
	var c = ig_f.ia(a);
	c in ig_f.c || (ig_f.c[c] = []);
	ig_f.c[c][ig_f.c[c].length] = b
}
function ig_ra(a, b) {
	var c = ig_f.ja(a);
	return ig_f.$(c, b)
}
function ig_sa(a, b, c) {
	var d = ig_f.ka(a, b);
	return ig_f.$(d, c)
}
function ig_ta(a, b, c) {
	var d = ig_f.Ya(a, b);
	return ig_f.$(d, c)
}
function ig_ua(a, b) {
	var c = ig_f.ia(a);
	return ig_f.$(c, b)
}
function ig_va(a) {
	var b = a == "load" || a == "domload", c = ig_b;
	if (b) {
		(c = ig_e[a]) || _IG_TriggerCustomEvent(a + "_start");
		ig_e[a] = ig_a
	}
	var d = ig_f.J([ig_f.ja(a)], arguments, 1);
	ig_f.ba.apply(window, d);
	b && !c && _IG_TriggerCustomEvent(a + "_end")
}
function ig_g() {
	var a = ig_f.J([], arguments, 0);
	setTimeout(function() {
				ig_f.triggerEvent.apply(window, a)
			}, 0)
}
function ig_wa(a, b) {
	var c = ig_f.J([ig_f.ka(a, b)], arguments, 2);
	ig_f.ba.apply(window, c)
}
function ig_h() {
	var a = ig_f.J([], arguments, 0);
	setTimeout(function() {
				ig_f.triggerModuleEvent.apply(window, a)
			}, 0)
}
function ig_xa(a) {
	var b = ig_f.J([ig_f.ia(a)], arguments, 1);
	ig_f.ba.apply(window, b)
}
function ig_ya() {
	var a = ig_f.J([], arguments, 0);
	setTimeout(function() {
				ig_f.triggerCustomEvent.apply(window, a)
			}, 0)
}
function ig_i(a, b) {
	switch (a) {
		case "delete" :
		case "undelete" :
		case "edit" :
		case "socialedit" :
		case "canceledit" :
		case "zip" :
		case "unzip" :
		case "maximize" :
		case "unmaximize" :
			ig_h(b, a);
			ig_g("module" + a, b);
			break
	}
}
function _IG_delayScript(a, b) {
	var c, d = !isNaN(b) && b || 10000;
	function e() {
		clearTimeout(c);
		_IG_RemoveEventHandler("load", e);
		setTimeout(a, 0)
	}
	c = setTimeout(e, d);
	_IG_AddEventHandler("load", e)
}
var ig_f = {
	Lb : 0,
	c : {},
	R : {},
	Sb : ig_ca,
	Tb : ig_da,
	Ib : ig_ea,
	ja : ig_fa,
	ka : ig_ga,
	Ya : ig_ha,
	ia : ig_ia,
	Eb : ig_ja,
	J : ig_ka,
	$ : ig_la,
	ba : ig_ma,
	addEventHandler : ig_na,
	addModuleEventHandler : ig_oa,
	addDOMEventHandler : ig_pa,
	addCustomEventHandler : ig_qa,
	removeEventHandler : ig_ra,
	removeModuleEventHandler : ig_sa,
	removeDOMEventHandler : ig_ta,
	removeCustomEventHandler : ig_ua,
	triggerEvent : ig_va,
	triggerModuleEvent : ig_wa,
	triggerCustomEvent : ig_xa,
	triggerDelayedEvent : ig_g,
	triggerDelayedModuleEvent : ig_h,
	triggerDelayedCustomEvent : ig_ya
}, _IG_AddEventHandler = ig_f.addEventHandler, _IG_AddModuleEventHandler = ig_f.addModuleEventHandler, _IG_AddGadgetEventHandler = ig_f.addModuleEventHandler, _IG_AddDOMEventHandler = ig_f.addDOMEventHandler, _IG_AddCustomEventHandler = ig_f.addCustomEventHandler, _IG_RemoveEventHandler = ig_f.removeEventHandler, _IG_RemoveModuleEventHandler = ig_f.removeModuleEventHandler, _IG_RemoveGadgetEventHandler = ig_f.removeModuleEventHandler, _IG_RemoveDOMEventHandler = ig_f.removeDOMEventHandler, _IG_RemoveCustomEventHandler = ig_f.removeCustomEventHandler, _IG_TriggerEvent = ig_f.triggerEvent, _IG_TriggerModuleEvent = ig_f.triggerModuleEvent, _IG_TriggerGadgetEvent = ig_f.triggerModuleEvent, _IG_TriggerCustomEvent = ig_f.triggerCustomEvent, _IG_TriggerDelayedEvent = ig_f.triggerDelayedEvent, _IG_TriggerDelayedModuleEvent = ig_f.triggerDelayedModuleEvent, _IG_TriggerDelayedGadgetEvent = ig_f.triggerDelayedModuleEvent, _IG_TriggerDelayedCustomEvent = ig_f.triggerDelayedCustomEvent;
_IG_AddDOMEventHandler(window, "unload", ig_f.Eb);
_IG_AddDOMEventHandler(window, "load", function() {
			_IG_TriggerEvent("load")
		});
_IG_AddDOMEventHandler(window, "unload", function() {
			_IG_TriggerEvent("unload")
		});
_IG_AddDOMEventHandler(window, "resize", function() {
			_IG_TriggerEvent("resize")
		});
function _IG_RegisterOnloadHandler(a) {
	_IG_AddEventHandler("domload", a)
}
function _IG_LoadLibraryDeferred(a, b) {
	_IG_RegisterOnloadHandler(function() {
				_IG_LoadScript(a, b)
			})
}
_exportSymbols("google.gadgets.Events", ["addHandler", _IG_AddEventHandler,
				"removeHandler", _IG_RemoveEventHandler, "addOnloadHandler",
				_IG_RegisterOnloadHandler]);
function _IG_RegisterMaximizeHandler(a, b) {
	_IG_AddModuleEventHandler(a, "unmaximize", function() {
				b(ig_b)
			});
	_IG_AddModuleEventHandler(a, "maximize", function() {
				b(ig_a)
			})
};
function ig_j(a, b) {
	var c = function() {
	};
	c.prototype = a.prototype;
	b.prototype = new c
}
function _gel(a) {
	return document.getElementById(a)
}
function _gelstn(a, b) {
	var c = b || document;
	if (a == "*" && c.all)
		return c.all;
	return c.getElementsByTagName ? c.getElementsByTagName(a) : []
}
function _gelsbyregex(a, b, c) {
	for (var d = _gelstn(a, c), e = [], f = 0, g; g = d[f]; ++f)
		b.test(g.id) && e.push(g);
	return e
}
function _uc(a) {
	return a.toUpperCase()
}
function _trim(a) {
	return a.replace(/^\s*|\s*$/g, "")
}
function _jesc(a) {
	return a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"')
}
function _toggle(a) {
	if (a)
		if (a.style.display == "" || a.style.display == "block")
			a.style.display = "none";
		else if (a.style.display == "none")
			a.style.display = "block"
}
function _hesc(a) {
	return a.replace(/</g, "&lt;").replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}
function _striptags(a) {
	return a.replace(/<\/?[^>]+>/gi, "")
}
function _ig_gmid_(a) {
	return a.split("_")[2]
}
function _showUserPrefs(a, b) {
	if (b) {
		ig_k("m_" + a + "_editbox", "none");
		ig_k("m_" + a + "_aclbox", "block");
		ig_i("socialedit", "m_" + a)
	} else {
		ig_k("m_" + a + "_editbox", "");
		ig_k("m_" + a + "_aclbox", "none");
		ig_i("edit", "m_" + a)
	}
	var c = _gel("m_" + a);
	if (c)
		c.className = "modbox_e"
}
function _closeUserPrefs(a) {
	ig_k("m_" + a + "_editbox", "none");
	ig_k("m_" + a + "_aclbox", "none");
	var b = _gel("m_" + a);
	if (b)
		b.className = "modbox"
}
function _min(a, b) {
	return a < b ? a : b
}
function _max(a, b) {
	return a > b ? a : b
}
function _IG_LoadScript(a, b) {
	_sendx(a, function(c) {
				window.eval(c);
				eval(b)
			})
}
function _IG_LoadScriptCallback(a, b) {
	_sendx(a, function(c) {
				window.eval(c);
				b && b()
			})
}
function _IG_LoadScriptXDomain(a, b, c) {
	var d = document.createElement("script");
	d.src = a;
	_gelstn("head")[0].appendChild(d);
	function e() {
		eval(b) ? c() : setTimeout(function() {
					e()
				}, 100)
	}
	b && e()
}
function _IG_LoadCss(a) {
	var b = _gelstn("head")[0];
	if (!b)
		throw new Error("Document is missing <head> element.  Failed to load CSS.");
	var c = document.createElement("style");
	c.type = "text/css";
	if (c.styleSheet)
		c.styleSheet.cssText = a;
	else
		c.appendChild(document.createTextNode(a));
	b.insertBefore(c, b.firstChild)
}
function _log(a) {
	var b = "/ig/log?msg=" + _esc(a);
	_sendx(b)
}
function _sendx(a, b, c, d) {
	var e = ig_l();
	e.open(d ? "POST" : "GET", a, ig_a);
	if (b)
		e.onreadystatechange = function() {
			if (e.readyState == 4)
				b(c && e.responseXML ? e.responseXML : e.responseText)
		};
	e.send(d || ig_)
}
function ig_l() {
	var a = ig_;
	if (window.ActiveXObject)
		(a = new ActiveXObject("Msxml2.XMLHTTP"))
				|| (a = new ActiveXObject("Microsoft.XMLHTTP"));
	else if (window.XMLHttpRequest)
		a = new XMLHttpRequest;
	return a
}
var _et = "", _brand = "", _bmod = "", _source = "", _ae = "", _pid = "", _authpath = "", _prefid = "", _setp_url = "/ig/setp", _hl = "", _old_html = ig_a, _use_old_feed_styles = ig_a, ig_m = ig_, ig_n = ig_;
function ig_o(a, b, c) {
	var d = a.elements[b];
	if (d)
		d.value = c;
	else {
		var e = document.createElement("input");
		e.type = "hidden";
		e.name = b;
		e.value = c;
		a.appendChild(e)
	}
}
function _args() {
	return _argsUrl(document.location.href)
}
function _IG_isIE() {
	return /msie/i.test(navigator.userAgent)
}
function _qs(a) {
	var b = {
		pid : 1,
		host : 1,
		gl : 1,
		hl : 1,
		enable_flag : 1,
		e : 1,
		expid : 1
	}, c = a || _args(), d = ["?"];
	for (var e in c)
		b[e] && d.push(e, "=", _esc(c[e]), "&");
	return d.join("")
}
var ig_za = /^([^?#]+)(?:\?([^#]*))?(#.*)?/;
function ig_p(a, b) {
	var c = ig_za.exec(a), d = [c[1], "?", c[2]];
	d.push(c[2] ? "&" : "", b.join("&"), c[3]);
	return d.join("")
}
function ig_q(a) {
	var b = {
		url : document.location,
		et : _et,
		brand : _brand,
		bmod : _bmod,
		source : _source,
		ae : _ae,
		pid : _pid,
		ap : _authpath,
		prefid : _prefid
	};
	for (var c in b)
		b[c] && ig_o(a, c, b[c])
}
function _submit_form(a, b) {
	a.action = _setp_url + _qs() + b;
	a.method = "get";
	ig_q(a);
	a.submit()
}
function _fsetp(a, b, c) {
	a.action = _setp_url;
	a.method = "get";
	ig_q(a);
	ig_o(a, "m_" + b + "_t", c);
	var d = _args(), e = d.host, f = d.hl;
	e && ig_o(a, "host", e);
	f && ig_o(a, "hl", f);
	return ig_a
}
var ig_r = [], ig_s = ig_b;
function ig_Aa(a) {
	for (var b = [], c = 0; c < a.length; ++c)
		if (!(a[c].length != 2)) {
			var d = a[c][0], e = a[c][1];
			e != ig_ && e != "" && b.push(d + "=" + e)
		}
	return b.join("&")
}
function ig_t() {
	return ig_Aa([["et", _et], ["pid", _pid], ["ap", _authpath],
			["brand", _brand], ["bmod", _bmod], ["source", _source],
			["ae", _ae], ["prefid", _prefid]])
}
function ig_u() {
	if (ig_r.length == 0)
		ig_s = ig_b;
	else {
		ig_s = ig_a;
		var a = _setp_url + _qs() + ig_t(), b = ig_r.join("&");
		ig_r = [];
		var c = a.length + b.length >= 1800;
		if (c)
			_sendx(a, ig_v, ig_b, b);
		else {
			a += "&" + b;
			_sendx(a, ig_v, ig_b, ig_)
		}
	}
}
function ig_v() {
	_IG_TriggerDelayedEvent("xsetpdone");
	ig_u()
}
function _xsetp(a) {
	ig_r.push(a);
	ig_s || ig_u()
}
function _xsetp_is_done() {
	return ig_r.length == 0 && ig_s == ig_b
}
function _dlsetp(a, b) {
	b || (b = _esc(document.location));
	document.location = _setp_url + _qs() + ig_t() + "&url=" + b + "&" + a
}
function _removeTabParam(a) {
	return a.replace(/(\?.*\b)(t\=[^&#]*[&#]?)/g, "$1")
}
function _select_tab(a, b) {
	var c = b || "/ig";
	window.location.href = c + _qs() + "t=" + a
}
function _select_tab_and_log(a, b) {
	_sendx("/ig/ui?xp=v2&action=selectTab&t=" + a);
	_select_tab(a, b)
}
function _select_gadget_and_log(a, b) {
	_sendx("/ig/ui?xp=v2&action=maximizeMod&from=selectMod&mid=" + b);
	window.location.href = "/ig" + _qs() + "t=" + a + "&g=" + b
}
function ig_k(a, b) {
	var c = _gel(a);
	if (c)
		c.style.display = b
}
_exportSymbols("", ["setDisplayStyle", ig_k]);
function _ssbc(a, b, c) {
	for (var d = _gelstn("*"), e = 0, f; f = d[e]; e++)
		if (f.className == a)
			f.style[b] = c
}
function ig_Ba(a) {
	for (var b = _gelstn("*"), c = 0, d; d = b[c]; c++)
		for (var e = 0; e < a.length; e++)
			if (d.className == a[e][0])
				d.style[a[e][1]] = a[e][2]
}
function _findPos(a) {
	for (var b = 0, c = 0; a != ig_;) {
		b += a.offsetLeft;
		c += a.offsetTop;
		a = a.offsetParent
	}
	return [b, c]
}
function _getGadgetContainer(a) {
	var b = _gel("m_" + a + "_b");
	if (!b) {
		b = _gel("remote_" + a);
		if (!b)
			b = document.body
	}
	return b
}
function _appendMaxAgeParameter(a, b) {
	var c = /[?&]$/.test(a);
	return a + (c ? "" : "&") + "max_age=" + b + (c ? "&" : "")
}
function _getStyle(a, b) {
	var c;
	if (typeof a.currentStyle != "undefined")
		c = a.currentStyle;
	else if (document.defaultView.getComputedStyle != "undefined")
		c = document.defaultView.getComputedStyle(a, ig_);
	else
		return "";
	return c[b]
}
function ig_w() {
	for (var a = _IG_MD, b = 0; b < arguments.length; ++b) {
		a = a[arguments[b]];
		if (a == ig_)
			return ig_
	}
	return a
}
_exportSymbols("google.gadgets.Util", ["args", _args]);
_exportSymbols("", ["addParamPairsToUrl", ig_p, "xmlhttp", ig_l]);
if (!window.FLAG_isInSplitJS)
	window.FLAG_isInSplitJS = ig_b;
function ig_x(a) {
	this.l = [];
	this.za = a;
	this.M("_IG_DD_open");
	this.M("_IG_hoverHeader");
	this.M("_IG_hoverModule");
	this.v("_IG_DD_create");
	this.v("_IG_DD_init");
	this.v("_IG_initDrag");
	this.v("_IG_PushHistory");
	this.v("_IG_PU_MakeDialogButton")
}
ig_x.prototype.Ga = ig_b;
ig_x.prototype.ma = ig_b;
ig_x.vb = 10000;
ig_x.prototype.v = function(a) {
	if (this.za) {
		var b = window, c = a.lastIndexOf(".");
		if (c >= 0) {
			b = ig_c(a.substring(0, c));
			a = a.substring(c + 1)
		}
		if (b[a] && !b[a].fb)
			throw new Error(a + " is already defined.");
		b[a] = this.Za(a)
	}
};
ig_x.prototype.M = function(a) {
	if (this.za) {
		var b = window, c = a.lastIndexOf(".");
		if (c >= 0) {
			b = ig_c(a.substring(0, c));
			a = a.substring(c + 1)
		}
		b[a] = function() {
		}
	}
};
ig_x.prototype.Za = function(a) {
	var b = this, c = function() {
		for (var d = [], e = 0; e < arguments.length; e++)
			d.push(arguments[e]);
		b.l.push([a, this, d])
	};
	c.fb = ig_a;
	return c
};
ig_x.prototype.ha = function() {
	if (!(this.l.length == 0)) {
		var a = this.l.shift(), b = a[0], c = a[1], d = a[2];
		try {
			var e = b instanceof Function ? b : window[b];
			e.apply(c, d)
		} catch (f) {
		}
		if (this.l.length > 0) {
			var g = this;
			setTimeout(function() {
						g.ha()
					}, 0)
		} else {
			this.ma = ig_a;
			this.mb()
		}
	}
};
ig_x.prototype.Va = function() {
	for (var a = [], b = 0; b < this.l.length; b++) {
		var c = this.l[b][0];
		if (!(c instanceof Function))
			if (window[c].fb) {
				a.push(c);
				this.l.splice(b, 1);
				b--
			}
	}
	var d = this;
	setTimeout(function() {
				d.ha()
			}, 0);
	if (a.length > 0)
		throw new Error("The following functions were not found in the post load file: "
				+ a.join(", "));
};
ig_x.prototype.mb = function() {
	for (var a = _gelstn("*"), b = 0; b < a.length; b++) {
		var c = a[b];
		c.className && c.className.split && ig_aa(c, "disabled", ig_)
	}
};
ig_x.prototype.jb = function(a, b) {
	var c = this.ib(b);
	_IG_AddEventHandler(a, c);
	setTimeout(c, ig_x.vb)
};
ig_x.prototype.ib = function(a) {
	var b = this;
	return function() {
		if (!b.Ga) {
			_IG_LoadScriptXDomain(a,
					"window._IG_noMaxSupportTransitionStrategy", function() {
						b.Va()
					});
			b.Ga = ig_a
		}
	}
};
ig_x.prototype.Ua = function(a) {
	this.ma || !this.za ? a() : this.l.push([a, ig_, []])
};
var ig_y;
ig_y || (ig_y = new ig_x(window.FLAG_isInSplitJS));
function _IG_callPostLoad(a) {
	ig_y.Ua(a)
}
function _IG_deferFunction(a) {
	ig_y.v(a)
}
function _IG_ignoreFunction(a) {
	ig_y.M(a)
}
function _IG_loadPostloadJS(a, b) {
	ig_y.jb(a, b)
};
function _edit(a, b) {
	var c = function() {
		b && b();
		_sendx("/ig/ui?action=editsettings&m=" + a);
		ig_i("edit", "m_" + a)
	}, d = ig_z[a];
	if (d) {
		d();
		c()
	} else
		_IG_LL_load("m_" + a + "_editbox", {
					mid : a
				}, function() {
					_showUserPrefs(a, ig_b);
					c()
				});
	return ig_b
}
var ig_z = {};
function _IG_AddCustomEditHandler(a, b) {
	ig_z[a] = b
}
function _cedit(a) {
	_closeUserPrefs(a);
	var b = _gel("m_" + a + "_form");
	if (b) {
		b.reset();
		_sendx("/ig/ui?action=canceledit&m=" + a);
		ig_i("canceledit", "m_" + a);
		return ig_b
	}
}
function _uhc(a, b, c) {
	var d = "m_" + a + "_" + b, e = _gel(d);
	if (!e) {
		e = document.createElement("INPUT");
		e.type = "hidden";
		e.disabled = ig_a;
		e.name = d;
		_gel("m_" + a + "_form").appendChild(e)
	}
	e.value = c;
	e.disabled = ig_b
}
function _confirmDel(a, b, c, d) {
	var e = _get_module_title(a);
	d = d.replace(/MODULE_TITLE/, '"' + e + '"');
	confirm(d) && _del(a, b, c)
}
function _get_module_title(a) {
	if (typeof a == "object")
		a = a.id.replace("m_", "");
	else if (typeof a == "string")
		a = a.replace("m_", "");
	var b = _gel("m_" + a + "_title");
	return b ? _striptags(b.innerHTML) : ""
}
function _get_all_modules() {
	for (var a = ig_Ca(), b = [], c = /^m_[0-9]+$/, d = 0; d < a.length; d++) {
		b[d] = [];
		for (var e = b[d], f = 0; f < a[d].childNodes.length; f++) {
			var g = a[d].childNodes[f];
			g.tagName == "DIV" && g.style.display != "none" && g.id
					&& c.test(g.id) && e.push(g)
		}
	}
	if (window.gadgets && window.gadgets.views
			&& window.gadgets.views.ViewManager
			&& window.gadgets.views.ViewManager.getCurrentMaxId) {
		var h = window.gadgets.views.ViewManager.getCurrentMaxId();
		h && b.length > 0 && h && b[0].unshift(_gel("m_" + h))
	}
	return b
}
function ig_Ca() {
	for (var a = _gelsbyregex("DIV", /^c_[0-9]+$/), b = [], c = 0; c < a.length; c++)
		a[c].style.display != "none" && b.push(a[c]);
	return b
}
var ig_A = ig_b;
function _del_is_done() {
	return _xsetp_is_done() && ig_A
}
function _del(a, b, c) {
	ig_A = ig_b;
	_xsetp("m_" + a + "_enab=0&m_" + a + "_t=" + b);
	var d = _gel("undel_msg");
	if (d) {
		_gel("undel_title").innerHTML = "&quot;" + _get_module_title(a)
				+ "&quot; ";
		d.style.display = "block";
		ig_k("undo_msg", "none");
		ig_k("undo_restore_msg", "none")
	}
	ig_k("m_" + a, "none");
	ig_m = a;
	ig_n = c;
	ig_k(c, "");
	_mod = ig_a;
	ig_i("delete", "m_" + a);
	ig_A = ig_a;
	return ig_b
}
function _undel() {
	if (!(ig_m == ig_)) {
		var a = "m_" + ig_m, b = _gel(a);
		if (b) {
			ig_k(a, "block");
			_xsetp("undel")
		}
		ig_k("undel_msg", "none");
		ig_n != ig_ && ig_k(ig_n, "none");
		ig_n = ig_m = ig_;
		ig_i("undelete", a)
	}
}
function _isModuleZipped(a) {
	var b = _gel("m_" + a + "_b");
	if (b)
		return b.style.display == "none";
	return ig_b
}
function _zm(a, b, c) {
	var d = _gel("m_" + a + "_b");
	if (d) {
		var e = !_isModuleZipped(a);
		d.style.display = e ? "none" : "block";
		var f = _gel("m_" + a + "_zippy");
		if (f)
			f.className = e
					? f.className.replace(/minbox/, "maxbox")
					: f.className.replace(/maxbox/, "minbox");
		var g = c ? "mmz" : "mz";
		_xsetp(g + "=" + a + ":" + (e ? "1" : "0") + "&t=" + b);
		ig_i(e ? "zip" : "unzip", a)
	}
	return ig_b
}
function ig_Da(a) {
	_xsetp("pnlo=" + (a ? 1 : 0))
}
var _uli, _pnlo, _mpnlo, _pl, _mod, _cbp = ig_b, ig_B = ig_b, _table = ig_, _tabs = ig_;
function _upc() {
	var a = [];
	_cbp || (a[a.length] = ["medit", "display", _uli ? "" : "none"]);
	a[a.length] = ["panelo", "display", _pnlo ? "" : "none"];
	a[a.length] = ["panelc", "display", _pnlo ? "none" : ""];
	if (_mod) {
		a[a.length] = ["unmod", "display", "none"];
		a[a.length] = ["mod", "display", ""]
	} else {
		a[a.length] = ["mod", "display", "none"];
		a[a.length] = ["unmod", "display", ""]
	}
	ig_Ba(a);
	_IG_callPostLoad(_init_drag_drop)
}
function _init_drag_drop() {
	if (_pl)
		if (_cbp || _uli)
			if (!ig_B && !_mpnlo) {
				_IG_TriggerCustomEvent("initdrag", _table, _tabs);
				ig_B = ig_a
			}
}
var ig_C = 0;
function _tp(a) {
	ig_C > 0 && clearInterval(ig_C);
	_pnlo = a;
	_mod = ig_a;
	ig_Da(a);
	_upc();
	var b = _gel("cpnl"), c = _gel("cpnlc"), d = b.offsetWidth, e, f;
	if (a) {
		e = c.offsetWidth;
		f = "visible";
		ig_k("ehdr", "");
		ig_k("nhdr", "none")
	} else {
		e = 1;
		f = "hidden";
		ig_k("ehdr", "none");
		ig_k("nhdr", "")
	}
	b.style.overflow = "hidden";
	var g = 100, h = 10, i = 0;
	ig_C = setInterval(function() {
				var j = i / h, k = d + (e - d) * j;
				b.style.width = k + "px";
				i++;
				if (j >= 1) {
					clearInterval(ig_C);
					ig_C = 0;
					b.style.width = e + "px";
					b.style.overflow = f
				}
			}, g / h);
	return ig_b
}
function _ts(a, b) {
	var c = _gel(a + b), d;
	if (c.className == "mlist_open") {
		c.className = "mlist_closed";
		d = "pnlsc"
	} else {
		c.className = "mlist_open";
		d = "pnlso"
	}
	_xsetp(d + "=" + _esc(b));
	return ig_b
}
function _add_m(a, b) {
	_dlsetp(a, b)
}
function _add_m_confirm(a, b, c) {
	confirm(b) && _add_m(a, c)
}
function _add_f(a) {
	_add_m("n_25=" + _esc("url=" + _esc(a)))
}
var ig_D = /^_add_m(_confirm)?\(\"[^"]+\"(, *\"[^"]+\")?\)$/, ig_E = ig_a;
function _find_feed_is_done() {
	return ig_E
}
function _find_feed(a) {
	ig_E = ig_b;
	var b = "acd";
	if (!a) {
		var c = _gelstn("div");
		if (c)
			for (var d = 0, e; e = c[d]; d++)
				e.id && e.id.indexOf("ps") == 0 && e.className == "mlist_open"
						&& _ts("ps", e.id.substring(2));
		if (_gel("add_custom"))
			a = _gel("add_custom").value
	}
	if (!a || a == "") {
		b = "advdsrch";
		a = _gel("add_advd").value
	}
	ig_k("ffresults", "none");
	ig_k("ffloading", "block");
	_sendx("/ig/feeds" + _qs() + "q=" + _esc(a) + "&page=" + _esc(b), ig_Ea);
	return ig_b
}
function ig_Ea(a) {
	ig_k("ffloading", "none");
	ig_k("ffresults", "block");
	if (a.length > 0 && a.charAt(0) == "<") {
		if (_gel("ffresults"))
			_gel("ffresults").innerHTML = a
	} else
		a.match(ig_D) != ig_ ? eval(a) : eval(a);
	ig_E = ig_a
}
function _add_remote_module(a, b, c) {
	_sendx("/ig/feeds" + _qs() + "module=1&q=" + _esc(a), function(d) {
				b();
				ig_Fa(d, c)
			});
	return ig_b
}
function ig_Fa(a, b) {
	var c = /_add_m_confirm\((\"[^"]+\"),\s*(\"[^"]+\")(,\s*\"[^"]+\")?\)/, d = /^alert\(\"[^"]+\"\)$/;
	if (a.match(ig_D) != ig_ || a.match(d) != ig_) {
		if (b)
			a = a.replace(c, "_add_m($1$3)");
		eval(a)
	}
}
function _ListApp(a, b, c) {
	this.items = a;
	this.deleted = [];
	this.item_constructor = b;
	this.module_id = c;
	this.app_name = "m_" + c + "_App";
	this.display_area = _gel("m_" + c + "_disp");
	this.sort_on_refresh = ig_a;
	this.value_input_field = _gel("m_" + c + "_val");
	this.name_input_field = _gel("m_" + c + "_name");
	if (!this.name_input_field)
		this.name_input_field = this.value_input_field;
	if (this.name_input_field) {
		this.default_name = this.name_input_field.value;
		this.default_value = this.value_input_field.value
	}
	this.prev_items = [].concat(this.items)
}
_ListApp.prototype.reset = function() {
	this.items = [].concat(this.prev_items);
	this.deleted = [];
	this.refresh()
};
_ListApp.prototype.sort = function(a, b) {
	return a.G(b)
};
_ListApp.prototype.lb = function() {
	var a = "";
	if (_old_html)
		a = "<table cellspacing=0 cellpadding=0 border=0>";
	for (var b = "", c = this.items, d = 0; d < c.length; d++)
		if (c[d]) {
			a += _old_html
					? "<tr><td nowrap><font size=-1>"
							+ c[d].L()
							+ '</font></td><td><a href="#" onclick="'
							+ this.app_name
							+ "._del("
							+ d
							+ ');return false"><img src="/ig/images/x.gif" width=16 height=13 border=0></a></td></tr>'
					: '<a href="#" onclick="' + this.app_name + "._del(" + d
							+ ');return false" class="delbox listdelbox"></a>'
							+ c[d].L() + '<div class="c"></div>';
			if (parseInt(c[d]._uid, 10) < 0)
				b += c[d].q(d)
		} else {
			this.items.splice(d, 1);
			d--
		}
	var e = this.deleted, f = "";
	for (d = 0; d < e.length; d++)
		if (parseInt(e[d]._uid, 10) >= 0)
			f += "," + e[d]._uid;
	a += this.wa(b, f);
	return a
};
_ListApp.prototype.wa = function(a, b) {
	var c = "<input type=hidden name=m_" + this.module_id + '_del value="' + b
			+ '"><input type=hidden name=m_' + this.module_id + '_add value="'
			+ a + '">';
	if (_old_html)
		c = "</table><input type=hidden name=m_" + this.module_id
				+ '_del value="' + b + '"><input type=hidden name=m_'
				+ this.module_id + '_add value="' + a + '">';
	return c
};
_ListApp.prototype.refresh = function() {
	this.sort_on_refresh && this.items.sort(this.sort);
	this.display_area.innerHTML = "<font size=-1>" + this.lb() + "</font>"
};
_ListApp.prototype.add = function(a, b) {
	a || (a = _trim(this.name_input_field.value));
	b || (b = _trim(this.value_input_field.value));
	var c = new this.item_constructor(a, b, -1);
	if (c.I()) {
		this.items[this.items.length] = c;
		this.refresh();
		this.name_input_field.value = this.default_name;
		this.value_input_field.value = this.default_value
	}
};
_ListApp.prototype._del = function(a) {
	this.deleted[this.deleted.length] = this.items[a];
	this.items.splice(a, 1);
	this.refresh()
};
function _PrefListApp(a, b, c, d, e) {
	var f = typeof c == "string" ? [] : c, g = new _ListApp(f, d, e);
	for (var h in g)
		this[h] = g[h];
	typeof c == "string" && this.kb(c);
	this.prefidx = a;
	this.prefname = b;
	this.app_name = "m_" + e + "_" + a + "_App";
	this.display_area = _gel("m_" + e + "_" + a + "_disp");
	this.name_input_field = this.value_input_field = _gel("m_" + e + "_" + a
			+ "_val");
	this.default_value = this.default_name = "";
	this.wa = _PrefListApp_get_tail
}
function _PrefListApp_get_tail() {
	var a = "</table>";
	_gel("m_" + this.module_id + "_" + this.prefidx).value = this.qb();
	return a
}
_PrefListApp.prototype.kb = function(a) {
	if (!(a.length == 0)) {
		for (var b = _IG_Prefs._strToArray(a), c = [], d = 0; d < b.length; d++) {
			var e = new this.item_constructor(b[d], b[d], -1);
			c[c.length] = e
		}
		this.items = c;
		this.prev_items = [].concat(c)
	}
};
_PrefListApp.prototype.qb = function() {
	for (var a = [], b = 0; b < this.items.length; b++)
		a[a.length] = this.items[b]._v;
	return _IG_Prefs._arrayToStr(a)
};
function _ListItem(a, b, c) {
	this._n = a;
	this._v = b;
	this._uid = c
}
_ListItem.prototype.I = function() {
	return this._n != ""
};
_ListItem.prototype.G = function() {
	return 0
};
_ListItem.prototype.L = function() {
	return _hesc(this._n)
};
_ListItem.prototype.q = function() {
	return "&" + _esc(this._n) + "=" + _esc(this._v)
};
function _BMListItem(a, b, c) {
	_ListItem.call(this, a, b, c)
}
ig_j(_ListItem, _BMListItem);
_BMListItem.prototype.I = function() {
	return _ListItem.prototype.I.call(this) && this._n != "http://"
};
_BMListItem.prototype.T = function() {
	if (this._v)
		return this._v;
	else {
		var a = this._n;
		if (a.indexOf("http://") == 0)
			a = a.substring(7);
		if (a.indexOf("www.") == 0)
			a = a.substring(4);
		return a
	}
};
_BMListItem.prototype.L = function() {
	return '<a href="' + this._n + '" target=bmwindow>' + _hesc(this.T())
			+ "</a>"
};
_BMListItem.prototype.q = function(a) {
	return "&b" + a + "=" + _esc(this._n) + "&t" + a + "=" + _esc(this._v)
};
_BMListItem.prototype.G = function(a) {
	var b = _uc(this.T()), c = _uc(a.T());
	if (b == c)
		return 0;
	return b < c ? -1 : 1
};
function _WthrListItem(a, b, c) {
	_ListItem.call(this, a, b, c)
}
ig_j(_ListItem, _WthrListItem);
_WthrListItem.prototype.q = function() {
	var a = "&" + _esc(this._n);
	if (this._v)
		a += "=" + _esc(this._v);
	return a
};
function _FListItem(a, b, c, d) {
	_ListItem.call(this, a, b, c);
	this._s = d || 0
}
ig_j(_ListItem, _FListItem);
_FListItem.prototype.q = function() {
	return "&" + _esc(this._n)
};
_FListItem.prototype.G = function(a) {
	var b = this;
	if (b._s < a._s)
		return -1;
	if (b._s > a._s)
		return 1;
	var c = _uc(b._n), d = _uc(a._n);
	if (c < d)
		return -1;
	if (c > d)
		return 1;
	return 0
};
function ig_F(a) {
	if (!a)
		a = document.body;
	return a.scrollHeight > a.offsetHeight ? a.scrollHeight : a.offsetHeight
}
function ig_G() {
	return self.pageYOffset ? self.pageYOffset : document.documentElement
			&& document.documentElement.scrollTop
			? document.documentElement.scrollTop
			: document.body.scrollTop
}
function _closePromoBox(a) {
	_toggle(_gel("promo" + a));
	_xsetp("gpc=" + a + ":-1")
}
_exportSymbols("", ["pageHeight", ig_F, "scrollTop", ig_G]);
var ig_H = {}, ig_I = {};
function _place(a, b) {
	var c = ig_I[a];
	if (c)
		c(b);
	else {
		ig_H[a] || (ig_H[a] = []);
		ig_H[a].push(b)
	}
}
function _register_place(a, b) {
	ig_I[a] = b;
	var c = ig_H[a];
	if (c) {
		for (var d = 0; d < c.length; d++)
			b(c[d]);
		ig_H[a] = ig_
	}
}
function _enableGS(a, b) {
	a.action = "https://www.google.com/accounts/CheckCookie";
	a.method = "get";
	ig_o(a, "service", b);
	ig_o(a, "continue", document.location);
	ig_o(a, "skipvpage", ig_a);
	return ig_a
};
function _reload(a, b) {
	var c = a - (new Date).getTime();
	if (c > 1000)
		setTimeout("_reload(" + a + ")", c);
	else if (b)
		document.location.replace(ig_Ga(document.location.href,
				document.location.pathname));
	else {
		document.cookie = "IGREL=1";
		document.location.replace(document.location.href.split("#")[0])
	}
}
var ig_Ha = /^([^?#]+)(?:\?([^#]*))?(#.*)?/;
function ig_Ga(a, b) {
	var c = ig_Ha.exec(a), d = c[1];
	if (b == "/")
		d += "ig";
	d += "?";
	var e = c[2];
	if (e)
		d += e;
	if (!_argsUrl(a).refresh) {
		if (e)
			d += "&";
		d += "refresh=1"
	}
	return d
}
var ig_J = {
	oa : 0,
	sb : 1800,
	Da : ig_,
	Ca : ig_,
	ea : ig_a,
	N : ig_,
	ub : ig_,
	Wa : 600,
	P : function() {
		ig_J.oa = (new Date).getTime() + ig_J.sb * 1000
	},
	Nb : function() {
		if ((new Date).getTime() > ig_J.oa)
			window.gTalkNotifier && window.gTalkNotifier._isAnyMoleOpen
					&& window.gTalkNotifier._isAnyMoleOpen()
					? ig_J.P()
					: _testConnection(function() {
								_reload(ig_J.oa, ig_J.ub)
							}, ig_J.P)
	},
	Fa : function(a) {
		ig_J.P();
		ig_J.Da && ig_J.Da(a)
	},
	Ea : function(a) {
		ig_J.P();
		ig_J.Ca && ig_J.Ca(a)
	}
};
function _IG_disable_refresh_cycle() {
	ig_J.ea = ig_b;
	_IG_suspend_refresh_cycle()
}
function _IG_suspend_refresh_cycle() {
	if (ig_J.N != ig_) {
		clearInterval(ig_J.N);
		ig_J.N = ig_
	}
}
function _IG_restart_refresh_cycle() {
	!ig_J.ea || ig_J.N != ig_ || ig_K()
}
function _IG_start_refresh_cycle(a, b, c) {
	if (ig_J.ea) {
		ig_J.Da = document.onmousedown;
		ig_J.Ca = document.onkeyup;
		ig_J.sb = a;
		ig_J.Wa = b;
		if (c)
			ig_J.ub = c;
		if (document.addEventListener) {
			document.addEventListener("keyup", ig_J.Ea, ig_b);
			document.addEventListener("mousedown", ig_J.Fa, ig_b)
		} else if (document.attachEvent) {
			document.attachEvent("onkeyup", ig_J.Ea);
			document.attachEvent("onmousedown", ig_J.Fa)
		} else {
			document.onkeyup = ig_J.Ea;
			document.onmousedown = ig_J.Fa
		}
		ig_K()
	}
}
function ig_K() {
	ig_J.P();
	ig_J.N = setInterval(ig_J.Nb, ig_J.Wa * 1000)
}
function _testConnection(a, b, c) {
	var d = ig_l(), e = "/ig/nop?t=" + (new Date).getTime();
	c || (c = 3500);
	d.open("GET", e, ig_a);
	d.onreadystatechange = function() {
		if (d.readyState == 4 && a)
			if (200 <= d.status && d.status < 300 || d.status == 1223) {
				b = ig_;
				a()
			}
	};
	try {
		d.send(ig_)
	} catch (f) {
	}
	var g = function() {
		if (b) {
			a = ig_;
			b()
		}
	};
	setTimeout(g, c)
};
function _getWindowDimension() {
	var a = 0, b = 0;
	if (window.innerHeight) {
		a = window.innerWidth;
		b = window.innerHeight
	} else if (document.documentElement
			&& document.documentElement.clientHeight) {
		a = document.documentElement.clientWidth;
		b = document.documentElement.clientHeight
	} else if (document.body.clientHeight) {
		a = document.body.clientWidth;
		b = document.body.clientHeight
	}
	return {
		width : a,
		height : b
	}
};
function ig_Ia() {
	function a(e) {
		var f = _gel(e);
		if (!f)
			return ig_b;
		if (f.style.display == "none")
			return ig_b;
		return ig_a
	}
	for (var b = ["gadget_invites_header", "undel_msg", "add_friends_promo",
			"below_searchbar_promo_wrapper"], c = 0, d = 0; d < b.length; d++)
		a(b[d]) && c++;
	return c
}
function ig_L() {
}
ig_L.prototype.p = 0;
ig_L.prototype.Z = 0;
ig_L.MIN_THEME_HEIGHT = 90;
ig_L.MIN_WINDOW_HEIGHT = 600;
ig_L.MAX_WINDOW_HEIGHT = 700;
ig_L.MIN_RESIZE_PIXELS = 2;
ig_L.MIN_WIN_HEIGHT_CHANGE = 20;
ig_L.DEFAULT_CLASSIC_THEME_HEIGHT = 100;
ig_L.prototype.Xa = function(a, b) {
	var c = this.p;
	if (a < ig_L.MIN_WINDOW_HEIGHT)
		return ig_L.MIN_THEME_HEIGHT;
	else if (a > ig_L.MAX_WINDOW_HEIGHT)
		return c;
	var d = (c - ig_L.MIN_THEME_HEIGHT) * (a - ig_L.MIN_WINDOW_HEIGHT)
			/ (ig_L.MAX_WINDOW_HEIGHT - ig_L.MIN_WINDOW_HEIGHT)
			+ ig_L.MIN_THEME_HEIGHT;
	if (d > c)
		return c;
	if (Math.abs(d - b) > ig_L.MIN_RESIZE_PIXELS)
		return Math.floor(d);
	return b
};
ig_L.prototype.eb = function() {
	if (!(this.p != 0)) {
		var a = _gel("nhdrwrapsizer");
		if (a) {
			this.p = parseInt(_getStyle(a, "height"), 10);
			if (isNaN(this.p))
				this.p = ig_L.DEFAULT_CLASSIC_THEME_HEIGHT;
			this.Z = _getWindowDimension().height
		}
	}
};
ig_L.prototype.Ia = function() {
	var a = _getWindowDimension().height;
	this.Z = a;
	if (!(ig_Ia() > 0)) {
		var b = _gel("nhdrwrapsizer");
		if (b) {
			var c = this.p;
			if (b.style.height != "")
				c = parseInt(b.style.height, 10);
			if (!(isNaN(this.p) || isNaN(c)))
				b.style.height = this.Xa(a, c) + "px"
		}
	}
};
ig_L.prototype.Sa = function() {
	var a = _getWindowDimension().height;
	Math.abs(a - this.Z) < ig_L.MIN_WIN_HEIGHT_CHANGE || this.Ia()
};
function _initializeAutoThemeHeight() {
	var a = new ig_L;
	a.eb();
	_IG_callPostLoad(function() {
				a.Ia()
			});
	_IG_AddEventHandler("resize", function() {
				a.Sa()
			})
};
function _IG_GetCachedUrl(a, b) {
	var c;
	c = typeof b == "object" ? b : {};
	var d = window.location.href, e = "/ig/proxy?", f = /^http:\/\/[^\/]+\/ig\/ifr[?]/, g = f
			.exec(d);
	if (g || d.indexOf("http://www.google.cn/ig/china") == 0) {
		if (window.location.host != "p.gmodules.com" && _et)
			e += "et=" + _esc(_et) + "&"
	} else
		e = "http://p.gmodules.com/ig/proxy?";
	if (!isNaN(c.refreshInterval) && c.refreshInterval >= 0)
		e = _appendMaxAgeParameter(e, c.refreshInterval);
	return e + "url=" + _esc(a) + "&log=1"
}
function _IG_GetImageUrl(a, b) {
	return _IG_GetCachedUrl(a, b)
}
function _IG_GetImage(a, b) {
	var c = document.createElement("img");
	c.src = _IG_GetCachedUrl(a, b);
	return c
};
function _IG_Callback(a) {
	var b = arguments;
	return function() {
		for (var c = [], d = 0; d < arguments.length; d++)
			c[c.length] = arguments[d];
		for (d = 1; d < b.length; d++)
			c[c.length] = b[d];
		a.apply(ig_, c)
	}
}
function ig_M() {
	var a = _IG_Callback.apply(ig_, arguments);
	return function() {
		a()
	}
};
var _IG_Layouts = {};
_IG_Layouts._selectLayout = function(a) {
	for (var b = _gel("edit_this_tab_form").edit_this_tab_selected_layout, c = 0; c < b.length; c++) {
		var d = b[c].value, e = _gel("edit_this_tab_layoutimg_" + d);
		if (d != a) {
			b[c].checked = ig_b;
			if (e.src.indexOf("_highlight") != -1)
				e.src = e.src.substring(0, e.src.indexOf("_highlight"))
						+ ".gif"
		} else {
			b[c].checked = ig_a;
			if (e.src.indexOf("_highlight") == -1)
				e.src = e.src.substring(0, e.src.indexOf(".gif"))
						+ "_highlight.gif"
		}
	}
};
var ig_N = function() {
	var a = ig_b, b = [], c = ig_, d = ig_;
	function e() {
		if (!(c || a)) {
			a = ig_a;
			_IG_LoadScript("/ig/ll" + window.location.search, "")
		}
	}
	function f() {
		d(c, b);
		b = []
	}
	return {
		init : function() {
		},
		load : function(g, h, i) {
			if (_gel(g))
				i(h);
			else {
				b.push({
							id : g,
							args : h,
							callback : i
						});
				if (!a)
					if (c)
						f();
					else {
						_sendx("/ig/ui?action=lazy&id=" + g, ig_, ig_b, ig_);
						e()
					}
			}
		},
		loaded : function(g, h) {
			c = g;
			d = h;
			a = ig_b;
			f()
		},
		ac : function() {
			a = ig_b;
			b = [];
			d = c = ig_
		}
	}
}(), _IG_LL_init = ig_N.init, _IG_LL_load = ig_N.load, _IG_LL_loaded = ig_N.loaded;
var ig_O = [];
function _IG_isModuleInVisibleArea(a) {
	var b = ig_G(), c = _getWindowDimension().height, d = parseInt(
			a.style.height, 10), e = _findPos(a)[1];
	return e + d > b && e < b + c
}
function _IG_delayLoadGadget(a) {
	ig_O.push(a)
}
function _IG_loadDelayLoadGadgets() {
	for (var a = 0; a < ig_O.length; ++a) {
		var b = _gel("remote_iframe_" + ig_O[a].id);
		if (b) {
			var c = b.getAttribute("src");
			if (c == ig_ || c == "")
				b.src = ig_O[a].base_iframe_url
		}
	}
};
function _IG_MD_Generate(a) {
	var b = {
		t : {},
		dt : [],
		m : {},
		f : {}
	};
	ig_Ja(a, b);
	ig_Ka(a, b);
	ig_La(a, b);
	if (a.ct != ig_ && b.t)
		b.ct = b.t[a.ct];
	ig_Ma(a, b);
	return b
}
function ig_Ja(a, b) {
	if (a.t)
		for (var c = 0; c < a.t.length; ++c) {
			var d = a.t[c];
			b.t[d.i] = d;
			b.t[d.i].m = {}
		}
}
function ig_Ka(a, b) {
	if (a.f)
		for (var c = 0; c < a.f.length; ++c) {
			var d = a.f[c];
			b.f[d.n] = d
		}
}
function ig_La(a, b) {
	if (a.m)
		for (var c = 0; c < a.m.length; ++c) {
			var d = a.m[c];
			d.fa || (d.fa = {});
			b.m[d.i] = d;
			var e = b.t[d.t];
			if (e)
				e.m[d.i] = d
		}
}
function ig_Ma(a, b) {
	if (a.dt)
		for (var c = 0; c < a.dt.length; ++c)
			b.dt[c] = b.t[a.dt[c]]
};
var ig_P;
ig_P || (ig_P = function() {
	function a(j) {
		return j < 10 ? "0" + j : j
	}
	Date.prototype.toJSON = function() {
		return this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-"
				+ a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":"
				+ a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z"
	};
	String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
		return this.valueOf()
	};
	var b = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, d, e, f = {
		"\u0008" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\u000c" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, g;
	function h(j) {
		c.lastIndex = 0;
		return c.test(j) ? '"' + j.replace(c, function(k) {
					var n = f[k];
					if (typeof n === "string")
						return n;
					return "\\u"
							+ ("0000" + (+k.charCodeAt(0)).toString(16))
									.slice(-4)
				}) + '"' : '"' + j + '"'
	}
	function i(j, k) {
		var n, o, p, q, r = d, l, m = k[j];
		if (m && typeof m === "object" && typeof m.toJSON === "function")
			m = m.toJSON(j);
		if (typeof g === "function")
			m = g.call(k, j, m);
		switch (typeof m) {
			case "string" :
				return h(m);
			case "number" :
				return isFinite(m) ? String(m) : "null";
			case "boolean" :
			case "null" :
				return String(m);
			case "object" :
				if (!m)
					return "null";
				d += e;
				l = [];
				if (typeof m.length === "number"
						&& !m.propertyIsEnumerable("length")) {
					q = m.length;
					for (n = 0; n < q; n += 1)
						l[n] = i(n, m) || "null";
					p = l.length === 0 ? "[]" : d ? "[\n" + d
							+ l.join(",\n" + d) + "\n" + r + "]" : "["
							+ l.join(",") + "]";
					d = r;
					return p
				}
				if (g && typeof g === "object") {
					q = g.length;
					for (n = 0; n < q; n += 1) {
						o = g[n];
						if (typeof o === "string")
							if (p = i(o, m))
								l.push(h(o) + (d ? ": " : ":") + p)
					}
				} else
					for (o in m)
						if (Object.hasOwnProperty.call(m, o))
							if (p = i(o, m))
								l.push(h(o) + (d ? ": " : ":") + p);
				p = l.length === 0 ? "{}" : d ? "{\n" + d + l.join(",\n" + d)
						+ "\n" + r + "}" : "{" + l.join(",") + "}";
				d = r;
				return p
		}
	}
	return {
		stringify : function(j, k, n) {
			var o = k, p = n, q;
			e = d = "";
			if (typeof p === "number")
				for (q = 0; q < p; q += 1)
					e += " ";
			else if (typeof p === "string")
				e = p;
			if ((g = o) && typeof o !== "function"
					&& (typeof o !== "object" || typeof o.length !== "number"))
				throw new Error("JSON.stringify");
			return i("", {
						"" : j
					})
		},
		parse : function(j, k) {
			var n = k, o;
			function p(q, r) {
				var l, m, s = q[r];
				if (s && typeof s === "object")
					for (l in s)
						if (Object.hasOwnProperty.call(s, l)) {
							m = p(s, l);
							if (m !== undefined)
								s[l] = m;
							else
								delete s[l]
						}
				return n.call(q, r, s)
			}
			b.lastIndex = 0;
			if (b.test(j))
				j = j.replace(b, function(q) {
							return "\\u"
									+ ("0000" + (+q.charCodeAt(0)).toString(16))
											.slice(-4)
						});
			if (/^[\],:{}\s]*$/
					.test(j
							.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									"]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				o = eval("(" + j + ")");
				return typeof n === "function" ? p({
							"" : o
						}, "") : o
			}
			throw new Error("JSON.parse");
		}
	}
}());
ig_P.parse = function() {
	var a = ig_P.parse;
	return function(b, c) {
		try {
			return a(b, c)
		} catch (d) {
			return ig_b
		}
	}
}();
function ig_Na(a) {
	var b = document.createElement("DIV");
	b.innerHTML = "<iframe onload='this.pool_locked=false'></iframe>";
	var c = b.getElementsByTagName("IFRAME")[0];
	c.style.visibility = "hidden";
	c.style.width = c.style.height = "0px";
	c.style.border = "0px";
	c.style.position = "absolute";
	c.pool_locked = a;
	this.j[this.j.length] = c;
	b.removeChild(c);
	return c
}
function ig_Oa(a) {
	if (a.match(/^http[s]?:\/\//)) {
		var b = this;
		window.setTimeout(function() {
					for (var c = ig_, d = b.j.length - 1; d >= 0; d--) {
						var e = b.j[d];
						if (e && !e.pool_locked) {
							e.parentNode.removeChild(e);
							if (window.ActiveXObject) {
								b.j[d] = ig_;
								b.j.splice(d, 1)
							} else {
								e.pool_locked = ig_a;
								c = e;
								break
							}
						}
					}
					c = c ? c : b.Db(ig_a);
					c.src = a;
					document.body.appendChild(c)
				}, 0)
	}
}
function ig_Pa() {
	for (var a = 0; a < this.j.length; a++) {
		this.j[a].onload = ig_;
		this.j[a] = ig_
	}
	this.j.length = 0;
	this.j = []
}
function ig_Qa() {
	for (var a = 0; a < this.j.length; a++) {
		var b = this.j[a];
		b && b.parentNode.removeChild(b)
	}
}
function ig_Ra() {
	this.j = [];
	this.Db = ig_Na;
	this.iframe = ig_Oa;
	this.clear = ig_Pa;
	this.dispose = ig_Qa
}
function ig_Sa(a, b) {
	_IFPC.O[a] = b
}
function ig_Ta(a) {
	delete _IFPC.O[a]
}
function ig_Ua(a, b, c, d, e, f, g, h) {
	if (!_IFPC.na) {
		var i = 4095 - d.length;
		i = parseInt(i / 3, 10);
		if (typeof g == "undefined")
			g = ig_a;
		if (h) {
			var j = {
				s : b,
				a : c,
				f : "..",
				t : window._isk[a.split("_")[2]]
			}, k = [a, "..", _IFPC.ga, 1, 1,
					encodeURIComponent(ig_P.stringify(j))].join("&");
			_IFPC.W.iframe(d + "#" + k)
		} else {
			c = c.slice(0);
			c.unshift(_IFPC.Ob(e));
			c.unshift(f);
			c.unshift(b);
			c.unshift(a);
			var n = _IFPC.bb(c), o = parseInt(n.length / i, 10);
			if (n.length % i > 0)
				o += 1;
			for (var p = 0; p < o; p++) {
				var q = n.substr(p * i, i), r = [a, _IFPC.ga, o, p, q, g];
				_IFPC.W.iframe(d + "#" + _IFPC.bb(r))
			}
		}
		_IFPC.ga++
	}
}
function ig_Va() {
	_IFPC.O = {};
	_IFPC.C = {};
	_IFPC.W.clear()
}
function ig_Wa() {
	if (!_IFPC.na) {
		_IFPC.na = ig_a;
		_IFPC.W.dispose();
		_IFPC.clear()
	}
}
function ig_Q(a) {
	var b = _IFPC.la(a)[0], c = ig_;
	try {
		c = window.parent.frames[b]
	} catch (d) {
	}
	try {
		if (!c && window.parent.parent.frames[b] != window.parent) {
			window.parent.parent.frames[b].setTimeout(function() {
					}, 0);
			c = window.parent.parent.frames[b]
		}
	} catch (e) {
	}
	if (!c)
		c = window.parent.parent;
	if (!c || c._IFPC == undefined)
		c = ig_;
	else {
		var f = function() {
			c._IFPC.handleRequest(a)
		};
		window.ActiveXObject ? f() : c.setTimeout(f, 0)
	}
}
function ig_Xa(a) {
	a = _IFPC.la(a);
	var b = a.shift(), c = a.shift(), d = a.shift(), e = a.shift(), f = a
			.shift(), g = a.shift(), h = b + "_" + c;
	_IFPC.A[h] || (_IFPC.A[h] = []);
	_IFPC.A[h].push([e, f]);
	if (_IFPC.A[h].length == d) {
		_IFPC.A[h].sort(function(r, l) {
					return parseInt(r[0], 10) - parseInt(l[0], 10)
				});
		f = "";
		for (var i = 0; i < d; i++)
			f += _IFPC.A[h][i][1];
		_IFPC.A[h] = ig_;
		var j = _IFPC.la(f);
		b = j.shift();
		var k = j.shift(), n = j.shift(), o = j.shift(), p = _IFPC.Kb(k);
		if (p) {
			var q = p.apply(ig_, j);
			if (_IFPC.Mb(o)) {
				q.unshift(o);
				_IFPC.call(b, _IFPC.La, q, n, ig_, "")
			}
		} else if (g)
			throw new Error("Service " + k + " not registered.");
	}
}
function ig_Ya(a) {
	return _IFPC.O.hasOwnProperty(a) ? _IFPC.O[a] : ig_
}
function ig_Za(a) {
	var b = "";
	if (a && typeof a == "function") {
		b = _IFPC.Jb();
		_IFPC.C[b] = a
	}
	return b
}
function ig__a(a) {
	if (_IFPC.C.hasOwnProperty(a))
		_IFPC.C[a] = ig_
}
function ig_0a(a) {
	if (a && _IFPC.C.hasOwnProperty(a))
		return _IFPC.C[a];
	return ig_
}
function ig_1a() {
	return _IFPC.Ka + _IFPC.Bb++
}
function ig_2a(a) {
	return (a + "").indexOf(_IFPC.Ka) == 0
}
function ig_3a(a) {
	for (var b = a.split("&"), c = 0; c < b.length; c++) {
		var d = decodeURIComponent(b[c]);
		try {
			d = ig_P.parse(d)
		} catch (e) {
		}
		b[c] = d
	}
	return b
}
function ig_4a(a) {
	for (var b = [], c = 0; c < a.length; c++) {
		var d = ig_P.stringify(a[c]);
		b.push(encodeURIComponent(d))
	}
	return b.join("&")
}
function ig_5a(a) {
	var b = _IFPC.Hb(a);
	if (b) {
		for (var c = [], d = 1; d < arguments.length; d++)
			c[c.length] = arguments[d];
		b.apply(ig_, c);
		_IFPC.Ub(a)
	} else
		throw new Error("Invalid callbackId");
}
var _IFPC = {};
function ig_6a(a) {
	var b = window._argsUrl && window._argsUrl(a);
	if (b && b.exp_rpc_js == 1)
		window.FLAG_use_rpc_js = ig_a;
	if (window.FLAG_use_rpc_js) {
	} else {
		_IFPC = {
			registerService : ig_Sa,
			unregisterService : ig_Ta,
			call : ig_Ua,
			clear : ig_Va,
			dispose : ig_Wa,
			relayRequest : ig_Q,
			processRequest : ig_Q,
			handleRequest : ig_Xa,
			Ka : "cbid",
			La : "ifpc_callback",
			W : new ig_Ra,
			A : {},
			O : {},
			C : {},
			Bb : 0,
			ga : 0,
			na : ig_b,
			Kb : ig_Ya,
			Ob : ig_Za,
			Ub : ig__a,
			Hb : ig_0a,
			Jb : ig_1a,
			Mb : ig_2a,
			la : ig_3a,
			bb : ig_4a,
			Cb : ig_5a
		};
		_IFPC.registerService(_IFPC.La, _IFPC.Cb);
	}
}
ig_6a(document.location.href);
function _IG_Prefs_PrefsData() {
}
_IG_Prefs_PrefsData.prototype.value = ig_;
function _IG_Prefs(a) {
	var b = a;
	if (typeof remote_modules !== "object") {
		var c = _args().mid;
		b = c ? c : 0;
		_IG_Prefs._parseURL(b);
		_IG_Prefs.X[b] = ig_b
	} else {
		if (!b)
			throw new Error("Module ID is required as first argument to _IG_Prefs() for inlined modules");
		_IG_Prefs.X[b] = ig_a
	}
	_IG_Prefs.d[_IG_Prefs.r + b] || (_IG_Prefs.d[_IG_Prefs.r + b] = {});
	this.d = _IG_Prefs.d[_IG_Prefs.r + b];
	this.Ba = b;
	this.$b = /(.*)(\<ph.*?\>\s*(\<ex\>(.*?)\<\/ex\>)?\s*%1\s*\<\/ph\>)(.*)/
}
_IG_Prefs.prototype.V = function(a, b) {
	if (b == undefined)
		b = ig_;
	var c = this.d[a];
	if (c == undefined)
		return b;
	var d = c.value;
	return d != undefined ? d : b
};
_IG_Prefs.prototype.U = function(a, b) {
	return this.V(_IG_Prefs.h + a, b)
};
_IG_Prefs.prototype.w = function(a) {
	var b = "", c = this.U(a, b);
	return c != ig_ ? c + "" : b
};
_IG_Prefs.prototype.sa = function(a) {
	var b = 0, c = parseInt(this.U(a, b), 10);
	return isNaN(c) ? b : c
};
_IG_Prefs.prototype.qa = function(a) {
	var b = this.w(a);
	return b === "true" || !!parseInt(b, 10)
};
_IG_Prefs.prototype.pa = function(a) {
	return _IG_Prefs._strToArray(this.U(a, ""))
};
_IG_Prefs.prototype.Ha = function(a, b) {
	this.set(a, _IG_Prefs._arrayToStr(b))
};
_IG_Prefs.prototype.ra = function() {
	return this.w(".country")
};
_IG_Prefs.prototype.ta = function() {
	return this.w(".lang")
};
_IG_Prefs.prototype.ua = function(a) {
	return this.V(_IG_Prefs.Oa + a, "") + ""
};
_IG_Prefs.prototype.set = function() {
	var a = Math.floor(arguments.length / 2);
	if (!(a == 0)) {
		for (var b = [], c = 0; c < a; ++c) {
			var d = arguments[c * 2], e = _IG_Prefs.h + d, f = arguments[c * 2
					+ 1]
					+ "";
			this.tb(e, f) && b.push(d, f)
		}
		b.length == 0
				|| (_IG_Prefs.X[this.Ba]
						? _IG_Prefs._setP(this.Ba, b)
						: _IFPC_SetPref(b))
	}
};
function ig_7a(a) {
	var b = "todos", c = _ig_gmid_(a), d = (new _IG_Prefs(Number(c))).w(b);
	if (navigator.userAgent.indexOf("MSIE") != -1 && d.length > 1000)
		for (var e = Math.ceil(d.length / 1000), f = 0; f < e; f++) {
			var g = d.substr(f * 1000, 1000);
			ig_R(a, g, f, e)
		}
	else
		ig_R(a, d)
}
function ig_R(a, b, c, d) {
	var e = _ig_gmid_(a), f = [b];
	d && f.push(c, d);
	_IFPC.call(a, "populate_todos_pref", f, window._ifpc_relay_url[e], ig_,
			"http://" + window.location.host + "/ig/images/rpc_relay.html",
			ig_a, ig_a)
}
window._IG_CONTAINER
		&& _IFPC.registerService("get_todos_pref_for_migration", ig_7a);
_IG_Prefs.prototype.va = function() {
	var a = ["__module_id__=" + this.Ba];
	for (var b in this.d)
		a.push(encodeURIComponent(b) + "="
				+ encodeURIComponent(this.d[b].value));
	return a.join("&")
};
_IG_Prefs.prototype.dump = function() {
	document.write("<pre>");
	for (var a in this.d)
		document.writeln(a + " = " + this.V(a, ig_));
	document.write("</pre>")
};
_IG_Prefs.prototype.tb = function(a, b) {
	var c = this.d[a];
	if (c && c.value === b)
		return ig_b;
	if (c)
		c.value = b;
	else {
		c = new _IG_Prefs_PrefsData;
		c.value = b;
		this.d[a] = c
	}
	return ig_a
};
_IG_Prefs.X = {};
_IG_Prefs.d = {};
_IG_Prefs.r = "m_";
_IG_Prefs.h = "up_";
_IG_Prefs.wb = "up_";
_IG_Prefs.Oa = "msg_";
_IG_Prefs.da = {};
_IG_Prefs.da[_IG_Prefs.wb] = "value";
_IG_Prefs.Xb = function(a, b) {
	if (a.indexOf)
		return a.indexOf(b);
	else {
		for (var c = 0; c < a.length; ++c)
			if (a[c] === b)
				return c;
		return -1
	}
};
_IG_Prefs._parseURL = function(a) {
	_IG_Prefs.X[a] = ig_b;
	for (var b = {}, c = ig_d(), d = 0; d < c.length; ++d) {
		var e = c[d].indexOf("=");
		if (e >= 0) {
			var f = c[d].substring(0, e);
			f = f.replace(/\+/g, " ");
			var g = c[d].substring(e + 1);
			g = g.replace(/\+/g, " ");
			g = _unesc(g);
			var h = ig_b;
			for (var i in _IG_Prefs.da)
				if (f.indexOf(i) === 0) {
					h = ig_a;
					f = f.substring(i.length);
					f = _IG_Prefs.h + f;
					b[f] = b[f] ? b[f] : new _IG_Prefs_PrefsData;
					if (i === _IG_Prefs.Wb || i === _IG_Prefs.Vb)
						g = g == "true";
					b[f][_IG_Prefs.da[i]] = g;
					break
				}
			if (!h)
				if (f.indexOf(_IG_Prefs.Oa) === 0)
					_IG_Prefs._add(a, f, g);
				else if (f === ".lang" || f === ".country")
					_IG_Prefs._add(a, _IG_Prefs.h + f, g)
		}
	}
	if (window.IDIModule) {
		b = window.IDIModule.getPrefs();
		for (d in b)
			_IG_Prefs._add(a, d, b[d])
	} else
		for (f in b)
			_IG_Prefs._add(a, f, b[f].value)
};
_IG_Prefs._add = function(a, b, c) {
	var d = _IG_Prefs.r + a;
	if (typeof _IG_Prefs.d[d] !== "object")
		_IG_Prefs.d[d] = {};
	if (typeof _IG_Prefs.d[d][b] !== "object") {
		_IG_Prefs.d[d][b] = new _IG_Prefs_PrefsData;
		var e = _IG_Prefs.d[d][b];
		e.value = c
	}
};
_IG_Prefs.Qb = function(a, b, c) {
	var d = _IG_Prefs.r + a;
	if (typeof _IG_Prefs.d[d] !== "object")
		_IG_Prefs._add(a, b, c);
	else if (typeof _IG_Prefs.d[d][b] !== "object")
		_IG_Prefs.d[d][b] = new _IG_Prefs_PrefsData;
	var e = _IG_Prefs.d[d][b];
	e.value = c
};
_IG_Prefs._addAll = function(a, b) {
	for (var c = 0; c < b.length; ++c)
		_IG_Prefs._add(a, b[c][0], b[c][1])
};
_IG_Prefs._arrayToStr = function(a) {
	var b = a.length && a.join;
	if (b) {
		for (var c = [], d = 0; d < a.length; ++d)
			c.push(a[d].replace(/\|/g, "%7C"));
		return c.join("|")
	} else
		return new String(a)
};
_IG_Prefs._strToArray = function(a) {
	for (var b = a.length > 0 ? a.split("|") : [], c = 0; c < b.length; ++c)
		b[c] = b[c].replace(/%7C/g, "|");
	return b
};
_IG_Prefs._updatePrefsInUrl = function(a, b) {
	var c = _IG_Prefs.r + a, d = _IG_Prefs.d[c];
	if (d == ig_)
		return b;
	var e = b.split("#"), f = e[0].split("?"), g = f;
	if (e.length > 1
			&& ("&" + e[1]).indexOf("&" + _IG_Prefs.h) !== -1
			&& (f.length === 1 || ("&" + f[1]).indexOf("&" + _IG_Prefs.h) === -1))
		g = e;
	var h = [];
	if (g.length > 1 && g[1].length !== 0)
		h = g[1].split("&");
	for (var i = 0; i < h.length; ++i)
		h[i].indexOf(_IG_Prefs.h) === 0 && h.splice(i--, 1);
	for (var j in d)
		j.indexOf(_IG_Prefs.h) !== 0 || j.indexOf(_IG_Prefs.h + ".lang") === 0
				|| j.indexOf(_IG_Prefs.h + ".country") === 0
				|| j.indexOf(_IG_Prefs.h + "synd") === 0
				|| h.push(_esc(j) + "=" + _esc(d[j].value));
	g[1] = h.join("&");
	e[0] = f.join("?");
	return e.join("#")
};
_IG_Prefs._setPrefs = function(a, b) {
	for (var c = Math.floor(b.length / 2), d = 0; d < c; ++d) {
		var e = _IG_Prefs.h + b[d * 2], f = b[d * 2 + 1];
		_IG_Prefs.Qb(a, e, f)
	}
};
_IG_Prefs._setP = function(a, b) {
	if (!(_args().synd === "open")) {
		for (var c = Math.floor(b.length / 2), d = [], e = 0; e < c; ++e) {
			var f = _IG_Prefs.h + b[e * 2], g = b[e * 2 + 1];
			d.push(_IG_Prefs.r + a + "_" + f + "=" + _esc(g))
		}
		d.length === 0 || _xsetp(d.join("&"))
	}
};
_exportClass("google.gadgets", "Prefs", _IG_Prefs, ["getString",
				_IG_Prefs.prototype.w, "getInt", _IG_Prefs.prototype.sa,
				"getBool", _IG_Prefs.prototype.qa, "getArray",
				_IG_Prefs.prototype.pa, "setArray", _IG_Prefs.prototype.Ha,
				"getLang", _IG_Prefs.prototype.ta, "getCountry",
				_IG_Prefs.prototype.ra, "getMsg", _IG_Prefs.prototype.ua,
				"getPreloadedString", _IG_Prefs.prototype.va, "set",
				_IG_Prefs.prototype.set, "dump", _IG_Prefs.prototype.dump]);
function _IG_FR_getFeed(a) {
	return window["FEED" + a] || {}
}
function _IG_FR_toggle(a, b, c, d) {
	c = c || "";
	d = d || "";
	var e = _gel("ft_" + a + "_" + b), f = _gel("fb_" + a + "_" + b), g = _gel("ftl_"
			+ a + "_" + b);
	if (f.style.display == "block")
		ig_S(e, f, g, c);
	else {
		var h = _IG_FR_getFeed(a);
		if (!h.has_entries && !h.is_fetching) {
			h.is_fetching = ig_a;
			_IG_FetchFeedAsJSON(h.url, _IG_Callback(ig_8a, a, b, c, d),
					h.num_items + 15, ig_a)
		} else {
			for (var i = 0; i < h.num_items; ++i) {
				var j = _gel("ftl_" + a + "_" + i);
				j
						&& ig_S(_gel("ft_" + a + "_" + i), _gel("fb_" + a + "_"
										+ i), j, c)
			}
			ig_9a(a, b, e, f, g, d);
			if (f.style.maxHeight
					&& parseInt(f.style.maxHeight, 10) < ig_$a(g.offsetWidth, f))
				f.style.height = f.style.maxHeight
		}
	}
}
function ig_8a(a, b, c, d, e) {
	var f = _IG_FR_getFeed(b);
	f.is_fetching = ig_b;
	if (a && a.Entry) {
		for (var g = 0; g < a.Entry.length; g++)
			if (a.Entry[g].ID != "no_id") {
				var h = _gel("fb_" + b + "_" + a.Entry[g].ID);
				if (h)
					h.innerHTML = a.Entry[g].Summary
			}
		f.has_entries = ig_a;
		_IG_FR_toggle(b, c, d, e)
	}
}
function ig_T(a) {
	return a.className.match(/reverse_directionality$/) == "reverse_directionality"
}
function ig_S(a, b, c, d) {
	a.className = ig_T(a) ? "fmaxbox_reverse_directionality" : "fmaxbox";
	a.title = d;
	if (_old_html || _use_old_feed_styles)
		a.className = "fbox fmaxbox";
	b.style.display = "none";
	b.style.maxHeight = "";
	c.className = ig_T(a) ? "uftl_reverse_directionality" : "uftl"
}
function ig_9a(a, b, c, d, e, f) {
	c.className = ig_T(c) ? "fminbox_reverse_directionality" : "fminbox";
	c.title = f;
	if (_old_html || _use_old_feed_styles)
		c.className = "fbox fminbox";
	d.style.display = "block";
	d.style.maxHeight = d.offsetWidth * 1.5 + "px";
	e.className = ig_T(c) ? "sftl_reverse_directionality" : "sftl";
	window._IG_FRUC_setFeedAsRead && window._IG_FRUC_setFeedAsRead(a, b)
}
function ig_$a(a, b) {
	var c = document.createElement("div");
	c.style.left = -screen.width;
	c.style.top = -screen.height;
	c.style.width = a;
	c.innerHTML = b.innerHTML;
	document.body.appendChild(c);
	var d = c.clientHeight;
	document.body.removeChild(c);
	return d
}
function _IG_RegisterContainerScrollHandler(a) {
	if (navigator.userAgent.indexOf("Firefox") >= 0)
		window.addEventListener("scroll", a, ig_b);
	else
		window.onscroll = a
}
function _IG_GetContainerVisibleHeight() {
	return document.documentElement.clientHeight
}
function _IG_GetContainerTotalHeight() {
	return document.body.scrollHeight
}
function _IG_GetContainerScrollTop() {
	return document.documentElement.scrollTop
}
function ig_U(a) {
	var b = _gel("hl"), c = b ? b.value : "en";
	return "/reader/ig/feed/" + _esc(_IG_FR_getFeed(a).url) + "?hl=" + c
}
function ig_ab(a, b) {
	if (window._max_strategies) {
		var c = ig_U(a) + (b ? "&i=" + b : "");
		window._max_strategies[a]._updateIframeSrc(c)
	}
}
function _IG_FR_maxModule(a, b, c) {
	ig_ab(a, b);
	window._IG_maximize_view(a, "feed", c)
}
function _IG_FR_init(a) {
	window._max_strategies && _IG_callPostLoad(function() {
				window._max_strategies[a] = new window._IG_inlinedTransitionStrategy(
						a, ig_U(a), ig_, _IG_isIE())
			});
	_IG_AddModuleEventHandler(a, "unmaximize", function() {
				ig_ab(a)
			})
}
var _IG_FR_listOfFeeds = [];
function ig_bb(a, b, c, d) {
	if (!a || a == "" || a.length <= 27 || a.charAt(27) != "{")
		c(d ? ig_ : "");
	else {
		var e = eval("(" + a.substring(27) + ")");
		if (b in e) {
			var f = e[b].body;
			c(d ? ig_V(f) : f)
		}
	}
}
function ig_cb(a) {
	var b;
	if (window.ActiveXObject) {
		b = new ActiveXObject("Microsoft.XMLDOM");
		b.async = ig_b;
		b.validateOnParse = ig_b;
		b.resolveExternals = ig_b;
		b.loadXML(a)
	} else {
		var c = new DOMParser;
		b = c.parseFromString(a, "text/xml")
	}
	return b
}
function ig_V(a) {
	var b = ig_cb(a), c = b.documentElement;
	if (c && c.nodeName == "parsererror"
			|| navigator.userAgent.indexOf("Safari") >= 0
			&& _gelstn("parsererror", b)[0])
		return a;
	return b
}
var ig_db = (new Date).getTime();
function ig_eb(a) {
	if (!a.post_data
			&& !a.headers
			&& window._pl_data
			&& _pl_data[a.url]
			&& !(!isNaN(a.refreshInterval) && a.refreshInterval >= 0 && (new Date)
					.getTime() > ig_db + a.refreshInterval * 1000))
		if (a.asXml) {
			var b = ig_V(_pl_data[a.url]);
			a.callback(b)
		} else
			a.callback(_pl_data[a.url]);
	else {
		var c = "/ig/jsonp?";
		if (_et != "")
			c += "et=" + _et + "&";
		if (!isNaN(a.refreshInterval) && a.refreshInterval >= 0)
			c = _appendMaxAgeParameter(c, a.refreshInterval);
		if (a.encoding)
			c += "enc=" + _esc(a.encoding) + "&";
		if (a.headers) {
			for (var d = [], e = 0; e < a.headers.length; e++)
				d.push(_esc(a.headers[e][0] + ":" + a.headers[e][1]));
			c += "hdrs=" + _esc(d.join(",")) + "&"
		}
		c += "url=" + _esc(a.url);
		_sendx(c, function(f) {
					ig_bb(f, a.url, a.callback, a.asXml)
				}, ig_b, a.post_data)
	}
}
function ig_fb(a) {
	var b = {};
	for (var c in a)
		b[c] = a[c];
	return b
}
function _IG_FetchContent(a, b, c) {
	var d;
	d = c != ig_ && typeof c == "object" ? ig_fb(c) : {};
	d.url = a;
	d.callback = b;
	d.asXml = ig_b;
	ig_eb(d)
}
function _IG_FetchXmlContent(a, b, c) {
	var d;
	d = c != ig_ && typeof c == "object" ? ig_fb(c) : {};
	d.url = a;
	d.callback = b;
	d.asXml = ig_a;
	ig_eb(d)
}
function ig_gb(a, b, c) {
	_IG_FetchContent(a, function(d) {
				if (d) {
					var e = ig_V(d);
					if (typeof e == "object" && e.firstChild) {
						var f = e.firstChild;
						f.nodeType == 7 && f.nodeName == "xml"
								&& e.removeChild(f);
						b(e);
						return
					}
				}
				b(ig_)
			}, c)
}
function ig_hb(a, b) {
	var c = "/ig/feedjson";
	_sendx(c, function(d) {
				var e = {};
				try {
					e = eval("(" + d.slice(27) + ")")
				} catch (f) {
					e = {}
				}
				for (var g in b) {
					var h = e[g] ? e[g] : ig_;
					b[g](h)
				}
				b = ig_
			}, ig_b, a)
}
var ig_ib = ig_b, ig_jb = 0, ig_W = "", ig_X = {};
function _IG_FetchFeedAsJSON(a, b, c, d, e) {
	if (typeof e != "object")
		e = {};
	var f = "fr_" + ig_jb++, g = "url=" + _esc(a);
	if (!isNaN(e.refreshInterval) && e.refreshInterval >= 0)
		g = _appendMaxAgeParameter(g, e.refreshInterval);
	if (c)
		g += "&val=" + _esc(c);
	if (d)
		g += "&sum=1";
	var h = f + "=" + _esc(g);
	if (ig_ib) {
		var i = {};
		i[f] = b;
		ig_hb(h, i)
	} else {
		if (ig_W != "")
			ig_W += "&";
		ig_W += h;
		ig_X[f] = b
	}
}
function ig_kb() {
	ig_ib = ig_a;
	ig_W != "" && ig_hb(ig_W, ig_X);
	ig_W = "";
	ig_X = ig_
}
_IG_AddEventHandler("domload", ig_kb);
_exportSymbols("google.gadgets.Fetchers", ["getContent", _IG_FetchContent,
				"getXMLContent", ig_gb, "getFeedAsJSON", _IG_FetchFeedAsJSON]);
function ig_lb(a, b, c) {
	var d = ig_w("m", b);
	if (d)
		d.ti = a;
	var e = _gel("m_" + b + "_title");
	if (e)
		e.innerHTML = _hesc(a);
	if (e = _gel("left_nav_m_" + b + "_title"))
		if (e = e.firstChild) {
			e.title = a;
			e.innerHTML = _hesc(a);
			c || (e.offsetWidth == 0 ? _IG_RegisterOnloadHandler(function() {
						ig_Y(e)
					}) : ig_Y(e))
		}
}
function ig_Y(a) {
	var b = a.title;
	if (!(a.offsetWidth <= 121)) {
		var c = 0, d = b.length, e, f, g = b.match(/\(\d+\)$/);
		if (g = g ? g[0] : "") {
			g = " " + g;
			d = b.length - g.length;
			var h = 5 * g.length;
			if (h > 60)
				g = ""
		}
		for (; f = d - c >> 1;) {
			e = c + f;
			a.innerHTML = ig_mb(b, e, g);
			if (a.offsetWidth > 121)
				d = e;
			else
				c = e
		}
		a.innerHTML = ig_mb(b, c, g)
	}
}
function ig_mb(a, b, c) {
	var d = [a.substring(0, b), "..."];
	c && d.push(c);
	return _hesc(d.join(""))
}
function ig_nb(a) {
	return typeof a == "undefined" || !a || a == "undefined"
}
function ig_ob(a, b) {
	ig_nb(a) || ig_lb(b, _ig_gmid_(a))
}
_IFPC.registerService("set_title", ig_ob);
function _IG_SetTitle(a, b, c) {
	if (ig_nb(b))
		throw new Error("Inline modules must specify their __MODULE_ID__ when using _IG_SetTitle");
	else
		ig_lb(a, b, c)
}
function _IG_FormatLeftNavTitles() {
	_IG_RegisterOnloadHandler(function() {
				var a = _gel("full_nav"), b = _gelsbyregex("div",
						/^left_nav_m_\d+_title$/, a);
				if (b)
					for (var c = 0; c < b.length; ++c) {
						var d = b[c];
						(d = d.firstChild) && ig_Y(d)
					}
			})
};
var ig_Z = {
	Y : "javascript:void(0);",
	Fb : {
		u : "",
		ti : "",
		mt : ""
	},
	gmc : function(a, b) {
		return [IG_MSGS.GMC,
				ig_p(IG_URLS.gmc, ["moduleurl=" + _esc(b.u), "mid=" + a]), ig_]
	},
	gmp : function(a) {
		return [IG_MSGS.GMP, ig_p(IG_URLS.gmp, ["mid=" + a]), ig_]
	},
	gmi : function(a, b) {
		return [
				IG_MSGS.GMI,
				ig_p(IG_URLS.gmi, ["moduleurl=" + _esc(b.u), "mid=" + a,
								"moduletitle=" + _esc(_hesc(b.ti))]), ig_]
	},
	ed : function(a, b) {
		var c = b.eh ? function() {
			window[b.eh]()
		} : ig_;
		return [IG_MSGS.ED, ig_Z.Y, ig_M(_edit, a, c)]
	},
	$a : function(a, b, c) {
		var d = ig_M(_confirmDel, a, b.mt, "n_" + b.mt + "="
						+ _esc("url=" + _esc(b.u)), c.replace("MODULE_TITLE",
						b.ti));
		return [IG_MSGS.DEL, ig_Z.Y, d]
	},
	del : function(a, b) {
		return ig_Z.$a(a, b, IG_MSGS.DEL_CONFIRM)
	},
	del2 : function(a, b) {
		return ig_Z.$a(a, b, IG_MSGS.DEL_CONFIRM2)
	},
	ming : function(a, b) {
		return [IG_MSGS.MING, ig_Z.Y, ig_M(_zm, a, b.mt)]
	},
	maxg : function(a, b) {
		var c = ig_Z.ming(a, b);
		c[0] = IG_MSGS.MAXG;
		return c
	},
	shg : function(a, b) {
		var c = ig_M(_share_this_gadget, IG_MSGS.SHG, ig_p(IG_URLS.sgu, [
								"moduleurl=" + _esc(b.u), "mid=" + a,
								"source=share_gadget"]), a);
		return [_hesc(IG_MSGS.SHG), "#", function() {
					c();
					return ig_b
				}]
	},
	osShare : function(a, b) {
		var c = function() {
			_IG_callPostLoad(function() {
						window._IG_OS_requestShareApp("remote_iframe_" + a,
								ig_, ig_, IG_MSGS.OSSHARE.replace(
										/%GADGET_NAME%/, _hesc(b.ti)))
					})
		};
		return [_hesc(IG_MSGS.SHG), ig_Z.Y, c]
	},
	Rb : /^http:\/\//,
	rb : function(a) {
		return _esc(a.replace(ig_Z.Rb, ""))
	},
	rg : function(a, b) {
		return ig_Z.rgv1(a, b).concat("dd_separator")
	},
	rgv1 : function(a, b) {
		return [IG_MSGS.RG, ig_p(IG_URLS.dir, ["recommend=" + ig_Z.rb(b.u)]),
				ig_]
	},
	ag : function(a, b) {
		return [IG_MSGS.AG, ig_p(IG_URLS.dir, ["url=" + ig_Z.rb(b.u)]), ig_]
	}
};
_exportSymbols("", ["_IG_DDI", ig_Z]);
var ig__, ig_0, ig_1 = {};
function _IG_AddDropDownEventHandler(a, b) {
	ig_1[a] = b
}
function _IG_DD_init() {
	var a = document.createElement("iframe");
	a.id = "IG_DD_iframe_cover";
	a.className = "dd_iframe_cover";
	a.style.display = "none";
	document.body.insertBefore(a, document.body.firstChild);
	var b = document.createElement("div");
	b.id = "IG_DD_div";
	b.className = "dd_layer_hidden";
	b.onclick = _IG_DD_hide;
	document.body.insertBefore(b, document.body.firstChild)
}
function _IG_DD_create(a, b) {
	if (!b) {
		b = [];
		for (var c = ig_w("m", a, "dd"), d = 0; d < c.length; ++d)
			b[d] = ig_Z[c[d]]
	}
	var e = document.createElement("div");
	e.setAttribute("id", "DD_" + a);
	e.className = "dd dd_border";
	e.style.display = "none";
	e.onkeydown = _IG_DD_keys;
	d = 0;
	for (var f; f = b[d]; d++) {
		var g = f;
		if (typeof f == "function")
			g = f(a, ig_w("m", a) || ig_Z.Fb);
		g[3] && e.appendChild(ig_pb(g[3]));
		e.appendChild(_IG_DD_add(g[0], g[1], g[2], d))
	}
	_gel("IG_DD_div").appendChild(e)
}
function _IG_DD_add(a, b, c, d) {
	b = b || "javascript:void(0)";
	var e = document.createElement("div"), f = "";
	if (typeof c == "string" && c != "")
		f = ' onclick="' + c + '"';
	e.innerHTML = '<a href="' + b + '"' + f + ">" + a + "</a>";
	var g = e.firstChild;
	if (typeof c == "string" && c != "")
		c = g.onclick;
	if (c)
		g.onclick = function(h) {
			c(h);
			_IG_DD_hide();
			return ig_b
		};
	g.className = d == 0 ? "dd_item dd_item_first" : "dd_item";
	g.onblur = function() {
		ig_0 = ig_b;
		return ig_a
	};
	g.onmouseover = function() {
		return _IG_DD_select(this)
	};
	return g
}
function ig_pb(a) {
	var b = document.createElement("div");
	b.className = a;
	b.innerHTML = '<div class="topline"></div><div class="bottomline"></div>';
	return b
}
function _IG_DD_open(a, b) {
	var c = _gel("DD_" + b);
	if (!c) {
		_IG_DD_create(b);
		c = _gel("DD_" + b)
	}
	if (c.style.display == "none") {
		ig__ = b;
		var d = _gel("IG_DD_div");
		d.className = "dd_layer";
		_IG_AddEventHandler("resize", _IG_DD_position);
		_IG_DD_position();
		ig_0 = ig_b;
		if (c.hasChildNodes()) {
			var e = c.firstChild;
			if (e.tagName != "A")
				e = e.nextSibling;
			_IG_DD_select(e)
		}
		var f = _gel("DD_tg_" + b);
		f.className += " ddbox_sel";
		var g = ig_1[ig__];
		g && g(ig_a)
	}
}
function _IG_DD_position() {
	var a = _gel("DD_" + ig__), b = _gel("DD_tg_" + ig__), c = _gel("IG_DD_div");
	a.style.display = "block";
	var d = _findPos(b), e = a.offsetWidth, f = d[0] + b.offsetWidth - e, g = document.body.clientWidth
			+ document.body.scrollLeft;
	if (f < 5)
		f = 5;
	else if (f + e > g - 5)
		f = g - 5 - e;
	a.style.left = f + "px";
	a.style.top = d[1] + b.offsetHeight + "px";
	var h = _gel("IG_DD_iframe_cover");
	h.style.left = a.style.left;
	h.style.top = a.style.top;
	h.style.width = a.offsetWidth + "px";
	h.style.height = a.offsetHeight + "px";
	h.style.display = "block";
	c.style.height = ig_F() + "px";
	c.style.width = document.body.clientWidth + "px"
}
function _IG_DD_hide() {
	var a = _gel("IG_DD_div");
	if (a.className == "dd_layer") {
		_IG_RemoveEventHandler("resize", _IG_DD_position);
		if (ig__) {
			var b = _gel("DD_" + ig__);
			b.style.display = "none";
			_gel("IG_DD_iframe_cover").style.display = "none";
			var c = _gel("DD_tg_" + ig__);
			c.className = c.className.replace(/ ddbox_sel/, "");
			var d = ig_1[ig__];
			d && d(ig_b);
			if (ig_0) {
				var e = _gel("DD_tg_" + ig__);
				e && e.focus()
			}
			ig_0 = ig_b;
			ig__ = ig_
		}
		a.className = "dd_layer_hidden"
	}
	_IG_DD_select(ig_)
}
function _IG_DD_gcn(a, b, c) {
	for (var d = new RegExp("(^| )" + c + "( |$)"), e = _gelstn(b, a), f = [], g = 0, h; h = e[g]; g++)
		d.test(h.className) && f.push(h);
	return f
}
function _IG_DD_select(a) {
	var b = _IG_DD_gcn(_gel("IG_DD_div"), "a", "dd_sel");
	if (b != ig_)
		for (var c = 0, d; d = b[c]; c++)
			d.className = d.className.replace(/ dd_sel/g, "");
	if (a) {
		try {
			a.focus()
		} catch (e) {
			if (!(e.message == "Can't move focus to the control because it is invisible, not enabled, or of a type that does not accept the focus."))
				throw e;
		}
		a.className = a.className + " dd_sel"
	}
}
function _IG_DD_keys(a) {
	function b(g, h) {
		var i = g;
		do {
			i = h ? i.nextSibling : i.previousSibling;
			if (!i) {
				var j = g.parentNode;
				i = h ? j.firstChild : j.lastChild
			}
		} while (i != g && i.tagName != "A");
		return i
	}
	var c = ig_a, d = _IG_DD_gcn(_gel("IG_DD_div"), "a", "dd_sel");
	if (d == ig_ || d.length != 1)
		return ig_a;
	var e = d[0];
	if (!a)
		a = window.event;
	var f = a.keyCode || a.charCode || a.which;
	switch (f) {
		case 13 :
			ig_0 = ig_a;
			break;
		case 38 :
			_IG_DD_select(b(e, ig_b));
			c = ig_b;
			break;
		case 40 :
			_IG_DD_select(b(e, ig_a));
			c = ig_b;
			break;
		case 27 :
		case 9 :
			ig_0 = ig_a;
			c = ig__ == ig_ && f == 9;
			_IG_DD_hide();
			break
	}
	return c
};
var ig_2 = {
	obj : ig_,
	init : function(a, b) {
		a.onmousedown = ig_2.start;
		a.obj = b;
		if (isNaN(parseInt(b.style.left, 10)))
			b.style.left = "0px";
		if (isNaN(parseInt(b.style.top, 10)))
			b.style.top = "0px";
		b.onDragStart = new Function;
		b.onDragEnd = new Function;
		b.onDrag = new Function
	},
	uninit : function(a, b) {
		window.clearInterval(b.pb);
		a.onmousedown = ig_;
		a.obj = ig_;
		b.onDragStart = ig_;
		b.onDragEnd = ig_;
		b.onDrag = ig_
	},
	start : function(a) {
		var b = ig_2.obj = this.obj;
		a = ig_2.fixE(a);
		if (a.which != 1)
			return ig_a;
		b.onDragStart(a);
		var c = a.clientY;
		ig_3.hb || (c += document.body.scrollTop);
		b.lastMouseX = a.clientX;
		b.lastMouseY = c;
		b.offsetMouseX = parseInt(b.style.left, 10) - a.clientX;
		b.offsetMouseY = parseInt(b.style.top, 10) - c;
		b.pb = window
				.setInterval(
						ig_qb(
								b,
								document.body.scrollHeight > document.documentElement.clientHeight
										? document.body.scrollHeight
										: document.documentElement.clientHeight),
						10);
		document.onmouseup = ig_2.end;
		document.onmousemove = ig_2.drag;
		return ig_b
	},
	drag : function(a) {
		a = ig_2.fixE(a);
		if (a.which == 0)
			return ig_2.end();
		var b = ig_2.obj, c = a.clientY;
		ig_3.hb || (c += document.body.scrollTop);
		var d = a.clientX;
		if (b.lastMouseX == d && b.lastMouseY == c)
			return ig_b;
		var e = d + b.offsetMouseX, f = c + b.offsetMouseY;
		b.style.left = e + "px";
		b.style.top = f + "px";
		b.lastMouseX = d;
		b.lastMouseY = c;
		b.onDrag(e, f);
		return ig_b
	},
	end : function() {
		document.onmousemove = ig_;
		document.onmouseup = ig_;
		window.clearInterval(ig_2.obj.pb);
		var a = ig_2.obj.onDragEnd();
		ig_2.obj = ig_;
		return a
	},
	fixE : function(a) {
		if (typeof a == "undefined")
			a = window.event;
		if (typeof a.layerX == "undefined")
			a.layerX = a.offsetX;
		if (typeof a.layerY == "undefined")
			a.layerY = a.offsetY;
		if (typeof a.which == "undefined")
			a.which = a.button;
		return a
	}
};
function ig_rb(a, b, c) {
	if (!a)
		return [];
	var d = b == "*" && a.all ? a.all : _gelstn(b, a), e = [];
	c = c.replace(/\-/g, "\\-");
	for (var f = new RegExp("(^|\\s)" + c + "(\\s|$)"), g, h = 0; h < d.length; h++) {
		g = d[h];
		f.test(g.className) && e.push(g)
	}
	return e
}
var _IG_initDrag = function(a, b) {
	ig_3.Q = a;
	ig_3.aa = b;
	ig_3.F = ig_rb(ig_3.Q, "div", "yui-u");
	if (_old_html) {
		ig_3.ob = ig_3.Q.tBodies[0].rows[0];
		ig_3.F = ig_3.ob.cells
	}
	ig_3.k = [];
	for (var c = 0, d = 0; d < ig_3.F.length; d++) {
		var e = ig_3.F[d];
		if (!(e.className.indexOf("ig_dnd_fixed_col") != -1 || e.style.display == "none"))
			for (var f = 0; f < e.childNodes.length; f++) {
				var g = e.childNodes[f];
				if (g.tagName == "DIV") {
					ig_3.k[c] = g.className != "dm"
							? new ig_sb(g)
							: new ig_tb(g);
					c++
				}
			}
	}
	_IG_AddEventHandler("unload", ig_ub)
};
function ig_ub() {
	if (ig_3.k)
		for (var a = 0; a < ig_3.k.length; a++) {
			ig_3.k[a].ab();
			ig_3.k[a] = ig_
		}
	ig_3.k = ig_;
	ig_3.F = ig_;
	if (_old_html)
		ig_3.ob = ig_;
	ig_3.Q = ig_
}
var ig_3 = {};
ig_3.Ja = navigator.userAgent;
ig_3.gb = ig_3.Ja.indexOf("Gecko") != -1;
ig_3.Aa = ig_3.Ja.indexOf("Opera") != -1;
ig_3.hb = ig_3.Ja.indexOf("Safari") != -1;
ig_3.Qa = "IG_pageDivMaskId";
ig_3.Pa = "IG_moduleDivMaskId";
ig_3.Yb = function() {
	ig_3.Q.style.display = "none"
};
ig_3.Zb = function() {
	ig_3.Q.style.display = ""
};
ig_3.B = ig_;
ig_3.S = function() {
	if (!ig_3.B) {
		ig_3.B = document.createElement("DIV");
		ig_3.B.className = "modbox";
		ig_3.B.backgroundColor = "";
		ig_3.B.style.border = "2px dashed #aaa";
		ig_3.B.innerHTML = "&nbsp;"
	}
	return ig_3.B
};
ig_3.D = function(a, b) {
	return function() {
		return a[b].apply(a, arguments)
	}
};
ig_3.cb = function() {
	var a = [];
	if (ig_3.aa) {
		var b;
		b = _old_html ? ig_3.aa.tBodies[0].rows[0].cells : _gelstn("LI",
				ig_3.aa);
		for (var c = 0; c < b.length; c++) {
			var d = b[c];
			(" " + d.className + " ").indexOf(" unselectedtab ") < 0
					|| d.style.display == "none" || a.push(d)
		}
		b = _gelstn("DIV", ig_3.aa);
		for (c = 0; c < b.length; c++) {
			d = b[c];
			(" " + d.className + " ").indexOf(" leftunselectedtab ") < 0
					|| d.style.display == "none" || a.push(d)
		}
	}
	return a
};
ig_3.Ab = function() {
	for (var a = ig_3.cb(), b = 0; b < a.length; b++) {
		var c = a[b];
		c.isDraggableTo = ig_a;
		c.pagePosLeft = ig_3.H(c, ig_a);
		c.pagePosRight = c.pagePosLeft + c.offsetWidth;
		c.pagePosTop = ig_3.H(c, ig_b);
		c.pagePosBottom = c.pagePosTop + c.offsetHeight
	}
};
ig_3.zb = function(a) {
	for (var b = 0; b < ig_3.k.length; b++) {
		var c = ig_3.k[b];
		c.b.pagePosLeft = ig_3.H(c.b, ig_a);
		c.b.pagePosTop = ig_3.H(c.b, ig_b)
	}
	for (var d = a.b.nextSibling; d;) {
		d.pagePosTop -= a.b.offsetHeight;
		d = d.nextSibling
	}
};
ig_3.H = function(a, b) {
	var c = 0, d = 0;
	if (a && a.offsetParent && a.offsetParent.id)
		if (!b) {
			var e = _gelstn(a.tagName, a.offsetParent);
			if (e && e[0])
				d = e[0].offsetTop
		}
	for (; a;) {
		c += a["offset" + (b ? "Left" : "Top")];
		a = a.offsetParent
	}
	return c - d
};
ig_3.xb = function(a) {
	ig_3.nb();
	var b = document.createElement("DIV");
	b.id = ig_3.Qa;
	b.innerHTML = "&nbsp;";
	b.style.position = "absolute";
	b.style.width = "100%";
	b.style.height = document.body.offsetHeight + "px";
	b.style.left = "0px";
	b.style.top = "0px";
	b.style.backgroundImage = "url(http://www.google.com/c.gif)";
	b.style.zIndex = "9999";
	document.body.appendChild(b);
	if (a.db) {
		b = b.cloneNode(ig_a);
		b.id = ig_3.Pa;
		b.style.height = a.b.offsetHeight - a.o.offsetHeight + "px";
		b.style.top = a.o.offsetHeight + "px";
		a.b.appendChild(b)
	}
};
ig_3.nb = function() {
	for (var a = [ig_3.Pa, ig_3.Qa], b = 0; b < a.length; b++) {
		var c = _gel(a[b]);
		c && c.parentNode.removeChild(c)
	}
};
ig_3.Pb = function() {
	for (var a = "", b = 0; b < ig_3.F.length; b++)
		for (var c = ig_3.F[b], d = 0; d < c.childNodes.length - 1; d++) {
			var e = c.childNodes[d];
			if (e.tagName == "DIV") {
				a += a != "" ? ":" : "";
				a += e.id.substring(2) + "_" + c.id.substring(2)
			}
		}
	_xsetp("mp=" + _esc(a))
};
function ig_tb(a) {
	this.ab = ig_vb;
	this.b = a;
	this.b.innerHTML = "<br />"
}
function ig_vb() {
	this.b = ig_
}
function ig_sb(a) {
	this._urlMouseUp = ig_wb;
	this._urlMouseDown = ig_xb;
	this._urlClick = ig_yb;
	this._dragStart = ig_zb;
	this._drag = ig_Ab;
	this._dragEnd = ig_Bb;
	this.Gb = ig_Cb;
	this.ca = ig_Db;
	this.ab = ig_Eb;
	this.K = ig_b;
	this.b = a;
	this.o = _gel(a.id + "_h");
	this.g = _gel(a.id + "_url");
	this.db = _gelstn("IFRAME", this.b).length > 0;
	this.b.DND_Module = this;
	if (this.o) {
		this.o.style.cursor = "move";
		ig_2.init(this.o, this.b);
		this.b.onDragStart = ig_3.D(this, "_dragStart");
		this.b.onDrag = ig_3.D(this, "_drag");
		this.b.onDragEnd = ig_3.D(this, "_dragEnd");
		if (this.g) {
			this.g.style.cursor = "pointer";
			if (ig_3.gb) {
				this.g.onmousedown = ig_3.D(this, "_urlMouseDown");
				this.g.onclick = ig_3.D(this, "_urlClick")
			} else
				this.g.onmouseup = ig_3.D(this, "_urlMouseUp")
		}
	}
}
function ig_Eb() {
	if (this.o) {
		if (this.g) {
			this.g.onclick = ig_;
			this.g = this.g.onmouseup = ig_
		}
		ig_2.uninit(this.o, this.b);
		this.b.onDragStart = ig_;
		this.b.onDrag = ig_;
		this.o = this.b.onDragEnd = ig_
	}
	this.b = ig_
}
function ig_wb(a) {
	a = ig_2.fixE(a);
	if (this.K || !this.g || !this.g.href || a.which != 1)
		return ig_a;
	this.ca("titleclick");
	if (this.g.target || a.shiftKey)
		window.open(this.g.href, this.g.target);
	else
		document.location = this.g.href;
	return ig_b
}
function ig_xb(a) {
	a = ig_2.fixE(a);
	a.stopPropagation();
	return ig_a
}
function ig_yb() {
	if (!this.K && this.g && this.g.href) {
		this.ca("titleclick");
		return ig_a
	}
	return ig_b
}
function ig_zb() {
	ig_3.zb(this);
	ig_3.Ab();
	this.origNextSibling = this.b.nextSibling;
	var a = ig_3.S(), b = this.b.offsetHeight;
	b -= parseInt(a.style.borderTopWidth, 10) * 2;
	var c = this.b.offsetWidth, d = ig_3.H(this.b, ig_a), e = ig_3.H(this.b,
			ig_b);
	this.b.style.width = c + "px";
	a.style.height = b + "px";
	this.b.parentNode.insertBefore(a, this.b.nextSibling);
	this.b.style.position = "absolute";
	this.b.style.zIndex = 10000;
	this.b.style.left = d + "px";
	this.b.style.top = e + "px";
	ig_3.xb(this);
	return this.K = ig_b
}
function ig_Fb() {
	var a = 0, b = 0;
	if (typeof window.pageYOffset == "number") {
		a = window.pageXOffset;
		b = window.pageYOffset
	} else if (document.body
			&& (document.body.scrollLeft || document.body.scrollTop)) {
		a = document.body.scrollLeft;
		b = document.body.scrollTop
	} else if (document.documentElement
			&& (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
		a = document.documentElement.scrollLeft;
		b = document.documentElement.scrollTop
	}
	return [a, b]
}
function ig_Ab(a, b) {
	if (!this.K) {
		this.b.style.filter = "alpha(opacity=50)";
		this.b.style.opacity = 0.5;
		this.K = ig_a;
		this.ca("dragstart")
	}
	for (var c = ig_, d = 100000000, e = 0; e < ig_3.k.length; e++) {
		var f = ig_3.k[e], g = a;
		if (document.body.dir == "rtl" && f.b.offsetWidth == 1)
			g += this.b.offsetWidth;
		var h = Math.sqrt(Math.pow(g - f.b.pagePosLeft, 2)
				+ Math.pow(b - f.b.pagePosTop, 2));
		if (!(f == this))
			if (!isNaN(h))
				if (h < d) {
					d = h;
					c = f
				}
	}
	this.z = ig_;
	var i = ig_3.cb();
	for (e = 0; e < i.length; e++) {
		f = i[e];
		if (f.isDraggableTo) {
			var j = ig_Fb();
			if (this.b.lastMouseX >= f.pagePosLeft
					&& this.b.lastMouseX <= f.pagePosRight
					&& this.b.lastMouseY + j[1] >= f.pagePosTop
					&& this.b.lastMouseY + j[1] <= f.pagePosBottom) {
				this.z = f;
				var k = ig_3.S();
				k.parentNode != ig_ && k.parentNode.removeChild(k);
				break
			}
		}
	}
	for (e = 0; e < i.length; e++) {
		f = i[e];
		if (f.id.indexOf("view") >= 0 || f.id.indexOf("contents") >= 0)
			if (f == this.z) {
				if (f.className.indexOf(" tab_hover") < 0)
					f.className += " tab_hover"
			} else
				f.className = f.className.replace(/ tab_hover/g, "")
	}
	k = ig_3.S();
	if (this.z == ig_ && c != ig_ && k.nextSibling != c.b) {
		c.b.parentNode.insertBefore(k, c.b);
		if (ig_3.Aa) {
			document.body.style.display = "none";
			document.body.style.display = ""
		}
	}
}
function ig_Bb() {
	ig_3.nb();
	this.Gb() && ig_3.Pb();
	if (this.z) {
		var a = this.z.id.match(/.*?(\d+).*/)[1], b = this.b.id
				.match(/m_(\d+)/)[1];
		_xsetp("mt=" + b + ":" + a);
		this.b.style.display = "none";
		this.z.className = this.z.className.replace(/ tab_hover/g, "");
		var c = _gel("left_nav_m_" + b + "_title"), d = _gel("gadget_set" + a);
		if (c && d) {
			c.parentNode.removeChild(c);
			d.appendChild(c);
			_gelstn("a", c)[0].onclick = function() {
				_select_gadget_and_log(a, b)
			}
		}
	}
	_hideNewUserTip();
	this.K && this.ca("dragend");
	return ig_a
}
function _hideNewUserTip() {
	var a = _gel("new_user_tip");
	if (a)
		a.style.display = "none"
}
function ig_Cb() {
	var a = ig_b;
	this.b.style.position = "";
	this.b.style.width = "";
	this.b.style.zIndex = "";
	this.b.style.filter = "";
	this.b.style.opacity = "";
	window.scrollBy(0, 0);
	var b = ig_3.S();
	if (b.parentNode != ig_) {
		if (b.nextSibling != this.origNextSibling) {
			b.parentNode.insertBefore(this.b, b.nextSibling);
			a = ig_a
		}
		b.parentNode.removeChild(b)
	}
	if (ig_3.Aa) {
		document.body.style.display = "none";
		document.body.style.display = ""
	}
	if (a && this.db && (ig_3.gb || ig_3.Aa)) {
		var c = _gelstn("IFRAME", this.b)[0], d = this.b.id.substring(2), e = _IG_Prefs
				._updatePrefsInUrl(d, c.src);
		if (c.src != e)
			c.src = e
	}
	return a
}
function ig_Db(a) {
	switch (a) {
		case "titleclick" :
			_IG_TriggerModuleEvent(this.b.id, a, this.g.href);
			_IG_TriggerEvent("module" + a, this.b.id, this.g.href);
			break;
		case "dragstart" :
		case "dragend" :
			_IG_TriggerDelayedModuleEvent(this.b.id, a);
			_IG_TriggerDelayedEvent("module" + a, this.b.id);
			break
	}
}
function ig_qb(a, b) {
	return function() {
		var c = ig_Gb(), d = ig_Fb(), e = d[1], f = 4, g = 0.05 * c, h = e, i = a.offsetTop;
		if (a.lastMouseY <= g) {
			i = a.offsetTop - f;
			h = e - f
		} else if (a.lastMouseY >= c - g) {
			i = Math.min(b - a.offsetHeight, a.offsetTop + f);
			h = Math.min(b - c, e + f)
		}
		var j = h - e;
		if (j != 0) {
			window.scrollBy(0, j);
			a.style.top = i + "px"
		}
	}
}
function ig_Gb() {
	var a;
	a = window.innerHeight ? window.innerHeight : document.documentElement
			&& document.documentElement.clientHeight
			? document.documentElement.clientHeight
			: document.body.offsetHeight;
	if (a < document.body.clientHeight)
		return a;
	return document.body.clientHeight
}
_IG_AddCustomEventHandler("initdrag", function(a, b) {
			_IG_initDrag(a, b)
		});
_exportSymbols("", ["IG_DND", ig_3]);
window._IG_PU = function() {
	var a = ig_a, b;
	function c(d) {
		if (!arguments.callee.calledOnce) {
			var e = {
				IG_PU_box : "div",
				IG_PU_iframe_cover : "iframe",
				IG_PU_bg : "div"
			};
			for (var f in e) {
				var g = document.createElement(e[f]);
				g.id = f;
				g.style.display = "none";
				document.body.insertBefore(g, document.body.firstChild)
			}
			arguments.callee.calledOnce = ig_a
		}
		return _gel(d)
	}
	return {
		open : function(d, e, f, g, h) {
			a = typeof e == "string";
			var i = c("IG_PU_box");
			if (i && i.style.display == "none") {
				f
						|| (f = [_IG_PU_MakeDialogButton("Save"),
								_IG_PU_MakeDialogButton("Cancel")]);
				var j = [
						'<table class=dialog id=IG_PU_dlg cellspacing=0 cellpadding=0><tr><td><div class=outerborder><div class="border titlebar">',
						d, '</div><div class="border body" id=dialogcontent>',
						a ? e : "", ig_Hb(f), "</div></td></tr></table>"]
						.join("");
				ig_Ib(j, g, a ? ig_ : e, h)
			}
		},
		openUrl : function(d, e, f, g, h, i, j) {
			var k = _IG_PU_createSimpleTitle(d) + (e || ""), n = [
					'<div class=url><iframe id=popup_iframe style="width:',
					g,
					';height:0px;" src="',
					f,
					'" onload="_ResizeIframeHeight();" scrolling=no frameborder=0></iframe><div class=c></div>',
					ig_Hb(h, "colored_background")].join("");
			window._IG_PU.open(k, n, [], i, j)
		},
		hide : function(d) {
			var e = _gel("button_" + d);
			if (!(e && e.firstChild && e.firstChild.disabled)) {
				c("IG_PU_box").style.display = "none";
				c("IG_PU_iframe_cover").style.display = "none";
				var f = c("IG_PU_bg");
				f.onclick = "";
				f.style.height = "";
				f.style.width = "";
				if (!a) {
					var g = _gel("dialogcontent").firstChild;
					d != _DI_button_type.OK && g.nodeName == "FORM"
							&& g.reset();
					setTimeout(function() {
								var j = _gel("popup_box_placeholder");
								j.parentNode.insertBefore(
										_gel("dialogcontent").firstChild, j);
								j.parentNode.removeChild(j)
							}, 1000)
				}
				var h = _gel("popup_iframe"), i = h
						&& h.contentWindow.getPopupData ? h.contentWindow
						.getPopupData() : ig_;
				_IG_RemoveEventHandler("resize", h ? _ResizeIframeHeight : ig_4);
				_IG_RemoveDOMEventHandler(window, "scroll", ig_4);
				b(d, i)
			}
		},
		createSimpleTitle : function(d) {
			return [
					"<div class=popup_title>",
					d,
					'</div><div class=popup_title_buttons><a onclick="_IG_PU_hide(_DI_button_type.Close);" class=delbox  href="javascript:void(0)"></a></div><div class=c></div>']
					.join("")
		},
		findFocusable : function(d, e, f) {
			if (!d.disabled) {
				var g = d.nodeName.toLowerCase();
				if (g == "input" || g == "button")
					return d;
				if (!f) {
					if (g == "a" && ig_Jb(d, "href"))
						return d;
					if (d.nodeType == 1 && ig_Jb(d, "tabindex")
							&& d.tabIndex != -1)
						return d
				}
			}
			if (!d.hasChildNodes())
				return ig_;
			var h = d.childNodes;
			if (e)
				for (var i = 0, j; j = h[i]; i++) {
					var k = ig_5(j, e, f);
					if (k)
						return k
				}
			else
				for (i = h.length - 1; j = h[i]; i--)
					if (k = ig_5(j, e, f))
						return k;
			return ig_
		},
		makeDialogButton : function(d, e, f, g) {
			var h = ["<input type=button"];
			e && h.push(' id="' + e + '"');
			f && h.push(' class="' + f + '"');
			g && h.push(' onclick="' + g + '"');
			h.push(' value="', d, '"></input>');
			return h.join("")
		},
		disableHideForButton : function(d) {
			var e = _gel("button_" + d);
			if (e)
				e.onclick = function() {
				}
		},
		createSimpleInputBox : function(d, e, f) {
			return [
					'<div class="popup_body thinpadding"><form onsubmit="_IG_PU_hide(_DI_button_type.OK); return false;"><table cellspacing=0 cellpadding=0 border=0><tr><td class=sidepadding>',
					_hesc(e), '</td><td class=sidepadding><input id="',
					_hesc(d), '" name="', _hesc(d), '" ',
					'type=text size=45 value="' + _hesc(f) + '"></td>',
					"</tr></table></form></div>"].join("")
		},
		hasAttr : function(d, e) {
			if (d.getAttributeNode) {
				var f = d.getAttributeNode(e);
				return f ? f.specified : ig_b
			}
			return d.getAttribute(e) != ig_
		},
		limitFocus : function(d) {
			d = d || window.event;
			var e = d.target || d.srcElement, f = d.keyCode || d.charCode
					|| d.which;
			if (f == 9) {
				var g = ig_5(this, ig_a, ig_b);
				if (!g)
					return ig_a;
				var h = ig_5(this, ig_b, ig_b);
				if (e == g && d.shiftKey && !(d.ctrlKey || d.altKey)) {
					h.focus();
					return ig_b
				} else if (e == h && !(d.shiftKey || d.ctrlKey || d.altKey)) {
					g.focus();
					return ig_b
				}
			}
			return ig_a
		},
		buildButtons : function(d, e) {
			if (!d || !d.length)
				return "";
			var f = ['<div id=buttons class="button_background'];
			e && f.push(" " + e);
			f.push('"><table class=buttontable cellspacing=0 cols=');
			f.push(d.length, "><tr>");
			for (var g = 0; g < d.length; ++g) {
				f.push("<td align=center>");
				f.push('<span id="button_', g, '" ');
				f.push('onclick="_IG_PU_hide(', g, ')">');
				f.push(d[g]);
				f.push("</span>");
				f.push("</td>")
			}
			f.push("</tr></table></div></div>");
			return f.join("")
		},
		showDialog : function(d, e, f, g) {
			var h = 3000, i = c("IG_PU_bg"), j = i.style;
			j.zIndex = h;
			j.background = "#000";
			ig_Kb(i, ig_a);
			j.position = "absolute";
			i.onclick = function() {
			};
			j.display = "none";
			j.left = "0px";
			j.top = "0px";
			var k = c("IG_PU_box"), n = c("IG_PU_iframe_cover");
			k.innerHTML = d;
			if (!a && f) {
				var o = document.createElement("div");
				o.id = "popup_box_placeholder";
				o.style.display = "none";
				f.parentNode.insertBefore(o, f);
				_gel("dialogcontent").insertBefore(f,
						_gel("dialogcontent").firstChild)
			}
			var p = k.style;
			p.position = "absolute";
			p.zIndex = h + 1;
			var q = n.style;
			q.position = "absolute";
			p.visibility = "hidden";
			p.display = "block";
			ig_4();
			p.visibility = "visible";
			q.display = "";
			j.display = "block";
			_IG_AddEventHandler("resize", _gel("popup_iframe")
							? _ResizeIframeHeight
							: ig_4);
			_IG_AddDOMEventHandler(window, "scroll", ig_4);
			_gel("IG_PU_dlg").onkeydown = ig_Lb;
			e = e || function() {
			};
			if (g && g.length) {
				for (var r = [], l = 0; l < g.length; ++l) {
					var m = _gel(g[l]);
					if (m) {
						r.push(g[l]);
						m.setAttribute("old_position", m.style.position);
						m.setAttribute("old_left", m.style.left);
						m.style.position = "relative";
						m.style.left = "-99999px"
					}
				}
				b = function(t, v) {
					e(t, v);
					for (var w = 0; w < r.length; ++w) {
						var u = _gel(r[w]);
						if (u) {
							u.style.position = u.getAttribute("old_position");
							u.style.left = u.getAttribute("old_left")
						}
					}
				}
			} else
				b = e;
			var s = ig_5(k, ig_a, ig_a);
			s && s.focus()
		},
		position : function() {
			var d = c("IG_PU_box");
			if (!(d.style.display != "block")) {
				var e = c("IG_PU_iframe_cover"), f = c("IG_PU_bg"), g = document.body.clientWidth, h = window.innerHeight;
				if (!h)
					h = document.documentElement.offsetHeight;
				var i = d.offsetHeight < h, j = d.style;
				if (d) {
					var k = (g - d.offsetWidth) / 2, n = Math.max(
							(h - d.offsetHeight) / 2 + ig_G(), 0);
					if (!i && j.top)
						n = parseInt(j.top, 10);
					j.left = k + "px";
					j.top = n + "px";
					var o = e.style;
					o.left = k + "px";
					o.top = n + "px";
					o.width = d.offsetWidth + "px";
					o.height = d.offsetHeight + "px"
				}
				if (f) {
					var p = parseInt(j.top, 10) + d.offsetHeight, q = Math.max(
							ig_F(), h, p);
					f.style.height = q + "px";
					f.style.width = document.body.clientWidth + "px"
				}
			}
		},
		toggleTransparency : function(d, e) {
			var f = d.style;
			if ("opacity" in f)
				f.opacity = e ? 0.5 : 1;
			else if ("MozOpacity" in f)
				f.MozOpacity = e ? 0.5 : 1;
			else if ("filter" in f)
				f.filter = e ? "alpha(opacity=50)" : "alpha(opacity=100)"
		},
		resizeIframeHeight : function() {
			var d = _gel("popup_iframe");
			if (d) {
				var e = d.style;
				e.height = ig_F(d.contentWindow.document.body) + "px";
				e.display = "block";
				e.display = ""
			}
			ig_4()
		}
	}
}();
var _DI_button_type = {
	Close : -1,
	OK : 0,
	Cancel : 1
}, _IG_PU_hide = window._IG_PU.hide, _IG_PU_open = window._IG_PU.open, _IG_PU_openURL = window._IG_PU.openUrl, _IG_PU_disable_hide_for_button = window._IG_PU.disableHideForButton, _IG_PU_MakeDialogButton = window._IG_PU.makeDialogButton, _ResizeIframeHeight = window._IG_PU.resizeIframeHeight, ig_Kb = window._IG_PU.toggleTransparency, _IG_PU_createSimpleTitle = window._IG_PU.createSimpleTitle, ig_5 = window._IG_PU.findFocusable, ig_Jb = window._IG_PU.hasAttr, ig_Lb = window._IG_PU.limitFocus, ig_Hb = window._IG_PU.buildButtons, ig_4 = window._IG_PU.position, ig_Ib = window._IG_PU.showDialog;
function _IG_PU_init() {
}
function _IG_PU_IGNORE() {
};
function _hide_sent_content_messages() {
	_gel("sent_content_msg").className = "hidden_msg";
	_gel("sent_tab_box").className = "hidden_msg_box";
	_gel("send_tab_error_box").className = "hidden_msg_box";
	_gel("sent_gadget_box").className = "hidden_msg_box"
}
var ig_6 = ig_;
function _share_gadget(a, b, c, d, e, f, g, h) {
	if (d) {
		_hide_sent_content_messages();
		if (!ig_6)
			ig_6 = _gel("sent_gadget_box").innerHTML;
		_gel("sent_gadget_box").innerHTML = ig_6.replace("GADGET_NAME",
				_get_module_title(d))
	}
	if (g)
		var i = "_gel('popup_iframe').contentWindow.prepareEmail(_gel('share_userprefs') ? _gel('share_userprefs').checked : false)";
	else
		i = "_gel('popup_iframe').contentWindow.prepareEmail();";
	var j = [
			'<input type="button" id="send_btn" disabled="true" onclick="' + i
					+ '" value="' + e + '"></input>',
			_IG_PU_MakeDialogButton(f)], k = "titlebar userprefs userprefs_border", n = _get_userprefs_checkbox_html(
			g, h, k);
	_IG_PU_openURL(a, n, b, c, j, d ? _finish_sharing_gadget : ig_);
	_IG_PU_disable_hide_for_button(0)
}
function _share_this_gadget(a, b, c, d) {
	if (c) {
		_hide_sent_content_messages();
		if (!ig_6)
			ig_6 = _gel("sent_gadget_box").innerHTML;
		_gel("sent_gadget_box").innerHTML = ig_6.replace("GADGET_NAME",
				_get_module_title(c))
	}
	var e = d || function() {
	}, f = function(g, h) {
		e(g, h);
		c && _finish_sharing_gadget(g)
	};
	_IG_PU_openURL(a, ig_, b, "555px", ig_, f);
	_IG_PU_disable_hide_for_button(0)
}
function _share_tab_with_gadget_checkboxes(a, b, c, d, e, f, g) {
	var h = '<iframe id="popup_iframe" width="100%" height="0px" src="'
			+ _hesc(b)
			+ '" onload="_ResizeIframeHeight();" scrolling="no"></iframe>', i = "_gel('popup_iframe').contentWindow.storeTabAndPrepareEmail(_find_unshared_gadgets(), _gel('share_userprefs') ? _gel('share_userprefs').checked : false);", j = [
			'<input type="button" id="send_btn" disabled="true" onclick="'
					+ _hesc(i) + '" value="' + _hesc(f) + '"></input>',
			_IG_PU_MakeDialogButton(g)];
	if (_uli) {
		for (var k = _get_all_modules(), n = Math.max(k.length * 160, 400), o = 7, p = 0, q = 0; q < k.length; q++)
			if (k[q].length > p)
				p = k[q].length;
		var r = p > o && c != "NO_TRANSLATION", l = [a];
		l.push('<form id="module_list">');
		l.push('<table class="titlebar module_list_table" ', 'cols="',
				k.length, '"', ' width="', n, 'px">');
		r ? l.push('<tr class="zipped_modules" id="module_list_zipper">') : l
				.push('<tr class="unzipped_modules">');
		for (var m = 0; m < k.length; m++) {
			l.push('<td width="', 100 / k.length, '%" ', 'valign="top">');
			for (var s = 0; s < k[m].length; s++) {
				var t = _hesc(k[m][s].id.replace("m_", "")), v = _hesc(_get_module_title(k[m][s]));
				l.push('<div class="module_item');
				s >= o && r && l.push(" extra_items");
				l.push('">');
				l.push('<input id="share_', t, '" type="checkbox"',
						" checked ></input>");
				l.push('<label for="share_', t, '">', v, "</label>");
				l.push("</div>")
			}
			l.push("</td>")
		}
		l.push("</tr>");
		if (r) {
			l.push('<tr class="zipped_module_list">');
			l.push('<td id="show_all_modules" colspan="', k.length,
					'" style="font-size:80%;text-align:center;">');
			l.push('<a href="javascript:void(0);" id="zipper_text"',
					' onclick="_modules_zipper();">');
			l.push(c, "</a>");
			l.push("</td></tr>")
		}
		l.push("</table>");
		l.push(_get_userprefs_checkbox_html(d, e, "userprefs"));
		l.push("</form>");
		_IG_PU_open(l.join(""), h, j);
		_IG_PU_disable_hide_for_button(0);
		_gel("dialogcontent").className += " url";
		_gel("buttons").className += " colored_background"
	} else {
		_IG_PU_open(a, h, j);
		_gel("buttons").className += " colored_background"
	}
}
function _show_shared_userprefs_alert() {
	if (_gel("share_userprefs").checked) {
		_gel("share_userprefs_alert").style.display = "block";
		_gel("popup_iframe").contentWindow.shouldShareUserprefs(ig_a)
	} else {
		_gel("share_userprefs_alert").style.display = "none";
		_gel("popup_iframe").contentWindow.shouldShareUserprefs(ig_b)
	}
}
function _get_userprefs_checkbox_html(a, b, c) {
	var d = [];
	if (a && a != "") {
		d.push('<div class="', c, '">');
		d.push('<input id="share_userprefs" type="checkbox"');
		b != "" && d.push(' onclick="_show_shared_userprefs_alert();"');
		d.push("></input>");
		d.push('<label for="share_userprefs">', a, "</label>");
		b != ""
				&& d.push('<div class="userprefs_alert"',
						' id="share_userprefs_alert">', b, "</div>");
		d.push("</div>")
	}
	return d.join("")
}
function _modules_zipper() {
	if (_gel("module_list_zipper").className == "zipped_modules") {
		_gel("module_list_zipper").className = "unzipped_modules";
		_gel("show_all_modules").style.display = "none"
	}
	_ResizeIframeHeight()
}
function _find_unshared_gadgets() {
	for (var a = _gel("module_list").elements, b = [], c = 0; c < a.length; c++)
		ig_Mb(a[c]) || (b[b.length] = a[c].id.replace("share_", ""));
	return b
}
function ig_Mb(a) {
	if (a && a.tagName == "INPUT") {
		var b = _gel("module_list_zipper"), c = b
				&& /unzipped_modules/
						.test(_gel("module_list_zipper").className), d = /extra_items/
				.test(a.parentNode.className), e = !b || c || !d;
		return a.checked && e
	}
	return ig_b
}
function _finish_sharing_gadget(a) {
	if (a == _DI_button_type.OK) {
		_gel("sent_content_msg").className = "msg";
		_gel("sent_tab_box").className = "hidden_msg_box";
		_gel("send_tab_error_box").className = "hidden_msg_box";
		_gel("sent_gadget_box").className = "msg_box"
	}
}
function _finish_sharing_tab(a) {
	_gel("sent_content_msg").className = "msg";
	_gel("sent_gadget_box").className = "hidden_msg_box";
	if (a) {
		_gel("sent_tab_box").className = "msg_box";
		_gel("send_tab_error_box").className = "hidden_msg_box"
	} else {
		_gel("send_tab_error_box").className = "msg_box";
		_gel("sent_tab_box").className = "hidden_msg_box"
	}
};
function _IG_saveModuleEditPrefs(a, b, c) {
	var d = ig_w("m", b), e = d.mt, f = _gel("remote_iframe_" + b), g = f
			&& f.src;
	ig_o(a, "sn", d.sn);
	ig_o(a, "ifr", g ? "1" : "0");
	if (c || !g) {
		_fsetp(a, b, e);
		return ig_a
	}
	for (var h = a.elements, i = [], j = [], k = 0; k < h.length; ++k) {
		var n = h[k].name, o = h[k].value;
		if (n && n != "url") {
			i.push(_esc(n) + "=" + _esc(o));
			var p = n.match(/^m_\d+_up_(.*)$/);
			if (p) {
				j.push(p[1]);
				j.push(o)
			}
		}
	}
	_xsetp(i.join("&"));
	_closeUserPrefs(b);
	_IG_Prefs._setPrefs(b, j);
	var q = (new Date).getTime(), r = f.onload;
	f.onload = function() {
		var s = (new Date).getTime() - q, t = d.sn;
		_sendx(["/ig/ui?action=refreshIfr&m=", _esc(t), "&ol=", s].join(""));
		typeof r == "function" && r();
		f.onload = r
	};
	var l = f.src, m = _IG_Prefs._updatePrefsInUrl(b, l);
	if (l == m)
		m = ig_ba(l);
	f.src = m;
	return ig_b
};
function _delpromobox() {
	_xsetp("hp=0");
	var a = _gel("promobox");
	a.parentNode.removeChild(a);
	return ig_b
}
function _delmessage() {
	_xsetp("gm=0");
	var a = _gel("googlemessage");
	a.parentNode.removeChild(a);
	return ig_b
}
function _delpromomod() {
	_xsetp("pm=0");
	var a = _gel("promomod");
	a.parentNode.removeChild(a);
	return ig_b
};
var ig_$ = function() {
}, _IG_ViewType = ig_$, _IG_GetSupportedViews = ig_$, _IG_NavigateToGadget = ig_$, _IG_GetCurrentView = ig_$, _IG_GetViewParams = ig_$, _IG_is_maximized_module = function() {
	return ig_b
}, _IFPC_NavigateTo = function() {
}, _IG_maximize_persistent_module = function() {
}, _IG_toggle_view = ig_$, _IG_maximize_view = ig_$, _IG_minimize_view = ig_$, _IG_restore_view = ig_$, _IG_iFrameTransitionStrategy = function() {
}, _IG_inlinedTransitionStrategy = function() {
}, _IG_scaleInlinedTransitionStrategy = function() {
}, _IG_noMaxSupportTransitionStrategy = function() {
}, _IG_noMaxSupportResizeIframe = function() {
}, ig_Qb = new function DummyV1ViewManager() {
};
ig_Qb.isModuleMaximized = function() {
	return ig_b
};
_exportSymbols("gadgets.views", ["ViewType", _IG_ViewType, "getSupportedViews",
				_IG_GetSupportedViews, "requestNavigateTo",
				_IG_NavigateToGadget, "getCurrentView", _IG_GetCurrentView,
				"getParams", _IG_GetViewParams]);
_exportClass("gadgets.views", "ViewManager", ["isModuleMaximized",
				ig_Qb.isModuleMaximized]);
