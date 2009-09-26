/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function() {
    var l = this,
    g, y = l.jQuery,
    p = l.$,
    o = l.jQuery = l.$ = function(E, F) {
        return new o.fn.init(E, F)
    },
    D = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
    f = /^.[^:#\[\.,]*$/;
    o.fn = o.prototype = {
        init: function(E, H) {
            E = E || document;
            if (E.nodeType) {
                this[0] = E;
                this.length = 1;
                this.context = E;
                return this
            }
            if (typeof E === "string") {
                var G = D.exec(E);
                if (G && (G[1] || !H)) {
                    if (G[1]) {
                        E = o.clean([G[1]], H)
                    } else {
                        var I = document.getElementById(G[3]);
                        if (I && I.id != G[3]) {
                            return o().find(E)
                        }
                        var F = o(I || []);
                        F.context = document;
                        F.selector = E;
                        return F
                    }
                } else {
                    return o(H).find(E)
                }
            } else {
                if (o.isFunction(E)) {
                    return o(document).ready(E)
                }
            }
            if (E.selector && E.context) {
                this.selector = E.selector;
                this.context = E.context
            }
            return this.setArray(o.isArray(E) ? E: o.makeArray(E))
        },
        selector: "",
        jquery: "1.3.2",
        size: function() {
            return this.length
        },
        get: function(E) {
            return E === g ? Array.prototype.slice.call(this) : this[E]
        },
        pushStack: function(F, H, E) {
            var G = o(F);
            G.prevObject = this;
            G.context = this.context;
            if (H === "find") {
                G.selector = this.selector + (this.selector ? " ": "") + E
            } else {
                if (H) {
                    G.selector = this.selector + "." + H + "(" + E + ")"
                }
            }
            return G
        },
        setArray: function(E) {
            this.length = 0;
            Array.prototype.push.apply(this, E);
            return this
        },
        each: function(F, E) {
            return o.each(this, F, E)
        },
        index: function(E) {
            return o.inArray(E && E.jquery ? E[0] : E, this)
        },
        attr: function(F, H, G) {
            var E = F;
            if (typeof F === "string") {
                if (H === g) {
                    return this[0] && o[G || "attr"](this[0], F)
                } else {
                    E = {};
                    E[F] = H
                }
            }
            return this.each(function(I) {
                for (F in E) {
                    o.attr(G ? this.style: this, F, o.prop(this, E[F], G, I, F))
                }
            })
        },
        css: function(E, F) {
            if ((E == "width" || E == "height") && parseFloat(F) < 0) {
                F = g
            }
            return this.attr(E, F, "curCSS")
        },
        text: function(F) {
            if (typeof F !== "object" && F != null) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(F))
            }
            var E = "";
            o.each(F || this,
            function() {
                o.each(this.childNodes,
                function() {
                    if (this.nodeType != 8) {
                        E += this.nodeType != 1 ? this.nodeValue: o.fn.text([this])
                    }
                })
            });
            return E
        },
        wrapAll: function(E) {
            if (this[0]) {
                var F = o(E, this[0].ownerDocument).clone();
                if (this[0].parentNode) {
                    F.insertBefore(this[0])
                }
                F.map(function() {
                    var G = this;
                    while (G.firstChild) {
                        G = G.firstChild
                    }
                    return G
                }).append(this)
            }
            return this
        },
        wrapInner: function(E) {
            return this.each(function() {
                o(this).contents().wrapAll(E)
            })
        },
        wrap: function(E) {
            return this.each(function() {
                o(this).wrapAll(E)
            })
        },
        append: function() {
            return this.domManip(arguments, true,
            function(E) {
                if (this.nodeType == 1) {
                    this.appendChild(E)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true,
            function(E) {
                if (this.nodeType == 1) {
                    this.insertBefore(E, this.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, false,
            function(E) {
                this.parentNode.insertBefore(E, this)
            })
        },
        after: function() {
            return this.domManip(arguments, false,
            function(E) {
                this.parentNode.insertBefore(E, this.nextSibling)
            })
        },
        end: function() {
            return this.prevObject || o([])
        },
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        find: function(E) {
            if (this.length === 1) {
                var F = this.pushStack([], "find", E);
                F.length = 0;
                o.find(E, this[0], F);
                return F
            } else {
                return this.pushStack(o.unique(o.map(this,
                function(G) {
                    return o.find(E, G)
                })), "find", E)
            }
        },
        clone: function(G) {
            var E = this.map(function() {
                if (!o.support.noCloneEvent && !o.isXMLDoc(this)) {
                    var I = this.outerHTML;
                    if (!I) {
                        var J = this.ownerDocument.createElement("div");
                        J.appendChild(this.cloneNode(true));
                        I = J.innerHTML
                    }
                    return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0]
                } else {
                    return this.cloneNode(true)
                }
            });
            if (G === true) {
                var H = this.find("*").andSelf(),
                F = 0;
                E.find("*").andSelf().each(function() {
                    if (this.nodeName !== H[F].nodeName) {
                        return
                    }
                    var I = o.data(H[F], "events");
                    for (var K in I) {
                        for (var J in I[K]) {
                            o.event.add(this, K, I[K][J], I[K][J].data)
                        }
                    }
                    F++
                })
            }
            return E
        },
        filter: function(E) {
            return this.pushStack(o.isFunction(E) && o.grep(this,
            function(G, F) {
                return E.call(G, F)
            }) || o.multiFilter(E, o.grep(this,
            function(F) {
                return F.nodeType === 1
            })), "filter", E)
        },
        closest: function(E) {
            var G = o.expr.match.POS.test(E) ? o(E) : null,
            F = 0;
            return this.map(function() {
                var H = this;
                while (H && H.ownerDocument) {
                    if (G ? G.index(H) > -1 : o(H).is(E)) {
                        o.data(H, "closest", F);
                        return H
                    }
                    H = H.parentNode;
                    F++
                }
            })
        },
        not: function(E) {
            if (typeof E === "string") {
                if (f.test(E)) {
                    return this.pushStack(o.multiFilter(E, this, true), "not", E)
                } else {
                    E = o.multiFilter(E, this)
                }
            }
            var F = E.length && E[E.length - 1] !== g && !E.nodeType;
            return this.filter(function() {
                return F ? o.inArray(this, E) < 0 : this != E
            })
        },
        add: function(E) {
            return this.pushStack(o.unique(o.merge(this.get(), typeof E === "string" ? o(E) : o.makeArray(E))))
        },
        is: function(E) {
            return !! E && o.multiFilter(E, this).length > 0
        },
        hasClass: function(E) {
            return !! E && this.is("." + E)
        },
        val: function(K) {
            if (K === g) {
                var E = this[0];
                if (E) {
                    if (o.nodeName(E, "option")) {
                        return (E.attributes.value || {}).specified ? E.value: E.text
                    }
                    if (o.nodeName(E, "select")) {
                        var I = E.selectedIndex,
                        L = [],
                        M = E.options,
                        H = E.type == "select-one";
                        if (I < 0) {
                            return null
                        }
                        for (var F = H ? I: 0, J = H ? I + 1 : M.length; F < J; F++) {
                            var G = M[F];
                            if (G.selected) {
                                K = o(G).val();
                                if (H) {
                                    return K
                                }
                                L.push(K)
                            }
                        }
                        return L
                    }
                    return (E.value || "").replace(/\r/g, "")
                }
                return g
            }
            if (typeof K === "number") {
                K += ""
            }
            return this.each(function() {
                if (this.nodeType != 1) {
                    return
                }
                if (o.isArray(K) && /radio|checkbox/.test(this.type)) {
                    this.checked = (o.inArray(this.value, K) >= 0 || o.inArray(this.name, K) >= 0)
                } else {
                    if (o.nodeName(this, "select")) {
                        var N = o.makeArray(K);
                        o("option", this).each(function() {
                            this.selected = (o.inArray(this.value, N) >= 0 || o.inArray(this.text, N) >= 0)
                        });
                        if (!N.length) {
                            this.selectedIndex = -1
                        }
                    } else {
                        this.value = K
                    }
                }
            })
        },
        html: function(E) {
            return E === g ? (this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null) : this.empty().append(E)
        },
        replaceWith: function(E) {
            return this.after(E).remove()
        },
        eq: function(E) {
            return this.slice(E, +E + 1)
        },
        slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments), "slice", Array.prototype.slice.call(arguments).join(","))
        },
        map: function(E) {
            return this.pushStack(o.map(this,
            function(G, F) {
                return E.call(G, F, G)
            }))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        },
        domManip: function(J, M, L) {
            if (this[0]) {
                var I = (this[0].ownerDocument || this[0]).createDocumentFragment(),
                F = o.clean(J, (this[0].ownerDocument || this[0]), I),
                H = I.firstChild;
                if (H) {
                    for (var G = 0,
                    E = this.length; G < E; G++) {
                        L.call(K(this[G], H), this.length > 1 || G > 0 ? I.cloneNode(true) : I)
                    }
                }
                if (F) {
                    o.each(F, z)
                }
            }
            return this;
            function K(N, O) {
                return M && o.nodeName(N, "table") && o.nodeName(O, "tr") ? (N.getElementsByTagName("tbody")[0] || N.appendChild(N.ownerDocument.createElement("tbody"))) : N
            }
        }
    };
    o.fn.init.prototype = o.fn;
    function z(E, F) {
        if (F.src) {
            o.ajax({
                url: F.src,
                async: false,
                dataType: "script"
            })
        } else {
            o.globalEval(F.text || F.textContent || F.innerHTML || "")
        }
        if (F.parentNode) {
            F.parentNode.removeChild(F)
        }
    }
    function e() {
        return + new Date
    }
    o.extend = o.fn.extend = function() {
        var J = arguments[0] || {},
        H = 1,
        I = arguments.length,
        E = false,
        G;
        if (typeof J === "boolean") {
            E = J;
            J = arguments[1] || {};
            H = 2
        }
        if (typeof J !== "object" && !o.isFunction(J)) {
            J = {}
        }
        if (I == H) {
            J = this; --H
        }
        for (; H < I; H++) {
            if ((G = arguments[H]) != null) {
                for (var F in G) {
                    var K = J[F],
                    L = G[F];
                    if (J === L) {
                        continue
                    }
                    if (E && L && typeof L === "object" && !L.nodeType) {
                        J[F] = o.extend(E, K || (L.length != null ? [] : {}), L)
                    } else {
                        if (L !== g) {
                            J[F] = L
                        }
                    }
                }
            }
        }
        return J
    };
    var b = /z-?index|font-?weight|opacity|zoom|line-?height/i,
    q = document.defaultView || {},
    s = Object.prototype.toString;
    o.extend({
        noConflict: function(E) {
            l.$ = p;
            if (E) {
                l.jQuery = y
            }
            return o
        },
        isFunction: function(E) {
            return s.call(E) === "[object Function]"
        },
        isArray: function(E) {
            return s.call(E) === "[object Array]"
        },
        isXMLDoc: function(E) {
            return E.nodeType === 9 && E.documentElement.nodeName !== "HTML" || !!E.ownerDocument && o.isXMLDoc(E.ownerDocument)
        },
        globalEval: function(G) {
            if (G && /\S/.test(G)) {
                var F = document.getElementsByTagName("head")[0] || document.documentElement,
                E = document.createElement("script");
                E.type = "text/javascript";
                if (o.support.scriptEval) {
                    E.appendChild(document.createTextNode(G))
                } else {
                    E.text = G
                }
                F.insertBefore(E, F.firstChild);
                F.removeChild(E)
            }
        },
        nodeName: function(F, E) {
            return F.nodeName && F.nodeName.toUpperCase() == E.toUpperCase()
        },
        each: function(G, K, F) {
            var E, H = 0,
            I = G.length;
            if (F) {
                if (I === g) {
                    for (E in G) {
                        if (K.apply(G[E], F) === false) {
                            break
                        }
                    }
                } else {
                    for (; H < I;) {
                        if (K.apply(G[H++], F) === false) {
                            break
                        }
                    }
                }
            } else {
                if (I === g) {
                    for (E in G) {
                        if (K.call(G[E], E, G[E]) === false) {
                            break
                        }
                    }
                } else {
                    for (var J = G[0]; H < I && K.call(J, H, J) !== false; J = G[++H]) {}
                }
            }
            return G
        },
        prop: function(H, I, G, F, E) {
            if (o.isFunction(I)) {
                I = I.call(H, F)
            }
            return typeof I === "number" && G == "curCSS" && !b.test(E) ? I + "px": I
        },
        className: {
            add: function(E, F) {
                o.each((F || "").split(/\s+/),
                function(G, H) {
                    if (E.nodeType == 1 && !o.className.has(E.className, H)) {
                        E.className += (E.className ? " ": "") + H
                    }
                })
            },
            remove: function(E, F) {
                if (E.nodeType == 1) {
                    E.className = F !== g ? o.grep(E.className.split(/\s+/),
                    function(G) {
                        return ! o.className.has(F, G)
                    }).join(" ") : ""
                }
            },
            has: function(F, E) {
                return F && o.inArray(E, (F.className || F).toString().split(/\s+/)) > -1
            }
        },
        swap: function(H, G, I) {
            var E = {};
            for (var F in G) {
                E[F] = H.style[F];
                H.style[F] = G[F]
            }
            I.call(H);
            for (var F in G) {
                H.style[F] = E[F]
            }
        },
        css: function(H, F, J, E) {
            if (F == "width" || F == "height") {
                var L, G = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                K = F == "width" ? ["Left", "Right"] : ["Top", "Bottom"];
                function I() {
                    L = F == "width" ? H.offsetWidth: H.offsetHeight;
                    if (E === "border") {
                        return
                    }
                    o.each(K,
                    function() {
                        if (!E) {
                            L -= parseFloat(o.curCSS(H, "padding" + this, true)) || 0
                        }
                        if (E === "margin") {
                            L += parseFloat(o.curCSS(H, "margin" + this, true)) || 0
                        } else {
                            L -= parseFloat(o.curCSS(H, "border" + this + "Width", true)) || 0
                        }
                    })
                }
                if (H.offsetWidth !== 0) {
                    I()
                } else {
                    o.swap(H, G, I)
                }
                return Math.max(0, Math.round(L))
            }
            return o.curCSS(H, F, J)
        },
        curCSS: function(I, F, G) {
            var L, E = I.style;
            if (F == "opacity" && !o.support.opacity) {
                L = o.attr(E, "opacity");
                return L == "" ? "1": L
            }
            if (F.match(/float/i)) {
                F = w
            }
            if (!G && E && E[F]) {
                L = E[F]
            } else {
                if (q.getComputedStyle) {
                    if (F.match(/float/i)) {
                        F = "float"
                    }
                    F = F.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var M = q.getComputedStyle(I, null);
                    if (M) {
                        L = M.getPropertyValue(F)
                    }
                    if (F == "opacity" && L == "") {
                        L = "1"
                    }
                } else {
                    if (I.currentStyle) {
                        var J = F.replace(/\-(\w)/g,
                        function(N, O) {
                            return O.toUpperCase()
                        });
                        L = I.currentStyle[F] || I.currentStyle[J];
                        if (!/^\d+(px)?$/i.test(L) && /^\d/.test(L)) {
                            var H = E.left,
                            K = I.runtimeStyle.left;
                            I.runtimeStyle.left = I.currentStyle.left;
                            E.left = L || 0;
                            L = E.pixelLeft + "px";
                            E.left = H;
                            I.runtimeStyle.left = K
                        }
                    }
                }
            }
            return L
        },
        clean: function(F, K, I) {
            K = K || document;
            if (typeof K.createElement === "undefined") {
                K = K.ownerDocument || K[0] && K[0].ownerDocument || document
            }
            if (!I && F.length === 1 && typeof F[0] === "string") {
                var H = /^<(\w+)\s*\/?>$/.exec(F[0]);
                if (H) {
                    return [K.createElement(H[1])]
                }
            }
            var G = [],
            E = [],
            L = K.createElement("div");
            o.each(F,
            function(P, S) {
                if (typeof S === "number") {
                    S += ""
                }
                if (!S) {
                    return
                }
                if (typeof S === "string") {
                    S = S.replace(/(<(\w+)[^>]*?)\/>/g,
                    function(U, V, T) {
                        return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? U: V + "></" + T + ">"
                    });
                    var O = S.replace(/^\s+/, "").substring(0, 10).toLowerCase();
                    var Q = !O.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !O.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || O.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !O.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!O.indexOf("<td") || !O.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !O.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || !o.support.htmlSerialize && [1, "div<div>", "</div>"] || [0, "", ""];
                    L.innerHTML = Q[1] + S + Q[2];
                    while (Q[0]--) {
                        L = L.lastChild
                    }
                    if (!o.support.tbody) {
                        var R = /<tbody/i.test(S),
                        N = !O.indexOf("<table") && !R ? L.firstChild && L.firstChild.childNodes: Q[1] == "<table>" && !R ? L.childNodes: [];
                        for (var M = N.length - 1; M >= 0; --M) {
                            if (o.nodeName(N[M], "tbody") && !N[M].childNodes.length) {
                                N[M].parentNode.removeChild(N[M])
                            }
                        }
                    }
                    if (!o.support.leadingWhitespace && /^\s/.test(S)) {
                        L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]), L.firstChild)
                    }
                    S = o.makeArray(L.childNodes)
                }
                if (S.nodeType) {
                    G.push(S)
                } else {
                    G = o.merge(G, S)
                }
            });
            if (I) {
                for (var J = 0; G[J]; J++) {
                    if (o.nodeName(G[J], "script") && (!G[J].type || G[J].type.toLowerCase() === "text/javascript")) {
                        E.push(G[J].parentNode ? G[J].parentNode.removeChild(G[J]) : G[J])
                    } else {
                        if (G[J].nodeType === 1) {
                            G.splice.apply(G, [J + 1, 0].concat(o.makeArray(G[J].getElementsByTagName("script"))))
                        }
                        I.appendChild(G[J])
                    }
                }
                return E
            }
            return G
        },
        attr: function(J, G, K) {
            if (!J || J.nodeType == 3 || J.nodeType == 8) {
                return g
            }
            var H = !o.isXMLDoc(J),
            L = K !== g;
            G = H && o.props[G] || G;
            if (J.tagName) {
                var F = /href|src|style/.test(G);
                if (G == "selected" && J.parentNode) {
                    J.parentNode.selectedIndex
                }
                if (G in J && H && !F) {
                    if (L) {
                        if (G == "type" && o.nodeName(J, "input") && J.parentNode) {
                            throw "type property can't be changed"
                        }
                        J[G] = K
                    }
                    if (o.nodeName(J, "form") && J.getAttributeNode(G)) {
                        return J.getAttributeNode(G).nodeValue
                    }
                    if (G == "tabIndex") {
                        var I = J.getAttributeNode("tabIndex");
                        return I && I.specified ? I.value: J.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : J.nodeName.match(/^(a|area)$/i) && J.href ? 0 : g
                    }
                    return J[G]
                }
                if (!o.support.style && H && G == "style") {
                    return o.attr(J.style, "cssText", K)
                }
                if (L) {
                    J.setAttribute(G, "" + K)
                }
                var E = !o.support.hrefNormalized && H && F ? J.getAttribute(G, 2) : J.getAttribute(G);
                return E === null ? g: E
            }
            if (!o.support.opacity && G == "opacity") {
                if (L) {
                    J.zoom = 1;
                    J.filter = (J.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(K) + "" == "NaN" ? "": "alpha(opacity=" + K * 100 + ")")
                }
                return J.filter && J.filter.indexOf("opacity=") >= 0 ? (parseFloat(J.filter.match(/opacity=([^)]*)/)[1]) / 100) + "": ""
            }
            G = G.replace(/-([a-z])/ig,
            function(M, N) {
                return N.toUpperCase()
            });
            if (L) {
                J[G] = K
            }
            return J[G]
        },
        trim: function(E) {
            return (E || "").replace(/^\s+|\s+$/g, "")
        },
        makeArray: function(G) {
            var E = [];
            if (G != null) {
                var F = G.length;
                if (F == null || typeof G === "string" || o.isFunction(G) || G.setInterval) {
                    E[0] = G
                } else {
                    while (F) {
                        E[--F] = G[F]
                    }
                }
            }
            return E
        },
        inArray: function(G, H) {
            for (var E = 0,
            F = H.length; E < F; E++) {
                if (H[E] === G) {
                    return E
                }
            }
            return - 1
        },
        merge: function(H, E) {
            var F = 0,
            G, I = H.length;
            if (!o.support.getAll) {
                while ((G = E[F++]) != null) {
                    if (G.nodeType != 8) {
                        H[I++] = G
                    }
                }
            } else {
                while ((G = E[F++]) != null) {
                    H[I++] = G
                }
            }
            return H
        },
        unique: function(K) {
            var F = [],
            E = {};
            try {
                for (var G = 0,
                H = K.length; G < H; G++) {
                    var J = o.data(K[G]);
                    if (!E[J]) {
                        E[J] = true;
                        F.push(K[G])
                    }
                }
            } catch(I) {
                F = K
            }
            return F
        },
        grep: function(F, J, E) {
            var G = [];
            for (var H = 0,
            I = F.length; H < I; H++) {
                if (!E != !J(F[H], H)) {
                    G.push(F[H])
                }
            }
            return G
        },
        map: function(E, J) {
            var F = [];
            for (var G = 0,
            H = E.length; G < H; G++) {
                var I = J(E[G], G);
                if (I != null) {
                    F[F.length] = I
                }
            }
            return F.concat.apply([], F)
        }
    });
    var C = navigator.userAgent.toLowerCase();
    o.browser = {
        version: (C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
        safari: /webkit/.test(C),
        opera: /opera/.test(C),
        msie: /msie/.test(C) && !/opera/.test(C),
        mozilla: /mozilla/.test(C) && !/(compatible|webkit)/.test(C)
    };
    o.each({
        parent: function(E) {
            return E.parentNode
        },
        parents: function(E) {
            return o.dir(E, "parentNode")
        },
        next: function(E) {
            return o.nth(E, 2, "nextSibling")
        },
        prev: function(E) {
            return o.nth(E, 2, "previousSibling")
        },
        nextAll: function(E) {
            return o.dir(E, "nextSibling")
        },
        prevAll: function(E) {
            return o.dir(E, "previousSibling")
        },
        siblings: function(E) {
            return o.sibling(E.parentNode.firstChild, E)
        },
        children: function(E) {
            return o.sibling(E.firstChild)
        },
        contents: function(E) {
            return o.nodeName(E, "iframe") ? E.contentDocument || E.contentWindow.document: o.makeArray(E.childNodes)
        }
    },
    function(E, F) {
        o.fn[E] = function(G) {
            var H = o.map(this, F);
            if (G && typeof G == "string") {
                H = o.multiFilter(G, H)
            }
            return this.pushStack(o.unique(H), E, G)
        }
    });
    o.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(E, F) {
        o.fn[E] = function(G) {
            var J = [],
            L = o(G);
            for (var K = 0,
            H = L.length; K < H; K++) {
                var I = (K > 0 ? this.clone(true) : this).get();
                o.fn[F].apply(o(L[K]), I);
                J = J.concat(I)
            }
            return this.pushStack(J, E, G)
        }
    });
    o.each({
        removeAttr: function(E) {
            o.attr(this, E, "");
            if (this.nodeType == 1) {
                this.removeAttribute(E)
            }
        },
        addClass: function(E) {
            o.className.add(this, E)
        },
        removeClass: function(E) {
            o.className.remove(this, E)
        },
        toggleClass: function(F, E) {
            if (typeof E !== "boolean") {
                E = !o.className.has(this, F)
            }
            o.className[E ? "add": "remove"](this, F)
        },
        remove: function(E) {
            if (!E || o.filter(E, [this]).length) {
                o("*", this).add([this]).each(function() {
                    o.event.remove(this);
                    o.removeData(this)
                });
                if (this.parentNode) {
                    this.parentNode.removeChild(this)
                }
            }
        },
        empty: function() {
            o(this).children().remove();
            while (this.firstChild) {
                this.removeChild(this.firstChild)
            }
        }
    },
    function(E, F) {
        o.fn[E] = function() {
            return this.each(F, arguments)
        }
    });
    function j(E, F) {
        return E[0] && parseInt(o.curCSS(E[0], F, true), 10) || 0
    }
    var h = "jQuery" + e(),
    v = 0,
    A = {};
    o.extend({
        cache: {},
        data: function(F, E, G) {
            F = F == l ? A: F;
            var H = F[h];
            if (!H) {
                H = F[h] = ++v
            }
            if (E && !o.cache[H]) {
                o.cache[H] = {}
            }
            if (G !== g) {
                o.cache[H][E] = G
            }
            return E ? o.cache[H][E] : H
        },
        removeData: function(F, E) {
            F = F == l ? A: F;
            var H = F[h];
            if (E) {
                if (o.cache[H]) {
                    delete o.cache[H][E];
                    E = "";
                    for (E in o.cache[H]) {
                        break
                    }
                    if (!E) {
                        o.removeData(F)
                    }
                }
            } else {
                try {
                    delete F[h]
                } catch(G) {
                    if (F.removeAttribute) {
                        F.removeAttribute(h)
                    }
                }
                delete o.cache[H]
            }
        },
        queue: function(F, E, H) {
            if (F) {
                E = (E || "fx") + "queue";
                var G = o.data(F, E);
                if (!G || o.isArray(H)) {
                    G = o.data(F, E, o.makeArray(H))
                } else {
                    if (H) {
                        G.push(H)
                    }
                }
            }
            return G
        },
        dequeue: function(H, G) {
            var E = o.queue(H, G),
            F = E.shift();
            if (!G || G === "fx") {
                F = E[0]
            }
            if (F !== g) {
                F.call(H)
            }
        }
    });
    o.fn.extend({
        data: function(E, G) {
            var H = E.split(".");
            H[1] = H[1] ? "." + H[1] : "";
            if (G === g) {
                var F = this.triggerHandler("getData" + H[1] + "!", [H[0]]);
                if (F === g && this.length) {
                    F = o.data(this[0], E)
                }
                return F === g && H[1] ? this.data(H[0]) : F
            } else {
                return this.trigger("setData" + H[1] + "!", [H[0], G]).each(function() {
                    o.data(this, E, G)
                })
            }
        },
        removeData: function(E) {
            return this.each(function() {
                o.removeData(this, E)
            })
        },
        queue: function(E, F) {
            if (typeof E !== "string") {
                F = E;
                E = "fx"
            }
            if (F === g) {
                return o.queue(this[0], E)
            }
            return this.each(function() {
                var G = o.queue(this, E, F);
                if (E == "fx" && G.length == 1) {
                    G[0].call(this)
                }
            })
        },
        dequeue: function(E) {
            return this.each(function() {
                o.dequeue(this, E)
            })
        }
    });
    /*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
    (function() {
        var R = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
        L = 0,
        H = Object.prototype.toString;
        var F = function(Y, U, ab, ac) {
            ab = ab || [];
            U = U || document;
            if (U.nodeType !== 1 && U.nodeType !== 9) {
                return []
            }
            if (!Y || typeof Y !== "string") {
                return ab
            }
            var Z = [],
            W,
            af,
            ai,
            T,
            ad,
            V,
            X = true;
            R.lastIndex = 0;
            while ((W = R.exec(Y)) !== null) {
                Z.push(W[1]);
                if (W[2]) {
                    V = RegExp.rightContext;
                    break
                }
            }
            if (Z.length > 1 && M.exec(Y)) {
                if (Z.length === 2 && I.relative[Z[0]]) {
                    af = J(Z[0] + Z[1], U)
                } else {
                    af = I.relative[Z[0]] ? [U] : F(Z.shift(), U);
                    while (Z.length) {
                        Y = Z.shift();
                        if (I.relative[Y]) {
                            Y += Z.shift()
                        }
                        af = J(Y, af)
                    }
                }
            } else {
                var ae = ac ? {
                    expr: Z.pop(),
                    set: E(ac)
                }: F.find(Z.pop(), Z.length === 1 && U.parentNode ? U.parentNode: U, Q(U));
                af = F.filter(ae.expr, ae.set);
                if (Z.length > 0) {
                    ai = E(af)
                } else {
                    X = false
                }
                while (Z.length) {
                    var ah = Z.pop(),
                    ag = ah;
                    if (!I.relative[ah]) {
                        ah = ""
                    } else {
                        ag = Z.pop()
                    }
                    if (ag == null) {
                        ag = U
                    }
                    I.relative[ah](ai, ag, Q(U))
                }
            }
            if (!ai) {
                ai = af
            }
            if (!ai) {
                throw "Syntax error, unrecognized expression: " + (ah || Y)
            }
            if (H.call(ai) === "[object Array]") {
                if (!X) {
                    ab.push.apply(ab, ai)
                } else {
                    if (U.nodeType === 1) {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && (ai[aa] === true || ai[aa].nodeType === 1 && K(U, ai[aa]))) {
                                ab.push(af[aa])
                            }
                        }
                    } else {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && ai[aa].nodeType === 1) {
                                ab.push(af[aa])
                            }
                        }
                    }
                }
            } else {
                E(ai, ab)
            }
            if (V) {
                F(V, U, ab, ac);
                if (G) {
                    hasDuplicate = false;
                    ab.sort(G);
                    if (hasDuplicate) {
                        for (var aa = 1; aa < ab.length; aa++) {
                            if (ab[aa] === ab[aa - 1]) {
                                ab.splice(aa--, 1)
                            }
                        }
                    }
                }
            }
            return ab
        };
        F.matches = function(T, U) {
            return F(T, null, null, U)
        };
        F.find = function(aa, T, ab) {
            var Z, X;
            if (!aa) {
                return []
            }
            for (var W = 0,
            V = I.order.length; W < V; W++) {
                var Y = I.order[W],
                X;
                if ((X = I.match[Y].exec(aa))) {
                    var U = RegExp.leftContext;
                    if (U.substr(U.length - 1) !== "\\") {
                        X[1] = (X[1] || "").replace(/\\/g, "");
                        Z = I.find[Y](X, T, ab);
                        if (Z != null) {
                            aa = aa.replace(I.match[Y], "");
                            break
                        }
                    }
                }
            }
            if (!Z) {
                Z = T.getElementsByTagName("*")
            }
            return {
                set: Z,
                expr: aa
            }
        };
        F.filter = function(ad, ac, ag, W) {
            var V = ad,
            ai = [],
            aa = ac,
            Y,
            T,
            Z = ac && ac[0] && Q(ac[0]);
            while (ad && ac.length) {
                for (var ab in I.filter) {
                    if ((Y = I.match[ab].exec(ad)) != null) {
                        var U = I.filter[ab],
                        ah,
                        af;
                        T = false;
                        if (aa == ai) {
                            ai = []
                        }
                        if (I.preFilter[ab]) {
                            Y = I.preFilter[ab](Y, aa, ag, ai, W, Z);
                            if (!Y) {
                                T = ah = true
                            } else {
                                if (Y === true) {
                                    continue
                                }
                            }
                        }
                        if (Y) {
                            for (var X = 0; (af = aa[X]) != null; X++) {
                                if (af) {
                                    ah = U(af, Y, X, aa);
                                    var ae = W ^ !!ah;
                                    if (ag && ah != null) {
                                        if (ae) {
                                            T = true
                                        } else {
                                            aa[X] = false
                                        }
                                    } else {
                                        if (ae) {
                                            ai.push(af);
                                            T = true
                                        }
                                    }
                                }
                            }
                        }
                        if (ah !== g) {
                            if (!ag) {
                                aa = ai
                            }
                            ad = ad.replace(I.match[ab], "");
                            if (!T) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (ad == V) {
                    if (T == null) {
                        throw "Syntax error, unrecognized expression: " + ad
                    } else {
                        break
                    }
                }
                V = ad
            }
            return aa
        };
        var I = F.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(T) {
                    return T.getAttribute("href")
                }
            },
            relative: {
                "+": function(aa, T, Z) {
                    var X = typeof T === "string",
                    ab = X && !/\W/.test(T),
                    Y = X && !ab;
                    if (ab && !Z) {
                        T = T.toUpperCase()
                    }
                    for (var W = 0,
                    V = aa.length,
                    U; W < V; W++) {
                        if ((U = aa[W])) {
                            while ((U = U.previousSibling) && U.nodeType !== 1) {}
                            aa[W] = Y || U && U.nodeName === T ? U || false: U === T
                        }
                    }
                    if (Y) {
                        F.filter(T, aa, true)
                    }
                },
                ">": function(Z, U, aa) {
                    var X = typeof U === "string";
                    if (X && !/\W/.test(U)) {
                        U = aa ? U: U.toUpperCase();
                        for (var V = 0,
                        T = Z.length; V < T; V++) {
                            var Y = Z[V];
                            if (Y) {
                                var W = Y.parentNode;
                                Z[V] = W.nodeName === U ? W: false
                            }
                        }
                    } else {
                        for (var V = 0,
                        T = Z.length; V < T; V++) {
                            var Y = Z[V];
                            if (Y) {
                                Z[V] = X ? Y.parentNode: Y.parentNode === U
                            }
                        }
                        if (X) {
                            F.filter(U, Z, true)
                        }
                    }
                },
                "": function(W, U, Y) {
                    var V = L++,
                    T = S;
                    if (!U.match(/\W/)) {
                        var X = U = Y ? U: U.toUpperCase();
                        T = P
                    }
                    T("parentNode", U, V, W, X, Y)
                },
                "~": function(W, U, Y) {
                    var V = L++,
                    T = S;
                    if (typeof U === "string" && !U.match(/\W/)) {
                        var X = U = Y ? U: U.toUpperCase();
                        T = P
                    }
                    T("previousSibling", U, V, W, X, Y)
                }
            },
            find: {
                ID: function(U, V, W) {
                    if (typeof V.getElementById !== "undefined" && !W) {
                        var T = V.getElementById(U[1]);
                        return T ? [T] : []
                    }
                },
                NAME: function(V, Y, Z) {
                    if (typeof Y.getElementsByName !== "undefined") {
                        var U = [],
                        X = Y.getElementsByName(V[1]);
                        for (var W = 0,
                        T = X.length; W < T; W++) {
                            if (X[W].getAttribute("name") === V[1]) {
                                U.push(X[W])
                            }
                        }
                        return U.length === 0 ? null: U
                    }
                },
                TAG: function(T, U) {
                    return U.getElementsByTagName(T[1])
                }
            },
            preFilter: {
                CLASS: function(W, U, V, T, Z, aa) {
                    W = " " + W[1].replace(/\\/g, "") + " ";
                    if (aa) {
                        return W
                    }
                    for (var X = 0,
                    Y; (Y = U[X]) != null; X++) {
                        if (Y) {
                            if (Z ^ (Y.className && (" " + Y.className + " ").indexOf(W) >= 0)) {
                                if (!V) {
                                    T.push(Y)
                                }
                            } else {
                                if (V) {
                                    U[X] = false
                                }
                            }
                        }
                    }
                    return false
                },
                ID: function(T) {
                    return T[1].replace(/\\/g, "")
                },
                TAG: function(U, T) {
                    for (var V = 0; T[V] === false; V++) {}
                    return T[V] && Q(T[V]) ? U[1] : U[1].toUpperCase()
                },
                CHILD: function(T) {
                    if (T[1] == "nth") {
                        var U = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2] == "even" && "2n" || T[2] == "odd" && "2n+1" || !/\D/.test(T[2]) && "0n+" + T[2] || T[2]);
                        T[2] = (U[1] + (U[2] || 1)) - 0;
                        T[3] = U[3] - 0
                    }
                    T[0] = L++;
                    return T
                },
                ATTR: function(X, U, V, T, Y, Z) {
                    var W = X[1].replace(/\\/g, "");
                    if (!Z && I.attrMap[W]) {
                        X[1] = I.attrMap[W]
                    }
                    if (X[2] === "~=") {
                        X[4] = " " + X[4] + " "
                    }
                    return X
                },
                PSEUDO: function(X, U, V, T, Y) {
                    if (X[1] === "not") {
                        if (X[3].match(R).length > 1 || /^\w/.test(X[3])) {
                            X[3] = F(X[3], null, null, U)
                        } else {
                            var W = F.filter(X[3], U, V, true ^ Y);
                            if (!V) {
                                T.push.apply(T, W)
                            }
                            return false
                        }
                    } else {
                        if (I.match.POS.test(X[0]) || I.match.CHILD.test(X[0])) {
                            return true
                        }
                    }
                    return X
                },
                POS: function(T) {
                    T.unshift(true);
                    return T
                }
            },
            filters: {
                enabled: function(T) {
                    return T.disabled === false && T.type !== "hidden"
                },
                disabled: function(T) {
                    return T.disabled === true
                },
                checked: function(T) {
                    return T.checked === true
                },
                selected: function(T) {
                    T.parentNode.selectedIndex;
                    return T.selected === true
                },
                parent: function(T) {
                    return !! T.firstChild
                },
                empty: function(T) {
                    return ! T.firstChild
                },
                has: function(V, U, T) {
                    return !! F(T[3], V).length
                },
                header: function(T) {
                    return /h\d/i.test(T.nodeName)
                },
                text: function(T) {
                    return "text" === T.type
                },
                radio: function(T) {
                    return "radio" === T.type
                },
                checkbox: function(T) {
                    return "checkbox" === T.type
                },
                file: function(T) {
                    return "file" === T.type
                },
                password: function(T) {
                    return "password" === T.type
                },
                submit: function(T) {
                    return "submit" === T.type
                },
                image: function(T) {
                    return "image" === T.type
                },
                reset: function(T) {
                    return "reset" === T.type
                },
                button: function(T) {
                    return "button" === T.type || T.nodeName.toUpperCase() === "BUTTON"
                },
                input: function(T) {
                    return /input|select|textarea|button/i.test(T.nodeName)
                }
            },
            setFilters: {
                first: function(U, T) {
                    return T === 0
                },
                last: function(V, U, T, W) {
                    return U === W.length - 1
                },
                even: function(U, T) {
                    return T % 2 === 0
                },
                odd: function(U, T) {
                    return T % 2 === 1
                },
                lt: function(V, U, T) {
                    return U < T[3] - 0
                },
                gt: function(V, U, T) {
                    return U > T[3] - 0
                },
                nth: function(V, U, T) {
                    return T[3] - 0 == U
                },
                eq: function(V, U, T) {
                    return T[3] - 0 == U
                }
            },
            filter: {
                PSEUDO: function(Z, V, W, aa) {
                    var U = V[1],
                    X = I.filters[U];
                    if (X) {
                        return X(Z, W, V, aa)
                    } else {
                        if (U === "contains") {
                            return (Z.textContent || Z.innerText || "").indexOf(V[3]) >= 0
                        } else {
                            if (U === "not") {
                                var Y = V[3];
                                for (var W = 0,
                                T = Y.length; W < T; W++) {
                                    if (Y[W] === Z) {
                                        return false
                                    }
                                }
                                return true
                            }
                        }
                    }
                },
                CHILD: function(T, W) {
                    var Z = W[1],
                    U = T;
                    switch (Z) {
                    case "only":
                    case "first":
                        while (U = U.previousSibling) {
                            if (U.nodeType === 1) {
                                return false
                            }
                        }
                        if (Z == "first") {
                            return true
                        }
                        U = T;
                    case "last":
                        while (U = U.nextSibling) {
                            if (U.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case "nth":
                        var V = W[2],
                        ac = W[3];
                        if (V == 1 && ac == 0) {
                            return true
                        }
                        var Y = W[0],
                        ab = T.parentNode;
                        if (ab && (ab.sizcache !== Y || !T.nodeIndex)) {
                            var X = 0;
                            for (U = ab.firstChild; U; U = U.nextSibling) {
                                if (U.nodeType === 1) {
                                    U.nodeIndex = ++X
                                }
                            }
                            ab.sizcache = Y
                        }
                        var aa = T.nodeIndex - ac;
                        if (V == 0) {
                            return aa == 0
                        } else {
                            return (aa % V == 0 && aa / V >= 0)
                        }
                    }
                },
                ID: function(U, T) {
                    return U.nodeType === 1 && U.getAttribute("id") === T
                },
                TAG: function(U, T) {
                    return (T === "*" && U.nodeType === 1) || U.nodeName === T
                },
                CLASS: function(U, T) {
                    return (" " + (U.className || U.getAttribute("class")) + " ").indexOf(T) > -1
                },
                ATTR: function(Y, W) {
                    var V = W[1],
                    T = I.attrHandle[V] ? I.attrHandle[V](Y) : Y[V] != null ? Y[V] : Y.getAttribute(V),
                    Z = T + "",
                    X = W[2],
                    U = W[4];
                    return T == null ? X === "!=": X === "=" ? Z === U: X === "*=" ? Z.indexOf(U) >= 0 : X === "~=" ? (" " + Z + " ").indexOf(U) >= 0 : !U ? Z && T !== false: X === "!=" ? Z != U: X === "^=" ? Z.indexOf(U) === 0 : X === "$=" ? Z.substr(Z.length - U.length) === U: X === "|=" ? Z === U || Z.substr(0, U.length + 1) === U + "-": false
                },
                POS: function(X, U, V, Y) {
                    var T = U[2],
                    W = I.setFilters[T];
                    if (W) {
                        return W(X, V, U, Y)
                    }
                }
            }
        };
        var M = I.match.POS;
        for (var O in I.match) {
            I.match[O] = RegExp(I.match[O].source + /(?![^\[]*\])(?![^\(]*\))/.source)
        }
        var E = function(U, T) {
            U = Array.prototype.slice.call(U);
            if (T) {
                T.push.apply(T, U);
                return T
            }
            return U
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes)
        } catch(N) {
            E = function(X, W) {
                var U = W || [];
                if (H.call(X) === "[object Array]") {
                    Array.prototype.push.apply(U, X)
                } else {
                    if (typeof X.length === "number") {
                        for (var V = 0,
                        T = X.length; V < T; V++) {
                            U.push(X[V])
                        }
                    } else {
                        for (var V = 0; X[V]; V++) {
                            U.push(X[V])
                        }
                    }
                }
                return U
            }
        }
        var G;
        if (document.documentElement.compareDocumentPosition) {
            G = function(U, T) {
                var V = U.compareDocumentPosition(T) & 4 ? -1 : U === T ? 0 : 1;
                if (V === 0) {
                    hasDuplicate = true
                }
                return V
            }
        } else {
            if ("sourceIndex" in document.documentElement) {
                G = function(U, T) {
                    var V = U.sourceIndex - T.sourceIndex;
                    if (V === 0) {
                        hasDuplicate = true
                    }
                    return V
                }
            } else {
                if (document.createRange) {
                    G = function(W, U) {
                        var V = W.ownerDocument.createRange(),
                        T = U.ownerDocument.createRange();
                        V.selectNode(W);
                        V.collapse(true);
                        T.selectNode(U);
                        T.collapse(true);
                        var X = V.compareBoundaryPoints(Range.START_TO_END, T);
                        if (X === 0) {
                            hasDuplicate = true
                        }
                        return X
                    }
                }
            }
        } (function() {
            var U = document.createElement("form"),
            V = "script" + (new Date).getTime();
            U.innerHTML = "<input name='" + V + "'/>";
            var T = document.documentElement;
            T.insertBefore(U, T.firstChild);
            if ( !! document.getElementById(V)) {
                I.find.ID = function(X, Y, Z) {
                    if (typeof Y.getElementById !== "undefined" && !Z) {
                        var W = Y.getElementById(X[1]);
                        return W ? W.id === X[1] || typeof W.getAttributeNode !== "undefined" && W.getAttributeNode("id").nodeValue === X[1] ? [W] : g: []
                    }
                };
                I.filter.ID = function(Y, W) {
                    var X = typeof Y.getAttributeNode !== "undefined" && Y.getAttributeNode("id");
                    return Y.nodeType === 1 && X && X.nodeValue === W
                }
            }
            T.removeChild(U)
        })(); (function() {
            var T = document.createElement("div");
            T.appendChild(document.createComment(""));
            if (T.getElementsByTagName("*").length > 0) {
                I.find.TAG = function(U, Y) {
                    var X = Y.getElementsByTagName(U[1]);
                    if (U[1] === "*") {
                        var W = [];
                        for (var V = 0; X[V]; V++) {
                            if (X[V].nodeType === 1) {
                                W.push(X[V])
                            }
                        }
                        X = W
                    }
                    return X
                }
            }
            T.innerHTML = "<a href='#'></a>";
            if (T.firstChild && typeof T.firstChild.getAttribute !== "undefined" && T.firstChild.getAttribute("href") !== "#") {
                I.attrHandle.href = function(U) {
                    return U.getAttribute("href", 2)
                }
            }
        })();
        if (document.querySelectorAll) { (function() {
                var T = F,
                U = document.createElement("div");
                U.innerHTML = "<p class='TEST'></p>";
                if (U.querySelectorAll && U.querySelectorAll(".TEST").length === 0) {
                    return
                }
                F = function(Y, X, V, W) {
                    X = X || document;
                    if (!W && X.nodeType === 9 && !Q(X)) {
                        try {
                            return E(X.querySelectorAll(Y), V)
                        } catch(Z) {}
                    }
                    return T(Y, X, V, W)
                };
                F.find = T.find;
                F.filter = T.filter;
                F.selectors = T.selectors;
                F.matches = T.matches
            })()
        }
        if (document.getElementsByClassName && document.documentElement.getElementsByClassName) { (function() {
                var T = document.createElement("div");
                T.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (T.getElementsByClassName("e").length === 0) {
                    return
                }
                T.lastChild.className = "e";
                if (T.getElementsByClassName("e").length === 1) {
                    return
                }
                I.order.splice(1, 0, "CLASS");
                I.find.CLASS = function(U, V, W) {
                    if (typeof V.getElementsByClassName !== "undefined" && !W) {
                        return V.getElementsByClassName(U[1])
                    }
                }
            })()
        }
        function P(U, Z, Y, ad, aa, ac) {
            var ab = U == "previousSibling" && !ac;
            for (var W = 0,
            V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break
                        }
                        if (T.nodeType === 1 && !ac) {
                            T.sizcache = Y;
                            T.sizset = W
                        }
                        if (T.nodeName === Z) {
                            X = T;
                            break
                        }
                        T = T[U]
                    }
                    ad[W] = X
                }
            }
        }
        function S(U, Z, Y, ad, aa, ac) {
            var ab = U == "previousSibling" && !ac;
            for (var W = 0,
            V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break
                        }
                        if (T.nodeType === 1) {
                            if (!ac) {
                                T.sizcache = Y;
                                T.sizset = W
                            }
                            if (typeof Z !== "string") {
                                if (T === Z) {
                                    X = true;
                                    break
                                }
                            } else {
                                if (F.filter(Z, [T]).length > 0) {
                                    X = T;
                                    break
                                }
                            }
                        }
                        T = T[U]
                    }
                    ad[W] = X
                }
            }
        }
        var K = document.compareDocumentPosition ?
        function(U, T) {
            return U.compareDocumentPosition(T) & 16
        }: function(U, T) {
            return U !== T && (U.contains ? U.contains(T) : true)
        };
        var Q = function(T) {
            return T.nodeType === 9 && T.documentElement.nodeName !== "HTML" || !!T.ownerDocument && Q(T.ownerDocument)
        };
        var J = function(T, aa) {
            var W = [],
            X = "",
            Y,
            V = aa.nodeType ? [aa] : aa;
            while ((Y = I.match.PSEUDO.exec(T))) {
                X += Y[0];
                T = T.replace(I.match.PSEUDO, "")
            }
            T = I.relative[T] ? T + "*": T;
            for (var Z = 0,
            U = V.length; Z < U; Z++) {
                F(T, V[Z], W)
            }
            return F.filter(X, W)
        };
        o.find = F;
        o.filter = F.filter;
        o.expr = F.selectors;
        o.expr[":"] = o.expr.filters;
        F.selectors.filters.hidden = function(T) {
            return T.offsetWidth === 0 || T.offsetHeight === 0
        };
        F.selectors.filters.visible = function(T) {
            return T.offsetWidth > 0 || T.offsetHeight > 0
        };
        F.selectors.filters.animated = function(T) {
            return o.grep(o.timers,
            function(U) {
                return T === U.elem
            }).length
        };
        o.multiFilter = function(V, T, U) {
            if (U) {
                V = ":not(" + V + ")"
            }
            return F.matches(V, T)
        };
        o.dir = function(V, U) {
            var T = [],
            W = V[U];
            while (W && W != document) {
                if (W.nodeType == 1) {
                    T.push(W)
                }
                W = W[U]
            }
            return T
        };
        o.nth = function(X, T, V, W) {
            T = T || 1;
            var U = 0;
            for (; X; X = X[V]) {
                if (X.nodeType == 1 && ++U == T) {
                    break
                }
            }
            return X
        };
        o.sibling = function(V, U) {
            var T = [];
            for (; V; V = V.nextSibling) {
                if (V.nodeType == 1 && V != U) {
                    T.push(V)
                }
            }
            return T
        };
        return;
        l.Sizzle = F
    })();
    o.event = {
        add: function(I, F, H, K) {
            if (I.nodeType == 3 || I.nodeType == 8) {
                return
            }
            if (I.setInterval && I != l) {
                I = l
            }
            if (!H.guid) {
                H.guid = this.guid++
            }
            if (K !== g) {
                var G = H;
                H = this.proxy(G);
                H.data = K
            }
            var E = o.data(I, "events") || o.data(I, "events", {}),
            J = o.data(I, "handle") || o.data(I, "handle",
            function() {
                return typeof o !== "undefined" && !o.event.triggered ? o.event.handle.apply(arguments.callee.elem, arguments) : g
            });
            J.elem = I;
            o.each(F.split(/\s+/),
            function(M, N) {
                var O = N.split(".");
                N = O.shift();
                H.type = O.slice().sort().join(".");
                var L = E[N];
                if (o.event.specialAll[N]) {
                    o.event.specialAll[N].setup.call(I, K, O)
                }
                if (!L) {
                    L = E[N] = {};
                    if (!o.event.special[N] || o.event.special[N].setup.call(I, K, O) === false) {
                        if (I.addEventListener) {
                            I.addEventListener(N, J, false)
                        } else {
                            if (I.attachEvent) {
                                I.attachEvent("on" + N, J)
                            }
                        }
                    }
                }
                L[H.guid] = H;
                o.event.global[N] = true
            });
            I = null
        },
        guid: 1,
        global: {},
        remove: function(K, H, J) {
            if (K.nodeType == 3 || K.nodeType == 8) {
                return
            }
            var G = o.data(K, "events"),
            F,
            E;
            if (G) {
                if (H === g || (typeof H === "string" && H.charAt(0) == ".")) {
                    for (var I in G) {
                        this.remove(K, I + (H || ""))
                    }
                } else {
                    if (H.type) {
                        J = H.handler;
                        H = H.type
                    }
                    o.each(H.split(/\s+/),
                    function(M, O) {
                        var Q = O.split(".");
                        O = Q.shift();
                        var N = RegExp("(^|\\.)" + Q.slice().sort().join(".*\\.") + "(\\.|$)");
                        if (G[O]) {
                            if (J) {
                                delete G[O][J.guid]
                            } else {
                                for (var P in G[O]) {
                                    if (N.test(G[O][P].type)) {
                                        delete G[O][P]
                                    }
                                }
                            }
                            if (o.event.specialAll[O]) {
                                o.event.specialAll[O].teardown.call(K, Q)
                            }
                            for (F in G[O]) {
                                break
                            }
                            if (!F) {
                                if (!o.event.special[O] || o.event.special[O].teardown.call(K, Q) === false) {
                                    if (K.removeEventListener) {
                                        K.removeEventListener(O, o.data(K, "handle"), false)
                                    } else {
                                        if (K.detachEvent) {
                                            K.detachEvent("on" + O, o.data(K, "handle"))
                                        }
                                    }
                                }
                                F = null;
                                delete G[O]
                            }
                        }
                    })
                }
                for (F in G) {
                    break
                }
                if (!F) {
                    var L = o.data(K, "handle");
                    if (L) {
                        L.elem = null
                    }
                    o.removeData(K, "events");
                    o.removeData(K, "handle")
                }
            }
        },
        trigger: function(I, K, H, E) {
            var G = I.type || I;
            if (!E) {
                I = typeof I === "object" ? I[h] ? I: o.extend(o.Event(G), I) : o.Event(G);
                if (G.indexOf("!") >= 0) {
                    I.type = G = G.slice(0, -1);
                    I.exclusive = true
                }
                if (!H) {
                    I.stopPropagation();
                    if (this.global[G]) {
                        o.each(o.cache,
                        function() {
                            if (this.events && this.events[G]) {
                                o.event.trigger(I, K, this.handle.elem)
                            }
                        })
                    }
                }
                if (!H || H.nodeType == 3 || H.nodeType == 8) {
                    return g
                }
                I.result = g;
                I.target = H;
                K = o.makeArray(K);
                K.unshift(I)
            }
            I.currentTarget = H;
            var J = o.data(H, "handle");
            if (J) {
                J.apply(H, K)
            }
            if ((!H[G] || (o.nodeName(H, "a") && G == "click")) && H["on" + G] && H["on" + G].apply(H, K) === false) {
                I.result = false
            }
            if (!E && H[G] && !I.isDefaultPrevented() && !(o.nodeName(H, "a") && G == "click")) {
                this.triggered = true;
                try {
                    H[G]()
                } catch(L) {}
            }
            this.triggered = false;
            if (!I.isPropagationStopped()) {
                var F = H.parentNode || H.ownerDocument;
                if (F) {
                    o.event.trigger(I, K, F, true)
                }
            }
        },
        handle: function(K) {
            var J, E;
            K = arguments[0] = o.event.fix(K || l.event);
            K.currentTarget = this;
            var L = K.type.split(".");
            K.type = L.shift();
            J = !L.length && !K.exclusive;
            var I = RegExp("(^|\\.)" + L.slice().sort().join(".*\\.") + "(\\.|$)");
            E = (o.data(this, "events") || {})[K.type];
            for (var G in E) {
                var H = E[G];
                if (J || I.test(H.type)) {
                    K.handler = H;
                    K.data = H.data;
                    var F = H.apply(this, arguments);
                    if (F !== g) {
                        K.result = F;
                        if (F === false) {
                            K.preventDefault();
                            K.stopPropagation()
                        }
                    }
                    if (K.isImmediatePropagationStopped()) {
                        break
                    }
                }
            }
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(H) {
            if (H[h]) {
                return H
            }
            var F = H;
            H = o.Event(F);
            for (var G = this.props.length,
            J; G;) {
                J = this.props[--G];
                H[J] = F[J]
            }
            if (!H.target) {
                H.target = H.srcElement || document
            }
            if (H.target.nodeType == 3) {
                H.target = H.target.parentNode
            }
            if (!H.relatedTarget && H.fromElement) {
                H.relatedTarget = H.fromElement == H.target ? H.toElement: H.fromElement
            }
            if (H.pageX == null && H.clientX != null) {
                var I = document.documentElement,
                E = document.body;
                H.pageX = H.clientX + (I && I.scrollLeft || E && E.scrollLeft || 0) - (I.clientLeft || 0);
                H.pageY = H.clientY + (I && I.scrollTop || E && E.scrollTop || 0) - (I.clientTop || 0)
            }
            if (!H.which && ((H.charCode || H.charCode === 0) ? H.charCode: H.keyCode)) {
                H.which = H.charCode || H.keyCode
            }
            if (!H.metaKey && H.ctrlKey) {
                H.metaKey = H.ctrlKey
            }
            if (!H.which && H.button) {
                H.which = (H.button & 1 ? 1 : (H.button & 2 ? 3 : (H.button & 4 ? 2 : 0)))
            }
            return H
        },
        proxy: function(F, E) {
            E = E ||
            function() {
                return F.apply(this, arguments)
            };
            E.guid = F.guid = F.guid || E.guid || this.guid++;
            return E
        },
        special: {
            ready: {
                setup: B,
                teardown: function() {}
            }
        },
        specialAll: {
            live: {
                setup: function(E, F) {
                    o.event.add(this, F[0], c)
                },
                teardown: function(G) {
                    if (G.length) {
                        var E = 0,
                        F = RegExp("(^|\\.)" + G[0] + "(\\.|$)");
                        o.each((o.data(this, "events").live || {}),
                        function() {
                            if (F.test(this.type)) {
                                E++
                            }
                        });
                        if (E < 1) {
                            o.event.remove(this, G[0], c)
                        }
                    }
                }
            }
        }
    };
    o.Event = function(E) {
        if (!this.preventDefault) {
            return new o.Event(E)
        }
        if (E && E.type) {
            this.originalEvent = E;
            this.type = E.type
        } else {
            this.type = E
        }
        this.timeStamp = e();
        this[h] = true
    };
    function k() {
        return false
    }
    function u() {
        return true
    }
    o.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = u;
            var E = this.originalEvent;
            if (!E) {
                return
            }
            if (E.preventDefault) {
                E.preventDefault()
            }
            E.returnValue = false
        },
        stopPropagation: function() {
            this.isPropagationStopped = u;
            var E = this.originalEvent;
            if (!E) {
                return
            }
            if (E.stopPropagation) {
                E.stopPropagation()
            }
            E.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = u;
            this.stopPropagation()
        },
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k
    };
    var a = function(F) {
        var E = F.relatedTarget;
        while (E && E != this) {
            try {
                E = E.parentNode
            } catch(G) {
                E = this
            }
        }
        if (E != this) {
            F.type = F.data;
            o.event.handle.apply(this, arguments)
        }
    };
    o.each({
        mouseover: "mouseenter",
        mouseout: "mouseleave"
    },
    function(F, E) {
        o.event.special[E] = {
            setup: function() {
                o.event.add(this, F, a, E)
            },
            teardown: function() {
                o.event.remove(this, F, a)
            }
        }
    });
    o.fn.extend({
        bind: function(F, G, E) {
            return F == "unload" ? this.one(F, G, E) : this.each(function() {
                o.event.add(this, F, E || G, E && G)
            })
        },
        one: function(G, H, F) {
            var E = o.event.proxy(F || H,
            function(I) {
                o(this).unbind(I, E);
                return (F || H).apply(this, arguments)
            });
            return this.each(function() {
                o.event.add(this, G, E, F && H)
            })
        },
        unbind: function(F, E) {
            return this.each(function() {
                o.event.remove(this, F, E)
            })
        },
        trigger: function(E, F) {
            return this.each(function() {
                o.event.trigger(E, F, this)
            })
        },
        triggerHandler: function(E, G) {
            if (this[0]) {
                var F = o.Event(E);
                F.preventDefault();
                F.stopPropagation();
                o.event.trigger(F, G, this[0]);
                return F.result
            }
        },
        toggle: function(G) {
            var E = arguments,
            F = 1;
            while (F < E.length) {
                o.event.proxy(G, E[F++])
            }
            return this.click(o.event.proxy(G,
            function(H) {
                this.lastToggle = (this.lastToggle || 0) % F;
                H.preventDefault();
                return E[this.lastToggle++].apply(this, arguments) || false
            }))
        },
        hover: function(E, F) {
            return this.mouseenter(E).mouseleave(F)
        },
        ready: function(E) {
            B();
            if (o.isReady) {
                E.call(document, o)
            } else {
                o.readyList.push(E)
            }
            return this
        },
        live: function(G, F) {
            var E = o.event.proxy(F);
            E.guid += this.selector + G;
            o(document).bind(i(G, this.selector), this.selector, E);
            return this
        },
        die: function(F, E) {
            o(document).unbind(i(F, this.selector), E ? {
                guid: E.guid + this.selector + F
            }: null);
            return this
        }
    });
    function c(H) {
        var E = RegExp("(^|\\.)" + H.type + "(\\.|$)"),
        G = true,
        F = [];
        o.each(o.data(this, "events").live || [],
        function(I, J) {
            if (E.test(J.type)) {
                var K = o(H.target).closest(J.data)[0];
                if (K) {
                    F.push({
                        elem: K,
                        fn: J
                    })
                }
            }
        });
        F.sort(function(J, I) {
            return o.data(J.elem, "closest") - o.data(I.elem, "closest")
        });
        o.each(F,
        function() {
            if (this.fn.call(this.elem, H, this.fn.data) === false) {
                return (G = false)
            }
        });
        return G
    }
    function i(F, E) {
        return ["live", F, E.replace(/\./g, "`").replace(/ /g, "|")].join(".")
    }
    o.extend({
        isReady: false,
        readyList: [],
        ready: function() {
            if (!o.isReady) {
                o.isReady = true;
                if (o.readyList) {
                    o.each(o.readyList,
                    function() {
                        this.call(document, o)
                    });
                    o.readyList = null
                }
                o(document).triggerHandler("ready")
            }
        }
    });
    var x = false;
    function B() {
        if (x) {
            return
        }
        x = true;
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded",
            function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                o.ready()
            },
            false)
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange",
                function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        o.ready()
                    }
                });
                if (document.documentElement.doScroll && l == l.top) { (function() {
                        if (o.isReady) {
                            return
                        }
                        try {
                            document.documentElement.doScroll("left")
                        } catch(E) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        o.ready()
                    })()
                }
            }
        }
        o.event.add(l, "load", o.ready)
    }
    o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),
    function(F, E) {
        o.fn[E] = function(G) {
            return G ? this.bind(E, G) : this.trigger(E)
        }
    });
    o(l).bind("unload",
    function() {
        for (var E in o.cache) {
            if (E != 1 && o.cache[E].handle) {
                o.event.remove(o.cache[E].handle.elem)
            }
        }
    }); (function() {
        o.support = {};
        var F = document.documentElement,
        G = document.createElement("script"),
        K = document.createElement("div"),
        J = "script" + (new Date).getTime();
        K.style.display = "none";
        K.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
        var H = K.getElementsByTagName("*"),
        E = K.getElementsByTagName("a")[0];
        if (!H || !H.length || !E) {
            return
        }
        o.support = {
            leadingWhitespace: K.firstChild.nodeType == 3,
            tbody: !K.getElementsByTagName("tbody").length,
            objectAll: !!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,
            htmlSerialize: !!K.getElementsByTagName("link").length,
            style: /red/.test(E.getAttribute("style")),
            hrefNormalized: E.getAttribute("href") === "/a",
            opacity: E.style.opacity === "0.5",
            cssFloat: !!E.style.cssFloat,
            scriptEval: false,
            noCloneEvent: true,
            boxModel: null
        };
        G.type = "text/javascript";
        try {
            G.appendChild(document.createTextNode("window." + J + "=1;"))
        } catch(I) {}
        F.insertBefore(G, F.firstChild);
        if (l[J]) {
            o.support.scriptEval = true;
            delete l[J]
        }
        F.removeChild(G);
        if (K.attachEvent && K.fireEvent) {
            K.attachEvent("onclick",
            function() {
                o.support.noCloneEvent = false;
                K.detachEvent("onclick", arguments.callee)
            });
            K.cloneNode(true).fireEvent("onclick")
        }
        o(function() {
            var L = document.createElement("div");
            L.style.width = L.style.paddingLeft = "1px";
            document.body.appendChild(L);
            o.boxModel = o.support.boxModel = L.offsetWidth === 2;
            document.body.removeChild(L).style.display = "none"
        })
    })();
    var w = o.support.cssFloat ? "cssFloat": "styleFloat";
    o.props = {
        "for": "htmlFor",
        "class": "className",
        "float": w,
        cssFloat: w,
        styleFloat: w,
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        tabindex: "tabIndex"
    };
    o.fn.extend({
        _load: o.fn.load,
        load: function(G, J, K) {
            if (typeof G !== "string") {
                return this._load(G)
            }
            var I = G.indexOf(" ");
            if (I >= 0) {
                var E = G.slice(I, G.length);
                G = G.slice(0, I)
            }
            var H = "GET";
            if (J) {
                if (o.isFunction(J)) {
                    K = J;
                    J = null
                } else {
                    if (typeof J === "object") {
                        J = o.param(J);
                        H = "POST"
                    }
                }
            }
            var F = this;
            o.ajax({
                url: G,
                type: H,
                dataType: "html",
                data: J,
                complete: function(M, L) {
                    if (L == "success" || L == "notmodified") {
                        F.html(E ? o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(E) : M.responseText)
                    }
                    if (K) {
                        F.each(K, [M.responseText, L, M])
                    }
                }
            });
            return this
        },
        serialize: function() {
            return o.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? o.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type))
            }).map(function(E, F) {
                var G = o(this).val();
                return G == null ? null: o.isArray(G) ? o.map(G,
                function(I, H) {
                    return {
                        name: F.name,
                        value: I
                    }
                }) : {
                    name: F.name,
                    value: G
                }
            }).get()
        }
    });
    o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),
    function(E, F) {
        o.fn[F] = function(G) {
            return this.bind(F, G)
        }
    });
    var r = e();
    o.extend({
        get: function(E, G, H, F) {
            if (o.isFunction(G)) {
                H = G;
                G = null
            }
            return o.ajax({
                type: "GET",
                url: E,
                data: G,
                success: H,
                dataType: F
            })
        },
        getScript: function(E, F) {
            return o.get(E, null, F, "script")
        },
        getJSON: function(E, F, G) {
            return o.get(E, F, G, "json")
        },
        post: function(E, G, H, F) {
            if (o.isFunction(G)) {
                H = G;
                G = {}
            }
            return o.ajax({
                type: "POST",
                url: E,
                data: G,
                success: H,
                dataType: F
            })
        },
        ajaxSetup: function(E) {
            o.extend(o.ajaxSettings, E)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function() {
                return l.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        ajax: function(M) {
            M = o.extend(true, M, o.extend(true, {},
            o.ajaxSettings, M));
            var W, F = /=\?(&|$)/g,
            R, V, G = M.type.toUpperCase();
            if (M.data && M.processData && typeof M.data !== "string") {
                M.data = o.param(M.data)
            }
            if (M.dataType == "jsonp") {
                if (G == "GET") {
                    if (!M.url.match(F)) {
                        M.url += (M.url.match(/\?/) ? "&": "?") + (M.jsonp || "callback") + "=?"
                    }
                } else {
                    if (!M.data || !M.data.match(F)) {
                        M.data = (M.data ? M.data + "&": "") + (M.jsonp || "callback") + "=?"
                    }
                }
                M.dataType = "json"
            }
            if (M.dataType == "json" && (M.data && M.data.match(F) || M.url.match(F))) {
                W = "jsonp" + r++;
                if (M.data) {
                    M.data = (M.data + "").replace(F, "=" + W + "$1")
                }
                M.url = M.url.replace(F, "=" + W + "$1");
                M.dataType = "script";
                l[W] = function(X) {
                    V = X;
                    I();
                    L();
                    l[W] = g;
                    try {
                        delete l[W]
                    } catch(Y) {}
                    if (H) {
                        H.removeChild(T)
                    }
                }
            }
            if (M.dataType == "script" && M.cache == null) {
                M.cache = false
            }
            if (M.cache === false && G == "GET") {
                var E = e();
                var U = M.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + E + "$2");
                M.url = U + ((U == M.url) ? (M.url.match(/\?/) ? "&": "?") + "_=" + E: "")
            }
            if (M.data && G == "GET") {
                M.url += (M.url.match(/\?/) ? "&": "?") + M.data;
                M.data = null
            }
            if (M.global && !o.active++) {
                o.event.trigger("ajaxStart")
            }
            var Q = /^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);
            if (M.dataType == "script" && G == "GET" && Q && (Q[1] && Q[1] != location.protocol || Q[2] != location.host)) {
                var H = document.getElementsByTagName("head")[0];
                var T = document.createElement("script");
                T.src = M.url;
                if (M.scriptCharset) {
                    T.charset = M.scriptCharset
                }
                if (!W) {
                    var O = false;
                    T.onload = T.onreadystatechange = function() {
                        if (!O && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            O = true;
                            I();
                            L();
                            T.onload = T.onreadystatechange = null;
                            H.removeChild(T)
                        }
                    }
                }
                H.appendChild(T);
                return g
            }
            var K = false;
            var J = M.xhr();
            if (M.username) {
                J.open(G, M.url, M.async, M.username, M.password)
            } else {
                J.open(G, M.url, M.async)
            }
            try {
                if (M.data) {
                    J.setRequestHeader("Content-Type", M.contentType)
                }
                if (M.ifModified) {
                    J.setRequestHeader("If-Modified-Since", o.lastModified[M.url] || "Thu, 01 Jan 1970 00:00:00 GMT")
                }
                J.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                J.setRequestHeader("Accept", M.dataType && M.accepts[M.dataType] ? M.accepts[M.dataType] + ", */*": M.accepts._default)
            } catch(S) {}
            if (M.beforeSend && M.beforeSend(J, M) === false) {
                if (M.global && !--o.active) {
                    o.event.trigger("ajaxStop")
                }
                J.abort();
                return false
            }
            if (M.global) {
                o.event.trigger("ajaxSend", [J, M])
            }
            var N = function(X) {
                if (J.readyState == 0) {
                    if (P) {
                        clearInterval(P);
                        P = null;
                        if (M.global && !--o.active) {
                            o.event.trigger("ajaxStop")
                        }
                    }
                } else {
                    if (!K && J && (J.readyState == 4 || X == "timeout")) {
                        K = true;
                        if (P) {
                            clearInterval(P);
                            P = null
                        }
                        R = X == "timeout" ? "timeout": !o.httpSuccess(J) ? "error": M.ifModified && o.httpNotModified(J, M.url) ? "notmodified": "success";
                        if (R == "success") {
                            try {
                                V = o.httpData(J, M.dataType, M)
                            } catch(Z) {
                                R = "parsererror"
                            }
                        }
                        if (R == "success") {
                            var Y;
                            try {
                                Y = J.getResponseHeader("Last-Modified")
                            } catch(Z) {}
                            if (M.ifModified && Y) {
                                o.lastModified[M.url] = Y
                            }
                            if (!W) {
                                I()
                            }
                        } else {
                            o.handleError(M, J, R)
                        }
                        L();
                        if (X) {
                            J.abort()
                        }
                        if (M.async) {
                            J = null
                        }
                    }
                }
            };
            if (M.async) {
                var P = setInterval(N, 13);
                if (M.timeout > 0) {
                    setTimeout(function() {
                        if (J && !K) {
                            N("timeout")
                        }
                    },
                    M.timeout)
                }
            }
            try {
                J.send(M.data)
            } catch(S) {
                o.handleError(M, J, null, S)
            }
            if (!M.async) {
                N()
            }
            function I() {
                if (M.success) {
                    M.success(V, R)
                }
                if (M.global) {
                    o.event.trigger("ajaxSuccess", [J, M])
                }
            }
            function L() {
                if (M.complete) {
                    M.complete(J, R)
                }
                if (M.global) {
                    o.event.trigger("ajaxComplete", [J, M])
                }
                if (M.global && !--o.active) {
                    o.event.trigger("ajaxStop")
                }
            }
            return J
        },
        handleError: function(F, H, E, G) {
            if (F.error) {
                F.error(H, E, G)
            }
            if (F.global) {
                o.event.trigger("ajaxError", [H, F, G])
            }
        },
        active: 0,
        httpSuccess: function(F) {
            try {
                return ! F.status && location.protocol == "file:" || (F.status >= 200 && F.status < 300) || F.status == 304 || F.status == 1223
            } catch(E) {}
            return false
        },
        httpNotModified: function(G, E) {
            try {
                var H = G.getResponseHeader("Last-Modified");
                return G.status == 304 || H == o.lastModified[E]
            } catch(F) {}
            return false
        },
        httpData: function(J, H, G) {
            var F = J.getResponseHeader("content-type"),
            E = H == "xml" || !H && F && F.indexOf("xml") >= 0,
            I = E ? J.responseXML: J.responseText;
            if (E && I.documentElement.tagName == "parsererror") {
                throw "parsererror"
            }
            if (G && G.dataFilter) {
                I = G.dataFilter(I, H)
            }
            if (typeof I === "string") {
                if (H == "script") {
                    o.globalEval(I)
                }
                if (H == "json") {
                    I = l["eval"]("(" + I + ")")
                }
            }
            return I
        },
        param: function(E) {
            var G = [];
            function H(I, J) {
                G[G.length] = encodeURIComponent(I) + "=" + encodeURIComponent(J)
            }
            if (o.isArray(E) || E.jquery) {
                o.each(E,
                function() {
                    H(this.name, this.value)
                })
            } else {
                for (var F in E) {
                    if (o.isArray(E[F])) {
                        o.each(E[F],
                        function() {
                            H(F, this)
                        })
                    } else {
                        H(F, o.isFunction(E[F]) ? E[F]() : E[F])
                    }
                }
            }
            return G.join("&").replace(/%20/g, "+")
        }
    });
    var m = {},
    n, d = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    function t(F, E) {
        var G = {};
        o.each(d.concat.apply([], d.slice(0, E)),
        function() {
            G[this] = F
        });
        return G
    }
    o.fn.extend({
        show: function(J, L) {
            if (J) {
                return this.animate(t("show", 3), J, L)
            } else {
                for (var H = 0,
                F = this.length; H < F; H++) {
                    var E = o.data(this[H], "olddisplay");
                    this[H].style.display = E || "";
                    if (o.css(this[H], "display") === "none") {
                        var G = this[H].tagName,
                        K;
                        if (m[G]) {
                            K = m[G]
                        } else {
                            var I = o("<" + G + " />").appendTo("body");
                            K = I.css("display");
                            if (K === "none") {
                                K = "block"
                            }
                            I.remove();
                            m[G] = K
                        }
                        o.data(this[H], "olddisplay", K)
                    }
                }
                for (var H = 0,
                F = this.length; H < F; H++) {
                    this[H].style.display = o.data(this[H], "olddisplay") || ""
                }
                return this
            }
        },
        hide: function(H, I) {
            if (H) {
                return this.animate(t("hide", 3), H, I)
            } else {
                for (var G = 0,
                F = this.length; G < F; G++) {
                    var E = o.data(this[G], "olddisplay");
                    if (!E && E !== "none") {
                        o.data(this[G], "olddisplay", o.css(this[G], "display"))
                    }
                }
                for (var G = 0,
                F = this.length; G < F; G++) {
                    this[G].style.display = "none"
                }
                return this
            }
        },
        _toggle: o.fn.toggle,
        toggle: function(G, F) {
            var E = typeof G === "boolean";
            return o.isFunction(G) && o.isFunction(F) ? this._toggle.apply(this, arguments) : G == null || E ? this.each(function() {
                var H = E ? G: o(this).is(":hidden");
                o(this)[H ? "show": "hide"]()
            }) : this.animate(t("toggle", 3), G, F)
        },
        fadeTo: function(E, G, F) {
            return this.animate({
                opacity: G
            },
            E, F)
        },
        animate: function(I, F, H, G) {
            var E = o.speed(F, H, G);
            return this[E.queue === false ? "each": "queue"](function() {
                var K = o.extend({},
                E),
                M,
                L = this.nodeType == 1 && o(this).is(":hidden"),
                J = this;
                for (M in I) {
                    if (I[M] == "hide" && L || I[M] == "show" && !L) {
                        return K.complete.call(this)
                    }
                    if ((M == "height" || M == "width") && this.style) {
                        K.display = o.css(this, "display");
                        K.overflow = this.style.overflow
                    }
                }
                if (K.overflow != null) {
                    this.style.overflow = "hidden"
                }
                K.curAnim = o.extend({},
                I);
                o.each(I,
                function(O, S) {
                    var R = new o.fx(J, K, O);
                    if (/toggle|show|hide/.test(S)) {
                        R[S == "toggle" ? L ? "show": "hide": S](I)
                    } else {
                        var Q = S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                        T = R.cur(true) || 0;
                        if (Q) {
                            var N = parseFloat(Q[2]),
                            P = Q[3] || "px";
                            if (P != "px") {
                                J.style[O] = (N || 1) + P;
                                T = ((N || 1) / R.cur(true)) * T;
                                J.style[O] = T + P
                            }
                            if (Q[1]) {
                                N = ((Q[1] == "-=" ? -1 : 1) * N) + T
                            }
                            R.custom(T, N, P)
                        } else {
                            R.custom(T, S, "")
                        }
                    }
                });
                return true
            })
        },
        stop: function(F, E) {
            var G = o.timers;
            if (F) {
                this.queue([])
            }
            this.each(function() {
                for (var H = G.length - 1; H >= 0; H--) {
                    if (G[H].elem == this) {
                        if (E) {
                            G[H](true)
                        }
                        G.splice(H, 1)
                    }
                }
            });
            if (!E) {
                this.dequeue()
            }
            return this
        }
    });
    o.each({
        slideDown: t("show", 1),
        slideUp: t("hide", 1),
        slideToggle: t("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    },
    function(E, F) {
        o.fn[E] = function(G, H) {
            return this.animate(F, G, H)
        }
    });
    o.extend({
        speed: function(G, H, F) {
            var E = typeof G === "object" ? G: {
                complete: F || !F && H || o.isFunction(G) && G,
                duration: G,
                easing: F && H || H && !o.isFunction(H) && H
            };
            E.duration = o.fx.off ? 0 : typeof E.duration === "number" ? E.duration: o.fx.speeds[E.duration] || o.fx.speeds._default;
            E.old = E.complete;
            E.complete = function() {
                if (E.queue !== false) {
                    o(this).dequeue()
                }
                if (o.isFunction(E.old)) {
                    E.old.call(this)
                }
            };
            return E
        },
        easing: {
            linear: function(G, H, E, F) {
                return E + F * G
            },
            swing: function(G, H, E, F) {
                return (( - Math.cos(G * Math.PI) / 2) + 0.5) * F + E
            }
        },
        timers: [],
        fx: function(F, E, G) {
            this.options = E;
            this.elem = F;
            this.prop = G;
            if (!E.orig) {
                E.orig = {}
            }
        }
    });
    o.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            } (o.fx.step[this.prop] || o.fx.step._default)(this);
            if ((this.prop == "height" || this.prop == "width") && this.elem.style) {
                this.elem.style.display = "block"
            }
        },
        cur: function(F) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var E = parseFloat(o.css(this.elem, this.prop, F));
            return E && E > -10000 ? E: parseFloat(o.curCSS(this.elem, this.prop)) || 0
        },
        custom: function(I, H, G) {
            this.startTime = e();
            this.start = I;
            this.end = H;
            this.unit = G || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var E = this;
            function F(J) {
                return E.step(J)
            }
            F.elem = this.elem;
            if (F() && o.timers.push(F) && !n) {
                n = setInterval(function() {
                    var K = o.timers;
                    for (var J = 0; J < K.length; J++) {
                        if (!K[J]()) {
                            K.splice(J--, 1)
                        }
                    }
                    if (!K.length) {
                        clearInterval(n);
                        n = g
                    }
                },
                13)
            }
        },
        show: function() {
            this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());
            o(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(H) {
            var G = e();
            if (H || G >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var E = true;
                for (var F in this.options.curAnim) {
                    if (this.options.curAnim[F] !== true) {
                        E = false
                    }
                }
                if (E) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (o.css(this.elem, "display") == "none") {
                            this.elem.style.display = "block"
                        }
                    }
                    if (this.options.hide) {
                        o(this.elem).hide()
                    }
                    if (this.options.hide || this.options.show) {
                        for (var I in this.options.curAnim) {
                            o.attr(this.elem.style, I, this.options.orig[I])
                        }
                    }
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                var J = G - this.startTime;
                this.state = J / this.options.duration;
                this.pos = o.easing[this.options.easing || (o.easing.swing ? "swing": "linear")](this.state, J, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update()
            }
            return true
        }
    };
    o.extend(o.fx, {
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(E) {
                o.attr(E.elem.style, "opacity", E.now)
            },
            _default: function(E) {
                if (E.elem.style && E.elem.style[E.prop] != null) {
                    E.elem.style[E.prop] = E.now + E.unit
                } else {
                    E.elem[E.prop] = E.now
                }
            }
        }
    });
    if (document.documentElement.getBoundingClientRect) {
        o.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0])
            }
            var G = this[0].getBoundingClientRect(),
            J = this[0].ownerDocument,
            F = J.body,
            E = J.documentElement,
            L = E.clientTop || F.clientTop || 0,
            K = E.clientLeft || F.clientLeft || 0,
            I = G.top + (self.pageYOffset || o.boxModel && E.scrollTop || F.scrollTop) - L,
            H = G.left + (self.pageXOffset || o.boxModel && E.scrollLeft || F.scrollLeft) - K;
            return {
                top: I,
                left: H
            }
        }
    } else {
        o.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0])
            }
            o.offset.initialized || o.offset.initialize();
            var J = this[0],
            G = J.offsetParent,
            F = J,
            O = J.ownerDocument,
            M,
            H = O.documentElement,
            K = O.body,
            L = O.defaultView,
            E = L.getComputedStyle(J, null),
            N = J.offsetTop,
            I = J.offsetLeft;
            while ((J = J.parentNode) && J !== K && J !== H) {
                M = L.getComputedStyle(J, null);
                N -= J.scrollTop,
                I -= J.scrollLeft;
                if (J === G) {
                    N += J.offsetTop,
                    I += J.offsetLeft;
                    if (o.offset.doesNotAddBorder && !(o.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(J.tagName))) {
                        N += parseInt(M.borderTopWidth, 10) || 0,
                        I += parseInt(M.borderLeftWidth, 10) || 0
                    }
                    F = G,
                    G = J.offsetParent
                }
                if (o.offset.subtractsBorderForOverflowNotVisible && M.overflow !== "visible") {
                    N += parseInt(M.borderTopWidth, 10) || 0,
                    I += parseInt(M.borderLeftWidth, 10) || 0
                }
                E = M
            }
            if (E.position === "relative" || E.position === "static") {
                N += K.offsetTop,
                I += K.offsetLeft
            }
            if (E.position === "fixed") {
                N += Math.max(H.scrollTop, K.scrollTop),
                I += Math.max(H.scrollLeft, K.scrollLeft)
            }
            return {
                top: N,
                left: I
            }
        }
    }
    o.offset = {
        initialize: function() {
            if (this.initialized) {
                return
            }
            var L = document.body,
            F = document.createElement("div"),
            H,
            G,
            N,
            I,
            M,
            E,
            J = L.style.marginTop,
            K = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
            M = {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            };
            for (E in M) {
                F.style[E] = M[E]
            }
            F.innerHTML = K;
            L.insertBefore(F, L.firstChild);
            H = F.firstChild,
            G = H.firstChild,
            I = H.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (G.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (I.offsetTop === 5);
            H.style.overflow = "hidden",
            H.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (G.offsetTop === -5);
            L.style.marginTop = "1px";
            this.doesNotIncludeMarginInBodyOffset = (L.offsetTop === 0);
            L.style.marginTop = J;
            L.removeChild(F);
            this.initialized = true
        },
        bodyOffset: function(E) {
            o.offset.initialized || o.offset.initialize();
            var G = E.offsetTop,
            F = E.offsetLeft;
            if (o.offset.doesNotIncludeMarginInBodyOffset) {
                G += parseInt(o.curCSS(E, "marginTop", true), 10) || 0,
                F += parseInt(o.curCSS(E, "marginLeft", true), 10) || 0
            }
            return {
                top: G,
                left: F
            }
        }
    };
    o.fn.extend({
        position: function() {
            var I = 0,
            H = 0,
            F;
            if (this[0]) {
                var G = this.offsetParent(),
                J = this.offset(),
                E = /^body|html$/i.test(G[0].tagName) ? {
                    top: 0,
                    left: 0
                }: G.offset();
                J.top -= j(this, "marginTop");
                J.left -= j(this, "marginLeft");
                E.top += j(G, "borderTopWidth");
                E.left += j(G, "borderLeftWidth");
                F = {
                    top: J.top - E.top,
                    left: J.left - E.left
                }
            }
            return F
        },
        offsetParent: function() {
            var E = this[0].offsetParent || document.body;
            while (E && (!/^body|html$/i.test(E.tagName) && o.css(E, "position") == "static")) {
                E = E.offsetParent
            }
            return o(E)
        }
    });
    o.each(["Left", "Top"],
    function(F, E) {
        var G = "scroll" + E;
        o.fn[G] = function(H) {
            if (!this[0]) {
                return null
            }
            return H !== g ? this.each(function() {
                this == l || this == document ? l.scrollTo(!F ? H: o(l).scrollLeft(), F ? H: o(l).scrollTop()) : this[G] = H
            }) : this[0] == l || this[0] == document ? self[F ? "pageYOffset": "pageXOffset"] || o.boxModel && document.documentElement[G] || document.body[G] : this[0][G]
        }
    });
    o.each(["Height", "Width"],
    function(I, G) {
        var E = I ? "Left": "Top",
        H = I ? "Right": "Bottom",
        F = G.toLowerCase();
        o.fn["inner" + G] = function() {
            return this[0] ? o.css(this[0], F, false, "padding") : null
        };
        o.fn["outer" + G] = function(K) {
            return this[0] ? o.css(this[0], F, false, K ? "margin": "border") : null
        };
        var J = G.toLowerCase();
        o.fn[J] = function(K) {
            return this[0] == l ? document.compatMode == "CSS1Compat" && document.documentElement["client" + G] || document.body["client" + G] : this[0] == document ? Math.max(document.documentElement["client" + G], document.body["scroll" + G], document.documentElement["scroll" + G], document.body["offset" + G], document.documentElement["offset" + G]) : K === g ? (this.length ? o.css(this[0], J) : null) : this.css(J, typeof K === "string" ? K: K + "px")
        }
    })
})();
Logger = {
    debug: function() {},
    error: function() {},
    point: function(a, b) {
        if (typeof Logger.pointData == "undefined") {
            Logger.pointData = {}
        }
        Logger.pointData[a] = {};
        Logger.pointData[a].info = b ? b: "";
        Logger.pointData[a].time = new Date().getTime()
    },
    pointsToString: function() {
        if (typeof Logger.pointData == "undefined") {
            return ""
        }
        var b = "";
        for (var a in Logger.pointData) {
            if (b != "") {
                b += "||"
            }
            b += a + ";" + Logger.pointData[a].info + ";" + Logger.pointData[a].time
        }
        return b
    }
};
Logger.point("pageStart"); (function() {
    var ICenter = window.ICenter = {};
    ICenter.baseUrl = "http://data.soso.com/icenter/i/index.php?";
    var ua = window.navigator.userAgent.toLowerCase();
    ICenter.Browser = {
        ie: /msie/.test(ua),
        moz: (/gecko/.test(ua) && !/khtml/.test(ua)),
        safari: /safari/.test(ua),
        opera: /opera/.test(ua)
    };
    ICenter.Utils = {
        exceptionHandler: function(e) {},
        readGet: function() {
            var uriStr = window.location.href.replace(/&amp;/g, "&");
            return ICenter.Utils.parseUrlParams(uriStr)
        },
        parseUrlParams: function(uriStr) {
            var _GET = new Array();
            var paraArr, paraSplit;
            if (uriStr.indexOf("?") > -1) {
                var uriArr = uriStr.split("?");
                var paraStr = uriArr[1]
            } else {
                return _GET
            }
            if (paraStr.indexOf("&") > -1) {
                paraArr = paraStr.split("&")
            } else {
                paraArr = new Array(paraStr)
            }
            for (var i = 0; i < paraArr.length; i++) {
                paraArr[i] = paraArr[i].indexOf("=") > -1 ? paraArr[i] : paraArr[i] + "=";
                paraSplit = paraArr[i].split("=");
                _GET[paraSplit[0]] = decodeURI(paraSplit[1].replace(/\+/g, " "))
            }
            return _GET
        },
        setPng: function(img, w, h) {
            var ua = window.navigator.userAgent.toLowerCase();
            if (!/msie/.test(ua)) {
                return
            }
            var imgStyle = "display:inline-block;" + img.style.cssText;
            var strNewHTML = '<span style="width:' + w + "px; height:" + h + "px;" + imgStyle + ";filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.src + "', sizingMethod='scale');\"></span>";
            img.outerHTML = strNewHTML
        },
        endWith: function(s1, s2) {
            if (s1.length < s2.length) {
                return false
            }
            if (s1 == s2) {
                return true
            }
            return s1.substring(s1.length - s2.length) == s2
        },
        isEmpty: function(obj) {
            return (typeof obj === "undefined" || obj === null || obj === "" || obj === false)
        }
    };
    ICenter.HTML = {
        escape: function(text) {
            return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\ /g, "&nbsp;").replace(/\n/g, " ").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
        },
        fadeUp: function(element, red, green, blue) {
            if (element.fade) {
                window.clearTimeout(element.fade)
            }
            var cssValue = "rgb(" + red + "," + green + "," + blue + ")";
            element.style.backgroundColor = cssValue;
            if (red == 255 && green == 255 && blue == 255) {
                return
            }
            var newRed = red + Math.ceil((255 - red) / 10);
            var newGreen = green + Math.ceil((255 - green) / 10);
            var newBlue = blue + Math.ceil((255 - blue) / 10);
            var repeat = function() {
                ICenter.HTML.fadeUp(element, newRed, newGreen, newBlue)
            };
            element.fade = window.setTimeout(repeat, 100)
        },
        _onOff: function(parent, icon) {
            if ($(icon).attr("class") == "zdq_big") {
                $(icon).removeClass("zdq_big").addClass("zdq_small").attr("title", "展开");
                parent.children().eq(1).show()
            } else {
                $(icon).removeClass("zdq_small").addClass("zdq_big").attr("title", "收起");
                parent.children().eq(1).hide()
            }
            st_get(this, "w.idx.opr.fold", 0)
        },
        drawTitle1: function(title) {
            var parent = this.parent;
            $('<ul class="zdq_title"><li class="title_l">' + title + '</li><li class="title_r"><a href="javascript:void(0)"></a></li></ul>').appendTo(this.parent).find("li.title_r > a").addClass("zdq_small").attr("title", "收起").mousedown(function(ev) {
                ICenter.Event.stop(ev)
            }).click(function() {
                ICenter.HTML._onOff(parent, this)
            })
        },
        drawTitle2: function(title) {
            var obj = this;
            var xxx = $(obj.parent).prepend(new StringBuffer().append('<ul class="zdq_title">').append('<li class="title_l">' + title + "</li>").append('<li class="title_r"><a href="javascript:void(0)" title="删除" class="zdq_close"></a><a href="javascript:void(0)"></a><a class="all_tips"></a></li>').append("</ul>").toString()).find("li.title_r > a:eq(1)").addClass("zdq_small").attr("title", "收起").mousedown(function(ev) {
                ICenter.Event.stop(ev)
            }).click(function() {
                ICenter.HTML._onOff(obj.parent, this)
            }).end().find("li.title_r > a:first").mousedown(function(ev) {
                ICenter.Event.stop(ev)
            }).click(function(ev) {
                ICenter.Event.stop(ev);
                if (!window.confirm("你确定要删除么？")) {
                    return
                }
                ICenterApp._moduleConfig.removeModule(obj.conf.id);
                ICenterApp._moduleConfig.uploadAddModule(function() {
                    obj.parent.remove()
                });
                st_get(this, "w.idx.opr.del", 0)
            }).end().find("li.title_r > a:eq(2)").mousedown(function(ev) {
                ICenter.Event.stop(ev)
            })
        }
    };
    ICenter._GET = ICenter.Utils.readGet();
    ICenter.JsLoader = {
        load: function(url, fCallback, type, errorHandler) {
            if (typeof(type) == "undefined" || type == null) {
                type = "jsonstring"
            }
            if (typeof(errorHandler) != "function") {
                errorHandler = function(e) {
                    Logger.error("js load error")
                }
            }
            Logger.debug("load json data from:" + url);
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            var varName = ICenter.Utils.parseUrlParams(url)["v"];
            if (varName == undefined || varName == null) {
                varName = "var_" + (new Date().getTime().toString().substring(7)) + (parseInt(Math.random() * 10000));
                if (url.indexOf("?") == -1) {
                    url += "?v=" + varName
                } else {
                    url += "&v=" + varName
                }
            }
            script.setAttribute("src", url);
            if (typeof(fCallback) == "function") {
                script.onload = script.onreadystatechange = function() {
                    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                        var cmd = "typeof(" + varName + ")== 'undefined' || " + varName + " == null";
                        Logger.debug("load json success:" + url);
                        if (eval(cmd)) {
                            Logger.debug(cmd);
                            errorHandler();
                            return
                        }
                        if (type == "jsonstring") {
                            try {
                                eval("var tmp=" + eval(varName))
                            } catch(e) {
                                errorHandler(e);
                                return
                            }
                            fCallback(eval("tmp"))
                        } else {
                            fCallback(eval(varName))
                        }
                        head.removeChild(script);
                        script = undefined;
                        varName = undefined
                    }
                }
            } else {}
            var head = document.getElementsByTagName("head")[0];
            head.appendChild(script);
            return script
        }
    };
    ICenter.Event = {
        add: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false)
            } else {
                element.attachEvent("on" + type, handler)
            }
        },
        stop: function(ev) {
            if (ev.preventDefault) {
                ev.preventDefault();
                ev.stopPropagation()
            } else {
                ev.cancelBubble = true;
                ev.returnValue = false
            }
        }
    };
    ICenter.Cookie = {
        set: function(name, value, domain, path, expires) {
            if (typeof expires == "undefined") {
                expires = new Date(new Date().getTime() + 365 * 24 * 3600 * 100)
            }
            document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path: "; path=/") + ((domain) ? "; domain=" + domain: "")
        },
        get: function(name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) {
                return unescape(arr[2])
            }
            return null
        },
        clear: function(name, path, domain) {
            if (this.get(name)) {
                document.cookie = name + "=" + ((path) ? "; path=" + path: "; path=/") + ((domain) ? "; domain=" + domain: "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT"
            }
        }
    };
    ICenter.ptlogin2 = {
        loginDivPos: function() {
            var _view = (document.compatMode.toLowerCase() == "css1compat") ? document.documentElement: document.body;
            var bodyHeight = parseInt(_view.clientHeight);
            var bodyWidth = parseInt(_view.clientWidth);
            $("div#pageMask").css("width", bodyWidth + "px").css("height", bodyHeight + "px");
            $("div#loginDiv").css("left", (bodyWidth - parseInt($("#loginDiv").width())) / 2 + "px").css("top", (bodyHeight - parseInt($("#loginDiv").height())) / 2 + "px")
        },
        ptOpen: function() {
            $("<div id='pageMask'></div>").appendTo(document.body);
            $('<div id="loginDiv"><iframe name="login_frame" style="display:none;" frameborder="0" scrolling="no" width="100%" height="100%" src=""></iframe></div>').prependTo(document.body);
            ICenter.ptlogin2.loginDivPos();
            var url = "http://ui.ptlogin2.soso.com/cgi-bin/login?appid=6000901&s_url=" + encodeURIComponent(location.href) + "&f_url=loginerroralert&target=top";
            $("div#loginDiv").css("display", "block");
            $("div#loginDiv iframe").attr("src", url).css("display", "block")
        },
        ptResize: function(width, height) {
            if ($.browser.safari) {
                $("#loginDiv").css("width", (width + 10) + "px").css("height", (height + 60) + "px")
            } else {
                $("#loginDiv").css("width", width + "px").css("height", height + "px")
            }
            $("#loginDiv iframe").css("height", height + "px");
            ICenter.ptlogin2.loginDivPos()
        },
        ptClose: function() {
            window.location = "http://www.soso.com"
        },
        ptFini: function() {
            ICenter.Cookie.clear("uin", "/", "soso.com");
            ICenter.Cookie.clear("skey", "/", "soso.com");
            ICenter.Cookie.clear("__face", "/", "soso.com");
            ICenter.Cookie.clear("__nick", "/", "soso.com");
            window.location = "http://www.soso.com"
        }
    };
    window.ptlogin2_onResize = ICenter.ptlogin2.ptResize;
    window.ptlogin2_onClose = ICenter.ptlogin2.ptClose;
    ICenter.HighLight = function(param) {
        this.elem = document.getElementById(param.id);
        if (ICenter.Utils.isEmpty(this.elem)) {
            return
        }
        var _view = (document.compatMode.toLowerCase() == "css1compat") ? document.documentElement: document.body;
        this.maskStyle = {
            "background-color": "#000000",
            height: parseInt(_view.scrollHeight),
            width: parseInt(_view.scrollWidth),
            opacity: "0.3",
            position: "absolute",
            "z-index": "98",
            filter: "alpha(opacity = 50)"
        };
        var defaultZIndex = $(this.elem).css("z-index");
        var defaultPosition = $(this.elem).css("position");
        $(this.elem).click(function(ev) {
            if (ev.target.nodeName == "A" && !ICenter.Utils.isEmpty(ev.target.href)) {
                location.href = ev.target.href
            }
            ICenter.Event.stop(ev)
        }).css({
            "z-index": 99,
            position: "relative"
        });
        this.pageMask = $("<div id='pageMask'></div>").appendTo(document.body).css(this.maskStyle);
        var obj = this;
        $(document.body).click(function() {
            obj.pageMask.remove();
            $(obj.elem).css({
                "z-index": defaultZIndex,
                position: defaultPosition
            });
            $(obj.elem).unbind("click")
        })
    };
    ICenter.MessageBox = function(param) {
        this.message = param.message;
        this.maskStyle = param.maskStyle;
        this.boxStyle = param.boxStyle;
        if (typeof(ICenter.MessageBox.__init) == "undefined") {
            ICenter.MessageBox.__init = true;
            ICenter.MessageBox.prototype.show = function() {
                var _view = (document.compatMode.toLowerCase() == "css1compat") ? document.documentElement: document.body;
                var bodyHeight = parseInt(_view.scrollHeight);
                var bodyWidth = parseInt(_view.scrollWidth);
                var clientHeight = parseInt(_view.clientHeight);
                var clientWidth = parseInt(_view.clientWidth);
                this.pageMask = $("<div id='pageMask' style='position:absolute;z-index:100;filter:alpha(opacity = 50);opacity:0.5;background-color:rgb(255, 255, 255);top:0;left:0;'></div>").appendTo(document.body).css(this.maskStyle);
                this.alertDiv = $('<div id="alertDiv" style="position:absolute;z-index:101;">' + this.message + "</div>").appendTo(document.body).css(this.boxStyle);
                this.alertDiv.click(function(ev) {
                    ICenter.Event.stop(ev)
                });
                bodyHeight = (bodyHeight > clientHeight) ? bodyHeight: clientHeight;
                this.pageMask.css("width", bodyWidth + "px").css("height", bodyHeight + "px");
                this.alertDiv.css("left", parseInt((clientWidth - this.alertDiv.width()) / 2) + "px");
                var scrollTop = ICenter.Browser.safari ? window.pageYOffset: _view.scrollTop;
                this.alertDiv.css("top", parseInt((clientHeight - this.alertDiv.height()) / 2 + scrollTop) + "px")
            }
        }
        ICenter.MessageBox.hide = function() {
            $("#pageMask").remove();
            $("#alertDiv").remove()
        }
    };
    ICenter.Loading = {
        requestNum: 0,
        expectNum: 0,
        timeOut: 10,
        start: function(expect, finishLoading) {
            ICenter.Loading.expectNum = expect;
            ICenter.Loading.finishLoading = finishLoading
        },
        showErr: function() {
            new ICenter.MessageBox({
                message: "加载出错，请<a onclick='javascript:location.reload();' href='javascript:location.reload()'>刷新页面</a>.或<a onclick='window.open(\"http://www.soso.com\")' href='http://www.soso.com'>返回首页</a>",
                boxStyle: {
                    background: "#ffffaf",
                    "font-size": "14px",
                    border: "1px solid #bbb",
                    padding: "30px"
                }
            }).show()
        },
        enter: function() {
            var timeTotal = 0;
            setTimeout(function() {
                if (ICenter.Loading.requestNum >= ICenter.Loading.expectNum) {
                    if (typeof(ICenter.Loading.finishLoading) == "function") {
                        ICenter.Loading.finishLoading()
                    }
                    if (typeof ICenter._GET.hl != "undefined") {
                        $(function() {
                            new ICenter.HighLight({
                                id: ICenter._GET.hl
                            })
                        })
                    }
                } else {
                    if (timeTotal >= ICenter.Loading.timeOut * 1000) {
                        ICenter.Loading.showErr()
                    } else {
                        timeTotal += 100;
                        setTimeout(arguments.callee, 100)
                    }
                }
            },
            100)
        },
        requestAdd: function() {
            ICenter.Loading.requestNum++
        }
    };
    ICenter.DelayDisplay = function(param) {
        this.overDiv = $(param.overDiv);
        this.displayDiv = $(param.displayDiv);
        this.delay = param.delay;
        this.overFunc = param.overFunc;
        this.outFunc = param.outFunc;
        var st = null;
        var ht = null;
        var dd = this;
        this.show = function() {
            this.displayDiv.show()
        };
        this.hide = function() {
            this.displayDiv.hide()
        };
        var visible = function() {
            return (dd.displayDiv.css("display") != "none")
        };
        this.overDiv.mouseover(function() {
            clearTimeout(ht);
            if (!visible()) {
                st = setTimeout(function() {
                    if (typeof dd.overFunc == "function") {
                        dd.overFunc()
                    }
                    dd.show()
                },
                dd.delay)
            }
        });
        this.overDiv.mouseout(function() {
            clearTimeout(st);
            if (visible()) {
                ht = setTimeout(function() {
                    if (typeof dd.outFunc == "function") {
                        dd.outFunc()
                    }
                    dd.hide()
                },
                dd.delay)
            }
        });
        this.displayDiv.mouseover(function() {
            clearTimeout(ht)
        });
        this.displayDiv.mouseout(function() {
            if (visible()) {
                ht = setTimeout(function() {
                    if (typeof dd.outFunc == "function") {
                        dd.outFunc()
                    }
                    dd.hide()
                },
                dd.delay)
            }
        })
    };
    ICenter.Main = {
        uin: ICenter.Cookie.get("uin"),
        skey: ICenter.Cookie.get("skey"),
        face: ICenter.Cookie.get("__face"),
        nick: ICenter.Cookie.get("__nick"),
        init: function(func, requestCount) {
            ICenter.Loading.start(requestCount);
            var refer = this;
            if (refer.uin == null || refer.uin == "" || refer.skey == null || refer.skey == "") {
                ICenter.ptlogin2.ptOpen();
                return
            }
            ICenter.JsLoader.load("http://data.soso.com/vLogin.q?v=__login&tmp=" + Math.random(),
            function(loginRes) {
                if (loginRes == 1) {
                    ICenter.Loading.enter();
                    func()
                } else {
                    if (loginRes == 2) {
                        window.location = "http://www.soso.com"
                    } else {
                        ICenter.ptlogin2.ptOpen()
                    }
                }
            })
        }
    };
    ICenter.Stat = {
        start: 0,
        total: 0,
        baseUrl: "http://data.soso.com/icenter/count/count.php",
        logUrl: "http://data.soso.com/icenter/count/forge.php",
        init: function(pid) {
            var refer = this;
            ICenter.Event.add(window, "load",
            function() {
                refer.start = new Date().getTime()
            });
            ICenter.Event.add(window, "beforeunload",
            function() {
                refer.total = (new Date().getTime()) - refer.start; (new Image).src = refer.baseUrl + "?type=time&pid=icenter_" + pid + "&start=" + refer.start + "&total=" + refer.total
            })
        }
    };
    if (typeof(window.ICenterApp) == "undefined") {
        var ICenterApp = window.ICenterApp = {}
    } else {
        var ICenterApp = window.ICenterApp
    }
})();
function StringBuffer() {
    this._array = new Array;
    if (typeof(StringBuffer.__initialize) == "undefined") {
        StringBuffer.prototype.append = function(a) {
            this._array.push(a);
            return this
        };
        StringBuffer.prototype.toString = function() {
            return this._array.join("")
        };
        StringBuffer.__initialize = true
    }
}
function st_getdt1(h, b, e) {
    var j = document,
    a = j.referrer,
    i = "-",
    k = new Date().getUTCMilliseconds(),
    g = j.cookie.match(/suid=([^;]*)(;|$)/);
    if (g) {
        i = g[1]
    } else {
        j.cookie = "suid=" + (Math.round(Math.random() * 2147483647) * k) % 10000000000 + ";path=/; domain=soso.com;expires=Sun, 18 Jan 2038 00:00:00 GMT;";
        g = j.cookie.match(/suid=([^;]*)(;|$)/);
        if (g) {
            i = g[1]
        }
    }
    var f = new Image(1, 1);
    f.src = "http://ping.soso.com/pingd?srctype=getsret&ourl=" + escape(h) + "&lurl=" + escape(j.location) + "&suid=" + i + "&ch=" + b + "&sort=" + e + "&rand=" + Math.random()
}
function st_get(a, c, b) {
    if ((0 == a.length) || (0 == c.length)) {
        return
    }
    st_getdt1(a, c, b)
}
setInterval(function() {
    ICenter.JsLoader.load("http://data.soso.com/vLogin.q?v=__login&tmp=" + Math.random())
},
1500 * 1000); (function() {
    if (typeof(window.ICenterApp) == "undefined") {
        var ICenterApp = window.ICenterApp = {}
    } else {
        var ICenterApp = window.ICenterApp
    }
    $("#u_sidebar li:first").attr("class", "on");
    var BaseModule = function(data, parent, conf) {
        this.parent = parent;
        this.data = data;
        this.conf = conf;
        this.drawTitle = ICenter.HTML.drawTitle2;
        var _mboxTimeout = null;
        this.refresh = function() {
            var name = this.conf.ename;
            var refer = this;
            this.showMessage("正在重新获取数据", 1, 0, 2);
            ICenter.JsLoader.load(ICenter.baseUrl + "c=" + name + "&tp=data&op=get",
            function(json) {
                refer.data = json[name];
                $(refer.parent).find(".zdq_content").remove();
                refer.init()
            })
        };
        this.checkData = function() {
            if (ICenter.Utils.isEmpty(this.data)) {
                var refer = this;
                if (this.conf.pos == 1) {
                    $('<ul class="zdq_content"><li class="s_error tc">很抱歉，服务器正忙，请点击<a href="javascript:void(0);">刷新</a></li></ul>').find("a").click(function() {
                        refer.refresh()
                    }).end().appendTo(this.parent)
                } else {
                    if (this.conf.pos == 2) {
                        $('<div class="c"><div class="k"></div><ul class="zdq_content"><li>很抱歉，服务器正忙，请点击<a href="javascript:void(0);">刷新</a></li></ul></div>').find("a").click(function() {
                            refer.refresh()
                        }).end().appendTo(this.parent)
                    }
                }
                return false
            }
            return true
        };
        this.showMessage = function(message, type, isStill) {
            var c = (type == 1) ? "tips_error": "tips_ok";
            var _messageBox = parent.find(".all_tips");
            _messageBox.html('<span class="' + c + '">' + message + "</span>").css("display", "inline");
            if (_mboxTimeout != null) {
                clearTimeout(_mboxTimeout);
                _mboxTimeout = null
            }
            if (!isStill) {
                _mboxTimeout = setTimeout(function() {
                    _messageBox.css("display", "none");
                    _mboxTimeout = null
                },
                3000)
            }
        }
    };
    function TabContext(elemArr, funcArr, object, onmouseover, tabOnOff, defaultSelection) {
        this.elemArr = elemArr;
        this.timeout = 300;
        this.timeoutID = null;
        if (typeof(funcArr) == "function") {
            this.funcArr = [];
            for (var i = 0; i < elemArr.length; i++) {
                this.funcArr.push(funcArr(i))
            }
        } else {
            this.funcArr = funcArr
        }
        this.object = object;
        this._selectedTab = parseInt(defaultSelection) ? parseInt(defaultSelection) : 0;
        this.onmouseover = onmouseover;
        if ($.isFunction(tabOnOff)) {
            this.tabOnOff = tabOnOff
        } else {
            this.tabOnOff = function() {
                this.elemArr.attr("href", "javascript:void(0);");
                this.getSelectedTabTitle().removeAttr("href")
            }
        }
        if (typeof(TabContext.__initialize) == "undefined") {
            TabContext.__initialize = true;
            TabContext.prototype.getSelectedTabTitle = function() {
                return $(this.elemArr.get(this._selectedTab))
            };
            TabContext.prototype.switchTo = function(tabIndex) {
                this._selectedTab = tabIndex;
                this.tabOnOff();
                this.getSelectedTabTitle().unbind("mouseover");
                this.funcArr[tabIndex].apply(this.object);
                this.switchTab();
                this.timeoutID = null
            };
            TabContext.prototype.switchTab = function() {
                var obj = this.object;
                var context = this;
                this.elemArr.unbind("mouseover").each(function(i) {
                    if (i == context._selectedTab) {
                        return
                    }
                    $(this).mouseover(function() {
                        context.timeoutID = setTimeout(function() {
                            if ($.isFunction(context.onmouseover)) {
                                context.onmouseover()
                            }
                            context.switchTo(i)
                        },
                        context.timeout)
                    });
                    $(this).mouseout(function() {
                        if (context.timeoutID != null) {
                            clearTimeout(context.timeoutID);
                            context.timeoutID = null
                        }
                    })
                })
            }
        }
        this.switchTab();
        this.tabOnOff();
        this.getSelectedTabTitle().unbind("mouseover");
        this.funcArr[this._selectedTab].apply(this.object)
    }
    var SmartBox = function(param) {
        var inputControl = param.inputControl;
        var url = param.url;
        var currentFocus = 0;
        var curWord = null;
        var data = null;
        var self = this;
        var skip = false;
        inputControl.data(SmartBox.DATA_ID, null);
        this.tipsDiv = param.container;
        this.startLoad = function(callback) {
            Logger.debug("smart load :" + curWord);
            this.loader = ICenter.JsLoader.load(url + curWord, callback)
        };
        this.cancelLoad = function() {
            $(this.loader).remove()
        };
        this.hide = function() {
            if (this.tipsDiv) {
                this.tipsDiv.css("visibility", "hidden")
            }
            this.isVisible = false
        };
        inputControl.keyup(function(event) {
            Logger.debug("smart change");
            if (inputControl.val() == "") {
                Logger.debug("empty input");
                inputControl.data(SmartBox.DATA_ID, null);
                curWord = "";
                self.hide();
                return
            }
            if (skip) {
                Logger.debug("skip");
                skip = false;
                return
            }
            if (event.keyCode == 40 && !self.isVisible) {
                var flag = true
            }
            if (!flag && curWord == inputControl.val()) {
                Logger.debug("current");
                return
            }
            if (event.keyCode == 13) {
                return
            }
            Logger.debug(inputControl.data(SmartBox.DATA_ID));
            inputControl.data(SmartBox.DATA_ID, null);
            Logger.debug(inputControl.data(SmartBox.DATA_ID));
            curWord = inputControl.val();
            self.startLoad(function(_json) {
                data = _json.stock;
                self.show()
            })
        });
        inputControl.keydown(function(event) {
            if (event.keyCode == 40) {
                Logger.debug("down" + (currentFocus + 1));
                self.select(currentFocus + 1);
                return
            }
            if (event.keyCode == 38) {
                Logger.debug("up" + (currentFocus - 1));
                self.select(currentFocus - 1);
                return
            }
            if (event.keyCode == 13) {
                if (self.isVisible) {
                    skip = true;
                    inputControl.val(decodeURIComponent(self.selected().name));
                    inputControl.data(SmartBox.DATA_ID, self.selected());
                    self.hide();
                    return
                } else {
                    if ($.isFunction(param.onEnter)) {
                        param.onEnter()
                    }
                }
            }
        });
        this.selected = function() {
            return data[currentFocus]
        };
        this.select = function(sel) {
            if (!data) {
                return
            }
            this.tipsDiv.children("a").eq(currentFocus).removeClass("focus");
            currentFocus = sel;
            if (currentFocus >= data.length) {
                currentFocus = data.length - 1
            }
            if (currentFocus < 0) {
                currentFocus = 0
            }
            this.tipsDiv.children("a").eq(currentFocus).addClass("focus")
        };
        inputControl.blur(function() {
            Logger.debug("blur");
            setTimeout(function() {
                self.hide()
            },
            200)
        });
        var createNewTipsDiv = function() {
            self.tipsDiv.empty()
        };
        this.show = function() {
            createNewTipsDiv();
            if (!data || data.length == 0) {
                self.hide();
                return
            }
            for (var i = 0; i < data.length; i++) {
                var regex = new RegExp("(" + curWord.replace(/\*/g, "\\*") + ")");
                var replaceMent = "<span class='red'>$1</span>";
                var text = data[i].id.replace(regex, replaceMent) + "&nbsp;&nbsp;" + decodeURIComponent(data[i].name).replace(regex, replaceMent);
                $('<a href="javascript:void(0);"><span class="name">&nbsp;' + text + '</span><span class="type">' + decodeURIComponent(data[i].type) + "&nbsp;</span></a>").appendTo(this.tipsDiv)
            }
            this.tipsDiv.children("a").each(function(i, elem) {
                $(elem).click(function(event) {
                    self.select(i);
                    skip = true;
                    inputControl.val(decodeURIComponent(self.selected().name));
                    inputControl.data(SmartBox.DATA_ID, self.selected());
                    self.hide()
                }).mouseover(function(event) {
                    self.select(i)
                })
            });
            this.select(0);
            this.tipsDiv.css("visibility", "visible");
            this.isVisible = true
        }
    };
    SmartBox.DATA_ID = "smartData";
    ICenterApp.nba = function(data, parent, conf) {
        BaseModule.call(this, data, parent, conf);
        this.drawTitle(decodeURIComponent(this.conf.cname));
        this.init = function() {
            if (!this.checkData()) {
                return
            }
            this.updateInterval = 60;
            this.teamBase16 = {
                "火箭": "bbf0bcfd",
                "湖人": "bafec8cb",
                "爵士": "bef4cabf",
                "黄蜂": "bbc6b7e4",
                "太阳": "ccabd1f4",
                "小牛": "d0a1c5a3",
                "掘金": "bef2bdf0",
                "勇士": "d3c2cabf",
                "灰熊": "bbd2d0dc",
                "森林狼": "c9adc1d6c0c7",
                "雷霆": "c0d7f6aa",
                "超音速": "b3acbce4cbd9",
                "开拓者": "bfaacdd8d5df",
                "马刺": "c2edb4cc",
                "快船": "bfecb4ac",
                "国王": "b9facdf5",
                "老鹰": "c0cfd3a5",
                "猛龙": "c3cdc1fa",
                "活塞": "bbeec8fb",
                "凯尔特人": "bfadb6fbccd8c8cb",
                "公牛": "b9abc5a3",
                "雄鹿": "d0dbc2b9",
                "山猫": "c9bdc3a8",
                "步行者": "b2bdd0d0d5df",
                "篮网": "c0bacdf8",
                "骑士": "c6efcabf",
                "热火": "c8c8bbf0",
                "尼克斯": "c4e1bfcbcbb9",
                "魔术": "c4a7caf5",
                "76人": "3736c8cb",
                "奇才": "c6e6b2c5"
            };
            this.container = $("<div></div>").appendTo(this.parent);
            this.tab = $('<div class="s_tab4"></div>');
            this.content = $('<ul class="zdq_content"></ul>');
            if (typeof this.data.match == "undefined" || nbaInfo.match.length == 0) {
                this.showNoMatch()
            } else {
                this.showNoMatch();
                return;
                this.showMatch()
            }
        };
        this.showNoMatch = function() {
            $('<div class="k"></div>').appendTo(this.container);
            $('<ul class="zdq_content"><li class="s_error tc">今天没有比赛<br /><a href="http://u.soso.com/bingo/9/nba/schedule/data/index.html" target="_blank">查看更多赛程和比赛结果</a></li></ul>').appendTo(this.container)
        };
        this.showMatch = function() {
            var nbaInfo = this.data;
            if (typeof nbaInfo.match == "undefined" || nbaInfo.match.length == 0) {
                nbadiv.html('<table class="layout" style="margin-bottom: 4px; background-color: rgb(232, 246, 255);"><tbody><tr><td align="center" style="font-size: 14px; color: rgb(102, 102, 102); line-height: 220%;">今天没有比赛<br/><a target="_blank" style="font-size: 14px;" href="http://u.soso.com/bingo/9/nba/schedule/data/index.html">查看更多赛程和比赛结果</a></td></tr></tbody></table>');
                return
            }
            var dateStr = nbaInfo.date ? "今天(" + nbaInfo.date + ")共" + nbaInfo.match.length.toString() + "场比赛": (new Date().toString());
            $('<table class="layout" style="border-bottom: 1px solid rgb(176, 220, 249); background-color: rgb(232, 246, 255);"><tbody><tr><td align="left" style="padding: 2px;">' + dateStr + '</td><td align="right" style="padding: 2px;"><a href="http://u.soso.com/bingo/9/nba/schedule/data/index.html" target="_blank">09赛季完整赛程</a></td></tr></tbody></table>').appendTo(nbadiv);
            this.scoreTable = $('<table cellspacing="0" cellpadding="0" width="100%" style="margin-bottom: 4px;"></table>').appendTo(nbadiv);
            for (var i = 0; i < nbaInfo.match.length; i++) {
                var subMark = (i < nbaInfo.subNum) ? "star1": "star2";
                var baseHtml = '<tr id="_ID_"><td class="list1"><div class="_SUBSTAR_">&nbsp;</div></td><td class="list2">_TIME_</td><td class="list3">_T1_</td><td class="list4"></td><td class="list5">-</td><td class="list6"></td><td class="list7">_T2_</td><td class="list9">_TVCH_</td><td class="list8"></td></tr>';
                var t1 = decodeURIComponent(nbaInfo.match[i].t1);
                var t2 = decodeURIComponent(nbaInfo.match[i].t2);
                var time = nbaInfo.match[i].time;
                var html = baseHtml.replace(/_ID_/g, nbaInfo.match[i].t1 + "-" + nbaInfo.match[i].t2);
                var hl = function(t) {
                    if (t == "火箭" || t == "湖人" || t == "篮网") {
                        return "<em class='c'>" + t + "</em>"
                    } else {
                        return t
                    }
                };
                html = html.replace("_SUBSTAR_", subMark);
                html = html.replace("_T1_", hl(t1));
                html = html.replace("_T2_", hl(t2));
                html = html.replace("_TIME_", time);
                html = html.replace("_TVCH_", decodeURIComponent(nbaInfo.match[i].tvch));
                $(html).appendTo(this.scoreTable)
            }
            $("#nba td.list1").click(function(ev) {
                if ($("#nba_tips").size() > 0) {
                    return
                }
                ICenter.Event.stop(ev);
                $(document).click(function() {
                    $("div#nba_tips").remove();
                    $(document).unbind("click")
                });
                var nba_tips = "<div id='nba_tips' class='tips'><a style='margin-top:-16px;margin-left:180px;position:absolute;cursor:pointer;color:#69c;font-weight:bold;'>×</a>到<a href='http://u.soso.com/bingo/9/nba/schedule/data/index.html' target='_blank'>NBA赛程页</a>，点击<span class='star2' style='float:none;display:inline;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>订制比赛。<br/>我们会通过QQ进行比分播报和赛程提醒。<a href='http://cache.soso.com/zdq/index8.html' target='_blank'>了解更多？</a></div>";
                $(nba_tips).prependTo(nbadiv);
                $("#nba_tips").click(function(event) {
                    ICenter.Event.stop(event)
                });
                $("div#nba_tips>a").each(function(index, elem) {
                    if (index == 0) {
                        $(elem).click(function() {
                            $("div#nba_tips").remove()
                        })
                    } else {
                        $(elem).click(function() {
                            window.open(elem.href)
                        })
                    }
                })
            });
            this.updateScore(nbaInfo.date);
            var refer = this;
            setInterval(function() {
                refer.updateScore(nbaInfo.date)
            },
            refer.updateInterval * 1000)
        };
        this.updateScore = function(dateStr) {
            var timeInfo = dateStr.split("-");
            var time = timeInfo[1] + timeInfo[2];
            var fName = "nba_score_" + time + ".js";
            var url = "http://u.soso.com/bingo/8/score/" + fName + "?v=__nba_score&" + Math.random();
            var refer = this;
            ICenter.JsLoader.load(url,
            function(__nba_score) {
                refer.scoreTable.find("tr").each(function(index, elem) {
                    var t1t2Str = $(elem).attr("id");
                    var t1t2 = t1t2Str.split("-");
                    var t1 = t1t2[0];
                    var t2 = t1t2[1];
                    var data = __nba_score[refer.teamBase16[decodeURIComponent(t1)] + refer.teamBase16[decodeURIComponent(t2)]];
                    if (typeof data == "undefined") {
                        return
                    }
                    data = data.split("~");
                    $(elem).children(".list4").html(data[0].split(":")[0]);
                    $(elem).children(".list6").html(data[0].split(":")[1]);
                    if (data[1] == "1") {
                        var liveurl = "http://www.soso.com/q?w=" + encodeURIComponent(decodeURIComponent(t1) + "队") + "&pid=w.idx.zdq.9.live&ch=w.idx.zdq.9.live&ie=utf-8";
                        $(elem).children(".list8").html('<a target="_blank" href="' + liveurl + '">直播</a>')
                    }
                    if (data[2] == "1") {
                        $(elem).children(".list2").html("[&nbsp;&nbsp;结束&nbsp;]")
                    }
                })
            },
            "object")
        }
    };
    ICenterApp.stock = function(data, parent, conf) {
        BaseModule.call(this, data, parent, conf);
        var self = this;
        this.addSubStock = function(stockid, sinput) {
            Logger.debug("add stockid:" + stockid);
            Logger.debug("add sinput:" + sinput);
            if (sinput == "股票代码/名称/拼音" || sinput == "") {
                self.showMessage("请输入股票代码/名称/拼音", 1);
                return
            }
            self.showMessage("添加中，请稍侯", null, true);
            ICenter.JsLoader.load(ICenter.baseUrl + "c=stock&op=add&tp=notice&" + (sinput ? ("sinput=" + sinput + "&") : "") + (stockid ? ("stockid=" + stockid) : ""),
            function(_json) {
                Logger.debug(_json);
                if (_json.stock == 0) {
                    ICenter.JsLoader.load(ICenter.baseUrl + "c=stock&op=get&tp=data&tmp=" + Math.random(),
                    function(_json) {
                        self.data = _json.stock;
                        Logger.debug(_json);
                        self.refreshSub();
                        self.showMessage("添加成功！")
                    })
                } else {
                    if (_json.stock == 1) {
                        self.showMessage("添加失败,该股票不存在", 1)
                    } else {
                        if (_json.stock == 2) {
                            self.showMessage("添加失败,服务器忙", 1)
                        } else {
                            self.showMessage("请选定一支股票", 1)
                        }
                    }
                }
            })
        };
        this.drawTitle(decodeURIComponent(this.conf.cname));
        this.init = function() {
            if (!this.checkData()) {
                return
            }
            this.currentTime = this.data.time;
            var tasks = [self.timeout1, self.timeout2, self.timeout3];
            for (var timeout in tasks) {
                if (!ICenter.Utils.isEmpty(tasks[timeout])) {
                    clearTimeout(tasks[timeout])
                }
            }
            this.updateInterval = 30;
            this._content = $('<ul class="zdq_content"></ul>').appendTo(this.parent);
            this._content.append('<li class="tab_line">&nbsp;</li>');
            this._content.append('<li class="tab tab_now">自选股</li>');
            this._content.append('<li class="tab_line">&nbsp;</li>');
            this._content.append('<li class="tab tab_other">热门股</li>');
            this.other = $('<li class="tab_other1"></li>').appendTo(this._content);
            var smartBoxDiv = $('<div style="visibility:hidden;" class="stock_smartbox"></div>').appendTo(this.other);
            this.other.append('<input name="input" type="text" value="股票代码/名称/拼音" class="input2" /><input name="input" type="button" class="icon_button9" value="添加自选股" /><input name="input" type="button" class="icon_button10" value="查看" />');
            this.cc = $("<li></li>").appendTo(this._content);
            this.generalDiv = $("<div class='stock_top'></div>").appendTo(this.cc);
            this.subDiv = $("<div></div>").appendTo(this.cc);
            this.hotDiv = $("<div></div>").appendTo(this.cc);
            var inputFocus = function() {
                if (this.value == "股票代码/名称/拼音") {
                    $(this).css("color", "#000");
                    this.value = ""
                }
            };
            var inputBlur = function() {
                if (ICenter.Utils.isEmpty(this.value)) {
                    $(this).css("color", "#888");
                    this.value = "股票代码/名称/拼音"
                }
            };
            var doSearch = function() {
                var input = $("#stock .input2");
                Logger.debug(input.data(SmartBox.DATA_ID));
                if (ICenter.Utils.isEmpty(input.data(SmartBox.DATA_ID))) {
                    var value = input.val();
                    var word = (value == "股票代码/名称/拼音") ? "600000": value
                } else {
                    var word = input.data(SmartBox.DATA_ID).id
                }
                window.open("http://www.soso.com/q?ie=utf-8&w=" + encodeURIComponent(word) + "&pid=w.idx.zdq.1.sea&ch=w.idx.zdq.1.sea&bingo_c=1", "_blank")
            };
            var addSmartBoxStock = function() {
                st_get("icenter", "w.idx.zdq.1.sa", 0);
                var sinput = self.other.find("input.input2").val();
                var stockid = self.other.find("input.input2").data(SmartBox.DATA_ID);
                if (!ICenter.Utils.isEmpty(stockid)) {
                    stockid = stockid.id
                }
                self.addSubStock(stockid, sinput)
            };
            this.other.find(".icon_button10").click(function() {
                doSearch()
            }).end().find("input.icon_button9").click(addSmartBoxStock).end().find("input.input2").focus(inputFocus).blur(inputBlur).end();
            self.tabContext = new TabContext(self._content.find(".tab"), [this.showSub, this.showHot], this,
            function() {
                st_get(this, "w.idx.zdq.1.nav", 0)
            },
            function() {
                this.elemArr.removeClass("tab_now").addClass("tab_other");
                this.getSelectedTabTitle().addClass("tab_now").removeClass("tab_other")
            });
            new SmartBox({
                container: smartBoxDiv,
                inputControl: this.other.find("input.input2").eq(0),
                url: ICenter.baseUrl + "c=stock&op=get&tp=suggest&sinput=",
                onEnter: addSmartBoxStock
            });
            this.updateGeneral();
            this.drawSub();
            this.drawHot();
            this.updateIntervalTask()
        };
        this.updateIntervalTask = function() {
            ICenter.JsLoader.load("http://u.soso.com/bingo/1/js/stock/getStock.php?stock=" + self.getStockString(),
            function(stockData) {
                self.stockData = stockData;
                self.update();
                if (self.isRefreshTime()) {
                    self.timeout1 = setTimeout(self.updateIntervalTask, self.updateInterval * 1000)
                }
            })
        };
        this.getStockString = function() {
            var map = new Object();
            if (!ICenter.Utils.isEmpty(this.data.data.notice)) {
                for (var i = 0; i < this.data.data.notice.length; i++) {
                    var item = this.data.data.notice[i];
                    var str = item.stockId + "_" + item.markId;
                    map[str] = 1
                }
            }
            for (var i = 0; i < this.data.hot.length; i++) {
                var item = this.data.hot[i];
                var str = item.stockId + "_" + item.markId;
                map[str] = 1
            }
            var tmp = [];
            for (var x in map) {
                tmp.push(x)
            }
            return tmp.join(",")
        };
        this.update = function() {
            var stockData = this.stockData;
            for (var stock in stockData) {
                var info = stockData[stock];
                var zd = (info.riseRate >= 0) ? "red": "green";
                $("#stock  ." + stock).each(function(i, e) {
                    $(e).children("div").each(function(index, elem) {
                        if (index == 1) {
                            var name = decodeURIComponent(info.name);
                            $(elem).children("a").html(name.substr(0, 10)).attr("title", name)
                        } else {
                            if (index == 2) {
                                var price = (info.price == "0.00") ? "停牌": info.price;
                                $(elem).html(price).removeClass("red").removeClass("green").addClass(zd)
                            } else {
                                if (index == 3) {
                                    $(elem).html(info.riseRate + "%").removeClass("red").removeClass("green").addClass(zd)
                                }
                            }
                        }
                    })
                })
            }
        };
        this.showSub = function() {
            this.subDiv.css("display", "block");
            this.hotDiv.css("display", "none")
        };
        this.showHot = function() {
            this.subDiv.css("display", "none");
            this.hotDiv.css("display", "block")
        };
        this.getStockHTML = function(stockData, suffix) {
            return $('<div class="stock ' + stockData.stockId + "_" + stockData.markId + '"><div class="div2">' + stockData.stockId + '</div><div class="div1"><a href="http://www.soso.com/q?w=' + stockData.stockId + '&pid=w.idx.zdq.1.key&ch=w.idx.zdq.1.key&ie=utf-8&bingo_c=1" target="_blank">' + decodeURIComponent(stockData.sName) + '</a></div><div class="div3">--</div><div class="div4">--</div>' + ((suffix == "sub") ? ('<div class="div5"><a class="' + (stockData.tips == 1 ? "qq_tips_sub": "qq_tips") + '" href="javascript:void(0)">QQ提醒</a></div>') : "") + ((suffix == "sub") ? ('<div class="div6"><a href="javascript:void(0);" class="s_del"></a></div>') : "") + ((suffix == "hot") ? '<div class="div7"><a href="javascript:void(0)">添加到自选股</a></div>': "") + "</div>").find(".div5").click(function() {
                st_get("icenter", "w.idx.zdq.1.qt", 0);
                self.openSubcribe(stockData.markId + "_" + stockData.stockId);
                return false
            }).end().find(".div7").click(function() {
                self.addSubStock(stockData.stockId);
                return false
            }).end().find(".div6 .s_del").click(function() {
                var tr = $(this).parents("div.stock");
                if (confirm("确认要删除该股票？")) {
                    st_get("icenter", "w.idx.zdq.1.ds", 0);
                    self.showMessage("删除中，请稍侯", null, true);
                    ICenter.JsLoader.load("http://data.soso.com/icenter/i/index.php?c=stock&op=set&tp=notice&notice=0&stockid=" + stockData.stockId,
                    function(_json) {
                        if (_json.stock == 0) {
                            for (var i = 0; i < self.data.data.notice.length; i++) {
                                if (self.data.data.notice[i].stockId == stockData.stockId) {
                                    self.data.data.notice.splice(i, 1)
                                }
                            }
                            if (self.data.data.notice.length == 0) {
                                self.drawSub()
                            } else {
                                $(tr).remove()
                            }
                            self.showMessage("删除成功！")
                        } else {
                            self.showMessage("删除失败", 1)
                        }
                    })
                }
                return false
            }).end()
        };
        this.drawHot = function() {
            var stockInfo = this.data;
            this.hotDiv.empty();
            for (var i = 0; i < stockInfo.hot.length; i++) {
                $(this.hotDiv).append(this.getStockHTML(stockInfo.hot[i], "hot"));
                $(this.hotDiv).children("div:odd").addClass("bg1")
            }
        };
        this.drawSub = function() {
            var stockInfo = this.data;
            this.subDiv.empty();
            if (ICenter.Utils.isEmpty(stockInfo.data.notice) || stockInfo.data.notice.length == 0) {
                $('<li class="s_error tc">您还没有任何自选股</li>').appendTo(this.subDiv);
                return
            }
            for (var i = 0; i < stockInfo.data.notice.length; i++) {
                this.subDiv.append(this.getStockHTML(stockInfo.data.notice[i], "sub"));
                $(this.subDiv).children("div:odd").addClass("bg1")
            }
        };
        this.updateGeneral = function() {
            var url = "http://u.soso.com/bingo/1/js/stock/index/top_hq.js?v=v_top_info";
            this.generalDiv.empty();
            var updateValue = function() {
                ICenter.JsLoader.load(url + "&tmp=" + Math.random(),
                function(v_top_info) {
                    self.generalDiv.html('<div><a href="http://stockhtm.finance.qq.com/hqing/zhishu/' + v_top_info[2][0] + '.htm" target="_blank">上证</a><span class="' + (v_top_info[2][6] > 0 ? "red": "green") + '">&nbsp;' + v_top_info[2][4] + "&nbsp;(" + v_top_info[2][6] + '%)</span></div><div><a href="http://stockhtm.finance.qq.com/hqing/zhishu/' + v_top_info[0][0] + '.htm" target="_blank">深证</a><span class="' + (v_top_info[0][6] > 0 ? "red": "green") + '">&nbsp;' + v_top_info[0][4] + "&nbsp;(" + v_top_info[0][6] + '%)</span></div><div><a href="http://stockhtm.finance.qq.com/hk/ggcx/hsi.htm" target="_blank">恒生</a><span class="' + (v_top_info[5][6] > 0 ? "red": "green") + '">&nbsp;' + v_top_info[5][4] + "&nbsp;(" + v_top_info[5][6] + "%)</span></div>");
                    if (self.isRefreshTime()) {
                        self.timeout2 = setTimeout(function() {
                            updateValue()
                        },
                        self.updateInterval * 1000)
                    }
                },
                "object")
            };
            updateValue()
        };
        this.openSubcribe = function(id) {
            var msgbox = new ICenter.MessageBox({
                maskStyle: {
                    "background-color": "#000",
                    height: "100%",
                    opacity: "0.3",
                    position: "absolute",
                    width: "100%",
                    "z-index": "100",
                    filter: "alpha(opacity = 50)"
                },
                message: '<iframe height="270" frameborder="0" width="430" scrolling="no" src="http://data.soso.com/subscribe.php?c=stock&op=get&tp=stock&id=' + id + '" marginwidth="0" marginheight="0"></iframe>'
            });
            msgbox.show();
            setTimeout(function() {
                if ($("#pageMask").size() == 0 && $("#alertDiv").size() == 0) {
                    ICenter.JsLoader.load(ICenter.baseUrl + "c=userinfo,stock&op=get&tp=data",
                    function(json) {
                        self.data = json.stock;
                        self.refreshSub()
                    })
                } else {
                    setTimeout(arguments.callee, 200)
                }
            },
            200)
        };
        this.refreshSub = function() {
            this.drawSub();
            this.updateIntervalTask()
        };
        this.isRefreshTime = function() {
            var currentDay = new Date(this.currentTime * 1000);
            if (currentDay.getDay() == 0 || currentDay.getDay() == 6) {
                return false
            }
            if (currentDay.getHours() > 16 || (currentDay.getHours() == 16 && currentDay.getMinutes() > 30)) {
                return false
            }
            if (currentDay.getHours() < 9 || (currentDay.getHours() == 9 && currentDay.getMinutes() < 30)) {
                return false
            }
            return true
        }
    };
    ICenterApp.weather = function(data, parent, conf) {
        BaseModule.call(this, data, parent, conf);
        this.drawTitle(decodeURIComponent(this.conf.cname));
        this.init = function() {
            if (!this.checkData()) {
                return
            }
            this.tabCity = [];
            this.infoList = [];
            var fnGen = function(i) {
                return function() {
                    this.tabChange(i)
                }
            };
            this.container = $("<div></div>").appendTo(this.parent);
            this.tab = $('<div class="s_tab"></div>').appendTo(this.container);
            this.content = $('<ul class="zdq_content"></ul>').appendTo(this.container);
            this.infoList.push(data);
            this.genTabCity(this.data);
            $('<div class="right_input1"><input name="input" type="text" value="城市名 如：北京" class="input1" /><input name="input" type="button" class="icon_button8" /></div>').appendTo(this.tab);
            this.tab.append(this.genBarHtml(this.tabCity));
            new TabContext(this.tab.find("a"), [fnGen(0), fnGen(1), fnGen(2)], this,
            function() {
                st_get(this, "w.idx.zdq.2.nav", 0)
            });
            this.addEvent()
        };
        this.genTabCity = function(data) {
            this.tabCity.push(decodeURIComponent(data.city));
            var count = 1;
            for (var i = 0; i < data.related.length; i++) {
                this.tabCity.push(decodeURIComponent(data.related[i]));
                count++;
                if (count >= 3) {
                    break
                }
            }
        };
        this.genBarHtml = function(cityList) {
            var cityHtml = "";
            var cithListHtml = "";
            for (var i = 0; i < cityList.length; i++) {
                cityHtml = '<a href="javascript:void(0);">' + cityList[i] + "</a>";
                if (i == cityList.length - 1) {
                    cithListHtml += cityHtml
                } else {
                    cithListHtml += cityHtml + "|"
                }
            }
            return cithListHtml
        };
        this.genDetailHtml = function(data) {
            var desc = decodeURIComponent(data.rtInfo.desc);
            desc = desc.replace("（", "(");
            desc = desc.replace("）", ")");
            return '<li><div class="weather_img"><div><img src="http://cache.soso.com/zdq/wea/' + data.rtInfo.icon + '" onload="ICenter.Utils.setPng(this, 48, 48);" alt="" /></div></div><div class="weather_gy"><span><span class="title">' + decodeURIComponent(data.city) + "</span>　实时天气：" + decodeURIComponent(data.rtInfo.temp) + "&nbsp;&nbsp;" + desc + "</span><br />紫外线强度-" + decodeURIComponent(data.today.uv) + "　空气质量-" + decodeURIComponent(data.today.air) + "　感冒指数-" + decodeURIComponent(data.today.cold) + '</div><div class="weather_yb"><div class="bor1">今天(' + data.today.date + "日)<br />" + decodeURIComponent(data.today.temp) + "&nbsp;&nbsp;" + decodeURIComponent(data.today.desc) + "<br/>" + decodeURIComponent(data.today.desc1) + '<br /></div><div class="bor2">明天(' + data.tomorrow.date + "日)<br />" + decodeURIComponent(data.tomorrow.temp) + "&nbsp;&nbsp;" + decodeURIComponent(data.tomorrow.desc) + "<br/>" + decodeURIComponent(data.tomorrow.desc1) + '<br /></div><div class="bor2">后天(' + data.afTomorrow.date + "日)<br />" + decodeURIComponent(data.afTomorrow.temp) + "&nbsp;&nbsp;" + decodeURIComponent(data.afTomorrow.desc) + "<br/>" + decodeURIComponent(data.afTomorrow.desc1) + "<br /></div></div></li>"
        };
        this.tabChange = function(pos) {
            if (typeof(this.infoList[pos]) == "undefined" || this.infoList[pos] == null || this.infoList[pos] == "") {
                var url = ICenter.baseUrl + "c=weather&op=get&tp=data&city=" + encodeURIComponent(this.tabCity[pos]);
                var refer = this;
                ICenter.JsLoader.load(url,
                function(info) {
                    refer.show(info.weather);
                    refer.infoList[pos] = info.weather
                })
            } else {
                this.show(this.infoList[pos])
            }
        };
        this.show = function(data) {
            var html = this.genDetailHtml(data);
            this.content.empty();
            $(html).appendTo(this.content)
        };
        this.addEvent = function() {
            var input = $("#weather .input1");
            input.focus(function() {
                if (input.val() == "城市名 如：北京") {
                    input.val("");
                    input.css("color", "#000")
                }
            });
            input.blur(function() {
                if (input.val() == "") {
                    input.val("城市名 如：北京");
                    input.css("color", "#888")
                }
            });
            input.keydown(function(ev) {
                if (ev.keyCode == 13) {
                    $("#weather .icon_button8").trigger("click")
                }
            });
            $("#weather .icon_button8").click(function() {
                var word = (input.val() == "城市名 如：北京") ? "北京天气": (input.val() + "天气");
                window.open("http://www.soso.com/q?pid=w.idx.zdq.2.sea&ch=w.idx.zdq.2.sea&ie=utf-8&w=" + encodeURIComponent(word), "_blank")
            })
        }
    };
    ICenterApp.star = function(data, parent, conf) {
        BaseModule.call(this, data, parent, conf);
        this.drawTitle(decodeURIComponent(this.conf.cname));
        this.genOneContentHtml = function(d) {
            d.content = decodeURIComponent(d.content);
            if (d.content.length > 50) {
                d.content = d.content.substr(0, 50) + "..."
            }
            return '<li><div class="star1"><div class="xzys"><img src="' + d.trendIcon + '"></div><div class="content"><div class="star1_title"><a href="http://www.soso.com/q?w=' + d.star + encodeURIComponent("座") + '&ie=utf-8&pid=w.idx.zdq.37.astro&ch=w.idx.zdq.37.astro" target="_blank">' + decodeURIComponent(d.star) + "座</a><strong>今日运势</strong>&nbsp;" + this.num2Star(d.zonghe) + "</div>" + d.content + '<a href="http://www.soso.com/q?w=' + d.star + encodeURIComponent("座") + '&ie=utf-8&pid=w.idx.zdq.37.detail&ch=w.idx.zdq.37.detail" target="_blank">详情</a><br/><a href="http://www.soso.com/q?w=' + d.star + encodeURIComponent("座性格") + '&ie=utf-8&pid=w.idx.zdq.37.character&ch=w.idx.zdq.37.character" target="_blank">' + decodeURIComponent(d.star) + '座性格</a> – 速配： <a href="http://www.soso.com/q?w=' + d.star + encodeURIComponent("座配") + d.supei + '&ie=utf-8&pid=w.idx.zdq.37.match&ch=w.idx.zdq.37.match" target="_blank">' + decodeURIComponent(d.supei) + "</a></div></div></li>"
        };
        this.genContentHtml = function() {
            var html = "";
            for (var i = 0; i < this.data.data.length; i++) {
                html += this.genOneContentHtml(this.data.data[i])
            }
            return html
        };
        this.num2Star = function(num) {
            var html = "";
            var leval = this.getLeval(num);
            var leftLeval = 5 - leval;
            for (var i = 0; i < leval; i++) {
                html += '<span class="icon1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
            }
            for (var j = 0; j < leftLeval; j++) {
                html += '<span class="icon2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
            }
            return html
        };
        this.getLeval = function(num) {
            var leval = 1;
            if (num <= 29) {
                leval = 1
            } else {
                if (num >= 30 && num <= 59) {
                    leval = 2
                } else {
                    if (num >= 60 && num <= 74) {
                        leval = 3
                    } else {
                        if (num >= 75 && num <= 89) {
                            leval = 4
                        } else {
                            if (num >= 90) {
                                leval = 5
                            }
                        }
                    }
                }
            }
            return leval
        };
        this.openSubcribe = function() {
            var msgbox = new ICenter.MessageBox({
                maskStyle: {
                    "background-color": "#000",
                    height: "100%",
                    opacity: "0.3",
                    position: "absolute",
                    width: "100%",
                    "z-index": "100",
                    filter: "alpha(opacity = 50)"
                },
                message: '<iframe height="310" frameborder="0" width="600" scrolling="no" src="http://data.soso.com/subscribe.php?c=star&op=get&tp=star&id=0&title=星座运势&random=' + Math.random() + '" marginwidth="0" marginheight="0"></iframe>'
            });
            setTimeout(function() {
                msgbox.show()
            },
            0);
            var refer = this;
            setTimeout(function() {
                if ($("#pageMask").size() == 0 && $("#alertDiv").size() == 0) {
                    ICenter.JsLoader.load(ICenter.baseUrl + "c=star&op=get&tp=data&tmp=" + Math.random(),
                    function(subData) {
                        refer.data = subData.star;
                        refer.drawBody();
                        $("#s_input").focus()
                    })
                } else {
                    setTimeout(arguments.callee, 200)
                }
            },
            200)
        };
        this.showSub = function(data) {
            var starApp = this;
            this.container.empty();
            this.tab.find("a").click(function() {
                st_get("icenter", "w.idx.zdq.37.qt", 0);
                starApp.openSubcribe();
                return false
            });
            this.tab.appendTo(this.container);
            this.content.empty();
            this.content.html(this.genContentHtml());
            this.content.appendTo(this.container)
        };
        this.showNoSub = function() {
            this.container.empty();
            var html = $('<ul class="zdq_content"><li class="s_error">您还没有设置关注的星座运势，<a href="javascript:void(0);">我要设置&raquo;</a></li></ul>');
            var starApp = this;
            html.find("a").click(function() {
                starApp.openSubcribe()
            });
            html.appendTo(this.container)
        };
        this.drawBody = function() {
            if (this.data.isSub == 0) {
                this.showNoSub()
            } else {
                this.showSub(this.data)
            }
        };
        this.init = function() {
            if (!this.checkData()) {
                return
            }
            this.container = $("<div></div>").appendTo(this.parent);
            this.tab = $('<div class="s_tab4"><div class="right_input1 input1_fix"><a href="javascript:void(0)">设置关注星座</a></div></div>');
            this.content = $('<ul class="zdq_content"></ul>');
            this.drawBody()
        }
    };
    ICenterApp.historypro = function(data, parent, conf) {
        if (ICenter.Utils.isEmpty(data)) {
            data = {}
        }
        BaseModule.call(this, data, parent, conf);
        ICenter.HTML.drawTitle1.apply(this, ["搜索历史"]);
        this.init = function() {
            this.c = $('<div class="c"></div>').appendTo(this.parent);
            if (!ICenter.Utils.isEmpty(ICenterApp.__allData.userinfo)) {
                $('<div class="history"><span class="zs">&nbsp;&nbsp;&nbsp;&nbsp;</span>搜索总数：<strong>' + ICenterApp.__allData.userinfo.snum + '</strong>　　<span class="pm">&nbsp;&nbsp;&nbsp;&nbsp;</span>排名：<strong>' + (ICenterApp.__allData.userinfo.rank > 10000 ? "10000+": ICenterApp.__allData.userinfo.rank) + "</strong></div>").appendTo(this.c)
            }
            this.ct = $('<div class="s_tab"><a>最近搜索</a>|<a>最常搜索</a><a target="_blank" href="http://help.soso.com/help_web_15.shtml"  class="cjwt">常见问题</a></div>');
            this.cc = $("<div></div>");
            this.c1 = $("<ul class='zdq_content'></ul>");
            this.c2 = $("<ul class='zdq_content'></ul>");
            this.tips1 = $('<div id="history_tips" class="history_tips"></div>');
            if (this.data.recentKey && data.recentKey.length == 0) {
                $('<div class="k"></div>').appendTo(this.c);
                this.cc.appendTo(this.c);
                this.c1.appendTo(this.cc);
                $('<li style="height:55px;text-align:center;padding-top:5px;">记录您的搜索历程<br/>点击<a href="http://u.soso.com/icenter/htdocs/history.html?pid=w.idx.lnav.history&ch=w.idx.lnav.history&newuser=1">此处</a>查看详情</li>').appendTo(this.c1);
                var obj = $(".u_othernav ul li:first a");
                obj.attr("href", obj.attr("href") + "&newuser=1");
                return
            }
            this.ct.appendTo(this.c);
            this.cc.appendTo(this.c);
            this.tips1.appendTo(this.c).hide();
            new TabContext(this.ct.children("a:lt(2)"), [this.showRecent, this.showFrequence], this,
            function(i) {
                st_get("historypro", "w.idx.his.nav", 0)
            })
        };
        this.showFrequence = function() {
            var refer = this;
            var doShow = function() {
                refer.cc.empty();
                refer.c2.appendTo(refer.cc);
                refer.keywordTips(refer.c2, refer.freqTipsRender)
            };
            if (!this.data.freqKey) {
                ICenter.JsLoader.load(ICenter.baseUrl + "c=historypro&tp=frequencekey&op=get",
                function(data) {
                    if (!data.historypro.keys) {
                        refer.showError(refer.c2, refer.showFrequence, refer);
                        return
                    }
                    refer.data.freqKey = data.historypro.keys;
                    refer.renderKeyWord(refer.data.freqKey, refer.c2, "w.idx.his.often");
                    doShow.apply(refer)
                })
            } else {
                doShow()
            }
        };
        this.recentRender = false;
        this.showRecent = function() {
            var refer = this;
            var doShow = function() {
                refer.cc.empty();
                refer.c1.appendTo(refer.cc);
                if (refer.data.recentKey && refer.data.recentKey.length >= 8) {
                    $('<a class="zdq_more2" href="history.html?t=' + refer.data.time + '&pid=w.idx.his.more&ch=w.idx.his.more">更多&raquo;</a>').appendTo(refer.cc)
                }
                refer.keywordTips(refer.c1, refer.recentTipsRender)
            };
            if (!this.data.recentKey) {
                ICenter.JsLoader.load(ICenter.baseUrl + "c=historypro&tp=recentkey&op=get",
                function(recentData) {
                    if (!recentData.historypro.recentKey) {
                        refer.showError(refer.c1, refer.showRecent, refer);
                        return
                    }
                    refer.data.recentKey = recentData.historypro.recentKey;
                    if (!refer.recentRender) {
                        refer.renderKeyWord(refer.data.recentKey, refer.c1, "w.idx.his.latest");
                        refer.recentRender = true
                    }
                    doShow()
                })
            } else {
                if (!this.recentRender) {
                    this.renderKeyWord(this.data.recentKey, this.c1, "w.idx.his.latest");
                    this.recentRender = true
                }
                doShow()
            }
        };
        this.renderKeyWord = function(keywordData, keywordContainer, pid) {
            keywordContainer.empty();
            if (ICenter.Utils.isEmpty(keywordData) || keywordData.length == 0) {
                keywordContainer.append("<li>您的搜索数据暂无</li>");
                return
            }
            for (var i = 0; i < keywordData.length; i++) {
                var key = decodeURIComponent(keywordData[i].key);
                var keytitle = (key.length > 10) ? (key.substring(0, 10) + "...") : key;
                var keyurl = "http://www.soso.com/q?w=" + keywordData[i].key + "&pid=" + pid + "&ch=" + pid + "&ie=utf-8";
                keywordContainer.append('<li><span class="line"><a class="s_ls"></a>&nbsp;<a target="_blank" title="' + key + '"  href="' + keyurl + '">' + keytitle + "</a></span>" + (keywordData[i].num ? ('<span class="num">' + keywordData[i].num + "次</span>") : "") + "</li>")
            }
        };
        var otherSearchCache = {};
        var renderOtherSearch = function(recommendDiv, key, pid) {
            var render = function(recommendDiv, keyListStr) {
                recommendDiv.empty();
                if (ICenter.Utils.isEmpty(keyListStr)) {
                    recommendDiv.css("font-size", "0");
                    return
                } else {
                    recommendDiv.css("font-size", "")
                }
                var keyList = keyListStr.split(";");
                recommendDiv.append("网友还在搜:<br />");
                for (var i = 0; i < (keyList.length > 6 ? 6 : keyList.length); i++) {
                    recommendDiv.append('<a target="_blank" href="http://www.soso.com/q?w=' + encodeURIComponent(keyList[i]) + "&pid=" + pid + "&ch=" + pid + '&ie=utf-8">' + keyList[i] + "</a>")
                }
            };
            if (typeof(otherSearchCache[key]) == "undefined") {
                ICenter.JsLoader.load("http://www.soso.com/icenter/recentsearchHelper.php?k=" + key,
                function(keyListStr) {
                    otherSearchCache[key] = keyListStr;
                    render(recommendDiv, keyListStr)
                },
                "object",
                function() {
                    otherSearchCache[key] = null;
                    recommendDiv.remove()
                })
            } else {
                if (otherSearchCache[key] != null) {
                    render(recommendDiv, otherSearchCache[key])
                } else {
                    recommendDiv.remove()
                }
            }
        };
        this.showError = function(container, freshFun, obj) {
            this.cc.empty();
            container.empty();
            container.appendTo(this.cc);
            $('<li>很抱歉，服务器正忙，请点击<a href="javascript:void(0)">刷新</a></li>').find("a").click(function() {
                if (obj) {
                    freshFun.apply(obj)
                } else {
                    freshFun()
                }
            }).end().appendTo(container)
        };
        this.keywordTips = function(div, renderFunction) {
            var timeoutShow = [];
            var timeoutHide = [];
            var showID = null;
            var obj = this;
            div.children("li").children("span.line").each(function(index, elem) {
                $(elem).mouseover(function() {
                    if (!ICenter.Utils.isEmpty(timeoutHide[index])) {
                        clearTimeout(timeoutHide[index]);
                        timeoutHide[index] = null
                    }
                    var offset = $(this.parentNode).offset();
                    timeoutShow[index] = setTimeout(function() {
                        obj.tips1.empty();
                        $(elem).before(obj.tips1);
                        renderFunction.apply(obj, [index, obj.tips1]);
                        $(elem).children("a:first").attr("class", "s_ls_focus");
                        obj.tips1.show();
                        showID = index;
                        timeoutShow[index] = null
                    },
                    500)
                });
                $(elem).mouseout(function() {
                    if (!ICenter.Utils.isEmpty(timeoutShow[index])) {
                        clearTimeout(timeoutShow[index]);
                        timeoutShow[index] = null
                    }
                    if (showID != index && showID != null) {
                        return
                    }
                    timeoutHide[index] = setTimeout(function() {
                        $(obj.tips1).hide();
                        $(elem).children("a:first").attr("class", "s_ls");
                        showID = null
                    },
                    500)
                })
            });
            obj.tips1.mouseover(function() {
                if (timeoutHide[showID] != null) {
                    clearTimeout(timeoutHide[showID]);
                    timeoutHide[showID] = null
                }
            }).mouseout(function() {
                timeoutHide[showID] = setTimeout(function() {
                    $(obj.tips1).hide();
                    $(".s_ls_focus").attr("class", "s_ls");
                    showID = null
                },
                500)
            })
        };
        var urlCache = {};
        this.recentTipsRender = function(index, tips1) {
            var show = function(urls) {
                var notHasUrl = ((typeof urls == "undefined") || (urls.length == 0));
                $('<div class="history_title1">访问的链接:<br /></div>').appendTo(tips1);
                var history_content = $("<div></div>").appendTo(tips1).wrap('<div class="history_content1"></div>');
                var recommend = $("<div></div>").appendTo(tips1).wrap('<div class="history_content2"></div>');
                if (notHasUrl) {
                    history_content.append("<a>&#8226;&nbsp;暂无</a>")
                } else {
                    for (var i = 0; i < urls.length; i++) {
                        var title = decodeURIComponent(urls[i].title);
                        history_content.append('&#8226;<a target="_blank" href="' + decodeURIComponent(urls[i].url) + '" onclick="st_get(this, \'w.i.clk\', 0);">' + title + "</a><br />")
                    }
                }
                recommend.append('<p style="text-align:center;padding-top:20px"><img src="http://cache.soso.com/img/web/loading_0.gif"></img></p>');
                renderOtherSearch(recommend, keyword, "w.idx.his.latest.r")
            };
            var keyword = this.data.recentKey[index].key;
            if (!urlCache[keyword]) {
                ICenter.JsLoader.load(ICenter.baseUrl + "c=historypro&tp=recenturl&op=get&key=" + keyword,
                function(data) {
                    urlCache[keyword] = data.historypro;
                    show(data.historypro)
                })
            } else {
                var urls = urlCache[keyword];
                show(urls)
            }
        };
        this.freqTipsRender = function(index, tips1) {
            var keyword = this.data.freqKey[index];
            var lastDate = new Date(keyword.time * 1000);
            var dateString = lastDate.getFullYear() + "年" + (lastDate.getMonth() + 1) + "月" + lastDate.getDate() + "日";
            tips1.append('<div class="history_title1">最后搜索时间：</div>');
            var history_content = $("<div></div>").appendTo(tips1).wrap('<div class="history_content1"></div>');
            var recommend = $("<div></div>").appendTo(tips1).wrap('<div class="history_content2"></div>');
            $('&#8226;&nbsp;<a href="history.html?t=' + keyword.time + '">' + dateString + "</a>").appendTo(history_content);
            recommend.append('<p style="text-align:center;padding-top:20px"><img src="http://cache.soso.com/img/web/loading_0.gif"></img></p>');
            renderOtherSearch(recommend, keyword.key, "w.idx.his.often.r")
        }
    };
    ICenterApp.msgbox = function(data, parent, conf) {
        BaseModule.call(this, data, parent, conf);
        if (typeof(ICenterApp.msgbox.__initialize) == "undefined") {
            ICenterApp.msgbox.prototype.showWenWen = function() {
                if (ICenter.Utils.isEmpty(this.data.wenwen) || ICenter.Utils.isEmpty(this.data.wenwen.msg)) {
                    return
                }
                this.content.empty();
                for (var i = 0; i < this.data.wenwen.msg.length; i++) {
                    var msg = this.data.wenwen.msg[i];
                    var title = decodeURIComponent(msg.title);
                    if (title.length > 30) {
                        title = title.substr(0, 29) + "..."
                    }
                    var url = decodeURIComponent(msg.url);
                    var linkMark = (url.indexOf("?") == -1) ? "?": "&";
                    this.content.append('<li><div class="icon_wen_star1"></div><a href="' + url + linkMark + 'pid=w.idx.info.wenwen&ch=w.idx.info.wenwen" target="_blank">' + title + "</a></li>")
                }
                this.restoreTag(this.wenwenMsgNum)
            };
            ICenterApp.msgbox.prototype.showWeb = function() {
                if (ICenter.Utils.isEmpty(this.data.web.msg)) {
                    return
                }
                this.content.empty();
                for (var i = 0; i < this.data.web.msg.length; i++) {
                    var msg = this.data.web.msg[i];
                    var item = $('<li><div class="icon_s_star2"></div><a href="' + decodeURIComponent(msg.url) + '&pid=w.idx.info.www&ch=w.idx.info.www" target="_blank">' + decodeURIComponent(msg.title) + "</a></li>");
                    item.appendTo(this.content)
                }
                this.restoreTag(this.webMsgNum)
            };
            ICenterApp.msgbox.prototype.restoreTag = function(num) {
                this.content.find("li:gt(9)").css("display", "none");
                this.tag.unbind("click").html("查看全部");
                this.isFold = true;
                var obj = this;
                var msgUnfold = function() {
                    obj.tag.html("查看10条").attr("class", "zdq_more3");
                    obj.content.find("li:gt(9)").css("display", "block")
                };
                var msgFold = function() {
                    obj.tag.html("查看全部").attr("class", "zdq_more4");
                    obj.content.find("li:gt(9)").css("display", "none")
                };
                this.tag.click(function() {
                    if (obj.isFold) {
                        msgUnfold.apply(obj)
                    } else {
                        msgFold.apply(obj)
                    }
                    obj.isFold = !obj.isFold
                });
                if (num > 10) {
                    this.tag.css("display", "block")
                } else {
                    this.tag.css("display", "none")
                }
            };
            ICenterApp.msgbox.prototype.showLatest = function() {
                this.content.empty();
                if (!ICenter.Utils.isEmpty(this.data.web) && !ICenter.Utils.isEmpty(this.data.web.msg)) {
                    for (var i = 0; i < this.data.web.msg.length; i++) {
                        var msg = this.data.web.msg[i];
                        this.content.append('<li><div class="icon_s_star2"></div><a href="' + decodeURIComponent(msg.url) + '&pid=w.idx.info.www&ch=w.idx.info.www" target="_blank">' + decodeURIComponent(msg.title) + "</a></li>")
                    }
                }
                if (!ICenter.Utils.isEmpty(this.data.wenwen) && !ICenter.Utils.isEmpty(this.data.wenwen.msg)) {
                    for (var i = 0; i < this.data.wenwen.msg.length; i++) {
                        var msg = this.data.wenwen.msg[i];
                        var title = decodeURIComponent(msg.title);
                        if (title.length > 30) {
                            title = title.substr(0, 29) + "..."
                        }
                        var url = decodeURIComponent(msg.url);
                        var linkMark = (url.indexOf("?") == -1) ? "?": "&";
                        this.content.append('<li><div class="icon_wen_star1"></div><a href="' + url + linkMark + 'pid=w.idx.info.wenwen&ch=w.idx.info.wenwen" target="_blank">' + title + "</a></li>")
                    }
                }
                this.restoreTag(this.webMsgNum + this.wenwenMsgNum)
            };
            ICenterApp.msgbox.prototype.showTab = function() {
                var msgNum = (data.wenwen ? Number(data.wenwen.num) : 0) + (data.web ? Number(data.web.num) : 0);
                var buf = new StringBuffer();
                buf.append("<a>全部消息(" + msgNum + ")</a>");
                var funcArr = [this.showLatest];
                if (this.data.web && this.data.web.num != 0 && this.data.wenwen && this.data.wenwen.num != 0) {
                    buf.append("  |  <a>搜索订阅(").append(this.data.web.num).append(")</a>");
                    funcArr.push(this.showWeb);
                    buf.append("  |  <a>我的问问(").append(this.data.wenwen.num).append(")</a>");
                    funcArr.push(this.showWenWen)
                }
                this.tab.html("");
                $(buf.toString()).appendTo(this.tab);
                return funcArr
            };
            ICenterApp.msgbox.__initialize = true
        }
        ICenter.HTML.drawTitle1.apply(this, ["消息提醒"]);
        this.init = function() {
            st_get("msgbox", "w.idx.info.show", 0);
            if (ICenter.Utils.isEmpty(data) || ((!data.wenwen || (data.wenwen && data.wenwen.num == 0)) && (!data.web || (data.web && data.web.num == 0)))) {
                $(parent).remove();
                return
            }
            $(this.parent).attr("class", "zdq1");
            this.isFold = true;
            this.container = $('<div class="container"></div>').appendTo(this.parent);
            this.tab = $('<div class="s_tab">').appendTo(this.container);
            this.content = $('<ul class="zdq_content"></ul>').appendTo(this.container);
            this.webMsgNum = 0;
            this.wenwenMsgNum = 0;
            if (!ICenter.Utils.isEmpty(this.data.web) && !ICenter.Utils.isEmpty(this.data.web.msg)) {
                this.webMsgNum = this.data.web.msg.length
            }
            if (!ICenter.Utils.isEmpty(this.data.wenwen) && !ICenter.Utils.isEmpty(this.data.wenwen.msg)) {
                this.wenwenMsgNum = this.data.wenwen.msg.length
            }
            var funcArr = this.showTab();
            this.tag = $("<a href='javascript:void(0);' class='zdq_more4'></a>").appendTo(this.container);
            this.tabContext = new TabContext(this.tab.children("a"), funcArr, this,
            function(i) {
                st_get("msgbox", "w.idx.info.nav", 0)
            });
            this.content.find("li:gt(9)").css("display", "none")
        }
    };
    ICenterApp.wenwen = function(data, parent, conf) {
        BaseModule.call(this, data, parent, conf);
        this.drawTitle(decodeURIComponent(this.conf.cname));
        if (typeof(ICenterApp.wenwen.__initialize) == "undefined") {
            ICenterApp.wenwen.prototype.contentClear = function() {
                this.content.remove();
                this.content.empty();
                if (this.subTab) {
                    this.subTab.remove();
                    this.subTab = null
                }
                if (this.more) {
                    this.more.remove();
                    this.more = null
                }
            };
            ICenterApp.wenwen.prototype.showNewUser = function() {
                $('<ul class="zdq_content"><li class="w_tips"><img class="wenwen_img" alt="" src="http://cache.soso.com/wenwen/i/icon.gif"/>问问是一个开放性的知识分享平台。通过问问你可以轻松与网友做互动回答，在问与答的讨论之间，找到满意的答案。<br/><input type="button" class="icon_button11" value="立即体验" /></a></li></ul>').find("input").click(function() {
                    window.open("http://wenwen.soso.com/z/MyHomeNew.htm?pid=w.idx.wenwen.exp&ch=w.idx.wenwen.exp", "_blank")
                }).end().appendTo(this.container)
            };
            ICenterApp.wenwen.prototype.showTab12 = function(data, subTitle, mUrl) {
                var num = data.categories.num;
                var cate = data.categories.content;
                this.subTab = $('<div class="s_tab5"></div>');
                var h5 = $("<h5></h5>").appendTo(this.subTab);
                $("<span>" + subTitle + "：</span>").appendTo(h5);
                for (var i = 0; i < num; i++) {
                    $('<a target="_blank" href="' + decodeURIComponent(cate[i].clink) + '?pid=w.idx.wenwen.cate&ch=w.idx.wenwen.cate">' + decodeURIComponent(cate[i].category) + "</a>").appendTo(h5)
                }
                this.subTab.appendTo(this.container);
                $('<a class="edit" target="_blank" href="' + mUrl + '">修改</a>').appendTo(this.subTab);
                if (!data.questions) {
                    return
                }
                var qNum = data.questions.num >= 5 ? 4 : data.questions.num;
                var q = data.questions.content;
                for (var i = 0; i < qNum; i++) {
                    var title = decodeURIComponent(q[i].title);
                    var category = decodeURIComponent(q[i].category);
                    if (title.length + category.length > 30) {
                        title = title.substr(0, 29 - category.length) + "..."
                    }
                    $('<li><a target="_blank" href="' + decodeURIComponent(q[i].tlink) + '?pid=w.idx.wenwen.ques&ch=w.idx.wenwen.ques">' + title + '</a>&nbsp;&nbsp;[<a class="a1" target="_blank" href="' + decodeURIComponent(q[i].clink) + '?pid=w.idx.wenwen.cate&ch=w.idx.wenwen.cate">' + category + "</a>]</li>").appendTo(this.content)
                }
                this.content.appendTo(this.container)
            };
            ICenterApp.wenwen.prototype.showTab3 = function(data) {
                var genField = function(word, url) {
                    if (url && url != "" && url != []) {
                        return '<a target="_blank" href="' + decodeURIComponent(url) + '">' + decodeURIComponent(word) + "</a>&nbsp;"
                    }
                    return '<span class="a1">' + decodeURIComponent(word) + "</span>&nbsp;"
                };
                var num = data.num;
                for (var i = 0; i < num; i++) {
                    var c = data.content[i];
                    var feildNum = c.desc.length;
                    var li = '<li><div class="t_left">';
                    if (feildNum == 3) {
                        var nick = decodeURIComponent(c.desc[0]);
                        var title = decodeURIComponent(c.desc[2]);
                        if (nick.length >= 12 && title.length >= 16) {
                            c.desc[2] = encodeURIComponent(title.substr(0, 12)) + "…"
                        }
                    }
                    for (var j = 0; j < feildNum; j++) {
                        if (j == 0) {
                            c.link[j] = c.link[j] + "&pid=w.idx.wenwen.friend&ch=w.idx.wenwen.friend"
                        }
                        li += genField(c.desc[j], c.link[j])
                    }
                    li += '</div><div class="t_right"><span class="a1">' + decodeURIComponent(c.time) + "</span></div></li>";
                    $(li).appendTo(this.content)
                }
                this.content.appendTo(this.container)
            };
            ICenterApp.wenwen.prototype.showTab45 = function(data, moreUrl) {
                var dNum = data.num;
                var d = data.content;
                for (var i = 0; i < dNum; i++) {
                    var title = decodeURIComponent(d[i].title);
                    var category = decodeURIComponent(d[i].category);
                    if (title.length + category.length > 30) {
                        title = title.substr(0, 29 - category.length) + "..."
                    }
                    $('<li><a target="_blank" href="' + decodeURIComponent(d[i].tlink) + '?pid=w.idx.wenwen.ques&ch=w.idx.wenwen.ques">' + title + '</a>&nbsp;&nbsp;[<a class="a1" target="_blank" href="' + decodeURIComponent(d[i].clink) + '?pid=w.idx.wenwen.ques&ch=w.idx.wenwen.cate">' + category + "</a>]</li>").appendTo(this.content)
                }
                this.content.appendTo(this.container);
                this.more = $('<a class="zdq_more1" href="' + moreUrl + '" target="_blank">详细&raquo;</a>').appendTo(this.container)
            };
            ICenterApp.wenwen.prototype.showExpertIn = function() {
                st_get("wenwen", "w.idx.wenwen.specialty", 0);
                this.contentClear();
                if (ICenter.Utils.isEmpty(this.data.spec) || this.data.spec.categories.num == 0) {
                    this.showNoContent("您没有设置我的擅长，", "设置", decodeURIComponent(this.data.setspec) + "?pid=w.idx.wenwen.set&ch=w.idx.wenwen.set");
                    return
                }
                this.showTab12(this.data.spec, "擅长领域", decodeURIComponent(this.data.setspec) + "?pid=w.idx.wenwen.mod&ch=w.idx.wenwen.mod")
            };
            ICenterApp.wenwen.prototype.showAttention = function() {
                st_get("wenwen", "w.idx.wenwen.favorite", 0);
                var refer = this;
                var show = function() {
                    refer.contentClear();
                    if (!refer.data.fav.categories || refer.data.fav.categories.num == 0) {
                        refer.showNoContent("您没有设置我的关注，", "设置", decodeURIComponent(refer.data.setfav) + "?pid=w.idx.wenwen.set&ch=w.idx.wenwen.set");
                        return
                    }
                    refer.showTab12(refer.data.fav, "关注领域", decodeURIComponent(refer.data.setfav) + "?pid=w.idx.wenwen.mod&ch=w.idx.wenwen.mod")
                };
                if (ICenter.Utils.isEmpty(this.data.fav)) {
                    ICenter.JsLoader.load(ICenter.baseUrl + "c=wenwen&tp=data&op=get&tab=2",
                    function(data) {
                        if (ICenter.Utils.isEmpty(data.wenwen) || ICenter.Utils.isEmpty(data.wenwen.fav)) {
                            refer.data.fav = {
                                categories: {
                                    num: 0
                                }
                            }
                        } else {
                            refer.data.fav = data.wenwen.fav
                        }
                        show()
                    })
                } else {
                    show()
                }
            };
            ICenterApp.wenwen.prototype.showFriends = function() {
                st_get("wenwen", "w.idx.wenwen.friend", 0);
                var refer = this;
                var show = function() {
                    refer.contentClear();
                    if (!refer.data.friendact || refer.data.friendact.num == 0) {
                        refer.showNoContent("暂无好友动态", null, null);
                        return
                    }
                    refer.showTab3(refer.data.friendact)
                };
                if (ICenter.Utils.isEmpty(this.data.friendact)) {
                    ICenter.JsLoader.load(ICenter.baseUrl + "c=wenwen&tp=data&op=get&tab=3",
                    function(data) {
                        if (ICenter.Utils.isEmpty(data.wenwen) || ICenter.Utils.isEmpty(data.wenwen.friendact)) {
                            refer.data.friendact = {
                                num: 0
                            }
                        } else {
                            refer.data.friendact = data.wenwen.friendact
                        }
                        show()
                    })
                } else {
                    show()
                }
            };
            ICenterApp.wenwen.prototype.showAsk = function() {
                st_get("wenwen", "w.idx.wenwen.ask", 0);
                var refer = this;
                var show = function() {
                    refer.contentClear();
                    if (!refer.data.ask || refer.data.ask.num == 0) {
                        refer.showNoContent("您还没有问过问题，现在就去提问吧！&nbsp;&nbsp;", "向网友提问", decodeURIComponent(refer.data.asklink) + "?pid=w.idx.wenwen.tips&ch=w.idx.wenwen.tips");
                        return
                    }
                    refer.showTab45(refer.data.ask, "http://wenwen.soso.com/z/MyAskedPendingRecordsNew.htm?pid=w.idx.wenwen.more&ch=w.idx.wenwen.more")
                };
                if (ICenter.Utils.isEmpty(this.data.ask)) {
                    ICenter.JsLoader.load(ICenter.baseUrl + "c=wenwen&tp=data&op=get&tab=4",
                    function(data) {
                        if (ICenter.Utils.isEmpty(data.wenwen) || ICenter.Utils.isEmpty(data.wenwen.ask)) {
                            refer.data.ask = {
                                num: 0
                            }
                        } else {
                            refer.data.ask = data.wenwen.ask
                        }
                        show()
                    })
                } else {
                    show()
                }
            };
            ICenterApp.wenwen.prototype.showAnswer = function() {
                st_get("wenwen", "w.idx.wenwen.ans", 0);
                var refer = this;
                var show = function() {
                    refer.contentClear();
                    if (!refer.data.answer || refer.data.answer.num == 0) {
                        refer.showNoContent("您还没有回答过问题，去问题库看看吧！&nbsp;&nbsp;", "去问题库", decodeURIComponent(refer.data.answerlink) + "?pid=w.idx.wenwen.tips&ch=w.idx.wenwen.tips");
                        return
                    }
                    refer.showTab45(refer.data.answer, "http://wenwen.soso.com/z/MyAnsweredRecordsNew.htm?pid=w.idx.wenwen.more&ch=w.idx.wenwen.more")
                };
                if (ICenter.Utils.isEmpty(this.data.answer)) {
                    ICenter.JsLoader.load(ICenter.baseUrl + "c=wenwen&tp=data&op=get&tab=5",
                    function(data) {
                        if (ICenter.Utils.isEmpty(data.wenwen) || ICenter.Utils.isEmpty(data.wenwen.answer)) {
                            refer.data.answer = {
                                num: 0
                            }
                        } else {
                            refer.data.answer = data.wenwen.answer
                        }
                        show()
                    })
                } else {
                    show()
                }
            };
            ICenterApp.wenwen.prototype.showNoContent = function(words, urlWords, url) {
                this.contentClear();
                if (urlWords != null) {
                    $('<li class="s_error">' + words + '<a target="_blank" href="' + url + '">' + urlWords + "</a></li>").appendTo(this.content)
                } else {
                    $('<li class="s_error">' + words + "</li>").appendTo(this.content)
                }
                this.content.appendTo(this.container)
            };
            ICenterApp.wenwen.__initialize = true
        }
        this.init = function() {
            if (!this.checkData()) {
                return
            }
            this.container = $("<div></div>").appendTo(this.parent);
            this.content = $('<ul class="zdq_content"></ul>');
            if (this.data.newuser == "0") {
                this.showNewUser();
                return
            }
            this.ct = $('<div class="s_tab"><div class="right_input1"><input type="button" value="提问" class="icon_button10" />&nbsp;&nbsp;<input type="button" value="回答" class="icon_button10" /></div><a>我的擅长</a>|<a>我的关注</a>|<a>好友动态</a>|<a>我的提问</a>|<a>我的回答</a></div>');
            var refer = this;
            this.ct.find("input:first").click(function() {
                window.open(decodeURIComponent(refer.data.asklink + "?pid=w.idx.wenwen.ask&ch=w.idx.wenwen.ask"), "_blank")
            }).end().find("input:last").click(function() {
                window.open(decodeURIComponent(refer.data.answerlink + "?pid=w.idx.wenwen.ans&ch=w.idx.wenwen.ans"), "_blank")
            });
            this.ct.appendTo(this.container);
            if (this.data.tab == 3 && !this.data.friendact) {
                this.data.tab = 0
            }
            var selTab = this.data.tab - 1;
            if (selTab < 0) {
                selTab = 0
            } else {
                if (this.data.tab == 2) {
                    this.data.spec = {
                        categories: {
                            num: 0
                        }
                    }
                } else {
                    if (this.data.tab == 3) {
                        this.data.spec = {
                            categories: {
                                num: 0
                            }
                        };
                        this.data.fav = {
                            categories: {
                                num: 0
                            }
                        }
                    }
                }
            }
            new TabContext(this.ct.children("a"), [this.showExpertIn, this.showAttention, this.showFriends, this.showAsk, this.showAnswer], this, null, null, selTab)
        }
    };
    ICenterApp.searchFreq = function(data, parent, conf) {
        BaseModule.call(this, data, parent, conf);
        this.container = $("<div></div>").appendTo(this.parent);
        if (!ICenter.Utils.isEmpty(ICenterApp.__allData.userinfo)) {
            var userinfo = ICenterApp.__allData.userinfo;
            var rank = (userinfo.rank > 100000) ? "10000+": userinfo.rank;
            this.container.append('<ul class="zdq_title1"><li class="title_l">搜索频率</li><li class="title_r"></li></ul>')
        }
        this.container.append('<div class="k"></div><div class="history"><span class="zs">&nbsp;&nbsp;&nbsp;&nbsp;</span>搜索总数：<strong>' + userinfo.snum + '</strong>　　<span class="pm">&nbsp;&nbsp;&nbsp;&nbsp;</span>排名：<strong>' + rank + "</strong></div>");
        this.tab = $('<div class="s_tab"><a>最近7天</a>  |  <a>最近30天</a></div>').appendTo(this.container);
        this.zdqContent = $('<ul class="zdq_content"></ul>').appendTo(this.container);
        this.holder = $("<div></div>").css("height", "150px").appendTo(this.zdqContent);
        this.holder.wrap("<div></div>");
        var convertLastData = function(data, dayNum) {
            var lastData = $.grep(data,
            function(n, i) {
                return (i >= data.length - dayNum)
            });
            var result = [];
            $.each(lastData,
            function(i, n) {
                var d = new Date();
                var timstamp = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() + 30000000;
                result.push([timstamp - (dayNum - i - 1) * 24 * 3600 * 1000, n])
            });
            return result
        };
        var getMax = function(data, dayNum) {
            var max = 0;
            for (var i = data.length - dayNum; i < data.length; i++) {
                if (data[i] > max) {
                    max = data[i]
                }
            }
            return max
        };
        this.plot = function(dayNum) {
            var data = convertLastData(this.data, dayNum);
            var max = getMax(this.data, dayNum);
            var minmax = {
                min: 0,
                max: max + 2,
                tickFormatter: function(num, obj) {
                    return num.toString()
                },
                tickSize: Math.ceil((max + 2) / 7)
            };
            var holder = this.holder;
            setTimeout(function() {
                $.plot(holder, [{
                    data: data,
                    lines: {
                        show: true
                    },
                    color: "#2c89f5",
                    shadowSize: 0
                }], {
                    xaxis: {
                        mode: "time",
                        tickSize: [parseInt(dayNum / 7), "day"],
                        timeformat: "%m-%d"
                    },
                    yaxis: minmax,
                    grid: {
                        backgroundColor: "#E5F7FD",
                        tickColor: "#fff",
                        borderColor: "#fff"
                    }
                })
            },
            0)
        };
        new TabContext(this.tab.children("a"), [function() {
            this.plot(7)
        },
        function() {
            this.plot(30)
        }], this,
        function(i) {
            st_get(this, "w.idx.history.freqNav", 0)
        })
    };
    ICenterApp.sobar = function(data, parent, conf) {
        BaseModule.call(this, data, parent, conf);
        this.drawTitle(decodeURIComponent(this.conf.cname));
        if (typeof(ICenterApp.sobar.__initialize) == "undefined") {
            ICenterApp.sobar.__initialize = true;
            ICenterApp.sobar.prototype._drawMsgs = function(msgs, ty) {
                var msgNum = (msgs.length > 4) ? 4 : msgs.length;
                for (var i = 0; i < msgNum; i++) {
                    var msg = msgs[i];
                    var title = decodeURIComponent(msg.title);
                    var tUrl = decodeURIComponent(msg.url);
                    var bName = decodeURIComponent(msg.barname);
                    var bUrl = decodeURIComponent(msg.burl);
                    if (title.length + bName.length > 30) {
                        title = title.substr(0, 29 - bName.length) + "..."
                    }
                    var item = '<li>[<a class="a1" target="_blank" href="' + bUrl + '&pid=w.idx.post.bar&ch=w.idx.post.bar">' + bName + '</a>]&nbsp;<a target="_blank" href="' + tUrl + '?pid=w.idx.post.post&ch=w.idx.post.post">' + title + "</a></li>";
                    this.zdqContent.append(item)
                }
                this.container.append(this.zdqContent);
                this.more = $('<a class="zdq_more1" href="http://post.soso.com/sobar.q?pid=w.idx.post.more&ch=w.idx.post.more&op=viewperson&uin=' + this.uin + (ty ? ("&ty=" + ty) : "") + '" target="_blank">详细&raquo;</a>');
                this.more.appendTo(this.container)
            };
            ICenterApp.sobar.prototype.showPosted = function() {
                this.clean();
                if (this.data.myPost && this.data.myPost.length > 0) {
                    this._drawMsgs(this.data.myPost, 1)
                } else {
                    this.zdqContent.append("<li class='s_error'>您还没有发表过主题，<a href='http://post.soso.com/sobar.q?op=viewperson&uin=" + this.uin + "&pid=w.idx.post.tips&ch=w.idx.post.tips' target='_blank'>了解更多</a>或<a target='_blank' href='http://post.soso.com/?pid=w.idx.post.tips&ch=w.idx.post.tips'>浏览精彩话题</a></li>")
                }
                st_get("sobar", "w.idx.post.nav", 0)
            };
            ICenterApp.sobar.prototype.showAttention = function() {
                this.clean();
                if (this.data.attention && this.data.attention.length > 0) {
                    this._drawMsgs(this.data.attention, 4)
                } else {
                    this.zdqContent.append("<li class='s_error'>您还没有设置关注的吧，<a target='_blank' href='http://post.soso.com/sobar.q?pid=w.idx.post.tips&ch=w.idx.post.tips&op=viewperson&uin=" + this.uin + "&ty=4'>进行设置</a></li>")
                }
                st_get("sobar", "w.idx.post.nav", 0)
            };
            ICenterApp.sobar.prototype.showRecommend = function() {
                this.clean();
                this._drawMsgs(this.data.recommend.content.item);
                st_get("sobar", "w.idx.post.nav", 0)
            };
            ICenterApp.sobar.prototype.clean = function() {
                if (!ICenter.Utils.isEmpty(this.zdqContent)) {
                    this.zdqContent.empty()
                }
                if (!ICenter.Utils.isEmpty(this.more)) {
                    this.more.remove()
                }
            }
        }
        this.init = function() {
            if (!this.checkData()) {
                return
            }
            this.uin = new Number(ICenter.Cookie.get("uin").substr(1)).toString();
            this.zdqContent = $('<ul class="zdq_content"></ul>');
            this.container = $("<div></div>").appendTo(this.parent);
            this.ct = $('<div class="s_tab"><a>网友正在关注</a>|<a>关注的搜吧动态</a>|<a>发表的主题</a></div>').appendTo(this.container);
            var selTab = (this.data.myPost && this.data.myPost.length > 0) ? 2 : selTab;
            selTab = (this.data.attention && this.data.attention.length > 0) ? 1 : selTab;
            selTab = (this.data.recommend.content.item && this.data.recommend.content.item.length) ? 0 : selTab;
            new TabContext(this.ct.children("a"), [this.showRecommend, this.showAttention, this.showPosted], this, null, null, selTab)
        }
    };
    ICenterApp.rebang = function(data, parent, conf) {
        BaseModule.call(this, data, parent, conf);
        ICenter.HTML.drawTitle1.apply(this, ["人向标"]);
        this.cClass = ICenter.Cookie.get("_rebang_cClass") ? ICenter.Cookie.get("_rebang_cClass") : 0;
        this.pClass = ICenter.Cookie.get("_rebang_pClass") ? ICenter.Cookie.get("_rebang_pClass") : 0;
        this.defaultCArray = ["全部", "人物", "品牌", "电影", "电视剧", "网站", "音乐", "游戏", "漫画", "小说", "汽车", "数码", "软件", "体育"];
        this.locArray = ["北京", "天津", "河北", "山西", "内蒙古", "江苏", "安徽", "山东", "辽宁", "吉林", "黑龙江", "上海", "浙江", "江西", "福建", "湖北", "湖南", "河南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "宁夏", "青海", "新疆", "香港", "澳门", "台湾"];
        this.loc = 0;
        this.moreLink = {
            "全部": "http://www.soso.com/bang/rxb_all.html",
            "品牌": "http://www.soso.com/bang/rxb_brand.html",
            "电影": "http://www.soso.com/bang/rxb_movie.html",
            "人物": "http://www.soso.com/bang/rxb_person.html",
            "电视剧": "http://www.soso.com/bang/rxb_tv.html",
            "音乐": "http://www.soso.com/bang/rxb_song.html",
            "游戏": "http://www.soso.com/bang/rxb_game.html",
            "小说": "http://www.soso.com/bang/rxb_novel.html",
            "体育": "http://www.soso.com/bang/rxb_sports.html",
            "数码": "http://www.soso.com/bang/rxb_digital.html",
            "软件": "http://www.soso.com/bang/rxb_software.html",
            "漫画": "http://www.soso.com/bang/rxb_comic.html",
            "汽车": "http://www.soso.com/bang/rxb_car.html",
            "网站": "http://www.soso.com/bang/rxb_site.html"
        };
        this.cArray = this.defaultCArray.slice(0);
        this.pArray = ["性别对比", "年龄对比", "地区对比", "全部"];
        this.timeOut = 300;
        this.uploadConfig = function() {
            var cClassArr = [];
            for (var i = 1; i <= 4; i++) {
                var cClassStr = this.cArray[i];
                for (var j = 0; j < this.defaultCArray.length; j++) {
                    if (this.defaultCArray[j] == cClassStr) {
                        cClassArr.push(j);
                        break
                    }
                }
            }
            ICenter.JsLoader.load(ICenter.baseUrl + "c=rebang&op=set&tp=data&config=" + cClassArr.join(";") + "||" + this.loc)
        };
        this.drawCMenu = function() {
            var cMenu = $('<div class="s_tab2"></div>');
            for (var i = 0; i < 5; i++) {
                if (i == this.cClass) {
                    cMenu.append('<div class="now">' + this.cArray[i] + "</div>")
                } else {
                    cMenu.append('<div class="other">' + this.cArray[i] + "</div>")
                }
            }
            var more = $('<div class="rxb_tips" style="display:none;"></div>').appendTo(cMenu);
            for (i = 5; i < this.cArray.length; i++) {
                $('<a href="javascript:void(0);">' + this.cArray[i] + "</a>").appendTo(more)
            }
            var other1 = $('<span class="other1">&#9660;</span>').appendTo(cMenu);
            var obj = this;
            new TabContext(cMenu.children("div").slice(0, 5),
            function(index) {
                return function() {
                    this.cClass = index;
                    this.show()
                }
            },
            this, null,
            function() {
                this.elemArr.attr("class", "other");
                this.getSelectedTabTitle().attr("class", "now")
            },
            this.cClass);
            more.children("a").each(function(index, elem) {
                $(elem).click(function() {
                    var cc = obj.cArray[index + 5];
                    obj.cArray.splice(index + 5, 1);
                    obj.cArray.splice(1, 0, cc);
                    obj.cClass = 1;
                    cMenu = obj.drawCMenu();
                    obj.cMenu.replaceWith(cMenu);
                    obj.cMenu = cMenu;
                    obj.show();
                    obj.uploadConfig()
                })
            });
            new ICenter.DelayDisplay({
                overDiv: other1,
                displayDiv: more,
                delay: 300,
                overFunc: function() {
                    other1.addClass("other2").removeClass("other1")
                },
                outFunc: function() {
                    other1.addClass("other1").removeClass("other2")
                }
            });
            return cMenu
        };
        this.initFromConfig = function() {
            var tmpCClass = this.data.cClass.slice(0);
            tmpCClass.sort(function(a, b) {
                return a - b
            });
            for (var i = tmpCClass.length - 1; i >= 0; i--) {
                this.cArray.splice(tmpCClass[i], 1)
            }
            for (var i = this.data.cClass.length - 1; i >= 0; i--) {
                this.cArray.splice(1, 0, this.defaultCArray[this.data.cClass[i]])
            }
            this.loc = this.data.loc
        };
        this.init = function() {
            this.initFromConfig();
            this.container = $("<div></div>").appendTo(this.parent);
            this.cMenu = this.drawCMenu().appendTo(this.container);
            this.pMenu = $('<div class="s_tab1"></div>').appendTo(this.container);
            for (var i = 0; i < this.pArray.length; i++) {
                if (i != 0) {
                    this.pMenu.append("|")
                }
                this.pMenu.append("<a>" + this.pArray[i] + "</a>")
            }
            var obj = this;
            new TabContext(this.pMenu.children("a"),
            function(i) {
                return function() {
                    obj.pClass = i;
                    obj.show()
                }
            },
            this,
            function(i) {},
            null, obj.pClass);
            this.bang = $("<div></div>").appendTo(this.container);
            this.more = $('<a class="zdq_more2" href="http://www.soso.com/bang/rxb_all.html?pid=w.idx.rxb.more&ch=w.idx.rxb.more" target="_blank">更多&raquo;</a>').appendTo(this.container);
            $('<div class="clear"></div>').appendTo(this.container)
        };
        this.onSelectLocation = function(selector) {
            for (var i = 0; i < this.locArray.length; i++) {
                if (selector.value == this.locArray[i]) {
                    this.loc = i;
                    break
                }
            }
            this.show();
            this.uploadConfig()
        };
        this.show = function() {
            ICenter.Cookie.set("_rebang_cClass", this.cClass);
            ICenter.Cookie.set("_rebang_pClass", this.pClass);
            var url = this.getFrameUrl();
            var obj = this;
            $.ajax({
                url: url,
                cache: false,
                success: function(html) {
                    obj.bang.html(decodeURIComponent(html));
                    obj.more.attr("href", obj.moreLink[obj.cArray[obj.cClass]] + "?pid=w.idx.rxb.more&ch=w.idx.rxb.more");
                    obj.bang.find("select:first").change(function() {
                        obj.onSelectLocation(this)
                    })
                },
                dataType: "text"
            })
        };
        this.getFrameUrl = function() {
            var cClass = this.cArray[this.cClass];
            var pClass = this.pArray[this.pClass];
            var loc = "";
            if (this.pClass == 2) {
                loc = "_" + encodeURIComponent(encodeURIComponent(this.locArray[this.loc]))
            }
            return "http://u.soso.com/icenter/tiles/rebang/" + encodeURIComponent(encodeURIComponent(cClass)) + "_" + encodeURIComponent(encodeURIComponent(pClass)) + loc + "_w3c"
        }
    };
    var ModuleConfig = function(configAll) {
        var addModDiv = this.addModDiv = $("#add_o1");
        var addModButton = $("#add_o");
        addModButton.click(function() {
            addModDiv.toggle();
            if ($(this).attr("class") == "add_o") {
                $(this).attr("class", "add_c")
            } else {
                $(this).attr("class", "add_o")
            }
            st_get(this, "w.idx.conf.o", 0)
        });
        this.removeModule = function(mod_id) {
            for (var i = 0; i < configAll.modules.length; i++) {
                if (configAll.modules[i].id == mod_id) {
                    configAll.modules.splice(i, 1);
                    $(configAll.modules[i].ename).remove();
                    break
                }
            }
            this.addModDiv.find("input[name='" + mod_id + "']").attr("checked", false)
        };
        this.uploadAddModule = function(callback) {
            var set1 = [];
            var set2 = [];
            var i, temp;
            this.addModDiv.find("input[checked=true]:checkbox").each(function() {
                set1.push(this.name)
            });
            for (i = 0; i < configAll.modules.length; i++) {
                set2.push(configAll.modules[i].id)
            }
            var indexOf = function(arr, elem) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == elem) {
                        return i
                    }
                }
                return - 1
            };
            var cross = [];
            for (i = 0; i < set2.length; i++) {
                if (indexOf(set1, set2[i]) != -1) {
                    cross.push(set2[i])
                }
            }
            for (i = 0; i < set2.length; i++) {
                temp = indexOf(cross, set2[i]);
                if ((temp) == -1) {
                    set2.splice(i--, 1)
                }
            }
            for (i = 0; i < set1.length; i++) {
                temp = indexOf(cross, set1[i]);
                if ((temp) == -1) {
                    set2.push(set1[i])
                }
            }
            this.upload(set2, callback)
        };
        this.upload = function(set2, callback) {
            ICenter.JsLoader.load("http://data.soso.com/icenter/i/index.php?c=config&op=set&tp=data&pageid=0&config=" + set2.join("|"), callback)
        };
        this.initCheckBox = function() {
            this.addModDiv.find("input:checkbox").attr("checked", false);
            for (var i = 0; i < configAll.modules.length; i++) {
                this.addModDiv.find("input[name='" + configAll.modules[i].id + "']").attr("checked", true)
            }
        };
        this.init = function() {
            this.initCheckBox();
            var refer = this;
            this.addModDiv.find("input[name='add']:button").click(function() {
                refer.uploadAddModule(function() {
                    window.location.reload();
                    st_get(this, "w.idx.conf.y", 0)
                })
            });
            this.addModDiv.find("input[name='cancel']:button").click(function() {
                refer.addModDiv.toggle();
                refer.initCheckBox();
                addModButton.attr("class", "add_o");
                st_get(this, "w.idx.conf.n", 0)
            });
            if (configAll.first) {
                addModButton.attr("class", "add_c");
                this.addModDiv.show()
            }
        }
    };
    $.fn.extend({
        disableSelection: function() {
            return this.attr("unselectable", "on").css("MozUserSelect", "none")
        }
    });
    $.extend({
        windowHeight: function() {
            if (document.documentElement && document.documentElement.clientHeight) {
                return document.documentElement.clientHeight
            } else {
                if (document.body) {
                    return document.body.clientHeight
                }
            }
        },
        offsetHeight: function() {
            if (document.body.offsetHeight) {
                return document.body.offsetHeight
            } else {
                return document.body.scrollHeight
            }
        },
        cancelSelection: function() {
            try {
                if (window.getSelection) {
                    if ($.browser.safari) {
                        window.getSelection().collapse()
                    } else {
                        window.getSelection().removeAllRanges()
                    }
                } else {
                    if (document.selection) {
                        if (document.selection.empty) {
                            document.selection.empty()
                        } else {
                            if (document.selection.clear) {
                                document.selection.clear()
                            }
                        }
                    }
                }
                return true
            } catch(e) {
                return false
            }
        }
    });
    var DragContext = function(selector, onDragEnd) {
        this.selector = selector;
        this.onDragEnd = onDragEnd;
        this.refreshPos = function() {
            this._dragElemArr = $(this.selector);
            this.positionArr = null;
            var positionArr = this.positionArr = new Array();
            this._dragElemArr.each(function(i, elem) {
                positionArr.push($(elem).offset().top)
            });
            var lastElem = this._dragElemArr.eq(this._dragElemArr.size() - 1);
            if (lastElem != null) {
                positionArr.push(lastElem.offset().top + lastElem.height())
            }
        };
        this.refreshPos();
        this.onDragStart = function() {};
        this.find_cloestIndex = function(mtop, mtop2, curr_index) {
            var min = Number.MAX_VALUE;
            var index = -1;
            if (this.positionArr[curr_index] < mtop) {
                mtop = mtop2
            }
            for (var i = 0; i < this.positionArr.length; i++) {
                var distance = Math.abs(this.positionArr[i] - mtop);
                if (min > distance) {
                    min = distance;
                    index = i
                }
            }
            if (index == curr_index || index == curr_index + 1) {
                return - 1
            }
            return index
        };
        this.setHolder = function(dragPos) {
            if (this.placeHolder == null) {
                var width = false;
                if (this._dragElemArr.size() > 0) {
                    width = this._dragElemArr.eq(0).width()
                }
                this.placeHolder = $('<div style="overflow:hidden;position:absolute;width:' + (width ? width: 0) + 'px;height:5px;background-color:#6699cc;" />')
            }
            if (dragPos == this._dragElemArr.size()) {
                var elem = this._dragElemArr[dragPos - 1];
                var offset = $(elem).offset();
                this.placeHolder.css({
                    top: (offset.top + $(elem).height() + 7) + "px",
                    left: (offset.left + "px")
                });
                this.placeHolder.insertAfter(elem)
            } else {
                var elem = this._dragElemArr[dragPos];
                var offset = $(elem).offset();
                this.placeHolder.css({
                    top: (offset.top - 7) + "px",
                    left: offset.left + "px"
                });
                this.placeHolder.insertBefore(elem)
            }
        };
        this.removePlaceHolder = function() {
            if (!ICenter.Utils.isEmpty(this.placeHolder)) {
                this.placeHolder.remove();
                this.placeHolder = null
            }
        };
        this.removeHelper = function() {
            if (this.helper != null) {
                this.helper.remove();
                this.helper = null
            }
        };
        this.selectCache = null;
        this.disableSelect = function() {
            var bs = document.body.style;
            if (bs.MozUserSelect != undefined) {
                this.selectCache = bs.MozUserSelect;
                bs.MozUserSelect = "none"
            } else {
                if (bs.KhtmlUserSelect != undefined) {
                    this.selectCache = bs.KhtmlUserSelect;
                    bs.KhtmlUserSelect = "none"
                } else {
                    if ($.browser.msie) {
                        this.selectCache = document.body.onselectstart;
                        document.body.onselectstart = function() {
                            return false
                        }
                    } else {
                        this.selectCache = document.body.onmousedown;
                        document.body.onmousedown = function() {
                            return false
                        }
                    }
                }
            }
        };
        this.restoreSelect = function() {
            var bs = document.body.style;
            if (bs.MozUserSelect != undefined) {
                bs.MozUserSelect = this.selectCache
            } else {
                if (bs.KhtmlUserSelect != undefined) {
                    bs.KhtmlUserSelect = this.selectCache
                } else {
                    if ($.browser.msie) {
                        document.body.onselectstart = this.selectCache
                    } else {
                        document.body.onmousedown = this.selectCache
                    }
                }
            }
        };
        var scrollInterval = null;
        var offsetHeight = $.offsetHeight();
        this.scroll = function(event) {
            if (scrollInterval != null) {
                if (event.clientY > 30 && event.clientY < ($.windowHeight() - 30)) {
                    clearInterval(scrollInterval);
                    scrollInterval = null
                } else {
                    return
                }
            }
            if (event.clientY < 30) {
                scrollInterval = setInterval(function() {
                    var top = $(window).scrollTop();
                    if (top - 30 < 0) {
                        $(window).scrollTop(0);
                        clearInterval(scrollInterval);
                        scrollInterval = null
                    }
                    $(window).scrollTop(top - 10)
                },
                20)
            }
            if (event.clientY > $.windowHeight() - 30) {
                scrollInterval = setInterval(function() {
                    var top = $(window).scrollTop();
                    $(window).scrollTop(top + 10)
                },
                20)
            }
        };
        this.init = function() {
            var obj = this;
            this._dragElemArr.children(".zdq_title").disableSelection().css("cursor", "move").bind("mousedown",
            function(event) {
                $.cancelSelection();
                obj.disableSelect();
                obj.removeHelper();
                obj.removePlaceHolder();
                obj.refreshPos();
                var div = $(this).parent();
                Logger.debug("down " + div.attr("id"));
                var orgPos = obj._dragElemArr.index(div);
                var orgHeight = div.height();
                var orgOffset = div.offset();
                obj.helper = div.clone(true).css({
                    position: "absolute",
                    top: (orgOffset.top + 3) + "px",
                    left: (orgOffset.left + 10) + "px",
                    filter: "alpha(opacity = 50)",
                    opacity: 0.5,
                    width: div.width(),
                    border: "3px solid #000"
                }).appendTo(div.parent());
                obj.mouseXStart = event.pageX;
                obj.mouseYStart = event.pageY;
                $(document).bind("mousemove",
                function(event) {
                    var offsetLeft = event.pageX - obj.mouseXStart;
                    if (offsetLeft > 180) {
                        offsetLeft = 180
                    }
                    if (offsetLeft < -180) {
                        offsetLeft = -180
                    }
                    var mleft = parseInt(orgOffset.left) + offsetLeft;
                    var mtop = parseInt(orgOffset.top) + (event.pageY - obj.mouseYStart);
                    obj.helper.css("top", mtop + "px").css("left", mleft + "px");
                    obj.scroll(event);
                    var dragPos = obj.find_cloestIndex(mtop, mtop + orgHeight, obj._dragElemArr.index(div));
                    if (dragPos != -1) {
                        obj.setHolder(dragPos)
                    } else {
                        obj.removePlaceHolder()
                    }
                });
                $(document).bind("mouseup",
                function(event) {
                    var mtop = parseInt(orgOffset.top) + (event.pageY - obj.mouseYStart);
                    var dragPos = obj.find_cloestIndex(mtop, mtop + orgHeight, obj._dragElemArr.index(div));
                    if (dragPos != -1) {
                        if (dragPos == obj._dragElemArr.size()) {
                            div.insertAfter(obj._dragElemArr[dragPos - 1])
                        } else {
                            div.insertBefore(obj._dragElemArr[dragPos])
                        }
                    }
                    obj.removeHelper();
                    obj.removePlaceHolder();
                    obj.refreshPos();
                    if ($.isFunction(obj.onDragEnd)) {
                        obj.onDragEnd(orgPos, dragPos)
                    }
                    $(document).unbind("mouseup");
                    $(document).unbind("mousemove");
                    clearInterval(scrollInterval);
                    scrollInterval = null;
                    obj.restoreSelect()
                });
                obj.onDragStart()
            })
        }
    };
    ICenterApp.init = function() {
        var openFirstTimeTips = function(ev) {
            var msgbox = new ICenter.MessageBox({
                maskStyle: {
                    "background-color": "#000",
                    height: "100%",
                    opacity: "0.3",
                    position: "absolute",
                    width: "100%",
                    "z-index": "100",
                    filter: "alpha(opacity = 50)"
                },
                message: '<iframe height="400" frameborder="0" width="690" scrolling="no" src="firstTime.html?ch=w.help" marginwidth="0" marginheight="0"></iframe>'
            });
            msgbox.show();
            $(document.body).click(function() {
                ICenter.MessageBox.hide();
                $(document.body).unbind("click")
            });
            if (typeof ev != "undefined") {
                ICenter.Event.stop(ev)
            }
            st_get("icenter", "w.idx.help", 0)
        };
        var timeout = 50;
        var reloadModule = function(name) {
            Logger.point(name + "Start");
            setTimeout(function() {
                ICenter.JsLoader.load(ICenter.baseUrl + "c=" + name + "&tp=data&op=get",
                function(json) {
                    try {
                        ICenterApp.modules[name].data = json[name];
                        ICenterApp.modules[name].init();
                        ICenter.Loading.requestAdd();
                        Logger.point(name + "Finish")
                    } catch(exception) {
                        ICenter.Utils.exceptionHandler(exception)
                    }
                })
            },
            timeout);
            timeout += 50
        };
        var initDrag = function() {
            var left = ".u_home_l > .zdq2";
            var right = ".u_home_r > .zdq3:gt(0)";
            var dargEnd = function() {
                var modules = [];
                var each = function() {
                    var id = $(this).attr("id");
                    modules.push(ICenterApp.modules[id].conf.id)
                };
                $(left).each(each);
                $(right).each(each);
                ICenterApp._moduleConfig.upload(modules)
            };
            new DragContext(left, dargEnd).init();
            new DragContext(right, dargEnd).init()
        };
        var doFill = function(allData, i) {
            var conf = allData.config.modules;
            if (conf[i].pos == 0) {
                eval("new ICenterApp." + conf[i].ename + "(allData." + conf[i].ename + ").init();");
                return
            }
            var divClass;
            var modClass;
            if (conf[i].pos == 1) {
                divClass = ".u_home_l";
                modClass = "zdq2"
            } else {
                if (conf[i].pos == 2) {
                    divClass = ".u_home_r";
                    modClass = "zdq3"
                }
            }
            var appElem = $('<li class="' + modClass + '" id="' + conf[i].ename + '"></li>').appendTo(divClass);
            var run = "var module = new ICenterApp." + conf[i].ename + "(allData." + conf[i].ename + ",appElem,conf[i]);";
            eval(run);
            ICenterApp.modules[conf[i].ename] = module;
            if (typeof(eval("allData." + conf[i].ename)) != "undefined") {
                module.init()
            } else {
                reloadModule(conf[i].ename)
            }
        };
        var fillApp = function(allData) {
            ICenterApp.modules = {};
            var conf = allData.config.modules;
            for (var i = 0; i < conf.length; i++) {
                try {
                    doFill(allData, i)
                } catch(exception) {
                    ICenter.Utils.exceptionHandler(exception)
                }
            }
            initDrag()
        };
        $(".nav_left .wh a").click(openFirstTimeTips);
        ICenter.JsLoader.load("http://data.soso.com/icenter/i/init.php?pageid=0",
        function(__allData) {
            ICenterApp.__allData = __allData;
            ICenterApp.timestamp = __allData.timestamp;
            if (typeof __allData.__isLogin != "undefined" && __allData.__isLogin == false) {
                ICenter.ptlogin2.ptOpen();
                return
            }
            var _GET = ICenter.Utils.readGet();
            if (_GET.cid == "s.im.empty" && __allData.config.first && ICenter.Utils.isEmpty(ICenter.Cookie.get("__visited"))) {
                openFirstTimeTips();
                ICenter.Cookie.set("__visited", 1)
            }
            ICenterApp._moduleConfig = new ModuleConfig(__allData.config);
            ICenterApp._moduleConfig.init();
            fillApp(__allData)
        })
    };
    function generateSideMenu(parent, qq) {
        var href = [null, null, "http://post.soso.com/sobar.q?op=viewperson&uin=" + qq + "&pid=w.idx.lNav.post&ch=w.idx.lNav.post", null, "http://i.soso.com/music/home/?pid=w.idx.lNav.music&ch=w.idx.lNav.music", "http://i.soso.com/p.q?op=browser&sUin=" + qq + "&pid=w.idx.lNav.image&ch=w.idx.lNav.image", null, ];
        $(parent).find("a").each(function(i, a) {
            if (href[i] != null) {
                $(a).attr("href", href[i])
            }
        })
    }
    ICenterApp.userinfo = function(data, parent, conf) {
        if (ICenter.Utils.isEmpty(data)) {
            data = {
                face: "1",
                qq: "0"
            }
        }
        BaseModule.call(this, data, parent, conf);
        this.showUserMore = function(userinfo) {
            if (userinfo.isLogin) {
                var masterNick = ICenter.Cookie.get("__nick");
                var masterUin = new Number(ICenter.Cookie.get("uin").substr(1)).toString();
                masterNick = (masterNick == "" || masterNick == null) ? masterUin: decodeURIComponent(masterNick);
                var persnalMenu = [{
                    title: "我的问问",
                    url: "http://wenwen.soso.com/z/MyHomeNew.htm?pid=w.idx.hNav.wenwen&ch=w.idx.hNav.wenwen"
                },
                {
                    title: "我的搜吧",
                    url: "http://post.soso.com/sobar.q?op=viewperson&uin=" + masterUin + "&pid=w.idx.hNav.post&ch=w.idx.hNav.post"
                },
                {
                    title: "我的百科",
                    url: "http://baike.soso.com/myHome.htm?pid=w.idx.hNav.baike&ch=w.idx.hNav.baike"
                },
                {
                    title: "音乐地盘",
                    url: "http://i.soso.com/music/home/?pid=w.idx.hNav.music&ch=w.idx.hNav.music"
                },
                {
                    title: "图片册",
                    url: "http://i.soso.com/p.q?op=browser&sUin=" + masterUin + "&pid=w.idx.hNav.image&ch=w.idx.hNav.image"
                }];
                $("#s_user_more .drop_menu a").each(function(i, obj) {
                    $(obj).html(persnalMenu[i].title);
                    if (persnalMenu[i].title != "我的搜吧") {
                        $(obj).attr("href", persnalMenu[i].url).attr("target", "_blank")
                    } else {
                        $(obj).attr("href", persnalMenu[i].url)
                    }
                });
                $("#s_nick").attr("href", "http://u.soso.com/icenter/htdocs/index.html").html(ICenter.HTML.escape(masterNick));
                $("#s_logout").click(function() {
                    ICenter.ptlogin2.ptFini()
                })
            } else {
                $("#s_user").html("<li><a id='s_login' href='#'>登录</a></li>").click(function() {
                    ICenter.ptlogin2.ptOpen()
                })
            }
            $("#s_user").css("display", "block")
        };
        this.getTitle = function(leval) {
            switch (leval) {
            case 0:
                return "搜索游民";
            case 1:
                return "搜索实习生";
            case 2:
                return "搜索员工";
            case 3:
                return "搜索副组长";
            case 4:
                return "搜索组长";
            case 5:
                return "搜索副总监";
            case 6:
                return "搜索总监";
            case 7:
                return "搜索副总经理";
            case 8:
                return "搜索总经理";
            case 9:
                return "搜索副总裁";
            case 10:
                return "搜索总裁";
            case 11:
                return "搜索董事";
            case 12:
                return "搜索董事长"
            }
        };
        this.getSLLevelIcon = function(level, light) {
            if (level == 0 || light == 0) {
                return "icon_s_star1"
            } else {
                if (level >= 1 && level <= 4) {
                    return "icon_s_star9"
                } else {
                    if (level >= 5 && level <= 8) {
                        return "icon_s_star10"
                    } else {
                        if (level >= 9) {
                            return "icon_s_star11"
                        } else {
                            return "icon_s_star2"
                        }
                    }
                }
            }
        };
        this.genSLBaseContent = function(userinfo) {
            var percent = parseInt((userinfo.score - userinfo.levelScore) / (userinfo.nextLevelScore - userinfo.levelScore) * 100);
            return '<li><dl><dt class="dt1">头衔：<a href="http://u.soso.com/icenter/htdocs/xuetang/index.html?ch=w.idx.card.post#level" class="dt_a">' + this.getTitle(userinfo.level) + '</a></dt><dt class="dt1">搜索经验：<span>' + userinfo.score + '</span></dt></dl></li><li class="borb"><div class="lv' + userinfo.level + '" title="等级' + userinfo.level + '"></div><div class="bor" title="升到等级' + (userinfo.level + 1) + "还需" + (userinfo.nextLevelScore - userinfo.score) + '点经验"><div style="width:' + percent + '%;"></div></div><a href="http://u.soso.com/icenter/htdocs/xuetang/index.html?ch=w.idx.card.rule" class="dt_a">升级规则</a></li>'
        };
        this.genSLMoreContent = function(userinfo) {
            var more = $('<li><dl><dd class="dt2"><div class="icon_s_star1"></div><span></span></dd><dd class="dt3"><div class="icon_button7"></div></dd></dl></li>');
            var refer = this;
            var afterLight = function() {
                $("#s_feeds ul>li:eq(2)").html('&nbsp;|&nbsp;<a style="color:red;" href="http://u.soso.com/icenter/htdocs/xuetang/index.html?ch=xt.jy">SOSO图标如何成长？</a>');
                more.find(".icon_button12").remove().end().find(".icon_button13").remove().end().find("span").html("搜搜图标已在QQ上点亮").end().find(".dt2 div").attr("class", refer.getSLLevelIcon(userinfo.level, 1))
            };
            this.slContent.append(more);
            if (userinfo.light == 1) {
                $("#s_feeds ul").append('<li>&nbsp;|&nbsp;<a style="color:red;" href="http://u.soso.com/icenter/htdocs/xuetang/index.html?ch=xt.jy">SOSO图标如何成长？</a></li>')
            } else {
                $("#s_feeds ul").append('<li>&nbsp;|&nbsp;<a style="color:red;" href="http://u.soso.com/icenter/htdocs/xuetang/tips1.html?pid=w.idx.xt&ch=xt.top">如何点亮？</a></li>')
            }
            if (userinfo.score < 50) {
                more.find(".icon_button7").html('<a href="http://u.soso.com/icenter/htdocs/xuetang/tips1.html?pid=w.idx.xt&ch=xt.1">如何点亮</a>').end().find("span").html("搜搜图标未点亮")
            } else {
                if (userinfo.score >= 50 && userinfo.light == 0 && userinfo.everLight == 0) {
                    more.find("span").html("搜搜图标未点亮").end().find(".icon_button7").attr("class", "icon_button12").click(function() {
                        refer.lightUp(1, afterLight);
                        st_get(this, "w.idx.ui.lt", 1);
                        return false
                    })
                } else {
                    if (userinfo.score >= 50 && userinfo.light == 1) {
                        more.find(".icon_button7").remove().end().find("span").html("搜搜图标已在QQ上点亮").end().find(".dt2 div").attr("class", this.getSLLevelIcon(userinfo.level, userinfo.light))
                    } else {
                        if (userinfo.score >= 50 && userinfo.light == 0 && userinfo.everLight == 1) {
                            more.find(".icon_button7").attr("class", "icon_button13").click(function() {
                                refer.lightUp(1, afterLight);
                                st_get(this, "w.idx.ui.lt", 1);
                                return false
                            }).end().find("span").html("长期未登录, 图标熄灭")
                        }
                    }
                }
            }
        };
        this.showSearchLife = function() {
            this.slContainer = $("<li class='zdq3'></li>");
            this.slContainer.append('<ul class="zdq_title1"><li class="title_l">搜索名片</li></ul>');
            this.slContent = $('<ul class="zdq_content"></ul>').appendTo(this.slContainer);
            $("#u_rightmain .u_home_r").prepend(this.slContainer);
            this.slContent.html(this.genSLBaseContent(this.data));
            this.genSLMoreContent(this.data)
        };
        this.init = function() {
            var userinfo = this.data;
            var nick = ICenter.Cookie.get("__nick");
            nick = (nick == "" || nick == null) ? userinfo.qq: decodeURIComponent(nick);
            var face = ICenter.Cookie.get("__face");
            face = (face == "" || face == null) ? 1 : face;
            face = parseInt((parseInt(face) + 3) / 3);
            var facePic = "http://cache.soso.com/img/i/faces/u" + face + ".gif";
            this.showUserMore(userinfo);
            $("#u_info dt").html('<img src="' + facePic + '" alt="用户头像" onerror="this.src=\'http://cache.soso.com/img/i/faces/u1.gif\';" / >');
            $("#u_info .name").html(ICenter.HTML.escape(nick));
            $("#u_info dd:last").html("(" + userinfo.qq + ")");
            this.showSearchLife(userinfo);
            generateSideMenu("#u_sidebar", userinfo.qq)
        };
        this.lightUp = function(isLight, afterLightUp) {
            var url = ICenter.baseUrl + "c=userinfo&op=light&tp=up";
            ICenter.JsLoader.load(url,
            function(result) {
                if (ICenter.Utils.isEmpty(result.userinfo) || result.userinfo == false) {
                    alert("服务繁忙，请您稍后再试")
                } else {
                    alert("您的搜搜业务图标已点亮，请5分钟后登录QQ查看！\n注：QQ2009正式版SP1以上版本支持");
                    if (typeof(afterLightUp) == "function") {
                        afterLightUp()
                    }
                }
            })
        }
    }
})();