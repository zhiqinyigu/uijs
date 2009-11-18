(function() {
    var k = k || {
        version: "20080809",
        emptyFn: function() {}
    }; (function() {
        k._log = [];
        var ai = 0;
        var aj = {};
        k.BaseClass = function(ak) {
            aj[(this.hashCode = (ak || k.BaseClass.guid()))] = this
        };
        k.BaseClass.guid = function() {
            return "mz_" + (ai++).toString(36)
        };
        k.BaseClass.create = function() {
            var ak = new k.BaseClass();
            ak.decontrol();
            return ak
        };
        var ah = k.instance = k.I = function(ak) {
            return aj[ak]
        };
        k.BaseClass.prototype.dispose = function() {
            if (this.hashCode) {
                delete aj[this.hashCode]
            }
            for (var ak in this) {
                if (typeof this[ak] != "function") {
                    delete this[ak]
                }
            }
        };
        k.BaseClass.prototype.getHashCode = function() {
            if (!this.hashCode) {
                aj[(this.hashCode = k.BaseClass.guid())] = this
            }
            return this.hashCode
        };
        k.BaseClass.prototype.decontrol = function() {
            delete aj[this.hashCode]
        };
        k.BaseClass.prototype.toString = function() {
            return "[object " + (this._className || "Object") + "]"
        };
        k.BaseClass.prototype._wlog = function(al, am) {
            var ak = k._log;
            if (ak.length > 100) {
                ak.reverse().length = 50;
                ak.reverse()
            }
            ak[ak.length] = "[" + al + "][" + (this._className || "Object") + " " + this.hashCode + "] " + am
        }
    })();
    Function.prototype.inherits = function(aj, ai) {
        var ah,
        ak,
        am = this.prototype,
        al = function() {};
        al.prototype = aj.prototype;
        ak = this.prototype = new al();
        if (typeof(ai) == "string") {
            ak._className = ai
        }
        for (ah in am) {
            ak[ah] = am[ah]
        }
        this.prototype.constructor = am.constructor;
        am = al = null;
        return ak
    };
    k.BaseEvent = function(ah, ai) {
        this.type = ah;
        this.returnValue = true;
        this.target = ai || null;
        this.currentTarget = this.srcElement = null;
        this.cancelBubble = false;
        this.domEvent = null
    };
    k.BaseClass.prototype.addEventListener = function(ak, aj, ai) {
        if (typeof aj != "function") {
            return this._wlog("error", "addEventListener:" + aj + " is not a function")
        }
        if (!this._listeners) {
            this._listeners = {}
        }
        var ah = this._listeners,
        al;
        if (typeof ai == "string" && ai) {
            if (/[^\w\-]/.test(ai)) {
                this._wlog("warning", "nonstandard key:" + ai)
            } else {
                aj.hashCode = ai;
                al = ai
            }
        }
        if (ak.indexOf("on") != 0) {
            ak = "on" + ak
        }
        if (typeof ah[ak] != "object") {
            ah[ak] = {}
        }
        al = al || k.BaseClass.guid();
        aj.hashCode = al;
        if (ah[ak][al]) {
            this._wlog("warning", "repeat key:" + al)
        }
        ah[ak][al] = aj
    };
    k.BaseClass.prototype.removeEventListener = function(aj, ai) {
        if (typeof ai == "function") {
            ai = ai.hashCode
        } else {
            if (typeof ai != "string") {
                return
            }
        }
        if (!this._listeners) {
            this._listeners = {}
        }
        if (aj.indexOf("on") != 0) {
            aj = "on" + aj
        }
        var ah = this._listeners;
        if (!ah[aj]) {
            return
        }
        if (ah[aj][ai]) {
            delete ah[aj][ai]
        }
    };
    k.BaseClass.prototype.dispatchEvent = function(aj) {
        if (!this._listeners) {
            this._listeners = {}
        }
        var ai,
        ah = this._listeners,
        ak = aj.type;
        aj.target = aj.srcElement = aj.target || aj.srcElement || this;
        aj.currentTarget = this;
        if (typeof this[ak] == "function") {
            this[ak](aj)
        }
        if (typeof ah[ak] == "object") {
            for (ai in ah[ak]) {
                if (typeof ah[ak][ai] == "function") {
                    ah[ak][ai].call(this, aj)
                }
            }
        }
        return aj.returnValue
    };
    k.BaseEvent.prototype.inherit = function(ai) {
        var ah = this;
        this.domEvent = ai = window.event || ai;
        ah.clientX = ai.clientX || ai.pageX;
        ah.clientY = ai.clientY || ai.pageY;
        ah.offsetX = ai.offsetX || ai.layerX;
        ah.offsetY = ai.offsetY || ai.layerY;
        ah.screenX = ai.screenX;
        ah.screenY = ai.screenY;
        ah.ctrlKey = ai.ctrlKey || ai.metaKey;
        ah.shiftKey = ai.shiftKey;
        ah.altKey = ai.altKey;
        return ah
    };
    k.Browser = (function() {
        var aj = navigator.userAgent;
        var an = 0,
        ah = 0,
        am = 0,
        al = 0;
        var ak = 0,
        ao = 0,
        ai = 0;
        if (typeof(window.opera) == "object" && /Opera(\s|\/)(\d+(\.\d+)?)/.test(aj)) {
            ah = parseFloat(RegExp.$2)
        } else {
            if (/MSIE (\d+(\.\d+)?)/.test(aj)) {
                an = parseFloat(RegExp.$1)
            } else {
                if (/Firefox(\s|\/)(\d+(\.\d+)?)/.test(aj)) {
                    al = parseFloat(RegExp.$2)
                } else {
                    if (navigator.vendor == "Netscape" && /Netscape(\s|\/)(\d+(\.\d+)?)/.test(aj)) {
                        ai = parseFloat(RegExp.$2)
                    } else {
                        if (aj.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(aj)) {
                            am = parseFloat(RegExp.$1)
                        }
                    }
                }
            }
        }
        if (aj.indexOf("Gecko") > -1 && aj.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(aj)) {
            ao = parseFloat(RegExp.$1)
        }
        return {
            ie: an,
            firefox: al,
            gecko: ao,
            netscape: ai,
            opera: ah,
            safari: am
        }
    })();
    window.FeBrowser = k.Browser;
    k.Dom = {};
    k.Dom.createDom = function(ai, ah) {
        if (k.isIE && ah && ah.name) {
            ai = "<" + ai + ' name="' + k.String.escapeHTML(ah.name) + '">'
        }
        var aj = document.createElement(ai);
        if (ah) {
            k.Dom.setProperties(aj, ah)
        }
        return aj
    };
    k.Dom.getOffset = function(ak) {
        var an = k.Dom.getOwnerDocument(ak);
        var am = k.isGecko > 0 && an.getBoxObjectFor && k.Dom.getStyle(ak, "position") == "absolute" && (ak.style.top === "" || ak.style.left === "");
        var ao = {
            left: 0,
            top: 0
        };
        var ai = (k.isIE && !k.isStrict) ? an.body: an.documentElement;
        if (ak == ai) {
            return ao
        }
        var aj = null;
        var al;
        if (ak.getBoundingClientRect) {
            al = ak.getBoundingClientRect();
            ao.left = al.left + Math.max(an.documentElement.scrollLeft, an.body.scrollLeft);
            ao.top = al.top + Math.max(an.documentElement.scrollTop, an.body.scrollTop);
            ao.left -= an.documentElement.clientLeft;
            ao.top -= an.documentElement.clientTop;
            if (k.isIE && !k.isStrict) {
                ao.left -= 2;
                ao.top -= 2
            }
        } else {
            if (an.getBoxObjectFor && !am) {
                al = an.getBoxObjectFor(ak);
                var ah = an.getBoxObjectFor(ai);
                ao.left = al.screenX - ah.screenX;
                ao.top = al.screenY - ah.screenY
            } else {
                aj = ak;
                do {
                    ao.left += aj.offsetLeft;
                    ao.top += aj.offsetTop;
                    if (k.isWebkit > 0 && k.Dom.getStyle(aj, "position") == "fixed") {
                        ao.left += an.body.scrollLeft;
                        ao.top += an.body.scrollTop;
                        break
                    }
                    aj = aj.offsetParent
                }
                while (aj && aj != ak);
                if (k.isOpera > 0 || (k.isWebkit > 0 && k.Dom.getStyle(ak, "position") == "absolute")) {
                    ao.top -= an.body.offsetTop
                }
                aj = ak.offsetParent;
                while (aj && aj != an.body) {
                    ao.left -= aj.scrollLeft;
                    if (!k.isOpera || aj.tagName != "TR") {
                        ao.top -= aj.scrollTop
                    }
                    aj = aj.offsetParent
                }
            }
        }
        return ao
    };
    k.Dom.getOwnerDocument = function(ah) {
        return ah.nodeType == 9 ? ah: ah.ownerDocument || ah.document
    };
    k.Dom.setProperties = function(ai, ah) {
        k.each(ah, 
        function(ak, aj) {
            k.Dom._setProperty(ai, aj, ak)
        })
    };
    k.Dom._setProperty = function(ai, ah, aj) {
        if (ah == "style") {
            ai.style.cssText = aj
        } else {
            if (ah == "class") {
                ai.className = aj
            } else {
                if (ah == "for") {
                    ai.htmlFor = aj
                } else {
                    if (ah in k.Dom._DIRECT_ATTRIBUTE_MAP) {
                        ai.setAttribute(k.Dom._DIRECT_ATTRIBUTE_MAP[ah], aj)
                    } else {
                        ai[ah] = aj
                    }
                }
            }
        }
    };
    k.Dom._DIRECT_ATTRIBUTE_MAP = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        height: "height",
        width: "width",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    k.Dom.createDom = function(ai, ah) {
        if (k.isIE && ah && ah.name) {
            ai = "<" + ai + ' name="' + k.String.escapeHTML(ah.name) + '">'
        }
        var aj = document.createElement(ai);
        if (ah) {
            k.Dom.setProperties(aj, ah)
        }
        return aj
    };
    k.G = function() {
        for (var ah = [], ai = arguments.length - 1; ai > -1; ai--) {
            var aj = arguments[ai];
            ah[ai] = null;
            if (typeof aj == "object" && aj && aj.dom) {
                ah[ai] = aj.dom
            } else {
                if ((typeof aj == "object" && aj && aj.tagName) || aj == window || aj == document) {
                    ah[ai] = aj
                } else {
                    if (typeof aj == "string" && (aj = document.getElementById(aj))) {
                        ah[ai] = aj
                    }
                }
            }
        }
        return ah.length < 2 ? ah[0] : ah
    };
    if (typeof(HTMLElement) != "undefined" && !window.opera) {
        HTMLElement.prototype.__defineGetter__("children", 
        function() {
            for (var ai = [], aj = 0, al, ak = 0, ah = this.childNodes.length; ak < ah; ak++) {
                al = this.childNodes[ak];
                if (al.nodeType == 1) {
                    ai[aj++] = al;
                    if (al.name) {
                        if (!ai[al.name]) {
                            ai[al.name] = []
                        }
                        ai[al.name][ai[al.name].length] = al
                    }
                    if (al.id) {
                        ai[al.id] = al
                    }
                }
            }
            return ai
        })
    }
    if (typeof(HTMLElement) != "undefined" && !window.opera) {
        HTMLElement.prototype.__defineGetter__("currentStyle", 
        function() {
            return this.ownerDocument.defaultView.getComputedStyle(this, null)
        })
    }
    if (typeof(HTMLElement) != "undefined" && !window.opera) {
        HTMLElement.prototype.insertAdjacentHTML = function(ah, ai) {
            var aj = this.ownerDocument.createRange();
            aj.setStartBefore(this);
            aj = aj.createContextualFragment(ai);
            switch (ah) {
            case "beforeBegin":
                this.parentNode.insertBefore(aj, this);
                break;
            case "afterBegin":
                this.insertBefore(aj, this.firstChild);
                break;
            case "beforeEnd":
                this.appendChild(aj);
                break;
            case "afterEnd":
                if (!this.nextSibling) {
                    this.parentNode.appendChild(aj)
                } else {
                    this.parentNode.insertBefore(aj, this.nextSibling)
                }
                break
            }
        }
    }
    k.TimeLine = function(ah) {
        k.BaseClass.call(this);
        var ai = this;
        ai.interval = 15;
        ai.duration = 800;
        ai.continual = true;
        ai.trend = true;
        k.extend(this, ah);
        ai._beginTime = new Date().getTime();
        ai._endTime = ai._beginTime + ai.duration;
        if (typeof ai.initialize == "function") {
            ai.initialize()
        }
        ai.dispatchEvent(new k.BaseEvent("onbeforestart"));
        if (ai.continual) {
            ai._launch()
        }
    };
    k.TimeLine.inherits(k.BaseClass, "Fe.TimeLine");
    k.TimeLine.prototype._launch = function() {
        var ai = this;
        var ah = new Date().getTime();
        if (ah >= ai._endTime) {
            ai.schedule = ai.trend ? 1: 0;
            if (typeof ai.render == "function") {
                ai.render(ai.schedule)
            }
            if (typeof ai.finish == "function") {
                ai.finish()
            }
            ai.dispatchEvent(new k.BaseEvent("onafterfinish"));
            ai.dispose();
            return
        }
        if (ai.trend) {
            ai.schedule = Math.sqrt((ah - ai._beginTime) / ai.duration)
        } else {
            ai.schedule = Math.pow((ai._endTime - ah) / ai.duration, 2)
        }
        ai.dispatchEvent(new k.BaseEvent("onbeforeupdate"));
        if (typeof ai.render == "function") {
            ai.render(ai.schedule)
        }
        ai.dispatchEvent(new k.BaseEvent("onafterupdate"));
        if (!ai.terminative) {
            ai._timer = setTimeout(function() {
                ai._launch()
            },
            ai.interval)
        }
    };
    k.TimeLine.prototype.cancel = function() {
        if (this._timer) {
            clearTimeout(this._timer)
        }
        this._endTime = this._beginTime;
        if (typeof this.restore == "function") {
            this.restore()
        }
        this.dispose()
    };
    k.TimeLine.prototype.end = function() {
        if (this._timer) {
            clearTimeout(this._timer)
        }
        this._endTime = this._beginTime;
        this._launch()
    };
    k.ac = function(ah, ai) {
        if (! (ah = this.G(ah))) {
            return
        }
        ai = this.trim(ai);
        if (!new RegExp("(^| )" + ai.replace(/(\W)/g, "\\$1") + "( |$)").test(ah.className)) {
            ah.className = ah.className.split(/\s+/).concat(ai).join(" ")
        }
    };
    k.addClassName = k.ac;
    k.each = function(al, ah) {
        if (typeof ah != "function") {
            return al
        }
        if (al) {
            if (al.length === undefined) {
                for (var ai in al) {
                    ah.call(al[ai], al[ai], ai)
                }
            } else {
                for (var aj = 0, ak = al.length; aj < ak; aj++) {
                    ah.call(al[aj], al[aj], aj)
                }
            }
        }
        return al
    };
    k.extend = function(am, ak) {
        if (am && ak && typeof(ak) == "object") {
            for (var al in ak) {
                am[al] = ak[al]
            }
            var aj = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
            for (var ah = 0, ai; ah < aj.length; ah++) {
                ai = aj[ah];
                if (Object.prototype.hasOwnProperty.call(ak, ai)) {
                    am[ai] = ak[ai]
                }
            }
        }
        return am
    };
    k.hide = function() {
        k.each(arguments, 
        function(ah) {
            if (ah = k.G(ah)) {
                ah.style.display = "none"
            }
        })
    };
    k.inherit = function(an, aj, ai) {
        var am = an.prototype;
        var al = function() {};
        al.prototype = aj.prototype;
        var ak = an.prototype = new al();
        if (typeof ai == "string") {
            ak._className = ai
        }
        for (var ah in am) {
            ak[ah] = am[ah]
        }
        an.prototype.constructor = am.constructor;
        am = null;
        return ak
    };
    k.isIE = 0; (function() {
        if (navigator.userAgent.indexOf("MSIE") > 0 && !window.opera) { / MSIE(\d + (\.\d + ) ? ) / .test(navigator.userAgent);
            k.isIE = parseFloat(RegExp.$1)
        }
    })();
    k.on = function(aj, ai, ah) {
        if (! (aj = k.G(aj))) {
            return aj
        }
        ai = ai.replace(/^on/, "").toLowerCase();
        if (aj.attachEvent) {
            aj[ai + ah] = function() {
                ah.call(aj, window.event)
            };
            aj.attachEvent("on" + ai, aj[ai + ah])
        } else {
            aj.addEventListener(ai, ah, false)
        }
        return aj
    };
    k.rc = function(ah, ai) {
        if (! (ah = this.G(ah))) {
            return
        }
        ai = this.trim(ai);
        var aj = ah.className.replace(new RegExp("(^| +)" + ai.replace(/(\W)/g, "\\$1") + "( +|$)", "g"), "$2");
        if (ah.className != aj) {
            ah.className = aj
        }
    };
    k.removeClassName = k.rc;
    k.show = function() {
        this.each(arguments, 
        function(ah) {
            if (ah = k.G(ah)) {
                ah.style.display = ""
            }
        })
    };
    k.trim = function(ah) {
        return ah.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
    };
    k.un = function(aj, ai, ah) {
        if (! (aj = k.G(aj))) {
            return aj
        }
        ai = ai.replace(/^on/, "").toLowerCase();
        if (aj.attachEvent) {
            aj.detachEvent("on" + ai, aj[ai + ah]);
            aj[ai + ah] = null
        } else {
            aj.removeEventListener(ai, ah, false)
        }
        return aj
    };
    var ac = {
        imgPath: "styles/bmap",
        cssPath: "",
        distCursor: this.imgPath + "/ruler.cur"
    };
    var w = w || {
        version: "20090107",
        emptyFn: function() {},
        _register: new Array(),
        register: function(ah) {
            this._register[this._register.length] = ah
        }
    };
    BMapLanguage = {
        Unit: {
            m: "米",
            km: "公里",
            mile: "英里"
        }
    };
    var o = k.BaseClass;
    o.prototype.toString = function() {
        return this._className || ""
    };
    var ad = k.BaseEvent;
    function G(ah) {
        o.call(this);
        this._opts = {
            container: null
        };
        this._opts = k.extend(this._opts, ah);
        this._type = "contextmenu";
        this._map = null;
        this._container;
        this._shadow;
        this._left = 0;
        this._top = 0;
        this._items = [];
        this._dividers = [];
        this.curPoint = null
    }
    G.inherits(o, "ContextMenu");
    k.extend(G.prototype, {
        initialize: function(ai) {
            if (this._container) {
                return false
            }
            this._map = ai;
            this._render();
            var ah = this;
            this._container.style.cursor = "url(" + ai.config.defaultCursor + "), move";
            this._shadow.style.cursor = this._container.style.cursor;
            k.on(document, "mousedown", 
            function(ak) {
                if (!ah._container) {
                    return
                }
                ah.hide()
            });
            k.on(this._container, "click", 
            function(ak) {
                ah.hide();
                ae(ak)
            });
            var aj = this._opts.container;
            if (!aj) {
                aj = this._map.container
            }
            k.on(aj, "contextmenu", 
            function(al) {
                if (!ah._container) {
                    return
                }
                al = window.event || al;
                var ak = al.target || al.srcElement;
                while (ak && ak.className != "pop") {
                    ak = ak.parentNode
                }
                if (ak && ak.className == "pop") {
                    ah.hide();
                    return
                }
                if (al.button == 2 || k.Browser.ie) {
                    return N(al)
                }
            });
            k.on(aj, "mouseup", 
            function(an) {
                if (!ah._container) {
                    return
                }
                an = window.event || an;
                if (an.button != 2) {
                    return
                }
                var aq = an.layerX || an.offsetX;
                var ap = an.layerY || an.offsetY;
                var at = an.target || an.srcElement;
                var ao = at;
                if (aj == ah._map.container && ao !== ah._map.maskLayer && ao.nodeName.toLowerCase() != "svg" && !(ao.nodeName.toLowerCase() == "img" && ao.parentNode && ao.parentNode === ah._map.temp.tilesDiv)) {
                    while (ao && ao.className != "shadow") {
                        ao = ao.parentNode
                    }
                    if (!ao || ao.className != "shadow" || ao.getAttribute("type") != "infowindow_shadow") {
                        ah.hide();
                        return
                    }
                }
                while (at && at != ah._map.container) {
                    if (! (at.clientWidth == 0 && at.clientHeight == 0 && at.offsetParent && at.offsetParent.nodeName.toLowerCase() == "td")) {
                        if (at.nodeName.toLowerCase() == "svg") {
                            aq += parseInt(at.getAttribute("viewBox").split(" ")[0]) || 0;
                            ap += parseInt(at.getAttribute("viewBox").split(" ")[1]) || 0
                        } else {
                            aq += at.offsetLeft;
                            ap += at.offsetTop
                        }
                    }
                    at = at.offsetParent || at.parentNode
                }
                ah.curPoint = ah._map.pixelToPoint(new q(aq, ap));
                if (ah.curPoint.lng < H[ah._map.mapType].bounds[0] || ah.curPoint.lng > H[ah._map.mapType].bounds[2] || ah.curPoint.lat < H[ah._map.mapType].bounds[1] || ah.curPoint.lat > H[ah._map.mapType].bounds[3]) {
                    return
                }
                var am = ah.getDom().offsetHeight;
                var ar = ah.getDom().offsetWidth;
                var al = aq;
                var ak = ap;
                if (aq + ar > ai.width) {
                    al = aq - ar
                }
                if (ap + am > ai.height) {
                    ak = ap - am
                }
                ah.setPosition(al, ak);
                ah.show();
                return N(an)
            })
        },
        remove: function() {
            if (this._container) {
                this._container.parentNode.removeChild(this._container);
                this._container = null
            }
            if (this._shadow) {
                this._shadow.parentNode.removeChild(this._shadow);
                this._shadow = null
            }
            this._map = null
        },
        _render: function() {
            this._container = O(this._map.container, "<div unselectable='on'></div>");
            this._container.className = "BMap_contextMenu";
            this._shadow = O(this._map.container, "<div class='BMap_cmShadow'></div>");
            return this._container
        },
        addItem: function(aj) {
            if (!aj || aj._type != "menuitem" || typeof aj.initialize != "function" || aj._text == "" || aj._width <= 0) {
                return
            }
            for (var ai = 0, ah = this._items.length; ai < ah; ai++) {
                if (this._items[ai] === aj) {
                    return
                }
            }
            aj.initialize(map, this);
            this._items.push(aj);
            k.ac(aj.getDom(), "BMap_cmLstItem");
            if (this._items.length > 1) {
                k.rc(this._items[this._items.length - 2].getDom(), "BMap_cmLstItem")
            } else {
                k.ac(this._items[0].getDom(), "BMap_cmFstItem")
            }
            this._updateShadowSize()
        },
        removeItem: function(aj) {
            if (!aj || aj._type != "menuitem") {
                return
            }
            for (var ai = 0, ah = this._items.length; ai < ah; ai++) {
                if (this._items[ai] === aj) {
                    this._items[ai].remove();
                    this._items.splice(ai, 1)
                }
            }
            k.ac(this._items[this._items.length - 1].getDom(), "BMap_cmLstItem");
            this._updateShadowSize()
        },
        addDivider: function() {
            var ah = "<div class='BMap_cmDivider'></div>";
            this._dividers.push(O(this._container, ah));
            this._updateShadowSize()
        },
        removeDividerAt: function(ah) {
            if (ah === null || typeof ah != "number" || ah < 0 || ah >= this._dividers.length) {
                return
            }
            this._dividers[ah].parentNode.removeChild(this._dividers[ah]);
            this._dividers.splice(ah, 1);
            this._updateShadowSize()
        },
        getDom: function() {
            return this._container
        },
        setPosition: function(ah, ai) {
            this._left = ah;
            this._top = ai;
            this._container.style.left = ah + "px";
            this._container.style.top = ai + "px";
            this._shadow.style.left = ah + 1 + "px";
            this._shadow.style.top = ai + 2 + "px"
        },
        show: function() {
            if (this._container) {
                this._container.style.visibility = "visible"
            }
            if (this._shadow) {
                this._shadow.style.visibility = "visible"
            }
            this.dispatchEvent(new ad("onopen"))
        },
        hide: function() {
            if (this._container) {
                this._container.style.visibility = "hidden"
            }
            if (this._shadow) {
                this._shadow.style.visibility = "hidden"
            }
            this.dispatchEvent(new ad("onclose"))
        },
        setCursor: function(ah) {
            if (this._container && ah) {
                this._container.style.cursor = ah
            }
            if (this._shadow && ah) {
                this._shadow.style.cursor = ah
            }
        },
        destroy: function() {
            if (this._container && this._container.parentNode && this._container.parentNode.parentNode) {
                this._container.parentNode.removeChild(this._container);
                this._container = null
            }
            if (this._shadow && this._shadow.parentNode && this._shadow.parentNode.parentNode) {
                this._shadow.parentNode.removeChild(this._shadow);
                this._shadow = null
            }
        },
        _updateShadowSize: function() {
            if (this._container && this._shadow) {
                this._shadow.style.width = this._container.offsetWidth + "px";
                this._shadow.style.height = this._container.offsetHeight + "px"
            }
        },
        getItems: function() {
            return this._items
        }
    });
    function z(ah) {
        o.call(this);
        this._map = null;
        this._container;
        this._type = "control";
        this._opts = {
            offsetX: 0,
            offsetY: 0,
            anchor: f.ANCHOR_NONE,
            visible: true,
            left: "auto",
            top: "auto",
            right: "auto",
            bottom: "auto"
        };
        this._opts.left = this._opts.left == "" ? "auto": this._opts.left;
        this._opts.top = this._opts.top == "" ? "auto": this._opts.top;
        this._opts.right = this._opts.right == "" ? "auto": this._opts.right;
        this._opts.bottom = this._opts.bottom == "" ? "auto": this._opts.bottom
    }
    z.inherits(o, "Control");
    k.extend(z.prototype, {
        initialize: function(ai) {
            if (this._container) {
                ai.container.appendChild(this._container);
                return false
            }
            this._map = ai;
            var ah = this;
            ai.addEventListener("onmapcontainerresize", 
            function(aj) {
                ah._resetAnchor()
            })
        },
        remove: function() {
            if (!this._container) {
                return
            }
            this._container.parentNode && this._container.parentNode.removeChild(this._container);
            this._container = null;
            this._map = null
        },
        _render: function() {
            this._container = O(this._map.container, "<div unselectable='on'></div>");
            this._setPosition();
            if (!this._opts.visible) {
                this._container.style.display = "none"
            }
            return this._container
        },
        _setPosition: function() {
            if (this._opts.left == "auto" && this._opts.top == "auto" && this._opts.right == "auto" && this._opts.bottom == "auto") {
                this.setAnchor(this._opts.anchor)
            } else {
                this._opts.left = !isNaN(parseInt(this._opts.left)) ? parseInt(this._opts.left) + "px": "auto";
                this._opts.top = !isNaN(parseInt(this._opts.top)) ? parseInt(this._opts.top) + "px": "auto";
                this._opts.right = !isNaN(parseInt(this._opts.right)) ? parseInt(this._opts.right) + "px": "auto";
                this._opts.bottom = !isNaN(parseInt(this._opts.bottom)) ? parseInt(this._opts.bottom) + "px": "auto";
                this.setStyle("left", this._opts.left);
                this.setStyle("top", this._opts.top);
                this.setStyle("right", this._opts.right);
                this.setStyle("bottom", this._opts.bottom);
                var ah = ["T", "R", "B", "L", "TL", "TR", "BL", "BR", "Non"];
                k.rc(this._container, "anchor" + ah[this._opts.anchor]);
                this._opts.anchor = f.ANCHOR_NONE;
                k.ac(this._container, "anchor" + ah[this._opts.anchor])
            }
        },
        setAnchor: function(ai) {
            if (typeof ai != "number" || ai < f.ANCHOR_TOP || ai > f.ANCHOR_NONE) {
                ai = this._defaultAnchor
            }
            var ah = this._opts.anchor;
            this._opts.anchor = ai;
            if (ai != f.ANCHOR_NONE) {
                this._opts.left = this._opts.top = this._opts.right = this._opts.bottom = "auto"
            }
            if (!this._container) {
                return
            }
            var al = this._container;
            var ao = this._opts.offsetX;
            var am = this._opts.offsetY;
            var ap = parseInt(this._opts.width) ? parseInt(this._opts.width) : al.offsetWidth;
            var aj = parseInt(this._opts.height) ? parseInt(this._opts.height) : al.offsetHeight;
            if (ai != f.ANCHOR_NONE) {
                al.style.left = al.style.top = al.style.right = al.style.bottom = "auto"
            }
            if (!this._map) {
                return
            }
            var aq = this._map.width;
            var ak = this._map.height;
            switch (ai) {
            case f.ANCHOR_TOP:
                al.style.top = am + "px";
                al.style.left = (aq - ap) / 2 + "px";
                break;
            case f.ANCHOR_LEFT:
                al.style.left = ao + "px";
                al.style.top = (ak - aj) / 2 + "px";
                break;
            case f.ANCHOR_RIGHT:
                al.style.right = ao + "px";
                al.style.top = (ak - aj) / 2 + "px";
                break;
            case f.ANCHOR_BOTTOM:
                al.style.bottom = am + "px";
                al.style.left = (aq - ap) / 2 + "px";
                break;
            case f.ANCHOR_TOP_LEFT:
                al.style.top = am + "px";
                al.style.left = ao + "px";
                break;
            case f.ANCHOR_TOP_RIGHT:
                al.style.top = am + "px";
                al.style.right = ao + "px";
                break;
            case f.ANCHOR_BOTTOM_LEFT:
                al.style.bottom = am + "px";
                al.style.left = ao + "px";
                break;
            case f.ANCHOR_BOTTOM_RIGHT:
                al.style.bottom = am + "px";
                al.style.right = ao + "px";
                break;
            default:
                break
            }
            var an = ["T", "R", "B", "L", "TL", "TR", "BL", "BR", "Non"];
            k.rc(this._container, "anchor" + an[ah]);
            k.ac(this._container, "anchor" + an[ai])
        },
        getAnchor: function() {
            return this._opts.anchor
        },
        setOffset: function(ah, ai) {
            this._opts.offsetX = ah * 1;
            this._opts.offsetY = ai * 1;
            if (this._opts.anchor == f.ANCHOR_NONE) {
                this._opts.anchor = this.defaultAnchor;
                k.rc(this._container, "anchorNon")
            }
            this.setAnchor(this._opts.anchor)
        },
        getOffset: function() {
            return {
                x: this._opts.offsetX,
                y: this._opts.offsetY
            }
        },
        setStyle: function(ai, aj) {
            aj = !isNaN(parseInt(aj)) ? parseInt(aj) + "px": "auto";
            if (ai == "left" || ai == "top" || ai == "right" || ai == "bottom") {
                this._opts[ai] = aj;
                if (ai == "left" && aj != "auto") {
                    this._opts.right = "auto"
                }
                if (ai == "top" && aj != "auto") {
                    this._opts.bottom = "auto"
                }
                if (ai == "right" && aj != "auto") {
                    this._opts.left = "auto"
                }
                if (ai == "bottom" && aj != "auto") {
                    this._opts.top = "auto"
                }
                if (this._container) {
                    var ah = ["T", "R", "B", "L", "TL", "TR", "BL", "BR", "Non"];
                    k.rc(this._container, "anchor" + ah[this._opts.anchor]);
                    this._opts.anchor = f.ANCHOR_NONE;
                    k.ac(this._container, "anchor" + ah[this._opts.anchor]);
                    this._container.style.left = this._opts.left;
                    this._container.style.top = this._opts.top;
                    this._container.style.right = this._opts.right;
                    this._container.style.bottom = this._opts.bottom
                } else {
                    this._opts.anchor = f.ANCHOR_NONE
                }
            }
        },
        getDom: function() {
            return this._container
        },
        show: function() {
            this._opts.visible = true;
            if (this._container) {
                this._container.style.display = "block"
            }
        },
        hide: function() {
            this._opts.visible = false;
            if (this._container) {
                this._container.style.display = "none"
            }
        },
        isVisible: function() {
            return this._opts.visible
        },
        _resetAnchor: function() {
            if (this._opts.anchor <= f.ANCHOR_LEFT) {
                this.setAnchor(this._opts.anchor)
            }
        }
    });
    var f = {
        ANCHOR_TOP: 0,
        ANCHOR_RIGHT: 1,
        ANCHOR_BOTTOM: 2,
        ANCHOR_LEFT: 3,
        ANCHOR_TOP_LEFT: 4,
        ANCHOR_TOP_RIGHT: 5,
        ANCHOR_BOTTOM_LEFT: 6,
        ANCHOR_BOTTOM_RIGHT: 7,
        ANCHOR_NONE: 8
    };
    function t(ah) {
        z.call(this);
        this._opts = k.extend(k.extend(this._opts, {
            content: "",
            minZoom: -1,
            bounds: null,
            anchor: f.ANCHOR_BOTTOM_RIGHT,
            offsetX: 5,
            offsetY: 2
        }), ah);
        this._defaultAnchor = f.ANCHOR_BOTTOM_RIGHT;
        if (this._opts.anchor < f.ANCHOR_TOP || this._opts.anchor > f.ANCHOR_BOTTOM_RIGHT) {
            this._opts.anchor = this._defaultAnchor
        }
        this._canShow = true
    }
    t.inherits(z, "CopyrightControl");
    k.extend(t.prototype, {
        initialize: function(ai) {
            z.prototype.initialize.call(this, ai);
            this._render();
            var aj = this._opts.minZoom;
            if (aj == -1 || aj < H[this._map.mapType].zoomLevelMin || aj > H[this._map.mapType].zoomLevelMax) {
                this._opts.minZoom = H[this._map.mapType].zoomLevelMin
            }
            this._updateState();
            var ah = this;
            ai.addEventListener("load", 
            function(ak) {
                ah._updateState()
            });
            ai.addEventListener("moveend", 
            function(ak) {
                ah._updateState()
            });
            ai.addEventListener("dragend", 
            function(ak) {
                ah._updateState()
            });
            ai.addEventListener("zoomend", 
            function(ak) {
                ah._updateState()
            })
        },
        _render: function() {
            z.prototype._render.call(this);
            k.ac(this._container, "BMap_cpyCtrl");
            this._container.innerHTML = this._opts.content;
            z.prototype._setPosition.call(this)
        },
        setMinZoom: function(ah) {
            if (ah >= H[this._map.mapType].zoomLevelMin && ah <= H[this._map.mapType].zoomLevelMax) {
                this._opts.minZoom = ah;
                this._updateState()
            }
        },
        getMinZoom: function() {
            return this._opts.minZoom
        },
        setBounds: function(ah) {
            if (ah.toString() == "Bounds") {
                this._opts.bounds = ah;
                this._updateState()
            }
        },
        getBounds: function() {
            return this._opts.bounds
        },
        setContent: function(ah) {
            this._opts.content = ah + "";
            if (this._container) {
                this._container.innerHTML = this._opts.content
            }
        },
        getContent: function() {
            return this._opts.content
        },
        _updateState: function() {
            if (!this._map || !this._container) {
                return
            }
            var ah = this._map.zoomLevel;
            if (ah < this._opts.minZoom) {
                this._canShow = false
            } else {
                var ak = this._map.pixelToPoint({
                    x: 0,
                    y: 0
                });
                var aj = this._map.pixelToPoint({
                    x: this._map.width,
                    y: this._map.height
                });
                var ai = new l(ak.lng, ak.lat, aj.lng, aj.lat);
                if (this._opts.bounds && ai.intersects(this._opts.bounds) == null) {
                    this._canShow = false
                } else {
                    this._canShow = true
                }
            }
            if (this._canShow) {
                if (this._container) {
                    this._container.style.visibility = "visible"
                }
            } else {
                if (this._container) {
                    this._container.style.visibility = "hidden"
                }
            }
        }
    });
    function ag(ah) {
        z.call(this);
        this._opts = k.extend(k.extend(this._opts, {
            anchor: f.ANCHOR_BOTTOM_RIGHT,
            offsetX: 0,
            offsetY: 0,
            width: 150,
            height: 150,
            padding: 8,
            isOpen: false,
            point: null,
            zoom: -1,
            zoomInterval: 4
        }), ah);
        this._defaultAnchor = f.ANCHOR_BOTTOM_RIGHT;
        if (this._opts.anchor < f.ANCHOR_TOP || this._opts.anchor > f.ANCHOR_BOTTOM_RIGHT) {
            this._opts.anchor = this._defaultAnchor
        }
        this._opts.width = this._opts.width > 0 ? this._opts.width: 150;
        this._opts.height = this._opts.height > 0 ? this._opts.height: 150;
        if (Math.ceil(this._opts.padding * 2) >= this._opts.width || Math.ceil(this._opts.padding * 2) >= this._opts.height) {
            this._opts.padding = 8
        }
        this.isOpen = this._opts.isOpen;
        this._omCanvas;
        this._omMapContainer;
        this._omView;
        this._omViewMv;
        this._omBtn;
        this._borderWidth = 1;
        this._btnWidth = 15;
        this._btnHeight = 15;
        this._quad = 4;
        this._overviewMap = null;
        this._minZoomLevel = -1;
        this._maxZoomLevel = -1;
        this._curOMZoomLevel = -1;
        this._wRatio = 1;
        this._hRatio = 1;
        this._temp = {};
        this._currentOp = "";
        this._overviewInitialized = false
    }
    ag.inherits(z, "OverviewMapControl");
    k.extend(ag.prototype, {
        initialize: function(ah) {
            if (z.prototype.initialize.call(this, ah) == false) {
                return false
            }
            this._checkOpts();
            this._render();
            this._bind();
            this._initOverviewMap();
            k.on(this._container, "click", 
            function(ai) {
                ae(ai)
            });
            k.on(this._container, "dblclick", 
            function(ai) {
                ae(ai)
            });
            k.on(this._container, "mousewheel", 
            function(ai) {
                ae(ai)
            });
            if (window.addEventListener) {
                this._container.addEventListener("DOMMouseScroll", 
                function(ai) {
                    ae(ai)
                },
                true)
            }
            if (!this._opts.visible) {
                this.hide()
            }
        },
        _getCurOMZoomLevel: function() {
            var ah = -1;
            var ai = this._map.zoomLevel;
            if (this._opts.zoom != -1) {
                if (this._opts.zoom < this._minZoomLevel) {
                    ah = this._minZoomLevel
                } else {
                    if (this._opts.zoom > this._maxZoomLevel) {
                        ah = this._maxZoomLevel
                    } else {
                        ah = this._opts.zoom
                    }
                }
            } else {
                var aj = ai - this._opts.zoomInterval;
                if (aj < this._minZoomLevel) {
                    ah = this._minZoomLevel
                } else {
                    if (aj > this._maxZoomLevel) {
                        ah = this._maxZoomLevel
                    } else {
                        ah = aj
                    }
                }
            }
            return ah
        },
        _render: function() {
            z.prototype._render.call(this);
            var ah = k.Browser.ie != false ? " BMap_ie" + k.Browser.ie: "";
            var ai = this._container;
            ai.innerHTML = this._generateHTML();
            k.ac(ai, "BMap_omCtrl" + ah);
            this._omCanvas = ai.children[0].children[0];
            this._omMapContainer = this._omCanvas.children[0];
            this._omViewMv = this._omCanvas.children[1];
            this._omViewMvInn = this._omViewMv.children[0];
            this._omBtn = ai.children[1];
            this._container.style.display = "block";
            this.setSize(this._opts.width, this._opts.height);
            this._omViewMv.style.cursor = "url(styles/bmap/openhand.cur), default"
        },
        _generateHTML: function() {
            var ah = ['<div class="BMap_omOutFrame"><div class="BMap_omInnFrame">', '<div class="BMap_omMapContainer"></div>', '<div class="BMap_omViewMv"><div class="BMap_omViewInnFrame"><div></div></div></div>', '</div></div><div class="BMap_omBtn"></div>'];
            return ah.join("")
        },
        _bind: function() {
            var ah = this;
            k.on(this._omBtn, "click", 
            function() {
                ah.changeView()
            });
            if (k.Browser.ie) {
                k.on(this._omBtn, "dblclick", 
                function() {
                    ah.changeView()
                })
            }
            k.on(this._omViewMv, "mousedown", 
            function(ai) {
                if (typeof ah._omViewMv._drag != "undefined" && ah._omViewMv._drag == "true") {
                    return
                }
                ah._omViewMv._drag = "true";
                var ai = window.event || ai;
                if (ah._omViewMv.setCapture) {
                    ah._omViewMv.setCapture()
                }
                ah._bind.iniX = parseInt(ah._omViewMv.currentStyle.left);
                ah._bind.iniY = parseInt(ah._omViewMv.currentStyle.top);
                ah._bind.mx = ai.pageX || ai.clientX;
                ah._bind.my = ai.pageY || ai.clientY;
                ah._bind.i = 0;
                ah._bind.j = 0;
                ah._setViewMvCursor("url(styles/bmap/closedhand.cur), default");
                ae(ai);
                return N(ai)
            });
            k.on(document, "mousemove", 
            function(ao) {
                if (ah._omViewMv._drag == "true") {
                    var ao = window.event || ao;
                    var ai = ao.pageX || ao.clientX;
                    var ap = ao.pageY || ao.clientY;
                    ah._bind.curX = ah._bind.iniX + ai - ah._bind.mx;
                    ah._bind.curY = ah._bind.iniY + ap - ah._bind.my;
                    var an = 3;
                    if (ah._opts.point == null) {
                        ah._bind._moveX = 0;
                        ah._bind._moveY = 0;
                        if (ah._bind.curX <= 0) {
                            ah._bind._moveX = an
                        }
                        if (ah._bind.curY <= 0) {
                            ah._bind._moveY = an
                        }
                        if (ah._bind.curX + ah._omViewMv.offsetWidth >= ah._overviewMap.width) {
                            ah._bind._moveX = -an
                        }
                        if (ah._bind.curY + ah._omViewMv.offsetHeight >= ah._overviewMap.height) {
                            ah._bind._moveY = -an
                        }
                    }
                    ah._omViewMv.style.left = ah._bind.curX + "px";
                    ah._omViewMv.style.top = ah._bind.curY + "px";
                    if ((ah._bind._moveX != 0 || ah._bind._moveY != 0) && !ah._bind.intervalId && ah._opts.point == null) {
                        ah._bind._mapMoving = true;
                        var am = ah._overviewMap.offsetX;
                        var ak = ah._overviewMap.offsetY;
                        var al = am + ah._bind._moveX;
                        var aj = ak + ah._bind._moveY;
                        ah._overviewMap._setPlatformPosition(al, aj);
                        ah._bind.intervalId = setInterval(function() {
                            var ar = ah._bind._moveX != 0 ? (ah._bind._moveX > 0 ? ah._bind.i += an: ah._bind.i -= an) : ah._bind.i;
                            var aq = ah._bind._moveY != 0 ? (ah._bind._moveY > 0 ? ah._bind.j += an: ah._bind.j -= an) : ah._bind.j;
                            ah._overviewMap._setPlatformPosition(al + ar, aj + aq)
                        },
                        30)
                    }
                    if (ah._bind._moveX == 0 && ah._bind._moveY == 0) {
                        clearInterval(ah._bind.intervalId);
                        delete ah._bind.intervalId;
                        ah._bind.i = 0;
                        ah._bind.j = 0
                    }
                    ae(ao);
                    return N(ao)
                }
            });
            k.on(document, "mouseup", 
            function(am) {
                if (ah._omViewMv._drag == "true") {
                    ah._omViewMv._drag = "";
                    ah._setViewMvCursor("url(styles/bmap/openhand.cur), default");
                    if (ah._omViewMv.releaseCapture) {
                        ah._omViewMv.releaseCapture()
                    }
                    if (ah._bind.initX == ah._bind.curX && ah._bind.initY == ah._bind.curY) {
                        ae(am);
                        return N(am)
                    }
                    ah._currentOp = "dragView";
                    ah._overviewMap.config.enableMouseDown = false;
                    ah._map.temp.operating = true;
                    if (typeof ah._bind.curX == "undefined" || typeof ah._bind.curY == "undefined") {
                        return
                    }
                    var al = ah._bind.curX + parseInt(ah._omViewMv.style.width) / 2 + 1;
                    var ak = ah._bind.curY + parseInt(ah._omViewMv.style.height) / 2 + 1;
                    delete ah._bind.curX;
                    delete ah._bind.curY;
                    var aj = ah._overviewMap.pixelToPoint({
                        x: al,
                        y: ak
                    },
                    ah._overviewMap.zoomLevel);
                    var ai = H[ah._map.mapType].bounds;
                    if (aj.lng < ai[0] || aj.lng > ai[2] || aj.lat < ai[1] || aj.lat > ai[3]) {
                        aj = ah._overviewMap.centerPoint
                    }
                    ah._map.temp.operating = false;
                    if (ah._bind._mapMoving == true) {
                        clearInterval(ah._bind.intervalId);
                        delete ah._bind.intervalId;
                        ah._bind._mapMoving = false
                    }
                    ah._map.temp.operating = true;
                    setTimeout(function() {
                        ah._map.temp.operating = false;
                        ah._map.panTo(aj)
                    },
                    50);
                    ae(am);
                    return N(am)
                }
            })
        },
        _initOverviewMap: function() {
            if (this._overviewInitialized == true) {
                return
            }
            var aj = this;
            var ak = aj._map;
            ak.addEventListener("mapcontainerresize", 
            function() {
                if (aj._overviewMap != null && aj._opts.point == null) {
                    aj._overviewMap.setCenter(ak.centerPoint)
                }
                if (aj._omView != null) {
                    aj._omView.setPoint(ak.centerPoint);
                    aj._setRatio()
                }
                aj._redraw()
            });
            if (this.isOpen == false) {
                return
            }
            ak.addEventListener("load", 
            function() {
                aj._onMainZoomEnd()
            });
            ak.addEventListener("moving", 
            function() {
                aj._moveView()
            });
            ak.addEventListener("moveend", 
            function(al) {
                aj._onMainMoveEnd(al)
            });
            ak.addEventListener("dragend", 
            function(al) {
                aj._onMainMoveEnd(al)
            });
            ak.addEventListener("zoomend", 
            function(al) {
                aj._onMainZoomEnd(al)
            });
            var ah = ak.centerPoint;
            this._minZoomLevel = H[ak.mapType].zoomLevelMin;
            this._maxZoomLevel = H[ak.mapType].zoomLevelMax;
            this._curOMZoomLevel = this._getCurOMZoomLevel();
            this._overviewMap = new u(this._omMapContainer, {
                isOverviewMap: true
            });
            this._overviewMap.enableClickPan(false);
            this._overviewMap.enableScrollWheelZoom(false);
            this._overviewMap.enableDoubleClickZoom(false);
            this._overviewMap.enableKeyboard(false);
            this._overviewMap.enableMapArea(false);
            if (this._opts.point) {
                ah = this._opts.point;
                this._overviewMap.enableDraging(false);
                this.setCenterPoint._preCursor = this._overviewMap.platform.style.cursor;
                this._overviewMap.platform.style.cursor = "default"
            }
            this._overviewMap.centerAndZoom(ah, this._curOMZoomLevel);
            this._omView = new C({
                point: ak.centerPoint,
                lineStroke: 1,
                lineColor: "#6688cc"
            });
            this._overviewMap.addOverlay(this._omView);
            this._omView.getDom().innerHTML = '<div class="BMap_omViewInnFrame"><div class="BMap_omViewMask"></div></div>';
            this._omViewInn = this._omView.getDom().children[0];
            var ai = this._omView.getDom().style;
            ai.borderLeftColor = "#84b0df";
            ai.borderTopColor = "#adcff4";
            ai.borderRightColor = "#274b8b";
            ai.borderBottomColor = "#274b8b";
            this._setRatio();
            this._overviewMap.addEventListener("dragend", 
            function() {
                if (aj._opts.point) {
                    return
                }
                aj._currentOp = "dragMap";
                ak.panTo(aj._overviewMap.centerPoint)
            });
            this._overviewMap.addEventListener("moveend", 
            function() {
                aj._onViewMapMoveEnd()
            });
            this._overviewMap.addEventListener("mousedown", 
            function(al) {
                aj._temp._downX = al.offsetX;
                aj._temp._downY = al.offsetY
            });
            this._overviewMap.addEventListener("mapcontainerresize", 
            function(al) {
                if (aj._opts.point == null) {
                    aj._overviewMap.setCenter(aj._map.centerPoint)
                } else {
                    aj._overviewMap.setCenter(aj._opts.point)
                }
                aj._setRatio()
            });
            this._overviewInitialized = true
        },
        _setViewMvCursor: function(ah) {
            this._omViewMv.style.cursor = ah
        },
        setAnchor: function(ah) {
            z.prototype.setAnchor.call(this, ah);
            if (!this._map) {
                return
            }
            this._setQuad();
            this._redraw()
        },
        setStyle: function(ah, ai) {
            z.prototype.setStyle.call(this, ah, ai);
            if (ah == "left" || ah == "right" || ah == "top" || ah == "bottom") {
                this._setQuad();
                this._redraw()
            }
        },
        changeView: function() {
            this.changeView._running = true;
            this._opts.isOpen = !this._opts.isOpen;
            this.isOpen = this._opts.isOpen;
            if (!this._container) {
                return
            }
            var am = this._container;
            var ah = this._opts.width;
            var aj = this._opts.height;
            var al = this._btnWidth;
            var ai = this._btnHeight;
            var ak = this;
            if (!this._opts.isOpen) {
                this.changeView._preBtnTop = this._omBtn.style.top;
                this.changeView._preBtnLeft = this._omBtn.style.left;
                new k.TimeLine({
                    interval: 20,
                    duration: 100,
                    onafterupdate: function(an) {
                        am.style.width = (ah - Math.ceil((ah - al) * an.target.schedule)) + "px";
                        am.style.height = (aj - Math.ceil((aj - ai) * an.target.schedule)) + "px";
                        if (k.Browser.ie) {
                            ak._omBtn.style.top = (ak._quad == 3 || ak._quad == 4) ? parseInt(am.style.height) - ai + "px": "0";
                            ak._omBtn.style.left = (ak._quad == 1 || ak._quad == 4) ? parseInt(am.style.width) - al + "px": "0";
                            if (ak._opts.anchor >= 0 && ak._opts.anchor <= f.ANCHOR_BOTTOM_RIGHT) {
                                if (ak._quad == 3 || ak._quad == 4) {
                                    am.style.top = ak._map.height - parseInt(am.style.height) + "px"
                                }
                                if (ak._quad == 1 || ak._quad == 4) {
                                    am.style.left = ak._map.width - parseInt(am.style.width) + "px"
                                }
                            }
                        }
                        ak.dispatchEvent(new ad("onviewchanging"))
                    },
                    onafterfinish: function(an) {
                        am.style.width = ak._btnWidth + "px";
                        am.style.height = ak._btnHeight + "px";
                        if (k.Browser.ie) {
                            ak._omBtn.style.left = "0";
                            ak._omBtn.style.top = "0";
                            if (ak._opts.anchor >= 0 && ak._opts.anchor <= f.ANCHOR_BOTTOM_RIGHT) {
                                if (ak._quad == 3 || ak._quad == 4) {
                                    am.style.top = ak._map.height - ak._btnHeight + "px"
                                }
                                if (ak._quad == 1 || ak._quad == 4) {
                                    am.style.left = ak._map.width - ak._btnWidth + "px"
                                }
                            }
                        }
                        ak._redraw();
                        k.ac(ak._omBtn, "BMap_omBtnClosed");
                        ak.dispatchEvent(new ad("onviewchanged"));
                        ak.changeView._running = false
                    }
                })
            } else {
                if (this._overviewInitialized == false) {
                    this._initOverviewMap()
                }
                new k.TimeLine({
                    interval: 20,
                    duration: 100,
                    onafterupdate: function(an) {
                        am.style.width = (Math.ceil(ah * an.target.schedule)) + "px";
                        am.style.height = (Math.ceil(aj * an.target.schedule)) + "px";
                        if (k.Browser.ie) {
                            ak._omBtn.style.top = (ak._quad == 3 || ak._quad == 4) ? parseInt(am.style.height) - ai + "px": "0";
                            ak._omBtn.style.left = (ak._quad == 1 || ak._quad == 4) ? parseInt(am.style.width) - al + "px": "0";
                            if (ak._opts.anchor >= 0 && ak._opts.anchor <= f.ANCHOR_BOTTOM_RIGHT) {
                                if (ak._quad == 3 || ak._quad == 4) {
                                    am.style.top = ak._map.height - parseInt(am.style.height) + "px"
                                }
                                if (ak._quad == 1 || ak._quad == 4) {
                                    am.style.left = ak._map.width - parseInt(am.style.width) + "px"
                                }
                            }
                        }
                        ak.dispatchEvent(new ad("onviewchanging"))
                    },
                    onafterfinish: function(an) {
                        am.style.width = ah + "px";
                        am.style.height = aj + "px";
                        if (ak._opts.anchor >= 0 && ak._opts.anchor <= f.ANCHOR_BOTTOM_RIGHT) {
                            if (k.Browser.ie) {
                                if (ak._quad == 3 || ak._quad == 4) {
                                    am.style.top = ak._map.height - aj + "px"
                                }
                                if (ak._quad == 1 || ak._quad == 4) {
                                    am.style.left = ak._map.width - ah + "px"
                                }
                            }
                        }
                        ak._redraw();
                        ak._setBtnPosition();
                        k.rc(ak._omBtn, "BMap_omBtnClosed");
                        ak.dispatchEvent(new ad("onviewchanged"));
                        ak.changeView._running = false
                    }
                })
            }
        },
        _setRatio: function() {
            if (!this._map) {
                return
            }
            var an = this._map.zoomLevel;
            var ap = this._map.pixelToPoint({
                x: 0,
                y: 0
            },
            an);
            var ak = this._map.pixelToPoint({
                x: this._map.width,
                y: this._map.height
            },
            an);
            var ai = this._overviewMap.pixelToPoint({
                x: 0,
                y: 0
            },
            this._curOMZoomLevel);
            var aj = this._overviewMap.pixelToPoint({
                x: this._overviewMap.width,
                y: this._overviewMap.height
            },
            this._curOMZoomLevel);
            this._wRatio = (ak.lng - ap.lng) / (aj.lng - ai.lng);
            this._hRatio = (ak.lat - ap.lat) / (aj.lat - ai.lat);
            if (this._wRatio >= 1 || this._hRatio >= 1) {
                this._omViewMv.style.display = "none";
                this._omView.hide()
            } else {
                var al = parseInt(this._overviewMap.width);
                var ah = parseInt(this._overviewMap.height);
                var ao = Math.round(al * this._wRatio);
                var am = Math.round(ah * this._hRatio);
                this._omView.show();
                this._omView.setDimension(ao, am);
                this._omViewMv.style.display = "block"
            }
            this._setOMViewMvPos()
        },
        _setOMViewMvPos: function() {
            if (!this._omView.getDom()) {
                return
            }
            if (this._wRatio >= 1 || this._hRatio >= 1) {
                this._omViewMv.style.display = "none";
                return
            }
            var ai = this._omView.getDom().style;
            this._omViewMv.style.display = "block";
            this._omViewMv.style.width = ai.width;
            this._omViewMv.style.height = ai.height;
            var ah = parseInt(ai.width) - 2;
            var aj = parseInt(ai.height) - 2;
            ah = ah < 0 ? 0: ah;
            aj = aj < 0 ? 0: aj;
            this._omViewMvInn.style.width = ah + "px";
            this._omViewMvInn.style.height = aj + "px";
            this._omViewInn.style.width = this._omViewMvInn.style.width;
            this._omViewInn.style.height = this._omViewMvInn.style.height;
            this._omViewMv.style.left = parseInt(ai.left) + this._overviewMap.offsetX + "px";
            this._omViewMv.style.top = parseInt(ai.top) + this._overviewMap.offsetY + "px"
        },
        setSize: function(ai, aj) {
            if (typeof ai != "number" || typeof aj != "number") {
                return
            }
            ai = ai > 0 ? ai: this._opts.width;
            aj = aj > 0 ? aj: this._opts.height;
            this._opts.width = ai;
            this._opts.height = aj;
            if (!this._container) {
                return
            }
            if (this.changeView._running == true) {
                var ah = arguments;
                var ak = this;
                setTimeout(function() {
                    ah.callee.call(ak, ai, aj)
                },
                100);
                return
            }
            Q(this._container, [ai, aj]);
            this.setAnchor(this._opts.anchor);
            this.dispatchEvent(new ad("resize"))
        },
        getSize: function() {
            return {
                width: this._opts.width,
                height: this._opts.height
            }
        },
        setCenterPoint: function(ah) {
            var ai = this;
            this._opts.point = ah;
            if (ah == null) {
                if (ai._overviewMap && ai._map) {
                    ai._overviewMap.setCenter(ai._map.centerPoint);
                    ai._overviewMap.enableDraging(true);
                    if (ai.setCenterPoint._preCursor) {
                        ai._overviewMap.platform.style.cursor = ai.setCenterPoint._preCursor
                    }
                }
            } else {
                if (ah && ah.toString() == "Point") {
                    if (ai._overviewMap) {
                        ai._overviewMap.setCenter(ah);
                        ai._overviewMap.enableClickPan(false);
                        ai._overviewMap.enableDraging(false);
                        ai.setCenterPoint._preCursor = ai._overviewMap.platform.style.cursor;
                        ai._overviewMap.platform.style.cursor = "default"
                    }
                }
            }
            ai._setRatio();
            ai._redraw()
        },
        getCenterPoint: function() {
            if (this._opts.point) {
                return this._opts.point
            } else {
                if (this._overviewMap) {
                    return this._overviewMap.centerPoint
                }
            }
        },
        setOffset: function(ah, ai) {
            z.prototype.setOffset.call(this, ah, ai);
            if (ah != 0 || ai != 0) {
                k.ac(this._container, "withOffset")
            } else {
                k.rc(this._container, "withOffset")
            }
        },
        _redraw: function() {
            if (!this._omCanvas) {
                return
            }
            var ar = this._opts.width;
            var am = this._opts.height;
            var ai = this._opts.padding;
            var aq = this._borderWidth;
            var ap = this._btnWidth;
            var al = this._btnHeight;
            var an = ar;
            var ao = am;
            if (this.isOpen == false) {
                an = al;
                ao = ap
            }
            if (k.Browser.ie == 6) {
                ai = ai - 1
            }
            var aj = 0;
            var at = 0;
            var ak = 0;
            var ah = 0;
            this._setOutFramePos();
            this._omCanvas.style.left = this._omCanvas.style.top = this._omCanvas.style.right = this._omCanvas.style.bottom = "auto";
            this._omBtn.style.left = this._omBtn.style.top = this._omBtn.style.right = this._omBtn.style.bottom = "auto";
            if (this._opts.anchor != f.ANCHOR_NONE && this._opts.offsetX == 0 && this._opts.offsetY == 0) {
                switch (this._opts.anchor) {
                case f.ANCHOR_TOP:
                    if (k.Browser.ie == 6) {
                        this._omCanvas.style.left = ai + 1 + "px"
                    } else {
                        this._omCanvas.style.left = ai + "px"
                    }
                    this._omCanvas.style.bottom = ai + "px";
                    aj = ar - 2 * aq;
                    at = am - aq;
                    ak = aj - 2 * ai - 2 * aq;
                    ah = at - ai - 2 * aq;
                    if (k.Browser.ie == 6 && document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0) {
                        ak = ak - 2;
                        ah = ah - 1
                    }
                    if (k.Browser.ie && !(document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0)) {
                        aj = aj + 2;
                        at = at + 1;
                        ah = ah + 1;
                        if (k.Browser.ie == 7) {
                            this._omCanvas.style.bottom = ai - 1 + "px";
                            ak = ak + 2;
                            ah = ah + 1
                        }
                    }
                    break;
                case f.ANCHOR_LEFT:
                    if (k.Browser.ie == 6) {
                        this._omCanvas.style.top = ai + 1 + "px"
                    } else {
                        this._omCanvas.style.top = ai + "px"
                    }
                    this._omCanvas.style.right = ai + "px";
                    aj = ar - aq;
                    at = am - 2 * aq;
                    ak = aj - ai - 2 * aq;
                    ah = at - 2 * ai - 2 * aq;
                    if (k.Browser.ie == 6) {
                        ah = ah - 2;
                        ak = ak - 1
                    }
                    if (k.Browser.ie && !(document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0)) {
                        aj = aj + 1;
                        at = at + 2;
                        ak = ak + 2;
                        ah = ah + 1;
                        if (k.Browser.ie == 7) {
                            this._omCanvas.style.bottom = ai - 1 + "px";
                            this._omCanvas.style.right = ai - 1 + "px";
                            ah = ah + 1
                        }
                    }
                    break;
                case f.ANCHOR_RIGHT:
                    if (k.Browser.ie == 6) {
                        this._omCanvas.style.left = ai + 1 + "px";
                        this._omCanvas.style.top = ai + 1 + "px"
                    } else {
                        this._omCanvas.style.top = ai + "px";
                        this._omCanvas.style.left = ai + "px"
                    }
                    if (k.Browser.ie) {
                        this._container.style.left = this._map.width - an + "px"
                    }
                    aj = ar - aq;
                    at = am - 2 * aq;
                    ak = aj - ai - 2 * aq;
                    ah = at - 2 * ai - 2 * aq;
                    if (k.Browser.ie == 6) {
                        ah = ah - 2;
                        ak = ak - 1
                    }
                    if (k.Browser.ie && !(document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0)) {
                        aj = aj + 1;
                        at = at + 2;
                        ak = ak + 2;
                        ah = ah + 1;
                        if (k.Browser.ie == 7) {
                            this._omCanvas.style.bottom = ai - 1 + "px";
                            ah = ah + 1
                        }
                    }
                    break;
                case f.ANCHOR_BOTTOM:
                    if (k.Browser.ie == 6) {
                        this._omCanvas.style.left = ai + 1 + "px";
                        this._omCanvas.style.top = ai + 1 + "px"
                    } else {
                        this._omCanvas.style.left = ai + "px";
                        this._omCanvas.style.top = ai + "px"
                    }
                    if (k.Browser.ie) {
                        this._container.style.top = this._map.height - ao + "px"
                    }
                    aj = ar - 2 * aq;
                    at = am - aq;
                    ak = aj - 2 * ai - 2 * aq;
                    ah = at - ai - 2 * aq;
                    if (k.Browser.ie == 6) {
                        ak = ak - 2;
                        ah = ah - 1
                    }
                    if (k.Browser.ie && !(document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0)) {
                        aj = aj + 2;
                        at = at + 1;
                        ak = ak + 2;
                        ah = ah + 2;
                        if (k.Browser.ie == 7) {
                            this._omCanvas.style.bottom = ai - 1 + "px";
                            this._omCanvas.style.right = ai - 1 + "px"
                        }
                    }
                    break;
                case f.ANCHOR_TOP_LEFT:
                    this._omCanvas.style.bottom = ai + "px";
                    this._omCanvas.style.right = ai + "px";
                    aj = ar - aq;
                    at = am - aq;
                    ak = aj - ai - 2 * aq;
                    ah = at - ai - 2 * aq;
                    if (k.Browser.ie == 6) {
                        ak = ak - 1;
                        ah = ah - 1
                    }
                    if (k.Browser.ie && !(document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0)) {
                        aj = aj + 1;
                        at = at + 1;
                        ak = ak + 2;
                        ah = ah + 2;
                        if (k.Browser.ie == 7) {
                            this._omCanvas.style.bottom = ai - 1 + "px";
                            this._omCanvas.style.right = ai - 1 + "px"
                        }
                    }
                    break;
                case f.ANCHOR_TOP_RIGHT:
                    if (k.Browser.ie == 6) {
                        this._omCanvas.style.left = ai + 1 + "px"
                    } else {
                        this._omCanvas.style.left = ai + "px"
                    }
                    if (k.Browser.ie) {
                        this._container.style.left = this._map.width - an + "px"
                    }
                    this._omCanvas.style.bottom = ai + "px";
                    aj = ar - aq;
                    at = am - aq;
                    ak = aj - ai - 2 * aq;
                    ah = at - ai - 2 * aq;
                    if (k.Browser.ie == 6) {
                        ak = ak - 1;
                        ah = ah - 1
                    }
                    if (k.Browser.ie && !(document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0)) {
                        aj = aj + 1;
                        at = at + 1;
                        ak = ak + 2;
                        ah = ah + 2;
                        if (k.Browser.ie == 7) {
                            this._omCanvas.style.bottom = ai - 1 + "px"
                        }
                    }
                    break;
                case f.ANCHOR_BOTTOM_LEFT:
                    if (k.Browser.ie == 6) {
                        this._omCanvas.style.top = ai + 1 + "px"
                    } else {
                        this._omCanvas.style.top = ai + "px"
                    }
                    if (k.Browser.ie) {
                        this._container.style.top = this._map.height - ao + "px"
                    }
                    this._omCanvas.style.right = ai + "px";
                    aj = ar - aq;
                    at = am - aq;
                    ak = aj - ai - 2 * aq;
                    ah = at - ai - 2 * aq;
                    if (k.Browser.ie == 6) {
                        ak = ak - 1;
                        ah = ah - 1
                    }
                    if (k.Browser.ie && !(document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0)) {
                        aj = aj + 1;
                        at = at + 1;
                        ak = ak + 2;
                        ah = ah + 2;
                        if (k.Browser.ie == 7) {
                            this._omCanvas.style.right = ai - 1 + "px"
                        }
                    }
                    break;
                case f.ANCHOR_BOTTOM_RIGHT:
                    if (k.Browser.ie == 6) {
                        this._omCanvas.style.top = ai + 1 + "px";
                        this._omCanvas.style.left = ai + 1 + "px"
                    } else {
                        this._omCanvas.style.top = ai + "px";
                        this._omCanvas.style.left = ai + "px"
                    }
                    if (k.Browser.ie) {
                        this._container.style.top = this._map.height - ao + "px";
                        this._container.style.left = this._map.width - an + "px"
                    }
                    if (k.Browser.ie == 6) {
                        this._container.style.top = this._map.height - ao + "px";
                        this._container.style.left = this._map.width - an + "px"
                    }
                    aj = ar - aq;
                    at = am - aq;
                    ak = aj - ai - 2 * aq;
                    ah = at - ai - 2 * aq;
                    if (k.Browser.ie == 6) {
                        ak = ak - 1;
                        ah = ah - 1
                    }
                    if (k.Browser.ie && !(document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0)) {
                        aj = aj + 1;
                        at = at + 1;
                        ak = ak + 2;
                        ah = ah + 2
                    }
                    break;
                default:
                    break
                }
                if (this._map.width % 2 == 1) {
                    this._container.style.left = parseInt(this._container.style.left) - 1 + "px"
                }
            } else {
                if (k.Browser.ie == 6) {
                    ai = ai + 1
                }
                this._omCanvas.style.left = this._omCanvas.style.top = this._omCanvas.style.right = this._omCanvas.style.bottom = ai + "px";
                aj = ar - 2 * aq;
                at = am - 2 * aq;
                ak = aj - 2 * ai - 2 * aq;
                ah = at - 2 * ai - 2 * aq;
                if (this._opts.offsetX != 0 || this._opts.offsetY != 0) {
                    k.ac(this._container, "withOffset")
                }
                if (k.Browser.ie && !(document.firstChild.nodeType == 8 && document.firstChild.nodeValue.indexOf("CTYPE") >= 0)) {
                    aj = aj + 2;
                    at = at + 2;
                    ak = ak + 2;
                    ah = ah + 2
                }
            }
            if (aj > 0 && at > 0) {
                Q(this._container.children[0], [aj, at])
            }
            if (ak > 0 && ah > 0) {
                Q(this._omCanvas, [ak, ah])
            }
            this._setBtnPosition();
            k.rc(this._omBtn, "BMap_omBtnClosed");
            if (!this._opts.isOpen) {
                this._container.style.width = this._btnWidth + "px";
                this._container.style.height = this._btnHeight + "px";
                if (k.Browser.ie) {
                    this.changeView._preBtnTop = this._omBtn.style.top;
                    this.changeView._preBtnLeft = this._omBtn.style.left;
                    this._omBtn.style.left = "0";
                    this._omBtn.style.top = "0"
                }
                k.ac(this._omBtn, "BMap_omBtnClosed")
            }
        },
        _setQuad: function() {
            var am = this._container;
            if (!am) {
                return
            }
            var ai = this._quad;
            var aq = this._map.width;
            var al = this._map.height;
            var ah = aq / 2;
            var at = al / 2;
            var ao = this._opts.width;
            var ak = this._opts.height;
            var aj = this._opts.left != "auto" ? parseInt(this._opts.left) : this._opts.right != "auto" ? aq - ao - parseInt(this._opts.right) : am.offsetLeft;
            var ar = this._opts.top != "auto" ? parseInt(this._opts.top) : this._opts.bottom != "auto" ? al - ak - parseInt(this._opts.bottom) : am.offsetTop;
            var ap = aj + ao / 2;
            var an = ar + ak / 2;
            if (ap <= ah && an <= at) {
                this._quad = 2
            } else {
                if (ap > ah && an <= at) {
                    this._quad = 1
                } else {
                    if (ap > ah && an > at) {
                        this._quad = 4
                    } else {
                        if (ap <= ah && an > at) {
                            this._quad = 3
                        }
                    }
                }
            }
            if (this._opts.offsetX == 0 && this._opts.offsetY == 0) {
                switch (this._opts.anchor) {
                case f.ANCHOR_TOP_LEFT:
                    this._quad = 2;
                    break;
                case f.ANCHOR_TOP_RIGHT:
                    this._quad = 1;
                    break;
                case f.ANCHOR_BOTTOM_LEFT:
                    this._quad = 3;
                    break;
                case f.ANCHOR_BOTTOM_RIGHT:
                    this._quad = 4;
                    break;
                case f.ANCHOR_TOP:
                    if (this._quad == 3) {
                        this._quad = 2
                    } else {
                        if (this._quad == 4) {
                            this._quad = 1
                        }
                    }
                    break;
                case f.ANCHOR_LEFT:
                    if (this._quad == 1) {
                        this._quad = 2
                    } else {
                        if (this._quad == 4) {
                            this._quad = 3
                        }
                    }
                    break;
                case f.ANCHOR_RIGHT:
                    if (this._quad == 2) {
                        this._quad = 1
                    } else {
                        if (this._quad == 3) {
                            this._quad = 4
                        }
                    }
                    break;
                case f.ANCHOR_BOTTOM:
                    if (this._quad == 1) {
                        this._quad = 4
                    } else {
                        if (this._quad == 2) {
                            this._quad = 3
                        }
                    }
                    break;
                default:
                    break
                }
            }
            k.rc(am, "quad" + ai);
            k.ac(am, "quad" + this._quad)
        },
        _setOutFramePos: function() {
            if (this._opts.anchor != f.ANCHOR_NONE) {
                return
            }
            var an = this._map.width;
            var aj = this._map.height;
            var am = this._container;
            var ai = this._opts.width;
            var al = this._opts.height;
            var ah = this._opts.left != "auto" ? parseInt(this._opts.left) : this._opts.right != "auto" ? an - ai - parseInt(this._opts.right) : 0;
            var ak = this._opts.top != "auto" ? parseInt(this._opts.top) : this._opts.bottom != "auto" ? aj - al - parseInt(this._opts.bottom) : 0;
            switch (this._quad) {
            case 2:
                am.style.right = am.style.bottom = "auto";
                am.style.left = ah + "px";
                am.style.top = ak + "px";
                break;
            case 1:
                am.style.left = am.style.bottom = "auto";
                am.style.right = an - ah - ai + "px";
                am.style.top = ak + "px";
                break;
            case 4:
                am.style.left = am.style.top = "auto";
                am.style.right = an - ah - ai + "px";
                am.style.bottom = aj - ak - al + "px";
                break;
            case 3:
                am.style.right = am.style.top = "auto";
                am.style.left = ah + "px";
                am.style.bottom = aj - ak - al + "px";
                break;
            default:
                break
            }
        },
        _setBtnPosition: function() {
            if (!k.Browser.ie) {
                switch (this._quad) {
                case 2:
                    this._omBtn.style.top = "0";
                    this._omBtn.style.left = "0";
                    break;
                case 1:
                    this._omBtn.style.top = "0";
                    this._omBtn.style.right = "0";
                    break;
                case 4:
                    this._omBtn.style.bottom = "0";
                    this._omBtn.style.right = "0";
                    break;
                case 3:
                    this._omBtn.style.bottom = "0";
                    this._omBtn.style.left = "0";
                    break;
                default:
                    break
                }
            } else {
                var ak = this._btnWidth;
                var ai = this._btnHeight;
                var ah = this._opts.width;
                var aj = this._opts.height;
                this._omBtn.style.left = "auto";
                this._omBtn.style.top = "auto";
                this._omBtn.style.right = "auto";
                this._omBtn.style.bottom = "auto";
                switch (this._quad) {
                case 2:
                    this._omBtn.style.left = "0px";
                    this._omBtn.style.top = "0px";
                    break;
                case 1:
                    this._omBtn.style.left = ah - ak + "px";
                    this._omBtn.style.top = "0px";
                    break;
                case 4:
                    this._omBtn.style.top = aj - ai + "px";
                    this._omBtn.style.left = ah - ak + "px";
                    break;
                case 3:
                    this._omBtn.style.left = "0px";
                    this._omBtn.style.top = aj - ai + "px";
                    break;
                default:
                    break
                }
            }
        },
        _moveView: function() {
            this._omView.setPoint(this._map.centerPoint)
        },
        _onMainMoveEnd: function(ah) {
            switch (this._currentOp) {
            case "dragMap":
                this._setOMViewMvPos();
                this._currentOp = "";
                break;
            case "dragView":
                if (!this._opts.point) {
                    this._omViewMv.style.display = "none";
                    this._onMainMoveEnd.omFollow = true;
                    this._overviewMap.panTo(this._map.centerPoint, false, 90)
                } else {
                    this._setOMViewMvPos();
                    this._overviewMap.config.enableMouseDown = true
                }
                this._currentOp = "";
                break;
            default:
                if (this._opts.point == null) {
                    this._onMainMoveEnd.omFollow = true;
                    this._overviewMap.panTo(this._map.centerPoint, false, 90)
                } else {
                    this._setOMViewMvPos()
                }
                break
            }
        },
        _onMainZoomEnd: function() {
            var ah = this;
            ah._curOMZoomLevel = ah._getCurOMZoomLevel();
            if (ah._opts.point == null) {
                setTimeout(function() {
                    ah._overviewMap.centerAndZoom(ah._map.centerPoint, ah._curOMZoomLevel);
                    ah._omView.setPoint(ah._map.centerPoint);
                    ah._setRatio()
                },
                100)
            } else {
                setTimeout(function() {
                    ah._overviewMap.centerAndZoom(ah._opts.point, ah._curOMZoomLevel);
                    ah._omView.setPoint(ah._map.centerPoint);
                    ah._setRatio()
                },
                100)
            }
        },
        _onViewMapMoveEnd: function() {
            if (this._opts.point) {
                return
            }
            if (this._onMainMoveEnd.omFollow == true) {
                this._onMainMoveEnd.omFollow = false;
                this._setOMViewMvPos();
                this._overviewMap.config.enableMouseDown = true;
                return
            }
        },
        _checkOpts: function() {
            this._opts.width = this._opts.width > 0 ? this._opts.width: 150;
            this._opts.height = this._opts.height > 0 ? this._opts.height: 150;
            this._opts.padding = this._opts.padding >= 0 ? this._opts.padding: 8
        },
        hide: function() {
            this._opts.visible = false;
            if (this._container) {
                this._container.style.visibility = "hidden"
            }
            this.dispatchEvent(new ad("onhide"))
        },
        show: function() {
            this._opts.visible = true;
            if (this._container) {
                this._container.style.visibility = "visible"
            }
            this.dispatchEvent(new ad("onshow"))
        }
    });
    function A(ah) {
        z.call(this);
        this._opts = k.extend(k.extend(this._opts, {
            anchor: f.ANCHOR_BOTTOM_LEFT,
            offsetX: 5,
            offsetY: 3,
            color: "black",
            unit: "metric"
        }), ah);
        this._defaultAnchor = f.ANCHOR_BOTTOM_LEFT;
        if (this._opts.anchor < f.ANCHOR_TOP || this._opts.anchor > f.ANCHOR_BOTTOM_RIGHT) {
            this._opts.anchor = this._defaultAnchor
        }
        this._units = {
            metric: {
                name: "metric",
                conv: 1,
                incon: 1000,
                u1: "米",
                u2: "公里"
            },
            us: {
                name: "us",
                conv: 3.2808,
                incon: 5279.856,
                u1: "英尺",
                u2: "英里"
            }
        };
        if (!this._units[this._opts.unit]) {
            this._opts.unit = "metric"
        }
        this._scaleText = null;
        this._numberArray = []
    }
    A.inherits(z, "ScaleControl");
    k.extend(A.prototype, {
        initialize: function(ai) {
            if (z.prototype.initialize.call(this, ai) == false) {
                return false
            }
            this._render();
            this._initNumArray();
            this._updateScale();
            var ah = this;
            ai.addEventListener("zoomend", 
            function(aj) {
                ah._updateScale()
            });
            ai.addEventListener("load", 
            function(aj) {
                ah._updateScale()
            });
            ai.addEventListener("moveend", 
            function(aj) {
                ah._updateScale()
            });
            ai.addEventListener("dragend", 
            function(aj) {
                ah._updateScale()
            })
        },
        _render: function() {
            z.prototype._render.call(this);
            k.ac(this._container, "BMap_scaleCtrl");
            this._container.innerHTML = this._generateHTML();
            this.setColor(this._opts.color);
            this._scaleText = this._container.children[0];
            z.prototype._setPosition.call(this)
        },
        _generateHTML: function() {
            var ah = '<div class="BMap_scaleTxt" unselectable="on"></div><div class="BMap_scaleBar BMap_scaleHBar"></div><div class="BMap_scaleBar BMap_scaleLBar"></div><div class="BMap_scaleBar BMap_scaleRBar"></div>';
            return ah
        },
        setColor: function(ah) {
            this._opts.color = ah + "";
            if (!this._container) {
                return
            }
            this._container.children[0].style.backgroundColor = "transparent";
            this._container.children[0].style.color = ah;
            for (var aj = 1, ai = this._container.children.length; aj < ai; aj++) {
                this._container.children[aj].style.backgroundColor = ah
            }
        },
        getColor: function() {
            return this._opts.color
        },
        setUnit: function(ah) {
            this._opts.unit = this._units[ah] && this._units[ah].name || this._opts.unit;
            if (!this._map) {
                return
            }
            this._updateScale()
        },
        getUnit: function() {
            return this._opts.unit
        },
        _setScaleText: function(ai, ah) {
            if (typeof ai != "number" || typeof ah != "string") {
                return
            }
            this._scaleText.innerHTML = ai + "&nbsp;" + ah
        },
        _updateScale: function() {
            var am = new y(this._map.centerPoint[0], this._map.centerPoint[1] + 500000);
            var an = Math.abs(this._map.pointToPixel(this._map.centerPoint).y - this._map.pointToPixel(am).y);
            var aq = af.getDistanceByMC(this._map.centerPoint, am) / an;
            if (aq == 0) {
                return
            }
            var ao = this._convertUnit(aq, this._opts.unit);
            var ah = 0;
            var ai = this._units[this._opts.unit].incon;
            for (var ak = 0, aj = this._numberArray.length; ak < aj; ak++) {
                ah = this._numberArray[ak] / ao;
                if (ah > 60 && ah < 150) {
                    break
                }
            }
            var al = this._numberArray[ak];
            var ap = al >= ai ? this._units[this._opts.unit].u2: this._units[this._opts.unit].u1;
            if (al >= ai) {
                ao = ao / ai;
                for (var ak = 0, aj = this._numberArray.length; ak < aj; ak++) {
                    ah = this._numberArray[ak] / ao;
                    if (ah > 60 && ah < 150) {
                        break
                    }
                }
                al = this._numberArray[ak]
            }
            this._setScaleText(al, ap);
            if (Math.round(ah) % 2 != 0 && k.Browser.ie == 6) {
                ah = ah + 1
            }
            this._container.style.width = Math.round(ah) + "px"
        },
        _convertUnit: function(ah, ai) {
            ai = ai || "metric";
            if (this._units[ai]) {
                return ah * this._units[ai].conv
            }
            return ah
        },
        _initNumArray: function() {
            var ai = 0.5;
            for (var aj = 1, ah = H[this._map.mapType].zoomLevelMax * 2; aj < ah; aj++) {
                if (aj % 3 == 0) {
                    ai = ai * 2 + Math.pow(10, aj / 3 - 1)
                } else {
                    ai = ai * 2
                }
                this._numberArray.push(ai)
            }
        }
    });
    function V(ah) {
        z.call(this);
        this._opts = k.extend(k.extend(this._opts, {
            type: 0,
            anchor: f.ANCHOR_TOP_LEFT,
            offsetX: 10,
            offsetY: 10
        }), ah);
        this.controlHeight = [{
            height: 227,
            zoomHeight: 168,
            sliderHeight: 133,
            sliderCHeight: 124
        },
        {
            height: 97,
            zoomHeight: 38,
            sliderHeight: 0,
            sliderCHeight: 0
        },
        {
            height: 57,
            zoomHeight: 0,
            sliderHeight: 0,
            sliderCHeight: 0
        },
        {
            height: 38,
            zoomHeight: 38,
            sliderHeight: 0,
            sliderCHeight: 0
        }];
        this._defaultAnchor = f.ANCHOR_TOP_LEFT;
        if (this._opts.anchor < f.ANCHOR_TOP || this._opts.anchor > f.ANCHOR_BOTTOM_RIGHT) {
            this._opts.anchor = this._defaultAnchor
        }
        if (this._opts.type < 0 || this._opts.type > 3) {
            this._opts.type = 0
        }
        this._maxTotalZoomLv = 18;
        this._minZoomLevel = -1;
        this._maxZoomLevel = -1;
        this._totalZoomLv = -1;
        this._sliderInterval = 7;
        this._minBarY = 1;
        this._maxBarY = -1;
        this._curBarY = -1;
        this._zoomDom = null;
        this._sliderDom = null;
        this._sliderBaseDom = null;
        this._zoomEndTimerId = null
    }
    V.inherits(z, "StandardMapControl");
    k.extend(V.prototype, {
        initialize: function(ai) {
            if (z.prototype.initialize.call(this, ai) == false) {
                return false
            }
            this._setParam();
            this._render();
            this._bind();
            this._setSliderZoomLv(ai.zoomLevel);
            var ah = this;
            ai.addEventListener("zoomend", 
            function(aj) {
                ah._setSliderZoomLv(ah._map.zoomLevel);
                var ak = ah._container;
                if (ah._msover) {
                    return
                }
                ah._hideTimerId = setTimeout(function() {
                    if (ah._opts.type == 0) {
                        k.rc(ak.children[3], "hvr")
                    }
                },
                1000)
            });
            ah._map.addEventListener("mousewheel", 
            function() {
                if (ah._map.config.enableWheelZoom) {
                    var aj = ah._container;
                    if (ah._opts.type == 0) {
                        k.ac(aj.children[3], "hvr")
                    }
                    if (ah._hideTimerId) {
                        clearTimeout(ah._hideTimerId);
                        ah._hideTimerId = null
                    }
                }
            });
            ai.addEventListener("load", 
            function(aj) {
                ah._setSliderZoomLv(ah._map.zoomLevel)
            })
        },
        _setParam: function() {
            var ah = this._map.mapType;
            this._minZoomLevel = H[ah].zoomLevelMin;
            this._maxZoomLevel = H[ah].zoomLevelMax;
            this._totalZoomLv = this._maxZoomLevel - this._minZoomLevel + 1;
            this._maxBarY = this._minBarY + (this._totalZoomLv - 1) * this._sliderInterval
        },
        _render: function() {
            z.prototype._render.call(this);
            var ai = k.Browser.ie == 6 ? " BMap_ie6": "";
            var ah = " BMap_stdMpType" + this._opts.type;
            this._container.className = "BMap_stdMpCtrl" + ai + ah;
            this._container.innerHTML = this._generateHTML(this._opts.type);
            if (!k.Browser.opera) {
                this._setSliderBarCursor("url(styles/bmap/openhand.cur), default")
            } else {
                this._setSliderBarCursor("pointer")
            }
            var aj = this._container;
            this._zoomDom = k.G(aj.children[1]);
            this._sliderDom = k.G(aj.children[2]);
            this._sliderBaseDom = k.G(aj.children[2].children[0]);
            this.setType(this._opts.type)
        },
        _setSliderHeight: function() {
            var ai = this._opts.type;
            var ak = this.controlHeight[ai].height;
            var al = this.controlHeight[ai].zoomHeight;
            var am = this.controlHeight[ai].sliderHeight;
            var aj = this.controlHeight[ai].sliderCHeight;
            var ah = (this._maxTotalZoomLv - this._totalZoomLv) * this._sliderInterval;
            this._container.style.height = ak - ah + "px";
            this._zoomDom.style.height = al - ah + "px";
            this._sliderDom.style.height = am - ah + "px";
            this._sliderBaseDom.style.height = aj - ah + "px"
        },
        _generateHTML: function() {
            var ah = [];
            ah.push(this._generatePanHTML());
            ah.push(this._generateZoomHTML());
            ah.push(this._generateSliderHTML());
            ah.push(this._generateZoomBalloonHTML());
            return ah.join("")
        },
        _generatePanHTML: function() {
            var ah = '<div class="BMap_stdMpPan"><div class="BMap_button BMap_panN" title="向上平移"></div><div class="BMap_button BMap_panW" title="向左平移"></div><div class="BMap_button BMap_panE" title="向右平移"></div><div class="BMap_button BMap_panS" title="向下平移"></div><div class="BMap_stdMpPanBg BMap_smcbg"></div></div>';
            return ah
        },
        _generateZoomHTML: function() {
            var ah = '<div class="BMap_stdMpZoom"><div class="BMap_button BMap_stdMpZoomIn" title="放大一级"><div class="BMap_smcbg"></div></div><div class="BMap_button BMap_stdMpZoomOut" title="缩小一级"><div class="BMap_smcbg"></div></div></div>';
            return ah
        },
        _generateSliderHTML: function() {
            var ah = '<div class="BMap_stdMpSlider"><div class="BMap_stdMpSliderBgTop"><div class="BMap_smcbg"></div></div><div class="BMap_stdMpSliderBgBot"><div class="BMap_smcbg"></div></div><div class="BMap_stdMpSliderMask" title="放置到此级别"></div><div class="BMap_stdMpSliderBar" title="拖动缩放"><div class="BMap_smcbg"></div></div></div>';
            return ah
        },
        _generateZoomBalloonHTML: function() {
            var ah = '<div class="BMap_zlHolder"><div class="BMap_zlSt"><div class="BMap_smcbg"></div></div><div class="BMap_zlCity"><div class="BMap_smcbg"></div></div><div class="BMap_zlProv"><div class="BMap_smcbg"></div></div><div class="BMap_zlCountry"><div class="BMap_smcbg"></div></div></div>';
            return ah
        },
        setType: function(ah) {
            if (typeof ah == "number" && ah >= 0 && ah <= 3) {
                this._opts.type = ah
            } else {
                this._opts.type = 0
            }
            if (!this._map) {
                return
            }
            var ai = this._container;
            ai.className = ai.className.replace(/BMap_stdMpType\d/, "BMap_stdMpType" + this._opts.type);
            this._setSliderHeight();
            this.setAnchor(this._opts.anchor)
        },
        getType: function() {
            return this._opts.type
        },
        _bind: function() {
            var ai = this;
            var am = ai._container;
            k.on(am, "mouseover", 
            function() {
                ai._msover = true;
                if (ai._hideTimerId) {
                    clearTimeout(ai._hideTimerId)
                }
                if (ai._opts.type == 0) {
                    k.ac(am.children[3], "hvr")
                }
            });
            k.on(am, "mouseout", 
            function() {
                if (ai._hideTimerId) {
                    clearTimeout(ai._hideTimerId)
                }
                ai._msover = false;
                ai._hideTimerId = setTimeout(function() {
                    if (ai._opts.type == 0) {
                        k.rc(am.children[3], "hvr")
                    }
                    ai._hideTimerId = null
                },
                1000)
            });
            k.on(am.children[0].children[0], "click", 
            function() {
                ai._panBy(0, Math.round(ai._map.height * 0.3))
            });
            k.on(am.children[0].children[1], "click", 
            function() {
                ai._panBy(Math.round(ai._map.width * 0.3), 0)
            });
            k.on(am.children[0].children[2], "click", 
            function() {
                ai._panBy( - Math.round(ai._map.width * 0.3), 0)
            });
            k.on(am.children[0].children[3], "click", 
            function() {
                ai._panBy(0, -Math.round(ai._map.height * 0.3))
            });
            k.on(am.children[0].children[4], "click", 
            function() {
                ai._reset()
            });
            k.on(am.children[1].children[0], "click", 
            function() {
                ai._zoomIn()
            });
            k.on(am.children[1].children[1], "click", 
            function() {
                ai._zoomOut()
            });
            for (var ah = 1; ah < 6; ah++) {
                k.on(am.children[0].children[ah], "mouseup", 
                function(an) {
                    if ((ai._map.currentOperation & g.stdMapCtrlDrag) == 0 && (ai._map.currentOperation & g.drag) == 0) {
                        ae(an)
                    }
                });
                k.on(am.children[0].children[ah], "contextmenu", 
                function(an) {
                    N(an)
                });
                k.on(am.children[0].children[ah], "click", 
                function(an) {
                    N(an)
                })
            }
            k.on(am.children[1].children[0], "mouseup", 
            function(an) {
                if ((ai._map.currentOperation & g.stdMapCtrlDrag) == 0 && (ai._map.currentOperation & g.drag) == 0) {
                    ae(an)
                }
            });
            k.on(am.children[1].children[1], "mouseup", 
            function(an) {
                if ((ai._map.currentOperation & g.stdMapCtrlDrag) == 0 && (ai._map.currentOperation & g.drag) == 0) {
                    ae(an)
                }
            });
            k.on(am.children[1].children[0], "contextmenu", 
            function(an) {
                N(an)
            });
            k.on(am.children[1].children[1], "contextmenu", 
            function(an) {
                N(an)
            });
            k.on(am.children[2].children[2], "mouseup", 
            function(an) {
                if ((ai._map.currentOperation & g.stdMapCtrlDrag) == 0 && (ai._map.currentOperation & g.drag) == 0) {
                    ae(an)
                }
            });
            k.on(am.children[1].children[0], "click", 
            function(an) {
                ae(an)
            });
            k.on(am.children[1].children[1], "click", 
            function(an) {
                ae(an)
            });
            k.on(am.children[2].children[2], "click", 
            function(an) {
                ae(an)
            });
            k.on(am.children[2].children[3], "mouseup", 
            function(an) {
                if (an.button == 2) {
                    ae(an)
                }
            });
            k.on(am.children[2].children[3], "contextmenu", 
            function(an) {
                N(an)
            });
            k.on(am.children[3].children[0], "click", 
            function(an) {
                map.zoomTo(18)
            });
            k.on(am.children[3].children[1], "click", 
            function(an) {
                map.zoomTo(12)
            });
            k.on(am.children[3].children[2], "click", 
            function(an) {
                map.zoomTo(8)
            });
            k.on(am.children[3].children[3], "click", 
            function(an) {
                map.zoomTo(4)
            });
            k.on(am.children[2].children[2], "mousedown", 
            function(ao) {
                ao = window.event || ao;
                var an = 0;
                if (typeof ao.layerY != "undefined") {
                    an = ao.layerY
                } else {
                    if (typeof ao.offsetY != "undefined") {
                        an = ao.offsetY
                    }
                }
                var ap = 0;
                ap = (ai._maxZoomLevel + 1) - Math.round(ai._totalZoomLv * parseFloat(an / (ai._totalZoomLv * ai._sliderInterval)));
                ai._map.zoomTo(ap)
            });
            k.on(am.children[2].children[3], "mouseover", 
            function() {
                k.ac(am.children[2].children[3], "h")
            });
            k.on(am.children[2].children[3], "mouseout", 
            function() {
                if ((ai._map.currentOperation & g.stdMapCtrlDrag) == 0) {
                    k.rc(am.children[2].children[3], "h")
                }
            });
            var ak = function(an) {
                var an = window.event || an;
                if (an.button == 2) {
                    return
                }
                if ((k.Browser.ie && an.button != 1)) {
                    return
                }
                if (am.children[2].children[3].setCapture) {
                    am.children[2].children[3].setCapture()
                }
                ai._map.currentOperation |= g.stdMapCtrlDrag;
                ai._bind.my = an.pageY || an.clientY || 0;
                if (!k.Browser.opera) {
                    ai._setSliderBarCursor("url(styles/bmap/closedhand.cur), default")
                }
                k.on(document, "mousemove", al);
                k.on(document, "mouseup", aj);
                ae(an);
                return N(an)
            };
            var al = function(ao) {
                if ((ai._map.currentOperation & g.stdMapCtrlDrag) != 0) {
                    var ao = window.event || ao;
                    var ap = ao.pageY || ao.clientY;
                    var an = ai._curBarY + ap - ai._bind.my;
                    if (an >= ai._minBarY && an <= ai._maxBarY) {
                        k.G(am.children[2].children[3]).style.top = an + "px"
                    }
                }
            };
            var aj = function(ao) {
                if ((ai._map.currentOperation & g.stdMapCtrlDrag) != 0) {
                    var an = k.G(am.children[2].children[3]);
                    ai._curBarY = parseInt(an.style.top);
                    k.rc(ai._container.children[2].children[3], "h");
                    ai._map.currentOperation &= ~g.stdMapCtrlDrag;
                    if (am && am.children[2] && am.children[2].children[3] && am.children[2].children[3].releaseCapture) {
                        am.children[2].children[3].releaseCapture()
                    }
                    ai._msover = false;
                    if (!k.Browser.opera) {
                        ai._setSliderBarCursor("url(styles/bmap/openhand.cur), default")
                    }
                    var ap = (ai._maxZoomLevel + 1) - Math.round(parseFloat(ai._curBarY - ai._minBarY) / parseFloat(ai._maxBarY - ai._minBarY) * (ai._totalZoomLv - 1) + 1);
                    ai._map.zoomTo(ap);
                    k.un(document, "mousemove", al);
                    k.un(document, "mouseup", aj)
                }
            };
            k.on(am.children[2].children[3], "mousedown", ak)
        },
        _setSliderBarCursor: function(ah) {
            this._container.children[2].children[3].style.cursor = ah
        },
        _panBy: function(ai, ah) {
            this._map.panBy(ai, ah)
        },
        _reset: function() {
            this._map.reset()
        },
        _zoomIn: function() {
            this._map.zoomIn()
        },
        _zoomOut: function() {
            this._map.zoomOut()
        },
        _setSliderZoomLv: function(ai) {
            var ah = (this._maxZoomLevel - ai) * this._sliderInterval + this._minBarY;
            this._curBarY = ah > this._maxBarY ? this._maxBarY: ah < this._minBarY ? this._minBarY: ah;
            this._container.children[2].children[3].style.top = this._curBarY + "px"
        }
    });
    function h(ah) {
        z.call(this);
        this._opts = k.extend(k.extend(this._opts, {
            anchor: f.ANCHOR_TOP_RIGHT,
            offsetX: 6,
            offsetY: 2
        }), ah);
        this._defaultAnchor = f.ANCHOR_TOP_RIGHT;
        if (this._opts.anchor < f.ANCHOR_TOP || this._opts.anchor > f.ANCHOR_BOTTOM_RIGHT) {
            this._opts.anchor = this._defaultAnchor
        }
        this._checkButtonArray = [];
        this._items = []
    }
    h.inherits(z, "ToolbarControl");
    k.extend(h.prototype, {
        initialize: function(ah) {
            z.prototype.initialize.call(this, ah);
            this._render()
        },
        _render: function() {
            z.prototype._render.call(this);
            k.ac(this._container, "BMap_tbarContainer")
        },
        addItem: function(aj) {
            if (!aj || !aj._type || aj._type != "toolbarItem") {
                return
            }
            for (var ai = 0, ah = this._items.length; ai < ah; ai++) {
                if (this._items[ai] === aj) {
                    return
                }
            }
            this._items.push(aj);
            if (aj._opts.isCheckButton == true) {
                this._checkButtonArray.push(aj)
            }
            aj.initialize(this._map, this);
            z.prototype._setPosition.call(this)
        },
        removeItem: function(aj) {
            if (!aj || !aj._type || aj._type != "toolbarItem") {
                return
            }
            for (var ai = 0, ah = this._items.length; ai < ah; ai++) {
                if (this._items[ai] === aj) {
                    aj.remove();
                    this._items.splice(ai, 1);
                    break
                }
            }
            for (var ai = 0, ah = this._checkButtonArray.length; ai < ah; ai++) {
                if (this._checkButtonArray[ai] === aj) {
                    this._checkButtonArray.splice(ai, 1);
                    return
                }
            }
        },
        _onToolbarItemClicked: function(ak) {
            var aj = ak.target;
            if (aj._checked == false) {
                return
            }
            for (var ai = 0, ah = this._checkButtonArray.length; ai < ah; ai++) {
                if (this._checkButtonArray[ai] !== aj && this._checkButtonArray[ai]._checked == true) {
                    this._checkButtonArray[ai].btnClick()
                }
            }
        },
        unCheckOthers: function(ai) {
            for (var aj = 0, ah = this._checkButtonArray.length; aj < ah; aj++) {
                if (this._checkButtonArray[aj] !== ai && this._checkButtonArray[aj]._checked == true) {
                    this._checkButtonArray[aj].btnClick()
                }
            }
        }
    });
    function p() {
        this._controls = []
    }
    w.register(function(ai) {
        var ah = new p();
        ai.addEventListener("onaddcontrol", 
        function(aj) {
            ah.add(aj.target)
        })
    });
    p.prototype.add = function(ah) {
        this._controls.push(ah);
        this.resolveOverlap(ah)
    };
    p.prototype.resolveOverlap = function(am) {
        var ak = null;
        var ai = null;
        if (am.toString() == "CopyrightControl") {
            ak = am;
            for (var aj = 0, ah = this._controls.length - 1; aj < ah; aj++) {
                if (this._controls[aj].toString() == "OverviewMapControl") {
                    ai = this._controls[aj];
                    break
                }
            }
        } else {
            if (am.toString() == "OverviewMapControl") {
                ai = am;
                for (var aj = 0, ah = this._controls.length - 1; aj < ah; aj++) {
                    if (this._controls[aj].toString() == "CopyrightControl") {
                        ak = this._controls[aj];
                        break
                    }
                }
            }
        }
        if (!ak || !ai || ak.getAnchor() != f.ANCHOR_BOTTOM_RIGHT || ai.getAnchor() != f.ANCHOR_BOTTOM_RIGHT) {
            return
        }
        var al = ak.getOffset();
        ak.setOffset(parseInt(ai.getDom().style.width) + al.x, al.y);
        ai.addEventListener("viewchanging", 
        function(ao) {
            var an = ak.getDom().style;
            an.right = al.x + parseInt(ao.target.getDom().style.width) + "px"
        });
        ai.addEventListener("viewchanged", 
        function(ao) {
            var an = ak.getDom().style;
            an.right = al.x + parseInt(ao.target.getDom().style.width) + "px"
        })
    };
    function l(ah, ak, aj, ai) {
        this.minX = ah;
        this.minY = ak;
        this.maxX = aj;
        this.maxY = ai
    }
    k.extend(l.prototype, {
        getMaxX: function() {
            return this.maxX
        },
        getMaxY: function() {
            return this.maxY
        },
        getMinX: function() {
            return this.minX
        },
        getMinY: function() {
            return this.minY
        },
        containsBounds: function(ah) {
            if (!ah || ah.toString() != "Bounds") {
                return
            }
            return (ah.minX > this.minX && ah.maxX < this.maxX && ah.minY > this.minY && ah.maxY < this.maxY)
        },
        getCenterPoint: function() {
            var ah = (this.minX + this.maxX) / 2;
            var ai = (this.minY + this.maxY) / 2;
            return new y(ah, ai)
        },
        intersects: function(aj) {
            if (!aj || aj.toString() != "Bounds") {
                return
            }
            if (Math.max(aj.minX, aj.maxX) < Math.min(this.minX, this.maxX) || Math.min(aj.minX, aj.maxX) > Math.max(this.minX, this.maxX) || Math.max(aj.minY, aj.maxY) < Math.min(this.minY, this.maxY) || Math.min(aj.minY, aj.maxY) > Math.max(this.minY, this.maxY)) {
                return null
            }
            var al = Math.max(this.minX, aj.minX);
            var ai = Math.min(this.maxX, aj.maxX);
            var ak = Math.max(this.minY, aj.minY);
            var ah = Math.min(this.maxY, aj.maxY);
            return new l(al, ak, ai, ah)
        },
        containsPoint: function(ah) {
            if (!ah || ah.toString() != "Point") {
                return
            }
            return (ah[0] >= this.minX && ah[0] <= this.maxX && ah[1] >= this.minY && ah[1] <= this.maxY)
        },
        extend: function(ah) {
            if (!ah || ah.toString() != "Point") {
                return
            }
            var aj = ah[0],
            ai = ah[1];
            if (this.minX > aj) {
                this.minX = aj
            }
            if (this.maxX < aj) {
                this.maxX = aj
            }
            if (this.minY > ai) {
                this.minY = ai
            }
            if (this.maxY < ai) {
                this.maxY = ai
            }
        },
        getIntersectLine: function(ah) {
            if (!ah || ah.toString() != "Line") {
                return
            }
            var ai = ah.sPoint;
            var ak = ah.ePoint;
            var aj = [];
            if (ai[1] == ak[1]) {
                if (ai[0] == ak[0]) {
                    return null
                }
                if (ai[1] > this.minY && ai[1] < this.maxY) {}
                var ah = new Line(aj[0], aj[1]);
                return ah
            }
        },
        toString: function() {
            return "Bounds"
        }
    });
    function y(ah, ai) {
        ah = isNaN(ah) ? 0: parseFloat(ah);
        ai = isNaN(ai) ? 0: parseFloat(ai);
        this[0] = this["lng"] = ah;
        this[1] = this["lat"] = ai
    }
    y.inherits(o, "Point");
    y.prototype.equals = function(ah) {
        if (!ah || ah.toString() != "Point") {
            return
        }
        if (this.lat == ah.lat && this.lng == ah.lng) {
            return true
        }
        return false
    };
    function u(aj, ak) {
        aj = k.G(aj);
        if (!aj) {
            return null
        }
        o.call(this);
        this.container = aj;
        aj.style.overflow = "hidden";
        aj.style.position = "relative";
        aj.unselectable = "on";
        aj.style.backgroundImage = "url(styles/bmap/bg.png)";
        aj.onselectstart = function() {
            return false
        };
        aj.innerHTML = this.render();
        this.width = 0;
        this.height = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.platform = aj.childNodes[0];
        this.maskLayer = this.platform.childNodes[0];
        this._bind();
        this.centerPoint = null;
        this.lastPoint = null;
        this.zoomLevel = 0;
        this.lastLevel = 0;
        this.mapType = "B_NORMAL_MAP";
        this.defaultZoomLevel = null;
        this.defaultCenter = null;
        this.currentOperation = 0;
        this.config = {
            clickInterval: 200,
            movingInterval: 0,
            enableDraging: true,
            enableKeyboard: true,
            enableClickPan: false,
            enableDblclickZoom: true,
            enableWheelZoom: true,
            enableMouseDown: true,
            dblclickZoomStep: 1,
            zoomStep: 1,
            zoomerSizeMin: 60,
            zoomerSizeMax: 120,
            zoomerDuration: 300,
            actionDuration: 450,
            defaultCursor: "styles/bmap/openhand.cur",
            draggingCursor: "styles/bmap/closedhand.cur",
            isOverviewMap: false,
            centerPoint: {},
            zoomLevel: 10,
            enableMapArea: true
        };
        this.setConfig(ak);
        this.temp = {
            undoList: [],
            operating: false,
            arrow: 0,
            undoPoint: 0,
            undoLength: 30,
            lastDomMoveTime: 0,
            lastMovingTime: 0,
            canKeyboard: false,
            I: function(al) {
                return k.I(al)
            }
        };
        this.platform.style.cursor = "url(" + this.config.defaultCursor + "), default";
        if (k.Browser.ie) {
            try {
                document.execCommand("BackgroundImageCache", false, true)
            } catch(ai) {}
        }
        for (var ah = 0; ah < w._register.length; ah++) {
            w._register[ah](this)
        }
    }
    u.inherits(o, "Map");
    k.extend(u.prototype, {
        render: function() {
            var ah = [];
            ah.push('<font id=platform style="overflow: visible; position: absolute; ">');
            ah.push('<font id=mask class="BMap_mask" style="position:absolute; top:0px; left:0px;');
            ah.push(' z-index:-1; overflow:hidden;">&nbsp;</font>');
            ah.push("</font>");
            return ah.join("")
        },
        _bind: function() {
            var aj = this;
            var ai = this.platform;
            function ak(am, ao) {
                var an = am.srcElement || am.target;
                var al = am.offsetX || am.layerX || 0;
                var ap = am.offsetY || am.layerY || 0;
                if (an.nodeType != 1) {
                    an = an.parentNode
                }
                while (an && an != aj.container) {
                    if (! (an.clientWidth == 0 && an.clientHeight == 0 && an.offsetParent && an.offsetParent.nodeName == "TD") && an.namespaceURI != "http://www.w3.org/2000/svg") {
                        al += an.offsetLeft || 0;
                        ap += an.offsetTop || 0
                    } else {
                        if (an.namespaceURI == "http://www.w3.org/2000/svg") {
                            if (navigator.userAgent.indexOf("Safari") > -1 && an.tagName != "svg") {
                                an = aj.palette
                            }
                            if (aj.palette) {
                                al += parseFloat(aj.palette.style.left) + aj.offsetX;
                                ap += parseFloat(aj.palette.style.top) + aj.offsetY
                            }
                        }
                    }
                    an = an.offsetParent
                }
                ao.offsetX = al;
                ao.offsetY = ap;
                return ao
            }
            k.on(aj.platform, "mousedown", 
            function(ao) {
                if (!aj.config.enableMouseDown) {
                    return
                }
                var ao = window.event || ao;
                aj.temp.operating = true;
                var an = ao.srcElement || ao.target;
                aj._bind.upValid = true;
                if (aj._bind.dTimer) {
                    clearTimeout(aj._bind.dTimer);
                    delete aj._bind.dTimer
                }
                aj._bind.dTimer = setTimeout(function() {
                    aj._bind.upValid = false
                },
                500);
                var al = an;
                while (al) {
                    if (al == aj.container) {
                        break
                    }
                    if (al.className == "BMap_Marker") {
                        return
                    }
                    al = al.parentNode
                }
                if (an.nodeType != 1) {
                    an = an.parentNode
                }
                if (aj.platform.setCapture) {
                    aj.platform.setCapture()
                }
                aj.temp.tpx = ao.clientX || ao.pageX;
                aj.temp.tpy = ao.clientY || ao.pageY;
                aj.dispatchEvent(ak(ao, new ad("onmousedown").inherit(ao)));
                if (aj.config.enableDraging && !(aj.currentOperation & g.drag) && ao.button != 2) {
                    var am = aj.temp;
                    am.mx = (ao.clientX || ao.pageX);
                    am.my = (ao.clientY || ao.pageY);
                    am.pl = aj.offsetX;
                    am.pt = aj.offsetY;
                    aj.currentOperation |= g.drag;
                    if (!aj.temp._hotspotIndex) {
                        aj.platform.style.cursor = "url(" + aj.config.draggingCursor + "), move"
                    } else {
                        aj.platform.style.cursor = "pointer"
                    }
                }
                N(ao)
            });
            k.on(document, "mousemove", 
            function(ao) {
                if (aj.temp.tpx || aj.temp.tpy) {
                    aj.temp.mox = ao.clientX || ao.pageX - aj.temp.tpx;
                    aj.temp.moy = ao.clientY || ao.pageY - aj.temp.tpy
                }
                var an = ak(ao, new ad("ondragstart").inherit(ao));
                var ap = new Date().getTime();
                if (ap - aj.temp.lastDomMoveTime < 18) {
                    return false
                }
                aj.temp.lastDomMoveTime = ap;
                if (aj.currentOperation & g.drag && aj.config.enableDraging) {
                    if (aj.platform.style.cursor != "url(" + aj.config.draggingCursor + "), move") {
                        aj.platform.style.cursor = "url(" + aj.config.draggingCursor + "), move"
                    }
                    if (!aj.temp._moved) {
                        aj.dispatchEvent(an)
                    }
                    var ao = window.event || ao;
                    var au = aj.temp;
                    var at = ao.clientX || ao.pageX || 0;
                    var ar = ao.clientY || ao.pageY || 0;
                    if (au.mx == 0 && au.my == 0 && aj.temp.keyboardDrag) {
                        au.mx = at;
                        au.my = ar;
                        au.pl = aj.offsetX;
                        au.pt = aj.offsetY
                    }
                    if (at - au.mx != 0 || ar - au.my != 0) {
                        aj.temp._moved = true;
                        aj._setPlatformPosition(au.pl + at - au.mx, au.pt + ar - au.my)
                    }
                }
                if (aj.arrHotspot && aj.zoomLevel >= 4 && aj.zoomLevel <= 9 && !(aj.currentOperation & g.drag)) {
                    for (var am = aj.arrHotspot.length - 1; am >= 0; am--) {
                        var aq = aj.arrHotspot[am];
                        var al = aj.pointToPixel(aq.point);
                        if (al.x < aj.width && al.y < aj.height) {
                            if (aj.zoomLevel > 4 && aq.zoomLevel <= 4) {
                                continue
                            }
                            if ((al.x - an.offsetX < 6 && al.x - an.offsetX > -3) && Math.abs(al.y - an.offsetY) < 6 && aj.zoomLevel >= aq.zoomLevel) {
                                aj.platform.style.cursor = "pointer";
                                aj.temp._hotspotIndex = am;
                                break
                            } else {
                                delete aj.temp._hotspotIndex
                            }
                        }
                    }
                    if (typeof aj.temp._hotspotIndex == "undefined") {
                        if (aj.platform.style.cursor != "url(" + aj.config.defaultCursor + "), default") {
                            aj.platform.style.cursor = "url(" + aj.config.defaultCursor + "), default"
                        }
                    }
                }
                if (aj.arrHotspot && (aj.zoomLevel < 4 || aj.zoomLevel > 9) && typeof aj.temp._hotspotIndex != "undefined") {
                    delete aj.temp._hotspotIndex;
                    if (aj.platform.style.cursor != "url(" + aj.config.defaultCursor + "), default") {
                        aj.platform.style.cursor = "url(" + aj.config.defaultCursor + "), default"
                    }
                }
                N(ao)
            });
            k.on(document, "mouseup", 
            function(al) {
                if (aj.platform.releaseCapture) {
                    aj.platform.releaseCapture()
                }
                if (aj.temp.preEnableClickPan) {
                    aj.enableClickPan(true)
                }
                if (aj.currentOperation & g.drag && aj.config.enableDraging) {
                    var al = window.event || al;
                    aj.currentOperation ^= g.drag;
                    if (!aj.temp._hotspotIndex) {
                        aj.platform.style.cursor = "url(" + aj.config.defaultCursor + "), default"
                    } else {
                        if (!k.Browser.ie) {
                            aj.platform.style.cursor = "pointer"
                        }
                    }
                    if (aj.temp._moved) {
                        aj.dispatchEvent(ak(al, new ad("ondragend").inherit(al)))
                    } else {
                        if (aj._bind.upValid == true) {
                            aj.closeInfoWindow()
                        }
                    }
                    aj.lastPoint = aj.centerPoint;
                    aj.temp._moved = false
                }
                aj.temp.operating = false
            });
            function ah(am) {
                if (aj.config.enableWheelZoom) {
                    aj.currentOperation |= g.mousewheel;
                    var am = window.event || am;
                    aj.lastLevel = aj.zoomLevel;
                    var al = new ad("onmousewheel");
                    al.trend = am.wheelDelta >= 0 || am.detail < 0;
                    if (al.trend == true && aj.zoomLevel == H[aj.mapType].zoomLevelMax || al.trend == false && aj.zoomLevel == H[aj.mapType].zoomLevelMin) {
                        aj.currentOperation ^= g.mousewheel;
                        N(am);
                        return
                    }
                    ak(am, al.inherit(am));
                    aj.dispatchEvent(al);
                    aj.currentOperation ^= g.mousewheel;
                    aj.saveScene(al);
                    am.returnValue = false
                }
            }
            k.on(aj.container, "mousewheel", ah);
            if (window.addEventListener) {
                aj.container.addEventListener("DOMMouseScroll", ah, false)
            }
            k.on(aj.platform, "click", 
            function(am) {
                var al = new ad("onclick");
                ak(am, al.inherit(am));
                if (!aj.currentOperation) {
                    if (aj.temp.mox > 0 || aj.temp.moy > 0) {
                        if (aj.config.enableDraging) {
                            if (aj.config.enableClickPan == true) {
                                aj.enableClickPan(true)
                            }
                        } else {
                            aj.temp.preEnableClickPan = aj.config.enableClickPan;
                            aj.enableClickPan(false)
                        }
                    } else {
                        if (aj.config.enableClickPan) {
                            aj.enableClickPan(true)
                        }
                    }
                    aj.temp.tpx = null;
                    aj.temp.tpy = null;
                    aj.temp.mox = 0;
                    aj.temp.moy = 0;
                    if (aj._bind.clicker) {
                        clearTimeout(aj._bind.clicker)
                    }
                    aj.temp.hotspotIndex = aj.temp._hotspotIndex;
                    aj._bind.clicker = setTimeout(function() {
                        aj._bind.clicker = false;
                        aj.dispatchEvent(al);
                        delete aj.temp.hotspotIndex
                    },
                    aj.config.clickInterval)
                }
            });
            k.on(aj.platform, "dblclick", 
            function(am) {
                if (!aj.currentOperation) {
                    if (aj._bind.clicker) {
                        clearTimeout(aj._bind.clicker);
                        aj._bind.clicker = false
                    }
                    aj.currentOperation |= g.dblclick;
                    var al = new ad("ondblclick").inherit(am);
                    aj.dispatchEvent(ak(am, al));
                    aj.currentOperation ^= g.dblclick
                }
            });
            aj._watchSize = function() {
                var am = aj.getContainerSize();
                if (aj.width != am.width || aj.height != am.height) {
                    var ap = (am.width - aj.width) / 2;
                    var ar = (am.height - aj.height) / 2;
                    var an = aj.getZoomUnits();
                    var ao = aj.centerPoint;
                    if (ao) {
                        aj.centerPoint = new y(ao.lng + ap * an, ao.lat - ar * an)
                    }
                    aj.maskLayer.style.width = (aj.width = am.width) + "px";
                    aj.maskLayer.style.height = (aj.height = am.height) + "px";
                    aj.dispatchEvent(new ad("onmapcontainerresize"));
                    aj.lastPoint = aj.centerPoint
                }
                var al = parseInt(aj.platform.style.left) || 0;
                var aq = parseInt(aj.platform.style.top) || 0;
                if (aj.currentOperation != "undefined" && aj.currentOperation != 0 && (aj.offsetX != al || aj.offsetY != aq)) {
                    aj._setPlatformPosition(al, aq)
                }
            };
            aj._watchSize();
            setInterval(aj._watchSize, 80);
            if (typeof HTMLElement != "undefined" && !window.opera) {
                HTMLElement.prototype.contains = function(al) {
                    if (al == this) {
                        return true
                    }
                    while (al = al.parentNode) {
                        if (al == this) {
                            return true
                        }
                    }
                    return false
                }
            }
            if (!k.Browser.ie && typeof Event != "undefined" && !window.opera) {
                Event.prototype.__defineSetter__("returnValue", 
                function(al) {
                    if (!al) {
                        this.preventDefault()
                    }
                    return al
                });
                Event.prototype.__defineSetter__("cancelBubble", 
                function(al) {
                    if (al) {
                        this.stopPropagation()
                    }
                    return al
                })
            }
            k.on(document, "mousedown", 
            function(am) {
                var am = window.event || am;
                var al = am.srcElement || am.target;
                if (aj.temp.canKeyboard) {
                    aj.temp.canKeyboard = aj.container.contains(al)
                } else {
                    aj.temp.canKeyboard = aj.platform.contains(al)
                }
            });
            k.on(document, "keydown", 
            function(al) {
                if (aj.temp.stopArrow == true) {
                    aj.temp.stopArrow = false
                }
                if (aj.config.enableKeyboard && aj.temp.canKeyboard) {
                    var al = window.event || al;
                    switch (al.keyCode || al.which) {
                    case 43:
                    case 189:
                    case 109:
                        aj.temp.operating = true;
                        aj.zoomOut();
                        break;
                    case 43:
                    case 61:
                    case 187:
                    case 107:
                        aj.temp.operating = true;
                        aj.zoomIn();
                        break;
                    case 33:
                        aj.temp.operating = false;
                        aj.temp.stopArrow = true;
                        aj.panBy(0, Math.round(aj.height * 0.8));
                        al.cancelBubble = true;
                        al.returnValue = false;
                        break;
                    case 34:
                        aj.temp.operating = false;
                        aj.temp.stopArrow = true;
                        aj.panBy(0, -Math.round(aj.height * 0.8));
                        al.cancelBubble = true;
                        al.returnValue = false;
                        break;
                    case 35:
                        aj.temp.operating = false;
                        aj.temp.stopArrow = true;
                        aj.panBy( - Math.round(aj.width * 0.8), 0);
                        al.cancelBubble = true;
                        al.returnValue = false;
                        break;
                    case 36:
                        aj.temp.operating = false;
                        aj.temp.stopArrow = true;
                        aj.panBy(Math.round(aj.width * 0.8), 0);
                        al.cancelBubble = true;
                        al.returnValue = false;
                        break;
                    case 37:
                        aj.temp.operating = true;
                        aj.temp.arrow |= 1;
                        aj._arrow();
                        al.cancelBubble = true;
                        al.returnValue = false;
                        break;
                    case 38:
                        aj.temp.operating = true;
                        aj.temp.arrow |= 2;
                        aj._arrow();
                        al.cancelBubble = true;
                        al.returnValue = false;
                        break;
                    case 39:
                        aj.temp.operating = true;
                        aj.temp.arrow |= 4;
                        aj._arrow();
                        al.cancelBubble = true;
                        al.returnValue = false;
                        break;
                    case 40:
                        aj.temp.operating = true;
                        aj.temp.arrow |= 8;
                        aj._arrow();
                        al.cancelBubble = true;
                        al.returnValue = false;
                        break;
                    case 89:
                        aj.temp.operating = true;
                        if (al.ctrlKey || al.metaKey) {
                            aj.redo();
                            al.cancelBubble = true;
                            al.returnValue = false
                        }
                        break;
                    case 90:
                        aj.temp.operating = true;
                        if (al.ctrlKey || al.metaKey) {
                            aj.undo();
                            al.cancelBubble = true;
                            al.returnValue = false
                        }
                        break
                    }
                }
            });
            k.on(document, "keyup", 
            function(al) {
                if (aj.config.enableKeyboard) {
                    var al = window.event || al;
                    switch (al.keyCode || al.which) {
                    case 37:
                        aj.temp.arrow = aj.temp.arrow & ~1;
                        if (aj.temp.arrow != 0) {
                            aj._arrow()
                        }
                        break;
                    case 38:
                        aj.temp.arrow = aj.temp.arrow & ~2;
                        if (aj.temp.arrow != 0) {
                            aj._arrow()
                        }
                        break;
                    case 39:
                        aj.temp.arrow = aj.temp.arrow & ~4;
                        if (aj.temp.arrow != 0) {
                            aj._arrow()
                        }
                        break;
                    case 40:
                        aj.temp.arrow = aj.temp.arrow & ~8;
                        if (aj.temp.arrow != 0) {
                            aj._arrow()
                        }
                        break
                    }
                }
                aj.temp.operating = false
            })
        },
        _setPlatformPosition: function(ap, ao, ai) {
            if (isNaN(ap) || isNaN(ao)) {
                return
            }
            if (this.zoomLevel <= 4) {
                var ar = parseInt(this.platform.style.left) - ap;
                var aq = parseInt(this.platform.style.top) - ao;
                var aj = -(ap - this.offsetX);
                var ah = -(ao - this.offsetY);
                var ak = this.getZoomUnits();
                var an = this.centerPoint.lng;
                var am = this.centerPoint.lat;
                var al = new y(an, am);
                this.centerPoint = new y(al.lng + aj * ak, al.lat - ah * ak);
                if (this.centerPoint.lng - Math.round(this.width / 2) * this.getZoomUnits() < H[this.mapType].bounds[0] && ar <= 0) {
                    ap = parseInt(this.platform.style.left)
                }
                if (this.centerPoint.lng + Math.round(this.width / 2) * this.getZoomUnits() > H[this.mapType].bounds[2] && ar >= 0) {
                    ap = parseInt(this.platform.style.left)
                }
                if (this.centerPoint.lat - Math.round(this.height / 2) * this.getZoomUnits() < H[this.mapType].bounds[1] && aq >= 0) {
                    ao = parseInt(this.platform.style.top)
                }
                if (this.centerPoint.lat + Math.round(this.height / 2) * this.getZoomUnits() > H[this.mapType].bounds[3] && aq <= 0) {
                    ao = parseInt(this.platform.style.top)
                }
                this.platform.style.left = ap + "px";
                this.platform.style.top = ao + "px";
                if (ai) {
                    this.centerPoint = ai
                } else {
                    var aj = -(ap - this.offsetX);
                    var ah = -(ao - this.offsetY);
                    var ak = this.getZoomUnits();
                    var al = new y(an, am);
                    this.centerPoint = new y(al.lng + aj * ak, al.lat - ah * ak)
                }
                this.offsetX = ap;
                this.maskLayer.style.left = -ap + "px";
                this.offsetY = ao;
                this.maskLayer.style.top = -ao + "px"
            } else {
                if (ai) {
                    this.centerPoint = ai
                } else {
                    var aj = -(ap - this.offsetX);
                    var ah = -(ao - this.offsetY);
                    var ak = this.getZoomUnits();
                    var al = this.centerPoint;
                    this.centerPoint = new y(al.lng + aj * ak, al.lat - ah * ak)
                }
                this.platform.style.top = ao + "px";
                this.offsetY = ao;
                this.platform.style.left = ap + "px";
                this.offsetX = ap;
                this.maskLayer.style.top = -ao + "px";
                this.maskLayer.style.left = -ap + "px"
            }
            this.dispatchEvent(new ad("onmoving"));
            this.lastPoint = this.centerPoint
        },
        setViewSize: function(ah) {
            Q(this.maskLayer, ah);
            this.width = ah[0];
            this.height = ah[1]
        },
        zoomTo: function(am, ai) {
            if (typeof am != "number") {
                return
            }
            var al = H[this.mapType];
            if (typeof al != "object") {
                return
            }
            if (am < al.zoomLevelMin) {
                am = al.zoomLevelMin
            }
            if (am > al.zoomLevelMax) {
                am = al.zoomLevelMax
            }
            if (this.zoomLevel == am) {
                return
            }
            this.lastLevel = this.zoomLevel;
            if (ai) {
                this.temp._cPoint = ai;
                this.temp._cPixel = this.pointToPixel(ai)
            } else {
                if (!ai && this.temp.infoWin && this.temp.infoWin.isOpen()) {
                    this.temp._cPixel = this.pointToPixel(this.temp.infoWin.overlay.getPoint());
                    this.temp._cPoint = this.temp.infoWin.overlay.getPoint()
                }
            }
            this.dispatchEvent(new ad("onzoomstart"));
            this.zoomLevel = am;
            if (ai || this.temp.infoWin && this.temp.infoWin.isOpen()) {
                var aj = this.temp._cPoint;
                var ah = this.temp._cPixel;
                var ak = this.getZoomUnits(am);
                this.centerPoint = new y(aj.lng + ak * (this.width / 2 - ah.x), aj.lat - ak * (this.height / 2 - ah.y))
            }
        },
        zoomIn: function(ah) {
            this.zoomTo(this.zoomLevel + this.config.zoomStep, ah)
        },
        zoomOut: function(ah) {
            this.zoomTo(this.zoomLevel - this.config.zoomStep, ah)
        },
        panTo: function(ai, ak, al) {
            if (!ai || ai.toString() != "Point") {
                return
            }
            var aj = this.pointToPixel(ai);
            var ah = Math.round(this.width / 2);
            var am = Math.round(this.height / 2);
            if (Math.abs(ah - aj.x) > this.width || Math.abs(am - aj.y) > this.height || ak == true) {
                this._panTo(ah - aj.x, am - aj.y, ai)
            } else {
                this._panBy(ah - aj.x, am - aj.y, 0, al)
            }
        },
        _panTo: function(ai, ah, aj) {
            if (this.temp.operating == true) {
                return
            }
            this._setPlatformPosition(this.offsetX + ai, this.offsetY + ah, aj);
            this.dispatchEvent(new ad("onmoveend"));
            this.lastPoint = this.centerPoint
        },
        panBy: function(aj, ah, ai) {
            aj = Math.round(aj) || 0;
            ah = Math.round(ah) || 0;
            if (Math.abs(aj) <= this.width && Math.abs(ah) <= this.height) {
                this._panBy(aj, ah, ai)
            } else {
                this._panTo(aj, ah)
            }
        },
        _panBy: function(aj, ah, ai, am) {
            if (this.temp.operating == true) {
                return
            }
            this.dispatchEvent(new ad("onmovestart"));
            var al = this,
            ak = al.temp;
            ak.pl = al.offsetX;
            ak.pt = al.offsetY;
            if (this.temp.tlPan) {
                this.temp.tlPan.cancel()
            }
            this.temp.tlPan = new k.TimeLine({
                interval: ai || 30,
                duration: am || al.config.actionDuration,
                render: function(an) {
                    this.terminative = al.temp.operating;
                    if (al.temp.operating) {
                        return
                    }
                    if (!ai) {
                        an = Math.pow(an, 3)
                    }
                    al._setPlatformPosition(ak.pl + Math.ceil(aj * an), ak.pt + Math.ceil(ah * an))
                },
                finish: function(an) {
                    al.dispatchEvent(new ad("onmoveend"));
                    al.temp.tlPan = false;
                    if (al.temp.stopArrow == true) {
                        al.temp.stopArrow = false;
                        if (al.temp.arrow != 0) {
                            al._arrow()
                        }
                    }
                    al.lastPoint = al.centerPoint
                }
            })
        },
        _arrow: function() {
            if (this._arrow.occurrent && this._arrow._lastArrow == this.temp.arrow && this.temp.stopArrow == true) {
                return
            }
            var ah = this;
            var ai = ah.temp.arrow;
            ah._arrow._lastArrow = ai;
            ah._arrow.interval = 33;
            ah._arrow.duration = 999;
            ah._arrow.dx = ah._arrow.dy = 0;
            if (ai & 1) {
                ah._arrow.dx = 1
            }
            if (ai & 2) {
                ah._arrow.dy = 1
            }
            if (ai & 4) {
                ah._arrow.dx = -1
            }
            if (ai & 8) {
                ah._arrow.dy = -1
            }
            if (ai & 1 && ai & 4) {
                ah._arrow.dx = 0
            }
            if (ai & 2 && ai & 8) {
                ah._arrow.dy = 0
            }
            if (!ah._arrow.occurrent) {
                ah._arrow.occurrent = true;
                ah._arrow.time = new Date().getTime();
                ah._arrow.beginTime = ah._arrow.time;
                ah.dispatchEvent(new ad("onmovestart"));
                new k.TimeLine({
                    trend: false,
                    interval: ah._arrow.interval,
                    duration: ah._arrow.duration,
                    render: function(ap) {
                        var ak = ah._arrow;
                        var an = ah.temp.arrow;
                        if (ah._arrow._lastArrow != an) {
                            ah._arrow._lastArrow = an;
                            if (an & 1) {
                                ak.dx = 1
                            }
                            if (an & 2) {
                                ak.dy = 1
                            }
                            if (an & 4) {
                                ak.dx = -1
                            }
                            if (an & 8) {
                                ak.dy = -1
                            }
                            if (an & 1 && an & 4) {
                                ak.dx = 0
                            }
                            if (an & 2 && an & 8) {
                                ak.dy = 0
                            }
                        }
                        if (ah.temp.stopArrow == true) {
                            ak.dx = 0;
                            ak.dy = 0
                        }
                        var ao = new Date().getTime();
                        var am = Math.pow((ao - ak.beginTime) / ak.duration, 2);
                        if (!ah.temp.arrow) {
                            ak.occurrent = false;
                            this.terminative = true;
                            setTimeout(function() {
                                ah.dispatchEvent(new ad("onmoveend"))
                            },
                            40)
                        }
                        var aq = (ao - ak.time);
                        var al = ak.dx * aq * am >= 0 ? Math.ceil(ak.dx * aq * am) : Math.floor(ak.dx * aq * am);
                        var aj = ak.dy * aq * am >= 0 ? Math.ceil(ak.dy * aq * am) : Math.floor(ak.dy * aq * am);
                        if (al != 0 && aj != 0) {
                            al = Math.round(al * Math.SQRT1_2);
                            aj = Math.round(aj * Math.SQRT1_2)
                        }
                        ak.time = ao;
                        ah._setPlatformPosition(ah.offsetX + al, ah.offsetY + aj)
                    },
                    finish: function() {
                        ah._arrow.time = new Date().getTime();
                        setTimeout(function() {
                            ah._arrowPan()
                        },
                        ah._arrow.interval)
                    }
                })
            }
        },
        _arrowPan: function() {
            var ak = this;
            var ai = ak._arrow;
            if (ak.temp.stopArrow) {
                ai.dx = 0;
                ai.dy = 0
            }
            if (!ak.temp.arrow) {
                ai.occurrent = false;
                ak.dispatchEvent(new ad("onmoveend"));
                return
            }
            var al = new Date().getTime();
            var am = (al - ai.time);
            var aj = Math.ceil(ai.dx * am);
            var ah = Math.ceil(ai.dy * am);
            ai.time = al;
            ak._setPlatformPosition(ak.offsetX + aj, ak.offsetY + ah);
            setTimeout(function() {
                ak._arrowPan()
            },
            ai.interval)
        },
        addControl: function(ah) {
            if (ah && ah._type == "control" && typeof ah.initialize == "function") {
                ah.initialize(this);
                this.dispatchEvent(new ad("onaddcontrol", ah))
            }
        },
        removeControl: function(ah) {
            if (ah && ah._type == "control" && typeof ah.remove == "function") {
                this.dispatchEvent(new ad("onremovecontrol", ah));
                ah.remove()
            }
        },
        addContextMenu: function(ah) {
            if (ah && ah._type == "contextmenu" && typeof ah.initialize == "function") {
                ah.initialize(this);
                this.dispatchEvent(new ad("onaddcontextmenu", ah))
            }
        },
        removeContextMenu: function(ah) {
            if (ah && ah._type == "contextmenu" && typeof ah.remove == "function") {
                this.dispatchEvent(new ad("onremovecontextmenu", ah));
                ah.remove()
            }
        },
        addOverlay: function(ah) {
            if (ah && ah._type == "overlay" && typeof ah.initialize == "function") {
                this.dispatchEvent(new ad("onaddoverlay", ah));
                ah.initialize(this)
            }
        },
        removeOverlay: function(ah) {
            if (ah && ah._type == "overlay" && typeof ah.remove == "function") {
                this.dispatchEvent(new ad("onremoveoverlay", ah));
                ah.remove()
            }
        },
        clearOverlays: function() {
            this.dispatchEvent(new ad("onclearoverlays"))
        },
        setCenter: function(ah) {
            if (! (ah instanceof y)) {
                return
            }
            this.panTo(ah, true)
        },
        centerAndZoom: function(ah, aj) {
            if (ah == null && this.config.centerPoint != null) {
                ah = this.config.centerPoint
            }
            if (aj == null && this.config.zoomLevel != null) {
                aj = this.config.zoomLevel
            }
            if (typeof aj != "number") {
                return
            }
            var ai = H[this.mapType];
            if (typeof ai != "object") {
                return
            }
            if (aj < ai.zoomLevelMin) {
                aj = ai.zoomLevelMin
            }
            if (aj > ai.zoomLevelMax) {
                aj = ai.zoomLevelMax
            }
            this.lastLevel = this.zoomLevel || aj;
            this.zoomLevel = aj;
            this.centerPoint = ah;
            this.defaultZoomLevel = this.defaultZoomLevel || this.zoomLevel;
            this.defaultCenter = this.defaultCenter || ah;
            this.dispatchEvent(new ad("onload"))
        },
        reset: function() {
            var ai = this;
            var aj = ai.defaultZoomLevel;
            var ah = ai.defaultCenter;
            ai.centerAndZoom(ah, aj)
        },
        openInfoWindow: function(ak, ah) {
            if (!ak || ak.toString() != "InfoWindow" || ah.toString() != "Point") {
                return
            }
            if (!this.temp.marker) {
                var ai = new m(ac.imgPath + "/blank.gif", {
                    width: 0,
                    height: 0
                });
                this.temp.marker = new E(ah, {
                    icon: ai
                })
            } else {
                this.temp.marker.setPoint(ah)
            }
            this.addOverlay(this.temp.marker);
            this.temp.marker.openInfoWindow(ak);
            this.temp._infoWindowOpened = true;
            var aj = this;
            ak.addEventListener("onclose", 
            function() {
                aj.temp._infoWindowOpened = false
            })
        },
        closeInfoWindow: function() {
            if (this.temp.infoWin && this.temp.infoWin.overlay) {
                this.temp.infoWin.overlay.closeInfoWindow()
            }
        },
        resizeMapDiv: function() {
            var ah = this.getContainerSize();
            if (this.width && ah.width == this.width && ah.height == this.height) {
                return
            }
            this.setViewSize(ah);
            this.dispatchEvent(new ad("onmapcontainerresize"))
        },
        saveScene: function(ai) {
            if (! (this.currentOperation & g.undo || this.currentOperation & g.redo)) {
                var aj = this;
                var ak = aj.temp.undoList;
                if (ak.length > aj.temp.undoLength) {
                    ak.reverse();
                    ak.length = Math.ceil(aj.temp.undoLength / 5);
                    ak.reverse()
                }
                var al = {
                    name: ai.type,
                    level: aj.zoomLevel,
                    point: aj.centerPoint
                };
                if (aj.temp.undoPoint < ak.length) {
                    ak.length = aj.temp.undoPoint
                }
                var ah = ak.length > 0 ? ak[ak.length - 1] : false;
                if (ah && ah.level == al.level && ah.point[0] == al.point[0] && ah.point[1] == al.point[1]) {
                    ak[ak.length - 1] = al
                } else {
                    ak.push(al)
                }
                aj.temp.undoPoint = ak.length
            }
        },
        undo: function() {
            var ah = this;
            var ai = this.temp.undoList;
            if (ah.temp.undoPoint == ai.length) {
                ah.saveScene(new k.BaseEvent("undo"));
                if (ai[ai.length - 1].name == "undo") {
                    ah.temp.undoPoint--
                }
            }
            if (ah.temp.undoPoint > 0) {
                ah.temp.undoPoint--;
                var aj = ai[ah.temp.undoPoint];
                ah.currentOperation |= g.undo;
                if (aj.level != ah.zoomLevel) {
                    ah.zoomTo(aj.level)
                }
                if (!ah.centerPoint.equals(aj.point)) {
                    ah.setCenter(aj.point)
                }
                ah.currentOperation ^= g.undo
            }
        },
        redo: function() {
            var ah = this;
            var ai = this.temp.undoList;
            if (ah.temp.undoPoint < ai.length) {
                ah.temp.undoPoint++;
                var aj = ai[ah.temp.undoPoint];
                if (!aj) {
                    return
                }
                ah.currentOperation |= g.redo;
                if (aj.level != ah.zoomLevel) {
                    ah.zoomTo(aj.level)
                }
                if (!ah.centerPoint.equals(aj.point)) {
                    ah.setCenter(aj.point)
                }
                ah.currentOperation ^= g.redo;
                if (ah.temp.undoPoint == ai.length - 1 && ai[ah.temp.undoPoint].name == "undo") {
                    ah.temp.undoList.length = ah.temp.undoPoint
                }
            }
        },
        enableDraging: function(ah) {
            this.config.enableDraging = !!ah
        },
        enableScrollWheelZoom: function(ah) {
            this.config.enableWheelZoom = !!ah
        },
        enableClickPan: function(ah) {
            this.config.enableClickPan = !!ah
        },
        enableDoubleClickZoom: function(ah) {
            this.config.enableDblclickZoom = !!ah
        },
        enableKeyboard: function(ah) {
            this.config.enableKeyboard = !!ah
        },
        enableMapArea: function(ah) {
            this.config.enableMapArea = !!ah
        },
        getContainerSize: function() {
            var ah = [this.container.clientWidth, this.container.clientHeight];
            ah.width = ah[0];
            ah.height = ah[1];
            return ah
        },
        getZoomUnits: function(aj) {
            var ah = H[this.mapType];
            if (typeof ah != "object") {
                return null
            }
            var ai = aj || this.zoomLevel;
            return Math.pow(2, (ah.zoomLevelMax - ai)) * ah.baseUnits / ah.tileSize
        },
        pointToPixel: function(ai, al) {
            if (!ai) {
                return
            }
            var aj = this.getZoomUnits(al);
            var ah = Math.round((ai[0] - this.centerPoint[0]) / aj + this.width / 2);
            var ak = Math.round((this.centerPoint[1] - ai[1]) / aj + this.height / 2);
            return new q(ah, ak)
        },
        pixelToPoint: function(aj, al) {
            if (!aj) {
                return
            }
            var ah = this.getZoomUnits(al);
            var ai = this.centerPoint.lng + ah * (aj.x - this.width / 2);
            var ak = this.centerPoint.lat - ah * (aj.y - this.height / 2);
            return new y(ai, ak)
        },
        pt2px: function(ah, aj) {
            var ai = this.pointToPixel(ah, aj);
            return new q(ai.x + this.offsetX, ai.y + this.offsetY)
        },
        px2pt: function(ah, aj) {
            var ai = new q(ah.x - this.offsetX, ah.y - this.offsetY);
            return this.pixelToPoint(ai, aj)
        },
        getEventPoint: function(ai, aj) {
            if (typeof ai.offsetY == "number") {
                var ah = new q(ai.offsetX, ai.offsetY);
                return this.pixelToPoint(ah, aj)
            } else {
                return null
            }
        },
        getBounds: function() {
            var ai = this.pixelToPoint({
                x: 0,
                y: this.height
            });
            var ah = this.pixelToPoint({
                x: this.width,
                y: 0
            });
            return new l(ai.lng, ai.lat, ah.lng, ah.lat)
        },
        setConfig: function(ah) {
            if (ah == null) {
                return
            }
            for (var ai in ah) {
                if (typeof(this.config[ai]) == typeof(ah[ai])) {
                    this.config[ai] = ah[ai]
                }
            }
        },
        getPointsBounds: function(ai) {
            var aj = new l(Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);
            for (var ah = ai.length - 1; ah >= 0; ah--) {
                aj.extend(ai[ah])
            }
            if (aj.minX == Number.MAX_VALUE && aj.minY == Number.MAX_VALUE && aj.maxX == Number.MIN_VALUE && aj.maxY == Number.MIN_VALUE) {
                return null
            }
            return aj
        },
        getBestMap: function(ap, ak, aj, ah) {
            if (ap.length == 0) {
                return
            }
            var ao = this.getBounds();
            var am = this.getPointsBounds(ap);
            if (!am) {
                return
            }
            var an = this;
            var al = am.getCenterPoint();
            var ai = this.getBestLevel(am, ak);
            if (aj) {
                if (!ao.containsBounds(am)) {
                    if (ai == this.zoomLevel) {
                        setTimeout(function() {
                            an.panTo(al, false, 210)
                        },
                        200)
                    } else {
                        this.centerAndZoom(al, ai)
                    }
                }
            } else {
                if (!ah) {
                    if (ai == this.zoomLevel) {
                        setTimeout(function() {
                            an.panTo(al, false, 210)
                        },
                        200)
                    } else {
                        this.centerAndZoom(al, ai)
                    }
                }
            }
            return {
                center: al,
                level: ai
            }
        },
        getBestLevel: function(ai, ak) {
            var al = H[this.mapType];
            ak = ak || 10;
            var am = typeof(ak);
            var an = eh = ak;
            if (am == "object") {
                an = ak[0];
                eh = ak[1]
            }
            if (typeof al != "object") {
                return
            }
            var ah = al.zoomLevelMin;
            var ap = al.zoomLevelMax;
            for (var aj = ap; aj >= ah; aj--) {
                var ao = this.getZoomUnits(aj);
                if ((ai.getMaxX() - ai.getMinX()) / ao < this.width - an * 2 && (ai.getMaxY() - ai.getMinY()) / ao < this.height - eh * 2) {
                    break
                }
            }
            if (aj == -1) {
                aj++
            }
            if (aj == al.zoomLevelMax) {
                aj--
            }
            return aj
        },
        addHotspot: function(ah) {
            if (!ah) {
                return
            }
            if (!this.arrHotspot) {
                this.arrHotspot = []
            }
            this.arrHotspot[this.arrHotspot.length] = ah
        },
        clearHotspot: function() {
            delete this.arrHotspot
        },
        setMapBounds: function(ai) {
            var ai = new l(ai[0], ai[1], ai[2], ai[3]);
            if (ai.containsPoint(this.centerPoint)) {
                return
            }
            var ah = new y(this.centerPoint.lng, this.centerPoint.lat);
            if (ah.lng > ai.getMaxX()) {
                ah.lng = ai.getMaxX()
            }
            if (ah.lat > ai.getMaxY()) {
                ah.lat = ai.getMaxY()
            }
            if (ah.lng < ai.getMinX()) {
                ah.lng = ai.getMinX()
            }
            if (ah.lat < ai.getMinY()) {
                ah.lat = ai.getMinY()
            }
            this.centerPoint = ah
        }
    });
    w.register(function(ah) {
        ah.addEventListener("onload", 
        function(ai) {
            ah.saveScene(ai)
        });
        ah.addEventListener("ondragstart", 
        function(ai) {
            ah.saveScene(ai)
        });
        ah.addEventListener("onmovestart", 
        function(ai) {
            ah.saveScene(ai)
        });
        ah.addEventListener("onzoomstart", 
        function(ai) {
            ah.saveScene(ai)
        })
    });
    var H = {
        B_NORMAL_MAP: {
            tileUrls: ["http://p0.map.baidu.com/image/", "http://p1.map.baidu.com/image/", "http://p2.map.baidu.com/image/", "http://p3.map.baidu.com/image/", "http://p4.map.baidu.com/image/", "http://p5.map.baidu.com/image/", "http://p6.map.baidu.com/image/", "http://p7.map.baidu.com/image/"],
            tileSize: 256,
            baseUnits: 256,
            zoomLevelMin: 1,
            zoomLevelMax: 18,
            errorUrl: "styles/bmap/bg.png",
            bounds: [ - 21364736, -10616832, 23855104, 15859712]
        },
        B_SATELLITE_MAP: {
            tileUrl: "http://jx-apptest-map02.jx.baidu.com:9500/maptile/",
            tileSize: 256,
            baseUnits: 204.8,
            zoomLevelMin: 0,
            zoomLevelMax: 17
        },
        B_PHYSICAL_MAP: {
            tileUrl: "http://jx-apptest-map02.jx.baidu.com:9500/maptile/",
            tileSize: 256,
            baseUnits: 204.8,
            zoomLevelMin: 0,
            zoomLevelMax: 17
        }
    };
    function F(ai, ak, ah, aj) {
        if (!ai || !ak || typeof ak != "function" || !ah || ah < 0) {
            return
        }
        o.call(this);
        this._text = ai + "";
        this._callback = ak;
        this._width = ah;
        this._id = aj;
        this._map = null;
        this._type = "menuitem";
        this._contextmenu = null;
        this._container = null;
        this.menuPoint = null;
        this.enabled = true
    }
    F.inherits(o, "MenuItem");
    k.extend(F.prototype, {
        initialize: function(ah, ai) {
            if (this._container) {
                return false
            }
            this._map = ah;
            this._contextmenu = ai;
            this._render();
            this._bind();
            return true
        },
        remove: function() {
            var ah = this;
            this._container.parentNode.removeChild(this._container);
            this._container = null;
            this._contextmenu = null;
            this._map = null
        },
        _render: function() {
            var ah = "<div" + (this._id ? " id='" + this._id + "'": "") + " unselectable='on' style='cursor:pointer;width: " + this._width + "px;'><span>" + this._text + "</span></div>";
            this._container = O(this._contextmenu.getDom(), ah);
            this._container.className = "BMap_menuItem";
            return this._container
        },
        _bind: function() {
            var ah = this;
            k.on(this._container, "click", 
            function(ai) {
                if (!ah.enabled) {
                    ae(ai);
                    return
                }
                ah.menuPoint = ah._contextmenu.curPoint;
                if (ah._callback && ah._callback.call) {
                    ah._callback.call(ah, ai)
                }
            });
            k.on(this._container, "mousedown", 
            function(ai) {
                ae(ai)
            });
            k.on(this._container, "mouseover", 
            function() {
                if (!ah.enabled) {
                    return
                }
                k.ac(ah._container, "selected")
            });
            k.on(this._container, "mouseout", 
            function() {
                if (!ah.enabled) {
                    return
                }
                k.rc(ah._container, "selected")
            })
        },
        setText: function(ah) {
            if (!ah) {
                return
            }
            this._text = ah + "";
            if (this._container) {
                this._container.innerHTML = "<span>" + this._text + "</span>"
            }
        },
        getDom: function() {
            return this._container
        },
        enable: function(ah) {
            this.enabled = !!ah;
            if (ah && this._container) {
                this._container.style.color = "";
                this._container.style.cursor = "pointer"
            } else {
                if (!ah && this._container) {
                    this._container.style.color = "#aaa";
                    this._container.style.cursor = "url(" + map.config.defaultCursor + "), move";
                    k.rc(this._container, "selected")
                }
            }
        }
    });
    var g = {
        undo: 1,
        redo: 2,
        zoom: 4,
        drag: 8,
        move: 16,
        mousewheel: 32,
        toolbarOperation: 64,
        stdMapCtrlDrag: 128,
        dblclick: 256
    };
    var j = {
        _map: null,
        _html: "<div class='BMap_opMask' unselectable='on'></div>",
        _maskElement: null,
        _cursor: "default",
        inUse: false,
        show: function(ah) {
            if (!this._map) {
                this._map = ah
            }
            this.inUse = true;
            if (!this._maskElement) {
                this._createMask(ah)
            }
            this._maskElement.style.display = "block"
        },
        _createMask: function(ah) {
            if (!this._map) {
                this._map = ah
            }
            if (!this._map) {
                return
            }
            this._maskElement = O(this._map.container, this._html);
            k.on(this._maskElement, "mouseup", 
            function(ai) {
                if (ai.button == 2) {
                    ae(ai);
                    return N(ai)
                }
            });
            k.on(this._maskElement, "click", 
            function(ai) {});
            this._maskElement.style.display = "none"
        },
        getDrawPoint: function(aj, am, ak) {
            aj = window.event || aj;
            var ah = aj.layerX || aj.offsetX || 0;
            var al = aj.layerY || aj.offsetY || 0;
            var ai = aj.target || aj.srcElement;
            if (ai != j.getDom(this._map) && am == true) {
                while (ai && ai != this._map.container) {
                    if (! (ai.clientWidth == 0 && ai.clientHeight == 0 && ai.offsetParent && ai.offsetParent.nodeName.toLowerCase() == "td")) {
                        ah += ai.offsetLeft;
                        al += ai.offsetTop
                    }
                    ai = ai.offsetParent
                }
            }
            if (ai != j.getDom(this._map) && ai != this._map.container) {
                return
            }
            if (typeof ah === "undefined" || typeof al === "undefined") {
                return
            }
            if (isNaN(ah) || isNaN(al)) {
                return
            }
            if (ak) {
                ah = ah + ak.x;
                al = al + ak.y
            }
            return this._map.pixelToPoint(new q(ah, al))
        },
        hide: function() {
            if (!this._map) {
                return
            }
            this.inUse = false;
            if (this._maskElement) {
                this._maskElement.style.display = "none"
            }
        },
        getDom: function(ah) {
            if (!this._maskElement) {
                this._createMask(ah)
            }
            return this._maskElement
        },
        setCursor: function(ah) {
            this._cursor = ah || "default";
            if (this._maskElement) {
                this._maskElement.style.cursor = this._cursor
            }
        }
    };
    function Z() {
        k.BaseClass.call(this);
        this.visible = false;
        this._type = "overlay";
        this.infoWindow = null
    }
    Z.inherits(k.BaseClass, "Overlay");
    w.register(function(aj) {
        var ai = '<div style="position:absolute;top:0;left:0;width:0;height:0;z-index:200"></div>';
        aj.temp.overlayDiv = aj.overlayDiv = O(aj.platform, ai);
        var ah = '<div style="position:absolute;top:0;left:0;width:0;height:0" type="system"></div>';
        aj.temp.areaDiv = O(aj.temp.overlayDiv, ah);
        aj.temp.areaDiv.style.zIndex = 700;
        aj.temp.labelDiv = O(aj.temp.overlayDiv, ah);
        aj.temp.labelDiv.style.zIndex = 500;
        aj.markerDiv = aj.temp.markerDiv = O(aj.temp.overlayDiv, ah);
        aj.temp.markerDiv.style.zIndex = 400
    });
    k.extend(Z.prototype, {
        remove: function() {
            if (this.domElement && this.domElement.parentNode && this.domElement.parentNode.tagName) {
                if (this.infoWindow && this.infoWindow.overlay && this.infoWindow.overlay == this) {
                    this.closeInfoWindow()
                }
                this.domElement.parentNode.removeChild(this.domElement);
                this.dispatchEvent(new ad("onremove"))
            }
        },
        _addOverlayDom: function() {
            var ai = this.map;
            if (this.domElement == null || this.domElement && this.domElement.innerHTML == "") {
                switch (this.toString()) {
                case "Marker":
                    this.domElement = O(ai.temp.areaDiv, this.render());
                    this.siblingElement = O(ai.temp.markerDiv, this.siblingRender());
                    this.siblingElement.hashCode = this.getHashCode();
                    break;
                case "Label":
                    this.domElement = O(ai.temp.labelDiv, this.render());
                    break;
                default:
                    this.domElement = O(ai.temp.overlayDiv, this.render());
                    break
                }
                this.domElement.hashCode = this.getHashCode();
                var ah = this;
                k.on(this.domElement, "mouseover", 
                function(aj) {
                    ah.dispatchEvent(new ad("onmouseover"))
                });
                k.on(this.domElement, "mouseout", 
                function(aj) {
                    ah.dispatchEvent(new ad("onmouseout"))
                });
                k.on(this.domElement, "click", 
                function(ak) {
                    var aj = ak.srcElement || ak.target;
                    while (aj) {
                        if (aj == ah.domElement) {
                            ah.dispatchEvent(new ad("onclick"));
                            break
                        } else {
                            if (ah.map.infoWindow && aj == ah.map.infoWindow.popDom) {
                                break
                            }
                        }
                        aj = aj.parentNode
                    }
                    ak.cancelBubble = true;
                    ak.returnValue = false
                });
                k.on(this.domElement, "mousedown", 
                function(aj) {
                    ah.dispatchEvent(new ad("onmousedown"))
                });
                k.on(this.domElement, "mouseup", 
                function(aj) {
                    ah.dispatchEvent(new ad("onmouseup"))
                });
                k.on(this.domElement, "dblclick", 
                function(aj) {
                    ah.dispatchEvent(new ad("ondblclick"));
                    aj.cancelBubble = true;
                    aj.returnValue = false
                })
            } else {
                if (this.toString() == "Marker") {
                    ai.markerDiv.appendChild(this.domElement);
                    ai.markerDiv.appendChild(this.siblingElement)
                } else {
                    ai.overlayDiv.appendChild(this.domElement)
                }
            }
            this.setPoint(this.point)
        },
        copy: function() {},
        hide: function() {
            if (this.infoWindow && this.infoWindow.overlay && this.infoWindow.overlay == this) {
                this.closeInfoWindow()
            }
            k.hide(this.domElement)
        },
        show: function() {
            k.show(this.domElement)
        },
        dispose: function() {
            k.BaseClass.prototype.dispose.call(this)
        },
        openInfoWindow: function(al, ak) {
            if (!al || !this.domElement || al.toString() != "InfoWindow") {
                return
            }
            if (this.map.temp.infoWin && this.map.temp.infoWin.isOpen() && this.map.temp.infoWin.overlay === this) {
                return
            }
            if (this.map.temp.infoWin && this.map.temp.infoWin.isOpen()) {
                map.closeInfoWindow()
            }
            this.infoWindow = al;
            al.initialize(this);
            var ah = this.map.infoWindow;
            var ai = this.map.temp;
            ai.infoWin = al;
            if (!ai.pop) {
                ai.pop = O(this.map.temp.overlayDiv, "<span style='position: absolute;z-index:800' type='system'></span>")
            }
            if (!ai.shadow) {
                ai.shadow = O(this.map.temp.overlayDiv, "<span style='position: absolute;z-index:600' type='system'></span>")
            }
            al.setPosition();
            ai.shadow.appendChild(ah.shadowDom);
            ai.pop.appendChild(ah.popDom);
            al.reset(false);
            if (! (ak && ak.notMove)) {
                setTimeout(function() {
                    al.setPanTo()
                },
                200)
            }
            var aj = this;
            if (this.toString() == "Marker" && this.iconArea) {
                this.iconArea.style.cursor = "default";
                if (aj.getLabel() && aj.getLabel().getDom()) {
                    aj.getLabel().getDom().style.cursor = "default"
                }
                al.addEventListener("close", 
                function() {
                    if (aj._config && aj._config.clickable == true && aj.iconArea) {
                        aj.iconArea.style.cursor = "pointer"
                    }
                    if (aj.getLabel() && aj.getLabel().getDom()) {
                        aj.getLabel().getDom().style.cursor = aj.getLabel()._config.cursor
                    }
                    al.removeEventListener("close", arguments.callee)
                })
            }
            this.dispatchEvent(new ad("oninfowindowopen"))
        },
        closeInfoWindow: function() {
            if (!this.map || !this.map.infoWindow) {
                return
            }
            var ai = this;
            if (this.infoWindow != null && this.infoWindow.hashCode == this.map.infoWindow.hashCode) {
                try {
                    ai.infoWindow.hide()
                } catch(ah) {}
                this.dispatchEvent(new ad("oncloseInfoWindow"))
            }
            this.infoWindow = null
        },
        setStyle: function(ah) {
            if (this.domElement) {
                if (this.siblingElement) {
                    this.siblingElement.style.cssText = this.siblingElement.style.cssText + ";" + ah
                } else {
                    this.domElement.style.cssText = this.domElement.style.cssText + ";" + ah
                }
            }
        },
        getDom: function() {
            return this.domElement
        },
        setConfig: function(ai) {
            if (ai == null) {
                return
            }
            for (var ah in ai) {
                if (typeof(this._config[ah]) == typeof(ai[ah])) {
                    this._config[ah] = ai[ah]
                }
            }
        },
        overlayPoints: function(aj) {
            if (aj.length == 0) {
                return {
                    pixels: [],
                    points: []
                }
            }
            if (typeof(aj) == "string") {
                return this._overlayPoints(aj)
            } else {
                if (typeof(aj[0]) == "string") {
                    var ai = [];
                    for (var ah = 0; ah < aj.length; ah++) {
                        var ak = this._overlayPoints(aj[ah]);
                        ai.push(ak)
                    }
                    return ai
                } else {
                    return this._overlayPoints(aj)
                }
            }
        },
        _overlayPoints: function(al) {
            var ak = [];
            var aj = [];
            var ah = typeof(al) == "string" ? al.split(";") : al;
            for (var ai = 0; ai < ah.length; ai++) {
                if (typeof(ah[ai]) == "string") {
                    var am = ah[ai].split(",");
                    var an = new y(parseFloat(am[0]), parseFloat(am[1]));
                    aj.push(an);
                    ak.push(this.getOverLayPosition(an))
                } else {
                    ak.push(this.getOverLayPosition(ah[ai]))
                }
            }
            if (typeof(al) != "string") {
                aj = al
            }
            return {
                pixels: ak,
                points: aj
            }
        },
        getOverLayPosition: function(ai) {
            var ak = this.map;
            var aj = ak.pointToPixel(ai);
            var ah = aj[0] - ak.offsetX;
            var al = aj[1] - ak.offsetY;
            return new q(ah, al)
        },
        overlayPixel: function(ah) {
            var ai = this.map;
            if (ah.toString() == "Point") {
                return ai.pt2px(ah, ai.zoomLevel)
            } else {
                return ai.px2pt(ah, ai.zoomLevel)
            }
        },
        setPoint: function(ah) {
            if (ah && ah.toString() == "Point") {
                this.point = this._config.point = ah;
                var aj = (this._config && this._config.offset) ? this._config.offset: [0, 0];
                var ai = this.getOverLayPosition(ah);
                if (this.domElement && this.domElement.style) {
                    this.domElement.style.left = (ai.x + aj[0]) + "px";
                    this.domElement.style.top = (ai.y + aj[1]) + "px"
                }
                this._elemTop = (ai.y + aj[1]);
                if (this.siblingElement) {
                    this.siblingElement.style.left = this.domElement.style.left;
                    this.siblingElement.style.top = this.domElement.style.top
                }
                if (this.infoWindow != null && this.infoWindow.isOpen()) {
                    this.infoWindow.setPosition()
                }
            }
        },
        getPoint: function(aj, ak) {
            if (!aj) {
                return this.point
            } else {
                var ah = ak ? ak[0] : 0;
                var al = ak ? ak[1] : 0;
                if (this.map) {
                    var ai = this.map.pointToPixel(this.point);
                    if (this._config && this._config.offset) {
                        ai.x = ai.x + this._config.offset[0] + ah;
                        ai.y = ai.y + this._config.offset[1] + al
                    } else {
                        ai.x = ai.x + ah;
                        ai.y = ai.y + al
                    }
                    return this.map.pixelToPoint(ai)
                }
            }
        }
    });
    function X(ah) {
        Z.call(this);
        this._config = {
            lineColor: "black",
            weight: 1,
            opacity: 1,
            fillColor: "white",
            lineStyle: "solid",
            startArrow: "none",
            endArrow: "none"
        };
        this.drawMargin = 350;
        this.setConfig(ah);
        if (this._config.weight <= 0) {
            this._config.weight = 1
        }
        if (this._config.opacity < 0) {
            this._config.opacity = 0
        } else {
            if (this._config.opacity > 1) {
                this._config.opacity = 1
            }
        }
        if (this._config.lineStyle != "solid" && this._config.lineStyle != "dashed") {
            this._config.lineStyle = "solid"
        }
        this.domElement = null;
        this.isSvg = !!window.SVGAngle;
        this.isVml = !window.SVGAngle;
        this.svgs = "http://www.w3.org/2000/svg";
        this.svgType = {
            strokeweight: "stroke-width",
            strokecolor: "stroke",
            stroked: "stroke",
            fillcolor: "fill",
            filled: "fill"
        }
    }
    X.inherits(Z, "Draw");
    k.extend(X.prototype, {
        _addOverlayDom: function() {
            if (this.map.palette) {
                this.setPalette()
            }
        },
        createPalette: function() {
            if (this.map.palette) {
                this.setPalette();
                return
            }
            var aj = this.map.overlayDiv;
            var ah;
            if (this.isSvg) {
                ah = document.createElementNS(this.svgs, "svg");
                this.setTypeNS(ah, "font-size", "24px");
                this.setTypeNS(ah, "version", "1.1");
                ah.style.position = "absolute";
                ah.style.zIndex = "200";
                ah.setAttribute("type", "system");
                aj.appendChild(ah)
            } else {
                if (this.isVml) {
                    var ai = '<font style="overflow:visible;z-index:200" type="system"></font>';
                    ah = O(aj, ai)
                }
            }
            this.map.palette = ah;
            this.setPalette()
        },
        setPalette: function() {
            if (!this.isSvg) {
                return
            }
            var am = this.map;
            var ai = am.palette;
            var aj = am.width * 3;
            var ah = am.height * 3;
            var al = -am.offsetX - am.width;
            var ak = -am.offsetY - am.height;
            this.setTypeNS(ai, "x", aj + "px");
            this.setTypeNS(ai, "y", ah + "px");
            ai.style.top = ak + "px";
            ai.style.left = al + "px";
            ai.style.width = aj + "px";
            ai.style.height = ah + "px";
            this.setTypeNS(ai, "viewBox", al + " " + ak + " " + aj + " " + ah)
        },
        polyline: function(aj, al) {
            var ak = this;
            var ai = this.map.palette;
            if (this.isSvg) {
                var ah = document.createElementNS(this.svgs, "path");
                this.setTypeNS(ah, "stroke-linejoin", "round");
                this.setTypeNS(ah, "stroke-linecap", "round");
                ai.appendChild(ah)
            } else {
                if (this.isVml) {
                    var am = ['<v:shape style="z-index:1;left:0;width:1;position:absolute;top:0;height:1"', 'coordsize="1,1" coordorigin = "0,0" filled="t" fillcolor="white" >', '<v:stroke endcap="round" />', "<v:fill />", "</v:shape>"].join("");
                    var ah = O(ai, am);
                    ah.style.width = "1px";
                    ah.style.height = "1px"
                }
            }
            this.setPolylinePoint(ah, aj, al);
            if (this._config.startArrow != "none") {
                this.startArrow(this._config.startArrow, ah)
            }
            if (this._config.endArrow != "none") {
                this.endArrow(this._config.endArrow, ah)
            }
            if (k.Browser.ie) {
                k.on(ah, "mouseover", 
                function(an) {
                    ak.dispatchEvent(I(an, new ad("onmouseover").inherit(an)))
                });
                k.on(ah, "mousemove", 
                function(an) {
                    ak.dispatchEvent(I(an, new ad("onmouseover").inherit(an)))
                });
                k.on(ah, "mouseout", 
                function(an) {
                    ak.dispatchEvent(I(an, new ad("onmouseover").inherit(an)))
                });
                k.on(ah, "click", 
                function(an) {
                    ak.dispatchEvent(I(an, new ad("onmouseover").inherit(an)))
                });
                k.on(ah, "mousedown", 
                function(an) {
                    ak.dispatchEvent(I(an, new ad("onmouseover").inherit(an)))
                });
                k.on(ah, "mouseup", 
                function(an) {
                    ak.dispatchEvent(I(an, new ad("onmouseover").inherit(an)))
                });
                k.on(ah, "dblclick", 
                function(an) {
                    ak.dispatchEvent(I(an, new ad("onmouseover").inherit(an)))
                })
            } else {
                k.on(ah, "mouseover", 
                function(an) {
                    ak.dispatchEvent(new ad("onmouseover").inherit(n(an)))
                });
                k.on(ah, "mousemove", 
                function(an) {
                    ak.dispatchEvent(new ad("onmousemove").inherit(n(an)))
                });
                k.on(ah, "mouseout", 
                function(an) {
                    ak.dispatchEvent(new ad("onmouseout").inherit(n(an)))
                });
                k.on(ah, "click", 
                function(an) {
                    ak.dispatchEvent(new ad("onclick").inherit(n(an)))
                });
                k.on(ah, "mousedown", 
                function(an) {
                    ak.dispatchEvent(new ad("onmousedown").inherit(n(an)))
                });
                k.on(ah, "mouseup", 
                function(an) {
                    ak.dispatchEvent(new ad("onmouseup").inherit(n(an)))
                });
                k.on(ah, "dblclick", 
                function(an) {
                    ak.dispatchEvent(new ad("ondblclick").inherit(n(an)))
                })
            }
            k.on(this, "remove", 
            function(an) {
                this.remove();
                ak.dispatchEvent(new ad("remove").inherit(an))
            });
            return ah
        },
        setPolylinePoint: function(ak, aj) {
            this.points = aj;
            var aj = this.overlayPoints(aj);
            if (aj[0] == null) {
                var ai = this._setPolylinePoint(ak, aj)
            } else {
                var al = [];
                for (var ah = 0; ah < aj.length; ah++) {
                    al.push(this._setPolylinePoint(ak, aj[ah]))
                }
                ai = al.join(" ")
            }
            if (this.isSvg) {
                if (this.toString() == "Polygon") {}
                this.setTypeNS(ak, "d", ai)
            } else {
                if (this.toString() == "Polygon") {
                    ai += "E"
                }
                this.setTypeNS(ak, "path", ai)
            }
            if (this.isVml) {
                this.map.temp.drawView = {
                    point: this.map.centerPoint,
                    margin: this.drawMargin
                }
            }
        },
        _setPolylinePoint: function(ak, ao) {
            var ap = ao.points;
            var an = ao.pixels;
            if (ap.length == 0) {
                return
            }
            if ((ap[ap.length - 1].lat != ap[0].lat || ap[ap.length - 1].lng != ap[0].lng) && !this.isSvg && this.toString() == "Polygon") {
                ap[ap.length] = ap[0];
                an[an.length] = an[0]
            }
            if (!ak) {
                return
            }
            var ai = [];
            for (var am = 0; am < an.length; am++) {
                if (an[am + 1] != null) {
                    if (an[am].x == an[am + 1].x && an[am].y == an[am + 1].y) {
                        continue
                    }
                    var aj = this.getIntersectLine(an[am], an[am + 1]);
                    if (aj.length == 0) {
                        if (ai.length != 0 && ai[ai.length - 1] != "M") {
                            ai.push("M")
                        }
                    }
                    for (var al = 0; al < aj.length; al++) {
                        if (aj[al] == null) {
                            continue
                        }
                        if (ai.length == 0) {
                            ai.push("M" + aj[al].x + "," + aj[al].y)
                        }
                        if (ai[ai.length - 1] == "M") {
                            ai.push(aj[al].x + "," + aj[al].y)
                        } else {
                            if (ai[ai.length - 1] != "L" + aj[al].x + "," + aj[al].y) {
                                ai.push("L" + aj[al].x + "," + aj[al].y)
                            }
                        }
                    }
                }
            }
            if (ai[ai.length - 1] == "M") {
                ai[ai.length - 1] = null;
                delete ai[ai.length - 1]
            }
            var ah = ai.join().replace(/,/g, " ");
            return ah
        },
        setPoints: function(ah) {
            this.setPolylinePoint(this.getDom(), ah)
        },
        setPath: function(ah, aj) {
            if (!this.points || !this.points[aj]) {
                return
            }
            this.points[aj] = ah;
            var ai = this.domElement;
            this.setPolylinePoint(ai, this.points)
        },
        oval: function() {},
        arrow: function(ai) {
            if (this.isSvg) {
                var ah = document.createElementNS(this.svgs, "marker");
                this.setTypeNS(ah, "id", ai);
                this.setTypeNS(ah, "viewBox", "0 0 10 10");
                this.setTypeNS(ah, "refX", "8");
                if (navigator.userAgent.indexOf("Safari") > 0) {
                    this.setTypeNS(ah, "refY", "8")
                } else {
                    this.setTypeNS(ah, "refY", "5")
                }
                this.setTypeNS(ah, "markerUnits", "strokeWidth");
                this.setTypeNS(ah, "markerWidth", "4");
                this.setTypeNS(ah, "markerHeight", "9");
                this.setTypeNS(ah, "orient", "auto");
                switch (ai) {
                case "oval":
                    break;
                case "classic":
                    var aj = document.createElementNS(this.svgs, "path");
                    this.setTypeNS(aj, "fill", this._config.lineColor);
                    aj.setAttributeNS(null, "d", "M 0 0 L10 5 L0 10 L3 5 z")
                }
                ah.appendChild(aj);
                this.map.palette.appendChild(ah);
                return aj
            }
        },
        setTypeNS: function(aj, ai, ak) {
            if (!aj) {
                return
            }
            if (this.isSvg) {
                var ah = this.svgType;
                if (ah[ai]) {
                    ai = ah[ai];
                    if (ak == false) {
                        ak = "none"
                    }
                }
                aj.setAttributeNS(null, ai, ak)
            } else {
                if (this.isVml) {
                    aj.setAttribute(ai, ak)
                }
            }
        },
        getTypeNS: function(aj, ai) {
            if (this.isSvg) {
                var ah = this.svgType;
                if (ah[ai]) {
                    ai = ah[ai]
                }
                return aj.getAttributeNS(null, ai)
            } else {
                if (this.isVml) {
                    return aj.getAttribute(ai)
                }
            }
        },
        getDrawPoint: function(ai) {
            ai = window.event || ai;
            var ah = (ai.pageX || ai.clientX);
            var ak = (ai.pageY || ai.clientY);
            var aj = k.Dom.getOffset(this.map.container);
            ah = ah - aj.left;
            ak = ak - aj.top;
            return {
                x: ah,
                y: ak
            }
        },
        startArrow: function(ai, ah, ak) {
            ah = ah || this.getDom();
            if (!ah) {
                return
            }
            ai = ai.toLowerCase();
            if (this.isSvg && ak == true) {
                if (this.map.palette.getElementsByTagName("marker").length == 0) {
                    this.arrowElement = this.arrow(ai);
                    ah._arrow = this.map.palette.getElementsByTagName("marker")[0]
                }
                this.setTypeNS(ah, "marker-start", "url(#" + ai + ")")
            } else {
                if (this.isVml) {
                    if (ah.childNodes.length == 0) {
                        var aj = O(ah, "<v:Stroke StartArrow=" + ai + "/>")
                    } else {
                        var aj = ah.childNodes[0];
                        aj.setAttribute("StartArrow", ai)
                    }
                }
            }
        },
        _startArrowF: function(ai, ah) {
            this.startArrow(ai, ah, true)
        },
        endArrow: function(ai, ah, ak) {
            ah = ah || this.getDom();
            if (!ah) {
                return
            }
            ai = ai.toLowerCase();
            if (this.isSvg && ak == true) {
                if (this.map.palette.getElementsByTagName("marker").length == 0) {
                    this.arrowElement = this.arrow(ai);
                    ah._arrow = this.map.palette.getElementsByTagName("marker")[0]
                }
                this.setTypeNS(ah, "marker-end", "url(#" + ai + ")")
            } else {
                if (this.isVml) {
                    if (ah.childNodes.length == 0) {
                        var aj = O(ah, "<v:Stroke endarrow=" + ai + "/>")
                    } else {
                        var aj = ah.childNodes[0];
                        aj.setAttribute("endarrow", ai)
                    }
                }
            }
        },
        _endArrowF: function(ai, ah) {
            this.endArrow(ai, ah, true)
        },
        setLineColor: function(ah) {
            if (this._config) {
                this._config.lineColor = ah
            }
            if (this.domElement) {
                this.setTypeNS(this.domElement, "strokecolor", ah)
            }
            if (this.arrowElement) {
                this.setTypeNS(this.arrowElement, "fill", ah)
            }
        },
        getLineColor: function() {
            return this._config.lineColor
        },
        setLineStroke: function(ah) {
            if (ah > 0) {
                this._config.weight = ah;
                this.setTypeNS(this.domElement, "strokeweight", this._config.weight + "px")
            }
        },
        getLineStroke: function() {
            return this._config.weight
        },
        setOpacity: function(ah) {
            if (ah > 1 || ah < 0) {
                return
            }
            this._config.opacity = ah;
            if (!this.map) {
                return
            }
            if (this.isSvg) {
                this.setTypeNS(this.getDom(), "stroke-opacity", ah);
                this.setTypeNS(this.getDom(), "fill-opacity", ah)
            } else {
                this.setTypeNS(this.getDom().childNodes[0], "opacity", ah);
                this.setTypeNS(this.getDom().childNodes[1], "opacity", ah)
            }
        },
        getOpacity: function() {
            return this._config.opacity
        },
        setLineStyle: function(ah) {
            if (ah != "solid" && ah != "dashed") {
                return
            }
            if (!ah) {
                ah = this._config.lineStyle
            } else {
                this._config.lineStyle = ah
            }
            if (!this.map) {
                return
            }
            var ai = this.getDom();
            if (this.isSvg) {
                ah = ah == "solid" ? 0: this.getLineStroke() * 2;
                this.setTypeNS(ai, "stroke-dasharray", ah)
            } else {
                if (this.isVml) {
                    ah = ah == "solid" ? "solid": "4 2 1 2";
                    if (ai.childNodes.length == 0) {
                        var aj = O(ai, '<v:Stroke dashstyle="' + ah + '"/>')
                    } else {
                        var aj = ai.childNodes[0];
                        aj.setAttribute("dashstyle", ah)
                    }
                }
            }
        },
        getLineStyle: function() {
            return this._config.lineStyle
        },
        setFillColor: function(ah) {
            if (ah) {
                this._config.fillColor = ah;
                if (this.domElement.getElementsByTagName("fill").length == 0 && this.isVml) {
                    this.domElement.innerHTML += "<v:fill />"
                }
                this.setTypeNS(this.domElement, "filled", true);
                this.setTypeNS(this.domElement, "fillcolor", ah)
            } else {
                this.setTypeNS(this.domElement, "filled", false)
            }
        },
        getFillColor: function() {
            if (this.toString() != "Rect" && this.toString() != "Polygon") {
                return
            }
            return this._config.fillColor
        },
        getIntersectLine: function(ay, aw) {
            if (!aw) {
                return [ay]
            }
            var am = [{
                x: ( - this.map.offsetX - this.drawMargin),
                y: ( - this.map.offsetY + this.map.height + this.drawMargin)
            },
            {
                x: ( - this.map.offsetX + this.map.width + this.drawMargin),
                y: ( - this.map.offsetY - this.drawMargin)
            }];
            var aq = [{
                x: (ay.x > aw.x ? aw.x: ay.x),
                y: (ay.y > aw.y ? ay.y: aw.y)
            },
            {
                x: (ay.x > aw.x ? ay.x: aw.x),
                y: (ay.y > aw.y ? aw.y: ay.y)
            }];
            var ak = [];
            var al = function(aB, az) {
                try {
                    if (parseInt(aB.x) >= (az[0]["x"] - 2) && parseInt(aB.x) <= (az[1]["x"] + 2) && parseInt(aB.y) >= (az[1]["y"] - 2) && parseInt(aB.y) <= (az[0]["y"] + 2)) {
                        return true
                    } else {
                        return false
                    }
                } catch(aA) {
                    return true
                }
            };
            var ax = function(aA) {
                if (aw.y == ay.y) {
                    return
                } else {
                    var az = parseInt(((aw.x - ay.x) * (aA - ay.y)) / (aw.y - ay.y) + ay.x);
                    if (al({
                        x: az,
                        y: aA
                    },
                    am)) {
                        return {
                            x: az,
                            y: aA
                        }
                    }
                }
            };
            var av = function(az) {
                if (aw.x == ay.x) {
                    return
                } else {
                    var aA = parseInt(((aw.y - ay.y) * (az - ay.x)) / (aw.x - ay.x) + ay.y);
                    if (al({
                        x: az,
                        y: aA
                    },
                    am)) {
                        return {
                            x: az,
                            y: aA
                        }
                    }
                }
            };
            var ao = al(ay, am);
            var au = al(aw, am);
            if (ao && au) {
                ak.push(ay);
                ak.push(aw)
            } else {
                if (ao || au) {
                    var aj = [];
                    if (ao) {
                        aj.push(ay)
                    }
                    if (ay.x == aw.x) {
                        var ai = {
                            x: ay.x,
                            y: am[0].y
                        };
                        var ah = {
                            x: ay.x,
                            y: am[1].y
                        };
                        if (al(ai, aq)) {
                            ak.push(ai)
                        }
                        if (al(ah, aq)) {
                            ak.push(ah)
                        }
                    } else {
                        if ((ay.y == aw.y)) {
                            var ai = {
                                x: am[0].x,
                                y: ay.y
                            };
                            var ai = {
                                x: am[0].x,
                                y: ay.y
                            };
                            if (al(ai, aq)) {
                                ak.push(ai)
                            }
                            if (al(ah, aq)) {
                                ak.push(ah)
                            }
                        } else {
                            for (var an = 0; an < 2; an++) {
                                var ap = am[an];
                                var at = av(ap.x);
                                if (at != null && al(at, aq)) {
                                    aj.push(at)
                                }
                                var ar = ax(ap.y);
                                if (ar != null && al(ar, aq)) {
                                    aj.push(ar)
                                }
                            }
                        }
                    }
                    if (au) {
                        aj.push(aw)
                    }
                    if (aj.length == 2) {
                        if (((ay.x - aw.x) > 0) == ((aj[0].x - aj[1].x) > 0) && ((ay.y - aw.y) > 0) == ((aj[0].y - aj[1].y) > 0)) {
                            ak.push(aj[0]);
                            ak.push(aj[1])
                        } else {
                            ak.push(aj[1]);
                            ak.push(aj[0])
                        }
                    }
                } else {
                    var aj = [];
                    for (var an = 0; an < 2; an++) {
                        var ap = am[an];
                        var at = av(ap.x);
                        if (at != null && al(at, am) && al(at, aq)) {
                            aj.push(at)
                        }
                        var ar = ax(ap.y);
                        if (ar != null && al(ar, am) && al(ar, aq)) {
                            aj.push(ar)
                        }
                    }
                    if (aj.length == 2) {
                        if (((ay.x - aw.x) > 0) == ((aj[0].x - aj[1].x) > 0)) {
                            ak.push(aj[0]);
                            ak.push(aj[1])
                        } else {
                            ak.push(aj[1]);
                            ak.push(aj[0])
                        }
                    }
                }
            }
            return ak
        }
    });
    if (document.namespaces && !document.namespaces.olv) {
        document.namespaces.add("olv", "urn:schemas-microsoft-com:vml");
        var Y = document.createStyleSheet();
        try {
            Y.addRule("v\\:*", "behavior: url(#default#VML);position: absolute; display: inline-block;")
        } catch(T) {}
    }
    function C(ah) {
        Z.call(this);
        this.map = null;
        this.domElement = null;
        this._config = {
            width: 0,
            height: 0,
            offset: [0, 0],
            opacity: 1,
            background: "transparent",
            lineStroke: 1,
            lineColor: "#000",
            lineStyle: "solid",
            point: null
        };
        this.setConfig(ah);
        this.point = this._config.point
    }
    C.inherits(Z, "Division");
    k.extend(C.prototype, {
        render: function() {
            var ah = this._config;
            var aj = this.content;
            var ai = ['<div class="BMap_Division" style="position:absolute;'];
            ai.push("width:" + ah.width + "px;display:block;");
            ai.push("overflow:hidden;");
            if (ah.borderColor != "none") {
                ai.push("border:" + ah.lineStroke + "px " + ah.lineStyle + " " + ah.lineColor + ";")
            }
            ai.push("opacity:" + ah.opacity + "; filter:(opacity=" + ah.opacity * 100 + ")");
            ai.push("background:" + ah.background + ";");
            ai.push('z-index:60;">');
            ai.push(aj);
            ai.push("</div>");
            return ai.join("")
        },
        initialize: function(ah) {
            this.map = ah;
            this._addOverlayDom();
            if (this.domElement) {
                k.on(this.domElement, "mousedown", 
                function(ai) {
                    ae(ai)
                })
            }
        },
        getPoint: function() {
            return this._config.point
        },
        _getPixel: function(ah) {
            return this.map.pointToPixel(this.getPoint())
        },
        setPoint: function(ah) {
            this._config.offset = [ - Math.round(this._config.width / 2) - Math.round(this._config.lineStroke), -Math.round(this._config.height / 2) - Math.round(this._config.lineStroke)];
            Z.prototype.setPoint.call(this, ah)
        },
        setDimension: function(ah, ai) {
            this._config.width = Math.round(ah);
            this._config.height = Math.round(ai);
            if (this.domElement) {
                this.domElement.style.width = this._config.width + "px";
                this.domElement.style.height = this._config.height + "px";
                this.setPoint(this._config.point)
            }
        }
    });
    function m(ak, ai) {
        this.imgUrl = ak;
        var aj = {
            offset: [0, 0],
            width: 32,
            height: 32,
            imgOffset: [0, 0]
        };
        for (var ah in ai) {
            if (ai == null) {
                return
            }
            for (var ah in ai) {
                if (typeof(aj[ah]) == typeof(ai[ah])) {
                    aj[ah] = ai[ah]
                }
            }
        }
        this.offset = aj.offset;
        this.width = aj.width > 0 ? aj.width: 32;
        this.height = aj.height > 0 ? aj.height: 32;
        this.imgWidth = aj.imgWidth > 0 ? aj.imgWidth: 32;
        this.imgHeight = aj.imgHeight > 0 ? aj.imgHeight: 32;
        this.imgOffset = aj.imgOffset
    }
    k.inherit(m, k.BaseClass, "Icon");
    m.prototype.setImgUrl = function(ah) {
        if (!ah || typeof ah != "string") {
            return
        }
        this.imgUrl = ah
    };
    m.prototype.getHTML = function() {
        if (k.Browser.ie == 6 && this.imgUrl.toLowerCase().indexOf(".png") > 0) {
            return ["<div", ' style="width: 1px; height: 1px;', "; left:" + parseInt(this.imgOffset[0]) + "px", "; top:" + parseInt(this.imgOffset[1]) + "px", "; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image,src='" + this.imgUrl + "')", '; position:absolute;"></div>'].join("")
        } else {
            return ['<img src="', this.imgUrl, '" style="left:' + parseInt(this.imgOffset[0]) + "px", "; top:" + parseInt(this.imgOffset[1]) + "px", '; position:absolute;" />'].join("")
        }
    };
    m.prototype.setSize = function(ah, ai) {
        ah = ah > 0 ? ah: 32;
        ai = ai > 0 ? ai: 32;
        this.width = ah;
        this.height = ai
    };
    m.prototype.setOffset = function(ah, ai) {
        this.offset[0] = ah;
        this.offset[1] = ai
    };
    m.prototype.setImgOffset = function(ah, ai) {
        this.imgOffset[0] = ah;
        this.imgOffset[1] = ai
    };
    function J(ai, ah) {
        k.BaseClass.call(this);
        this.content = ai;
        this.map = null;
        this._config = {
            width: 0,
            height: 0,
            maxWidth: 600,
            offset: [0, 0],
            title: "",
            maxContent: "",
            enableMaximize: false,
            margin: [10, 10, 10, 10],
            collisions: [[10, 10], [10, 10], [10, 10], [10, 10]]
        };
        this.setConfig(ah);
        if (this._config.width != 0) {
            if (this._config.width < 220) {
                this._config.width = 220
            }
            if (this._config.width > 730) {
                this._config.width = 730
            }
        }
        if (this._config.height != 0) {
            if (this._config.height < 60) {
                this._config.height = 60
            }
            if (this._config.height > 650) {
                this._config.height = 650
            }
        }
        if (this._config.maxWidth != 0) {
            if (this._config.maxWidth < 220) {
                this._config.maxWidth = 220
            }
            if (this._config.maxWidth > 730) {
                this._config.maxWidth = 730
            }
        }
        this.isWinMax = false;
        this.IMG_PATH = ac.imgPath + "/";
        this.overlay = null
    }
    J.inherits(k.BaseClass, "InfoWindow");
    k.extend(J.prototype, {
        initialize: function(aj) {
            if (!aj.map) {
                return
            }
            this.overlay = aj;
            this.map = aj.map;
            if (this.map.infoWindow) {
                var ai = this.map.infoWindow;
                k.hide(ai.popDom);
                k.hide(ai.shadowDom)
            }
            this.render();
            this.setEnableMaximize(this._config.enableMaximize);
            this.setTitle();
            this.setContent();
            this.reset(true);
            if (this.map.infoWindow.marker) {
                var ah = this.map.infoWindow.marker;
                this.map.infoWindow.marker = null
            }
            if (aj.toString() == "Marker") {
                this.map.infoWindow.marker = aj
            }
            var ak = this;
            this.map.addEventListener("dragstart", 
            function() {
                ak._setOverflow()
            });
            this.map.addEventListener("movestart", 
            function() {
                ak._setOverflow()
            });
            this.map.addEventListener("dragend", 
            function() {
                ak._resetOverflow()
            });
            this.map.addEventListener("moveend", 
            function() {
                ak._resetOverflow()
            })
        },
        render: function() {
            var al = this.map;
            var ai = this;
            if (!al.infoWindow) {
                al.infoWindow = {};
                var ah = ['<div class="shadow" style="position: absolute;display:none" type="infowindow_shadow">'];
                ah.push('<div><img style=" left: -323px; top: 0px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style=" left: -393px; top: 0px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style=" left: -1033px; top: 0px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style="top: -30px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style=" left: -360px; top: -30px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style="top: -30px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style=" left: -14px; top: -310px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style="left: -345px; top: -310px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style=" left: -440px; top: -310px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style=" left: -345px; top: -310px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push('<div><img style=" left: -754px; top: -310px;" src="' + this.IMG_PATH + 'iws3.png"/></div>');
                ah.push("</div>");
                ah.push('<div class="pop" style="position: absolute;display:none;cursor:default">');
                ah.push('<div><img style="border: 0px none ; margin: 0px; padding: 0px; position: absolute; left: 0px; top: 0px; width: 690px; height: 786px;" src="' + this.IMG_PATH + 'iw3.png"/></div>');
                ah.push('<div class="top"><img src="' + this.IMG_PATH + 'iw3.png" style="position: absolute; left: -65px; top: -60px;"/></div>');
                ah.push('<div><img style="border: 0px none ; margin: 0px; padding: 0px; position: absolute; left: -665px; top: 0px; width: 690px; height: 786px; " src="' + this.IMG_PATH + 'iw3.png"/></div>');
                ah.push('<div class="center"><img src="' + this.IMG_PATH + 'iw3.png" style="position: absolute; left: -65px; top: -60px;"/></div>');
                ah.push('<div><img style="border: 0px none ; margin: 0px; padding: 0px; position: absolute; left: 0px; top: -665px; width: 690px; height: 786px; " src="' + this.IMG_PATH + 'iw3.png"/></div>');
                ah.push('<div class="bottom"><img src="' + this.IMG_PATH + 'iw3.png" style="position: absolute; left: -65px; top: -146px;"/></div>');
                ah.push('<div><img style="border: 0px none ; margin: 0px; padding: 0px; position: absolute; left: -665px; top: -665px; width: 690px; height: 786px; " src="' + this.IMG_PATH + 'iw3.png"/></div>');
                ah.push('<div><img onmousedown="return false" style="border: 0px none ; margin: 0px; padding: 0px; position: absolute; left: -155px; top: -691px; width: 690px; height: 786px;" src="' + this.IMG_PATH + 'iw3.png"/></div>');
                ah.push('<div style="overflow-y: hidde;overflow-x:hidde; width:1px;height:1px;position: absolute; left: 16px; top: 16px;z-index: 10;"></div>');
                ah.push("</div>");
                al.infoWindow.popDom = O(al.platform, ah.join(""));
                al.infoWindow.shadowDom = al.infoWindow.popDom.previousSibling;
                al.infoWindow.popDiv = al.infoWindow.popDom.getElementsByTagName("div");
                al.infoWindow.shadoDiv = al.infoWindow.shadowDom.getElementsByTagName("div");
                al.infoWindow.contentMain = al.infoWindow.popDiv[8];
                al.infoWindow.titleDiv = O(al.infoWindow.popDiv[8], '<div class="BMap_bubble_title" style="display:block;width:100%;overflow:hidden;height:24px;line-height:24px"></div>');
                al.infoWindow.contentDiv = O(al.infoWindow.popDiv[8], '<div class="BMap_bubble_content" style="display:block;width:100%"></div>');
                al.infoWindow.maxContentDiv = O(al.infoWindow.popDiv[8], '<div class="BMap_bubble_max_content" style="display:none;position:relative"></div>');
                var aj = '<img style="position: absolute;top:12px; width: 12px; height: 12px; -moz-user-select: none; cursor: pointer; z-index: 10000;" src="' + this.IMG_PATH + 'iw_close.gif"/>';
                al.infoWindow.closeButton = O(al.infoWindow.popDom, aj);
                var ak = '<img style="position: absolute;top:12px; width: 12px; height: 12px; -moz-user-select: none; cursor: pointer; z-index: 10000;display:none" src="' + this.IMG_PATH + 'iw_plus.gif"/>';
                al.infoWindow.maxButton = O(al.infoWindow.popDom, ak);
                this._mendIE6(al.infoWindow)
            }
            al.infoWindow.hashCode = this.hashCode;
            al.infoWindow.closeButton.onclick = function(am) {
                ai.hide()
            };
            k.on(al.infoWindow.closeButton, "click", 
            function(am) {
                am.cancelBubble = true;
                am.returnValue = false
            });
            k.on(al.infoWindow.closeButton, "mouseout", 
            function(am) {
                am.cancelBubble = true;
                am.returnValue = false
            });
            k.on(al.infoWindow.popDiv, "click", 
            function(am) {
                if (!am) {
                    return
                }
                am.cancelBubble = true;
                am.returnValue = false
            });
            k.on(al.infoWindow.popDom, "mouseup", 
            function(am) {
                if (!am) {
                    return
                }
                am.cancelBubble = true
            });
            k.on(al.infoWindow.popDom, "mousedown", 
            function(am) {
                if (!am) {
                    return
                }
                am.cancelBubble = true
            });
            k.on(al.infoWindow.popDom, "mouseout", 
            function(am) {
                am.cancelBubble = true;
                am.returnValue = false
            });
            k.on(al.infoWindow.popDom, "mouseover", 
            function(am) {
                if (!am) {
                    return
                }
                am.cancelBubble = true;
                am.returnValue = false
            });
            k.on(al.infoWindow.popDom, "click", 
            function(am) {
                if (!am) {
                    return
                }
                am.cancelBubble = true
            });
            k.on(al.infoWindow.popDom, "dblclick", 
            function(am) {
                if (!am) {
                    return
                }
                am.cancelBubble = true;
                am.returnValue = false
            });
            k.on(al.infoWindow.popDom, "mousewheel", 
            function(am) {
                if (!am) {
                    return
                }
                am.cancelBubble = true;
                am.returnValue = false
            });
            k.on(al.infoWindow.popDom, "keydown", 
            function(am) {
                if (!am) {
                    return
                }
                am.cancelBubble = true
            });
            k.on(al.infoWindow.popDom, "selectstart", 
            function(am) {
                am.cancelBubble = true
            });
            if (window.addEventListener) {
                al.infoWindow.popDom.addEventListener("DOMMouseScroll", 
                function(am) {
                    if (!am) {
                        return
                    }
                    am.cancelBubble = true;
                    am.returnValue = false
                },
                false)
            }
            al.infoWindow.maxButton.onclick = function(an) {
                var am = ai.map.infoWindow.maxButton;
                if (am.src.indexOf("iw_plus") > 0 || am.src.indexOf("blank.gif") > 0) {
                    ai.isWinMax = true;
                    am.src = ai.IMG_PATH + "iw_minus.gif";
                    ai.setMaxContent();
                    ai.map.infoWindow.maxContentDiv.style.display = "block"
                } else {
                    ai.isWinMax = false;
                    am.src = ai.IMG_PATH + "iw_plus.gif";
                    ai.setContent();
                    ai.map.infoWindow.maxContentDiv.style.display = "none"
                }
                ai.reset(false);
                if (!an) {
                    return
                }
                an.cancelBubble = true;
                an.returnValue = false
            }
        },
        _mendIE6: function(ak) {
            if (k.isIE > 6 || k.isIE == 0) {
                return
            }
            var aj = ak.popDom.getElementsByTagName("IMG");
            for (var ai = 0; ai < aj.length; ai++) {
                aj[ai].style.cssText += ";FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + aj[ai].src + ",sizingMethod=crop)";
                aj[ai].src = this.IMG_PATH + "blank.gif"
            }
            var ah = ak.shadowDom.getElementsByTagName("IMG");
            for (var ai = 0; ai < ah.length; ai++) {
                ah[ai].style.cssText += ";FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + ah[ai].src + ",sizingMethod=crop)";
                ah[ai].src = this.IMG_PATH + "blank.gif"
            }
        },
        _setWinSize: function(ar, aq, aF) {
            var aC = this._config;
            ar = ar || aC.width;
            aq = aq || aC.height;
            if (aq < 0) {
                aq = 0
            }
            var al = aC.offset[0];
            var ap = aC.offset[1];
            var aB = [25, -1, 25, -1, 25, -1, 25, 97];
            var ak = [25, -1, 25, -1, 25, -1, 25, 50];
            aB[1] = ar - aB[0] - aB[2];
            if (k.isIE && document.compatMode != "CSS1Compat") {
                aB[3] = ar
            } else {
                aB[3] = ar - 2
            }
            aB[5] = ar - aB[4] - aB[6];
            ak[1] = ak[0];
            ak[3] = aq - ak[0] - ak[4];
            if (k.isIE && document.compatMode != "CSS1Compat") {
                ak[5] = ak[4]
            } else {
                ak[5] = ak[4] - 1
            }
            var aD = [0, aB[0], ar - aB[2], 0, 0, aB[4], ar - aB[6], Math.ceil((ar - aB[7]) / 2)];
            var ax = [0, 0, 0, aB[0], aq - aB[4], aq - aB[4], aq - aB[4], aq - aB[4]];
            var ai = al - (ar - aB[7]) / 2 - 32;
            var ay = ap - aq - 24;
            var aE = Math.floor((aq + ak[7]) / 2.03) + 30;
            var an = [70, -1, 70, -1, -1, -1, 70, -1, 140, -1, 70];
            var aw = [30, 30, 30, 25, 25, 25, 60, 60, 60, 60, 60];
            an[7] = (ar + 80 - (an[6] + an[8] + an[10]) - 50) / 2;
            an[9] = an[7] + 50;
            var aA = an[6] + an[7] + an[8] + an[9] + an[10];
            an[1] = aA - an[0] - an[2] - 29;
            an[5] = an[3] = aE - aw[0] - aw[6] + 70;
            aw[3] = aw[4] = aw[5] = aE - aw[0] - aw[6];
            an[4] = (an[0] + an[1] + an[2] + aw[3] + 29) - an[5] - an[3];
            var ah = [aE - 60 - 1, aE - 60 - 1 + an[0], aE - 60 - 1 + an[0] + an[1], 29, 29 + an[3], 29 + an[3] + an[4], 0, an[6], an[6] + an[7], an[6] + an[7] + an[8], an[6] + an[7] + an[8] + an[9] ];
            var av = [0, 0, 0, aw[0], aw[0], aw[0], aw[0] + aw[3], aw[0] + aw[3], aw[0] + aw[3], aw[0] + aw[3], aw[0] + aw[3]];
            allShadowLeft = al - an[6] - an[7] - 70;
            allShadowTop = ap - aE + 30;
            var am = 323 - aE + 90;
            shadowRightImageLeft = 740 + am;
            var aj = "";
            var az = function(aG) {
                return "overflow: hidden; z-index: 1; position: absolute;              left:" + aD[aG] + "px;              top:" + ax[aG] + "px;              width:" + aB[aG] + "px;              height:" + ak[aG] + "px"
            };
            var at = function(aG) {
                return "overflow: hidden; z-index: 1; position: absolute;              left:" + ah[aG] + "px;              top:" + av[aG] + "px;              width:" + an[aG] + "px;              height:" + aw[aG] + "px;"
            };
            var ao = this.map.infoWindow;
            ao.popDom.style.top = ay + "px";
            ao.popDom.style.left = ai + "px";
            ao.shadowDom.style.top = allShadowTop + "px";
            ao.shadowDom.style.left = allShadowLeft + "px";
            for (var au = 0; au < 8; au++) {
                ao.popDiv[au].style.cssText = az(au)
            }
            for (var au = 0; au < ao.shadoDiv.length; au++) {
                ao.shadoDiv[au].style.cssText = at(au)
            }
            ao.shadoDiv[3].firstChild.style.left = "-" + am + "px";
            ao.shadoDiv[5].firstChild.style.left = "-" + shadowRightImageLeft + "px";
            if (aF != null) {
                this.show()
            }
        },
        setWidth: function(ah) {
            if (typeof(ah) != "number") {
                return
            }
            if (ah < 0) {
                return
            }
            this._config.width = ah;
            if (ah != 0) {
                if (ah < 220) {
                    this._config.width = 220
                }
                if (ah > 730) {
                    this._config.width = 730
                }
            }
            if (this.map && this.map.infoWindow) {
                this.reset(true)
            }
        },
        setHeight: function(ah) {
            if (typeof(ah) != "number") {
                return
            }
            if (ah < 0) {
                return
            }
            if (ah != 0) {
                if (ah < 60) {
                    ah = 60
                }
                if (ah > 650) {
                    ah = 650
                }
            }
            this._config.height = ah;
            if (this.map && this.map.infoWindow) {
                if (this._config.width != 0) {
                    map.infoWindow.contentDiv.style.width = this._config.width + "px"
                }
            }
            this.reset(true)
        },
        setMaxWidth: function(ah) {
            if (!typeof(ah) != "number") {
                return
            }
            if (ah < 0) {
                return
            }
            this._config.maxWidth = ah
        },
        setTitle: function(ah) {
            ah = ah || this._config.title;
            ah = ah.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");
            this._config.title = ah;
            if (!this.map || !this.map.infoWindow) {
                return
            }
            if (ah == "") {
                k.hide(map.infoWindow.titleDiv);
                return
            }
            map.infoWindow.titleDiv.innerHTML = ah;
            k.show(map.infoWindow.titleDiv)
        },
        setContent: function(aj) {
            var ai = aj;
            aj = aj || this.content;
            var ak = this.map;
            this.content = aj;
            if (!ak || !ak.infoWindow) {
                return
            }
            if (this.isWinMax) {
                return
            }
            if (this._config.width != 0) {
                ak.infoWindow.contentDiv.style.width = this._config.width + "px"
            }
            if (aj.indexOf("<") != 0) {
                var ah = this._config.width;
                if (ah < 220) {
                    ah = 220
                }
                if (ah > 730) {
                    ah = 730
                }
                aj = '<div style="width:' + ah + 'px">' + aj + "</div>"
            }
            ak.infoWindow.contentDiv.innerHTML = aj;
            ak.infoWindow.maxContentDiv.style.display = "none";
            if (navigator.userAgent.indexOf("Safari") > 0) {
                ak.infoWindow.contentDiv.style.display = "block"
            } else {
                ak.infoWindow.contentDiv.style.display = "inline"
            }
        },
        setMaxContent: function(ah) {
            if (!ah) {
                ah = this._config.maxContent
            } else {
                this._config.maxContent = ah
            }
            var ai = this.map;
            if (!ai || !ai.infoWindow) {
                return
            }
            ai.infoWindow.maxContentDiv.innerHTML = ah;
            if (!this.isWinMax) {
                return
            }
            ai.infoWindow.contentDiv.style.display = "none";
            if (navigator.userAgent.indexOf("Safari") > 0) {
                ai.infoWindow.maxContentDiv.style.display = "black"
            } else {
                ai.infoWindow.maxContentDiv.style.display = "inline"
            }
        },
        reset: function(ah) {
            var ai = this;
            setTimeout(function(ao) {
                var al = ai.map.infoWindow;
                var ap = 0;
                if (al.titleDiv.style.display != "none") {
                    ap = 24
                }
                if (ai.isWinMax) {
                    aj = ai._config.maxWidth;
                    var an = ap + al.maxContentDiv.scrollHeight;
                    an = an > ai.map.height ? ai.map.height - 60: an
                } else {
                    al.contentMain.style.width = al.contentMain.style.height = "auto";
                    al.contentDiv.style.display = "block";
                    var ak = al.contentDiv.scrollWidth;
                    var am = al.titleDiv.scrollWidth;
                    var aj = ak > am ? ak: am;
                    aj = ai._config.width == 0 ? aj: ai._config.width;
                    an = al.contentDiv.scrollHeight + ap
                }
                an = ai._config.height == 0 ? an: ai._config.height;
                if (ai._config.width == 0) {
                    al.contentMain.style.overflowX = "hidden"
                } else {
                    al.contentMain.style.overflowX = "auto"
                }
                if (ai._config.height == 0) {
                    al.contentMain.style.overflowY = "hidden"
                } else {
                    al.contentMain.style.overflowY = "auto"
                }
                aj = aj < 220 ? 220: aj;
                aj = aj > 600 ? 600: aj;
                an = an < 55 ? 55: an;
                an = an > 440 ? 440: an;
                ai._setWinSize(aj + 32, an + 32, ah);
                al.contentMain.style.width = aj + "px";
                al.contentMain.style.height = an + "px";
                al.closeButton.style.left = aj + 7 + "px";
                al.maxButton.style.left = (aj - 20) + 7 + "px";
                if (ah != false) {
                    ai.dispatchEvent(new ad("onresize"))
                }
            },
            20)
        },
        setPosition: function() {
            var ah = this.map.temp;
            var ai = this.overlay;
            if (ah.pop && ai && ai.getDom()) {
                ah.pop.style.top = ah.shadow.style.top = parseInt(ai.getDom().style.top) + "px";
                ah.pop.style.left = ah.shadow.style.left = parseInt(ai.getDom().style.left) + "px"
            }
        },
        setPanTo: function() {
            if (!this.overlay || !this.overlay.point) {
                return
            }
            var ay = this.map;
            var ak = ay.infoWindow.popDiv;
            var az = ay.infoWindow.popDom;
            var al = parseFloat(ak[1].style.width) + 50;
            var av = parseFloat(ak[3].style.height) + parseFloat(ak[7].style.height) + 50;
            var at = parseFloat(az.style.left);
            var an = parseFloat(az.style.top);
            var ai = ay.pointToPixel(this.overlay.point);
            var ap = new q(ai.x + at, ai.y + an);
            var ao = new q(ai.x + al + at, ai.y + av + an);
            if (this._config.height != 0 && document.all) {
                if (!ay.temp.infoKey) {
                    ay.temp.infoKey = -1
                }
                var aw = -ay.temp.infoKey;
                ay.temp.infoKey = -ay.temp.infoKey
            } else {
                var aw = 0;
                var au = 0;
                var ah = 10;
                var aj = this._config.margin[0];
                var am = this._config.margin[1];
                var ax = this._config.margin[2];
                var aq = this._config.margin[3];
                if (ap.x < aq) {
                    aw = -ap.x + aq
                }
                if (ap.y < aj) {
                    au = -ap.y + aj
                }
                if (ao.x > ay.width - am) {
                    aw = ay.width - ao.x - am
                }
                if (ao.y > ay.height - ax) {
                    au = ay.height - ao.y - ax
                }
                var ar = this._config.collisions;
                if (ap.x < ar[0][0] && ap.y < ar[0][1]) {
                    if (Math.abs( - ap.x + ar[0][0]) < Math.abs( - ap.y + ar[0][1])) {
                        aw = -ap.x + ar[0][0]
                    } else {
                        if (ay.height - ar[0][1] - ar[3][1] < av) {
                            aw = -ap.x + ar[0][0]
                        } else {
                            au = -ap.y + ar[0][1]
                        }
                    }
                    if (ay.width - ar[0][0] - ar[1][0] < al && ap.y < ar[1][1]) {
                        au = -ap.y + ar[1][1]
                    }
                }
                if (ao.x > ay.width - ar[1][0] && ap.y < ar[1][1]) {
                    if (Math.abs( - ao.x + ay.width - ar[1][0]) < Math.abs( - ap.y + ar[1][1]) && ay.width - ar[0][0] - ar[1][0] >= al) {
                        aw = -ao.x + ay.width - ar[1][0]
                    } else {
                        au = -ap.y + ar[1][1];
                        if (ay.width - ar[0][0] - ar[1][0] < al && ay.width - ar[0][0] < al) {
                            aw = -ap.x + ar[0][0]
                        }
                    }
                }
                if (ap.x < ar[3][0] && ao.y > ay.height - ar[2][1]) {
                    if (Math.abs( - ap.x + ar[3][0]) < Math.abs( - ao.y + ay.height - ar[2][1])) {
                        aw = -ap.x + ar[3][0]
                    } else {
                        au = -ao.y + ay.height - ar[2][1]
                    }
                    if (ay.height - ar[0][1] - ar[3][1] < av && ap.x < ar[3][0]) {
                        aw = -ap.x + ar[0][0]
                    }
                }
                if (ao.x > ay.width - ar[2][0] && ao.y > ay.height - ar[2][1]) {
                    if (Math.abs( - ao.x + ay.width - ar[2][0]) < Math.abs( - ao.y + ay.height - ar[2][1]) && ay.width - ar[0][0] - ar[1][0] >= al) {
                        aw = -ao.x + ay.width - ar[2][0]
                    } else {
                        if (ay.height - ar[1][1] - ar[2][1] >= av) {
                            au = -ao.y + ay.height - ar[2][1]
                        } else {
                            au = -ap.y + ar[1][1]
                        }
                        if (ay.width - ar[0][0] - ar[2][0] < al) {
                            aw = -ap.x + ar[0][0]
                        }
                    }
                }
                ay.panBy(aw, au)
            }
        },
        setEnableMaximize: function(ah) {
            if (typeof(ah) == "boolean") {
                this._config.enableMaximize = ah;
                if (!this.map || !this.map.infoWindow) {
                    return
                }
                if (ah) {
                    this.map.infoWindow.maxButton.style.display = "block"
                } else {
                    this.map.infoWindow.maxButton.style.display = "none"
                }
            }
        },
        remove: function() {},
        copy: function() {},
        show: function() {
            var ah = this.map.infoWindow;
            if (ah.popDom.style.display != "none") {
                return
            }
            k.show(ah.popDom);
            k.show(ah.shadowDom);
            this.dispatchEvent(new ad("onopen"))
        },
        hide: function() {
            var ah = this.map.infoWindow;
            if (ah.popDom.style.display == "none") {
                return
            }
            k.hide(ah.popDom);
            k.hide(ah.shadowDom);
            this.dispatchEvent(new ad("onclose"));
            if (this.isWinMax) {
                this.isWinMax = false;
                this.map.infoWindow.maxButton.src = this.IMG_PATH + "iw_plus.gif"
            }
        },
        close: function() {
            this.hide()
        },
        dispose: function() {
            k.BaseClass.prototype.dispose.call(this)
        },
        getObject: function() {
            return this.domElement
        },
        setConfig: function(ai) {
            if (ai == null) {
                return
            }
            for (var ah in ai) {
                if (typeof(this._config[ah]) == typeof(ai[ah])) {
                    this._config[ah] = ai[ah]
                }
            }
        },
        _revert: function() {
            if (!this.map && !this.map.infoWindow) {
                return
            }
            this.isWinMax = false;
            this.map.infoWindow.titleDiv.innerHTML = "";
            this.map.infoWindow.contentDiv.innerHTML = "";
            this.map.infoWindow.maxContentDiv.innerHTML = "";
            this.map.infoWindow.maxButton.src = this.IMG_PATH + "iw_plus.gif"
        },
        _setOverflow: function() {
            if (map.infoWindow) {
                map.infoWindow._overflowX = map.infoWindow.contentMain.style.overflowX;
                map.infoWindow._overflowY = map.infoWindow.contentMain.style.overflowY;
                map.infoWindow.contentMain.style.overflowX = "hidden";
                map.infoWindow.contentMain.style.overflowY = "hidden"
            }
        },
        _resetOverflow: function() {
            var ah = this;
            if (!map.infoWindow || !map.infoWindow._overflowX || !map.infoWindow._overflowY) {
                return
            }
            map.infoWindow.contentMain.style.overflowX = map.infoWindow._overflowX;
            map.infoWindow.contentMain.style.overflowY = map.infoWindow._overflowY;
            delete map.infoWindow._overflowX;
            delete map.infoWindow._overflowY
        },
        isOpen: function() {
            var ah = this.map.temp.infoWin;
            if (ah && ah.overlay == this.overlay && this.map && this.map.infoWindow && this.map.infoWindow.popDom.style.display == "none") {
                return false
            } else {
                return true
            }
        }
    });
    function K(ai, ah) {
        Z.call(this);
        this.content = ai;
        this.map = null;
        this.domElement = null;
        this._config = {
            width: 0,
            offset: [0, 0],
            opacity: 1,
            color: "black",
            borderWidth: 1,
            background: "#FFF",
            borderColor: "#F00",
            point: {},
            fontSize: 12,
            cursor: "",
            padding: "1px",
            fontWeight: "normal",
            lineHeight: "",
            zIndex: 60,
            title: ""
        };
        this.setConfig(ah);
        if (this._config.width < 0) {
            this._config.width = 0
        }
        this.point = this._config.point;
        if (this._config.opacity < 0) {
            this._config.opacity = 0
        }
        if (this._config.opacity > 1) {
            this._config.opacity = 1
        }
        if (this._config.borderWidth <= 0) {
            this._config.borderWidth = 1
        }
        if (this._config.fontSize <= 0) {
            this._config.fontSize = 12
        }
    }
    K.inherits(Z, "Label");
    k.extend(K.prototype, {
        render: function() {
            var ah = this._config;
            var aj = this.content;
            var ai = ['<label class="BMapLabel" '];
            if (ah.title != "") {
                ai.push('title="' + ah.title + '" ')
            }
            ai.push('style="position:absolute;z-index:80;white-space:nowrap;padding:' + ah.padding + ";");
            if (ah.cursor) {
                ai.push("cursor:" + ah.cursor + ";")
            }
            if (ah.width == 0 || ah.width == "auto") {
                ai.push("display:inline;")
            } else {
                ai.push("width:" + ah.width + "px;display:block;");
                ai.push("overflow:hidden;")
            }
            if (ah.borderColor != "none") {
                ai.push("border:" + ah.borderWidth + "px solid " + ah.borderColor + ";")
            }
            ai.push("color:" + ah.color + ";");
            ai.push("background:" + ah.background + ";");
            ai.push("font-size:" + ah.fontSize + "px;");
            ai.push("font-weight:" + ah.fontWeight + ";");
            if (k.Browser.ie && this._config.opacity != 1) {
                ai.push("filter:alpha(opacity=" + this._config.opacity * 100 + ");")
            } else {
                ai.push("opacity:" + this._config.opacity + ";")
            }
            if (ah.lineHeight != "") {
                ai.push("line-height:" + ah.lineHeight + ";")
            }
            ai.push("z-index:" + ah.zIndex + '">');
            ai.push(aj);
            ai.push("</Label>");
            return ai.join("")
        },
        afterZoom: function() {},
        initialize: function(ah) {
            this.map = ah;
            this._addOverlayDom()
        },
        _getPixel: function(ah) {
            return this.map.pointToPixel(this.getPoint())
        },
        setContent: function(ah) {
            this.content = ah;
            if (this.domElement) {
                this.domElement.innerHTML = ah
            }
        },
        setOpacity: function(ah) {
            if (ah >= 0 && ah <= 1) {
                this._config.opacity = ah
            }
            if (this.domElement) {
                U(this.domElement, ah)
            }
        },
        setOffset: function(ah, ai) {
            this._config.offset[0] = ah;
            this._config.offset[1] = ai
        }
    });
    function E(ah, ai) {
        Z.call(this);
        this.point = ah;
        this.map = null;
        this.domElement = null;
        this.iconDom = null;
        this.infoWindowDom = null;
        this.siblingElement = null;
        this.iconClassName = "none";
        this.isDraging = false;
        this._config = {
            width: 0,
            height: 0,
            offset: [0, 0],
            opacity: 1,
            icon: null,
            infoWindow: null,
            label: null,
            baseZIndex: 2500000,
            clickable: true,
            zIndexFixed: false,
            isTop: false
        };
        this.setConfig(ai)
    }
    E.inherits(Z, "Marker");
    k.extend(E.prototype, {
        render: function() {
            var ah = ['<span class="BMap_Marker" style="position:absolute;padding:0;margin:0;border:0;width:0;height:0;z-index:60;-moz-user-select:none">'];
            ah.push("</span>");
            return ah.join("")
        },
        siblingRender: function() {
            var ah = ['<span class="BMap_Marker" style="position:absolute;padding:0;margin:0;border:0;width:0;height:0;z-index:40;-moz-user-select:none">'];
            ah.push("</span>");
            return ah.join("")
        },
        remove: function() {
            if (this.domElement && this.domElement.parentNode) {
                this.domElement.parentNode.removeChild(this.domElement)
            }
            if (this.siblingElement && this.siblingElement.parentNode) {
                this.siblingElement.parentNode.removeChild(this.siblingElement)
            }
            if (this.infoWindow && this.infoWindow.overlay && this.infoWindow.overlay === this) {
                this.closeInfoWindow();
                this.infoWindow = null
            }
            this.domElement = null;
            this.siblingElement = null;
            this.iconDom = null;
            this.iconArea = null;
            if (this._config.label) {
                this._config.label.domElement = null
            }
            this.dispatchEvent(new ad("onremove"))
        },
        hide: function() {
            k.hide(this.domElement);
            k.hide(this.siblingElement)
        },
        show: function() {
            k.show(this.domElement);
            k.show(this.siblingElement)
        },
        afterZoom: function() {},
        initialize: function(ah) {
            this.map = ah;
            this._addOverlayDom();
            this.setIcon(this._config.icon);
            this.setLabel(this._config.label);
            this.enableDraging(this.isDraging)
        },
        setIcon: function(aj) {
            if (!aj || aj && aj.toString() != "Icon") {
                return
            }
            this._config.icon = aj;
            if (!this.map) {
                return
            }
            var al = this.map;
            var ah = -aj.width / 2 + aj.offset[0];
            var am = -aj.height / 2 + aj.offset[1];
            try {
                if (this.iconDom) {
                    this.siblingElement.removeChild(this.iconDom);
                    this.iconDom = null
                }
                if (this.iconArea) {
                    this.domElement.removeChild(this.iconArea);
                    this.iconArea = null
                }
            } catch(ak) {}
            if (this._config.icon) {
                var ai = ['<div style="position:absolute;padding:0;margin:0;border:0;'];
                if (this._config.clickable) {
                    ai.push("cursor:pointer;")
                }
                ai.push("background:url('styles/bmap/blank.gif');");
                ai.push("width:" + aj.width + "px;");
                ai.push("height:" + aj.height + "px;");
                ai.push("left:" + ah + "px;");
                ai.push("top:" + am + "px;");
                ai.push('"></div>');
                this.iconArea = O(this.domElement, ai.join(""));
                var ai = ['<div style="position:absolute;padding:0;margin:0;border:0;overflow:hidden;'];
                ai.push("width:" + aj.width + "px;");
                ai.push("height:" + aj.height + "px;");
                ai.push("left:" + ah + "px;");
                ai.push("top:" + am + 'px;"');
                if (this.iconClassName != "none") {
                    ai.push(' class="' + this.iconClassName + '"')
                }
                ai.push(">");
                ai.push(aj.getHTML());
                ai.push("</div>");
                this.iconDom = O(this.siblingElement, ai.join(""));
                this.iconDom.galleryImg = false
            }
        },
        setIconClassName: function(ah) {
            if (this.iconDom) {
                this.iconDom.className = ah
            }
        },
        getIcon: function() {
            if (!this._config.icon || this._config.icon && this._config.icon.toString() != "Icon") {
                return
            } else {
                return this._config.icon
            }
        },
        setLabel: function(ah) {
            if (!ah || ah && ah.toString() != "Label") {
                return
            }
            this._config.label = ah;
            this.map.addOverlay(ah);
            if (ah.getDom()) {
                this.siblingElement.appendChild(ah.getDom())
            } else {
                ah.domElement = O(this.domElement, ah.render());
                ah.domElement.hashCode = ah.getHashCode()
            }
            ah.domElement.style.left = (ah._config.offset[0]) + "px";
            ah.domElement.style.top = (ah._config.offset[1]) + "px"
        },
        getLabel: function() {
            if (this._config.label && this._config.label.toString() == "Label") {
                return this._config.label
            } else {
                return
            }
        },
        enableDraging: function(ai) {
            this.isDraging = ai;
            if (!this.domElement) {
                return
            }
            var al = this;
            var ah = 0;
            var ao = 0;
            var aj = 0;
            var ak = false;
            var an = {
                x: 0,
                y: 0
            };
            this.dragStart = function(aq) {
                ak = true;
                var ap = al.map.pointToPixel(al.point);
                ah = aq.clientX - ap.x;
                ao = aq.clientY - ap.y;
                aj = new Date().getTime();
                k.on(document, "mousemove", al.dragIng);
                k.on(document, "mouseup", al.dragEnd);
                if (al.domElement && al.domElement.setCapture) {
                    al.domElement.setCapture()
                }
                if (k.Browser.ie) {
                    al.dispatchEvent(I(aq, new ad("ondragstart").inherit(aq)))
                } else {
                    al.dispatchEvent(new ad("ondragstart").inherit(n(aq)))
                }
            };
            this.dragEnd = function(ap) {
                if (al.domElement && al.domElement.releaseCapture) {
                    al.domElement.releaseCapture()
                }
                ak = false;
                k.un(document, "mousemove", al.dragIng);
                k.un(document, "mouseup", al.dragEnd);
                ah = ao = 0;
                if ((new Date()).getTime() - aj >= 100 && (an.x > 2 || an.y > 2)) {
                    if (k.Browser.ie) {
                        al.dispatchEvent(I(ap, new ad("ondragend").inherit(ap)))
                    } else {
                        al.dispatchEvent(new ad("ondragend").inherit(n(ap)))
                    }
                }
            };
            this.dragIng = function(ar) {
                if (ak == false) {
                    return
                }
                var aq = new q((ar.clientX - ah), (ar.clientY - ao));
                an = aq;
                if ((aq.x > 15 && aq.x < map.width - 15) && (aq.y > 30 && aq.y < map.height - 15)) {
                    var ap = al.map.pixelToPoint(aq);
                    al.setPoint(ap)
                }
                if (k.Browser.ie) {
                    al.dispatchEvent(I(ar, new ad("ondraging").inherit(ar)))
                } else {
                    al.dispatchEvent(new ad("ondraging").inherit(n(ar)))
                }
            };
            if (ai == true) {
                k.on(this.domElement, "mousedown", this.dragStart)
            } else {
                try {
                    k.un(this.domElement, "mousedown", this.dragStart)
                } catch(am) {}
            }
        },
        setTop: function(ai, ah) {
            if (ai) {
                this._config.isTop = true
            } else {
                this._config.isTop = false
            }
            this.setZIndex(ah)
        },
        setPoint: function(ah, ai) {
            Z.prototype.setPoint.call(this, ah);
            this.setZIndex()
        },
        setZIndex: function(ai) {
            var ah = this;
            if (ah._config.zIndexFixed == false) {
                ah.zIndex = ah._config.baseZIndex + 2 * ah._elemTop + (ah._config.isTop ? ai || 1000000: 0)
            } else {
                ah.zIndex = ah._config.baseZIndex + (ah._config.isTop ? ai || 1000000: 0)
            }
            if (ah.domElement && ah.domElement.style) {
                ah.domElement.style.zIndex = ah.zIndex
            }
            if (ah.siblingElement) {
                ah.siblingElement.style.zIndex = ah.zIndex
            }
        }
    });
    function v(ah, ai) {
        X.call(this, ai);
        this.points = ah.slice(0);
        this.pixels = null;
        this.map = null;
        this.domElement = null
    }
    v.inherits(X, "Polygon");
    k.extend(v.prototype, {
        render: function() {
            var ah = [""];
            return ah.join("")
        },
        afterZoom: function() {},
        initialize: function(ah) {
            this.map = ah;
            this.createPalette();
            this.domElement = this.polyline(this.points, true);
            this.domElement.hashCode = this.getHashCode();
            this.setLineColor(this._config.lineColor);
            this.setLineStroke(this._config.weight);
            this.setLineStyle(this._config.lineStyle);
            this.setFillColor(this._config.fillColor);
            this.setOpacity(this._config.opacity)
        },
        getPoint: function() {},
        getPoints: function() {
            return this.points
        },
        setPoint: function(ah) {}
    });
    function x(ah, ai) {
        X.call(this, ai);
        this.points = ah.slice(0);
        this.pixels = null;
        this.map = null;
        this.domElement = null
    }
    x.inherits(X, "Polyline");
    k.extend(x.prototype, {
        render: function() {
            var ah = [""];
            return ah.join("")
        },
        afterZoom: function() {},
        initialize: function(ah) {
            this.map = ah;
            this.createPalette();
            this.domElement = this.polyline(this.points);
            this.domElement.hashCode = this.getHashCode();
            this.setTypeNS(this.domElement, "filled", false);
            this.setLineColor(this._config.lineColor);
            this.setLineStroke(this._config.weight);
            this.setLineStyle(this._config.lineStyle);
            this.setOpacity(this._config.opacity)
        },
        getPoints: function() {
            return this.points
        },
        remove: function() {
            X.prototype.remove.call(this)
        }
    });
    function d() {
        this.map = null;
        this.lengthMax = 200;
        this.cacheBox = null
    }
    w.register(function(ai) {
        var ah = new d();
        ah.map = ai;
        ai.overlayCache = ah;
        ah.cacheBox = document.createElement("div");
        ai.addEventListener("load", 
        function(aj) {
            ah.district();
            ah.zoom(aj)
        });
        ai.addEventListener("moveend", 
        function(aj) {
            ah.district();
            ah.zoom(aj)
        });
        ai.addEventListener("dragend", 
        function(aj) {
            ah.district();
            ah.zoom(aj)
        });
        ai.addEventListener("zoomend", 
        function(aj) {
            ah.district();
            ah.zoom(aj)
        });
        ai.addEventListener("onclearoverlays", 
        function(an) {
            var am = ai.overlayDiv.childNodes;
            for (var ak = 0; ak < am.length; ak++) {
                var al = am[ak];
                if (al.getAttribute("type") != "system") {
                    if (al.getAttribute("hashCode")) {
                        k.I(al.getAttribute("hashCode")).remove()
                    } else {}
                    ak--
                } else {
                    var ao = al.childNodes;
                    for (var aj = 0; aj < ao.length; aj++) {
                        if (ao[aj].hashCode != null) {
                            k.I(ao[aj].hashCode).remove()
                        } else {
                            ao[aj].parentNode.removeChild(ao[aj]);
                            if (ao[aj]) {
                                ao[aj] = null
                            }
                        }
                        aj--
                    }
                }
            }
            ai.infoWindow = ai.temp.infoWin = ai.temp.pop = ai.temp.shadow = null;
            am = null
        });
        ai.addEventListener("oninfowindowopen", 
        function(ak) {
            var aj = this.map.infoWindow;
            k.hide(aj.popDom);
            k.hide(aj.shadowDom)
        })
    });
    d.prototype.zoom = function(at) {
        var au = this.map.temp.overlayDiv.childNodes;
        var ao = this.map.temp.markerDiv.childNodes;
        var ar = this.map.temp.labelDiv.childNodes;
        for (var aq = 0; aq < au.length; aq++) {
            if (au[aq].tagName == "svg") {
                continue
            }
            var ap = k.I(au[aq].hashCode);
            if (ap && ap.point) {
                if (ap.point.toString() == "Point") {
                    ap.setPoint(ap.point)
                }
            }
        }
        this.revisePoint(ao);
        this.revisePoint(ar);
        if (this.map.temp.infoWin) {
            this.map.temp.infoWin.setPosition()
        }
        if (this.map.palette) {
            var ak = this.map.palette;
            var ai = ak.childNodes;
            if ((ak.tagName != "svg" && (at.type == "ondragend" || at.type == "onmoveend"))) {
                var ah = this.map.temp.drawView;
                if (ah == null) {
                    return
                }
                var aj = this.map.pointToPixel(ah.point);
                var am = ah.margin;
                if (Math.abs(aj.x - this.map.width / 2) < am && Math.abs(aj.y - this.map.height / 2) < am) {
                    return
                }
            }
            for (var aq = 0; aq < ai.length; aq++) {
                if (ai[aq].tagName == "shape" || ai[aq].tagName == "path") {
                    var al = k.I(ai[aq].hashCode);
                    if (al && al.points) {
                        if (ai[aq].tagName == "shape") {
                            ai[aq].setAttribute("path", "m0 0")
                        }
                        al.setPolylinePoint(ai[aq], al.points)
                    }
                }
            }
            if (al && ak.tagName == "svg") {
                var an = k.I(al.hashCode);
                al.setPalette()
            }
        }
    };
    d.prototype.revisePoint = function(aj) {
        for (var ai = 0; ai < aj.length; ai++) {
            var ah = k.I(aj[ai].hashCode);
            if (ah && ah.point) {
                if (ah.point.toString() == "Point") {
                    ah.setPoint(ah.point)
                }
            }
        }
    };
    d.prototype.district = function() {
        var aj = this.map;
        var ao = aj.overlayDiv.childNodes;
        var aq = aj.markerDiv.childNodes;
        var ak = this.cacheBox.childNodes;
        var ar = aj.pixelToPoint(new q( - aj.width / 2, aj.height * 3 / 2));
        var ap = aj.pixelToPoint(new q(aj.width * 3 / 2, -aj.height / 2));
        var ai = new l(ar.lng, ar.lat, ap.lng, ap.lat);
        for (var an = 0; an < ak.length; an++) {
            var ah = ak[an];
            if (!ah.hashCode) {
                continue
            }
            var am = k.I(ah.hashCode);
            if (!am.point) {
                continue
            }
            if (ai.containsPoint(am.point)) {
                aj.addOverlay(am)
            }
        }
        if (ao.length < 4000) {
            return
        }
        if (aq.length < 4000) {
            return
        }
        for (var an = 0; an < ao.length; an++) {
            var ah = ao[an];
            if (!ah.hashCode) {
                continue
            }
            var am = k.I(ah.hashCode);
            if (!am.point) {
                continue
            }
            if (!ai.containsPoint(am.point)) {
                this.cacheBox.appendChild(ah)
            }
        }
        for (var an = 0; an < aq.length; an++) {
            var at = aq[an];
            if (!at.hashCode) {
                continue
            }
            var al = k.I(at.hashCode);
            if (!al.point) {
                continue
            }
            if (!ai.containsPoint(al.point)) {
                this.cacheBox.appendChild(at);
                this.cacheBox.appendChild(al.siblingElement)
            }
        }
    };
    d.prototype.addCache = function(ah) {
        this.cacheBox.appendChild(ah);
        if (this.cacheBox.childNodes.length > this.lengthMax) {
            this.remove(this.cacheBox.firstChild)
        }
    };
    d.prototype.addMap = function(ah) {
        this.map.addOverlay(ah)
    };
    d.prototype.remove = function(ah) {
        ah.domElement.parentNode.removeChild(ah.domElement)
    };
    d.prototype.clear = function() {
        this.cacheBox.innerHTML = ""
    };
    function q(ah, ai) {
        ah = isNaN(ah) ? 0: parseFloat(ah);
        ai = isNaN(ai) ? 0: parseFloat(ai);
        this[0] = this["x"] = ah;
        this[1] = this["y"] = ai
    }
    q.inherits(o, "Pixel");
    function af() {}
    k.extend(af, {
        EARTHRADIUS: 6370996.81,
        MCBAND: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        LLBAND: [75, 60, 45, 30, 15, 0],
        MC2LL: [[1.410526172116255e - 8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2], [ - 7.435856389565537e - 9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [ - 3.030883460898826e - 8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37], [ - 1.981981304930552e - 8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06], [3.09191371068437e - 9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4], [2.890871144776878e - 9, 0.000008983055095805407, -3.068298e - 8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]],
        LL2MC: [[ - 0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5], [0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5], [0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5], [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [ - 0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [ - 0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]],
        getDistanceByMC: function(am, ak) {
            if (!am || !ak) {
                return 0
            }
            var ai,
            al,
            ah,
            aj;
            am = this.convertMC2LL(am);
            if (!am) {
                return 0
            }
            ai = this.toRadians(am[0]);
            al = this.toRadians(am[1]);
            ak = this.convertMC2LL(ak);
            if (!ak) {
                return 0
            }
            ah = this.toRadians(ak[0]);
            aj = this.toRadians(ak[1]);
            return this.getDistance(ai, ah, al, aj)
        },
        getDistanceByLL: function(am, ak) {
            if (!am || !ak) {
                return 0
            }
            var ai,
            ah,
            al,
            aj;
            ai = this.toRadians(am[0]);
            al = this.toRadians(am[1]);
            ah = this.toRadians(ak[0]);
            aj = this.toRadians(ak[1]);
            return this.getDistance(ai, ah, al, aj)
        },
        convertMC2LL: function(ah) {
            var ai,
            ak;
            ai = new y(Math.abs(ah[0]), Math.abs(ah[1]));
            for (var aj = 0; aj < this.MCBAND.length; aj++) {
                if (ai[1] > this.MCBAND[aj]) {
                    ak = this.MC2LL[aj];
                    break
                }
            }
            return this.convertor(ah, ak)
        },
        convertLL2MC: function(ah) {
            var ai,
            ak;
            ai = new y(Math.abs(ah[0]), Math.abs(ah[1]));
            for (var aj = 0; aj < this.LLBAND.length; aj++) {
                if (ai[1] > this.LLBAND[aj]) {
                    ak = this.LL2MC[aj];
                    break
                }
            }
            return convertor(ah, ak)
        },
        convertor: function(ai, aj) {
            if (!ai || !aj) {
                return
            }
            var ak = new y();
            ak[0] = aj[0] + aj[1] * Math.abs(ai[0]);
            var ah = Math.abs(ai[1]) / aj[9];
            ak[1] = aj[2] + aj[3] * ah + aj[4] * ah * ah + aj[5] * ah * ah * ah + aj[6] * ah * ah * ah * ah + aj[7] * ah * ah * ah * ah * ah + aj[8] * ah * ah * ah * ah * ah * ah;
            ak[0] *= (ai[0] < 0 ? -1: 1);
            ak[1] *= (ai[1] < 0 ? -1: 1);
            return ak
        },
        getDistance: function(ai, ah, ak, aj) {
            return this.EARTHRADIUS * Math.acos((Math.sin(ak) * Math.sin(aj) + Math.cos(ak) * Math.cos(aj) * Math.cos(ah - ai)))
        },
        toRadians: function(ah) {
            return Math.PI * ah / 180
        },
        toDegrees: function(ah) {
            return (180 * ah) / Math.PI
        }
    });
    function c(ak, al, ai, ah) {
        k.BaseClass.call(this);
        this.mgr = ak;
        this.name = ak.getTileName(ah);
        this.info = ah;
        var aj = document.createElement("img");
        if (ak.map.config.enableMapArea && ah[2] == 4) {
            aj.useMap = "#Map" + ah[0] + "_" + ah[1]
        }
        Q(aj, [ak.tileSize, ak.tileSize]);
        M(aj);
        R(aj).position = "absolute";
        aj.galleryImg = false;
        ab(aj, ai);
        this.img = aj;
        this._bind();
        aj.src = al
    }
    c.inherits(o, "Tile");
    k.extend(c.prototype, {
        _bind: function() {
            var ai = this;
            k.on(ai.img, "load", aj);
            k.on(ai.img, "error", ah);
            function aj(aq) {
                k.un(ai.img, "load", aj);
                k.un(ai.img, "error", ah);
                if (!ai.mgr) {
                    return
                }
                var al = ai.mgr;
                var ak = al.bufferTiles;
                ak[ai.name] = ai;
                ak.push(ai.name);
                var an = ak.length - al.bufferNumber;
                for (var ao = 0; an > 0 && ao < ak.length; ao++) {
                    var ap = ak[ao];
                    if (!al.mapTiles[ap]) {
                        if (ak[ap]) {
                            ak[ap].mgr = null;
                            var am = ak[ap].img;
                            if (am.parentNode) {
                                am.parentNode.removeChild(am)
                            }
                            delete ak[ap]
                        }
                        ak.splice(ao, 1);
                        ao--;
                        an--
                    }
                }
                ai.loaded = true;
                al.imgNumber++;
                if (!B(ai.img)) {
                    al.tilesDiv.appendChild(ai.img)
                }
            }
            function ah(al) {
                k.un(ai.img, "load", aj);
                k.un(ai.img, "error", ah);
                if (!ai.mgr) {
                    return
                }
                var ak = ai.mgr;
                ai.error = true;
                ak.imgErrorNumber++;
                if (ak.errorUrl) {
                    ai.img.src = ak.errorUrl
                }
                if (!B(ai.img)) {
                    ak.tilesDiv.appendChild(ai.img)
                }
            }
        }
    });
    function L(ah) {
        this.cacheDiv = null;
        this.map = ah;
        this.bufferNumber = 500;
        this.mapTiles = [];
        this.bufferTiles = [];
        this.imgNumber = 0;
        this.imgErrorNumber = 0;
        this.slideMaxZoom = 4;
        this.config = H[ah.mapType];
        this.errorUrl = this.config.errorUrl;
        this.tileSize = this.config.tileSize;
        this.baseUnits = this.config.baseUnits;
        this.minZoomLevel = this.config.zoomLevelMin;
        this.maxZoomLevel = this.config.zoomLevelMax;
        this.tileURLs = this.config.tileUrls;
        this.temp = {}
    }
    w.register(function(ai) {
        var ah = ai.tileMgr = new L(ai);
        ai.addEventListener("ondragstart", 
        function(aj) {
            ah.dragStart(aj)
        });
        ai.addEventListener("ondragend", 
        function(aj) {
            ah.dragEnd(aj)
        });
        ai.addEventListener("onclick", 
        function(aj) {
            ah.click(aj)
        });
        ai.addEventListener("onmousewheel", 
        function(aj) {
            ah.mouseWheel(aj)
        });
        ai.addEventListener("ondblclick", 
        function(aj) {
            ah.dblClick(aj)
        });
        ai.addEventListener("onload", 
        function(aj) {
            ah.loadTiles()
        });
        ai.addEventListener("onzoomstart", 
        function(aj) {
            ah._zoom()
        });
        ai.addEventListener("onmoving", 
        function(aj) {
            ah.mend(aj)
        });
        ai.addEventListener("onmapcontainerresize", 
        function(aj) {
            ah.resizeMap(aj)
        })
    });
    k.extend(L.prototype, {
        mend: function(ah) {
            this.moveGridTiles(true)
        },
        _zoom: function(ai) {
            var ah = this;
            if ((ah.map.currentOperation & g.mousewheel) != 0 || (ah.map.currentOperation & g.dblclick) != 0) {
                return
            }
            setTimeout(function() {
                ah.moveGridTiles(true);
                ah.map.dispatchEvent(new ad("onzoomend"))
            },
            10)
        },
        resizeMap: function(ak) {
            this.loaded = false;
            var aj = this.map;
            var ah;
            if (!this.loaded) {
                this.initialize();
                ah = true
            }
            if (k.Browser.ie) {
                try {
                    document.execCommand("BackgroundImageCache", false, true)
                } catch(ai) {}
            }
            this.moveGridTiles(true)
        },
        zoom: function(ao, av, au) {
            av = av || 0;
            au = au || 0;
            var ai = this.map;
            var ak = ao ? new q(ao.offsetX, ao.offsetY) : new q(ai.width / 2, ai.height / 2);
            var ar = this;
            if (this._mst) {
                window.clearTimeout(this._mst);
                this._mst = null
            }
            this._mst = window.setTimeout(function() {
                ar.moveGridTiles(true)
            },
            500);
            if (ai.overlayDiv) {
                ai.overlayDiv.style.display = "none"
            }
            if (ai.markerDiv) {
                ai.markerDiv.style.display = "none"
            }
            if (!this.zoomsDiv) {
                this.zoomsDiv = this.tilesDiv.cloneNode(true);
                ai.platform.insertBefore(this.zoomsDiv, ai.platform.firstChild)
            }
            var ah = {
                x: ak.x - parseInt(this.tilesDiv.style.left) - ai.offsetX,
                y: ak.y - parseInt(this.tilesDiv.style.top) - ai.offsetY
            };
            var al = [];
            var aq = ai.zoomLevel - ai.lastLevel;
            var ap = Math.pow(2, aq);
            var an = this.zoomsDiv.childNodes.length;
            for (var am = an - 1; am > -1; am--) {
                var aj = {};
                var at = this.zoomsDiv.childNodes[am].style;
                aj.top = parseInt(at.top) || 0;
                aj.left = parseInt(at.left) || 0;
                aj.width = parseInt(at.width);
                aj.height = parseInt(at.height);
                aj.dw = aj.width * ap - aj.width;
                aj.dh = aj.height * ap - aj.height;
                aj.dx = (aj.left - ah.x) * ap - (aj.left - ah.x);
                aj.dy = (aj.top - ah.y) * ap - (aj.top - ah.y);
                al[am] = aj
            }
            this.zoomsDiv._ol = parseInt(this.zoomsDiv.style.left);
            this.zoomsDiv._ot = parseInt(this.zoomsDiv.style.top);
            if (this._zTimeLine != null) {
                return
            }
            this._zTimeLine = new k.TimeLine({
                interval: 60,
                duration: ai.config.zoomerDuration,
                render: function(ay) {
                    ay = Math.pow(ay, 3);
                    for (var ax = al.length - 1; ax > -1; ax--) {
                        var az = al[ax];
                        if (ar.zoomsDiv && ar.zoomsDiv.childNodes[ax]) {
                            var aw = ar.zoomsDiv.childNodes[ax].style;
                            aw.top = Math.round(az.top + az.dy * ay) + "px";
                            aw.left = Math.round(az.left + az.dx * ay) + "px";
                            aw.width = Math.ceil(az.width + az.dw * ay) + "px";
                            aw.height = Math.ceil(az.height + az.dh * ay) + "px";
                            if (av || au) {
                                ar.zoomsDiv.style.left = ar.zoomsDiv._ol - (av * ay) + "px";
                                ar.zoomsDiv.style.top = ar.zoomsDiv._ot - (au * ay) + "px"
                            }
                            if (ay == 1) {
                                ar.zoomsDiv.style.display = "none";
                                ar.tilesDiv.style.display = "block";
                                ar.moveGridTiles(true);
                                if (ar.zoomsDiv) {
                                    ai.platform.removeChild(ar.zoomsDiv);
                                    ar.zoomsDiv = null
                                }
                                if (ai.overlayDiv) {
                                    ai.overlayDiv.style.display = "block"
                                }
                                if (ai.markerDiv) {
                                    ai.markerDiv.style.display = "block"
                                }
                                ar._zTimeLine = null;
                                break
                            }
                        }
                    }
                },
                finish: function() {
                    ar._zTimeLine = null;
                    if (ar.zoomsDiv) {
                        ai.platform.removeChild(ar.zoomsDiv);
                        ar.zoomsDiv = null
                    }
                    ar.tilesDiv.style.display = "block";
                    ai.dispatchEvent(new ad("onzoomend"))
                }
            });
            this.tilesDiv.style.display = "none"
        },
        showTile: function(am, al, ap, aq) {
            this.centerPos = al;
            var aj = this.getTileName(am);
            var ak = (am[0] * this.tileSize) + Math.round(al[0]);
            var ai = ( - 1 - am[1]) * this.tileSize + Math.round(al[1]);
            var an = [ak, ai];
            var ao = this.mapTiles[aj];
            if (ao) {
                if (ap) {
                    ab(ao.img, an)
                }
                return
            }
            ao = this.bufferTiles[aj];
            if (ao) {
                this.tilesDiv.insertBefore(ao.img, this.tilesDiv.lastChild);
                this.mapTiles[aj] = ao;
                ab(ao.img, an);
                this.imgNumber++;
                return
            } else {
                var ah = this.getTilesUrl(am[0], am[1], am[2], null, aq);
                ao = new c(this, ah, an, am);
                this.mapTiles[aj] = ao
            }
        },
        getTileName: function(ah) {
            return "TILE_" + ah[0] + "_" + ah[1] + "_" + ah[2]
        },
        hideTile: function(aj) {
            var ai = false;
            var ah = aj.img;
            if (B(ah)) {
                if (aj.loaded) {
                    this.imgNumber--;
                    ai = true
                }
                ah.parentNode.removeChild(ah)
            }
            if (aj.error) {
                this.imgErrorNumber--
            }
            delete this.mapTiles[aj.name];
            if (!ai) {
                if (ah.parentNode) {
                    ah.parentNode.removeChild(ah)
                }
                ah = null;
                aj.mgr = null;
                aj = null
            }
        },
        getTilesUrl: function(at, al, aj, ao, ar) {
            var am = 200;
            var ak = 200;
            var aq = Math.floor(at / am);
            var ap = Math.floor(al / ak);
            var an = this.tileURLs;
            if (ao != null) {
                if (H[ao]) {
                    an = H[ao].tileUrl
                } else {
                    an = ao
                }
            }
            var ai = "";
            ai = an[Math.abs(at + al) % an.length];
            var ah = ai + aj + "/" + aq + "/" + ap + "/" + at + "_" + al + ".png";
            ah = ah.replace(/-(\d+)/gi, "M$1");
            return ah
        },
        initialize: function() {
            var ak = Math.ceil(this.map.width / this.tileSize);
            var aj = Math.ceil(this.map.height / this.tileSize);
            ak += 1;
            aj += 1;
            var ai = [ak, aj];
            var ah = [];
            for (var ak = 0; ak < ai[0]; ak++) {
                for (var aj = 0; aj < ai[1]; aj++) {
                    ah.push([ak, aj])
                }
            }
            ah.sort(this.getSorter([Math.floor(ai[0] / 2), Math.floor(ai[1] / 2)]));
            this.tileOrder = ah;
            this.mapGrid = ai;
            this.loaded = true
        },
        getSorter: function(ah) {
            return function(ai, aj) {
                return (Math.abs(ai[0] - ah[0]) + Math.abs(ai[1] - ah[1])) - (Math.abs(aj[0] - ah[0]) + Math.abs(aj[1] - ah[1]))
            }
        },
        loadTiles: function() {
            var aj = this.map;
            var ah;
            if (!this.loaded) {
                this.initialize();
                ah = true
            }
            if (k.Browser.ie) {
                try {
                    document.execCommand("BackgroundImageCache", false, true)
                } catch(ai) {}
            }
            if (!this.tilesDiv) {
                aj.temp.tilesDiv = this.tilesDiv = O(aj.platform, '<span style="position:absolute;"></span>')
            }
            this.tilesDiv.style.display = "";
            this.tilesDiv.style.left = Math.ceil( - aj.offsetX + aj.width / 2) + "px";
            this.tilesDiv.style.top = Math.ceil( - aj.offsetY + aj.height / 2) + "px";
            this.moveGridTiles(true)
        },
        getCell: function(al, ak) {
            var ah = this.baseUnits * Math.pow(2, (this.maxZoomLevel - ak));
            var aj = parseInt(al[0] / ah);
            var ai = parseInt(al[1] / ah);
            return [aj, ai, ah * (aj + 0.5), ah * (ai + 0.5)]
        },
        moveGridTiles: function(aw) {
            var aB = this.map;
            var at = aB.zoomLevel;
            var ax = aB.centerPoint;
            this.mapCenterPoint = ax;
            var ap = aB.getZoomUnits(aB.zoomLevel);
            var au = this.mapGrid;
            var ar = this.baseUnits * Math.pow(2, (this.maxZoomLevel - at));
            var aq = parseInt(ax[0] / ar);
            if (ax[0] < 0) {
                aq -= 1
            }
            var al = parseInt(ax[1] / ar);
            if (ax[1] < 0) {
                al -= 1
            }
            var ai = [aq, al, ar * (aq + 0.5), ar * (al + 0.5)];
            var ak = (au[0] % 2 == 0) ? ((ai[2] > ax[0]) ? au[0] / 2: au[0] / 2 - 1) : (au[0] - 1) / 2;
            var aD = (au[1] % 2 == 0) ? ((ai[3] > ax[1]) ? au[1] / 2 - 1: au[1] / 2) : (au[1] - 1) / 2;
            var an = [ak, aD];
            if (aw) {
                this.areaCenter = new y(Math.round(ax[0]), Math.round(ax[1]))
            }
            var ah = this.mapTiles;
            var ao = -Math.round(this.areaCenter[0] / ap);
            var am = Math.round(this.areaCenter[1] / ap);
            var az = [ao, am];
            var aj = this.tileOrder;
            var av = aj.length;
            for (var aA in ah) {
                var aC = ah[aA];
                if (!aC.info) {
                    continue
                }
                if (aC.info[2] == aB.zoomLevel && !(aC.info[0] - ai[0] >= -an[0] && aC.info[0] - ai[0] < au[0] - an[0] && aC.info[1] - ai[1] < an[1] - au[1] && aC.info[1] - ai[1] >= an[1])) {
                    this.hideTile(aC)
                } else {
                    if (aC.info[2] != aB.zoomLevel) {
                        this.hideTile(aC)
                    } else {
                        if (aC.info[2] == aB.lastLevel) {
                            this.showTile(aC.info, [az[0] * Math.pow(2, aB.zoomLevel - aB.lastLevel), az[1] * Math.pow(2, aB.zoomLevel - aB.lastLevel)], aw)
                        }
                    }
                }
            }
            this.tilesDiv.style.left = Math.ceil( - aB.offsetX + aB.width / 2) + "px";
            this.tilesDiv.style.top = Math.ceil( - aB.offsetY + aB.height / 2) + "px";
            for (var ay = 0; ay < av; ay++) {
                this.showTile([ai[0] - an[0] + aj[ay][0], ai[1] + an[1] - aj[ay][1], aB.zoomLevel], az, aw, ay)
            }
            this.centerBox = ai;
            this.centerNum = an;
            return
        },
        dragStart: function(ah) {
            this.temp.pps = {
                x: this.map.offsetX,
                y: this.map.offsetY
            }
        },
        dragEnd: function(ah) {
            this.temp.ppe = {
                x: this.map.offsetX,
                y: this.map.offsetY
            }
        },
        click: function(ai) {
            if (!this.map.config.enableClickPan) {
                return
            }
            var ah = this.temp;
            if (this.map.currentOperation == 0 && !ah.ppe && !ah.pps || (ah.ppe && ah.pps && (ah.ppe.x - ah.pps.x == 0 && ah.ppe.y - ah.pps.y == 0))) {
                this.map.panBy(this.map.width / 2 - ai.offsetX, this.map.height / 2 - ai.offsetY)
            }
            ah.pps = null;
            ah.ppe = null
        },
        mouseWheel: function(al) {
            if (!this.map.config.enableWheelZoom) {
                return
            }
            var ak = this.map;
            ak.dispatchEvent(new ad("onzoomstart"));
            var am = H[ak.mapType];
            ak.zoomLevel = ak.zoomLevel + (al.trend == true ? 1: -1);
            if (ak.zoomLevel > am.zoomLevelMax) {
                ak.zoomLevel = am.zoomLevelMax;
                return
            }
            if (ak.zoomLevel < am.zoomLevelMin) {
                ak.zoomLevel = am.zoomLevelMin;
                return
            }
            if (al) {
                var ah = new q(al.offsetX, al.offsetY);
                var ai = ak.pixelToPoint(ah, ak.lastLevel);
                var aj = ak.getZoomUnits(ak.zoomLevel);
                ak.centerPoint = new y(ai.lng + aj * (ak.width / 2 - ah.x), ai.lat - aj * (ak.height / 2 - ah.y));
                ak.lastPoint = ak.centerPoint;
                this.zoom(al)
            } else {
                var ak = this;
                setTimeout(function() {
                    ak.moveGridTiles(true)
                },
                10)
            }
        },
        dblClick: function(ak) {
            if (!this.map.config.enableDblclickZoom) {
                return
            }
            var al = this.map;
            var ao = new q(ak.offsetX, ak.offsetY);
            var ai = al.pixelToPoint(ao);
            var am = H[al.mapType].zoomLevelMax;
            if (al.zoomLevel < am) {
                al.dispatchEvent(new ad("onzoomstart"));
                al.lastLevel = al.zoomLevel;
                al.zoomLevel++;
                var aj = al.getZoomUnits(al.zoomLevel);
                al.centerPoint = new y(ai.lng, ai.lat);
                var ah = (al.getZoomUnits(al.zoomLevel - 1)) / aj * 0.5;
                var ap = ao.x - Math.round(al.width / 2) * ah;
                var an = ao.y - Math.round(al.height / 2) * ah;
                this.zoom(ak, ap, an)
            } else {
                al.panTo(ai)
            }
        }
    });
    function a() {
        o.call(this);
        this._map = null;
        this._toolbarContainer;
        this._container;
        this._opts = {
            tips: "",
            cursor: "default",
            isCheckButton: true,
            visible: true
        };
        this._type = "toolbarItem"
    }
    a.inherits(o, "ToolbarItem");
    k.extend(a.prototype, {
        initialize: function(ai, ah) {
            if (this._container && ah.getDom()) {
                ah.getDom().appendChild(this._container);
                return false
            }
            this._map = ai;
            this._toolbarContainer = ah;
            return true
        },
        _render: function() {
            this._container = O(this._toolbarContainer.getDom(), "<div></div>");
            k.ac(this._container, "BMap_titem");
            this._container.title = this._opts.tips;
            if (!this._opts.visible) {
                this._container.style.display = "none"
            }
            return this._container
        },
        _bind: function() {
            var ah = this;
            k.on(ah._container, "mouseover", 
            function(ai) {
                ah._onItemMouseOver(ai)
            });
            k.on(ah._container, "mouseout", 
            function(ai) {
                ah._onItemMouseOut(ai)
            });
            k.on(ah._container, "mousedown", 
            function(ai) {
                ah._onItemMouseDown(ai)
            });
            k.on(ah._container, "mouseup", 
            function(ai) {
                ah._onItemMouseUp(ai, ah)
            });
            k.on(ah._container, "click", 
            function(ai) {
                ah._onItemClick(ai)
            })
        },
        remove: function() {
            if (this._toolbarContainer.getDom()) {
                this._toolbarContainer.getDom().removeChild(this._container)
            }
        },
        getTips: function() {
            return this._opts.tips
        },
        setTips: function(ah) {
            this._opts.tips = this._checkStr(ah + "");
            if (this._container) {
                this._container.setAttribute("title", ah)
            }
        },
        getDom: function() {
            return this._container
        },
        btnClick: function() {
            if (!this._map) {
                return
            }
            this._onItemClickFunc()
        },
        show: function() {
            this._opts.visible = true;
            if (this._container) {
                this._container.style.display = "block"
            }
        },
        hide: function() {
            this._opts.visible = false;
            if (this._container) {
                this._container.style.display = "none"
            }
        },
        isVisible: function() {
            return this._opts.visible
        },
        _onItemMouseOver: function(ah) {
            k.ac(this._container, "BMap_msover")
        },
        _onItemMouseOut: function(ah) {
            k.rc(this._container, "BMap_msover")
        },
        _onItemMouseDown: function(ah) {
            k.ac(this._container, "BMap_msdown");
            ae(ah)
        },
        _onItemMouseUp: function(ai, ah) {
            k.rc(this._container, "BMap_msdown");
            if (ah._map.currentOperation & g.drag == 0) {
                ae(ai)
            }
        },
        _onItemClick: function(ah) {
            if (this._opts.isCheckButton == true) {
                this._toolbarContainer.unCheckOthers(this)
            }
            this._onItemClickFunc();
            ae(ah)
        },
        _onItemClickFunc: function() {
            this._checked = !this._checked;
            if (this._checked == true) {
                this._map.currentOperation |= g.toolbarOperation
            } else {
                this._map.currentOperation &= ~g.toolbarOperation
            }
            if (this._checked) {
                k.ac(this._container, "BMap_itemChecked");
                if (this._opts.followText) {
                    var ah = this.followTitle = new K(this._opts.followText, {
                        offset: [10, -10]
                    });
                    this._map.addOverlay(ah);
                    ah.hide()
                }
            } else {
                k.rc(this._container, "BMap_itemChecked");
                this.followTitle && this.followTitle.remove()
            }
        },
        setCursor: function(ah) {
            if ((ah.search(/\//) >= 0 || ah.search(/\./) >= 0) && ah.indexOf("url(") == -1) {
                this._opts.cursor = "url(" + ah + "), default"
            } else {
                this._opts.cursor = ah
            }
        },
        getCursor: function() {
            return this._opts.cursor
        },
        _checkStr: function(ai) {
            var ah = ai.replace("<", "&lt;");
            ah = ah.replace(">", "&gt;");
            return ah
        }
    });
    function r(ah) {
        a.call(this);
        this._opts = k.extend(k.extend(this._opts, {
            autoClear: false,
            tips: "测距",
            followText: "单击确定起点",
            unit: "metric",
            showResult: true,
            lineColor: "blue",
            lineStroke: 2,
            opacity: 1,
            lineStyle: "solid",
            cursor: "styles/bmap/ruler.cur",
            styleCodes: {
                lnCode: 0,
                spCode: 0,
                slCode: 0,
                tlCode: 0
            }
        }), ah);
        if (this._opts.showResult == false) {
            if (ah && !ah.followText) {
                this._opts.followText = "单击确定起点，双击结束绘制"
            }
            if (!ah.tips) {
                this._opts.tips = "绘制折线"
            }
        }
        if (this._opts.lineStroke <= 0) {
            lineStroke = 2
        }
        if (this._opts.opacity > 1) {
            this._opts.opacity = 1
        } else {
            if (this._opts.opacity < 0) {
                this._opts.opacity = 0
            }
        }
        if (this._opts.lineStyle != "solid" && this._opts.lineStyle != "dashed") {
            this._opts.lineStyle = "solid"
        }
        this._checked = false;
        this._drawing = null;
        this.followTitle = null;
        this._totalDis = {};
        this._points = [];
        this._paths = [];
        this._dots = [];
        this._segDistance = [];
        this._overlays = [];
        this._units = {
            metric: {
                name: "metric",
                conv: 1,
                incon: 1000,
                u1: "米",
                u2: "公里"
            },
            us: {
                name: "us",
                conv: 3.2808,
                incon: 5279.856,
                u1: "英尺",
                u2: "英里"
            }
        };
        if (!this._units[this._opts.unit]) {
            this._opts.unit = "metric"
        }
        this._dLineColor = "#ff6319";
        this._dLineStroke = 3;
        this._dOpacity = 0.8;
        this._dLineStyle = "solid";
        this._dCursor = "styles/bmap/ruler.cur";
        this._followTextS = "单击确定起点";
        this._followTextM = "单击确定地点，双击结束";
        this._movingTimerId = null
    }
    r.inherits(a, "PolylineTItem");
    k.extend(r.prototype, {
        initialize: function(aj, ah) {
            if (a.prototype.initialize.call(this, aj, ah) == false) {
                return
            }
            this._render();
            this._bind();
            var ai = this;
            aj.addEventListener("moving", 
            function() {
                ai._hideCurrent()
            })
        },
        _bind: function() {
            a.prototype._bind.call(this);
            var ah = this;
            this.setCursor(this._opts.cursor);
            k.on(this._map.container, "mousemove", 
            function(ak) {
                if (!ah._checked) {
                    return
                }
                ak = window.event || ak;
                var ai = ak.target || ak.srcElement;
                if (ai != j.getDom(ah._map)) {
                    ah.followTitle.hide();
                    return
                }
                if (!ah._mapMoving) {
                    ah.followTitle.show()
                }
                var aj = j.getDrawPoint(ak, true);
                ah.followTitle.setPoint(aj)
            });
            k.on(j.getDom(ah._map), "mousedown", 
            function(ai) {
                if (ah._map.config.enableKeyboard == true) {
                    ah._map.temp.canKeyboard = true;
                    ae(ai)
                }
            })
        },
        _onItemClickFunc: function() {
            a.prototype._onItemClickFunc.call(this);
            this._formatTitle();
            if (this._mapMoving) {
                delete this._mapMoving
            }
            var ao = this;
            var ai = function(aw) {
                if (ao._map.currentOperation & g.toolbarOperation == 0 || !ao._checked) {
                    return
                }
                aw = window.event || aw;
                var at = j.getDrawPoint(aw, true);
                if (!ao._isPointValid(at)) {
                    return
                }
                ao._bind.initX = aw.pageX || aw.clientX || 0;
                ao._bind.initY = aw.pageY || aw.clientY || 0;
                if (ao._points.length > 0) {
                    var az = map.pointToPixel(ao._points[ao._points.length - 1]);
                    var ar = map.pointToPixel(at);
                    var av = Math.sqrt(Math.pow(az.x - ar.x, 2) + Math.pow(az.y - ar.y, 2));
                    if (av < 5) {
                        return
                    }
                }
                ao._bind.x = aw.layerX || aw.offsetX || 0;
                ao._bind.y = aw.layerY || aw.offsetY || 0;
                ao._points.push(at);
                if (ao._opts.showResult) {
                    ao._addSecPoint(at)
                }
                if (ao._opts.showResult && ao._paths.length == 0) {
                    ao._formatTitle(1, ao._followTextM, ao.getTotalDistance())
                }
                if (ao._opts.showResult && ao._paths.length > 0) {
                    ao._paths[ao._paths.length - 1].setOpacity(ao._dOpacity);
                    ao._paths[ao._paths.length - 1].show()
                }
                var aC = new x([at, at]);
                ao._map.addOverlay(aC);
                aC._stCode = ao._opts.styleCodes.lnCode;
                ao._paths.push(aC);
                ao._overlays.push(aC);
                if (ao._opts.showResult) {
                    aC.setLineStroke(ao._dLineStroke);
                    aC.setLineColor(ao._dLineColor);
                    aC.setOpacity(ao._dOpacity / 2);
                    aC.setLineStyle(ao._dLineStyle)
                } else {
                    aC.setLineStroke(ao._opts.lineStroke);
                    aC.setLineColor(ao._opts.lineColor);
                    aC.setOpacity(ao._opts.opacity);
                    aC.setLineStyle(ao._opts.lineStyle)
                }
                if (ao._mapMoving) {
                    aC.hide()
                }
                if (ao._opts.showResult) {
                    var ax = "";
                    if (ao._points.length > 1) {
                        var au = ao._paths[ao._points.length - 2];
                        au.setPath(at, 1);
                        var aA = ao._setSegDistance(ao._points[ao._points.length - 2], ao._points[ao._points.length - 1]);
                        var ay = ao.getTotalDistance();
                        ax = ao._formatDisStr(ay)
                    } else {
                        ax = "起点"
                    }
                    var aB = new K(ax, {
                        color: "#333",
                        borderColor: "#ff0103",
                        offset: [10, -5]
                    });
                    aB._stCode = ao._opts.styleCodes.slCode;
                    ao._map.addOverlay(aB);
                    ao._formatSegLabel(aB, ax);
                    ao._overlays.push(aB);
                    at.disLabel = aB;
                    aB.setPoint(at)
                }
            };
            var ap = function(aw) {
                if (!ao._checked) {
                    return
                }
                if (ao._paths.length > 0) {
                    aw = window.event || aw;
                    var at = aw.pageX || aw.clientX || 0;
                    var ar = aw.pageY || aw.clientY || 0;
                    if (typeof ao._bind.initX == "undefined") {
                        ao._bind.x = aw.layerX || aw.offsetX || 0;
                        ao._bind.y = aw.layerY || aw.offsetY || 0;
                        ao._bind.initX = at;
                        ao._bind.initY = ar
                    }
                    var ay = ao._bind.x + at - ao._bind.initX;
                    var ax = ao._bind.y + ar - ao._bind.initY;
                    var aB = ao._paths[ao._paths.length - 1];
                    var au = ao._map.pixelToPoint(new q(ay, ax));
                    aB.setPath(au, 1);
                    if (!ao._mapMoving) {
                        aB.show()
                    }
                    var aC = 0;
                    var aA = 0;
                    if (ay < 6) {
                        aC = 80
                    } else {
                        if (ay > ao._map.width - 5) {
                            aC = -80
                        }
                    }
                    if (ax < 6) {
                        aA = 80
                    } else {
                        if (ax > ao._map.height - 5) {
                            aA = -80
                        }
                    }
                    if (aC != 0 || aA != 0) {
                        if (!ap._movingTimerId) {
                            ao._mapMoving = true;
                            ap._movingTimerId = setInterval(function() {
                                ao._map.panBy(aC, aA, 30)
                            },
                            60);
                            ao._movingTimerId = ap._movingTimerId;
                            aB.hide();
                            ao.followTitle.hide()
                        }
                    } else {
                        if (ap._movingTimerId) {
                            setTimeout(function() {
                                var aE = ao._paths[ao._paths.length - 1];
                                var aD = ao._map.pixelToPoint(new q(ay, ax));
                                if (!aE) {
                                    return
                                }
                                aE.setPath(aD, 1);
                                aE.show();
                                ao.followTitle.setPoint(aD);
                                ao.followTitle.show();
                                delete ao._mapMoving
                            },
                            400);
                            clearInterval(ap._movingTimerId);
                            delete ap._movingTimerId;
                            ao._movingTimerId = null
                        }
                    }
                    if (ao._opts.showResult) {
                        var av = ao.getTotalDistance();
                        dis = af.getDistanceByMC(ao._points[ao._points.length - 1], au);
                        ao._updateInstDis(ao.followTitle.getDom(), av + dis)
                    }
                } else {
                    aw = window.event || aw;
                    var az = aw.target || aw.srcElement;
                    ao.followTitle.show();
                    if (az != j.getDom()) {
                        ao.followTitle.hide()
                    }
                }
            };
            var am = function(ax) {
                if (!ao._checked) {
                    return
                }
                k.un(j.getDom(ao._map), "click", ai);
                k.un(document, "mousemove", ap);
                k.un(j.getDom(ao._map), "dblclick", am);
                if (ao._opts.showResult && ao._points.length > 0) {
                    var aw = ao._points[ao._points.length - 1];
                    aw.disLabel.remove();
                    delete aw.disLabel
                }
                if (ao._paths.length > 0) {
                    var av = ao._paths[ao._paths.length - 1];
                    var au = ao._map.pointToPixel(ao._points[ao._points.length - 1]);
                    var at = ao._map.pointToPixel(ao._points[ao._points.length - 2]);
                    if (au && at) {
                        var ar = Math.round(Math.sqrt((au.x - at.x) * (au.x - at.x) + (au.y - at.y) * (au.y - at.y)));
                        if (ar < 5) {
                            av.remove();
                            ao._paths.length = ao._paths.length - 1
                        }
                        if (ao._opts.showResult && ao._paths.length > 0) {
                            ao._processLastOp()
                        }
                    }
                } else {
                    if (ao._opts.showResult == true && ao._paths.length < 1) {
                        ao._clearThis()
                    }
                }
                ao.dispatchEvent(new ad("ondrawended"));
                setTimeout(function() {
                    if (ao._checked == true) {
                        ao.btnClick()
                    }
                },
                50)
            };
            var aj = function(ar) {
                ar = window.event || ar;
                if (ar.keyCode == 27) {
                    ao._clearThis();
                    ao.dispatchEvent(new ad("ondrawended"));
                    setTimeout(function() {
                        if (ao._checked == true) {
                            ao.btnClick()
                        }
                    },
                    50)
                }
            };
            var ah = function(ar) {
                ar = window.event || ar;
                if (k.Browser.ie && ar.button != 1 || ar.button == 2) {
                    if (ao._checked == true) {
                        ao.dispatchEvent(new ad("ondrawended"));
                        ao.btnClick()
                    }
                }
            };
            if (this._checked == true) {
                ao._initArrays();
                var an = this._drawing = new X();
                an.map = this._map;
                this._map.addOverlay(an);
                an.createPalette();
                j.show(this._map);
                this.setCursor(this._opts.cursor);
                k.on(j.getDom(this._map), "click", ai);
                k.on(document, "mousemove", ap);
                k.on(j.getDom(this._map), "dblclick", am);
                k.on(document, "keydown", aj);
                k.on(j.getDom(this._map), "mouseup", ah);
                this.bindFunc = [{
                    elem: j.getDom(this._map),
                    type: "click",
                    func: ai
                },
                {
                    elem: j.getDom(this._map),
                    type: "dblclick",
                    func: am
                },
                {
                    elem: document,
                    type: "mousemove",
                    func: ap
                },
                {
                    elem: document,
                    type: "keydown",
                    func: aj
                },
                {
                    elem: j.getDom(this._map),
                    type: "mouseup",
                    func: ah
                }];
                this.dispatchEvent(new ad("ondrawstarted"))
            } else {
                if (ao._points.length < 2) {
                    ao._clearThis()
                } else {
                    ao._paths[ao._paths.length - 1].remove();
                    ao._paths[ao._paths.length - 1] = null;
                    ao._paths.length = ao._paths.length - 1;
                    var aq = ao._points[ao._points.length - 1];
                    if (aq.disLabel) {
                        aq.disLabel.remove()
                    }
                    ao._processLastOp()
                }
                j.hide();
                for (var al = 0, ak = this.bindFunc.length; al < ak; al++) {
                    k.un(this.bindFunc[al].elem, this.bindFunc[al].type, this.bindFunc[al].func)
                }
                if (ao._movingTimerId) {
                    clearInterval(ao._movingTimerId);
                    delete ap._movingTimerId;
                    ao._movingTimerId = null
                }
            }
            this.dispatchEvent(new ad("onclick"))
        },
        _clearThis: function() {
            for (var ai = 0, ah = this._points.length; ai < ah; ai++) {
                if (this._points[ai].disLabel) {
                    this._points[ai].disLabel.remove()
                }
            }
            for (var ai = 0, ah = this._paths.length; ai < ah; ai++) {
                this._paths[ai].remove()
            }
            for (var ai = 0, ah = this._dots.length; ai < ah; ai++) {
                this._dots[ai].remove()
            }
            this._initArrays()
        },
        _initArrays: function() {
            this._points.length = 0;
            this._paths.length = 0;
            this._segDistance.length = 0;
            this._dots.length = 0
        },
        _updatePoi: function(ai, aj) {
            var ah = this._points[this._points.length - 1];
            this._drawing.setPolylinePoint(ai, [ah, aj])
        },
        _setSegDistance: function(ai, ah) {
            if (!ai || !ah) {
                return
            }
            dis = af.getDistanceByMC(ai, ah);
            this._segDistance.push(dis);
            return dis
        },
        getTotalDistance: function() {
            var aj = 0;
            for (var ai = 0, ah = this._segDistance.length; ai < ah; ai++) {
                aj += this._segDistance[ai]
            }
            return aj
        },
        _convertUnit: function(ah, ai) {
            ai = ai || "metric";
            if (this._units[ai]) {
                return ah * this._units[ai].conv
            }
            return ah
        },
        _addSecPoint: function(aj) {
            var ai = new m("styles/bmap/mapctrls.png", {
                width: 11,
                height: 11,
                imgOffset: [ - 26, -313]
            });
            var ah = new E(aj, {
                icon: ai,
                clickable: false,
                baseZIndex: 3500000,
                zIndexFixed: true
            });
            ah._stCode = this._opts.styleCodes.spCode;
            map.addOverlay(ah);
            this._dots.push(ah)
        },
        _formatDisStr: function(ak) {
            var ai = this._opts.unit;
            var aj = this._units[ai].u1;
            var ah = this._convertUnit(ak, ai);
            if (ah > this._units[ai].incon) {
                ah = ah / this._units[ai].incon;
                aj = this._units[ai].u2;
                ah = ah.toFixed(1)
            } else {
                ah = ah.toFixed(0)
            }
            return ah + aj
        },
        setLineColor: function(ah) {
            if (ah && typeof ah == "string") {
                this._opts.lineColor = ah
            }
        },
        setLineStroke: function(ah) {
            if (Math.round(ah) > 0) {
                this._opts.lineStroke = Math.round(ah)
            }
        },
        setOpacity: function(ah) {
            if (ah >= 0 && ah <= 1) {
                this._opts.opacity = ah
            }
        },
        setLineStyle: function(ah) {
            if (ah == "solid" || ah == "dashed") {
                this._opts.lineStyle = ah
            }
        },
        clear: function() {
            for (var ai = 0, ah = this._overlays.length; ai < ah; ai++) {
                if (this._overlays[ai] && this._overlays[ai].remove) {
                    this._overlays[ai].remove()
                }
            }
            this._overlays.length = 0;
            for (var ai = 0, ah = this._dots.length; ai < ah; ai++) {
                if (this._dots[ai] && this._dots[ai].parentNode) {
                    this._dots[ai].parentNode.removeChild(this._dots[ai])
                }
            }
            this._dots.length = 0
        },
        setCursor: function(ah) {
            a.prototype.setCursor.call(this, ah);
            if (this._opts.showResult == true) {
                j.setCursor("url(" + this._dCursor + "), crosshair")
            } else {
                j.setCursor(this._opts.cursor)
            }
        },
        getCursor: function() {
            if (this._opts.showResult == true) {
                return this._dCursor
            }
            var ah = this._opts.cursor.match(/^url\((.+)\)(,.*)?/);
            if (ah != null) {
                return ah[1]
            } else {
                return this._opts.cursor
            }
        },
        showResult: function(ah) {
            this._opts.showResult = !!ah
        },
        _formatSegLabel: function(ah, aj) {
            var ai = ah.getDom();
            ai.style.border = "none";
            ai.style.padding = "0";
            ai.innerHTML = "<span class='BMap_diso'><span class='BMap_disi'>" + aj + "</span></span>"
        },
        _processLastOp: function() {
            var al = this;
            delete al._bind.x;
            delete al._bind.y;
            delete al._bind.initX;
            delete al._bind.initY;
            if (al._paths.length > al._points.length - 1) {
                var aj = al._paths.length - 1;
                al._paths[aj].remove();
                al._paths[aj] = null;
                al._paths.length = aj
            }
            if (!al._opts.showResult) {
                return
            }
            var ah = al._totalDis[al._points[0].getHashCode()] = {};
            ah.points = al._points.slice(0);
            ah.paths = al._paths.slice(0);
            ah.dots = al._dots.slice(0);
            ah.segDis = al._segDistance.slice(0);
            var am = al._map.pointToPixel(ah.points[ah.points.length - 1]);
            var ak = al._map.pointToPixel(ah.points[ah.points.length - 2]);
            var an = [0, 0];
            var ai = [0, 0];
            if (am.y - ak.y >= 0) {
                ai = [ - 5, 11]
            } else {
                ai = [ - 5, -35]
            }
            if (am.x - ak.x >= 0) {
                an = [14, 0]
            } else {
                an = [ - 14, 0]
            }
            var aq = ah.points[ah.points.length - 1];
            aq.disLabel = new K("", {
                color: "#333",
                borderColor: "#ff0103",
                offset: [ - 15, -40]
            });
            aq.disLabel._stCode = al._opts.styleCodes.tlCode;
            al._map.addOverlay(aq.disLabel);
            aq.disLabel.setOffset(ai[0], ai[1]);
            aq.disLabel.setPoint(aq);
            al._formatTitle(2, "", "", aq.disLabel);
            var ap = new m("styles/bmap/mapctrls.gif", {
                height: 12,
                width: 12,
                imgOffset: [0, -14]
            });
            ah.closeBtn = new E(ah.points[ah.points.length - 1], {
                icon: ap,
                offset: an,
                baseZIndex: 3600000
            });
            map.addOverlay(ah.closeBtn);
            ah.closeBtn.getDom().title = "清除本次测距";
            ah.closeBtn.addEventListener("click", 
            function(av) {
                var at = ah.points[0].getHashCode();
                for (var au = 0, ar = ah.points.length; au < ar; au++) {
                    ah.points[au].disLabel.remove();
                    ah.points[au].disLabel = null
                }
                for (var au = 0, ar = ah.paths.length; au < ar; au++) {
                    ah.paths[au].remove();
                    ah.paths[au] = null
                }
                for (var au = 0, ar = ah.dots.length; au < ar; au++) {
                    ah.dots[au].remove();
                    ah.dots[au] = null
                }
                ah.closeBtn.remove();
                ah.closeBtn = null;
                delete al._totalDis[at];
                ae(av)
            });
            var ao = ah.dots[ah.dots.length - 1];
            if (ao && ao._bind != true) {
                ao._bind = true;
                ao.getDom().style.cursor = "pointer";
                ao.addEventListener("click", 
                function(aw) {
                    al.btnClick();
                    al._points = ah.points.slice(0);
                    al._paths = ah.paths.slice(0);
                    al._dots = ah.dots.slice(0);
                    al._segDistance = ah.segDis.slice(0, ah.points.length - 1);
                    var ax = al._points[al._points.length - 1];
                    var av = new x([ax, ax]);
                    av._stCode = al._opts.styleCodes.lnCode;
                    al._map.addOverlay(av);
                    al._paths.push(av);
                    al._overlays.push(av);
                    av.setLineStroke(al._dLineStroke);
                    av.setLineColor(al._dLineColor);
                    av.setOpacity(al._dOpacity / 2);
                    av.setLineStyle(al._dLineStyle);
                    var ay = al._map.pointToPixel(al._points[al._points.length - 1]);
                    al._formatTitle(1, al._followTextM, al.getTotalDistance());
                    ah.closeBtn.remove();
                    ah.points[ah.points.length - 1].disLabel.remove();
                    var at = al.getTotalDistance();
                    var au = al._formatDisStr(at);
                    var ar = new K(au, {
                        color: "#333",
                        borderColor: "#ff0103",
                        offset: [10, -5]
                    });
                    ar._stCode = al._opts.styleCodes.slCode;
                    al._map.addOverlay(ar);
                    al._formatSegLabel(ar, au);
                    al._overlays.push(ar);
                    ah.points[ah.points.length - 1].disLabel = ar;
                    ar.setPoint(ax);
                    ao.removeEventListener("click", arguments.callee);
                    ao._bind = false;
                    ao.getDom().style.cursor = "url(" + al._map.config.defaultCursor + "), move"
                })
            }
            al._initArrays()
        },
        _formatTitle: function(ak, aq, ah, am) {
            var al = am || this.followTitle;
            if (!al) {
                return
            }
            var aj = al.getDom();
            k.ac(aj, "BMap_disLabel");
            var at = aj.style;
            var ar = al.content;
            at.zIndex = "85";
            at.padding = "3px 5px";
            var ao = [];
            if (ak == 1) {
                al.setOffset(0, 25);
                var ap = this._opts.unit;
                var an = this._units[ap].u1;
                var ai = this._convertUnit(ah, ap);
                if (ai > this._units[ap].incon) {
                    ai = ai / this._units[ap].incon;
                    an = this._units[ap].u2;
                    ai = ai.toFixed(1)
                } else {
                    ai = ai.toFixed(0)
                }
                ao.push("<span>总长：<span class='BMap_disBoxDis'>" + ai + "</span>" + an + "</span><br />");
                ao.push("<span style='color:#7a7a7a'>" + aq + "</span>")
            } else {
                if (ak == 2) {
                    var ap = this._opts.unit;
                    var an = this._units[ap].u1;
                    var ai = this._convertUnit(this.getTotalDistance(), ap);
                    if (ai > this._units[ap].incon) {
                        ai = ai / this._units[ap].incon;
                        an = this._units[ap].u2;
                        ai = ai.toFixed(1)
                    } else {
                        ai = ai.toFixed(0)
                    }
                    ao.push("总长：<span class='BMap_disBoxDis'>" + ai + "</span>" + an);
                    al.content = "总长：" + ai + an
                } else {
                    al.setOffset(0, 25);
                    ao.push(ar)
                }
            }
            aj.innerHTML = ao.join("")
        },
        _updateInstDis: function(aj, ah) {
            var ai = this._opts.unit;
            var ak = this._units[ai].u1;
            if (ah > this._units[ai].incon) {
                ah = ah / this._units[ai].incon;
                ak = this._units[ai].u2;
                ah = ah.toFixed(1)
            } else {
                ah = ah.toFixed(0)
            }
            aj.children[0].innerHTML = "总长：<span class='BMap_disBoxDis'>" + ah + "</span>" + ak
        },
        _hideCurrent: function() {
            if (!this._checked) {
                return
            }
            if (this._paths.length > 0) {
                var ah = this._paths[this._paths.length - 1];
                ah.hide()
            }
            this.followTitle.hide()
        },
        _isPointValid: function(ah) {
            if (!ah) {
                return false
            }
            if (ah.lng < H[this._map.mapType].bounds[0] || ah.lng > H[this._map.mapType].bounds[2] || ah.lat < H[this._map.mapType].bounds[1] || ah.lat > H[this._map.mapType].bounds[3]) {
                return false
            }
            return true
        }
    });
    function i() {}
    function S(ai, ah, ak) {
        var aj = document.createElement("div");
        if (ai > 0) {
            R(aj).position = (ai == 2) ? "relative": "absolute"
        }
        if (ah) {
            ab(aj, ah)
        }
        if (ak) {
            b(aj, ak)
        }
        return aj
    }
    function R(ah) {
        return ah.style
    }
    function b(ah, ai) {
        R(ah).zIndex = ai
    }
    function ab(ai, ah) {
        R(ai).left = W(ah[0]);
        R(ai).top = W(ah[1])
    }
    function U(aj, ai) {
        var ah = R(aj);
        ah.opacity = ai;
        ah.MozOpacity = ai;
        ah.KhtmlOpacity = ai;
        ah.filter = "alpha(opacity=" + (ai * 100) + ")";
        ah = null
    }
    function W(aj) {
        if (typeof aj == "number") {
            return aj + "px"
        } else {
            if (typeof aj == "string") {
                var ai = /"\\s","g"/;
                var ak = /"^\\d+(px|%)+$","i"/;
                var ah = aj.replace(ai, "");
                if (ak.exec(ah)) {
                    return ah
                }
                var al = new RegExp("^\\d+$");
                if (al.exec(ah)) {
                    return ah + "px"
                }
                return "0px"
            }
        }
    }
    function M(ah) {
        if (k.Browser.ie > 0) {
            ah.unselectable = "on";
            ah.selectstart = function() {
                return false
            }
        } else {
            R(ah).MozUserSelect = "none"
        }
    }
    function Q(ai, ah) {
        R(ai).width = W(ah[0]);
        R(ai).height = W(ah[1])
    }
    function P(aj) {
        var ai = [aj.offsetWidth, aj.offsetHeight];
        if (aj == document.body && !document.all) {
            ai[1] = aj.clientHeight
        }
        if (!ai[0]) {
            ai[0] = aj.clientWidth
        }
        if (!ai[0]) {
            ai[0] = parseInt(R(aj).width)
        }
        if (!ai[1]) {
            ai[1] = aj.clientHeight
        }
        if (!ai[1]) {
            ai[1] = parseInt(R(aj).height)
        }
        if (!ai[0] || !ai[1]) {
            var ah = aj.parentElement;
            while (ah) {
                if (!ai[0] && ah.offsetWidth) {
                    ai[0] = ah.offsetWidth
                }
                if (!ai[1] && ah.offsetHeight) {
                    ai[1] = ah.offsetHeight
                }
                if (ai[0] && ai[1]) {
                    break
                }
                ah = ah.parentElement
            }
        }
        return ai
    }
    function B(ah) {
        return ah.parentNode && ah.parentNode.nodeType != 11
    }
    function O(ai, ah) {
        ai.insertAdjacentHTML("beforeEnd", ah);
        return ai.lastChild
    }
    function D(ah, ai) {
        if (ah.lng < ai.minX || ah.lng > ai.maxX || ah.lat < ai.minY || ah.lat > ai.maxY) {
            return false
        } else {
            return true
        }
    }
    function ae(ah) {
        var ah = window.event || ah;
        ah.stopPropagation ? ah.stopPropagation() : ah.cancelBubble = true
    }
    function N(ah) {
        var ah = window.event || ah;
        ah.preventDefault ? ah.preventDefault() : ah.returnValue = false;
        return false
    }
    function I(al, aj) {
        al = al || window.event;
        var ah = al.clientX || al.pageX;
        var an = al.clientY || al.pageY;
        var ai = al.target || al.srcElement;
        if (al && aj && ah && an && ai && k.I(ai.hashCode)) {
            var ak = k.I(ai.hashCode).map;
            var am = k.Dom.getOffset(ak.container);
            aj.point = ak.pixelToPoint(new q(ah - am.left, an - am.top));
            return aj
        } else {
            return aj
        }
    }
    function n(aj) {
        if (aj && aj.clientX && aj.clientY && aj.target && k.I(aj.target.hashCode)) {
            var ai = k.I(aj.target.hashCode).map;
            var ak = k.Dom.getOffset(ai.container);
            var ah = aj.clientX || aj.x;
            var al = aj.clientY || aj.y;
            aj.point = ai.pixelToPoint(new q(ah - ak.left, al - ak.top));
            return aj
        } else {
            return aj
        }
    }
    function aa(ah) {
        this._container = null;
        this._map = ah
    }
    w.register(function(ai) {
        if (ai.config && ai.config.isOverviewMap) {
            return
        }
        var ah = new aa(ai);
        ai.container.insertAdjacentHTML("beforeEnd", ah.render());
        ah._container = ai.container.lastChild;
        ai.addEventListener("onmousewheel", 
        function(aj) {
            ah.action(aj, ai)
        })
    });
    aa.prototype.render = function() {
        var ah = ['<div id=zoomer style="position:absolute; z-index:0; top:0px; left:0px;overflow:hidden; visibility: hidden; ">'];
        ah.push('<div class="BMap_zoomer" style="top:0;left:0;"></div>');
        ah.push('<div class="BMap_zoomer" style="top:0;right:0;"></div>');
        ah.push('<div class="BMap_zoomer" style="bottom:0;left:0;"></div>');
        ah.push('<div class="BMap_zoomer" style="bottom:0;right:0;"></div>');
        ah.push("</div>");
        return ah.join("")
    };
    aa.prototype.action = function(aq) {
        if (aa._timeline) {
            return
        }
        var ao = this._container;
        if (!ao) {
            return
        }
        var ai = aq.currentTarget;
        var ay = aq.trend;
        if (aq.oldZoomLevel == ai.zoomLevel || ai.lastLevel == H[ai.mapType].zoomLevelMin && !ay || ai.lastLevel == H[ai.mapType].zoomLevelMax && ay) {
            return
        }
        var ak = ai.config.zoomerSizeMin || 60;
        var ax = ai.config.zoomerSizeMax || 120;
        var ar = ai.width / ai.height;
        var ap = ar >= 1;
        var am = Math.ceil((ay ? ak: ax) / 2);
        var an = Math.max(15, (ap ? am / ar: am * ar));
        ao.style[(ap ? "width": "height")] = am * 2 + "px";
        ao.style[(ap ? "height": "width")] = an * 2 + "px";
        ao.style.visibility = "visible";
        var au = ao.children;
        if (ay) {
            au[0].style.backgroundPosition = "0 0";
            au[1].style.backgroundPosition = "-7px 0";
            au[2].style.backgroundPosition = "0 -7px";
            au[3].style.backgroundPosition = "-7px -7px"
        } else {
            au[0].style.backgroundPosition = "-7px -7px";
            au[1].style.backgroundPosition = "0 -7px";
            au[2].style.backgroundPosition = "-7px 0";
            au[3].style.backgroundPosition = "0 0"
        }
        au = null;
        var aw = aq.offsetX - (ap ? am: an);
        var av = aq.offsetY - (ap ? an: am);
        if (isNaN(aw) || isNaN(av)) {
            return
        }
        ao.style.left = aw + "px";
        ao.style.top = av + "px";
        var aj = Math.ceil((ay ? ax: ak) / 2);
        var al = Math.max(15, (ap ? aj / ar: aj * ar));
        aj = aj - am;
        al = Math.ceil(al - an);
        var at = this;
        var ah = at._container.style;
        if (aa._timeline) {
            aa._timeline.end()
        }
        setTimeout(function() {
            aa._timeline = new k.TimeLine({
                interval: 60,
                duration: at._map.config.zoomerDuration,
                render: function(aA) {
                    aA = Math.pow(aA, 3);
                    var aB = Math.ceil(aj * aA);
                    var az = Math.ceil(al * aA);
                    ah[ap ? "width": "height"] = (am + aB) * 2 + "px";
                    ah[ap ? "height": "width"] = (an + az) * 2 + "px";
                    ah[ap ? "left": "top"] = ((ap ? aw: av) - aB) + "px";
                    ah[ap ? "top": "left"] = ((ap ? av: aw) - az) + "px"
                },
                finish: function() {
                    aa._timeline = false;
                    setTimeout(function() {
                        ao.style.visibility = "hidden"
                    },
                    60)
                }
            })
        },
        30)
    };
    window.BMap = w;
    w.Map = u;
    w.Point = y;
    w.Pixel = q;
    w.Overlay = Z;
    w.Draw = X;
    w.Control = z;
    w.ControlAnchor = f;
    w.StandardMapControl = V;
    w.OverviewMapControl = ag;
    w.CopyrightControl = t;
    w.ScaleControl = A;
    w.ToolbarControl = h;
    w.ToolbarItem = a;
    w.PolylineTItem = r;
    w.Label = K;
    w.Marker = E;
    w.Icon = m;
    w.Polyline = x;
    w.Polygon = v;
    w.InfoWindow = J;
    w.MapType = H;
    w.ContextMenu = G;
    w.MenuItem = F;
    w.Util = i;
    w.OperationMask = j;
    w.Bounds = l;
    w.Project = af
})();
var areaUID = "中国|1,安徽|23,福建|16,甘肃|6,广东|7,广西|17,贵州|24,海南|21,河北|25,黑龙江|2,河南|30,湖北|15,湖南|26,江苏|18,江西|31,吉林省|9,辽宁|19,内蒙古|,宁夏|20,青海|11,山东|8,山西|10,陕西|27,四川|32,新疆|12,西藏|13,云南|28,浙江|29,北京|131,天津|332,石家庄|150,唐山|265,秦皇岛|148,邯郸|151,邢台|266,保定|307,张家口|264,承德|207,沧州|149,廊坊|191,衡水|208,太原|176,大同|355,阳泉|357,长治|356,晋城|290,朔州|237,晋中|238,运城|328,忻州|367,临汾|368,吕梁|327,呼和浩特|321,包头|229,乌海|123,赤峰|297,通辽|64,鄂尔多斯|283,呼伦贝尔|61,巴彦淖尔|169,乌兰察布|168,兴安盟|62,锡林郭勒盟|63,阿拉善盟|230,沈阳|58,大连|167,鞍山|320,抚顺|184,本溪|227,丹东|282,锦州|166,营口|281,阜新|59,辽阳|351,盘锦|228,铁岭|60,朝阳|280,葫芦岛|319,长春|53,吉林市|55,四平|56,辽源|183,通化|165,白山|57,松原|52,白城|51,延边朝鲜族自治州|54,哈尔滨|48,齐齐哈尔|41,鸡西|46,鹤岗|43,双鸭山|45,大庆|50,伊春|40,佳木斯|42,七台河|47,牡丹江|49,黑河|39,绥化|44,大兴安岭地区|38,上海|289,南京|315,无锡|317,徐州|316,常州|348,苏州|224,南通|161,连云港|347,淮安|162,盐城|223,扬州|346,镇江|160,泰州|276,宿迁|277,杭州|179,宁波|180,温州|178,嘉兴|334,湖州|294,绍兴|293,金华|333,衢州|243,舟山|245,台州|244,丽水|292,合肥|127,芜湖|129,蚌埠|126,淮南|250,马鞍山|358,淮北|253,铜陵|337,安庆|130,黄山|252,滁州|189,阜阳|128,宿州|370,巢湖|251,六安|298,亳州|188,池州|299,宣城|190,福州|300,厦门|194,莆田|195,三明|254,泉州|134,漳州|255,南平|133,龙岩|193,宁德|192,南昌|163,景德镇|225,萍乡|350,九江|349,新余|164,鹰潭|279,赣州|365,吉安|318,宜春|278,抚州|226,上饶|364,济南|288,青岛|236,淄博|354,枣庄|172,东营|174,烟台|326,潍坊|287,济宁|286,泰安|325,威海|175,日照|173,莱芜|124,临沂|234,德州|372,聊城|366,滨州|235,菏泽|353,郑州|268,开封|210,洛阳|153,平顶山|213,安阳|267,鹤壁|215,新乡|152,焦作|211,濮阳|209,许昌|155,漯河|344,三门峡|212,南阳|309,商丘|154,信阳|214,周口|308,驻马店|269,武汉|218,黄石|311,十堰|216,宜昌|270,襄樊|156,鄂州|122,荆门|217,孝感|310,荆州|157,黄冈|271,咸宁|362,随州|371,恩施土家族苗族自治州|373,仙桃|1713,潜江|1293,天门|2654,神农架林区|2734,长沙|158,株洲|222,湘潭|313,衡阳|159,邵阳|273,岳阳|220,常德|219,张家界|312,益阳|272,郴州|275,永州|314,怀化|363,娄底|221,湘西土家族苗族自治州|274,广州|257,韶关|137,深圳|340,珠海|140,汕头|303,佛山|138,江门|302,湛江|198,茂名|139,肇庆|338,惠州|301,梅州|141,汕尾|339,河源|200,阳江|199,清远|197,东莞|119,中山|187,潮州|201,揭阳|259,云浮|258,南宁|261,柳州|305,桂林|142,梧州|304,北海|295,防城港|204,钦州|145,贵港|341,玉林|361,百色|203,贺州|260,河池|143,来宾|202,崇左|144,海口|125,三亚|121,五指山|1644,琼海|2358,儋州|1215,文昌|2758,万宁|1216,东方|2634,定安|1214,屯昌|1641,澄迈|2757,临高|2033,白沙黎族自治|2359,昌江黎族自治|1642,乐东黎族自治|2032,陵水黎族自治|1643,保亭黎族苗族自治|1217,琼中黎族苗族自治|2031,重庆|132,成都|75,自贡|78,攀枝花|81,泸州|331,德阳|74,绵阳|240,广元|329,遂宁|330,内江|248,乐山|79,南充|291,眉山|77,宜宾|186,广安|241,达州|369,雅安|76,巴中|239,资阳|242,阿坝藏族羌族自治州|185,甘孜藏族自治州|73,凉山彝族自治州|80,贵阳|146,六盘水|147,遵义|262,安顺|263,铜仁地区|205,黔西南布依族苗族自治州|343,毕节地区|206,黔东南苗族侗族自治州|342,黔南布依族苗族自治州|306,昆明|104,曲靖|249,玉溪|106,保山|112,昭通|336,丽江|114,临沧|110,楚雄彝族自治州|105,红河哈尼族彝族自治州|107,文山壮族苗族自治州|177,普洱|108,西双版纳傣族自治州|109,大理白族自治州|111,德宏傣族景颇族自治州|116,怒江傈僳族自治州|113,迪庆藏族自治州|115,拉萨|100,昌都地区|99,山南地区|97,日喀则地区|102,那曲地区|101,阿里地区|103,林芝地区|98,西安|233,铜川|232,宝鸡|171,咸阳|323,渭南|170,延安|284,汉中|352,榆林|231,安康|324,商洛|285,兰州|36,嘉峪关|33,金昌|34,白银|35,天水|196,武威|118,张掖|117,平凉|359,酒泉|37,庆阳|135,定西|136,陇南|256,临夏回族自治州|182,甘南藏族自治州|247,西宁|66,海东地区|69,海北藏族自治州|67,黄南藏族自治州|70,海南藏族自治州|68,果洛藏族自治州|72,玉树藏族自治州|71,海西蒙古族藏族自治州|65,银川|360,石嘴山|335,吴忠|322,固原|246,中卫|181,乌鲁木齐|92,克拉玛依|95,吐鲁番地区|89,哈密地区|91,昌吉回族自治州|93,博尔塔拉蒙古自治州|88,巴音郭楞蒙古自治州|86,阿克苏地区|85,克孜勒苏柯尔克孜自治州|84,喀什地区|83,和田地区|82,伊犁哈萨克自治州|90,塔城地区|94,阿勒泰地区|96,石河子|770,阿拉尔|731,图木舒克|792,五家渠|789,香港特別行政区|2912,澳门特別行政区|2911".split(",");
var AID = []; (function() {
    for (var c = 0; c < areaUID.length; c++) {
        var b = areaUID[c].split("|");
        AID[b[0]] = b[1]
    }
})();
if (AID["中国"] != null) {
    AID["全国"] = AID["中国"]
}
var Fe = Fe || {
    version: "20080809",
    emptyFn: function() {}
};
Fe.Ajax = function(b) {
    this.url = "";
    this.data = "";
    this.async = true;
    this.duration = -1;
    this.overtime = false;
    this.username = "";
    this.password = "";
    this.method = "GET";
    if (typeof b == "object" && b) {
        for (var a in b) {
            this[a] = b[a]
        }
    }
}; (function() {
    Fe.Ajax.prototype.request = function(d, k) {
        var i = this,
        g = b(),
        l = g.xhr;
        g.active = true;
        i.url = d;
        if (typeof k == "string" && k) {
            i.data = k
        }
        if (typeof i.onexecute == "function") {
            i.onexecute(l)
        }
        try {
            if (!i.username) {
                l.open(i.method, i.url, i.async)
            } else {
                l.open(i.method, i.url, i.async, i.username, i.password)
            }
            if (i.async) {
                l.onreadystatechange = h
            }
            if (i.method.toUpperCase() == "POST") {
                l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            }
            i.beginTime = new Date().getTime();
            if (i.duration > 0) {
                j()
            }
            l.send(i.data)
        } catch(f) {
            if (typeof i.onerror == "function") {
                i.onerror(f)
            }
        }
        if (!i.async) {
            h()
        }
        function h() {
            if (l.readyState == 4) {
                try {
                    l.status
                } catch(m) {
                    if (typeof i.ondisconnect == "function") {
                        i.ondisconnect(l)
                    }
                    g.active = false;
                    return
                }
                i.duration = -1;
                if (!i.overtime) {
                    if (typeof i["on" + l.status] == "function") {
                        i["on" + l.status](l)
                    }
                    if (l.status == 200 && l.statusText.toLowerCase() == "ok") {
                        if (typeof i.onsuccess == "function") {
                            i.onsuccess(l)
                        }
                    } else {
                        if (typeof i.onfailure == "function") {
                            i.onfailure(l)
                        }
                    }
                }
                g.active = false;
                l.onreadystatechange = function() {}
            }
        }
        function j() {
            if (i.duration == -1) {
                return
            }
            if (new Date().getTime() - i.beginTime > i.duration) {
                i.duration = -1;
                try {
                    l.abort()
                } catch(m) {}
                i.overtime = true;
                g.active = false;
                if (typeof i.ontimeout == "function") {
                    i.ontimeout(l)
                }
            }
            setTimeout(function() {
                j()
            },
            10)
        }
    };
    var c = [];
    function b() {
        var g = c;
        for (var f = null, d = 0; d < g.length; d++) {
            f = g[d];
            if (!f.active) {
                break
            }
        }
        if (d >= g.length) {
            f = {
                active: false,
                xhr: a()
            };
            g[g.length] = f
        }
        return f
    }
    function a() {
        if (window.XMLHttpRequest) {
            var g = new XMLHttpRequest();
            Fe.on(window, "onunload", 
            function() {
                g.abort()
            });
            return g
        } else {
            if (window.ActiveXObject) {
                var h = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "Msxml2.XMLHTTP", "MSXML.XMLHttp", "Microsoft.XMLHTTP"];
                for (var f = 0; h[f]; f++) {
                    try {
                        var g = new ActiveXObject(h[f]);
                        Fe.on(window, "onunload", 
                        function() {
                            g.abort()
                        });
                        return g
                    } catch(d) {}
                }
                throw new Error("Your browser do not support XMLHttp")
            }
        }
    }
})();
Fe.Ajax.get = function(a, b) {
    return this.request(a, b)
};
Fe.Ajax.request = function(b, c, a) {
    if (typeof c == "object" && c) {
        a = c;
        c = null
    } else {
        if (typeof c == "function") {
            a = a || {};
            a.onsuccess = c;
            c = null
        }
    }
    var d = new Fe.Ajax(a);
    d.request(b, c);
    return d
}; (function() {
    Fe._log = [];
    var a = 0;
    var b = {};
    Fe.BaseClass = function(c) {
        b[(this.hashCode = (c || Fe.BaseClass.guid()))] = this
    };
    Fe.BaseClass.guid = function() {
        return "mz_" + (a++).toString(36)
    };
    Fe.BaseClass.create = function() {
        var d = new Fe.BaseClass();
        d.decontrol();
        return d
    };
    window.Instance = Fe.instance = Fe.I = function(c) {
        return b[c]
    };
    Fe.BaseClass.prototype.dispose = function() {
        if (this.hashCode) {
            delete b[this.hashCode]
        }
        for (var c in this) {
            if (typeof this[c] != "function") {
                delete this[c]
            }
        }
    };
    Fe.BaseClass.prototype.getHashCode = function() {
        if (!this.hashCode) {
            b[(this.hashCode = Fe.BaseClass.guid())] = this
        }
        return this.hashCode
    };
    Fe.BaseClass.prototype.decontrol = function() {
        delete b[this.hashCode]
    };
    Fe.BaseClass.prototype.toString = function() {
        return "[object " + (this._className || "Object") + "]"
    };
    Fe.BaseClass.prototype._wlog = function(d, f) {
        var c = Fe._log;
        if (c.length > 100) {
            c.reverse().length = 50;
            c.reverse()
        }
        c[c.length] = "[" + d + "][" + (this._className || "Object") + " " + this.hashCode + "] " + f
    }
})();
Function.prototype.inherits = function(c, b) {
    var a,
    d,
    g = this.prototype,
    f = function() {};
    f.prototype = c.prototype;
    d = this.prototype = new f();
    if (typeof(b) == "string") {
        d._className = b
    }
    for (a in g) {
        d[a] = g[a]
    }
    this.prototype.constructor = g.constructor;
    g = f = null;
    return d
};
Fe.Browser = (function() {
    var c = navigator.userAgent;
    var h = 0,
    a = 0,
    g = 0,
    f = 0;
    var d = 0,
    i = 0,
    b = 0;
    if (typeof(window.opera) == "object" && /Opera(\s|\/)(\d+(\.\d+)?)/.test(c)) {
        a = parseFloat(RegExp.$2)
    } else {
        if (/MSIE (\d+(\.\d+)?)/.test(c)) {
            h = parseFloat(RegExp.$1)
        } else {
            if (/Firefox(\s|\/)(\d+(\.\d+)?)/.test(c)) {
                f = parseFloat(RegExp.$2)
            } else {
                if (navigator.vendor == "Netscape" && /Netscape(\s|\/)(\d+(\.\d+)?)/.test(c)) {
                    b = parseFloat(RegExp.$2)
                } else {
                    if (c.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(c)) {
                        g = parseFloat(RegExp.$1)
                    }
                }
            }
        }
    }
    if (c.indexOf("Gecko") > -1 && c.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(c)) {
        i = parseFloat(RegExp.$1)
    }
    return {
        ie: h,
        firefox: f,
        gecko: i,
        netscape: b,
        opera: a,
        safari: g
    }
})();
window.FeBrowser = Fe.Browser;
Fe.copy = function(b) {
    var a = Fe.copy._node;
    if (!a) {
        a = Fe.copy._node = document.createElement("DIV");
        a.style.position = "absolute";
        a.style.top = "-1000px";
        a.style.left = "-1000px";
        document.body.appendChild(a)
    }
    a.innerHTML = ["<embed ", 'src="img/clipboard.swf" ', 'FlashVars="clipboard=', encodeURIComponent(String(b)), '" ', 'width="0" ', 'height="0" ', 'type="application/x-shockwave-flash"></embed>'].join("")
};
Fe.G = function() {
    for (var b = [], c = arguments.length - 1; c > -1; c--) {
        var d = arguments[c];
        b[c] = null;
        if (typeof d == "object" && d && d.dom) {
            b[c] = d.dom
        } else {
            if ((typeof d == "object" && d && d.tagName) || d == window || d == document) {
                b[c] = d
            } else {
                if (typeof d == "string" && (d = document.getElementById(d))) {
                    b[c] = d
                }
            }
        }
    }
    return b.length < 2 ? b[0] : b
};
if (typeof(HTMLElement) != "undefined" && !window.opera) {
    HTMLElement.prototype.__defineGetter__("children", 
    function() {
        for (var c = [], d = 0, g, f = 0, b = this.childNodes.length; f < b; f++) {
            g = this.childNodes[f];
            if (g.nodeType == 1) {
                c[d++] = g;
                if (g.name) {
                    if (!c[g.name]) {
                        c[g.name] = []
                    }
                    c[g.name][c[g.name].length] = g
                }
                if (g.id) {
                    c[g.id] = g
                }
            }
        }
        return c
    })
}
Fe.ac = function(a, b) {
    if (! (a = this.G(a))) {
        return
    }
    b = this.trim(b);
    if (!new RegExp("(^| )" + b.replace(/(\W)/g, "\\$1") + "( |$)").test(a.className)) {
        a.className = a.className.split(/\s+/).concat(b).join(" ")
    }
};
Fe.addClassName = Fe.ac;
Fe.extend = function(g, d) {
    if (g && d && typeof(d) == "object") {
        for (var f in d) {
            g[f] = d[f]
        }
        var c = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
        for (var a = 0, b; a < c.length; a++) {
            b = c[a];
            if (Object.prototype.hasOwnProperty.call(d, b)) {
                g[b] = d[b]
            }
        }
    }
    return g
};
Fe.on = function(c, b, a) {
    if (! (c = Fe.G(c))) {
        return c
    }
    b = b.replace(/^on/, "").toLowerCase();
    if (c.attachEvent) {
        c[b + a] = function() {
            a.call(c, window.event)
        };
        c.attachEvent("on" + b, c[b + a])
    } else {
        c.addEventListener(b, a, false)
    }
    return c
};
Fe.un = function(c, b, a) {
    if (! (c = Fe.G(c))) {
        return c
    }
    b = b.replace(/^on/, "").toLowerCase();
    if (c.attachEvent) {
        c.detachEvent("on" + b, c[b + a]);
        c[b + a] = null
    } else {
        c.removeEventListener(b, a, false)
    }
    return c
};
Fe.rc = function(a, b) {
    if (! (a = this.G(a))) {
        return
    }
    b = this.trim(b);
    var d = a.className.replace(new RegExp("(^| +)" + b.replace(/(\W)/g, "\\$1") + "( +|$)", "g"), "$2");
    if (a.className != d) {
        a.className = d
    }
};
Fe.removeClassName = Fe.rc;
Fe.trim = function(a) {
    return a.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
};
Fe.copy = function(b) {
    var a = Fe.copy._node;
    if (!a) {
        a = Fe.copy._node = document.createElement("DIV");
        a.style.position = "absolute";
        a.style.top = "-1000px";
        a.style.left = "-1000px";
        document.body.appendChild(a)
    }
    a.innerHTML = ["<embed ", 'src="img/clipboard.swf" ', 'FlashVars="clipboard=', encodeURIComponent(String(b)), '" ', 'width="0" ', 'height="0" ', 'type="application/x-shockwave-flash"></embed>'].join("")
};
Fe.Array = {};
Fe.Array.indexOf = function(d, a, b) {
    var c = d.length,
    f = Number(b) || 0;
    f = (f < 0) ? Math.ceil(f) : Math.floor(f);
    if (f < 0) {
        f += c
    }
    for (; f < c; f++) {
        if (f in d && d[f] === a) {
            return f
        }
    }
    return - 1
};
Fe.Array.contains = function(a, b) {
    return Fe.Array.indexOf(a, b) >= 0
};
Fe.Array.unique = function(b) {
    var c = [];
    for (var a = 0; a < b.length; a++) {
        if (!Fe.Array.contains(c, b[a])) {
            c.push(b[a])
        }
    }
    return c
};
Fe.Cookie = function(b) {
    var a = "";
    b = b || {};
    if (/https?:\/\/[^\/]+([^\?]+)/i.test(location.href)) {
        a = RegExp.$1
    }
    this.path = (b.path || a || "/").replace(/(\/)[^\/]*$/, "$1");
    this.expires = b.expires || "";
    this.domain = b.domain || document.domain || "";
    this.secure = b.secure || ""
};
Fe.Cookie.set = function(c, d, a) {
    if (/;=/g.test(c)) {
        throw new Error('Invalid cookie name "' + c + '"')
    }
    if (/;/g.test(d)) {
        throw new Error('Invalid cookie value "' + d + '"')
    }
    var b = new Fe.Cookie(a);
    b.set(c, d);
    return b
};
Fe.Cookie.prototype.set = function(b, c) {
    var a = new Date();
    if (typeof(this.expires) == "number") {
        a.setTime(a.getTime() + this.expires)
    }
    document.cookie = b + "=" + escape(c) + ";expires=" + a.toGMTString() + ";path=" + this.path + (this.domain == "" ? "": ("; domain=" + this.domain)) + (this.secure ? "; secure": "")
};
Fe.Cookie.add = function(a, b, c) {
    return Fe.Cookie.set(a, b, c)
};
Fe.Cookie.remove = function(a) {
    return Fe.Cookie.set(a, "", {
        expires: -1 * 57005 * 57005
    })
};
Fe.Cookie.get = function(b) {
    var c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
    var a = document.cookie.match(c);
    if (a) {
        return unescape(a[2])
    }
    return null
};
if (typeof console == "undefined") {
    window.console = {};
    window.console.log = function() {}
}
window.onerror = function() {
    return false
};
var modelConfig = {
    MODEL_URL: "component_c/",
    DATA_URL: "?newmap=1&qt=",
    MAIN_BOX: "MapInfo",
    tpl: {},
    cityName: "全国",
    cityCode: AID["全国"],
    cityType: 0,
    upCityid: AID["全国"],
    supBus: 0,
    defalutCityCode: null,
    enableMapMove: true,
    level: {
        country: 4,
        province: 11,
        city: 12,
        area: 13
    }
};
var temp = {};
var mainAjax = new Fe.Ajax();
var subAjax = new Fe.Ajax();
var ModelMgr = {
    models: {},
    nowModel: null,
    run: function() {
        if (this.nowModel != null) {
            return
        }
        for (var a in this.models) {
            var b = this.models[a];
            this.nowModel = b.url;
            new Model(b.url, b.opts);
            return
        }
    },
    del: function(a) {
        delete this.models[a];
        this.nowModel = null;
        this.run()
    },
    register: function(a, b) {
        modelConfig.tpl[a] = b
    },
    showLoad: function(a) {},
    hideLoad: function() {
        hideLoading()
    },
    mainModel: null
};
function go(a, b) {
    if ((b && b.dom && b.dom != Fe.G(modelConfig.MAIN_BOX)) || typeof(b) == "function") {
        var c = ModelMgr.models;
        if (!ModelMgr.models[a]) {
            ModelMgr.models[a] = {
                url: a,
                opts: b
            };
            ModelMgr.run()
        }
        return
    }
    if ((!b || !b.dom || b.dom == Fe.G(modelConfig.MAIN_BOX)) && typeof(b) != "function") {
        searchInViewCtrl.exit()
    }
    new Model(a, b)
}
function Model(b, c) {
    Fe.BaseClass.call(this);
    this.stat = {};
    this.stat.begin = new Date().getTime();
    this.url = b;
    this.opts = c || {};
    this.opts.json = null;
    this.opts.tpl = null;
    this.queryString = null;
    this.modelType = null;
    this.dataUrl = null;
    this.tplUrl = null;
    this.modelObject = null;
    this.mainDiv = false;
    this.cityInfo = {};
    this.startCity = {
        name: modelConfig.cityName,
        code: modelConfig.cityCode
    };
    if (Fe.G("curCity")) {
        this.cityInfo.cityName = Fe.G("curCity").innerHTML;
        this.cityInfo.cityCode = modelConfig.cityCode
    }
    if (typeof(this.opts) == "function") {
        this.ajax = subAjax
    } else {
        if (this.opts.dom == null || this.opts.dom == Fe.G(modelConfig.MAIN_BOX)) {
            this.ajax = mainAjax;
            this.mainDiv = true;
            this.opts.dom = Fe.G(modelConfig.MAIN_BOX)
        } else {
            this.ajax = subAjax;
            this.opts.dom = Fe.G(this.opts.dom)
        }
    }
    if (b.indexOf("tpl:") > -1) {
        b = b.slice(4);
        this.queryString = "";
        if (b.indexOf("?") > -1) {
            var a = b.split("?");
            b = a[0];
            this.queryString = a[1]
        }
        this.modelType = "active";
        this.tplUrl = b;
        this.loadTpl(b)
    } else {
        this.modelType = "passive";
        this.loadData(b)
    }
}
Model.inherits(Fe.BaseClass, "Model");
Fe.extend(Model.prototype, {
    loadData: function(url) {
        var me = this;
        this.ajax.onfailure = function(json) {
            try {
                if (me.mainDiv && json.status == 500) {
                    go("tpl:Error");
                    return
                }
            } catch(e) {}
        };
        this.ajax.onsuccess = function(json) {
            me.stat.dataE = new Date().getTime();
            try {
                eval("me.opts.json =" + json.responseText)
            } catch(e) {
                go("tpl:Error");
                return
            }
            try {
                ModelMgr.hideLoad();
                if (me.mainDiv) {
                    if (me.opts.json.result && me.opts.json.result.error == -1) {
                        go("tpl:Error");
                        return
                    }
                }
                if (me.mainDiv && me.opts.json.current_city) {
                    var json = me.opts.json;
                    var city = me.opts.json.current_city;
                    setCurCity(city.name, city.code, city.type);
                    if (city.sup_bus != null) {
                        modelConfig.supBus = city.sup_bus
                    }
                    if (city.up_cityid) {
                        modelConfig.upCityid = city.up_cityid
                    } else {
                        modelConfig.upCityid = city.code
                    }
                    if (json.result && (json.result.type == 7 || json.result.type == 23 || json.result.type == 24 || json.result.type == 29 || json.result.type == 13 || (json.result.type == 11 && json.result.total == 0 && json.result.spec_dispnum == 0))) {
                        if (city.type != null) {
                            var cType = ["country", "province", "city", "area"];
                            var level = modelConfig.level[cType[city.type]];
                            map.zoomTo(level)
                        }
                        if (city.geo != null) {
                            var point = geoToPoint(city.geo);
                            map.setCenter(point)
                        }
                    }
                }
            } catch(ex) {
                ModelMgr.showLoad("JSON数据错误");
                return
            }
            if (typeof(me.opts) == "function") {
                me.opts(me.opts.json);
                ModelMgr.del(me.url)
            } else {
                if (modelConfig.tpl[me.tplUrl]) {
                    me.instance(me.tplUrl)
                } else {
                    if (me.opts.json.result && me.opts.json.result && me.opts.json.result.type && modelCode[me.opts.json.result.type]) {
                        me.loadTpl(modelCode[me.opts.json.result.type])
                    }
                }
            }
            var json = me.opts.json;
            if (json.hot_city && _OLR) {
                _OLR.hot_city = json.hot_city
            }
            if (!json.result) {
                return
            }
            if (me.mainDiv) {
                if (json.result.type == 11) {
                    if (json.result.type != 21 && !json.center || json.result.type == 23) {
                        document.fmwd.word.value = json.result.wd;
                        if (poiSSG) {
                            poiSSG.setValue(json.result.wd)
                        }
                        switchTab(1)
                    }
                } else {
                    if (json.result.type == 19 || json.result.type == 20 || json.result.type == 29) {
                        var strSta = "",
                        strEnd = "";
                        if (json.result.type == 20) {
                            strSta = json.result.start.wd ? json.result.start.wd: "";
                            strEnd = json.result.end[json.result.end.length - 1].wd ? json.result.end[json.result.end.length - 1].wd: ""
                        } else {
                            if (json.result.type == 19) {
                                strSta = json.result.s_wd ? json.result.s_wd: "";
                                strEnd = json.result.e_wd ? json.result.e_wd: ""
                            }
                        }
                        driveSSG1 ? driveSSG1.setValue(strSta) : document.fmnav.word_from.value = strSta;
                        driveSSG2 ? driveSSG2.setValue(strEnd) : document.fmnav.word_to.value = strEnd;
                        switchTab(3)
                    } else {
                        if (json.result.type == 13 || json.result.type == 14 || json.result.type == 24) {
                            if (json.result.type == 13) {
                                document.fmbus.word_from.value = json.result.s_wd == null ? "": json.result.s_wd;
                                document.fmbus.word_to.value = json.result.e_wd == null ? "": json.result.e_wd
                            } else {
                                if (json.result.type == 24) {} else {
                                    document.fmbus.word_from.value = json.result.start.wd == null ? "": json.result.start.wd;
                                    document.fmbus.word_to.value = json.result.end.wd == null ? "": json.result.end.wd
                                }
                            }
                            if (busSSG1) {
                                busSSG1.setValue(document.fmbus.word_from.value)
                            }
                            if (busSSG2) {
                                busSSG2.setValue(document.fmbus.word_to.value)
                            }
                            switchTab(2)
                        }
                    }
                }
            }
        };
        var format = "";
        if (document.location.href.indexOf("format=1") > -1) {
            format = "&format=1"
        }
        var bound = map.getBounds();
        var zoomLevel = "&l=" + map.zoomLevel;
        if (url.indexOf("&l=") > -1) {
            zoomLevel = ""
        }
        this.stat.dataS = new Date().getTime();
        url = url.replace(/%3C/gi, encodeURIComponent(" ")).replace(/%3E/gi, encodeURIComponent(" "));
        this.ajax.request(location.pathname + modelConfig.DATA_URL + url + format + "&ie=utf-8" + zoomLevel + "&b=(" + bound.minX + "," + bound.minY + ";" + bound.maxX + "," + bound.maxY + ")&t=" + new Date().getTime())
    },
    loadTpl: function(a) {
        var b = this;
        if (!modelConfig.tpl[a]) {
            this.ajax.onsuccess = function(d) {
                b.stat.modelE = new Date().getTime();
                var h = d.responseText;
                var c = /<script[^>]*>([\s\S]*)<\/script>/igm;
                var g = c.exec(h);
                if (g && g[1]) {
                    try {
                        b.exec(g[1], a);
                        ModelMgr.hideLoad()
                    } catch(f) {
                        if (b.mainDiv) {}
                        return
                    }
                }
                modelConfig.tpl[a] = h.replace(c, "");
                b.loadTpl(a)
            };
            this.stat.modelS = new Date().getTime();
            this.ajax.request(location.pathname + modelConfig.MODEL_URL + a + ".html?t=" + new Date().getTime());
            return
        }
        if (this.ajax == mainAjax && Fe.G("MapInfo")) {
            if (a.indexOf("BusTrans") > -1) {
                Fe.G("MapInfo").style.overflowY = "hidden"
            } else {
                Fe.G("MapInfo").style.overflowY = "auto"
            }
        }
        this.instance(a)
    },
    exec: function(js, modelCode) {
        this.stat.jsS = new Date().getTime();
        if (window.execScript) {
            window.execScript(js)
        } else {
            window.eval(js)
        }
        if (!window[modelCode]) {
            var script = document.createElement("SCRIPT");
            script.type = "text/javascript";
            document.body.appendChild(script);
            script.appendChild(document.createTextNode(js))
        }
        this.stat.jsE = new Date().getTime()
    },
    instance: function(m) {
        var a = this.opts;
        if (!this.modelObject) {
            this.modelObject = new window[m]();
            this.modelObject.container = a.dom;
            if (a.cinfo) {
                this.modelObject.cinfo = a.cinfo
            }
        }
        var i = this.modelObject;
        i.modelQuery = this.url;
        i.isMain = false;
        if (this.mainDiv) {
            Share.listIndex = null;
            Share.popIndex = null;
            i.isMain = true
        }
        if (i.cinfo == null) {
            i.cinfo = {}
        }
        if (i.cinfo.city == null || i.cinfo.city.name == null) {
            var n = this.startCity;
            i.cinfo.startCity = {
                name: n.name,
                code: n.code
            }
        }
        i.cityInfo = this.cityInfo;
        if (this.modelType == "active" && this.dataUrl == null && i.loadData) {
            this.dataUrl = i.loadData(this.queryString);
            if (this.dataUrl != null && this.dataUrl != "undefined") {
                this.loadData(this.dataUrl);
                return
            }
        }
        if (!this.mainDiv) {
            ModelMgr.del(this.url)
        }
        if (this.mainDiv) {
            if (ModelMgr.mainModel) {
                if (typeof(ModelMgr.mainModel.unload) == "function") {
                    ModelMgr.mainModel.unload()
                }
                if (typeof(a.onunload) == "function") {
                    a.onunload()
                }
                try {
                    for (var f in ModelMgr.mainModel) {
                        ModelMgr.mainModel[f] = null;
                        if (CollectGarbage) {
                            CollectGarbage()
                        }
                    }
                } catch(j) {}
                if (window.cxtBusPoints) {
                    window.cxtBusPoints = null;
                    window.startPoi = null;
                    window.endPoi = null
                }
            }
            ModelMgr.mainModel = this.modelObject
        }
        if (typeof(a.begin) == "function") {
            a.begin()
        }
        if (this.mainDiv && map) {
            if (closeOtherOps) {
                closeOtherOps()
            }
            map.clearOverlays();
            if (window.trafficMgr) {
                window.trafficMgr.setTrafficDiv()
            }
        }
        if (setSearchResult) {
            setSearchResult("")
        }
        var h = i.render(modelConfig.tpl[m].replace(/#hashCode#/gi, i.hashCode), a.json);
        if (!h || h.indexOf("{") == 0) {
            return
        }
        a.dom.innerHTML = h.replace(/#[\w]+#/ig, "");
        if (this.mainDiv && i.json && i.json.result && (i.json.result.type == 11 || i.json.result.type == 1 || i.json.result.type == 2)) {
            modelConfig.enableMapMove = false;
            if (window.mapMoveTimer) {
                clearTimeout(window.mapMoveTimer)
            }
            window.mapMoveTimer = setTimeout(function() {
                modelConfig.enableMapMove = true
            },
            4000)
        } else {
            if (this.mainDiv) {
                if (window.mapMoveTimer) {
                    clearTimeout(window.mapMoveTimer)
                }
                modelConfig.enableMapMove = true
            }
        }
        i.initialize();
        if (i.json == null) {
            i.json = a.json
        }
        if (typeof(a.onload) == "function") {
            a.onload()
        }
        if (typeof(i.load) == "function") {
            i.load()
        }
        this.stat.ok = new Date().getTime();
        if (this.mainDiv) {
            var g = this.stat;
            if (g.dataE && g.dataS && g.modelE && g.modelS) {
                var l = i._className;
                var p = g.ok - g.begin;
                var d = g.dataE - g.dataS;
                var q = g.modelE - g.modelS;
                var c = p - d - q;
                addStat(STAT_COMPONENT, {
                    className: l,
                    dataTime: d,
                    htmlTime: q,
                    jsTime: c
                })
            }
            var o = document.fmHistory;
            var b = escape(this.url);
            History.nowTpl = b;
            o.url.value = b;
            if (a.history != true) {
                if (Fe.Browser.ie > 0) {
                    Fe.G("wHistory").src = "history.html?url=" + escape(b)
                } else {
                    o.submit()
                }
                History.tplOpts[b] = this.opts
            }
            searchInViewCtrl.exit();
            if (map.fullScreenMode) {
                fullScCtrl.returnFullSrc(true)
            }
            if (window.temp.cityPop) {
                window.temp.cityPop.close()
            }
        }
    }
});
var History = {
    nowTpl: null,
    tplOpts: {}
};
var Share = {
    mapInfo: {},
    getLink: function() {
        this.getMap();
        this.getList();
        this.getPopList();
        this.getComponent();
        var b = [];
        for (var a in this.mapInfo) {
            if (this.mapInfo[a] != null) {
                b.push(a + "=" + this.mapInfo[a])
            }
        }
        return "http://" + location.host + location.pathname + "?newmap=1&" + b.join("&")
    },
    getMap: function() {
        this.mapInfo.l = map.zoomLevel;
        var a = map.centerPoint;
        this.mapInfo.c = a.lng.toFixed(0) + "," + a.lat.toFixed(0)
    },
    getComponent: function() {
        if (ModelMgr.mainModel) {
            this.mapInfo.s = encodeURIComponent(decodeURIComponent(ModelMgr.mainModel.modelQuery))
        }
    },
    getList: function() {
        if (this.listIndex != null) {
            this.mapInfo.i = this.listIndex
        } else {
            this.mapInfo.i = null
        }
    },
    getPopList: function() {
        if (this.popIndex != null) {
            this.mapInfo.pi = this.popIndex
        } else {
            this.mapInfo.pi = null
        }
    },
    listIndex: null
};
var MapRevert = {
    revert: function() {
        var a = location.href;
        var b = getParam(a);
        if (b == null || !b.s) {
            return false
        }
        this.setModel(b);
        return true
    },
    setModel: function(param) {
        var me = this;
        var opts = {
            cinfo: {
                cityInit: 1
            },
            onload: function() {
                var mapType = param.t;
                if (param.l != null && typeof(parseInt(param.l)) == "number" || param.c != null) {
                    var p = param.c.split(",");
                    if (p.length == 2) {
                        var lng = parseFloat(p[0]);
                        var lat = parseFloat(p[1]);
                        var point = new BMap.Point(parseFloat(p[0]), parseFloat(p[1]));
                        map.centerAndZoom(point, parseInt(param.l))
                    }
                }
            }
        };
        if (param.l != null && typeof(parseInt(param.l)) == "number") {
            opts.cinfo._maplevel = parseInt(param.l)
        }
        if (param.c != null) {
            var p = param.c.split(",");
            if (p.length == 2) {
                var lng = parseFloat(p[0]);
                var lat = parseFloat(p[1]);
                var point = new BMap.Point(p[0], p[1]);
                opts.cinfo._centerPoint = point
            }
        }
        var index = param.i;
        if (index != null) {
            opts.cinfo._index = index;
            opts.cinfo.index = index
        }
        var poPindex = param.pi;
        if (poPindex != null) {
            opts.cinfo._popIndex = parseInt(poPindex)
        }
        var popPoint = param.b;
        if (popPoint != null) {
            var p = popPoint.split(",");
            if (p.length == 2) {
                var lng = parseFloat(p[0]);
                var lat = parseFloat(p[1]);
                var point = new BMap.Point(p[0], p[1]);
                opts.cinfo._popPoint = point
            }
        }
        param.s = param.s.replace(/%u[0-9a-zA-Z]{4}/ig, 
        function(v) {
            return encodeURIComponent(unescape(v))
        });
        var qs = [];
        try {
            qs = decodeURIComponent(param.s).split("&")
        } catch(e) {
            go("tpl:Error");
            return
        }
        var query = "";
        for (var i = 0, l = qs.length; i < l; i++) {
            var tempQ = qs[i].split("=");
            if (tempQ.length == 0) {
                continue
            }
            if (tempQ.length == 1) {
                query += tempQ[0];
                continue
            }
            var q = tempQ.slice(1).join("");
            if (tempQ[0] == "ec" || tempQ[0] == "en") {
                q = q.replace(/\+/g, " ")
            }
            query += "&" + tempQ[0] + "=" + encodeURIComponent(decodeURIComponent(q))
        }
        query = query.indexOf("&") == 0 ? query.substring(1) : query;
        if (!query.match(/.*&c=\d{1,3}.*/)) {
            var cc = modelConfig.cityCode;
            if (_OLR && _OLR.index) {
                try {
                    eval("var ccd =" + _OLR.index);
                    cc = ccd.content.code
                } catch(e) {
                    cc = modelConfig.cityCode
                }
            }
            if (query.match(/tpl:/) == null) {
                query += "&c=" + cc
            }
        }
        go(query, opts)
    }
};
var modelCode = {
    "11": "PoiSearch",
    "12": "Pcity",
    "18": "BusLines",
    "5": "BusStops",
    "6": "Detail",
    "13": "BusAddr",
    "14": "BusTrans",
    "22": "BusTrans",
    "7": "Clarify",
    "19": "NavAddr",
    "20": "NavTrans",
    "21": "SearchInView",
    "23": "SelAddr",
    "24": "BusAddr",
    "29": "NavAddr",
    "3": "NavQuery",
    "15": "LinesQuery",
    "26": "SpecialPoi",
    "28": "District",
    "1": "City",
    "2": "City"
};
function beforeEndHTML(b, a) {
    b.insertAdjacentHTML("beforeEnd", a);
    return b.lastChild
}
function getParam(b) {
    var a = b.indexOf("?");
    if (a == -1) {
        return
    }
    var f = b.slice(b.indexOf("?") + 1);
    if (f == "") {
        return
    }
    var h = {};
    var g = f.split("&");
    for (var c = 0; c < g.length; c++) {
        var d = g[c].split("=");
        h[d[0]] = d[1]
    }
    return h
}
function getPosition(a) {
    var b = {
        left: 0,
        top: 0
    };
    while (a && a.offsetParent) {
        b.left += a.offsetLeft;
        b.top += a.offsetTop;
        a = a.offsetParent
    }
    return b
}
function getXY(a) {
    return getPosition(a)
}
function getPix(b) {
    var d = {
        x: 0,
        y: 0
    };
    var c = b.srcElement || b.target;
    var a = b.offsetX || b.layerX || 0;
    var f = b.offsetY || b.layerY || 0;
    while (c && c != map.container) {
        if (! (c.clientWidth == 0 && c.clientHeight == 0 && c.offsetParent && c.offsetParent.nodeName == "TD") && c.namespaceURI != "http://www.w3.org/2000/svg") {
            a += c.offsetLeft || 0;
            f += c.offsetTop || 0
        } else {
            if (c.namespaceURI == "http://www.w3.org/2000/svg") {
                if (navigator.userAgent.indexOf("Safari") > -1 && c.tagName != "svg") {
                    c = map.palette
                }
                if (map.palette) {
                    a += parseFloat(map.palette.style.left) + map.offsetX;
                    f += parseFloat(map.palette.style.top) + map.offsetY
                }
            }
        }
        c = c.offsetParent
    }
    d.x = a;
    d.y = f;
    return d
}
function getClientSize() {
    if (window.innerHeight) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.documentElement && document.documentElement.clientHeight) {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        } else {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        }
    }
}
function geoToPoint(f) {
    var c = f.split("|");
    if (c[0] == 1) {
        var d = c[1].split(",");
        var b = new BMap.Point(parseFloat(d[0]), parseFloat(d[1]));
        return b
    } else {
        return
    }
}
function parseGeo(g) {
    if (typeof(g) != "string") {
        return
    }
    var b = g.split("|");
    var m = parseInt(b[0]);
    var c = b[1];
    var q = b[2];
    var f = q.split(";");
    var k = [];
    switch (m) {
    case 1:
        k.push(f[0]);
        break;
    case 2:
    case 3:
        for (var h = 0; h < f.length - 1; h++) {
            var p = f[h];
            if (p.length > 100) {
                p = p.replace(/([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*),([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*)(,)/g, "$1,$2;");
                k.push(p)
            } else {
                var l = [];
                var a = p.split(",");
                for (var d = 0; d < a.length; d += 2) {
                    var o = a[d];
                    var n = a[d + 1];
                    l.push(o + "," + n)
                }
                k.push(l.join(";"))
            }
        }
        break
    }
    if (k.length <= 1) {
        k = k.toString()
    }
    return {
        type: m,
        bound: c,
        points: k
    }
}
function getPointByStr(a) {
    if (typeof a != "string") {
        return
    }
    var b = a.split(",");
    if (b.length < 2) {
        return
    }
    return new BMap.Point(b[0], b[1])
}
function searchWord(c, a) {
    if (typeof(c) == "object") {
        var b = encodeURIComponent(c.innerHTML)
    } else {
        var b = encodeURIComponent(c)
    }
    if (!a) {
        a = modelConfig.cityCode
    }
    if (a) {
        go("s&wd=" + b + "&c=" + a)
    } else {
        go("s&wd=" + b)
    }
}
function cnameSearch(a, b, f) {
    var d = encodeURIComponent(a);
    if (!f) {
        f = 0
    }
    var g = b || modelConfig.cityCode;
    go("con&contp=0&wd=" + d + "&pn=0&c=" + g + "&src=" + f)
}
function stopBubble(a) {
    var a = window.event || a;
    a.stopPropagation ? a.stopPropagation() : a.cancelBubble = true
}
function preventDefault(a) {
    var a = window.event || a;
    a.preventDefault ? a.preventDefault() : a.returnValue = false;
    return false
}
function trim(a) {
    return a.replace(/(^\s*)|(\s*$)/g, "")
}
function setCurCity(a, c, b) {
    if (!Fe.G("curCity")) {
        return
    }
    if (a == "" || a == null || c == "" || c == null) {
        return
    }
    Fe.G("supBus").innerHTML = "";
    if (a == "中国") {
        a = "全国"
    }
    if (Fe.G("curCityText")) {
        if (a == "全国") {
            Fe.G("curCityText").innerHTML = "选择城市";
            modelConfig.cityType = 0
        } else {
            Fe.G("curCityText").innerHTML = "更换城市"
        }
    }
    Fe.G("curCity").innerHTML = a;
    modelConfig.cityCode = c;
    modelConfig.cityName = a;
    if (b != null && b != "") {
        modelConfig.cityType = b
    }
    setTrafficBut()
}
function getXhr() {
    if (window.XMLHttpRequest) {
        var c = new XMLHttpRequest();
        Fe.on(window, "onunload", 
        function() {
            c.abort()
        });
        return c
    } else {
        if (window.ActiveXObject) {
            var d = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "Msxml2.XMLHTTP", "MSXML.XMLHttp", "Microsoft.XMLHTTP"];
            for (var b = 0; d[b]; b++) {
                try {
                    var c = new ActiveXObject(d[b]);
                    Fe.on(window, "onunload", 
                    function() {
                        c.abort()
                    });
                    return c
                } catch(a) {}
            }
            throw new Error("Your browser do not support XMLHttp")
        }
    }
}
function historyUrl(a, c) {
    var b = document.fmHistory;
    var a = escape(a);
    History.nowTpl = a;
    b.url.value = a;
    b.submit();
    History.tplOpts[a] = this.opts
}
function scriptRequest(url, echo, id, charset) {
    var isIe = /msie/i.test(window.navigator.userAgent);
    if (isIe && Fe.G("_script_" + id)) {
        var script = Fe.G("_script_" + id)
    } else {
        if (Fe.G("_script_" + id)) {
            Fe.G("_script_" + id).parentNode.removeChild(Fe.G("_script_" + id))
        }
        var script = document.createElement("script");
        if (charset != null) {
            script.charset = charset
        }
        if (id != null && id != "") {
            script.setAttribute("id", "_script_" + id)
        }
        script.setAttribute("type", "text/javascript");
        document.body.appendChild(script)
    }
    var t = new Date();
    if (url.indexOf("?") > -1) {
        url += "&t=" + t.getTime()
    } else {
        url += "?t=" + t.getTime()
    }
    var _complete = function() {
        if (!script.readyState || script.readyState == "loaded" || script.readyState == "complete") {
            if (typeof(echo) == "function") {
                echo()
            } else {
                eval(echo)
            }
        }
    };
    if (isIe) {
        script.onreadystatechange = _complete
    } else {
        script.onload = _complete
    }
    script.setAttribute("src", url)
}
function getBPoints(f) {
    if (!f || f.length == 0) {
        return
    }
    var d = [];
    for (var c = 0; c < f.length; c++) {
        if (f[c]) {
            var g = f[c].split(";");
            for (var b = 0; b < g.length; b++) {
                var a = getPointByStr(g[b]);
                d.push(a)
            }
        }
    }
    return d
}
function str2mcxy64(g, h, a) {
    var f = 0;
    for (var c = 0; c < h; c++) {
        var b = 0;
        var d = g.charCodeAt(c);
        if (d >= 48 && d <= 57) {
            b = (d - 48) << (6 * c)
        } else {
            if (d >= 64 && d <= 90) {
                b = (d - 54) << (6 * c)
            } else {
                if (d >= 96 && d <= 122) {
                    b = (d - 59) << (6 * c)
                } else {
                    return f
                }
            }
        }
        f += b
    }
    if (a) {
        f -= 131072
    }
    return f
}
function parsePoints(a) {
    var d = [];
    var f = a.length;
    for (var b = 0; b < f; b += 5) {
        var c = a.substr(b, 5);
        var g = str2mcxy64(c, 5, false);
        g = (parseFloat(g) / 10).toFixed(2);
        d.push(g)
    }
    return d.join(",")
}
function parse2Points(h, m) {
    var m = m ? m < 1 ? 1: m: 1;
    var a = [];
    var j = h.substr(0, 5);
    var n = str2mcxy64(j, 5, false);
    var j = h.substr(5, 5);
    var l = str2mcxy64(j, 5, false);
    var o = parseFloat((n / 10).toFixed(2));
    a.push(o);
    var g = parseFloat((l / 10).toFixed(2));
    a.push(g);
    var k = h.length;
    if (m > k) {
        return a.join(",")
    }
    for (var d = 10; d < k; d += 6) {
        var q = h.substr(d, 3);
        var b = str2mcxy64(q, 3, true);
        n += b;
        var q = h.substr(d + 3, 3);
        var b = str2mcxy64(q, 3, true);
        l += b;
        if ((d - 10) % (6 * m) == 0 || d == k - 6) {
            var f = parseFloat((n / 10).toFixed(2));
            var c = parseFloat((l / 10).toFixed(2));
            a.push(f);
            a.push(c)
        }
    }
    return a.join(",")
}
function parse2Geo(h, n) {
    if (typeof(h) != "string") {
        return
    }
    var b = h.split("|");
    var m = parseInt(b[0]);
    var t = b[1].split(";");
    var c = "";
    for (var f = 0; f < t.length; f++) {
        if (f < t.length - 1) {
            c += parsePoints(t[f]) + ";"
        } else {
            c += parsePoints(t[f])
        }
    }
    var r = b[2];
    var d = r.split(";");
    var k = [];
    switch (m) {
    case 1:
        k.push(d[0]);
        break;
    case 2:
    case 3:
        for (var g = 0; g < d.length - 1; g++) {
            var q = parse2Points(d[g], n);
            var l = [];
            var a = q.split(",");
            for (var f = 0; f < a.length; f += 2) {
                var p = a[f];
                var o = a[f + 1];
                l.push(p + "," + o)
            }
            k.push(l.join(";"))
        }
        break
    }
    if (k.length <= 1) {
        k = k.toString()
    }
    return {
        type: m,
        bound: c,
        points: k
    }
}
function getEnPoints(h) {
    if (typeof(h) != "string") {
        return
    }
    var g = h.split("|");
    var f = parseInt(g[0]);
    var b = g[1].split(";");
    var d = "";
    for (var a = 0; a < b.length; a++) {
        if (a < b.length - 1) {
            d += parsePoints(b[a]) + ";"
        } else {
            d += parsePoints(b[a])
        }
    }
    var c = g[2];
    return {
        type: f,
        bound: d,
        points: c
    }
}
function CreateFlash(c, a, b, d, g) {
    var f = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="' + b + '" height="' + d + '" id="' + c + '" align="middle">';
    f += '<param name="allowScriptAccess" value="always">';
    f += '<param name="quality" value="high">';
    f += '<param name="movie" value="' + a + '">';
    f += '<param name="flashvars" value="' + g + '">';
    f += '<embed src="' + a + '" flashvars="' + g + '" quality="high" width="' + b + '" height="' + d + '" name="' + c + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">';
    f += "</object>";
    return f
}
var STAT_INF_NORMAL = 1;
var STAT_INF_STOP = 2;
var STAT_BUS_UNFOLD = 3;
var STAT_BUS_THUMB = 4;
var STAT_DRV_UNFOLD = 5;
var STAT_SUGG_COUNT = 6;
var STAT_TRAF_OPEN = 7;
var STAT_TRAF_REFRE = 8;
var STAT_TRAF_CHTIME = 9;
var STAT_BUS_PAGE = 10;
var STAT_SUB_UNFOLD = 11;
var STAT_SUGG_CLOSE = 12;
var STAT_SUGG_SOPEN = 13;
var STAT_SUGG_SCLOSE = 14;
var STAT_FULL_SCREEN = 15;
var STAT_DRV_SEL = 16;
var STAT_PRNT_POI = 17;
var STAT_PRNT_BUS = 18;
var STAT_PRNT_DRV = 19;
var STAT_POP_NORM = 20;
var STAT_POP_DIR = 21;
var STAT_PTAB_FROMHERE = 22;
var STAT_PTAB_TOHERE = 23;
var STAT_PTAB_FIND = 24;
var STAT_OVM_OPEN = 25;
var STAT_PRNT_BUSQ = 26;
var STAT_CM_FH = 27;
var STAT_CM_TH = 28;
var STAT_CM_ROUND = 29;
var STAT_PANEL_SELECT = 30;
var STAT_MAP_SELECT = 31;
var STAT_POI_UNFOLD = 32;
var STAT_POI_SELSUB = 33;
var STAT_BUS_RESEL_ADDR = 34;
var STAT_DRV_RESEL_ADDR = 36;
var STAT_SEL_CITY_SEARCH = 37;
var STAT_EXIT_FULL_SCREEN = 38;
var STAT_SIV_ZOOM_IN = 39;
var STAT_DO_MEASURE = 40;
var STAT_DO_CAPTURE = 41;
var STAT_GET_LINK = 42;
var STAT_CM_ZOOMIN = 43;
var STAT_CM_ZOOMOUT = 44;
var STAT_CM_CENTER = 45;
var STAT_EXTLINK_WY = 46;
var STAT_EXTLINK_XW = 47;
var STAT_EXTLINK_TB = 48;
var STAT_EXTLINK_ZD = 49;
var STAT_EXTLINK_YY = 50;
var STAT_EXTLINK_TP = 51;
var STAT_EXTLINK_SP = 52;
var STAT_SUGG_DETAIL = 53;
var STAT_COMPONENT = 54;
var STAT_POP_CLOSED_N = 55;
var STAT_POP_CLOSED_D = 56;
function addStat(d, c) {
    if (!d) {
        return
    }
    c = c || {};
    var b = "";
    for (var a in c) {
        b = b + "&" + a + "=" + encodeURIComponent(c[a])
    }
    if (Fe.G("statImg")) {
        setTimeout(function() {
            Fe.G("statImg").src = "img/transparent.gif?newmap=1&t=" + (new Date()).getTime() + "&code=" + d + "&c=" + modelConfig.cityCode + b
        },
        50)
    }
}
function nsClick(c, f) {
    var b = {
        ctrip_hotel: 1,
        ctrip_site: 1,
        dianping: 2,
        house_new: 3,
        house_ershou: 4,
        general_ext: 5
    };
    if (!window.nsLogImg) {
        window.nsLogImg = new Image()
    }
    var a = "http://nsclick.baidu.com/v.gif?pid=108&url=";
    var d = b[f] || 5;
    if (!d) {
        return
    }
    setTimeout(function() {
        window.nsLogImg.src = a + encodeURIComponent(c) + "&type=" + d + "&src_name=" + f + "&t=" + (new Date()).getTime()
    },
    50)
}
function strB(a) {
    return a.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**").length
}
function isInteger(a) {
    return /^\+?[1-9][0-9]*$/.test(a)
}
function lastString(b) {
    var a = b.substring(b.length - 1);
    if (a == "站") {
        return true
    }
    return false
}
function formatJSONString(b) {
    if (!b) {
        return ""
    }
    var c = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    a = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    return c.test(b) ? b.replace(c, 
    function(d) {
        var f = a[d];
        return typeof f === "string" ? f: "\\u" + ("0000" + d.charCodeAt(0).toString(16)).slice( - 4)
    }) : b
}
function s(g, f) {
    var a = "";
    if (document.fmwd.style.display == "block" || document.fmwd.style.display == "") {
        if (Fe.trim(document.fmwd.word.value) != "") {
            a = encodeURIComponent(document.fmwd.word.value)
        }
    } else {
        if (document.fmbus.style.display == "block" || document.fmbus.style.display == "") {
            if (Fe.trim(document.fmbus.word_from.value) != "" && Fe.trim(document.fmbus.word_to.value) != "") {
                a = encodeURIComponent("从" + document.fmbus.word_from.value + "到" + document.fmbus.word_to.value)
            } else {
                if (Fe.trim(document.fmbus.word_from.value) == "" && Fe.trim(document.fmbus.word_to.value) != "") {
                    a = encodeURIComponent(document.fmbus.word_to.value)
                } else {
                    if (Fe.trim(document.fmbus.word_from.value) != "" && Fe.trim(document.fmbus.word_to.value) == "") {
                        a = encodeURIComponent(document.fmbus.word_from.value)
                    }
                }
            }
        } else {
            if (document.fmnav.style.display == "block" || document.fmnav.style.display == "") {
                if (Fe.trim(document.fmnav.word_from.value) != "" && Fe.trim(document.fmnav.word_to.value) != "") {
                    a = encodeURIComponent("从" + document.fmnav.word_from.value + "到" + document.fmnav.word_to.value)
                } else {
                    if (Fe.trim(document.fmnav.word_from.value) == "" && Fe.trim(document.fmnav.word_to.value) != "") {
                        a = encodeURIComponent(document.fmnav.word_to.value)
                    } else {
                        if (Fe.trim(document.fmnav.word_from.value) != "" && Fe.trim(document.fmnav.word_to.value) == "") {
                            a = encodeURIComponent(document.fmnav.word_from.value)
                        }
                    }
                }
            }
        }
    }
    addStat(STAT_EXTLINK_WY + f);
    var c = ["http://news.baidu.com/ns?word=#####&tn=news&from=news&ie=utf-8&bs=mp3&sr=0&cl=2&rn=20&ct=1&prevct=no&sc=map", "http://www.baidu.com/s?wd=#####&ie=utf-8&fr=map", "http://tieba.baidu.com/f?kw=#####&ie=utf-8&fr=map_tab", "", "http://mp3.baidu.com/m?f=nidx&tn=baidump3&ct=134217728&lf=&rn=&word=#####&lm=-1&ie=utf-8&fr=map0000", "http://image.baidu.com/i?tn=baiduimage&ct=201326592&cl=2&lm=-1&word=#####&z=0&ie=utf-8&fr=map0000", "http://video.baidu.com/v?ct=301989888&rn=20&pn=0&db=0&s=0&fbl=1024&word=#####&ie=utf-8&fr=map0000"];
    var d = g.href;
    if (a != "") {
        if (c[f * 1] != "" && c[f * 1].indexOf("#####") != -1) {
            g.href = c[f * 1].replace(/#####/ig, a)
        } else {
            var b = "?";
            g.href = g.href + b + "ie=utf-8&q=" + a
        }
    }
}
function Popup(a) {
    Fe.BaseClass.call(this);
    this.visible = false;
    this.config = a;
    if (!this.config) {
        return
    }
    this.config.addDom = this.config.addDom ? Fe.G(this.config.addDom) : document.body;
    if (a.clickClose != null && a.clickClose == false) {
        this.config.clickClose = false
    } else {
        this.config.clickClose = true
    }
    this.connectDom = new Array()
}
Fe.extend(Popup.prototype, {
    render: function() {
        var b = this.config;
        this.main = beforeEndHTML(b.addDom, '<div class="map_popup" style="width:390px;display:none"></div>');
        var a = this.popBox = beforeEndHTML(this.main, '<div class="popup_main"></div>');
        if (b.isTitle != false) {
            this.title = beforeEndHTML(a, '<div class="title">系统信息</div>')
        }
        this.content = beforeEndHTML(a, '<div class="content"></div>');
        this.button = beforeEndHTML(a, "<button></button>");
        this.shadow = beforeEndHTML(this.main, '<div class="poput_shadow"></div>');
        this.addConnectDom(this.main);
        this.initialize()
    },
    initialize: function() {
        var b = this.config;
        this.setTitle(b.title);
        this.setContent(b.content);
        this.setWidth(b.width);
        this.setHeight(b.height);
        this.show();
        var c = this;
        var a = function(g) {
            var d = g.srcElement || g.target;
            while (d) {
                var h = c.connectDom;
                for (var f = 0; f < h.length; f++) {
                    if (d == h[f]) {
                        return
                    }
                }
                if (d == document.body) {
                    c.close();
                    return
                }
                d = d.parentNode
            }
        };
        if (this.config.clickClose) {
            Fe.on(document.body, "mousedown", a)
        }
        Fe.on(this.button, "click", 
        function(d) {
            if (c.config.clickClose) {
                Fe.un(document.body, "mousedown", a)
            }
            c.main.parentNode.removeChild(c.main);
            c.visible = false;
            if (c.config.close && typeof(c.config.close) == "function") {
                c.config.close()
            }
            if (this.resizeTimer) {
                window.clearInterval(this.resizeTimer);
                this.resizeTimer = null
            }
            if (Fe.G("imgLogo")) {
                Fe.G("imgLogo").style.display = "";
                Fe.G("imgLogo").style.display = "inline"
            }
        });
        if (b.open && typeof(b.open) == "function") {
            b.open()
        }
    },
    setTitle: function(a) {
        if (a && this.title) {
            this.title.innerHTML = a;
            this.config.title = a
        }
    },
    setContent: function(a) {
        if (a) {
            if (typeof(a) == "string") {
                this.content.innerHTML = a
            } else {
                this.content.innerHTML = "";
                this.content.appendChild(a)
            }
            this.config.content = a
        }
    },
    setWidth: function(a) {
        if (a) {
            this.main.style.width = (a - 8) + "px";
            this.config.width = a
        }
    },
    setHeight: function(a) {
        if (this.resizeTimer) {
            window.clearInterval(this.resizeTimer);
            this.resizeTimer = null
        }
        if (a) {
            this.main.style.height = this.shadow.style.height = (a - 9) + "px";
            this.config.height = a;
            if (this.config.isTitle == false) {
                this.content.style.height = (a - 2) + "px"
            } else {
                this.content.style.height = (a - 24 - 9) + "px"
            }
            this.content.style.overflowY = "auto"
        } else {
            this.content.style.height = "auto";
            this.resize()
        }
    },
    hide: function() {
        this.main.style.display = "none";
        this.visible = false
    },
    show: function() {
        this.main.style.display = "block";
        this.popBox.scrollTop = 0;
        this.visible = true
    },
    getDom: function() {
        return this.main
    },
    resize: function() {
        var a = this;
        var b = function() {
            var c = a.content.offsetHeight + 24;
            if (a.mainHeight) {
                if (a.mainHeight != c) {
                    a.mainHeight = c
                }
            }
            a.popBox.style.height = a.shadow.style.height = a.main.style.height = c + "px";
            a.popBox.scrollTop = 0
        };
        if (this.resizeTimer) {
            window.clearInterval(this.resizeTimer);
            this.resizeTimer = null
        }
        this.resizeTimer = window.setInterval(b, 50)
    },
    close: function() {
        this.button.click()
    },
    addConnectDom: function(a) {
        this.connectDom.push(a)
    }
});
function MapCenter() {
    Fe.BaseClass.call(this);
    this.startPoint = map.centerPoint;
    this.unit = 10000;
    this.url = "http://s0.map.baidu.com/?newmap=1&qt=cen"
}
Fe.extend(MapCenter.prototype, {
    getBound: function() {
        var a = map.getBounds();
        var c = function(b) {
            return parseInt(b / 1000) * 1000
        };
        return c(a.minX) + "," + c(a.minY) + ";" + c(a.maxX) + "," + c(a.maxY)
    },
    request: function() {
        if (modelConfig.enableMapMove == false) {
            return
        }
        var d = map.zoomLevel;
        if (d <= 7) {
            window.temp.map_level = d;
            setCurCity("全国", "1", 0);
            return
        }
        var a = map.centerPoint;
        var c = this.startPoint;
        var b = Math.sqrt((c.lng - a.lng) * (c.lng - a.lng) + (c.lat - a.lat) * (c.lat - a.lat));
        if (b > this.unit || window.temp.map_level != d) {
            window.temp.map_level = d;
            this.startPoint = a;
            scriptRequest(this.url + "&b=" + this.getBound() + "&l=" + d, this.curCity, "_MAP_CENTER_", "gbk")
        }
    },
    curCity: function() {
        if (modelConfig.enableMapMove == false) {
            return
        }
        try {
            if (!_mapCenter) {
                return
            }
            var a = _mapCenter;
            var b = a.content;
            if (!b) {
                return
            }
            setCurCity(b.name, b.uid, b.type);
            if (b.sup_bus != null) {
                modelConfig.supBus = b.sup_bus
            }
            if (a.hot_city && _OLR) {
                _OLR.hot_city = a.hot_city
            }
        } catch(c) {}
    }
});
function loadBody() {
    initMapSize();
    initMap();
    addMapControls();
    addMapArea();
    setTimeout(function() {
        bindMapControls();
        addMapContextMenu();
        setInfoWndCollisions([], 1);
        map.addEventListener("mapcontainerresize", 
        function() {
            setInfoWndCollisions([], 1)
        })
    },
    100);
    setTimeout(function() {
        mapResize()
    },
    200);
    Fe.G("wHistory").src = "about:blank";
    if (!MapRevert.revert()) {
        go("tpl:City", {
            cinfo: {
                cityInit: 1
            }
        });
        document.fmwd.word.focus()
    }
    addMapCenter();
    Fe.G("PoiSearch").value = Fe.G("BusSearchSta").value = Fe.G("BusSearchEnd").value = Fe.G("DriveSearchSta").value = Fe.G("DriveSearchEnd").value = "";
    window.poiSSG = new bdMapSuggest({
        inputid: "PoiSearch",
        closeTip: 1,
        formName: "fmwd"
    },
    function(c, b) {
        if (b) {
            qSearch(document.fmwd, "loc", c)
        } else {
            if (Fe.G("PoiSearch")) {
                Fe.G("PoiSearch")._wd2 = c
            }
        }
    },
    function() {
        CloseSuggestion.showTip(Fe.G("PoiSearch"))
    });
    window.busSSG1 = new bdMapSuggest({
        inputid: "BusSearchSta",
        closeTip: 1,
        qType: 2,
        cityid: "modelConfig.cityCode"
    },
    function(b) {
        if (Fe.G("BusSearchSta")) {
            Fe.G("BusSearchSta")._wd2 = b
        }
    },
    function() {
        CloseSuggestion.showTip(Fe.G("BusSearchSta"))
    });
    window.busSSG2 = new bdMapSuggest({
        inputid: "BusSearchEnd",
        closeTip: 1,
        qType: 2,
        cityid: "modelConfig.cityCode"
    },
    function(b) {
        if (Fe.G("BusSearchEnd")) {
            Fe.G("BusSearchEnd")._wd2 = b
        }
    },
    function() {
        CloseSuggestion.showTip(Fe.G("BusSearchEnd"))
    });
    window.driveSSG1 = new bdMapSuggest({
        inputid: "DriveSearchSta",
        closeTip: 1
    },
    function(b) {
        if (Fe.G("DriveSearchSta")) {
            Fe.G("DriveSearchSta")._wd2 = b
        }
    },
    function() {
        CloseSuggestion.showTip(Fe.G("DriveSearchSta"))
    });
    window.driveSSG2 = new bdMapSuggest({
        inputid: "DriveSearchEnd",
        closeTip: 1
    },
    function(b) {
        if (Fe.G("DriveSearchEnd")) {
            Fe.G("DriveSearchEnd")._wd2 = b
        }
    },
    function() {
        CloseSuggestion.showTip(Fe.G("DriveSearchEnd"))
    });
    var a = {
        _8: 1,
        _32: 1,
        _46: 1
    };
    Fe.on(Fe.G("PoiSearch"), "keydown", 
    function(b) {
        if (! (b.keyCode < 49 && !a["_" + b.keyCode])) {
            Fe.G("PoiSearch")._wd2 = null
        }
    });
    Fe.on(Fe.G("BusSearchSta"), "keydown", 
    function(b) {
        if (! (b.keyCode < 49 && !a["_" + b.keyCode])) {
            Fe.G("BusSearchSta")._wd2 = null
        }
    });
    Fe.on(Fe.G("BusSearchEnd"), "keydown", 
    function(b) {
        if (! (b.keyCode < 49 && !a["_" + b.keyCode])) {
            Fe.G("BusSearchEnd")._wd2 = null
        }
    });
    Fe.on(Fe.G("DriveSearchSta"), "keydown", 
    function(b) {
        if (! (b.keyCode < 49 && !a["_" + b.keyCode])) {
            Fe.G("DriveSearchSta")._wd2 = null
        }
    });
    Fe.on(Fe.G("DriveSearchEnd"), "keydown", 
    function(b) {
        if (! (b.keyCode < 49 && !a["_" + b.keyCode])) {
            Fe.G("DriveSearchEnd")._wd2 = null
        }
    });
    poiSSG.setValue("");
    busSSG1.setValue("");
    busSSG2.setValue("");
    driveSSG1.setValue("");
    driveSSG2.setValue("");
    setTimeout(initCityClick, 500)
}
function initMapSize() {
    var c = Fe.G("MapHolder");
    var d = getClientSize().height - 119;
    d = d < 0 ? 0: d;
    c.style.height = d + "px";
    var a = Fe.G("MapInfo");
    var g = d + 2;
    g = g < 0 ? 0: g;
    a.style.height = g + "px";
    var f = Fe.G("shad_v");
    var b = d;
    b = b < 0 ? 0: b;
    f.style.height = b + "px"
}
function mapResize() {
    var a = Fe.G("MapHolder");
    var b = Fe.G("shad_v");
    if (window._resizeTimer) {
        return
    }
    window._resizeTimer = setTimeout(function() {
        if (map.fullScreenMode) {
            var d = getClientSize().height;
            d = d < 0 ? 0: d;
            a.style.height = d + "px"
        } else {
            var d = getClientSize().height - 119;
            var f = d + 2;
            d = d < 0 ? 0: d;
            f = f < 0 ? 0: f;
            a.style.height = d + "px";
            Fe.G("MapInfo").style.height = f + "px"
        }
        var c = parseInt(a.style.height) - parseInt(overviewCtrl.getDom().style.height);
        c = c < 0 ? 0: c;
        b.style.height = c + "px";
        window._resizeTimer = null
    },
    100)
}
function initMap() {
    window.map = new BMap.Map("MapHolder");
    var point = new BMap.Point(12957320, 4825100);
    var level = modelConfig.level.country;
    if (_OLR != null) {
        eval("var json =" + _OLR.index);
        _OLR.hot_city = json.hot_city;
        point = geoToPoint(json.content.geo);
        var cityType = [4, 11, 12, 15];
        level = cityType[json.content.city_type];
        if (json.current_city && json.current_city.sup_bus != null) {
            modelConfig.supBus = json.current_city.sup_bus
        }
        modelConfig.defalutCityCode = json.content.code
    }
    var param = getParam(location.href);
    if (param && param.c) {
        var p = param.c.split(",");
        if (p.length == 2) {
            var lng = parseFloat(p[0]);
            var lat = parseFloat(p[1]);
            if (typeof(lng) == "number" && typeof(lat) == "number") {
                point = new BMap.Point(lng, lat)
            }
        }
        if (param.l && typeof(parseInt(param.l)) == "number") {
            level = parseInt(param.l)
        }
    }
    map.centerAndZoom(point, level);
    Fe.on(map.platform, "mousedown", 
    function() {
        if (document.getElementById("form1") && document.getElementById("form1").word) {
            document.getElementById("form1").word.blur()
        }
    })
}
function switchTab(j, b, a) {
    if (j < 1 || j > 3) {
        return
    }
    var g = switchTab._curSelIndex;
    if (j == 1 && b != null && b != "") {
        Fe.G("PoiSearch").value = b;
        if (poiSSG) {
            poiSSG.setValue(b)
        }
    }
    if (g == j) {
        return
    }
    switchTab._curSelIndex = j;
    for (var d = 1; d <= 3; d++) {
        Fe.G("tab" + d).className = "";
        Fe.G("form" + d).style.display = "none"
    }
    Fe.G("tab" + j).className = "on";
    Fe.G("form" + j).style.display = "block";
    if (j == 1) {
        Fe.G("form1").word.focus()
    } else {
        Fe.G("form" + j).word_from.focus()
    }
    if (g != 1) {
        var h = Fe.trim(Fe.G("form" + g).word_from.value);
        var c = Fe.trim(Fe.G("form" + g).word_to.value);
        setQValue(h, 2, 0);
        setQValue(c, 2, 1);
        setQValue(h, 3, 0);
        setQValue(c, 3, 1)
    }
}
switchTab._curSelIndex = 1;
function addMapControls() {
    window.stdMapCtrl = new BMap.StandardMapControl();
    map.addControl(window.stdMapCtrl);
    window.scaleCtrl = new BMap.ScaleControl({
        offsetY: 20
    });
    map.addControl(window.scaleCtrl);
    window.overviewCtrl = new BMap.OverviewMapControl();
    map.addControl(window.overviewCtrl);
    var d = ["&copy; 2009 Baidu - Data &copy; "];
    d.push('<a target="_blank" href="http://www.navinfo.com.cn/">NavInfo</a> &amp; ');
    d.push('<a target="_blank" href="http://www.mapbar.com/">Mapbar</a> &amp; ');
    d.push('<a target="_blank" href="http://www.cennavi.com.cn/">CenNavi</a>');
    window.copyCtrl = new BMap.CopyrightControl({
        content: d.join(""),
        anchor: BMap.ControlAnchor.ANCHOR_BOTTOM_LEFT
    });
    map.addControl(window.copyCtrl);
    var g = new BMap.ToolbarControl({
        visible: false
    });
    map.addControl(g);
    var b = new BMap.PolylineTItem({
        styleCodes: {
            lnCode: OVERLAY_STYLE.DIS_LINE,
            spCode: OVERLAY_STYLE.DIS_DOT,
            slCode: OVERLAY_STYLE.DIS_LBL,
            tlCode: OVERLAY_STYLE.DIS_T_LBL
        }
    });
    window.distanceControl = b;
    g.addItem(b);
    var f = ["PoiSearch", "BusSearchSta", "BusSearchEnd", "DriveSearchSta", "DriveSearchEnd"];
    for (var c = 0, a = f.length; c < a; c++) {
        Fe.on(Fe.G(f[c]), "mousedown", 
        function() {
            closeMeasure()
        })
    }
    map.temp.toolsElement = [];
    addTraffic();
    map.addControl(searchInViewCtrl);
    map.addControl(fullScCtrl);
    map.temp.toolsElement.push(searchInViewCtrl.getDom())
}
function addMapContextMenu() {
    var g = function() {
        addStat(STAT_CM_FH);
        if (switchTab._curSelIndex < 3) {
            go("tpl:BusTrans", {
                dom: "",
                cinfo: {
                    isPos: true,
                    destFlag: 0,
                    point: this.menuPoint
                }
            })
        } else {
            go("tpl:NavTrans", {
                dom: "",
                cinfo: {
                    isPos: true,
                    destFlag: 0,
                    point: this.menuPoint
                }
            })
        }
    };
    var b = function() {
        addStat(STAT_CM_TH);
        if (switchTab._curSelIndex < 3) {
            go("tpl:BusTrans", {
                dom: "",
                cinfo: {
                    isPos: true,
                    destFlag: 1,
                    point: this.menuPoint
                }
            })
        } else {
            go("tpl:NavTrans", {
                dom: "",
                cinfo: {
                    isPos: true,
                    destFlag: 1,
                    point: this.menuPoint
                }
            })
        }
    };
    var h = function() {
        var k = this.menuPoint;
        var j = addRangeSearchCenterPoi(k);
        var i = createRangeInfoWnd(k);
        i.addEventListener("close", 
        function() {
            exitRangeSearch();
            if (i.overlay) {
                i.overlay.remove()
            }
        });
        i.addEventListener("open", 
        function() {
            map.addEventListener("moveend", 
            function() {
                if (Fe.G("rangekw")) {
                    Fe.G("rangekw").focus()
                }
                map.removeEventListener("moveend", arguments.callee)
            })
        });
        openSearchInfoWnd(i, j)
    };
    var d = function() {
        map.zoomIn(this.menuPoint);
        addStat(STAT_CM_ZOOMIN)
    };
    var c = function() {
        map.zoomOut(this.menuPoint);
        addStat(STAT_CM_ZOOMOUT)
    };
    var f = function() {
        map.panTo(this.menuPoint);
        addStat(STAT_CM_CENTER)
    };
    var a = createContextMenu([{
        text: " 以此为起点",
        callback: g,
        width: 90
    },
    {
        text: " 以此为终点",
        callback: b,
        width: 90
    },
    {
        separator: true
    },
    {
        text: " 在此点附近找...",
        callback: h,
        width: 90
    },
    {
        separator: true
    },
    {
        text: " 放大",
        callback: d,
        width: 70,
        id: "cmitem_zoomin"
    },
    {
        text: " 缩小",
        callback: c,
        width: 70,
        id: "cmitem_zoomout"
    },
    {
        text: " 居中",
        callback: f,
        width: 70,
        id: "cmitem_center"
    }]);
    a.addEventListener("open", 
    function() {
        if (ModelMgr.mainModel && ModelMgr.mainModel._className == "BusAddr" || ModelMgr.mainModel && ModelMgr.mainModel._className == "NavAddr" || ModelMgr.mainModel && ModelMgr.mainModel._className == "SelAddr") {
            if (this.getItems()[0]) {
                this.getItems()[0].enable(false)
            }
            if (this.getItems()[1]) {
                this.getItems()[1].enable(false)
            }
            return
        }
        if (this.getItems()[0]) {
            this.getItems()[0].enable(true)
        }
        if (this.getItems()[1]) {
            this.getItems()[1].enable(true)
        }
    })
}
function bindMapControls() {
    overviewCtrl.addEventListener("viewchanging", 
    function() {
        var a = parseInt(Fe.G("MapHolder").style.height) - parseInt(overviewCtrl.getDom().style.height);
        a = a < 0 ? 0: a;
        Fe.G("shad_v").style.height = a + "px"
    });
    overviewCtrl.addEventListener("viewchanged", 
    function() {
        var a = parseInt(Fe.G("MapHolder").style.height) - parseInt(overviewCtrl.getDom().style.height);
        a = a < 0 ? 0: a;
        Fe.G("shad_v").style.height = a + "px";
        if (this.isOpen == true) {
            addStat(STAT_OVM_OPEN);
            setInfoWndCollisions([161, 161], 2)
        } else {
            setInfoWndCollisions([10, 10], 2)
        }
    });
    overviewCtrl.addEventListener("hide", 
    function() {
        var a = parseInt(Fe.G("MapHolder").style.height);
        a = a < 0 ? 0: a;
        Fe.G("shad_v").style.height = a + "px"
    });
    overviewCtrl.addEventListener("show", 
    function() {
        var a = parseInt(Fe.G("MapHolder").style.height) - parseInt(overviewCtrl.getDom().style.height);
        a = a < 0 ? 0: a;
        Fe.G("shad_v").style.height = a + "px"
    })
}
function setQValue(a, b, c) {
    if (!a) {
        a = ""
    }
    if (!b) {
        b = 1
    }
    if (b < 1 || b > 3) {
        return
    }
    if (b == 1) {
        if (window.poiSSG) {
            poiSSG.setValue(a)
        } else {
            Fe.G("form1").word.value = a
        }
    } else {
        if (b == 2) {
            if (c == 0) {
                if (window.busSSG1) {
                    window.busSSG1.setValue(a)
                } else {
                    Fe.G("form2").word_from.value = a
                }
            } else {
                if (c == 1) {
                    if (window.busSSG2) {
                        window.busSSG2.setValue(a)
                    } else {
                        Fe.G("form2").word_to.value = a
                    }
                }
            }
        } else {
            if (c == 0) {
                if (window.driveSSG1) {
                    window.driveSSG1.setValue(a)
                } else {
                    Fe.G("form3").word_from.value = a
                }
            } else {
                if (c == 1) {
                    if (window.driveSSG2) {
                        window.driveSSG2.setValue(a)
                    } else {
                        Fe.G("form3").word_to.value = a
                    }
                }
            }
        }
    }
}
function mapRevert() {
    var a = location.href;
    var b = getParam(a);
    if (b == null) {
        return false
    }
    if (b.s) {}
}
function addMapCenter() {
    if (!map || !MapCenter) {
        return
    }
    var a = new MapCenter();
    map.addEventListener("load", 
    function(b) {
        a.request()
    });
    map.addEventListener("moveend", 
    function(b) {
        a.request()
    });
    map.addEventListener("dragend", 
    function(b) {
        a.request()
    });
    map.addEventListener("zoomend", 
    function(b) {
        a.request()
    })
}
function initCityClick() {
    if (typeof clickCityData != "undefined") {
        var c = [];
        for (var b = 0, a = clickCityData.length; b < a; b++) {
            c[b] = {
                name: clickCityData[b].n,
                point: new BMap.Point(clickCityData[b].p.split(",")[0], clickCityData[b].p.split(",")[1]),
                zoomLevel: clickCityData[b].l
            }
        }
        map.arrHotspot = c;
        map.addEventListener("mousedown", 
        function(d) {
            if (map.zoomLevel >= 4 && map.zoomLevel <= 9) {
                clickCityData.dnX = d.offsetX;
                clickCityData.dnY = d.offsetY
            }
        });
        map.addEventListener("click", 
        function(d) {
            if (map.zoomLevel < 4 || map.zoomLevel > 9) {
                return
            }
            if (!c[map.temp.hotspotIndex]) {
                return
            }
            if (d.offsetX == clickCityData.dnX && d.offsetY == clickCityData.dnY) {
                go("cur&wd=" + encodeURIComponent(c[map.temp.hotspotIndex].name) + "&ie=utf-8");
                map.platform.style.cursor = "url(" + map.config.defaultCursor + "), default"
            }
            delete clickCityData.dnX;
            delete clickCityData.dnY;
            delete map.temp.hotspotIndex;
            delete map.temp._hotspotIndex
        })
    }
}
function addMapCenter() {
    if (!map || !MapCenter) {
        return
    }
    var a = new MapCenter();
    map.addEventListener("load", 
    function(b) {
        a.request()
    });
    map.addEventListener("moveend", 
    function(b) {
        a.request()
    });
    map.addEventListener("dragend", 
    function(b) {
        a.request()
    });
    map.addEventListener("zoomend", 
    function(b) {
        a.request()
    })
}
function addTraffic() {
    if (Fe.G("trafficBut")) {
        return
    }
    var a = beforeEndHTML(Fe.G("MapHolder"), '<div id="trafficBut" style="right:152px" title="显示交通流量"></div>');
    map.temp.toolsElement.push(a);
    a.onmouseover = function() {
        if (this.className != "active") {
            this.className = "hover";
            this.style.backgroundPosition = "-126px -329px"
        }
    };
    a.onmouseout = function() {
        if (this.className == "hover") {
            this.className = "";
            this.style.backgroundPosition = "-126px -309px"
        }
    };
    a.onclick = function() {
        if (this.className == "active") {
            this.className = "";
            this.style.backgroundPosition = "-126px -309px";
            if (window.temp.TrafficPop) {
                window.temp.TrafficPop.close()
            }
            if (Fe.G("trafficBut")) {
                Fe.G("trafficBut").title = "查看交通流量"
            }
            setInfoWndCollisions([], 1)
        } else {
            this.className = "active";
            this.style.backgroundPosition = "-126px -349px";
            var d = {
                height: 53,
                width: 251,
                addDom: "wrapper",
                clickClose: false,
                isTitle: false,
                close: function() {
                    Fe.G("trafficBut").className = "";
                    Fe.G("trafficBut").style.backgroundPosition = "-126px -309px";
                    setInfoWndCollisions([], 1);
                    if (window.temp.trafficTimer) {
                        window.clearInterval(window.temp.trafficTimer)
                    }
                    window.trafficMgr.end();
                    if (Fe.G("trafficBut")) {
                        Fe.G("trafficBut").title = "查看交通流量"
                    }
                }
            };
            var c = window.temp.TrafficPop = new Popup(d);
            c.render();
            var b = getXY(this);
            if (map.fullScreenMode) {
                c.getDom().style.left = (b.left - 9) + "px";
                c.getDom().style.top = "31px"
            } else {
                c.getDom().style.left = (b.left - 33) + "px";
                c.getDom().style.top = "33px"
            }
            if (Fe.G("trafficBut")) {
                Fe.G("trafficBut").title = "隐藏交通流量"
            }
            addStat(STAT_TRAF_OPEN);
            c.hide();
            searchInViewCtrl.exit();
            go("tpl:TrafficPanel", {
                dom: c.content,
                onload: function() {
                    window.temp.TrafficPop.show()
                }
            });
            setInfoWndCollisions([267, 89], 1)
        }
    };
    setCurCity(modelConfig.cityName, modelConfig.cityCode);
    map.addEventListener("mapcontainerresize", 
    function() {
        if (!window.temp.TrafficPop) {
            return
        }
        var b = getXY(Fe.G("trafficBut"));
        if (map.fullScreenMode) {
            window.temp.TrafficPop.getDom().style.left = (b.left - 9) + "px";
            window.temp.TrafficPop.getDom().style.top = "31px"
        } else {
            window.temp.TrafficPop.getDom().style.left = (b.left - 33) + "px";
            window.temp.TrafficPop.getDom().style.top = "33px"
        }
    })
}
function setTrafficBut() {
    var a = Fe.G("trafficBut");
    var d = window.temp.TrafficPop;
    if (!a) {
        return
    }
    var c = modelConfig.cityCode;
    var f = [AID["北京"], AID["上海"], AID["广州"], AID["深圳"]];
    for (var b = 0; b < f.length; b++) {
        if (c == f[b]) {
            a.style.display = "";
            if (d) {
                d.show()
            }
            setInfoWndCollisions([], 1);
            return
        }
    }
    a.style.display = "none";
    setInfoWndCollisions([], 1);
    if (d) {
        d.hide()
    }
}
function trafficExit() {
    if (window.temp.TrafficPop) {
        window.temp.TrafficPop.close()
    }
    if (Fe.G("trafficBut")) {
        Fe.G("trafficBut").title = "查看交通流量"
    }
}
function trafficHide() {
    if (Fe.G("trafficBut")) {
        Fe.G("trafficBut").style.visibility = "hidden"
    }
    if (window.temp.TrafficPop) {
        window.temp.TrafficPop.getDom().style.visibility = "hidden"
    }
    if (map.temp.trafficDiv) {
        map.temp.trafficDiv.style.visibility = "hidden"
    }
}
function trafficShow() {
    if (Fe.G("trafficBut")) {
        Fe.G("trafficBut").style.visibility = ""
    }
    if (window.temp.TrafficPop) {
        window.temp.TrafficPop.getDom().style.visibility = ""
    }
    if (map.temp.trafficDiv) {
        map.temp.trafficDiv.style.visibility = ""
    }
}
function clickCity(a) {
    go("cur&wd=" + encodeURIComponent(a) + "&ie=utf-8")
}
function setCursor(b, a) {
    stopBubble(a);
    map.platform.style.cursor = "pointer";
    b.oncontextmenu = function(c) {
        return false
    }
}
function addMapArea() {
    document.writeln('<map name="Map2_0">');
    document.writeln('<area shape="rect" id="xa2" coords="219,0,239,8" onmousemove="setCursor(this,event)" onclick="clickCity(\'西安市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="zz3" coords="250,1,257,5" onmousemove="setCursor(this,event)" onclick="clickCity(\'郑州市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="wh2" coords="244,38,263,50" onmousemove="setCursor(this,event)" onclick="clickCity(\'武汉市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="gz2" coords="251,84,269,94" onmousemove="setCursor(this,event)" onclick="clickCity(\'广州市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="am2" coords="247,109,279,123" onmousemove="setCursor(this,event)" onclick="clickCity(\'澳门特别行政区\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="lz" coords="188,5,210,16"  onmousemove="setCursor(this,event)" onclick="clickCity(\'兰州市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="cq" coords="209,37,230,48" onmousemove="setCursor(this,event)" onclick="clickCity(\'重庆市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="zd" coords="172,36,193,47" onmousemove="setCursor(this,event)" onclick="clickCity(\'成都市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="cs" coords="232,57,252,68" onmousemove="setCursor(this,event)" onclick="clickCity(\'长沙市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="gy" coords="201,73,223,86" onmousemove="setCursor(this,event)" onclick="clickCity(\'贵阳市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="nn" coords="218,100,238,111" onmousemove="setCursor(this,event)" onclick="clickCity(\'南宁市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="hk" coords="229,128,248,140" onmousemove="setCursor(this,event)" onclick="clickCity(\'海口市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="km" coords="175,92,198,105" onmousemove="setCursor(this,event)" onclick="clickCity(\'昆明市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="ls" coords="96,30,120,41" onmousemove="setCursor(this,event)" onclick="clickCity(\'拉萨市\')" href="javascript:void(0)">');
    document.writeln("</map>");
    document.writeln('<map name="Map3_1">');
    document.writeln('<area shape="rect" id="zz1" coords="-3,250,17,260" onmousemove="setCursor(this,event)" onclick="clickCity(\'郑州市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="sjz2" coords="-13,218,14,229" onmousemove="setCursor(this,event)" onclick="clickCity(\'石家庄市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="bj" coords="12,197,38,211" onmousemove="setCursor(this,event)" onclick="clickCity(\'北京市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="hrb"coords="80,145,114,156" onmousemove="setCursor(this,event)" onclick="clickCity(\'哈尔滨市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="cc" coords="75,165,97,176" onmousemove="setCursor(this,event)" onclick="clickCity(\'长春市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="sy" coords="61,184,86,195" onmousemove="setCursor(this,event)" onclick="clickCity(\'沈阳市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="tj" coords="38,218,61,231" onmousemove="setCursor(this,event)" onclick="clickCity(\'天津市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="jn" coords="34,244,58,262" onmousemove="setCursor(this,event)" onclick="clickCity(\'济南市\')" href="javascript:void(0)">');
    document.writeln("</map>");
    document.writeln('<map name="Map2_1">');
    document.writeln('<area shape="rect" id="mlmq" coords="60,162,106,176" onmousemove="setCursor(this,event)" onclick="clickCity(\'乌鲁木齐市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="hhht" coords="195,200,247,214" onmousemove="setCursor(this,event)" onclick="clickCity(\'呼和浩特市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="xn" coords="167,232,191,246" onmousemove="setCursor(this,event)" onclick="clickCity(\'西宁市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="sjz1" coords="238,218,255,229" onmousemove="setCursor(this,event)" onclick="clickCity(\'石家庄市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="ty" coords="228,233,248,245" onmousemove="setCursor(this,event)" onclick="clickCity(\'太原市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="yc" coords="201,224,223,235" onmousemove="setCursor(this,event)" onclick="clickCity(\'银川市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="xa1" coords="212,252,238,281" onmousemove="setCursor(this,event)" onclick="clickCity(\'西安市\')" href="javascript:void(0)">');
    document.writeln("</map>");
    document.writeln('<map name="Map3_0">');
    document.writeln('<area shape="rect" id="nj" coords="34,13,54,25" onmousemove="setCursor(this,event)" onclick="clickCity(\'南京市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="hf" coords="-9,-7,22,6" onmousemove="setCursor(this,event)" onclick="clickCity(\'郑州市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="hf" coords="7,24,31,36" onmousemove="setCursor(this,event)" onclick="clickCity(\'合肥市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="sh" coords="64,26,85,37" onmousemove="setCursor(this,event)" onclick="clickCity(\'上海市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="hz" coords="56,41,80,52" onmousemove="setCursor(this,event)" onclick="clickCity(\'杭州市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="nc" coords="25,50,47,65" onmousemove="setCursor(this,event)" onclick="clickCity(\'南昌市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="fz" coords="17,71,38,82" onmousemove="setCursor(this,event)" onclick="clickCity(\'福州市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="xg" coords="12,98,37,110" onmousemove="setCursor(this,event)" onclick="clickCity(\'香港特别行政区\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="wh1" coords="-38,38,9,51" onmousemove="setCursor(this,event)" onclick="clickCity(\'武汉市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="gg1" coords="-36,84,15,95" onmousemove="setCursor(this,event)" onclick="clickCity(\'广州市\')" href="javascript:void(0)">');
    document.writeln('<area shape="rect" id="am1" coords="-21,109,13,122" onmousemove="setCursor(this,event)" onclick="clickCity(\'澳门特别行政区\')" href="javascript:void(0)">');
    document.writeln("</map>")
}
var CloseSuggestion = (function() {
    return Object({
        closeTime: null,
        showTip: function(inputBox) {
            var offdiv = null;
            if (!Fe.G("sugoff")) {
                offdiv = document.createElement("div");
                with(offdiv) {
                    id = "sugoff";
                    position = "absolute";
                    onselectstart = "return false";
                    style.zIndex = "200"
                }
                document.body.appendChild(offdiv)
            } else {
                offdiv = Fe.G("sugoff")
            }
            offdiv.innerHTML = "提示功能已关闭,您可以在高级搜索中再次启用";
            var iPos = this.getPos(inputBox);
            offdiv.style.left = iPos[0] * 1 + "px";
            offdiv.style.top = iPos[1] * 1 + parseInt(inputBox.offsetHeight) + "px";
            if (inputBox.offsetWidth >= offdiv.offsetWidth) {
                offdiv.style.width = inputBox.offsetWidth + "px"
            }
            this.closeTime = setTimeout(function() {
                clearTimeout(CloseSuggestion.closeTime);
                if (Fe.G("sugoff")) {
                    document.body.removeChild(Fe.G("sugoff"))
                }
            },
            3000)
        },
        getPos: function(el) {
            var xPos = 0,
            yPos = 0;
            while (el != null) {
                xPos += el.offsetLeft;
                yPos += el.offsetTop;
                el = el.offsetParent
            }
            return [xPos, yPos]
        }
    })
})();
ModelMgr.register("City", '<div class="mapinfo_con">			<div style="display:#setCity_none#">				<button class="city_close" onclick="this.parentNode.style.display=\'none\'"></button>				<p style="background:#e4ebf8;padding:5px">					已切换至<b>#cname#</b>，您可将其<nobr><a href="javascript:void(0)" title="如设置成功，您下次访问时将直接进入#cname#" onclick="Instance(\'#hashCode#\').setDefCity(\'#cname#\',this,1)">设为默认城市</a></nobr>				</p>				<br>			</div>			#special_0#			<b>搜索示例：</b>			<p style="padding-left:12px;display:#sample_poi_none#">找地点？您可以输入：<br>"<a href="javascript:void(0)" onclick="Instance(\'#hashCode#\').searchWord(this)">#sample_poi#</a>"</p>			<p  style="padding-left:12px;display:#sample_route_none#">#sample_route_info#<br>"<a href="javascript:void(0)" onclick="Instance(\'#hashCode#\').#function#(this)">#sample_route#</a>"</p>			<br>			<p style="display:#none#">大家还经常在"#cname# "找：<br>#sample_other#</p>			#special_1#			<div id="setDefCity_#hashCode#" style="padding-top:10px;height:28px"></div>			<p id="searchCity_#hashCode#" style="margin-top:10px;display:none">您是否要<a href="javascript:void(0)" onclick="cnameSearch(\'#tips#\',\'#city_code#\')">在<b>#search_city#</b>找名称中含有"<b>#tips#</b>"的地点</a>			<br></p>			<p style="padding-top:10px">#weather#</p>			#special_2#		</div>');
function City() {
    Fe.BaseClass.call(this);
    this.type = "city";
    this.config = {
        cPoint: [12957320, 4825100]
    };
    this.defaultPage = false;
    this.curCity = {}
}
City.inherits(Fe.BaseClass, "City");
Fe.extend(City.prototype, {
    render: function(html, json) {
        if (!json && _OLR) {
            eval("var defData =" + _OLR.index);
            json = defData;
            _OLR.hot_city = json.hot_city;
            this.defaultPage = true;
            if (json.content && json.content.code) {
                modelConfig.defalutCityCode = json.content.code
            }
        }
        this.json = json;
        switch (json.content.city_type) {
        case 0:
            html = this.setCountry();
            break;
        case 1:
            html = this.setProvince();
            break;
        case 2:
            html = this.setCity(html);
            break;
        case 3:
            html = this.setArea();
            break;
        default:
            break
        }
        if (this.cinfo && this.cinfo.setDefCity) {
            modelConfig.defalutCityCode = this.json.content.code
        }
        html = this.setSpecial(html);
        return html
    },
    initialize: function() {
        this.setMap();
        if (!this.json || !this.json.content) {
            return
        }
        var f = this.json.content;
        if (this.json.content.cname && this.json.content.if_current == 1) {
            Fe.G("curCity").innerHTML = f.cname;
            modelConfig.cityName = f.cname;
            if (f.if_current == 1 && f.code) {
                this.curCity = {
                    name: f.cname,
                    code: f.code
                };
                setCurCity(f.cname, f.code, f.city_type)
            } else {
                setCurCity(modelConfig.cityName, modelConfig.cityCode)
            }
        } else {
            if (f.if_current == 0 && f.pccode && f.pcname) {
                this.curCity = {
                    name: f.pcname,
                    code: f.pccode
                };
                setCurCity(f.pcname, f.pccode, f.city_type)
            }
        }
        if (this.json.result.wd != null) {
            if (this.json && this.json.result && this.json.result.jump_back == 1 && this.cinfo && this.cinfo.cityInit != 1 && this.cinfo.defCity != "setDef") {
                if (Fe.G("searchCity_" + this.hashCode)) {
                    Fe.G("searchCity_" + this.hashCode).style.display = "block"
                }
            }
        }
        var g = Fe.G("ditie_" + this.hashCode);
        if (g && this.json.content) {
            var d = [];
            d[AID["北京"]] = "北京市|beijing";
            d[AID["上海"]] = "上海市|shanghai";
            d[AID["广州"]] = "广州市|guangzhou";
            var b = this.json.content.code;
            if (d[b]) {
                var j = d[b].split("|");
                var h = '<div style="color:#f85d00;font-weight:bold;margin-bottom:5px">精彩推荐：</div>';
                if (j[1] == "beijing") {
                    h += '<div style="padding-left:20px;background:url(img/city_icon.gif) no-repeat 0 -30px;font-weight:bold">四号线9月28日开通运营</div>';
                    h += '<div style="padding-left:20px">您可搜索：<a target="_blank" href="/?newmap=1&l=12&c=12950013,4828143&i=131,%E5%9C%B0%E9%93%814%E5%8F%B7%E7%BA%BF,f4270ea165df78a85a109328,0&s=tpl%3ALinesQuery">地铁4号线</a>							<a target="_blank" href="/?newmap=1&l=18&c=12955885,4825685&s=inf%26uid%3D722fee03d327cb7527d2bbde%26c%3D131%26newmap%3D1%26it%3D1">西单站</a>							<a target="_blank" href="/?newmap=1&l=18&c=12949165,4836765&s=inf%26uid%3D33ada2df36beb45380288a28%26c%3D131%26newmap%3D1%26it%3D1">中关村站</a></div>';
                    h += '<div style="padding-left:20px;background:url(img/city_icon.gif) no-repeat 0 2px;margin:5px 0 20px">								<a href="subways/index.html?c=beijing" style="font-weight:bold;_vertical-align:-2px" target="_blank">北京市地铁路线图</a>								<sup style="color:#F00;vertical-align:2px">New</sup>							</div>'
                }
                if (j[1] == "shanghai") {
                    h += '<div style="padding-left:20px;background:url(img/city_icon.gif) no-repeat 0 -59px;margin:5px 0 10px">								<a href="subways/index.html?c=shanghai" style="font-weight:bold;_vertical-align:-2px" target="_blank">上海市地铁路线图</a>								<sup style="color:#F00;vertical-align:2px">New</sup>							</div>'
                }
                if (j[1] == "guangzhou") {
                    h += '<div style="padding-left:20px;background:url(img/city_icon.gif) no-repeat 0 -88px;margin:5px 0 10px">								<a href="subways/index.html?c=guangzhou" style="font-weight:bold;_vertical-align:-2px" target="_blank">广州市地铁路线图</a>								<sup style="color:#F00;vertical-align:2px">New</sup>							</div>'
                }
                g.style.display = "";
                g.style.lineHeight = "20px";
                g.innerHTML = h
            }
        }
        this.setBaike();
        if (this.defaultPage || (this.cinfo.defCity != null && this.cinfo.defCity == "setDef")) {
            this.setAsDefCityHtml()
        } else {
            var k = Fe.G("setDefCity_" + this.hashCode);
            if (k) {
                k.style.display = "none"
            }
        }
        if (this.json.content.city_type == CITY_TYPE_PROV || this.json.content.city_type == CITY_TYPE_DIST) {
            var i = this;
            var c = this.json.content.uid;
            if (!c) {
                return
            }
            if (window.mapMoveTimer) {
                clearTimeout(window.mapMoveTimer)
            }
            modelConfig.enableMapMove = false;
            go("ext&num=1000&l=10&uid=" + c, 
            function(v) {
                if (i.hashCode != ModelMgr.mainModel.hashCode) {
                    return
                }
                modelConfig.enableMapMove = true;
                if (v.content && v.content.geo) {
                    var m = parseGeo(v.content.geo);
                    var w = 0;
                    if (v.content.city_type == CITY_TYPE_PROV) {
                        w = AREA_TYPE_PROV
                    }
                    if (v.content.city_type == CITY_TYPE_DIST) {
                        w = AREA_TYPE_DIST
                    }
                    var u = m.points;
                    if (typeof u == "string") {
                        if (i.type == "province") {
                            addArea(u, w, 500)
                        } else {
                            addArea(u, w)
                        }
                    } else {
                        for (var n = 0, a = u.length; n < a; n++) {
                            if (!u[n]) {
                                continue
                            }
                            if (i.type == "province") {
                                if (i.json.content.code == AID["福建"] || i.json.content.code == AID["浙江"]) {
                                    addArea(u[n], w)
                                } else {
                                    addArea(u[n], w, 300)
                                }
                            } else {
                                addArea(u[n], w)
                            }
                        }
                    }
                    var o = m.bound.split(";");
                    var q = new Array();
                    var r = o[0].split(",");
                    var p = o[1].split(",");
                    q.push(new BMap.Point(r[0], r[1]));
                    q.push(new BMap.Point(p[0], p[1]));
                    modelConfig.enableMapMove = false;
                    if (window.mapMoveTimer) {
                        clearTimeout(window.mapMoveTimer)
                    }
                    window.mapMoveTimer = setTimeout(function() {
                        modelConfig.enableMapMove = true
                    },
                    4000);
                    if (i.cinfo._maplevel != null && i.cinfo._centerPoint != null) {
                        map.centerAndZoom(i.cinfo._centerPoint, i.cinfo._maplevel)
                    } else {
                        if (i.type == "area") {
                            map.getBestMap(q);
                            map.getBestMap(q)
                        }
                    }
                }
            })
        }
    },
    selCity: function(b) {
        if (b.getAttribute("name") == null || b.getAttribute("name") == "") {
            var a = b.innerHTML
        } else {
            var a = b.name
        }
        go("cur&curtp=0&wd=" + encodeURIComponent(a), {
            cinfo: {
                cityInit: 1
            }
        })
    },
    setMap: function() {
        if (this.cinfo._maplevel != null && this.cinfo._centerPoint != null) {
            map.centerAndZoom(this.cinfo._centerPoint, this.cinfo._maplevel)
        } else {
            var b = modelConfig.level[this.type];
            if (this.json.content.level) {
                b = parseInt(this.json.content.level)
            }
            if (this.type == "country") {
                b = 4
            }
            var a = geoToPoint(this.json.content.geo);
            map.centerAndZoom(a, b)
        }
    },
    setCity: function(d) {
        var l = this.json;
        this.type = "city";
        var g = l.content;
        if (g && g.error == 0) {
            return "未查找到相关数据！"
        }
        d = d.replace(/#cname#/gi, g.cname);
        d = d.replace(/#tips#/gi, l.result.wd);
        if (this.cinfo.startCity) {
            d = d.replace(/#search_city#/gi, this.cinfo.startCity.name);
            d = d.replace(/#city_code#/gi, this.cinfo.startCity.code)
        }
        if (g.sample && g.sample.poi) {
            d = d.replace(/#sample_poi#/gi, g.sample.poi)
        } else {
            d = d.replace(/#sample_poi_none#/gi, "none")
        }
        if (g.sample && g.sample.route) {
            d = d.replace(/#sample_route#/gi, g.sample.route)
        } else {
            d = d.replace(/#sample_route_none#/gi, "none")
        }
        if (!l.current_city || l.current_city.sup_bus == 1) {
            d = d.replace(/#sample_route_info#/gi, "找公交换乘或驾车路线？您可以输入：");
            d = d.replace(/#function#/gi, "searchWord")
        } else {
            d = d.replace(/#sample_route_info#/gi, "找驾车路线？您可以输入：");
            d = d.replace(/#function#/gi, "searchBus")
        }
        var k = "";
        if (l.weather) {
            k = this.setWeather(l.weather)
        }
        d = d.replace("#weather#", k);
        if ((l.content && l.content.code && modelConfig.defalutCityCode == l.content.code) || (this.cinfo.defCity != null && this.cinfo.defCity == "setDef")) {
            d = d.replace("#setCity_none#", "none")
        }
        var h = [];
        var f = false;
        if (g.sample && g.sample.other) {
            f = g.sample.other
        }
        if (f) {
            for (var c = 0; c < f.length; c++) {
                var b = f[c];
                for (var a = 0; a < b.length; a++) {
                    if (!b[a].name || b[a].name == "" || !b[a].id) {
                        continue
                    }
                    h.push('<a href="javascript:void(0)" onclick="Instance(\'' + this.hashCode + "').searchWord(this)\">" + b[a].name + "</a>&nbsp;&nbsp;")
                }
                h.push("<br/>")
            }
        }
        if (h.length == 0) {
            d = d.replace("#none#", "none")
        }
        d = d.replace("#sample_other#", h.join(""));
        return d
    },
    setProvince: function() {
        this.type = "province";
        var f = this.provinceHtml();
        var d = this.json;
        f = f.replace(/#province_name#/gi, d.content.cname);
        f = f.replace(/#cur_kw#/gi, d.result.wd);
        var g = d.content.province;
        var h = "";
        if (g != null) {
            for (var c = 0; c < g.length; c++) {
                var b = g[c];
                var a = Math.ceil(strB(b) / 10) * 62;
                h += '<li style="width:' + a + 'px"><a href="javascript:void(0)" class="switchCity" onclick="go(\'cur&curtp=1&wd=' + encodeURIComponent(b) + "',{cinfo:{cityInit:1}})\">" + b + "</a></li>"
            }
        } else {
            f = f.replace(/#none#/gi, "none")
        }
        if (this.cinfo.cityInit == 1 || d.result.wd == null) {
            f = f.replace(/#searchCity_none#/gi, "none")
        }
        if (this.cinfo.startCity) {
            f = f.replace(/#search_city#/gi, this.cinfo.startCity.name);
            f = f.replace(/#city_code#/gi, this.cinfo.startCity.code)
        }
        f = f.replace(/#city_list#/gi, h);
        return f
    },
    provinceHtml: function() {
        var a = '<table width="260" style="margin:10px;display:inline" cellspacing="0" cellpadding="0" border="0" align="left">					<tr>						<td height="25" valign="top"><strong style="font-size:14px;line-height:17px">#province_name#</strong></td>					</tr>					<tr>						<td>							<span class="f13" style="display:#none#">百度地图搜索当前支持“<font color="#c60a00">#province_name#</font>”以下城市：</span>						</td>					</tr>					<tr>						<td class="city_list">							<ul>#city_list#</ul>						</td>					</tr>          <tr>						<td>							<br /><p id="searchCity_' + this.hashCode + '"" style="display:#searchCity_none#">您是否要<a href="javascript:void(0)" onclick="cnameSearch(\'#cur_kw#\',\'#city_code#\')">在<b>#search_city#</b>找名称中含有"<b>#cur_kw#</b>"的地点</a></p>						</td>					</tr>				</table>';
        return a
    },
    setCountry: function() {
        this.type = "country";
        var a = this.countryHtml();
        a = a.replace(/#city_search#/gi, 'href="javascript:void(0)" onclick="Instance(\'' + this.hashCode + "').selCity(this)\"");
        a = a.replace(/#search_word#/gi, 'href="javascript:void(0)" onclick="Instance(\'' + this.hashCode + "').searchWord(this)\"");
        return a
    },
    countryHtml: function() {
        var c = ['<div class="mapinfo_con country">'];
        c.push("<b>热点城市：</b>");
        c.push('<table style="width:240px;margin-left:10px;table-layout:fixed"><tr>');
        c.push('<td style="width:44px"><a #city_search#>北京</a></td>');
        c.push('<td style="width:44px"><a #city_search#>上海</a></td>');
        c.push('<td style="width:44px"><a #city_search#>广州</a></td>');
        c.push('<td style="width:44px"><a #city_search#>深圳</a></td>');
        c.push('<td style="width:44px"><a #city_search#>成都</a></td>');
        c.push("</tr><table>");
        c.push("<b>全国：</b>");
        var f = ["北京", "上海", "天津", "重庆", ""];
        var g = ["安徽", "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "四川", "西藏", "新疆", "云南", "浙江"];
        var d = ["香港", "澳门", "台湾", "", ""];
        c.push('<table style="width:240px;margin-left:10px;line-height:14px;margin-bottom:-1px;table-layout:fixed">');
        for (var b = 0, a = f.length; b < a; b++) {
            if (b % 5 == 0) {
                c.push("<tr>")
            }
            if (f[b] == "") {
                c.push('<td style="width:44px"> </td>');
                continue
            }
            c.push('<td style="width:44px"><a #city_search#>' + f[b] + "</a></td>");
            if (b % 5 == 4) {
                c.push("</tr>")
            }
        }
        c.push("</table>");
        c.push('<table style="width:240px;margin-left:10px;line-height:14px;margin-bottom:-1px;table-layout:fixed">');
        for (var b = 0, a = g.length; b < a; b++) {
            if (b % 5 == 0) {
                c.push("<tr>")
            }
            if (g[b] == "吉林") {
                c.push('<td style="width:44px"><a #city_search# name="吉林省">' + g[b] + "</a></td>")
            } else {
                c.push('<td style="width:44px"><a #city_search#>' + g[b] + "</a></td>")
            }
            if (b % 5 == 4) {
                c.push("</tr>")
            }
        }
        c.push("</table>");
        c.push('<table style="width:240px;margin-left:10px;line-height:14px;margin-bottom:8px;table-layout:fixed">');
        for (var b = 0, a = d.length; b < a; b++) {
            if (b == 0) {
                c.push("<tr>")
            }
            if (d[b] == "") {
                c.push('<td style="width:44px"> </td>');
                continue
            }
            if (d[b] == "台湾") {
                c.push('<td style="width:44px"><a href="javascript:void(0)" onclick="go(\'s&wd=' + encodeURIComponent("台湾") + "')\">台湾</a></td>")
            } else {
                c.push('<td style="width:44px"><a #city_search#>' + d[b] + "</a></td>")
            }
            if (b == a - 1) {
                c.push("</tr>")
            }
        }
        c.push("</table>");
        c.push("<b>搜索示例：</b>");
        c.push('<p style="padding-left:12px">找建筑、餐厅、旅游景点？您可以尝试：');
        c.push('<span style="padding-left:0">"<a #search_word#>中关村大厦</a>"<br>"<a #search_word#>广州 中餐馆</a>"</span>');
        c.push("</p>");
        c.push('<p style="padding-left:12px">要找公交换乘或驾车路线？您可以直接输入“从……到……” 进行搜索，例如：');
        c.push('<span style="padding-left:0">"<a #search_word#>从中关村到天安门</a>"<br>"<a #search_word#>从世界之窗到地王大厦</a>"</span>');
        c.push("</p>");
        c.push('<div id="setDefCity_' + this.hashCode + '"></div>');
        c.push("</div>");
        return c.join("")
    },
    setArea: function() {
        this.type = "area";
        var c = this.json;
        var b = this.areaHtml();
        var a = c.content.cname;
        b = b.replace(/#cname#/gi, a);
        b = b.replace(/#cur_kw#/gi, c.result.wd);
        var d = "";
        if (c.weather) {
            d = this.setWeather(c.weather)
        }
        b = b.replace(/#weather#/gi, d);
        if ((a.indexOf("县") == -1) || (c.content && c.content.code && modelConfig.defalutCityCode == c.content.code) || (this.cinfo.defCity != null && this.cinfo.defCity == "setDef")) {
            b = b.replace("#setCity_none#", "none")
        }
        if ((c.result && c.result.jump_back != 1) || this.cinfo.cityInit == 1 || c.result.wd == null) {
            b = b.replace(/#searchCity_none#/gi, "none")
        }
        if (this.cinfo.startCity) {
            b = b.replace(/#search_city#/gi, this.cinfo.startCity.name);
            b = b.replace(/#city_code#/gi, this.cinfo.startCity.code)
        }
        return b
    },
    areaHtml: function() {
        var a = '<div class="mapinfo_con" style="display:#setCity_none#;">						<div>							<button class="city_close" onclick="this.parentNode.style.display=\'none\'"></button>							<p style="background:#e4ebf8;padding:5px">								已切换至<b>#cname#</b>，您可将其<nobr><a href="javascript:void(0)" title="如设置成功，您下次访问时将直接进入#cname#" onclick="Instance(\'' + this.hashCode + '\').setDefCity(\'#cname#\',this, 1)">设为默认城市</a></nobr>							</p>						</div>					</div>					<div style="padding:0 10px;line-height: 140%;" id="baike_' + this.hashCode + '">							<div style="border-bottom: 1px solid rgb(207, 207, 207); height: 28px; line-height: 28px; font-size: 14px; font-weight: bold; margin: 5px 0;">								<strong style="font-size: 14px;">#cname#</strong>							</div>					</div>					<p id="searchCity_' + this.hashCode + '"" style="display:#searchCity_none#;padding:10px">您是否要<a href="javascript:void(0)" onclick="cnameSearch(\'#cur_kw#\',\'#city_code#\')">在<b>#search_city#</b>找名称中含有"<b>#cur_kw#</b>"的地点</a></p>					<div id="setDefCity_' + this.hashCode + '" style="padding: 0 0 10px 10px"></div>					<div style="padding:0 10px">#weather#</div>';
        return a
    },
    setDefCity: function(b, d, f) {
        var c = this;
        var a = b;
        f = f || 0;
        go("def&deftp=" + f + "&wd=" + encodeURIComponent(a), 
        function(g) {
            if (g.content != null && g.content.error != null && g.content.error == 1) {
                if (c.json && c.json.content && c.json.content.code) {
                    modelConfig.defalutCityCode = c.json.content.code;
                    d.parentNode.parentNode.innerHTML = "已设置成功！"
                } else {
                    d.parentNode.parentNode.innerHTML = "默认城市设置失败"
                }
            } else {
                d.parentNode.parentNode.innerHTML = "默认城市设置失败"
            }
        })
    },
    setAsDefCityHtml: function() {
        var a = Fe.G("setDefCity_" + this.hashCode);
        if (a) {
            this.setDefHtml(0);
            a.style.display = ""
        }
    },
    setDefHtml: function(d) {
        var f = this;
        var c = new Array();
        c[0] = '<font style="vertical-align:-2px"><b>默认城市：</b>' + this.json.content.cname + '&nbsp; <a href="javascript:void(0)" onclick="Instance(\'' + this.hashCode + "').setDefHtml(1)\">修改</a></font>";
        c[1] = "<form onsubmit=\"Instance('" + this.hashCode + '\').updateDefCity();return false">						<b style="*vertical-align:4px">默认城市：</b>						<input type="text" style="width:70px" value="' + this.json.content.cname + '" id="defCityWd_' + this.hashCode + '"/>						<input type="submit" style="padding:0 2px" value="确定"/>						<input type="button" style="padding:0 2px" value="取消" onclick="Instance(\'' + this.hashCode + '\').setDefHtml(0)"/>						<div style="color:#d81221;text-indent:70px" id="error_info_' + this.hashCode + '"></div>					</form>';
        var b = Fe.G("setDefCity_" + this.hashCode);
        b.innerHTML = c[d];
        var a = Fe.G("defCityWd_" + this.hashCode);
        if (a) {
            setTimeout(function() {
                try {
                    if (window.city_sg2) {
                        city_sg2.disposeSug()
                    }
                    var h = Fe.G("defCityWd_" + f.hashCode).value;
                    window.city_sg2 = new bdMapSuggest({
                        inputid: "defCityWd_" + f.hashCode,
                        qType: 1,
                        closeB: 1
                    });
                    city_sg2.setValue(h);
                    a.focus();
                    a.select()
                } catch(g) {}
            },
            100);
            return
        }
    },
    updateDefCity: function() {
        var a = Fe.G("defCityWd_" + this.hashCode);
        if (a.value == "") {
            Fe.G("error_info_" + this.hashCode).innerHTML = "请输入正确的城市名";
            a.focus();
            return
        } else {
            var b = this;
            go("def&deftp=0&wd=" + encodeURIComponent(a.value), 
            function(c) {
                if (c.content != null && c.content.error != null && c.content.error == 1) {
                    if (c.result && c.result.wd != null) {
                        var d = encodeURIComponent(c.result.wd);
                        go("cur&wd=" + d, {
                            cinfo: {
                                defCity: "setDef",
                                setDefCity: true
                            }
                        })
                    } else {
                        Fe.G("error_info_" + b.hashCode).innerHTML = "请输入正确的城市名"
                    }
                } else {
                    Fe.G("error_info_" + b.hashCode).innerHTML = "请输入正确的城市名"
                }
            })
        }
    },
    delDefCity: function() {
        var a = this;
        go("def&wd=" + encodeURIComponent("全国"), 
        function(b) {
            a.setDefHtml(0)
        })
    },
    searchWord: function(c) {
        if (typeof(c) == "object") {
            var b = encodeURIComponent(c.innerHTML)
        } else {
            var b = encodeURIComponent(c)
        }
        var a = this.curCity.code;
        if (a) {
            go("s&wd=" + b + "&c=" + a)
        } else {
            go("s&wd=" + b)
        }
    },
    searchBus: function(c) {
        var b = this.json.content.code;
        var a = c.innerHTML.replace("从", "").split("到");
        go("nav&c=" + b + "&sy=0&sc=" + b + "&ec=" + b + "&sn=2$$$$$$" + encodeURIComponent(a[0]) + "$$$$$$&en=2$$$$$$" + encodeURIComponent(a[1]) + "$$$$$$")
    },
    setBaike: function() {
        var d = Fe.G("baike_" + this.hashCode);
        if (d != null) {
            var b = this.json.content.gbk_name;
            if (b == null) {
                return
            }
            b = b.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");
            var a = this.json.content.baike;
            if (a != 1) {
                return
            }
            var c = function() {
                if (typeof(baikeRes) != "undefined" && baikeRes.list[0].abs != null) {
                    var f = ['<div style="height:28px;line-height:28px;font-size:14px;font-weight:bold;border-bottom:1px solid #cfcfcf;margin:5px 0">'];
                    f.push('<strong style="font-size:14px">' + baikeRes.keyword + "</strong></div>");
                    f.push('<font style="color:#666">' + baikeRes.list[0].abs.replace(/<[^>].*?>/g, "") + "</font><div>");
                    f.push('<div style="text-align:right">来自 <a href="' + baikeRes.list[0].url + '" target="_blank">百度百科</a><div>');
                    d.innerHTML = f.join("")
                }
            };
            scriptRequest("http://baike.baidu.com/w?ct=17&lm=31&tn=baiduFinance&pn=0&rn=10&ss=map&word=" + b, c, "baike_info", "gb2312")
        }
    },
    setWeather: function(data) {
        function leftB(str, len) {
            var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
            return str.slice(0, s.slice(0, len).replace(/\*\*/g, " ").replace(/\*/g, "").length)
        }
        function lenB(str) {
            return str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**").length
        }
        try {
            var str = '<strong>#city#天气预报</strong>			<div style="height:70px;width:260px;color:#333;margin-top:3px">				<div style="width:120px;float:left;height:65px">					<strong>今天&nbsp; &nbsp; #temp1#</strong><br/>					<div style="padding-top:4px"><img src="#pic11#" style="width:38px;height:38px;float:left;margin:0 6px 0 0"/>					<span title="#weather1#" alt="#weather1#">#weather_str1#</span><br/>#wind1#</div>				</div>				<div style="width:130px;float:left;height:65px;border-left:1px solid #e1e1e1;padding-left:6px">					明天&nbsp; &nbsp; #temp2#<br/>					<div style="padding-top:4px"><img src="#pic21#" style="width:38px;height:38px;float:left;margin:0 6px 0 0"/>					<span title="#weather2#" alt="#weather2#">#weather_str2#</span><br/>#wind2#</div>				</div>			</div>			<div style="color:#666">以上信息由<a href="#url#"  style="color:#666" target="_blank">中国气象局</a>提供</div>';
            eval("var json=" + data);
            str = str.replace("#url#", json.url);
            str = str.replace("#wind1#", json.wind1 ? json.wind1: "");
            str = str.replace(/#weather1#/gi, json.weather1 ? json.weather1: "");
            str = str.replace("#temp1#", json.temp1 ? json.temp1: "");
            str = str.replace("#wind2#", json.wind2);
            str = str.replace("#weather2#", json.weather2);
            str = str.replace("#temp2#", json.temp2);
            var wStr1 = json.weather1;
            if (lenB(wStr1) > 12) {
                str = str.replace("#weather_str1#", (leftB(wStr1, 10) + "..."))
            } else {
                str = str.replace("#weather_str1#", wStr1)
            }
            var wStr2 = json.weather2;
            if (lenB(wStr2) > 12) {
                str = str.replace("#weather_str2#", (leftB(wStr2, 10) + "..."))
            } else {
                str = str.replace("#weather_str2#", wStr2)
            }
            var hours = new Date().getHours();
            if (hours > 5 && hours < 18) {
                str = str.replace("#pic11#", json.pic11)
            } else {
                str = str.replace("#pic11#", json.pic12)
            }
            str = str.replace("#pic21#", json.pic21);
            str = str.replace("#city#", this.json.content.cname);
            return str
        } catch(e) {
            return ""
        }
    },
    setSpecial: function(c) {
        var b = this.json.special;
        if (b == null || b.data == null) {
            return c
        }
        for (var a in b.data) {
            if (b.data[a] != null && b.data[a] != "") {
                c = c.replace("#special_" + a + "#", "<div>" + b.data[a] + "</div>")
            }
        }
        return c
    }
});
ModelMgr.register("NavQuery", '<div class="mapinfo_con">			 <div class="drive">				请输入起点和终点，如：				<form onsubmit="Instance(\'#hashCode#\').submit(this);return false">				<dl>					<dt class="which_1">						<span class="city"><input id="scity" name="scity" type="text" value="#startCity#" /></span>						<span class="addr"><a href="javascript:void(0)" onclick="Instance(\'#hashCode#\').setAddr(this,0)">添加具体地点</a></span>					</dt>				</dl>				<dl>					<dt class="which_2">						<span class="city"><input id="ecity" name="ecity" type="text" value="#endCity#" /></span>						<span class="addr"><a href="javascript:void(0)"  onclick="Instance(\'#hashCode#\').setAddr(this,1)">添加具体地点</a></span>					</dt>				</dl>			 <div class="subm"><input type="submit"  value="搜索"/></div>			 </form>			</div>		 </div>');
function NavQuery() {
    Fe.BaseClass.call(this)
}
Fe.extend(NavQuery.prototype, {
    render: function(b, a) {
        b = b.replace(/#startCity#/gi, this.startCity);
        b = b.replace(/#endCity#/gi, this.endCity);
        return b
    },
    initialize: function() {
        this.scityid = 0;
        this.ecityid = 0;
        this.sg1 = new bdMapSuggest({
            inputid: "scity",
            closeB: 1,
            qType: 1
        });
        this.sg2 = new bdMapSuggest({
            inputid: "ecity",
            closeB: 1,
            qType: 1
        });
        this.sg3 = new bdMapSuggest({
            inputid: "saddr",
            cityid: this.scityid,
            closeB: 1,
            qType: 0
        });
        this.sg4 = new bdMapSuggest({
            inputid: "eaddr",
            cityid: this.ecityid,
            closeB: 1,
            qType: 0
        })
    },
    setAddr: function(d, b) {
        var c = d.parentNode;
        var a = b == 0 ? "saddr": "eaddr";
        c.innerHTML = "<input id=" + a + ' name="' + a + '" type="text" value="" />'
    },
    submit: function(c) {
        var b = trim(c.scity.value);
        var f = trim(c.ecity.value);
        var d = "",
        a = "";
        if (c.saddr) {
            d = trim(c.saddr.value)
        }
        if (c.eaddr) {
            a = trim(c.eaddr.value)
        }
        if (b == "") {
            c.scity.focus();
            alert("请输入起点城市名!");
            return false
        } else {
            if (f == "") {
                c.ecity.focus();
                alert("请输入终点城市名!");
                return false
            }
        }
        go("nav&c=" + modelConfig.cityCode + "&sy=1&drag=0&sn=2$$$$$$" + encodeURIComponent(b + " " + d) + "$$$$$$&en=2$$$$$$" + encodeURIComponent(f + " " + a) + "$$$$$$")
    }
});
var fullScCtrl = new BMap.Control();
fullScCtrl.initialize = function(d) {
    BMap.Control.prototype.initialize.call(this, d);
    BMap.Control.prototype._render.call(this);
    d.fullScreenMode = false;
    this.elem2BHidden = [Fe.G("header"), Fe.G("search"), Fe.G("tools"), Fe.G("MapInfo"), Fe.G("shad")];
    var b = d.container;
    var f = this._container;
    var a = this;
    f.id = "fullSc_" + this.hashCode;
    f.title = "进入全屏状态";
    f.className = "map_ctrl";
    f.style.width = "51px";
    f.style.backgroundPosition = "0 -309px";
    f.style.zIndex = "800";
    f.onmouseover = function() {
        if (d.fullScreenMode != true) {
            f.style.backgroundPosition = "0 -329px";
            f.style.width = "51px"
        } else {
            f.style.backgroundPosition = "-51px -329px";
            f.style.width = "75px"
        }
    };
    f.onmouseout = function() {
        if (d.fullScreenMode != true) {
            f.style.backgroundPosition = "0 -309px";
            f.style.width = "51px"
        } else {
            f.style.backgroundPosition = "-51px -309px";
            f.style.width = "75px"
        }
    };
    Fe.on(f, "mousedown", 
    function(c) {
        c = c || window.event;
        if (c.button == 2) {
            return
        }
        if (Fe.Browser.ie && c.button != 1) {
            return
        }
        if (d.fullScreenMode == false) {
            f.style.backgroundPosition = "0 -349px";
            f.style.width = "51px"
        } else {
            f.style.backgroundPosition = "-51px -349px";
            f.style.width = "75px"
        }
        c.returnValue = false
    });
    f.onclick = function() {
        d.enableDoubleClickZoom(false);
        if (d.fullScreenMode == false) {
            a.toFullSrc()
        } else {
            a.returnFullSrc()
        }
        setTimeout(function() {
            d.enableDoubleClickZoom(true)
        },
        300)
    };
    Fe.on(document, "keydown", 
    function(c) {
        c = window.event || c;
        if (c.keyCode == 27 && d.fullScreenMode) {
            setTimeout(function() {
                a.returnFullSrc()
            },
            100)
        }
    })
};
fullScCtrl.remove = function() {
    var a = document.getElementById("fullSc" + this.hashCode);
    if (a && a.parentNode) {
        a.onclick = null;
        a.parentNode.removeChild(a)
    }
};
fullScCtrl.toFullSrc = function(b) {
    var g = map.container;
    var h = this._container;
    var f = this;
    for (var d = 0, a = f.elem2BHidden.length; d < a; d++) {
        f.elem2BHidden[d].style.display = "none"
    }
    g._mr = g.style.marginRight;
    g.style.marginRight = "0";
    g.style.marginTop = "0";
    g.style.height = getClientSize().height + "px";
    Fe.G("MapInfo").style.height = g.style.height;
    h.style.backgroundPosition = "-51px -309px";
    h.style.width = "75px";
    h.title = "退出全屏状态";
    map.fullScreenMode = true;
    addStat(STAT_FULL_SCREEN);
    for (var d = 0, a = map.temp.toolsElement.length; d < a; d++) {
        map.temp.toolsElement[d].style.right = parseInt(map.temp.toolsElement[d].style.right) + 24 + "px"
    }
    if (b == null) {
        historyUrl("isfullScreen=true");
        History.nowTpl = escape("isfullScreen=true")
    }
};
fullScCtrl.returnFullSrc = function(d) {
    var h = map.container;
    var j = this._container;
    var g = this;
    for (var f = 0, b = g.elem2BHidden.length; f < b; f++) {
        g.elem2BHidden[f].style.display = "block"
    }
    h.style.marginRight = h._mr || "280px";
    h.style.marginTop = "2px";
    h.style.height = getClientSize().height - 119 + "px";
    Fe.G("MapInfo").style.height = h.style.height;
    var a = 0;
    if (overviewCtrl) {
        a = parseInt(overviewCtrl.getDom().style.height)
    }
    Fe.G("shad_v").style.height = parseInt(h.style.height) - a + "px";
    j.style.backgroundPosition = "0 -309px";
    j.style.width = "51px";
    j.title = "进入全屏状态";
    for (var f = 0, b = map.temp.toolsElement.length; f < b; f++) {
        map.temp.toolsElement[f].style.right = parseInt(map.temp.toolsElement[f].style.right) - 24 + "px"
    }
    map.fullScreenMode = false;
    addStat(STAT_EXIT_FULL_SCREEN);
    if (d == null) {
        historyUrl("isfullScreen=false");
        History.nowTpl = escape("isfullScreen=false")
    }
};
fullScCtrl.setAnchor(BMap.ControlAnchor.ANCHOR_TOP_RIGHT);
fullScCtrl.setOffset(10, 10);
var searchInViewCtrl = new BMap.Control();
searchInViewCtrl.initialize = function(a) {
    BMap.Control.prototype.initialize.call(this, a);
    BMap.Control.prototype._render.call(this);
    this.isOpen = false;
    this.hasResult = false;
    this.curKw = "";
    this.minZoomLv = 14;
    this.listeners = [];
    this.resultCount = 50;
    this.reqObj = null;
    this.rightPos = 13;
    this.curSearchCPt = null;
    var b = this._container;
    b.id = "searchInView_" + this.hashCode;
    b.className = "map_ctrl";
    b.style.width = "85px";
    b.style.backgroundPosition = "-156px -249px";
    b.style.zIndex = "800";
    b.title = "在当前视野内进行搜索";
    this.bind()
};
searchInViewCtrl.bind = function() {
    var a = this;
    var b = a._container;
    b.onmouseover = function() {
        if (a.isOpen != true) {
            b.style.backgroundPosition = "-156px -269px"
        }
    };
    b.onmouseout = function() {
        if (a.isOpen != true) {
            b.style.backgroundPosition = "-156px -249px"
        }
    };
    Fe.on(b, "mousedown", 
    function(c) {
        c = c || window.event;
        if (c.button == 2) {
            return
        }
        if (Fe.Browser.ie && c.button != 1) {
            return
        }
        b.style.backgroundPosition = "-156px -289px";
        c.returnValue = false
    });
    b.onclick = function() {
        if (a.isOpen == false) {
            a.prepare()
        } else {
            a.exit()
        }
    };
    map.addEventListener("mapcontainerresize", 
    function() {
        if (!a.sivPop || a.sivPop && !a.sivPop.getDom()) {
            return
        }
        if (map.fullScreenMode) {
            a.sivPop.getDom().style.right = a.rightPos + "px";
            a.sivPop.getDom().style.top = "31px"
        } else {
            a.sivPop.getDom().style.right = a._getRightPos() + "px";
            a.sivPop.getDom().style.top = "33px"
        }
    })
};
searchInViewCtrl.remove = function() {
    var a = document.getElementById("searchInView" + this.hashCode);
    if (a && a.parentNode) {
        a.onclick = null;
        a.parentNode.removeChild(a)
    }
};
searchInViewCtrl._getRightPos = function() {
    if (Fe.G("MapInfo") && !isNaN(parseInt(Fe.G("MapInfo").style.width))) {
        var a = this.rightPos + parseInt(Fe.G("MapInfo").style.width);
        return (a > 0 ? a: 0)
    } else {
        return this.rightPos + 280
    }
};
searchInViewCtrl.setResult = function(a) {
    this.hasResult = !!a.hasResult;
    this.curKw = a.kw;
    this.curSearchCPt = a.cpt
};
searchInViewCtrl.checkNeed2Go = function() {
    if (!this.curKw) {
        return false
    }
    if (!this.curSearchCPt) {
        return false
    }
    if (map.zoomLevel < this.minZoomLv) {
        return false
    }
    var d = map.pointToPixel(this.curSearchCPt);
    var c = map.pointToPixel(map.centerPoint);
    var b = Math.abs(d.x - c.x);
    var a = Math.abs(d.y - c.y);
    if (b >= 0.3 * map.width || a >= 0.3 * map.height) {
        return true
    }
    return false
};
searchInViewCtrl.rego = function() {
    var b = map.getBounds();
    var bs = "(" + b.minX + "," + b.minY + ";" + b.maxX + "," + b.maxY + ")";
    if (this.curKw) {
        var url = window.location.pathname + modelConfig.DATA_URL + "bd&c=" + modelConfig.cityCode + "&format=1&ie=utf-8&pn=0&rn=" + this.resultCount + "&wd=" + encodeURIComponent(this.curKw) + "&ar=" + bs + "&b=" + bs + "&l=" + map.zoomLevel;
        if (this.reqObj) {
            this.reqObj.abort();
            this.reqObj = null
        }
        this.reqObj = getXhr();
        var me = this;
        this.reqObj.onreadystatechange = function() {
            if (map.zoomLevel < me.minZoomLv) {
                return
            }
            if (me.reqObj.readyState == 4 && me.reqObj.status == 200) {
                var json;
                try {
                    eval("json=" + me.reqObj.responseText)
                } catch(e) {
                    return
                }
                if (me.inViewHashCode && json) {
                    var inViewComponent = Instance(me.inViewHashCode);
                    if (inViewComponent) {
                        if (!inViewComponent.cinfo) {
                            inViewComponent.cinfo = {}
                        }
                        inViewComponent.cinfo.rego = true;
                        inViewComponent.cinfo.isPos = false;
                        me.sivPop.content.innerHTML = inViewComponent.render(null, json);
                        inViewComponent.initialize()
                    }
                }
            }
        };
        this.reqObj.open("GET", url + "&t=" + (new Date().getTime()), true);
        this.reqObj.send(null)
    }
};
searchInViewCtrl.exit = function() {
    var f = this;
    var g = f._container;
    if (f.sivPop) {
        f.sivPop.close();
        f.sivPop = null
    }
    if (f.hasResult) {
        map.closeInfoWindow();
        Instance(f.inViewHashCode).clearMarkers();
        f.hasResult = false
    }
    f.curKw = "";
    f.curSearchCPt = null;
    f.isOpen = false;
    if (g) {
        g.style.backgroundPosition = "-156px -249px";
        g.title = "在当前视野内进行搜索"
    }
    setInfoWndCollisions([], 1);
    if (f.listeners) {
        for (var d = 0, a = f.listeners.length; d < a; d++) {
            var b = f.listeners[d];
            if (b.obj.removeEventListener) {
                b.obj.removeEventListener(b.type, b.cbk)
            }
        }
    }
};
searchInViewCtrl.getResultCount = function() {
    return this.resultCount
};
searchInViewCtrl.isInUse = function() {
    return !! this.curKw
};
searchInViewCtrl.getPreModelName = function() {
    return this.preModel && this.preModel._className
};
searchInViewCtrl.getPreModel = function() {
    return this.preModel
};
searchInViewCtrl.prepare = function() {
    var f = this;
    var i = f._container;
    trafficExit();
    if (!f.sivPop) {
        f.sivPop = new Popup({
            title: "在屏幕范围内搜索",
            content: "",
            width: 229,
            addDom: "wrapper",
            close: function() {
                f.sivPop = null;
                f.exit()
            },
            clickClose: false
        });
        f.sivPop.render();
        if (map.fullScreenMode) {
            f.sivPop.getDom().style.right = f.rightPos + "px";
            f.sivPop.getDom().style.top = "31px"
        } else {
            f.sivPop.getDom().style.right = f._getRightPos() + "px";
            f.sivPop.getDom().style.top = "33px"
        }
        f.sivPop.getDom().style.zIndex = 1;
        f.sivPop.content.style.paddingLeft = "10px";
        searchInViewCtrl.sivPop = f.sivPop
    }
    f.sivPop.show();
    this.setPopupHeight();
    f.preModel = ModelMgr.mainModel;
    go("tpl:SearchInView", {
        dom: f.sivPop.content,
        cinfo: {
            isPos: true,
            container: f.sivPop.content,
            resultCount: f.resultCount
        }
    });
    f.isOpen = true;
    if (i) {
        i.style.backgroundPosition = "-156px -289px";
        i.title = "退出视野内搜索"
    }
    var b = function() {
        if (!f.sivPop) {
            return
        }
        if (map.zoomLevel < f.minZoomLv) {
            map.closeInfoWindow();
            Instance(f.inViewHashCode).clearMarkers();
            go("tpl:SearchInView", {
                dom: f.sivPop.content,
                cinfo: {
                    isPos: true,
                    container: f.sivPop.content,
                    resultCount: f.resultCount
                }
            })
        } else {
            if (f.curKw) {
                var c = Instance(f.inViewHashCode);
                if (c) {
                    f.sivPop.content.innerHTML = c.getResultHTML(f.curKw);
                    f.setPopupHeight(true)
                }
                f.rego()
            } else {
                go("tpl:SearchInView", {
                    dom: f.sivPop.content,
                    cinfo: {
                        isPos: true,
                        container: f.sivPop.content,
                        resultCount: f.resultCount
                    }
                })
            }
        }
    };
    var g = function() {
        if (!f.sivPop) {
            return
        }
        if (map.zoomLevel < f.minZoomLv) {
            map.closeInfoWindow();
            Instance(f.inViewHashCode).clearMarkers();
            go("tpl:SearchInView", {
                dom: f.sivPop.content,
                cinfo: {
                    isPos: true,
                    container: f.sivPop.content,
                    resultCount: f.resultCount
                }
            })
        } else {
            if (f.curKw) {
                var c = Instance(f.inViewHashCode);
                if (c) {
                    f.sivPop.content.innerHTML = c.getResultHTML(f.curKw);
                    f.setPopupHeight(true)
                }
                f.rego()
            } else {
                go("tpl:SearchInView", {
                    dom: f.sivPop.content,
                    cinfo: {
                        isPos: true,
                        container: f.sivPop.content,
                        resultCount: f.resultCount
                    }
                })
            }
        }
    };
    var h = function() {
        if (f.checkNeed2Go() == true) {
            f.rego()
        }
    };
    var d = function() {
        if (f.checkNeed2Go() == true) {
            f.rego()
        }
    };
    map.addEventListener("load", g);
    map.addEventListener("dragend", h);
    map.addEventListener("zoomend", b);
    map.addEventListener("moveend", d);
    f.listeners.push({
        obj: map,
        type: "load",
        cbk: g
    });
    f.listeners.push({
        obj: map,
        type: "dragend",
        cbk: h
    });
    f.listeners.push({
        obj: map,
        type: "zoomend",
        cbk: b
    });
    f.listeners.push({
        obj: map,
        type: "moveend",
        cbk: d
    });
    var a = function() {
        if (f._resizeTimer) {
            return
        }
        f._resizeTimer = setTimeout(function() {
            f.rego();
            f._resizeTimer = null
        },
        300)
    };
    map.addEventListener("mapcontainerresize", a);
    f.listeners.push({
        obj: map,
        type: "mapcontainerresize",
        cbk: a
    })
};
searchInViewCtrl.search = function(d) {
    this.prepare();
    var o = d.split("&");
    var c = map.zoomLevel;
    var a = map.centerPoint;
    for (var h = 0, g = o.length; h < g; h++) {
        if (o[h].indexOf("l=") == 0) {
            var n = o[h].substring(2);
            c = parseInt(n)
        }
        if (o[h].indexOf("ar=(") == 0) {
            var j = o[h].substring(4);
            var f = parseFloat(j.split(";")[0].split(",")[0]);
            var m = parseFloat(j.split(";")[0].split(",")[1]);
            var b = parseFloat(j.split(";")[1].split(",")[0]);
            var k = parseFloat(j.split(";")[1].split(",")[1])
        }
    }
    a = new BMap.Point((f + b) / 2, (m + k) / 2);
    map.setCenter(a);
    if (c < this.minZoomLv) {
        return
    }
    map.zoomTo(c);
    go(d, {
        dom: this.sivPop.content,
        cinfo: {
            reqData: true
        }
    })
};
searchInViewCtrl.setPopupHeight = function(b) {
    var c = 95;
    var a = 268;
    var d = 65;
    if (!this.sivPop) {
        return
    }
    if (b) {
        this.sivPop.setHeight(d);
        setInfoWndCollisions([245, 100], 1);
        return
    }
    if (map.zoomLevel < this.minZoomLv) {
        this.sivPop.setHeight(c);
        setInfoWndCollisions([245, 131], 1)
    } else {
        if (this.curKw == "") {
            this.sivPop.setHeight(a);
            setInfoWndCollisions([245, 305], 1)
        } else {
            this.sivPop.setHeight(d);
            setInfoWndCollisions([245, 100], 1)
        }
    }
};
searchInViewCtrl.hidePopup = function() {
    if (this.sivPop) {
        this.sivPop.hide()
    }
};
searchInViewCtrl.showPopup = function() {
    if (this.sivPop) {
        this.sivPop.show()
    }
};
searchInViewCtrl.setAnchor(BMap.ControlAnchor.ANCHOR_TOP_RIGHT);
searchInViewCtrl.setOffset(64, 10);
function selectCity(f, c) {
    if (window.temp.cityPop) {
        return
    }
    var d = {
        title: "城市列表",
        content: "",
        height: 353,
        width: 390,
        close: function() {
            delete window.temp.cityPop
        }
    };
    for (var b in c) {
        d[b] = c[b]
    }
    var a = window.temp.cityPop = new Popup(d);
    a.addConnectDom(f);
    a.render();
    a.hide();
    if (d && typeof d.right != "undefined") {
        a.getDom().style.right = d.right + "px"
    } else {
        if (d && typeof d.left != "undefined") {
            a.getDom().style.left = d.left + "px"
        } else {
            a.getDom().style.left = "6px"
        }
    }
    if (d && typeof d.top != "undefined") {
        a.getDom().style.top = d.top + "px"
    } else {
        if (d && typeof d.bottom != "undefined") {
            a.getDom().style.top = d.bottom + "px"
        } else {
            a.getDom().style.top = "117px"
        }
    }
    go("tpl:SelectCity", {
        dom: a.content,
        cinfo: c,
        onload: function() {
            a.show()
        }
    })
}
function navQuery() {
    go("tpl:NavQuery")
}
function lineQuery() {
    if (setBusInfo()) {
        go("tpl:LinesQuery")
    }
}
function setBusInfo() {
    if (modelConfig.supBus == 0) {
        if (modelConfig.cityType < 2 || modelConfig.cityCode == AID["全国"]) {
            Fe.G("supBus").innerHTML = "请选择您要查询的城市"
        } else {
            Fe.G("supBus").innerHTML = "抱歉，该城市不支持公交查询"
        }
        return false
    } else {
        Fe.G("supBus").innerHTML = "";
        return true
    }
}
function qSearch(h, g, b) {
    switch (g) {
    case "loc":
        h.word.value = h.word.value.replace(/[\uac00-\ud7a3]/g, "");
        if (h.word.value == "") {
            h.word.focus();
            return false
        }
        if (h.word.value == "从火星到地球") {
            return _showCE()
        }
        var i = modelConfig.cityCode || 1;
        var k = b || (Fe.G("PoiSearch") && Fe.G("PoiSearch")._wd2) || "";
        var j = k ? 1: 0;
        if (Fe.G("PoiSearch")) {
            Fe.G("PoiSearch")._wd2 = null
        }
        go("s&wd=" + encodeURIComponent(h.word.value) + "&c=" + i + "&src=0&wd2=" + encodeURIComponent(k) + "&sug=" + j);
        break;
    case "bt":
        h.word_from.value = h.word_from.value.replace(/[\uac00-\ud7a3]/g, "");
        h.word_to.value = h.word_to.value.replace(/[\uac00-\ud7a3]/g, "");
        if (h.word_from.value == "") {
            h.word_from.focus();
            return false
        }
        if (h.word_to.value == "") {
            h.word_to.focus();
            return false
        }
        if (h.word_from.value == "火星" && h.word_to.value == "地球") {
            return _showCE()
        }
        var a = "";
        var f = "";
        if (Fe.G("BusSearchSta")) {
            a = Fe.G("BusSearchSta")._wd2 || "";
            Fe.G("BusSearchSta")._wd2 = null
        }
        if (Fe.G("BusSearchEnd")) {
            f = Fe.G("BusSearchEnd")._wd2 || "";
            Fe.G("BusSearchEnd")._wd2 = null
        }
        var d = a ? 1: 0;
        var c = f ? 1: 0;
        if (setBusInfo()) {
            go("bt&c=" + modelConfig.cityCode + "&sn=2$$$$$$" + encodeURIComponent(h.word_from.value) + "$$" + d + "$$" + encodeURIComponent(a) + "$$&en=2$$$$$$" + encodeURIComponent(h.word_to.value) + "$$" + c + "$$" + encodeURIComponent(f) + "$$")
        }
        break;
    case "nav":
        h.word_from.value = h.word_from.value.replace(/[\uac00-\ud7a3]/g, "");
        h.word_to.value = h.word_to.value.replace(/[\uac00-\ud7a3]/g, "");
        if (h.word_from.value == "") {
            h.word_from.focus();
            return false
        }
        if (h.word_to.value == "") {
            h.word_to.focus();
            return false
        }
        if (h.word_from.value == "火星" && h.word_to.value == "地球") {
            return _showCE()
        }
        var a = "";
        var f = "";
        if (Fe.G("DriveSearchSta")) {
            a = Fe.G("DriveSearchSta")._wd2 || "";
            Fe.G("DriveSearchSta")._wd2 = null
        }
        if (Fe.G("DriveSearchEnd")) {
            f = Fe.G("DriveSearchEnd")._wd2 || "";
            Fe.G("DriveSearchEnd")._wd2 = null
        }
        var d = a ? 1: 0;
        var c = f ? 1: 0;
        go("nav&c=" + modelConfig.cityCode + "&sc=" + modelConfig.cityCode + "&ec=" + modelConfig.cityCode + "&sn=2$$$$$$" + encodeURIComponent(h.word_from.value) + "$$" + d + "$$" + encodeURIComponent(a) + "$$&en=2$$$$$$" + encodeURIComponent(h.word_to.value) + "$$" + c + "$$" + encodeURIComponent(f) + "$$");
        break
    }
}
function getLink(f) {
    closeOtherOps();
    if (getLink._open) {
        if (window.temp.linkPop) {
            window.temp.linkPop.close();
            delete window.temp.linkPop
        }
        getLink._open = false;
        return
    }
    addStat(STAT_GET_LINK);
    Fe.ac(Fe.G("link"), "selected");
    if (window.temp.linkPop) {
        return
    }
    var d = {
        title: "获取链接",
        content: "",
        height: 88,
        width: 390,
        close: function() {
            delete window.temp.linkPop;
            Fe.rc(Fe.G("link"), "selected");
            getLink._open = false
        }
    };
    var a = window.temp.linkPop = new Popup(d);
    a.addConnectDom(Fe.G("link"));
    a.render();
    if (map.container && map.container.style.marginRight == "390px") {
        a.getDom().style.right = "395px"
    } else {
        a.getDom().style.right = "285px"
    }
    a.getDom().style.top = "115px";
    var c = beforeEndHTML(a.content, '<div style="padding:7px 0 0 6px"></div>');
    var b = beforeEndHTML(c, '<span id="getLinkF" style="color:#6688cc;display:none;float:right;margin-right:8px">复制成功</span><span style="color:#999;padding-bottom:3px">您可将链接复制，保存或发送给他人。</span><input type="text" style="width:320px;margin-top:5px">');
    if (Fe.Browser.ie) {
        var h = beforeEndHTML(c, '<input type="button" style="margin-left:5px" value="复制"/>');
        h.onclick = function() {
            if (window.clipboardData) {
                window.clipboardData.clearData();
                window.clipboardData.setData("Text", b.value);
                if (Fe.G("getLinkF")) {
                    Fe.G("getLinkF").style.display = "inline"
                }
                setTimeout(function() {
                    if (Fe.G("getLinkF")) {
                        Fe.G("getLinkF").style.display = "none"
                    }
                },
                1000)
            } else {
                try {
                    Fe.copy(b.value);
                    if (Fe.G("getLinkF")) {
                        Fe.G("getLinkF").style.display = "inline"
                    }
                    setTimeout(function() {
                        if (Fe.G("getLinkF")) {
                            Fe.G("getLinkF").style.display = "none"
                        }
                    },
                    1000)
                } catch(i) {}
            }
        }
    } else {
        var g = CreateFlash("flashClipBoard", "img/clipboard.swf", 42, 21, "method=setFlashClipContent");
        var h = beforeEndHTML(c, '<div style="width:42px;height:21px;position:absolute;right:5px;top:45px">' + g + "</div>")
    }
    if (navigator.userAgent.indexOf("Safari") > -1) {
        h.style.top = "48px"
    }
    if (Fe.Browser.opera) {
        h.style.top = "50px"
    }
    b.value = Share.getLink();
    b.select();
    b.onmouseover = b.onmouseout = b.onmousedown = b.onmouseup = function() {
        this.select()
    };
    window.setFlashClipContent = function() {
        if (Fe.G("getLinkF")) {
            Fe.G("getLinkF").style.display = "inline"
        }
        setTimeout(function() {
            if (Fe.G("getLinkF")) {
                Fe.G("getLinkF").style.display = "none"
            }
        },
        1000);
        return b.value
    };
    getLink._open = true
}
function doMeasure() {
    endCaptureMap();
    var a = window;
    BMap.OperationMask.show(map);
    BMap.OperationMask.setCursor("url(" + distanceControl.getCursor() + "), crosshair");
    if (!doMeasure._initialized) {
        if (a.distanceControl) {
            a.distanceControl.addEventListener("drawstarted", 
            function() {
                Fe.ac(Fe.G("measure"), "selected")
            });
            a.distanceControl.addEventListener("drawended", 
            function() {
                Fe.rc(Fe.G("measure"), "selected")
            })
        }
        doMeasure._initialized = true
    }
    if (a.distanceControl) {
        if (!a.distanceControl._checked) {
            a.distanceControl.btnClick();
            addStat(STAT_DO_MEASURE)
        } else {
            closeMeasure()
        }
    }
}
function closeMeasure() {
    var a = window;
    if (a.distanceControl) {
        if (a.distanceControl._checked == true) {
            a.distanceControl.btnClick()
        }
        Fe.rc(Fe.G("measure"), "selected")
    }
}
function printMap() {
    closeOtherOps();
    if (!ModelMgr || !ModelMgr.mainModel) {
        return
    }
    switch (ModelMgr.mainModel._className) {
    case "PoiSearch":
        addStat(STAT_PRNT_POI);
        break;
    case "BusTrans":
        addStat(STAT_PRNT_BUS);
        break;
    case "NavTrans":
        addStat(STAT_PRNT_DRV);
        break;
    case "LinesQuery":
        addStat(STAT_PRNT_BUSQ);
        break;
    default:
        break
    }
    window.print()
}
function captureMap() {
    closeMeasure();
    if (!captureCtrl._initialized) {
        captureCtrl.initialize(map);
        captureCtrl._initialized = true
    }
    if (!captureCtrl._inUse) {
        captureCtrl.beginCapture();
        addStat(STAT_DO_CAPTURE)
    } else {
        captureCtrl.endCapture()
    }
}
function endCaptureMap() {
    if (captureCtrl._initialized) {
        captureCtrl.endCapture()
    }
}
var captureCtrl = new BMap.Control();
captureCtrl.initialize = function(b) {
    BMap.Control.prototype.initialize.call(this, b);
    this._opts = {
        lineStroke: 1,
        lineColor: "black",
        lineStyle: "solid",
        opacity: 0.05,
        fillColor: "#2319dc"
    };
    this.inUse = false;
    this.ctrlNeed2Hide = [overviewCtrl, searchInViewCtrl, fullScCtrl, stdMapCtrl, copyCtrl, scaleCtrl ];
    this.handlerCursors = ["n-resize", "e-resize", "s-resize", "w-resize", "nw-resize", "ne-resize", "se-resize", "sw-resize"];
    this._temp = {};
    this._handlers = [];
    this._bindFuncs = [];
    this.capSizePx = [0, 0];
    this.busStopMkrs = [];
    this.normMkrs = [];
    this.roundMkrs = [];
    this.destLbls = [];
    this.lbls = [];
    this.lines = [];
    this.areas = [];
    var a = this;
    Fe.on(document, "keydown", 
    function(c) {
        c = c || window.event;
        if (c.keyCode == 27) {
            a.endCapture()
        }
    })
};
captureCtrl.beginCapture = function() {
    this._hideCtrls();
    trafficExit();
    captureCtrl._inUse = true;
    Fe.ac(Fe.G("capture"), "selected");
    BMap.OperationMask.show(map);
    BMap.OperationMask.setCursor("url(img/crosshair.cur), crosshair");
    this.tipsLabel = tl = new BMap.Label("按住鼠标左键拖选截图区域<br />点击右键或按ESC键退出", {
        zIndex: 9000000,
        padding: 2,
        offset: [0, 0],
        borderColor: "#555",
        color: "#555",
        background: "#ffffe1"
    });
    map.addOverlay(tl);
    tl.getDom().zIndex = 9000000;
    tl.hide();
    var d = this;
    var f = function(h) {
        if (h && h.button == 2) {
            d.endCapture()
        }
        return preventDefault(h)
    };
    Fe.on(BMap.OperationMask.getDom(map), "mouseup", f);
    this._bindFuncs.push({
        element: BMap.OperationMask.getDom(map),
        type: "mouseup",
        handler: f
    });
    var c = function(i) {
        i = i || window.event;
        var h = i.target || i.srcElement;
        if (h !== BMap.OperationMask.getDom(map)) {
            tl.hide();
            return
        }
        tl.show();
        var j = BMap.OperationMask.getDrawPoint(i, false, {
            x: 8,
            y: 8
        });
        tl.setPoint(j)
    };
    Fe.on(document, "mousemove", c);
    this._bindFuncs.push({
        element: document,
        type: "mousemove",
        handler: c
    });
    var b = function(i) {
        i = window.event || i;
        if (i.button != 0 && !Fe.Browser.ie || Fe.Browser.ie && i.button != 1) {
            return
        }
        if (BMap.OperationMask.getDom(map).setCapture) {
            BMap.OperationMask.getDom(map).setCapture()
        }
        if (d.tipsLabel) {
            d.tipsLabel.remove()
        }
        if (Fe.G("cap_size")) {
            Fe.G("cap_size").parentNode.removeChild(Fe.G("cap_size"))
        }
        var h = Fe.G("cap_btn_container");
        if (h) {
            h.parentNode.removeChild(h)
        }
        if (d._fDiv) {
            d._fDiv.parentNode.removeChild(d._fDiv);
            d._fDiv = null
        }
        Fe.on(document, "mousemove", a);
        Fe.on(document, "mouseup", g);
        d._bindFuncs.push({
            element: document,
            type: "mousemove",
            handler: a
        });
        d._bindFuncs.push({
            element: document,
            type: "mouseup",
            handler: g
        });
        var i = window.event || i;
        d._temp.mx = i.layerX || i.offsetX || 0;
        d._temp.my = i.layerY || i.offsetY || 0;
        d._temp.mx = d._temp.mx;
        d._temp.my = d._temp.my;
        d._temp.ix = i.pageX || i.clientX || 0;
        d._temp.iy = i.pageY || i.clientY || 0;
        BMap.OperationMask.getDom(map).insertAdjacentHTML("beforeBegin", d._generateHTML());
        d._fDiv = BMap.OperationMask.getDom(d._map).previousSibling;
        d._fDiv.style.width = "0";
        d._fDiv.style.height = "0";
        d._fDiv.style.left = d._temp.mx + "px";
        d._fDiv.style.top = d._temp.my + "px";
        d._handlers.length = 0;
        d._handlers.push(Fe.G("cap_h_t"));
        d._handlers.push(Fe.G("cap_h_r"));
        d._handlers.push(Fe.G("cap_h_b"));
        d._handlers.push(Fe.G("cap_h_l"));
        d._handlers.push(Fe.G("cap_h_tl"));
        d._handlers.push(Fe.G("cap_h_tr"));
        d._handlers.push(Fe.G("cap_h_br"));
        d._handlers.push(Fe.G("cap_h_bl"));
        stopBubble(i);
        return preventDefault(i)
    };
    var a = function(l) {
        l = window.event || l;
        var j = l.pageX || l.clientX || 0;
        var h = l.pageY || l.clientY || 0;
        var k = j - d._temp.ix;
        var i = h - d._temp.iy;
        if (!d._fDiv) {
            return
        }
        d._fDiv.style.width = Math.abs(k) + "px";
        d._fDiv.style.height = Math.abs(i) + "px";
        if (k >= 0) {
            d._fDiv.style.right = "auto";
            d._fDiv.style.left = d._temp.mx + "px";
            if (d._temp.mx + k > map.width - 9) {
                d._fDiv.style.width = map.width - d._temp.mx - 9 + "px"
            }
        } else {
            d._fDiv.style.left = "auto";
            d._fDiv.style.right = map.width - d._temp.mx - 1 + "px";
            if (d._temp.mx + k < 5) {
                d._fDiv.style.width = d._temp.mx - 5 + "px"
            }
        }
        if (i >= 0) {
            d._fDiv.style.bottom = "auto";
            d._fDiv.style.top = d._temp.my + "px";
            if (d._temp.my + i > map.height - 5) {
                d._fDiv.style.height = map.height - d._temp.my - 5 + "px"
            }
        } else {
            d._fDiv.style.top = "auto";
            d._fDiv.style.bottom = map.height - d._temp.my - 1 + "px";
            if (d._temp.my + i < 9) {
                d._fDiv.style.height = d._temp.my - 9 + "px"
            }
        }
        d._updateCapSize();
        d._updateHandlersPosition();
        stopBubble(l);
        return preventDefault(l)
    };
    var g = function(u) {
        u = window.event || u;
        if (u.button != 0 && !Fe.Browser.ie || Fe.Browser.ie && u.button != 1) {
            return
        }
        Fe.un(document, "mousemove", a);
        Fe.un(document, "mouseup", g);
        Fe.un(BMap.OperationMask.getDom(map), "mousedown", b);
        if (BMap.OperationMask.getDom(map).releaseCapture) {
            BMap.OperationMask.getDom(map).releaseCapture()
        }
        if (!d._fDiv) {
            return
        }
        if (d._fDiv && parseInt(d._fDiv.style.width) == 0) {
            d._fDiv.style.width = "1px"
        }
        if (d._fDiv && parseInt(d._fDiv.style.height) == 0) {
            d._fDiv.style.height = "1px"
        }
        d._updateCapSize();
        d.capSizePx = [parseInt(d._fDiv.style.width), parseInt(d._fDiv.style.height)];
        d._unifyPos();
        var h = function(i) {
            i = i || window.event;
            if (i.button == 2) {
                return
            }
            if (Fe.Browser.ie && i.button != 1) {
                return
            }
            if (d._fDiv.setCapture) {
                d._fDiv.setCapture()
            }
            Fe.on(document, "mousemove", r);
            Fe.on(document, "mouseup", j);
            h._initX = parseInt(d._fDiv.style.left);
            h._initY = parseInt(d._fDiv.style.top);
            if (isNaN(h._initX)) {
                h._initX = map.width - parseInt(d._fDiv.style.right) - parseInt(d._fDiv.style.width)
            }
            if (isNaN(h._initY)) {
                h._initY = map.height - parseInt(d._fDiv.style.bottom) - parseInt(d._fDiv.style.height)
            }
            h._x1 = i.pageX || i.clientX || 0;
            h._y1 = i.pageY || i.clientY || 0;
            i.returnValue = false
        };
        var r = function(A) {
            A = A || window.event;
            var x = A.pageX || A.clientX || 0;
            var l = A.pageY || A.clientY || 0;
            var z = x - h._x1;
            var w = l - h._y1;
            if (!d._fDiv) {
                return
            }
            if (h._initX + z >= 4 && h._initX + z + parseInt(d._fDiv.style.width) + 9 <= map.width) {
                d._fDiv.style.left = h._initX + z + "px"
            } else {
                if (h._initX + z < 4) {
                    d._fDiv.style.left = "3px"
                } else {
                    d._fDiv.style.left = map.width - parseInt(d._fDiv.style.width) - 9 + "px"
                }
            }
            if (h._initY + w >= 9 && h._initY + w + parseInt(d._fDiv.style.height) + 4 <= map.height) {
                d._fDiv.style.top = h._initY + w + "px"
            } else {
                if (h._initY + w < 9) {
                    d._fDiv.style.top = "7px"
                } else {
                    d._fDiv.style.top = map.height - parseInt(d._fDiv.style.height) - 5 + "px"
                }
            }
            var i = Fe.G("cap_size");
            i.style.left = parseInt(d._fDiv.style.left) + 2 + "px";
            i.style.top = parseInt(d._fDiv.style.top) - 23 + "px";
            if (parseInt(i.style.top) < 0) {
                i.style.top = parseInt(d._fDiv.style.top) + 2 + "px"
            }
            var y = Fe.G("cap_btn_container");
            y.style.left = parseInt(d._fDiv.style.left) + d.capSizePx[0] - 88 + "px";
            y.style.top = parseInt(d._fDiv.style.top) + d.capSizePx[1] + 7 + "px";
            if (map.height - parseInt(y.style.top) < 26) {
                y.style.top = parseInt(y.style.top) - 35 + "px";
                y.style.left = parseInt(y.style.left) - 2 + "px"
            }
        };
        var j = function(i) {
            Fe.un(document, "mousemove", r);
            Fe.un(document, "mouseup", j);
            if (d._fDiv.releaseCapture) {
                d._fDiv.releaseCapture()
            }
        };
        Fe.on(d._fDiv, "mousedown", h);
        d.cm = createContextMenu([{
            text: "&nbsp;取消",
            callback: function() {
                d.endCapture()
            },
            width: 60
        },
        {
            text: "&nbsp;完成",
            callback: function() {
                d.showCapture()
            },
            width: 60
        },
        {
            text: "&nbsp;另存为",
            callback: function() {
                d.saveCapture()
            },
            width: 60
        }], d._fDiv, "move");
        var m = function(w) {
            w = w || window.event;
            if (w.button == 2) {
                return
            }
            if (Fe.Browser.ie && w.button != 1) {
                return
            }
            var l = w.target || w.srcElement;
            m._t = w.srcElement;
            if (l.setCapture) {
                l.setCapture()
            }
            var i = l.getAttribute("_ht");
            if (typeof i == "undefined") {
                return
            }
            d._curHT = i;
            Fe.on(document, "mousemove", t);
            Fe.on(document, "mouseup", p);
            d._bindFuncs.push({
                element: document,
                type: "mousemove",
                handler: t
            });
            d._bindFuncs.push({
                element: document,
                type: "mouseup",
                handler: p
            });
            BMap.OperationMask.show(map);
            BMap.OperationMask.setCursor(d.handlerCursors[i]);
            m._initX = w.pageX || w.clientX;
            m._initY = w.pageY || w.clientY;
            w.cancelBubble = true;
            w.returnValue = false
        };
        var t = function(z) {
            z = z || window.event;
            var l = z.pageX || z.clientX;
            var i = z.pageY || z.clientY;
            var E = l - m._initX;
            var D = i - m._initY;
            var y = parseInt(d._fDiv.style.left);
            var x = parseInt(d._fDiv.style.right);
            var A = parseInt(d._fDiv.style.top);
            var w = parseInt(d._fDiv.style.bottom);
            var B = d._curHT * 1;
            switch (B) {
            case 0:
                d._moveFromTop(D, A, w);
                break;
            case 1:
                d._moveFromRight(E, y, x);
                break;
            case 2:
                d._moveFromBottom(D, A, w);
                break;
            case 3:
                d._moveFromLeft(E, y, x);
                break;
            case 4:
                d._moveFromTop(D, A, w);
                d._moveFromLeft(E, y, x);
                break;
            case 5:
                d._moveFromTop(D, A, w);
                d._moveFromRight(E, y, x);
                break;
            case 6:
                d._moveFromBottom(D, A, w);
                d._moveFromRight(E, y, x);
                break;
            case 7:
                d._moveFromBottom(D, A, w);
                d._moveFromLeft(E, y, x);
                break;
            default:
                break
            }
            d._updateCapSize();
            d._updateHandlersPosition();
            var C = Fe.G("cap_btn_container");
            if (C) {
                C.style.display = "none"
            }
        };
        var p = function(l) {
            if (m._t && m._t.releaseCapture) {
                m._t.releaseCapture()
            }
            Fe.un(document, "mousemove", t);
            Fe.un(document, "mouseup", p);
            BMap.OperationMask.hide();
            if (parseInt(d._fDiv.style.width) == 0) {
                d._fDiv.style.width = "1px"
            }
            if (parseInt(d._fDiv.style.height) == 0) {
                d._fDiv.style.height = "1px"
            }
            d._updateCapSize();
            d.capSizePx = [parseInt(d._fDiv.style.width), parseInt(d._fDiv.style.height)];
            if (d._temp._fromLeftToRight) {
                delete d._temp._fromLeftToRight
            }
            if (d._temp._fromBottomToTop) {
                delete d._temp._fromBottomToTop
            }
            d._unifyPos();
            var i = Fe.G("cap_btn_container");
            if (i) {
                i.style.display = "block";
                i.style.left = parseInt(d._fDiv.style.left) + d.capSizePx[0] - 88 + "px";
                i.style.top = parseInt(d._fDiv.style.top) + d.capSizePx[1] + 7 + "px";
                if (map.height - parseInt(i.style.top) < 26) {
                    i.style.top = parseInt(i.style.top) - 35 + "px";
                    i.style.left = parseInt(i.style.left) - 2 + "px"
                }
            }
        };
        for (var q = 0, o = d._handlers.length; q < o; q++) {
            Fe.on(d._handlers[q], "mousedown", m)
        }
        BMap.OperationMask.hide();
        var v = parseInt(d._fDiv.style.top) + parseInt(d._fDiv.style.height) + 7;
        var n = parseInt(d._fDiv.style.left) + parseInt(d._fDiv.style.width) - 88;
        if (isNaN(v)) {
            v = map.height - parseInt(d._fDiv.style.bottom) + 5
        }
        if (isNaN(n)) {
            n = map.width - parseInt(d._fDiv.style.right) - 90
        }
        if (map.height - v < 26) {
            v = v - 35;
            n = n - 2
        }
        var k = "<div id='cap_btn_container' style='top:" + v + "px;left:" + n + "px'><div id='cap_btn_cancel' title='取消'></div><div id='cap_btn_show' title='完成'></div><div id='cap_btn_save' title='另存为'></div></div>";
        BMap.OperationMask.getDom(map).insertAdjacentHTML("beforeBegin", k);
        Fe.on(Fe.G("cap_btn_save"), "mouseover", 
        function(i) {
            Fe.ac(Fe.G("cap_btn_save"), "hover")
        });
        Fe.on(Fe.G("cap_btn_cancel"), "mouseover", 
        function(i) {
            Fe.ac(Fe.G("cap_btn_cancel"), "hover")
        });
        Fe.on(Fe.G("cap_btn_show"), "mouseover", 
        function(i) {
            Fe.ac(Fe.G("cap_btn_show"), "hover")
        });
        Fe.on(Fe.G("cap_btn_save"), "mouseout", 
        function(i) {
            Fe.rc(Fe.G("cap_btn_save"), "hover")
        });
        Fe.on(Fe.G("cap_btn_cancel"), "mouseout", 
        function(i) {
            Fe.rc(Fe.G("cap_btn_cancel"), "hover")
        });
        Fe.on(Fe.G("cap_btn_show"), "mouseout", 
        function(i) {
            Fe.rc(Fe.G("cap_btn_show"), "hover")
        });
        Fe.on(Fe.G("cap_btn_save"), "click", 
        function(i) {
            d.saveCapture()
        });
        Fe.on(Fe.G("cap_btn_cancel"), "click", 
        function(i) {
            d.endCapture()
        });
        Fe.on(Fe.G("cap_btn_show"), "click", 
        function(i) {
            d.showCapture()
        });
        stopBubble(u);
        return preventDefault(u)
    };
    Fe.on(BMap.OperationMask.getDom(map), "mousedown", b);
    d._bindFuncs.push({
        element: BMap.OperationMask.getDom(map),
        type: "mousedown",
        handler: b
    })
};
captureCtrl._hideCtrls = function() {
    for (var b = 0, a = this.ctrlNeed2Hide.length; b < a; b++) {
        if (this.ctrlNeed2Hide[b] && this.ctrlNeed2Hide[b].hide) {
            this.ctrlNeed2Hide[b].hide()
        }
    }
    trafficHide();
    map.closeInfoWindow();
    searchInViewCtrl.hidePopup()
};
captureCtrl._showCtrls = function() {
    for (var b = 0, a = this.ctrlNeed2Hide.length; b < a; b++) {
        if (this.ctrlNeed2Hide[b] && this.ctrlNeed2Hide[b].show) {
            this.ctrlNeed2Hide[b].show()
        }
    }
    trafficShow();
    searchInViewCtrl.showPopup()
};
captureCtrl.endCapture = function() {
    for (var d = 0, b = this._bindFuncs.length; d < b; d++) {
        var c = this._bindFuncs[d];
        Fe.un(c.element, c.type, c.handler)
    }
    this._bindFuncs.length = 0;
    this._showCtrls();
    if (this.tipsLabel) {
        this.tipsLabel.remove();
        this.tipsLabel = null
    }
    if (BMap.OperationMask.getDom(map).releaseCapture) {
        BMap.OperationMask.getDom(map).releaseCapture()
    }
    BMap.OperationMask.hide();
    if (this.cm) {
        destroyContextMenu(this.cm)
    }
    if (this._fDiv && this._fDiv.parentNode) {
        this._fDiv.parentNode.removeChild(this._fDiv);
        this._fDiv = null
    }
    var a = Fe.G("cap_size");
    if (a && a.parentNode) {
        a.parentNode.removeChild(a);
        a = null
    }
    var f = Fe.G("cap_btn_container");
    if (f) {
        f.parentNode.removeChild(f);
        f = null
    }
    Fe.rc(Fe.G("capture"), "selected");
    captureCtrl._inUse = false
};
captureCtrl._generateHTML = function() {
    var a = [];
    a.push("<div id='cap_size' style='display:none;z-index:250'>0 x 0</div>");
    a.push("<div style='position:absolute;z-index:300;border:");
    a.push(this._opts.lineStroke + "px " + this._opts.lineStyle + " " + this._opts.lineColor + ";");
    a.push("width:0; height:0; font-size:0'>");
    a.push("<div class='cap_handler' id='cap_h_tl' _ht='4' style='cursor:nw-resize;top:-4px;left:-4px'></div>");
    a.push("<div class='cap_handler' id='cap_h_tr' _ht='5' style='cursor:ne-resize;top:-4px;right:-4px'></div>");
    a.push("<div class='cap_handler' id='cap_h_bl' _ht='7' style='cursor:ne-resize;bottom:-4px;left:-4px'></div>");
    a.push("<div class='cap_handler' id='cap_h_br' _ht='6' style='cursor:nw-resize;bottom:-4px;right:-4px'></div>");
    a.push("<div class='cap_handler' id='cap_h_t' _ht='0' style='cursor:n-resize;top:-4px;left:-4px'></div>");
    a.push("<div class='cap_handler' id='cap_h_l' _ht='3' style='cursor:w-resize;top:-4px;left:-4px'></div>");
    a.push("<div class='cap_handler' id='cap_h_r' _ht='1' style='cursor:e-resize;top:-4px;right:-4px'></div>");
    a.push("<div class='cap_handler' id='cap_h_b' _ht='2' style='cursor:s-resize;bottom:-4px;left:-4px'></div>");
    a.push("<div style='height:100%;width:100%;opacity:" + this._opts.opacity + ";");
    a.push("filter:alpha(opacity=" + Math.round(this._opts.opacity * 100) + "); background:" + this._opts.fillColor + ";cursor:move'></div>");
    a.push("</div>");
    return a.join("")
};
captureCtrl._updateHandlersPosition = function() {
    var d = parseInt(this._fDiv.style.width);
    var c = parseInt(this._fDiv.style.height);
    var a = Math.abs(d / 2) - 4 + "px";
    var f = Math.abs(c / 2) - 4 + "px";
    var b = d - 3 + "px";
    var g = c - 3 + "px";
    this._handlers[0].style.left = a;
    this._handlers[1].style.left = b;
    this._handlers[1].style.top = f;
    this._handlers[2].style.left = a;
    this._handlers[2].style.top = g;
    this._handlers[3].style.top = f;
    this._handlers[5].style.left = b;
    this._handlers[6].style.left = b;
    this._handlers[6].style.top = g;
    this._handlers[7].style.top = g
};
captureCtrl._updateCapSize = function() {
    var a = Fe.G("cap_size");
    a.style.display = "block";
    var b = this;
    if (b._fDiv.style.left != "auto") {
        a.style.left = parseInt(b._fDiv.style.left) + 2 + "px"
    } else {
        a.style.left = map.width - parseInt(b._fDiv.style.right) - parseInt(b._fDiv.style.width) + "px"
    }
    if (b._fDiv.style.top != "auto") {
        a.style.top = parseInt(b._fDiv.style.top) - 23 + "px";
        if (parseInt(a.style.top) < 0) {
            a.style.top = parseInt(b._fDiv.style.top) + 2 + "px"
        }
    } else {
        a.style.top = map.height - parseInt(b._fDiv.style.bottom) - parseInt(b._fDiv.style.height) - 25 + "px";
        if (parseInt(a.style.top) < 0) {
            a.style.top = map.height - parseInt(b._fDiv.style.bottom) - parseInt(b._fDiv.style.height) + "px"
        }
    }
    a.innerHTML = parseInt(b._fDiv.style.width) + " x " + parseInt(b._fDiv.style.height)
};
captureCtrl._unifyPos = function() {
    var a = this;
    if (!a._fDiv) {
        return
    }
    if (a._fDiv.style.left == "auto" && a._fDiv.style.right != "auto") {
        a._fDiv.style.left = map.width - parseInt(a._fDiv.style.right) - a.capSizePx[0] - 2 + "px";
        a._fDiv.style.right = "auto"
    }
    if (a._fDiv.style.top == "auto" && a._fDiv.style.bottom != "auto") {
        a._fDiv.style.top = map.height - parseInt(a._fDiv.style.bottom) - a.capSizePx[1] - 2 + "px";
        a._fDiv.style.bottom = "auto"
    }
};
captureCtrl._moveFromLeft = function(b, c, d) {
    var f = this;
    var a = f.capSizePx[0] - b;
    if (a < 0) {
        f._temp._fromLeftToRight = true;
        if (isNaN(c)) {
            c = map.width - d - 1
        }
        if ( - a + c + 8 <= map.width) {
            if (!isNaN(c)) {
                f._fDiv.style.left = c + "px"
            } else {
                f._fDiv.style.left = map.width - d - map.capSizePx[0] - 2 + "px"
            }
            f._fDiv.style.right = "auto";
            f._fDiv.style.width = -a + "px"
        } else {
            f._fDiv.style.width = map.width - c - 8 + "px"
        }
    } else {
        if (isNaN(d)) {
            if (f._temp._fromLeftToRight) {
                d = map.width - c - 1
            } else {
                d = map.width - c - f.capSizePx[0] - 2
            }
        }
        if (map.width - d - a >= 6) {
            f._fDiv.style.left = "auto";
            if (!isNaN(c)) {
                if (f._temp._fromLeftToRight) {
                    f._fDiv.style.right = map.width - c - 1 + "px"
                } else {
                    f._fDiv.style.right = map.width - c - f.capSizePx[0] - 2 + "px"
                }
            }
            f._fDiv.style.width = a + "px"
        } else {
            f._fDiv.style.width = map.width - d - 4 + "px"
        }
    }
};
captureCtrl._moveFromRight = function(b, c, d) {
    var f = this;
    var a = f.capSizePx[0] + b;
    if (a >= 0) {
        if (isNaN(c)) {
            c = map.width - d - 1
        }
        if (a + c + 12 <= map.width) {
            if (!isNaN(c)) {
                f._fDiv.style.left = c + "px"
            } else {
                f._fDiv.style.left = map.width - d - 1 + "px"
            }
            f._fDiv.style.right = "auto";
            f._fDiv.style.width = a + "px"
        } else {
            f._fDiv.style.width = map.width - c - 9 + "px"
        }
    } else {
        if (isNaN(d)) {
            d = map.width - c - 1
        }
        if (map.width - d + a >= 9) {
            f._fDiv.style.left = "auto";
            if (!isNaN(c)) {
                f._fDiv.style.right = map.width - c - 1 + "px"
            }
            f._fDiv.style.width = -a + "px"
        } else {
            f._fDiv.style.width = map.width - d - 5 + "px"
        }
    }
};
captureCtrl._moveFromTop = function(a, c, f) {
    var d = this;
    var b = d.capSizePx[1] - a;
    if (b < 0) {
        d._temp._fromBottomToTop = true;
        if (isNaN(c)) {
            c = map.height - f - 1
        }
        if ( - b + c + 11 <= map.height) {
            if (!isNaN(c)) {
                d._fDiv.style.top = c + "px"
            } else {
                d._fDiv.style.top = map.height - f - map.capSizePx[1] - 2 + "px"
            }
            d._fDiv.style.bottom = "auto";
            d._fDiv.style.height = -b + "px"
        } else {
            d._fDiv.style.height = map.height - c - 5 + "px"
        }
    } else {
        if (isNaN(f)) {
            if (d._temp._fromLeftToRight) {
                f = map.height - c - 1
            } else {
                f = map.height - c - d.capSizePx[1] - 2
            }
        }
        if (map.height - f - b >= 9) {
            d._fDiv.style.top = "auto";
            if (!isNaN(c)) {
                if (d._temp._fromBottomToTop) {
                    d._fDiv.style.bottom = map.height - c - 1 + "px"
                } else {
                    d._fDiv.style.bottom = map.height - c - d.capSizePx[1] - 2 + "px"
                }
            }
            d._fDiv.style.height = b + "px"
        } else {
            d._fDiv.style.height = map.height - f - 9 + "px"
        }
    }
};
captureCtrl._moveFromBottom = function(a, c, f) {
    var d = this;
    var b = d.capSizePx[1] + a;
    if (b >= 0) {
        if (isNaN(c)) {
            c = map.height - f - 1
        }
        if (b + c + 11 <= map.height) {
            if (!isNaN(c)) {
                d._fDiv.style.top = c + "px"
            } else {
                d._fDiv.style.top = map.height - f - 1 + "px"
            }
            d._fDiv.style.bottom = "auto";
            d._fDiv.style.height = b + "px"
        } else {
            d._fDiv.style.height = map.height - c - 5 + "px"
        }
    } else {
        if (isNaN(f)) {
            f = map.height - c - 1
        }
        if (map.height - f + b >= 9) {
            d._fDiv.style.top = "auto";
            if (!isNaN(c)) {
                d._fDiv.style.bottom = map.height - c - 1 + "px"
            }
            d._fDiv.style.height = -b + "px"
        } else {
            d._fDiv.style.height = map.height - f - 9 + "px"
        }
    }
};
captureCtrl.saveCapture = function() {
    var d = this._getReqData(0);
    var c = null;
    if (document.getElementById("capSaveF")) {
        c = document.getElementById("capSaveF");
        var b = c.getElementsByTagName("input")[1];
        if (b) {
            b.value = d
        }
    } else {
        c = document.createElement("form");
        c.id = "capSaveF";
        c.name = "capSaveF";
        c.method = "post";
        c.action = "http://snap.map.baidu.com/?newmap=1";
        c.target = "_blank";
        var a = document.createElement("input");
        a.type = "hidden";
        a.name = "qt";
        a.value = "save";
        var f = document.createElement("input");
        f.type = "hidden";
        f.name = "data";
        f.value = d;
        c.appendChild(a);
        c.appendChild(f);
        document.body.appendChild(c)
    }
    c.submit();
    this.endCapture();
    return
};
captureCtrl.showCapture = function() {
    var nw = window.open("about:blank");
    var data = this._getReqData(1);
    var req = getXhr();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            if (req.responseText) {
                var json = null;
                try {
                    eval("json=" + req.responseText)
                } catch(e) {
                    nw.close();
                    captureCtrl.showErrorMsg();
                    return
                }
                if (!json || json && !json.content || json && json.result && json.result.error == 1) {
                    nw.close();
                    captureCtrl.showErrorMsg();
                    return
                }
                var url = json.content.image_url;
                nw.location.href = url;
                nw.focus()
            }
        } else {
            if (req.readyState == 4 && req.status != 200) {
                captureCtrl.showErrorMsg()
            }
        }
    };
    req.open("POST", "/?newmap=1");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("qt=" + encodeURIComponent("prev") + "&data=" + encodeURIComponent(data));
    this.endCapture()
};
captureCtrl._getReqData = function(n) {
    var q = this.capSizePx[0];
    var k = this.capSizePx[1];
    var g = parseInt(this._fDiv.style.left) + 1 / 2 * q;
    var f = parseInt(this._fDiv.style.top) + 1 / 2 * k;
    var o = map.pixelToPoint(new BMap.Pixel(g, f));
    var a = map.zoomLevel;
    this._getAllMarkers();
    this._getAllLabels();
    this._getAllDrawings();
    var m = [];
    if (this.areas.length > 0) {
        m.push(this.areas.join(","))
    }
    if (this.lines.length > 0) {
        m.push(this.lines.join(","))
    }
    if (this.normMkrs.length > 0) {
        this.normMkrs.sort(function(h, c) {
            return h.zIndex - c.zIndex
        });
        var r = "";
        for (var j = 0, d = this.normMkrs.length; j < d; j++) {
            r = r + "," + this.normMkrs[j].data
        }
        m.push(r.substring(1))
    }
    if (this.destLbls.length > 0) {
        this.destLbls.sort(function(h, c) {
            return h.zIndex - c.zIndex
        });
        var r = "";
        for (var j = 0, d = this.destLbls.length; j < d; j++) {
            r = r + "," + this.destLbls[j].data
        }
        m.push(r.substring(1))
    }
    if (this.lbls.length > 0) {
        m.push(this.lbls.join(","))
    }
    var b = m.length > 0 ? ',"coord":[' + m.join(",") + "]": "";
    var p = '{"taskId":' + n + ',"function":"snap","level":' + a + ',"center":"' + o.lng + " " + o.lat + '","height":' + k + ',"width":' + q + ',"coordtype":"M"' + b + "}";
    return p
};
captureCtrl._getAllMarkers = function() {
    this.normMkrs.length = 0;
    if (map.markerDiv) {
        for (var c = 0, a = map.markerDiv.childNodes.length; c < a; c++) {
            var b = map.temp.I(map.markerDiv.childNodes[c].hashCode);
            var f = b.zIndex || (b.getDom() && b.getDom().style.zIndex);
            if (b.toString() == "Marker" && b._stCode) {
                if (b._stCode == OVERLAY_STYLE.DRV_M_MKR && b.siblingElement && b.siblingElement.style.visibility == "hidden") {
                    continue
                }
                this.normMkrs.push({
                    data: '{"type":1,"geo":"' + b.point.lng + " " + b.point.lat + '","scode":' + b._stCode + "}",
                    zIndex: f
                })
            }
            if (b.getLabel() && b.getLabel()._stCode) {
                lbl = b.getLabel();
                var d = lbl.getPoint(true, [3, 4]);
                this.normMkrs.push({
                    data: '{"type":4,"geo":"' + d.lng + " " + d.lat + '","scode":' + lbl._stCode + ',"text":"' + formatJSONString(lbl.content) + '"}',
                    zIndex: f
                })
            }
        }
    }
};
captureCtrl._getAllLabels = function() {
    this.destLbls.length = 0;
    this.lbls.length = 0;
    if (map.temp.labelDiv) {
        for (var b = 0, a = map.temp.labelDiv.childNodes.length; b < a; b++) {
            var d = map.temp.I(map.temp.labelDiv.childNodes[b].hashCode);
            if (d.toString() == "Label" && d._stCode) {
                var c = d.getPoint(true, [3, 5]);
                if (d._stCode == OVERLAY_STYLE.DS_LBL || d._stCode == OVERLAY_STYLE.DE_LBL) {
                    this.destLbls.push({
                        data: '{"type":1,"geo":"' + d.point.lng + " " + d.point.lat + '","scode":' + d._stCode + ',"text":"' + formatJSONString(d.content) + '"}',
                        zIndex: d.zIndex
                    })
                } else {
                    this.lbls.push('{"type":4,"geo":"' + c.lng + " " + c.lat + '","scode":' + d._stCode + ',"text":"' + formatJSONString(d.content) + '"}')
                }
            }
        }
    }
};
captureCtrl._getAllDrawings = function() {
    this.lines.length = 0;
    this.areas.length = 0;
    var f = function(m) {
        var h = [];
        if (m.toString() == "Point") {
            return m.lng + " " + m.lat
        } else {
            if (typeof m == "string") {
                return m.replace(/,/g, " ").replace(/;/g, ",").replace(/,$/, "")
            } else {
                for (var k = 0, j = m.length; k < j; k++) {
                    h.push(f(m[k]))
                }
                return h.join(",").replace(/,$/, "")
            }
        }
    };
    if (map.palette) {
        var g = map.palette.childNodes;
        for (var c = 0, a = g.length; c < a; c++) {
            var d = map.temp.I(g[c].hashCode);
            if (d && d._stCode) {
                if (d.toString() == "Polyline") {
                    if (d.points.constructor == Array && d.points[0] && typeof d.points[0] == "string") {
                        for (var b = 0; b < d.points.length; b++) {
                            this.lines.push('{"type":2,"geo":"' + f(d.points[b]) + '","scode":' + d._stCode + "}")
                        }
                    } else {
                        this.lines.push('{"type":2,"geo":"' + f(d.points) + '","scode":' + d._stCode + "}")
                    }
                } else {
                    if (d.toString() == "Polygon") {
                        this.areas.push('{"type":3,"geo":"' + f(d.points) + '","scode":' + d._stCode + "}")
                    }
                }
            }
        }
    }
};
captureCtrl.showErrorMsg = function() {
    alert("抱歉，截图失败。请检查您的网络连接，并稍后再试。")
};
closeOtherOps = function() {
    closeMeasure();
    endCaptureMap()
};
function _showCE() {
    window.location = "http://" + window.location.host + window.location.pathname + "from_mars_to_the_earth.html"
}
var GEO_TYPE_AREA = 0;
var GEO_TYPE_LINE = 1;
var GEO_TYPE_POINT = 2;
var CITY_TYPE_PROV = 1;
var CITY_TYPE_CITY = 2;
var CITY_TYPE_DIST = 3;
var OVERLAY_STYLE = {
    MKR_A: 1,
    MKR_B: 2,
    MKR_C: 3,
    MKR_D: 4,
    MKR_E: 5,
    MKR_F: 6,
    MKR_H: 7,
    MKR_I: 8,
    MKR_J: 9,
    MKR_K: 10,
    MKR: 11,
    MKR_RCTR: 12,
    DIS_DOT: 13,
    BUS_STOP: 14,
    BUS_TRANS: 15,
    SUB_TRANS: 16,
    DS_MKR: 17,
    DE_MKR: 18,
    DRV_M_MKR: 19,
    DRV_E_MKR: 20,
    MKR_NULL: 21,
    VIW_LBL: 30,
    DIS_LBL: 31,
    DIS_T_LBL: 32,
    DS_LBL: 33,
    DE_LBL: 34,
    DIR_MKR: 40,
    ROUTE: 60,
    BUS_ROUTE: 61,
    WALK_ROUTE: 62,
    DRV_ROUTE: 63,
    DIS_LINE: 64,
    AREA: 65,
    H_LINE: 66,
    HO_LINE: 67,
    HW_LINE: 68
};
function addSearchPoi(a, b, g) {
    var f = getPoiPoint(a);
    if (!f) {
        return
    }
    if (b < 0 || b > 9) {
        return
    }
    var d = new BMap.Icon("img/markers.png", {
        offset: [1, -13],
        height: 25,
        width: 23,
        imgOffset: [0, -25 * b]
    });
    var c = new BMap.Marker(f, {
        icon: d,
        height: 25,
        width: 23,
        zIndexFixed: true,
        baseZIndex: 2500000 - 100 * b
    });
    map.addOverlay(c);
    c._stCode = b + 1;
    if (g) {
        c.getDom().title = g
    }
    c.getDom().hashCode = c.hashCode;
    return c
}
var rangeSearchCenterMarker = null;
function addRangeSearchCenterPoi(a, g, c) {
    if (rangeSearchCenterMarker) {
        rangeSearchCenterMarker.remove();
        rangeSearchCenterMarker = null
    }
    var f = getPoiPoint(a);
    if (!f) {
        return
    }
    var d = new BMap.Icon("img/markers.png", {
        offset: [2, -12],
        height: 25,
        width: 23,
        imgOffset: [0, -250]
    });
    var b = new BMap.Marker(f, {
        icon: d,
        height: 25,
        width: 23,
        zIndexFixed: true
    });
    map.addOverlay(b);
    b._stCode = OVERLAY_STYLE.MKR_RCTR;
    if (!c) {
        rangeSearchCenterMarker = b
    }
    if (g) {
        b.getDom().title = g
    }
    b.getDom().hashCode = b.hashCode;
    return b
}
function addSearchInViewPoi(a, f) {
    var d = getPoiPoint(a);
    if (!d) {
        return
    }
    var c = new BMap.Icon("img/markers.png", {
        offset: [2, -12],
        height: 25,
        width: 23,
        imgOffset: [0, -300]
    });
    var b = new BMap.Marker(d, {
        icon: c,
        height: 25,
        width: 23
    });
    b._stCode = OVERLAY_STYLE.MKR_NULL;
    map.addOverlay(b);
    if (f) {
        b.getDom().title = f
    }
    b.siblingElement.hashCode = b.hashCode;
    b.getDom().hashCode = b.hashCode;
    return b
}
function addSearchInViewTitle(a, d, b) {
    var c = createSearchInViewTitle(a, d);
    c._stCode = OVERLAY_STYLE.VIW_LBL;
    if (!b || b.toString() != "Marker") {
        map.addOverlay(c);
        return c
    }
    b.setLabel(c);
    return c
}
function createSearchInViewTitle(a, f) {
    var b = getPoiPoint(a);
    if (!b) {
        return
    }
    var d = [14, -21];
    var c = f;
    if (f.replace(/[\u0100-\uffff]/g, "##").length > 20) {
        f = f.substring(0, 10) + "..."
    }
    return new BMap.Label(f, {
        lineHeight: "15px",
        padding: "1px 3px",
        borderColor: "#a7a7a7",
        color: "#666",
        point: b,
        offset: d,
        cursor: "pointer",
        title: c
    })
}
function addDetailPoi(a, f) {
    var d = getPoiPoint(a);
    if (!d) {
        return
    }
    var c = new BMap.Icon("img/markers.png", {
        offset: [2, -12],
        height: 25,
        width: 23,
        imgOffset: [0, -275]
    });
    var b = new BMap.Marker(d, {
        icon: c,
        height: 25,
        width: 23
    });
    map.addOverlay(b);
    b._stCode = OVERLAY_STYLE.MKR;
    if (f) {
        b.getDom().title = f
    }
    b.getDom().hashCode = b.hashCode;
    return b
}
function getPoiPoint(a) {
    var c = [];
    var b = null;
    if (a.toString() == "Point") {
        b = a
    } else {
        if (typeof a == "string") {
            c = Fe.trim(a).split(",");
            if (c.length < 2) {
                return
            }
            c[0] = parseFloat(Fe.trim(c[0]));
            c[1] = parseFloat(Fe.trim(c[1]))
        } else {
            c = a.slice(0);
            if (c.length < 2) {
                return
            }
        }
        b = new BMap.Point(c[0], c[1])
    }
    return b
}
var ROUTE_TYPE_DEFAULT = 0;
var ROUTE_TYPE_BUS = 1;
var ROUTE_TYPE_WALK = 2;
var ROUTE_TYPE_DRIVE = 3;
function addRoute(f, d, a) {
    var c = [{
        stroke: 6,
        color: "#3a6bdb",
        opacity: 0.65,
        stCode: OVERLAY_STYLE.ROUTE
    },
    {
        stroke: 6,
        color: "#3a6bdb",
        opacity: 0.75,
        stCode: OVERLAY_STYLE.BUS_ROUTE
    },
    {
        stroke: 4,
        color: "#30a208",
        opacity: 0.75,
        stCode: OVERLAY_STYLE.WALK_ROUTE
    },
    {
        stroke: 5,
        color: "#3a6bdb",
        opacity: 0.65,
        stCode: OVERLAY_STYLE.DRV_ROUTE
    }];
    if (typeof d == "undefined") {
        d = 0
    }
    if (!c[d]) {
        return
    }
    var b = c[d];
    var h = new BMap.Polyline(f, {
        weight: b.stroke,
        lineColor: b.color,
        opacity: b.opacity
    });
    map.addOverlay(h);
    h._stCode = c[d].stCode;
    h._routeType = d;
    if (d == ROUTE_TYPE_BUS) {
        var g = new BMap.Polyline(f, {
            weight: b.stroke - 2,
            lineColor: "#fff",
            opacity: 0.3
        });
        h._p = g;
        map.addOverlay(g)
    } else {
        if (a) {
            isDilute(h, f)
        }
    }
    return h
}
function selectRoute(b) {
    if (!b || b.toString() != "Polyline") {
        return
    }
    var a = ["#ff0103", "#ff0103", "#ff0103", "#ff0103"];
    if (a[b._routeType]) {
        b.setLineColor(a[b._routeType]);
        if (b._stCode == OVERLAY_STYLE.BUS_ROUTE) {
            b._stCode = OVERLAY_STYLE.HO_LINE
        } else {
            if (b._stCode == OVERLAY_STYLE.WALK_ROUTE) {
                b._stCode = OVERLAY_STYLE.HW_LINE
            } else {
                b._stCode = OVERLAY_STYLE.H_LINE
            }
        }
    }
}
function unSelectRoute(c) {
    if (!c || c.toString() != "Polyline") {
        return
    }
    var b = ["#3a6bdb", "#3a6bdb", "#30a208", "#3a6bdb"];
    var a = [OVERLAY_STYLE.ROUTE, OVERLAY_STYLE.BUS_ROUTE, OVERLAY_STYLE.WALK_ROUTE, OVERLAY_STYLE.DRV_ROUTE];
    if (b[c._routeType]) {
        c.setLineColor(b[c._routeType]);
        c._stCode = a[c._routeType]
    }
}
function removeRoute(a) {
    if (a._p && a._p.toString() == "Polyline") {
        a._p.remove();
        a._p = null
    }
    a.remove();
    a = null
}
var AREA_TYPE_NORM = 0;
var AREA_TYPE_PROV = 1;
var AREA_TYPE_DIST = 2;
function addArea(g, f, a) {
    if (!g) {
        return
    }
    var d = [{
        lineColor: "#0064fc",
        weight: 2,
        fillColor: false,
        opacity: 0.8,
        lineStyle: "dashed",
        stCode: OVERLAY_STYLE.AREA
    },
    {
        lineColor: "#0064fc",
        weight: 2,
        fillColor: false,
        opacity: 0.8,
        lineStyle: "dashed",
        stCode: OVERLAY_STYLE.AREA
    },
    {
        lineColor: "#0064fc",
        weight: 2,
        fillColor: false,
        opacity: 0.8,
        lineStyle: "dashed",
        stCode: OVERLAY_STYLE.AREA
    }];
    var c = f || 0;
    if (!d[c]) {
        return
    }
    if (a && g.length < a) {
        return
    }
    var b = new BMap.Polygon(g, d[c]);
    if (a != null) {
        isDilute(b, g)
    }
    map.addOverlay(b);
    b.setFillColor(false);
    b._stCode = d[c].stCode;
    return b
}
function isDilute(b, c) {
    if (b._ps == null) {
        b._ps = c
    }
    function d() {
        b.setPoints("")
    }
    function a() {
        b.setPoints(dilute(b._ps))
    }
    map.addEventListener("load", a);
    map.addEventListener("zoomstart", d);
    map.addEventListener("zoomend", a);
    b.addEventListener("remove", 
    function() {
        map.removeEventListener("zoomstart", d);
        map.removeEventListener("zoomend", a);
        map.removeEventListener("movestart", d);
        map.removeEventListener("moveend", a)
    })
}
function dilute(c) {
    if (typeof(c) == "string") {
        return _dilute(c)
    } else {
        var d = [];
        for (var b = 0; b < c.length; b++) {
            var a = _dilute(c[b]);
            if (a != null && a != "") {
                d.push(a)
            }
        }
        return d
    }
}
function _dilute(a) {
    if (a.length < 500) {
        return a
    }
    var b = map.zoomLevel;
    if (b < 6) {
        var a = a.replace(/(((-?\d+)(\.\d+)?),((-?\d+)(\.\d+)?);)(((-?\d+)(\.\d+)?),((-?\d+)(\.\d+)?);){20}/g, "$1")
    } else {
        if (b < 10) {
            var a = a.replace(/(((-?\d+)(\.\d+)?),((-?\d+)(\.\d+)?);)(((-?\d+)(\.\d+)?),((-?\d+)(\.\d+)?);){2}/g, "$1")
        }
    }
    return a
}
function removeArea(a) {
    if (a.toString() == "Polygon") {
        a.remove();
        a = null
    }
}
var TRANS_TYPE_BUS = 0;
var TRANS_TYPE_SUB = 1;
function addTransPoi(g, f, h) {
    var i = [];
    var j = getPoiPoint(g);
    if (!j) {
        return
    }
    var d = OVERLAY_STYLE.BUS_TRANS;
    var a = -55;
    switch (f) {
    case TRANS_TYPE_BUS:
        a = -55;
        break;
    case TRANS_TYPE_SUB:
        d = OVERLAY_STYLE.SUB_TRANS;
        a = -76;
        break;
    default:
        break
    }
    var c = new BMap.Icon("img/trans_icons.png", {
        height: 21,
        width: 21,
        imgOffset: [0, a]
    });
    var b = new BMap.Marker(j, {
        icon: c,
        height: 21,
        width: 21
    });
    map.addOverlay(b);
    b._stCode = d;
    if (h) {
        b.getDom().title = h
    }
    return b
}
function addBusStopPoi(a, g) {
    var f = [];
    var d = getPoiPoint(a);
    if (!d) {
        return
    }
    var c = new BMap.Icon("img/stop_icon.png", {
        height: 11,
        width: 11
    });
    var b = new BMap.Marker(d, {
        icon: c,
        height: 11,
        width: 11,
        baseZIndex: 1500000
    });
    map.addOverlay(b);
    b._stCode = OVERLAY_STYLE.BUS_STOP;
    if (g) {
        b.getDom().title = g
    }
    return b
}
var DEST_START = 0;
var DEST_END = 1;
var DEST_MIDDLE = 2;
var DEST_SEC = 3;
function addDestPoi(j, k, g, i) {
    var m = getPoiPoint(j);
    if (!m) {
        return
    }
    if (g == DEST_MIDDLE) {
        var f = new BMap.Icon("img/drv_m.png", {
            height: 11,
            width: 11
        });
        var c = new BMap.Marker(m, {
            icon: f,
            height: 11,
            width: 11
        });
        map.addOverlay(c);
        c.enableDraging(true);
        c._stCode = OVERLAY_STYLE.DRV_M_MKR;
        return c
    }
    if (g == DEST_SEC) {
        var f = new BMap.Icon("img/drv_m.png", {
            height: 11,
            width: 11,
            imgOffset: [0, -11]
        });
        var c = new BMap.Marker(m, {
            icon: f,
            height: 11,
            width: 11
        });
        map.addOverlay(c);
        c._stCode = OVERLAY_STYLE.DRV_E_MKR;
        return c
    }
    if (!i) {
        var f = new BMap.Icon("img/dest_markers.png", {
            offset: [7, -14],
            width: 42,
            height: 34,
            imgOffset: [0, -34 * g]
        });
        var c = new BMap.Marker(m, {
            icon: f,
            width: 42,
            height: 34,
            baseZIndex: 3500000
        });
        map.addOverlay(c);
        if (k) {
            c.getDom().title = k
        }
        c._stCode = OVERLAY_STYLE.DS_MKR + g;
        return c
    }
    var l = k;
    if (l.length > 10) {
        l = l.substring(0, 10) + "..."
    }
    var a = new BMap.Label(k, {
        point: m,
        cursor: "pointer"
    });
    a.setOffset( - 12, -28);
    map.addOverlay(a);
    a._stCode = OVERLAY_STYLE.DS_LBL + g;
    var h = a.getDom();
    h.style.border = "none";
    h.style.background = "transparent";
    h.style.overflow = "visible";
    h.style.zIndex = 2500000 + 2 * map.pointToPixel(m).y;
    h.style.cursor = "url(" + map.config.defaultCursor + "), default";
    if (!Fe.Browser.ie) {
        Fe.on(h, "mousedown", 
        function() {
            h.style.cursor = "url(" + map.config.draggingCursor + "), default"
        });
        Fe.on(h, "mouseup", 
        function() {
            h.style.cursor = "url(" + map.config.defaultCursor + "), default"
        })
    }
    a.zIndex = h.style.zIndex;
    var b = "";
    if (Fe.Browser.ie == 6) {
        b = '<div class="dest_icon_left_ie6 dest' + g + '"><div></div></div><div class="dest_icon_right_ie6"><div></div><span class="dest_text_ie6">' + l + "</span></div>"
    } else {
        b = '<div class="dest_icon dest' + g + '"><div class="dest_icon_right"><span class="dest_text">' + l + "</span></div></div>"
    }
    h.innerHTML = b;
    return a
}
function createDrvMidLabel(b, a) {
    return new BMap.Label(b, {
        point: a,
        borderWidth: 1,
        borderColor: "#999",
        color: "#666",
        padding: "2px",
        background: "#fff",
        offset: [15, -5]
    })
}
function addDrvDirIcon(b, c) {
    var g = getPoiPoint(b);
    if (!g) {
        return
    }
    if (c < 0 || c > 12) {
        c = 0
    }
    var a = c * ( - 18);
    var f = new BMap.Icon("img/dest_markers.png", {
        width: 18,
        height: 18,
        imgOffset: [a, -100]
    });
    var d = new BMap.Marker(g, {
        icon: f,
        width: 18,
        height: 18
    });
    map.addOverlay(d);
    d._stCode = OVERLAY_STYLE.DIR_MKR + c;
    return d
}
var POI_TYPE_NORMAL = 0;
var POI_TYPE_BUSSTOP = 1;
var POI_TYPE_BUSLINE = 2;
var POI_TYPE_SUBSTOP = 3;
var POI_TYPE_SUBLINE = 4;
var POI_TYPE_INTEL = 5;
function createSearchInfoWnd(z, t) {
    var A = z.title;
    var n = z.addr;
    var g = z.tel;
    var k = z.uid || "";
    var u = z.poiType || POI_TYPE_NORMAL;
    var o = z.hasDetail;
    var h = z.ext;
    if (!t) {
        t = {}
    }
    var v = t.cityCode || modelConfig.cityCode;
    var p = ["", "", ""];
    var m = ["none", "none", "none"];
    if (typeof t.tabIndex != "undefined" && m[t.tabIndex]) {
        p[t.tabIndex] = "hover";
        m[t.tabIndex] = "block"
    } else {
        p[0] = "hover";
        m[0] = "block"
    }
    if (!A) {
        return null
    }
    var f = !!h;
    var x = 240;
    if (f) {
        switch (h.src_name) {
        case "ctrip_hotel":
            break;
        case "ctrip_site":
            f = false;
            break;
        case "dianping":
            f = false;
            break;
        case "house_new":
            break;
        case "house_ershou":
            break;
        default:
            break
        }
    }
    var r = A;
    if (u == POI_TYPE_BUSSTOP) {
        r = r + "-公交车站"
    } else {
        if (u == POI_TYPE_SUBSTOP) {
            r = r + "-地铁站"
        }
    }
    if (r.replace(/[\u0100-\uffff]/g, "##").length > 30) {
        r = r.substring(0, 14) + "..."
    }
    var a = "<p class='iw_poi_title' title='" + A + "'>";
    if (o || !t.hideDetail && (u == POI_TYPE_BUSLINE || u == POI_TYPE_SUBLINE)) {
        if (u == POI_TYPE_INTEL) {
            if (r.replace(/[\u0100-\uffff]/g, "##").length > 20) {
                r = r.substring(0, 8) + "..."
            }
        } else {
            if (r.replace(/[\u0100-\uffff]/g, "##").length > 25) {
                r = r.substring(0, 11) + "..."
            }
        }
        a += r;
        a += "<a href='javascript:void(0)' onclick='showDetail(\"" + k + '", ' + u + ", " + v + ")'>详情&raquo;</a>"
    } else {
        a += r
    }
    if (u == POI_TYPE_INTEL) {
        a += '<img style="margin-left:2px;vertical-align:0;border:0" src="img/intel.gif" alt="intel" />'
    }
    a += "</p>";
    var b = [];
    if (f && h.pic && h.pic.length > 0) {
        b.push("<div style='float:right;width:70px;height:70px;overflow:hidden;margin-right:16px;display:inline' title='" + A + "'><img border='0' alt='" + A + "' src='" + h.pic[0] + "'/></div>");
        x = 320
    }
    b.push("<div class='iw_poi_content' " + (f ? "style='width:220px'": "") + ">");
    if (n) {
        if (u == POI_TYPE_BUSSTOP || u == POI_TYPE_SUBSTOP) {
            b.push("<p>车次：" + n + "</p>")
        } else {
            b.push('<table cellspacing="0" class="table_addr_tel"><tr><th>地址：&nbsp;</th><td>');
            b.push(n + "&nbsp;</td></tr>");
            if (g) {
                b.push("<tr><th>电话：&nbsp;</th><td>" + g + "</td></tr>")
            }
            b.push("</table>")
        }
    } else {
        if (g) {
            b.push('<table cellspacing="0" class="table_addr_tel"><tr><th>电话：&nbsp;</th><td>' + g + "</td></tr></table>")
        }
    }
    if (f) {
        var q = ["<p style='margin-top:2px'>"];
        if (h.title_link) {
            for (var y = 0, w = h.title_link.length; y < w; y++) {
                q.push("<a href='" + h.title_link[y].link + "' target='_blank' onclick='nsClick(this.href, \"" + h.src_name + "\")'>" + h.title_link[y].title + "</a>");
                if (y < h.title_link.length - 1) {
                    q.push("&nbsp;&nbsp;")
                }
            }
        }
        b.push(q.join(""));
        b.push("</p>")
    }
    b.push("</div>");
    b.push("<div class='iw_poi_inter'>");
    b.push("<div class='nav_tab'><span id='nav_tab0' class='" + p[0] + "' onclick='switchInfoWndTab(0, \"iw_ssn\")'>到这里去</span>");
    b.push("<span id='nav_tab1' class='" + p[1] + "' onclick='switchInfoWndTab(1, \"iw_esn\")'>从这里出发</span>");
    b.push("<span id='nav_tab2' class='" + p[2] + "' onclick='switchInfoWndTab(2, \"rangekw\")'>在附近找</span></div>");
    b.push("<div id='iw_tab0' class='nav_tab_content' style='display:" + m[0] + "'>");
    b.push("<form id='iw_s_frm'>");
    b.push("<p>起点： <input id='iw_ssn' type='text' size='22' maxlength='100' autocomplete='off' /></p>");
    b.push("<div class='ic'><span><input type='submit' value='公交' />");
    b.push("<input id='iw_ssd_btn' type='button' class='lst' value='驾车' /></span></div>");
    b.push("</form></div>");
    b.push("<div id='iw_tab1' class='nav_tab_content' style='display:" + m[1] + "'>");
    b.push("<form id='iw_e_frm'>");
    b.push("<p>终点： <input id='iw_esn' type='text' size='22' maxlength='100' autocomplete='off'/></p>");
    b.push("<div class='ic'><span><input type='submit' value='公交'/>");
    b.push("<input id='iw_esd_btn' type='button' class='lst' value='驾车' /></span></div>");
    b.push("</form></div>");
    b.push("<div id='iw_tab2' class='nav_tab_content' style='display:" + m[2] + "'>");
    b.push("<div class='iw_cate_list'>");
    var c = ["ATM", "银行", "宾馆", "餐馆", "加油站", "迅驰技术"];
    if (k) {
        for (var y = 0, w = c.length; y < w; y++) {
            if (y == 0) {
                b.push(generateSingleLink(c[y], k, "", v, true))
            } else {
                b.push(generateSingleLink(c[y], k, "", v))
            }
        }
    } else {
        for (var y = 0, w = c.length; y < w; y++) {
            if (y == 0) {
                b.push(generateSingleLinkForRange(c[y], (t.x + "," + t.y), "", v, true))
            } else {
                b.push(generateSingleLinkForRange(c[y], (t.x + "," + t.y), "", v))
            }
        }
    }
    b.push('<img style="margin-left:2px;vertical-align:0;border:0" src="img/intel.gif" alt="intel" />');
    b.push("</div>");
    b.push("<div class='mt10'>");
    if (k) {
        b.push('<form onsubmit=\'roundSearchByInput("rangekw", "' + k + '", null, ' + v + ");return false'>")
    } else {
        b.push('<form onsubmit=\'rangeSearchByInput("rangekw", ' + t.x + ", " + t.y + ", null, + " + v + ", null, true);return false'>")
    }
    b.push("其他：<input id='rangekw' type='text' size='19' maxLength='100' autocomplete='off' /> ");
    b.push("<input type='submit' value='搜索' />");
    b.push("</form></div></div>");
    b.push("</div>");
    var j = [0, -26];
    if (t.forBusLine) {
        j[1] = -5
    }
    var d = new BMap.InfoWindow(b.join(""), {
        title: a,
        height: 0,
        width: x,
        offset: j,
        margin: [10, 10, 20, 10]
    });
    d._config.collisions = openSearchInfoWnd._colls;
    d._ext = {
        uid: k,
        pt: new BMap.Point(t.x, t.y),
        name: A,
        c: v,
        poiType: u
    };
    d.addEventListener("open", 
    function() {
        if (map.infoWindow.closeButton) {
            Fe.on(map.infoWindow.closeButton, "click", 
            function() {
                addStat(STAT_POP_CLOSED_N)
            })
        }
        d.removeEventListener("open", arguments.callee)
    });
    return d
}
function openSearchInfoWnd(c, a, b) {
    if (!b) {
        var b = {}
    }
    if (c && c.toString() == "InfoWindow" && a.toString() == "Marker") {
        addStat(STAT_POP_NORM);
        a.openInfoWindow(c, b);
        if (typeof bdMapSuggest != "undefined") {
            c.iw_sugg_0 = new bdMapSuggest({
                inputid: "iw_ssn",
                offset: [1, 0],
                closeB: 1,
                qType: 2,
                cityid: c._ext.c
            },
            function(d) {
                c._ext.wd2 = d
            });
            c.iw_sugg_1 = new bdMapSuggest({
                inputid: "iw_esn",
                offset: [1, 0],
                closeB: 1,
                qType: 2,
                cityid: c._ext.c
            },
            function(d) {
                c._ext.wd2 = d
            })
        }
        c.addEventListener("close", 
        function() {
            if (c.iw_sugg_0) {
                c.iw_sugg_0.disposeSug();
                c.iw_sugg_0 = null
            }
            if (c.iw_sugg_1) {
                c.iw_sugg_1.disposeSug();
                c.iw_sugg_1 = null
            }
            c.removeEventListener("close", arguments.callee)
        });
        Fe.on(Fe.G("iw_s_frm"), "submit", 
        function(i) {
            i = window.event || i;
            var g = c._ext || {};
            if (Fe.G("iw_ssn") && !Fe.G("iw_ssn").value) {
                Fe.G("iw_ssn").focus()
            } else {
                var j = "";
                var f = 1;
                if (g.poiType == POI_TYPE_BUSSTOP || g.poiType == POI_TYPE_SUBSTOP) {
                    f = 0
                }
                j = "&en=" + f + "$$" + g.uid + "$$" + g.pt.lng + "," + g.pt.lat + "$$" + g.name + "$$$$$$";
                var d = g.wd2 ? 1: 0;
                var h = "bse&c=" + g.c + "&wd=" + encodeURIComponent(Fe.G("iw_ssn").value) + "&isSingle=true&t=0&name=" + encodeURIComponent(g.name) + "&uid=" + g.uid + "&ptx=" + g.pt.lng + "&pty=" + g.pt.lat + "&poiType=" + g.poiType + j + "&sug=" + d + "&wd2=" + encodeURIComponent(g.wd2 || "");
                h = h + "&bsetp=0&req=" + encodeURIComponent(h);
                g.wd2 = null;
                go(h, {
                    cinfo: {
                        q: h,
                        isSingle: true,
                        t: 0,
                        kwn: {
                            name: g.name,
                            uid: g.uid,
                            pt: g.pt,
                            poiType: g.poiType
                        }
                    }
                })
            }
            i.returnValue = false
        });
        Fe.on(Fe.G("iw_e_frm"), "submit", 
        function(i) {
            i = window.event || i;
            var g = c._ext || {};
            if (Fe.G("iw_esn") && !Fe.G("iw_esn").value) {
                Fe.G("iw_esn").focus()
            } else {
                var j = "";
                var f = 1;
                if (g.poiType == POI_TYPE_BUSSTOP || g.poiType == POI_TYPE_SUBSTOP) {
                    f = 0
                }
                j = "&sn=" + f + "$$" + g.uid + "$$" + g.pt.lng + "," + g.pt.lat + "$$" + g.name + "$$$$$$";
                var d = g.wd2 ? 1: 0;
                var h = "bse&c=" + g.c + "&wd=" + encodeURIComponent(Fe.G("iw_esn").value) + "&isSingle=true&t=1&name=" + encodeURIComponent(g.name) + "&uid=" + g.uid + "&ptx=" + g.pt.lng + "&pty=" + g.pt.lat + "&poiType=" + g.poiType + j + "&sug=" + d + "&wd2=" + encodeURIComponent(g.wd2 || "");
                h = h + "&bsetp=1&req=" + encodeURIComponent(h);
                g.wd2 = null;
                go(h, {
                    cinfo: {
                        q: h,
                        isSingle: true,
                        t: 1,
                        kwn: {
                            name: g.name,
                            uid: g.uid,
                            pt: g.pt,
                            poiType: g.poiType
                        }
                    }
                })
            }
            i.returnValue = false
        });
        Fe.on(Fe.G("iw_ssd_btn"), "click", 
        function() {
            var g = c._ext || {};
            if (Fe.G("iw_ssn") && !Fe.G("iw_ssn").value) {
                Fe.G("iw_ssn").focus()
            } else {
                var i = "";
                var f = 1;
                if (g.poiType == POI_TYPE_BUSSTOP || g.poiType == POI_TYPE_SUBSTOP) {
                    f = 0
                }
                i = "&en=" + f + "$$" + g.uid + "$$" + g.pt.lng + "," + g.pt.lat + "$$" + g.name + "$$$$$$";
                var d = g.wd2 ? 1: 0;
                var h = "nse&c=" + g.c + "&wd=" + encodeURIComponent(Fe.G("iw_ssn").value) + "&isSingle=true&t=0&name=" + encodeURIComponent(g.name) + "&uid=" + g.uid + "&ptx=" + g.pt.lng + "&pty=" + g.pt.lat + "&poiType=" + g.poiType + i + "&sug=" + d + "&wd2=" + encodeURIComponent(g.wd2 || "");
                h = h + "&nsetp=0&req=" + encodeURIComponent(h);
                g.wd2 = null;
                go(h, {
                    cinfo: {
                        q: h,
                        c: g.c,
                        isSingle: true,
                        t: 0,
                        kwn: {
                            name: g.name,
                            uid: g.uid,
                            pt: g.pt,
                            poiType: g.poiType
                        }
                    }
                })
            }
        });
        Fe.on(Fe.G("iw_esd_btn"), "click", 
        function() {
            var g = c._ext || {};
            if (Fe.G("iw_esn") && !Fe.G("iw_esn").value) {
                Fe.G("iw_esn").focus()
            } else {
                var i = "";
                var f = 1;
                if (g.poiType == POI_TYPE_BUSSTOP || g.poiType == POI_TYPE_SUBSTOP) {
                    f = 0
                }
                i = "&sn=" + f + "$$" + g.uid + "$$" + g.pt.lng + "," + g.pt.lat + "$$" + g.name + "$$$$$$";
                var d = g.wd2 ? 1: 0;
                var h = "nse&c=" + g.c + "&wd=" + encodeURIComponent(Fe.G("iw_esn").value) + "&isSingle=true&t=1&name=" + encodeURIComponent(g.name) + "&uid=" + g.uid + "&ptx=" + g.pt.lng + "&pty=" + g.pt.lat + "&poiType=" + g.poiType + i + "&sug=" + d + "&wd2=" + encodeURIComponent(g.wd2 || "");
                h = h + "&nsetp=1&req=" + encodeURIComponent(h);
                g.wd2 = null;
                go(h, {
                    cinfo: {
                        q: h,
                        c: g.c,
                        isSingle: true,
                        t: 1,
                        kwn: {
                            name: g.name,
                            uid: g.uid,
                            pt: g.pt,
                            poiType: g.poiType
                        }
                    }
                })
            }
        })
    }
}
openSearchInfoWnd._colls = [[65, 245], [233, 39], [10, 10], [10, 10]];
openSearchInfoWnd._MAX_BTN_W_IN_FSM = 233 + 25;
function setInfoWndCollisions(b, a) {
    var c = openSearchInfoWnd._colls;
    if (!b || b && b.length == 0) {
        if (a == 1) {
            if (!Fe.G("trafficBut") || Fe.G("trafficBut") && Fe.G("trafficBut").style.display == "none" || Fe.G("trafficBut") && Fe.G("trafficBut").style.visibility == "hidden") {
                openSearchInfoWnd._colls[1] = [159, 39]
            } else {
                openSearchInfoWnd._colls[1] = [233, 39]
            }
        }
        if (map.fullScreenMode) {
            openSearchInfoWnd._colls[1][0] = openSearchInfoWnd._colls[1][0] + 25;
            openSearchInfoWnd._colls[1][1] = openSearchInfoWnd._colls[1][1] + 25
        }
    } else {
        if (map.fullScreenMode && a == 1 && b[0] < openSearchInfoWnd._MAX_BTN_W_IN_FSM) {
            b[0] = openSearchInfoWnd._MAX_BTN_W_IN_FSM
        }
        openSearchInfoWnd._colls[a] = b.slice(0)
    }
}
function generateSingleLink(f, a, c, b, d) {
    if (!d) {
        return "<a href='javascript:void(0)' onclick='roundSearchByLink(this, \"" + a + '", "' + c + '", ' + b + ")'>" + f + "</a>"
    } else {
        return "<a href='javascript:void(0)' onclick='roundSearchByLink(this, \"" + a + '", "' + c + '", ' + b + ")' class='first'>" + f + "</a>"
    }
}
function generateSingleLinkForRange(f, d, b, a, c) {
    if (!c) {
        return "<a href='javascript:void(0)' onclick='rangeSearchByLink(this, " + d + ', "' + b + '", ' + a + ", null, true)'>" + f + "</a>"
    } else {
        return "<a href='javascript:void(0)' onclick='rangeSearchByLink(this, " + d + ', "' + b + '", ' + a + ", null, true)' class='first'>" + f + "</a>"
    }
}
function roundSearchByLink(c, d, g, f, b) {
    if (c.nodeName.toLowerCase() == "a") {
        var h = c.innerHTML;
        if (h) {
            var a = b || 0;
            roundSearchByValue(h, d, g, f, a)
        }
    }
}
function roundSearchByInput(b, d, g, f, c) {
    if (Fe.G(b)) {
        if (Fe.G(b).value) {
            var a = c || 1;
            roundSearchByValue(Fe.G(b).value, d, g, f, a)
        } else {
            Fe.G(b).focus();
            return false
        }
    }
}
function roundSearchByValue(g, b, f, d, a) {
    if (g) {
        var c = 2000;
        if (f && Fe.G(f)) {
            c = Fe.G(f).value
        }
        roundSearch(b, {
            r: c,
            c: d,
            wd: encodeURIComponent(g),
            nbtp: a
        })
    }
}
function roundSearch(b, d) {
    var f = "";
    for (var a in d) {
        if (typeof d[a] != "undefined") {
            f = f + "&" + a + "=" + d[a]
        }
    }
    var c = "nb" + f + "&uid=" + b;
    go(c)
}
function rangeSearchByInput(c, b, i, h, g, f, d) {
    if (Fe.G(c)) {
        if (Fe.G(c).value) {
            var a = f || 1;
            rangeSearchByValue(Fe.G(c).value, b, i, h, g, a, d)
        } else {
            Fe.G(c).focus()
        }
    }
}
function rangeSearchByLink(d, i, g, a, h, j, f) {
    if (d.nodeName.toLowerCase() == "a") {
        var b = d.innerHTML;
        if (b) {
            var c = j || 0;
            rangeSearchByValue(b, i, g, a, h, c, f)
        }
    }
}
function rangeSearchByValue(m, l, i, a, k, n, g) {
    if (m) {
        var b = 2000;
        if (a && Fe.G(a)) {
            b = Fe.G(a).value
        }
        l = l * 1;
        i = i * 1;
        b = b * 1;
        var f = l - b;
        var j = i - b;
        var c = l + b;
        var h = i + b;
        var d = "(" + f + "," + j + ";" + c + "," + h + ")";
        rangeSearch({
            ar: d,
            wd: encodeURIComponent(m),
            c: k,
            bdtp: n
        },
        new BMap.Point(l, i), b);
        if (g) {
            addStat(STAT_CM_ROUND)
        }
    }
}
function rangeSearch(f, a, d) {
    if (!f) {
        return
    }
    var g = "";
    for (var b in f) {
        if (typeof f[b] != "undefined") {
            g = g + "&" + b + "=" + f[b]
        }
    }
    var c = "?bd" + g;
    go("tpl:PoiSearch" + c + "&r=" + d, {
        cinfo: {
            searchByContextMenu: true,
            centerPoint: a,
            radius: d
        }
    })
}
function searchDrv(c, g, b) {
    var d = "";
    var a = "";
    if (c == 0) {
        d = Fe.G(g).value;
        if (!d) {
            Fe.G(g).focus();
            return
        }
        a = b
    } else {
        if (c == 1) {
            d = g;
            a = Fe.G(b).value;
            if (!a) {
                Fe.G(b).focus();
                return
            }
        }
    }
    if (!d || !a) {
        return
    }
    var f = modelConfig.cityCode;
    go("nav&c=" + f + "&sc=" + f + "&ec=" + f + "&sn=2$$$$$$" + encodeURIComponent(d) + "$$$$$$&en=2$$$$$$" + encodeURIComponent(a) + "$$$$$$")
}
function switchInfoWndTab(f, k, a, h) {
    var j = [Fe.G("nav_tab0"), Fe.G("nav_tab1"), Fe.G("nav_tab2")];
    var c = [Fe.G("iw_tab0"), Fe.G("iw_tab1"), Fe.G("iw_tab2")];
    if (j[f] && j[f].className.match(/hover/) && !a) {
        return
    }
    Fe.ac(j[f], "hover");
    if (h) {
        setTimeout(function() {
            addStat(STAT_PTAB_FROMHERE + f)
        },
        2000)
    } else {
        addStat(STAT_PTAB_FROMHERE + f)
    }
    if (c[f]) {
        c[f].style.display = "block"
    }
    for (var d = 0, b = j.length; d < b; d++) {
        if (d != f) {
            Fe.rc(j[d], "hover");
            c[d].style.display = "none"
        }
    }
    if (k && Fe.G(k)) {
        try {
            Fe.G(k).focus()
        } catch(g) {
            setTimeout(function() {
                try {
                    Fe.G(k).focus()
                } catch(i) {}
            },
            100)
        }
    }
}
function createRangeInfoWnd(a) {
    if (!a) {
        return
    }
    return createSearchInfoWnd({
        title: "未知地点",
        poiType: 0
    },
    {
        x: a.lng,
        y: a.lat,
        tabIndex: 2
    })
}
function exitRangeSearch() {
    if (rangeSearchCenterMarker) {
        rangeSearchCenterMarker.remove();
        rangeSearchCenterMarker = null
    }
}
function createTransInfoWnd(d) {
    var p = d.title;
    var n = d.content;
    var a = d.curIndex;
    var o = d.total;
    var h = d.nextInfo;
    var g = d.nextTransCbk;
    var m = d.zoomTransCbk;
    var k = d.obj;
    if (!p) {
        return
    }
    var l = p;
    if (l.replace(/[\u0100-\uffff]/g, "##").length > 26) {
        l = l.substring(0, 12) + "..."
    }
    var j = ["<p class='iw_poi_title' title='" + p + "'>" + l];
    j.push('<a id="trans_zoom_out" style="display:none" href="javascript:void(0)">缩小</a>');
    j.push('<a id="trans_zoom_in" href="javascript:void(0)">放大</a></td>');
    j.push("</p>");
    var q = ["<div class='iw_poi_content'>"];
    if (n) {
        q.push("<div class='iw_trans_content'>" + n + "</div>")
    }
    q.push('<table width="99%" cols="2" class="iw_trans_nav"><tbody><tr>');
    q.push('<td nowrap="nowrap" width="50%" align="left">');
    if (a == 0) {
        q.push('<span class="trans_disabled" >上一步</span>')
    } else {
        q.push('<a id="trans_prev" href="javascript:void(0)">上一步</a>')
    }
    q.push("</td>");
    q.push('<td nowrap="nowrap" width="50%" align="right">');
    if (a == o - 1) {
        q.push('<span class="trans_disabled" >下一步</span>')
    } else {
        var c = h;
        if (c.replace(/[\u0100-\uffff]/g, "##").length > 25) {
            c = c.substring(0, 11) + "..."
        }
        q.push('<a id="trans_next" href="javascript:void(0)">下一步</a><span style="color:#6b6b6b" title="' + h + '">(' + c + ")</span>")
    }
    q.push("</td></tr></tbody></table>");
    var i = [0, -10];
    if (a == 0 || a == o - 1) {
        i[1] = -30
    }
    var f = new BMap.InfoWindow(q.join(""), {
        title: j.join(""),
        height: 0,
        width: 240,
        offset: i,
        margin: [10, 10, 20, 10]
    });
    f._config.collisions = openSearchInfoWnd._colls;
    f.addEventListener("open", 
    function() {
        if (map.infoWindow.closeButton) {
            Fe.on(map.infoWindow.closeButton, "click", 
            function() {
                addStat(STAT_POP_CLOSED_D)
            })
        }
        f.removeEventListener("open", arguments.callee)
    });
    f.addEventListener("open", 
    function() {
        Fe.on(Fe.G("trans_prev"), "click", 
        function() {
            if (g && typeof g == "function") {
                g(a - 1, k)
            }
        });
        Fe.on(Fe.G("trans_next"), "click", 
        function() {
            if (g && typeof g == "function") {
                g(a + 1, k)
            }
        });
        Fe.on(Fe.G("trans_zoom_in"), "click", 
        function() {
            if (m && typeof m == "function") {
                m(0, k)
            }
            Fe.G("trans_zoom_in").style.display = "none";
            Fe.G("trans_zoom_out").style.display = "inline"
        });
        Fe.on(Fe.G("trans_zoom_out"), "click", 
        function() {
            if (m && typeof m == "function") {
                m(1, k)
            }
            Fe.G("trans_zoom_in").style.display = "inline";
            Fe.G("trans_zoom_out").style.display = "none"
        });
        b()
    });
    var b = function() {
        if (map.zoomLevel == BMap.MapType[map.mapType].zoomLevelMax) {
            if (Fe.G("trans_zoom_in")) {
                Fe.G("trans_zoom_in").style.display = "none";
                Fe.G("trans_zoom_out").style.display = "inline"
            }
        } else {
            if (Fe.G("trans_zoom_out")) {
                Fe.G("trans_zoom_in").style.display = "inline";
                Fe.G("trans_zoom_out").style.display = "none"
            }
        }
    };
    map.addEventListener("zoomend", b);
    f.addEventListener("close", 
    function() {
        map.removeEventListener("zoomend", b)
    });
    return f
}
function createContextMenu(d, c, h) {
    var a = new BMap.ContextMenu({
        container: c
    });
    if (!c || c === map) {
        map.addContextMenu(a)
    } else {
        a.initialize(map)
    }
    for (var f = 0, b = d.length; f < b; f++) {
        var g = d[f];
        if (!g.separator) {
            a.addItem(new BMap.MenuItem(g.text, g.callback || 
            function() {},
            g.width || 100, g.id))
        } else {
            a.addDivider()
        }
    }
    a.setCursor(h);
    return a
}
function destroyContextMenu(a) {
    if (a && a.destroy) {
        a.destroy();
        a = null
    }
}
function setSearchResult(a) {
    if (Fe.G("rcInfo")) {
        Fe.G("rcInfo").innerHTML = a
    }
}
function showLoading(b) {
    var a = Fe.G("loading");
    if (a) {
        a.innerHTML = b || "正在加载地图，请稍候...";
        a.style.display = "inline";
        if (map) {
            a.style.left = (map.width - 170) / 2 + "px";
            a.style.top = (map.height - 20) / 2 + 119 + "px"
        }
    }
}
function hideLoading() {
    if (Fe.G("loading")) {
        Fe.G("loading").style.display = "none"
    }
}
function addDrRoute(C, g) {
    if (!window.dropRoutes) {
        window.dropRoutes = []
    }
    if (g.tempRoute) {
        unSelectRoute(g.tempRoute);
        removeRoute(g.tempRoute)
    }
    g.onRemoveTips();
    g.mapZoomLevel = map.zoomLevel;
    if (g.driveBounds.length > 0) {
        var A = getBPoints(g.driveBounds);
        if (g.drag == 0 && !C) {
            map.getBestMap(A, 60)
        }
        g.drag = 0
    }
    var h = Math.pow(2, BMap.MapType[map.mapType].zoomLevelMax - map.zoomLevel - 5);
    var w = g.routePoints;
    var c = map.pixelToPoint({
        x: -map.width * 3,
        y: map.height * 3
    });
    var b = map.pixelToPoint({
        x: map.width * 3,
        y: -map.height * 3
    });
    var t = new BMap.Bounds(c.lng, c.lat, b.lng, b.lat);
    for (var D = 0; D < w.length; D++) {
        var E = w[D];
        var q = [];
        var o = new Date().getTime();
        for (var z = 0; z < E.length; z++) {
            if (t.intersects(g.s2Bounds(E[z].b))) {
                var u = E[z].p;
                var a = 2;
                var B = parse2Points(u, h);
                var p = [];
                var v = B.split(",");
                for (var m = 0; m < v.length; m += 2) {
                    var f = v[m];
                    var d = v[m + 1];
                    var k = new BMap.Point(f, d);
                    if (t.containsPoint(k)) {
                        q.push(k)
                    }
                }
            }
        }
        var F = new Date().getTime();
        if (!g.draging && g.sended == 0) {
            var H = g;
            if (C == false) {
                var G = addRoute(q, ROUTE_TYPE_DRIVE);
                G.index = D;
                G.addEventListener("onmouseover", 
                function(i) {
                    H.onRouteOver(i)
                });
                G.addEventListener("onmousemove", 
                function(i) {
                    H.removeTimer(i)
                });
                G.addEventListener("onmouseout", 
                function(i) {
                    H.onRouteOut(i)
                });
                window.dropRoutes.push(G)
            } else {
                var r = window.dropRoutes[D];
                if (r) {
                    r.setPoints(q)
                }
            }
        }
    }
}
function showDetail(b, a, d) {
    var c = "http://" + window.location.host + window.location.pathname;
    if (a == POI_TYPE_BUSLINE || a == POI_TYPE_SUBLINE) {
        c += "?newmap=1&s=" + encodeURIComponent("bsl&bsltp=0&uid=" + b + "&c=" + d + "&newmap=1")
    } else {
        c += "?newmap=1&s=" + encodeURIComponent("inf&uid=" + b + "&c=" + d + "&newmap=1&it=" + STAT_INF_NORMAL)
    }
    window.open(c)
}
function Page(a, f, b) {
    Fe.BaseClass.call(this);
    if (!a) {
        return
    }
    this.container = (typeof(a) == "object") ? a: Fe.G(a);
    this.page = 1;
    this.pageCount = 100;
    this.argName = "pg";
    this.pagecap = 4;
    this.callback = f;
    this.update = true;
    var c = {
        page: 1,
        totalCount: 100,
        pageCount: 100,
        pagecap: 4,
        argName: "pg",
        update: true
    };
    if (!b) {
        b = c
    }
    for (var d in b) {
        if (typeof(b[d]) != "undefined") {
            this[d] = b[d]
        }
    }
    this.render()
}
Fe.extend(Page.prototype, {
    render: function() {
        this.initialize()
    },
    initialize: function() {
        this.checkPages();
        this.container.innerHTML = this.createHtml()
    },
    checkPages: function() {
        if (isNaN(parseInt(this.page))) {
            this.page = 1
        }
        if (isNaN(parseInt(this.pageCount))) {
            this.pageCount = 1
        }
        if (this.page < 1) {
            this.page = 1
        }
        if (this.pageCount < 1) {
            this.pageCount = 1
        }
        if (this.page > this.pageCount) {
            this.page = this.pageCount
        }
        this.page = parseInt(this.page);
        this.pageCount = parseInt(this.pageCount)
    },
    getPage: function() {
        var b = location.search;
        var c = new RegExp("[?&]?" + this.argName + "=([^&]*)[&$]?", "gi");
        var a = b.match(c);
        this.page = RegExp.$1
    },
    createHtml: function() {
        var h = [],
        c = this.page - 1,
        b = this.page + 1;
        h.push('<p class="page">');
        if (c < 1) {} else {
            if (this.page >= this.pagecap) {
                h.push('<span><a href="javascript:void(0)" onclick="Instance(\'' + this.hashCode + "').toPage(1);\">首页</a></span>")
            }
            h.push('<span><a href="javascript:void(0)" onclick="Instance(\'' + this.hashCode + "').toPage(" + c + ');">上一页</a></span>')
        }
        if (this.page < this.pagecap) {
            if (this.page % this.pagecap == 0) {
                var g = this.page - this.pagecap - 1
            } else {
                var g = this.page - this.page % this.pagecap + 1
            }
            var a = g + this.pagecap - 1
        } else {
            var j = Math.floor(this.pagecap / 2);
            var f = this.pagecap % 2 - 1;
            if (this.pageCount > this.page + j) {
                var a = this.page + j;
                var g = this.page - j - f
            } else {
                var a = this.pageCount;
                var g = this.page - j - f
            }
        }
        if (this.page > this.pageCount - this.pagecap && this.page >= this.pagecap) {
            var g = this.pageCount - this.pagecap + 1;
            var a = this.pageCount
        }
        for (var d = g; d <= a; d++) {
            if (d > 0) {
                if (d == this.page) {
                    h.push("<span>" + d + "</span>")
                } else {
                    if (d >= 1 && d <= this.pageCount) {
                        h.push('<span><a href="javascript:void(0)" onclick="Instance(\'' + this.hashCode + "').toPage(" + d + ');">[' + d + "]</a></span>")
                    }
                }
            }
        }
        if (b > this.pageCount) {} else {
            h.push('<span><a href="javascript:void(0)" onclick="Instance(\'' + this.hashCode + "').toPage(" + b + ');">下一页</a></span>')
        }
        h.push("</p>");
        return h.join("")
    },
    toPage: function(b) {
        var a = b ? b: 1;
        if (typeof(this.callback) == "function") {
            this.callback(a);
            this.page = a
        }
        if (this.update) {
            this.render()
        }
    }
});
Object.extend = function(a, c) {
    for (var b in c) {
        a[b] = c[b]
    }
    return a
};
Object.extend(Object, {
    clone: function(a) {
        return Object.extend({},
        a)
    }
});
var Class = function() {
    var a = function() {
        this.initialize.apply(this, arguments)
    };
    for (var b = 0; b < arguments.length; b++) {
        var c = arguments[b];
        for (var d in c.prototype) {
            a.prototype[d] = c.prototype[d]
        }
    }
    a.child = function() {
        return new Class(this)
    };
    a.extend = function(f) {
        for (var g in f) {
            a.prototype[g] = f[g]
        }
    };
    return a
};
Function.prototype.bindAsEventListener = function(b) {
    var a = this;
    return function(c) {
        a.call(b, c || window.event)
    }
};
function proxy() {
    var c = [];
    for (var b = 0, a = arguments.length; b < a; b++) {
        c[b] = arguments[b]
    }
    var d = c[0];
    c.shift();
    return function() {
        d.apply(null, c)
    }
}
function BMAddEvent(c, b, a) {
    if (typeof(window.attachEvent) != "undefined") {
        c.attachEvent("on" + b, a)
    } else {
        if (window.addEventListener) {
            c.addEventListener(b, a, true)
        }
    }
}
var bdMapSuggest = new Class();
bdMapSuggest.prototype = {
    GE: function(a) {
        return document.getElementById(a)
    },
    C: function(a) {
        return document.createElement(a)
    },
    clktr: function(d) {
        var g = false;
        if (d.id) {
            var c = d.id.split("__")[2];
            if ((this.qType == 0 || this.qType == 2) && c > -1 && this.SD != null) {
                var a = this.SD.s[c];
                if (a.split("$")[3] != "" && !!this.callback) {
                    g = true;
                    this.setValue(d.cells[2].childNodes[0].nodeValue);
                    if (typeof(this.callback) == "function") {
                        if (this.qType == 0 || this.qType == 2) {
                            this.callback(d.cells[3].innerHTML, true)
                        } else {
                            this.callback(d.cells[2].childNodes[0].nodeValue, true)
                        }
                    }
                }
                if (a.split("$")[3] != "") {
                    g = true;
                    this.setValue(d.cells[2].childNodes[0].nodeValue)
                } else {
                    g = true;
                    this.setValue(d.cells[2].childNodes[0].nodeValue);
                    var b = "";
                    try {
                        b = d.cells[3].childNodes[0].nodeValue + d.cells[2].childNodes[0].nodeValue
                    } catch(f) {
                        b = d.cells[3].innerHTML + d.cells[2].innerHTML
                    }
                    if (typeof(this.callback) == "function") {
                        this.callback(d.cells[3].innerHTML, false)
                    }
                    setTimeout(proxy(this.sendQuery.bindAsEventListener(this), b), 200)
                }
            }
        }
        if (!g) {
            this.cs();
            this.sub(d.cells[2].childNodes[0].nodeValue)
        }
    },
    sub: function(a) {
        this.I.value = a
    },
    csc: function() {
        this.cs();
        this.I.blur();
        this.I.focus();
        if (navigator.cookieEnabled && Fe.Cookie.get(this.cookieN) != "1") {
            Fe.Cookie.set(this.cookieN, "1", {
                domain: "map.baidu.com",
                expires: 946080000000
            })
        }
        addStat(STAT_SUGG_CLOSE);
        if (typeof(this.closeSuggest) == "function") {
            this.closeSuggest()
        }
    },
    trMouseOver: function(a) {
        this.ct();
        a.className = "mo";
        this.mouseOnSug = true
    },
    trMouseDown: function() {
        this.E = true;
        if (!this.isIE) {
            e.stopPropagation();
            return false
        }
    },
    trOnclick: function(a, b) {
        this.clktr(a, b);
        this.I.focus()
    },
    setSug: function() {
        if (typeof(this.SD) != "object" || typeof(this.SD.s) == "undefined") {
            return
        }
        var tab = this.C("table");
        with(tab) {
            id = "bdmap_sugt_" + this.sgId;
            style.backgroundColor = "#fff";
            cellSpacing = 0;
            cellPadding = 1;
            style.cursor = "default"
        }
        var tb = this.C("tbody");
        tab.appendChild(tb);
        var regStr = this.I.value.replace(/\|/ig, "[|]");
        var reExp = new RegExp(regStr, "g");
        var reExp1 = "<b>" + this.I.value + "</b>";
        var ifShowFLg = false;
        for (var i = 0; i < this.SD.s.length; i++) {
            if (this.SD.t == 3 && (this.SD.s[i].split("$")[4].split(";")[0] != eval(this.cityId) || this.SD.s[i].split("$")[3] == this.I.value)) {
                continue
            }
            ifShowFLg = true;
            var tr = tb.insertRow( - 1);
            tr.id = "tr__" + this.sgId + "__" + i;
            tr.onmouseover = proxy(this.trMouseOver.bindAsEventListener(this), tr);
            tr.onmouseout = this.ct.bindAsEventListener(this);
            tr.onmousedown = this.trMouseDown.bindAsEventListener(this);
            tr.onclick = proxy(this.trOnclick.bindAsEventListener(this), tr, i);
            var td = tr.insertCell( - 1);
            var td1 = tr.insertCell( - 1);
            var td2 = tr.insertCell( - 1);
            var td3 = tr.insertCell( - 1);
            td2.style.display = "none";
            td3.style.display = "none";
            var sdwords = this.SD.s[i].split("$");
            switch (this.SD.t) {
            case 0:
                td1.style.display = "none";
                var keywordStr = "";
                if (sdwords[3] == "") {
                    if (sdwords[2].toLowerCase().indexOf(this.I.value.toLowerCase()) > -1) {
                        keywordStr = sdwords[2];
                        td.innerHTML = sdwords[2].replace(reExp, reExp1) + '&nbsp;<span class="spoi1">' + sdwords[0] + sdwords[1] + "</span>";
                        td3.innerHTML = sdwords[0] + sdwords[1]
                    } else {
                        if (sdwords[1].toLowerCase().indexOf(this.I.value.toLowerCase()) > -1 || (sdwords[1] + sdwords[2]).toLowerCase().indexOf(this.I.value.toLowerCase()) > -1) {
                            keywordStr = sdwords[1] + sdwords[2];
                            td.innerHTML = (sdwords[1] + sdwords[2]).replace(reExp, reExp1) + '&nbsp;<span class="spoi1">' + sdwords[0] + "</span>";
                            td3.innerHTML = sdwords[0]
                        } else {
                            keywordStr = sdwords[0] + sdwords[1] + sdwords[2];
                            td.innerHTML = (sdwords[0] + sdwords[1] + sdwords[2]).replace(reExp, reExp1);
                            td3.innerHTML = ""
                        }
                    }
                } else {
                    keywordStr = sdwords[3];
                    td.innerHTML = sdwords[3].replace(reExp, reExp1) + '&nbsp;<span class="spoi1">' + (sdwords[0] + sdwords[1]).replace(reExp, reExp1) + "</span>";
                    td3.innerHTML = sdwords[0] + sdwords[1] + sdwords[2]
                }
                td2.innerHTML = keywordStr;
                break;
            case 1:
                td1.style.display = "none";
                if (sdwords[1] != "") {
                    td.innerHTML = (sdwords[0] + sdwords[1]).replace(reExp, reExp1);
                    td2.innerHTML = sdwords[0] + sdwords[1]
                }
                break;
            case 2:
                td1.style.display = "none";
                var keywordStr = "";
                if (sdwords[3] == "") {
                    if (sdwords[2].toLowerCase().indexOf(this.I.value.toLowerCase()) > -1) {
                        keywordStr = sdwords[2];
                        td.innerHTML = sdwords[2].replace(reExp, reExp1) + '&nbsp;<span class="spoi1">' + sdwords[0] + sdwords[1] + "</span>";
                        td3.innerHTML = sdwords[0] + sdwords[1]
                    } else {
                        if (sdwords[1].toLowerCase().indexOf(this.I.value.toLowerCase()) > -1 || (sdwords[1] + sdwords[2]).toLowerCase().indexOf(this.I.value.toLowerCase()) > -1) {
                            keywordStr = sdwords[1] + sdwords[2];
                            td.innerHTML = (sdwords[1] + sdwords[2]).replace(reExp, reExp1) + '&nbsp;<span class="spoi1">' + sdwords[0] + "</span>";
                            td3.innerHTML = sdwords[0]
                        } else {
                            keywordStr = sdwords[0] + sdwords[1] + sdwords[2];
                            td.innerHTML = (sdwords[0] + sdwords[1] + sdwords[2]).replace(reExp, reExp1);
                            td3.innerHTML = ""
                        }
                    }
                } else {
                    keywordStr = sdwords[3];
                    td.innerHTML = sdwords[3].replace(reExp, reExp1) + '&nbsp;<span class="spoi1">' + (sdwords[0] + sdwords[1]).replace(reExp, reExp1) + "</span>";
                    td3.innerHTML = sdwords[0] + sdwords[1] + sdwords[2]
                }
                td2.innerHTML = keywordStr;
                break;
            case 3:
                td.innerHTML = td2.innerHTML = sdwords[3];
                td.width = 95;
                var tmpLineArr = sdwords[4].split(";");
                var lineArr = tmpLineArr[1].split(",");
                var lineStr = "";
                for (var j = lineArr.length - 1; j >= 0; j--) {
                    lineStr += '<div class="sugg_l_' + tmpLineArr[0] + " sugg_" + tmpLineArr[0] + "_l" + lineArr[j] + '"></div>'
                }
                td1.innerHTML = lineStr;
                td1.width = 55;
                break
            }
        }
        if (this.closeBol == 0) {
            var th = tb.insertRow( - 1);
            var td = th.insertCell( - 1);
            td.style.textAlign = "right";
            var oa = this.C("A");
            oa.style.textDecoration = "none";
            oa.style.color = "#0100CC";
            oa.href = "javascript:void(0)";
            oa.title = "关闭";
            oa.innerHTML = "关闭";
            oa.onclick = this.csc.bindAsEventListener(this);
            td.appendChild(oa);
            var td1 = th.insertCell( - 1);
            td1.style.display = "none";
            var td2 = th.insertCell( - 1);
            td2.style.display = "none"
        }
        this.S.innerHTML = "";
        this.S.appendChild(tab);
        this.T = this.GE("bdmap_sugt_" + this.sgId);
        if (ifShowFLg || (this.SD.t == 3 && this.SD.s.length == 1 && this.SD.s[0].split("$")[3] == this.I.value)) {
            this.setPos();
            if (this.GE("noResTip" + this.sgId)) {
                this.GE("noResTip" + this.sgId).style.display = "none"
            }
            this.ifSubmit = false
        } else {
            this.S.style.display = "none";
            if (this.isIE) {
                this.GE("bdmap_sugif_" + this.sgId).style.display = "none"
            }
            if (this.GE("noResTip" + this.sgId)) {
                var tmpRt = this.GE("noResTip" + this.sgId);
                var iPos = this.getPos(this.I);
                tmpRt.style.left = iPos[0] + this.offsetPos[0] + "px";
                tmpRt.style.top = iPos[1] + this.offsetPos[1] + parseInt(this.I.offsetHeight) + "px";
                tmpRt.innerHTML = this.nonResTip;
                tmpRt.style.display = ""
            }
            this.ifSubmit = true
        }
        this.c = -1;
        this.s3 = ""
    },
    setPos: function() {
        this.S.style.top = (this.isGecko ? this.I.offsetHeight - 1: this.I.offsetHeight) + "px";
        var iPos = this.getPos(this.I);
        this.S.style.left = iPos[0] + this.offsetPos[0] + "px";
        this.S.style.top = iPos[1] + this.offsetPos[1] + parseInt(this.I.offsetHeight) + "px";
        this.S.style.display = "block";
        if (this.I.offsetWidth >= (this.T.offsetWidth + 2)) {
            this.T.style.width = (this.I.offsetWidth - 2) + "px"
        }
        if (this.isIE) {
            var sug_if = this.GE("bdmap_sugif_" + this.sgId);
            with(sug_if.style) {
                display = "";
                position = "absolute";
                left = iPos[0] + this.offsetPos[0] + "px";
                top = iPos[1] + this.offsetPos[1] + parseInt(this.I.offsetHeight) + "px";
                width = this.S.offsetWidth + "px";
                height = this.S.offsetHeight + "px"
            }
        }
    },
    resetPos: function() {
        if (this.S.style.display != "none") {
            this.setPos()
        }
    },
    ct: function() {
        var a = this.T.rows;
        for (var b = 0; b < a.length; b++) {
            a[b].className = "ml"
        }
    },
    cs: function() {
        if (this.isIE && this.GE("bdmap_sugif_" + this.sgId)) {
            this.GE("bdmap_sugif_" + this.sgId).style.display = "none"
        }
        if (this.S) {
            this.S.style.display = "none"
        }
        if (this.GE("noResTip" + this.sgId)) {
            this.GE("noResTip" + this.sgId).style.display = "none"
        }
        this.timer3 = 0;
        this.c = -1
    },
    cb: function() {
        var c = true;
        var d = this.I.value;
        if (typeof(this.T) != "undefined" && this.T != null) {
            var a = this.T.rows;
            for (var f = 0; f < a.length; f++) {
                if (a[f].className == "mo") {
                    if (d == a[f].cells[2].childNodes[0].nodeValue && !this.mouseOnSug) {
                        c = false
                    }
                }
            }
        }
        if (c && !this.K && this.S) {
            if (this.ifSend) {
                this.sendQuery()
            } else {
                this.ifSend = true
            }
        }
    },
    sendQuery: function(qString) {
        if ( !! qString) {
            this.queryWord = this.I.value;
            this.specQuery1 = true
        } else {
            this.specQuery1 = false
        }
        var pars = "/su?wd=" + encodeURIComponent(!qString ? this.I.value: qString) + "&cid=" + eval(this.cityId) + "&type=" + this.qType + "&newmap=1&t=" + new Date().getTime();
        Fe.Ajax.request(pars, this.sugCallBack.bindAsEventListener(this))
    },
    sugCallBack: function(originalRequest) {
        if (this.tooFast) {
            return
        }
        if (!originalRequest || originalRequest.responseText == "") {
            return
        }
        var jsonResults = "(" + originalRequest.responseText + ")";
        var items = eval(jsonResults);
        if (typeof(items) == "object" && typeof(items.s) != "undefined" && typeof(items.s[0]) != "undefined") {
            var singleRes = false;
            if (items.s.length == 1) {
                switch (items.t) {
                case 0:
                case 1:
                case 2:
                    if (items.s[0].replace(/\$/g, "") == this.I.value) {
                        singleRes = true
                    }
                    break;
                case 3:
                    if (items.s[0].split("$")[3] == this.I.value) {
                        singleRes = true
                    }
                    break
                }
            }
            if ((this.enterQuery || items.t == 3) && singleRes) {
                this.cs();
                this.SD = {};
                this.enterQuery = false;
                this.ifSubmit = true
            } else {
                this.SD = items;
                this.setSug()
            }
        } else {
            this.cs();
            this.SD = {};
            if (this.GE("noResTip" + this.sgId)) {
                var tmpRt = this.GE("noResTip" + this.sgId);
                var iPos = this.getPos(this.I);
                tmpRt.style.left = iPos[0] + this.offsetPos[0] + "px";
                tmpRt.style.top = iPos[1] + this.offsetPos[1] + parseInt(this.I.offsetHeight) + "px";
                tmpRt.innerHTML = this.nonResTip;
                tmpRt.style.display = ""
            }
            this.ifSubmit = true
        }
    },
    setValue: function(a) {
        this.cs();
        this.ifSend = false;
        this.I.value = a
    },
    f: function() {
        if (!this.GE(this.sgId)) {
            this.disposeSug();
            return
        }
        var a = this.I.value;
        if (a == this.s1 && a != "" && a != this.s3) {
            if (this.timer2 == 0) {
                if (navigator.cookieEnabled && Fe.Cookie.get(this.cookieN) != "1") {
                    this.timer2 = setTimeout(this.cb.bindAsEventListener(this), 100)
                } else {
                    this.s3 = a
                }
            }
        } else {
            clearTimeout(this.timer2);
            this.timer2 = 0;
            this.s1 = a;
            if (a == "") {
                this.cs()
            }
            if (this.s3 != this.I.value) {
                this.s3 = ""
            }
        }
    },
    resetSuggestion: function() {
        if (this.S.style.display != "none") {
            setTimeout(function() {
                this.cs();
                if (this.SD != null) {
                    this.setSug(this.SD);
                    this.I.focus()
                }
            },
            100)
        }
    },
    keyDownSuggest: function(g) {
        j = g || window.event;
        this.K = false;
        var h;
        if (j.keyCode == 27) {
            if (this.isIE) {
                j.returnValue = false
            } else {
                j.preventDefault()
            }
            this.I.blur();
            this.I.focus();
            return
        }
        if (j.keyCode == 13) {
            addStat(STAT_SUGG_COUNT);
            if (this.c == -1) {
                this.cs();
                this.tooFast = true;
                setTimeout(this.setTooFast.bindAsEventListener(this), 1000);
                return true
            }
            if (!this.ifSubmit) {
                if ((this.qType == 0 || this.qType == 2) && this.c > -1 && this.SD != null) {
                    var b = this.SD.s[this.c];
                    if ( !! this.callback && b.split("$")[3] != "") {
                        this.tooFast = true;
                        setTimeout(this.setTooFast.bindAsEventListener(this), 1000);
                        if (typeof(this.callback) == "function") {
                            this.callback(this.T.getElementsByTagName("TR")[this.c].cells[3].childNodes[0].nodeValue, true)
                        }
                    }
                    if (b.split("$")[3] != "") {
                        this.c = -1
                    } else {
                        this.enterQuery = true;
                        var d = "";
                        try {
                            d = this.T.getElementsByTagName("TR")[this.c].cells[3].childNodes[0].nodeValue + this.T.getElementsByTagName("TR")[this.c].cells[2].childNodes[0].nodeValue
                        } catch(j) {
                            d = this.T.getElementsByTagName("TR")[this.c].cells[3].innerHTML + this.T.getElementsByTagName("TR")[this.c].cells[2].innerHTML
                        }
                        if (typeof(this.callback) == "function") {
                            this.callback(this.T.getElementsByTagName("TR")[this.c].cells[3].innerHTML, false)
                        }
                        this.sendQuery(d)
                    }
                } else {
                    this.enterQuery = true;
                    this.sendQuery()
                }
                this.cs();
                preventDefault(j);
                return false
            } else {
                this.tooFast = true;
                setTimeout(this.setTooFast.bindAsEventListener(this), 1000);
                return true
            }
        }
        if (j.keyCode == 38 || j.keyCode == 40) {
            this.mouseOnSug = false;
            if (this.S.style.display != "none") {
                var a = this.T.rows;
                if (this.closeBol == 0) {
                    var c = a.length - 1
                } else {
                    var c = a.length
                }
                for (var f = 0; f < c; f++) {
                    if (a[f].className == "mo") {
                        this.c = f;
                        break
                    }
                }
                this.ct();
                var h;
                if (j.keyCode == 38) {
                    if (this.c == 0) {
                        if (this.specQuery1) {
                            this.I.value = this.queryWord
                        } else {
                            this.I.value = this.SD.q
                        }
                        this.c = -1;
                        this.K = true
                    } else {
                        if (this.c == -1) {
                            this.c = c
                        }
                        h = a[--this.c];
                        h.className = "mo";
                        this.I.value = h.cells[2].childNodes[0].nodeValue
                    }
                }
                if (j.keyCode == 40) {
                    if (this.c == c - 1) {
                        if (this.specQuery1) {
                            this.I.value = this.queryWord
                        } else {
                            this.I.value = this.SD.q
                        }
                        this.c = -1;
                        this.K = true
                    } else {
                        h = a[++this.c];
                        h.className = "mo";
                        this.I.value = h.cells[2].childNodes[0].nodeValue
                    }
                }
                if (!this.isIE) {
                    j.preventDefault()
                }
            }
        }
    },
    docMouseDown: function(a) {
        e = a || window.event;
        var b = e.target || e.srcElement;
        if (b == this.I) {
            return
        }
        while (b = b.parentNode) {
            if (b == this.S || b == this.I) {
                this.isClkSug = true;
                return
            }
        }
        if (this.timer3 == 0) {
            this.timer3 = setTimeout(this.cs.bindAsEventListener(this), 200)
        }
    },
    docKeyDown: function(a) {
        if (this.isGecko) {
            e = a || window.event;
            if (e.ctrlKey) {
                if (e.keyCode == 61 || e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 96 || e.keyCode == 48) {
                    this.resetSuggestion()
                }
            }
        }
    },
    beforeDeaSuggest: function() {
        if (this.E) {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
            this.E = false
        }
    },
    keyBlurSuggest: function() {
        if (!this.isClkSug) {
            if (this.timer3 == 0) {
                this.timer3 = setTimeout(this.cs.bindAsEventListener(this), 200)
            }
        }
        this.isClkSug = false
    },
    creatSugDiv: function() {
        if (!this.GE("bdmap_sug_" + this.sgId)) {
            var sugdiv = this.C("div");
            with(sugdiv) {
                id = "bdmap_sug_" + this.sgId;
                className = "sug";
                position = "absolute";
                onselectstart = "return false";
                style.display = "none";
                style.zIndex = "200"
            }
            document.body.appendChild(sugdiv)
        }
        this.S = this.GE("bdmap_sug_" + this.sgId);
        if (this.isIE) {
            var sug_if = this.C("IFRAME");
            sug_if.src = "javascript:void(0)";
            sug_if.id = "bdmap_sugif_" + this.sgId;
            with(sug_if.style) {
                display = "none";
                position = "absolute"
            }
            this.S.parentNode.insertBefore(sug_if, this.S)
        }
        if (this.qType == 3) {
            var nrtdiv = this.C("div");
            with(nrtdiv) {
                id = "noResTip" + this.sgId;
                className = "sugtip";
                position = "absolute";
                onselectstart = "return false";
                style.display = "none";
                style.zIndex = "200"
            }
            document.body.appendChild(nrtdiv)
        }
    },
    disposeSug: function() {
        clearTimeout(this.timer2);
        this.timer2 = 0;
        this.s1 = this.I.value;
        clearInterval(this.timer1);
        if (this.GE("bdmap_sug_" + this.sgId)) {
            document.body.removeChild(this.GE("bdmap_sug_" + this.sgId))
        }
        if (this.GE("noResTip" + this.sgId)) {
            document.body.removeChild(this.GE("noResTip" + this.sgId))
        }
        if (this.isIE && this.GE("bdmap_sugif_" + this.sgId)) {
            document.body.removeChild(this.GE("bdmap_sugif_" + this.sgId))
        }
        if (this.isIE && this.GE("imgLogo")) {
            this.GE("imgLogo").style.display = "block";
            this.GE("imgLogo").style.display = ""
        }
    },
    getPos: function(a) {
        var c = 0,
        b = 0;
        while (a != null) {
            c += a.offsetLeft;
            b += a.offsetTop;
            a = a.offsetParent
        }
        return [c, b]
    },
    setTooFast: function() {
        this.tooFast = false
    },
    initialize: function(a, c, b) {
        this.callback = c;
        this.closeSuggest = b;
        this.sgId = a.inputid;
        this.cookieN = a.cookiename || "bdmapsug";
        this.cityId = a.cityid || "modelConfig.cityCode";
        this.closeBol = a.closeB || 0;
        this.qType = a.qType || 0;
        this.nonResTip = "抱歉，未找到相关的车站";
        this.offsetPos = a.offset || [0, 0];
        this.closeTip = a.closeTip || 0;
        this.mouseOnSug = false;
        this.queryWord = "";
        this.ifSubmit = false;
        this.S = null;
        this.enterQuery = false;
        this.ifSend = true;
        this.I = this.GE(a.inputid);
        this.I.value = "";
        this.tooFast = false;
        this.SD;
        this.CS = null;
        this.c = -1;
        this.K = false;
        this.mouseOnSug = false;
        this.specQuery1 = false;
        this.E = false;
        this.isIE = navigator.userAgent.indexOf("MSIE") != -1 && !window.opera;
        this.isWebKit = (navigator.userAgent.indexOf("AppleWebKit/") > -1);
        this.isGecko = (navigator.userAgent.indexOf("Gecko") > -1) && (navigator.userAgent.indexOf("KHTML") == -1);
        this.timer3 = 0;
        this.T = null;
        this.s1 = "";
        this.s3 = "";
        this.timer1;
        this.timer2 = 0;
        this.isClkSug = false;
        this.I.setAttribute("autocomplete", "off");
        this.creatSugDiv();
        this.I.onblur = this.keyBlurSuggest.bindAsEventListener(this);
        this.I.onkeydown = this.keyDownSuggest.bindAsEventListener(this);
        document.onmousedown = this.docMouseDown.bindAsEventListener(this);
        document.onkeydown = this.docKeyDown.bindAsEventListener(this);
        this.I.onbeforedeactivate = this.beforeDeaSuggest.bindAsEventListener(this);
        this.s3 = this.I.value;
        this.timer1 = setInterval(this.f.bindAsEventListener(this), 10);
        BMAddEvent(window, "resize", this.resetPos.bindAsEventListener(this))
    }
};
var clickCityData = [{
    n: "北京市",
    p: "12959136.03,4825197.38",
    l: 4
},
{
    n: "昆明市",
    p: "11465436.7,2763224.69",
    l: 4
},
{
    n: "南宁市",
    p: "12133576.78,2594028.7",
    l: 4
},
{
    n: "成都市",
    p: "11685248.88,3567151.84",
    l: 4
},
{
    n: "重庆市",
    p: "11979846.38,3367582.53",
    l: 4
},
{
    n: "兰州市",
    p: "11669160.65,4184481.62",
    l: 4
},
{
    n: "银川市",
    p: "11902898.83,4506373.5",
    l: 4
},
{
    n: "石家庄市",
    p: "12917812.4,4699586.74",
    l: 4
},
{
    n: "天津市",
    p: "13148294.34,4712296.83",
    l: 4
},
{
    n: "济南市",
    p: "13084581.37,4307507.59",
    l: 4
},
{
    n: "长春市",
    p: "14021696.47,5407899.41",
    l: 4
},
{
    n: "哈尔滨市",
    p: "14186501.36,5782186.15",
    l: 4
},
{
    n: "上海市",
    p: "13553148.5,3691129.98",
    l: 4
},
{
    n: "南京市",
    p: "13334398.22,3759110.08",
    l: 4
},
{
    n: "合肥市",
    p: "13130460.54,3670544.86",
    l: 4
},
{
    n: "武汉市",
    p: "12804558.82,3438883.15",
    l: 4
},
{
    n: "杭州市",
    p: "13430521.4,3449725.46",
    l: 4
},
{
    n: "香港特别行政区",
    p: "12714333.69,2538103.92",
    l: 4
},
{
    n: "澳门特别行政区",
    p: "12642583.48,2514883.38",
    l: 4
},
{
    n: "太原市",
    p: "12529077.01,4535262.32",
    l: 4
},
{
    n: "呼和浩特市",
    p: "12439719.97,4961446.57",
    l: 4
},
{
    n: "沈阳市",
    p: "13740366.03,5103661.8",
    l: 4
},
{
    n: "福州市",
    p: "13280713.93,2989935.97",
    l: 4
},
{
    n: "南昌市",
    p: "12910017.55,3308071.83",
    l: 4
},
{
    n: "郑州市",
    p: "12648663.61,4105852.45",
    l: 4
},
{
    n: "广州市",
    p: "12609307.83,2631271.83",
    l: 4
},
{
    n: "长沙市",
    p: "12572347.48,3258455.64",
    l: 4
},
{
    n: "海口市",
    p: "12283403.23,2262634.65",
    l: 4
},
{
    n: "贵阳市",
    p: "11870519.66,3060500.8",
    l: 4
},
{
    n: "拉萨市",
    p: "10143520,3437204.04",
    l: 4
},
{
    n: "西安市",
    p: "12126852.48,4041048.13",
    l: 4
},
{
    n: "西宁市",
    p: "11330424.55,4360836.12",
    l: 4
},
{
    n: "乌鲁木齐市",
    p: "9753667.88,5409369.63",
    l: 4
},
{
    n: "北京市",
    p: "12959136.03,4825197.38",
    l: 5
},
{
    n: "天津市",
    p: "13048294.34,4712296.83",
    l: 5
},
{
    n: "上海市",
    p: "13523648.5,3641129.98",
    l: 5
},
{
    n: "重庆市",
    p: "11849846.38,3437582.53",
    l: 5
},
{
    n: "香港特别行政区",
    p: "12714333.69,2538103.92",
    l: 5
},
{
    n: "澳门特别行政区",
    p: "12642583.48,2514883.38",
    l: 5
},
{
    n: "石家庄市",
    p: "12747812.4,4559586.74",
    l: 5
},
{
    n: "唐山市",
    p: "13156656.16,4785778.65",
    l: 7
},
{
    n: "秦皇岛市",
    p: "13314894.28,4829754.58",
    l: 7
},
{
    n: "邯郸市",
    p: "12746205.45,4360272.57",
    l: 7
},
{
    n: "邢台市",
    p: "12747493.44,4423803.15",
    l: 8
},
{
    n: "保定市",
    p: "12854312.8,4677428.01",
    l: 7
},
{
    n: "张家口市",
    p: "12790084.63,4959101.33",
    l: 7
},
{
    n: "承德市",
    p: "13130326.91,4981742.46",
    l: 7
},
{
    n: "沧州市",
    p: "13007293.7,4596691.7",
    l: 7
},
{
    n: "廊坊市",
    p: "12992581.76,4769905.8",
    l: 7
},
{
    n: "衡水市",
    p: "12880175.93,4516789.37",
    l: 8
},
{
    n: "太原市",
    p: "12529077.01,4535262.32",
    l: 5
},
{
    n: "大同市",
    p: "12613364.27,4850167.42",
    l: 7
},
{
    n: "阳泉市",
    p: "12644591.26,4533525.33",
    l: 8
},
{
    n: "长治市",
    p: "12593102.2,4302896.69",
    l: 7
},
{
    n: "晋城市",
    p: "12563460.95,4206462.32",
    l: 7
},
{
    n: "朔州市",
    p: "12516827.83,4742810.65",
    l: 7
},
{
    n: "晋中市",
    p: "12552283.26,4509774.55",
    l: 8
},
{
    n: "运城市",
    p: "12358083.71,4143552.84",
    l: 7
},
{
    n: "忻州市",
    p: "12550781.32,4612328.73",
    l: 7
},
{
    n: "临汾市",
    p: "12414951.46,4288092.81",
    l: 7
},
{
    n: "吕梁市",
    p: "12373354.26,4486213.29",
    l: 7
},
{
    n: "呼和浩特市",
    p: "12439719.97,4961446.57",
    l: 5
},
{
    n: "包头市",
    p: "12228323.64,4934673.82",
    l: 7
},
{
    n: "乌海市",
    p: "11892430.44,4793517.95",
    l: 7
},
{
    n: "赤峰市",
    p: "13235547.33,5171648.96",
    l: 7
},
{
    n: "通辽市",
    p: "13611472.47,5377912.47",
    l: 7
},
{
    n: "鄂尔多斯市",
    p: "12248410.02,4812809.03",
    l: 7
},
{
    n: "呼伦贝尔市",
    p: "13333153.54,6279368.64",
    l: 7
},
{
    n: "巴彦淖尔市",
    p: "11955257.08,4947259.83",
    l: 7
},
{
    n: "乌兰察布市",
    p: "12594852.29,4984078.1",
    l: 7
},
{
    n: "兴安盟",
    p: "13588865.67,5762892.65",
    l: 7
},
{
    n: "锡林郭勒盟",
    p: "12919226.01,5426155.97",
    l: 7
},
{
    n: "阿拉善盟",
    p: "11770533.41,4674264.1",
    l: 8
},
{
    n: "沈阳市",
    p: "13740366.03,5103661.8",
    l: 5
},
{
    n: "大连市",
    p: "13538973.73,4683025.52",
    l: 7
},
{
    n: "鞍山市",
    p: "13692513.69,5000950.08",
    l: 7
},
{
    n: "抚顺市",
    p: "13799388.03,5114977.65",
    l: 8
},
{
    n: "本溪市",
    p: "13778643.21,5028229.05",
    l: 8
},
{
    n: "丹东市",
    p: "13847313.38,4857753.87",
    l: 7
},
{
    n: "锦州市",
    p: "13485599,4998700.1",
    l: 7
},
{
    n: "营口市",
    p: "13608006.02,4936051.67",
    l: 8
},
{
    n: "阜新市",
    p: "13545067.45,5136335.56",
    l: 7
},
{
    n: "辽阳市",
    p: "13712416.85,5024584.95",
    l: 8
},
{
    n: "盘锦市",
    p: "13589876.45,5002667.8",
    l: 8
},
{
    n: "铁岭市",
    p: "13787274.79,5175928.41",
    l: 7
},
{
    n: "朝阳市",
    p: "13409297.34,5069601.1",
    l: 7
},
{
    n: "葫芦岛市",
    p: "13452253.78,4942439.12",
    l: 8
},
{
    n: "长春市",
    p: "13951696.47,5407899.41",
    l: 5
},
{
    n: "吉林市",
    p: "14088310.69,5411361.75",
    l: 7
},
{
    n: "四平市",
    p: "13843448.11,5308670.02",
    l: 7
},
{
    n: "辽源市",
    p: "13931790.56,5266534.49",
    l: 8
},
{
    n: "通化市",
    p: "14020458.02,5092482.52",
    l: 7
},
{
    n: "白山市",
    p: "14074316.42,5124029.48",
    l: 8
},
{
    n: "松原市",
    p: "13896319.29,5614174.46",
    l: 7
},
{
    n: "白城市",
    p: "13675219.01,5689684.01",
    l: 7
},
{
    n: "延边朝鲜族自治州",
    p: "14417763.73,5266998.98",
    l: 7
},
{
    n: "哈尔滨市",
    p: "14086501.36,5722186.15",
    l: 5
},
{
    n: "齐齐哈尔市",
    p: "13795282.3,5969334.56",
    l: 7
},
{
    n: "鸡西市",
    p: "14580807.82,5638827.82",
    l: 7
},
{
    n: "鹤岗市",
    p: "14505601.55,5968656.02",
    l: 7
},
{
    n: "双鸭山市",
    p: "14601427.65,5854241.34",
    l: 8
},
{
    n: "大庆市",
    p: "13927324.91,5844873.47",
    l: 7
},
{
    n: "伊春市",
    p: "14350402.78,6030712.32",
    l: 7
},
{
    n: "佳木斯市",
    p: "14508059.86,5878973.81",
    l: 7
},
{
    n: "七台河市",
    p: "14584081.67,5713695.85",
    l: 7
},
{
    n: "牡丹江市",
    p: "14430063.01,5527661.89",
    l: 7
},
{
    n: "黑河市",
    p: "14196243.34,6457183.7",
    l: 7
},
{
    n: "绥化市",
    p: "14134937.47,5855417.31",
    l: 7
},
{
    n: "大兴安岭地区",
    p: "13838935.81,6763930.17",
    l: 7
},
{
    n: "南京市",
    p: "13224398.22,3749110.08",
    l: 5
},
{
    n: "无锡市",
    p: "13392933.01,3684625.08",
    l: 8
},
{
    n: "徐州市",
    p: "13046582.92,4040227.55",
    l: 7
},
{
    n: "常州市",
    p: "13356312.14,3716455.43",
    l: 7
},
{
    n: "苏州市",
    p: "13424367.52,3650025.6",
    l: 7
},
{
    n: "南通市",
    p: "13458671.66,3738891.76",
    l: 8
},
{
    n: "连云港市",
    p: "13272588.31,4085285.7",
    l: 8
},
{
    n: "淮安市",
    p: "13249614.18,3953528.85",
    l: 7
},
{
    n: "盐城市",
    p: "13377215.62,3919501.88",
    l: 7
},
{
    n: "扬州市",
    p: "13293917.59,3792837.54",
    l: 8
},
{
    n: "镇江市",
    p: "13298749.33,3767384.26",
    l: 8
},
{
    n: "泰州市",
    p: "13350640.59,3800783.56",
    l: 7
},
{
    n: "宿迁市",
    p: "13167237.96,4000367.15",
    l: 8
},
{
    n: "杭州市",
    p: "13380521.4,3509725.46",
    l: 5
},
{
    n: "宁波市",
    p: "13531717.19,3466700.47",
    l: 7
},
{
    n: "温州市",
    p: "13437056.61,3228862.38",
    l: 7
},
{
    n: "嘉兴市",
    p: "13442516.01,3578433.26",
    l: 7
},
{
    n: "湖州市",
    p: "13368882.17,3597591.37",
    l: 8
},
{
    n: "绍兴市",
    p: "13423534.39,3483350.89",
    l: 8
},
{
    n: "金华市",
    p: "13319962.71,3365440.15",
    l: 7
},
{
    n: "衢州市",
    p: "13233814.51,3347380.57",
    l: 8
},
{
    n: "舟山市",
    p: "13604984.13,3480848.35",
    l: 8
},
{
    n: "台州市",
    p: "13517355.59,3311823.54",
    l: 7
},
{
    n: "丽水市",
    p: "13350634.45,3288178.9",
    l: 8
},
{
    n: "合肥市",
    p: "13050460.54,3720544.86",
    l: 5
},
{
    n: "芜湖市",
    p: "13179464.98,3655185.37",
    l: 7
},
{
    n: "蚌埠市",
    p: "13068493.69,3861457.33",
    l: 7
},
{
    n: "淮南市",
    p: "13025559.53,3823189.84",
    l: 8
},
{
    n: "马鞍山市",
    p: "13192758.45,3701721.87",
    l: 8
},
{
    n: "淮北市",
    p: "13002797.48,3999425.85",
    l: 8
},
{
    n: "铜陵市",
    p: "13116556.18,3603277.27",
    l: 8
},
{
    n: "安庆市",
    p: "13031623.75,3550019.08",
    l: 7
},
{
    n: "黄山市",
    p: "13174278.86,3446439.23",
    l: 7
},
{
    n: "滁州市",
    p: "13171837.94,3780786.48",
    l: 8
},
{
    n: "阜阳市",
    p: "12893215.16,3858085.78",
    l: 7
},
{
    n: "宿州市",
    p: "13021231.7,3958276.71",
    l: 7
},
{
    n: "巢湖市",
    p: "13123851.59,3691564.79",
    l: 8
},
{
    n: "六安市",
    p: "12970198.74,3707970.37",
    l: 8
},
{
    n: "亳州市",
    p: "12889497.48,3985791.77",
    l: 7
},
{
    n: "池州市",
    p: "13079874.8,3567450.98",
    l: 8
},
{
    n: "宣城市",
    p: "13221018.86,3603632.56",
    l: 8
},
{
    n: "福州市",
    p: "13280713.93,2989935.97",
    l: 5
},
{
    n: "厦门市",
    p: "13146513.06,2794855.77",
    l: 7
},
{
    n: "莆田市",
    p: "13248738.85,2913804.66",
    l: 7
},
{
    n: "三明市",
    p: "13096399.79,3013435.8",
    l: 8
},
{
    n: "泉州市",
    p: "13201910.12,2846954.45",
    l: 8
},
{
    n: "漳州市",
    p: "13097299.4,2798905.67",
    l: 8
},
{
    n: "南平市",
    p: "13156351.9,3060177",
    l: 7
},
{
    n: "龙岩市",
    p: "13029047.54,2870546.66",
    l: 7
},
{
    n: "宁德市",
    p: "13306472.99,3063294.93",
    l: 7
},
{
    n: "南昌市",
    p: "12910017.55,3308071.83",
    l: 5
},
{
    n: "景德镇市",
    p: "13045488.05,3394401.41",
    l: 7
},
{
    n: "萍乡市",
    p: "12675159.81,3182197.09",
    l: 8
},
{
    n: "九江市",
    p: "12914084.97,3445118.73",
    l: 7
},
{
    n: "新余市",
    p: "12793320.28,3206680.44",
    l: 8
},
{
    n: "鹰潭市",
    p: "13032952.25,3262112.41",
    l: 8
},
{
    n: "赣州市",
    p: "12795185.35,2959890.57",
    l: 7
},
{
    n: "吉安市",
    p: "12801884.97,3118790.33",
    l: 7
},
{
    n: "宜春市",
    p: "12736934.92,3206538.71",
    l: 7
},
{
    n: "抚州市",
    p: "12953213,3222556.21",
    l: 7
},
{
    n: "上饶市",
    p: "13133880.04,3285299.92",
    l: 7
},
{
    n: "济南市",
    p: "13024581.37,4367507.59",
    l: 5
},
{
    n: "青岛市",
    p: "13401831.29,4285182.82",
    l: 7
},
{
    n: "淄博市",
    p: "13142686.3,4388052.83",
    l: 7
},
{
    n: "枣庄市",
    p: "13061274.78,4114277.91",
    l: 7
},
{
    n: "东营市",
    p: "13211656.35,4474393.79",
    l: 7
},
{
    n: "烟台市",
    p: "13520352.99,4478575.49",
    l: 7
},
{
    n: "潍坊市",
    p: "13265878.88,4373424.04",
    l: 7
},
{
    n: "济宁市",
    p: "12979324.04,4196136.66",
    l: 7
},
{
    n: "泰安市",
    p: "13034988.61,4303535.5",
    l: 7
},
{
    n: "威海市",
    p: "13595631.29,4485000.06",
    l: 8
},
{
    n: "日照市",
    p: "13307109.51,4195766.38",
    l: 7
},
{
    n: "莱芜市",
    p: "13100456.67,4305551.31",
    l: 8
},
{
    n: "临沂市",
    p: "13175462.45,4147217.21",
    l: 7
},
{
    n: "德州市",
    p: "12947622.04,4476813.41",
    l: 7
},
{
    n: "聊城市",
    p: "12912310.75,4338690.92",
    l: 7
},
{
    n: "滨州市",
    p: "13134584.6,4466450.28",
    l: 8
},
{
    n: "菏泽市",
    p: "12856033.48,4171820.25",
    l: 7
},
{
    n: "郑州市",
    p: "12648663.61,4105852.45",
    l: 5
},
{
    n: "开封市",
    p: "12725500.83,4112517.32",
    l: 8
},
{
    n: "洛阳市",
    p: "12519082.39,4088441.36",
    l: 7
},
{
    n: "平顶山市",
    p: "12614390.72,3969016.16",
    l: 7
},
{
    n: "安阳市",
    p: "12735043.36,4289478.97",
    l: 7
},
{
    n: "鹤壁市",
    p: "12711802.8,4262428.36",
    l: 8
},
{
    n: "新乡市",
    p: "12683052.11,4179998.27",
    l: 7
},
{
    n: "焦作市",
    p: "12606908.19,4169148.29",
    l: 8
},
{
    n: "濮阳市",
    p: "12806228.38,4243123.16",
    l: 8
},
{
    n: "许昌市",
    p: "12674841.33,4010264.96",
    l: 8
},
{
    n: "漯河市",
    p: "12693143.11,3949716.47",
    l: 8
},
{
    n: "三门峡市",
    p: "12379841.12,4110225.01",
    l: 8
},
{
    n: "南阳市",
    p: "12527475.32,3871404.82",
    l: 7
},
{
    n: "商丘市",
    p: "12875114.84,4065382.71",
    l: 7
},
{
    n: "信阳市",
    p: "12698935.02,3757290.11",
    l: 7
},
{
    n: "周口市",
    p: "12764020.8,3955188.99",
    l: 7
},
{
    n: "驻马店市",
    p: "12695259.9,3870201.61",
    l: 7
},
{
    n: "武汉市",
    p: "12724558.82,3558883.15",
    l: 5
},
{
    n: "黄石市",
    p: "12806831.16,3508246.06",
    l: 8
},
{
    n: "十堰市",
    p: "12333819.83,3826557.97",
    l: 7
},
{
    n: "宜昌市",
    p: "12389264.78,3571550.15",
    l: 7
},
{
    n: "襄樊市",
    p: "12485804.42,3744176.48",
    l: 7
},
{
    n: "鄂州市",
    p: "12790674.54,3533243.76",
    l: 10
},
{
    n: "荆门市",
    p: "12490831.2,3615936.83",
    l: 8
},
{
    n: "孝感市",
    p: "12681976.45,3601581.31",
    l: 8
},
{
    n: "荆州市",
    p: "12495313.2,3525594.67",
    l: 8
},
{
    n: "黄冈市",
    p: "12788727.31,3541014.86",
    l: 8
},
{
    n: "咸宁市",
    p: "12727136.79,3462404.52",
    l: 7
},
{
    n: "随州市",
    p: "12622531.73,3700874.41",
    l: 8
},
{
    n: "恩施土家族苗族自治州",
    p: "12189032.67,3517579.64",
    l: 7
},
{
    n: "仙桃市",
    p: "12630567.86,3529164.83",
    l: 9
},
{
    n: "潜江市",
    p: "12568735.44,3534321.2",
    l: 9
},
{
    n: "天门市",
    p: "12598443.93,3567930.91",
    l: 9
},
{
    n: "神农架林区",
    p: "12321205.2,3707164.42",
    l: 9
},
{
    n: "长沙市",
    p: "12572347.48,3258455.64",
    l: 5
},
{
    n: "株洲市",
    p: "12594927.63,3207920.8",
    l: 7
},
{
    n: "湘潭市",
    p: "12573615.87,3208214.06",
    l: 10
},
{
    n: "衡阳市",
    p: "12532300.4,3091412.15",
    l: 7
},
{
    n: "邵阳市",
    p: "12409390.43,3134535.06",
    l: 7
},
{
    n: "岳阳市",
    p: "12594102,3400788.63",
    l: 7
},
{
    n: "常德市",
    p: "12435079.12,3359523.26",
    l: 7
},
{
    n: "张家界市",
    p: "12299442.66,3370126.24",
    l: 7
},
{
    n: "益阳市",
    p: "12508177.66,3299123.14",
    l: 8
},
{
    n: "郴州市",
    p: "12581582.51,2952694.08",
    l: 7
},
{
    n: "永州市",
    p: "12425662.51,3032983.5",
    l: 8
},
{
    n: "怀化市",
    p: "12245712.5,3174098.87",
    l: 7
},
{
    n: "娄底市",
    p: "12468037.65,3191557.89",
    l: 8
},
{
    n: "湘西土家族苗族自治州",
    p: "12216983.61,3268959.39",
    l: 7
},
{
    n: "广州市",
    p: "12609307.83,2631271.83",
    l: 5
},
{
    n: "韶关市",
    p: "12646446.31,2835068.76",
    l: 7
},
{
    n: "深圳市",
    p: "12689011.44,2569642.35",
    l: 7
},
{
    n: "珠海市",
    p: "12644173.47,2528423.41",
    l: 10
},
{
    n: "汕头市",
    p: "12989836.15,2658196.76",
    l: 7
},
{
    n: "佛山市",
    p: "12593519.42,2618810.41",
    l: 10
},
{
    n: "江门市",
    p: "12589077.06,2565305.02",
    l: 7
},
{
    n: "湛江市",
    p: "12286019.39,2409244.57",
    l: 7
},
{
    n: "茂名市",
    p: "12348999.61,2455913.03",
    l: 8
},
{
    n: "肇庆市",
    p: "12520445.64,2621563.68",
    l: 8
},
{
    n: "惠州市",
    p: "12737692.87,2629228.47",
    l: 7
},
{
    n: "梅州市",
    p: "12927552.25,2771587.26",
    l: 7
},
{
    n: "汕尾市",
    p: "12844409.79,2590115.95",
    l: 8
},
{
    n: "河源市",
    p: "12769271.56,2705584.51",
    l: 7
},
{
    n: "阳江市",
    p: "12466694.44,2479195.46",
    l: 7
},
{
    n: "清远市",
    p: "12586213.67,2698112.83",
    l: 7
},
{
    n: "东莞市",
    p: "12663617.76,2618331.04",
    l: 8
},
{
    n: "中山市",
    p: "12623653.08,2557824.08",
    l: 8
},
{
    n: "潮州市",
    p: "12983266.14,2695080.32",
    l: 8
},
{
    n: "揭阳市",
    p: "12955409.7,2682130.11",
    l: 8
},
{
    n: "云浮市",
    p: "12473607.14,2605655.19",
    l: 7
},
{
    n: "南宁市",
    p: "12063576.78,2594028.7",
    l: 5
},
{
    n: "柳州市",
    p: "12180922.28,2776089.56",
    l: 7
},
{
    n: "桂林市",
    p: "12278276.01,2891719.35",
    l: 7
},
{
    n: "梧州市",
    p: "12388367.17,2673421.13",
    l: 7
},
{
    n: "北海市",
    p: "12148034.92,2434259.23",
    l: 7
},
{
    n: "防城港市",
    p: "12062758.24,2458819.91",
    l: 8
},
{
    n: "钦州市",
    p: "12096184.74,2493766.85",
    l: 8
},
{
    n: "贵港市",
    p: "12201118.42,2628719.18",
    l: 8
},
{
    n: "玉林市",
    p: "12264309.72,2572247.58",
    l: 7
},
{
    n: "百色市",
    p: "11869501.63,2724850.41",
    l: 7
},
{
    n: "贺州市",
    p: "12420506.04,2785419.69",
    l: 7
},
{
    n: "河池市",
    p: "12032932.45,2820780.9",
    l: 7
},
{
    n: "来宾市",
    p: "12159496.06,2706113.22",
    l: 7
},
{
    n: "崇左市",
    p: "11952831.16,2541092.75",
    l: 7
},
{
    n: "海口市",
    p: "12283403.23,2262634.65",
    l: 5
},
{
    n: "三亚市",
    p: "12191593.61,2054280.47",
    l: 7
},
{
    n: "五指山市",
    p: "12192203.4,2115118.31",
    l: 9
},
{
    n: "琼海市",
    p: "12298839.41,2171833.8",
    l: 9
},
{
    n: "儋州市",
    p: "12199334.74,2202719.22",
    l: 9
},
{
    n: "文昌市",
    p: "12334754.47,2205345.6",
    l: 9
},
{
    n: "万宁市",
    p: "12289688.86,2117494.22",
    l: 9
},
{
    n: "东方市",
    p: "12094938.19,2153087.07",
    l: 9
},
{
    n: "定安县",
    p: "12281881.48,2223659.92",
    l: 9
},
{
    n: "屯昌县",
    p: "12257508.59,2183877.5",
    l: 9
},
{
    n: "澄迈县",
    p: "12246793.54,2228213.81",
    l: 9
},
{
    n: "临高县",
    p: "12211290.57,2248031.45",
    l: 9
},
{
    n: "白沙黎族自治县",
    p: "12185194.2,2167875.63",
    l: 9
},
{
    n: "昌江黎族自治县",
    p: "12140718.82,2172087.22",
    l: 9
},
{
    n: "乐东黎族自治县",
    p: "12154133.28,2112054.67",
    l: 9
},
{
    n: "陵水黎族自治县",
    p: "12250762.89,2083377.38",
    l: 9
},
{
    n: "保亭黎族苗族自治县",
    p: "12213023.84,2099255.38",
    l: 9
},
{
    n: "琼中黎族苗族自治县",
    p: "12227918.08,2145742.66",
    l: 9
},
{
    n: "成都市",
    p: "11585248.88,3567151.84",
    l: 5
},
{
    n: "自贡市",
    p: "11664710.81,3398518.18",
    l: 8
},
{
    n: "攀枝花市",
    p: "11323995.44,3052819.58",
    l: 7
},
{
    n: "泸州市",
    p: "11738662.93,3339244.88",
    l: 8
},
{
    n: "德阳市",
    p: "11622326.81,3627742.01",
    l: 7
},
{
    n: "绵阳市",
    p: "11653709.54,3671830.29",
    l: 7
},
{
    n: "广元市",
    p: "11783301.89,3798266.61",
    l: 7
},
{
    n: "遂宁市",
    p: "11752615.68,3550145.61",
    l: 8
},
{
    n: "内江市",
    p: "11695933.16,3429168.69",
    l: 7
},
{
    n: "乐山市",
    p: "11551959.65,3425604.02",
    l: 7
},
{
    n: "南充市",
    p: "11813039.76,3590300.79",
    l: 7
},
{
    n: "眉山市",
    p: "11561215.96,3492381.09",
    l: 7
},
{
    n: "宜宾市",
    p: "11649686.4,3324145.29",
    l: 7
},
{
    n: "广安市",
    p: "11871206.28,3541167.9",
    l: 8
},
{
    n: "达州市",
    p: "11964624.16,3639026.15",
    l: 7
},
{
    n: "雅安市",
    p: "11468234.33,3480224.33",
    l: 8
},
{
    n: "巴中市",
    p: "11883640.69,3723597.18",
    l: 7
},
{
    n: "资阳市",
    p: "11648045.68,3499522.66",
    l: 8
},
{
    n: "阿坝藏族羌族自治州",
    p: "11380507.4,3728228.76",
    l: 7
},
{
    n: "甘孜藏族自治州",
    p: "11351325.58,3489245.11",
    l: 7
},
{
    n: "凉山彝族自治州",
    p: "11385246.65,3214579.77",
    l: 7
},
{
    n: "贵阳市",
    p: "11870519.66,3060500.8",
    l: 5
},
{
    n: "六盘水市",
    p: "11670589.44,3054081.9",
    l: 7
},
{
    n: "遵义市",
    p: "11903921.55,3195127.87",
    l: 7
},
{
    n: "安顺市",
    p: "11794868.99,3012140.6",
    l: 7
},
{
    n: "铜仁地区",
    p: "12152507.78,3190837.66",
    l: 8
},
{
    n: "黔西南布依族苗族自治州",
    p: "11679001.08,2869017.96",
    l: 8
},
{
    n: "毕节地区",
    p: "11721031.41,3142281.31",
    l: 7
},
{
    n: "黔东南苗族侗族自治州",
    p: "12020550.46,3053190.16",
    l: 7
},
{
    n: "黔南布依族苗族自治州",
    p: "11970164.71,3012312.19",
    l: 8
},
{
    n: "昆明市",
    p: "11435436.7,2863224.69",
    l: 5
},
{
    n: "曲靖市",
    p: "11555382.53,2918266.01",
    l: 7
},
{
    n: "玉溪市",
    p: "11416286.45,2779261.88",
    l: 7
},
{
    n: "保山市",
    p: "11039628.37,2872619.83",
    l: 7
},
{
    n: "昭通市",
    p: "11546391.16,3146685.98",
    l: 7
},
{
    n: "丽江市",
    p: "11158367.61,3089380.29",
    l: 7
},
{
    n: "临沧市",
    p: "11141635.22,2721813.79",
    l: 7
},
{
    n: "楚雄彝族自治州",
    p: "11302890.47,2863837.49",
    l: 7
},
{
    n: "红河哈尼族彝族自治州",
    p: "11508573.08,2659713.17",
    l: 10
},
{
    n: "文山壮族苗族自治州",
    p: "11606070.41,2660260.24",
    l: 7
},
{
    n: "普洱市",
    p: "11240810.51,2589692.16",
    l: 7
},
{
    n: "西双版纳傣族自治州",
    p: "11221584.75,2496986.94",
    l: 7
},
{
    n: "大理白族自治州",
    p: "11162593.44,2932487.29",
    l: 7
},
{
    n: "德宏傣族景颇族自治州",
    p: "10975263.62,2789037.62",
    l: 8
},
{
    n: "怒江傈僳族自治州",
    p: "11005077.24,2963098.98",
    l: 7
},
{
    n: "迪庆藏族自治州",
    p: "11099724.07,3206846.47",
    l: 7
},
{
    n: "拉萨市",
    p: "10143520,3437204.04",
    l: 5
},
{
    n: "昌都地区",
    p: "10818609.6,3629569.73",
    l: 7
},
{
    n: "山南地区",
    p: "10217255.03,3384053.82",
    l: 7
},
{
    n: "日喀则地区",
    p: "9895060.53,3389319.88",
    l: 7
},
{
    n: "那曲地区",
    p: "10248989.14,3672743.64",
    l: 7
},
{
    n: "阿里地区",
    p: "9033914.88,3534099.27",
    l: 7
},
{
    n: "林芝地区",
    p: "10504953.82,3440916.27",
    l: 7
},
{
    n: "西安市",
    p: "12126852.48,4041048.13",
    l: 5
},
{
    n: "铜川市",
    p: "12128561.49,4126022.53",
    l: 7
},
{
    n: "宝鸡市",
    p: "11927681.36,4054988.15",
    l: 7
},
{
    n: "咸阳市",
    p: "12102356.68,4049604.29",
    l: 10
},
{
    n: "渭南市",
    p: "12191495.18,4072416.28",
    l: 8
},
{
    n: "延安市",
    p: "12189211.44,4356570.08",
    l: 7
},
{
    n: "汉中市",
    p: "11914639.81,3881566.87",
    l: 7
},
{
    n: "榆林市",
    p: "12216464.44,4593874.99",
    l: 7
},
{
    n: "安康市",
    p: "12137752.12,3831579.1",
    l: 7
},
{
    n: "商洛市",
    p: "12238758.85,3988163.54",
    l: 7
},
{
    n: "兰州市",
    p: "11559160.65,4284481.62",
    l: 5
},
{
    n: "嘉峪关市",
    p: "10942391.53,4806166.82",
    l: 10
},
{
    n: "金昌市",
    p: "11376333.55,4627477.91",
    l: 7
},
{
    n: "白银市",
    p: "11593403,4350996.94",
    l: 7
},
{
    n: "天水市",
    p: "11770106.49,4083646.7",
    l: 7
},
{
    n: "武威市",
    p: "11426447.1,4544105.57",
    l: 7
},
{
    n: "张掖市",
    p: "11182855.71,4684858.01",
    l: 7
},
{
    n: "平凉市",
    p: "11874734.04,4213583.82",
    l: 8
},
{
    n: "酒泉市",
    p: "10965135.56,4801282.37",
    l: 7
},
{
    n: "庆阳市",
    p: "11982494.48,4240364.21",
    l: 7
},
{
    n: "定西市",
    p: "11647778.93,4218809.14",
    l: 7
},
{
    n: "陇南市",
    p: "11680753.14,3925419.77",
    l: 7
},
{
    n: "临夏回族自治州",
    p: "11490235.88,4221664.83",
    l: 8
},
{
    n: "甘南藏族自治州",
    p: "11456970.69,4137705.18",
    l: 7
},
{
    n: "西宁市",
    p: "11330424.55,4360836.12",
    l: 5
},
{
    n: "海东地区",
    p: "11367724.54,4345818.22",
    l: 7
},
{
    n: "海北藏族自治州",
    p: "11233079.71,4407698.25",
    l: 7
},
{
    n: "黄南藏族自治州",
    p: "11367018.69,4210804.21",
    l: 8
},
{
    n: "海南藏族自治州",
    p: "11201876.52,4315364.9",
    l: 7
},
{
    n: "果洛藏族自治州",
    p: "11160063.36,4068657.46",
    l: 7
},
{
    n: "玉树藏族自治州",
    p: "10800746.97,3875570.18",
    l: 7
},
{
    n: "海西蒙古族藏族自治州",
    p: "10816936.01,4468024.21",
    l: 7
},
{
    n: "银川市",
    p: "11832898.83,4616373.5",
    l: 5
},
{
    n: "石嘴山市",
    p: "11841711.18,4698078.16",
    l: 7
},
{
    n: "吴忠市",
    p: "11822829.87,4553415.21",
    l: 7
},
{
    n: "固原市",
    p: "11827731.54,4278231.51",
    l: 7
},
{
    n: "中卫市",
    p: "11708737.7,4485946.9",
    l: 7
},
{
    n: "乌鲁木齐市",
    p: "9753667.88,5409369.63",
    l: 5
},
{
    n: "克拉玛依市",
    p: "9450655.5,5683311.14",
    l: 7
},
{
    n: "吐鲁番地区",
    p: "9929119.54,5277242.77",
    l: 7
},
{
    n: "哈密地区",
    p: "10410950.95,5256019.72",
    l: 7
},
{
    n: "昌吉回族自治州",
    p: "9719944.71,5438088.99",
    l: 8
},
{
    n: "博尔塔拉蒙古自治州",
    p: "9137172.41,5576651.41",
    l: 7
},
{
    n: "巴音郭楞蒙古自治州",
    p: "9590451.71,5097890.07",
    l: 7
},
{
    n: "阿克苏地区",
    p: "8935351.95,5009761.4",
    l: 7
},
{
    n: "克孜勒苏柯尔克孜自治州",
    p: "8479678.26,4798131.59",
    l: 8
},
{
    n: "喀什地区",
    p: "8459954.24,4762722.85",
    l: 7
},
{
    n: "和田地区",
    p: "8898707.07,4429816.8",
    l: 7
},
{
    n: "伊犁哈萨克自治州",
    p: "9054161.44,5423973.33",
    l: 7
},
{
    n: "塔城地区",
    p: "9238596.44,5870707.55",
    l: 7
},
{
    n: "阿勒泰地区",
    p: "9812358.95,6050881.84",
    l: 7
},
{
    n: "石河子市",
    p: "9583272.07,5483579.8",
    l: 9
},
{
    n: "阿拉尔市",
    p: "9049687.77,4918103.23",
    l: 9
},
{
    n: "图木舒克市",
    p: "8802730.81,4819584.88",
    l: 9
},
{
    n: "五家渠市",
    p: "9746120.79,5462086.91",
    l: 9
}];
function TrafficMgr() {
    this.map = null;
    this.tiles = [];
    this.forecastTileUrl = null;
    this.errorUrl = "styles/bmap/blank.gif";
    this.tileID = 0;
    this.isStart = true;
    this.city = {
        beijing: {
            bound: new BMap.Bounds(13024002.48, 4865927.36, 12896002.48, 4800007.36),
            point: new BMap.Point(12959136.03, 4825197.38)
        },
        shanghai: {
            bound: new BMap.Bounds(13586486.26, 3671676.37, 13458486.26, 3605756.37),
            point: new BMap.Point(13524118.26, 3642780.37)
        },
        guangzhou: {
            bound: new BMap.Bounds(12673391.11, 2664430.08, 12545391.11, 2598510.08),
            point: new BMap.Point(12613487.11, 2629614.08)
        },
        shenzhen: {
            bound: new BMap.Bounds(12725451.44, 2575402.35, 12661451.44, 2545962.35),
            point: new BMap.Point(12688011.44, 2569642.35)
        }
    };
    this.markers = [];
    this.tileKey = ""
}
TrafficMgr.prototype.initialize = function(c) {
    this.map = c;
    var b = this;
    this.isStart = true;
    if (!c.temp.trafficDiv) {
        var a = '<font type="system" style="position:absolute;top:0;left:0;width:0;height:0;z-index:5"></font>';
        c.temp.trafficDiv = beforeEndHTML(c.platform, a);
        c.addEventListener("load", 
        function(d) {
            b.setTrafficDiv(d)
        });
        c.addEventListener("moveend", 
        function(d) {
            b.setTrafficDiv(d)
        });
        c.addEventListener("mapcontainerresize", 
        function(d) {
            b.setTrafficDiv(d)
        });
        c.addEventListener("dragend", 
        function(d) {
            b.setTrafficDiv(d)
        });
        c.addEventListener("zoomend", 
        function(d) {
            c.temp.trafficDiv.style.display = "";
            b.setTrafficDiv(d)
        });
        c.addEventListener("zoomstart", 
        function(d) {
            c.temp.trafficDiv.style.display = "none"
        })
    }
    this.setMarker()
};
TrafficMgr.prototype.setTrafficDiv = function() {
    if (!this.isStart) {
        return
    }
    var g = this.map;
    var f = g.temp.tilesDiv;
    var b = g.temp.trafficDiv;
    b.style.left = f.style.left;
    b.style.top = f.style.top;
    if (g.zoomLevel > 9) {
        var a = g.getBounds();
        var c = null;
        for (var d in this.city) {
            if (a.intersects(this.city[d].bound) != null) {
                this.getTilesUrl();
                c = d;
                break
            }
        }
        if (c == null) {
            this.clear()
        }
        this.removeMarker()
    } else {
        this.clear();
        this.addMarker()
    }
};
TrafficMgr.prototype.getTilesUrl = function() {
    var y = this.map;
    var m = y.tileMgr;
    var r = m.mapGrid;
    var b = m.tileOrder;
    var q = y.zoomLevel;
    var u = y.centerPoint;
    var j = m.centerBox;
    var t = new BMap.Point(j[2], j[3]);
    var l = y.getZoomUnits(y.zoomLevel);
    var p = m.baseUnits * Math.pow(2, (m.maxZoomLevel - q));
    var n = parseInt(u[0] / p);
    var g = parseInt(u[1] / p);
    var a = [n, g, p * (n + 0.5), p * (g + 0.5)];
    var c = m.centerPos;
    var d = (r[0] % 2 == 0) ? ((a[2] > u[0]) ? r[0] / 2: r[0] / 2 - 1) : (r[0] - 1) / 2;
    var A = (r[1] % 2 == 0) ? ((a[3] > u[1]) ? r[1] / 2 - 1: r[1] / 2) : (r[1] - 1) / 2;
    var h = [d, A];
    var f = this.tiles;
    var x = [];
    for (var w = 0; w < b.length; w++) {
        var z = {};
        z.x = (a[0] - h[0] + b[w][0]);
        z.y = (a[1] + h[1] - b[w][1]);
        z.level = y.zoomLevel;
        if (this.tileKey == "") {
            this.tileKey = new Date().getTime()
        }
        if (this.forecastTileUrl == null) {
            z.url = m.getTilesUrl(z.x, z.y, z.level, [this.getTrUrl(this.tileUrl)]) + "?t=" + this.tileKey
        } else {
            z.url = m.getTilesUrl(z.x, z.y, z.level, [this.getTrUrl(this.forecastTileUrl)]) + "?t=" + this.tileKey
        }
        z.left = (z.x * m.tileSize) + parseInt(c[0]);
        z.top = ( - 1 - z.y) * m.tileSize + parseInt(c[1]);
        var o = z.x + "_" + z.y + "_" + z.level;
        if (!this.tiles[o]) {
            if (FeBrowser.ie <= 6 && FeBrowser.ie > 0) {
                var B = beforeEndHTML(y.temp.trafficDiv, "<img type='system' src='" + this.errorUrl + "' style='position:absolute;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + z.url + '");left:' + z.left + "px;top:" + z.top + "px;width:256px;height:256px'/>")
            } else {
                var B = beforeEndHTML(y.temp.trafficDiv, "<img type='system' src='" + z.url + "' onerror = 'this.src = \"" + this.errorUrl + "\" ' style='position:absolute;left:" + z.left + "px;top:" + z.top + "px;width:256px;height:256px;display:none'/>");
                B.onload = function() {
                    this.style.display = ""
                }
            }
            this.tiles[z.x + "_" + z.y + "_" + z.level] = B
        } else {
            var B = this.tiles[o];
            B.style.left = z.left + "px";
            B.style.top = z.top + "px"
        }
        x[o] = B
    }
    for (var v in f) {
        var B = f[v];
        if (!x[v]) {
            y.temp.trafficDiv.removeChild(B)
        }
    }
    this.tiles = x
};
TrafficMgr.prototype.end = function() {
    this.clear();
    this.isStart = false;
    this.removeMarker()
};
TrafficMgr.prototype.clear = function() {
    var a = this.map;
    a.temp.trafficDiv.innerHTML = "";
    this.tiles = []
};
TrafficMgr.prototype.setMarker = function() {
    var d = this;
    var c = new BMap.Icon("img/traffic.png", {
        height: 35,
        width: 28
    });
    for (var b in this.city) {
        var a = new BMap.Marker(this.city[b].point, {
            icon: c,
            offset: [7, -17]
        });
        this.markers.push(a)
    }
};
TrafficMgr.prototype.addMarker = function() {
    var c = this;
    var b = this.markers;
    for (var a in b) {
        if (b[a].domElement == null) {
            b[a].addEventListener("click", 
            function() {
                c.map.centerAndZoom(this.point, 11)
            });
            this.map.addOverlay(b[a]);
            b[a].domElement.setAttribute("type", "system");
            b[a].siblingElement.setAttribute("type", "system");
            b[a].domElement.title = "点击查看交通流量"
        }
        b[a].show()
    }
};
TrafficMgr.prototype.getTrUrl = function(c) {
    var b = this.tileID;
    var a = c.length;
    if (b >= a || b < 0) {
        b = 0
    }
    this.tileID = (b + 1);
    return c[b]
};
TrafficMgr.prototype.removeMarker = function() {
    var b = this.markers;
    try {
        for (var a in b) {
            b[a].hide()
        }
    } catch(c) {}
};