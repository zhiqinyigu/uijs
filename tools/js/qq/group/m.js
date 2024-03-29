function Tabs() {
	this.tabs = [];
	this.dp = {
		_init : false,
		_adminPageInited : false,
		_adminPageOpened : false,
		_adminChanged : false,
		_maskInited : false,
		_maskShow : false,
		_currentInfo : false
	}
}
var App = {
	cfg : {
		fwdUri : "http://ptlogin2.qq.com/group2",
		rptUri : "http://mini.group.qq.com/cgi/svr/miniclick/click?clicktype=",
		hovItv : 500,
		scrItv : 350,
		tbPageSize : 4
	},
	tabs : function() {
		Tabs.css = G
				.j([
						"#head{background-image:$bg$;}",
						"#head ul.tabs li.upd{background:black;}",
						".bg{background-image:$bg$;}",
						"#head a:hover{text-decoration:none;}",
						"#restore{position:absolute;bottom:0;left:10px;width:156px;height:23px;overflow:hidden;}",
						"#restore div.left{width:144px;height:19px;positon:absolute;left:0;top:0;background-position:0 -270px;z-index:8000;}",
						"#restore div.right{width:69px;height:23px;right:0;top:0;position:absolute;z-index:8001;background-position:-75px -61px;}",
						"#restore span{display:block;position:absolute;left:5px;top:2px;z-index:8002;line-height:15px;}",
						"#restore a.close{display:block;right:0;top:0;z-index:8003;display:block;position:absolute;width:9px;height:9px;background-position:-2px -141px;right:5px;top:4px;}",
						"#restore a.close:hover{background-position:-2px -130px;}",
						"#adminPage{position:absolute;left:0px;top:0px;z-index:9000;background:#FFFFFF;text-align:center;}",
						"#adminPage div.panel{width:196px;margin:0 auto;}",
						"#adminPage div.table-container{height:93px;overflow-y:auto;}",
						"#adminPage table{width:178px;line-height:15px;}",
						"#adminPage table tr{vertical-align:middle;height:22px;}",
						"#adminPage table.header{width:196px;}",
						"#adminPage table.header tr{height:19px;}",
						"#adminPage table.header tr th{height:16px;padding-top:4px;}",
						"#adminPage table.header tr.line{height:2px;padding:0;}",
						"#adminPage table th{font-weight:normal;vertical-align:middle;}",
						"#adminPage table th, #adminPage table td{text-align:center;background:white;}",
						"#adminPage table span.icon{display:block;width:13px;height:13px;margin-left:3px;}",
						"#adminPage table span.ann{background-position:0 -65px;}",
						"#adminPage table span.photo{background-position:-14px -65px;}",
						"#adminPage table span.ns{background-position:-29px -65px;}",
						"#adminPage table span.hot{background-position:-43px -65px;}",
						"#adminPage table span.ht{background-position:-5px -566px;}",
						"#adminPage div.ctr{padding:3px 3px 0 0;}",
						"#adminPage div.ctr a{margin:0 2px 0 0;}",
						"div.maskWin{position:absolute;left:0;top:0;right:0;bottom:0;background-color:#000000;display:none;z-index:8500;}",
						"div.maskInfo{position:absolute;background-color:#CDE6FC;left:0;top:0;right:0;display:none;padding:7px 5px 5px;z-index:8601;}",
						"#adminPage div.mask{position:absolute;left:0;top:0;right:0;bottom:0;background-color:#000000;display:none;z-index:8100;}",
						"#adminPage div.info{position:absolute;background-color:#CDE6FC;left:0;top:0;right:0;display:none;padding:7px 5px 5px;z-index:8101;}",
						"#adminPage div.info a.close{display:block;position:absolute;width:9px;height:9px;background-position:-2px -141px;right:6px;top:9px;}",
						"#adminPage div.info a.close:hover{background-position:-2px -130px;}",
						"a.button{color:#3B342E;display:block;float:right;background-position:-15px -106px;width:49px;height:19px;text-align:center;line-height:19px;outline:none;text-decoration:none;}",
						"a.button:hover{background-position:-15px -125px;text-decoration:none;}",
						"a.button:active{background-position:-15px -144px;}",
						"a.widebutton{width:65px;background-position:0 -173px;}",
						"a.widebutton:hover{background-position:0 -192px;text-decoration:none;}",
						"a.widebutton:active{background-position:0 -211px;}",
						"body #head{height:22px;background-position:0 -84px;cursor:default;}",
						"#head div,#head a{height:22px;}",
						"#head div.admin{float:right;width:18px;}",
						"#head div.admin a{height:22px;width:18px;background-position:-65px -173px;display:block;overflow:hidden;text-indent:-100px;}",
						"#head div.admin a:hover{background-position:-65px -195px;}",
						"#head ul.tabs li{width:23px;height:22px;}",
						"#head ul.tabs li.tab{padding:0 3px;}",
						"#head div.head-inner{float:left;width:174px;padding-left:2px;}",
						"#head div.tab-container{width:122px;float:left;overflow:hidden;}",
						"#head div.pager{width:15px;heigth:22px;float:left;}",
						"#head div.pager a{display:block;width:15px;height:22px;}",
						"#head div.prev{padding: 0 11px 0 0;}",
						"#head div.next{padding: 0 0 0 11px;}",
						"#head div.pager a.prev{background-position:-83px -195px;}",
						"#head div.prev a:hover{background-position:-83px -217px;}",
						"#head div.prev a.disabled{background-position:-84px -173px;cursor:default;}",
						"#head div.prev a.disabled:hover{background-position:-84px -173px;}",
						"#head div.prev a.upd{background-position:-113px -195px;}",
						"#head div.prev a.upd:hover{background-position:-113px -217px;}",
						"#head div.pager a.next{background-position:-98px -195px;}",
						"#head div.next a:hover{background-position:-98px -217px;}",
						"#head div.next a.disabled{background-position:-99px -173px;cursor:default;}",
						"#head div.next a.disabled:hover{background-position:-99px -173px;}",
						"#head div.next a.upd{background-position:-128px -195px;}",
						"#head div.next a.upd:hover{background-position:-128px -217px;}",
						"#head ul.tabs li#tab-ann a{background-position:0 -354px;}",
						"#head ul.tabs li#tab-ann a.active{background-position: 0 -376px;}",
						"#head ul.tabs li#tab-photo a{background-position:-48px -354px;}",
						"#head ul.tabs li#tab-photo a.active{background-position: -48px -376px;}",
						"#head ul.tabs li#tab-ns a{background-position:-120px -354px;}",
						"#head ul.tabs li#tab-ns a.active{background-position: -120px -376px;}",
						"#head ul.tabs li#tab-hot a{background-position:-96px -354px;}",
						"#head ul.tabs li#tab-hot a.active{background-position: -96px -376px;}",
						"#head ul.tabs li#tab-ht a{background-position:0px -496px;}",
						"#head ul.tabs li#tab-ht a.active{background-position: 0px -518px;}",
						"#head ul.tabs li#tab-ann a.upd{background-position:0 -398px;}",
						"#head ul.tabs li#tab-photo a.upd{background-position:-48px -398px;}",
						"#head ul.tabs li#tab-ns a.upd{background-position:-120px -398px;}",
						"#head ul.tabs li#tab-hot a.upd{background-position:-96px -398px;}",
						"#head ul.tabs li#tab-ht a.upd{background-position:0px -540px;}",
						"div.rndNews{width:100%;height:69px;overflow:hidden;clear:both;text-align:center;background-color:#BDDDEE}",
						"div.rndNews div.newsInner{width:196px;margin:0 auto;text-align:left;}",
						"div.rndNews div.newsInner div.item{clear:both;line-height:22px;height:22px;overflow:hidden;}",
						"div.rndNews div.newsInner div.icon{float:left;width:15px;height:15px;margin:3px 0 0 5px;}",
						"div.rndNews div.upn div.icon,div.rndNews div.ci div.icon,div.rndNews div.cpn div.icon{background-position:-65px -44px;}",
						"div.rndNews div.cb div.icon,div.rndNews div.rb div.icon{background-position:-81px -45px;width:15px;}",
						"div.rndNews div.ca div.icon,div.rndNews div.ja div.icon,div.rndNews div.ma div.icon,div.rndNews div.ba div.icon{background-position:-96px -44px;width:17px;}",
						"div.rndNews div.su div.icon{background-position:-113px -44px;width:16px;}",
						"div.rndNews div.ct div.icon,div.rndNews div.cu div.icon{background-position:-129px -44px;}",
						"div.rndNews div.cw div.icon,div.rndNews div.rw div.icon{background-position:-65px -140px;}",
						"div.rndNews div.newsInner div.txt{margin:0 0 0 5px;float:left;width:158px;height:23px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}",
						"div.rndNews div.even{}", "div.rndNews{height:70px;}"]);
		Tabs.prototype.init = function() {
			this.isAdmin = false;
			if (D.fl.ad && D.fl.ad > 0)
				this.isAdmin = true;
			this.state = G.getWindowState();
			if (this.state.v == "expand")
				G.rPlus("a2");
			else
				this.state.v == "normal" && G.rPlus("a1");
			var b = 1, a = this;
			D.fl.cp && D.fl.cp == 1 && this.clearPin();
			this.tb = $.extend({
						f : 0,
						s : 0,
						d : 1
					}, D.tb);
			var c = [];
			$.each(this.tabs, function() {
						c.push(this.tid)
					});
			if (this.tb.f > 0) {
				b = D.tb.f;
				console.log("[\u9875\u5361]\u5f3a\u5236\u63a8\u8350: " + b)
			} else {
				var d = true;
				if (G.gData("a", 0) > 0) {
					b = parseInt(G.gData("a", 1));
					console.log("[\u9875\u5361]Cookie\u8bbe\u7f6e: " + b);
					d = false;
					if ($.inArray(b, c) < 0) {
						G.setGData("a", null);
						d = true
					}
				}
				if (d)
					if (this.tb.s > 0) {
						b = this.tb.s;
						console
								.log("[\u9875\u5361]\u7ba1\u7406\u5458\u8bbe\u7f6e: "
										+ b)
					} else {
						b = this.tb.d;
						console.log("[\u9875\u5361]\u9ed8\u8ba4\u8bbe\u7f6e: "
								+ b)
					}
			}
			if ($.inArray(b, c) < 0) {
				var e = [5, 2, 3, 1, 4];
				for (d = 0; d < e.length; d++)
					if ($.inArray(e[d], c)) {
						b = e[d];
						break
					}
			}
			this.current = 0;
			this.dp.map = {};
			this.switches = [];
			if (typeof window.tabSwitches == "undefined")
				window.tabSwitches = [];
			else {
				e = window.tabSwitches;
				if (e.length)
					for (d = 0; d < e.length; d++)
						clearTimeout(e[d])
			}
			if (typeof window.scrollBackSwitches == "undefined")
				window.scrollBackSwitches = [];
			this.pinning = 0;
			$.each(this.tabs, function(h) {
						a.dp.map[this.tid] = h;
						if (this.tid == b) {
							a.current = h;
							if (G.cookie("pinned") == this.tid)
								a.pinning = this.tid
						}
					});
			if (this.current < 0)
				this.current = 0;
			if (this.current >= this.tabs.length)
				this.current = this.tabs.length - 1;
			this.currentPage = parseInt(this.current / App.cfg.tbPageSize);
			d = this.tabs.length;
			e = App.cfg.tbPageSize;
			this.pageCount = d % e == 0 ? parseInt(d / e) : parseInt(d / e) + 1;
			console.log("this.currentPage: " + this.currentPage)
		};
		Tabs.prototype.clear = function() {
			$(window).unbind("resize");
			$("#memo").hide();
			$("#head").remove();
			$("#body").remove()
		};
		Tabs.prototype.turnPage = function(b) {
			if (typeof b == "undefined")
				return false;
			var a = this.pageCount;
			if (a == 1) {
				$("#head a.prev").hide();
				$("#head a.next").hide();
				return true
			}
			if (b == "next")
				b = this.currentPage + 1;
			else if (b == "prev")
				b = this.currentPage - 1;
			else if (b == "current")
				b = this.currentPage;
			if (typeof b == "number") {
				if (b < 0 || b >= a)
					return false;
				$("ul.tabs li.tab").hide();
				$("ul.tabs li.page-" + b).show();
				if (b == 0)
					$("#head a.prev").addClass("disabled").attr("title", "")
							.removeClass("upd");
				else {
					$("#head a.prev").removeClass("disabled").attr("title",
							"\u4e0a\u4e00\u9875");
					for (var c = false, d = 0; d < b * App.cfg.tbPageSize; d++)
						if ($("#head a[index=" + d + "]").hasClass("upd")) {
							c = true;
							break
						}
					c && $("#head a.prev").addClass("upd")
				}
				if (b == a - 1)
					$("#head a.next").addClass("disabled").attr("title", "")
							.removeClass("upd");
				else {
					$("#head a.next").removeClass("disabled").attr("title",
							"\u4e0b\u4e00\u9875");
					c = false;
					for (d = (b + 1) * App.cfg.tbPageSize; d < this.tabs.length; d++)
						if ($("#head a[index=" + d + "]").hasClass("upd")) {
							c = true;
							break
						}
					c && $("#head a.next").addClass("upd")
				}
				this.currentPage = b;
				return true
			}
		};
		Tabs.prototype.render = function() {
			var b = this, a = [Tabs.css.toString()], c = [
					'<div id="head" class="bg">\t<div class="admin"><a id="setBtn" class="bg" rev="admin/setfeed" hidefocus="true" href="javascript:void(0);" title="\u8bbe\u7f6e">admin</a></div>\t<div class="head-inner">\t\t<div class="pager prev"><a class="bg pager prev',
					this.currentPage == 0 ? " disabled" : "",
					'" hidefocus="true" title="\u4e0a\u4e00\u9875" href="javascript:void(0);"></a></div>\t\t<div class="tab-container"><ul class="tabs">'], d = ['<div id="body"><div class="inner">'], e = 0;
			$.each(this.tabs, function(i) {
				this.css && a.push(this.css);
				e = parseInt(i / App.cfg.tbPageSize);
				c
						.push(G
								.j('<li id="tab-$name$" class="tab page-$page$ $hideOrShow$"><a class="bg$active$" hidefocus="true" title="$title$" index="$index$" tid="$tid$" href="#cnt-$name$" pinned="$pinned$">$name$</a></li>')
								.replace({
									index : i,
									name : this.name,
									active : b.current == i ? " active" : "",
									tid : this.tid,
									title : this.title,
									page : e,
									hideOrShow : e == b.currentPage
											? "show"
											: "hide",
									pinned : this.tid == b.pinning ? 1 : 0
								}));
				d.push(['<div class="cnt" id="cnt-', this.name, '" index="', i,
						'" tid="', this.tid, '" pinned="',
						this.tid == b.pinning ? 1 : 0, '"></div>'].join(""))
			});
			c
					.push(
							'</ul></div>\t\t<div class="pager next"><a class="bg pager next',
							this.currentPage == this.pageCount - 1
									? " disabled"
									: "",
							'" hidefocus="true" title="\u4e0b\u4e00\u9875" href="javascript:void(0);"></a></div>\t</div></div>');
			d.push('</div><div id="adminPage"></div></div>');
			var h = G.getWindowState();
			if (h.v == "expand") {
				var g = true, f = 0;
				if (G.cookie("ytip"))
					f = parseInt(G.cookie("ytip"));
				if (f > 3)
					g = false;
				if (g) {
					d
							.push('<div id="restore"><div class="left bg"></div><div class="right bg"></div><span>\u70b9\u51fb\u7fa4\u6210\u5458\u6062\u590d\u6210\u5458\u5217\u8868</span><a id="closeYTip" href="javascript:void(0);" class="close bg"></a></div>');
					G.setCookie("ytip", f + 1, {
								path : "/",
								expires : 1E3
							})
				}
			}
			G.writeCss(G.j(a).replace({
				bg : "url(" + mp.cfg.imgUri + mp.bgFile.n + "?v=" + mp.bgFile.c
						+ ")"
			}));
			this.clear();
			$("body").prepend(G.j(c).toString());
			$("#head").after(G.j(d).toString());
			h.v == "expand" && g && $("#closeYTip").click(function() {
						$("#restore").remove();
						G.setCookie("ytip", 4, {
									path : "/",
									expires : 1E3
								})
					})
		};
		Tabs.prototype.setPin = function(b) {
			typeof this.dp.map[b] != "undefined" && G.setCookie("pinned", b, {
						path : "/",
						expires : 1E3
					})
		};
		Tabs.prototype.clearPin = function() {
			G.setCookie("pinned", null, {
						path : "/"
					})
		};
		Tabs.prototype.initAds = function() {
			var b = [];
			if (D.ph && D.ph.length) {
				for (var a = null, c = null, d = 0; d < D.ph.length; d++)
					try {
						c = D.ph[d];
						if (!(c.t != "upn" && c.t != "ci" && c.t != "up"))
							if (a)
								if (a.t == c.t && a.d[0].u == c.d[0].u
										&& a.d[0].g == c.d[0].g
										&& a.d[0].ad == c.d[0].ad)
									a.d.push(c.d[0]);
								else {
									b.push(a);
									a = null
								}
							else
								a = c
					} catch (e) {
					}
				a != null && b.push(a)
			}
			if (typeof D.ns != "undefined" && D.ns.length > 0) {
				c = ["upn", "cpn", "cb", "rb", "ca", "ja", "ba", "ma", "su",
						"ct", "cu", "ci", "cw", "rw"];
				for (d = 0; d < D.ns.length; d++)
					$.inArray(D.ns[d].t, c) >= 0 && b.push(D.ns[d])
			}
			b.sort(function() {
						return Math.round(Math.random() * 2) - 1
					});
			a = c = null;
			var h = 0, g = [];
			for (d = 0; d < b.length; d++) {
				c = b[d];
				a = c.d[0];
				var f = {
					t : c.t,
					qqn : G.filter(a.qqn),
					txt : "",
					rev : "#",
					tt : null
				};
				switch (c.t) {
					case "upn" :
						f.txt = G.filter([a.qqn, "\u4e0a\u4f20\u4e86",
								c.d.length, "\u5f20\u56fe\u7247"].join(""));
						f.tt = G.filter([a.qqn, " \u4e0a\u4f20\u4e86",
								c.d.length, "\u5f20\u56fe\u7247"].join(""));
						f.rev = "impress/list/alid/" + a.ad;
						break;
					case "ci" :
						f.txt = G.filter([a.qqn, "\u53d1\u8868\u4e86",
								c.d.length, "\u5f20\u804a\u5929\u5927\u56fe"]
								.join(""));
						f.tt = G.filter([a.qqn, " \u53d1\u8868\u4e86",
								c.d.length, "\u5f20\u804a\u5929\u5927\u56fe"]
								.join(""));
						f.rev = "impress/list/alid/" + a.ad;
						break;
					case "cpn" :
						f.txt = G.filter([a.qqn, ": ", a.c].join(""));
						f.tt = G.filter([a.qqn,
								" \u8bc4\u8bba\u4e86\u56fe\u7247 ", a.c]
								.join(""));
						f.rev = ["impress/show/alid/", a.ad, "/pd/", a.pd]
								.join("");
						break;
					case "cb" :
						f.txt = G.filter([a.qqn, ": ", a.t].join(""));
						f.tt = G.filter([
								a.qqn,
								a.tf && a.tf > 0
										? " \u8f6c\u8f7d\u4e86\u5e16\u5b50 "
										: " \u53d1\u8868\u4e86\u5e16\u5b50 ",
								a.t].join(""));
						f.rev = ["bbs/view/cd/", a.cid, "/td/", a.tid].join("");
						break;
					case "rb" :
						f.txt = G.filter([a.qqn, ": ", a.c].join(""));
						f.tt = G.filter([a.qqn,
								" \u56de\u590d\u4e86\u5e16\u5b50 ", a.c]
								.join(""));
						f.rev = ["impress/show/alid/", a.cid, "/pd/", a.tid]
								.join("");
						break;
					case "ca" :
						f.txt = G.filter([a.qqn, ": ", a.na].join(""));
						f.tt = G.filter([a.qqn,
								" \u521b\u5efa\u4e86\u6d3b\u52a8 ", a.na]
								.join(""));
						f.rev = ["activity/show/a/", a.a].join("");
						break;
					case "ja" :
						f.txt = G.filter([a.qqn, "\u53c2\u52a0\u4e86", a.na]
								.join(""));
						f.tt = G.filter([a.qqn, " \u53c2\u52a0\u4e86 ", a.na]
								.join(""));
						f.rev = ["activity/show/a/", a.a].join("");
						break;
					case "ma" :
						f.txt = G.filter([a.qqn, ": ", a.na].join(""));
						f.tt = G.filter([a.qqn,
								" \u4fee\u6539\u4e86\u6d3b\u52a8 ", a.na]
								.join(""));
						f.rev = ["activity/show/a/", a.a].join("");
						break;
					case "ba" :
						f.txt = G.filter([a.qqn, ": ", a.c].join(""));
						f.tt = G.filter([a.qqn,
								" \u56de\u590d\u4e86\u6d3b\u52a8 ", a.c]
								.join(""));
						f.rev = ["activity/show/a/", a.a].join("");
						break;
					case "su" :
						f.txt = G.filter([a.qqn,
								"\u5171\u4eab\u4e861\u4e2a\u6587\u4ef6"]
								.join(""));
						f.tt = G.filter([a.qqn,
								" \u5171\u4eab\u4e86\u6587\u4ef6 ", a.lf]
								.join(""));
						f.rev = "share/download/"
								+ a.pa.replace(/\//g, "!").replace(/#/g, "@");
						break;
					case "ct" :
						c = "";
						for (var i = 0; i < a.msg.length; i++)
							c += G.filter(a.msg[i].v);
						f.txt = G.filter([a.qqn, ": ", c].join(""));
						f.tt = G
								.filter([a.qqn,
										" \u5206\u4eab\u4e86\u6587\u6458 ", c]
										.join(""));
						f.rev = "chatlog/index/st/"
								+ G.strftime(a.ct, "$YYYY$$mm$$dd$")
								+ "/type/1";
						break;
					case "cu" :
						c = "";
						for (i = 0; i < a.msg.length; i++)
							c += G.filter(a.msg[i].v);
						f.txt = G.filter([a.qqn, ": ", c].join(""));
						f.tt = G
								.filter([a.qqn,
										" \u5206\u4eab\u4e86\u94fe\u63a5 ", c]
										.join(""));
						f.rev = "chatlog/index/st/"
								+ G.strftime(a.ct, "$YYYY$$mm$$dd$")
								+ "/type/2";
						break;
					case "cw" :
						f.txt = G.filter([a.qqn, ": ", a.t].join(""));
						f.tt = G.filter([a.qqn,
								" \u63d0\u51fa\u4e86\u95ee\u9898 ", a.t]
								.join(""));
						f.rev = ["bbs/vieww/cd/", a.cid, "/td/", a.tid]
								.join("");
						break;
					case "rw" :
						f.txt = G.filter([a.qqn, ": ", a.c].join(""));
						f.tt = G.filter([a.qqn,
								" \u56de\u7b54\u4e86\u95ee\u9898 ", a.c]
								.join(""));
						f.rev = ["bbs/vieww/cd/", a.cid, "/td/", a.tid]
								.join("");
						break;
					default :
						break
				}
				if (!f.tt)
					f.tt = f.txt;
				g
						.push(
								'<div class="item ',
								h % 2 == 0 ? "odd" : "even",
								" ",
								f.t,
								'" title="',
								f.tt,
								'"><div class="icon bg"></div><div class="txt" style=""><a rel="forward" rev="',
								f.rev, '" href="javascript:void(0);">', f.txt,
								"</a></div></div>");
				h++;
				console.log("ver ver: " + mp.dp.qqVer);
				if (h >= (mp.dp.qqVer == "09" ? 2 : 3))
					break
			}
			D.adHTML = g.join("")
		};
		Tabs.prototype.renderChild = function() {
			var b = this;
			$.each(this.tabs, function(a) {
						this.p = $("#cnt-" + this.name);
						console.log("run tab index: " + a);
						this.run(b.state);
						typeof this.resize == "function"
								&& this.resize(b.state)
					})
		};
		Tabs.prototype.resize = function(b) {
			var a = G.getWindowState();
			a.hht = 21;
			a.cht = a.ht - a.hht;
			this.dp._maskShow && this.dp._maskWin.css({
						width : a.wt,
						height : a.ht
					});
			if (this.state.v != a.v) {
				this.state.v == "normal" && a.v == "expand" && G.rPlus("b1");
				this.state.v == "expand" && a.v == "normal" && G.rPlus("b2")
			}
			if (this.dp._adminPageOpened)
				$("#adminPage div.table-container").css("height",
						a.v == "expand" ? "auto" : "93px");
			this.state = a;
			a.h == "wide" ? this.dp.headInner.css({
						"margin-left" : 5,
						"float" : "none"
					}) : this.dp.headInner.css({
						"margin-left" : 0,
						"float" : "left"
					});
			this.dp._adminPageOpened
					&& this.dp.adminPage.width(a.wt).height(a.cht);
			this.dp._leaveConfirmShow
					&& this.dp._leaveConfirm.css("width", a.wt - 10);
			this.dp.body.width(a.wt).height(a.cht);
			this.dp.inner.width(this.tabs.length * a.wt).css("left",
					-a.wt * this.current + "px");
			this.dp.cnts.width(a.wt).height(a.cht);
			a.v == "normal" && $("#restore a.close").click();
			b && $.each(this.tabs, function() {
						try {
							typeof this.resize == "function" && this.resize(a)
						} catch (c) {
						}
					})
		};
		Tabs.prototype.scroll = function(b) {
			var a = this;
			if (this.dp._adminChanged !== "saving") {
				if (this.dp._adminChanged !== "before saving")
					if (this.dp._adminChanged) {
						if (typeof this.dp._leaveConfirm == "undefined") {
							$("#hidden")
									.prepend('<div class="maskInfo" id="leaveConfirm"><p>\u4f60\u7684\u8bbe\u7f6e\u672a\u4fdd\u5b58\uff0c\u79bb\u5f00\u4f1a\u4f7f\u8bbe\u7f6e\u4e22\u5931\uff0c\u786e\u5b9a\u79bb\u5f00\u5417\uff1f</p><p style="text-align:right;"><a class="ok" href="javascript:void(0);">\u786e\u5b9a</a>&nbsp;<a class="cancel" href="javascript:void(0);">\u53d6\u6d88</a></p></div>');
							_leaveConfirm = $("#leaveConfirm");
							this.dp._leaveConfirm = _leaveConfirm.hide();
							this.dp._leaveConfirmShow = false
						}
						this.dp._leaveConfirm.find("a.ok").unbind("click")
								.click(function() {
											a.closeMask();
											a.dp._leaveConfirm.hide();
											a.dp._adminChanged = false;
											a.scroll(b);
											this.dp._leaveConfirmShow = false
										});
						this.dp._leaveConfirm.find("a.cancel").unbind("click")
								.click(function() {
											a.closeMask();
											a.dp._leaveConfirm.hide()
										});
						this.openMask();
						this.dp._leaveConfirm.css("width",
								G.getWindowState().wt - 10).show();
						this.dp._leaveConfirmShow = true;
						return
					} else
						this.closeAdmin();
				$("textarea").blur();
				try {
					b = parseInt(b)
				} catch (c) {
					return
				}
				parseInt(b / App.cfg.tbPageSize) != this.currentPage
						&& this.turnPage(parseInt(b / App.cfg.tbPageSize));
				if (window.scrollBackSwitches
						&& window.scrollBackSwitches.length)
					for (var d = 0; d < window.scrollBackSwitches.length; d++)
						clearTimeout(window.scrollBackSwitches[d]);
				if (!(isNaN(b) || !this.dp._init)) {
					this.clearUpdate(this.dp.tabLink.eq(b).attr("tid"));
					this.dp.inner.animate({
								left : -b * $(window).width() + "px"
							}, App.cfg.scrItv);
					this.dp.tabLink.removeClass("active");
					this.dp.tabLink.eq(b).addClass("active");
					this.current = b
				}
			}
		};
		Tabs.prototype.scrollByTabId = function(b) {
			typeof this.dp.map[b] != "undefined" && this.scroll(this.dp.map[b])
		};
		Tabs.prototype.addSwitch = function(b) {
			if (b && b.length && b.length >= 5) {
				var a = this, c = b[2], d = false;
				if (c > 1E9 || b[1] == 3) {
					c -= D.ts;
					d = true
				} else if (b[1] == 2)
					d = true;
				else if (G.cookie("s" + b[0])) {
					var e = G.cookie("s" + b[0]), h = G.get0h0m0s(D.ts);
					if (parseInt(e) < h)
						d = true
				} else
					d = true;
				if (c > 0 && d) {
					b[5] = setTimeout(function() {
						b[1] == 1 && G.setCookie("s" + b[0], D.ts, {
									path : "/",
									expires : 1
								});
						clearTimeout(b[5]);
						var g = a.current;
						if (typeof a.dp.map[b[3]] != "undefined"
								&& g != a.dp.map[b[3]]) {
							App.tabs.scroll(a.dp.map[b[3]]);
							a.dp.tabLink.unbind("mousemove");
							a.dp.cnts.unbind("mousemove");
							for (var f = 0; f < a.switches.length; f++)
								clearTimeout(a.switches[f][6]);
							if (b[4] > 0) {
								var i = $("ul.tabs li a[tid=" + b[3] + "]"), j = $("div.cnt[tid="
										+ b[3] + "]");
								f = function() {
									clearTimeout(b[6]);
									b[6] = setTimeout(k, b[4] * 1E3);
									window.tabSwitches.push(b[6]);
									window.scrollBackSwitches.push(b[6])
								};
								var k = function() {
									i.unbind("mousemove");
									j.unbind("mousemove");
									App.tabs.scroll(g)
								};
								i.bind("mousemove", f);
								j.bind("mousemove", f);
								f()
							}
						}
					}, c * 1E3);
					this.switches.push(b);
					window.tabSwitches.push(b[5])
				}
			}
		};
		Tabs.prototype.openMask = function() {
			if (!this.dp._maskInited) {
				$("#hidden").prepend('<div class="maskWin"></div>');
				this.dp._maskWin = $("body").find("div.maskWin").css("opacity",
						0.5).hide();
				this.dp._maskInited = true;
				this.dp._maskShow = false
			}
			var b = G.getWindowState();
			this.dp._maskWin.css({
						width : b.wt,
						height : b.ht
					}).show();
			this.dp._maskShow = true
		};
		Tabs.prototype.closeMask = function() {
			typeof this.dp._maskWin != "undefined" && this.dp._maskWin.hide();
			this.dp._maskShow = false
		};
		Tabs.prototype.openScrollConfirm = function() {
		};
		Tabs.prototype.openAdmin = function() {
			if (!this.dp._adminPageInited) {
				var b = [], a = this;
				b
						.push('\t\t\t\t\t<div class="panel">\t\t\t\t\t\t<table class="header" border="0" cellpadding="0" cellspacing="1">\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t<th style="width:73px;">\u9875\u5361</th><th>\u8bbe\u4e3a\u9ed8\u8ba4</th><th>\u66f4\u65b0\u63d0\u9192</th><th style="width:10px;"></th>\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t<tr class="line">\t\t\t\t\t\t\t\t<td colspan="4"><div class="bg pointline"></div></td>\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t</table>\t\t\t\t\t\t<div class="table-container">\t\t\t\t\t\t<table border="0" cellpadding="0" cellspacing="1">');
				$.each(this.tabs, function() {
					b
							.push(
									'\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t<td style="width:23px;"><span class="icon bg ',
									this.name,
									'"></span></td>\t\t\t\t\t\t\t<td style="width:53px;text-align:left;">',
									this.title,
									'</td>\t\t\t\t\t\t\t<td><input type="radio" name="dfttab" hidefocus="true" value="',
									this.tid,
									'" /></td>\t\t\t\t\t\t\t<td><input type="checkbox" name="remind" checked="checked" hidefocus="true" value="',
									this.tid, '" /></td>\t\t\t\t\t\t</tr>')
				});
				b
						.push('</table></div>\t\t\t\t\t<div class="ctr">\t\t\t\t\t\t<a href="javascript:void(0);" class="button bg" id="adminCancel">\u53d6\u6d88</a>\t\t\t\t\t\t<a href="javascript:void(0);" class="button bg" id="adminOK">\u4fdd\u5b58</a>\t\t\t\t\t</div>\t\t\t\t</div>');
				b
						.push('<div class="mask"></div><div class="info">\u4e2a\u4eba\u8bbe\u7f6e\u6210\u529f\uff0c\u5728\u672c\u673a\u6709\u6548\u3002<a class="bg close" href="javascript:void(0);"></a></div>');
				this.dp.adminPage.html(b.join("")).find("div.mask").css({
							opacity : 0.5
						});
				this.isAdmin
						&& this.dp.adminPage
								.find("div.ctr")
								.append('<a href="javascript:void(0);" rel="forward" rev="admin/setfeed" class="widebutton button bg" id="adminMore">\u66f4\u591a\u8bbe\u7f6e</a>');
				this.dp.adminPage.find("input").click(function() {
							a.dp._adminChanged = true
						});
				this.dp.adminPage.find("div.info a.close").click(function() {
							a.dp.adminPage.find("div.info").hide();
							a.dp.adminPage.find("div.mask").hide();
							a.closeAdmin()
						});
				$("#adminCancel").click(function() {
							a.closeAdmin()
						});
				$("#adminOK").click(function() {
					a.dp._adminChanged = "before saving";
					var h = 0;
					if (a.isAdmin) {
						if (a.tb.s > 0)
							h = a.tb.s
					} else
						h = G.gData("a", 0);
					var g = $("input:checked[name=dfttab]").val();
					if (typeof g == "undefined")
						g = 0;
					console.log("from dft: " + h);
					console.log("setDft: " + g);
					a.scrollByTabId(g);
					a.dp._adminChanged = "saving";
					if (g != h) {
						if (a.isAdmin) {
							G.setGData("a", null);
							h = G
									.j(["http://qun.qq.com/air/$gid$/group/setopt?_=$rnd$&w=a&df=$df$&ck=$ck$&g=$gid$&u=$uin$&c=abc"])
									.replace({
												gid : mp.dp.gid,
												rnd : Math.random(),
												df : g,
												ck : mp.dp.clientKey,
												uin : mp.dp.clientUin
											});
							a.tb.s = g;
							console.log("url: " + h);
							var img = new Image;
							img.src = h;
							G.rPlus("c2")
						} else {
							G.setGData("a", g);
							G.rPlus("c1")
						}
						G.rPlus("d" + g);
						App.tabs.scrollByTabId(g)
					}
					var f = [];
					$("input[name=remind]").each(function() {
						if (!$(this).attr("checked")) {
							f.push($(this).val());
							$("ul.tabs a[tid=" + $(this).val() + "]")
									.removeClass("upd")
						}
					});
					console.log("ccUpd: " + f.join(","));
					f.length > 0 ? G.setGData("b", f.join(",")) : G.setGData(
							"b", null);
					g = G.getWindowState();
					a.isAdmin
							? a.dp.adminPage
									.find("div.info")
									.html('\u4fdd\u5b58\u6210\u529f\uff0c\u5bf9\u672c\u7fa4\u6240\u6709\u6210\u5458\u6709\u6548\u3002<a class="bg close" href="javascript:void(0);"></a>')
									.css({
												width : g.wt - 10
											}).show()
							: a.dp.adminPage.find("div.info").css({
										width : g.wt - 10
									}).show();
					a.dp.adminPage.find("div.mask").css({
								width : g.wt + "px",
								height : g.ht + "px"
							}).show();
					setTimeout(function() {
								a.dp.adminPage.find("div.info").hide();
								a.dp.adminPage.find("div.mask").hide();
								a.closeAdmin();
								a.dp._adminChanged = false
							}, 3E3)
				});
				this.dp._adminPageInited = true
			}
			this.dp._adminChanged = false;
			var c = 0;
			if (this.isAdmin) {
				if (this.tb.s > 0) {
					c = this.tb.s;
					console.log("dft from server:" + c)
				}
			} else {
				c = G.gData("a", 0);
				console.log("dft from cookie:" + c)
			}
			$("input[name=dfttab]").each(function() {
				$(this).val() == c
						? $(this).attr("checked", "checked")
						: $(this).attr("checked", null)
			});
			G.gData("b", "");
			var d = G.gData("b", "").split(",");
			console.log("cancel update: " + d.join(","));
			$("input[name=remind]").each(function() {
				$.inArray($(this).val(), d) >= 0 ? $(this).attr("checked",
						false) : $(this).attr("checked", true)
			});
			var e = G.getWindowState();
			this.dp.adminPage.css({
						width : e.wt,
						height : e.ht - 21
					}).show();
			e = G.getWindowState();
			$("#adminPage div.table-container").css("height",
					e.v == "expand" ? "auto" : "93px");
			this.dp._adminPageOpened = true;
			$("#setBtn").addClass("hover")
		};
		Tabs.prototype.closeAdmin = function() {
			$("#setBtn").removeClass("hover");
			$("#adminPage").hide();
			this.dp._adminPageOpened = false;
			this.dp._adminChanged = false
		};
		Tabs.prototype.bind = function() {
			var b = this, a;
			this.dp.tabLink.mouseover(function() {
						var c = $(this).attr("index");
						a = setTimeout(function() {
									clearTimeout(a);
									b.scroll(c)
								}, App.cfg.hovItv)
					}).mouseout(function() {
						clearTimeout(a)
					}).click(function(c) {
						var d = $(this).attr("tid");
						G.report(App.cfg.rptUri + d + "&_=" + G.r());
						c.preventDefault();
						return false
					});
			$("#setBtn").click(function() {
						b.dp._adminPageOpened ? b.closeAdmin() : b.openAdmin()
					});
			$("#head a.next").click(function() {
						b.turnPage("next")
					});
			$("#head a.prev").click(function() {
						b.turnPage("prev")
					});
			$(window).resize(function() {
						b.resize(true)
					});
			D.fl.sw && D.fl.sw.length && D.fl.sw.length > 0
					&& $.each(D.fl.sw, function() {
								b.addSwitch(this)
							})
		};
		Tabs.prototype.update = function() {
			console
					.log("\u5f00\u59cb\u68c0\u67e5\u5404\u4e2atab\u662f\u5426\u6709\u66f4\u65b0");
			var b = false, a = G.get0h0m0s(D.ts), c = this;
			if (a != G.cookie("today")) {
				console.log("\u4eca\u5929\u7b2c\u4e00\u6b21\u6253\u5f00");
				G.setCookie("today", a, {
							path : "/",
							expires : 1
						});
				b = true
			}
			console
					.log("\u4eca\u5929\u51cc\u6668\u7684\u65f6\u95f4\u6233\uff1a"
							+ a
							+ " \u5f3a\u5236\u66f4\u65b0\uff08\u6e05\u9664\u672c\u5730\u53d8\u91cf\u6807\u8bb0\uff09\uff1f "
							+ b);
			var d = G.gData("b", "").split(","), e = 0;
			e = [];
			for (var h = 0; h < this.tabs.length; h++) {
				var g = this.tabs[h];
				c = this;
				console.log("----\u68c0\u67e5tab" + g.tid + "----");
				if ($.inArray(g.tid.toString(), d) >= 0)
					console
							.log("\u914d\u7f6e\u4e2d\u5df2\u7ecf\u5ffd\u7565\u4e86\u6b64tab\u7684\u66f4\u65b0"
									+ g.tid);
				else if (typeof T[g.tid].getUpdate != "function")
					console
							.log("\u4e0d\u80fd\u5f97\u5230\u6b64tab\u7684\u66f4\u65b0\u65f6\u95f4\uff0c\u5ffd\u7565");
				else {
					c = T[g.tid].getUpdate();
					console.log("\u66f4\u65b0\u65f6\u95f4\u4e3a: " + c + "("
							+ (c - a) + ")");
					if (c <= 0)
						console
								.log("\u66f4\u65b0\u65f6\u95f4\u6709\u8bef(<=0)");
					else {
						var f = parseInt(G.gData("c" + g.tid, 0));
						if (b) {
							f = 0;
							G.setGData("c" + g.tid, 0)
						}
						if (f == 1)
							console
									.log("\u4eca\u5929\u5df2\u7ecf\u67e5\u770b\u8fc7\u4e86\uff01");
						else {
							console
									.log("\u4eca\u5929\u8fd8\u672a\u67e5\u770b\u8fc7\u66f4\u65b0");
							if (G.get0h0m0s(c) == a)
								if ($("#tab-" + g.name + " a.bg")
										.hasClass("active"))
									console
											.log("\u5f53\u524d\u9875\u5361\uff0c\u5ffd\u7565");
								else {
									console
											.log("\u4ece\u4eca\u5929\u51cc\u6668\u5230\u73b0\u5728\u6709\u8fc7\u66f4\u65b0\uff0c\u4e14\u4e0d\u662f\u5f53\u524dtab\uff0c \u90a3\u4e48\u8fdb\u5165\u66f4\u65b0\u5217\u8868");
									e.push({
												tid : g.tid,
												ts : c,
												tn : g.name
											})
								}
							else
								console
										.log("\u4ece\u4eca\u5929\u51cc\u6668\u5230\u73b0\u5728\u8fd8\u6ca1\u66f4\u65b0\u8fc7!")
						}
					}
				}
			}
			e.sort(function(i, j) {
						return i.ts - j.ts
					});
			for (h = 0; h < e.length; h++) {
				if (h > 2)
					break;
				console.log(e[h].tn + " updated: " + e[h].ts);
				$("#tab-" + e[h].tn + " a.bg").addClass("upd");
				G.rPlus("e" + e[h].tid)
			}
		};
		Tabs.prototype.clearUpdate = function(b, a) {
			var c = $("ul.tabs a[tid=" + b + "]");
			if (c.hasClass("upd")) {
				console
						.log("\u4f60\u521a\u624d\u67e5\u770b\u4e86\u66f4\u65b0tab"
								+ b);
				G.setGData("c" + b, 1);
				c.removeClass("upd");
				a || G.rPlus("f" + b)
			}
		};
		Tabs.prototype.run = function() {
			try {
				this.init();
				console.log("init");
				this.render();
				console.log("render");
				if (!this.dp._init) {
					$.extend(this.dp, {
								head : $("ul.tabs"),
								headInner : $("#head div.head-inner"),
								body : $("#body"),
								inner : $("#body div.inner"),
								cnts : $("#body div.inner div.cnt"),
								tabLink : $("ul.tabs li.tab a"),
								adminPage : $("#adminPage")
							});
					this.dp._init = true
				}
				this.initAds();
				console.log("init ads");
				this.resize(false);
				console.log("resize");
				this.renderChild();
				console.log("renderchild");
				this.bind();
				console.log("bind");
				console.log("====Cookie\u5185\u5bb9====");
				console.log(document.cookie);
				console.log("========");
				this.update();
				console.log("update");
				this.turnPage("current")
			} catch (b) {
			}
			var a = 10;
			if (typeof D.fl.rp != "undefined")
				try {
					a = parseInt(D.fl.rp)
				} catch (c) {
				}
			if (parseInt(Math.random() * 100) < a) {
				a = new Image;
				src = [
						"http://mini.group.qq.com/cgi/svr/miniclick/click?clicktype=12&_=",
						G.r(),
						"&v=",
						this.state.v == "expand" ? 2 : this.state.v == "normal"
								? 1
								: 0];
				BM && BM.START && src.push("&t=", G.d() - BM.START);
				a.src = src.join("")
			}
			$(window).unload(function() {
				if (G._canRpt()) {
					var d = new Image, e = [
							"http://mini.group.qq.com/cgi/svr/miniclick/click?clicktype=11&_=",
							G.r()], h = false;
					for (var g in G._rData)
						if (G._rData[g]) {
							e.push("&", g, "=", G._rData[g]);
							h = true
						}
					if (h)
						d.src = e.join("")
				}
			});
			console.log("run finished");
			D.fl.ad && this.addSwitch([10, 2, 30, 5, 15])
		}
	},
	ext : function() {
		$.extend(G, {
					getWindowState : function() {
						var b = $(window).width(), a = $(window).height(), c = b > 210
								? "wide"
								: "normal", d = null;
						d = !d && a > 280 ? "expand" : a < 170
								? "normal"
								: "zero";
						return {
							h : c,
							v : d,
							wt : b,
							ht : a
						}
					},
					filter : function(b) {
						return b.replace(/"/g, "&quot;")
								.replace(/'/g, "&#x27;")
					},
					resizeImg : function(b, a, c) {
						var d, e, h, g, f;
						if (b)
							if (b.sw && b.sh) {
								d = b.sw;
								e = b.sh
							} else {
								d = b.width;
								e = b.height;
								b.sw = d;
								b.sh = e
							}
						else
							return false;
						if (d > a) {
							h = a;
							g = parseInt(e * a / d);
							d = h;
							e = g;
							f = parseInt((c - g) / 2)
						}
						if (e > c) {
							g = c;
							d = h = parseInt(d * c / e);
							e = g;
							f = 0
						}
						if (d <= a && e <= c) {
							h = d;
							g = e;
							f = parseInt((c - g) / 2)
						}
						b.width = h;
						b.height = g;
						return {
							w : h,
							h : g,
							mt : f
						}
					},
					enlageImg : function(b, a, c) {
						var d, e, h, g;
						if (b)
							if (b.sw && b.sh) {
								d = b.sw;
								e = b.sh
							} else {
								d = b.width;
								e = b.height;
								b.sw = d;
								b.sh = e
							}
						else
							return false;
						if (a / d * e >= c) {
							h = a;
							g = parseInt(a / d * e);
							c = -parseInt((g - c) / 2);
							a = 0
						} else {
							g = c;
							h = parseInt(c / e * d);
							c = 0;
							a = -parseInt((h - a) / 2)
						}
						b.width = h;
						b.height = g;
						return {
							w : h,
							h : g,
							mt : c,
							ml : a
						}
					},
					centerImg : function(b, a, c) {
						var d, e;
						if (b)
							if (b.sw && b.sh) {
								d = b.sw;
								e = b.sh
							} else {
								d = b.width;
								e = b.height;
								b.sw = d;
								b.sh = e
							}
						else
							return false;
						return {
							w : d,
							h : e,
							mt : parseInt((c - e) / 2),
							ml : parseInt((a - d) / 2)
						}
					},
					time : function(b, a) {
						b = a - b;
						if (b < 60)
							return "\u521a\u521a";
						if (b < 3600)
							return [Math.round(b / 60), "\u5206\u949f\u524d"]
									.join("");
						if (b < 86400)
							return [Math.round(b / 3600), "\u5c0f\u65f6\u524d"]
									.join("");
						if (b < 2592E3)
							return [Math.round(b / 86400), "\u5929\u524d"]
									.join("");
						if (b < 31104E3)
							return [Math.round(b / 2592E3), "\u4e2a\u6708"]
									.join("");
						if (b < 15552E4)
							return [Math.round(b / 31104E3), "\u5e74\u524d"]
									.join("");
						return "\u5f88\u4e45\u4ee5\u524d"
					},
					strftime : function(b, a) {
						var c = function(e) {
							return e < 10 ? ["0", e].join("") : e
						};
						b = b ? new Date(b * 1E3) : new Date;
						var d = function(e) {
							return e > 60 && e < 1900 ? e + 1900 : e
						}(b.getYear());
						return this.j(a).replace({
									YYYY : d,
									mm : c(b.getMonth() + 1),
									dd : c(b.getDate())
								})
					},
					get0h0m0s : function(b) {
						var a = new Date;
						a.setTime(parseInt(b * 1E3));
						a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
						return parseInt(a.getTime() / 1E3)
					},
					_tplCfg : {
						filter_data : false
					},
					tpl : function(b, a, c) {
						return $.processTemplateToText($.createTemplate(b,
										null, G._tplCfg), a || {}, c || {})
					},
					_gData : null,
					_loadGData : function(b, a) {
						if (!G._gData) {
							var c = {};
							if (G.cookie("gData" + b)) {
								var d = null;
								if (b = G.cookie("gData" + b)
										.match(new RegExp(a
												+ "\\(([^\\)]*?)\\)")))
									d = b[1];
								if (d) {
									d = d.split("_");
									$.each(d, function() {
												var e = this.split("-");
												if (e.length == 2)
													c[e[0]] = e[1]
											})
								}
							}
							G._gData = c
						}
					},
					gData : function(b, a) {
						var c = null;
						if (typeof a != "undefined")
							c = a;
						if (typeof mp.dp.gid == "undefined")
							return c;
						if (typeof mp.dp.clientUin == "undefind")
							return c;
						G._loadGData(mp.dp.clientUin, mp.dp.gid);
						if (typeof G._gData[b] != "undefined") {
							if (G._gData[b] === null)
								return c;
							return G._gData[b]
						}
						return c
					},
					setGData : function(b, a) {
						var c = mp.dp.gid, d = mp.dp.clientUin;
						G._loadGData(d, c);
						G._gData[b] = a;
						b = [];
						for (var e in G._gData)
							G._gData[e] != null
									&& b.push([e, G._gData[e]].join("-"));
						b = b.join("_");
						e = G.cookie("gData" + d);
						a = new RegExp(c + "\\(([^\\)]*?)\\)");
						e || (e = "");
						if (e.match(a))
							e = e.replace(a, [c, "(", b, ")"].join(""));
						else
							e += [c, "(", b, ")"].join("");
						G.setCookie("gData" + d, e, {
									expires : 2E3,
									path : "/"
								})
					},
					_rData : {},
					_canRptVal : null,
					_canRpt : function() {
						if (typeof G._canRptVal == "boolean")
							return G._canRptVal;
						var b = 10;
						if (typeof D.fl.rp != "undefined")
							b = parseInt(D.fl.rp);
						G._canRptVal = Math.random() * 100 < b;
						return G._canRptVal
					},
					rSet : function(b, a) {
						if (G._canRpt())
							G._rData[b] = a
					},
					rPlus : function(b) {
						if (G._canRpt())
							if (typeof G._rData[b] == "number")
								G._rData[b]++;
							else
								G._rData[b] = 1
					},
					getAd : function(b, a) {
						if (D.adHTML) {
							b
									|| (b = '<div class="rndNews"><div class="newsInner">');
							a || (a = "</div></div>");
							return b + D.adHTML + a
						}
						return false
					}
				})
	},
	forward : function() {
		var b = G
				.j([
						'<form id="link" action="$forward$" method="get" target="_blank">',
						'<input type="hidden" name="ptlang" value="$ptlang$" />',
						'<input type="hidden" name="clientuin" value="$clientuin$" />',
						'<input type="hidden" name="clientkey" value="" />',
						'<input type="hidden" name="gid" value="$gid$" />',
						'<input type="hidden" name="type" value="102" />',
						'<input type="hidden" name="uri" value="" />',
						'<input type="hidden" name="dummy" value="1" />',
						"</form>"]);
		$("body").append(b.replace({
					ptlang : mp.dp.ptLang,
					clientuin : mp.dp.clientUin,
					gid : mp.dp.gid,
					forward : App.cfg.fwdUri
				}));
		$("*[rel=forward]").live("click", function(a) {
			a.stopPropagation();
			a = $(this).attr("ver");
			if (typeof a == "undefined")
				a = "09";
			a.length == 0
					? $("#link input[name=uri]").val($(this).attr("rev"))
					: $("#link input[name=uri]").val([$(this).attr("rev"),
							"/[", a, "]/"].join(""));
			$("#link input[name=clientkey]").val(G.cookie("clientkey"));
			$("#link").submit();
			return false
		});
		$("*[rel=external]").live("click", function(a) {
					a.stopPropagation();
					window.open($(this).attr("href"));
					return a.returnValue = false
				})
	},
	_allRunOver : 0,
	_runOver : 0,
	runOver : function(b) {
		App._runOver |= b;
		console.log("current jv is: " + b + " runOver is: " + App._runOver);
		App._runOver == App._allRunOver && App.runAgain()
	},
	runAgain : function() {
		console.log("run again");
		try {
			document.execCommand("BackgroundImageCache", false, true)
		} catch (b) {
		}
		for (var a = D.tb.c, c = new Tabs, d = 0; d < a.length; d++)
			if (typeof T[a[d]] != "undefined"
					&& typeof T[a[d]].run == "function") {
				T[a[d]].tid = a[d];
				c.tabs.push(T[a[d]])
			} else
				return;
		App.tabs = c;
		c.run()
	},
	run : function() {
		console.log("application is running");
		App.ext();
		App.tabs();
		App.forward();
		for (var b = 0; b < mp.jsFiles.length; b++) {
			var a = 1 << b;
			mp.jsFiles[b].jv = a;
			App._allRunOver += a
		}
		console.log("app allRunOver " + App._allRunOver);
		for (b = 0; b < mp.jsFiles.length; b++) {
			a = mp.jsFiles[b];
			typeof F[a.n] == "function" ? F[a.n](a.jv) : App.runOver(a.jv)
		}
	}
};
G.scriptLoaded("m.js");
