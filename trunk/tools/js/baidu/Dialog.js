var Fe = Fe || {
	version : "20080809",
	emptyFn : function() {
	}
};
Fe.path = "/js/Dialog/";
Fe.inherit = function(H, D, B) {
	var G = H.prototype;
	var F = function() {
	};
	F.prototype = D.prototype;
	var E = H.prototype = new F();
	if (typeof B == "string") {
		E._className = B
	}
	for (var A in G) {
		E[A] = G[A]
	}
	H.prototype.constructor = G.constructor;
	G = null;
	return E
};
(function() {
	var A = 0;
	var B = {};
	Fe.BaseClass = function(C) {
		B[(this.hashCode = (C || Fe.BaseClass.guid()))] = this
	};
	Fe.inherit(Fe.BaseClass, Object);
	Fe.BaseClass.guid = function() {
		return "mz_" + (A++).toString(36)
	};
	window.Instance = Fe.instance = Fe.I = function(C) {
		return B[C]
	};
	Fe.BaseClass.prototype.dispose = function() {
		if (this.hashCode) {
			delete B[this.hashCode]
		}
		for (var C in this) {
			if (typeof this[C] != "function") {
				delete this[C]
			}
		}
		if (navigator.userAgent.indexOf("MSIE") > 0 && !window.opera) {
			setTimeout(function() {
						CollectGarbage()
					}, 1)
		}
	};
	Fe.BaseClass.prototype.getHashCode = function() {
		if (!this.hashCode) {
			B[(this.hashCode = Fe.BaseClass.guid())] = this
		}
		return this.hashCode
	};
	Fe.BaseClass.prototype.decontrol = function() {
		delete B[this.hashCode]
	};
	Fe.BaseClass.prototype.toString = function() {
		return "[object " + (this._className || "Object") + "]"
	}
})();
Fe.BaseEvent = function(A, B) {
	this.type = A;
	this.target = B || null
};
Fe.inherit(Fe.BaseEvent, Object, "Fe.BaseEvent");
Fe.BaseEvent.prototype.currentTarget = null;
Fe.BaseEvent.prototype.srcElement = null;
Fe.BaseEvent.prototype.returnValue = true;
Fe.BaseClass.prototype.addEventListener = function(C, B) {
	if (typeof B != "function") {
		throw new Error(this + " addEventListener: " + B + " is not a function")
	}
	var A = this._listeners;
	if (!A) {
		A = this._listeners = {}
	}
	var D = B.hashCode || (B.hashCode = Fe.BaseClass.guid());
	if (typeof A[C] != "object") {
		A[C] = {
			_size : 0
		}
	}
	A[C][D] = B;
	A[C]["_size"]++
};
Fe.BaseClass.prototype.removeEventListener = function(C, B) {
	var A = this._listeners;
	if (!A) {
		A = this._listeners = {}
	}
	if (!A[C]) {
		return
	}
	var D = B.hashCode || (B.hashCode = Fe.BaseClass.guid());
	if (A[C][D]) {
		delete A[C][D];
		A[C]["_size"]--
	}
	if (A[C]["_size"] <= 0) {
		delete A[C]
	}
};
Fe.BaseClass.prototype.dispatchEvent = function(C) {
	var B = this._listeners;
	if (!B) {
		B = this._listeners = {}
	}
	var A = C.type;
	C.target = C.srcElement = C.target || C.srcElement || this;
	C.currentTarget = this;
	if (typeof this[A] == "function") {
		this[A](C)
	}
	if (typeof B[A] == "object") {
		for (var D in B[A]) {
			if (typeof B[A][D] == "function") {
				B[A][D].call(null, C)
			}
		}
	}
	return C.returnValue
};
Fe.G = function() {
	for (var A = [], B = arguments.length - 1; B > -1; B--) {
		var C = arguments[B];
		A[B] = null;
		if (typeof C == "object" && C && C.dom) {
			A[B] = C.dom
		} else {
			if ((typeof C == "object" && C && C.tagName) || C == window
					|| C == document) {
				A[B] = C
			} else {
				if (typeof C == "string" && (C = document.getElementById(C))) {
					A[B] = C
				}
			}
		}
	}
	return A.length < 2 ? A[0] : A
};
Fe.extend = function(F, D) {
	if (F && D && typeof(D) == "object") {
		for (var E in D) {
			F[E] = D[E]
		}
		var C = ["constructor", "hasOwnProperty", "isPrototypeOf",
				"propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
		for (var A = 0, B; A < C.length; A++) {
			B = C[A];
			if (Object.prototype.hasOwnProperty.call(D, B)) {
				F[B] = D[B]
			}
		}
	}
	return F
};
Fe.isIE = /MSIE (\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$1 : 0;
Fe.trim = function(A) {
	return A.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
};
Fe.removeClassName = function(B, C) {
	if (!(B = Fe.G(B))) {
		return
	}
	var A = Fe.trim, D = new RegExp("(^|\\s{1,})" + A(C) + "(\\s{1,}|$)", "g");
	B.className = A(B.className.replace(D, "$2"))
};
Fe.rc = Fe.removeClassName;
Fe.addClassName = function(C, D) {
	if (!(C = Fe.G(C))) {
		return
	}
	var A = C.className.split(" "), B = Fe.trim;
	if (!new RegExp("(^|\\s{1,})" + B(D) + "(\\s{1,}|$)").test(C.className)) {
		C.className = B(A.concat(D).join(" "))
	}
};
Fe.ac = Fe.addClassName;
Fe.format = function(H, J) {
	if (arguments.length > 1) {
		var E = Fe.format, G = /([.*+?^=!:${}()|[\]\/\\])/g, F = (E.left_delimiter || "{")
				.replace(G, "\\$1"), A = (E.right_delimiter || "}").replace(G,
				"\\$1");
		var C = E._r1
				|| (E._r1 = new RegExp("#" + F + "([^" + F + A + "]+)" + A, "g")), B = E._r2
				|| (E._r2 = new RegExp("#" + F + "(\\d+)" + A, "g"));
		if (typeof(J) == "object") {
			return H.replace(C, function(K, M) {
						var L = J[M];
						if (typeof L == "function") {
							L = L(M)
						}
						return typeof(L) == "undefined" ? "" : L
					})
		} else {
			if (typeof(J) != "undefined") {
				var I = Array.prototype.slice.call(arguments, 1);
				var D = I.length;
				return H.replace(B, function(K, L) {
							L = parseInt(L, 10);
							return (L >= D) ? K : I[L]
						})
			}
		}
	}
	return H
};
Fe.format.delimiter = function(C, A) {
	var B = Fe.format;
	B.left_delimiter = C || "{";
	B.right_delimiter = A || C || "}";
	B._r1 = B._r2 = null
};
Fe.body = function() {
	var A = 0, I = 0, E = 0, C = 0, B = 0, J = 0;
	var F = window, D = document, G = D.documentElement;
	A = G.clientWidth || D.body.clientWidth;
	I = F.innerHeight || G.clientHeight || D.body.clientHeight;
	C = D.body.scrollTop || G.scrollTop;
	E = D.body.scrollLeft || G.scrollLeft;
	B = Math.max(D.body.scrollWidth, G.scrollWidth || 0);
	J = Math.max(D.body.scrollHeight, G.scrollHeight || 0, I);
	return {
		scrollTop : C,
		scrollLeft : E,
		documentWidth : B,
		documentHeight : J,
		viewWidth : A,
		viewHeight : I
	}
};
Fe.each = function(E, A) {
	if (typeof A != "function") {
		return E
	}
	if (E) {
		if (E.length === undefined) {
			for (var B in E) {
				A.call(E[B], E[B], B)
			}
		} else {
			for (var C = 0, D = E.length; C < D; C++) {
				A.call(E[C], E[C], C)
			}
		}
	}
	return E
};
Fe.show = function() {
	Fe.each(arguments, function(A) {
				if (A = Fe.G(A)) {
					A.style.display = ""
				}
			})
};
Fe.hide = function() {
	Fe.each(arguments, function(A) {
				if (A = Fe.G(A)) {
					A.style.display = "none"
				}
			})
};
Fe.on = function(C, B, A) {
	if (!(C = Fe.G(C))) {
		return C
	}
	B = B.replace(/^on/, "").toLowerCase();
	if (C.attachEvent) {
		C[B + A] = function() {
			A.call(C, window.event)
		};
		C.attachEvent("on" + B, C[B + A])
	} else {
		C.addEventListener(B, A, false)
	}
	return C
};
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.insertAdjacentHTML = function(A, B) {
		var C = this.ownerDocument.createRange();
		C.setStartBefore(this);
		C = C.createContextualFragment(B);
		switch (A) {
			case "beforeBegin" :
				this.parentNode.insertBefore(C, this);
				break;
			case "afterBegin" :
				this.insertBefore(C, this.firstChild);
				break;
			case "beforeEnd" :
				this.appendChild(C);
				break;
			case "afterEnd" :
				if (!this.nextSibling) {
					this.parentNode.appendChild(C)
				} else {
					this.parentNode.insertBefore(C, this.nextSibling)
				}
				break
		}
	}
}
Fe.Dom = {};
Fe.Dom.loadCssFile = function(C, E) {
	if (/\w+\.\w+(\?|$)/.test(C)) {
		if (!(typeof(E) == "string" && E !== "")) {
			E = "BdCss_" + C.replace(/\W/g, "")
		}
		var D = document.createElement("LINK");
		D.href = C;
		D.id = E;
		D.type = "text/css";
		D.rel = "Stylesheet";
		var B = document.getElementsByTagName("HEAD")[0];
		if (!B) {
			var A = document.getElementsByTagName("body")[0];
			B = document.createElement("head");
			A.parentNode.insertBefore(B, A)
		}
		B.insertBefore(D, B.firstChild)
	}
};
Fe.DialogFactory = function() {
	Fe.BaseClass.call(this);
	this.active = false;
	this.resizable = false;
	Fe.DialogFactory.dialogs.push(this)
};
Fe.inherit(Fe.DialogFactory, Fe.BaseClass, "Fe.DialogFactory");
Fe.DialogFactory.prototype.setActive = function() {
	var A = Fe.DialogFactory.currentDialog;
	if (A == this) {
		return
	}
	if (A) {
		var B = Fe.G("FeDialog_" + A.hashCode).style;
		B.zIndex = parseInt(B.zIndex) - 4000;
		Fe.rc("FeDialog_" + A.hashCode, "focused_")
	}
	Fe.ac("FeDialog_" + this.hashCode, "focused_");
	Fe.DialogFactory.currentDialog = this;
	var B = Fe.G("FeDialog_" + this.hashCode).style;
	B.zIndex = parseInt(B.zIndex) + 4000
};
Fe.DialogFactory.dialogs = [];
Fe.DialogFactory.currentDialog = null;
Fe.DialogFactory.cssFilePath = Fe.path + "FeDialog.css";
Fe.DialogFactory.png = function() {
	return (Fe.isIE >= 7 || Fe.isIE <= 0)
};
Fe.DialogFactory.prototype.create = function() {
	Fe.Dom.loadCssFile(Fe.DialogFactory.cssFilePath, "CSS_Fe.Dialog");
	var A = [
			"<div ",
			'id="FeDialog_#{0}" ',
			'class="FeDialog" ',
			'style="position:absolute;z-index:',
			(52000 + Fe.DialogFactory.dialogs.length),
			';display:none" ',
			"onclick=\"Fe.I('#{0}').click(event)\">",
			'<div class="FeDialog_inner',
			(Fe.DialogFactory.png() ? " png_" : ""),
			'">',
			'<table class="FeDialog_wrapper" border="0" cellpadding="0" cellspacing="0">',
			'<tr class="top_">',
			'<td class="left_ corner_">&nbsp;</td>',
			'<td class="center_ vertical_">&nbsp;</td>',
			'<td class="right_ corner_">&nbsp;</td>',
			"</tr>",
			'<tr class="middle_">',
			'<td class="left_ horizontal_">&nbsp;</td>',
			'<td class="center_ midland_">',
			'<div class="FeDialog_container">',
			'<div id="FeDialogCaption_#{0}" class="FeDialogCaption" onselectstart="return false">',
			'<div id="FeDialogControlBar_#{0}" class="FeDialogControlBar">',
			'<a id="FeDialogButtonClose_#{0}" class="close_" href="#" onfocus="this.blur();" onclick="Fe.I(\'#{0}\').onclose(); return false;">',
			'<img alt="close" src="',
			Fe.path,
			'blank.gif" />',
			"</a>",
			"</div>",
			'<div id="FeDialogCaptionText_#{0}" onmousedown="Fe.I(\'#{0}\').setActive()" class="FeDialogCaptionText">FeDialog</div>',
			"</div>",
			'<div id="FeDialogContent_#{0}" class="FeDialogContent">&nbsp;</div>',
			'<div id="FeDialogButtonBar_#{0}" class="FeDialogButtonBar">',
			'<input id="FeDialogButtonAccept_#{0}" type="button" value="\u786e \u5b9a" onclick="Fe.I(\'#{0}\').onaccept()" class="accept_" />',
			'<input id="FeDialogButtonCancel_#{0}" type="button" value="\u53d6 \u6d88" onclick="Fe.I(\'#{0}\').oncancel()" class="cancel_" />',
			"</div>",
			'<div id="FeDialogStatusBar_#{0}" class="FeDialogStatusBar" style="display:none">&nbsp;</div>',
			"</div>", "</td>", '<td class="right_ horizontal_">&nbsp;</td>',
			"</tr>", '<tr class="bottom_">',
			'<td class="left_ corner_">&nbsp;</td>',
			'<td class="center_ vertical_">&nbsp;</td>',
			'<td class="right_ corner_">&nbsp;</td>', "</tr>", "</table>",
			"</div>", "</div>"];
	A = Fe.format(A.join(""), this.hashCode);
	if (document.body) {
		document.body.insertAdjacentHTML("afterBegin", A)
	} else {
		document.write(A)
	}
};
new Fe.DialogFactory().create();
Fe.DialogFactory.prototype.show = function(op) {
	var me = this;
	function _(id) {
		return Fe.G(id + "_" + me.hashCode)
	}
	if (op.icon) {
		_("FeDialogCaption").style.background = "url(" + op.icon
				+ ") no-repeat left 3px";
		_("FeDialogCaptionText").style.paddingLeft = "18px"
	}
	_("FeDialog").style.font = op.font;
	_("FeDialogCaptionText").innerHTML = op.title;
	_("FeDialogCaption").style.display = op.titlebar ? "" : "none";
	_("FeDialogStatusBar").style.display = op.statusbar ? "" : "none";
	_("FeDialogControlBar").style.display = op.controlbar ? "" : "none";
	_("FeDialogButtonBar").style.display = op.buttonbar ? "" : "none";
	_("FeDialogButtonClose").style.display = op.buttonClose ? "" : "none";
	_("FeDialogButtonAccept").style.display = op.buttonAccept ? "" : "none";
	_("FeDialogButtonCancel").style.display = op.buttonCancel ? "" : "none";
	_("FeDialogButtonBar").style.textAlign = op.buttonbarAlign;
	_("FeDialogButtonAccept").value = op.buttonAcceptValue;
	_("FeDialogButtonCancel").value = op.buttonCancelValue;
	with (_("FeDialogContent").style) {
		width = op.width;
		height = op.height;
		overflow = op.overflow
	}
	if (op.contentType.toLowerCase() == "htmlelement" && !Fe.G(op.content)) {
		op.contentType = "HTMLString"
	}
	switch (op.contentType.toLowerCase()) {
		case "htmlstring" :
			_("FeDialogContent").innerHTML = op.content;
			break;
		case "htmlelement" :
			var e = Fe.G(op.content);
			this.opContentDisplay = e.style.display;
			e
					.insertAdjacentHTML(
							"beforeBegin",
							"<input type='button' id='FeDialogFactoryInset_"
									+ this.hashCode
									+ "' style='width:"
									+ e.offsetWidth
									+ "px; height:"
									+ e.offsetHeight
									+ "px; padding:0; margin:0; border:none; visibility:hidden' />");
			_("FeDialogContent").innerHTML = "";
			e.style.display = "";
			_("FeDialogContent").appendChild(e);
			break;
		default :
			_("FeDialogContent").innerHTML = "<iframe frameborder='0' allowTransparency='true' scrolling='"
					+ op.scrolling
					+ "' id='FeDialogIframe_"
					+ this.hashCode
					+ "' name='FeDialog_"
					+ this.hashCode
					+ "' style='width:"
					+ (op.width || "100%")
					+ "; height:"
					+ (op.height || "100%")
					+ "' src='"
					+ op.content
					+ "'></iframe>";
			break
	}
	var a = Fe.trim(op.position).toLowerCase().split(/\s/);
	var body = Fe.body();
	Fe.show("FeDialog_" + this.hashCode);
	if (Fe.isIE && _("FeDialogContent").offsetWidth < 136) {
		_("FeDialogContent").style.width = "130px"
	}
	if (Fe.isIE && _("FeDialogContent").offsetHeight < 50) {
		_("FeDialogContent").style.height = "50px"
	}
	var top = (Math.max(parseInt((body.viewHeight - _("FeDialog").offsetHeight)
					/ 2), 0) + body.scrollTop)
			+ "px";
	var left = (Math.max(parseInt((body.viewWidth - _("FeDialog").offsetWidth)
					/ 2), 0) + body.scrollLeft)
			+ "px";
	if (a.length == 1) {
		if (a[0] == "" || a[0] == "center") {
		} else {
			if (a[0] == "top") {
				top = body.scrollTop + "px"
			} else {
				if (a[0] == "bottom") {
					top = (body.scrollTop + body.viewHeight - _("FeDialog").offsetHeight)
							+ "px"
				} else {
					if (a[0] == "left") {
						left = body.scrollLeft + "px"
					} else {
						if (a[0] == "right") {
							left = (body.scrollLeft + body.viewWidth - _("FeDialog").offsetWidth)
									+ "px"
						} else {
							if (/\d+%/.test(a[0])) {
								top = a[0]
							} else {
								if (/(\d+)(cm|mm|in|pt|pc|px|em|ex)?/
										.test(a[0])) {
									top = parseInt(RegExp.$1) + RegExp.$2
											|| "px"
								}
							}
						}
					}
				}
			}
		}
	} else {
		if (a.length > 1) {
			if (/\d+%/.test(a[0])) {
				top = a[0]
			} else {
				if (/(\d+)(cm|mm|in|pt|pc|px|em|ex)?/.test(a[0])) {
					top = parseInt(RegExp.$1) + RegExp.$2 || "px"
				}
			}
			if (/\d+%/.test(a[1])) {
				left = a[1]
			} else {
				if (/(\d+)(cm|mm|in|pt|pc|px|em|ex)?/.test(a[1])) {
					left = parseInt(RegExp.$1) + RegExp.$2 || "px"
				}
			}
			if (a[0] == "top" || a[1] == "top") {
				top = body.scrollTop + "px"
			}
			if (a[0] == "bottom" || a[1] == "bottom") {
				top = (body.scrollTop + body.viewHeight - _("FeDialog").offsetHeight)
						+ "px"
			}
			if (a[0] == "left" || a[1] == "left") {
				left = body.scrollLeft + "px"
			}
			if (a[0] == "right" || a[1] == "right") {
				left = (body.scrollLeft + body.viewWidth - _("FeDialog").offsetWidth)
						+ "px"
			}
		}
	}
	_("FeDialog").style.top = top;
	_("FeDialog").style.left = left;
	this.active = true
};
Fe.DialogFactory.prototype.hide = function(D) {
	Fe.hide("FeDialog_" + this.hashCode);
	var B = this;
	if (Fe.G("FeDialogFactoryInset_" + B.hashCode)) {
		var C = Fe.G("FeDialogFactoryInset_" + B.hashCode);
		var A = Fe.G("FeDialogContent_" + B.hashCode).childNodes[0];
		C.parentNode.insertBefore(A, C);
		C.parentNode.removeChild(C);
		A.style.display = B.opContentDisplay
	}
	if ("function" == typeof(D)) {
		D(B)
	}
	setTimeout(function() {
				B.active = false;
				B.setContent("&nbsp;");
				var E = Fe.G("FeDialogContent_" + B.hashCode);
				if (E) {
					E.style.width = E.style.height = E.style.overflow = ""
				}
			}, 50);
	clearTimeout(this.timer)
};
Fe.DialogFactory.prototype.dispose = function() {
	Fe.DialogFactory.dialogs = Fe.DialogFactory.dialogs.remove(this);
	Fe.BaseClass.prototype.dispose.call(this)
};
Fe.DialogFactory.prototype.setWidth = function(A) {
	var B;
	if (B = Fe.G("FeDialogContent_" + this.hashCode)) {
		B.style.width = A
	}
};
Fe.DialogFactory.prototype.setHeight = function(A) {
	var B;
	if (B = Fe.G("FeDialogContent_" + this.hashCode)) {
		B.style.height = A
	}
};
Fe.DialogFactory.prototype.setCaption = function(A) {
	Fe.G("FeDialogCaptionText_" + this.hashCode).value = A
};
Fe.DialogFactory.prototype.setContent = function(A) {
	Fe.G("FeDialogContent_" + this.hashCode).innerHTML = A
};
Fe.DialogFactory.prototype.setStatus = function(A) {
	Fe.G("FeDialogStatusText_" + this.hashCode).innerHTML = A
};
Fe.DialogFactory.prototype.click = function(A) {
	(window.event || A).cancelBubble = true;
	this.setActive()
};
Fe.DialogFactory.prototype.resizeBy = function() {
	var E = this, C = "FeDialogLayer_" + this.hashCode;
	Fe.G("FeDialogBgLayer_" + this.hashCode).style.width = Fe.G(C).offsetWidth
			+ "px";
	Fe.G("FeDialogBgLayer_" + this.hashCode).style.height = Fe.G(C).offsetHeight
			+ "px";
	if (Fe.isIE && Fe.G("FeDialogBgLayer_" + this.hashCode)) {
		if (Fe.isIE < 5.5) {
			Fe.G("FeDialogLayer_" + this.hashCode).style.width = "130px";
			Fe.G("FeDialog_" + this.hashCode).style.width = Fe
					.G("FeDialogLayer_" + this.hashCode).offsetWidth
					+ "px"
		}
		var D = Fe.G("FeDialogBgLayer_" + this.hashCode);
		if (D.rows[0].cells[0].currentStyle) {
			var B = parseInt(D.rows[0].cells[0].currentStyle.height);
			var A = parseInt(D.rows[2].cells[0].currentStyle.height);
			if (!isNaN(B) && !isNaN(A)) {
				D.rows[1].cells[1].style.height = (Math.max(
						Fe.G(C).offsetHeight - B - A, 12))
						+ "px"
			}
		}
	}
	if (window.opera
			&& Fe.G("FeDialogLayerTable_" + this.hashCode).offsetWidth < 130) {
		Fe.G("FeDialogLayerTable_" + this.hashCode).style.width = "130px"
	}
	this.timer = setTimeout(function() {
				E.resizeBy()
			}, 50)
};
Fe.DialogFactory.produce = function() {
	for (var A = 0, B = Fe.DialogFactory.dialogs.length; A < B; A++) {
		if (!Fe.DialogFactory.dialogs[A].active) {
			if (A == (B - 1)) {
				setTimeout(function() {
							new Fe.DialogFactory().create()
						}, 20)
			}
			return Fe.DialogFactory.dialogs[A]
		}
	}
	return null
};
Fe.on(document.body, "onkeydown", function(C) {
	var B = C.target || C.srcElement;
	if (!B) {
		return false
	}
	if (B.tagName.toLowerCase() == "textarea") {
		return false
	}
	var A = C.which || C.keyCode;
	if (Fe.DialogFactory.currentDialog && Fe.DialogFactory.currentDialog.active) {
		if (A == 27) {
			Fe.DialogFactory.currentDialog.oncancel()
		} else {
			if (A == 13) {
				Fe.DialogFactory.currentDialog.onaccept();
				try {
					C.keyCode = 0
				} catch (D) {
				}
				C.returnValue = false
			}
		}
	}
});
Fe.un = function(C, B, A) {
	if (!(C = Fe.G(C))) {
		return C
	}
	B = B.replace(/^on/, "").toLowerCase();
	if (C.attachEvent) {
		C.detachEvent("on" + B, C[B + A]);
		C[B + A] = null
	} else {
		C.removeEventListener(B, A, false)
	}
	return C
};
function BdLockWindow() {
	this.initialize()
}
BdLockWindow.prototype.initialize = function() {
	var B = BdLockWindow.element = document.createElement("DIV");
	B.id = BdLockWindow.id;
	var A = B.style;
	A.zIndex = 1;
	A.top = "0px";
	A.left = "0px";
	A.width = "100%";
	A.height = "100%";
	A.border = "none";
	A.display = "none";
	A.margin = 0;
	A.padding = 0;
	A.position = "absolute";
	A.backgroundColor = "#666699";
	A.backgroundImage = "url(" + Fe.path + "blank.gif)";
	document.body.insertBefore(B, document.body.firstChild);
	BdLockWindow.onResize()
};
BdLockWindow.onResize = function() {
	BdLockWindow.element.style.width = "100%";
	BdLockWindow.element.style.height = "100%";
	setTimeout(function() {
				var B = Fe.body();
				var A = B.documentWidth;
				var C = B.documentHeight;
				BdLockWindow.element.style.width = A + "px";
				BdLockWindow.element.style.height = C + "px"
			}, 10)
};
BdLockWindow._restore = function(A) {
	var C = document.getElementsByTagName(A);
	for (var B = C.length - 1; B > -1; B--) {
		C[B].style.visibility = C[B].getAttribute("att_BdLockWindow_v") || "";
		C[B].removeAttribute("att_BdLockWindow_v")
	}
};
BdLockWindow._safeguard = function(A) {
	var C = document.getElementsByTagName(A);
	for (var B = C.length - 1; B > -1; B--) {
		C[B].setAttribute("att_BdLockWindow_v", C[B].style.visibility, 0);
		C[B].style.visibility = "hidden"
	}
};
BdLockWindow.id = "BdLockWindow_" + new Date().getTime().toString(36);
BdLockWindow.lock = function(C) {
	var F = this;
	if (!F.instance) {
		F.instance = new BdLockWindow()
	}
	Fe.show(F.id);
	Fe.on(window, "onresize", F.onResize);
	var E = F.element.style;
	F.onResize();
	var G = Fe.extend({
				zIndex : 1,
				opacity : 0.5
			}, C || {});
	E.zIndex = G.zIndex;
	E.backgroundColor = G.backgroundColor || "#666699";
	if ("opacity" in E) {
		E.opacity = G.opacity
	} else {
		if ("MozOpacity" in E) {
			E.MozOpacity = G.opacity
		} else {
			if ("filter" in E) {
				E.filter = (E.filter || "").replace(/alpha\([^\)]*\)/gi, "")
						+ (G.opacity == 1 ? "" : "alpha(opacity=" + G.opacity
								* 100 + ")");
				E.zoom = 1
			}
		}
	}
	for (var B = ["SELECT", "OBJECT", "EMBED"], D = 0, A = B.length; D < A; D++) {
		this._safeguard(B[D])
	}
};
BdLockWindow.unlock = function() {
	if (!this.instance) {
		this.instance = new BdLockWindow();
		return
	}
	Fe.hide(this.id);
	Fe.un(window, "onresize", this.onResize);
	for (var B = ["SELECT", "OBJECT", "EMBED"], C = 0, A = B.length; C < A; C++) {
		this._restore(B[C])
	}
};
Fe.Dialog = function(A) {
	Fe.BaseClass.call(this);
	this.help = false;
	this.font = "normal 12px sans-serif";
	this.title = "Fe.Dialog";
	this.width = "";
	this.height = "";
	this.autofit = false;
	this.content = "&nbsp;";
	this.overflow = "visible";
	this.position = "center";
	this.titlebar = true;
	this.scrolling = "auto";
	this.buttonbar = false;
	this.statusbar = false;
	this.resizable = false;
	this.controlbar = true;
	this.buttonClose = true;
	this.contentType = "HTMLString";
	this.buttonAccept = false;
	this.buttonCancel = false;
	this.buttonbarAlign = "right";
	this.buttonAcceptValue = "\u786e \u5b9a";
	this.buttonCancelValue = "\u53d6 \u6d88"
};
Fe.inherit(Fe.Dialog, Fe.BaseClass, "Fe.Dialog");
Fe.Dialog.prototype.render = function(B, D) {
	if ("undefined" != typeof(B)) {
		this.content = B
	}
	if ("object" == typeof(D)) {
		Fe.extend(this, D)
	}
	if ("number" == typeof(this.width)) {
		this.width += "px"
	}
	if ("number" == typeof(this.height)) {
		this.height += "px"
	}
	var A = this, C = this.dialog = Fe.DialogFactory.produce();
	C.onaccept = function() {
		A.accept()
	};
	C.oncancel = function() {
		A.cancel()
	};
	C.onclose = function() {
		A.close()
	};
	C.onhelp = function() {
		A.help()
	};
	C.show(this);
	C.setActive();
	if (this.buttonbar && this.buttonAccept) {
		Fe.G("FeDialogButtonAccept_" + C.hashCode).focus()
	}
	if (this.locked) {
		BdLockWindow.lock({
					opacity : 0.4,
					backgroundColor : "#FFFFFF",
					zIndex : (52000 - 10)
				});
		this.addEventListener("onclose", function() {
					BdLockWindow.unlock()
				})
	}
	setTimeout(function() {
				A.dispatchEvent(new Fe.BaseEvent("onopen"))
			}, 10)
};
Fe.Dialog.prototype.setContent = function(A) {
	this.dialog.setContent(A)
};
Fe.Dialog.prototype.setCaption = function(A) {
	this.dialog.setCaption(A)
};
Fe.Dialog.prototype.setWidth = function(A) {
	this.dialog.setWidth(A)
};
Fe.Dialog.prototype.setHeight = function(A) {
	this.dialog.setHeight(A)
};
Fe.Dialog.prototype.getIframe = function() {
	return Fe.G("FeDialogIframe_" + this.dialog.hashCode)
};
Fe.Dialog.prototype.close = function() {
	var A = this, B = new Fe.BaseEvent("onclose");
	A.dispatchEvent(B);
	if (!B.returnValue) {
		return
	}
	this.dialog.hide(function() {
				A.dispose()
			})
};
Fe.Dialog.prototype.accept = function() {
	var A = new Fe.BaseEvent("onaccept");
	this.dispatchEvent(A);
	if (!A.returnValue) {
		return
	}
	this.close()
};
Fe.Dialog.prototype.cancel = function() {
	var A = new Fe.BaseEvent("oncancel");
	this.dispatchEvent(A);
	if (!A.returnValue) {
		return
	}
	this.close()
};
Fe.Dialog.prototype.help = function() {
	this.dispatchEvent(new Fe.BaseEvent("onhelp"))
};
if (Fe.isIE && Fe.isIE < 7) {
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch (e) {
	}
}
Fe.Dialog.close = function() {
	for (var B = 0, C = Fe.DialogFactory.dialogs.length; B < C; B++) {
		var A = Fe.DialogFactory.dialogs[B];
		if (A.active && typeof(A.onclose == "function")) {
			A.onclose()
		}
	}
};
Fe.Dialog.open = function(B, C) {
	var A = new Fe.Dialog();
	A.render(B, C);
	return A
};
Fe.Dialog.alert = function(A, B) {
	return this.open(A, Fe.extend({
						buttonbar : true,
						buttonAccept : true
					}, B || {}))
};
Fe.Dialog.confirm = function(A, B) {
	return this.open(A, Fe.extend({
						locked : true,
						buttonbar : true,
						buttonAccept : true,
						buttonCancel : true
					}, B || {}))
};
Fe.Dialog.showModalDialog = function(A, B) {
	return this.open(A, Fe.extend({
						locked : true,
						position : "center"
					}, B || {}))
};
Fe.Dialog.submit = function(B, D) {
	var A = this.open("about:blank", Fe.extend({
						contentType : "page"
					}, D || {}));
	var C = B.target;
	B.target = A.getIframe().name;
	B.submit();
	B.target = C;
	return A
};