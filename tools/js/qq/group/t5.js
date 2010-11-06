T[5] = {
	name : "ht",
	title : "\u7fa4\u70ed\u70b9",
	updateTime : 0,
	current : function(s, t) {
		console.log("T[5].current, s.v=" + s.v + " t:" + t)
	},
	getUpdate : function() {
		return T[5].updateTime
	},
	css : "#cnt-hot{text-align:center;}#cnt-hot div.htin{margin:2px auto;width:196px;text-align:center;}#cnt-hot div.wc{margin:0 auto;width:196px;background:#FFFFFF;padding-top:1px;}#cnt-hot div.wc h2{margin:0;padding:0;background-color:#666666;height:21px;position:relative;overflow:hidden;background-position:53px -310px;}#cnt-hot div.wc h2 span{display:block;width:102px;height:21px;background-position:-41px -289px;float:left;}#cnt-hot div.wc h2 span.s1{}#cnt-ht{background-color:#BDDDEE;}#cnt-ht div.in{text-align:center;padding:0;margin:0;border-bottom:solid 1px #FFFFFF;}#cnt-ht ul{padding-left:2px;width:196px;height:235px;}#cnt-ht li{float:left;width:64px;height:47px;}#cnt-ht li a{display:block;cursor:pointer;width:64px;height:47px;position:relative;background-color:#FFFFFF;}#cnt-ht li a span{display:block;position:absolute;right:3px;bottom:1px;width:19px;height:9px;background-position:-1px -232px;z-index:110;display:none;}#cnt-ht li a p.img{background-position:-2px -447px;position:absolute;left:0;top:0;width:64px;height:47px;z-index:100;}#cnt-ht li a:hover p.img{background-position:-68px -447px;}#cnt-ht li img{position:absolute;left:4px;top:2px;z-index:90;-ms-interpolation-mode: bicubic;}#htCustom{height:27px;padding-top:16px;line-height:15px;text-align:right;border-bottom:solid 1px #8AB0DE;text-align:center;}#htCustom div{width:196px;text-align:right;margin:0 auto;padding-right:3px;}#htCustom div a{margin:0;padding:0;}div.center{text-align:center;}#cnt-ht div.center{}#cnt-ht div.center p{cursor:pointer;width:182px;height:66px;background:transparent url(http://hp.qq.com/hotpic/nohot.gif) left top no-repeat;}\t",
	run : function(s) {
		var self = T[5], p = self.p;
		if (D.ht && D.ht.length) {
			var tpl = G
					.j('\t<li index="$index$">\t\t<a class="img" href="javascript:void(0);" rel="forward" rev="hotspot/picviewer/t/type/tid/$typeid$/p/$p$/pid/$id$/s/t_d/f/c/no/$no$" title="$t$" hidefocus="true">\t\t\t<p class="bg img"></p><span class="bg"></span><img nav="http://hp.qq.com/hotpic/cdnphoto/$dir$/$id$_s.jpg" src="space.gif" alt="$t$" ty="$ty$" />\t\t</a>\t</li>');
			var html = ['<div class="in"><ul>'], d = new Date, tmpTime = 0;
			for (var i = 0; i < D.ht.length; i++) {
				if (i >= 15)
					break;
				if (ts > tmpTime)
					tmpTime = ts;
				var ts = D.ht[i].time;
				d.setTime(ts * 1E3);
				D.ht[i].dir = [d.getFullYear(),
						d.getMonth() + 1 < 10 ? "0" : "", d.getMonth() + 1]
						.join("");
				html.push(tpl.replace(D.ht[i]))
			}
			self.updateTime = tmpTime;
			html
					.push(
							'\t</ul>\t<div id="htCustom">\t\t<div>\t\t\t',
							D.fl.ad
									? '<a href="javascript:void(0);" rel="forward" rev="hotspot">\u5b9a\u5236</a>\u672c\u7fa4\u7684\u4e13\u5c5e\u70ed\u56fe&nbsp;&nbsp;'
									: '<a href="javascript:void(0);" rel="forward" rev="hotspot">\u67e5\u770b\u66f4\u591a\u70ed\u56fe</a>\t\t</div>\t</div></div>');
			p.html(html.join(""));
			self.cnt = s.v == "expand" ? 15 : 9;
			var tw = 56, th = 42;
			$("#cnt-ht li img[nav]").load(function() {
						var r = G.enlageImg(this, tw, th);
						if (r)
							$(this).css({
										top : r.mt + 2 + "px",
										left : r.ml + 4 + "px"
									})
					}).error(function() {
						$(this).addClass("err").unbind("load").load(function() {
									var r = G.centerImg(this, tw, th);
									if (r)
										$(this).css({
													top : r.mt + 2 + "px",
													left : r.ml + 4 + "px"
												})
								}).attr("src", "error.gif");
						$(this).attr("src", "error.gif")
					}).each(function(i) {
						if (i < self.cnt)
							$(this).attr("src", $(this).attr("nav"))
					});
			if (self.ad = G.getAd())
				$("#cnt-ht div.in").after(self.ad)
		} else if (D.fl.ad)
			p
					.html('<div class="center"><a href="javascript:void(0);" rel="forward" rev="hotspot">\u8ba2\u9605\u70ed\u56fe</a>\uff0c\u8f7b\u677e\u6d4f\u89c8\u70ed\u95e8\u56fe\u7247<br/><p rel="forward" rev="hotspot"></p></div>');
		else
			p
					.html('<div class="center">\u901a\u77e5\u7fa4\u7ba1\u7406\u8ba2\u9605\u70ed\u95e8\u56fe\u7247<br/><p rel="forward" rev="hotspot"></div>')
	},
	resize : function(s) {
		var self = T[5];
		if (s.v == "expand" && self.cnt == 9) {
			$("#cnt-ht li img[nav]").each(function(i) {
						if (i >= 9)
							$(this).attr("src", $(this).attr("nav"))
					});
			self.cnt = 15
		}
		$("#cnt-ht div.center").css("padding-top", parseInt((s.ht - 106) / 2))
	}
};
F["t5.js"] = function(jv) {
	App.runOver(jv)
};
G.scriptLoaded("t5.js");
