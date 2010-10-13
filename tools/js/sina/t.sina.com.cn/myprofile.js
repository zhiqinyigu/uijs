if (!$CONFIG) {
    $CONFIG = {}
}
var scope = $CONFIG;
Function.prototype.bind2 = function (object) {
    var __method = this;
    return function () {
        return __method.apply(object, arguments)
    }
};
scope.$VERSION = "t3";
scope.$BASEIMG = "http://timg.sjs.sinajs.cn/" + scope.$VERSION + "/";
scope.$BASECSS = "http://timg.sjs.sinajs.cn/" + scope.$VERSION + "/";
scope.$BASEJS = "http://tjs.sjs.sinajs.cn/" + scope.$VERSION + "/";
scope.$BASESTATIC = "http://tjs.sjs.sinajs.cn/" + scope.$VERSION + "/";
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
var $IE = scope.$IE,
    $MOZ = scope.$MOZ,
    $IE6 = scope.$IE6;

function $import(url) {}
var Boot = {};
Boot.addDOMLoadEvent = function (func) {
    if (!window.__load_events) {
        var init = function () {
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
            window.__load_timer = setInterval(function () {
                if (/loaded|complete/.test(document.readyState)) {
                    init()
                }
            }, 10)
        }
        if (window.ActiveXObject) {
            window.__load_timer = setInterval(function () {
                try {
                    document.body.doScroll("left");
                    init()
                } catch (ex) {}
            }, 10)
        }
        window.onload = init;
        window.__load_events = []
    }
    window.__load_events.push(func)
};
Boot.getJsVersion = function () {
    var ver = false;
    if ($CONFIG) {
        ver = $CONFIG.js ? $CONFIG.js : ""
    }
    if (ver) {
        return "?v=" + ver
    } else {
        return ""
    }
};
try {
    Boot.addDOMLoadEvent(main)
} catch (e) {}
var $Debug = (function () {
    var contentList = [];

    function add_to_content(sText, oOpts, sCMD) {
        var key;
        var text = sText != null ? sText : "";
        var opts = {
            color: null,
            bgcolor: null,
            html: null
        };
        var cmd = sCMD != null ? sCMD : "log";
        oOpts = oOpts != null ? oOpts : {};
        for (key in opts) {
            if (oOpts[key] != null) {
                opts[key] = oOpts[key]
            }
        }
        contentList.push({
            label: text,
            cmd: cmd,
            opts: opts,
            time: new Date()
        })
    }
    function debug_proto(sText, oOpts) {
        add_to_content(sText, oOpts, "log")
    }
    debug_proto.fatal = function (sText, oOpts) {
        add_to_content(sText, oOpts, "fatal")
    };
    debug_proto.error = function (sText, oOpts) {
        add_to_content(sText, oOpts, "error")
    };
    debug_proto.warning = function (sText, oOpts) {
        add_to_content(sText, oOpts, "warning")
    };
    debug_proto.info = function (sText, oOpts) {
        add_to_content(sText, oOpts, "info")
    };
    debug_proto.log = function (sText, oOpts) {
        add_to_content(sText, oOpts, "log")
    };
    debug_proto.clear = function () {
        contentList = []
    };
    debug_proto.contentList = contentList;
    return debug_proto
})();
if (typeof Sina == "undefined") {
    Sina = {}
}
Sina.pkg = function (ns) {
    if (!ns || !ns.length) {
        return null
    }
    var levels = ns.split(".");
    var nsobj = Sina;
    for (var i = (levels[0] == "Sina") ? 1 : 0; i < levels.length; ++i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]]
    }
    return nsobj
};

function $E(oID) {
    var node = typeof oID == "string" ? document.getElementById(oID) : oID;
    if (node != null) {
        return node
    } else {}
    return null
}
function $C(tagName) {
    return document.createElement(tagName)
}
function $N(name) {
    return document.getElementsByName(name)
}
function $G() {}
function $G2() {}
function v5SendLog() {}
try {
    document.execCommand("BackgroundImageCache", false, true)
} catch (e) {}(function () {
    var funcName = "trace";
    var _traceList = [];
    var _startTime = new Date().valueOf();
    var _curTime = new Date().valueOf();
    var _runTime;
    var _trace = function (sText, oOption, sBgColor) {
        oOption = oOption || {};
        if (typeof oOption == "string") {
            oOption = {
                color: oOption
            };
            if (typeof sBgColor != "undefined" && typeof sBgColor == "string") {
                oOption.bgColor = sBgColor
            }
        }
        _traceList[_traceList.length] = [sText, oOption]
    };
    var _traceError = function (oError) {
        _trace(oError, {
            color: "#F00"
        })
    };
    _trace.error = _traceError;
    _trace.traceList = _traceList;
    _trace.toString = function () {
        return "Trace调试已关闭"
    };
    window[funcName] = _trace;
    window.traceError = _traceError
})();
Sina.pkg("Core");
if (typeof Core == "undefined") {
    Core = Sina.Core
}
Sina.pkg("Core.Array");
Core.Array.each = function (ar, insp) {
    var r = [];
    for (var i = 0; i < ar.length; i++) {
        var x = insp(ar[i], i);
        if (x !== null) {
            r.push(x)
        }
    }
    return r
};

function Jobs() {
    this._jobTable = []
}
Jobs.prototype = {
    _registedJobTable: {},
    initialize: function () {},
    _registJob: function (jobName, rel) {
        this._registedJobTable[jobName] = rel
    },
    add: function (jobName) {
        this._jobTable.push(jobName)
    },
    start: function () {
        var jobs = this._jobTable;
        var regJobs = this._registedJobTable;
        var i = 0;
        var joblen = this._jobTable.length;
        var getTime = function () {
            return new Date().valueOf()
        };
        var interNum = window.setInterval(function () {
            if (i >= joblen) {
                clearInterval(interNum);
                return
            }
            var jobName = jobs[i];
            var job = regJobs[jobName];
            i++;
            if (typeof job == "undefined") {
                $Debug.error("<b>[" + jobName + "# is undefiend!!!</b>", {
                    html: true
                });
                return
            }
            var _try = true;
            var _start = getTime();
            try {
                job.call()
            } catch (e) {
                $Debug.error("<b>[" + jobName + "] failed!!!</b>", {
                    html: true
                });
                _try = false
            } finally {
                if (_try) {
                    var _end = getTime();
                    $Debug.info("[" + jobName + "] done in " + (_end - _start) + "ms.")
                }
            }
        }, 10)
    },
    call: function (jobName, args) {
        if (typeof this._registedJobTable[jobName] != "undefined") {
            this._registedJobTable[jobName].apply(this, args)
        } else {
            $Debug("#" + jobName + "# is undefined!!!", {
                color: "#900",
                bgColor: "#FFF;"
            })
        }
    }
};
$registJob = function (name, rel) {
    Jobs.prototype._registJob(name, rel)
};
$callJob = function (name) {
    var args = [];
    if (arguments.length > 1) {
        Core.Array.foreach(arguments, function (v, i) {
            args[i] = v
        });
        args.shift()
    }
    Jobs.prototype.call(name, args)
};
if (typeof App == "undefined") {
    var App = {}
}
Sina.pkg("Core.Events");
Core.Events.addEvent = function (elm, func, evType, useCapture) {
    var _el = $E(elm);
    if (_el == null) {
        $Debug("addEvent 找不到对象：" + elm);
        return
    }
    if (typeof useCapture == "undefined") {
        useCapture = false
    }
    if (typeof evType == "undefined") {
        evType = "click"
    }
    if (_el.addEventListener) {
        _el.addEventListener(evType, func, useCapture);
        return true
    } else {
        if (_el.attachEvent) {
            var r = _el.attachEvent("on" + evType, func);
            return true
        } else {
            _el["on" + evType] = func
        }
    }
};
Core.Events.removeEvent = function (oElement, fHandler, sName) {
    var _el = $E(oElement);
    if (_el == null) {
        $Debug("removeEvent 找不到对象：" + oElement);
        return
    }
    if (typeof fHandler != "function") {
        return
    }
    if (typeof sName == "undefined") {
        sName = "click"
    }
    if (_el.addEventListener) {
        _el.removeEventListener(sName, fHandler, false)
    } else {
        if (_el.attachEvent) {
            _el.detachEvent("on" + sName, fHandler)
        }
    }
    fHandler[sName] = null
};
Sina.pkg("Core.Base");
(function () {
    var Detect = function () {
        var ua = navigator.userAgent.toLowerCase();
        this.$IE = /msie/.test(ua);
        this.$OPERA = /opera/.test(ua);
        this.$MOZ = /gecko/.test(ua);
        this.$IE5 = /msie 5 /.test(ua);
        this.$IE55 = /msie 5.5/.test(ua);
        this.$IE6 = /msie 6/.test(ua);
        this.$IE7 = /msie 7/.test(ua);
        this.$SAFARI = /safari/.test(ua);
        this.$winXP = /windows nt 5.1/.test(ua);
        this.$winVista = /windows nt 6.0/.test(ua);
        this.$FF2 = /Firefox\/2/i.test(ua)
    };
    Core.Base.detect = new Detect()
})();
Core.Events.getEvent = function () {
    return window.event
};
if (!Core.Base.detect.$IE) {
    Core.Events.getEvent = function () {
        if (window.event) {
            return window.event
        }
        var o = arguments.callee.caller;
        var e;
        var n = 0;
        while (o != null && n < 40) {
            e = o.arguments[0];
            if (e && (e.constructor == Event || e.constructor == MouseEvent)) {
                return e
            }
            n++;
            o = o.caller
        }
        return e
    }
}
Core.Events.stopEvent = function (el) {
    var ev = el ? el : Core.Events.getEvent();
    ev.cancelBubble = true;
    ev.returnValue = false
};
if (!$IE) {
    Core.Events.stopEvent = function (el) {
        var ev = el ? el : Core.Events.getEvent();
        ev.preventDefault();
        ev.stopPropagation()
    }
}
Core.Events.fixEvent = function (e) {
    if (typeof e == "undefined") {
        e = window.event
    }
    if (!e.target) {
        e.target = e.srcElement;
        e.pageX = e.x;
        e.pageY = e.y
    }
    if (typeof e.layerX == "undefined") {
        e.layerX = e.offsetX
    }
    if (typeof e.layerY == "undefined") {
        e.layerY = e.offsetY
    }
    return e
};
Sina.pkg("Core.Dom");
Core.Dom.opacity = function (elm, value) {
    elm = $E(elm);
    elm.style.filter = "alpha(opacity=" + value + ")";
    elm.style.opacity = value / 100
};
Core.Dom.getElementsByClass = function (el, tg, clz) {
    el = el || document;
    var rs = [];
    clz = " " + clz + " ";
    var cldr = el.getElementsByTagName(tg),
        len = cldr.length;
    for (var i = 0; i < len; ++i) {
        var o = cldr[i];
        if (o.nodeType == 1) {
            var ecl = " " + o.className + " ";
            if (ecl.indexOf(clz) != -1) {
                rs[rs.length] = o
            }
        }
    }
    return rs
};
Core.Dom.byClz = Core.Dom.getElementsByClass;
Sina.pkg("Utils");
if (typeof Utils == "undefined") {
    Utils = Sina.Utils
}
Sina.pkg("Core.Function");
Core.Function.bind2 = function (fFunc, object) {
    var __method = fFunc;
    return function () {
        return __method.apply(object, arguments)
    }
};
Function.prototype.bind2 = function (object) {
    var __method = this;
    return function () {
        return __method.apply(object, arguments)
    }
};
Core.Array.foreach = function (ar, insp) {
    if (ar == null && ar.constructor != Array) {
        return []
    }
    var i = 0,
        len = ar.length,
        r = [];
    while (i < len) {
        var x = insp(ar[i], i);
        if (x !== null) {
            r[r.length] = x
        }
        i++
    }
    return r
};
Utils.Template = function (tmpl) {
    this.tmpl = tmpl;
    this.pattern = /(#\{(.*?)\})/g
};
Utils.Template.prototype = {
    evaluate: function (data) {
        return this.tmpl.replace(this.pattern, function () {
            return data[arguments[2]] || ""
        })
    },
    evaluateMulti: function (data, reverse) {
        var _buffer = [];
        Core.Array.foreach(data, Core.Function.bind2(function (v, i) {
            i = reverse ? data.length - i : i;
            _buffer[i] = this.evaluate(v)
        }, this));
        return _buffer.join("")
    }
};
Sina.pkg("Core.System");
Core.System.winSize = function (_target) {
    var w, h;
    if (_target) {
        target = _target.document
    } else {
        target = document
    }
    if (self.innerHeight) {
        if (_target) {
            target = _target.self
        } else {
            target = self
        }
        w = target.innerWidth;
        h = target.innerHeight
    } else {
        if (target.documentElement && target.documentElement.clientHeight) {
            w = target.documentElement.clientWidth;
            h = target.documentElement.clientHeight
        } else {
            if (target.body) {
                w = target.body.clientWidth;
                h = target.body.clientHeight
            }
        }
    }
    return {
        width: w,
        height: h
    }
};
Core.System.pageSize = function (_target) {
    if (_target) {
        target = _target.document
    } else {
        target = document
    }
    var _rootEl = (target.compatMode == "CSS1Compat" ? target.documentElement : target.body);
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = _rootEl.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY
    } else {
        if (_rootEl.scrollHeight > _rootEl.offsetHeight) {
            xScroll = _rootEl.scrollWidth;
            yScroll = _rootEl.scrollHeight
        } else {
            xScroll = _rootEl.offsetWidth;
            yScroll = _rootEl.offsetHeight
        }
    }
    var win_s = Core.System.winSize(_target);
    if (yScroll < win_s.height) {
        pageHeight = win_s.height
    } else {
        pageHeight = yScroll
    }
    if (xScroll < win_s.width) {
        pageWidth = win_s.width
    } else {
        pageWidth = xScroll
    }
    return [pageWidth, pageHeight, win_s.width, win_s.height]
};
Core.System.getScrollPos = function (oDocument) {
    oDocument = oDocument || document;
    var dd = oDocument.documentElement;
    var db = oDocument.body;
    return [Math.max(dd.scrollTop, db.scrollTop), Math.max(dd.scrollLeft, db.scrollLeft), Math.max(dd.scrollWidth, db.scrollWidth), Math.max(dd.scrollHeight, db.scrollHeight)]
};
App.Dialog = {};
App.Dialog.BasicDialog = function (title, content, cfg) {
    cfg = cfg || {};
    cfg.noDrag = cfg.noDrag || true;
    this._node = $C("div");
    document.getElementsByTagName("BODY")[0].appendChild(this._node);
    var tpl = {
        title: title ? title : "BasicDialog",
        content: content ? content : "......",
        closeTip: $CLTMSG.CD0018
    };
    var tt = this._node.style;
    tt.position = "absolute";
    tt.visibility = "hidden";
    if (cfg.zIndex) {
        tt.zIndex = cfg.zIndex
    }
    if (cfg.hidden) {
        tt.visibility = "hidden"
    }
    var str = '<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div class="layerBoxTop"><div class="topCon"><strong>#{title}</strong><a href="javascript:;" class="close" title="#{closeTip}"></a><div class="clear"></div></div></div><div class="layerBoxCon">#{content}</div></div></td><td class="mid_r"></td></tr>			    	<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr>			    </tbody></table>';
    var tmp = new Utils.Template(str);
    this._node.innerHTML = tmp.evaluate(tpl);
    this._node_body = Core.Dom.getElementsByClass(this._node, "DIV", "layerBoxCon")[0];
    this.setSize(cfg.width, cfg.height);
    this._btn_close = this._node.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.firstChild.childNodes[1];
    this._node_title = this._btn_close.previousSibling;
    this._btn_close.parent = this;
    this._btn_close.onclick = function () {
        Core.Events.stopEvent();
        if (cfg.hiddClose) {
            this.parent.hidd()
        } else {
            this.parent.close()
        }
    };
    this._btn_close.onmousedown = function () {};
    this._btn_move = this._btn_close.parentNode.parentNode;
    this._btn_move.parent = this;
    this._btn_move.onmousedown = function () {
        var evt = Core.Events.fixEvent(Core.Events.getEvent());
        this.parent._ondrag = true;
        this.offsetx = evt.layerX;
        this.offsety = evt.layerY
    };
    if (!cfg.noDrag) {
        this._btn_move.style.cursor = "pointer"
    }
    var self = this;
    this._btn_move.mousemoveHandler = function () {
        self._mousemoveHandler()
    };
    this._btn_move.mouseupHandler = function () {
        self._mouserupHandler()
    };
    this._btn_move.resize = function () {
        self.resize()
    };
    this._btn_move.scroll = function () {
        self.scroll()
    };
    this._btn_move.close = function (e) {
        if (cfg.esc) {
            return
        }
        var _key = e.keyCode;
        if (_key === 27) {
            self.close()
        }
    };
    this.setMiddle();
    if (cfg.hidden) {
        tt.visibility = "hidden";
        this.focusTarget = this._btn_close
    } else {
        tt.visibility = "visible";
        this._btn_close.focus();
        this._btn_close.blur()
    }
    this.setMask(this._node.style.zIndex, cfg.hidden);
    if (!cfg.noDrag) {
        Core.Events.addEvent(document, this._btn_move.mousemoveHandler, "mousemove");
        Core.Events.addEvent(document, this._btn_move.mouseupHandler, "mouseup")
    }
    Core.Events.addEvent(window, this._btn_move.resize, "resize");
    Core.Events.addEvent(window, this._btn_move.scroll, "scroll");
    Core.Events.addEvent(document, this._btn_move.close, "keydown")
};
App.Dialog.BasicDialog.prototype = {
    onClose: function () {},
    gc: function () {},
    distory: function () {
        if (this._distory) {
            return
        }
        this.gc();
        Core.Events.removeEvent(document, this._btn_move.mousemoveHandler, "mousemove");
        Core.Events.removeEvent(document, this._btn_move.mouseupHandler, "mouseup");
        Core.Events.removeEvent(window, this._btn_move.resize, "resize");
        Core.Events.removeEvent(window, this._btn_move.scroll, "scroll");
        this._btn_close.onmousedown = null;
        this._btn_close.onclick = null;
        this._btn_close.parent = null;
        this._btn_close = null;
        this._node.parentNode.removeChild(this._node);
        this._mask && this._mask.parentNode.removeChild(this._mask);
        this._mask1.parentNode.removeChild(this._mask1);
        if (scope.$IE) {
            this._node.outerHTML = null;
            this._mask && (this._mask.outerHTML = null);
            this._mask1.outerHTML = null
        }
        this._node = null;
        this._btn_move.mousemoveHandler = null;
        this._btn_move.mouseupHandler = null;
        this._btn_move.resize = null;
        this._btn_move.scroll = null;
        this._btn_move.onmousedown = null;
        this._btn_move.parent = null;
        this._btn_move = null;
        this._mask && (this._mask = null);
        this._distory = true
    },
    close: function () {
        if (this.onClose) {
            this.onClose()
        }
        this.distory()
    },
    show: function () {
        this._node.style.visibility = "visible";
        this._mask && (this._mask.style.visibility = "visible");
        this._mask1.style.visibility = "visible";
        if (this.focusTarget) {
            this.focusTarget.focus()
        }
        this.resize();
        this.setMiddle()
    },
    hidd: function () {
        this._node.style.visibility = "hidden";
        this._mask && (this._mask.style.visibility = "hidden");
        this._mask1.style.visibility = "hidden"
    },
    setMask: function (z, hidden) {
        $IE && (this._mask = document.getElementsByTagName("BODY")[0].appendChild($C("iframe")));
        this._mask1 = document.getElementsByTagName("BODY")[0].appendChild($C("div"));
        if (hidden) {
            this._mask && (this._mask.style.visibility = "hidden");
            this._mask1.style.visibility = "hidden"
        }
        if (this._mask) {
            with(this._mask.style) {
                position = "absolute";
                width = "100%";
                zIndex = parseInt(z) - 2;
                top = "0px";
                left = "0px";
                border = "0"
            }
        }
        with(this._mask1.style) {
            position = "absolute";
            backgroundColor = "#000";
            width = "100%";
            zIndex = parseInt(z) - 1;
            top = "0px";
            left = "0px"
        }
        this._mask && Core.Dom.opacity(this._mask, 0);
        Core.Dom.opacity(this._mask1, 15);
        this.resize()
    },
    setPosition: function (x, y) {
        this._node.style.left = x + "px";
        this._node.style.top = y + "px"
    },
    resize: function () {
        if (this._mask1) {
            var scroll_pos = Core.System.getScrollPos(),
                win_s = Core.System.winSize(),
                snap;
            snap = (win_s.height + 160) + "px";
            this._mask1.style.height = snap;
            this._mask && (this._mask.style.height = snap);
            snap = (scroll_pos[0] - 80) + "px";
            this._mask1.style.top = snap;
            this._mask && (this._mask.style.top = snap);
            this.setMiddle()
        }
    },
    scroll: function () {
        var scroll_pos = Core.System.getScrollPos(),
            h = this._mask1.offsetHeight,
            snap;
        if ((scroll_pos[0] + h) <= scroll_pos[3]) {
            snap = (scroll_pos[0] - 80) + "px";
            this._mask && (this._mask.style.top = snap);
            this._mask1.style.top = snap
        } else {
            snap = (scroll_pos[3] - h) + "px";
            this._mask && (this._mask.style.top = snap);
            this._mask1.style.top = snap
        }
    },
    setTitle: function (str) {
        this._node_title.innerHTML = str
    },
    setMiddle: function () {
        var ow = this._node.offsetWidth;
        var oh = this._node.offsetHeight;
        var win_s = Core.System.winSize();
        var scroll_pos = Core.System.getScrollPos();
        var tx = (win_s.width - ow) / 2;
        var ty = scroll_pos[0] + (win_s.height - oh) / 2;
        this._node.style.left = tx + "px";
        this._node.style.top = (ty < 20 ? 20 : ty) + "px"
    },
    setSize: function (w, h) {
        w = w ? w + "px" : "auto";
        h = h ? h + "px" : "auto";
        var ts = this._node_body.style;
        ts.width = w;
        ts.height = h
    },
    _mousemoveHandler: function () {
        if (this._ondrag) {
            var evt = Core.Events.fixEvent(Core.Events.getEvent());
            if (evt.target == this._btn_close) {
                return
            }
            if ($IE) {
                var ss = Core.System.getScrollPos();
                this._node.style.left = evt.pageX - this._btn_move.offsetx + ss[1] + "px";
                this._node.style.top = evt.pageY - this._btn_move.offsety + ss[0] + "px"
            } else {
                this._node.style.left = evt.pageX - this._btn_move.offsetx + "px";
                this._node.style.top = evt.pageY - this._btn_move.offsety + "px"
            }
        }
    },
    _mouserupHandler: function () {
        this._ondrag = false;
        if (this._btn_move.offsetx) {
            this._btn_move.offsetx = null
        }
        if (this._btn_move.offsety) {
            this._btn_move.offsety = null
        }
    }
};
App.alert = function (msg, config) {
    config = config ? config : {};
    config.hasBtn = config.hasBtn == null ? true : config.hasBtn;
    var title = config.title ? config.title : $CLTMSG.CL0601;
    var ok_label = config.ok_label ? config.ok_label : $CLTMSG.CL0602;
    if (typeof msg == "object") {
        msg = App.getMsg(msg.code, msg.replace)
    }
    var callback = config.ok ? config.ok : null;
    var basic_conf = {};
    basic_conf.width = config.width ? config.width : 360;
    basic_conf.height = config.height;
    basic_conf.zIndex = config.zIndex ? config.zIndex : 1000;
    basic_conf.hidden = config.hidden;
    var htmls = [];
    htmls.push('<div class="commonLayer2">');
    htmls.push('<div class="layerL"><img class="PY_ib PY_ib_#{icon}" src="' + scope.$BASEIMG + 'style/images/common/PY_ib.gif" alt="" title="" align="absmiddle"/></div>');
    htmls.push('<div class="layerR">');
    htmls.push("	<strong>#{cnt}</strong>");
    htmls.push("</div>");
    htmls.push('<div class="clear"></div>');
    if (config.hasBtn) {
        htmls.push('	<div class="MIB_btn">')
    } else {
        htmls.push('	<div class="MIB_btn" style="height:0;">')
    }
    htmls.push('	<a href="javascript:;" id="#{btn_id}" class="btn_normal"><em>' + ok_label + "</em></a>");
    htmls.push("</div></div>");
    var tmp = new Utils.Template(htmls.join(""));
    var t = "btn_" + (new Date()).getTime();
    var icon = config.icon ? config.icon : 1;
    msg = tmp.evaluate({
        cnt: msg,
        icon: icon,
        btn_id: t
    });
    var dialog = new App.Dialog.BasicDialog(title, msg, basic_conf);
    var btn_ok = $E(t);
    var okCallback = function () {
        if (callback) {
            try {
                callback()
            } catch (e) {}
        }
        callback = null;
        btn_ok.onclick = null;
        btn_ok = null;
        dialog.close();
        Core.Events.removeEvent(document, hotkey, "keyup");
        return false
    };
    var hotkey = function (e) {
        var ev = window.event || e;
        var element;
        if (ev.target) {
            element = e.target
        } else {
            if (ev.srcElement) {
                element = e.srcElement
            }
        }
        if (element.nodeType == 3) {
            element = element.parentNode
        }
        if (element.tagName == "INPUT" || element.tagName == "TEXTAREA") {
            return
        }
        switch (ev.keyCode) {
        case 27:
            okCallback();
            break
        }
    };
    btn_ok.onclick = okCallback;
    Core.Events.addEvent(document, hotkey, "keyup");
    if (basic_conf.hidden) {
        this.focusTarget = btn_ok
    } else {
        btn_ok.focus()
    }
    return dialog
};
App.confirm = function (msg, config) {
    config = config ? config : {};
    var title = config.title ? config.title : $CLTMSG.CL0601;
    var ok_label = config.ok_label ? config.ok_label : $CLTMSG.CL0602;
    var cancel_label = config.cancel_label ? config.cancel_label : $CLTMSG.CL0603;
    var des = "";
    if (typeof msg == "object") {
        des = msg.des;
        if (msg.code) {
            msg = App.getMsg(msg.code, msg.replace)
        } else {
            msg = msg.html
        }
    }
    if (msg) {
        msg = "<strong>" + msg + "</strong>"
    }
    if (des) {
        des = '<div class="txt">' + des + "</div>"
    }
    var callback_ok = config.ok ? config.ok : null;
    var callback_cancel = config.cancel ? config.cancel : null;
    var basic_conf = {};
    basic_conf.width = config.width ? config.width : 390;
    basic_conf.height = config.height;
    basic_conf.zIndex = config.zIndex ? config.zIndex : 1000;
    basic_conf.hidden = config.hidden;
    var tpl = '<div class="commonLayer2">                        	<div class="layerL"><img class="PY_ib PY_ib_#{icon}" src="' + scope.$BASEIMG + 'style/images/common/PY_ib.gif" alt="" title="" align="absmiddle"/></div>                        	<div class="layerR">					#{cnt}			        	#{des}                                	<div class="MIB_btn">						<a href="javascript:;" id="ok_#{t}" class="btn_normal"><em>' + ok_label + '</em></a>						<a href="javascrpt:;" id="cancel_#{t}" class="btn_notclick"><em>' + cancel_label + '</em></a>					</div>                            	</div>                            <div class="clear"></div>                        </div>';
    var tmp = new Utils.Template(tpl);
    var t = (new Date()).getTime();
    var icon = config.icon ? config.icon : 4;
    msg = tmp.evaluate({
        cnt: msg,
        des: des,
        icon: icon,
        t: t
    });
    var dialog = new App.Dialog.BasicDialog(title, msg, basic_conf);
    var btn_ok = $E("ok_" + t);
    var btn_cancel = $E("cancel_" + t);
    var hotkey = function (e) {
        var ev = window.event || e;
        var element;
        if (ev.target) {
            element = e.target
        } else {
            if (ev.srcElement) {
                element = e.srcElement
            }
        }
        if (element.nodeType == 3) {
            element = element.parentNode
        }
        if (element.tagName == "INPUT" || element.tagName == "TEXTAREA") {
            return
        }
        switch (ev.keyCode) {
        case 27:
            cancel_function();
            break
        }
    };
    var cancel_function = function () {
        if (callback_cancel) {
            try {
                callback_cancel()
            } catch (e) {}
        }
        callback_cancel = null;
        btn_ok.onclick = null;
        btn_cancel.onclick = null;
        btn_cancel = null;
        btn_ok = null;
        dialog.distory();
        dialog = null;
        Core.Events.removeEvent(document, hotkey, "keyup");
        return false
    };
    btn_ok.onclick = function () {
        if (callback_ok) {
            try {
                callback_ok()
            } catch (e) {}
        }
        callback_ok = null;
        btn_ok.onclick = null;
        btn_cancel.onclick = null;
        btn_cancel = null;
        btn_ok = null;
        dialog.distory();
        dialog = null;
        Core.Events.removeEvent(document, hotkey, "keyup");
        return false
    };
    btn_cancel.onclick = cancel_function;
    if (config.ok_focus) {
        if (config.hidden) {
            this.focusTarget = btn_ok
        } else {
            btn_ok.focus()
        }
    } else {
        if (config.cancel_focus) {
            if (config.hidden) {
                this.focusTarget = btn_cancel
            } else {
                btn_cancel.focus()
            }
        }
    }
    Core.Events.addEvent(document, hotkey, "keyup");
    return dialog
};
App.customDialog = function (content, config) {
    config = config ? config : {};
    var title = config.title ? config.title : $CLTMSG.CL0601;
    var basic_conf = {};
    basic_conf.width = config.width ? config.width : 360;
    basic_conf.height = config.height;
    basic_conf.zIndex = config.zIndex ? config.zIndex : 1000;
    basic_conf.hidden = config.hidden;
    var tpl = '#{cnt} <div class="layerBtn" id="btn_#{t}"></div>';
    var tmp = new Utils.Template(tpl);
    var t = (new Date()).getTime();
    var msg = tmp.evaluate({
        cnt: content,
        t: t
    });
    var dialog = new App.Dialog.BasicDialog(title, msg, basic_conf);
    var btn_node = $E("btn_" + t);
    var btns = config.btns;
    for (var i = 0; i < btns.length; i++) {
        var btn = btn_node.appendChild($C("a"));
        btn.className = "mBlogBtn";
        btn.href = "javascript:;";
        if (btns[i].select) {
            if (config.hidden) {
                this.focusTarget = btn
            } else {
                btn.focus()
            }
        }
        btn.innerHTML = "<em>" + btns[i].text + "</em>";
        btn.nohide = config.btns[i].nohide;
        btn.func = config.btns[i].func;
        btn.onclick = function () {
            var nohide = this.nohide;
            if (this.func) {
                try {
                    this.func()
                } catch (e) {}
            }
            if (!nohide) {
                dialog.close()
            }
            return false
        }
    }
    function _distory() {
        var nodes = btn_node.getElementsByTagName("A");
        for (var i in nodes) {
            nodes[i].nohide = null;
            nodes[i].func = null;
            nodes[i].onclick = null
        }
        btn_node = null
    }
    dialog.close = function () {
        dialog.onClose();
        _distory();
        dialog.distory()
    };
    return dialog
};
if (!App.getMsg) {
    App.getMsg = function (code, replace) {
        alert("you should override this function! get more help from dialog.js ");
        return code
    }
}
App.getMsg = function (msgCode, replace) {
    if (msgCode === undefined) {
        return ""
    }
    if (typeof(msgCode) == "object") {
        msgCode = msgCode.code
    }
    var msg = $SYSMSG[msgCode] || $CLTMSG[msgCode] || ("Error[" + msgCode + "]");
    if (replace) {
        var tmp = new Utils.Template(msg);
        return tmp.evaluate(replace)
    } else {
        return msg
    }
};
App.Dom = (function () {
    var documentElement = document.documentElement,
        CLASS = (!documentElement.hasAttribute) ? "className" : "class";
    var dom = {
        trim: function (s) {
            try {
                return s.replace(/^\s+|\s+$/g, "")
            } catch (e) {
                return s
            }
        },
        hasClass: function (el, className) {
            var ret = false,
                current;
            if (el && className) {
                current = el.getAttribute(CLASS) || "";
                if (className.exec) {
                    ret = className.test(current)
                } else {
                    ret = className && (" " + current + " ").indexOf(" " + className + " ") > -1
                }
            } else {}
            return ret
        },
        addClass: function (el, className) {
            var ret = false,
                current;
            if (el && className) {
                current = el.className || "";
                if (!this.hasClass(el, className)) {
                    current += " " + className;
                    el.setAttribute(CLASS, current.replace(/^\s+|\s+$/g, ""));
                    ret = true
                }
            } else {}
            return ret
        },
        removeClass: function (el, className) {
            var ret = false,
                current, newClass, attr;
            if (el && className) {
                current = el.getAttribute(CLASS) || "";
                el.setAttribute(CLASS, dom.trim((current + " ").replace(className + " ", "")));
                newClass = el.getAttribute(CLASS);
                if (current !== newClass) {
                    el.setAttribute(CLASS, dom.trim(newClass));
                    ret = true;
                    if (el.getAttribute(CLASS) === "") {
                        el.removeAttribute(CLASS)
                    }
                }
            } else {}
            return ret
        },
        replaceClass: function (el, newClass, oldClass) {
            dom.removeClass(el, oldClass);
            dom.addClass(el, newClass)
        },
        getByClass: function (className, tag, root) {
            className = dom.trim(className);
            tag = tag || "*";
            if (!root) {
                return []
            }
            var nodes = [],
                elements = root.getElementsByTagName(tag);
            for (var i = 0, len = elements.length; i < len; ++i) {
                if (dom.hasClass(elements[i], className)) {
                    nodes[nodes.length] = elements[i]
                }
            }
            return nodes
        },
        getBy: function (method, tag, root) {
            tag = tag || "*";
            if (!root) {
                return []
            }
            var nodes = [],
                elements = root.getElementsByTagName(tag);
            for (var i = 0, len = elements.length; i < len; ++i) {
                if (method(elements[i])) {
                    nodes[nodes.length] = elements[i]
                }
            }
            return nodes
        },
        getXY: function (el, config) {
            config = config || {};
            config.abs = config.abs || false;
            var pos = {};
            var _base = function (obj) {
                var x = 0,
                    y = 0;
                if (obj.getBoundingClientRect) {
                    var box = obj.getBoundingClientRect();
                    var D = documentElement;
                    x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
                    y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop
                } else {
                    for (; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent) {}
                }
                return {
                    x: x,
                    y: y
                }
            };
            pos = _base(el);
            if (config.abs) {
                while (el = el.offsetParent) {
                    if (App.Dom.getStyle(el, "position") == "absolute") {
                        var tpos = _base(el);
                        pos.x -= tpos.x;
                        pos.y -= tpos.y
                    }
                }
            }
            return pos
        },
        getScreen: function () {
            var screen = {};
            if ($IE) {
                screen.w = documentElement.clientWidth;
                screen.h = documentElement.clientHeight
            } else {
                screen.w = window.innerWidth;
                screen.h = window.innerHeight
            }
            return screen
        },
        getStyle: function (el, property) {
            if ($IE) {
                switch (property) {
                case "opacity":
                    var val = 100;
                    try {
                        val = el.filters["DXImageTransform.Microsoft.Alpha"].opacity
                    } catch (e) {
                        try {
                            val = el.filters("alpha").opacity
                        } catch (e) {}
                    }
                    return val / 100;
                case "float":
                    property = "styleFloat";
                default:
                    var value = el.currentStyle ? el.currentStyle[property] : null;
                    return (el.style[property] || value)
                }
            } else {
                if (property == "float") {
                    property = "cssFloat"
                }
                try {
                    var computed = document.defaultView.getComputedStyle(el, "")
                } catch (e) {
                    traceError(e)
                }
                return el.style[property] || computed ? computed[property] : null
            }
        },
        setStyle: function (el, property, val) {
            if ($IE) {
                switch (property) {
                case "opacity":
                    el.style.filter = "alpha(opacity=" + (val * 100) + ")";
                    if (!el.currentStyle || !el.currentStyle.hasLayout) {
                        el.style.zoom = 1
                    }
                    break;
                case "float":
                    property = "styleFloat"
                }
            } else {
                if (property == "float") {
                    property = "cssFloat"
                }
            }
            el.style[property] = val
        },
        insertAfter: function (obj, target) {
            var parentEl = target.parentNode;
            if (parentEl.lastChild == target) {
                parentEl.appendChild(obj)
            } else {
                parentEl.insertBefore(obj, target.nextSibling)
            }
        },
        getScroll: function () {
            var de = document.documentElement,
                db = document.body;
            var t, l, w, h;
            if (de && de.scrollTop) {
                t = de.scrollTop;
                l = de.scrollLeft;
                w = de.scrollWidth;
                h = de.scrollHeight
            } else {
                if (db) {
                    t = db.scrollTop;
                    l = db.scrollLeft;
                    w = db.scrollWidth;
                    h = db.scrollHeight
                }
            }
            return {
                t: t,
                l: l,
                w: w,
                h: h
            }
        },
        domClick: function (obj) {
            if ($IE) {
                obj.click()
            } else {
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, true);
                obj.dispatchEvent(evt)
            }
        }
    };
    return dom
})();
Core.Dom.getStyle = function (el, property) {
    switch (property) {
    case "opacity":
        var val = 100;
        try {
            val = el.filters["DXImageTransform.Microsoft.Alpha"].opacity
        } catch (e) {
            try {
                val = el.filters("alpha").opacity
            } catch (e) {}
        }
        return val / 100;
    case "float":
        property = "styleFloat";
    default:
        var value = el.currentStyle ? el.currentStyle[property] : null;
        return (el.style[property] || value)
    }
};
if (!Core.Base.detect.$IE) {
    Core.Dom.getStyle = function (el, property) {
        if (property == "float") {
            property = "cssFloat"
        }
        try {
            var computed = document.defaultView.getComputedStyle(el, "")
        } catch (e) {
            traceError(e)
        }
        return el.style[property] || computed ? computed[property] : null
    }
}
Core.Dom.getXY = function (el) {
    if ((el.parentNode == null || el.offsetParent == null || Core.Dom.getStyle(el, "display") == "none") && el != document.body) {
        return false
    }
    var parentNode = null;
    var pos = [];
    var box;
    var doc = el.ownerDocument;
    box = el.getBoundingClientRect();
    var scrollPos = Core.System.getScrollPos(el.ownerDocument);
    return [box.left + scrollPos[1], box.top + scrollPos[0]];
    parentNode = el.parentNode;
    while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
        if (Core.Dom.getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) {
            pos[0] -= parentNode.scrollLeft;
            pos[1] -= parentNode.scrollTop
        }
        parentNode = parentNode.parentNode
    }
    return pos
};
if (!$IE) {
    Core.Dom.getXY = function (el) {
        if ((el.parentNode == null || el.offsetParent == null || Core.Dom.getStyle(el, "display") == "none") && el != document.body) {
            return false
        }
        var parentNode = null;
        var pos = [];
        var box;
        var doc = el.ownerDocument;
        pos = [el.offsetLeft, el.offsetTop];
        parentNode = el.offsetParent;
        var hasAbs = Core.Dom.getStyle(el, "position") == "absolute";
        if (parentNode != el) {
            while (parentNode) {
                pos[0] += parentNode.offsetLeft;
                pos[1] += parentNode.offsetTop;
                if (scope.$SAFARI && !hasAbs && Core.Dom.getStyle(parentNode, "position") == "absolute") {
                    hasAbs = true
                }
                parentNode = parentNode.offsetParent
            }
        }
        if (scope.$SAFARI && hasAbs) {
            pos[0] -= el.ownerDocument.body.offsetLeft;
            pos[1] -= el.ownerDocument.body.offsetTop
        }
        parentNode = el.parentNode;
        while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
            if (Core.Dom.getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) {
                pos[0] -= parentNode.scrollLeft;
                pos[1] -= parentNode.scrollTop
            }
            parentNode = parentNode.parentNode
        }
        return pos
    }
}(function (ns) {
    var timer, que, i, step = 8,
        of;
    ns.scrollTo = function (nForm, nTo, nStep) {
        step = nStep || step;
        of = nForm - nTo;
        que = [of];
        que[step] = 0;
        i = 1;
        for (i; i < step; i++) {
            que[i] = (of = of / 2)
        }
        clearInterval(timer);
        timer = setInterval(function () {
            if (que.length) {
                window.scrollTo(0, nTo + que.shift());
                return
            }
            clearInterval(timer)
        }, 30)
    }
})(App);
(function () {
    Boot.addDOMLoadEvent(function () {
        var goTop = $C("a");
        var _html = '<span class="goTopbg"></span>					<span class="goTopcon">						<em class="toparr">&lt;</em><span>' + $CLTMSG.CD0183 + "</span>					</span>";
        goTop.harf = "return false;";
        goTop.className = "goTop";
        goTop.innerHTML = _html;
        Core.Events.addEvent(goTop, function () {
            App.scrollTo(Core.System.getScrollPos(document)[0], 0)
        }, "click");
        Core.Dom.setStyle(goTop, "visibility", "hidden");
        document.body.appendChild(goTop);
        var _gSTop = function () {
            return Core.System.getScrollPos(document)[0]
        };
        var _gSH = function () {
            return App.Dom.getScreen().h
        };
        var _gSW = function () {
            return App.Dom.getScreen().w
        };
        $IE6 && Core.Events.addEvent(window, function () {
            if (Core.Dom.getStyle(goTop, "visibility") !== "hidden") {
                Core.Dom.setStyle(goTop, "top", _gSTop() + _gSH() - 80 + "px")
            }
            Core.Dom.setStyle(goTop, "display", (_gSW() <= 800) ? "none" : "")
        }, "resize");
        Core.Events.addEvent(window, (function () {
            var timer = "";
            return function () {
                timer && clearTimeout(timer);
                if (_gSTop() > 0) {
                    if ($IE6) {
                        Core.Dom.setStyle(goTop, "visibility", "hidden");
                        timer = setTimeout(function () {
                            Core.Dom.setStyle(goTop, "top", _gSTop() + _gSH() - 80 + "px");
                            Core.Dom.setStyle(goTop, "visibility", "visible")
                        }, 500)
                    } else {
                        Core.Dom.setStyle(goTop, "position", "fixed");
                        Core.Dom.setStyle(goTop, "bottom", "30px");
                        Core.Dom.setStyle(goTop, "visibility", "visible")
                    }
                } else {
                    Core.Dom.setStyle(goTop, "visibility", "hidden")
                }
            }
        })(), "scroll")
    })
})();
Sina.pkg("Core.String");
Core.String.byteLength = function (str) {
    if (typeof str == "undefined") {
        return 0
    }
    var aMatch = str.match(/[^\x00-\x80]/g);
    return (str.length + (!aMatch ? 0 : aMatch.length))
};
Core.String.trimHead = function (str) {
    return str.replace(/^(\u3000|\s|\t)*/gi, "")
};
Core.String.trimTail = function (str) {
    return str.replace(/(\u3000|\s|\t)*$/gi, "")
};
Core.String.trim = function (str) {
    return Core.String.trimHead(Core.String.trimTail(str))
};
Sina.pkg("Utils.Sinput");
Core.Function.bind3 = function (fFunc, object, args) {
    args = args == null ? [] : args;
    var __method = fFunc;
    return function () {
        return __method.apply(object, args)
    }
};
Core.String.leftB = function (str, len) {
    var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
    str = str.slice(0, s.slice(0, len).replace(/\*\*/g, " ").replace(/\*/g, "").length);
    if (Core.String.byteLength(str) > len) {
        str = str.slice(0, str.length - 1)
    }
    return str
};
Utils.Sinput.limitMaxLen = function (oTextNode, nMaxLen) {
    var nValue;
    var keyup = function () {
        nValue = oTextNode.value;
        var strLen = Core.String.byteLength(nValue);
        if (strLen > nMaxLen) {
            oTextNode.value = Core.String.leftB(nValue, nMaxLen)
        }
    };
    Core.Events.addEvent(oTextNode, Core.Function.bind3(keyup, oTextNode), "keyup");
    Core.Events.addEvent(oTextNode, Core.Function.bind3(keyup, oTextNode), "blur");
    Core.Events.addEvent(oTextNode, Core.Function.bind3(keyup, oTextNode), "focus")
};
Core.String.j2o = function (str) {
    if (!str || str == "") {
        return null
    }
    try {
        var o = window.eval("(" + str + ")");
        return o
    } catch (e) {
        $Debug("j2o : 数据分析出错");
        traceError(e);
        return null
    }
};
Sina.pkg("Utils.Io");
Utils.Url = function (url) {
    url = url || "";
    this.url = url;
    this.query = {};
    this.parse()
};
Utils.Url.prototype = {
    parse: function (url) {
        if (url) {
            this.url = url
        }
        this.parseAnchor();
        this.parseParam()
    },
    parseAnchor: function () {
        var anchor = this.url.match(/\#(.*)/);
        anchor = anchor ? anchor[1] : null;
        this._anchor = anchor;
        if (anchor != null) {
            this.anchor = this.getNameValuePair(anchor);
            this.url = this.url.replace(/\#.*/, "")
        }
    },
    parseParam: function () {
        var query = this.url.match(/\?([^\?]*)/);
        query = query ? query[1] : null;
        if (query != null) {
            this.url = this.url.replace(/\?([^\?]*)/, "");
            this.query = this.getNameValuePair(query)
        }
    },
    getNameValuePair: function (str) {
        var o = {};
        str.replace(/([^&=]*)(?:\=([^&]*))?/gim, function (w, n, v) {
            if (n == "") {
                return
            }
            o[n] = v || ""
        });
        return o
    },
    getParam: function (sPara) {
        return this.query[sPara] || ""
    },
    clearParam: function () {
        this.query = {}
    },
    setParam: function (name, value) {
        if (name == null || name == "" || typeof(name) != "string") {
            throw new Error("no param name set")
        }
        this.query = this.query || {};
        this.query[name] = value
    },
    setParams: function (o) {
        this.query = o
    },
    serialize: function (o) {
        var ar = [];
        for (var i in o) {
            if (o[i] == null || o[i] == "") {
                ar.push(i + "=")
            } else {
                ar.push(i + "=" + o[i])
            }
        }
        return ar.join("&")
    },
    toString: function () {
        var queryStr = this.serialize(this.query);
        return this.url + (queryStr.length > 0 ? "?" + queryStr : "") + (this.anchor ? "#" + this.serialize(this.anchor) : "")
    },
    getHashStr: function (forceSharp) {
        return this.anchor ? "#" + this.serialize(this.anchor) : (forceSharp ? "#" : "")
    }
};
Core.String.encodeDoubleByte = function (str) {
    if (typeof str != "string") {
        return str
    }
    return encodeURIComponent(str)
};
Utils.Io.Ajax = {
    createRequest: function () {
        var request = null;
        try {
            request = new XMLHttpRequest()
        } catch (trymicrosoft) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (othermicrosoft) {
                try {
                    request = ActiveXObject("Microsoft.XMLHTTP")
                } catch (failed) {}
            }
        }
        if (request == null) {
            $Debug.error("<b>create request failed</b>", {
                html: true
            })
        } else {
            return request
        }
    },
    request: function (url, option) {
        option = option || {};
        option.onComplete = option.onComplete ||
        function () {};
        option.onException = option.onException ||
        function () {};
        option.returnType = option.returnType || "txt";
        option.method = option.method || "get";
        option.data = option.data || {};
        if (typeof option.GET != "undefined" && typeof option.GET.url_random != "undefined" && option.GET.url_random == 0) {
            this.rand = false;
            option.GET.url_random = null
        }
        this.loadData(url, option)
    },
    loadData: function (url, option) {
        var request = this.createRequest(),
            tmpArr = [];
        var _url = new Utils.Url(url);
        if (option.POST) {
            for (var postkey in option.POST) {
                var postvalue = option.POST[postkey];
                if (postvalue != null) {
                    tmpArr.push(postkey + "=" + Core.String.encodeDoubleByte(postvalue))
                }
            }
        }
        var sParameter = tmpArr.join("&") || "";
        if (option.GET) {
            for (var key in option.GET) {
                if (key != "url_random") {
                    _url.setParam(key, Core.String.encodeDoubleByte(option.GET[key]))
                }
            }
        }
        if (this.rand != false) {
            _url.setParam("rnd", Math.random())
        }
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var response, type = option.returnType;
                try {
                    switch (type) {
                    case "txt":
                        response = request.responseText;
                        break;
                    case "xml":
                        if (Core.Base.detect.$IE) {
                            response = request.responseXML
                        } else {
                            var Dparser = new DOMParser();
                            response = Dparser.parseFromString(request.responseText, "text/xml")
                        }
                        break;
                    case "json":
                        response = eval("(" + request.responseText + ")");
                        break
                    }
                    option.onComplete(response)
                } catch (e) {
                    option.onException(e.message, _url);
                    return false
                }
            }
        };
        try {
            if (option.POST) {
                request.open("POST", _url, true);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send(sParameter)
            } else {
                request.open("GET", _url, true);
                request.send(null)
            }
        } catch (e) {
            option.onException(e.message, _url);
            return false
        }
    }
};
App.doRequest = function (oData, sUrl, fCb, fEcb, ptype, type) {
    var emptyFun = function () {};
    var param = {
        onComplete: function (result) {
            try {
                if (typeof result == "string") {
                    result = result.replace(/;$/, "")
                }
                result = (typeof result == "string" && (/\s*{/.test(result))) ? Core.String.j2o(result) : result;
                if (result && (result.code == "A00006" || result.code == "S00001")) {
                    (fCb || emptyFun)(result.data, result)
                } else {
                    (fEcb || emptyFun)(result)
                }
            } catch (e) {}
        },
        onException: function (json) {
            (fEcb || emptyFun)(json)
        }
    };
    ptype = (ptype || "post").toUpperCase();
    param[ptype] = oData;
    param.returnType = "json";
    type = type || "ajax";
    Utils.Io.Ajax.request(sUrl, param)
};
Core.Dom.replaceNode = function (oNewNode, oOriginal) {
    if (oNewNode == null || oOriginal == null) {
        return false
    }
    oNewNode = $E(oNewNode);
    oOriginal = $E(oOriginal);
    oOriginal.parentNode.replaceChild(oNewNode, oOriginal)
};
Sina.pkg("Core.Class");
Core.Class.extend = function (destination, source) {
    for (var property in source) {
        destination[property] = source[property]
    }
    return destination
};
App.enterSubmit = function (options) {
    options = Core.Class.extend({
        parent: document
    }, options);
    var _p = $E(options.parent);
    var _checkEnter = function () {
        var _e = Core.Events.getEvent();
        var _k = _e.keyCode;
        var _act = this.getAttribute("act") || options.action || null;
        if (_k === 13 && _act) {
            try {
                if (typeof _act === "string") {
                    eval("(" + _act + ")();")
                } else {
                    if (typeof _act === "function") {
                        _act()
                    }
                }
            } catch (e) {}
        }
    };
    if (_p) {
        var els = _p.getElementsByTagName("input");
        for (var i = 0, l = els.length; i < l; i++) {
            var cur = els[i];
            var _t = cur.getAttribute("type").toLowerCase();
            if (_t === "text" || _t === "password" || _t === "checkbox") {
                if (cur.getAttribute("passenter") === "1") {
                    continue
                }
                Core.Events.addEvent(cur, _checkEnter.bind2(cur), "keydown")
            }
        }
    }
};
Core.Dom.addHTML = function (oParentNode, sHTML) {
    oParentNode.insertAdjacentHTML("BeforeEnd", sHTML)
};
if (!$IE) {
    Core.Dom.addHTML = function (oParentNode, sHTML) {
        var oRange = oParentNode.ownerDocument.createRange();
        oRange.setStartBefore(oParentNode);
        var oFrag = oRange.createContextualFragment(sHTML);
        oParentNode.appendChild(oFrag)
    }
}
App.fixElement = {
    init: function (wrap) {
        var el = $E("mod_login_tip");
        if (!el) {
            var errorHTML = '<div class="errorLayer" id="mod_login_tip" style="visibility:hidden">				<div class="top"></div>			    <div class="mid">			    	<div class="close" onclick="App.fixElement.hidden()" id="mod_login_close">x</div>			        <div class="conn">			        		<p class="bigtxt" id="mod_login_title"></p>				            <span class="stxt" id="mod_login_content" style="padding:0px;"></span>			        </div>			    </div>			    <div class="bot"></div>			</div>			';
            if (wrap) {
                wrap.innerHTML = errorHTML
            } else {
                Core.Dom.addHTML((document.body), errorHTML)
            }
        }
        el = $E("mod_login_tip");
        this.element = el
    },
    setHTML: function (title, content, options) {
        this.init($E(options.wrap));
        $E("mod_login_title").innerHTML = title || "";
        if (content) {
            $E("mod_login_content").innerHTML = content;
            $E("mod_login_content").style.display = ""
        } else {
            $E("mod_login_content").style.display = "none"
        }
        this.fixPostion(options || {});
        this.show()
    },
    fixPostion: function (obj) {
        var offsetX = obj.offsetX || 0;
        var offsetY = obj.offsetY || 0;
        var ref = $E(obj.ref);
        var target = this.element;
        var aPos = Core.Dom.getXY(ref);
        target.style.position = "absolute";
        if (!obj.wrap) {
            target.style.left = (aPos[0] + offsetX) + "px";
            target.style.top = (aPos[1] + offsetY - target.offsetHeight) + "px"
        } else {
            target.style.marginTop = (-target.offsetHeight + offsetY) + "px";
            target.style.marginLeft = (offsetX) + "px"
        }
        target.style.zIndex = obj.zIndex || 10;
        return target
    },
    show: function () {
        this.element && (this.element.style.visibility = "visible");
        if ($E("mod_login_title")) {
            $E("mod_login_title").className = "bigtxt"
        }
    },
    hidden: function () {
        this.element = this.element || $E("mod_login_tip");
        this.element && (this.element.style.visibility = "hidden")
    }
};
Sina.pkg("Utils.Cookie");
Utils.Cookie.getCookie = function (name) {
    name = name.replace(/([\.\[\]\$])/g, "\\$1");
    var rep = new RegExp(name + "=([^;]*)?;", "i");
    var co = document.cookie + ";";
    var res = co.match(rep);
    if (res) {
        return res[1] || ""
    } else {
        return ""
    }
};
Utils.Cookie.setCookie = function (name, value, expire, path, domain, secure) {
    var cstr = [];
    cstr.push(name + "=" + escape(value));
    if (expire) {
        var dd = new Date();
        var expires = dd.getTime() + expire * 3600000;
        dd.setTime(expires);
        cstr.push("expires=" + dd.toGMTString())
    }
    if (path) {
        cstr.push("path=" + path)
    }
    if (domain) {
        cstr.push("domain=" + domain)
    }
    if (secure) {
        cstr.push(secure)
    }
    document.cookie = cstr.join(";")
};
Utils.Cookie.deleteCookie = function (name) {
    document.cookie = name + "=;expires=Fri, 31 Dec 1999 23:59:59 GMT;"
};
App.setUsername = function (id) {
    var _username_input = $E(id);
    var _username = "";
    if (_username_input) {
        if (_username_input.value == $CLTMSG.R01008 || _username_input.value == $CLTMSG.CR0001) {
            _username = Utils.Cookie.getCookie("un");
            if (_username) {
                _username_input.value = unescape(_username);
                return true
            }
        }
    }
    return false
};
window.sinaSSOConfig = {
    feedBackUrl: "http://" + window.location.hostname + "/ajaxlogin.php",
    service: "miniblog",
    domain: "sina.com.cn",
    framelogin: "1",
    pageCharset: "utf-8",
    isCheckLoginState: false,
    customLoginCallBack: function () {},
    customUpdateCookieCallBack: function () {},
    entry: "miniblog"
};
App.initLoginInput = function (oUserInput, text) {
    if (oUserInput) {
        (function (sText, oInput, sValue) {
            oInput.style.color = "#999999";
            oInput.alt = oInput.title = sText;
            if (!sValue) {
                oInput.value = sText
            }
            if (!oInput.binded) {
                Core.Events.addEvent(oInput, function () {
                    oInput.style.color = "#333333";
                    if (oInput.value == sText) {
                        oInput.value = ""
                    }
                }, "focus");
                Core.Events.addEvent(oInput, function () {
                    oInput.style.color = "#999999";
                    if (oInput.value == "") {
                        oInput.value = sText
                    }
                }, "blur");
                oUserInput.binded = true
            }
        })((text ? $SYSMSG[text] : $CLTMSG.R01008), oUserInput, oUserInput.value)
    }
    if (oUserInput && (Core.String.trim(oUserInput.value) == "" || oUserInput.value == ((text ? $SYSMSG[text] : $CLTMSG.R01008)))) {
        App.setUsername(oUserInput)
    }
};
App.LoginAction = function (cfg) {
    var login_name = Core.String.trim(cfg.name);
    var login_pwd = Core.String.trim(cfg.pwd);
    var login_remb = cfg.remb ? "7" : "0";
    if (!login_name) {
        cfg.error($CLTMSG.CL0801);
        return
    } else {
        if (!login_pwd) {
            cfg.error($CLTMSG.CL0802);
            return
        }
    }
    var doLogin = function () {
        var Login = window.sinaSSOController;
        Login.customLoginCallBack = function (res) {
            if (res.result) {
                Login.customLoginCallBack = function () {};
                Utils.Cookie.setCookie("un", login_name, 240, "/", "t.sina.com.cn");
                cfg.succ()
            } else {
                cfg.error(res.reason, res.errno);
                login_pwd.value = ""
            }
            Login.customLoginCallBack = function () {};
            Login = null
        };
        Login.login(login_name, login_pwd, login_remb)
    };
    if (typeof window.sinaSSOController != "undefined") {
        doLogin()
    } else {
        var d = document,
            j = d.createElement("script"),
            h = d.body,
            s = false;
        j.type = "text/javascript";
        j.charset = "UTF-8";
        j.src = "http://tjs.sjs.sinajs.cn/t3/miniblog/static/js/sso.js";
        j.onload = j.onreadystatechange = function () {
            if (!s && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                s = true;
                j.onload = j.onreadystatechange = null;
                setTimeout(doLogin, 1000)
            }
        };
        try {
            h.appendChild(j)
        } catch (e) {}
    }
};
Core.Events.fireEvent = function (oElement, sEvent) {
    oElement = $E(oElement);
    if ($IE) {
        oElement.fireEvent("on" + sEvent)
    } else {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(sEvent, true, true);
        oElement.dispatchEvent(evt)
    }
};
(function (proxy) {
    proxy.checkEml = function (eml) {
        if (!/^[\.\w]([(\/)(\-)(\+).\w])*@([(\-)\w]{1,64}\.){1,7}[(\-)\w]{1,64}$/.test(eml)) {
            return false
        } else {
            if (eml && eml != "" && (eml.indexOf("@") != -1)) {
                var indexOfA = eml.indexOf("@");
                var name = eml.substring(0, indexOfA);
                if (name.length > 64 || eml.length > 256) {
                    return false
                } else {
                    return true
                }
            }
        }
        return false
    };
    proxy.checkEmpty = function (str) {
        if (!str) {
            return false
        }
        if (!(str instanceof String)) {
            str = str.toString()
        }
        if ((Core.String.trim(str)).length) {
            return true
        } else {
            return false
        }
    };
    proxy.checkRealName = function (str) {
        if (new RegExp("^[\u4e00-\u9fa5]{2,6}$").test(str)) {
            return true
        } else {
            if (new RegExp("^[a-z]{2,20}$").test(str)) {
                return true
            } else {
                if (new RegExp("^[a-z\u4e00-\u9fa5]{2,6}$")) {
                    return true
                } else {
                    return false
                }
            }
        }
    };
    var checkBase = function (regStr) {
        return function (beRegStr) {
            if (new RegExp(regStr).test(beRegStr)) {
                return true
            } else {
                return false
            }
        }
    };
    proxy.checkQQNum = function (str) {
        if (new RegExp("^[1-9][0-9]{4,11}$").test(str)) {
            return true
        } else {
            if (proxy.checkEml(str)) {
                return true
            } else {
                return false
            }
        }
    };
    proxy.checkUCNum = function (str) {
        if (new RegExp("^[1-9][0-9]{4,9}$").test(str)) {
            return true
        } else {
            return false
        }
    };
    proxy.checkMobile = checkBase("^1(\\d{10})+$");
    proxy.checkTrName = checkBase("^[\u4e00-\u9fa5]{2,6}$");
    proxy.checkNickSp = checkBase("^[0-9a-zA-Z\u4e00-\u9fa5_]*$");
    proxy.checkNickSp2 = checkBase("^[0-9a-zA-Z\u4e00-\u9fa5_-]*$");
    proxy.checkTrueNm = checkBase("^[a-zA-Z·s.\u4e00-\u9fa5]*$");
    proxy.checkSkype1 = checkBase("^[0-9a-zA-Z](-|w){3}(-|w)*$");
    proxy.checkSkype2 = checkBase("[!#@%&/'\"$^*()+=[]{}?;:<>|~`\x80-\xff\\]");
    proxy.checkImgURI = checkBase("(.jpg|.gif|.png|.JPG|.GIF|.PNG)$");
    proxy.checkURL = checkBase("^http:\\/\\/([\\w-]+(\\.[\\w-]+)+(\\/[\\w-   .\\/\\?%@&+=\\u4e00-\\u9fa5]*)?)?$");
    proxy.checkURLoose = checkBase("^([^://])+\\:\\/\\/([^\\.]+)(\\.)(.+)([^\\.]+)$");
    proxy.checkMiniName = checkBase("^[a-zA-Z0-9\u4e00-\u9fa5\uff00-\uffff\u0800-\u4e00\u3130-\u318f\uac00-\ud7a3_]*$");
    proxy.checkIdCard = checkBase("^(([0-9]{15})|([0-9]{18})|([0-9]{17}(x|X)))$");
    proxy.checkSchool = function (str) {
        if (new RegExp("'|\"|<|>|[|]", "g").test(str)) {
            return false
        } else {
            return true
        }
    };
    proxy.checkCompany = function (str) {
        if (new RegExp("'|\"|<|>|[|]", "g").test(str)) {
            return false
        } else {
            return true
        }
    };
    proxy.checkMobileCheckCode = checkBase("^[0-9a-z]{6}$");
    proxy.checkSepicalSymbol = function (str) {
        if (new RegExp("[,|;|<|>]", "g").test(str)) {
            return true
        } else {
            return false
        }
    };
    proxy.checkPwdPower = function (pwd, minlen, maxlen) {
        var len_p = (pwd.length - minlen) / (maxlen - minlen);
        var complex_p = 0;
        if (/[A-Z]/g.test(pwd)) {
            complex_p += 0.273
        }
        if (/[a-z]/g.test(pwd)) {
            complex_p += 0.273
        }
        if (/[0-9]/g.test(pwd)) {
            complex_p += 0.114
        }
        if (/[^0-9a-zA-Z]/g.test(pwd)) {
            complex_p += 0.34
        }
        return len_p / 2 + complex_p / 2
    };
    proxy.checkPwdPowerNew = function (sPW) {
        function CharMode(iN) {
            if (iN >= 65 && iN <= 90) {
                return 2
            }
            if (iN >= 97 && iN <= 122) {
                return 4
            } else {
                return 1
            }
        }
        function bitTotal(num) {
            var modes = 0;
            for (i = 0; i < 3; i++) {
                if (num & 1) {
                    modes++
                }
                num >>>= 1
            }
            return modes
        }
        var Modes = 0;
        for (i = 0; i < sPW.length; i++) {
            Modes |= CharMode(sPW.charCodeAt(i))
        }
        var btotal = bitTotal(Modes);
        if (sPW.length >= 10) {
            btotal++
        }
        switch (btotal) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 3:
            return 3;
        default:
            return 1
        }
    }
})(App);
App.timer = new
function () {
    this.list = {};
    this.refNum = 0;
    this.clock = null;
    this.allpause = false;
    this.delay = 25;
    this.add = function (fun) {
        if (typeof fun != "function") {
            throw ("The timer needs add a function as a parameters")
        }
        var key = "" + (new Date()).getTime() + (Math.random()) * Math.pow(10, 17);
        this.list[key] = {
            fun: fun,
            pause: false
        };
        if (this.refNum <= 0) {
            this.start()
        }
        this.refNum++;
        return key
    };
    this.remove = function (key) {
        if (this.list[key]) {
            delete this.list[key];
            this.refNum--
        }
        if (this.refNum <= 0) {
            this.stop()
        }
    };
    this.pause = function (key) {
        if (this.list[key]) {
            this.list[key]["pause"] = true
        }
    };
    this.play = function (key) {
        if (this.list[key]) {
            this.list[key]["pause"] = false
        }
    };
    this.stop = function () {
        clearInterval(this.clock);
        this.clock = null
    };
    this.start = function () {
        var _this = this;
        this.clock = setInterval(function () {
            _this.loop.apply(_this)
        }, this.delay)
    };
    this.loop = function () {
        for (var k in this.list) {
            if (!this.list[k]["pause"]) {
                this.list[k]["fun"]()
            }
        }
    }
};
App.animation = {
    vibrate: function (d, v, m, k, s, u) {
        var T = 2 * Math.PI * Math.sqrt(m / k);
        var A = v * Math.sqrt(m / k);
        var n = Math.ceil(T * 100 / d);
        var c = 0;
        var orbit = [];
        while (A > s) {
            orbit.push(A * Math.sin((c / n) * 2 * Math.PI));
            c++;
            c = c % n;
            A = A - u
        }
        return orbit
    },
    accelerate: function (d, h, g, v) {
        var orbit = [];
        var l = 0;
        while (true) {
            var v1 = v;
            v = v1 + d * g / 10;
            l = l + d * (v + v1) / 20;
            if (l < h) {
                orbit.push(l)
            } else {
                break
            }
        }
        return orbit
    },
    curtain: function (d, h, p) {
        var orbit = [h];
        var l = h;
        while (l > 1) {
            l = l * p;
            orbit.unshift(l)
        }
        return orbit
    },
    speed: function (d, h, v) {
        var t = Math.ceil(h / v);
        var n = Math.ceil(t * 100 / d);
        var orbit = [];
        for (var i = 0; i < n; i++) {
            orbit.push((i + 1) * h / n)
        }
        return orbit
    },
    circle: function (d, l, v) {
        var t = 2 * Math.PI * l / v;
        var n = Math.ceil(t * 100 / d);
        var orbit = [];
        for (var i = 0; i < n; i++) {
            orbit.push({
                x: l * Math.sin(((i + 1) / n) * 2 * Math.PI),
                y: l * Math.cos(((i + 1) / n) * 2 * Math.PI)
            })
        }
        return orbit
    },
    taccelerate: function (d, h, t) {
        var n = Math.ceil(t * 100 / d);
        var orbit = [];
        for (var i = 0; i < n; i++) {
            orbit.push(Math.pow((i + 1) / n, 2) * h)
        }
        return orbit
    }
};
(function (proxy) {
    var movingKey = false;
    var g = 10;
    var m = 20;
    var k = 10;
    var s = 0;
    var u = 0;
    var l = 0;
    var v = 0;
    var p = 0.4;
    proxy.curtain = {
        droop: function (element, callBack, isHorizontal) {
            if (movingKey) {
                return false
            }
            movingKey = true;
            var elementOverflow = element.style.overflow;
            element.style.visibility = "hidden";
            element.style.display = "block";
            element.style.overflow = "hidden";
            var h = parseInt(element.offsetHeight);
            var dropOrbit = proxy.animation.curtain(proxy.timer.delay, h, p);
            var current = 0;
            var tk = proxy.timer.add(function () {
                if (current >= dropOrbit.length) {
                    proxy.timer.remove(tk);
                    element.style.height = h + "px";
                    element.style.overflow = elementOverflow;
                    movingKey = false;
                    if (typeof callBack == "function") {
                        callBack()
                    }
                    return false
                }
                element.style.height = dropOrbit[current] + "px";
                element.scrollTop = (h - dropOrbit[current]);
                current++
            });
            element.style.height = "0px";
            element.style.visibility = "visible";
            return true
        },
        raise: function (element, isHorizontal) {
            if (movingKey) {
                return false
            }
            movingKey = true;
            var elementOverflow = element.style.overflow;
            element.style.overflow = "hidden";
            var h = parseInt(element.offsetHeight);
            var orbit = [];
            if (u !== 0) {
                var lis = proxy.animation.speed(proxy.timer.delay, h * l, g / l);
                for (var i = 0, len = lis.length; i < len; i++) {
                    orbit.push(h + lis[i])
                }
            }
            var li2 = proxy.animation.speed(proxy.timer.delay, h * (1 + l), g * 10);
            for (var i = 0, len = li2.length; i < len; i++) {
                orbit.push(li2[len - i - 1])
            }
            var current = 0;
            var tk = proxy.timer.add(function () {
                if (current >= orbit.length) {
                    proxy.timer.remove(tk);
                    element.style.display = "none";
                    element.style.height = h + "px";
                    element.style.overflow = elementOverflow;
                    movingKey = false;
                    return false
                }
                element.style.height = orbit[current] + "px";
                element.scrollTop = (h - orbit[current]);
                current++
            })
        },
        setting: function (config) {
            g = config.g || g;
            m = config.m || m;
            k = config.k || k;
            s = config.s || s;
            u = config.u || u;
            l = config.l || l
        }
    }
})(App);
App.promptTip = function (msgCode, replace, id, type) {
    var icon = {
        ask: 4,
        wrong: 1,
        error: 2,
        ok: 3
    };
    type = type ? type : "ok";
    var promptText = (typeof msgCode == "object") ? App.getMsg(msgCode, replace) : msgCode;
    var str = '		<div class="PY_clew">	            <div class="PY_clewcon">	                <div class="icon"><img align="absmiddle" class="PY_ib PY_ib_' + icon[type] + '" src="' + scope.$BASEIMG + 'style/images/common/PY_ib.gif" alt="" title=""/></div>	                <div class="txt bold">	                    ' + promptText + '	                </div>	                <div class="clear"></div>	            </div>	    </div>';
    var errId = $E(id ? id : "system_information");
    errId.innerHTML = str;
    errId.style.display = "";
    App.curtain.droop(errId);
    window.scrollTo(0, 0);
    App.promptTip.close = (function (allreadyId) {
        return function () {
            if (allreadyId) {
                App.curtain.raise(allreadyId)
            }
        }
    })(errId);
    setTimeout(function () {
        App.promptTip.close()
    }, 2000)
};
(function (proxy) {
    var _addEvent = Core.Events.addEvent;
    var _trim = Core.String.trim;
    proxy.checkForm = function (UIfunction) {
        var that = {};
        var list = {};
        that.add = function (key, affect, error, check, evType) {
            list[key] = proxy.checkItem(key, affect, error, UIfunction, check, evType)
        };
        that.check = function (kList) {
            var ret = true;
            if (kList) {
                for (var i = 0, len = kList.length; i < len; i += 1) {
                    if (list[kList[i]]) {
                        if (!list[kList[i]].check()) {
                            list[kList[i]].changeUI(false);
                            ret = false
                        }
                    }
                }
            } else {
                for (var k in list) {
                    if (!list[k].check()) {
                        list[k].changeUI(false);
                        ret = false
                    }
                }
            }
            return ret
        };
        that.toggleError = function (keys, errType) {
            for (var i = 0, len = keys.length; i < len; i += 1) {
                if (list[keys[i]]) {
                    list[keys[i]].changeUI(errType);
                    return true
                }
            }
            return false
        };
        that.showError = function (keys) {
            return this.toggleError(keys, false)
        };
        that.hideError = function (keys) {
            this.toggleError(keys, true)
        };
        return that
    };
    proxy.checkItem = function (key, affect, error, UIfunction, check, evType) {
        var that = {};
        if (evType === undefined) {
            if (affect.type === "text" || affect.type === "password" || affect.tagName === "TEXTAREA") {
                evType = "blur"
            } else {
                if (affect.tagName === "SELECT") {
                    evType = "change"
                } else {
                    evType = "click"
                }
            }
        }
        if (check === undefined) {
            check = function (el) {
                if (_trim(el.value) === "") {
                    return false
                } else {
                    return true
                }
            }
        }
        that.changeUI = function (noError) {
            UIfunction(key, noError, affect, error)
        };
        that.check = function () {
            var noError = check(affect);
            UIfunction(key, noError, affect, error);
            return noError
        };
        that.getAttr = function () {};
        if (affect.tagName !== "SELECT" && affect.length) {
            for (var i = 0, len = affect.length; i < len; i += 1) {
                _addEvent(affect[i], function () {
                    that.check()
                }, evType)
            }
        } else {
            _addEvent(affect, function () {
                that.check()
            }, evType)
        }
        return that
    }
})(App);
Core.Array.findit = function (arr, v) {
    var k = -1;
    Core.Array.foreach(arr, function (value, index) {
        if (v == value) {
            k = index
        }
    });
    return k
};
Core.Array.uniq = function (ar) {
    var result = [];
    for (var i = 0; i < ar.length; i++) {
        var x = ar[i];
        if (Core.Array.findit(result, x) == -1) {
            result.push(x)
        }
    }
    return result
};
App.nameValue = function (item, isClear) {
    var _name = item.getAttribute("name");
    var _type = item.getAttribute("type");
    var _el = item.tagName;
    var _value = {
        name: _name,
        value: ""
    };
    var _setVl = function (vl) {
        if (vl === false) {
            _value = false;
            return false
        }
        if (!_value.value) {
            _value.value = Core.String.trim(vl || "")
        } else {
            _value.value = [Core.String.trim(vl || "")].concat(_value.value)
        }
    };
    if (!item.disabled && _name) {
        switch (_el) {
        case "INPUT":
            if (_type == "radio" || _type == "checkbox") {
                if (item.checked) {
                    _setVl(item.value)
                } else {
                    _setVl(false)
                }
            } else {
                if (_type == "reset" || _type == "submit" || _type == "image") {
                    _setVl(false)
                } else {
                    _setVl(isClear ? (item.value || false) : item.value)
                }
            }
            break;
        case "SELECT":
            if (item.multiple) {
                var _ops = item.options;
                for (var i = 0, len = _ops.length; i < len; i++) {
                    if (_ops[i].selected) {
                        _setVl(_ops[i].value)
                    }
                }
            } else {
                _setVl(item.value)
            }
            break;
        case "TEXTAREA":
            _setVl(isClear ? (item.value || item.getAttribute("value") || false) : (item.value || item.getAttribute("value")));
            break;
        case "BUTTON":
        default:
            _setVl(item.value || item.getAttribute("value") || item.innerHTML || false)
        }
    } else {
        _setVl(false)
    }
    return _value
};
App.htmlToJson = function (mainBox, tagNameList, isClear) {
    var _retObj = {};
    tagNameList = Core.Array.uniq(tagNameList || ["INPUT", "TEXTAREA", "BUTTON", "SELECT"]);
    if (!mainBox || !tagNameList) {
        return false
    }
    var _opInput = App.nameValue;
    for (var i = 0, len = tagNameList.length; i < len; i++) {
        var _tags = mainBox.getElementsByTagName(tagNameList[i]);
        for (var j = 0, lenTag = _tags.length; j < lenTag; j++) {
            var _info = _opInput(_tags[j], isClear);
            if (!_info) {
                continue
            }
            if (_retObj[_info.name]) {
                if (_retObj[_info.name] instanceof Array) {
                    _retObj[_info.name] = _retObj[_info.name].concat(_info.value)
                } else {
                    _retObj[_info.name] = [_retObj[_info.name]].concat(_info.value)
                }
            } else {
                _retObj[_info.name] = _info.value
            }
        }
    }
    return _retObj
};
App.jsonToQuery = function (JSON, isEncode) {
    var _Qstring = [];
    var _fdata = function (data) {
        data = Core.String.trim(data.toString());
        if (isEncode) {
            return encodeURIComponent(data)
        } else {
            return data
        }
    };
    if (typeof JSON == "object") {
        for (var k in JSON) {
            if (JSON[k] instanceof Array) {
                for (var i = 0, len = JSON[k].length; i < len; i++) {
                    _Qstring.push(k + "=" + _fdata(JSON[k][i]))
                }
            } else {
                _Qstring.push(k + "=" + _fdata(JSON[k]))
            }
        }
    }
    if (_Qstring.length) {
        return _Qstring.join("&")
    } else {
        return ""
    }
};
(function (proxy) {
    proxy.includeJson = function (json1, json2) {
        for (var k in json1) {
            if (typeof json1[k] == Object) {
                if (json1[k] instanceof Array) {
                    if (json2[k] === undefined || json2[k].join("|") != json1[k].join("|")) {
                        return false
                    }
                } else {
                    if (typeof json2[k] == Object) {
                        return argument.callee(json1[k], json2[k])
                    } else {
                        return false
                    }
                }
            } else {
                if (json2[k] === undefined || json2[k] != json1[k]) {
                    return false
                }
            }
        }
        return true
    };
    proxy.compareJson = function (json1, json2) {
        if (proxy.includeJson(json1, json2) && proxy.includeJson(json2, json1)) {
            return true
        } else {
            return false
        }
    }
})(App);
App.setPassword = function (id, tid) {
    var _password_input = $E(id);
    var _password_input_text = $E(tid);
    if (_password_input) {
        if (_password_input.value == "") {
            _password_input.style.display = "none";
            _password_input_text.style.display = "";
            _password_input_text.value = $SYSMSG.M00902
        }
    }
    Core.Events.addEvent(_password_input_text, function () {
        _password_input_text.style.display = "none";
        _password_input.style.display = "";
        _password_input.focus();
        return false
    }, "focus");
    Core.Events.addEvent(_password_input, function () {
        if (_password_input.value == "") {
            if (_password_input.tagName == "INPUT" && (_password_input.type == "password" || _password_input.getAttribute("type") == "password")) {
                _password_input.style.display = "none";
                _password_input_text.value = $SYSMSG.M00902;
                _password_input_text.style.display = "";
                Core.Events.fireEvent(_password_input_text, "blur")
            }
        }
        return false
    }, "blur");
    return false
};
(function (proxy) {
    var Builder = function (domJson, box) {
        this.box = null;
        this.domList = {};
        this.actList = {};
        if (box) {
            this.box = box
        } else {
            this.box = document.createElement("DIV")
        }
        if (domJson) {
            this.makeTree(this.box, domJson)
        }
    };
    (function (_p) {
        _p.init = function () {};
        _p.disp = function () {};
        _p.NODEMAP = {
            AREA: "MAP",
            CAPTION: "TABLE",
            COL: "TABLE|COLGROUP",
            COLGROUP: "TABLE",
            LEGEND: "FIELDSET",
            OPTGROUP: "SELECT",
            OPTION: "SELECT",
            PARAM: "OBJECT",
            TBODY: "TABLE",
            TD: "TR",
            TFOOT: "TABLE",
            TH: "TABLE|TR",
            THEAD: "TABLE",
            TR: "TBODY|THEAD|TH|TFOOT"
        };
        _p.create = function (tagName, attributes) {
            var dom = null;
            tagName = tagName.toUpperCase();
            if (tagName == "TEXT") {
                dom = document.createTextNode(attributes)
            } else {
                dom = document.createElement(tagName)
            }
            if (typeof attributes == "object") {
                for (var k in attributes) {
                    switch (k) {
                    case "class":
                        dom.className = attributes[k];
                        break;
                    case "id":
                        this.domList[attributes[k]] = dom;
                        break;
                    case "action":
                        if (this.actList[attributes[k]]) {
                            this.actList[attributes[k]] = [dom].concat(this.actList[attributes[k]])
                        } else {
                            this.actList[attributes[k]] = dom
                        }
                        break;
                    case "style":
                        dom.style.cssText = attributes[k];
                        break;
                    case "innerHTML":
                        dom.innerHTML = attributes[k];
                        break;
                    case "nodeValue":
                        dom.nodeValue = attributes[k];
                        break;
                    default:
                        dom.setAttribute(k, attributes[k])
                    }
                }
            }
            return dom
        };
        _p.check = function (parent, childObj) {
            var tnames = this.NODEMAP[childObj.tagName];
            if (this.NODEMAP[childObj.tagName]) {
                var pList = tnames.split("|");
                for (var i = 0, len = pList.length; i < len; i++) {
                    if (parent.tagName == pList[i]) {
                        return true
                    }
                }
                return false
            }
            return true
        };
        _p.append = function (parent, childObj) {
            childObj.tagName = childObj.tagName.toLocaleUpperCase();
            if (!this.check(parent, childObj)) {
                return false
            }
            var returnDom = this.create(childObj.tagName, childObj.attributes);
            parent.appendChild(returnDom);
            return returnDom
        };
        _p.makeTree = function (parent, objList) {
            for (var i = 0, len = objList.length; i < len; i++) {
                var Leaves = this.append(parent, objList[i]);
                if (!Leaves) {
                    alert("tree wrong!!!");
                    return false
                }
                if (objList[i].childList && objList[i].childList.length) {
                    this.makeTree(Leaves, objList[i].childList)
                }
            }
        }
    })(Builder.prototype);
    proxy.Builder = Builder;
    proxy.domBuilder = new Builder()
})(App);
(function (proxy) {
    var common = [{
        tagName: "SPAN",
        attributes: {
            "class": "zhuolu_isnote",
            id: "box",
            style: "width: 170px; position: absolute; z-index: 251; top: 73px; left: 320px;"
        }
    }];
    var tips = new App.Builder(common);
    tips.box = tips.domList.box;
    tips.box.style.display = "none";
    tips.box.style.position = "absolute";
    tips.box.style.zIndex = 1251;
    var succHTML = '<span class="iswhat isok"><img class="tipicon tip3" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" alt="" title=""></span>';
    var errorHTML = '<span class="iswhat iserro"><img class="tipicon tip2" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" alt="" title="" /><em>${error}</em></span>';
    proxy.checkFormUI4 = function (key, noError, affect, errorPos) {
        if (affect.errorKey && affect.errorKey !== key && noError) {
            return false
        } else {
            try {
                if (noError) {
                    affect.errorKey = false;
                    errorPos.style.display = "";
                    errorPos.innerHTML = succHTML;
                    if (affect.value !== undefined && (!affect.value.length || affect.noRightIcon)) {
                        errorPos.style.display = "none";
                        return false
                    }
                } else {
                    affect.errorKey = key;
                    errorPos.style.display = "";
                    errorPos.innerHTML = errorHTML.replace("${error}", $SYSMSG[key])
                }
            } catch (exp) {}
        }
    };
    proxy.bindFormTips4 = function (els) {
        document.body.appendChild(tips.box);
        for (var i = 0, len = els.length; i < len; i += 1) {
            (function (k) {
                Core.Events.addEvent(els[k]["el"], function () {
                    var posEl = els[k]["el"].parentNode;
                    var pos = Core.Dom.getXY(posEl);
                    if (!els[k]["el"].value.length && els[k]["key"] && $SYSMSG[els[k]["key"]]) {
                        tips.domList.box.innerHTML = "<em>" + $SYSMSG[els[k]["key"]] + "</em>";
                        tips.box.style.top = (pos[1] + 10) + "px";
                        var posLeft = parseInt(posEl.getAttribute("positionLeft")) || ($IE ? 7 : 9);
                        if (posLeft) {
                            tips.box.style.left = pos[0] + posEl.offsetWidth + posLeft + "px"
                        } else {
                            tips.box.style.left = pos[0] + posEl.offsetWidth + "px"
                        }
                        tips.box.style.display = "";
                        if (els[k]["errorPos"]) {
                            els[k]["errorPos"].style.display = "none"
                        }
                    }
                }, "focus");
                Core.Events.addEvent(els[k]["el"], function () {
                    tips.box.style.display = "none"
                }, "blur")
            })(i)
        }
    }
})(App);
App.TextareaUtils = (function () {
    var it = {},
        ds = document.selection;
    it.selectionStart = function (oElement) {
        if (!ds) {
            return oElement.selectionStart
        }
        var er = ds.createRange(),
            value, len, s = 0;
        var er1 = document.body.createTextRange();
        er1.moveToElementText(oElement);
        for (s; er1.compareEndPoints("StartToStart", er) < 0; s++) {
            er1.moveStart("character", 1)
        }
        return s
    };
    it.selectionBefore = function (oElement) {
        return oElement.value.slice(0, it.selectionStart(oElement))
    };
    it.selectText = function (oElement, nStart, nEnd) {
        oElement.focus();
        if (!ds) {
            oElement.setSelectionRange(nStart, nEnd);
            return
        }
        var c = oElement.createTextRange();
        c.collapse(1);
        c.moveStart("character", nStart);
        c.moveEnd("character", nEnd - nStart);
        c.select()
    };
    it.insertText = function (oElement, sInsertText, nStart, nLen) {
        oElement.focus();
        nLen = nLen || 0;
        if (!ds) {
            var text = oElement.value,
                start = nStart - nLen,
                end = start + sInsertText.length;
            oElement.value = text.slice(0, start) + sInsertText + text.slice(nStart, text.length);
            it.selectText(oElement, end, end);
            return
        }
        var c = ds.createRange();
        c.moveStart("character", -nLen);
        c.text = sInsertText
    };
    it.getCursorPos = function (obj) {
        var CaretPos = 0;
        if ($IE) {
            obj.focus();
            var range = null;
            range = ds.createRange();
            var stored_range = range.duplicate();
            stored_range.moveToElementText(obj);
            stored_range.setEndPoint("EndToEnd", range);
            obj.selectionStart = stored_range.text.length - range.text.length;
            obj.selectionEnd = obj.selectionStart + range.text.length;
            CaretPos = obj.selectionStart
        } else {
            if (obj.selectionStart || obj.selectionStart == "0") {
                CaretPos = obj.selectionStart
            }
        }
        return CaretPos
    };
    it.getSelectedText = function (obj) {
        var selectedText = "";
        var getSelection = function (e) {
            if (e.selectionStart != undefined && e.selectionEnd != undefined) {
                return e.value.substring(e.selectionStart, e.selectionEnd)
            } else {
                return ""
            }
        };
        if (window.getSelection) {
            selectedText = getSelection(obj)
        } else {
            selectedText = ds.createRange().text
        }
        return selectedText
    };
    it.setCursor = function (obj, pos, coverlen) {
        pos = pos == null ? obj.value.length : pos;
        coverlen = coverlen == null ? 0 : coverlen;
        obj.focus();
        if (obj.createTextRange) {
            var range = obj.createTextRange();
            range.move("character", pos);
            range.moveEnd("character", coverlen);
            range.select()
        } else {
            obj.setSelectionRange(pos, pos + coverlen)
        }
    };
    it.unCoverInsertText = function (obj, str, pars) {
        pars = (pars == null) ? {} : pars;
        pars.rcs = pars.rcs == null ? obj.value.length : pars.rcs * 1;
        pars.rccl = pars.rccl == null ? 0 : pars.rccl * 1;
        var text = obj.value,
            fstr = text.slice(0, pars.rcs),
            lstr = text.slice(pars.rcs + pars.rccl, text == "" ? 0 : text.length);
        obj.value = fstr + str + lstr;
        this.setCursor(obj, pars.rcs + (str == null ? 0 : str.length))
    };
    return it
})();
(function () {
    var parseParam = function (oSource, oParams) {
        var key;
        try {
            if (typeof oParams != "undefined") {
                for (key in oSource) {
                    if (oParams[key] != null) {
                        oSource[key] = oParams[key]
                    }
                }
            }
        } finally {
            key = null;
            return oSource
        }
    };
    Core.Base.parseParam = parseParam
})();
Utils.Io.JsLoad = {};
(function () {
    function createScripts(oOpts, oCFG) {
        processUrl(oOpts, oCFG);
        var urls = oOpts.urls;
        var i, len = urls.length;
        for (i = 0; i < len; i++) {
            var js = $C("script");
            js.src = urls[i].url;
            js.charset = urls[i].charset;
            js[Core.Base.detect.$IE ? "onreadystatechange" : "onload"] = function () {
                if (Core.Base.detect.$MOZ || this.readyState.toLowerCase() == "complete" || this.readyState.toLowerCase() == "loaded") {
                    oCFG.script_loaded_num++
                }
            };
            document.getElementsByTagName("head")[0].appendChild(js)
        }
    }
    function processUrl(oOpts, oCFG) {
        var urls = oOpts.urls;
        var get_hash = oOpts.GET;
        var i, len = urls.length;
        var key, url_cls, varname, rnd;
        for (i = 0; i < len; i++) {
            rnd = parseInt(Math.random() * 100000000);
            url_cls = new Utils.Url(urls[i].url);
            for (key in get_hash) {
                if (oOpts.noencode == true) {
                    url_cls.setParam(key, get_hash[key])
                } else {
                    url_cls.setParam(key, Core.String.encodeDoubleByte(get_hash[key]))
                }
            }
            varname = url_cls.getParam("varname") || "requestId_" + rnd;
            if (oOpts.noreturn != true) {
                url_cls.setParam("varname", varname)
            }
            oCFG.script_var_arr.push(varname);
            urls[i].url = url_cls.toString();
            urls[i].charset = urls[i].charset || oOpts.charset
        }
    }
    function ancestor(aUrls, oOpts) {
        var _opts = {
            urls: [],
            charset: "utf-8",
            noreturn: false,
            noencode: true,
            timeout: -1,
            POST: {},
            GET: {},
            onComplete: null,
            onException: null
        };
        var _cfg = {
            script_loaded_num: 0,
            is_timeout: false,
            is_loadcomplete: false,
            script_var_arr: []
        };
        _opts.urls = typeof aUrls == "string" ? [{
            url: aUrls
        }] : aUrls;
        Core.Base.parseParam(_opts, oOpts);
        createScripts(_opts, _cfg);
        (function () {
            if (_opts.noreturn == true && _opts.onComplete == null) {
                return
            }
            var i, data = [];
            if (_cfg.script_loaded_num == _opts.urls.length) {
                _cfg.is_loadcomplete = true;
                if (_opts.onComplete != null) {
                    for (i = 0; i < _cfg.script_var_arr.length; i++) {
                        data.push(window[_cfg.script_var_arr[i]])
                    }
                    if (_cfg.script_var_arr.length < 2) {
                        _opts.onComplete(data[0])
                    } else {
                        _opts.onComplete(data)
                    }
                }
                return
            }
            if (_cfg.is_timeout == true) {
                return
            }
            setTimeout(arguments.callee, 50)
        })();
        if (_opts.timeout > 0) {
            setTimeout(function () {
                if (_cfg.is_loadcomplete != true) {
                    if (_opts.onException != null) {
                        _opts.onException()
                    }
                    _cfg.is_timeout = true
                }
            }, _opts.timeout)
        }
    }
    Utils.Io.JsLoad.request = function (aUrls, oOpts) {
        new ancestor(aUrls, oOpts)
    }
})();
(function () {
    var defaultLanguage = scope.$lang;
    var currentLanguage = scope.$lang;
    var currentFunction;
    var currentAPI;
    var changeFlag = false;
    App.changeLanguage = function (sLangType, cb) {
        if (currentLanguage == sLangType) {
            return false
        }
        currentLanguage = sLangType;
        var langUrl;
        if (!scope.$devMode) {
            langUrl = scope.$BASEJS + "bind/pack.php?pro=" + $CONFIG.$product + "&page=conf/lang_" + sLangType + ".dev.js"
        } else {
            langUrl = scope.$BASEJS + $CONFIG.$product + "/js/lang_" + sLangType + ".js" + Boot.getJsVersion()
        }
        Utils.Io.JsLoad.request(langUrl, {
            onComplete: function () {
                if (cb) {
                    cb();
                    return false
                }
                if (scope.forbidrefreshD) {
                    changeFlag = true;
                    scope.forbidrefreshD.close()
                }
                changeFlag = false;
                setTimeout(function () {
                    currentFunction && currentAPI && App.forbidrefresh(currentFunction, currentAPI)
                }, 10)
            },
            onException: function () {
                changeFlag = false
            },
            timeout: 30000
        })
    };
    var wrapA = function (text, lang) {
        var returns = ['<a href="javascript:;" onClick="App.changeLanguage(\'' + lang + "');return false;\">", text, "</a>"];
        if (lang == currentLanguage) {
            returns[0] = returns[2] = ""
        }
        return returns.join("")
    };
    App.forbidrefresh = function (_func, _url) {
        currentFunction = _func;
        currentAPI = _url;
        if (!scope.forbidrefreshD) {
            var _html = '<div class="auth_code">						<div class="auth_img"><img id="door2img" width="450" height="50" /><div style="text-align:right;padding:3px 0 0 0"><a id="changeyzm" href="javascript:void(0);" onclick="App.refreshCheckCode2();return false;">' + $CLTMSG.CC2103 + '</a></div></div>						<p class="tips">' + $CLTMSG.CC2104 + '</p>						<div class="code_input" id="yzm_input_div"><input id="yzm_input" type="text" value="" /></div>						<p id="yzm_error" class="errorTs error_color" style="display:none;">' + $CLTMSG.CC3301 + '</p>						<p class="btn"><a class="btn_normal" href="javascript:void(0);" id="auth_submit"><em>' + $CLTMSG.CC2105 + '</em></a> <a class="btn_normal" href="javascript:void(0);" id="door2Cancel"><em>' + $CLTMSG.CL0603 + '</em></a></p>			<div class="change_lan">' + wrapA("中文简体", "zh") + '<em class="line">|</em>' + wrapA("中文繁體", "zh-tw") + '<!--<em class="line">|</em>' + wrapA("English", "en") + "--></div>			</div>";
            scope.forbidrefreshD = new App.Dialog.BasicDialog($SYSMSG.MR0050, _html, {
                zIndex: 1200,
                hidden: true,
                hiddClose: false,
                width: 510
            });
            scope.forbidrefreshD.onClose = function () {
                scope.forbidrefreshD = null;
                if (!changeFlag && defaultLanguage) {
                    App.changeLanguage(defaultLanguage, function () {})
                }
            };
            var _addEvent = Core.Events.addEvent;
            var _trim = Core.String.trim;
            var _fireEvent = Core.Events.fireEvent;
            var elements = {
                img_yzm2: $E("door2img"),
                btn_chgyzm: $E("changeyzm"),
                input_yzm: $E("yzm_input"),
                errinfo_yzm: $E("yzm_error"),
                submit: $E("auth_submit"),
                door2Cancel: $E("door2Cancel"),
                yzm_input_div: $E("yzm_input_div"),
                cb: function (data) {
                    scope.forbidrefreshD.close();
                    scope.forbidrefreshD = null;
                    scope.doorretcode = data || "";
                    _func()
                },
                ecb: function (json) {
                    if (json.code != "R01409") {
                        scope.forbidrefreshD.close();
                        scope.forbidrefreshD = null
                    } else {
                        App.refreshCheckCode2();
                        elements.errinfo_yzm.style.display = "";
                        elements.errinfo_yzm.innerHTML = $CLTMSG.CC3301
                    }
                },
                url: _url || "/attention/aj_addfollow.php"
            };
            elements.errinfo_yzm.style.display = "none";
            var _submit = function () {
                elements.door = encodeURIComponent(_trim(elements.input_yzm.value)) || _trim(elements.input_yzm.value);
                App.doRequest({
                    door: elements.door
                }, elements.url, elements.cb ||
                function () {}, elements.ecb ||
                function () {})
            };
            _addEvent(elements.submit, function () {
                if (_trim(elements.input_yzm.value) == "") {
                    elements.errinfo_yzm.style.display = "";
                    elements.errinfo_yzm.innerHTML = $SYSMSG.MR0050;
                    return false
                }
                _submit();
                return false
            }, "click");
            _addEvent(elements.door2Cancel, function () {
                scope.forbidrefreshD.close();
                return false
            }, "click");
            _addEvent(elements.input_yzm, function () {
                elements.errinfo_yzm.style.display = "none"
            }, "focus");
            App.enterSubmit({
                parent: elements.yzm_input_div,
                action: function () {
                    _fireEvent(elements.submit, "click")
                }
            })
        }
        App.refreshCheckCode2();
        if ($E("yzm_error")) {
            $E("yzm_error").style.display = "none"
        }
        if ($E("yzm_input")) {
            $E("yzm_input").value = ""
        }
        scope.forbidrefreshD.show()
    };
    App.refreshCheckCode2 = function () {
        setTimeout(function () {
            if ($E("door2img")) {
                var imgsrc = "pin1.php";
                if (scope.$pageid == "registermail") {
                    imgsrc = "pin.php"
                }
                $E("door2img").src = "/pincode/" + imgsrc + "?lang=" + currentLanguage + "&r=" + ((new Date()).getTime()) + "&rule";
                $E("door2img").style.display = ""
            }
        }, 100)
    }
})();
(function () {
    var _ua = navigator.userAgent.toLowerCase();
    var $IE = /msie/.test(_ua);
    var $moz = /gecko/.test(_ua);
    var $Safari = /safari/.test(_ua);

    function $E(id) {
        return typeof(id) == "string" ? _viewWindow.document.getElementById(id) : id
    }
    var getScrollPos = function (oDocument) {
        oDocument = oDocument || document;
        return [Math.max(oDocument.documentElement.scrollTop, oDocument.body.scrollTop), Math.max(oDocument.documentElement.scrollLeft, oDocument.body.scrollLeft), Math.max(oDocument.documentElement.scrollWidth, oDocument.body.scrollWidth), Math.max(oDocument.documentElement.scrollHeight, oDocument.body.scrollHeight)]
    };
    var getStyle = function (el, property) {
        switch (property) {
        case "opacity":
            var val = 100;
            try {
                val = el.filters["DXImageTransform.Microsoft.Alpha"].opacity
            } catch (e) {
                try {
                    val = el.filters("alpha").opacity
                } catch (e) {}
            }
            return val;
        case "float":
            property = "styleFloat";
        default:
            var value = el.currentStyle ? el.currentStyle[property] : null;
            return (el.style[property] || value)
        }
    };
    if ($moz) {
        getStyle = function (el, property) {
            if (property == "float") {
                property = "cssFloat"
            }
            try {
                var computed = document.defaultView.getComputedStyle(el, "")
            } catch (e) {
                traceError(e)
            }
            return el.style[property] || computed ? computed[property] : null
        }
    }
    var getXY = function (el) {
        if ((el.parentNode == null || el.offsetParent == null || getStyle(el, "display") == "none") && el != document.body) {
            return false
        }
        var parentNode = null;
        var pos = [];
        var box;
        var doc = el.ownerDocument;
        box = el.getBoundingClientRect();
        var scrollPos = getScrollPos(el.ownerDocument);
        return [box.left + scrollPos[1], box.top + scrollPos[0]];
        parentNode = el.parentNode;
        while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
            if (getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) {
                pos[0] -= parentNode.scrollLeft;
                pos[1] -= parentNode.scrollTop
            }
            parentNode = parentNode.parentNode
        }
        return pos
    };
    if ($moz) {
        getXY = function (el) {
            if ((el.parentNode == null || el.offsetParent == null || getStyle(el, "display") == "none") && el != document.body) {
                return false
            }
            var parentNode = null;
            var pos = [];
            var box;
            var doc = el.ownerDocument;
            pos = [el.offsetLeft, el.offsetTop];
            parentNode = el.offsetParent;
            var hasAbs = getStyle(el, "position") == "absolute";
            if (parentNode != el) {
                while (parentNode) {
                    pos[0] += parentNode.offsetLeft;
                    pos[1] += parentNode.offsetTop;
                    if ($Safari && !hasAbs && getStyle(parentNode, "position") == "absolute") {
                        hasAbs = true
                    }
                    parentNode = parentNode.offsetParent
                }
            }
            if ($Safari && hasAbs) {
                pos[0] -= el.ownerDocument.body.offsetLeft;
                pos[1] -= el.ownerDocument.body.offsetTop
            }
            parentNode = el.parentNode;
            while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
                if (getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) {
                    pos[0] -= parentNode.scrollLeft;
                    pos[1] -= parentNode.scrollTop
                }
                parentNode = parentNode.parentNode
            }
            return pos
        }
    }
    var getEvent = function () {
        return window.event
    };
    if ($moz) {
        getEvent = function () {
            var o = arguments.callee.caller;
            var e;
            var n = 0;
            while (o != null && n < 40) {
                e = o.arguments[0];
                if (e && (e.constructor == Event || e.constructor == MouseEvent)) {
                    return e
                }
                n++;
                o = o.caller
            }
            return e
        }
    }
    var stopEvent = function () {
        var ev = getEvent();
        ev.cancelBubble = true;
        ev.returnValue = false
    };
    if ($moz) {
        stopEvent = function () {
            var ev = getEvent();
            ev.preventDefault();
            ev.stopPropagation()
        }
    }
    Function.prototype.bind3 = function (object, args) {
        args = args == null ? [] : args;
        var __method = this;
        return function () {
            __method.apply(object, args)
        }
    };

    function addEvent2(elm, func, evType, useCapture) {
        var elm = $E(elm);
        if (typeof useCapture == "undefined") {
            useCapture = false
        }
        if (typeof evType == "undefined") {
            evType = "click"
        }
        if (elm.addEventListener) {
            elm.addEventListener(evType, func, useCapture);
            return true
        } else {
            if (elm.attachEvent) {
                var r = elm.attachEvent("on" + evType, func);
                return true
            } else {
                elm["on" + evType] = func
            }
        }
    }
    var _inputNode;
    var _rndID = parseInt(Math.random() * 100);
    var _showMenuItems = [];
    var _selectMenuIndex = -1;
    var _selectMenuText = "";
    var _viewWindow = window;
    var passcardOBJ = {
        overfcolor: "#999",
        overbgcolor: "#e8f4fc",
        outfcolor: "#000000",
        outbgcolor: "",
        menuStatus: {
            "sina.cn": true,
            "sina.com": true,
            "vip.sina.com": true,
            "163.com": true,
            "qq.com": true,
            "126.com": true,
            "hotmail.com": true,
            "gmail.com": true,
            "sohu.com": true
        }
    };
    passcardOBJ.createNode = function () {
        var d = _viewWindow.document;
        var div = d.createElement("div");
        div.innerHTML = '<ul class="passCard" id="sinaNote" style="display:none;"></ul>';
        d.body.appendChild(div)
    };
    passcardOBJ.arrowKey = function (keyCodeNum) {
        if (keyCodeNum == 38) {
            if (_selectMenuIndex <= 0) {
                _selectMenuIndex = _showMenuItems.length
            }
            _selectMenuIndex--;
            passcardOBJ.selectLi(_selectMenuIndex)
        }
        if (keyCodeNum == 40) {
            if (_selectMenuIndex >= _showMenuItems.length - 1) {
                _selectMenuIndex = -1
            }
            _selectMenuIndex++;
            passcardOBJ.selectLi(_selectMenuIndex)
        }
    };
    passcardOBJ.showList = function (e) {
        _selectMenuText = "";
        var keyCodeNum = getEvent().keyCode;
        if (keyCodeNum == 38 || keyCodeNum == 40) {
            passcardOBJ.arrowKey(keyCodeNum);
            return false
        }
        if (!$E("sinaNote")) {
            passcardOBJ.createNode()
        }
        var username = $E(e).value;
        var menuList = {};
        var atIndex = username.indexOf("@");
        var InputCase = "";
        var InputStr = "";
        if (atIndex > -1) {
            InputCase = username.substr(atIndex + 1);
            InputStr = username.substr(0, atIndex)
        }
        _showMenuItems = [];
        _selectMenuIndex = 0;
        _showMenuItems[_showMenuItems.length] = "sinaNote_MenuItem_Title_" + _rndID;
        for (var key in this.menuStatus) {
            this.menuStatus[key] = true;
            if (InputCase != "" && InputCase != key.substr(0, InputCase.length)) {
                this.menuStatus[key] = false
            } else {
                _showMenuItems[_showMenuItems.length] = "sinaNote_MenuItem_" + key + "_" + _rndID
            }
        }
        var listcontent = '<li class="note">' + $CLTMSG.CC0301 + "</li>";
        listcontent += '<li id="sinaNote_MenuItem_Title_' + _rndID + '">' + username + "</li>";
        var itemLabel;
        for (var key in this.menuStatus) {
            if (this.menuStatus[key] == true) {
                if (InputStr == "") {
                    itemLabel = username + "@" + key
                } else {
                    itemLabel = InputStr + "@" + key
                }
                listcontent += '<li id="sinaNote_MenuItem_' + key + "_" + _rndID + '" title="' + itemLabel + '">' + itemLabel + "</li>"
            }
        }
        $E("sinaNote").innerHTML = listcontent;
        for (var i = 0; i < username.length; i++) {
            if (username.charCodeAt(i) < 160) {
                $E("sinaNote").style.display = "";
                this.selectList(e)
            } else {
                this.hideList()
            }
        }
        var el = $E(e);
        var note = $E("sinaNote");
        var frameLeft = 0;
        var frameTop = 0;
        var framePos;
        if (_viewWindow != window) {
            framePos = getXY(window.frameElement);
            frameLeft = framePos[0];
            frameTop = framePos[1]
        }
        var inputWidth = el.offsetWidth;
        if (inputWidth < 200) {
            inputWidth = 200
        }
        note.style.width = inputWidth - 2 + "px";
        var inputXY = getXY(el);
        note.style.left = (inputXY[0] - ($IE ? 2 : -1) + frameLeft) + "px";
        note.style.top = (inputXY[1] + el.offsetHeight - ($IE ? 2 : -1) + frameTop) + "px"
    };
    passcardOBJ.selectList = function (e) {
        var unames = $E("sinaNote").getElementsByTagName("li");
        for (var i = 1; i < unames.length; i++) {
            unames[1].style.backgroundColor = passcardOBJ.overbgcolor;
            unames[1].style.color = passcardOBJ.outfcolor;
            unames[i].onmousedown = function () {
                var temp = this.innerHTML;
                if (temp.indexOf($CLTMSG.CC0302) > -1) {
                    var pos = temp.split("@");
                    $E(e).value = pos[0]
                } else {
                    $E(e).value = this.innerHTML
                }
                stopEvent()
            };
            unames[i].onmouseover = function () {
                if (i != 1) {
                    unames[1].style.backgroundColor = passcardOBJ.outbgcolor;
                    unames[1].style.color = passcardOBJ.overfcolor
                }
                this.style.backgroundColor = passcardOBJ.overbgcolor;
                this.style.color = passcardOBJ.outfcolor
            };
            unames[i].onmouseout = function () {
                this.style.backgroundColor = passcardOBJ.outbgcolor;
                this.style.color = passcardOBJ.overfcolor;
                unames[1].style.backgroundColor = passcardOBJ.overbgcolor;
                unames[1].style.color = passcardOBJ.outfcolor
            }
        }
    };
    passcardOBJ.selectLi = function (nIndex) {
        var menuNode;
        if ($E("sinaNote_MenuItem_Title_" + _rndID)) {
            $E("sinaNote_MenuItem_Title_" + _rndID).style.backgroundColor = passcardOBJ.outbgcolor;
            $E("sinaNote_MenuItem_Title_" + _rndID).style.color = passcardOBJ.overfcolor;
            for (var i = 0; i < _showMenuItems.length; i++) {
                menuNode = $E(_showMenuItems[i]);
                menuNode.style.backgroundColor = passcardOBJ.outbgcolor;
                menuNode.style.color = passcardOBJ.overfcolor
            }
            $E(_showMenuItems[nIndex]).style.backgroundColor = passcardOBJ.overbgcolor;
            $E(_showMenuItems[nIndex]).style.color = passcardOBJ.outfcolor;
            _selectMenuText = $E(_showMenuItems[nIndex]).innerHTML
        }
    };
    passcardOBJ.hideList = function () {
        if (!$E("sinaNote")) {
            passcardOBJ.createNode()
        }
        $E("sinaNote").style.display = "none"
    };
    passcardOBJ.init = function (oNode, oColors, oFocusNode, oWindowTarget) {
        for (var key in oColors) {
            this[key] = oColors[key]
        }
        addEvent2(document, passcardOBJ.hideList, "click");
        addEvent2(oNode, passcardOBJ.hideList, "blur");
        addEvent2(oNode, passcardOBJ.showList.bind3(this, [oNode]), "keyup");
        addEvent2(oNode, function (e) {
            var keyCodeNum = getEvent().keyCode;
            if (keyCodeNum == 13 || keyCodeNum == 9) {
                if (_selectMenuText != "") {
                    var temp = _selectMenuText;
                    if (temp.indexOf($CLTMSG.CC0302) > -1) {
                        var pos = temp.split("@");
                        oNode.value = pos[0]
                    } else {
                        oNode.value = _selectMenuText
                    }
                }
                if (oFocusNode != null) {
                    oFocusNode.focus()
                }
                stopEvent()
            }
        }, "keydown");
        if (oWindowTarget) {
            _viewWindow = oWindowTarget
        }
    };
    window.passcardOBJ = passcardOBJ
})();
(function () {
    App.getMsg = function (msgCode, replace) {
        if (msgCode === undefined) {
            return ""
        }
        if (typeof(msgCode) == "object") {
            msgCode = msgCode.code
        }
        var msg = $SYSMSG[msgCode] || $CLTMSG[msgCode] || ("Error[" + msgCode + "]");
        if (replace) {
            var tmp = new Utils.Template(msg);
            return tmp.evaluate(replace)
        } else {
            return msg
        }
    };

    function setMask(z, hidden) {
        var _mask1 = document.getElementsByTagName("BODY")[0].appendChild($C($IE ? "iframe" : "div"));
        var $w = window,
            $d = $w.document,
            $e = $d.documentElement || {};
        with(_mask1.style) {
            position = "absolute";
            backgroundColor = "#000";
            width = "100%";
            zIndex = parseInt(z) - 1;
            top = "0px";
            left = "0px"
        }
        Core.Dom.opacity(_mask1, 15);
        _mask1.style.height = Math.max($e.clientHeight, $e.scrollHeight, $e.offsetHeight, $d.body.scrollHeight, $d.body.offsetHeight) + "px";
        return _mask1
    }
    function setMiddle(_node) {
        var ow = _node.offsetWidth;
        var oh = _node.offsetHeight;
        var win_s = Core.System.winSize();
        var scroll_pos = Core.System.getScrollPos();
        var tx = (win_s.width - ow) / 2;
        var ty = scroll_pos[0] + (win_s.height - oh) / 2;
        _node.style.left = tx + "px";
        _node.style.top = (ty < 20 ? 20 : ty) + "px"
    }
    function iniRegForm(rnd) {
        var _box = $E("mod_reg_information_box" + rnd);
        var _submit = $E("mod_reg_submit" + rnd);
        var _username = $E("mod_reg_username" + rnd);
        var _password = $E("mod_reg_password" + rnd);
        var _password2 = $E("mod_reg_password2" + rnd);
        var _door = $E("mod_reg_door" + rnd);
        var _after = $E("mod_reg_after" + rnd);
        var _red_username = $E("mod_red_reg_username" + rnd);
        var _red_password = $E("mod_red_reg_password" + rnd);
        var _red_password2 = $E("mod_red_reg_password2" + rnd);
        var _red_door = $E("mod_red_reg_door" + rnd);
        var _red_after = $E("mod_red_reg_after" + rnd);
        var _addEvent = Core.Events.addEvent;
        var _trim = Core.String.trim;
        var _html2json = App.htmlToJson;
        var _compjson = App.compareJson;
        var _checkMail = App.checkEml;
        var _alert = App.alert;
        var _removeEvent = Core.Events.removeEvent;
        var _oData = _html2json(_box);
        var popWin = null;
        var success = function (json) {};
        var error = function (json) {
            if (json) {
                if (!App.modCheckInfo.showError([json.code])) {
                    _alert($SYSMSG[json.code])
                }
            } else {
                _alert($SYSMSG[json.code])
            }
        };
        var errorInput = function (input, red, code) {
            red.innerHTML = $SYSMSG[code];
            red.style.display = ""
        };
        var rightInput = function (input, red) {
            red.style.display = "none"
        };
        var checkFunction = {
            MR0001: function (el) {
                el.value = _trim(el.value);
                if (el.value) {
                    return true
                } else {
                    return false
                }
            },
            MR0002: function (el) {
                if (App.modCheckInfo.check(["MR0001"])) {
                    if (_checkMail(el.value)) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }
            },
            MR0007: function (el) {
                if (!_trim(el.value).length) {
                    return true
                }
                if (App.modCheckInfo.check(["MR0001", "MR0002"])) {
                    if (/^.+@(sina\.com|vip\.sina\.com|sina\.cn|2008\.sina\.com|my3ia\.sina\.com)$/i.test(el.value)) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            },
            MR0005: function (el) {
                el.ajaxCheck = "1";
                if (App.modCheckInfo.check(["MR0001", "MR0002", "MR0004"])) {
                    var _parm = {
                        username: el.value
                    };
                    Utils.Io.Ajax.request("/reg/ami_check.php", {
                        POST: _parm,
                        onComplete: function (json) {
                            if (json.code == "A00006") {
                                el.ajaxCheck = "1"
                            } else {
                                el.ajaxCheck = "0"
                            }
                            checkFunction.MR0006(el);
                            return true
                        },
                        onException: function (json) {
                            return false
                        },
                        returnType: "json"
                    });
                    return true
                } else {
                    return true
                }
            },
            MR0006: function (el) {
                if (el.ajaxCheck == "1") {
                    App.modCheckInfo.hideError(["MR0006"]);
                    return true
                } else {
                    if (el.ajaxCheck === undefined) {
                        App.modCheckInfo.hideError(["MR0006"]);
                        return true
                    } else {
                        App.modCheckInfo.showError(["MR0006"]);
                        return false
                    }
                }
            },
            MR0014: function (el) {
                el.value = _trim(el.value);
                if (App.modCheckInfo.check(["MR0011"]) && App.modCheckInfo.check(["MR0013"])) {
                    if (/^[0-9a-zA-z\._\-\?]{6,16}$/.test(el.value)) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }
            },
            MR0011: function (el) {
                el.value = _trim(el.value);
                if (el.value.length < 6) {
                    return false
                } else {
                    return true
                }
            },
            MR0013: function (el) {
                el.value = _trim(el.value);
                if (el.value.length > 16) {
                    return false
                } else {
                    return true
                }
            },
            MR0020: function (el) {
                el.value = _trim(el.value);
                if (el.value == _trim(_password.value)) {
                    return true
                } else {
                    return false
                }
            },
            MR0050: function (el) {
                el.value = _trim(el.value);
                if (el.value.length > 0) {
                    return true
                } else {
                    return false
                }
            },
            MR0071: function (el) {
                if (el.checked) {
                    return true
                }
                return false
            }
        };
        App.modCheckInfo = App.checkForm(App.checkFormUI4);
        App.modCheckInfo.add("MR0001", _username, _red_username, checkFunction.MR0001);
        App.modCheckInfo.add("MR0002", _username, _red_username, checkFunction.MR0002);
        App.modCheckInfo.add("MR0007", _username, _red_username, checkFunction.MR0007);
        App.modCheckInfo.add("MR0005", _username, _red_username, checkFunction.MR0005);
        App.modCheckInfo.add("MR0006", _username, _red_username, checkFunction.MR0006);
        App.modCheckInfo.add("MR0014", _password, _red_password, checkFunction.MR0014);
        App.modCheckInfo.add("MR0011", _password, _red_password, checkFunction.MR0011);
        App.modCheckInfo.add("MR0013", _password, _red_password, checkFunction.MR0013);
        App.modCheckInfo.add("MR0020", _password2, _red_password2, checkFunction.MR0020);
        App.modCheckInfo.add("MR0050", _door, _red_door, checkFunction.MR0050);
        App.modCheckInfo.add("MR0071", _after, _red_after, checkFunction.MR0071);
        App.bindFormTips4([{
            el: _username,
            key: "MR0003",
            errorPos: _red_username
        },
        {
            el: _password,
            key: "MR0012",
            errorPos: _red_password
        },
        {
            el: _password2,
            key: "MR0021",
            errorPos: _red_password2
        }]);
        App.modRegisterMethod = {};
        App.modRegisterMethod.submit = function () {
            if (App.modCheckInfo.check() && (_username.ajaxCheck == "1")) {
                setTimeout(function () {
                    App.modRegisterMethod.rumor(success, error)
                }, 500)
            }
            return false
        };
        var _isNewCheckcode = false;
        App.modRegisterMethod.rumor = function (success, error) {
            if (typeof success != "function") {
                throw ("The publishRumor need a function as thrid parameter")
            }
            if (typeof error != "function") {
                throw ("The publishRumor need a function as fourth parameter")
            }
            var parameters = _html2json(_box);
            parameters.token = scope.$token;
            parameters.retcode = scope.doorretcode || "";
            parameters.r = window.location.href;
            parameters.regsrc = 4;
            scope.doorretcode = "";
            if (_compjson(parameters, _oData)) {
                success()
            } else {
                Utils.Io.Ajax.request("/reg/reg.php", {
                    POST: parameters,
                    onComplete: function (json) {
                        if (json.code == "A00006") {
                            success(json.data);
                            oData = parameters;
                            if (json.data) {
                                window.location.replace(json.data)
                            }
                        } else {
                            if (json.code == "M00004") {
                                _alert({
                                    code: "R01438"
                                })
                            } else {
                                if (json.code == "MR0050") {
                                    App.forbidrefresh(function () {
                                        Core.Events.fireEvent(_submit, "click")
                                    }, "/reg/reg.php");
                                    return
                                } else {
                                    if (json.code == "R01409") {
                                        _red_door.innerHTML = '<span class="iswhat iserro"><img class="tipicon tip2" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" alt="" title="" /><em>' + $SYSMSG[json.code] + "</em></span>";
                                        App.TextareaUtils.setCursor(_door);
                                        App.modRefreshCheckCode()
                                    } else {
                                        error(json)
                                    }
                                }
                            }
                        }
                        _submit.className = "btnlogin1"
                    },
                    onException: function (json) {
                        _addEvent(_submit, App.modRegisterMethod.submit, "click");
                        error(json);
                        _submit.className = "btnlogin1"
                    },
                    returnType: "json"
                });
                _submit.className = "btnlogin1 btnlogin1_load"
            }
        };
        _addEvent(_submit, App.modRegisterMethod.submit, "click");
        App.enterSubmit({
            parent: _box,
            action: function () {
                Core.Events.fireEvent(_submit, "click")
            }
        });
        passcardOBJ.init(_username, {
            overfcolor: "#999",
            overbgcolor: "#e8f4fc",
            outfcolor: "#000000",
            outbgcolor: ""
        }, _password, window)
    }
    function iniLoginForm(rnd, cb) {
        var login_submit = $E("mod_login_submit" + rnd);
        var login_tip = $E("mod_login_tip" + rnd);
        var loginname = $E("mod_loginname" + rnd);
        var password = $E("mod_password" + rnd);
        var isremember = $E("mod_isremember" + rnd);
        var disableClass = "btn_notclick";
        var enableClass = "btn_normal";
        var options = {
            zIndex: 1010,
            ref: loginname,
            wrap: login_tip,
            offsetX: 0,
            offsetY: 1
        };
        if (!$IE) {
            options.offsetY = 10
        }
        App.initLoginInput(loginname);
        if (cb && cb.initErrorTip) {
            App.fixElement.setHTML(cb.initErrorTip, "", options)
        }
        function checkForm(el, errStr) {
            if (!Core.String.trim(el.value) || (el.value == el.title && el.title)) {
                $E("mod_password_text" + rnd).focus();
                App.fixElement.setHTML(errStr, "", options);
                return false
            } else {
                App.fixElement.hidden()
            }
            return true
        }
        login_submit.onclick = function () {
            if (login_submit.className == disableClass) {
                return false
            }
            login_submit.className = enableClass;
            if (!checkForm(loginname, App.getMsg({
                code: "M00901"
            }))) {
                return false
            }
            if (!checkForm(password, App.getMsg({
                code: "M00902"
            }))) {
                return false
            }
            App.LoginAction({
                name: loginname.value,
                pwd: password.value,
                remb: isremember.checked,
                error: function (reason, errno) {
                    var msg = "";
                    if (errno == "4010") {
                        reason = App.getMsg({
                            code: "R01011"
                        });
                        msg = App.getMsg("R01010", {
                            mail: loginname.value
                        })
                    } else {
                        if (errno == "101" || errno == "5") {
                            msg = App.getMsg({
                                code: "R11111"
                            })
                        }
                    }
                    App.fixElement.setHTML(reason, "", options)
                },
                succ: function () {
                    App.modRegisterOrLoginClose();
                    if (cb) {
                        scope.$uid = "123456";
                        cb.func(cb.param)
                    } else {
                        location.reload()
                    }
                }
            })
        };
        App.enterSubmit({
            parent: password.parentNode,
            action: function () {
                login_submit.onclick()
            }
        });
        passcardOBJ.init(loginname, {
            overfcolor: "#999",
            overbgcolor: "#e8f4fc",
            outfcolor: "#000000",
            outbgcolor: ""
        }, $E("mod_password_text" + rnd), window)
    }
    App.modRegisterAndLogin = function (showType, titleKey, callBackFunction, loginInfoKey) {
        var regurl = /open\.t\.sina/.test(location.href) ? "http://t.sina.com.cn/reg.php" : "/reg.php";
        regurl += "?lang=" + scope.$lang;
        var recoverurl = "http://login.sina.com.cn/cgi/getpwd/getpwd0.php?entry=sso";
        var regTitle = $CLTMSG.CY0124;
        var loginTitle = titleKey ? $CLTMSG[titleKey] : false;
        if (titleKey == "CY0130") {
            loginTitle = loginTitle.replace("{name}", Core.String.byteLength(scope.realname) > 10 ? (Core.String.leftB(scope.realname, 10) + "...") : scope.realname).replace("{titlename}", scope.realname)
        }
        var loginInfo = $CLTMSG[loginInfoKey] || $CLTMSG.CY0121;
        var rnd = (new Date()).getTime();
        var html = '<table class="mBlogLayer">					<tr>						<td class="top_l"></td>						<td class="top_c"></td>						<td class="top_r"></td>					</tr>					<tr>						<td class="mid_l"></td>						<td class="mid_c">					<div class="layerBox">					<div class="layerBoxCon" style=" width:530px;">					<div class="layerSmartlogin">						<div class="layerMedia_close"><a href="javascript:void(0);" onclick="App.modRegisterOrLoginClose()" class="close"></a></div>						<div class="yellowBg" id="mod_reg_login_yellow' + rnd + '"></div>						<div class="infoForm" id="mod_reg_information_box' + rnd + '">							<div class="infoReg">								<table class="tab2">                                <tr>                                	<th><span>' + $CLTMSG.CY0116 + '：</span></th>                                	<td class="td1"><input type="text" class="inp" id="mod_reg_username' + rnd + '" name="username" /></td>                                	<td id="mod_red_reg_username' + rnd + '"><a href="http://t.sina.com.cn/reg_sinamail.php?lang=zh-cn" target="_blank">我没有邮箱</a></td>                                </tr>                                <tr>                                	<th><span>' + $CLTMSG.CY0117 + '：</span></th>                                	<td class="td1">										<input type="password" class="inp" id="mod_reg_password' + rnd + '" name="password" />									</td>                                	<td id="mod_red_reg_password' + rnd + '"></td>                                </tr>                                <tr>                                	<th><span>' + $CLTMSG.CY0118 + '：</span></th>                                	<td class="td1">										<input type="password" class="inp" id="mod_reg_password2' + rnd + '" name="password2" />									</td>                                	<td id="mod_red_reg_password2' + rnd + '"></td>                                </tr>                                <tr>                                	<th><span>' + $CLTMSG.CY0119 + '：</span></th>                                	<td class="td1">										<input type="text" class="inp w1" id="mod_reg_door' + rnd + '" name="basedoor" style="width:40px" />										<img width="90" height="31" align="absmiddle" src="/pincode/pin1.php?r=1275025963678&amp;lang=zh" style="margin:5px 0;" id="mod_reg_check_img" />										<a href="javascript:void(0);" onclick="App.modRefreshCheckCode()">' + $CLTMSG.CY0120 + '</a>									</td>                                	<td id="mod_red_reg_door' + rnd + '"></td>                                </tr>								<tr>                                	<th>&nbsp;</th>                                    <td class="td1"><div class="lf"><input type="checkbox" id="mod_reg_after' + rnd + '" class="labelbox" checked="checked" name="after" value="1" /><label for="chbb">' + $CLTMSG.CY0129 + '</label></div></td>                                	<td id="mod_red_reg_after' + rnd + '"></td>								</tr>                                <tr>                                	<th>&nbsp;</th>                                	<td class="td1"><a href="javascript:void(0);" class="btnlogin1" id="mod_reg_submit' + rnd + '"></a></td>                                	<td>&nbsp;</td>                                </tr>								</table>							</div>							<div class="clearit"></div>						</div>						<div class="infoForm" id="mod_reg_login_box' + rnd + '">							<div class="infoLeft">								<table class="tab1">								<caption>' + loginInfo + '</caption>								<tr>									<th id="mod_login_tip' + rnd + '" scope="row"></th>									<td></td>					            </tr>								<tr>									<td><input type="text" class="inp" id="mod_loginname' + rnd + '" /></td>								</tr>								<tr>									<td><input type="text" style="color:#999;display:none;" class="inp" id="mod_password_text' + rnd + '" /><input type="password" class="inp" id="mod_password' + rnd + '" /></td>								</tr>								<tr>									<th>										<a href="javascript:void(0);" class="btn_normal" id="mod_login_submit' + rnd + '"><em>' + $CLTMSG.CD0134 + '</em></a>										<input type="checkbox" id="mod_isremember' + rnd + '" class="chkb" checked="checked" /><label for="mod_isremember' + rnd + '">' + $CLTMSG.CY0123 + '</label>									</th>								</tr>								</table>							</div>							<div class="infoRight">								<p class="p1">' + $CLTMSG.CY0122 + '</p>								<p class="p2"><a href="javascript:void(0);" class="btnlogin1" onclick="App.modRunToRegisterOrLogin(\'register\');"></a></p>							</div>							<div class="clearit"></div>						</div>					</div>					</div>					</div>					</td>					<td class="mid_r"></td>					</tr>					<tr>					<td class="bottom_l"></td>					<td class="bottom_c"></td>					<td class="bottom_r"></td>					</tr>					</table>';
        var box = $C("DIV");
        box.innerHTML = html;
        box.style.position = "absolute";
        box.style.zIndex = 1600;
        box.style.width = "540px";
        document.body.appendChild(box);
        iniRegForm(rnd, callBackFunction);
        iniLoginForm(rnd, callBackFunction);
        var cachePassCardStatus = passcardOBJ.menuStatus;
        App.modRunToRegisterOrLogin = function (type) {
            if (type === "login") {
                $E("mod_reg_login_box" + rnd).style.display = "";
                $E("mod_reg_information_box" + rnd).style.display = "none";
                if (loginTitle) {
                    $E("mod_reg_login_yellow" + rnd).innerHTML = loginTitle;
                    $E("mod_reg_login_yellow" + rnd).style.display = ""
                } else {
                    $E("mod_reg_login_yellow" + rnd).style.display = "none"
                }
                passcardOBJ.menuStatus = {
                    "sina.cn": true,
                    "sina.com": true,
                    "vip.sina.com": true,
                    "163.com": true,
                    "qq.com": true,
                    "126.com": true,
                    "hotmail.com": true,
                    "gmail.com": true,
                    "sohu.com": true
                }
            } else {
                if (type === "register") {
                    $E("mod_reg_login_box" + rnd).style.display = "none";
                    $E("mod_reg_information_box" + rnd).style.display = "";
                    $E("mod_reg_login_yellow" + rnd).innerHTML = regTitle;
                    $E("mod_reg_login_yellow" + rnd).style.display = "";
                    passcardOBJ.menuStatus = {
                        "163.com": true,
                        "qq.com": true,
                        "126.com": true,
                        "hotmail.com": true,
                        "gmail.com": true,
                        "sohu.com": true
                    };
                    try {
                        GB_SUDA._S_uaTrack("tblog_reg", "layer_reg")
                    } catch (ex) {}
                }
            }
        };
        App.setPassword("mod_password" + rnd, "mod_password_text" + rnd);
        App.modRegisterOrLoginClose = function () {
            document.body.removeChild(box);
            document.body.removeChild(mask);
            passcardOBJ.menuStatus = cachePassCardStatus;
            App.modRunToRegisterOrLogin = false
        };
        App.modRunToRegisterOrLogin(showType);
        setMiddle(box);
        var mask = setMask(600);
        try {
            GB_SUDA._S_uaTrack("tblog_reg", "layer_login")
        } catch (exp) {}
        return box
    };
    App.modRefreshCheckCode = function () {
        setTimeout(function () {
            $E("mod_reg_check_img").src = "/pincode/pin1.php?r=" + ((new Date()).getTime()) + "&lang=" + scope.$lang;
            $E("mod_reg_check_img").style.display = ""
        }, 10)
    }
})();
App.ModLogin = function (callBackFunction, title) {
    var tit = title || $CLTMSG.CD0038;
    var regurl = /open\.t\.sina/.test(location.href) ? "http://t.sina.com.cn/reg.php" : "/reg.php";
    regurl += "?lang=" + scope.$lang;
    var recoverurl = "http://login.sina.com.cn/cgi/getpwd/getpwd0.php?entry=sso";
    var rnd = (new Date()).getTime();
    var html = '<div class="loginLayer" id="login_wrap' + rnd + '">            	<table>                  <tbody>				  <tr>			      	   <th scope="row"/>	                        <td id="login_tip' + rnd + '"></td>	                    </tr>				  <tr>                    <th scope="row">' + $CLTMSG.CD0039 + '&nbsp;&nbsp;</th>                    <td><span class="cInputBorder"><span class="cInputborderR"><input tabIndex="1" type="text" name="loginname" id="loginname' + rnd + '" class="inputType" style="width: 210px;"/></span></span></td>                    <td><a href="' + regurl + '" target="_blank">' + $CLTMSG.CD0040 + '</a></td>                  </tr>                  <tr>                    <th scope="row">' + $CLTMSG.CD0041 + '&nbsp;&nbsp;</th>                    <td><span class="cInputBorder"><span class="cInputborderR"><input tabIndex="2" type="password" name="password" id="password' + rnd + '" class="inputType" style="width: 210px;"/></span></span></td>                    <td><a href="' + recoverurl + '" target="_blank">' + $CLTMSG.CD0042 + '</a></td>                  </tr>                  <tr>                    <th scope="row"/>                    <td><input type="checkbox" id="isremember' + rnd + '"  checked="checked"/>' + $CLTMSG.CD0043 + '</td>                    <td/>                  </tr>                  <tr>                    <th scope="row"/>                    <td><a href="javascript:void(0);" id="login_submit' + rnd + '" class="btn_normal"><em>' + $CLTMSG.CD0044 + "</em></a></td>                    <td/>                  </tr>                </tbody></table>            </div>";
    var cfg = {
        width: 390,
        zIndex: 1000
    };
    var dialog = new App.Dialog.BasicDialog(tit, html, cfg);
    var disableClass = "btn_notclick";
    var enableClass = "btn_normal";
    var login_submit = $E("login_submit" + rnd);
    var login_tip = $E("login_tip" + rnd);
    var loginname = $E("loginname" + rnd);
    var password = $E("password" + rnd);
    var isremember = $E("isremember" + rnd);
    var options = {
        zIndex: 1010,
        ref: loginname,
        wrap: login_tip,
        offsetX: 0,
        offsetY: 1
    };
    if (!$IE) {
        options.offsetY = 10
    }
    App.initLoginInput(loginname);
    if (callBackFunction && callBackFunction.initErrorTip) {
        App.fixElement.setHTML(callBackFunction.initErrorTip, "", options)
    }
    function checkForm(el, errStr) {
        if (!Core.String.trim(el.value) || (el.value == el.title && el.title)) {
            el.focus();
            App.fixElement.setHTML(errStr, "", options);
            return false
        } else {
            App.fixElement.hidden()
        }
        return true
    }
    login_submit.onclick = function () {
        if (login_submit.className == disableClass) {
            return false
        }
        login_submit.className = enableClass;
        if (!checkForm(loginname, App.getMsg({
            code: "M00901"
        }))) {
            return false
        }
        if (!checkForm(password, App.getMsg({
            code: "M00902"
        }))) {
            return false
        }
        App.LoginAction({
            name: loginname.value,
            pwd: password.value,
            remb: isremember.checked,
            error: function (reason, errno) {
                var msg = "";
                if (errno == "4010") {
                    reason = App.getMsg({
                        code: "R01011"
                    });
                    msg = App.getMsg("R01010", {
                        mail: loginname.value
                    })
                } else {
                    if (errno == "101" || errno == "5") {
                        msg = App.getMsg({
                            code: "R11111"
                        })
                    }
                }
                App.fixElement.setHTML(reason, msg, options)
            },
            succ: function () {
                dialog.close();
                if (callBackFunction) {
                    scope.$uid = "123456";
                    callBackFunction.func(callBackFunction.param)
                } else {
                    location.reload()
                }
            }
        })
    };
    App.enterSubmit({
        parent: password.parentNode,
        action: function () {
            login_submit.onclick()
        }
    });
    passcardOBJ.init(loginname, {
        overfcolor: "#999",
        overbgcolor: "#e8f4fc",
        outfcolor: "#000000",
        outbgcolor: ""
    }, password, window);
    return dialog
};
App.ModLogin = function (callBackFunction, title) {
    if (App.modRunToRegisterOrLogin) {
        App.modRunToRegisterOrLogin("login")
    } else {
        App.modRegisterAndLogin("login", false, callBackFunction)
    }
};
(function (proxy) {
    var movingKey = false;
    proxy.doFlyOut = function (st, tg, config) {
        if (movingKey) {
            return false
        }
        movingKey = true;
        var getAbsolute = function (ele) {
            var aPoint = Core.Dom.getXY(ele);
            var res = {
                x: aPoint[0],
                y: aPoint[1]
            };
            return res
        };
        var params_st = {
            w: st.offsetWidth,
            h: st.offsetHeight,
            l: (getAbsolute(st))["x"],
            t: (getAbsolute(st))["y"]
        };
        var visible = tg.style.visibility;
        var display = tg.style.display;
        if (tg.style.display == "none") {
            tg.style.visibility = "hidden";
            tg.style.display = "block"
        }
        var params_tg = {
            w: tg.offsetWidth,
            h: tg.offsetHeight,
            l: (getAbsolute(tg))["x"],
            t: (getAbsolute(tg))["y"]
        };
        var oo = document.createElement("DIV");
        oo.style.cssText = config.style;
        oo.style.width = params_st.w + "px";
        oo.style.height = params_st.h + "px";
        oo.style.top = params_st.t + "px";
        oo.style.left = params_st.l + "px";
        oo.style.position = "absolute";
        document.body.appendChild(oo);
        var ct = {
            w: proxy.animation.taccelerate(proxy.timer.delay, params_tg.w - params_st.w, config.time),
            h: proxy.animation.taccelerate(proxy.timer.delay, params_tg.h - params_st.h, config.time),
            l: proxy.animation.taccelerate(proxy.timer.delay, params_tg.l - params_st.l, config.time),
            t: proxy.animation.taccelerate(proxy.timer.delay, params_tg.t - params_st.t, config.time)
        };
        var c = 0;
        var tk = proxy.timer.add(function () {
            if (c >= ct.w.length) {
                proxy.timer.remove(tk);
                oo.style.display = "none";
                config.resFun();
                movingKey = false;
                return false
            }
            oo.style.width = params_st.w + ct.w[c] + "px";
            oo.style.height = params_st.h + ct.h[c] + "px";
            oo.style.top = params_st.t + ct.t[c] + "px";
            oo.style.left = params_st.l + ct.l[c] + "px";
            c++
        });
        tg.style.visibility = visible;
        tg.style.display = display
    }
})(App);
App.flyDialog = function (sText, sDialogType, oFromTarget, oConfig) {
    var oAlert = App[sDialogType || "alert"](sText, oConfig);
    return oAlert
};
Core.Events.getEventTarget = function (ev) {
    ev = ev || Core.Events.getEvent();
    Core.Events.fixEvent(ev);
    return ev.target
};
Core.String.encodeHTML = function (str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML.replace(/\s/g, "&nbsp;")
};
Core.String.decodeHTML = function (str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    return div.innerText == undefined ? div.textContent : div.innerText
};
(function () {
    var NODEMAP = {
        AREA: "MAP",
        CAPTION: "TABLE",
        COL: "TABLE|COLGROUP",
        COLGROUP: "TABLE",
        LEGEND: "FIELDSET",
        OPTGROUP: "SELECT",
        OPTION: "SELECT",
        PARAM: "OBJECT",
        TBODY: "TABLE",
        TD: "TR",
        TFOOT: "TABLE",
        TH: "TABLE|TR",
        THEAD: "TABLE",
        TR: "TBODY|THEAD|TH|TFOOT"
    };
    var trim = Core.String.trim;
    var create = function (tagName, attributes, that) {
        var dom = null;
        if (tagName.toUpperCase() == "TEXT") {
            dom = document.createTextNode(tagName)
        } else {
            dom = $C(tagName)
        }
        if (typeof attributes === "object") {
            for (var k in attributes) {
                switch (k) {
                case "class":
                    dom.className = attributes[k];
                    break;
                case "id":
                    that.domList[attributes[k]] = dom;
                    break;
                case "action":
                    if (that.actList[attributes[k]]) {
                        that.actList[attributes[k]] = that.actList[attributes[k]].concat([dom])
                    } else {
                        that.actList[attributes[k]] = [dom]
                    }
                    break;
                case "style":
                    dom.style.cssText = attributes[k];
                    break;
                case "innerHTML":
                    if (dom.nodeType === 3) {
                        dom.nodeValue = Core.String.decodeHTML(attributes[k])
                    } else {
                        dom.innerHTML = attributes[k]
                    }
                    break;
                case "nodeValue":
                    if (dom.nodeType === 3) {
                        dom.nodeValue = attributes[k]
                    } else {
                        dom.innerHTML = Core.String.encodeHTML(attributes[k])
                    }
                    break;
                default:
                    dom.setAttribute(k, attributes[k])
                }
            }
        }
        return dom
    };
    var check = function (parent, childObj) {
        var tnames = NODEMAP[childObj.tag];
        if (tnames) {
            var pList = tnames.split("|");
            for (var i = 0, len = pList.length; i < len; i++) {
                if (parent.tagName == pList[i]) {
                    return true
                }
            }
            return false
        }
        return true
    };
    var append = function (parent, childObj, that) {
        childObj.tag = childObj.tag.toLocaleUpperCase();
        if (!check(parent, childObj)) {
            return false
        }
        var returnDom = create(childObj.tag, childObj.attr, that);
        parent.appendChild(returnDom);
        return returnDom
    };
    var makeTree = function (parent, objList, that) {
        for (var i = 0, len = objList.length; i < len; i++) {
            var Leaves = append(parent, objList[i], that);
            if (!Leaves) {
                alert("tree wrong!!!");
                return false
            }
            if (objList[i].list && objList[i].list.length) {
                makeTree(Leaves, objList[i].list, that)
            }
        }
    };
    var parseAttribute = function (attrStr) {
        var ret = {};
        var buff = [];
        if (attrStr) {
            var re = new RegExp("(?:([^\\s=]+)\\s*=\\s*[\\\"\\']([^=\\\"\\']*)[\\\"\\'])", "ig");
            while (buff = re.exec(attrStr)) {
                ret[buff[1]] = buff[2]
            }
        }
        return ret
    };
    var htmlToTemplate = function (htmlStr) {
        var so = parseHTML(htmlStr);
        var ret = [];
        var point = ret;
        var pointList = [];
        for (var i = 0, len = so.length; i < len; i += 1) {
            if (so[i][1] === undefined) {
                var a = buildItem(["", "", "text", 'innerHTML="' + so[i][0] + '"', ""]);
                point.push(a)
            }
            if (so[i][1] === "") {
                if (trim(so[i][0]) == "") {
                    continue
                } else {
                    if (/^\<[^\>]+\>$/.test(so[i][0])) {
                        var a = buildItem(so[i]);
                        point.push(a);
                        if (!/\/\s*>$/.test(so[i][0])) {
                            a.list = [];
                            point = a.list;
                            pointList.push(point)
                        }
                    } else {
                        var a = buildItem(["", "", "text", 'innerHTML="' + so[i][0] + '"', ""]);
                        if (trim(so[i][0]).replace(/\r|\n/ig, "")) {
                            point.push(a)
                        }
                    }
                }
            }
            if (so[i][1] === "/") {
                pointList.pop();
                if (pointList.length === 0) {
                    point = ret
                } else {
                    point = pointList[pointList.length - 1]
                }
            }
        }
        return ret
    };
    var buildItem = function (args) {
        var ret = {};
        ret.tag = args[2];
        ret.attr = parseAttribute(args[3]);
        return ret
    };
    var parseHTML = function (htmlStr) {
        var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
        var a, i;
        var ret = [];
        while ((a = tags.exec(htmlStr))) {
            var n = [];
            for (i = 0; i < a.length; i += 1) {
                n.push(a[i])
            }
            ret.push(n)
        }
        return ret
    };
    App.builder2 = function (spec) {
        var that = {};
        that.box = null;
        that.domList = {};
        that.actList = {};
        if (spec.box) {
            that.box = spec.box
        } else {
            that.box = $C("DIV")
        }
        if (spec.template) {
            if (typeof spec.template === "string") {
                spec.template = htmlToTemplate(spec.template)
            }
            makeTree(that.box, spec.template, that)
        }
        return that
    }
})();
Core.Dom.getLeft = function (element) {
    var left = 0;
    var el = $E(element);
    if (el.offsetParent) {
        while (el.offsetParent) {
            left += el.offsetLeft;
            el = el.offsetParent
        }
    } else {
        if (el.x) {
            left += el.x
        }
    }
    return left
};
App.square_pop = function () {
    if (!$E("square_pop")) {
        return false
    }
    var _addevent = Core.Events.addEvent;
    var _getEventTag = Core.Events.getEventTarget;
    var _stopevent = Core.Events.stopEvent;
    var _getEleCls = Core.Dom.getElementsByClass;
    var _getLeft = Core.Dom.getLeft;
    var _getXY = Core.Dom.getXY;
    var _hook = null;
    var element = {
        oSquare: $E("gotosquare"),
        oPop: $E("square_pop")
    };
    var arrow = _getEleCls(element.oPop, "div", "arrows")[0];
    var arrowLeft = 0;
    var arrowHeight = 0;
    var _abHeight = 0;
    var setposition = function (squa, obj) {
        arrowLeft = arrow.offsetLeft;
        arrowHeight = arrow.offsetHeight;
        var topbar = Core.Dom.getElementsByClass(document, "div", "MIB_trayMain_txt")[0];
        _abHeight = _getXY(topbar)[1] + topbar.offsetHeight + arrowHeight;
        var left = (_getLeft(squa) + (squa.offsetWidth / 2) - arrowLeft) + "px";
        var top = _abHeight + "px";
        obj.style.left = left;
        obj.style.top = top
    };
    var clearposition = function () {
        clearInterval(_hook)
    };
    var mouseover = function (obj) {
        obj.style.display = "";
        setposition(element.oSquare, element.oPop);
        _addevent(document.body, mouseout, "mouseover")
    };
    var mouseout = function () {
        var _event = Core.Events.fixEvent(Core.Events.getEvent());
        var oTarget = _getEventTag(Core.Events.getEvent());
        var _pointY = _event.clientY;
        var _pointX = _event.clientX;
        var _oSquareXY = _getXY(element.oSquare);
        while (oTarget) {
            if ((oTarget == element.oPop || oTarget == element.oSquare) || (_pointX >= _oSquareXY[0] && _pointX <= _oSquareXY[0] + element.oSquare.offsetWidth && _pointY < _abHeight)) {
                return true
            }
            if (oTarget != document.body) {
                oTarget = oTarget.parentNode
            } else {
                break
            }
        }
        clearposition();
        element.oPop.style.display = "none";
        Core.Events.removeEvent(document.body, mouseout, "mouseover")
    };
    _addevent(element.oSquare, (function () {
        return function () {
            mouseover(element.oPop)
        }
    })(), "mouseover")
};
App.Clip = function (el, config) {
    var that = {};
    var cfg = config || {};
    var q, func, i, init;
    var clip = function (el, cfg, clipfun) {
        var spec = {};
        spec.left = (cfg.left && cfg.left + "px") || "auto";
        spec.right = cfg.right || "auto";
        spec.top = cfg.top || "auto";
        spec.bottom = cfg.bottom || "auto";
        spec.endPixel = cfg.endPixel || 0;
        el.style.clip = "rect(" + spec.top + "," + spec.right + "," + spec.bottom + "," + spec.left + ")";
        var i = 0;
        if (!q) {
            q = window.setInterval(function () {
                clipfun(spec)
            }, 1)
        }
    };
    that.stopClip = function () {
        clearInterval(q);
        init(cfg);
        q = null
    };
    that.startClip = function () {
        el.style.visibility = "visible";
        clip(el, config, func)
    };
    switch (cfg.clipType) {
    case "1":
        init = function (cfg) {
            i = parseInt(cfg.right || "0")
        };
        func = function (spec) {
            i += cfg.clipspeed || 2;
            el.style.clip = "rect(" + spec.top + "," + i + "px," + spec.bottom + "," + spec.right + ")";
            if (i >= parseInt(spec.endPixel)) {
                clearInterval(q)
            }
        };
        init(cfg);
        break;
    case "2":
        init = function (cfg) {
            i = parseInt(cfg.bottom || "0")
        };
        func = function (spec) {
            i += cfg.clipspeed || 2;
            el.style.clip = "rect(" + spec.top + "," + spec.right + "," + i + "px," + spec.left + ")";
            if (i >= parseInt(spec.endPixel)) {
                clearInterval(q)
            }
        };
        init(cfg);
        break
    }
    return that
};
App.unit = function () {
    var it = {},
        udf;
    it.u = u = function (func, key) {
        var context = {
            it: it,
            sup: it[key]
        };
        return function () {
            func.apply(context, arguments);
            return it
        }
    };
    return it
};
(function (ns) {
    ns.builder3 = function (html, parent, param) {
        param = typeof param == "object" ? param : {};
        parent.innerHTML = html;
        var i = 0,
            domList = {},
            actList = {},
            nodes = parent.getElementsByTagName("*"),
            len = nodes.length,
            c, mm, dd, cv = param.clear || 1,
            mk = param.mm || "mm",
            dk = param.dd || "dd";
        for (i; i < len; i++) {
            c = nodes[i];
            dd = c.getAttribute(dk);
            mm = c.getAttribute(mk);
            dd && (domList[dd] = c) && (cv && c.removeAttribute(dk));
            mm && ((!actList[mm] && (actList[mm] = [c])) || (actList[mm] = actList[mm].concat([c]))) && (cv && c.removeAttribute(mk))
        }
        return {
            box: parent,
            domList: domList,
            actList: actList
        }
    }
})(App);
App.removeChildren = function (parent) {
    var n;
    while (n = parent.firstChild) {
        parent.removeChild(n)
    }
};
(function (proxy) {
    var d = document,
        zIndex = 1000;

    function b2(t, b) {
        return App.builder3(t, b, {
            dd: "id",
            mm: "action"
        })
    }
    proxy.PopUp = function () {
        var it = App.unit(),
            u = it.u,
            wrap, body, mask, cp = "position:absolute;clear:both;",
            ch = "visibility:hidden;display:none",
            cs = "width:100%;height:100%",
            rall = App.removeChildren;
        with(it.wrap = wrap = $C("div")) {
            appendChild(it.body = body = $C("div"));
            style.cssText = [cp, ch, "z-index:" + zIndex++].join(";")
        }
        it.mask = u(function () {
            if (!mask) {
                wrap.insertBefore(mask = $C("iframe"), body);
                with(mask) {
                    frameborder = 0;
                    src = "about:blank";
                    style.cssText = [cp, cs, "filter:alpha(opacity=0);opacity:0;z-index:-1"].join(";")
                }
            }
        });
        it.content = u(function (html) {
            rall(body);
            it.dom = b2(html, body)["domList"]
        });
        it.position = u(function (x, y) {
            with(wrap.style) {
                left = x + "px";
                top = y + "px"
            }
        });
        it.visible = u(function (b) {
            with(wrap.style) {
                visibility = b ? "visible" : "hidden";
                display = b ? "" : "none"
            }
        });
        it.zIndex = u(function (nIndex) {
            wrap.style.zIndex = nIndex
        });
        it.destroy = u(function () {
            wrap.parentNode.removeChild(wrap);
            wrap = body = mask = dom = null
        });
        d.body.appendChild(wrap);
        return it
    }
})(App);
(function (ns) {
    ns.ELSize = function (oElement, key, hasMargin) {
        var c = Core.Dom.getStyle,
            os = oElement[(key == "width") ? "offsetWidth" : "offsetHeight"],
            i = 0,
            p = ["padding", "margin", "border"],
            d = (key == "width") ? ["Left", "Right"] : ["Top", "Bottom"];
        for (i; i < d.length; i++) {
            os -= parseFloat(c(oElement, "padding" + d[i])) || 0;
            hasMargin && (os += parseFloat(c(oElement, "margin" + d[i])) || 0);
            os -= parseFloat(c(oElement, "border" + d[i] + "Width")) || 0
        }
        return os
    }
})(App);
(function (ns) {
    var d = document,
        udf;
    App.Wipe = function (eWrap, eTarget, nCount) {
        var it = App.unit(),
            es = App.ELSize,
            isPlaying = 0,
            u = it.u,
            timer, c = nCount || 8,
            wp = eWrap,
            ws, bp = eTarget,
            bs = bp.style,
            parent, sw, sh, ow, oh;
        if (!wp) {
            wp = $C("div");
            wp.style.cssText = "position:relative;clear:both";
            parent = bp.parentNode;
            parent.insertBefore(wp, bp);
            wp.appendChild(bp)
        }
        ws = wp.style;
        it.isPlaying = function () {
            return isPlaying
        };
        it.isVisible = function () {
            return isVisible
        };
        it.reset = u(function () {
            isPlaying = 0;
            clearInterval(timer);
            ws.visibility = "hidden";
            sw = sh = ow = oh = null
        });
        it.wipe = u(function (sType, bVisible, fCallBack, bReverse) {
            if (isPlaying) {
                return
            }
            var d, a, t, o, r, q, i = 1,
                v = bVisible == udf ? true : bVisible,
                que, uque;
            isPlaying = 1;
            ws.visibility = ws.overflow = "hidden";
            ws.display = "block";
            bs[$IE ? "styleFloat" : "cssFloat"] = "left";
            bs.marginTop = bs.marginLeft = "0px";
            bs.width = (sw || (sw = es(bp, "width"))) + "px";
            bs.height = (sh || (sh = es(bp, "height"))) + "px";
            ws.width = (ow || (ow = bp.offsetWidth)) + "px";
            ws.height = (oh || (oh = bp.offsetHeight)) + "px";
            bs.marginTop = bs.marginLeft = "0px";
            d = {
                up: 0,
                down: 1,
                left: 2,
                right: 3
            }[sType];
            a = ["marginTop", "height", "marginLeft", "width"][d];
            t = [bs, ws, bs, ws][d];
            o = [oh, oh, ow, ow][d];
            r = [0, 1, 0, 1][d];
            que = [o];
            que[c] = 0;
            for (i; i < c; i++) {
                que[i] = (o = o / 2)
            }
            bReverse && que.reverse();
            uque = que.concat().reverse();
            q = (v ? r : !r) ? uque : que;
            t[a] = [q[0], "px"].join("");
            ws.visibility = "visible";
            clearInterval(timer);
            timer = setInterval(function () {
                if (q.length) {
                    t[a] = Math.floor(q.shift()) + "px";
                    return
                }
                clearInterval(timer);
                isPlaying = 0;
                v && (ws.overflow = "");
                try {
                    bs.cssText = "";
                    fCallBack && u(fCallBack)()
                } catch (e) {}
            }, 30)
        });
        return it
    }
})(App);
(function (ns) {
    var d = document,
        de = (d.documentElement || {}),
        udf, b2 = function (t, b) {
            return App.builder3(t, b, {
                dd: "id",
                mm: "action"
            })
        };
    ns.PopUpWipe = function () {
        var it = ns.PopUp(),
            u = it.u,
            e = it.e,
            uque = [],
            type, isOpened, cx, cy, t;
        it.ani = App.Wipe(it.wrap, it.body);
        it.wipe = u(function (sType, bVisible, fCallBack) {
            type = sType;
            it.ani.wipe(sType, bVisible, fCallBack)
        });
        it.wipeHide = u(function () {
            it.ani.reset();
            it.wipe(type, false, function () {
                it.visible(false)
            })
        });
        it.position = u(function (x, y) {
            if (cx != x || cy != y) {
                cx = x;
                cy = y;
                it.ani.reset()
            }
            type = null;
            t = window.pageYOffset || Math.max(de.scrollTop, d.body.scrollTop);
            if (y < t) {
                App.scrollTo(t, y)
            }
            this.sup(x, y)
        }, "position");
        it.close = u(function () {
            if (!type) {
                it.visible(false);
                return false
            }
            it.wipeHide()
        });
        return it
    }
})(App);
(function (ns) {
    var d = document,
        ce = Core.Events,
        adde = ce.addEvent,
        removee = ce.removeEvent,
        stope = ce.stopEvent,
        rall = App.removeChildren,
        unf, builder = function (t, b) {
            return App.builder3(t, b, {
                dd: "id",
                mm: "action"
            })
        };
    ns.BasePopUpDialog = function () {
        var contnet = '<div id="panel" class="miniPopLayer" style="width:200px;"><div id="typePanel" class="txt1 gray6"><img class="tipicon tip1" id="icon" src="' + scope.$BASECSS + 'style/images/common/PY_ib.gif"/><div id="content"></div></div><div id="buttonPanel" style="display:none" class="btn"></div></div>';
        var it = ns.PopUpWipe().content(contnet),
            u = it.u,
            dom = it.dom;
        it.show = u(function () {
            it.visible(true)
        });
        it.hide = u(function () {
            it.visible(false)
        });
        it.width = u(function (nWidth) {
            dom.panel.style.width = (nWidth || 200) + "px"
        });
        it.addButton = u(function (sLabel, fClick) {
            if (sLabel === unf && fClick === unf) {
                rall(dom.buttonPanel);
                return
            }
            var span;
            dom.buttonPanel.appendChild(span = $C("span"));
            var button = builder(['<a id="button" style="width:39px;" class="newabtn_ok" href="javascript:void(0)" onclick="return false;"><em>', sLabel, "</em></a>"].join(""), span)["domList"]["button"];
            button.onclick = u(fClick);
            dom.buttonPanel.style.display = ""
        });
        it.content = u(function (sContent) {
            dom.content.innerHTML = sContent
        });
        it.icon = u(function (nType) {
            dom.icon.className = ["tipicon tip", nType].join("")
        });
        it.wipe = u(function (sType, bVisible, fCallBack) {
            this.sup(sType, bVisible, fCallBack)
        }, "wipe");
        adde(window, function () {
            it.visible(false)
        }, "resize");
        return it
    };
    ns.PopUpAlert = (function () {
        var it, u, cx, cy, clock;
        return function () {
            if (it) {
                return it
            }
            it = ns.BasePopUpDialog();
            u = it.u;
            it.yes = u(function (f) {
                it.onYes = f
            });
            it.close = u(function (f) {
                clearTimeout(clock);
                typeof it.onYes == "function" && it.onYes();
                this.sup()
            }, "close");
            it.lateClose = u(function (n) {
                clearTimeout(clock);
                clock = setTimeout(function () {
                    it.close()
                }, n || 3000)
            });
            it.position = u(function (x, y) {
                if (x != cx || y != cy) {
                    cx = x;
                    cy = y;
                    clearTimeout(clock)
                }
                this.sup(x, y)
            }, "position");
            return it
        }
    })();
    ns.PopUpConfirm = (function () {
        var it, u, cx, cy;
        return function () {
            if (it) {
                return it
            }
            it = ns.BasePopUpDialog();
            u = it.u;
            it.yes = u(function (f) {
                it.onYes = f
            });
            it.no = u(function (f) {
                it.onNo = f
            });
            it.close = u(function (f) {
                typeof it.onNo == "function" && it.onNo();
                this.sup()
            }, "close");
            it.addButton($CLTMSG.CX0125, function () {
                typeof it.onYes == "function" && it.onYes();
                it.wipeHide()
            });
            it.addButton($CLTMSG.CX0126, function () {
                it.close()
            });
            return it
        }
    })()
})(App);
Core.Dom.getTop = function (element) {
    var top = 0;
    var el = $E(element);
    if (el.offsetParent) {
        while (el.offsetParent) {
            top += el.offsetTop;
            el = el.offsetParent
        }
    } else {
        if (el.y) {
            top += el.y
        }
    }
    return top
};
App.skin_pop = function () {
    if (!$E("skin_tip")) {
        return false
    }
    var _addevent = Core.Events.addEvent;
    var _getEventTag = Core.Events.getEventTarget;
    var _stopevent = Core.Events.stopEvent;
    var _getEleCls = Core.Dom.getElementsByClass;
    var _getLeft = Core.Dom.getLeft;
    var _getTop = Core.Dom.getTop;
    var _getXY = Core.Dom.getXY;
    var _hook = null;
    var html = '<div id="skin_showtip" style="display:none;z-Index:999" class="pertemplate"><p><a href="/person/myskin.php">' + $CLTMSG.CC5701 + '</a></p><img title="" class="icon_pertemplate" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"></div>';
    Core.Dom.insertHTML(document.body, html, "beforeend");
    var element = {
        oSkin: $E("skin_tip"),
        oPop: $E("skin_showtip")
    };
    var mouseover = function (obj) {
        var skinbtnLeft = _getLeft(element.oSkin);
        var skinbtnTop = _getTop(element.oSkin);
        var left = (skinbtnLeft - 38) + "px";
        var top = (skinbtnTop - 36) + "px";
        obj.style.left = left;
        obj.style.top = top;
        obj.style.display = "";
        _addevent(document.body, mouseout, "mouseover")
    };
    var mouseout = function () {
        var _event = Core.Events.fixEvent(Core.Events.getEvent());
        var oTarget = _getEventTag(Core.Events.getEvent());
        while (oTarget) {
            if ((oTarget == element.oPop || oTarget == element.oSkin.parentNode)) {
                return true
            }
            if (oTarget != document.body) {
                oTarget = oTarget.parentNode
            } else {
                break
            }
        }
        element.oPop.style.display = "none";
        Core.Events.removeEvent(document.body, mouseout, "mouseover")
    };
    _addevent(element.oSkin, (function () {
        return function () {
            mouseover(element.oPop)
        }
    })(), "mouseover")
};
$registJob("initSearch", function () {
    Core.Events.addEvent($E("m_keyword"), App.focusblur, "blur");
    App.square_pop();
    App.skin_pop();
    App.search("m_keyword", "m_submit", "m_search", 30, (scope.$GFW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002);
    $E("m_keyword").value = (scope.$GFW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002
});
App.search = function (input, subbtn, form, maxlen, txt, cindex) {
    var maxlen = maxlen || 30;
    var textnode = $E(input);
    var subbtn = $E(subbtn);
    var form = $E(form);
    Utils.Sinput.limitMaxLen(textnode, maxlen);
    var auto = new App.autoSelect({
        input: textnode,
        id: textnode.id + "_tip",
        subbtn: subbtn,
        panel: form,
        maxlen: 12
    });
    var urls = {
        0: "/k/",
        1: "/search/user.php?search="
    };
    if (scope.$GFW == 0 && cindex !== undefined) {
        auto.curIndex = cindex
    }
    function formget(event) {
        var value = Core.String.trim(textnode.value);
        value = Core.String.leftB(value, maxlen);
        if (value == ((scope.$GFW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002)) {
            return
        }
        if (value && value != txt) {
            location.href = urls[scope.$GFW == 0 ? auto.curIndex : 1] + encodeURIComponent(encodeURIComponent(value))
        } else {
            textnode.focus()
        }
        Core.Events.stopEvent(event)
    }
    Core.Events.addEvent(subbtn, formget, "click");
    App.enterSubmit({
        parent: form,
        action: function (event) {
            Core.Events.fireEvent(subbtn, "click")
        }
    })
};
App.autoSelect = function (options) {
    this.panel = options.panel;
    this.input = $E(options.input);
    this.maxLen = options.maxlen || 4 * 2;
    this.subbtn = options.subbtn;
    this.initHTML(options.id);
    this.clip = App.Clip($E(options.id), {
        clipType: "2",
        bottom: "0px",
        endPixel: "200px",
        clipspeed: 4
    });
    Core.Events.addEvent(this.input, this.fileElement.bind2(this), "focus");
    scope.$GFW == 0 && Core.Events.addEvent(this.input, this.keydown.bind2(this), "keydown");
    scope.$GFW == 0 && Core.Events.addEvent(this.input, this.fileElement.bind2(this), "keyup");
    scope.$GFW == 0 && Core.Events.addEvent(document.body, this.removeElement.bind2(this), "click")
};
App.autoSelect.prototype = {
    initHTML: function (id) {
        var wrap = $E(id);
        var html = "<span>" + $CLTMSG.CD0002 + '</span><ul id="#{id}_content">' + $CLTMSG.CD0003 + "</ul>";
        html = html.replace(/#\{id\}/g, id);
        wrap.innerHTML = html;
        var _txt = $E("m_keyword").value.replace(/^\s+|\s+$/g, "");
        var _isDef = _txt == "" || _txt == ((scope.$GFW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002);
        App.Dom.getBy(function (el) {
            if (el.getAttribute("act") == "def") {
                el.style.display = _isDef ? "" : "none"
            }
            if (el.getAttribute("act") == "isinput") {
                el.style.display = !_isDef ? "" : "none"
            }
        }, "span", $E("m_keyword_tip"));
        wrap.style.zIndex = 300;
        wrap.style.left = (Core.Dom.getXY(this.input)[0] - Core.Dom.getXY(wrap.parentNode)[0]) + "px";
        wrap.style.top = (Core.Dom.getElementsByClass(wrap.parentNode, "div", "head_menu")[0].offsetTop + this.panel.offsetTop + this.panel.offsetHeight) + "px";
        this.wrap = wrap;
        this.searchBlog = $E(id + "_blog");
        this.searchAuthor = $E(id + "_author");
        this.curIndex = 0;
        this.elements = $E(id + "_content").getElementsByTagName("li");
        var othis = this;
        for (var i = 0, els = this.elements, el; i < els.length; i++) {
            var el = els[i];
            el.onclick = Core.Function.bind3(othis.setCurElement, othis, [i, el, "click"]);
            el.onmouseover = Core.Function.bind3(othis.setCurElement, othis, [i, el, "mouseover"]);
            el.onmouseout = Core.Function.bind3(othis.setCurElement, othis, [i, el, "mouseout"])
        }
    },
    setCurElement: function (index, el, type) {
        var event = Core.Events.getEvent();
        this.curIndex = index;
        this.curElement = el;
        this.complete();
        this.curElement = this.elements[this.curIndex];
        if (type == "mouseout") {
            var relatedTarget = event.relatedTarget || event.toElement;
            if (relatedTarget && relatedTarget.nodeType == 1) {
                if (relatedTarget.tagName.toLowerCase() == "li") {
                    this.elements[this.curIndex].className = ""
                }
            }
        }
        if (type == "mouseover") {
            this.setBackGroud(el)
        }
        if (type == "click") {
            Core.Events.fireEvent(this.subbtn, "click");
            Core.Events.stopEvent(event);
            return false
        }
    },
    setBackGroud: function (el) {
        for (var i = 0, len = this.elements.length, els = this.elements; i < len; i++) {
            var cur = els[i];
            if (cur != el) {
                cur.className = ""
            } else {
                cur.className = "cur"
            }
        }
    },
    fileElement: function (event) {
        if (App.focusblur) {
            App.focusblur()
        }
        if (scope.$GFW == 1) {
            return
        }
        var event = Core.Events.getEvent();
        var str = this.input.value;
        str = Core.String.trim(str);
        var _txt = $E("m_keyword").value.replace(/^\s+|\s+$/g, "");
        var _isDef = _txt == "" || _txt == ((scope.$GFW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002);
        if (_isDef) {
            this.wrap.style.display = "none"
        } else {
            this.wrap.style.display = "";
            this.clipStart()
        }
        if (Core.String.byteLength(str) > this.maxLen) {
            str = Core.String.leftB(str, this.maxLen - 1) + "..."
        }
        this.searchBlog.innerHTML = Core.String.encodeHTML(str);
        this.searchAuthor.innerHTML = Core.String.encodeHTML(str);
        Core.Events.addEvent(this.input, function () {
            var _txt = $E("m_keyword").value.replace(/^\s+|\s+$/g, "");
            var _isDef = _txt == "" || _txt == ((scope.$GFW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002);
            App.Dom.getBy(function (el) {
                if (el.getAttribute("act") == "def") {
                    el.style.display = _isDef ? "" : "none"
                }
                if (el.getAttribute("act") == "isinput") {
                    el.style.display = !_isDef ? "" : "none"
                }
                if (el.getAttribute("act") == "txt") {
                    el.innerHTML = _txt
                }
            }, "span", $E("m_keyword_tip"))
        }, "keyup");
        return this
    },
    keydown: function (event) {
        event = event || window.event;
        if (event.keyCode == "38" || event.keyCode == "37") {
            this.curIndex--
        }
        if (event.keyCode == "40" || event.keyCode == "39") {
            this.curIndex++
        }
        this.curIndex = this.complete();
        if (this.curElement == this.elements[this.curIndex]) {
            return true
        }
        if (this.curElement) {
            this.curElement.className = "";
            this.curElement = null
        }
        this.curElement = this.elements[this.curIndex];
        this.curElement.className = "cur";
        this.url = this.curElement.getAttribute("url")
    },
    clipStart: function () {
        if (this.wrap.style.visibility != "visible") {
            this.clip.startClip()
        }
    },
    complete: function () {
        if (this.curIndex < 0) {
            this.curIndex = this.elements.length - 1
        }
        if (this.curIndex >= this.elements.length) {
            this.curIndex = 0
        }
        return this.curIndex
    },
    removeElement: function () {
        this.wrap.style.visibility = "hidden";
        this.clip.stopClip();
        this.wrap.style.display = "none"
    }
};
(function () {
    var tips = App.builder2({
        template: '<div class="inter_tip" id="outer" style="position:absolute"><div class="tipcontent" id="inner"></div><div class="tipbt"></div></div>'
    });
    var setTips = function () {
        document.body.appendChild(tips.domList.outer);
        tips.domList.outer.style.zIndex = 200;
        var pos = Core.Dom.getXY($E("cancelfollow"));
        tips.domList.outer.style.left = (pos[0] - 45) + "px";
        tips.domList.outer.style.top = (pos[1] - 70) + "px";
        tips.domList.inner.innerHTML = $CLTMSG.CY0107
    };
    var bindTips = function () {
        if ($E("cancelfollow")) {
            setTips();
            $E("cancelfollow").onmouseover = function () {
                tips.domList.outer.style.display = ""
            };
            $E("cancelfollow").onmouseout = function () {
                tips.domList.outer.style.display = "none"
            };
            tips.domList.outer.style.display = "none"
        } else {
            tips.domList.outer.style.display = "none";
            setTimeout(bindTips, 2000)
        }
    };
    bindTips();
    App.followOper = function (type, uid, el, param, name, conf) {
        if (!scope.$uid) {
            location.replace("/login.php?url=" + encodeURIComponent(location.href));
            return false
        }
        if (scope.$cuser_status === "nofull") {
            App.finishInformation();
            return false
        }
        if (scope.$uid == "123456") {
            var arg = arguments[0];
            type = arg[0];
            uid = arg[1];
            el = arg[2];
            param = arg[3];
            name = arg[4]
        }
        var delay = 1;
        var url = "";
        var p = $C("div");
        if (type == "add") {
            bindTips();
            url = "/attention/aj_addfollow.php";
            if (conf) {
                url += ("?" + App.jsonToQuery(conf))
            }
            if (scope.isfans) {
                p.className = "MIB_btn_inter lf";
                p.innerHTML = $CLTMSG.CY0105 + '<span class="MIB_line_sp">|</span><a id="cancelfollow" onclick="App.removeFollow(\'' + uid + "',this,'" + name + '\')" href="javascript:void(0);"><em>' + $CLTMSG.CD0005 + "</em></a>"
            } else {
                p.className = "MIB_btn2 lf";
                p.innerHTML = $CLTMSG.CD0004 + '<span class="MIB_line_sp">|</span><a id="cancelfollow" onclick="App.removeFollow(\'' + uid + "',this,'" + name + '\')" href="javascript:void(0);"><em>' + $CLTMSG.CD0005 + "</em></a>"
            }
            if (scope.$pageid == "profile" && Core.Dom.getElementsByClass(document, "DIV", "roommate").length > 0) {
                Core.Dom.getElementsByClass(document, "DIV", "roommate")[0].style.display = "";
                var rm = Core.Dom.getElementsByClass(document, "DIV", "roommate")[0];
                var a = Core.Dom.getElementsByAttr(rm, "action", "groupselector")[0];
                var b = App.group_selector.person(a);
                (function (k) {
                    a.onclick = function (e) {
                        App.group_selector.dropBox.moveTo(k).show();
                        Core.Events.stopEvent(e)
                    }
                })(b)
            }
            if (scope.$pageid == "profile") {
                if (scope.setGroup) {
                    scope.setGroup.show = true
                }
                if (scope.nickname) {
                    scope.nickname.show = true
                }
                if ($E("line")) {
                    $E("line").style.display = ""
                }
                if ($E("setgroup")) {
                    $E("setgroup").style.display = ""
                }
            }
        } else {
            url = "/attention/aj_delfollow.php";
            if (scope.$pageid == "profile" && Core.Dom.getElementsByClass(document, "DIV", "roommate").length > 0) {
                var rm = Core.Dom.getElementsByClass(document, "DIV", "roommate")[0];
                rm.style.display = "none";
                Core.Dom.getElementsByAttr(rm, "action", "groupselector")[0].setAttribute("groupids", "");
                Core.Dom.getElementsByClass(document, "DIV", "downmenu downmenuAttr")[0].style.display = "none"
            }
            if (scope.$pageid == "profile") {
                if (scope.setGroup) {
                    scope.setGroup.show = false;
                    scope.setGroup.gids = ""
                }
                if (scope.nickname) {
                    scope.nickname.show = false;
                    scope.nickname.remarkName = "";
                    if ($E("remark_name")) {
                        $E("remark_name").innerHTML = ""
                    }
                }
                if ($E("line")) {
                    $E("line").style.display = "none"
                }
                if ($E("setgroup")) {
                    $E("setgroup").style.display = "none"
                }
            }
            p.className = "lf";
            var imgURI = scope.$BASEIMG + "style/images/common/transparent.gif";
            p.innerHTML = '<a href="javascript:void(0);" onclick="App.followOne(\'' + uid + "',this,'" + name + '\')" class="btn_add"><img class="SG_icon" src="' + imgURI + '" title="' + $CLTMSG.CD0006 + '"><em>' + $CLTMSG.CD0006 + "</em></a>"
        }
        function cb(json) {
            if (scope.$uid == "123456") {
                location.reload()
            } else {
                if (el) {
                    el.ask_following = true
                }
                setTimeout(function () {
                    while (el.nodeName.toLowerCase(0) != "div") {
                        el = el.parentNode
                    }
                    Core.Dom.replaceNode(p, el);
                    try {
                        if (type == "add" && scope.$pageid == "profile") {
                            App.grpDialog(scope.setGroup, true)
                        }
                        if (type == "remove" && scope.$pageid == "profile") {
                            window.location.reload(true)
                        }
                    } catch (e) {}
                }, delay)
            }
        }
        function ecb(json) {
            if (el) {
                el.ask_following = false
            }
            if (json && json.code == "MR0050") {
                App.forbidrefresh(function () {
                    param.retcode = scope.doorretcode;
                    App.doRequest(param, url, cb, ecb)
                }, "/attention/aj_addfollow.php")
            } else {
                App.flyDialog(json, null, null, {
                    ok: function () {
                        if (scope.$uid == "123456") {
                            location.reload()
                        }
                    }
                })
            }
        }
        App.doRequest(param, url, cb, ecb)
    }
})();
App.followOne = function (uid, el, name, conf) {
    if (el.ask_following) {
        return false
    }
    App.followOper("add", uid, el, {
        uid: uid,
        fromuid: scope.$uid
    }, name, conf)
};
App.removeFollow = (function () {
    var current;
    return function (uid, el, name) {
        var pos = Core.Dom.getXY(el);
        var x = pos[0] - ((200 - el.offsetWidth) / 2);
        var y = pos[1] - (el.offsetHeight) - 70;
        var msg = [$CLTMSG.CD0007, name, "?"].join("");
        App.PopUpConfirm().position(x, y).content(msg).icon(4).yes(function () {
            App.followOper("remove", uid, el, {
                touid: uid,
                fromuid: scope.$uid
            }, name)
        }).no(function () {
            el.isOpened = null
        }).wipe("up", true)
    }
})();
App.focusblur = function () {
    var el = Core.Events.getEventTarget();
    var event = Core.Events.getEvent();
    var txt = (scope.$GFW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002;
    txt = txt || $CLTMSG.CD0008;
    if (event.type == "focus") {
        if (el.value == txt || el.value == $CLTMSG.CD0008) {
            el.value = ""
        }
    }
    if (event.type == "blur") {
        if (el.value == "") {
            el.value = txt;
            if ($E("m_keyword_tip")) {
                $E("m_keyword_tip").style.display = "none"
            }
        }
    }
};
(function (proxy) {
    proxy.tabs = function (spec) {
        var that = {};
        spec.current = spec.current || 0;
        for (var i = 0, len = spec.data.length; i < len; i += 1) {
            Core.Events.addEvent(spec.data[i].tab, (function (k) {
                return function () {
                    if (spec.current >= 0) {
                        spec.darkAction(spec.data[spec.current], k)
                    }
                    spec.current = k;
                    spec.lightAction(spec.data[spec.current], k)
                }
            })(i), "click")
        }
        that.fire = function (index) {
            Core.Events.fireEvent(spec.data[index]["tab"], "click")
        };
        return that
    }
})(App);
App.delDialog = function (sText, sPostApi, oPost, fCallBack, fError, oFormTarget, sTitle) {
    var oDialog = App.flyDialog(sText, "confirm", oFormTarget || null, {
        ok: function () {
            if ($E("block_user") && $E("block_user").checked) {
                oPost.isblack = "OK"
            }
            Utils.Io.Ajax.request(sPostApi, {
                POST: oPost,
                onComplete: function (json) {
                    if (json && json.code == "A00006") {
                        fCallBack(json)
                    } else {
                        fError(json)
                    }
                },
                onException: fError,
                returnType: "json"
            })
        },
        icon: 4,
        title: sTitle
    });
    return oDialog
};
App.autoHeightTextArea = function (oNode, fInputListener, nMaxHeight) {
    oNode = $E(oNode);
    fInputListener = fInputListener ||
    function () {};
    var listener = function (nMaxHeight) {
        if (fInputListener) {
            fInputListener()
        }
        var nViewHeight;
        var sScrollStyle;
        var nSnapHeight = App.getTextAreaHeight(this);
        nMaxHeight = nMaxHeight || nSnapHeight;
        if (nSnapHeight > nMaxHeight) {
            nViewHeight = nMaxHeight;
            if (this.style.overflowY === "hidden") {
                this.style.overflowY = "auto"
            }
        } else {
            nViewHeight = nSnapHeight;
            if (this.style.overflowY === "auto") {
                this.style.overflowY = "hidden"
            }
        }
        this.style.height = Math.min(nMaxHeight, nSnapHeight) + "px"
    };
    if (oNode.binded == null) {
        Core.Events.addEvent(oNode, Core.Function.bind3(listener, oNode, [nMaxHeight]), "keyup");
        Core.Events.addEvent(oNode, Core.Function.bind3(listener, oNode, [nMaxHeight]), "focus");
        Core.Events.addEvent(oNode, Core.Function.bind3(listener, oNode, [nMaxHeight]), "blur");
        oNode.binded = true;
        oNode.style.overflowY = "hidden";
        oNode.style.overflowX = "hidden"
    }
};
App.getTextAreaHeight = function (oNode) {
    oNode = $E(oNode);
    if (oNode.defaultHeight == null) {
        oNode.defaultHeight = window.parseInt(Core.Dom.getStyle(oNode, "height"))
    }
    var snapHeight;
    if ($IE) {
        snapHeight = Math.max(oNode.scrollHeight, oNode.defaultHeight)
    } else {
        var textArea = $E("_____textarea_____");
        if (textArea == null) {
            textArea = document.createElement("textarea");
            textArea.id = "_____textarea_____";
            document.getElementsByTagName("body")[0].appendChild(textArea)
        }
        if (textArea.currentTarget != oNode) {
            textArea.style.top = "-1000px";
            textArea.style.height = "0px";
            textArea.style.position = "absolute";
            textArea.style.overflow = "hidden";
            textArea.style.width = Core.Dom.getStyle(oNode, "width");
            textArea.style.fontSize = Core.Dom.getStyle(oNode, "fontSize");
            textArea.style.fontFamily = Core.Dom.getStyle(oNode, "fontFamily");
            textArea.style.lineHeight = Core.Dom.getStyle(oNode, "lineHeight");
            textArea.style.paddingLeft = Core.Dom.getStyle(oNode, "paddingLeft");
            textArea.style.paddingRight = Core.Dom.getStyle(oNode, "paddingRight");
            textArea.style.paddingTop = Core.Dom.getStyle(oNode, "paddingTop");
            textArea.style.paddingBottom = Core.Dom.getStyle(oNode, "paddingBottom")
        }
        textArea.value = oNode.value;
        snapHeight = Math.max(textArea.scrollHeight, oNode.defaultHeight);
        textArea.currentTarget = oNode
    }
    return snapHeight
};
App.msgPublisher = function (oElement, oConfig, bRefresh, fCallBack) {
    oElement = oElement || {};
    oConfig = oConfig || {
        limit: 600,
        postUrl: "/message/addmsg.php",
        normClass: "btn_normal",
        disabledClass: "btn_notclick"
    };
    var msgPublisher = {};
    msgPublisher.limit = (function (e, c) {
        return function () {
            var snapText = e.editor.value;
            var snapLength = Core.String.byteLength(snapText);
            if (snapLength > c.limit) {
                e.editor.value = Core.String.leftB(snapText, c.limit)
            }
        }
    })(oElement, oConfig);
    App.autoHeightTextArea(oElement.editor, msgPublisher.limit, oConfig.maxHeight || null);
    msgPublisher.submit = (function (e, c) {
        return function () {
            try {
                if (!e.submit.lock) {
                    e.submit.className = c.disabledClass || e.submit.className;
                    e.submit.lock = true;
                    var nick = Core.String.trim(e.nick.value);
                    if (!nick || nick == $CLTMSG.CD0049) {
                        e.submit.className = c.normClass || e.submit.className;
                        e.submit.lock = false;
                        e.info.innerHTML = $SYSMSG.M01100;
                        e.info.style.display = "";
                        return
                    }
                    var content = Core.String.trim(e.editor.value);
                    if (!content) {
                        e.submit.className = c.normClass || e.submit.className;
                        e.submit.lock = false;
                        e.info.innerHTML = $SYSMSG.M07001;
                        e.info.style.display = "";
                        return
                    }
                    var oPost = {
                        content: encodeURIComponent(content),
                        name: encodeURIComponent(nick)
                    };
                    Utils.Io.Ajax.request(c.postUrl, {
                        POST: oPost,
                        onComplete: function (oResult) {
                            e.submit.className = c.normClass || e.submit.className;
                            e.submit.lock = false;
                            if (oResult.code == "A00006") {
                                if (fCallBack) {
                                    fCallBack()
                                }
                                if (bRefresh) {
                                    window.location.reload(true)
                                } else {
                                    var al = App.alert($SYSMSG.M09003, {
                                        icon: 3,
                                        hasBtn: false
                                    });
                                    setTimeout(function () {
                                        al.close()
                                    }, 1000)
                                }
                            } else {
                                if (oResult.code == "M00003") {
                                    App.ModLogin(function () {
                                        window.location.reload(true)
                                    })
                                } else {
                                    e.info.innerHTML = $SYSMSG[oResult.code];
                                    e.info.style.display = ""
                                }
                            }
                        },
                        onException: function () {
                            e.submit.className = c.normClass || e.submit.className;
                            e.submit.lock = false
                        },
                        returnType: "json"
                    })
                }
            } catch (error) {}
        }
    })(oElement, oConfig);
    if (oElement.editor) {
        Core.Events.addEvent(oElement.editor, function (event) {
            if ((event.ctrlKey == true && event.keyCode == "13") || (event.altKey == true && event.keyCode == "83")) {
                oElement.editor.blur();
                msgPublisher.submit()
            }
        }, "keyup")
    }
    if (oElement.nick) {
        Core.Events.addEvent(oElement.nick, (function (n) {
            return function () {
                if (n.value === $CLTMSG.CD0049) {
                    n.value = ""
                }
                n.style.color = "#333333"
            }
        })(oElement.nick), "focus");
        Core.Events.addEvent(oElement.nick, (function (n) {
            return function () {
                if (Core.String.trim(n.value) == "") {
                    n.value = $CLTMSG.CD0049
                }
                n.style.color = "#999999"
            }
        })(oElement.nick), "blur");
        oElement.nick.value = oElement.nick.value || $CLTMSG.CD0049;
        oElement.nick.style.color = "#999999"
    }
    if (oElement.submit) {
        Core.Events.addEvent(oElement.submit, msgPublisher.submit, "click")
    }
    return msgPublisher
};
App.simpleAjax = function (url, success, error, fail) {
    var req, res, error;
    req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {
        return
    }
    req.onreadystatechange = function () {
        try {
            if (req.readyState == 4) {
                res = eval("(" + req.responseText + ")");
                if (res && res.code == "A00006") {
                    success && success(res);
                    return
                }
                error && error(res)
            }
        } catch (e) {
            fail && fail(e.message);
            return false
        }
    };
    try {
        req.open("GET", url, true);
        req.send(null)
    } catch (e) {
        fail && fail(e.message);
        return false
    }
    return {
        abort: function () {
            req.abort();
            return false
        }
    }
};
var swfobject = function () {
    var D = "undefined",
        r = "object",
        S = "Shockwave Flash",
        W = "ShockwaveFlash.ShockwaveFlash",
        q = "application/x-shockwave-flash",
        R = "SWFObjectExprInst",
        x = "onreadystatechange",
        O = window,
        j = document,
        t = navigator,
        T = false,
        U = [h],
        o = [],
        N = [],
        I = [],
        l, Q, E, B, J = false,
        a = false,
        n, G, m = true,
        M = function () {
            var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
                ah = t.userAgent.toLowerCase(),
                Y = t.platform.toLowerCase(),
                ae = Y ? /win/.test(Y) : /win/.test(ah),
                ac = Y ? /mac/.test(Y) : /mac/.test(ah),
                af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                X = !+"\v1",
                ag = [0, 0, 0],
                ab = null;
            if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                ab = t.plugins[S].description;
                if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                    T = true;
                    X = false;
                    ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                    ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else {
                if (typeof O.ActiveXObject != D) {
                    try {
                        var ad = new ActiveXObject(W);
                        if (ad) {
                            ab = ad.GetVariable("$version");
                            if (ab) {
                                X = true;
                                ab = ab.split(" ")[1].split(",");
                                ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                            }
                        }
                    } catch (Z) {}
                }
            }
            return {
                w3: aa,
                pv: ag,
                wk: af,
                ie: X,
                win: ae,
                mac: ac
            }
        }(),
        k = function () {
            if (!M.w3) {
                return
            }
            if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
                f()
            }
            if (!J) {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("DOMContentLoaded", f, false)
                }
                if (M.ie && M.win) {
                    j.attachEvent(x, function () {
                        if (j.readyState == "complete") {
                            j.detachEvent(x, arguments.callee);
                            f()
                        }
                    });
                    if (O == top) {
                        (function () {
                            if (J) {
                                return
                            }
                            try {
                                j.documentElement.doScroll("left")
                            } catch (X) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            f()
                        })()
                    }
                }
                if (M.wk) {
                    (function () {
                        if (J) {
                            return
                        }
                        if (!/loaded|complete/.test(j.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
                s(f)
            }
        }();

    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }
    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }
    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function () {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }
    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }
    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function () {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        } else {
            H()
        }
    }
    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {
                    success: false,
                    id: Y
                };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }
    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }
    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }
    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {
            success: false,
            id: X
        };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
                ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function () {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }
    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function () {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }
    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }
    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }
    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }
    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function () {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }
    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }
    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z)
        } catch (Y) {}
        return X
    }
    function C(X) {
        return j.createElement(X)
    }
    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }
    function F(Z) {
        var Y = M.pv,
            X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
    }
    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }
    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }
    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }
    var d = function () {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function () {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function (ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            } else {
                if (Z) {
                    Z({
                        success: false,
                        id: ab
                    })
                }
            }
        },
        getObjectById: function (X) {
            if (M.w3) {
                return z(X)
            }
        },
        embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {
                success: false,
                id: ah
            };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function () {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            } else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        } else {
                            w(ah, true)
                        }
                    }
                    if (ac) {
                        ac(X)
                    }
                })
            } else {
                if (ac) {
                    ac(X)
                }
            }
        },
        switchOffAutoHideShow: function () {
            m = false
        },
        ua: M,
        getFlashPlayerVersion: function () {
            return {
                major: M.pv[0],
                minor: M.pv[1],
                release: M.pv[2]
            }
        },
        hasFlashPlayerVersion: F,
        createSWF: function (Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X)
            } else {
                return undefined
            }
        },
        showExpressInstall: function (Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        },
        removeSWF: function (X) {
            if (M.w3) {
                y(X)
            }
        },
        createCSS: function (aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        },
        addDomLoadEvent: K,
        addLoadEvent: s,
        getQueryParamValue: function (aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function () {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
}();
Core.Dom.setStyle = function (el, property, val) {
    switch (property) {
    case "opacity":
        el.style.filter = "alpha(opacity=" + (val * 100) + ")";
        if (!el.currentStyle || !el.currentStyle.hasLayout) {
            el.style.zoom = 1
        }
        break;
    case "float":
        property = "styleFloat";
    default:
        el.style[property] = val
    }
};
if (!Core.Base.detect.$IE) {
    Core.Dom.setStyle = function (el, property, val) {
        if (property == "float") {
            property = "cssFloat"
        }
        el.style[property] = val
    }
}
App.iframeMask = function (zIndex, fResize) {
    var IM = {};
    var oParent = IM.oParent = document.getElementsByTagName("body")[0];
    var oMask = IM.oMask = oParent.appendChild($C("div"));
    var oProtective = IM.oProtective = oParent.appendChild($C("iframe"));
    oProtective.frameborder = 0;
    var oMStyle = oMask.style;
    var oPStyle = oProtective.style;
    var oPStyle = oProtective.style;
    oMStyle.top = oPStyle.top = "0px";
    oMStyle.left = oPStyle.left = "0px";
    oMStyle.overflow = oPStyle.overflow = "hidden";
    oMStyle.border = oPStyle.border = "0px";
    oMStyle.position = oPStyle.position = "absolute";
    oMStyle.display = oPStyle.display = "none";
    oMStyle.backgroundColor = oPStyle.backgroundColor = "#000000";
    oMStyle.zIndex = zIndex || 799;
    oPStyle.zIndex = (zIndex - 1) || 798;
    Core.Dom.setStyle(oMask, "opacity", "0.15");
    Core.Dom.setStyle(oProtective, "opacity", "0");
    IM.oMaskResize = (function (p) {
        return function () {
            var pageSize = Core.System.pageSize();
            p.oMask.style.width = p.oProtective.style.width = Math.max(document.body.scrollWidth, (document.documentElement) ? document.documentElement.scrollWidth : 0) + "px";
            p.oMask.style.height = p.oProtective.style.height = pageSize[1] + "px";
            if (fResize) {
                fResize(pageSize)
            }
        }
    })(IM);
    IM.hidden = (function (p) {
        return function () {
            p.oMask.style.display = p.oProtective.style.display = "none"
        }
    })(IM);
    IM.show = (function (p) {
        return function () {
            p.oMask.style.display = p.oProtective.style.display = "block"
        }
    })(IM);
    IM.oMaskResize();
    Core.Events.addEvent(window, IM.oMaskResize, "resize");
    return IM
};
App.PopUpSwfPlayer = (function () {
    var popUp, panel, view, clock, ce = Core.Events,
        add = ce.addEvent,
        unadd = ce.removeEvent;
    return function (url) {
        var id = "view_ani",
            w = window,
            d = document,
            dd = d.documentElement || {},
            b = d.body;
        if (scope.statistics) {
            scope.statistics({
                type: "ani",
                source: encodeURIComponent(url)
            })
        }
        if (!swfobject.hasFlashPlayerVersion("9.0.0")) {
            App.alert({
                code: "CD0084"
            });
            return
        }
        if (!panel) {
            document.body.appendChild(panel = $C("div"));
            panel.style.position = "absolute";
            panel.style.zIndex = "2012"
        }
        panel.style.display = "";
        if (!view) {
            panel.innerHTML = "";
            panel.appendChild(view = $C("div"));
            view.id = id;
            view.innerHTML = ['<div style="padding-left:202px;padding-top:172px;"><center><img src="', [scope.$BASECSS, "style/images/common/loading.gif"].join(""), '"/></center></div>'].join("")
        }
        var justify = function (size) {
            var top = w.pageYOffset || Math.max(dd.scrollTop, b.scrollTop);
            panel.style.left = (size[2] - 440) / 2 + "px";
            panel.style.top = ((size[3] - 360) / 2 + top) + "px"
        };
        if (!popUp) {
            popUp = App.iframeMask(2000, justify)
        } else {
            justify(Core.System.pageSize())
        }
        var flashParams = {
            id: "view_ani",
            quality: "high",
            allowScriptAccess: "never",
            wmode: "transparent",
            allowFullscreen: true,
            allownetworking: "internal"
        };
        var flashVars = {
            playMovie: "true"
        };
        var clear = function (e) {
            if (e && e.keyCode !== 27 && e.type !== "mouseup") {
                return
            }
            clearInterval(clock);
            swfobject.removeSWF(id);
            panel.style.display = "none";
            view = null;
            popUp.hidden();
            unadd(b, clear, "keyup");
            unadd(b, clear, "mouseup");
            if (!e) {
                return
            }
            Core.Events.stopEvent()
        };
        swfobject.embedSWF(url, id, "440", "360", "10.0.0", null, flashVars, flashParams);
        popUp.show();
        w.clearInterval(clock);
        clock = setInterval(function () {
            var swf = swfobject.getObjectById(id),
                snap = 0;
            if (swf && swf.PercentLoaded() == 100) {
                w.clearInterval(clock);
                clock = setInterval(function () {
                    var c = swf.CurrentFrame(),
                        t;
                    try {
                        t = swf.TotalFrames()
                    } catch (e) {
                        t = swf.TotalFrames
                    }
                    if (c < 0) {
                        return
                    }
                    if (c < t && snap <= c) {
                        snap = c
                    } else {
                        clear()
                    }
                }, 80)
            }
        }, 100);
        add(b, clear, "keyup");
        add(popUp.oMask, clear, "mouseup");
        popUp.oMask.title = $CLTMSG.CF0105
    }
})();
App.group = function (items, action, setClass) {
    var it = {},
        i = 0,
        len = items.length,
        selectedStyle, unselectedStyle, add = Core.Events.addEvent;
    it.current = -1;
    it.items = items;
    it.selected;
    selectedStyle = setClass && setClass.selected || null;
    unselectedStyle = setClass && setClass.unselected || null;
    for (i; i < len; i++) {
        (function (item, index) {
            add(item, function (e) {
                if (it.current == index && setClass) {
                    return
                }
                unselectedStyle && (it.current != -1) && (items[it.current].className = unselectedStyle);
                selectedStyle && (item.className = selectedStyle);
                it.current = index;
                action(item, index, it);
                return false
            }, "mouseup")
        })(items[i], i)
    }
};
(function () {
    var d = document,
        api = "/face/aj_face.php",
        ce = Core.Events,
        cs = Core.String,
        st = ce.stopEvent,
        add = ce.addEvent,
        unadd = ce.removeEvent,
        fire = ce.fireEvent,
        ajax = App.simpleAjax,
        getXY = Core.Dom.getXY,
        group = App.group,
        removeAll = App.removeChildren,
        popUp = App.PopUp,
        req;

    function b2(t, b) {
        return App.builder3(t, b, {
            dd: "id",
            mm: "action"
        })
    }
    function encodeTitle(value) {
        return value.replace(/[^\w\u4e00-\u9fa5\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u2014\uff3f]/g, "")
    }
    App.showFaces = (function () {
        var cache = {},
            dom, panel, inited = false,
            hotinited = false,
            insertFunc, setCss = {
                selected: "cur",
                unselected: " "
            };
        splitHTML = '<li class="magiclicur" style="visibility:hidden">|</li>', panelHTML = '<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox phiz_layerN"><div class="layerBoxTop"><div class="layerArrow" style="left:6px;"></div><div class="topCon"><ul class="phiz_menu"><li id="face" class="cur"><a href="#" onclick="this.blur();return false;">' + $CLTMSG.CL0901 + '</a></li><li id="ani" act="topTab" class="magic"><a href="#" onclick="this.blur();return false;"><strong></strong>' + $CLTMSG.CL0902 + '</a></li></ul><a id="close" href="#" onclick="return false;" title="' + $CLTMSG.CL0701 + '" class="close"></a><div class="clearit"></div></div></div><div class="magicT"><div class="magicTL"><ul id="tab"></ul></div><div class="magicTR"><a href="#" onclick="return false;" id="prevBtn" class="magicbtnL02" title="' + $CLTMSG.CX0076 + '"></a><a href="#" onclick="return false;" id="nextBtn" title="' + $CLTMSG.CX0077 + '" class="magicbtnR02"></a></div><div class="clear"></div></div><div class="layerBoxCon" style="width:450px;"><div id="hotPanel" class="faceItemPicbgT"><ul id="hot"></ul><div class="clearit"></div></div><div id="normPanel" class="faceItemPicbg"><ul id="norm"></ul><div class="clearit"></div></div><div id="pagePanel" class="magicB"><div id="magicNotes" class="magic_tit" style="display:none">' + $CLTMSG.CL0904 + '</div><div class="pages" id="pageing"></div></div></div></div></td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table>';
        return function (target, editor, offsetX, offsetY, width, flush, fInsertFunc) {
            if (target.tagName == "A") {
                target.href = "####"
            }
            insertFunc = fInsertFunc ||
            function () {
                return false
            };
            if (!inited) {
                panel = popUp().zIndex(1500).content(panelHTML);
                var dom = panel.dom,
                    close = dom.close,
                    hot = dom.hot,
                    hotPanel = dom.hotPanel,
                    magicNotes = dom.magicNotes,
                    norm = dom.norm,
                    normPanel = dom.normPanel,
                    pageing = dom.pageing,
                    prevBtn = dom.prevBtn,
                    nextBtn = dom.nextBtn,
                    tab = dom.tab;
                face = dom.face, ani = dom.ani, cType = 1, tabIndex = 0;

                function insertIcon(data, parent) {
                    removeAll(parent);
                    var i = 0,
                        len = data.length,
                        iconList = [],
                        c, acts, icons, plays, className = "",
                        viewButton = "",
                        nv;
                    for (i; i < len; i++) {
                        c = data[i];
                        nv = encodeTitle(c.title);
                        cType == 1 && (className = 'class="face_box"');
                        cType == 1 && (viewButton = ('<a action="play" title="' + $CLTMSG.CL0912 + '" class="play_btn" href="#" onclick="return false;"></a><span class="face_box_tex">' + (cs.byteLength(nv) > 8 ? cs.leftB(nv, 6) + "..." : nv) + "</span>"));
                        iconList.push(['<li action="icon" title="', nv, '"><a href="#" onclick="return false;" ', className, ">", '<img src="', c.icon, '"/>', "</a>", viewButton, "</li>"].join(""))
                    }
                    acts = b2(iconList.join(""), parent)["actList"];
                    icons = acts.icon;
                    plays = acts.play;
                    if (plays) {
                        group(plays, function (item, index, c) {
                            item.onclick = function () {
                                return false
                            };
                            st();
                            App.PopUpSwfPlayer(data[index].src);
                            return false
                        })
                    }
                    group(icons, function (item, index, c) {
                        item.onclick = function () {
                            return false
                        };
                        setTimeout(function () {
                            tArea.focus()
                        }, 0);
                        setTimeout(function () {
                            var range = tArea.getAttribute("range");
                            var value = data[index].value + " ";
                            if (insertFunc(value)) {} else {
                                if (document.selection) {
                                    var sel = document.selection.createRange();
                                    document.selection.empty();
                                    sel.text = value
                                } else {
                                    if (tArea.setSelectionRange) {
                                        var start = tArea.selectionStart;
                                        var end = tArea.selectionEnd;
                                        var str1 = tArea.value.substring(0, start);
                                        var str2 = tArea.value.substring(end);
                                        var v = str1 + value,
                                            len = v.length;
                                        tArea.value = v + str2;
                                        tArea.setSelectionRange(len, len)
                                    } else {
                                        tArea.value += value
                                    }
                                }
                            }
                            if (reflush) {
                                reflush()
                            }
                            panel.visible(false)
                        }, 200);
                        return false
                    })
                }
                function initPage(data) {
                    removeAll(pageing);
                    var i = 0,
                        len = data.length,
                        pageList = [],
                        pages;
                    if (!len) {
                        return
                    }
                    for (i; i < len; i++) {
                        pageList.push('<a action="pageBtn" href="#" onclick="return false;">' + (i + 1) + "</a>")
                    }
                    pages = b2(pageList.join(""), pageing)["actList"]["pageBtn"];
                    group(pages, function (item, index) {
                        item.onclick = function () {
                            return false
                        };
                        hotPanel.style.display = (!cType && !tabIndex && !index) ? "" : "none";
                        setTimeout(function () {
                            insertIcon(data[index], norm)
                        }, 50);
                        item.blur()
                    }, setCss);
                    pageing.style.display = pages.length < 2 ? "none" : "";
                    fire(pages[0], "mouseup")
                }
                function initTab(json) {
                    removeAll(tab);
                    var data = [{
                        type: $CLTMSG.CL0914,
                        icon: json.data.norm
                    }].concat(json.data.more);
                    var i = 0,
                        len = data.length,
                        current, tabList = [],
                        tabs;
                    for (i; i < len; i++) {
                        current = data[i];
                        if (!current || !current.type) {
                            continue
                        }
                        tabList.push('<li style="visibility:hidden"><a action="tabs" onclick="return false;" href="#">' + current.type + "</a></li>")
                    }
                    if (!tabList.length) {
                        return
                    }
                    tabs = b2(tabList.join(splitHTML), tab)["actList"]["tabs"];
                    group(tabs, function (item, index) {
                        item.onclick = function () {
                            return false
                        };
                        tabIndex = index;
                        initPage(data[index].icon);
                        item.blur()
                    }, {
                        selected: "magicTcur",
                        unselected: " "
                    });
                    fire(tabs[0], "mouseup");
                    var pi = 1,
                        mi = 0,
                        lil = tab.getElementsByTagName("li"),
                        ml = lil.length,
                        pageList = [],
                        step = 0,
                        cacheList = [],
                        pl;
                    setTimeout(function () {
                        for (mi; mi < ml; mi++) {
                            lil[mi].style.visibility = "visible";
                            lil[mi].style.display = "";
                            var width = lil[mi].innerHTML == "|" ? 8 : lil[mi].offsetWidth;
                            if (step + width > 400) {
                                step = 0;
                                pageList.push(cacheList);
                                cacheList = []
                            }
                            lil[mi].style.display = "none";
                            cacheList.push(lil[mi]);
                            step += width
                        }
                        cacheList.length && pageList.push(cacheList);
                        pl = pageList.length - 1;

                        function setPN() {
                            prevBtn.className = pi == 0 ? "magicbtnL01" : "magicbtnL02";
                            nextBtn.className = pi == pl ? "magicbtnR01" : "magicbtnR02"
                        }
                        function toggle(list, b) {
                            var i = 0;
                            len = list.length, end = Math.max(len - 1, 0);
                            for (i; i < len; i++) {
                                list[i].style.visibility = b ? "visible" : "hidden";
                                list[i].style.display = !b ? "none" : ((i == 0 || i == end) && list[i].innerHTML == "|") ? "none" : ""
                            }
                        }
                        function dep(key, n) {
                            var snap = Math[key](pi + n, n > 0 ? pl : 0);
                            if (pi == snap) {
                                setPN();
                                return
                            }
                            pageList[pi] && toggle(pageList[pi], false);
                            pageList[snap] && toggle(pageList[snap], true);
                            pi = snap;
                            setPN()
                        }
                        prevBtn.onclick = function () {
                            dep("max", -1);
                            prevBtn.blur();
                            return false
                        };
                        nextBtn.onclick = function () {
                            dep("min", 1);
                            nextBtn.blur();
                            return false
                        };
                        dep("max", -1)
                    }, 100)
                }
                function onTabChange(item, index, data) {
                    st();
                    item.onclick = function () {
                        return false
                    };
                    removeAll(norm);
                    removeAll(tab);
                    removeAll(pageing);
                    face.className = index ? "" : "cur";
                    ani.className = index ? "magic cur" : "magic";
                    normPanel.className = index ? "magic_list" : "faceItemPicbg";
                    hotPanel.style.display = index ? "none" : "";
                    magicNotes.style.display = index ? "" : "none";
                    pageing.style.display = "none";
                    prevBtn.className = "magicbtnL01";
                    nextBtn.className = "magicbtnR01";
                    prevBtn.onclick = function () {
                        return false
                    };
                    nextBtn.onclick = function () {
                        return false
                    };
                    cType = index;
                    req && req.abort();
                    if (cache[index]) {
                        initTab(cache[index]);
                        return false
                    }
                    norm.innerHTML = '<center><img style="margin-top:10px;margin-bottom:10px" src="' + scope.$BASEIMG + 'style/images/common/loading.gif"/></center>';
                    req = ajax([api, "?type=", index ? "ani" : "face"].join(""), function (json) {
                        var data;
                        if (json.code == "A00006" && (data = json.data)) {
                            initTab(json);
                            if (!hotinited && data.hot) {
                                hotinited = true;
                                insertIcon(data.hot, hot)
                            }
                            cache[index] = json
                        }
                    });
                    item.blur();
                    return false
                }
                group([face, ani], onTabChange);
                inited = true;
                add(close, function () {
                    close.onclick = function () {
                        return false
                    };
                    panel.visible(false);
                    st()
                }, "mouseup");
                add(panel.wrap, function () {
                    st()
                }, "mouseup");
                add(d.body, function () {
                    panel.visible(false)
                }, "mouseup");
                var s = Core.System.winSize();
                add(window, function (event) {
                    var s1 = Core.System.winSize();
                    if (s.width != s1.width || s.height != s1.height) {
                        panel.visible(false);
                        s = s1
                    }
                }, "resize")
            }
            tArea = editor;
            reflush = flush;
            var point = getXY(target);
            panel.position(point[0] + 19 + (offsetX || 0), point[1] + target.offsetHeight + (offsetY || 5));
            fire(face, "mouseup");
            setTimeout(function () {
                panel.visible(true)
            }, 0);
            return false
        }
    })()
})();
(function (proxy) {
    $C = function (tagName) {
        return document.createElement(tagName)
    };
    var adEvent = Core.Events.addEvent;
    var spEvent = Core.Events.stopEvent;
    var rmEvent = Core.Events.removeEvent;
    var position = Core.Dom.getXY;
    var makeItem = function (spec) {
        if (spec === undefined) {
            throw "the dropDown item need parameters"
        }
        spec.text = spec.text || spec.value;
        spec.ele = spec.ele || $C("LI");
        spec.focus = spec.focus ||
        function () {};
        spec.blur = spec.blur ||
        function () {};
        spec.ok = spec.ok ||
        function () {};
        spec.tnode = document.createTextNode("");
        spec.ele.appendChild(spec.tnode);
        spec.ele.setAttribute("unselectable", "on");
        if (spec.itemStyle) {
            spec.ele.style.cssText = spec.itemStyle
        }
        adEvent(spec.ele, function () {
            spec.focus(that)
        }, "mouseover");
        adEvent(spec.ele, function () {
            spec.blur(that)
        }, "mouseout");
        adEvent(spec.ele, function () {
            spEvent();
            spec.ok(that)
        }, "click");
        adEvent(spec.ele, spEvent, "mousedown");
        var that = {};
        that.set = function (key, value) {
            if ((key == "focus" || key == "ok") && typeof value != "function") {
                throw "dropDown item need function as parameters"
            }
            spec[key] = value;
            if (key == "text") {
                spec.ele.innerHTML = value
            }
            if (key == "HTML") {
                spec.ele.innerHTML = value
            }
            return that
        };
        that.get = function (key) {
            return spec[key]
        };
        return that
    };
    var dropDown = function (spec) {
        var that = {};
        if (spec === undefined) {
            spec = {}
        }
        spec.items = [];
        spec.count = 0;
        spec.current = -1;
        spec.key = {
            ENTER: 13,
            ESC: 27,
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            BACK: 8,
            TABLE: 9
        };
        spec.box = $C("DIV");
        spec.shell = $C("UL");
        spec.showing = false;
        spec.box.appendChild(spec.shell);
        document.body.appendChild(spec.box);
        var light = function (item) {
            item = item || spec.items[spec.current];
            spec.light(item.get("ele"))
        };
        var dark = function (item) {
            item = item || spec.items[spec.current];
            if (item) {
                spec.dark(item.get("ele"))
            }
        };
        spec.newItem = function () {
            var item = makeItem({
                ok: spec.select,
                focus: function (item) {
                    if (spec.items[spec.current]) {
                        dark()
                    }
                    spec.current = item.index;
                    light()
                },
                itemStyle: spec.itemStyle
            });
            spec.shell.appendChild(item.get("ele"));
            return item
        };
        spec.getItem = function (k) {
            if (!spec.items[k]) {
                spec.items[k] = spec.newItem();
                spec.items[k].index = k
            }
            return spec.items[k]
        };
        spec.up = function () {
            if (spec.current >= spec.count || spec.current <= 0) {
                dark(spec.items[0]);
                spec.current = spec.count - 1
            } else {
                dark();
                spec.current -= 1
            }
            light()
        };
        spec.down = function () {
            if (spec.current >= spec.count - 1 || spec.current < 0) {
                dark(spec.items[spec.count - 1]);
                spec.current = 0
            } else {
                dark();
                spec.current += 1
            }
            light()
        };
        spec.open = function () {
            spec.box.style.display = "";
            adEvent(document.documentElement, spec.hotKey, "keydown");
            spec.showing = true
        };
        spec.close = function () {
            spec.box.style.display = "none";
            if ($E("_iframe4select_")) {
                $E("_iframe4select_").style.display = "none"
            }
            rmEvent(document.documentElement, spec.hotKey, "keydown");
            spec.showing = false
        };
        spec.hotKey = function (e) {
            var ev = window.event || e;
            var code = ev.keyCode;
            if (code == spec.key.UP) {
                spec.up();
                spEvent();
                return false
            } else {
                if (code == spec.key.DOWN) {
                    spec.down();
                    spEvent();
                    return false
                } else {
                    if (code == spec.key.ESC) {
                        spec.close();
                        spEvent();
                        return false
                    }
                }
            }
        };
        that.show = function (el) {
            spec.open();
            return that
        };
        that.hidd = function (el) {
            spec.close();
            if (spec.current !== -1) {
                dark()
            }
            spec.current = -1;
            return that
        };
        that.light = function (index) {
            light(spec.items[index]);
            return that
        };
        that.dark = function (index) {
            dark(spec.items[index]);
            return that
        };
        that.data = function (param) {
            for (var i = 0, len = param.length; i < len; i += 1) {
                spec.getItem(i).set("text", param[i]["text"]).set("value", param[i]["value"]).get("ele").style.display = ""
            }
            for (var i = param.length, len = spec.items.length; i < len; i += 1) {
                spec.getItem(i).get("ele").style.display = "none"
            }
            spec.count = param.length;
            dark();
            spec.current = -1;
            return that
        };
        that.pushData = function (param) {
            for (var i = 0, len = param.length; i < len; i += 1) {
                spec.getItem(spec.count + i).set("text", param[i]["text"]).set("value", param[i]["value"])
            }
            spec.count += param.length;
            return that
        };
        that.set = function (key, value) {
            if (key === "position") {
                spec.box.style.left = value[0] + "px";
                spec.box.style.top = value[1] + "px"
            }
            return that
        };
        that.get = function (key) {
            if (key === "current") {
                return spec.items[spec.current]
            }
            if (key === "index") {
                return spec.current
            }
            return spec[key]
        };
        return that
    };
    var infoTips = function (spec) {
        var that = {};
        spec.box = document.createElement("DIV");
        spec.box.innerHTML = spec.info;
        if (spec.style) {
            spec.box.style.cssText = spec.style
        }
        if (spec.className) {
            spec.box.className = spec.className
        }
        spec.box.style.position = "absolute";
        spec.box.style.display = "none";
        document.body.appendChild(spec.box);
        that.show = function () {
            spec.box.style.display = ""
        };
        that.hidd = function () {
            spec.box.style.display = "none"
        };
        that.set = function (key, value) {
            if (key === "position") {
                spec.box.style.left = value[0] + "px";
                spec.box.style.top = value[1] + "px"
            }
            return that
        };
        that.get = function (key) {
            return spec[key]
        };
        return that
    };
    var searchInfo = function (spec) {
        var that = {};
        var defaultSearch = function (key, cb) {
            if (spec.data.length === 0 || !key) {
                setTimeout(function () {
                    cb([])
                }, 0)
            } else {
                var res = [];
                for (var i = 0, len = spec.data.length; i < len; i += 1) {
                    if (spec.data[i].value.indexOf(key) != -1) {
                        res[res.length] = spec.data[i]
                    }
                }
                setTimeout(function () {
                    cb(res)
                }, 0)
            }
        };
        ajax = function (key, cb) {
            Utils.Io.Ajax.request(spec.data, {
                GET: {
                    key: key
                },
                onComplete: function (json) {
                    if (json.code === "A00006") {
                        if (typeof spec.search === "function") {
                            json.data = spec.search(json.data)
                        }
                        cb(json.data)
                    }
                },
                returnType: "json"
            })
        };
        jsonp = function () {};
        if (spec.type === "ajax") {
            defaultSearch = ajax
        } else {
            if (spec.type === "jsonp") {
                defaultSearch = jsonp
            } else {
                if (typeof spec.search === "function") {
                    defaultSearch = spec.search
                }
            }
        }
        that.result = function (key, cb) {
            defaultSearch(key, cb)
        };
        that.set = function (key, value) {
            spec[key] = value;
            return that
        };
        return that
    };
    proxy.autoComplate = function (spec) {
        if (!spec.input) {
            throw "the autoComplate need an input as an parameter"
        }
        var timeHandle = null;
        var search = searchInfo({
            type: spec.type,
            data: spec.data,
            search: spec.search
        });
        var dropper = dropDown({
            select: function (item) {
                spec.ok(item.get("value"), item.get("text"));
                spec.input.blur()
            },
            itemStyle: spec.itemStyle,
            light: spec.light,
            dark: spec.dark
        });
        if (spec.emptyInfo) {
            var infobox = infoTips({
                info: spec.emptyInfo,
                style: spec.emptyStyle,
                className: spec.emptyClass
            })
        }
        dropper.get("box").className = spec["class"];
        dropper.get("box").style.cssText = spec.style;
        dropper.hidd();
        if ("v" == "\v") {
            var frame = $C("IFRAME");
            frame.id = "_iframe4select_";
            frame.style.zIndex = 50;
            frame.style.display = "none";
            frame.style.position = "absolute";
            document.body.appendChild(frame)
        }
        var cache = {};
        spec.formatKey = spec.formatKey ||
        function (v) {
            return v
        };
        var getData = function (key, cb) {
            key = spec.formatKey(key);
            if (!cache[key]) {
                search.result(key, function (data) {
                    if (data.length === 0) {
                        if (key.indexOf(spec.emptkey) !== -1) {
                            spec.emptykey = key
                        }
                    }
                    cb(data);
                    cache[key] = data
                })
            } else {
                setTimeout(function () {
                    cb(cache[key])
                }, 0)
            }
        };
        adEvent(spec.input, function (e) {
            var ev = window.event || e;
            if (ev.keyCode === 13) {
                if (dropper.get("current")) {
                    spec.ok(dropper.get("current").get("value"), dropper.get("current").get("text"));
                    spEvent(ev)
                }
                if (!spec.noBlur) {
                    spec.input.blur()
                }
            }
        }, "keypress");
        var start = function () {
            timeHandle = setInterval(loop, 100 * spec.timer);
            spec.searching = "";
            spec.emptykey = "";
            var dis = position(spec.input);
            dis[1] += spec.input.offsetHeight;
            if (infobox) {
                infobox.set("position", dis).show()
            }
        };
        var end = function () {
            clearInterval(timeHandle);
            dropper.hidd();
            spec.searching = "";
            spec.emptykey = "";
            if ("v" == "\v") {
                frame.style.display = "none"
            }
            if (infobox) {
                infobox.hidd()
            }
        };
        var callback = function (data) {
            dropper.data(data);
            if (data.length) {
                if (!dropper.get("showing")) {
                    dropper.show()
                }
                if ("v" == "\v") {
                    frame.style.width = dropper.get("box").offsetWidth + "px";
                    frame.style.height = dropper.get("box").offsetHeight + "px";
                    var dis = position(dropper.get("box"));
                    frame.style.top = dis[1] + "px";
                    frame.style.left = dis[0] + "px";
                    frame.style.display = ""
                }
            } else {
                dropper.hidd();
                if ("v" == "\v") {
                    frame.style.display = "none"
                }
            }
        };
        var loop = function () {
            if (spec.input.value === spec.searching) {
                return false
            }
            if (spec.input.value.indexOf(spec.emptykey) !== -1 && spec.emptykey !== "") {
                return false
            }
            spec.searching = spec.input.value;
            var dis = position(spec.input);
            dis[1] += spec.input.offsetHeight;
            dropper.set("position", dis);
            if (spec.input.value === "") {
                setTimeout(function () {
                    callback([])
                }, 0);
                if (infobox) {
                    infobox.set("position", dis).show()
                }
            } else {
                getData(spec.input.value, callback);
                if (infobox) {
                    infobox.hidd()
                }
            }
        };
        adEvent(spec.input, start, "focus");
        adEvent(spec.input, end, "blur");
        spec.searching = "";
        spec.emptykey = "";
        var that = {};
        that.get = function (key) {
            if (key === "index") {
                return dropper.get("index")
            }
            return spec[key]
        };
        that.set = function (key, value) {
            if (key === "data") {
                search.set("data", value);
                cache = {}
            }
        };
        that.end = function () {
            end();
            return that
        };
        return that
    }
})(App);
App.fansfind = function (spec) {
    spec.ok = function (value, text) {
        text = text.replace(/\(.*\)/g, "");
        if (spec.input.value && /,|;|\uFF0C|\uFF1B|\u3001|\s/.test(spec.input.value)) {
            var arr = spec.input.value.split(/,|;|\uFF0C|\uFF1B|\u3001|\s/);
            var v = spec.input.value.substring(0, spec.input.value.length - arr[arr.length - 1].length);
            spec.input.value = v + text + " "
        } else {
            spec.input.value = text
        }
        if (spec.select && typeof spec.select == "function") {
            spec.select(value, text)
        }
    };
    spec.timer = spec.timer || 5;
    spec.style = spec.style || "width:" + spec.input.clientWidth + "px;position:absolute;z-Index:1200;";
    spec.light = spec.light ||
    function (el) {
        el.className = "cur"
    };
    spec.dark = spec.dark ||
    function (el) {
        el.className = ""
    };
    spec["class"] = spec["class"] || "layerMedia_menu";
    spec.type = spec.type || "ajax";
    spec.data = spec.data || "/attention/aj_chooser.php?key=" + spec.input.value + "&type=" + spec.searchtype;
    spec.itemStyle = "overflow:hidden;height:20px";
    return App.autoComplate(spec)
};
App.msgDialog = function (nick, bRefresh) {
    var getTarget = function () {
        var oEvent = Core.Events.getEvent();
        var oTarget = oEvent.srcElement || oEvent.target;
        while (oTarget.nodeType != 1) {
            oTarget = oTarget.parentNode
        }
        return oTarget
    };
    var oFormElement = getTarget();
    var html = '<table class="noteTab2"><tbody>	<tr>	<th>' + $CLTMSG.CD0050 + '&nbsp;</th><td><input  id="popUpNick" type="text"  class="PY_input" value="' + (nick || "") + '"/>&nbsp;&nbsp;</td></tr>	<tr class="tPadding" ><th>' + $CLTMSG.CD0051 + '&nbsp;</th><td><textarea id="popUpEditor" class="PY_input"></textarea></td>	</tr>	 <tr class="tPadding1"><th></th><td><a class="faceicon1" id="insert_face_icon" href="javascript:void(0);" title="表情"></a></td></tr>	<tr><th/><td><a id="popUpSubmit" href="javascript:void(0);" class="btn_normal" ><em>' + $CLTMSG.CD0052 + '</em></a>	<span id="popUpError" style="display:none" class="errorTs2 error_color">' + $SYSMSG.M01112 + '</span></td></tr>	<tr><td></td><td><p class="inviteLayer_tip gray9">' + $CLTMSG.CD0053 + "</p></td></tr> 	</tbody></table>";
    var c = {
        width: 430,
        zIndex: 1000,
        hidden: true
    };
    var oDialog = new App.Dialog.BasicDialog($CLTMSG.CD0054, html, c);
    Core.Events.addEvent($E("insert_face_icon"), function (e) {
        var target = e.srcElement || e.target;
        App.showFaces(target, $E("popUpEditor"), -30, 0, "360px")
    }, "click");
    App.fansfind({
        input: $E("popUpNick"),
        searchtype: 1
    });
    if (oFormElement) {
        App.doFlyOut(oFormElement, oDialog._node, {
            resFun: function () {
                try {
                    oDialog.show()
                } catch (e) {}
            },
            style: "border:#000 2px solid;background:#bad;opacity:0.2;filter:alpha(opacity=20);zoom:1",
            time: 0.75
        })
    } else {
        oDialog.show()
    }
    var oElement = {
        submit: $E("popUpSubmit"),
        editor: $E("popUpEditor"),
        info: $E("popUpError"),
        nick: $E("popUpNick")
    };
    App.msgPublisher(oElement, null, bRefresh, function () {
        oDialog.close()
    });
    return oDialog
};
if (App.cartoon === undefined) {
    App.cartoon = {}
}(function (proxy) {
    proxy.noticeInput = function (el, config) {
        if (!el) {
            throw "noticeInput need an element"
        }
        if (!config) {
            config = {}
        }
        var orbit = config.orbit || ["#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff"];
        var times = config.times || 2;
        var delay = config.delay || 2;
        var index = 0;
        var hook = App.timer.add(function () {
            if (index / delay >= orbit.length) {
                times -= 1;
                if (times > 0) {
                    index = 0
                } else {
                    App.timer.remove(hook);
                    return false
                }
            }
            el.style.backgroundColor = orbit[index / delay];
            index += 1
        });
        return false
    }
})(App.cartoon);
App.EncodeUtils = (function () {
    var _hash = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "\\": "&#92;",
        "&": "&amp;",
        "'": "&#039;",
        "\r": "",
        "\n": "<br>"
    },
        fReg = /<|>|\'|\"|&|\\|\r\n|\n| /gi;
    var it = {};
    it.regexp = function (value) {
        return value.replace(/\}|\]|\)|\.|\$|\^|\{|\[|\(|\|\|\*|\+|\?|\\/gi, function (k) {
            k = k.charCodeAt(0).toString(16);
            return "\\u" + (new Array(5 - k.length)).join("0") + k
        })
    };
    it.html = function (value, hash) {
        hash = hash || _hash;
        return value.replace(fReg, function (k) {
            return hash[k]
        })
    };
    return it
})();
App.PopUpCombo = (function () {
    var it = {},
        ce = Core.Events,
        addEvent = ce.addEvent,
        removeEvent = ce.removeEvent,
        stopEvent = ce.stopEvent,
        filter = App.EncodeUtils.regexp,
        toIndex, value, content, current, key, reg, tip, panel, head, lis = [],
        onSelect, onClose, len, selected = 0;
    it.validate = false;
    it.index = function (num) {
        toIndex = !num ? 0 : selected + num;
        toIndex = toIndex < 0 ? len : (toIndex > len) ? 0 : toIndex;
        lis[selected].className = "";
        lis[toIndex].className = "cur";
        selected = toIndex;
        value = content[selected]
    };
    it.click = function () {
        onSelect && onSelect(value)
    };
    it.hidden = function () {
        it.initTip();
        tip.style.display = "none";
        it.validate && !(it.validate = false) && onClose && onClose()
    };
    it.initTip = function () {
        if (!tip) {
            tip = $C("div");
            tip.appendChild(panel = $C("ul"));
            with(tip.style) {
                zIndex = 2000;
                position = "absolute";
                display = "none"
            }
            tip.className = "Atwho";
            document.body.appendChild(tip)
        }
    };
    it.position = function (x, y, offsetX, offsetY) {
        it.initTip();
        it.validate = true;
        tip.style.display = "block";
        with(tip.style) {
            left = (x + offsetX) + "px";
            top = (y + offsetY) + "px"
        }
    };
    it.selection = function (event) {
        var keyCode = event.keyCode,
            toIndex, value;
        if (!it.validate) {
            return
        }
        if (keyCode == 40 || keyCode == 38) {
            it.index(keyCode == 40 ? 1 : -1);
            stopEvent()
        } else {
            if (keyCode == 13 || keyCode == 9) {
                it.click();
                stopEvent()
            } else {
                if (keyCode == 27) {
                    it.hidden();
                    stopEvent()
                }
            }
        }
    };
    it.addItem = function (itemValue) {
        var li = document.createElement("li"),
            index;
        li.innerHTML = itemValue.replace(reg, "<b>$1</b>");
        lis.push(li);
        len = index = lis.length - 1;
        content.push(itemValue);
        panel.appendChild(li);
        addEvent(li, function () {
            lis[selected].className = "";
            lis[index].className = "cur";
            value = itemValue;
            selected = index;
            stopEvent()
        }, "mouseover");
        addEvent(li, function () {
            it.click();
            it.hidden();
            stopEvent()
        }, "mousedown")
    };
    it.bind = function (oElement, aContent, sKey, fOnSelect, fOnClose, sHead) {
        var i = 0,
            l = aContent.length;
        reg = new RegExp("(" + filter(sKey) + ")", "gi");
        selected = 0;
        content = [];
        onSelect = fOnSelect;
        len = 0;
        lis = [];
        onClose = fOnClose;
        it.initTip();
        panel.innerHTML = "";
        if (sHead) {
            panel.appendChild(head = $C("div"));
            head.innerHTML = sHead
        }
        for (i; i < l; i++) {
            it.addItem(aContent[i])
        }
        if (!lis.length) {
            it.addItem(sKey)
        }
        it.index(0);
        if (current == oElement) {
            return
        }
        current && removeEvent(current, it.selection, "keydown");
        removeEvent(document.body, it.hidden, "mouseup");
        addEvent((current = oElement), it.selection, "keydown");
        addEvent(document.body, it.hidden, "mouseup")
    };
    return it
})();
App.BindAtToTextarea = (function () {
    var d = document,
        format = App.EncodeUtils.html,
        select = App.PopUpCombo,
        cd = Core.Dom,
        getStyle = cd.getStyle,
        selectionStart, setStyle = cd.setStyle,
        getXY = cd.getXY,
        ce = Core.Events,
        addEvent = ce.addEvent,
        removeEvent = ce.removeEvent,
        stopEvent = ce.stopEvent,
        ajax = Utils.Io.Ajax,
        clock;
    var cssg = ["overflowY", "height", "width", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom", "marginTop", "marginLeft", "marginRight", "marginBottom"];
    var font = "Tahoma,宋体",
        cssc = {
            fontFamily: font,
            borderStyle: "solid",
            borderWidth: "0px",
            wordWrap: "break-word",
            fontSize: "14px",
            lineHeight: "18px",
            overflowX: "hidden"
        };
    var selectHead = '<div style="height:20px;color:#999999;padding-left:8px;padding-top:2px;line-height:18px;font-size:12px;Tahoma,宋体;">' + $CLTMSG.CL0827 + "</div>";
    var isCss1 = false,
        ua = navigator.userAgent,
        r = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(ua);
    if (r && (r = parseFloat(RegExp.$1)) && r < 8) {
        isCss1 = true
    }
    var hash = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "\\": "&#92;",
        "&": "&amp;",
        "'": "&#039;",
        "\r": "",
        "\n": "<br>",
        " ": !isCss1 ? "<span style='white-space:pre-wrap;font-size:14px;font-family:" + font + ";'> </span>" : "<pre style='overflow:hidden;display:inline;font-size:'+fontSize+';font-family:" + font + ";word-wrap:break-word;'> </pre>"
    },
        fReg = /<|>|\'|\"|&|\\|\r\n|\n| /gi;
    var AjaxHasAbort = function (url, success, error) {
        var req, res, error;
        req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        if (!req) {
            return
        }
        req.onreadystatechange = function () {
            try {
                if (req.readyState == 4) {
                    res = eval("(" + req.responseText + ")");
                    success(res)
                }
            } catch (e) {
                return false
            }
        };
        try {
            req.open("GET", url, true);
            req.send(null)
        } catch (e) {
            return false
        }
        return req
    };
    var doRequest = (function () {
        var req;
        return function (url, success, error) {
            if (req) {
                req.abort();
                req
            }
            req = AjaxHasAbort(url, success, error)
        }
    })();
    var at = (function () {
        var it = {},
            current, panel, cache, lastCache, flag, content, nbody, reg, tu = App.TextareaUtils,
            clock, reqed = {},
            validate = false,
            currentKey, keyChange = 0,
            items;
        reg = /@[^@\s]{1,20}$/g;
        it.onClose = function () {
            cache = null;
            lastCache = null;
            currentKey = null;
            setTimeout(function () {
                try {
                    current.focus()
                } catch (e) {}
            }, 0)
        };
        it.onSelect = function (value) {
            var st = current.scrollTop;
            current.focus();
            tu.insertText(current, value + " ", selectionStart, currentKey.length);
            current.scrollTop = st
        };
        it.setContent = function (value, last) {
            panel.style.height = current.clientHeight + "px";
            if (cache != value) {
                cache = value;
                content.innerHTML = format(value, hash)
            }
            if (lastCache != last) {
                lastCache = last;
                nbody.innerHTML = format(last, hash)
            }
            if (scope.$SAFARI) {
                panel.style.overflowY = getStyle(current, "overflowY") == "hidden" ? "hidden" : "scroll"
            } else {
                panel.style.overflowY = (current.scrollHeight > current.clientHeight) ? "auto" : "hidden"
            }
        };
        it.initTip = function (json) {
            var data, len, i = 0,
                list = [],
                name, tmp = "background-color:#ebebeb;",
                point;
            if (json.code == "A00006" && (data = json.data || [])) {
                point = getXY(flag);
                select.position(point[0], point[1], 0, -(current.scrollTop - 20));
                select.bind(current, data, currentKey, it.onSelect, it.onClose, selectHead);
                reqed[currentKey] = json;
                return
            }
            select.hidden()
        };
        it.check = function () {
            var snap, snap = value = current.value.replace(/\r/g, ""),
                key, len, html, param, last;
            selectionStart = tu.selectionStart(current);
            value = value.slice(0, selectionStart);
            if ((key = value.match(reg)) && (key = key[0]) && /^@[a-zA-Z0-9\u4e00-\u9fa5_]+$/.test(key)) {
                key = key.slice(1);
                if (currentKey == key) {
                    return
                }
                currentKey = key;
                last = snap.slice(selectionStart - currentKey.length, snap.length);
                value = value.slice(0, -currentKey.length - 1);
                it.setContent(value, last);
                if (reqed[key]) {
                    it.initTip(reqed[key]);
                    return
                }
                doRequest("/mblog/aj_searchat.php?atkey=" + encodeURIComponent(key), function (json) {
                    it.initTip(json, key)
                }, select.hidden);
                return
            }
            select.hidden()
        };
        it.sleep = function (event) {
            var keyCode = event.keyCode;
            if (keyCode == "27") {
                return
            }
            clearTimeout(clock);
            clock = setTimeout(it.check, 100)
        };
        it.bindEvent = function (oElement, b) {
            var act = b ? addEvent : removeEvent;
            act(oElement, it.sleep, "keypress");
            act(oElement, it.sleep, "keyup");
            act(oElement, it.sleep, "mouseup")
        };
        it.rePosition = (function () {
            var clock, stop = function () {
                clearInterval(clock)
            };
            var flush = function () {
                try {
                    if (!current) {
                        return
                    }
                    point = getXY(current);
                    with(panel.style) {
                        left = point[0] + "px";
                        top = point[1] + "px"
                    }
                } catch (e) {
                    stop()
                }
            };
            return function () {
                stop();
                clock = setInterval(flush, 100)
            }
        })();
        it.mirror = function (oStyleFix) {
            var i = 0,
                p, len = cssg.length,
                point, fix = 0,
                size = "14px",
                w;
            if ($MOZ) {
                fix = -2
            }
            if (scope.$SAFARI) {
                fix = -6
            }
            for (i; i < len; i++) {
                panel.style[cssg[i]] = getStyle(current, cssg[i])
            }
            for (p in cssc) {
                panel.style[p] = current.style[p] = cssc[p]
            }
            for (p in oStyleFix) {
                panel.style[p] = current.style[p] = oStyleFix[p]
            }
            if (oStyleFix && oStyleFix.fontSize) {
                size = oStyleFix.fontSize
            }
            hash[" "] = !isCss1 ? "<span style='white-space:pre-wrap;font-size:" + size + ";font-family:" + font + ";'> </span>" : "<pre style='overflow:hidden;display:inline;font-size:" + size + ";font-family:" + font + ";word-wrap:break-word;'> </pre>";
            panel.style.width = ((parseInt(current.style.width) || current.offsetWidth) + fix) + "px";
            it.bindEvent(current, true);
            it.rePosition();
            return false
        };
        it.to = function (oElement, oStyleFix) {
            if (current == oElement) {
                return
            }
            if (!it.panel) {
                d.body.appendChild(it.panel = panel = $C("div"));
                panel.appendChild(it.content = content = $C("span"));
                panel.appendChild(it.flag = flag = $C("span"));
                panel.appendChild(it.nbody = nbody = $C("span"));
                with(panel.style) {
                    zIndex = -1000;
                    position = "absolute"
                }
                flag.innerHTML = "@";
                setStyle(panel, "opacity", 0)
            }
            current && it.bindEvent(current, false);
            (current = oElement) && it.mirror(oStyleFix)
        };
        return it
    })();
    return function (oElement, oStyleFix) {
        oElement.style.fontFamily = font;
        addEvent(oElement, function () {
            at.to(oElement, oStyleFix)
        }, "focus")
    }
})();
scope.loginKit = function () {
    var documentCookie = document.cookie + ";";
    var supRegExp = ["SUP", "=([^;]*)?;"].join("");
    var uidRegExp = ["(\\?|&)", "uid", "=([^&]*)(&|$)"].join("");
    var info = documentCookie.match(new RegExp(supRegExp, "i"));
    info = (info) ? info[1] || "" : "";
    info = unescape(info);
    var uid = info.match(new RegExp(uidRegExp));
    uid = (uid) ? uid[2] || "" : "";
    var oid = scope["$oid"];
    return {
        uid: uid,
        isLogin: !! uid,
        isAdmin: uid && oid && (uid == oid)
    }
};
scope.$isLogin = function () {
    return scope.loginKit().isLogin
};
scope.$isAdmin = function () {
    return scope.loginKit().isAdmin
};
(function (proxy) {
    proxy.miniblogPublisher = function (elements, config) {
        config.init = config.init ||
        function () {};
        if (!elements) {
            throw "publisher need elements as parameters"
        }
        var that = {};
        var spec = {};
        var allow = true;
        spec.pluginList = [];
        spec.content = "";
        spec.pic = [];
        var clear = function () {
            if (config.topic) {
                elements.editor.value = "#" + config.topic + "#"
            } else {
                elements.editor.value = ""
            }
            doLimit();
            spec.pic = [];
            for (var i = 0, len = spec.pluginList.length; i < len; i += 1) {
                if (typeof spec.pluginList[i].clear == "function") {
                    try {
                        spec.pluginList[i].clear()
                    } catch (e) {}
                }
            }
        };
        var success = function (json, parameters) {
            clear();
            config.onSuccess(json, parameters);
            casheInput.clear()
        };
        var error = function (json) {
            if (json && json.code) {
                if (json.code == "MR0050") {
                    App.forbidrefresh(function () {
                        App.Dom.removeClass(elements.submit, " bgColorA_No");
                        submit()
                    }, "/mblog/publish.php");
                    return false
                }
                App.alert({
                    code: json.code
                })
            } else {
                App.alert({
                    code: "R01404"
                })
            }
            config.onError(json)
        };
        var regexp = new RegExp("(http://)+(([-A-Za-z0-9]+(.[-A-Za-z0-9]+)*(.[-A-Za-z]{2,5}))|([0-9]{1,3}(.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_$.+!*(),;:@&=?/~#%]*)*", "gi");
        var getLength = function (str) {
            var reg = new RegExp(config.emptyStr[0], "g");
            var len = Core.String.trim(str.replace(reg, "")).length;
            if (len > 0) {
                var min = 40,
                    max = 140,
                    surl = 24,
                    tmp = str;
                var urls = str.match(regexp) || [];
                var urlCount = 0;
                for (var i = 0, len = urls.length; i < len; i++) {
                    var count = Core.String.byteLength(urls[i]);
                    if (count >= min) {
                        urlCount += count <= max ? surl : (surl + count - max)
                    } else {
                        urlCount += surl
                    }
                    tmp = tmp.replace(urls[i], "")
                }
                return Math.ceil((urlCount + Core.String.byteLength(tmp)) / 2)
            } else {
                return 0
            }
        };
        var casheInput = {
            save: function () {
                Utils.Cookie.setCookie("cash_input", elements.editor.value)
            },
            recover: function () {
                var str = unescape(Utils.Cookie.getCookie("cash_input"));
                elements.editor.value = str
            },
            clear: function (name) {
                Utils.Cookie.setCookie("cash_input", "")
            },
            action: function () {
                var len = getLength(elements.editor.value);
                if (len <= 140) {
                    casheInput.save()
                }
            },
            pageInit: function () {},
            casheCur: function (e) {
                var selValue = App.TextareaUtils.getSelectedText(elements.editor);
                var slen = (selValue == "" || selValue == null) ? 0 : selValue.length;
                var start = App.TextareaUtils.getCursorPos(elements.editor);
                var curStr = start + "&" + slen;
                elements.editor.setAttribute("range", curStr)
            },
            getCur: function () {
                var range = elements.editor.getAttribute("range");
                return range.split("&")
            }
        };
        var testlimit = function (func) {
            var len = getLength(elements.editor.value);
            if (typeof func === "function") {
                func(len)
            }
            if (len > 0 && len <= 140) {
                return true
            } else {
                return false
            }
        };
        var doLimit = function (event) {
            if (!allow) {
                return
            }
            if (event && event.ctrlKey == true && (event.keyCode == "13" || event.keyCode == "10")) {
                return
            }
            if (testlimit(config.onLimit)) {
                submitEnable();
                casheInput.save()
            } else {
                submitDisable()
            }
        };
        var submitDisable = function () {
            config.onDisable()
        };
        var submitEnable = function () {
            config.onEnable()
        };
        var checkLogin = function (arg) {
            var isLog = true;
            if (!scope.loginKit().isLogin) {
                App.ModLogin({
                    func: function () {
                        arg.callee.apply(arg)
                    }
                });
                isLog = false
            }
            return isLog
        };
        var submit = function () {
            if (!checkLogin(arguments)) {
                return
            }
            if (App.Dom.hasClass(elements.submit.parentNode, "bgColorA_No")) {
                if (!testlimit()) {
                    App.cartoon.noticeInput(elements.editor);
                    return false
                }
            }
            submitDisable();
            spec.content = Core.String.trim(elements.editor.value || "");
            casheInput.clear();
            publishRumor(spec.content, spec.pic, success, error, config.styleId, config.topic);
            return false
        };
        var ctrlSubmit = function (event) {
            if (event.ctrlKey == true && event.keyCode == "13") {
                submit()
            }
            return false
        };
        App.BindAtToTextarea(elements.editor);
        Core.Events.addEvent(elements.editor, doLimit, "keyup");
        Core.Events.addEvent(elements.editor, doLimit, "input");
        Core.Events.addEvent(elements.submit, submit, "click");
        Core.Events.addEvent(elements.editor, ctrlSubmit, "keyup");
        Core.Events.addEvent(elements.editor, casheInput.action, "keyup");
        Core.Events.addEvent(elements.editor, casheInput.casheCur, "mouseup");
        Core.Events.addEvent(elements.editor, casheInput.casheCur, "keyup");
        that.casheInput = casheInput.save;
        that.casheCur = casheInput.casheCur;
        that.getCur = casheInput.getCur;
        that.elements = elements;
        that.limit = doLimit;
        that.checkLogin = checkLogin;
        that.getDom = function (key) {
            return elements[key]
        };
        that.set = function (key, value) {
            spec[key] = value
        };
        that.plugin = function (ext) {
            spec.pluginList.push(ext);
            ext.init(that);
            return that
        };
        that.enabled = function (b) {
            allow = b;
            !b ? submitDisable() : doLimit()
        };
        that.insertText = function (txt, func) {
            func = func ||
            function () {
                return true
            };
            var cur = casheInput.getCur();
            App.TextareaUtils.unCoverInsertText(elements.editor, txt, {
                rcs: cur[0],
                rccl: cur[1]
            });
            func(that);
            that.limit();
            that.casheCur()
        };
        if (config.init(that)) {
            clear();
            casheInput.recover();
            casheInput.casheCur()
        }
        config.onLimit(getLength(elements.editor.value));
        doLimit();
        return that
    };
    var publishRumor = function (content, pic, success, error, styleid, keyWord) {
        if (typeof content != "string") {
            throw ("The publishRumor need a string as first parameter")
        }
        if (!(pic instanceof Array)) {
            throw ("The publishRumor need an array as second parameter")
        }
        if (typeof success != "function") {
            throw ("The publishRumor need a function as thrid parameter")
        }
        if (typeof error != "function") {
            throw ("The publishRumor need a function as fourth parameter")
        }
        if (keyWord) {
            if (content.indexOf(keyWord) === -1) {
                content = "#" + keyWord + "#" + content
            }
        }
        var url = "/mblog/publish.php";
        var parameters = {
            content: content.replace(/\uff20/ig, "@"),
            pic: pic.join(","),
            styleid: styleid,
            retcode: scope.doorretcode || ""
        };
        if (scope.appid) {
            parameters.appid = scope.appid
        }
        var options;
        if (options = proxy.miniblogPublisher.options) {
            for (var key in options) {
                if (options[key] && !(key in {})) {
                    parameters[key] = options[key]
                }
            }
        }
        url = proxy.miniblogPublisher.url || url;
        if (scope.$eid) {
            url = "/event/aj_publishmblog.php";
            parameters.eid = scope.$eid
        }
        scope.doorretcode = "";
        Utils.Io.Ajax.request(url, {
            POST: parameters,
            onComplete: function (json) {
                if (json.code == "A00006") {
                    success(json.data, parameters)
                } else {
                    if (json.code == "M00008") {
                        window.location.replace(json.data)
                    } else {
                        error(json)
                    }
                }
            },
            onException: function () {
                error()
            },
            returnType: "json"
        })
    }
})(App);
App.bindUploadImgToFile = function (file, success, fail, start) {
    if (!file || !file.type || file.type != "file") {
        throw "传入的对像不是一个文件选择框"
    }
    var d = document,
        canceled = false,
        gc, up, wrap, form, id, ifrid = ("ifr_" + (id = ["up", Math.floor(Math.random() * 10000), new Date().getTime()].join("_"))),
        iframe, filename = "";
    wrap = $C("div");
    wrap.style.display = "none";
    wrap.innerHTML = '<iframe frameborder="0" src="about:blank" id="' + ifrid + '" name="' + ifrid + '" class="fb_img_iframe"></iframe>';
    iframe = $C(ifrid);
    form = $C("form");
    form.target = ifrid;
    form.encoding = "multipart/form-data";
    form.method = "POST";
    form.action = "http://picupload.t.sina.com.cn/interface/pic_upload.php?marks=" + (scope.$domain ? "1" : "0") + (scope.wm ? "&wm=2" : "") + "&markstr=" + (scope.$domain && encodeURIComponent(scope.$domain.replace("http://", ""))) + "&s=rdxt&app=miniblog&cb=http://t.sina.com.cn/upimgback.html";
    d.body.appendChild(wrap);
    file.parentNode.insertBefore(form, file);
    form.appendChild(file);
    setTimeout(function () {
        file.style.visibility = "visible"
    }, 300);
    f = function () {
        file.value = "";
        fail && fail()
    };
    up = function () {
        canceled = false;
        if (!/\.(gif|jpg|png|jpeg)$/i.test(file.value)) {
            form.reset();
            App.alert({
                code: "M07004"
            });
            return false
        }
        filename = file.value.match(/[^\/|\\]*$/)[0];
        var comp = "",
            snap = [filename.slice(0, -4), filename.slice(-4)],
            len = Core.String.byteLength(snap[0]);
        if (len > 20) {
            snap[0] = Core.String.leftB(snap[0], 20);
            comp = "..."
        }
        filename = snap.join(comp);
        scope.addImgSuccess = function (json) {
            if (canceled) {
                return
            }
            scope.addImgSuccess = function () {};
            if (json && json.ret == "1") {
                success && success(json, filename);
                form.reset();
                return
            }
            form.reset();
            App.alert({
                code: "M07002"
            }, {
                width: 400
            });
            f()
        };
        start && start();
        form.submit()
    };
    Core.Events.addEvent(file, up, "change");
    return {
        cancel: function () {
            canceled = true;
            scope.addImgSuccess = function () {};
            iframe.location = "about:blank";
            form.reset();
            f()
        },
        reset: function () {
            form.reset()
        }
    }
};
Core.Dom.removeNode = function (node) {
    node = $E(node) || node;
    try {
        node.parentNode.removeChild(node)
    } catch (e) {}
};
App.getEventDom = function (o) {
    if (/msie/.test(navigator.userAgent.toLowerCase())) {
        return o.srcElement
    } else {
        var node = o.target;
        while (node.nodeType != 1) {
            node = node.parentNode
        }
        return node
    }
};
App.isChildNode = function (child, parent) {
    while (child) {
        if (child == parent) {
            return true
        }
        if (child == document.body) {
            return false
        }
        child = child.parentNode
    }
};
App.getImgSize = function (url, echo) {
    function startLoad() {
        var img = new Image();
        imgLoader = $C("div");
        imgLoader.style.visibility = "hidden";
        imgLoader.style.height = "1px";
        imgLoader.style.overFlow = "hidden";
        var timer, imgLoader;
        var afterImgLoaded = function (e) {
            clearTimeout(timer);
            var _size = [img.width, img.height];
            Core.Events.removeEvent(img, afterImgLoaded, "load");
            imgLoader.removeChild(img);
            Core.Dom.removeNode(imgLoader);
            delete img;
            delete imgLoader;
            setTimeout(function () {
                echo(_size)
            }, 1);
            return
        };
        imgLoader.appendChild(img);
        document.body.appendChild(imgLoader);
        Core.Events.addEvent(img, afterImgLoaded, "load");
        timer = setTimeout(function () {
            Core.Events.removeEvent(img, afterImgLoaded, "load");
            imgLoader.removeChild(img);
            Core.Dom.removeNode(imgLoader);
            delete img;
            delete imgLoader;
            startLoad()
        }, 3000);
        img.src = url
    }
    startLoad()
};
(function (proxy) {
    proxy.imgURL = function (id, size) {
        function hexdec(hex_string) {
            hex_string = (hex_string + "").replace(/[^a-f0-9]/gi, "");
            return parseInt(hex_string, 16)
        }
        var domainNum = (hexdec(id.substr(19, 2)) % 16 + 1);
        var size = size || "middle";
        var result = "";
        switch (size) {
        case "middle":
            result = "http://ss" + domainNum + ".sinaimg.cn/middle/" + id + "&690";
            break;
        case "bmiddle":
            result = "http://ss" + domainNum + ".sinaimg.cn/bmiddle/" + id + "&690";
            break;
        case "small":
            result = "http://ss" + domainNum + ".sinaimg.cn/small/" + id + "&690";
            break;
        case "thumbnail":
            result = "http://ss" + domainNum + ".sinaimg.cn/thumbnail/" + id + "&690";
            break;
        case "square":
            result = "http://ss" + domainNum + ".sinaimg.cn/square/" + id + "&690";
            break;
        case "orignal":
            result = "http://ss" + domainNum + ".sinaimg.cn/orignal/" + id + "&690";
            break;
        default:
            result = "http://ss" + domainNum + ".sinaimg.cn/small/" + id + "&690";
            break
        }
        return result
    }
})(App);
(function () {
    var api = "/face/aj_face.php";
    var d = document,
        de = d.documentElement || {},
        ce = Core.Events,
        cs = Core.String,
        st = ce.stopEvent,
        add = ce.addEvent,
        unadd = ce.removeEvent,
        fire = ce.fireEvent,
        ajax = App.simpleAjax,
        getXY = Core.Dom.getXY,
        group = App.group,
        popUp = App.popUp,
        reflush, removeAll = App.removeChildren;

    function b2(t, b) {
        return App.builder3(t, b, {
            dd: "id",
            mm: "action"
        })
    }
    var encodeTitle = function (value) {
        return value.replace(/[^\w\u4e00-\u9fa5\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u2014\uff3f]/g, "")
    };
    App.popUpUpload = (function () {
        var it = {},
            dl, upc, allow = true,
            figure, panel, req, cache, status = 0,
            oldStatus = 0,
            title, toggleCss = {
                selected: "cur",
                unselected: " "
            },
            clear;
        title = ['<li id="upload"><a href="####" onclick="this.blur();return false;">', $CLTMSG.CL0905, '</a></li><li id="figure"><a href="####" onclick="this.blur();return false;">', $CLTMSG.CL0906, "</a></li>"].join("");
        return function (target, offsetX, offsetY, flush, enabled) {
            if (!panel) {
                enabled = enabled ||
                function () {};
                panel = App.PopUp().content('<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div id="contentPanel" class="layerBox phiz_layerN"><div id="topPanel" class="layerBoxTop" style="width:100%;"><div class="layerArrow"></div><div class="topCon" id="titlePanel"><ul id="title" class="phiz_menu"></ul><a id="close" title="' + $CLTMSG.CL0701 + '" href="####" onclick="return false" class="close"></a><div class="clearit"></div></div></div><div id="content"></div></div></td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table>');
                panel.zIndex(800);
                dl = b2(title, panel.dom.title)["domList"];
                uploadPanel = dl.upload;
                figurePanel = dl.figure;
                var html = '<div id="upload" class="layerBoxCon" style="display:none"><div class="local_pic" style="position:rev"><a id="actButton" class="btn_green" style="overflow:hidden;position:relative;" href="javascript:void(0)"><em id="status">' + $CLTMSG.CL0907 + '</em><input type="file" hideFoucs="true" style="outline:none;width:75px;height:25px;" id="file" name="pic1"/></a><p id="tip" class="gray9">' + $CLTMSG.CX0193 + '</p></div></div><div id="uploading" class="layerBoxCon1" style="display:none;width:258px;"><div class="layerMedia"><div class="layerArrow" style="left:25px"></div><div class="statusBox"><span class="status_p"><img src="' + [scope.$BASEIMG, "style/images/common/loading.gif"].join("") + '" />' + $CLTMSG.CC1503 + '...</span><span class="status_b"><a id="cancelButton" href="####" onclick="return false" class="btn_normal"><em>' + $CLTMSG.CX0176 + '</em></a></span></div></div></div><div id="successpanel" class="layerBoxCon1" style="display:none;width:258px;"><div class="layerMedia"><div class="layerArrow" style="left:25px"></div><div class="cur_status"><a id="deleteuploaded" href="####" onclick="return false" class="dele">' + $CLTMSG.CX0043 + '</a><strong id="viewfilename"></strong></div><div class="cur_pic"><center><img id="imgview" /></center></div></div></div><div id="tabNav" class="magicT"><div class="magicTL"><ul id="tab"></ul></div><div class="magicTR"><a href="#" onclick="return false;" id="prevBtn" class="magicbtnL02" title="' + $CLTMSG.CX0076 + '"></a><a href="#" onclick="return false;" id="nextBtn" title="' + $CLTMSG.CX0077 + '" class="magicbtnR02"></a></div><div class="clear"></div></div><div id="illustration" class="layerBoxCon" style="width:100%;display:none"><div class="magic_list"><ul id="norm"></ul><div class="clearit"></div></div><div class="magicB"><div id="pageing" style="visibility:hidden" class="pages"></div></div></div>';
                var dom = b2(html, panel.dom.content)["domList"],
                    topPanel = panel.dom.topPanel,
                    contentPanel = panel.dom.contentPanel,
                    titlePanel = panel.dom.titlePanel,
                    upload = dom.upload,
                    file = dom.file,
                    actButton = dom.actButton,
                    tip = dom.tip,
                    tab = dom.tab,
                    prevBtn = dom.prevBtn,
                    nextBtn = dom.nextBtn,
                    cancelButton = dom.cancelButton,
                    uploading = dom.uploading,
                    successpanel = dom.successpanel,
                    deleteuploaded = dom.deleteuploaded,
                    viewfilename = dom.viewfilename,
                    imgview = dom.imgview,
                    illustration = dom.illustration,
                    norm = dom.norm,
                    more = dom.more,
                    morebox = (dom.morebox || {})["style"],
                    mpageing = dom.morepageing,
                    pageing = dom.pageing,
                    morePanel = dom.morePanel,
                    tabNav = dom.tabNav,
                    moretab = dom.moretab;
                var cancel = function () {
                    upc && upc.cancel();
                    flush();
                    return false
                },
                    setStatus = function (type) {
                        allow = true;
                        var topPanelv = "none",
                            contentPanelv = "layerBox phiz_layerN",
                            titlePanelv = "",
                            selectPanelv = "none",
                            uploadingv = "none",
                            uploadv = "none",
                            successpanelv = "none",
                            imgviewv = "none",
                            illustrationv = "none",
                            tabview = "none",
                            topPanelWidth = "378px",
                            uploadv = "none";
                        switch (type) {
                        case 0:
                            uploadv = "";
                            topPanelv = "";
                            selectPanelv = "";
                            enabled(true);
                            break;
                        case 1:
                            uploadingv = "";
                            cancelButton.onclick = cancel;
                            allow = false;
                            enabled(false);
                            break;
                        case 2:
                            successpanelv = "";
                            viewpanelv = "";
                            deleteuploaded.onclick = clear;
                            allow = false;
                            setTimeout(function () {
                                enabled(true)
                            }, 1000);
                            break;
                        case 3:
                            tabview = "";
                            topPanelv = "";
                            illustrationv = "";
                            topPanelWidth = "442px";
                            contentPanelv = "layerBox phiz_layerN";
                            enabled(true);
                            break
                        }
                        titlePanel.style.width = topPanelWidth;
                        upload.style.display = uploadv;
                        topPanel.style.display = topPanelv;
                        contentPanel.className = contentPanelv;
                        titlePanel.style.display = titlePanelv;
                        uploading.style.display = uploadingv;
                        successpanel.style.display = successpanelv;
                        imgview.style.display = imgviewv;
                        illustration.style.display = illustrationv;
                        tabNav.style.display = tabview;
                        status = type;
                        panel.visible(true)
                    },
                    start = function () {
                        setStatus(1)
                    },
                    setImgUrl = function (pid) {
                        imgview.src = [scope.$BASECSS, "style/images/common/transparent.gif"].join("");
                        setStatus(2);
                        var url = App.imgURL(pid, "small");
                        new App.getImgSize(App.imgURL(pid, "small"), function (size) {
                            imgview.style.width = size[0] + "px";
                            imgview.style.height = size[1] + "px";
                            imgview.src = url;
                            fire(uploadPanel, "mouseup");
                            setStatus(2);
                            setTimeout(function () {
                                App.curtain.droop(imgview, function () {})
                            }, 100)
                        });
                        flush(pid)
                    },
                    success = function (json, filename) {
                        if (json.pid) {
                            viewfilename.innerHTML = "";
                            var tn = d.createTextNode(filename);
                            viewfilename.appendChild(tn);
                            setImgUrl(json.pid)
                        }
                    },
                    fail = function () {
                        setStatus(0);
                        imgview.src = null
                    },
                    insertImg = function (data, parent) {
                        var i = 0,
                            len = data.length,
                            tmpArr = [],
                            c, acts, icons, plays, className = "",
                            viewButton = "",
                            nv;
                        for (i; i < len; i++) {
                            c = data[i];
                            nv = encodeTitle(c.title);
                            tmpArr.push(['<li action="icon" title="', nv, '"><a href="####" onclick="return false" class="face_box">', '<img src="', c.src, '"/></a>', '<span class="face_box_tex">', (cs.byteLength(nv) > 8 ? cs.leftB(nv, 6) + "..." : nv), "</span>", "</li>"].join(""))
                        }
                        removeAll(parent);
                        acts = b2(tmpArr.join(""), parent)["actList"];
                        icons = acts.icon;
                        group(icons, function (item, index, c) {
                            item.onclick = function () {
                                return false
                            };
                            var pid = (pid = data[index]) && pid.picid;
                            if (pid) {
                                setImgUrl(pid);
                                viewfilename.innerHTML = data[index].value
                            }
                        })
                    };
                clear = function () {
                    upc && upc.reset();
                    setStatus(0);
                    panel.visible(false);
                    flush();
                    return false
                };
                if (file) {
                    upc = App.bindUploadImgToFile(dom.file, success, fail, start)
                }
                var initPage = function (data, parent, fclick) {
                    var i = 0,
                        len = data.length,
                        tm = [];
                    for (i; i < len; i++) {
                        c = data[i];
                        tm.push(['<a action="pb" href="####" onclick="return false">', (i + 1), "</a>"].join(""))
                    }
                    removeAll(parent);
                    pages = b2(tm.join(""), parent)["actList"]["pb"];
                    if (pages.length < 2) {
                        parent.style.visibility = "hidden"
                    } else {
                        parent.style.visibility = "visible"
                    }
                    group(pages, fclick, toggleCss);
                    fire(pages[0], "mouseup")
                };
                var initpic = function (json) {
                    removeAll(tab);
                    var data = [{
                        type: $CLTMSG.CL0914,
                        icon: json.data.norm
                    }].concat(json.data.more);
                    var i = 0,
                        len = data.length,
                        current, tabList = [],
                        tabs;
                    for (i; i < len; i++) {
                        current = data[i];
                        if (!current || !current.type) {
                            continue
                        }
                        tabList.push('<li style="visibility:hidden"><a action="tabs" onclick="return false;" href="#">' + current.type + "</a></li>")
                    }
                    if (!tabList.length) {
                        return
                    }
                    tabs = b2(tabList.join(splitHTML), tab)["actList"]["tabs"];
                    group(tabs, function (item, index) {
                        item.onclick = function () {
                            return false
                        };
                        tabIndex = index;
                        initPage(data[index].icon, pageing, function (item, index1, c) {
                            insertImg(data[index].icon[index1], norm);
                            item.blur();
                            return false
                        });
                        item.blur()
                    }, {
                        selected: "magicTcur",
                        unselected: " "
                    });
                    fire(tabs[0], "mouseup");
                    var pi = 1,
                        mi = 0,
                        lil = tab.getElementsByTagName("li"),
                        ml = lil.length,
                        pageList = [],
                        step = 0,
                        cacheList = [],
                        pl;
                    setTimeout(function () {
                        for (mi; mi < ml; mi++) {
                            lil[mi].style.visibility = "visible";
                            lil[mi].style.display = "";
                            var width = lil[mi].innerHTML == "|" ? 8 : lil[mi].offsetWidth;
                            if (step + width > 400) {
                                step = 0;
                                pageList.push(cacheList);
                                cacheList = []
                            }
                            lil[mi].style.display = "none";
                            cacheList.push(lil[mi]);
                            step += width
                        }
                        cacheList.length && pageList.push(cacheList);
                        pl = pageList.length - 1;

                        function setPN() {
                            prevBtn.className = pi == 0 ? "magicbtnL01" : "magicbtnL02";
                            nextBtn.className = pi == pl ? "magicbtnR01" : "magicbtnR02"
                        }
                        function toggle(list, b) {
                            var i = 0;
                            len = list.length, end = Math.max(len - 1, 0);
                            for (i; i < len; i++) {
                                list[i].style.visibility = b ? "visible" : "hidden";
                                list[i].style.display = !b ? "none" : ((i == 0 || i == end) && list[i].innerHTML == "|") ? "none" : ""
                            }
                        }
                        function dep(key, n) {
                            var snap = Math[key](pi + n, n > 0 ? pl : 0);
                            if (pi == snap) {
                                setPN();
                                return
                            }
                            pageList[pi] && toggle(pageList[pi], false);
                            pageList[snap] && toggle(pageList[snap], true);
                            pi = snap;
                            setPN()
                        }
                        prevBtn.onclick = function () {
                            dep("max", -1);
                            prevBtn.blur();
                            return false
                        };
                        nextBtn.onclick = function () {
                            dep("min", 1);
                            nextBtn.blur();
                            return false
                        };
                        dep("max", -1)
                    }, 100)
                };
                group([uploadPanel, figurePanel], function (item, index, tabConsole) {
                    req && req.abort();
                    item.onclick = function () {
                        return false
                    };
                    if (item == uploadPanel) {
                        removeAll(tab);
                        removeAll(norm);
                        setStatus(status == 3 ? oldStatus : status)
                    } else {
                        setStatus(3);
                        if (!cache) {
                            norm.innerHTML = '<div style="width:100%;text-align:center;margin-top:10px;margin-bottom:10px"><img src="' + scope.$BASEIMG + 'style/images/common/loading.gif"/></div>';
                            req = ajax([api, "?type=cartoon"].join(""), function (json) {
                                initpic(json);
                                cache = json
                            });
                            return
                        }
                        initpic(cache)
                    }
                }, toggleCss);
                add(panel.wrap, function () {
                    st()
                }, "mouseup");
                add(actButton, function (event) {
                    var p = getXY(actButton);
                    var st = window.pageYOffset || Math.max(de.scrollTop, d.body.scrollTop);
                    var sl = window.pageXOffset || Math.max(de.scrollLeft, d.body.scrollLeft);
                    file.style.top = ((event.clientY + st) - p[1] - 13) + "px";
                    file.style.left = ((event.clientX + sl) - p[0] - 32) + "px"
                }, "mousemove");
                add(d.body, function (event) {
                    if (!allow) {
                        return
                    }
                    panel.visible(false);
                    st()
                }, "mouseup");
                add(panel.dom.close, function () {
                    req && req.abort();
                    panel.visible(false);
                    return false
                }, "click");
                var resetXY = function () {
                    var point = getXY(target);
                    panel.position(point[0] + (offsetX || 0), point[1] + target.offsetHeight + (offsetY || 0))
                };
                add(window, function () {
                    resetXY()
                }, "resize");
                resetXY();
                fire(uploadPanel, "mouseup")
            }
            panel.visible(true);
            if (!/^(1|2)$/.test(status)) {
                fire(uploadPanel, "mouseup")
            }
            return {
                clear: function () {
                    clear();
                    fire(uploadPanel, "mouseup");
                    panel.visible(false)
                }
            }
        }
    })()
})();
(function (proxy) {
    proxy.miniblogPublisherImage = function (elements, config) {
        var _getStylesheetValue = function (obj, attribute) {
            return obj.currentStyle ? obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj, false)[attribute]
        };
        var that = {};
        var owner = {};
        var flush = function (pid) {
            owner.set("pic", (pid && [pid]) || []);
            if (pid && !Core.String.trim(owner.getDom("editor").value)) {
                owner.getDom("editor").value = $CLTMSG.CX0117
            }
            if (!pid && Core.String.trim(owner.getDom("editor").value) == $CLTMSG.CX0117) {
                owner.getDom("editor").value = ""
            }
            owner.limit()
        };
        var enabled = function (b) {
            owner.enabled(b);
            if (b) {
                owner.limit()
            }
        };
        that.clear = function () {
            try {
                flush()
            } catch (e) {
                if (scope.$uid == "1505834385") {
                    console.log(e)
                }
            }
        };
        that.init = function (args) {
            owner = args
        };
        elements.button.onclick = function () {
            return false
        };
        Core.Events.addEvent(elements.button, function () {
            if (!owner.checkLogin(arguments)) {
                return
            }
            var u = App.popUpUpload(elements.button, -32, 5, flush, enabled);
            that.clear = u.clear;
            return false
        });
        return that
    }
})(App);
(function (proxy) {
    proxy.miniblogPublisherTopic = function (spec) {
        var that = {};
        var setSelectTxt = function (input, hasSel, value, insertText) {
            var cstar = input.value.split(value)[0].length;
            cstar = cstar == "" ? 1 : cstar + 1;
            if (hasSel) {
                App.TextareaUtils.setCursor(input, cstar, insertText.length)
            } else {
                cstar += value.length - 1;
                App.TextareaUtils.setCursor(input, cstar)
            }
        };
        that.init = function (owner) {
            Core.Events.addEvent(spec.button, function () {
                if (!owner.checkLogin(arguments)) {
                    return
                }
                var input = owner.getDom("editor");
                var defValue = "#" + $CLTMSG.CX0119 + "#";
                var insertText = App.TextareaUtils.getSelectedText(input);
                var isSelectText = (insertText == "" || insertText == $CLTMSG.CX0119);
                if (isSelectText) {
                    insertText = $CLTMSG.CX0119
                } else {
                    defValue = "#" + insertText + "#"
                }
                if (input.value.indexOf(defValue) < 0) {
                    owner.insertText(defValue, function (pub) {
                        setSelectTxt(input, isSelectText, defValue, insertText)
                    })
                }
                setSelectTxt(input, isSelectText, defValue, insertText)
            }, "click")
        };
        that.clear = function () {};
        return that
    }
})(App);
(function (proxy) {
    proxy.setOpacity = function (element, value) {
        element.style.filter = "alpha(opacity=" + value + ")";
        element.style.opacity = value / 100
    };
    proxy.opacity = function (element, cfg, callback) {
        var _first = cfg.first;
        var _last = cfg.last || 0;
        if (_last == _first) {
            proxy.setOpacity(element, _first);
            if (typeof callback === "function") {
                callback(_first, _last)
            }
            return false
        }
        var _time = Math.floor((cfg.time || 5) * 100 / proxy.timer.delay);
        var _orbit = [];
        for (var i = 0; i < _time; i++) {
            _orbit.push(_first + (_last - _first) * i / _time)
        }
        var _current = 0;
        var _timerhook = proxy.timer.add(function () {
            if (_current >= _orbit.length) {
                proxy.timer.remove(_timerhook);
                proxy.setOpacity(element, _last);
                if (typeof callback === "function") {
                    callback(_first, _last)
                }
                return false
            }
            proxy.setOpacity(element, _orbit[_current]);
            _current++
        })
    }
})(App);
$registJob("refurbishNumber", function () {
    var getDoms = function () {
        var MAIN = $E("profile_following_follower_update");
        if (!MAIN) {
            return false
        }
        var ITEMS = MAIN.getElementsByTagName("LI");
        var following = ITEMS[0];
        var follower = ITEMS[1];
        var update = ITEMS[2];
        App.refurbishFollowing = upgrade(following);
        App.refurbishFollower = upgrade(follower);
        App.refurbishUpdate = upgrade(update)
    };
    var orbit = [
        [20, -1, 80],
        [22, -2, 70],
        [24, -3, 60],
        [28, -5, 40],
        [32, -7, 30],
        [36, -9, 20],
        [36, -9, 0]
    ];
    var upgrade = function (el) {
        var num = el.getElementsByTagName("DIV")[0];
        var that = {};
        el.style.position = "relative";
        that.animation = function (cfg) {
            var duplicate = num.cloneNode(true);
            duplicate.style.position = "absolute";
            el.insertBefore(duplicate, num);
            var width = duplicate.offsetWidth;
            var current = 1;
            var tk = App.timer.add(function () {
                if (cfg.beging) {
                    cfg.beging(duplicate, num)
                }
                if (current >= orbit.length * 2) {
                    App.timer.remove(tk);
                    App.setOpacity(num, 100);
                    el.removeChild(duplicate);
                    duplicate.style.display = "none";
                    num.getElementsByTagName("A")[0].innerHTML = num.getElementsByTagName("A")[0].innerHTML;
                    return false
                }
                if (current == orbit.length) {
                    cfg.middle(duplicate, num)
                }
                var now = orbit.length - Math.abs(current - orbit.length) - 1;
                duplicate.style.fontSize = orbit[now][0] + "px";
                duplicate.style.top = orbit[now][1] + "px";
                duplicate.style.left = 0 - (duplicate.offsetWidth - width) / 2 + "px";
                App.setOpacity(duplicate, orbit[now][2]);
                App.setOpacity(num, orbit[now][2]);
                current += 1;
                if (cfg.ending) {
                    cfg.ending(duplicate, num)
                }
            })
        };
        that.add = function (num) {
            var doadd = function (du, or) {
                var numBox = or.getElementsByTagName("A")[0];
                numBox.innerHTML = (parseInt(numBox.innerHTML) + num) || 0;
                du.getElementsByTagName("A")[0].innerHTML = numBox.innerHTML
            };
            this.animation({
                middle: doadd
            })
        };
        return that
    };
    getDoms()
});
Core.Dom.insertHTML = function (el, html, where) {
    el = $E(el) || document.body;
    where = where.toLowerCase() || "beforeend";
    if (el.insertAdjacentHTML) {
        switch (where) {
        case "beforebegin":
            el.insertAdjacentHTML("BeforeBegin", html);
            return el.previousSibling;
        case "afterbegin":
            el.insertAdjacentHTML("AfterBegin", html);
            return el.firstChild;
        case "beforeend":
            el.insertAdjacentHTML("BeforeEnd", html);
            return el.lastChild;
        case "afterend":
            el.insertAdjacentHTML("AfterEnd", html);
            return el.nextSibling
        }
        throw 'Illegal insertion point -> "' + where + '"'
    }
    var range = el.ownerDocument.createRange();
    var frag;
    switch (where) {
    case "beforebegin":
        range.setStartBefore(el);
        frag = range.createContextualFragment(html);
        el.parentNode.insertBefore(frag, el);
        return el.previousSibling;
    case "afterbegin":
        if (el.firstChild) {
            range.setStartBefore(el.firstChild);
            frag = range.createContextualFragment(html);
            el.insertBefore(frag, el.firstChild);
            return el.firstChild
        } else {
            el.innerHTML = html;
            return el.firstChild
        }
        break;
    case "beforeend":
        if (el.lastChild) {
            range.setStartAfter(el.lastChild);
            frag = range.createContextualFragment(html);
            el.appendChild(frag);
            return el.lastChild
        } else {
            el.innerHTML = html;
            return el.lastChild
        }
        break;
    case "afterend":
        range.setStartAfter(el);
        frag = range.createContextualFragment(html);
        el.parentNode.insertBefore(frag, el.nextSibling);
        return el.nextSibling
    }
    throw 'Illegal insertion point -> "' + where + '"'
};
App.ModForward = function (fid, content, uid, el, exid, forwardName, forwardContent, uname, callback) {
    Core.Events.stopEvent();
    if (el && el.getAttribute("allowforward")) {
        App.alert($SYSMSG.M02020);
        return false
    }
    if (scope.$cuser_status === "nofull" && scope.$uid !== "") {
        App.finishInformation();
        return false
    }
    if (uid === scope.$uid) {
        App.alert($CLTMSG.CD0024);
        return false
    }
    var checkAT = function (content, name) {
        if ((new RegExp("(@|＠)" + name + "([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(content)) {
            return true
        } else {
            return false
        }
    };
    var defaultTxt = $CLTMSG.CD0025;
    var forwardContentFinal = "";
    var testForwardName = decodeURIComponent(forwardName);
    var testForwardContent = decodeURIComponent(forwardContent);
    var testForwardUName = decodeURIComponent(uname);
    if (forwardContent === "" || forwardContent === undefined) {
        forwardContentFinal = defaultTxt
    } else {
        forwardContentFinal = " //@" + testForwardName + ":" + testForwardContent
    }
    var title = $CLTMSG.CD0026;
    var loginStr = '<div class="shareLogin">                    	<div id="loginerror_' + fid + '"></div>						<em>' + $CLTMSG.CD0027 + '</em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="text" id="logintitle_' + fid + '" class="inputType"  style="width: 100px;"/></span></span>                        <em>&nbsp&nbsp&nbsp&nbsp' + $CLTMSG.CD0028 + ' </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="password" id="loginpwd_' + fid + '" class="inputType" style="width: 100px;"/></span></span>                    	<div class="clearit"></div>                    </div>';
    loginStr = "";
    if (el) {
        var lastForwarderName = el.getAttribute("lastforwardername");
        var initBlogerName = el.getAttribute("initblogername")
    }
    var aComment = [];
    aComment.push('<div class="selSend">');
    if (lastForwarderName) {
        aComment.push('<p><label for="lastForwarder_' + fid + '"><input type="checkbox" class="labelbox" id="lastForwarder_' + fid + '" />' + $CLTMSG.CD0029.replace(/#\{forwarder\}/g, lastForwarderName) + "</label></p>")
    }
    if (initBlogerName && initBlogerName != lastForwarderName) {
        aComment.push('<p><label for="initBloger_' + fid + '"><input type="checkbox" class="labelbox" id="initBloger_' + fid + '" />' + $CLTMSG.CD0030.replace(/#\{bloger\}/g, initBlogerName) + "</label></p>")
    }
    aComment.push(" </div>");
    var html = '			<div class="shareLayer" id="forwardcontent_' + fid + '">				<div class="zok" id="modforwardsucess_' + fid + '" style="display:none"></div>				<div id="mdforwardinputarea_' + fid + '">				<div class="turnToTxt" id="sharecontent_' + fid + '">' + $CLTMSG.CD0031 + decodeURIComponent(content) + '</div>				<div class="clearit"></div>				<div style="margin-top:5px;">					<div class="lf">						<a onclick="App.showFaces(this,$E(\'mdforwardtextarea_' + fid + '\'),-29,5);return false;" title="' + $CLTMSG.CD0032 + '" href="####" class="faceicon1"></a>					</div>				</div>				<div id="tipInfoBox' + fid + '" style="float:right;margin-right:13px;color:#008800"></div>				<textarea class="PY_textarea" id="mdforwardtextarea_' + fid + '">' + forwardContentFinal + "</textarea>" + loginStr + aComment.join(" ") + '<div class="MIB_btn"><a href="javascript:void(0);" id="mdforwardbtn_' + fid + '" class="btn_normal"><em>' + $CLTMSG.CD0023 + '</em></a><a href="javascript:void(0)" id="mdforwardcancel_' + fid + '" class="btn_notclick"><em>' + $CLTMSG.CD0005 + "</em></a></div>				</div>			</div>		";
    var cfg = {
        width: 390,
        zIndex: 1000
    };
    var dialog = new App.Dialog.BasicDialog(title, html, cfg);
    dialog._success = function (_cb) {
        dialog.close();
        var tipMsg = new App.alert($CLTMSG.CD0035, {
            icon: 3,
            hasBtn: false
        });
        setTimeout(function () {
            tipMsg.close();
            _cb()
        }, 1000)
    };
    var mdforwardtextarea = $E("mdforwardtextarea_" + fid);
    var tipStringOK = $CLTMSG.CD0033;
    var tipStringErr = $CLTMSG.CD0034;
    var forwardInputLimit = function () {
        var num = Math.ceil(Core.String.byteLength(Core.String.trim(mdforwardtextarea.value)) / 2);
        if ($E("tipInfoBox" + fid)) {
            if (num > 140) {
                $E("tipInfoBox" + fid).innerHTML = tipStringErr.replace(/\$\{num\}/, (maxlen / 2 - num) * (-1));
                $E("tipInfoBox" + fid).style.color = "#880000";
                return false
            } else {
                $E("tipInfoBox" + fid).innerHTML = tipStringOK.replace(/\$\{num\}/, (maxlen / 2 - num));
                $E("tipInfoBox" + fid).style.color = "#008800";
                return true
            }
        }
    };
    if (el) {
        try {
            setTimeout(function () {
                $E("mdforwardtextarea_" + fid).focus();
                if (!$IE) {
                    $E("mdforwardtextarea_" + fid).setSelectionRange(0, 0)
                }
                forwardInputLimit()
            }, 100)
        } catch (e) {}
    } else {
        dialog.show();
        $E("mdforwardtextarea_" + fid).focus();
        if (!$IE) {
            $E("mdforwardtextarea_" + fid).setSelectionRange(0, 0)
        }
        setTimeout(forwardInputLimit, 1)
    }
    var url = "/mblog/forward.php";
    if (scope.$eid) {
        url = "/event/aj_forward.php"
    }
    var mdforwardbtn = $E("mdforwardbtn_" + fid);
    var maxlen = 280;
    App.BindAtToTextarea(mdforwardtextarea, {
        borderWidth: "1px",
        fontSize: "12px"
    });
    App.autoHeightTextArea(mdforwardtextarea, function () {
        setTimeout(forwardInputLimit, 1)
    }, 145);
    var loginerror = $E("loginerror_" + fid);
    var disClass = "btn_notclick";
    var enableClass = "btn_normal";
    var name = $E("logintitle_" + fid);
    var pwd = $E("loginpwd_" + fid);
    var options = {
        zIndex: 1010,
        ref: name,
        wrap: loginerror,
        offsetY: -1,
        offsetX: 30
    };
    mdforwardtextarea.onfocus = function () {
        if (mdforwardtextarea.value === defaultTxt) {
            mdforwardtextarea.value = ""
        }
    };
    mdforwardtextarea.onblur = function () {
        if (mdforwardtextarea.value === "") {
            mdforwardtextarea.value = defaultTxt
        }
    };
    mdforwardtextarea.onkeydown = function (event) {
        event = event || window.event;
        if (event.keyCode === 13 && event.ctrlKey) {
            mdforwardbtn.onclick()
        }
    };
    if ($E("lastForwarder_" + fid)) {
        $E("lastForwarder_" + fid).onkeydown = function (event) {
            event = event || window.event;
            if (event.keyCode === 13 && event.ctrlKey) {
                mdforwardbtn.onclick()
            }
        }
    }
    if ($E("initBloger_" + fid)) {
        $E("initBloger_" + fid).onkeydown = function (event) {
            event = event || window.event;
            if (event.keyCode === 13 && event.ctrlKey) {
                mdforwardbtn.onclick()
            }
        }
    }
    $E("mdforwardcancel_" + fid).onclick = function () {
        dialog.close();
        return false
    };

    function forwardSuccess() {
        var reason = mdforwardtextarea.value = Core.String.leftB(mdforwardtextarea.value, maxlen);
        if (reason === defaultTxt) {
            reason = ""
        }
        var postdata = {
            reason: reason.replace(/\uff20/ig, "@"),
            mid: fid,
            styleid: scope.styleid,
            retcode: scope.doorretcode || ""
        };
        if (scope.$eid) {
            postdata.eid = scope.$eid
        }
        scope.doorretcode = "";
        if (scope.$pageid === "search") {
            postdata.from = "search"
        }
        if ((scope.$pageid === "myprofile" || scope.$pageid === "search") && scope.$feedtype !== "isori") {
            postdata.isindex = 1
        }
        var cb = function (data, json) {
            if (postdata.isLast) {
                var comments = $E("_comment_count_miniblog2_" + fid);
                if (!comments) {
                    return
                }
                var s = comments.getElementsByTagName("strong");
                if (s && (s = s[1])) {
                    var count = s.innerHTML;
                    count = parseInt(count.match(/(\d+)/));
                    count = ((count + "") == "NaN" ? 0 : count);
                    count = Math.max((count + 1), 0);
                    s.innerHTML = "";
                    count && (s.innerHTML = ["(", count, ")"].join(""))
                }
            }
            var _afterSuccesscallback = function () {
                if (!scope.loginKit().isLogin) {
                    location.reload()
                }
                if (typeof callback === "function") {
                    callback(el)
                }
                if (App.refurbishUpdate) {
                    App.refurbishUpdate.add(1)
                }
                if (!data) {
                    return
                }
                var feedlist = $E("feed_list");
                if (feedlist) {
                    var feedBox = document.createElement("UL");
                    feedBox.innerHTML = data.html;
                    var $d = window.document,
                        $e = $d.documentElement || {};
                    var $t = function () {
                        if (arguments.length > 0) {
                            $e.scrollTop = arguments[0];
                            $d.body.scrollTop = arguments[0];
                            return
                        }
                        return (window.pageYOffset || Math.max($e.scrollTop, $d.body.scrollTop))
                    };
                    setTimeout(function () {
                        var li = feedBox.getElementsByTagName("LI")[0];
                        if (!li) {
                            return
                        }
                        feedlist.parentNode.insertBefore(feedBox, feedlist);
                        feedlist.insertBefore(li, (feedlist.getElementsByTagName("LI"))[0]);
                        feedBox.parentNode.removeChild(feedBox);
                        try {
                            App.bindMedia(li)
                        } catch (e) {}
                        var _h = feedlist.getElementsByTagName("LI")[0].offsetHeight;
                        $t($t() + _h)
                    }, 1000)
                }
            };
            dialog._success(_afterSuccesscallback);
            var num = $E(exid);
            if (num) {
                var count = num.innerHTML.match(/\d+/) || 0;
                num.innerHTML = "(" + (parseInt(count) + 1) + ")";
                num.style.display = ""
            }
        };
        var ecb = function (json) {
            mdforwardbtn.className = enableClass;
            if (json && typeof json === "string" && json.indexOf("error") > 0) {
                App.alert($CLTMSG.CD0036);
                return false
            }
            if (json.code === "MR0050") {
                mdforwardbtn.className = enableClass;
                App.forbidrefresh(function () {
                    Core.Events.fireEvent(mdforwardbtn, "click")
                }, url);
                return false
            }
            if (json === $CLTMSG.CD0037) {
                return
            }
            App.alert(json, {
                ok: function () {
                    if (!scope.loginKit().isLogin) {
                        location.reload()
                    }
                    if (json.code === "M01155") {
                        dialog.close()
                    }
                }
            })
        };
        var getPara = 0;
        if ($E("lastForwarder_" + fid) && $E("lastForwarder_" + fid).checked) {
            postdata.isLast = "1";
            getPara++
        }
        if ($E("initBloger_" + fid) && $E("initBloger_" + fid).checked) {
            postdata.isRoot = "1";
            getPara++
        }
        if (getPara > 0) {
            url += "?f=" + getPara
        }
        App.doRequest(postdata, url, cb, ecb)
    }
    function errortTip(str, el) {
        el.focus();
        App.fixElement.setHTML(str, "", options);
        mdforwardbtn.className = enableClass;
        return false
    }
    mdforwardbtn.onclick = function () {
        if (!forwardInputLimit()) {
            var orbit = ["#fff", "#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff", "#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff"];
            var index = 0;
            var hook = App.timer.add(function () {
                if (index / 2 >= orbit.length) {
                    App.timer.remove(hook);
                    return false
                }
                mdforwardtextarea.style.backgroundColor = orbit[index / 2];
                index += 1
            });
            return false
        }
        if (mdforwardbtn.className === disClass) {
            return false
        }
        mdforwardbtn.className = disClass;
        if (scope.loginKit().isLogin) {
            forwardSuccess()
        } else {
            App.ModLogin({
                func: function () {
                    forwardSuccess()
                }
            });
            mdforwardbtn.className = enableClass
        }
        return false
    };
    App.enterSubmit({
        parent: "forwardcontent",
        action: function () {
            mdforwardbtn.onclick()
        }
    })
};
Core.Dom.insertAfter = function (newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement)
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling)
    }
    return newElement
};
App.copyText = function (text2copy) {
    var checkFlashVer = function () {
        var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
        if (plugin) {
            var words = navigator.plugins["Shockwave Flash"].description.split(" ");
            for (var i = 0; i < words.length; ++i) {
                if (isNaN(parseInt(words[i], 10))) {
                    continue
                }
                var MM_PluginVersion = words[i]
            }
            return MM_PluginVersion >= 10
        } else {
            if ($IE) {
                try {
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10");
                    return true
                } catch (e) {
                    return false
                }
            }
        }
    };
    if (window.clipboardData && $IE6) {
        window.clipboardData.clearData();
        return window.clipboardData.setData("Text", text2copy)
    } else {
        if (checkFlashVer()) {
            if ($IE) {
                try {
                    window.clipboardData.clearData();
                    return window.clipboardData.setData("Text", text2copy)
                } catch (e) {
                    return false
                }
            }
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
                if (!clip) {
                    return
                }
                var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
                if (!trans) {
                    return
                }
                trans.addDataFlavor("text/unicode");
                var str = {};
                var len = {};
                str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
                var copytext = text2copy;
                str.data = copytext;
                trans.setTransferData("text/unicode", str, copytext.length * 2);
                var clipid = Components.interfaces.nsIClipboard;
                if (!clip) {
                    return false
                }
                clip.setData(trans, null, clipid.kGlobalClipboard);
                return true
            } catch (e) {
                return false
            }
        } else {
            var flashcopier = "flashcopier";
            if (!$E(flashcopier)) {
                var divholder = $C("div");
                divholder.id = flashcopier;
                document.body.appendChild(divholder)
            }
            text2copy = text2copy.replace(/%/g, escape("%")).replace(/&/g, escape("&"));
            var divinfo = '<embed src="/view/js/clipboard.swf" FlashVars="clipboard=' + text2copy + '" width="0" height="0" type="application/x-shockwave-flash"></embed>';
            $E(flashcopier).innerHTML = divinfo;
            return true
        }
    }
};
App.copyTextDialog = function (text, cfg) {
    var config = cfg || {};
    var sucStr = config.succText || $CLTMSG.CC4101;
    var options = {
        icon: 3
    };
    if (App.copyText(text || "") == false) {
        sucStr = config.errorText || $CLTMSG.CD0016;
        options = {
            icon: 1
        }
    }
    App.alert(sucStr, options);
    Core.Events.stopEvent()
};
Core.Dom.contains = function (oParentNode, oNode) {
    return oParentNode.contains(oNode)
};
if (!$IE) {
    Core.Dom.contains = function (oParentNode, oNode) {
        do {
            if (oParentNode == oNode) {
                return true
            }
        } while (oNode = oNode.parentNode);
        return false
    }
}
App.changeBackColor = function (event, el) {
    event = event || window.event;
    var id = el.id;
    var cancel = $E("cancel_" + id);
    var message = $E("message_" + id);
    var remark = $E("remark_" + id);
    var fire = $E("fire_" + id);
    if (event.type == "mouseover") {
        var relatedTarget = event.relatedTarget || event.fromElement;
        if (el != relatedTarget && relatedTarget && !Core.Dom.contains(el, relatedTarget)) {
            if (cancel) {
                cancel.style.display = ""
            }
            if (message) {
                message.style.display = ""
            }
            if (remark) {
                remark.style.display = ""
            }
            if (fire) {
                fire.style.display = ""
            }
        }
    }
    if (event.type == "mouseout") {
        var relatedTarget = event.relatedTarget || event.toElement;
        if (el != relatedTarget && relatedTarget && !Core.Dom.contains(el, relatedTarget)) {
            if (cancel) {
                cancel.style.display = "none"
            }
            if (message) {
                message.style.display = "none"
            }
            if (remark) {
                remark.style.display = "none"
            }
            if (fire) {
                fire.style.display = "none"
            }
        }
    }
};
App.admin_uid_list = ["1257113795", "1642909335", "1658688240", "1661523401"];
App.followadd = function (uid, el, url, name, conf) {
    url = "/attention/aj_addfollow.php";
    if (conf) {
        url += ("?" + App.jsonToQuery(conf))
    }
    while (el.nodeName.toLowerCase(0) != "p") {
        el = el.parentNode
    }
    function cb(json) {
        if (scope.$pageid == "follow" && scope.$oid == scope.$uid) {
            var imgURI = scope.$BASECSS + "style/images/common/transparent.gif";
            el.innerHTML = '<img class="small_icon sicon_atteo" title="' + $CLTMSG.CC3001 + '" src="' + imgURI + '">'
        } else {
            el.innerHTML = '<a class="concernBtn_Yet" href="javascript:void(0);"><span class="add_yet"></span>' + $CLTMSG.CC2510 + "</a>"
        }
    }
    if (el.ask_following) {
        return false
    }
    App.followOperation({
        uid: uid,
        fromuid: scope.$uid
    }, url, cb, el)
};
App.followcancel = (function () {
    var current;
    return function (uid, el, act, name, sex) {
        sex = sex || "TA";
        var fix = act == 1 ? -40 : 0;
        var pos = Core.Dom.getXY(el);
        var x = pos[0] - (((act == 1 ? 250 : 200) - el.offsetWidth) / 2);
        var y = pos[1] - (el.offsetHeight) - 70 + fix;
        var str = $CLTMSG.CC3101;
        var tmp1 = new Utils.Template(str);
        var stxt = tmp1.evaluate({
            sex: sex
        });
        if (Core.Array.findit(App.admin_uid_list, uid) === -1) {
            stxt += '<div class="block"><input type="checkbox" id="del_block_user"><label for="del_block_user">' + $CLTMSG.CC2701 + "</label></div>"
        }
        var msg = act == 1 ? [stxt, $CLTMSG.CC3102 + name + "?"].join("") : [$CLTMSG.CC3103, name, "?"].join("");
        var ok = function () {
            var url = "/attention/aj_delfollow.php";
            var param = {
                touid: uid,
                fromuid: scope.$uid
            };
            if (act && act == 1) {
                param.action = 1
            }
            if ($E("del_block_user") && $E("del_block_user").checked) {
                param.isblack = "OK"
            }
            function cb(json) {
                var reload = function () {
                    setTimeout(function () {
                        window.location.reload(true)
                    }, 500)
                };
                var li = $E(uid);
                if (!li) {
                    reload();
                    return
                }
                li.onmouseover = null;
                li.onmouseout = null;
                App.Wipe(null, li).wipe("down", false, function () {
                    li.parentNode.parentNode.removeChild(li.parentNode);
                    if ($E("att_wrap")) {
                        if (!$E("att_wrap").getElementsByTagName("LI").length) {
                            reload();
                            return false
                        }
                    }
                    if (scope.$pageid == "profile") {
                        reload();
                        return false
                    }
                })
            }
            App.followOperation(param, url, cb, null, "del")
        };
        var cf = App.PopUpConfirm().position(x, y).content(msg).width(act == 1 ? 250 : 200).icon(4).yes(function () {
            if (!scope.loginKit().isLogin) {
                App.ModLogin({
                    func: function () {
                        setTimeout(function () {
                            Core.Events.fireEvent(el, "click")
                        }, 200)
                    }
                });
                return false
            }
            ok();
            return false
        }).no(function () {
            return false
        });
        setTimeout(function () {
            cf.wipe("up", true)
        }, 100)
    }
})();
App.followOperation = function (data, url, cb, el, type) {
    if (!scope.$uid) {
        App.ModLogin({
            func: arguments.callee,
            param: [data, url, cb]
        });
        return false
    }
    if (scope.$cuser_status === "nofull") {
        App.finishInformation();
        return false
    }
    if (scope.$uid == "123456") {
        var arg = arguments[0];
        data = arg[0];
        url = arg[1];
        cb = arg[2]
    }
    function ecb(json) {
        if (el) {
            el.ask_following = false
        }
        if (json.code == "M00003") {
            App.ModLogin()
        } else {
            if (json && json.code == "MR0050") {
                App.forbidrefresh(function () {
                    data.retcode = scope.doorretcode;
                    App.doRequest(data, url, sucss, ecb)
                }, "/attention/aj_addfollow.php")
            } else {
                App.alert(json, {
                    ok: function () {
                        if (scope.$uid == "123456") {
                            location.reload()
                        }
                    }
                })
            }
        }
    }
    var sucss = function (json) {
        cb(json);
        if (scope.$uid == "123456") {
            location.reload(true)
        }
    };
    if (type === "del") {
        App.doRequest(data, url, sucss, ecb)
    } else {
        App.doRequest(data, url, function (json) {
            if (el) {
                el.ask_following = true
            }
            sucss(json)
        }, ecb)
    }
};
App.copyLink = function (event) {
    var copytext = $E("copytext");
    var sucStr = $CLTMSG.CC2508;
    var options = {
        icon: 3
    };
    if (App.copyText(copytext.value) == false) {
        sucStr = $CLTMSG.CC2509;
        options = {
            icon: 1
        }
    }
    App.flyDialog(sucStr, null, $E("copylink"), options);
    Core.Events.stopEvent(event)
};
$registJob("initPage", function () {
    var copytext = $E("copytext");
    if (copytext) {
        copytext.onfocus = copytext.onclick = function () {
            copytext.select()
        };
        Core.Events.addEvent($E("copylink"), App.copyLink, "click")
    }
});
App.followAll = function (btn) {
    try {
        if (scope.$uid != scope.$oid) {
            return
        }
        var els = $E("att_wrap").getElementsByTagName("li");
        var uids = [];
        for (var i = 0, len = els.length; i < len; i++) {
            var el = els[i];
            if (el.className.search(/cur/i) != -1) {
                continue
            }
            uids.push(el.id)
        }
        if (!uids.length) {
            return false
        }
        var pos = Core.Dom.getXY(btn);
        var x = pos[0] - ((200 - btn.offsetWidth) / 2);
        var y = pos[1] - (btn.offsetHeight) - 50;
        var msg = [$CLTMSG.CD0007, name, "?"].join("");
        var _alert = App.PopUpAlert().position(x, y);

        function changeBGcolor(uids) {
            for (var i = 0, ilen = uids.length; i < ilen; i++) {
                var uid = uids[i];
                var add = $E("add_" + uid);
                if (add) {
                    if (scope.$uid == scope.$oid && scope.$pageid == "follow") {
                        var imgURI = scope.$BASECSS + "style/images/common/transparent.gif";
                        var _p = $C("p");
                        _p.className = "mutual";
                        _p.innerHTML = '<img class="small_icon sicon_atteo" title="' + $CLTMSG.CC3001 + '" src="' + imgURI + '">';
                        Core.Dom.replaceNode(_p, add)
                    } else {
                        add.innerHTML = '<a class="concernBtn_Yet" href="javascript:void(0);"><span class="add_yet"/>' + $CLTMSG.CC2510 + "</a>"
                    }
                }
            }
        }
        function cb() {
            changeBGcolor(uids);
            setTimeout(function () {
                _alert.content($CLTMSG.CC2601).position(x, y + 20).icon(3).wipe("up", true).lateClose(1500)
            }, 500);
            btn.style.visibility = "hidden"
        }
        function ecb(json) {
            if (json && json.code == "MR0050") {
                App.forbidrefresh(function () {
                    var data = {
                        uid: uids.join(","),
                        fromuid: scope.$uid
                    };
                    data.retcode = scope.doorretcode;
                    App.doRequest(data, "/attention/aj_addfollow.php", cb, ecb)
                }, "/attention/aj_addfollow.php")
            } else {
                if (json.code == "R01440") {
                    App.alert({
                        code: json.code
                    });
                    return false
                }
                App.promptTip(json, null, "system_information", "error");
                if (json.code == "M05003") {
                    changeBGcolor(json.data.uids)
                }
                if ($IE) {
                    location.hash = "top"
                } else {
                    document.body.scrollIntoView()
                }
            }
        }
        App.PopUpConfirm().position(x, y).width(200).content($CLTMSG.CL0803).icon(4).yes(function () {
            App.doRequest({
                uid: uids.join(","),
                fromuid: scope.$uid
            }, "/attention/aj_addfollow.php", cb, ecb)
        }).wipe("up", true)
    } catch (e) {
        throw e
    }
};
App.followRemarkAdd = function (el, fid, oldMark) {
    var initErrorTip = $CLTMSG.CC3104;
    var html = '<div style="width: 390px;" class="layerBoxCon">	    <div class="inviteLayer">	        <p class="flName">	            ' + $CLTMSG.CC3105 + '	        </p>	        <div class="inviteLayerInput">	            <input type="text" class="PY_input" id="remark" value="">	            <a id="submit" href="javascript:void(0);" class="btn_normal"><em>' + $CLTMSG.CC1102 + '</em></a>	        </div>	        <p class="errorTs yellow2" id="errorTip" style="display:none;">' + initErrorTip + "</p>	    </div>	</div>";
    var cfg = {
        width: 390,
        zIndex: 1000,
        hidden: true
    };
    var dialog = new App.Dialog.BasicDialog($CLTMSG.CC3106, html, cfg);
    dialog.show();
    var remark = $E("remark"),
        errorTip = $E("errorTip"),
        submit = $E("submit");
    var isChrome = (navigator.userAgent.toLowerCase().indexOf("chrome") != -1);
    if (isChrome) {
        submit.style.top = "-3px"
    }
    remark.focus();
    remark.value = (App._remarks_ && App._remarks_[fid]) || oldMark || remark.value;
    if (App._remarks_ && App._remarks_[fid] == "") {
        remark.value = ""
    }
    var init = true;
    Core.Events.addEvent(remark, function () {
        if (init && !oldMark && !(App._remarks_ && App._remarks_[fid])) {
            remark.value = "";
            init = false
        }
    }, "focus");
    Core.Events.addEvent(remark, function () {
        var len = Core.String.byteLength(remark.value);
        if (len > 16) {
            errorTip.innerHTML = initErrorTip;
            errorTip.style.display = "block";
            setTimeout(function () {
                remark.focus()
            }, 100)
        } else {
            if (errorTip.innerHTML == initErrorTip) {
                errorTip.style.display = "none"
            }
        }
    }, "blur");
    Core.Events.addEvent(remark, function () {
        var len = Core.String.byteLength(remark.value);
        if (len > 16) {
            remark.value = Core.String.leftB(remark.value, 16)
        } else {
            if (errorTip.innerHTML == initErrorTip) {
                errorTip.style.display = "none"
            }
        }
    }, "keyup");

    function setRemark() {
        if (Core.String.byteLength(remark.value) > 16) {
            errorTip.innerHTML = initErrorTip;
            errorTip.style.display = "block";
            setTimeout(function () {
                remark.focus()
            }, 200);
            return
        }
        var name = remark.value;
        App.doRequest({
            fuid: fid,
            remarkname: name
        }, "/attention/aj_remarkname.php", function () {
            App._remarks_ = App._remarks_ || {};
            App._remarks_[fid] = name;
            dialog.close();
            if (scope.$pageid == "profile") {
                window.location.reload(true)
            }
            var remarkName = Core.Dom.getElementsByClass(el.parentNode.parentNode.parentNode, "span", "remark")[0];
            if (remarkName && Core.String.trim(name).length > 0) {
                remarkName.innerHTML = "&nbsp;(" + Core.String.encodeHTML(Core.String.trim(name)) + ")"
            }
            if (remarkName && Core.String.trim(name).length === 0) {
                remarkName.innerHTML = ""
            }
        }, function () {
            if (arguments[0] && arguments[0].code) {
                errorTip.innerHTML = $SYSMSG[arguments[0].code];
                errorTip.style.display = "block"
            } else {
                App.alert($CLTMSG.CC3107, {
                    icon: 2,
                    width: 370,
                    height: 120
                })
            }
        })
    }
    Core.Events.addEvent(submit, setRemark, "click");
    App.enterSubmit({
        parent: submit.parentNode,
        action: function () {
            Core.Events.fireEvent(submit, "click")
        }
    })
};
App.rightSideFollow = function (uid, el, callback, conf) {
    var url = "/attention/aj_addfollow.php";
    if (conf) {
        url += ("?" + App.jsonToQuery(conf))
    }
    function cb() {
        var newDom = document.createElement("SPAN");
        newDom.innerHTML = $CLTMSG.CC2510;
        Core.Dom.insertAfter(newDom, el);
        Core.Dom.removeNode(el);
        if (typeof(callback) == "function") {
            callback()
        }
    }
    App.followOperation({
        uid: uid,
        fromuid: scope.$uid
    }, url, cb)
};
App.MediaDialog = {};
App.MediaDialog.BasicDialog = function (content, cfg, title) {
    this._node = $C("div");
    document.getElementsByTagName("BODY")[0].appendChild(this._node);
    var tpl = {
        title: title ? title : "",
        content: content ? content : "......"
    };
    var tt = this._node.style;
    tt.position = "absolute";
    tt.visibility = "hidden";
    if (!cfg) {
        cfg = {}
    }
    if (cfg.zIndex) {
        tt.zIndex = cfg.zIndex
    }
    if (cfg.beforeClose) {
        this._beforeClose = cfg.beforeClose
    }
    var str = '<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div class="layerBoxCon1"><div class="layerMedia"><div class="layerArrow"></div><div class="layerMedia_close"><strong>#{title}</strong><a class="close" href="#" title="' + $CLTMSG.CD0018 + '"></a></div>							#{content}</div></div></div></td><td class="mid_r"></td></tr>			    	<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr>			    </tbody></table>';
    var tmp = new Utils.Template(str);
    this._node.innerHTML = tmp.evaluate(tpl);
    this._node_body = Core.Dom.getElementsByClass(this._node, "DIV", "layerBoxCon1")[0];
    this._layerarrow = Core.Dom.getElementsByClass(this._node, "DIV", "layerArrow")[0];
    this.setSize(cfg.width, cfg.height);
    this._btn_close = this._node.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.firstChild.childNodes[1].childNodes[1];
    this._node_title = this._btn_close.previousSibling;
    this._btn_close.parent = this;
    this._btn_close.onclick = function () {
        Core.Events.stopEvent();
        if (cfg.hiddClose) {
            this.parent.hidd()
        } else {
            this.parent.close()
        }
    };
    this._btn_close.onmousedown = function () {};
    this.initinput();
    this._flytimer = cfg.timer || 0;
    this._flydistance = cfg.distance || 0;
    if (cfg.hidden) {
        tt.visibility = "hidden";
        this.focusTarget = this._btn_close
    } else {
        tt.visibility = "visible";
        this._btn_close.focus();
        this._btn_close.blur()
    }
};
App.MediaDialog.BasicDialog.prototype = {
    onClose: function () {},
    gc: function () {},
    distory: function () {
        if (this._distory) {
            return
        }
        this.gc();
        this._btn_close.onmousedown = null;
        this._btn_close.onclick = null;
        this._btn_close.parent = null;
        this._btn_close = null;
        this._node.parentNode.removeChild(this._node);
        if (scope.$IE) {
            this._node.outerHTML = null
        }
        this._node = null;
        this._distory = true
    },
    close: function () {
        if (this._beforeClose) {
            this._beforeClose()
        }
        if (this.onClose) {
            this.onClose()
        }
        this.distory()
    },
    show: function () {
        if (this._flytimer == 0 && this._flydistance == 0) {
            this._node.style.visibility = "visible"
        } else {
            this._node.style.visibility = "visible"
        }
        if (this.focusTarget) {
            this.focusTarget.focus()
        }
    },
    fly: function () {
        var v = Core.Base.detect.$IE ? this._flydistance / 3 : this._flydistance / 5;
        var dropOrbit = App.animation.speed(App.timer.delay, this._flydistance, v);
        var dialognode = this.node;
        var current = 0;
        var tk = (function (flytimer, flydistance, node) {
            var starttop = (node.style.top) + "px";
            App.timer.add(function () {
                if (current >= dropOrbit.length) {
                    App.timer.remove(tk);
                    return false
                }
                node.style.top = (parseInt(starttop) - dropOrbit[current]) + "px";
                current++
            })
        })(this._flytimer, this._flydistance, this._node)
    },
    hidd: function () {
        this._node.style.visibility = "hidden"
    },
    setPosition: function (x, y) {
        this._node.style.left = (x - Core.Dom.getLeft(this._layerarrow)) + "px";
        this._node.style.top = y + "px"
    },
    setTitle: function (str) {
        this._node_title.innerHTML = str
    },
    setMiddle: function () {
        var ow = this._node.offsetWidth;
        var oh = this._node.offsetHeight;
        var win_s = Core.System.winSize();
        var scroll_pos = Core.System.getScrollPos();
        var tx = (win_s.width - ow) / 2;
        var ty = scroll_pos[0] + (win_s.height - oh) / 2;
        this._node.style.left = tx + "px";
        this._node.style.top = (ty < 20 ? 20 : ty) + "px"
    },
    setSize: function (w, h) {
        w = w ? w + "px" : "auto";
        h = h ? h + "px" : "auto";
        var ts = this._node_body.style;
        ts.width = w;
        ts.height = h
    },
    initinput: function () {
        var inputs = this._node.getElementsByTagName("input");
        var length = inputs.length;
        var i = 0;
        for (i; i < length; i++) {
            var oInput = inputs[i];
            var sType = oInput.getAttribute("type");
            if (sType == "text" || sType == "password") {
                oInput.style.color = "#999999";
                Core.Events.addEvent(oInput, (function (el) {
                    return function () {
                        el.style.color = "#333333"
                    }
                })(oInput), "focus");
                Core.Events.addEvent(oInput, (function (el) {
                    return function () {
                        el.style.color = "#999999"
                    }
                })(oInput), "blur")
            }
        }
    },
    _mousemoveHandler: function () {
        if (this._ondrag) {
            var evt = Core.Events.fixEvent(Core.Events.getEvent());
            if (evt.target == this._btn_close) {
                return
            }
            if ($IE) {
                var ss = Core.System.getScrollPos();
                this._node.style.left = evt.pageX - this._btn_move.offsetx + ss[1] + "px";
                this._node.style.top = evt.pageY - this._btn_move.offsety + ss[0] + "px"
            } else {
                this._node.style.left = evt.pageX - this._btn_move.offsetx + "px";
                this._node.style.top = evt.pageY - this._btn_move.offsety + "px"
            }
        }
    }
};
App.addvideo = function (el, cb, ecb, owner) {
    if (scope.$extdialog) {
        scope.$extdialog.close();
        scope.$extdialog = null
    }
    var videohtml = '<div class="layerMedia_tip01">' + $CLTMSG.CL0201 + '</div>                    <div id="musicinput" class="layerMedia_input">                    	<input type="text" id="vinput" value="http://" class="layerMusic_txt"/>                        <a id="vsubmit" class="btn_normal" href="javascript:void(0)"><em>' + $CLTMSG.CL0112 + '</em></a>                    </div>                    <p id="vredinfo" class="layerMedia_err error_color" style="display:none">' + $CLTMSG.CL0105 + '</p>					<p id="normalact" class="mail_pl" style="display:none;"><a href="javascript:void(0);" id="vcancel">' + $CLTMSG.CL0202 + "</a>。</p>";
    var beforeClose = function () {
        scope.$extdialog = null
    };
    var _hasrequest = false;
    scope.$extdialog = new App.MediaDialog.BasicDialog(videohtml, {
        width: 368,
        zIndex: 1000,
        hidden: true,
        timer: 2,
        distance: 5,
        beforeClose: function () {
            beforeClose()
        }
    });
    var _addEvent = Core.Events.addEvent;
    var position = Core.Dom.getXY(el);
    scope.$extdialog.setPosition(position[0], position[1] + parseInt(el.offsetHeight) + 5);
    var _cb = typeof cb === "function" ? cb : function () {};
    var _ecb = typeof ecb === "function" ? ecb : function () {};
    var videosubmit = function (nosuc) {
        if (_hasrequest) {
            return false
        }
        var params = {
            url: $E("vinput").value
        };
        var redinfo = $E("vredinfo");
        var normalact = $E("normalact");
        _hasrequest = true;
        Utils.Io.Ajax.request("/video/publish.php", {
            POST: params,
            onComplete: function (json) {
                if (json) {
                    if (json.code == "A00006") {
                        redinfo.style.display = "none";
                        redinfo.innerHTML = "";
                        normalact.style.display = "none";
                        if (!nosuc) {
                            _cb(json);
                            scope.$extdialog.close()
                        }
                    } else {
                        redinfo.style.display = "";
                        redinfo.innerHTML = App.getMsg({
                            code: json.code
                        });
                        normalact.style.display = "";
                        _ecb(json);
                        _hasrequest = false
                    }
                } else {
                    redinfo.style.display = "";
                    redinfo.innerHTML = $CLTMSG.CL0105;
                    normalact.style.display = "";
                    _ecb();
                    _hasrequest = false
                }
            },
            onException: function () {
                if (json) {
                    redinfo.style.display = "";
                    redinfo.innerHTML = App.getMsg({
                        code: json.code
                    });
                    normalact.style.display = "";
                    _ecb(json)
                } else {
                    redinfo.style.display = "";
                    redinfo.innerHTML = App.getMsg({
                        code: R01404
                    });
                    normalact.style.display = "";
                    _ecb()
                }
                _hasrequest = false
            },
            returnType: "json"
        })
    };
    try {
        scope.$extdialog.show();
        _addEvent($E("vsubmit"), function () {
            videosubmit()
        }, "click");
        _addEvent($E("vinput"), function () {
            if ($E("vinput").value == "http://") {
                $E("vinput").value = ""
            }
        }, "focus");
        _addEvent($E("vinput"), function () {
            if ($E("vinput").value == "") {
                $E("vinput").value = "http://"
            } else {
                videosubmit(true);
                _hasrequest = false
            }
        }, "blur");
        _addEvent($E("vcancel"), function () {
            if (scope.$extdialog) {
                scope.$extdialog.close()
            }
        }, "click");
        _addEvent($E("vback"), function () {
            if ($E("vinput")) {
                owner.insertText(" " + $E("vinput").value + " ")
            }
            if (scope.$extdialog) {
                scope.$extdialog.close()
            }
        }, "click");
        App.enterSubmit({
            parent: "musicinput",
            action: function () {
                videosubmit()
            }
        });
        var hidd = function () {
            var oEvent = Core.Events.getEvent();
            var oTarget = oEvent ? (oEvent.srcElement || oEvent.target) : null;
            if (scope.$extdialog) {
                if (Core.Dom.contains(scope.$extdialog._node, oTarget)) {
                    return true
                } else {
                    scope.$extdialog && scope.$extdialog.close()
                }
            }
            Core.Events.removeEvent(document.body, hidd, "click");
            Core.Events.stopEvent();
            return false
        };
        Core.Events.addEvent(document.body, hidd, "click")
    } catch (e) {}
    return true
};
(function (proxy) {
    proxy.miniblogPublisherVideo = function (spec) {
        var that = {};
        that.init = function (owner) {
            var upMusic = function (el) {
                var _suc = function (json) {
                    try {
                        if (json) {
                            owner.insertText(" " + json.data.shorturl + " ")
                        }
                    } catch (exp) {}
                };
                App.addvideo(spec.button, _suc, function () {}, owner);
                Core.Events.stopEvent();
                return false
            };
            Core.Events.addEvent(spec.button, function () {
                if (!owner.checkLogin(arguments)) {
                    return
                }
                upMusic()
            }, "click")
        };
        that.clear = function () {};
        return that
    }
})(App);
Core.Dom.getElementsByAttr = function (node, attname, attvalue) {
    var nodes = [];
    for (var i = 0, l = node.childNodes.length; i < l; i++) {
        if (node.childNodes[i].nodeType == 1) {
            if (node.childNodes[i].getAttribute(attname) == attvalue) {
                nodes.push(node.childNodes[i])
            }
            if (node.childNodes[i].childNodes.length > 0) {
                nodes = nodes.concat(arguments.callee.call(null, node.childNodes[i], attname, attvalue))
            }
        }
    }
    return nodes
};
$registJob("init_input", function () {
    App.Dom.getBy(function (el) {
        if (el.getAttribute("dycolor") || el.getAttribute("dycolor") == false) {
            return
        }
        var sType = el.getAttribute("type");
        var name = el.getAttribute("name");
        if (/text|password/.test(sType) && name != "nickname") {
            var _clew = el.getAttribute("clew");
            el.style.color = "#999";
            Core.Events.addEvent(el, function () {
                if (_clew) {
                    if (_clew === el.value) {
                        el.value = ""
                    }
                }
                el.style.color = "#333"
            }, "focus");
            Core.Events.addEvent(el, function () {
                if (_clew) {
                    if (el.value === "") {
                        el.value = _clew
                    }
                }
                el.style.color = "#999"
            }, "blur")
        }
    }, "input", document)
});
scope.jsReady = function () {
    return true
};
App.addmusic = function (el, cb, ecb, owner) {
    if (scope.$extdialog) {
        scope.$extdialog.close();
        scope.$extdialog = null
    }
    scope.$playsong = null;
    var musichtml = '<div class="layerTag">                    	<ul>                        <li id="findsong" class="cur"><a href="javascript:void(0)" onclick = "App.musicchangeli(\'1\');return false;">' + $CLTMSG.CL0101 + '</a><span class="tagR"></span></li>                        <li id="inputmusiclink"><a href="javascript:void(0);"  onclick = "App.musicchangeli(\'2\');return false;">' + $CLTMSG.CL0102 + '</a><span class="tagR"></span></li>                        </ul>                     </div>					 <div id="findsongdiv">						 <div class="layerMedia_input">		                    <input id="mfindinput" type="text" value="' + $CLTMSG.CL0103 + '" class="layerMusic_txt"/>							<a id="mfindsubmit" class="btn_normal" href="javascript:void(0);"><em>' + $CLTMSG.CL0104 + '</em></a>						</div>						<p id="mfindredinfo" style="display:none;" class="layerMedia_err error_color">' + $CLTMSG.CL0105 + '</p>					 	<div id="mfindmusictip" class="layerMedia_tip01" style="display:none"></div>						<div id="musicDetail" class="musicDetail" style="display:none">						<div><a id="mfindinfo" class="btn_normal" href="javascript:void(0)"><em>' + $CLTMSG.CL0106 + '</em></a></div>						</div>					 </div>					 <div id="linksongdiv" style="display:none;">					 <div id="linksonginput" class="layerMedia_input">	                    <input id="mlinkinput" type="text" value="' + $CLTMSG.CL0107 + '" class="layerMusic_txt" style=""/>	                    <a id="mlinksubmit" class="btn_normal" href="javascript:void(0);" style=""><em>' + $CLTMSG.CL0106 + '</em></a>	                 </div>					 <p id="mlinkredinfo" style="display:none;" class="layerMedia_err error_color">' + $CLTMSG.CL0105 + '</p>					 <p id="mlinkre" class="mail_pl" style="display:none;"><a href="javascript:void(0);" id="mlinkback">' + $CLTMSG.CL0108 + '</a>。</p>					 <div id="mlinkmusictip" class="layerMedia_tip01" style="display:none"></div>					 <div id="musicInfo" class="musicInfo" style="display:none">                            <table>                            	<tbody><tr>                                	<th><em class="error_color">*</em>' + $CLTMSG.CL0109 + '</th>                                	<td><input id = "songname" type="text" value="" class="musicInfo_txt"/><span id="mlinkredtext" class="error_color" style="display:none">' + $CLTMSG.CL0110 + "</span></td>                                </tr>                                <tr>                                	<th>" + $CLTMSG.CL0111 + '</th>                                	<td><input id = "singer" type="text" value="" class="musicInfo_txt"/></td>                                </tr>                                <tr>                                	<th/>                                	<td><a class="btn_normal" id="mlinkinfo" href="javascript:void(0);"><em>' + $CLTMSG.CL0112 + "</em></a></td>                                </tr>                            </tbody></table>                            </div>						</div>";
    var beforeClose = function () {
        scope.$playsong = null;
        if ($E("musicflash")) {
            Core.Dom.removeNode($E("musicflash"))
        }
        scope.$extdialog = null
    };
    scope.$extdialog = new App.MediaDialog.BasicDialog(musichtml, {
        width: 373,
        zIndex: 1000,
        hidden: true,
        timer: 2,
        distance: 5,
        beforeClose: function () {
            beforeClose()
        }
    });
    var _musicfindtip = $E("mfindmusictip");
    var _mfindredinfo = $E("mfindredinfo");
    var _mlinkre = $E("mlinkre");
    var _mfindsubmit = $E("mfindsubmit");
    var _mfindinfo = $E("mfindinfo");
    var _musicDetail = $E("musicDetail");
    var _mlinksubmit = $E("mlinksubmit");
    var _mlinkinfo = $E("mlinkinfo");
    var _musicInfo = $E("musicInfo");
    var _mlinkredinfo = $E("mlinkredinfo");
    var _songname = $E("songname");
    var _singer = $E("singer");
    var _linkshorturl;
    var _mlinkredtext = $E("mlinkredtext");
    var _musiclinktip = $E("mlinkmusictip");
    var _flashobject;
    var _getElementsByAttr = Core.Dom.getElementsByAttr;
    var _addEvent = Core.Events.addEvent;
    var position = Core.Dom.getXY(el);
    scope.$extdialog.setPosition(position[0], position[1] + parseInt(el.offsetHeight) + 5);
    var _cb = typeof cb === "function" ? cb : function () {};
    var _ecb = typeof ecb === "function" ? ecb : function () {};
    var _mfindinput = $E("mfindinput");
    var _mlinkinput = $E("mlinkinput");
    var _dorequest = App.doRequest;
    var _show = function (el, txt) {
        if (txt) {
            el.innerHTML = txt
        }
        el.style.display = ""
    };
    var _hidden = function (el) {
        el.innerHTML = "";
        el.style.display = "none"
    };
    var _addmusicflash = function () {
        if ($E("musicflash")) {
            return
        }
        Core.Dom.insertHTML($E("publisher_music"), '<div id="musicflash"></div>', "AfterEnd");
        var flashParams = {
            quality: "high",
            allowScriptAccess: "always",
            wmode: "transparent",
            allowFullscreen: true
        };
        var flashVars = {};
        swfobject.embedSWF([scope.$BASESTATIC + "miniblog/static/swf/player/MiniPlayer.swf", Boot.getJsVersion()].join(""), "musicflash", "1", "1", "9.0.0", null, flashVars, flashParams)
    };
    var _getflash = function () {
        return Core.Base.detect.$IE ? window.musicflash : document.musicflash
    };
    var _getLength = function (str) {
        var len = Core.String.trim(str).length;
        if (len > 0) {
            return Math.ceil(Core.String.byteLength(Core.String.trim(str)) / 2)
        } else {
            return 0
        }
    };
    var _getmusicdom = function (elplay) {
        while (elplay.tagName.toLowerCase() != "tr") {
            elplay = elplay.parentNode
        }
        return elplay
    };
    var _testlimit = function () {
        var songlen = _getLength(_songname.value);
        var songrtn = true;
        var singerrtn = true;
        if (songlen >= 0 && songlen <= 15) {
            songrtn = true
        } else {
            songrtn = false
        }
        var singerlen = _getLength(_singer.value);
        if (singerlen >= 0 && singerlen <= 15) {
            singerrtn = true
        } else {
            singerrtn = false
        }
        if (singerrtn && songrtn) {
            _hidden(_mlinkredinfo);
            return true
        } else {
            if (!singerrtn) {
                _show(_mlinkredinfo, $CLTMSG.CL0113);
                return false
            }
            if (!songrtn) {
                _show(_mlinkredinfo, $CLTMSG.CL0114);
                return false
            }
        }
    };
    var _event_mfindsubmit = function () {
        if (Core.String.trim(_mfindinput.value) == "" || Core.String.trim(_mfindinput.value) == $CLTMSG.CL0103) {
            return false
        }
        _flashobject.songStop();
        _mfindinput.value = Core.String.trim(_mfindinput.value);
        _dorequest({
            songname: _mfindinput.value
        }, "/music/search.php", function (json, result) {
            if (result) {
                _hidden(_mfindredinfo);
                _hidden(_musicfindtip);
                if ($E("music_list")) {
                    Core.Dom.removeNode($E("music_list"))
                }
                var tempsongname = Core.String.encodeHTML(_getLength(_mfindinput.value) > 25 ? (_mfindinput.value.substr(0, 25) + "...") : _mfindinput.value);
                if (result.count > 0) {
                    _show(_musicfindtip, $CLTMSG.CL0115);
                    Core.Dom.insertHTML(_musicDetail, json, "AfterBegin");
                    _show(_musicDetail);
                    var li_play = Core.Dom.getElementsByClass($E("music_list"), "div", "play");
                    var li_label = $E("music_list").getElementsByTagName("label");
                    for (var i = 0; i < li_play.length; i++) {
                        li_label[i].innerHTML = _getLength(li_label[i].innerHTML) > 25 ? li_label[i].innerHTML.substr(0, 47) + "..." : li_label[i].innerHTML;
                        _addEvent(li_play[i], (function (el, allel) {
                            return function () {
                                try {
                                    var cursong = _getmusicdom(el);
                                    var tmpclass = el.className == "play" || false;
                                    for (var j = 0; j < allel.length; j++) {
                                        allel[j].className = "play"
                                    }
                                    if (scope.$playsong === cursong) {
                                        if (tmpclass) {
                                            _flashobject.songPlay();
                                            return false
                                        } else {
                                            _flashobject.songStop();
                                            return false
                                        }
                                    } else {
                                        var cursongurl = encodeURIComponent(_getElementsByAttr(cursong, "name", "url")[0].value);
                                        scope.$playsong = cursong;
                                        _flashobject.setUrl(cursongurl);
                                        return false
                                    }
                                } catch (e) {}
                            }
                        })(li_play[i], li_play), "click")
                    }
                    var li_select = Core.Dom.getElementsByClass($E("music_list"), "p", "mselect");
                    for (var j = 0; j < li_select.length; j++) {
                        _addEvent(li_select[j], (function (el) {
                            return function () {
                                var cur = _getmusicdom(el);
                                var radio = _getElementsByAttr(cur, "name", "url")[0];
                                radio.checked = true
                            }
                        })(li_select[j]), "click")
                    }
                } else {
                    _show(_mfindredinfo, $CLTMSG.CL0116 + tempsongname + $CLTMSG.CL0117);
                    _musicDetail.style.display = "none"
                }
            }
        }, function (json) {
            if (json) {
                var tempsongname = Core.String.encodeHTML(_getLength(_mfindinput.value) > 25 ? (_mfindinput.value.substr(0, 25) + "...") : _mfindinput.value);
                _show(_mfindredinfo, $CLTMSG.CL0116 + tempsongname + $CLTMSG.CL0117)
            }
            _hidden(_musicfindtip);
            _musicDetail.style.display = "none"
        })
    };
    var _event_mfindinfo = function () {
        var radiosong = Core.Dom.getElementsByAttr(_musicDetail, "name", "url");
        var selectsong, songname, singer;
        for (var i = 0; i < radiosong.length; i++) {
            if (radiosong[i].checked == true) {
                selectsong = radiosong[i];
                songname = Core.Dom.getElementsByAttr(selectsong.parentNode, "name", "songname")[0].value;
                singer = Core.Dom.getElementsByAttr(selectsong.parentNode, "name", "singer")[0].value;
                break
            }
        }
        if (!selectsong) {
            _show(_mfindredinfo, $CLTMSG.CL0118);
            return
        }
        _dorequest({
            url: selectsong.value,
            name: songname,
            singer: singer
        }, "/music/publish.php", function (json, result) {
            _cb(json);
            scope.$extdialog.close()
        }, function (json) {
            if (json) {
                _show(_mfindredinfo, App.getMsg({
                    code: json.code
                }))
            }
            _hidden(_musicfindtip);
            _musicDetail.style.display = "none"
        })
    };
    var _event_mlinksubmit = function () {
        _musicInfo.style.display = "none";
        _mlinksubmit.style.display = "";
        if (Core.String.trim(_mlinkinput.value) == "" || Core.String.trim(_mlinkinput.value) == $CLTMSG.CL0107) {
            return false
        }
        _dorequest({
            url: _mlinkinput.value
        }, "/music/input_check.php", function (json) {
            _show(_musiclinktip, $CLTMSG.CL0119);
            _hidden(_mlinkredinfo);
            _mlinkre.style.display = "none";
            _show(_musicInfo);
            if (json) {
                _singer.value = json.author || "";
                _songname.value = json.title || "";
                _linkshorturl = json.url
            }
        }, function (json) {
            if (json) {
                if (json.code) {
                    _show(_mlinkredinfo, App.getMsg({
                        code: json.code
                    }));
                    _show(_mlinkre)
                } else {
                    _show(_mlinkredinfo, App.getMsg({
                        code: "M14002"
                    }));
                    _show(_mlinkre)
                }
            }
            _musicInfo.style.display = "none";
            _singer.value = "";
            _songname.value = "";
            _linkshorturl = "";
            _hidden(_musiclinktip)
        })
    };
    var _event_mlinkinfo = function () {
        _hidden(_mlinkredtext);
        if (!_testlimit()) {
            return false
        }
        if (_songname.value == "" || Core.String.trim(_songname.value) == "") {
            _show(_mlinkredtext, $CLTMSG.CL0103);
            return false
        }
        _dorequest({
            url: _linkshorturl,
            name: _songname.value,
            singer: _singer.value
        }, "/music/publish_link.php", function (json) {
            _cb(json);
            scope.$extdialog.close()
        }, function (json) {
            if (json) {
                _show(_mlinkredinfo, App.getMsg({
                    code: json.code
                }))
            }
            _ecb(json)
        })
    };
    try {
        _addmusicflash();
        _flashobject = _getflash();
        App.fansfind({
            input: _mfindinput,
            timer: 7,
            light: function (el) {
                el.className = "cur"
            },
            select: function (value, text) {
                _mfindinput.value = text;
                _event_mfindsubmit()
            },
            "class": "layerMedia_menu",
            data: "/music/recommend.php"
        });
        scope.$extdialog.show();
        _addEvent(_songname, function () {
            _hidden(_mlinkredtext);
            _testlimit()
        }, "blur");
        _addEvent(_singer, function () {
            _hidden(_mlinkredtext);
            _testlimit()
        }, "blur");
        _addEvent(_mfindinput, function () {
            if (_mfindinput.value == $CLTMSG.CL0103) {
                _mfindinput.value = ""
            }
        }, "focus");
        _addEvent(_mfindinput, function () {
            if (_mfindinput.value == "") {
                _mfindinput.value = $CLTMSG.CL0103
            }
        }, "blur");
        _addEvent(_mlinkinput, function () {
            if (_mlinkinput.value == $CLTMSG.CL0107) {
                _mlinkinput.value = ""
            }
        }, "focus");
        _addEvent(_mlinkinput, function () {
            if (_mlinkinput.value == "") {
                _mlinkinput.value = $CLTMSG.CL0107
            } else {
                _event_mlinksubmit()
            }
        }, "blur");
        _addEvent($E("mlinkcancel"), function () {
            if (scope.$extdialog) {
                scope.$extdialog.close()
            }
        });
        _addEvent($E("mlinkback"), function () {
            if (_mlinkinput) {
                owner.insertText(" " + _mlinkinput.value + " ")
            }
            if (scope.$extdialog) {
                scope.$extdialog.close()
            }
        });
        _addEvent(_mfindsubmit, function () {
            _event_mfindsubmit()
        }, "click");
        _addEvent(_mfindinfo, function () {
            _event_mfindinfo()
        }, "click");
        _addEvent(_mlinksubmit, function () {
            _event_mlinksubmit()
        }, "click");
        _addEvent(_mlinkinfo, function () {
            _event_mlinkinfo()
        }, "click");
        App.enterSubmit({
            parent: "findsongdiv",
            action: function () {
                _event_mfindsubmit()
            }
        });
        App.enterSubmit({
            parent: "linksonginput",
            action: function () {
                _event_mlinksubmit();
                _mlinkinput.blur()
            }
        });
        var hidd = function () {
            var oEvent = Core.Events.getEvent();
            var oTarget = oEvent ? (oEvent.srcElement || oEvent.target) : null;
            if (scope.$extdialog) {
                while (oTarget && oTarget != document.body) {
                    if (oTarget == scope.$extdialog._node || oTarget.className == "layerMedia_menu") {
                        return true
                    }
                    oTarget = oTarget.parentNode
                }
                scope.$extdialog && scope.$extdialog.close()
            }
            Core.Events.removeEvent(document.body, hidd, "click");
            Core.Events.stopEvent();
            return false
        };
        Core.Events.addEvent(document.body, hidd, "click")
    } catch (e) {}
};
App.musicchangeli = function (lid) {
    if (lid == "1") {
        $E("findsongdiv").style.display = "";
        $E("linksongdiv").style.display = "none";
        $E("findsong").className = "cur";
        $E("inputmusiclink").className = ""
    }
    if (lid == "2") {
        $E("findsongdiv").style.display = "none";
        $E("linksongdiv").style.display = "";
        $E("inputmusiclink").className = "cur";
        $E("findsong").className = ""
    }
    return false
};
scope.listener = function (SONG_PLAYING, b) {
    if (!scope.$playsong) {
        return false
    }
    var play = Core.Dom.getElementsByClass(scope.$playsong, "div", "play")[0] || Core.Dom.getElementsByClass(scope.$playsong, "div", "stop")[0] || Core.Dom.getElementsByClass(scope.$playsong, "div", "loading")[0];
    if (b == "playing") {
        play.className = "stop"
    } else {
        if (b == "buffer") {
            play.className = "loading"
        } else {
            play.className = "play"
        }
    }
};
(function (proxy) {
    proxy.miniblogPublisherMusic = function (spec) {
        var that = {};
        that.init = function (owner) {
            var upMusic = function (el) {
                var _suc = function (json) {
                    if (json) {
                        owner.insertText("  " + (Core.String.trim(json.singer).length > 0 ? json.singer + "-" : "") + json.name + "-" + json.shorturl + "  ")
                    }
                };
                App.addmusic(spec.button, _suc, function () {}, owner);
                Core.Events.stopEvent();
                return false
            };
            Core.Events.addEvent(spec.button, function () {
                if (!owner.checkLogin(arguments)) {
                    return
                }
                upMusic()
            }, "click")
        };
        that.clear = function () {};
        return that
    }
})(App);
(function (proxy) {
    proxy.miniblogPublisherFace = function (spec) {
        var that = {};
        that.init = function (owner) {
            var flush = function () {
                owner.limit()
            };
            spec.button.href = "####";
            spec.button.onclick = function () {
                return false
            };
            var target;
            Core.Events.addEvent(spec.button, function (e) {
                target = target || e.srcElement || e.target;
                if (!owner.checkLogin(arguments)) {
                    return
                }
                App.showFaces(spec.button, owner.getDom("editor"), -32, 5, "360px", flush, function (face) {
                    owner.insertText(face);
                    return true
                });
                return false
            }, "click")
        };
        that.clear = function () {};
        return that
    }
})(App);
$registJob("publisher3", function () {
    var _addFeed = function (feedStr, extinfo) {
        if ($E("emptydata_msg")) {
            $E("emptydata_msg").style.display = "none"
        }
        var feedList = $E("feed_list");
        if (feedList && feedStr != null) {
            if (App.refurbishUpdate) {
                App.refurbishUpdate.add(1)
            }
            var ul = $C("ul"),
                li, fstc = feedList.getElementsByTagName("li")[0];
            ul.className = "MIB_feed";
            with(ul.style) {
                overflow = "hidden";
                visibility = "hidden";
                position = "relative";
                clear = "both";
                height = "0px"
            }
            ul.innerHTML = feedStr;
            feedList.parentNode.insertBefore(ul, feedList);
            li = ul.getElementsByTagName("li")[0];
            li && (li.style[$IE ? "styleFloat" : "cssFloat"] = "left");
            try {
                App.bindMedia(ul)
            } catch (e) {}
            setTimeout(function () {
                App.Wipe(ul, li).wipe("down", false, function () {
                    if (scope.$eid) {
                        var betops = App.Dom.getByClass("betop", "img", feedList);
                        var len = betops.length;
                        if (len > 0) {
                            var tmp = betops[len - 1];
                            while (!App.Dom.hasClass(tmp, "MIB_linedot_l")) {
                                tmp = tmp.parentNode
                            }
                            fstc = tmp.nextSibling
                        }
                    }
                    feedList.insertBefore(li, fstc);
                    ul.parentNode.removeChild(ul);
                    li.style.cssText = ""
                }, true)
            }, 1500)
        }
    };
    var pub = App.miniblogPublisher({
        editor: $E("publish_editor"),
        submit: $E("publisher_submit"),
        info: $E("publisher_info")
    }, {
        init: function (pub) {
            if (scope.$no_cookie_cache) {
                return false
            }
            if (scope.$eid) {
                return false
            }
            return true
        },
        onDisable: function () {
            $E("publisher_submit").parentNode.className = "postBtnBg bgColorA_No"
        },
        onEnable: function () {
            $E("publisher_submit").parentNode.className = "postBtnBg"
        },
        onLimit: function (len) {
            if (len >= 0 && len <= 140) {
                $E("publisher_info").className = "wordNumBg";
                $E("publisher_info").innerHTML = $CLTMSG.CD0071.replace(/#\{cls\}/, "pipsLim").replace(/#\{len\}/, 140 - len)
            } else {
                $E("publisher_info").className = "wordNumBg error";
                var _src = 'src="' + scope.$BASECSS + 'style/images/common/transparent.gif" ';
                var _num = $CLTMSG.CD0072.replace(/#\{len\}/, (140 - len) * (-1));
                $E("publisher_info").innerHTML = '<div class="word_c"><img ' + _src + ' title="" alt="" class="tipicon tip2">' + _num + '</div><b class="rcorner"></b>'
            }
        },
        onSuccess: function (json, params) {
            $E("publish_editor").parentNode.className = "inputsuccess";
            $E("publish_editor").style.display = "none";
            setTimeout(function () {
                $E("publish_editor").parentNode.className = "inputarea";
                $E("publish_editor").style.display = "";
                $E("publish_editor").focus()
            }, 1000);
            if (typeof scope.$publishCallback === "function") {
                try {
                    scope.$publishCallback(json, params)
                } catch (e) {}
            }
            if (scope["$feedtype"] === "ispic" && !params.pic) {
                return false
            }
            if (scope["$feedtype"] === "islink" && json.islink != 1) {
                return false
            }
            if (scope["$feedtype"] === "isrt") {
                return false
            }
            if (scope["$feedtype"] === "favorite") {
                return false
            }
            if (scope["$feedtype"] === "isat") {
                if (scope.$uname) {
                    if (!(new RegExp("(@|＠)" + scope.$uname + "([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(params.content)) {
                        return false
                    }
                }
            }
            setTimeout(function () {
                _addFeed(json.html, json.extinfo)
            }, 10)
        },
        onError: function () {},
        limitNum: 140,
        emptyStr: ["#请在这里输入自定义话题#"],
        topic: "",
        styleId: scope.styleid
    }).plugin(App.miniblogPublisherImage({
        button: $E("publisher_image")
    })).plugin(App.miniblogPublisherTopic({
        button: $E("publisher_topic")
    })).plugin(App.miniblogPublisherVideo({
        button: $E("publisher_video")
    })).plugin(App.miniblogPublisherMusic({
        button: $E("publisher_music")
    })).plugin(App.miniblogPublisherFace({
        button: $E("publisher_faces")
    }))
});
$registJob("topic", function () {
    var _alert = App.alert;
    var generalError = function (json) {
        if (json && json.code) {
            _alert({
                code: json.code
            }, {
                ok: function () {
                    if (scope.$uid == "123456") {
                        window.location.reload();
                        return
                    }
                }
            })
        } else {
            _alert({
                code: "R01404"
            })
        }
        lock = false
    };
    var lock = false;
    var element = {
        addBox: $E("add_topic_box"),
        lisBox: $E("list_topic_box"),
        moreBox: $E("more_topic_box"),
        lisTit: $E("topic_list_title"),
        shell: $E("topic_list_shell"),
        newTopic: $E("add_topic_btn"),
        topic: $E("att_topic")
    };
    var template = {
        botton: '<a href="javascript:void(0);" onclick="App.topic.add(\'${keyword}\',this);return false;">' + $CLTMSG.CX0040 + "</a>",
        added: $CLTMSG.CX0041 + " (<a href=\"javascript:;\" onclick=\"App.topic.del('${keyid}','${keyword}',this);return false;\">" + $CLTMSG.CX0042 + "</a>)",
        item: '<a href="/k/${keyword}">${keyword}</a><span href="javascript:void();" onclick="App.topic.del(\'${keyid}\');return false;" title="' + $CLTMSG.CX0043 + '">x</span>'
    };
    var req = {
        addTopic: {
            mtd: "POST",
            url: "/dialog/adddialog.php"
        },
        delTopic: {
            mtd: "POST",
            url: "/dialog/deldialog.php"
        }
    };
    var doRequest = function (key, parameters, sucFun, errFun) {
        if (!req[key]) {
            throw ("wrong key for request!")
        }
        if (!parameters) {
            throw ("what is you want to update?")
        }
        sucFun = sucFun ||
        function () {};
        errFun = errFun || generalError;
        var option = {};
        option[req[key]["mtd"]] = parameters;
        option.onComplete = function (json) {
            if (json.code == "A00006") {
                sucFun(json.data)
            } else {
                errFun(json)
            }
        };
        option.onException = errFun;
        option.returnType = "json";
        Utils.Io.Ajax.request(req[key]["url"], option)
    };
    var isList = element.lisBox ? true : false;
    var maxList = 10;
    App.topic = {
        add: function (keyword, dom, func, errfunc) {
            if (lock) {
                return false
            }
            lock = true;
            func = func ||
            function () {};
            keyword = decodeURIComponent(keyword);
            if (!keyword) {
                return false
            }
            if (scope.$uid == "") {
                App.ModLogin({
                    func: App.topic.add,
                    param: keyword
                });
                return
            }
            var success = function (json) {
                if (scope.$uid == "123456") {
                    window.location.reload();
                    return
                }
                var keyid = json || "";
                var addedString = template.added.replace(/\$\{keyword\}/g, encodeURIComponent(keyword)).replace(/\$\{keyid\}/g, keyid);
                if (dom) {
                    dom.parentNode.innerHTML = addedString
                }
                if (element.addBox) {
                    element.addBox.innerHTML = addedString
                }
                if (isList) {
                    var topicItem = document.createElement("LI");
                    topicItem.id = "topic_" + keyid;
                    keyword = Core.String.encodeHTML(Core.String.trim(keyword));
                    topicItem.innerHTML = template.item.replace(/\$\{keyword\}/g, keyword).replace(/\$\{keyid\}/g, keyid);
                    if (App.topic.list.length == 0) {
                        element.lisBox.parentNode.style.display = "block"
                    }
                    var sHtml = '<li id = "' + topicItem.id + '" onmouseover="this.className=\'list_hover\'" onmouseout="this.className=\'\'">' + topicItem.innerHTML + "</li>";
                    Core.Dom.insertHTML(element.lisBox, sHtml, "AfterBegin");
                    App.topic.list.push(topicItem);
                    element.lisTit.innerHTML = $CLTMSG.CX0044 + "(" + App.topic.list.length + ")";
                    if (App.topic.list.length > 10) {
                        if (element.moreBox) {
                            var lis = element.lisBox.getElementsByTagName("LI");
                            for (var i = len; i >= 10; i--) {
                                lis[i].style.display = "none"
                            }
                            element.moreBox.style.display = "block"
                        }
                    }
                    func()
                }
                lock = false
            };
            doRequest("addTopic", {
                keyWords: keyword
            }, success, errfunc)
        },
        del: function (keyid, keyword, dom) {
            if (!keyid) {
                return false
            }
            var success = function (json) {
                if (isList) {
                    try {
                        Core.Dom.removeNode("topic_" + keyid);
                        for (var i = 0, len = App.topic.list.length; i < len; i++) {
                            if (App.topic.list[i].id == "topic_" + keyid) {
                                App.topic.list.splice(i, 1);
                                break
                            }
                        }
                        element.lisTit.innerHTML = $CLTMSG.CX0044 + "(" + App.topic.list.length + ")"
                    } catch (exp) {}
                }
                if (element.addBox) {
                    try {
                        if (scope["$search"] == keyword) {
                            element.addBox.innerHTML = template.botton.replace(/\$\{keyword\}/g, keyword)
                        }
                    } catch (exp) {}
                }
                if (dom) {
                    try {
                        dom.parentNode.innerHTML = template.botton.replace(/\$\{keyword\}/g, keyword)
                    } catch (exp) {}
                }
                if (element.shell) {
                    if (!App.topic.list.length) {
                        element.shell.style.display = "none"
                    }
                }
            };
            doRequest("delTopic", {
                id: keyid
            }, success)
        },
        more: function (mount) {
            var showList = [],
                hideList = [];
            for (var i = 0, j = 0, len = App.topic.list.length; i < len; i++) {
                var tmp = App.topic.list[i];
                if (tmp.style["display"] == "none") {
                    if (j < mount) {
                        j++;
                        showList.push(tmp);
                        continue
                    }
                    hideList.push(tmp)
                }
            }
            var c = 0;
            var tk = App.timer.add(function () {
                if (c >= showList.length) {
                    App.timer.remove(tk);
                    if (App.topic.list.length > 0 && App.topic.list[App.topic.list.length - 1].style.display != "none") {
                        if (element.moreBox) {
                            element.moreBox.style.display = "none"
                        }
                    }
                    return false
                }
                showList[c].style.display = "";
                c++
            });
            if (hideList.length > 0) {
                return
            }
            var obj = Core.Events.getEventTarget();
            if (typeof(obj) == "object") {
                for (; !App.Dom.hasClass(obj, "txt_right"); obj = obj.parentNode) {}
                var _mlSpan = App.Dom.getByClass("MIB_liner", "span", obj);
                if (_mlSpan && _mlSpan[0]) {
                    _mlSpan[0].style.display = "none"
                }
                var _addA = obj.getElementsByTagName("a");
                if (_addA && _addA[1]) {
                    _addA[1].style.display = "none"
                }
            }
        },
        list: []
    };
    if (isList) {
        var itemList = element.lisBox.getElementsByTagName("LI");
        for (var i = 0, len = itemList.length; i < len; i++) {
            App.topic.list.push(itemList[i])
        }
    }
    if (element.newTopic) {
        var buildLayer = function () {
            var html = [];
            html.push('<div id="panel" style="position:absolute;left:0px;" class="small_Yellow pop_tips"><table class="CP_w" style="width: 200px;">');
            html.push('<thead><tr><th class="tLeft"><span></span></th><th class="tMid"><span></span></th><th class="tRight"><span></span></th></tr></thead><tfoot><tr><td class="tLeft"><span></span></td><td class="tMid"><span></span></td><td class="tRight"><span></span></td></tr></tfoot>');
            html.push('<tbody><tr><td class="tLeft"><span></span></td><td class="tMid">');
            html.push('	<div class="tagslayer">');
            html.push('		<p><input type="text" id="topic" class="PY_input" /><a id="save" href="javascript:;" class="btn_normal btnxs"><em>' + $CLTMSG.CC1102 + "</em></a></p>");
            html.push('		<p class="txt"><span id="error">' + $CLTMSG.CC5001 + "</span></p>");
            html.push('	</div></td><td class="tRight"><span></span></td></tr>');
            html.push("</tbody></table>");
            html.push('<div class="close"><a id="close" href="javascript:;"></a></div></div>');
            var handler = {
                closePanel: function () {
                    build.domList.panel.style.display = "none";
                    build.domList.panel.parentNode.removeChild(build.domList.panel);
                    element.topic.style.cssText = ""
                },
                saveTopic: function () {
                    var value = build.domList.topic.value.replace(/^\s+|\s+$/g, "");
                    var count = Core.String.byteLength(value);
                    if (count > 20) {
                        build.domList.error.style.cssText = "color:red;";
                        build.domList.error.innerHTML = $CLTMSG.CC5004;
                        return
                    }
                    var topic = build.domList.topic.value.replace(/^\s+|\s+$/g, "");
                    if (topic == "") {
                        build.domList.error.style.cssText = "color:red;";
                        build.domList.error.innerHTML = $CLTMSG.CC5002;
                        return
                    }
                    var isExist = false;
                    App.Dom.getBy(function (el) {
                        if (!isExist && el.innerHTML == topic) {
                            isExist = true
                        }
                    }, "a", element.lisBox);
                    if (!isExist) {
                        topic = encodeURIComponent(topic);
                        Core.Events.removeEvent(build.domList.save, handler.saveTopic);
                        App.topic.add(topic, null, function () {
                            handler.closePanel()
                        }, function (json) {
                            Core.Events.addEvent(build.domList.save, handler.saveTopic);
                            build.domList.error.style.cssText = "color:red;";
                            build.domList.error.innerHTML = $SYSMSG[json.code]
                        })
                    } else {
                        build.domList.error.style.cssText = "color:red;";
                        build.domList.error.innerHTML = $CLTMSG.CC5003
                    }
                }
            };
            var conf = {
                template: html.join(""),
                box: element.topic
            };
            var build = App.builder2(conf);
            Core.Events.addEvent(build.domList.save, handler.saveTopic);
            Core.Events.addEvent(build.domList.close, handler.closePanel);
            App.TextareaUtils.setCursor(build.domList.topic)
        };
        var clickAddBtn = function () {
            var data = App.Dom.getByClass("pop_tips", "div", element.topic) || [];
            if (data.length > 0) {
                return
            }
            element.topic.style.cssText = "position:relative;overflow:visible;";
            buildLayer()
        };
        Core.Events.addEvent(element.newTopic, clickAddBtn)
    }
});
App.Comment = {
    loadData: function (sUrl, oNode, oGet, fCallBack, fFail) {
        Core.Class.extend(oGet, scope.commentConfig.params);
        Utils.Io.Ajax.request(sUrl, {
            onComplete: function (oResult) {
                if (oResult.code == "A00006" && oNode != null) {
                    oNode.innerHTML = oResult.data;
                    fCallBack(oResult)
                } else {
                    if (oResult.code == "A00003") {} else {
                        fFail(oResult)
                    }
                }
            }.bind2(this),
            onException: function (e) {},
            returnType: "json",
            GET: oGet
        })
    },
    post: function (sUrl, oPost, fCallBack, fFail) {
        Core.Class.extend(oPost, scope.commentConfig.params);
        oPost.content && (oPost.content = oPost.content.replace(/\uff20/ig, "@"));
        Utils.Io.Ajax.request(sUrl, {
            POST: oPost,
            onComplete: function (oResult) {
                scope.commentConfig.params.retcode = "";
                if (oResult.code == "A00006") {
                    fCallBack(oResult)
                } else {
                    if (oResult.code == "M00008") {
                        window.location.href = oResult.data
                    } else {
                        fFail(oResult)
                    }
                }
            }.bind2(this),
            onException: function () {
                scope.commentConfig.params.retcode = ""
            },
            returnType: "json"
        })
    },
    addComment: function (sUrl, oNode, fCallBack, fFail) {
        var loginFlag = false;
        var postComment = function () {
            if (oNode.locked) {
                return
            }
            oNode.locked = true;
            oNode.className = "btn_notclick";
            var oPost = oNode.oParam;
            if (oPost) {
                var sContent = $E("_comment_content_" + oPost.productId + "_" + oPost.resourceId + ((oPost.cid && oPost.listInDiv != 1) ? "_" + oPost.cid : "")).value;
                var exContent = Core.String.trim(sContent);
                var oReq = new RegExp("^" + $CLTMSG.CC0501 + "[^:]*:");
                var oReq1 = new RegExp("^" + $CLTMSG.CC0501 + "[^:]*:$");
                if (exContent == "" || (oReq.test(exContent) && (oReq1.test(exContent)))) {
                    fFail.bind2(oNode)({
                        code: "SCM008"
                    });
                    return
                }
                oPost.content = sContent;
                if (oPost.forward) {
                    sUrl += "?f=1"
                }
            }
            this.post(sUrl, oPost, (function (oNode, fCallBack) {
                return function (oResult) {
                    if (oNode.$loginDiv && oNode.$loginuser && oNode.$loginpassword) {
                        setTimeout(function () {
                            window.location.reload()
                        }, 10);
                        return
                    }
                    oNode.locked = false;
                    oNode.className = "btn_normal";
                    var countPanel = $E("_comment_count_" + oNode.oParam.productId + "_" + oNode.oParam.resourceId);
                    try {
                        App.Comment.count(countPanel, "+")
                    } catch (e) {}
                    fCallBack(oNode, oResult)
                }
            })(oNode, fCallBack), fFail ||
            function () {})
        };
        if (oNode.$loginDiv && oNode.$loginuser && oNode.$loginpassword) {
            if (!oNode.$loginuser.value || oNode.$loginuser.value == $SYSMSG.R01008) {
                App.alert($SYSMSG.M00901);
                return
            }
            if (oNode.$loginpassword.value == "") {
                App.alert($SYSMSG.M00902);
                return
            }
            loginFlag = true;
            var cfg = {
                name: oNode.$loginuser.value,
                pwd: oNode.$loginpassword.value,
                remb: true,
                succ: postComment.bind2(this),
                error: function (err, errno) {
                    if (errno == "4010") {
                        var msg = App.getMsg("R01010", {
                            mail: oNode.$loginuser.value
                        });
                        App.alert(msg)
                    } else {
                        App.alert(err)
                    }
                }
            };
            App.LoginAction(cfg)
        } else {
            postComment.bind2(this)()
        }
    },
    deleteComment: function (sUrl, oPost, fCallBack, fFail) {
        this.post(sUrl, oPost, function (oResult) {
            var countPanel = $E("_comment_count_" + oPost.productId + "_" + oPost.resId);
            try {
                this.count(countPanel, "-")
            } catch (e) {}
            fCallBack()
        }.bind2(this), fFail ||
        function () {})
    },
    count: function (oNode, sMethod) {
        var s = oNode.getElementsByTagName("strong");
        if (s && (s = s[1])) {
            var count = s.innerHTML;
            count = parseInt(count.match(/(\d+)/));
            count = ((count + "") == "NaN" ? 0 : count);
            count = Math.max(eval(count + sMethod + 1), 0);
            s.innerHTML = "";
            count && (s.innerHTML = ["(", count, ")"].join(""))
        }
    },
    superCount: function (oNode, sMethod, fRef) {},
    setCount: function (oNode, value) {
        if (value > 0) {
            oNode.innerHTML = $CLTMSG.CC0502 + "<strong>(" + value + ")</strong>"
        } else {
            oNode.innerHTML = $CLTMSG.CC0502
        }
    },
    login: function () {},
    listenerUserInput: function (oNode, sLength) {
        oNode = $E(oNode);
        if (oNode == null) {
            return
        }
        var limit = function (sLength) {
            var snapLength = Core.String.byteLength(this.value);
            if (snapLength > sLength) {
                this.value = Core.String.leftB(this.value, sLength)
            }
        };
        App.BindAtToTextarea(oNode, {
            borderWidth: "1px",
            fontSize: "12px"
        });
        App.autoHeightTextArea(oNode, Core.Function.bind3(limit, oNode, [sLength]))
    },
    changeArrow: function (oNode, direction) {
        if (oNode != null) {
            switch (direction) {
            case "up":
                oNode.className = "off";
                break;
            case "down":
                oNode.className = "on";
                break
            }
        }
    },
    alert: function (oTarget, sText, iIcon, fCallBack, fCancel) {
        return App.flyDialog(sText, (!fCancel) ? "alert" : "confirm", oTarget, {
            icon: iIcon,
            ok: fCallBack
        })
    },
    tip: function (oTarget, sText, iIcon, fCallBack, fCancel) {
        return App.flyDialog(sText, (!fCancel) ? "alert" : "confirm", oTarget, {
            icon: iIcon,
            ok: fCallBack,
            hasBtn: false
        })
    },
    getTarget: function () {
        try {
            var oEvent = Core.Events.getEvent();
            var oTarget = oEvent ? (oEvent.srcElement || oEvent.target) : null
        } catch (e) {
            return null
        }
        return oTarget
    },
    focus: function (oNode, step) {
        if (!oNode) {
            return
        }
        try {
            App.TextareaUtils.setCursor(oNode)
        } catch (e) {}
        if (step) {
            setTimeout(function () {
                window.scrollTo(0, step)
            }, 20)
        }
    }
};
(function () {
    var Group = {};
    Group.prov0 = $CLTMSG.CX0078;
    Group.code0 = "0";
    Group.prov34 = $CLTMSG.CX0079;
    Group.code34 = "1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18";
    Group.prov11 = $CLTMSG.CX0080;
    Group.code11 = "1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,28,29";
    Group.prov50 = $CLTMSG.CX0081;
    Group.code50 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,81,82,83,84";
    Group.prov35 = $CLTMSG.CX0082;
    Group.code35 = "1,2,3,4,5,6,7,8,9";
    Group.prov62 = $CLTMSG.CX0083;
    Group.code62 = "1,2,3,4,5,6,7,8,9,10,24,26,29,30";
    Group.prov44 = $CLTMSG.CX0084;
    Group.code44 = "1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,51,52,53";
    Group.prov45 = $CLTMSG.CX0085;
    Group.code45 = "21,22,3,4,5,6,7,8,9,10,11,12";
    Group.prov52 = $CLTMSG.CX0086;
    Group.code52 = "1,2,3,4,22,23,24,26,27";
    Group.prov46 = $CLTMSG.CX0087;
    Group.code46 = "1,2,90";
    Group.prov13 = $CLTMSG.CX0088;
    Group.code13 = "1,2,3,4,5,6,7,8,9,10,11";
    Group.prov23 = $CLTMSG.CX0089;
    Group.code23 = "1,2,3,4,5,6,7,8,9,10,11,12,27";
    Group.prov41 = $CLTMSG.CX0090;
    Group.code41 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17";
    Group.prov42 = $CLTMSG.CX0091;
    Group.code42 = "1,2,3,5,6,7,8,9,10,11,12,13,28";
    Group.prov43 = $CLTMSG.CX0092;
    Group.code43 = "1,2,3,4,5,6,7,8,9,10,11,12,13,31";
    Group.prov15 = $CLTMSG.CX0093;
    Group.code15 = "1,2,3,4,5,6,7,22,25,26,28,29";
    Group.prov32 = $CLTMSG.CX0094;
    Group.code32 = "1,2,3,4,5,6,7,8,9,10,11,12,13";
    Group.prov36 = $CLTMSG.CX0095;
    Group.code36 = "1,2,3,4,5,6,7,8,9,10,11";
    Group.prov22 = $CLTMSG.CX0096;
    Group.code22 = "1,2,3,4,5,6,7,8,24";
    Group.prov21 = $CLTMSG.CX0097;
    Group.code21 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14";
    Group.prov64 = $CLTMSG.CX0098;
    Group.code64 = "1,2,3,4";
    Group.prov63 = $CLTMSG.CX0099;
    Group.code63 = "1,21,22,23,25,26,27,28";
    Group.prov14 = $CLTMSG.CX0100;
    Group.code14 = "1,2,3,4,5,6,7,8,9,10,23";
    Group.prov37 = $CLTMSG.CX0101;
    Group.code37 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17";
    Group.prov31 = $CLTMSG.CX0102;
    Group.code31 = "1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,30";
    Group.prov51 = $CLTMSG.CX0103;
    Group.code51 = "1,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,32,33,34";
    Group.prov12 = $CLTMSG.CX0104;
    Group.code12 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,21,23,25";
    Group.prov54 = $CLTMSG.CX0105;
    Group.code54 = "1,21,22,23,24,25,26";
    Group.prov65 = $CLTMSG.CX0106;
    Group.code65 = "1,2,21,22,23,27,28,29,30,31,32,40,42,43,44";
    Group.prov53 = $CLTMSG.CX0107;
    Group.code53 = "1,3,4,5,6,23,25,26,27,28,29,31,32,33,34,35";
    Group.prov33 = $CLTMSG.CX0108;
    Group.code33 = "1,2,3,4,5,6,7,8,9,10,11";
    Group.prov61 = $CLTMSG.CX0109;
    Group.code61 = "1,2,3,4,5,6,7,8,9,10";
    Group.prov71 = $CLTMSG.CX0110;
    Group.code71 = "1,2,90";
    Group.prov81 = $CLTMSG.CX0111;
    Group.code81 = "1";
    Group.prov82 = $CLTMSG.CX0112;
    Group.code82 = "1";
    Group.prov400 = $CLTMSG.CX0113;
    Group.code400 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16";
    Group.prov100 = "";
    Group.code100 = "";
    Group.provinces = $CLTMSG.CX0114;
    Group.provcodes = "34,11,50,35,62,44,45,52,46,13,23,41,42,43,15,32,36,22,21,64,63,14,37,31,51,12,54,65,53,33,61,71,81,82,400,100";
    App.ProvinceAndCity = function (provDom, cityDom, provCode, cityCode, areaDom, areaCode, areaDisplayName, is3level, noLimit) {
        this.provDom = provDom;
        this.cityDom = cityDom;
        this.provCode = provCode;
        this.cityCode = cityCode;
        this.areaDom = areaDom;
        this.areaCode = areaCode;
        this.is3level = is3level;
        this.noLimit = noLimit;
        this.areacache = {};
        this.cache = {};
        if (areaDisplayName) {
            this.areaDisplay = $N(areaDisplayName)
        }
        this.init()
    };
    (function (_p) {
        _p.init = function () {
            this.loadProv();
            this.loadCity();
            if (this.is3level) {
                this.loadArea()
            }
            Core.Events.addEvent(this.provDom, (function (_this) {
                return function () {
                    if (!_this.noLimit) {
                        _this.cityCode = 1000
                    } else {
                        if (_this.noLimit.city) {
                            _this.cityCode = 1
                        } else {
                            _this.cityCode = 1000
                        }
                    }
                    _this.provCode = _this.provDom.value;
                    _this.loadCity();
                    _this.loadArea()
                }
            })(this), "change");
            Core.Events.addEvent(this.cityDom, (function (_this) {
                return function () {
                    if (!_this.noLimit) {
                        _this.areaCode = 1000
                    } else {
                        if (_this.noLimit.area) {
                            _this.areaCode = 1
                        } else {
                            _this.areaCode = 1000
                        }
                    }
                    _this.cityCode = _this.cityDom.value;
                    _this.loadArea()
                }
            })(this), "change")
        };
        _p.disp = function () {};
        _p.loadProv = function () {
            var provOps = this.provDom.options;
            var provcodes = Group.provcodes.split(",");
            var provinces = Group.provinces.split(",");
            if (provOps.length <= 1) {
                if (!(this.noLimit && this.noLimit.province)) {
                    provOps[0] = new Option($CLTMSG.CX0115, 0)
                }
                for (var i = 0, len = provcodes.length; i < len; i++) {
                    provOps[provOps.length] = new Option(provinces[i], provcodes[i])
                }
            }
            if (Core.Array.findit(provcodes, this.provCode) != -1) {
                this.provDom.value = this.provCode
            } else {
                this.provDom.value = 0
            }
        };
        _p.loadCity = function () {
            if (this.provCode == "1001") {
                this.cityDom.style.display = "none";
                this.cityDom.disabled = true;
                return false
            } else {
                this.cityDom.disabled = false;
                this.cityDom.style.display = ""
            }
            var cityOps = this.cityDom.options;
            while (cityOps.length) {
                this.cityDom.remove(0)
            }
            var cityCodes = Group["code" + this.provCode].split(",");
            var cityTexts = Group["prov" + this.provCode].split(",");
            if (!(this.noLimit && this.noLimit.city)) {
                cityOps[0] = new Option($CLTMSG.CX0116, 1000)
            }
            for (var i = 0, len = cityCodes.length; i < len; i++) {
                if (cityTexts[i] && cityCodes[i]) {
                    cityOps[cityOps.length] = new Option(cityTexts[i], cityCodes[i])
                }
            }
            if (Core.Array.findit(cityCodes, this.cityCode) != -1) {
                this.cityDom.value = this.cityCode
            } else {
                if (!this.noLimit) {
                    this.cityDom.value = 1000
                } else {
                    if (this.noLimit.city) {
                        this.cityDom.value = 1
                    }
                }
            }
        };
        _p.displayarea = function (data, option, areadisp, limit) {
            if (areadisp && areadisp.length > 0) {
                if (!data || data.length == 0) {
                    for (var m = 0, len = areadisp.length; m < len; m++) {
                        areadisp[m].style.display = "none"
                    }
                    return false
                }
                for (var m = 0, len = areadisp.length; m < len; m++) {
                    areadisp[m].style.display = ""
                }
            }
            if (!(limit && limit.area)) {
                option[0] = new Option($CLTMSG.CC5802, 1000)
            }
            for (var i = 0, len = data.length; i < len; i++) {
                var areaCodes = data[i]["value"];
                var areaTexts = data[i]["text"];
                if (areaTexts && areaCodes) {
                    option[option.length] = new Option(areaTexts, areaCodes)
                }
            }
        };
        _p.loadArea = function () {
            if (!this.is3level) {
                return false
            }
            var areaOps = this.areaDom.options;
            var areaDisplay = this.areaDisplay;
            var cache = this.cache;
            while (areaOps.length) {
                this.areaDom.remove(0)
            }
            var _this = this;
            if (!cache[_this.provCode + "_" + _this.cityCode]) {
                App.doRequest({
                    province: this.provDom.value,
                    city: this.cityDom.value
                }, "/person/aj_getarea.php", function (data) {
                    _p.displayarea(data, areaOps, areaDisplay, _this.noLimit);
                    cache[_this.provCode + "_" + _this.cityCode] = data
                }, function () {})
            } else {
                _p.displayarea(this.cache[this.provCode + "_" + this.cityCode], areaOps, areaDisplay, _this.noLimit)
            }
        };
        _p.loadNewData = function (provCode, cityCode) {
            this.provCode = provCode;
            this.cityCode = cityCode;
            this.loadProv();
            this.loadCity();
            if (this.is3level) {
                this.loadArea()
            }
        }
    })(App.ProvinceAndCity.prototype)
})();
App.queryToJson = function (QS, isDecode) {
    var _Qlist = (Core.String.trim(QS)).split("&");
    var _json = {};
    var _fData = function (data) {
        if (isDecode) {
            return decodeURIComponent(data)
        } else {
            return data
        }
    };
    for (var i = 0, len = _Qlist.length; i < len; i++) {
        if (_Qlist[i]) {
            var _hsh = _Qlist[i].split("=");
            if (_hsh[1]) {
                if (!_json[_hsh[0]]) {
                    _json[_hsh[0]] = _fData(_hsh[1])
                } else {
                    _json[_hsh[0]] = [_fData(_hsh[1])].concat(_json[_hsh[0]])
                }
            } else {
                if (!_json["$nullName"]) {
                    _json["$nullName"] = _fData(_hsh[0])
                } else {
                    _json["$nullName"] = [_fData(_hsh[0])].concat(_json["$nullName"])
                }
            }
        }
    }
    return _json
};
App.finishInformation = function () {
    window.location.href = "/person/full_info.php"
};
(function (proxy) {
    var $w = window,
        $d = $w.document,
        $e = $d.documentElement || {},
        $pl = 2,
        count = 1,
        cacheid = 1;
    var $a = Core.Events.addEvent;
    var $r = Core.Events.removeEvent;
    var $t = function () {
        return ($w.pageYOffset || Math.max($e.scrollTop, $d.body.scrollTop))
    };
    var $y = function (el) {
        var et, pn;
        if ("getBoundingClientRect" in el) {
            et = el.getBoundingClientRect().top;
            return et + $t()
        }
        if (!(pn = el.offsetParent)) {
            return 0
        }
        et = pn.offsetTop;
        while (pn && pn != $d.body) {
            et += pn.offsetTop;
            pn = pn.offsetParent
        }
        return et || 0
    };
    var $sh = function () {
        return Math.max($e.clientHeight, $e.scrollHeight, $e.offsetHeight, $d.body.scrollHeight, $d.body.offsetHeight)
    };
    var $wh = function () {
        return $w.innerHeight || ($e && $e.clientHeight) ? $e.clientHeight : $d.body["clientHeight"]
    };
    var isRemoved = function (element) {
        var e, p, n;
        return !(e = element) || !(p = e.parentNode) || ((n = p.nodeName) && n == "#document-fragment")
    };
    var model = (function () {
        var oInstance = {},
            _aQueue = [];
        oInstance.add = function (init, fFlush, fExtract) {
            try {
                _aQueue.push({
                    queue: init() || [],
                    flush: fFlush,
                    extract: fExtract || null
                })
            } catch (e) {
                $Debug(e)
            }
        };
        oInstance.flush = function (tStep, step) {
            var _i = 0,
                _len = _aQueue.length,
                delay = 0;
            for (_i; _i < _len; _i++) {
                var i = 0,
                    current = _aQueue[_i],
                    queue = current.queue,
                    len = queue.length,
                    returns = [];
                for (i; i < len; i++) {
                    var item = queue[i],
                        y;
                    if (isRemoved(item)) {
                        queue.splice(i, 1);
                        len--;
                        i--;
                        continue
                    }
                    if ((y = $y(item)) > step || y < tStep) {
                        continue
                    }
                    try {
                        current.extract && current.extract(item)
                    } catch (e) {
                        $Debug(e)
                    }
                    returns.push(queue.splice(i, 1)[0]);
                    len--, i--
                }
                try {
                    returns.length && (function (cf, rts) {
                        setTimeout(function () {
                            cf(rts)
                        }, 0)
                    })(current.flush, returns)
                } catch (e) {
                    $Debug(e)
                }
                if (!queue.length) {
                    _aQueue.splice(_i, 1);
                    _len--;
                    _i--
                }
            }
            return !_aQueue.length ? false : true
        };
        return oInstance
    })();
    var screen = (function () {
        var clock, sleep, oInstance = {},
            _enabled = false,
            _step, flush = model.flush,
            _delay = 100,
            _mode = "Timeout",
            validate = true;
        oInstance.validate = function () {
            validate = false;
            clearTimeout(sleep);
            sleep = setTimeout(function () {
                validate = true
            }, 200)
        };
        oInstance.loop = (function () {
            var step = 0,
                tStep = 0,
                snap, snapSH, sh, t;
            return function () {
                sh = $sh();
                if (sh < (snapSH || 0)) {
                    step -= (snapSH - sh)
                }
                snapSH = sh;
                t = $t();
                snap = t + _step;
                if (((count % 200 == 0 && (count = 1)) || snap > step || t < tStep) && validate) {
                    tStep = t - 100;
                    step = snap + _step;
                    if (!flush(tStep, step)) {
                        oInstance.enabled(false)
                    }
                }
                count++
            }
        })();
        oInstance.enabled = function (b) {
            if (b === undefined) {
                return _enabled
            }
            if (b === _enabled) {
                return
            }
            _enabled = b;
            clearInterval(clock);
            (b ? $a : $r)(window, oInstance.validate, "scroll");
            b && (clock = setInterval(oInstance.loop, 30))
        };
        oInstance.step = function () {
            _step = $wh() * $pl
        };
        oInstance.resize = function () {
            oInstance.step()
        };
        return oInstance
    })();
    var getRid = function (oElement) {
        var attr = oElement.getAttribute("cacheid");
        if (attr) {
            return attr
        }
        oElement.setAttribute("cacheid", cacheid++);
        return attr
    };
    proxy.getElementsByAttribute = (function () {
        var cache = {},
            key = function () {
                return Array.prototype.slice.call(arguments, 0).join("_")
            };
        return function (oElement, sTagName, sAttribute, sValue) {
            oElement = $E(oElement) || $d.body;
            sTagName = sTagName || "*";
            var valueKey, attrKey, tagKey;
            valueKey = key(attrKey = key(tagKey = key(getRid(oElement), sTagName), sAttribute), sValue);
            var attrs = cache[attrKey] || null,
                values = cache[valueKey] || null,
                tags = cache[tagKey] || null;
            if (!sValue && attrs) {
                return attrs
            }
            if (sValue && values) {
                return values
            }
            var elements = attrs || tags || (cache[tagKey] = oElement.getElementsByTagName(sTagName));
            var i = 0,
                len = elements.length,
                retAttrib = [],
                retValue = [],
                current, attrib, returns;
            var reg = sValue ? new RegExp("(^|\\s)" + sValue + "(\\s|$)") : null;
            for (i; i < len; i++) {
                if ((current = elements[i]).nodeType != 1) {
                    continue
                }
                if (!(attrib = current.getAttribute(sAttribute))) {
                    continue
                }
                if (!attrs) {
                    retAttrib.push(current)
                }
                if (reg && reg.test(attrib)) {
                    retValue.push(current)
                }
            }
            if (retAttrib.length) {
                returns = cache[attrKey] = retAttrib
            }
            if (retValue.length) {
                returns = cache[valueKey] = retValue
            }
            return returns || []
        }
    })();
    var bindProxy = function (oProxy, extract, flush, fGetData) {
        var i = 0,
            ns = App,
            len = (p = ((oProxy || "").split("."))).length;
        for (i = (p[0] == "App") ? 1 : 0; i < len; i++) {
            ns = ns[p[i]] = ns[p[i]] || {}
        }
        ns.flush = function (doms) {
            var i = 0,
                len = (doms = (doms || [])).length;
            if (!len) {
                return
            }
            for (i; i < len; i++) {
                try {
                    extract && extract(doms[i])
                } catch (e) {
                    $Debug(e)
                }
            }
            try {
                flush && flush(doms)
            } catch (e) {
                $Debug(e)
            }
        };
        ns.fire = function () {
            var dom = fGetData();
            ns.flush(dom)
        };
        return ns
    };
    proxy.splitLoader = (function () {
        var oInstance = {};
        oInstance.model = model;
        oInstance.screen = screen;
        oInstance.loop = screen.loop;
        oInstance.plugin = function (oPlug, sProxy) {
            if (oPlug && oPlug.init && (oPlug.flush = oPlug.flush ||
            function () {})) {
                sProxy && (sProxy = bindProxy(sProxy, oPlug.extract, oPlug.flush, oPlug.init));
                if (/\((iPhone|iPad|iPod)/i.test(navigator.userAgent) && sProxy) {
                    sProxy.fire();
                    return oInstance
                }
                oInstance.model.add(oPlug.init, oPlug.flush, oPlug.extract);
                screen.resize();
                screen.enabled(true)
            } else {
                $Debug("invalid plugin")
            }
            return oInstance
        };
        return oInstance
    })()
})(App);
Core.Dom.next = function (elm, _className) {
    var o = $E(elm);
    var next = o.nextSibling;
    if (!next) {
        return null
    } else {
        if (next.nodeType != 1) {
            return Core.Dom.next(next, _className)
        } else {
            if (next.nodeType == 8) {
                next.parentNode.removeChild(next);
                return Core.Dom.next(o, _className)
            }
        }
    }
    if (next.className.indexOf(_className) != -1) {
        return next
    } else {
        return Core.Dom.next(next, _className)
    }
};
Core.Dom.getChildrenByClass = function (el, clz) {
    var rs = [];
    var cldr = el.childNodes || el.children;
    var clz = " " + clz + " ";
    var len = cldr.length;
    for (var i = 0; i < len; ++i) {
        var o = cldr[i];
        var ecl = " " + o.className + " ";
        if (ecl.indexOf(clz) != -1) {
            rs[rs.length] = o
        }
    }
    return rs
};

function intval(v) {
    v = parseInt(v);
    return isNaN(v) ? 0 : v
}
function getPos(e) {
    var l = 0;
    var t = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent) {
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
        e = e.offsetParent
    }
    l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
    t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
    return {
        x: l,
        y: t,
        w: w,
        h: h,
        wb: wb,
        hb: hb
    }
}
function getScroll() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight
    } else {
        if (document.body) {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight
        }
    }
    return {
        t: t,
        l: l,
        w: w,
        h: h
    }
}
function scroller(el, duration, offsetY, offsetX, bYFixed, bXFixed) {
    if (typeof el != "object") {
        el = document.getElementById(el)
    }
    if (!el) {
        return
    }
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll();
    z.clear = function () {
        window.clearInterval(z.timer);
        z.timer = null
    };
    z.clear();
    z.offsetX = offsetX || 0;
    z.offsetY = offsetY || 0;
    z.p.x += z.offsetX;
    z.p.y += z.offsetY;
    z.t = (new Date).getTime();
    z.step = function () {
        var t = (new Date).getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function () {
                z.scroll(z.p.y, z.p.x)
            }, 13)
        } else {
            st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
            sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
            z.scroll(st, sl)
        }
    };
    z.scroll = function (t, l) {
        window.scrollTo(l, t)
    };
    z.timer = window.setInterval(function () {
        if (bYFixed) {
            if ((z.p.y - z.s.t == 0)) {
                z.clear();
                return false
            }
        }
        if (bXFixed) {
            if ((z.p.x - z.s.l == 0)) {
                z.clear();
                return false
            }
        }
        z.step()
    }, 13)
}
Core.Dom.domInsert = function (pnode, param, pos, callback) {
    pos = /^(afterBegin|afterEnd|beforeBegin|beforeEnd)$/.test(pos) ? pos : "beforeEnd";
    callback = (typeof callback == "function" ? callback : function () {});
    var args = arguments;
    if ($IE) {
        var ctype = "HTML";
        if (typeof param == "object") {
            if (param.nodeType == 1) {
                ctype = "Element"
            } else {
                if (param.nodeType == 3) {
                    ctype = "Text";
                    param = param.data
                } else {
                    ctype = "HTML"
                }
            }
        }(function () {
            try {
                pnode.doScroll("left");
                pnode["insertAdjacent" + ctype](pos, param);
                callback.call(args.caller);
                callback = param = null
            } catch (e) {
                window.setTimeout(arguments.callee, 0)
            }
        })()
    } else {
        if (typeof param == "object" && /^(1|3)$/.test(param.nodeType)) {
            switch (pos) {
            case "afterBegin":
                pnode.insertBefore(param, pnode.firstChild);
                break;
            case "afterEnd":
                if (pnode.parentNode.nodeType == 1) {
                    pnode.parentNode.insertBefore(param, pnode.nextSibling)
                }
                break;
            case "beforeBegin":
                if (pnode.parentNode.nodeType == 1) {
                    pnode.parentNode.insertBefore(param, pnode)
                }
                break;
            case "beforeEnd":
                pnode.appendChild(param);
                break
            }
        } else {
            var tmp = document.createElement("div");
            tmp.innerHTML = param;
            switch (pos) {
            case "afterBegin":
                while (tmp.lastChild) {
                    pnode.insertBefore(tmp.lastChild, pnode.firstChild)
                }
                break;
            case "afterEnd":
                if (pnode.parentNode.nodeType == 1) {
                    while (tmp.lastChild) {
                        pnode.parentNode.insertBefore(tmp.lastChild, pnode.nextSibling)
                    }
                }
                break;
            case "beforeBegin":
                if (pnode.parentNode.nodeType == 1) {
                    while (tmp.firstChild) {
                        pnode.parentNode.insertBefore(tmp.firstChild, pnode)
                    }
                }
                break;
            case "beforeEnd":
                while (tmp.firstChild) {
                    pnode.appendChild(tmp.firstChild)
                }
                break
            }
            tmp = null
        }
        callback.call(args.caller)
    }
};
App.bindVideo = function (_dom, _key, _value) {
    var _addevent = Core.Events.addEvent;
    var _seevideo = App.seevideo;
    var _node = {};
    var _previewHTML = function (mid, mtype) {
        try {
            var str = decodeURIComponent(_value.title);
            if (Core.String.byteLength(str) > 24) {
                str = Core.String.leftB(str, 24 - 1) + "..."
            }
            _value.title = str
        } catch (e) {}
        return '<img width="120px" height="80px" alt="" src="' + _value.screen + '">          <div type="' + mtype + '" mid="' + mid + '" class="video_play">            <a shorturl_id="' + _key + '"  href="javascript:void(0);"><img title="' + _value.title + '" src="' + scope.$BASEIMG + 'style/images/common/feedvideoplay.gif"></a>          </div>'
    };
    var render = function (node, videoInfo, _previewdiv) {
        if (_previewdiv && _previewdiv.getAttribute("mbind") != "1") {
            var inspos = {};
            if (Core.Dom.getElementsByClass(_previewdiv, "div", "feed_img").length > 0) {
                inspos.dom = Core.Dom.getElementsByClass(_previewdiv, "div", "feed_img")[0];
                inspos.pos = "afterEnd"
            } else {
                inspos.dom = _previewdiv;
                inspos.pos = "afterBegin"
            }
            var feed_img = $C("div");
            feed_img.className = "feed_img";
            feed_img.innerHTML = _previewHTML(node.mid, node.mtype);
            Core.Dom.domInsert(inspos.dom, feed_img, inspos.pos);
            var cldr = feed_img.childNodes || feed_img.children;
            cldr[0].src = videoInfo.screen;
            _previewdiv.setAttribute("mbind", "1");
            var a = feed_img.getElementsByTagName("A")[0];
            _addevent(a, function () {
                node.node = a;
                _seevideo(node, videoInfo)
            }, "click")
        }
    };
    _dom.href = "javascript:void(0);";
    _dom.target = "";
    _node.mid = _dom.parentNode.getAttribute("mid");
    var prevDiv = $E("prev_" + _node.mid);
    var showvdiv = $E("disp_" + _node.mid);
    _value.shorturl = _key;
    _node.mtype = _dom.parentNode.getAttribute("type");
    _addevent(_dom, function () {
        _node.node = _dom;
        _seevideo(_node, _value)
    }, "click");
    if (!(scope.$pageid == "mblog" && _node.mtype == "1")) {
        render(_node, _value, prevDiv)
    } else {
        if (!_value) {
            return false
        }
        if ((!_value) || _node.mtype != "1" || showvdiv.getAttribute("mbind") == "1") {
            return false
        }
        var video = {
            mid: decodeURIComponent(_node.mid),
            url: decodeURIComponent(_value.flash),
            title: _value.title,
            shorturl: _value.shorturl,
            ourl: decodeURIComponent(_value.url),
            mtype: _node.mtype
        };
        var setswfobject = function (url, mid) {
            var flashParams = {
                quality: "high",
                allowScriptAccess: "always",
                wmode: "transparent",
                allowFullscreen: true
            };
            var flashVars = {
                playMovie: "true"
            };
            swfobject.embedSWF(url, mid, "440", "360", "9.0.0", null, flashVars, flashParams)
        };
        var html = '<div class="MIB_linedot_l1"></div>		          <p><a href="http://sinaurl.cn/' + video.shorturl + '" target = "_blank" class="lose" title="' + video.ourl + '"><img alt="" title="" class="small_icon original" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + video.title + '</a></p><div class="note_noflash" id="' + video.mid + '">' + $CLTMSG.CD0180.replace(/#\{shorturl\}/g, video.shorturl) + "</div>";
        showvdiv.innerHTML = html;
        setswfobject(video.url, video.mid);
        showvdiv.setAttribute("mbind", "1")
    }
};
App.bindMusic = function (_dom, _key, _value) {
    var node = {
        node: _dom,
        mid: _dom.parentNode.getAttribute("mid"),
        shorturl: _value
    };
    var _addevent = Core.Events.addEvent;
    _addevent(_dom, function () {
        App.listenmusic(node)
    }, "click")
};
App.seevideo = function (node, videoInfo) {
    if (scope.$pageid == "yunying_index") {
        return true
    }
    var _vinfo = videoInfo;
    if (!_vinfo) {
        return false
    }
    var el = node.node.tagName == "A" ? node.node : node.node.parentNode;
    var video = {
        mid: node.mid,
        url: decodeURIComponent(_vinfo.flash),
        title: _vinfo.title,
        shorturl: _vinfo.shorturl,
        ourl: decodeURIComponent(_vinfo.url),
        mtype: node.mtype
    };
    var _showvdiv = $E("disp_" + video.mid);
    var _imagediv = $E("prev_" + video.mid);
    var checksame = function (vdiv, shorturl) {
        if (Core.Dom.getElementsByClass(vdiv, "A", "lose").length > 0) {
            if ("http://sinaurl.cn/" + shorturl == Core.Dom.getElementsByClass(vdiv, "A", "lose")[0].href) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    };
    var setswfobject = function (url, mid) {
        var flashParams = {
            quality: "high",
            allowScriptAccess: "always",
            wmode: "transparent",
            allowFullscreen: true
        };
        var flashVars = {
            playMovie: "true"
        };
        swfobject.embedSWF(url, mid, "440", "360", "9.0.0", null, flashVars, flashParams)
    };
    var getvideoHTML = function (videocfg) {
        if (videocfg) {
            if (scope.$pageid == "mblog" && videocfg.mtype == "1") {
                return '<div class="MIB_linedot_l1"></div>			    <p><a href="http://sinaurl.cn/' + videocfg.shorturl + '" target = "_blank" class="lose" title="' + videocfg.ourl + '"><img alt="" title="" class="small_icon original" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + videocfg.title + '</a></p><div class="note_noflash" id="' + videocfg.mid + '">' + $CLTMSG.CD0180.replace(/#\{shorturl\}/g, videocfg.shorturl) + "</div>"
            } else {
                if (videocfg.mtype == "1") {
                    return '<div class="MIB_assign_t"></div>					<div class="MIB_assign_c MIB_txtbl">					<div class="blogPicOri">		                <p>						<a href="javascript:;" onclick="App.closevideo(\'' + videocfg.mid + '\');"><img alt="" title="" class="small_icon cls" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + $CLTMSG.CD0079 + '</a>							<cite class="MIB_line_l">|</cite>							<a href="http://sinaurl.cn/' + videocfg.shorturl + '" target = "_blank" class="lose" title="' + videocfg.ourl + '"><img alt="" title="" class="small_icon original" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + videocfg.title + '</a> <a style="margin-left:12px;" href="javascript:;" onclick="App.openVideoWindow(this);"><img alt="" title="" class="small_icon turn_r" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + $CLTMSG.CX0221 + '</a>											</p>											 <div class="note_noflash" id="' + videocfg.mid + '">									  	' + $CLTMSG.CD0180.replace(/#\{shorturl\}/g, videocfg.shorturl) + '									  </div>											 </div>										</div>										<div class="MIB_assign_b"></div>'
                } else {
                    return '<div class="MIB_linedot_l1" style="display: block;"></div>		                <p>						<a href="javascript:;" onclick="App.closevideo(\'' + videocfg.mid + '\');"><img alt="" title="" class="small_icon cls" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + $CLTMSG.CD0079 + '</a>							<cite class="MIB_line_l">|</cite>							<a href="http://sinaurl.cn/' + videocfg.shorturl + '" target = "_blank" class="lose" title="' + videocfg.ourl + '"><img alt="" title="" class="small_icon original" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + videocfg.title + '</a> <a style="margin-left:12px;" href="javascript:;" onclick="App.openVideoWindow(this);"><img alt="" title="" class="small_icon turn_r" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + $CLTMSG.CX0221 + '</a>											</p>											 <div class="note_noflash" id="' + videocfg.mid + '">									  	' + $CLTMSG.CD0180.replace(/#\{shorturl\}/g, videocfg.shorturl) + "									  </div>"
                }
            }
        }
    };
    if (_showvdiv && _showvdiv.style.display != "none") {
        if (!checksame(_showvdiv, video.shorturl)) {
            _showvdiv.innerHTML = getvideoHTML(video);
            setswfobject(video.url, video.mid);
            scroller(_showvdiv, 1000, -60, 0, true, true)
        }
    } else {
        _imagediv.style.display = "none";
        _showvdiv.innerHTML = getvideoHTML(video);
        setswfobject(video.url, video.mid);
        _showvdiv.style.display = "";
        scroller(_showvdiv, 1000, -60, 0, true, true)
    }
    try {
        scope.statistics({
            video_url: encodeURIComponent("http://sinaurl.cn/" + video.shorturl),
            title: encodeURIComponent(video.title),
            video_src_url: encodeURIComponent(video.ourl)
        })
    } catch (e) {}
    return false
};
App.openVideoWindow = (function () {
    var _next = function (elm) {
        var o = $E(elm);
        var next = o.nextSibling;
        if (!next) {
            return null
        }
        if (next.nodeType !== 1) {
            return _next(next)
        }
        return next
    };
    var _video_window = false;
    return function (d) {
        if (!_video_window) {
            _video_window = $C("div");
            var _module = '			<table class="mBlogLayer">				<tr>					<td class="top_l"></td>					<td class="top_c"></td>					<td class="top_r"></td>				</tr>				<tr>					<td class="mid_l"></td>					<td class="mid_c">						<div class="layerBox">							<div style="padding:3px 0 3px 5px"><a href="javascript:void(0);" id="pop_video_window_close"><img src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" class="small_icon cls" />' + $CLTMSG.CX0222 + '</a></div>							<div class="layerBoxCon" style="width:440px;" id="pop_video_window"></div>						</div>					</td>					<td class="mid_r"></td>				</tr>				<tr>					<td class="bottom_l"></td>					<td class="bottom_c"></td>					<td class="bottom_r"></td>				</tr>			</table>			';
            _video_window.innerHTML = _module;
            document.body.appendChild(_video_window);
            Core.Events.addEvent($E("pop_video_window_close"), function () {
                if (_videoplace.childNodes.length > 0) {
                    _video_window.style.display = "none";
                    _videoplace.removeChild(_videoplace.childNodes[0])
                }
            }, "click")
        }
        var _video = _next(d.parentNode);
        var _newvideo = _video.cloneNode(true);
        var _videoplace = $E("pop_video_window");
        var _x = Core.Dom.getLeft(d);
        var _cssText = "position:fixed;bottom:0px;right:0px;z-index:1000;_position:absolute";
        _video_window.style.cssText = _cssText;
        if (_videoplace.childNodes.length > 0) {
            _videoplace.removeChild(_videoplace.childNodes[0])
        }
        _videoplace.appendChild(_newvideo);
        var _close = d.parentNode.getElementsByTagName("a")[0];
        _video_window.style.display = "";
        Core.Events.fireEvent(_close, "click");
        (function () {
            if ($IE6 && _video_window.style.display == "") {
                _video_window.style.cssText = _cssText;
                setTimeout(arguments.callee, 200)
            }
        })()
    }
})();
App.closevideo = function (mid) {
    var _showvdiv = $E("disp_" + mid);
    var _imagediv = $E("prev_" + mid);
    var _img;
    if (Core.Dom.getElementsByAttr(_imagediv, "class", "imgSmall").length > 0) {
        _img = Core.Dom.getElementsByAttr(_imagediv, "class", "imgSmall")
    } else {
        _img = Core.Dom.getElementsByAttr(_imagediv, "className", "imgSmall")
    }
    if (_img.length > 0) {
        var _bigimg = _img[0];
        App.shrinkImg(_bigimg)
    }
    _imagediv.style.display = "";
    _showvdiv.style.display = "none";
    _showvdiv.innerHTML = "";
    return false
};
App.listenmusic = function (node) {
    var el = node.node.tagName == "A" ? node.node : node.node.parentNode;
    el.target = "";
    el.href = "javascript:void(0);";
    var mid = node.mid;
    var shorturl = node.shorturl;
    var music = {
        mid: decodeURIComponent(mid),
        url: decodeURIComponent(shorturl)
    };
    App.popUpMiniPlayer(music.mid, music.url);
    return false
};
App.popUpMiniPlayer = function (mid, url) {
    var openUrl = "http://music.sina.com.cn/yueku/t/player.html";
    var search = "";
    mid && url && (function () {
        search = ["?mid=", mid, "&url=", encodeURIComponent(url)].join("")
    })();
    scope.musicshow = window.open([openUrl, search].join(""), "w_yuekuplayer", "width=629,height=595,top=" + (window.screen.height - 600) / 2 + ", left=" + (window.screen.width - 730) / 2 + ", toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no");
    if (scope.musicshow) {
        scope.musicshow.focus()
    }
};
(function (ns) {
    ns.bindTitle = function (_dom, _key, _value) {
        if (!_value.url) {
            return
        }
        _dom.setAttribute("title", _value.url)
    }
})(App);
(function (ns) {
    ns.bindFace = function (dom, key, value) {
        dom.href = "####";
        dom.target = "";
        var encodeTitle = function (value) {
            return value.replace(/[^\w\u4e00-\u9fa5\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u2014\uff3f]/g, "")
        };
        var id, face, html, prev, disp, isBinded, flag, type;
        Core.Events.addEvent(dom, function () {
            setTimeout((function (v, f) {
                return function () {
                    App.PopUpSwfPlayer(v.flash)
                }
            })(value), 100);
            return false
        }, "click");
        id = dom.parentNode.getAttribute("mid");
        html = '<div class="feed_img"><a class="magicpic_link" href="####" title="' + encodeTitle(value.title) + '" onclick="App.PopUpSwfPlayer(\'' + value.flash + '\');return false;"><img src="' + value.screen + '"></a><a href="####" class="playmp" title="' + $CLTMSG.CL0912 + '" onclick="App.PopUpSwfPlayer(\'' + value.flash + "');return false;\"></a></div>";
        prev = $E("prev_" + id);
        disp = $E("disp_" + id);
        if (!/1|2/.test(type = dom.parentNode.getAttribute("type"))) {
            return
        }
        if (scope.$pageid === "mblog" && type == "1") {
            prev = disp;
            prev.style.display = ""
        }
        if (!prev) {
            return
        }
        if (prev.getAttribute("mbind") != "1") {
            prev.setAttribute("mbind", "1");
            var imgs = Core.Dom.getElementsByClass(prev, "div", "feed_img"),
                type = "beforebegin";
            imgs.length && (flag = imgs[0]) && (type = "afterEnd");
            !flag && (flag = (flag = Core.Dom.getElementsByClass(prev, "div", "clear")) && flag[0]);
            if (flag) {
                Core.Dom.insertHTML(flag, html, type)
            } else {
                prev.innerHTML = html
            }
        }
    }
})(App);
(function (ns) {
    var ct = new Date().getTime(),
        st = scope.$severtime * 1000,
        ys = $CLTMSG.CX0122,
        ms = $CLTMSG.CL0304,
        ds = $CLTMSG.CL0302;
    ns.FormatViewTime = function (ft) {
        var nt = new Date().getTime(),
            fd = new Date((ft = ft * 1000)),
            y, m, ny, nf, nd, h = [(h = fd.getHours()) < 10 ? "0" : "", h].join(""),
            f = [(f = fd.getMinutes()) < 10 ? "0" : "", f].join(""),
            d, df;
        st = st + (((df = (nt - ct)) < 0) ? 0 : df);
        ct = nt;
        nt = new Date(st);
        y = nt.getFullYear();
        m = nt.getMonth();
        d = nt.getDate();
        ny = fd.getFullYear();
        nm = fd.getMonth() + 1;
        nd = fd.getDate();
        if ((ft - new Date(y, 1, 1).getTime()) > 0) {
            if ((ft - new Date(y, m, d).getTime()) > 0) {
                df = st - ft;
                return df > 3600000 ? [$CLTMSG.CL1002, " ", h, ":", f].join("") : [Math.max(Math.ceil(df / 60000), 1), $CLTMSG.CL1001].join("")
            }
            return [nm, ms, nd, ds, " ", h, ":", f].join("")
        }
        return [ny, ys, nm, ms, nd, ds, " ", h, ":", f].join("")
    }
})(App);
App.mapTemplete = (function () {
    var it = {};
    it.popMapPanel = '<table class="mBlogLayer"><tbody>			<tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr>			<tr>				<td class="mid_l"></td>				<td class="mid_c">					<div id="popUpMiniMapLoadingPanel" style="position:absolute;left:200px;top:125px;z-index:99999"><img src=\'' + [scope.$BASECSS, "style/images/common/loading.gif"].join("") + '\'/></div>					<div class="layerBox">						<div class="geo_info_layer" style="width:400px;">							<div class="map_box"><iframe id="mini_map_panel" style="width:400px;height:250px;border:0 none;" frameBorder="0" scrolling="no" src="#{SRC}"></iframe></div>							<div id="popUpMiniMapArrow" class="geo_arrow" style="left:120px"></div>							<a href="javascript:;" class="close" title="#{CX0145}" onClick="App.popUpMiniMap.close();return false;"></a>							<a href="javascript:;" id="zoomIn" class="map_zoomIn" title="#{CL0825}" onMouseDown="App.popUpMiniMap.zoomIn();return false;"></a>							<a href="javascript:;" id="zoomOut" class="map_zoomOut" title="#{CL0826}" onMouseDown="App.popUpMiniMap.zoomOut();return false;"></a>						</div>					</div>				</td>				<td class="mid_r"></td>			</tr>			<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody>		</table>';
    it.popUpMapTip = '<div class="bubble" style="top:20px;left:50px;"></div>';
    return it
})();
(function () {
    var w = window,
        d = document,
        de = document.documentElement || {},
        uni, popUpWindow, popUpWindowHtml = App.mapTemplete.popMapPanel,
        addEvent = Core.Events.addEvent,
        stopEvent = Core.Events.stopEvent;
    conf = {
        CL0824: $CLTMSG.CL0824,
        CL0825: $CLTMSG.CL0825,
        CL0826: $CLTMSG.CL0826,
        CX0145: $CLTMSG.CL0701,
        SRC: ""
    };
    popUpWindow = (function () {
        var it = {},
            _c;
        it.root = null;
        it.init = function () {
            if (it.root) {
                return it.root
            }
            it.root = $C("div");
            it.root.style.position = "absolute";
            it.root.style.visibility = "hidden";
            it.root.style.zIndex = "2000";
            document.body.appendChild(it.root);
            addEvent(document.body, function () {
                it.hidden()
            }, "mousedown");
            addEvent(window, function () {
                it.hidden()
            }, "resize");
            return it.panel
        };
        it.content = function (content) {
            if (!it.root) {
                it.init()
            }
            if (content && content != _c) {
                _c = it.root.innerHTML = content
            }
        };
        it.show = function (content) {
            setTimeout(function () {
                it.root.style.visibility = "visible"
            }, 10)
        };
        it.hidden = function () {
            it.root.style.visibility = "hidden"
        };
        it.position = function (x, y) {
            it.root.style.left = x + "px";
            it.root.style.top = y + "px"
        };
        return it
    })();
    App.popUpMiniMap = (function () {
        var it = {},
            panel, _p, _c, change = false,
            _ready = false,
            timer, _t = null,
            stopEvent = Core.Events.stopEvent,
            clock, max, min;
        it.info = null;
        it.close = popUpWindow.hidden;
        it.zoomIn = function () {
            stopEvent()
        };
        it.zoomOut = function () {
            stopEvent()
        };
        it.change = function () {};
        it.validateZoom = function (level) {
            $E("zoomOut").className = (level < min) ? "map_zoomOut_no" : "map_zoomOut";
            $E("zoomIn").className = (level > max) ? "map_zoomIn_no" : "map_zoomIn"
        };
        it.allowZoom = function (zin, zout) {
            $E("zoomOut").className = zin ? "map_zoomOut_no" : "map_zoomOut";
            $E("zoomIn").className = zout ? "map_zoomIn_no" : "map_zoomIn"
        };
        it.ready = function (map) {
            var lp = $E("popUpMiniMapLoadingPanel");
            lp && (lp.style.display = "none");
            it.zoomIn = function () {
                map.zoomIn();
                stopEvent()
            };
            it.zoomOut = function () {
                map.zoomOut();
                stopEvent()
            };
            it.change = map.change;
            it.change(it.info);
            change = false;
            _ready = true
        };
        it.show = function (el, longitude, latitude, head, internal, address) {
            address = address.replace(/[ ]/g, "&nbsp;");
            clearTimeout(clock);
            clock = setTimeout(function () {
                (_t !== internal) && (function () {
                    _t = internal;
                    _ready = false, change = true;
                    popUpWindow.content((function () {
                        conf.SRC = (internal == "1" ? "/mblog/map1.php" : "/mblog/googlemap.php");
                        max = (internal == "1" ? 16 : 18);
                        min = (internal == "1" ? 4 : 1);
                        return popUpWindowHtml.replace(/#\{(.*?)\}/g, function (h, r) {
                            return conf[r]
                        })
                    })())
                })();
                popUpWindow.show();
                var arrow = $E("popUpMiniMapArrow");
                _p = $E("mini_map_panel");
                it.info = {
                    longitude: longitude,
                    latitude: latitude,
                    head: head,
                    address: address
                };
                var p = Core.Dom.getXY(el);
                var top = window.pageYOffset || Math.max((document.documentElement || {}).scrollTop, document.body.scrollTop);
                var x = (p[0] || 0) - 110;
                var y = Math.max((p[1] || 0) - 270, 0);
                if (scope.$pageid == "mblog") {
                    y = p[1] + 20;
                    var ys = y + 262,
                        wh = (w.innerHeight || ((de && de.clientHeight) ? de.clientHeight : d.body["clientHeight"])) + top;
                    arrow.style.cssText = "left: 120px; background-position: 0px 0px; top:-8px;";
                    popUpWindow.position(x, y);
                    if (ys > wh) {
                        App.scrollTo(top, top + (ys - wh) + 20)
                    }
                } else {
                    arrow.style.backgroundPosition = "0px";
                    arrow.style.bottom = "-8px";
                    arrow.style.cssText = "position:absolute;z-index:1000;left: 120px; background-position: right 0px; bottom: -8px;";
                    popUpWindow.position(x, y);
                    if (y < top) {
                        setTimeout(function () {
                            App.scrollTo(top, y - 20)
                        }, 10)
                    }
                }
                if (_ready) {
                    it.change(it.info)
                }
            }, 10)
        };
        return it
    })();
    App.bindPopUpMiniMap = function (dom, x, y, type, head, addr, nick) {
        addr = (addr || $CLTMSG.CL0910) + " ";
        dom.innerHTML = ['<img title="', $CLTMSG.CL0909, '" class="small_icon geo_info" src="' + scope.$BASECSS + 'style/images/common/transparent.gif"/>', addr, '- <a href="####" onclick="App.popUpMiniMap.show(this,\'', x, "','", y, "','", head, "','", type, "','", (nick ? nick + " - " : ""), addr, "');return false;\">", $CLTMSG.CL0908, "</a>"].join("")
    }
})();
(function (ns) {
    ns.SimpleJSLoader = function (url, success) {
        var d = document,
            j = d.createElement("script"),
            h = d.getElementsByTagName("head")[0],
            s = false;
        j.type = "text/javascript";
        j.charset = "UTF-8";
        j.src = url;
        j.onload = j.onreadystatechange = function () {
            if (!s && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                s = true;
                j.onload = j.onreadystatechange = null;
                typeof success == "function" && success()
            }
        };
        try {
            h.appendChild(j)
        } catch (e) {}
    }
})(App);
$registJob("splitLoadMedia", function () {
    var $GA = App.getElementsByAttribute,
        _bindApp = function () {
            var oInstance = {},
                hash = {},
                _data = [],
                _doms = [];
            oInstance.data = _data;
            oInstance.plugin = function (type, fMethod) {
                hash[type] = fMethod;
                return oInstance
            };
            oInstance.add = function (id, dom) {
                _data.push(id);
                _doms.push(dom)
            };
            oInstance.exec = function (oElement, sKey, oData) {
                var method;
                (method = hash[oData.type]) && method(oElement, sKey, oData)
            };
            oInstance.flush = function (json) {
                var i = 0,
                    len = _doms.length;
                if (!len) {
                    return
                }
                for (i; i < len; i++) {
                    if (json[_data[i]]) {
                        try {
                            oInstance.exec(_doms[i], _data[i], json[_data[i]])
                        } catch (e) {}
                        _doms.splice(i, 1);
                        _data.splice(i, 1);
                        i--;
                        len--
                    }
                }
            };
            return oInstance
        },
        shortId = function (sValue) {
            return ((sValue = sValue.match(/\/([^\/]+)\/?(<[^<]*)?$/i)) && sValue[1]) || ""
        };
    App.splitLoader.plugin({
        init: function () {
            var imgs = $GA(document.body, "img", "dynamic-src");
            return imgs
        },
        flush: function (doms) {
            if (doms.length) {
                var d, f = arguments.callee,
                    d = d = doms.shift(),
                    u, v;
                if (d && (u = d.getAttribute("dynamic-src"))) {
                    d.src = u;
                    if (d.getAttribute("vimg")) {
                        v = new Image();
                        v.setAttribute("dynamic-src", u.replace(/\/thumbnail\//, "/bmiddle/"));
                        doms.push(v)
                    }
                }
                setTimeout(function () {
                    f(doms)
                }, 0)
            }
        }
    }, "flushImg").plugin((function () {
        var bind = _bindApp();
        return {
            init: function () {
                var a = $GA(document.body, "a", "mt");
                return a
            },
            extract: function (dom) {
                bind.add(shortId(dom.innerHTML), dom)
            },
            flush: (function () {
                bind.plugin("video", App.bindVideo).plugin("url", App.bindTitle).plugin("magic", App.bindFace);
                return function (d) {
                    var data = {
                        url: bind.data.join(",")
                    };
                    var api = "/mblog/sinaurl_info.php";
                    var fail = function () {};
                    var success = function (json) {
                        bind.flush(json)
                    };
                    App.doRequest(data, api, success, fail, "post")
                }
            })()
        }
    })(), "flushApp").plugin({
        init: function () {
            var a = $GA(document.body, "a", "sm");
            return a
        },
        extract: function (dom) {
            var su = (su = dom.innerHTML.match(/^[^<]*/)) && su[0];
            if (su) {
                App.bindMusic(dom, shortId(su), su)
            }
        }
    }, "flushMusic").plugin((function () {
        var bind = _bindApp();
        return {
            init: function () {
                var s = $GA(document.body, "strong", "rid");
                return s
            },
            extract: function (dom) {
                bind.add(dom.getAttribute("rid"), dom)
            },
            flush: (function () {
                bind.plugin("count", function (dom, sKey, data) {
                    var count, att = dom.getAttribute("type");
                    if (att && (count = parseInt(data[att]))) {
                        dom.innerHTML = ["(", count, ")"].join("")
                    }
                });
                return function (dom) {
                    if (!dom.length || !(/^myprofile|mymblog|profile$/i.test(scope.$pageid))) {
                        return
                    }
                    var data = {
                        mids: bind.data.join(","),
                        oid: scope.$oid
                    };
                    var api = "/mblog/aj_comment.php";
                    var fail = function () {};
                    var success = function (json) {
                        bind.flush(json)
                    };
                    App.doRequest(data, api, success, fail, "post")
                }
            })()
        }
    })(), "flushCommentCount").plugin({
        init: function () {
            var d = $GA(document.body, "strong", "date");
            return d
        },
        extract: function (dom) {
            var num = dom.getAttribute("date") * 1;
            num && (num = App.FormatViewTime(num));
            num && (dom.innerHTML = num)
        }
    }, "flushTime").plugin({
        init: function () {
            var d = $GA(document.body, "strong", "oid");
            return d
        },
        extract: function (dom) {
            var oid = dom.getAttribute("oid");
            oid && (oid == scope.$uid) && (dom.style.display = "")
        }
    }, "flushState").plugin({
        init: function () {
            var l = $GA(document.body, "strong", "lang");
            return l
        },
        extract: function (dom) {
            var lang = dom.getAttribute("lang");
            lang && (lang = $CLTMSG[lang]) && (dom.innerHTML = lang)
        }
    }, "flushLanguage").plugin((function () {
        var xys = [],
            doms = [],
            heads = [],
            ginfo = {},
            con = 0;
        App.bindGeo = function (json) {
            var key, info, xy;
            for (key in json) {
                if (info = ginfo[key]) {
                    xy = info.geo.split(",");
                    App.bindPopUpMiniMap(info.dom, xy[0], xy[1], json[key].type, info.head, json[key].addr, info.nick)
                }
            }
        };
        return {
            init: function () {
                var p = $GA(document.body, "p", "geo");
                return p
            },
            extract: function (dom) {
                var geo = dom.getAttribute("geo"),
                    head = dom.getAttribute("head"),
                    nick = dom.getAttribute("nick") || "";
                var id = ["g", con++].join("");
                ginfo[id] = {
                    dom: dom,
                    head: head,
                    geo: geo,
                    nick: nick
                };
                xys.push([geo, id].join(","))
            },
            flush: function (dom) {
                if (!xys.length) {
                    return
                }
                var api = ["http://api.map.sina.com.cn/i/xyInChina_mul.php?xy=", xys.join("|"), "&rnd=", new Date().getTime().toString(32), Math.floor(Math.random() * 1000).toString(32)].join("");
                xys = [];
                App.SimpleJSLoader(api)
            }
        }
    })(), "flushMap");
    App.bindMedia = function (oElement) {
        var m, a, i, c, t, d, l, g;
        (i = $GA(oElement, "img", "dynamic-src")) && i.length && App.flushImg.flush(i);
        (a = $GA(oElement, "a", "mt")) && a.length && App.flushApp.flush(a);
        (m = $GA(oElement, "a", "sm")) && m.length && App.flushMusic.flush(m);
        (c = $GA(oElement, "strong", "rid")) && c.length && App.flushCommentCount.flush(c);
        (t = $GA(oElement, "strong", "date")) && t.length && App.flushTime.flush(t);
        (d = $GA(oElement, "strong", "oid")) && d.length && App.flushState.flush(d);
        (l = $GA(oElement, "strong", "lang")) && l.length && App.flushLanguage.flush(l);
        (g = $GA(oElement, "p", "geo")) && g.length && App.flushMap.flush(g)
    }
});
scope.commentConfig = {
    iInputLimitSize: 280,
    defaultPage: "0",
    sPostUrl: "/comment/addcomment.php",
    sDeleteAPI: "/comment/delcomment.php",
    sDataUrl: "/comment/commentlist.php",
    params: {},
    ListNode: null
};
scope.initCommentLoginInput = function (oUserInput, oUserPassword) {
    if (oUserInput) {
        (function (sText, oInput, oPassword, sValue) {
            oInput.style.color = "#999999";
            oInput.alt = oInput.title = sText;
            if (sValue == "") {
                oInput.value = sText
            }
            if (!oInput.binded) {
                Core.Events.addEvent(oInput, function () {
                    passcardOBJ.init(oInput, {
                        overfcolor: "#999",
                        overbgcolor: "#e8f4fc",
                        outfcolor: "#000000",
                        outbgcolor: ""
                    }, oPassword, parent);
                    oInput.style.color = "#333333";
                    if (oInput.value == sText) {
                        oInput.value = ""
                    }
                }, "focus");
                Core.Events.addEvent(oInput, function () {
                    oInput.style.color = "#999999";
                    if (oInput.value == "") {
                        oInput.value = sText
                    }
                }, "blur");
                oUserInput.binded = true
            }
        })("电子邮箱/UC号/会员帐号/手机号", oUserInput, oUserPassword, oUserInput.value)
    }
};
scope.closeCommentByRid = function (sProductId, iResourceId) {
    var oListNode = $E("_comment_list_" + sProductId + "_" + iResourceId);
    oListNode.innerHTML = "";
    oListNode.loaded = false
};
scope.loadCommentByRid = function (iOwnerUid, sProductId, sProductName, iResourceId, sResTitle, sResInfo, sNodeId, bListInDiv, bRefresh, iFocus, callback) {
    if (scope.$cuser_status === "nofull" && scope.$uid !== "" && bListInDiv == 1) {
        App.finishInformation();
        return false
    }
    var oTarget = App.Comment.getTarget();
    var oListNode = $E("_comment_list_" + sProductId + "_" + iResourceId);
    scope.commentConfig.ListNode = oListNode;
    if (oListNode != null) {
        if (!oListNode.loaded || bRefresh == 1) {
            if (!oListNode.loaded) {
                oListNode.innerHTML = '<div style="padding:30px 0;text-align:center"><img src="' + scope.$BASEIMG + 'style/images/common/loading.gif" /></div>';
                oListNode.style.diplay = ""
            }
            oListNode.loaded = false
        } else {
            oListNode.innerHTML = "";
            oListNode.loaded = false;
            return
        }
        App.Comment.loadData(scope.commentConfig.sDataUrl, oListNode, {
            act: bListInDiv,
            from: scope.currentCommentPage || scope.commentConfig.defaultPage,
            ownerUid: iOwnerUid,
            productId: sProductId,
            resId: iResourceId,
            resInfo: sResInfo,
            type: bListInDiv
        }, function (oResult) {
            oListNode.loaded = true;
            oListNode.removeAttribute("cacheid");
            try {
                App.bindMedia(oListNode)
            } catch (e) {}
            var oContentNode = $E("_comment_content_" + sProductId + "_" + iResourceId);
            App.Comment.listenerUserInput(oContentNode, scope.commentConfig.iInputLimitSize);
            var oPostNode = $E("_comment_post_" + sProductId + "_" + iResourceId);
            var oLoginDiv = $E("_comment_logindiv_" + sProductId + "_" + iResourceId);
            var oLoginuser = $E("_comment_loginuser_" + sProductId + "_" + iResourceId);
            var oLoginpassword = $E("_comment_loginpassword_" + sProductId + "_" + iResourceId);
            var i = 0,
                inputs = oListNode.getElementsByTagName("input"),
                len = inputs.length;
            var oForward = $E("agree_" + iResourceId);
            var oIsRoot = $E("isroot_" + iResourceId);
            scope.initCommentLoginInput(oLoginuser, oLoginpassword);
            oPostNode.oParam = {
                uid: scope.$uid,
                ownerUid: iOwnerUid,
                resourceId: iResourceId,
                productId: sProductId,
                productName: sProductName,
                resTitle: sResTitle,
                resInfo: sResInfo,
                listInDiv: bListInDiv
            };
            if (!oPostNode.binded) {
                Core.Events.addEvent(oPostNode, function () {
                    oForward && (oPostNode.oParam.forward = (oForward.checked) ? "1" : "0");
                    oIsRoot && (oPostNode.oParam.isroot = (oIsRoot.checked) ? "1" : "0");
                    var func = Core.Function.bind3(App.Comment.addComment, App.Comment, [scope.commentConfig.sPostUrl, oPostNode, function (oResult, oData) {
                        var callback = null;
                        if (scope.commentConfig.params.role !== undefined && scope.commentConfig.params.role != -1) {
                            callback = function () {
                                var tip = App.alert({
                                    code: "M02007"
                                }, {
                                    icon: 3,
                                    hasBtn: false
                                });
                                setTimeout(function () {
                                    tip.close()
                                }, 1000)
                            }
                        }
                        if (oData.data) {
                            var oInnerNode;
                            if (bListInDiv == 1) {
                                oInnerNode = Core.Dom.getElementsByClass(oListNode, "ul", "PL_list")[0]
                            } else {
                                oInnerNode = Core.Dom.getElementsByClass(oListNode, "ul", "commentsList")[0]
                            }
                            Core.Dom.insertHTML(oInnerNode, oData.data, "afterbegin");
                            try {
                                App.bindMedia(oInnerNode.getElementsByTagName("li")[0])
                            } catch (e) {}
                            try {
                                App.Comment.superCount(oListNode, "+")
                            } catch (e) {}
                            oContentNode.value = "";
                            App.Comment.focus(oContentNode)
                        } else {
                            scope.loadCommentByPage.bind2(oPostNode)(0, 1, callback)
                        }
                    }, function (oResult) {
                        if (oResult.code == "A00003") {
                            oPostNode.$loginDiv = oLoginDiv;
                            oPostNode.$loginuser = oLoginuser;
                            oPostNode.$loginpassword = oLoginpassword;
                            oLoginDiv.style.display = "block";
                            oPostNode.className = "btn_normal";
                            oPostNode.locked = false
                        } else {
                            if (oResult.code == "M01155") {
                                App.Comment.alert(oPostNode, App.getMsg(oResult.code), 1, function () {});
                                oContentNode.value = "";
                                oPostNode.className = "btn_normal";
                                oPostNode.locked = false
                            } else {
                                if (oResult.code == "MR0050") {
                                    oPostNode.className = "btn_normal";
                                    oPostNode.locked = false;
                                    App.forbidrefresh(function () {
                                        scope.commentConfig.params.retcode = scope.doorretcode || "";
                                        scope.doorretcode = "";
                                        Core.Events.fireEvent(oPostNode, "click")
                                    }, scope.commentConfig.sPostUrl)
                                } else {
                                    oPostNode.className = "btn_normal";
                                    oPostNode.locked = false;
                                    App.Comment.alert(oPostNode, App.getMsg(oResult.code), 1, function () {})
                                }
                            }
                        }
                    }]);
                    func()
                }, "click");
                Core.Events.addEvent(oContentNode, function (event) {
                    if ((event.ctrlKey == true && event.keyCode == "13") || (event.altKey == true && event.keyCode == "83")) {
                        oContentNode.blur();
                        Core.Events.fireEvent(oPostNode, "click")
                    }
                }, "keyup");
                oPostNode.binded = true
            }
            if (iFocus == 1) {
                if (bListInDiv == 2) {
                    var _w = window,
                        _d = _w.document,
                        _e = _d.documentElement || {};
                    var fixHeight = Core.Dom.getTop(oContentNode);
                    var st = (_w.pageYOffset || Math.max(_e.scrollTop, _d.body.scrollTop));
                    fixHeight = (st > fixHeight) ? fixHeight - 150 : null;
                    App.Comment.focus(oContentNode, fixHeight)
                } else {
                    App.Comment.focus(oContentNode)
                }
            }
            if (!scope.loginKit().isLogin) {
                oPostNode.$loginDiv = oLoginDiv;
                oPostNode.$loginuser = oLoginuser;
                oPostNode.$loginpassword = oLoginpassword;
                oLoginDiv.style.display = "block"
            }
            if (typeof(callback) == "function") {
                setTimeout(callback, 200)
            }
        }, function (oResult) {
            App.Comment.alert(oTarget, App.getMsg(oResult.code))
        }.bind2(this))
    }
};
scope.deleteCommentByRid = function (iCommentUid, iOwnerId, iResourceId, iCid, sProductId, bListInDiv, bRefresh) {
    var oTarget = App.Comment.getTarget();
    var oPostNode = $E("_comment_post_" + sProductId + "_" + iResourceId);
    var oLoginDiv = $E("_comment_logindiv_" + sProductId + "_" + iResourceId);
    var oLoginuser = $E("_comment_loginuser_" + sProductId + "_" + iResourceId);
    var oLoginpassword = $E("_comment_loginpassword_" + sProductId + "_" + iResourceId);
    var deleteAction = function (oIsLogin) {
        var sText = App.getMsg("SCM001");
        if (iCommentUid != iOwnerId && iCommentUid != scope.$uid && (Core.Array.findit(App.admin_uid_list, iCommentUid) === -1)) {
            sText += "<div style='margin-top:10px;font-size:14px;'><input style='vertical-align:-1px;margin-right:3px;' type='checkbox' id='block_user' name='block_user'><label for='block_user'>" + $CLTMSG.CC0601 + "</label></div>"
        }
        App.Comment.alert(oTarget, sText, 4, function () {
            var oPost = {
                act: "delComment",
                resUid: iOwnerId,
                resId: iResourceId,
                id: iCid,
                productId: sProductId,
                commentId: iCommentUid
            };
            if ($E("block_user") && $E("block_user").checked) {
                oPost.isblack = "OK"
            }
            App.Comment.deleteComment(scope.commentConfig.sDeleteAPI, oPost, function (oResult) {
                if (oIsLogin) {
                    setTimeout(function () {
                        window.location.reload(true)
                    }, 10);
                    return
                }
                if (bRefresh == 1) {
                    if (!scope.$resourceId && bListInDiv == 2) {
                        setTimeout(function () {
                            window.location.reload(true)
                        }, 10)
                    } else {
                        var clz = "commentsCell",
                            oWaper = oTarget;
                        if (bListInDiv == 1) {
                            clz = "MIB_linedot3"
                        }
                        while (true) {
                            if (([" ", oWaper.className, " "].join("").indexOf(clz) != -1) || !(oWaper = oWaper.parentNode)) {
                                break
                            }
                        }
                        var oParentNode = oWaper.parentNode;
                        oParentNode.removeChild(oWaper);
                        try {
                            App.Comment.superCount(oParentNode.parentNode, "-", function () {
                                scope.loadCommentByPage.bind2(oPostNode)(scope.currentCommentPage)
                            })
                        } catch (e) {}
                    }
                }
            }, function (oResult) {
                if (!oResult.code) {
                    return
                }
                if (oResult.code == "A00003") {
                    App.ModLogin(function () {})
                } else {
                    App.Comment.alert(oTarget, App.getMsg(oResult.code), 1, function () {
                        window.location.reload(true)
                    })
                }
            })
        }, function () {})
    };
    if (!scope.loginKit().isLogin) {
        App.ModLogin({
            func: function () {
                deleteAction(true)
            }
        })
    } else {
        deleteAction()
    }
};
scope.loadCommentByPage = function (nPage, iFocus, callback) {
    iFocus = iFocus || 0;
    scope.currentCommentPage = nPage || scope.commentConfig.defaultPage;
    if (this.oParam) {
        var oParam = this.oParam;
        scope.loadCommentByRid(oParam.ownerUid, oParam.productId, oParam.productName, oParam.resourceId, oParam.resTitle, oParam.resInfo, "", oParam.listInDiv, 1, iFocus, callback)
    } else {
        scope.loadCommentByRid(scope.$oid || "", $CONFIG.$product || "", scope.$appName || "", scope.$resourceId || "", scope.$resTitle || "", scope.$resInfo || "", "", "2", 1, iFocus, callback)
    }
    var e = Core.Events.getEvent();
    if (e.type != "click") {
        return
    }
    var listNode = scope.commentConfig.ListNode;
    if (listNode) {
        var top = Core.Dom.getTop(listNode);
        var ua = navigator.userAgent.toLowerCase(),
            ue = {};
        var de = document.documentElement;
        ue.chrome = /chrome/i.test(ua);
        var de = document.documentElement;
        if (ue.chrome) {
            de = document.body
        }
        de.scrollTop = top + 40
    }
};
scope.replyByCid = function (iCommentUid, iOwnerUId, iResourceId, iCid, sCname, sReplyContent, sProductId, bListInDiv, bRefresh, sResTitle) {
    bListInDiv = bListInDiv == 1 ? 1 : 2;
    var oContentNode;
    var sCurrentValue;
    var oPostNode = $E("_comment_post_" + sProductId + "_" + iResourceId);
    var oLoginDiv = $E("_comment_logindiv_" + sProductId + "_" + iResourceId + (bListInDiv == 2 ? "_" + iCid : ""));
    var oLoginuser = $E("_comment_loginuser_" + sProductId + "_" + iResourceId + (bListInDiv == 2 ? "_" + iCid : ""));
    var oLoginpassword = $E("_comment_loginpassword_" + sProductId + "_" + iResourceId + (bListInDiv == 2 ? "_" + iCid : ""));
    scope.initCommentLoginInput(oLoginuser, oLoginpassword);
    if (bListInDiv == 1) {
        oContentNode = $E("_comment_content_" + sProductId + "_" + iResourceId);
        if (oPostNode && oPostNode.oParam) {
            oPostNode.oParam.replyUid = iCommentUid;
            oPostNode.oParam.ccontent = sReplyContent;
            oPostNode.oParam.cid = iCid
        }
    } else {
        oContentNode = $E("_comment_content_" + sProductId + "_" + iResourceId + "_" + iCid);
        var oReplyPanel = $E("_comment_reply_" + sProductId + "_" + iResourceId + "_" + iCid);
        if (oReplyPanel.isOpen) {
            oReplyPanel.style.display = "none";
            oReplyPanel.isOpen = false;
            return
        } else {
            oReplyPanel.style.display = "block";
            oReplyPanel.isOpen = true
        }
        var inputs = oReplyPanel.getElementsByTagName("input");
        var len = inputs.length;
        var oForward = $E("agree_" + iCid);
        var oIsRoot = $E("isroot_" + iCid);
        if (oForward && oForward.parentNode) {
            oForward.parentNode.style.display = "block"
        }
        var oReplyButton = $E("_comment_post_" + sProductId + "_" + iResourceId + "_" + iCid);
        oReplyButton.oParam = (!oPostNode) ? {
            uid: scope.$uid,
            ownerUid: iOwnerUId,
            resourceId: iResourceId,
            productId: sProductId,
            resTitle: sResTitle,
            listInDiv: bListInDiv
        } : (function () {
            var obj = {};
            for (var p in oPostNode.oParam) {
                obj[p] = oPostNode.oParam[p]
            }
            return obj
        })();
        oReplyButton.oParam.replyUid = iCommentUid;
        oReplyButton.oParam.ccontent = sReplyContent;
        oReplyButton.oParam.cid = iCid;
        if (!oReplyButton.binded) {
            Core.Events.addEvent(oReplyButton, function () {
                oForward && (oReplyButton.oParam.forward = (oForward.checked) ? "1" : "0");
                oIsRoot && (oReplyButton.oParam.isroot = (oIsRoot.checked) ? "1" : "0");
                var func = Core.Function.bind3(App.Comment.addComment, App.Comment, [scope.commentConfig.sPostUrl, oReplyButton, function (oResult) {
                    if (bRefresh == 1) {
                        var cb;
                        if (scope.commentConfig.params.role !== undefined && scope.commentConfig.params.role != -1) {
                            cb = function () {
                                return App.alert({
                                    code: "M02008"
                                }, {
                                    icon: 3
                                })
                            }
                        }
                        scope.loadCommentByPage.bind2(oReplyButton)(0, 1, cb)
                    } else {
                        var oParam = oReplyButton.oParam;
                        var oReplyPanel = $E("_comment_reply_" + oParam.productId + "_" + oParam.resourceId + "_" + oParam.cid);
                        oContentNode.value = "";
                        oReplyButton.isOpen = false;
                        oReplyButton.className = "btn_normal";
                        if (scope.$pageid == "commentHandler") {
                            var oReplayTip = $E("_comment_paneltip_" + oParam.productId + "_" + oParam.resourceId + "_" + oParam.cid);
                            if (oReplyPanel && oReplayTip) {
                                var _successDialog = App.Comment.tip(oReplyButton, App.getMsg("SCM007"), 3, function () {});
                                _successDialog.onClose = function () {
                                    window.clearTimeout(_successDialog.clock);
                                    oReplayTip.style.display = "none";
                                    oReplyPanel.style.display = "none"
                                };
                                _successDialog.clock = window.setTimeout(function () {
                                    _successDialog.close()
                                }, 1000)
                            }
                        } else {
                            App.Comment.alert(oReplyButton, App.getMsg("SCM007"), 3, function () {});
                            oReplyPanel.style.display = "none"
                        }
                        oReplyPanel.isOpen = false
                    }
                }, function (oResult) {
                    if (oResult.code == "A00003") {
                        oReplyButton.$loginDiv = oLoginDiv;
                        oReplyButton.$loginuser = oLoginuser;
                        oReplyButton.$loginpassword = oLoginpassword;
                        oLoginDiv.style.display = "block";
                        oReplyButton.className = "btn_normal";
                        oReplyButton.locked = false
                    } else {
                        if (oResult.code == "M01155") {
                            oReplyButton.className = "btn_normal";
                            oReplyButton.locked = false;
                            App.Comment.alert(oReplyButton, App.getMsg(oResult.code), 1, function () {});
                            oContentNode.value = ""
                        } else {
                            if (oResult.code == "MR0050") {
                                App.forbidrefresh(function () {
                                    oReplyButton.className = "btn_normal";
                                    oReplyButton.locked = false;
                                    scope.commentConfig.params.retcode = scope.doorretcode || "";
                                    scope.doorretcode = "";
                                    Core.Events.fireEvent(oReplyButton, "click")
                                }, scope.commentConfig.sPostUrl)
                            } else {
                                oReplyButton.className = "btn_normal";
                                oReplyButton.locked = false;
                                App.Comment.alert(oReplyButton, App.getMsg(oResult.code), 1, function () {})
                            }
                        }
                    }
                }]);
                func()
            }, "click");
            Core.Events.addEvent(oContentNode, function (event) {
                if ((event.ctrlKey == true && event.keyCode == "13") || (event.altKey == true && event.keyCode == "83")) {
                    oContentNode.blur();
                    Core.Events.fireEvent(oReplyButton, "click")
                }
            }, "keyup");
            oReplyButton.binded = true
        }
        if (!scope.loginKit().isLogin) {
            oReplyButton.$loginDiv = oLoginDiv;
            oReplyButton.$loginuser = oLoginuser;
            oReplyButton.$loginpassword = oLoginpassword;
            oLoginDiv.style.display = "block"
        }
    }
    App.Comment.listenerUserInput(oContentNode, scope.commentConfig.iInputLimitSize);
    sCurrentValue = Core.String.trim(oContentNode.value);
    var reg = new RegExp("^" + $CLTMSG.CC0501 + "[^:]*:");
    if (reg.test(sCurrentValue)) {
        oContentNode.value = sCurrentValue.replace(reg, $CLTMSG.CC0602 + sCname + ":")
    } else {
        oContentNode.value = $CLTMSG.CC0602 + sCname + ":" + sCurrentValue
    }
    var _w = window,
        _d = _w.document,
        _e = _d.documentElement || {};
    var fixHeight = Core.Dom.getTop(oContentNode);
    var st = (_w.pageYOffset || Math.max(_e.scrollTop, _d.body.scrollTop));
    fixHeight = (st > fixHeight) ? fixHeight - 150 : null;
    App.Comment.focus(oContentNode, fixHeight)
};
scope.getCommentCount = function (oData) {
    var oGet = oData || scope.$commentdata;
    var aProductIds = [];
    var aOwnerUids = [];
    var aResourceIds = [];
    if (oGet && oGet.length > 0) {
        var i = 0;
        for (i; i < oGet.length; i++) {
            aProductIds.push(oGet[i].pid);
            aOwnerUids.push(oGet[i].oid);
            aResourceIds.push(oGet[i].rid)
        }
        Utils.Io.Ajax.request("/comment/commentnum.php", {
            POST: {
                resourceids: aResourceIds.join(","),
                productids: aProductIds.join(","),
                ownerUids: aOwnerUids.join(",")
            },
            onComplete: function (oResult) {
                if (oResult.code == "A00006") {
                    var oData = oResult.data;
                    if (oData) {
                        var i;
                        var hashList = {};
                        for (i in oData) {
                            hashList[oData[i]["resourceid"]] = oData[i].count;
                            var oCountNode = $E("_comment_count_" + oData[i].productid + "_" + oData[i].resourceid);
                            if (oCountNode) {
                                App.Comment.setCount(oCountNode, oData[i].count || 0)
                            }
                        }
                        var fwList = document.getElementsByName("_comment_count_" + oData[i].productid);
                        var len = fwList.length;
                        if (len > 0) {
                            var i = 0;
                            for (i; i < len; i++) {
                                var fwA = fwList[i];
                                if (!fwA.changed) {
                                    var value = fwA.getAttribute("resid");
                                    var snapValue = hashList[value];
                                    if (hashList[value]) {
                                        fwA.innerHTML = $CLTMSG.CC0603 + "<string>(" + (hashList[value] || 0) + ")</string>"
                                    } else {
                                        fwA.innerHTML = $CLTMSG.CC0603 + "<string>(0)</string>"
                                    }
                                    fwA.changed = true
                                }
                            }
                        }
                    }
                }
            },
            returnType: "json"
        })
    }
};
scope.focusCommentContent = function (sProductId, iResourceId) {
    sProductId = "miniblog";
    var oContentNode = $E("_comment_content_" + sProductId + "_" + iResourceId);
    App.Comment.focus(oContentNode)
};
scope.loadComment = function (role) {
    if (role !== undefined) {
        Core.Class.extend(scope.commentConfig.params, {
            role: role.toString()
        })
    }
    if (scope.$resourceId) {
        scope.loadCommentByPage(1)
    }
};
$registJob("loadComment", function () {
    scope.loadComment(scope.$pageid == "mblog" ? "-1" : undefined)
});
$registJob("ratateImage", function () {
    if (!$E("imgContainer")) {
        return false
    }
    var defaultWidth = 500;
    var imgID = "imgContainer";
    Core.Events.addEvent("rotateLeft", function () {
        App.rotate.rotateLeft(imgID, 90, function (canvas) {}, defaultWidth)
    }, "click");
    Core.Events.addEvent("rotateRight", function () {
        App.rotate.rotateRight(imgID, 90, function (canvas) {}, defaultWidth)
    }, "click")
});
App.rotate = {
    rotateRight: function (imgID, angle, callback, maxWidth) {
        this._img[imgID] = this._img[imgID] || {};
        this._img[imgID]._right = this._img[imgID]._right || 0;
        this._img[imgID]._right++;
        this._rotate(imgID, angle == undefined ? 90 : angle, callback, maxWidth)
    },
    rotateLeft: function (imgID, angle, callback, maxWidth) {
        this._img[imgID] = this._img[imgID] || {};
        this._img[imgID]._left = this._img[imgID]._left || 0;
        this._img[imgID]._left++;
        this._rotate(imgID, angle == undefined ? -90 : -angle, callback, maxWidth)
    },
    _img: {},
    _rotate: function (imgID, angle, callback, maxWidth) {
        var p = $E(imgID);
        p.angle = ((p.angle == undefined ? 0 : p.angle) + angle) % 360;
        if (p.angle >= 0) {
            var rotation = Math.PI * p.angle / 180
        } else {
            var rotation = Math.PI * (360 + p.angle) / 180
        }
        var costheta = Math.cos(rotation);
        var sintheta = Math.sin(rotation);
        if (document.all && !window.opera) {
            var canvas = document.createElement("img");
            canvas.src = p.src;
            canvas.height = p.height;
            canvas.width = p.width;
            if (!this._img[imgID]._initWidth) {
                this._img[imgID]._initWidth = canvas.width;
                this._img[imgID]._initHeight = canvas.height
            }
            if (canvas.height > maxWidth + 8) {
                canvas._w1 = canvas.width;
                canvas._h1 = canvas.height;
                canvas.height = maxWidth - 4;
                canvas.width = (canvas._w1 * canvas.height) / canvas._h1
            }
            canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + costheta + ",M12=" + (-sintheta) + ",M21=" + sintheta + ",M22=" + costheta + ",SizingMethod='auto expand')";
            var me = this;
            setTimeout(function () {
                var left = me._img[imgID]._left,
                    right = me._img[imgID]._right;
                if (right % 2 == 0 || left % 2 == 0 || Math.abs(right - left) % 2 == 0) {
                    canvas.width = me._img[imgID]._initWidth - 4;
                    canvas.height = me._img[imgID]._initHeight - 4
                }
                if ((left === 1 && !right) || (!left && right === 1)) {
                    me._img[imgID]._width = canvas.width;
                    me._img[imgID]._height = canvas.height
                }
                if (right > 0 && left > 0 && Math.abs(right - left) % 2 != 0) {
                    canvas.width = me._img[imgID]._width - 4;
                    canvas.height = me._img[imgID]._height - 4
                }
            }, 0)
        } else {
            var canvas = document.createElement("canvas");
            if (!p.oImage) {
                canvas.oImage = p
            } else {
                canvas.oImage = p.oImage
            }
            canvas.style.width = canvas.width = Math.abs(costheta * canvas.oImage.width) + Math.abs(sintheta * canvas.oImage.height);
            canvas.style.height = canvas.height = Math.abs(costheta * canvas.oImage.height) + Math.abs(sintheta * canvas.oImage.width);
            if (canvas.width > maxWidth) {
                canvas.style.width = maxWidth + "px"
            }
            var context = canvas.getContext("2d");
            context.save();
            if (rotation <= Math.PI / 2) {
                context.translate(sintheta * canvas.oImage.height, 0)
            } else {
                if (rotation <= Math.PI) {
                    context.translate(canvas.width, -costheta * canvas.oImage.height)
                } else {
                    if (rotation <= 1.5 * Math.PI) {
                        context.translate(-costheta * canvas.oImage.width, canvas.height)
                    } else {
                        context.translate(0, -sintheta * canvas.oImage.width)
                    }
                }
            }
            context.rotate(rotation);
            try {
                context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height)
            } catch (e) {}
            context.restore()
        }
        canvas.id = p.id;
        canvas.angle = p.angle;
        p.parentNode.replaceChild(canvas, p);
        if (callback && typeof callback === "function") {
            callback(canvas)
        }
    }
};
App.shrinkImg = function (_fid) {
    var $w = window,
        $d = $w.document,
        $e = $d.documentElement || {};
    var $t = function () {
        if (arguments.length > 0) {
            $e.scrollTop = arguments[0];
            $d.body.scrollTop = arguments[0];
            return
        }
        return ($w.pageYOffset || Math.max($e.scrollTop, $d.body.scrollTop))
    };
    var $s = $w.innerHeight || ($e && $e.clientHeight) ? $e.clientHeight : $d.body["clientHeight"];
    var $xy = Core.Dom.getXY;
    var $y = function (el) {
        var et, pn;
        if ("getBoundingClientRect" in el) {
            et = el.getBoundingClientRect().top;
            return et + $t()
        }
        if (!(pn = el.offsetParent)) {
            return 0
        }
        et = pn.offsetTop;
        while (pn && pn != $d.body) {
            et += pn.offsetTop;
            pn = pn.offsetParent
        }
        return et || 0
    };
    var $sl = function (d, t) {
        if (t) {
            return $s - ($xy(d)[1] - $t())
        } else {
            return $xy(d)[1] - $t()
        }
    };
    var _dispContainer = $E("disp_" + _fid);
    var _prevContainer = $E("prev_" + _fid);
    var _li = _prevContainer.parentNode.parentNode;
    if (_li.nodeName.toLowerCase() !== "li") {
        _li = _li.parentNode.parentNode
    }
    var _dis = $sl(_li);
    _dispContainer.innerHTML = "";
    _dispContainer.style.display = "none";
    _prevContainer.style.display = "";
    var _afterHeight = _li.offsetHeight;
    if ((-_dis) > _afterHeight) {
        $t($t() + _dis)
    }
};
App.scaleImg = function (dom, pid, bForward) {
    var baseURI = scope.$BASEIMG + "style/images/",
        smallImg = {},
        defaultWidth = 440;
    smallImg.dom = dom.getElementsByTagName("IMG")[0];
    smallImg.initW = smallImg.dom.width;
    smallImg.initH = smallImg.dom.height;
    if (bForward && $IE6) {
        defaultWidth -= 8
    }
    if (dom.loading && dom.loading.style.display === "") {
        return
    }
    if (!dom.loading) {
        var loading = dom.loading = $C("img");
        loading.src = baseURI + "common/loading.gif";
        Core.Dom.insertAfter(loading, dom, "beforeend");
        loading.style.cssText = ["position:absolute", "top:" + (smallImg.initH / 2 - 10) + "px", "left:" + (smallImg.initW / 2 - 10) + "px", "background-color:transparent", "border:0px", "width:16px", "height:16px", "z-index:1001"].join(";")
    } else {
        dom.loading.style.display = ""
    }
    var getImgSize = function (size) {
        var newImgSize = {};
        if (size[0] > defaultWidth) {
            newImgSize.width = defaultWidth;
            newImgSize.height = Math.round(size[1] * (defaultWidth / size[0]))
        } else {
            newImgSize.width = size[0];
            newImgSize.height = size[1]
        }
        slideShowImg(newImgSize)
    };
    var slideShowImg = function (newImgSize) {
        var getDisplayId = function () {
            var _prev = dom.parentNode.parentNode.getAttribute("id");
            return _prev.replace("prev_", "")
        };
        var _fid = getDisplayId();
        var _dispContainer = $E("disp_" + _fid);
        var _prevContainer = $E("prev_" + _fid);
        var preView = $C("div");
        preView.className = "blogPicOri";
        var imgId = "loaded" + (new Date().getTime());
        var rotateLeft = "left" + (new Date().getTime()) + Math.round(Math.random(100) * 100000);
        var rotateRight = "right" + (new Date().getTime()) + Math.round(Math.random(100) * 100000);
        var iconURI = baseURI + "/common/transparent.gif";
        try {
            scope.statistics({
                type: "open_img",
                source: encodeURIComponent(App.imgURL(pid, "bmiddle"))
            })
        } catch (e) {}
        var preView_innerHTML = '		    <p>		        <cite>		            <a href="javascript:;" onclick="App.shrinkImg(\'' + _fid + '\');">		            	<img title="' + $CLTMSG.CD0079 + '" class="small_icon cls" src="' + iconURI + '">' + $CLTMSG.CD0079 + '</a>		            <cite class="MIB_line_l">|</cite>		        </cite>		        <cite>		            <a href="' + App.imgURL(pid, "orignal") + '" target="_blank">		            	<img  title="' + $CLTMSG.CD0080 + '" class="small_icon original" src="' + iconURI + '">' + $CLTMSG.CD0080 + '</a>		        </cite>		        <cite class="MIB_line_l">|</cite>		        <cite>		            <a id="' + rotateLeft + '" href="javascript:;"><img  title="' + $CLTMSG.CD0081 + '" class="small_icon turn_l" 		            	src="' + iconURI + '">' + $CLTMSG.CD0081 + '</a>		        </cite>		        <cite>		            <a id="' + rotateRight + '" href="javascript:;" class="last_turn_r">		            	<img title="' + $CLTMSG.CD0082 + '" class="small_icon turn_r" src="' + iconURI + '">' + $CLTMSG.CD0082 + '</a>		        </cite>		    </p>		    <img id="' + imgId + '" class="imgSmall" 		    	src="' + App.imgURL(pid, "bmiddle") + '" 		    	width="' + newImgSize.width + '" height="' + newImgSize.height + '" >		';
        if (bForward) {
            preView.innerHTML = preView_innerHTML
        } else {
            preView.innerHTML = '<div class="MIB_assign_t"></div><div class="MIB_assign_c MIB_txtbl"><div class="blogPicOri">' + preView_innerHTML + '</div></div><div class="MIB_assign_b"></div>';
            preView.className = "MIB_assign"
        }
        dom.loading.style.display = "none";
        _dispContainer.style.display = "";
        _prevContainer.style.display = "none";
        if (bForward) {
            var lineDot = $C("div");
            lineDot.className = "MIB_linedot_l1";
            _dispContainer.appendChild(lineDot);
            _dispContainer.appendChild(preView)
        } else {
            _dispContainer.appendChild(preView)
        }
        Core.Events.addEvent($E(imgId), function () {
            App.shrinkImg(_fid)
        }, "click");
        Core.Events.addEvent($E(rotateLeft), function () {
            App.rotate.rotateLeft(imgId, 90, rotateCallback, defaultWidth)
        }, "click");
        Core.Events.addEvent($E(rotateRight), function () {
            App.rotate.rotateRight(imgId, 90, rotateCallback, defaultWidth)
        }, "click");

        function rotateCallback(canvas) {
            canvas.className = "imgSmall";
            Core.Events.addEvent(canvas, function () {
                App.shrinkImg(_fid)
            }, "click");
            preView.parentNode.style.cssText = "text-align:center;width:100%;"
        }
    };
    new App.getImgSize(App.imgURL(pid, "bmiddle"), getImgSize)
};
App.closeIntroduction = function (n, d) {
    if (n == 101) {
        Utils.Cookie.setCookie("lianghui", "1", 24, false, "t.sina.com.cn", false);
        return false
    }
    if (n == 103) {
        Utils.Cookie.setCookie("message", "1", 24 * 7, false, "t.sina.com.cn", false);
        return false
    }
    var num = parseInt(n);
    if (n > 10) {
        var oldNum = parseInt(Utils.Cookie.getCookie("weekguide")) || 0;
        var kList = [1, 2, 4, 8, 16];
        var newNum = (kList[n - 11]) | oldNum;
        Utils.Cookie.setCookie("weekguide", newNum, ((24 - (new Date()).getHours()) - ((new Date()).getMinutes()) / 60 + 24 * (7 - (new Date()).getDay())), false, "t.sina.com.cn", false)
    } else {
        var oldNum = parseInt(Utils.Cookie.getCookie("guide")) || 0;
        var kList = [16, 8, 4, 2, 1];
        var newNum = (kList[n - 1]) | oldNum;
        Utils.Cookie.setCookie("guide", newNum, ((24 - (new Date()).getHours()) - ((new Date()).getMinutes()) / 60), false, "t.sina.com.cn", false)
    }
};
App.closeIntroduction2 = function (id, second, flag) {
    second = parseInt(second);
    var hour = (second / 3600);
    Utils.Cookie.setCookie((flag || "c_") + id, "1", hour, false, "t.sina.com.cn", false)
};
App.rollOut = function (dom, callback) {
    if (dom.style.display === "") {
        return
    }
    dom.style.cssText = "position:relative;overflow:hidden;";
    dom.style.display = "";
    var _height = dom.offsetHeight;
    var _start = 0;
    dom.style.height = _start + "px";
    var glide = function () {
        _start = Math.min(_height, (_start + 10));
        dom.style.height = _start + "px";
        if (_start == _height) {
            dom.style.cssText = "";
            if (callback) {
                callback()
            }
        } else {
            setTimeout(arguments.callee, 20)
        }
    };
    glide()
};
scope.langList = function (el) {
    scope.switchLanguage(el.value)
};
scope.langList1 = function (el) {
    scope.switchLanguage(el.value)
};
scope.switchLanguage = function (lang) {
    var language = scope.$lang === "zh" ? "zh-cn" : scope.$lang;
    if (language === lang) {
        return
    }
    App.confirm($CLTMSG.CD0150, {
        icon: 4,
        width: 360,
        ok: function () {
            Utils.Io.Ajax.request("/person/aj_select_lang.php", {
                onComplete: function (oResult) {
                    if (oResult.code === "A00006") {
                        window.location.reload(true)
                    }
                    if (oResult.code === "M00003") {
                        return App.ModLogin(null, $CLTMSG.CD0058)
                    }
                },
                onException: function (e) {},
                returnType: "json",
                POST: {
                    uid: scope.$uid,
                    lang: lang
                }
            })
        },
        cancel: function () {
            $E("lang_select").value = language
        }
    })
};
scope.statistics = (function () {
    var s, aQuerry = [],
        i, h = document.getElementsByTagName("head")[0],
        url;
    return function (oGet, sUrl) {
        try {
            if (!oGet) {
                return false
            }
            if (!oGet.uid) {
                oGet.uid = scope.loginKit().uid
            }
            if (s) {
                s.parentNode.removeChild(s)
            }
            for (i in oGet) {
                aQuerry.push("".concat(i, "=", oGet[i]))
            }
            s = document.createElement("script");
            s.charset = "utf-8";
            url = sUrl ? sUrl : "http://hits.sinajs.cn/c.html?";
            s.src = [url, aQuerry.join("&")].join("");
            h.appendChild(s)
        } finally {
            i = null;
            aQuerry = []
        }
    }
})();
scope.seting = function () {
    var sp;
    if (sp = $E("top_tray_seting_panel")) {
        var sps = sp.style;
        sps.display = (sps.display == "none") ? "block" : "none";
        Core.Events.stopEvent();
        if (!sp.bind2body) {
            Core.Events.addEvent(document.body, function () {
                var sp;
                if (sp = $E("top_tray_seting_panel")) {
                    sp.style.display = "none"
                }
            }, "click");
            sp.bind2body = true
        }
    }
};
scope.setSkin = function (value) {
    var st;
    if (st = $E("skin_transformers")) {
        var url = st.href + "";
        var path = url.substring(0, url.lastIndexOf("n/") + 2);
        st.href = path + value + "/skin.css";
        scope.statistics({
            skin: value
        }, "/person/skin_view.php?");
        scope.postSkinId = value;
        var selectedLi = Core.Dom.getElementsByClass($E("skin_ul"), "li", "selected")[0];
        if (selectedLi != null) {
            selectedLi.className = ""
        }
        var selectLi = $E("li_" + value);
        if (selectLi) {
            selectLi.className = "selected"
        }
    }
};
scope.postSkin = function () {
    if (scope.postSkinId) {
        Utils.Io.Ajax.request("/person/skin_post.php", {
            onComplete: function (oResult) {
                App.promptTip(oResult, null, "system_information", (oResult.code == "A00006") ? "ok" : "wrong");
                setTimeout(function () {
                    window.location.href = "/" + scope.$uid
                }, 1000)
            },
            onException: function (e) {},
            returnType: "json",
            POST: {
                skin: scope.postSkinId
            }
        })
    }
};
scope.msgClose = function () {
    var mp;
    if (mp = $E("top_tray_msg_panel")) {
        mp.style.display = "none";
        Utils.Io.Ajax.request("/public/del_unread.php", {
            onComplete: function (oResult) {
                if (oResult.code != "A00006") {
                    App.alert(App.getMsg(oResult.code))
                }
            },
            onException: function (e) {},
            returnType: "json",
            POST: {}
        })
    }
};
App.addfavorite = function (url, text) {
    if (document.all) {
        window.external.addFavorite(url, text)
    } else {
        if (window.sidebar) {
            window.sidebar.addPanel(text, url, "")
        }
    }
    return false
};
(function () {
    Boot.addDOMLoadEvent(function () {
        WBTopTray.addListener("breath", function (data) {
            try {
                var toptip = $E("top_tray_msg_panel"),
                    request, ts = (toptip || {}).style,
                    yt = $E("toptray_yellow_tip"),
                    ftip = $E("feed_msg_new"),
                    fs = (ftip || {}).style,
                    r = false;
                var s = [],
                    d = data,
                    c = d.comment,
                    m = d.msg,
                    a = d.atme,
                    t = d.attention.num,
                    f = d.feed;
                c > 0 && s.push('<div class="l_1">' + c + $CLTMSG.CX0050 + '<a href="/comments">' + $CLTMSG.CX0051 + "</a></div>");
                t > 0 && s.push('<div class="l_1">' + t + $CLTMSG.CX0052 + '<a href="http://t.sina.com.cn/' + scope.$uid + '/fans">' + $CLTMSG.CX0053 + "</a></div>");
                m > 0 && s.push('<div class="l_1">' + m + $CLTMSG.CX0054 + '<a href="/messages">' + $CLTMSG.CX0055 + "</a></div>");
                a > 0 && s.push('<div class="l_1">' + a + $CLTMSG.CX0056 + '<a href="/atme">' + $CLTMSG.CX0057 + "</a></div>");
                ts && (ts.display = "none") && (s = s.join(" ")) && yt && (yt.innerHTML = s) && (ts.display = "");
                fs && (fs.display == "none") && (f > 0) && ftip && (function () {
                    ftip.onclick = function () {
                        if (!scope.$uid) {
                            return
                        }
                        window.location.href = "/" + scope.$uid;
                        return false
                    };
                    ftip.innerHTML = $CLTMSG.CX0058;
                    App.rollOut(ftip);
                    r = true
                })()
            } catch (e) {}
        })
    })
})();
App.reportOpenWin = function (url) {
    if (!scope.$uid) {
        var initErrorTip = $CLTMSG.CX0059;
        App.ModLogin({
            func: function () {
                window.open(url, $CLTMSG.CX0060, "height=538px,width=450px,toolbar=no, menubar=no,resizable=no,location=no, status=no")
            },
            initErrorTip: initErrorTip
        });
        return
    }
    window.open(url, $CLTMSG.CX0060, "height=538px,width=450px,toolbar=no, menubar=no,resizable=no,location=no, status=no")
};
App.closeTips = function () {
    Core.Events.stopEvent();
    var obj = Core.Events.getEventTarget();
    var tip = obj;
    for (; !App.Dom.hasClass(tip, "Mblog_tips_tl"); tip = obj.parentNode) {}
    if (tip) {
        tip.style.display = "none"
    }
};
App.hotSearch = function (input, subbtn, form, maxlen, txt, cindex) {
    var maxlen = maxlen || 30;
    var textnode = $E(input);
    var subbtn = $E(subbtn);
    Utils.Sinput.limitMaxLen(textnode, maxlen);

    function formget(event) {
        var value = Core.String.trim(textnode.value);
        value = Core.String.leftB(value, maxlen);
        if (value && value != txt) {
            location.href = "/k/" + encodeURIComponent(encodeURIComponent(value))
        } else {
            App.TextareaUtils.setCursor(textnode)
        }
        Core.Events.stopEvent(event)
    }
    Core.Events.addEvent(subbtn, formget, "click");
    Core.Events.addEvent(textnode, function (e) {
        if (e.keyCode == 13) {
            formget()
        }
    }, "keyup")
};
$registJob("hotsearch", function () {
    try {
        App.hotSearch("hot_keyword", "hot_submit", "hot_search", null, $CLTMSG.CC1001)
    } catch (exp) {}
});
$registJob("hotsearchtop", function () {
    try {
        App.hotSearch("hot_keyword_top", "hot_submit_top", "hot_search_top", null, $CLTMSG.CC1001)
    } catch (exp) {}
});
$registJob("bind_mobile_info", function () {
    var panel = $E("bind_mobile_info");
    var _param = {};
    var setc = Utils.Cookie.setCookie;
    var getc = Utils.Cookie.getCookie;
    var delc = Utils.Cookie.deleteCookie;
    var getCount = function () {
        var a = decodeURIComponent(getc("uc"));
        if (a) {
            a = a.split("|");
            for (var i = 0; i < a.length; i++) {
                a[i] = parseInt(a[i], 32)
            }
            return a
        }
        return ""
    };
    var setCount = function (a) {
        for (var i = 0; i < a.length; i++) {
            a[i] = a[i].toString(32)
        }
        a = a.join("|");
        delc("uc");
        setc("uc", a, 24)
    };
    if (panel) {
        _param.ouid = scope.$oid;
        if (scope.$pageid === "mymblog") {
            _param.pageid = "mymblog"
        }
        Utils.Io.Ajax.request("/plugins/aj_showbind.php", {
            GET: _param,
            onComplete: function (oResult) {
                if (oResult.code == "A00006") {
                    panel.innerHTML = oResult.data
                }
            },
            returnType: "json"
        })
    }
    var a = $E("attentions"),
        m = $E("myfans"),
        b = $E("mblog"),
        d;
    if (a && m && b) {
        Utils.Io.Ajax.request("/mblog/aj_getuserinfo.php", {
            GET: {
                oid: scope.$oid
            },
            onComplete: function (oResult) {
                if (oResult.code === "A00006" && (d = oResult.data)) {
                    if (d.attentions.toString().length + d.myfans.toString().length + d.mblogs.toString().length > 14) {
                        a.parentNode.parentNode.className += " funs_num";
                        m.parentNode.parentNode.className += " funs_num";
                        b.parentNode.parentNode.className += " funs_num"
                    }
                    a.innerHTML = d.attentions || 0;
                    m.innerHTML = d.myfans || 0;
                    b.innerHTML = d.mblogs || 0;
                    var c = [d.attentions, d.myfans, d.mblogs];
                    setCount(c)
                } else {
                    var c = getCount();
                    if (c) {
                        a.innerHTML = d[0];
                        m.innerHTML = d[1];
                        b.innerHTML = d[2]
                    } else {
                        a.innerHTML = 0;
                        m.innerHTML = 0;
                        b.innerHTML = 0
                    }
                }
            },
            returnType: "json"
        })
    }
});
App.miniblogDel = function (id, single, el) {
    var pos = Core.Dom.getXY(el);
    var x = pos[0] - ((200 - el.offsetWidth) / 2);
    var y = pos[1] - (el.offsetHeight) - 70;
    var alert = App.PopUpConfirm().position(x, y);
    var alert1 = App.PopUpAlert().position(x, y);
    single = (scope.$pageid == "mblog") ? true : false;
    var requestURL;
    var sText;
    if (scope.$feedtype == "isat") {
        requestURL = "/myat/delete.php";
        sText = $CLTMSG.CC2801
    } else {
        requestURL = "/mblog/delete.php";
        sText = $CLTMSG.CC2802
    }
    var cb = function (json) {
        if (single) {
            setTimeout(function () {
                location.href = "/mymblog.php"
            }, 400);
            return
        }
        setTimeout(function () {
            var feed = $E("mid_" + id);
            App.Wipe(null, feed).wipe("down", false, function () {
                var oid;
                if (App.refurbishUpdate && !(/\/atme/.test(window.location + ""))) {
                    App.refurbishUpdate.add(-1)
                }
                feed.parentNode.parentNode.removeChild(feed.parentNode)
            })
        }, 10)
    };
    var oData = {
        mid: id
    };
    var ecb = function (json) {
        if (json && json.code) {
            if (json.code == "M00009") {
                json.code = "M01160"
            }
            alert1.content(App.getMsg(json.code)).position(x, y + 22).icon(1).wipe("up").lateClose(1500)
        }
    };
    alert.content(sText).icon(4).yes(function () {
        if (!scope.loginKit().isLogin) {
            App.ModLogin({
                func: function () {
                    Core.Events.fireEvent(el, "click")
                }
            });
            return
        }
        App.doRequest(oData, requestURL, cb, ecb, "get")
    }).wipe("up", true)
};
App.attention = function (uid, el) {
    App.rightSideFollow(uid, el, function () {
        location.reload()
    });
    return false
};
App.attentionAll = function (uids, btn) {
    url = "/attention/aj_addfollow.php";
    uids = scope.recommendId || uids;

    function cb() {
        for (var i = 0, len = uids.length, uid; uid = uids[i]; i++) {
            var el = $E("recomm_" + uid);
            if (el) {
                var a = el.getElementsByTagName("a")[0];
                if (a) {
                    var newDom = document.createElement("SPAN");
                    newDom.innerHTML = $CLTMSG.CD0004;
                    el.replaceChild(newDom, a)
                }
            }
        }
        $E("attAllBtn").style.visibility = "hidden";
        location.reload()
    }
    App.followOperation({
        uid: uids.join(","),
        fromuid: scope.$uid
    }, url, cb);
    return false
};
$registJob("recommuser", function () {
    var uids = scope.recommendId;
    if (uids) {
        var url = "attention/aj_checkattention.php";
        var param = {
            uid: uids.join(",")
        };
        var cb = function (data, josn) {
            var data = josn.uid;
            for (var i = 0, len = data.length; i < len; i++) {
                var el = $E("recomm_" + data[i]);
                if (el) {
                    var a = el.getElementsByTagName("a")[0];
                    if (a) {
                        var newDom = document.createElement("SPAN");
                        newDom.innerHTML = $CLTMSG.CD0004;
                        el.replaceChild(newDom, a)
                    }
                }
            }
        };
        App.doRequest(param, url, cb)
    }
});
App.focusEditor = function () {
    location.hash = "fbq";
    $E("publish_editor").focus();
    return false
};
(function (proxy) {
    proxy.hover = function (el, hoverFun, outerFun) {
        var cls = el.className;
        var css = el.style.cssText;
        Core.Events.addEvent(el, function () {
            hoverFun(el)
        }, "mouseover");
        if (!outerFun || typeof outerFun != "function") {
            Core.Events.addEvent(el, function () {
                el.className = cls;
                el.style.cssText = css
            }, "mouseout")
        } else {
            Core.Events.addEvent(el, function () {
                outerFun(el)
            }, "mouseout")
        }
    }
})(App);
Core.String.toInt = function (str, i) {
    return parseInt(str, i)
};
App.addfavorite_miniblog = function (s_mid) {
    var event = Core.Events.getEvent();
    var target = event ? (event.srcElement || event.target) : null;
    var pos = Core.Dom.getXY(target);
    var x = pos[0] - ((200 - target.offsetWidth) / 2);
    var y = pos[1] - (target.offsetHeight) - 47;
    var alert = App.PopUpAlert().position(x, y);
    if (s_mid == "" || s_mid == null) {
        return false
    }
    if (!scope.loginKit().isLogin) {
        App.ModLogin({
            func: function () {
                Core.Events.fireEvent(target, "click")
            }
        });
        return
    }
    if (scope.$cuser_status === "nofull") {
        App.finishInformation();
        return false
    }
    Utils.Io.Ajax.request("/favorite/aj_add.php", {
        POST: {
            mid: s_mid
        },
        onComplete: function (json) {
            var _alert;
            if (json) {
                if (json.code == "A00006" || json.code == "M10001") {
                    var rn = $C("strong");
                    rn.innerHTML = $CLTMSG.CL0911;
                    document.body.appendChild(rn);
                    Core.Dom.replaceNode(rn, target.parentNode);
                    setTimeout(function () {
                        alert.content($SYSMSG.M10010).icon(3).wipe("up", true).lateClose(1500)
                    }, 200)
                } else {
                    setTimeout(function () {
                        var fix = 0;
                        if (json.code == "M02019") {
                            fix = -15
                        }
                        alert.content(App.getMsg(json.code)).position(x, y + fix).icon(1).wipe("up", true).lateClose(1500)
                    }, 200)
                }
            } else {
                alert.content(App.getMsg(json.code)).icon(2).wipe("up", true).lateClose(1500)
            }
        },
        onException: function (json) {
            if (typeof json == "object" && json.code) {
                alert.content(App.getMsg(json.code)).icon(2).wipe("up", true).lateClose(1500)
            } else {
                alert.content($CLTMSG.CC0801).icon(2).wipe("up", true).lateClose(1500)
            }
        },
        returnType: "json"
    })
};
App.deletefavorite_miniblog = function (s_mid) {
    var event = Core.Events.getEvent();
    var target = event ? (event.srcElement || event.target) : null;
    var pos = Core.Dom.getXY(target);
    var x = pos[0] - ((200 - target.offsetWidth) / 2);
    var y = pos[1] - (target.offsetHeight) - 70;
    var alert = App.PopUpConfirm().position(x, y);
    var alert1 = App.PopUpAlert().position(x, y);
    if (s_mid == "" || s_mid == null) {
        return false
    }
    var getTarget = function () {
        var oEvent = Core.Events.getEvent();
        var oTarget = oEvent.srcElement || oEvent.target;
        while (oTarget.nodeType != 1) {
            oTarget = oTarget.parentNode
        }
        return oTarget
    };
    var element_li = getTarget();
    while (element_li.tagName.toLowerCase() != "li") {
        element_li = element_li.parentNode
    }
    alert.content($CLTMSG.CC0802).icon(4).yes(function () {
        if (!scope.loginKit().isLogin) {
            App.ModLogin({
                func: function () {
                    Core.Events.fireEvent(target, "click")
                }
            });
            return
        }
        deletefav(element_li)
    }).wipe("up", true);
    var deletefav = function (el) {
        var o_displaynone, o_dotline;
        var o_emcount = $E("feed_title").getElementsByTagName("em").length > 0 ? $E("feed_title").getElementsByTagName("em")[0] : null;
        var s_url = "/favorite/aj_delete.php";
        Utils.Io.Ajax.request(s_url, {
            POST: {
                mid: s_mid
            },
            onComplete: function (json) {
                if (json) {
                    if (json.code == "A00006") {
                        App.Wipe(null, el).wipe("down", false, function () {
                            el.parentNode.parentNode.removeChild(el.parentNode)
                        });
                        o_emcount.innerHTML = (Core.String.toInt(o_emcount.innerHTML) - 1).toString();
                        var len = $E("feed_list").getElementsByTagName("li").length;
                        if (len <= 1) {
                            window.location.reload(true)
                        }
                    } else {
                        alert1.content(App.getMsg(json.code)).wipe("up", true).icon(1).lateClose(1500)
                    }
                } else {
                    alert1.content($CLTMSG.CC0701).wipe("up", true).icon(1).lateClose(1500)
                }
            },
            onException: function (json) {
                if (json && json.code) {
                    alert1.content(App.getMsg(json.code)).wipe("up", true).icon(1).lateClose(1500)
                } else {
                    alert1.content($CLTMSG.CC0701).wipe("up", true).icon(1).lateClose(1500)
                }
            },
            returnType: "json"
        })
    }
};
App.modrecommended = function (forwardName, recommendedurl, fid, content, uid, el, exid, forwardContent, uname) {
    if (!scope.loginKit().isLogin) {
        location.replace("/login.php?url=" + encodeURIComponent(location.href));
        return false
    }
    if (scope.$cuser_status === "nofull" && scope.$uid !== "") {
        App.finishInformation();
        return false
    }
    var appendurl;
    if (recommendedurl) {
        appendurl = recommendedurl
    } else {
        appendurl = window.location.href
    }
    var checkAT = function (content, name) {
        if ((new RegExp("(@|＠)" + name + "([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(content)) {
            return true
        } else {
            return false
        }
    };
    var forwardContentFinal = "";
    var testForwardName = decodeURIComponent(forwardName);
    var testForwardContent = decodeURIComponent(forwardContent);
    var defaultTxt = $CLTMSG.CD0045.replace(/#\{name\}/, testForwardName);
    if (forwardContent == "" || forwardContent === undefined) {
        forwardContentFinal = defaultTxt
    } else {
        forwardContentFinal = " //@" + testForwardName + ":" + testForwardContent
    }
    var title = $CLTMSG.CD0046.replace(/#\{name\}/, testForwardName);
    var loginStr = '<div class="shareLogin">                    	<div id="loginerror"></div>						<em>' + $CLTMSG.CD0039 + ' </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="text" id="logintitle" class="inputType"  style="width: 100px;"/></span></span>                        <em>' + $CLTMSG.CD0041 + '</em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="password" id="loginpwd" class="inputType" style="width: 100px;"/></span></span>                    	<div class="clear"></div>                    </div>';
    loginStr = scope.$uid ? "" : loginStr;
    var html = '			   <div class="shareLayer" id="recommendedcontent">                    <div class="shareTxt" id="recommendedcontent">' + $CLTMSG.CD0047 + ':</div>					<div id="recommendedInfoBox" style="float:right;margin-right:13px;color:#008800"></div>                    <textarea class="PY_textarea" id="mdrecommendedtextarea" >' + forwardContentFinal + "</textarea>" + loginStr + '<div class="layerBtn">                 		<a href="javascript:void(0);" id="mdrecommendedbtn" class="btn_normal"><em>' + $CLTMSG.CD0048 + '</em></a><a href="javascript:void(0)" id="mdrecommendedcancel" class="btn_normal"><em>' + $CLTMSG.CD0005 + "</em></a>                 </div>                </div>";
    var cfg = {
        width: 390,
        zIndex: 1000,
        hidden: true
    };
    var dialog = new App.Dialog.BasicDialog(title, html, cfg);
    var mdforwardtextarea = $E("mdrecommendedtextarea");
    var tipStringOK = $CLTMSG.CD0033;
    var tipStringErr = $CLTMSG.CD0034;
    var forwardInputLimit = function () {
        var num = Math.ceil(Core.String.byteLength(Core.String.trim(mdforwardtextarea.value)) / 2);
        if (num > 100) {
            $E("recommendedInfoBox").innerHTML = tipStringErr.replace(/\$\{num\}/, (maxlen / 2 - num) * (-1));
            $E("recommendedInfoBox").style.color = "#880000";
            return false
        } else {
            $E("recommendedInfoBox").innerHTML = tipStringOK.replace(/\$\{num\}/, (maxlen / 2 - num));
            $E("recommendedInfoBox").style.color = "#008800";
            return true
        }
    };
    if (el) {
        App.doFlyOut(el, dialog._node, {
            resFun: function () {
                try {
                    dialog.show();
                    $E("mdrecommendedtextarea").focus();
                    if ($IE) {} else {
                        $E("mdrecommendedtextarea").setSelectionRange(0, 0)
                    }
                    forwardInputLimit()
                } catch (e) {}
            },
            style: "border:#000 2px solid;background:#bad;opacity:0.2;filter:alpha(opacity=20);zoom:1",
            time: 0.5
        })
    } else {
        dialog.show();
        $E("mdrecommendedtextarea").focus();
        setTimeout(forwardInputLimit, 1)
    }
    var url = "/mblog/publish.php";
    var mdforwardbtn = $E("mdrecommendedbtn");
    var maxlen = 200;
    App.autoHeightTextArea(mdforwardtextarea, function () {
        setTimeout(forwardInputLimit, 1)
    }, 145);
    var loginerror = $E("loginerror");
    var disClass = "btn_notclick";
    var enableClass = "btn_normal";
    var name = $E("logintitle");
    var pwd = $E("loginpwd");
    var options = {
        zIndex: 1010,
        ref: name,
        wrap: loginerror,
        offsetY: -1,
        offsetX: 30
    };
    var mdforwardtextareaonfocus = function () {};
    mdforwardtextarea.onblur = function () {
        if (mdforwardtextarea.value == "") {
            mdforwardtextarea.value = defaultTxt
        }
    };
    mdforwardtextarea.onkeydown = function (event) {
        event = event || window.event;
        if (event.keyCode == 13 && event.ctrlKey) {
            mdforwardbtn.onclick()
        }
    };
    $E("mdrecommendedcancel").onclick = function () {
        dialog.close();
        return false
    };

    function forwardSuccess() {
        var reason = mdforwardtextarea.value = Core.String.leftB(mdforwardtextarea.value, maxlen);
        var postdata = {
            content: reason.indexOf("@" + testForwardName) != -1 ? reason.replace(/'@'+testForwardName/gi, "@" + testForwardName + " ").replace(/\uff20/ig, "@") + " " + appendurl : (reason + " @" + testForwardName).replace(/\uff20/ig, "@") + " " + appendurl,
            from: scope["$pageid"],
            styleid: 1,
            retcode: scope.doorretcode || ""
        };
        if (scope.$pageid == "search") {
            postdata.from = "search"
        }
        if ((scope.$pageid == "myprofile" || scope.$pageid == "search") && scope.$feedtype != "isori") {
            postdata.isindex = 1
        }
        var cb = function (data, json) {
            dialog.close();
            var cbdia = App.alert($CLTMSG.CX0032, {
                icon: 3,
                ok: function () {
                    if (!scope.$uid) {
                        location.reload()
                    }
                },
                hasBtn: false
            });
            var itv = setTimeout(function () {
                try {
                    cbdia && (cbdia.close());
                    if (!scope.$uid) {
                        location.reload()
                    }
                } catch (e) {}
            }, 1000);
            if (scope.$uid == scope.$oid && data && data.html) {
                cbdia.onClose = function () {
                    if (itv) {
                        clearTimeout(itv);
                        itv = null
                    }
                    var feedlist = $E("feedlistwrap");
                    if (App.refurbishUpdate) {
                        App.refurbishUpdate.add(1)
                    }
                    if (feedlist) {
                        if (scope.$feedtype == "isat") {
                            if (uname) {
                                if (!checkAT(postdata.reason, uname)) {
                                    return false
                                }
                            }
                        }
                        Core.Dom.insertHTML(feedlist, data.html, "AfterBegin")
                    }
                }
            }
            var num = $E(exid);
            if (num) {
                var count = num.innerHTML.match(/\d+/) || 0;
                num.innerHTML = "(" + (parseInt(count) + 1) + ")";
                num.style.display = ""
            }
        };
        var ecb = function (json) {
            mdforwardbtn.className = enableClass;
            if (json.code === "MR0050") {
                App.forbidrefresh(function () {
                    Core.Events.fireEvent(mdforwardbtn, "click")
                }, url);
                return false
            }
            App.alert(json, {
                ok: function () {
                    if (!scope.loginKit().isLogin) {
                        location.reload()
                    }
                },
                hasBtn: true
            })
        };
        App.doRequest(postdata, url, cb, ecb)
    }
    function errortTip(str, el) {
        el.focus();
        App.fixElement.setHTML(str, "", options);
        mdforwardbtn.className = enableClass;
        return false
    }
    if (!scope.loginKit().isLogin) {
        passcardOBJ.init(name, {
            overfcolor: "#999",
            overbgcolor: "#e8f4fc",
            outfcolor: "#000000",
            outbgcolor: ""
        }, pwd, window);
        App.initLoginInput(name)
    }
    mdforwardbtn.onclick = function () {
        if (!forwardInputLimit()) {
            var orbit = ["#fff", "#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff", "#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff"];
            var index = 0;
            var hook = App.timer.add(function () {
                if (index / 2 >= orbit.length) {
                    App.timer.remove(hook);
                    return false
                }
                mdforwardtextarea.style.backgroundColor = orbit[index / 2];
                index += 1
            });
            return false
        }
        if (mdforwardbtn.className == disClass) {
            return false
        }
        mdforwardbtn.className = disClass;
        if (scope.loginKit().isLogin) {
            forwardSuccess()
        } else {
            App.ModLogin(function () {
                forwardSuccess
            })
        }
        return false
    };
    App.enterSubmit({
        parent: "forwardcontent",
        action: function () {
            mdforwardbtn.onclick()
        }
    })
};
Core.Array.isArray = function (o) {
    return Object.prototype.toString.call(o) === "[object Array]"
};
$registJob("group_option", function () {
    if (!scope.groupList || scope.groupList.length == 0) {
        return
    }
    var _li_myprofile = $E("li_myprofile");
    var _addevent = Core.Events.addEvent;
    var _showgroups = $E("showgroups");
    var _addEvent = Core.Events.addEvent
});
App.groupshow_index = function (el) {
    var ul_group = $E("ul_group");
    if (el.innerHTML.indexOf("&gt;") >= 0 || el.innerHTML.indexOf(">") >= 0) {
        el.innerHTML = "&lt;";
        ul_group.style.display = "none";
        Utils.Cookie.setCookie("gopen", "0", 24 * 7, false, "t.sina.com.cn", false)
    } else {
        el.innerHTML = "&gt;";
        ul_group.style.display = "";
        Utils.Cookie.setCookie("gopen", "1", 24 * 7, false, "t.sina.com.cn", false)
    }
};
App.group_option = function () {
    if (!scope.groupList || scope.groupList.length == 0) {
        return false
    }
    var _glist = scope.groupList;
    var _html = function () {
        var _head = '<div id="group_options" class = "shareLayer"><div class="shareTxt">' + $CLTMSG.CC1101 + "</div>";
        var _middle = "";
        if (_glist.length > 0) {
            _middle = '<ul class="group_list">'
        }
        for (var i = 0; i < _glist.length; i++) {
            _middle += '<li><input type="checkbox" value="' + _glist[i].gid + '" name="groupoption" class="labelbox" id="input' + i + '"' + (_glist[i].display == "1" ? "checked" : "") + '/><label for="input' + i + '">' + _glist[i].name + "</label></p>"
        }
        if (_glist.length > 0) {
            _middle += "</ul>"
        }
        var _tail = '<div class="MIB_btn"><a id="group_submit" href="javascript:void(0)" class="btn_normal"><em>' + $CLTMSG.CD0155 + '</em></a><a id="group_cancel" href="javascript:void(0)" class="btn_normal"><em>' + $CLTMSG.CD0153 + "</em></a></div></div>";
        return _head + _middle + _tail
    };
    var _dialog = new App.Dialog.BasicDialog($CLTMSG.CC1104, _html(), {
        zIndex: 1200,
        hidden: true
    });
    var _addEvent = Core.Events.addEvent;
    var _gsubmit = $E("group_submit");
    var _gcancel = $E("group_cancel");
    var _group_options = $E("group_options");
    var _getparams = function () {
        return App.htmlToJson(_group_options)
    };
    var url = "/attention/aj_group_setdisplay.php";
    var cb = function () {
        _dialog.close();
        window.location.reload()
    };
    var ecb = function (json) {
        _dialog.close();
        if (json) {
            App.alert({
                code: json.code
            })
        } else {
            App.alert({
                code: "R01404"
            })
        }
    };
    _dialog.show();
    var _submitevent = function () {
        var group = _getparams();
        var params = {
            gids: Core.Array.isArray(group.groupoption) ? group.groupoption.join(",") : group.groupoption
        };
        App.doRequest(params, url, cb, ecb)
    };
    _addEvent(_gsubmit, function () {
        _submitevent()
    }, "click");
    _addEvent(_gcancel, function () {
        _dialog.close()
    }, "click");
    var oScript = document.createElement("script");
    oScript.src = "http://hits.sinajs.cn/c.html?action=groupshow&uid=" + scope.$uid;
    document.body.appendChild(oScript)
};
App.group_interface = {};
(function (proxy) {
    proxy.create = function (spec) {
        Utils.Io.Ajax.request("/attention/aj_group_create.php", {
            POST: {
                name: spec.name
            },
            onComplete: function (json) {
                if (json.code == "A00006") {
                    spec.onSuccess(json.data);
                    return true
                }
                spec.onError(json);
                return false
            },
            onException: function () {},
            returnType: "json"
        })
    };
    proxy.del = function (spec) {
        Utils.Io.Ajax.request("/attention/aj_group_delete.php", {
            POST: {
                gid: spec.id
            },
            onComplete: function (json) {
                if (json.code == "A00006") {
                    spec.onSuccess(json.data);
                    return true
                }
                spec.onError(json);
                return false
            },
            onException: function () {},
            returnType: "json"
        })
    };
    proxy.rename = function (spec) {
        Utils.Io.Ajax.request("/attention/aj_group_rename.php", {
            POST: {
                name: spec.name,
                gid: spec.id
            },
            onComplete: function (json) {
                if (json.code == "A00006") {
                    spec.onSuccess(json.data);
                    return true
                }
                spec.onError(json);
                return false
            },
            onException: function () {},
            returnType: "json"
        })
    };
    proxy.list = function () {
        return scope.groupList
    };
    proxy.add = function (spec) {
        if (spec.group_id instanceof Array) {
            spec.group_id = spec.group_id.join(",")
        }
        var params = {
            action: "add",
            gids: spec.group_id
        };
        if (spec.person_id) {
            params.fuid = spec.person_id
        }
        if (spec.person_name) {
            params.pname = spec.person_name
        }
        Utils.Io.Ajax.request("/attention/aj_group_update.php", {
            POST: params,
            onComplete: function (json) {
                if (json.code == "A00006") {
                    spec.onSuccess(json.data);
                    return true
                }
                spec.onError(json);
                return false
            },
            onException: function () {
                spec.onError()
            },
            returnType: "json"
        })
    };
    proxy.addAll = function (spec) {
        if (spec.group_id instanceof Array) {
            spec.group_id = spec.group_id.join(",")
        }
        var params = {
            gids: spec.group_id
        };
        if (spec.person_id) {
            params.fuid = spec.person_id
        }
        if (spec.person_name) {
            params.pname = spec.person_name
        }
        Utils.Io.Ajax.request("/attention/aj_group_update.php", {
            POST: params,
            onComplete: function (json) {
                if (json.code == "A00006") {
                    spec.onSuccess(json.data);
                    return true
                }
                spec.onError(json);
                return false
            },
            onException: function () {
                spec.onError()
            },
            returnType: "json"
        })
    };
    proxy.remove = function (spec) {
        if (spec.group_id instanceof Array) {
            spec.group_id = spec.group_id.join(",")
        }
        Utils.Io.Ajax.request("/attention/aj_group_update.php", {
            POST: {
                fuid: spec.person_id,
                gids: spec.group_id,
                action: "delete"
            },
            onComplete: function (json) {
                if (json.code == "A00006") {
                    spec.onSuccess(json.data);
                    return true
                }
                spec.onError(json);
                return false
            },
            onException: function () {
                spec.onError()
            },
            returnType: "json"
        })
    }
})(App.group_interface);
(function (proxy) {
    var actionList = {};
    proxy.group_manage = {};
    var register = function (key, onSuccess, params) {
        actionList[key].push({
            onSuccess: onSuccess,
            params: params
        })
    };
    var action = function (key, data, spec) {
        for (var i = 0, len = actionList[key].length; i < len; i += 1) {
            try {
                var act = actionList[key][i];
                act.onSuccess(data, spec, act.params)
            } catch (exp) {}
        }
    };
    for (var k in App.group_interface) {
        actionList[k] = [];
        proxy.group_manage[k] = (function (p) {
            return function (spec) {
                spec = spec || {};
                spec.onSuccess = function (data) {
                    try {
                        action(p, data, spec)
                    } catch (e) {}
                    spec.success(data)
                };
                return App.group_interface[p](spec)
            }
        })(k)
    }
    proxy.group_manage.register = register
})(App);
App.group_manage.register("create", function (json, params) {
    scope.groupList.push({
        gid: json,
        name: Core.String.encodeHTML(params.name),
        count: 0
    })
}, {});
App.group_manage.register("del", function (json, params) {
    for (var i = 0, len = scope.groupList.length; i < len; i += 1) {
        if (scope.groupList[i]["gid"] == params.id) {
            scope.groupList.splice(i, 1);
            return false
        }
    }
}, {});
App.group_manage.register("rename", function (json, params) {
    for (var i = 0, len = scope.groupList.length; i < len; i += 1) {
        if (scope.groupList[i]["gid"] == params.id) {
            scope.groupList[i]["name"] = Core.String.encodeHTML(params.name)
        }
    }
}, {});
App.group_manage.register("add", function (json, params) {
    for (var i = 0, len = scope.groupList.length; i < len; i += 1) {
        if (scope.groupList[i]["gid"] == params.group_id) {
            scope.groupList[i]["count"] = parseInt(scope.groupList[i]["count"]) + 1
        }
    }
}, {});
App.group_manage.register("remove", function (json, params) {
    for (var i = 0, len = scope.groupList.length; i < len; i += 1) {
        if (scope.groupList[i]["gid"] == params.group_id) {
            scope.groupList[i]["count"] = parseInt(scope.groupList[i]["count"]) - 1
        }
    }
}, {});
App.group_manage.register("addAll", function (json, params) {
    for (var i = 0, len = scope.groupList.length; i < len; i += 1) {
        if (scope.groupList[i]["gid"] == params.group_id) {
            scope.groupList[i]["count"] = parseInt(scope.groupList[i]["count"]) + 1
        }
    }
}, {});
App.groupSideBar = {};
$registJob("group_sidebar", function () {
    var defaultGroupName = $CLTMSG.CC1304;
    var groupEditor = (function () {
        var spec = {};
        var that = {};
        var template = [{
            tagName: "INPUT",
            attributes: {
                type: "text",
                "class": "lf PY_input",
                id: "input"
            }
        },
        {
            tagName: "A",
            attributes: {
                href: "javascript:void(0);",
                "class": "btn_normal btnxs",
                id: "submit"
            }
        },
        {
            tagName: "A",
            attributes: {
                href: "javascript:void(0);",
                innerHTML: $CLTMSG.CC1103,
                id: "cancel"
            }
        },
        {
            tagName: "P",
            attributes: {
                id: "info",
                "class": "error_color",
                innerHTML: $CLTMSG.CC1303,
                style: "display:none"
            }
        }];
        var editor = new App.Builder(template);
        spec.type = "add";
        spec.perch = null;
        spec.submit = function () {};
        spec.cancel = function () {};
        spec.lock = false;
        editor.domList.input.style.color = "#666666";
        Core.Events.addEvent(editor.domList.submit, function () {
            if (spec.lock) {
                return false
            }
            spec.submit()
        }, "click");
        Core.Events.addEvent(editor.domList.cancel, function () {
            spec.lock = false;
            spec.cancel()
        }, "click");
        Core.Events.addEvent(editor.domList.input, function (e) {
            if (e.keyCode === 13) {
                if (spec.lock) {
                    return false
                }
                spec.submit()
            }
        }, "keypress");
        Core.Events.addEvent(editor.domList.input, function (e) {
            if (editor.domList.input.value === "") {
                editor.domList.input.value = $CLTMSG.CC1304
            }
        }, "blur");
        Core.Events.addEvent(editor.domList.input, function (e) {
            if (editor.domList.input.value === $CLTMSG.CC1304) {
                editor.domList.input.value = ""
            }
        }, "focus");
        that.show = function (value) {
            editor.box.style.display = "";
            spec.perch.style.display = "none";
            editor.domList.input.value = value || defaultGroupName;
            editor.domList.info.style.display = "none";
            spec.lock = false;
            return that
        };
        that.type = function (type) {
            spec.type = type;
            if (type == "add") {
                editor.box.className = "packet3";
                editor.domList.submit.innerHTML = "<em>" + $CLTMSG.CC1401 + "</em>";
                return that
            }
            if (type == "rename") {
                editor.box.className = "packet3";
                editor.domList.submit.innerHTML = "<em>" + $CLTMSG.CC1402 + "</em>";
                return that
            }
            return that
        };
        that.hidd = function () {
            editor.box.style.display = "none";
            if (spec.perch) {
                spec.perch.style.display = ""
            }
            spec.lock = false;
            return that
        };
        that.perch = function (perch) {
            if (perch) {
                perch.parentNode.insertBefore(editor.box, perch)
            }
            if (spec.perch) {
                spec.perch.style.display = ""
            }
            if (perch && spec.perch) {
                perch.style.display = spec.perch.style.display
            }
            spec.perch = perch;
            return that
        };
        that.get = function (key) {
            if (key == "value") {
                return editor.domList.input.value
            }
        };
        that.set = function (key, value) {
            spec[key] = value;
            return that
        };
        that.showError = function (key) {
            editor.domList.info.innerHTML = $SYSMSG[key];
            editor.domList.info.style.display = ""
        };
        that.hiddError = function () {
            editor.domList.info.style.display = "none"
        };
        return that
    })();
    var sidebarItem = function (spec) {
        var that = {};
        var template = [{
            tagName: "SPAN",
            attributes: {
                "class": "tagName"
            },
            childList: [{
                tagName: "A",
                attributes: {
                    id: "link"
                }
            },
            {
                tagName: "SPAN",
                attributes: {
                    id: "count",
                    "class": "MIB_txtbr f10"
                }
            }]
        }];
        var box = document.createElement("LI");
        var item = new App.Builder(template, box);
        var showName = Core.String.decodeHTML(spec.name);
        item.domList.link.title = showName;
        if (Core.String.byteLength(showName) > 12) {
            showName = Core.String.leftB(showName, 12) + "…"
        }
        item.domList.link.innerHTML = Core.String.encodeHTML(showName);
        item.domList.link.href = "/attention/att_list.php?&gid=" + spec.id;
        item.domList.count.innerHTML = "(" + spec.count + ")";
        item.domList.edit.onclick = function () {
            App.groupSideBar.rename(item.domList.edit, spec.id, Core.String.decodeHTML(spec.name))
        };
        box.setAttribute("gid", spec.id);
        that = item;
        return that
    };
    var checkNewName = function (name) {
        if (Core.String.byteLength(name) > 16) {
            groupEditor.showError("M14010");
            return false
        }
        if (name == defaultGroupName || name == "") {
            groupEditor.showError("M14014");
            return false
        }
        for (var i = 0, len = scope.groupList.length; i < len; i += 1) {
            if (Core.String.decodeHTML(scope.groupList[i]["name"]) == name) {
                groupEditor.showError("M14008");
                return false
            }
        }
        groupEditor.hiddError();
        return true
    };
    var createGroup = function () {
        var value = Core.String.trim(groupEditor.get("value"));
        if (checkNewName(value)) {
            if (!value) {
                return false
            }
            groupEditor.set("lock", true);
            App.group_manage.create({
                name: value,
                success: function (json) {
                    groupEditor.hidd();
                    setTimeout(function () {
                        window.location.href = "/attention/att_list.php?uid=" + scope.$uid + "&gid=" + json
                    }, 500);
                    groupEditor.set("lock", false)
                },
                onError: function (json) {
                    groupEditor.set("lock", false);
                    App.alert($SYSMSG[json.code])
                }
            });
            return true
        }
        return false
    };
    App.groupSideBar.add = function () {
        groupEditor.perch($E("group_sidebar_add_box")).type("add").show("").set("submit", createGroup).set("cancel", groupEditor.hidd)
    };
    var renameGroup = function (dom, id) {
        var value = Core.String.trim(groupEditor.get("value"));
        if (checkNewName(value)) {
            groupEditor.set("lock", true);
            App.group_manage.rename({
                name: value,
                id: id,
                success: groupEditor.hidd,
                onerror: function () {
                    groupEditor.set("lock", false)
                }
            });
            return true
        }
        return false
    };
    App.groupSideBar.rename = function (dom, id, name) {
        try {
            name = decodeURIComponent(name)
        } catch (e) {
            name = decodeURIComponent(name.toString().replace(/%/g, "#")).replace(/#/g, "%")
        }
        groupEditor.perch(dom.parentNode.parentNode).type("rename").show(name).set("submit", function () {
            if (Core.String.trim(groupEditor.get("value")) == name) {
                groupEditor.hidd();
                return false
            }
            renameGroup(dom, id)
        }).set("cancel", groupEditor.hidd)
    };
    App.group_manage.register("create", function (json, params) {
        var _html = [];
        _html.push('<span class="tagName attMax">');
        _html.push('<a href="/attention/att_list.php?gid=' + json + '" title="' + params.name + '" class="attName">' + params.name + '</a> <span class="attNum MIB_txtbr f10">(0)</span>');
        _html.push("</span>");
        var _item = $C("li");
        _item.setAttribute("gid", json);
        _item.innerHTML = _html.join("");
        $E("group_sidebar_list").appendChild(_item);
        if (scope.groupList.length >= 20) {
            setTimeout(function () {
                $E("group_sidebar_add_box").style.display = "none"
            }, 0)
        }
    }, {});
    App.group_manage.register("rename", function (json, params) {
        var count = 0;
        for (var i = 0, len = scope.groupList.length; i < len; i += 1) {
            if (scope.groupList[i]["gid"] == params.id) {
                count = scope.groupList[i]["count"]
            }
        }
        var item = sidebarItem({
            id: params.id,
            name: Core.String.encodeHTML(params.name),
            count: count
        });
        var lis = $E("group_sidebar_list").getElementsByTagName("LI");
        for (var i = 0, len = lis.length; i < len; i += 1) {
            if (lis[i].getAttribute("gid") == params.id) {
                var per = lis[i];
                $E("group_sidebar_list").insertBefore(item.box, per);
                $E("group_sidebar_list").removeChild(per);
                if (params.id == scope.groupCurrentId) {
                    item.box.className = "cur MIB_txtar";
                    var groupName = document.createTextNode(params.name);
                    item.domList.link.parentNode.insertBefore(groupName, item.domList.link);
                    item.domList.link.parentNode.removeChild(item.domList.link)
                }
                break
            }
        }
    }, {});
    App.group_manage.register("add", function (json, params) {
        var lis = $E("group_sidebar_list").getElementsByTagName("LI");
        for (var i = 0, len = lis.length; i < len; i += 1) {
            if (lis[i].getAttribute("gid") == params.group_id) {
                var el = lis[i].getElementsByTagName("SPAN")[1];
                el.innerHTML = "(" + (parseInt(el.innerHTML.slice(1, -1)) + 1) + ")"
            }
        }
    }, {});
    App.group_manage.register("remove", function (json, params) {
        var lis = $E("group_sidebar_list").getElementsByTagName("LI");
        for (var i = 0, len = lis.length; i < len; i += 1) {
            if (lis[i].getAttribute("gid") == params.group_id) {
                var el = lis[i].getElementsByTagName("SPAN")[1];
                el.innerHTML = "(" + (parseInt(el.innerHTML.slice(1, -1)) - 1) + ")"
            }
        }
    }, {});
    if ($E("group_sidebar_list")) {
        var lis = $E("group_sidebar_list").getElementsByTagName("LI");
        for (var i = 1, len = lis.length; i < len; i += 1) {
            lis[i].onmouseover = (function (box) {
                return function () {}
            })(lis[i]);
            lis[i].onmouseout = (function (box) {
                return function () {}
            })(lis[i])
        }
    }
});
$registJob("paging", function () {
    var oPopup = $E("page_div");
    if (oPopup) {
        document.body.appendChild(oPopup);
        var oButton = $E("paging_popup");
        var displayKey = false;
        var DELAY = 300;
        var show = function () {
            if (oPopup.style.display == "none" && displayKey) {
                var position = Core.Dom.getXY(oButton);
                position[1] -= (oButton).offsetHeight;
                oPopup.style.left = position[0] + ("v" == "\v" ? -2 : 0) + "px";
                oPopup.style.top = position[1] + 23 + "px";
                oPopup.style.display = "";
                oPopup.style.top = parseInt(oPopup.style.top) - oPopup.offsetHeight + "px"
            }
        };
        var hidd = function () {
            if (oPopup.style.display == "" && !displayKey) {
                oPopup.style.display = "none"
            }
        };
        Core.Events.addEvent(oButton, function (e) {
            Core.Events.stopEvent(e);
            if (!displayKey) {
                setTimeout(show, DELAY);
                displayKey = true
            }
        }, "mouseover");
        Core.Events.addEvent(oButton, function (e) {
            Core.Events.stopEvent(e);
            if (displayKey) {
                setTimeout(hidd, DELAY);
                displayKey = false
            }
        }, "mouseout");
        Core.Events.addEvent(oPopup, function (e) {
            Core.Events.stopEvent(e);
            if (!displayKey) {
                setTimeout(show, DELAY);
                displayKey = true
            }
        }, "mouseover");
        Core.Events.addEvent(oPopup, function (e) {
            Core.Events.stopEvent(e);
            if (displayKey) {
                setTimeout(hidd, DELAY);
                displayKey = false
            }
        }, "mouseout")
    }
});
$registJob("maybeconcern_index", function () {
    var _div = $E("maybe_friens_container") || null;
    if (!_div) {
        return false
    }
    Utils.Io.Ajax.request("/person/aj_maybefriend.php", {
        GET: {},
        onComplete: function (json) {
            try {
                if (json.code == "A00006") {
                    if (Core.String.trim(json.data) != "") {
                        _div.innerHTML = json.data;
                        _div.className = "f_pro";
                        _div.style.display = ""
                    }
                } else {
                    _div.className = "";
                    _div.innerHTML = ""
                }
            } catch (exp2) {
                _div.className = "";
                _div.innerHTML = ""
            }
        },
        onException: function () {
            _div.className = "";
            _div.innerHTML = ""
        },
        returnType: "json"
    })
});
App.topic_recommend = function (el, topic) {
    var tpc = $E("cat_list");
    var div = $E("category");
    if (el && el.getElementsByTagName("EM").length > 0) {
        return false
    }
    if (tpc) {
        (function (cont) {
            var d = cont.getElementsByTagName("A");
            for (var i = 0; i < d.length; i++) {
                d[i].style.cssText = "";
                d[i].innerHTML = d[i].innerText || d[i].textContent
            }
        })(div);
        el.style.cssText = "cursor: text; text-decoration: none;";
        el.innerHTML = '<em class="MIB_txtar fb">' + el.innerHTML + "</em>";
        Utils.Io.Ajax.request("/public/get_cat_list.php", {
            GET: {
                cat_id: topic || ""
            },
            onComplete: function (json) {
                if (json.code == "A00006") {
                    tpc.innerHTML = json.data
                } else {
                    tpc.innerHTML = ""
                }
            },
            onException: function () {
                tpc.innerHTML = ""
            },
            returnType: "json"
        })
    }
};
$registJob("setBlessIcon", function () {});
scope._lock = false;
scope.setBlessIcon = function (cb) {
    if (!scope._lock) {
        scope._lock = true;
        var url = "/person/aj_light.php";
        App.doRequest({}, url, function (data, result) {
            scope._lock = false;
            if (typeof cb === "function") {
                cb(result)
            } else {
                callback(result)
            }
        }, function (result) {
            scope._lock = false;
            callback(result)
        }, "GET", "ajax");

        function callback(result) {
            var dialog, config = {
                icon: 2,
                width: 370,
                height: 120
            };
            if (result && result.code) {
                if (result.code === "A00006") {
                    config.icon = 3
                }
                dialog = App.alert($SYSMSG[result.code], config)
            } else {
                dialog = App.alert($CLTMSG.CD0092, config)
            }
            setTimeout(function () {
                if (dialog && !dialog._distory) {
                    dialog.close()
                }
            }, 2000)
        }
    }
};
Core.Dom.setXY = function (el, pos, noRetry) {
    var pos_style = Core.Dom.getStyle(el, "position");
    if (pos_style == "static") {
        Core.Dom.setStyle(el, "position", "relative");
        pos_style = "relative"
    }
    var page_xy = Core.Dom.getXY(el);
    if (page_xy == false) {
        return false
    }
    var delta = [parseInt(Core.Dom.getStyle(el, "left"), 10), parseInt(Core.Dom.getStyle(el, "top"), 10)];
    if (isNaN(delta[0])) {
        delta[0] = (pos_style == "relative") ? 0 : el.offsetLeft
    }
    if (isNaN(delta[1])) {
        delta[1] = (pos_style == "relative") ? 0 : el.offsetTop
    }
    if (pos[0] != null) {
        el.style.left = pos[0] - page_xy[0] + delta[0] + "px"
    }
    if (pos[1] != null) {
        el.style.top = pos[1] - page_xy[1] + delta[1] + "px"
    }
    return true
};
(function (proxy) {
    proxy.bigpop = function (spec) {
        spec.template = '<div class="PopLayer" id="bigpop" style="display:none;"><table class="Poptips"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div style="width: auto;" class="layerBoxCon1"><div class="PopInfo clearFix"><div class="Pop_close"><a id="popclose" class="close" href="javascript:void(0);"></a></div><div id="poptype" class="Poparrow"></div><div class="iconntent" id="popcontent"><div class="clearit"></div></div></div></div></div></td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table></div>';
        spec.view = new proxy.builder2(spec);
        var ifm = $C("IFRAME");
        ifm.frameBorder = "0";
        ifm.Border = "0";
        ifm.framespacing = "0";
        ifm.allowtransparency = true;
        spec.view.domList.bigpopifr = ifm;
        spec.view.domList.popcontent.innerHTML = spec.popcontent + spec.view.domList.popcontent.innerHTML;
        spec.view.domList.popclose.onclick = function () {
            that.clear = true;
            spec.view.domList.bigpop.style.display = "none";
            spec.view.domList.bigpopifr.style.display = "none";
            proxy.doRequest({
                type: spec.popfrom
            }, "/person/aj_closepop.php", function () {}, function () {})
        };
        spec.view.domList.bigpop.style.position = "absolute";
        spec.view.domList.bigpop.style.zIndex = "800";
        spec.view.domList.bigpopifr.style.position = "absolute";
        spec.view.domList.bigpopifr.style.zIndex = "600";
        spec.view.domList.bigpopifr.style.backgroundColor = "transparent";
        document.body.appendChild(spec.view.domList.bigpop);
        document.body.appendChild(spec.view.domList.bigpopifr);
        var that = {
            show: function () {
                that.clear = false;
                spec.view.domList.bigpop.style.display = "";
                spec.view.domList.bigpopifr.style.display = ""
            },
            hidd: function () {
                Core.Events.fireEvent(spec.view.domList.popclose, "click")
            },
            getWidth: function () {
                return spec.view.domList.bigpop.offsetWidth
            },
            getHeight: function () {
                return spec.view.domList.bigpop.offsetHeight
            },
            setPostion: function (pos) {
                Core.Dom.setXY(spec.view.domList.bigpop, pos);
                Core.Dom.setXY(spec.view.domList.bigpopifr, [pos[0] + 2, pos[1] + 2]);
                spec.view.domList.bigpopifr.width = spec.view.domList.bigpop.offsetWidth - 5;
                spec.view.domList.bigpopifr.height = spec.view.domList.bigpop.offsetHeight - 5
            },
            setType: function (type) {
                spec.view.domList.poptype.className = "Poparrow" + type
            },
            getRoot: function () {
                return spec.view.domList.bigpop
            }
        };
        return that
    }
})(App);
$registJob("bigpop", function () {
    try {
        var box = document.body;
        var l = box.getElementsByTagName("A");
        if (!scope.popalert || !scope.popid) {
            return false
        }
        var html = $SYSMSG[scope.popalert],
            tmp;
        if (Core.Dom.getElementsByAttr($E("pop_" + scope.popid), "pop", "true").length <= 0) {
            return false
        }
        tmp = Core.Dom.getElementsByAttr($E("pop_" + scope.popid), "pop", "true")[0];
        var checkTip = function (el, pop) {
            var param = {
                type: 4
            };
            var aXY = Core.Dom.getXY(el);
            var winsize = Core.System.winSize();
            var winscroll = Core.System.getScrollPos();
            var arrow = 10;
            param.popwidth = pop.offsetWidth;
            param.popHeight = pop.offsetHeight;
            param.position = new Array();
            if (aXY[0] + el.offsetWidth / 2 >= (winsize.width / 2 + winscroll[1])) {
                if (aXY[0] - param.popwidth - arrow - winscroll[1] > 0) {
                    param.type = 2;
                    param.position[0] = aXY[0] - param.popwidth - arrow;
                    param.position[1] = aXY[1] - ((pop.offsetHeight - el.offsetHeight) / 2);
                    return param
                }
                if (aXY[0] + el.offsetWidth + param.popwidth < winsize.width - winscroll[1] && aXY[0] + el.offsetWidth + param.popwidth > winscroll[1]) {
                    param.type = 4;
                    param.position[0] = aXY[0] + el.offsetWidth + arrow;
                    param.position[1] = aXY[1] - ((pop.offsetHeight - el.offsetHeight) / 2);
                    return param
                }
            } else {
                if (aXY[0] - param.popwidth - arrow - winscroll[1] > 0) {
                    param.type = 2;
                    param.position[0] = aXY[0] - param.popwidth - arrow;
                    param.position[1] = aXY[1] - ((pop.offsetHeight - el.offsetHeight) / 2);
                    return param
                }
                if (aXY[0] + el.offsetWidth + param.popwidth > winscroll[1]) {
                    param.type = 4;
                    param.position[0] = aXY[0] + el.offsetWidth + arrow;
                    param.position[1] = aXY[1] - ((pop.offsetHeight - el.offsetHeight) / 2);
                    return param
                }
            }
            if (aXY[1] + el.offsetHeight / 2 >= (winsize.height / 2 + winscroll[0])) {
                if (aXY[1] + el.offsetHeight + param.popHeight < winsize.height - winscroll[1] && aXY[1] + el.offsetHeight + param.popHeight >= winscroll[0]) {
                    param.type = 1;
                    param.position[0] = aXY[0] - ((pop.offsetWidth - el.offsetWidth) / 2);
                    param.position[1] = aXY[1] + el.offsetHeight + arrow;
                    return param
                }
                if (aXY[1] - param.popHeight - arrow > winscroll[0]) {
                    param.type = 3;
                    param.position[0] = aXY[0] - ((pop.offsetWidth - el.offsetWidth) / 2);
                    param.position[1] = aXY[1] - param.popHeight - arrow;
                    return param
                }
            } else {
                if (aXY[1] + el.offsetHeight + param.popHeight >= winscroll[0]) {
                    param.type = 1;
                    param.position[0] = aXY[0] - ((pop.offsetWidth - el.offsetWidth) / 2);
                    param.position[1] = aXY[1] + el.offsetHeight + arrow;
                    return param
                }
                if (aXY[1] - param.popHeight - arrow > winscroll[0]) {
                    param.type = 3;
                    param.position[0] = aXY[0] - ((pop.offsetWidth - el.offsetWidth) / 2);
                    param.position[1] = aXY[1] - param.popHeight - arrow;
                    return param
                }
            }
            return false
        };
        scope.bigpop = new App.bigpop({
            popcontent: html,
            popfrom: scope.popid
        });
        scope.bigpop.show();
        var st = setInterval(function () {
            if (scope.bigpop.clear) {
                clearInterval(st);
                return false
            }
            var param = checkTip(tmp, scope.bigpop.getRoot());
            if (!param) {
                return false
            }
            scope.bigpop.setType(param.type);
            scope.bigpop.setPostion(param.position)
        }, 100)
    } catch (e) {}
});
$registJob("start_suda", function () {
    try {
        setTimeout(GB_SUDA._S_pSt, 2000)
    } catch (e) {}
});
var SSL = {
    Config: {},
    Space: function (str) {
        var a = str,
            o = null;
        a = a.split(".");
        o = SSL;
        for (i = 0, len = a.length; i < len; i++) {
            o[a[i]] = o[a[i]] || {};
            o = o[a[i]]
        }
        return o
    }
};
SSL.Space("Global");
SSL.Space("Core.Dom");
SSL.Space("Core.Event");
SSL.Space("App");
SSL.Global = {
    win: window || {},
    doc: document,
    nav: navigator,
    loc: location
};
SSL.Core.Dom = {
    get: function (id) {
        return document.getElementById(id)
    }
};
SSL.Core.Event = {
    on: function () {}
};
SSL.App = {
    _S_gConType: function () {
        var ct = "";
        try {
            SSL.Global.doc.body.addBehavior("#default#clientCaps");
            ct = SSL.Global.doc.body.connectionType
        } catch (e) {
            ct = "unkown"
        }
        return ct
    },
    _S_gKeyV: function (src, k, e, sp) {
        if (src == "") {
            return ""
        }
        if (sp == "") {
            sp = "="
        }
        k = k + sp;
        var ps = src.indexOf(k);
        if (ps < 0) {
            return ""
        }
        ps = ps + k.length;
        var pe = src.indexOf(e, ps);
        if (pe < ps) {
            pe = src.length
        }
        return src.substring(ps, pe)
    },
    _S_gUCk: function (ckName) {
        if ((undefined == ckName) || ("" == ckName)) {
            return ""
        }
        return SSL.App._S_gKeyV(SSL.Global.doc.cookie, ckName, ";", "")
    },
    _S_sUCk: function (ckName, ckValue, ckDays, ckDomain) {
        if (ckValue != null) {
            if ((undefined == ckDomain) || (null == ckDomain)) {
                ckDomain = "sina.com.cn"
            }
            if ((undefined == ckDays) || (null == ckDays) || ("" == ckDays)) {
                SSL.Global.doc.cookie = ckName + "=" + ckValue + ";domain=" + ckDomain + ";path=/"
            } else {
                var now = new Date();
                var time = now.getTime();
                time = time + 86400000 * ckDays;
                now.setTime(time);
                time = now.getTime();
                SSL.Global.doc.cookie = ckName + "=" + ckValue + ";domain=" + ckDomain + ";expires=" + now.toUTCString() + ";path=/"
            }
        }
    },
    _S_gJVer: function (_S_NAV_, _S_NAN_) {
        var p, appsign, appver, jsver = 1,
            isN6 = 0;
        if ("MSIE" == _S_NAN_) {
            appsign = "MSIE";
            p = _S_NAV_.indexOf(appsign);
            if (p >= 0) {
                appver = parseInt(_S_NAV_.substring(p + 5));
                if (3 <= appver) {
                    jsver = 1.1;
                    if (4 <= appver) {
                        jsver = 1.3
                    }
                }
            }
        } else {
            if (("Netscape" == _S_NAN_) || ("Opera" == _S_NAN_) || ("Mozilla" == _S_NAN_)) {
                jsver = 1.3;
                appsign = "Netscape6";
                p = _S_NAV_.indexOf(appsign);
                if (p >= 0) {
                    jsver = 1.5
                }
            }
        }
        return jsver
    },
    _S_gFVer: function (nav) {
        var ua = SSL.Global.nav.userAgent.toLowerCase();
        var flash_version = 0;
        if (SSL.Global.nav.plugins && SSL.Global.nav.plugins.length) {
            var p = SSL.Global.nav.plugins["Shockwave Flash"];
            if (typeof p == "object") {
                for (var i = 10; i >= 3; i--) {
                    if (p.description && p.description.indexOf(" " + i + ".") != -1) {
                        flash_version = i;
                        break
                    }
                }
            }
        } else {
            if (ua.indexOf("msie") != -1 && ua.indexOf("win") != -1 && parseInt(SSL.Global.nav.appVersion) >= 4 && ua.indexOf("16bit") == -1) {
                for (var i = 10; i >= 2; i--) {
                    try {
                        var object = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + i + "');");
                        if (object) {
                            flash_version = i;
                            break
                        }
                    } catch (e) {}
                }
            } else {
                if (ua.indexOf("webtv/2.5") != -1) {
                    flash_version = 3
                } else {
                    if (ua.indexOf("webtv") != -1) {
                        flash_version = 2
                    }
                }
            }
        }
        return flash_version
    },
    _S_gMeta: function (MName, pidx) {
        var pMeta = SSL.Global.doc.getElementsByName(MName);
        var idx = 0;
        if (pidx > 0) {
            idx = pidx
        }
        return (pMeta.length > idx) ? pMeta[idx].content : ""
    },
    _S_gHost: function (sUrl) {
        var r = new RegExp("^http(?:s)?://([^/]+)", "im");
        if (sUrl.match(r)) {
            return sUrl.match(r)[1].toString()
        } else {
            return ""
        }
    },
    _S_gDomain: function (sHost) {
        var p = sHost.indexOf(".sina.");
        if (p > 0) {
            return sHost.substr(0, p)
        } else {
            return sHost
        }
    },
    _S_gTJMTMeta: function () {
        return SSL.App._S_gMeta("mediaid")
    },
    _S_gTJZTMeta: function () {
        var zt = SSL.App._S_gMeta("subjectid");
        zt.replace(",", ".");
        zt.replace(";", ",");
        return zt
    },
    _S_isFreshMeta: function () {
        var ph = SSL.Global.doc.documentElement.innerHTML.substring(0, 1024);
        var reg = new RegExp("<meta\\s*http-equiv\\s*=((\\s*refresh\\s*)|('refresh')|(\"refresh\"))s*contents*=", "ig");
        return reg.test(ph)
    },
    _S_isIFrameSelf: function (minH, minW) {
        if (SSL.Global.win.top == SSL.Global.win) {
            return false
        } else {
            try {
                if (SSL.Global.doc.body.clientHeight == 0) {
                    return false
                }
                if ((SSL.Global.doc.body.clientHeight >= minH) && (SSL.Global.doc.body.clientWidth >= minW)) {
                    return false
                } else {
                    return true
                }
            } catch (e) {
                return true
            }
        }
    },
    _S_isHome: function (curl) {
        var isH = "";
        try {
            SSL.Global.doc.body.addBehavior("#default#homePage");
            isH = SSL.Global.doc.body.isHomePage(curl) ? "Y" : "N"
        } catch (e) {
            isH = "unkown"
        }
        return isH
    }
};

function SUDA(config, ext1, ext2) {
    var SG = SSL.Global,
        SSD = SSL.Core.Dom,
        SSE = SSL.Core.Event,
        SA = SSL.App;
    var _S_JV_ = "webbug_meta_ref_mod_noiframe_async_fc_:9.10c",
        _S_DPID_ = "-9999-0-0-1";
    var _S_NAN_ = SG.nav.appName.indexOf("Microsoft Internet Explorer") > -1 ? "MSIE" : SG.nav.appName;
    var _S_NAV_ = SG.nav.appVersion;
    var _S_PURL_ = SG.loc.href.toLowerCase();
    var _S_PREF_ = SG.doc.referrer.toLowerCase();
    var _SP_MPID_ = "";
    var _S_PID_ = "",
        _S_UNA_ = "SUP",
        _S_MI_ = "",
        _S_SID_ = "Apache",
        _S_GID_ = "SINAGLOBAL",
        _S_LV_ = "ULV",
        _S_UO_ = "UOR",
        _S_UPA_ = "_s_upa",
        _S_IFW = 320,
        _S_IFH = 240,
        _S_GIDT = 0,
        _S_EXT1 = "",
        _S_EXT2 = "",
        _S_SMC = 0,
        _S_SMM = 10000,
        _S_ET = 0,
        _S_ACC_ = "_s_acc";
    var _S_HTTP = _S_PURL_.indexOf("https") > -1 ? "https://" : "http://",
        _S_BCNDOMAIN = "beacon.sina.com.cn",
        _S_CP_RF = _S_HTTP + _S_BCNDOMAIN + "/a.gif",
        _S_CP_RF_D = _S_HTTP + _S_BCNDOMAIN + "/d.gif",
        _S_CP_RF_E = _S_HTTP + _S_BCNDOMAIN + "/e.gif",
        _S_CP_FC = _S_HTTP + _S_BCNDOMAIN + "/fc.html";
    var _S_T1 = 100,
        _S_T2 = 500;
    var _S_TEntry = "_s_tentry";
    var handler = {
        _S_sSID: function () {
            handler._S_p2Bcn("", _S_CP_RF_D)
        },
        _S_gsSID: function () {
            var sid = SA._S_gUCk(_S_SID_);
            if ("" == sid) {
                handler._S_sSID()
            }
            return sid
        },
        _S_sGID: function (gid) {
            if ("" != gid) {
                SA._S_sUCk(_S_GID_, gid, 3650)
            }
        },
        _S_gGID: function () {
            return SA._S_gUCk(_S_GID_)
        },
        _S_gsGID: function () {
            if ("" != _S_GID_) {
                var gid = SA._S_gUCk(_S_GID_);
                if ("" == gid) {
                    handler._S_IFC2GID()
                }
                return gid
            } else {
                return ""
            }
        },
        _S_IFC2GID: function () {
            var _S_ifc = SSD.get("SUDA_FC");
            if (_S_ifc) {
                _S_ifc.src = _S_CP_FC + "?a=g&n=" + _S_GID_ + "&r=" + Math.random()
            }
        },
        _S_gCid: function () {
            try {
                var metaTxt = SA._S_gMeta("publishid");
                if ("" != metaTxt) {
                    var pbidList = metaTxt.split(",");
                    if (pbidList.length > 0) {
                        if (pbidList.length >= 3) {
                            _S_DPID_ = "-9999-0-" + pbidList[1] + "-" + pbidList[2]
                        }
                        return pbidList[0]
                    }
                } else {
                    return "0"
                }
            } catch (e) {
                return "0"
            }
        },
        _S_gAEC: function () {
            return SA._S_gUCk(_S_ACC_)
        },
        _S_sAEC: function (eid) {
            if ("" == eid) {
                return
            }
            var acc = handler._S_gAEC();
            if (acc.indexOf(eid + ",") < 0) {
                acc = acc + eid + ","
            }
            SA._S_sUCk(_S_ACC_, acc, 7)
        },
        _S_p2Bcn: function (q, u) {
            var scd = SSD.get("SUDA_CS_DIV");
            if (null != scd) {
                var now = new Date();
                scd.innerHTML = "<img width=0 height=0 src='" + u + "?" + q + "&gUid_" + now.getTime() + "' border='0' alt='' />"
            }
        },
        _S_gSUP: function () {
            if (_S_MI_ != "") {
                return _S_MI_
            }
            var sup = unescape(SA._S_gUCk(_S_UNA_));
            if (sup != "") {
                var ag = SA._S_gKeyV(sup, "ag", "&", "");
                var user = SA._S_gKeyV(sup, "user", "&", "");
                var uid = SA._S_gKeyV(sup, "uid", "&", "");
                var sex = SA._S_gKeyV(sup, "sex", "&", "");
                var bday = SA._S_gKeyV(sup, "dob", "&", "");
                _S_MI_ = ag + ":" + user + ":" + uid + ":" + sex + ":" + bday;
                return _S_MI_
            } else {
                return ""
            }
        },
        _S_gsLVisit: function (sid) {
            var lvi = SA._S_gUCk(_S_LV_);
            var lva = lvi.split(":");
            var lvr = "";
            if (lva.length >= 6) {
                if (sid != lva[4]) {
                    var lvn = new Date();
                    var lvd = new Date(parseInt(lva[0]));
                    lva[1] = parseInt(lva[1]) + 1;
                    if (lvn.getMonth() != lvd.getMonth()) {
                        lva[2] = 1
                    } else {
                        lva[2] = parseInt(lva[2]) + 1
                    }
                    if (((lvn.getTime() - lvd.getTime()) / 86400000) >= 7) {
                        lva[3] = 1
                    } else {
                        if (lvn.getDay() < lvd.getDay()) {
                            lva[3] = 1
                        } else {
                            lva[3] = parseInt(lva[3]) + 1
                        }
                    }
                    lvr = lva[0] + ":" + lva[1] + ":" + lva[2] + ":" + lva[3];
                    lva[5] = lva[0];
                    lva[0] = lvn.getTime();
                    SA._S_sUCk(_S_LV_, lva[0] + ":" + lva[1] + ":" + lva[2] + ":" + lva[3] + ":" + sid + ":" + lva[5], 360)
                } else {
                    lvr = lva[5] + ":" + lva[1] + ":" + lva[2] + ":" + lva[3]
                }
            } else {
                var lvn = new Date();
                lvr = ":1:1:1";
                SA._S_sUCk(_S_LV_, lvn.getTime() + lvr + ":" + sid + ":", 360)
            }
            return lvr
        },
        _S_gUOR: function () {
            var uoc = SA._S_gUCk(_S_UO_);
            var upa = uoc.split(":");
            if (upa.length >= 2) {
                return upa[0]
            } else {
                return ""
            }
        },
        _S_sUOR: function () {
            var uoc = SA._S_gUCk(_S_UO_),
                uor = "",
                uol = "",
                up_t = "",
                up = "";
            var re = /[&|?]c=spr(_[A-Za-z0-9]{1,}){3,}/;
            var ct = new Date();
            if (_S_PURL_.match(re)) {
                up_t = _S_PURL_.match(re)[0]
            } else {
                if (_S_PREF_.match(re)) {
                    up_t = _S_PREF_.match(re)[0]
                }
            }
            if (up_t != "") {
                up_t = up_t.substr(3) + ":" + ct.getTime()
            }
            if (uoc == "") {
                if (SA._S_gUCk(_S_LV_) == "" && SA._S_gUCk(_S_LV_) == "") {
                    uor = SA._S_gDomain(SA._S_gHost(_S_PREF_));
                    uol = SA._S_gDomain(SA._S_gHost(_S_PURL_))
                }
                SA._S_sUCk(_S_UO_, uor + "," + uol + "," + up_t, 365)
            } else {
                var ucg = 0,
                    uoa = uoc.split(",");
                if (uoa.length >= 1) {
                    uor = uoa[0]
                }
                if (uoa.length >= 2) {
                    uol = uoa[1]
                }
                if (uoa.length >= 3) {
                    up = uoa[2]
                }
                if (up_t != "") {
                    ucg = 1
                } else {
                    var upa = up.split(":");
                    if (upa.length >= 2) {
                        var upd = new Date(parseInt(upa[1]));
                        if (upd.getTime() < (ct.getTime() - 86400000 * 30)) {
                            ucg = 1
                        }
                    }
                }
                if (ucg) {
                    SA._S_sUCk(_S_UO_, uor + "," + uol + "," + up_t, 365)
                }
            }
        },
        _S_gRef: function () {
            var re = /^[^\?&#]*.swf([\?#])?/;
            if ((_S_PREF_ == "") || (_S_PREF_.match(re))) {
                var ref = SA._S_gKeyV(_S_PURL_, "ref", "&", "");
                if (ref != "") {
                    return ref
                }
            }
            return _S_PREF_
        },
        _S_MEvent: function () {
            if (_S_SMC == 0) {
                _S_SMC++;
                var c = SA._S_gUCk(_S_UPA_);
                if (c == "") {
                    c = 0
                }
                c++;
                if (c < _S_SMM) {
                    var re = /[&|?]c=spr(_[A-Za-z0-9]{2,}){3,}/;
                    if (_S_PURL_.match(re) || _S_PREF_.match(re)) {
                        c = c + _S_SMM
                    }
                }
                SA._S_sUCk(_S_UPA_, c)
            }
        },
        _S_gMET: function () {
            var c = SA._S_gUCk(_S_UPA_);
            if (c == "") {
                c = 0
            }
            return c
        },
        _S_gCInfo_v2: function () {
            var now = new Date();
            return "sz:" + screen.width + "x" + screen.height + "|dp:" + screen.colorDepth + "|ac:" + SG.nav.appCodeName + "|an:" + _S_NAN_ + "|cpu:" + SG.nav.cpuClass + "|pf:" + SG.nav.platform + "|jv:" + SA._S_gJVer(_S_NAV_, _S_NAN_) + "|ct:" + SA._S_gConType() + "|lg:" + SG.nav.systemLanguage + "|tz:" + now.getTimezoneOffset() / 60 + "|fv:" + SA._S_gFVer(SG.nav)
        },
        _S_gPInfo_v2: function (pid, ref) {
            if ((undefined == pid) || ("" == pid)) {
                pid = handler._S_gCid() + _S_DPID_
            }
            return "pid:" + pid + "|st:" + handler._S_gMET() + "|et:" + _S_ET + "|ref:" + escape(ref) + "|hp:" + SA._S_isHome(_S_PURL_) + "|PGLS:" + SA._S_gMeta("stencil") + "|ZT:" + escape(SA._S_gTJZTMeta()) + "|MT:" + escape(SA._S_gTJMTMeta()) + "|keys:"
        },
        _S_gUInfo_v2: function (vid) {
            return "vid:" + vid + "|sid:" + handler._S_gsSID() + "|lv:" + handler._S_gsLVisit(handler._S_gsSID()) + "|un:" + handler._S_gSUP() + "|uo:" + handler._S_gUOR() + "|ae:" + handler._S_gAEC()
        },
        _S_gEXTInfo_v2: function (ext1, ext2) {
            _S_EXT1 = (undefined == ext1) ? _S_EXT1 : ext1;
            _S_EXT2 = (undefined == ext2) ? _S_EXT2 : ext2;
            return "ex1:" + _S_EXT1 + "|ex2:" + _S_EXT2
        },
        _S_pBeacon: function (pid, ext1, ext2) {
            try {
                var gid = handler._S_gsGID();
                if ("" == gid) {
                    if (_S_GIDT < 1) {
                        setTimeout(function () {
                            handler._S_pBeacon(pid, ext1, ext2)
                        }, _S_T2);
                        _S_GIDT++;
                        return
                    } else {
                        gid = handler._S_gsSID();
                        handler._S_sGID(gid)
                    }
                }
                var sVer = "V=2";
                var sCI = handler._S_gCInfo_v2();
                var sPI = handler._S_gPInfo_v2(pid, handler._S_gRef());
                var sUI = handler._S_gUInfo_v2(gid);
                var sEX = handler._S_gEXTInfo_v2(ext1, ext2);
                var lbStr = sVer + "&CI=" + sCI + "&PI=" + sPI + "&UI=" + sUI + "&EX=" + sEX;
                handler._S_p2Bcn(lbStr, _S_CP_RF)
            } catch (e) {}
        },
        _S_acTrack_i: function (eid, p) {
            if (("" == eid) || (undefined == eid)) {
                return
            }
            handler._S_sAEC(eid);
            if (0 == p) {
                return
            }
            var s = "AcTrack||" + handler._S_gGID() + "||" + handler._S_gsSID() + "||" + handler._S_gSUP() + "||" + eid + "||";
            handler._S_p2Bcn(s, _S_CP_RF_E)
        },
        _S_uaTrack_i: function (acode, aext) {
            var s = "UATrack||" + handler._S_gGID() + "||" + handler._S_gsSID() + "||" + handler._S_gSUP() + "||" + acode + "||" + aext + "||";
            handler._S_p2Bcn(s, _S_CP_RF_E)
        },
        _S_sTEntry: function () {
            var e = "-";
            if ("" == SA._S_gUCk(_S_TEntry)) {
                if ("" != _S_PREF_) {
                    e = SA._S_gHost(_S_PREF_)
                }
                SA._S_sUCk(_S_TEntry, e, "", "t.sina.com.cn")
            }
            var vlogin = /t.sina.com.cn\/reg.php/;
            if (_S_PURL_.match(vlogin)) {
                var sharehost = SA._S_gKeyV(unescape(_S_PURL_), "sharehost", "&", "");
                var appkey = SA._S_gKeyV(unescape(_S_PURL_), "appkey", "&", "");
                if ("" != sharehost) {
                    SA._S_sUCk(_S_TEntry, sharehost, "", "t.sina.com.cn")
                }
                SA._S_sUCk("appkey", appkey, "", "t.sina.com.cn")
            }
        },
        _S_gSPR: function () {
            var uoc = handler._S_gUOR();
            var upa = uoc.split(",");
            if (upa.length >= 3) {
                return upa[2]
            } else {
                return ""
            }
        },
        _S_upExt1: function () {
            var reg_arr = new Array(/t.sina.com.cn\/reg.php/, /t.sina.com.cn\/reg\/reg_succ.php/, /t.sina.com.cn\/reg\/reg_active.php/, /t.sina.com.cn\/person\/full_info.php\?.*type=3.*/, /t.sina.com.cn\/person\/guide_interest.php\?.*type=3.*/, /t.sina.com.cn\/person\/guide_invite.php\?.*type=3.*/, /t.sina.com.cn\/person\/full_info.php\?.*type=2.*/, /t.sina.com.cn\/person\/guide_interest.php\?.*type=2.*/, /t.sina.com.cn\/person\/guide_invite.php\?.*type=2.*/, /t.sina.com.cn\/reg_sinamail.php/, /t.sina.com.cn\/person\/full_info.php\?.*type=1.*/, /t.sina.com.cn\/person\/guide_interest.php\?.*type=1.*/, /t.sina.com.cn\/person\/guide_invite.php\?.*type=1.*/, /v.t.sina.com.cn\/widget\/full_info.php\?.*type=4.*/, /v.t.sina.com.cn\/share\/share.php\?.*type=4.*/);
            var pos_arr = new Array("reg_input", "reg_succ", "reg_active", "reg_full_info", "reg_interest", "reg_invite", "act_fullinfo", "act_interest", "act_invite", "mail_act", "mail_full_info", "mail_interest", "mail_invite", "wgt_full_info", "wgt_succ");
            var pos = "";
            var ral = reg_arr.length;
            var rpl = pos_arr.length;
            var spr = handler._S_gSPR();
            try {
                for (var i = 0; i < ral && i < rpl; i++) {
                    if (_S_PURL_.match(reg_arr[i])) {
                        pos = spr + ",flw," + pos_arr[i];
                        break
                    }
                }
            } catch (e) {}
            return pos
        }
    };
    if (_S_SMC == 0) {
        if ("MSIE" == _S_NAN_) {
            SSL.Global.doc.attachEvent("onclick", handler._S_MEvent);
            SSL.Global.doc.attachEvent("onmousemove", handler._S_MEvent);
            SSL.Global.doc.attachEvent("onscroll", handler._S_MEvent)
        } else {
            SSL.Global.doc.addEventListener("click", handler._S_MEvent, false);
            SSL.Global.doc.addEventListener("mousemove", handler._S_MEvent, false);
            SSL.Global.doc.addEventListener("scroll", handler._S_MEvent, false)
        }
    }
    handler._S_sUOR();
    handler._S_sTEntry();
    return {
        _S_pSt: function (pid, ext1, ext2) {
            try {
                if ((SA._S_isFreshMeta()) || (SA._S_isIFrameSelf(_S_IFH, _S_IFW))) {
                    return
                }
                if (_S_ET > 0) {
                    return
                }++_S_ET;
                setTimeout(function () {
                    handler._S_gsSID()
                }, _S_T1);
                setTimeout(function () {
                    handler._S_pBeacon(pid, ((undefined == ext1) ? handler._S_upExt1() : ext1), ext2, 0)
                }, _S_T2)
            } catch (e) {}
        },
        _S_pStM: function (pid, ext1, ext2) {
            ++_S_ET;
            handler._S_pBeacon(pid, ((undefined == ext1) ? handler._S_upExt1() : ext1), ext2)
        },
        _S_acTrack: function (eid, p) {
            try {
                if ((undefined != eid) && ("" != eid)) {
                    setTimeout(function () {
                        handler._S_acTrack_i(eid, p)
                    }, _S_T1)
                }
            } catch (e) {}
        },
        _S_uaTrack: function (acode, aext) {
            try {
                if (undefined == acode) {
                    acode = ""
                }
                if (undefined == aext) {
                    aext = ""
                }
                if (("" != acode) || ("" != aext)) {
                    setTimeout(function () {
                        handler._S_uaTrack_i(acode, aext)
                    }, _S_T1)
                }
            } catch (e) {}
        }
    }
}
var GB_SUDA;
if (GB_SUDA == null) {
    GB_SUDA = new SUDA({})
}
var _S_PID_ = "";

function _S_pSt(pid, ext1, ext2) {
    GB_SUDA._S_pSt(pid, ext1, ext2)
}
function _S_pStM(pid, ext1, ext2) {
    GB_SUDA._S_pStM(pid, ext1, ext2)
}
function _S_acTrack(eid) {
    GB_SUDA._S_acTrack(eid, 1)
}
function _S_uaTrack(acode, aext) {
    GB_SUDA._S_uaTrack(acode, aext)
}
$registJob("atme_filter", function () {
    var event = Core.Events,
        dom = App.Dom;
    var item = {
        mod: $E("atme_filter")
    };
    var handler = {
        init: function (mod) {
            dom.getBy(function (el) {
                var attr = el.getAttribute("act");
                if (!attr) {
                    return false
                }
                item[attr] = el;
                switch (attr) {
                case "exp":
                    event.addEvent(el, function () {
                        handler.panel(el)
                    });
                    break;
                case "unexp":
                    event.addEvent(el, function () {
                        handler.panel(el)
                    });
                    break;
                case "submit":
                    event.addEvent(el, handler.submit);
                    break
                }
            }, "", mod);
            var i = 0
        },
        submit: function () {
            event.stopEvent();
            item.form.submit()
        },
        panel: function (obj) {
            var state = obj.getAttribute("state");
            if (state == "post") {
                return
            }
            event.stopEvent();
            var attr = obj.getAttribute("act");
            handler[attr] && handler[attr]()
        },
        exp: function () {
            dom.setStyle(item.title, "display", "none");
            var el = item.panel;
            el.style.cssText = "";
            dom.setStyle(el, "opacity", 0);
            dom.setStyle(el, "display", "");
            var opa = 0,
                bas = 10,
                g = 1.5,
                time = 100,
                interval = null;
            var interFunc = function () {
                bas *= g;
                opa += bas;
                if (opa >= 100) {
                    clearInterval(interval);
                    dom.setStyle(el, "opacity", 100)
                } else {
                    dom.setStyle(el, "opacity", opa / 100)
                }
            };
            interval = setInterval(interFunc, time)
        },
        unexp: function () {
            var el = item.panel;
            var height = el.offsetHeight;
            dom.setStyle(el, "overflow", "hidden");
            var time = 35,
                interval = null,
                base = 40;
            var interFunc = function () {
                base -= 3;
                height -= base;
                if (height <= 17 || base <= 0) {
                    clearInterval(interval);
                    dom.setStyle(el, "display", "none");
                    dom.setStyle(item.title, "display", "")
                } else {
                    dom.setStyle(el, "height", height + "px")
                }
            };
            interval = setInterval(interFunc, time)
        }
    };
    item.mod && handler.init(item.mod)
});
Core.Dom.removeClassName = function (obj, _className) {
    obj = $E(obj);
    obj.className = (" " + obj.className + " ").replace(" " + _className + " ", "")
};
if (!domkey) {
    var domkey = {}
}
domkey.Date = function (parentObj, dateFun, year, month, startDate, decDays, heightLightDay) {
    var _this = this;
    _this.startDate = startDate || new Date();
    _this.decDays = decDays || 7;
    var C = function (tagName) {
        return document.createElement(tagName)
    };
    var E = function (id) {
        return document.getElementById(id)
    };
    var dateNum = function (year, month) {
        var length = 0;
        var runFeb = year % 400 ? (year % 4 ? false : (year % 100 ? true : false)) : true;
        switch (parseInt(month)) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            length = 31;
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            length = 30;
            break;
        case 1:
            if (runFeb) {
                length = 29
            } else {
                length = 28
            }
        }
        return length
    };
    this.year = year || (new Date()).getFullYear();
    this.month = month || (new Date()).getMonth();
    this.hlDay = heightLightDay || false;
    this.fun = dateFun ||
    function () {};
    var oYearandMonth = C("DIV");
    var oMonth = C("SELECT");
    var oYear = C("DIV");
    var oYearInput = C("INPUT");
    var oYearUp = C("INPUT");
    var oYearDown = C("INPUT");
    var oWeek = C("UL");
    this.oDate = C("UL");
    oYearandMonth.className = "selector";
    oMonth.className = "month";
    oYear.className = "year";
    oYearInput.className = "yearval";
    oYearUp.className = "yearbtn";
    oYearDown.className = "yearbtn2";
    oWeek.className = "weeks";
    this.oDate.className = "days";
    oYearUp.type = "button";
    oYearDown.type = "button";
    var showDate = function (fun, yearNum, monthNum) {
        _this.curYear = yearNum || (new Date().getFullYear());
        _this.curMonth = monthNum || (new Date().getMonth());
        _this.whiteDay = (new Date(_this.curYear, _this.curMonth, 1)).getDay();
        _this.length = dateNum(_this.curYear, _this.curMonth);
        _this.setDateInterval(_this.startDate, _this.decDays)
    };
    for (var i = 0; i < this.monthText.length; i++) {
        oMonth.options[oMonth.length] = new Option(this.monthText[i], i)
    }
    for (var i = 0; i < this.weekText.length; i++) {
        var oDay = C("LI");
        oDay.innerHTML = this.weekText[i];
        oWeek.appendChild(oDay)
    }
    oYearandMonth.appendChild(oMonth);
    oYearandMonth.appendChild(oYear);
    oYear.appendChild(oYearInput);
    oYear.appendChild(oYearUp);
    oYear.appendChild(oYearDown);
    parentObj.appendChild(oYearandMonth);
    parentObj.appendChild(oWeek);
    parentObj.appendChild(this.oDate);
    oMonth.value = this.month;
    oYearInput.value = this.year;
    oMonth.onchange = function () {
        showDate(dateFun, parseInt(oYearInput.value), oMonth.value)
    };
    oYearUp.onclick = function () {
        var newYear = parseInt(oYearInput.value) + 1;
        oYearInput.value = newYear;
        showDate(dateFun, parseInt(oYearInput.value), oMonth.value)
    };
    oYearDown.onclick = function () {
        var newYear = parseInt(oYearInput.value) - 1;
        oYearInput.value = newYear;
        showDate(dateFun, parseInt(oYearInput.value), oMonth.value)
    };
    oYearInput.onblur = function () {
        var y = parseInt(this.value);
        if (y < 1900) {
            y = 1990
        }
        if (y > 2100) {
            y = 2010
        }
        this.value = y;
        showDate(dateFun, parseInt(oYearInput.value), oMonth.value)
    };
    oYearInput.onkeypress = function (e) {
        if (e.keyCode == 13) {
            var y = parseInt(this.value);
            if (y < 1900) {
                y = 1990
            }
            if (y > 2100) {
                y = 2010
            }
            this.value = y;
            showDate(dateFun, parseInt(oYearInput.value), oMonth.value)
        }
    };
    showDate(dateFun, year, month)
};
domkey.Date.prototype = {
    monthText: [$CLTMSG.CL0501, $CLTMSG.CL0502, $CLTMSG.CL0503, $CLTMSG.CL0504, $CLTMSG.CL0505, $CLTMSG.CL0506, $CLTMSG.CL0507, $CLTMSG.CL0508, $CLTMSG.CL0509, $CLTMSG.CL0510, $CLTMSG.CL0511, $CLTMSG.CL0512],
    weekText: [$CLTMSG.CL0302, $CLTMSG.CL0309, $CLTMSG.CL0310, $CLTMSG.CL0311, $CLTMSG.CL0312, $CLTMSG.CL0313, $CLTMSG.CL0314],
    setDateInterval: function (startDate, decDays) {
        var _this = this;
        var end = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        var from = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        from.setHours(decDays * -24);
        _this.oDate.innerHTML = "";
        for (var i = 0; i < _this.whiteDay; i++) {
            _this.oDate.appendChild($C("LI"))
        }
        for (var i = 0; i < this.length; i++) {
            var dLi = $C("LI");
            var cur = new Date(_this.curYear, _this.curMonth, i);
            if (cur.getTime() >= from.getTime() && cur.getTime() < end.getTime()) {
                var dA = $C("A");
                dA.href = "#date";
                dA.setAttribute("day", i + 1);
                dA.setAttribute("month", this.month);
                dA.onclick = function () {
                    _this.fun(_this.curYear, _this.curMonth, this.getAttribute("day"))
                };
                dA.innerHTML = "<strong>" + (i + 1) + "</strong>";
                dLi.appendChild(dA);
                if (_this.hlDay) {
                    if (_this.curYear == _this.year && _this.curMonth == _this.month) {
                        if (_this.hlDay == (i + 1)) {
                            dA.className = "day"
                        }
                    }
                }
            } else {
                dLi.innerHTML = i + 1;
                dLi.title = ""
            }
            _this.oDate.appendChild(dLi)
        }
    }
};
$registJob("keyword_filter", function () {
    var items = {
        navPanel: $E("filter_nav_panel"),
        keyPanel: $E("filter_key_panel"),
        advPanel: $E("filter_adv_panel"),
        keyBtn: $E("filter_key_btn"),
        advBtn: $E("filter_adv_btn"),
        hideBtn: $E("filter_adv_hide"),
        advShow: $E("filter_adv_show"),
        keyInput: $E("filter_key_input"),
        advInput: $E("filter_adv_input"),
        keyForm: $E("filter_key_form"),
        advForm: $E("filter_adv_form"),
        stime: $E("filter_adv_stime"),
        etime: $E("filter_adv_etime"),
        dateRange: $E("date_range"),
        filterDate: $E("filter_date")
    };
    var events = Core.Events,
        cdom = Core.Dom,
        adom = App.Dom;
    var handler = {
        init: function () {
            items.keyInput && events.addEvent(items.keyInput, handler.searhInputBlur, "blur");
            items.keyInput && events.addEvent(items.keyInput, handler.searhInputFocus, "focus");
            items.advInput && events.addEvent(items.advInput, handler.searhInputBlur, "blur");
            items.advInput && events.addEvent(items.advInput, handler.searhInputFocus, "focus");
            items.stime && events.addEvent(items.stime, handler.searhInputBlur, "blur");
            items.etime && events.addEvent(items.etime, handler.searhInputBlur, "blur");
            items.advShow && events.addEvent(items.advShow, handler.showAdvPanel);
            items.hideBtn && events.addEvent(items.hideBtn, handler.hideAdvPanel);
            items.keyBtn && events.addEvent(items.keyBtn, handler.keySubmit);
            items.advBtn && events.addEvent(items.advBtn, handler.advSubmit);
            items.stime && events.addEvent(items.stime, handler.createSTime);
            items.etime && events.addEvent(items.etime, handler.createETime);
            items.etime && (items.etime.readOnly = true);
            items.stime && (items.stime.readOnly = true);
            this.selectTimeRange()
        },
        clearAbtnClass: function () {
            adom.getBy(function (el) {
                if (adom.hasClass(el, cName)) {
                    cdom.removeClassName(el, cName)
                }
            }, "a", aBtn.parentNode)
        },
        showAdvPanel: function (e) {
            events.stopEvent();
            cdom.setStyle(items.keyPanel, "display", "none");
            handler.showPanel(items.advPanel)
        },
        hideAdvPanel: function () {
            var state = items.hideBtn.getAttribute("state");
            if (state == "post") {
                return
            }
            events.stopEvent();
            handler.hidePanel(items.advPanel);
            var caldrList = Core.Dom.getElementsByClass(document, "div", "pc_caldr");
            if (caldrList.length > 0) {
                box = caldrList[0];
                box.innerHTML = "";
                document.body.removeChild(box)
            }
        },
        keySubmit: function () {
            events.stopEvent();
            if (items.keyInput.value.replace(/(^[\s]*)|([\s]*$)/g, "") != "") {
                if (items.keyInput.value != items.keyInput.getAttribute("def")) {
                    items.keyForm.submit()
                } else {
                    if (items.filterDate && items.filterDate.value !== "") {
                        items.keyInput.value = "";
                        items.keyForm.submit()
                    }
                }
            } else {
                if (items.filterDate && items.filterDate.value !== "") {
                    items.keyInput.value = "";
                    items.keyForm.submit()
                }
            }
        },
        advSubmit: function () {
            events.stopEvent();
            if (items.advInput.getAttribute("def") === items.advInput.value) {
                items.advInput.value = ""
            }
            if (items.stime && items.stime.getAttribute("def") === items.stime.value) {
                items.stime.value = ""
            }
            if (items.etime && items.etime.getAttribute("def") === items.etime.value) {
                items.etime.value = ""
            }
            if (items.stime && items.stime.value != "" && !handler.compareDate()) {
                return
            }
            items.advForm.submit()
        },
        searhInputBlur: function () {
            var input = events.getEventTarget();
            var defValue = input.getAttribute("def");
            if (input.value == "") {
                input.value = defValue
            }
        },
        searhInputFocus: function () {
            var input = events.getEventTarget();
            var defValue = input.getAttribute("def");
            if (input.value == defValue) {
                input.value = ""
            }
        },
        showPanel: function (el) {
            el.style.cssText = "";
            cdom.setStyle(el, "opacity", 0);
            cdom.setStyle(el, "display", "");
            var opa = 0,
                bas = 10,
                g = 1.5,
                time = 100,
                interval = null;
            var interFunc = function () {
                bas *= g;
                opa += bas;
                if (opa >= 100) {
                    clearInterval(interval);
                    cdom.setStyle(el, "opacity", 100)
                } else {
                    cdom.setStyle(el, "opacity", opa / 100)
                }
            };
            interval = setInterval(interFunc, time)
        },
        hidePanel: function (el) {
            var height = el.offsetHeight;
            cdom.setStyle(el, "overflow", "hidden");
            var time = 35,
                interval = null,
                base = 40;
            var interFunc = function () {
                base -= 3;
                height -= base;
                if (height <= 17 || base <= 0) {
                    clearInterval(interval);
                    cdom.setStyle(el, "display", "none");
                    cdom.setStyle(items.keyPanel, "display", "")
                } else {
                    cdom.setStyle(el, "height", height + "px")
                }
            };
            interval = setInterval(interFunc, time)
        },
        createTime: function (el, func) {
            var events = Core.Events,
                cdom = Core.Dom,
                func = func ||
                function () {
                    return true
                };
            var box = null;
            var pos = Core.Dom.getXY(el);
            if (cdom.getElementsByClass(document, "div", "pc_caldr").length > 0) {
                box = cdom.getElementsByClass(document, "div", "pc_caldr")[0];
                box.innerHTML = "";
                cdom.removeNode(box)
            }
            box = document.createElement("DIV");
            box.style.cssText = "position:absolute;display:none;z-Index:1000;";
            box.style.left = pos[0] + "px";
            box.style.top = pos[1] + 20 + "px";
            box.className = "pc_caldr";
            document.body.appendChild(box);
            var callBack = function (y, m, d) {
                var time = y + "-" + ((parseInt(m) + 1) > 9 ? (parseInt(m) + 1) : "0" + (parseInt(m) + 1)) + "-" + (parseInt(d) > 9 ? d : "0" + d);
                el.value = time;
                hidd();
                func();
                return false
            };
            var hidd = function () {
                box.style.display = "none";
                box.innerHTML = "";
                cdom.removeNode(box);
                events.removeEvent(document.body, hidd, "click")
            };
            var now = new Date();
            now.setFullYear(now.getFullYear() - 1);
            now.setDate(now.getDate());
            var day = Math.floor(((new Date() - now)) / (1000 * 60 * 60 * 24)) + 1;
            var initDate = new Date();
            var defDate = [];
            if (el.value) {
                defDate = el.value.split("-")
            }
            new domkey.Date(box, callBack, parseInt(defDate[0], 10) || (new Date()).getFullYear(), (parseInt(defDate[1], 10) || (new Date().getMonth() + 1)) - 1, new Date(), day, (parseInt(defDate[2], 10) || ((new Date()).getDate())));
            box.style.display = "";
            events.stopEvent();
            box.onclick = function () {
                events.stopEvent();
                return false
            };
            events.addEvent(document.body, hidd, "click")
        },
        compareDate: function () {
            var sDate = items.stime.value.replace(/-/g, "/"),
                eDate = items.etime.value.replace(/-/g, "/");
            sDate = new Date(sDate);
            eDate = eDate == "" ? new Date() : new Date(eDate);
            var tipid = "adv_filter_err";
            var error = $E(tipid);
            if (sDate > eDate) {
                if (!error) {
                    error = $C("label");
                    error.setAttribute("id", tipid);
                    error.setAttribute($IE ? "className" : "class", "errorTs error_color");
                    error.style.cssText = "margin:0 0 0 10px;padding-bottom:2px;";
                    error.innerHTML = $CLTMSG.KF0001;
                    items.advBtn.parentNode.appendChild(error)
                }
            } else {
                if (error) {
                    error.parentNode.removeChild(error)
                }
            }
            return sDate <= eDate
        },
        createSTime: function () {
            var call = function () {
                handler.compareDate()
            };
            handler.createTime(items.stime, call);
            handler.searhInputFocus()
        },
        createETime: function () {
            var call = function () {
                handler.compareDate()
            };
            handler.createTime(items.etime, call);
            handler.searhInputFocus()
        },
        selectTimeRange: function () {
            var addEvent = Core.Events.addEvent,
                fireEvent = Core.Events.fireEvent,
                oList = items.dateRange,
                oButton, oInput = items.filterDate;
            if (oList && (oButton = oList.parentNode) && oInput) {
                var oText = oButton.children[0];
                oList.style.visibility = "hidden";
                oList.style.position = "absolute";
                addEvent(oButton, function (e) {
                    var oTarget = e.target || e.srcElement,
                        tag = oTarget.tagName.toUpperCase();
                    if (tag === "SPAN" || tag === "IMG") {
                        oList.style.visibility = oList.style.visibility === "hidden" ? "visible" : "hidden"
                    }
                }, "click");
                addEvent(document.body, function (e) {
                    var oTarget = e.target || e.srcElement;
                    if (!Core.Dom.contains(oButton, oTarget)) {
                        oList.style.visibility = "hidden"
                    }
                }, "click", false);
                var list = oList.getElementsByTagName("a"),
                    len = list.length;
                for (var i = 0; i < len; i++) {
                    (function (item) {
                        addEvent(item, function () {
                            Core.Array.each(list, function (a) {
                                if (a != item) {
                                    a.className = ""
                                }
                            });
                            item.className = "on";
                            var date = item.getAttribute("date") || "";
                            if (date !== "other") {
                                oInput.value = date;
                                oText.innerHTML = item.innerHTML
                            } else {
                                oInput.value = "";
                                fireEvent("filter_adv_show", "click");
                                setTimeout(function () {
                                    items.stime && fireEvent("filter_adv_stime", "click")
                                }, 200)
                            }
                            oList.style.visibility = "hidden"
                        }, "click")
                    })(list[i])
                }
            }
        }
    };
    handler.init()
});
$registJob("lockscreen4addfollow", function () {
    if (scope.lockscreen != "1" && scope.lockscreen != "2" && scope.lockscreen != "3") {
        return false
    }
    if (scope.lockscreen == "1") {
        if (scope.huolibaobei === true) {
            var txt = $CLTMSG.CC4304
        } else {
            var txt = $CLTMSG.CC4301.replace(/#sex#/, scope.sex).replace(/#realname#/, scope.realname)
        }
    } else {
        if (scope.lockscreen == "2") {
            if (scope.$pageid == "profile") {
                var txt = $CLTMSG.CC4305.replace(/#realname#/, scope.realname).replace(/#link_name#/, scope.att_linkname).replace(/#att_names#/, (Core.Array.each(scope.att_names, function (str) {
                    return decodeURIComponent(str)
                })).join("、"))
            } else {
                var txt = $CLTMSG.CC4307.replace(/#realname#/, scope.realname).replace(/#link_name#/, scope.att_linkname).replace(/#att_names#/, (Core.Array.each(scope.att_names, function (str) {
                    return decodeURIComponent(str)
                })).join("、"))
            }
        } else {
            if (scope.lockscreen == "3") {
                var alt = App.alert($CLTMSG.CC4306, {
                    icon: 3
                });
                setTimeout(function () {
                    alt.close();
                    return false
                }, 3000);
                return false
            }
        }
    }
    App.doRequest({
        oid: scope.$oid
    }, "/attention/aj_lateatt.php", function () {
        var dlog = App.confirm(txt, {
            ok: function () {
                dlog.close();
                try {
                    Core.Events.fireEvent($E("add_atn"), "click")
                } catch (e) {}
                if (scope.lockscreen == "2") {
                    App.doRequest({
                        uid: scope.suids.join(","),
                        fromuid: scope.$uid
                    }, "/attention/aj_addfollow.php")
                }
            },
            ok_label: $CLTMSG.CC4302,
            cancel_label: $CLTMSG.CC4303,
            icon: 4
        })
    }, function () {})
});
$registJob("hotkey", (function () {
    var $w = window,
        $d = $w.document,
        $e = $d.documentElement || {};
    var $t = function () {
        if (arguments.length > 0) {
            $e.scrollTop = arguments[0];
            $d.body.scrollTop = arguments[0];
            return
        }
        return ($w.pageYOffset || Math.max($e.scrollTop, $d.body.scrollTop))
    };
    var $s = $w.innerHeight || ($e && $e.clientHeight) ? $e.clientHeight : $d.body["clientHeight"];
    var $xy = Core.Dom.getXY;
    var $y = function (el) {
        var et, pn;
        if ("getBoundingClientRect" in el) {
            et = el.getBoundingClientRect().top;
            return et + $t()
        }
        if (!(pn = el.offsetParent)) {
            return 0
        }
        et = pn.offsetTop;
        while (pn && pn != $d.body) {
            et += pn.offsetTop;
            pn = pn.offsetParent
        }
        return et || 0
    };
    var $sl = function (d, t) {
        if (t) {
            return $s - ($xy(d)[1] - $t())
        } else {
            return $xy(d)[1] - $t()
        }
    };
    return function () {
        var list = [];
        if ($E("feed_list")) {
            list = $E("feed_list").getElementsByTagName("LI")
        }
        var _prevAndNext = (function () {
            var _length = list.length;
            var listindex = -1;
            return function (t, o) {
                var _h = $s;
                var _t = $t();
                var _dom;
                if (t) {
                    for (var i = (_length - 1); i >= 0; i = i - 1) {
                        if ($sl(list[i]) <= _h) {
                            _dom = i;
                            break
                        }
                    }
                } else {
                    for (var i = 0; i < _length; i = i + 1) {
                        if ($sl(list[i]) > 0) {
                            _dom = i;
                            break
                        }
                    }
                }
                listindex = _dom;
                if (t) {
                    if (listindex <= _length) {
                        listindex = listindex + 1
                    }
                } else {
                    if (listindex >= -1) {
                        listindex = listindex - 1
                    }
                }
                if (listindex > -1 && listindex < _length) {
                    setTimeout(function () {
                        var _po = 0;
                        var _l = $s;
                        if (t) {
                            if (list[listindex].offsetHeight > _l && o) {
                                _po = Math.round($t() + _l)
                            } else {
                                _po = Math.round($t() + (list[listindex].offsetHeight - $sl(list[listindex], 1)))
                            }
                        } else {
                            if ((-$sl(list[listindex])) > _l && o) {
                                _po = Math.round($t() - _l)
                            } else {
                                _po = Math.round($t() - (-$sl(list[listindex]))) - 15
                            }
                        }
                        $t(_po)
                    }, 10)
                }
                if (listindex === -1) {
                    $t(0)
                }
                if (listindex === _length) {
                    $t(_t + 270)
                }
            }
        })();
        var _backtop = function () {
            $t(0)
        };
        var _refresh = function () {
            if ($E("feed_msg_new") && $E("feed_msg_new").style.display === "") {
                window.location.reload()
            }
        };
        var _focusPublish = function () {
            if ($E("publish_editor")) {
                _backtop();
                setTimeout(function () {
                    var __edit = $E("publish_editor");
                    __edit.focus();
                    var __times = 0;
                    var __shake = function () {
                        if (__times % 2 === 1) {
                            __edit.style.backgroundColor = "#fff";
                            __times = __times + 1
                        } else {
                            __edit.style.backgroundColor = "#B0FAA9";
                            __times = __times + 1
                        }
                        if (__times === 6) {
                            __times = 0;
                            return
                        }
                        setTimeout(arguments.callee, 100)
                    };
                    __shake()
                }, 10)
            }
        };
        Core.Events.addEvent(document, function (e) {
            if (e.ctrlKey || e.metaKey) {
                return
            }
            var _key = e.keyCode;
            var _target = Core.Events.getEventTarget(e);
            if (_target.nodeName.toLowerCase() === "textarea" || _target.nodeName.toLowerCase() === "input") {
                return
            }
            switch (_key) {
            case 82:
                _refresh();
                break;
            case 80:
                _focusPublish();
                break;
            case 70:
                _focusPublish();
                break;
            case 38:
                _prevAndNext(0, 1);
                break;
            case 75:
                _prevAndNext(0);
                break;
            case 40:
                _prevAndNext(1, 1);
                break;
            case 74:
                _prevAndNext(1);
                break;
            case 84:
                _backtop();
                break;
            default:
                return
            }
            Core.Events.stopEvent()
        }, "keydown");
        App.hotKey = {};
        App.hotKey.backTop = _backtop;
        App.hotKey.focusPublish = _focusPublish
    }
})());
$registJob("medal", function () {
    var box = $E("medal_box");
    if (box) {
        var listBox = $E("medal_list_box");
        var more = $E("medal_list_more");
        var items;
        var state = "hidd";
        var setState = function (newState) {
            if (newState === "hidd") {
                more.className = "popbtn_off"
            }
            if (newState === "show") {
                more.className = "popbtn_on"
            }
            state = newState
        };
        App.doRequest({
            pageid: scope.$pageid,
            uid: scope.$oid || ""
        }, "/plugins/aj_medalmore.php", function (data, result) {
            box.innerHTML = data;
            listBox = $E("medal_list_box");
            more = $E("medal_list_more");
            items = listBox.getElementsByTagName("LI");
            loadMedal();
            initHover()
        }, function () {});
        var loadMedal = function () {
            if (items.length > 4) {
                Core.Events.addEvent(more, function () {
                    if (state === "hidd") {
                        if (items.length > 5) {
                            for (var i = 0, len = items.length; i < len; i += 1) {
                                items[i].style.display = ""
                            }
                        }
                        setState("show");
                        return
                    }
                    if (state === "show") {
                        for (var i = 5, len = items.length; i < len; i += 1) {
                            items[i].style.display = "none"
                        }
                        setState("hidd");
                        return
                    }
                }, "click");
                Core.Events.addEvent(box, function () {}, "mouseover");
                Core.Events.addEvent(box, function () {
                    if (state === "hidd") {}
                }, "mouseout")
            }
        }
    }
    var hover = function (spec) {
        var delay = spec.delay || 100;
        var isover = spec.isover || false;
        var act = spec.act;
        var ext = spec.ext || [];
        var timer = null;
        var showAct = function (e) {
            if (isover) {
                spec.fun.apply(spec.act, [isover])
            }
        };
        var hiddAct = function (e) {
            if (!isover) {
                spec.fun.apply(spec.act, [isover])
            }
        };
        var hoverAct = function (e) {
            isover = true;
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(function () {
                showAct(e)
            }, delay)
        };
        var msoutAct = function (e) {
            isover = false;
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(function () {
                hiddAct(e)
            }, delay)
        };
        Core.Events.addEvent(act, hoverAct, "mouseover");
        Core.Events.addEvent(act, msoutAct, "mouseout");
        for (var i = 0, len = ext.length; i < len; i += 1) {
            Core.Events.addEvent(ext[i], hoverAct, "mouseover");
            Core.Events.addEvent(ext[i], msoutAct, "mouseout")
        }
    };
    var cardBox = $C("DIV");
    var bIframe = $C("IFRAME");
    var loaded = false;
    cardBox.className = "PopLayer";
    cardBox.style.width = "332px";
    cardBox.style.zIndex = "1000";
    bIframe.style.zIndex = "800";
    bIframe.style.position = "absolute";
    Core.Dom.opacity(bIframe, 0);
    cardBox.innerHTML = '<table class="mBlogLayer">	   <tr>	      <td class="top_l"></td>	      <td class="top_c"></td>	      <td class="top_r"></td>	   </tr>	   <tr>	      <td class="mid_l"></td>	      <td class="mid_c"><div class="layerBox">	            <div class="layerBoxCon1" style="width:320px;">	               <div class="closecontain"><a class="close" href="javascript:void(0);" onclick="App.closeMedalCard();" style="visibility:hidden"></a></div>	               <div class="commonLayer3" id="medal_card_introduction">				   </div>	            </div>	         </div></td>	      <td class="mid_r"></td>	   </tr>	   <tr>	      <td class="bottom_l"></td>	      <td class="bottom_c"></td>	      <td class="bottom_r"></td>	   </tr>	</table>';
    App.medalCard = function (medalid, el, type) {
        el = el.getElementsByTagName("A")[0];
        var pos = Core.Dom.getXY(el);
        var typeLeft = '<div class="honor1_ly">{content}</div>';
        var typeMidd = '<div class="honor_ly">{content}</div>';
        cardBox.style.display = "";
        bIframe.style.display = "";
        bIframe.style.left = cardBox.style.left = (pos[0] - (parseInt(cardBox.offsetWidth) - el.offsetWidth) / 2) + (type == "left" ? 100 : 0) + "px";
        bIframe.style.top = cardBox.style.top = pos[1] + el.offsetHeight + 5 + "px";
        Utils.Io.Ajax.request("/plugins/aj_popmedal.php", {
            GET: {
                medalid: medalid,
                uid: scope.$oid
            },
            onComplete: function (json) {
                if (json.code === "A00006") {
                    $E("medal_card_introduction").innerHTML = ((type == "left") ? typeLeft.replace("{content}", json.data) : typeMidd.replace("{content}", json.data));
                    cardBox.style.display = "";
                    bIframe.style.width = cardBox.offsetWidth + "px";
                    bIframe.style.height = cardBox.offsetHeight + "px"
                } else {
                    App.alert($SYSMSG[json.code])
                }
            },
            onException: function () {},
            returnType: "json"
        })
    };
    App.closeMedalCard = function () {
        cardBox.style.display = "none";
        bIframe.style.display = "none";
        $E("medal_card_introduction").innerHTML = ""
    };
    App.medalNewClose = function () {
        var tips = $E("medal_new_tips");
        if (tips) {
            tips.style.display = "none";
            Utils.Io.Ajax.request("/medal/aj_clean.php", {
                POST: {},
                onComplete: function (json) {},
                onException: function () {},
                returnType: "json"
            })
        }
    };
    var blist = [];
    var marking = null;
    cardBox.medaltype = null;
    var initHover = function () {
        if (listBox) {
            blist = listBox.getElementsByTagName("LI")
        }
        if ($E("medal_manage_box")) {
            blist = $E("medal_manage_box").getElementsByTagName("LI")
        }
        try {
            for (var i = 0, len = blist.length; i < len; i += 1) {
                (function (k) {
                    hover({
                        act: blist[k],
                        ext: [cardBox],
                        fun: function (b) {
                            if (b) {
                                var type = blist[k].getAttribute("medaltype");
                                if (cardBox.medaltype === null) {
                                    App.medalCard(type, blist[k], "midd");
                                    cardBox.medaltype = type
                                }
                            } else {
                                App.closeMedalCard();
                                cardBox.medaltype = null
                            }
                        }
                    })
                })(i)
            }
        } catch (e) {}
    };
    if ($E("medal_manage_box")) {
        initHover()
    }
    document.body.appendChild(cardBox);
    document.body.appendChild(bIframe);
    App.closeMedalCard()
});
App.autoPublish = function (content, pic) {
    Utils.Io.Ajax.request("/mblog/publish.php", {
        POST: {
            content: decodeURIComponent(content),
            pic: pic || ""
        },
        onComplete: function (json) {
            if (json.code === "A00006") {
                App.alert({
                    code: "A00006"
                }, {
                    icon: 3
                });
                try {
                    App.medalNewClose()
                } catch (exp) {}
            } else {
                App.alert({
                    code: json.data
                })
            }
        },
        onException: function () {},
        returnType: "json"
    })
};

function main() {
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch (e) {}
    var jobs = new Jobs();
    jobs.add("splitLoadMedia");
    jobs.add("initSearch");
    if (scope.$uid === scope.$oid) {
        jobs.add("publisher3");
        jobs.add("recommuser")
    }
    jobs.add("lockscreen4addfollow");
    jobs.add("hotsearch");
    jobs.add("topic");
    jobs.add("loadComment");
    jobs.add("init_input");
    jobs.add("bind_mobile_info");
    jobs.add("refurbishNumber");
    jobs.add("group_option");
    jobs.add("maybeconcern_index");
    jobs.add("group_sidebar");
    jobs.add("paging");
    jobs.add("setBlessIcon");
    jobs.add("bigpop");
    jobs.add("keyword_filter");
    jobs.add("atme_filter");
    jobs.add("start_suda");
    jobs.add("hotkey");
    jobs.add("medal");
    jobs.start()
};