T[3] = {
	name : "ns",
	title : "\u7fa4\u52a8\u6001",
	getUpdate : function() {
		return T[3].updateTime
	},
	updateTime : 0,
	cfg : {
		postUri : G
				.j("http://qun.qq.com/air/$gid$/group/twitteradd?_=$rnd$&w=a&c=?")
	},
	css : "#cnt-ns{position:relative;}#cnt-ns div.hd{height:68px;}#cnt-ns div.bd{overflow-y:auto;}#cnt-ns div.bd div.ft{height:15px;text-align:right;line-height:17px;padding-right:2px;}#cnt-ns div.bd p.none{margin-top:25px;text-align:center;}#c{display:block;border: solid 1px #A0B4D2;height:36px;font-size:12px;line-height:18px;width:184px;padding:0 2px;margin:3px 0 -1px 3px;overflow-y:auto;font-family:tahoma, sans-serif;}#cnt-ns div.swap{position:absolute;left:0;top:41px;height:50px;overflow:hidden;padding:0;margin:0;}#cnt-ns h3.tt{font-size:12px; font-weight:normal;height:23px;margin:0 3px 2px 3px;line-height:27px;}#cnt-ns div.act{border:solid 1px #A0B4D2;background:#DFEEFB;margin:0 3px 2px 3px;text-align:right;height:23px;}#cnt-ns div.act p.ln{height:23px;clear:both;}#cnt-ns div.act p.ln1 a.actLnk{display:block;float:left;width:22px;height:14px;background-position:-67px -109px;margin:6px 0 0 1px;}#cnt-ns div.act p.ln1 a.actLnk:hover{text-decoration:none;}#cnt-ns div.act p.ln1 span.alert{float:left;margin:2px 0 0 2px;padding:2px 2px 1px 2px;border:solid 1px #99CC00;background:#CCFF99;color:#999900;}#cnt-ns div.act p.ln1 a.act{color:#3B342E;display:block;float:right;background-position:-15px -106px;width:49px;height:19px;margin:2px 1px 0 0;text-align:center;line-height:19px;outline:none;text-decoration:none;}#cnt-ns div.act p.ln1 a.enable:hover{background-position:-15px -125px;}#cnt-ns div.act p.ln1 a.enable:active{background-position:-15px -144px;}#cnt-ns div.act p.ln1 a.unable{color:#797C73;}#cnt-ns div.act p.ln2 input.inputLnk{border:solid 1px #A0B4D2;padding:2px; height:12px; line-height:12px;margin:1px 0 0 2px;width:160px;}#cnt-ns div.act p.ln2 a.cls{float:right;width:9px;height:9px;background-position:-2px -130px;margin:7px 4px 0 0;}#cnt-ns ul.n li{cursor:pointer;background-color:#FFFFFF;overflow:hidden;padding:0;}#cnt-ns ul.n li div.time{position:absolute;right:0;top:0;width:50px;height;}#cnt-ns ul.n li p{margin:0;height:19px;padding:0 3px 0 3px;line-height:19px;width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}#cnt-ns ul.n li p.pointline{padding:0;height:1px;overflow:hidden;background-position:0 0px;background-repeat:repeat-x;}#cnt-ns ul.n li p.txt{height:20px;}#cnt-ns ul.n li p.img{height:42px;padding:2px 0;}#cnt-ns ul.n li p.lnk{height:20px;}#cnt-ns ul.n li.upn,#cnt-ns ul.n li.ci,#cnt-ns ul.n li.up{*margin-bottom:-2px;}#cnt-ns ul.n li.upn div.bt,#cnt-ns ul.n li.ci div.bt,#cnt-ns ul.n li.up div.bt{}#cnt-ns ul.n li.hover{background-color:#DEEEFB;}#cnt-ns ul.n li p.tp .fr{margin-right:8px;}#cnt-ns ul.n li p.tp span.icon{display:block;float:left;width:15px;height:15px;background-position:-129px -128px;}#cnt-ns ul.n li p.imgBt{height:3px;overflow:hidden;line-height:3px;font-size:0;}#cnt-ns ul.n li a.img{display:block;float:left;overflow:hidden;width:51px;height:38px;padding:1px;border:solid 1px #A0B3D1;margin:0 2px 0 0;text-align:center;background:#FFFFFF;}#cnt-ns ul.n li p.hd{height:6px;width:20px;background-position:10px -164px;background-repeat:no-repeat;}#cnt-ns ul.n li p.bd{background-color:#EDEDED;color:#747A7A;margin-left:3px;margin-bottom:2px;}#cnt-ns ul.n li p.ft span{color:#747A7A;}\t",
	run : function() {
		if (typeof D.ns == "undefined")
			D.ns = [];
		var k = "\u6765\u8bf4\u4e24\u53e5\u5427:)";
		if (typeof D.fl.yz == "string" && D.fl.yz.length > 0)
			k = D.fl.yz;
		var x = T[3];
		k = '<div class="hd"><textarea id="c" class="soft" name="c" rows="2" cols="15">'
				+ k
				+ '</textarea><h3 class="tt">\u65b0\u9c9c\u4e8b</h3><div class="pointline bg"></div></div>      <div class="swap hide"><div class="act"><p class="ln ln1"><a class="actLnk bg" href="javascript:void(0);">&nbsp;</a><span class="alert hide">\u8f93\u5165\u4e0d\u7b26\u5408\u89c4\u8303</span><a class="act bg enable" href="#?g=$gid$" hidefocus="true">\u53d1\u8868</a></p><p class="ln ln2"><a class="cls bg" href="javascript:void(0);">&nbsp;</a><input class="inputLnk" type="text" name="inputLnk" value="" size="300" /></p></div></div>';
		var C = [];
		if (typeof D.ph != "undefined") {
			for (var i = null, b = null, q = 0; q < D.ph.length; q++)
				try {
					b = D.ph[q];
					if (!(b.t != "upn" && b.t != "ci" && b.t != "up"))
						if (i)
							if (i.t == b.t && i.d[0].u == b.d[0].u
									&& i.d[0].g == b.d[0].g
									&& i.d[0].ad == b.d[0].ad)
								i.d.push(b.d[0]);
							else {
								D.ns.push(i);
								i = null
							}
						else
							i = b
				} catch (Y) {
				}
			i != null && D.ns.push(i)
		}
		D.ns.sort(function(e, j) {
					return j.d[0].ct - e.d[0].ct
				});
		var h = G
				.j('<p class="txt"><a href="javascript:void(0);" rel="forward" rev="$rev$" title="$tt$">$t$</a></p>'), y = G
				.j('<a class="img" href="javascript:void(0);" rel="forward" rev="$rev$" title="$t$"><img nav="$url$" alt="$t$" /></a>'), z = G
				.j('<p class="img">$list$</p>');
		_lnkTpl = G
				.j('<p class="lnk"><a rel="external" rev="$url$" href="$url$" target="_blank">$t$</a></p>');
		_rpyHdTpl = G
				.j('<p class="rpy hd bg $hide$"><input type="hidden" name="rpCnt" value="$v$" /></p>');
		_rpyBdTpl = G.j('<p class="rpy bd"><span>$qqn$:</span>$t$</p>');
		_rpyFtTpl = G
				.j('<p class="rpy ft"><span>\u5171<span class="count">$count$</span>\u6761\u56de\u590d</span> <a href="javascript:void(0);" rel="forward" rev="group/home">\u67e5\u770b\u66f4\u591a</a></p>');
		d = dd = null;
		hfix = $.browser.msie && parseInt($.browser.version) <= 6 ? 11 : 0;
		for (q = 0; q < D.ns.length; q++)
			try {
				dd = D.ns[q];
				d = dd.d[0];
				var a = {
					qqn : G.filter(d.qqn),
					time : G.time(d.ct, D.ts),
					ty : dd.t,
					rev : "",
					tt : "",
					c : ""
				};
				if ($.inArray(dd.t, ["si", "ct", "cu"]) < 0)
					if (d.ct > x.updateTime)
						x.updateTime = d.ct;
				switch (dd.t) {
					case "up" :
						a.c = [];
						for (var c = 0; c < dd.d.length; c++) {
							if (c >= 3)
								break;
							a.c.push(y.replace({
								rev : G.j("album/show/alid/$ad$/pid/$fd$")
										.replace({
													ad : dd.d[c].ad,
													fd : dd.d[c].fd
												}),
								url : G
										.j("http://imgqun.qq.com/cgi-bin/img?path=$gid$_$ad$_$fd$_1")
										.replace({
													gid : mp.dp.gid,
													ad : dd.d[c].ad,
													fd : dd.d[c].fd
												}),
								t : G.filter(dd.d[c].t)
							}))
						}
						a.c = z.replace({
									list : a.c.join("")
								});
						a.tt = "\u4e0a\u4f20\u4e86" + dd.d.length
								+ "\u5f20\u7167\u7247";
						a.rev = "album/list/alid/" + d.ad;
						break;
					case "upn" :
						a.c = [];
						for (c = 0; c < dd.d.length; c++) {
							if (c >= 3)
								break;
							a.c.push(y.replace({
										rev : "impress/show/alid/" + dd.d[c].ad
												+ "/pd/" + dd.d[c].pd,
										url : dd.d[c].surl,
										t : G.filter(dd.d[c].t)
									}))
						}
						a.c = z.replace({
									list : a.c.join("")
								});
						a.tt = "\u4e0a\u4f20\u4e86" + dd.d.length
								+ "\u5f20\u7167\u7247";
						a.rev = "impress/list/alid/" + d.ad;
						break;
					case "ci" :
						a.c = [];
						for (c = 0; c < dd.d.length; c++) {
							if (c >= 3)
								break;
							a.c.push(y.replace({
										rev : "impress/show/alid/" + dd.d[c].ad
												+ "/pd/" + dd.d[c].pd,
										url : dd.d[c].surl,
										t : G.filter(dd.d[c].t)
									}))
						}
						a.c = z.replace({
									list : a.c.join("")
								});
						a.tt = "\u53d1\u8868\u4e86" + dd.d.length
								+ "\u5f20\u804a\u5929\u5927\u56fe";
						a.rev = "impress/list/alid/" + d.ad;
						break;
					case "rb" :
						a.rev = G.j("bbs/view/cd/$cid$/td/$tid$").replace({
									cid : d.cid,
									tid : d.tid
								});
						a.tt = "\u56de\u590d\u4e86\u5e16\u5b50 "
								+ G.filter(d.c);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.c)
								});
						break;
					case "rw" :
						a.rev = G.j("bbs/vieww/cd/$cid$/td/$tid$").replace({
									cid : d.cid,
									tid : d.tid
								});
						a.tt = "\u56de\u7b54\u4e86\u95ee\u9898 "
								+ G.filter(d.c);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.c)
								});
						break;
					case "cp" :
						a.rev = G.j("album/show/alid/$ad$/pid/$pd$").replace({
									ad : d.ad,
									pd : d.pd
								});
						a.tt = "\u8bc4\u8bba\u4e86\u7167\u7247 "
								+ G.filter(d.c);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.c)
								});
						break;
					case "cpn" :
						a.rev = G.j("impress/show/alid/$ad$/pd/$pd$").replace({
									ad : d.ad,
									pd : d.pd
								});
						a.tt = "\u8bc4\u8bba\u4e86\u7167\u7247 "
								+ G.filter(d.c);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.c)
								});
						break;
					case "im" :
						continue;
					case "si" :
						a.rev = "group/home";
						a.tt = "\u4fee\u6539\u4e86\u7b7e\u540d "
								+ G.filter(d.s);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.s)
								});
						break;
					case "ct" :
						b = "";
						for (c = 0; c < d.msg.length; c++)
							b += G.filter(d.msg[c].v);
						a.tt = "\u53d1\u8868\u4e86\u804a\u5929\u7cbe\u534e "
								+ b;
						a.rev = "chatlog/index/st/"
								+ G.strftime(d.ct, "$YYYY$$mm$$dd$")
								+ "/type/1";
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : b
								});
						break;
					case "cu" :
						b = "";
						for (c = 0; c < d.msg.length; c++)
							b += G.filter(d.msg[c].v);
						a.tt = "\u53d1\u8868\u4e86\u94fe\u63a5 " + b;
						a.rev = "chatlog/index/st/"
								+ G.strftime(d.ct, "$YYYY$$mm$$dd$")
								+ "/type/2";
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : b
								});
						break;
					case "cb" :
						a.rev = G.j("bbs/view/cd/$cid$/td/$tid$").replace({
									cid : d.cid,
									tid : d.tid
								});
						a.tt = "\u53d1\u8868\u4e86\u5e16\u5b50 "
								+ G.filter(d.t);
						if (d.tf && d.tf > 0)
							a.tt = "\u8f6c\u8f7d\u4e86\u5e16\u5b50 "
									+ G.filter(d.t);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.t)
								});
						break;
					case "cw" :
						a.rev = G.j("bbs/vieww/cd/$cid$/td/$tid$").replace({
									cid : d.cid,
									tid : d.tid
								});
						a.tt = "\u63d0\u51fa\u4e86\u95ee\u9898 "
								+ G.filter(d.t);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.t)
								});
						break;
					case "su" :
						a.rev = "share/download/"
								+ d.pa.replace(/\//g, "!").replace(/#/g, "@");
						a.tt = "\u4e0a\u4f20\u4e86\u5171\u4eab\u6587\u4ef6 "
								+ G.filter(d.lf);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.lf)
								});
						break;
					case "sd" :
						a.rev = "share/download/"
								+ d.pa.replace("///g", "!")
										.replace("/#/g", "@");
						a.tt = "\u4e0b\u8f7d\u4e86\u5171\u4eab\u6587\u4ef6 "
								+ G.filter(d.lf);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.lf)
								});
						continue;
					case "ba" :
						a.rev = "activity/show/a/" + d.a;
						a.tt = "\u56de\u590d\u4e86\u6d3b\u52a8 "
								+ G.filter(d.c);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.c)
								});
						break;
					case "ja" :
					case "ca" :
					case "ma" :
						a.rev = "activity/show/a/" + d.a;
						if (dd.t == "ja")
							a.tt = "\u52a0\u5165\u4e86\u6d3b\u52a8 "
									+ G.filter(d.na);
						else if (dd.t == "ca")
							a.tt = "\u521b\u5efa\u4e86\u6d3b\u52a8 "
									+ G.filter(d.na);
						else if (dd.t == "ma")
							a.tt = "\u4fee\u6539\u4e86\u6d3b\u52a8 "
									+ G.filter(d.na);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.na)
								});
						break;
					case "vc" :
						a.rev = "vote/show/vid/" + d.vid;
						a.tt = "\u521b\u5efa\u4e86\u6295\u7968 "
								+ G.filter(d.t);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.t)
								});
						break;
					case "vj" :
						a.rev = "vote/act/vid/" + d.vid;
						a.tt = "\u53c2\u4e0e\u4e86\u6295\u7968 "
								+ G.filter(d.t);
						a.c = h.replace({
									rev : a.rev,
									tt : a.tt,
									t : G.filter(d.t)
								});
						break;
					case "tk" :
						a.rev = "group/home";
						var n = "";
						i = "";
						if (d.t && d.t.length > 0)
							n += G.filter(d.t);
						var K = "", L = "";
						if (d.surl && d.surl.length > 0) {
							var R = y.replace({
										rev : G
												.j("album/show/alid/$ad$/pid/$pd$")
												.replace({
															ad : d.aid,
															pd : d.pid
														}),
										url : d.surl,
										t : ""
									});
							K = z.replace({
										list : R
									});
							n += "[\u56fe\u7247]"
						}
						if (d.link && d.link.length > 0) {
							L = _lnkTpl.replace({
										url : G.filter(d.link),
										t : G.filter(d.link)
									});
							n += G.filter(d.link)
						}
						a.tt = "\u53d1\u8868\u4e86\u5520\u53e8 " + n;
						if (d.t && d.t.length > 0)
							i = h.replace({
										rev : a.rev,
										tt : a.tt,
										t : G.filter(d.t)
									});
						n = "";
						if (d.cm && d.cm.length > 0) {
							d.cm.sort(function(e, j) {
										return j.rt - e.rt
									});
							n = [	_rpyHdTpl.replace({
												hide : "",
												v : d.cm.length
											}), _rpyBdTpl.replace(d.cm[0]),
									d.cm.length > 1 ? _rpyFtTpl.replace({
												count : d.cc
											}) : ""].join("")
						} else
							n = _rpyHdTpl.replace({
										hide : "hide",
										v : 0
									});
						a.c = [
								i,
								K,
								L,
								'<input type="hidden" name="tid" value="'
										+ d.id + '"/>', n].join("");
						break;
					default :
						continue
				}
				C
						.push(G
								.j('<li rel="forward" rev="$rev$" title="$tt$" class="$ty$"><p class="bg pointline"></p><p class="tp"><span class="icon bg">&nbsp;</span><span class="name fl">$qqn$</span><span class="time soft fr">$time$</span><a href="javascript:void(0);" class="reply hide fr">\u56de\u590d</a></p>$c$</li>')
								.replace(a));
				if (C.length >= 15)
					break
			} catch (Z) {
			}
		a = window.location.href.match(/\?g=(\d+)/);
		x.p
				.empty()
				.html(G
						.j([
								k,
								'<div class="bd"><ul class="n">$list$</ul><div class="ft"><div class="bg pointline"></div><a rel="forward" rev="group/home" href="javascript:void(0);">\u66f4\u591a<span style="font-family:\u5b8b\u4f53;">&gt;&gt;</span></a></div><p class="none hide soft">\u6682\u65e0\u65b0\u9c9c\u4e8b</p></div>'])
						.replace({
									posturi : x.cfg.postUri,
									list : C.join(""),
									gid : a.length >= 1 ? a[1] : mp.dp.gid
								}));
		if (C.length <= 0) {
			$("#cnt-ns div.ft").hide();
			$("#cnt-ns p.none").show()
		}
		$("#cnt-ns ul.n li").each(function(e) {
					e == 0 && $(this).find("p.pointline").removeClass("bg");
					$(this).height($(this).height() - hfix)
				});
		$("#cnt-ns img[nav]").load(function() {
					var e = G.resizeImg(this, 51, 38);
					e && e.mt && $(this).css("marginTop", e.mt + "px")
				}).error(function() {
					$(this).attr("src", "error.gif")
				});
		$("#cnt-ns img[nav]").each(function() {
					$(this).attr("src", $(this).attr("nav"))
				});
		var l = null, M = function(e) {
			e.bind("mouseenter", function() {
						l = $(this);
						l.addClass("hover");
						if (l.hasClass("tk")) {
							l.find("span.time").hide();
							l.find("a.reply").show()
						}
					}).bind("mouseleave", function() {
						l = $(this);
						l.removeClass("hover");
						if (l.hasClass("tk")) {
							l.find("span.time").show();
							l.find("a.reply").hide()
						}
					});
			if (e.hasClass("tk")) {
				var j = e.find("input[name=tid]").val(), f = e
						.find("span.name").text();
				e.find("a.reply").click(function(g) {
							g.stopPropagation();
							s = j;
							t = f;
							b.focus();
							b.val("@" + t + ":");
							m = "replying";
							u.hide();
							r = false
						})
			}
			return e
		};
		$("#cnt-ns ul.n li").each(function() {
					M($(this))
				});
		var s = null, t = null, r = false, v = null, E = true, N = null, m = "none";
		b = $("textarea[name=c]");
		var O = $("div.swap"), I = $("div.act");
		k = $("a.act");
		var P = $("span.alert"), u = $("a.actLnk"), o = $("input.inputLnk"), S = /^(http|ftp|https):\/\//i, U = /^(http|ftp|https):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^\"\"])*$/i, A = function() {
			b.addClass("soft");
			b.val("\u6765\u8bf4\u4e24\u53e5\u5427:)");
			O.hide();
			m = "none";
			t = s = null;
			o.val("");
			I.height(23);
			r = false;
			E = true;
			u.show()
		}, J = function() {
			V()
		}, V = function() {
			var e = {
				t : b.val(),
				ck : mp.dp.clientKey,
				g : mp.dp.gid,
				u : mp.dp.clientUin
			};
			if (s)
				e.pid = s;
			if (m == "writing") {
				var j = G.mlen(b.val(), 1);
				if (r) {
					j = G.trim(o.val());
					S.test(j) || (j = "http://" + j);
					if (!U.test(j)) {
						w("url\u683c\u5f0f\u4e0d\u6b63\u786e");
						u.focus();
						return false
					}
					e.lnk = j
				} else if (!(j > 0 && j <= 140)) {
					w("\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
					return false
				}
			}
			if (m == "replying")
				if (G.trim(b.val()) == "@" + t + ":" || G.mlen(b.val(), 1) <= 0) {
					w("\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
					return
				} else if (s && t)
					e.pid = s;
				else
					return;
			$.getJSON(x.cfg.postUri.replace({
								gid : mp.dp.gid,
								rnd : G.r()
							}), e, function(f) {
						if (E) {
							E = false;
							if (f.c == 0) {
								if (f.d.ty == "c") {
									var g = {};
									g.rev = "group/home";
									var p = g.tt = "", H = "", B = "";
									if (f.d.t && f.d.t.length > 0) {
										g.tt = G.filter(f.d.t);
										p = h.replace({
													rev : g.rev,
													tt : g.tt,
													t : g.tt
												})
									}
									if (f.d.surl && f.d.surl.length > 0) {
										H = y.replace({
													rev : "group/home",
													url : f.d.surl,
													t : ""
												});
										H = z.replace({
													list : H
												})
									}
									if (f.d.link && f.d.link.length > 0)
										B = _lnkTpl.replace({
													url : G.filter(f.d.link),
													t : G.filter(f.d.link)
												});
									var W = '<input type="hidden" name="tid" value="'
											+ f.d.id + '"/>', X = _rpyHdTpl
											.replace({
														hide : "hide",
														v : 0
													});
									g.c = [p, H, B, W, X].join("");
									$.extend(g, {
												ty : "tk",
												qqn : f.d.qqn,
												time : G.time(f.d.ct, D.ts)
											});
									$("#cnt-ns div.bd ul.n li:first-child p.pointline")
											.addClass("bg");
									g = $(G
											.j('<li rel="forward" rev="$rev$" title="$tt$" class="$ty$"><p class="bg pointline"></p><p class="tp"><span class="icon bg">&nbsp;</span><span class="name fl">$qqn$</span><span class="time soft fr">$time$</span><a href="javascript:void(0);" class="reply hide fr">\u56de\u590d</a></p>$c$</li>')
											.replace(g));
									$("#cnt-ns div.bd ul.n").prepend(M(g));
									g.height(g.height() - hfix)
											.find("p.pointline")
											.removeClass("bg");
									$("#cnt-ns div.bd").scrollTop(0);
									$("#cnt-ns div.ft").show();
									$("#cnt-ns p.none").hide()
								} else if (f.d.ty == "r") {
									g = $("input[value=" + f.d.id + "]")
											.parent("li");
									B = g.find("p.hd input[name=rpCnt]");
									g.css("height", "auto");
									p = parseInt(B.val());
									p++;
									B.val(p);
									g.find("p.hd").removeClass("hide");
									g.find("p.bd").length > 0
											? g.find("p.bd").html(["<span>",
													f.d.qqn, ":</span>", f.d.t]
													.join(""))
											: g.append(""
													+ _rpyBdTpl.replace(f.d));
									f = g.find("p.ft span.count");
									if (f.length > 0)
										f.text(p);
									else
										p >= 2 && g.append(_rpyFtTpl.replace({
													count : p
												}));
									g.height(g.height() - hfix)
								}
								A()
							} else {
								switch (f.c) {
									case 10 :
									case 20 :
										w("\u9a8c\u8bc1\u4e0d\u901a\u8fc7");
										break;
									case 30 :
										w("\u5185\u5bb9\u4e0d\u7b26\u5408\u89c4\u8303");
										break;
									case 50 :
										w("\u7f51\u7edc\u7e41\u5fd9\uff0c\u7a0d\u5019\u518d\u8bd5");
										break
								}
								E = true
							}
						}
					}, "jsonp")
		}, w = function(e) {
			u.hide();
			P.text(e).show();
			clearTimeout(N);
			N = setTimeout(function() {
						P.hide();
						u.show()
					}, 1500)
		}, Q = function() {
			clearTimeout(v);
			v = setTimeout(function() {
						if (m == "writing" && G.mlen(b.val(), 1) <= 0)
							if (r)
								G.mlen(o.val()) <= 0 && A();
							else
								A();
						if (m == "replying"
								&& (G.trim(b.val()) == "@" + t + ":" || G.mlen(
										b.val(), 1) <= 0))
							if (r)
								G.mlen(o.val()) <= 0 && A();
							else
								A()
					}, 500)
		};
		$("a.cls").click(function() {
					o.val("");
					I.height(23);
					b.focus();
					r = false
				});
		u.click(function() {
					clearTimeout(v);
					o.val("");
					I.height(44);
					o.focus();
					r = true
				});
		o.focus(function() {
					clearTimeout(v)
				}).blur(function() {
					Q()
				}).keydown(function(e) {
					e.ctrlKey && e.keyCode == 13 && J()
				});
		b.focus(function() {
					clearTimeout(v);
					if (m == "none") {
						b.removeClass("soft");
						b.val("");
						O.show();
						m = "writing"
					}
				}).blur(function() {
					Q()
				}).keyup(function() {
			m == "writing" && G.mlen(b.val(), 1) > 140
					&& b.val(G.msub(b.val(), 140, 1));
			m == "replying" && G.mlen(b.val(), 1) > 140
					&& b.val(G.msub(b.val(), 140, 1))
		}).keydown(function(e) {
					e.ctrlKey && e.keyCode == 13 && J()
				});
		k.click(function() {
					clearTimeout(v);
					J()
				});
		typeof useFont != "undefined" && useFont
				&& $("textarea[name=c]").css("font-family", fontText)
	},
	resize : function(k) {
		$("#c").width(k.wt - 12);
		$("#cnt-ns div.bd").height(k.cht - 68).width(k.wt);
		$("#cnt-ns ul.n li p.bd").width(k.wt - 28)
	}
};
F["t3.js"] = function(k) {
	App.runOver(k)
};
G.scriptLoaded("t3.js");
