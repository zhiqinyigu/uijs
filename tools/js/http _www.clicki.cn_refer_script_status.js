function Clicki(args) {
    var t = this;
    t.t = t;
	t.date = new Date();
	t.time = t.date.getTime();
    t.apc = 'appendChild';
    t.ade = 'addEventListener';
    t.crt = 'createElement';
    t.cl = 'cloneNode';
    t.getByName = 'getElementsByTagName';
    t.ate = 'attachEvent';
    t.sto = 'setTimeout';
    t.enU = encodeURIComponent;
    t.D = document;
    t.W = window;
    t.SR = args['SR'] || 0;
    t.ST = args['ST'] || 0;
    t.SC = args['SC'] || 0;
    t.SALL = args['SALL'] || 0;
    t.Complex = args['Complex'] || 0;
    t.INST = args['INST'] || 'clickI';
    t.IE = t.D.all ? 1: 0;
    t.STL = '';
    t.Float = {};
    t.DT = 0;
    t.DL = 0;
    t.St = 0;
    t.Sl = 0;
    t.cCount = 0;
    t.div = t.D[t.crt]('div');
    t.DMAIN = t.D.domain;
    t.Pool = [];
    t.ol = function(f) {
        var a,
        b = navigator.userAgent,
        c = "__onC__",
        o = "opera",
        r = "readyState",
        s = "<scr".concat("ipt defer src='//:' on", r, "change='if(this.", r, "==\"complete\"){this.parentNode.removeChild(this);", c, "()}'></scr", "ipt>");
        t.W[c] = (function(o) {
            return function() {
                t.W[c] = function() {};
                for (a = arguments.callee; ! a.done; a.done = 1) f(o ? o() : o)
            }
        })(t.W[c]);
        if (t.D[t.ade]) t.D[t.ade]("DOMContentLoaded", t.W[c], false);
        if (/WebKit|Khtml/i.test(b) || (t.W[o] && parseInt(t.W[o].version()) < 9))(function() { / loaded | complete / .test(t.D[r]) ? t.W[c]() : t.W[t.sto](arguments.callee, 1)
        })();
        else if (/MSIE/i.test(b)) t.D.write(s)
    };
    t.ae = function(o, e, f) {
        if (t.D[t.ade]) {
            o[t.ade](e, f, 0)
        } else if (t.W[t.ate]) {
            o[t.ate]('on' + e, f)
        }
    };
    t.re = function(o, e, f) {
        if (t.D[t.ade]) {
            o.removeEventListener(e, f, 0)
        } else if (t.W[t.ate]) {
            o.detachEvent('on' + e, f)
        }
    };
    t.trim = function(str, ch) {
        return (str.replace(new RegExp('^' + ch + '*|' + ch + '*$', "g"), ''))
    };
    t.cut = function(s, l) {
        var i = 0,ss=s.match(/(&#\d+;?)|./g),ll = s.replace(/(&#\d+;?)/g,"x").replace(/[^\x00-\x7f]/g,"xx").length;
        if (l + 2 >= ll) return s;
        while (i < l) {
            if (ss[i].match(/[^\x00-\x7f]/))l--;
            i++
        }
        return ss.slice(0,i).join('')+ '..'
    };
    t.$ = function(id) {
        return t.D.getElementById(id)
    };
    t.$N = function(n) {
        return t.D[t.getByName](n)
    };
    t.setCo = function(n, v) {
        var d = new Date(),
        a = t.setCo.arguments;
        var e = a[2] || 0,
        p = a[3] || '/',
        dm = a[4] || 0,
        se = a[5] || 0;
        if (e) d.setTime(d.getTime() + (e * 1000));
        t.D.cookie = n + "=" + escape(v) + (e ? ("; expires=" + d.toGMTString()) : "") + ("; path=" + p) + (dm ? ("; domain=" + dm) : "") + (se ? "; secure": "")
    };
    t.getCo = function(n) {
        var v = t.D.cookie.match('(?:^|;)\\s*' + n + '=([^;]*)');
        return v ? unescape(v[1]) : 0
    };
	t.ckType = function(){
		var f0 = t.getCo("_r_f0"),f1 = t.getCo("_r_f1");
		if(f0)f0=f0.split(',');
		if(f1)f1=f1.split(',');
		try{t.groupID = opener.groupID}catch(e){t.groupID = 0}
		if(t.groupID&&f0){
			t.setCo("_r_f0",0,-1);
			t.flow=f0[3].split('|');
			t.flowoff=parseInt(f0[4]);
			if(t.REFER==f0[0]&&t.LOC==f0[1]&&t.groupID==f0[2]){
				t.flowID = t.flow[t.flowoff+1];
				t.parentID = t.flow[t.flowoff];
				return 4;/*刷新*/
			}else{
				t.flowID = ++t.flowCount;
				t.parentID = t.flow[0];
				t.flow.unshift(t.flowID);
				t.setCo('_r_flowCount',t.flowID);
				return 3;/*window.open新开窗口*/
			}
		}
		if(f1&&t.REFER==f1[0]&&t.LOC==f1[1]){
			t.flow=f1[3].split('|');
			t.flowoff=f1[4];
			t.setCo('_r_f1',0,-1);
			t.flowID = ++t.flowCount;
			t.setCo('_r_flowCount',t.flowID);
			t.groupID = f1[2];
			t.parentID = t.flow[0];
			t.flow.unshift(t.flowID);
			return 3;/*<a href>打开新页面*/
		}
		if(f0){
			t.setCo("_r_f0",0,-1);
			t.flow=f0[3].split('|');
			t.flowoff=parseInt(f0[4]);
			if(t.REFER==f0[0]&&t.LOC==f0[1]){/*刷新*/
				t.groupID = f0[2];
				t.parentID = t.flow[t.flowoff+1];
				t.flowID = t.flow[t.flowoff];
				return 4;
			}else if(t.REFER==f0[1]){
				t.groupID = f0[2];
				t.parentID = t.flow[t.flowoff];
				if(t.flowoff){/*前进*/
					t.flowID = t.flow[t.flowoff>0?--t.flowoff:0];
					return 4;
				}else{/*location.href打开新窗口*/
					t.flowID = ++t.flowCount;
					t.flow.unshift(t.flowID);
					t.setCo('_r_flowCount',t.flowID);
					return 3;
				}
			}else if(t.LOC==f0[0]){/*后退*/
				t.groupID = f0[2];
				t.parentID = t.flow[++t.flowoff+1];
				t.flowID = t.flow[t.flowoff];
				return 4;
			}
		}
		t.groupID = ++t.groupCount;
		t.setCo('_r_groupCount',t.groupID);
		t.flowID = ++t.flowCount;
		t.setCo('_r_flowCount',t.flowID);
		return 3;/*新开窗口，新的flow group*/
	};
    t.BD = t.$N('body')[0];
    t.PIXEL = screen.width + "x" + screen.height;
    t.COLR = screen.colorDepth;
    t.REFER = t.enU(t.trim(((t.D.referrer||'').match('[^#]*'))[0], '[/ \]'));
    t.LOC = t.enU(t.trim(((location + '').match('[^#]*'))[0], '[/ \]'));
	t.HASH=t.trim(location.hash,'#');
    t.TITLE = t.enU(t.D.title);
    t.visitorID = t.getCo("_r_cookie");/*永久保存的访问者标识，visitorID*/
	t.groupID = 1;
	t.parentID = 0;
	t.flowID = 1;
	t.flow=[1,0];
    t.flowoff=0;
	t.vtd=0;
	if (!t.visitorID) {
		/* 没有cookie，是新访客。初始化cookie，写入cookie, visitid, groupCount, flowCount */
		t.setCo('_r_groupCount', 1);
		t.setCo('_r_flowCount', 1);
		t.setCo('_r_cookie', r_t_cksum, 36000000);
		t.setCo('_r_visitid', r_t_cksum);
		t.tType=1;//新访
		t.vtd = 1;//新ip
	} else {
		/* 有cookie，是旧访客 */
		t.setCo('_r_cookie', t.visitorID, 36000000);		/* 更新cookie，永久保存，可随意取值 */
		t.flowCount = t.getCo("_r_flowCount")||0;
		t.groupCount = t.getCo("_r_groupCount")||0;
		/* 判断是否回访 */
		if (!t.flowCount) {	/* 无flowCount，则是回访 */
			t.setCo('_r_flowCount', 1);
			t.setCo('_r_groupCount', 1);
			t.setCo('_r_visitid', r_t_cksum);		/* 更新visitid */
			t.tType=2;/* 回访 */
			if(!t.getCo('_r_vtd')){//没有visited,新ip
				t.vtd = 1;
			}
		} else {	/* 非回访 */
			t.tType=t.ckType();
		}
	}
	t.geo=t.getCo('_r_geo');
    t.visitID = t.getCo("_r_visitid");/* 关闭浏览器后就消失，用于记录访问编号，visitid为checksum */
    t.visitorID = t.getCo("_r_cookie");
//	document.writeln(t.REFER);
//	document.writeln(t.LOC);
//	document.writeln(t.TITLE);
//	document.writeln(t.visitorID);
//	document.writeln('groupID:'+t.groupID);
//	document.writeln('parentID:'+t.parentID);
//	document.writeln('flowID:'+t.flowID);
//	document.writeln('offset:'+t.flowoff);
    t.showR = function() {
        var s = t.ctTXT ? '<a href="' + t.sURL + '" target="_blank">' + unescape(t.ctTXT) + "</a><br/>": "",
        rObj = t.$("referer") || t.apdDiv();
        if (r = t.refers) {
            var rT = "",
            l = t.rLen,
            ll = r.length;
            s += t.rTXT ? unescape(t.rTXT) + "<br/>": "";
            if (ll) {
                for (var i = 0; i < ll; i++) {
                    rT = unescape(r[i][1]);
                    s += ' - <a href = "' + r[i][0] + '" title="' + rT + '" target="_blank">' + t.cut(rT, l) + '</a>';
                    s += "<small>[" + r[i][3] + "]</small><br/>"
                }
            } else {
                s += "no referer yet.<br/>"
            }
            s += '<a href="' + t.sURL + '" target="_blank">' + t.lan[5] + '</a>'
        }
        rObj.innerHTML = s
    };
    t.addWid = function(id, name, content) {
        var nav = t.$('r_c_nav'),
        _m = (t.$('__mid'))[t.cl](1),
        _t = (t.$('__tab'))[t.cl](1),
        _p = (t.$('pan_pre'))[t.cl](1),
        _x = (t.$('__x'))[t.cl](1),
        bd = t.$('r_c_body');
        var table = _m.firstChild;
        _x.id = 'x_' + id;
        _x.onclick = t.floati;
        _p.id = 'pan_' + id;
        _m.id = 'mid_' + id;
        _t.id = 'tab_' + id;
        _t.innerHTML = '<div style="font-weight:bold;background:' + t.navClr + ';width:60px;padding:2px;margin-left:3px;text-align:center">' + name + '</div>';
        _t[t.apc](_x);
        _p[t.apc](_t);
        _p[t.apc](_m);
        table[t.apc](content);
        bd[t.apc](_p);
        t.setRows('mid_' + id);
        t.widPool = id
    };
    t.refer = function() {
        var rT = "",
        pT = '',
        r_div = t.$('pan_refer'),
        w = t.div[t.cl](0);
        if (!t.Float['refer']) {
            t.tgl(t.WG, 'refer');
            if (r_div) {
                r_div.style.display = 'block'
            } else {
                var tbody = t.D[t.crt]('tbody'),
                td = t.D[t.crt]('td'),
                tr = t.D[t.crt]('tr'),
                rT = '',
                r = t.refers;
                var trs = tr[t.cl](1),
                tds = td[t.cl](1);
                trs.className = 'th';
                tds.innerHTML = 'links';
                trs[t.apc](tds);
                tds = td[t.cl](1);
                tds.innerHTML = 'cnt';
                trs[t.apc](tds);
                tbody[t.apc](trs);
                if (t.ctTXT) { (trs = tr[t.cl](1)).className = 'row'; (tds = td[t.cl](1)).colSpan = 2;
                    tds.innerHTML = unescape(t.ctTXT);
                    trs[t.apc](tds);
                    tbody[t.apc](trs)
                }
                var trs = {},
                tds = {};
                if (L = r.length) {
                    for (var i = 0; i < L; i++) { (trs = tr[t.cl](1)).className = 'row';
                        rT = unescape(r[i][1]);
                        var a = ['<a href = "' + r[i][0] + '" title="' + rT + '" target="_blank">' + t.cut(rT, t.rLen) + '</a>', r[i][3]],
                        l = a.length;
                        for (var ii = 0; ii < l; ii++) { (tds = td[t.cl](1)).innerHTML = a[ii];
                            trs[t.apc](tds)
                        }
                        tbody[t.apc](trs)
                    }
                } else { (trs = tr[t.cl](1)).className = 'row'; (tds = td[t.cl](1)).colSpan = 2;
                    tds.innerHTML = 'no referrer yet.';
                    trs[t.apc](tds);
                    tbody[t.apc](trs)
                }
                t.addWid('refer', 'Referer', tbody)
            }
        }
    };
    t.tgl = function(r, i) {
        try {
            t.$('pan_' + r[0]).style.display = 'none';
            r.sort(function(a, b) {
                return (a == i) ? -1: (b == i) ? 1: 0
            })
        } catch(e) {}
    };
    t.traf = function() {
        var rT = "",
        pT = '',
        t_div = t.$('pan_traf'),
        w = t.div[t.cl](0);
        if (!t.Float['traf']) {
            t.tgl(t.WG, 'traf');
            if (t_div) {
                t_div.style.display = 'block'
            } else {
                var tbody = t.D[t.crt]('tbody'),
                td = t.D[t.crt]('td'),
                tr = t.D[t.crt]('tr'),
                rT = '';
                var trs = tr[t.cl](1),
                tds = td[t.cl](1),
                c1 = '.png" align="absmiddle" alt="',
                r = t.traffics;
                trs.className = 'th';
                trs[t.apc](tds);
                tbody[t.apc](trs);
                for (var p in r) {
                    p = r[p];
                    rT = unescape(p[11]);
                    pT = unescape(p[13]); (trs = tr[t.cl](1)).className = 'row';
                    var s = '<table width=100% height=20 cellspacing=0 border=0><tr><th style="background:none;"><img src="' + t.ir + 'flags/' + p[4] + c1 + p[2][t.lan[6]] + p[3] + '" title="' + p[2][t.lan[6]] + p[3] + '" /> ' + (t.tOS ? '<img src="' + t.ir + 'browsers/' + p[9] + c1 + p[8] + '" title="' + p[8] + '" /> <img src="' + t.ir + 'browsers/' + p[7] + c1 + p[6] + '" title="' + p[6] + '" /> ': '') + p[5] + '</th><th width=50% style="text-align: right;background:none;line-height:120%;"> ' + p[15][0] + t.lan[3][p[15][1]] + (p[15][1] ? t.lan[4] : '') + '</th></tr></table><p style="line-height:14px;">' + (p[11] ? (t.lan[0] + ' <a href="' + p[10] + '" title="' + rT + '" target="_blank">' + rT + '</a><br/> ') : t.lan[1]) + t.lan[2] + ' <a href = "' + p[12] + '" title="' + pT + '" target="_blank">' + pT + '</a></p>'; (tds = td[t.cl](1)).innerHTML = s;
                    trs[t.apc](tds);
                    tbody[t.apc](trs)
                }
                t.addWid('traf', 'Live', tbody)
            }
        }
    };
    t.apdDiv = function() {
        var scs = t.$N('script'),
        obj = {},
        sl = scs.length,
        x = 0,
        rObj = t.div[t.cl](0);
        for (var x = 0; x < sl; x++) {
            if (scs[x].src.indexOf('feeler') > 0) {
                obj = scs[x].parentNode;
                break
            }
        }
        rObj.id = 'referer';
        obj[t.apc](rObj);
        return rObj
    };
    t.init = function() {
        t.BD = t.$N('body')[0];
        t.ir = t.sURL + 'images/icons/';
        if (t.SC) _trclick_(t.INST);
        t.ae(t.D, 'click', t.hdlclk);
        if (t.Complex) {
            if (t.ST || t.SR || t.SC) {
                t.backgrd = t.backgrd ? ((/^http.*/i.test(t.backgrd)) ? ('url(' + t.backgrd + ') repeat fixed 0% 0%') : '#' + t.backgrd) : 'none';
                t.borderClr = t.borderClr ? '#' + t.borderClr: 'transparent';
                t.navClr = t.navClr ? '#' + t.navClr: 'transparent';
                t.STL = '#r_w_div{left:0;top:0;z-index:1000}#r_c_wrap *,#r_c_wrap div,#r_c_wrap img,#r_c_wrap p,#r_c_ctn *{text-align:left;font:normal 11px/100% tahoma,arial;color:#' + t.titleClr + ';border:0;padding:0;margin:0;}#r_c_btm a{color:#' + t.titleClr + ';text-decoration:none;}#r_c_wrap .row td,#r_c_ctn .row td{padding:5px;border-top:1px solid ' + (t.sepClr ? '#' + t.sepClr: 'none') + ';}#r_c_wrap a:visited,#r_c_wrap a:link,#r_c_ctn a{display:inline;color:#' + t.linkClr + ';background:none;font:normal 12px/100% tahoma;text-decoration:none;padding:0;border:0;margin:0;}#r_c_wrap a:hover,#r_c_ctn a:hover{border:0;border-bottom:1px solid #' + t.linkClr + ';background:none;text-decoration:none;}#r_c_wrap .th td,#r_w_div .th td{padding:3px;background:' + t.navClr + ';overflow:hidden;font:11px arial;}.row td{background:none;}.r_c_over td{background:' + (t.overClr ? '#' + t.overClr: 'none') + ';}.c_nav{width:16px;float:left;cursor:pointer;}';
                t.css(t.STL);
                var div = t.$('referer') || t.apdDiv();
                t.pre('referer')
            }
        } else {
            if (t.refers || t.ctTXT) t.showR()
        }
        if (t.SC||t.Complex){
        	if(t.SC)t.parse();
        	var w = t.div[t.cl](0),
        	ctn = t.div[t.cl](0),
        	ws = t.getWS(),
        	ps = t.getPS(),
        	ps = [0, ps[0] - ws[0], 0, ps[1] - ws[1]];
        	w.id = 'r_w_div';
        	ctn.id = 'r_c_ctn';
        	t.setSty(ctn, [{'position': 'absolute','left':0,'top':0,'zIndex':900}]);
        	w[t.apc](ctn);
        	t.BD.insertBefore(w, t.BD.firstChild);
	        window.onscroll = function() {
	            t.scroll(ctn, ps, 1)
	        }
	    }
    };
    t.pre = function(wid) {
        var w = t.div[t.cl](0),
        _x = t.D[t.crt]('IMG');
        t.setSty(w, [{
            'background': 'none',
            'lineHeight': '100%',
            'overflow': 'hidden',
            'font': 'normal 11px tahoma',
            'color': '#' + t.titleClr,
            'border': 0,
            'padding': 0,
            'margin': 0,
            'textAlign': 'left',
            'textDecoration': 'none',
            'textIndent': '0pt',
            'position': 'relative'
        }]);
        var div = t.$(wid),
        hh = 0,
        hid = w[t.cl](1),
        b = w[t.cl](1),
        d = w[t.cl](1),
        _p = w[t.cl](1),
        _n = w[t.cl](1),
        _t = w[t.cl](1),
        _m = w[t.cl](1),
        nav = w[t.cl](1),
        nav_li = (t.ST ? ' <div id="nav_traf" class="c_nav" onclick="' + t.INST + '.traf();"><img src="' + t.ir + 'traffic.gif" title="Live"/></div>': '') + (t.SR ? ' <div id="nav_refer" class="c_nav" onclick="' + t.INST + '.refer();"><img src="' + t.ir + 'refer.gif" title="Referer"/></div>': '') + (t.SC ? ' <div id="nav_clik" class="c_nav" onclick="' + t.INST + '.click();"><img src="' + t.ir + 'click.gif" title="Click"/></div>': ''),
        WG = (t.ST ? 'traf,': '') + (t.SR ? 'refer,': '') + (t.SC ? 'click,': '');
        t.WG = t.trim(WG, ',').split(',');
        hid.id = 'r_w_hid';
        hid.style.display = 'none';
        w[t.apc](hid);
        b.id = 'r_c_body';
        w[t.apc](b);
        d.id = 'r_c_btm';
        t.setSty(d, [{
            'width': (t.listW - 6) + 'px',
            'padding': '0 3px 5px',
            'textAlign': 'center',
            'background': t.borderClr
        }]);
        t.setSty(nav, [{
            'height': '16px',
            'padding': '5px',
            'marginBottom': '3px',
            'textAlign': 'center',
            'borderBottom': '1px dotted ' + t.navClr
        }]);
        nav.id = 'r_c_nav';
        nav.innerHTML = nav_li;
        if (t.WG.length > 1) {
            hh += 30;
            d[t.apc](nav)
        }
        if (t.AD) hh += 30;
        d.innerHTML += t.AD + '<a href="' + t.sURL + '" target="_blank">' + t.lan[5] + '</a>';
        w[t.apc](d);
        t.setSty(w, [{
            'width': (t.listW) + 'px',
            'height': (t.listH) + 'px',
            'overflow': 'hidden'
        }]);
        w.id = 'r_c_wrap';
        div.innerHTML = '';
        div[t.apc](w);
        t.setSty(_p, [{
            'width': (t.listW - 6) + 'px',
            'border': '3px solid ' + t.borderClr,
            'background': t.borderClr,
            'left': 0,
            'top': 0
        }]);
        _p.id = 'pan_pre';
        hid[t.apc](_p);
        t.setSty(_x, [{
            'position': 'absolute',
            'top': '1px',
            'right': '0',
            'cursor': 'pointer'
        }]);
        _x.src = t.ir + 'float.gif';
        _x.id = '__x';
        hid[t.apc](_x);
        _t.id = "__tab";
        _t.className = "r_c_tab";
        hid[t.apc](_t);
        t.setSty(_m, [{
            'height': (t.listH - 40 - hh) + 'px',
            'border': '1px solid ' + t.navClr,
            'overflow': 'auto',
            'overflowX': 'hidden',
            'background': t.backgrd
        }]);
        _m.id = "__mid";
        _m.className = "r_c_mid";
        _m.innerHTML = '<table width="100%" cellspacing="0" cellpadding="2" style="border-spacing:0"></table>';
        hid[t.apc](_m);
        t[t.WG[0]]()
    };
    t.setSty = function(o, s) {
        for (var i in s) for (var p in s[i]) o.style[p] = s[i][p]
    };
    t.setRows = function(ID) {
        var obj = t.$(ID),
        v = obj[t.getByName]("tr"),
        l = v.length;
        for (var i = 0; i < l; i++) {
            if (/row/i.test(v[i].className)) {
                v[i].onmouseover = function() {
                    this.className += ' r_c_over'
                };
                v[i].onmouseout = function() {
                    this.className = t.trim(this.className, ' r_c_over')
                }
            }
        }
    };
    t.css = function(css) {
        var s = t.D[t.crt]('style');
        s.setAttribute("type", "text/css");
        try {
            s.styleSheet.cssText = css
        } catch(e) {
            s[t.apc](t.D.createTextNode(css));
        }
        t.$N('HEAD')[0][t.apc](s)
    };
    t.floati = function(e, id, s) {
        var s = s || 0,
        id = id || t.trim(this.id, 'x_');
        var d = t.$('r_float'),
        pan = t.$('pan_' + id),
        x = t.$('r_c_x'),
        tab = t.$('tab_' + id),
        W = t.WG;
        if (t.Float[id] && !s) {
            this.src = t.ir + 'float.gif';
            t.Float[id] = 0;
            W.push(id);
            t.setSty(pan, [{
                'top': 0,
                'left': 0,
                'position': 'relative'
            }]);
            t[id]();
            t.$('r_c_body')[t.apc](pan);
            tab.style.cursor = '';
            tab.onmousedown = {}
        } else if (!t.Float[id]) {
            var op = t.getOP(pan),
            ws = t.getWS(),
            os = t.getOF(),
            ws = [0, ws[0] - 40, 0, ws[1] - 20];
            W.shift();
            if (W[0]) {
                t[W[0]]()
            }
            t.St = os[1];
            t.Sl = os[0];
            this.src = t.ir + 'defloat.gif';
            t.setSty(pan, [{
                'top': op[1] - os[1] - 5 + 'px',
                'left': op[0] - os[0] - 5 + 'px',
                'position': 'absolute'
            }]);
            t.$('r_c_ctn')[t.apc](pan);
            t.Float[id] = 1;
            t.drag(tab, pan, ws, t.$('r_c_ctn'))
        }
    };
    t.drag = function(tag, o, r, c) {
        var x,
        y,
        ox,
        oy,r=r;
        var drag_move = function(e) {
            var mp = t.getMP(e);
            var xx = mp[0] - x + ox,
            yy = mp[1] - y + oy;
            o.style.left = (r?(xx < r[0] ? r[0] : xx > r[1] ? r[1] : xx):xx) + 'px';
            o.style.top = (r?(yy < r[2] ? r[2] : yy > r[3] ? r[3] : yy):yy) + 'px';
            return false
        };
        var drag_up = function() {
            t.re(t.D, 'mousemove', drag_move);
            t.re(t.D, 'mouseup', drag_up)
        };
        var drag_down = function(e) {
            e = e ? e: t.W.event;
            var mp = t.getMP(e),
            op = t.getOP(o, 1);
            x = mp[0];
            y = mp[1];
            ox = op[0];
            oy = op[1];
            t.ae(t.D, 'mousemove', drag_move);
            t.ae(t.D, 'mouseup', drag_up);
            return false
        };
        tag.style.cursor = 'move';
        tag.onmousedown = drag_down
    };
    t.scroll = function(o, r, n) {
        var tx,
        ty,
        op = t.getOP(o),
        s = t.getOF();
        if (n) {
            r[0] = s[0];
            r[2] = s[1]
        }
        t.DT = s[1] - t.St;
        t.DL = s[0] - t.Sl;
        t.St = s[1];
        t.Sl = s[0];
        ty = op[1] + t.DT;
        tx = op[0] + t.DL;
        o.style.left = (tx < r[0] ? r[0] : tx > r[1] ? r[1] : tx) + 'px';
        o.style.top = (ty < r[2] ? r[2] : ty > r[3] ? r[3] : ty) + 'px'
    };
    t.getMP = function(e, o) {
        e = e ? e: t.W.event;
		var p=o?t.getOP(o):[0,0],x=e.pageX || e.clientX + (t.D.documentElement.scrollLeft || t.BD.scrollLeft),y=e.pageY || e.clientY + (t.D.documentElement.scrollTop || t.BD.scrollTop);
        return [x-p[0],y-p[1]]
    };
    t.getOP = function(o, r) {
        var X = 0,
        Y = 0;
        if (r) {
            X = parseInt(o.style.left);
            Y = parseInt(o.style.top)
        } else {
            if (o.offsetParent) {
                while (o.offsetParent) {
                    X += o.offsetLeft;
                    Y += o.offsetTop;
                    o = o.offsetParent
                }
            } else if (o.x) {
                X += o.x;
                Y += o.y
            }
        }
        return [X, Y]
    };
    t.getWS = function() {
        return [t.W.innerWidth || t.D.documentElement.clientWidth || t.BD.clientWidth, t.W.innerHeight || t.D.documentElement.clientHeight || t.BD.clientHeight]
    };
    t.getOF = function() {
        return [t.W.pageXOffset || t.D.documentElement.scrollLeft || t.BD.scrollLeft, t.W.pageYOffset || t.D.documentElement.scrollTop || t.BD.scrollTop]
    };
    t.getPS = function() {
        var a = (t.W.innerWidth + t.W.scrollMaxX) || t.BD.scrollWidth,
        b = t.BD.offsetWidth,
        c = (t.W.innerHeight + t.W.scrollMaxY) || t.BD.scrollHeight,
        d = t.BD.offsetHeight;
        return (a > b || c > d) ? [a, c] : [b, d]
    };
    t.remCo = function(a,r,l){
    	if(!l){r=t.REFER;l=t.LOC;a=0}
    	t.setCo('_r_f'+a,[r,l,t.groupID,t.flow.join('|'),t.flowoff],20);
    };
    t.hdlclk = function(e) {
        try {
            var u = 0,
            x = 0,nod=0,
            tag = t.getO(t.getT(e), 1),
            lo = t.LOC,
            mp = t.getMP(e, t.$('Origin'));
            if (u = tag.href) {
                u = t.enU(t.trim(((u.match('[^#]*'))[0]), '[/ \]'));
				nod = tag.firstChild;
				if(nod&&nod.nodeName=='IMG'){
					nod='img';
					x = 'IMG:'+nod.src;
				}else{
					x = tag.innerHTML || tag.innerText || tag.text || '';
				}
                if (x && u != lo) {
	                if(u.match(t.enU(t.D.domain))&&!nod=='img'){
						t.remCo(1,lo,u);//站内链接
					}
					t.logEvent(mp, tag, x, u)
                }
            }
        } catch(e) {
			t.logEvent(mp, '', '', '')
		}
    };
	t.logEvent=function(p,o,x,l){
		var img = new Image();
		x=t.enU(x.substring(0, 46));
		img.src = t.sURL + 'refer/pub/trackclick.php?siteid=' + t.sID + '&visitid=' + t.vID + '&coord=' + p[0] + '%2C' + p[1] + '&clickurl=' + l + '&clicktext=' + x
	};
    t.getT = function(e) {
        e = e ? e: t.W.event;
        return e.target || e.srcElement
    };
    t.getO = function(o, s) {
        var i = 0;
        if (!o) return 0;
        while (i <= 5&& o.nodeName.toLowerCase() != 'body') {
            if (s == 1 && o.nodeName.toLowerCase() == 'a') return o;
            if (s == 2  && o.onclick) return o;
            if (s == 3 && o.nodeName.toLowerCase() == 'div' && o.getAttribute('id')) return o;
            o = o.parentNode;
            i++
        }
        return 0
    };
    t.ae(t.W, 'unload', t.remCo);
}

var clickI = new Clicki({});
fResponse();