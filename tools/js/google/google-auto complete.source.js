(function() {
    var e = false,
    h = null,
    i = true,
    aa = e,
    j, l, m, n = "",
    o = h,
    q = h,
    r = h,
    s = -1,
    t, u, v, w, x, y, z, B, C, D = 0,
    E = 0,
    F = e,
    G = h,
    H = 0;
    var ba;
    var J;
    var O, ca;
    var P;
    function ga() {
        ha();
        Q();
        x.value = y.value = B.value = "";
        window.clearTimeout(o);
        n = C = "";
        o = q = r = h;
        s = -1;
        P = D = E = H = 0;
        J = 0;
        ba = "";
    }
    function ja(a, b, c, d, f) {
        t = a;
        u = b;
        l = m = j = u.value;
        if (!b.init) {
            ca = document.getElementsByTagName("body")[0];
            google.bind(t, "submit", ka);
            u.setAttribute("autocomplete", "off");
            google.bind(u, "blur", Q);
            u.onkeypress = la;
            google.bind(u, "keyup", ma);
            x = R("aq", "f");
            y = R("oq", l);
            B = R("aqi", "");
            v = document.createElement("table");
            v.cellSpacing = v.cellPadding = "0";
            w = v.style;
            v.className = "gac_m";
            t.appendChild(v);
            b.init = i
        }
        Q();
        S();
        if (!aa) {
            na();
            aa = i
        }
        P = 0;
        var g = "&client=hp";
        if (d && d != "") {
            P = 1;
            g = "&client=serp"
        } else if (c == "i") {
            P = 2;
            g = "&client=img"
        }
        var p = ["?hl=", google.kHL, g, (c ? "&ds=" + c: ""), (d ? "&pq=" + encodeURIComponent(d) : ""), (f ? "&tok=" + encodeURIComponent(f) : "")].join("");
        C = "/complete/search" + p;
        ba = "/complete/deleteitems" + p;
        J = oa(u);
        google.bind(window, "pageshow",
        function(k) {
            if (k.persisted) {
                x.value = "f";
                y.value = u.value
            }
        });
        T();
        (new Image).src = "http://clients1.google.com/generate_204";
    }
    function na() {
        var a = document.createElement("style");
        document.getElementsByTagName("head")[0].appendChild(a);
        var b = h;
        b = a.sheet;
        var d = function(g, p) {
            var k = g + " { " + p + " }";
            b.insertRule(k, b.cssRules.length);
        };
        d(".gac_m", "font-size:13px;cursor:default;line-height:17px;border:1px solid #666;z-index:99;background:white;position:absolute;margin:0");
        d(".gac_n", "padding-top:1px;padding-bottom:1px");
        d(".gac_b td.gac_c", "background:#d5e2ff");
        d(".gac_b", "background:#d5e2ff");
        d(".gac_a td.gac_f", "background:#fff8dd");
        d(".gac_p", "padding:1px 4px 2px 3px");
        d(".gac_u", "padding:0 0 1px 0;line-height:117%;text-align:left");
        d(".gac_t", "width:100%;font-size:13px;text-align:left");
        d(".gac_bt", "width:" + (u.offsetWidth - 2) + "px;text-align:center;padding:8px 0 7px");
        d(".gac_sb", "font-size:11px");
        d(".gac_s", "height:3px;font-size:1px");
        var f = "white-space:nowrap;overflow:hidden;text-align:left;padding-left:3px;padding-right:3px";
        d(".gac_c", f);
        d(".gac_d", "text-align:right;font-size:10px;padding:0 3px");
        d(".fl:link,.fl:visited", "color:#77c");
        d(".gac_h", "color:green");
        d(".gac_i", "color:#666");
    }
    function S() {
        if (v) {
            w.left = qa(u, "offsetLeft") + "px";
            w.top = qa(u, "offsetTop") + u.offsetHeight - 1 + "px";
            w.width = u.offsetWidth + "px";
        }
    }
    function R(a, b) {
        var c = document.createElement("input");
        c.type = "hidden";
        c.name = a;
        c.value = b;
        return t.appendChild(c)
    }
    function la(a) {
        var b = a.keyCode;
        if (b == 27 && U()) {
            Q();
            V(l);
            a.cancelBubble = i;
            return a.returnValue = e
        }
        if (b == 13 && U()) {
            ra(e);
            a.cancelBubble = i;
            return a.returnValue = e
        }
        if (b == 38 || b == 40) {
            E++;
            E % 3 == 1 && pa(b);
            return e
        }
    }
    function ra(a) {
        if (!a && z) {
            t.removeChild(z);
            z = h
        }
        if (r && s != -1 && F && !(a && r.b)) r.onclick();
        else if (u.value == "") Q();
        else {
            if (a) z = R("btnI", "1");
            sa()
        }
    }
    function sa() {
        ka();
        t.onsubmit && t.onsubmit() == e || t.submit()
    }
    function ma(a) {
        var b = a.keyCode;
        if (E == 0) pa(b);
        E = 0;
    }
    function pa(a) {
        if (u.value != j) {
            l = u.value;
            J = oa(u);
            y.value = l
        }
        if (a == 40 || a == 38) {
            ta(a == 40);
            F = U()
        }
        S();
        if (n != l && !G) G = window.setTimeout(Q, 500);
        j = u.value;
        j == "" && !o && T()
    }
    function va() {
        F = e;
        if (!H) {
            if (r) r.className = "gac_a";
            r = this;
            for (var a = 0, b; b = W(a); a++) b == r && (s = a);
            r.className = "gac_b"
        }
    }
    function wa(a) {
        return function() {
            a += "&aq=" + r.completeId + "&oq=" + y.value + (B.value.length > 0 ? "&aqi=" + B.value: "");
            xa(a);
            return e
        }
    }
    function xa(a) {
        window.location = a
    }
    function ya() {
        V(this.completeString);
        sa();
    }
    function ta(a) {
        if (!n && l) {
            m = "";
            T()
        } else if (! (l != n || !o)) if (! (!q || q.length <= 0)) if (U()) {
            if (r) r.className = "gac_a";
            for (var b = q.length, c = (s + 1 + (a ? 1 : b)) % (b + 1) - 1; c != -1 && W(c).a;) c = (c + 1 + (a ? 1 : b)) % (b + 1) - 1;
            s = c;
            if (s == -1) za();
            else {
                r = W(c);
                r.className = "gac_b";
                V(r.completeString);
                x.value = r.completeId
            }
        } else X()
    }
    function za() {
        u.focus();
        V(l);
        r = h;
        x.value = "f"
    }
    function Q() {
        if (G) {
            window.clearTimeout(G);
            G = h
        }
        w && (w.visibility = "hidden");
    }
    function X() {
        w && (w.visibility = "visible");
        S();
        H = 1
    }
    function U() {
        return !! w && w.visibility == "visible"
    }
    function ha() {
        if (v) {
            v.innerHTML = "";
        }
    }
    function Aa(a, b) {
        a.onclick = b ? wa(b) : ya;
        a.b = !b;
        a.onmousedown = Z;
        a.onmouseover = va;
        a.onmousemove = function() {
            if (H) {
                H = 0;
                va.call(this)
            }
        }
    }
    function Ba(a) {
        for (var b = a.length, c = q.length, d = 0; d < b; ++d) for (var f = 0; f < c; ++f) {
            var g = W(f);
            g.displayRemovalMessage && g.completeString == a[d] && g.displayRemovalMessage()
        }
    }
    function Ca(a) {
        D > 0 && D--;
        if (! (!v || a[0] != l)) {
            function b(ua) {
                if (ua != f) {
                    if (g) d += f + g;
                    g = 0;
                    f = ua
                }
                g++;
                c++
            }
            if (G) {
                window.clearTimeout(G);
                G = h
            }
            n = a[0];
            ha();
            for (var c = 0, d = "", f, g = 0, p = a[1], k = 0, A; k < p.length; k++) if (A = p[k]) if (A[1] == 5) {
                Da(A, a);
                b("n")
            } else if (A[1] == 8) {
                Ea(A, a, k == 0);
                b("a")
            } else if (A[1] == 0) {
                k == 0 && $();
                Fa(A);
                b("g")
            }
            if (c > 0) {
                P == 0 ? Ha() : $();
                X()
            } else Q();
            b("");
            B.value = d;
            s = -1;
            q = v.rows;
            (q && q.length > 0 ? X: Q)()
        }
    }
    function W(a) {
        b = q.item(a);
        return b
    }
    function Ha() {
        var a = v.insertRow( - 1);
        a.a = 1;
        a.onmousedown = Z;
        var b = a.insertCell(0);
        b.innerHTML = '<div class=gac_bt><input class=gac_sb type=button value="Google Search" onclick="google.ac.rd(0)"><input class=gac_sb type=button value="I\x26#39;m Feeling Lucky" onclick="google.ac.rd(1)"></div>'
    }
    function Ea(a, b, c) {
        $();
        var d = a[3],
        f = d[0].replace(/<b>|<\/b>/gi, ""),
        g = v.insertRow( - 1);
        Aa(g, d[1]);
        g.completeId = a[2];
        g.className = "gac_a";
        g.completeString = b[0];
        var p = document.createElement("td");
        p.className = "gac_f gac_p";
        p.innerHTML = ['<table cellpadding=0 cellspacing=0 border=0 class=gac_t><tr><td><table cellpadding=0 cellspacing=0 border=0 class=gac_t><tr><td style="line-height:117%"><a class=q href="http://', f, '" onclick="void(0)">', d[2], '</a><td class="gac_d gac_i">Sponsored Link</table><tr><td class=gac_u><span class=gac_h', ">", d[0], "</span>&nbsp; &nbsp;", d[3], d[4] ? " " + d[4] : "", "</table>"].join("");
        g.appendChild(p);
        c && $()
    }
    function Da(a, b) {
        $();
        var c = v.insertRow( - 1),
        d = a[3];
        Aa(c, d[0]);
        c.completeId = a[2];
        c.className = "gac_a";
        c.completeString = b[0];
        var f = document.createElement("td");
        f.className = "gac_c gac_n";
        var g = a[0].replace(/HTTPS?:\/\//gi, ""),
        p = a[0].replace(/<b>|<\/b>/gi, "");
        f.style.lineHeight = "117%";
        f.innerHTML = ['<a class="q" href="', p, '" onclick="void(0)">', d[1], '</a><br><span class="gac_h"', ">", g, "</span>"].join("");
        c.appendChild(f)
    }
    function Fa(a) {
        var b = v.insertRow( - 1);
        Aa(b);
        b.completeId = a[2];
        b.className = "gac_a";
        var c = document.createElement("td");
        c.className = "gac_c";
        c.innerHTML = a[0];
        b.completeString = c.textContent;
        if (a[2].match(/p$/)) {
            c.className = "";
            c.innerHTML = ["<table cellpadding=0 cellspacing=0 border=0 class=gac_t><tr><td class=gac_c>", a[0], "<td class=gac_d><a href=# class=fl onclick=\"return google.ac.sd(event, '", b.completeString, "')\">Remove</a></table>"].join("");
            b.displayRemovalMessage = function() {
                b.a = 1;
                b.onclick = b.onmouseover = h;
                if (b == r) {
                    b.className = "gac_a";
                    s = -1;
                    za()
                }
                c.className = "gac_c gac_i";
                c.innerHTML = 'This search was removed from your <a href="/history" class=fl>Web History</a>'
            }
        }
        b.appendChild(c)
    }
    function $() {
        var a = v.insertRow( - 1);
        a.a = 1;
        a.onmousedown = Z;
        a.insertCell(0).className = "gac_s"
    }
    function ka() {
        Q();
        if (q && W(s) && y.value != u.value) x.value = W(s).completeId;
        else {
            y.value = "";
            if (D >= 10) x.value = "o"
        }
    }
    function T() {
        if (m != l && l) {
            D++;
            Ka(C, l, Ca);
            u.focus()
        }
        m = l;
        for (var a = 100, b = 1; b <= (D - 2) / 2; ++b) a *= 2;
        a += 50;
        o = window.setTimeout(T, a)
    }
    function La(a, b) {
        Ka(ba, b, Ba);
        if (a = a || window.event) {
            a.cancelBubble = i;
            a.returnValue = e;
            Z(a)
        }
        return e
    }
    function Ka(a, b, c) {
        O && ca.removeChild(O);
        O = document.createElement("script");
        O.src = ["http://clients1.google.com", a, "&q=", encodeURIComponent(b), "&cp=" + J].join("");
        ca.appendChild(O);
    }
    function V(a) {
        if (u) j = u.value = a
    }
    function qa(a, b) {
        for (var c = 0; a;) {
            c += a[b];
            a = a.offsetParent
        }
        return c
    }
    function Ga(a, b) {
        a.appendChild(document.createTextNode(b))
    }
    function Z(a) {
        a.stopPropagation();
        return e
    }
    function oa(a) {
        var b = 0,
        c = 0;
        if (Oa(a)) {
            b = a.selectionStart;
            c = a.selectionEnd
        }
        return b && c && b == c ? b: 0
    }
    function Oa(a) {
        try {
            return typeof a.selectionStart == "number"
        } catch(b) {
            return e
        }
    }
    window.google.ac = {
        i: ja,
        h: Ca,
        rd: ra
    };
    window.google.ac.d = Ba;
    window.google.ac.sd = La;
    google.bind(window, "resize", S);
    google.dstr && google.dstr.push && google.dstr.push(ga);
})();

