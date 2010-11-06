T[1] = {
	name : "ann",
	title : "\u7fa4\u516c\u544a",
	getUpdate : function() {
		return T[1].updateTime
	},
	css : "body{font-family: tahoma, sans-serif;}div.ot{padding:0;}div.in{padding:3px;word-wrap: break-word;word-break: normal;}#cnt-ann div.ot{overflow-y:auto;}div.ft{height:21px;}div.ft div.pointline{clear:both;}div.ft a.fl, div.ft a.fr{display:block;line-height:14px;}div.ft a.fl{margin: 4px 0 0 2px; padding-left: 18px;background-position:-127px -110px;background-repeat:no-repeat;}div.ft a.fr{margin: 4px 2px 0 0;}#notifyOt{padding:5px;background-color:#FFFFFF;}#notify{background-color:#CDE8FD;}#notify .lt,#notify .rt,#notify .lb,#notify .rb{width:3px;height:3px;}#notify .lt{float:left;background-position:-66px -126px;}#notify .rt{float:right;background-position:-69px -126px;}#notify .wd{clear:both;}#notify .wd p{color:#817366;padding:0 5px;line-height:17px;}#notify .wd a#antCls{float:right;width:9px;height:9px;background-position:-2px -130px;text-indent:-100px;overflow:hidden;margin:0 3px 0 0;}#notify .nft{height:3px;overflow:hidden;clear:both;}#notify .nft .lb{float:left;background-position:-66px -129px}#notify .nft .rb{float:right;background-position:-69px -129px;}#notify .pointer{height:6px;overflow:hidden;background-color:#FFFFFF;}#notify .pointer span.bg{display:block;float:left;margin-left:15px;background-position:-66px -133px;width:13px;height:6px;}div.newsOuter{width:100%;}table.rndNews{width:196px;}table.rndNews td.icon{padding:0 3px 0 3px;background:gray;width:18px;}table.rndNews td.icon span{display:block;width:15px;height:15px;margin:0;}table.rndNews td.icon span.ca{background-position:-96px -44px;width:17px;}table.rndNews td.txt{background:blue;padding:2px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}table.rndNews td.txt a{}\t",
	tpl : '<div class="ot">\t<div class="in{#if !$P.hasAn} soft{#/if}">{$T.an}</div></div><div class="ft">\t<div class="bg pointline"></div>\t{#if $P.isAdmin}<a class="bg fl" rel="forward" rev="bbs/post/type/mod/res/new" href="javascript:void(0);">\u88c5\u9970\u516c\u544a</a>{#/if}\t<a class="fr" rel="forward" rev="bbs/lista" href="javascript:void(0);">\u67e5\u770b\u5386\u53f2\u516c\u544a<span style="font-family:\u5b8b\u4f53;">&gt;&gt;</span></a></div>\t',
	ntpl : '<div id="notifyOt"><div id="notify">\t<div class="lt bg"></div> <div class="rt bg"></div>\t<div class="wd"><a id="antCls" class="bg" href="javascript:void(0);">close</a>\t\t<p>\u65b0\u7248\u7fa4\u516c\u544a\u4e0a\u7ebf\u5566</p><p>\u5b57\u4f53\u4e30\u5bcc\u591a\u5f69\uff0c\u8fd8\u80fd\u6dfb\u52a0\u8868\u60c5</p>\t</div>\t<div class="nft"><div class="lb bg"></div><div class="rb bg"></div></div>\t{#if $P.isAdmin}<div class="pointer"><span class="bg"></span></div>{#/if}</div></div>\t',
	updateTime : 0,
	run : function(s) {
		var self = T[1], p = self.p;
		var d = {
			an : gm
		}, a = {
			hasAn : true,
			isAdmin : false
		};
		if (D.fl && typeof D.fl.ad != "undefined" && D.fl.ad > 0)
			a.isAdmin = true;
		if (typeof D.an != "undefined" && typeof D.an.an != "undefined")
			d.an = D.an.an;
		if (!d.an || d.an.length <= 0) {
			a.hasAn = false;
			d.an = "\u6682\u65e0\u516c\u544a"
		}
		if (D.an && D.an.ct)
			self.updateTime = D.an.ct;
		var regex = /<img src=\"\/god\/images\/newface\/qbar_face(\d+).gif\"\s*\/?>/gi;
		d.an = d.an
				.replace(regex,
						'<img src="http://s.qun.qq.com/god/images/newface/qbar_face$1.gif" />');
		self.d = d;
		self.a = a;
		p.html(G.tpl(self.tpl, d, a));
		$("#cnt-ann div.in font").each(function(i) {
					if (parseInt($(this).attr("size")) > 0) {
						var s = parseInt($(this).attr("size")) * 5;
						s = s < 8 ? 8 : s;
						$(this).css({
									"font-size" : s + "px",
									"line-height" : s + 5 + "px"
								})
					}
				});
		if (!a.hasAn && !G.cookie("ant")) {
			var n = G.tpl(self.ntpl, d, a);
			$("#cnt-ann div.in").after(n);
			$("#antCls").click(function() {
						$("#notify").hide();
						G.setCookie("ant", 1, {
									path : "/",
									expires : 1
								})
					})
		}
		if (typeof useFont != "undefined" && useFont)
			$("div.ft a.fl").css("background-position", "-127px -109px")
	},
	resize : function(s) {
		var self = T[1];
		var rndNewsHeight = self.ad ? 69 : 0;
		$("#cnt-ann div.ot").height(s.cht - 19 - rndNewsHeight);
		if (!T[1].a.hasAn)
			if (T[1].a.isAdmin)
				$("#notifyOt").css("margin-top",
						s.cht - 98 - rndNewsHeight + "px");
			else
				$("#notifyOt").css("margin-top",
						parseInt(s.cht - 105 - rndNewsHeight) / 2 + "px")
	}
};
T[2] = {
	name : "photo",
	title : "\u7fa4\u76f8\u518c",
	cfg : {
		delUri : G
				.j("http://qun.qq.com/air/$gid$/group/imgdel?_=$rnd$&ck=$ck$&u=$u$&w=a&c=?")
	},
	getUpdate : function() {
		return T[2].updateTime
	},
	updateTime : 0,
	css : "#cnt-photo{background-color:#BDDDEE;position:relative;background-position:0 -171px;background-repeat:repeat-x;}#cnt-photo div.ot{overflow:hidden;}#cnt-photo div.ft{position:absolute;bottom:-6px;left:0;right:0;z-index:1000;text-align:center;}#cnt-photo div.mask{position:absolute;left:0;top:0;background-color:#000000;display:none;z-index:2000;}#cnt-photo div.top{position:absolute;background-color:#CDE6FC;left:0;top:0;display:none;padding:5px;z-index:3000;}#cnt-photo div.top p{line-height:18px;}#cnt-photo div.top p.text{padding-bottom:2px;text-align:left;}#cnt-photo div.top p.act{padding-top:2px;text-align:right;}#cnt-photo div.top p.act a{margin-left:3px;}#cnt-photo div.graytip{position:absolute;background-color:#FEFECC;top:0;left:0;padding:3px 5px;z-index:2500;color:#0066CC;}#cnt-photo div.graytip a.close{display:block;position:absolute;width:9px;height:9px;background-position:-2px -141px;right:13px;top:6px;}#cnt-photo div.graytip a.close:hover{background-position:-2px -130px;}#cnt-photo div.none p{text-align:center;line-height: 21px;}#cnt-photo div.in{padding: 0;text-align:center;overflow:hidden;}#cnt-photo div.ft{background:#FFFFFF;}#cnt-photo ul.p{width: 196px; margin:0 auto;padding:0;text-align:left;padding: 0 0 0 2px;overflow:hidden;height:235px;}#cnt-photo ul.p li{float:left;width:64px;height:47px;}#cnt-photo ul.p li a.img{display:block;cursor:pointer;width:64px;height:47px;position:relative;background-color:#FFFFFF;}#cnt-photo ul.p li a.img img{position:absolute;left:4px;top:2px;z-index:90;-ms-interpolation-mode: bicubic;}#cnt-photo ul.p li a.img p{background-position:-2px -447px;position:absolute;left:0;top:0;width:64px;height:47px;z-index:100;}#cnt-photo ul.p li a.img:hover p{background-position:-68px -447px;}#cnt-photo ul.p li a.img div.img{width:53px;height:40px;overflow:hidden;cursor:pointer;position:absolute;left:0;top:0;text-align:center;border:solid 1px #DEEDF5;}#cnt-photo ul.p li a.img div.del{display:none;background-position:-1px -141px;position:absolute;right:4px;top:2px;background-color:#C5D8E9;width:10px;height:10px;padding:0;margin:0;cursor:pointer;z-index:120;}#cnt-photo ul.p li a.img:hover div.del{display:block;}#cnt-photo ul.p li a.img div.del.hover{background-color:red;background-position:-2px -152px;width:9px;}#cnt-photo ul.p li.upload a.img{background-color:#E8F2FC;}#cnt-photo ul.p li.upload a.img img{left:7px;top:4px;}#cnt-photo ul.expand{padding: 3px 0 0 0;}#cnt-photo ul.expand li{float:left;width:92px;height:60px;margin:0 1px 3px 0;}#cnt-photo ul.expand li a.img{width:90px;height:58px;background:#DDDDDD;}#cnt-photo ul.expand li a.img div.img{width:88px;height:56px;}#rndNews{width:190px;height:69px;overflow:hidden;position:relative;clear:both;margin:0 auto;}#rndNews div.news{position:absolute;top:0;left:0;}#rndNews div.news div.item{clear:both;line-height:22px;height:22px;}#rndNews div.news div.icon{float:left;width:15px;height:15px;margin:3px 0 0 5px;}#rndNews div.upn div.icon,#rndNews div.ci div.icon,#rndNews div.cpn div.icon{background-position:-65px -44px;}#rndNews div.cb div.icon,#rndNews div.rb div.icon{background-position:-81px -45px;width:15px;}#rndNews div.ca div.icon,#rndNews div.ja div.icon,#rndNews div.ma div.icon,#rndNews div.ba div.icon{background-position:-96px -44px;width:17px;}#rndNews div.su div.icon{background-position:-113px -44px;width:16px;}#rndNews div.ct div.icon,#rndNews div.cu div.icon{background-position:-129px -44px;}#rndNews div.cw div.icon,#rndNews div.rw div.icon{background-position:-65px -140px;}#rndNews div.news div.txt{margin:0 0 0 5px;float:left;width:158px;height:23px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}#rndNews div.even{}#cnt-photo div.ft div.vote{width:185px;line-height:20px;padding:0 0 0 5px;margin:0 auto;}#cnt-photo div.vote span.title{display:block;float:left;line-height:23px;}#cnt-photo div.vote div a{display:block;float:left;margin:0 3px 0 3px;height:25px;}#cnt-photo div.vote div a span.icon{width:14px;height:15px;margin:3px 2px 0 3px;}#cnt-photo div.vote div a.egg span.icon{margin:4px 2px 0 3px;}#cnt-photo div.vote div.enable a,#cnt-photo div.vote div.enable a:hover{color:#9E9E9E;cursor:pointer;}#cnt-photo div.vote div.enable a.flower span.icon{background-position:-98px -138px;}#cnt-photo div.vote div.enable a.flower:hover span.icon{background-position:-98px -108px;}#cnt-photo div.vote div.enable a.egg span.icon{background-position:-112px -138px;}#cnt-photo div.vote div.enable a.egg:hover span.icon{background-position:-112px -108px;}#cnt-photo div.vote div.disable a,#cnt-photo div.vote div.disable a:hover{color:#9E9E9E;cursor:default;}#cnt-photo div.vote div.disable a.flower span.icon,#cnt-photo div.vote div.disable a.flower:hover span.icon{background-position:-98px -123px;}#cnt-photo div.vote div.disable a.egg span.icon,#cnt-photo div.vote div.disable a.egg:hover span.icon{background-position:-112px -123px;}#cnt-photo div.vote div a:hover{text-decoration:none;}#cnt-photo div.vote div a span{display:block;float:left;width:}#cnt-photo div.voteadd{position:absolute;width:100px;height:100px;top:0;left:0;z-index:2000;}#cnt-photo div.rndNews{border-top:solid 1px #FFFFFF;}#phCustom{height:27px;padding-top:16px;line-height:15px;text-align:right;border-bottom:solid 1px #8AB0DE;text-align:center;}#phCustom div{width:190px;text-align:right;margin:0 auto;padding-right:3px;}#phCustom div a{margin:0;padding:0;}\t",
	tpl : '<div class="ot"><div class="in">\t<ul class="p {$P.cls}">\t\t{$T}\t</ul></div></div><div class="ft">\t<div class="bg pointline"></div>\t<a class="bg fl" rel="forward" rev="impress/upload" href="javascript:void(0);">\u4e0a\u4f20\u7167\u7247</a>\t<a class="fr" rel="forward" rev="impress" href="javascript:void(0);">\u67e5\u770b\u66f4\u591a<span style="font-family:\u5b8b\u4f53;">&gt;&gt;</span></a></div><div class="mask"></div><div class="confirm top">\t<p class="text">\u6b64\u64cd\u4f5c\u540c\u65f6\u4f1a\u5220\u9664\u7fa4\u7a7a\u95f4\u7167\u7247\uff0c\u786e\u5b9a\u5220\u9664\uff1f</p>\t<p class="act"><a class="ok" href="javascript:void(0);">\u786e\u5b9a</a><a class="cancel" href="javascript:void(0);">\u53d6\u6d88</a></p></div><div class="info top hide">\t<p>\u5220\u9664\u5931\u8d25\uff01\u8bf7\u7a0d\u5019\u518d\u8bd5</p></div>\t',
	run : function(s) {
		if ($.browser.msie && parseInt($.browser.version) <= 6)
			$("#cnt-photo").addClass("ie6");
		var self = T[2], p = T[2].p;
		self.s = s;
		self.hasData = false;
		self.gray = true;
		if (D.fl.ht instanceof Array && D.fl.ht.length >= 2)
			self.hotImg = D.fl.ht;
		else
			self.hotImg = [0, 0];
		self.hasData = false;
		var _upli = '<li index="$index$">\t<a class="img" href="javascript:void(0);" rel="forward" rev="album/show/alid/$ad$/pid/$fd$" title="$t$">\t\t<div class="img"><img nav="http://imgqun.qq.com/cgi-bin/img?path=$gid$_$ad$_$fd$_1" alt="$t$" ty="$ty$" />$del$</div>\t</a></li>', _upnli = '<li index="$index$">\t<a class="img" href="javascript:void(0);" rel="forward" rev="impress/show/alid/$ad$/pd/$pd$" title="$t$" hidefocus="true">\t\t<p class="bg img"></p>$del$<img nav="$url$" alt="$t$" ty="$ty$" />\t</a></li>', _hotli = '<li index="$index$">\t<a class="img" href="javascript:void(0);" rel="forward" rev="impress/hotshow/i/1/id/$hotid$/lc/$hotlc$" title="$t$">\t\t<div class="img"><img nav="$url$" alt="$t$" ty="$ty$" />$del$</div>\t</a></li>', _lis = [];
		var isAdmin = false;
		if (D.fl && typeof D.fl.ad != "undefined" && D.fl.ad > 0)
			isAdmin = true;
		var count = 0;
		if (typeof D.ph != "undefined" && D.ph && D.ph.length > 0)
			for (var i = 0; i < D.ph.length; i++)
				try {
					var photo = D.ph[i];
					if (count < 15) {
						if (photo.d[0].ct && photo.d[0].ct > self.updateTime)
							self.updateTime = photo.d[0].ct;
						if (photo.t == "up") {
							_lis.push(G.j(_upli).replace({
								ty : photo.t,
								gid : mp.dp.gid,
								ad : photo.d[0].ad,
								fd : photo.d[0].fd,
								t : G.filter(photo.d[0].t),
								index : count,
								del : photo.d[0].u == mp.dp.clientUin
										|| isAdmin
										? '<div class="del bg" href="javascript:void(0);">&nbsp;</div>'
										: ""
							}));
							count++
						} else if (photo.t == "upn" || photo.t == "ci") {
							_lis.push(G.j(_upnli).replace({
								ty : photo.t,
								ad : photo.d[0].ad,
								pd : photo.d[0].pd,
								url : typeof photo.d[0].murl != "undefined"
										? photo.d[0].murl
										: photo.d[0].surl,
								t : G.filter(photo.d[0].t),
								index : count,
								del : photo.d[0].u == mp.dp.clientUin
										|| isAdmin
										? '<div class="del bg" href="javascript:void(0);">&nbsp;</div>'
										: ""
							}));
							count++
						} else if (photo.t == "hot") {
							_lis.push(G.j(_hotli).replace({
										ty : photo.t,
										index : count,
										url : photo.d[0].surl + "?_=" + G.r(),
										hotid : photo.d[0].id,
										hotlc : photo.d[0].lc,
										t : "",
										del : ""
									}));
							count++
						}
					}
				} catch (e) {
				}
		if (self.hotImg[0] > 0 && self.hotImg[1] > 0 && 0) {
			var _rhotli = G
					.j('\t\t\t\t<li index="$index$">\t\t\t\t\t<a class="img" href="javascript:void(0);" rel="forward" rev="impress/hotshow/i/1/id/$id$">\t\t\t\t\t\t<div class="img"><img nav="http://hp.qq.com/$pid$s.jpg" alt="" ty="hot" /></div>\t\t\t\t\t</a>\t\t\t\t</li>');
			var exists = [], limit = 15;
			for (i = 0; i < 100; i++) {
				if (count >= limit)
					break;
				var r = Math.floor(Math.random() * self.hotImg[1]);
				if ($.inArray(r, exists) >= 0)
					continue;
				exists.push(r);
				_lis.push(_rhotli.replace({
							index : count,
							id : r,
							pid : r + 1
						}));
				count++
			}
		}
		self.hasData = count > 0;
		self.imgLength = _lis.length;
		_lis
				.push('<li class="upload"><a hidefocus="true" class="img" href="javascript:void(0);" rel="forward" rev="impress/upload" ver="10" title="\u4e0a\u4f20\u7167\u7247"><p class="bg img"></p><img src="upload.png" alt="\u4e0a\u4f20\u7167\u7247" ty="upload" /></a></li>');
		var html = G.tpl(self.tpl, _lis.join(""), {
					cls : self.gray ? "normal" : s.v
				});
		p.empty().html(html);
		var tw = 56, th = 42;
		if (s.v == "expand" && !self.gray) {
			tw = 88;
			th = 56
		}
		$("#cnt-photo img[nav]").load(function() {
					var r = G.enlageImg(this, tw, th);
					if (r)
						$(this).css({
									top : r.mt + 2 + "px",
									left : r.ml + 4 + "px"
								});
					var interval = G.d() - $(this).data("start");
					if (Math.random() <= 0.1 && interval >= 1E3) {
						var ty = $(this).attr("ty");
						if (ty == "upn" || ty == "ci")
							G.report(App.cfg.rptUri + "97&_=" + interval);
						else if (ty == "hot")
							G.report(App.cfg.rptUri + "98&_=" + interval)
					}
					return false
				}).error(function() {
					$(this).addClass("err").unbind("load").load(function() {
								var r = G.centerImg(this, tw, th);
								if (r)
									$(this).css({
												marginTop : r.mt + "px"
											})
							}).attr("src", "error.gif");
					var interval = G.d() - $(this).data("start");
					if (Math.random() <= 0.1 && interval >= 1E3) {
						var ty = $(this).attr("ty");
						if (ty == "upn" || ty == "ci")
							G.report(App.cfg.rptUri + "97&_=" + interval);
						else if (ty == "hot")
							G.report(App.cfg.rptUri + "98&_=" + interval)
					}
					return false
				});
		$.each($("#cnt-photo img[nav]"), function() {
					$(this).data("start", G.d());
					$(this).attr("src", $(this).attr("nav"))
				});
		self.initMask();
		$("#cnt-photo div.del").mouseover(function() {
					$(this).addClass("hover")
				}).mouseout(function() {
					$(this).removeClass("hover")
				}).click(function(e) {
					var index = $(this).parents("li").attr("index");
					if (index && D.ph[index]) {
						self.delImg = D.ph[index];
						self.delImg.dom = $(this).parents("li");
						self.showMask();
						self.showConfirm()
					}
					e.stopPropagation();
					return false
				});
		if ($.browser.msie && parseInt($.browser.version) <= 6)
			$("#cnt-photo ul.p li a.img").bind("mouseenter", function() {
						$(this).find("div.del").css("display", "block")
					}).bind("mouseleave", function() {
						$(this).find("div.del").css("display", "none")
					});
		if (!self.hasData) {
			p
					.empty()
					.html('<div class="ot" style="background:white;">\t<div class="m none">\t\t<p class="soft">\t\t\t\u4f60\u7684\u7fa4\u76f8\u518c\u6700\u8fd1\u6ca1\u6709\u65b0\u7167\u7247<br/>\t\t\t<a href="javascript:void(0);" rel="forward" rev="impress/upload">\u7acb\u523b\u4e0a\u4f20</a>\t\t</p>\t<div></div>\t\t\t');
			$("#cnt-photo").css("background", "#FFFFFF");
			$("#cnt-photo div.ft").css("background", "#FFFFFF");
			return
		}
		if (self.gray) {
			if (!G.cookie("gray-tip") && s.v == "expand")
				$("#cnt-photo div.graytip").css("display", "block")
						.find("a.close").click(function() {
									$("#cnt-photo div.graytip").css("display",
											"none");
									G.setCookie("gray-tip", 1, {
												path : "/",
												expires : 1E3
											})
								});
			var adHTML = "";
			if (self.ad = G.getAd())
				adHTML = self.ad;
			else {
				var n = [];
				if (typeof D.ph != "undefined" && D.ph.length > 0) {
					var temp = null, c = null;
					for (var i = 0; i < D.ph.length; i++)
						try {
							c = D.ph[i];
							if (c.t != "upn" && c.t != "ci" && c.t != "up")
								continue;
							if (!temp) {
								temp = c;
								continue
							}
							if (temp.t == c.t && temp.d[0].u == c.d[0].u
									&& temp.d[0].g == c.d[0].g
									&& temp.d[0].ad == c.d[0].ad)
								temp.d.push(c.d[0]);
							else {
								n.push(temp);
								temp = null
							}
						} catch (e) {
						}
					if (temp != null)
						n.push(temp)
				}
				if (typeof D.ns != "undefined" && D.ns.length > 0) {
					var need = ["upn", "cpn", "cb", "rb", "ca", "ja", "ba",
							"ma", "su", "ct", "cu", "ci", "cw", "rw"];
					for (var i = 0; i < D.ns.length; i++)
						if ($.inArray(D.ns[i].t, need) >= 0)
							n.push(D.ns[i])
				}
				n.sort(function(a, b) {
							return Math.round(Math.random() * 2) - 1
						});
				var dd = null, d = null, count = 0, lis = [];
				for (var i = 0; i < n.length; i++) {
					dd = n[i];
					d = dd.d[0];
					var o = {
						t : dd.t,
						qqn : G.filter(d.qqn),
						txt : "",
						rev : "#",
						tt : null
					};
					switch (dd.t) {
						case "upn" :
							o.txt = G
									.filter([d.qqn, "\u4e0a\u4f20\u4e86",
											dd.d.length, "\u5f20\u56fe\u7247"]
											.join(""));
							o.tt = G
									.filter([d.qqn, " \u4e0a\u4f20\u4e86",
											dd.d.length, "\u5f20\u56fe\u7247"]
											.join(""));
							o.rev = "impress/list/alid/" + d.ad;
							break;
						case "ci" :
							o.txt = G.filter([d.qqn, "\u53d1\u8868\u4e86",
									dd.d.length,
									"\u5f20\u804a\u5929\u5927\u56fe"].join(""));
							o.tt = G.filter([d.qqn, " \u53d1\u8868\u4e86",
									dd.d.length,
									"\u5f20\u804a\u5929\u5927\u56fe"].join(""));
							o.rev = "impress/list/alid/" + d.ad;
							break;
						case "cpn" :
							o.txt = G.filter([d.qqn, ": ", d.c].join(""));
							o.tt = G.filter([d.qqn,
									" \u8bc4\u8bba\u4e86\u56fe\u7247 ", d.c]
									.join(""));
							o.rev = ["impress/show/alid/", d.ad, "/pd/", d.pd]
									.join("");
							break;
						case "cb" :
							o.txt = G.filter([d.qqn, ": ", d.t].join(""));
							o.tt = G
									.filter([
											d.qqn,
											d.tf && d.tf > 0
													? " \u8f6c\u8f7d\u4e86\u5e16\u5b50 "
													: " \u53d1\u8868\u4e86\u5e16\u5b50 ",
											d.t].join(""));
							o.rev = ["bbs/view/cd/", d.cid, "/td/", d.tid]
									.join("");
							break;
						case "rb" :
							o.txt = G.filter([d.qqn, ": ", d.c].join(""));
							o.tt = G.filter([d.qqn,
									" \u56de\u590d\u4e86\u5e16\u5b50 ", d.c]
									.join(""));
							o.rev = ["impress/show/alid/", d.cid, "/pd/", d.tid]
									.join("");
							break;
						case "ca" :
							o.txt = G.filter([d.qqn, ": ", d.na].join(""));
							o.tt = G.filter([d.qqn,
									" \u521b\u5efa\u4e86\u6d3b\u52a8 ", d.na]
									.join(""));
							o.rev = ["activity/show/a/", d.a].join("");
							break;
						case "ja" :
							o.txt = G
									.filter([d.qqn, "\u53c2\u52a0\u4e86", d.na]
											.join(""));
							o.tt = G.filter([d.qqn, " \u53c2\u52a0\u4e86 ",
									d.na].join(""));
							o.rev = ["activity/show/a/", d.a].join("");
							break;
						case "ma" :
							o.txt = G.filter([d.qqn, ": ", d.na].join(""));
							o.tt = G.filter([d.qqn,
									" \u4fee\u6539\u4e86\u6d3b\u52a8 ", d.na]
									.join(""));
							o.rev = ["activity/show/a/", d.a].join("");
							break;
						case "ba" :
							o.txt = G.filter([d.qqn, ": ", d.c].join(""));
							o.tt = G.filter([d.qqn,
									" \u56de\u590d\u4e86\u6d3b\u52a8 ", d.c]
									.join(""));
							o.rev = ["activity/show/a/", d.a].join("");
							break;
						case "su" :
							o.txt = G.filter([d.qqn,
									"\u5171\u4eab\u4e861\u4e2a\u6587\u4ef6"]
									.join(""));
							o.tt = G.filter([d.qqn,
									" \u5171\u4eab\u4e86\u6587\u4ef6 ", d.lf]
									.join(""));
							o.rev = "share/download/"
									+ d.pa.replace(/\//g, "!").replace(/#/g,
											"@");
							break;
						case "ct" :
							var c = "";
							for (var j = 0; j < d.msg.length; j++)
								c += G.filter(d.msg[j].v);
							o.txt = G.filter([d.qqn, ": ", c].join(""));
							o.tt = G.filter([d.qqn,
									" \u5206\u4eab\u4e86\u6587\u6458 ", c]
									.join(""));
							o.rev = "chatlog/index/st/"
									+ G.strftime(d.ct, "$YYYY$$mm$$dd$")
									+ "/type/1";
							break;
						case "cu" :
							var c = "";
							for (var j = 0; j < d.msg.length; j++)
								c += G.filter(d.msg[j].v);
							o.txt = G.filter([d.qqn, ": ", c].join(""));
							o.tt = G.filter([d.qqn,
									" \u5206\u4eab\u4e86\u94fe\u63a5 ", c]
									.join(""));
							o.rev = "chatlog/index/st/"
									+ G.strftime(d.ct, "$YYYY$$mm$$dd$")
									+ "/type/2";
							break;
						case "cw" :
							o.txt = G.filter([d.qqn, ": ", d.t].join(""));
							o.tt = G.filter([d.qqn,
									" \u63d0\u51fa\u4e86\u95ee\u9898 ", d.t]
									.join(""));
							o.rev = ["bbs/vieww/cd/", d.cid, "/td/", d.tid]
									.join("");
							break;
						case "rw" :
							o.txt = G.filter([d.qqn, ": ", d.c].join(""));
							o.tt = G.filter([d.qqn,
									" \u56de\u7b54\u4e86\u95ee\u9898 ", d.c]
									.join(""));
							o.rev = ["bbs/vieww/cd/", d.cid, "/td/", d.tid]
									.join("");
							break;
						default :
							break
					}
					if (!o.tt)
						o.tt = o.txt;
					lis
							.push(
									'<div class="item ',
									count % 2 == 0 ? "odd" : "even",
									" ",
									o.t,
									'" title="',
									o.tt,
									'"><div class="icon bg"></div><div class="txt" style=""><a rel="forward" rev="',
									o.rev, '" href="javascript:void(0);">',
									o.txt, "</a></div></div>");
					count++;
					if (count >= 3)
						break
				}
				adHTML = ['<div id="rndNews"><div class="news">', lis.join(""),
						"</div></div>"].join("")
			}
			adHTML = '\t<div id="phCustom">\t\t<div>\t\t\t<a href="javascript:void(0);" rel="forward" rev="impress/upload">\u4e0a\u4f20\u56fe\u7247\u5230\u672c\u7fa4</a>\t\t</div>\t</div>'
					+ adHTML;
			$("#cnt-photo div.in").after(adHTML);
			var ft = $("#cnt-photo div.ft").hide().remove()
		}
	},
	shown : false,
	gray : false,
	delImg : null,
	hotImg : [0, 0],
	initMask : function() {
		var self = T[2];
		self.shown = false;
		$("#cnt-photo div.mask").css({
					opacity : 0.5
				}).hide();
		$("#cnt-photo div.top a.ok").click(function(e) {
			self.hideMask();
			if (self.delImg) {
				var img = self.delImg;
				var d = null;
				if (img.t == "up")
					d = {
						t : "up",
						ad : img.d[0].ad,
						fd : img.d[0].fd
					};
				else if (img.t == "upn" || img.t == "ci")
					d = {
						t : img.t,
						ad : img.d[0].ad,
						pd : img.d[0].pd
					};
				$.getJSON(self.cfg.delUri.replace({
									gid : mp.dp.gid,
									rnd : G.r(),
									ck : mp.dp.clientKey,
									u : mp.dp.clientUin
								}), d, function(d) {
							if (d.c == 0)
								img.dom.remove();
							else {
								self.showMask();
								self
										.showInfo("\u5220\u9664\u5931\u8d25\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5")
							}
							return
						}, "jsonp")
			}
			e.stopPropagation();
			return false
		});
		$("#cnt-photo div.top a.cancel").click(function(e) {
					self.hideMask()
				});
		if (typeof useFont != "undefined" && useFont)
			$("div.ft a.fl").css("background-position", "-127px -109px")
	},
	showMask : function() {
		T[2].shown = true;
		var s = G.getWindowState();
		$("#cnt-photo div.mask").css({
					opacity : 0.5,
					width : s.wt,
					height : s.ht
				}).show()
	},
	_infoTimeoutId : 0,
	showInfo : function(t) {
		var s = G.getWindowState(), self = T[2];
		clearTimeout(self._infoTimeoutId);
		if (t)
			$("#cnt-photo div.info p").text(t);
		$("#cnt-photo div.info").css("width", s.wt - 10).show();
		self._infoTimeoutId = setTimeout(function() {
					self.hideMask()
				}, 1500)
	},
	showConfirm : function() {
		var s = G.getWindowState();
		$("#cnt-photo div.confirm").css("width", s.wt - 10).show()
	},
	hideMask : function() {
		T[2].shown = false;
		$("#cnt-photo div.mask").hide();
		$("#cnt-photo div.top").hide()
	},
	resize : function(s) {
		var self = T[2];
		if (self.shown) {
			$("#cnt-photo div.mask").css({
						opacity : 0.5,
						width : s.wt,
						height : s.ht
					});
			$("#cnt-photo div.top").css("width", s.wt - 10)
		}
		if (s.v != self.s.v) {
			if (s.v == "normal") {
				$("#cnt-photo ul.p").removeClass("expand").addClass("normal");
				$("#cnt-photo div.ft").hide()
			}
			if (s.v == "expand" && !self.gray) {
				$("#cnt-photo ul.p").removeClass("normal").addClass("expand");
				if (self.hasData)
					$("#cnt-photo div.ft").show();
				$.each($("#cnt-photo img[nav]"), function(i) {
							if ($(this).hasClass("err")) {
								var r = G.centerImg(this, 88, 56);
								if (r)
									$(this).css({
												marginTop : r.mt + "px"
											})
							} else {
								var r = G.enlageImg(this, 88, 56);
								if (r)
									$(this).css({
												marginTop : r.mt + "px",
												marginLeft : r.ml + "px"
											})
							}
						})
			}
		}
		if (s.v == "normal") {
			$("#cnt-photo div.ot").height(s.cht);
			if (self.imgLength <= 8)
				$("#cnt-photo ul.p li.upload").show();
			else
				$("#cnt-photo ul.p li[index=7]")
						.after($("#cnt-photo ul.p li.upload").show());
			$("#cnt-photo div.ft").hide()
		}
		if (s.v == "expand") {
			$("#cnt-photo div.ot").height(s.cht - 19);
			$("#cnt-photo ul.p li.upload").hide();
			$("#cnt-photo div.ft").show()
		}
		$("#cnt-photo div.none p").css("margin-top",
				parseInt((s.cht - 40) / 2) + "px");
		if (self.gray) {
			$("#cnt-photo div.ot").height(s.cht);
			if (s.v == "expand") {
				$("#cnt-photo ul.p").height(232);
				$("#cnt-photo a.img[rel=forward]").attr("ver", "10")
			} else {
				$("#cnt-photo ul.p").height(140);
				$("#cnt-photo a.img[rel=forward]").attr("ver", "11")
			}
		}
		T[2].s = s
	}
};
F["t12.js"] = function(jv) {
	App.runOver(jv)
};
G.scriptLoaded("t12.js");
