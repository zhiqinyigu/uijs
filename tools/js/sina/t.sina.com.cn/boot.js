var __debug_mode = false;
var scope = scope ? scope : {};
var $SYSMSG = {};
$SYSMSG.extend = function(info, override) {
	for (var i in info) {
		$SYSMSG[i] = !!override == false ? info[i] : $SYSMSG[i]
	}
};
scope.$BASEJS = "http://sjs.sinajs.cn/";
scope.$BASECSS = "http://simg.sinajs.cn/";
var Boot = {
	dw : function(s) {
		window.document.write(s)
	},
	dwScript : function(o) {
		o.id = o.id || "";
		o.charset = o.charset || "utf-8";
		var def = "";
		if (o.defer != null) {
			def = "defer='true'"
		}
		if (o.script && o.script != "") {
			this.dw("<script id='" + o.id + "' " + def + ">" + o.script
					+ "<\/script>")
		} else {
			if (o.url && o.url != "") {
				this.dw("<script id='" + o.id + "' src='" + o.url
						+ "' charset='" + o.charset + "' " + def
						+ "><\/script>")
			} else {
				throw new Error("no script content or url specified")
			}
		}
	},
	loadCnf : function() {
		if (__debug_mode) {
			this.dwScript({
						url : scope.$BASEJS + scope.$PRODUCT_NAME
								+ "/js/sina/trace.js"
					})
		} else {
			window.trace = function() {
			}
		}
	},
	getJsVersion : function() {
		var ver = false;
		if (typeof(conf) != "undefined") {
			ver = (typeof(conf.js) != "undefined") ? conf.js : ""
		} else {
			if (window.parent) {
				if (typeof(window.parent.conf) != "undefined") {
					ver = (typeof(window.parent.conf.js) != "undefined")
							? window.parent.conf.js
							: ""
				}
			}
		}
		if (ver) {
			return "?v=" + ver
		} else {
			return ""
		}
	},
	addDOMLoadEvent : function(func) {
		if (!window.__load_events) {
			var init = function() {
				if (arguments.callee.done) {
					return
				}
				arguments.callee.done = true;
				if (window.__load_timer) {
					clearInterval(window.__load_timer);
					window.__load_timer = null
				}
				for (var i = 0; i < window.__load_events.length; i++) {
					window.__load_events[i]()
				}
				window.__load_events = null
			};
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", init, false)
			}
			if (/WebKit/i.test(navigator.userAgent)) {
				window.__load_timer = setInterval(function() {
							if (/loaded|complete/.test(document.readyState)) {
								init()
							}
						}, 10)
			}
			if (window.ActiveXObject) {
				window.__load_timer = setInterval(function() {
							try {
								document.body.doScroll("left");
								init()
							} catch (ex) {
							}
						}, 10)
			}
			window.onload = init;
			window.__load_events = []
		}
		window.__load_events.push(func)
	},
	getPageId : function() {
		return scope.$pageid
	},
	loadResource : function() {
		var page = this.getPageId();
		var url;
		var _mode = scope.$devMode ? scope.$devMode : 1;
		switch (scope.$devMode) {
			case 0 :
				url = scope.$BASEJS + "bind/index.php?dev_path=/"
						+ scope.$PRODUCT_NAME + "/js/conf/" + page
						+ ".dev.js&dev_prefix=/" + scope.$PRODUCT_NAME;
				break;
			case 1 :
				url = scope.$BASEJS + scope.$PRODUCT_NAME + "/js/" + page
						+ ".js" + this.getJsVersion();
				break;
			default :
				url = scope.$BASEJS + scope.$PRODUCT_NAME + "/js/" + page
						+ ".js";
				break
		}
		this.dwScript({
					url : url
				})
	},
	runMain : function() {
		main()
	},
	renderPage : function() {
		this.addDOMLoadEvent(this.runMain.bind2(this))
	}
};
Function.prototype.bind2 = function(object) {
	var __method = this;
	return function() {
		return __method.apply(object, arguments)
	}
};
scope._ua = navigator.userAgent.toLowerCase();
scope.$IE = /msie/.test(scope._ua);
scope.$OPERA = /opera/.test(scope._ua);
scope.$MOZ = /gecko/.test(scope._ua);
scope.$IE5 = /msie 5 /.test(scope._ua);
scope.$IE55 = /msie 5.5/.test(scope._ua);
scope.$IE6 = /msie 6/.test(scope._ua);
scope.$IE7 = /msie 7/.test(scope._ua);
scope.$SAFARI = /safari/.test(scope._ua);
scope.$winXP = /windows nt 5.1/.test(scope._ua);
scope.$winVista = /windows nt 6.0/.test(scope._ua);
var $IE = scope.$IE, $MOZ = scope.$MOZ, $IE6 = scope.$IE6;
function $import(url) {
}
loadResource = Boot.loadResource.bind2(Boot);
renderPage = Boot.renderPage.bind2(Boot);
if (typeof(scope.$setDomain) == "undefined" || scope.$setDomain == true) {
	document.domain = "sina.com.cn"
}
Boot.loadCnf();
