/*
 * Compressed by JSA(www.xidea.org)
 */
var $JSI = {},
$import = function(M, Q) {
    if (this.document) {
        var Z = "<script src='data:text/javascript,$import()'><\/script>",
        $ = this.XMLHttpRequest;
        function U($) {}
        if (this.ActiveXObject) {
            if (!$) {
                var T = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
                $ = function() {
                    while (true) {
                        try {
                            return new ActiveXObject(T[0])
                        } catch($) {
                            if (!T.shift()) throw $
                        }
                    }
                }
            }
            Z = Z.replace(/'.*'/, W + "lazy-trigger.js")
        }
    }
    var A = {},
    W = $JSI.scriptBase,
    P = [];
    function S(C, $, _, F) {
        $.initialize && $.initialize();
        var K = $.name.replace(/\.|$/g, "/") + _,
        H = C[K],
        I = $.loaderMap[_];
        if (H) {
            if (H[0]) return;
            else if (F) {
                if (H[F]) return;
                else H[F] = 1
            } else H[0] = 1
        } else C[K] = H = {},
        H[F || 0] = 1,
        H[1] = !I && D($.name, _) == null;
        if (I) {
            if (B = I.dependenceMap) {
                if (F) {
                    var B = B[F],
                    G = B && B.length;
                    while (G--) {
                        var J = B[G];
                        S(C, J[0], J[1], J[2])
                    }
                }
                for (F in B) {
                    var A = B[F],
                    G = A.length;
                    while (G--) {
                        J = A[G];
                        S(C, J[0], J[1], J[2])
                    }
                }
            } else H[0] = 1
        } else {
            B = $.dependenceMap[_],
            G = B && B.length;
            while (G--) {
                var J = B[G],
                E = J[3];
                if (!F || !E || F == E) S(C, J[0], J[1], J[2])
            }
        }
    }
    function D(_, $) {
        return (_ = Q[_]) && _[$]
    }
    $JSI.preload = function(_, A, $) {
        if (Q[_]) {
            _ = Q[_];
            if ($ == null) for (var B in A) _[B] = A[B];
            else _[A] = $
        } else if ($ == null) Q[_] = A;
        else(Q[_] = {})[A] = $
    };
    function C(_, $) {
        A[this.name = _] = this;
        this.scriptBase = W + (_.replace(/\./g, "/")) + "/";
        this.dependenceMap = [];
        this.loaderMap = {};
        this.scriptObjectMap = {};
        this.objectScriptMap = {};
        this.objectMap = {};
        try {
            if ($ instanceof Function) $.call(this);
            else M.call(this, $)
        } catch(B) {
            throw B
        }
    }
    C.prototype = {
        initialize: function() {
            this.initialize = 0;
            var J = this.objectScriptMap,
            K = this.scriptObjectMap,
            $ = this.dependenceMap,
            R = {},
            L = $.length;
            while (L--) {
                var Q = $[L],
                G = Q[0],
                B = Q[1],
                H = Q[2],
                A = this,
                M = 0,
                F = 0,
                D = 0,
                S = "*" == G,
                I = B.indexOf("*") + 1;
                if (S || I) {
                    var C;
                    if (S) var _ = K;
                    else {
                        var P = J[G];
                        if (P) M = G;
                        else P = G; (_ = {})[P] = 0
                    }
                    if (I) {
                        if (I > 1) {
                            A = O(E(B));
                            D = 1
                        }
                        C = A.scriptObjectMap
                    } else {
                        var N = J[B];
                        if (N) F = B;
                        else if (K[B]) N = B;
                        else {
                            D = 1;
                            A = E(B);
                            B = B.substring(A.name.length + 1);
                            A = O(A);
                            N = A.objectScriptMap[B];
                            if (N) F = B;
                            else N = B
                        } (C = {})[N] = 0
                    }
                    for (N in C) {
                        Q = [A, N, F, M, H, F ? [F.replace(/\..*$/, "")] : A.scriptObjectMap[N]];
                        for (P in _) if (D || P != N)(R[P] || (R[P] = [])).push(Q)
                    }
                } else {
                    P = J[G],
                    N = J[B];
                    if (P) M = G;
                    else P = G;
                    if (N) F = B;
                    else if (K[B]) N = B;
                    else {
                        A = E(B);
                        B = B.substr(A.name.length + 1);
                        A = O(A);
                        N = A.objectScriptMap[B];
                        if (N) F = B;
                        else N = B
                    } (R[P] || (R[P] = [])).push([A, N, F, M, H, F ? [F.replace(/\..*$/, "")] : A.scriptObjectMap[N]])
                }
            }
            this.dependenceMap = R
        },
        addScript: function(D, F, C, B) {
            var E = this.scriptObjectMap[D];
            if (E) var G = E[E.length - 1];
            else E = (this.scriptObjectMap[D] = []);
            if (F) if (F instanceof Array) for (var A = 0,
            $ = F.length; A < $; A++) {
                var _ = F[A];
                this.objectScriptMap[_] = D;
                _ = _.replace(/\..*$/, "");
                if (G != _) E.push(G = _)
            } else {
                this.objectScriptMap[F] = D;
                F = F.replace(/\..*$/, "");
                if (G != F) E.push(F)
            }
            C && this.addDependence(D, C);
            B && this.addDependence(D, B, 1)
        },
        addDependence: function(A, _, B) {
            if (_ instanceof Array) {
                var $ = _.length;
                while ($--) this.addDependence(A, _[$], B)
            } else this.dependenceMap.push([A, _, B])
        },
        setImplementation: function($) {
            if ($.charAt(0) == ".") {
                $ = this.name + $;
                while ($ != ($ = $.replace(/\w+\.\.\//, "")));
            }
            this.implementation = $
        }
    };
    function J(A, _, $) {
        var B = A.loaderMap[_];
        if (!B) if (A.scriptObjectMap[_]) {
            if (A.initialize) A.initialize();
            B = new I(A, _)
        }
        if (B.initialize) B.initialize($)
    }
    function G(_, B) {
        J(_[0], _[1], _[2]);
        var C = _[0].objectMap,
        A = _[5],
        $ = A.length;
        while ($--) {
            var D = A[$];
            B.push(D);
            B[D] = C[D]
        }
    }
    function O($) {
        while ($ && $.implementation) $ = R($.implementation, true);
        return $
    }
    function R(B, $) {
        do {
            if (A[B]) return A[B];
            if (A[B] === undefined) {
                var _ = D(B, "") || Q[B] === undefined && U(W + B.replace(/\.|$/g, "/") + "__package__.js");
                if (_) return A[B] || new C(B, _);
                A[B] = 0
            }
            if ($) break
        } while ( B = B . replace (/\.?[^\.]+$/, ""))
    }
    function E(_) {
        var $ = _.lastIndexOf("/");
        if ($ > 0) return R(_.substr(0, $).replace(/\//g, "."), true);
        else if (($ = _.indexOf(":")) > 0) return R(_.substr(0, $), true);
        else return R(_.replace(/\.?[^\.]+$/, ""))
    }
    function I(_, $) {
        this.name = $;
        this.scriptBase = _.scriptBase;
        var A = F(_, this);
        if (A) return A;
        X(_, this)
    }
    function F(B, D) {
        var J = D.name,
        I = B.dependenceMap[J],
        A = "this.hook=function(n){return eval(n)}",
        C = [],
        _ = I && I.length;
        while (_--) {
            var E = I[_],
            $ = E[3] || 0;
            if (E[4]) {
                C.push.apply(C, E[5]);
                if (F) {
                    if (F[$]) F[$].push(E);
                    else F[$] = [E]
                } else {
                    var F = D.dependenceMap = {};
                    D.initialize = H;
                    F[$] = [E]
                }
            } else {
                G(E, C);
                if (E = B.loaderMap[J]) return E
            }
        }
        if (C.length) {
            D.varMap = C;
            A += ";var " + C.join(",").replace(/([^,]+)/g, "$1 = this.varMap.$1")
        }
        D.varText = A
    }
    function X(A, F) {
        var B = F.name,
        _ = A.name,
        H = D(_, B);
        A.loaderMap[B] = F;
        try {
            if (H instanceof Function) {
                Q[_][B] = "";
                return H.call(F)
            } else return M.call(F, "eval(this.varText);" + (H || U(A.scriptBase + B)))
        } catch(I) {
            throw I
        } finally {
            delete F.varMap;
            delete F.varText;
            var E = A.scriptObjectMap[B],
            $ = E.length,
            G = A.objectMap;
            if ($ == 1) G[E = E[0]] = F.hook(E);
            else {
                var C = F.hook("[" + E.join(",") + "]");
                while ($--) G[E[$]] = C[$]
            }
        }
    }
    function H(_) {
        var D = this.dependenceMap,
        C = [],
        B = this.name,
        A = D[0];
        if (A) {
            delete D[0];
            var $ = A.length;
            while ($--) G(A[$], C)
        }
        if (_) {
            if (A = D[_]) {
                delete D[_];
                $ = A.length;
                while ($--) G(A[$], C)
            }
            for ($ in D) break;
            if (!$) this.dependenceMap = this.initialize = 0
        } else {
            for (_ in D) {
                A = D[_];
                delete D[_];
                $ = A.length;
                while ($--) G(A[$], C)
            }
            this.dependenceMap = this.initialize = 0
        }
        if (C.length) {
            this.varMap = C;
            C = C.join(",");
            try {
                this.hook(C.replace(/([^,]+)/g, "$1 = this.varMap.$1"))
            } catch(E) {
                throw E
            }
            delete this.varMap
        }
    }
    function K(_, $, A) {
        J(_, _.objectScriptMap[$], $, true);
        var B = $.indexOf(".");
        if (B > 0) $ = $.substr(0, B);
        B = _.objectMap[$];
        return A != null ? A[$] = B: B
    }
    function _(A, _, C) {
        J(A, _);
        var B = A.scriptObjectMap[_];
        if (C != null) for (var $ = 0; $ < B.length; $++) C[B[$]] = A.objectMap[B[$]]
    }
    var N, B = {};
    function L(B, $) {
        var _ = document.createElement("script");
        N.appendChild(_);
        function A() {
            if ($ && /complete|loaded|undefined/.test(this.readyState)) {
                $();
                $ = null
            }
        }
        _.onload = A;
        _.onreadystatechange = A;
        _.src = W + B.replace(/\.js$/, "__preload__.js");
        _ = null
    }
    function Y(B, A, C, _) { (function $() {
            if (_.length) {
                while (D.apply(0, _[0]) != null) if (_.length > 1) _[0] = _.pop();
                else {
                    C($import(B, A));
                    return
                }
                setTimeout($, 15)
            } else C($import(B, A))
        })()
    }
    function V(H, C, I) {
        N = N || document.body || document.documentElement;
        var A = E(H),
        _ = H.substr(A.name.length + 1),
        $ = [],
        J = [];
        A = O(A);
        if (_ == "*") for (_ in A.scriptObjectMap) S(J, A, _);
        else if (H.indexOf("/") + 1) S(J, A, _);
        else S(J, A, A.objectScriptMap[_], _);
        if (I instanceof Function) {
            for (var G in J) if (J[G][1]) $.push(G);
            J = [];
            function F() {
                if (G = $.pop()) {
                    var _ = G.replace(/\/[^\/]+$/, "").replace(/\//g, "."),
                    A = G.substr(_.length + 1);
                    if (D(_, A) == null) {
                        L(G, F);
                        J.push([_, A])
                    } else F()
                } else Y(H, C, I, J)
            }
            F()
        } else if (N.tagName < "a") {
            for (G in J) if (J[G][1] && !B[G]) {
                B[G] = true;
                $.push(G)
            }
            document.write($.join("\n").replace(/.js$/gm, "__preload__.js").replace(/.+/g, "<script src='" + W + "$&'><\/script>"));
            P.push(function() {
                while (G = $.pop()) delete B[G];
                $import(H, C)
            });
            document.write(Z)
        } else $import(H, C)
    }
    return function(C, B, D) {
        if (/\:$/.test(C)) return O(E(C));
        $ = arguments.length;
        if ($ == 1) B = this;
        else if ($ == 2) {
            if (/boolean|function/.test(typeof B)) D = B,
            B = this
        } else if ($ == 0) {
            D = P.shift();
            return D && D()
        }
        if (D) return V(C, B, D);
        var F = E(C),
        $ = C.substr(F.name.length + 1);
        if (C.indexOf("/") + 1) _(O(F), $, F = B);
        else {
            F = O(F);
            if ($) if ($ == "*") {
                for (var A in F.scriptObjectMap) _(F, A, B);
                F = B
            } else F = K(F, $, B)
        }
        return F
    }
} (function() {
    return eval(arguments[0])
},
{}) $JSI.preload("org.jside", '',
function() {
    this.setImplementation("com.baidu.my")
});
$JSI.preload("com.baidu.my.ui", '',
function() {
    this.setImplementation("com.baidu.my")
});
$JSI.preload("com.baidu.my.util", '',
function() {
    this.setImplementation("com.baidu.my")
});
$JSI.preload("com.baidu.my", '',
function() {
    this.addScript("1.js", ["setupDateGrid", "startUp", "Dialog", 'login', 'addStatistics', "showTooltip"])
});
$JSI.preload('com.baidu.my', '1.js',
function() {
    eval(this.varText);
    /*
 * Compressed by JSA(www.xidea.org)
 */
    _ = window.XMLHttpRequest;
    if (typeof ActiveXObject != "undefined") if (location.protocol == "file:" || !_) var $ = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"],
    _ = function() {
        while (true) {
            try {
                return new ActiveXObject($[0])
            } catch(_) {
                if (!$.shift()) throw _
            }
        }
    }
    function F() {
        var D = 0,
        C = [];
        if (this == F) {
            var B = arguments[D++];
            C.push(arguments[D++], ":\n\n")
        }
        while (D < arguments.length) {
            var $ = arguments[D++];
            if ($ instanceof Object) {
                C.push($, "{");
                for (var _ in $) C.push(_, ":", $[_], ";");
                C.push("}\n")
            } else C.push($, "\n")
        }
        if (B >= 0) {
            C.push("\n\n\u7ee7\u7eed\u5f39\u51fa ", C[0], " \u65e5\u5fd7?\r\n");
            if (!confirm(C.join(""))) A = B + 1
        } else confirm(C.join(""))
    }
    F.setLevel = function($) {
        if (D[$]) A = $;
        else {
            var _ = D.length;
            $ = $.toLowerCase();
            while (_--) if (D[_] == $) {
                A = _;
                return
            }
            F("unknow logLevel:" + $)
        }
    };
    function C(_, $) {
        if (!this.confirm) this.confirm = print;
        return function() {
            if (_ >= A) {
                var B = [_, $];
                B.push.apply(B, arguments);
                F.apply(F, B)
            }
        }
    }
    var D = "trace,debug,info,warn,error,fatal".split(","),
    A = 1,
    G = D.length;
    while (G--) {
        var B = D[G];
        F[B] = C(G, B)
    }
    function I(A, B, $, C) {
        this.xhr = new _();
        this.onComplete = $;
        this.onStep = C;
        this.options = B = new H(A, B);
        this.headers = {
            Accept: "'text/javascript, text/html, application/xml, text/xml, */*'",
            "Content-Type": B.contentType
        };
        var D = this;
        this.onreadystatechange = function() {
            var $ = D.xhr.readyState;
            D.onStep && D.onStep($);
            if ($ == 4) {
                var _ = D.isSuccess();
                D.onComplete && D.onComplete(_);
                if (_) D.onSuccess && D.onSuccess();
                else D.onFailure && D.onFailure();
                D.free = true;
                D.xhr.onreadystatechange = Function.prototype
            }
        };
        this.free = true
    }
    I.prototype = {
        send: function(C, A) {
            this.free = false;
            var _ = this.headers,
            E = this.options,
            $ = E.method.toUpperCase(),
            D = E.url;
            if (!/POST|GET/.test($)) {
                D += ";method=" + $;
                $ = "POST"
            }
            if (arguments.length < 2) A = E.sync;
            if ("POST" == $) if (this.xhr.overrideMimeType && /Gecko\/200[0-4]/.test(navigator.userAgent)) _.Connection = "close";
            this.xhr.open($, D, !A);
            this.xhr.onreadystatechange = this.onreadystatechange;
            for (var B in _) this.xhr.setRequestHeader(B, _[B]);
            this.xhr.send(C)
        },
        isSuccess: function() {
            var $ = this.getStatus();
            return $ ? $ >= 200 && $ < 300 : null
        },
        getStatus: function() {
            var $ = this.xhr;
            return $.readyState == 4 && (($.responseText != null || $.responseXML) && $.status)
        },
        putHeader: function($, _) {
            this.headers[$] = _;
            return this
        },
        getHeader: function($) {
            if (this.xhr.readyState >= 3) return this.xhr.getResponseHeader($)
        },
        evalResult: function() {
            if (this.xhr.readyState == 4) return window.eval(this.xhr.responseText)
        },
        getResult: function() {
            if (/\/xml/.test(this.getHeader("Content-Type"))) {
                if (this.xhr.readyState == 4) return this.xhr.responseXML
            } else if (this.xhr.readyState >= 3) return this.xhr.responseText
        },
        getXML: function() {
            if (this.xhr.readyState == 4) return this.xhr.responseXML
        },
        getText: function() {
            if (this.xhr.readyState >= 3) return this.xhr.responseText
        }
    };
    function H($, _) {
        this.url = $;
        if (_.constructor == String) this.method = _;
        else for (var A in _) this[A] = _[A]
    }
    H.prototype = {
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        encoding: "UTF-8"
    }
    function startUp() {
        addStatistics("k1=load&k2=resource&k3=" + (new Date - window._ST));
        O.initialize(V)
    }
    function login() {
        N.popup(null, {})
    }
    function V($) {
        U($, S.hotWidgets = []);
        new I("/widget/recommend.action", "GET",
        function() {
            var _ = this.getStatus();
            if (_ < 400 && _ >= 200) {
                var A = Q.decode(this.getText()),
                $ = [];
                $.push.apply($, A.hotest);
                $.push.apply($, A.newest);
                S.hotWidgets = $
            }
        }).send()
    }
    function U($) {
        try {
            W($);
            T()
        } catch(_) {}
    }
    function W(C) {
        J.setTheme(C.theme || 0, true);
        var B = document.createElement("div");
        document.body.appendChild(B);
        B.innerHTML = K.render({
            frameHTML: C.layout.render(C, S.hotWidgets),
            headHTML: M.render()
        });
        setTimeout(function() {
            document.body.style.zoom = 1;
            document.body.style.zoom = ""
        },
        0);
        var T = 0,
        A = 0,
        N = L(),
        U = false;
        function H() {
            if (!this[N]) {
                A++;
                this[N] = true;
                if (U) if (A == T) addStatistics("k1=load&k2=widget-loaded&k3=" + (new Date - window._ST));
                else if (A == T / 2) addStatistics("k1=load&k2=widget-half-loaded&k3=" + (new Date - window._ST))
            }
        }
        for (var O = 0; O < C.pages.length; O++) {
            var $ = C.pages[O];
            for (var _ = 0; _ < $.columns.length; _++) {
                var D = $.columns[_];
                for (var F = 0; F < D.widgets.length; F++) {
                    var I = D.widgets[F];
                    T++;
                    I.inject("repaint", null, H);
                    I.initialize()
                }
            }
        }
        U = true;
        var R = "baidu_my_pg",
        P = window.location.search.slice(1).split("&");
        for (var O = 0,
        G = P.length; O < G; O++) {
            var Q = P[O].split("=");
            if (Q[0] == "tn") {
                R = Q[1].length > 0 ? Q[1] : R;
                break
            }
        }
        E("tnInput").value = R;
        Suggest.initialize("searchInput", "searchSuggest")
    }
    function T() {
        T = Function.prototype;
        setInterval(function() {
            var $ = P.getCommand();
            if ($) {
                try {
                    if ($.name == "addWidget") O.isTypeExist($.type, $.config,
                    function(B, A) {
                        var _ = true;
                        if (A[0]) {
                            var C = B.pages[A[1]];
                            if (C.select) _ = confirm("\u60a8\u5df2\u7ecf\u6dfb\u52a0\u4e86\u8be5\u6a21\u5757\uff0c\u8981\u7ee7\u7eed\u6dfb\u52a0\u5417?");
                            else _ = confirm("\u60a8\u5df2\u7ecf\u5728\u201c" + R(C.title) + "\u201d\u6dfb\u52a0\u4e86\u8be5\u6a21\u5757\uff0c\u8981\u7ee7\u7eed\u6dfb\u52a0\u5417?")
                        }
                        _ && O.addWidgets([{
                            type: $.type,
                            config: $.config
                        }],
                        function(_, $) {
                            $.layout.repaint(function() {
                                for (var $ = 0; $ < _.length; $++) _[$].initialize()
                            })
                        })
                    });
                    else if ($.name == "setTheme") J.setTheme($.id)
                } catch(_) {}
            }
        },
        300)
    }
    function E($) {
        if ($.constructor == String) $ = document.getElementById($);
        if ($) {
            var A = a;
            if ($.wrapVersion == A.wrapVersion) return $;
            for (var _ in A) $[_] = A[_]
        }
        return $
    }
    var c = function($) {
        if ($.constructor == String) $ = document.createElement($);
        return E($)
    },
    Y = 0,
    f = {
        uid: function($) {
            var _ = $.id || ($.id = $.uniqueID);
            if (!_) $.id = _ = "__$puid" + Y++;
            return _
        },
        attach: function(A, $, _) {
            if (A.attachEvent) A.attachEvent("on" + $, _);
            else A.addEventListener($, _, false);
            return A
        },
        detach: function(A, $, _) {
            if (A.detachEvent) A.detachEvent("on" + $, _);
            else A.removeEventListener($, _, false);
            return A
        },
        show: function(_, $) {
            _.style.display = $ || "";
            return _
        },
        hide: function($) {
            $.style.display = "none";
            return $
        },
        remove: function($) {
            $.parentNode.removeChild($)
        },
        setStyle: function(A, _, $) {
            if (arguments.length == 2) {
                if (_.constructor == String) {
                    A.style.cssText = _;
                    A.setAttribute("style", _)
                } else for ($ in _) A.style[$] = _[$]
            } else A.style[_] = $;
            return A
        },
        addClass: function($, _) {
            return this.replaceClass($, _, _)
        },
        removeClass: function($, _) {
            return this.replaceClass($, _, null)
        },
        replaceClass: function(A, D, $) {
            var B = A.className;
            if (B) {
                B = B.split(/\s+/);
                var C = B.length;
                while (C--) {
                    var _ = B[C];
                    if (_ == D || _ == $) B.splice(C, 1)
                }
                $ && B.push($);
                A.className = B.join(" ")
            } else A.className = $ || A.className;
            return A
        },
        switchClass: function(D, A, $) {
            var E = D.className;
            if (E) {
                E = E.split(/\s+/);
                var C = E.length,
                B = true;
                while (C--) {
                    var _ = E[C];
                    if (_ == A) {
                        E.splice(C, 1);
                        if (B) {
                            E.push($);
                            B = false
                        }
                    } else if (_ == $) {
                        E.splice(C, 1);
                        if (B) {
                            E.push(A);
                            B = false
                        }
                    }
                }
                if (B) E.push(A);
                D.className = E.join(" ")
            } else D.className = A;
            return D
        },
        setOpacity: function(_, $) {
            if (!_.currentStyle || !_.currentStyle.hasLayout) _.style.zoom = 1;
            if (window.ActiveXObject) _.style.filter = ($ == 1) ? "": "alpha(opacity=" + $ * 100 + ")";
            _.style.opacity = $;
            return _
        },
        getRuntimeStyle: function($) {
            return $.runtimeStyle || document.defaultView.getComputedStyle($, null)
        },
        getPosition: function(B) {
            var _ = 0,
            A = 0;
            do {
                _ += B.offsetLeft || 0;
                A += B.offsetTop || 0;
                var $ = this.getRuntimeStyle(B);
                _ -= Z($.marginLeft);
                A -= Z($.marginTop)
            } while ( B = B . offsetParent ) return {
                left: Math.floor(_),
                top: Math.floor(A)
            }
        },
        getRegion: function(B) {
            if (B.getBoundingClientRect) var E = B.getBoundingClientRect(),
            D = X.scrollLeft,
            A = X.scrollTop,
            $ = {
                left: E.left + D,
                right: E.right + D,
                top: E.top + A,
                bottom: E.bottom + A
            };
            else {
                var $ = this.getPosition(B),
                C = this.getRuntimeStyle(B),
                _ = $.top += Z(C.marginTop);
                $.bottom = _ + B.offsetHeight;
                _ = $.left += Z(C.marginLeft);
                $.right = _ + B.offsetWidth
            }
            return $
        }
    },
    X = document.documentElement,
    a = c.prototype = {
        wrapVersion: 0
    },
    e = {};
    function b(_, $) {
        c[_] = $;
        a[_] = function() {
            var _ = [this];
            _.push.apply(_, arguments);
            return $.apply(c, _)
        }
    }
    function Z(B, A) {
        if (A && A.charAt(0) != "0") {
            var $ = A.replace(/(\d*).*/, "$1"),
            _ = A.substr($.length).toLowerCase();
            switch (_) {
            case "%":
                $ = B.offsetParent.clientWidth * 100 / $;
                break;
            case "px":
                $ = $ * 1;
                break;
            default:
                return $ * d(_)
            }
            return parseInt($, 10) || 0
        }
        return 0
    }
    function d(A) {
        var _ = e[A];
        if (!_) {
            var $ = new c("div");
            document.body.appendChild($);
            $.style.width = 128 + A;
            _ = e[A] = $.clientWidth / 128;
            document.body.removeChild($)
        }
        return _
    }
    c.extend = function(_) {
        for (var $ in _) b($, _[$]);
        a.wrapVersion++
    };
    c.extend(f) var l = function($) {
        this.data = $
    };
    l.prototype.render = function($) {
        return this.data.call(null, k($))
    };
    function k($) {
        var A = {
            __select_tab__: g,
            __province_render__: j,
            __date_render__: h,
            __contains_string__: i
        };
        for (var _ in $) A[_] = $[_];
        return A
    }
    var o = 0;
    function p($) {
        if ($ && $.stopPropagation) $.stopPropagation();
        else($ || window.event).cancelBubble = true
    }
    function L() {
        return (new Date() * 1 + o++).toString(36)
    }
    function n($) {
        return $.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;")
    }
    function R($) {
        return $.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
    }
    function m($) {
        function _() {}
        _.prototype = $;
        return new _()
    }
    if (typeof document.recalc != "undefined" && /MSIE [678]/.test(navigator.appVersion)) var q = function($) {
        if ($) s();
        else setTimeout(s, 100)
    };
    else q = Function.prototype;
    function s() {
        document.recalc();
        r();
        setTimeout(r, 100);
        document.recalc()
    }
    function r() {
        document.body.style.display = "none";
        document.body.style.display = ""
    }
    function v(_, A) {
        var $ = {};
        for (var B in _) $[B] = t(_[B], A);
        return $
    }
    function z(_, $) {
        return t(_, $)
    }
    function x($) {
        for (var _ in $) this.removeAction($[_])
    }
    function u(_) {
        var $ = $0.length;
        while ($--) if ($0[$] == _) $0[$] = null
    }
    var $0 = [],
    w = "$" + L();
    function t(_, $) {
        _ = y(_, $);
        _ = [w + "(" + _ + ",this"];
        return function() {
            var A = _.slice(0);
            for (var $ = 0; $ < arguments.length; $++) {
                A.push(",");
                A.push(Q.encode(arguments[$]))
            }
            A.push(",event)");
            return A.join("")
        }
    }
    function y(_, A) {
        var $ = $0.length;
        $0[$] = A ?
        function() {
            return _.apply(A, arguments)
        }: _;
        return $
    }
    window[w] = function($, A) {
        var _ = $0[$];
        return _.apply(A, Array.prototype.slice.call(arguments, 2))
    }
    var Q = {
        decode: function($) {
            return window.eval("(" + $ + ")")
        },
        encode: A0,
        clone: C0
    },
    _0 = /["\\\x00-\x1f\x7f-\x9f]/g,
    B0 = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    function D0($) {
        var _ = B0[$];
        if (_) return _;
        _ = $.charCodeAt().toString(16);
        return "\\u00" + (_.length > 1 ? _: "0" + _)
    }
    function A0(_) {
        switch (typeof _) {
        case "undefined":
            return "null";
        case "string":
            _0.lastIndex = 0;
            return '"' + (_0.test(_) ? _.replace(_0, D0) : _) + '"';
        case "object":
            if (!_) return "null";
            var C = [];
            if (_ instanceof Array) {
                var $ = _.length;
                while ($--) C[$] = A0(_[$]) || "null";
                return "[" + C.join(",") + "]"
            }
            for (var B in _) {
                var A = A0(_[B]);
                if (A) C.push(A0(B) + ":" + A)
            }
            return "{" + C.join(",") + "}";
        case "number":
            if (!isFinite(_)) _ = "null";
        default:
            return String(_)
        }
    }
    function C0(_) {
        if (_ instanceof Array) {
            var B = [],
            $ = _.length;
            while ($--) B[$] = C0(_[$]);
            return B
        } else if (_ instanceof Function) return _;
        else if (_ instanceof Object) {
            B = {};
            for (var A in _) B[String(A)] = C0(_[A]);
            return B
        } else return _
    }
    function i(_, A) {
        if (A == _) return true;
        var $ = _ && _.length;
        while ($--) if (A == _[$]) return true
    }
    var g = z(function(_, D, F) {
        var H = this.parentNode,
        C = H.childNodes,
        J;
        for (var $ = 0; $ < C.length; $++) {
            var K = E(C[$]);
            if (K == this) {
                J = $;
                K.addClass("tab-selected")
            } else K.removeClass("tab-selected")
        }
        C = H.nextSibling.childNodes;
        for ($ = 0; $ < C.length; $++) {
            K = E(C[$]);
            if ($ == J) K.style.display = "block";
            else K.style.display = "none"
        }
        q();
        if (F != null) {
            var I = H;
            while (I = I.parentNode) if (I.getAttribute("name") == "widget") {
                var A = I.id,
                B = F0.getWidget(A);
                if (D == "config") {
                    var G = B.config;
                    if (G[F] != J) {
                        G[F] = J;
                        O.updateWidgetConfig(A, G, null)
                    }
                } else if (D == "this") B[F] = J;
                break
            }
        }
        return J
    }),
    I0 = z(function(A) {
        var B = this.options[this.selectedIndex],
        C = E0[B.value || B.text];
        if (!C) return;
        var E = K0(this);
        while (E.options.length) E.removeChild(E.options[0]);
        C = C.city;
        for (var _ = 0,
        $ = C.length; _ < $; _++) {
            var D = new c("option");
            D.innerHTML = C[_];
            E.appendChild(D)
        }
    });
    function J0(B) {
        for (var _ in E0) {
            var A = E0[_].city,
            $ = A.length;
            while ($--) if (A[$] == B) return _
        }
    }
    function j(C, B, D) {
        var A = ['<select onchange="', I0(D), '">'],
        $ = J0(C),
        E = "\u5317\u4eac",
        F = (E0[$] || E0[E]).city;
        for (var H in E0) {
            A.push("<option value='", H, "'");
            if (H == $) A.push(" selected='selected'");
            A.push(">", E0[H].name, "</option>")
        }
        A.push("</select><select");
        A.push(" name='", B, "'>");
        for (var _ = 0; _ < F.length; _++) {
            var G = F[_];
            A.push("<option value='", G, "'");
            if (C == G) A.push(" selected='selected'");
            A.push(">", G, "</option>")
        }
        A.push("</select>");
        return A.join("")
    }
    var H0 = z(function() {
        var $ = K0(this);
        M0.call($)
    })();
    function M0() {
        var F = K0(this),
        A = N0(this),
        E = A.options[A.selectedIndex].value,
        _ = this.options[this.selectedIndex].value,
        B = (F.selectedIndex || 0) + 1;
        while (F.options.length) {
            var $ = F.options[0];
            F.removeChild($)
        }
        var C = L0(E, _);
        for (var D = 1; D <= C; D++) {
            $ = new c("option");
            $.innerHTML = D;
            $.value = [E, _, D].join("-");
            if (D == B) $.selected = true;
            F.appendChild($)
        }
    }
    var G0 = z(M0)();
    function h($, E) {
        var $ = $.split("-"),
        D = $[0] * 1,
        _ = $[1] * 1,
        $ = $[2] * 1,
        A = ['<select onchange="', H0, '">'];
        for (var C = -1; C < 2; C++) {
            A.push("<option value='", D + C, "'");
            if (!C) A.push(" selected='selected'");
            A.push(">", D + C, "</option>")
        }
        A.push('</select>\u5e74<select onchange="', G0, '">');
        for (C = 1; C <= 12; C++) {
            A.push("<option value='", C, "'");
            if (C == _) A.push("selected='selected'");
            A.push(">", C, "</option>")
        }
        A.push("</select>\u6708<select");
        A.push(" name='", E, "'>");
        var B = L0(D, _);
        for (C = 1; C <= B; C++) {
            A.push("<option value='", D, "-", _, "-", C, "'");
            if (C == $) A.push("selected='selected'");
            A.push(">", C, "</option>")
        }
        A.push("</select>\u65e5");
        return A.join("")
    }
    function L0(A, $) {
        var _ = new Date(A, $ - 1, 5);
        _.setDate(31);
        _ = _.getDate();
        if (_ < 30) _ = 31 - _;
        return _
    }
    function K0(_) {
        var $ = _.nextSibling;
        while ($ && $.nodeType != 1) $ = $.nextSibling;
        if ($ == null) {
            $ = _.parentNode;
            while (!$.nextSibling) $ = $.parentNode;
            $ = $.nextSibling
        }
        if ($.tagName == "SELECT") return $;
        K0($)
    }
    function N0(_) {
        var $ = _.previousSibling;
        while ($ && $.nodeType != 1) $ = $.previousSibling;
        if ($ == null) {
            $ = _.parentNode;
            while (!$.previousSibling) $ = $.parentNode;
            $ = $.previousSibling
        }
        if ($.tagName == "SELECT") return $;
        N0($)
    }
    function O0(A, _, C, B, $) {
        this.name = A;
        this.expires = C;
        this.domain = B;
        this.path = _;
        this.secure = $
    }
    function P0(_, B, A, $) {
        return (_ ? "; path=" + _: "") + (B ? "; expires=" + B.toGMTString() : "") + (A ? "; domain=" + A: "") + ($ ? "; secure": "")
    }
    O0.prototype.set = function($) {
        document.cookie = this.name + "=" + encodeURIComponent($) + P0(this.path, this.expires, this.domain, this.secure)
    };
    O0.prototype.remove = function() {
        document.cookie = this.name + "=" + P0(this.path, new Date(0), this.domain, this.secure)
    };
    O0.prototype.get = function() {
        var $ = new RegExp("^(?:.*" + this.name + "=([^;]*))?.*");
        return (this.get = function() {
            var _ = document.cookie.replace($, "$1");
            return _ && decodeURIComponent(_)
        })()
    }
    function addStatistics($) {
        new I("/da/f.gif?" + $, "get",
        function() {}).send()
    }
    var U0 = "ibaidu2.0",
    Z0 = "widgetconfig",
    R0 = false,
    Y0 = {
        isDefaultConfig: function() {
            return R0
        },
        getGlobalConfig: function(A) {
            if (A) return g0;
            try {
                var $ = X0.get(U0);
                if ($) {
                    $ = Q.decode($);
                    if ($.username == null && $.appVersion != 2) {
                        $.appVersion = 2;
                        $.pages.splice(1, 0, e0);
                        this.saveGlobalConfig($)
                    }
                    return $
                }
                R0 = true;
                return g0
            } catch(_) {
                R0 = true;
                return g0
            }
        },
        getWidgetConfigMap: function(A) {
            if (A) return V0;
            try {
                var $ = X0.get(Z0);
                return $ ? Q.decode($) : V0
            } catch(_) {
                return V0
            }
        },
        saveGlobalConfig: function($) {
            X0.set(U0, Q.encode($))
        },
        saveWidgetConfigMap: function($) {
            X0.set(Z0, Q.encode($))
        },
        clear: function() {
            try {
                X0.remove(U0);
                X0.remove(Z0)
            } catch($) {}
        }
    },
    b0 = navigator.userAgent.toLowerCase().indexOf("opera") != -1,
    c0 = !b0 && navigator.userAgent.toLowerCase().indexOf("msie") != -1,
    a0 = navigator.userAgent.toLowerCase().indexOf("khtml") != -1,
    W0 = !b0 && !a0 && (navigator.userAgent.toLowerCase().indexOf("gecko") != -1 && navigator.productSub >= 20030210),
    h0 = {
        title: "\u767e\u5ea6\u63a8\u8350",
        columns: [{
            width: "33%",
            widgets: [{
                id: "w2",
                type: "4",
                lastModfied: -1
            },
            {
                id: "w9",
                type: "3",
                lastModfied: -1
            }]
        },
        {
            width: "33%",
            widgets: [{
                id: "w3",
                type: "5",
                lastModfied: -1
            },
            {
                id: "w4",
                type: "10",
                lastModfied: -1
            },
            {
                id: "w5",
                type: "7",
                lastModfied: -1
            }]
        },
        {
            width: "33%",
            widgets: [{
                id: "w6",
                type: "1",
                lastModfied: -1
            },
            {
                id: "w7",
                type: "9",
                lastModfied: -1
            },
            {
                id: "w8",
                type: "8",
                lastModfied: -1
            }]
        }]
    },
    e0 = {
        title: "\u6211\u5728\u767e\u5ea6",
        systemId: "mybaidu",
        columns: [{
            width: "66%",
            widgets: [{
                id: "w21",
                type: "20",
                lastModfied: -1
            },
            {
                id: "w22",
                type: "23",
                lastModfied: -1
            },
            {
                id: "w23",
                type: "22",
                lastModfied: -1
            },
            {
                id: "w24",
                type: "19",
                lastModfied: -1
            }]
        },
        {
            width: "34%",
            widgets: [{
                id: "w25",
                type: "21",
                lastModfied: -1
            }]
        }]
    },
    g0 = {
        appVersion: 2,
        lastModified: -1,
        theme: 0,
        pages: [h0, e0]
    },
    V0 = {
        w2: {
            channel: "civilnews&tn=rss&sub=0",
            count: 5,
            showFirstDetail: true
        },
        w8: {
            channel: "1",
            count: 10
        },
        w9: {
            type: 1,
            count: 10
        },
        w7: {},
        w5: {
            sites: ["\u5929\u6c14\u9884\u62a5", "\u5730\u56fe\u641c\u7d22", "\u706b\u8f66\u8f66\u6b21", "\u822a\u73ed\u73ed\u6b21", "\u9152\u5e97\u67e5\u8be2", "\u7535\u89c6\u9884\u544a", "\u98df\u54c1\u4ef7\u683c", "\u5e38\u7528\u7535\u8bdd", "\u6587\u6863\u641c\u7d22", "\u624b\u673a\u53f7\u7801", "\u80a1\u7968\u4fe1\u606f", "\u8ba1\u7b97\u5668", "\u5ea6\u91cf\u8f6c\u6362", "\u82f1\u8bed\u8f9e\u5178", "IP\u5730\u5740", "\u5730\u533a\u533a\u53f7", "\u90ae\u653f\u7f16\u7801", "\u653f\u5e9c\u673a\u6784", "\u4ea4\u901a\u5904\u7f5a", "\u6d88\u8d39\u8005\u7ef4\u6743", "\u4e07\u5e74\u5386", "\u5386\u53f2\u4e0a\u7684\u4eca\u5929", "\u6210\u8bed\u8bcd\u5178", "\u6c49\u8bed\u5b57\u5178", "\u767e\u79d1\u8bcd\u5178", "\u8d27\u5e01\u5151\u6362"]
        }
    };
    if (c0) g0.pages[0].columns[0].widgets.unshift({
        id: "1",
        type: "2",
        lastModfied: -1
    });
    if (window.globalStorage) {
        try {
            var d0 = window.globalStorage[location.hostname],
            X0 = {
                set: function($, _) {
                    d0[$] = _;
                    return
                },
                get: function($) {
                    var _ = d0[$];
                    if (_ != null) return _.value
                },
                remove: function($) {
                    d0.removeItem($)
                }
            }
        } catch(i0) {
            d0 = {};
            X0 = {
                set: function($, _) {
                    d0[$] = _;
                    return
                },
                get: function($) {
                    return d0[$]
                },
                remove: function($) {
                    delete d0[$]
                }
            };
            addStatistics("k1=error&k2=exception&k3=localstore")
        }
    } else if (window.ActiveXObject) {
        document.documentElement.addBehavior("#default#userdata");
        try {
            document.documentElement.load("mybaidu")
        } catch(i0) {
            document.documentElement.load("void");
            var i0 = window[L()] = new Image();
            i0.src = "/da/f.gif?k1=tc&k2=js&k3=loadfail"
        }
        X0 = {
            set: function($, _) {
                document.documentElement.setAttribute($, _);
                document.documentElement.save("mybaidu")
            },
            get: function($) {
                var _ = document.documentElement.getAttribute($);
                if (_) return _
            },
            remove: function($) {
                document.documentElement.removeAttribute($);
                document.documentElement.save("mybaidu")
            }
        }
    } else {
        var Q0 = "$_" + new Date().getTime().toString(36),
        T0 = "/images/storager.swf",
        f0 = {},
        X0 = {
            set: function($, A) {
                try {
                    S0().setItem($, A)
                } catch(_) {
                    f0[$] = A
                }
            },
            get: function($) {
                try {
                    return S0().getItem($)
                } catch(_) {
                    return f0[$]
                }
            },
            remove: function($) {
                try {
                    S0().removeItem($)
                } catch(_) {
                    return f0[$]
                }
                delete f0[$]
            }
        };
        document.write('<div style="width:1;height:0px"><embed src="' + T0 + '"  name="' + Q0 + '" height="1" width="1" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"/></div>');
        function S0() {
            return document[Q0]
        }
    }
    var D1 = "ibaidu2.0",
    O1, F1, p0, P1 = {},
    L1 = "http://passport.baidu.com",
    B1 = false,
    w0 = new O0("IBD_SELECTED_TAB"),
    v0 = new O0("NOTICE_KEY", "/", new Date(2500, 1, 1)),
    K1,
    O = {
        initialize: function($) {
            var B = Y0.getGlobalConfig();
            F1 = Y0.getWidgetConfigMap();
            if (B.lastModified == -1) this.REGISTIED = false;
            else this.REGISTIED = true;
            function _($, C, D, _) {
                B = $;
                p0 = _;
                F1 = C || F1;
                P1 = D;
                y0(P1, A)
            }
            q0(B, _);
            function A() {
                O1 = E1(B, F1);
                var _ = w0.get(),
                A = O1.pages;
                if (_ && parseInt(_) < A.length) O1.selectedIndex = _;
                else {
                    O1.selectedIndex = 0;
                    if (B.username) {
                        var C = A.length;
                        while (C--) if (A[C].systemId == "mybaidu") {
                            O1.selectedIndex = C;
                            break
                        }
                    }
                }
                O1.passport = L1;
                F0.initialize(O1);
                $ && $(O1)
            }
        },
        addWidgets: function(A, C) {
            var D = O1.getCurrentPage(),
            B = "?";
            z0();
            for (var _ = 0; _ < A.length; _++) {
                B += "type=" + (A[_].type || 0) + "&";
                A[_].id = z0(true)
            }
            var $ = [];
            B = B.substring(0, B.length - 1);
            new I("/config/widget/" + B, "get",
            function() {
                var B = this.getStatus();
                if (B < 400 && B >= 200) {
                    var E = Q.decode(this.getText()) || {};
                    for (var _ in E.resourceMap) P1["" + _] = E.resourceMap[_];
                    y0(E.resourceMap,
                    function() {
                        for (var B = 0; B < A.length; B++) {
                            var I = A[B],
                            F = E.resourceMap[I.type],
                            H = I.config || F.config || {},
                            G = P1[I.type];
                            G.type = I.type;
                            var _ = F0.createWidget(G, I.id, H);
                            D.addWidget(_, B % D.columns.length);
                            $.push(_);
                            O.updateWidgetConfig(I.id, H, null, true)
                        }
                        x0(function() {
                            C && C($, O1)
                        })
                    })
                }
            }).send()
        },
        clear: function() {
            Y0.clear()
        },
        removeWidgetByType: function($, A) {
            for (var B = $.length; B--;) {
                var _ = $[B];
                O1.walkWidget(function(C, A, $, D) {
                    if (C.equals(_)) {
                        O1.pages[A].removeWidget($, D);
                        B++;
                        return true
                    }
                })
            }
            x0(A)
        },
        addWidget: function(C, $, B) {
            var A = O1.getCurrentPage(),
            _ = {
                type: C,
                id: "w" + L()
            };
            new I("/config/widget/?type=" + C, "get",
            function() {
                var C = this.getStatus();
                if (C < 400 && C >= 200) {
                    var E = Q.decode(this.getText()) || {};
                    for (var D in E.resourceMap) P1["" + D] = E.resourceMap[D];
                    y0(E.resourceMap,
                    function() {
                        var D = P1[_.type];
                        D.type = _.type;
                        var E = $ || D.config,
                        C = F0.createWidget(D, _.id, E);
                        A.addWidget(C);
                        O.updateWidgetConfig(_.id, E,
                        function() {
                            B && B(O1, C)
                        },
                        false)
                    })
                } else F("error")
            }).send()
        },
        updateWidgetConfig: function(B, _, A, $) {
            F1[B] = _;
            if (!this.REGISTIED) {
                A && A();
                Y0.saveWidgetConfigMap(F1);
                return
            }
            new I(this.base + "config/widget/", "POST",
            function() {
                var _ = this.getStatus();
                if (_ == 200) {
                    A && A();
                    p0[B] = this.getText();
                    if (!$) {
                        Y0.saveWidgetConfigMap(F1);
                        x0()
                    }
                }
            }).send("content=" + encodeURIComponent(Q.encode(_)) + (B ? "&id=" + B: ""))
        },
        moveWidget: function(A, B, $, F, _) {
            var H = B == null ? O1.getCurrentPage() : O1.pages[B],
            E = O1.getWidgetById(A),
            C = H.getWidgets(),
            I;
            if (H != O1.getCurrentPage()) for (var D = 0; D < C.length; D++) {
                var J = C[D];
                J.type == E.type && (I = true);
                if (I) J.equals({
                    type: E.type,
                    config: E.config
                }) && (I = true) || (I = false);
                if (I) break
            }
            var G = true;
            if (I) G = confirm("\u60a8\u5df2\u7ecf\u5728\u201c" + R(H.title) + "\u201d\u6dfb\u52a0\u4e86\u8be5\u6a21\u5757\uff0c\u8981\u7ee7\u7eed\u6dfb\u52a0\u5417?");
            if (G) {
                J = O1.removeWidgetById(A);
                H.addWidget(J, $, F);
                x0(_)
            } else _(O1, false)
        },
        removeWidget: function(_, $) {
            O1.removeWidgetById(_);
            x0($)
        },
        checkNoticeId: function(_, $) {
            if (K1 != _) {
                K1 = _;
                v0.set(K1);
                return true
            } else $ && $()
        },
        addTab: function($) {
            if (O1.pages.length >= 20) {
                alert("\u6807\u7b7e\u9875\u6570\u91cf\u8fc7\u591a");
                return
            }
            var _ = new k0(new m0());
            _.columns.push(new n0(), new n0(), new n0());
            _.title = "\u65b0\u6807\u7b7e\u9875";
            O1.selectedIndex = O1.pages.length;
            O1.addTab(_);
            $(O1)
        },
        editTab: function($, _, A) {
            O1.pages[$].title = _;
            x0(A)
        },
        removeTab: function(_, A) {
            for (var $ = 0,
            B = O1.pages.length; $ < B; $++) if (O1.pages[$].id == _) {
                O1.removeTab($);
                break
            }
            O1.selectedIndex = Math.min(O1.selectedIndex, O1.pages.length - 1);
            w0.set(O1.selectedIndex);
            x0(A)
        },
        selectTab: function(_, A) {
            for (var $ = 0,
            B = O1.pages.length; $ < B; $++) if (O1.pages[$].id == _) O1.selectedIndex = $;
            w0.set(O1.selectedIndex);
            A(O1)
        },
        getWidgetConfig: function($) {
            return F1[$]
        },
        getWidgetResource: function($) {
            return P1[$]
        },
        setColumnStyle: function(A, C, F) {
            var D = O1.getCurrentPage(),
            H = D.columns;
            D.colStyle = C;
            var _ = A.length - D.columns.length;
            if (_ > 0) for (var E = 0; E < _; E++) H.push(new n0());
            else if (_ < 0) for (E = 0; E < -_; E++) {
                var G = H.pop();
                for (var $ = 0; $ < G.widgets.length; $++) H[$ % H.length].widgets.push(G.widgets[$])
            }
            for (var E = 0,
            B = H.length; E < B; E++) H[E].width = A[E].width;
            x0(F)
        },
        setTheme: function($, _) {
            if (O1.theme != $) {
                O1.theme = $;
                x0(_)
            }
        },
        setPageTitle: function(B, $, _) {
            var A = O1.getPageById(B);
            if (A.title == $) return;
            A.title = $;
            x0(_)
        },
        getTheme: function() {
            return O1.theme
        },
        getCurrentPage: function() {
            return O1.getCurrentPage()
        },
        getPagesId: function() {
            var _ = [];
            for (var $ = 0; $ < O1.pages.length; $++) _.push("tab" + O1.pages[$].id);
            return _
        },
        getUserName: function() {
            return O1.username
        },
        getPassport: function() {
            return O1.passport
        },
        getSpace: function() {
            return O1.space
        },
        isLoginSuggestShow: function() {
            return N1
        },
        loginSuggestHide: function() {
            E("loginSuggest").style.display = "none";
            N1 = false
        },
        isDefault: function() {
            return B1 || !O.REGISTIED && Y0.isDefaultConfig()
        },
        getPageCode: function(B) {
            var D = C1(),
            E = O1.pages,
            _;
            for (var J = 0; J < E.length; J++) {
                var F = E[J];
                if (F.id == B) _ = J
            }
            var $ = D.pages[_];
            for (J = 0; J < $.columns.length; J++) {
                var G = $.columns[J];
                for (var I = 0; I < G.widgets.length; I++) {
                    var A = G.widgets[I];
                    A.title = O1.pages[_].columns[J].widgets[I].title
                }
            }
            var H = {};
            H.pageConfig = $;
            H.widgetConfigMap = F1;
            var C = Q.encode(H);
            return C
        },
        addPage: function(D, A) {
            var G = C1(),
            C = D.pageConfig;
            z0();
            for (var H = 0; H < C.columns.length; H++) {
                var F = C.columns[H].widgets;
                for (var _ = 0; _ < F.length; _++) {
                    var $ = F[_].id,
                    B = z0(true);
                    F[_].id = B;
                    var E = D.widgetConfigMap[$];
                    if (E) {
                        F1[B] = E;
                        this.updateWidgetConfig(B, E)
                    }
                }
            }
            G.pages.push(D.pageConfig);
            x0(A, G)
        },
        isTypeExist: function(A, $, B) {
            var _ = O1.isTypeExist(A, $);
            B && B(O1, _);
            return _[0]
        },
        base: ""
    };
    function y0(_, A) {
        var $ = [];
        for (var B in _) {
            B = _[B].imports;
            if (B) $.push.apply($, B)
        }
        if ($.length) l0($, A);
        else A()
    }
    function q0(E, _) {
        var C = {},
        B = E.lastModified || 1,
        $ = E;
        new I("/config/main/" + "?lastModified=" + B, "GET", A).send("" + -new Date());
        function A(B) {
            var A = this.getStatus();
            if (A == 401 || A == 403) {
                if (O.REGISTIED) {
                    C = Y0.getGlobalConfig(true);
                    F1 = Y0.getWidgetConfigMap(true);
                    G1(C,
                    function() {
                        _.apply(null, arguments);
                        setTimeout(function() {
                            O.REGISTIED = false;
                            N.popup()
                        },
                        1000)
                    })
                } else {
                    if ($.username) $.username = null;
                    D()
                }
            } else if (A == 404) {
                B1 = true;
                if (O.REGISTIED == true) {
                    Y0.clear();
                    var C = Y0.getGlobalConfig();
                    F1 = Y0.getWidgetConfigMap();
                    var H = Q.decode(this.getText()).username;
                    C.username = H;
                    D(C)
                } else {
                    C = Y0.getGlobalConfig(),
                    H = Q.decode(this.getText()).username;
                    C.username = H;
                    D(C);
                    O.REGISTIED = true
                }
                for (var G in F1) new I("/config/widget/", "POST",
                function() {
                    var $ = this.getStatus();
                    if ($ == 200);
                }).send("content=" + encodeURIComponent(Q.encode(F1[G])) + (G ? "&id=" + G: ""));
                x0(null, C);
                Y0.saveWidgetConfigMap(F1)
            } else if (A == 400) alert("\u670d\u52a1\u5668\u51fa\u9519");
            else {
                var F = this.getText();
                if (F.replace(/\s+/, "")) {
                    O.REGISTIED = true;
                    var E = Q.decode(this.getText());
                    Y0.saveGlobalConfig(E);
                    D(Q.decode(F))
                } else {
                    O.REGISTIED = true;
                    D()
                }
            }
        }
        function D($) {
            if ($ && $ != E) E = $;
            G1(E, _)
        }
    }
    function t0(F) {
        var D = F,
        B = {};
        for (var _ = 0; _ < D.pages.length; _++) {
            var G = D.pages[_];
            for (var $ = 0; $ < G.columns.length; $++) {
                var C = G.columns[$];
                for (var A = 0; A < C.widgets.length; A++) {
                    var E = C.widgets[A];
                    B[E.id] = E.lastModified
                }
            }
        }
        return B
    }
    function G1(B, _) {
        var $ = t0(B),
        A = J1(B, $);
        new I("/config/widget/?" + A, "GET",
        function() {
            var C = this.getStatus();
            if (C < 400 && C >= 200) {
                var E = Q.decode(this.getText()) || {},
                A = E.configMap || {},
                D;
                for (D in F1) if (!A[D]) A[D] = F1[D];
                D && (F1 = E.configMap);
                P1 = E.resourceMap;
                _(B, A, P1, $)
            } else _()
        }).send("")
    }
    function J1($, _) {
        var I = "",
        H = $;
        for (var E = 0; E < H.pages.length; E++) {
            var B = H.pages[E];
            for (var F = 0; F < B.columns.length; F++) {
                var D = B.columns[F];
                for (var C = 0; C < D.widgets.length; C++) {
                    var A = D.widgets[C],
                    G = A.type;
                    G = parseInt(G) || 0;
                    if (I.indexOf("=" + G + "&") == -1) I += "type=" + G + "&"
                }
            }
        }
        for (var J in _) I += "id=" + J + "&";
        I += "id=moreSearch&";
        if (I.length > 0) return I.substring(0, I.length - 1);
        else return ""
    }
    var N1;
    function x0($, _) {
        var B = _ || C1();
        Y0.saveGlobalConfig(B);
        if (O.REGISTIED) new I("/config/main/", "POST",
        function() {
            var _ = this.getStatus();
            if (_ == 200) {
                O1.lastModified = this.getText() * 1;
                B.lastModified = O1.lastModified;
                Y0.saveGlobalConfig(B);
                $ && $(O1)
            } else if (_ == 405) {
                if (confirm("\u8fdc\u7aef\u914d\u7f6e\u5df2\u66f4\u65b0\uff0c\u70b9\u51fb\u786e\u5b9a\u5c06\u5237\u65b0\u3002\u672c\u6b21\u64cd\u4f5c\u5c06\u5ffd\u7565\u3002")) window.location.reload();
                $ && $(O1, false)
            } else if (_ == 401) {
                N.popup();
                $ && $(O1, true)
            } else if (confirm("\u914d\u7f6e\u66f4\u65b0\u5931\u8d25\uff0c\u70b9\u51fb\u786e\u5b9a\u5c06\u5237\u65b0\u3002\u672c\u6b21\u64cd\u4f5c\u5c06\u5ffd\u7565\u3002")) window.location.reload()
        }).send(function() {
            return "content=" + encodeURIComponent(Q.encode(B))
        });
        else {
            if (N1 == null) {
                var A = E("loginSuggest");
                A && A.show("block")
            }
            $ && $(O1)
        }
    }
    function C1() {
        var G = {};
        G.pages = [];
        G.theme = O1.theme || 0;
        G.layout = O1.layout.type;
        G.username = O1.username;
        G.noticeId = K1;
        G.space = O1.space;
        G.appVersion = 2;
        G.lastModified = O1.lastModified || 0;
        G.widgetLastModifiedMap = {};
        for (var _ = 0; _ < O1.pages.length; _++) {
            var B = O1.pages[_],
            C = s0(B);
            G.pages.push(C);
            C.columns = [];
            var D = B.columns;
            for (var H = 0; H < D.length; H++) {
                var $ = D[H],
                F = r0($);
                C.columns.push(F);
                var A = $.widgets;
                F.widgets = [];
                for (var E = 0; E < A.length; E++) F.widgets.push(_1(A[E]))
            }
        }
        return G
    }
    function E1(K, C) {
        var A = K,
        I = I1(A);
        K1 = v0.get();
        for (var F = 0; F < A.pages.length; F++) {
            var H = A.pages[F],
            $ = u0(H);
            I.addTab($);
            for (var G = 0; G < H.columns.length; G++) {
                var D = H.columns[G],
                E = Q1(D);
                $.columns.push(E);
                for (var _ = 0; _ < D.widgets.length; _++) {
                    var J = P1[D.widgets[_].type];
                    if (J == null);
                    else {
                        J.id = D.widgets[_].id;
                        J.type = D.widgets[_].type;
                        var B = C[J.id] || J.config;
                        if (B) {
                            C[J.id] = B;
                            E.widgets.push(F0.createWidget(J, J.id, B))
                        }
                    }
                }
            }
        }
        return I
    }
    function s0($) {
        var _ = {};
        _.layout = $.layout.type;
        _.title = $.title;
        if ($.systemId) _.systemId = $.systemId;
        _.columns = [];
        return _
    }
    function r0($) {
        var _ = {};
        _.widgets = [];
        _.width = $.width || "";
        return _
    }
    function _1($) {
        var _ = {},
        A = F1[$.id];
        _.lastModified = p0[$.id] || 0;
        _.id = $.id;
        _.type = "" + $.type;
        return _
    }
    function I1(_) {
        var $ = new o0();
        $.layout = new j0();
        $.theme = _.theme;
        $.username = _.username;
        $.space = _.space;
        $.lastModified = _.lastModified;
        return $
    }
    function u0(_) {
        var $ = new k0();
        $.layout = new m0();
        $.title = _.title;
        $.systemId = _.systemId;
        return $
    }
    function Q1(_) {
        var $ = new n0();
        $.width = _.width;
        return $
    }
    function H1() {
        var $ = [];
        O1.walkWidget(function(_) {
            $.push(_.id)
        });
        return $
    }
    var M1;
    function z0($) {
        $ || (M1 = H1().join("|"));
        M1 || (M1 = H1().join("|"));
        var _ = "w" + L();
        while (M1.indexOf(_) != -1) _ = "w" + L();
        return _
    }
    var $1 = [],
    A1 = I.prototype.send;
    I.prototype.send = function($) {
        this.arg = $;
        if (this.options.method.toUpperCase() == "GET") {
            if (this.options.url.indexOf("?") >= 0) this.options.url += "&time=" + (new Date() * 1).toString(36);
            else this.options.url += "?time=" + (new Date() * 1).toString(36);
            A1.call(this, $);
            return
        }
        $1.push(this);
        this._onComplete = this.onComplete;
        this.onComplete = function() {
            this._onComplete && this._onComplete.apply(this, arguments);
            $1.shift();
            if ($1.length > 0) {
                var _ = $1[0];
                if (typeof _.arg == "function") var $ = _.arg();
                else $ = _.arg;
                A1.call(_, $)
            }
        };
        if ($1.length == 1) {
            var _ = $1[0];
            if (typeof _.arg == "function") $ = _.arg();
            else $ = _.arg;
            A1.call(_, $)
        }
    }
    var U1 = [{
        title: "\u767e\u5ea6\u6709\u554a",
        href: "http://youa.baidu.com"
    },
    {
        title: "\u7a7a\u95f4",
        href: "http://hi.baidu.com"
    },
    {
        title: "\u767e\u79d1",
        href: "http://baike.baidu.com"
    },
    {
        title: "\u5730\u56fe",
        href: "http://map.baidu.com"
    },
    {
        title: "\u8bcd\u5178",
        href: "http://dict.baidu.com"
    },
    {
        title: "\u5b89\u5168\u4e2d\u5fc3",
        href: "http://an.baidu.com"
    },
    {
        title: "\u8d22\u7ecf",
        href: "http://finance.baidu.com"
    },
    {
        title: "\u641c\u85cf",
        href: "http://cang.baidu.com"
    },
    {
        title: "\u73a9\u5427",
        href: "http://wanba.baidu.com"
    },
    {
        title: "\u97f3\u4e50\u76d2",
        href: "http://box.baidu.com"
    },
    {
        title: "\u97f3\u4e50\u638c\u95e8\u4eba",
        href: "http://zhangmen.baidu.com"
    },
    {
        title: "\u98ce\u4e91\u699c",
        href: "http://top.baidu.com"
    },
    {
        title: "\u535a\u5ba2\u641c\u7d22",
        href: "http://blogsearch.baidu.com"
    },
    {
        title: "\u5927\u5b66\u641c\u7d22",
        href: "http://daxue.baidu.com"
    },
    {
        title: "\u5730\u533a\u641c\u7d22",
        href: "http://diqu.baidu.com"
    },
    {
        title: "\u6cd5\u5f8b\u641c\u7d22",
        href: "http://law.baidu.com"
    }],
    X1 = "moreSearch",
    W1 = "head",
    V1 = [true, true, true, true, true],
    M = {
        render: function() {
            var A = O.getWidgetConfig(X1) || V1,
            _ = U1;
            for (var $ = 0; $ < _.length; $++) _[$].select = A[$] || false;
            return T1.render({
                username: O.getUserName(),
                passport: O.getPassport(),
                space: O.getSpace(),
                moreList: _,
                action: v(S1)
            })
        },
        repaint: function() {
            var A = O.getWidgetConfig(X1) || V1,
            _ = U1;
            for (var $ = 0; $ < _.length; $++) _[$].select = A[$] || false;
            E("searchNaviExpandMenu").innerHTML = R1.render({
                moreList: _,
                action: v(S1)
            })
        }
    }
    var c1 = (navigator.userAgent.toLowerCase().indexOf("msie") != -1 && navigator.userAgent.toLowerCase().indexOf("opera") == -1),
    g1 = c1 ? 1 : 0;
    function f1($, A, _) {
        this.targetList = [];
        this.onStart = $;
        this.onStep = A;
        this.onFinish = _;
        var B = this;
        this.doStart = function($) {
            $ = $ || this.event;
            if ($.button != g1) return;
            if (!B.onStart || !B.onStart($)) e1(B, $)
        }
    }
    f1.prototype.connect = function($, _) {
        if (this.handleId) this.disconnect();
        this.targetId = E(_ || $).uid();
        this.handleId = E($).uid();
        $.attach("mousedown", this.doStart);
        $ = _ = null;
        return this
    };
    f1.prototype.disconnect = function() {
        var $ = E(this.handleId);
        if ($) $.detach("mousedown", this.doStart)
    };
    function e1($, N) {
        var D = E($.targetId),
        K = D.style,
        O = Y1();
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        var F = {
            position: K.position,
            left: K.left,
            top: K.top
        };
        document.body.setCapture && document.body.setCapture(true);
        var L = D.getPosition(),
        M = L.left,
        G = L.top,
        B = a1(N),
        _,
        A = function() {
            if (B) {
                var N = B.pageX,
                H = B.pageY,
                P = N - M,
                A = H - G,
                D = $.targetList,
                L = D.length;
                if (!$.onStep || $.onStep(N, H, P, A) != false) I(P, A);
                while (L--) {
                    try {
                        var F = D[L],
                        C = F.id,
                        J = E(C),
                        O = J.getRegion(),
                        Q = i1(O, N, H) && F.accept($, N, H);
                        if (Q) {
                            if (_ != F) {
                                if (_) F.onLeave($, B);
                                F.onEnter($, B)
                            }
                            _ = F;
                            break
                        } else if (_ == F) {
                            F.onLeave($, B);
                            _ = null
                        }
                    } catch(K) {
                        alert(K.message)
                    }
                }
                B = null
            }
        };
        function I(_, $) {
            K.position = "absolute";
            K.left = _ + "px";
            K.top = $ + "px"
        }
        function C() {
            K.position = F.position;
            K.left = F.left;
            K.top = F.top
        }
        I(M, G);
        L = D.getPosition();
        M = B.pageX + L.left - 2 * M;
        G = B.pageY + L.top - 2 * G;
        B = C();
        function H($) {
            B = a1($ || window.event);
            if ($.clientY <= 0 || $.clientX >= document.documentElement.clientWidth) return;
            A();
            var _ = $.clientY;
            if (_ < 30) h1(D, 1);
            else if (_ > document.documentElement.clientHeight - 30) h1(D, 2);
            else clearTimeout(b1)
        }
        function J(E) {
            try {
                clearTimeout(b1);
                E = E || window.event;
                var A = a1(E || window.event);
                document.body.releaseCapture && document.body.releaseCapture();
                document.detach("mousemove", H);
                document.detach("mouseup", J);
                var F = A.pageX,
                L = A.pageY;
                j1(O);
                if (! ($.onFinish && $.onFinish(F, L, F - M, L - G))) C()
            } catch(I) {} finally {
                D = K = null;
                if (_) {
                    _.onDrop($, B);
                    B = null
                }
            }
        }
        E(document).attach("mousemove", H);
        document.attach("mouseup", J)
    }
    function a1(A) {
        var $ = document.documentElement.scrollLeft,
        _ = document.documentElement.scrollTop;
        return {
            clientX: A.clientX,
            clientY: A.clientY,
            pageX: A.pageX == null ? A.clientX + $: A.pageX,
            pageY: A.pageY == null ? A.clientY + _: A.pageY
        }
    }
    function Y1() {
        var _ = document.body.style;
        if (_.MozUserSelect != undefined) {
            var $ = _.MozUserSelect;
            _.MozUserSelect = "none"
        } else if (_.KhtmlUserSelect != undefined) {
            $ = _.KhtmlUserSelect;
            _.KhtmlUserSelect = "none"
        } else {
            $ = document.body.onselectstart;
            document.body.onselectstart = "return false"
        }
        return $
    }
    function j1($) {
        setTimeout(function() {
            var _ = document.body.style;
            if (_.MozUserSelect != undefined) _.MozUserSelect = $;
            else if (_.KhtmlUserSelect != undefined) _.KhtmlUserSelect = $;
            else document.body.onselectstart = $
        },
        100)
    }
    function d1($, B, _, A) {
        this.id = E($).uid();
        this.onEnter = B;
        this.onDrop = _;
        this.onLeave = A
    }
    d1.prototype = {
        accept: function(_, $, A) {
            return true
        }
    };
    function i1(A, $, _) {
        return $ >= A.left && $ <= A.right && _ >= A.top && _ <= A.bottom
    }
    var Z1, b1;
    function h1(A, _, B) {
        if (!B) Z1 = document.documentElement.scrollHeight;
        var $ = document.documentElement.scrollTop,
        C = document.documentElement.clientHeight;
        if (_ == 1 && $ - 5 >= 0) {
            document.documentElement.scrollTop = $ - 5;
            A.style.top = parseInt(A.style.top) - 5 + "px"
        } else if (_ == 2 && parseInt(A.style.top) + 5 <= Z1) {
            document.documentElement.scrollTop = $ + 5;
            A.style.top = parseInt(A.style.top) + 5 + "px"
        } else return;
        clearTimeout(b1);
        b1 = setTimeout(function() {
            h1(A, _, true)
        },
        50)
    }
    function Dialog(A, _, $) {
        this.title = A;
        this.template = _;
        this.action = $
    }
    var o1 = [],
    l1 = z(function() {
        var $ = o1[o1.length - 1];
        $.cancle && $.cancle();
        $.dispose()
    }),
    n1 = new f1(0, 0,
    function() {
        return true
    }),
    p1 = z(function($) {
        n1.connect(this, "dialog").doStart($)
    });
    function m1() {
        var _ = E("cover"),
        $ = E("main");
        _.style.height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, $.scrollHeight) + "px";
        _.style.width = "100%"
    }
    Dialog.prototype = {
        popup: function(A, _) {
            var $ = document.documentElement.scrollTop;
            E("dialog").show();
            E("popup").style.top = $ + "px";
            E("cover").style.marginTop = -$ + "px";
            E("popup").style.display = "block";
            var B = this.index = o1.length;
            E(window).attach("resize", m1);
            o1.push(this);
            m1();
            E("cover").style.display = "block";
            this.reset(A, _)
        },
        reset: function($, _) {
            if (typeof _ != "string") _ = this.template.render({
                data: _,
                action: this.action
            });
            E("dialog").innerHTML = k1.render({
                title: $ || this.title,
                content: _,
                _drag: p1,
                _cancel: l1
            });
            E("dialog").style.top = "";
            E("dialog").style.left = ""
        },
        dispose: function(B) {
            E(window).detach("resize", m1);
            delete o1[this.index];
            var _ = E("popup"),
            A = E("dialog"),
            $;
            _.hide();
            E("cover").hide();
            A.hide();
            while ($ = A.firstChild) A.removeChild($)
        }
    }
    try {
        var u1 = new l(function() {
            function A(_) {
                return _ in $ ? $[_] : this[_]
            }
            var $ = arguments[0],
            _ = [];
            _.push('<iframe frameborder="0" style="border: 0pt none ; margin-left: 16px; width: 342px; height: 300px;" src="https://passport.baidu.com/?login&amp;psp_tt=2&amp;tpl=my&amp;fu=http%3A//my.baidu.com/reload.html%3Ftype%3D0&amp;u=http%3A//my.baidu.com/" scrolling="no"> </iframe>');
            return _.join("")
        }),
        T1 = new l(function() {
            function L($) {
                return $ in G ? G[$] : this[$]
            }
            var G = arguments[0],
            C = [],
            F = L("username"),
            K = L("passport"),
            J = L("action"),
            $ = L("ActiveXObject"),
            M = L("window"),
            _ = L("item"),
            H = L("headHTML"),
            E = L("moreList");
            function N(_, A) {
                if (A) {
                    var $ = [];
                    for (A in _) $.push({
                        key: A,
                        value: _[A]
                    });
                    return $
                }
                A = typeof _;
                return A == "number" ? new Array(_) : A == "string" ? _.split("") : _ instanceof Array ? _: N(_, 1)
            }
            L = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function I($) {
                return String($).replace(/[<>&"]/g, L)
            }
            C.push(H);
            C.push('<div class="head-inner" style="z-index:1000"> ');
            if (F) {
                C.push(' <div xml:space="preserve" class="user-bar"> <a href="');
                C.push(I(K));
                C.push('?center&amp;tpl=my&amp;aid=7&amp;default_tab=4" target="_blank"');
                var B = J.addStatistics("k1=click&k2=bar&k3=2");
                if (B != null) C.push(' onclick="', I(B), '"');
                C.push('><b style="FONT-FAMILY:arial">');
                C.push(I(F));
                C.push('</b></a>|<span id="BaiduMsg"><a href="http://msg.baidu.com/" target="_blank">\u6211\u7684\u6d88\u606f(0/0)</a></span>|<a href="http://www.baidu.com"');
                B = J.addStatistics("k1=click&k2=bar&k3=1");
                if (B != null) C.push(' onclick="', I(B), '"');
                C.push(' id="BaiduLink">\u7ecf\u5178\u9996\u9875</a>|<a href="javascript:void(0)"');
                B = J.setHome();
                if (B != null) C.push(' onclick="', I(B), '"');
                C.push('>\u8bbe\u4e3a\u9996\u9875</a>|<a href="');
                C.push(I(K));
                C.push("?logout&amp;tpl=my&amp;aid=7&amp;u=");
                C.push(I(M.location.href));
                C.push('"');
                B = J.logout();
                if (B != null) C.push(' onclick="', I(B), '"');
                C.push(">\u9000\u51fa</a>    </div> ")
            } else {
                C.push(' <div class="user-bar"> <a href="#"');
                B = J.login();
                if (B != null) C.push(' onclick="', I(B), '"');
                C.push('>\u767b\u5f55</a>|<a href="http://www.baidu.com"');
                B = J.addStatistics("k1=click&k2=bar&k3=1");
                if (B != null) C.push(' onclick="', I(B), '"');
                C.push(' id="BaiduLink">\u7ecf\u5178\u9996\u9875</a>|<a href="javascript:void(0)"');
                B = J.setHome();
                if (B != null) C.push(' onclick="', I(B), '"');
                C.push(">\u8bbe\u4e3a\u9996\u9875</a>  </div> ")
            }
            C.push(' <div class="top-spacer" style="width:100%"></div> <div class="search-content" style="z-index:1000;width:650px;margin:auto;"> <div style="position:relative;width:650px;height:59px;z-index:1000;"> <div class="search-bg"></div> <table class="search-inner" align="center" style="z-index:1000;" border="0"> <tbody> <tr> <td width="144" valign="bottom" style="padding:0;"> <a href="http://www.baidu.com/"><div class="search-logo" style="cursor:pointer"></div></a> </td> <td width="500" align="left" valign="top"> <div xml:space="preserve" class="search-navi"> <form style="display:none;" id="searchNaviForm"> <input type="text" name="word" id="searchWord"></input> <input type="text" name="kw" id="searchKW"></input> <div id="searchQ"></div> </form> <a href="http://news.baidu.com/" target="_blank"');
            B = J.search("news");
            if (B != null) C.push(' onclick="', I(B), '"');
            C.push('>\u65b0\xa0\u95fb</a> <b>\u7f51\xa0\u9875</b> <a href="http://tieba.baidu.com/" target="_blank"');
            B = J.search("tieba");
            if (B != null) C.push(' onclick="', I(B), '"');
            C.push('>\u8d34\xa0\u5427</a> <a href="http://zhidao.baidu.com/" target="_blank"');
            B = J.search("zhidao");
            if (B != null) C.push(' onclick="', I(B), '"');
            C.push('>\u77e5\xa0\u9053</a> <a href="http://mp3.baidu.com/" target="_blank"');
            B = J.search("mp3");
            if (B != null) C.push(' onclick="', I(B), '"');
            C.push('>MP3</a> <a href="http://image.baidu.com/" target="_blank"');
            B = J.search("image");
            if (B != null) C.push(' onclick="', I(B), '"');
            C.push('>\u56fe\xa0\u7247</a> <a href="http://video.baidu.com/" target="_blank"');
            B = J.search("video");
            if (B != null) C.push(' onclick="', I(B), '"');
            C.push('>\u89c6\xa0\u9891</a> <div style="display:inline;position:relative;z-index:1000;cursor:pointer"> <div');
            B = J.dblclickMore();
            if (B != null) C.push(' ondblclick="', I(B), '"');
            C.push(' class="search-navi-expand" style="display:inline"');
            B = J.clickMore();
            if (B != null) C.push(' onclick="', I(B), '"');
            B = J.outMore();
            if (B != null) C.push(' onmouseout="', I(B), '"');
            B = J.overMore();
            if (B != null) C.push(' onmouseover="', I(B), '"');
            C.push('> <span style="text-decoration: underline;padding-right:4px">\u66f4\u591a</span><span style="font-size:11px;">\u25bc</span><div id="searchNaviExpandMenu"> ');
            var A = E,
            B = 0;
            A = N(A);
            for (; B < A.length; B++) {
                _ = A[B];
                C.push(" ");
                if (_.select) {
                    C.push(" <a");
                    var D = _.href;
                    if (D != null) C.push(' href="', I(D), '"');
                    C.push(' target="_blank" class="search-navi-expand-menu-item">');
                    C.push(I(_.title));
                    C.push("</a> ")
                }
                C.push(" ")
            }
            C.push(' <div class="search-navi-expand-menu-sep" style="font-size:0;margin:4px"></div> <a href="http://www.baidu.com/more" target="_blank" class="search-navi-expand-menu-all">\u66f4\u591a\u4ea7\u54c1</a> <a href="http://www.baidu.com" class="search-navi-expand-menu-edit"');
            B = J.editMenu();
            if (B != null) C.push(' onclick="', I(B), '"');
            C.push('>\u7f16\u8f91\u4e0b\u62c9\u6846</a> </div> </div> </div> </div> <div class="search-box"> <form action="http://www.baidu.com/s" target="_blank" style="position:relative;margin:0;padding:0"');
            B = J.addStatistics("k1=click&k2=search&k3=web");
            if (B != null) C.push(' onsubmit="', I(B), '"');
            C.push(' name="f" method="get"> <input');
            B = J.updateSuggest();
            if (B != null) C.push(' onkeyup="', I(B), '"');
            C.push(' maxlength="256" type="text" size="42" name="wd" id="searchInput"></input><input value="\u767e\u5ea6\u4e00\u4e0b" type="submit" id="searchSubmit"></input><span style="position:absolute;margin-left:5px;"> <a href="javascript:void(0)"');
            B = J.setSuggestStatus();
            if (B != null) C.push(' onclick="', I(B), '"');
            C.push('>\u8bbe\u7f6e</a> <br/> <a href="http://www.baidu.com/search/jiqiao.html" target="_blank">\u5e2e\u52a9</a> </span> <div style="display:none;" id="searchSuggest"> ');
            if ($) C.push(' <iframe style="position:absolute;z-index:1;top:0;left:0;height:500px;width:361px;filter:alpha(opacity=0);opacity:0" id="ieIframe"></iframe> ');
            else C.push(" <div></div> ");
            C.push(' </div> <input value="3" type="hidden" name="cl"></input> <input value="" type="hidden" name="tn" id="tnInput"></input> <input value="17" type="hidden" name="bar"></input> </form> </div> </td> </tr> </tbody> </table> </div> </div> </div>');
            return C.join("")
        }),
        R1 = new l(function() {
            function _($) {
                return $ in B ? B[$] : this[$]
            }
            var B = arguments[0],
            H = [],
            E = _("action"),
            A = _("item"),
            I = _("moreList");
            function $(A, B) {
                if (B) {
                    var _ = [];
                    for (B in A) _.push({
                        key: B,
                        value: A[B]
                    });
                    return _
                }
                B = typeof A;
                return B == "number" ? new Array(A) : B == "string" ? A.split("") : A instanceof Array ? A: $(A, 1)
            }
            _ = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function D($) {
                return String($).replace(/[<>&"]/g, _)
            }
            var C = I,
            F = 0;
            C = $(C);
            for (; F < C.length; F++) {
                A = C[F];
                H.push(" ");
                if (A.select) {
                    H.push(" <a");
                    var G = A.href;
                    if (G != null) H.push(' href="', D(G), '"');
                    H.push(' target="_blank" class="search-navi-expand-menu-item">');
                    H.push(D(A.title));
                    H.push("</a> ")
                }
                H.push(" ")
            }
            H.push('<div class="search-navi-expand-menu-sep" style="font-size:0;margin:4px"></div><a href="http://www.baidu.com/more" target="_blank" class="search-navi-expand-menu-all">\u66f4\u591a\u4ea7\u54c1</a><a href="http://www.baidu.com" class="search-navi-expand-menu-edit"');
            F = E.editMenu();
            if (F != null) H.push(' onclick="', D(F), '"');
            H.push(">\u7f16\u8f91\u4e0b\u62c9\u6846</a>");
            return H.join("")
        }),
        v1 = new l(function() {
            function B($) {
                return $ in N ? N[$] : this[$]
            }
            var N = arguments[0],
            $ = [],
            A = B("item"),
            O = B("page"),
            E = B("index"),
            I = B("loginShow"),
            C = B("hotWidgets"),
            G = B("action"),
            F = B("tabContentStyle"),
            D = B("selectedIndex"),
            P = B("themeLabel"),
            H = B("pages");
            function M(_, A) {
                if (A) {
                    var $ = [];
                    for (A in _) $.push({
                        key: A,
                        value: _[A]
                    });
                    return $
                }
                A = typeof _;
                return A == "number" ? new Array(_) : A == "string" ? _.split("") : _ instanceof Array ? _: M(_, 1)
            }
            B = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function _($) {
                return String($).replace(/[<>&"]/g, B)
            }
            $.push('<div class="frame-tab-folder"> <div class="frame-tab-folder-head"');
            var J = F;
            if (J != null) $.push(' style="', _(J), '"');
            $.push(' id="frameTabFolderHead"> <table cellpadding="0" style="width:100%;border-collapse:collapse;border:0" cellspacing="0"> <tr> <td> ');
            var K = H,
            J = 0;
            K = M(K);
            N = {
                lastIndex: K.length - 1
            };
            for (; J < K.length; J++) {
                N.index = J;
                O = K[J];
                $.push(' <div class="frame-tab ');
                $.push(_(N.index == D ? "frame-tab-select": ""));
                $.push('" style="z-index:');
                $.push(_(80 - N.index));
                $.push(';"');
                var L = G.selectTab(O.id);
                if (L != null) $.push(' onclick="', _(L), '"');
                L = G.overTab();
                if (L != null) $.push(' onmouseover="', _(L), '"');
                $.push(' id="tab');
                $.push(_(O.id));
                $.push('"> <div class="frame-tab-right" style="float:left;"> <div class="frame-tab-content" style="float:left;"> <div class="frame-tab-editor"> <input');
                L = O.title;
                if (L != null) $.push(' value="', _(L), '"');
                $.push(' maxLength="30" type="text" size="8" id="tabInput');
                $.push(_(O.id));
                $.push('"></input> </div> ');
                if (N.index && O.systemId != "mybaidu") {
                    $.push(" <div");
                    L = G.dblclickTabMenu();
                    if (L != null) $.push(' ondblClick="', _(L), '"');
                    $.push(' class="frame-tab-menu"');
                    L = G.clickTabMenu();
                    if (L != null) $.push(' onclick="', _(L), '"');
                    L = G.outTabMenu();
                    if (L != null) $.push(' onmouseout="', _(L), '"');
                    L = G.overTabMenu();
                    if (L != null) $.push(' onmouseover="', _(L), '"');
                    $.push('> <div class="frame-tab-menu-outer"> <div class="frame-tab-menu-inner"> <a href="javascript:void(0)"');
                    L = H.length == 1 ? "color:#aca899;background:white": "";
                    if (L != null) $.push(' style="', _(L), '"');
                    L = G.removeTab(O.id);
                    if (L != null) $.push(' onclick="', _(L), '"');
                    $.push('> \u5220\u9664 </a> <a href="javascript:void(0)"');
                    L = H.length == 1 ? "color:#aca899;background:white": "";
                    if (L != null) $.push(' style="', _(L), '"');
                    L = G.editPageTitle(O.id);
                    if (L != null) $.push(' onclick="', _(L), '"');
                    $.push("> \u91cd\u547d\u540d </a> </div> </div> </div> ")
                }
                $.push(" <div");
                L = G.editPageTitle(O.id);
                if (L != null) $.push(' ondblClick="', _(L), '"');
                $.push(' title="\u53cc\u51fb\u53ef\u547d\u540d\u6807\u7b7e\u9875" class="frame-tab-label" style="margin-left:-15px;"> <div style="padding:0 20px 0 10px;margin-left:15px" id="tabTitle');
                $.push(_(O.id));
                $.push('"> ');
                $.push(O.title);
                $.push(" </div> </div> </div> </div> </div> ")
            }
            $.push(' <a href="javascript:void(0)" title="\u6dfb\u52a0\u6807\u7b7e\u9875" class="frame-tab-add"');
            J = G.addTab();
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('> </a> </td> <td style="width:250px;vertical-align:bottom;"> <div class="frame-button-container" id="frameButtonContainer"> <div class="frame-button" style="float:left"');
            J = G.showPanel("widgetLib");
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push(' id="widgetLibButton"> <div class="frame-button-bg"> <div> <div');
            J = G.addStatistics("k1=click&k2=share&k3=1");
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('>\u6dfb\u52a0\u6a21\u5757</div>  </div> </div> </div> <div class="frame-button-sep-line"></div> <div class="frame-button"');
            J = G.showPanel("theme");
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push(' id="themeButton"> <div class="frame-button-bg"> <div> <div');
            J = G.addStatistics("k1=click&k2=share&k3=2");
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('>\u66f4\u6362\u4e3b\u9898</div>  </div> </div> </div>  <div class="frame-button-sep-line"></div> <div class="frame-button"');
            J = G.showPanel("userfeed");
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('> <div class="frame-button-bg"> <div> <div>\u7528\u6237\u53cd\u9988</div> </div> </div> </div> </div> </td> </tr> </table> </div> <div class="frame-tab-folder-bottom"></div> </div><div class="notice-folder"> <div class="widget-panel" style="display:none" id="widgetLib"> <div class="clear" style="clear:both;text-align:right;"> <a href="javascript:void(0)" class="top-collapse"');
            J = G.showPanel("widgetLib");
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('>\u5173\u95ed</a> </div><div class="recommend"> ');
            K = C.slice(0, 6),
            J = 0;
            K = M(K);
            for (; J < K.length; J++) {
                A = K[J];
                $.push(' <div class="cell"> <div class="widget-icon"> <img width="75" height="50" style="border:1px solid #FFF;display:block" src="/images/widget/icon/');
                $.push(_(A.id));
                $.push('.jpg"/> </div> <div style="text-align:left;width:135px"> <div class="cell-title"> <input');
                L = A.value;
                if (L != null) $.push(' value="', _(L), '"');
                $.push(' type="checkbox"');
                L = G.onWidgetChecked(A.value);
                if (L != null) $.push(' onclick="', _(L), '"');
                $.push("></input> ");
                $.push(_(A.title));
                $.push(" </div> ");
                if (A.description.length > 28) {
                    $.push(" <div");
                    L = A.description;
                    if (L != null) $.push(' title="', _(L), '"');
                    $.push(' style="padding-right:5px;"> ');
                    $.push(_(A.description.substring(0, 26)));
                    $.push("... </div> ")
                } else {
                    $.push(' <div style="padding-right:5px;"> ');
                    $.push(_(A.description));
                    $.push(" </div> ")
                }
                $.push(" </div> </div> ")
            }
            $.push(' <div class="clear"></div> </div>');
            K = C.slice(6, 24),
            J = 0;
            K = M(K);
            for (; J < K.length; J++) {
                A = K[J];
                $.push(' <div style="float: left;text-align:left;width: 16%;"> ');
                if (A.select) {
                    $.push(" <input");
                    L = A.value;
                    if (L != null) $.push(' value="', _(L), '"');
                    $.push(' type="checkbox"');
                    L = G.onWidgetChecked(A.value);
                    if (L != null) $.push(' onclick="', _(L), '"');
                    $.push(' checked="true"></input> ')
                } else {
                    $.push(" <input");
                    L = A.value;
                    if (L != null) $.push(' value="', _(L), '"');
                    $.push(' type="checkbox"');
                    L = G.onWidgetChecked(A.value);
                    if (L != null) $.push(' onclick="', _(L), '"');
                    $.push("></input> ")
                }
                $.push(" <label>");
                $.push(_(A.title));
                $.push("</label> </div> ")
            }
            $.push('<div style="clear:both;border-bottom:1px dashed #B2B2B2;margin:0 0 15px 2px;width:100%;height:15px;line-height:15px;"></div><div style="clear:both;text-align:center;padding-top:10px"> <input value="\u6dfb\u52a0\u9009\u4e2d\u7684\u6a21\u5757" type="button" style="height:28px;line-height:20px;width:115px;margin-right:5px;;padding:0;"');
            J = G.widgetLibSubmit();
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('></input> <input value="\u53d6\u6d88\u8bbe\u7f6e" type="button" style="height:28px;line-height:20px;width:75px;margin-right:80px;padding:0"');
            J = G.showPanel("widgetLib");
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('></input> </div><div class="add-rss"> <a href="widget/widget-list.action" target="_blank"><div style="background:url(images/more-button.gif) left center;float:right;width:83px;height:25px;"></div></a> <a href="javascript:void(0);"');
            J = G.addRss();
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('><div style="background:url(images/more-button.gif) left top;float:right;margin-right:5px;width:88px;height:25px;"></div></a> </div> </div> <div class="widget-panel" style="display:none" id="notice"> <div class="clear" style="clear:both;text-align:right"> <a href="javascript:void(0)" class="top-collapse"');
            J = G.showPanel("notice");
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('>\u5173\u95ed</a> </div> <div id="noticeContent"></div> </div> <div class="widget-panel" style="display:none" id="theme"> <div style="clear:both;padding:0;text-align:right;"> <a href="javascript:void(0)" class="top-collapse"');
            J = G.showPanel("theme");
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('>\u5173\u95ed</a> </div><div align="left" style="margin-bottom:25px;" id="themeStyle"> <div style="line-height:44px;float:left;font-weight:bold;margin-right:6px"> \u66f4\u6362\u4e3b\u9898\uff1a </div> ');
            P = ["\u9ed8\u8ba4\u6837\u5f0f", "\u851a\u84dd\u5929\u7a7a", "\u7b80\u5355\u751f\u6d3b", "\u5730\u74031\u5c0f\u65f6", "\u590f\u65e5\u5149\u5f71", "\u7ea2\u5899\u5915\u7167", "\u9999\u9187\u5496\u5561", "\u6fc0\u60c5\u725b\u4ed4", "\u7ae5\u5fc3\u5927\u53d1"];
            $.push(" ");
            K = [0, 6, 12, 23, 17, 19, 10, 7, 13],
            J = 0;
            K = M(K);
            N = {
                lastIndex: K.length - 1
            };
            for (; J < K.length; J++) {
                N.index = J;
                E = K[J];
                $.push(' <div class="theme-img theme');
                $.push(_(E));
                $.push('"> <div class="theme-border"> <div');
                L = G.setTheme(E);
                if (L != null) $.push(' onclick="', _(L), '"');
                $.push('></div> </div> <div class="theme-title">');
                $.push(_(P[N.index]));
                $.push("</div> </div> ")
            }
            $.push(' <div style="clear:both"></div> </div><div align="left" style="width:100%;height:50px;" id="themeLayout"> <div style="line-height:44px;float:left;font-weight:bold;margin-right:6px"> \u4fee\u6539\u6846\u67b6\uff1a </div> ');
            K = 6,
            J = 0;
            K = M(K);
            N = {
                lastIndex: K.length - 1
            };
            for (; J < K.length; J++) {
                N.index = J;
                E = K[J];
                $.push(' <div class="theme-img"> <div class="theme-border"> <div class="col');
                $.push(_(N.index));
                $.push('"');
                L = G.setColumn(N.index);
                if (L != null) $.push(' onclick="', _(L), '"');
                $.push("></div> </div> </div> ")
            }
            $.push(' </div><div style="width:100%;text-align:right;padding-top:5px"><a href="widget/skin-list.action" target="_self"><div style="width:83px;height:25px;background:url(images/more-button.gif) left bottom;float:right"></div></a></div> </div> </div><div class="login-suggest" style="display:');
            $.push(_(I ? "": "none"));
            $.push('" id="loginSuggest"> <span>\u4e3b\u9898\u5df2\u4fee\u6539\uff0c\u8bf7\u767b\u5f55\u6765\u4fdd\u5b58\u5df2\u4fee\u6539\u6548\u679c!</span> <input value="\u767b\u5f55" type="button" style="margin:0 5px 0 5px"');
            J = G.login();
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('></input> <input value="\u5173\u95ed\u63d0\u793a" type="button"');
            J = G.cancelLogin();
            if (J != null) $.push(' onclick="', _(J), '"');
            $.push('></input> </div><div class="frame-widget-content-top" style="overflow:hidden"></div><div class="frame-widget-content"');
            J = F;
            if (J != null) $.push(' style="', _(J), '"');
            $.push(' id="frameWidgetContent"> <div id="contentCover"></div> ');
            K = H,
            J = 0;
            K = M(K);
            N = {
                lastIndex: K.length - 1
            };
            for (; J < K.length; J++) {
                N.index = J;
                O = K[J];
                $.push(' <div class="frame-widget-pane" style="display:');
                $.push(_(N.index == D ? "block": "none"));
                $.push('" id="page');
                $.push(_(O.id));
                $.push('"> ');
                $.push(O.html);
                $.push(" </div> ")
            }
            $.push(' <div class="clear" style="clear:both"></div> </div>');
            return $.join("")
        }),
        B2 = new l(function() {
            function I($) {
                return $ in H ? H[$] : this[$]
            }
            var H = arguments[0],
            F = [],
            G = I("page"),
            B = I("widget"),
            K = I("column"),
            O = I("columns"),
            A = I("widgetAction");
            function L(_, A) {
                if (A) {
                    var $ = [];
                    for (A in _) $.push({
                        key: A,
                        value: _[A]
                    });
                    return $
                }
                A = typeof _;
                return A == "number" ? new Array(_) : A == "string" ? _.split("") : _ instanceof Array ? _: L(_, 1)
            }
            I = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function _($) {
                return String($).replace(/[<>&"]/g, I)
            }
            F.push('<div class="no-widget-hint" align="center" style="display:');
            F.push(_(G.getWidgets().length == 0 ? "block": "none"));
            F.push(';font-size:14px;" id="hint');
            F.push(_(G.id));
            F.push('"> \u672c\u9875\u8fd8\u6ca1\u6709\u6dfb\u52a0\u4efb\u4f55\u6a21\u5757\u5462\uff0c\u5feb\u6839\u636e\u4f60\u7684\u9700\u6c42\uff0c\u5728\u201c\u6dfb\u52a0\u6a21\u5757\u201d\u7a97\u53e3\u9009\u62e9\u63a8\u8350\u6a21\u5757\uff0c\u6216\u8005\u5728 <a href="/widget/widget-list.action" target="_blank">\u6a21\u5757\u5206\u4eab\u5e93</a> \u8fdb\u884c\u6dfb\u52a0\u5427\uff01 </div>');
            var J = O,
            C = 0;
            J = L(J);
            H = {
                lastIndex: J.length - 1
            };
            for (; C < J.length; C++) {
                H.index = C;
                K = J[C];
                F.push('  <div class="widget-column" style="width:');
                F.push(_(K.width));
                F.push(";z-index:");
                F.push(_(10 - H.index));
                F.push('"');
                var E = K.id;
                if (E != null) F.push(' id="', _(E), '"');
                F.push("> ");
                var N = K.widgets,
                E = 0;
                N = L(N);
                var M = H;
                H = {
                    lastIndex: N.length - 1
                };
                for (; E < N.length; E++) {
                    H.index = E;
                    B = N[E];
                    F.push("  ");
                    if (B.content) {
                        F.push(" ");
                        var $ = B.content;
                        F.push(" ")
                    } else {
                        F.push(" ");
                        var D = F;
                        F = [];
                        F.push(' <img src="images/loadin.gif"/> ');
                        $ = F.join("");
                        F = D;
                        F.push(" ")
                    }
                    F.push(' <div class="widget-outer wt');
                    F.push(_(B.type));
                    F.push('" style="z-index:');
                    F.push(_(100 - H.index));
                    F.push(';position:relative;top:0;left:0;" name="widget"');
                    D = B.id;
                    if (D != null) F.push(' id="', _(D), '"');
                    F.push('> <div class="widget-inner ');
                    F.push(_(B.config.closed ? " widget-collapsed": ""));
                    F.push('"> <div class="widget-head"');
                    D = A.out(B.id);
                    if (D != null) F.push(' onmouseout="', _(D), '"');
                    D = A.over(B.id);
                    if (D != null) F.push(' onmouseover="', _(D), '"');
                    F.push('> <div class="widget-title"');
                    D = A.startDrag(B.id);
                    if (D != null) F.push(' onmousedown="', _(D), '"');
                    F.push("> ");
                    F.push(_(B.title || "\u65e0\u6807\u9898"));
                    F.push(' </div> <div class="widget-menu close-"> <div title="\u9009\u9879" style="width:90%;height:90%;top:0px;left:0px;"');
                    D = A.menu(B.id);
                    if (D != null) F.push(' onclick="', _(D), '"');
                    F.push('></div> <div class="widget-menu-outer" style="z-index:1000"> <div class="widget-menu-inner"> <a href="#"');
                    D = A.edit(B.id) + ";return false";
                    if (D != null) F.push(' onclick="', _(D), '"');
                    F.push('> \u8bbe\u7f6e </a> <a href="/widget/widget-list.action" target="_blank"> \u66f4\u591a\u6a21\u5757... </a>  <a href="javascript:void(0)"');
                    D = A.moveToOtherPage(B.id);
                    if (D != null) F.push(' onclick="', _(D), '"');
                    F.push("> \u79fb\u52a8\u5230\u5176\u4ed6\u6807\u7b7e\u9875 </a>  ");
                    if (B.template && B.template.menu) {
                        F.push(" ");
                        F.push(B.template.menu.render(B));
                        F.push(" ")
                    }
                    F.push(' </div> </div> </div> <div title="\u6700');
                    F.push(_(B.config.closed ? "\u5927": "\u5c0f"));
                    F.push('\u5316" class="widget-menu-minmax"');
                    D = A.minmax(B.id);
                    if (D != null) F.push(' onclick="', _(D), '"');
                    F.push('></div> <div title="\u5173\u95ed" class="widget-menu-close"');
                    D = A.close(B.id);
                    if (D != null) F.push(' onclick="', _(D), '"');
                    F.push('></div> <div style="clear:both;width:0;height:0;border:0;"></div> </div> <div class="widget-body"> ');
                    F.push($);
                    F.push(' </div> <div class="widget-foot"></div> </div> </div> ')
                }
                H = M;
                F.push(" </div> ")
            }
            return F.join("")
        }),
        x1 = new l(function() {
            function E($) {
                return $ in A ? A[$] : this[$]
            }
            var A = arguments[0],
            $ = [],
            C = E("widget"),
            D = E("widgetAction"),
            F = E("content");
            E = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function B($) {
                return String($).replace(/[<>&"]/g, E)
            }
            $.push('<div class="widget-inner ');
            $.push(B(C.config.closed ? " widget-collapsed": ""));
            $.push('"> <div class="widget-head"');
            var _ = D.out(C.id);
            if (_ != null) $.push(' onmouseout="', B(_), '"');
            _ = D.over(C.id);
            if (_ != null) $.push(' onmouseover="', B(_), '"');
            $.push('> <div class="widget-title"');
            _ = D.startDrag(C.id);
            if (_ != null) $.push(' onmousedown="', B(_), '"');
            $.push("> ");
            $.push(B(C.title || "\u65e0\u6807\u9898"));
            $.push(' </div> <div class="widget-menu close-"> <div title="\u9009\u9879" style="width:90%;height:90%;top:0px;left:0px;"');
            _ = D.menu(C.id);
            if (_ != null) $.push(' onclick="', B(_), '"');
            $.push('></div> <div class="widget-menu-outer" style="z-index:1000"> <div class="widget-menu-inner"> <a href="#"');
            _ = D.edit(C.id) + ";return false";
            if (_ != null) $.push(' onclick="', B(_), '"');
            $.push('> \u8bbe\u7f6e </a> <a href="/widget/widget-list.action" target="_blank"> \u66f4\u591a\u6a21\u5757... </a>  <a href="javascript:void(0)"');
            _ = D.moveToOtherPage(C.id);
            if (_ != null) $.push(' onclick="', B(_), '"');
            $.push("> \u79fb\u52a8\u5230\u5176\u4ed6\u6807\u7b7e\u9875 </a>  ");
            if (C.template && C.template.menu) {
                $.push(" ");
                $.push(C.template.menu.render(C));
                $.push(" ")
            }
            $.push(' </div> </div> </div> <div title="\u6700');
            $.push(B(C.config.closed ? "\u5927": "\u5c0f"));
            $.push('\u5316" class="widget-menu-minmax"');
            _ = D.minmax(C.id);
            if (_ != null) $.push(' onclick="', B(_), '"');
            $.push('></div> <div title="\u5173\u95ed" class="widget-menu-close"');
            _ = D.close(C.id);
            if (_ != null) $.push(' onclick="', B(_), '"');
            $.push('></div> <div style="clear:both;width:0;height:0;border:0;"></div> </div> <div class="widget-body"> ');
            $.push(F);
            $.push(' </div> <div class="widget-foot"></div> </div>');
            return $.join("")
        }),
        $2 = new l(function() {
            function D($) {
                return $ in C ? C[$] : this[$]
            }
            var C = arguments[0],
            $ = [],
            B = D("data"),
            A = D("action");
            D = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function E($) {
                return String($).replace(/[<>&"]/g, D)
            }
            $.push('<form style="margin:0" onsubmit="return false"> ');
            $.push(B.config);
            $.push(' <div class="dialog-foot"> <input value="\u786e\u5b9a" type="button"');
            var _ = A.save(B.wid);
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push('></input> <input value="\u53d6\u6d88" type="button"');
            _ = A.cancel(B.wid);
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push('></input> <input value="\u6062\u590d\u9ed8\u8ba4\u8bbe\u7f6e" type="button"');
            _ = A.reset(B.wid);
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push("></input> </div> </form>");
            return $.join("")
        }),
        q1 = new l(function() {
            function D($) {
                return $ in C ? C[$] : this[$]
            }
            var C = arguments[0],
            $ = [],
            A = D("action"),
            B = D("data");
            D = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function E($) {
                return String($).replace(/[<>&"]/g, D)
            }
            $.push('<form onsubmit="return false"> <div> <h4>\u60a8\u5e0c\u671b\u5206\u4eab\u7684\u670b\u53cbemail\u5217\u8868</h4> <textarea');
            var _ = A.checkEmail();
            if (_ != null) $.push(' onchanged="', E(_), '"');
            _ = A.checkEmail();
            if (_ != null) $.push(' onkeyup="', E(_), '"');
            $.push(' type="text" style="width:400px;" name="mailAddress"> </textarea> </div> <p>\u6362\u884c\u9694\u5f00\u591a\u4e2a\u90ae\u4ef6</p> <div class="dialog-foot"> <button');
            _ = A.sendEmail(B.wid);
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push(">\u786e\u5b9a</button><button");
            _ = A.cancel(B.wid);
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push(">\u53d6\u6d88</button> </div> </form>");
            return $.join("")
        }),
        A2 = new l(function() {
            function I($) {
                return $ in G ? G[$] : this[$]
            }
            var G = arguments[0],
            H = [],
            _ = I("action"),
            F = I("hotWidgets"),
            A = I("item");
            function $(A, B) {
                if (B) {
                    var _ = [];
                    for (B in A) _.push({
                        key: B,
                        value: A[B]
                    });
                    return _
                }
                B = typeof A;
                return B == "number" ? new Array(A) : B == "string" ? A.split("") : A instanceof Array ? A: $(A, 1)
            }
            I = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function D($) {
                return String($).replace(/[<>&"]/g, I)
            }
            H.push('<div class="clear" style="clear:both;text-align:right;"> <a href="javascript:void(0)" class="top-collapse"');
            var B = _.showPanel("widgetLib");
            if (B != null) H.push(' onclick="', D(B), '"');
            H.push('>\u5173\u95ed</a> </div><div class="recommend"> ');
            var C = F.slice(0, 6),
            B = 0;
            C = $(C);
            for (; B < C.length; B++) {
                A = C[B];
                H.push(' <div class="cell"> <div class="widget-icon"> <img width="75" height="50" style="border:1px solid #FFF;display:block" src="/images/widget/icon/');
                H.push(D(A.id));
                H.push('.jpg"/> </div> <div style="text-align:left;width:135px"> <div class="cell-title"> <input');
                var E = A.value;
                if (E != null) H.push(' value="', D(E), '"');
                H.push(' type="checkbox"');
                E = _.onWidgetChecked(A.value);
                if (E != null) H.push(' onclick="', D(E), '"');
                H.push("></input> ");
                H.push(D(A.title));
                H.push(" </div> ");
                if (A.description.length > 28) {
                    H.push(" <div");
                    E = A.description;
                    if (E != null) H.push(' title="', D(E), '"');
                    H.push(' style="padding-right:5px;"> ');
                    H.push(D(A.description.substring(0, 26)));
                    H.push("... </div> ")
                } else {
                    H.push(' <div style="padding-right:5px;"> ');
                    H.push(D(A.description));
                    H.push(" </div> ")
                }
                H.push(" </div> </div> ")
            }
            H.push(' <div class="clear"></div> </div>');
            C = F.slice(6, 24),
            B = 0;
            C = $(C);
            for (; B < C.length; B++) {
                A = C[B];
                H.push(' <div style="float: left;text-align:left;width: 16%;"> ');
                if (A.select) {
                    H.push(" <input");
                    E = A.value;
                    if (E != null) H.push(' value="', D(E), '"');
                    H.push(' type="checkbox"');
                    E = _.onWidgetChecked(A.value);
                    if (E != null) H.push(' onclick="', D(E), '"');
                    H.push(' checked="true"></input> ')
                } else {
                    H.push(" <input");
                    E = A.value;
                    if (E != null) H.push(' value="', D(E), '"');
                    H.push(' type="checkbox"');
                    E = _.onWidgetChecked(A.value);
                    if (E != null) H.push(' onclick="', D(E), '"');
                    H.push("></input> ")
                }
                H.push(" <label>");
                H.push(D(A.title));
                H.push("</label> </div> ")
            }
            H.push('<div style="clear:both;border-bottom:1px dashed #B2B2B2;margin:0 0 15px 2px;width:100%;height:15px;line-height:15px;"></div><div style="clear:both;text-align:center;padding-top:10px"> <input value="\u6dfb\u52a0\u9009\u4e2d\u7684\u6a21\u5757" type="button" style="height:28px;line-height:20px;width:115px;margin-right:5px;;padding:0;"');
            B = _.widgetLibSubmit();
            if (B != null) H.push(' onclick="', D(B), '"');
            H.push('></input> <input value="\u53d6\u6d88\u8bbe\u7f6e" type="button" style="height:28px;line-height:20px;width:75px;margin-right:80px;padding:0"');
            B = _.showPanel("widgetLib");
            if (B != null) H.push(' onclick="', D(B), '"');
            H.push('></input> </div><div class="add-rss"> <a href="widget/widget-list.action" target="_blank"><div style="background:url(images/more-button.gif) left center;float:right;width:83px;height:25px;"></div></a> <a href="javascript:void(0);"');
            B = _.addRss();
            if (B != null) H.push(' onclick="', D(B), '"');
            H.push('><div style="background:url(images/more-button.gif) left top;float:right;margin-right:5px;width:88px;height:25px;"></div></a> </div>');
            return H.join("")
        }),
        K = new l(function() {
            function A($) {
                return $ in _ ? _[$] : this[$]
            }
            var _ = arguments[0],
            $ = [],
            B = A("ActiveXObject"),
            C = A("headHTML"),
            D = A("frameHTML");
            $.push('<div id="main"> <div id="head"> ');
            $.push(C);
            $.push(' </div> <div style="z-index:100" id="frame"> ');
            $.push(D);
            $.push(' </div> <div id="foot"> <div class="foot-inner" style="z-index:1000;"> <div class="foot-spacer" style="width:100%;"> <p style="height:14px"> <a href="http://e.baidu.com">\u52a0\u5165\u767e\u5ea6\u63a8\u5e7f</a> | <a href="http://top.baidu.com">\u641c\u7d22\u98ce\u4e91\u699c</a> | <a href="http://www.baidu.com/home.html">\u5173\u4e8e\u767e\u5ea6</a> | <a href="http://ir.baidu.com">About Baidu</a> </p> <p> <div class="copyright">\xa92009 Baidu</div> </p> </div> </div> </div> </div><div id="popup"> <div style="z-index: 1;" id="cover"> ');
            if (B) $.push(' <iframe width="100%" height="100%" style="filter:alpha(opacity=0);opacity:0"></iframe> ');
            $.push(' </div> <div style="z-index: 2;" id="dialog"></div> </div><div style="z-index: 1000;" id="tooltip"></div>');
            return $.join("")
        }),
        C2 = new l(function() {
            function D($) {
                return $ in A ? A[$] : this[$]
            }
            var A = arguments[0],
            B = [],
            H = D("data"),
            F = D("action"),
            _ = D("item");
            function C(_, A) {
                if (A) {
                    var $ = [];
                    for (A in _) $.push({
                        key: A,
                        value: _[A]
                    });
                    return $
                }
                A = typeof _;
                return A == "number" ? new Array(_) : A == "string" ? _.split("") : _ instanceof Array ? _: C(_, 1)
            }
            D = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function G($) {
                return String($).replace(/[<>&"]/g, D)
            }
            B.push('<div id="configContent"> ');
            var $ = H.moreItems,
            E = 0;
            $ = C($);
            for (; E < $.length; E++) {
                _ = $[E];
                B.push(' <div style="float:left;word-break:keep-all;width:90px;"> <label style="display:inline-block"> ');
                if (_.checked) B.push(' <input type="checkbox" checked="true"></input> ');
                else B.push(' <input type="checkbox"></input> ');
                B.push(" ");
                B.push(G(_.title));
                B.push(" </label> </div> ")
            }
            B.push(' <div class="clear"></div> </div><div class="dialog-foot"> <button');
            E = F.ok();
            if (E != null) B.push(' onclick="', G(E), '"');
            B.push(">\u786e\u5b9a</button> <button");
            E = F.cancel();
            if (E != null) B.push(' onclick="', G(E), '"');
            B.push(">\u53d6\u6d88</button> <button");
            E = F.reset();
            if (E != null) B.push(' onclick="', G(E), '"');
            B.push(">\u6062\u590d\u9ed8\u8ba4\u8bbe\u7f6e</button> </div>");
            return B.join("")
        }),
        _2 = new l(function() {
            function D($) {
                return $ in C ? C[$] : this[$]
            }
            var C = arguments[0],
            $ = [],
            B = D("data"),
            A = D("action");
            D = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function E($) {
                return String($).replace(/[<>&"]/g, D)
            }
            $.push('<p> <h6 style="font-size:12px;font-weight:700;display:inline;padding-right:15px;">\u662f\u5426\u5728\u641c\u7d22\u65f6\u663e\u793a\u641c\u7d22\u6846\u63d0\u793a</h6> <a href="http://www.baidu.com/search/faq_mp3.html#08" target="_blank">\u4ec0\u4e48\u662f\u641c\u7d22\u6846\u63d0\u793a\uff1f</a> </p><p id="suggestRadio"> ');
            if (B.isShowSuggest) $.push(' <input type="radio" checked="checked" name="showSuggest" id="doShowSuggest"></input><label for="doShowSuggest">\u663e\u793a</label> <input type="radio" name="showSuggest" id="noShowSuggest"></input><label for="noShowSuggest">\u4e0d\u663e\u793a</label> ');
            else $.push(' <input type="radio" name="showSuggest" id="doShowSuggest"></input><label for="doShowSuggest">\u663e\u793a</label> <input type="radio" checked="checked" name="showSuggest" id="noShowSuggest"></input><label for="noShowSuggest">\u4e0d\u663e\u793a</label> ');
            $.push(' </p><div class="dialog-foot"> <button');
            var _ = A.ok();
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push(">\u786e\u5b9a</button> <button");
            _ = A.cancel();
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push(">\u53d6\u6d88</button> <button");
            _ = A.reset();
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push(">\u6062\u590d\u9ed8\u8ba4\u8bbe\u7f6e</button> </div>");
            return $.join("")
        }),
        z1 = new l(function() {
            function D($) {
                return $ in C ? C[$] : this[$]
            }
            var C = arguments[0],
            B = [],
            A = D("action");
            D = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function $($) {
                return String($).replace(/[<>&"]/g, D)
            }
            B.push("<div> <h4>\u60a8\u5e0c\u671b\u5206\u4eab\u7684\u670b\u53cbemail\u5217\u8868</h4> <textarea");
            var _ = A.checkEmail();
            if (_ != null) B.push(' onchanged="', $(_), '"');
            _ = A.checkEmail();
            if (_ != null) B.push(' onkeyup="', $(_), '"');
            B.push(' type="text" style="width:400px;" id="mailAddress"> </textarea> </div><div class="dialog-foot"> <button');
            _ = A.ok();
            if (_ != null) B.push(' onclick="', $(_), '"');
            B.push(">\u786e\u5b9a</button> <button");
            _ = A.cancel();
            if (_ != null) B.push(' onclick="', $(_), '"');
            B.push(">\u53d6\u6d88</button> </div>");
            return B.join("")
        }),
        D2 = new l(function() {
            function L($) {
                return $ in G ? G[$] : this[$]
            }
            var G = arguments[0],
            E = [],
            K = L("widgetsInfo"),
            _ = L("cols"),
            B = L("info"),
            A = L("widget"),
            D = L("action"),
            $ = L("col");
            function N(_, A) {
                if (A) {
                    var $ = [];
                    for (A in _) $.push({
                        key: A,
                        value: _[A]
                    });
                    return $
                }
                A = typeof _;
                return A == "number" ? new Array(_) : A == "string" ? _.split("") : _ instanceof Array ? _: N(_, 1)
            }
            L = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function M($) {
                return String($).replace(/[<>&"]/g, L)
            }
            var F = _,
            H = 0;
            F = N(F);
            for (; H < F.length; H++) {
                $ = F[H];
                E.push(' <div style="float:left;width:');
                E.push(M($.width));
                E.push('"> ');
                var I = $.widgets,
                J = 0;
                I = N(I);
                for (; J < I.length; J++) {
                    A = I[J];
                    E.push(" ");
                    B = K[A.type];
                    E.push(' <div class="widget-head"> <div class="widget-title"> ');
                    E.push(M(A.title));
                    E.push(" ");
                    if (A.isRepeat) {
                        E.push(" <input");
                        var C = A.id;
                        if (C != null) E.push(' value="', M(C), '"');
                        E.push(' type="checkbox"');
                        C = D.onWidgetChecked(A.type);
                        if (C != null) E.push(' onclick="', M(C), '"');
                        E.push("></input> ")
                    } else {
                        E.push(" <input");
                        C = A.id;
                        if (C != null) E.push(' value="', M(C), '"');
                        E.push(' type="checkbox"');
                        C = D.onWidgetChecked(A.type);
                        if (C != null) E.push(' onclick="', M(C), '"');
                        E.push(' checked="true"></input> ')
                    }
                    E.push(' </div> </div> <div class="widget-body" style="text-align:left;padding:10px;"> <div>\u7b80\u4ecb: ');
                    E.push(M(B.description));
                    E.push("</div> <div> \u63d0\u4f9b\u8005\uff1a <font>");
                    E.push(M(B.authorName));
                    E.push("</font> \u4f7f\u7528\u4eba\u6570\uff1a <font>");
                    E.push(M(B.refCount));
                    E.push('</font> </div> </div> <div class="widget-foot"></div> ')
                }
                if (!J) E.push(' <div style="font-size:0;height:1px;width:100%"></div> ');
                E.push(" </div> ")
            }
            E.push('<div style="clear:both"></div>');
            return E.join("")
        }),
        w1 = new l(function() {
            function D($) {
                return $ in C ? C[$] : this[$]
            }
            var C = arguments[0],
            $ = [],
            A = D("action"),
            B = D("widget");
            D = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function E($) {
                return String($).replace(/[<>&"]/g, D)
            }
            $.push('<div class="widget-head"> <div class="widget-title">');
            $.push(E(B.title));
            $.push('</div> </div><div class="widget-body" style="text-align:left;padding:10px;"> <div>\u7b80\u4ecb: ');
            $.push(E(B.description));
            $.push("</div> <div> \u63d0\u4f9b\u8005\uff1a <font>");
            $.push(E(B.authorName));
            $.push("</font> \u4f7f\u7528\u4eba\u6570\uff1a <font>");
            $.push(E(B.refCount));
            $.push("</font> </div> <center> <input");
            var _ = B.id;
            if (_ != null) $.push(' value="', E(_), '"');
            $.push(' type="checkbox"');
            _ = A.onWidgetChecked(B.type);
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push(' checked="true"></input> ');
            if (B.isRepeat) $.push(' <input value="\u5df2\u4f7f\u7528, \u518d\u6dfb\u52a0\u4e00\u6b21" type="button" onclick="addPage()"> </input> ');
            else $.push(' <input value="\u6dfb\u52a0\u5230ibaidu" type="button" onclick="addPage()"> </input> ');
            $.push(' </center> </div><div class="widget-foot"></div>');
            return $.join("")
        }),
        s1 = new l(function() {
            function D($) {
                return $ in C ? C[$] : this[$]
            }
            var C = arguments[0],
            $ = [],
            A = D("action"),
            B = D("data");
            D = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function E($) {
                return String($).replace(/[<>&"]/g, D)
            }
            $.push('<form onsubmit="');
            $.push(E(A.ok()));
            $.push(';return false;"> <div id="configContent"> <div style="margin-bottom:8px;"> RSS\u540d\u79f0\uff1a <input');
            var _ = B.title;
            if (_ != null) $.push(' value="', E(_), '"');
            $.push(' type="text" size="10" id="rssTitle"></input> </div> <div> RSS\u5730\u5740\uff1a <input');
            _ = B.url;
            if (_ != null) $.push(' value="', E(_), '"');
            $.push(' type="text" size="40" id="rssURL"></input> </div> </div> <div class="dialog-foot"> <input value="\u786e\u5b9a" type="submit" name="b1"></input> <input value="\u53d6\u6d88" type="button"');
            _ = A.cancel();
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push(' name="b2"></input> </div> </form>');
            return $.join("")
        }),
        k1 = new l(function() {
            function E($) {
                return $ in A ? A[$] : this[$]
            }
            var A = arguments[0],
            $ = [],
            B = E("_cancel"),
            C = E("title"),
            G = E("content"),
            D = E("_drag");
            E = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function F($) {
                return String($).replace(/[<>&"]/g, E)
            }
            $.push('<div class="dialog-inner"> <table width="100%" cellpadding="0" class="dialog-border" cellspacing="1" border="0"> <tbody> <tr class="edit-header"> <td style="background:font-size: 14px; line-height: 24px; color: #CDCDCD; text-indent: 10px; font-weight: bold; text-align: left; cursor: move;"');
            var _ = D();
            if (_ != null) $.push(' onmousedown="', F(_), '"');
            $.push("> ");
            $.push(F(C));
            $.push(' <div style="position: absolute; right: 10px; top: 5px;"> <div class="dialog-close-img" style="cursor: pointer;"');
            _ = B();
            if (_ != null) $.push(' onclick="', F(_), '"');
            $.push('></div> </div> </td> </tr> <tr> <td style="padding: 8px; background: white none repeat; text-align: left; font-size: 12px;"> ');
            $.push(G);
            $.push(" </td> </tr> </tbody> </table> </div>");
            return $.join("")
        }),
        t1 = new l(function() {
            function _($) {
                return $ in B ? B[$] : this[$]
            }
            var B = arguments[0],
            H = [],
            C = _("data"),
            E = _("action");
            function $(A, B) {
                if (B) {
                    var _ = [];
                    for (B in A) _.push({
                        key: B,
                        value: A[B]
                    });
                    return _
                }
                B = typeof A;
                return B == "number" ? new Array(A) : B == "string" ? A.split("") : A instanceof Array ? A: $(A, 1)
            }
            _ = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function D($) {
                return String($).replace(/[<>&"]/g, _)
            }
            H.push('<div id="moveDialog');
            H.push(D(C.wid));
            H.push('"> <div style="padding-bottom:10px">\u60a8\u5e0c\u671b\u8be5\u6a21\u5757\u79fb\u52a8\u5230\u54ea\u4e2a\u9875\u7b7e\u5f53\u4e2d\u53bb\uff1f</div> ');
            var I = C.pages,
            F = 0;
            I = $(I);
            B = {
                lastIndex: I.length - 1
            };
            for (; F < I.length; F++) {
                B.index = F;
                var A = I[F];
                H.push(' <div style="float:left;word-break:keep-all;width:25%"> <input');
                var G = B.index;
                if (G != null) H.push(' value="', D(G), '"');
                H.push(' type="radio"');
                G = B.index == C.selectedIndex ? "true": null;
                if (G != null) H.push(' checked="', D(G), '"');
                H.push(' name="_pages"></input> ');
                H.push(D(C.titles[B.index]));
                H.push(" </div> ")
            }
            H.push(' <div class="clear"></div> </div><div class="dialog-foot"> <button');
            F = E.move(C.wid);
            if (F != null) H.push(' onclick="', D(F), '"');
            H.push(">\u786e\u5b9a</button><button");
            F = E.cancel(C.wid);
            if (F != null) H.push(' onclick="', D(F), '"');
            H.push(">\u53d6\u6d88</button> </div>");
            return H.join("")
        }),
        r1 = new l(function() {
            function A($) {
                return $ in H ? H[$] : this[$]
            }
            var H = arguments[0],
            $ = [],
            G = A("action"),
            _ = A("item"),
            B = A("suggests"),
            C = A("index");
            function J(_, A) {
                if (A) {
                    var $ = [];
                    for (A in _) $.push({
                        key: A,
                        value: _[A]
                    });
                    return $
                }
                A = typeof _;
                return A == "number" ? new Array(_) : A == "string" ? _.split("") : _ instanceof Array ? _: J(_, 1)
            }
            A = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function I($) {
                return String($).replace(/[<>&"]/g, A)
            }
            $.push('<div class="suggest-div"> ');
            var F = B,
            E = 0;
            F = J(F);
            H = {
                lastIndex: F.length - 1
            };
            for (; E < F.length; E++) {
                H.index = E;
                _ = F[E];
                $.push(' <div style="cursor:default;border:0;zoom:1;padding:2px;font:14px verdana;');
                $.push(I(H.index == C ? "background-color:#36c;color:#fff": ""));
                $.push('"');
                var D = G.itemClick(H.index);
                if (D != null) $.push(' onmouseup="', I(D), '"');
                D = G.update(H.index, false);
                if (D != null) $.push(' onmousemove="', I(D), '"');
                D = G.itemKeydown(H.index);
                if (D != null) $.push(' onkeydown="', I(D), '"');
                $.push("> ");
                $.push(I(_));
                $.push(" </div> ")
            }
            $.push(' <p class="close-suggest"><a href="javascript:void(0);"');
            E = G.closeTooltips();
            if (E != null) $.push(' onclick="', I(E), '"');
            $.push(">\u5173\u95ed</a></p> </div>");
            return $.join("")
        }),
        y1 = new l(function() {
            function A($) {
                return $ in C ? C[$] : this[$]
            }
            var C = arguments[0],
            $ = [],
            B = A("title"),
            D = A("close");
            A = function($) {
                return "&#" + $.charCodeAt() + ";"
            };
            function E($) {
                return String($).replace(/[<>&"]/g, A)
            }
            $.push('<table cellpadding="0" cellspacing="0" border="0"> <tr> <td class="bubble-left"></td> <td class="bubble-body">');
            $.push(E(B));
            $.push('</td> <td class="bubble-right"></td> </tr> </table><div class="bubble-bottom"></div><a href="javascript:void(0)" class="bubble-close"');
            var _ = D();
            if (_ != null) $.push(' onclick="', E(_), '"');
            $.push("> </a>");
            return $.join("")
        })
    } catch(E2) {}
    function F2(_, $, A) {
        if (_) this.time = parseInt(_ * 1000);
        if ($) this.transform = $;
        if (A) this.interval = A
    }
    function G2($) {
        return $.constructor == String ? document.getElementById($) : $
    }
    F2.prototype = {
        interval: 40,
        transform: function($) {
            return 1 - Math.pow(1 - $, 3)
        },
        time: 2000,
        start: function(E, A, D) {
            D = D || this.transform;
            function _() {
                G += F;
                var _ = G / C;
                if (_ >= 1) {
                    E(1);
                    A();
                    clearInterval(B)
                } else E(D(_) / $)
            }
            var F = this.interval,
            C = this.time,
            $ = D(1),
            G = 0,
            B = setInterval(_, F);
            return B
        },
        moveBy: function(A, B, E, C) {
            A = G2(A);
            var F = A.offsetLeft,
            G = A.offsetTop,
            $ = A.style;
            $.position = "absolute";
            function D(_) {
                $.left = parseInt(F + _ * B) + "px";
                $.top = parseInt(G + _ * E) + "px"
            }
            function _() {
                A = $ = null;
                C && C()
            }
            return this.start(D, _)
        },
        opacity: function(A, B, E, C) {
            A = G2(A);
            var F = E - B,
            $ = true;
            function D(_) {
                _ = B + F * _;
                if (A.style.filter != null) A.style.filter = (_ > 0.999) ? "": "alpha(opacity=" + _ * 100 + ")";
                else A.style.opacity = _;
                if ($) {
                    $ = false;
                    A.style.display = "block"
                }
            }
            function _() {
                if (E == 0) A.style.display = "none";
                A = null;
                C && C()
            }
            return this.start(D, _)
        }
    }
    var I2 = new O0("sugg", "/", new Date(2500, 1, 1)),
    Q2,
    M2,
    H2,
    L2,
    O2,
    R2,
    N2,
    P2 = false,
    Suggest = {
        data: {
            suggests: []
        },
        setEnable: function(_, $) {
            P2 = _;
            _ ? I2.remove() : I2.set("1");
            Suggest.setAutocomplete($ != null ? $: !_)
        },
        isEnable: function() {
            return ! I2.get()
        },
        displaySuggestContent: function($) {
            E(O2).show($ ? "block": "none");
            P2 = $
        },
        setAutocomplete: function(_, $) {
            var A = E(L2);
            A.blur();
            A.setAttribute("autocomplete", _ ? "on": "off"); ! $ && A.focus()
        },
        updateKeyword: function($, _) {
            if (window.event && window.event.keyCode == 27) return;
            P2 = true;
            $ = $ || E(L2).value;
            Q2 = $;
            $ || Suggest.displaySuggestContent(false);
            if (_) H2 = M2 = $
        },
        itemKeydown: function($, A) {
            var _ = A.keyCode; (_ == 13) && Suggest.submit($)
        },
        initialize: function(A, $) {
            var _ = E($);
            O2 = _.id;
            L2 = E(A).id;
            _.insertBefore((new c("div")).addClass("suggest-container"), _.firstChild);
            R2 = setInterval(J2, 300);
            Suggest.setAutocomplete(!Suggest.isEnable());
            E(O2).style.width = E(L2).offsetWidth + "px";
            E(O2).firstChild.style.width = E(L2).offsetWidth - 2 + "px"
        },
        itemClick: function($) {
            E(L2).value = Suggest.data.suggests[$];
            Suggest.updateKeyword(null, true);
            E(L2).form.submit();
            setTimeout(function() {
                Suggest.displaySuggestContent(false)
            },
            300);
            addStatistics("k1=click&k2=search&k3=web")
        },
        update: function($, B) {
            var A = Suggest.data;
            if ($ != A.index) {
                var _ = A.suggests.length;
                A.index = $ = $ >= _ ? -1 : $ < -1 ? _ - 1 : $ % 10;
                A.action = suggestAction;
                if (B) E(L2).value = H2 = M2 = Q2 = A.suggests[$] || "";
                A = r1.render(A);
                setTimeout(function() {
                    E(O2).firstChild.innerHTML = A;
                    Suggest.displaySuggestContent(_)
                },
                0)
            }
        },
        closeTooltips: function($) {
            p($);
            E(O2).firstChild.firstChild.innerHTML = "<div style='background:#FF0;width:100%;'>\u63d0\u793a\u529f\u80fd\u5df2\u5173\u95ed\uff0c\u60a8\u53ef\u4ee5\u5728\u8bbe\u7f6e\u4e2d\u518d\u6b21\u542f\u7528\u3002</div>";
            Suggest.setEnable(false, false);
            P2 = true;
            N2 = setTimeout(function() {
                var $ = E(O2).firstChild;
                $ && new F2().opacity($, 1, 0,
                function() {
                    $.style.filter = "alpha(opacity=100)";
                    $.style.opacity = 1;
                    $.style.display = "block";
                    Suggest.setAutocomplete(true);
                    E(O2).firstChild.firstChild && (E(O2).firstChild.firstChild.innerHTML = "");
                    Suggest.displaySuggestContent(false)
                })
            },
            3000)
        },
        callback: function($) {
            H2 = Q2;
            Suggest.data = $;
            P2 && Suggest.update( - 1)
        }
    },
    suggestAction = v(Suggest),
    K2 = L(); (window.baidu || (window.baidu = {})).sug = function($) {
        $.s[ - 1] = $.q;
        Suggest.callback({
            suggests: $.s
        })
    };
    function J2() {
        if (Suggest.isEnable() && Q2 && Q2 != M2) {
            var $ = E(K2);
            $ && $.remove();
            $ = document.createElement("script");
            $.id = K2;
            $.src = "http://suggestion.baidu.com/su?wd=" + encodeURIComponent(Q2) + "&p=3&t=" + (new Date()).getTime();
            $.charset = "gb2312";
            M2 = Q2;
            document.body.appendChild($)
        }
    }
    E(document).attach("keydown",
    function($) {
        switch ($.keyCode) {
        case 38:
        case 40:
            if (E(O2).style.display != "none") Suggest.update(Suggest.data.index - 39 + $.keyCode, true);
            else {
                M2 = "";
                Suggest.updateKeyword()
            }
            break;
        case 27:
            if ($.preventDefault) $.preventDefault();
            else $.returnValue = false;
        case 9:
            Suggest.displaySuggestContent(false);
            break
        }
    }).attach("click",
    function() {
        if (P2) {
            if (N2) {
                clearTimeout(N2);
                Suggest.setAutocomplete(!Suggest.isEnable(), true)
            }
            E(O2).firstChild.firstChild && (E(O2).firstChild.firstChild.innerHTML = "");
            Suggest.displaySuggestContent(false);
            P2 = false
        }
    }) var U2 = {
        tieba: "http://tieba.baidu.com/f",
        news: "http://news.baidu.com/ns?cl=2&rn=20&tn=news",
        zhidao: "http://zhidao.baidu.com/q?&ct=17&pn=0&tn=ikaslist&rn=10&lm=0&fr=search",
        mp3: "http://mp3.baidu.com/m?tn=baidump3&ct=134217728&lm=-1",
        video: "http://video.baidu.com/v?ct=301989888&rn=20&pn=0&db=0&s=25",
        image: "http://image.baidu.com/i?tn=baiduimage&ct=201326592&lm=-1&cl=2&t=3"
    },
    S1 = {
        overMore: function() {},
        outMore: function() {},
        login: function() {
            N.popup(null, {})
        },
        addStatistics: addStatistics,
        search: function(C, _) {
            var $ = E("searchInput");
            if ($.value.length > 0) {
                if (_.preventDefault) _.preventDefault();
                else _.returnValue = false;
                var A = $.value,
                B = E("searchNaviForm");
                E("searchQ").innerHTML = "";
                E("searchWord").value = A;
                E("searchKW").value = A;
                B.method = "get";
                B.target = "_blank";
                B.action = U2[C];
                if (C == "zhidao") E("searchQ").innerHTML = '<input name="ct" value="17" /><input name="tn" value="ikaslist" />';
                if (C == "image") E("searchQ").innerHTML = '<input name="ct" value="201326592" /><input name="lm" value="-1" />';
                B.submit()
            }
            addStatistics("k1=click&k2=search&k3=" + C);
            return false
        },
        logout: function() {
            O.clear()
        },
        setHome: function() {
            addStatistics("k1=click&k2=homepage&k3=1");
            var $ = this,
            A = window.location;
            try {
                $.style.behavior = "url(#default#homepage)";
                $.setHomePage(A)
            } catch(B) {
                if (window.netscape) {
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                    } catch(B) {
                        return false
                    }
                    var _ = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
                    _.setCharPref("browser.startup.homepage", A)
                }
            }
            return false
        },
        editMenu: function(B) {
            if (B.preventDefault) B.preventDefault();
            else {
                B.cancelBubble = true;
                B.returnValue = false
            }
            var _ = {};
            _.moreItems = U1;
            var A = O.getWidgetConfig(X1) || V1;
            for (var $ = 0; $ < _.moreItems.length; $++) _.moreItems[$].checked = A[$] || false;
            a2.popup(null, _);
            setTimeout(c2, 20);
            setTimeout(c2, 50)
        },
        clickMore: function(_) {
            var $ = E(this.getElementsByTagName("div")[0]);
            if ($.style.display == "inline") return;
            j2 = $.uid();
            setTimeout(l2, 0)
        },
        dblclickMore: function() {
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            return false
        },
        updateSuggest: function() {
            Suggest.updateKeyword(null, false)
        },
        setSuggestStatus: function(_) {
            if (_.preventDefault) _.preventDefault();
            else {
                _.cancelBubble = true;
                _.returnValue = false
            }
            if (_.stopPropagation) _.stopPropagation();
            else _.cancelBubble = true;
            var $ = {};
            $.isShowSuggest = Suggest.isEnable();
            T2.popup(null, $)
        }
    },
    a2 = new Dialog("\u66f4\u591a\u83dc\u5355\u8bbe\u7f6e", C2, v({
        ok: function() {
            var A = E("configContent"),
            C = A.getElementsByTagName("input"),
            B = [];
            for (var $ = 0; $ < C.length; $++) {
                var _ = C[$];
                B.push(_.checked)
            }
            O.updateWidgetConfig(X1, B,
            function() {
                M.repaint()
            });
            a2.dispose()
        },
        reset: function() {
            var _ = {};
            _.moreItems = U1;
            var A = V1;
            for (var $ = 0; $ < _.moreItems.length; $++) _.moreItems[$].checked = A[$] || false;
            a2.reset(null, _)
        },
        cancel: function() {
            a2.dispose()
        }
    })),
    T2 = new Dialog("\u8bbe\u7f6e\u641c\u7d22", _2, v({
        ok: function() {
            var _ = E("suggestRadio"),
            $ = _.getElementsByTagName("input");
            Suggest.setEnable($[0].checked);
            T2.dispose()
        },
        reset: function() {
            var $ = {
                isShowSuggest: true
            };
            T2.reset(null, $)
        },
        cancel: function() {
            T2.dispose()
        }
    })),
    k2,
    o2,
    Z2 = [[{
        width: "33%"
    },
    {
        width: "34%"
    },
    {
        width: "33%"
    }], [{
        width: "66%"
    },
    {
        width: "34%"
    }], [{
        width: "34%"
    },
    {
        width: "66%"
    }], [{
        width: "25%"
    },
    {
        width: "42%"
    },
    {
        width: "33%"
    }], [{
        width: "39%"
    },
    {
        width: "39%"
    },
    {
        width: "22%"
    }], [{
        width: "50%"
    },
    {
        width: "50%"
    }]],
    e2,
    h2 = ["widgetLib", "notice", "theme"],
    f2,
    J = {
        addStatistics: addStatistics,
        showPanel: function(M, N) {
            if (M == "userfeed") {
                var I = E("searchNaviForm");
                E("searchWord").value = "";
                E("searchKW").value = "\u767e\u5ea6\u5de5\u5177\u680f\u4e2a\u6027\u5316\u9996\u9875";
                E("searchQ").innerHTML = "";
                I.method = "get";
                I.target = "_blank";
                I.action = "http://tieba.baidu.com/f";
                I.submit();
                return
            }
            var M = M ? (f2 = M) : f2,
            R = E(M + "Button"),
            L = E("frameButtonContainer"),
            F = L.firstChild;
            n2();
            g2();
            while (F) {
                if (F.className && F.className.indexOf("frame-button") != -1) if (F == R) E(F).addClass("select");
                else E(F).removeClass("select");
                F = F.nextSibling
            }
            var C = false,
            A, J;
            for (var S = 0; S < h2.length; S++) if (h2[S] == M) {
                var K = E(M),
                G = (E(M).getRuntimeStyle().display || E(M).currentStyle.display);
                if (G != "none") {
                    J = K;
                    var _ = K.clientHeight || K.offsetHeight
                } else {
                    K.show("block");
                    _ = K.clientHeight || K.offsetHeight;
                    K.style.height = "0px";
                    var B = K.getRuntimeStyle().paddingTop || K.currentStyle.paddingTop;
                    K.style.paddingTop = "0px";
                    C = true
                }
            } else E(h2[S]).style.display = "none";
            if (e2) e2.finish();
            e2 = new S2(0.4,
            function($) {
                return $
            },
            60);
            if (C) {
                K.style.overflow = "hidden";
                var Q = true;
                function H($) {
                    if (K.style.height == "auto") return;
                    K.style.height = parseInt(_ * $) + "px";
                    if (_ * $ > parseInt(B) && Q) {
                        K.style.paddingTop = B;
                        K.style.height = "0px";
                        Q = false
                    }
                }
                function $() {
                    if (K.style.height == "auto") return;
                    K.style.height = "auto";
                    e2 = null;
                    setTimeout(function() {
                        document.body.style.display = "none";
                        document.body.style.display = "";
                        if (N === true) X2.editPageTitle(O.getCurrentPage().id, {})
                    },
                    0)
                }
                if (M == "notice") E("noticeContent").innerHTML = O.noticeText;
                if (M == "notice" && N == "initNotice") {
                    H(0.4);
                    $();
                    q();
                    return
                }
                e2.start(H, $);
                q()
            } else {
                J.style.height = parseInt(_) + "px";
                J.style.overflow = "hidden";
                function P($) {
                    if (J.style.height == "auto") return;
                    J.style.height = parseInt(_ * (1 - $)) + "px"
                }
                function D() {
                    if (J.style.height == "auto") return;
                    J.style.height = "auto";
                    J.hide();
                    R.removeClass("select");
                    e2 = null;
                    q()
                }
                e2.start(P, D)
            }
        },
        setColumn: function($) {
            O.setColumnStyle(Z2[$], $,
            function($) {
                $.getCurrentPage().layout.repaint();
                n2()
            })
        },
        setTheme: function(_, A) {
            var B = document.createElement("link");
            B.rel = "stylesheet";
            B.type = "text/css";
            function $() {
                var D = document.getElementsByTagName("head")[0],
                E = D.getElementsByTagName("link"),
                $ = E[0].href;
                $ = $.substring($.lastIndexOf("?"));
                B.href = "/styles/skin" + _ + "/skin.css?" + $;
                for (var A = 0,
                C; C = E[A]; A++) if (C.href.indexOf("skin") > -1) C.parentNode.removeChild(C);
                document.getElementsByTagName("head")[0].appendChild(B)
            }
            $();
            O.setTheme(_)
        },
        onWidgetChecked: function(A, C) {
            var $ = S.hotWidgets[parseInt(A)],
            _ = $.id;
            if (this.isSelect != null) {
                this.isSelect = null;
                return
            }
            var B = $.config;
            if (this.checked) this.isSelect = true;
            else this.isSelect = false
        },
        widgetLibSubmit: function() {
            var $ = E("widgetLib").getElementsByTagName("input"),
            D = [],
            B = [];
            for (var F = 0,
            H = $.length; F < H; F++) {
                var C = $[F];
                if (C.type != "checkbox") continue;
                var _ = S.hotWidgets[parseInt(C.value)],
                A = _.id,
                G = _.config;
                if (C.checked == false && C.isSelect == false) B.push({
                    type: A,
                    config: G
                });
                else if (C.isSelect) D.push({
                    type: A,
                    config: G
                })
            }
            O.addWidgets(D,
            function(_, $) {
                $.layout.repaint(function() {
                    for (var $ = 0; $ < _.length; $++) _[$].initialize()
                })
            })
        },
        addRss: function() {
            i2.popup(null, {})
        },
        login: function() {
            N.popup(null, {})
        },
        cancelLogin: function() {
            O.loginSuggestHide()
        }
    },
    N = new Dialog("\u60a8\u5c1a\u672a\u767b\u5f55", u1, {}),
    i2 = new Dialog("\u6dfb\u52a0RSS", s1, v({
        ok: function() {
            var _ = E("rssURL").value,
            A = E("rssTitle").value;
            if (A.length == 0) {
                alert("\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a!");
                return true
            }
            if (_.length == 0) {
                alert("\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a!");
                return true
            }
            var $ = {
                count: 10,
                url: _,
                title: A
            };
            _ = "data/rsschannel/?path=" + encodeURIComponent(_);
            this.b1.disabled = this.b2.disabled = true;
            new I(_, "GET",
            function(_) {
                if (_) {
                    O.isTypeExist("6", $,
                    function(B, A) {
                        var _ = true;
                        if (A[0]) {
                            var C = B.pages[A[1]];
                            if (C.select) _ = confirm("\u60a8\u5df2\u7ecf\u6dfb\u52a0\u4e86\u8be5\u6a21\u5757\uff0c\u8981\u7ee7\u7eed\u6dfb\u52a0\u5417?");
                            else _ = confirm("\u60a8\u5df2\u7ecf\u5728\u201c" + R(C.title) + "\u201d\u6dfb\u52a0\u4e86\u8be5\u6a21\u5757\uff0c\u8981\u7ee7\u7eed\u6dfb\u52a0\u5417?")
                        }
                        _ && O.addWidget("6", $,
                        function($, _) {
                            $.layout.repaint(function() {
                                _.initialize()
                            })
                        })
                    });
                    i2.dispose()
                } else {
                    alert("rss\u5730\u5740\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165");
                    i2.reset(null, {
                        title: A,
                        url: $.url
                    })
                }
            }).send()
        },
        cancel: function() {
            i2.dispose()
        }
    })),
    X2 = {
        selectTab: function(A) {
            function $(B) {
                var _ = B.pages;
                for (var $ = 0; $ < _.length; $++) {
                    var C = _[$];
                    if (A == C.id) {
                        E("tab" + C.id).addClass("frame-tab-select");
                        E("page" + C.id).style.display = "block"
                    } else {
                        E("tab" + C.id).removeClass("frame-tab-select");
                        E("page" + C.id).style.display = "none"
                    }
                }
            }
            var C = E("tab" + A).className;
            O.selectTab(A, $);
            n2();
            if (C.indexOf("frame-tab-select") > -1) return;
            var B = E("tabTitle" + A),
            _ = encodeURIComponent(R(B.innerHTML.replace(/(^\s+|\s+$)/g, "")));
            addStatistics("k1=click&k2=tab&k3=" + _)
        },
        overTab: function() {},
        addTab: function($) {
            if ($.stopPropagation) $.stopPropagation();
            else $.cancelBubble = true;
            O.addTab(function($, _) {
                if (!_) {
                    $.layout.repaint();
                    J.showPanel("widgetLib", true)
                }
            })
        },
        clickTabMenu: function(_) {
            var $ = this.getElementsByTagName("div")[0];
            if ($.style.display == "inline") $.style.display = "none";
            else {
                d2 = E($).uid();
                setTimeout(Y2, 0)
            }
        },
        overTabMenu: function() {
            E(this).addClass("frame-tab-menu-hover")
        },
        outTabMenu: function() {
            E(this).removeClass("frame-tab-menu-hover")
        },
        dblclickTabMenu: function($) {
            if ($.stopPropagation) $.stopPropagation();
            else $.cancelBubble = true
        },
        removeTab: function(_, $) {
            if ($.stopPropagation) $.stopPropagation();
            else $.cancelBubble = true;
            if (confirm("\u4f60\u786e\u5b9a\u5220\u9664\u8be5\u6807\u7b7e\u9875\u4ee5\u53ca\u6807\u7b7e\u9875\u7684\u6240\u6709\u5185\u5bb9\u4e48\uff1f")) O.removeTab(_,
            function($) {
                $.layout.repaint();
                g2()
            })
        },
        editPageTitle: function(A, C) {
            if (C.stopPropagation) C.stopPropagation();
            else C.cancelBubble = true;
            o2 = A;
            var B = E("tabInput" + A),
            $ = E("tabTitle" + A);
            B.value = R($.innerHTML.replace(/(^\s+|\s+$)/g, ""));
            var _ = Math.max($.offsetWidth - 15, 40);
            B.style.width = _ + "px";
            E(document).attach("mouseup", m2);
            E("tab" + A).addClass("frame-tab-edit");
            B.select();
            B.focus();
            S.pageTitleEdit = true;
            B.onkeydown = function($) {
                var _;
                if (window.event) _ = event.keyCode;
                else if ($.which) _ = $.which;
                if (_ == 13) V2()
            };
            B = null
        }
    };
    function V2() {
        E("tab" + o2).removeClass("frame-tab-edit");
        var $ = E("tabInput" + o2),
        _ = $.value.substring(0, 30).replace(/^\s+|\s+$/g, "");
        if (_) {
            _ = n(_);
            S.pageTitleEdit = false;
            E(document).detach("mouseup", m2);
            O.setPageTitle(o2, _,
            function() {
                E("tabTitle" + o2).innerHTML = _
            })
        } else {
            alert("\u6807\u9898\u4e0d\u80fd\u4e3a\u7a7a\uff01");
            X2.editPageTitle(o2, {})
        }
    }
    function m2(_) {
        if (o2 == null) return;
        var $ = _.srcElement || _.target;
        if ($ && $.id != "tabInput" + o2) V2()
    }
    var b2 = {};
    for (var p2 in J) b2[p2] = J[p2];
    for (p2 in X2) b2[p2] = X2[p2];
    var j2, d2;
    function l2() {
        j2 && (E(j2).style.display = "block")
    }
    function Y2() {
        d2 && (E(d2).style.display = "inline")
    }
    function c2() {
        var $ = j2 && E(j2);
        if ($) $.style.display = "none";
        else j2 = null
    }
    E(document).attach("mouseup", c2);
    E(document).attach("mouseup",
    function() {
        var $ = d2 && E(d2);
        if ($) $.style.display = "none";
        else d2 = null
    });
    function g2() {
        var $ = S.hotWidgets,
        B = [];
        for (var A = 0; A < $.length; A++) {
            var _ = $[A].id;
            $[A].value = A;
            $[A].select = O.isTypeExist(_, $[A].config);
            if (!$[A].select) B.push($[A])
        }
        E("widgetLib").innerHTML = A2.render({
            action: v(J),
            hotWidgets: B
        })
    }
    function W2(_, A) {
        if (_.length == A.length) {
            var B = 0;
            for (var $ = 0; $ < _.length; $++) B += Math.abs(_[$] - parseInt(A[$].width));
            return B
        }
        return 10000
    }
    function n2() {
        var A = E("themeLayout"),
        D = O.getCurrentPage().columns,
        F = A.firstChild,
        C = [],
        $ = 10000,
        G = null;
        for (var _ = 0; _ < D.length; _++) C.push(parseInt(D[_].width));
        for (_ = 0; _ < Z2.length; _++) {
            var B = W2(C, Z2[_]);
            if (B < $) {
                $ = B;
                G = _
            }
        }
        _ = 0;
        while (F) {
            if (F.className && F.className.indexOf("theme-img") != -1) {
                if (_ == G) E(F).addClass("theme-select");
                else E(F).removeClass("theme-select");
                _++
            }
            F = F.nextSibling
        }
    }
    var S = {
        loginSuggest: false,
        hotWidgets: null,
        pageTitleEdit: false,
        alive: function() {
            return ! this.pageTitleEdit && E("popup").style.display != "block"
        }
    }
    function S2(_, $, A) {
        if (_) this.time = parseInt(_ * 1000);
        if ($) this.transform = $;
        if (A) this.interval = A
    }
    function q2($) {
        return $ instanceof String ? document.getElementById($) : $
    }
    S2.prototype = {
        interval: 40,
        transform: function($) {
            return 1 - Math.pow(1 - $, 3)
        },
        time: 2000,
        task: null,
        start: function(E, A, D) {
            this.onStep = E;
            this.onComplete = A;
            D = D || this.transform;
            function _() {
                G += F;
                var _ = G / C;
                if (_ >= 1) {
                    E(1);
                    A();
                    clearInterval(B)
                } else E(D(_) / $)
            }
            var F = this.interval,
            C = this.time,
            $ = D(1),
            G = 0;
            this.task = setInterval(_, F);
            var B = this.task;
            return B
        },
        finish: function() {
            clearInterval(this.task);
            this.onStep(1);
            this.onComplete()
        },
        moveBy: function(A, B, E, C) {
            A = q2(A);
            var F = A.offsetLeft,
            G = A.offsetTop,
            $ = A.style;
            $.position = "absolute";
            function D(_) {
                $.left = parseInt(F + _ * B) + "px";
                $.top = parseInt(G + _ * E) + "px"
            }
            function _() {
                A = $ = null;
                C && C()
            }
            return this.start(D, _)
        },
        opacity: function(A, B, E, C) {
            A = q2(A);
            var F = E - B,
            $ = true;
            function D(_) {
                _ = B + F * _;
                if (A.style.filter != null) A.style.filter = (_ > 0.999) ? "": "alpha(opacity=" + _ * 100 + ")";
                else A.style.opacity = _;
                if ($) {
                    $ = false;
                    A.style.display = "block"
                }
            }
            function _() {
                if (E == 0) A.style.display = "none";
                A = null;
                C && C()
            }
            return this.start(D, _)
        }
    }
    var t2, F0 = {
        initialize: function() {
            t2 = arguments[0]
        },
        removeWidget: function(_) {
            var $ = this.getWidget(_);
            if ($) $.dispose();
            O.removeWidget(_,
            function() {
                E(_).remove()
            })
        },
        createWidget: u2,
        getWidget: function(B) {
            var _ = t2.pages,
            $ = _.length;
            while ($--) {
                var A = _[$].getWidget(B);
                if (A) return A
            }
        },
        getPages: function() {
            return t2.pages
        },
        getSelectedPageIndex: function() {
            return t2.selectedIndex
        },
        getWidgets: function($, B) {
            var _ = t2.pages,
            A = _.length;
            B = B || [];
            while (A--) _[A].getWidgets($, B);
            return B
        },
        moveWidget: function(_, $) {
            var A = t2.pages[$];
            if (A == O.getCurrentPage()) return;
            O.moveWidget(_, $, 0, 0,
            function(_, $) {
                if ($ === false) return;
                _.layout.repaint()
            })
        }
    },
    v2 = {};
    function s2(_) {
        var $ = v2[_.type];
        if (!$) {
            $ = function(A, $) {
                w2(this, A, $ || Q.clone(_.config))
            };
            $.prototype = new r2(_);
            v2[_.type] = $
        }
        return $
    }
    function w2(A, _, $) {
        A.config = $;
        A.id = _
    }
    function u2(_, B, $) {
        var A = new(s2(_))(B, $);
        return A
    }
    function r2(G) {
        this.data = G.data;
        this.title = G.title;
        this.type = G.type;
        this.templateMap = {};
        for (var D in G.template) {
            var I = G.template[D];
            if (! (I instanceof Function)) {
                try {
                    I = new Function("try{" + I + "\n}catch(e){return e.message}")
                } catch($) {
                    try {
                        I = new Function(I)
                    } catch($) {
                        I = new Function("return " + Q.encode($.message))
                    }
                }
            }
            this.templateMap[D] = new l(I)
        }
        this.defaultConfig = Q.clone(G.config);
        var _ = G.script,
        C = ["WidgetManager"],
        F = [F0];
        this.action = {
            getWidget: $3
        };
        if (_) {
            if (G.imports) {
                var A = G.imports,
                H = {},
                B = A && A.length;
                while (B--) $import(A[B], H);
                for (D in H) {
                    C.push(D);
                    F.push(H[D])
                }
            }
            C.push(_);
            try {
                var E = Function.apply(null, C);
                this.initialize = function() {
                    try {
                        E.apply(this, F)
                    } catch($) {} finally {
                        r2.prototype.initialize.apply(this, arguments)
                    }
                }
            } catch($) {}
        }
    }
    r2.prototype = {
        initialize: function() {
            try {
                this.initialize = Function.prototype;
                this.action = v(this.action);
                this.refresher = new z2(this, this.data);
                delete this.title;
                this.title = A3(this, this.title)
            } catch($) {}
            this.reload(true)
        },
        getDefaultConfig: function() {
            return this.defaultConfig
        },
        reload: function($) {
            if ($) E(this.id).innerHTML = "<img src='/images/loadin.gif'/>";
            this.refresher && this.refresher.restart()
        },
        resize: function() {},
        repaint: function() {
            delete this.title;
            this.title = A3(this, this.title);
            if (this.refresher.loaded) {
                try {
                    var $ = this.templateMap.body.render(this)
                } catch(_) {
                    $ = "Widget\u521d\u59cb\u5316\u5f02\u5e38\uff1a" + _.message
                }
                E(this.id).innerHTML = x1.render({
                    widget: this,
                    widgetAction: x2,
                    content: $
                })
            } else E(this.id).innerHTML = x1.render({
                widget: this,
                widgetAction: x2,
                content: "<div style='padding:8px'>\u6570\u636e\u52a0\u8f7d\u4e2d...</div>"
            });
            setTimeout(function() {
                document.body.style.display = "none";
                document.body.style.display = ""
            },
            0)
        },
        equals: function($) {
            if (this.type == $.type) return true;
            return false
        },
        inject: function(C, $, A) {
            var _ = this[C];
            if (_ instanceof Function) this[C] = function() {
                var B = true;
                $ && (B = $.apply(this, arguments) === false ? false: true);
                B && _.apply(this, arguments);
                A && A.apply(this, arguments)
            };
            else for (var B in $) _[B] = $[B]
        },
        save: function($) {
            var _ = this.config;
            O.updateWidgetConfig(this.id, _, $ ||
            function() {})
        },
        dispose: function() {
            this.refresher.dispose();
            this.repaint = Function.prototype
        }
    };
    function _3(_) {
        var $ = _.firstChild,
        A = _.nextSibling;
        if ($) _3($);
        if (A) _3(A);
        _.parentNode.removeChild(_);
        for (var B in _) if (/^on/i.test(B)) _[B] = Function.prototype
    }
    r2.prototype.reset = r2.prototype.reload;
    function $3($) {
        return F0.getWidget($)
    }
    function A3(A, $) {
        if (/\$\{(.+)\}/.test($)) {
            function _($, _) {
                try {
                    return C3(A, _)
                } catch(B) {
                    return B.message
                }
            }
            return $.replace(/\$\{([^\}]+)\}/g, _)
        } else return $
    }
    var C3 = new Function("w", "e", "with(w){return eval(e)}");
    function B3($, _) {
        if (_ && _.length) y2($, _,
        function(_, A) {
            $.refresher.loaded = !A;
            $.data = _;
            $.repaint()
        });
        else {
            $.refresher.loaded = true;
            $.repaint()
        }
    }
    function z2(E, $) {
        try {
            var B = {},
            G = {},
            A = $.length;
            while (A--) {
                var D = $[A];
                if (D.refresh) {
                    var _ = B[D.refresh];
                    if (!_) _ = B[D.refresh] = [];
                    _.push(D)
                }
            }
            this.widget = E;
            this.data = $;
            for (var C in B) G[C] = setInterval(D3(this.widget, B[C]), Math.max(1, C) * 1000 * 60);
            this.intervalMap = G
        } catch(F) {}
    }
    z2.prototype = {
        restart: function() {
            B3(this.widget, this.data)
        },
        dispose: function() {
            for (var $ in this.intervalMap) clearInterval(this.intervalMap[$])
        }
    };
    function D3($, _) {
        return function() {
            B3($, _)
        }
    }
    function y2(B, C, K) {
        var G, H = {},
        M = C.length,
        J = M,
        F = false;
        function D() {
            J--;
            if (!J) K(H, F)
        }
        while (M--) {
            var _ = C[M],
            E = _.type,
            L = A3(B, _.url),
            $ = L.replace(/^data:text\/json,/, "");
            if ($ != L) {
                H[_.name] = Q.decode($);
                D()
            } else if (E == "jscallback") F3(L, D);
            else {
                if (L.charAt() != "/") {
                    L = encodeURIComponent(L);
                    switch (E) {
                    case "rss":
                        L = "/data/rsschannel/?path=" + L;
                        break;
                    case "xml":
                        L = "/data/xml2json/?path=" + L;
                        break;
                    case "json":
                        L = "/data/json/?path=" + L;
                        break;
                    default:
                        L = "/data/xml2json/?path=" + L
                    }
                }
                var A = new I(L, "GET",
                function($) {
                    try {
                        var _ = this.getStatus();
                        if ($) H[this.name] = Q.decode(this.getText());
                        else F = true
                    } catch(A) {
                        F = true
                    }
                    D()
                });
                A.name = _.name;
                A.send()
            }
        }
    }
    var G3 = {};
    function E3(_) {
        var A = this,
        $ = _.split(".");
        while ($.length > 1) A = A[$.shift()];
        A[$[0]] = A[$[0]] ||
        function($) {
            var A = G3[_];
            A[0]($);
            A.shift()
        };
        A = null
    }
    function F3(_, $) {
        var B = _.indexOf("#");
        if (B > 0) B = _.substring(B + 1);
        else B = "callback";
        E3(B);
        if (G3[B] == null) G3 = [$];
        else G3[B].push($);
        var A = document.createElement("script");
        A.src = _;
        document.body.appendChild(A)
    }
    function O3() {}
    var I3 = false,
    P3 = (navigator.userAgent.toLowerCase().indexOf("msie") != -1 && navigator.userAgent.toLowerCase().indexOf("opera") == -1),
    L3,
    M3,
    U3 = [],
    K3 = 0,
    J3 = 0;
    O3.prototype = {
        start: function(C) {
            this.status = "start";
            this.page = O.getCurrentPage();
            for (var _ = 0; _ < this.page.columns.length; _++) {
                var B = this.page.columns[_];
                for (var $ = 0; $ < B.widgets.length; $++) if (C == B.widgets[$].id) {
                    this.index = {
                        x: _,
                        y: $
                    };
                    this.widget = B.widgets[$]
                }
            }
            T3(this);
            this.initIndex = this.index;
            var D = E(this.widget.id);
            K3 = D.offsetWidth;
            U3 = D.getElementsByTagName("select");
            if (U3.length) for (_ = 0, $ = U3.length; _ < $; _++) U3[_].style.display = "none";
            var A = D.getRegion();
            D.style.width = A.right - A.left + "px";
            if (P3) {
                D.style.left = A.left - 8 + "px";
                D.style.top = A.top - 12 + "px"
            } else {
                D.style.left = A.left - 6 + "px";
                D.style.top = A.top - 10 + "px"
            }
            E("cover").style.display = "block";
            E("cover").setOpacity(0);
            D.style.position = "absolute";
            D.zIndex = D.style.zIndex;
            D.style.zIndex = "10000";
            document.body.appendChild(D);
            L3 = O.getCurrentPage().id;
            S3(this)
        },
        move: function(G, C) {
            if (!I3) {
                E(this.widget.id).setOpacity(0.4);
                I3 = true
            }
            var A = {};
            A.x = G;
            A.y = C;
            var $ = N3(A, this.pagesPos),
            _ = H3(A, this.colsPos, this);
            if (! (this.tabIndex === false) && this.tabIndex != null) E(this.pagesId[this.tabIndex]).removeClass("tab-drag-in");
            if (! ($ === false) && $ != null && "tab" + L3 != this.pagesId[$]) {
                var B = E(this.pagesId[$]);
                B.addClass("tab-drag-in");
                this.placeHolder.style.display = "none";
                this.tabIndex = $;
                return
            } else {
                this.placeHolder.style.display = "block";
                delete this.tabIndex
            }
            if (_ && (this.index == null || this.index.x != _.x || this.index.y != _.y)) {
                this.index = _;
                var F = E(this.widget.id),
                D = F.offsetWidth;
                F.style.width = this.colsPos[_.x].right - this.colsPos[_.x].left + "px";
                S3(this);
                F.style.width = D + "px"
            }
            if (A.x >= document.documentElement.clientWidth) return false
        },
        end: function() {
            if (!this.widget) return;
            var _ = E(this.widget.id),
            B = this;
            if (! (this.tabIndex === false) && this.tabIndex != null) {
                E(B.pagesId[B.tabIndex]).removeClass("tab-drag-in");
                O.moveWidget(this.widget.id, this.tabIndex, 0, 0,
                function(D, C) {
                    if (C === false) {
                        B.index = B.initIndex;
                        S3(B);
                        B.placeHolder.parentNode.insertBefore(_, B.placeHolder)
                    } else {
                        var $ = E(D.pages[B.tabIndex].columns[0].id);
                        $.insertBefore(_, $.firstChild);
                        E("hint" + D.pages[B.tabIndex].id).style.display = "none"
                    }
                    A()
                })
            } else if (this.initIndex.x == this.index.x && this.initIndex.y == this.index.y) {
                B.placeHolder.parentNode.insertBefore(_, B.placeHolder);
                A()
            } else {
                var $ = this.index;
                B.placeHolder.parentNode.insertBefore(_, B.placeHolder);
                O.moveWidget(this.widget.id, null, this.index.x, this.index.y,
                function($) {});
                A()
            }
            function A() {
                E("cover").setOpacity(0.3);
                E("cover").style.display = "none";
                _.setOpacity(1);
                _.removeClass("widget-focus");
                I3 = false;
                B.placeHolder.parentNode.removeChild(B.placeHolder);
                _.style.position = "relative";
                _.style.zIndex = _.zIndex;
                Q3(_);
                _.style.left = "0px";
                _.style.top = "0px";
                _.style.width = "";
                J3 = _.offsetWidth;
                if (J3 != K3) B.widget.resize(K3);
                J3 = K3 = 0;
                B.widget = B.initIndex = B.index = B.tabIndex = B.placeHolder = B.page = null;
                U3 = _.getElementsByTagName("select");
                if (U3.length) {
                    for (var $ = 0,
                    A = U3.length; $ < A; $++) U3[$].style.display = "";
                    U3 = []
                }
                setTimeout(function() {
                    document.body.style.zoom = 1;
                    document.body.style.zoom = ""
                },
                0)
            }
        }
    };
    function Q3($) {
        var $ = $.parentNode.firstChild,
        _ = 1000;
        while ($) {
            if ($.attributes && $.getAttribute("name") == "widget") $.style.zIndex = _--;
            $ = $.nextSibling
        }
    }
    function T3(G) {
        var B = [];
        for (var _ = 0; _ < G.page.columns.length; _++) {
            var F = G.page.columns[_],
            C = R3(F);
            C.widgets = [];
            B.push(C);
            var D = C.widgets;
            for (var $ = 0; $ < F.widgets.length; $++) {
                var A = F.widgets[$];
                D.push(R3(A))
            }
        }
        G.pagesPos = [];
        G.pagesId = O.getPagesId();
        for (_ = 0; _ < G.pagesId.length; _++) G.pagesPos.push(E(G.pagesId[_]).getRegion());
        G.colsPos = B
    }
    function S3(D) {
        var A = D.index,
        _ = D.colsPos;
        if (!D.placeHolder) {
            D.placeHolder = document.createElement("div");
            D.placeHolder.style.border = "green 2px dashed";
            D.placeHolder.style.margin = "10px 6px 10px 6px";
            D.placeHolder.style.top = "-4px";
            D.placeHolder.style.left = "-4px";
            D.placeHolder.style.position = "relative"
        }
        var B = _[A.x].right - _[A.x].left - 12,
        I = E(D.widget.id),
        C = E(D.page.columns[A.x].id);
        I.style.width = B + "px";
        var H = I.offsetHeight;
        D.placeHolder.style.height = H + "px";
        var $ = C.firstChild,
        G = 0,
        F;
        while ($) {
            if ($.attributes && $.getAttribute("name") == "widget") {
                if (G == A.y) {
                    break;
                    return
                }
                G++
            }
            $ = $.nextSibling
        }
        C.insertBefore(D.placeHolder, $);
        document.body.style.zoom = 1;
        document.body.style.zoom = ""
    }
    function N3(A, _) {
        for (var $ = 0; $ < _.length; $++) if (A.x >= _[$].left && A.x <= _[$].right && A.y >= _[$].top && A.y <= _[$].bottom) return $;
        return false
    }
    function H3(E, G, B) {
        var C, H;
        for (var _ = 0; _ < G.length; _++) {
            var $ = G[_];
            if (E.x > $.left && E.x < $.right) {
                C = _;
                continue
            }
        }
        if (C == null) return {
            x: B.initIndex.x,
            y: B.initIndex.y
        };
        for (_ = 0; _ < G[C].widgets.length; _++) {
            var F = G[C].widgets[_],
            D = G[C].widgets[_ + 1] ? G[C].widgets[_ + 1].top: G[C].widgets[_].bottom;
            if (E.y > F.top && E.y < D) {
                H = _;
                continue
            }
        }
        if (H == null) {
            if (G[C].widgets.length > 0) H = (E.y < G[C].widgets[0].top) ? 0 : null;
            else H = null;
            if (H == null) {
                var A = B.placeHolder;
                if (A) {
                    H = -1;
                    do {
                        if (A.nodeType == 1) H++;
                        A = A.previousSibling
                    } while ( A )
                }
            }
        }
        return {
            x: C,
            y: H
        }
    }
    function R3($) {
        var _ = E($.id);
        return _.getRegion()
    }
    function d3() {
        c3 = true;
        b3.start(X3)
    }
    function Z3(_, B, A, $) {
        return b3.move(_, B)
    }
    function g3(_, B, A, $) {
        if (c3) {
            c3 = false;
            b3.end()
        }
        return true
    }
    var c3, W3 = new F2(0.3,
    function($) {
        return $ * $ * $
    },
    50),
    b3 = new O3(),
    e3 = new f1(d3, Z3, g3),
    X3,
    l3,
    x2 = v({
        startDrag: function(_, $) {
            X3 = _;
            a3();
            e3.connect(this, E(_)).doStart($)
        },
        over: function($) {
            E($).addClass("widget-focus")
        },
        out: function(_, $) {
            E(_).removeClass("widget-focus")
        },
        menu: function(A, $) {
            document.onclick && document.onclick();
            var _ = a3();
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            var B = E(this.parentNode).uid();
            if (_ != B) f3(B)
        },
        minmax: function($) {
            var D = F0.getWidget($),
            C = D.config.closed,
            B = i3($);
            D.config.closed = !C;
            D.save();
            var _ = this;
            function A($) {
                if (!C) $ = 1 - $;
                B.parentNode.setOpacity($)
            }
            function E() {
                if (C) {
                    _.title = "\u6700\u5c0f\u5316";
                    B.removeClass("widget-collapsed")
                } else {
                    _.title = "\u6700\u5927\u5316";
                    B.addClass("widget-collapsed")
                }
                q(true);
                q(false);
                B.parentNode.setOpacity(1);
                _ = null
            }
            W3.start(A, E)
        },
        close: function($) {
            this.onclick = "";
            function _() {
                F0.removeWidget($);
                q(true);
                q(false)
            }
            W3.opacity($, 1, 0, _)
        },
        edit: function(_) {
            var A = F0.getWidget(_),
            $ = A.templateMap.config;
            $ = $.render(A);
            a3();
            k3.popup("\u8bbe\u7f6e" + A.title, {
                config: $,
                wid: _
            })
        },
        share: function(_) {
            var $ = F0.getWidget(_);
            a3();
            m3.popup({
                wid: _
            })
        },
        moveToOtherPage: function(B) {
            var D = F0.getPages(),
            C = [];
            for (var _ = 0; _ < D.length; _++) {
                var F = R(D[_].title);
                for (var $ = 0,
                E = 0; $ < F.length && E < 8; $++) {
                    E++;
                    if (F.charCodeAt($) > 128) E++
                }
                C.push(F.substr(0, $) + (F.length > E ? "...": ""))
            }
            var A = F0.getSelectedPageIndex();
            Y3.popup(null, {
                selectedIndex: A,
                titles: C,
                pages: F0.getPages(),
                wid: B
            })
        }
    }),
    m3 = new Dialog("\u5206\u4eabWidget", q1, v({
        sendEmail: function(C) {
            var _ = F0.getWidget(C),
            B = this.form.mailAddress.value.match(/[\w\.\-\_]+@[\w\.\-\_]+/g),
            $ = Q.encode({
                type: _.type,
                config: _.condig
            }),
            A = j3(this.value);
            if (A) alert(A);
            else new I("share-widget.action", "POST",
            function() {
                var $ = this.getStatus();
                if ($ == 200) k3.dispose();
                else {
                    prompt("\u90ae\u4ef6\u53d1\u9001\u5931\u8d25");
                    k3.dispose()
                }
            }).send("to=" + B.join("&to=") + "&jsonData=" + encodeURIComponent($))
        },
        checkEmail: function() {
            var $ = j3(this.value) || "";
            if ($) {
                this.style.border = "1px solid red";
                this.title = $
            } else this.style.border = ""
        },
        cancel: function($) {
            k3.dispose()
        }
    }));
    function j3(A) {
        var B = /^[\w\.\-\_]+@[\w\.\-\_]+$/,
        _ = A.split(/[;,\r\n]+/),
        $ = _.length;
        while ($--) if (_[$] && !B.test(_[$])) return _[$] + "\u4e0d\u662f\u5408\u6cd5\u90ae\u4ef6!!!!"
    }
    function i3(_) {
        var $ = E(_).lastChild;
        if ($.nodeType != 1) $ = $.priviousSibling;
        return E($)
    }
    var k3 = new Dialog("\u8bbe\u7f6e\u6a21\u5757", $2, v({
        save: function(_) {
            var $ = V3(this.form),
            A = F0.getWidget(_),
            B = true;
            A.verify && (B = A.verify($));
            if (typeof B != "string") {
                A.config = $;
                A.save();
                A.reload();
                k3.dispose()
            } else alert(B)
        },
        reset: function(B) {
            var A = F0.getWidget(B),
            _ = A.templateMap.config;
            A = m(A);
            A.config = A.getDefaultConfig();
            var $ = _.render(A);
            k3.reset("\u8bbe\u7f6e" + A.title, {
                config: $,
                wid: B
            })
        },
        cancel: function($) {
            k3.dispose()
        }
    })),
    Y3 = new Dialog("\u79fb\u52a8\u5230\u5176\u4ed6\u6807\u7b7e\u9875", t1, v({
        move: function(D) {
            var A = F0.getWidget(D),
            $ = this.parentNode.parentNode.getElementsByTagName("input");
            for (var _ = 0,
            B = $.length; _ < B; _++) if ($[_].checked) {
                var C = $[_].value;
                F0.moveWidget(D, C)
            }
            Y3.dispose()
        },
        cancel: function($) {
            Y3.dispose()
        }
    })),
    h3;
    function a3() {
        var _ = h3 && E(h3);
        if (_) {
            _.replaceClass("open-", "close-");
            var $ = h3,
            A = E($).parentNode.parentNode.style;
            A.zIndex = A.zIndex & (16777215);
            h3 = null;
            return $
        }
    }
    function f3($) {
        setTimeout(function() {
            var _ = E($),
            A = _.switchClass("open-", "close-");
            if (_.className.indexOf("open-") > -1) h3 = $;
            else h3 = null
        },
        0)
    }
    E(document).attach("mouseup", a3) function V3($) {
        var _ = {};
        o3($, _);
        return _
    }
    function o3(_, A) {
        var $ = _.firstChild,
        B = _.tagName && _.tagName.toLowerCase();
        switch (B) {
        case "input":
        case "textarea":
            s3(_, A);
            break;
        case "select":
            n3(_, A);
            break;
        default:
            while ($) {
                o3($, A);
                $ = $.nextSibling
            }
        }
    }
    function s3(_, A) {
        var $ = _.type.toLowerCase();
        switch ($) {
        case "button":
        case "submit":
            break;
        case "":
        case "text":
        case "hidden":
        case "password":
            q3(A, _.name, _.value, r3(_) || "string");
            break;
        case "radio":
            if (_.checked) q3(A, _.name, _.value, r3(_) || "string");
            break;
        case "checkbox":
            if (_.checked) q3(A, _.name, _.value, r3(_) || "string[]");
            break
        }
    }
    function n3($, C) {
        var A = $.multiple,
        F = $.name,
        B = $.options,
        D = r3($) || (A ? "string[]": "string");
        for (var _ = 0; _ < B.length; _++) {
            var E = B[_];
            if (E.selected) if (A) q3(C, F, E.value || E.text, r3($) || "string");
            else q3(C, F, E.value || E.text, r3($) || "string")
        }
    }
    function r3($) {
        return $.getAttribute("d:data-type")
    }
    function q3(A, B, _, C) {
        if (B) if (C.indexOf("[]") > 0) {
            C = C.replace(/[^\w]/g, "");
            var $ = A[B];
            if ($) $.push(p3(_, C));
            else A[B] = [p3(_, C)]
        } else A[B] = p3(_, C)
    }
    function p3($, _) {
        switch (_) {
        case "float":
            return parseFloat($);
        case "int":
            return parseInt($);
        case "bool":
        case "boolean":
            return $ && ($ != "false");
        default:
            return $
        }
    }
    function m0() {
        this.type = "PageLayout"
    }
    m0.prototype = {
        render: function($) {
            this.page = $;
            var _ = this;
            x2.page = $;
            return B2.render({
                widgetAction: x2,
                columns: $.columns,
                page: $
            })
        },
        repaint: function() {
            var _ = this.page;
            E("page" + _.id).innerHTML = this.render(_);
            var A = _.getWidgets(),
            $ = A.length;
            while ($--) {
                A[$].repaint();
                A[$].resize()
            }
        }
    }
    function l0(A, B) {
        var $ = A.length,
        C = {}; (function _() {
            if ($--) {
                try {
                    $import(A[$], _)
                } catch(D) {}
            } else B(C)
        })()
    }
    function n0() {
        this.width = "33%";
        this.id = "col" + L();
        this.widgets = []
    }
    function k0($) {
        this.columns = [];
        this.layout = $;
        this.id = L()
    }
    k0.prototype = {
        addWidget: function(A, B, $) {
            var _ = this.columns[B || 0];
            if (_ == null) _ = this.columns[B || 0] = new n0();
            $ = Math.min(Math.max(0, $), _.widgets.length);
            _.widgets.splice($, 0, A)
        },
        removeWidget: function($, _) {
            this.columns[$].widgets.splice(_, 1)
        },
        getWidget: function(B) {
            var $ = this.columns,
            _ = $.length;
            while (_--) {
                var A = $[_].widgets,
                D = A.length;
                while (D--) {
                    var C = A[D];
                    if (C.id == B) return C
                }
            }
        },
        getWidgets: function(_, B) {
            var E = this.columns,
            C = E.length;
            B = B || [];
            while (C--) if (_) {
                var A = E[C].widgets,
                $ = A.length;
                while ($--) {
                    var D = A[$];
                    if (_(D)) B.push(D)
                }
            } else B.push.apply(B, E[C].widgets);
            return B
        }
    }
    function j0() {
        this.type = "FrameLayout"
    }
    j0.prototype.render = function(E) {
        u3 = E;
        v3 = E.pages;
        var D = null;
        for (var A = 0,
        $; $ = v3[A]; A++) {
            var _ = $.select;
            if (_) D = true;
            $.html = $.layout.render($)
        }
        if (!D) v3[0].select = true;
        var C = document.documentElement.clientWidth || document.body.offsetWidth,
        B;
        if (C <= 1152) {
            if (C <= 960) document.body.style.width = "960px";
            var F = Math.round((C - 960) / 2);
            F = (F > 0 ? F: 0) + "px";
            B = ";margin:0;" + "padding:" + "0 " + F + " 0 " + F + ";width:960px;"
        } else {
            F = Math.round(C / 12) + "px";
            B = ";margin:0;" + "padding:" + "0 " + F + " 0 " + F + ";width:auto;"
        }
        return v1.render({
            action: v(b2),
            pages: v3,
            selectedIndex: E.selectedIndex,
            tabContentStyle: B,
            loginShow: O.isLoginSuggestShow(),
            hotWidgets: S.hotWidgets
        })
    };
    j0.prototype.repaint = function($) {
        E(x3).innerHTML = this.render(u3);
        $ && $();
        var D = u3;
        for (var _ = 0; _ < D.pages.length; _++) {
            var G = D.pages[_];
            for (var B = 0; B < G.columns.length; B++) {
                var C = G.columns[B];
                for (var A = 0; A < C.widgets.length; A++) {
                    var F = C.widgets[A];
                    F.repaint()
                }
            }
        }
        setTimeout(function() {
            document.body.style.zoom = "1";
            document.body.style.zoom = ""
        },
        0)
    };
    var x3 = "frame",
    v3, w3, u3;
    function t3() {
        document.body.style.width = "auto";
        var $ = document.documentElement.clientWidth || document.body.offsetWidth;
        try {
            if ($ <= 1152) {
                if ($ <= 960) document.body.style.width = "960px";
                var A = Math.round(($ - 960) / 2);
                A = (A > 0 ? A: 0) + "px";
                E("frameTabFolderHead").style.margin = "0";
                E("frameTabFolderHead").style.padding = "0 " + A + " 0 " + A;
                E("frameTabFolderHead").style.width = "960px";
                E("frameWidgetContent").style.margin = "0";
                E("frameWidgetContent").style.padding = "0 " + A + " 0 " + A;
                E("frameWidgetContent").style.width = "960px"
            } else {
                A = Math.round($ / 12) + "px";
                E("frameTabFolderHead").style.margin = "0";
                E("frameTabFolderHead").style.padding = "0 " + A + " 0 " + A;
                E("frameTabFolderHead").style.width = "auto";
                E("frameWidgetContent").style.margin = "0";
                E("frameWidgetContent").style.padding = "0 " + A + " 0 " + A;
                E("frameWidgetContent").style.width = "auto"
            }
        } catch(_) {}
    }
    E(window).attach("resize", t3) function o0($) {
        this.layout = $;
        this.pages = [];
        this.selectedIndex = 0
    }
    o0.prototype.addTab = function($) {
        this.pages.push($)
    };
    o0.prototype.removeTab = function($) {
        var C = this.pages[$],
        _ = C.getWidgets();
        for (var B = 0,
        A = _.length; B < A; B++) _[B].dispose();
        this.pages.splice($, 1)
    };
    o0.prototype.walkWidget = function(G) {
        var C = this.pages;
        for (var D = 0; D < C.length; D++) {
            var $ = C[D],
            _ = $.columns;
            for (var B = 0; B < _.length; B++) {
                var F = _[B],
                E = F.widgets;
                for (var A = 0; A < E.length; A++) if (G(E[A], D, B, A)) return
            }
        }
    };
    o0.prototype.isTypeExist = function(_, A) {
        var B, $;
        this.walkWidget(function(F, E, D, C) {
            F.type == _ && (B = true);
            if (B) {
                F.equals({
                    type: _,
                    config: A
                }) && (B = true) || (B = false);
                $ = E;
                return B
            }
        });
        return [B, $]
    };
    o0.prototype.getPageById = function(B) {
        var A = this.pages;
        for (var $ = 0; $ < A.length; $++) {
            var _ = A[$];
            if (_.id == B) return _
        }
    };
    o0.prototype.getWidgetById = function(B) {
        var _ = this.pages,
        $ = _.length;
        while ($--) {
            var A = _[$].getWidget(B);
            if (A) return A
        }
    };
    o0.prototype.removeWidgetById = function(_) {
        var A, $ = this;
        this.walkWidget(function(B, D, E, C) {
            if (B.id == _) {
                $.pages[D].removeWidget(E, C);
                A = B;
                return true
            }
        });
        return A
    };
    o0.prototype.getCurrentPage = function() {
        var $ = this.pages,
        _ = $[this.selectedIndex];
        return _ || $[0]
    }
    var E0 = {
        "\u5317\u4eac": {
            name: "\u5317\u4eac\u5e02",
            city: ["\u5317\u4eac"]
        },
        "\u5929\u6d25": {
            name: "\u5929\u6d25\u5e02",
            city: ["\u5929\u6d25"]
        },
        "\u91cd\u5e86": {
            name: "\u91cd\u5e86\u5e02",
            city: ["\u91cd\u5e86"]
        },
        "\u6cb3\u5317": {
            name: "\u6cb3\u5317\u7701",
            city: ["\u77f3\u5bb6\u5e84", "\u5510\u5c71", "\u79e6\u7687\u5c9b", "\u5f20\u5bb6\u53e3", "\u627f\u5fb7", "\u5eca\u574a", "\u90af\u90f8", "\u90a2\u53f0", "\u4fdd\u5b9a", "\u6ca7\u5dde", "\u8861\u6c34"]
        },
        "\u5c71\u897f": {
            name: "\u5c71\u897f\u7701",
            city: ["\u592a\u539f", "\u5927\u540c", "\u9633\u6cc9", "\u664b\u57ce", "\u6714\u5dde", "\u5ffb\u5dde", "\u79bb\u77f3", "\u6986\u6b21", "\u4e34\u6c7e", "\u8fd0\u57ce", "\u957f\u6cbb"]
        },
        "\u5185\u8499\u53e4": {
            name: "\u5185\u8499\u53e4\u81ea\u6cbb\u533a",
            city: ["\u547c\u548c\u6d69\u7279", "\u5305\u5934", "\u4e4c\u6d77", "\u96c6\u5b81", "\u5df4\u5f66\u6d69\u7279", "\u4e34\u6cb3", "\u9102\u5c14\u591a\u65af", "\u8d64\u5cf0", "\u901a\u8fbd", "\u9521\u6797\u6d69\u7279", "\u6d77\u62c9\u5c14", "\u4e4c\u5170\u6d69\u7279"]
        },
        "\u8fbd\u5b81": {
            name: "\u8fbd\u5b81\u7701",
            city: ["\u6c88\u9633", "\u5927\u8fde", "\u978d\u5c71", "\u629a\u987a", "\u672c\u6eaa", "\u9526\u5dde", "\u8425\u53e3", "\u961c\u65b0", "\u76d8\u9526", "\u94c1\u5cad", "\u671d\u9633", "\u846b\u82a6\u5c9b", "\u4e39\u4e1c"]
        },
        "\u5409\u6797": {
            name: "\u5409\u6797\u7701",
            city: ["\u957f\u6625", "\u5409\u6797", "\u56db\u5e73", "\u8fbd\u6e90", "\u677e\u539f", "\u767d\u57ce", "\u5ef6\u8fb9", "\u901a\u5316"]
        },
        "\u9ed1\u9f99\u6c5f": {
            name: "\u9ed1\u9f99\u6c5f\u7701",
            city: ["\u54c8\u5c14\u6ee8", "\u9e21\u897f", "\u9e64\u5c97", "\u53cc\u9e2d\u5c71", "\u4f0a\u6625", "\u4f73\u6728\u65af", "\u4e03\u53f0\u6cb3", "\u7261\u4e39\u6c5f", "\u7ee5\u5316", "\u9f50\u9f50\u54c8\u5c14", "\u5927\u5e86", "\u9ed1\u6cb3", "\u5927\u5174\u5b89\u5cad"]
        },
        "\u4e0a\u6d77": {
            name: "\u4e0a\u6d77\u5e02",
            city: ["\u4e0a\u6d77"]
        },
        "\u6c5f\u82cf": {
            name: "\u6c5f\u82cf\u7701",
            city: ["\u5357\u4eac", "\u65e0\u9521", "\u5f90\u5dde", "\u5e38\u5dde", "\u82cf\u5dde", "\u5357\u901a", "\u8fde\u4e91\u6e2f", "\u6dee\u9634", "\u76d0\u57ce", "\u626c\u5dde", "\u9547\u6c5f", "\u6cf0\u5dde", "\u5bbf\u8fc1"]
        },
        "\u6d59\u6c5f": {
            name: "\u6d59\u6c5f\u7701",
            city: ["\u676d\u5dde", "\u5b81\u6ce2", "\u6e29\u5dde", "\u5609\u5174", "\u6e56\u5dde", "\u7ecd\u5174", "\u91d1\u534e", "\u8862\u5dde", "\u821f\u5c71", "\u4e3d\u6c34", "\u53f0\u5dde"]
        },
        "\u5b89\u5fbd": {
            name: "\u5b89\u5fbd\u7701",
            city: ["\u5408\u80a5", "\u829c\u6e56", "\u868c\u57e0", "\u6dee\u5357", "\u9a6c\u978d\u5c71", "\u6dee\u5317", "\u94dc\u9675", "\u5b89\u5e86", "\u9ec4\u5c71\u5e02", "\u961c\u9633", "\u5bbf\u5dde", "\u6ec1\u5dde", "\u516d\u5b89", "\u5ba3\u57ce", "\u5de2\u6e56", "\u6c60\u5dde"]
        },
        "\u798f\u5efa": {
            name: "\u798f\u5efa\u7701",
            city: ["\u798f\u5dde", "\u53a6\u95e8", "\u8386\u7530", "\u4e09\u660e", "\u6cc9\u5dde", "\u6f33\u5dde", "\u5357\u5e73", "\u5b81\u5fb7", "\u9f99\u5ca9", "\u9647\u5357", "\u5e86\u9633"]
        },
        "\u6c5f\u897f": {
            name: "\u6c5f\u897f\u7701",
            city: ["\u5357\u660c", "\u666f\u5fb7\u9547", "\u8d63\u5dde", "\u840d\u4e61", "\u4e5d\u6c5f", "\u65b0\u4f59", "\u9e70\u6f6d", "\u5b9c\u6625", "\u4e0a\u9976", "\u5409\u5b89"]
        },
        "\u5c71\u4e1c": {
            name: "\u5c71\u4e1c\u7701",
            city: ["\u6d4e\u5357", "\u9752\u5c9b", "\u6dc4\u535a", "\u67a3\u5e84", "\u4e1c\u8425", "\u70df\u53f0", "\u6f4d\u574a", "\u6d4e\u5b81", "\u6cf0\u5b89", "\u5a01\u6d77", "\u65e5\u7167", "\u6ee8\u5dde", "\u5fb7\u5dde", "\u804a\u57ce", "\u4e34\u6c82", "\u83cf\u6cfd", "\u83b1\u829c"]
        },
        "\u6cb3\u5357": {
            name: "\u6cb3\u5357\u7701",
            city: ["\u90d1\u5dde", "\u5f00\u5c01", "\u6d1b\u9633", "\u5e73\u9876\u5c71", "\u5b89\u9633", "\u9e64\u58c1", "\u65b0\u4e61", "\u7126\u4f5c", "\u6fee\u9633", "\u8bb8\u660c", "\u6f2f\u6cb3", "\u4e09\u95e8\u5ce1", "\u5546\u4e18", "\u5468\u53e3", "\u9a7b\u9a6c\u5e97", "\u5357\u9633", "\u4fe1\u9633"]
        },
        "\u6e56\u5317": {
            name: "\u6e56\u5317\u7701",
            city: ["\u6b66\u6c49", "\u9ec4\u77f3", "\u5341\u5830", "\u968f\u5dde", "\u5b9c\u660c", "\u8944\u6a0a", "\u9102\u5dde", "\u8346\u95e8", "\u9ec4\u5188", "\u5b5d\u611f", "\u54b8\u5b81", "\u8346\u5dde", "\u6069\u65bd"]
        },
        "\u6e56\u5357": {
            name: "\u6e56\u5357\u7701",
            city: ["\u957f\u6c99", "\u8861\u9633", "\u90b5\u9633", "\u90f4\u5dde", "\u6c38\u5dde", "\u97f6\u5c71", "\u5f20\u5bb6\u754c", "\u6000\u5316", "\u5409\u9996", "\u682a\u6d32", "\u6e58\u6f6d", "\u5cb3\u9633", "\u5e38\u5fb7", "\u76ca\u9633", "\u5a04\u5e95"]
        },
        "\u5e7f\u4e1c": {
            name: "\u5e7f\u4e1c\u7701",
            city: ["\u5e7f\u5dde", "\u4f5b\u5c71", "\u6df1\u5733", "\u6c55\u5c3e", "\u60e0\u5dde", "\u6cb3\u6e90", "\u6e05\u8fdc", "\u4e1c\u839e", "\u73e0\u6d77", "\u6c5f\u95e8", "\u8087\u5e86", "\u4e2d\u5c71", "\u6e5b\u6c5f", "\u8302\u540d", "\u97f6\u5173", "\u6c55\u5934", "\u6885\u5dde", "\u9633\u6c5f", "\u6f6e\u5dde", "\u987a\u5fb7", "\u63ed\u9633", "\u4e91\u6d6e"]
        },
        "\u5e7f\u897f": {
            name: "\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a",
            city: ["\u5357\u5b81", "\u68a7\u5dde", "\u7389\u6797", "\u6842\u6797", "\u767e\u8272", "\u6cb3\u6c60", "\u94a6\u5dde", "\u67f3\u5dde", "\u5317\u6d77", "\u9632\u57ce\u6e2f", "\u8d35\u6e2f", "\u8d3a\u5dde"]
        },
        "\u6d77\u5357": {
            name: "\u6d77\u5357\u7701",
            city: ["\u6d77\u53e3", "\u4e09\u4e9a", "\u897f\u6c99\u7fa4\u5c9b"]
        },
        "\u56db\u5ddd": {
            name: "\u56db\u5ddd\u7701",
            city: ["\u6210\u90fd", "\u7709\u5c71", "\u96c5\u5b89", "\u5ce8\u5d4b\u5c71", "\u81ea\u8d21", "\u91cd\u5e86", "\u4e07\u5dde", "\u6daa\u9675", "\u5357\u5145", "\u6cf8\u5dde", "\u5fb7\u9633", "\u7ef5\u9633", "\u9042\u5b81", "\u5185\u6c5f", "\u4e50\u5c71", "\u5b9c\u5bbe", "\u5e7f\u5143", "\u8fbe\u5dde", "\u8d44\u9633", "\u6500\u679d\u82b1", "\u963f\u575d", "\u7518\u5b5c", "\u51c9\u5c71", "\u5e7f\u5b89", "\u5df4\u4e2d"]
        },
        "\u8d35\u5dde": {
            name: "\u8d35\u5dde\u7701",
            city: ["\u8d35\u9633", "\u516d\u76d8\u6c34", "\u94dc\u4ec1", "\u5b89\u987a", "\u51ef\u91cc", "\u90fd\u5300", "\u5174\u4e49", "\u6bd5\u8282", "\u9075\u4e49"]
        },
        "\u4e91\u5357": {
            name: "\u4e91\u5357\u7701",
            city: ["\u6606\u660e", "\u5fb7\u5b8f", "\u66f2\u9756", "\u695a\u96c4", "\u7389\u6eaa", "\u7ea2\u6cb3", "\u6587\u5c71", "\u601d\u8305", "\u662d\u901a", "\u897f\u53cc\u7248\u7eb3", "\u5927\u7406", "\u4fdd\u5c71", "\u6012\u6c5f", "\u4e3d\u6c5f", "\u8fea\u5e86", "\u4e34\u6ca7"]
        },
        "\u897f\u85cf": {
            name: "\u897f\u85cf\u81ea\u6cbb\u533a",
            city: ["\u62c9\u8428", "\u660c\u90fd", "\u5c71\u5357", "\u65e5\u5580\u5219", "\u90a3\u66f2", "\u963f\u91cc", "\u6797\u829d"]
        },
        "\u9655\u897f": {
            name: "\u9655\u897f\u7701",
            city: ["\u897f\u5b89", "\u94dc\u5ddd", "\u5b9d\u9e21", "\u54b8\u9633", "\u6e2d\u5357", "\u6c49\u4e2d", "\u5b89\u5eb7", "\u5546\u6d1b", "\u5ef6\u5b89", "\u6986\u6797"]
        },
        "\u7518\u8083": {
            name: "\u7518\u8083\u7701",
            city: ["\u5170\u5dde", "\u767d\u94f6", "\u91d1\u660c", "\u5929\u6c34", "\u5f20\u6396", "\u6b66\u5a01", "\u5b9a\u897f", "\u5e73\u51c9", "\u4e34\u590f", "\u5609\u5cea\u5173", "\u9152\u6cc9"]
        },
        "\u9752\u6d77": {
            name: "\u9752\u6d77\u7701",
            city: ["\u897f\u5b81", "\u679c\u6d1b", "\u6d77\u897f", "\u683c\u5c14\u6728", "\u6d77\u4e1c", "\u6d77\u5317", "\u7389\u6811", "\u9ec4\u5357"]
        },
        "\u5b81\u590f": {
            name: "\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a",
            city: ["\u94f6\u5ddd", "\u77f3\u5634\u5c71", "\u5434\u5fe0", "\u56fa\u539f"]
        },
        "\u65b0\u7586": {
            name: "\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a",
            city: ["\u4e4c\u9c81\u6728\u9f50", "\u514b\u62c9\u739b\u4f9d", "\u5410\u9c81\u756a", "\u54c8\u5bc6", "\u660c\u5409", "\u535a\u4e50", "\u5e93\u5c14\u52d2", "\u963f\u514b\u82cf", "\u514b\u5dde", "\u5580\u4ec0", "\u4f0a\u7281", "\u77f3\u6cb3\u5b50", "\u5854\u57ce", "\u963f\u52d2\u6cf0", "\u548c\u7530"]
        },
        "\u53f0\u6e7e": {
            name: "\u53f0\u6e7e\u7701",
            city: ["\u53f0\u5317"]
        },
        "\u9999\u6e2f": {
            name: "\u9999\u6e2f\u7279\u522b\u884c\u653f\u533a",
            city: ["\u9999\u6e2f"]
        },
        "\u6fb3\u95e8": {
            name: "\u6fb3\u95e8\u7279\u522b\u884c\u653f\u533a",
            city: ["\u6fb3\u95e8"]
        }
    }
    var y3 = new O0("cmd", "/", new Date(2046, 1, 1)),
    z3 = new O0("run", "/", new Date(2046, 1, 1)),
    P = {
        command: function($) {
            y3.set(Q.encode($))
        },
        getCommand: function() {
            var $ = y3.get();
            z3.set(new Date() * 1);
            if ($) {
                y3.set("");
                return Q.decode($)
            } else return false
        },
        isIbaiduRun: function(_) {
            var $ = z3.get();
            if ($ && (new Date() * 1 - $ < (_ || 1500))) return true;
            else return false
        }
    }
    function Bubble($) {
        this.wid = $
    }
    var $4 = new F2(),
    _4 = new F2();
    Bubble.prototype.popup = function(C, $) {
        function G() {
            if (I) {
                clearInterval(F);
                $4.opacity(H, 1, 0,
                function() {
                    E(H).remove()
                });
                clearTimeout(I);
                I = null;
                E(document).detach("mouseup", G);
                E(window).detach("resize", B)
            }
        }
        var J = this;
        function K() {
            var _ = E(H),
            A = E($).getRegion(),
            B = E(D).getPosition();
            _.style.top = A.top - B.top - 39 + "px";
            _.style.left = A.right - _.offsetWidth + "px"
        }
        function B() {
            setTimeout(K, 100)
        }
        E(document).attach("mouseup", G);
        E(window).attach("resize", B);
        var A = this.wid,
        D = document.body,
        I = setTimeout(G, 1000 * 60 * 5),
        _ = new c("div"),
        H = _.uid();
        _.className = "bubble";
        _.setOpacity(0.1);
        D.appendChild(_);
        _.innerHTML = y1.render({
            title: C,
            close: z(G)
        });
        var F = _4.opacity(H, 0, 1,
        function() {
            q()
        });
        K();
        _ = null;
        q()
    }
    function setupDateGrid(W) {
        function A($) {
            return (($.getMonth() + 1) * 100 + $.getDate())
        }
        function _(E) {
            var _ = [],
            B = new Date(E.getFullYear(), E.getMonth(), E.getDate()),
            $ = E.getTime(),
            D = new Date((E = new Date()).getFullYear(), E.getMonth(), E.getDate()).getTime(),
            C;
            B.setDate(1);
            B.setDate(2 - (B.getDay() || 7));
            for (var A = 0; A < 42; A++) {
                if (B.getTime() == $) _.selectedIndex = A;
                if (B.getTime() == D) _.todayIndex = A;
                _.push(H(B));
                B.setDate(B.getDate() + 1);
                if (A == 34 && B.getDate() < 10) break
            }
            return _
        }
        function H($) {
            $ = {
                year: $.getFullYear(),
                month: $.getMonth() + 1,
                date: $.getDate(),
                day: $.getDay()
            };
            $.key = [$.year, $.month, $.date].join("-");
            return $
        }
        function J($) {
            W.config.eventMap = $
        }
        var K = W.config.eventMap || (W.config.eventMap = {}),
        C = {},
        L;
        W.selectedTab = 0;
        W.eventMap = K;
        var B = K[H(new Date()).key];
        if (B) {
            B = B[0];
            var G = new O0("date-grid-notified");
            if (!G.get()) {
                var $ = new Date();
                G.expires = new Date($.getFullYear(), $.getMonth(), $.getDate() + 1);
                G.set(true)
            }
            setTimeout(function() {
                if (E(W.id).offsetWidth == 0) {
                    var $ = E(W.id).parentNode.parentNode.id.replace(/page/, "tab");
                    if ($ != Bubble.tabId) {
                        Bubble.tabId = $;
                        var _ = new Bubble();
                        _.popup("\u60a8\u4eca\u5929\u7684\u65e5\u7a0b\u6709\uff1a" + B.title, $)
                    }
                } else {
                    _ = new Bubble(W.id);
                    _.popup("\u60a8\u4eca\u5929\u7684\u65e5\u7a0b\u6709\uff1a" + B.title, W.id)
                }
            },
            2000)
        }
        var N = "wt" + W.type + "-",
        U = N + "date-over",
        P = new Dialog("\u6dfb\u52a0\u4e8b\u4ef6", W.templateMap.event);
        W.inject("action", {
            overDate: function() {
                E(this).addClass(U)
            },
            outDate: function() {
                E(this).removeClass(U)
            },
            selectDate: function(A, $, B, _) {
                W.selectedDate = new Date(A, $ - 1, B);
                if (typeof _ == "boolean") W.selectedTab = _ ? 1 : 0;
                W.repaint()
            },
            collapseHistory: function() {
                if (W.config.historyMode == "expand") {
                    this.title = "\u5c55\u5f00";
                    var $ = W.config.historyMode = "scroll";
                    I()
                } else {
                    this.title = "\u6298\u53e0";
                    $ = W.config.historyMode = "expand";
                    F()
                }
                W.save()
            },
            inputEvent: function() {
                var $ = H(W.selectedDate),
                B = K[$.key],
                _ = {
                    date: $.key
                };
                B = B && B[0];
                for (var A in B) _[A] = B[A];
                P.action = W.action;
                P.popup("\u6dfb\u52a0\u65e5\u7a0b", _)
            },
            removeEvent: function() {
                var _ = H(W.selectedDate),
                $ = _.key;
                delete K[$];
                W.save(function() {
                    W.reset()
                })
            },
            checkDate: function() {
                if (!M(this.value)) this.style.background = "red";
                else this.style.background = "#FFF"
            },
            saveEvent: function() {
                var B = this.form,
                _ = B.title.value,
                C = B.description.value,
                $ = B.date;
                $ = M($.options[$.selectedIndex].value);
                if (!_) {
                    alert("\u65e5\u7a0b\u6807\u9898\u4e0d\u80fd\u4e3a\u7a7a");
                    B.title.focus();
                    return false
                } else if (!$) {
                    alert("\u65e5\u7a0b\u65e5\u671f\u65e0\u6548");
                    B.date.focus();
                    return false
                } else if (!C) {
                    alert("\u65e5\u7a0b\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
                    B.description.focus();
                    return false
                } else {
                    var A = {
                        title: _,
                        description: C
                    };
                    R($, A);
                    P.dispose()
                }
            },
            cancelEvent: function() {
                P.dispose()
            },
            overHandle: function() {
                if (W.config.historyMode == "scroll") this.style.backgroundPosition = "right top";
                else this.style.backgroundPosition = "right center"
            },
            outHandle: function() {
                if (W.config.historyMode == "scroll") this.style.backgroundPosition = "left top";
                else this.style.backgroundPosition = "center top"
            }
        });
        W.inject("repaint",
        function() {
            var $ = this.selectedDate;
            if (!$) {
                $ = new Date();
                this.selectedDate = $ = new Date($.getFullYear(), $.getMonth(), $.getDate())
            }
            this.dateList = _($);
            this.chineseDate = new A4($);
            if (W.config.historyMode != "scroll") {
                try {
                    F()
                } catch(A) {}
            }
        },
        function() {
            if (W.config.historyMode == "scroll") setTimeout(I, 0)
        });
        W.inject("save",
        function() {
            this.config.eventMap = this.eventMap
        });
        function I() {
            if (L) F();
            var $ = 0,
            _ = W.id + "-history";
            L = [];
            E(_).parentNode.className = N + "scroll";
            function A(B) {
                var C = E(_);
                if (C && L) {
                    var A = C.getElementsByTagName("li"),
                    G = A.length,
                    F = A[$],
                    D = A[$ = ($ + 1) % G];
                    L[1] = new F2(0.4, null, 100).opacity(F, 0.5, 0,
                    function() {
                        F.style.display = "none";
                        F.style.position = "relative"
                    });
                    F.style.position = "absolute";
                    D.style.display = "block";
                    L[2] = new F2(0.4, null, 100).opacity(D, 0, 1)
                }
                if (S.alive());
            }
            L[0] = setInterval(A, 8000);
            E(_).getElementsByTagName("li")[0].style.display = "block";
            q()
        }
        function F() {
            if (L) {
                while (L.length) window.clearInterval(L.pop());
                L = null;
                var C = W.id + "-history",
                B = E(C);
                B.parentNode.className = N + "expand";
                var _ = B.getElementsByTagName("li"),
                A = _.length;
                while (A--) {
                    var $ = E(_[A]);
                    $.setOpacity(1);
                    $.style.position = "";
                    $.show()
                }
                q()
            }
        }
        function M(C) {
            C = C.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
            if (C != null) {
                var _ = parseInt(C[1], 10),
                B = parseInt(C[2], 10) - 1,
                A = parseInt(C[3], 10),
                $ = new Date(_, B, A);
                if ($.getDate() == A && B == $.getMonth()) return $
            }
        }
        function O($) {}
        function R(B, C) {
            var A = new Date().getTime();
            if (A - B > V) {
                alert("\u5f53\u524d\u7248\u672c\u53ea\u5141\u8bb8\u8bb0\u5f55\u4e00\u4e2a\u6708\u4ee5\u5185\u7684\u65e5\u7a0b");
                return
            }
            var $ = {};
            for (var _ in K) if (Math.abs(A - M(_)) < V) $[_] = K[_];
            else delete K[_];
            _ = H(B).key;
            $[_] = [C];
            if (Q.encode($).length < D) {
                K[_] = [C];
                W.save();
                W.reset()
            } else alert(T)
        }
        var D = 1000,
        T = "\u65e5\u7a0b\u6570\u636e\u91cf\u8d85\u8fc7\u9650\u5236\uff0c\u6211\u4eec\u53ea\u80fd\u5b58\u50a8800\u5b57\u7b26\u4ee5\u5185\u7684\u6570\u636e",
        V = 1000 * 60 * 60 * 24 * 31
    }
    var D4 = ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],
    B4 = ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"],
    F4 = ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"],
    C4 = ["\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"],
    H4 = ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"],
    I4 = 24 * 3600 * 1000,
    G4 = [2635, 333387, 1701, 1748, 267701, 694, 2391, 133423, 1175, 396438, 3402, 3749, 331177, 1453, 694, 201326, 2350, 465197, 3221, 3402, 400202, 2901, 1386, 267611, 605, 2349, 137515, 2709, 464533, 1738, 2901, 330421, 1242, 2651, 199255, 1323, 529706, 3733, 1706, 398762, 2741, 1206, 267438, 2647, 1318, 204070, 3477, 461653, 1386, 2413, 330077, 1197, 2637, 268877, 3365, 531109, 2900, 2922, 398042, 2395, 1179, 267415, 2635, 661067, 1701, 1748, 398772, 2742, 2391, 330031, 1175, 1611, 200010, 3749, 527717, 1452, 2742, 332397, 2350, 3222, 268949, 3402, 3493, 133973, 1386, 464219, 605, 2349, 334123, 2709, 2890, 267946, 2773, 592565, 1210, 2651, 395863, 1323, 2707, 265877],
    J4 = new Date(1921, 1, 7) * 1;
    function A4($) {
        this.date = $
    }
    A4.prototype = {
        getData: function() {
            var $ = this.date;
            if (this.time != $.getTime()) {
                this.time = $.getTime();
                this.data = E4($.getFullYear(), $.getMonth(), $.getDate())
            }
            return this.data
        },
        getYear: function() {
            return this.getData().year
        },
        getMonth: function() {
            return this.getData().month
        },
        getDate: function() {
            return this.getData().date
        },
        toString: function() {
            var _ = this.getYear(),
            $ = this.getMonth(),
            B = this.getDate(),
            A = [D4[(_ - 4) % 10]];
            A.push(B4[(_ - 4) % 12]);
            A.push("[" + F4[(_ - 4) % 12] + "] \u5e74\n");
            if ($ < 1) {
                A.push("[\u95f0]");
                A.push(H4[ - $ - 1])
            } else A.push(H4[$ - 1]);
            A.push("\u6708 ");
            A.push(B < 11 ? "\u521d": B < 20 ? "\u5341": B < 30 ? "\u5eff": "\u4e09\u5341");
            if (B != 20 && B != 30) A.push(C4[(B - 1) % 10]);
            return A.join("")
        }
    };
    function E4(A, _, F) {
        var B = (new Date(A, _, F) - J4) / I4,
        D = 0,
        $,
        E,
        C;
        if (B < 1) throw new Error("\u8d8a\u754c\u65e5\u671f" + new Date(A, _, F));
        $: while (true) {
            E = G4[D];
            C = E >> 16;
            $ = C ? 13 : 12;
            while ($--) {
                if (B <= 29 + (E >> $ & 1)) break $;
                B -= (29 + (E >> $ & 1))
            }
            D++
        }
        D += 1921;
        $ = 12 - $;
        if (C) if ($ == C) $ = -$;
        else if ($ < C) $++;
        return {
            year: D,
            month: $,
            date: B
        }
    }
    var M4 = [],
    Q4 = false;
    function showTooltip(A, $) {
        M4 = [0, 1];
        Q4 = true;
        var _ = E("tooltip");
        _.innerHTML = $;
        _.style.display = "block";
        N4(A);
        _.onmouseout = O4;
        A.onmouseout = K4;
        A.onmouseover = _.onmouseover = L4
    }
    function N4($) {
        var _ = E("tooltip"),
        A = E($).getPosition();
        _.style.left = A.left + $.offsetWidth + "px";
        _.style.top = A.top + "px"
    }
    function L4() {
        Q4 = true
    }
    function K4($) {
        M4[0] = 1;
        Q4 = false;
        P4()
    }
    function O4($) {
        Q4 = false;
        M4[1] = 1;
        P4()
    }
    function P4() {
        setTimeout(function() {
            if (!Q4) E("tooltip").style.display = "none"
        },
        100)
    }
})