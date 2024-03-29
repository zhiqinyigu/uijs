var _BdBrowser = {}, _Instance = {}, _BdElement = {}, _System = {};
_System.path = "/ui/scripts/CommentEditor/";
_System.imagePath = "http://img.baidu.com/hi/";
function _Bd$(A) {
	if (typeof A == "string") {
		return document.getElementById(A)
	}
	return A
}
_BdElement.addClassName = function(D, E) {
	var A = D.className.split(" ");
	var F = false;
	for (var C = 0, B = A.length; C < B; C++) {
		if (A[C] == E) {
			F = true;
			break
		}
	}
	if (!F) {
		D.className = A.concat(E).join(" ")
	}
};
_BdElement.removeClassName = function(A, B) {
	var C = new RegExp("(^| )" + B + "( |$)", "g");
	A.className = A.className.replace(C, "$2")
};
_BdElement._realLeftTop = function(C) {
	var B = parseInt(C.currentStyle.borderTopWidth);
	var A = parseInt(C.currentStyle.borderLeftWidth);
	return {
		left : isNaN(A) ? 0 : A,
		top : isNaN(B) ? 0 : B
	}
};
_BdElement.realOffset = function(G) {
	if (!G) {
		return null
	}
	var F = G, B = 0, H = 0, C = 0, D = 0, E = this.body();
	do {
		C += F.offsetLeft || 0;
		D += F.offsetTop || 0;
		if (_BdBrowser.ie && "tdthdiv".indexOf(F.tagName.toLowerCase()) > -1) {
			var A = this._realLeftTop(F);
			C += A.left;
			D += A.top
		}
		if (_BdBrowser.safari
				&& "tabletdth".indexOf(F.tagName.toLowerCase()) > -1) {
			var A = this._realLeftTop(F);
			C += A.left;
			D += A.top
		}
		F = F.offsetParent
	} while (F);
	if (!_BdBrowser.opera) {
		do {
			B += G.scrollLeft || 0;
			H += G.scrollTop || 0;
			G = G.offsetParent
		} while (G)
	}
	return {
		x : C - B + E.scrollLeft,
		y : D - H + E.scrollTop
	}
};
_BdElement.body = function() {
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
		scrollWidth : B,
		scrollHeight : J,
		clientWidth : A,
		clientHeight : I
	}
};
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.__defineGetter__("currentStyle", function() {
				return this.ownerDocument.defaultView.getComputedStyle(this,
						null)
			});
	HTMLElement.prototype.insertAdjacentHTML = function(A, B) {
		var C = this.ownerDocument.createRange();
		C.setStartBefore(this);
		C = C.createContextualFragment(B);
		this.insertAdjacentElement(A, C)
	};
	HTMLElement.prototype.insertAdjacentElement = function(A, B) {
		switch (A) {
			case "beforeBegin" :
				this.parentNode.insertBefore(B, this);
				break;
			case "afterBegin" :
				this.insertBefore(B, this.firstChild);
				break;
			case "beforeEnd" :
				this.appendChild(B);
				break;
			case "afterEnd" :
				if (!this.nextSibling) {
					this.parentNode.appendChild(B)
				} else {
					this.parentNode.insertBefore(B, this.nextSibling)
				}
				break
		}
	}
}
if (!window.attachEvent && window.addEventListener) {
	window.attachEvent = HTMLElement.prototype.attachEvent = document.attachEvent = function(
			B, D, C) {
		var A = C ? true : false;
		this.addEventListener(B.replace(/^on/i, "").toLowerCase(), D, A)
	};
	window.detachEvent = HTMLElement.prototype.detachEvent = document.detachEvent = function(
			B, D, C) {
		var A = C ? true : false;
		this.removeEventListener(B.replace(/^on/i, "").toLowerCase(), D, A)
	}
}
_System.extend = function(C, B) {
	for (var A in B) {
		C[A] = B[A]
	}
	return C
};
Function.prototype.Extends = function(A, C) {
	var E = this.prototype, B, D = this.prototype = new A();
	if (C) {
		D._className = C
	}
	for (B in E) {
		D[B] = E[B]
	}
	this.prototype.constructor = E.constructor;
	E = null;
	if (D.hashCode) {
		delete _Instance[D.hashCode]
	}
	return D
};
function uniqueID() {
	var B = function() {
		return Math.round(Math.random() * 2147483648)
	};
	var A = function() {
		return B().toString(36) + (B() ^ (new Date()).getTime()).toString(36)
	};
	return A() + A()
}
function loadCssFile(D) {
	var C = document;
	var A = C.body;
	var B = C.createElement("LINK");
	if (B && A) {
		B.href = D;
		B.type = "text/css";
		B.rel = "Stylesheet";
		A.insertBefore(B, A.firstChild)
	}
}
(function() {
	if (_BdBrowser.platform) {
		return
	}
	var A = window.navigator.userAgent;
	_BdBrowser.platform = window.navigator.platform;
	_BdBrowser.firefox = A.indexOf("Firefox") > 0;
	_BdBrowser.opera = typeof(window.opera) == "object";
	_BdBrowser.ie = !_BdBrowser.opera && A.indexOf("MSIE") > 0;
	_BdBrowser.mozilla = window.navigator.product == "Gecko";
	_BdBrowser.netscape = window.navigator.vendor == "Netscape";
	_BdBrowser.gecko = A.indexOf("Gecko") > -1 && A.indexOf("KHTML") == -1;
	_BdBrowser.safari = A.indexOf("Safari") > -1;
	if (_BdBrowser.firefox) {
		var B = /Firefox(\s|\/)(\d+(\.\d+)?)/
	} else {
		if (_BdBrowser.ie) {
			var B = /MSIE( )(\d+(\.\d+)?)/
		} else {
			if (_BdBrowser.opera) {
				var B = /Opera(\s|\/)(\d+(\.\d+)?)/
			} else {
				if (_BdBrowser.netscape) {
					var B = /Netscape(\s|\/)(\d+(\.\d+)?)/
				} else {
					if (_BdBrowser.safari) {
						var B = /Version(\/)(\d+(\.\d+)?)/
					} else {
						if (_BdBrowser.mozilla) {
							var B = /rv(\:)(\d+(\.\d+)?)/
						}
					}
				}
			}
		}
	}
	if ("undefined" != typeof(B) && B.test(A)) {
		_BdBrowser.version = parseFloat(RegExp.$2)
	}
})();
String.prototype.format = function() {
	if (arguments.length == 0) {
		return this
	}
	for (var B = this, A = 0; A < arguments.length; A++) {
		B = B.replace(new RegExp("\\{" + A + "\\}", "g"), arguments[A])
	}
	return B
};
var _BdPopupLayer = function() {
	_Instance[this.hashCode = uniqueID()] = this;
	this.busy = false;
	this.exclusive = false;
	this.autoFit = true;
	this.isOpen = false;
	this.defaultContent = "<nobr><div id='Content' nowrap='true' style='border:solid 1px #666666'></div></nobr>";
	this.hideTrigger = {
		onblur : true,
		onscroll : true,
		onmousedown : true
	};
	this.initialize()
};
_BdPopupLayer._layers = [];
_BdPopupLayer._focusOnLayer = false;
_System.extend(_BdPopupLayer.prototype, {
	initialize : function() {
		_BdPopupLayer._layers[_BdPopupLayer._layers.length] = this;
		var C = this;
		C.id = C.name = "_BdPopupLayer_" + C.hashCode;
		this.onBlurHandler = function() {
			setTimeout(function() {
						if (!_BdPopupLayer._focusOnLayer) {
							C.hide()
						}
					}, 10)
		};
		this.onClickHandler = function() {
			C.hide()
		};
		this.onScrollHandler = function() {
			C.hide()
		};
		var D = "<iframe frameborder='0' name='"
				+ C.name
				+ "' style='position:absolute; z-index:65001; display:none;' scrolling='no' id='"
				+ C.id + "'></iframe>";
		if (!document.body) {
			document.write(D)
		} else {
			document.body.insertAdjacentHTML("afterBegin", D)
		}
		var A = document.getElementsByTagName("IFRAME");
		for (var B = 0; B < A.length; B++) {
			if (A[B].id == this.id) {
				this.layer = A[B]
			}
		}
		frames[this.name].document
				.write("            <html>                <head>                    <style type='text/css'>                        html *{-moz-user-select:none;}                        body,td,th{font:12px Geneva, Arial, sans-serif; cursor:default;}                        body{margin:0px; background-color:#FFF;}                        .tabPanel{height:253px;width:344px;}                        .tabContent{overflow-y:auto;float:left;width:280px;height:253px;}                        .tabContentHide{display:none;width:263px;height:253px}                        .tabContentShow{display:block;width:263px;height:253px}                        .tabMenu{float:right;width:64px;height:140px;text-align:center;line-height:24px;height:24px;font:'\u5b8b\u4f53';font-size:12px;}                        .tabMenuHover{background:#E8E8FD;}                        .tabMenuNoHover{cursor:pointer;}                        .tableCell{background:#d7d79f;}                        .tableCellOver{background:#ffffbe;}                        .reviewHide{display:block;position:absolute;width:50px;height:50px;left:5px;right:200px;top:3px;bottom:200px;background-color:#FFFFFF;text-align:conter;}                        .review{width:50px;height:50px;background-position:center;background-repeat:no-repeat;border:1px solid #000;}                        .tabStyle{position:absolute;left:356px;right:200px;top:12px;bottom:200px;z-index:65533;width:50px;height:50px;background:#FFFFFF;}                        .jd img{background:transparent url(http://img.baidu.com/hi/default/jxFace.gif?v=1.1) no-repeat scroll left top; cursor:pointer; display:block; width:35px; height:35px; }                        .pp img{background:transparent url(http://img.baidu.com/hi/default/fFace.gif?v=1.1) no-repeat scroll left top; cursor:pointer; display:block; width:25px; height:25px; }                        .ldw img{background:transparent url(http://img.baidu.com/hi/default/wFace.gif?v=1.1) no-repeat scroll left top; cursor:pointer; display:block; width:35px; height:35px; }                        .tsj img{background:transparent url(http://img.baidu.com/hi/default/tFace.gif?v=1.1) no-repeat scroll left top; cursor:pointer; display:block; width:35px; height:35px; }                        .bb img{background:transparent url(http://img.baidu.com/hi/default/bFace.gif?v=1.1) no-repeat scroll left top; cursor:pointer; display:block; width:35px; height:35px; }                        .youa img{background:transparent url(http://img.baidu.com/hi/default/yFace.gif?v=1.1) no-repeat scroll left top; cursor:pointer; display:block; width:35px; height:35px; }                    </style>                </head>                <body onfocus='parent._BdPopupLayer._focusOnLayer=true;' onselectstart='return false'>"
						+ this.defaultContent + "</body>            </html>");
		frames[this.name].document.close();
		window.attachEvent("onfocus", function(E) {
					_BdPopupLayer._focusOnLayer = false
				})
	},
	write : function(A) {
		this.content.innerHTML = A
	},
	showBy : function(B, C, A) {
		this.show(0, 0, C, A, B)
	},
	showByXYWH : function(C, B, E, D, A) {
		this.show(B, E, D, A, C)
	},
	show : function(D, K, B, N, F) {
		var P = D = D ? (isNaN(D) ? 0 : parseInt(D, 10)) : 0;
		var O = K = K ? (isNaN(K) ? 0 : parseInt(K, 10)) : 0;
		B = B ? (isNaN(B) ? "auto" : parseInt(B, 10)) : "auto";
		N = N ? (isNaN(N) ? "auto" : parseInt(N, 10)) : "auto";
		var G = _BdElement.body(), E = 0;
		if (F && (F = _Bd$(F)) && F.tagName) {
			E = F.offsetHeight;
			var J = _BdElement.realOffset(F);
			D += J.x;
			K += J.y
		}
		this.layer.style.top = K + E + "px";
		this.layer.style.left = D + "px";
		this.layer.style.width = "2px";
		this.layer.style.height = "2px";
		if (_BdBrowser.netscape && _BdBrowser.netscape.version < 7.2) {
			this.layer.style.visibility = ""
		} else {
			this.layer.style.display = ""
		}
		var C = this.layer.offsetWidth;
		var M = this.layer.offsetHeight;
		if (G.scrollLeft + G.clientWidth < D + C) {
			if (D - C >= G.scrollLeft) {
				D -= C
			} else {
				D = G.scrollLeft + G.clientWidth - C
			}
		}
		if (G.scrollTop + G.clientHeight < K + M + E) {
			if (K - M >= G.scrollTop) {
				K -= M
			} else {
				K = G.scrollTop + G.clientHeight - M
			}
		} else {
			K += E
		}
		var I = this.document, H = dsh = 0;
		var A = I.body.scrollWidth;
		var L = I.body.scrollHeight;
		if (I.documentElement) {
			H = I.documentElement.scrollWidth;
			dsh = I.documentElement.scrollHeight
		}
		if (isNaN(B)) {
			B = Math.max(H, A, this.content.offsetWidth)
		}
		if (isNaN(N)) {
			N = Math.max(dsh, L, this.content.offsetHeight)
		}
		this.width = B || 2;
		this.height = N || 2;
		this.layer.style.top = (this.top = K) + "px";
		this.layer.style.left = (this.left = D) + "px";
		this.layer.style.width = this.width + "px";
		this.layer.style.height = this.height + "px";
		if (this.hideTrigger.onblur) {
			window.attachEvent("onblur", this.onBlurHandler)
		}
		if (this.hideTrigger.onscroll) {
			window.attachEvent("onscroll", this.onScrollHandler)
		}
		if (this.hideTrigger.onmousedown) {
			document.attachEvent("onmousedown", this.onClickHandler)
		}
		this.isOpen = true;
		this.onshow()
	},
	hide : function() {
		this.isOpen = false;
		this.layer.style.zIndex = 65001;
		if (_BdBrowser.netscape && _BdBrowser.netscape.version < 7.2) {
			this.layer.style.visibility = "hidden"
		} else {
			this.layer.style.display = "none"
		}
		if (this.hideTrigger.onblur) {
			window.detachEvent("onblur", this.onBlurHandler)
		}
		if (this.hideTrigger.onscroll) {
			window.detachEvent("onscroll", this.onScrollHandler)
		}
		if (this.hideTrigger.onmousedown) {
			document.detachEvent("onmousedown", this.onClickHandler)
		}
		if (!this.exclusive) {
			this.document.body.innerHTML = this.defaultContent;
			this.width = this.height = 0;
			this.style = this.busy = false
		}
		this.onhide()
	},
	getElementById : function(A) {
		return this.document.getElementById(A)
	}
});
window.attachEvent("onload", function() {
			new _BdPopupLayer()
		});
_BdPopupLayer.provider = function(C) {
	var B, A = 0;
	for (; A < this._layers.length; A++) {
		if (!this._layers[A].busy) {
			B = this._layers[A];
			break
		}
	}
	if (A == this._layers.length - 1) {
		new _BdPopupLayer()
	}
	if (A == this._layers.length) {
		B = new _BdPopupLayer(C)
	}
	B.busy = true;
	B.window = B.layer.contentWindow;
	B.document = B.window.document;
	B.content = B.document.getElementById("Content");
	B.style = B.content.style;
	return B
};
function BdEditor(A, B) {
	this.textarea = _Bd$(A);
	this.width = B.width || "100%";
	this.height = B.height || "300px";
	this.modules = {};
	BdEditor.instance = _Instance[this.hashCode = uniqueID()] = this
}
BdEditor.prototype.render = function() {
	loadCssFile(_System.path + "css/default/bdeditor.css");
	var A = "        <div id='bdeditor_container_{2}'>            <table width='{0}' height='{1}' cellpadding='0' cellspacing='0' border='0'>                <tr>                    <td id='editor_toolbar_{2}' class='ToolbarContainer'></td>                </tr>                <tr>                    <td id='editor_area_{2}' class='EditorContainer'></td>                </tr>            </table>        </div>    "
			.format(this.width, this.height, this.hashCode);
	this.textarea.insertAdjacentHTML("beforeBegin", A);
	this.renderToolbar();
	this.renderEditorArea();
	this.makeEditable();
	this.attachEventListener();
	this.isLightFont = false
};
BdEditor.prototype.setCookie = function(A, B) {
	document.cookie = A + "=" + escape(B)
			+ ";expires=Wed, 28-Nov-37 01:45:46 GMT;path=/;domain=.baidu.com"
};
BdEditor.prototype.getCookie = function(B) {
	var A, C = new RegExp("(^| )" + B + "=([^;]*)(;|$)");
	if (A = document.cookie.match(C)) {
		return unescape(A[2])
	}
};
BdEditor.prototype.renderToolbar = function() {
	var I = ["<div class='ToolbarStrip'><table border='0' cellspacing='0' cellpadding='0'><tr>"];
	var D = ["_TiSmiley"];
	if (_BdBrowser.ie) {
		D = ["_TiSmiley", "_LightFont"]
	}
	for (var H = 0, G = D.length; H < G; H++) {
		var B = this.modules[D[H]] = new window[D[H]]();
		if (H == 1) {
			var A = '<input  type="checkbox" name="_LightFont" id="_LightFont'
					+ this.hashCode
					+ '" onclick="switchLightFont(this.checked)" />';
			I
					.push("<td width='100%'  align='right' valign='middle'><div class='ToolbarItem'>"
							+ A + "</div></td>")
		}
		var C = (H == 0) ? "nowrap='nowrap'" : "";
		I.push("<td nowrap='nowrap'>" + B.render() + "</td>")
	}
	"editor.lightFontModule.switchLightFont";
	I.push("</tr></table></div>");
	var F = _Bd$("editor_toolbar_" + this.hashCode);
	F.innerHTML = I.join("");
	if (_BdBrowser.ie) {
		this.lightFontModule = _Bd$("_LightFont" + this.hashCode);
		this.lightFontModule.handler = this;
		this.lightFontColor = "#0000FF";
		this.lightFontModule.switchLightFont = function(L) {
			this.handler.isLightFont = L;
			var J = L ? this.handler.lightFontColor : "0";
			if (J != "0") {
				J = J.replace("#", "")
			}
			this.handler.setCookie("BDLFONT", J);
			if (!L) {
				var K = this.handler.modules._LightFont.layer;
				if (K) {
					K.hide()
				}
			}
		};
		var E = this.getCookie("BDLFONT");
		if (typeof E == "undefined") {
			E = "0"
		}
		if (E != "0") {
			this.lightFontModule.checked = true;
			this.lightFontModule.switchLightFont(true);
			_Bd$("LightFont_Font_" + this.hashCode).style.color = "#" + E;
			this.lightFontColor = "#" + E;
			this.setCookie("BDLFONT", E)
		} else {
			this.lightFontModule.checked = false;
			this.lightFontModule.switchLightFont(false);
			_Bd$("LightFont_Font_" + this.hashCode).style.color = "#0000FF";
			this.lightFontColor = "#0000FF";
			this.setCookie("BDLFONT", E)
		}
	}
};
BdEditor.prototype.renderEditorArea = function() {
	var editor_area = _Bd$("editor_area_" + this.hashCode);
	editor_area.innerHTML = "<iframe width='100%' height='" + this.height
			+ "' frameborder='0' src='javascript:void(0)'></iframe>";
	this.iframe = editor_area.lastChild;
	var w = this.window = this.iframe.contentWindow;
	var d = this.document = this.window.document;
	d.open();
	d
			.write('<html><head><style type="text/css">    /*<![CDATA[*/    body{ background-color: #ffffff; padding: 5px 5px 5px 5px; margin: 0px; }     body, td { font-family: Arial, Verdana, sans-serif; font-size: 14px; }    p{ margin:0px; }    /*]]>*/    </style></head><body></body></html>');
	d.close();
	var code = ";window.onerror=function(e){return true;}";
	if (window.execScript) {
		w.execScript(code)
	} else {
		if (_BdBrowser.safari) {
			var s = d.createElement("SCRIPT");
			s.type = "text/javascript";
			s.appendChild(d.createTextNode(code));
			d.documentElement.appendChild(s)
		} else {
			eval.call(w, code)
		}
	}
};
BdEditor.prototype.makeEditable = function() {
	var D = this.document;
	if (_BdBrowser.ie) {
		D.body.disabled = true;
		D.body.contentEditable = true;
		D.body.removeAttribute("disabled");
		try {
			D.execCommand("BackgroundImageCache", false, true)
		} catch (C) {
		}
	} else {
		try {
			D.body.spellcheck = false;
			D.designMode = "on";
			try {
				D.execCommand("styleWithCSS", false, false)
			} catch (B) {
				D.execCommand("useCSS", false, true)
			}
			D.execCommand("enableObjectResizing", false, true);
			D.execCommand("enableInlineTableEditing", false, false)
		} catch (A) {
		}
	}
	this.textarea.style.display = "none"
};
BdEditor.prototype.attachEventListener = function() {
	var A = this, C = A.document;
	var D = function() {
		var E = A.modules._TiSmiley.layer;
		if (E) {
			E.hide()
		}
		if (_BdBrowser.ie) {
			E = A.modules._LightFont.layer;
			if (E) {
				E.hide()
			}
		}
	};
	if (_BdBrowser.ie) {
		C.body.attachEvent("onfocus", D)
	} else {
		C.addEventListener("focus", D, false)
	}
	if (!_BdBrowser.ie) {
		return false
	}
	C.attachEvent("onbeforedeactivate", function(G) {
				var F = C.selection;
				var E = F.createRange();
				A.ieSelectionType = F.type.toLowerCase();
				if ("control" == A.ieSelectionType) {
					A.ieSelectionControl = E(0)
				} else {
					A.ieSelectionBookmark = E.getBookmark()
				}
			});
	C.attachEvent("onactivate", function(F) {
				var E;
				try {
					if ("control" == A.ieSelectionType) {
						E = C.body.createControlRange();
						E.add(A.ieSelectionControl)
					} else {
						E = C.body.createTextRange();
						E.moveToBookmark(A.ieSelectionBookmark)
					}
					E.select();
					A.ieSelectionControl = A.ieSelectionBookmark = null
				} catch (F) {
				}
			});
	function B() {
		var H = C.selection;
		var G = H.type.toLowerCase();
		if ("control" == G) {
			var E = H.createRange();
			for (var F = E.length - 1; F >= 0; F--) {
				E(F).parentNode.removeChild(E(F))
			}
			return false
		}
		return true
	}
	C.attachEvent("onkeydown", function(I) {
				var I = A.window.event || I;
				var H = I.which || I.keyCode || I.charCode;
				var E = 0;
				if (I.ctrlKey || I.metaKey) {
					E += 1000
				}
				if (I.shiftKey) {
					E += 2000
				}
				if (I.altKey) {
					E += 4000
				}
				var G = H + E;
				if (G == 8) {
					return (I.returnValue = B())
				}
				return (I.returnValue = true)
			});
	return false
};
BdEditor.prototype.getHtml = function() {
	var B = this.document.body.innerHTML.replace(/<(p|div)[^>]*>/gi, "<br/>")
			.replace(/<\/\s*(p|div)\s*>/gi, "");
	var A = B.replace(/^(<br([^>])*\/?>)+/gi, "");
	if (_BdBrowser.ie) {
		if (this.lightFontModule.checked) {
			A = '<span style="filter:glow(color=' + this.lightFontColor
					+ ',strength=2);height:0px;color:#FFFFFF">' + A + "</span>"
		}
	}
	return A
};
function _ToolbarItemBase() {
	this.tooltipname = "";
	this.tooltip = "";
	this.cssName = "Lightfont";
	this.commandName = "";
	this.disabled = false;
	this.editor = BdEditor.instance;
	_Instance[this.hashCode = uniqueID()] = this
}
_System.extend(_ToolbarItemBase.prototype, {
	execute : function() {
	},
	render : function() {
		var A = "<div class='ToolbarItem' title='"
				+ this.tooltip
				+ "' id='ToolbarItem_{0}'  onclick=\"_Instance['{0}'].clickHandler(this)\" onmouseup=\"_Instance['{0}'].mouseUpHandler(this)\" onmousedown=\"_Instance['{0}'].mouseDownHandler(this)\" onmouseout=\"_Instance['{0}'].mouseOutHandler(this)\" onmouseover=\"_Instance['{0}'].mouseOverHandler(this)\" ><div class='img "
				+ this.cssName + "' alt='" + this.tooltip
				+ "' /><font style='font-size:12px'>" + this.tooltipname
				+ "</font></div>";
		return A.format(this.hashCode)
	},
	getContainer : function() {
		return _Bd$("ToolbarItem_" + this.hashCode)
	},
	_ac : function(A) {
		_BdElement.addClassName(this.getContainer(), A)
	},
	_rc : function(A) {
		_BdElement.removeClassName(this.getContainer(), A)
	},
	mouseUpHandler : function(A) {
		if (!this.disabled) {
			this._rc("mousedown")
		}
	},
	mouseDownHandler : function(A) {
		if (!this.disabled) {
			this._ac("mousedown")
		}
	},
	mouseOutHandler : function(A) {
		if (!this.disabled) {
			this._rc("mouseover");
			this._rc("mousedown")
		}
	},
	mouseOverHandler : function(A) {
		if (!this.disabled) {
			this._ac("mouseover")
		}
	},
	clickHandler : function() {
		if (this.disabled) {
			return
		}
		this.execute();
		if (!_BdBrowser.ie) {
			this.editor.window.focus()
		}
	}
});
function _LightFont() {
	_ToolbarItemBase.call(this);
	this.tooltip = "\u95ea\u5149\u5b57";
	this.tooltipname = '<font id="LightFont_Font_'
			+ parent.BdEditor.instance.hashCode
			+ '" style="font-size:10px; color:#000000;">\u25bc</font>&nbsp;\u95ea\u5149\u5b57';
	this.layer = _BdPopupLayer.provider();
	this.layer.exclusive = true;
	this._isFirstExecute = true;
	this._isCreated = false;
	this.disabled = false;
	this.initialize()
}
_LightFont.Extends(_ToolbarItemBase);
_LightFont.prototype.initialize = function() {
	var A = this;
	this.layer.onshow = function() {
		var B = A.getContainer();
		B.onmouseover = B.onmouseout = function() {
			return false
		};
		A._ac("mouseover")
	};
	this.layer.onhide = function() {
		var B = A.getContainer();
		B.onmouseover = function() {
			A.mouseOverHandler(this)
		};
		B.onmouseout = function() {
			A.mouseOutHandler(this)
		};
		A._rc("mouseover")
	}
};
_LightFont.prototype.clickHandler = function() {
	if (!this._isCreated) {
		this._isCreated = true;
		var L = ["00", "33", "66", "99", "cc", "ff", "00", "33", "66", "99",
				"cc", "ff"];
		var B = [];
		var A, N, J;
		for (var F = 0; F < 12; F++) {
			A = L[F];
			for (var E = 0; E < 3; E++) {
				if (F >= 6) {
					J = L[E + 3]
				} else {
					J = L[E]
				}
				for (var M = 0; M < 6; M++) {
					N = L[M];
					B[B.length] = "#" + J + N + A
				}
			}
		}
		var I = ['<table width="199px" height="133px" cellspacing="1" cellpadding="0" bgcolor="#000000" >'];
		var K = 0;
		var C = _BdBrowser.ie ? 10 : 8;
		for (var F = 0; F < 12; F++) {
			I.push("<tr>");
			for (var E = 0; E < 18; E++) {
				var D = B[K++];
				I
						.push('<td bgcolor="'
								+ D
								+ '" width="10px" height="10px" style="cursor:pointer;font-size:1px"><div style="width:'
								+ C
								+ "px; height:"
								+ C
								+ "px; border:#000 solid 0px\" onmouseover=\"parent.BdEditor.instance.modules['_LightFont'].over(this);\" onmouseout=\"parent.BdEditor.instance.modules['_LightFont'].out(this);\" onclick=\"parent.BdEditor.instance.modules['_LightFont'].execute('"
								+ D + "',this);\"></div></td>")
			}
			I.push("</tr>")
		}
		I.push("</table>");
		B = L = J = N = A = C = K = null;
		var H = I.join("");
		var G = ["<html><head><title>color panel</title></head><body>"];
		G.push('<div id="colorPanel" style="width:180px;height:120px">');
		G.push(H);
		G.push("</div></body></html>");
		G = G.join("");
		this.layer.write(G);
		this.layer.style.border = "solid 1px #A9CCDD"
	} else {
	}
	this.layer.style.height = "133px";
	this.layer.showByXYWH(this.getContainer(), -125, 0, _BdBrowser.ie
					? "201"
					: "201", _BdBrowser.ie ? "135" : "135")
};
_LightFont.prototype.execute = function(A, C) {
	C.style.border = "#000 solid 0px";
	var B = this;
	B.layer.hide();
	parent.BdEditor.instance.lightFontColor = A;
	_Bd$("LightFont_Font_" + parent.BdEditor.instance.hashCode).style.color = A;
	if (_Bd$("_LightFont" + parent.BdEditor.instance.hashCode).checked) {
		parent.BdEditor.instance.setCookie("BDLFONT", A.replace("#", ""))
	}
};
_LightFont.prototype.over = function(A) {
	A.style.border = "#000 solid 1px"
};
_LightFont.prototype.out = function(A) {
	A.style.border = "#000 solid 0px"
};
function _TiSmiley() {
	_ToolbarItemBase.call(this);
	this.tabFlags = [0, 0, 0, 0, 0];
	this.tooltip = "\u63d2\u5165\u8868\u60c5";
	this.tooltipname = "\u63d2\u5165\u8868\u60c5";
	this.cssName = "Smiley";
	this.commandName = "InsertSmiley";
	this.smileyPath = "http://img.baidu.com/hi/face/";
	this.smileyImages = [];
	this.layer = _BdPopupLayer.provider();
	this.layer.exclusive = true;
	this._isFirstExecute = true;
	this.initialize()
}
_TiSmiley.Extends(_ToolbarItemBase);
_TiSmiley.prototype.initialize = function() {
	var A = this;
	this.layer.onshow = function() {
		var B = A.getContainer();
		B.onmouseover = B.onmouseout = function() {
			return false
		};
		A._ac("mouseover")
	};
	this.layer.onhide = function() {
		var B = A.getContainer();
		B.onmouseover = function() {
			A.mouseOverHandler(this)
		};
		B.onmouseout = function() {
			A.mouseOutHandler(this)
		};
		A._rc("mouseover")
	}
};
_TiSmiley.prototype.over = function(C, A) {
	var B = this.layer.getElementById("tabIconReview");
	this.layer.getElementById("faceReview").style.backgroundImage = "url(" + C
			+ ")";
	if (A == 1) {
		B.style.display = "block";
		B.style.left = "4px";
		B.style.top = "3px"
	} else {
		B.style.display = "block";
		B.style.left = "228px";
		B.style.top = "3px"
	}
};
_TiSmiley.prototype.out = function(B) {
	var A = this.layer.getElementById("tabIconReview");
	A.style.display = "none"
};
_TiSmiley.prototype.switchTab = function(C) {
	var B = 6;
	for (var D = 0; D < B; D++) {
		var E = this.layer.getElementById("tab" + D);
		var A = this.layer.getElementById("tab" + D + "M");
		if (D == C) {
			if (this.tabFlags[C] == 0) {
				this.tabFlags[C] = 1;
				this.createTab("tab" + C)
			}
			E.style.display = "block";
			A.className = "tabMenuHover"
		} else {
			E.style.display = "none";
			A.className = "tabMenuNoHover"
		}
	}
};
FCKConfig = {};
FCKConfig.SmileyInfor = {
	tab0 : [],
	tab1 : [],
	tab2 : [],
	tab3 : [],
	tab4 : [],
	tab5 : []
};
FCKConfig.SmileyInfor.tab0 = ["Kiss", "Love", "Yeah", "\u554a\uff01",
		"\u80cc\u626d", "\u9876", "\u6296\u80f8", "88", "\u6c57",
		"\u778c\u7761", "\u9c81\u62c9", "\u62cd\u7816", "\u63c9\u8138",
		"\u751f\u65e5\u5feb\u4e50", "\u5927\u7b11", "\u7011\u5e03\u6c57~",
		"\u60ca\u8bb6", "\u81ed\u7f8e", "\u50bb\u7b11", "\u629b\u5a9a\u773c",
		"\u53d1\u6012", "\u6253\u9171\u6cb9", "\u4fef\u5367\u6491",
		"\u6c14\u6124", "\u56e7", "\u543b", "\u6012", "\u80dc\u5229", "HI",
		"KISS", "\u4e0d\u8bf4", "\u4e0d\u8981", "\u626f\u82b1", "\u5927\u5fc3",
		"\u9876", "\u5927\u60ca", "\u98de\u543b", "\u9b3c\u8138",
		"\u5bb3\u7f9e", "\u53e3\u6c34", "\u72c2\u54ed", "\u6765", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "\u5f00\u5fc3",
		"\u5077\u7b11", "\u5927\u54ed", "\u6ef4\u6c57", "\u53f9\u6c14",
		"\u8d85\u8d5e", "\u56e7\u56e7", "\u98de\u543b", "\u5929\u4f7f",
		"\u6492\u82b1", "\u751f\u6c14", "\u88ab\u7838", "\u5413\u50bb",
		"\u968f\u610f\u5410"];
FCKConfig.SmileyInfor.tab1 = ["Kiss", "Love", "Yeah", "\u554a\uff01",
		"\u80cc\u626d", "\u9876", "\u6296\u80f8", "88", "\u6c57",
		"\u778c\u7761", "\u9c81\u62c9", "\u62cd\u7816", "\u63c9\u8138",
		"\u751f\u65e5\u5feb\u4e50", "\u644a\u624b", "\u7761\u89c9",
		"\u762b\u5750", "\u65e0\u804a", "\u661f\u661f\u95ea", "\u65cb\u8f6c",
		"\u4e5f\u4e0d\u884c", "\u90c1\u95f7", "\u6b63Music", "\u6293\u5899",
		"\u649e\u5899\u81f3\u6b7b", "\u6b6a\u5934", "\u6233\u773c",
		"\u98d8\u8fc7", "\u4e92\u76f8\u62cd\u7816", "\u780d\u6b7b\u4f60",
		"\u6254\u684c\u5b50", "\u5c11\u6797\u5bfa", "\u4ec0\u4e48\uff1f",
		"\u8f6c\u5934", "\u6211\u7231\u725b\u5976", "\u6211\u8e22",
		"\u6447\u6643", "\u6655\u53a5", "\u5728\u7b3c\u5b50\u91cc",
		"\u9707\u8361"];
FCKConfig.SmileyInfor.tab2 = ["\u5927\u7b11", "\u7011\u5e03\u6c57~",
		"\u60ca\u8bb6", "\u81ed\u7f8e", "\u50bb\u7b11", "\u629b\u5a9a\u773c",
		"\u53d1\u6012", "\u6211\u9519\u4e86", "money", "\u6c14\u6124",
		"\u6311\u9017", "\u543b", "\u6012", "\u80dc\u5229", "\u59d4\u5c48",
		"\u53d7\u4f24", "\u8bf4\u5565\u5462\uff1f", "\u95ed\u5634", "\u4e0d",
		"\u9017\u4f60\u73a9\u513f", "\u98de\u543b", "\u7729\u6655",
		"\u9b54\u6cd5", "\u6211\u6765\u4e86", "\u7761\u4e86", "\u6211\u6253",
		"\u95ed\u5634", "\u6253", "\u6253\u6655\u4e86", "\u5237\u7259",
		"\u7206\u63cd", "\u70b8\u5f39", "\u5012\u7acb", "\u522e\u80e1\u5b50",
		"\u90aa\u6076\u7684\u7b11", "\u4e0d\u8981\u4e0d\u8981",
		"\u7231\u604b\u4e2d", "\u653e\u5927\u4ed4\u7ec6\u770b", "\u5077\u7aa5",
		"\u8d85\u9ad8\u5174", "\u6655", "\u677e\u53e3\u6c14", "\u6211\u8dd1",
		"\u4eab\u53d7", "\u4fee\u517b", "\u54ed", "\u6c57", "\u554a~",
		"\u70ed\u70c8\u6b22\u8fce", "\u6253\u9171\u6cb9", "\u4fef\u5367\u6491",
		"\u56e7"];
FCKConfig.SmileyInfor.tab3 = ["HI", "KISS", "\u4e0d\u8bf4", "\u4e0d\u8981",
		"\u626f\u82b1", "\u5927\u5fc3", "\u9876", "\u5927\u60ca",
		"\u98de\u543b", "\u9b3c\u8138", "\u5bb3\u7f9e", "\u53e3\u6c34",
		"\u72c2\u54ed", "\u6765", "\u6cea\u773c", "\u6d41\u6cea",
		"\u751f\u6c14", "\u5410\u820c", "\u559c\u6b22", "\u65cb\u8f6c",
		"\u518d\u89c1", "\u6293\u72c2", "\u6c57", "\u9119\u89c6", "\u62dc",
		"\u5410\u8840", "\u5618", "\u6253\u4eba", "\u8e66\u8df3",
		"\u53d8\u8138", "\u626f\u8089", "\u5403To", "\u5403\u82b1",
		"\u5439\u6ce1\u6ce1\u7cd6", "\u5927\u53d8\u8eab", "\u98de\u5929\u821e",
		"\u56de\u7738", "\u53ef\u601c", "\u731b\u62bd", "\u6ce1\u6ce1",
		"\u82f9\u679c", "\u4eb2", "", "\u9a9a\u821e", "\u70e7\u9999", "\u7761",
		"\u5957\u5a03\u5a03", "\u6345\u6345", "\u821e\u5012",
		"\u897f\u7ea2\u67ff", "\u7231\u6155", "\u6447", "\u6447\u6446",
		"\u6742\u800d", "\u62db\u8d22", "\u88ab\u6bb4", "\u88ab\u7403\u95f7",
		"\u5927\u60ca", "\u7406\u60f3", "\u6b27\u6253", "\u5455\u5410",
		"\u788e", "\u5410\u75f0"];
FCKConfig.SmileyInfor.tab4 = ["", "", "", "", "", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
		"", ""];
FCKConfig.SmileyInfor.tab5 = ["\u7537\u515c", "\u5973\u515c", "\u5f00\u5fc3",
		"\u4e56\u4e56", "\u5077\u7b11", "\u5927\u7b11", "\u62bd\u6ce3",
		"\u5927\u54ed", "\u65e0\u5948", "\u6ef4\u6c57", "\u53f9\u6c14",
		"\u72c2\u6655", "\u59d4\u5c48", "\u8d85\u8d5e", "\u56e7\u56e7",
		"\u7591\u95ee", "\u98de\u543b", "\u5929\u4f7f", "\u6492\u82b1",
		"\u751f\u6c14", "\u88ab\u7838", "\u53e3\u6c34", "\u6cea\u5954",
		"\u5413\u50bb", "\u5410\u820c\u5934", "\u70b9\u5934",
		"\u968f\u610f\u5410", "\u65cb\u8f6c", "\u56f0\u56f0", "\u9119\u89c6",
		"\u72c2\u9876", "\u7bee\u7403", "\u518d\u89c1",
		"\u6b22\u8fce\u5149\u4e34", "\u606d\u559c\u53d1\u8d22", "\u7a0d\u7b49",
		"\u6211\u5728\u7ebf", "\u6055\u4e0d\u8bae\u4ef7",
		"\u5e93\u623f\u6709\u8d27", "\u8d27\u5728\u8def\u4e0a"];
FCKConfig.SmileyBox = {
	tab0 : [],
	tab1 : [],
	tab2 : [],
	tab3 : [],
	tab4 : [],
	tab5 : []
};
function initImgBox(D, E, B) {
	if (D.length) {
		return
	}
	var A = "";
	for (var C = 1; C <= B; C++) {
		A = E;
		if (C < 10) {
			A = A + "0"
		}
		A = A + C + ".gif";
		D.push(A)
	}
}
initImgBox(FCKConfig.SmileyBox.tab0, "j_00", 70);
initImgBox(FCKConfig.SmileyBox.tab1, "t_00", 40);
initImgBox(FCKConfig.SmileyBox.tab2, "w_00", 52);
initImgBox(FCKConfig.SmileyBox.tab3, "B_00", 63);
initImgBox(FCKConfig.SmileyBox.tab4, "i_f", 50);
initImgBox(FCKConfig.SmileyBox.tab5, "y_00", 40);
var faceBox = FCKConfig.SmileyBox;
var inforBox = FCKConfig.SmileyInfor;
_TiSmiley.prototype.createTab = function(A) {
	var H = _System.imagePath;
	var F = "?v=1.1";
	FaceHandler = {
		imageFolders : {
			tab0 : "jx/",
			tab1 : "tsj/",
			tab2 : "ldw/",
			tab3 : "bobo/",
			tab4 : "face/",
			tab5 : "youa/"
		},
		imageReviewFolders : {
			tab0 : "jx_review/",
			tab1 : "tsj_review/",
			tab2 : "bobo_review/",
			tab3 : "tsj_review/",
			tab4 : "face/",
			tab5 : "youa/"
		},
		imageWidth : {
			tab0 : 36,
			tab1 : 35,
			tab2 : 35,
			tab3 : 36,
			tab4 : 25,
			tab5 : 35
		},
		imageCols : {
			tab0 : 7,
			tab1 : 7,
			tab2 : 7,
			tab3 : 7,
			tab4 : 7,
			tab5 : 7
		},
		imageColWidth : {
			tab0 : 35,
			tab1 : 35,
			tab2 : 35,
			tab3 : 35,
			tab4 : 35,
			tab5 : 35
		},
		tableWidth : {
			tab0 : 263,
			tab1 : 280,
			tab2 : 263,
			tab3 : 263,
			tab4 : 263,
			tab5 : 280
		},
		imageCss : {
			tab0 : "jd",
			tab1 : "tsj",
			tab2 : "ldw",
			tab3 : "bb",
			tab4 : "pp",
			tab5 : "youa"
		},
		imageCssOffset : {
			tab0 : 35,
			tab1 : 35,
			tab2 : 35,
			tab3 : 35,
			tab4 : 25,
			tab5 : 35
		}
	};
	var L = H + FaceHandler.imageFolders[A];
	var N = H + FaceHandler.imageReviewFolders[A];
	var U = FaceHandler.tableWidth;
	var K = FaceHandler.imageWidth;
	var V = FaceHandler.imageCols[A];
	var J = V / 2;
	var P = FaceHandler.imageColWidth;
	var B = FaceHandler.imageCss[A];
	var I = FaceHandler.imageCssOffset[A];
	var D = this.layer.getElementById(A);
	var M = ['<table cellpadding="0" cellspacing="0"  style="border-collapse:collapse;" border="1" bordercolor="#B8B3FF" width='
			+ U[A] + '  height="100%">'];
	for (var S = 0, C = faceBox[A].length; S < C;) {
		M.push("<tr>");
		for (var R = 0; R < V; R++, S++) {
			var T = faceBox[A][S];
			if (T) {
				var O = L + T + F;
				var X = L + T;
				var Q = N + T;
				var E = R < J ? 0 : 1;
				var G = I * S * (-1) - 1;
				var W = inforBox[A][S];
				M
						.push('<td width="'
								+ P[A]
								+ '"  height="'
								+ P[A]
								+ '" align="center" valign="middle" style="background-color:#FFFFFF;" onmouseover="this.style.backgroundColor=\'#E8E8FD\'"  onmouseout="this.style.backgroundColor=\'#FFFFFF\'" >');
				M.push('<span class="' + B + '"  style="display:block;">');
				M
						.push('<img title="'
								+ W
								+ '" style="background-position:left '
								+ G
								+ 'px;"  width="'
								+ K[A]
								+ '" height="'
								+ K[A]
								+ "\" onclick=\"parent.BdEditor.instance.modules['_TiSmiley'].execute('"
								+ X
								+ "');\" src=\"http://img.baidu.com/hi/default/0.gif\" onmouseover=\"parent.BdEditor.instance.modules['_TiSmiley'].over('"
								+ O
								+ "',"
								+ E
								+ ');"  onmouseout="parent.BdEditor.instance.modules[\'_TiSmiley\'].out();" /></td>');
				M.push("</span>")
			} else {
				M.push("<td>&nbsp;")
			}
			M.push("</td>")
		}
		M.push("</tr>")
	}
	M.push("</table>");
	M = M.join("");
	D.innerHTML = M
};
_TiSmiley.prototype.clickHandler = function() {
	this.tabFlags = [0, 0, 0, 0, 0, 0];
	var A = [];
	A.push('<div id="tabPanel" class="tabPanel" >');
	A.push('	<div id="tabContent" class="tabContent">');
	A.push('		<div id="tab0" class="tabContentShow">0__tabContent</div>');
	A.push('		<div id="tab1" class="tabContentHide">1__tabContent</div>');
	A.push('		<div id="tab2" class="tabContentHide">2__tabContent</div>');
	A.push('		<div id="tab3" class="tabContentHide">3__tabContent</div>');
	A.push('      	<div id="tab4" class="tabContentHide">4__tabContent</div>');
	A
			.push('         <div id="tab5" class="tabContentHide">5__tabContent</div>');
	A.push("	</div>");
	A.push('	<div id="tabMenu" class="tabMenu" >');
	A
			.push('		<div id="tab0M" class="tabMenuHover"   		onClick="parent.BdEditor.instance.modules[\'_TiSmiley\'].switchTab(0)">&nbsp;&nbsp;&nbsp;<u>\u7cbe\u9009</u>&nbsp;&nbsp;&nbsp;</div>');
	A
			.push('		<div id="tab1M" class="tabMenuNoHover" 	onClick="parent.BdEditor.instance.modules[\'_TiSmiley\'].switchTab(1)">&nbsp;<u>\u5154\u65af\u57fa</u>&nbsp;</div>');
	A
			.push('		<div id="tab2M" class="tabMenuNoHover" 	onClick="parent.BdEditor.instance.modules[\'_TiSmiley\'].switchTab(2)">&nbsp;<u>\u7eff\u8c46\u86d9</u>&nbsp;</div>');
	A
			.push('		<div id="tab3M" class="tabMenuNoHover" 	onClick="parent.BdEditor.instance.modules[\'_TiSmiley\'].switchTab(3)">&nbsp;&nbsp;<u>BOBO</u>&nbsp;&nbsp;</div>');
	A
			.push('       <div id="tab4M" class="tabMenuNoHover" 	onClick="parent.BdEditor.instance.modules[\'_TiSmiley\'].switchTab(4)">&nbsp;&nbsp;<u>\u6ce1\u6ce1</u>&nbsp;&nbsp;</div>');
	A
			.push('       <div id="tab5M" class="tabMenuNoHover"    onClick="parent.BdEditor.instance.modules[\'_TiSmiley\'].switchTab(5)">&nbsp;&nbsp;<u>\u6709\u554a</u>&nbsp;&nbsp;</div>');
	A.push("	</div>");
	A.push("</div>");
	A.push('<div id="tabIconReview" class="tabStyle">');
	var B = _System.imagePath;
	A
			.push('<img id="faceReview" class="review"  src="http://img.baidu.com/hi/default/0.gif"/>');
	A.push("</div>");
	A = A.join("");
	this.layer.write(A);
	this.layer.style.border = "solid 1px #A9CCDD";
	this.layer.showBy(this.getContainer(), _BdBrowser.ie ? "346" : "346",
			_BdBrowser.ie ? "255" : "255");
	this.createTab("tab0");
	this.switchTab(0)
};
_TiSmiley.prototype.execute = function(A) {
	var F = this;
	F.layer.hide();
	F.editor.window.focus();
	if (_BdBrowser.ie) {
		var I = F.editor.document.selection;
		var G = I.type.toLowerCase();
		if ("control" == G) {
			var J = I.createRange();
			var D = J(0);
			D.insertAdjacentHTML("beforeBegin", '<img src="' + A + '">');
			for (var C = J.length - 1; C >= 0; C--) {
				J(C).parentNode.removeChild(J(C))
			}
		} else {
			var E = I.createRange();
			E.pasteHTML('<img src="' + A + '"/>')
		}
	} else {
		var B = F.editor.document.createElement("IMG");
		B.src = A;
		var I = F.editor.window.getSelection();
		var E = I.getRangeAt(0);
		E.deleteContents();
		E.insertNode(B);
		var H = F.editor.document.createRange();
		H.selectNode(B);
		I.removeAllRanges();
		I.addRange(H);
		I.collapseToEnd();
		if (F._isFirstExecute) {
			F.editor.document.execCommand("insertHTML", false, "<br>\x00");F._isFirstExecute=false}}};