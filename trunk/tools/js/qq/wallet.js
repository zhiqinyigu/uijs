var Tenpay = typeof(Tenpay) == "undefined" ? {} : Tenpay;
Tenpay.Box = (function() {
	var _this = {
		title : "提示",
		info : "",
		infoPic : "4",
		btns : [["关闭", function() {
					Box.close();
				}]],
		closer : {
			enabled : true,
			fun : function() {
				Box.close();
			}
		},
		nopadding : false,
		w : 390,
		h : 115,
		htmlID : null,
		frameUrl : null
	};
	var _lay = null;
	var _htmlStr = "<div id=\"tenpayBox\">";
	_htmlStr += "<p class=\"box_topLine\"><em></em></p>";
	_htmlStr += "<div id=\"boxMain\" class=\"box_main\">";
	_htmlStr += "<h4 id=\"boxTitleContainer\">";
	_htmlStr += "<a id=\"boxCloser\" href=\"javascript:void(0);\" title=\"关闭\"></a>";
	_htmlStr += "<span id=\"boxTitleInfo\"></span>";
	_htmlStr += "</h4>";
	_htmlStr += "<div id=\"boxContainer\" class=\"clear\"></div>";
	_htmlStr += "<div id=\"boxBtns\"></div>";
	_htmlStr += "</div>";
	_htmlStr += "<p class=\"box_bottomLine\"><em></em></p>";
	_htmlStr += "</div>";
	var _$ = function(s) {
		return typeof s == "object" ? s : document.getElementById(s);
	};
	var _isIE = (document.all) ? true : false;
	var _isIE6 = _isIE
			&& ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);
	var _center = function() {
		if (_$("tenpayBox")) {
			var sTop = Math.max(
					document.getElementsByTagName("html")[0].scrollTop,
					document.getElementsByTagName("body")[0].scrollTop);
			var sLeft = Math.max(
					document.getElementsByTagName("html")[0].scrollLeft,
					document.getElementsByTagName("body")[0].scrollLeft);
			var cHeight = document.getElementsByTagName("html")[0].clientHeight;
			var cWidth = document.getElementsByTagName("html")[0].clientWidth;
			_$("tenpayBox").style.top = (!_isIE6 ? Math.floor(cHeight / 2)
					- Math.floor(_$("tenpayBox").offsetHeight / 2)
					+ sTop
					- Math.max(document.body.scrollTop,
							document.documentElement.scrollTop) : Math
					.floor(cHeight / 2)
					- Math.floor(_$("tenpayBox").offsetHeight / 2) + sTop)
					+ "px";
			_$("tenpayBox").style.left = Math.floor(cWidth / 2)
					- Math.floor(_this.w / 2) + sLeft + "px";
		}
	};
	var _boxInit = function() {
		document.write(_htmlStr);
	};
	var _pushItem = function(that) {
		for (var item in that) {
			_this[item] = that[item];
		}
	};
	var _showBox = function() {
		with (_$("tenpayBox").style) {
			display = "inline";
			position = !_isIE6 ? "fixed" : "absolute";
			width = _this.w + "px";
		}
		_lay = _$(_lay)
				|| document.body.insertBefore(document.createElement("div"),
						document.body.childNodes[0]);
		with (_lay.style) {
			position = "absolute";
			opacity = 0.10;
			backgroundColor = "#ccc";
			filter = "alpha(opacity:10)";
			display = "block";
			left = top = 0;
			width = "100%";
			height = Math.max(
					document.getElementsByTagName("html")[0].clientHeight,
					document.documentElement.scrollHeight)
					+ "px";
			zIndex = 9999;
		}
		_lay.innerHTML = '<iframe src="about:blank" style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);"></iframe>';
		if (_isIE6) {
			window.attachEvent("onscroll", _center);
		}
		if (_isIE) {
			window.attachEvent("onresize", _center);
		} else {
			window.addEventListener("resize", _center, false);
		}
		if (loadHtml._id && loadHtml._id != _this.htmlID) {
			_$(loadHtml._id).innerHTML = loadHtml._html;
		}
		_min = 0;
		_showSlow();
		if (!_this.title) {
			_$("boxTitleContainer").style.display = "none";
		} else {
			_$("boxTitleContainer").style.display = "block";
		}
		if (_this.closer.enabled) {
			_$("boxCloser").style.display = "block";
		} else {
			_$("boxCloser").style.display = "none";
		}
		_$("boxCloser").onclick = _this.closer.fun;
	};
	var _max = 100;
	var _min = 0;
	var _showSlow = function() {
		var o = _$("tenpayBox");
		if (_min >= 100) {
			return false;
		}
		if (_isIE) {
			_min += 30;
		} else {
			_min += 20;
		}
		o.style.filter = "Alpha(Opacity=" + _min + ")";
		o.style.opacity = _min / 100;
		setTimeout(_showSlow, 20);
	};
	var _hideSlow = function() {
		var o = _$("tenpayBox");
		if (_max <= 0) {
			o.style.display = "none";
			return false;
		}
		if (_isIE) {
			_max -= 30;
		} else {
			_max -= 20;
		}
		o.style.filter = "Alpha(Opacity=" + _max + ")";
		o.style.opacity = _max / 100;
		setTimeout(_hideSlow, 20);
	};
	var _loadBtns = function() {
		_$("boxBtns").innerHTML = "";
		if (_this.btns && _this.btns.length > 0) {
			_$("boxBtns").style.display = "block";
			for (var i = 0; i < _this.btns.length; i++) {
				var _btn = document.createElement("button");
				_btn.innerHTML = _this.btns[i][0];
				_btn.setAttribute("id", "box_btn_" + i);
				_btn.onclick = _this.btns[i][1];
				_$("boxBtns").appendChild(_btn);
			}
			_$("box_btn_0").focus();
		} else {
			_$("boxBtns").style.display = "none";
		}
	};
	var boxClose = function() {
		_max = 100;
		_hideSlow();
		if (_lay) {
			_lay.style.display = "none";
		}
		if (_this.htmlID) {
			_$(_this.htmlID).innerHTML = loadHtml._html;
		}
	};
	var loadText = function(obj) {
		_pushItem(obj);
		_showBox();
		_$("boxContainer").innerHTML = "";
		_$("boxTitleInfo").innerHTML = _this.title;
		var _span = _div = null;
		_span = document.createElement("span");
		_div = document.createElement("div");
		_span.setAttribute("id", "spanContainerPic");
		_div.setAttribute("id", "divContainerInfo");
		_$("boxContainer").appendChild(_span);
		_$("boxContainer").appendChild(_div);
		_div.innerHTML = _this.info;
		if (_this.infoPic != "-1") {
			_span.className = "p" + _this.infoPic;
		}
		_$("boxContainer").appendChild(_span);
		_$("boxContainer").appendChild(_div);
		if (_this.nopadding) {
			_$("divContainerInfo").style.cssText = "padding:0px;";
		} else {
			_$("divContainerInfo").style.cssText = "";
		}
		_center();
		_loadBtns();
	};
	var loadHtml = {
		_html : "",
		_id : null,
		doLoad : function(obj) {
			_pushItem(obj);
			_showBox();
			loadHtml._id = _this.htmlID;
			_$("boxTitleInfo").innerHTML = _this.title;
			_$("boxContainer").innerHTML = loadHtml._html = _$(_this.htmlID).innerHTML;
			_$(_this.htmlID).innerHTML = "";
			_center();
			_loadBtns();
		}
	};
	var loadFrame = function(obj) {
		_pushItem(obj);
		_showBox();
		_$("boxContainer").innerHTML = "";
		_$("boxTitleInfo").innerHTML = _this.title;
		var _str = "<iframe src=\"" + _this.frameUrl + "\" width=\"" + _this.w
				+ "\" height=\"" + _this.h + "\" frameBorder=\"0\"></iframe>";
		if (_isIE) {
			_$("boxContainer").innerHTML = _str;
			_center();
			_loadBtns();
		} else {
			setTimeout(function() {
						_$("boxContainer").innerHTML = _str;
						_center();
						_loadBtns();
					}, 1);
		}
	};
	var boxSet = function(w, h) {
		if (w)
			(_$("tenpayBox").style.width = _this.w = w) + "px";
		if (h)
			(_$("tenpayBox").style.height = _this.h = h) + "px";
		_center();
	};
	_boxInit();
	return {
		text : loadText,
		html : loadHtml.doLoad,
		frame : loadFrame,
		close : boxClose,
		set : boxSet
	};
})();
var Box = Tenpay.Box;
var TFL = typeof(TFL) == "object" ? TFL : {};
function PageBar() {
	this.pageInfo = {
		recordcount : 0,
		positions : [],
		page : 1,
		returnPage : 1,
		pageSize : 8,
		returnPages : 0,
		noRecordcount : false,
		hasNext : false,
		offset : 2,
		radius : 3,
		handler : null,
		args : [],
		jumpSize : 10,
		isShowJumper : true,
		isShowPages : true,
		currentPage : 0,
		virtualPage : 0,
		totalPageSize : 0,
		viewSize : 0,
		defSize : 0
	};
}
PageBar.prototype = {
	$ : function(id) {
		return document.getElementById(id);
	},
	setPageInfo : function(pageInfo) {
		this.pageInfo.recordcount = pageInfo.recordcount
				|| this.pageInfo.recordcount;
		this.pageInfo.positions = pageInfo.positions || [];
		this.pageInfo.pageSize = pageInfo.pageSize || this.pageInfo.pageSize;
		this.pageInfo.jumpSize = pageInfo.jumpSize || this.pageInfo.jumpSize;
		this.pageInfo.returnPages = typeof(pageInfo.returnPages) == "number"
				? pageInfo.returnPages
				: this.pageInfo.returnPages;
		this.pageInfo.noRecordcount = typeof(pageInfo.noRecordcount) == "boolean"
				? pageInfo.noRecordcount
				: this.pageInfo.noRecordcount;
		this.pageInfo.hasNext = typeof(pageInfo.hasNext) == "boolean"
				? pageInfo.hasNext
				: this.pageInfo.hasNext;
		this.pageInfo.isShowJumper = typeof(pageInfo.isShowJumper) == "boolean"
				? pageInfo.isShowJumper
				: this.pageInfo.isShowJumper;
		this.pageInfo.isShowPages = typeof(pageInfo.isShowPages) == "boolean"
				? pageInfo.isShowPages
				: this.pageInfo.isShowPages;
		this.pageInfo.offset = typeof(pageInfo.offset) == "number"
				? pageInfo.offset
				: this.pageInfo.offset;
		this.pageInfo.radius = typeof(pageInfo.radius) == "number"
				? pageInfo.radius
				: this.pageInfo.radius;
		this.pageInfo.handler = pageInfo.handler || null;
		this.pageInfo.args = pageInfo.args || [];
		this.pageInfo.page = pageInfo.page || 1;
		this.pageInfo.returnPage = pageInfo.returnPage || 1;
		this.pageInfo.currentPage = Math.max(this.pageInfo.page - 1, 0);
		this.pageInfo.virtualPage = Math.max(this.pageInfo.returnPage - 1, 0)
				* this.pageInfo.returnPages + this.pageInfo.currentPage;
		this.pageInfo.totalPageSize = Math.ceil(this.pageInfo.recordcount
				/ this.pageInfo.pageSize);
		this.pageInfo.viewSize = this.pageInfo.radius * 2 + 1;
		this.pageInfo.defSize = 9;
	},
	getPageInfo : function() {
		return this.pageInfo;
	},
	getPageItem : function(page) {
		var currentPage = this.pageInfo.currentPage;
		var actualPage = this.pageInfo.noRecordcount ? Math.max(
				this.pageInfo.returnPage - 1, 0)
				* this.pageInfo.returnPages + page : page;
		var item = '<a${className} href="javascript:${link};">${page}</a>';
		item = item.replace("${page}", (actualPage + 1));
		if (page != currentPage) {
			item = item.replace("${link}", "TFL.PageBar.turnPage(" + page
							+ ", true, false)");
			item = item.replace("${className}", "");
		} else {
			item = item.replace("${link}", "void(0)");
			item = item.replace("${className}", " class=\"selected\"");
		}
		return item;
	},
	getPageItems : function(type) {
		var totalPageSize = this.pageInfo.totalPageSize;
		var currentPage = this.pageInfo.currentPage;
		var offset = this.pageInfo.offset;
		var radius = this.pageInfo.radius;
		var viewSize = this.pageInfo.viewSize;
		var defSize = this.pageInfo.defSize;
		var ellipsis = this.pageInfo.noRecordcount
				? ''
				: '<em class="ellipsis">…</em>';
		var tmp = "";
		var items = "";
		if (!this.pageInfo.noRecordcount) {
			if (0 == type) {
				for (var i = 0; i < totalPageSize; i++) {
					items += this.getPageItem(i);
				}
			} else {
				var tmpSize = radius < 3 ? viewSize + offset : viewSize;
				if (currentPage >= tmpSize - 1) {
					for (var i = 0; i < offset; i++) {
						items += this.getPageItem(i);
					}
					items += ellipsis;
					if (totalPageSize - defSize - 1 > 0
							&& totalPageSize - defSize - 1 <= offset) {
						for (var i = totalPageSize - defSize + offset; i < totalPageSize; i++) {
							items += this.getPageItem(i);
						}
					} else {
						if (totalPageSize - currentPage < tmpSize) {
							for (var i = totalPageSize - tmpSize; i < totalPageSize; i++) {
								items += this.getPageItem(i);
							}
						} else {
							for (var i = currentPage - radius; i <= currentPage
									+ radius; i++) {
								items += this.getPageItem(i);
							}
							items += ellipsis;
							for (var i = totalPageSize - offset; i < totalPageSize; i++) {
								items += this.getPageItem(i);
							}
						}
					}
				} else {
					for (var i = 0; i < tmpSize; i++) {
						items += this.getPageItem(i);
					}
					items += ellipsis;
					for (var i = totalPageSize - offset; i < totalPageSize; i++) {
						items += this.getPageItem(i);
					}
				}
			}
		} else {
			for (var i = 0; i < totalPageSize && i < this.pageInfo.returnPages; i++) {
				items += this.getPageItem(i);
			}
		}
		return items;
	},
	checkValue : function(isJump) {
		var pattern = /^\d+$/;
		var input = this.$("_pagebar_input");
		var v = 1;
		if (null != input) {
			v = input.value;
			if (!pattern.test(v)) {
				this.$("_pagebar_input").value = 1;
				v = 1;
			}
			v = parseInt(v, 10);
			if (v < 1) {
				v = 1;
			} else if (v > this.pageInfo.totalPageSize) {
				v = this.pageInfo.totalPageSize;
			}
			v = v - 1;
			if (v != this.pageInfo.currentPage && isJump) {
				this.turnPage(v, true, false);
			}
		}
	},
	getJumpInput : function() {
		var str = '<label>第<input type="text" value="'
				+ (this.pageInfo.currentPage + 1)
				+ '" id="_pagebar_input" onkeyup="TFL.PageBar.checkValue(false)">页 <button onclick="TFL.PageBar.checkValue(true)">跳转</button><label>';
		return str;
	},
	turnPage : function(offset, isPage, isInit) {
		var isCurrentPage = false;
		var isLTZero = false;
		if (isPage) {
			isCurrentPage = (offset == this.pageInfo.currentPage);
			this.pageInfo.currentPage = offset;
		} else {
			isCurrentPage = false;
			this.pageInfo.currentPage += offset;
		}
		var currentPage = this.pageInfo.currentPage;
		var totalPageSize = this.pageInfo.totalPageSize;
		if (currentPage < 0) {
			isLTZero = true;
			this.pageInfo.currentPage = 0;
		}
		if (currentPage > totalPageSize - 1) {
			this.pageInfo.currentPage = totalPageSize - 1;
		}
		if (this.pageInfo.noRecordcount) {
			this.pageInfo.virtualPage = Math.max(this.pageInfo.returnPage - 1,
					0)
					* this.pageInfo.returnPages + this.pageInfo.currentPage;
		}
		this.draw();
		if (null != this.pageInfo.handler && (!isCurrentPage || isInit)) {
			if (this.pageInfo.noRecordcount && isLTZero) {
				this.pageInfo.currentPage -= 1;
			}
			this.pageInfo.handler.apply(this.pageInfo.handler,
					this.pageInfo.args);
		}
	},
	getPageBar : function() {
		var totalPageSize = this.pageInfo.totalPageSize;
		var currentPage = this.pageInfo.currentPage;
		if (totalPageSize > 1) {
			var str = '<div class="page-bar">';
			str += this.pageInfo.isShowPages ? '<span>' + (currentPage + 1)
					+ '/' + totalPageSize + '页</span>' : "";
			if (currentPage > 0 || this.pageInfo.noRecordcount) {
				if (0 == currentPage && this.pageInfo.noRecordcount
						&& 0 == this.pageInfo.virtualPage) {
					str += '<a class="text dis" href="javascript://">上一页</a>';
				} else {
					str += '<a class="text" href="javascript:TFL.PageBar.turnPage(-1, false, false);">上一页</a>';
				}
			}
			if (totalPageSize <= this.pageInfo.defSize) {
				str += this.getPageItems(0);
			} else {
				str += this.getPageItems(1);
			}
			if (currentPage < totalPageSize - 1 || this.pageInfo.noRecordcount) {
				if ((currentPage == totalPageSize - 1 || currentPage == this.pageInfo.returnPages
						- 1)
						&& !this.pageInfo.hasNext
						&& this.pageInfo.noRecordcount) {
					str += '<a class="text dis" href="javascript://">下一页</a>';
				} else {
					str += '<a class="text" href="javascript:TFL.PageBar.turnPage(1, false, false);">下一页</a>';
				}
			}
			if (totalPageSize > this.pageInfo.jumpSize
					&& this.pageInfo.isShowJumper) {
				str += this.getJumpInput();
			}
			str += "</div>";
			return str;
		} else {
			return "";
		}
	},
	draw : function() {
		var positions = this.pageInfo.positions;
		var len = positions.length;
		var pos = null;
		var pageBar = this.getPageBar();
		for (var i = 0; i < len; i++) {
			pos = this.$(positions[i]);
			if (pos) {
				pos.innerHTML = pageBar;
			}
		}
	},
	init : function(pageInfo) {
		this.setPageInfo(pageInfo);
		this.turnPage(this.pageInfo.currentPage, true, true);
	}
};
TFL.PageBar = new PageBar();
var Browser = (function() {
	var userAgent = navigator.userAgent.toLowerCase();
	var env = null;
	return (env = userAgent.match(/msie ([\d.]+)/)) ? {
		type : "MSIE",
		version : env[1]
	} : (env = userAgent.match(/firefox\/([\d.]+)/)) ? {
		type : "FireFox",
		version : env[1]
	} : (env = userAgent.match(/opera.([\d.]+)/)) ? {
		type : "Opera",
		version : env[1]
	} : (env = userAgent.match(/version\/([\d.]+).*safari/)) ? {
		type : "Safari",
		version : env[1]
	} : (env = userAgent.match(/chrome\/([\d.]+)/)) ? {
		type : "Chrome",
		version : env[1]
	} : {
		type : "Unknown",
		version : 0
	};
})();
String.prototype.size = function() {
	return this.replace(/[^\u0000-\u00FF]/g, "**").length;
};
String.prototype.trim = function() {
	return this.replace(/[\s ]/g, "");
};
String.prototype.cut = function(size) {
	if (this.size() <= size) {
		return this;
	} else {
		var chrs = this.split("");
		var len = 0;
		var tmp = "";
		for (var i = 0; i < chrs.length; i++) {
			len += chrs[i].size();
			if (len <= size) {
				tmp += chrs[i];
			} else {
				tmp += "...";
				break;
			}
		}
		return tmp;
	}
};
String.prototype.replaceHTML = function() {
	var tmp = this.replace(/\</g, "&lt;");
	tmp = tmp.replace(/\>/g, "&gt;");
	return tmp;
};
var Wallet = {
	pageType : 0,
	$hostname : location.protocol + "//" + location.host,
	$base : "http://wallet.tenpay.com/wallet/",
	$www : "https://www.tenpay.com/wallet/new/",
	$loading : '<img src="https://www.tenpay.com/wallet/new/img/loading.gif" alt="" border="0" align="absmiddle" />',
	$ : function(id) {
		return document.getElementById(id);
	},
	$Box : typeof(Box) == "undefined" ? null : Box,
	$pwdctrl : typeof(TFL) == "undefined" ? null : TFL.pwdControl || null,
	isIE6 : false,
	getRespXML : function(data) {
		var _xml = new Wallet.XML();
		var retcode = this.getNodeValue(_xml, data, "retcode/text()");
		var retmsg = this.getNodeValue(_xml, data, "retmsg/text()");
		return {
			xml : _xml,
			code : retcode,
			msg : retmsg
		};
	},
	getNodeValue : function(_xml, xmlDoc, xpath) {
		var node = null != xmlDoc ? _xml.selectSingleNode(xmlDoc, xpath) : null;
		var text = null == node ? null : node.nodeValue;
		_xml = null;
		_xmlDoc = null;
		return text;
	},
	getTipsInfo : function(idStr) {
		var info = "";
		var obj = this.$(idStr);
		if (obj) {
			info = obj.innerHTML;
		}
		obj = null;
		return info;
	},
	showTips : function(idStr, isShow, tips) {
		if (this.$(idStr)) {
			if (isShow && tips) {
				var tags = this.$(idStr).getElementsByTagName("span");
				if (tags.length > 0) {
					tags[0].innerHTML = tips;
				}
			}
			this.$(idStr).style.display = isShow ? "block" : "none";
		}
	},
	setFrameHash : function(hash) {
		Wallet.$("agentFrame").src = this.$base + "agent.html" + hash;
	},
	getParameter : function(key) {
		var search = document.location.search;
		var pattern = new RegExp("[?&]" + key + "\=([^&]+)", "g");
		var matcher = pattern.exec(search);
		var items = null;
		if (null != matcher) {
			items = this.decode(matcher[1]);
		}
		return items;
	},
	encode : function(str) {
		return encodeURIComponent(str);
	},
	decode : function(str) {
		return decodeURIComponent(str);
	},
	filterChar : function(str) {
		var temp = "";
		if (str) {
			temp = str.replace(/%/g, "%25").replace(/\r\n/g, "%0D%0A").replace(
					/=/g, "%3D").replace(/&/g, "%26").replace(/\?/g, "%3F")
					.replace(/\+/g, "%2B");
		}
		return temp;
	},
	getTimeStamp : function() {
		return (new Date()).getTime();
	},
	setCookie : function(key, value, domain, expires) {
		var args = arguments;
		var size = args.length;
		var exp = 0;
		switch (size) {
			case 2 :
				document.cookie = key + "=" + this.encode(value) + "; path=/;";
				break;
			case 3 :
				document.cookie = key + "=" + this.encode(value)
						+ "; path=/; domain=" + domain;
				break;
			case 4 :
				exp = new Date((new Date().getTime() + expires * 3600000))
						.toGMTString();
				document.cookie = key + "=" + this.encode(value)
						+ "; path=/; domain=" + domain + "; expires=" + exp;
				break;
			default :
				throw new Error("设置cookie时参数错误！");
		}
	},
	getCookie : function(key) {
		var cookie = document.cookie;
		var items = cookie.split("; ");
		var item = [];
		var size = items.length;
		for (var i = 0; i < size; i++) {
			item = items[i].split("=");
			if (key == item[0] && item.length == 2) {
				return this.decode(item[1]);
			}
		}
		return null;
	},
	getPosition : function(obj) {
		var _x = 0;
		var _y = 0;
		while (null != obj.offsetParent) {
			_x += obj.offsetLeft;
			_y += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {
			x : _x,
			y : _y
		};
	},
	getWalletCookie : function() {
		var _uin = this.getCookie("wallet_u");
		var _key = this.getCookie("wallet_s");
		var _qluin = this.getCookie("qluin");
		var _qlskey = this.getCookie("qlskey");
		return {
			uin : _uin,
			key : _key,
			qluin : _qluin,
			qlskey : _qlskey
		};
	},
	active : function(from) {
		window.name = "https://www.tenpay.com/wallet/new/reg.shtml?ADTAG="
				+ (from || "REG.WALLET.QQ.ZHIFUZHONGXIN");
		location.href = "http://wallet.tenpay.com/wallet/proxy.html";
	},
	doForm : function(url, target, method, params) {
		var f = document.createElement("form");
		var sInput = "";
		f.method = method;
		f.target = target;
		f.action = url;
		for (var key in params) {
			sInput += '<input type="hidden" name="' + key + '" value="'
					+ params[key] + '" />';
		}
		f.innerHTML = sInput;
		document.body.appendChild(f);
		f.submit();
		document.body.removeChild(f);
		f = null;
	},
	redirect : function(url) {
		var c = this.getWalletCookie();
		var uin = c.uin;
		var key = c.key;
		var desUrl = "http://ptlogin2.qq.com/jump?clientuin=" + uin
				+ "&clientkey=" + key + "&u1=" + this.encode(url);
		window.open(desUrl);
	},
	redirectTo : function(url, inWallet, isFlush) {
		var c = this.getWalletCookie();
		var uin = c.uin;
		var key = c.key;
		var flush = isFlush ? "&flush_cookie=1" : "";
		var jumper = "https://www.tenpay.com/cgi-bin/v1.0/wallet_loginto_cft.cgi";
		var desUrl = jumper + "?COOKIE_wallet_s=" + key + "&COOKIE_wallet_u="
				+ uin + "&tourl=" + this.encode(url) + flush;
		if (inWallet) {
			Wallet.Loading.showLoading(330, 32);
			location.href = desUrl;
		} else {
			jumper = "https://www.tenpay.com/wallet/new/loading.html";
			this.doForm(jumper, "_blank", "get", {
						"j" : 1,
						"COOKIE_wallet_s" : key,
						"COOKIE_wallet_u" : uin,
						"qluin" : c.qluin,
						"qlskey" : c.qlskey,
						"tourl" : url,
						"flush_cookie" : isFlush ? 1 : 0
					});
		}
	},
	redirectCFT : function(url) {
		var desUrl = "https://www.tenpay.com/cgi-bin/v1.0/mchpassport.cgi?tid=mchpassport_jump&cmdno=91&chnid=00000006&resulturl="
				+ this.encode(url)
				+ "&tourl=http://portal.tenpay.com/cgi-bin/common/portalloginret.cgi";
		this.redirectTo(desUrl);
	},
	redirectMCH : function(action, attach) {
		var desUrl = "https://www.tenpay.com/cgi-bin/v1.0/jumpto_mch.cgi?action="
				+ action + "&attach=" + attach;
		this.redirectTo(desUrl, false, true);
	},
	redirectMoney : function() {
		var obj = {
			"0" : "o",
			"1" : "o0",
			"2" : "o00",
			"3" : "o000",
			"4" : "o0000",
			"5" : "o00000"
		};
		var uin = this.getWalletCookie().uin;
		var key = this.getWalletCookie().key;
		var idx = 10 - uin.length;
		uin = obj[idx] + uin;
		window.open("http://money.tenpay.com/wlcookie.shtml?uin=" + uin
				+ "&skey=" + key);
	},
	redirectAIR : function(line, url) {
		var uin = this.getWalletCookie().uin;
		var key = this.getWalletCookie().key;
		var param = "clientuin=" + uin + "&clientkey=" + key + "&resulturl="
				+ this.encode(url);
		var jumper = "https://www.tenpay.com/wallet/new/loading.html";
		this.doForm(jumper, "_blank", "get", {
					"j" : 2,
					"l" : line,
					"p" : param
				});
	},
	redirectMobile : function(url, newWin) {
		var uin = this.getWalletCookie().uin;
		var key = this.getWalletCookie().key;
		var desUrl = "http://wallet.tenpay.com/cgi-bin/jumpmobile.cgi?COOKIE_wallet_s="
				+ key
				+ "&COOKIE_wallet_u="
				+ uin
				+ "&tourl="
				+ this.encode(url);
		if (newWin) {
			window.open(desUrl);
		} else {
			window.location = desUrl;
		}
	},
	closeWin : function() {
		var win = window.open("", "_top", "");
		win.close();
	},
	gotoHomePage : function() {
		location.href = 'http://wallet.tenpay.com/wallet/index.shtml';
	},
	setTab : function(tab) {
		this.setCookie("wallet_tab", tab, "tenpay.com");
	},
	getTab : function() {
		return this.getCookie("wallet_tab");
	},
	initTab : function() {
		var loading = Wallet.$("content_loading");
		var contnet = Wallet.$("tab_content");
		var tab = this.getTab();
		if (loading) {
			loading.className = "tab-body hidden";
		}
		if (contnet) {
			contnet.className = "tab-body";
		}
		if ("1" == tab) {
			this.Tab.initPanel(this.$("tab_msg"), this.$("tab_content"),
					"msgList");
			this.setTab(1);
		} else if ("2" == tab) {
			this.App.open(
					'https://www.tenpay.com/wallet/new/assis_credit.shtml', 2);
			this.setTab(0);
			this.Tab.initPanel(this.$("tab_assistant"), this.$("tab_content"),
					"appFrame");
		} else {
			this.Tab.initPanel(this.$("tab_assistant"), this.$("tab_content"),
					"applyList");
			this.setTab(0);
		}
	},
	clickStat : function(tag) {
		Wallet.Stat.clickStat(tag);
	},
	keep_session : function() {
		setInterval(function() {
					Wallet.Loader.setSession();
				}, 600000);
	},
	resetHeader : function(type) {
		var oLogo = null;
		var oLink = null;
		try {
			oLogo = parent.document.getElementById("cft_logo");
			oLink = parent.document.getElementById("titleBarLink");
			if (1 == type) {
				oLogo.style.display = "none";
				oLink.style.display = "block";
				parent.showBubbleTips();
			} else {
				oLink.style.display = "none";
				oLogo.style.display = "block";
				parent.hideBubbleTips();
			}
		} catch (e) {
		} finally {
			oLogo = null;
			oLink = null;
		}
	},
	getOuterStyle : function(selector, attr) {
		var stylesheet = document.styleSheets;
		var size = stylesheet.length;
		var sheet = null;
		var rules = null;
		var ruleSize = 0;
		var rule = null;
		for (var i = 0; i < size; i++) {
			sheet = stylesheet.item(i);
			rules = sheet.rules || sheet.cssRules;
			ruleSize = rules.length;
			for (var j = 0; j < ruleSize; j++) {
				rule = rules[j];
				if (!rule.selectorText)
					continue;
				if (selector == rule.selectorText) {
					return rule.style[attr];
				}
			}
		}
		return null;
	},
	initPage : function(type) {
		this.pageType = type;
		switch (this.pageType) {
			case -1 :
				this.My.welcome();
				this.keep_session();
				break;
			case 0 :
				this.My.my_tenpay();
				this.ST.init();
				this.Msg.isInit = true;
				this.Msg.queryMessage({
							action : "query_msg_count",
							read_flag : 0
						});
				this.My.my_qq();
				this.ST.loadText();
				break;
			case 1 :
				break;
			case 2 :
				this.Draw.setPageParam();
				break;
			case 3 :
				this.Reg.drawPasswdCtrl();
				break;
			case 4 :
				break;
			case 5 :
				Wallet.My.query_balance(1);
				this.RPay.initParam();
			case 6 :
				this.RPay.setAccount();
				this.RPay.initData(true);
				break;
			case 7 :
				this.RPay.payment_ok();
				break;
			case 8 :
				this.RPay.receipts_ok();
				break;
		}
	}
};
var My = {
	$baseUrl : Wallet.$hostname + "/cgi-bin/qq/",
	$payUrl : "http://life.tenpay.com/wallet/qqservice/service_cft.shtml",
	$balance : 0,
	$qry_qbqd_btns : '',
	$service : {
		"LTMCLUB" : {
			name : "QQ会员",
			stat : 'QQ_VIP',
			className : " svc-vip-s",
			off : " svc-vip-d",
			on : false,
			url : '#0'
		},
		"SHSQ" : {
			ref : "LTMCLUB"
		},
		"WDYLC" : {
			ref : "LTMCLUB"
		},
		"DDCLUB" : {
			ref : "LTMCLUB"
		},
		"SJCLUB" : {
			ref : "LTMCLUB"
		},
		"XXJZGW" : {
			name : "黄钻贵族",
			stat : 'QQ_YELLOW',
			className : " svc-yellow-s",
			off : " svc-yellow-d",
			on : false,
			url : '#1'
		},
		"LTWXCLUB" : {
			ref : "XXJZGW"
		},
		"QZYXC" : {
			ref : "XXJZGW"
		},
		"QWXXJZGW" : {
			ref : "XXJZGW"
		},
		"XXQQF" : {
			name : "红钻贵族",
			stat : 'QQ_RED',
			className : " svc-red-s",
			off : " svc-red-d",
			on : false,
			url : '#2'
		},
		"WDSSX" : {
			ref : "XXQQF"
		},
		"XXZXYY" : {
			name : "绿钻贵族",
			stat : 'QQ_GREEN',
			className : " svc-green-s",
			off : " svc-green-d",
			on : false,
			url : '#3'
		},
		"XXYYSJ" : {
			ref : "XXZXYY"
		},
		"XXQGAME" : {
			name : "蓝钻贵族",
			stat : 'QQ_BLUE',
			className : " svc-blue-s",
			off : " svc-blue-d",
			on : false,
			url : '#4'
		},
		"YXXYQH" : {
			ref : "XXQGAME"
		},
		"XXGAMEYF" : {
			ref : "XXQGAME"
		},
		"CFCLUB" : {
			name : "CF会员",
			stat : 'QQ_CF',
			className : " svc-cf-s",
			off : " svc-cf-d",
			on : false,
			url : '#10'
		},
		"DNFHZ" : {
			name : "DNF黑钻",
			stat : 'QQ_DNF',
			className : " svc-black-s",
			off : " svc-black-d",
			on : false,
			url : '#5'
		},
		"PETVIP" : {
			name : "粉钻贵族",
			stat : 'QQ_PET',
			className : " svc-pink-s",
			off : " svc-pink-d",
			on : false,
			url : '#7'
		},
		"QQR2BY" : {
			name : "音速紫钻",
			stat : 'QQ_YS',
			className : " svc-purple-s",
			off : " svc-purple-d",
			on : false,
			url : '#11'
		},
		"XXQQT" : {
			name : "QQ堂紫钻",
			stat : 'QQ_TANG',
			className : " svc-purple-s",
			off : " svc-purple-d",
			on : false,
			url : '#12'
		},
		"QQFCZZ" : {
			name : "飞车紫钻",
			stat : 'QQ_FC',
			className : " svc-purple-s",
			off : " svc-purple-d",
			on : false,
			url : '#6'
		},
		"XXLOVE" : {
			name : "QQ交友",
			stat : 'QQ_LOVE',
			className : " svc-love-s",
			off : " svc-love-d",
			on : false,
			url : '#13'
		},
		"QQYXGZ" : {
			name : "音信贵族",
			stat : 'QQ_YX',
			className : " svc-letter-s",
			off : " svc-letter-d",
			on : false,
			url : '#14'
		}
	},
	$qry_user_info : function() {
		var args = arguments;
		var ret = args[0];
		var status = ret.status;
		ret.data = null != ret.data ? ret.data.documentElement : null;
		if (200 == status) {
			var resp = Wallet.getRespXML(ret.data);
			var _xml = resp.xml;
			if ("00" == resp.code) {
				var furl = Wallet.getNodeValue(_xml, ret.data,
						"face_url/text()");
				var nickname = Wallet.getNodeValue(_xml, ret.data,
						"nick_name/text()")
						|| Wallet.getCookie("wallet_u");
				nickname = nickname.replaceHTML();
				Wallet.My.$setUsrInfo(furl, nickname);
			}
		}
	},
	dealImgError : function(obj) {
		obj.src = Wallet.$www + "img/face.jpg";
	},
	$setUsrInfo : function(face, nickname) {
		var hour = (new Date()).getHours();
		var helloStr = "欢迎您，";
		if (hour >= 5 && hour < 11) {
			helloStr = "早上好，"
		}
		if (hour >= 11 && hour < 13) {
			helloStr = "中午好，"
		}
		if (hour >= 13 && hour < 17) {
			helloStr = "下午好，"
		}
		if (hour >= 17 && hour < 23) {
			helloStr = "晚上好，"
		}
		if (hour >= 23 && hour < 5) {
			helloStr = "夜深了，"
		}
		Wallet.$("usrAvatar").innerHTML = '<img src="'
				+ face
				+ '" onerror="Wallet.My.dealImgError(this)" width="20" height="20" border="0" alt="" />';
		Wallet.$("nickName").innerHTML = helloStr + '' + nickname + '！';
	},
	welcome : function() {
		var _url = this.$baseUrl + "qq_user_info.cgi";
		var req = new Wallet.Ajax();
		req.sendRequest({
					method : "GET",
					url : _url,
					handler : this.$qry_user_info,
					args : [],
					timeout : -1,
					interval : -1
				});
	},
	$set_my_tenpay : function(isTenpay) {
		var _baseTop = "nav nav-top";
		var _baseMiddle = "nav nav-middle";
		var _baseBottom = "nav nav-bottom";
		Wallet.$("cft_top").className = isTenpay ? _baseTop : _baseTop
				+ " nav-top-dis";
		Wallet.$("cft_middle").className = isTenpay ? _baseMiddle : _baseMiddle
				+ " nav-middle-dis";
		Wallet.$("cft_bottom").className = isTenpay ? _baseBottom : _baseBottom
				+ " nav-bottom-dis";
		Wallet.$("cft_usr").style.display = isTenpay ? "block" : "none";
		Wallet.$("qq_usr").style.display = isTenpay ? "none" : "block";
	},
	is_cft_usr : function() {
		return ("1" == Wallet.getCookie("is_cft_user"));
	},
	my_tenpay : function() {
		this.$set_my_tenpay(this.is_cft_usr());
	},
	$qry_loading : function(isLoaded, money) {
		var obj = Wallet.$("qry_blance");
		var btn = Wallet.$("qry_balance_btn");
		if (btn) {
			btn.style.visibility = "hidden";
		}
		if (isLoaded) {
			obj.innerHTML = money;
		} else {
			obj.innerHTML = Wallet.$loading + ' 查询中...';
		}
	},
	$format_balance : function(m) {
		if (m.indexOf(".") == -1) {
			return new Number(m).toFixed(2);
		} else {
			return m;
		}
	},
	$getYuan : function(fen) {
		var iFen = fen * 1;
		var yuan = (iFen / 100).toFixed(2);
		return yuan;
	},
	$outShow : function(m) {
		var i = m * 1;
		if (i >= 100000) {
			return Math.floor(i);
		}
		return i;
	},
	$qry_balance : function() {
		var args = arguments;
		var ret = args[0];
		var status = ret.status;
		var qry_fail = '<span class="gray">查询失败<a href="javascript:Wallet.My.query_balance(2);">重试</a></span>';
		ret.data = null != ret.data ? ret.data.documentElement : null;
		if (200 == status) {
			var resp = Wallet.getRespXML(ret.data);
			var _xml = resp.xml;
			var m = Wallet.getNodeValue(_xml, ret.data,
					"balance_available/text()")
					|| "0.00";
			if ("00" == resp.code) {
				Wallet.My.$balance = Wallet.My.$format_balance(Wallet.My
						.$getYuan(m)
						+ "");
				Wallet.My.$qry_loading(true, '<strong title="'
								+ Wallet.My.$balance + '元">'
								+ Wallet.My.$outShow(Wallet.My.$balance)
								+ '</strong>元');
			} else {
				Wallet.My.$qry_loading(true, qry_fail);
			}
		} else {
			Wallet.My.$qry_loading(true, qry_fail);
		}
	},
	$show_balance : function() {
		Wallet.$("qryBalanceFrame").style.display = "block";
		Wallet.$("qry_blance").style.display = "none";
	},
	query_balance : function(where) {
		if (-1 == where) {
			var ifr = Wallet.$("qryBalanceFrame");
			ifr.attachEvent("onload", this.$show_balance);
			Wallet.$("qryBalanceFrame").src = "https://www.tenpay.com/wallet/new/query_balance.shtml";
			this.$qry_loading(false);
		} else {
			this.$qry_loading(false);
			var _url = Wallet.$hostname + "/cgi-bin/v1.0/cft_balance.cgi";
			var req = new Wallet.Ajax();
			req.sendRequest({
						method : "GET",
						url : _url,
						param : "request_src=wallet",
						handler : this.$qry_balance,
						args : [],
						timeout : -1,
						interval : -1
					});
		}
	},
	$getClsName : function(type) {
		return this.$service[type] ? this.$service[type].className : "";
	},
	$getCloseDate : function(dtstr) {
		var tmp = dtstr || "";
		var year = (parseInt(tmp.substr(0, 4), 10) + 1900) + "年";
		var month = tmp.substr(5, 2) + "月";
		var date = tmp.substr(8, 2) + "日";
		return year + month + date;
	},
	$getPayUrl : function(type) {
		return this.$service[type]
				? this.$service[type].url
				: "http://pay.qq.com/";
	},
	$mark_service : function(type, close_date) {
		var svr = typeof(this.$service[type]) == "object"
				? this.$service[type]
				: null;
		if (svr) {
			if (svr.ref) {
				svr = this.$service[svr.ref];
			}
			svr.on = true;
			svr.date = close_date;
		}
	},
	$show_qq_sv : function(_xml, recordset) {
		var size = recordset.length;
		var str = [];
		var record = null;
		var service_type = "";
		var close_date = "";
		var service_name = "";
		for (var i = 0; i < size; i++) {
			record = recordset[i];
			service_type = Wallet.getNodeValue(_xml, record,
					"service_type/text()");
			close_date = Wallet.getNodeValue(_xml, record, "close_time/text()");
			service_name = Wallet.getNodeValue(_xml, record,
					"service_name/text()");
			this.$mark_service(service_type, close_date);
		}
		if (size > 0) {
			for (var v in this.$service) {
				if (this.$service[v].on) {
					str
							.push('<code class="service'
									+ this.$service[v].className
									+ '" title="服务将于'
									+ this.$getCloseDate(this.$service[v].date)
									+ '到期"><span class="svr-on">'
									+ this.$service[v].name
									+ '</span><a onclick="Wallet.resetHeader(1);Wallet.clickStat(\'QQ.WALLET.YEWU_XUFEI.'
									+ this.$service[v].stat + '\')" href="'
									+ this.$payUrl + this.$service[v].url
									+ '">续费</a></code>');
				}
			}
		}
		if (size < 13) {
			for (var s in this.$service) {
				if (!this.$service[s].on && !this.$service[s].ref) {
					var suffix = (this.$service[s].url).substr(1);
					var tips = Wallet.getTipsInfo("svr_" + suffix);
					str
							.push('<code class="service'
									+ this.$service[s].off
									+ '" title="'
									+ tips
									+ '"><span>'
									+ this.$service[s].name
									+ '</span><a onclick="Wallet.resetHeader(1);Wallet.clickStat(\'QQ.WALLET.YEWU_KAITONG.'
									+ this.$service[s].stat + '\')" href="'
									+ this.$payUrl + this.$service[s].url
									+ '">开通</a></code>');
				}
			}
		}
		Wallet.$("myService").innerHTML = "";
		var sp = new SlidePanel();
		sp.init({
			id : 0,
			width : 140,
			height : 89,
			wayWidth : 0,
			wayHeight : 89,
			barWidth : 10,
			barHeight : 16,
			scrollSize : 21,
			target : "myService",
			cssTexts : [
					'.slide-panel{background-color:transparent;}',
					'.slide-way{border-left:1px solid #686868; border-right:1px solid #fff;}',
					'.slide-bar{background:transparent url(' + Wallet.$www
							+ 'img/icon_service.gif) no-repeat -197px -542px;}',
					'.slide-bar-hover{background:transparent url('
							+ Wallet.$www
							+ 'img/icon_service.gif) no-repeat -207px -542px;}',
					'.slide-bar-dis{background:transparent url(' + Wallet.$www
							+ 'img/icon_service.gif) no-repeat -197px -542px;}']
		});
		sp.create(str);
	},
	$qry_qq_info : function(s1, s2, s3) {
		Wallet.$("sv_net_err").style.display = s1;
		Wallet.$("sv_failed").style.display = s2;
		Wallet.$("sv_loading").style.display = s3;
	},
	$qry_qq_sv : function() {
		var args = arguments;
		var ret = args[0];
		var status = ret.status;
		ret.data = null != ret.data ? ret.data.documentElement : null;
		if (200 == status) {
			var resp = Wallet.getRespXML(ret.data);
			var _xml = resp.xml;
			var serives = _xml.selectNodes(ret.data, "services") || [];
			var recordset = [];
			if ("00" == resp.code) {
				if (serives.length > 0) {
					var xmlStr = (Wallet.getNodeValue(_xml, ret.data,
							"services/text()") || "").replace(/\&/g, "&amp;");
					var _xmlDoc = _xml.loadXML(xmlStr);
					recordset = _xml.selectNodes(_xmlDoc, "record") || [];
					Wallet.My.$show_qq_sv(_xml, recordset);
				}
			} else {
				Wallet.$("sv_failed").innerHTML = resp.msg
						+ '。<a href="javascript:Wallet.My.retry();">重试</a>';
				Wallet.My.$qry_qq_info("none", "", "none");
			}
		} else if ("TIMEOUT" == status) {
			Wallet.$("sv_failed").innerHTML = '服务器响应超时。<a href="javascript:Wallet.My.retry();">重试</a>';
			Wallet.My.$qry_qq_info("none", "", "none");
		} else {
			Wallet.My.$qry_qq_info("", "none", "none");
		}
	},
	retry : function() {
		Wallet.My.$qry_qq_info("none", "none", "");
		this.my_qq();
	},
	my_qq : function() {
		var _url = this.$baseUrl + "get_qq_services.cgi";
		var req = new Wallet.Ajax();
		req.sendRequest({
					method : "GET",
					url : _url,
					handler : this.$qry_qq_sv,
					args : [],
					timeout : 5000,
					interval : -1
				});
	},
	changeVerify : function() {
		Wallet.$("verify_img").src = 'http://ptlogin2.tenpay.com/getimage?aid=14000401&'
				+ Math.random();
		Wallet.$("vc").value = "";
	},
	cancel : function() {
		Wallet.$Box.close();
	},
	$show_result : function(jf, qb, qd, qb_freeze, qd_freeze) {
		var freeze = (1 == qb_freeze || 1 == qd_freeze) ? "freeze" : "well";
		var str = Wallet.getTipsInfo("qry_qb_result");
		str = str.replace("${id}", "qry_qb_ret");
		str = str.replace(" ${qb_del}", (1 == qb_freeze ? ' del' : ''));
		str = str.replace("${qb}", qb);
		str = str.replace("${qb_freeze}", (1 == qb_freeze
						? '<em>(已被冻结)</em>'
						: ''));
		str = str.replace(" ${qd_del}", (1 == qd_freeze ? ' del' : ''));
		str = str.replace("${qd}", qd);
		str = str.replace("${qd_freeze}", (1 == qd_freeze
						? '<em>(已被冻结)</em>'
						: ''));
		str = str.replace("${jf}", jf);
		str = str.replace(" ${jf_del}", ((1 == qb_freeze || 1 == qd_freeze)
						? ' no-indent'
						: ''));
		str = str.replace("${freeze}", freeze);
		Wallet.$Box.text({
					infoPic : -1,
					nopadding : true,
					w : 400,
					title : Wallet.getTipsInfo("qry_title"),
					info : str,
					btns : ""
				});
	},
	$qry_qb_tips : function(isShow, msgStr) {
		var tips = Wallet.$("chk_vc_err");
		var msg = Wallet.$("chk_vc_msg");
		if (tips && msg) {
			tips.style.display = isShow ? "block" : "none";
			if (isShow) {
				msg.innerHTML = msgStr;
			}
		}
	},
	$qry_qb : function() {
		Wallet.My.querying(false);
		var args = arguments;
		var ret = args[0];
		var status = ret.status;
		ret.data = null != ret.data ? ret.data.documentElement : null;
		if (200 == status) {
			var resp = Wallet.getRespXML(ret.data);
			var _xml = resp.xml;
			var jf = (Wallet.getNodeValue(_xml, ret.data,
					"jifen_balance/text()") || "0分").replace(
					/[^\u0000-\u00FF]/g, "");
			var qb = (Wallet.getNodeValue(_xml, ret.data, "qb_balance/text()") || "0.00个")
					.replace(/[^\u0000-\u00FF]/g, "");
			var qd = (Wallet.getNodeValue(_xml, ret.data, "qd_balance/text()") || "0.0点")
					.replace(/[^\u0000-\u00FF]/g, "");
			var qb_freeze = parseInt(Wallet.getNodeValue(_xml, ret.data,
							"qb_freeze_status/text()")
							|| "0", 10);
			var qd_freeze = parseInt(Wallet.getNodeValue(_xml, ret.data,
							"qd_freeze_status/text()")
							|| "0", 10);
			if ("00" == resp.code) {
				Wallet.My.$show_result(jf, qb, qd, qb_freeze, qd_freeze);
			} else {
				if ("01220004" == resp.code) {
					Wallet.My.$qry_qb_tips(true, "您输入的验证码不正确！");
					Wallet.$("vc").focus();
					Wallet.$("vc").value = "";
					Wallet.My.changeVerify();
					return false;
				} else {
					Wallet.$("qry_qb").innerHTML = Wallet
							.getTipsInfo("qry_qb_err").replace("${retmsg}",
									resp.msg);
				}
			}
		} else {
			Wallet.$Box.text({
						infoPic : 4,
						title : Wallet.getTipsInfo("tips_title"),
						info : Wallet.getTipsInfo("net_err").replace(
								"${status}", status),
						btns : [["关闭", function() {
									Wallet.My.cancel();
								}]]
					});
		}
	},
	querying : function(flag) {
		var btns = Wallet.$("qry_qbqd_btns");
		if (null != btns) {
			if (flag) {
				this.$qry_qbqd_btns = btns.innerHTML;
				btns.style.textAlign = "center";
				Wallet.$("vc").disabled = true;
				btns.innerHTML = Wallet.$loading + " 处理中，请稍候...";
			} else {
				if (this.$qry_qbqd_btns) {
					btns.style.textAlign = "";
					Wallet.$("vc").disabled = false;
					btns.innerHTML = this.$qry_qbqd_btns;
				}
			}
		}
	},
	query : function() {
		var vcode = Wallet.$("vc");
		var v = vcode.value;
		if ("" == v.trim()) {
			this.$qry_qb_tips(true, "请输入验证码！");
			vcode.focus();
			return false;
		}
		this.$qry_qb_tips(false);
		this.querying(true);
		var _url = "/cgi-bin/queryqb.cgi";
		var req = new Wallet.Ajax();
		req.sendRequest({
					method : "GET",
					url : _url,
					param : "verifycode=" + v,
					handler : this.$qry_qb,
					args : [],
					timeout : -1,
					interval : -1
				});
	},
	commit : function(evt) {
		var e = window.event || evt;
		var keyCode = e.keyCode || e.which;
		if (13 == keyCode) {
			this.query();
		}
	},
	query_qb : function() {
		Wallet.$Box.text({
					infoPic : -1,
					nopadding : true,
					w : 340,
					title : Wallet.getTipsInfo("qry_title"),
					info : (((((Wallet.getTipsInfo("qry_body").replace(
							"${verify}",
							'<img src="http://ptlogin2.tenpay.com/getimage?aid=14000401&'
									+ Math.random()
									+ '" id="verify_img" align="absmiddle" />'))
							.replace("${id}", "qry_qb")).replace(/\$\{vc\}/g,
							"vc")).replace("${err}", "chk_vc_err")).replace(
							"${msg}", "chk_vc_msg")).replace("${qry}",
							"qry_qbqd_btns"),
					btns : ""
				});
		Wallet.$("vc").focus();
		Wallet.$("vc").select();
	}
};
var Tab = {
	delay : 100,
	delayTimerId : null,
	$ : function(id) {
		return Wallet.$(id);
	},
	$swap : function(obj, panelId) {
		if ((obj.className).indexOf("selected") != -1) {
			var bck = Wallet.$("op_back");
			if ("applyList" == panelId && bck.style.display
					&& "none" != bck.style.display) {
				Wallet.App.goBack();
			} else {
				Wallet.Msg.gotoList();
			}
			return false;
		}
		if ("applyList" == panelId) {
			Wallet.Msg.gotoList();
		}
		this.swapPanel(panelId);
		var pNode = obj.parentNode;
		var items = pNode.getElementsByTagName("li");
		var size = items.length;
		for (var i = 0; i < size; i++) {
			items[i].className = (items[i].className).replace(
					/[\s ]*selected[\s ]*/, "");
		}
		obj.className = obj.className + " selected";
	},
	$clearDelayTimer : function() {
		if (null != this.delayTimerId) {
			clearTimeout(this.delayTimerId);
			this.delayTimerId = null;
		}
	},
	swapTab : function(obj, panelId) {
		var _this = this;
		this.$clearDelayTimer();
		this.delayTimerId = setTimeout(function() {
					_this.$swap(obj, panelId);
				}, this.delay);
	},
	setTab : function(cNode) {
		var tabs = cNode.parentNode.getElementsByTagName("li");
		var tabSize = tabs.length;
		for (var i = 0; i < tabSize; i++) {
			tabs[i].className = (tabs[i].className).replace(
					/[\s ]*selected[\s ]*/, "");
		}
		cNode.className = cNode.className + " selected";
		cNode = null;
		tabs = null;
	},
	initPanel : function(cNode, pNode, panelId) {
		if (null != panelId && null != this.$(panelId)) {
			var panels = pNode.childNodes;
			var panelSize = panels.length;
			this.setTab(cNode);
			for (var i = 0; i < panelSize; i++) {
				panels[i].style.display = "none";
			}
			this.$(panelId).style.display = "block";
		}
	},
	swapPanel : function(panelId) {
		var isApp = "applyList" == panelId;
		var offset = 2;
		if (Wallet.App.isShow) {
			if (isApp)
				panelId = "appFrame";
			Wallet.App.setAlpha(0);
			Wallet.App.showBack(isApp);
			offset = 1;
		}
		if (null != panelId && null != this.$(panelId)) {
			Wallet.TScr.turnScreen(panelId, offset);
		}
	}
};
function ScrollText() {
	this.info = {
		containerId : "scrollTxt",
		height : 16,
		width : 175,
		offsetPos : 2,
		interval : 5000
	};
	this.marqueeId = null;
}
ScrollText.prototype = {
	setInfo : function(info) {
		this.info.containerId = info.id || this.info.containerId;
		this.info.height = info.height || this.info.height;
		this.info.width = info.width || this.info.width;
		this.info.offsetPos = info.width || this.info.offsetPos;
		this.info.interval = info.interval || this.info.interval;
	},
	getInfo : function() {
		return this.info;
	},
	init : function(info) {
		var _this = this;
		this.setInfo(info || {});
		this.marqueeId = setInterval(function() {
					_this.marquee(true)
				}, this.info.interval);
	},
	changeText : function() {
		var _this = this;
		this.clearMarquee();
		this.marquee(false);
		this.marqueeId = setInterval(function() {
					_this.marquee(true)
				}, this.info.interval);
	},
	clearMarquee : function() {
		if (null != this.marqueeId) {
			clearInterval(this.marqueeId);
			this.marqueeId = null;
		}
	},
	marquee : function(isScroll) {
		var pNode = Wallet.$(this.info.containerId);
		if (null != pNode && null != pNode.firstChild) {
			try {
				var firstNode = 1 == pNode.firstChild.nodeType
						? pNode.firstChild
						: pNode.firstChild.nextSibling;
				var intvId = null;
				var marginTop = firstNode.style.marginTop || 0;
				var iMarginTop = parseInt(marginTop, 10);
				var offsetPos = 0;
				var cloneFirsNode = null;
				var _this = this;
				if (isScroll) {
					intvId = setInterval(function() {
						try {
							offsetPos += _this.info.offsetPos;
							if (offsetPos > _this.info.height) {
								clearInterval(intvId);
								firstNode.style.marginTop = "-"
										+ _this.info.height + "px";
								cloneFirsNode = firstNode;
								pNode.removeChild(firstNode);
								cloneFirsNode.style.marginTop = "0px";
								pNode.appendChild(cloneFirsNode);
								firstNode = null;
								cloneFirsNode = null;
								pNode = null;
								_this = null;
								return;
							}
							firstNode.style.marginTop = (iMarginTop - offsetPos)
									+ "px";
						} catch (e) {
						}
					}, 20);
				} else {
					firstNode.style.marginTop = "-" + this.info.height + "px";
					cloneFirsNode = firstNode;
					pNode.removeChild(firstNode);
					cloneFirsNode.style.marginTop = "0px";
					pNode.appendChild(cloneFirsNode);
					firstNode = null;
					cloneFirsNode = null;
					pNode = null;
				}
			} catch (e) {
			}
		}
	},
	loadText : function() {
		Wallet.Loader.loadScript(Wallet.$base + "data/text_link.js?v="
						+ ((new Date()).getTime()), null, [], false);
	}
};
function TurnScreen() {
	this.blockInfo = {
		blockId : "tab_content",
		blockTag : "ol",
		width : 380,
		height : 302,
		selectorPrefix : "#main #right "
	};
	this.timerId = null;
	this.speed = 0;
}
TurnScreen.prototype = {
	pageIndex : 0,
	init : function(blockInfo) {
		this.setBlockInfo(blockInfo);
	},
	setBlockInfo : function(blockInfo) {
		this.blockInfo.blockId = blockInfo.blockId || "tab_content";
		this.blockInfo.blockTag = blockInfo.blockTag || "ol";
		this.blockInfo.width = blockInfo.width || 380;
		this.blockInfo.height = blockInfo.height || 302;
		this.blockInfo.selectorPrefix = blockInfo.selectorPrefix
				|| "#main #right ";
	},
	getBlockInfo : function() {
		return this.blockInfo;
	},
	hiddenSubPanels : function() {
		var block = Wallet.$(this.blockInfo.blockId);
		var panels = block.childNodes;
		var size = panels.length;
		var panel = null;
		for (var i = 0; i < size; i++) {
			panel = panels[i];
			if (1 == panel.nodeType) {
				panel.style.display = "none";
			}
		}
	},
	getCurrentPanel : function() {
		var block = Wallet.$(this.blockInfo.blockId);
		var panels = block.childNodes;
		var size = panels.length;
		var panel = null;
		var idcss = null;
		var clsname = null;
		for (var i = 0; i < size; i++) {
			panel = panels[i];
			if (1 == panel.nodeType) {
				if (panel.style.display) {
					if ("none" != panel.style.display) {
						return panel;
					}
				} else {
					idcss = Wallet.getOuterStyle(this.blockInfo.selectorPrefix
									+ "#" + panel.id, "display");
					clsname = Wallet.getOuterStyle(
							this.blockInfo.selectorPrefix + "."
									+ panel.className, "display");
					if ((null != idcss && "none" != idcss)
							|| (null != clsname && "none" != clsname)) {
						return panel;
					}
				}
			}
		}
		return null;
	},
	$getPreviousSibling : function(current, offset) {
		while (offset > 0 && null != current) {
			if (1 == current.nodeType) {
				offset--;
			}
			current = current.previousSibling;
		}
		return current;
	},
	$getNextSibling : function(current, offset) {
		while (offset > 0 && null != current) {
			if (1 == current.nodeType) {
				offset--;
			}
			current = current.nextSibling;
		}
		return current;
	},
	getTurnDir : function(target, current, offset) {
		var pre = this.$getPreviousSibling(current, offset);
		var next = this.$getNextSibling(current, offset);
		var dir = "RIGHT";
		if (null != next && next.id == target.id) {
			dir = "LEFT";
		}
		return dir;
	},
	hiddenSelect : function(current, isHidden) {
		var sel = current.getElementsByTagName("select");
		var size = sel.length;
		for (var i = 0; i < size; i++) {
			sel[i].style.display = isHidden ? "none" : "";
		}
	},
	clearTimer : function() {
		if (null != this.timerId) {
			clearInterval(this.timerId);
			this.timerId = null;
		}
	},
	turn : function(target, current, dir) {
		var offset = parseInt(target.style.left || 0, 10);
		var offset2 = 0;
		var isTrue = false;
		this.speed *= 0.485;
		this.speed = Math.ceil(this.speed);
		if ("LEFT" == dir) {
			offset = offset - this.speed;
			offset2 = offset - this.blockInfo.width;
			isTrue = (offset <= 0);
		} else {
			offset = offset + this.speed;
			offset2 = offset + this.blockInfo.width;
			isTrue = (offset >= 0);
		}
		if (isTrue) {
			this.clearTimer();
			offset = 0;
			current.style.display = "none";
			if (Wallet.App.isShow) {
				Wallet.App.setAlpha(100);
			}
		}
		target.style.left = offset + "px";
		current.style.left = offset2 + "px";
	},
	turnScreen : function(panelId, offset) {
		var targetPanel = Wallet.$(panelId);
		var currentPanel = this.getCurrentPanel();
		var _this = this;
		var dir = "RIGHT";
		if (null == currentPanel || panelId == currentPanel.id) {
			return false;
		}
		if (null != this.timerId) {
			this.clearTimer();
		}
		this.speed = this.blockInfo.width;
		dir = this.getTurnDir(targetPanel, currentPanel, offset);
		targetPanel.style.left = "LEFT" == dir
				? this.blockInfo.width + "px"
				: "-" + this.blockInfo.width + "px";
		targetPanel.style.display = "block";
		this.timerId = setInterval(function() {
					_this.turn(targetPanel, currentPanel, dir)
				}, 1);
	},
	resetScrs : function(count) {
		for (var i = 0; i < count; i++) {
			Wallet.$("scr-pb" + i).className = "scr-p";
			Wallet.$("scr-p" + i).style.display = "none";
		}
	},
	jumpScr : function(page, count) {
		if (page < 0) {
			this.pageIndex = 0;
			return false;
		} else if (page >= count) {
			this.pageIndex = count - 1;
			return false;
		} else {
			this.resetScrs(count);
			this.pageIndex = page;
			Wallet.$("scr-pb" + page).className = "scr-p scr-sel";
			Wallet.$("scr-p" + page).style.display = "";
			return true;
		}
	},
	scrPre : function(count) {
		this.jumpScr(--this.pageIndex, count);
	},
	scrNext : function(count) {
		this.jumpScr(++this.pageIndex, count);
	},
	scrP : function(p, count) {
		this.jumpScr(p, count);
	}
};
var Msg = {
	msg_count : 0,
	msg_data : null,
	msg_list : [],
	msg_total : 0,
	msg_pagesize : 10,
	isInit : true,
	pre_page : 0,
	msg_ret_page : 0,
	msg_ids : "",
	msg_readed_count : 0,
	msg_unread_count : 0,
	msg_is_query : false,
	msg_map : {},
	msg_cache : 5,
	msg_radius : 2,
	msg_offset : 1,
	next_msg : false,
	detail_mode : false,
	tips_info_timer : null,
	$links : {
		"1" : {
			url : "https://www.tenpay.com/wallet/new/reg.shtml?ADTAG=REG.WALLET.QQ.BUSI_MONTH",
			app : false,
			u : true
		},
		"3" : {
			url : "https://www.tenpay.com/wallet/new/reg.shtml?ADTAG=REG.WALLET.QQ.BUSI_QBQD",
			app : false,
			u : true
		},
		"4" : {
			url : "C",
			app : true,
			u : false
		},
		"S14" : {
			url : "S14",
			app : true,
			u : false,
			label : "继续还款",
			stat : "HUANKUAN"
		}
	},
	showTipsInfo : function(info, status) {
		var obj = Wallet.$("tips-info");
		if (null != this.tips_info_timer) {
			clearTimeout(this.tips_info_timer);
			this.tips_info_timer = null;
		}
		if (1 == status) {
			obj.className = "tips-info-ok";
		} else {
			obj.className = "tips-info-err";
		}
		obj.innerHTML = info;
		obj.style.display = "block";
		obj = null;
		this.tips_info_timer = setTimeout(function() {
					Wallet.$("tips-info").style.display = "none";
				}, 5000);
	},
	checked : function(obj) {
		var p = obj.parentNode;
		if (obj.checked) {
			if ((p.className).indexOf("selected") == -1) {
				p.className = ("" == p.className ? "selected" : p.className
						+ " selected");
			}
		} else {
			p.className = (p.className).replace(/[\s ]*selected[\s ]*/, "");
		}
		Wallet.$("op").selectedIndex = 0;
	},
	checkedAll : function(obj) {
		var p = Wallet.$("msgList");
		var cbs = p.getElementsByTagName("input");
		var size = cbs.length;
		var chk = "全选" == obj.firstChild.nodeValue;
		var isSet = false;
		for (var i = 0; i < size; i++) {
			if ("checkbox" == cbs[i].type) {
				cbs[i].checked = chk;
				this.checked(cbs[i]);
				isSet = true;
			}
		}
		if (isSet) {
			obj.innerHTML = chk ? "取消" : "全选";
		}
		p = null;
		cbs = null;
		obj = null;
	},
	resetChkStatus : function() {
		var p = Wallet.$("msgList");
		var cbs = p.getElementsByTagName("input");
		var size = cbs.length;
		for (var i = 0; i < size; i++) {
			if ("checkbox" == cbs[i].type) {
				cbs[i].checked = false;
				this.checked(cbs[i]);
			}
		}
		Wallet.$("sel_all").innerHTML = "全选";
		Wallet.$("op").selectedIndex = 0;
		p = null;
		cbs = null;
	},
	readed : function(obj, _readed) {
		var p = obj.parentNode;
		if (_readed) {
			p.className = (((p.className).replace(/new/g, "")).replace(
					/^[\s ]*/g, "")).replace(/[\s ]{2,}/g, " ");
		} else {
			p.className = (p.className).replace(p.className, p.className
							+ " new");
		}
	},
	selChecked : function() {
		var p = Wallet.$("msgList");
		var cbs = p.getElementsByTagName("input");
		var size = cbs.length;
		var msgIds = "";
		for (var i = 0; i < size; i++) {
			if ("checkbox" == cbs[i].type && cbs[i].checked) {
				msgIds += cbs[i].value + "|";
			}
		}
		if ("" != msgIds) {
			this.read(cbs[i], msgIds.substr(0, msgIds.length - 1));
		} else {
			this.showTipsInfo(Wallet.getTipsInfo("unselect_msg"), 0);
		}
	},
	changeState : function(sel) {
		var v = sel.getAttribute("flag");
		this.msg_ids = "";
		switch (v) {
			case "1" :
				this.selChecked();
				break;
			case "2" :
				this.del();
				break;
		}
		this.resetChkStatus();
	},
	changeMsgStatus : function(_readed) {
		var msgIds = this.msg_ids;
		var ids = msgIds.split("|");
		var size = ids.length - 1;
		for (var i = 0; i < size; i++) {
			if (_readed) {
				this.mark_read_flag(ids[i]);
			} else {
				this.readed(Wallet.$("msg_" + ids[i]), _readed);
			}
		}
	},
	isIncludeUnRead : function() {
		var msgIds = this.msg_ids;
		var ids = msgIds.split("|");
		var size = ids.length - 1;
		var node = null;
		var tmp = "";
		this.msg_readed_count = 0;
		for (var i = 0; i < size; i++) {
			node = Wallet.$("msg_" + ids[i]);
			if (null != node && null != node.parentNode) {
				if ((node.parentNode.className).indexOf("new") != -1) {
					tmp += ids[i] + "|";
					this.msg_readed_count++;
					this.readed(node, true);
				}
			}
		}
		this.msg_ids = tmp;
		return ("" != tmp);
	},
	read : function(node, msgId) {
		this.msg_ids = msgId + "|";
		var isInc = this.isIncludeUnRead();
		if (isInc && this.msg_count > 0) {
			this.queryMessage({
						action : 'mark_read',
						msg_id_string : this.msg_ids
					});
		}
	},
	mover : function(obj) {
		if ((obj.className).indexOf("selected") == -1) {
			obj.className = ("" == obj.className ? "selected" : obj.className
					+ " selected");
		}
	},
	mout : function(obj) {
		if (!obj.firstChild.checked) {
			obj.className = (obj.className).replace(/[\s ]*selected[\s ]*/, "");
		}
	},
	getMouseEvtStr : function() {
		var str = '';
		str = ' onmouseover="Wallet.Msg.mover(this)" onmouseout="Wallet.Msg.mout(this)"';
		return str;
	},
	queryMessage : function(input) {
		var cgi = Wallet.$hostname + "/cgi-bin/remind/remind_msg_mgr.cgi";
		var _param = "action=" + input.action;
		var _this = this;
		switch (input.action) {
			case "query_msg_count" :
				_param += "&read_flag=" + input.read_flag;
				new Wallet.Ajax().sendRequest({
							method : "GET",
							url : cgi,
							param : _param,
							handler : this.query_msg_count,
							args : [],
							timeout : 3000,
							interval : -1
						});
				break;
			case "query_msg" :
				_param += "&read_flag=" + input.read_flag + "&msg_type="
						+ input.msg_type + "&page=" + input.page
						+ "&num_msg_per_page=" + this.msg_pagesize;
				new Wallet.Ajax().sendRequest({
							method : "GET",
							url : cgi,
							param : _param,
							handler : this.query_msg,
							args : [],
							timeout : 5000,
							interval : -1
						});
				break;
			case "mark_read" :
				_param += "&msg_id_string=" + input.msg_id_string;
				new Wallet.Ajax().sendRequest({
							method : "GET",
							url : cgi,
							param : _param,
							handler : this.mark_read,
							args : [],
							timeout : 3000,
							interval : -1
						});
				break;
			case "delete_msg" :
				_param += "&msg_id_string=" + input.msg_id_string;
				new Wallet.Ajax().sendRequest({
							method : "GET",
							url : cgi,
							param : _param,
							handler : this.delete_msg,
							args : [],
							timeout : 3000,
							interval : -1
						});
				break;
		}
	},
	query_msg_count_err : function() {
		Wallet.setTab(0);
		Wallet.initTab();
		Wallet.$("msgNum").innerHTML = "";
		this.msg_is_query = false;
		if ("1" == Wallet.getTab()) {
			this.getMessageList(0);
			this.msg_is_query = true;
		}
	},
	query_msg_count : function() {
		var msg_count = 0;
		var args = arguments;
		var ret = args[0];
		var status = ret.status;
		ret.data = null != ret.data ? ret.data.documentElement : null;
		if (200 == status) {
			var resp = Wallet.getRespXML(ret.data);
			var _xml = resp.xml;
			msg_count = parseInt(Wallet.getNodeValue(_xml, ret.data,
							"msg_count/text()")
							|| 0, 10);
			if ("0" == resp.code && msg_count > 0) {
				Wallet.Msg.msg_count = Math.min(msg_count, 999);
				Wallet.$("msgNum").innerHTML = "(" + Wallet.Msg.msg_count + ")";
				Wallet.Msg.getMessageList(0);
				Wallet.Msg.msg_is_query = true;
				var init = Wallet.getParameter("init");
				if ("1" == init) {
					Wallet.setTab(1);
				}
				Wallet.initTab();
			} else {
				Wallet.Msg.query_msg_count_err();
			}
		} else {
			Wallet.Msg.query_msg_count_err();
		}
	},
	getClassName : function(readflag, index, recordcount, pagesize) {
		var cls = ' class="';
		if (index >= pagesize - 1 || index >= recordcount - 1) {
			cls += "last";
		}
		if ("0" == readflag) {
			cls += " new";
		}
		cls += '"';
		return cls;
	},
	getDateTime : function(str, isFull) {
		var date = str.substr(0, 10);
		var aDate = date.split("-");
		var dtstr = (isFull
				? (aDate[0] + "年" + aDate[1] + "月" + aDate[2] + "日")
				: (parseInt(aDate[1], 10) + "-" + parseInt(aDate[2], 10)));
		return dtstr;
	},
	getMessageList : function(iPage) {
		this.qry_msg_loading();
		this.queryMessage({
					action : "query_msg",
					read_flag : 2,
					msg_type : 0,
					page : Math.max(iPage, 0)
				});
	},
	requestNewData : function(iPage) {
		this.getMessageList(iPage);
	},
	queryMsgList : function() {
		if (!this.msg_is_query) {
			this.getMessageList(0);
			this.msg_is_query = true;
		}
	},
	qry_msg_loading : function() {
		Wallet.$("msgItems").innerHTML = '<center>' + Wallet.$loading
				+ ' 请稍候...</center>';
	},
	jumpTo : function() {
		var recordset = Wallet.Msg.msg_list;
		var totalrecord = Wallet.Msg.msg_total;
		var pagesize = Wallet.Msg.msg_pagesize;
		var pre_page = Wallet.Msg.pre_page;
		var pageInfo = TFL.PageBar.getPageInfo();
		var iPage = pageInfo.currentPage;
		var total = pageInfo.totalPageSize;
		var cache = Wallet.Msg.msg_cache;
		var radius = Wallet.Msg.msg_radius;
		var offset = Wallet.Msg.msg_offset;
		Wallet.Msg.isInit = false;
		Wallet.$("sel_all").innerHTML = "全选";
		Wallet.$("op").selectedIndex = 0;
		Wallet.Msg.pre_page = iPage;
		if (total <= cache) {
			Wallet.Msg.createList();
		} else {
			if (Math.abs(iPage - pre_page) <= 1) {
				if (iPage - pre_page > 0) {
					if (0 == iPage % cache) {
						Wallet.Msg.requestNewData(iPage);
					} else {
						Wallet.Msg.createList();
					}
				} else {
					if (1 == iPage % cache && iPage != pre_page) {
						Wallet.Msg.requestNewData(iPage - 1);
					} else {
						Wallet.Msg.createList();
					}
				}
			} else {
				Wallet.Msg.isInit = true;
				if (1 == iPage % cache) {
					Wallet.Msg.requestNewData(iPage - 1);
				} else {
					Wallet.Msg.requestNewData(iPage);
				}
			}
		}
	},
	mark_read_flag : function(msgId) {
		if (typeof(this.msg_map[msgId]) != "undefined") {
			this.msg_map[msgId].read_flag = "1";
		}
	},
	getReadFlag : function(msgId, readFlag) {
		if (typeof(this.msg_map[msgId]) != "undefined") {
			return this.msg_map[msgId].read_flag;
		}
		return readFlag;
	},
	xml2json : function(recordset, _xml) {
		var recordcount = recordset.length;
		var record = null;
		var msgId = "";
		var readFlag = "";
		var title = "";
		var content = "";
		var msgLink = "";
		var recvTime = "";
		var msgType = "";
		var list = [];
		for (var i = 0; i < recordcount; i++) {
			record = recordset[i];
			msgId = Wallet.getNodeValue(_xml, record, "msg_id/text()");
			readFlag = Wallet.getNodeValue(_xml, record, "read_flag/text()");
			title = (Wallet.getNodeValue(_xml, record, "title/text()"))
					.replaceHTML();
			content = this.$replaceLR(Wallet.getNodeValue(_xml, record,
					"content/text()"));
			msgLink = Wallet.getNodeValue(_xml, record, "msg_link/text()");
			recvTime = Wallet.getNodeValue(_xml, record, "recv_time/text()");
			msgType = Wallet.getNodeValue(_xml, record, "msg_type/text()");
			list.push({
						msg_id : msgId,
						read_flag : readFlag,
						msg_title : title,
						msg_content : content,
						msg_link : msgLink,
						recv_time : recvTime,
						msg_type : msgType
					});
			this.msg_map[msgId] = {
				read_flag : readFlag
			};
		}
		return list;
	},
	$getLinksItems : function(msg_type) {
		var item = this.$links[msg_type];
		var app = item.app;
		var u = item.u;
		var str = null;
		if (!app) {
			str = ' href="' + item.url;
		} else {
			switch (item.url) {
				case 'C' :
				case 'S14' :
					if (Wallet.App.isShow) {
						str = ' href="javascript:Wallet.Tab.swapTab(Wallet.$(\'tab_assistant\'), \'applyList\');"';
					} else {
						str = ' href="javascript:Wallet.App.open(\'https://www.tenpay.com/wallet/new/assis_credit.shtml?from=MSG_PROMPT\', 2);"';
					}
					break;
			}
		}
		return {
			chk : u,
			href : str,
			linkItem : item
		}
	},
	$getLink : function(link, msg_type) {
		link = link.replace("%7C", "|");
		var pattern = /^login\|/gi;
		var needLogin = pattern.test(link);
		var str = ' href="' + link + '" target="_blank"';
		var _l = typeof(this.$links[msg_type]) == "undefined"
				? null
				: this.$links[msg_type].url;
		var _l2 = typeof(this.$links["S" + msg_type]) == "undefined"
				? null
				: this.$links["S" + msg_type].url;
		var app = false;
		var u = false;
		var def_url = null;
		var items = null;
		if (null == _l) {
			if (needLogin) {
				str = ' href="javascript:Wallet.redirectTo(\''
						+ link.replace(pattern, "") + '\')"';
			}
			if (null != _l2) {
				items = this.$getLinksItems("S" + msg_type);
				if (items.chk && Wallet.My.is_cft_usr()) {
					def_url = '<a onclick="Wallet.Msg.$chkUser()" href="javascript:void(0);">'
							+ items.linkItem.label + '</a>';
				} else {
					def_url = '<a onclick="Wallet.clickStat(\'MSG.WALLET.DETAIL.'
							+ items.linkItem.stat
							+ '\')"'
							+ items.href
							+ '>'
							+ items.linkItem.label + '</a>';
				}
			}
		} else {
			items = this.$getLinksItems(msg_type);
			u = items.chk;
			str = items.href;
		}
		pattern = null;
		return {
			href : str,
			chk : u,
			url : def_url
		};
	},
	$getRecord : function(recordset, index, key) {
		if (recordset[index]) {
			return recordset[index][key];
		}
		return null;
	},
	$filter : function(str) {
		str = str.replace(/(\<br \/\>)/gi, "");
		str = str.replace(/(\[[^\[\]]+\])/gi, "");
		return str;
	},
	$replaceLR : function(str) {
		str = str.replace(/\r\n/gi, "<br />");
		str = str.replace(/\n/gi, "<br />");
		str = str.replace(/\t/gi, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
		return str;
	},
	$getTitle : function(title, content) {
		var str = title + "~" + this.$filter(content);
		str = str.cut(44);
		if (str.indexOf("~") != -1) {
			str = str.replace("~", "<em>") + "</em>";
		}
		return str;
	},
	createList : function() {
		var _xml = this.msg_data;
		var recordset = this.msg_list;
		var totalrecord = this.msg_total;
		var pagesize = this.msg_pagesize;
		var pre_page = this.pre_page;
		var pageInfo = TFL.PageBar.getPageInfo();
		var page = pageInfo.currentPage;
		var start = (5 == this.cache
				? (page < 3 ? page * pagesize : (page - this.msg_ret_page)
						* pagesize)
				: (page % 2 * pagesize));
		var end = start + pagesize;
		var recordcount = recordset.length;
		var record = null;
		var str = '';
		var first = -1;
		var last = -1;
		for (var i = start; i < recordcount && i < end; i++) {
			record = recordset[i];
			var msgId = record.msg_id;
			var preMsgId = this.$getRecord(recordset, i - 1, "msg_id") || -1;
			var nextMsgId = this.$getRecord(recordset, i + 1, "msg_id") || -1;
			var readFlag = record.read_flag;
			var content = record.msg_content;
			var title = record.msg_title;
			var msgType = record.msg_type;
			if (i == start) {
				first = msgId;
			}
			last = msgId;
			str += '<li'
					+ this.getMouseEvtStr()
					+ ' '
					+ this.getClassName(this.getReadFlag(msgId, readFlag), i,
							recordcount, end) + '><input id="msg_' + msgId
					+ '" onclick="Wallet.Msg.checked(this)" value="' + msgId
					+ '" type="checkbox" name="" /><a id="link_' + msgId
					+ '" href="javascript:Wallet.Msg.showDetail(\'' + preMsgId
					+ '\',\'' + nextMsgId + '\',\'' + msgId + '\',\''
					+ escape(title) + '\',\'' + escape(content) + '\',\''
					+ escape(this.getDateTime(record.recv_time, true))
					+ '\',\'' + record.msg_link + '\',' + i + ',' + start + ','
					+ end + ',' + recordcount + ',\'' + msgType
					+ '\');" onclick="Wallet.Msg.read(this, \'' + msgId
					+ '\');" title="' + (this.$filter(content)) + '">'
					+ this.$getTitle(title, content) + '</a><span>'
					+ this.getDateTime(record.recv_time, false)
					+ '</span></li>';
		}
		Wallet.$("msgItems").innerHTML = str;
		if (this.detail_mode) {
			if (this.next_msg) {
				this.view(first);
			} else {
				this.view(last);
			}
		}
	},
	query_msg_err : function(msg, type) {
		if (1 == type) {
			this.msg_is_query = false;
			this.isInit = true;
		}
		Wallet.$("msgItems").innerHTML = '<center>' + msg + '</center>';
		Wallet.$("funbar").style.display = "none";
	},
	query_msg : function() {
		var args = arguments;
		var ret = args[0];
		var status = ret.status;
		ret.data = null != ret.data ? ret.data.documentElement : null;
		if (200 == status) {
			var resp = Wallet.getRespXML(ret.data);
			var _xml = resp.xml;
			var msg_count = parseInt(Wallet.getNodeValue(_xml, ret.data,
							"msg_count_total/text()")
							|| 0, 10);
			var ret_page = parseInt(Wallet.getNodeValue(_xml, ret.data,
							"page/text()")
							|| 0, 10);
			var msgs = _xml.selectNodes(ret.data, "msgs") || [];
			var recordset = [];
			if ("0" == resp.code) {
				if (msgs.length > 0) {
					var xmlStr = (Wallet.getNodeValue(_xml, ret.data,
							"msgs/text()") || "").replace(/\&/g, "&amp;");
					var _xmlDoc = _xml.loadXML(xmlStr);
					recordset = _xml.selectNodes(_xmlDoc.documentElement,
							"record")
							|| [];
					Wallet.Msg.msg_data = _xml;
					Wallet.Msg.msg_list = Wallet.Msg.xml2json(recordset,
							Wallet.Msg.msg_data);
					Wallet.Msg.msg_total = msg_count;
					Wallet.Msg.msg_ret_page = ret_page;
					Wallet.Msg.msg_cache = 2;
					if (recordset.length > 0) {
						TFL.PageBar.init({
									recordcount : Wallet.Msg.msg_total,
									pageSize : Wallet.Msg.msg_pagesize,
									radius : 1,
									offset : 1,
									page : (TFL.PageBar.getPageInfo().currentPage + 1),
									isShowJumper : false,
									isShowPages : false,
									positions : ['msg_pagebar'],
									handler : Wallet.Msg.jumpTo,
									args : []
								});
						Wallet.$("funbar").style.display = "block";
					} else {
						Wallet.Msg.query_msg_err(Wallet.getTipsInfo("no_msg"),
								0);
					}
				}
			} else {
				Wallet.Msg.query_msg_err(resp.msg, 1);
			}
		} else {
			Wallet.Msg.query_msg_err(Wallet.getTipsInfo("msg_net_err"), 1);
		}
	},
	mark_read : function() {
		var args = arguments;
		var ret = args[0];
		var status = ret.status;
		ret.data = null != ret.data ? ret.data.documentElement : null;
		if (200 == status) {
			var resp = Wallet.getRespXML(ret.data);
			var _xml = resp.xml;
			if ("0" != resp.code) {
				Wallet.Msg.changeMsgStatus(false);
				Wallet.Msg.showTipsInfo(Wallet.getTipsInfo("msg_mark_err"), 0);
			} else {
				Wallet.Msg.msg_count -= Wallet.Msg.msg_readed_count;
				Wallet.$("msgNum").innerHTML = Wallet.Msg.msg_count > 0 ? "("
						+ Wallet.Msg.msg_count + ")" : "";
				Wallet.Msg.changeMsgStatus(true);
				Wallet.Msg.showTipsInfo(Wallet.getTipsInfo("msg_mark_ok"), 1);
			}
		} else {
			Wallet.Msg.changeMsgStatus(false);
			Wallet.Msg.showTipsInfo(Wallet.getTipsInfo("msg_mark_err"), 0);
		}
	},
	del : function() {
		var p = Wallet.$("msgList");
		var cbs = p.getElementsByTagName("input");
		var size = cbs.length;
		var msgIds = "";
		this.msg_unread_count = 0;
		for (var i = 0; i < size; i++) {
			if ("checkbox" == cbs[i].type && cbs[i].checked) {
				msgIds += cbs[i].value + "|";
				if ((cbs[i].parentNode.className).indexOf("new") != -1) {
					this.msg_unread_count++;
				}
			}
		}
		if ("" != msgIds) {
			this.queryMessage({
						action : "delete_msg",
						msg_id_string : msgIds
					});
		} else {
			this.showTipsInfo(Wallet.getTipsInfo("unselect_msg"), 0);
		}
	},
	delete_msg : function() {
		var args = arguments;
		var ret = args[0];
		var status = ret.status;
		ret.data = null != ret.data ? ret.data.documentElement : null;
		if (200 == status) {
			var resp = Wallet.getRespXML(ret.data);
			var _xml = resp.xml;
			if ("0" != resp.code) {
				Wallet.Msg.showTipsInfo(Wallet.getTipsInfo("msg_del_err"), 0);
			} else {
				Wallet.Msg.msg_count -= Wallet.Msg.msg_unread_count;
				Wallet.$("msgNum").innerHTML = Wallet.Msg.msg_count > 0 ? "("
						+ Wallet.Msg.msg_count + ")" : "";
				TFL.PageBar.getPageInfo().currentPage = 0;
				Wallet.Msg.requestNewData(0);
				Wallet.Msg.showTipsInfo(Wallet.getTipsInfo("msg_del_ok"), 1);
			}
		} else {
			Wallet.Msg.showTipsInfo(Wallet.getTipsInfo("msg_del_err"), 0);
		}
	},
	setTurnMsgBar : function(preMsgId, nextMsgId, index, start, end,
			recordcount) {
		var m = Wallet.$("turnMsg");
		var str = '';
		var pageInfo = TFL.PageBar.pageInfo;
		var curPage = pageInfo.currentPage;
		var totalPage = pageInfo.totalPageSize;
		var rscount = pageInfo.recordcount;
		var pageSize = pageInfo.pageSize;
		var g_index = curPage * pageSize + (index % pageSize + 1);
		if (recordcount > 1) {
			if (index == 0 && curPage == 0) {
				str = '&nbsp;1条，&nbsp;';
			} else {
				str = '<a href="javascript:Wallet.Msg.pre(\'' + preMsgId
						+ '\',' + (index == start) + ');">&#171;上一条</a>&nbsp;'
						+ (g_index) + '条，&nbsp;';
			}
			if (curPage == (totalPage - 1) && index == (recordcount - 1)) {
				str += '共' + rscount;
			} else {
				str += '共' + rscount
						+ '&nbsp;<a href="javascript:Wallet.Msg.next(\''
						+ nextMsgId + '\','
						+ (index > 0 && (index % pageSize == 9))
						+ ');">下一条&#187;</a>';
			}
			m.innerHTML = str;
		}
		m = null;
	},
	$chkUser : function() {
		Wallet.$Box.text({
					infoPic : 4,
					title : Wallet.getTipsInfo("tips_title"),
					info : Wallet.getTipsInfo("already_cft_usr"),
					btns : [["关闭", function() {
								Wallet.$Box.close();
								Wallet.Msg.gotoList();
							}]]
				});
	},
	setDetail : function(preMsgId, nextMsgId, msgId, title, content, date,
			link, index, start, end, recordcount, msg_type) {
		var t = Wallet.$("md_title");
		var b = Wallet.$("md_body");
		var c = unescape(content);
		var p = /\[([^\[\]]+)\]/g;
		var h = this.$getLink(link, msg_type);
		var l = null == h.url ? "" : h.url;
		if (p.test(c)) {
			w = RegExp.$1;
			if (h.chk && Wallet.My.is_cft_usr()) {
				c = c.replace(p,
						'<a onclick="Wallet.Msg.$chkUser()" href="javascript:void(0);">'
								+ w + '</a>&nbsp;&nbsp;&nbsp;' + l);
			} else {
				c = c.replace(p,
						'<a onclick="Wallet.clickStat(\'MSG.WALLET.DETAIL.MSG_TYPE'
								+ msg_type + '\')"' + h.href + '>' + w
								+ '</a>&nbsp;&nbsp;&nbsp;' + l);
			}
		}
		p = null;
		t.innerHTML = unescape(title) + "<span>" + unescape(date) + "</span>";
		b.innerHTML = c;
		t = null;
		b = null;
		this.setTurnMsgBar(preMsgId, nextMsgId, index, start, end, recordcount);
	},
	showDetail : function(preMsgId, nextMsgId, msgId, title, content, date,
			link, index, start, end, recordcount, msg_type) {
		this.next_msg = false;
		this.detail_mode = true;
		var def = Wallet.$("default_panel");
		var detail = Wallet.$("msg_detail");
		def.style.display = "none";
		detail.style.display = "block";
		def = null;
		detail = null;
		this.resetChkStatus();
		this.setDetail(preMsgId, nextMsgId, msgId, title, content, date, link,
				index, start, end, recordcount, msg_type);
		Wallet.Stat.pgv("wallet", "/wallet/msg_detail.html");
	},
	gotoList : function() {
		this.detail_mode = false;
		var def = Wallet.$("default_panel");
		var detail = Wallet.$("msg_detail");
		def.style.display = "block";
		detail.style.display = "none";
		def = null;
		detail = null;
		Wallet.Stat.pgv("wallet", "/wallet/index.shtml");
	},
	view : function(msgId) {
		var l = Wallet.$("link_" + msgId);
		var handler = null;
		var href = null;
		if (null != l) {
			href = l.href;
			handler = (href).substring(11, href.length - 1);
			eval(handler);
			Wallet.Msg.read(l, msgId);
		}
		Wallet.Loading.hiddenLoading();
		l = null;
	},
	pre : function(msgId, turnPage) {
		this.next_msg = false;
		if (turnPage) {
			Wallet.Loading.showLoading(268, 42);
			TFL.PageBar.turnPage(-1, false, false);
		} else {
			this.view(msgId);
		}
	},
	next : function(msgId, turnPage) {
		this.next_msg = true;
		if (turnPage) {
			Wallet.Loading.showLoading(268, 42);
			TFL.PageBar.turnPage(1, false, false);
		} else {
			this.view(msgId);
		}
	}
};
var Assistant = {
	showOP : function(obj, isShow, type) {
		var op = Wallet.$("op_link");
		var items = Wallet.$("op_items");
		if (isShow) {
			op.style.cssText = "background-position:-"
					+ (1 == type ? 179 : 272) + "px -33px;";
			items.style.display = "block";
			obj.style.zIndex = 200;
		} else {
			op.style.cssText = "background-position:-"
					+ (1 == type ? 254 : 272) + "px -55px;";
			items.style.display = "none";
			obj.style.zIndex = 100;
		}
	},
	show : function(obj) {
		var list = Wallet.$("op_list");
		var pos = null;
		if (null != obj) {
			pos = Wallet.getPosition(obj);
			list.style.left = (pos.x - 28) + "px";
			list.style.top = (pos.y) + "px"
		}
		list.style.display = "block";
		list = null;
		pos = null;
	},
	hide : function() {
		var list = Wallet.$("op_list");
		list.style.display = "none";
		list = null;
		pos = null;
	}
};
function InputTips() {
	this.tips = {
		id : "input_tips",
		info : '',
		display : 'none',
		offsetX : 15,
		offsetY : -5,
		width : 115,
		type : 0,
		auto : 1
	};
	this.previous = null;
}
InputTips.prototype = {
	hiddenPrevious : function() {
		if (null != this.previous) {
			this.previous.style.display = "none";
		}
	},
	isExisted : function(tipsId) {
		var inputTips = Wallet.$(tipsId);
		var isExist = true;
		if (null == inputTips) {
			inputTips = document.createElement("div");
			inputTips.setAttribute("id", tipsId);
			inputTips.innerHTML = '<cite></cite><span id="' + tipsId
					+ '_body" style="width:' + this.tips.width + 'px;"></span>';
			document.body.appendChild(inputTips);
			isExist = false;
		}
		inputTips.className = this.tips.type > 0
				? "cft-input-tips cft-input-tips-" + this.tips.type
				: "cft-input-tips";
		return isExist
	},
	setTips : function(tips) {
		this.tips.id = tips.id || "input_tips";
		this.tips.info = tips.info || '';
		this.tips.display = tips.display || 'none';
		this.tips.offsetX = tips.offsetX || 15;
		this.tips.offsetY = tips.offsetY || -5;
		this.tips.type = tips.type || 0;
		this.tips.width = tips.width || 115;
		this.tips.auto = typeof(tips.auto) == "number" ? tips.auto : 1;
	},
	setTipsInfo : function(info) {
		var inf = Wallet.$(this.tips.id + "_body");
		if (null != inf) {
			inf.innerHTML = info;
		}
	},
	showTips : function(obj, tipsObj) {
		this.hiddenPrevious();
		this.setTips(tipsObj);
		var isExisted = this.isExisted(this.tips.id);
		var iTips = Wallet.$(this.tips.id);
		if (isExisted) {
			iTips.style.display = this.tips.display;
		} else {
			var pos = Wallet.getPosition(obj);
			var ow = obj.offsetWidth;
			var _left = pos.x + this.tips.offsetX + ow;
			var _top = pos.y + this.tips.offsetY;
			var _this = this;
			iTips.style.cssText = 'left:' + _left + 'px;top:' + _top
					+ 'px;display:' + (this.tips.display) + ';';
			if (this.tips.auto) {
				obj.attachEvent("onblur", function() {
							_this.showTips(obj, {
										id : _this.tips.id,
										display : 'none'
									});
						});
			}
		}
		this.setTipsInfo(this.tips.info);
		this.previous = iTips;
	}
};
function PopList() {
	this.info = {
		listId : 'cft_popList',
		rows : 4,
		cols : 2,
		width : 233,
		height : 153,
		handler : null,
		args : [],
		emptyInfo : '暂无记录可查询'
	};
	this.tbarHeight = 28;
	this.rowHeight = 24;
	this.data = null;
}
PopList.prototype = {
	$ : function(id) {
		return document.getElementById(id);
	},
	init : function(info) {
		this.setInfo(info);
		this.createFrame();
		this.addCloseEvent();
	},
	setInfo : function(info) {
		this.info.listId = info.listId || 'cft_popList';
		this.info.rows = info.rows || 4;
		this.info.cols = info.cols || 2;
		this.info.width = info.width || 233;
		this.info.height = info.height || 153;
		this.info.handler = info.handler || null;
		this.info.args = info.args || [];
		this.info.emptyInfo = info.emptyInfo || "暂无记录可查询";
	},
	getInfo : function() {
		return this.info;
	},
	getRowData : function(index) {
		var ret = [index - 1];
		if (null != this.data) {
			ret = ret.concat(this.data.items[index]);
		}
		return ret;
	},
	getList : function() {
		return this.data;
	},
	createFrame : function() {
		var frame = this.$(this.info.listId);
		var strBody = '';
		var height = this.info.height - this.tbarHeight;
		var width = this.info.width;
		var inner_width = Wallet.isIE6 ? width - 4 : width - 3;
		var outer_width = Wallet.isIE6 ? width - 2 : width - 1;
		if (null == frame) {
			frame = document.createElement("div");
			frame.setAttribute("id", this.info.listId);
			frame.style.cssText = "z-index:3000; position:absolute; width:"
					+ this.info.width + "px; height:" + this.info.height + "px";
			document.body.appendChild(frame);
			strBody = '<iframe id="'
					+ this.info.listId
					+ '_iframe" frameborder="0" marginheight="0" marginwidth="0" vspace="0" hspace="0" scrolling="no" style="position:absolute; z-index:-1; width:'
					+ this.info.width
					+ 'px; height:'
					+ this.info.height
					+ 'px;left:0px;top:0px;"></iframe><div id="'
					+ this.info.listId
					+ '_div" class="cft-popList" style="width:'
					+ this.info.width
					+ 'px; height:'
					+ this.info.height
					+ 'px"><h2><strong id="'
					+ this.info.listId
					+ '_title"></strong><a id="'
					+ this.info.listId
					+ '_close" href="javascript://">关闭</a><em></em></h2><div class="cft-popList-outer" id="'
					+ this.info.listId
					+ '_outer" style="width:'
					+ outer_width
					+ 'px;height:'
					+ height
					+ 'px;"><div class="cft-popList-inner" id="'
					+ this.info.listId
					+ '_inner" style="width:'
					+ inner_width
					+ 'px;height:'
					+ height
					+ 'px;"><table width="100%" border="0" cellpadding="0" cellspacing="0" id="'
					+ this.info.listId
					+ '_table"><tbody></tbody></table></div></div><div class="cft-popList-bottom"><em></em></div></div></div>';
			frame.innerHTML = strBody;
		}
		frame = null;
	},
	setTitle : function() {
		if (null != this.data) {
			this.$(this.info.listId + "_title").innerHTML = this.data.title;
		}
	},
	rowEvent : function(src) {
		if (this.info.handler) {
			var rowIndex = src.parentNode.rowIndex;
			var data = this.getRowData(rowIndex);
			this.info.args.unshift(data);
			this.info.handler.apply(null, this.info.args);
			this.info.args.shift();
		}
		this.close();
	},
	mover : function(src) {
		var pNode = src.parentNode;
		pNode.className = "mover";
	},
	mout : function(src) {
		var pNode = src.parentNode;
		pNode.className = "";
	},
	addCloseEvent : function(obj) {
		var c = obj || this.$(this.info.listId + "_close");
		var _this = this;
		c.attachEvent("onclick", function() {
					_this.close();
				});
	},
	close : function() {
		this.$(this.info.listId).style.display = "none";
	},
	showPopList : function(obj, offsetX, offsetY) {
		var pos = Wallet.getPosition(obj);
		var _left = pos.x + (offsetX || 0);
		var _top = pos.y + (offsetY || 20);
		this.$(this.info.listId).style.left = _left + "px";
		this.$(this.info.listId).style.top = _top + "px";
		this.$(this.info.listId).style.display = "block";
	},
	createItems : function(row, cells, rows, index) {
		var size = cells.length;
		var cell = null;
		for (var i = 0; i < size; i++) {
			cell = row.insertCell(i);
			if (0 == index) {
				if (!this.$isShowHead()) {
					row.style.display = "none";
				}
				cell.className = "cft-cell-head "
						+ (i == size - 1 ? " ctf-cell-last" : "");
				cell.width = cells[i].width;
				cell.innerHTML = cells[i].label;
			} else if (index == rows - 1) {
				cell.className = "ctf-row-last"
						+ (i == size - 1 ? " ctf-cell-last" : "");
				cell.innerHTML = cells[i];
			} else {
				cell.innerHTML = cells[i];
				if (i == size - 1) {
					cell.className = "ctf-cell-last";
				}
			}
			cell.vAlign = "middle";
		}
	},
	createEmptyRow : function(table, cols, str) {
		var row = table.insertRow(1);
		var cell = row.insertCell(0);
		cell.colSpan = cols;
		cell.className = "ctf-row-last ctf-cell-last";
		cell.innerHTML = str;
	},
	removeItems : function() {
		for (var i = this.$(this.info.listId + "_table").rows.length - 1; i >= 0; i--) {
			this.$(this.info.listId + "_table").deleteRow(i);
		}
	},
	resetPopListHeight : function(rows) {
		if (rows - 1 > this.info.rows) {
			return false;
		}
		var isShowHead = this.$isShowHead();
		var frame = this.$(this.info.listId);
		var ifr = this.$(this.info.listId + "_iframe");
		var div = this.$(this.info.listId + "_div");
		var outer = this.$(this.info.listId + "_outer");
		var inner = this.$(this.info.listId + "_inner");
		var _height = 2 * this.rowHeight;
		var _rows = 1 == rows ? rows + 1 : rows;
		_rows = isShowHead ? _rows : _rows - 1;
		_height = _rows * this.rowHeight + _rows;
		frame.style.height = (_height + this.tbarHeight) + "px";
		ifr.style.height = (_height + this.tbarHeight) + "px";
		div.style.height = (_height + this.tbarHeight) + "px";
		outer.style.height = _height + "px";
		inner.style.height = _height + "px";
		frame = null;
		ifr = null;
		div = null;
		outer = null;
		inner = null;
	},
	$isShowHead : function() {
		var head = typeof(this.data.head) == "boolean" ? this.data.head : true;
		return head;
	},
	setPopList : function(data) {
		var rows = data.items.length;
		var table = this.$(this.info.listId + "_table");
		var row = null;
		var _this = this;
		this.data = data;
		this.removeItems();
		this.setTitle();
		this.resetPopListHeight(rows);
		for (var i = 0; i < rows; i++) {
			row = table.insertRow(i);
			this.createItems(row, data.items[i], rows, i);
			if (0 != i) {
				row.style.cursor = "pointer";
				row.attachEvent("onclick", function() {
							_this.rowEvent(window.event.srcElement);
						});
				row.attachEvent("onmouseover", function() {
							_this.mover(window.event.srcElement);
						});
				row.attachEvent("onmouseout", function() {
							_this.mout(window.event.srcElement);
						});
			}
		}
		if (1 == rows) {
			this.createEmptyRow(table, data.items[0].length,
					this.info.emptyInfo);
		}
	}
};
var PasswdCtrl = {
	ret_pwd_str : '',
	formName : 0,
	setPasswdCtrl : function(tabindex, formName) {
		this.setPasswdCtrl2(tabindex, (formName || 0), "_qeidt", 126, "pay",
				"passwd", "p");
	},
	setPasswdCtrl2 : function(tabindex, formName, parentId, width, type,
			ctrlId, inputName) {
		this.formName = formName || 0;
		if (Wallet.$(parentId)) {
			Wallet.$pwdctrl.show({
						ctrlType : type,
						parentNode : Wallet.$(parentId),
						ctrlID : ctrlId,
						submitName : inputName,
						h : 20,
						w : width,
						emptyFun : this.pwdEmpty,
						formatFun : this.pwdFormatErr,
						errFun : this.pwdErr,
						tabIndex : tabindex,
						ctrlEvn : this.keyboardEvent
					});
		}
	},
	pwdEmpty : function(str) {
		Wallet.PasswdCtrl.ret_pwd_str = str;
	},
	pwdFormatErr : function(str) {
		Wallet.PasswdCtrl.ret_pwd_str = str;
	},
	pwdErr : function(str) {
		Wallet.PasswdCtrl.ret_pwd_str = str;
	},
	keyboardEvent : function() {
		var keyCode = window.event.keyCode;
		var fn = Wallet.PasswdCtrl.formName;
		if (10 == keyCode || 13 == keyCode) {
			if (document.forms[fn]) {
				var submitFun = typeof document.forms[fn].onsubmit == "function"
						? document.forms[fn].onsubmit
						: null;
				if (null != submitFun && submitFun()) {
					document.forms[fn].submit();
				}
			}
		}
	},
	$errTips : function(msgId, msg) {
		var msgObj = Wallet.$(msgId);
		var tags = null != msgObj ? msgObj.getElementsByTagName("span") : [];
		var str = msg || "";
		if (tags.length > 0) {
			str = str || tags[0].innerHTML;
		}
		Wallet.$Box.text({
					infoPic : 2,
					w : 320,
					title : '提示',
					info : str,
					btns : [["关闭", function() {
								Wallet.$Box.close();
							}]]
				});
	},
	getPasswdLength : function(ctrl) {
		var len = ctrl.GetInputInfo();
		return (len >> 16) & 65535;
	},
	checkPasswdLength : function(ctrl) {
		if (0 == this.getPasswdLength(ctrl)) {
			return false;
		}
		return true;
	},
	isSame : function(ctrl1, ctrl2) {
		var len1 = ctrl1.GetInputInfo();
		var len2 = ctrl2.GetInputInfo();
		if (len1 != len2) {
			return false;
		}
		return true;
	},
	clearPasswd : function(ctrl) {
		Wallet.$pwdctrl.clear(ctrl || null);
	}
};
var CertCtrl = {
	width : 400,
	flag : 0,
	_parent : false,
	certList : "",
	cancel : function() {
		var _box = CertCtrl._parent ? parent.Wallet.$Box : Wallet.$Box;
		_box.close();
		_box = null;
	},
	done : function(flag) {
		this.cancel();
		if (0 == flag) {
			this.traceCert();
		} else {
			if (Wallet.Credit || 1 == this.flag) {
				Wallet.redirectTo(location.href, true, true);
			} else {
				location.reload();
			}
		}
	},
	installCert : function() {
		Wallet.redirectTo("/certificates/tenpay_reinstall1.shtml");
		var _box = CertCtrl._parent ? parent.Wallet.$Box : Wallet.$Box;
		_box.text({
					infoPic : 4,
					w : CertCtrl.width,
					title : Wallet.getTipsInfo("err_title"),
					info : Wallet.getTipsInfo("install_cert"),
					btns : [["安装完成", function() {
										Wallet.CertCtrl.done(1)
									}], ["取  消", function() {
										Wallet.CertCtrl.cancel()
									}]]
				});
		_box = null;
	},
	uninstalled : function(type) {
		var _box = CertCtrl._parent ? parent.Wallet.$Box : Wallet.$Box;
		type = type || 0;
		_box.text({
					infoPic : 2,
					w : CertCtrl.width,
					title : Wallet.getTipsInfo("err_title"),
					info : 1 == type
							? Wallet.getTipsInfo("block_cert")
							: Wallet.getTipsInfo("uninstalled_cert"),
					btns : [["安装数字证书", function() {
										Wallet.CertCtrl.installCert()
									}], ["取  消", function() {
										Wallet.CertCtrl.cancel()
									}]]
				});
		_box = null;
	},
	downloadFile : function() {
		window.open("https://www.tenpay.com/download/qqcert.exe");
		var _box = CertCtrl._parent ? parent.Wallet.$Box : Wallet.$Box;
		_box.text({
					infoPic : 4,
					w : CertCtrl.width,
					title : Wallet.getTipsInfo("err_title"),
					info : Wallet.getTipsInfo("install_ocx"),
					btns : [["安装完成", function() {
										Wallet.CertCtrl.done(0)
									}], ["取  消", function() {
										Wallet.CertCtrl.cancel()
									}]]
				});
		_box = null;
	},
	notfound : function() {
		var _box = CertCtrl._parent ? parent.Wallet.$Box : Wallet.$Box;
		_box.text({
					infoPic : 2,
					w : CertCtrl.width,
					title : Wallet.getTipsInfo("err_title"),
					info : Wallet.getTipsInfo("notfound_cert"),
					btns : [["下载安全控件安装程序", function() {
										Wallet.CertCtrl.downloadFile()
									}], ["取  消", function() {
										Wallet.CertCtrl.cancel()
									}]]
				});
		_box = null;
	},
	traceCert : function() {
		TFL.cert.Draw("QQCertCtrl", "", "cft-cert");
	},
	$checkCert : function(uin, noInstall, noCertCtrl) {
		try {
			var QQCertCtrl = Wallet.$("QQCertCtrl");
			if (!TFL.cert.IsObjOk(QQCertCtrl))
				throw "";
			var cn = GetLocalCert(QQCertCtrl, uin, CertCtrl.certList);
			if (cn == "") {
				if (noInstall) {
					noInstall();
				}
				return false;
			}
			return true;
		} catch (exp) {
			if (noCertCtrl) {
				noCertCtrl();
			}
			return false;
		}
	},
	WriteCertSignCookie : function(CertCtrlId, iUid, srcstr) {
		var QQCertCtrl = Wallet.$(CertCtrlId);
		if (!QQCertCtrl) {
			return false;
		}
		if (!(TFL.cert.Version(QQCertCtrl) >= parseInt(TFL.cert.VERSION))) {
			return false;
		}
		var cn = GetLocalCert(QQCertCtrl, iUid, CertCtrl.certList);
		if (cn == "") {
			return false;
		}
		var encodeStr = TFL.cert.Base64Encode(QQCertCtrl, srcstr);
		var signstr = TFL.cert.Sign(QQCertCtrl, iUid, encodeStr, cn);
		signstr = encodeURIComponent(signstr);
		Wallet.setCookie("signseq", "", "tenpay.com", -1);
		Wallet.setCookie("cn", cn, "tenpay.com");
		Wallet.setCookie("srcstr", srcstr, "tenpay.com");
		Wallet.setCookie("signstr", signstr, "tenpay.com");
		return true;
	},
	WriteCertSignCookie2 : function(CertCtrlId, iUid, sSrc, sSeq) {
		var QQCertCtrl = Wallet.$(CertCtrlId);
		if (!QQCertCtrl) {
			return false;
		}
		if (!(TFL.cert.Version(QQCertCtrl) >= parseInt(TFL.cert.VERSION))) {
			return false;
		}
		var cn = GetLocalCert(QQCertCtrl, iUid, CertCtrl.certList);
		if (cn == "") {
			return false;
		}
		var encodeStr = TFL.cert.Base64Encode(QQCertCtrl, md5(TFL.cert
						.Base64Encode(QQCertCtrl, sSeq + sSrc)).toUpperCase());
		var signstr = TFL.cert.Sign(QQCertCtrl, iUid, encodeStr, cn);
		Wallet.setCookie("srcstr", "", "tenpay.com", -1);
		Wallet.setCookie("cn", cn, "tenpay.com");
		Wallet.setCookie("signseq", sSeq, "tenpay.com");
		Wallet.setCookie("signstr", signstr, "tenpay.com");
		return true;
	},
	checkCert : function(strSeq, strSignSrc, srcStr, width, flag, _parent) {
		var wcl = Wallet.getCookie("wallet_certlist") || "";
		var mcl = Wallet.getCookie("certlist") || "";
		this.width = width || this.width;
		this.flag = flag || this.flag;
		this._parent = _parent || this._parent;
		this.certList = mcl || wcl;
		var isCertUsr = Wallet.getCookie("certuserflag")
				|| Wallet.getCookie("wallet_certuserflag");
		var iUid = Wallet.getCookie("qluid")
				|| Wallet.getCookie("wallet_qluid");
		if ("1" == isCertUsr) {
			if (!this.$checkCert(iUid, this.uninstalled, this.notfound)) {
				return false;
			}
			if (srcStr) {
				this.WriteCertSignCookie("QQCertCtrl", iUid, srcStr);
			} else {
				this.WriteCertSignCookie2("QQCertCtrl", iUid, strSignSrc,
						strSeq);
			}
		}
		return true;
	}
};
var Loading = {
	layer : null,
	getViewportSize : function() {
		var doc = document.documentElement || document.body;
		var _w = window.innerWidth || doc.clientWidth;
		var _h = window.innerHeight || doc.clientHeight;
		return {
			width : _w,
			height : _h
		};
	},
	getDocumentSize : function() {
		var doc = document.documentElement || document.body;
		var _w = Math.max(doc.scrollWidth, this.getViewportSize().width);
		var _h = Math.max(doc.scrollHeight, this.getViewportSize().height);
		return {
			width : _w,
			height : _h
		};
	},
	createLayer : function(left, top) {
		this.layer = Wallet.$("page_loading_layer");
		if (null == this.layer) {
			var doc = this.getDocumentSize();
			var viewport = this.getViewportSize();
			this.layer = document.createElement("div");
			this.layer.setAttribute("id", "page_loading_layer");
			this.layer.style.cssText = "display:none; position:absolute; left:0px; top:0px;width:"
					+ doc.width
					+ "px; height:"
					+ doc.height
					+ "px; z-index:10000;";
			this.layer.innerHTML = '<iframe style="position:absolute; z-index:-1; left:0px; top:0px; filter:alpha(opacity=0); width:'
					+ doc.width
					+ 'px; height:'
					+ doc.height
					+ 'px" frameborder="no" src="about:blank"></iframe><div style="filter:alpha(opacity=0); background:white; width:'
					+ doc.width
					+ 'px; height:'
					+ doc.height
					+ 'px""></div><div id="page_loading_layer_text" style="width:136px; height:20px; position:absolute; left:'
					+ left
					+ 'px; top:'
					+ top
					+ 'px; color:gray;">'
					+ Wallet.$loading + ' 请稍候...</div>';
			document.body.appendChild(this.layer, document.body.firstChild);
		} else {
			var txt = Wallet.$("page_loading_layer_text");
			if (txt) {
				txt.style.left = left + "px";
				txt.style.top = top + "px";
			}
		}
	},
	showLoading : function(left, top) {
		this.createLayer(left, top);
		if (null != this.layer) {
			this.layer.style.display = "block";
		}
	},
	hiddenLoading : function() {
		if (null != this.layer) {
			this.layer.style.display = "none";
		}
	}
};
var App = {
	isShow : false,
	addEvent : function() {
		var ifr = Wallet.$("appFrame");
		Wallet.Loading.hiddenLoading();
		Wallet.App.showFrame(ifr, true);
		ifr.detachEvent("onload", Wallet.App.addEvent);
	},
	open : function(src, type) {
		type = type || 0;
		var ifr = Wallet.$("appFrame");
		var uin = Wallet.getWalletCookie().uin;
		var key = Wallet.getWalletCookie().key;
		var querystring = "COOKIE_wallet_s=" + key + "&COOKIE_wallet_u=" + uin
				+ "&tourl=" + Wallet.encode(src);
		var s1 = "https://www.tenpay.com/cgi-bin/v1.0/wallet_loginto_cft.cgi?"
				+ querystring;
		var s2 = "http://wallet.tenpay.com/cgi-bin/jumpmobile.cgi?"
				+ querystring;
		Wallet.Loading.showLoading(330, 32);
		ifr.attachEvent("onload", this.addEvent);
		switch (type) {
			case 1 :
				src = s2;
				break;
			case 2 :
				if ("1" == Wallet.getTab()) {
					Wallet.Msg.gotoList();
					Wallet.Tab.setTab(Wallet.$('tab_assistant'));
					Wallet.setTab(0);
				}
				src = s1;
				break;
		}
		ifr.src = src;
	},
	showFrame : function(obj, isShow) {
		Wallet.TScr.hiddenSubPanels();
		this.setAlpha(0);
		this.showBack(isShow);
		this.isShow = isShow;
		if (isShow) {
			Wallet.$("applyList").style.display = "block";
			Wallet.TScr.turnScreen("appFrame", 1);
		}
	},
	showBack : function(isShow) {
		var bck = Wallet.$("op_back");
		if (bck) {
			bck.style.display = isShow ? "block" : "none";
		}
	},
	setAlpha : function(alpha) {
		var bck = Wallet.$("op_back");
		if (bck) {
			bck.style.filter = "Alpha(opacity=" + alpha + ")";
			bck.style.opacity = alpha;
		}
	},
	goBack : function() {
		var ifr = Wallet.$("appFrame")
				|| parent.document.getElementById("appFrame");
		this.showFrame(ifr, false);
		Wallet.$("applyList").style.display = "none";
		Wallet.$("msgList").style.display = "block";
		Wallet.Tab.swapPanel("applyList");
	}
};
function Ajax() {
	this.parent = Wallet;
	this.config = {
		method : "GET",
		asynch : true,
		contentType : "application/x-www-form-urlencoded; charset=gb2312",
		cache : true,
		proxy : null,
		url : null,
		param : null,
		formName : null,
		handler : null,
		args : [],
		isXML : true,
		timeout : -1,
		interval : -1,
		tryTimes : -1,
		isEncode : true
	};
	this.Request = {
		UNINITIALIZED : 0,
		LOADING : 1,
		LOADED : 2,
		INTERACTIVE : 3,
		COMPLETED : 4
	};
	this.instance = null;
	this.timeoutId = null;
	this.intervalId = null;
	this.requestTimes = 0;
}
Ajax.prototype = {
	setConfig : function(config) {
		config = config || {};
		this.config.method = (config.method || "GET").toUpperCase();
		this.config.asynch = typeof(config.asynch) == "boolean"
				? config.asynch
				: true;
		this.config.contentType = config.contentType
				|| "application/x-www-form-urlencoded; charset=gb2312";
		this.config.cache = typeof(config.cache) == "boolean"
				? config.cache
				: true;
		this.config.proxy = config.proxy || null;
		this.config.url = config.url || null;
		this.config.param = config.param || null;
		this.config.formName = config.formName || null;
		this.config.handler = config.handler || null;
		this.config.args = config.args || [];
		this.config.isXML = typeof(config.isXML) == "boolean"
				? config.isXML
				: true;
		this.config.timeout = config.timeout || -1;
		this.config.interval = config.interval || -1;
		this.config.tryTimes = config.tryTimes || -1;
		this.config.isEncode = typeof(config.isEncode) == "boolean"
				? config.isEncode
				: true;
	},
	getConfig : function() {
		return this.config;
	},
	getInstance : function() {
		try {
			this.instance = new XMLHttpRequest();
		} catch (e1) {
			try {
				this.instance = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
				try {
					this.instance = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e3) {
					this.instance = null;
				}
			}
		}
		return this.instance;
	},
	evalHandler : function(handler, args) {
		if (typeof(handler) == "function") {
			handler.apply(null, args);
		}
		this.instance = null;
	},
	getQueryString : function() {
		var strQuery = this.config.param;
		var form = null;
		var els = [];
		var el = null;
		var size = 0;
		var tagName = "";
		var type = "";
		var formName = this.config.formName;
		if (null != formName) {
			strQuery = (null == strQuery) ? "" : ("&" + strQuery);
			try {
				var $parent = this.parent;
				form = typeof(formName) == "object"
						? formName
						: document.forms[formName];
				els = form.elements;
				size = els.length;
				for (var i = 0; i < size; i++) {
					el = els[i];
					tagName = (el.tagName).toUpperCase();
					type = (el.type).toUpperCase();
					switch (tagName) {
						case "SELECT" :
						case "TEXTAREA" :
							strQuery += "&"
									+ el.name
									+ "="
									+ (this.config.isEncode ? $parent
											.encode(el.value) : $parent
											.filterChar(el.value));
							break;
						case "INPUT" : {
							switch (type) {
								case "TEXT" :
								case "PASSWORD" :
								case "HIDDEN" :
									strQuery += "&"
											+ el.name
											+ "="
											+ (this.config.isEncode ? $parent
													.encode(el.value) : $parent
													.filterChar(el.value));
									break;
								case "RADIO" :
								case "CHECKBOX" : {
									if (el.checked) {
										strQuery += "&"
												+ el.name
												+ "="
												+ (this.config.isEncode
														? $parent
																.encode(el.value)
														: $parent
																.filterChar(el.value));
									}
								}
									break;
							}
						}
							break;
					}
				}
				strQuery = strQuery.substring(1);
			} catch (e) {
				throw new Error("get form data error ! \n " + e.message);
			} finally {
				$parent = null;
				formName = null;
			}
		}
		return strQuery;
	},
	makeURL : function() {
		var url = this.config.url || "";
		var proxy = this.config.proxy;
		var queryString = this.getQueryString();
		var param = null;
		if ("GET" == this.config.method) {
			if (null != queryString) {
				url = url + (url.indexOf("?") == -1 ? "?" : "&") + queryString
						+ "&req_time=" + this.parent.getTimeStamp();
			} else {
				url = url + (url.indexOf("?") == -1 ? "?" : "&") + "req_time="
						+ this.parent.getTimeStamp();
			}
		} else {
			param = queryString;
		}
		if (null != proxy) {
			url = proxy + (proxy.indexOf("?") == -1 ? "?" : "&") + "req_url="
					+ this.parent.encode(url);
		}
		return {
			URL : url,
			DATA : param
		};
	},
	clearAbort : function() {
		if (null != this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	},
	clearCycle : function() {
		if (null != this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	},
	$abort : function(xmlHttp, ajax, handler, args) {
		if (this.config.timeout > 0) {
			this.timeoutId = setTimeout(function() {
						if (xmlHttp.readyState != ajax.Request.COMPLETED) {
							xmlHttp.abort();
							if (ajax.config.interval <= 0
									&& ajax.config.tryTimes > 0
									&& ajax.requestTimes < ajax.config.tryTimes) {
								ajax.requestTimes++;
								args.unshift({
											status : "TRY#" + ajax.requestTimes,
											data : null
										});
								ajax.evalHandler(handler, args);
								args.shift();
								ajax.$send();
							} else {
								args.unshift({
											status : "TIMEOUT",
											data : null
										});
								ajax.evalHandler(handler, args);
								args.shift();
							}
						}
					}, this.config.timeout);
		}
	},
	callSender : function() {
		if (this.config.interval > 0) {
			var ajax = this;
			this.$send();
			this.intervalId = setInterval(function() {
						ajax.$send();
					}, this.config.interval);
		} else {
			this.$send();
		}
	},
	$send : function() {
		try {
			var xhr = this.getInstance();
			var isRX = this.config.isXML;
			var handler = this.config.handler;
			var args = this.config.args;
			var url = this.makeURL();
			if (null != xhr) {
				this.$abort(xhr, this, handler, args);
				var ajax = this;
				xhr.onreadystatechange = function() {
					if (xhr.readyState == ajax.Request.COMPLETED) {
						if (200 == xhr.status || 0 === xhr.status) {
							args.unshift({
										status : xhr.status,
										data : (isRX
												? xhr.responseXML
												: xhr.responseText)
									});
							ajax.evalHandler(handler, args);
							args.shift();
						} else {
							if (ajax.config.interval <= 0
									&& ajax.config.tryTimes > 0
									&& ajax.requestTimes < ajax.config.tryTimes) {
								ajax.requestTimes++;
								args.unshift({
											status : "TRY#" + ajax.requestTimes,
											data : null
										});
								ajax.evalHandler(handler, args);
								args.shift();
								ajax.$send();
							} else {
								args.unshift({
											status : xhr.status,
											data : null
										});
								ajax.evalHandler(handler, args);
								args.shift();
							}
						}
						ajax = null;
						xhr = null;
					}
				};
				xhr.open(this.config.method, url.URL, this.config.asynch);
				if (!this.config.cache) {
					xhr.setRequestHeader("No-Cache", "1");
					xhr.setRequestHeader("Pragma", "no-cache");
					xhr.setRequestHeader("Cache-Control", "no-cache");
					xhr.setRequestHeader("Expire", "0");
					xhr.setRequestHeader("Last-Modified",
							"Thu, 1 Jan 1970 00:00:00 GMT");
					xhr.setRequestHeader("If-Modified-Since", "-1");
				}
				xhr.setRequestHeader("Content-Type", this.config.contentType);
				xhr.send(url.DATA);
			} else {
				throw new Error("Get XMLHttpRequest Object Failure!");
			}
		} catch (e) {
			throw new Error("An Runtime Error Occurred ! \n\n" + e.message);
		}
	},
	sendRequest : function(config) {
		this.instance = null;
		this.requestTimes = 0;
		this.clearAbort();
		this.clearCycle();
		this.setConfig(config);
		this.callSender();
	}
};
function XPathExpression(xpathText, namespaceURLMapper) {
	this.XPathText = xpathText;
	this.namespaceURLMapper = namespaceURLMapper;
	if (document.createExpression) {
		this.expression = document.createExpression(xpathText,
				function(prefix) {
					return namespaceURLMapper[prefix];
				});
	} else {
		this.namespacesString = "";
		if (null != namespaceURLMapper) {
			for (var prefix in namespaceURLMapper) {
				if (this.namespacesString)
					this.namespacesString += ' ';
				this.namespacesString += 'xmlns:' + prefix + '="'
						+ namespaceURLMapper[prefix] + '"';
			}
		}
	}
}
XPathExpression.prototype = {
	selectNodes : function(context) {
		var nodeList = null;
		var result = null;
		var oEvaluator = null;
		var doc = null;
		if (this.expression) {
			result = null;
			oEvaluator = new XPathEvaluator();
			result = oEvaluator.evaluate(this.XPathText, context,
					this.namespaceURLMapper,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var length = result.snapshotLength;
			if (length > 0) {
				nodeList = new Array();
				for (var i = 0; i < length; i++) {
					if (1 == result.snapshotItem(i).nodeType)
						nodeList.push(result.snapshotItem(i));
				}
			}
			oEvaluator = null;
			result = null;
			context = null;
			return nodeList;
		} else {
			try {
				doc = context.ownerDocument;
				if (null == doc) {
					doc = context;
				}
				doc.setProperty("SelectionLanguage", "XPath");
				doc.setProperty("SelectionNamespaces", this.namespacesString);
				if (doc == context) {
					context = doc.documentElement;
				}
				nodeList = context.selectNodes(this.XPathText);
			} catch (e) {
				throw new Error("对不起，您的浏览器不支XPath！desc = " + e.message);
			} finally {
				doc = null;
				context = null;
				return nodeList;
			}
		}
	},
	selectSingleNode : function(context) {
		var node = null;
		var result = null;
		var oEvaluator = null;
		var doc = null;
		if (this.expression) {
			result = null;
			oEvaluator = new XPathEvaluator();
			result = oEvaluator.evaluate(this.XPathText, context,
					this.namespaceURLMapper,
					XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			node = result.singleNodeValue;
			oEvaluator = null;
			result = null;
			context = null;
			return node;
		} else {
			try {
				doc = context.ownerDocument;
				if (null == doc) {
					doc = context;
				}
				doc.setProperty("SelectionLanguage", "XPath");
				doc.setProperty("SelectionNamespaces", this.namespacesString);
				if (doc == context) {
					context = doc.documentElement;
				}
				node = context.selectSingleNode(this.XPathText);
			} catch (e) {
				throw new Error("对不起，您的浏览器不支XPath！desc = " + e.message);
			} finally {
				doc = null;
				context = null;
				return node;
			}
		}
	}
};
function XML() {
	this.XMLDocument = null;
}
XML.prototype = {
	createXMLDocument : function(namespace, root, doctype) {
		if (3 != arguments.length) {
			throw new Error("建立XML文档时参数错误; length = " + arguments.length);
		}
		var rootTagName = root || "";
		var namespaceURI = namespace || "";
		var docType = doctype || null;
		var xmlDoc = null;
		if (document.implementation && document.implementation.createDocument) {
			xmlDoc = document.implementation.createDocument(namespaceURI,
					rootTagName, docType);
		} else {
			xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
			if (rootTagName) {
				var hasPrefix = rootTagName.indexOf(":") != -1 && namespaceURI;
				var prefix = hasPrefix ? rootTagName.split(":")[0] : "";
				var tagName = hasPrefix
						? rootTagName.split(":")[1]
						: rootTagName;
				var xmlStr = "<"
						+ (hasPrefix ? prefix + ":" : "")
						+ tagName
						+ (hasPrefix ? " xmlns:" + prefix + "=\""
								+ namespaceURI + "\"" : "") + " />";
				xmlDoc.loadXML(xmlStr);
			}
		}
		this.XMLDocument = xmlDoc;
		xmlDoc = null;
		return this.XMLDocument;
	},
	load : function(url, async, handler, args, interval) {
		var xmlDoc = this.createXMLDocument(null, null, null);
		var isAsync = async || false;
		var isLoaded = false;
		var intvId = null;
		xmlDoc.async = isAsync;
		function loadedHandler(_xmlDoc, isTimeout) {
			if (!isLoaded) {
				isLoaded = true;
				args.unshift({
							status : (isTimeout ? "TIMEOUT" : 200),
							data : _xmlDoc
						});
				if ("function" == typeof(handler)) {
					handler.apply(null, args);
				}
				args.shift();
				this.XMLDocument = _xmlDoc;
				_xmlDoc = null;
			}
		}
		if (handler) {
			if (document.implementation
					&& document.implementation.createDocument) {
				xmlDoc.onload = function() {
					loadedHandler(xmlDoc, false);
				};
			} else {
				xmlDoc.onreadystatechange = function() {
					if (4 == xmlDoc.readyState) {
						loadedHandler(xmlDoc, false);
					}
				};
			}
			if (interval && interval > 0) {
				intvId = setTimeout(function() {
							clearTimeout(intvId);
							intvId = null;
							loadedHandler(null, true);
						}, interval);
			}
		}
		xmlDoc.load(url);
	},
	loadXML : function(xmlStr) {
		var xmlDoc = null;
		if ("undefined" != typeof(DOMParser)) {
			var parser = new DOMParser();
			xmlDoc = parser.parseFromString(xmlStr, "application/xml");
			parser = null;
		} else if (window.ActiveXObject) {
			xmlDoc = this.createXMLDocument(null, null, null);
			xmlDoc.loadXML(xmlStr);
		} else {
			var url = "data:text/xml;charset=gb2312,"
					+ encodeURIComponent(xmlStr);
			var request = new XMLHttpRequest();
			request.open("GET", url, false);
			request.send(null);
			xmlDoc = request.responseXML;
			request = null;
		}
		this.XMLDocument = xmlDoc;
		xmlDoc = null;
		return this.XMLDocument;
	},
	selectNodes : function(context, xpathText, namespaceURLMapper) {
		var xPath = new XPathExpression(xpathText, namespaceURLMapper);
		var nodes = xPath.selectNodes(context);
		xPath = null;
		return nodes;
	},
	selectSingleNode : function(context, xpathText, namespaceURLMapper) {
		var xPath = new XPathExpression(xpathText, namespaceURLMapper);
		var node = xPath.selectSingleNode(context);
		xPath = null;
		return node;
	},
	toString : function(node) {
		var fragment = node || this.XMLDocument || null;
		var xmlStr = "";
		if (null != fragment) {
			if ("undefined" != typeof(XMLSerializer)) {
				var serializer = new XMLSerializer();
				xmlStr = serializer.serializeToString(fragment);
				serializer = null;
			} else if (fragment.xml) {
				xmlStr = fragment.xml;
			}
		}
		return xmlStr;
	}
};
var Loader = {
	loadScript : function(url, handler, args, isDestory) {
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		var id = "dynamic_script_" + Wallet.getTimeStamp();
		var eventType = (undefined !== script.onreadystatechange && undefined !== script.readyState)
				? "onreadystatechange"
				: "onload";
		var _isDestory = typeof(isDestory) == "boolean" ? isDestory : true;
		script.type = "text/javascript";
		script.src = url;
		script.id = id;
		script.attachEvent(eventType, function() {
					var state = script.readyState || "loaded";
					if ("loaded" == state || "complete" == state) {
						if (typeof(handler) == "string") {
							try {
								var hdl = eval(handler);
								hdl.apply(null, args);
							} catch (e) {
							}
						} else if (typeof(handler) == "function") {
							try {
								handler.apply(null, args);
							} catch (e) {
							}
						}
						if (_isDestory) {
							head.removeChild(script);
						}
						head = null;
						script = null;
					}
				});
		head.appendChild(script);
	},
	loadFrame : function(url, handler, args, responseObj, isDestory, _parent) {
		var ifr = document.createElement("iframe");
		var id = "dynamic_iframe_" + Wallet.getTimeStamp();
		ifr.width = 0;
		ifr.height = 0;
		ifr.src = url;
		ifr.id = id;
		ifr.name = id;
		ifr.attachEvent("onload", function() {
					try {
						var json = eval("ifr.contentWindow." + responseObj);
						args.unshift(json);
					} catch (e) {
						args.unshift(null);
					} finally {
						if (typeof(handler) == "string") {
							setTimeout(function() {
										try {
											var hdl = eval(handler);
											hdl.apply(null, args);
										} catch (e) {
										}
									}, 50);
						} else if (typeof(handler) == "function") {
							setTimeout(function() {
										try {
											handler.apply(null, args);
										} catch (e) {
										}
									}, 50);
						}
						if (isDestory) {
							if (_parent) {
								_parent.removeChild(ifr);
							} else {
								document.body.removeChild(ifr);
							}
						}
						ifr = null;
					}
				});
		if (_parent) {
			_parent.appendChild(ifr);
		} else {
			document.body.appendChild(ifr);
		}
	},
	loadPing : function() {
		this.loadScript("http://pingjs.qq.com/ping.js", "pgvMain", ["", {
							virtualURL : location.pathname
						}], false);
	},
	setSession : function() {
		var url = "https://www.tenpay.com/cgi-bin/v1.0/wallet_loginto_cft.cgi";
		this.loadScript(url, null, [], true);
	}
};
function Stat() {
	this.$domain = "www.tenpay.com";
	this.url = location.protocol == "https:"
			? "https://www.tenpay.com/zft/js/ping_tenpay.ziped.js"
			: "http://pingjs.qq.com/ping.js";
	this.loader = null;
	this.DOMAIN = {
		www : "www.tenpay.com",
		shouji : "shouji.tenpay.com",
		xinyongka : "xinyongka.tenpay.com",
		chong : "chong.tenpay.com",
		youxi : "youxi.tenpay.com",
		qbqd : "qbqd.tenpay.com",
		qq : "qq.tenpay.com",
		airb2c : "air.tenpay.com",
		hnair : "hnair.qq.com",
		wallet : "wallet.tenpay.com",
		jipiao : "jipiao.tenpay.com",
		jiudian : "jiudian.tenpay.com",
		gwt : "gwt.tenpay.com"
	};
};
Stat.prototype = {
	resetGlobalValue : function() {
		pvCurDomain = "";
		pvCurUrl = "";
		pvCurParam = "";
		pvRefDomain = "";
		pvRefUrl = "";
		pvRealDomain = "";
		pvRefParam = "";
		pvRepeatCount = 1;
	},
	main : function(path) {
		if (typeof(pgvMain) == "function") {
			this.resetGlobalValue();
			pgvMain("", {
						virtualDomain : this.$domain,
						virtualURL : path
					});
		}
	},
	clickStat : function(tag) {
		if (typeof(pgvSendClick) == "function") {
			pvCurDomain = this.$domain;
			pgvSendClick({
						hottag : tag
					});
		}
	},
	start : function(path) {
		if (typeof(pgvMain) == "function") {
			this.resetGlobalValue();
			pgvMain("pathtrace", {
						virtualURL : path,
						virtualDomain : this.$domain,
						pathStart : true,
						tagParamName : "ADTAG",
						useRefUrl : true
					});
		}
	},
	load : function(path, param) {
		var sPath = (typeof(path) == "string" && "" != path)
				? path
				: location.pathname;
		var oTrace = param || null;
		if (null == this.loader) {
			var _this = this;
			var id = "";
			id = Wallet.Loader.loadScript(this.url, function(path, trace) {
						_this.loader = document.getElementById(id);
						_this.innerCall(path, trace);
					}, [sPath, oTrace], false);
		} else {
			this.innerCall(sPath, oTrace);
		}
	},
	innerCall : function(path, trace) {
		if (null != trace) {
			if (true === trace.start) {
				this.start(path);
			} else {
				this.main(path);
			}
		} else {
			this.main(path);
		}
	},
	pgv : function(_domain, path, param) {
		this.$domain = this.DOMAIN[_domain] || "www.tenpay.com";
		path = path || location.pathname;
		param = param || null;
		this.load(path, param);
	}
};
function JSONLoader() {
	this.loader = "json" + (new Date().getTime());
	this.url = null;
	this.charset = "gb2312";
	this.handler = null;
	this.args = [];
	this.param = null;
	this.timeout = -1;
	this.interval = -1;
	this.tryTimes = -1;
	this.timeoutId = null;
	this.intervalId = null;
	this.loaded = false;
	this.target = null;
}
JSONLoader.prototype = {
	initLoader : function() {
		var head = document.getElementsByTagName("head");
		var tar = (head.length > 0 ? head[0] : document.body);
		var s = document.createElement("script");
		s.setAttribute("id", this.loader);
		s.language = "javascript";
		s.type = "text/javascript";
		s.charset = this.charset || "gb2312";
		tar.appendChild(s);
		this.target = tar;
		if (window[this.loader] != this) {
			window[this.loader] = this;
		}
		return s;
	},
	setProperties : function(p) {
		this.url = p.url;
		this.charset = p.charset || "gb2312";
		this.handler = p.handler || null;
		this.args = p.args || [];
		this.param = p.param || null;
		this.timeout = p.timeout || -1;
		this.interval = p.interval || -1;
		this.tryTimes = p.tryTimes || -1;
	},
	removeTimeout : function() {
		if (null != this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	},
	removeLoader : function() {
		var loader = document.getElementById(this.loader);
		if (null != loader) {
			this.target.removeChild(loader);
			window[this.loader] = null;
		}
	},
	load : function(p) {
		this.setProperties(p);
		var s = this.initLoader();
		var t = "&t=" + (new Date()).getTime();
		var url = this.url;
		var param = null == this.param ? "dump_type=json&js_obj=" + this.loader
				+ t : this.param + "&dump_type=json&js_obj=" + this.loader + t;
		url = url.indexOf("?") == -1 ? url + "?" + param : url + "&" + param;
		s.src = url;
		if (this.timeout > 0) {
			var _this = this;
			this.timeoutId = setTimeout(function() {
						if (_this.loaded) {
							_this.removeTimeout();
						} else {
							_this.callBack(null, "TIMEOUT");
							_this.removeLoader();
						}
					}, this.timeout);
		}
	},
	callBack : function(ret, s) {
		this.loaded = true;
		if (null != this.timeout) {
			this.removeTimeout();
		}
		if (null != this.handler) {
			this.args.unshift({
						status : s || "OK",
						data : ret
					});
			this.handler.apply(null, this.args);
			this.args.shift();
		}
		this.removeLoader();
	}
};
function SlidePanel() {
	this.LEFT = 1;
	this.RIGHT = 2;
	this.TOP = 3;
	this.BOTTOM = 4;
	this.PREFIX = "slide_panel_";
	this.id = 0;
	this.width = 550;
	this.height = 400;
	this.wayWidth = 2;
	this.wayHeight = 400;
	this.barWidth = 6;
	this.barHeight = 12;
	this.scrollSize = 20;
	this.layout = this.RIGHT;
	this.namespace = "sp";
	this.target = document.body;
	this.cssTexts = [];
	this.$parent = Wallet;
}
SlidePanel.prototype = {
	init : function(config) {
		config = config || {};
		this.setConfig(config);
		this
				.setStyle([
						'.slide-panel{position:relative; overflow:hidden;}',
						'.slide-panel .slide-content{position:absolute;}',
						'.slide-panel .slide-way{position:absolute; font-size:0px; line-height:0px; overflow:hidden;}',
						'.slide-panel .slide-bar{position:absolute; font-size:0px; line-height:0px; overflow:hidden;}',
						'.slide-panel .slide-bar-hover{position:absolute; font-size:0px; line-height:0px; overflow:hidden;}',
						'.slide-panel .slide-bar-dis{position:absolute; font-size:0px; line-height:0px; overflow:hidden;}']);
		this.setStyle(this.cssTexts);
	},
	setConfig : function(config) {
		this.id = config.id || 0;
		this.width = typeof(config.width) == "number" ? config.width : 550;
		this.height = typeof(config.height) == "number" ? config.height : 400;
		this.wayWidth = typeof(config.wayWidth) == "number"
				? config.wayWidth
				: 2;
		this.wayHeight = typeof(config.wayHeight) == "number"
				? config.wayHeight
				: 400;
		this.barWidth = typeof(config.barWidth) == "number"
				? config.barWidth
				: 6;
		this.barHeight = typeof(config.barHeight) == "number"
				? config.barHeight
				: 12;
		this.scrollSize = typeof(config.scrollSize) == "number"
				? config.scrollSize
				: 20;
		this.layout = config.layout || this.RIGHT;
		this.namespace = config.namespace || "sp";
		this.target = config.target || document.body;
		this.cssTexts = config.cssTexts || [];
	},
	createPanel : function() {
		var panel = this.$parent.$(this.PREFIX + this.id);
		if (null == panel) {
			panel = document.createElement("div");
			panel.setAttribute("id", this.PREFIX + this.id);
			panel.className = "slide-panel";
		}
		return panel;
	},
	createContentPanel : function() {
		var panel = this.$parent.$(this.PREFIX + this.id + "_content");
		if (null == panel) {
			panel = document.createElement("div");
			panel.setAttribute("id", this.PREFIX + this.id + "_content");
			panel.className = "slide-content";
		}
		return panel;
	},
	createWayPanel : function() {
		var panel = this.$parent.$(this.PREFIX + this.id + "_way");
		if (null == panel) {
			panel = document.createElement("div");
			panel.setAttribute("id", this.PREFIX + this.id + "_way");
			panel.className = "slide-way";
		}
		return panel;
	},
	createBarPanel : function() {
		var panel = this.$parent.$(this.PREFIX + this.id + "_bar");
		if (null == panel) {
			panel = document.createElement("div");
			panel.setAttribute("id", this.PREFIX + this.id + "_bar");
			panel.className = "slide-bar-dis";
		}
		return panel;
	},
	dynamicStyle : function(cssTexts) {
		var style = document.createElement("style");
		var id = "dynamic_style_" + (new Date()).getTime();
		style.type = "text/css";
		style.rel = "stylesheet";
		style.setAttribute("id", id);
		document.getElementsByTagName("head")[0].appendChild(style);
		if ("MSIE" == Browser.type) {
			style.styleSheet.cssText = cssTexts.join("");
		} else {
			for (var i = 0; i < cssTexts.length; i++) {
				style.sheet.insertRule(cssTexts[i], i);
			}
		}
		return style;
	},
	setStyle : function(cssTexts) {
		this.dynamicStyle(cssTexts || []);
	},
	setLayout : function(panel, content, way, bar) {
		this.layoutRight(panel, content, way, bar);
	},
	layoutRight : function(panel, content, way, bar) {
		var ow = Math.max(this.barWidth, this.wayWidth);
		var ol = this.barWidth > this.wayWidth ? Math
				.floor((this.barWidth - Math.max(this.wayWidth, 2)) / 2) : 0;
		panel.style.cssText = "width:" + (this.width + ow) + "px; height:"
				+ this.height + "px;";
		content.style.cssText = "width:" + this.width
				+ "px; height:auto; left:0px; top:0px;";
		way.style.cssText = "width:" + this.wayWidth + "px; height:"
				+ this.wayHeight + "px; left:" + (ol + this.width)
				+ "px; top:0px;";
		bar.style.cssText = "width:" + this.barWidth + "px; height:"
				+ this.barHeight + "px; left:" + this.width + "px; top:0px;";
		panel = null;
		content = null;
		way = null;
		bar = null;
	},
	setData : function(content, htmlItems) {
		content.innerHTML = htmlItems.join("");
		content = null;
		htmlItems = null;
	},
	setSlidePanelEvent : function(panel, content, way, bar) {
		var _flag = false;
		_flag = this.$parent.$(content).offsetHeight > this.height;
		if (true == _flag) {
			this.$parent.$(way).style.display = "";
			this.$parent.$(bar).style.display = "";
			this.trigger(panel, content, way, bar);
		} else {
			this.$parent.$(way).style.display = "none";
			this.$parent.$(bar).style.display = "none";
		}
	},
	trigger : function(panel, content, way, bar) {
		var _this = this;
		this.$parent.$(bar).className = "slide-bar";
		this.$parent.$(bar).onmouseover = function() {
			this.className = "slide-bar-hover";
		};
		this.$parent.$(bar).onmouseout = function() {
			this.className = "slide-bar";
		};
		this.$parent.$(bar).attachEvent("onmousedown", function() {
					this.className = "slide-bar-hover";
					_this.triggerScroll(panel, content, way, bar);
				});
		Wallet.$("account").attachEvent("onmouseover", function() {
					_this.triggerWheel(panel, content, way, bar);
				});
	},
	triggerScroll : function(panel, content, way, bar) {
		this.verticalScroll(panel, content, way, bar);
		this.triggerWheel(panel, content, way, bar);
	},
	verticalScroll : function(panel, content, way, bar) {
		var t = window.event.clientY - this.$parent.$(bar).offsetTop;
		var isDrag = true;
		var _this = this;
		document.attachEvent("onmousemove", function() {
					var h = 0;
					if (isDrag) {
						h = Math.min(Math.max(window.event.clientY - t, 0),
								_this.wayHeight - _this.barHeight);
						_this.calc(0, h, panel, content, way, bar);
						_this.$parent.$(bar).className = "slide-bar-hover";
						return event.returnValue = !(event.cancelBubble = true);
					}
				});
		document.attachEvent("onmouseup", function() {
					isDrag = false;
					_this.$parent.$(bar).className = "slide-bar";
				});
	},
	calc : function(type, pos, panel, content, way, bar) {
		var times = 0;
		var cPos = 0;
		times = (this.$parent.$(content).offsetHeight - this.wayHeight)
				/ (this.wayHeight - this.barHeight);
		cPos = times * pos;
		this.$parent.$(content).style.top = cPos <= 0 ? cPos + "px" : "-"
				+ cPos + "px";
		this.$parent.$(bar).style.top = pos + "px";
	},
	triggerWheel : function(panel, content, way, bar) {
		var flag = true;
		var _this = this;
		document.attachEvent("onmousewheel", function() {
					var h = 0;
					var delta = 0;
					if (flag) {
						delta = event.wheelDelta / 12;
						h = Math.min(Math.max(_this.$parent.$(bar).offsetTop
												- delta, 0), _this.wayHeight
										- _this.barHeight);
						_this.calc(0, h, panel, content, way, bar);
					}
				});
		document.attachEvent("onmouseout", function() {
					flag = false;
				});
	},
	create : function(htmlItems) {
		htmlItems = htmlItems || [];
		var panel = this.createPanel();
		var content = this.createContentPanel();
		var way = this.createWayPanel();
		var bar = this.createBarPanel();
		var pid = panel.id;
		var cid = content.id;
		var wid = way.id;
		var bid = bar.id;
		this.setStyle(this.cssTexts);
		panel.appendChild(content);
		panel.appendChild(way);
		panel.appendChild(bar);
		this.setLayout(panel, content, way, bar);
		this.setData(content, htmlItems);
		this.$parent.$(this.target).appendChild(panel);
		this.setSlidePanelEvent(pid, cid, wid, bid);
		panel = null;
		content = null;
		way = null;
		bar = null;
	}
};
(function() {
	try {
		var userAgent = navigator.userAgent.toLowerCase();
		var env = null;
		var ver = 0;
		env = userAgent.match(/msie ([\d.]+)/);
		ver = env ? parseInt(env[1], 10) : 0;
		if (ver == 6) {
			Wallet.isIE6 = true;
			document.execCommand("BackgroundImageCache", false, true);
		}
	} catch (e) {
	}
})();
Wallet.Tab = Tab;
Wallet.Msg = Msg;
Wallet.ST = new ScrollText();
Wallet.TScr = new TurnScreen();
Wallet.Assistant = Assistant;
Wallet.My = My;
Wallet.InputTips = new InputTips();
Wallet.PopList = new PopList();
Wallet.PasswdCtrl = PasswdCtrl;
Wallet.CertCtrl = CertCtrl;
Wallet.Loading = Loading;
Wallet.App = App;
Wallet.Ajax = Ajax;
Wallet.XML = XML;
Wallet.Loader = Loader;
Wallet.Stat = new Stat();
window.onunload = function() {
	for (var i in Wallet) {
		Wallet[i] = null;
	}
	window.onunload = null;
};