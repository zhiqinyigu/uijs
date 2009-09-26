(function() {
    var d = YAHOO.util.Dom,
    a = YAHOO.util.Event,
    c = YAHOO.lang;
    var b = function(f, e) {
        var g = {
            element: f,
            attributes: e || {}
        };
        b.superclass.constructor.call(this, g.element, g.attributes)
    };
    b._instances = {};
    b._padding = 5;
    b.getResizeById = function(e) {
        if (b._instances[e]) {
            return b._instances[e]
        }
        return false
    };
    YAHOO.extend(b, YAHOO.util.Element, {
        CSS_RESIZE: "yui-resize",
        CSS_DRAG: "yui-draggable",
        CSS_HOVER: "yui-resize-hover",
        CSS_PROXY: "yui-resize-proxy",
        CSS_WRAP: "yui-resize-wrap",
        CSS_KNOB: "yui-resize-knob",
        CSS_HIDDEN: "yui-resize-hidden",
        CSS_HANDLE: "yui-resize-handle",
        CSS_STATUS: "yui-resize-status",
        CSS_GHOST: "yui-resize-ghost",
        CSS_RESIZING: "yui-resize-resizing",
        _resizeEvent: null,
        dd: null,
        browser: YAHOO.env.ua,
        _locked: null,
        _positioned: null,
        _dds: null,
        _wrap: null,
        _proxy: null,
        _handles: null,
        _currentHandle: null,
        _currentDD: null,
        _cache: null,
        _active: null,
        _createProxy: function() {
            if (this.get("proxy")) {
                this._proxy = document.createElement("div");
                this._proxy.className = this.CSS_PROXY;
                this._proxy.style.height = this.get("element").clientHeight + "px";
                this._proxy.style.width = this.get("element").clientWidth + "px";
                this._wrap.parentNode.appendChild(this._proxy)
            } else {
                this.set("animate", false)
            }
        },
        _createWrap: function() {
            this._positioned = false;
            switch (this.get("element").tagName.toLowerCase()) {
            case "img":
            case "textarea":
            case "input":
            case "iframe":
            case "select":
                this.set("wrap", true);
                break
            }
            if (this.get("wrap") === true) {
                this._wrap = document.createElement("div");
                this._wrap.id = this.get("element").id + "_wrap";
                this._wrap.className = this.CSS_WRAP;
                d.setStyle(this._wrap, "width", this.get("width") - (b._padding * 2) + "px");
                d.setStyle(this._wrap, "height", this.get("height") - (b._padding * 2) + "px");
                d.setStyle(this._wrap, "z-index", this.getStyle("z-index"));
                this.setStyle("z-index", 0);
                var f = d.getStyle(this.get("element"), "position");
                d.setStyle(this._wrap, "position", ((f == "static") ? "relative": f));
                d.setStyle(this._wrap, "top", d.getStyle(this.get("element"), "top"));
                d.setStyle(this._wrap, "left", d.getStyle(this.get("element"), "left"));
                if (d.getStyle(this.get("element"), "position") == "absolute") {
                    this._positioned = true;
                    d.setStyle(this.get("element"), "position", "relative");
                    d.setStyle(this.get("element"), "top", "0");
                    d.setStyle(this.get("element"), "left", "0")
                }
                var e = this.get("element").parentNode;
                e.replaceChild(this._wrap, this.get("element"));
                this._wrap.appendChild(this.get("element"))
            } else {
                this._wrap = this.get("element");
                if (d.getStyle(this._wrap, "position") == "absolute") {
                    this._positioned = true
                }
            }
            if (this.get("draggable")) {
                this._setupDragDrop()
            }
            if (this.get("hover")) {
                d.addClass(this._wrap, this.CSS_HOVER)
            }
            if (this.get("knobHandles")) {
                d.addClass(this._wrap, this.CSS_KNOB)
            }
            if (this.get("hiddenHandles")) {
                d.addClass(this._wrap, this.CSS_HIDDEN)
            }
            d.addClass(this._wrap, this.CSS_RESIZE)
        },
        _setupDragDrop: function() {
            d.addClass(this._wrap, this.CSS_DRAG);
            this.dd = new YAHOO.util.DD(this._wrap, this.get("id") + "-resize", {
                dragOnly: true,
                scroll: false,
                useShim: this.get("useShim")
            });
            this.dd.on("dragEvent",
            function() {
                this._cache.left = parseInt(this._wrap.style.left);
                this._cache.top = parseInt(this._wrap.style.top);
                this.fireEvent("dragEvent", arguments)
            },
            this, true);
            this.dd.on("endDragEvent",
            function() {
                this._cache.left = parseInt(this._wrap.style.left);
                this._cache.top = parseInt(this._wrap.style.top);
                this.fireEvent("endDrag", {
                    ev: "endDrag",
                    target: this,
                    height: this._cache.height,
                    width: this._cache.width,
                    y: this._cache.top,
                    x: this._cache.left
                })
            },
            this, true)
        },
        _createHandles: function() {
            this._handles = {};
            this._dds = {};
            var g = this.get("handles");
            for (var f = 0; f < g.length; f++) {
                this._handles[g[f]] = document.createElement("div");
                this._handles[g[f]].id = d.generateId(this._handles[g[f]]);
                this._handles[g[f]].className = this.CSS_HANDLE + " " + this.CSS_HANDLE + "-" + g[f];
                var e = document.createElement("div");
                e.className = this.CSS_HANDLE + "-inner-" + g[f];
                this._handles[g[f]].appendChild(e);
                this._wrap.appendChild(this._handles[g[f]]);
                a.on(this._handles[g[f]], "mouseover", this._handleMouseOver, this, true);
                a.on(this._handles[g[f]], "mouseout", this._handleMouseOut, this, true);
                this._dds[g[f]] = new YAHOO.util.DragDrop(this._handles[g[f]], this.get("id") + "-handle-" + g, {
                    scroll: false,
                    useShim: this.get("useShim")
                });
                this._dds[g[f]].setPadding(15, 15, 15, 15);
                this._dds[g[f]].on("startDragEvent", this._handleStartDrag, this._dds[g[f]], this);
                this._dds[g[f]].on("mouseDownEvent", this._handleMouseDown, this._dds[g[f]], this)
            }
            this._status = document.createElement("span");
            this._status.className = this.CSS_STATUS;
            document.body.insertBefore(this._status, document.body.firstChild)
        },
        _ieSelectFix: function() {
            return false
        },
        _ieSelectBack: null,
        _setAutoRatio: function(e) {
            if (this.get("autoRatio")) {
                if (e && e.shiftKey) {
                    this.set("ratio", true)
                } else {
                    this.set("ratio", this._configs.ratio._initialConfig.value)
                }
            }
        },
        _handleMouseDown: function(e) {
            if (this._locked) {
                return false
            }
            if (d.getStyle(this._wrap, "position") == "absolute") {
                this._positioned = true
            }
            if (e) {
                this._setAutoRatio(e)
            }
            if (this.browser.ie) {
                this._ieSelectBack = document.body.onselectstart;
                document.body.onselectstart = this._ieSelectFix
            }
        },
        _handleMouseOver: function(g) {
            if (this._locked) {
                return false
            }
            d.removeClass(this._wrap, this.CSS_RESIZE);
            if (this.get("hover")) {
                d.removeClass(this._wrap, this.CSS_HOVER)
            }
            var e = a.getTarget(g);
            if (!d.hasClass(e, this.CSS_HANDLE)) {
                e = e.parentNode
            }
            if (d.hasClass(e, this.CSS_HANDLE) && !this._active) {
                d.addClass(e, this.CSS_HANDLE + "-active");
                for (var f in this._handles) {
                    if (c.hasOwnProperty(this._handles, f)) {
                        if (this._handles[f] == e) {
                            d.addClass(e, this.CSS_HANDLE + "-" + f + "-active");
                            break
                        }
                    }
                }
            }
            d.addClass(this._wrap, this.CSS_RESIZE)
        },
        _handleMouseOut: function(g) {
            d.removeClass(this._wrap, this.CSS_RESIZE);
            if (this.get("hover") && !this._active) {
                d.addClass(this._wrap, this.CSS_HOVER)
            }
            var e = a.getTarget(g);
            if (!d.hasClass(e, this.CSS_HANDLE)) {
                e = e.parentNode
            }
            if (d.hasClass(e, this.CSS_HANDLE) && !this._active) {
                d.removeClass(e, this.CSS_HANDLE + "-active");
                for (var f in this._handles) {
                    if (c.hasOwnProperty(this._handles, f)) {
                        if (this._handles[f] == e) {
                            d.removeClass(e, this.CSS_HANDLE + "-" + f + "-active");
                            break
                        }
                    }
                }
            }
            d.addClass(this._wrap, this.CSS_RESIZE)
        },
        _handleStartDrag: function(g, f) {
            var e = f.getDragEl();
            if (d.hasClass(e, this.CSS_HANDLE)) {
                if (d.getStyle(this._wrap, "position") == "absolute") {
                    this._positioned = true
                }
                this._active = true;
                this._currentDD = f;
                if (this._proxy) {
                    this._proxy.style.visibility = "visible";
                    this._proxy.style.zIndex = "1000";
                    this._proxy.style.height = this.get("element").clientHeight + "px";
                    this._proxy.style.width = this.get("element").clientWidth + "px"
                }
                for (var h in this._handles) {
                    if (c.hasOwnProperty(this._handles, h)) {
                        if (this._handles[h] == e) {
                            this._currentHandle = h;
                            var j = "_handle_for_" + h;
                            d.addClass(e, this.CSS_HANDLE + "-" + h + "-active");
                            f.on("dragEvent", this[j], this, true);
                            f.on("mouseUpEvent", this._handleMouseUp, this, true);
                            break
                        }
                    }
                }
                d.addClass(e, this.CSS_HANDLE + "-active");
                if (this.get("proxy")) {
                    var k = d.getXY(this.get("element"));
                    d.setXY(this._proxy, k);
                    if (this.get("ghost")) {
                        this.addClass(this.CSS_GHOST)
                    }
                }
                d.addClass(this._wrap, this.CSS_RESIZING);
                this._setCache();
                this._updateStatus(this._cache.height, this._cache.width, this._cache.top, this._cache.left);
                this.fireEvent("startResize", {
                    type: "startresize",
                    target: this
                })
            }
        },
        _setCache: function() {
            this._cache.xy = d.getXY(this._wrap);
            d.setXY(this._wrap, this._cache.xy);
            this._cache.height = this.get("clientHeight");
            this._cache.width = this.get("clientWidth");
            this._cache.start.height = this._cache.height;
            this._cache.start.width = this._cache.width;
            this._cache.start.top = this._cache.xy[1];
            this._cache.start.left = this._cache.xy[0];
            this._cache.top = this._cache.xy[1];
            this._cache.left = this._cache.xy[0];
            this.set("height", this._cache.height, true);
            this.set("width", this._cache.width, true)
        },
        _handleMouseUp: function(f) {
            this._active = false;
            var g = "_handle_for_" + this._currentHandle;
            this._currentDD.unsubscribe("dragEvent", this[g], this, true);
            this._currentDD.unsubscribe("mouseUpEvent", this._handleMouseUp, this, true);
            if (this._proxy) {
                this._proxy.style.visibility = "hidden";
                this._proxy.style.zIndex = "-1";
                if (this.get("setSize")) {
                    this.resize(f, this._cache.height, this._cache.width, this._cache.top, this._cache.left, true)
                } else {
                    this.fireEvent("resize", {
                        ev: "resize",
                        target: this,
                        height: this._cache.height,
                        width: this._cache.width,
                        top: this._cache.top,
                        left: this._cache.left
                    })
                }
                if (this.get("ghost")) {
                    this.removeClass(this.CSS_GHOST)
                }
            }
            if (this.get("hover")) {
                d.addClass(this._wrap, this.CSS_HOVER)
            }
            if (this._status) {
                d.setStyle(this._status, "display", "none")
            }
            if (this.browser.ie) {
                document.body.onselectstart = this._ieSelectBack
            }
            if (this.browser.ie) {
                d.removeClass(this._wrap, this.CSS_RESIZE)
            }
            for (var e in this._handles) {
                if (c.hasOwnProperty(this._handles, e)) {
                    d.removeClass(this._handles[e], this.CSS_HANDLE + "-active")
                }
            }
            if (this.get("hover") && !this._active) {
                d.addClass(this._wrap, this.CSS_HOVER)
            }
            d.removeClass(this._wrap, this.CSS_RESIZING);
            d.removeClass(this._handles[this._currentHandle], this.CSS_HANDLE + "-" + this._currentHandle + "-active");
            d.removeClass(this._handles[this._currentHandle], this.CSS_HANDLE + "-active");
            if (this.browser.ie) {
                d.addClass(this._wrap, this.CSS_RESIZE)
            }
            this._resizeEvent = null;
            this._currentHandle = null;
            if (!this.get("animate")) {
                this.set("height", this._cache.height, true);
                this.set("width", this._cache.width, true)
            }
            this.fireEvent("endResize", {
                ev: "endResize",
                target: this,
                height: this._cache.height,
                width: this._cache.width,
                top: this._cache.top,
                left: this._cache.left
            })
        },
        _setRatio: function(m, p, s, j) {
            var q = m,
            g = p;
            if (this.get("ratio")) {
                var r = this._cache.height,
                i = this._cache.width,
                f = parseInt(this.get("height"), 10),
                n = parseInt(this.get("width"), 10),
                o = this.get("maxHeight"),
                u = this.get("minHeight"),
                e = this.get("maxWidth"),
                k = this.get("minWidth");
                switch (this._currentHandle) {
                case "l":
                    m = f * (p / n);
                    m = Math.min(Math.max(u, m), o);
                    p = n * (m / f);
                    s = (this._cache.start.top - ( - ((f - m) / 2)));
                    j = (this._cache.start.left - ( - ((n - p))));
                    break;
                case "r":
                    m = f * (p / n);
                    m = Math.min(Math.max(u, m), o);
                    p = n * (m / f);
                    s = (this._cache.start.top - ( - ((f - m) / 2)));
                    break;
                case "t":
                    p = n * (m / f);
                    m = f * (p / n);
                    j = (this._cache.start.left - ( - ((n - p) / 2)));
                    s = (this._cache.start.top - ( - ((f - m))));
                    break;
                case "b":
                    p = n * (m / f);
                    m = f * (p / n);
                    j = (this._cache.start.left - ( - ((n - p) / 2)));
                    break;
                case "bl":
                    m = f * (p / n);
                    p = n * (m / f);
                    j = (this._cache.start.left - ( - ((n - p))));
                    break;
                case "br":
                    m = f * (p / n);
                    p = n * (m / f);
                    break;
                case "tl":
                    m = f * (p / n);
                    p = n * (m / f);
                    j = (this._cache.start.left - ( - ((n - p))));
                    s = (this._cache.start.top - ( - ((f - m))));
                    break;
                case "tr":
                    m = f * (p / n);
                    p = n * (m / f);
                    j = (this._cache.start.left);
                    s = (this._cache.start.top - ( - ((f - m))));
                    break
                }
                q = this._checkHeight(m);
                g = this._checkWidth(p);
                if ((q != m) || (g != p)) {
                    s = 0;
                    j = 0;
                    if (q != m) {
                        g = this._cache.width
                    }
                    if (g != p) {
                        q = this._cache.height
                    }
                }
            }
            return [q, g, s, j]
        },
        _updateStatus: function(m, g, k, f) {
            if (this._resizeEvent && (!c.isString(this._resizeEvent))) {
                if (this.get("status")) {
                    d.setStyle(this._status, "display", "inline")
                }
                m = ((m === 0) ? this._cache.start.height: m);
                g = ((g === 0) ? this._cache.start.width: g);
                var j = parseInt(this.get("height"), 10),
                e = parseInt(this.get("width"), 10);
                if (isNaN(j)) {
                    j = parseInt(m, 10)
                }
                if (isNaN(e)) {
                    e = parseInt(g, 10)
                }
                var n = (parseInt(m, 10) - j);
                var i = (parseInt(g, 10) - e);
                this._cache.offsetHeight = n;
                this._cache.offsetWidth = i;
                this._status.innerHTML = "<strong>" + parseInt(m, 10) + " x " + parseInt(g, 10) + "</strong><em>" + ((n > 0) ? "+": "") + n + " x " + ((i > 0) ? "+": "") + i + "</em>";
                d.setXY(this._status, [a.getPageX(this._resizeEvent) + 12, a.getPageY(this._resizeEvent) + 12])
            }
        },
        lock: function(e) {
            this._locked = true;
            if (e && this.dd) {
                d.removeClass(this._wrap, "yui-draggable");
                this.dd.lock()
            }
            return this
        },
        unlock: function(e) {
            this._locked = false;
            if (e && this.dd) {
                d.addClass(this._wrap, "yui-draggable");
                this.dd.unlock()
            }
            return this
        },
        isLocked: function() {
            return this._locked
        },
        reset: function() {
            this.resize(null, this._cache.start.height, this._cache.start.width, this._cache.start.top, this._cache.start.left, true);
            return this
        },
        resize: function(o, k, r, s, i, f, m) {
            if (this._locked) {
                return false
            }
            this._resizeEvent = o;
            var g = this._wrap,
            j = this.get("animate"),
            q = true;
            if (this._proxy && !f) {
                g = this._proxy;
                j = false
            }
            this._setAutoRatio(o);
            if (this._positioned) {
                if (this._proxy) {
                    s = this._cache.top - s;
                    i = this._cache.left - i
                }
            }
            var n = this._setRatio(k, r, s, i);
            k = parseInt(n[0], 10);
            r = parseInt(n[1], 10);
            s = parseInt(n[2], 10);
            i = parseInt(n[3], 10);
            if (s == 0) {
                s = d.getY(g)
            }
            if (i == 0) {
                i = d.getX(g)
            }
            if (this._positioned) {
                if (this._proxy && f) {
                    if (!j) {
                        g.style.top = this._proxy.style.top;
                        g.style.left = this._proxy.style.left
                    } else {
                        s = this._proxy.style.top;
                        i = this._proxy.style.left
                    }
                } else {
                    if (!this.get("ratio") && !this._proxy) {
                        s = this._cache.top + -(s);
                        i = this._cache.left + -(i)
                    }
                    if (s) {
                        if (this.get("minY")) {
                            if (s < this.get("minY")) {
                                s = this.get("minY")
                            }
                        }
                        if (this.get("maxY")) {
                            if (s > this.get("maxY")) {
                                s = this.get("maxY")
                            }
                        }
                    }
                    if (i) {
                        if (this.get("minX")) {
                            if (i < this.get("minX")) {
                                i = this.get("minX")
                            }
                        }
                        if (this.get("maxX")) {
                            if ((i + r) > this.get("maxX")) {
                                i = (this.get("maxX") - r)
                            }
                        }
                    }
                }
            }
            if (!m) {
                var p = this.fireEvent("beforeResize", {
                    ev: "beforeResize",
                    target: this,
                    height: k,
                    width: r,
                    top: s,
                    left: i
                });
                if (p === false) {
                    return false
                }
            }
            this._updateStatus(k, r, s, i);
            if (this._positioned) {
                if (this._proxy && f) {} else {
                    if (s) {
                        d.setY(g, s);
                        this._cache.top = s
                    }
                    if (i) {
                        d.setX(g, i);
                        this._cache.left = i
                    }
                }
            }
            if (k) {
                if (!j) {
                    q = true;
                    if (this._proxy && f) {
                        if (!this.get("setSize")) {
                            q = false
                        }
                    }
                    if (q) {
                        if (this.browser.ie > 6) {
                            if (k === this._cache.height) {
                                k = k + 1
                            }
                        }
                        g.style.height = k - (b._padding * 2) + "px"
                    }
                    if ((this._proxy && f) || !this._proxy) {
                        if (this._wrap != this.get("element")) {
                            this.get("element").style.height = k + "px"
                        }
                    }
                }
                this._cache.height = k
            }
            if (r) {
                this._cache.width = r;
                if (!j) {
                    q = true;
                    if (this._proxy && f) {
                        if (!this.get("setSize")) {
                            q = false
                        }
                    }
                    if (q) {
                        g.style.width = r - (b._padding * 2) + "px"
                    }
                    if ((this._proxy && f) || !this._proxy) {
                        if (this._wrap != this.get("element")) {
                            this.get("element").style.width = r + "px"
                        }
                    }
                }
            }
            if (j) {
                if (YAHOO.util.Anim) {
                    var e = new YAHOO.util.Anim(g, {
                        height: {
                            to: this._cache.height
                        },
                        width: {
                            to: this._cache.width
                        }
                    },
                    this.get("animateDuration"), this.get("animateEasing"));
                    if (this._positioned) {
                        if (s) {
                            e.attributes.top = {
                                to: parseInt(s, 10)
                            }
                        }
                        if (i) {
                            e.attributes.left = {
                                to: parseInt(i, 10)
                            }
                        }
                    }
                    if (this._wrap != this.get("element")) {
                        e.onTween.subscribe(function() {
                            this.get("element").style.height = g.style.height;
                            this.get("element").style.width = g.style.width
                        },
                        this, true)
                    }
                    e.onComplete.subscribe(function() {
                        this.set("height", k);
                        this.set("width", r);
                        this.fireEvent("resize", {
                            ev: "resize",
                            target: this,
                            height: k,
                            width: r,
                            top: s,
                            left: i
                        })
                    },
                    this, true);
                    e.animate()
                }
            } else {
                if (this._proxy && !f) {
                    this.fireEvent("proxyResize", {
                        ev: "proxyresize",
                        target: this,
                        height: k,
                        width: r,
                        top: s,
                        left: i
                    })
                } else {
                    this.fireEvent("resize", {
                        ev: "resize",
                        target: this,
                        height: this._cache.height,
                        width: this._cache.width,
                        top: s,
                        left: i,
                        x: this._cache.left,
                        y: this._cache.top
                    })
                }
            }
            return this
        },
        _handle_for_br: function(f) {
            var g = this._setWidth(f.e);
            var e = this._setHeight(f.e);
            this.resize(f.e, (e + 1), g, 0, 0)
        },
        _handle_for_bl: function(g) {
            var h = this._setWidth(g.e, true);
            var f = this._setHeight(g.e);
            var e = (h - this._cache.width);
            this.resize(g.e, f, h, 0, e)
        },
        _handle_for_tl: function(g) {
            var i = this._setWidth(g.e, true);
            var f = this._setHeight(g.e, true);
            var h = (f - this._cache.height);
            var e = (i - this._cache.width);
            this.resize(g.e, f, i, h, e)
        },
        _handle_for_tr: function(f) {
            var h = this._setWidth(f.e);
            var e = this._setHeight(f.e, true);
            var g = (e - this._cache.height);
            this.resize(f.e, e, h, g, 0)
        },
        _handle_for_r: function(e) {
            this._dds.r.setYConstraint(0, 0);
            var f = this._setWidth(e.e);
            this.resize(e.e, 0, f, 0, 0)
        },
        _handle_for_l: function(f) {
            this._dds.l.setYConstraint(0, 0);
            var g = this._setWidth(f.e, true);
            var e = (g - this._cache.width);
            this.resize(f.e, 0, g, 0, e)
        },
        _handle_for_b: function(f) {
            this._dds.b.setXConstraint(0, 0);
            var e = this._setHeight(f.e);
            this.resize(f.e, e, 0, 0, 0)
        },
        _handle_for_t: function(f) {
            this._dds.t.setXConstraint(0, 0);
            var e = this._setHeight(f.e, true);
            var g = (e - this._cache.height);
            this.resize(f.e, e, 0, g, 0)
        },
        _setWidth: function(h, j) {
            var i = this._cache.xy[0],
            g = this._cache.width,
            e = a.getPageX(h),
            f = (e - i);
            if (j) {
                f = (i - e) + parseInt(this.get("width"), 10)
            }
            f = this._snapTick(f, this.get("yTicks"));
            f = this._checkWidth(f);
            return f
        },
        _checkWidth: function(e) {
            if (this.get("minWidth")) {
                if (e <= this.get("minWidth")) {
                    e = this.get("minWidth")
                }
            }
            if (this.get("maxWidth")) {
                if (e >= this.get("maxWidth")) {
                    e = this.get("maxWidth")
                }
            }
            return e
        },
        _checkHeight: function(e) {
            if (this.get("minHeight")) {
                if (e <= this.get("minHeight")) {
                    e = this.get("minHeight")
                }
            }
            if (this.get("maxHeight")) {
                if (e >= this.get("maxHeight")) {
                    e = this.get("maxHeight")
                }
            }
            return e
        },
        _setHeight: function(g, j) {
            var i = this._cache.xy[1],
            f = this._cache.height,
            k = a.getPageY(g),
            e = (k - i);
            if (j) {
                e = (i - k) + parseInt(this.get("height"), 10)
            }
            e = this._snapTick(e, this.get("xTicks"));
            e = this._checkHeight(e);
            return e
        },
        _snapTick: function(g, f) {
            if (!g || !f) {
                return g
            }
            var h = g;
            var e = g % f;
            if (e > 0) {
                if (e > (f / 2)) {
                    h = g + (f - e)
                } else {
                    h = g - e
                }
            }
            return h
        },
        init: function(f, e) {
            this._locked = false;
            this._cache = {
                xy: [],
                height: 0,
                width: 0,
                top: 0,
                left: 0,
                offsetHeight: 0,
                offsetWidth: 0,
                start: {
                    height: 0,
                    width: 0,
                    top: 0,
                    left: 0
                }
            };
            b.superclass.init.call(this, f, e);
            this.set("setSize", this.get("setSize"));
            if (e.height) {
                this.set("height", parseInt(e.height, 10))
            }
            if (e.width) {
                this.set("width", parseInt(e.width, 10))
            }
            var g = f;
            if (!c.isString(g)) {
                g = d.generateId(g)
            }
            b._instances[g] = this;
            this._active = false;
            this._createWrap();
            this._createProxy();
            this._createHandles()
        },
        getProxyEl: function() {
            return this._proxy
        },
        getWrapEl: function() {
            return this._wrap
        },
        getStatusEl: function() {
            return this._status
        },
        getActiveHandleEl: function() {
            return this._handles[this._currentHandle]
        },
        isActive: function() {
            return ((this._active) ? true: false)
        },
        initAttributes: function(e) {
            b.superclass.initAttributes.call(this, e);
            this.setAttributeConfig("useShim", {
                value: ((e.useShim === true) ? true: false),
                validator: YAHOO.lang.isBoolean,
                method: function(f) {
                    for (var g in this._dds) {
                        if (c.hasOwnProperty(this._dds, g)) {
                            this._dds[g].useShim = f;
                            this._dds[g].scroll = false
                        }
                    }
                    if (this.dd) {
                        this.dd.useShim = f;
                        this.dd.scroll = false
                    }
                }
            });
            this.setAttributeConfig("setSize", {
                value: ((e.setSize === false) ? false: true),
                validator: YAHOO.lang.isBoolean
            });
            this.setAttributeConfig("wrap", {
                writeOnce: true,
                validator: YAHOO.lang.isBoolean,
                value: e.wrap || false
            });
            this.setAttributeConfig("handles", {
                writeOnce: true,
                value: e.handles || ["r", "b", "br"],
                validator: function(f) {
                    if (c.isString(f) && f.toLowerCase() == "all") {
                        f = ["t", "b", "r", "l", "bl", "br", "tl", "tr"]
                    }
                    if (!c.isArray(f)) {
                        f = f.replace(/, /g, ",");
                        f = f.split(",")
                    }
                    this._configs.handles.value = f
                }
            });
            this.setAttributeConfig("width", {
                value: e.width || parseInt(this.getStyle("width"), 10),
                validator: YAHOO.lang.isNumber,
                method: function(f) {
                    f = parseInt(f, 10);
                    if (f > 0) {
                        if (this.get("setSize")) {
                            this.setStyle("width", f - (b._padding * 2) + "px")
                        }
                        this._cache.width = f;
                        this._configs.width.value = f
                    }
                }
            });
            this.setAttributeConfig("height", {
                value: e.height || parseInt(this.getStyle("height"), 10),
                validator: YAHOO.lang.isNumber,
                method: function(f) {
                    f = parseInt(f, 10);
                    if (f > 0) {
                        if (this.get("setSize")) {
                            this.setStyle("height", f - (b._padding * 2) + "px")
                        }
                        this._cache.height = f;
                        this._configs.height.value = f
                    }
                }
            });
            this.setAttributeConfig("minWidth", {
                value: e.minWidth || 15,
                validator: YAHOO.lang.isNumber
            });
            this.setAttributeConfig("minHeight", {
                value: e.minHeight || 15,
                validator: YAHOO.lang.isNumber
            });
            this.setAttributeConfig("maxWidth", {
                value: e.maxWidth || 10000,
                validator: YAHOO.lang.isNumber
            });
            this.setAttributeConfig("maxHeight", {
                value: e.maxHeight || 10000,
                validator: YAHOO.lang.isNumber
            });
            this.setAttributeConfig("minY", {
                value: e.minY || false
            });
            this.setAttributeConfig("minX", {
                value: e.minX || false
            });
            this.setAttributeConfig("maxY", {
                value: e.maxY || false
            });
            this.setAttributeConfig("maxX", {
                value: e.maxX || false
            });
            this.setAttributeConfig("animate", {
                value: e.animate || false,
                validator: function(g) {
                    var f = true;
                    if (!YAHOO.util.Anim) {
                        f = false
                    }
                    return f
                }
            });
            this.setAttributeConfig("animateEasing", {
                value: e.animateEasing ||
                function() {
                    var f = false;
                    if (YAHOO.util.Easing && YAHOO.util.Easing.easeOut) {
                        f = YAHOO.util.Easing.easeOut
                    }
                    return f
                } ()
            });
            this.setAttributeConfig("animateDuration", {
                value: e.animateDuration || 0.5
            });
            this.setAttributeConfig("proxy", {
                value: e.proxy || false,
                validator: YAHOO.lang.isBoolean
            });
            this.setAttributeConfig("ratio", {
                value: e.ratio || false,
                validator: YAHOO.lang.isBoolean
            });
            this.setAttributeConfig("ghost", {
                value: e.ghost || false,
                validator: YAHOO.lang.isBoolean
            });
            this.setAttributeConfig("draggable", {
                value: e.draggable || false,
                validator: YAHOO.lang.isBoolean,
                method: function(f) {
                    if (f && this._wrap) {
                        this._setupDragDrop()
                    } else {
                        if (this.dd) {
                            d.removeClass(this._wrap, this.CSS_DRAG);
                            this.dd.unreg()
                        }
                    }
                }
            });
            this.setAttributeConfig("hover", {
                value: e.hover || false,
                validator: YAHOO.lang.isBoolean
            });
            this.setAttributeConfig("hiddenHandles", {
                value: e.hiddenHandles || false,
                validator: YAHOO.lang.isBoolean
            });
            this.setAttributeConfig("knobHandles", {
                value: e.knobHandles || false,
                validator: YAHOO.lang.isBoolean
            });
            this.setAttributeConfig("xTicks", {
                value: e.xTicks || false
            });
            this.setAttributeConfig("yTicks", {
                value: e.yTicks || false
            });
            this.setAttributeConfig("status", {
                value: e.status || false,
                validator: YAHOO.lang.isBoolean
            });
            this.setAttributeConfig("autoRatio", {
                value: e.autoRatio || false,
                validator: YAHOO.lang.isBoolean
            })
        },
        destroy: function() {
            for (var f in this._handles) {
                if (c.hasOwnProperty(this._handles, f)) {
                    a.purgeElement(this._handles[f]);
                    this._handles[f].parentNode.removeChild(this._handles[f])
                }
            }
            if (this._proxy) {
                this._proxy.parentNode.removeChild(this._proxy)
            }
            if (this._status) {
                this._status.parentNode.removeChild(this._status)
            }
            if (this.dd) {
                this.dd.unreg();
                d.removeClass(this._wrap, this.CSS_DRAG)
            }
            if (this._wrap != this.get("element")) {
                this.setStyle("position", "");
                this.setStyle("top", "");
                this.setStyle("left", "");
                this._wrap.parentNode.replaceChild(this.get("element"), this._wrap)
            }
            this.removeClass(this.CSS_RESIZE);
            delete YAHOO.util.Resize._instances[this.get("id")];
            for (var e in this) {
                if (c.hasOwnProperty(this, e)) {
                    this[e] = null;
                    delete this[e]
                }
            }
        },
        toString: function() {
            if (this.get) {
                return "Resize (#" + this.get("id") + ")"
            }
            return "Resize Utility"
        }
    });
    YAHOO.util.Resize = b
})();
YAHOO.register("resize", YAHOO.util.Resize, {
    version: "2.6.0",
    build: "1321"
});