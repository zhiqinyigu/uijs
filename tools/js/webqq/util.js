WEBQQ = {
    version: 1.1,
    author: "sunnyshi"
};
WEBQQ.namespace = function() {
    var a = arguments,
    o = null,
    i, j, d, rt;
    for (i = 0; i < a.length; ++i) {
        d = a[i].split(".");
        rt = d[0];
        eval("if(typeof(" + rt + ')=="undefined"){' + rt + "={};};o=" + rt + ";");
        for (j = 1; j < d.length; ++j) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]]
        }
    }
};
WEBQQ.namespace("WEBQQ", "WEBQQ.cls", "WEBQQ.obj", "WEBQQ.util");
if ((typeof(YAHOO) == "undefined") || !YAHOO) {
    alert("网页加载不完整，请刷新后重试！");
    throw new Error("Sorry, load resource failed, please refresh and try it again!")
}
var ua = navigator.userAgent.toLowerCase();
if ((ua.indexOf("msie") > -1) && !(ua.indexOf("msie 7") > -1)) {
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch(e) {}
}
window.onerror = function(g, b, a) {
    try {
        WEBQQ.obj.QQClient.reportStat(59504);
        var f = (b || "").replace(/\\/g, "/").split("/");
        var c = f + " - " + g + " - line(" + a + ")";
        WEBQQ.obj.QQClient.reportText(c);
        c = f[f.length - 1] + "_line" + a + "";
        pgvSendClick({
            hottag: "onerror." + c
        })
    } catch(d) {}
    return true
};
var webapp_server_domain = "";
var ptlogin_server_domain = "http://ui.ptlogin2.qq.com";
var img_server_domain = "";
var face_server_domain = "http://qun.qq.com";
var buddy_impression_server_domain = "http://apps.qq.com";
var buddy_situation_server_domain = "http://sns.qq.com/buddy_state";
var qzone_user_server_domain = "http://user.qzone.qq.com";
var qzone_imgcache_server_domain = "imgcache.qq.com";
var qmail_server_domain = "http://mail.qq.com";
var group_space_server_domain = "http://group.qq.com";
var qun_space_server_domain = "http://qun.qq.com";
var chat_pic_server_domain = "http://file1.web.qq.com";
var chat_tmp_server_domain = "http://sns.qq.com";
var file_send_server_domain = "http://file1.web.qq.com";
var multi_split = "\x1d";
function BubbleSort(a, h) {
    var f = new Date();
    var c;
    var b;
    for (var g = 0; g < a.length; g++) {
        b = false;
        for (var d = a.length - 2; d >= g; d--) {
            if ((a[d + 1][h]) > (a[d][h])) {
                c = a[d + 1];
                a[d + 1] = a[d];
                a[d] = c;
                b = true
            }
        }
        if (!b) {
            break
        }
    }
    return a
}
function getEnv() {
    var b = navigator.userAgent,
    d = 0,
    f;
    var a = {
        0 : "Other",
        1 : "TT",
        2 : "Maxthon",
        3 : "IE6",
        4 : "IE7",
        5 : "Firefox",
        6 : "Safari",
        7 : "Opera",
        8 : "Chrome"
    };
    var g = {
        20 : "Windows",
        21 : "Not Windows"
    };
    var c = 0;
    try {
        window.external.ShowBrowserUI(c)
    } catch(h) {
        c = 1
    }
    if (b.indexOf("Maxthon") > -1 && !c) {
        d = 2
    } else {
        if (b.indexOf("TencentTraveler") > -1 && !c) {
            d = 1
        } else {
            if (b.indexOf("MSIE 6.0") > -1) {
                d = 3
            } else {
                if (b.indexOf("MSIE 7.0") > -1) {
                    d = 4
                } else {
                    if (b.indexOf("Firefox") > -1) {
                        d = 5
                    } else {
                        if (b.indexOf("Chrome") > -1) {
                            d = 8
                        } else {
                            if (b.indexOf("Safari") > -1 && b.indexOf("Chrome") == -1) {
                                d = 6
                            } else {
                                if (b.indexOf("Opera") > -1) {
                                    d = 7
                                } else {
                                    d = 0
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (b.indexOf("Windows") > -1) {
        f = 20
    } else {
        f = 21
    }
    return [f, d]
}
function GetFileSize(c) {
    var f = new Image();
    var b = c.value;
    var a;
    try {
        f.dynsrc = b
    } catch(d) {
        a = 0
    }
    a = f.fileSize || 0;
    if (a == 0 && c.files) {
        try {
            a = c.files[0].fileSize
        } catch(d) {
            a = c.files.item(0).fileSize
        }
    }
    return a
} (function() {
    var b = YAHOO.util.Dom,
    d = YAHOO.util.Event,
    c = YAHOO.util.Easing,
    a = YAHOO.widget.ContainerEffect;
    d.fromEle = function(f) {
        f = d.getEvent(f);
        return d.getTarget(f)
    };
    d.getExpTarget = function(f) {
        f = d.getEvent(f);
        if (f.explicitOriginalTarget) {
            return f.explicitOriginalTarget
        }
        if (f.fromElement) {
            return f.fromElement
        }
        return null
    };
    Number.prototype.between = function(g, f) {
        return ((this >= g) && (this < f))
    };
    Number.prototype.toHex = function() {
        var i = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var g = "",
        f = this;
        if (isNaN(f)) {
            return "00"
        }
        g = (i[(f & 240) >> 4] + i[(f & 15)]);
        if (f > 255) {
            g = (i[(f & 61440) >> 12] + i[(f & 3840) >> 8]) + g
        }
        if (f > 65535) {
            g = (i[(f & 15728640) >> 20] + i[(f & 983040) >> 16]) + g
        }
        if (f > 16777215) {
            g = (i[(f & 4026531840) >> 28] + i[(f & 251658240) >> 24]) + g
        }
        return g
    };
    String.prototype.toHex = function() {
        return Number(this).toHex()
    };
    String.prototype.escape2html = function() {
        return unescape(this).replace(/&/gi, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n\r/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />")
    };
    String.prototype.escape2name = function() {
        return unescape(this).replace(/&/gi, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/\r\n/gi, "&nbsp;").replace(/\n\r/gi, "&nbsp;").replace(/\n/gi, "&nbsp;").replace(/\r/gi, "&nbsp;")
    };
    String.prototype.escape2taskbar = function() {
        return this.replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&nbsp;/gi, " ")
    };
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "")
    };
    String.prototype.ltrim = function() {
        return this.replace(/(^\s*)/g, "")
    };
    String.prototype.rtrim = function() {
        return this.replace(/(\s*$)/g, "")
    };
    String.prototype.toTitle = function() {
        return this.replace(/\'/gi, "&#39;").replace(/\"/gi, "&quot;")
    };
    String.prototype.ewToOriginal = function() {
        return this.replace(/&#160;/gi, " ").replace(/&nbsp;/gi, " ").replace(/&#92;/gi, "\\").replace(/<br>/gi, "").replace(/&#39;/gi, "'").replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    };
    String.prototype.toOriginal = function() {
        return this.replace(/&#160;/gi, " ").replace(/&nbsp;/gi, " ").replace(/&#92;/gi, "\\").replace(/<br>/gi, "\n").replace(/&#39;/gi, "'").replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    };
    String.prototype.toHtml = function() {
        return this.replace(/&/gi, "&amp;").replace(/\\/gi, "&#92;").replace(/\'/gi, "&#39;").replace(/\"/gi, "&quot;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/ /gi, "&nbsp;").replace(/\n/gi, "<br />")
    };
    String.prototype.forHtml = function() {
        return this.replace(/&/gi, "&amp;").replace(/\\/gi, "&#92;").replace(/\'/gi, "&#39;").replace(/\"/gi, "&quot;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/ /gi, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n\r/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />")
    };
    String.prototype.forTitle = function() {
        return this.replace(/\\/gi, "\\").replace(/\'/gi, " ").replace(/\"/gi, " ")
    };
    String.prototype.toTextareaHtml = function() {
        return this.replace(/&/gi, "&amp;").replace(/\\/gi, "&#92;").replace(/\'/gi, "&#39;").replace(/\"/gi, "&quot;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/ /gi, "&nbsp;").replace(/\n/gi, "\n")
    };
    String.prototype.forChatlog = function() {
        return this.replace(/%3B/g, ";").replace(/%27/g, "'").replace(/%3C/g, "<").replace(/%3E/g, ">").replace(/%0A/g, "\r").replace(/%0D/g, "\n").replace(/%5C/g, "\\").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/%22/g, '"')
    };
    String.prototype.getCharLength = function() {
        return this.replace(/[^\x00-\xff]/g, "aa").length
    };
    String.prototype.cutRight = function(f) {
        return this.substring(0, this.length - f)
    };
    String.prototype.indexOfChar = function(g) {
        var f = this;
        while (f.getCharLength() > g) {
            f = f.substring(0, f.length - 1)
        }
        return f.length
    };
    String.prototype.subStringByChar = function(h, f) {
        var g = this;
        var j = g.indexOfChar(h);
        if (f) {
            var i = g.indexOfChar(f)
        } else {
            var i = g.length
        }
        g = g.substring(j, i);
        return g
    };
    String.prototype.replaceAll = function(f, h, g) {
        if (!RegExp.prototype.isPrototypeOf(f)) {
            return this.replace(new RegExp(f, (g ? "gi": "g")), h)
        } else {
            return this.replace(f, h)
        }
    };
    String.prototype.isEmail = function() {
        var f = this;
        if (f.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
            return true
        } else {
            return false
        }
    };
    String.prototype.isNumber = function() {
        var f = this;
        if (f.search(/^\d+$/) != -1) {
            return true
        } else {
            return false
        }
    };
    String.prototype.md5 = function(m, E) {
        var l = this;
        E = E || 1;
        if (E > 1) {
            var N, Y;
            N = this;
            for (Y = 0; Y < E; Y++) {
                N = N.md5(m)
            }
            return N
        } else {
            function P(k, i) {
                return (k << i) | (k >>> (32 - i))
            }
            function O(F, k) {
                var H, i, x, G, s;
                x = (F & 2147483648);
                G = (k & 2147483648);
                H = (F & 1073741824);
                i = (k & 1073741824);
                s = (F & 1073741823) + (k & 1073741823);
                if (H & i) {
                    return (s ^ 2147483648 ^ x ^ G)
                }
                if (H | i) {
                    if (s & 1073741824) {
                        return (s ^ 3221225472 ^ x ^ G)
                    } else {
                        return (s ^ 1073741824 ^ x ^ G)
                    }
                } else {
                    return (s ^ x ^ G)
                }
            }
            function v(i, s, k) {
                return (i & s) | ((~i) & k)
            }
            function u(i, s, k) {
                return (i & k) | (s & (~k))
            }
            function t(i, s, k) {
                return (i ^ s ^ k)
            }
            function r(i, s, k) {
                return (s ^ (i | (~k)))
            }
            function y(F, k, ae, I, i, G, H) {
                F = O(F, O(O(v(k, ae, I), i), H));
                return O(P(F, G), k)
            }
            function g(F, k, ae, I, i, G, H) {
                F = O(F, O(O(u(k, ae, I), i), H));
                return O(P(F, G), k)
            }
            function L(F, k, ae, I, i, G, H) {
                F = O(F, O(O(t(k, ae, I), i), H));
                return O(P(F, G), k)
            }
            function w(F, k, ae, I, i, G, H) {
                F = O(F, O(O(r(k, ae, I), i), H));
                return O(P(F, G), k)
            }
            function f(H) {
                var I;
                var x = H.length;
                var s = x + 8;
                var k = (s - (s % 64)) / 64;
                var G = (k + 1) * 16;
                var ae = Array(G - 1);
                var i = 0;
                var F = 0;
                while (F < x) {
                    I = (F - (F % 4)) / 4;
                    i = (F % 4) * 8;
                    ae[I] = (ae[I] | (H.charCodeAt(F) << i));
                    F++
                }
                I = (F - (F % 4)) / 4;
                i = (F % 4) * 8;
                ae[I] = ae[I] | (128 << i);
                ae[G - 2] = x << 3;
                ae[G - 1] = x >>> 29;
                return ae
            }
            function J(s) {
                var k = "",
                x = "",
                F, i;
                for (i = 0; i <= 3; i++) {
                    F = (s >>> (i * 8)) & 255;
                    x = "0" + F.toString(16);
                    k = k + x.substr(x.length - 2, 2)
                }
                return k
            }
            var K = Array();
            var T, j, M, z, h, ad, ac, ab, aa;
            var W = 7,
            U = 12,
            R = 17,
            Q = 22;
            var D = 5,
            C = 9,
            B = 14,
            A = 20;
            var q = 4,
            p = 11,
            o = 16,
            n = 23;
            var Z = 6,
            X = 10,
            V = 15,
            S = 21;
            K = f(l);
            ad = 1732584193;
            ac = 4023233417;
            ab = 2562383102;
            aa = 271733878;
            for (T = 0; T < K.length; T += 16) {
                j = ad;
                M = ac;
                z = ab;
                h = aa;
                ad = y(ad, ac, ab, aa, K[T + 0], W, 3614090360);
                aa = y(aa, ad, ac, ab, K[T + 1], U, 3905402710);
                ab = y(ab, aa, ad, ac, K[T + 2], R, 606105819);
                ac = y(ac, ab, aa, ad, K[T + 3], Q, 3250441966);
                ad = y(ad, ac, ab, aa, K[T + 4], W, 4118548399);
                aa = y(aa, ad, ac, ab, K[T + 5], U, 1200080426);
                ab = y(ab, aa, ad, ac, K[T + 6], R, 2821735955);
                ac = y(ac, ab, aa, ad, K[T + 7], Q, 4249261313);
                ad = y(ad, ac, ab, aa, K[T + 8], W, 1770035416);
                aa = y(aa, ad, ac, ab, K[T + 9], U, 2336552879);
                ab = y(ab, aa, ad, ac, K[T + 10], R, 4294925233);
                ac = y(ac, ab, aa, ad, K[T + 11], Q, 2304563134);
                ad = y(ad, ac, ab, aa, K[T + 12], W, 1804603682);
                aa = y(aa, ad, ac, ab, K[T + 13], U, 4254626195);
                ab = y(ab, aa, ad, ac, K[T + 14], R, 2792965006);
                ac = y(ac, ab, aa, ad, K[T + 15], Q, 1236535329);
                ad = g(ad, ac, ab, aa, K[T + 1], D, 4129170786);
                aa = g(aa, ad, ac, ab, K[T + 6], C, 3225465664);
                ab = g(ab, aa, ad, ac, K[T + 11], B, 643717713);
                ac = g(ac, ab, aa, ad, K[T + 0], A, 3921069994);
                ad = g(ad, ac, ab, aa, K[T + 5], D, 3593408605);
                aa = g(aa, ad, ac, ab, K[T + 10], C, 38016083);
                ab = g(ab, aa, ad, ac, K[T + 15], B, 3634488961);
                ac = g(ac, ab, aa, ad, K[T + 4], A, 3889429448);
                ad = g(ad, ac, ab, aa, K[T + 9], D, 568446438);
                aa = g(aa, ad, ac, ab, K[T + 14], C, 3275163606);
                ab = g(ab, aa, ad, ac, K[T + 3], B, 4107603335);
                ac = g(ac, ab, aa, ad, K[T + 8], A, 1163531501);
                ad = g(ad, ac, ab, aa, K[T + 13], D, 2850285829);
                aa = g(aa, ad, ac, ab, K[T + 2], C, 4243563512);
                ab = g(ab, aa, ad, ac, K[T + 7], B, 1735328473);
                ac = g(ac, ab, aa, ad, K[T + 12], A, 2368359562);
                ad = L(ad, ac, ab, aa, K[T + 5], q, 4294588738);
                aa = L(aa, ad, ac, ab, K[T + 8], p, 2272392833);
                ab = L(ab, aa, ad, ac, K[T + 11], o, 1839030562);
                ac = L(ac, ab, aa, ad, K[T + 14], n, 4259657740);
                ad = L(ad, ac, ab, aa, K[T + 1], q, 2763975236);
                aa = L(aa, ad, ac, ab, K[T + 4], p, 1272893353);
                ab = L(ab, aa, ad, ac, K[T + 7], o, 4139469664);
                ac = L(ac, ab, aa, ad, K[T + 10], n, 3200236656);
                ad = L(ad, ac, ab, aa, K[T + 13], q, 681279174);
                aa = L(aa, ad, ac, ab, K[T + 0], p, 3936430074);
                ab = L(ab, aa, ad, ac, K[T + 3], o, 3572445317);
                ac = L(ac, ab, aa, ad, K[T + 6], n, 76029189);
                ad = L(ad, ac, ab, aa, K[T + 9], q, 3654602809);
                aa = L(aa, ad, ac, ab, K[T + 12], p, 3873151461);
                ab = L(ab, aa, ad, ac, K[T + 15], o, 530742520);
                ac = L(ac, ab, aa, ad, K[T + 2], n, 3299628645);
                ad = w(ad, ac, ab, aa, K[T + 0], Z, 4096336452);
                aa = w(aa, ad, ac, ab, K[T + 7], X, 1126891415);
                ab = w(ab, aa, ad, ac, K[T + 14], V, 2878612391);
                ac = w(ac, ab, aa, ad, K[T + 5], S, 4237533241);
                ad = w(ad, ac, ab, aa, K[T + 12], Z, 1700485571);
                aa = w(aa, ad, ac, ab, K[T + 3], X, 2399980690);
                ab = w(ab, aa, ad, ac, K[T + 10], V, 4293915773);
                ac = w(ac, ab, aa, ad, K[T + 1], S, 2240044497);
                ad = w(ad, ac, ab, aa, K[T + 8], Z, 1873313359);
                aa = w(aa, ad, ac, ab, K[T + 15], X, 4264355552);
                ab = w(ab, aa, ad, ac, K[T + 6], V, 2734768916);
                ac = w(ac, ab, aa, ad, K[T + 13], S, 1309151649);
                ad = w(ad, ac, ab, aa, K[T + 4], Z, 4149444226);
                aa = w(aa, ad, ac, ab, K[T + 11], X, 3174756917);
                ab = w(ab, aa, ad, ac, K[T + 2], V, 718787259);
                ac = w(ac, ab, aa, ad, K[T + 9], S, 3951481745);
                ad = O(ad, j);
                ac = O(ac, M);
                ab = O(ab, z);
                aa = O(aa, h)
            }
            if (m == 32) {
                return J(ad) + J(ac) + J(ab) + J(aa)
            } else {
                return J(ac) + J(ab)
            }
        }
    };
    Math.rand = function(g, f) {
        return Math.floor((Math.random() * (f - g + 1)) + g)
    };
    Date.prototype.format = function(g) {
        var h = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        if (/(y+)/.test(g)) {
            g = g.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        for (var f in h) {
            if (new RegExp("(" + f + ")").test(g)) {
                g = g.replace(RegExp.$1, RegExp.$1.length == 1 ? h[f] : ("00" + h[f]).substr(("" + h[f]).length))
            }
        }
        return g
    }
})(); (function() {
    WEBQQ.namespace("WEBQQ.util");
    WEBQQ.util.Connect = {
        _msxml_progid: ["MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"],
        _request_from_header: "webqq_client",
        _post_request_header: "application/x-www-form-urlencoded; charset=UTF-8",
        _timeOut: {},
        _transaction_id: 0,
        _connect_counter: 0,
        _net_disconnect: false,
        ERR_CODE: {
            COMM_CODE: 0,
            ABORT_CODE: -1,
            NET_CODE: -2,
            SYS_CODE: -3
        },
        reset: function() {
            this._net_disconnect = false
        },
        stop: function() {
            this._net_disconnect = true
        },
        IsStop: function() {
            return this._net_disconnect
        },
        _createXhrObject: function(g) {
            var f = null,
            b;
            try {
                b = new XMLHttpRequest();
                f = {
                    conn: b,
                    tId: g
                }
            } catch(d) {
                for (var c = 0,
                a = this._msxml_progid.length; c < a; ++c) {
                    try {
                        b = new ActiveXObject(this._msxml_progid[c]);
                        f = {
                            conn: b,
                            tId: g
                        };
                        this._msxml_progid = [this._msxml_progid[c]];
                        break
                    } catch(d) {}
                }
            } finally {
                return f
            }
        },
        _getConnectionObject: function() {
            var b = null,
            c = this._transaction_id;
            try {
                b = this._createXhrObject(c);
                if (b) {
                    this._transaction_id++
                }
            } catch(a) {} finally {
                return b
            }
        },
        asyncSend: function(a, f, j, c) {
            var g = String(c).split(";");
            if (g[1] == "00" && this._connect_counter >= 1) {
                return
            }
            var d = null,
            h = null;
            do {
                if (this._net_disconnect) {
                    h = this.ERR_CODE.NET_CODE;
                    break
                }
                d = this._getConnectionObject();
                if (!d) {
                    h = this.ERR_CODE.SYS_CODE;
                    break
                }
            } while ( false );
            if (h) {
                var i = (j.argument) ? j.argument: null,
                b = this._createErrorObject(h, i);
                if (j.failure) {
                    if (!j.scope) {
                        j.failure(b)
                    } else {
                        j.failure.apply(j.scope, [b])
                    }
                }
                return
            }
            if ((a.toUpperCase() == "GET") && (j.cache === false)) {
                f += (((f.indexOf("?") == -1) ? "?": "&") + "rnd=" + new Date().valueOf().toString())
            }
            d.conn.open(a, f, true);
            d.conn.setRequestHeader("X-Requested-From", this._request_from_header);
            if (a.toUpperCase() == "POST") {
                d.conn.setRequestHeader("Content-Type", this._post_request_header)
            }
            this._handleReadyState(d, j);
            d.conn.send(String(c) || "");
            this._connect_counter++;
            return
        },
        _handleReadyState: function(d, f) {
            var c = this;
            var a = {};
            for (var b in f) {
                a[b] = f[b]
            }
            if (a.timeout) {
                this._timeOut[d.tId] = setTimeout(function() {
                    c.abort(d, a, true)
                },
                a.timeout)
            }
            d.conn.onreadystatechange = function() {
                if (d.conn && (d.conn.readyState === 4)) {
                    if (a.timeout) {
                        clearTimeout(c._timeOut[d.tId]);
                        delete c._timeOut[d.tId]
                    }
                    d.conn.onreadystatechange = function() {};
                    c._handleTransactionResponse(d, a, false)
                }
            }
        },
        _handleTransactionResponse: function(g, h, a) {
            var d, c, b = (h.argument) ? h.argument: null;
            this._connect_counter--;
            try {
                if ((g.conn.status !== undefined) && (g.conn.status !== 0)) {
                    d = g.conn.status
                } else {
                    d = 13030
                }
            } catch(f) {
                d = 13030
            }
            if ((d >= 200) && (d < 300) || (d === 1223)) {
                c = this._createResponseObject(g, b);
                if (h.success) {
                    if (!h.scope) {
                        h.success(c)
                    } else {
                        h.success.apply(h.scope, [c])
                    }
                }
            } else {
                switch (d) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    c = this._createExceptionObject(g.tId, b, (a ? a: false));
                    if (h.failure) {
                        if (!h.scope) {
                            h.failure(c)
                        } else {
                            h.failure.apply(h.scope, [c])
                        }
                    }
                    break;
                default:
                    c = this._createResponseObject(g, b);
                    if (h.failure) {
                        if (!h.scope) {
                            h.failure(c)
                        } else {
                            h.failure.apply(h.scope, [c])
                        }
                    }
                }
            }
            this._releaseObject(g);
            g = null;
            this._releaseObject(h);
            h = null;
            this._releaseObject(c);
            c = null
        },
        _createResponseObject: function(c, a) {
            var b = {};
            b.tId = c.tId;
            b.status = (c.conn.status == 1223) ? 204 : c.conn.status;
            b.statusText = (c.conn.status == 1223) ? "No Content": c.conn.statusText;
            b.responseText = c.conn.responseText;
            if (a) {
                b.argument = a
            }
            return b
        },
        _createExceptionObject: function(g, c, a) {
            var f = "communication failure",
            b = "transaction aborted";
            var d = {};
            d.tId = g;
            if (a) {
                d.status = this.ERR_CODE.ABORT_CODE;
                d.statusText = b
            } else {
                d.status = this.ERR_CODE.COMM_CODE;
                d.statusText = f
            }
            if (c) {
                d.argument = c
            }
            return d
        },
        _createErrorObject: function(b, c) {
            var a = "network disconnect",
            f = "system error";
            var d = {};
            if (b == this.ERR_CODE.NET_CODE) {
                d.status = this.ERR_CODE.NET_CODE;
                d.statusText = a
            } else {
                d.status = this.ERR_CODE.SYS_CODE;
                d.statusText = f
            }
            if (c) {
                d.argument = c
            }
            return d
        },
        abort: function(c, d, a) {
            var b;
            if (c && c.conn) {
                if (this._isCallInProgress(c)) {
                    c.conn.onreadystatechange = function() {};
                    c.conn.abort();
                    if (a) {
                        clearTimeout(this._timeOut[c.tId]);
                        delete this._timeOut[c.tId]
                    }
                    b = true
                }
            } else {
                b = false
            }
            if (b === true) {
                this._handleTransactionResponse(c, d, true)
            }
            return b
        },
        _isCallInProgress: function(a) {
            return ((a.readyState !== 4) && (a.readyState !== 0))
        },
        _releaseObject: function(b) {
            if (b) {
                for (var a in b) {
                    b[a] = null
                }
                b = null
            }
        },
        toString: function() {
            return "WEBQQ.util.Connect Singleton Object"
        }
    }
})(); (function() {
    WEBQQ.namespace("WEBQQ.util");
    WEBQQ.util.MD5 = {
        calcMD5: function(a) {
            return this._binl2hex(this._coreMD5(this._str2binl(a)))
        },
        _safe_add: function(a, d) {
            var c = (a & 65535) + (d & 65535);
            var b = (a >> 16) + (d >> 16) + (c >> 16);
            return (b << 16) | (c & 65535)
        },
        _rol: function(a, b) {
            return (a << b) | (a >>> (32 - b))
        },
        _cmn: function(i, f, d, c, h, g) {
            return this._safe_add(this._rol(this._safe_add(this._safe_add(f, i), this._safe_add(c, g)), h), d)
        },
        _ff: function(h, g, l, k, f, j, i) {
            return this._cmn((g & l) | ((~g) & k), h, g, f, j, i)
        },
        _gg: function(h, g, l, k, f, j, i) {
            return this._cmn((g & k) | (l & (~k)), h, g, f, j, i)
        },
        _hh: function(h, g, l, k, f, j, i) {
            return this._cmn(g ^ l ^ k, h, g, f, j, i)
        },
        _ii: function(h, g, l, k, f, j, i) {
            return this._cmn(l ^ (g | (~k)), h, g, f, j, i)
        },
        _binl2hex: function(d) {
            var c = "0123456789abcdef";
            var f = "";
            for (var b = 0,
            a = d.length * 4; b < a; b++) {
                f += (c.charAt((d[b >> 2] >> ((b % 4) * 8 + 4)) & 15) + c.charAt((d[b >> 2] >> ((b % 4) * 8)) & 15))
            }
            return f
        },
        _coreMD5: function(q) {
            var p = 1732584193;
            var o = -271733879;
            var n = -1732584194;
            var m = 271733878;
            for (var h = 0,
            l = q.length; h < l; h += 16) {
                var k = p;
                var j = o;
                var g = n;
                var f = m;
                p = this._ff(p, o, n, m, q[h + 0], 7, -680876936);
                m = this._ff(m, p, o, n, q[h + 1], 12, -389564586);
                n = this._ff(n, m, p, o, q[h + 2], 17, 606105819);
                o = this._ff(o, n, m, p, q[h + 3], 22, -1044525330);
                p = this._ff(p, o, n, m, q[h + 4], 7, -176418897);
                m = this._ff(m, p, o, n, q[h + 5], 12, 1200080426);
                n = this._ff(n, m, p, o, q[h + 6], 17, -1473231341);
                o = this._ff(o, n, m, p, q[h + 7], 22, -45705983);
                p = this._ff(p, o, n, m, q[h + 8], 7, 1770035416);
                m = this._ff(m, p, o, n, q[h + 9], 12, -1958414417);
                n = this._ff(n, m, p, o, q[h + 10], 17, -42063);
                o = this._ff(o, n, m, p, q[h + 11], 22, -1990404162);
                p = this._ff(p, o, n, m, q[h + 12], 7, 1804603682);
                m = this._ff(m, p, o, n, q[h + 13], 12, -40341101);
                n = this._ff(n, m, p, o, q[h + 14], 17, -1502002290);
                o = this._ff(o, n, m, p, q[h + 15], 22, 1236535329);
                p = this._gg(p, o, n, m, q[h + 1], 5, -165796510);
                m = this._gg(m, p, o, n, q[h + 6], 9, -1069501632);
                n = this._gg(n, m, p, o, q[h + 11], 14, 643717713);
                o = this._gg(o, n, m, p, q[h + 0], 20, -373897302);
                p = this._gg(p, o, n, m, q[h + 5], 5, -701558691);
                m = this._gg(m, p, o, n, q[h + 10], 9, 38016083);
                n = this._gg(n, m, p, o, q[h + 15], 14, -660478335);
                o = this._gg(o, n, m, p, q[h + 4], 20, -405537848);
                p = this._gg(p, o, n, m, q[h + 9], 5, 568446438);
                m = this._gg(m, p, o, n, q[h + 14], 9, -1019803690);
                n = this._gg(n, m, p, o, q[h + 3], 14, -187363961);
                o = this._gg(o, n, m, p, q[h + 8], 20, 1163531501);
                p = this._gg(p, o, n, m, q[h + 13], 5, -1444681467);
                m = this._gg(m, p, o, n, q[h + 2], 9, -51403784);
                n = this._gg(n, m, p, o, q[h + 7], 14, 1735328473);
                o = this._gg(o, n, m, p, q[h + 12], 20, -1926607734);
                p = this._hh(p, o, n, m, q[h + 5], 4, -378558);
                m = this._hh(m, p, o, n, q[h + 8], 11, -2022574463);
                n = this._hh(n, m, p, o, q[h + 11], 16, 1839030562);
                o = this._hh(o, n, m, p, q[h + 14], 23, -35309556);
                p = this._hh(p, o, n, m, q[h + 1], 4, -1530992060);
                m = this._hh(m, p, o, n, q[h + 4], 11, 1272893353);
                n = this._hh(n, m, p, o, q[h + 7], 16, -155497632);
                o = this._hh(o, n, m, p, q[h + 10], 23, -1094730640);
                p = this._hh(p, o, n, m, q[h + 13], 4, 681279174);
                m = this._hh(m, p, o, n, q[h + 0], 11, -358537222);
                n = this._hh(n, m, p, o, q[h + 3], 16, -722521979);
                o = this._hh(o, n, m, p, q[h + 6], 23, 76029189);
                p = this._hh(p, o, n, m, q[h + 9], 4, -640364487);
                m = this._hh(m, p, o, n, q[h + 12], 11, -421815835);
                n = this._hh(n, m, p, o, q[h + 15], 16, 530742520);
                o = this._hh(o, n, m, p, q[h + 2], 23, -995338651);
                p = this._ii(p, o, n, m, q[h + 0], 6, -198630844);
                m = this._ii(m, p, o, n, q[h + 7], 10, 1126891415);
                n = this._ii(n, m, p, o, q[h + 14], 15, -1416354905);
                o = this._ii(o, n, m, p, q[h + 5], 21, -57434055);
                p = this._ii(p, o, n, m, q[h + 12], 6, 1700485571);
                m = this._ii(m, p, o, n, q[h + 3], 10, -1894986606);
                n = this._ii(n, m, p, o, q[h + 10], 15, -1051523);
                o = this._ii(o, n, m, p, q[h + 1], 21, -2054922799);
                p = this._ii(p, o, n, m, q[h + 8], 6, 1873313359);
                m = this._ii(m, p, o, n, q[h + 15], 10, -30611744);
                n = this._ii(n, m, p, o, q[h + 6], 15, -1560198380);
                o = this._ii(o, n, m, p, q[h + 13], 21, 1309151649);
                p = this._ii(p, o, n, m, q[h + 4], 6, -145523070);
                m = this._ii(m, p, o, n, q[h + 11], 10, -1120210379);
                n = this._ii(n, m, p, o, q[h + 2], 15, 718787259);
                o = this._ii(o, n, m, p, q[h + 9], 21, -343485551);
                p = this._safe_add(p, k);
                o = this._safe_add(o, j);
                n = this._safe_add(n, g);
                m = this._safe_add(m, f)
            }
            return [p, o, n, m]
        },
        _str2binl: function(d) {
            var b = ((d.length + 8) >> 6) + 1;
            var f = new Array(b * 16);
            for (var c = 0,
            a = b * 16; c < a; c++) {
                f[c] = 0
            }
            for (var c = 0,
            a = d.length; c < a; c++) {
                f[c >> 2] |= (d.charCodeAt(c) & 255) << ((c % 4) * 8)
            }
            f[c >> 2] |= 128 << ((c % 4) * 8);
            f[b * 16 - 2] = d.length * 8;
            return f
        }
    }
})(); (function() {
    var h = YAHOO.util.Dom,
    m = YAHOO.util.Event;
    WEBQQ.namespace("WEBQQ.Protocal");
    WEBQQ.Protocal.CS = {
        cs_seq: 0,
        cs0x22: function(p, o, n) {
            return p + ";" + o + ";" + n + ";"
        },
        cs0x06: function(n) {
            return n + ";"
        },
        cs0x3c: function(n) {
            return (( !! n) ? 1 : 2) + ";"
        },
        cs0x5c_0x88: function() {
            return "88;"
        },
        cs0x5c_0x89: function(p) {
            var o = (p || []).length;
            var n = (p || []).join(";");
            return "89;" + o + ";" + n + ";"
        },
        cs0x67_0x01: function(n) {
            return "01;" + n + ";"
        },
        cs0x67_0x03: function(q) {
            var p = 0,
            o = "";
            for (var n = 0; n < q.length; n++) {
                o += (";" + q[n]);
                p++
            }
            return "03;" + p + o + ";"
        },
        cs0x30_0x72: function(o, n) {
            return "72;" + o + ";" + n + ";"
        },
        cs0x30_0x0f: function(p, n, o) {
            return "0f;" + p + ";" + n + ";" + o + ";"
        },
        cs0x30_0x73: function(n, o) {
            return "73;" + n + ";" + o + ";"
        },
        cs0x30_0x0a: function(n, o) {
            return "0a;" + String(n) + ";" + o + ";"
        },
        cs0xae_0x01: function(o, n) {
            return "01;" + o + ";" + n + ";"
        },
        cs0xe1_0x0b: function(q, p, n, o, r) {
            return q + ";0b;" + p + ";" + n + ";" + o + ";" + r + ";"
        },
        cs0x58: function(n) {
            return n + ";"
        },
        cs0x26: function(o, n) {
            return o + ";" + n + ";"
        },
        cs0x3e_0x04: function(n) {
            return 4 + ";" + n + ";"
        },
        cs0x3e_0x05: function(n, o) {
            return 5 + ";" + n + ";" + o + ";"
        },
        cs0x00: function() {
            return ""
        },
        cs0x01: function() {
            return "0;"
        },
        cs0x0d: function(n) {
            return n + ";"
        },
        cs0x0a: function(n) {
            return n + ";"
        },
        cs0x1c: function(n) {
            return n + ";"
        },
        cs0x3d: function(o, n) {
            return "1;" + o + ";" + n + ";"
        },
        cs0x6d: function(n) {
            return n + ";"
        },
        cs0x16_0x0b: function(o, n, p) {
            return o + ";0b;" + n + ";" + p + ";"
        },
        cs0x16_0x81: function(o, n) {
            return o + ";81;" + n + ";"
        },
        cs0x16_0x83: function(p, o, n) {
            return p + ";83;" + o + ";" + n + ";"
        },
        cs0x16_0x85: function(p, o, n) {
            return p + ";85;" + o + ";" + n + ";"
        },
        cs0x17: function(r, q, n, p, o) {
            return r + ";" + q + ";" + n + ";" + p + ";" + o + ";"
        },
        cs0x04: function(n) {
            return n + ";"
        },
        cs0xa7: function(n) {
            return n + ";"
        },
        cs0xa8: function(p, n, o) {
            if (o.length > 0) {
                return p + ";" + n + ";" + o.join(";") + ";"
            }
            return p + ";" + n + ";"
        },
        cs0x0115: function(n, o) {
            return n + ";" + o.join(";") + ";"
        },
        cs0x0125: function(n) {
            return "1;" + n + ";0;"
        },
        cs0x0126: function(p) {
            var q = p.unfriend_users.index.slice(p.request_pos, p.request_pos + k.REQUEST_NUMBER_PER_TIME),
            n = q.length,
            o = q.join(";");
            return "0;" + n + ";" + o + ";"
        },
        cs0x0129: function(n, o) {
            return "02;" + n + ";" + o + ";"
        },
        toString: function() {
            return "WEBQQ.Protocal.CS Singleton Object"
        }
    };
    function c(n, p, o) {
        this.file_type = n;
        this.long_conn_id = p;
        this.curr_time = o
    }
    c.TIMEOUT = 30000;
    function f(n, o) {
        this.uin = this.id = n;
        this.face = 0;
        this.age = 0;
        this.group_id = o;
        this.class_id = -1;
        this.gender = "保密";
        this.nick = String(n);
        this.remark = "";
        this.stat = 10;
        this.vip_level = 0;
        this.history = new g;
        this.msg_sent_flag = false;
        this.pointer = -1;
        this.long_nick = {
            content: "",
            got: false
        };
        this.level = -1;
        this.long_conn = new c(0, 0);
        this.tmp_pic_ref = [];
        this.tmp_file_ref = [];
        this.SigC2CMsg = "";
        this.VerifySig = "";
        this.SessionTime = 0;
        this.uin_flag = 0
    }
    WEBQQ.obj.USER = f;
    function d(n, p, o) {
        this._msg_id = n;
        this._title = p;
        this._content = o
    }
    function g() {
        this._history_list = [];
        this._unread_message_count = 0
    }
    g.prototype = {
        append: function(o, r, q) {
            if (o != 0) {
                for (var p = Math.max(0, (this._history_list.length - 30)), n = this._history_list.length; p < n; ++p) {
                    if (this._history_list[p]._msg_id == o) {
                        return false
                    }
                }
            }
            if (r.style == "friend-id") {
                this._plus_msg_count()
            }
            this._history_list.push(new d(o, r, q));
            return true
        },
        reset_msg_count: function() {
            this._unread_message_count = 0
        },
        _plus_msg_count: function() {
            this._unread_message_count++
        },
        update_pic_url: function(q, n) {
            for (var o = 0; o < this._history_list.length; o++) {
                var r = this._history_list[o]._content.msg;
                if (r.indexOf(q) > -1) {
                    var p = new RegExp("<img id='" + q + "[^>\r\n]{10,}' />", "gi");
                    this._history_list[o]._content.msg = r.replace(p,
                    function(s) {
                        return "<img id='" + q + "' align='absmiddle' src='" + n + "' />"
                    });
                    break
                }
            }
        },
        remove_msg: function() {
            this._history_list = [];
            this.reset_msg_count()
        },
        get_msg_count: function() {
            return this._unread_message_count
        },
        toString: function() {
            return "History"
        }
    };
    function b(o, n) {
        return o - n.id
    }
    function a(o, n) {
        return o - n
    }
    function j(n, p, q) {
        var s = 0;
        var o = n.length;
        var r = Math.floor(n.length / 2);
        while (o != r) {
            if (q(p, n[r]) > 0) {
                s = r + 1
            } else {
                o = r
            }
            r = Math.floor((s + o) / 2)
        }
        return r
    }
    WEBQQ.binary_search = j;
    WEBQQ.numCompare = a;
    function l() {
        this.index = []
    }
    l.prototype = {
        index: [],
        fnd_user: function(o) {
            var n = j(this.index, o, a);
            if ((n == this.index.length) || (0 != a(o, this.index[n]))) {
                return - 1
            }
            return n
        },
        rmv_user: function(o) {
            var n = j(this.index, o, a);
            if ((n == this.index.length) || (0 != a(o, this.index[n]))) {
                return
            }
            this.index.splice(n, 1)
        },
        add_user: function(p) {
            var o = j(this.index, p, a);
            if ((o == this.index.length) || (0 != a(p, this.index[o]))) {
                for (var n = this.index.length; n > o; --n) {
                    this.index[n] = this.index[n - 1]
                }
                this.index[o] = p;
                return o
            }
        },
        add_users: function(n) {
            this.index = this.index.concat(n);
            this.index.sort(a)
        }
    };
    function i(o, n) {
        this.id = o;
        this.name = String(n);
        this.online_users = new l();
        this.away_users = new l();
        this.offline_users = new l()
    }
    function k(n) {
        this.uin = n;
        this.code = 0;
        this.creator = "";
        this.nick = this.name = "";
        this.memo = "";
        this.finger = "";
        this.property = null;
        this.category = null;
        this.msg_flag = 0;
        this.member_got = false;
        this.member_nick_got = false;
        this.member_remark_got = false;
        this.all_members = {};
        this.request_pos = 0;
        this.cs_0x30_0x72_next_max_uin = 0;
        this.cs_0x30_0x0f_next_pos = 0;
        this.cs_0x0126_next_pos = 0;
        this.unfriend_users = new l();
        this.online_users = new l();
        this.away_users = new l();
        this.offline_users = new l();
        this.history = new g;
        this.msg_sent_flag = false;
        this.group_id = this.class_id = -1
    }
    k.REQUEST_NUMBER_PER_TIME = 24;
    WEBQQ.Protocal.SC = {
        _qqclient: null,
        init: function(n) {
            this._qqclient = n
        },
        sc0x22: function(q) {
            var p = this._qqclient,
            u = q.params,
            r = parseInt(u[0], 10),
            t = parseInt(u[1], 16),
            n = u[3];
            p.last_error = p.ERR_MSG_ENUM.ok;
            if (r != p.uin || t != 34 || n == null) {
                p.last_error = p.ERR_MSG_ENUM.failed_login;
                return false
            }
            if (n == "00") {
                p.web_session = u[4];
                p.logined = true;
                var o = parseInt(u[5], 10);
                p.uin_online_stat = (o == 0) ? p.ONLINE_STAT_ENUM.online: p.ONLINE_STAT_ENUM.invisible;
                switch (p.will_set_stat) {
                case p.ONLINE_STAT_ENUM.online:
                    p.css_stat = "online";
                    p.uin_online_stat = p.ONLINE_STAT_ENUM.online;
                    break;
                case p.ONLINE_STAT_ENUM.away:
                case p.ONLINE_STAT_ENUM.busy:
                    p.css_stat = "away";
                    p.uin_online_stat = p.ONLINE_STAT_ENUM.away;
                    break;
                case p.ONLINE_STAT_ENUM.invisible:
                    p.css_stat = "hidden";
                    p.uin_online_stat = p.ONLINE_STAT_ENUM.invisible;
                    break;
                default:
                    p.css_stat = (o == 0) ? "online": "hidden";
                    break
                }
                p.login_time = parseInt(u[6], 10);
                p.svrindex_and_port[0] = parseInt(u[7], 10);
                p.svrindex_and_port[1] = parseInt(u[8], 10);
                p.clientKey = u[9];
                h.get("modifyPortraitClientKey").value = p.clientKey;
                p.cs_params.login_request_retry_times = 0;
                var s = new Date();
                s.setTime(0);
                document.cookie = "ptwebqq=; EXPIRES=" + s.toGMTString() + "; PATH=/; DOMAIN=qq.com; ";
                document.cookie = "wqqs=" + u[10] + "; PATH=/; DOMAIN=qq.com; ";
                return true
            }
            if (n == "02") {
                if (p.RetryServer() == true) {
                    p.beginLogin();
                    return false
                }
                p.last_error = p.ERR_MSG_ENUM.conn_error
            } else {
                if (n == "04") {
                    p.last_error = p.ERR_MSG_ENUM.privilege_error;
                    window.location = webapp_server_domain + "/?r=noaccess"
                } else {
                    if (n == "05") {
                        p.last_error = p.ERR_MSG_ENUM.password_error
                    } else {
                        if (n == "06") {
                            p.last_error = decodeURIComponent(u[5])
                        } else {
                            p.last_error = p.ERR_MSG_ENUM.unknown_error
                        }
                    }
                }
            }
            return false
        },
        sc0x06: function(q) {
            var n = this._qqclient,
            u = q.params,
            r = parseInt(u[0], 10),
            s = parseInt(u[1], 16),
            t = u[3];
            n.last_error = n.ERR_MSG_ENUM.ok;
            if (r != n.uin || s != 6 || String(t).length < (10)) {
                return false
            }
            var t = String(u[3]);
            t = t.split("\x1e");
            var p = parseInt(t[0], 10);
            if (p == n.uin) {
                n.vip = ((t[35] & 4) != 0);
                n.orig_info = t;
                n.nick = decodeURIComponent(t[1]) || p;
                n.gender = t[8];
                n.face = parseInt(t[21], 10) || 0;
                if ((n.face) >= n.cs_params.FACE_MAX_INDEX * 3) {
                    n.face = 0
                }
            } else {
                if (!n.bdylist.allUsers[p]) {
                    n.bdylist.allUsers[p] = new f(p, -1)
                }
                var o = n.bdylist.allUsers[p];
                o.orig_info = t
            }
            return true
        },
        sc0x3c: function(s) {
            var p = this._qqclient,
            q = s.params,
            n = parseInt(q[0], 10),
            o = parseInt(q[1], 16);
            p.last_error = p.ERR_MSG_ENUM.ok;
            if (n != p.uin || o != 60 || (q[3] == null) || isNaN(!Number(q[3])) || (q.length != (Number(q[3]) * 2 + 5))) {
                p.last_error = p.ERR_MSG_ENUM.failed_get_group_info;
                return false
            }
            p.bdylist.groups._1000 = new i("_1000", "在线好友");
            p.bdylist.groups[0] = new i(0, "我的好友");
            var v;
            for (var r = 4; r < q.length - 1; r += 2) {
                var u = Number(q[r]);
                v = decodeURIComponent(q[r + 1]);
                var t = p.bdylist.groups[u] = new i(q[r], v)
            }
            p.bdylist.groups["1000"] = new i("1000", "陌生人");
            p.bdylist.groups["1001"] = new i("1001", "黑名单");
            return true
        },
        sc0x5c: function(p) {
            var n = this._qqclient,
            t = p.params,
            r = parseInt(t[0], 10),
            s = parseInt(t[1], 16),
            q = parseInt(t[3], 16),
            o = false;
            n.last_error = n.ERR_MSG_ENUM.ok;
            if (r != n.uin || s != 92 || t[4] == null) {
                return false
            }
            if (q == 136) {
                o = this.sc0x5c_0x88(t)
            } else {
                if (q == 137) {
                    o = this.sc0x5c_0x89(t)
                }
            }
            return o
        },
        sc0x5c_0x88: function(s) {
            var n = this._qqclient;
            n.last_error = n.ERR_MSG_ENUM.ok;
            var p = Number(s[4]);
            if (p == 0) {
                var t = Number(s[5]),
                q = Number(s[6]),
                o = Number(s[7]),
                r = Number(s[8]);
                n.level = t;
                n.vip_level = o;
                n.online_days = q;
                n.remain_days = r
            }
            return ! p
        },
        sc0x5c_0x89: function(t) {
            var n = this._qqclient;
            n.last_error = n.ERR_MSG_ENUM.ok;
            var q = parseInt(t[4]);
            if (q == 0) {
                for (var r = 5; r < t.length; r = r + 3) {
                    var s = t[r],
                    u = Number(t[r + 1]),
                    p = Number(t[r + 2]);
                    if (s == n.uin) {
                        n.level = u;
                        n.vip_level = p
                    } else {
                        var o = n.bdylist.allUsers[s];
                        if (o) {
                            o.level = u;
                            o.vip_level = p
                        }
                    }
                }
            }
            return ! q
        },
        sc0x67: function(p) {
            var n = this._qqclient,
            u = p.params,
            t = p.oUins || {},
            r = parseInt(u[0], 10),
            s = parseInt(u[1], 16),
            q = parseInt(u[3], 16),
            o = false;
            n.last_error = n.ERR_MSG_ENUM.ok;
            if (r != n.uin || s != 103 || u[3] == null) {
                return false
            }
            if (q == 1) {
                o = this.sc0x67_0x01(u)
            } else {
                if (q == 2) {
                    o = this.sc0x67_0x02(u)
                } else {
                    if (q == 3) {
                        o = this.sc0x67_0x03(u, t)
                    }
                }
            }
            return o
        },
        sc0x67_0x01: function(o) {
            var n = Number(o[4]);
            return ! n
        },
        sc0x67_0x02: function(n) {
            return true
        },
        sc0x67_0x03: function(u, t) {
            var n = this._qqclient,
            p = Number(u[4]);
            if (p == 0) {
                for (var q = 6; q < u.length; q = q + 2) {
                    var s = u[q],
                    r = decodeURIComponent(u[q + 1]);
                    if (s == n.uin) {
                        n.sig_content = r
                    } else {
                        var o = n.bdylist.allUsers[s];
                        if (o) {
                            o.long_nick.content = r;
                            o.long_nick.got = true;
                            t[s] = 1
                        }
                    }
                }
                for (var s in t) {
                    var o = n.bdylist.allUsers[s];
                    if (o && t[s] == 0) {
                        o.long_nick.content = "";
                        o.long_nick.got = true
                    }
                }
            }
            return ! p
        },
        sc0x58: function(z) {
            var r = this._qqclient,
            s = z.params,
            o = parseInt(s[0], 10),
            q = parseInt(s[1], 16),
            y = -1;
            r.last_error = r.ERR_MSG_ENUM.ok;
            if (o != r.uin || q != 88 || s[3] == null) {
                return y
            }
            s = s.slice(3);
            s = s.slice(0, Math.floor(s.length / 3) * 3 + 1);
            var C, u, B, w;
            for (var v = 1,
            x = s.length; v < x - 1; v += 4) {
                C = Number(s[v]);
                u = Number(s[v + 1]);
                B = (Number(s[v + 2]) & 60) >> 2;
                w = Number(s[v + 3]);
                if (u != 0) {
                    var D = r.bdylist.allClasses[C];
                    if (!D) {
                        r.bdylist.allClasses[C] = new k(C)
                    }
                } else {
                    if (!r.bdylist.allUsers[C]) {
                        r.bdylist.allUsers[C] = new f(C, B)
                    }
                    var t = r.bdylist.allUsers[C],
                    A = r.bdylist.groups[B],
                    p = r.bdylist.groups._1000;
                    r.bdylist.allUsers[C].pointer = r.bdylist.friendList.uins.length;
                    r.bdylist.friendList.uins.push(C);
                    t.group_id = B;
                    t.stat = w;
                    if (A) {
                        switch (w) {
                        case 10:
                            A.online_users.add_user(C);
                            p.online_users.add_users(C);
                            break;
                        case 20:
                            A.offline_users.add_user(C);
                            break;
                        case 30:
                            A.away_users.add_user(C);
                            p.away_users.add_users(C);
                            break;
                        default:
                            A.offline_users.add_user(C);
                            break
                        }
                    }
                }
            }
            var n = Number(s[0]);
            if (n == 0) {
                r.cs_params.cs_0x58_next_uin = -1;
                y = 0
            } else {
                if (n > r.cs_params.cs_0x58_next_uin) {
                    r.cs_params.cs_0x58_next_uin = n;
                    y = 1
                } else {
                    y = -1
                }
            }
            return y
        },
        sc0x26: function(v) {
            var p = this._qqclient,
            q = v.params,
            n = parseInt(q[0], 10),
            o = parseInt(q[1], 16),
            u = -1;
            p.last_error = p.ERR_MSG_ENUM.ok;
            if (n != p.uin || o != 38 || q[3] == null) {
                return u
            }
            var w = Number(q[3]);
            for (var s = 4,
            t = q.length - 1; s < t; s += 6) {
                var x = Number(q[s]);
                if (!p.bdylist.allUsers[x]) {
                    p.bdylist.allUsers[x] = new f(x, 0)
                }
                var r = p.bdylist.allUsers[x];
                r.face = Number(q[s + 1]) || 0;
                if ((r.face) >= p.cs_params.FACE_MAX_INDEX) {
                    r.face = 0
                }
                r.age = Number(q[s + 2]);
                r.gender = (Number(q[s + 3]) == 1) ? "女": "男";
                r.nick = String(decodeURIComponent(q[s + 4]) || x);
                r.vip_level = Number(q[s + 5])
            }
            if (w == 0) {
                p.cs_params.cs_0x26_next_pos = -1;
                p.cs_params.cs_0x26_timeout = 0;
                u = 0
            } else {
                p.cs_params.cs_0x26_next_pos = w;
                u = 1
            }
            return u
        },
        sc0x3e: function(p) {
            var n = this._qqclient,
            t = p.params,
            r = Number(t[0]),
            s = parseInt(t[1], 16),
            o = -1;
            n.last_error = n.ERR_MSG_ENUM.ok;
            if (r != n.uin || s != 62 || t[3] == null) {
                return o
            }
            var q = Number(t[3]);
            switch (q) {
            case 0:
            case 4:
                o = this.sc0x3e_0x04(t);
                break;
            case 5:
            case 105:
                o = this.sc0x3e_0x05(p);
                break;
            default:
                break
            }
            return o
        },
        sc0x3e_0x04: function(o) {
            var n = this._qqclient,
            t = -1;
            n.last_error = n.ERR_MSG_ENUM.ok;
            for (var q = 5,
            r = o.length - 1; q < r; q += 3) {
                var v = Number(o[q]),
                p = n.bdylist.allUsers[v];
                if (p == null) {
                    p = n.bdylist.allUsers[v] = new f(v, -1)
                }
                if (o[q + 2] == "") {
                    p.remark = ""
                } else {
                    try {
                        p.remark = String(decodeURIComponent(o[q + 2] || "") || p.nick)
                    } catch(s) {}
                }
            }
            var u = Number(o[4]);
            if (u == 0) {
                n.cs_params.cs_0x3e_next_pos = -1;
                t = 0
            } else {
                n.cs_params.cs_0x3e_next_pos++;
                t = 1
            }
            return t
        },
        sc0x3e_0x05: function(r) {
            var n = this._qqclient,
            t = r.params,
            q = -1;
            n.last_error = n.ERR_MSG_ENUM.ok;
            var p = r.info.uin,
            s = r.info.remark,
            o = n.bdylist.allUsers[p];
            if (o) {
                o.remark = String(s)
            }
            if (t[4] == 0) {
                q = 0
            }
            return q
        },
        sc0x30: function(p) {
            var n = this._qqclient,
            t = p.params,
            r = Number(t[0]),
            s = parseInt(t[1], 16),
            o = -1;
            n.last_error = n.ERR_MSG_ENUM.ok;
            if (r != n.uin || s != 48 || t[3] == null) {
                return o
            }
            var q = parseInt(t[3], 16);
            switch (q) {
            case 114:
                o = this.sc0x30_0x72(t);
                break;
            case 15:
                o = this.sc0x30_0x0f(t);
                break;
            case 10:
                o = this.sc0x30_0x0a(t);
                break;
            case 115:
                o = this.sc0x30_0x73(t);
                break;
            default:
                break
            }
            return o
        },
        sc0x30_0x72: function(o) {
            var n = this._qqclient,
            w = -1;
            n.last_error = n.ERR_MSG_ENUM.ok;
            o = o.slice(4);
            var A = Number(o[0]),
            p,
            t = Number(o[2]),
            x = 0,
            y = 0,
            u,
            B = n.bdylist.allClasses[A],
            s,
            v,
            C;
            if (t == 1) {
                if (B) {
                    B.code = o[1];
                    B.creator = o[4];
                    B.nick = B.name = String(decodeURIComponent(o[5]));
                    B.memo = String(decodeURIComponent(o[6]));
                    B.finger = String(decodeURIComponent(o[7]));
                    B.property = Number(o[3]);
                    B.category = ""
                }
                x = Number(o[8]);
                if (x == 1) {
                    y = o[9]
                }
            } else {
                x = Number(o[3]);
                if (x == 1) {
                    y = o[4]
                }
            }
            for (var r = (t == 1 ? 10 : 5), v = o.length - 1; r < v; r += 4) {
                var z = o[r];
                if (!n.bdylist.allUsers[z]) {
                    n.bdylist.allUsers[z] = new f(z, -1)
                }
                var q = n.bdylist.allUsers[z];
                q.class_id = A;
                if (!q || q.group_id == -1) {
                    B.unfriend_users.add_user(z)
                }
                B.all_members[z] = new f(z, -1);
                s = Number(o[r + 1]);
                C = Number(o[r + 3]);
                if (n.isFriend(z) == -1) {
                    q.stat = B.all_members[z].stat = s
                } else {
                    B.all_members[z].stat = q.stat
                }
                B.all_members[z].uin_flag = C;
                switch (q.stat) {
                case 10:
                    B.online_users.add_user(z);
                    break;
                case 20:
                    B.offline_users.add_user(z);
                    break;
                case 30:
                    B.away_users.add_user(z);
                    break;
                default:
                    B.offline_users.add_user(z)
                }
            }
            if (x == 1) {
                B.cs_0x30_0x72_next_max_uin = y;
                w = 1
            } else {
                B.member_got = true;
                w = 0
            }
            return w
        },
        sc0x30_0x0f: function(o) {
            var n = this._qqclient,
            t = -1;
            n.last_error = n.ERR_MSG_ENUM.ok;
            var t = Number(o[4]);
            if (t == 0) {
                var v = Number(o[5]),
                u = n.bdylist.allClasses[v],
                q = Number(o[7]);
                for (var p = 8; p < o.length - 1; p += 2) {
                    var s = o[p],
                    r = decodeURIComponent(o[p + 1]);
                    if (!u.all_members[s]) {
                        u.all_members[s] = new f(s, -1)
                    }
                    u.all_members[s].remark = String(r)
                }
                if (q != 0) {
                    u.cs_0x30_0x0f_next_pos = q;
                    t = 1
                }
            }
            return t
        },
        sc0x30_0x0a: function(p) {
            var n = this._qqclient,
            o = -1;
            n.last_error = n.ERR_MSG_ENUM.ok;
            o = 0;
            return o
        },
        sc0x30_0x73: function(p) {
            var n = this._qqclient;
            n.last_error = n.ERR_MSG_ENUM.ok;
            if (n.cur_login_stat != n.LOGIN_STAT_ENUM.all_info_is_done) {
                return true
            }
            var o = parseInt(p[2]);
            n.runCsCallback({
                seq: p[2],
                params: p
            });
            return true
        },
        sc0x0125: function(o) {
            var n = this._qqclient;
            return o
        },
        sc0x0126: function(y) {
            var q = this._qqclient,
            r = y.params,
            o = Number(r[0]),
            p = parseInt(r[1], 16),
            v = -1;
            q.last_error = q.ERR_MSG_ENUM.ok;
            if (o != q.uin || p != 294 || r[3] == null) {
                return v
            }
            var x = Number(r[3]);
            for (var t = 4,
            u = r.length - 1; t < u; t += 4) {
                var z = Number(r[t]),
                s = q.bdylist.allUsers[z];
                if (s == null) {
                    continue
                }
                s.face = Number(r[t + 1]) || 0;
                s.nick = String(decodeURIComponent(r[t + 2]));
                s.vip_level = Number(r[t + 3])
            }
            var w = y.info.acs;
            v = 1;
            if (w) {
                var n = w.unfriend_users.index.slice(w.request_pos, w.request_pos + k.REQUEST_NUMBER_PER_TIME);
                w.request_pos += (n.length - x);
                if (w.request_pos >= w.unfriend_users.index.length) {
                    w.member_nick_got = true;
                    v = 0
                }
            }
            return v
        },
        sc0x01: function(q) {
            var n = this._qqclient,
            o = Number(q[0]),
            p = parseInt(q[1], 16);
            n.last_error = n.ERR_MSG_ENUM.ok;
            if (o != n.uin || p != 1) {
                return false
            }
            n.logined = false;
            n.reset();
            if (n.retryServer() == true) {
                n.login_type = 1;
                n.getLoginInfo();
                return true
            }
            n.removeCloseHook();
            n.closeConn();
            alert("与服务器失去联系，请您尝试登录im2.qq.com");
            window.location = "http://im2.qq.com/";
            return false
        },
        sc0x17: function(q) {
            var V = this._qqclient,
            p = Number(q[0]),
            ac = parseInt(q[1], 16);
            V.last_error = V.ERR_MSG_ENUM.ok;
            if (p != V.uin || ac != 23 || q[3] == null) {
                return false
            }
            YAHOO.log("sc0x17: " + q);
            var R = parseInt(q[3]);
            var Q = parseInt(q[4]);
            var D = q[2];
            var ac = q[5];
            if (ac == "0a") {
                ac = "09"
            }
            if (ac == "00") {
                V.last_error = V.ERR_MSG_ENUM.no_longer_online;
                return false
            }
            if (ac == "30") {
                var ag = parseInt(q[6]);
                switch (ag) {
                case 1:
                    V.evil_flag = false;
                    break;
                case 2:
                    V.evil_flag = true;
                    break;
                default:
                    break
                }
                V.uin_online_stat = V.ONLINE_STAT_ENUM.offline;
                V.css_stat = "offline";
                V.mainPanel._my_avatar_img_node.className = "offline";
                V.mainPanel.mf_updateUinStat();
                V.closeConn();
                alert(V.ERR_MSG_ENUM.force_offline);
                return false
            }
            var T = q[6];
            var S = q[7];
            var o = V.getChatBox(R);
            var G = V.bdylist.allUsers[R];
            S = S.escape2html();
            var M = String(S);
            S = S.replace(/\x14(\d|[a-f]){2}/g,
            function(ai) {
                return '<img align="absmiddle" src=' + V.face_domain + "Face2/" + parseInt("0x" + ai.substr(1)) + ".gif>"
            });
            if (ac == "46") {
                S = ('<span style="color:gray;">本条消息中含有魔法表情：“' + S + "”，WebQQ暂不支持。</span>")
            }
            var n = S;
            if (ac == "2b") {
                S = S.replace(/\x15[^\r\n\x1f]{1,}\x1f/g,
                function(aj) {
                    if (String(aj).charAt(1) == "6") {
                        var ai = "1_" + q[9] + "_" + q[13] + "_" + String(aj).substr(2, String(aj).length - 3) + "_" + R + "_" + new Date().getTime();
                        return "<img id='" + ai + "' align='absmiddle' src='" + img_server_domain + "/images/img_loading.gif' />"
                    } else {
                        if (String(aj).charAt(1) == "7") {
                            return ""
                        }
                    }
                })
            } else {
                if ((ac == "09" || ac == "0a" || ac == "1f") && T == "0b") {
                    S = S.replace(/\x16[^\r\n\x1f]{1,80}\x1f/g,
                    function(aj) {
                        if (String(aj).charAt(2) == "\x1f") {
                            return "<img align='absmiddle' src='" + img_server_domain + "/images/img_error.gif' />"
                        } else {
                            if (String(aj).charAt(1) == "1") {
                                var ai = String(aj).substr(2, String(aj).length - 3),
                                al = ai.split("/"),
                                ak = al[0].split(".")[1];
                                pic_id = "0_" + al[1] + "_" + ak + "_" + new Date().getTime();
                                V.applyOfflinePicAddr(R, al[1]);
                                return "<img id='" + pic_id + "' align='absmiddle' src='" + img_server_domain + "/images/img_loading.gif' />"
                            } else {
                                if (String(aj).charAt(1) == "2") {
                                    return ""
                                }
                            }
                        }
                    });
                    var H = "";
                    S = S.replace(/\x13\S{38}\x1f/,
                    function(ai) {
                        H = String(ai).substr(1, String(ai).length - 2);
                        return ""
                    });
                    var C = 0;
                    S = String(S).replace(/\x15[^\r\n\x1f]{1,}\x1f/g,
                    function(ak) {
                        var ai = String(ak).charAt(1);
                        if (ai == "2") {
                            var aj = R + "_" + D + "_" + H + String(ak).charAt(3) + ((String(ak).charAt(2) == "0") ? ".jpg": ".gif") + "_p_" + new Date().getTime();
                            return "<img id='" + aj + "' align='absmiddle' src='" + img_server_domain + "/images/img_loading.gif' />"
                        } else {
                            if (ai == "3") {
                                C = 1;
                                var aj = R + "_" + D + "_" + String(ak).substr(2, 36) + "_c_" + new Date().getTime();
                                return "<img id='" + aj + "' align='absmiddle' src='" + img_server_domain + "/images/img_loading.gif' />"
                            } else {
                                if (ai == "4") {
                                    return ""
                                } else {
                                    if (ai == "8") {
                                        C = 3;
                                        return ""
                                    }
                                }
                            }
                        }
                    })
                }
            }
            if (C == 3) {
                S = ('<span style="color:gray;">本条消息中含有魔法表情：“' + S + "”，WebQQ暂不支持。</span>")
            }
            n = n.replace(/\x16[^\r\n\x1f]{1,80}\x1f/g,
            function(ai) {
                if (String(ai).charAt(2) == "\x1f") {
                    return "<img align='absmiddle' src='" + img_server_domain + "/images/img_error.gif' />"
                } else {
                    if (String(ai).charAt(1) == "1") {
                        return "<img align='absmiddle' src='" + img_server_domain + "/images/def_face.gif' />"
                    } else {
                        if (String(ai).charAt(1) == "2") {
                            return ""
                        }
                    }
                }
            });
            n = n.replace(/\x13[^\r\n\x1f]{1,}\x1f/,
            function(ai) {
                return ""
            });
            n = n.replace(/\x15[^\r\n\x1f]{1,}\x1f/g,
            function(aj) {
                var ai = String(aj).charAt(1);
                if (ai == "2" || ai == "3" || ai == "6") {
                    return "<img align='absmiddle' src='" + img_server_domain + "/images/def_face.gif' />"
                } else {
                    return ""
                }
            });
            var U = new Date();
            if (q[8] != "0") {
                U.setTime(parseInt(q[8]) * 1000)
            }
            var ah = U.format("yyyy-MM-dd hh:mm:ss");
            var L = q[q.length - 2];
            if (((ac == "09" || ac == "1f") && (T == "0b" || T == "b")) || (ac == "0a") || (ac == "46")) {
                V.replyCS17(R, Q, D, 1, L);
                if (!G || (ac == "09" && G.group_id == -1)) {
                    G = V.bdylist.allUsers[R] = new f(R, 1000);
                    G.stat = 10;
                    V.bdylist.allUsers[R].class_id = -2;
                    var t = V.bdylist.groups["1000"];
                    t.online_users.add_user(R);
                    V.mainPanel.mf_updateGroupStat(t);
                    V.mainPanel.mf_addUser(R, "online", 1)
                } else {
                    if (G && ac == "1f" && G.class_id > -1) {
                        G.SessionTime = new Date().getTime();
                        var X = G.class_id,
                        ae = R;
                        if (G.SigC2CMsg == "") {
                            V.getClassTempSession(X, ae)
                        }
                        if (G.VerifySig == "") {
                            V.getVerifyCodeSession(0, ae)
                        }
                    }
                }
                var I = V.bdylist.allUsers[String(R)].remark || V.bdylist.allUsers[String(R)].nick || R;
                var af = V.bdylist.allUsers[String(R)].history.append(D, {
                    style: "friend-id",
                    msg: I + "&nbsp;&nbsp;" + ah
                },
                {
                    style: "content",
                    msg: S
                });
                if (af) {
                    if ((V.isMaskUserMsg() && !V.isActiveChatBox(o)) || !o || !o.isShowing()) {
                        V.mainPanel.mf_addOffMsg(R, Q, n, ah, 1)
                    }
                    if (!V.isMaskUserMsg()) {
                        if (!o) {
                            V.actChat(R, true)
                        }
                        V.mainPanel._tabsManage.mf_notify_recv(R);
                        if (G.group_id != "1001") {
                            if (!V.isMaskSound()) {
                                V.playMsgSnd(1)
                            }
                            V.prompt_msg.change = "-" + String(I) + "来消息啦...";
                            V.promptMsg()
                        }
                    }
                    if (o) {
                        var W = o._talkTabs;
                        W.mf_updateHistory(R)
                    }
                }
                var x = M.match(/\x15\S{30,}\x1f/gi) || [];
                for (var Y = 0; Y < x.length; Y++) {
                    var y = x[Y].substr(2, 36);
                    var v = "C";
                    V.applyLongConnId(R, v);
                    break
                }
                return true
            } else {
                if (ac == "09" && T == "81") {
                    V.replyCS17(R, Q, D, 3, L);
                    var E = q[7],
                    u = q[8];
                    if (E != "f") {
                        V.agreeLongConnId(R, E, u)
                    }
                    if (E == "f") {
                        var B = q[10];
                        V.lc[u] = B;
                        var K = true;
                        for (var aa = 0; aa < G.tmp_file_ref.length; aa++) {
                            if (G.tmp_file_ref[aa] == (R + "*" + u + "*" + B)) {
                                K = false;
                                break
                            }
                        }
                        if (K == true) {
                            G.tmp_file_ref.push(R + "*" + u + "*" + B);
                            if (q[9] != "") {
                                U.setTime(parseInt(q[9]) * 1000)
                            }
                            var z = R + "_" + u + "_" + B + "_agree",
                            N = R + "_" + u + "_" + B + "_refuse";
                            ah = U.format("yyyy-MM-dd hh:mm:ss");
                            var I = V.bdylist.allUsers[String(R)].realname || V.bdylist.allUsers[String(R)].nick || R;
                            S = '<span class="file_msg">对方给您发送了一个文件"' + String(B).forHtml() + '"</span><span class="filemsg_button"><a href="###" id="' + z + '">[同意]</a></span><span class="filemsg_button"><a href="###" id="' + N + '">[拒绝]</a></span>';
                            m.on(z, "click",
                            function(ai, aj) {
                                aj._qqclient.agreeLongConnId(R, E, u);
                                this.style.color = "gray";
                                this.style.cursor = "default";
                                this.style.textDecoration = "none";
                                h.get(N).style.color = "gray";
                                h.get(N).style.cursor = "default";
                                h.get(N).style.textDecoration = "none";
                                m.removeListener(z, "click");
                                m.removeListener(N, "click");
                                m.stopEvent(ai)
                            },
                            this);
                            m.on(N, "click",
                            function(av, ap) {
                                ap._qqclient.refuseLongConnId(R, E, u);
                                this.style.color = "gray";
                                this.style.cursor = "default";
                                this.style.textDecoration = "none";
                                h.get(z).style.color = "gray";
                                h.get(z).style.cursor = "default";
                                h.get(z).style.textDecoration = "none";
                                var ak = (ap._qqclient.pm.cs_seq++) + 1000000;
                                var ai = new Date();
                                var ar = ai.getFullYear(),
                                aj = ai.getMonth() + 1,
                                au = ai.getDate(),
                                al = ai.getHours(),
                                am = ai.getMinutes(),
                                ao = ai.getSeconds();
                                var aw = (ai.getFullYear() + "-" + ((aj > 9) ? aj: "0" + aj) + "-" + ((au > 9) ? au: "0" + au) + "&nbsp;" + ((al > 9) ? al: "0" + al) + ":" + ((am > 9) ? am: "0" + am) + ":" + ((ao > 9) ? ao: "0" + ao));
                                var at = '<span class="filemsg_warning_icon"></span><span class="time">' + aw + "</span>";
                                var ax = at;
                                var aq = '<span class="file_msg">您已拒绝接收对方发送的文件"' + String(B).forHtml() + '"</span>';
                                var an = ap._qqclient.mainPanel._tabsManage._uin2container[R] || null;
                                an.toSendQQC2CMsg(R, ak, ax, aq);
                                m.removeListener(z, "click");
                                m.removeListener(N, "click");
                                m.stopEvent(av)
                            },
                            this);
                            n = "对方给您发送了一个文件" + B;
                            var s = '<span class="filemsg_warning_icon"></span><span class="time">' + ah + "</span>";
                            var af = V.bdylist.allUsers[String(R)].history.append(D, {
                                style: "system-id",
                                msg: s
                            },
                            {
                                style: "content",
                                msg: S
                            });
                            if (!af) {
                                return true
                            }
                            if ((V.isMaskUserMsg() && !V.isActiveChatBox(o)) || !o || !o.isShowing()) {
                                V.mainPanel.mf_addOffMsg(R, Q, n, ah, 1)
                            }
                            if (!V.isMaskUserMsg()) {
                                if (!o) {
                                    V.actChat(R, true)
                                }
                                V.mainPanel._tabsManage.mf_notify_recv(R);
                                if (G.group_id != "1001") {
                                    if (!V.isMaskSound()) {
                                        V.playMsgSnd(1)
                                    }
                                    V.prompt_msg.change = "-" + String(I) + "来消息啦...";
                                    V.promptMsg()
                                }
                            }
                            if (o) {
                                var W = o._talkTabs;
                                W.mf_updateHistory(R)
                            }
                        }
                    }
                } else {
                    if ((ac == "09" || ac == "0a") && T == "83") {
                        V.replyCS17(R, Q, D, 3, L);
                        var E = q[7],
                        u = q[8];
                        if (E == "f") {
                            if (q[9] != "") {
                                U.setTime(parseInt(q[9]) * 1000)
                            }
                            ah = U.format("yyyy-MM-dd hh:mm:ss");
                            var I = V.bdylist.allUsers[String(R)].realname || V.bdylist.allUsers[String(R)].nick || R;
                            var B = V.lc[u & 4095] || "文件";
                            S = '<span class="file_msg">对方已同意接收"' + String(B).forHtml() + '"，开始传输文件</span>';
                            n = "对方已同意接收" + B + "，开始传输文件";
                            var s = '<span class="filemsg_warning_icon"></span><span class="time">' + ah + "</span>";
                            var af = V.bdylist.allUsers[String(R)].history.append(D, {
                                style: "system-id",
                                msg: s
                            },
                            {
                                style: "content",
                                msg: S
                            });
                            if (!af) {
                                return true
                            }
                            if ((V.isMaskUserMsg() && !V.isActiveChatBox(o)) || !o || !o.isShowing()) {
                                V.mainPanel.mf_addOffMsg(R, Q, n, ah, 1)
                            }
                            if (!V.isMaskUserMsg()) {
                                if (!o) {
                                    V.actChat(R, true)
                                }
                                V.mainPanel._tabsManage.mf_notify_recv(R);
                                if (G.group_id != "1001") {
                                    if (!V.isMaskSound()) {
                                        V.playMsgSnd(1)
                                    }
                                }
                            }
                            if (o) {
                                var W = o._talkTabs;
                                W.mf_updateHistory(R)
                            }
                        } else {
                            G.long_conn = new c(E, u, new Date());
                            V.showUserPic(R, E, u)
                        }
                    } else {
                        if ((ac == "09" || ac == "0a") && T == "85") {
                            V.replyCS17(R, Q, D, 3, L);
                            var E = q[7],
                            u = q[8],
                            Z = Number(q[9]),
                            P = Number(q[10]),
                            s = "";
                            if (q[11] != "") {
                                U.setTime(parseInt(q[11]) * 1000)
                            }
                            ah = U.format("yyyy-MM-dd hh:mm:ss");
                            if (E == "f") {
                                var B = (V.lc[u & 4095]) || (V.lc[u]) || "文件";
                                var I = V.bdylist.allUsers[String(R)].realname || V.bdylist.allUsers[String(R)].nick || R;
                                if (P == 1) {
                                    s = '<span class="filemsg_failure_icon"></span><span class="time">' + ah + "</span>";
                                    if (Z == 0) {
                                        S = '<span class="file_msg">对方取消发送文件"' + String(B).forHtml() + '"，文件传输中止</span>';
                                        n = "对方取消了发送文件" + B + "，文件传输中止"
                                    } else {
                                        S = '<span class="file_msg">对方取消了接收文件"' + String(B).forHtml() + '"，文件传输中止</span>';
                                        n = "对方取消了接收文件" + B + "，文件传输中止"
                                    }
                                } else {
                                    if (P == 2) {
                                        s = '<span class="filemsg_failure_icon"></span><span class="time">' + ah + "</span>";
                                        S = '<span class="file_msg">对方已拒绝或取消接收文件"' + String(B).forHtml() + '"，文件传输中止</span>';
                                        n = "对方已拒绝或取消接收文件" + B + "，文件传输中止"
                                    } else {
                                        if (P == 3) {
                                            s = '<span class="filemsg_failure_icon"></span><span class="time">' + ah + "</span>";
                                            S = '<span class="file_msg">"' + String(B).forHtml() + '"传输失败，请重试</span>';
                                            n = B + "传输失败，请重试"
                                        }
                                    }
                                }
                                var af = V.bdylist.allUsers[String(R)].history.append(D, {
                                    style: "system-id",
                                    msg: s
                                },
                                {
                                    style: "content",
                                    msg: S
                                });
                                if (!af) {
                                    return true
                                }
                                if ((V.isMaskUserMsg() && !V.isActiveChatBox(o)) || !o || !o.isShowing()) {
                                    V.mainPanel.mf_addOffMsg(R, Q, n, ah, 1)
                                }
                                if (!V.isMaskUserMsg()) {
                                    if (!o) {
                                        V.actChat(R, true)
                                    }
                                    V.mainPanel._tabsManage.mf_notify_recv(R);
                                    if (G.group_id != "1001") {
                                        if (!V.isMaskSound()) {
                                            V.playMsgSnd(1)
                                        }
                                    }
                                }
                                if (o) {
                                    var W = o._talkTabs;
                                    W.mf_updateHistory(R)
                                }
                            }
                        } else {
                            if ((ac == "09" || ac == "0a") && T == "87") {
                                V.replyCS17(R, Q, D, 3, L);
                                var E = q[7],
                                u = q[8];
                                if (q[9] != "0") {
                                    U.setTime(parseInt(q[9]) * 1000)
                                }
                                ah = U.format("yyyy-MM-dd hh:mm:ss");
                                if (E != "f") {
                                    V.showUserPic(R, E, u)
                                } else {
                                    var O = q[11],
                                    F = q[12],
                                    ab = V.getFileInfo(R, u, O, F);
                                    if (ab == null) {
                                        return true
                                    }
                                    var I = V.bdylist.allUsers[String(R)].realname || V.bdylist.allUsers[String(R)].nick || R;
                                    var s = '<span class="filemsg_warning_icon"></span><span class="time">' + ah + "</span>";
                                    S = '<span class="file_msg">您同意接收文件"' + String(ab[1]).forHtml() + '"</span><span class="filemsg_button"><a href="###" id="' + String(ab[0]).forHtml() + '">[点击获取]</a></span>';
                                    var J = 0;
                                    if ((J = String(ab[1]).indexOf(".WebQQ")) > -1 && (J = String(ab[1]).length - 6)) {
                                        S += '<br /><span class="important_msg">[安全提示]&nbsp;</span><span>此文件类型存在安全风险，为防止误点击运行恶意程序，已在原文件名称后添加了“.WebQQ”，如确认文件来源可靠，在接收文件后删除文件名中的“.WebQQ”后即可正常使用。</span><a href="http://im.qq.com/cgi-bin/safe/handbook?type=5&faq=1" target="_blank">查看详细帮助</a>'
                                    }
                                    m.on(ab[0], "click",
                                    function(ai, aj) {
                                        window.open(ab[0], "filelog");
                                        this.style.color = "gray";
                                        this.style.cursor = "default";
                                        this.style.textDecoration = "none";
                                        m.removeListener(ab[0], "click");
                                        m.stopEvent(ai)
                                    },
                                    this);
                                    n = "对方发送了一个文件" + ab[1] + "给您";
                                    var af = V.bdylist.allUsers[String(R)].history.append(D, {
                                        style: "system-id",
                                        msg: s
                                    },
                                    {
                                        style: "content",
                                        msg: S
                                    });
                                    if (!af) {
                                        return true
                                    }
                                    if ((V.isMaskUserMsg() && !V.isActiveChatBox(o)) || !o || !o.isShowing()) {
                                        V.mainPanel.mf_addOffMsg(R, Q, n, ah, 1)
                                    }
                                    if (!V.isMaskUserMsg()) {
                                        if (!o) {
                                            V.actChat(R, true)
                                        }
                                        V.mainPanel._tabsManage.mf_notify_recv(R);
                                        if (G.group_id != "1001") {
                                            if (!V.isMaskSound()) {
                                                V.playMsgSnd(1)
                                            }
                                        }
                                    }
                                    if (o) {
                                        var W = o._talkTabs;
                                        W.mf_updateHistory(R)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if ((ac == "2b")) {
                var r = V.bdylist.allClasses[R];
                if (!r || !r.member_got) {
                    V.replyCS17(R, Q, D, 2, L);
                    return true
                }
                var w = q[10];
                V.replyCS17(R, Q, D, 2, L);
                if (w != V.uin) {
                    var ad = r.all_members[w] ? (r.all_members[w].remark || "") : "";
                    var I = (V.bdylist.allUsers[w]) ? V.bdylist.allUsers[w].nick: "";
                    I = ad || I;
                    var U = new Date();
                    if (q[13] != "0") {
                        U.setTime(parseInt(q[13]) * 1000)
                    }
                    var ah = U.format("yyyy-MM-dd hh:mm:ss");
                    var af = r.history.append(D, {
                        style: "friend-id",
                        msg: I + "(" + w + ")&nbsp;&nbsp;" + ah
                    },
                    {
                        style: "content",
                        msg: S
                    });
                    if (!af) {
                        return true
                    }
                    if (r.msg_flag == 0) {
                        if ((V.isMaskClassMsg() && !V.isActiveChatBox(o)) || !o || !o.isShowing()) {
                            V.mainPanel.mf_addOffMsg(R, Q, n, ah, 2, r.code)
                        }
                        if (!V.isMaskClassMsg()) {
                            if (!o) {
                                V.actChat(R, true)
                            }
                            V.mainPanel._tabsManage.mf_notify_recv(R);
                            if (!V.isMaskSound()) {
                                V.playMsgSnd(1);
                                V.prompt_msg.change = "-群" + String(r.name) + "来消息啦...";
                                V.promptMsg()
                            }
                        }
                        if (o) {
                            var W = o._talkTabs;
                            W.mf_updateHistory(R)
                        }
                    } else {
                        var A = h.get("qqclass_" + R);
                        A.innerHTML = r.name + "(<span style='color:red'>" + r.history.get_msg_count() + "</span>)"
                    }
                }
                return true
            }
            return true
        },
        sc0xae: function(p) {
            var n = this._qqclient;
            n.last_error = n.ERR_MSG_ENUM.ok;
            if (n.cur_login_stat != n.LOGIN_STAT_ENUM.all_info_is_done) {
                return true
            }
            var o = parseInt(p[2]);
            n.runCsCallback({
                seq: p[2],
                params: p
            });
            return true
        },
        sc0xf1: function(G) {
            var p = this._qqclient;
            p.last_error = p.ERR_MSG_ENUM.ok;
            if (!p.logined) {
                return true
            }
            var B = Number(G[2]),
            D = Number(G[4]),
            r = G[5],
            w = G[6],
            x = Number(G[7]),
            y = Number(G[8]),
            A = Number(G[9]),
            L = p.bdylist.allUsers[D];
            if (r != "f" || (x != 1 && x != 2)) {
                return true
            }
            var u = new Date();
            if (y != "") {
                u.setTime(y * 1000)
            }
            var o = u.format("yyyy-MM-dd hh:mm:ss");
            var H = p.bdylist.allUsers[String(D)].realname || p.bdylist.allUsers[String(D)].nick || D;
            for (var E = 0; E < A; E = E + 4) {
                var I = Number(G[12 + E]);
                if (I != 0 && I != 13 && I != 51) {
                    break
                }
                var J = (p.lc[w & 4095]) || (G[10 + E].escape2html()) || "文件",
                z = Number(G[13]),
                q = '<span class="file_msg">成功' + (x == 1 ? "发送": "接收") + '文件"' + J + '"(' + Number(z / 1024).toFixed(2) + "KB)</span>",
                K = "成功" + (x == 1 ? "发送": "接收") + "文件" + J + "(" + Number(z / 1024).toFixed(2) + "KB)",
                C = Number(G[11 + E]);
                var F = '<span class="filemsg_success_icon"></span><span class="time">' + o + "</span>";
                if (I == 13) {
                    F = '<span class="filemsg_failure_icon"></span><span class="time">' + o + "</span>";
                    q = '<span class="file_msg">暂不支持大于3MB的文件，"' + J + '"(' + Number(z / 1048576).toFixed(2) + "MB)传输失败</span>";
                    K = "暂不支持大于3MB的文件，" + J + "(" + Number(z / 1048576).toFixed(2) + "MB)传输失败"
                } else {
                    if (I == 51 && x == 1) {
                        F = '<span class="filemsg_failure_icon"></span><span class="time">' + o + "</span>";
                        q = '<span class="file_msg">"' + J + '"发送超时，请重试</span>';
                        K = J + "发送超时，请重试"
                    } else {
                        if (I == 51 && x == 2) {
                            return true
                        }
                    }
                }
                var v = p.bdylist.allUsers[D].history.append(B, {
                    style: "friend-id",
                    msg: F
                },
                {
                    style: "content",
                    msg: q
                });
                if (!v) {
                    return true
                }
                var s = p.getChatBox(D);
                if ((p.isMaskUserMsg() && !p.isActiveChatBox(s)) || !s || !s.isShowing()) {
                    p.mainPanel.mf_addOffMsg(D, msg_id, K, o, 1)
                }
                if (!p.isMaskUserMsg()) {
                    if (!s) {
                        p.actChat(D, true)
                    }
                    p.mainPanel._tabsManage.mf_notify_recv(D);
                    if (L.group_id != "1001") {
                        if (!p.isMaskSound()) {
                            p.playMsgSnd(1)
                        }
                    }
                }
                if (s) {
                    var n = s._talkTabs;
                    n.mf_updateHistory(D)
                }
            }
            return true
        },
        sc0x0d: function(u) {
            var p = this._qqclient,
            r = u.params;
            p.last_error = p.ERR_MSG_ENUM.ok;
            if (!p.logined) {
                return true
            }
            if (r[3] != null) {
                if ((r[3] == "0") && (p.will_set_stat != null)) {
                    p.uin_online_stat = p.will_set_stat;
                    var t = p.pre_online_stat.value,
                    s = p.uin_online_stat.value,
                    n = p.uin;
                    t = (t == 40) ? 20 : t;
                    p.css_stat = p.STAT2DESC[s];
                    s = (s == 40) ? 20 : s;
                    p.mainPanel.mf_updateUinStat();
                    var o = p.bdylist.allClasses;
                    for (var w in o) {
                        var v = o[w];
                        if (!v || (v.online_users.fnd_user(n) == -1 && v.offline_users.fnd_user(n) == -1 && v.away_users.fnd_user(n) == -1)) {
                            continue
                        }
                        switch (t) {
                        case 10:
                            v.online_users.rmv_user(n);
                            break;
                        case 20:
                            v.offline_users.rmv_user(n);
                            break;
                        case 30:
                            v.away_users.rmv_user(n);
                            break
                        }
                        switch (s) {
                        case 10:
                            v.online_users.add_user(n);
                            break;
                        case 20:
                            v.offline_users.add_user(n);
                            break;
                        case 30:
                            v.away_users.add_user(n);
                            break
                        }
                        p.mainPanel.mf_updateClassUserSta(v, n, p.STAT2DESC[String(s)])
                    }
                    var q = p.mainPanel._tabsManage._uin2container;
                    for (var x in q) {
                        if (!q[x]._qqclass) {
                            continue
                        }
                        q[x].mf_updateUserSta(n, p.STAT2DESC[String(s)]);
                        q[x].mf_UpdateMemberHeader(v)
                    }
                    p.mainPanel._my_avatar_img_node.className = "";
                    if (p.uin_online_stat == p.ONLINE_STAT_ENUM.offline) {
                        p.mainPanel._my_avatar_img_node.className = "offline";
                        p.closeConn()
                    }
                    p.will_set_stat = null
                }
            }
            return true
        },
        sc0x80: function(s) {
            YAHOO.log("sc0x80: " + s);
            var n = this._qqclient,
            q = Number(s[0]),
            r = parseInt(s[1], 16);
            n.last_error = n.ERR_MSG_ENUM.ok;
            if (q != n.uin || r != 128 || s[3] == null) {
                return false
            }
            var o = [];
            for (var p = 3; p < s.length; p++) {
                o.push(s[p])
            }
            var t = s[4];
            n.getUinInfo(t, o);
            return true
        },
        sc0x81: function(u) {
            YAHOO.log("sc0x81: " + u);
            var s = this._qqclient,
            o = Number(u[0]),
            r = parseInt(u[1], 16);
            s.last_error = s.ERR_MSG_ENUM.ok;
            if (o != s.uin || r != 129 || u[3] == null) {
                return false
            }
            var o = parseInt(u[3]);
            var w = parseInt(u[4]);
            var v = s.bdylist.allUsers[String(o)];
            if (v == null) {
                return true
            }
            var x = v.stat;
            if (x == w) {
                return true
            }
            if (!x) {
                x = 20
            }
            var A = s.bdylist.groups[v.group_id];
            var q = s.bdylist.groups._1000;
            if (A == null) {
                return true
            }
            switch (x) {
            case 10:
                A.online_users.rmv_user(o);
                q.online_users.rmv_user(o);
                break;
            case 20:
                A.offline_users.rmv_user(o);
                q.offline_users.rmv_user(o);
                break;
            case 30:
                A.away_users.rmv_user(o);
                q.away_users.rmv_user(o);
                break
            }
            v.stat = w;
            var n = 0;
            switch (w) {
            case 10:
                n = A.online_users.add_user(o);
                q.online_users.add_user(o);
                s.mainPanel.mf_updateUserSta(o, s.STAT2DESC[String(w)]);
                s.mainPanel.mf_updateOnlineUserSta(o, s.STAT2DESC[String(w)], "_1000");
                break;
            case 20:
                n = A.offline_users.add_user(o);
                s.mainPanel.mf_updateUserSta(o, s.STAT2DESC[String(w)]);
                s.mainPanel.mf_updateOnlineUserSta(o, s.STAT2DESC[String(w)], "_1000");
                break;
            case 30:
                n = A.away_users.add_user(o);
                q.away_users.add_user(o);
                s.mainPanel.mf_updateUserSta(o, s.STAT2DESC[String(w)]);
                s.mainPanel.mf_updateOnlineUserSta(o, s.STAT2DESC[String(w)], "_1000");
                break
            }
            if ((x == 20 && w != 20) || (x != 20 && w == 20)) {
                if (x == 20) {
                    if (v.gender == "女") {
                        s.bdylist.female.on++
                    } else {
                        if (v.gender == "男") {
                            s.bdylist.male.on++
                        }
                    }
                } else {
                    if (v.gender == "女") {
                        s.bdylist.female.on--
                    } else {
                        if (v.gender == "男") {
                            s.bdylist.male.on--
                        }
                    }
                }
                s.mainPanel.mf_updateGenderStat(s.bdylist.male, s.bdylist.female)
            }
            s.mainPanel.mf_updateGroupStat(A);
            s.mainPanel.mf_updateGroupStat(q);
            var p = s.bdylist.allClasses;
            for (var z in p) {
                var y = p[z];
                if (!y || (y.online_users.fnd_user(o) == -1 && y.offline_users.fnd_user(o) == -1 && y.away_users.fnd_user(o) == -1)) {
                    continue
                }
                switch (x) {
                case 10:
                    y.online_users.rmv_user(o);
                    break;
                case 20:
                    y.offline_users.rmv_user(o);
                    break;
                case 30:
                    y.away_users.rmv_user(o);
                    break
                }
                switch (w) {
                case 10:
                    y.online_users.add_user(o);
                    break;
                case 20:
                    y.offline_users.add_user(o);
                    break;
                case 30:
                    y.away_users.add_user(o);
                    break
                }
                s.mainPanel.mf_updateClassUserSta(y, o, s.STAT2DESC[String(w)])
            }
            var t = s.mainPanel._tabsManage._uin2container;
            for (var z in t) {
                if (!t[z] || !p[z]) {
                    continue
                }
                t[z].mf_updateUserSta(o, s.STAT2DESC[String(w)]);
                t[z].mf_UpdateMemberHeader()
            }
            return true
        },
        toString: function() {
            return "WEBQQ.Protocal.SC Singleton Object"
        }
    }
})();