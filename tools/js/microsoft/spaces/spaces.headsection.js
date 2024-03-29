/* Copyright (C) 2009 Microsoft Corporation */
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
FlashDetection = new function() {
	var b = false, a = false, i = 9, j = 0, k = 124, c = "sn_flash";
	this.HasFlash = function() {
		if (!b) {
			try {
				a = 1 == Spaces.Cookie.ReadCookie(c) || h(i, j, k)
			} catch (d) {
				a = false
			}
			if (a)
				Spaces.Cookie.WriteCookie(c, 1);
			b = true
		}
		return a
	};
	this.handleEmbedCode = function(f, e) {
		var a = document.getElementById(f);
		if (d) {
			if (!a || !a.parentNode)
				return;
			var b;
			if (FlashDetection.HasFlash()) {
				b = document.createElement(e);
				if (b)
					try {
						b.setAttribute("wmode", "opaque", 0)
					} catch (g) {
					}
			} else {
				b = document
						.createElement('<a href="http://www.macromedia.com/go/getflashplayer" target="_blank">');
				b.innerHTML = '<img src="'
						+ gNoFlashImage
						+ '" alt="" class="noFlash" /><br />'
						+ GetString("live.sndefaultstrings.strings.flash.downloadmessage")
			}
			a.parentNode.insertBefore(b, a);
			a.parentNode.removeChild(a)
		} else if (FlashDetection.HasFlash()) {
			var c = document.createElement("div");
			try {
				c.innerHTML = e;
				c.firstChild.setAttribute("wmode", "opaque")
			} catch (g) {
			}
			document.write(c.innerHTML)
		} else
			document
					.write('<a href="http://www.macromedia.com/go/getflashplayer" target="_blank"><img src="'
							+ gNoFlashImage
							+ '" class="noFlash" /><br />'
							+ GetString("live.sndefaultstrings.strings.flash.downloadmessage")
							+ "</a>")
	};
	var d = navigator.appVersion.indexOf("MSIE") != -1 ? true : false, m = navigator.appVersion
			.toLowerCase().indexOf("win") != -1 ? true : false, l = navigator.userAgent
			.indexOf("Opera") != -1 ? true : false;
	function e() {
		var a = null;
		try {
			var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), b = c
					.GetVariable("$version"), d = b.split(" ");
			a = d[1].split(",")
		} catch (e) {
		}
		return a
	}
	function f() {
		var d = null;
		if (null != navigator.plugins
				&& 0 < navigator.plugins.length
				&& (!!navigator.plugins["Shockwave Flash 2.0"] || !!navigator.plugins["Shockwave Flash"])) {
			var g = navigator.plugins["Shockwave Flash 2.0"]
					? "Shockwave Flash 2.0"
					: "Shockwave Flash", e = navigator.plugins[g].description, a = e
					.split(" "), b = a[2].split("."), f = "" != a[3]
					? a[3]
					: a[4], c = f.split("r");
			d = [b[0], b[1], c[1] > 0 ? c[1] : 0]
		}
		return d
	}
	function g() {
		if (null != navigator.plugins && 0 < navigator.plugins.length)
			return f();
		else if (d && m && !l)
			return e();
		return null
	}
	function h(b, c, d) {
		var a = g();
		if (!a)
			return false;
		if (a[0] > b)
			return true;
		else if (a[0] == b)
			if (a[1] > c)
				return true;
			else if (a[1] == c)
				return a[2] >= d;
		return false
	}
};
registerNamespace("Spaces.Tracing");
Spaces.Tracing._Trace = function() {
	var a = this;
	a.Listeners = {};
	a.RegisterTraceCategory = function(b) {
		a.Listeners[b] = new Spaces.Tracing._EventMarshal;
		a["WebSpaces" + b + "Event"] = function(d) {
			var c = this;
			c.strName = d ? d : "Spaces.Trace.WebSpaces" + b + "Event";
			c.Fire = function(d) {
				a.FireEvent(b, c.strName, d)
			}
		};
		a["Add" + b + "EventListener"] = function(c) {
			a.Listeners[b].AddListener(c)
		}
	};
	a.FireEvent = function(b, d, c) {
		if (a.Listeners[b].length) {
			var e = new Spaces.Tracing._Event(b, d, c);
			a.Listeners[b].FireEvent(e)
		}
	}
};
Spaces.Tracing._Event = function(a, c, b) {
	this.strCategory = "Spaces.Trace.WebSpaces" + a + "Event";
	this.strName = c;
	this.strMessage = b;
	this.toString = function() {
		return this.strName + " (" + this.strCategory + "): " + this.strMessage
	}
};
Spaces.Tracing._EventMarshal = Array;
Spaces.Tracing._EventMarshal.prototype.AddListener = function(a) {
	this.push(a)
};
Spaces.Tracing._EventMarshal.prototype.FireEvent = function(b) {
	for (var a = 0; a < this.length; this[a++](b));
};
Spaces.Trace = new Spaces.Tracing._Trace;
Spaces.Trace.RegisterTraceCategory("Simple");
Spaces.Trace.RegisterTraceCategory("Timing");
Spaces.Trace.RegisterTraceCategory("Exception");
Spaces.Trace.RegisterTraceCategory("ResultFalse");
registerNamespace("Spaces.Tracing");
Spaces.Tracing.ServerEventPlayer = function() {
	this.Play = function(a) {
		if (a != null)
			for (var b = 0; b < a.length; b++) {
				var c = a[b];
				switch (c.Category.toLowerCase()) {
					case "assertable" :
						alert(c.Message)
				}
			}
	}
};
registerNamespace("Spaces.Tracing");
Spaces.Tracing._LoadMonitor = function(g, f) {
	var b = this, a = [], c = new Spaces.Tracing._EventMarshal, e = new Spaces.Tracing._EventMarshal, d = new Spaces.Tracing._EventMarshal;
	if (f)
		setTimeout(function() {
					var c = [];
					for (var b = 0; b < a.length; b++)
						if (!a[b].blnIsComplete)
							c.push(a[b]);
					if (c.length)
						d.FireEvent(c)
				}, f);
	b.RegisterComponent = function(d, b) {
		if (!b) {
			b = "";
			var e = "0123456789ABCDEF";
			for (var c = 0; c < 32; c++) {
				switch (c) {
					case 8 :
					case 12 :
					case 16 :
					case 20 :
						b += "-"
				}
				b += e.charAt(Math.floor(Math.random() * 16))
			}
		}
		a.push(new Spaces.Tracing._Component(b, d));
		return b
	};
	b.CompleteComponent = function(d) {
		for (var b = 0; b < a.length; b++)
			if (a[b].strUID == d) {
				if (a[b].blnIsComplete)
					return;
				a[b].blnIsComplete = true;
				a[b].dtEndTime = Date();
				c.FireEvent(a[b]);
				break
			}
		for (var b = 0; b < a.length; b++)
			if (!a[b].blnIsComplete)
				return;
		e.FireEvent(g)
	};
	b.AddComponentListener = function(a) {
		c.AddListener(a)
	};
	b.AddModuleListener = function(a) {
		e.AddListener(a)
	};
	b.AddTimeoutListener = function(a) {
		d.AddListener(a)
	};
	b.GetComponentMonitor = function(c) {
		var a = new Spaces.Tracing._LoadMonitor(c);
		a.AddModuleListener(b.CompleteComponent);
		return a
	}
};
Spaces.Tracing._Component = function(b, a) {
	this.strUID = b;
	this.strName = a;
	this.blnIsComplete = false;
	this.dtStartTime = Date();
	this.dtEndTime = null;
	this.toString = function() {
		return this.strName
				+ (this.blnIsComplete
						? " Completed: " + this.dtEndTime
						: " Started: " + this.dtStartTime)
	}
};
Spaces.LoadMonitor = new Spaces.Tracing._LoadMonitor("Page");
document
		.write('<div id="SPACES_LOADMONITOR" style="display:none">&nbsp;</div>');
Spaces.LoadMonitor.AddComponentListener(function(b) {
			var a = document.getElementById("SPACES_LOADMONITOR");
			a.innerHtml = (a.innerHtml ? a.innerHtml : "") + b + "\n"
		});
Spaces.LoadMonitor.AddModuleListener(function() {
	var a = new Date;
	document.getElementById("SPACES_LOADMONITOR").innerHtml += "Page Completed: "
			+ a + "\n"
});
Spaces.LoadMonitor.strPltId = Spaces.LoadMonitor.RegisterComponent("Page Load");
registerNamespace("Spaces.Watson");
Spaces.Watson = {
	Error : {
		ImageNotLoaded : 8e3
	}
};
function ShowSplit(a) {
	a.className = a.className.replace(/splitOff/, "splitOn")
}
function HideSplit(a) {
	a.className = a.className.replace(/splitOn/, "splitOff")
}
function TrackNavigation(a, c, b) {
	var d = document.createElement("IMG");
	d.src = a + "/_0sa" + c + "/100?CM=SocialNetworking&CE=Navigation&HL=" + b
}
function ShowNavMenu(a) {
	if (!a.binding) {
		a.binding = new $Menu(a);
		a.binding.initialize()
	}
	a.binding.toggleMenu();
	return false
}
$Menu = function(h) {
	var d = this, f = h.parentNode, b = h, a = null, c = null;
	this.initialize = function() {
		g(window, "onunload", d.dispose);
		if (-1 != f.className.search(/split(?:On|Off)/)) {
			b = b.previousSibling;
			while (!!b && (!b.tagName || "A" != b.tagName.toUpperCase()))
				b = b.previousSibling;
			if (!b)
				b = h
		}
		var e = h.nextSibling;
		while (!!e && (!e.tagName || "DIV" != e.tagName.toUpperCase()))
			e = e.nextSibling;
		if (!e)
			return;
		a = e;
		if (d.blnUseFrame) {
			c = document.createElement("IFRAME");
			c.className = "sn_lbar_menuFrame";
			f.insertBefore(c, a)
		}
	};
	this.dispose = function() {
		if (d.isVisible()) {
			e(window, "onresize", i);
			e(document, "onclick", j)
		}
		e(window, "onunload", d.dispose);
		h.binding = null;
		c = null;
		a = null;
		b = null;
		f = null;
		d = null
	};
	this.isVisible = function() {
		if (!a)
			return false;
		return "block" == a.style.display
	};
	this.toggleMenu = function() {
		if (!a)
			return;
		if (d.isVisible())
			j();
		else {
			f.className += "X menuOn";
			a.style.pixelLeft = -1e3;
			a.style.display = "block";
			if (d.blnUseFrame) {
				c.style.pixelLeft = -1e3;
				c.style.display = "block"
			}
			i();
			setTimeout(function() {
						if (!d.isVisible())
							return;
						g(document, "onclick", j);
						g(window, "onresize", i)
					}, 0)
		}
	};
	function j() {
		if (!d.isVisible())
			return;
		e(window, "onresize", i);
		e(document, "onclick", j);
		f.className = f.className.replace(/X menuOn/, "");
		a.style.display = "none";
		if (d.blnUseFrame)
			c.style.display = "none"
	}
	function i() {
		var e = b, i = a.offsetParent, f = Spaces.IsRTL() ? b.offsetWidth
				- a.offsetWidth : 0, h = e.offsetHeight + 1;
		while (!!e && e != i) {
			f += e.offsetLeft;
			h += e.offsetTop;
			e = e.offsetParent
		}
		var g = f;
		while (!!e && e != document.body) {
			g += e.offsetLeft;
			e = e.offsetParent
		}
		if (g < 0)
			f -= g;
		else if (g + a.offsetWidth > document.body.scrollWidth)
			f -= g + a.offsetWidth - document.body.scrollWidth;
		a.style.pixelLeft = f;
		a.style.pixelTop = h;
		if (a.offsetLeft != f)
			a.style.pixelLeft = 2 * f - a.offsetLeft;
		if (a.offsetTop != h)
			a.style.pixelTop = 2 * h - a.offsetTop;
		if (d.blnUseFrame) {
			c.style.pixelLeft = a.offsetLeft;
			c.style.pixelTop = a.offsetTop;
			c.style.pixelWidth = a.offsetWidth;
			c.style.pixelHeight = a.offsetHeight
		}
	}
	var g, e;
	if (window.attachEvent) {
		g = function(b, c, a) {
			b.attachEvent(c, a)
		};
		e = function(b, c, a) {
			b.detachEvent(c, a)
		}
	} else {
		g = function(b, c, a) {
			b.addEventListener(c.slice(2), a, false)
		};
		e = function(b, c, a) {
			b.removeEventListener(c.slice(2), a, false)
		}
	}
};
var _msieIndex = window.navigator.appVersion.indexOf("MSIE");
$Menu.prototype.blnUseFrame = -1 != _msieIndex
		&& 7 > parseFloat(window.navigator.appVersion.substring(_msieIndex + 5,
				_msieIndex + 8))