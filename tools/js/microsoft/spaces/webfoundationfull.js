/* Copyright (C) 2009 Microsoft Corporation */
$css = {
	has : function(c, b) {
		var a = false;
		try {
			a = (new RegExp("\\b" + b + "\\b", "i")).test(c.className)
		} catch (d) {
		}
		return a
	},
	remove : function(b, a) {
		$css.swap(b, a)
	},
	swap : function(a, c, b) {
		b = b || "";
		if (a && a.className)
			a.className = a.className.replace(
					new RegExp("\\b" + c + "\\b", "i"), b).replace(
					/^\s|\s(\s)|\s$/g, "$1")
	},
	add : function(a, b) {
		if (a)
			if (a.className) {
				if (!$css.has(a, b))
					a.className += " " + b
			} else
				a.className = b
	}
};
new function() {
	if ("undefined" != typeof $B)
		return;
	window["$B"] = {};
	var b = document.body, a = $css.has;
	if (a(b, "IE"))
		if (a(b, "IE_M8"))
			$B.ie = 8;
		else if (a(b, "IE_M7"))
			$B.ie = 7;
		else
			$B.ie = 6;
	else if (a(b, "Firefox"))
		if (a(b, "FF_M3"))
			$B.ff = 3;
		else
			$B.ff = 2;
	else if (a(b, "Safari")) {
		$B.sf = 3;
		if (a(b, "SF_iPhone"))
			$B.ip = 1
	}
	$B.rtl = a(b, "rtl")
};
function $(a) {
	return a == null || typeof a == "object" && !(a instanceof String)
			? a
			: document.getElementById(a)
}
function $f() {
	var d = $f.w = window, e = $f.doc = document, b = $f.ie = d.ActiveXObject
			? 1
			: 0, a = [];
	d.rtl = document.body.className.indexOf("rtl") > -1;
	if ("undefined" != typeof $Browser)
		$Browser.isIE = function() {
			return b
		};
	$f.addEvent = function(e, c, d) {
		b ? e.attachEvent(c, d) : e.addEventListener(c.substr(2), d, false);
		a.push({
					target : e,
					event : c,
					func : d
				})
	};
	$f.removAllEvents = function() {
		var b, d = a.length;
		while (d--) {
			b = a[d];
			c(b.target, b.event, b.func)
		}
	};
	$f.removeEvent = function(h, e, g) {
		e = !b ? e.substr(2) : e;
		var d, f = a.length;
		while (f--) {
			d = a[f];
			if (d.target == h && d.event == e && d.func == g) {
				c(d.target, d.event, d.func);
				a.splice(f, 1);
				break
			}
		}
	};
	$f.cancelEvent = function(a) {
		a = a || window.event;
		a.cancelBubble = true;
		if (a.stopPropagation) {
			a.preventDefault();
			a.stopPropagation()
		} else
			a.returnValue = false;
		return false
	};
	function c(d, a, c) {
		b ? d.detachEvent(a, c) : d.removeEventListener(a, c, false)
	}
	$f.px = function(a) {
		return a + "px"
	}
}
$f();
$f.addEvent($f.w, "onunload", $f.removAllEvents);
$f.dockIt = function(h, j, a, c, g, k) {
	var f = 0;
	g = g || false;
	a = typeof a == "undefined" ? 0 : a;
	c = c || {
		x : 0,
		y : 0
	};
	if (typeof c != "object") {
		f = c;
		c = {
			x : 0,
			y : 0
		}
	}
	var e = $f.getLocation(h, g), b = $f.getLocation(j, g), d = {
		x : e.bodyX + c.x,
		y : e.bodyY + c.y
	}, i = a % 2;
	if (k) {
		d.x = c.x;
		d.y = c.y + b.bottom
	} else if (a >= 0)
		if (a < 4) {
			d.x += i ? rtl ? b.left : b.right - e.width : rtl ? b.right
					- e.width : b.left;
			d.y += a < 2 ? b.bottom + f : b.top - e.height - f
		} else {
			if (rtl)
				if (a < 6)
					a += 2;
				else
					a -= 2;
			d.x += a < 6 ? b.left - e.width - f : b.right + f;
			d.y += i ? b.bottom - e.height : b.top
		}
	h.style.left = d.x + "px";
	h.style.top = d.y + "px";
	return d
};
$f.getLocation = function(b, c) {
	var h = false, d = $f.getStyle, f = "offsetTop", e = "offsetLeft", k = "position", a = {
		x : b[e],
		y : b[f],
		top : 0,
		right : 0,
		bottom : 0,
		left : 0,
		bodyX : 0,
		bodyY : 0,
		width : b.offsetWidth,
		height : b.offsetHeight
	};
	while (b = b.offsetParent) {
		h = d(b, k) == "relative";
		if (c != 2) {
			a.bodyX -= b[e];
			a.bodyY -= b[f]
		}
		if (h) {
			var i = g(d(b, "padding-left")), j = g(d(b, "padding-top"));
			a.x = c == 1 ? a.x : i;
			a.y = c == 1 ? a.y : j
		}
		a.x += b[e];
		a.y += b[f]
	}
	function g(a) {
		a = parseInt(a);
		return isNaN(a) ? 0 : a
	}
	a.left = a.x;
	a.top = a.y;
	a.right = a.x + a.width;
	a.bottom = a.y + a.height;
	return a
};
$f.getStyle = function(c, a) {
	var d = "";
	if ($f.doc.defaultView && $f.doc.defaultView.getComputedStyle)
		d = $f.doc.defaultView.getComputedStyle(c, "").getPropertyValue(a);
	else if (c.currentStyle) {
		if (a.indexOf("-") >= 0) {
			var b = a.split("-");
			b[1] = b[1].substr(0, 1).toUpperCase() + b[1].substr(1);
			a = b.join("")
		}
		d = c.currentStyle[a]
	}
	return d
};
window.rtl = $f.getStyle(document.body, "direction") == "rtl";
$f.isChildOf = function(b, a) {
	try {
		while (a && a !== b && a != document)
			a = a.parentNode;
		return a === b
	} catch (c) {
	}
};
function $menu(c, i, N, gb, jb, fb, db, hb) {
	N = N || null;
	var k = this, m = "px", e = "visibility", g = "display", F = "hidden", W = "block", V = "visible", O = "className", Z = "nextSibling", L = "none", Y = "onkeydown", lb = "onkeyup", p = "onblur", f = $f.addEvent, E = $f.removeEvent, x = null, l, u, A, w, b, t, C = 1, D, o = 1, j, q = c.style, M = $B.ie == 6, a = {
		display : 0,
		visibility : 0
	}, d = a, v = 0, h, z = 0, s, R, r, y, H = "sel";
	this.parentEl = null;
	var kb = {
		blurSrc : null,
		lastKeyCode : null,
		isShift : false
	};
	function ib() {
		c.binding = k;
		f(c, Y, U);
		f(i, Y, U);
		f(i, p, B);
		f($f.doc, "onmouseup", ab);
		f($f.doc, "onkeyup", bb);
		s = i.tagName == "INPUT";
		y = s ? "c_dark" : "c_light";
		window.setTimeout(function() {
					f(i, "on" + db, k.toggleState)
				}, 0);
		T();
		J();
		q[g] = L;
		f(window, "onresize", eb)
	}
	function T() {
		w = c.getElementsByTagName("A");
		var b = z = w.length, d, e;
		if (b > 0) {
			if (o && j)
				P();
			o = 0;
			u = w[0];
			A = w[b - 1];
			f(u, p, B);
			f(A, p, B);
			while (b > 0) {
				b--;
				d = false;
				var a = w[b];
				try {
					d = a.parentNode.tagName == "LI"
				} catch (g) {
				}
				if (d) {
					E(a, "onfocus", G);
					E(a, p, G);
					f(a, "onfocus", G);
					f(a, p, G);
					if (!D && $css.has(a, H))
						r = a;
					if (h && h.id == a.id) {
						e = 1;
						n(b)
					}
				}
			}
		} else {
			I();
			o = 1
		}
		if (!e && r)
			n(-1)
	}
	this.update = function() {
		D = true;
		E(u, p, B);
		E(A, p, B);
		T();
		J();
		D = false
	};
	function G(a) {
		if (!s) {
			a = a || event;
			var b = a.target || a.srcElement;
			a.type == "focus" ? $css.add(b, y) : $css.remove(b, y)
		}
	}
	function eb(a) {
		a = a || event || {
			type : null
		};
		C = true;
		if (!$css.has(c, "noresize"))
			K()
	}
	function J() {
		if (o)
			return;
		var h = 3, p = !b;
		d[e] = a[e] = q[e] = F;
		d[g] = a[g] = q[g] = W;
		if (!b) {
			b = c;
			while (b[O] != "c_shad" && b[Z])
				b = b[Z];
			if (!b || b[O] != "c_shad") {
				b = document.createElement("div");
				a = b.style;
				a.position = "absolute";
				b[O] = "c_shad";
				c.parentNode.appendChild(b);
				if (M) {
					t = document.createElement("IFRAME");
					t.frameBorder = "no";
					t.src = "javascript:''";
					t.scrolling = "no";
					d = t.style;
					d.position = "absolute";
					c.parentNode.appendChild(t)
				}
			}
			a = b.style;
			a[g] = L;
			a.backgroundColor = "#000";
			cb(b, 30)
		}
		var l = $f.dockIt(c, i, N, gb, jb, hb), n = function() {
			var b = $f.getLocation(c);
			a[e] = F;
			a.width = b.width + m;
			a.height = b.height + m;
			a.left = l.x + (rtl ? -h : h) + m;
			a.top = l.y + h + m;
			a[e] = V;
			if (M) {
				d[e] = F;
				d.width = b.width + h + m;
				d.height = b.height + h + m;
				d.left = (rtl ? l.x - h : l.x) + m;
				d.top = l.y + m
			}
		};
		n();
		if (M && p)
			f(c, "onresize", n);
		if (!j)
			I();
		else if (D)
			k.show();
		C = false
	}
	function Q() {
		return (new Date).getTime() - S > 100
	}
	function I() {
		$css.remove(c, "on");
		d[g] = a[g] = q[g] = L;
		d[e] = a[e] = q[e] = F
	}
	function P() {
		$css.add(c, "on");
		d[g] = a[g] = q[g] = W;
		d[e] = a[e] = q[e] = V
	}
	function K(b, a) {
		if (a || Q() && j) {
			if (!o)
				I();
			j = 0
		}
	}
	this.hide = K;
	this.show = function() {
		$menu.current = k;
		if (!o)
			P();
		j = 1
	};
	var S = 0;
	this.toggleState = function() {
		if (Q()) {
			S = (new Date).getTime();
			if (!j && (!$f.ie || C))
				J();
			!j || s ? k.show() : K(0, 1)
		}
	};
	this.invalidatePosition = function() {
		C = true
	};
	function ab(a) {
		a = a || event;
		var b = a.target || a.srcElement;
		if (j && !$f.isChildOf(c, b) && i != b)
			k.hide()
	}
	function bb(a) {
		a = a || event;
		var c = 27, b = a.target || a.srcElement;
		if (j)
			if (a.keyCode == c) {
				R = b.value;
				k.hide()
			} else if (!l && x == i && u && !fb)
				try {
					u.focus()
				} catch (d) {
				}
		if (s && b == i)
			if (!j && b.value != R)
				k.show()
	}
	function U(a) {
		a = a || event;
		var c = a.target || a.srcElement, b = a.keyCode || a.which, d = b == 9;
		l = a.shiftKey;
		x = c;
		if (s)
			if (c == i) {
				if (b == 40)
					X(1);
				else if (b == 38)
					X(-1);
				else if (b == 13)
					if (h)
						h.focus();
					else
						r.focus();
				else if (d && !l)
					n(0)
			} else if (d)
				if (!l)
					if (x != A)
						n(v + 1);
					else
						n(-1);
				else if (l)
					n(v - 1)
	}
	function X(b) {
		if (z) {
			var a = v + b;
			if (a >= z)
				a = 0;
			else if (a < 0)
				a = z - 1;
			n(a)
		}
	}
	function n(a) {
		if (z) {
			if (h)
				$css.remove(h, y);
			v = a;
			if (v > -1) {
				h = w[v];
				$css.add(h, y);
				if (r != h)
					$css.remove(r, H)
			} else {
				h = null;
				$css.add(r, H)
			}
		}
	}
	function B() {
		if (l && x == i)
			k.hide();
		else if (!o && (!l && x == A || l && x == u))
			k.hide()
	}
	function cb(b, a) {
		var c = "undefined" == typeof b.style.filter ? "opacity" : "filter";
		b.style[c] = c == "filter" ? "alpha(opacity=" + a + ")" : .01 * a
	}
	ib()
}
$menu.closeCurrent = function() {
	if ($menu.current)
		$menu.current.hide(0, 1)
};
$menu.current = null;
$menu.bind = function(d, o, l, n, k, m) {
	d = d || event;
	var p = d.target || d.srcElement, f = ["c_ml", "c_mcp", "c_m"], b, c, a, h = p;
	if ((c = i(h, f[0])) && typeof c.menu === "undefined") {
		b = i(h, f[1]) || c.parentNode;
		if (b) {
			if (navigator.appVersion.indexOf("MSIE 6") > -1
					&& b.tagName == "LI" && $css.has(b.parentNode, "c_m"))
				b.style.width = b.offsetWidth + "px";
			var e = b.childNodes, g = e.length;
			while (g-- && !a)
				a = $css.has(e[g], f[2]) ? e[g] : null;
			j()
		}
	}
	function j() {
		var b = false;
		if (a.binding)
			a.binding.toggleState();
		else if (a && c) {
			a.binding = new $menu(a, c, o, l, n, k, d.type, m);
			a.binding.toggleState();
			c.menu = a.binding;
			b = true
		}
		return b
	}
	function i(a, c) {
		var d = $css.has(a, c), b = d ? a : null;
		while (!b && (a = a.parentNode) && typeof a != "undefined")
			if ($css.has(a, c))
				b = a;
		return b
	}
	return false
};
new function() {
	var a = $("c_hsv"), c, b, d;
	if (!a)
		return;
	if (!window["$H"])
		$H = {};
	i();
	if (!b)
		return;
	f();
	if ($H.d)
		e();
	function f() {
		$f.addEvent(a, "onfocus", h);
		$f.addEvent(a, "onkeydown", g);
		$f.addEvent($("c_hsbt"), "onclick", function() {
					$H.trace(3)
				});
		var c = b.getElementsByTagName("A");
		if (!c || c.length != 2)
			return;
		d = c[0];
		$f.addEvent(d, "onclick", function() {
					$H.trace(1)
				});
		$f.addEvent(c[1], "onclick", function() {
					$H.trace(2)
				})
	}
	function g(a) {
		a = a || event;
		var b = a.keyCode || a.which;
		$H.enter = b == 13
	}
	function h() {
		if (!c && $H.u)
			e()
	}
	function e() {
		if ($Tracing)
			$Tracing.StartTrace("HWD", 0, 15000);
		c = document.createElement("script");
		c.src = $H.u;
		a.parentNode.appendChild(c)
	}
	function i() {
		var e = $("c_search"), d = e.getElementsByTagName("UL"), c;
		if (d.length > 0) {
			b = d[0];
			if ($B.ff)
				c = $B.rtl ? {
					x : 6,
					y : 4
				} : {
					x : -6,
					y : 4
				};
			else if ($B.sf)
				c = $B.rtl ? {
					x : 6,
					y : 4
				} : {
					x : -6,
					y : 4
				};
			else
				c = $B.rtl ? {
					x : 6,
					y : 2
				} : {
					x : -6,
					y : 2
				};
			a.menu = b.binding = new $menu(b, a, 0, c, 1, 1, "focus")
		}
	}
	$H.trace = function(c) {
		if ($Tracing) {
			var a = "HS", e = b.getElementsByTagName("LI").length > 2 ? 1 : 0;
			if (c == 4)
				a += "C";
			else if (c == 3)
				a += "I";
			else if (c == 2)
				a += "A";
			else if (c == 1) {
				a += "D";
				if ($css.has(d, "sel"))
					a += "E"
			}
			$Tracing.FireTrace(a, e)
		}
	}
};
new function() {
	var b = $("uxp_ftr_control_mini"), f = $("uxp_ftr_hidechevron"), c = $("uxp_ftr_control_cc");
	if (!b)
		return;
	function a(b, a, d) {
		c.style.display = a;
		if (d) {
			b.returnValue = false;
			return false
		}
	}
	function g(b) {
		return a(b, "none", true)
	}
	function h(b) {
		return a(b, "", true)
	}
	function d(a, b) {
		return a && (a.id === b || d(a.parentElement, b))
	}
	function e(e) {
		if (c.style.display === "" && !d(e.srcElement, b.id))
			return a(e, "none", false)
	}
	$f.addEvent(document, "onclick", e);
	$f.addEvent(b, "onclick", h);
	$f.addEvent(f, "onclick", g)
};
function $menu_themes(g, d, f, b) {
	$menu.optionsElement = g;
	$menu.themeAreaId = d;
	$menu.disableThumbs = b;
	var a = "c_themes", c = $(a);
	if (!c)
		$newScript(f + "themes.js", a);
	new function e() {
		if ("undefined" == typeof $theme)
			$menu.themeCallback = e;
		else
			try {
				$theme.bind($menu.optionsElement, $menu.themeAreaId)
			} catch (a) {
			}
	}
}
$f.addEvent(window, "onload", function() {
			var c = document.getElementsByTagName("div");
			for (var b = 0; b < c.length; b++)
				if ($css.has(c[b], "c_c")) {
					var a = c[b];
					a.DisableCommand = function(c) {
						var b = a.getElementsByTagName("a")[c];
						if (!$css.has(b, "c_ld")) {
							b.className.length > 0
									? (b.className += " c_ld")
									: (b.className = "c_ld");
							if (b.onclick)
								b.command = b.onclick;
							b.onclick = function() {
								return false
							}
						}
					};
					a.EnableCommand = function(d) {
						var b = a.getElementsByTagName("a")[d];
						if ($css.has(b, "c_ld")) {
							var c = b.className;
							c.length > 4 ? (b.className = c.substr(c
											.indexOf("c_ld")
											- 1, 5)) : (b.className = "");
							b.command
									? (b.onclick = b.command)
									: (b.onclick = null)
						}
					}
				}
		});
var $db = {};
new function() {
	var c = $db, g = {}, f = "", n = "", l = "", h = "c_db_i_of", j = "c_db_i_oh", d = "c_db_i_mo", m = "c_db_i", o = "";
	_imageAlt = "";
	_itemWithMenuClassName = "c_db_wm";
	_dynamicCanary = "", _menuEvents = 'onfocus="return $db.menuItemOn(this);" onblur="return $db.menuItemOut(this);"';
	function e(a) {
		a = a || event;
		return a.target || a.srcElement
	}
	function s(a) {
		k(a, true)
	}
	function r(a) {
		k(a, false)
	}
	function k(c, f) {
		var a = b(e(c));
		if (f)
			$css.add(a, j);
		else
			$css.remove(a, j);
		if (q(a))
			$css.add(a, d);
		else
			$css.remove(a, d)
	}
	function b(a, b) {
		while (a && !$css.has(a, b ? "c_db" : m))
			a = a.parentNode;
		return a
	}
	function p(o) {
		var d = e(o), j = d.tagName == "IMG"
				? d.parentNode.parentNode
				: d.parentNode, r = d.tagName == "IMG" ? d.parentNode : d;
		if (!j.menu) {
			var q = b(j), m = a(q, "n"), k = document.createElement("div"), h = j;
			menuOptions = "", i = 0;
			if ($css.has(h, _itemWithMenuClassName) == false) {
				k.className = "c_m c_om";
				$css.add(h, _itemWithMenuClassName);
				for (var c in g) {
					if (c != "n" || c == "n" && g[c])
						menuOptions += [
								'<li><a href="#"' + _menuEvents
										+ " onclick=\"return $db.doAction('",
								c, "',this)\">", g[c], m && c == "n" ? m : "",
								"</a></li>"].join("");
					i++
				}
				h.appendChild(k);
				var p = _permissionsText == "" || _permissionsText == null
						? ""
						: '<li><a target="_top" href="' + _permissionsLink
								+ '"' + _menuEvents + ">" + _permissionsText
								+ "</a></li>", l = f == "" || f == null
						? ""
						: '<li><a target="_top" href="' + n + '"' + _menuEvents
								+ ">" + f + "</a></li>";
				k.innerHTML = "<ul>"
						+ menuOptions
						+ "</ul>"
						+ (l == ""
								? ""
								: '<div class="lp"><div class="line"></div></div><ul>'
										+ p + l + "</ul>")
			}
			r.focus();
			try {
				$menu.bind(o, 1)
			} catch (s) {
			}
		}
		return false
	}
	function q(b) {
		var a = false;
		try {
			a = b.children[1].children[1].style.visibility == "visible"
		} catch (c) {
		}
		return a
	}
	function a(b, a) {
		return b.getAttribute(a)
	}
	c.bindOptions = function(q) {
		var d = b(q, 1);
		if (!d.bound) {
			var i = $f.addEvent;
			f = a(d, "ot");
			n = a(d, "ov");
			_permissionsText = a(d, "pt");
			_permissionsLink = a(d, "pv");
			_dynamicCanary = a(d, "dc");
			l = a(d, "hdlr");
			var j = d.getElementsByTagName("DIV"), k = a(d, "o").split("|"), c;
			for (c = 0; c < k.length; c++)
				g[k[c]] = a(d, k[c]);
			for (c = 0; c < j.length; c++)
				if ($css.has(j[c], m)) {
					i(j[c], "onmouseover", s);
					i(j[c], "onmouseout", r)
				}
			var e = d.getElementsByTagName("A");
			for (c = 0; c < e.length; c++)
				if ($css.has(e[c], "c_db_ito")) {
					i(e[c], "onblur", $db.menuOut);
					i(e[c], "onfocus", $db.menuOn);
					i(e[c], "onclick", p);
					var h = new Image;
					h.src = o = a(d, "oImg");
					h.alt = _imageAlt = a(d, "oAlt");
					h.title = h.alt;
					h.className = "c_db_i_opt";
					e[c].appendChild(h)
				}
			d.bound = true
		}
		return false
	};
	c.doAction = function(c, g) {
		var f = "", h = "none";
		image = new Image, div = b(g);
		if (c == "d") {
			div.style.display = h;
			f = a(div, c)
		}
		if (c == "a" || c == "n") {
			c = c == "n" ? "cid" : c;
			var e = b(g, 1).firstChild, i = a(b(g), c);
			while (e) {
				if (e && e.attributes && a(e, c) == i)
					e.style.display = h;
				e = e.nextSibling
			}
			f = c + "=" + i
		}
		image.src = l + "?dc=" + _dynamicCanary + "&" + f;
		$menu.closeCurrent();
		$css.remove(div, d);
		return false
	};
	c.menuOn = function(d) {
		var a = e(d), c = b(a);
		$css.add(c, h)
	};
	c.menuOut = function(f) {
		var c = e(f), a = b(c);
		$css.remove(a, d);
		$css.remove(a, h)
	};
	c.menuItemOn = function(a) {
		c.menuOn(a);
		var e = b(a);
		$css.add(e, d)
	};
	c.menuItemOut = function(a) {
		c.menuOut(a);
		var e = b(a);
		$css.remove(e, d)
	}
};
var $Ads = {
	Init : function(a) {
		if (typeof $AdConfig != "undefined" && (!a || $AdConfig.ear))
			if ($AdConfig.rd > 0)
				window.setTimeout($Ads._IN, $AdConfig.rd);
			else
				$Ads._IN()
	},
	_IN : function() {
		if (!$Ads.IsInit)
			if ((isDapAvailable = !$AdConfig.fl && typeof dapMgr != "undefined")
					|| $AdConfig.fl || $Ads._W) {
				for (var b = 0; b < $AdConfig.Data.length; b++) {
					var a = $AdConfig.Data[b], c;
					if (isDapAvailable)
						try {
							dapMgr.enableACB(a[0], a[4]);
							dapMgr.renderAd(a[0], a[1], a[2], a[3])
						} catch (d) {
						}
					else if (a[5] != "") {
						c = $(a[0]);
						c.innerHTML = ["<img src='", $AdConfig.burl, a[0],
								$AdConfig.ext, "' alt=''>"].join("")
					}
				}
				$Ads.IsInit = true;
				$Ads._lr = new Date;
				$Ads._ac = 0
			} else {
				$Ads._W = 1;
				window.setTimeout($Ads._IN, 1e4)
			}
	},
	Refresh : function() {
		if (!$Ads.IsInit)
			$Ads.Init();
		else if (++$Ads._ac >= $AdConfig.ar) {
			var a = new Date;
			if ($AdConfig.mi < (a - $Ads._lr) / 1e3) {
				$Ads._lr = a;
				$Ads._ac = 0;
				try {
					dapMgr.trackEvent(eventType.click)
				} catch (b) {
				}
			}
		}
	}
};
$Ads.Init(true);
window.$cxp_ic = window.$cxp_ic || {};
$cxp_ic.ic = {};
$cxp_ic.eventutil = {};
$cxp_ic.dom = {};
$cxp_ic.data = {};
$cxp_ic.presence = {};
$cxp_ic.menu = {};
$cxp_ic.constants = {};
$cxp_ic.ItemType = {
	Tile : "Tile",
	Name : "Name",
	Message : "Message",
	MenuCustom : "MenuCustom"
};
$cxp_ic.scoped_eval = function(p_args) {
	eval(p_args)
};
var $cxp_ic_f = function() {
	var f = $cxp_ic.constants = {
		ControlDataIndex : {
			cid : "0",
			showmenu : "1",
			menudefault : "2",
			name : "3",
			contactid : "4",
			deccid : "5",
			address : "6",
			membername : "7",
			attachmenutobody : "8",
			placedintable : "9",
			menucustom : "10",
			tileitemid : "11",
			nameitemid : "12",
			psmitemid : "13",
			actiontypeurloverride : "14"
		},
		MenuIndex : {
			text : "0",
			url : "1",
			itemid : "2",
			callback : "3",
			target : "4"
		}
	}, c = new function() {
		var a = window.navigator.appVersion, b = document.body;
		this.isIE = function() {
			return window.ActiveXObject ? 1 : 0
		};
		this.direction = "rtl" === (b.currentStyle
				? b.currentStyle.direction
				: document.defaultView.getComputedStyle(b, "")
						.getPropertyValue("direction")) ? "right" : "left";
		this.getVersion = function() {
			return this.isIE()
					? parseFloat(a.substr(a.indexOf("MSIE") + 5, 3))
					: parseFloat(a)
		};
		this.isIE6 = function() {
			return this.isIE() && this.getVersion() == 6
		};
		this.isIE7 = function() {
			return this.isIE() && this.getVersion() == 7
		};
		this.isIE6_RTL = function() {
			return this.isIE6() && this.direction == "right"
		}
	}, b = $cxp_ic.eventutil = new function() {
		var a = [];
		this.addEvent = function e(e, b, d, f) {
			c.isIE() ? e.attachEvent("on" + b, d) : e.addEventListener(b, d,
					false);
			if (!f)
				a.push({
							target : e,
							eventType : b,
							listener : d
						})
		};
		this.removeEvent = function d(d, a, b) {
			c.isIE() ? d.detachEvent("on" + a, b) : d.removeEventListener(a, b,
					false)
		};
		this.removeAllEvents = function b() {
			var b, c = a.length;
			while (c--) {
				b = a[c];
				this.removeEvent(b.target, b.eventType, b.listener)
			}
		};
		this.stopEvent = function(a) {
			c.isIE() ? (event.cancelBubble = true) : a.stopPropagation()
		};
		this.stopEventAction = function(a) {
			c.isIE() ? (event.returnValue = false) : a.preventDefault()
		};
		this.eventTarget = function(a) {
			return c.isIE() ? event.srcElement : a.target
		};
		this.clientX = function(a) {
			return c.isIE() ? event.clientX : a.clientX
		};
		this.clientY = function(a) {
			return c.isIE() ? event.clientY : a.clientY
		};
		this.clientHeight = function() {
			return c.isIE()
					? document.documentElement.clientHeight
					: window.innerHeight
		};
		this.clientWidth = function() {
			return c.isIE()
					? document.documentElement.clientWidth
					: window.innerWidth
		}
	}, a = $cxp_ic.dom = new function() {
		var a = {};
		this.clear = function() {
			a = {}
		};
		this.dispose = function() {
			a = null
		};
		this.getIcIdFromTarget = function(c) {
			var a = b.eventTarget(c).id;
			return a && a.indexOf("_") > 0 ? a.split("_")[0] : ""
		};
		this.$ = function(d, c) {
			var b = [d, "_", c].join("");
			if (!a[b])
				a[b] = document.getElementById(b);
			return a[b]
		}
	}, g = $cxp_ic.presence = new function() {
		var b = this, g, i, h = "NI", j = {}, f = {};
		this.start = function() {
			if (!b.isShowPresence())
				return;
			if (c.isIE() && h == "NI")
				try {
					g = new ActiveXObject("MSNMessenger.Hotmail2Control");
					if (g) {
						var a = g.GetLocalUserStatus();
						g.SetLocalUserStatus(a);
						h = "E";
						k();
						i = window.setInterval(function() {
									k()
								}, 5e3)
					}
				} catch (d) {
					h = "NE";
					g = null;
					f = {}
				}
			if (!b.isEnabled())
				f = {}
		};
		this.startWeb = function() {
			var a, c;
			if (!b.isShowPresence())
				return;
			try {
				h = "E";
				for (a in f) {
					c = a.indexOf("cid:") == 0 ? a.substring(4) : null;
					j[a] = gPresenceManager.subscribe(b, b.update, !c
									? a
									: null, c, null)
				}
			} catch (d) {
				h = "NE"
			}
		};
		this.dispose = function() {
			try {
				if (b.isWebMsgr()) {
					var a;
					for (a in j)
						gPresenceManager.unsubscribe(j[a])
				} else if (i) {
					window.clearInterval(i);
					i = null
				}
				g = j = f = h = b = null
			} catch (c) {
			}
		};
		this.isEnabled = function() {
			return h == "E"
		};
		this.isShowPresence = function() {
			var a = window.navigator.cpuClass, c = a == "x64" || a == "ia64";
			return (!c || b.isWebMsgr())
					&& d.CommonData.getItem("showpresence") == "1"
		};
		this.isWebMsgr = function() {
			return d.CommonData.getItem("webpresence") == "1"
		};
		this.register = function(a, c) {
			if (!b.isShowPresence() || !a || !c)
				return;
			if (!f[a])
				f[a] = [];
			f[a].push(c)
		};
		var k = function() {
			var d, a, c;
			try {
				a = g.GetLocalUserStatus()
			} catch (e) {
			}
			if (!a)
				a = 0;
			for (d in f)
				try {
					if (a == 1 || a == 0)
						c = 0;
					else
						c = g.GetUserStatus(d);
					b.update({
								emailAddress : d,
								status : c
							})
				} catch (e) {
				}
			if (a == 0)
				if (i) {
					window.clearInterval(i);
					h = "NE";
					i = null
				}
		};
		this.update = function(i) {
			var v, t, w;
			try {
				if (i) {
					v = i.status;
					t = i.emailAddress
							|| (i.cid ? ["cid:", i.cid].join("") : null);
					w = i.psm
				}
				if (v == null || t == null)
					return;
				var h, g, n = d.CommonData;
				switch (v) {
					case 2 :
						h = "green";
						g = n.getItem("p_av");
						break;
					case 10 :
					case 50 :
						h = "red";
						g = n.getItem("p_b");
						break;
					case 14 :
					case 18 :
					case 34 :
					case 66 :
						h = "orange";
						g = n.getItem("p_aw");
						break;
					case 1 :
					case 6 :
						h = "blue";
						g = n.getItem("p_off");
						break;
					case 0 :
					default :
						h = "blue";
						g = ""
				}
				if (h) {
					var c, p, j, o, x, r, q, k, u, m, l, z = f[t], A = [
							"cxp_ic_", h, "frame", g ? " cxp_ic_pr_av" : ""]
							.join("");
					for (p = 0; p < z.length; ++p) {
						c = z[p];
						o = a.$(c, "frame");
						r = a.$(c, "pr_t");
						j = a.$(c, "menu_si");
						q = a.$(c, "menu_si_pr_t");
						x = j && j.style.display == "none";
						u = a.$(c, "menu");
						if (o) {
							var y = "";
							if (o.className.indexOf("cxp_ic_frame_clip") >= 0)
								y = " cxp_ic_frame_clip";
							o.className = A + y
						}
						if (q)
							q.innerHTML = g;
						if (j)
							if (g && x)
								j.style.display = "block";
							else if (g == "")
								j.style.display = "none";
						if (u && u.style.display == "block")
							e.adjustShadow(c);
						if (r)
							r.innerHTML = " " + g;
						k = a.$(c, "psm");
						if (k && b.isWebMsgr()) {
							m = a.$(c, "text");
							var s = a.$(c, "usertilecontainer")
									&& a.$(c, "usertilecontainer").className
											.split(" ");
							if (s && s[1])
								l = s[1].replace("cxp_ic_img_", "");
							else
								l = "";
							if (w) {
								k.style.display = "block";
								k.innerHTML = w;
								if (m.className.indexOf("text_h") > 0
										&& l != "xl")
									m.className = "cxp_ic_text_h"
							} else {
								k.style.display = "none";
								k.innerHTML = "";
								if (m.className.indexOf("text_h") > 0
										&& l != "xl")
									m.className = "cxp_ic_text_h cxp_ic_text_h_"
											+ l
							}
						}
					}
				}
			} catch (B) {
			}
		};
		this.isAvailableForIC = function(c) {
			var b = a.$(c, "frame");
			if (b)
				return b.className.indexOf("cxp_ic_pr_av") >= 0;
			return false
		};
		this.startIM = function(a) {
			var c;
			if (!a)
				return;
			try {
				if (b.isWebMsgr()) {
					c = a.indexOf("cid:") == 0 ? a.substring(4) : null;
					gPresenceManager.chat(!c ? a : null, c)
				} else
					g.InstantMessage2(a, "", 0)
			} catch (d) {
			}
		}
	}, d = $cxp_ic.data = new function() {
		var a = this;
		this.dispose = function() {
			a.Itemid_Element_Map.dispose();
			a.Cid_Icid_Map.dispose();
			a = null
		};
		this.Itemid_Element_Map = new function() {
			var a = {};
			this.add = function(b, c, d) {
				if (!b || !c || !d)
					return;
				if (!a[b])
					a[b] = {};
				if (!a[b][c])
					a[b][c] = [];
				a[b][c].push(d)
			};
			this.getItem = function(b, c) {
				if (a[b] && a[b][c])
					return a[b][c];
				else
					return []
			};
			this.dispose = function() {
				a = null
			}
		};
		this.Cid_Icid_Map = new function() {
			var a = {};
			this.add = function(b, c) {
				if (!a[b])
					a[b] = [];
				a[b].push(c)
			};
			this.getItem = function(b) {
				if (a[b])
					return a[b];
				else
					return []
			};
			this.dispose = function() {
				a = null
			}
		};
		this.CommonData = new function() {
			this.getItem = function(a) {
				if (typeof cxp_ic_common_data != "undefined"
						&& cxp_ic_common_data[a])
					return cxp_ic_common_data[a];
				return ""
			}
		};
		this.ControlData = new function() {
			this.exists = function() {
				return typeof cxp_ic_control_data != "undefined"
			};
			this.getObject = function() {
				if (this.exists())
					return cxp_ic_control_data;
				else
					return []
			};
			this.getItem = function(c, b) {
				var a = this.exists() ? cxp_ic_control_data[c] : null;
				return a && a[b] ? a[b] : ""
			}
		}
	}, e = $cxp_ic.menu = new function() {
		var m = this, h = [
				'<div id="',
				"{ic_cntrlid}",
				'_highlight_tp"  class="cxp_ic_highlight cxp_ic_highlight_tp"></div>',
				'<div id="',
				"{ic_cntrlid}",
				'_highlight" class="cxp_ic_highlight" ><span class="cxp_ic_chevron"><img  src="',
				"{ic_imgbaseurl}",
				"{ic_iconmap}",
				'" ',
				'alt="i" ',
				"{ic_ie6_alpha_style_tag}",
				" /></span></div>",
				'<div id="',
				"{ic_cntrlid}",
				'_menu" class="cxp_ic_menu cxp_ic_menu_btm cxp_ic_menu_right" style="display:none;"></div>'], k = 0, e = f.MenuIndex, q = d.ControlData, o = f.ControlDataIndex, i = null;
		this.dispose = function() {
			h = e = i = null;
			m = null
		};
		var n = function(e) {
			var k = a.$(e, "usertilecontainer"), n = k.className
					.indexOf("cxp_ic_img_xl") >= 0 ? "xl" : "", o = c.isIE6()
					&& typeof uxp_p == "undefined" ? "8" : "24", l = [
					"iciconmap", n, o, ".png"].join("");
			h[1] = h[4] = h[13] = e;
			h[6] = d.CommonData.getItem("imgbaseurl");
			if (c.isIE6() && typeof uxp_p != "undefined") {
				h[7] = "cb.gif";
				h[10] = [
						"style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",
						d.CommonData.getItem("imgbaseurl"), l, "')\" "]
						.join("")
			} else {
				h[7] = l;
				h[10] = ""
			}
			var f = document.createElement("div");
			f.innerHTML = h.join("");
			while (f.firstChild)
				if (j(e) && f.firstChild.id == [e, "_menu"].join(""))
					u().appendChild(f.firstChild);
				else
					k.appendChild(f.firstChild);
			if (c.isIE6_RTL())
				k.innerHTML += '<div style="filter:alpha(opacity = 25);position: absolute;"></div>';
			var i = a.$(e, "highlight_tp"), m = a.$(e, "frame_clip");
			m.style.outline = "none";
			i.setAttribute("title", m.title);
			var g = $cxp_ic.ic;
			b.addEvent(i, "mouseover", g.focus);
			b.addEvent(i, "mouseout", g.blur);
			b.addEvent(i, "click", g.click);
			b.removeEvent(a.$(e, "frame"), "mouseover", g.focus);
			if (typeof uxp_p != "undefined")
				b.removeEvent(a.$(e, "usertile"), "mouseover", g.focus)
		};
		this.showHighlight = function(c) {
			var b = a.$(c, "highlight");
			if (!b)
				n(c);
			else
				b.style.display = "block"
		};
		this.hideHighlight = function(c) {
			var b = a.$(c, "highlight");
			if (b)
				b.style.display = "none"
		};
		this.show = function(b, g, f) {
			var d = a.$(b, "menu");
			if (!d) {
				n(b);
				d = a.$(b, "menu")
			}
			if (!a.$(b, "menu_ul"))
				y(b);
			d.style.display = "block";
			a.$(b, "highlight").style.display = "block";
			if (!j(b)) {
				var e = a.$(b, "usertilecontainer");
				e.parentNode.style.zIndex = 50;
				if (!c.isIE6_RTL())
					e.style.zIndex = 50
			}
			m.dock(b, d, g, f);
			v(b);
			m.adjustShadow(b)
		};
		this.hide = function(b) {
			a.$(b, "menu").style.display = "none";
			a.$(b, "highlight").style.display = "none";
			if (!j(b)) {
				var d = a.$(b, "usertilecontainer");
				d.parentNode.style.zIndex = 0;
				if (!c.isIE6_RTL())
					d.style.zIndex = 0
			}
		};
		var j = function(a) {
			return q.getItem(a, o.attachmenutobody) == "1"
		}, z = function(a) {
			a = a || event;
			i = a.shiftKey
		}, w = function(h) {
			var g = b.eventTarget(h), c, d;
			if (!i) {
				var f = g.parentNode.nextSibling;
				if (!f || f && f.style.display == "none" && !f.nextSibling) {
					c = $cxp_ic.ic.getActiveIcId();
					d = a.$(c, "name") || a.$(c, "frame_clip")
				}
			} else {
				var e = g.parentNode.previousSibling;
				if (!e || e && e.style.display == "none" && !e.previousSibling) {
					c = $cxp_ic.ic.getActiveIcId();
					d = a.$(c, "frame_clip")
				}
				i = null
			}
			if (d) {
				$cxp_ic.ic.hideActiveIc();
				d.focus()
			}
		};
		this.dock = function(g, e, w, A) {
			if (!e) {
				e = a.$(g, "menu");
				if (!e)
					return
			}
			var r = c.direction, n, h;
			if (w) {
				var l = b.clientX(w), v = b.clientY(w), y = b.clientHeight(), u = b
						.clientWidth();
				if (!A) {
					n = v + 200 > y ? y - (v + 150) < v - 150 : false;
					if (r == "left")
						h = l + 200 > u ? u - (l + 150) < l - 150 : false;
					else
						h = l - 200 < 0 ? l - 150 < u - (l + 150) : false
				} else {
					n = false;
					h = false
				}
			}
			if (!j(g)) {
				var f = e.className;
				f = n ? f.replace("btm", "top") : f.replace("top", "btm");
				f = h ? f.replace("right", "left") : f.replace("left", "right");
				e.className = f
			} else {
				var m = a.$(g, "highlight"), z = a.$(g, "usertilecontainer"), d = document
						.getElementById(g), p = d.offsetLeft, i = d.offsetTop;
				while (d = d.offsetParent) {
					p += d.offsetLeft;
					i += d.offsetTop
				}
				if (c.isIE7()) {
					if (k == 0)
						x();
					p = Math.round(p / k);
					i = Math.round(i / k)
				}
				if (c.isIE() && q.getItem(g, o.placedintable) == "1") {
					d = a.$(g, "pos_ref");
					i = d.offsetTop + 1 + (c.isIE6() ? 1 : 0);
					while (d = d.offsetParent)
						i += d.offsetTop
				}
				var s = p + z.offsetLeft + m.offsetLeft, t = i + m.offsetTop
						+ m.offsetHeight;
				if (r == "left" && h || r == "right" && !h)
					s = s - (e.offsetWidth - m.offsetWidth);
				if (n)
					t = t - m.offsetHeight - e.offsetHeight;
				e.style.left = s + "px";
				e.style.top = t + "px"
			}
		};
		var u = function() {
			var a = document.getElementById("cxp_ic_menus");
			if (!a) {
				a = document.createElement("div");
				a.id = "cxp_ic_menus";
				document.body.insertBefore(a, document.body.firstChild)
			}
			return a
		}, y = function(c) {
			var b, d;
			b = document.createElement("ul");
			b.className = "c_m";
			b.setAttribute("id", [c, "_menu_ul"].join(""));
			d = s(c, b);
			t(c, b, d);
			a.$(c, "menu").appendChild(b)
		}, s = function(b, K) {
			var y, H, A, s, n, t, B, x, u, D, F, z, w, c, L, m, J, E, C, I, N, o, i = d.ControlData, j = f.ControlDataIndex, k = d.CommonData, M = parseInt(k
					.getItem("max_name"))
					|| -1;
			if (typeof cxp_ic_menu_data != "undefined") {
				y = i.getItem(b, j.menudefault) || [];
				H = i.getItem(b, j.cid);
				D = i.getItem(b, j.address);
				N = i.getItem(b, j.deccid);
				z = i.getItem(b, j.contactid);
				L = i.getItem(b, j.membername);
				w = i.getItem(b, j.name);
				E = document.createElement("span");
				E.innerHTML = w;
				C = E.innerHTML;
				J = M > 0 && C.length > M;
				for (var G = 0; G < y.length; ++G) {
					m = y[G];
					s = cxp_ic_menu_data[m];
					if (!s)
						continue;
					c = s[e.text];
					if (m == "tp") {
						if (w.length <= 0 || J)
							c = k.getItem(m + "_no_name");
						c = c.replace("{name}", w)
					}
					I = k.getItem("ru");
					F = s[e.itemid];
					n = t = A = "";
					u = B = false;
					o = "_top";
					var h = i.getItem(b, j.actiontypeurloverride);
					h = !h || !h[m] ? s[e.url] : h[m];
					try {
						switch (m) {
							case "tp" :
							case "pr" :
							case "gr" :
							case "ev" :
							case "ph" :
								n = h.replace("{cid}", H);
								break;
							case "ct" :
								n = h.replace("{contactid}", z);
								o = null;
								break;
							case "se" :
								n = h.replace("{address}", D).replace("{ru}",
										encodeURIComponent(I));
								o = null;
								break;
							case "sm" :
								n = h.replace("{address}", N).replace("{ru}",
										encodeURIComponent(I));
								break;
							case "si" :
								A = [b, "_menu_si"].join("");
								c += ['&nbsp;<span id="', b,
										'_menu_si_pr_t">{0}</span>'].join("");
								if (!g.isAvailableForIC(b)) {
									B = true;
									c = c.replace("{0}", "")
								} else {
									var v = a.$(b, "frame").className, q = "";
									if (v.indexOf("green") >= 0)
										q = k.getItem("p_av");
									else if (v.indexOf("orange") >= 0)
										q = k.getItem("p_aw");
									else if (v.indexOf("red") >= 0)
										q = k.getItem("p_b");
									else if (v.indexOf("blue") >= 0)
										q = k.getItem("p_off");
									c = c.replace("{0}", q)
								}
								t = l("sendim", {
											membername : L
										});
								o = null;
								break;
							case "c4" :
							case "c3" :
							case "c2" :
							case "c1" :
								u = true;
								t = l("invite", {
											inviteUrl : h,
											cid : H,
											email : D,
											cnid : z,
											name : C,
											icid : b
										});
								o = null
						}
					} catch (O) {
						n = "";
						F = ""
					}
					if (u)
						x = p(K, null, [b, "_menu_inviteSeparator"].join(""));
					r(K, u ? null : x, A, c, n, t, F, B, o)
				}
			}
			return x
		}, l = function(c, a) {
			var b = d.CommonData;
			switch (c) {
				case "invite" :
					return function() {
						var d = ["0x", a.cid].join(""), f = "0", e = "cid";
						if (a.cid == "0000000000000000")
							if (a.cnid && a.cnid != "") {
								d = a.cnid;
								f = "2";
								e = "cnid"
							} else {
								d = a.email;
								f = "1";
								e = "email"
							}
						if (typeof $sn_invite_popover != "undefined")
							$sn_invite_popover.show(d, f, a.name, a.icid);
						else
							try {
								var c = a.inviteUrl;
								c = [c, "&", e, "=", encodeURIComponent(d)]
										.join("");
								c = c.replace("{name}",
										encodeURIComponent(a.name)).replace(
										"{vcid}", b.getItem("vcid")).replace(
										"{scxt}", b.getItem("socialcontext"))
										.replace(
												"{ru}",
												encodeURIComponent(b
														.getItem("ru")));
								window.location = c
							} catch (g) {
							}
						return false
					};
				case "sendim" :
					return function() {
						g.startIM(a.membername);
						return false
					};
				case "customonclick" :
					return function() {
						try {
							$cxp_ic.scoped_eval(a)
						} catch (b) {
							return false
						}
					}
			}
		}, t = function(j, h, g) {
			var c, a, b, i;
			c = d.ControlData.getItem(j, f.ControlDataIndex.menucustom);
			while (c.length > 0) {
				a = c.shift();
				b = null;
				if (a[e.text] && a[e.text] == "cxp_ic_menu_separator")
					p(h, g);
				else {
					if (a[e.callback]) {
						b = a[e.callback];
						if (typeof b == "string")
							b = l("customonclick", b)
					}
					if (cxp_ic_menu_data["mc"])
						i = cxp_ic_menu_data["mc"][e.itemid];
					r(h, g, null, a[e.text], a[e.url], b, i, null, a[e.target])
				}
			}
		}, r = function(h, g, l, k, d, e, j, m, i) {
			var c, a, f;
			if (e && !d) {
				d = "#";
				f = "return false;"
			}
			if (k && (d || e)) {
				c = document.createElement("li");
				a = document.createElement("a");
				if (l)
					c.setAttribute("id", l);
				if (d) {
					a.setAttribute("href", d);
					if (f)
						a.setAttribute("onclick", f);
					if (i)
						a.setAttribute("target", i)
				}
				if (j)
					b.addEvent(a, "click", function() {
								var a = new Image;
								a.src = j
							});
				if (e)
					b.addEvent(a, "click", e);
				a.innerHTML = k;
				if (m)
					c.style.display = "none";
				c.appendChild(a);
				if (g)
					h.insertBefore(c, g);
				else
					h.appendChild(c);
				b.addEvent(a, "keydown", z);
				b.addEvent(a, "blur", w)
			}
			return c
		}, p = function(c, b, d) {
			var a = document.createElement("li");
			if (d)
				a.setAttribute("id", d);
			a.innerHTML = '<div class="c_ms">&nbsp;</div>';
			a.className = "cxp_ic_menu_separator";
			if (b)
				c.insertBefore(a, b);
			else
				c.appendChild(a);
			return a
		}, v = function(c) {
			if (!a.$(c, "menu_shadow")) {
				var b = document.createElement("div");
				b.className = "cxp_ic_menu_shadow";
				b.id = [c, "_menu_shadow"].join("");
				a.$(c, "menu").appendChild(b)
			}
		};
		this.adjustShadow = function(d, f, e) {
			var c = f || a.$(d, "menu_ul"), b = e || a.$(d, "menu_shadow");
			if (c && b) {
				b.style.width = c.offsetWidth - 2 + "px";
				b.style.height = c.offsetHeight - 4 + "px"
			}
		};
		var x = function() {
			var a = document.createElement("div");
			a.id = "ic_zd";
			a.style.visibility = "hidden";
			a.style.position = "absolute";
			a.style.width = "0px";
			a.style.height = "0px";
			a.style.left = "20px";
			a.style.top = "20px";
			document.body.appendChild(a);
			var b = a.offsetTop;
			k = b / 20
		}
	};
	$cxp_ic.ic = new function() {
		var h = this, c = null, l = [], j = null, i = null;
		this.init = function() {
			if (d.ControlData.exists()) {
				if (h.load)
					return;
				h.load = "started";
				h.bind();
				h.load = "finished"
			}
		};
		this.reinit = function() {
			if (d.ControlData.exists()) {
				a.clear();
				h.bind()
			}
		};
		this.dispose = function() {
			try {
				d.dispose();
				g.dispose();
				e.dispose();
				a.dispose();
				b.removeAllEvents();
				c = j = i = h = l = null
			} catch (f) {
			}
		};
		this.getActiveIcId = function() {
			return c
		};
		this.bind = function() {
			var c, q, j, o, p, t, n = $cxp_ic.ItemType, e = d.ControlData, i = f.ControlDataIndex, l = d.Itemid_Element_Map, r = d.Cid_Icid_Map;
			t = document.getElementById("cxp_ic_usertiles");
			for (c in d.ControlData.getObject()) {
				if (!document.getElementById(c))
					continue;
				if (e.getItem(c, i.showmenu) == "1") {
					q = a.$(c, "frame");
					if (!q)
						continue;
					j = a.$(c, "frame_clip");
					b.addEvent(q, "mouseover", h.focus, true);
					if (typeof uxp_p != "undefined") {
						var s = a.$(c, "usertile");
						b.addEvent(s, "mouseover", h.focus, true)
					}
					b.addEvent(j, "focus", h.focus);
					b.addEvent(j, "keydown", h.keyDown);
					b.addEvent(j, "blur", h.blur);
					b.addEvent(j, "click", h.click);
					j.setAttribute("href", "#");
					j.onclick = null;
					p = e.getItem(c, i.menucustom);
					for (o = 0; o < p.length; ++o)
						l.add(p[o][f.MenuIndex.itemid], n.MenuCustom, [c, "_",
										o].join(""))
				} else {
					l.add(e.getItem(c, i.tileitemid), n.Tile, a.$(c,
									"frame_clip"));
					if (typeof uxp_p != "undefined")
						l.add(e.getItem(c, i.tileitemid), n.Tile, a.$(c,
										"usertile"))
				}
				r.add(e.getItem(c, i.cid), c);
				g.register(e.getItem(c, i.membername), c);
				l.add(e.getItem(c, i.nameitemid), n.Name, a.$(c, "name"));
				l.add(e.getItem(c, i.psmitemid), n.Message, a.$(c, "psm"))
			}
			b.addEvent(document, "click", k);
			b.addEvent(window, "resize", m);
			if (!g.isWebMsgr())
				g.start();
			b.addEvent(window, "unload", h.dispose, false)
		};
		this.hideActiveIc = function() {
			k()
		};
		this.click = function(a) {
			n(a)
		};
		this.focus = function(a) {
			o(a)
		};
		this.blur = function(a) {
			p(a)
		};
		this.keyDown = function(a) {
			a = a || event;
			j = a.shiftKey;
			i = true
		};
		var m = function() {
			if (c)
				e.dock(c)
		}, n = function(f) {
			var d = a.getIcIdFromTarget(f), g = c == d;
			if (d == "")
				return;
			k();
			if (!g) {
				e.show(d, f, i);
				c = d
			}
			b.stopEvent(f);
			b.stopEventAction(f);
			i = false
		}, o = function(f) {
			var b = a.getIcIdFromTarget(f);
			if (b == "")
				return;
			var d;
			while (d = l.pop()) {
				if (c && c == d)
					continue;
				e.hideHighlight(d)
			}
			e.showHighlight(b);
			l.push(b)
		}, p = function(f) {
			var b = a.getIcIdFromTarget(f);
			if (b == "")
				return;
			if (c && c == b) {
				if (f.type == "blur") {
					if (j) {
						k();
						j = null
					} else {
						var d = a.$(b, "menu_ul").getElementsByTagName("a");
						if (d && d.length > 0)
							d[0].focus()
					}
					return
				}
			} else
				e.hideHighlight(b)
		}, k = function() {
			if (c) {
				e.hide(c);
				c = null
			}
		}
	}
};
$cxp_ic_f();
$cxp_ic.ic.init();
window.$sn_invite_popover = window.$sn_invite_popover || function() {
	return {
		show : function(f, d, e, a, b) {
			m_attachElName = a;
			var c = {
				screenID : "0",
				ID : f,
				IDType : d,
				displayName : e,
				isSocialContext : sn_invite_common_data.isSocialContext,
				appMessage : b
			};
			$sn_invite_helper.makeRequest(c, true, a)
		},
		send : function(n, l, m, h, k, i, g, f, c, e) {
			var b = "";
			for (var a = c.length; a--;) {
				var d = c[a];
				b += d.name.encodeHtml() + "<" + d.id.encodeHtml()
						+ (a != 0 ? "<" : "")
			}
			var j = {
				screenID : "1",
				ID : n,
				IDType : l,
				displayName : m,
				firstName : h,
				lastName : k,
				isProfile : i,
				isPresense : g,
				message : f,
				categories : b,
				profileUpsell : e
			};
			$sn_invite_helper.makeRequest(j, false)
		},
		hide : function() {
			$sn_invite_helper.hidePopover()
		},
		update : function() {
		}
	}
}();
window.$sn_invite_helper = window.$sn_invite_helper || function() {
	var a, b;
	function e() {
		a = null;
		return true
	}
	function c(g, i) {
		if (a)
			a.hide();
		var c = new $UI.Popover, d = document.createElement("div");
		d.innerHTML = g;
		var f = false;
		if (i) {
			d.className += " LargeText";
			c.addButton("OK", sn_invite_common_data.okStr, true, true)
		} else {
			if (!a)
				f = true;
			c.bodyPadding = false
		}
		a = c;
		a.modal = true;
		a.showHeader = false;
		a.width = 400;
		a.shadow = true;
		a.body = d;
		var h = b ? document.getElementById(b) : null;
		a.show(e, h);
		if (f)
			a.hide()
	}
	function d(b) {
		if (b && b.readyState == 4)
			if (b.status == 200)
				c(b.responseText);
			else if (a)
				c(sn_invite_common_data.errorStr, true)
	}
	return {
		getAttachElName : function() {
			return b
		},
		makeRequest : function(a, h, i) {
			b = i || b;
			if (h)
				c(sn_invite_common_data.loadingStr, true);
			var e = "dc=" + sn_invite_common_data.dc.encodeURIComponent();
			for (var g in a) {
				var f = a[g];
				if (f)
					e += "&" + g + "=" + f.toString().encodeURIComponent()
			}
			$Network.fetchXML(sn_invite_common_data.handlerUrl, d, "POST", e, {
						"Content-type" : "application/x-www-form-urlencoded"
					})
		},
		hidePopover : function() {
			if (a) {
				a.hide();
				a = null
			}
		}
	}
}();
registerNamespace("Live_CommentControl");
Live_CommentControl.focus = function(d) {
	var a = _ge("sn_ccText" + d);
	if (a) {
		var b = Live_CommentControl._getRte(a);
		if (b)
			b.Redisplay();
		else {
			function c() {
				try {
					a.focus()
				} catch (b) {
				}
			}
			setTimeout(c, 0)
		}
	}
};
Live_CommentControl._getRte = function(a) {
	var c = null;
	if (a.webBindings && a.webBindings.length > 0)
		for (var b = 0; b < a.webBindings.length; b++)
			if (a.webBindings[b].getType() == "$UI.Editor")
				c = a.webBindings[b];
	return c
};
Live_CommentControl._Error = {
	Delete : "delete",
	PleaseWait : -2,
	Empty : -1,
	None : 0,
	GeneralError : 1,
	CommentTooLong : 2,
	ManagedAsk : 3,
	Managed : 4,
	AbuseDisallowed : 5,
	AbuseBanned : 6,
	AbuseHip : 7
};
Live_CommentControl.AddComment = function(id, PrePostFunction) {
	var params = {}, elContentBox = _ge("sn_ccText" + id), hasRTE = Live_CommentControl
			._RecopyRTE(elContentBox), content = elContentBox.value, maxlength = elContentBox
			.getAttribute("maxlength"), canPost, additionalParams;
	if (Live_CommentControl._State && Live_CommentControl._State.inProgress)
		canPost = false;
	else if (Live_CommentControl._EmptyTest(content, hasRTE))
		Live_CommentControl._DisplayErr(id, Live_CommentControl._Error.Empty);
	else if (content.length > maxlength)
		Live_CommentControl._DisplayErr(id,
				Live_CommentControl._Error.CommentTooLong);
	else if (PrePostFunction) {
		var returnVal = eval(PrePostFunction);
		canPost = returnVal.CanPost;
		additionalParams = returnVal.AdditionalParams
	} else
		canPost = true;
	if (canPost) {
		var htype = _ge("sn_ccHType" + id).value;
		if (!hasRTE)
			params["htype"] = "Plaintext";
		else
			params["htype"] = htype;
		params["content"] = content;
		params["method"] = "Add";
		params["cnsid"] = _ge("sn_ccParentId" + id).value;
		params["can"] = _ge("sn_ccCan" + id).value;
		var elHipInput = _ge("sn_hipInput");
		if (elHipInput)
			params["hiptext"] = elHipInput.value;
		Live_CommentControl._Post(id, Live_CommentControl._MergeParams(
						additionalParams, params), params["method"])
	}
};
Live_CommentControl._EmptyTest = function(b, d) {
	var c;
	if (d) {
		var a = document.createElement("div");
		a.innerHTML = b;
		var c = 0 != a.innerText.trim().length
				|| 0 != a.getElementsByTagName("IMG").length
				|| 0 != a.getElementsByTagName("EMBED").length;
		a.innerHTML = ""
	} else
		c = b != null && b.trim().length != 0;
	return !c
};
Live_CommentControl._DisplayErr = function(a, c) {
	var m = _ge("sn_ccErrEmpty" + a), k = _ge("sn_ccErrLong" + a), i = _ge("sn_ccAddErrManaged"
			+ a), h = _ge("sn_ccAddErrManagedAsk" + a), j = _ge("sn_ccAddErrGeneral"
			+ a), l = _ge("sn_ccDeleteErr" + a), f = _ge("sn_ccWait" + a), d = _ge("sn_ccAbuseNo"
			+ a), e = _ge("sn_ccAbuseBan" + a), g = _ge("sn_ccAbuseHip" + a), b = c;
	if (c == Live_CommentControl._Error.ManagedAsk) {
		h.style.display = "";
		b = false
	} else
		h.style.display = "none";
	if (c == Live_CommentControl._Error.Managed) {
		i.style.display = "";
		b = false
	} else
		i.style.display = "none";
	if (c == Live_CommentControl._Error.Delete) {
		l.style.display = "";
		b = false
	} else
		l.style.display = "none";
	if (c == Live_CommentControl._Error.Empty) {
		m.style.display = "";
		b = false
	} else
		m.style.display = "none";
	if (c == Live_CommentControl._Error.CommentTooLong) {
		k.style.display = "";
		b = false
	} else
		k.style.display = "none";
	if (c == Live_CommentControl._Error.PleaseWait) {
		f.style.display = "";
		b = false;
		var n = _ge("sn_ccHip" + a);
		if (n)
			n.style.display = "none"
	} else
		f.style.display = "none";
	if (c == Live_CommentControl._Error.AbuseDisallowed) {
		d.style.display = "";
		b = false
	} else
		d.style.display = "none";
	if (c == Live_CommentControl._Error.AbuseBanned) {
		e.style.display = "";
		b = false
	} else
		e.style.display = "none";
	if (c == Live_CommentControl._Error.AbuseHip) {
		g.style.display = "";
		b = false
	} else
		g.style.display = "none";
	if (b)
		j.style.display = "";
	else
		j.style.display = "none"
};
Live_CommentControl.DeleteComment = function(index, id, PrePostFunction,
		promptstr) {
	var canPost = true, additionalParams;
	if (Live_CommentControl._State && Live_CommentControl._State.inProgress)
		canPost = false;
	else if (PrePostFunction) {
		var returnVal = eval(PrePostFunction);
		canPost = returnVal.CanPost;
		additionalParams = returnVal.AdditionalParams
	} else
		canPost = true;
	if (canPost) {
		var okToDelete = confirm(promptstr);
		if (okToDelete) {
			var params = {};
			params["method"] = "Delete";
			params["cnsid"] = document.getElementById("sn_ccId" + id + index).value;
			params["can"] = document.getElementById("sn_ccCan" + id).value;
			Live_CommentControl._Post(id, Live_CommentControl._MergeParams(
							additionalParams, params), params["method"])
		}
	}
};
Live_CommentControl._MergeParams = function(d, e) {
	var b = {}, c = "";
	if (e)
		for (var a in e)
			b[a] = e[a];
	if (d)
		for (var a in d)
			b[a] = d[a];
	for (var a in b) {
		var f = "";
		if (c)
			f = "&";
		c += f + a + "=" + (b[a] + "").encodeURIComponent()
	}
	return c
};
Live_CommentControl._PostResponse = function(c) {
	var b = Live_CommentControl._Error.GeneralError, g, h, f = false;
	try {
		f = c && c.status == 200
	} catch (n) {
		f = false
	}
	if (f)
		if (c.responseText && c.responseText.length > 0) {
			var d = c.responseText.split("#", 4);
			b = parseInt(d[0]);
			if (d.length >= 3 && d.length <= 5) {
				g = d[1].replace(/\*2/g, "#").replace(/\*1/g, "*");
				h = d[2].replace(/\*2/g, "#").replace(/\*1/g, "*")
			}
			if (isNaN(b))
				b = Live_CommentControl._Error.GeneralError
		}
	if (Live_CommentControl._State.method == "Add") {
		if (b == Live_CommentControl._Error.AbuseHip)
			if (!g || !h)
				b = Live_CommentControl._Error.GeneralError;
			else {
				var l = document.getElementById("sn_ccHip"
						+ Live_CommentControl._State.id);
				l.style.display = "";
				l.innerHTML = g;
				$newScript(h)
			}
	} else if (b)
		b = Live_CommentControl._Error.Delete;
	if (b) {
		Live_CommentControl._DisplayErr(Live_CommentControl._State.id, b);
		Live_CommentControl._State.inProgress = false
	} else {
		function k(a) {
			return a.toUpperCase().replace(new RegExp("/", "g"), "").replace(
					new RegExp("\\\\", "g"), "")
		}
		var a = _ge("sn_ccPRet" + Live_CommentControl._State.id).value;
		if (k(a).indexOf(k(location.pathname)) >= 0) {
			var j = Math.floor(Math.random() * 1e4), m = /([\?\&]ccr=)[^\?\&\#]*/;
			if (m.test(a))
				a = a.replace(m, "$1" + j);
			else {
				var e;
				if (a.indexOf("?") >= 0)
					e = "&ccr=" + j;
				else
					e = "?ccr=" + j;
				var i = a.indexOf("#");
				if (i == -1)
					a = a += e;
				else
					a = a.substring(0, i) + e + a.substring(i, a.length)
			}
		}
		location.href = a
	}
};
Live_CommentControl._Post = function(a, c, e) {
	Live_CommentControl._State = {
		inProgress : true,
		id : a,
		method : e
	};
	Live_CommentControl._DisplayErr(a, Live_CommentControl._Error.PleaseWait);
	var d = document.getElementById("sn_ccPostUrl" + a).value, b = {};
	b["Content-Type"] = "application/x-www-form-urlencoded";
	$Network.fetchXML(d, Live_CommentControl._PostResponse, "POST", c, b)
};
Live_CommentControl._RecopyRTE = function(b) {
	var a;
	a = Live_CommentControl._getRte(b);
	if (a) {
		b.value = a.getValue();
		return true
	}
	return false
};
function registerNamespace() {
	for (var d = 0; d < arguments.length; d++) {
		var c = window, b = arguments[d].split(".");
		for (var a = 0; a < b.length; a++) {
			if (!c[b[a]])
				c[b[a]] = {};
			c = c[b[a]]
		}
	}
}
registerNamespace("Spaces");
Spaces.Cookie = {
	_strDomain : "." + document.domain.split(".").slice(-3).join("."),
	WriteCookie : function(f, c, b, d, g, e) {
		var a = f;
		if (c)
			a += "=" + escape(c);
		if (b)
			a += ";expires=" + b;
		a += ";domain=" + (d || Spaces.Cookie._strDomain);
		a += ";path=" + (g || "/");
		if (e)
			a += ";secure";
		document.cookie = a
	},
	ReadCookie : function(c) {
		var b = document.cookie.split(";");
		for (var a = 0; a < b.length; a++) {
			b[a] = b[a].replace(/^\s+|\s+$/g, "");
			if (0 == b[a].indexOf(c + "="))
				return unescape(b[a].substr(c.length + 1))
		}
		return null
	}
};
Spaces.IsRTL = function() {
	if (!document.body) {
		if ("undefined" != typeof $Debug && $Debug.ASSERT)
			;
		return false
	}
	var a = "rtl" == (document.body.currentStyle
			? document.body.currentStyle.direction
			: document.defaultView.getComputedStyle(document.body, "").direction);
	Spaces.IsRTL = function() {
		return a
	};
	return a
};
Spaces.WriteWmpObject = function() {
	document
			.write('<object width="100%" classid="clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6" id="PTMediaPlayer">')
};
Spaces.attachElementBindingSync = function(f, c, e, d, b) {
	var h = Object, g = h.resolve(c), a = new g(f, d, b);
	a.initialize(e);
	return a
};
PathUtility = new function() {
	this.MapPathType = {};
	this.MapPathType.Image = "image";
	this.MapPathType.Css = "css";
	this.MapPathType.Script = "script";
	this.MapPathType.XML = "xml";
	this.MapPathServerType = {};
	this.MapPathServerType.SpacesWeb = "SpacesWeb";
	this.MapPath = function(d, f, c, e) {
		var b = null;
		if (e != null)
			b = e.toLowerCase();
		var a;
		switch (d.toString()) {
			case this.MapPathType.Image.toString() :
				a = C_STATIC_IMAGES_URL;
				break;
			default :
				a = C_STATIC_CONTENT_URL
		}
		switch (f.toString()) {
			case this.MapPathServerType.SpacesWeb.toString() :
				a += "Web";
				break;
			default :
				alert("Unexpected MapPathServerType")
		}
		if (c != null) {
			if (c != "" || c[0] != "/")
				a += "/";
			a += c
		}
		if (a[a.length - 1] != "/")
			a += "/";
		switch (d.toString()) {
			case this.MapPathType.Image.toString() :
				a += "images";
				if (Spaces.IsRTL())
					a += "/rtl";
				break;
			case this.MapPathType.Css.toString() :
				a += "css";
				break;
			case this.MapPathType.Script.toString() :
				a += "script";
				break;
			case this.MapPathType.XML.toString() :
				a += "xml"
		}
		if (b == null || b.length == 0 || b[0] != "/")
			a += "/";
		if (b != null)
			a += b;
		return a
	};
	this.GetFetchUrlService = function(c, b) {
		var a = C_FETCH_URL_SERVICE.format(b, c.encodeURI());
		if ($Request.extractHost(C_FETCH_URL_SERVICE)
				.indexOf(document.location.host) == 0)
			return a + "&nocache=" + Math.random();
		else
			return this.GetProxyUrlService(a) + "&nocache=" + Math.random()
	};
	this.GetProxyUrlService = function(a) {
		return $Request.extractHost(document.location, true) + "/pr.aspx?url="
				+ a.encodeURI()
	}
};
var _de = document.documentElement, _deScr = $Browser.isSafari()
		? document.body
		: document.documentElement;
window.Function.KillEvent = function() {
	event.cancelBubble = true;
	event.returnValue = false;
	return false
};
registerNamespace("$UI");
$UI.Dialog = function(m) {
	var z = document.body.className.indexOf("rtl") > -1, c, f, t = this, e = new $Memory.Groups, a = null, l = null, i = null, p = null, s = document.body, g, j, B, d, u, h = null, b;
	function k() {
		if (c) {
			var a = c.style, b = $Browser._isIE && $Browser.version == 7
					? f.offsetLeft / 100
					: 1;
			a.width = _deScr.scrollWidth - 3 + "px";
			a.pixelTop = Math.max(0, _deScr.scrollTop / b);
			a.pixelHeight = _de.clientHeight / b
		}
	}
	function r() {
		var b;
		if (null != window["event"] && event.srcElement == g)
			b = o(a, j, false);
		else
			b = o(a, g, true);
		if (b)
			setTimeout(function() {
						try {
							b.focus()
						} catch (a) {
						}
					}, 0)
	}
	function o(b, a, c) {
		function g(a) {
			function c(a) {
				while (a && a.currentStyle && a.currentStyle.display != "none"
						&& a.currentStyle.visibility != "hidden")
					a = a.parentNode;
				if (!a || !a.currentStyle)
					return true;
				return false
			}
			var b = "BUTTON|TEXTAREA|FIELDSET|IFRAME|SELECT|";
			return a.tagName
					&& !a.disabled
					&& (b.indexOf(a.tagName + "|") > -1 || a.tagName == "A"
							&& a.href || a.tagName == "INPUT"
							&& (!$Browser.isMozilla() || a.type.toLowerCase() != "file")
							&& c(a))
		}
		function d(b) {
			if (!b)
				return null;
			var a = c ? b.nextSibling : b.previousSibling;
			while (a && a.nodeType != 1)
				a = c ? a.nextSibling : a.previousSibling;
			if (!a)
				return d(b.parentNode);
			else
				return a
		}
		function f(b, e) {
			var a = e;
			if (a && b.contains(a))
				while (a != null)
					if (!g(a))
						if (c && a.firstChild)
							a = a.firstChild;
						else if (!c && a.lastChild)
							a = a.lastChild;
						else
							a = d(a);
					else
						return a;
			return null
		}
		if (a)
			a = d(a);
		else
			a = b;
		var e = f(b, a);
		if (!e && a && a != b)
			return f(b, b);
		else
			return e
	}
	this.dispose = function() {
		if (h) {
			clearTimeout(h);
			h = null
		}
		if (e) {
			e.dispose();
			e = null
		}
		b = null;
		c = null;
		f = null;
		g = null;
		j = null
	};
	this.setContents = function(k) {
		e.create(null).dispose();
		var b = e.create(null);
		a = k;
		var h = a.parentNode;
		if (null == h || null == h.tagName) {
			s.appendChild(a);
			b.Nodes.register(a)
		}
		var f = {
			href : "#"
		}, c = {
			position : "absolute"
		}, d = $Browser.isSafari() ? "input" : "a";
		j = b.Nodes.create(d, f, c, a);
		g = b.Nodes.create(d, f, c);
		if ($Browser.isSafari())
			if (z)
				j.style.right = g.style.right = "10000px";
			else
				j.style.left = g.style.left = "-10000px";
		a.insertAdjacentElement("afterBegin", g);
		b.Events.register(j, {
					onfocus : r
				});
		b.Events.register(g, {
					onfocus : r
				});
		a.style.position = "absolute";
		if (!m && $Browser._isIE && $Browser.version <= 6) {
			l = new $UI.FramePopup;
			b.Properties.register(l);
			p = new $UI.FramePopup;
			b.Properties.register(p)
		}
		i = b.Nodes.create("div", {}, c, a.parentElement);
		i.className = "UI_Dialog_Shadow";
		y();
		return a
	};
	var n = function(c, d, b, a) {
		return {
			x : c,
			y : d,
			width : b,
			height : a,
			isEmpty : function() {
				return this.width <= 0 || this.height <= 0
			}
		}
	};
	function q(a) {
		if (!a)
			return new n(0, 0, 0, 0);
		return new n(a.offsetLeft, a.offsetTop, a.offsetWidth, a.offsetHeight)
	}
	this.recalc = function(g) {
		if (!a)
			return;
		if (h) {
			clearTimeout(h);
			h = null
		}
		k();
		var b = a.style, c = q(a);
		if (!c || c.isEmpty()) {
			var f = {
				visibility : a.currentStyle.visibility || b.visibility
						|| "visible",
				display : a.currentStyle.display || b.display || "auto"
			};
			b.visibility = "hidden";
			b.display = "block";
			c = q(a);
			b.display = f.display;
			b.visibility = f.visibility
		}
		if (!d)
			d = new n(0, 0, 0, 0);
		d.x = Math.max(_de.clientWidth / 2 - c.width / 2, 25);
		if (g) {
			var e = _de.clientHeight - c.height - 3;
			d.y = _deScr.scrollTop
					+ Math.min(Math.max(
									e > 200 ? e : (_de.clientHeight - c.height)
											/ 2, 0), 100)
		}
		d.height = c.height;
		d.width = c.width;
		b.pixelTop = d.y;
		b.pixelLeft = d.x;
		if (l)
			l.positionAt(d, 1e3);
		x(true)
	};
	function x(f) {
		var e = q(a).height;
		if (e != u || f) {
			var b = new n, c = i.style;
			c.width = (b.width = d.width) + "px";
			c.height = (b.height = e) + "px";
			c.left = (b.x = d.x + (z ? -3 : 3)) + "px";
			c.top = (b.y = d.y + 3) + "px";
			if (l)
				p.positionAt(b, 1e3);
			u = e
		}
		h = setTimeout(x, 25)
	}
	this.show = function() {
		i.style.backgroundColor = "#000";
		A(i, 30);
		t.recalc(true);
		a.style.display = "block";
		if (m) {
			var d = e.create("show");
			c = _ce("div");
			v();
			f = _ce("div");
			f.className = "UI_Dialog_ZoomTest";
			c.className = c.id = "UI_Dialog_BG";
			c.style.position = "absolute";
			s.appendChild(c);
			s.appendChild(f);
			var b = Function.KillEvent;
			d.Events.register(c, {
						onfocus : r,
						onclick : b,
						onmousedown : b,
						onkeydown : b,
						onkeypress : b,
						ondblclick : b
					});
			d.Events.register(window, {
						onresize : k,
						onfocus : b
					});
			d.Nodes.register(c);
			d.Nodes.register(f);
			k()
		}
		function g() {
			try {
				o(a).focus()
			} catch (b) {
			}
		}
		setTimeout(g, 10)
	};
	this.hide = function() {
		e.create("show").dispose();
		e.create("ext").dispose();
		if ($Browser._isIE && $Browser.version <= 6)
			if (b) {
				for (var a = 0; a < b.length; a++)
					if (typeof b[a].wlppHide != "undefined")
						b[a].style.visibility = b[a].wlppHide;
				b = null
			}
	};
	this.minimize = function() {
		i.style.display = "none";
		a.style.visibility = "hidden";
		if (m) {
			c.style.display = "none";
			f.style.display = "none";
			if (b)
				for (var d = 0; d < b.length; d++)
					b[d].style.visibility = b[d].wlppHide;
			k()
		}
	};
	this.restore = function() {
		i.style.display = "block";
		a.style.visibility = "visible";
		t.recalc(true);
		if (m) {
			c.style.display = "block";
			f.style.display = "block";
			v();
			k()
		}
	};
	function A(b, a) {
		var c = "undefined" == typeof b.style.filter ? "opacity" : "filter";
		b.style[c] = c == "filter" ? "alpha(opacity=" + a + ")" : .01 * a
	}
	function y() {
		e.create("ext").Events.register(window, {
					onresize : w,
					onscroll : w
				})
	}
	function w() {
		e.create("ext").dispose();
		t.recalc(false);
		y()
	}
	function v() {
		if ($Browser._isIE && $Browser.version <= 6) {
			b = document.getElementsByTagName("select");
			var e = a.getElementsByTagName("select");
			for (var c = 0; c < b.length; c++) {
				var f = false;
				for (var d = 0; d < e.length; d++)
					if (b[c] == e[d]) {
						f = true;
						break
					}
				if (!f) {
					b[c].wlppHide = b[c].style.visibility;
					b[c].style.visibility = "hidden"
				}
			}
		}
	}
};
$UI.Popover = function() {
	this.header = null;
	this.body = null;
	this.footerText = null;
	this.width = 300;
	this.bodyPadding = true;
	this.showHeader = true;
	this.showFooter = true;
	this.modal = false;
	this.addButton = function(e, c, a, b) {
		d.push({
					name : e,
					value : c,
					isDefault : a,
					isCancel : b
				})
	};
	this.show = function(u, t) {
		if (e)
			return;
		p = u;
		o = t;
		if (!a) {
			a = new $UI.Dialog(b.modal);
			c = _ce("div");
			c.style.display = "none";
			c.innerHTML = "<div><h3></h3></div><div></div><div><nobr></nobr></div>";
			a.setContents(c);
			r();
			c.className = "UI_Popover";
			var s = c.childNodes;
			h = s[1];
			i = s[2];
			g = s[3];
			n = h.firstChild;
			k = g.firstChild;
			h.className = " Header";
			i.className = " Body";
			g.className = " Footer";
			var m = b.width;
			c.style.width = parseInt(m, 10) == m ? m + "px" : m;
			q = null;
			j = null;
			f = [];
			for (var l = 0; l < d.length; l++)
				w(d[l].name, d[l].value, d[l].isDefault, d[l].isCancel);
			if (d.length == 0)
				b.showFooter = false;
			y()
		}
		a.show();
		e = true
	};
	this.hide = function() {
		if (!e)
			return;
		if (o)
			setTimeout(x, 10);
		try {
			l.dispose();
			m.dispose();
			a.hide();
			a.dispose()
		} catch (b) {
		}
		e = false;
		c = h = g = i = n = k = f = null
	};
	this.enableButton = function(a) {
		f[a].disabled = false
	};
	this.disableButton = function(a) {
		f[a].disabled = true
	};
	function x() {
		try {
			o.focus()
		} catch (a) {
		}
	}
	function r() {
		l.Events.register(this.modal ? document.body : c, $Browser.isSafari()
						? {
							onkeydown : u
						}
						: {
							onkeypress : u
						})
	}
	function v() {
		l.Events.dispose()
	}
	function w(b, g, c, e) {
		k.appendChild(document.createTextNode(" "));
		var d = _ce("div");
		d.innerHTML = '<button id="popover_btn_{0}" type="{1}" />'.format(b, c
						? "submit"
						: "button");
		var a = d.firstChild;
		m.Nodes.register(a);
		if (c) {
			a.className += "Default";
			q = b
		} else if (e)
			j = b;
		f[b] = a;
		a.innerHTML = "<nobr>" + g + "</nobr>";
		m.Events.register(a, {
					onclick : function(a) {
						s(b);
						a.returnValue = false
					}
				});
		k.appendChild(a)
	}
	function u(a) {
		switch (($Browser.isSafari() ? a : event).keyCode) {
			case 27 :
				s(j ? j : "$cancel")
		}
	}
	function s(c) {
		var a = true;
		if (p)
			a = p(b, c);
		if (a)
			b.hide();
		event.returnValue = false
	}
	function y() {
		function a(a, b) {
			if (a)
				if (typeof a == "string")
					b.innerHTML = a;
				else {
					b.innerHTML = "";
					b.appendChild(a)
				}
		}
		h.style.display = b.showHeader ? "block" : "none";
		g.style.display = b.showFooter ? "block" : "none";
		if (!b.bodyPadding)
			i.style.padding = "0";
		a(b.header, n);
		a(b.body, i)
	}
	this.recalc = function() {
		if (!e)
			return;
		if (a)
			a.recalc(false)
	};
	this.minimize = function() {
		if (!a || !e)
			return;
		a.minimize();
		v()
	};
	this.restore = function() {
		if (!a || !e)
			return;
		a.restore();
		r()
	};
	var e = false, a, b = this, h, i, g, n, k, q, j, t = new $Memory.Groups, m = t
			.create("show"), l = t.create("showHide"), f, c, d = [], p = null, o = null
};
$UI.FramePopup = function() {
	var d = this, a = new $Memory.Groups, b = {
		tabIndex : -1
	};
	if (location.protocol == "https:")
		if (!window.g_UI_FramePopupUrl)
			b.src = $Config.baseUrl + "empty.htm";
		else
			b.src = g_UI_FramePopupUrl;
	var c = a.create(null).Nodes.create("iframe", b, {
				position : "absolute",
				left : "0px",
				top : "0px",
				display : "block",
				width : "100%",
				height : "100%"
			}, document.body);
	this.dispose = function() {
		if (a) {
			a.dispose();
			a = null
		}
	};
	this.positionAt = function(b, d) {
		var a = c.style;
		a.pixelTop = b.y;
		a.pixelLeft = b.x;
		a.height = b.height;
		a.width = b.width;
		a.zIndex = d
	}
};
$Network.Fpp = function(p_strUrl, cfg) {
	var defaultRetry = 2, p_enumFlags = 0, oFppHeaders = {};
	oFppHeaders["Content-Type"] = "application/x-www-form-urlencoded";
	if (typeof cfg == "undefined")
		cfg = {};
	if (typeof cfg.ServerTunnelingUrl == "string"
			&& (typeof cfg.UseClientXmlProxy == "undefined" || cfg.UseClientXmlProxy == false))
		oFppHeaders["FPPRPURL"] = cfg.ServerTunnelingUrl;
	cfg.CommandType = cfg.CommandType || 0;
	cfg.Version = cfg.Version || 0;
	cfg.PartnerId = cfg.PartnerId || 0;
	cfg.SessionId = cfg.SessionId || "";
	if (Object.isNumber(cfg.DefaultRetry))
		defaultRetry = cfg.DefaultRetry;
	if (Object.isBoolean(cfg.Notify) && cfg.Notify)
		p_enumFlags = p_enumFlags | $Network.Flags.NOTIFY;
	if (Object.isBoolean(cfg.UseClientXmlProxy) && cfg.UseClientXmlProxy)
		p_enumFlags = p_enumFlags | $Network.Flags.CLIENTPROXY;
	if (Object.isBoolean(cfg.AllowDuplicate) && cfg.AllowDuplicate)
		p_enumFlags = p_enumFlags | $Network.Flags.DUPLICATE;
	oFppHeaders["X-FPP-Command"] = cfg.CommandType;
	function FppFinished(proxy, obj) {
		$Network.Events.onfinished.fire(obj);
		var pkg = {
			ErrorCode : 0,
			Context : obj.context,
			Proxy : proxy,
			Error : null
		};
		obj.bRetry = false;
		try {
			if (proxy == null)
				pkg.ErrorCode = -4;
			else if (proxy.statusText == null || proxy.statusText == "")
				pkg.ErrorCode = -5;
			else if (proxy.status != 200 && proxy.status != 500)
				pkg.ErrorCode = -7
		} catch (a) {
			pkg.ErrorCode = -5
		}
		if (pkg.ErrorCode != 0) {
			if (++obj.nRetry <= defaultRetry) {
				obj.bRetry = true;
				return
			}
			$Network.Events.onerror.fire(pkg);
			if (obj.cbErr)
				obj.cbErr(pkg.ErrorCode, pkg.Context, pkg.Proxy, pkg.Error)
		} else {
			try {
				var strUrl = proxy.getResponseHeader("FPPRPURL");
				if (strUrl != "" && strUrl != null)
					oFppHeaders["FPPRPURL"] = strUrl
			} catch (a) {
			}
			try {
				var oFppPkg;
				if (cfg.CommandType == 0)
					oFppPkg = eval(proxy.responseText);
				else if (cfg.CommandType == 1)
					oFppPkg = eval("(" + proxy.responseText + ")");
				$Network.Events.onprofile.fire(oFppPkg.ProfilingInfo);
				if (oFppPkg.Status == 0) {
					var arrArgs = oFppPkg.OutRefParams;
					arrArgs.unshift(obj.context);
					arrArgs.unshift(oFppPkg.Value);
					obj.callback.apply(null, arrArgs)
				} else {
					pkg.ErrorCode = oFppPkg.Status;
					pkg.Error = oFppPkg.Error;
					$Network.Events.onerror.fire(pkg);
					if (obj.cbErr)
						obj.cbErr(pkg.ErrorCode, pkg.Context, pkg.Proxy,
								pkg.Error)
				}
			} catch (a) {
				pkg.ErrorCode = -6;
				pkg.Error = a;
				if (++obj.nRetry <= defaultRetry) {
					obj.bRetry = true;
					return
				}
				$Network.Events.onerror.fire(pkg);
				if (obj.cbErr)
					obj.cbErr(pkg.ErrorCode, pkg.Context, pkg.Proxy, pkg.Error)
			}
		}
		obj.bRetry = false
	}
	this.invoke = function(b, e, f, p, d, n, o, i, a, h) {
		if (e == null || f == null || d == null)
			throw new Error("invalid arguments for $Network.Fpp");
		if (typeof d != "function")
			throw new Error("$Network.Fpp arg list mismatch:  cb must be of type function.");
		if (!h)
			h = Array.$Prioritizer.Priorities.High;
		var j = "cn=" + e + "&mn=" + f + "&d=" + p + "&v=" + cfg.Version, k, c, g = $Network.defaultTimeout, m = {
			context : n,
			callback : d,
			cbErr : o,
			bRetry : false,
			nRetry : 0,
			bSave : false
		}, l = p_strUrl.indexOf("?") > 0 ? "&" : "?";
		if (b == $Network.Type.XMLPost) {
			k = j;
			c = "{0}{1}cnmn={2}.{3}&ptid={4}&a={5}&au={6}".format(p_strUrl, l,
					e, f, cfg.PartnerId, cfg.SessionId, cfg.AuthUser)
		} else if (b == $Network.Type.XMLGet)
			c = "{0}{1}{2}&ptid={3}&a={4}&au={5}".format(p_strUrl, l, j,
					cfg.PartnerId, cfg.SessionId, cfg.AuthUser);
		if (a)
			$Network.abortGroup(a);
		if (i)
			g = i;
		return $Network.fetch(FppFinished, (new $Request(c, b, p_enumFlags, m))
						.setHeaders(oFppHeaders).setPostString(k).setTimeout(g)
						.setGroup(a).setCanary(cfg.CanaryToken))
	}
};
$Network.FppProxy = function(d) {
	var c = this, b, a;
	this.initialize = function(h, d, e, f, a, b) {
		var g = {
			Version : 0,
			CommandType : 0,
			PartnerId : d,
			SessionId : e,
			ServerTunnelingUrl : f,
			UseClientXmlProxy : a,
			CanaryToken : b
		};
		return c.initializeEx(h, g)
	};
	this.initializeEx = function(e, d) {
		b = new $Network.Fpp(e, d);
		a = d;
		return c
	};
	function f(e, b) {
		function c() {
			var c = {}, g = b.length;
			for (var f = 0; f < g; f++)
				c[b[f]] = arguments[f];
			c.toString = function(i) {
				var f = [];
				if (a.CommandType == 0 && i)
					f.push(d, ".", e, ":");
				f.push("{");
				for (var h = 0; h < g; h++) {
					if (a.CommandType == 1)
						f.push(	typeof b[h].toString() == "undefined"
										? b[h].type
										: b[h].toString(), ":");
					f.push(b[h].escape(c[b[h]], a.Version, a.CommandType == 0),
							",")
				}
				if (g > 0)
					f.pop();
				f.push("}");
				return f.join("")
			};
			c.__isFppObject = true;
			return c
		}
		return c
	}
	function e(f, c, e, g, d) {
		function h() {
			var j = [], i = c.length;
			for (var h = 0; h < i; h++) {
				if (a.CommandType == 1)
					j.push(	typeof c[h].toString() == "undefined"
									? c[h].type
									: c[h].toString(), ":");
				j.push(
						c[h]
								.escape(arguments[h], a.Version,
										a.CommandType == 0), ",")
			}
			if (i > 0)
				j.pop();
			return b.invoke(e || $Network.Type.XMLPost, d, f, j.join(""),
					arguments[i], arguments[i + 1], arguments[i + 2],
					arguments[i + 3], g)
		}
		return h
	}
	this.rfc = this.registerFppClass = function(a, b) {
		this[a] = f(a, b)
	};
	this.rfm = this.registerFppMethod = function(a, g, d, c, f, b) {
		this[a] = e(d || a, g, c || $Network.Type.XMLPost, f, b
						|| strDefaultNamespace)
	};
	this.seal = function() {
		this.rfc = this.registerFppClass = this.rfm = this.registerFppMethod = this.seal = null
	}
};
new function() {
	var a = $Network.FppProxy;
	a.TypeSystem = function(b, a) {
		this.toString = function() {
			return a
		};
		this.type = b;
		return this
	};
	a.dateToISO8601 = function(b) {
		var f = "{0}-{1}-{2}T{3}:{4}:{5}", e = b.getHours(), c = b.getMinutes(), d = b
				.getSeconds();
		if (e < 10)
			e = "0" + e;
		if (c < 10)
			c = "0" + c;
		if (d < 10)
			d = "0" + d;
		return a.escape(f.format(b.getFullYear(), b.getMonth() + 1,
				b.getDate(), e, c, d))
	};
	a.arrayToString = function(c, g, e) {
		var f = "";
		if (c == null)
			return f;
		if (Object.isArray(c)) {
			var b = [];
			b.push("[");
			for (var d = 0; d < c.length; d++) {
				b.push(a.objToStringImpl(c[d], g, e));
				b.push(",")
			}
			if (c.length > 0)
				b.pop();
			b.push("]");
			return b.join("")
		} else
			throw new Error("p_array = " + c + " is not an array");
	};
	a.escape = function(a, c) {
		if (a == null)
			return a;
		else {
			var b = "";
			if (c == 0)
				b = encodeURIComponent(a.toString().replace(
						/([\{|\}\[|\]\,\\])/g, "\\$1"));
			else
				b = encodeURIComponent(('"' + a.toString() + '"').replace(
						/([\{|\}\[|\]\,\\:])/g, "\\$1"));
			return b
		}
	};
	a.objToStringImpl = function(c, e, d) {
		var b = [];
		if (c == null || typeof c == "undefined") {
			if (d)
				b.push("null:");
			b.push("null")
		} else if (typeof c == "string") {
			if (d)
				b.push("System.String:");
			b.push(a.escape(c, e))
		} else if (c.constructor._typeName == "Date") {
			if (d)
				b.push("System.DateTime:");
			b.push(a.dateToISO8601(c))
		} else if (Object.isArray(c)) {
			if (d)
				b.push("System.Array:");
			b.push(a.arrayToString(c, e, d))
		} else if (typeof c == "object")
			if (c.__isFppObject == true)
				b.push(c.toString(d));
			else {
				if (d)
					b.push("System.Collections.Hashtable:");
				b.push(a.objToString(c, e, d))
			}
		else {
			if (d)
				b.push("System.String:");
			b.push(c.toString())
		}
		return b.join("")
	};
	a.objToString = function(c, e, f) {
		var b = ["{"];
		for (var d in c)
			b.push(a.escape(d, e), ":", a.objToStringImpl(c[d], e, f), ",");
		b.pop();
		b.push("}");
		return b.join("")
	};
	a.TypeSystem.prototype.escape = function(b, c, d) {
		if (b == null || typeof b == "undefined")
			return "null";
		switch (this.type) {
			case "__string" :
				return a.escape(b, c);
			case "__date" :
				return a.dateToISO8601(b);
			case "__array" :
				return a.arrayToString(b, c, false);
			case "__oArray" :
			case "__object" :
				return a.objToStringImpl(b, c, d);
			case "__primitive" :
			case "__enum" :
				return b;
			default :
				if (b.__isFppObject == true)
					return b;
				else
					return a.objToString(b, c, d)
		}
	};
	a.__string = function(b) {
		return new a.TypeSystem("__string", b)
	};
	a.__date = function(b) {
		return new a.TypeSystem("__date", b)
	};
	a.__array = function(b) {
		return new a.TypeSystem("__array", b)
	};
	a.__oArray = function(b) {
		return new a.TypeSystem("__oArray", b)
	};
	a.__primitive = function(b) {
		return new a.TypeSystem("__primitive", b)
	};
	a.__object = function(b) {
		return new a.TypeSystem("__object", b)
	};
	a.__enum = function(b) {
		return new a.TypeSystem("__enum", b)
	};
	a.__custom = function(b, c) {
		return new a.TypeSystem(b, c)
	};
	a.create = function(f, e) {
		var a = window, d = f.split("."), g = d.length;
		for (var b = 0; b < g - 1; b++) {
			var c = d[b];
			if (!a[c])
				a[c] = function() {
				};
			a = a[c]
		}
		a[d[b]] = new e
	};
	if (typeof Web != "undefined" && Web.Network) {
		Web.Network.Fpp = $Network.Fpp;
		Web.Network.FppProxy = $Network.FppProxy
	}
	var c = $Network._fppProxies;
	for (var b = c.length - 1; b >= 0; b--) {
		var d = c[b];
		a.create(d.type, d.classType)
	}
	$Network._fppReady = true
};
$Network.registerScript("FireAnt.js")