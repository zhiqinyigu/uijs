/* Copyright (C) 2009 Microsoft Corporation */registerNamespace("Web.UI");
Web.UI.Version = "8.070516.0";
Web.UI.getLayoutRoot = function() {
	return document.compatMode == "CSS1Compat"
			? document.documentElement
			: document.body
};
Web.UI.wireEvents = function(d, b, c, e) {
	for (var a = 0; a < b.length; a++)
		if (e)
			d.attachEvent(b[a], c);
		else
			d.detachEvent(b[a], c)
};
Web.UI.registerEvents = function(a) {
	if (typeof $Event != "undefined")
		a.prototype = new $Event.DOM;
	else {
		a.prototype.attachEvent = $Binding.prototype.attachEvent;
		a.prototype.detachEvent = $Binding.prototypeWeb.co.detachEvent;
		a.prototype.fire = $Binding.prototype.fire
	}
	var c = [];
	for (var b = 1; b < arguments.length; b++)
		c.push(arguments[b]);
	a.Events = $Enum.apply(new $Enum, c)
};
Web.UI.registerAllBaseMethods = function(c, a) {
	for (var b in a)
		if ("function" == typeof a[b])
			c.registerBaseMethod(a, b)
};
Web.UI.getLocation = function(b, f) {
	if (!b)
		return Web.UI.Rect.Empty;
	var a = new Web.UI.Rect;
	a.source = b;
	var e = b.currentStyle, h = ["Top", "Left", "Right", "Bottom"];
	for (var d = 0; d < h.length; d++) {
		var c = h[d];
		a["margin" + c] = Number.coerceInt(e["margin" + c]);
		a["border" + c] = Number.coerceInt(e["border" + c + "Width"]);
		a["padding" + c] = Number.coerceInt(e["padding" + c])
	}
	a.height = b.offsetHeight;
	a.width = b.offsetWidth;
	a.left = b.offsetLeft;
	a.top = b.offsetTop;
	b = b.offsetParent;
	var g = Web.UI.getLayoutRoot();
	while (b && (!f || b != f)) {
		a.left += b.offsetLeft - (g != b ? Number.coerceInt(b.scrollLeft) : 0);
		a.top += b.offsetTop - (g != b ? Number.coerceInt(b.scrollTop) : 0);
		b = b.offsetParent
	}
	if (document.compatMode == "CSS1Compat") {
		a.contentWidth = a.source.offsetWidth - a.borderLeft - a.borderRight
				- a.paddingLeft - a.paddingRight - a.marginLeft - a.marginRight;
		a.contentHeight = a.source.offsetHeight - a.borderTop - a.borderBottom
				- a.paddingTop - a.paddingBottom - a.marginTop - a.marginBottom
	} else {
		a.contentWidth = a.source.offsetWidth;
		a.contentHeight = a.source.offsetHeight
	}
	a.x = a.left;
	a.y = a.top;
	a.bottom = a.top + a.height - a.marginBottom;
	a.right = a.left + a.width - a.marginRight;
	return a
};
Web.UI.getMouseLocation = function(b, c) {
	var a = Web.UI.getLocation(c || Web.UI.getLayoutRoot());
	return new Web.UI.Point(b.clientX + Web.UI.getLayoutRoot().scrollLeft
					- a.left, b.clientY + Web.UI.getLayoutRoot().scrollTop
					- a.top)
};
Web.UI.getMouseOffset = function(a) {
	if (a.srcElement.currentStyle.position == "relative")
		return new Web.UI.Point(a.x, a.y);
	else
		return new Web.UI.Point(a.offsetX, a.offsetY)
};
function isVisible(a) {
	while (a && a.style && a.style.display != "none"
			&& a.style.visibility != "hidden")
		a = a.parentNode;
	if (!a || !a.style)
		return true;
	return false
}
Web.UI.isFocusable = function(a) {
	var b = "INPUT|BUTTON|TEXTAREA|FIELDSET|IFRAME|SELECT|";
	return a.tagName
			&& !a.disabled
			&& ((b.indexOf(a.tagName + "|") > -1 || a.tagName == "A" && a.href) && isVisible(a))
};
Web.UI.cancelBubble = function() {
	event.cancelBubble = true
};
Web.UI.findFocusableElement = function(b, a, c) {
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
				if (!Web.UI.isFocusable(a))
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
};
Web.UI.Point = function(a, b) {
	return {
		left : a,
		x : a,
		top : b,
		y : b,
		offset : function(a, b) {
			this.top += b;
			this.y = this.top;
			this.left += a;
			this.x = this.left;
			return this
		},
		add : function(a, b) {
			return this.offset(a, b)
		},
		subtract : function(a, b) {
			return this.offset(-a, -b)
		}
	}
};
Web.UI.Size = function(b, a) {
	return {
		width : b,
		height : a,
		toString : function() {
			return "(width={0},height={1})".format(this.width, this.height)
		}
	}
};
Web.UI.Rect = function(a, b, d, c) {
	return {
		left : a,
		x : a,
		top : b,
		y : b,
		width : d,
		height : c,
		right : a + d,
		bottom : b + c,
		toString : function() {
			return "{x:{0},y:{1},width:{2},height:{3}}".format(this.x, this.y,
					this.width, this.height)
		},
		equals : function(a) {
			return this.x == a.x && this.y == a.y && this.width == a.width
					&& this.height == a.height
		},
		inflate : function(b, a) {
			this.width += b;
			this.height += a;
			this.right = this.x + this.width;
			this.bottom = this.y + this.height
		},
		offset : function(a, b) {
			this.x += a;
			this.left = this.x;
			this.y += b;
			this.top = this.y;
			this.right += a;
			this.bottom += b
		},
		isEmpty : function() {
			return this.width <= 0 || this.height <= 0
		},
		contains : function(a) {
			return a.x >= this.left && a.x <= this.width + this.left
					&& a.y >= this.top && a.y <= this.height + this.top
		}
	}
};
Web.UI.Rect.Empty = new Web.UI.Rect(0, 0, 0, 0);
Web.UI.Region = function() {
	var a = [];
	for (var b = 0; b < arguments.length; b++)
		a.push(arguments[b]);
	this.add = function(b) {
		a.push(b)
	};
	this.remove = function(b) {
		a.remove(b)
	};
	this.contains = function(c) {
		for (var b = 0; b < a.length; b++)
			if (a[b].contains(c))
				return a[b];
		return null
	};
	this.clear = function() {
		a = []
	};
	this.toString = function() {
		var c = "[";
		for (var b = 0; b < a.length; b++)
			c += a.toString() + ",";
		return c + "]"
	}
};
Web.UI.Control = function(g) {
	var b = this, d = null, a = null;
	$Runtime.onunload.attach(h);
	f();
	b.initialize = f;
	function f() {
		if (null != d)
			return;
		d = new $Memory.Groups;
		a = {};
		a.contents = g;
		a.opacity = 100
	}
	this.dispose = function() {
		if (d) {
			d.dispose();
			a = null;
			d = null
		}
	};
	function h() {
		b.dispose()
	}
	this.setBounds = function(a) {
		b.setPosition(a);
		b.setSize(a)
	};
	this.getBounds = function() {
		return e()
	};
	this.setContents = function(b) {
		d.create("c").Events.dispose();
		a.contents = b;
		c("oncontentschanged");
		return a.contents
	};
	this.getContents = function() {
		return a.contents
	};
	this.setOpacity = function(b) {
		if (!a.contents)
			return;
		a.opacity = b;
		if (b != null) {
			if ($Browser.isMozilla())
				b -= .001;
			a.contents.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="
					+ Math.round(b) + ")"
		} else
			a.contents.style.filter = "";
		c("onopacitychanged")
	};
	this.getOpacity = function() {
		return a.opacity
	};
	this.setPosition = function(d) {
		if (!a.contents)
			return;
		var e = b.getBounds();
		if (e.x == d.x && e.y == d.y)
			return;
		var f = !a.offset || !a.bounds || !a.bounds.equals(e);
		if (f) {
			a.contents.style.pixelTop = 0;
			a.contents.style.pixelLeft = 0;
			a.offset = b.getBounds()
		}
		a.contents.style.pixelTop = d.y - a.offset.y
				+ (a.offset.marginTop || 0);
		a.contents.style.pixelLeft = d.x - a.offset.x
				+ (a.offset.marginLeft || 0);
		a.bounds = b.getBounds();
		c("onmove")
	};
	this.getPosition = function() {
		return e()
	};
	this.setSize = function(b) {
		if (!a.contents)
			return;
		if (!isNaN(Number.parse(b.width)))
			a.contents.style.pixelWidth = b.width;
		else
			a.contents.style.width = b.width;
		if (!isNaN(Number.parse(b.height)))
			a.contents.style.pixelHeight = b.height;
		else
			a.contents.style.height = b.height;
		c("onresize")
	};
	this.getSize = function() {
		return e()
	};
	this.setClip = function(d, g, f, e) {
		if (!a.contents)
			return;
		var b = "rect(" + g + "px " + f + "px " + e + "px " + d + "px)";
		if (null == d)
			b = "rect(auto auto auto auto)";
		try {
			a.contents.style.clip = b
		} catch (h) {
		}
		c("onclip")
	};
	this.getClip = function() {
		return a.contents.style.clip
	};
	this.contains = function(a) {
		var b = e().contains(a);
		return b
	};
	this.hide = function() {
		if (!a.contents)
			return;
		a.contents.style.display = "none";
		c("onhide")
	};
	this.show = function() {
		if (!a.contents)
			return;
		a.contents.style.display = "block";
		c("onshow")
	};
	this.invalidate = function() {
		c("oninvalidate")
	};
	this.toString = function() {
		return b.getBounds().toString()
	};
	function c(d) {
		if (a.moving)
			return;
		if (b.constructor != Web.UI.Control
				&& (!b.constructor.Events || !b.constructor.Events[d]))
			b.constructor.applyClass(true);
		b.fire(d);
		if (d != "oninvalidate")
			c("oninvalidate")
	}
	function e() {
		if (!a.contents)
			return Web.UI.Rect.Empty;
		var b = Web.UI.getLocation(a.contents);
		if (!b || b.isEmpty()) {
			var c = {
				visibility : a.contents.currentStyle.visibility
						|| a.contents.style.visibility || "visible",
				display : a.contents.currentStyle.display
						|| a.contents.style.display || "auto"
			};
			a.contents.style.visibility = "hidden";
			a.contents.style.display = "block";
			b = Web.UI.getLocation(a.contents);
			a.contents.style.display = c.display;
			a.contents.style.visibility = c.visibility
		}
		return b
	}
	Web.UI.registerAllBaseMethods(Web.UI.Control, this)
};
Web.UI.registerEvents(Web.UI.Control, "onshow", "onhide", "onmove", "onresize",
		"onclip", "onopacitychanged", "oncontentschanged", "oninvalidate");
Web.UI.Control.registerClass("Web.UI.Control");
Web.UI.getContainer = function() {
	if (Web.UI._container == null) {
		Web.UI._container = document.createElement("span");
		document.body.insertAdjacentElement("afterBegin", Web.UI._container)
	}
	return Web.UI._container
};
Web.UI.FramePopup = function(c) {
	Web.UI.FramePopup.initializeBase(this);
	var d = this, b = null, a = null;
	e();
	d.initialize = e;
	function e() {
		if (null != b)
			return;
		b = new $Memory.Groups;
		a = {};
		if (!$Browser._isIE || $Browser._isIE && $Browser.version > 6)
			return;
		var g = Web.UI.getContainer();
		a.initialized = true;
		a.frames = g.getElementsByTagName("iframe");
		if (!isNaN(Number(c))) {
			e = Number(c);
			a.parent = g;
			a.owner = new Web.UI.Control(g);
			b.create(null).Properties.register(a.owner)
		} else if (c.style && c.getElementsByTagName) {
			a.owner = new Web.UI.Control(c);
			a.parent = c.parentNode;
			b.create(null).Properties.register(a.owner)
		} else if (Web.UI.Control.isInstanceOfType(c)) {
			a.owner = c;
			a.parent = c.getContents().parentNode
		}
		a.container = document.createElement("div");
		a.container = b.create(null).Nodes.create("div", {}, {
					position : "absolute"
				}, a.parent);
		a.attribs = {
			tabIndex : -1
		};
		if (location.protocol == "https:" && Web.UI.FramePopupURL == null)
			a.attribs.src = $Runtime.baseUrl + "empty.htm";
		else if (Web.UI.FramePopupURL)
			a.attribs.src = Web.UI.FramePopupURL;
		a.attribs.className = "coreui_iframe_popup";
		d.setContents(a.container);
		d.setOpacity(0);
		if (null != a.owner) {
			b.create(null).Events.register(a.owner, {
						oninvalidate : f
					});
			var h = a.owner.getContents(), e = h.currentStyle.zIndex;
			if (e == "auto")
				e = 0
		}
		a.container.style.zIndex = e - 1;
		f()
	}
	this.dispose = function(c) {
		Web.UI.FramePopup.getBaseMethod(d, "dispose", "Web.UI.Control").call(
				this, c);
		if (b) {
			b.dispose();
			a = null;
			b = null
		}
	};
	function f() {
		if (null == a.owner)
			return;
		var c = a.owner.getContents();
		if (!c || c.currentStyle.display == "none") {
			a.container.style.display = "none";
			if (a.frame) {
				Web.UI.getContainer().appendChild(a.frame);
				a.frame.style.display = "none";
				a.frame = null
			}
			return
		}
		if (null == a.frame) {
			var e, f = a.frames.length - 1;
			while (f >= 0 && !e) {
				if (a.frames[f].className == "coreui_iframe_popup")
					e = a.frames[f];
				f--
			}
			if (e) {
				a.frame = e;
				a.container.appendChild(a.frame);
				a.frame.style.display = "block"
			} else
				a.frame = b.create(null).Nodes.create("iframe", a.attribs, {
							position : "absolute",
							left : "0px",
							top : "0px",
							display : "block",
							width : "100%",
							height : "100%"
						}, a.container)
		}
		var g = c.currentStyle.zIndex;
		if (g == "auto")
			g = 0;
		a.container.style.zIndex = g - 1;
		a.container.style.clip = c.style.clip;
		var h = a.owner.getBounds();
		a.container.style.display = c.currentStyle.display;
		d.setBounds(h)
	}
	this.positionAt = function(b, c) {
		if (!a.initialized)
			d.initialize();
		d.setBounds(b);
		if (a && a.container)
			a.container.style.zIndex = c
	}
};
Web.UI.FramePopup.registerClass("Web.UI.FramePopup", "Web.UI.Control");
Web.UI.ShadowPopup = function(d) {
	Web.UI.ShadowPopup.initializeBase(this);
	var b = this, c = null, a = null;
	e();
	b.initialize = e;
	function e() {
		if (null != c)
			return;
		var g = {
			className : Web.UI.ShadowPopup.applyClass(true)
		}, e = {
			backgroundColor : "#000000",
			position : "absolute",
			padding : 0,
			margin : 0
		};
		Web.UI.ShadowPopup.getBaseMethod(b, "initialize", "Web.UI.Control")
				.call(this);
		c = new $Memory.Groups;
		a = {};
		a.offset = 3;
		a.opacity = 25;
		a.useBlur = false;
		a.owner = d;
		d = null;
		if (!a.useBlur)
			e.margin = a.offset + "px";
		else {
			e.margin = -a.offset + "px";
			e.marginRight = a.offset * 2 + "px";
			e.marginBottom = a.offset * 2 + "px"
		}
		a.shadow = c.create(null).Nodes.create("div", g, e, a.owner
						.getContents().parentNode);
		b.setContents(a.shadow);
		f();
		c.create(null).Events.register(a.owner, {
					oninvalidate : f
				})
	}
	this.dispose = function(d) {
		Web.UI.ShadowPopup.getBaseMethod(b, "dispose", "Web.UI.Control").call(
				this, d);
		if (c) {
			c.dispose();
			a = null;
			c = null
		}
	};
	function f() {
		if (null == a.owner)
			return;
		var c = a.owner.getContents();
		if (!c || c.currentStyle.display == "none" || a.owner.getOpacity() == 0) {
			a.shadow.style.display = "none";
			return
		}
		a.shadow.style.display = c.style.display;
		a.shadow.style.clip = c.style.clip;
		var d = c.currentStyle.zIndex;
		if (d == "auto")
			d = 0;
		a.shadow.style.zIndex = d - 1;
		b.setOpacity(a.owner.getOpacity());
		b.setBounds(a.owner.getBounds())
	}
	this.setOpacity = function(c) {
		if (null == c)
			c = 100;
		c = a.opacity * c * c / 1e4;
		if (!a.useBlur)
			Web.UI.ShadowPopup.getBaseMethod(b, "setOpacity", "Web.UI.Control")
					.call(b, c);
		else
			a.shadow.style.filter = "progid:DXImageTransform.Microsoft.Blur(pixelradius="
					+ Math.round(a.offset * 1.5)
					+ ",MakeShadow=True,shadowOpacity=" + c / 100 + ")"
	}
};
Web.UI.ShadowPopup.registerClass("Web.UI.ShadowPopup", "Web.UI.Control");
Web.UI.Popup = function() {
	Web.UI.Popup.initializeBase(this);
	var b = this, c = null, a = null;
	g();
	b.initialize = g;
	function g() {
		if (null != c)
			return;
		Web.UI.Popup.getBaseMethod(b, "initialize", "Web.UI.Control")
				.call(this);
		c = new $Memory.Groups;
		a = {};
		a.relocateStyle = {
			top : 0,
			right : 0,
			bottom : 0,
			left : 0,
			enableX : true,
			enableY : true
		};
		a.hdock = Web.UI.Popup.HDock.Screen;
		a.vdock = Web.UI.Popup.VDock.Screen;
		a.hanchor = Web.UI.Popup.HAnchor.Center;
		a.vanchor = Web.UI.Popup.VAnchor.Middle;
		a.padding = new Web.UI.Point(0, 0)
	}
	this.dispose = function(d) {
		Web.UI.Popup.getBaseMethod(b, "dispose", "Web.UI.Control")
				.call(this, d);
		if (c) {
			c.dispose();
			a = null;
			c = null
		}
	};
	this.setRelocateStyle = function(b) {
		a.relocateStyle = b
	};
	this.setPadding = function(d, c) {
		if ("number" === typeof c)
			a.padding.x = c;
		if ("number" === typeof d)
			a.padding.y = d;
		b.recalc()
	};
	this.setDock = function(d, c) {
		a.vdock = d || a.vdock;
		a.hdock = c || a.hdock;
		b.recalc()
	};
	this.setAnchor = function(d, c) {
		a.vanchor = d || a.vanchor;
		a.hanchor = c || a.hanchor;
		b.recalc()
	};
	this.dockTo = function(d, f, e) {
		if (d.getElementsByTagName) {
			a.ctrlOwner = new Web.UI.Control(d);
			c.create(null).Properties.register(a.ctrlOwner)
		} else if (Web.UI.Control.isInstanceOfType(d))
			a.ctrlOwner = d;
		a.elOffset = f;
		a.blnRelocate = e;
		b.recalc()
	};
	this.getDockElement = function() {
		return a.ctrlOwner.getContents()
	};
	this.getDockPosition = function() {
		if (!a.ctrlOwner && a.hdock != Web.UI.Popup.HDock.Screen
				&& a.vdock != Web.UI.Popup.VDock.Screen)
			return Web.UI.Rect.Empty;
		var j = Web.UI.Utilities.isRightToLeftMarket(), f, g = b.getSize(), h = window.event
				|| window.e;
		if (a.hdock != Web.UI.Popup.HDock.Screen
				|| a.vdock != Web.UI.Popup.VDock.Screen)
			f = a.ctrlOwner.getBounds();
		var d = new Web.UI.Point, c = new Web.UI.Point, e = Web.UI
				.getLayoutRoot();
		switch (a.hdock) {
			case Web.UI.Popup.HDock.Left :
				d.x = f.left;
				break;
			case Web.UI.Popup.HDock.Center :
				d.x = (f.left + f.right) / 2;
				break;
			case Web.UI.Popup.HDock.Right :
				d.x = f.right;
				break;
			case Web.UI.Popup.HDock.Screen :
				d.x = Web.UI.getLayoutRoot().scrollLeft
						+ Web.UI.getLayoutRoot().clientWidth / 2;
				break;
			case Web.UI.Popup.HDock.Cursor :
				if ($Browser._isIE && j)
					d.x = e.scrollLeft + h.clientX
							- (e.scrollWidth - e.clientWidth) - 19;
				else
					d.x = e.scrollLeft + h.clientX
		}
		switch (a.vdock) {
			case Web.UI.Popup.VDock.Top :
				d.y = f.top;
				break;
			case Web.UI.Popup.VDock.Middle :
				d.y = (f.top + f.bottom) / 2;
				break;
			case Web.UI.Popup.VDock.Bottom :
				d.y = f.bottom;
				break;
			case Web.UI.Popup.VDock.Screen :
				d.y = Web.UI.getLayoutRoot().scrollTop
						+ Web.UI.getLayoutRoot().clientHeight / 2;
				break;
			case Web.UI.Popup.VDock.Cursor :
				d.y = Web.UI.getLayoutRoot().scrollTop + h.clientY
		}
		switch (a.hanchor) {
			case Web.UI.Popup.HAnchor.Left :
				c.x = d.x;
				break;
			case Web.UI.Popup.HAnchor.Center :
				c.x = d.x - g.width / 2;
				break;
			case Web.UI.Popup.HAnchor.Right :
				c.x = d.x - g.width
		}
		switch (a.vanchor) {
			case Web.UI.Popup.VAnchor.Top :
				c.y = d.y;
				break;
			case Web.UI.Popup.VAnchor.Middle :
				c.y = d.y - g.height / 2;
				break;
			case Web.UI.Popup.VAnchor.Bottom :
				c.y = d.y - g.height
		}
		c.y += a.padding.y;
		c.x += a.padding.x;
		if (a.blnRelocate) {
			if (a.relocateStyle.enableX
					&& c.x + g.width + a.relocateStyle.right > e.scrollLeft
							+ e.clientWidth)
				c.x = e.scrollLeft + e.clientWidth - g.width
						- a.relocateStyle.right;
			if (a.relocateStyle.enableY
					&& c.y + g.height + a.relocateStyle.bottom > e.scrollTop
							+ e.clientHeight)
				c.y = e.scrollTop + e.clientHeight - g.height
						- a.relocateStyle.bottom;
			if (!j && a.relocateStyle.enableX
					&& c.x - a.relocateStyle.left < e.scrollLeft)
				c.x = e.scrollLeft + a.relocateStyle.left;
			if (a.relocateStyle.enableY
					&& c.y - a.relocateStyle.top < e.scrollTop)
				c.y = e.scrollTop + a.relocateStyle.top
		}
		if (a.elOffset) {
			var i = Web.UI.getLocation(a.elOffset);
			c.x -= i.x;
			c.y -= i.y
		}
		c.left = c.x;
		c.top = c.y;
		return c
	};
	this.setContents = function(e, g, f) {
		c.create(null).Nodes.dispose();
		if (typeof e == "string") {
			a.contents = document.createElement("div");
			if (g)
				a.contents.innerText = e;
			else
				a.contents.innerHTML = e
		} else
			a.contents = e;
		if (null == a.contents.parentNode
				|| null == a.contents.parentNode.tagName) {
			if ($Browser.isMozilla() && document.domain != location.host)
				document.body.appendChild(a.contents);
			else
				Web.UI.getContainer().appendChild(a.contents);
			c.create(null).Nodes.register(a.contents)
		}
		if (this.shadow && a.contents.parentNode)
			if (a.contents.parentNode.className.indexOf("Web_UI_Shadow") == -1)
				a.contents = j(a.contents);
			else
				a.contents = a.contents.parentNode;
		if (a.contents.className.indexOf("Web_UI_Popup") == -1)
			a.contents.className += " Msn_UI_Popup Web_UI_Popup";
		a.contents.style.position = "absolute";
		if (!f || f.hidden)
			a.contents.style.display = "none";
		a.contents = Web.UI.Popup.getBaseMethod(b, "setContents",
				"Web.UI.Control").call(b, a.contents);
		a.frame = new Web.UI.FramePopup(b);
		c.create(null).Properties.register(a.frame);
		d("int");
		return a.contents
	};
	this.shadow = false;
	this.shadowElement = null;
	function j(a) {
		var f = {
			backgroundColor : "#BBB",
			position : "absolute",
			padding : 0,
			marginTop : "3px",
			marginLeft : "3px",
			display : a.style.display
		};
		b.shadowElement = c.create(null).Nodes.create("div", {
					className : " Web_UI_Shadow"
				}, f);
		i(a, b.shadowElement);
		var d = {
			position : "relative",
			display : "block",
			top : "-3px",
			left : "-3px"
		};
		for (var e in d)
			a.style[e] = d[e];
		b.shadowElement.appendChild(a);
		return b.shadowElement
	}
	this.destroyShadow = function() {
	};
	function i(a, b) {
		$Browser._isIE ? a.replaceNode(b) : a.parentNode.replaceChild(b, a)
	}
	this.display = function(f, c, e) {
		b.initialize();
		b.dockTo(f, e, c);
		d("ext");
		b.show();
		return a.contents
	};
	function d(d) {
		if (d == "int")
			c.create("int").Events.register(b, {
						onresize : h
					});
		else {
			c.create("ext").Events.register(window, {
						onresize : e
					});
			if (a.vdock == Web.UI.Popup.VDock.Screen
					|| a.hdock == Web.UI.Popup.HDock.Screen)
				c.create("ext").Events.register(window, {
							onscroll : e
						})
		}
	}
	function f(a) {
		c.create(a).Events.dispose();
		b.recalc();
		d(a)
	}
	function h() {
		f("int")
	}
	function e() {
		f("ext")
	}
	this.autoCalc = true;
	this.recalc = function(d) {
		var c = d || b.autoCalc;
		c = c
				&& !(!a.ctrlOwner && a.hdock != Web.UI.Popup.HDock.Screen && a.vdock != Web.UI.Popup.VDock.Screen);
		if (c)
			b.setPosition(b.getDockPosition())
	};
	Web.UI.registerAllBaseMethods(Web.UI.Popup, this)
};
Web.UI.Popup.registerClass("Web.UI.Popup", "Web.UI.Control");
Web.UI.Popup.VAnchor = new $Enum("Top", "Middle", "Bottom", "None");
Web.UI.Popup.HAnchor = new $Enum("Left", "Center", "Right", "None");
Web.UI.Popup.VDock = new $Enum("Top", "Middle", "Bottom", "Cursor", "Screen");
Web.UI.Popup.HDock = new $Enum("Left", "Center", "Right", "Cursor", "Screen");
Web.UI.Dialog = function() {
	Web.UI.Dialog.initializeBase(this, arguments);
	var c = this, b = null, a = null, d = false;
	f();
	c.initialize = f;
	function f() {
		if (null == b) {
			Web.UI.Dialog.getBaseMethod(c, "initialize", "Web.UI.Popup")
					.call(this);
			b = new $Memory.Groups;
			a = {};
			a.aKillList = ["onclick", "onmousedown", "onkeydown", "onkeypress",
					"ondblclick"]
		}
	}
	this.dispose = function(d) {
		Web.UI.Dialog.getBaseMethod(c, "dispose", "Web.UI.Popup").call(this, d);
		if (b) {
			b.dispose();
			a = null;
			b = null
		}
	};
	this.setModal = function(a) {
		d = a
	};
	this.setContents = function(d) {
		a.elDisplay = Web.UI.Dialog.getBaseMethod(c, "setContents",
				"Web.UI.Popup").call(this, d);
		a.elStatusBefore = document.createElement("a");
		a.elStatusBefore.className = "__before__";
		a.elStatusAfter = document.createElement("a");
		a.elStatusAfter.className = "__elStatusAfter__";
		a.elStatusAfter.href = a.elStatusBefore.href = "#";
		a.elStatusAfter.innerText = "";
		a.elStatusBefore.innerText = "";
		a.elDisplay.insertAdjacentElement("afterBegin", a.elStatusBefore);
		a.elDisplay.insertAdjacentElement("beforeEnd", a.elStatusAfter);
		a.elStatusBefore.style.position = a.elStatusAfter.style.position = "absolute";
		a.elStatusBefore.style.pixelLeft = a.elStatusAfter.style.pixelLeft = a.elDisplay.offsetLeft;
		a.elStatusBefore.style.pixelTop = a.elDisplay.offsetTop;
		a.elStatusAfter.style.pixelTop = a.elDisplay.offsetTop
				+ a.elDisplay.offsetHeight;
		b.create(null).Nodes.register(a.elStatusBefore);
		b.create(null).Nodes.register(a.elStatusAfter);
		return a.elDisplay
	};
	this.setFocus = function() {
		e()
	};
	this.show = function() {
		c.initialize();
		Web.UI.Dialog.getBaseMethod(c, "show", "Web.UI.Popup").call(this);
		c.setFocus();
		a.shown = true;
		setTimeout(h, 0)
	};
	this.hide = function() {
		b.create("show").Events.dispose();
		Web.UI.Dialog.getBaseMethod(c, "hide", "Web.UI.Popup").call(c);
		if (a)
			a.shown = false
	};
	var g = function() {
		if (d && event.returnValue == false)
			return;
		else
			c.hide()
	};
	function h() {
		if (a && a.shown) {
			if (!d)
				b.create("show").Events.register(document, {
							onclick : g
						});
			if (a.elStatusAfter) {
				b.create("show").Events.register(a.elDisplay, {
							onclick : Function.CancelBubble
						});
				b.create("show").Events.register(a.elStatusBefore, {
							onclick : Function.KillEvent
						});
				b.create("show").Events.register(a.elStatusAfter, {
							onclick : Function.KillEvent
						});
				if (d) {
					b.create("show").Events.register(a.elStatusBefore, {
								onfocus : e
							});
					b.create("show").Events.register(a.elStatusAfter, {
								onfocus : e
							})
				}
			}
		}
	}
	function e() {
		var b;
		if (null != window["event"] && event.srcElement == a.elStatusBefore)
			b = Web.UI
					.findFocusableElement(a.elDisplay, a.elStatusAfter, false);
		else
			b = Web.UI
					.findFocusableElement(a.elDisplay, a.elStatusBefore, true);
		if (b)
			setTimeout(function() {
						try {
							b.focus()
						} catch (a) {
						}
					}, 0)
	}
	Web.UI.registerAllBaseMethods(Web.UI.Dialog, this)
};
Web.UI.Dialog.registerClass("Web.UI.Dialog", "Web.UI.Popup");
Web.UI.Dialog.Modal = function() {
	Web.UI.Dialog.Modal.initializeBase(this, arguments);
	var a, h, i, e = "", b = this, f = ["onclick", "onmousedown", "onkeydown",
			"onkeypress", "ondblclick"];
	Web.UI.Dialog.Modal.getBaseMethod(b, "setModal", "Web.UI.Dialog").call(b,
			true);
	this.dispose = function() {
		Web.UI.Dialog.Modal.getBaseMethod(b, "dispose", "Web.UI.Dialog")
				.call(b);
		g();
		a = h = i = null
	};
	this.show = function(d) {
		Web.UI.Dialog.Modal.getBaseMethod(b, "show", "Web.UI.Dialog")
				.call(this);
		a = document.createElement("div");
		a.className = a.id = "Web_UI_Popup_Modal_Background";
		a.style.position = "absolute";
		Web.UI.getContainer().appendChild(a);
		c();
		j(d)
	};
	this.hide = function() {
		Web.UI.Dialog.Modal.getBaseMethod(b, "hide", "Web.UI.Dialog")
				.call(this);
		g()
	};
	function j(g) {
		a.attachEvent("onfocus", b.setFocus);
		window.attachEvent("onresize", c);
		window.attachEvent("onfocus", Function.KillEvent);
		Web.UI.wireEvents(a, f, Function.KillEvent, true);
		if (g) {
			window.attachEvent("onbeforeunload", d);
			e = g
		}
	}
	function g() {
		window.detachEvent("onresize", c);
		window.detachEvent("onfocus", Function.KillEvent);
		window.detachEvent("onbeforeunload", d);
		if (a) {
			Web.UI.wireEvents(a, f, Function.KillEvent, false);
			a.detachEvent("onfocus", b.setFocus);
			a.removeNode(true);
			a = null
		}
	}
	function c() {
		a.style.pixelTop = 0;
		a.style.pixelLeft = 0;
		a.style.pixelWidth = Math.max(Web.UI.getLayoutRoot().scrollWidth,
				Web.UI.getLayoutRoot().clientWidth);
		a.style.pixelHeight = Math.max(Web.UI.getLayoutRoot().scrollHeight,
				Web.UI.getLayoutRoot().clientHeight)
	}
	function d() {
		event.returnValue = e
	}
	return this
};
Web.UI.registerEvents(Web.UI.Dialog.Modal, "onshow", "onhide", "onmove",
		"onresize", "onclip", "onopacitychanged", "oncontentschanged",
		"oninvalidate");
Web.UI.Dialog.Modal.registerClass("Web.UI.Dialog.Modal", "Web.UI.Dialog");
Web.UI.Menu = function() {
	Web.UI.Menu.initializeBase(this, arguments);
	var c = this, b = null, a = null;
	e();
	c.initialize = e;
	function e() {
		if (null != b)
			return;
		Web.UI.Dialog.getBaseMethod(c, "initialize", "Web.UI.Dialog")
				.call(this);
		b = new $Memory.Groups;
		a = {};
		a.list = b.create(null).Nodes.create("ul", {
					className : c.constructor.applyClass(true)
				}, {}, Web.UI.getContainer());
		b.create(null).Events.register(a.list, {
					onkeydown : l
				});
		b.create(null).Events.register(a.list, {
					onmouseenter : i
				});
		b.create(null).Events.register(a.list, {
					onmouseleave : j
				});
		b.create(null).Events.register(a.list, {
					onkeypress : g
				});
		c.setContents(a.list);
		a.items = []
	}
	this.dispose = function(d) {
		Web.UI.Dialog.getBaseMethod(c, "dispose", "Web.UI.Dialog")
				.call(this, d);
		if (b) {
			b.dispose();
			a = null;
			b = null
		}
	};
	this.addItems = function(e) {
		for (var d = 0; d < e.length; d++) {
			b.create("items").Properties.register(e[d]);
			a.items.push(e[d]);
			var g = b.create(null).Nodes.create("li", {}, {
						position : "relative"
					}, a.list, "items"), f = a.items[d].render(c);
			b.create("items").Nodes.register(f);
			g.appendChild(f);
			b.create("items").Events.register(a.items[d], {
						onmouseleave : h
					});
			b.create("items").Events.register(a.items[d], {
						onmouseenter : k
					});
			b.create("items").Events.register(a.items[d], {
						onclick : n
					})
		}
	};
	this.clearItems = function() {
		b.create("items").dispose();
		a.items = [];
		c.render()
	};
	this.hide = function() {
		if (b) {
			c.fire("onclose", c);
			if (b) {
				b.create("show").dispose();
				if (a.last)
					a.last.hideSubMenu();
				clearTimeout(a.timeoutHide);
				clearTimeout(a.timeoutShow);
				Web.UI.Menu.getBaseMethod(c, "hide", "Web.UI.Dialog").call(c)
			}
		}
	};
	this.show = function() {
		Web.UI.Menu.getBaseMethod(c, "show", "Web.UI.Dialog").call(c);
		setTimeout(f, 0)
	};
	this.render = function() {
	};
	function f() {
		if (b)
			b.create("show").Events.register(document.body, {
						oncontextmenu : c.hide
					})
	}
	function l() {
		switch (event.keyCode) {
			case 37 :
				if (c.parentMenu)
					c.hide()
		}
	}
	function i() {
		c.fire("onmouseenter", c)
	}
	function j() {
		clearTimeout(a.timeoutHide);
		clearTimeout(a.timeoutShow);
		c.fire("onmouseleave", c)
	}
	function m() {
		d();
		if (a.current && a.current.isParentMenu()) {
			a.current.showSubMenu();
			a.last = a.current
		}
	}
	function h(b) {
		if (b.Package && b.Package.isParentMenu() && b.Package != a.last)
			if (a.last == b.Package)
				clearTimeout(a.timeoutHide)
	}
	function k(b) {
		a.timeoutHide = setTimeout(d, 500);
		if (b.Package && b.Package.isParentMenu()) {
			a.current = b.Package;
			a.timeoutShow = setTimeout(m, 500)
		} else
			clearTimeout(a.timeoutShow)
	}
	function d() {
		if (a && a.last)
			a.last.hideSubMenu()
	}
	function n(b) {
		if (a.last && a.last == b.Package) {
			clearTimeout(a.timeoutHide);
			clearTimeout(a.timeoutShow)
		} else
			d();
		a.current = b.Package
	}
	function g() {
		if (event.keyCode == 27)
			c.hide()
	}
	Web.UI.registerAllBaseMethods(Web.UI.Menu, this)
};
Web.UI.registerEvents(Web.UI.Menu, "onmouseenter", "onmouseleave", "onclose");
Web.UI.Menu.registerClass("Web.UI.Menu", "Web.UI.Dialog");
Web.UI.Menu.TextItem = function(m, k) {
	var b = null, a, l, j, c = this, e = null;
	this.getContext = function() {
		return k
	};
	function d() {
		if (b) {
			a.focus();
			b.setPadding(a.offsetTop, null);
			b.display(e.getOwner());
			c.fire("onexpand", c)
		} else
			c.fire("onclick", c);
		try {
			if (window.event && window.event.type)
				window.event.returnValue = false
		} catch (d) {
		}
		return false
	}
	function h() {
		c.fire("onmouseenter", c);
		a.className += " hover";
		try {
			a.focus()
		} catch (b) {
		}
	}
	function i() {
		a.className = a.className.removeSpaceDelimitedString("hover");
		c.fire("onmouseleave", c)
	}
	function g() {
		d();
		event.cancelBubble = true;
		return false
	}
	this.render = function(l) {
		e = l;
		if (!a) {
			a = document.createElement("A");
			a.className = Web.UI.Menu.TextItem.applyClass(false);
			var j = document.createElement("span");
			j.className = "ctxtMargin";
			j.innerHTML = "&nbsp;";
			a.appendChild(j);
			var c = document.createElement("span");
			c.className = "ctxtContext";
			a.href = "#";
			c.innerText = m;
			a.appendChild(c);
			a.attachEvent("onmouseenter", h);
			a.attachEvent("onmouseleave", i);
			if (b) {
				var k = document.createElement("span");
				k.innerHTML = "&gt;";
				k.className = "ctxtMore";
				a.appendChild(k);
				a.attachEvent("oncontextmenu", g);
				a.attachEvent("onkeydown", f)
			}
			a.attachEvent("onclick", d)
		}
		return a
	};
	function f() {
		switch (event.keyCode) {
			case 39 :
				a.click()
		}
	}
	this.isParentMenu = function() {
		return !!b
	};
	this.hideSubMenu = function() {
		if (this.isParentMenu())
			b.hide()
	};
	this.showSubMenu = function() {
		d()
	};
	this.addMenu = function(a) {
		b = a;
		b.setDock(Web.UI.Popup.VDock.Top, Web.UI.Popup.HDock.Right);
		a.parentMenu = this
	};
	this.dispose = function() {
		if (b)
			b.dispose();
		if (a) {
			a.detachEvent("onclick", d);
			a.detachEvent("onkeydown", f);
			a.detachEvent("onmouseenter", h);
			a.detachEvent("onmouseleave", i);
			a.detachEvent("oncontextmenu", g)
		}
		clearTimeout(l);
		clearTimeout(j);
		e = a = b = null
	}
};
Web.UI.registerEvents(Web.UI.Menu.TextItem, "onmouseenter", "onmouseleave",
		"onexpand", "onhover", "onclick");
Web.UI.Menu.TextItem.registerClass("Web.UI.Menu.TextItem");
Web.UI.Menu.Rule = function() {
	var e = null, a, d = this, c = null;
	this.render = function(d) {
		c = d;
		if (!a) {
			a = document.createElement("hr");
			a.size = "1";
			a.className = Web.UI.Menu.Rule.applyClass(false);
			a.attachEvent("onclick", b)
		}
		return a
	};
	function b() {
		d.fire("onclick", d)
	}
	this.isParentMenu = function() {
		return false
	};
	this.hideSubMenu = function() {
	};
	this.showSubMenu = function() {
	};
	this.addMenu = function() {
	};
	this.dispose = function() {
		if (a)
			a.detachEvent("onclick", b);
		c = a = e = null
	}
};
Web.UI.registerEvents(Web.UI.Menu.Rule, "onmouseenter", "onmouseleave",
		"onexpand", "onhover", "onclick");
Web.UI.Menu.Rule.registerClass("Web.UI.Menu.Rule");
registerNamespace("Web.UI.Binding");
Web.UI.Popup.Tooltip = function(a, d, h) {
	Web.UI.Popup.Tooltip.initializeBase(this);
	var c = null, b = this, f = null;
	function i() {
		b.display(a, true)
	}
	this.hide = function() {
		Web.UI.Popup.Tooltip.getBaseMethod(b, "hide", "Web.UI.Popup")
				.call(this);
		clearTimeout(c)
	};
	function e() {
		b.hide()
	}
	function g() {
		clearTimeout(c);
		c = setTimeout(i, d)
	}
	this.display = function(c) {
		f = Web.UI.Popup.Tooltip.getBaseMethod(b, "display", "Web.UI.Popup")
				.call(this, a, c);
		f.className += " Web_UI_Popup_Tooltip"
	};
	this.setDock(Web.UI.Popup.VDock.Bottom, Web.UI.Popup.HDock.Left);
	this.setAnchor(Web.UI.Popup.VAnchor.Top, Web.UI.Popup.HAnchor.Left);
	if (h)
		this.setContents(h);
	if (!d)
		d = 500;
	a.attachEvent("onmousemove", g);
	a.attachEvent("onmouseout", e);
	a.attachEvent("onmousedown", e);
	this.initialize();
	this.dispose = function() {
		Web.UI.Popup.Tooltip.getBaseMethod(b, "dispose", "Web.UI.Popup")
				.call(this);
		a.detachEvent("onmousemove", g);
		a.detachEvent("onmouseout", e);
		f = null;
		clearTimeout(c)
	}
};
Web.UI.Popup.Tooltip.registerClass(null, "Web.UI.Popup");
registerNamespace("Web.UI.Binding");
Web.UI.Binding.Tooltip = function(d, a) {
	Web.UI.Binding.Tooltip.initializeBase(this, arguments);
	a = this.getParameters(a);
	var b, c = this;
	this.initialize = function(e) {
		Web.UI.Binding.Tooltip.getBaseMethod(c, "initialize",
				"Web.Bindings.Base").call(this, e);
		b = new Web.UI.Popup.Tooltip(d, a.timeout);
		var f = a.mode == "text";
		b.setContents(a.tip.toString(), f)
	};
	this.dispose = function(a) {
		Web.UI.Binding.Tooltip.getBaseMethod(c, "dispose", "Web.Bindings.Base")
				.call(this, a);
		b.dispose()
	}
};
Web.UI.Binding.Tooltip.registerClass("Web.UI.Binding.Tooltip",
		"Web.Bindings.Base");
Web.UI.Binding.Tooltip.Params = new $Enum("tip", "mode", "timeout");
registerNamespace("Web.Accessibility");
Web.Accessibility._Wrap = new function() {
	function a() {
		if (event.srcElement.tagName == "SELECT")
			return false
	}
	function b() {
		document.detachEvent("onclick", a)
	}
	document.attachEvent("onclick", a);
	$Runtime.onunload.attach(b)
};
registerNamespace("Web.UI.Utilities");
Web.UI.Utilities.isRightToLeftMarket = function() {
	return document.body.currentStyle
			? "rtl" === document.body.currentStyle.direction
			: false
};
Web.Animation = {
	Initialize : function() {
		Web.Animation.Timer = new Web.Animation.Timer;
		Web.Animation.Easing.Initialize();
		$Runtime.onunload.attach(Web.Animation.Dispose)
	},
	Dispose : function() {
		Web.Animation.Timer.stop()
	},
	Timer : function() {
		var c = [null, null], f = [30, 11], b = this, a = [];
		this.add = this.attach = function(c) {
			a.push(c);
			if (1 == a.length)
				b.start()
		};
		this.remove = this.detach = function(c) {
			a.remove(c);
			if (a.length == 0)
				b.stop()
		};
		this.getTicks = function() {
			return (new Date).valueOf()
		};
		this.start = function() {
			c.forEach(e, this)
		};
		this.stop = function() {
			a = [];
			c.forEach(d, this)
		};
		function g() {
			var d = b.getTicks();
			for (var c = 0; c < a.length; c++)
				a[c](d)
		}
		function e(c, a, b) {
			if (!b[a])
				b[a] = window.setInterval(g, f[a])
		}
		function d(c, b, a) {
			window.clearInterval(c);
			a[b] = null
		}
	},
	Animator : function(a, g, h) {
		var c = this, e = null, b = false, d = false;
		this.reverse = function() {
			c.stop();
			b = true;
			c.start()
		};
		this.start = function() {
			d = true;
			e = Web.Animation.Timer.getTicks();
			Web.Animation.Timer.attach(f)
		};
		this.stop = function() {
			Web.Animation.Timer.detach(f);
			d = false;
			b = false
		};
		this.isRunning = function() {
			return d
		};
		function f(e) {
			var d = c.getCurrent(e);
			if (b && d == 0 || d == a)
				c.stop();
			h(g(d / a))
		}
		function i(b) {
			if (b <= 0)
				return 0;
			if (b >= a)
				return a;
			return b
		}
		this.getCurrent = function(c) {
			return i(b ? a - c - e : c - e)
		}
	},
	Easing : {
		_this : this,
		Initialize : function() {
			var a = 10;
			this.Linear = this.Poly(1);
			this.QuadraticInOut = this.InOut(this.Poly(2), .5);
			this.CircularInOut = this.InOut(this.Circle(), .5);
			this.ExponentialInOut = this.InOut(this.Exponent(2, a), 4 / a)
		},
		Dispose : function() {
		},
		Reverse : function(a) {
			return function(b) {
				return 1 - a(1 - b)
			}
		},
		InOut : function(b, a) {
			a = a || .5;
			var c = this.Reverse(b);
			return function(d) {
				if (d < a)
					return (1 - a) * b(d / a);
				return 1 - a + a * c((d - a) / (1 - a))
			}
		},
		Poly : function(a) {
			return function(b) {
				return Math.pow(b, a)
			}
		},
		Sine : function(a) {
			a = a || 2;
			return function(a) {
				return 1 - Math.cos(a * Math.PI / 2)
			}
		},
		Circle : function() {
			return function(a) {
				return -(Math.sqrt(1 - a * a) - 1)
			}
		},
		Exponent : function(b, a) {
			b = b || 2;
			a = a || 10;
			var c = Math.pow(b, -a), d = 1 - c;
			return function(e) {
				return (Math.pow(b, a * (e - 1)) - c) / d
			}
		},
		Back : function(a, b) {
			a = a || 2;
			b = b || this.ExponentialInOut;
			return function(c) {
				return b(c) * ((a + 1) * c - a)
			}
		}
	}
};
Web.Animation.Initialize();
if ($Network.registerScript)
	$Network.registerScript("coreui.js")